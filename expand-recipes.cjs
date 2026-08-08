// expand-recipes.cjs
// B2-extension: add 80 new CLASSIC recipes + supporting ingredients/techniques to the data layer.
// Run: node expand-recipes.cjs  (from project root, after which node verify-data.cjs to check)

const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "data");
const read = (name) => JSON.parse(fs.readFileSync(path.join(DATA_DIR, name), "utf8"));
const write = (name, data) =>
  fs.writeFileSync(path.join(DATA_DIR, name), JSON.stringify(data, null, 2) + "\n", "utf8");

// ─── Load existing ──────────────────────────────────────────────────────────
const ingredients = read("ingredients.json");
const techniques = read("techniques.json");
const recipes = read("recipes.json");
const recipeIngredients = read("recipe-ingredients.json");
const recipeSteps = read("recipe-steps.json");
const recipeTechniques = read("recipe-techniques.json");

// ─── Track existing slugs / IDs for dedup safety ────────────────────────────
const ingSlugSet = new Set(ingredients.map((i) => i.slug));
const techSlugSet = new Set(techniques.map((t) => t.slug));
const recipeSlugSet = new Set(recipes.map((r) => r.slug));
const allIdSet = new Set([
  ...ingredients.map((i) => i.id),
  ...techniques.map((t) => t.id),
  ...recipes.map((r) => r.id),
  ...recipeIngredients.map((ri) => ri.id),
  ...recipeSteps.map((rs) => rs.id),
  ...recipeTechniques.map((rt) => rt.id),
]);

// ─── New ingredients (18) ──────────────────────────────────────────────────
const newIngredients = [
  { id: "ing-calvados", slug: "calvados", nameZh: "卡尔瓦多斯", nameEn: "Calvados", category: "BASE_SPIRIT", abv: 40, flavorTags: ["apple", "brandy", "earthy", "french"], colorHex: "#C08840", descriptionZh: "法国诺曼底产区的苹果白兰地，是 Angel Face、Corpse Reviver #1 等 20 世纪鸡尾酒的法式基底。", descriptionEn: "French apple brandy from Normandy, the French base of Angel Face, Corpse Reviver #1 and other 20th-century classics." },
  { id: "ing-creme-de-menthe-white", slug: "creme-de-menthe-white", nameZh: "白薄荷利口酒", nameEn: "White Crème de Menthe", category: "LIQUEUR", abv: 25, flavorTags: ["mint", "sweet", "herbal"], colorHex: "#F0F8E8", descriptionZh: "无色薄荷利口酒，Stinger 与 Grasshopper 的传统配方。", descriptionEn: "Clear mint liqueur, the traditional base of the Stinger and Grasshopper." },
  { id: "ing-allspice-drambuie", slug: "allspice-drambuie", nameZh: "多香果利口酒", nameEn: "Allspice Dram (Pimento)", category: "LIQUEUR", abv: 30, flavorTags: ["spice", "warm", "pimento", "tropical"], colorHex: "#6B3A1A", descriptionZh: "牙买加多香果浸泡的利口酒，三点与破折号、Jet Pilot 的 tiki 香料灵魂。", descriptionEn: "Jamaican allspice-infused liqueur, the spice backbone of Three Dots and a Dash and Jet Pilot." },
  { id: "ing-blue-curacao", slug: "blue-curacao", nameZh: "蓝橙皮酒", nameEn: "Blue Curaçao", category: "LIQUEUR", abv: 25, flavorTags: ["citrus", "orange", "tropical", "sweet"], colorHex: "#3A7AB8", descriptionZh: "蓝色橙皮利口酒，Blue Hawaiian 的视觉灵魂。", descriptionEn: "Blue-tinted orange liqueur, the visual signature of the Blue Hawaiian." },
  { id: "ing-raspberry-syrup", slug: "raspberry-syrup", nameZh: "覆盆子糖浆", nameEn: "Raspberry Syrup", category: "SYRUP", abv: 0, flavorTags: ["berry", "fruity", "sweet", "tart"], colorHex: "#B8204A", descriptionZh: "覆盆子果泥糖浆，Clover Club 的标志性红色来源。", descriptionEn: "Crushed raspberry syrup, the iconic pink of the Clover Club." },
  { id: "ing-port", slug: "port", nameZh: "波特酒", nameEn: "Ruby Port", category: "WINE", abv: 19, flavorTags: ["fortified", "berry", "rich", "sweet"], colorHex: "#5A1A2A", descriptionZh: "葡萄牙产加强葡萄酒，Porto Flip、Millionaire 的红色基酒。", descriptionEn: "Portuguese fortified wine, the red base of Porto Flip and the Millionaire." },
  { id: "ing-fino-sherry", slug: "fino-sherry", nameZh: "菲诺雪利酒", nameEn: "Fino Sherry", category: "WINE", abv: 15, flavorTags: ["dry", "nutty", "saline", "pale"], colorHex: "#E8DCA0", descriptionZh: "西班牙最干型的雪利酒，Bamboo 等开胃酒的基础。", descriptionEn: "Spain's driest sherry, the bone-dry base of the Bamboo and other aperitif classics." },
  { id: "ing-amontillado-sherry", slug: "amontillado-sherry", nameZh: "阿蒙提亚多雪利酒", nameEn: "Amontillado Sherry", category: "WINE", abv: 17, flavorTags: ["nutty", "dry", "medium-body", "sherry"], colorHex: "#A07040", descriptionZh: "介于菲诺与欧罗洛索之间的琥珀色雪利酒，Sherry Cobbler、Adonis、Fog Cutter 的灵魂。", descriptionEn: "Amber sherry between fino and oloroso, the soul of Sherry Cobbler, Adonis and the Fog Cutter's float." },
  { id: "ing-coconut-cream", slug: "coconut-cream", nameZh: "椰子奶油", nameEn: "Coconut Cream", category: "DAIRY", abv: 0, flavorTags: ["tropical", "coconut", "creamy", "fatty"], colorHex: "#FAF0E0", descriptionZh: "高脂厚椰子奶油，Piña Colada、Blue Hawaiian 的热带奶感来源。", descriptionEn: "Thick high-fat coconut cream, the tropical body of Piña Colada and Blue Hawaiian." },
  { id: "ing-prosecco", slug: "prosecco", nameZh: "普罗赛克", nameEn: "Prosecco", category: "WINE", abv: 11, flavorTags: ["sparkling", "floral", "light", "italian"], colorHex: "#FAF0D0", descriptionZh: "意大利干型起泡酒，Bellini、Mimosa、Hugo Spritz、Negroni Sbagliato 的轻盈气泡源。", descriptionEn: "Italian dry sparkling wine, the bubbles of Bellini, Mimosa, Hugo Spritz and Negroni Sbagliato." },
  { id: "ing-peach-puree", slug: "peach-puree", nameZh: "桃子果泥", nameEn: "White Peach Purée", category: "JUICE", abv: 0, flavorTags: ["peach", "fruity", "sweet", "floral"], colorHex: "#F4D4A0", descriptionZh: "白桃果泥，Bellini 与 Peach Julep 的柔甜果香。", descriptionEn: "White peach purée, the silky fruit of the Bellini and Peach Julep." },
  { id: "ing-peach-liqueur", slug: "peach-liqueur", nameZh: "桃子利口酒", nameEn: "Peach Liqueur", category: "LIQUEUR", abv: 20, flavorTags: ["peach", "fruity", "sweet", "stone-fruit"], colorHex: "#F4B060", descriptionZh: "桃子利口酒，Peach Tree、Peach Blossom、Derby 等果香鸡尾酒的常用基酒。", descriptionEn: "Peach liqueur, the stone-fruit base of Peach Tree, Peach Blossom and the Derby." },
  { id: "ing-red-wine", slug: "red-wine", nameZh: "干红葡萄酒", nameEn: "Dry Red Wine", category: "WINE", abv: 13, flavorTags: ["red-fruit", "dry", "tannic", "wine"], colorHex: "#5A0A1A", descriptionZh: "干红葡萄酒，New York Sour 与 Boston Sour 顶部浮酒的层次来源。", descriptionEn: "Dry red wine floated atop New York and Boston Sours to add colour and tannin." },
  { id: "ing-dry-white-wine", slug: "dry-white-wine", nameZh: "干白葡萄酒", nameEn: "Dry White Wine", category: "WINE", abv: 12, flavorTags: ["dry", "crisp", "light", "wine"], colorHex: "#F0E8A0", descriptionZh: "干白葡萄酒，Kir 开胃酒的底色；常用勃艮第或长相思。", descriptionEn: "Dry white wine, the base of the Kir aperitif; typically a crisp Bourgogne or Sauvignon Blanc." },
  { id: "ing-egg-yolk", slug: "egg-yolk", nameZh: "蛋黄", nameEn: "Egg Yolk", category: "DAIRY", abv: 0, flavorTags: ["rich", "fatty", "binder"], colorHex: "#F4C040", descriptionZh: "新鲜蛋黄，Golden Fizz 与 Porto Flip 的乳化稠度来源。", descriptionEn: "Fresh egg yolk, the emulsifier of the Golden Fizz and Porto Flip." },
  { id: "ing-lager", slug: "lager", nameZh: "拉格啤酒", nameEn: "Lager Beer", category: "SODA", abv: 4, flavorTags: ["beer", "light", "carbonated", "grain"], colorHex: "#F2D870", descriptionZh: "淡色拉格啤酒，Shandy 高球的啤酒侧。", descriptionEn: "Pale lager, the beer side of the Shandy highball." },
  { id: "ing-lemonade", slug: "lemonade", nameZh: "柠檬汽水", nameEn: "Lemonade (Soda)", category: "SODA", abv: 0, flavorTags: ["lemon", "sweet", "carbonated"], colorHex: "#F2E870", descriptionZh: "柠檬味汽水，Shandy 高球的汽水侧。", descriptionEn: "Lemon soda, the fizzy side of the Shandy highball." },
  { id: "ing-hard-cider", slug: "hard-cider", nameZh: "苹果西打", nameEn: "Dry Hard Cider", category: "SODA", abv: 5, flavorTags: ["apple", "dry", "sparkling", "fermented"], colorHex: "#E8C870", descriptionZh: "干型苹果西打，Stone Fence 的传统酒底。", descriptionEn: "Dry apple cider, the traditional top of the Stone Fence." },
];

newIngredients.forEach((i) => {
  if (ingSlugSet.has(i.slug)) {
    console.warn(`[skip] duplicate ingredient slug: ${i.slug}`);
    return;
  }
  if (allIdSet.has(i.id)) {
    console.warn(`[skip] duplicate ingredient id: ${i.id}`);
    return;
  }
  ingredients.push(i);
  ingSlugSet.add(i.slug);
  allIdSet.add(i.id);
});
console.log(`Added ${newIngredients.length} new ingredients. Total: ${ingredients.length}`);

// ─── New techniques (1) ─────────────────────────────────────────────────────
const newTechniques = [
  { id: "tech-flash-blend", slug: "flash-blend", nameZh: "高速搅拌", nameEn: "Flash Blend", category: "SHAKE", descriptionZh: "用电动搅拌机短促搅拌 5-6 秒，让 tiki 与高糖鸡尾酒获得绵密泡沫与极冷降温。", descriptionEn: "A 5-6 second buzz in a blender that chills and aerates tiki and high-sugar drinks, producing a thick, even foam.", stepsZh: ["将所有原料加入搅拌机的玻璃罐。", "加入 1 杯碎冰。", "盖紧刀头，短促搅拌 5-6 秒至完全顺滑。", "立即倒入预冷过的 tiki 或 highball 杯。"], stepsEn: ["Combine all ingredients in the blender jar.", "Add 1 cup of crushed ice.", "Secure the blade assembly and pulse for 5-6 seconds until fully smooth.", "Pour immediately into a chilled tiki or highball glass."], tipsZh: ["搅拌时间超过 8 秒会让冰融化稀释过度。", "事先预冷玻璃罐可减少冰融化。"], tipsEn: ["Blending longer than 8 seconds over-dilutes the drink.", "Pre-chill the blender jar to minimise melt."], warningsZh: ["运转时务必盖紧刀头，避免液体喷溅。", "硬质食材如冰块需分批投入，避免刀头卡死。"], warningsEn: ["Always secure the lid before blending to avoid splatter.", "Add hard ingredients in batches to prevent the blade from jamming."] },
];

newTechniques.forEach((t) => {
  if (techSlugSet.has(t.slug)) {
    console.warn(`[skip] duplicate technique slug: ${t.slug}`);
    return;
  }
  if (allIdSet.has(t.id)) {
    console.warn(`[skip] duplicate technique id: ${t.id}`);
    return;
  }
  techniques.push(t);
  techSlugSet.add(t.slug);
  allIdSet.add(t.id);
});
console.log(`Added ${newTechniques.length} new technique(s). Total: ${techniques.length}`);

// ─── 80 new recipes (recipes + their ingredient links + steps + technique links) ──
//
// Each entry:
//   { slug, nameZh, nameEn, difficulty, glassType, iceType,
//     descriptionZh, descriptionEn, storyNoteZh, storyNoteEn,
//     balanceTags,
//     ingredients: [{ slug, amount, isKey, optional, notesZh, notesEn, order }]
//     steps:      [{ order, instructionZh, instructionEn, duration, techniqueSlug, tipZh, tipEn }]
//     techniques: [slug, ...]      // many-to-many technique tags
//   }
//
// Ingredient slugs and technique slugs are resolved against current data.

const NEW = [
  // ───── 1. Stirred Spirit-Forward (15) ─────────────────────────────────────
  {
    slug: "martini-50-50",
    nameZh: "50/50 马天尼", nameEn: "50/50 Martini",
    difficulty: 2, glassType: "coupe", iceType: "none",
    descriptionZh: "金酒与干味美思 1:1 的复古马天尼版本，比现代干马天尼口感更饱满。",
    descriptionEn: "A vintage Martini with gin and dry vermouth at 1:1 — fuller-bodied than the modern dry version.",
    storyNoteZh: "20 世纪前半叶伦敦干马天尼流行之前，1:1 是马天尼的标准比例，代表作之一。",
    storyNoteEn: "Before the 20th-century shift to dry Martinis, 1:1 was the standard ratio.",
    balanceTags: ["spirit-forward", "botanical", "classic", "balanced"],
    ingredients: [
      { slug: "gin", amount: "30ml", isKey: true, optional: false, notesZh: "London Dry", notesEn: "London Dry", order: 1 },
      { slug: "dry-vermouth", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "orange-bitters", amount: "1 dash", isKey: false, optional: true, notesZh: "可选", notesEn: "optional", order: 3 },
      { slug: "lemon-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 4 },
    ],
    steps: [
      { order: 1, instructionZh: "搅拌杯加金酒与干味美思。", instructionEn: "Combine gin and dry vermouth in a mixing glass.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰搅和 30 秒。", instructionEn: "Add ice and stir for 30 seconds.", duration: "30s", techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "滤入预冷马天尼杯。", instructionEn: "Strain into a chilled coupe.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "柠檬皮喷香装饰。", instructionEn: "Express lemon peel over the surface.", duration: null, techniqueSlug: "express-peel", tipZh: null, tipEn: null },
    ],
    techniques: ["stir", "express-peel"],
  },
  {
    slug: "vesper",
    nameZh: "维斯帕", nameEn: "Vesper",
    difficulty: 2, glassType: "coupe", iceType: "none",
    descriptionZh: "金酒、伏特加与 Lillet 的詹姆斯·邦德配方，名字取自 007 中的 Vesper Lynd。",
    descriptionEn: "Gin, vodka and Lillet Blanc — the James Bond original named after Vesper Lynd.",
    storyNoteZh: "1953 年 Ian Fleming 小说《Casino Royale》中首次出现，是 Bond 唯一自创的鸡尾酒。",
    storyNoteEn: "First published in Ian Fleming's 1953 novel Casino Royale — the only cocktail Bond ever invented.",
    balanceTags: ["spirit-forward", "strong", "elegant", "classic"],
    ingredients: [
      { slug: "gin", amount: "60ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "vodka", amount: "20ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "lillet-blanc", amount: "7.5ml", isKey: true, optional: false, notesZh: "约 1 tsp", notesEn: "~1 tsp", order: 3 },
      { slug: "lemon-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 4 },
    ],
    steps: [
      { order: 1, instructionZh: "搅拌杯加金酒、伏特加与丽蕾白。", instructionEn: "Combine gin, vodka and Lillet Blanc in a mixing glass.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰搅和 30 秒至彻底冰凉。", instructionEn: "Add ice and stir for 30 seconds until very cold.", duration: "30s", techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "滤入预冷马天尼杯。", instructionEn: "Strain into a chilled coupe.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "柠檬皮在酒面喷香装饰。", instructionEn: "Express lemon peel oils over the surface.", duration: null, techniqueSlug: "express-peel", tipZh: null, tipEn: null },
    ],
    techniques: ["stir", "express-peel"],
  },
  {
    slug: "gibson",
    nameZh: "吉布森", nameEn: "Gibson",
    difficulty: 2, glassType: "coupe", iceType: "none",
    descriptionZh: "干马天尼的亲戚，用腌洋葱代替橄榄或柠檬皮装饰。",
    descriptionEn: "The dry Martini's pickled-onion cousin, distinguished by its briny garnish.",
    storyNoteZh: "19 世纪末旧金山传说由 Walter D. Klinker 发明，但真正流行于 20 世纪初的纽约。",
    storyNoteEn: "Said to have been invented by Walter D. Klinker in late-19th-century San Francisco, popularised in early 1900s New York.",
    balanceTags: ["spirit-forward", "dry", "savory", "classic"],
    ingredients: [
      { slug: "gin", amount: "60ml", isKey: true, optional: false, notesZh: "London Dry", notesEn: "London Dry", order: 1 },
      { slug: "dry-vermouth", amount: "10ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "olive", amount: "1 piece", isKey: false, optional: false, notesZh: "腌洋葱（用珍珠洋葱在甜醋中腌 24h）", notesEn: "pickled onion (cocktail onion brined 24h in sweet vinegar)", order: 3 },
    ],
    steps: [
      { order: 1, instructionZh: "搅拌杯加金酒与干味美思。", instructionEn: "Combine gin and dry vermouth in a mixing glass.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰搅和 30 秒。", instructionEn: "Add ice and stir for 30 seconds.", duration: "30s", techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "滤入预冷马天尼杯。", instructionEn: "Strain into a chilled coupe.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "放入腌洋葱装饰。", instructionEn: "Drop in a pickled onion.", duration: null, techniqueSlug: null, tipZh: "传统上用珍珠洋葱，酸甜口而非咸酸。", tipEn: "Use cocktail onions, not caperberries — sweet-sour rather than salty-sour." },
    ],
    techniques: ["stir"],
  },
  {
    slug: "perfect-manhattan",
    nameZh: "完美曼哈顿", nameEn: "Perfect Manhattan",
    difficulty: 2, glassType: "coupe", iceType: "none",
    descriptionZh: "等比甜味与干味美思的曼哈顿变奏，比标准版更显复杂。",
    descriptionEn: "The Manhattan split evenly between sweet and dry vermouth for a more layered spirit-forward drink.",
    storyNoteZh: "19 世纪末曼哈顿调酒师为追求「完美」平衡的客人改良。",
    storyNoteEn: "A late-19th-century bartending refinement that uses equal sweet and dry vermouth for a more balanced stirred drink.",
    balanceTags: ["spirit-forward", "herbal", "rich", "classic"],
    ingredients: [
      { slug: "rye", amount: "60ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "sweet-vermouth", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "dry-vermouth", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "angostura", amount: "2 dashes", isKey: true, optional: false, notesZh: null, notesEn: null, order: 4 },
      { slug: "maraschino-cherry", amount: "1 piece", isKey: false, optional: false, notesZh: "酒渍樱桃", notesEn: "brandied cherry", order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "搅拌杯加黑麦、甜味美思、干味美思与安格斯特拉。", instructionEn: "Combine rye, sweet vermouth, dry vermouth and Angostura in a mixing glass.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰搅和 30 秒。", instructionEn: "Add ice and stir for 30 seconds.", duration: "30s", techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "滤入预冷马天尼杯。", instructionEn: "Strain into a chilled coupe.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "酒渍樱桃沉底装饰。", instructionEn: "Drop in a brandied cherry.", duration: null, techniqueSlug: null, tipZh: null, tipEn: null },
    ],
    techniques: ["stir"],
  },
  {
    slug: "dry-manhattan",
    nameZh: "干曼哈顿", nameEn: "Dry Manhattan",
    difficulty: 2, glassType: "coupe", iceType: "none",
    descriptionZh: "用干味美思取代甜味美思的曼哈顿，更干更草本。",
    descriptionEn: "The Manhattan with dry vermouth in place of sweet — drier, more herbal and bone-dry on the finish.",
    storyNoteZh: "20 世纪初随干马天尼潮流而生的曼哈顿分支版本。",
    storyNoteEn: "A 20th-century offshoot of the Manhattan that followed the dry-vermouth wave from the Martini.",
    balanceTags: ["spirit-forward", "dry", "herbal", "classic"],
    ingredients: [
      { slug: "rye", amount: "60ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "dry-vermouth", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "angostura", amount: "2 dashes", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "olive", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 4 },
    ],
    steps: [
      { order: 1, instructionZh: "搅拌杯加黑麦、干味美思与安格斯特拉。", instructionEn: "Combine rye, dry vermouth and Angostura in a mixing glass.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰搅和 30 秒。", instructionEn: "Add ice and stir for 30 seconds.", duration: "30s", techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "滤入预冷马天尼杯。", instructionEn: "Strain into a chilled coupe.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "橄榄或柠檬皮装饰。", instructionEn: "Garnish with an olive or lemon peel.", duration: null, techniqueSlug: null, tipZh: null, tipEn: null },
    ],
    techniques: ["stir"],
  },
  {
    slug: "rob-roy",
    nameZh: "罗布罗伊", nameEn: "Rob Roy",
    difficulty: 2, glassType: "coupe", iceType: "none",
    descriptionZh: "用苏格兰威士忌代替黑麦的曼哈顿版本，1890 年代纽约 Waldorf-Astoria 起源。",
    descriptionEn: "The Manhattan made with Scotch instead of rye, born in 1890s New York at the Waldorf-Astoria.",
    storyNoteZh: "1894 年纽约 Waldorf-Astoria 酒店为同名苏格兰歌剧《Rob Roy》首演而创作。",
    storyNoteEn: "Created in 1894 at the Waldorf-Astoria to mark the premiere of an opera about the Scottish folk hero Rob Roy.",
    balanceTags: ["spirit-forward", "smoky", "rich", "classic"],
    ingredients: [
      { slug: "scotch-blended", amount: "60ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "sweet-vermouth", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "angostura", amount: "2 dashes", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "maraschino-cherry", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 4 },
    ],
    steps: [
      { order: 1, instructionZh: "搅拌杯加苏格兰威士忌、甜味美思与安格斯特拉。", instructionEn: "Combine Scotch, sweet vermouth and Angostura in a mixing glass.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰搅和 30 秒。", instructionEn: "Add ice and stir for 30 seconds.", duration: "30s", techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "滤入预冷马天尼杯。", instructionEn: "Strain into a chilled coupe.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "酒渍樱桃装饰。", instructionEn: "Garnish with a brandied cherry.", duration: null, techniqueSlug: null, tipZh: null, tipEn: null },
    ],
    techniques: ["stir"],
  },
  {
    slug: "negroni-sbagliato",
    nameZh: "错版尼格罗尼", nameEn: "Negroni Sbagliato",
    difficulty: 2, glassType: "rocks", iceType: "large",
    descriptionZh: "用普罗赛克取代金酒的「错版」尼格罗尼，气泡轻盈版本。",
    descriptionEn: "The 'mistaken' Negroni with Prosecco in place of gin — a lighter, sparkling variation.",
    storyNoteZh: "1970 年代米兰 Bar Basso 调酒师 Mirko Stocchetto 本想加金酒却错拿了普罗赛克，从此成为新经典。",
    storyNoteEn: "Born in 1970s Milan when Mirko Stocchetto at Bar Basso grabbed Prosecco instead of gin; the 'mistake' became a new classic.",
    balanceTags: ["bitter", "sparkling", "italian", "modern-classic"],
    ingredients: [
      { slug: "campari", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "sweet-vermouth", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "prosecco", amount: "30ml", isKey: true, optional: false, notesZh: "加满", notesEn: "to top", order: 3 },
      { slug: "orange-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "喷香装饰", notesEn: "expressed garnish", order: 4 },
    ],
    steps: [
      { order: 1, instructionZh: "装有冰球的 rocks 杯加金巴利与甜味美思。", instructionEn: "Pour Campari and sweet vermouth into a rocks glass with a large ice cube.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "顶部加注冰镇普罗赛克。", instructionEn: "Top with chilled Prosecco.", duration: null, techniqueSlug: "build", tipZh: "沿杯壁倒入，保留气泡。", tipEn: "Pour down the side to keep the bubbles." },
      { order: 3, instructionZh: "吧匙轻搅 1-2 次混合。", instructionEn: "Stir once or twice with a bar spoon.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "橙皮喷香装饰。", instructionEn: "Express orange peel over the surface.", duration: null, techniqueSlug: "express-peel", tipZh: null, tipEn: null },
    ],
    techniques: ["build", "express-peel"],
  },
  {
    slug: "remember-the-maine",
    nameZh: "缅因号", nameEn: "Remember the Maine",
    difficulty: 3, glassType: "coupe", iceType: "none",
    descriptionZh: "黑麦、甜味美思、樱桃希林与苦艾酒点缀的曼哈顿变奏。",
    descriptionEn: "A Manhattan variant that adds Cherry Heering and a hint of absinthe for spice and depth.",
    storyNoteZh: "Charles H. Baker 在 1939 年《The Gentleman's Companion》中记录此酒，名字取自 1898 年美军缅因号战舰爆炸事件。",
    storyNoteEn: "Recorded by Charles H. Baker in his 1939 The Gentleman's Companion; named after the USS Maine explosion of 1898.",
    balanceTags: ["spirit-forward", "rich", "anise", "classic"],
    ingredients: [
      { slug: "rye", amount: "45ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "sweet-vermouth", amount: "22.5ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "cherry-heering", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "absinthe", amount: "1 dash", isKey: false, optional: false, notesZh: null, notesEn: null, order: 4 },
      { slug: "lemon-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "马天尼杯用苦艾酒洗杯后倒掉多余部分。", instructionEn: "Rinse a coupe with absinthe; discard the excess.", duration: null, techniqueSlug: null, tipZh: null, tipEn: null },
      { order: 2, instructionZh: "搅拌杯加黑麦、甜味美思与樱桃希林。", instructionEn: "Combine rye, sweet vermouth and Cherry Heering in a mixing glass.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "加冰搅和 30 秒。", instructionEn: "Add ice and stir for 30 seconds.", duration: "30s", techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "滤入苦艾酒洗过的马天尼杯。", instructionEn: "Strain into the absinthe-rinsed coupe.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 5, instructionZh: "柠檬皮喷香装饰。", instructionEn: "Express lemon peel over the surface.", duration: null, techniqueSlug: "express-peel", tipZh: null, tipEn: null },
    ],
    techniques: ["stir", "express-peel"],
  },
  {
    slug: "old-pal",
    nameZh: "老友", nameEn: "Old Pal",
    difficulty: 2, glassType: "coupe", iceType: "none",
    descriptionZh: "等比黑麦、干味美思与金巴利的苦甜平衡版本，比 Negroni 更干。",
    descriptionEn: "Equal parts rye, dry vermouth and Campari — the drier, bone-bright cousin of the Negroni.",
    storyNoteZh: "1920 年代纽约名利场编辑 Sewall Collins 创作的曼哈顿/Negroni 杂交体。",
    storyNoteEn: "Created in 1920s New York by Vanity Fair editor Sewall Collins, a Negroni-Manhattan hybrid.",
    balanceTags: ["bitter", "dry", "spirit-forward", "classic"],
    ingredients: [
      { slug: "rye", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "dry-vermouth", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "campari", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "lemon-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 4 },
    ],
    steps: [
      { order: 1, instructionZh: "搅拌杯加黑麦、干味美思与金巴利。", instructionEn: "Combine rye, dry vermouth and Campari in a mixing glass.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰搅和 30 秒。", instructionEn: "Add ice and stir for 30 seconds.", duration: "30s", techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "滤入预冷马天尼杯。", instructionEn: "Strain into a chilled coupe.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "柠檬皮喷香装饰。", instructionEn: "Express lemon peel over the surface.", duration: null, techniqueSlug: "express-peel", tipZh: null, tipEn: null },
    ],
    techniques: ["stir", "express-peel"],
  },
  {
    slug: "algonquin",
    nameZh: "阿尔冈昆", nameEn: "Algonquin",
    difficulty: 2, glassType: "coupe", iceType: "none",
    descriptionZh: "等比黑麦、干味美思与菠萝汁，曼哈顿的高球清爽版。",
    descriptionEn: "Equal parts rye, dry vermouth and pineapple juice — the Manhattan's tropical-light cousin.",
    storyNoteZh: "1930 年代纽约 Algonquin Hotel 的著名 Round Table 文学圈常点之酒。",
    storyNoteEn: "Popular in the 1930s at New York's Algonquin Hotel, the meeting place of the famous Round Table writers.",
    balanceTags: ["spirit-forward", "fruity", "elegant", "classic"],
    ingredients: [
      { slug: "rye", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "dry-vermouth", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "pineapple-juice", amount: "30ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 3 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶加黑麦、干味美思与菠萝汁。", instructionEn: "Add rye, dry vermouth and pineapple juice to a shaker.", duration: null, techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰摇和 10 秒。", instructionEn: "Fill with ice and shake for 10 seconds.", duration: "10s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "双重过滤入预冷马天尼杯。", instructionEn: "Double-strain into a chilled coupe.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
    ],
    techniques: ["shake", "double-strain"],
  },
  {
    slug: "lucien-gaudin",
    nameZh: "吕西安·高丹", nameEn: "Lucien Gaudin",
    difficulty: 3, glassType: "coupe", iceType: "none",
    descriptionZh: "金酒、干味美思、金巴利与绿查特的多重苦草本，1910 年代巴黎法国网球冠军命名。",
    descriptionEn: "Gin, dry vermouth, Campari and Green Chartreuse — a multi-bitter French classic named for a tennis champion.",
    storyNoteZh: "1920 年代巴黎 Harry MacElhone 创作，名字取自 1920 年代法国网球公开赛冠军 Lucien Gaudin。",
    storyNoteEn: "Created in 1920s Paris by Harry MacElhone, named after French tennis champion Lucien Gaudin.",
    balanceTags: ["bitter", "herbal", "complex", "classic"],
    ingredients: [
      { slug: "gin", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "dry-vermouth", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "campari", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "green-chartreuse", amount: "7.5ml", isKey: true, optional: false, notesZh: "约 1 tsp", notesEn: "~1 tsp", order: 4 },
      { slug: "lemon-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "搅拌杯加金酒、干味美思、金巴利与绿查特。", instructionEn: "Combine gin, dry vermouth, Campari and green Chartreuse in a mixing glass.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰搅和 30 秒。", instructionEn: "Add ice and stir for 30 seconds.", duration: "30s", techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "滤入预冷马天尼杯。", instructionEn: "Strain into a chilled coupe.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "柠檬皮喷香装饰。", instructionEn: "Express lemon peel over the surface.", duration: null, techniqueSlug: "express-peel", tipZh: null, tipEn: null },
    ],
    techniques: ["stir", "express-peel"],
  },
  {
    slug: "tuxedo-no-2",
    nameZh: "燕尾服 2 号", nameEn: "Tuxedo No. 2",
    difficulty: 3, glassType: "coupe", iceType: "none",
    descriptionZh: "金酒、干味美思、马拉斯奇诺、苦艾酒与 Amaro Montenegro 的多层次版燕尾服。",
    descriptionEn: "A multi-layered Tuxedo that adds Amaro Montenegro for extra bitter depth.",
    storyNoteZh: "1910-30 年代 Harry Craddock 在伦敦 Savoy 对原始 Tuxedo 的扩展版本。",
    storyNoteEn: "An early 20th-century extension of the Tuxedo from Harry Craddock's Savoy era.",
    balanceTags: ["spirit-forward", "herbal", "bitter", "classic"],
    ingredients: [
      { slug: "gin", amount: "45ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "dry-vermouth", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "maraschino", amount: "7.5ml", isKey: false, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "absinthe", amount: "1 dash", isKey: false, optional: false, notesZh: "洗杯", notesEn: "rinse", order: 4 },
      { slug: "orange-bitters", amount: "2 dashes", isKey: false, optional: false, notesZh: null, notesEn: null, order: 5 },
      { slug: "averna", amount: "1 tsp", isKey: false, optional: false, notesZh: "Amaro Montenegro 等意式苦酒", notesEn: "Amaro Montenegro etc.", order: 6 },
      { slug: "lemon-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 7 },
    ],
    steps: [
      { order: 1, instructionZh: "马天尼杯用苦艾酒洗杯后倒掉多余部分。", instructionEn: "Rinse a coupe with absinthe; discard the excess.", duration: null, techniqueSlug: null, tipZh: null, tipEn: null },
      { order: 2, instructionZh: "搅拌杯加金酒、干味美思、马拉斯奇诺、Averna 与橙皮苦精。", instructionEn: "Combine gin, dry vermouth, maraschino, Averna and orange bitters in a mixing glass.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "加冰搅和 30 秒。", instructionEn: "Add ice and stir for 30 seconds.", duration: "30s", techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "滤入苦艾酒洗过的马天尼杯。", instructionEn: "Strain into the absinthe-rinsed coupe.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 5, instructionZh: "柠檬皮喷香装饰。", instructionEn: "Express lemon peel over the surface.", duration: null, techniqueSlug: "express-peel", tipZh: null, tipEn: null },
    ],
    techniques: ["stir", "express-peel"],
  },
  {
    slug: "charterhouse",
    nameZh: "查特豪斯", nameEn: "Charterhouse",
    difficulty: 2, glassType: "coupe", iceType: "none",
    descriptionZh: "金酒与甜味美思的简单苦精调酒，1900 年代伦敦 Charterhouse 起源。",
    descriptionEn: "A simple gin-and-sweet-vermouth stirred drink with dual bitters, named for a London Charterhouse bar.",
    storyNoteZh: "19 世纪末伦敦 Charterhouse 修道士酒吧常点的开胃酒，1900 年代进入主流鸡尾酒书。",
    storyNoteEn: "A pre-1900 London apéritif associated with the Charterhouse; it entered cocktail books at the turn of the 20th century.",
    balanceTags: ["spirit-forward", "herbal", "bitter", "classic"],
    ingredients: [
      { slug: "gin", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "sweet-vermouth", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "angostura", amount: "1 dash", isKey: false, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "orange-bitters", amount: "1 dash", isKey: false, optional: false, notesZh: null, notesEn: null, order: 4 },
      { slug: "lemon-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "搅拌杯加金酒、甜味美思与两种苦精。", instructionEn: "Combine gin, sweet vermouth, Angostura and orange bitters in a mixing glass.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰搅和 30 秒。", instructionEn: "Add ice and stir for 30 seconds.", duration: "30s", techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "滤入预冷马天尼杯。", instructionEn: "Strain into a chilled coupe.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "柠檬皮喷香装饰。", instructionEn: "Express lemon peel over the surface.", duration: null, techniqueSlug: "express-peel", tipZh: null, tipEn: null },
    ],
    techniques: ["stir", "express-peel"],
  },
  {
    slug: "income-tax",
    nameZh: "所得税", nameEn: "Income Tax",
    difficulty: 2, glassType: "coupe", iceType: "none",
    descriptionZh: "金酒、甜味与干味美思、橙汁与安格斯特拉的「苦涩税务日」鸡尾酒。",
    descriptionEn: "Gin, sweet and dry vermouth, orange juice and Angostura — a bitter 1920s aperitif with a tongue-in-cheek name.",
    storyNoteZh: "1920 年代禁酒令期间发明，原名「Income Tax Cocktail」，税季时的安慰酒。",
    storyNoteEn: "Created in 1920s Prohibition America; the name refers to the bitter taste that reminded drinkers of tax season.",
    balanceTags: ["spirit-forward", "bitter", "fruity", "classic"],
    ingredients: [
      { slug: "gin", amount: "22.5ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "dry-vermouth", amount: "22.5ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "sweet-vermouth", amount: "22.5ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "orange-juice", amount: "22.5ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 4 },
      { slug: "angostura", amount: "1 dash", isKey: false, optional: false, notesZh: null, notesEn: null, order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶加金酒、甜味美思、干味美思、橙汁与安格斯特拉。", instructionEn: "Add gin, dry vermouth, sweet vermouth, orange juice and Angostura to a shaker.", duration: null, techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰摇和 10 秒。", instructionEn: "Fill with ice and shake for 10 seconds.", duration: "10s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "双重过滤入预冷马天尼杯。", instructionEn: "Double-strain into a chilled coupe.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
    ],
    techniques: ["shake", "double-strain"],
  },
  {
    slug: "green-point",
    nameZh: "绿点", nameEn: "Green Point",
    difficulty: 2, glassType: "coupe", iceType: "none",
    descriptionZh: "黑麦、甜味美思与黄查特的曼哈顿加绿版本，纽约绿点区命名。",
    descriptionEn: "Rye, sweet vermouth and Yellow Chartreuse — the Manhattan with a herbal, chartreuse-green twist.",
    storyNoteZh: "2000 年代纽约 Greenpoint 酒吧 Greenpoint 调酒师 Michael Mas co 创作，是 Manhattan 的现代绿色后裔。",
    storyNoteEn: "Created at New York's Greenpoint bar in the 2000s, a green Chartreuse-fortified Manhattan variant.",
    balanceTags: ["spirit-forward", "herbal", "rich", "modern-classic"],
    ingredients: [
      { slug: "rye", amount: "45ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "sweet-vermouth", amount: "22.5ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "yellow-chartreuse", amount: "22.5ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "angostura", amount: "2 dashes", isKey: false, optional: false, notesZh: null, notesEn: null, order: 4 },
      { slug: "maraschino-cherry", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "搅拌杯加黑麦、甜味美思、黄查特与安格斯特拉。", instructionEn: "Combine rye, sweet vermouth, yellow Chartreuse and Angostura in a mixing glass.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰搅和 30 秒。", instructionEn: "Add ice and stir for 30 seconds.", duration: "30s", techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "滤入预冷马天尼杯。", instructionEn: "Strain into a chilled coupe.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "酒渍樱桃装饰。", instructionEn: "Garnish with a brandied cherry.", duration: null, techniqueSlug: null, tipZh: null, tipEn: null },
    ],
    techniques: ["stir"],
  },
  // ───── 2. Shaken Sours (12) ───────────────────────────────────────────────
  {
    slug: "clover-club",
    nameZh: "三叶草俱乐部", nameEn: "Clover Club",
    difficulty: 3, glassType: "coupe", iceType: "none",
    descriptionZh: "金酒、覆盆子糖浆、柠檬与蛋清的粉色酸酒，1900 年代费城男士俱乐部起源。",
    descriptionEn: "Gin, raspberry, lemon and egg white — the pink pre-Prohibition sour from Philadelphia's Clover Club.",
    storyNoteZh: "1900 年代费城 Clover Club 调酒师为男士俱乐部成员创作，2010 年代由 Death & Co 复兴。",
    storyNoteEn: "Originated in 1900s Philadelphia at the Clover Club gentlemen's club; revived by Death & Co. in the 2000s.",
    balanceTags: ["sour", "fruity", "foamy", "classic"],
    ingredients: [
      { slug: "gin", amount: "45ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "raspberry-syrup", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "lemon-juice", amount: "15ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 3 },
      { slug: "egg-white", amount: "1 piece", isKey: false, optional: false, notesZh: "干湿双摇", notesEn: "dry + wet shake", order: 4 },
      { slug: "raspberry", amount: "3 pieces", isKey: false, optional: false, notesZh: "新鲜覆盆子装饰", notesEn: "fresh raspberries garnish", order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶加金酒、覆盆子糖浆、柠檬汁与蛋清（无冰）。", instructionEn: "Add gin, raspberry syrup, lemon juice and egg white to a shaker (no ice).", duration: null, techniqueSlug: "dry-shake", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "干摇 15 秒让蛋清乳化。", instructionEn: "Dry-shake hard for 15 seconds to emulsify the egg white.", duration: "15s", techniqueSlug: "dry-shake", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "加冰再摇 10-12 秒。", instructionEn: "Add ice and wet-shake for 10-12 seconds.", duration: "12s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "双重过滤入预冷马天尼杯。", instructionEn: "Double-strain into a chilled coupe.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
      { order: 5, instructionZh: "三颗新鲜覆盆子装饰。", instructionEn: "Garnish with three fresh raspberries.", duration: null, techniqueSlug: null, tipZh: null, tipEn: null },
    ],
    techniques: ["dry-shake", "shake", "double-strain"],
  },
  {
    slug: "army-navy",
    nameZh: "陆军与海军", nameEn: "Army & Navy",
    difficulty: 2, glassType: "coupe", iceType: "none",
    descriptionZh: "金酒、杏仁糖浆与柠檬的清亮酸酒，1910 年代华盛顿陆军海军俱乐部起源。",
    descriptionEn: "Gin, orgeat and lemon — a clean almond sour from Washington's Army and Navy Club.",
    storyNoteZh: "1910-30 年代华盛顿特区 Army and Navy Club 调酒师发明，原始配方无苦精。",
    storyNoteEn: "Created at the Army and Navy Club in Washington D.C. in the early 20th century.",
    balanceTags: ["sour", "nutty", "classic", "elegant"],
    ingredients: [
      { slug: "gin", amount: "45ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "orgeat", amount: "22.5ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "lemon-juice", amount: "22.5ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 3 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶加金酒、杏仁糖浆与柠檬汁。", instructionEn: "Add gin, orgeat and lemon juice to a shaker.", duration: null, techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰摇和 10 秒。", instructionEn: "Fill with ice and shake for 10 seconds.", duration: "10s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "双重过滤入预冷马天尼杯。", instructionEn: "Double-strain into a chilled coupe.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
    ],
    techniques: ["shake", "double-strain"],
  },
  {
    slug: "airmail",
    nameZh: "航空邮件", nameEn: "Airmail",
    difficulty: 3, glassType: "coupe", iceType: "none",
    descriptionZh: "陈年朗姆、青柠、蜂蜜糖浆与香槟的 1930 年代气泡鸡尾酒。",
    descriptionEn: "Aged rum, lime, honey and Champagne — the 1930s sparkling Cuban letter-to-flyer cocktail.",
    storyNoteZh: "1930 年代古巴哈瓦那为纪念 1927 年林白首次跨大西洋航空邮件而创作。",
    storyNoteEn: "Created in 1930s Havana to honour the first trans-Atlantic airmail service.",
    balanceTags: ["sparkling", "honey", "tropical", "classic"],
    ingredients: [
      { slug: "aged-rum", amount: "45ml", isKey: true, optional: false, notesZh: "陈年牙买加朗姆", notesEn: "aged Jamaican rum", order: 1 },
      { slug: "lime-juice", amount: "22.5ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 2 },
      { slug: "honey-syrup", amount: "22.5ml", isKey: true, optional: false, notesZh: "1:1 蜂蜜水", notesEn: "1:1 honey-water", order: 3 },
      { slug: "champagne", amount: "60ml", isKey: true, optional: false, notesZh: "加满", notesEn: "to top", order: 4 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶加陈年朗姆、青柠汁与蜂蜜糖浆。", instructionEn: "Add aged rum, lime juice and honey syrup to a shaker.", duration: null, techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰摇和 10 秒。", instructionEn: "Fill with ice and shake for 10 seconds.", duration: "10s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "双重过滤入预冷马天尼杯。", instructionEn: "Double-strain into a chilled coupe.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "顶部加注冰镇香槟。", instructionEn: "Top with chilled Champagne.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
    ],
    techniques: ["shake", "double-strain", "build"],
  },
  {
    slug: "boston-sour",
    nameZh: "波士顿酸", nameEn: "Boston Sour",
    difficulty: 3, glassType: "rocks", iceType: "large",
    descriptionZh: "威士忌酸加蛋白与红葡萄酒浮酒的双层酸酒。",
    descriptionEn: "A Whiskey Sour finished with egg white and a red wine float for an extra layer of tannin.",
    storyNoteZh: "19 世纪末波士顿调酒师对 Whiskey Sour 的扩版本，加上蛋清与红葡萄酒浮层。",
    storyNoteEn: "A late-19th-century Boston variation on the Whiskey Sour that adds egg white and a red wine float.",
    balanceTags: ["sour", "foamy", "rich", "classic"],
    ingredients: [
      { slug: "bourbon", amount: "60ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "lemon-juice", amount: "30ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 2 },
      { slug: "simple-syrup", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "egg-white", amount: "1 piece", isKey: false, optional: false, notesZh: "干湿双摇", notesEn: "dry + wet shake", order: 4 },
      { slug: "red-wine", amount: "15ml", isKey: false, optional: false, notesZh: "顶部浮酒", notesEn: "float on top", order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶加波本、柠檬汁、单糖浆与蛋清（无冰）。", instructionEn: "Add bourbon, lemon juice, simple syrup and egg white to a shaker (no ice).", duration: null, techniqueSlug: "dry-shake", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "干摇 15 秒。", instructionEn: "Dry-shake for 15 seconds.", duration: "15s", techniqueSlug: "dry-shake", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "加冰再摇 10-12 秒。", instructionEn: "Add ice and wet-shake for 10-12 seconds.", duration: "12s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "双重过滤入装有冰球的 rocks 杯。", instructionEn: "Double-strain into a rocks glass with a large ice cube.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
      { order: 5, instructionZh: "吧匙背面缓慢倒入红葡萄酒，浮于酒面。", instructionEn: "Slowly float the red wine over the back of a bar spoon.", duration: null, techniqueSlug: null, tipZh: "慢慢倒才能分层。", tipEn: "Pour slowly to maintain a distinct layer." },
    ],
    techniques: ["dry-shake", "shake", "double-strain"],
  },
  {
    slug: "new-york-sour",
    nameZh: "纽约酸", nameEn: "New York Sour",
    difficulty: 3, glassType: "rocks", iceType: "large",
    descriptionZh: "波本威士忌酸加红葡萄酒浮酒的视觉与味觉双层。",
    descriptionEn: "A Whiskey Sour with a red wine float — the layered, blush-coloured pre-Prohibition classic.",
    storyNoteZh: "19 世纪末至禁酒令前期的美国版本，原创版本传说是波士顿 Sour 的纽约亲戚。",
    storyNoteEn: "A pre-Prohibition American cousin of the Whiskey Sour with a red wine float for colour and tannin.",
    balanceTags: ["sour", "rich", "foamy", "classic"],
    ingredients: [
      { slug: "rye", amount: "60ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "lemon-juice", amount: "30ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 2 },
      { slug: "simple-syrup", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "egg-white", amount: "1 piece", isKey: false, optional: true, notesZh: "可选", notesEn: "optional", order: 4 },
      { slug: "red-wine", amount: "15ml", isKey: false, optional: false, notesZh: "顶部浮酒", notesEn: "float on top", order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶加黑麦、柠檬汁、单糖浆与蛋清（若使用，无冰）。", instructionEn: "Add rye, lemon juice, simple syrup and egg white (if using) to a shaker (no ice).", duration: null, techniqueSlug: "dry-shake", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "干摇 15 秒。", instructionEn: "Dry-shake for 15 seconds.", duration: "15s", techniqueSlug: "dry-shake", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "加冰再摇 10-12 秒。", instructionEn: "Add ice and wet-shake for 10-12 seconds.", duration: "12s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "双重过滤入装有冰球的 rocks 杯。", instructionEn: "Double-strain into a rocks glass with a large ice cube.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
      { order: 5, instructionZh: "吧匙背面缓慢浮上红葡萄酒。", instructionEn: "Float the red wine slowly over the back of a bar spoon.", duration: null, techniqueSlug: null, tipZh: null, tipEn: null },
    ],
    techniques: ["dry-shake", "shake", "double-strain"],
  },
  {
    slug: "planters-punch",
    nameZh: "种植园主宾治", nameEn: "Planter's Punch",
    difficulty: 3, glassType: "highball", iceType: "cubed",
    descriptionZh: "黑朗姆、青柠、糖与安格斯特拉的传统加勒比高球。",
    descriptionEn: "Dark rum, lime, sugar and Angostura — the Caribbean planter's classic long punch.",
    storyNoteZh: "19 世纪牙买加种植园主发明，传统口诀「一份酸、两份甜、三份强、四份柔」。",
    storyNoteEn: "Created by 19th-century Jamaican planters; the recipe famously follows the rhyme 'one of sour, two of sweet, three of strong, four of weak'.",
    balanceTags: ["refreshing", "tropical", "highball", "classic"],
    ingredients: [
      { slug: "dark-rum", amount: "45ml", isKey: true, optional: false, notesZh: "Jamaican", notesEn: "Jamaican", order: 1 },
      { slug: "lime-juice", amount: "22.5ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 2 },
      { slug: "simple-syrup", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "angostura", amount: "2 dashes", isKey: false, optional: false, notesZh: null, notesEn: null, order: 4 },
      { slug: "club-soda", amount: "60ml", isKey: false, optional: false, notesZh: "稀释", notesEn: "to lengthen", order: 5 },
      { slug: "mint-sprig", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 6 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶加黑朗姆、青柠汁、单糖浆与安格斯特拉。", instructionEn: "Add dark rum, lime juice, simple syrup and Angostura to a shaker.", duration: null, techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰摇和 8 秒。", instructionEn: "Fill with ice and shake for 8 seconds.", duration: "8s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "双重过滤入装有方冰的高球杯。", instructionEn: "Double-strain into a highball with cubed ice.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "顶部加苏打水。", instructionEn: "Top with club soda.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 5, instructionZh: "吧匙轻搅 1 次，薄荷装饰。", instructionEn: "Stir once and garnish with a mint sprig.", duration: null, techniqueSlug: null, tipZh: null, tipEn: null },
    ],
    techniques: ["shake", "double-strain", "build"],
  },
  {
    slug: "stone-fence",
    nameZh: "石墙", nameEn: "Stone Fence",
    difficulty: 2, glassType: "highball", iceType: "cubed",
    descriptionZh: "黑麦或苹果白兰地加干型苹果西打的美国殖民时期高球。",
    descriptionEn: "Rye or applejack with dry hard cider — the colonial American stone-wall highball.",
    storyNoteZh: "美国独立战争时期起源，原始版本用苹果白兰地或黑麦配苹果酒。",
    storyNoteEn: "A colonial American highball dating to the Revolutionary War, traditionally made with applejack and hard cider.",
    balanceTags: ["refreshing", "highball", "historic", "easy"],
    ingredients: [
      { slug: "rye", amount: "60ml", isKey: true, optional: false, notesZh: "或苹果白兰地", notesEn: "or applejack", order: 1 },
      { slug: "hard-cider", amount: "120ml", isKey: true, optional: false, notesZh: "干型", notesEn: "dry", order: 2 },
      { slug: "angostura", amount: "2 dashes", isKey: false, optional: true, notesZh: "可选", notesEn: "optional", order: 3 },
      { slug: "lemon-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 4 },
    ],
    steps: [
      { order: 1, instructionZh: "高球杯装满方冰。", instructionEn: "Fill a highball with cubed ice.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "倒入黑麦与苹果西打。", instructionEn: "Pour the rye and hard cider over the ice.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "滴 2 dashes 安格斯特拉（可选），吧匙轻搅 1 次。", instructionEn: "Add 2 dashes Angostura (optional) and stir once.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "柠檬皮喷香装饰。", instructionEn: "Express lemon peel over the surface.", duration: null, techniqueSlug: "express-peel", tipZh: null, tipEn: null },
    ],
    techniques: ["build", "express-peel"],
  },
  {
    slug: "southside-fizz",
    nameZh: "南区菲士", nameEn: "Southside Fizz",
    difficulty: 2, glassType: "highball", iceType: "cubed",
    descriptionZh: "Southside 的气泡高杯版本，加苏打水延长口感。",
    descriptionEn: "The highball, fizzy version of the Southside — gin, lime, mint and soda lengthened with fizz.",
    storyNoteZh: "1920 年代纽约长岛 South Side 鸡尾酒的高杯版本，可能与禁酒令时期黑帮据点相关。",
    storyNoteEn: "The highball version of the Southside that became popular in 1920s New York.",
    balanceTags: ["refreshing", "citrus", "herbal", "highball"],
    ingredients: [
      { slug: "gin", amount: "60ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "lime-juice", amount: "30ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 2 },
      { slug: "simple-syrup", amount: "20ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "mint", amount: "8 leaves", isKey: true, optional: false, notesZh: "轻捣", notesEn: "muddle gently", order: 4 },
      { slug: "soda-water", amount: "60ml", isKey: false, optional: false, notesZh: "顶部加注", notesEn: "to top", order: 5 },
      { slug: "mint-sprig", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 6 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶底放入薄荷叶。", instructionEn: "Place mint leaves at the bottom of a shaker.", duration: null, techniqueSlug: "muddle", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "轻压 3-4 次释放薄荷油。", instructionEn: "Gently press 3-4 times to release mint oils.", duration: "10s", techniqueSlug: "muddle", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "加入金酒、青柠汁与单糖浆，加冰摇和 8 秒。", instructionEn: "Add gin, lime juice and simple syrup; fill with ice and shake for 8 seconds.", duration: "8s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "双重过滤入装有方冰的高球杯。", instructionEn: "Double-strain into a highball with cubed ice.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
      { order: 5, instructionZh: "顶部加苏打水，薄荷枝装饰。", instructionEn: "Top with soda; garnish with a mint sprig.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
    ],
    techniques: ["muddle", "shake", "double-strain", "build"],
  },
  {
    slug: "sloe-gin-fizz",
    nameZh: "黑刺李金菲士", nameEn: "Sloe Gin Fizz",
    difficulty: 3, glassType: "highball", iceType: "cubed",
    descriptionZh: "黑刺李金酒、金酒、柠檬与苏打水的朦胧粉色菲士。",
    descriptionEn: "Sloe gin, dry gin, lemon and soda — the hazy pink fizz that made Bourbon Street famous.",
    storyNoteZh: "1910 年代新奥尔良 French Quarter 流行，据说可以连续喝 12 杯不醉。",
    storyNoteEn: "Popular in 1910s New Orleans; the 'twelve-mile cocktail' legend claims a fresh one arrives before you finish the last.",
    balanceTags: ["refreshing", "fruity", "highball", "classic"],
    ingredients: [
      { slug: "sloe-gin", amount: "45ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "gin", amount: "22.5ml", isKey: true, optional: false, notesZh: "London Dry", notesEn: "London Dry", order: 2 },
      { slug: "lemon-juice", amount: "30ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 3 },
      { slug: "simple-syrup", amount: "7.5ml", isKey: false, optional: false, notesZh: "约 1 tsp", notesEn: "~1 tsp", order: 4 },
      { slug: "soda-water", amount: "60ml", isKey: false, optional: false, notesZh: "顶部加注", notesEn: "to top", order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶加黑刺李金酒、金酒、柠檬汁与单糖浆。", instructionEn: "Add sloe gin, gin, lemon juice and simple syrup to a shaker.", duration: null, techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰摇和 10 秒。", instructionEn: "Fill with ice and shake for 10 seconds.", duration: "10s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "双重过滤入装有方冰的高球杯。", instructionEn: "Double-strain into a highball with cubed ice.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "顶部加苏打水，吧匙轻搅 1 次。", instructionEn: "Top with soda and stir once.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
    ],
    techniques: ["shake", "double-strain", "build"],
  },
  {
    slug: "boston-sidecar",
    nameZh: "波士顿边车", nameEn: "Boston Sidecar",
    difficulty: 2, glassType: "coupe", iceType: "none",
    descriptionZh: "用 Grand Marnier 替代君度的边车变奏，更复杂更橙香。",
    descriptionEn: "The Sidecar with Grand Marnier in place of Cointreau — a richer, more bitter-orange version.",
    storyNoteZh: "1930 年代波士顿版本，与巴黎原版同时流行，Grand Marnier 的苦橙更显厚重。",
    storyNoteEn: "A 1930s Boston variation that uses Grand Marnier for a more bitter-orange depth.",
    balanceTags: ["sour", "elegant", "citrus", "classic"],
    ingredients: [
      { slug: "cognac", amount: "45ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "cointreau", amount: "22.5ml", isKey: true, optional: false, notesZh: "或 Grand Marnier 22.5ml（更苦橙）", notesEn: "or 22.5ml Grand Marnier (more bitter-orange)", order: 2 },
      { slug: "lemon-juice", amount: "22.5ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 4 },
      { slug: "orange-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "马天尼杯口擦柠檬，蘸砂糖。", instructionEn: "Rim a coupe with sugar using a lemon wedge.", duration: null, techniqueSlug: "sugar-rim", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "摇酒壶加干邑、Grand Marnier 与柠檬汁。", instructionEn: "Add cognac, Grand Marnier and lemon juice to a shaker.", duration: null, techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "加冰摇和 10 秒。", instructionEn: "Fill with ice and shake for 10 seconds.", duration: "10s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "双重过滤入糖边马天尼杯。", instructionEn: "Double-strain into the sugared coupe.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
      { order: 5, instructionZh: "橙皮喷香装饰。", instructionEn: "Express orange peel over the surface.", duration: null, techniqueSlug: "express-peel", tipZh: null, tipEn: null },
    ],
    techniques: ["shake", "double-strain", "sugar-rim", "express-peel"],
  },
  {
    slug: "jasmine",
    nameZh: "茉莉", nameEn: "Jasmine",
    difficulty: 2, glassType: "coupe", iceType: "none",
    descriptionZh: "金酒、君度、Campari 与柠檬的现代小杯酸酒。",
    descriptionEn: "Gin, Cointreau, Campari and lemon — a bitter-orange modern small-serve sour.",
    storyNoteZh: "1990 年代由 Paul Harrington 在 San Francisco 创作，是 21 世纪最初一批现代经典之一。",
    storyNoteEn: "Created in 1990s San Francisco by Paul Harrington, one of the first modern classics of the 21st century.",
    balanceTags: ["sour", "bitter", "balanced", "modern-classic"],
    ingredients: [
      { slug: "gin", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "cointreau", amount: "7.5ml", isKey: true, optional: false, notesZh: "约 1 tsp", notesEn: "~1 tsp", order: 2 },
      { slug: "campari", amount: "7.5ml", isKey: true, optional: false, notesZh: "约 1 tsp", notesEn: "~1 tsp", order: 3 },
      { slug: "lemon-juice", amount: "30ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 4 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶加金酒、君度、Campari 与柠檬汁。", instructionEn: "Add gin, Cointreau, Campari and lemon juice to a shaker.", duration: null, techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰摇和 10 秒。", instructionEn: "Fill with ice and shake for 10 seconds.", duration: "10s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "双重过滤入预冷马天尼杯。", instructionEn: "Double-strain into a chilled coupe.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
    ],
    techniques: ["shake", "double-strain"],
  },
  {
    slug: "gold-rush",
    nameZh: "淘金热", nameEn: "Gold Rush",
    difficulty: 2, glassType: "rocks", iceType: "large",
    descriptionZh: "波本、蜂蜜糖浆与柠檬的现代经典酸酒。",
    descriptionEn: "Bourbon, honey syrup and lemon — the modern sour that put T.J. Siegel's Milk & Honey on the map.",
    storyNoteZh: "2000 年代纽约 Milk & Honey 调酒师 T.J. Siegel 创作，是 21 世纪最具影响力的现代经典之一。",
    storyNoteEn: "Created in the 2000s at New York's Milk & Honey by T.J. Siegel; one of the most influential modern classics.",
    balanceTags: ["sour", "honey", "modern-classic", "balanced"],
    ingredients: [
      { slug: "bourbon", amount: "60ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "lemon-juice", amount: "22.5ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 2 },
      { slug: "honey-syrup", amount: "22.5ml", isKey: true, optional: false, notesZh: "1:1 蜂蜜水", notesEn: "1:1 honey-water", order: 3 },
      { slug: "lemon-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 4 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶加波本、柠檬汁与蜂蜜糖浆。", instructionEn: "Add bourbon, lemon juice and honey syrup to a shaker.", duration: null, techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰摇和 10-12 秒。", instructionEn: "Fill with ice and shake for 10-12 seconds.", duration: "12s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "双重过滤入装有冰球的 rocks 杯。", instructionEn: "Double-strain into a rocks glass with a large ice cube.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "柠檬皮喷香装饰。", instructionEn: "Express lemon peel over the surface.", duration: null, techniqueSlug: "express-peel", tipZh: null, tipEn: null },
    ],
    techniques: ["shake", "double-strain", "express-peel"],
  },
  // ───── 3. Highballs & Builds (10) ─────────────────────────────────────────
  {
    slug: "gin-rickey",
    nameZh: "金雷基", nameEn: "Gin Rickey",
    difficulty: 1, glassType: "highball", iceType: "cubed",
    descriptionZh: "金酒、青柠与苏打水的极简气泡鸡尾酒，1890 年代华盛顿特区起源。",
    descriptionEn: "Gin, lime and soda — the highball built around a splash of fresh lime and lots of bubbles.",
    storyNoteZh: "1880 年代华盛顿特区 Lobby House 调酒师 George A. Williamson 为 Colonel Joe Rickey 创作，原始版本用波本。",
    storyNoteEn: "Created in 1880s D.C. at the Shoomaker's bar for lobbyist Colonel Joe Rickey; the bourbon original predates the gin version.",
    balanceTags: ["refreshing", "citrus", "highball", "easy"],
    ingredients: [
      { slug: "gin", amount: "60ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "lime-juice", amount: "22.5ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 2 },
      { slug: "soda-water", amount: "90ml", isKey: false, optional: false, notesZh: "加满", notesEn: "to top", order: 3 },
      { slug: "lime-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 4 },
    ],
    steps: [
      { order: 1, instructionZh: "高球杯装满方冰。", instructionEn: "Fill a highball with cubed ice.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "倒入金酒与青柠汁。", instructionEn: "Pour the gin and lime juice over the ice.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "顶部加满冰镇苏打水。", instructionEn: "Top with chilled soda water.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "吧匙从下往上轻搅 2 次，青柠角装饰。", instructionEn: "Stir twice from bottom to top; garnish with a lime wedge.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
    ],
    techniques: ["build"],
  },
  {
    slug: "americano",
    nameZh: "美国佬", nameEn: "Americano",
    difficulty: 1, glassType: "highball", iceType: "cubed",
    descriptionZh: "金巴利、甜味美思与苏打水的意大利开胃高球。",
    descriptionEn: "Campari, sweet vermouth and soda — Italy's most refreshing pre-dinner highball.",
    storyNoteZh: "19 世纪意大利加斯帕雷·坎帕里发明的「Milano-Torino」演变而来；意大利语「AmERICANO」是对美国游客的友好戏称。",
    storyNoteEn: "Evolved from Gaspare Campari's 19th-century 'Milano-Torino'; the name nods to American tourists who loved to add soda.",
    balanceTags: ["refreshing", "bitter", "highball", "easy"],
    ingredients: [
      { slug: "campari", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "sweet-vermouth", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "soda-water", amount: "90ml", isKey: false, optional: false, notesZh: "加满", notesEn: "to top", order: 3 },
      { slug: "orange-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 4 },
      { slug: "lemon-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "高球杯装满方冰。", instructionEn: "Fill a highball with cubed ice.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "先倒金巴利，再倒甜味美思。", instructionEn: "Add the Campari, then the sweet vermouth.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "顶部加满冰镇苏打水。", instructionEn: "Top with chilled soda water.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "吧匙轻搅，橙皮与柠檬皮装饰。", instructionEn: "Stir gently; garnish with orange and lemon peel.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
    ],
    techniques: ["build"],
  },
  {
    slug: "sherry-cobbler",
    nameZh: "雪利碎冰杯", nameEn: "Sherry Cobbler",
    difficulty: 2, glassType: "rocks", iceType: "crushed",
    descriptionZh: "雪利酒、糖浆与碎冰的 19 世纪经典杯饮。",
    descriptionEn: "Sherry, sugar and crushed ice — the 19th-century cobbler that launched a glassware style.",
    storyNoteZh: "1830 年代美国流行，是 19 世纪中叶最受欢迎的鸡尾酒之一；Cobbler 杯因此类饮品得名。",
    storyNoteEn: "A 1830s American classic; the 'cobbler' glass shape was named after this very drink.",
    balanceTags: ["refreshing", "nutty", "historic", "highball"],
    ingredients: [
      { slug: "amontillado-sherry", amount: "75ml", isKey: true, optional: false, notesZh: "或菲诺雪利酒", notesEn: "or fino", order: 1 },
      { slug: "simple-syrup", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "orange-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 3 },
      { slug: "mint-sprig", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 4 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶加雪利酒与单糖浆。", instructionEn: "Add sherry and simple syrup to a shaker.", duration: null, techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加碎冰轻摇 5 秒。", instructionEn: "Fill with crushed ice and shake briefly.", duration: "5s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "过滤入装满碎冰的 rocks 或 cobbler 杯。", instructionEn: "Strain into a rocks or cobbler glass packed with crushed ice.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "橙片、季节水果与薄荷装饰。", instructionEn: "Garnish with an orange slice, seasonal berries and a mint sprig.", duration: null, techniqueSlug: null, tipZh: null, tipEn: null },
    ],
    techniques: ["shake", "build"],
  },
  {
    slug: "shandy",
    nameZh: "香蒂", nameEn: "Shandy",
    difficulty: 1, glassType: "highball", iceType: "cubed",
    descriptionZh: "啤酒与柠檬汽水各半的英国夏日高球。",
    descriptionEn: "Half lager, half lemonade — the British summer long drink.",
    storyNoteZh: "19 世纪英国起源，原始版本用姜汁啤酒与柠檬汽水。",
    storyNoteEn: "Originated in 19th-century Britain; the modern version pairs lager with lemonade.",
    balanceTags: ["refreshing", "easy", "highball", "low-abv"],
    ingredients: [
      { slug: "lager", amount: "120ml", isKey: true, optional: false, notesZh: "冰镇", notesEn: "chilled", order: 1 },
      { slug: "lemonade", amount: "120ml", isKey: true, optional: false, notesZh: "冰镇", notesEn: "chilled", order: 2 },
      { slug: "lemon-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 3 },
    ],
    steps: [
      { order: 1, instructionZh: "高球杯装满方冰。", instructionEn: "Fill a highball with cubed ice.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "先倒啤酒，再倒柠檬汽水（1:1）。", instructionEn: "Pour the lager, then the lemonade at 1:1.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "柠檬角或柠檬皮装饰。", instructionEn: "Garnish with a lemon wedge or peel.", duration: null, techniqueSlug: null, tipZh: null, tipEn: null },
    ],
    techniques: ["build"],
  },
  {
    slug: "bamboo",
    nameZh: "竹", nameEn: "Bamboo",
    difficulty: 2, glassType: "coupe", iceType: "none",
    descriptionZh: "等比干味美思与菲诺雪利酒的开胃酒，1890 年代横滨起源。",
    descriptionEn: "Equal parts dry vermouth and fino sherry — the elegant pre-dinner classic from 1890s Yokohama.",
    storyNoteZh: "1890 年代横滨 Grand Hotel 调酒师 Louis Eppinger 创作。",
    storyNoteEn: "Created in 1890s Yokohama by German bartender Louis Eppinger at the Grand Hotel.",
    balanceTags: ["elegant", "dry", "aperitif", "classic"],
    ingredients: [
      { slug: "dry-vermouth", amount: "45ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "fino-sherry", amount: "45ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "orange-bitters", amount: "2 dashes", isKey: false, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "angostura", amount: "2 dashes", isKey: false, optional: false, notesZh: null, notesEn: null, order: 4 },
      { slug: "lemon-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "搅拌杯加干味美思、菲诺雪利酒与两种苦精。", instructionEn: "Combine dry vermouth, fino sherry and both bitters in a mixing glass.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰搅和 30 秒。", instructionEn: "Add ice and stir for 30 seconds.", duration: "30s", techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "滤入预冷马天尼杯。", instructionEn: "Strain into a chilled coupe.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "柠檬皮喷香装饰。", instructionEn: "Express lemon peel over the surface.", duration: null, techniqueSlug: "express-peel", tipZh: null, tipEn: null },
    ],
    techniques: ["stir", "express-peel"],
  },
  {
    slug: "adonis",
    nameZh: "阿多尼斯", nameEn: "Adonis",
    difficulty: 2, glassType: "coupe", iceType: "none",
    descriptionZh: "等比甜味美思与阿蒙提亚多雪利酒的开胃酒，1880 年代百老汇同名音乐剧起源。",
    descriptionEn: "Equal parts sweet vermouth and Amontillado sherry — the 1884 Broadway pre-dinner classic.",
    storyNoteZh: "1884 年百老汇同名音乐剧首演时由调酒师创作，是现存最古老的马天尼杯型开胃酒之一。",
    storyNoteEn: "Created for the 1884 Broadway premiere of the musical Adonis; one of the earliest recorded cocktail-style apéritifs.",
    balanceTags: ["elegant", "aperitif", "nutty", "classic"],
    ingredients: [
      { slug: "sweet-vermouth", amount: "45ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "amontillado-sherry", amount: "45ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "orange-bitters", amount: "2 dashes", isKey: false, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "lemon-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 4 },
    ],
    steps: [
      { order: 1, instructionZh: "搅拌杯加甜味美思、阿蒙提亚多雪利酒与橙皮苦精。", instructionEn: "Combine sweet vermouth, Amontillado sherry and orange bitters in a mixing glass.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰搅和 30 秒。", instructionEn: "Add ice and stir for 30 seconds.", duration: "30s", techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "滤入预冷马天尼杯。", instructionEn: "Strain into a chilled coupe.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "柠檬皮喷香装饰。", instructionEn: "Express lemon peel over the surface.", duration: null, techniqueSlug: "express-peel", tipZh: null, tipEn: null },
    ],
    techniques: ["stir", "express-peel"],
  },
  {
    slug: "kir",
    nameZh: "基尔酒", nameEn: "Kir",
    difficulty: 1, glassType: "wine", iceType: "none",
    descriptionZh: "干白葡萄酒与黑加仑利口酒的法国开胃酒。",
    descriptionEn: "Dry white wine and crème de cassis — the French apéritif named for the Resistance hero Canon Félix Kir.",
    storyNoteZh: "19 世纪勃艮第第戎市长 Canon Félix Kir 在二战后推广，因此酒闻名。",
    storyNoteEn: "Popularised after WWII by Canon Félix Kir, mayor of Dijon in Burgundy, as a regional signature drink.",
    balanceTags: ["refreshing", "fruity", "low-abv", "aperitif"],
    ingredients: [
      { slug: "dry-white-wine", amount: "90ml", isKey: true, optional: false, notesZh: "勃艮第白或长相思", notesEn: "Bourgogne blanc or Sauvignon Blanc", order: 1 },
      { slug: "creme-de-cassis", amount: "10ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
    ],
    steps: [
      { order: 1, instructionZh: "葡萄酒杯先倒入冰镇白葡萄酒。", instructionEn: "Pour the chilled white wine into a wine glass.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "顶部缓缓倒入黑加仑利口酒。", instructionEn: "Slowly pour the crème de cassis on top.", duration: null, techniqueSlug: "build", tipZh: "慢慢倒，形成红色底部。", tipEn: "Pour slowly to let the cassis sink to the bottom." },
    ],
    techniques: ["build"],
  },
  {
    slug: "kir-royale",
    nameZh: "皇家基尔", nameEn: "Kir Royale",
    difficulty: 1, glassType: "flute", iceType: "none",
    descriptionZh: "香槟加黑加仑利口酒的升级版 Kir Royale。",
    descriptionEn: "Champagne and crème de cassis in a flute — the sparkling French celebration aperitif.",
    storyNoteZh: "1950 年代法国上流社会流行，1960 年代与香槟一起成为庆典饮品。",
    storyNoteEn: "Emerged in 1950s French society as the Champagne upgrade of the classic Kir.",
    balanceTags: ["sparkling", "elegant", "low-abv", "classic"],
    ingredients: [
      { slug: "champagne", amount: "90ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "creme-de-cassis", amount: "10ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
    ],
    steps: [
      { order: 1, instructionZh: "笛形香槟杯先倒入冰镇香槟。", instructionEn: "Pour the chilled Champagne into a flute.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "缓缓加入黑加仑利口酒。", instructionEn: "Slowly add the crème de cassis.", duration: null, techniqueSlug: "build", tipZh: "形成红色气泡漩涡。", tipEn: "The cassis will form a red swirl as it rises." },
    ],
    techniques: ["build"],
  },
  {
    slug: "mimosa",
    nameZh: "含羞草", nameEn: "Mimosa",
    difficulty: 1, glassType: "flute", iceType: "none",
    descriptionZh: "等比香槟与橙汁的早午餐经典。",
    descriptionEn: "Equal parts Champagne and orange juice — the brunch classic that pairs bubbles with citrus.",
    storyNoteZh: "1925 年巴黎 Hotel Ritz 的 Frank Meier 创作，名字取自含羞草花的鲜艳黄色。",
    storyNoteEn: "Created in 1925 by Frank Meier at Paris's Hotel Ritz, named for the mimosa flower.",
    balanceTags: ["sparkling", "refreshing", "low-abv", "brunch"],
    ingredients: [
      { slug: "champagne", amount: "60ml", isKey: true, optional: false, notesZh: "或 Prosecco", notesEn: "or Prosecco", order: 1 },
      { slug: "orange-juice", amount: "60ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 2 },
      { slug: "orange-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 3 },
    ],
    steps: [
      { order: 1, instructionZh: "笛形香槟杯先倒入冰镇橙汁。", instructionEn: "Pour the chilled orange juice into a flute.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "顶部缓缓倒入冰镇香槟。", instructionEn: "Slowly top with chilled Champagne.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "不要搅拌，橙皮装饰。", instructionEn: "Do not stir; garnish with an orange peel.", duration: null, techniqueSlug: null, tipZh: null, tipEn: null },
    ],
    techniques: ["build"],
  },
  {
    slug: "bellini",
    nameZh: "贝里尼", nameEn: "Bellini",
    difficulty: 1, glassType: "flute", iceType: "none",
    descriptionZh: "白桃果泥与普罗赛克的威尼斯早午餐经典。",
    descriptionEn: "White peach purée and Prosecco — the Venetian brunch classic.",
    storyNoteZh: "1948 年威尼斯 Harry's Bar 调酒师 Giuseppe Cipriani 创作，名字取自画家 Giovanni Bellini 的粉红调色。",
    storyNoteEn: "Created in 1948 by Giuseppe Cipriani at Harry's Bar in Venice; named for the painter Bellini's rosy palette.",
    balanceTags: ["sparkling", "fruity", "elegant", "classic"],
    ingredients: [
      { slug: "peach-puree", amount: "20ml", isKey: true, optional: false, notesZh: "白桃", notesEn: "white peach", order: 1 },
      { slug: "prosecco", amount: "90ml", isKey: true, optional: false, notesZh: "加满", notesEn: "to top", order: 2 },
    ],
    steps: [
      { order: 1, instructionZh: "笛形香槟杯先倒入白桃果泥。", instructionEn: "Pour the white peach purée into a flute.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "缓缓加入冰镇普罗赛克至满。", instructionEn: "Slowly top with chilled Prosecco.", duration: null, techniqueSlug: "build", tipZh: "沿杯壁倒入，保持气泡。", tipEn: "Pour down the side to keep the fizz." },
      { order: 3, instructionZh: "不要搅拌，让桃泥自然形成渐变。", instructionEn: "Do not stir; let the purée form a natural gradient.", duration: null, techniqueSlug: null, tipZh: null, tipEn: null },
    ],
    techniques: ["build"],
  },
  // ───── 4. Fizzes & Collins (8) ──────────────────────────────────────────
  {
    slug: "gin-fizz",
    nameZh: "金菲士", nameEn: "Gin Fizz",
    difficulty: 2, glassType: "highball", iceType: "cubed",
    descriptionZh: "金酒、柠檬、糖与苏打水的高杯菲士，是 19 世纪后期美国经典。",
    descriptionEn: "Gin, lemon, sugar and soda — the highball Fizz that defined 19th-century American drinking.",
    storyNoteZh: "1880 年代新奥尔良起源，是 Ramos Gin Fizz 的祖先之一。",
    storyNoteEn: "Originated in 1880s New Orleans; the parent of the Ramos Gin Fizz and countless sours.",
    balanceTags: ["refreshing", "citrus", "highball", "classic"],
    ingredients: [
      { slug: "gin", amount: "45ml", isKey: true, optional: false, notesZh: "Old Tom 更经典", notesEn: "Old Tom classic", order: 1 },
      { slug: "lemon-juice", amount: "30ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 2 },
      { slug: "simple-syrup", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "soda-water", amount: "60ml", isKey: false, optional: false, notesZh: "顶部加注", notesEn: "to top", order: 4 },
      { slug: "lemon-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶加金酒、柠檬汁与单糖浆。", instructionEn: "Add gin, lemon juice and simple syrup to a shaker.", duration: null, techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰摇和 10 秒。", instructionEn: "Fill with ice and shake for 10 seconds.", duration: "10s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "双重过滤入装有方冰的高球杯。", instructionEn: "Double-strain into a highball with cubed ice.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "顶部加苏打水。", instructionEn: "Top with soda water.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 5, instructionZh: "吧匙轻搅 1 次，柠檬皮装饰。", instructionEn: "Stir once; garnish with a lemon peel.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
    ],
    techniques: ["shake", "double-strain", "build"],
  },
  {
    slug: "silver-fizz",
    nameZh: "银菲士", nameEn: "Silver Fizz",
    difficulty: 3, glassType: "highball", iceType: "cubed",
    descriptionZh: "Gin Fizz 加蛋清的绵密顶部版本。",
    descriptionEn: "The Gin Fizz with added egg white for a silky, mousse-like cap.",
    storyNoteZh: "1880 年代新奥尔良 Gin Fizz 家族的绵密分支，名字取自银白泡沫顶部。",
    storyNoteEn: "An 1880s New Orleans offshoot of the Gin Fizz, named for the white cap of egg-white foam.",
    balanceTags: ["refreshing", "foamy", "highball", "classic"],
    ingredients: [
      { slug: "gin", amount: "45ml", isKey: true, optional: false, notesZh: "Old Tom", notesEn: "Old Tom", order: 1 },
      { slug: "lemon-juice", amount: "30ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 2 },
      { slug: "simple-syrup", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "egg-white", amount: "1 piece", isKey: false, optional: false, notesZh: "干湿双摇", notesEn: "dry + wet shake", order: 4 },
      { slug: "soda-water", amount: "60ml", isKey: false, optional: false, notesZh: "顶部加注", notesEn: "to top", order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶加金酒、柠檬汁、单糖浆与蛋清（无冰）。", instructionEn: "Add gin, lemon juice, simple syrup and egg white to a shaker (no ice).", duration: null, techniqueSlug: "dry-shake", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "干摇 15 秒。", instructionEn: "Dry-shake for 15 seconds.", duration: "15s", techniqueSlug: "dry-shake", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "加冰再摇 10-12 秒。", instructionEn: "Add ice and wet-shake for 10-12 seconds.", duration: "12s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "双重过滤入装有方冰的高球杯。", instructionEn: "Double-strain into a highball with cubed ice.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
      { order: 5, instructionZh: "顶部加苏打水，让泡沫溢出顶部。", instructionEn: "Top with soda; let the foam rise to the rim.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
    ],
    techniques: ["dry-shake", "shake", "double-strain", "build"],
  },
  {
    slug: "golden-fizz",
    nameZh: "金菲士", nameEn: "Golden Fizz",
    difficulty: 3, glassType: "highball", iceType: "cubed",
    descriptionZh: "Gin Fizz 加蛋黄的金色绵密版本。",
    descriptionEn: "The Gin Fizz with egg yolk for a richer, golden-bodied, more substantial cap.",
    storyNoteZh: "1880 年代新奥尔良 Gin Fizz 家族的金色分支。",
    storyNoteEn: "An 1880s New Orleans sibling of the Silver Fizz, but with yolk instead of white for body.",
    balanceTags: ["refreshing", "rich", "highball", "classic"],
    ingredients: [
      { slug: "gin", amount: "45ml", isKey: true, optional: false, notesZh: "Old Tom", notesEn: "Old Tom", order: 1 },
      { slug: "lemon-juice", amount: "30ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 2 },
      { slug: "simple-syrup", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "egg-yolk", amount: "1 piece", isKey: false, optional: false, notesZh: "干湿双摇", notesEn: "dry + wet shake", order: 4 },
      { slug: "soda-water", amount: "60ml", isKey: false, optional: false, notesZh: "顶部加注", notesEn: "to top", order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶加金酒、柠檬汁、单糖浆与蛋黄（无冰）。", instructionEn: "Add gin, lemon juice, simple syrup and egg yolk to a shaker (no ice).", duration: null, techniqueSlug: "dry-shake", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "干摇 20 秒。", instructionEn: "Dry-shake for 20 seconds.", duration: "20s", techniqueSlug: "dry-shake", tipZh: "蛋黄比蛋清乳化慢，需要更长干摇。", tipEn: "Yolk needs longer to emulsify than white." },
      { order: 3, instructionZh: "加冰再摇 15 秒。", instructionEn: "Add ice and wet-shake for 15 seconds.", duration: "15s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "双重过滤入装有方冰的高球杯。", instructionEn: "Double-strain into a highball with cubed ice.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
      { order: 5, instructionZh: "顶部加苏打水，吧匙轻搅。", instructionEn: "Top with soda; stir once.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
    ],
    techniques: ["dry-shake", "shake", "double-strain", "build"],
  },
  {
    slug: "john-collins",
    nameZh: "约翰·柯林斯", nameEn: "John Collins",
    difficulty: 2, glassType: "highball", iceType: "cubed",
    descriptionZh: "波本（或 Old Tom 金酒）、柠檬、糖与苏打水的 Tom Collins 原版。",
    descriptionEn: "Bourbon (or Old Tom gin), lemon, sugar and soda — the original Collins from 1870s New York.",
    storyNoteZh: "1870 年代纽约调酒师 John Collins 在 Limmer's Hotel 创作的原始版本，原本用荷式金酒。",
    storyNoteEn: "Created in 1870s New York at Limmer's Hotel by John Collins, originally with Holland gin before Tom Collins took over.",
    balanceTags: ["refreshing", "citrus", "highball", "classic"],
    ingredients: [
      { slug: "bourbon", amount: "45ml", isKey: true, optional: false, notesZh: "或 Old Tom 金酒", notesEn: "or Old Tom gin", order: 1 },
      { slug: "lemon-juice", amount: "30ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 2 },
      { slug: "simple-syrup", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "soda-water", amount: "60ml", isKey: false, optional: false, notesZh: "顶部加注", notesEn: "to top", order: 4 },
      { slug: "maraschino-cherry", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 5 },
      { slug: "orange-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 6 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶加波本、柠檬汁与单糖浆。", instructionEn: "Add bourbon, lemon juice and simple syrup to a shaker.", duration: null, techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰摇和 10 秒。", instructionEn: "Fill with ice and shake for 10 seconds.", duration: "10s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "双重过滤入装有方冰的高球杯。", instructionEn: "Double-strain into a highball with cubed ice.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "顶部加苏打水，樱桃与橙片装饰。", instructionEn: "Top with soda; garnish with a cherry and orange slice.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
    ],
    techniques: ["shake", "double-strain", "build"],
  },
  {
    slug: "peach-tree",
    nameZh: "桃树", nameEn: "Peach Tree",
    difficulty: 2, glassType: "highball", iceType: "cubed",
    descriptionZh: "金酒、桃子利口酒、柠檬与石榴糖浆的果味菲士。",
    descriptionEn: "Gin, peach liqueur, lemon and a dash of grenadine — the pink highball fizz.",
    storyNoteZh: "20 世纪中期的美式版本，桃子利口酒让经典 Gin Fizz 变成桃味。",
    storyNoteEn: "A mid-20th-century American peach-garnished twist on the Gin Fizz.",
    balanceTags: ["refreshing", "fruity", "highball", "classic"],
    ingredients: [
      { slug: "gin", amount: "45ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "peach-liqueur", amount: "22.5ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "lemon-juice", amount: "22.5ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 3 },
      { slug: "grenadine", amount: "7.5ml", isKey: false, optional: false, notesZh: "约 1 tsp", notesEn: "~1 tsp", order: 4 },
      { slug: "soda-water", amount: "60ml", isKey: false, optional: false, notesZh: "顶部加注", notesEn: "to top", order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶加金酒、桃子利口酒、柠檬汁与石榴糖浆。", instructionEn: "Add gin, peach liqueur, lemon juice and grenadine to a shaker.", duration: null, techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰摇和 10 秒。", instructionEn: "Fill with ice and shake for 10 seconds.", duration: "10s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "双重过滤入装有方冰的高球杯。", instructionEn: "Double-strain into a highball with cubed ice.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "顶部加苏打水，吧匙轻搅 1 次。", instructionEn: "Top with soda; stir once.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
    ],
    techniques: ["shake", "double-strain", "build"],
  },
  {
    slug: "pink-gin",
    nameZh: "粉红金酒", nameEn: "Pink Gin",
    difficulty: 1, glassType: "coupe", iceType: "none",
    descriptionZh: "金酒与安格斯特拉的极简粉红染色苦精酒，英国皇家海军传统。",
    descriptionEn: "Gin and Angostura — the Royal Navy's pre-dinner pink, just two ingredients in a glass.",
    storyNoteZh: "19 世纪英国皇家海军医官 Gordon's 推广，灵感来自热带地区给药用的苦精水。",
    storyNoteEn: "A 19th-century Royal Navy tradition; the magenta hue comes from Angostura's dye diluting in gin.",
    balanceTags: ["spirit-forward", "bitter", "classic", "historic"],
    ingredients: [
      { slug: "gin", amount: "60ml", isKey: true, optional: false, notesZh: "Plymouth 经典", notesEn: "Plymouth classic", order: 1 },
      { slug: "angostura", amount: "3 dashes", isKey: true, optional: false, notesZh: "在杯中直接用苦精洗内壁", notesEn: "swirl dashes to coat the glass", order: 2 },
    ],
    steps: [
      { order: 1, instructionZh: "马天尼杯倒入 3 dashes 安格斯特拉，转动杯身让苦精挂壁。", instructionEn: "Add 3 dashes Angostura to a chilled coupe; swirl to coat the inside.", duration: null, techniqueSlug: null, tipZh: null, tipEn: null },
      { order: 2, instructionZh: "倒入冰镇金酒。", instructionEn: "Pour in the chilled gin.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "不搅拌，柠檬皮装饰（可选）。", instructionEn: "Do not stir; garnish with lemon peel (optional).", duration: null, techniqueSlug: null, tipZh: "不搅是英国海军传统。", tipEn: "Not stirring is the British naval tradition." },
    ],
    techniques: ["build"],
  },
  {
    slug: "gin-sling",
    nameZh: "金酒司令", nameEn: "Gin Sling",
    difficulty: 2, glassType: "highball", iceType: "cubed",
    descriptionZh: "金酒、柠檬、糖与苏打水的 19 世纪美式 Sling 长饮。",
    descriptionEn: "Gin, lemon, sugar and soda — the 19th-century American long sling that predates the Tom Collins.",
    storyNoteZh: "19 世纪初美国流行的「Sling」长饮之一，是 Tom Collins 的直系祖先。",
    storyNoteEn: "A 19th-century American sling that is the direct ancestor of the Tom Collins.",
    balanceTags: ["refreshing", "citrus", "highball", "classic"],
    ingredients: [
      { slug: "gin", amount: "45ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "lemon-juice", amount: "22.5ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 2 },
      { slug: "simple-syrup", amount: "7.5ml", isKey: true, optional: false, notesZh: "约 1 tsp", notesEn: "~1 tsp", order: 3 },
      { slug: "soda-water", amount: "90ml", isKey: false, optional: false, notesZh: "加满", notesEn: "to top", order: 4 },
      { slug: "angostura", amount: "1 dash", isKey: false, optional: false, notesZh: "可选", notesEn: "optional", order: 5 },
      { slug: "maraschino-cherry", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 6 },
    ],
    steps: [
      { order: 1, instructionZh: "高球杯装满方冰。", instructionEn: "Fill a highball with cubed ice.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加入金酒、柠檬汁与单糖浆。", instructionEn: "Pour the gin, lemon juice and simple syrup over the ice.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "顶部加满冰镇苏打水，1 dash 安格斯特拉（可选）。", instructionEn: "Top with chilled soda and 1 dash Angostura (optional).", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "吧匙轻搅 1 次，樱桃装饰。", instructionEn: "Stir once; garnish with a cherry.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
    ],
    techniques: ["build"],
  },
  {
    slug: "peach-blossom",
    nameZh: "桃花", nameEn: "Peach Blossom",
    difficulty: 3, glassType: "coupe", iceType: "none",
    descriptionZh: "金酒、桃子利口酒、奶油、柠檬与石榴糖浆的粉色酸酒。",
    descriptionEn: "Gin, peach liqueur, cream, lemon and grenadine — the pink creamy sloe-cousin sour.",
    storyNoteZh: "20 世纪初巴黎与纽约的果味酸酒，与 Clover Club 同期流行。",
    storyNoteEn: "An early 20th-century pink sour, served at Paris and New York in the same era as the Clover Club.",
    balanceTags: ["sour", "creamy", "fruity", "classic"],
    ingredients: [
      { slug: "gin", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "peach-liqueur", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "lemon-juice", amount: "22.5ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 3 },
      { slug: "grenadine", amount: "7.5ml", isKey: false, optional: false, notesZh: "约 1 tsp", notesEn: "~1 tsp", order: 4 },
      { slug: "heavy-cream", amount: "15ml", isKey: false, optional: false, notesZh: null, notesEn: null, order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶加金酒、桃子利口酒、柠檬汁、石榴糖浆与奶油（无冰）。", instructionEn: "Add gin, peach liqueur, lemon juice, grenadine and cream to a shaker (no ice).", duration: null, techniqueSlug: "dry-shake", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "干摇 15 秒。", instructionEn: "Dry-shake for 15 seconds.", duration: "15s", techniqueSlug: "dry-shake", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "加冰再摇 10-12 秒。", instructionEn: "Add ice and wet-shake for 10-12 seconds.", duration: "12s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "双重过滤入预冷马天尼杯。", instructionEn: "Double-strain into a chilled coupe.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
    ],
    techniques: ["dry-shake", "shake", "double-strain"],
  },
  // ───── 5. Tiki & Showpiece (10) ──────────────────────────────────────────
  {
    slug: "suffering-bar-bastard",
    nameZh: "酒吧混蛋的受难日", nameEn: "Suffering Bar Bastard",
    difficulty: 3, glassType: "highball", iceType: "cubed",
    descriptionZh: "波本、白兰地、青柠与姜汁啤酒的浓郁加长版受苦混蛋。",
    descriptionEn: "Bourbon, brandy, lime and ginger beer — the extra-strength sibling of the Suffering Bastard.",
    storyNoteZh: "1942 年开罗 Shepheard's Hotel 调酒师 Joe Scialom 创作的 Suffering Bastard 的浓缩版本。",
    storyNoteEn: "A stronger 1942 sibling of the Suffering Bastard, also born at Cairo's Shepheard's Hotel.",
    balanceTags: ["refreshing", "spicy", "highball", "historic"],
    ingredients: [
      { slug: "bourbon", amount: "22.5ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "cognac", amount: "22.5ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "lime-juice", amount: "15ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 3 },
      { slug: "angostura", amount: "1 dash", isKey: false, optional: false, notesZh: null, notesEn: null, order: 4 },
      { slug: "ginger-beer", amount: "90ml", isKey: true, optional: false, notesZh: "加满", notesEn: "to top", order: 5 },
      { slug: "mint-sprig", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 6 },
    ],
    steps: [
      { order: 1, instructionZh: "高球杯装满方冰。", instructionEn: "Fill a highball with cubed ice.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加入波本、白兰地、青柠汁与安格斯特拉。", instructionEn: "Add bourbon, brandy, lime juice and Angostura.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "顶部加满冰镇姜汁啤酒。", instructionEn: "Top with chilled ginger beer.", duration: null, techniqueSlug: "build", tipZh: "沿杯壁倒入，保留气泡。", tipEn: "Pour down the side to keep carbonation." },
      { order: 4, instructionZh: "吧匙轻搅 1 次，薄荷装饰。", instructionEn: "Stir once; garnish with a mint sprig.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
    ],
    techniques: ["build"],
  },
  {
    slug: "three-dots-and-a-dash",
    nameZh: "三点与一划", nameEn: "Three Dots and a Dash",
    difficulty: 4, glassType: "tiki", iceType: "crushed",
    descriptionZh: "陈年朗姆、青柠、falernum、蜂蜜与多香果的 1945 年唐恩海滩 tiki 经典。",
    descriptionEn: "Aged rum, lime, falernum, honey and allspice — the 1945 Donn Beach tiki Morse-code classic.",
    storyNoteZh: "1945 年 Don the Beachcomber 餐厅调酒师 Donn Beach 创作，名字「··· —」是莫尔斯电码的「V」，代表胜利。",
    storyNoteEn: "Created in 1945 by Donn Beach at Don the Beachcomber; 'three dots and a dash' is Morse code for V (Victory).",
    balanceTags: ["tropical", "spice", "tiki", "complex"],
    ingredients: [
      { slug: "aged-rum", amount: "30ml", isKey: true, optional: false, notesZh: "牙买加陈年", notesEn: "aged Jamaican", order: 1 },
      { slug: "lime-juice", amount: "22.5ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 2 },
      { slug: "falernum", amount: "7.5ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "honey-syrup", amount: "7.5ml", isKey: true, optional: false, notesZh: "1:1 蜂蜜水", notesEn: "1:1 honey-water", order: 4 },
      { slug: "allspice-drambuie", amount: "7.5ml", isKey: true, optional: false, notesZh: "约 1 tsp", notesEn: "~1 tsp", order: 5 },
      { slug: "angostura", amount: "1 dash", isKey: false, optional: false, notesZh: null, notesEn: null, order: 6 },
      { slug: "mint-sprig", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 7 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶加陈年朗姆、青柠汁、falernum、蜂蜜糖浆与多香果利口酒。", instructionEn: "Add aged rum, lime juice, falernum, honey syrup and allspice dram to a shaker.", duration: null, techniqueSlug: "flash-blend", tipZh: "传统做法用高速搅拌。", tipEn: "Traditionally made with a flash blend." },
      { order: 2, instructionZh: "加 1 杯碎冰，高速搅拌 5-6 秒至顺滑。", instructionEn: "Add 1 cup crushed ice and flash-blend for 5-6 seconds.", duration: "6s", techniqueSlug: "flash-blend", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "倒入装满碎冰的 tiki 杯。", instructionEn: "Pour into a tiki mug packed with crushed ice.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "滴 1 dash 安格斯特拉在装饰上方，薄荷装饰。", instructionEn: "Dot 1 dash Angostura on top; garnish with a mint sprig.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
    ],
    techniques: ["flash-blend", "build"],
  },
  {
    slug: "jet-pilot",
    nameZh: "喷气机飞行员", nameEn: "Jet Pilot",
    difficulty: 4, glassType: "tiki", iceType: "crushed",
    descriptionZh: "黑朗姆、falernum、葡萄柚与多香果的 Donn Beach 招牌 tiki。",
    descriptionEn: "Dark rum, falernum, grapefruit and allspice — Donn Beach's spice-forward tiki standard.",
    storyNoteZh: "Don the Beachcomber 1940 年代调酒师 Donn Beach 创作。",
    storyNoteEn: "Created in the 1940s at Don the Beachcomber by Donn Beach; a spice-forward cousin of the Three Dots.",
    balanceTags: ["tropical", "spice", "tiki", "complex"],
    ingredients: [
      { slug: "dark-rum", amount: "30ml", isKey: true, optional: false, notesZh: "Jamaican", notesEn: "Jamaican", order: 1 },
      { slug: "falernum", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "grapefruit-juice", amount: "15ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 3 },
      { slug: "lime-juice", amount: "15ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 4 },
      { slug: "cinnamon-syrup", amount: "7.5ml", isKey: true, optional: false, notesZh: "约 1 tsp", notesEn: "~1 tsp", order: 5 },
      { slug: "allspice-drambuie", amount: "1 tsp", isKey: false, optional: false, notesZh: null, notesEn: null, order: 6 },
      { slug: "absinthe", amount: "1 dash", isKey: false, optional: false, notesZh: "约 1 dash", notesEn: "~1 dash", order: 7 },
      { slug: "angostura", amount: "1 dash", isKey: false, optional: false, notesZh: null, notesEn: null, order: 8 },
    ],
    steps: [
      { order: 1, instructionZh: "高速搅拌机加黑朗姆、falernum、葡萄柚汁、青柠汁、肉桂糖浆与多香果利口酒。", instructionEn: "Add dark rum, falernum, grapefruit, lime, cinnamon syrup and allspice dram to a blender.", duration: null, techniqueSlug: "flash-blend", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加 1 杯碎冰，高速搅拌 5-6 秒至完全顺滑。", instructionEn: "Add 1 cup crushed ice and flash-blend for 5-6 seconds.", duration: "6s", techniqueSlug: "flash-blend", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "倒入装满碎冰的 tiki 杯。", instructionEn: "Pour into a tiki mug packed with crushed ice.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "滴 1 dash 苦艾酒与 1 dash 安格斯特拉装饰。", instructionEn: "Float 1 dash absinthe and 1 dash Angostura on top.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
    ],
    techniques: ["flash-blend", "build"],
  },
  {
    slug: "saturn",
    nameZh: "土星", nameEn: "Saturn",
    difficulty: 4, glassType: "tiki", iceType: "crushed",
    descriptionZh: "金酒、falernum、百香果、柠檬与杏仁糖浆的土星环状 tiki。",
    descriptionEn: "Gin, falernum, passion fruit, lemon and orgeat — the ringed tiki classic.",
    storyNoteZh: "1960 年代加州 Trader Vic 调酒师 J. Pop Skinner 创作，灵感来自土星环。",
    storyNoteEn: "Created in the 1960s at Trader Vic's by J. Pop Skinner, inspired by the planet Saturn's rings.",
    balanceTags: ["tropical", "nutty", "tiki", "complex"],
    ingredients: [
      { slug: "gin", amount: "22.5ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "falernum", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "passion-fruit-syrup", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "lemon-juice", amount: "22.5ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 4 },
      { slug: "orgeat", amount: "7.5ml", isKey: true, optional: false, notesZh: "约 1 tsp", notesEn: "~1 tsp", order: 5 },
      { slug: "lemon-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 6 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶加金酒、falernum、百香果糖浆、柠檬汁与杏仁糖浆。", instructionEn: "Add gin, falernum, passion fruit syrup, lemon juice and orgeat to a shaker.", duration: null, techniqueSlug: "flash-blend", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加 1 杯碎冰，高速搅拌 5-6 秒至顺滑。", instructionEn: "Add 1 cup crushed ice and flash-blend for 5-6 seconds.", duration: "6s", techniqueSlug: "flash-blend", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "倒入装满碎冰的 tiki 杯。", instructionEn: "Pour into a tiki mug packed with crushed ice.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "柠檬皮环装饰。", instructionEn: "Garnish with a lemon peel ring.", duration: null, techniqueSlug: "express-peel", tipZh: null, tipEn: null },
    ],
    techniques: ["flash-blend", "build", "express-peel"],
  },
  {
    slug: "navy-grog",
    nameZh: "海军格罗格", nameEn: "Navy Grog",
    difficulty: 4, glassType: "tiki", iceType: "crushed",
    descriptionZh: "三种朗姆、葡萄柚、青柠与蜂蜜的 Trader Vic 经典。",
    descriptionEn: "Three rums, grapefruit, lime and honey — Trader Vic's mellowed tiki standard.",
    storyNoteZh: "1940 年代 Trader Vic 改良 18 世纪英国皇家海军格罗格酒的 tiki 版本。",
    storyNoteEn: "Trader Vic's 1940s tiki makeover of the 18th-century British Royal Navy grog ration.",
    balanceTags: ["tropical", "smooth", "tiki", "complex"],
    ingredients: [
      { slug: "aged-rum", amount: "30ml", isKey: true, optional: false, notesZh: "牙买加陈年", notesEn: "aged Jamaican", order: 1 },
      { slug: "white-rum", amount: "22.5ml", isKey: true, optional: false, notesZh: "Puerto Rican", notesEn: "Puerto Rican", order: 2 },
      { slug: "dark-rum", amount: "22.5ml", isKey: true, optional: false, notesZh: "Demerara 151", notesEn: "Demerara 151", order: 3 },
      { slug: "grapefruit-juice", amount: "30ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 4 },
      { slug: "lime-juice", amount: "22.5ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 5 },
      { slug: "honey-syrup", amount: "22.5ml", isKey: true, optional: false, notesZh: "1:1 蜂蜜水", notesEn: "1:1 honey-water", order: 6 },
      { slug: "club-soda", amount: "30ml", isKey: false, optional: false, notesZh: "顶部加注", notesEn: "to top", order: 7 },
    ],
    steps: [
      { order: 1, instructionZh: "高速搅拌机加三种朗姆、葡萄柚汁、青柠汁与蜂蜜糖浆。", instructionEn: "Add all three rums, grapefruit, lime and honey syrup to a blender.", duration: null, techniqueSlug: "flash-blend", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加 1 杯碎冰，高速搅拌 5-6 秒。", instructionEn: "Add 1 cup crushed ice and flash-blend for 5-6 seconds.", duration: "6s", techniqueSlug: "flash-blend", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "倒入装满碎冰的 tiki 杯。", instructionEn: "Pour into a tiki mug packed with crushed ice.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "顶部加少量苏打水。", instructionEn: "Top with a splash of soda.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
    ],
    techniques: ["flash-blend", "build"],
  },
  {
    slug: "port-royal",
    nameZh: "皇家港", nameEn: "Port Royal",
    difficulty: 3, glassType: "tiki", iceType: "crushed",
    descriptionZh: "黑朗姆、falernum、葡萄柚与安格斯特拉的中等复杂度 tiki。",
    descriptionEn: "Dark rum, falernum, grapefruit and Angostura — Trader Vic's medium-bodied tiki.",
    storyNoteZh: "Trader Vic 1950 年代作品，名字取自牙买加皇家港。",
    storyNoteEn: "A 1950s Trader Vic original named after the Jamaican port capital of piracy.",
    balanceTags: ["tropical", "spice", "tiki", "balanced"],
    ingredients: [
      { slug: "dark-rum", amount: "30ml", isKey: true, optional: false, notesZh: "Jamaican", notesEn: "Jamaican", order: 1 },
      { slug: "falernum", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "grapefruit-juice", amount: "30ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 3 },
      { slug: "lime-juice", amount: "22.5ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 4 },
      { slug: "grenadine", amount: "7.5ml", isKey: false, optional: false, notesZh: "约 1 tsp", notesEn: "~1 tsp", order: 5 },
      { slug: "angostura", amount: "2 dashes", isKey: false, optional: false, notesZh: null, notesEn: null, order: 6 },
      { slug: "mint-sprig", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 7 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶加黑朗姆、falernum、葡萄柚汁、青柠汁与石榴糖浆。", instructionEn: "Add dark rum, falernum, grapefruit, lime and grenadine to a shaker.", duration: null, techniqueSlug: "flash-blend", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加 1 杯碎冰，高速搅拌 5 秒。", instructionEn: "Add 1 cup crushed ice and flash-blend for 5 seconds.", duration: "5s", techniqueSlug: "flash-blend", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "倒入装满碎冰的 tiki 杯。", instructionEn: "Pour into a tiki mug packed with crushed ice.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "2 dashes 安格斯特拉装饰，薄荷枝点缀。", instructionEn: "Dash Angostura on top; garnish with a mint sprig.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
    ],
    techniques: ["flash-blend", "build"],
  },
  {
    slug: "fog-cutter",
    nameZh: "破雾者", nameEn: "Fog Cutter",
    difficulty: 4, glassType: "tiki", iceType: "crushed",
    descriptionZh: "白朗姆、金酒、白兰地、雪利酒、橙汁、柠檬与杏仁糖浆的 Trader Vic 顶点。",
    descriptionEn: "Light rum, gin, brandy, sherry, orange, lemon and orgeat — Trader Vic's tiki showpiece.",
    storyNoteZh: "1940 年代 Trader Vic 创作，「清除迷雾」是 tiki 鸡尾酒中酒精度最高的之一。",
    storyNoteEn: "Created in the 1940s at Trader Vic's; one of the strongest tiki cocktails, said to 'cut through any fog'.",
    balanceTags: ["tropical", "strong", "tiki", "showpiece"],
    ingredients: [
      { slug: "white-rum", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "gin", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "cognac", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "orange-juice", amount: "30ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 4 },
      { slug: "lemon-juice", amount: "22.5ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 5 },
      { slug: "orgeat", amount: "7.5ml", isKey: true, optional: false, notesZh: "约 1 tsp", notesEn: "~1 tsp", order: 6 },
      { slug: "amontillado-sherry", amount: "15ml", isKey: false, optional: false, notesZh: "顶部浮酒", notesEn: "float on top", order: 7 },
    ],
    steps: [
      { order: 1, instructionZh: "高速搅拌机加白朗姆、金酒、白兰地、橙汁、柠檬汁与杏仁糖浆。", instructionEn: "Add white rum, gin, brandy, orange, lemon and orgeat to a blender.", duration: null, techniqueSlug: "flash-blend", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加 1 杯碎冰，高速搅拌 6 秒。", instructionEn: "Add 1 cup crushed ice and flash-blend for 6 seconds.", duration: "6s", techniqueSlug: "flash-blend", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "倒入装满碎冰的 tiki 或 highball 杯。", instructionEn: "Pour into a tiki or highball glass packed with crushed ice.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "顶部缓慢浮上 15ml 阿蒙提亚多雪利酒。", instructionEn: "Slowly float 15ml Amontillado sherry on top.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
    ],
    techniques: ["flash-blend", "build"],
  },
  {
    slug: "blue-hawaiian",
    nameZh: "蓝色夏威夷", nameEn: "Blue Hawaiian",
    difficulty: 2, glassType: "highball", iceType: "crushed",
    descriptionZh: "白朗姆、蓝橙皮酒、菠萝与椰子奶油的热带蓝色高球。",
    descriptionEn: "White rum, Blue Curaçao, pineapple and coconut cream — the tropical blue tiki highball.",
    storyNoteZh: "1957 年好莱坞 Hilton 餐厅调酒师 Harry Yee 创作，因蓝色对比菠萝黄而成名。",
    storyNoteEn: "Created in 1957 at the Hollywood Hilton by Harry Yee, originally designed to match the blue of the Pacific.",
    balanceTags: ["tropical", "creamy", "tiki", "showpiece"],
    ingredients: [
      { slug: "white-rum", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "blue-curacao", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "pineapple-juice", amount: "60ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 3 },
      { slug: "coconut-cream", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 4 },
      { slug: "maraschino-cherry", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "高速搅拌机加白朗姆、蓝橙皮酒、菠萝汁与椰子奶油。", instructionEn: "Add white rum, Blue Curaçao, pineapple juice and coconut cream to a blender.", duration: null, techniqueSlug: "flash-blend", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加 1 杯碎冰，高速搅拌 5-6 秒。", instructionEn: "Add 1 cup crushed ice and flash-blend for 5-6 seconds.", duration: "6s", techniqueSlug: "flash-blend", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "倒入装满碎冰的 hurricane 或 highball 杯。", instructionEn: "Pour into a hurricane or highball glass packed with crushed ice.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "菠萝片与樱桃装饰。", instructionEn: "Garnish with a pineapple wedge and a cherry.", duration: null, techniqueSlug: null, tipZh: null, tipEn: null },
    ],
    techniques: ["flash-blend", "build"],
  },
  {
    slug: "shrunken-skull",
    nameZh: "缩头鬼", nameEn: "Shrunken Skull",
    difficulty: 3, glassType: "tiki", iceType: "crushed",
    descriptionZh: "黑与白朗姆、falernum、多香果与石榴糖浆的多层次 Donn Beach tiki。",
    descriptionEn: "Dark and white rum, falernum, allspice and grenadine — the tiki shrunken-head classic.",
    storyNoteZh: "Don the Beachcomber 餐厅 1930 年代调酒师 Donn Beach 创作。",
    storyNoteEn: "Originated in 1930s Hollywood at Don the Beachcomber; one of Donn Beach's most spice-heavy recipes.",
    balanceTags: ["tropical", "spice", "tiki", "complex"],
    ingredients: [
      { slug: "dark-rum", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "white-rum", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "falernum", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "allspice-drambuie", amount: "7.5ml", isKey: true, optional: false, notesZh: "约 1 tsp", notesEn: "~1 tsp", order: 4 },
      { slug: "grenadine", amount: "7.5ml", isKey: false, optional: false, notesZh: "约 1 tsp", notesEn: "~1 tsp", order: 5 },
      { slug: "lime-juice", amount: "15ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 6 },
      { slug: "mint-sprig", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 7 },
    ],
    steps: [
      { order: 1, instructionZh: "高速搅拌机加两种朗姆、falernum、多香果利口酒、石榴糖浆与青柠汁。", instructionEn: "Add both rums, falernum, allspice dram, grenadine and lime juice to a blender.", duration: null, techniqueSlug: "flash-blend", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加 1 杯碎冰，高速搅拌 6 秒。", instructionEn: "Add 1 cup crushed ice and flash-blend for 6 seconds.", duration: "6s", techniqueSlug: "flash-blend", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "倒入装满碎冰的 tiki 杯。", instructionEn: "Pour into a tiki mug packed with crushed ice.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "薄荷与樱桃装饰。", instructionEn: "Garnish with mint and a cherry.", duration: null, techniqueSlug: null, tipZh: null, tipEn: null },
    ],
    techniques: ["flash-blend", "build"],
  },
  {
    slug: "pina-colada",
    nameZh: "椰林飘香", nameEn: "Piña Colada",
    difficulty: 2, glassType: "hurricane", iceType: "crushed",
    descriptionZh: "白朗姆、菠萝汁与椰子奶油的波多黎各国饮。",
    descriptionEn: "White rum, pineapple juice and coconut cream — Puerto Rico's national cocktail.",
    storyNoteZh: '1954 年波多黎各 San Juan Caribe Hilton 调酒师 Ramón "Monchito" Marrero 创作，1978 年定为波多黎各国饮。',
    storyNoteEn: "Created in 1954 by Ramón 'Monchito' Marrero at San Juan's Caribe Hilton; declared Puerto Rico's national drink in 1978.",
    balanceTags: ["tropical", "creamy", "tiki", "classic"],
    ingredients: [
      { slug: "white-rum", amount: "60ml", isKey: true, optional: false, notesZh: "Puerto Rican", notesEn: "Puerto Rican", order: 1 },
      { slug: "pineapple-juice", amount: "90ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 2 },
      { slug: "coconut-cream", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "lime-juice", amount: "15ml", isKey: false, optional: true, notesZh: "可选", notesEn: "optional", order: 4 },
    ],
    steps: [
      { order: 1, instructionZh: "高速搅拌机加白朗姆、菠萝汁与椰子奶油。", instructionEn: "Add white rum, pineapple juice and coconut cream to a blender.", duration: null, techniqueSlug: "flash-blend", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加 1 杯碎冰，高速搅拌 6-8 秒至完全绵密。", instructionEn: "Add 1 cup crushed ice and flash-blend for 6-8 seconds until thick and smooth.", duration: "8s", techniqueSlug: "flash-blend", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "倒入装满碎冰的 hurricane 杯。", instructionEn: "Pour into a hurricane glass packed with crushed ice.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "菠萝片与樱桃装饰。", instructionEn: "Garnish with a pineapple wedge and a cherry.", duration: null, techniqueSlug: null, tipZh: null, tipEn: null },
    ],
    techniques: ["flash-blend", "build"],
  },
  // ───── 6. Smashes & Juleps (6) ──────────────────────────────────────────
  {
    slug: "whiskey-smash",
    nameZh: "威士忌碎冰", nameEn: "Whiskey Smash",
    difficulty: 2, glassType: "rocks", iceType: "large",
    descriptionZh: "波本、柠檬、薄荷与单糖浆的清爽酸酒版 Julep。",
    descriptionEn: "Bourbon, lemon, mint and simple syrup — the citrusy cousin of the Mint Julep.",
    storyNoteZh: "Jerry Thomas 1862 年《Bartender's Guide》首载的 19 世纪柠檬薄荷酸酒。",
    storyNoteEn: "First recorded in Jerry Thomas's 1862 Bartender's Guide as a pre-Prohibition lemon-mint sour.",
    balanceTags: ["refreshing", "herbal", "citrus", "classic"],
    ingredients: [
      { slug: "bourbon", amount: "60ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "lemon-juice", amount: "22.5ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 2 },
      { slug: "simple-syrup", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "mint", amount: "4 sprigs", isKey: true, optional: false, notesZh: "轻捣", notesEn: "muddle gently", order: 4 },
      { slug: "mint-sprig", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶底放入薄荷。", instructionEn: "Place mint at the bottom of a shaker.", duration: null, techniqueSlug: "muddle", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加单糖浆轻压 3-4 次。", instructionEn: "Add the simple syrup and gently press 3-4 times.", duration: "10s", techniqueSlug: "muddle", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "加入波本与柠檬汁，加冰摇和 8-10 秒。", instructionEn: "Add bourbon and lemon juice; fill with ice and shake for 8-10 seconds.", duration: "10s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "双重过滤入装有冰球的 rocks 杯。", instructionEn: "Double-strain into a rocks glass with a large ice cube.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
      { order: 5, instructionZh: "拍打过的薄荷枝装饰。", instructionEn: "Garnish with a slapped mint sprig.", duration: null, techniqueSlug: null, tipZh: null, tipEn: null },
    ],
    techniques: ["muddle", "shake", "double-strain"],
  },
  {
    slug: "peach-julep",
    nameZh: "桃子朱利", nameEn: "Peach Julep",
    difficulty: 2, glassType: "julep", iceType: "crushed",
    descriptionZh: "波本、桃子、薄荷与单糖浆的南方 Julep 变奏。",
    descriptionEn: "Bourbon, fresh peach, mint and simple syrup — the Southern Julep's stone-fruit cousin.",
    storyNoteZh: "19 世纪美国南方 Peach Belt 农场的夏日经典。",
    storyNoteEn: "A 19th-century Southern classic from the American peach belt, served in silver julep cups.",
    balanceTags: ["refreshing", "fruity", "herbal", "classic"],
    ingredients: [
      { slug: "bourbon", amount: "60ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "peach-liqueur", amount: "15ml", isKey: true, optional: false, notesZh: "或鲜桃切片", notesEn: "or fresh peach slices", order: 2 },
      { slug: "simple-syrup", amount: "7.5ml", isKey: true, optional: false, notesZh: "约 1 tsp", notesEn: "~1 tsp", order: 3 },
      { slug: "mint", amount: "4 sprigs", isKey: true, optional: false, notesZh: "轻拍释放香气", notesEn: "slap to release oils", order: 4 },
      { slug: "mint-sprig", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "银杯或 julep 杯中放入桃子利口酒、薄荷与单糖浆。", instructionEn: "Place peach liqueur, mint and simple syrup in a silver julep cup.", duration: null, techniqueSlug: "muddle", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "轻捣 3-4 次释放薄荷油。", instructionEn: "Gently press 3-4 times to release mint oils.", duration: "10s", techniqueSlug: "muddle", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "加入波本。", instructionEn: "Pour in the bourbon.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "加碎冰至 3/4 满，搅匀。", instructionEn: "Fill 3/4 with crushed ice and stir to combine.", duration: "15s", techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 5, instructionZh: "杯口堆起碎冰圆顶，薄荷枝装饰。", instructionEn: "Top with a crushed ice dome; garnish with a mint sprig.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
    ],
    techniques: ["muddle", "build"],
  },
  {
    slug: "gin-smash",
    nameZh: "金酒碎冰", nameEn: "Gin Smash",
    difficulty: 2, glassType: "rocks", iceType: "large",
    descriptionZh: "金酒、柠檬、薄荷与单糖浆的清爽版本。",
    descriptionEn: "Gin, lemon, mint and simple syrup — the gin sibling of the Whiskey Smash.",
    storyNoteZh: "Jerry Thomas 1862 年与 Whiskey Smash 同期首载的版本。",
    storyNoteEn: "Recorded in the same 1862 Jerry Thomas Bartender's Guide as the Whiskey Smash, but with gin.",
    balanceTags: ["refreshing", "citrus", "herbal", "classic"],
    ingredients: [
      { slug: "gin", amount: "60ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "lemon-juice", amount: "22.5ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 2 },
      { slug: "simple-syrup", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "mint", amount: "4 sprigs", isKey: true, optional: false, notesZh: "轻捣", notesEn: "muddle gently", order: 4 },
      { slug: "mint-sprig", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶底放入薄荷与单糖浆。", instructionEn: "Place mint and simple syrup at the bottom of a shaker.", duration: null, techniqueSlug: "muddle", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "轻压 3-4 次。", instructionEn: "Press gently 3-4 times.", duration: "10s", techniqueSlug: "muddle", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "加入金酒与柠檬汁，加冰摇和 8-10 秒。", instructionEn: "Add gin and lemon juice; fill with ice and shake for 8-10 seconds.", duration: "10s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "双重过滤入装有冰球的 rocks 杯。", instructionEn: "Double-strain into a rocks glass with a large ice cube.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
      { order: 5, instructionZh: "薄荷枝拍打后装饰。", instructionEn: "Garnish with a slapped mint sprig.", duration: null, techniqueSlug: null, tipZh: null, tipEn: null },
    ],
    techniques: ["muddle", "shake", "double-strain"],
  },
  {
    slug: "basil-smash",
    nameZh: "罗勒碎冰", nameEn: "Basil Smash",
    difficulty: 2, glassType: "rocks", iceType: "large",
    descriptionZh: "金酒、罗勒、柠檬与单糖浆的德国现代经典。",
    descriptionEn: "Gin, basil, lemon and simple syrup — the German herbaceous modern classic.",
    storyNoteZh: "2008 年德国汉堡 Le Lion 酒吧调酒师 Jörg Meyer 创作，迅速成为现代经典。",
    storyNoteEn: "Created in 2008 by Jörg Meyer at Hamburg's Le Lion bar; one of the first 21st-century European classics.",
    balanceTags: ["refreshing", "herbal", "citrus", "modern-classic"],
    ingredients: [
      { slug: "gin", amount: "60ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "lemon-juice", amount: "22.5ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 2 },
      { slug: "simple-syrup", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "basil", amount: "8 leaves", isKey: true, optional: false, notesZh: "轻捣", notesEn: "muddle gently", order: 4 },
      { slug: "basil", amount: "1 sprig", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶底放入罗勒叶与单糖浆。", instructionEn: "Place basil leaves and simple syrup at the bottom of a shaker.", duration: null, techniqueSlug: "muddle", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "轻压 4-5 次释放罗勒油。", instructionEn: "Press gently 4-5 times to release basil oils.", duration: "10s", techniqueSlug: "muddle", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "加入金酒与柠檬汁，加冰摇和 8-10 秒。", instructionEn: "Add gin and lemon juice; fill with ice and shake for 8-10 seconds.", duration: "10s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "双重过滤入装有冰球的 rocks 杯。", instructionEn: "Double-strain into a rocks glass with a large ice cube.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
      { order: 5, instructionZh: "罗勒枝拍打后装饰。", instructionEn: "Garnish with a slapped basil sprig.", duration: null, techniqueSlug: null, tipZh: null, tipEn: null },
    ],
    techniques: ["muddle", "shake", "double-strain"],
  },
  {
    slug: "derby",
    nameZh: "德比", nameEn: "Derby",
    difficulty: 2, glassType: "coupe", iceType: "none",
    descriptionZh: "金酒、桃子薄荷与单糖浆的 Kentucky Derby 经典。",
    descriptionEn: "Gin, peach and mint — the refreshing Kentucky Derby classic.",
    storyNoteZh: "19 世纪后期 Kentucky Derby 比赛日传统鸡尾酒，原始版本以 Bourbon 为主也有 Gin 版。",
    storyNoteEn: "A late-19th-century Kentucky Derby classic, with both bourbon and gin versions in circulation.",
    balanceTags: ["refreshing", "fruity", "herbal", "classic"],
    ingredients: [
      { slug: "gin", amount: "60ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "peach-liqueur", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "simple-syrup", amount: "7.5ml", isKey: false, optional: false, notesZh: "约 1 tsp", notesEn: "~1 tsp", order: 3 },
      { slug: "mint", amount: "3 sprigs", isKey: true, optional: false, notesZh: "轻捣", notesEn: "muddle gently", order: 4 },
      { slug: "mint-sprig", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶底放入薄荷与单糖浆。", instructionEn: "Place mint and simple syrup at the bottom of a shaker.", duration: null, techniqueSlug: "muddle", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "轻压 3 次。", instructionEn: "Press gently 3 times.", duration: "10s", techniqueSlug: "muddle", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "加入金酒与桃子利口酒，加冰摇和 10 秒。", instructionEn: "Add gin and peach liqueur; fill with ice and shake for 10 seconds.", duration: "10s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "双重过滤入预冷马天尼杯。", instructionEn: "Double-strain into a chilled coupe.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
      { order: 5, instructionZh: "薄荷枝装饰。", instructionEn: "Garnish with a mint sprig.", duration: null, techniqueSlug: null, tipZh: null, tipEn: null },
    ],
    techniques: ["muddle", "shake", "double-strain"],
  },
  {
    slug: "peach-smash",
    nameZh: "桃子碎冰", nameEn: "Peach Smash",
    difficulty: 2, glassType: "rocks", iceType: "large",
    descriptionZh: "波本、桃子、柠檬与薄荷的夏日碎冰酸酒。",
    descriptionEn: "Bourbon, peach, lemon and mint — the Southern summer's stone-fruit smash.",
    storyNoteZh: "19 世纪美国南方 Peach Belt 农场的夏日经典，现代版本多用桃子利口酒。",
    storyNoteEn: "A Southern American summer classic; modern versions use peach liqueur for consistency.",
    balanceTags: ["refreshing", "fruity", "herbal", "classic"],
    ingredients: [
      { slug: "bourbon", amount: "60ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "peach-liqueur", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "lemon-juice", amount: "22.5ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 3 },
      { slug: "simple-syrup", amount: "7.5ml", isKey: true, optional: false, notesZh: "约 1 tsp", notesEn: "~1 tsp", order: 4 },
      { slug: "mint", amount: "4 sprigs", isKey: true, optional: false, notesZh: "轻捣", notesEn: "muddle gently", order: 5 },
      { slug: "mint-sprig", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 6 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶底放入薄荷、单糖浆与桃子利口酒。", instructionEn: "Place mint, simple syrup and peach liqueur at the bottom of a shaker.", duration: null, techniqueSlug: "muddle", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "轻压 3-4 次。", instructionEn: "Press gently 3-4 times.", duration: "10s", techniqueSlug: "muddle", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "加入波本与柠檬汁，加冰摇和 8-10 秒。", instructionEn: "Add bourbon and lemon juice; fill with ice and shake for 8-10 seconds.", duration: "10s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "双重过滤入装有冰球的 rocks 杯。", instructionEn: "Double-strain into a rocks glass with a large ice cube.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
      { order: 5, instructionZh: "薄荷枝拍打后装饰。", instructionEn: "Garnish with a slapped mint sprig.", duration: null, techniqueSlug: null, tipZh: null, tipEn: null },
    ],
    techniques: ["muddle", "shake", "double-strain"],
  },
  // ───── 7. Modern Classics (10) ──────────────────────────────────────────
  {
    slug: "marconi-wireless",
    nameZh: "马可尼无线电", nameEn: "Marconi Wireless",
    difficulty: 3, glassType: "coupe", iceType: "none",
    descriptionZh: "金酒、马拉斯奇诺与黄查特的高对比度 Last Word 变奏。",
    descriptionEn: "Gin, maraschino and Yellow Chartreuse — the radio-themed Last Word cousin.",
    storyNoteZh: "2000 年代纽约 Death & Co 调酒师 Phil Ward 创作，名字纪念马可尼发明的无线电报。",
    storyNoteEn: "Created in the 2000s at Death & Co. by Phil Ward, named after Guglielmo Marconi's wireless telegraphy.",
    balanceTags: ["herbal", "floral", "complex", "modern-classic"],
    ingredients: [
      { slug: "gin", amount: "22.5ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "maraschino", amount: "22.5ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "yellow-chartreuse", amount: "22.5ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "lime-juice", amount: "22.5ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 4 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶加金酒、马拉斯奇诺、黄查特与青柠汁。", instructionEn: "Add gin, maraschino, yellow Chartreuse and lime juice to a shaker.", duration: null, techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰摇和 10 秒。", instructionEn: "Fill with ice and shake for 10 seconds.", duration: "10s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "双重过滤入预冷马天尼杯。", instructionEn: "Double-strain into a chilled coupe.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
    ],
    techniques: ["shake", "double-strain"],
  },
  {
    slug: "bijou",
    nameZh: "宝石", nameEn: "Bijou",
    difficulty: 2, glassType: "coupe", iceType: "none",
    descriptionZh: "金酒、绿查特、甜味美思与橙皮苦精的三色宝石。",
    descriptionEn: "Gin, Green Chartreuse, sweet vermouth and orange bitters — the jewel-toned 1900s classic.",
    storyNoteZh: "1890 年代 Harry Johnson《New and Improved Bartender's Manual》首载，名字「Bijou」即宝石之意。",
    storyNoteEn: "First published in Harry Johnson's 1890 New and Improved Bartender's Manual; 'bijou' means jewel in French.",
    balanceTags: ["herbal", "spirit-forward", "complex", "classic"],
    ingredients: [
      { slug: "gin", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "green-chartreuse", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "sweet-vermouth", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "orange-bitters", amount: "1 dash", isKey: false, optional: false, notesZh: null, notesEn: null, order: 4 },
      { slug: "maraschino-cherry", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "搅拌杯加金酒、绿查特、甜味美思与橙皮苦精。", instructionEn: "Combine gin, green Chartreuse, sweet vermouth and orange bitters in a mixing glass.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰搅和 30 秒。", instructionEn: "Add ice and stir for 30 seconds.", duration: "30s", techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "滤入预冷马天尼杯。", instructionEn: "Strain into a chilled coupe.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "酒渍樱桃沉底装饰。", instructionEn: "Drop in a brandied cherry.", duration: null, techniqueSlug: null, tipZh: null, tipEn: null },
    ],
    techniques: ["stir"],
  },
  {
    slug: "bobby-burns",
    nameZh: "鲍比·伯恩斯", nameEn: "Bobby Burns",
    difficulty: 2, glassType: "coupe", iceType: "none",
    descriptionZh: "苏格兰威士忌、甜味美思与本笃会酒的 Robert Burns 纪念款。",
    descriptionEn: "Scotch, sweet vermouth and Bénédictine — the poet Robert Burns tribute cocktail.",
    storyNoteZh: "1900 年代伦敦 Waldorf-Astoria 调酒师为纪念苏格兰诗人 Robert Burns 创作。",
    storyNoteEn: "Created at the Waldorf-Astoria in early 20th-century London to honour Scottish poet Robert Burns.",
    balanceTags: ["spirit-forward", "herbal", "smoky", "classic"],
    ingredients: [
      { slug: "scotch-blended", amount: "45ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "sweet-vermouth", amount: "45ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "benedictine", amount: "7.5ml", isKey: true, optional: false, notesZh: "约 1 tsp", notesEn: "~1 tsp", order: 3 },
      { slug: "lemon-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 4 },
    ],
    steps: [
      { order: 1, instructionZh: "搅拌杯加苏格兰威士忌、甜味美思与本笃会酒。", instructionEn: "Combine Scotch, sweet vermouth and Bénédictine in a mixing glass.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰搅和 30 秒。", instructionEn: "Add ice and stir for 30 seconds.", duration: "30s", techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "滤入预冷马天尼杯。", instructionEn: "Strain into a chilled coupe.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "柠檬皮喷香装饰。", instructionEn: "Express lemon peel over the surface.", duration: null, techniqueSlug: "express-peel", tipZh: null, tipEn: null },
    ],
    techniques: ["stir", "express-peel"],
  },
  {
    slug: "la-louise",
    nameZh: "拉·路易丝", nameEn: "La Louise",
    difficulty: 2, glassType: "coupe", iceType: "none",
    descriptionZh: "金酒、干味美思与本笃会酒的多苦草本经典。",
    descriptionEn: "Gin, dry vermouth and Bénédictine — the herbal-dry 1900s classic.",
    storyNoteZh: "1890 年代 Harry Johnson 首载的 19 世纪末「Martini 变奏」之一。",
    storyNoteEn: "First recorded by Harry Johnson in the 1890s as a Martini-style herbal variant.",
    balanceTags: ["spirit-forward", "herbal", "dry", "classic"],
    ingredients: [
      { slug: "gin", amount: "45ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "dry-vermouth", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "benedictine", amount: "7.5ml", isKey: true, optional: false, notesZh: "约 1 tsp", notesEn: "~1 tsp", order: 3 },
      { slug: "orange-bitters", amount: "1 dash", isKey: false, optional: false, notesZh: null, notesEn: null, order: 4 },
      { slug: "lemon-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "搅拌杯加金酒、干味美思、本笃会酒与橙皮苦精。", instructionEn: "Combine gin, dry vermouth, Bénédictine and orange bitters in a mixing glass.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰搅和 30 秒。", instructionEn: "Add ice and stir for 30 seconds.", duration: "30s", techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "滤入预冷马天尼杯。", instructionEn: "Strain into a chilled coupe.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "柠檬皮喷香装饰。", instructionEn: "Express lemon peel over the surface.", duration: null, techniqueSlug: "express-peel", tipZh: null, tipEn: null },
    ],
    techniques: ["stir", "express-peel"],
  },
  {
    slug: "chrysanthemum",
    nameZh: "菊花", nameEn: "Chrysanthemum",
    difficulty: 2, glassType: "coupe", iceType: "none",
    descriptionZh: "干味美思、本笃会酒与苦艾酒的 1900 年代干燥开胃酒。",
    descriptionEn: "Dry vermouth, Bénédictine and absinthe — the bone-dry 1900s aperitif.",
    storyNoteZh: "1900 年代 Harry Craddock 在 Savoy 调酒师时期的菊花酒。",
    storyNoteEn: "First published in Harry Craddock's Savoy Cocktail Book, 1930.",
    balanceTags: ["spirit-forward", "anise", "herbal", "classic"],
    ingredients: [
      { slug: "dry-vermouth", amount: "60ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "benedictine", amount: "20ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "absinthe", amount: "1 tsp", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "orange-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 4 },
    ],
    steps: [
      { order: 1, instructionZh: "搅拌杯加干味美思、本笃会酒与苦艾酒。", instructionEn: "Combine dry vermouth, Bénédictine and absinthe in a mixing glass.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰搅和 30 秒。", instructionEn: "Add ice and stir for 30 seconds.", duration: "30s", techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "滤入预冷马天尼杯。", instructionEn: "Strain into a chilled coupe.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "橙皮喷香装饰。", instructionEn: "Express orange peel over the surface.", duration: null, techniqueSlug: "express-peel", tipZh: null, tipEn: null },
    ],
    techniques: ["stir", "express-peel"],
  },
  {
    slug: "hugo-spritz",
    nameZh: "雨果气泡", nameEn: "Hugo Spritz",
    difficulty: 1, glassType: "wine", iceType: "cubed",
    descriptionZh: "接骨木花糖浆、普罗赛克与苏打水的南蒂罗尔夏日开胃酒。",
    descriptionEn: "Elderflower, Prosecco and soda — the South Tyrolean summer aperitif.",
    storyNoteZh: "2005 年意大利南蒂罗尔 Naturns 调酒师 Roland Gruber 创作，迅速在欧洲流行。",
    storyNoteEn: "Created in 2005 by Roland Gruber in Naturns, South Tyrol; became a European aperitivo staple in the 2010s.",
    balanceTags: ["refreshing", "floral", "low-abv", "modern-classic"],
    ingredients: [
      { slug: "st-germain", amount: "30ml", isKey: true, optional: false, notesZh: "接骨木花糖浆", notesEn: "elderflower liqueur", order: 1 },
      { slug: "prosecco", amount: "90ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "soda-water", amount: "30ml", isKey: false, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "mint-sprig", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 4 },
      { slug: "lime-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "大红酒杯装满方冰。", instructionEn: "Fill a large wine glass with cubed ice.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "先倒接骨木花糖浆。", instructionEn: "Add the elderflower liqueur first.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "再倒入普罗赛克。", instructionEn: "Pour in the Prosecco.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "顶部加少量苏打水。", instructionEn: "Top with a splash of soda water.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
      { order: 5, instructionZh: "薄荷枝与青柠皮装饰。", instructionEn: "Garnish with a mint sprig and lime peel.", duration: null, techniqueSlug: "express-peel", tipZh: null, tipEn: null },
    ],
    techniques: ["build", "express-peel"],
  },
  {
    slug: "stinger",
    nameZh: "刺针", nameEn: "Stinger",
    difficulty: 2, glassType: "coupe", iceType: "none",
    descriptionZh: "白兰地与白薄荷利口酒的 20 世纪初纽约餐后酒。",
    descriptionEn: "Brandy and white crème de menthe — the simple 20th-century after-dinner classic.",
    storyNoteZh: "19 世纪末至 20 世纪初纽约上流社会餐后酒，禁酒令后几乎消失。",
    storyNoteEn: "A late-19th to early-20th-century New York after-dinner classic that nearly vanished after Prohibition.",
    balanceTags: ["spirit-forward", "minty", "dessert", "classic"],
    ingredients: [
      { slug: "cognac", amount: "60ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "creme-de-menthe-white", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "mint-sprig", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 3 },
    ],
    steps: [
      { order: 1, instructionZh: "搅拌杯加干邑与白薄荷利口酒。", instructionEn: "Combine cognac and white crème de menthe in a mixing glass.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰搅和 30 秒。", instructionEn: "Add ice and stir for 30 seconds.", duration: "30s", techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "滤入预冷马天尼杯。", instructionEn: "Strain into a chilled coupe.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "薄荷枝装饰（可选）。", instructionEn: "Garnish with a mint sprig (optional).", duration: null, techniqueSlug: null, tipZh: null, tipEn: null },
    ],
    techniques: ["stir"],
  },
  {
    slug: "angel-face",
    nameZh: "天使面孔", nameEn: "Angel Face",
    difficulty: 3, glassType: "coupe", iceType: "none",
    descriptionZh: "等比金酒、杏子白兰地与卡尔瓦多斯的法式三重奏。",
    descriptionEn: "Equal parts gin, apricot brandy and Calvados — the apple-almond-juniper French classic.",
    storyNoteZh: "1930 年 Harry Craddock《Savoy Cocktail Book》收录的法国版本。",
    storyNoteEn: "Recorded in Harry Craddock's 1930 Savoy Cocktail Book as a French apple-gin classic.",
    balanceTags: ["spirit-forward", "fruity", "elegant", "classic"],
    ingredients: [
      { slug: "gin", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "apricot-brandy", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "calvados", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "lemon-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 4 },
    ],
    steps: [
      { order: 1, instructionZh: "搅拌杯加金酒、杏子白兰地与卡尔瓦多斯。", instructionEn: "Combine gin, apricot brandy and Calvados in a mixing glass.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰搅和 30 秒。", instructionEn: "Add ice and stir for 30 seconds.", duration: "30s", techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "滤入预冷马天尼杯。", instructionEn: "Strain into a chilled coupe.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "柠檬皮喷香装饰。", instructionEn: "Express lemon peel over the surface.", duration: null, techniqueSlug: "express-peel", tipZh: null, tipEn: null },
    ],
    techniques: ["stir", "express-peel"],
  },
  {
    slug: "casino",
    nameZh: "赌场", nameEn: "Casino",
    difficulty: 3, glassType: "coupe", iceType: "none",
    descriptionZh: "金酒、马拉斯奇诺、柠檬与橙皮苦精的 Old Tom 酸酒。",
    descriptionEn: "Gin, maraschino, lemon and orange bitters — the Old Tom gin casino classic.",
    storyNoteZh: "20 世纪初 Harry Craddock 在《Savoy Cocktail Book》收录的酸酒；Casino 的酸酒是「Ace」的意思。",
    storyNoteEn: "Recorded in Harry Craddock's 1930 Savoy Cocktail Book; 'casino' means 'little house' (the ace of cards).",
    balanceTags: ["sour", "elegant", "classic", "balanced"],
    ingredients: [
      { slug: "gin", amount: "45ml", isKey: true, optional: false, notesZh: "Old Tom", notesEn: "Old Tom", order: 1 },
      { slug: "maraschino", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "lemon-juice", amount: "15ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 3 },
      { slug: "orange-bitters", amount: "2 dashes", isKey: false, optional: false, notesZh: null, notesEn: null, order: 4 },
      { slug: "maraschino-cherry", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 5 },
      { slug: "lemon-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 6 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶加 Old Tom 金酒、马拉斯奇诺、柠檬汁与橙皮苦精。", instructionEn: "Add Old Tom gin, maraschino, lemon juice and orange bitters to a shaker.", duration: null, techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰摇和 10 秒。", instructionEn: "Fill with ice and shake for 10 seconds.", duration: "10s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "双重过滤入预冷马天尼杯。", instructionEn: "Double-strain into a chilled coupe.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "酒渍樱桃与柠檬皮装饰。", instructionEn: "Garnish with a brandied cherry and lemon peel.", duration: null, techniqueSlug: "express-peel", tipZh: null, tipEn: null },
    ],
    techniques: ["shake", "double-strain", "express-peel"],
  },
  {
    slug: "porto-flip",
    nameZh: "波特翻", nameEn: "Porto Flip",
    difficulty: 3, glassType: "coupe", iceType: "none",
    descriptionZh: "白兰地、波特酒与蛋黄的多层次翻转经典。",
    descriptionEn: "Brandy, ruby port and egg yolk — the rich, foamy 19th-century flip.",
    storyNoteZh: "19 世纪欧美经典的「Flip」类鸡尾酒，原始版本用热铁棒烫熟。",
    storyNoteEn: "A 19th-century European flip; the original flip was heated with a hot iron, modern versions just shake.",
    balanceTags: ["spirit-forward", "rich", "foamy", "classic"],
    ingredients: [
      { slug: "cognac", amount: "45ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "port", amount: "22.5ml", isKey: true, optional: false, notesZh: "Ruby", notesEn: "ruby", order: 2 },
      { slug: "egg-yolk", amount: "1 piece", isKey: false, optional: false, notesZh: "干湿双摇", notesEn: "dry + wet shake", order: 3 },
      { slug: "simple-syrup", amount: "7.5ml", isKey: false, optional: false, notesZh: "约 1 tsp（按口味）", notesEn: "~1 tsp (to taste)", order: 4 },
      { slug: "nutmeg", amount: "1 pinch", isKey: false, optional: false, notesZh: "肉豆蔻粉撒顶部", notesEn: "freshly grated nutmeg on top", order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶加干邑、波特酒、蛋黄与单糖浆（无冰）。", instructionEn: "Add cognac, port, egg yolk and simple syrup to a shaker (no ice).", duration: null, techniqueSlug: "dry-shake", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "干摇 20 秒。", instructionEn: "Dry-shake hard for 20 seconds.", duration: "20s", techniqueSlug: "dry-shake", tipZh: "蛋黄比蛋清需要更长干摇。", tipEn: "Yolk takes longer than white to emulsify." },
      { order: 3, instructionZh: "加冰再摇 15 秒。", instructionEn: "Add ice and wet-shake for 15 seconds.", duration: "15s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "双重过滤入预冷马天尼杯。", instructionEn: "Double-strain into a chilled coupe.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
      { order: 5, instructionZh: "顶部撒现磨肉豆蔻。", instructionEn: "Grate fresh nutmeg on top.", duration: null, techniqueSlug: null, tipZh: null, tipEn: null },
    ],
    techniques: ["dry-shake", "shake", "double-strain"],
  },
  // ───── 8. Pre-Prohibition / Obscure (9) ────────────────────────────────
  {
    slug: "scofflaw",
    nameZh: "违禁者", nameEn: "Scofflaw",
    difficulty: 3, glassType: "coupe", iceType: "none",
    descriptionZh: "黑麦、干味美思、柠檬、石榴糖浆与橙皮苦精的禁酒令反骨鸡尾酒。",
    descriptionEn: "Rye, dry vermouth, lemon, grenadine and orange bitters — the Prohibition-era antihero cocktail.",
    storyNoteZh: "1924 年巴黎 Harry's New York Bar 调酒师 Jock MacNab 创作，「Scofflaw」一词是 1924 年波士顿报纸为禁酒令违禁者创造的词汇。",
    storyNoteEn: "Created in 1924 by Jock MacNab at Paris's Harry's New York Bar; the name came from a Boston newspaper contest for Prohibition-defiers.",
    balanceTags: ["sour", "bitter", "balanced", "classic"],
    ingredients: [
      { slug: "rye", amount: "60ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "dry-vermouth", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "lemon-juice", amount: "15ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 3 },
      { slug: "grenadine", amount: "7.5ml", isKey: false, optional: false, notesZh: "约 1 tsp", notesEn: "~1 tsp", order: 4 },
      { slug: "orange-bitters", amount: "2 dashes", isKey: false, optional: false, notesZh: null, notesEn: null, order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶加黑麦、干味美思、柠檬汁、石榴糖浆与橙皮苦精。", instructionEn: "Add rye, dry vermouth, lemon juice, grenadine and orange bitters to a shaker.", duration: null, techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰摇和 10 秒。", instructionEn: "Fill with ice and shake for 10 seconds.", duration: "10s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "双重过滤入预冷马天尼杯。", instructionEn: "Double-strain into a chilled coupe.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "柠檬皮喷香装饰（可选）。", instructionEn: "Express lemon peel (optional).", duration: null, techniqueSlug: "express-peel", tipZh: null, tipEn: null },
    ],
    techniques: ["shake", "double-strain", "express-peel"],
  },
  {
    slug: "corpse-reviver-1",
    nameZh: "还魂酒 1 号", nameEn: "Corpse Reviver #1",
    difficulty: 2, glassType: "coupe", iceType: "none",
    descriptionZh: "等比干邑、卡尔瓦多斯与甜味美思的 1930 年代醒酒方。",
    descriptionEn: "Equal parts cognac, Calvados and sweet vermouth — the 1930s dawn pick-me-up.",
    storyNoteZh: "1930 年 Harry Craddock《Savoy Cocktail Book》收录的「Corpse Reviver」家族的简单版本。",
    storyNoteEn: "The simpler sibling of the Corpse Reviver #2, recorded in Harry Craddock's 1930 Savoy Cocktail Book.",
    balanceTags: ["spirit-forward", "rich", "elegant", "classic"],
    ingredients: [
      { slug: "cognac", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "calvados", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "sweet-vermouth", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "lemon-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 4 },
    ],
    steps: [
      { order: 1, instructionZh: "搅拌杯加干邑、卡尔瓦多斯与甜味美思。", instructionEn: "Combine cognac, Calvados and sweet vermouth in a mixing glass.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰搅和 30 秒。", instructionEn: "Add ice and stir for 30 seconds.", duration: "30s", techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "滤入预冷马天尼杯。", instructionEn: "Strain into a chilled coupe.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "柠檬皮喷香装饰。", instructionEn: "Express lemon peel over the surface.", duration: null, techniqueSlug: "express-peel", tipZh: null, tipEn: null },
    ],
    techniques: ["stir", "express-peel"],
  },
  {
    slug: "20th-century",
    nameZh: "20 世纪", nameEn: "20th Century",
    difficulty: 3, glassType: "coupe", iceType: "none",
    descriptionZh: "等比金酒、干味美思、白可可与柠檬的 1930 年代火车命名的酸酒。",
    descriptionEn: "Equal parts gin, dry vermouth, white crème de cacao and lemon — the 1930s train-named sour.",
    storyNoteZh: "1937 年伦敦 Cafe Royal 调酒师 C.A. Tuck 为纪念 20 世纪特快列车而创作。",
    storyNoteEn: "Created in 1937 by C.A. Tuck at London's Café Royal, named for the 20th Century Limited express train.",
    balanceTags: ["sour", "elegant", "chocolate", "classic"],
    ingredients: [
      { slug: "gin", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "dry-vermouth", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "creme-de-cacao", amount: "15ml", isKey: true, optional: false, notesZh: "白色", notesEn: "white", order: 3 },
      { slug: "lemon-juice", amount: "15ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 4 },
      { slug: "maraschino-cherry", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶加金酒、干味美思、白可可与柠檬汁。", instructionEn: "Add gin, dry vermouth, white crème de cacao and lemon juice to a shaker.", duration: null, techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰摇和 10 秒。", instructionEn: "Fill with ice and shake for 10 seconds.", duration: "10s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "双重过滤入预冷马天尼杯。", instructionEn: "Double-strain into a chilled coupe.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "酒渍樱桃装饰。", instructionEn: "Garnish with a brandied cherry.", duration: null, techniqueSlug: null, tipZh: null, tipEn: null },
    ],
    techniques: ["shake", "double-strain"],
  },
  {
    slug: "paradise",
    nameZh: "天堂", nameEn: "Paradise",
    difficulty: 2, glassType: "coupe", iceType: "none",
    descriptionZh: "金酒、杏子白兰地、橙汁与苦精的 1930 年代果味酸酒。",
    descriptionEn: "Gin, apricot brandy, orange juice and bitters — the fruity 1930s short sour.",
    storyNoteZh: "1930 年 Harry Craddock《Savoy Cocktail Book》收录的轻盈果味酸酒。",
    storyNoteEn: "Recorded in Harry Craddock's 1930 Savoy Cocktail Book as a light, fruity pre-dinner sour.",
    balanceTags: ["sour", "fruity", "elegant", "classic"],
    ingredients: [
      { slug: "gin", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "apricot-brandy", amount: "20ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "orange-juice", amount: "20ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 3 },
      { slug: "angostura", amount: "1 dash", isKey: false, optional: false, notesZh: null, notesEn: null, order: 4 },
      { slug: "orange-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶加金酒、杏子白兰地、橙汁与安格斯特拉。", instructionEn: "Add gin, apricot brandy, orange juice and Angostura to a shaker.", duration: null, techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰摇和 10 秒。", instructionEn: "Fill with ice and shake for 10 seconds.", duration: "10s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "双重过滤入预冷马天尼杯。", instructionEn: "Double-strain into a chilled coupe.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "橙皮喷香装饰。", instructionEn: "Express orange peel over the surface.", duration: null, techniqueSlug: "express-peel", tipZh: null, tipEn: null },
    ],
    techniques: ["shake", "double-strain", "express-peel"],
  },
  {
    slug: "brandy-crusta",
    nameZh: "白兰地脆皮", nameEn: "Brandy Crusta",
    difficulty: 4, glassType: "coupe", iceType: "none",
    descriptionZh: "白兰地、柠檬、马拉斯奇诺与苦精的糖边经典，19 世纪中叶新奥尔良发明。",
    descriptionEn: "Brandy, lemon, maraschino and bitters with a sugar rim and a long lemon-peel spiral — the 1850s New Orleans showpiece.",
    storyNoteZh: "19 世纪中叶新奥尔良 Joseph Santini 与 Louis Diat 改良，是 Crusta 杯型的由来。",
    storyNoteEn: "Refined in 1850s New Orleans by Joseph Santini and later Louis Diat; the Crusta glass was named for this drink.",
    balanceTags: ["spirit-forward", "elegant", "showpiece", "classic"],
    ingredients: [
      { slug: "cognac", amount: "60ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "lemon-juice", amount: "15ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 2 },
      { slug: "maraschino", amount: "7.5ml", isKey: true, optional: false, notesZh: "约 1 tsp", notesEn: "~1 tsp", order: 3 },
      { slug: "angostura", amount: "2 dashes", isKey: false, optional: false, notesZh: null, notesEn: null, order: 4 },
      { slug: "orange-bitters", amount: "1 dash", isKey: false, optional: false, notesZh: null, notesEn: null, order: 5 },
      { slug: "sugar", amount: "1 tsp", isKey: false, optional: false, notesZh: "杯边糖边", notesEn: "rim with sugar", order: 6 },
      { slug: "lemon-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "长螺旋皮装饰", notesEn: "long lemon-peel spiral", order: 7 },
    ],
    steps: [
      { order: 1, instructionZh: "马天尼杯口擦柠檬，蘸砂糖。", instructionEn: "Rim a coupe with sugar using a lemon wedge.", duration: null, techniqueSlug: "sugar-rim", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "搅拌杯加干邑、柠檬汁、马拉斯奇诺、安格斯特拉与橙皮苦精。", instructionEn: "Combine cognac, lemon juice, maraschino, Angostura and orange bitters in a mixing glass.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "加冰搅和 30 秒。", instructionEn: "Add ice and stir for 30 seconds.", duration: "30s", techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "滤入糖边马天尼杯。", instructionEn: "Strain into the sugared coupe.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 5, instructionZh: "将一长条柠檬皮螺旋挂在杯内壁装饰。", instructionEn: "Drape a long spiral of lemon peel inside the glass.", duration: null, techniqueSlug: "express-peel", tipZh: "柠檬皮至少 5cm 长。", tipEn: "Use a 5cm+ length of lemon peel for the spiral." },
    ],
    techniques: ["sugar-rim", "stir", "express-peel"],
  },
  {
    slug: "millionaire",
    nameZh: "百万富翁", nameEn: "Millionaire",
    difficulty: 2, glassType: "coupe", iceType: "none",
    descriptionZh: "黑麦、黑刺李金酒、甜味美思、杏子白兰地与石榴糖浆的复合经典。",
    descriptionEn: "Rye, sloe gin, sweet vermouth, apricot brandy and grenadine — the multi-fruit millionaire classic.",
    storyNoteZh: "1910-20 年代纽约「Millionaire's Club」起源的复合水果鸡尾酒。",
    storyNoteEn: "Born in 1910s-20s New York at the Millionaire's Club; a complex multi-fruit stirred drink.",
    balanceTags: ["spirit-forward", "fruity", "rich", "classic"],
    ingredients: [
      { slug: "rye", amount: "22.5ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "sloe-gin", amount: "22.5ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "sweet-vermouth", amount: "22.5ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "apricot-brandy", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 4 },
      { slug: "grenadine", amount: "1 tsp", isKey: false, optional: false, notesZh: null, notesEn: null, order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "搅拌杯加黑麦、黑刺李金酒、甜味美思、杏子白兰地与石榴糖浆。", instructionEn: "Combine rye, sloe gin, sweet vermouth, apricot brandy and grenadine in a mixing glass.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰搅和 30 秒。", instructionEn: "Add ice and stir for 30 seconds.", duration: "30s", techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "滤入预冷马天尼杯。", instructionEn: "Strain into a chilled coupe.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "柠檬皮喷香装饰（可选）。", instructionEn: "Express lemon peel (optional).", duration: null, techniqueSlug: "express-peel", tipZh: null, tipEn: null },
    ],
    techniques: ["stir", "express-peel"],
  },
  {
    slug: "harvard",
    nameZh: "哈佛", nameEn: "Harvard",
    difficulty: 2, glassType: "coupe", iceType: "none",
    descriptionZh: "金酒、甜味美思与石榴糖浆的波士顿常春藤调酒。",
    descriptionEn: "Gin, sweet vermouth and grenadine — the crimson Ivy League aperitif.",
    storyNoteZh: "1890 年代波士顿 Harvard Club 调酒师为校友聚会而创作，名字来自常春藤联盟的红。",
    storyNoteEn: "Created in 1890s Boston at the Harvard Club for alumni gatherings; the crimson hue matches school colours.",
    balanceTags: ["spirit-forward", "fruity", "elegant", "classic"],
    ingredients: [
      { slug: "gin", amount: "45ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "sweet-vermouth", amount: "45ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "grenadine", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "lemon-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 4 },
    ],
    steps: [
      { order: 1, instructionZh: "搅拌杯加金酒、甜味美思与石榴糖浆。", instructionEn: "Combine gin, sweet vermouth and grenadine in a mixing glass.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰搅和 30 秒。", instructionEn: "Add ice and stir for 30 seconds.", duration: "30s", techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "滤入预冷马天尼杯。", instructionEn: "Strain into a chilled coupe.", duration: null, techniqueSlug: "stir", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "柠檬皮喷香装饰。", instructionEn: "Express lemon peel over the surface.", duration: null, techniqueSlug: "express-peel", tipZh: null, tipEn: null },
    ],
    techniques: ["stir", "express-peel"],
  },
  {
    slug: "daisy",
    nameZh: "雏菊", nameEn: "Daisy",
    difficulty: 2, glassType: "rocks", iceType: "large",
    descriptionZh: "威士忌、柠檬、石榴糖浆与苏打水的 19 世纪酸酒家族。",
    descriptionEn: "Whiskey, lemon, grenadine and soda — the 19th-century Daisy family template.",
    storyNoteZh: "19 世纪中叶美国流行的「Daisy」酸酒家族，Margarita 是其后代。",
    storyNoteEn: "A mid-19th-century American Daisy family template; the Margarita is its most famous descendant.",
    balanceTags: ["sour", "refreshing", "highball", "classic"],
    ingredients: [
      { slug: "rye", amount: "60ml", isKey: true, optional: false, notesZh: "或白兰地", notesEn: "or brandy", order: 1 },
      { slug: "lemon-juice", amount: "30ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 2 },
      { slug: "grenadine", amount: "15ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "soda-water", amount: "30ml", isKey: false, optional: false, notesZh: "顶部加注", notesEn: "to top", order: 4 },
      { slug: "lemon-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 5 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶加波本、柠檬汁与石榴糖浆。", instructionEn: "Add whiskey, lemon juice and grenadine to a shaker.", duration: null, techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰摇和 10 秒。", instructionEn: "Fill with ice and shake for 10 seconds.", duration: "10s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "双重过滤入装有冰球的 rocks 杯。", instructionEn: "Double-strain into a rocks glass with a large ice cube.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "顶部加少量苏打水，柠檬皮装饰。", instructionEn: "Top with a splash of soda; garnish with lemon peel.", duration: null, techniqueSlug: "build", tipZh: null, tipEn: null },
    ],
    techniques: ["shake", "double-strain", "build"],
  },
  {
    slug: "deauville",
    nameZh: "多维尔", nameEn: "Deauville",
    difficulty: 3, glassType: "coupe", iceType: "none",
    descriptionZh: "黑麦、干邑、甜味美思与柠檬的多层次法国版本。",
    descriptionEn: "Rye, cognac, sweet vermouth and lemon — the Normandy harbour-town classic.",
    storyNoteZh: "1920 年代法国诺曼底 Deauville 度假村鸡尾酒，名字取自该地。",
    storyNoteEn: "A 1920s French classic from the Deauville seaside resort in Normandy.",
    balanceTags: ["sour", "spirit-forward", "rich", "classic"],
    ingredients: [
      { slug: "rye", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 1 },
      { slug: "cognac", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 2 },
      { slug: "sweet-vermouth", amount: "30ml", isKey: true, optional: false, notesZh: null, notesEn: null, order: 3 },
      { slug: "lemon-juice", amount: "15ml", isKey: true, optional: false, notesZh: "现榨", notesEn: "freshly squeezed", order: 4 },
      { slug: "angostura", amount: "2 dashes", isKey: false, optional: false, notesZh: null, notesEn: null, order: 5 },
      { slug: "lemon-peel", amount: "1 piece", isKey: false, optional: false, notesZh: "装饰", notesEn: "garnish", order: 6 },
    ],
    steps: [
      { order: 1, instructionZh: "摇酒壶加黑麦、干邑、甜味美思、柠檬汁与安格斯特拉。", instructionEn: "Add rye, cognac, sweet vermouth, lemon juice and Angostura to a shaker.", duration: null, techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 2, instructionZh: "加冰摇和 10 秒。", instructionEn: "Fill with ice and shake for 10 seconds.", duration: "10s", techniqueSlug: "shake", tipZh: null, tipEn: null },
      { order: 3, instructionZh: "双重过滤入预冷马天尼杯。", instructionEn: "Double-strain into a chilled coupe.", duration: null, techniqueSlug: "double-strain", tipZh: null, tipEn: null },
      { order: 4, instructionZh: "柠檬皮喷香装饰。", instructionEn: "Express lemon peel over the surface.", duration: null, techniqueSlug: "express-peel", tipZh: null, tipEn: null },
    ],
    techniques: ["shake", "double-strain", "express-peel"],
  },
];

// ─── Append to existing data files ───────────────────────────────────────
let riIdCounter = 0;
let rsIdCounter = 0;
let rtIdCounter = 0;

// Find current max numeric IDs in recipe-ingredients.json / steps / techniques
const maxIdNum = (arr, prefix) =>
  arr.reduce((max, x) => {
    const m = x.id && x.id.match(new RegExp(`^${prefix}-?(\\d+)$`));
    return m ? Math.max(max, parseInt(m[1], 10)) : max;
  }, 0);

riIdCounter = maxIdNum(recipeIngredients, "ri");
rsIdCounter = maxIdNum(recipeSteps, "rs");
rtIdCounter = maxIdNum(recipeTechniques, "rt");

// Look up ingredient and technique ID by slug
const ingBySlug = new Map(ingredients.map((i) => [i.slug, i.id]));
const techBySlug = new Map(techniques.map((t) => [t.slug, t.id]));

const newRecipes = [];
const newRis = [];
const newRss = [];
const newRts = [];

NEW.forEach((entry, idx) => {
  if (recipeSlugSet.has(entry.slug)) {
    console.warn(`[skip] duplicate recipe slug: ${entry.slug}`);
    return;
  }
  const recipeId = `rec-${entry.slug}`;
  if (allIdSet.has(recipeId)) {
    console.warn(`[skip] duplicate recipe id: ${recipeId}`);
    return;
  }
  allIdSet.add(recipeId);
  recipeSlugSet.add(entry.slug);

  // Build recipe entry
  const recipe = {
    id: recipeId,
    slug: entry.slug,
    nameZh: entry.nameZh,
    nameEn: entry.nameEn,
    type: "CLASSIC",
    difficulty: entry.difficulty,
    glassType: entry.glassType,
    iceType: entry.iceType,
    descriptionZh: entry.descriptionZh,
    descriptionEn: entry.descriptionEn,
    storyNoteZh: entry.storyNoteZh,
    storyNoteEn: entry.storyNoteEn,
    balanceTags: entry.balanceTags,
  };
  newRecipes.push(recipe);

  // Recipe-ingredient links
  const usedIngIds = new Set();
  entry.ingredients.forEach((ing) => {
    if (usedIngIds.has(ing.slug)) {
      console.warn(`[warn] ${entry.slug} uses ingredient ${ing.slug} twice; skipped duplicate.`);
      return;
    }
    usedIngIds.add(ing.slug);
    const ingredientId = ingBySlug.get(ing.slug);
    if (!ingredientId) {
      throw new Error(`Missing ingredient for ${entry.slug}: ${ing.slug}`);
    }
    riIdCounter += 1;
    newRis.push({
      id: `ri-${riIdCounter}`,
      recipeId,
      ingredientId,
      amount: ing.amount,
      isKey: ing.isKey,
      optional: ing.optional,
      notesZh: ing.notesZh || null,
      notesEn: ing.notesEn || null,
      order: ing.order,
    });
  });

  // Recipe steps
  entry.steps.forEach((step) => {
    rsIdCounter += 1;
    newRss.push({
      id: `rs-${rsIdCounter}`,
      recipeId,
      order: step.order,
      instructionZh: step.instructionZh,
      instructionEn: step.instructionEn,
      duration: step.duration || null,
      techniqueId: step.techniqueSlug ? techBySlug.get(step.techniqueSlug) || null : null,
      tipZh: step.tipZh || null,
      tipEn: step.tipEn || null,
    });
  });

  // Recipe-technique many-to-many links
  const usedTechIds = new Set();
  entry.techniques.forEach((techSlug) => {
    const tid = techBySlug.get(techSlug);
    if (!tid) {
      throw new Error(`Missing technique for ${entry.slug}: ${techSlug}`);
    }
    if (usedTechIds.has(tid)) {
      return; // already linked
    }
    usedTechIds.add(tid);
    rtIdCounter += 1;
    newRts.push({
      id: `rt-${rtIdCounter}`,
      recipeId,
      techniqueId: tid,
    });
  });
});

console.log(`Prepared ${newRecipes.length} new recipes.`);
console.log(`Prepared ${newRis.length} new recipe-ingredients.`);
console.log(`Prepared ${newRss.length} new recipe-steps.`);
console.log(`Prepared ${newRts.length} new recipe-techniques.`);

// ─── Write back ───────────────────────────────────────────────────────────
recipes.push(...newRecipes);
recipeIngredients.push(...newRis);
recipeSteps.push(...newRss);
recipeTechniques.push(...newRts);

write("ingredients.json", ingredients);
write("techniques.json", techniques);
write("recipes.json", recipes);
write("recipe-ingredients.json", recipeIngredients);
write("recipe-steps.json", recipeSteps);
write("recipe-techniques.json", recipeTechniques);

console.log(`\nDone. New totals:`);
console.log(`  ingredients:           ${ingredients.length}`);
console.log(`  techniques:            ${techniques.length}`);
console.log(`  recipes:               ${recipes.length}`);
console.log(`  recipe-ingredients:    ${recipeIngredients.length}`);
console.log(`  recipe-steps:          ${recipeSteps.length}`);
console.log(`  recipe-techniques:     ${recipeTechniques.length}`);
