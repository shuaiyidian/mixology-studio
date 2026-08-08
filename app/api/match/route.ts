// B4 — POST /api/match endpoint.
// Body: MatchRequest. Returns: MatchResponse.

import { NextResponse } from "next/server";
import { z } from "zod";
import { matchRecipes } from "@/lib/matching/match";
import type { RecipeType } from "@/lib/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const RecipeTypeSchema = z.enum(["CLASSIC", "INNOVATIVE"]);

const MatchRequestSchema = z.object({
  ingredientIds: z.array(z.string().min(1)).max(64),
  options: z
    .object({
      type: RecipeTypeSchema.optional(),
      techniqueSlug: z.string().min(1).max(64).optional(),
      maxResults: z.number().int().min(1).max(50).optional(),
      minCoverage: z.number().min(0).max(1).optional(),
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
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  const parsed = MatchRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid request",
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    const result = await matchRecipes({
      ingredientIds: parsed.data.ingredientIds,
      options: parsed.data.options as
        | { type?: RecipeType; techniqueSlug?: string; maxResults?: number; minCoverage?: number }
        | undefined,
    });
    return NextResponse.json(result, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("[/api/match] error", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed; use POST" },
    { status: 405, headers: { Allow: "POST", "Cache-Control": "no-store" } }
  );
}
