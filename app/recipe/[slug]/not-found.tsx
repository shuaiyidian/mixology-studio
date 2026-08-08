// B5 — 404 for missing recipe slugs.

import Link from "next/link";

export default function RecipeNotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-7xl">🥃</p>
      <h1 className="mt-6 text-3xl font-semibold text-[var(--color-text-primary)]">
        没找到这个配方
      </h1>
      <p className="mt-2 text-base text-[var(--color-text-secondary)]">
        Recipe not found — check the URL or browse from the bar.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-white transition-colors hover:opacity-90"
      >
        ← 回到调酒台 / Back to bar
      </Link>
    </main>
  );
}
