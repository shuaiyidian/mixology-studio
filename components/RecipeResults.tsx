"use client";

import type { MatchResult } from "@/lib/types";
import { RecipeCard } from "./RecipeCard";
import { EmptyState } from "./EmptyState";

interface RecipeResultsProps {
  matches: MatchResult[] | null;
  selectedIds: Set<string>;
  /** When matches is null and this is provided, render these "featured" recipes
   *  without match scores (browse mode for empty selection). */
  featuredSlugs?: string[];
}

export function RecipeResults({ matches, selectedIds }: RecipeResultsProps) {
  const hasSelection = selectedIds.size > 0;

  // Loading / computing state when matches is null but user has selection
  if (hasSelection && matches === null) {
    return (
      <section className="flex flex-col gap-6" aria-label="推荐配方 / Recommended recipes">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
            推荐配方
            <span className="ml-2 text-sm font-normal text-[var(--color-text-secondary)]">
              / Recommended recipes
            </span>
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)]">
            正在为你计算最佳匹配 / Computing best matches…
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-80 animate-pulse rounded-2xl border border-[var(--color-border)] bg-stone-50"
            />
          ))}
        </div>
      </section>
    );
  }

  const items = matches ?? [];

  return (
    <section className="flex flex-col gap-6" aria-label="推荐配方 / Recommended recipes">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
          推荐配方
          <span className="ml-2 text-sm font-normal text-[var(--color-text-secondary)]">
            / Recommended recipes
          </span>
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)]">
          {hasSelection
            ? `基于你选择的 ${selectedIds.size} 种原料 / Based on ${selectedIds.size} selected.`
            : "展示部分经典配方 / Showing a curated set of classics."}
        </p>
      </div>

      {items.length === 0 ? (
        <EmptyState
          titleZh={hasSelection ? "暂无匹配配方" : "拖入原料开始调酒"}
          titleEn={hasSelection ? "No matching recipes yet" : "Drag ingredients to start"}
          descriptionZh={
            hasSelection
              ? "试试少选几种，或选一个分类下的其他原料。"
              : "把原料从下方调色板拖到上方落入区，匹配引擎会为你找出最佳配方。"
          }
          descriptionEn={
            hasSelection
              ? "Try selecting fewer ingredients, or pick others from the same category."
              : "Drag ingredients from the palette into the drop zone above and the matcher will find recipes for you."
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((m) => (
            <RecipeCard
              key={m.recipe.id}
              recipe={m.recipe}
              selectedIds={selectedIds}
              match={m}
            />
          ))}
        </div>
      )}
    </section>
  );
}
