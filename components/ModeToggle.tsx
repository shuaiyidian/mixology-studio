"use client";

import { cn } from "@/lib/ui/cn";

export type WorkspaceMode = "CLASSIC" | "INNOVATE";

interface ModeToggleProps {
  value: WorkspaceMode;
  onChange: (value: WorkspaceMode) => void;
}

const modes: Array<{ value: WorkspaceMode; labelZh: string; labelEn: string; icon: string; description: string }> = [
  {
    value: "CLASSIC",
    labelZh: "经典配方",
    labelEn: "Classic",
    icon: "📖",
    description: "从 251 条真实经典里挑 / pick from 251 real classics",
  },
  {
    value: "INNOVATE",
    labelZh: "AI 创新",
    labelEn: "Innovate",
    icon: "✨",
    description: "用 LLM 现场编一杯 / generate a novel one with LLM",
  },
];

export function ModeToggle({ value, onChange }: ModeToggleProps) {
  return (
    <div
      role="tablist"
      aria-label="推荐模式 / Recommendation mode"
      className="grid grid-cols-2 gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-1.5 sm:inline-grid sm:w-auto sm:grid-cols-2"
    >
      {modes.map((m) => {
        const active = m.value === value;
        return (
          <button
            key={m.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(m.value)}
            title={m.description}
            className={cn(
              "flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-200",
              "sm:min-w-[180px]",
              active
                ? "bg-[var(--color-accent)] text-white shadow-sm"
                : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text-primary)]",
            )}
          >
            <span aria-hidden="true" className="text-base leading-none">{m.icon}</span>
            <span className="flex flex-col items-start">
              <span className="leading-none">{m.labelZh}</span>
              <span
                className={cn(
                  "mt-0.5 text-[10px] font-normal leading-none",
                  active ? "text-white/80" : "text-[var(--color-text-muted)]",
                )}
              >
                / {m.labelEn}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
