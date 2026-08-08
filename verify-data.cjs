// verify-data.cjs — Data layer validation for the Mixology Studio project.
// Run with: node verify-data.cjs (from project root)

const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "data");

function readJson(name) {
  const file = path.join(DATA_DIR, name);
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

const ingredients = readJson("ingredients.json");
const techniques = readJson("techniques.json");
const recipes = readJson("recipes.json");
const recipeIngredients = readJson("recipe-ingredients.json");
const recipeSteps = readJson("recipe-steps.json");
const recipeTechniques = readJson("recipe-techniques.json");

const errors = [];
const warnings = [];

function check(label, condition, detail) {
  if (condition) {
    console.log(`  ✓ ${label}`);
  } else {
    errors.push(`${label}: ${detail}`);
    console.log(`  ✗ ${label} — ${detail}`);
  }
}

// ─── Slug uniqueness ───────────────────────────────────────────────────────
console.log("\n[1] Slug uniqueness");
{
  const seen = new Map();
  let dupes = 0;
  for (const list of [ingredients, techniques, recipes]) {
    for (const r of list) {
      if (seen.has(r.slug)) {
        errors.push(`Duplicate slug: ${r.slug}`);
        dupes++;
      }
      seen.set(r.slug, true);
    }
  }
  check(
    "All slugs are unique across ingredients, techniques and recipes",
    dupes === 0,
    `Found ${dupes} duplicate slug(s)`
  );
}

// ─── ID uniqueness ─────────────────────────────────────────────────────────
console.log("\n[2] ID uniqueness");
{
  const seen = new Map();
  let dupes = 0;
  for (const list of [ingredients, techniques, recipes, recipeIngredients, recipeSteps, recipeTechniques]) {
    for (const r of list) {
      if (seen.has(r.id)) {
        errors.push(`Duplicate id: ${r.id}`);
        dupes++;
      }
      seen.set(r.id, true);
    }
  }
  check("All ids are unique across all data files", dupes === 0, `${dupes} duplicate id(s)`);
}

// ─── (recipeId, ingredientId) uniqueness (schema constraint) ───────────────
console.log("\n[3] RecipeIngredient unique constraint");
{
  const seen = new Set();
  let dupes = 0;
  for (const ri of recipeIngredients) {
    const k = `${ri.recipeId}::${ri.ingredientId}`;
    if (seen.has(k)) {
      errors.push(`Duplicate (recipeId, ingredientId): ${k}`);
      dupes++;
    }
    seen.add(k);
  }
  check(
    "No duplicate (recipeId, ingredientId) pairs",
    dupes === 0,
    `Found ${dupes} duplicate pair(s)`
  );
}

// ─── (recipeId, order) uniqueness for steps ───────────────────────────────
console.log("\n[4] RecipeStep order uniqueness");
{
  const seen = new Set();
  let dupes = 0;
  for (const rs of recipeSteps) {
    const k = `${rs.recipeId}::${rs.order}`;
    if (seen.has(k)) {
      errors.push(`Duplicate (recipeId, order): ${k}`);
      dupes++;
    }
    seen.add(k);
  }
  check(
    "No duplicate (recipeId, order) pairs in steps",
    dupes === 0,
    `Found ${dupes} duplicate pair(s)`
  );
}

// ─── Foreign keys resolve ─────────────────────────────────────────────────
console.log("\n[5] Foreign key resolution");
{
  const ingIds = new Set(ingredients.map((i) => i.id));
  const techIds = new Set(techniques.map((t) => t.id));
  const recipeIds = new Set(recipes.map((r) => r.id));

  let badRi = 0;
  for (const ri of recipeIngredients) {
    if (!recipeIds.has(ri.recipeId)) {
      errors.push(`RecipeIngredient ${ri.id}: unknown recipeId ${ri.recipeId}`);
      badRi++;
    }
    if (!ingIds.has(ri.ingredientId)) {
      errors.push(`RecipeIngredient ${ri.id}: unknown ingredientId ${ri.ingredientId}`);
      badRi++;
    }
  }
  check(
    "All RecipeIngredient.recipeId and ingredientId resolve",
    badRi === 0,
    `${badRi} bad reference(s)`
  );

  let badRs = 0;
  for (const rs of recipeSteps) {
    if (!recipeIds.has(rs.recipeId)) {
      errors.push(`RecipeStep ${rs.id}: unknown recipeId ${rs.recipeId}`);
      badRs++;
    }
    if (rs.techniqueId && !techIds.has(rs.techniqueId)) {
      errors.push(`RecipeStep ${rs.id}: unknown techniqueId ${rs.techniqueId}`);
      badRs++;
    }
  }
  check(
    "All RecipeStep.recipeId and techniqueId resolve",
    badRs === 0,
    `${badRs} bad reference(s)`
  );

  let badRt = 0;
  for (const rt of recipeTechniques) {
    if (!recipeIds.has(rt.recipeId)) {
      errors.push(`RecipeTechnique ${rt.id}: unknown recipeId ${rt.recipeId}`);
      badRt++;
    }
    if (!techIds.has(rt.techniqueId)) {
      errors.push(`RecipeTechnique ${rt.id}: unknown techniqueId ${rt.techniqueId}`);
      badRt++;
    }
  }
  check(
    "All RecipeTechnique.recipeId and techniqueId resolve",
    badRt === 0,
    `${badRt} bad reference(s)`
  );
}

// ─── Every recipe has ≥2 ingredients ───────────────────────────────────────
console.log("\n[6] Recipe ingredient count");
{
  const counts = new Map();
  for (const ri of recipeIngredients) {
    counts.set(ri.recipeId, (counts.get(ri.recipeId) || 0) + 1);
  }
  let bad = 0;
  for (const r of recipes) {
    const c = counts.get(r.id) || 0;
    if (c < 2) {
      errors.push(`Recipe ${r.id} (${r.nameEn}) has only ${c} ingredient(s)`);
      bad++;
    }
  }
  check(
    "All recipes have ≥2 ingredients",
    bad === 0,
    `${bad} recipe(s) below threshold`
  );
}

// ─── At least 30 recipes have a "key" ingredient flagged ──────────────────
console.log("\n[7] Key ingredient coverage");
{
  const recipesWithKey = new Set();
  for (const ri of recipeIngredients) {
    if (ri.isKey) recipesWithKey.add(ri.recipeId);
  }
  const count = recipesWithKey.size;
  check(
    `At least 30 recipes have ≥1 key ingredient (actual: ${count})`,
    count >= 30,
    `Only ${count} recipes have a key ingredient flagged`
  );
}

// ─── Every recipe has ≥3 steps ────────────────────────────────────────────
console.log("\n[8] Recipe step count");
{
  const counts = new Map();
  for (const rs of recipeSteps) {
    counts.set(rs.recipeId, (counts.get(rs.recipeId) || 0) + 1);
  }
  let bad = 0;
  for (const r of recipes) {
    const c = counts.get(r.id) || 0;
    if (c < 3) {
      errors.push(`Recipe ${r.id} (${r.nameEn}) has only ${c} step(s)`);
      bad++;
    }
  }
  check(
    "All recipes have ≥3 steps",
    bad === 0,
    `${bad} recipe(s) below threshold`
  );
}

// ─── Ingredient category values are valid ─────────────────────────────────
console.log("\n[9] Ingredient category enum");
{
  const valid = new Set([
    "BASE_SPIRIT", "LIQUEUR", "WINE", "JUICE", "SYRUP", "BITTERS",
    "SODA", "DAIRY", "HERB_SPICE", "GARNISH", "OTHER",
  ]);
  let bad = 0;
  for (const i of ingredients) {
    if (!valid.has(i.category)) {
      errors.push(`Ingredient ${i.id}: invalid category ${i.category}`);
      bad++;
    }
  }
  check("All ingredient categories are valid enum values", bad === 0, `${bad} bad category value(s)`);
}

// ─── Recipe type values are valid ─────────────────────────────────────────
console.log("\n[10] Recipe type enum");
{
  const valid = new Set(["CLASSIC", "INNOVATIVE"]);
  let bad = 0;
  for (const r of recipes) {
    if (!valid.has(r.type)) {
      errors.push(`Recipe ${r.id}: invalid type ${r.type}`);
      bad++;
    }
  }
  check("All recipe types are valid enum values", bad === 0, `${bad} bad type value(s)`);
}

// ─── Technique category values are valid ──────────────────────────────────
console.log("\n[11] Technique category enum");
{
  const valid = new Set([
    "SHAKE", "STIR", "ROLL", "BUILD", "MUDDLE", "STRAIN", "WASH", "GARNISH", "PREP",
  ]);
  let bad = 0;
  for (const t of techniques) {
    if (!valid.has(t.category)) {
      errors.push(`Technique ${t.id}: invalid category ${t.category}`);
      bad++;
    }
  }
  check("All technique categories are valid enum values", bad === 0, `${bad} bad category value(s)`);
}

// ─── Counts summary ───────────────────────────────────────────────────────
console.log("\n[12] Counts");
console.log(`  Total ingredients: ${ingredients.length}`);
console.log(`  Total recipes: ${recipes.length}`);
console.log(`  Total techniques: ${techniques.length}`);
console.log(`  Total recipe-ingredients: ${recipeIngredients.length}`);
console.log(`  Total recipe-steps: ${recipeSteps.length}`);
console.log(`  Total recipe-techniques: ${recipeTechniques.length}`);

// ─── Full dump of one recipe (Negroni) ────────────────────────────────────
console.log("\n[13] Full dump of sample recipe: Negroni");
{
  const negroni = recipes.find((r) => r.id === "rec-negroni");
  if (!negroni) {
    errors.push("Sample recipe rec-negroni not found");
    console.log("  ✗ rec-negroni not found");
  } else {
    console.log(`  Recipe: ${negroni.nameZh} / ${negroni.nameEn}`);
    console.log(`  Slug:   ${negroni.slug}`);
    console.log(`  Type:   ${negroni.type} | Difficulty: ${negroni.difficulty}`);
    console.log(`  Glass:  ${negroni.glassType} | Ice: ${negroni.iceType}`);
    console.log(`  Desc:   ${negroni.descriptionZh}`);
    console.log(`  Story:  ${negroni.storyNoteZh}`);
    console.log(`  Tags:   ${negroni.balanceTags.join(", ")}`);

    console.log("\n  Ingredients:");
    const ris = recipeIngredients
      .filter((ri) => ri.recipeId === "rec-negroni")
      .sort((a, b) => a.order - b.order);
    for (const ri of ris) {
      const ing = ingredients.find((i) => i.id === ri.ingredientId);
      const key = ri.isKey ? "★" : " ";
      const opt = ri.optional ? "(optional)" : "";
      console.log(`    ${key} ${ri.amount.padEnd(8)} ${ing ? ing.nameZh : "?"} / ${ing ? ing.nameEn : "?"} ${opt}`);
      if (ri.notesEn) console.log(`             ↳ ${ri.notesEn}`);
    }

    console.log("\n  Steps:");
    const rss = recipeSteps
      .filter((s) => s.recipeId === "rec-negroni")
      .sort((a, b) => a.order - b.order);
    for (const s of rss) {
      const tech = s.techniqueId ? techniques.find((t) => t.id === s.techniqueId) : null;
      const dur = s.duration ? ` [${s.duration}]` : "";
      const techName = tech ? ` → ${tech.nameZh} (${tech.nameEn})` : "";
      console.log(`    ${s.order}. ${s.instructionZh}${dur}${techName}`);
      if (s.instructionEn) console.log(`       EN: ${s.instructionEn}`);
      if (s.tipZh) console.log(`       TIP: ${s.tipZh}`);
    }

    console.log("\n  Techniques (many-to-many):");
    const rts = recipeTechniques.filter((rt) => rt.recipeId === "rec-negroni");
    for (const rt of rts) {
      const t = techniques.find((tt) => tt.id === rt.techniqueId);
      console.log(`    • ${t ? `${t.nameZh} (${t.nameEn})` : rt.techniqueId}`);
    }
  }
}

// ─── Final result ─────────────────────────────────────────────────────────
console.log("\n" + "=".repeat(60));
if (errors.length === 0) {
  console.log(`✓ All checks passed. ${warnings.length} warning(s).`);
  process.exit(0);
} else {
  console.log(`✗ ${errors.length} error(s) found:`);
  for (const e of errors) console.log(`  - ${e}`);
  process.exit(1);
}
