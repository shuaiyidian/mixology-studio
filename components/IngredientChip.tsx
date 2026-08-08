"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { Ingredient } from "@/lib/types";
import { cn } from "@/lib/ui/cn";

interface IngredientChipProps {
  ingredient: Ingredient;
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

export function IngredientChip({ ingredient }: IngredientChipProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `ingredient-${ingredient.id}`,
    data: { kind: "ingredient", ingredientId: ingredient.id },
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    // Make the original slot stay in place while a ghost floats out
    opacity: isDragging ? 0.5 : 1,
    // Subtle scale up handled via className; keep transform pure for dnd-kit
  };

  return (
    <button
      ref={setNodeRef}
      type="button"
      style={style}
      {...listeners}
      {...attributes}
      aria-label={`${ingredient.nameZh} / ${ingredient.nameEn}`}
      className={cn(
        "group flex w-full items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-3 text-left transition-all duration-200",
        "hover:border-[var(--color-border-strong)] hover:bg-[var(--color-accent-soft)]/30",
        "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2",
        "cursor-grab active:cursor-grabbing",
        isDragging && "scale-[1.03] border-[var(--color-accent)] shadow-md",
      )}
    >
      <span
        aria-hidden="true"
        className="h-8 w-8 shrink-0 rounded-full border border-[var(--color-border)]"
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
    </button>
  );
}
