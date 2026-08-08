// B6 — Visual balance profile component.
// Renders 4 horizontal bars (甘 酸 苦 烈) with category colors and zh/en labels.

import { computeBalance, type BalanceProfile } from "@/lib/balance";
import type { RecipeWithRelations } from "@/lib/types";

interface Props {
  recipe: RecipeWithRelations;
  /** Optional pre-computed profile (saves re-computing on every render). */
  profile?: BalanceProfile;
}

const AXES: Array<{
  key: keyof BalanceProfile;
  zh: string;
  en: string;
  bgClass: string;
  barClass: string;
  textClass: string;
}> = [
  { key: "sweet", zh: "甘", en: "Sweet", bgClass: "bg-amber-50", barClass: "bg-amber-400", textClass: "text-amber-700" },
  { key: "sour", zh: "酸", en: "Sour", bgClass: "bg-lime-50", barClass: "bg-lime-500", textClass: "text-lime-700" },
  { key: "bitter", zh: "苦", en: "Bitter", bgClass: "bg-stone-100", barClass: "bg-stone-600", textClass: "text-stone-700" },
  { key: "strong", zh: "烈", en: "Strong", bgClass: "bg-rose-50", barClass: "bg-rose-500", textClass: "text-rose-700" },
];

export function BalanceIndicator({ recipe, profile }: Props) {
  const data = profile ?? computeBalance(recipe);

  return (
    <section
      aria-labelledby="balance-heading"
      className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6"
    >
      <div className="mb-5 flex items-baseline justify-between">
        <h2 id="balance-heading" className="text-xl font-semibold text-[var(--color-text-primary)]">
          风味平衡 <span className="text-base font-normal text-[var(--color-text-secondary)]">/ Balance</span>
        </h2>
        <span className="text-xs text-[var(--color-text-muted)]">算法根据配方原料 + 标签推算</span>
      </div>

      <div className="space-y-4">
        {AXES.map(({ key, zh, en, bgClass, barClass, textClass }) => {
          const value = data[key];
          return (
            <div key={key} className="flex items-center gap-4">
              <div className="w-16 shrink-0">
                <div className={`text-lg font-semibold ${textClass}`}>{zh}</div>
                <div className="text-xs text-[var(--color-text-muted)]">{en}</div>
              </div>
              <div className={`relative h-3 flex-1 overflow-hidden rounded-full ${bgClass}`}>
                <div
                  className={`absolute inset-y-0 left-0 ${barClass} transition-all duration-500`}
                  style={{ width: `${value}%` }}
                  role="progressbar"
                  aria-valuenow={value}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${zh} ${en} ${value}%`}
                />
              </div>
              <div className="w-12 shrink-0 text-right">
                <span className="text-sm font-medium text-[var(--color-text-primary)] tabular-nums">
                  {value}
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">/100</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
