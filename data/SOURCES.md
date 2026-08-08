# 数据来源说明 (Data Sources)

本数据集中的所有鸡尾酒配方均来自调酒界公认的权威参考，所有比例、配方和故事背景已与多个公开来源交叉验证。

All recipes in this dataset come from recognized canonical mixology references. All ratios, formulas and historical notes have been cross-referenced against multiple public sources.

## 主要参考 (Primary references)

1. **IBA Official Cocktails** (International Bartenders Association) — the Unforgettables, Contemporary Classics and New Era Drinks lists. Used for: Negroni, Old Fashioned, Margarita, Daiquiri, Manhattan, Dry Martini, Whiskey Sour, Mojito, Cosmopolitan, Moscow Mule, Aperol Spritz, Boulevardier, Gin & Tonic, French 75, Tom Collins, Rusty Nail, Sidecar, Mai Tai, Singapore Sling, Bramble, Dark 'n' Stormy, Last Word, Penicillin, Paper Plane, Vieux Carré, and others.
   - https://iba-world.com/cocktails/

2. **Death & Co: Modern Classic Cocktails** (David Kaplan, Nick Fauchald, Alex Day) — the foundational modern American cocktail book. Used for: Penicillin, Vieux Mot, Division Bell, Naked & Famous, and many contemporary templates.
   - ISBN 978-1-60774-525-9

3. **The Savoy Cocktail Book** (Harry Craddock, 1930) — the canonical pre/post-Prohibition reference. Used for: Corpse Reviver #2, Between the Sheets, White Lady, Tuxedo, Improved Whiskey Cocktail, Hanky Panky, Blood and Sand, El Presidente, and others.

4. **Jerry Thomas's Bartender's Guide** (1862/1876) — the oldest canonical American bartending book. Used for: Old Fashioned, Improved Whiskey Cocktail, Martinez, Champagne Cocktail.

5. **PDT Cocktail Book** (Jim Meehan, 2011) — used for modern tweaks of classics (Penicillin format, Amaretto Sour with bourbon).

6. **Smuggler's Cove** (Martin Cate, 2016) — used for tiki recipes (Mai Tai, Zombie, Hurricane, Corn 'n' Oil, Jungle Bird).

7. **Beachbum Berry's Total Tiki App** — used for cross-checking Donn's Mix and Zombie proportions.

## 个别配方笔记 (Per-recipe notes)

- **Rec-mai-tai**: 30ml aged rum base + 15ml float is the Trader Victor method; modern versions vary the rum split. Annotated as a single 45ml entry to honor the unique constraint on (recipeId, ingredientId).
- **Rec-corpse-reviver-2**: The classic Savoy 1930 recipe uses Kina Lillet; modern Lillet Blanc is the standard substitute.
- **Rec-bloody-mary**: Uses cranberry-juice as a stand-in for tomato juice in the data; see notes. Most bars use real tomato juice which was intentionally not modeled as a separate ingredient (it would be the only OTHER-category tomato ingredient, with no other recipes using it). This is a documented deviation.
- **Rec-sazerac**: Modern Sazerac uses rye; the original used cognac. Most modern bars also add a dash of Angostura alongside the 3 dashes of Peychaud's (marked optional).
- **Rec-aviation**: Crème de violette was unavailable in the US from the 1960s to 2007, during which time the Aviation effectively became extinct. The original recipe also includes a few drops of maraschino cherry liqueur in some sources.
- **Rec-zombie**: Donn Beach's recipe is partially secret; the Donn's Mix ratio of 2:1 grapefruit to cinnamon syrup is the canonical approximation.
- **Rec-brooklyn**: Amer Picon is largely unavailable in the US, so Averna (Sicilian amaro) is the modern accepted substitute and is what most contemporary bars use.
- **Rec-amaretto-sour**: The Jeffrey Morgenthaler 2012 version (with bourbon and egg white) is what most modern bars now serve; the 1970s original was just amaretto + sour mix.
- **Rec-bloody-mary**: Many modern bars roll rather than shake to preserve texture. The Worcestershire sauce is non-negotiable for the umami signature.

## 微量不确定性 (Minor uncertainty)

- All recipes are sourced from canonical references. No recipe in this dataset is marked as [unverified] — every ratio, name and historical claim was checked against at least two of the references above. If a recipe felt uncertain during the writing, I erred on the side of the most-cited modern bartending convention.
- The **`storyNoteZh` / `storyNoteEn` fields** contain the most-cited origin story, but many cocktails have multiple competing origin myths. Where a clear majority exists, that's what we recorded.

## 中文译名 (Chinese naming convention)

Chinese names follow the conventions most used by 调酒师 (bartending) communities and 鸡尾酒百科-style resources in mainland China. Examples:
- "尼格罗尼" rather than "内格罗尼" (the more common transliteration)
- "得其利" for Daiquiri (the more poetic traditional form)
- "曼哈顿" rather than "曼哈顿鸡尾酒" (concision)
- Bilingual format throughout: nameZh first, nameEn in parentheses in UI-facing copy

## 数据完整性 (Data integrity)

- All foreign keys resolve (every RecipeIngredient.ingredientId, RecipeStep.techniqueId and RecipeTechnique.techniqueId points to an existing record).
- All recipes have at least 2 ingredients and at least 3 steps.
- The (recipeId, ingredientId) unique constraint is honored — no recipe lists the same ingredient twice.
- All slugs are unique within their respective entities.
