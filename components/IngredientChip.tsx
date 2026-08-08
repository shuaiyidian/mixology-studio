"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { Ingredient } from "@/lib/types";
import { cn } from "@/lib/ui/cn";

interface IngredientChipProps {
  ingredient: Ingredient;
  selected: boolean;
  onToggle: (id: string) => void;
}

export function IngredientChip({ ingredient, selected, onToggle }: IngredientChipProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `ingredient-${ingredient.id}`,
    data: { kind: "ingredient", ingredientId: ingredient.id },
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <button
      ref={setNodeRef}
      type="button"
      style={style}
      onClick={() => onToggle(ingredient.id)}
      {...listeners}
      {...attributes}
      aria-label={`${ingredient.nameZh}${selected ? " (已选)" : ""}`}
      aria-pressed={selected}
      className={cn(
        "group flex w-full items-center gap-2 rounded-lg border bg-[var(--color-surface-elevated)] p-2 text-left transition-all duration-200 sm:gap-3 sm:rounded-xl sm:p-3",
        selected
          ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] shadow-sm"
          : "border-[var(--color-border)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-accent-soft)]/30",
        "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2",
        "cursor-grab active:cursor-grabbing touch-manipulation",
        isDragging && "scale-[1.03] border-[var(--color-accent)] shadow-md",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-6 w-6 shrink-0 rounded-full border sm:h-8 sm:w-8",
          selected ? "border-[var(--color-accent)] ring-2 ring-[var(--color-accent)]/30" : "border-[var(--color-border)]",
        )}
        style={{ backgroundColor: ingredient.colorHex ?? "#EEEEEA" }}
      />
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-xs font-medium text-[var(--color-text-primary)] sm:text-sm">
          {ingredient.nameZh}
          <span className="ml-1 hidden text-[10px] font-normal text-[var(--color-text-muted)] sm:inline sm:text-xs">
            / {ingredient.nameEn}
          </span>
        </span>
        <span className="mt-0.5 hidden w-fit items-center rounded-full bg-[var(--color-surface)] px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-[var(--color-text-secondary)] sm:inline-flex sm:px-2">
          {ingredient.category.replace("_SPIRIT", "").replace("_", " ")}
        </span>
      </span>
      {selected ? (
        <span
          aria-hidden
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-[10px] font-bold text-white sm:h-6 sm:w-6 sm:text-xs"
        >
          ✓
        </span>
      ) : (
        <span
          aria-hidden
          className="hidden h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] text-xs text-[var(--color-text-muted)] group-hover:flex"
        >
          +
        </span>
      )}
    </button>
  );
}
