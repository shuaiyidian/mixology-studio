// Shared TypeScript contracts — DO NOT modify without coordination across B2/B3/B4.
// Mirrors prisma/schema.prisma. Re-exported as plain types so UI/matching code
// does not need to import from @prisma/client at the leaf (smaller bundle).

export type IngredientCategory =
  | "BASE_SPIRIT"
  | "LIQUEUR"
  | "WINE"
  | "JUICE"
  | "SYRUP"
  | "BITTERS"
  | "SODA"
  | "DAIRY"
  | "HERB_SPICE"
  | "GARNISH"
  | "OTHER";

export type RecipeType = "CLASSIC" | "INNOVATIVE";

export type TechniqueCategory =
  | "SHAKE"
  | "STIR"
  | "ROLL"
  | "BUILD"
  | "MUDDLE"
  | "STRAIN"
  | "WASH"
  | "GARNISH"
  | "PREP";

export interface Ingredient {
  id: string;
  slug: string;
  nameZh: string;
  nameEn: string;
  category: IngredientCategory;
  abv: number | null;
  flavorTags: string[];
  colorHex: string | null;
  descriptionZh: string | null;
  descriptionEn: string | null;
}

export interface RecipeIngredient {
  id: string;
  recipeId: string;
  ingredientId: string;
  amount: string;
  isKey: boolean;
  optional: boolean;
  notesZh: string | null;
  notesEn: string | null;
  order: number;
}

export interface RecipeStep {
  id: string;
  recipeId: string;
  order: number;
  instructionZh: string;
  instructionEn: string;
  duration: string | null;
  techniqueId: string | null;
  tipZh: string | null;
  tipEn: string | null;
}

export interface Technique {
  id: string;
  slug: string;
  nameZh: string;
  nameEn: string;
  category: TechniqueCategory;
  descriptionZh: string;
  descriptionEn: string;
  stepsZh: string[];
  stepsEn: string[];
  tipsZh: string[];
  tipsEn: string[];
  warningsZh: string[];
  warningsEn: string[];
}

export interface Recipe {
  id: string;
  slug: string;
  nameZh: string;
  nameEn: string;
  type: RecipeType;
  difficulty: number;
  glassType: string | null;
  iceType: string | null;
  descriptionZh: string;
  descriptionEn: string;
  storyNoteZh: string | null;
  storyNoteEn: string | null;
  balanceTags: string[];
}

// ─── UI projection (already-joined, what components render) ─────────────────

export interface RecipeWithRelations extends Recipe {
  ingredients: Array<
    RecipeIngredient & { ingredient: Pick<Ingredient, "id" | "nameZh" | "nameEn" | "category" | "colorHex"> }
  >;
  steps: Array<RecipeStep & { technique: Pick<Technique, "id" | "nameZh" | "nameEn" | "category"> | null }>;
  techniques: Array<Pick<Technique, "id" | "nameZh" | "nameEn" | "category" | "slug">>;
}

// ─── API contracts ──────────────────────────────────────────────────────────

export interface MatchRequest {
  ingredientIds: string[];                       // selected ingredient IDs
  options?: {
    type?: RecipeType;                            // filter: only classic or only innovative
    techniqueSlug?: string;                       // optional preference (e.g. "shake")
    maxResults?: number;                          // default 12
    minCoverage?: number;                         // 0-1, default 0.4
  };
}

export interface MatchResult {
  recipe: RecipeWithRelations;
  score: number;                                  // 0-100
  coverage: number;                               // 0-1: matchedIngredients / totalIngredients
  matchedIngredientIds: string[];
  missingKeyIngredientIds: string[];              // 关键原料缺失会显著影响评分
  missingKeyNames: { zh: string; en: string }[];
  reason: string;                                 // 一句话解释为什么这个配方被推荐（zh）
}

export interface MatchResponse {
  results: MatchResult[];
  meta: {
    total: number;
    selectedIngredients: number;
    computedAt: string;                            // ISO timestamp
  };
}
