// B4 — Scoring helpers for recipe matching.
// Pure functions, no I/O. Easy to test and reason about.

import type { RecipeWithRelations } from "../types";

export interface ScoreInputs {
  coverage: number;        // 0-1
  matchedKeyCount: number;
  missingKeyCount: number;
  totalKeyCount: number;
  techniqueBoost: number;  // 0 or 10
}

export interface ScoreBreakdown extends ScoreInputs {
  raw: number;
  capped: boolean;
  score: number;           // 0-100
}

/**
 * Compute the match score. Returns the rounded 0-100 score and the breakdown
 * so the caller can show debug info if needed.
 */
export function computeScore(inputs: ScoreInputs): ScoreBreakdown {
  const { coverage, matchedKeyCount, missingKeyCount, techniqueBoost } = inputs;
  let raw =
    coverage * 50 +
    matchedKeyCount * 8 -
    missingKeyCount * 12 +
    techniqueBoost;

  // Hard cap when too many key ingredients are missing.
  const capped = missingKeyCount >= 2;
  if (capped) raw = Math.min(raw, 60);

  const score = Math.max(0, Math.min(100, Math.round(raw)));
  return { ...inputs, raw, capped, score };
}

/**
 * Decide if a recipe should be excluded from results.
 * Default min coverage is 0.4 (i.e. user has at least 40% of the recipe's ingredients).
 */
export function shouldExclude(
  coverage: number,
  minCoverage: number = 0.4
): boolean {
  return coverage < minCoverage;
}

/**
 * Sort comparator: score desc, then coverage desc, then difficulty asc.
 */
export function compareMatches(
  a: { score: number; coverage: number; recipe: { difficulty: number } },
  b: { score: number; coverage: number; recipe: { difficulty: number } }
): number {
  if (b.score !== a.score) return b.score - a.score;
  if (b.coverage !== a.coverage) return b.coverage - a.coverage;
  return a.recipe.difficulty - b.recipe.difficulty;
}

/**
 * Compute coverage = matched / total.
 */
export function computeCoverage(matchedCount: number, totalCount: number): number {
  if (totalCount === 0) return 0;
  return Math.max(0, Math.min(1, matchedCount / totalCount));
}

/**
 * Find which ingredient IDs in a recipe are matched by the user's selection.
 */
export function findMatchedIngredientIds(
  recipe: RecipeWithRelations,
  selectedIds: Set<string>
): string[] {
  const matched: string[] = [];
  for (const ri of recipe.ingredients) {
    if (selectedIds.has(ri.ingredientId)) matched.push(ri.ingredientId);
  }
  return matched;
}

/**
 * Split matched ingredient links into key vs non-key.
 */
export function splitKeyAndNonKey(
  recipe: RecipeWithRelations,
  selectedIds: Set<string>
): { matchedKeyCount: number; totalKeyCount: number; missingKeyLinks: typeof recipe.ingredients } {
  let matchedKeyCount = 0;
  let totalKeyCount = 0;
  const missingKeyLinks: typeof recipe.ingredients = [];

  for (const ri of recipe.ingredients) {
    if (ri.isKey) {
      totalKeyCount++;
      if (selectedIds.has(ri.ingredientId)) {
        matchedKeyCount++;
      } else {
        missingKeyLinks.push(ri);
      }
    }
  }
  return { matchedKeyCount, totalKeyCount, missingKeyLinks };
}
