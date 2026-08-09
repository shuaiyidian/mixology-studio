// assign-popularity.cjs
// Sets the `popularity` field (0-100) on every recipe based on a small lookup
// of well-known names plus category defaults. Idempotent — re-running just
// overwrites the field. Committed to repo for reproducibility.

const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(__dirname, "data", "recipes.json");

// Iconic cocktails everyone knows (100 = universal). Anything not in this map
// falls back to the per-type default below.
const FAMOUS = {
  // 100 — universal icons
  "old-fashioned": 100,
  "negroni": 100,
  "old-fashioned-cocktail": 100,
  // 99-95 — world-famous
  "manhattan": 99,
  "daiquiri": 99,
  "margarita": 99,
  "martini": 98,
  "whiskey-sour": 98,
  "moscow-mule": 97,
  "gin-and-tonic": 97,
  "mojito": 97,
  "cosmopolitan": 96,
  "espresso-martini": 96,
  "bloody-mary": 96,
  "margarita-cocktail": 96,
  "dry-martini": 97,
  "tom-collins": 95,
  "aperol-spritz": 95,
  "negroni-sbagliato": 95,
  // 94-90 — very well known
  "french-75": 94,
  "amaretto-sour": 93,
  "penicillin": 93,
  "dark-and-stormy": 93,
  "long-island-iced-tea": 93,
  "sex-on-the-beach": 92,
  "lemon-drop-martini": 92,
  "negroni-cocktail": 92,
  "whiskey-sour-cocktail": 91,
  "pina-colada": 91,
  "mai-tai": 90,
  "last-word": 90,
  "boulevardier": 90,
  // 89-85 — well-known classics
  "sidecar": 89,
  "gimlet": 89,
  "bees-knees": 88,
  "harvard": 88,
  "pisco-sour": 88,
  "aviation": 87,
  "sazerac": 87,
  "bramble": 86,
  "paper-plane": 86,
  "naked-and-famous": 85,
  // 84-80 — known to enthusiasts
  "clover-club": 84,
  "corpse-reviver-2": 84,
  "harvard-cocktail": 84,
  "ramos-gin-fizz": 83,
  "south-side": 82,
  "martinez": 82,
  "hemingway-daiquiri": 81,
  "old-pal": 80,
  "corpse-reviver-1": 80,
  "bijou": 80,
  // 79-75
  "lucien-gaudin": 78,
  "division-bell": 76,
  "twenty-twentieth-century": 75,
  "20th-century": 75,
  "bronx": 75,
  "oaxaca-old-fashioned": 75,
  // Mocktails (slightly lower — less mainstream)
  "shirley-temple": 78,
  "virgin-mary": 75,
  "shirley-temple-cocktail": 78,
  "no-jito": 70,
  "nojito": 70,
  "seedlip-sour": 55,
  "phony-negroni": 55,
  "hibiscus-cooler": 60,
};

// Per-type default for everything not in FAMOUS. CLASSIC gets a healthy
// floor; INNOVATIVE sits lower.
const TYPE_DEFAULT = {
  CLASSIC: 65,
  INNOVATIVE: 45,
};

function main() {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  const recipes = JSON.parse(raw);
  let setCount = 0;
  let fallbackCount = 0;

  for (const r of recipes) {
    const fromMap = FAMOUS[r.slug];
    if (fromMap !== undefined) {
      r.popularity = fromMap;
      setCount++;
    } else {
      r.popularity = TYPE_DEFAULT[r.type] ?? 60;
      fallbackCount++;
    }
  }

  // Preserve key order (popularity right after balanceTags is conventional
  // but TypeScript is structural — we just append it at the end for safety).
  fs.writeFileSync(DATA_PATH, JSON.stringify(recipes, null, 2) + "\n", "utf-8");

  console.log(`✓ Set popularity on ${recipes.length} recipes`);
  console.log(`  - ${setCount} from FAMOUS lookup`);
  console.log(`  - ${fallbackCount} from type default`);

  // Distribution report
  const buckets = { "90+": 0, "80-89": 0, "70-79": 0, "60-69": 0, "<60": 0 };
  for (const r of recipes) {
    const p = r.popularity;
    if (p >= 90) buckets["90+"]++;
    else if (p >= 80) buckets["80-89"]++;
    else if (p >= 70) buckets["70-79"]++;
    else if (p >= 60) buckets["60-69"]++;
    else buckets["<60"]++;
  }
  console.log("  Distribution:");
  for (const [k, v] of Object.entries(buckets)) {
    console.log(`    ${k}: ${v}`);
  }
}

main();
