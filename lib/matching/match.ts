// B4 — Main matching entry point.
// Reads data via lib/data accessors (NO direct file reads), scores each recipe,
// returns ranked results.

import { getAllRecipes, getRecipeWithRelations } from "../data/recipes";
import type { MatchRequest, MatchResult, MatchResponse, RecipeType } from "../types";
import {
  computeCoverage,
  computeScore,
  compareMatches,
  findMatchedIngredientIds,
  shouldExclude,
  splitKeyAndNonKey,
} from "./score";
import { generateReason } from "./reason";

export interface MatchOptionsResolved {
  type?: RecipeType;
  techniqueSlug?: string;
  maxResults: number;
  minCoverage: number;
  popularityWeight: number;
}

const DEFAULT_MAX_RESULTS = 12;
// Lowered from 0.4 → 0.15. The popularity signal filters irrelevant recipes
// downstream, so we can be permissive about how few ingredients the user picks.
const DEFAULT_MIN_COVERAGE = 0.15;
const DEFAULT_POPULARITY_WEIGHT = 0.3;

export function resolveOptions(options?: MatchRequest["options"]): MatchOptionsResolved {
  const popularityWeight = clamp01(options?.popularityWeight ?? DEFAULT_POPULARITY_WEIGHT);
  return {
    type: options?.type,
    techniqueSlug: options?.techniqueSlug,
    maxResults: options?.maxResults ?? DEFAULT_MAX_RESULTS,
    minCoverage: clamp01(options?.minCoverage ?? DEFAULT_MIN_COVERAGE),
    popularityWeight,
  };
}

function clamp01(n: number): number {
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

export async function matchRecipes(request: MatchRequest): Promise<MatchResponse> {
  const options = resolveOptions(request.options);
  const selectedIds = new Set(request.ingredientIds);
  const allRecipes = options.type
    ? getAllRecipes().filter((r) => r.type === options.type)
    : getAllRecipes();

  const results: MatchResult[] = [];

  for (const summary of allRecipes) {
    const recipe = getRecipeWithRelations(summary.id);
    if (!recipe) continue;

    const totalIngredients = recipe.ingredients.length;
    if (totalIngredients === 0) continue;

    const matchedIds = findMatchedIngredientIds(recipe, selectedIds);
    const coverage = computeCoverage(matchedIds.length, totalIngredients);

    if (shouldExclude(coverage, options.minCoverage)) continue;

    const { matchedKeyCount, totalKeyCount, missingKeyLinks } = splitKeyAndNonKey(recipe, selectedIds);
    const missingKeyNames = missingKeyLinks.map((ri) => ({
      zh: ri.ingredient.nameZh,
      en: ri.ingredient.nameEn,
      category: ri.ingredient.category,
    }));
    const missingKeyIds = missingKeyLinks.map((ri) => ri.ingredientId);

    const hasTechniqueBoost =
      options.techniqueSlug !== undefined &&
      recipe.techniques.some((t) => t.slug === options.techniqueSlug)
        ? 10
        : 0;

    // Popularity defaults to 60 if the recipe doesn't have it set. We keep the
    // /100 normalization at the call site so the scorer stays unit-clean.
    const popularity = (recipe.popularity ?? 60) / 100;

    const { score } = computeScore({
      coverage,
      matchedKeyCount,
      missingKeyCount: missingKeyLinks.length,
      totalKeyCount,
      techniqueBoost: hasTechniqueBoost,
      popularity,
      popularityWeight: options.popularityWeight,
    });

    const reason = generateReason({
      recipe,
      coverage,
      matchedKeyCount,
      totalKeyCount,
      missingKeyNames,
      hasTechniqueBoost: hasTechniqueBoost > 0,
    });

    results.push({
      recipe,
      score,
      coverage,
      matchedIngredientIds: matchedIds,
      missingKeyIngredientIds: missingKeyIds,
      missingKeyNames,
      reason,
    });
  }

  results.sort(compareMatches);
  const top = results.slice(0, options.maxResults);

  return {
    results: top,
    meta: {
      total: results.length,
      selectedIngredients: request.ingredientIds.length,
      computedAt: new Date().toISOString(),
    },
  };
}
