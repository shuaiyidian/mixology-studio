"use client";

import { useDroppable } from "@dnd-kit/core";
import type { Ingredient } from "@/lib/types";
import { SelectedIngredientChip } from "./SelectedIngredientChip";
import { cn } from "@/lib/ui/cn";

interface DropZoneProps {
  selectedIngredients: Ingredient[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

export function DropZone({ selectedIngredients, onRemove, onClearAll }: DropZoneProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: "drop-zone",
    data: { kind: "dropzone" },
  });

  const count = selectedIngredients.length;
  const isEmpty = count === 0;

  return (
    <section
      aria-label="已选原料 / Selected ingredients"
      className="flex flex-col gap-4"
    >
      <div className="flex items-baseline justify-between">
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
          已选原料
          <span className="ml-2 text-sm font-normal text-[var(--color-text-secondary)]">
            / Selected ingredients
          </span>
        </h2>
        <span className="text-sm text-[var(--color-text-secondary)]">
          {isEmpty
            ? "请从下方拖入 / Drag from below"
            : `已选 ${count} 种 / ${count} selected`}
        </span>
      </div>

      <div
        ref={setNodeRef}
        data-testid="drop-zone"
        className={cn(
          "relative min-h-[120px] rounded-2xl border-2 border-dashed bg-[var(--color-surface-elevated)] p-6",
          "transition-all duration-200",
          isEmpty
            ? "border-[var(--color-border)]"
            : "border-[var(--color-border-strong)]",
          isOver && "border-[var(--color-accent)] bg-[var(--color-accent-soft)]/40",
        )}
      >
        {isEmpty ? (
          <div className="flex h-full min-h-[88px] flex-col items-center justify-center gap-1 text-center">
            <p className="text-base font-medium text-[var(--color-text-secondary)]">
              把原料拖到这里
            </p>
            <p className="text-sm text-[var(--color-text-muted)]">
              Drag ingredients here
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selectedIngredients.map((ing) => (
              <SelectedIngredientChip
                key={ing.id}
                ingredient={ing}
                onRemove={onRemove}
              />
            ))}
          </div>
        )}
      </div>

      {!isEmpty && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClearAll}
            className={cn(
              "rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-1.5 text-sm",
              "text-[var(--color-text-secondary)] transition-colors duration-200",
              "hover:border-[var(--color-danger)] hover:text-[var(--color-danger)]",
            )}
          >
            清空 / Clear all
          </button>
        </div>
      )}
    </section>
  );
}
