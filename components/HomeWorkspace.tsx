"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { Header } from "@/components/Header";
import { IngredientPalette } from "@/components/IngredientPalette";
import { DropZone } from "@/components/DropZone";
import { RecipeResults } from "@/components/RecipeResults";
import { CategoryFilter, type CategoryFilterValue } from "@/components/CategoryFilter";
import type { Ingredient, MatchResponse, MatchResult } from "@/lib/types";

interface Props {
  ingredients: Ingredient[];
}

export function HomeWorkspace({ ingredients }: Props) {
  const [category, setCategory] = useState<CategoryFilterValue>("ALL");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeDragIngredient, setActiveDragIngredient] = useState<Ingredient | null>(null);
  const [matches, setMatches] = useState<MatchResult[] | null>(null);
  const [loadingMatches, setLoadingMatches] = useState(false);
  const [matchError, setMatchError] = useState<string | null>(null);

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);
  const selectedIngredients = useMemo(
    () => selectedIds.map((id) => ingredients.find((i) => i.id === id)).filter((i): i is Ingredient => Boolean(i)),
    [selectedIds, ingredients],
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
  );

  // Debounced fetch of /api/match whenever selection changes.
  useEffect(() => {
    if (selectedIds.length === 0) {
      setMatches(null);
      setLoadingMatches(false);
      setMatchError(null);
      return;
    }
    setLoadingMatches(true);
    setMatchError(null);
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch("/api/match", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ingredientIds: selectedIds }),
          signal: controller.signal,
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          setMatchError(err.error ?? `HTTP ${res.status}`);
          setMatches([]);
          return;
        }
        const data: MatchResponse = await res.json();
        setMatches(data.results);
      } catch (e) {
        if ((e as Error).name !== "AbortError") {
          setMatchError((e as Error).message);
          setMatches([]);
        }
      } finally {
        setLoadingMatches(false);
      }
    }, 220);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [selectedIds]);

  const handleDragStart = (event: DragStartEvent) => {
    const data = event.active.data.current as
      | { kind: "ingredient"; ingredientId: string }
      | undefined;
    if (data?.kind === "ingredient") {
      const ing = ingredients.find((i) => i.id === data.ingredientId);
      if (ing) setActiveDragIngredient(ing);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDragIngredient(null);
    const { active, over } = event;
    if (!over) return;
    const overData = over.data.current as { kind: "dropzone" } | undefined;
    if (overData?.kind !== "dropzone") return;
    const activeData = active.data.current as
      | { kind: "ingredient"; ingredientId: string }
      | undefined;
    if (activeData?.kind !== "ingredient") return;
    setSelectedIds((prev) =>
      prev.includes(activeData.ingredientId) ? prev : [...prev, activeData.ingredientId],
    );
  };

  const handleRemove = (id: string) => {
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  };

  // Tap-to-toggle handler: adds the ingredient if not selected, removes it if it is.
  // Works on touch (tap = no movement = onClick fires) and on desktop (regular click).
  // Drag still works because dnd-kit's PointerSensor with distance:4 only consumes the
  // event when the pointer moves past 4px.
  const handleToggle = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleClearAll = () => setSelectedIds([]);

  // matches is the authoritative "computing" state. When loading, show skeleton
  // (handled inside RecipeResults when matches is null but selection exists).
  const effectiveMatches = loadingMatches && matches === null ? null : matches;

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:gap-12 sm:px-6 sm:py-12 lg:gap-16 lg:px-8">
        <Header />

        <div className="flex flex-col gap-4 sm:gap-12">
          <DropZone
            selectedIngredients={selectedIngredients}
            onRemove={handleRemove}
            onClearAll={handleClearAll}
          />

          <RecipeResults
            matches={effectiveMatches}
            selectedIds={selectedSet}
          />

          <IngredientPalette
            ingredients={ingredients}
            category={category}
            onCategoryChange={setCategory}
            selectedIds={selectedSet}
            onToggle={handleToggle}
          />

          {matchError && (
            <p className="rounded-lg bg-rose-50 px-4 py-2 text-sm text-rose-700 ring-1 ring-rose-200">
              匹配出错 / Match error: {matchError}
            </p>
          )}
        </div>

        <footer className="border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-text-muted)]">
          Mixology Studio · 调酒配方推荐 · B7 集成联调
        </footer>
      </div>

      <DragOverlay dropAnimation={null}>
        {activeDragIngredient ? (
          <div className="pointer-events-none flex items-center gap-3 rounded-xl border border-[var(--color-accent)] bg-[var(--color-surface-elevated)] px-3 py-2 shadow-lg">
            <span
              aria-hidden="true"
              className="h-5 w-5 rounded-full border border-[var(--color-border)]"
              style={{ backgroundColor: activeDragIngredient.colorHex ?? "#EEEEEA" }}
            />
            <span className="text-sm font-medium text-[var(--color-text-primary)]">
              {activeDragIngredient.nameZh}
              <span className="ml-1 text-xs text-[var(--color-text-muted)]">
                / {activeDragIngredient.nameEn}
              </span>
            </span>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
