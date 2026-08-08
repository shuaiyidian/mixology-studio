"use client";

import type { IngredientCategory } from "@/lib/types";
import { cn } from "@/lib/ui/cn";

export type CategoryFilterValue = IngredientCategory | "ALL";

interface CategoryFilterProps {
  value: CategoryFilterValue;
  onChange: (value: CategoryFilterValue) => void;
}

const tabs: Array<{ value: CategoryFilterValue; labelZh: string; labelEn: string }> = [
  { value: "ALL", labelZh: "全部", labelEn: "All" },
  { value: "BASE_SPIRIT", labelZh: "基酒", labelEn: "Base spirit" },
  { value: "LIQUEUR", labelZh: "利口酒", labelEn: "Liqueur" },
  { value: "WINE", labelZh: "美思", labelEn: "Wine" },
  { value: "JUICE", labelZh: "果汁", labelEn: "Juice" },
  { value: "SYRUP", labelZh: "糖浆", labelEn: "Syrup" },
  { value: "BITTERS", labelZh: "苦精", labelEn: "Bitters" },
  { value: "DAIRY", labelZh: "乳蛋", labelEn: "Dairy" },
  { value: "HERB_SPICE", labelZh: "香草", labelEn: "Herb" },
  { value: "GARNISH", labelZh: "装饰", labelEn: "Garnish" },
  { value: "OTHER", labelZh: "其他", labelEn: "Other" },
];

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <div
      role="tablist"
      aria-label="原料分类 / Ingredient categories"
      // Mobile: full-width horizontal scroll, no scrollbar, snap to start
      // Desktop: wrap to multiple rows (original behavior)
      className={cn(
        "-mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-1",
        "sm:mx-0 sm:snap-none sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0",
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
      )}
    >
      {tabs.map((tab) => {
        const active = tab.value === value;
        return (
          <button
            key={tab.value}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(tab.value)}
            style={{ scrollSnapAlign: "start" }}
            className={cn(
              "shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-200 sm:px-4",
              active
                ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                : "border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)]",
            )}
          >
            {tab.labelZh}
            <span
              className={cn(
                "ml-1.5 text-xs",
                active ? "text-white/80" : "text-[var(--color-text-muted)]",
                "hidden sm:inline",
              )}
            >
              / {tab.labelEn}
            </span>
          </button>
        );
      })}
    </div>
  );
}
