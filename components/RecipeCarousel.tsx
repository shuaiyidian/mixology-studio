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

  if (hasSelection && (matches === null || matches.length === 0)) {
    if (matches === null) {
      return (
        <div className="grid grid-cols-1 gap-3 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-xl border border-[var(--color-border)] bg-stone-50 sm:h-72 sm:rounded-2xl"
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

  const ArrowButton = ({
    direction,
    label,
  }: { direction: "prev" | "next"; label: string }) => (
    <button
      type="button"
      onClick={direction === "prev" ? goPrev : goNext}
      aria-label={label}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-sm text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] sm:h-11 sm:w-11 sm:text-lg"
    >
      {direction === "prev" ? "‹" : "›"}
    </button>
  );

  return (
    <section
      className="flex flex-col gap-3 sm:gap-5"
      aria-label="推荐配方 / Recommended recipes"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Desktop: side arrows around card. Mobile: full-width card. */}
      <div className="relative sm:px-12">
        {/* Side arrows only on sm+ */}
        {isMulti && (
          <>
            <div className="absolute -left-2 top-1/2 z-10 hidden -translate-y-1/2 sm:block">
              <ArrowButton direction="prev" label="上一个 / Previous" />
            </div>
            <div className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 sm:block">
              <ArrowButton direction="next" label="下一个 / Next" />
            </div>
          </>
        )}

        <RecipeCard
          key={current.recipe.id}
          recipe={current.recipe}
          match={current}
          selectedIds={selectedIds}
        />
      </div>

      {isMulti && (
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          {/* Mobile: arrows inline with dots */}
          <div className="sm:hidden">
            <ArrowButton direction="prev" label="上一个 / Previous" />
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {list.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`第 ${i + 1} 个配方 / Recipe ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index
                    ? "w-6 bg-[var(--color-accent)] sm:w-8"
                    : "w-1.5 bg-[var(--color-border-strong)] hover:bg-[var(--color-text-muted)]",
                )}
              />
            ))}
          </div>

          <div className="sm:hidden">
            <ArrowButton direction="next" label="下一个 / Next" />
          </div>
        </div>
      )}

      {isMulti && (
        <p className="hidden text-center text-xs tabular-nums text-[var(--color-text-muted)] sm:block">
          <span className="font-semibold text-[var(--color-text-primary)]">{index + 1}</span>
          <span className="mx-1">/</span>
          <span>{list.length}</span>
          <span className="ml-2">·  ← → 键或滑动切换</span>
        </p>
      )}
    </section>
  );
}
