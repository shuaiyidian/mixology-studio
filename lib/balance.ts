// B6 — Balance profile computation for a recipe.
// Server-side only: looks up full ingredient data (flavorTags, slug) via the
// data accessor because RecipeWithRelations' ingredient projection is lean.

import type { RecipeWithRelations, IngredientCategory } from "./types";
import { getIngredientById } from "./data/ingredients";

export interface BalanceProfile {
  sweet: number;   // 甘  0-100
  sour: number;    // 酸  0-100
  bitter: number;  // 苦  0-100
  strong: number;  // 烈  0-100
}

const SWEET_TAGS = new Set(["sweet", "dessert", "creamy", "fruity", "tropical", "rich"]);
const SOUR_TAGS = new Set(["sour", "citrus", "tart", "bright", "refreshing"]);
const BITTER_TAGS = new Set(["bitter", "herbal", "amaro", "earthy", "complex", "vegetal"]);
const STRONG_TAGS = new Set(["strong", "spirit-forward", "boozy", "spirit", "aperitif"]);

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

export function computeBalance(recipe: RecipeWithRelations): BalanceProfile {
  let sweet = 0;
  let sour = 0;
  let bitter = 0;
  let strong = 0;

  // Pass 1: from explicit balanceTags (each matching tag = +18, capped at 60)
  const tagCounts = { sweet: 0, sour: 0, bitter: 0, strong: 0 };
  for (const tag of recipe.balanceTags ?? []) {
    if (SWEET_TAGS.has(tag)) tagCounts.sweet++;
    if (SOUR_TAGS.has(tag)) tagCounts.sour++;
    if (BITTER_TAGS.has(tag)) tagCounts.bitter++;
    if (STRONG_TAGS.has(tag)) tagCounts.strong++;
  }
  sweet += Math.min(60, tagCounts.sweet * 18);
  sour += Math.min(60, tagCounts.sour * 18);
  bitter += Math.min(60, tagCounts.bitter * 18);
  strong += Math.min(60, tagCounts.strong * 18);

  // Pass 2: from ingredients (per-row contributions, key ingredients weigh more)
  for (const ri of recipe.ingredients) {
    const weight = ri.isKey ? 1.0 : 0.5;
    const cat = ri.ingredient.category as IngredientCategory;
    const amt = parseAmountToMl(ri.amount);
    const sizeBoost = Math.min(1.5, 0.5 + amt / 30); // 30ml = 1.0x; 60ml = 1.5x
    const fullIngredient = getIngredientById(ri.ingredientId);
    const tags = fullIngredient?.flavorTags ?? [];
    const slug = fullIngredient?.slug ?? "";

    switch (cat) {
      case "SYRUP":
        sweet += 12 * weight * sizeBoost;
        break;
      case "DAIRY":
        sweet += 8 * weight * sizeBoost;
        break;
      case "JUICE":
        sour += 10 * weight * sizeBoost;
        if (tags.includes("sweet")) sweet += 4 * weight;
        break;
      case "BITTERS":
        bitter += 18 * weight * sizeBoost;
        break;
      case "BASE_SPIRIT":
        strong += 14 * weight * sizeBoost;
        break;
      case "LIQUEUR":
        // Liqueurs lean sweet; herbal/amaro liqueurs lean bitter
        if (tags.includes("bitter") || tags.includes("herbal")) {
          bitter += 10 * weight;
        } else {
          sweet += 10 * weight * sizeBoost;
        }
        strong += 6 * weight;
        break;
      case "WINE":
        if (slug.includes("sweet") || tags.includes("herbal")) {
          // sweet vermouth: sweet+bitter
          sweet += 8 * weight;
          bitter += 6 * weight;
        } else {
          // dry vermouth: bitter+herbal, less sweet
          bitter += 8 * weight;
          sour += 4 * weight;
        }
        strong += 3 * weight;
        break;
      case "SODA":
        // Dilutes — generally reduces strength, slight sweet
        sweet += 2;
        break;
    }
  }

  return {
    sweet: clamp(sweet),
    sour: clamp(sour),
    bitter: clamp(bitter),
    strong: clamp(strong),
  };
}

/**
 * Coerce a recipe-ingredient amount string to a rough ml number.
 * Returns 30 as the default if the amount can't be parsed.
 */
function parseAmountToMl(amount: string): number {
  const trimmed = amount.trim().toLowerCase();
  // ml / 毫升
  const ml = trimmed.match(/^(\d+(?:\.\d+)?)\s*(?:ml|毫升|cc)/);
  if (ml) return parseFloat(ml[1]);
  // oz / 盎司
  const oz = trimmed.match(/^(\d+(?:\.\d+)?)\s*(?:oz|盎司)/);
  if (oz) return parseFloat(oz[1]) * 30;
  // cl
  const cl = trimmed.match(/^(\d+(?:\.\d+)?)\s*(?:cl)/);
  if (cl) return parseFloat(cl[1]) * 10;
  // dash / drop
  if (trimmed.includes("dash")) return 0.6;
  if (trimmed.includes("drop")) return 0.05;
  // spoon
  if (trimmed.includes("bar spoon")) return 5;
  if (trimmed.includes("teaspoon") || trimmed.includes("tsp")) return 5;
  if (trimmed.includes("tablespoon") || trimmed.includes("tbsp")) return 15;
  // piece
  if (trimmed.includes("piece") || trimmed.includes("cube") || trimmed.includes("egg white")) return 30;
  // splash
  if (trimmed.includes("splash")) return 15;
  // top
  if (trimmed.includes("top")) return 60;
  return 30;
}
