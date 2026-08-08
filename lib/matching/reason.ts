// B4 — Chinese reason-string generator for match results.

import type { RecipeWithRelations, IngredientCategory } from "../types";

const CATEGORY_ADVICE: Record<IngredientCategory, string> = {
  BASE_SPIRIT: "基酒",
  LIQUEUR: "利口酒",
  WINE: "葡萄酒",
  JUICE: "果汁",
  SYRUP: "糖浆",
  BITTERS: "苦精",
  SODA: "碳酸饮料",
  DAIRY: "乳制品",
  HERB_SPICE: "香草",
  GARNISH: "装饰",
  OTHER: "其他",
};

export interface ReasonInputs {
  recipe: RecipeWithRelations;
  coverage: number;
  matchedKeyCount: number;
  totalKeyCount: number;
  missingKeyNames: { zh: string; en: string; category: IngredientCategory }[];
  hasTechniqueBoost: boolean;
}

export function generateReason(inputs: ReasonInputs): string {
  const { recipe, coverage, matchedKeyCount, totalKeyCount, missingKeyNames, hasTechniqueBoost } = inputs;

  // Perfect coverage and all keys
  if (coverage >= 1 && missingKeyNames.length === 0) {
    if (hasTechniqueBoost) return "完美匹配 — 你有的关键原料齐了，且技法符合你的首选。";
    return "完美匹配 — 关键原料全部到位。";
  }

  // Perfect coverage but optional things missing
  if (coverage >= 1 && missingKeyNames.length > 0) {
    // shouldn't happen if missingKeyNames is only keys
    return "覆盖度 100%，关键原料齐了。";
  }

  // All keys matched but coverage not 100% (missing optionals)
  if (matchedKeyCount === totalKeyCount && totalKeyCount > 0) {
    if (hasTechniqueBoost) return `关键原料全到位，还差一些辅料；技法 ${recipe.techniques[0]?.nameZh ?? ""} 符合你的首选。`;
    return "关键原料全到位，只差一些辅料。";
  }

  // Some keys missing
  if (missingKeyNames.length > 0) {
    const first = missingKeyNames[0];
    const cat = CATEGORY_ADVICE[first.category] ?? "原料";
    const rest = missingKeyNames.length > 1 ? `等 ${missingKeyNames.length} 项` : "";
    if (hasTechniqueBoost) {
      return `缺${cat}${rest}，但技法符合你的首选。`;
    }
    return `缺${cat}${rest}，覆盖度 ${Math.round(coverage * 100)}%。`;
  }

  // General fallback
  return `覆盖度 ${Math.round(coverage * 100)}%，难度 ${recipe.difficulty}/5。`;
}
