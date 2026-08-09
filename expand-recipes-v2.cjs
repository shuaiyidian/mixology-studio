// expand-recipes-v2.cjs
// B2-extension v2: add 100 new CLASSIC recipes + 22 new ingredients to the data layer.
// Run: node expand-recipes-v2.cjs  (from project root, then node verify-data.cjs)

const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "data");
const read = (name) => JSON.parse(fs.readFileSync(path.join(DATA_DIR, name), "utf8"));
const write = (name, data) =>
  fs.writeFileSync(path.join(DATA_DIR, name), JSON.stringify(data, null, 2) + "\n", "utf8");

// Load data definitions
const { newIngredients, newRecipes: newRecipesPart1 } = require("./v2-recipes-data.cjs");
const { newRecipes: newRecipesPart2 } = require("./v2-recipes-data-2-sours.cjs");
const { newRecipes: newRecipesPart3 } = require("./v2-recipes-data-3-mules.cjs");
const { newRecipes: newRecipesPart4 } = require("./v2-recipes-data-4-regional.cjs");
const { newRecipes: newRecipesPart5 } = require("./v2-recipes-data-5-modern.cjs");
const { newRecipes: newRecipesPart6 } = require("./v2-recipes-data-6-tiki.cjs");
const { newRecipes: newRecipesPart7 } = require("./v2-recipes-data-7-mocktails.cjs");
const { newRecipes: newRecipesPart8 } = require("./v2-recipes-data-8-deepcuts.cjs");

const newRecipes = [
  ...newRecipesPart1,
  ...newRecipesPart2,
  ...newRecipesPart3,
  ...newRecipesPart4,
  ...newRecipesPart5,
  ...newRecipesPart6,
  ...newRecipesPart7,
  ...newRecipesPart8,
];
console.log(`Total newRecipes loaded: ${newRecipes.length}`);

// ─── Load existing ──────────────────────────────────────────────────────────
const ingredients = read("ingredients.json");
const techniques = read("techniques.json");
const recipes = read("recipes.json");
const recipeIngredients = read("recipe-ingredients.json");
const recipeSteps = read("recipe-steps.json");
const recipeTechniques = read("recipe-techniques.json");

// ─── Build lookup maps ──────────────────────────────────────────────────────
const ingById = new Map(ingredients.map((i) => [i.id, i]));
const ingBySlug = new Map(ingredients.map((i) => [i.slug, i]));
const techById = new Map(techniques.map((t) => [t.id, t]));
const techBySlug = new Map(techniques.map((t) => [t.slug, t]));

const recipeSlugSet = new Set(recipes.map((r) => r.slug));
const allIdSet = new Set([
  ...ingredients.map((i) => i.id),
  ...techniques.map((t) => t.id),
  ...recipes.map((r) => r.id),
  ...recipeIngredients.map((ri) => ri.id),
  ...recipeSteps.map((rs) => rs.id),
  ...recipeTechniques.map((rt) => rt.id),
]);

// ID counters
let riCounter = Math.max(...recipeIngredients.map((ri) => parseInt(ri.id.split("-")[1]))) + 1;
let rsCounter = Math.max(...recipeSteps.map((rs) => parseInt(rs.id.split("-")[1]))) + 1;
let rtCounter = Math.max(...recipeTechniques.map((rt) => parseInt(rt.id.split("-")[1]))) + 1;

// ─── 1. Add new ingredients ─────────────────────────────────────────────────
let newIngCount = 0;
for (const i of newIngredients) {
  if (ingBySlug.has(i.slug)) {
    console.warn(`[skip] duplicate ingredient slug: ${i.slug}`);
    continue;
  }
  if (allIdSet.has(i.id)) {
    console.warn(`[skip] duplicate ingredient id: ${i.id}`);
    continue;
  }
  ingredients.push(i);
  ingById.set(i.id, i);
  ingBySlug.set(i.slug, i);
  allIdSet.add(i.id);
  newIngCount++;
}
console.log(`Added ${newIngCount} new ingredients. Total: ${ingredients.length}`);

// ─── 2. Process new recipes ────────────────────────────────────────────────
let addedRecipes = 0;
let addedRIs = 0;
let addedRSs = 0;
let addedRTs = 0;
let skippedRecipes = 0;
const errors = [];

for (const r of newRecipes) {
  if (recipeSlugSet.has(r.slug)) {
    console.warn(`[skip] duplicate recipe slug: ${r.slug}`);
    skippedRecipes++;
    continue;
  }
  const recipeId = `rec-${r.slug}`;
  if (allIdSet.has(recipeId)) {
    console.warn(`[skip] duplicate recipe id: ${recipeId}`);
    skippedRecipes++;
    continue;
  }

  // Validate every ingredient exists; collect warnings
  const ings = [];
  for (let idx = 0; idx < r.ingredients.length; idx++) {
    const ing = r.ingredients[idx];
    const ingId = `ing-${ing.slug}`;
    if (!ingBySlug.has(ing.slug)) {
      errors.push(`recipe ${r.slug}: unknown ingredient slug "${ing.slug}"`);
      continue;
    }
    ings.push({ ...ing, ingId, order: idx + 1 });
  }
  if (ings.length < 2) {
    errors.push(`recipe ${r.slug}: only ${ings.length} valid ingredients (need ≥2) — skipped`);
    skippedRecipes++;
    continue;
  }

  // Validate every step has at least zh + en; collect technique IDs
  const steps = [];
  for (let idx = 0; idx < r.steps.length; idx++) {
    const step = r.steps[idx];
    let techId = null;
    if (step.technique) {
      const tid = `tech-${step.technique}`;
      if (!techById.has(tid)) {
        console.warn(`  [warn] ${r.slug} step ${idx + 1}: unknown technique "${step.technique}" — set to null`);
      } else {
        techId = tid;
      }
    }
    steps.push({ ...step, techId, order: idx + 1 });
  }
  if (steps.length < 3) {
    errors.push(`recipe ${r.slug}: only ${steps.length} steps (need ≥3) — skipped`);
    skippedRecipes++;
    continue;
  }

  // Validate techniques list
  const techIds = [];
  for (const tslug of r.techniques) {
    const tid = `tech-${tslug}`;
    if (!techById.has(tid)) {
      console.warn(`  [warn] ${r.slug}: unknown technique "${tslug}" — skipping`);
      continue;
    }
    techIds.push(tid);
  }

  // 2a. Add recipe
  const recipe = {
    id: recipeId,
    slug: r.slug,
    nameZh: r.nameZh,
    nameEn: r.nameEn,
    type: "CLASSIC",
    difficulty: r.difficulty,
    glassType: r.glassType,
    iceType: r.iceType,
    descriptionZh: r.descriptionZh,
    descriptionEn: r.descriptionEn,
    storyNoteZh: r.storyNoteZh,
    storyNoteEn: r.storyNoteEn,
    balanceTags: r.balanceTags,
  };
  recipes.push(recipe);
  recipeSlugSet.add(r.slug);
  allIdSet.add(recipeId);

  // 2b. Add ingredient links
  for (const ing of ings) {
    const ri = {
      id: `ri-${riCounter++}`,
      recipeId,
      ingredientId: ing.ingId,
      amount: ing.amount,
      isKey: ing.isKey,
      optional: ing.optional,
      notesZh: ing.notesZh,
      notesEn: ing.notesEn,
      order: ing.order,
    };
    recipeIngredients.push(ri);
    allIdSet.add(ri.id);
    addedRIs++;
  }

  // 2c. Add step links
  for (const step of steps) {
    const rs = {
      id: `rs-${rsCounter++}`,
      recipeId,
      order: step.order,
      instructionZh: step.zh,
      instructionEn: step.en,
      duration: step.duration,
      techniqueId: step.techId,
      tipZh: step.tipZh,
      tipEn: step.tipEn,
    };
    recipeSteps.push(rs);
    allIdSet.add(rs.id);
    addedRSs++;
  }

  // 2d. Add technique links (one per technique, dedup within a recipe)
  const techIdsUnique = [...new Set(techIds)];
  for (const tid of techIdsUnique) {
    const rt = {
      id: `rt-${rtCounter++}`,
      recipeId,
      techniqueId: tid,
    };
    recipeTechniques.push(rt);
    allIdSet.add(rt.id);
    addedRTs++;
  }

  addedRecipes++;
}

if (errors.length > 0) {
  console.error("\n=== ERRORS ===");
  errors.forEach((e) => console.error("  -", e));
  console.error(`\n${errors.length} error(s). Aborting.`);
  process.exit(1);
}

console.log(`Added ${addedRecipes} new recipes (${skippedRecipes} skipped).`);
console.log(`Added ${addedRIs} recipe-ingredients, ${addedRSs} recipe-steps, ${addedRTs} recipe-techniques.`);
console.log(`New totals: ${recipes.length} recipes, ${ingredients.length} ingredients, ${techniques.length} techniques.`);
console.log(`          ${recipeIngredients.length} recipe-ingredients, ${recipeSteps.length} recipe-steps, ${recipeTechniques.length} recipe-techniques.`);

// ─── 3. Write back ─────────────────────────────────────────────────────────
write("ingredients.json", ingredients);
write("recipes.json", recipes);
write("recipe-ingredients.json", recipeIngredients);
write("recipe-steps.json", recipeSteps);
write("recipe-techniques.json", recipeTechniques);
// techniques.json unchanged
console.log("\nAll files written. Run: node verify-data.cjs");
