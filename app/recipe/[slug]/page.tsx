// B5 — Recipe detail page (Server Component).
// Fetches the recipe by slug and renders all sections.

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllRecipes, getRecipeBySlug, getRecipeWithRelations } from "@/lib/data/recipes";
import { getTechniqueById } from "@/lib/data/techniques";
import { BalanceIndicator } from "@/components/BalanceIndicator";
import { RecipeHero } from "@/components/RecipeHero";
import { RecipeIngredients } from "@/components/RecipeIngredients";
import { RecipeSteps } from "@/components/RecipeSteps";
import { TechniqueCard } from "@/components/TechniqueCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllRecipes().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) return { title: "配方未找到 / Recipe not found" };
  return {
    title: `${recipe.nameZh} / ${recipe.nameEn} — Mixology Studio`,
    description: recipe.descriptionZh,
  };
}

export default async function RecipePage({ params }: PageProps) {
  const { slug } = await params;
  const summary = getRecipeBySlug(slug);
  if (!summary) notFound();

  const recipe = getRecipeWithRelations(summary.id);
  if (!recipe) notFound();

  return (
    <main className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      {/* Back link */}
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
      >
        ← 返回调酒台 <span className="text-xs text-[var(--color-text-muted)]">/ Back to bar</span>
      </Link>

      {/* Hero */}
      <RecipeHero recipe={recipe} />

      {/* Story */}
      {(recipe.storyNoteZh || recipe.storyNoteEn) && (
        <section
          aria-labelledby="story-heading"
          className="mt-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6"
        >
          <h2
            id="story-heading"
            className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]"
          >
            故事 / Story
          </h2>
          <p className="leading-relaxed text-[var(--color-text-primary)] italic">
            {recipe.storyNoteZh}
            {recipe.storyNoteEn && (
              <span className="ml-2 not-italic text-sm text-[var(--color-text-secondary)]">
                / {recipe.storyNoteEn}
              </span>
            )}
          </p>
        </section>
      )}

      {/* Balance profile */}
      <div className="mt-8">
        <BalanceIndicator recipe={recipe} />
      </div>

      {/* Two-column on desktop: ingredients + steps stacked vertically */}
      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <RecipeIngredients recipe={recipe} />
        </div>
        <div className="lg:col-span-3">
          <RecipeSteps recipe={recipe} />
        </div>
      </div>

      {/* Techniques used */}
      {recipe.techniques.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-semibold text-[var(--color-text-primary)]">
            涉及技法 <span className="text-base font-normal text-[var(--color-text-secondary)]">/ Techniques</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {recipe.techniques.map((t) => {
              const full = getTechniqueById(t.id);
              if (!full) return null;
              return <TechniqueCard key={t.id} technique={full} />;
            })}
          </div>
          <p className="mt-3 text-xs text-[var(--color-text-muted)]">
            展开任意卡片查看完整步骤与提示 / Click any card to see full steps and tips.
          </p>
        </section>
      )}

      {/* CTA back */}
      <div className="mt-12 flex justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-white px-6 py-3 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        >
          ← 再来一杯 <span className="text-xs text-[var(--color-text-muted)]">/ Make another</span>
        </Link>
      </div>
    </main>
  );
}
