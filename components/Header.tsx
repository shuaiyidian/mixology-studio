import { cn } from "@/lib/ui/cn";

export function Header() {
  return (
    <header className="flex items-baseline gap-3 border-b border-[var(--color-border)] pb-6">
      <span className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--color-accent)]">
        Mixology Studio
      </span>
      <h1
        className={cn(
          "text-3xl font-semibold leading-none tracking-tight text-[var(--color-text-primary)]",
          "sm:text-4xl",
        )}
      >
        调酒配方推荐
      </h1>
    </header>
  );
}
