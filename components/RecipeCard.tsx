"use client";

import Link from "next/link";
import type { MatchResult } from "@/lib/types";
import { cn } from "@/lib/ui/cn";

interface RecipeCardProps {
  recipe: import("@/lib/types").RecipeWithRelations;
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
        "flex flex-col gap-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6",
        "transition-colors duration-200",
      )}
    >
      {/* Header: name + score + difficulty */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-2xl font-semibold leading-tight text-[var(--color-text-primary)]">
            {recipe.nameZh}
          </h3>
          <p className="mt-1 truncate text-sm text-[var(--color-text-muted)]">
            {recipe.nameEn}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          {match && (
            <span className="rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-lg font-bold tabular-nums text-[var(--color-accent)]">
              {match.score}
            </span>
          )}
          <span className="text-[10px] uppercase tracking-wide text-[var(--color-text-muted)]">
            难度 {recipe.difficulty}/5
          </span>
        </div>
      </div>

      {/* Coverage bar */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[var(--color-text-muted)]">原料覆盖</span>
          <span className="font-medium tabular-nums text-[var(--color-text-primary)]">{pct}%</span>
        </div>
        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-border)]"
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

      {/* Key ingredients — only show unmatched as warnings */}
      <div className="flex flex-wrap gap-1.5">
        {recipe.ingredients.map((ri) => {
          const matched = selectedIds.has(ri.ingredientId);
          if (matched && !ri.isKey) return null; // hide non-key matched (clutter reduction)
          if (ri.isKey && matched) {
            return (
              <span
                key={ri.id}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-accent)] bg-[var(--color-accent-soft)] px-2.5 py-1 text-xs"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: ri.ingredient.colorHex ?? "#EEEEEA" }}
                />
                <span className="font-medium text-[var(--color-text-primary)]">{ri.ingredient.nameZh}</span>
              </span>
            );
          }
          if (ri.isKey && !matched) {
            return (
              <span
                key={ri.id}
                className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-stone-300 bg-stone-50 px-2.5 py-1 text-xs text-stone-500"
              >
                <span className="h-2 w-2 rounded-full border border-stone-300 bg-white" />
                <span className="line-through">{ri.ingredient.nameZh}</span>
              </span>
            );
          }
          // non-key, not matched: skip (not interesting for at-a-glance)
          return null;
        })}
      </div>

      {/* Reason (one line from match engine) */}
      {match?.reason && (
        <p className="text-sm text-[var(--color-text-secondary)]">→ {match.reason}</p>
      )}

      {/* Action */}
      <Link
        href={`/recipe/${recipe.slug}`}
        className="mt-1 self-start rounded-full bg-[var(--color-text-primary)] px-5 py-2 text-sm text-[var(--color-surface-elevated)] transition-opacity hover:opacity-80"
      >
        查看详情 →
      </Link>
    </article>
  );
}
