"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Ingredient } from "@/lib/types";
import type { InnovateResult } from "@/lib/llm/innovate";
import {
  formatRecipeAsText,
  listSaved,
  onStorageChange,
  save as saveStorage,
  unsave,
  type SavedInnovation,
} from "@/lib/storage/savedInnovations";
import { GlassSVG } from "@/components/GlassSVG";
import { SavedInnovationsList } from "@/components/SavedInnovationsList";
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

/** Color mapping for balance tags so each flavor family reads visually distinct. */
const TAG_COLORS: Record<string, { bg: string; fg: string; border: string }> = {
  refreshing: { bg: "bg-cyan-50", fg: "text-cyan-800", border: "ring-cyan-200" },
  citrusy: { bg: "bg-amber-50", fg: "text-amber-800", border: "ring-amber-200" },
  bitter: { bg: "bg-purple-50", fg: "text-purple-800", border: "ring-purple-200" },
  smoky: { bg: "bg-stone-200", fg: "text-stone-800", border: "ring-stone-300" },
  herbal: { bg: "bg-emerald-50", fg: "text-emerald-800", border: "ring-emerald-200" },
  floral: { bg: "bg-pink-50", fg: "text-pink-800", border: "ring-pink-200" },
  tropical: { bg: "bg-orange-50", fg: "text-orange-800", border: "ring-orange-200" },
  creamy: { bg: "bg-yellow-50", fg: "text-yellow-800", border: "ring-yellow-200" },
  spicy: { bg: "bg-red-50", fg: "text-red-800", border: "ring-red-200" },
  dry: { bg: "bg-slate-50", fg: "text-slate-700", border: "ring-slate-200" },
  aromatic: { bg: "bg-violet-50", fg: "text-violet-800", border: "ring-violet-200" },
  "spirit-forward": { bg: "bg-orange-100", fg: "text-orange-900", border: "ring-orange-300" },
  warming: { bg: "bg-rose-50", fg: "text-rose-800", border: "ring-rose-200" },
  sessionable: { bg: "bg-teal-50", fg: "text-teal-800", border: "ring-teal-200" },
  complex: { bg: "bg-indigo-50", fg: "text-indigo-800", border: "ring-indigo-200" },
  savory: { bg: "bg-lime-50", fg: "text-lime-800", border: "ring-lime-200" },
  mineral: { bg: "bg-sky-50", fg: "text-sky-800", border: "ring-sky-200" },
  textural: { bg: "bg-fuchsia-50", fg: "text-fuchsia-800", border: "ring-fuchsia-200" },
};

function tagColors(tag: string) {
  return TAG_COLORS[tag.toLowerCase()] ?? {
    bg: "bg-[var(--color-accent)]/10",
    fg: "text-[var(--color-accent)]",
    border: "",
  };
}

function recipeSignature(r: { nameZh: string; ingredients: { nameZh: string }[] }) {
  return r.nameZh.trim() + "|" + r.ingredients.map((i) => i.nameZh).join(",");
}

export function InnovationPanel({ selectedIngredients }: InnovationPanelProps) {
  const [vibe, setVibe] = useState("");
  const [strength, setStrength] = useState<Strength>("balanced");
  const [glass, setGlass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ kind: "config" | "rate" | "timeout" | "parse" | "other"; message: string } | null>(null);
  const [result, setResult] = useState<InnovateResult | null>(null);
  const [saved, setSaved] = useState<SavedInnovation[]>([]);
  const [saveFlash, setSaveFlash] = useState<"saved" | "removed" | "copied" | null>(null);

  const canGenerate = selectedIngredients.length > 0 && !loading;
  const currentSig = result ? recipeSignature(result.recipe) : null;
  const isCurrentlySaved = useMemo(() => {
    if (!currentSig) return false;
    return saved.some((s) => recipeSignature(s.recipe) === currentSig);
  }, [saved, currentSig]);

  // Load saved items on mount + keep in sync across tabs.
  useEffect(() => {
    setSaved(listSaved());
    return onStorageChange(() => setSaved(listSaved()));
  }, []);

  const flashToast = useCallback((kind: "saved" | "removed" | "copied") => {
    setSaveFlash(kind);
    setTimeout(() => setSaveFlash(null), 1800);
  }, []);

  const handleSaveToggle = useCallback(() => {
    if (!result) return;
    const sig = recipeSignature(result.recipe);
    const existing = saved.find((s) => recipeSignature(s.recipe) === sig);
    if (existing) {
      const ok = unsave(existing.id);
      if (ok) {
        setSaved(listSaved());
        flashToast("removed");
      }
    } else {
      saveStorage({
        recipe: result.recipe,
        usedSelectedNames: result.usedSelectedNames,
        model: result.model,
        usage: result.usage,
        context: {
          ingredientIds: selectedIngredients.map((i) => i.id),
          vibe: vibe.trim() || undefined,
          strength,
          glass: glass || undefined,
        },
      });
      setSaved(listSaved());
      flashToast("saved");
    }
  }, [result, saved, selectedIngredients, vibe, strength, glass, flashToast]);

  const handleCopy = useCallback(async () => {
    if (!result) return;
    const sig = recipeSignature(result.recipe);
    const existing = saved.find((s) => recipeSignature(s.recipe) === sig);
    const text = formatRecipeAsText(
      existing ?? {
        id: "preview",
        savedAt: new Date().toISOString(),
        recipe: result.recipe,
        usedSelectedNames: result.usedSelectedNames,
        model: result.model,
        usage: result.usage,
      },
    );
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for very old browsers / non-secure contexts.
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      flashToast("copied");
    } catch (e) {
      console.error("[copy] failed:", e);
    }
  }, [result, saved, flashToast]);

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
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={generate}
              disabled={!canGenerate}
              className={cn(
                "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all",
                "bg-[var(--color-accent)] text-white shadow-sm hover:brightness-110",
                "disabled:cursor-not-allowed disabled:opacity-50",
              )}
            >
              {loading ? (
                <MixingDots />
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
          {result ? (
            <InnovationResultCard
              result={result}
              selectedIngredients={selectedIngredients}
              isSaved={isCurrentlySaved}
              onSaveToggle={handleSaveToggle}
              onCopy={handleCopy}
            />
          ) : null}

          {/* Saved list (shown when at least one item is saved) */}
          {saved.length > 0 ? (
            <SavedInnovationsList
              items={saved}
              onDeleted={() => setSaved(listSaved())}
              onCopy={handleCopy}
            />
          ) : null}

          {/* Toast for save / copy feedback */}
          {saveFlash ? <SaveToast kind={saveFlash} /> : null}
        </>
      )}
    </section>
  );
}

function MixingDots() {
  return (
    <span className="inline-flex items-center gap-1.5" aria-label="正在调酒">
      <span className="text-sm">正在调酒</span>
      <span className="flex gap-0.5">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white [animation-delay:0ms]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white [animation-delay:120ms]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white [animation-delay:240ms]" />
      </span>
    </span>
  );
}

function SaveToast({ kind }: { kind: "saved" | "removed" | "copied" }) {
  const text = {
    saved: "已收藏 / Saved",
    removed: "已移除 / Removed",
    copied: "已复制到剪贴板 / Copied",
  }[kind];
  const icon = { saved: "💾", removed: "🗑️", copied: "📋" }[kind];
  return (
    <div
      role="status"
      className="toast-pop fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[var(--color-text-primary)] px-4 py-2 text-sm font-medium text-white shadow-lg"
    >
      <span aria-hidden="true" className="mr-1.5">{icon}</span>
      {text}
    </div>
  );
}

function InnovationResultCard({
  result,
  selectedIngredients,
  isSaved,
  onSaveToggle,
  onCopy,
}: {
  result: InnovateResult;
  selectedIngredients: Ingredient[];
  isSaved: boolean;
  onSaveToggle: () => void;
  onCopy: () => void;
}) {
  const { recipe, usedSelectedNames } = result;
  const usedSet = new Set(usedSelectedNames.map((n) => n.toLowerCase()));
  const totalSelected = selectedIngredients.length;
  const usedCount = selectedIngredients.filter(
    (i) => usedSet.has(i.nameZh.toLowerCase()) || usedSet.has(i.nameEn.toLowerCase()),
  ).length;

  // Pick a primary accent color for the liquid based on a flavor tag.
  const primary = recipe.balanceTags[0]?.toLowerCase() ?? "refreshing";
  const liquidColor = {
    refreshing: "#7dd3fc",
    citrusy: "#fcd34d",
    bitter: "#a78bfa",
    smoky: "#78716c",
    herbal: "#6ee7b7",
    floral: "#f9a8d4",
    tropical: "#fb923c",
    creamy: "#fef3c7",
    spicy: "#fca5a5",
    "spirit-forward": "#f59e0b",
    warming: "#fb7185",
    dry: "#cbd5e1",
    aromatic: "#c4b5fd",
    sessionable: "#5eead4",
  }[primary] ?? "#7dd3fc";

  return (
    <article className="flex flex-col gap-5 rounded-2xl border-2 border-[var(--color-accent)]/30 bg-gradient-to-br from-[var(--color-surface-elevated)] to-[var(--color-surface)] p-4 sm:p-6">
      {/* Header: glass illustration + title + actions */}
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-5">
        <div className="flex shrink-0 justify-center sm:justify-start">
          <GlassSVG
            glass={recipe.glassType}
            fill={0.72}
            liquidColor={liquidColor}
            className="h-24 w-20 text-[var(--color-text-muted)] sm:h-28 sm:w-24"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[var(--color-accent)]/15 px-2.5 py-0.5 text-xs font-medium text-[var(--color-accent)]">
              ✨ AI 原创 / AI Original
            </span>
            {recipe.difficulty ? (
              <span
                className="rounded-full bg-[var(--color-surface-elevated)] px-2.5 py-0.5 text-xs text-[var(--color-text-muted)] ring-1 ring-[var(--color-border)]"
                title={`难度 ${recipe.difficulty}/3`}
              >
                {"★".repeat(recipe.difficulty)}
                <span className="ml-1 opacity-60">{"☆".repeat(3 - recipe.difficulty)}</span>
              </span>
            ) : null}
            {recipe.iceType ? (
              <span className="rounded-full bg-[var(--color-surface-elevated)] px-2.5 py-0.5 text-xs text-[var(--color-text-muted)] ring-1 ring-[var(--color-border)]">
                🧊 {recipe.iceType}
              </span>
            ) : null}
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
          {/* Action buttons */}
          <div className="mt-1 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onSaveToggle}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                isSaved
                  ? "border-amber-300 bg-amber-50 text-amber-800"
                  : "border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)]",
              )}
            >
              <span aria-hidden="true">{isSaved ? "★" : "☆"}</span>
              {isSaved ? "已收藏 / Saved" : "收藏 / Save"}
            </button>
            <button
              type="button"
              onClick={onCopy}
              className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3.5 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-border-strong)]"
            >
              <span aria-hidden="true">📋</span>
              复制配方 / Copy
            </button>
          </div>
        </div>
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

      {/* Balance tags — color-mapped per flavor family */}
      {recipe.balanceTags.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {recipe.balanceTags.map((t) => {
            const c = tagColors(t);
            return (
              <span
                key={t}
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-xs ring-1",
                  c.bg,
                  c.fg,
                  c.border,
                )}
              >
                #{t}
              </span>
            );
          })}
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
