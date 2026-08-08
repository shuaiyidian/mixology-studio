"use client";

import { useMemo } from "react";
import type { Ingredient, IngredientCategory } from "@/lib/types";
import { IngredientChip } from "./IngredientChip";
import { CategoryFilter, type CategoryFilterValue } from "./CategoryFilter";
import { cn } from "@/lib/ui/cn";

interface IngredientPaletteProps {
  ingredients: Ingredient[];
  category: CategoryFilterValue;
  onCategoryChange: (value: CategoryFilterValue) => void;
  selectedIds: Set<string>;
}

const categoryOrder: IngredientCategory[] = [
  "BASE_SPIRIT",
  "LIQUEUR",
  "WINE",
  "JUICE",
  "SYRUP",
  "BITTERS",
  "DAIRY",
  "HERB_SPICE",
  "GARNISH",
  "OTHER",
];

const categoryLabel: Record<IngredientCategory, string> = {
  BASE_SPIRIT: "基酒",
  LIQUEUR: "利口酒",
  WINE: "美思",
  JUICE: "果汁",
  SYRUP: "糖浆",
  BITTERS: "苦精",
  SODA: "汽水",
  DAIRY: "乳蛋",
  HERB_SPICE: "香草",
  GARNISH: "装饰",
  OTHER: "其他",
};

export function IngredientPalette({
  ingredients,
  category,
  onCategoryChange,
  selectedIds,
}: IngredientPaletteProps) {
  const filtered = useMemo(() => {
    if (category === "ALL") return ingredients;
    return ingredients.filter((i) => i.category === category);
  }, [ingredients, category]);

  const grouped = useMemo(() => {
    if (category !== "ALL") return null;
    const map = new Map<IngredientCategory, Ingredient[]>();
    for (const ing of filtered) {
      const list = map.get(ing.category) ?? [];
      list.push(ing);
      map.set(ing.category, list);
    }
    return categoryOrder
      .filter((c) => map.has(c))
      .map((c) => ({ category: c, items: map.get(c)! }));
  }, [filtered, category]);

  return (
    <section className="flex flex-col gap-6" aria-label="原料调色板 / Ingredient palette">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
          原料调色板
          <span className="ml-2 text-sm font-normal text-[var(--color-text-secondary)]">
            / Ingredient palette
          </span>
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)]">
          拖动你拥有的原料到上方落入区 / Drag the ingredients you have into the drop zone above.
        </p>
      </div>

      <CategoryFilter value={category} onChange={onCategoryChange} />

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-[var(--color-border)] p-6 text-center text-sm text-[var(--color-text-muted)]">
          该分类暂无原料 / No ingredients in this category.
        </p>
      ) : grouped ? (
        <div className="flex flex-col gap-8">
          {grouped.map((group) => (
            <div key={group.category} className="flex flex-col gap-3">
              <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                {categoryLabel[group.category]}
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {group.items.map((ing) => (
                  <IngredientChip
                    key={ing.id}
                    ingredient={ing}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((ing) => (
            <IngredientChip key={ing.id} ingredient={ing} />
          ))}
        </div>
      )}

      {category === "ALL" && selectedIds.size > 0 && (
        <p className="text-xs text-[var(--color-text-muted)]">
          已选 {selectedIds.size} 种 / {selectedIds.size} selected
        </p>
      )}
    </section>
  );
}
