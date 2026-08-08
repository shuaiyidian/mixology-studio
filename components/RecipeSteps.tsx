// B5 — Recipe steps list with technique badges and tips.

import type { RecipeWithRelations } from "@/lib/types";

interface Props {
  recipe: RecipeWithRelations;
}

export function RecipeSteps({ recipe }: Props) {
  return (
    <section
      aria-labelledby="steps-heading"
      className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6"
    >
      <h2 id="steps-heading" className="mb-5 text-xl font-semibold text-[var(--color-text-primary)]">
        制作步骤 <span className="text-base font-normal text-[var(--color-text-secondary)]">/ Steps</span>
      </h2>
      <ol className="space-y-5">
        {recipe.steps.map((step) => (
          <li key={step.id} className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-sm font-semibold text-[var(--color-accent)]">
              {step.order}
            </div>
            <div className="flex-1 min-w-0">
              <p className="leading-relaxed text-[var(--color-text-primary)]">
                {step.instructionZh}
                {step.instructionEn && (
                  <span className="ml-2 text-sm text-[var(--color-text-secondary)]">
                    / {step.instructionEn}
                  </span>
                )}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[var(--color-text-muted)]">
                {step.technique && (
                  <span className="inline-flex items-center rounded-full bg-stone-100 px-2 py-0.5 text-stone-700">
                    → {step.technique.nameZh}{" "}
                    <span className="text-stone-500">/ {step.technique.nameEn}</span>
                  </span>
                )}
                {step.duration && (
                  <span className="inline-flex items-center gap-1 font-mono text-[var(--color-text-muted)]">
                    ⏱ {step.duration}
                  </span>
                )}
              </div>
              {step.tipZh && (
                <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-900 ring-1 ring-amber-200/60">
                  <span className="font-semibold">提示 / Tip:</span> {step.tipZh}
                  {step.tipEn && <span className="text-amber-800/80"> · {step.tipEn}</span>}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
