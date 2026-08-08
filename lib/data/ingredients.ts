// Ingredient accessors — read JSON once at module load and cache.
import type { Ingredient, IngredientCategory } from "@/lib/types";
import rawData from "@/data/ingredients.json";

const data = rawData as Ingredient[];

export function getAllIngredients(): Ingredient[] {
  return data;
}

export function getIngredientById(id: string): Ingredient | undefined {
  return data.find((ing) => ing.id === id);
}

export function getIngredientBySlug(slug: string): Ingredient | undefined {
  return data.find((ing) => ing.slug === slug);
}

export function getIngredientsByCategory(category: IngredientCategory): Ingredient[] {
  return data.filter((ing) => ing.category === category);
}

export function searchIngredients(query: string): Ingredient[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return data.filter((ing) => {
    return (
      ing.nameZh.toLowerCase().includes(q) ||
      ing.nameEn.toLowerCase().includes(q) ||
      ing.slug.toLowerCase().includes(q) ||
      ing.flavorTags.some((t) => t.toLowerCase().includes(q))
    );
  });
}
