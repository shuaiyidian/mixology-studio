"use client";

import Link from "next/link";
import type { MatchResult, RecipeWithRelations } from "@/lib/types";
import { cn } from "@/lib/ui/cn";

interface RecipeCardProps {
  recipe: RecipeWithRelations;
  selectedIds: Set<string>;
  match?: MatchResult;
}

export function RecipeCard({ recipe, selectedIds, match }: RecipeCardProps) {
  const coverage = match?.coverage ?? 0;
  const pct = Math.round(coverage * 100);
  const covTone =
    coverage >= 1
      ? "bg-[var(--color-success)]"
      : coverage >= 0.6
        ? "bg-[var(--color-accent)]"
        : "bg-[var(--color-text-muted)]";

  return (
    <article
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4 sm:gap-5 sm:rounded-2xl sm:p-6",
        "transition-colors duration-200",
      )}
    >
      {/* Header: name + score + difficulty */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold leading-tight text-[var(--color-text-primary)] sm:text-2xl">
            {recipe.nameZh}
          </h3>
          <p className="mt-0.5 truncate text-xs text-[var(--color-text-muted)] sm:mt-1 sm:text-sm">
            {recipe.nameEn}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-0.5">
          {match && (
            <span className="rounded-full bg-[var(--color-accent-soft)] px-2.5 py-0.5 text-base font-bold tabular-nums text-[var(--color-accent)] sm:px-3 sm:py-1 sm:text-lg">
              {match.score}
            </span>
          )}
          <span className="text-[10px] uppercase tracking-wide text-[var(--color-text-muted)]">
            难度 {recipe.difficulty}/5
          </span>
        </div>
      </div>

      {/* Coverage bar */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between text-[10px] sm:text-xs">
          <span className="text-[var(--color-text-muted)]">原料覆盖</span>
          <span className="font-medium tabular-nums text-[var(--color-text-primary)]">{pct}%</span>
        </div>
        <div
          className="h-1 w-full overflow-hidden rounded-full bg-[var(--color-border)] sm:h-1.5"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className={cn("h-full rounded-full transition-all duration-500", covTone)}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Key ingredients — only show key ingredients (matched + missing) */}
      <div className="flex flex-wrap gap-1 sm:gap-1.5">
        {recipe.ingredients.map((ri) => {
          const matched = selectedIds.has(ri.ingredientId);
          if (!ri.isKey) return null;
          if (matched) {
            return (
              <span
                key={ri.id}
                className="inline-flex items-center gap-1 rounded-full border border-[var(--color-accent)] bg-[var(--color-accent-soft)] px-2 py-0.5 text-[10px] sm:px-2.5 sm:py-1 sm:text-xs"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2"
                  style={{ backgroundColor: ri.ingredient.colorHex ?? "#EEEEEA" }}
                />
                <span className="font-medium text-[var(--color-text-primary)]">{ri.ingredient.nameZh}</span>
              </span>
            );
          }
          return (
            <span
              key={ri.id}
              className="inline-flex items-center gap-1 rounded-full border border-dashed border-stone-300 bg-stone-50 px-2 py-0.5 text-[10px] text-stone-500 sm:px-2.5 sm:py-1 sm:text-xs"
            >
              <span className="h-1.5 w-1.5 rounded-full border border-stone-300 bg-white sm:h-2 sm:w-2" />
              <span className="line-through">{ri.ingredient.nameZh}</span>
            </span>
          );
        })}
      </div>

      {/* Reason (one line from match engine) */}
      {match?.reason && (
        <p className="truncate text-xs text-[var(--color-text-secondary)] sm:text-sm">→ {match.reason}</p>
      )}

      {/* Action */}
      <Link
        href={`/recipe/${recipe.slug}`}
        className="mt-0.5 self-start rounded-full bg-[var(--color-text-primary)] px-4 py-1.5 text-xs text-[var(--color-surface-elevated)] transition-opacity hover:opacity-80 sm:px-5 sm:py-2 sm:text-sm"
      >
        查看详情 →
      </Link>
    </article>
  );
}
