// POST /api/innovate — generates a novel cocktail recipe from selected
// ingredients via an LLM (OpenAI-compatible). Same client-side flow as
// /api/match, but per-request (LLM cost) instead of debounced.

import { NextResponse } from "next/server";
import { z } from "zod";
import { getAllIngredients } from "@/lib/data/ingredients";
import { generateCocktail, InnovationConfigError } from "@/lib/llm/innovate";
import { LLMError } from "@/lib/llm/client";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const InnovateRequestSchema = z.object({
  ingredientIds: z.array(z.string().min(1)).min(1).max(16),
  options: z
    .object({
      vibe: z.string().max(120).optional(),
      strength: z.enum(["light", "balanced", "strong"]).optional(),
      glass: z.string().max(40).optional(),
    })
    .optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  const parsed = InnovateRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid request",
        issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })),
      },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  const ingredients = getAllIngredients();
  const byId = new Map(ingredients.map((i) => [i.id, i]));
  const selected = parsed.data.ingredientIds
    .map((id) => byId.get(id))
    .filter((i): i is NonNullable<typeof i> => Boolean(i));

  if (selected.length === 0) {
    return NextResponse.json(
      { error: "No valid ingredients selected" },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }
  if (selected.length !== parsed.data.ingredientIds.length) {
    return NextResponse.json(
      {
        error: "Some ingredient IDs were not found",
        missing: parsed.data.ingredientIds.filter((id) => !byId.has(id)),
      },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const result = await generateCocktail(selected, parsed.data.options ?? {});
    return NextResponse.json(
      {
        ...result,
        meta: {
          selectedCount: selected.length,
          computedAt: new Date().toISOString(),
        },
      },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  } catch (err) {
    if (err instanceof InnovationConfigError) {
      return NextResponse.json(
        { error: err.message, code: "LLM_NOT_CONFIGURED" },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      );
    }
    if (err instanceof LLMError) {
      const status =
        err.kind === "rate_limit" ? 429
          : err.kind === "timeout" ? 504
            : err.kind === "config" ? 503
              : err.kind === "parse" ? 502
                : 502;
      return NextResponse.json(
        { error: err.message, code: err.kind },
        { status, headers: { "Cache-Control": "no-store" } },
      );
    }
    console.error("[/api/innovate] error", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed; use POST" },
    { status: 405, headers: { Allow: "POST", "Cache-Control": "no-store" } },
  );
}
