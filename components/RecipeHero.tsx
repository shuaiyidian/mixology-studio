// B5 — Recipe hero (title, badges, glass/ice metadata).

import type { RecipeWithRelations } from "@/lib/types";

interface Props {
  recipe: RecipeWithRelations;
}

const DIFFICULTY_LABELS = ["", "入门", "简单", "中等", "进阶", "高难"];

const GLASS_LABEL: Record<string, { zh: string; en: string }> = {
  coupe: { zh: "Coupe 杯", en: "Coupe" },
  rocks: { zh: "Rocks 杯", en: "Rocks / Old Fashioned" },
  highball: { zh: "Highball 杯", en: "Highball" },
  flute: { zh: "Flute 杯", en: "Flute" },
  "nick-nora": { zh: "Nick & Nora 杯", en: "Nick & Nora" },
  hurricane: { zh: "Hurricane 杯", en: "Hurricane" },
  tiki: { zh: "Tiki 杯", en: "Tiki mug" },
  julep: { zh: "Julep 杯", en: "Julep tin" },
};

const ICE_LABEL: Record<string, { zh: string; en: string }> = {
  none: { zh: "无冰", en: "No ice" },
  cubed: { zh: "方冰", en: "Cubed" },
  crushed: { zh: "碎冰", en: "Crushed" },
  large: { zh: "大冰球", en: "Large cube" },
  peeled: { zh: "刨冰", en: "Peeled" },
};

export function RecipeHero({ recipe }: Props) {
  const glass = recipe.glassType ? GLASS_LABEL[recipe.glassType] : null;
  const ice = recipe.iceType ? ICE_LABEL[recipe.iceType] : null;

  return (
    <header className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
            recipe.type === "CLASSIC"
              ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
              : "bg-stone-100 text-stone-700"
          }`}
        >
          {recipe.type === "CLASSIC" ? "经典 / Classic" : "创新 / Modern"}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-700">
          难度 <span className="font-semibold text-stone-900">{recipe.difficulty}</span>
          <span className="text-stone-500">/ 5 · {DIFFICULTY_LABELS[recipe.difficulty]}</span>
        </span>
        {recipe.balanceTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {recipe.balanceTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-stone-50 px-2.5 py-0.5 text-[10px] text-stone-600 ring-1 ring-stone-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[var(--color-text-primary)] sm:text-5xl">
          {recipe.nameZh}
        </h1>
        <p className="mt-2 text-xl text-[var(--color-text-secondary)]">{recipe.nameEn}</p>
      </div>

      <p className="max-w-3xl text-lg leading-relaxed text-[var(--color-text-primary)]">
        {recipe.descriptionZh}
        {recipe.descriptionEn && (
          <span className="ml-2 text-base text-[var(--color-text-secondary)]">
            / {recipe.descriptionEn}
          </span>
        )}
      </p>

      {(glass || ice) && (
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--color-text-secondary)]">
          {glass && (
            <div>
              <span className="text-[var(--color-text-muted)]">杯型 / Glass:</span>{" "}
              <span className="font-medium text-[var(--color-text-primary)]">{glass.zh}</span>
            </div>
          )}
          {ice && (
            <div>
              <span className="text-[var(--color-text-muted)]">冰型 / Ice:</span>{" "}
              <span className="font-medium text-[var(--color-text-primary)]">{ice.zh}</span>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
