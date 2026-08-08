// Technique accessors — read JSON once at module load and cache.
import type { Technique } from "@/lib/types";
import rawData from "@/data/techniques.json";

const data = rawData as Technique[];

export function getAllTechniques(): Technique[] {
  return data;
}

export function getTechniqueById(id: string): Technique | undefined {
  return data.find((t) => t.id === id);
}

export function getTechniqueBySlug(slug: string): Technique | undefined {
  return data.find((t) => t.slug === slug);
}
