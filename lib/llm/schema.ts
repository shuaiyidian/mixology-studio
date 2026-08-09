// Zod schema for the LLM-generated cocktail recipe.
// Mirrors the static-data Recipe shape closely so the UI can render a generated
// recipe through the same component path as a classic one.

import { z } from "zod";

export const InnovationRecipeSchema = z.object({
  nameZh: z.string().min(2).max(40),
  nameEn: z.string().min(2).max(60),
  descriptionZh: z.string().min(10).max(220),
  descriptionEn: z.string().min(10).max(320),
  storyNoteZh: z.string().max(220).nullable(),
  storyNoteEn: z.string().max(320).nullable(),
  /** 1 = home bartender, 2 = intermediate, 3 = advanced. */
  difficulty: z.number().int().min(1).max(3),
  glassType: z.string().min(2).max(40),
  iceType: z.string().min(2).max(40).nullable(),
  /** 2-6 short tags from our balance vocabulary. */
  balanceTags: z.array(z.string().min(2).max(20)).min(2).max(6),
  /** Must match the slug of an existing technique in data/techniques.json. */
  techniqueSlug: z.string().min(2).max(64),
  ingredients: z
    .array(
      z.object({
        nameZh: z.string().min(2).max(20),
        nameEn: z.string().min(2).max(40),
        amount: z.string().min(1).max(20),
        isKey: z.boolean(),
        notesZh: z.string().max(80).nullable().optional(),
        notesEn: z.string().max(120).nullable().optional(),
      }),
    )
    .min(2)
    .max(8),
  steps: z
    .array(
      z.object({
        textZh: z.string().min(5).max(220),
        textEn: z.string().min(5).max(320),
        duration: z.string().max(20).nullable().optional(),
        tipZh: z.string().max(140).nullable().optional(),
        tipEn: z.string().max(200).nullable().optional(),
      }),
    )
    .min(2)
    .max(8),
});

export type InnovationRecipe = z.infer<typeof InnovationRecipeSchema>;
