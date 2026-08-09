// v2-recipes-data-7-mocktails.cjs — Mocktails & low-ABV (10)
const { I, S, T } = require("./v2-recipes-data.cjs");

const newRecipes = [];

// ════════════════════════════════════════════════════════════════════════════
// 7. MOCKTAILS & LOW-ABV (10)
// ════════════════════════════════════════════════════════════════════════════

newRecipes.push({
  slug: "virgin-mary", nameZh: "无酒精血腥玛丽", nameEn: "Virgin Mary",
  difficulty: 2, glassType: "highball", iceType: "cubed",
  descriptionZh: "番茄/蔓越莓汁、柠檬、伍斯特酱、塔巴斯科与芹菜盐的无酒版 Bloody Mary。",
  descriptionEn: "Tomato/cranberry juice, lemon, Worcestershire, Tabasco and celery salt — the spirit-free Bloody Mary.",
  storyNoteZh: "无酒精版 Bloody Mary，20 世纪后期健康饮食潮流下的 brunch 饮品。",
  storyNoteEn: "The spirit-free Bloody Mary, a brunch staple from the 1980s+ health-conscious cocktail era.",
  balanceTags: ["savory", "spicy", "mocktail", "classic"],
  ingredients: [
    I("cranberry-juice", "120ml", true, false, "替代番茄汁", "sub for tomato juice"),
    I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("worcestershire", "1 tsp", true), I("tabasco", "3 dashes", true),
    I("celery-salt", "1 pinch", true, false, "杯边蘸", "rim"),
    I("lemon-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("高球杯口擦青柠块，蘸芹菜盐。", "Rim a highball glass with celery salt using a lemon wedge.", "sugar-rim"),
    S("高球杯装满冰块。", "Fill the glass with cubed ice.", "build"),
    S("倒入蔓越莓汁、柠檬汁、伍斯特酱与塔巴斯科。", "Pour cranberry juice, lemon juice, Worcestershire sauce and Tabasco over the ice.", "build"),
    S("搅拌均匀，柠檬片装饰。", "Stir gently and garnish with a lemon slice.", "stir", "5s"),
  ],
  techniques: T("sugar-rim", "build", "stir"),
});

newRecipes.push({
  slug: "shirley-temple", nameZh: "雪莉坦布尔", nameEn: "Shirley Temple",
  difficulty: 1, glassType: "highball", iceType: "cubed",
  descriptionZh: "姜汁汽水、石榴糖浆与马拉斯奇诺樱桃的童趣无酒精饮。",
  descriptionEn: "Ginger ale, grenadine and a maraschino cherry — the classic kids' mocktail.",
  storyNoteZh: "1930 年代好莱坞为童星 Shirley Temple 创作的无酒精红色饮品。",
  storyNoteEn: "Created in the 1930s for child star Shirley Temple at Hollywood's Chasen's restaurant.",
  balanceTags: ["refreshing", "sweet", "mocktail", "classic"],
  ingredients: [
    I("ginger-ale", "180ml", true, false, "顶部加满", "to top"),
    I("grenadine", "30ml", true, false, "增加甜度与红色", "for sweetness and red"),
    I("maraschino-cherry", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("高球杯装满冰块。", "Fill a highball with cubed ice.", "build"),
    S("倒入姜汁汽水。", "Pour ginger ale over the ice.", "build"),
    S("缓慢倒入石榴糖浆形成红色渐层。", "Slowly pour the grenadine down the side for a red gradient.", "build"),
    S("马拉斯奇诺樱桃装饰。", "Garnish with a maraschino cherry.", null),
  ],
  techniques: T("build"),
});

newRecipes.push({
  slug: "roy-rogers", nameZh: "罗伊罗杰斯", nameEn: "Roy Rogers",
  difficulty: 1, glassType: "highball", iceType: "cubed",
  descriptionZh: "可乐与石榴糖浆的无酒精「黑色」鸡尾酒，男童版 Shirley Temple。",
  descriptionEn: "Cola and grenadine — the dark mocktail, the boys' Shirley Temple.",
  storyNoteZh: "1970 年代美国为童星 Roy Rogers 创作的无酒精可乐饮品。",
  storyNoteEn: "Created in the 1970s for child star Roy Rogers as a non-alcoholic cola mocktail.",
  balanceTags: ["refreshing", "sweet", "mocktail", "classic"],
  ingredients: [
    I("cola", "180ml", true, false, "顶部加满", "to top"),
    I("grenadine", "30ml", true, false, "增加甜度与红色", "for sweetness and red"),
    I("maraschino-cherry", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("高球杯装满冰块。", "Fill a highball with cubed ice.", "build"),
    S("倒入可乐。", "Pour cola over the ice.", "build"),
    S("缓慢倒入石榴糖浆形成红色渐层。", "Slowly pour the grenadine down the side for a red gradient.", "build"),
    S("马拉斯奇诺樱桃装饰。", "Garnish with a maraschino cherry.", null),
  ],
  techniques: T("build"),
});

newRecipes.push({
  slug: "nojito", nameZh: "无酒精莫吉托", nameEn: "Nojito (Mocktail Mojito)",
  difficulty: 2, glassType: "highball", iceType: "crushed",
  descriptionZh: "薄荷、青柠、糖与苏打水的无酒精 Mojito。",
  descriptionEn: "Mint, lime, sugar and soda — the alcohol-free Mojito.",
  storyNoteZh: "2010 年代流行的无酒精 Mojito 变体，常见于健康饮品菜单。",
  storyNoteEn: "A 2010s alcohol-free Mojito common on health-conscious drink menus.",
  balanceTags: ["refreshing", "herbal", "mocktail", "modern"],
  ingredients: [
    I("mint", "8 leaves", true), I("lime-juice", "30ml", true, false, "现榨", "freshly squeezed"),
    I("sugar", "2 tsp", true), I("soda-water", "180ml", true, false, "顶部加满", "to top"),
    I("mint-sprig", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("高球杯中放入薄荷叶、砂糖与青柠汁。", "Place the mint leaves, sugar and lime juice in a highball.", "build"),
    S("用捣棒轻压薄荷释放香气（避免过度捣压产生苦味）。", "Gently press the mint with a muddler to release the oils (don't over-muddle to avoid bitterness).", "muddle", "10s"),
    S("加满碎冰，顶部加满苏打水。", "Fill with crushed ice and top with soda water.", "build"),
    S("搅拌均匀，薄荷枝装饰。", "Stir gently and garnish with a mint sprig.", "stir", "5s"),
  ],
  techniques: T("muddle", "build", "stir"),
});

newRecipes.push({
  slug: "phony-negroni", nameZh: "假尼格罗尼", nameEn: "Phony Negroni",
  difficulty: 2, glassType: "rocks", iceType: "large",
  descriptionZh: "Seedlip、Lyre's 苦味与 Lyre's 甜味美思组成的无酒精 Negroni 替代。",
  descriptionEn: "Seedlip with non-alcoholic bitter and sweet vermouth — the spirit-free Negroni.",
  storyNoteZh: "2010 年代末无酒精潮流下用 Seedlip 等替代品还原 Negroni 风味。",
  storyNoteEn: "A 2010s end-of-decade spirit-free Negroni using Seedlip and non-alcoholic vermouth substitutes.",
  balanceTags: ["bitter", "herbal", "mocktail", "modern"],
  ingredients: [
    I("seedlip", "30ml", true, false, "NA 基酒", "NA base spirit"),
    I("campari", "30ml", true, false, "或 Lyre's Aperitif Dry", "or Lyre's Aperitif Dry"),
    I("sweet-vermouth", "30ml", true, false, "或 Lyre's Aperitif Rosso", "or Lyre's Aperitif Rosso"),
    I("orange-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("将 Seedlip、Campari（或 NA 替代）与甜味美思加入预冷搅拌杯。", "Add Seedlip, Campari (or NA bitter) and sweet vermouth to a chilled mixing glass.", "stir"),
    S("加冰搅和 30 秒。", "Add ice and stir for 30 seconds.", "stir", "30s"),
    S("滤入装有冰球的 rocks 杯。", "Strain into a rocks glass over a large ice cube.", "stir"),
    S("橙皮喷香装饰。", "Express orange peel over the surface and place as garnish.", "express-peel"),
  ],
  techniques: T("stir", "express-peel"),
});

newRecipes.push({
  slug: "seedlip-sour", nameZh: "思培露酸", nameEn: "Seedlip Sour",
  difficulty: 3, glassType: "coupe", iceType: "none",
  descriptionZh: "Seedlip、柠檬、单糖浆与蛋清的无酒精酸酒。",
  descriptionEn: "Seedlip, lemon, simple and egg white — the spirit-free sour.",
  storyNoteZh: "2010 年代末 Seedlip 推广后流行的无酒精酸酒变体。",
  storyNoteEn: "A 2010s spirit-free sour made possible by Seedlip's non-alcoholic distilled base.",
  balanceTags: ["sour", "herbal", "mocktail", "modern"],
  ingredients: [
    I("seedlip", "60ml", true), I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "15ml", true), I("egg-white", "1 piece", true),
    I("angostura", "2 dashes", false, false, "顶部装饰", "top dash"),
    I("lemon-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加 Seedlip、柠檬汁、单糖浆与蛋清。", "Add Seedlip, lemon juice, simple syrup and egg white to a shaker.", "dry-shake"),
    S("不加冰干摇 15 秒。", "Dry-shake without ice for 15 seconds.", "dry-shake", "15s"),
    S("加冰再摇 12 秒。", "Add ice and shake again for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("顶部滴 2 dashes 安格斯特拉，柠檬皮喷香装饰。", "Top with 2 dashes of Angostura and express lemon peel.", "express-peel"),
  ],
  techniques: T("dry-shake", "shake", "double-strain", "express-peel"),
});

newRecipes.push({
  slug: "lavender-lemonade-spritz", nameZh: "薰衣草柠檬气泡", nameEn: "Lavender Lemonade Spritz",
  difficulty: 1, glassType: "wine", iceType: "cubed",
  descriptionZh: "薰衣草糖浆、柠檬与苏打水的法式花型无酒精气泡饮。",
  descriptionEn: "Lavender syrup, lemon and soda — the French floral mocktail spritz.",
  storyNoteZh: "2010 年代法国普罗旺斯风行的薰衣草柠檬花型无酒精饮品。",
  storyNoteEn: "A 2010s Provençal lavender-lemon floral mocktail.",
  balanceTags: ["refreshing", "floral", "low-abv", "mocktail", "modern"],
  ingredients: [
    I("lavender-syrup", "30ml", true), I("lemon-juice", "30ml", true, false, "现榨", "freshly squeezed"),
    I("soda-water", "180ml", true, false, "顶部加满", "to top"),
    I("lemon-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("大葡萄酒杯装满冰块。", "Fill a large wine glass with cubed ice.", "build"),
    S("倒入薰衣草糖浆与柠檬汁。", "Pour lavender syrup and lemon juice over the ice.", "build"),
    S("顶部加满苏打水。", "Top with soda water.", "build"),
    S("搅拌均匀，柠檬片装饰。", "Stir gently and garnish with a lemon slice.", "stir", "5s"),
  ],
  techniques: T("build", "stir"),
});

newRecipes.push({
  slug: "cucumber-cooler", nameZh: "黄瓜清凉饮", nameEn: "Cucumber Cooler (Zero-Proof)",
  difficulty: 2, glassType: "highball", iceType: "cubed",
  descriptionZh: "黄瓜、青柠、St-Germain 与汤力水的无酒精夏季清凉饮。",
  descriptionEn: "Cucumber, lime, elderflower and tonic — the spirit-free summer cooler.",
  storyNoteZh: "2010 年代流行的无酒精夏季黄瓜汤力水。",
  storyNoteEn: "A 2010s spirit-free summer cucumber-tonic cooler.",
  balanceTags: ["refreshing", "floral", "mocktail", "modern"],
  ingredients: [
    I("cucumber", "3 slices", true), I("lime-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("st-germain", "15ml", true, false, "或 elderflower cordial", "or elderflower cordial"),
    I("simple-syrup", "7.5ml", false), I("tonic", "180ml", true, false, "顶部加满", "to top"),
    I("mint-sprig", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("高球杯中放入 3 片黄瓜。", "Place 3 cucumber slices in a highball.", "build"),
    S("用捣棒轻压黄瓜释放汁水。", "Gently muddle the cucumber to release the juice.", "muddle", "5s"),
    S("加满冰块，倒入柠檬汁、St-Germain 与单糖浆。", "Fill with ice; add lime juice, St-Germain and simple syrup.", "build"),
    S("顶部加满汤力水，搅拌均匀。", "Top with tonic water and stir gently.", "stir", "5s"),
    S("黄瓜片装饰。", "Garnish with a cucumber slice.", null),
  ],
  techniques: T("muddle", "build", "stir"),
});

newRecipes.push({
  slug: "pineapple-ginger-mocktail", nameZh: "菠萝姜汁无酒精饮", nameEn: "Pineapple Ginger Mocktail",
  difficulty: 2, glassType: "highball", iceType: "cubed",
  descriptionZh: "菠萝汁、姜糖浆、青柠与苏打水的热带无酒精鸡尾酒。",
  descriptionEn: "Pineapple juice, ginger syrup, lime and soda — the tropical spirit-free cooler.",
  storyNoteZh: "2010 年代健康饮品潮流下流行的热带姜汁无酒精鸡尾酒。",
  storyNoteEn: "A 2010s health-conscious tropical ginger mocktail.",
  balanceTags: ["refreshing", "spicy", "tropical", "mocktail", "modern"],
  ingredients: [
    I("pineapple-juice", "90ml", true, false, "现榨", "freshly squeezed"),
    I("ginger-syrup", "22.5ml", true), I("lime-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("soda-water", "90ml", true, false, "顶部加满", "to top"),
    I("mint-sprig", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("高球杯装满冰块。", "Fill a highball with cubed ice.", "build"),
    S("倒入菠萝汁、姜糖浆与青柠汁。", "Pour pineapple juice, ginger syrup and lime juice over the ice.", "build"),
    S("顶部加满苏打水。", "Top with soda water.", "build"),
    S("搅拌均匀，薄荷枝装饰。", "Stir gently and garnish with a mint sprig.", "stir", "5s"),
  ],
  techniques: T("build", "stir"),
});

newRecipes.push({
  slug: "hibiscus-cooler", nameZh: "洛神花清凉饮", nameEn: "Hibiscus Cooler",
  difficulty: 2, glassType: "highball", iceType: "cubed",
  descriptionZh: "洛神花糖浆、石榴汁、青柠与苏打水的红宝石色无酒精清凉饮。",
  descriptionEn: "Hibiscus syrup, pomegranate juice, lime and soda — the ruby-red spirit-free cooler.",
  storyNoteZh: "2010 年代流行的洛神花与石榴红宝石色无酒精气泡饮。",
  storyNoteEn: "A 2010s ruby-red hibiscus-pomegranate spirit-free cooler.",
  balanceTags: ["refreshing", "floral", "tart", "mocktail", "modern"],
  ingredients: [
    I("hibiscus-syrup", "30ml", true), I("pomegranate-juice", "60ml", true, false, "现榨", "freshly squeezed"),
    I("lime-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("soda-water", "120ml", true, false, "顶部加满", "to top"),
    I("lime-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("高球杯装满冰块。", "Fill a highball with cubed ice.", "build"),
    S("倒入洛神花糖浆、石榴汁与青柠汁。", "Pour hibiscus syrup, pomegranate juice and lime juice over the ice.", "build"),
    S("顶部加满苏打水。", "Top with soda water.", "build"),
    S("搅拌均匀，柠檬皮喷香装饰。", "Stir gently and garnish with an expressed lime peel.", "stir", "5s"),
  ],
  techniques: T("build", "stir", "express-peel"),
});

console.log(`After mocktails: ${newRecipes.length} recipes defined`);

module.exports = { newRecipes };
