// Recipe accessors — read JSON once at module load, cache, and provide joins.
import type {
  Recipe,
  RecipeIngredient,
  RecipeStep,
  RecipeWithRelations,
  Technique,
} from "@/lib/types";
import recipesRaw from "@/data/recipes.json";
import ingredientsRaw from "@/data/ingredients.json";
import stepsRaw from "@/data/recipe-steps.json";
import recipeIngredientsRaw from "@/data/recipe-ingredients.json";
import techniquesRaw from "@/data/techniques.json";
import recipeTechniquesRaw from "@/data/recipe-techniques.json";

const recipes = recipesRaw as Recipe[];
const ingredients = ingredientsRaw as Array<{
  id: string;
  nameZh: string;
  nameEn: string;
  category: string;
  colorHex: string | null;
}>;
const steps = stepsRaw as RecipeStep[];
const recipeIngredients = recipeIngredientsRaw as RecipeIngredient[];
const techniques = techniquesRaw as Technique[];
const recipeTechniques = recipeTechniquesRaw as Array<{
  id: string;
  recipeId: string;
  techniqueId: string;
}>;

// Build ingredient lookup once.
const ingredientById = new Map(ingredients.map((i) => [i.id, i]));
// Build technique lookup once.
const techniqueById = new Map(techniques.map((t) => [t.id, t]));

export function getAllRecipes(): Recipe[] {
  return recipes;
}

export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find((r) => r.id === id);
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes.find((r) => r.slug === slug);
}

export function getRecipesByIds(ids: string[]): Recipe[] {
  const set = new Set(ids);
  return recipes.filter((r) => set.has(r.id));
}

/**
 * Returns a fully-joined recipe projection suitable for direct UI consumption.
 * Joins ingredients (with their parent ingredient row), steps (with technique),
 * and the recipe's many-to-many techniques list.
 */
export function getRecipeWithRelations(id: string): RecipeWithRelations | undefined {
  const recipe = getRecipeById(id);
  if (!recipe) return undefined;

  // Ingredients (sorted by order).
  const ingredientRows = recipeIngredients
    .filter((ri) => ri.recipeId === id)
    .sort((a, b) => a.order - b.order)
    .map((ri) => {
      const ingredient = ingredientById.get(ri.ingredientId);
      return {
        ...ri,
        ingredient: ingredient
          ? {
              id: ingredient.id,
              nameZh: ingredient.nameZh,
              nameEn: ingredient.nameEn,
              category: ingredient.category as RecipeWithRelations["ingredients"][number]["ingredient"]["category"],
              colorHex: ingredient.colorHex,
            }
          : {
              id: ri.ingredientId,
              nameZh: "(未知)",
              nameEn: "(unknown)",
              category: "OTHER" as RecipeWithRelations["ingredients"][number]["ingredient"]["category"],
              colorHex: null,
            },
      };
    });

  // Steps (sorted by order) with technique joined.
  const stepRows = steps
    .filter((s) => s.recipeId === id)
    .sort((a, b) => a.order - b.order)
    .map((s) => {
      const tech = s.techniqueId ? techniqueById.get(s.techniqueId) : null;
      return {
        ...s,
        technique: tech
          ? {
              id: tech.id,
              nameZh: tech.nameZh,
              nameEn: tech.nameEn,
              category: tech.category,
            }
          : null,
      };
    });

  // Many-to-many techniques (deduplicated by id).
  const techIds = new Set(
    recipeTechniques.filter((rt) => rt.recipeId === id).map((rt) => rt.techniqueId)
  );
  const techniqueList = Array.from(techIds)
    .map((tid) => techniqueById.get(tid))
    .filter((t): t is Technique => Boolean(t))
    .map((t) => ({
      id: t.id,
      nameZh: t.nameZh,
      nameEn: t.nameEn,
      category: t.category,
      slug: t.slug,
    }));

  return {
    ...recipe,
    ingredients: ingredientRows,
    steps: stepRows,
    techniques: techniqueList,
  };
}

export function getRecipeIngredients(recipeId: string): RecipeIngredient[] {
  return recipeIngredients.filter((ri) => ri.recipeId === recipeId);
}

export function getRecipeSteps(recipeId: string): RecipeStep[] {
  return steps.filter((s) => s.recipeId === recipeId).sort((a, b) => a.order - b.order);
}
