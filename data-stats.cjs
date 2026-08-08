// data-stats.cjs — Quick per-recipe key-ingredient and step coverage report.
// Run with: node data-stats.cjs (from project root)

const fs = require("fs");
const path = require("path");

const recipes = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "recipes.json"), "utf8"));
const recipeIngredients = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "recipe-ingredients.json"), "utf8"));
const recipeSteps = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "recipe-steps.json"), "utf8"));
const recipeTechniques = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "recipe-techniques.json"), "utf8"));

const ingredients = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "ingredients.json"), "utf8"));
const techniques = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "techniques.json"), "utf8"));

const ingById = new Map(ingredients.map((i) => [i.id, i]));
const techById = new Map(techniques.map((t) => [t.id, t]));

console.log("Per-recipe coverage report:");
console.log("=".repeat(86));
console.log(
  "Recipe".padEnd(28) +
    "Diff".padEnd(5) +
    "Ings".padEnd(5) +
    "Key".padEnd(5) +
    "Steps".padEnd(6) +
    "Techs".padEnd(6) +
    "Glass"
);
console.log("=".repeat(86));

for (const r of recipes) {
  const ings = recipeIngredients.filter((ri) => ri.recipeId === r.id);
  const keys = ings.filter((ri) => ri.isKey).length;
  const steps = recipeSteps.filter((s) => s.recipeId === r.id).length;
  const techs = new Set(
    recipeTechniques.filter((rt) => rt.recipeId === r.id).map((rt) => rt.techniqueId)
  ).size;
  const label = `${r.nameZh} (${r.nameEn})`;
  console.log(
    label.padEnd(28) +
      String(r.difficulty).padEnd(5) +
      String(ings.length).padEnd(5) +
      String(keys).padEnd(5) +
      String(steps).padEnd(6) +
      String(techs).padEnd(6) +
      (r.glassType || "-")
  );
}

// Aggregate ingredient usage (top 15 most-used)
console.log("\nTop 15 most-used ingredients across all recipes:");
console.log("=".repeat(60));
const ingCount = new Map();
for (const ri of recipeIngredients) {
  ingCount.set(ri.ingredientId, (ingCount.get(ri.ingredientId) || 0) + 1);
}
const sorted = [...ingCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15);
for (const [id, count] of sorted) {
  const ing = ingById.get(id);
  console.log(`  ${String(count).padStart(3)}x  ${ing ? ing.nameZh : "?"} (${ing ? ing.nameEn : "?"})`);
}

// Aggregate technique usage
console.log("\nTechnique coverage across all recipes:");
console.log("=".repeat(60));
const techCount = new Map();
for (const rt of recipeTechniques) {
  techCount.set(rt.techniqueId, (techCount.get(rt.techniqueId) || 0) + 1);
}
for (const [id, count] of [...techCount.entries()].sort((a, b) => b[1] - a[1])) {
  const t = techById.get(id);
  console.log(`  ${String(count).padStart(3)}x  ${t ? t.nameZh : "?"} (${t ? t.nameEn : "?"})`);
}
