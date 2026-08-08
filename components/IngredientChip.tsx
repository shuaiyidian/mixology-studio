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

const categoryLabel: Record<Ingredient["category"], string> = {
  BASE_SPIRIT: "基酒",
  LIQUEUR: "利口酒",
  WINE: "葡萄酒",
  JUICE: "果汁",
  SYRUP: "糖浆",
  BITTERS: "苦精",
  SODA: "汽水",
  DAIRY: "乳蛋",
  HERB_SPICE: "香草",
  GARNISH: "装饰",
  OTHER: "其他",
};

export function IngredientChip({ ingredient, selected, onToggle }: IngredientChipProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `ingredient-${ingredient.id}`,
    data: { kind: "ingredient", ingredientId: ingredient.id },
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    // Make the original slot stay in place while a ghost floats out
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <button
      ref={setNodeRef}
      type="button"
      style={style}
      // Click is the primary interaction on touch; drag still works on desktop
      // because dnd-kit's PointerSensor with distance:4 only consumes the event
      // once the user moves past 4px. A tap (no movement) fires onClick.
      onClick={() => onToggle(ingredient.id)}
      {...listeners}
      {...attributes}
      aria-label={`${ingredient.nameZh} / ${ingredient.nameEn}`}
      aria-pressed={selected}
      className={cn(
        "group flex w-full items-center gap-3 rounded-xl border bg-[var(--color-surface-elevated)] p-3 text-left transition-all duration-200",
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
          "h-8 w-8 shrink-0 rounded-full border",
          selected ? "border-[var(--color-accent)] ring-2 ring-[var(--color-accent)]/30" : "border-[var(--color-border)]",
        )}
        style={{ backgroundColor: ingredient.colorHex ?? "#EEEEEA" }}
      />
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-medium text-[var(--color-text-primary)]">
          {ingredient.nameZh}
          <span className="ml-1.5 text-xs font-normal text-[var(--color-text-muted)]">
            / {ingredient.nameEn}
          </span>
        </span>
        <span className="mt-0.5 inline-flex w-fit items-center rounded-full bg-[var(--color-surface)] px-2 py-0.5 text-[10px] uppercase tracking-wider text-[var(--color-text-secondary)]">
          {categoryLabel[ingredient.category]}
        </span>
      </span>
      {selected ? (
        <span
          aria-hidden
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-xs font-bold text-white"
          title="已添加 / Click to remove"
        >
          ✓
        </span>
      ) : (
        <span
          aria-hidden
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] text-xs text-[var(--color-text-muted)] opacity-0 transition-opacity group-hover:opacity-100"
          title="点击添加 / Click to add"
        >
          +
        </span>
      )}
    </button>
  );
}
