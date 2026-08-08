"use client";

import { useMemo } from "react";
import Link from "next/link";
import type { RecipeWithRelations, MatchResult } from "@/lib/types";
import { cn } from "@/lib/ui/cn";

interface RecipeCardProps {
  recipe: RecipeWithRelations;
  selectedIds: Set<string>;
  /** Optional server-computed match (score, coverage, reason). When provided,
   *  it overrides the local client-side coverage calc with the authoritative values. */
  match?: MatchResult;
  /** Recipe slug for navigation. Defaults to `recipe.slug`. */
  href?: string;
}

function classifyCoverage(coverage: number): {
  label: string;
  barClass: string;
  textClass: string;
} {
  if (coverage >= 1) {
    return {
      label: "完全覆盖 / Full",
      barClass: "bg-[var(--color-success)]",
      textClass: "text-[var(--color-success)]",
    };
  }
  if (coverage >= 0.6) {
    return {
      label: "大部分匹配 / Mostly",
      barClass: "bg-[var(--color-accent)]",
      textClass: "text-[var(--color-accent)]",
    };
  }
  return {
    label: "部分匹配 / Partial",
    barClass: "bg-[var(--color-text-muted)]",
    textClass: "text-[var(--color-text-muted)]",
  };
}

export function RecipeCard({ recipe, selectedIds, match, href }: RecipeCardProps) {
  // Authoritative numbers come from the server when match is provided.
  const coverage = match?.coverage ?? (recipe.ingredients.length > 0
    ? recipe.ingredients.filter((ri) => selectedIds.has(ri.ingredientId)).length / recipe.ingredients.length
    : 0);

  const cls = classifyCoverage(coverage);
  const previewSteps = recipe.steps.slice(0, 2);
  const difficultyDots = useMemo(
    () => Array.from({ length: 5 }, (_, i) => i < recipe.difficulty),
    [recipe.difficulty],
  );

  const linkHref = href ?? `/recipe/${recipe.slug}`;

  return (
    <article
      className={cn(
        "flex h-full flex-col gap-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6",
        "transition-colors duration-200 hover:border-[var(--color-border-strong)]",
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-[var(--color-text-primary)]">
              {recipe.nameZh}
            </h3>
            <p className="truncate text-sm text-[var(--color-text-secondary)]">
              {recipe.nameEn}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {match && (
              <span
                className="rounded-full bg-[var(--color-accent-soft)] px-2.5 py-0.5 text-xs font-semibold tabular-nums text-[var(--color-accent)]"
                title="Match score"
              >
                {match.score}
              </span>
            )}
            <div className="flex shrink-0 items-center gap-0.5" aria-label={`难度 ${recipe.difficulty}/5`}>
              {difficultyDots.map((on, idx) => (
                <span
                  key={idx}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    on ? "bg-[var(--color-accent)]" : "bg-[var(--color-border-strong)]",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {recipe.descriptionZh}
        </p>
        {match?.reason && (
          <p className="rounded-lg bg-stone-50 px-3 py-2 text-xs leading-relaxed text-[var(--color-text-primary)] ring-1 ring-stone-200/60">
            {match.reason}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[var(--color-text-muted)]">原料覆盖 / Coverage</span>
          <span className={cn("font-medium tabular-nums", cls.textClass)}>
            {Math.round(coverage * 100)}%
          </span>
        </div>
        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-border)]"
          role="progressbar"
          aria-valuenow={Math.round(coverage * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className={cn("h-full rounded-full transition-all duration-300", cls.barClass)}
            style={{ width: `${Math.round(coverage * 100)}%` }}
          />
        </div>
        <p className={cn("text-[11px]", cls.textClass)}>{cls.label}</p>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
          关键原料 / Key ingredients
        </span>
        <div className="flex flex-wrap gap-1.5">
          {recipe.ingredients.map((ri) => {
            const matched = selectedIds.has(ri.ingredientId);
            return (
              <span
                key={ri.id}
                title={ri.notesZh ?? undefined}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs",
                  matched
                    ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-text-primary)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)]",
                )}
              >
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full border border-[var(--color-border)]"
                  style={{ backgroundColor: ri.ingredient.colorHex ?? "#EEEEEA" }}
                />
                {ri.ingredient.nameZh}
                {ri.isKey && (
                  <span className="text-[10px] text-[var(--color-text-muted)]">·key</span>
                )}
              </span>
            );
          })}
        </div>
      </div>

      {previewSteps.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
            步骤预览 / Steps preview
          </span>
          <ol className="flex flex-col gap-1.5 text-sm text-[var(--color-text-secondary)]">
            {previewSteps.map((step) => (
              <li key={step.id} className="flex gap-2">
                <span className="shrink-0 font-mono text-xs text-[var(--color-text-muted)]">
                  {String(step.order).padStart(2, "0")}
                </span>
                <span className="line-clamp-2">{step.instructionZh}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="mt-auto flex items-center justify-between border-t border-[var(--color-border)] pt-4">
        <div className="flex flex-wrap gap-1.5 text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
          {recipe.balanceTags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--color-border)] px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={linkHref}
          className={cn(
            "rounded-full bg-[var(--color-text-primary)] px-4 py-1.5 text-sm text-[var(--color-surface-elevated)]",
            "transition-opacity duration-200 hover:opacity-80",
          )}
        >
          查看详情 / View
        </Link>
      </div>
    </article>
  );
}
