// B5 — Recipe ingredients list, with key/optional/notes rendering.

import type { RecipeWithRelations } from "@/lib/types";

interface Props {
  recipe: RecipeWithRelations;
}

const CATEGORY_LABEL: Record<string, { zh: string; en: string }> = {
  BASE_SPIRIT: { zh: "基酒", en: "Base" },
  LIQUEUR: { zh: "利口酒", en: "Liqueur" },
  WINE: { zh: "葡萄酒", en: "Wine" },
  JUICE: { zh: "果汁", en: "Juice" },
  SYRUP: { zh: "糖浆", en: "Syrup" },
  BITTERS: { zh: "苦精", en: "Bitters" },
  SODA: { zh: "碳酸", en: "Soda" },
  DAIRY: { zh: "乳", en: "Dairy" },
  HERB_SPICE: { zh: "香草", en: "Herb" },
  GARNISH: { zh: "装饰", en: "Garnish" },
  OTHER: { zh: "其他", en: "Other" },
};

export function RecipeIngredients({ recipe }: Props) {
  return (
    <section
      aria-labelledby="ingredients-heading"
      className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6"
    >
      <h2 id="ingredients-heading" className="mb-5 text-xl font-semibold text-[var(--color-text-primary)]">
        原料 <span className="text-base font-normal text-[var(--color-text-secondary)]">/ Ingredients</span>
      </h2>
      <ul className="divide-y divide-[var(--color-border)]">
        {recipe.ingredients.map((ri) => {
          const cat = CATEGORY_LABEL[ri.ingredient.category] ?? CATEGORY_LABEL.OTHER;
          return (
            <li
              key={ri.id}
              className={`flex items-start gap-4 py-3 ${
                ri.optional ? "opacity-60" : ""
              }`}
            >
              <span
                className="mt-1.5 h-3 w-3 shrink-0 rounded-full ring-2 ring-white"
                style={{ background: ri.ingredient.colorHex ?? "var(--color-border-strong)" }}
                aria-hidden
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className={`font-medium ${ri.isKey ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)]"}`}>
                    {ri.ingredient.nameZh}
                  </span>
                  <span className="text-sm text-[var(--color-text-muted)]">/ {ri.ingredient.nameEn}</span>
                  {ri.isKey && (
                    <span
                      className="inline-flex shrink-0 items-center rounded-full bg-[var(--color-accent-soft)] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[var(--color-accent)]"
                      title="关键原料 / Key ingredient"
                    >
                      ★ 关键
                    </span>
                  )}
                  {ri.optional && (
                    <span className="inline-flex shrink-0 items-center rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-500">
                      可选 / optional
                    </span>
                  )}
                </div>
                {(ri.notesZh || ri.notesEn) && (
                  <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                    {ri.notesZh}
                    {ri.notesEn && ri.notesEn !== ri.notesZh && <span> · {ri.notesEn}</span>}
                  </p>
                )}
              </div>
              <div className="shrink-0 text-right">
                <div className="font-mono text-sm font-semibold text-[var(--color-text-primary)]">
                  {ri.amount}
                </div>
                <div className="text-[10px] uppercase tracking-wide text-[var(--color-text-muted)]">
                  {cat.en}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
