// Innovation entry point. Given selected ingredients + style cues, returns a
// fully-formed recipe the UI can render through the same component path as a
// classic recipe. Validates the LLM output with Zod; on schema failure retries
// once with a strict correction prompt.

import type { Ingredient, Technique } from "@/lib/types";
import { getAllTechniques } from "@/lib/data/techniques";
import { callLLM, LLMError, stripCodeFence } from "./client";
import { INNOVATION_SYSTEM_PROMPT, buildUserPrompt } from "./prompts";
import { InnovationRecipeSchema, type InnovationRecipe } from "./schema";

export interface InnovateOptions {
  vibe?: string;
  strength?: "light" | "balanced" | "strong";
  glass?: string;
}

export interface InnovateResult {
  recipe: InnovationRecipe;
  model: string;
  usage?: { prompt: number; completion: number; total: number };
  /** Names of the user's selected ingredients that the recipe actually used. */
  usedSelectedNames: string[];
}

export class InnovationConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InnovationConfigError";
  }
}

const DEFAULT_MODEL = "gpt-4o-mini";

function readLLMConfig() {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    throw new InnovationConfigError(
      "AI 创新模式未启用：未配置 OPENAI_API_KEY。请在 Railway 环境变量里加上（也可以换成 OPENAI_BASE_URL + OPENAI_API_KEY 指向 DeepSeek/Moonshot/OpenRouter 等）。",
    );
  }
  return {
    apiKey,
    baseUrl: process.env.OPENAI_BASE_URL?.trim() || undefined,
    model: process.env.LLM_MODEL?.trim() || DEFAULT_MODEL,
  };
}

/** Returns true if the LLM recipe actually uses every selected ingredient
 *  (by matching nameZh OR nameEn, case-insensitive). */
function checkUsedSelected(
  recipe: InnovationRecipe,
  selected: Ingredient[],
): { used: string[]; missing: Ingredient[] } {
  const recipeNames = new Set<string>();
  for (const ri of recipe.ingredients) {
    recipeNames.add(ri.nameZh.toLowerCase().trim());
    recipeNames.add(ri.nameEn.toLowerCase().trim());
  }
  const used: string[] = [];
  const missing: Ingredient[] = [];
  for (const ing of selected) {
    if (
      recipeNames.has(ing.nameZh.toLowerCase().trim()) ||
      recipeNames.has(ing.nameEn.toLowerCase().trim())
    ) {
      used.push(ing.nameZh);
    } else {
      missing.push(ing);
    }
  }
  return { used, missing };
}

export async function generateCocktail(
  selected: Ingredient[],
  options: InnovateOptions = {},
): Promise<InnovateResult> {
  if (selected.length === 0) {
    throw new Error("请至少选 1 种原料再生成 / Pick at least one ingredient");
  }

  const config = readLLMConfig();
  const techniques: Pick<Technique, "slug" | "nameZh" | "nameEn" | "category">[] =
    getAllTechniques().map((t) => ({
      slug: t.slug,
      nameZh: t.nameZh,
      nameEn: t.nameEn,
      category: t.category,
    }));

  const userPrompt = buildUserPrompt(selected, techniques, options);

  // First attempt
  let result;
  try {
    result = await callLLM(
      [
        { role: "system", content: INNOVATION_SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      { ...config, temperature: 0.9 },
    );
  } catch (err) {
    if (err instanceof LLMError) throw err;
    throw err;
  }

  let parsed: InnovationRecipe | null = null;
  let lastError: string | null = null;

  const firstTry = safeParse(stripCodeFence(result.content));
  if (firstTry.ok) {
    parsed = firstTry.data;
  } else {
    lastError = firstTry.error;
  }

  // One retry with strict correction if parse failed
  if (!parsed) {
    const retry = await callLLM(
      [
        { role: "system", content: INNOVATION_SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
        {
          role: "user",
          content: `你上一次的输出无法被 JSON Schema 解析。错误：\n${lastError}\n\n请重新输出，**只输出严格符合 Schema 的 JSON**，不要任何额外文字。`,
        },
      ],
      { ...config, temperature: 0.5 },
    );
    const secondTry = safeParse(stripCodeFence(retry.content));
    if (secondTry.ok) {
      parsed = secondTry.data;
      result = retry;
    } else {
      throw new LLMError("parse", `LLM JSON could not be parsed: ${secondTry.error}`);
    }
  }

  // Hard requirement: every selected ingredient must appear. If not, regenerate once.
  const coverage = checkUsedSelected(parsed, selected);
  if (coverage.missing.length > 0) {
    const missingList = coverage.missing
      .map((m) => `${m.nameZh} / ${m.nameEn}`)
      .join(", ");
    const retry = await callLLM(
      [
        { role: "system", content: INNOVATION_SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
        {
          role: "user",
          content: `上一份配方漏用了用户必选的原料：${missingList}。请重新生成，确保 ingredients 数组里每一项都出现这${coverage.missing.length}种原料（中文名或英文名都可以）。其他原料可以保留或调整。**只输出 JSON**。`,
        },
      ],
      { ...config, temperature: 0.7 },
    );
    const secondTry = safeParse(stripCodeFence(retry.content));
    if (secondTry.ok) {
      parsed = secondTry.data;
      result = retry;
    }
  }

  const finalCoverage = checkUsedSelected(parsed, selected);

  return {
    recipe: parsed,
    model: result.model,
    usage: result.usage,
    usedSelectedNames: finalCoverage.used,
  };
}

function safeParse(raw: string): { ok: true; data: InnovationRecipe } | { ok: false; error: string } {
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch (e) {
    return { ok: false, error: `JSON.parse failed: ${(e as Error).message}` };
  }
  const parsed = InnovationRecipeSchema.safeParse(json);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "),
    };
  }
  return { ok: true, data: parsed.data };
}
