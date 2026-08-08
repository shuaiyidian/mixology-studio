"use client";

import type { Ingredient } from "@/lib/types";
import { cn } from "@/lib/ui/cn";

interface SelectedIngredientChipProps {
  ingredient: Ingredient;
  onRemove: (id: string) => void;
}

export function SelectedIngredientChip({ ingredient, onRemove }: SelectedIngredientChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] py-1.5 pl-1.5 pr-2 text-sm",
        "transition-colors duration-200 hover:border-[var(--color-border-strong)]",
      )}
    >
      <span
        aria-hidden="true"
        className="h-5 w-5 rounded-full border border-[var(--color-border)]"
        style={{ backgroundColor: ingredient.colorHex ?? "#EEEEEA" }}
      />
      <span className="font-medium text-[var(--color-text-primary)]">
        {ingredient.nameZh}
        <span className="ml-1 text-xs font-normal text-[var(--color-text-muted)]">
          / {ingredient.nameEn}
        </span>
      </span>
      <button
        type="button"
        onClick={() => onRemove(ingredient.id)}
        aria-label={`移除 ${ingredient.nameZh}`}
        className={cn(
          "ml-0.5 flex h-5 w-5 items-center justify-center rounded-full text-[var(--color-text-muted)]",
          "transition-colors duration-200 hover:bg-[var(--color-surface)] hover:text-[var(--color-danger)]",
        )}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path
            d="M1 1L9 9M9 1L1 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </span>
  );
}
