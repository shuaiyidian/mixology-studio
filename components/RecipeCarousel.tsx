"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import type { MatchResult } from "@/lib/types";
import { RecipeCard } from "./RecipeCard";
import { EmptyState } from "./EmptyState";
import { cn } from "@/lib/ui/cn";

interface Props {
  matches: MatchResult[] | null;
  selectedIds: Set<string>;
  hasSelection: boolean;
}

export function RecipeCarousel({ matches, selectedIds, hasSelection }: Props) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const list = matches ?? [];

  // Reset to 0 when the match list shrinks below our current index
  useEffect(() => {
    if (index >= list.length && list.length > 0) setIndex(0);
    if (list.length === 0) setIndex(0);
  }, [list.length, index]);

  const goPrev = useCallback(
    () => setIndex((i) => (i - 1 + list.length) % list.length),
    [list.length],
  );
  const goNext = useCallback(
    () => setIndex((i) => (i + 1) % list.length),
    [list.length],
  );

  // Keyboard nav
  useEffect(() => {
    if (list.length <= 1) return;
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && e.target.matches("input, textarea")) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goPrev, goNext, list.length]);

  // Touch swipe (mobile)
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx > 0) goPrev();
      else goNext();
    }
    touchStartX.current = null;
  };

  // Loading / empty states
  if (hasSelection && (matches === null || matches.length === 0)) {
    if (matches === null) {
      return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-72 animate-pulse rounded-2xl border border-[var(--color-border)] bg-stone-50"
            />
          ))}
        </div>
      );
    }
    return (
      <EmptyState
        titleZh="暂无匹配配方"
        titleEn="No matching recipes"
        descriptionZh="试试少选几种，或换个分类。"
        descriptionEn="Try fewer ingredients or another category."
      />
    );
  }

  if (list.length === 0) {
    return (
      <EmptyState
        titleZh="点击原料开始"
        titleEn="Tap an ingredient to start"
        descriptionZh="或拖入上方（电脑端）"
        descriptionEn="Or drag into the drop zone above (desktop)."
      />
    );
  }

  const current = list[index];
  const isMulti = list.length > 1;

  return (
    <section
      className="flex flex-col gap-5"
      aria-label="推荐配方 / Recommended recipes"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative px-1 sm:px-12">
        {isMulti && (
          <button
            type="button"
            onClick={goPrev}
            aria-label="上一个 / Previous"
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-lg text-[var(--color-text-secondary)] shadow-sm transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] sm:-left-2"
          >
            ‹
          </button>
        )}

        <RecipeCard
          key={current.recipe.id}
          recipe={current.recipe}
          match={current}
          selectedIds={selectedIds}
        />

        {isMulti && (
          <button
            type="button"
            onClick={goNext}
            aria-label="下一个 / Next"
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-lg text-[var(--color-text-secondary)] shadow-sm transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] sm:-right-2"
          >
            ›
          </button>
        )}
      </div>

      {isMulti && (
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            {list.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`第 ${i + 1} 个配方 / Recipe ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index
                    ? "w-8 bg-[var(--color-accent)]"
                    : "w-1.5 bg-[var(--color-border-strong)] hover:bg-[var(--color-text-muted)]",
                )}
              />
            ))}
          </div>
          <p className="text-xs tabular-nums text-[var(--color-text-muted)]">
            <span className="font-semibold text-[var(--color-text-primary)]">{index + 1}</span>
            <span className="mx-1">/</span>
            <span>{list.length}</span>
            <span className="ml-2 hidden sm:inline">·  ← → 键或滑动切换</span>
          </p>
        </div>
      )}
    </section>
  );
}
