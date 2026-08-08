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
    <section aria-label="已选原料 / Selected" className="flex flex-col gap-2 sm:gap-3">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-semibold text-[var(--color-text-primary)] sm:text-xl">
          已选
          <span className="ml-1.5 text-xs font-normal text-[var(--color-text-muted)] sm:ml-2 sm:text-sm">
            / Selected
            {count > 0 && <span className="ml-1 font-medium text-[var(--color-text-primary)]">· {count}</span>}
          </span>
        </h2>
        {!isEmpty && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-[10px] text-[var(--color-text-muted)] underline-offset-2 hover:text-[var(--color-danger)] hover:underline sm:text-xs"
          >
            清空 / Clear
          </button>
        )}
      </div>

      <div
        ref={setNodeRef}
        data-testid="drop-zone"
        className={cn(
          "min-h-[56px] rounded-xl border-2 border-dashed bg-[var(--color-surface-elevated)] p-2.5 sm:min-h-[88px] sm:rounded-2xl sm:p-4",
          "transition-colors duration-200",
          isEmpty ? "border-[var(--color-border)]" : "border-[var(--color-border-strong)]",
          isOver && "border-[var(--color-accent)] bg-[var(--color-accent-soft)]/40",
        )}
      >
        {isEmpty ? (
          <p className="py-2 text-center text-xs text-[var(--color-text-muted)] sm:text-sm">
            点击或拖入原料
          </p>
        ) : (
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
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
