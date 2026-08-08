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
    <section aria-label="已选原料 / Selected" className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
          已选
          <span className="ml-2 text-sm font-normal text-[var(--color-text-muted)]">
            / Selected
          </span>
        </h2>
        {!isEmpty && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs text-[var(--color-text-muted)] underline-offset-2 hover:text-[var(--color-danger)] hover:underline"
          >
            清空 / Clear
          </button>
        )}
      </div>

      <div
        ref={setNodeRef}
        data-testid="drop-zone"
        className={cn(
          "min-h-[88px] rounded-2xl border-2 border-dashed bg-[var(--color-surface-elevated)] p-4",
          "transition-colors duration-200",
          isEmpty
            ? "border-[var(--color-border)]"
            : "border-[var(--color-border-strong)]",
          isOver && "border-[var(--color-accent)] bg-[var(--color-accent-soft)]/40",
        )}
      >
        {isEmpty ? (
          <p className="py-4 text-center text-sm text-[var(--color-text-muted)]">
            点击或拖入原料
          </p>
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
    </section>
  );
}
