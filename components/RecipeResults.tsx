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
    <section className="flex flex-col gap-2 sm:gap-4" aria-label="推荐配方 / Recommended recipes">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-semibold text-[var(--color-text-primary)] sm:text-xl">
          {hasSelection ? "推荐" : "配方"}
          <span className="ml-1.5 text-xs font-normal text-[var(--color-text-muted)] sm:ml-2 sm:text-sm">
            / {hasSelection ? "Matches" : "Recipes"}
            {hasSelection && matches && matches.length > 0 && (
              <span className="ml-1 font-medium text-[var(--color-text-primary)] tabular-nums">· {matches.length}</span>
            )}
          </span>
        </h2>
      </div>

      <RecipeCarousel matches={matches} selectedIds={selectedIds} hasSelection={hasSelection} />
    </section>
  );
}
