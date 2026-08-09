# B2-Extension v2: 100 More Classic Recipes — Plan

**Status:** In progress
**Goal:** Expand from 142 → 242+ classic recipes (this batch adds 100)
**Already in dataset (142 — will NOT duplicate):** see `inspect-data.py` output, full list of 142 slugs.

## New ingredient additions (22)

| Slug | nameZh | nameEn | category | Used in |
|------|--------|--------|----------|---------|
| suze | 仙子 | Suze (French Gentian) | LIQUEUR | White Negroni |
| espresso | 浓缩咖啡 | Fresh Espresso | OTHER | Coffee Negroni, Dead Rabbit Irish Coffee |
| soju | 烧酒 | Soju (Korean) | BASE_SPIRIT | Soju Sour, Yuzu Soju Spritz |
| yuzu-juice | 柚子汁 | Yuzu Juice | JUICE | Yuzu Soju Spritz |
| shochu | 烧酎 | Shochu (Japanese) | BASE_SPIRIT | Chu-Hai, Lemon Sour, Japanese Sour |
| matcha | 抹茶 | Matcha Powder | HERB_SPICE | Matcha Highball |
| hibiscus-syrup | 洛神花糖浆 | Hibiscus Syrup | SYRUP | Hibiscus Cooler, Hibiscus Negroni |
| lavender-syrup | 薰衣草糖浆 | Lavender Syrup | SYRUP | Lavender Lemonade Spritz |
| seedlip | 思培露 | Seedlip (non-alcoholic spirit) | BASE_SPIRIT | Phony Negroni, Seedlip Sour |
| sake | 清酒 | Sake (Japanese) | BASE_SPIRIT | Sake Spritz, Matcha Highball |
| cherry-syrup | 樱桃糖浆 | Cherry Syrup | SYRUP | Cherry Sour |
| demerara-syrup | 德麦拉拉糖浆 | Demerara Syrup | SYRUP | Pearl Diver, Pearl Diver-style tiki |
| grenadine-pomegranate | 石榴红石榴糖浆 | Pomegranate Grenadine | SYRUP | Pomegranate Sour |
| tabasco | 塔巴斯科 | Tabasco (hot sauce) | BITTERS | Virgin Mary |
| amarena-cherry | 阿玛雷纳樱桃 | Amarena Cherry | GARNISH | garnish |
| cachaca | 卡沙萨 | Cachaça (Brazilian) | BASE_SPIRIT | Caipirinha, Batida de Coco, Rabo de Galo |
| limoncello | 柠檬酒 | Limoncello | LIQUEUR | Limoncello Spritz |
| chocolate-bitters | 可可苦精 | Chocolate Bitters | BITTERS | Oaxaca Old Fashioned |
| pomegranate-juice | 石榴汁 | Pomegranate Juice | JUICE | Pomegranate Sour, Hibiscus Cooler |
| becherovka | 贝赫罗夫卡 | Becherovka (Czech herbal) | LIQUEUR | Conference |
| arrack | 阿拉吉 | Arrack (Southeast Asian) | BASE_SPIRIT | Arrack Sour (use Bali/Batavia arrack) |
| amaro-nonino | 诺尼诺 | Amaro Nonino | LIQUEUR | Amaro Nonino Sour, 1884 (Death & Co) |

**Total: 22 new ingredients (≤ 25 cap).** All other needed ingredients already exist in the 114-current list.

## New techniques (0)

The existing 14 techniques (shake, dry-shake, stir, roll, build, muddle, double-strain, milk-wash, oil-wash, fat-wash, smoke, sugar-rim, express-peel, flash-blend) cover all 100 new recipes. No new technique needed.

## The 100 New Recipes (in 8 families)

### 1. Negroni family variants (15)
1. `white-negroni` — White Negroni (Suze + Lillet Blanc + Gin), 2001
2. `mezcal-negroni` — Mezcal Negroni (Mezcal + Campari + Sweet vermouth)
3. `coffee-negroni` — Coffee Negroni (Campari + Sweet vermouth + Espresso + Gin)
4. `garibaldi` — Garibaldi (Campari + Orange juice)
5. `italian-gentleman` — Italian Gentleman (Gin + Sweet vermouth + Campari + Lemon)
6. `cardinale` — Cardinale (Gin + Dry vermouth + Campari)
7. `hibiscus-negroni` — Hibiscus Negroni (Hibiscus-infused Gin + Campari + Sweet vermouth)
8. `the-only-negroni` — The Only Negroni (Gin + Campari + Lillet Rouge / Sweet vermouth, stirred)
9. `right-hand-negroni` — Right Hand (Bourbon + Campari + Sweet vermouth)
10. `pisco-negroni` — Pisco Negroni (Pisco + Campari + Sweet vermouth)
11. `chocolate-negroni` — Chocolate Negroni (Gin + Campari + Sweet vermouth + Crème de Cacao)
12. `dark-negroni` — Dark Negroni (Gin + Cynar + Sweet vermouth, no Campari)
13. `negroni-bianco` — Negroni Bianco (Gin + Dolin Blanc + Campari)
14. `count-negroni` — Count Negroni (1919 vintage variant, brandy + Campari + Sweet vermouth)
15. `sicilian-negroni` — Sicilian Negroni (Gin + Amaretto + Campari + Sweet vermouth)

**Skipped (already in 142):** Negroni, Boulevardier, Old Pal, Lucien Gaudin, Negroni Sbagliato, Tuxedo, Tuxedo No. 2

### 2. Sour family variants (15)
1. `peach-sour` — Peach Sour (Bourbon + Peach + Lemon + Egg white)
2. `apricot-sour` — Apricot Sour (Gin + Apricot brandy + Lemon)
3. `blackberry-sour` — Blackberry Sour (Gin + Crème de Mûre + Lemon + Egg white)
4. `cherry-sour` — Cherry Sour (Rye + Cherry Heering + Cherry syrup + Lemon)
5. `elderflower-sour` — Elderflower Sour (Gin + St-Germain + Lemon + Egg white)
6. `pomegranate-sour` — Pomegranate Sour (Gin + Pomegranate + Lemon)
7. `pineapple-sour` — Pineapple Sour (Rum + Pineapple + Lemon)
8. `mezcal-sour` — Mezcal Sour (Mezcal + Lemon + Agave + Egg white)
9. `demerara-sour` — Demerara Sour (Aged rum + Lemon + Demerara)
10. `calvados-sour` — Calvados Sour (Calvados + Lemon + Simple)
11. `japanese-sour` — Japanese Sour (Shochu + Lemon + Sugar)
12. `trinidad-sour` — Trinidad Sour (Angostura + Orgeat + Lemon + Egg white) [Death & Co]
13. `basil-sour` — Basil Sour (Gin + Basil + Lemon + Simple)
14. `cucumber-sour` — Cucumber Sour (Gin + Cucumber + Lemon + Elderflower)
15. `campari-sour` — Campari Sour (Campari + Lemon + Simple + Egg white) [modern classic, IBA-adjacent]

**Skipped (already in 142):** Whiskey Sour, Pisco Sour, Amaretto Sour, New York Sour, Boston Sour, Charlie Chaplin, White Lady, Clover Club, Gimlet, Daiquiri, Bee's Knees, Jack Rose, Peach Tree, Gold Rush

### 3. Mule / Collins / Fizz family (15)
1. `mexican-mule` — Mexican Mule (Tequila + Lime + Ginger beer)
2. `irish-mule` — Irish Mule (Irish whiskey + Lime + Ginger beer)
3. `kentucky-mule` — Kentucky Mule (Bourbon + Lime + Ginger beer)
4. `jamaican-mule` — Jamaican Mule (Jamaican rum + Lime + Ginger beer)
5. `pineapple-mule` — Pineapple Mule (Rum + Pineapple + Lime + Ginger beer)
6. `peach-mule` — Peach Mule (Bourbon + Peach + Lime + Ginger beer)
7. `mezcal-mule` — Mezcal Mule (Mezcal + Lime + Ginger beer)
8. `spanish-mule` — Spanish Mule (Cava/Prosecco + Lime + Ginger beer, low-ABV)
9. `st-germain-mule` — St-Germain Mule (Gin + St-Germain + Lime + Ginger beer)
10. `blood-orange-mule` — Blood Orange Mule (Vodka + Blood orange + Lime + Ginger beer)
11. `apple-mule` — Apple Mule (Applejack + Apple cider + Lime + Ginger beer)
12. `passion-fruit-mule` — Passion Fruit Mule (Rum + Passion fruit + Lime + Ginger beer)
13. `coconut-mule` — Coconut Mule (Rum + Coconut cream + Lime + Ginger beer)
14. `grapefruit-mule` — Grapefruit Mule (Tequila + Grapefruit + Lime + Ginger beer)
15. `cherry-mule` — Cherry Mule (Bourbon + Cherry Heering + Lime + Ginger beer)

**Skipped (already in 142):** Moscow Mule, Dark 'n' Stormy, Tom Collins, Pimm's Cup, Gin Fizz, Singapore Sling, Southside Fizz, Sloe Gin Fizz, Gin Rickey, Peach Blossom

### 4. Regional / international (20)

**Asian (6):**
1. `soju-sour` — Soju Sour (Soju + Lemon + Sugar)
2. `yuzu-soju-spritz` — Yuzu Soju Spritz (Soju + Yuzu + Soda)
3. `chu-hai` — Chu-Hai (Shochu + Soda + Lemon)
4. `matcha-highball` — Matcha Highball (Sake + Matcha + Soda)
5. `sake-spritz` — Sake Spritz (Sake + Prosecco + Soda)
6. `lemon-sour` — Lemon Sour / Remon Sour (Shochu + Lemon + Soda)

**South American (5):**
7. `caipirinha` — Caipirinha (Cachaça + Lime + Sugar)
8. `caipirissima` — Caipirissima (White rum + Lime + Sugar, the rum cousin of caipirinha)
9. `batida-de-coco` — Batida de Coco (Cachaça + Coconut cream + Sugar)
10. `pisco-punch` — Pisco Punch (Pisco + Pineapple + Lemon + Simple)
11. `rabo-de-galo` — Rabo de Galo (Cachaça + Sweet vermouth + Cynar)

**European (9):**
12. `st-germain-spritz` — St-Germain Spritz (St-Germain + Prosecco + Soda)
13. `lillet-spritz` — Lillet Spritz (Lillet Blanc + Prosecco + Soda + Lemon)
14. `cynar-spritz` — Cynar Spritz (Cynar + Prosecco + Soda + Orange)
15. `tinto-de-verano` — Tinto de Verano (Red wine + Lemon soda)
16. `sangria` — Sangria (Red wine + Brandy + Sugar + Fruit)
17. `vermouth-cassis` — Vermouth Cassis (Sweet vermouth + Crème de cassis)
18. `vermouth-tonic` — Vermouth Tonic (Sweet vermouth + Tonic + Lemon)
19. `porto-tonic` — Porto Tonic (Port + Tonic + Lemon)
20. `limoncello-spritz` — Limoncello Spritz (Limoncello + Prosecco + Soda)

**Skipped (already in 142):** Aperol Spritz, Hugo Spritz, Americano, Adonis, Bamboo, Bellini, Mimosa, Kir, Kir Royale, Sangria (regional version added)

### 5. Modern craft (post-2010) (15)
1. `oaxaca-old-fashioned` — Oaxaca Old Fashioned (Reposado tequila + Mezcal + Agave + Chocolate bitters) [Death & Co 2006]
2. `dead-rabbit-irish-coffee` — Dead Rabbit Irish Coffee (Irish whiskey + Espresso + Demerara + Cream)
3. `los-angeles-negroni` — Los Angeles Negroni (Gin + Lillet Blanc + Sweet vermouth + Orange bitters)
4. `conference` — Conference (Applejack + Becherovka + Lemon + Simple) [Death & Co 2007]
5. `amor-y-amargo` — Amor y Amargo (Bourbon + Cynar + Aperol + Lemon + Egg white) [Death & Co 2008]
6. `thunderbolt` — Thunderbolt (Cognac + Averna + Cherry Heering + Lemon + Egg white) [Death & Co 2010]
7. `obituary` — Obituary (Bourbon + Cynar + Sweet vermouth + Lemon + Egg white) [Death & Co 2009]
8. `east-india` — East India (Brandy + Curaçao + Pineapple + Bitters) [19th c. classic with modern revival]
9. `wandering-poet` — Wandering Poet (Bourbon + Averna + Maraschino + Lemon + Egg white) [Death & Co 2011]
10. `la-rosa` — La Rosa (Gin + Aperol + Lemon + Peychaud's + Egg white) [PDT]
11. `fair-and-square` — Fair and Square (Bourbon + Cherry Heering + Lemon + Egg white) [Death & Co 2012]
12. `peninsula` — Peninsula (Rye + Cynar + Lemon + Orange bitters) [Death & Co 2008]
13. `five-spice` — Five Spice (Bourbon + Allspice Dram + Lemon + Simple + Egg white) [Death & Co 2009]
14. `surrender` — Surrender (Bourbon + Cherry Heering + Lemon + Egg white + Peychaud) [Death & Co 2008]
15. `ready-fire-aim` — Ready Fire Aim (Rye + Sweet vermouth + Cynar + Absinthe + Orange bitters) [Death & Co 2008]

**Skipped (already in 142):** Paper Plane, Penicillin, Division Bell, Naked & Famous, Last Word, Marconi Wireless, Bijou, Vieux Mot, Trinidad Sour (in sours)

### 6. Tiki & showpiece (10)
1. `aku-aku` — Aku Aku (Light rum + Lime + Orgeat + Falernum + Pimento Dram) [Don the Beachcomber]
2. `mystery-word` — Mystery Word (Rum + Grapefruit + Falernum + Allspice Dram + Bitters) [Don the Beachcomber]
3. `cobras-fang` — Cobra's Fang (Rum + Lime + Falernum + Absinthe + Pimento Dram + Bitters) [Don the Beachcomber]
4. `sidewinders-fang` — Sidewinder's Fang (Rum + Grapefruit + Lime + Falernum + Absinthe + Pimento Dram) [Don the Beachcomber]
5. `nui-nui` — Nui Nui (Rum + Cognac + Lime + Bitters) [Don the Beachcomber]
6. `missionarys-downfall` — Missionary's Downfall (Rum + Peach + Mint + Lime + Pineapple) [Don the Beachcomber]
7. `qb-cooler` — Q.B. Cooler (Rum + Passion fruit + Lime + Falernum) [Don the Beachcomber]
8. `beachcombers-gold` — Beachcomber's Gold (Rum + Lime + Maraschino + Falernum + Bitters) [Don the Beachcomber]
9. `pearl-diver` — Pearl Diver (Aged rum + Lime + Falernum + Pimento Dram + Absinthe + Bitters) [Don the Beachcomber]
10. `painkiller` — Painkiller (Aged rum + Pineapple + Orange + Coconut cream + Nutmeg) [Pusser's 1980s]

**Skipped (already in 142):** Mai Tai, Saturn, Fog Cutter, Three Dots and a Dash, Jet Pilot, Navy Grog, Port Royal, Blue Hawaiian, Shrunken Skull, Piña Colada, Suffering Bar Bastard, Jungle Bird, Hurricane, Zombie, Scorpion (added in tiki was not yet, kept aside)

### 7. Mocktails & low-ABV (10)
1. `virgin-mary` — Virgin Mary (Tomato/Cranberry juice + Lemon + Worcestershire + Tabasco + Celery salt)
2. `shirley-temple` — Shirley Temple (Ginger ale + Grenadine + Cherry)
3. `roy-rogers` — Roy Rogers (Cola + Grenadine + Cherry)
4. `nojito` — Nojito / Mocktail Mojito (Mint + Lime + Sugar + Soda)
5. `phony-negroni` — Phony Negroni (Seedlip + Italian bitter mock + Vermouth mock)
6. `seedlip-sour` — Seedlip Sour (Seedlip + Lemon + Simple + Egg white)
7. `lavender-lemonade-spritz` — Lavender Lemonade Spritz (Lavender syrup + Lemon + Soda)
8. `cucumber-cooler` — Cucumber Cooler (Cucumber + Lime + Simple + Tonic)
9. `pineapple-ginger-mocktail` — Pineapple Ginger Mocktail (Pineapple + Ginger + Lime + Soda)
10. `hibiscus-cooler` — Hibiscus Cooler (Hibiscus syrup + Pomegranate + Lime + Soda)

**Skipped (already in 142):** Nothing — first mocktail batch.

### 8. Classic variants & "deep cuts" (10)
1. `bronx-cocktail` — Bronx Cocktail (Gin + Dry vermouth + Sweet vermouth + Orange juice) [1900s NYC]
2. `holland-house-cocktail` — Holland House Cocktail (Gin + Lemon + Maraschino + Orange bitters) [1880s]
3. `widow-kiss` — Widow's Kiss (Apple brandy + Yellow Chartreuse + Benedictine + Angostura) [1895]
4. `monkey-gland` — Monkey Gland (Gin + Absinthe + Grenadine + Orange juice) [1920s Paris]
5. `champs-elysees` — Champs-Élysées (Cognac + Yellow Chartreuse + Lemon + Sugar + Bitters) [1930s Paris]
6. `brandy-alexander` — Brandy Alexander (Brandy + Crème de Cacao + Cream + Nutmeg) [1920s]
7. `grasshopper` — Grasshopper (Crème de Menthe + Crème de Cacao + Cream) [1918 Tujague's]
8. `pink-lady` — Pink Lady (Gin + Grenadine + Cream + Egg white) [1910s-30s]
9. `alaska` — Alaska (Gin + Yellow Chartreuse) [1900s]
10. `japan-cocktail` — Japan Cocktail (Cognac + Orgeat + Bitters + Lemon) [1884 Harry Johnson]

**Skipped (already in 142):** Blood and Sand, Improved Whiskey Cocktail, Income Tax, 20th Century, Brandy Crusta, Millionaire, Harvard, Daisy, Deauville, Tuxedo, Tuxedo No. 2, Greenpoint, Corpse Reviver #1, Corpse Reviver #2, Scofflaw, Bobby Burns, La Louise, Chrysanthemum, Clover Club, Casino, Paradise, Angel Face, Stinger, Porto Flip, Brooklyn, Bobby Burns, La Louise, Hanky Panky, Martini, Martinez, Bronx, Scofflaw, Bobby Burns, Hanky Panky

## Distribution check
- Negroni family: 15
- Sours: 15
- Mule/Collins/Fizz: 15
- Regional: 6+5+9 = 20
- Modern craft: 15
- Tiki: 10
- Mocktails: 10
- Deep cuts: 10
- **Total: 100** ✓

## Approach
- Use a single Node.js script `expand-recipes-v2.cjs` in repo root (committed for reproducibility).
- Append to all 5 link tables atomically.
- Run `node verify-data.cjs` after to validate.
