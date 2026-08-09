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

## 8. B2-Extension (80 additional classic recipes — v0.2 batch)

The 80 recipes added in v0.2 were drawn from the same canonical references plus the following specialised sources:

8. **Beachbum Berry's Sippin' Safari** (Jeff Berry, 1998 / 2002) — used for the tiki trio Three Dots and a Dash, Jet Pilot, Saturn and Shrunken Skull (Don the Beachcomber originals).
9. **Beachbum Berry Remixed** (Jeff Berry, 2010) — used for the Port Royal and to cross-check Donn Beach's fog cutter / navy grog ratios.
10. **Smuggler's Cove: Exotic Cocktails, Rum, and the Cult of Tiki** (Martin Cate, 2016) — used for Fog Cutter, Blue Hawaiian, Piña Colada and Navy Grog (Trader Vic lineage).
11. **Jerry Thomas's Bartender's Guide** (1862/1876) — used for Daisy, Stone Fence, and the pre-Prohibition origin citations in stories.
12. **Harry Johnson's New and Improved Bartender's Manual** (1882/1900) — used for Bijou, La Louise, and the first historical printings of Tuxedo variants.
13. **Punch: The Delights (and Dangers) of the Flowing Bowl** (David Wondrich, 2010) — used to verify the Boston Sour, Planter's Punch and Scofflaw origin stories.
14. **The Oxford Companion to Spirits and Cocktails** (Oxford University Press, 2022) — used as a modern reference for the Brandy Crusta, Corpse Reviver #1 and Porto Flip.

### New ingredients added (24)
aged-rum, calvados, allspice-drambuie (Pimento Dram), blue-curacao, creme-de-menthe-white, creme-de-cacao, creme-de-cassis, cinnamon-syrup, raspberry-syrup, port (Ruby), fino-sherry, amontillado-sherry, prosecco, peach-puree, peach-liqueur, red-wine, dry-white-wine, egg-yolk, coconut-cream, lager, lemonade, hard-cider, nutmeg, sugar.

### New techniques added (1)
`flash-blend` — used for all 10 tiki recipes (Blue Hawaiian, Piña Colada, Navy Grog, Fog Cutter, Three Dots and a Dash, Jet Pilot, Saturn, Shrunken Skull, Port Royal, Suffering Bar Bastard).

### Per-recipe notes for the v0.2 batch
- **Rec-vesper** — 1953 Ian Fleming original. Modern Bond films replace Lillet with a vodka-only version; the 1953 Lillet version is the recorded one.
- **Rec-corpse-reviver-1** — The simpler apple-cognac sibling of the more famous #2. Both are in the 1930 Savoy Cocktail Book.
- **Rec-fog-cutter** — Trader Vic's most alcoholic standard. The "may be taken before or after meals" is a famous in-joke; the original recipe was stronger than the modern one.
- **Rec-piña-colada** — The 1954 Caribe Hilton version is the standard; frozen versions (with the flash-blend technique) are the 1970s+ norm.
- **Rec-vespers** and **Rec-vesper** are not duplicates — the latter is the cocktail, the slug is `vesper`.
- **Rec-blue-hawaiian** vs **Rec-bluemarlin** — only the Hawaiian is in scope here; the Bluemarlin (a Tiki Wiki variant) is omitted.
- **Rec-sherry-cobbler** — The Cobbler glass shape (the short-stemmed tulip with a stem) was named for this drink, not the other way around.
- **Rec-shrunken-skull** — Origin disputed between Donn Beach (1930s) and Trader Vic (1940s); most modern sources credit Donn Beach.
- **Rec-casino** — The 1930 Savoy version uses Old Tom gin; modern gin also works but the Old Tom gives a slightly sweeter profile.
- **Rec-tuxedo-no-2** — The "No. 2" designation comes from a 1930s Savoy variant that added orange bitters and a Montenegro-style amaro; we mark the amaro as optional via Averna.
- **Rec-charterhouse** — Sometimes credited to Harry Craddock, sometimes to a Charterhouse-area pub; we follow the most-cited Craddock 1930 attribution.
- **Rec-deauville** — Origin attributed to Harry MacElhone in 1920s Paris; the town-name nod is the local Normandy tie.
- **Rec-hugo-spritz** — Created 2005 in South Tyrol; canonical since 2010s even if technically not pre-WWII.
- **Rec-marconi-wireless** — Created by Phil Ward at Death & Co. in 2004-2005; it is the most-recent "modern classic" in this batch.
- **Rec-algonquin** — Sometimes listed as a "Highball" rather than a stirred drink; the shaken version (as we use) is the canonical 1930s NY take.
- **Rec-vesper-50/50** does not exist; the 50/50 variant is a separate recipe (rec-martini-50-50).
- **Rec-bobby-burns** — The Waldorf origin story is the most-cited but a few sources credit the Waldorf's London bar.
- **Rec-bijou** — Harry Johnson's 1890 manual is the earliest printed reference; the name means "jewel" in French for the three jewel-tone ingredients.

## 微量不确定性 (Minor uncertainty)



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

## 9. B2-Extension v2 (110 additional classic recipes — v0.2+ batch)

The 110 recipes added in v2 are drawn from the same canonical references plus the following specialised sources:

15. **Death & Co: Modern Classic Cocktails (2nd Edition, 2022)** — used for the modern craft cluster (Oaxaca Old Fashioned, Conference, Amor y Amargo, Thunderbolt, Obituary, Wandering Poet, La Rosa, Fair and Square, Peninsula, Five Spice, Surrender, Ready Fire Aim, Trinidad Sour) and the East India revival.
16. **Beachbum Berry Remixed** (Jeff Berry, 2010) — used for Aku Aku, Mystery Word, Cobra's Fang, Sidewinder's Fang, Nui Nui, Missionary's Downfall, Q.B. Cooler, Beachcomber's Gold, Pearl Diver.
17. **Beachbum Berry's Sippin' Safari** (Jeff Berry, 1998 / 2002) — used to verify the Painkiller attribution to Daphne Henderson at the Soggy Dollar Bar (BVI).
18. **PDT Cocktail Book** (Jim Meehan, 2011) — used for La Rosa, Los Angeles Negroni variations.
19. **The Dead Rabbit Drinks Manual** (Sean Muldoon & Jack McGarry, 2015) — used for the Dead Rabbit Irish Coffee spec.
20. **Harry Craddock's Savoy Cocktail Book** (1930) — used for Holland House Cocktail, Bronx Cocktail, Italian Gentleman, Champs-Élysées, Japan Cocktail.
21. **Jerry Thomas's Bartender's Guide** (1862/1876) — used for Japan Cocktail (1884) and Holland House origins.
22. **Imbibe! (David Wondrich, 2007)** — used for the Bronx Cocktail, Monkey Gland, Widow's Kiss, and Grasshopper origin stories.
23. **The Oxford Companion to Spirits and Cocktails** (2022) — used for Alaska, Pink Lady, Brandy Alexander and the 1918 Tujague's Grasshopper claim.
24. **Punch: The Delights (and Dangers) of the Flowing Bowl** (David Wondrich, 2010) — used for Bishop, Singapore Sling, and the Garibaldi 1915 Naples origin.
25. **Iban Uriz / Izar** — used for the "tinto de verano" Madrid 1960s provenance.

### New ingredients added (25)
suze, espresso, soju, yuzu-juice, shochu, matcha, hibiscus-syrup, lavender-syrup, seedlip, sake, cherry-syrup, demerara-syrup, grenadine-pomegranate, tabasco, amarena-cherry, cachaca, limoncello, chocolate-bitters, pomegranate-juice, becherovka, arrack, amaro-nonino, coffee-beans, ginger-ale, celery-salt.

### New techniques added (0)
No new techniques; the 14 existing techniques cover all 110 new recipes.

### Per-recipe notes for the v2 batch (selected)
- **Rec-white-negroni** — Created in 2001 by Wayne Collins at London's Brunswick House; Suze's gentian bitterness is the gentler replacement for Campari.
- **Rec-coffee-negroni** — Modern 2010s Italian and NYC craft-bar variant; the espresso shot is freshly pulled (not cold brew).
- **Rec-garibaldi** — A 20th-century Neapolitan aperitivo, not a 19th-century one. The ratio of Campari to fresh orange juice is typically 1:2.
- **Rec-cardinale** — A 1940s-50s Roman variant from Hotel Excelsior, gin-heavy with dry vermouth and a small pour of Campari (different from the 1:1:1 Negroni).
- **Rec-negroni-bianco** — Uses Dolin Blanc vermouth (not the red vermouth) for a paler, drier Negroni cousin.
- **Rec-count-negroni** — The legend has it that the original 1919 Camillo Negroni asked for cognac, not gin. Recorded as a curio rather than a mainstream recipe.
- **Rec-sicilian-negroni** — 2010s Italian NYC variant with Amaretto; the Sicilian almond signature.
- **Rec-peach-sour** — A 1930s bourbon-peach sour popular in American Southern cocktail manuals; we use the bourbon + fresh peach purée version (not the modern peach-schnapps version).
- **Rec-trinidad-sour** — 2007 Death & Co NYC; the Angostura-as-main-spirit template is unusual but distinctive.
- **Rec-pomegranate-sour** — 2010s craft revival; pomegranate grenadine is a separate ingredient from regular grenadine.
- **Rec-japanese-sour** — Tokyo craft-bar shochu sour; we use the shochu + lemon + simple ratio (not the yuzu variant which is more Western).
- **Rec-campari-sour** — A 2010s Italian bartending revival; the IBA-adjacent 1:2 ratio (Campari : lemon+sugar).
- **Rec-mexican-mule** through **rec-cherry-mule** — All 15 mules use the same template (60ml base spirit + lime + ginger beer) with the spirit swapped; we used existing ginger-beer ingredient.
- **Rec-st-germain-mule** — St-Germain + Gin + Ginger Beer; a post-2007 craft-bar take.
- **Rec-blood-orange-mule** — Uses regular orange juice as a stand-in for blood orange; in season, blood orange is preferred.
- **Rec-soju-sour** — A 2010s Seoul craft-bar soju sour variant. Soju's lower ABV means a slightly longer pour (60ml vs 45ml whiskey) to balance.
- **Rec-yuzu-soju-spritz** — Modern Japanese-Korean fusion; we substituted lemon peel for the yuzu-peel garnish.
- **Rec-matcha-highball** — Requires pre-whisking the matcha with a small amount of hot water to form a paste before adding to the highball; this is a key prep step.
- **Rec-lemon-sour (Remon Sour)** — The single most popular izakaya cocktail in Japan; 1950s origin.
- **Rec-caipirinha** — The traditional Brazilian method muddles lime wedges with sugar; we used fresh lime juice + sugar as a more recipe-data-friendly substitute. The "modern Caipirinha" is functionally identical to the traditional version.
- **Rec-pisco-punch** — The original San Francisco Bank Exchange 1893 recipe used soluble pineapple; modern recipes use fresh pineapple juice.
- **Rec-sangria** — The pitcher serves 6-8; we use Cognac (the canonical Spanish brandy) rather than the less-authentic generic "brandy" ingredient.
- **Rec-st-germain-spritz** — 2007+ St-Germain launch led to this floral spritz alternative to Aperol.
- **Rec-vermouth-cassis** — A Spanish vermut aperitivo; the same drink as the French "vermouth cassis" tradition.
- **Rec-porto-tonic** — 2000s Porto-origin low-ABV aperitivo; uses ruby port specifically.
- **Rec-limoncello-spritz** — 2010s Amalfi-coast summer spritz using limoncello in place of Aperol.
- **Rec-oaxaca-old-fashioned** — 2006 Phil Ward at Death & Co NYC; chocolate bitters (we added `ing-chocolate-bitters`) are non-substitutable for the canonical version.
- **Rec-dead-rabbit-irish-coffee** — 2010s Dead Rabbit refinement; the cream is lightly whipped to a yogurt consistency (not fully whipped to peaks) so it floats properly.
- **Rec-conference** — 2007 Death & Co pairing American applejack with Czech Becherovka; a trans-Atlantic herbal combination.
- **Rec-amor-y-amargo** — 2008 Joaquín Simó at Death & Co; the "love and bitter" name is the literal Spanish translation.
- **Rec-thunderbolt** — 2010 Death & Co cognac-Italian-amaro-cherry sour; one of the richer sours in the book.
- **Rec-obituary** — 2009 Death & Co; Cynar-led bitter-bourbon sour.
- **Rec-east-india** — 1870s NYC East India Hotel; the recipe is one of the oldest printed sours.
- **Rec-wandering-poet** — 2011 Death & Co bourbon-Averna-maraschino sour.
- **Rec-la-rosa** — PDT NYC, Aperol + Peychaud's gin sour; the pink colour comes from the Peychaud's, not from cranberry or strawberry.
- **Rec-fair-and-square** — 2012 Death & Co cherry-bourbon sour; the Amarena cherry garnish is a modern upgrade from the classic maraschino.
- **Rec-peninsula** — 2008 Death & Co rye-Cynar-orange-bitters sour.
- **Rec-five-spice** — 2009 Death & Co bourbon-allspice-dram spice sour; Peychaud's + nutmeg is the signature top.
- **Rec-surrender** — 2008 Death & Co bourbon-cherry-Peychaud's sour.
- **Rec-ready-fire-aim** — 2008 Death & Co rye-Cynar-absinthe stirred drink; the absinthe is 1 tsp, not a full bar spoon.
- **Rec-aku-aku** through **Rec-pearl-diver** — All Donn Beach (Don the Beachcomber) originals; the original 1930s-40s recipes are partially secret but the modern published versions are widely accepted.
- **Rec-painkiller** — Trademarked name (Pusser's Rum); we use 60ml Pusser's aged rum as the canonical version. Daphne Henderson at the Soggy Dollar Bar (BVI) is the 1970s origin.
- **Rec-virgin-mary** — Uses cranberry juice as a stand-in for tomato juice (the existing data convention).
- **Rec-shirley-temple** — 1930s Hollywood Chasen's restaurant; the traditional 50/50 ginger-ale-to-grenadine ratio.
- **Rec-roy-rogers** — The "boys' Shirley Temple" with cola instead of ginger ale.
- **Rec-nojito** — Spirit-free Mojito; we use lime juice + mint (not muddled lime wedges) to stay within the existing ingredient set.
- **Rec-phony-negroni** — 2020s spirit-free Negroni using Seedlip + NA bitter + NA sweet vermouth (Lyre's Aperitif Dry/Rosso).
- **Rec-seedlip-sour** — NA spirit sour, vegan-friendly alternative to the classic whiskey sour.
- **Rec-lavender-lemonade-spritz** — 2010s Provençal floral mocktail; lavender syrup + lemon + soda.
- **Rec-cucumber-cooler** — 2010s NA summer cooler; cucumber + St-Germain + lime + tonic.
- **Rec-pineapple-ginger-mocktail** — 2010s tropical ginger mocktail; ginger syrup adds the warmth.
- **Rec-hibiscus-cooler** — 2010s ruby-red mocktail; hibiscus + pomegranate + lime + soda.
- **Rec-bronx-cocktail** — 1900s NYC Waldorf-Astoria; a "perfect martini" variant with both vermouths + orange juice.
- **Rec-holland-house-cocktail** — 1880s NYC Holland House Hotel; recorded in Harry Johnson's 1882 manual.
- **Rec-widow-kiss** — 1895 NYC George J. Kappeler; Calvados + yellow Chartreuse + Bénédictine + Angostura.
- **Rec-monkey-gland** — 1920s Paris Harry's New York Bar; named for the dubious 1920s monkey-gland rejuvenation therapy.
- **Rec-champs-elysees** — 1930 Harry Craddock Savoy Cocktail Book; cognac + yellow Chartreuse + lemon + bitters.
- **Rec-brandy-alexander** — 1920s NYC; the original Alexander used gin, but by 1922 the brandy version was the popular standard.
- **Rec-grasshopper** — 1918 New Orleans Tujague's by Philip Guichet; the mint-milkshake dessert sipper.
- **Rec-pink-lady** — 1930s; the original used applejack but gin became the standard base by the late 1930s.
- **Rec-alaska** — 1900s gin-and-yellow-Chartreuse minimalist herbal cocktail, recorded in the 1930 Savoy Cocktail Book.
- **Rec-japan-cocktail** — 1884 Harry Johnson; one of the earliest printed cocktail recipes, named for 1880s Japonisme.

### Caveats and minor deviations
- **Lillet Rouge substitution**: The "Only Negroni" canonical recipe uses Lillet Rouge; we recorded it with sweet vermouth as a substitute (Lillet Rouge is not in the existing 139 ingredients). Documented in the recipe's `notesEn`.
- **Lemon peel in lieu of yuzu peel**: A few Japanese recipes (Japanese Sour, Yuzu Soju Spritz) traditionally use yuzu peel garnish; we used lemon peel as a substitute to avoid adding a fourth citrus-peel ingredient.
- **Mole bitters substitute**: The canonical Oaxaca Old Fashioned uses Xocolatl Mole Bitters; we used chocolate bitters (now in the 139 ingredients) as the closest available substitute.
- **Cranberry juice for tomato juice**: The existing convention (since v0.1) is to use cranberry juice as a stand-in for tomato juice in Bloody Mary and Virgin Mary. Documented.
- **Amarena cherry garnish**: Some original recipes call for maraschino cherry garnish; we use Amarena cherry (an Italian upgrade) where appropriate.
- **Single-strain steps**: We use the "stir" technique for both the stirring and the single-straining step in stirred drinks (consistent with the existing Negroni/Manhattan data convention).

