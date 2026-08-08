"use client";

import type { MatchResult } from "@/lib/types";
import { RecipeCarousel } from "./RecipeCarousel";

interface Props {
  matches: MatchResult[] | null;
  selectedIds: Set<string>;
}

export function RecipeResults({ matches, selectedIds }: Props) {
  const hasSelection = selectedIds.size > 0;

  return (
    <section className="flex flex-col gap-4" aria-label="推荐配方 / Recommended recipes">
      <div className="flex items-baseline justify-between">
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
          {hasSelection ? "推荐" : "配方"}
          <span className="ml-2 text-sm font-normal text-[var(--color-text-muted)]">
            / {hasSelection ? "Matches" : "Recipes"}
          </span>
        </h2>
        {hasSelection && matches && matches.length > 0 && (
          <span className="text-xs text-[var(--color-text-muted)] tabular-nums">
            {matches.length} 个 / {matches.length} found
          </span>
        )}
      </div>

      <RecipeCarousel matches={matches} selectedIds={selectedIds} hasSelection={hasSelection} />
    </section>
  );
}
