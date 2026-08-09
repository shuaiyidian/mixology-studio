"use client";

import { useState } from "react";
import { GlassSVG } from "@/components/GlassSVG";
import { formatRecipeAsText, unsave, type SavedInnovation } from "@/lib/storage/savedInnovations";
import { cn } from "@/lib/ui/cn";

interface SavedInnovationsListProps {
  items: SavedInnovation[];
  onDeleted: () => void;
  onCopy: (item: SavedInnovation) => void;
}

export function SavedInnovationsList({ items, onDeleted, onCopy }: SavedInnovationsListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  if (items.length === 0) return null;

  const handleDelete = (id: string) => {
    const ok = unsave(id);
    if (ok) {
      onDeleted();
      setConfirmDeleteId(null);
    }
  };

  return (
    <section
      className="flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)]/50 p-4 sm:p-5"
      aria-label="我收藏的 AI 配方 / My saved AI innovations"
    >
      <header className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
          <span aria-hidden="true" className="mr-1.5">📚</span>
          我的收藏
          <span className="ml-2 text-xs font-normal text-[var(--color-text-muted)]">
            / My saved ({items.length})
          </span>
        </h3>
        <span className="text-[10px] text-[var(--color-text-muted)]">
          存在本地浏览器，刷新不丢
        </span>
      </header>

      <ul className="flex flex-col gap-2">
        {items.map((s) => {
          const isExpanded = expandedId === s.id;
          const isConfirming = confirmDeleteId === s.id;
          return (
            <li
              key={s.id}
              className={cn(
                "rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-colors",
                isExpanded && "ring-2 ring-[var(--color-accent)]/30",
              )}
            >
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : s.id)}
                className="flex w-full items-center gap-3 p-3 text-left"
                aria-expanded={isExpanded}
              >
                <div className="shrink-0">
                  <GlassSVG
                    glass={s.recipe.glassType}
                    fill={0.6}
                    className="h-10 w-8 text-[var(--color-text-muted)]"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[var(--color-text-primary)]">
                    {s.recipe.nameZh}
                    <span className="ml-1.5 text-xs font-normal text-[var(--color-text-muted)]">
                      / {s.recipe.nameEn}
                    </span>
                  </p>
                  <p className="mt-0.5 flex items-center gap-2 text-[10px] text-[var(--color-text-muted)]">
                    <span>{new Date(s.savedAt).toLocaleString("zh-CN", { hour12: false })}</span>
                    <span>·</span>
                    <span>{s.recipe.ingredients.length} 料</span>
                    <span>·</span>
                    <span>{s.model}</span>
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className={cn(
                    "shrink-0 text-xs text-[var(--color-text-muted)] transition-transform",
                    isExpanded && "rotate-180",
                  )}
                >
                  ▼
                </span>
              </button>

              {isExpanded ? (
                <div className="border-t border-[var(--color-border)] p-3">
                  <p className="text-xs text-[var(--color-text-secondary)]">{s.recipe.descriptionZh}</p>
                  {s.context?.vibe ? (
                    <p className="mt-1 text-[10px] text-[var(--color-text-muted)]">
                      氛围：{s.context.vibe}
                      {s.context.strength ? ` · 烈度：${s.context.strength}` : ""}
                    </p>
                  ) : null}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {s.recipe.balanceTags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-[var(--color-accent)]/10 px-2 py-0.5 text-[10px] text-[var(--color-accent)]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => onCopy(s)}
                      className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-1 text-xs text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)]"
                    >
                      📋 复制
                    </button>
                    {isConfirming ? (
                      <>
                        <button
                          type="button"
                          onClick={() => handleDelete(s.id)}
                          className="rounded-full bg-rose-600 px-3 py-1 text-xs text-white hover:bg-rose-700"
                        >
                          确认删除
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(null)}
                          className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-1 text-xs text-[var(--color-text-secondary)]"
                        >
                          取消
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(s.id)}
                        className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-1 text-xs text-[var(--color-text-secondary)] hover:border-rose-300 hover:text-rose-700"
                      >
                        🗑️ 删除
                      </button>
                    )}
                  </div>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
