// B5 — Collapsible technique info card.

"use client";

import { useState } from "react";
import type { Technique } from "@/lib/types";

interface Props {
  technique: Pick<Technique, "id" | "nameZh" | "nameEn" | "category" | "descriptionZh" | "descriptionEn" | "stepsZh" | "stepsEn" | "tipsZh" | "tipsEn" | "warningsZh" | "warningsEn">;
}

const CATEGORY_BADGE: Record<string, { zh: string; cls: string }> = {
  SHAKE: { zh: "摇和", cls: "bg-blue-100 text-blue-700" },
  STIR: { zh: "搅和", cls: "bg-emerald-100 text-emerald-700" },
  ROLL: { zh: "滚和", cls: "bg-cyan-100 text-cyan-700" },
  BUILD: { zh: "直调", cls: "bg-violet-100 text-violet-700" },
  MUDDLE: { zh: "捣压", cls: "bg-orange-100 text-orange-700" },
  STRAIN: { zh: "滤冰", cls: "bg-slate-100 text-slate-700" },
  WASH: { zh: "清洗", cls: "bg-pink-100 text-pink-700" },
  GARNISH: { zh: "装饰", cls: "bg-yellow-100 text-yellow-800" },
  PREP: { zh: "预处理", cls: "bg-stone-100 text-stone-700" },
};

export function TechniqueCard({ technique }: Props) {
  const [open, setOpen] = useState(false);
  const cat = CATEGORY_BADGE[technique.category] ?? CATEGORY_BADGE.STIR;
  const previewSteps = technique.stepsZh.slice(0, 2);

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-white">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start justify-between gap-4 p-4 text-left transition-colors hover:bg-stone-50"
        aria-expanded={open}
      >
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${cat.cls}`}>{cat.zh}</span>
            <h3 className="font-semibold text-[var(--color-text-primary)]">
              {technique.nameZh}{" "}
              <span className="text-sm font-normal text-[var(--color-text-secondary)]">/ {technique.nameEn}</span>
            </h3>
          </div>
          <p className="line-clamp-2 text-sm text-[var(--color-text-secondary)]">
            {technique.descriptionZh}
          </p>
          {!open && previewSteps.length > 0 && (
            <ol className="mt-2 list-decimal space-y-0.5 pl-5 text-xs text-[var(--color-text-muted)]">
              {previewSteps.map((s, i) => (
                <li key={i} className="truncate">{s}</li>
              ))}
              {technique.stepsZh.length > 2 && (
                <li className="text-[var(--color-text-muted)]">…展开查看全部</li>
              )}
            </ol>
          )}
        </div>
        <span
          className={`shrink-0 text-lg text-[var(--color-text-muted)] transition-transform ${open ? "rotate-90" : ""}`}
          aria-hidden
        >
          ›
        </span>
      </button>

      {open && (
        <div className="border-t border-[var(--color-border)] p-4 pt-4 space-y-4">
          <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {technique.descriptionZh}
            {technique.descriptionEn && (
              <span className="ml-1 text-xs text-[var(--color-text-muted)]">/ {technique.descriptionEn}</span>
            )}
          </p>

          {technique.stepsZh.length > 0 && (
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                步骤 / Steps
              </h4>
              <ol className="list-decimal space-y-1.5 pl-5 text-sm text-[var(--color-text-primary)]">
                {technique.stepsZh.map((s, i) => (
                  <li key={i} className="leading-relaxed">
                    {s}
                    {technique.stepsEn[i] && (
                      <span className="ml-1 text-xs text-[var(--color-text-muted)]">/ {technique.stepsEn[i]}</span>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {technique.tipsZh.length > 0 && (
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                提示 / Tips
              </h4>
              <ul className="space-y-1 text-sm text-[var(--color-text-primary)]">
                {technique.tipsZh.map((t, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[var(--color-accent)]">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {technique.warningsZh.length > 0 && (
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-rose-700">
                注意事项 / Warnings
              </h4>
              <ul className="space-y-1 text-sm text-rose-900">
                {technique.warningsZh.map((w, i) => (
                  <li key={i} className="flex gap-2">
                    <span>⚠</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
