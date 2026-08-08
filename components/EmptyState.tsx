import type { ReactNode } from "react";
import { cn } from "@/lib/ui/cn";

interface EmptyStateProps {
  titleZh: string;
  titleEn: string;
  descriptionZh?: string;
  descriptionEn?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  titleZh,
  titleEn,
  descriptionZh,
  descriptionEn,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-10 text-center",
        className,
      )}
    >
      <p className="text-base font-medium text-[var(--color-text-primary)]">
        {titleZh}
        <span className="ml-1.5 text-sm font-normal text-[var(--color-text-muted)]">
          / {titleEn}
        </span>
      </p>
      {(descriptionZh || descriptionEn) && (
        <p className="max-w-md text-sm text-[var(--color-text-secondary)]">
          {descriptionZh}
          {descriptionEn && (
            <span className="ml-1 text-xs text-[var(--color-text-muted)]">
              / {descriptionEn}
            </span>
          )}
        </p>
      )}
      {action}
    </div>
  );
}
