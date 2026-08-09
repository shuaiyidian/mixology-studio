// Minimal OpenAI-compatible chat completion client.
// We don't pull a SDK — fetch is enough, and this works with OpenAI, DeepSeek,
// Moonshot, OpenRouter, etc. as long as the endpoint is OpenAI-shaped.

export interface LLMMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface LLMConfig {
  apiKey: string;
  baseUrl?: string;
  model: string;
  temperature?: number;
  maxTokens?: number;
  timeoutMs?: number;
}

export interface LLMResult {
  content: string;
  /** Tokens used (if the provider reported them). */
  usage?: { prompt: number; completion: number; total: number };
  model: string;
}

export class LLMError extends Error {
  constructor(
    public readonly kind: "config" | "rate_limit" | "timeout" | "parse" | "provider" | "unknown",
    message: string,
    public readonly status?: number,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = "LLMError";
  }
}

export async function callLLM(
  messages: LLMMessage[],
  config: LLMConfig,
): Promise<LLMResult> {
  if (!config.apiKey || !config.apiKey.trim()) {
    throw new LLMError("config", "Missing LLM API key");
  }
  const baseUrl = (config.baseUrl ?? "https://api.openai.com").replace(/\/+$/, "");
  const url = `${baseUrl}/v1/chat/completions`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), config.timeoutMs ?? 25_000);

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        messages,
        temperature: config.temperature ?? 0.9,
        max_tokens: config.maxTokens ?? 1500,
        response_format: { type: "json_object" },
      }),
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timeout);
    if ((err as Error).name === "AbortError") {
      throw new LLMError("timeout", "LLM request timed out", undefined, err);
    }
    throw new LLMError("provider", `LLM network error: ${(err as Error).message}`, undefined, err);
  }
  clearTimeout(timeout);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    if (res.status === 401 || res.status === 403) {
      throw new LLMError("config", `LLM auth failed (${res.status}): ${text.slice(0, 200)}`, res.status);
    }
    if (res.status === 429) {
      throw new LLMError("rate_limit", `LLM rate limited: ${text.slice(0, 200)}`, res.status);
    }
    throw new LLMError("provider", `LLM HTTP ${res.status}: ${text.slice(0, 300)}`, res.status);
  }

  let json: {
    choices?: Array<{ message?: { content?: string } }>;
    model?: string;
    usage?: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number };
  };
  try {
    json = await res.json();
  } catch (err) {
    throw new LLMError("parse", "LLM returned non-JSON response", undefined, err);
  }

  const content = json.choices?.[0]?.message?.content;
  if (!content || typeof content !== "string") {
    throw new LLMError("parse", "LLM response missing message content");
  }

  return {
    content,
    model: json.model ?? config.model,
    usage: json.usage
      ? {
          prompt: json.usage.prompt_tokens ?? 0,
          completion: json.usage.completion_tokens ?? 0,
          total: json.usage.total_tokens ?? 0,
        }
      : undefined,
  };
}

/** Strip optional ```json fences some models still add despite instructions. */
export function stripCodeFence(s: string): string {
  const trimmed = s.trim();
  if (trimmed.startsWith("```")) {
    return trimmed
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/```\s*$/, "")
      .trim();
  }
  return trimmed;
}
