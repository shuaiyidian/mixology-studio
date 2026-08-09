"use client";

import { useState } from "react";
import type { Ingredient } from "@/lib/types";
import type { InnovateResult } from "@/lib/llm/innovate";
import { cn } from "@/lib/ui/cn";

interface InnovationPanelProps {
  selectedIngredients: Ingredient[];
}

type Strength = "light" | "balanced" | "strong";

const strengthOptions: Array<{ value: Strength; labelZh: string; labelEn: string }> = [
  { value: "light", labelZh: "轻盈", labelEn: "Light" },
  { value: "balanced", labelZh: "平衡", labelEn: "Balanced" },
  { value: "strong", labelZh: "浓烈", labelEn: "Strong" },
];

const glassOptions = [
  { value: "", labelZh: "任意杯型", labelEn: "Any glass" },
  { value: "rocks", labelZh: "古典杯", labelEn: "Rocks" },
  { value: "coupe", labelZh: "鸡尾酒杯", labelEn: "Coupe" },
  { value: "highball", labelZh: "高球杯", labelEn: "Highball" },
  { value: "collins", labelZh: "可林斯杯", labelEn: "Collins" },
  { value: "flute", labelZh: "笛型杯", labelEn: "Flute" },
  { value: "nick-nora", labelZh: "尼诺拉杯", labelEn: "Nick & Nora" },
];

export function InnovationPanel({ selectedIngredients }: InnovationPanelProps) {
  const [vibe, setVibe] = useState("");
  const [strength, setStrength] = useState<Strength>("balanced");
  const [glass, setGlass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ kind: "config" | "rate" | "timeout" | "parse" | "other"; message: string } | null>(null);
  const [result, setResult] = useState<InnovateResult | null>(null);

  const canGenerate = selectedIngredients.length > 0 && !loading;

  const generate = async () => {
    if (!canGenerate) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/innovate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredientIds: selectedIngredients.map((i) => i.id),
          options: {
            vibe: vibe.trim() || undefined,
            strength,
            glass: glass || undefined,
          },
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data.code === "LLM_NOT_CONFIGURED") {
          setError({ kind: "config", message: data.error ?? "AI 模式未配置" });
        } else if (data.code === "rate_limit") {
          setError({ kind: "rate", message: "调用太频繁，稍等几秒再试 / Rate limited" });
        } else if (data.code === "timeout") {
          setError({ kind: "timeout", message: "模型响应超时，再试一次 / LLM timeout" });
        } else if (data.code === "parse") {
          setError({ kind: "parse", message: "模型输出格式异常，再试一次 / Bad model output" });
        } else {
          setError({ kind: "other", message: data.error ?? `HTTP ${res.status}` });
        }
        return;
      }
      const data: InnovateResult & { meta?: { selectedCount: number; computedAt: string } } = await res.json();
      setResult(data);
    } catch (e) {
      setError({ kind: "other", message: (e as Error).message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="flex flex-col gap-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6"
      aria-label="AI 创新模式 / AI innovation mode"
    >
      <header className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
          <span className="mr-2" aria-hidden="true">✨</span>
          AI 创新模式
          <span className="ml-2 text-sm font-normal text-[var(--color-text-muted)]">
            / Innovation
          </span>
        </h2>
        <p className="text-xs text-[var(--color-text-muted)]">
          选好原料 → 点生成 → LLM 给你现场编一杯原创鸡尾酒（不是经典里抄的）
        </p>
      </header>

      {selectedIngredients.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[var(--color-border)] p-6 text-center text-sm text-[var(--color-text-muted)]">
          请先在下方选择至少 1 种原料 / Pick at least 1 ingredient below
        </div>
      ) : (
        <>
          {/* Style chips */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
                烈度 / Strength
              </label>
              <div className="flex flex-wrap gap-2">
                {strengthOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setStrength(opt.value)}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                      strength === opt.value
                        ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                        : "border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)]",
                    )}
                  >
                    {opt.labelZh}
                    <span className="ml-1 text-xs opacity-80">/ {opt.labelEn}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
                杯型 / Glass
              </label>
              <div className="flex flex-wrap gap-2">
                {glassOptions.map((opt) => (
                  <button
                    key={opt.value || "any"}
                    type="button"
                    onClick={() => setGlass(opt.value)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-sm transition-colors",
                      glass === opt.value
                        ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                        : "border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)]",
                    )}
                  >
                    {opt.labelZh}
                    {opt.value ? <span className="ml-1 text-xs opacity-80">/ {opt.labelEn}</span> : null}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
                氛围（可选）/ Vibe (optional)
              </label>
              <input
                type="text"
                value={vibe}
                onChange={(e) => setVibe(e.target.value)}
                maxLength={120}
                placeholder="比如：夏夜海边 / cozy winter / after-dinner sipper"
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none"
              />
            </div>
          </div>

          {/* Action button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={generate}
              disabled={!canGenerate}
              className={cn(
                "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
                "bg-[var(--color-accent)] text-white shadow-sm hover:brightness-110",
                "disabled:cursor-not-allowed disabled:opacity-50",
              )}
            >
              {loading ? (
                <>
                  <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  正在调酒 / Mixing…
                </>
              ) : result ? (
                <>
                  <span aria-hidden="true">🔄</span>
                  换一杯 / Regenerate
                </>
              ) : (
                <>
                  <span aria-hidden="true">✨</span>
                  生成新配方 / Generate
                </>
              )}
            </button>
            {result ? (
              <span className="text-xs text-[var(--color-text-muted)]">
                模型 {result.model} · {result.usage?.total ?? "?"} tokens
              </span>
            ) : null}
          </div>

          {/* Error */}
          {error ? (
            <div
              className={cn(
                "rounded-lg px-4 py-3 text-sm",
                error.kind === "config"
                  ? "bg-amber-50 text-amber-800 ring-1 ring-amber-200"
                  : "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
              )}
            >
              <p className="font-medium">
                {error.kind === "config" ? "AI 模式待启用 / AI mode not configured" : "生成失败 / Generation failed"}
              </p>
              <p className="mt-1 text-xs opacity-90">{error.message}</p>
            </div>
          ) : null}

          {/* Result */}
          {result ? <InnovationResultCard result={result} selectedIngredients={selectedIngredients} /> : null}
        </>
      )}
    </section>
  );
}

function InnovationResultCard({
  result,
  selectedIngredients,
}: {
  result: InnovateResult;
  selectedIngredients: Ingredient[];
}) {
  const { recipe, usedSelectedNames } = result;
  const usedSet = new Set(usedSelectedNames.map((n) => n.toLowerCase()));
  const totalSelected = selectedIngredients.length;
  const usedCount = selectedIngredients.filter(
    (i) => usedSet.has(i.nameZh.toLowerCase()) || usedSet.has(i.nameEn.toLowerCase()),
  ).length;

  return (
    <article className="flex flex-col gap-5 rounded-2xl border-2 border-[var(--color-accent)]/30 bg-gradient-to-br from-[var(--color-surface-elevated)] to-[var(--color-surface)] p-4 sm:p-6">
      <header className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[var(--color-accent)]/15 px-2.5 py-0.5 text-xs font-medium text-[var(--color-accent)]">
            ✨ AI 原创 / AI Original
          </span>
          {recipe.difficulty ? (
            <span className="rounded-full bg-[var(--color-surface-elevated)] px-2.5 py-0.5 text-xs text-[var(--color-text-muted)] ring-1 ring-[var(--color-border)]">
              {"★".repeat(recipe.difficulty)}
              <span className="ml-1 opacity-60">{"☆".repeat(3 - recipe.difficulty)}</span>
            </span>
          ) : null}
          {recipe.iceType ? (
            <span className="rounded-full bg-[var(--color-surface-elevated)] px-2.5 py-0.5 text-xs text-[var(--color-text-muted)] ring-1 ring-[var(--color-border)]">
              🧊 {recipe.iceType}
            </span>
          ) : null}
          <span className="rounded-full bg-[var(--color-surface-elevated)] px-2.5 py-0.5 text-xs text-[var(--color-text-muted)] ring-1 ring-[var(--color-border)]">
            🥃 {recipe.glassType}
          </span>
        </div>
        <h3 className="text-2xl font-bold leading-tight text-[var(--color-text-primary)] sm:text-3xl">
          {recipe.nameZh}
          <span className="ml-2 text-base font-normal text-[var(--color-text-muted)]">
            / {recipe.nameEn}
          </span>
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)]">{recipe.descriptionZh}</p>
        <p className="text-xs text-[var(--color-text-muted)]">{recipe.descriptionEn}</p>
        {recipe.storyNoteZh ? (
          <p className="mt-1 rounded-lg bg-[var(--color-surface-elevated)] p-3 text-xs italic text-[var(--color-text-secondary)]">
            <span aria-hidden="true">📜 </span>
            {recipe.storyNoteZh}
            {recipe.storyNoteEn ? (
              <span className="mt-1 block text-[var(--color-text-muted)] not-italic">
                {recipe.storyNoteEn}
              </span>
            ) : null}
          </p>
        ) : null}
      </header>

      {/* Coverage badge */}
      <div className="rounded-lg bg-[var(--color-surface-elevated)] px-3 py-2 text-xs text-[var(--color-text-muted)]">
        ✅ 用上你选的 {usedCount}/{totalSelected} 种原料
        {usedCount < totalSelected ? (
          <span className="ml-2 text-amber-700">
            （{totalSelected - usedCount} 种未用上，已自动要求重试）
          </span>
        ) : null}
      </div>

      {/* Balance tags */}
      {recipe.balanceTags.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {recipe.balanceTags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-[var(--color-accent)]/10 px-2.5 py-0.5 text-xs text-[var(--color-accent)]"
            >
              #{t}
            </span>
          ))}
        </div>
      ) : null}

      {/* Ingredients */}
      <section>
        <h4 className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
          原料 / Ingredients
        </h4>
        <ul className="divide-y divide-[var(--color-border)] rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
          {recipe.ingredients.map((ing, idx) => (
            <li key={idx} className="flex items-start gap-3 px-3 py-2 text-sm">
              <span
                aria-hidden="true"
                className={cn(
                  "mt-1 h-2 w-2 shrink-0 rounded-full",
                  ing.isKey ? "bg-[var(--color-accent)]" : "bg-[var(--color-border-strong)]",
                )}
              />
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-medium text-[var(--color-text-primary)]">
                    {ing.nameZh}
                    <span className="ml-1 text-xs font-normal text-[var(--color-text-muted)]">
                      / {ing.nameEn}
                    </span>
                  </span>
                  <span className="font-mono text-xs text-[var(--color-text-secondary)]">{ing.amount}</span>
                </div>
                {ing.notesZh ? (
                  <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">{ing.notesZh}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Steps */}
      <section>
        <h4 className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
          步骤 / Steps · {recipe.techniqueSlug}
        </h4>
        <ol className="flex flex-col gap-2.5">
          {recipe.steps.map((step, idx) => (
            <li key={idx} className="flex gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-xs font-bold text-white">
                {idx + 1}
              </span>
              <div className="flex-1">
                <p className="text-sm text-[var(--color-text-primary)]">{step.textZh}</p>
                <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">{step.textEn}</p>
                {step.duration ? (
                  <p className="mt-1 text-[10px] uppercase tracking-wide text-[var(--color-text-muted)]">
                    ⏱ {step.duration}
                  </p>
                ) : null}
                {step.tipZh ? (
                  <p className="mt-1 rounded bg-amber-50 px-2 py-1 text-xs text-amber-800 ring-1 ring-amber-200">
                    💡 {step.tipZh}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
