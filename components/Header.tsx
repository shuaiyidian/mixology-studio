import { cn } from "@/lib/ui/cn";

export function Header() {
  return (
    <header className="flex flex-col gap-3 border-b border-[var(--color-border)] pb-10">
      <span className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--color-accent)]">
        Mixology Studio
      </span>
      <h1
        className={cn(
          "text-4xl font-semibold leading-tight tracking-tight text-[var(--color-text-primary)]",
          "sm:text-5xl",
        )}
      >
        调酒配方推荐
      </h1>
      <p className="max-w-2xl text-base text-[var(--color-text-secondary)] sm:text-lg">
        选择你拥有的原料，发现可以调配的经典鸡尾酒。
        <span className="ml-1 text-sm text-[var(--color-text-muted)]">
          / Pick what you have, see what you can make.
        </span>
      </p>
    </header>
  );
}
