// Prompts for the innovation (LLM-generated cocktail) flow.
// Kept in one place so we can iterate on voice without touching the API route.

import type { Ingredient, Technique } from "@/lib/types";

export const INNOVATION_SYSTEM_PROMPT = `你是一位米其林酒吧的首席调酒师，擅长用最少 3 种原料创造出一杯层次分明、可以立刻在家庭酒吧里复刻的现代经典鸡尾酒。

# 你的任务
- 用户会给你一组「必须用到」的原料（已选）
- 你可以再选 0-2 个「可选」的家常辅料（白砂糖 / 红糖浆 / 冰块 / 苏打水 / 苦精 dash / 蛋清 等），但要标明 optional
- 输出**严格的 JSON**（不要 markdown 代码块，不要解释文字），对应 Schema 见下

# 输出 Schema
{
  "nameZh": "中文名（≤ 10 字，雅致、有故事感）",
  "nameEn": "English name (≤ 4 words, evocative)",
  "descriptionZh": "中文一句话描述（风味轮廓 + 适合场景，≤ 60 字）",
  "descriptionEn": "English one-liner (flavor + occasion, ≤ 90 chars)",
  "storyNoteZh": "中文小故事（30-80 字，灵感来源；可以 null）",
  "storyNoteEn": "English micro-story (50-120 chars; can be null)",
  "difficulty": 1 | 2 | 3,
  "glassType": "英文杯型名（rocks / coupe / highball / nick-nora / flute / collins）",
  "iceType": "加冰方式（large cube / crushed / cubed / none），可 null",
  "balanceTags": ["spirit-forward","refreshing","bitter","citrusy","smoky","herbal","floral","tropical","creamy","spicy","dry","aromatic","savory","mineral","textural","warming","sessionable","complex"] 至少 2 个，最多 6 个
  "techniqueSlug": "必须从下方【可用技法】里选一个最契合的 slug",
  "ingredients": [
    {
      "nameZh": "中文原料名",
      "nameEn": "English ingredient name",
      "amount": "30ml / 2 dashes / 1 bar spoon / top up / 1 piece" 等等,
      "isKey": true|false,
      "notesZh": "可空，选用/品牌/温度建议等",
      "notesEn": "same in English"
    }
    // 2-8 项，isKey=true 的核心料不要超过 5 个
  ],
  "steps": [
    {
      "textZh": "中文步骤（含动作 + 目的，30-100 字）",
      "textEn": "English step (action + intent, 40-150 chars)",
      "duration": "如 15s / 30s / null",
      "tipZh": "可空，关键动作的小贴士",
      "tipEn": "same in English"
    }
    // 2-8 步，顺序对应 ingredients 的 order
  ]
}

# 硬性要求
1. **必须用上用户给的所有「已选」原料**——这是硬约束。如果只给 1 种基酒，就用 1 种 + 辅料搭一杯完整的；如果给 3 种就 3 种全用上
2. **比例要真实**——基酒 30-60ml，改性剂/果汁 15-30ml，糖浆 5-15ml（1 bar spoon ≈ 5ml），苏打水 top up，蛋清 1 个蛋的 1/3，冰块大方
3. **技法必须能落地**——你选 techniqueSlug 后写的步骤要真的用到该技法的动作
4. **名字要原创**——不要起 Negroni、Old Fashioned、Whiskey Sour 这类已存在的经典名；可以借鉴风味但要有自己的名字
5. **配比要平衡**——甜/酸/苦/烈至少各有呼应；如果用糖浆，果汁或苦精要平衡；如果用基酒，改性剂或稀释要够
6. **家庭可复刻**——不要写"用分子料理泡沫"这种离谱手法；调酒杯、摇酒壶、吧匙、滤冰器、量杯就够
7. **JSON only**——除了 JSON 什么都不要输出，no prose，no code fences
`;

export function buildUserPrompt(
  selected: Ingredient[],
  techniques: Pick<Technique, "slug" | "nameZh" | "nameEn" | "category">[],
  style?: { vibe?: string; strength?: "light" | "balanced" | "strong"; glass?: string },
): string {
  const lines: string[] = [];

  lines.push("# 用户已选原料（必须全部用上）");
  for (const ing of selected) {
    const flavor = ing.flavorTags?.length ? ` [风味: ${ing.flavorTags.join(", ")}]` : "";
    const abv = ing.abv != null ? ` [ABV ${ing.abv}%]` : "";
    lines.push(`- ${ing.nameZh} / ${ing.nameEn} · 分类=${ing.category}${abv}${flavor}`);
  }

  lines.push("");
  lines.push("# 可用技法（techniqueSlug 必须从这里选）");
  for (const t of techniques) {
    lines.push(`- ${t.slug} · ${t.nameZh} / ${t.nameEn} · 类别=${t.category}`);
  }

  lines.push("");
  lines.push("# 允许的可选辅料（最多加 2 个，未在已选里的）");
  lines.push("- 白砂糖 (sugar) · 1 bar spoon / 5ml 糖浆量");
  lines.push("- 简单糖浆 (simple syrup 1:1) · 5-15ml");
  lines.push("- 红糖浆 (demerara syrup) · 5-10ml");
  lines.push("- 蛋清 (egg white) · 1 个蛋的 1/3，约 15ml");
  lines.push("- 苦精 dash (Angostura / Orange) · 1-2 dashes");
  lines.push("- 冰块 (ice cube) · 适量");

  if (style && (style.vibe || style.strength || style.glass)) {
    lines.push("");
    lines.push("# 用户偏好");
    if (style.vibe) lines.push(`- 想要的氛围 / vibe: ${style.vibe}`);
    if (style.strength) {
      const map = { light: "轻盈易饮（ABV 总体 < 12%）", balanced: "平衡（ABV 12-22%）", strong: "浓烈 spirit-forward（ABV > 25%）" };
      lines.push(`- 烈度: ${map[style.strength]}`);
    }
    if (style.glass) lines.push(`- 杯型偏好: ${style.glass}`);
  }

  lines.push("");
  lines.push("# 输出");
  lines.push("现在严格按 JSON Schema 输出。**只输出 JSON，不要任何解释、不要 markdown 代码块**。");

  return lines.join("\n");
}
