// v2-recipes-data-4-regional.cjs — Regional / international (20): Asian (6) + South American (5) + European (9)
const { I, S, T } = require("./v2-recipes-data.cjs");

const newRecipes = [];

// ════════════════════════════════════════════════════════════════════════════
// 4. REGIONAL / INTERNATIONAL (20)
// ════════════════════════════════════════════════════════════════════════════

// --- ASIAN (6) ---

newRecipes.push({
  slug: "soju-sour", nameZh: "烧酒酸", nameEn: "Soju Sour",
  difficulty: 2, glassType: "coupe", iceType: "none",
  descriptionZh: "韩国烧酒、柠檬与单糖浆的轻盈亚洲酸酒。",
  descriptionEn: "Korean soju, lemon and simple — a clean Asian sour.",
  storyNoteZh: "2010 年代首尔 craft 酒吧流行的烧酒酸酒。",
  storyNoteEn: "A 2010s Seoul craft-bar soju sour variant.",
  balanceTags: ["sour", "clean", "asian", "modern"],
  ingredients: [
    I("soju", "60ml", true), I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "15ml", true), I("egg-white", "1 piece", false, false, "可选", "optional"),
    I("lemon-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加烧酒、柠檬汁与单糖浆（可选加蛋清）。", "Add soju, lemon juice and simple syrup (and egg white if using) to a shaker.", "dry-shake"),
    S("不加冰干摇 15 秒。", "Dry-shake without ice for 15 seconds.", "dry-shake", "15s"),
    S("加冰再摇 12 秒。", "Add ice and shake again for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("柠檬皮喷香装饰。", "Express lemon peel over the surface and place as garnish.", "express-peel"),
  ],
  techniques: T("dry-shake", "shake", "double-strain", "express-peel"),
});

newRecipes.push({
  slug: "yuzu-soju-spritz", nameZh: "柚子烧酒气泡", nameEn: "Yuzu Soju Spritz",
  difficulty: 1, glassType: "highball", iceType: "cubed",
  descriptionZh: "韩国烧酒、柚子汁与苏打水的日韩混搭气泡饮。",
  descriptionEn: "Korean soju, yuzu juice and soda — a Japanese-Korean spritz.",
  storyNoteZh: "2010 年代日韩流行的柚子烧酒气泡饮。",
  storyNoteEn: "A 2010s Japanese-Korean yuzu-soju spritz.",
  balanceTags: ["refreshing", "citrus", "low-abv", "modern"],
  ingredients: [
    I("soju", "60ml", true), I("yuzu-juice", "30ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "7.5ml", false), I("soda-water", "90ml", true, false, "顶部加满", "to top"),
    I("lemon-peel", "1 piece", false, false, "装饰（yuzu peel 替代）", "garnish (sub for yuzu peel)"),
  ],
  steps: [
    S("高球杯装满冰块。", "Fill a highball with cubed ice.", "build"),
    S("倒入烧酒、柚子汁与单糖浆。", "Pour soju, yuzu juice and simple syrup over the ice.", "build"),
    S("顶部加满苏打水。", "Top with soda water.", "build"),
    S("搅拌均匀，柚子皮喷香装饰。", "Stir gently and garnish with an expressed yuzu peel.", "stir", "5s"),
  ],
  techniques: T("build", "stir", "express-peel"),
});

newRecipes.push({
  slug: "chu-hai", nameZh: "酎ハイ", nameEn: "Chu-Hai",
  difficulty: 1, glassType: "highball", iceType: "cubed",
  descriptionZh: "日本烧酎、柠檬与苏打水的东京便利店经典。",
  descriptionEn: "Shochu, lemon and soda — Tokyo's convenience-store highball classic.",
  storyNoteZh: "20 世纪 50 年代日本流行的烧酎+苏打水低酒精度饮品。",
  storyNoteEn: "A 1950s Japanese shochu-soda low-ABV classic, sold in every Tokyo convenience store.",
  balanceTags: ["refreshing", "low-abv", "asian", "classic"],
  ingredients: [
    I("shochu", "60ml", true), I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "7.5ml", false), I("soda-water", "120ml", true, false, "顶部加满", "to top"),
    I("lemon-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("高球杯装满冰块。", "Fill a highball with cubed ice.", "build"),
    S("倒入烧酎、柠檬汁与单糖浆。", "Pour shochu, lemon juice and simple syrup over the ice.", "build"),
    S("顶部加满苏打水。", "Top with soda water.", "build"),
    S("搅拌均匀，柠檬皮喷香装饰。", "Stir gently and garnish with an expressed lemon peel.", "stir", "5s"),
  ],
  techniques: T("build", "stir", "express-peel"),
});

newRecipes.push({
  slug: "matcha-highball", nameZh: "抹茶气泡", nameEn: "Matcha Highball",
  difficulty: 2, glassType: "highball", iceType: "cubed",
  descriptionZh: "清酒、抹茶与苏打水的日式茶香气泡饮。",
  descriptionEn: "Sake, matcha and soda — the Japanese green-tea highball.",
  storyNoteZh: "2010 年代日本 craft 酒吧流行的抹茶气泡饮。",
  storyNoteEn: "A 2010s Japanese craft-bar matcha highball.",
  balanceTags: ["refreshing", "low-abv", "asian", "modern"],
  ingredients: [
    I("sake", "60ml", true), I("matcha", "1 tsp", true, false, "蒸青碾茶", "powdered green tea"),
    I("simple-syrup", "15ml", false), I("soda-water", "120ml", true, false, "顶部加满", "to top"),
    I("lemon-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("用少量热水将抹茶粉搅打成均匀的抹茶酱（约 1 茶匙水）。", "Whisk matcha powder with a small amount of hot water (~1 tsp) until smooth paste forms.", "build"),
    S("高球杯装满冰块，倒入清酒与抹茶酱。", "Fill a highball with cubed ice; pour in the sake and the matcha paste.", "build"),
    S("加入单糖浆，顶部加满苏打水。", "Add simple syrup and top with soda water.", "build"),
    S("搅拌均匀，柠檬皮喷香装饰。", "Stir gently and garnish with an expressed lemon peel.", "stir", "5s"),
  ],
  techniques: T("build", "stir", "express-peel"),
});

newRecipes.push({
  slug: "sake-spritz", nameZh: "清酒气泡", nameEn: "Sake Spritz",
  difficulty: 1, glassType: "wine", iceType: "cubed",
  descriptionZh: "清酒、Prosecco 与苏打水的日意气泡开胃酒。",
  descriptionEn: "Sake, Prosecco and soda — the Japanese-Italian spritz aperitivo.",
  storyNoteZh: "2010 年代日本与意大利流行的清酒 Aperol Spritz 风格变体。",
  storyNoteEn: "A 2010s Japanese-Italian spritz aperitivo variant using sake.",
  balanceTags: ["refreshing", "low-abv", "asian", "modern"],
  ingredients: [
    I("sake", "60ml", true), I("prosecco", "60ml", true, false, "冰镇", "chilled"),
    I("soda-water", "60ml", true, false, "顶部加满", "to top"),
    I("orange-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("大葡萄酒杯装满冰块。", "Fill a large wine glass with cubed ice.", "build"),
    S("倒入清酒与 Prosecco。", "Pour sake and Prosecco over the ice.", "build"),
    S("顶部加满苏打水。", "Top with soda water.", "build"),
    S("搅拌均匀，橙皮喷香装饰。", "Stir gently and garnish with an expressed orange peel.", "stir", "5s"),
  ],
  techniques: T("build", "stir", "express-peel"),
});

newRecipes.push({
  slug: "lemon-sour", nameZh: "柠檬酸", nameEn: "Lemon Sour (Remon Sour)",
  difficulty: 1, glassType: "highball", iceType: "cubed",
  descriptionZh: "日本烧酎、柠檬与苏打水的 レモンサワー，日本居酒屋国民饮品。",
  descriptionEn: "Shochu, lemon and soda — the Japanese izakaya Lemon Sour classic.",
  storyNoteZh: "1950 年代日本流行的烧酎+柠檬+苏打水低酒精度饮品，是日本居酒屋销量第一的鸡尾酒。",
  storyNoteEn: "A 1950s Japanese shochu-lemon-soda low-ABV classic, the best-selling cocktail in Japanese izakayas.",
  balanceTags: ["refreshing", "low-abv", "asian", "classic"],
  ingredients: [
    I("shochu", "60ml", true), I("lemon-juice", "30ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "7.5ml", false), I("soda-water", "120ml", true, false, "顶部加满", "to top"),
    I("lemon-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("高球杯装满冰块。", "Fill a highball with cubed ice.", "build"),
    S("倒入烧酎、柠檬汁与单糖浆。", "Pour shochu, lemon juice and simple syrup over the ice.", "build"),
    S("顶部加满苏打水。", "Top with soda water.", "build"),
    S("搅拌均匀，柠檬片装饰。", "Stir gently and garnish with a lemon slice.", "stir", "5s"),
  ],
  techniques: T("build", "stir"),
});

// --- SOUTH AMERICAN (5) ---

newRecipes.push({
  slug: "caipirinha", nameZh: "卡琵莉亚", nameEn: "Caipirinha",
  difficulty: 2, glassType: "rocks", iceType: "cubed",
  descriptionZh: "巴西卡沙萨、青柠与砂糖的国民鸡尾酒。",
  descriptionEn: "Brazilian cachaça, lime and sugar — Brazil's national cocktail.",
  storyNoteZh: "19 世纪巴西圣保罗农村起源的甘蔗酒鸡尾酒，1918 年起被官方认定为巴西国饮。",
  storyNoteEn: "A 19th-century rural São Paulo sugarcane cocktail, officially declared Brazil's national drink in 1918.",
  balanceTags: ["refreshing", "citrus", "classic"],
  ingredients: [
    I("cachaca", "60ml", true), I("lime-juice", "30ml", true, false, "现榨", "freshly squeezed"),
    I("sugar", "2 tsp", true), I("lime-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("在 rocks 杯中放入砂糖与青柠汁。", "Place the sugar and lime juice in a rocks glass.", "build"),
    S("搅拌使糖充分溶解。", "Stir until the sugar fully dissolves.", "stir", "10s"),
    S("倒入卡沙萨，加满碎冰。", "Pour cachaça and fill the glass with crushed ice.", "build"),
    S("搅拌均匀，柠檬皮喷香装饰。", "Stir well and garnish with an expressed lime peel.", "stir", "5s"),
  ],
  techniques: T("build", "stir", "express-peel"),
});

newRecipes.push({
  slug: "caipirissima", nameZh: "卡琵里西玛", nameEn: "Caipirissima",
  difficulty: 2, glassType: "rocks", iceType: "cubed",
  descriptionZh: "白朗姆替换卡沙萨的加勒比海版 Caipirinha。",
  descriptionEn: "White rum replaces cachaça — the Caribbean cousin of the Caipirinha.",
  storyNoteZh: "加勒比海地区用白朗姆替代卡沙萨的 Caipirinha 变体。",
  storyNoteEn: "The Caribbean white-rum version of the Brazilian Caipirinha.",
  balanceTags: ["refreshing", "citrus", "classic-variant"],
  ingredients: [
    I("white-rum", "60ml", true), I("lime-juice", "30ml", true, false, "现榨", "freshly squeezed"),
    I("sugar", "2 tsp", true), I("lime-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("在 rocks 杯中放入砂糖与青柠汁。", "Place the sugar and lime juice in a rocks glass.", "build"),
    S("搅拌使糖充分溶解。", "Stir until the sugar fully dissolves.", "stir", "10s"),
    S("倒入白朗姆，加满碎冰。", "Pour white rum and fill the glass with crushed ice.", "build"),
    S("搅拌均匀，柠檬皮喷香装饰。", "Stir well and garnish with an expressed lime peel.", "stir", "5s"),
  ],
  techniques: T("muddle", "build", "stir", "express-peel"),
});

newRecipes.push({
  slug: "batida-de-coco", nameZh: "椰子巴蒂达", nameEn: "Batida de Coco",
  difficulty: 1, glassType: "highball", iceType: "crushed",
  descriptionZh: "巴西卡沙萨、椰子奶油与糖的椰子奶昔风格鸡尾酒。",
  descriptionEn: "Brazilian cachaça, coconut cream and sugar — the coconut-batida shake.",
  storyNoteZh: "20 世纪巴西海滩流行的卡沙萨+椰子奶昔风格鸡尾酒，是 Caipirinha 的椰子姐妹。",
  storyNoteEn: "A 20th-century Brazilian cachaça-coconut shake, the coconut sibling of the Caipirinha.",
  balanceTags: ["refreshing", "tropical", "creamy", "classic"],
  ingredients: [
    I("cachaca", "60ml", true), I("coconut-cream", "60ml", true), I("sugar", "1 tbsp", true, false, "或单糖浆", "or simple"),
    I("lime-juice", "15ml", true, false, "现榨", "freshly squeezed"),
    I("lime-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("搅拌机加入卡沙萨、椰子奶油、单糖浆与柠檬汁。", "Add cachaça, coconut cream, sugar and lime juice to a blender.", "flash-blend"),
    S("加 1 杯碎冰短促搅拌 5-6 秒。", "Add 1 cup of crushed ice and pulse for 5-6 seconds until smooth.", "flash-blend", "6s"),
    S("倒入高球杯，柠檬皮喷香装饰。", "Pour into a highball and garnish with an expressed lime peel.", null),
  ],
  techniques: T("flash-blend"),
});

newRecipes.push({
  slug: "pisco-punch", nameZh: "皮斯科宾治", nameEn: "Pisco Punch",
  difficulty: 2, glassType: "highball", iceType: "cubed",
  descriptionZh: "秘鲁皮斯科、菠萝汁、柠檬与单糖浆的旧金山经典酸酒。",
  descriptionEn: "Peruvian pisco, pineapple, lemon and simple — the San Francisco classic.",
  storyNoteZh: "19 世纪末旧金山 Bank Exchange 酒吧的招牌鸡尾酒，最初用 soluble pineapple 调配。",
  storyNoteEn: "The signature drink of San Francisco's 19th-century Bank Exchange saloon, originally made with soluble pineapple.",
  balanceTags: ["sour", "tropical", "classic"],
  ingredients: [
    I("pisco", "60ml", true), I("pineapple-juice", "60ml", true, false, "现榨", "freshly squeezed"),
    I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "15ml", true), I("mint-sprig", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加皮斯科、菠萝汁、柠檬汁与单糖浆。", "Add pisco, pineapple juice, lemon juice and simple syrup to a shaker.", "shake"),
    S("加冰摇和 12 秒。", "Fill with ice and shake for 12 seconds.", "shake", "12s"),
    S("双重过滤入装有冰块的高球杯。", "Double-strain into a highball with cubed ice.", "double-strain"),
    S("菠萝片装饰。", "Garnish with a pineapple slice.", null),
  ],
  techniques: T("shake", "double-strain"),
});

newRecipes.push({
  slug: "rabo-de-galo", nameZh: "公鸡尾", nameEn: "Rabo de Galo",
  difficulty: 2, glassType: "rocks", iceType: "large",
  descriptionZh: "巴西卡沙萨与甜味美思的「鸡尾酒之尾」曼哈顿变体。",
  descriptionEn: "Brazilian cachaça and sweet vermouth — the Brazilian 'cock tail' Manhattan.",
  storyNoteZh: "20 世纪中期圣保罗流行的卡沙萨+甜味美思巴西国民鸡尾酒，名字意为「公鸡尾」。",
  storyNoteEn: "A mid-20th-century São Paulo cachaça-and-sweet-vermouth Brazilian classic; the name means 'cock tail'.",
  balanceTags: ["spirit-forward", "herbal", "classic"],
  ingredients: [
    I("cachaca", "60ml", true), I("sweet-vermouth", "30ml", true), I("cynar", "15ml", false, true, "可选增加苦味", "optional bitter layer"),
    I("angostura", "2 dashes", false), I("orange-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("将卡沙萨、甜味美思（可选加 Cynar）加入预冷搅拌杯。", "Add cachaça, sweet vermouth (and Cynar if using) to a chilled mixing glass.", "stir"),
    S("加冰搅和 30 秒。", "Add ice and stir for 30 seconds.", "stir", "30s"),
    S("滤入装有冰球的 rocks 杯。", "Strain into a rocks glass over a large ice cube.", "stir"),
    S("滴 2 dashes 安格斯特拉，橙皮喷香装饰。", "Add 2 dashes of Angostura and express orange peel.", "express-peel"),
  ],
  techniques: T("stir", "express-peel"),
});

// --- EUROPEAN (9) ---

newRecipes.push({
  slug: "st-germain-spritz", nameZh: "接骨木花气泡", nameEn: "St-Germain Spritz",
  difficulty: 1, glassType: "wine", iceType: "cubed",
  descriptionZh: "St-Germain、Prosecco 与苏打水的法式花香气泡饮。",
  descriptionEn: "St-Germain, Prosecco and soda — the French floral spritz.",
  storyNoteZh: "2007 年 St-Germain 上市后流行的法式花香 Aperol Spritz 变体。",
  storyNoteEn: "A 2007s French floral spritz variant popular after St-Germain's launch.",
  balanceTags: ["refreshing", "floral", "low-abv", "modern"],
  ingredients: [
    I("st-germain", "60ml", true), I("prosecco", "90ml", true, false, "冰镇", "chilled"),
    I("soda-water", "60ml", true, false, "顶部加满", "to top"),
    I("lemon-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("大葡萄酒杯装满冰块。", "Fill a large wine glass with cubed ice.", "build"),
    S("倒入 St-Germain 与 Prosecco。", "Pour St-Germain and Prosecco over the ice.", "build"),
    S("顶部加满苏打水。", "Top with soda water.", "build"),
    S("搅拌均匀，柠檬皮喷香装饰。", "Stir gently and garnish with an expressed lemon peel.", "stir", "5s"),
  ],
  techniques: T("build", "stir", "express-peel"),
});

newRecipes.push({
  slug: "lillet-spritz", nameZh: "丽莱气泡", nameEn: "Lillet Spritz",
  difficulty: 1, glassType: "wine", iceType: "cubed",
  descriptionZh: "Lillet Blanc、Prosecco 与苏打水的法式开胃气泡酒。",
  descriptionEn: "Lillet Blanc, Prosecco and soda — the French aperitif spritz.",
  storyNoteZh: "2010 年代法国波尔多流行的 Lillet 风格 Aperol Spritz 替代。",
  storyNoteEn: "A 2010s Bordeaux Lillet-style spritz alternative to Aperol.",
  balanceTags: ["refreshing", "elegant", "low-abv", "modern"],
  ingredients: [
    I("lillet-blanc", "90ml", true, false, "冰镇", "chilled"), I("prosecco", "60ml", true, false, "冰镇", "chilled"),
    I("soda-water", "60ml", true, false, "顶部加满", "to top"),
    I("orange-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("大葡萄酒杯装满冰块。", "Fill a large wine glass with cubed ice.", "build"),
    S("倒入 Lillet Blanc 与 Prosecco。", "Pour Lillet Blanc and Prosecco over the ice.", "build"),
    S("顶部加满苏打水。", "Top with soda water.", "build"),
    S("搅拌均匀，橙皮喷香装饰。", "Stir gently and garnish with an expressed orange peel.", "stir", "5s"),
  ],
  techniques: T("build", "stir", "express-peel"),
});

newRecipes.push({
  slug: "cynar-spritz", nameZh: "奇娜尔气泡", nameEn: "Cynar Spritz",
  difficulty: 1, glassType: "wine", iceType: "cubed",
  descriptionZh: "Cynar、Prosecco 与苏打水的意式苦味气泡开胃酒。",
  descriptionEn: "Cynar, Prosecco and soda — the Italian bitter-spritz aperitivo.",
  storyNoteZh: "2010 年代意大利流行的 Cynar 版 Aperol Spritz 变体，比 Aperol 更苦更草本。",
  storyNoteEn: "A 2010s Italian Cynar-based spritz variant, more bitter and vegetal than Aperol.",
  balanceTags: ["refreshing", "bitter", "low-abv", "modern"],
  ingredients: [
    I("cynar", "60ml", true), I("prosecco", "90ml", true, false, "冰镇", "chilled"),
    I("soda-water", "60ml", true, false, "顶部加满", "to top"),
    I("orange-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("大葡萄酒杯装满冰块。", "Fill a large wine glass with cubed ice.", "build"),
    S("倒入 Cynar 与 Prosecco。", "Pour Cynar and Prosecco over the ice.", "build"),
    S("顶部加满苏打水。", "Top with soda water.", "build"),
    S("搅拌均匀，橙片装饰。", "Stir gently and garnish with an orange slice.", "stir", "5s"),
  ],
  techniques: T("build", "stir"),
});

newRecipes.push({
  slug: "tinto-de-verano", nameZh: "夏日红酒", nameEn: "Tinto de Verano",
  difficulty: 1, glassType: "highball", iceType: "cubed",
  descriptionZh: "西班牙红酒与柠檬汽水的马德里夏日饮品。",
  descriptionEn: "Spanish red wine and lemon soda — Madrid's summer tinto de verano.",
  storyNoteZh: "20 世纪 60 年代马德里流行的红酒+柠檬汽水，比 Sangria 更简单的西班牙夏日饮品。",
  storyNoteEn: "A 1960s Madrid red-wine-and-lemon-soda, the simpler Spanish summer sibling of Sangria.",
  balanceTags: ["refreshing", "wine", "low-abv", "classic"],
  ingredients: [
    I("red-wine", "120ml", true, false, "冰镇", "chilled"), I("lemonade", "60ml", true, false, "顶部加满", "to top"),
    I("lemon-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("高球杯装满冰块。", "Fill a highball with cubed ice.", "build"),
    S("倒入冰镇红酒。", "Pour chilled red wine over the ice.", "build"),
    S("顶部加满柠檬汽水。", "Top with lemonade.", "build"),
    S("搅拌均匀，柠檬片装饰。", "Stir gently and garnish with a lemon slice.", "stir", "5s"),
  ],
  techniques: T("build", "stir"),
});

newRecipes.push({
  slug: "sangria", nameZh: "桑格利亚", nameEn: "Sangria",
  difficulty: 1, glassType: "pitcher", iceType: "cubed",
  descriptionZh: "西班牙红酒、白兰地、果汁与水果的传统聚会饮品。",
  descriptionEn: "Spanish red wine, brandy, juice and fruit — the traditional party punch.",
  storyNoteZh: "19 世纪西班牙红酒+水果的传统聚会饮品，20 世纪传入美国成为派对经典。",
  storyNoteEn: "A 19th-century Spanish wine-and-fruit party drink; exported to the US in the 20th century as a party classic.",
  balanceTags: ["refreshing", "fruity", "low-abv", "classic"],
  ingredients: [
    I("red-wine", "750ml", true, false, "一瓶", "one bottle"),
    I("cognac", "60ml", true, false, "白兰地最佳", "brandy preferred"), I("orange-juice", "120ml", true, false, "现榨", "freshly squeezed"),
    I("lemon-juice", "30ml", true, false, "现榨", "freshly squeezed"),
    I("sugar", "2 tbsp", true), I("orange-peel", "3 pieces", true, false, "装饰", "garnish"),
    I("cinnamon-stick", "2 pieces", true, false, "装饰与香料", "garnish & spice"),
  ],
  steps: [
    S("在大水罐中将红葡萄酒、白兰地、橙汁、柠檬汁与糖搅拌至糖溶解。", "In a large pitcher combine red wine, brandy, orange juice, lemon juice and sugar; stir until the sugar dissolves.", "stir"),
    S("加入橙皮与肉桂棒，置冰箱冷藏至少 2 小时。", "Add orange peel and cinnamon sticks; refrigerate for at least 2 hours.", "build"),
    S("饮用时倒入装有冰块的高球杯。", "Serve over cubed ice in a highball glass.", "build"),
    S("新鲜橙皮与肉桂棒装饰。", "Garnish with fresh orange peel and cinnamon sticks.", null),
  ],
  techniques: T("stir", "build"),
});

newRecipes.push({
  slug: "vermouth-cassis", nameZh: "苦艾酒加黑加仑", nameEn: "Vermouth Cassis",
  difficulty: 1, glassType: "highball", iceType: "cubed",
  descriptionZh: "甜味美思与黑加仑利口酒的西班牙「Vermut Cassis」开胃酒。",
  descriptionEn: "Sweet vermouth and crème de cassis — Spain's vermut-cassis aperitivo.",
  storyNoteZh: "20 世纪西班牙马德里与巴塞罗那流行的 Vermut 加 Cassis 餐前开胃酒。",
  storyNoteEn: "A 20th-century Madrid and Barcelona vermut-and-cassis pre-dinner aperitivo.",
  balanceTags: ["refreshing", "fruity", "low-abv", "classic"],
  ingredients: [
    I("sweet-vermouth", "90ml", true, false, "冰镇", "chilled"),
    I("creme-de-cassis", "30ml", true), I("soda-water", "60ml", true, false, "可选", "optional"),
    I("orange-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("高球杯装满冰块。", "Fill a highball with cubed ice.", "build"),
    S("倒入冰镇甜味美思与黑加仑利口酒。", "Pour chilled sweet vermouth and crème de cassis over the ice.", "build"),
    S("（可选）顶部加少量苏打水。", "Optionally top with a splash of soda water.", "build"),
    S("搅拌均匀，橙片装饰。", "Stir gently and garnish with an orange slice.", "stir", "5s"),
  ],
  techniques: T("build", "stir"),
});

newRecipes.push({
  slug: "vermouth-tonic", nameZh: "苦艾汤力", nameEn: "Vermouth Tonic",
  difficulty: 1, glassType: "highball", iceType: "cubed",
  descriptionZh: "甜味美思与汤力水的西班牙/意大利开胃气泡饮。",
  descriptionEn: "Sweet vermouth and tonic — the Spanish/Italian aperitivo spritz.",
  storyNoteZh: "20 世纪西班牙巴塞罗那与意大利北部流行的苦艾+汤力水开胃酒。",
  storyNoteEn: "A 20th-century Barcelona and northern Italy vermouth-and-tonic aperitivo.",
  balanceTags: ["refreshing", "low-abv", "european", "classic"],
  ingredients: [
    I("sweet-vermouth", "90ml", true, false, "冰镇", "chilled"),
    I("tonic", "90ml", true, false, "顶部加满", "to top"),
    I("orange-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("高球杯装满冰块。", "Fill a highball with cubed ice.", "build"),
    S("倒入冰镇甜味美思。", "Pour chilled sweet vermouth over the ice.", "build"),
    S("顶部加满汤力水。", "Top with tonic water.", "build"),
    S("搅拌均匀，橙皮喷香装饰。", "Stir gently and garnish with an expressed orange peel.", "stir", "5s"),
  ],
  techniques: T("build", "stir", "express-peel"),
});

newRecipes.push({
  slug: "porto-tonic", nameZh: "波特汤力", nameEn: "Porto Tonic (Port Tonic)",
  difficulty: 1, glassType: "highball", iceType: "cubed",
  descriptionZh: "葡萄牙波特酒与汤力水的夏日开胃饮。",
  descriptionEn: "Portuguese port and tonic — the Porto summer aperitivo.",
  storyNoteZh: "21 世纪初葡萄牙波尔图流行的波特酒+汤力水低酒精度夏日饮品。",
  storyNoteEn: "A 2000s Porto low-ABV port-and-tonic summer aperitivo.",
  balanceTags: ["refreshing", "low-abv", "european", "modern"],
  ingredients: [
    I("port", "60ml", true, false, "Ruby", "ruby"), I("tonic", "120ml", true, false, "顶部加满", "to top"),
    I("orange-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("高球杯装满冰块。", "Fill a highball with cubed ice.", "build"),
    S("倒入 Ruby 波特酒。", "Pour ruby port over the ice.", "build"),
    S("顶部加满汤力水。", "Top with tonic water.", "build"),
    S("搅拌均匀，橙皮喷香装饰。", "Stir gently and garnish with an expressed orange peel.", "stir", "5s"),
  ],
  techniques: T("build", "stir", "express-peel"),
});

newRecipes.push({
  slug: "limoncello-spritz", nameZh: "柠檬酒气泡", nameEn: "Limoncello Spritz",
  difficulty: 1, glassType: "wine", iceType: "cubed",
  descriptionZh: "意大利柠檬酒、Prosecco 与苏打水的南意夏日气泡饮。",
  descriptionEn: "Italian limoncello, Prosecco and soda — the Amalfi-coast summer spritz.",
  storyNoteZh: "2010 年代意大利南部阿马尔菲海岸流行的柠檬酒版 Aperol Spritz 变体。",
  storyNoteEn: "A 2010s Italian Amalfi-coast limoncello version of the spritz aperitivo.",
  balanceTags: ["refreshing", "lemon", "low-abv", "modern"],
  ingredients: [
    I("limoncello", "60ml", true, false, "冰镇", "chilled"), I("prosecco", "90ml", true, false, "冰镇", "chilled"),
    I("soda-water", "60ml", true, false, "顶部加满", "to top"),
    I("lemon-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("大葡萄酒杯装满冰块。", "Fill a large wine glass with cubed ice.", "build"),
    S("倒入冰镇 Limoncello 与 Prosecco。", "Pour chilled limoncello and Prosecco over the ice.", "build"),
    S("顶部加满苏打水。", "Top with soda water.", "build"),
    S("搅拌均匀，柠檬片装饰。", "Stir gently and garnish with a lemon slice.", "stir", "5s"),
  ],
  techniques: T("build", "stir"),
});

console.log(`After regional: ${newRecipes.length} recipes defined`);

module.exports = { newRecipes };
