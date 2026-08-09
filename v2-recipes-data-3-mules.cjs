// v2-recipes-data-3-mules.cjs — Mule / Collins / Fizz family (15)
const { I, S, T } = require("./v2-recipes-data.cjs");

const newRecipes = [];

// ════════════════════════════════════════════════════════════════════════════
// 3. MULE / COLLINS / FIZZ FAMILY (15)
// ════════════════════════════════════════════════════════════════════════════

newRecipes.push({
  slug: "mexican-mule", nameZh: "墨西哥骡子", nameEn: "Mexican Mule",
  difficulty: 1, glassType: "copper-mug", iceType: "cubed",
  descriptionZh: "龙舌兰、柠檬与姜汁啤酒的墨西哥版 Moscow Mule。",
  descriptionEn: "Tequila, lime and ginger beer — the Mexican cousin of the Moscow Mule.",
  storyNoteZh: "2010 年代墨西哥与美国流行的龙舌兰版 Moscow Mule 变体。",
  storyNoteEn: "A 2010s Mexican and American tequila version of the Moscow Mule.",
  balanceTags: ["refreshing", "spicy", "highball", "classic-variant"],
  ingredients: [
    I("tequila-blanco", "60ml", true), I("lime-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "7.5ml", false), I("ginger-beer", "120ml", true, false, "顶部加满", "to top"),
    I("lime-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("铜杯装满冰块。", "Fill a copper mug with cubed ice.", "build"),
    S("倒入龙舌兰、柠檬汁与单糖浆。", "Pour tequila, lime juice and simple syrup over the ice.", "build"),
    S("顶部加满姜汁啤酒。", "Top with ginger beer.", "build"),
    S("搅拌均匀，柠檬皮喷香装饰。", "Stir gently and garnish with an expressed lime peel.", "stir", "5s"),
  ],
  techniques: T("build", "stir", "express-peel"),
});

newRecipes.push({
  slug: "irish-mule", nameZh: "爱尔兰骡子", nameEn: "Irish Mule",
  difficulty: 1, glassType: "copper-mug", iceType: "cubed",
  descriptionZh: "爱尔兰威士忌、柠檬与姜汁啤酒的爱尔兰版 Moscow Mule。",
  descriptionEn: "Irish whiskey, lime and ginger beer — the Irish cousin of the Moscow Mule.",
  storyNoteZh: "2010 年代爱尔兰威士忌品牌 Jameson 推广的爱尔兰版 Moscow Mule 变体。",
  storyNoteEn: "A 2010s Jameson-promoted Irish whiskey version of the Moscow Mule.",
  balanceTags: ["refreshing", "spicy", "highball", "classic-variant"],
  ingredients: [
    I("irish-whiskey", "60ml", true), I("lime-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "7.5ml", false), I("ginger-beer", "120ml", true, false, "顶部加满", "to top"),
    I("lime-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("铜杯装满冰块。", "Fill a copper mug with cubed ice.", "build"),
    S("倒入爱尔兰威士忌、柠檬汁与单糖浆。", "Pour Irish whiskey, lime juice and simple syrup over the ice.", "build"),
    S("顶部加满姜汁啤酒。", "Top with ginger beer.", "build"),
    S("搅拌均匀，柠檬皮喷香装饰。", "Stir gently and garnish with an expressed lime peel.", "stir", "5s"),
  ],
  techniques: T("build", "stir", "express-peel"),
});

newRecipes.push({
  slug: "kentucky-mule", nameZh: "肯塔基骡子", nameEn: "Kentucky Mule",
  difficulty: 1, glassType: "copper-mug", iceType: "cubed",
  descriptionZh: "波本威士忌、柠檬与姜汁啤酒的肯塔基版 Moscow Mule。",
  descriptionEn: "Bourbon, lime and ginger beer — the Kentucky cousin of the Moscow Mule.",
  storyNoteZh: "2010 年代美国南方流行的波本版 Moscow Mule 变体。",
  storyNoteEn: "A 2010s American bourbon version of the Moscow Mule, popular in the South.",
  balanceTags: ["refreshing", "spicy", "highball", "classic-variant"],
  ingredients: [
    I("bourbon", "60ml", true), I("lime-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "7.5ml", false), I("ginger-beer", "120ml", true, false, "顶部加满", "to top"),
    I("mint-sprig", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("铜杯装满冰块。", "Fill a copper mug with cubed ice.", "build"),
    S("倒入波本、柠檬汁与单糖浆。", "Pour bourbon, lime juice and simple syrup over the ice.", "build"),
    S("顶部加满姜汁啤酒。", "Top with ginger beer.", "build"),
    S("搅拌均匀，薄荷枝装饰。", "Stir gently and garnish with a mint sprig.", "stir", "5s"),
  ],
  techniques: T("build", "stir"),
});

newRecipes.push({
  slug: "jamaican-mule", nameZh: "牙买加骡子", nameEn: "Jamaican Mule",
  difficulty: 1, glassType: "copper-mug", iceType: "cubed",
  descriptionZh: "牙买加黑朗姆、柠檬与姜汁啤酒的加勒比海版 Moscow Mule。",
  descriptionEn: "Jamaican dark rum, lime and ginger beer — the Caribbean cousin of the Moscow Mule.",
  storyNoteZh: "2010 年代加勒比海与迈阿密流行的牙买加黑朗姆版 Moscow Mule 变体。",
  storyNoteEn: "A 2010s Caribbean and Miami dark-rum version of the Moscow Mule.",
  balanceTags: ["refreshing", "spicy", "tiki-edge", "classic-variant"],
  ingredients: [
    I("dark-rum", "60ml", true), I("lime-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "7.5ml", false), I("ginger-beer", "120ml", true, false, "顶部加满", "to top"),
    I("lime-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("铜杯装满冰块。", "Fill a copper mug with cubed ice.", "build"),
    S("倒入黑朗姆、柠檬汁与单糖浆。", "Pour dark rum, lime juice and simple syrup over the ice.", "build"),
    S("顶部加满姜汁啤酒。", "Top with ginger beer.", "build"),
    S("搅拌均匀，柠檬皮喷香装饰。", "Stir gently and garnish with an expressed lime peel.", "stir", "5s"),
  ],
  techniques: T("build", "stir", "express-peel"),
});

newRecipes.push({
  slug: "pineapple-mule", nameZh: "菠萝骡子", nameEn: "Pineapple Mule",
  difficulty: 1, glassType: "copper-mug", iceType: "cubed",
  descriptionZh: "白朗姆、菠萝汁、柠檬与姜汁啤酒的热带版 Moscow Mule。",
  descriptionEn: "White rum, pineapple juice, lime and ginger beer — the tropical mule.",
  storyNoteZh: "2010 年代 craft 酒吧热带风 Moscow Mule 变体。",
  storyNoteEn: "A 2010s craft-bar tropical-flavour Moscow Mule variant.",
  balanceTags: ["refreshing", "spicy", "tropical", "modern"],
  ingredients: [
    I("white-rum", "60ml", true), I("pineapple-juice", "60ml", true, false, "现榨", "freshly squeezed"),
    I("lime-juice", "15ml", true, false, "现榨", "freshly squeezed"),
    I("ginger-beer", "90ml", true, false, "顶部加满", "to top"),
    I("mint-sprig", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("铜杯装满冰块。", "Fill a copper mug with cubed ice.", "build"),
    S("倒入白朗姆、菠萝汁与柠檬汁。", "Pour white rum, pineapple juice and lime juice over the ice.", "build"),
    S("顶部加满姜汁啤酒。", "Top with ginger beer.", "build"),
    S("搅拌均匀，菠萝片装饰。", "Stir gently and garnish with a pineapple slice.", "stir", "5s"),
  ],
  techniques: T("build", "stir"),
});

newRecipes.push({
  slug: "peach-mule", nameZh: "桃子骡子", nameEn: "Peach Mule",
  difficulty: 1, glassType: "copper-mug", iceType: "cubed",
  descriptionZh: "波本、桃子、柠檬与姜汁啤酒的南方夏日 Moscow Mule 变体。",
  descriptionEn: "Bourbon, peach, lime and ginger beer — the Southern summer mule.",
  storyNoteZh: "2010 年代美国南方夏日流行的桃子版 Moscow Mule 变体。",
  storyNoteEn: "A 2010s American Southern summer peach-flavour Moscow Mule variant.",
  balanceTags: ["refreshing", "spicy", "fruity", "modern"],
  ingredients: [
    I("bourbon", "60ml", true), I("peach-puree", "30ml", true), I("lime-juice", "15ml", true, false, "现榨", "freshly squeezed"),
    I("ginger-beer", "120ml", true, false, "顶部加满", "to top"),
    I("mint-sprig", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("铜杯装满冰块。", "Fill a copper mug with cubed ice.", "build"),
    S("倒入波本、桃子果泥与柠檬汁。", "Pour bourbon, peach purée and lime juice over the ice.", "build"),
    S("顶部加满姜汁啤酒。", "Top with ginger beer.", "build"),
    S("搅拌均匀，桃片装饰。", "Stir gently and garnish with a peach slice.", "stir", "5s"),
  ],
  techniques: T("build", "stir"),
});

newRecipes.push({
  slug: "mezcal-mule", nameZh: "梅斯卡尔骡子", nameEn: "Mezcal Mule",
  difficulty: 1, glassType: "copper-mug", iceType: "cubed",
  descriptionZh: "梅斯卡尔、柠檬与姜汁啤酒的烟熏版 Moscow Mule。",
  descriptionEn: "Mezcal, lime and ginger beer — the smoky mule.",
  storyNoteZh: "2010 年代墨西哥 craft 酒吧流行的梅斯卡尔版 Moscow Mule 变体。",
  storyNoteEn: "A 2010s Mexican craft-bar mezcal version of the Moscow Mule.",
  balanceTags: ["refreshing", "spicy", "smoky", "modern"],
  ingredients: [
    I("mezcal", "60ml", true), I("lime-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "7.5ml", false), I("ginger-beer", "120ml", true, false, "顶部加满", "to top"),
    I("lime-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("铜杯装满冰块。", "Fill a copper mug with cubed ice.", "build"),
    S("倒入梅斯卡尔、柠檬汁与单糖浆。", "Pour mezcal, lime juice and simple syrup over the ice.", "build"),
    S("顶部加满姜汁啤酒。", "Top with ginger beer.", "build"),
    S("搅拌均匀，柠檬皮喷香装饰。", "Stir gently and garnish with an expressed lime peel.", "stir", "5s"),
  ],
  techniques: T("build", "stir", "express-peel"),
});

newRecipes.push({
  slug: "spanish-mule", nameZh: "西班牙骡子", nameEn: "Spanish Mule",
  difficulty: 1, glassType: "copper-mug", iceType: "cubed",
  descriptionZh: "Prosecco、柠檬与姜汁啤酒的西班牙低酒精度骡子。",
  descriptionEn: "Prosecco, lime and ginger beer — the low-ABV Spanish mule.",
  storyNoteZh: "2010 年代西班牙流行的低酒精度起泡骡子变体。",
  storyNoteEn: "A 2010s Spanish low-ABV sparkling mule variant.",
  balanceTags: ["refreshing", "spicy", "low-abv", "modern"],
  ingredients: [
    I("prosecco", "90ml", true, false, "冰镇", "chilled"), I("lime-juice", "15ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "7.5ml", false), I("ginger-beer", "90ml", true, false, "顶部加满", "to top"),
    I("lime-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("铜杯装满冰块。", "Fill a copper mug with cubed ice.", "build"),
    S("倒入 Prosecco、柠檬汁与单糖浆。", "Pour Prosecco, lime juice and simple syrup over the ice.", "build"),
    S("顶部加满姜汁啤酒。", "Top with ginger beer.", "build"),
    S("搅拌均匀，柠檬皮喷香装饰。", "Stir gently and garnish with an expressed lime peel.", "stir", "5s"),
  ],
  techniques: T("build", "stir", "express-peel"),
});

newRecipes.push({
  slug: "st-germain-mule", nameZh: "接骨木花骡子", nameEn: "St-Germain Mule",
  difficulty: 1, glassType: "copper-mug", iceType: "cubed",
  descriptionZh: "金酒、St-Germain、柠檬与姜汁啤酒的花香 Moscow Mule 变体。",
  descriptionEn: "Gin, St-Germain, lime and ginger beer — the floral mule.",
  storyNoteZh: "2007 年 St-Germain 上市后流行的花香 Moscow Mule 变体。",
  storyNoteEn: "A floral Moscow Mule variant popular after St-Germain's 2007 launch.",
  balanceTags: ["refreshing", "spicy", "floral", "modern"],
  ingredients: [
    I("gin", "45ml", true), I("st-germain", "22.5ml", true), I("lime-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("ginger-beer", "120ml", true, false, "顶部加满", "to top"),
    I("lime-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("铜杯装满冰块。", "Fill a copper mug with cubed ice.", "build"),
    S("倒入金酒、St-Germain 与柠檬汁。", "Pour gin, St-Germain and lime juice over the ice.", "build"),
    S("顶部加满姜汁啤酒。", "Top with ginger beer.", "build"),
    S("搅拌均匀，柠檬皮喷香装饰。", "Stir gently and garnish with an expressed lime peel.", "stir", "5s"),
  ],
  techniques: T("build", "stir", "express-peel"),
});

newRecipes.push({
  slug: "blood-orange-mule", nameZh: "血橙骡子", nameEn: "Blood Orange Mule",
  difficulty: 1, glassType: "copper-mug", iceType: "cubed",
  descriptionZh: "伏特加、血橙汁、柠檬与姜汁啤酒的橙红 Moscow Mule 变体。",
  descriptionEn: "Vodka, blood orange juice, lime and ginger beer — the sunset mule.",
  storyNoteZh: "2010 年代 craft 酒吧冬季流行的血橙版 Moscow Mule 变体。",
  storyNoteEn: "A 2010s craft-bar winter blood-orange Moscow Mule variant.",
  balanceTags: ["refreshing", "spicy", "citrus", "modern"],
  ingredients: [
    I("vodka", "60ml", true), I("orange-juice", "60ml", true, false, "现榨血橙最佳", "blood orange best"),
    I("lime-juice", "15ml", true, false, "现榨", "freshly squeezed"),
    I("ginger-beer", "90ml", true, false, "顶部加满", "to top"),
    I("orange-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("铜杯装满冰块。", "Fill a copper mug with cubed ice.", "build"),
    S("倒入伏特加、橙汁与柠檬汁。", "Pour vodka, orange juice and lime juice over the ice.", "build"),
    S("顶部加满姜汁啤酒。", "Top with ginger beer.", "build"),
    S("搅拌均匀，橙皮喷香装饰。", "Stir gently and garnish with an expressed orange peel.", "stir", "5s"),
  ],
  techniques: T("build", "stir", "express-peel"),
});

newRecipes.push({
  slug: "apple-mule", nameZh: "苹果骡子", nameEn: "Apple Mule",
  difficulty: 1, glassType: "copper-mug", iceType: "cubed",
  descriptionZh: "Applejack 苹果白兰地、苹果西打、柠檬与姜汁啤酒的秋日版 Moscow Mule。",
  descriptionEn: "Applejack, hard cider, lime and ginger beer — the autumn mule.",
  storyNoteZh: "2010 年代美国东北部秋季流行的苹果白兰地版 Moscow Mule 变体。",
  storyNoteEn: "A 2010s American Northeast autumn Applejack version of the Moscow Mule.",
  balanceTags: ["refreshing", "spicy", "fruity", "modern"],
  ingredients: [
    I("applejack", "60ml", true), I("hard-cider", "60ml", true), I("lime-juice", "15ml", true, false, "现榨", "freshly squeezed"),
    I("ginger-beer", "90ml", true, false, "顶部加满", "to top"),
    I("orange-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("铜杯装满冰块。", "Fill a copper mug with cubed ice.", "build"),
    S("倒入 Applejack、苹果西打与柠檬汁。", "Pour Applejack, hard cider and lime juice over the ice.", "build"),
    S("顶部加满姜汁啤酒。", "Top with ginger beer.", "build"),
    S("搅拌均匀，苹果片装饰。", "Stir gently and garnish with an apple slice.", "stir", "5s"),
  ],
  techniques: T("build", "stir"),
});

newRecipes.push({
  slug: "passion-fruit-mule", nameZh: "百香果骡子", nameEn: "Passion Fruit Mule",
  difficulty: 1, glassType: "copper-mug", iceType: "cubed",
  descriptionZh: "白朗姆、百香果糖浆、柠檬与姜汁啤酒的热带版 Moscow Mule。",
  descriptionEn: "White rum, passion fruit syrup, lime and ginger beer — the tropical mule.",
  storyNoteZh: "2010 年代 craft 酒吧热带风 Moscow Mule 变体。",
  storyNoteEn: "A 2010s craft-bar tropical Moscow Mule variant.",
  balanceTags: ["refreshing", "spicy", "tropical", "modern"],
  ingredients: [
    I("white-rum", "60ml", true), I("passion-fruit-syrup", "30ml", true), I("lime-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("ginger-beer", "120ml", true, false, "顶部加满", "to top"),
    I("lime-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("铜杯装满冰块。", "Fill a copper mug with cubed ice.", "build"),
    S("倒入白朗姆、百香果糖浆与柠檬汁。", "Pour white rum, passion fruit syrup and lime juice over the ice.", "build"),
    S("顶部加满姜汁啤酒。", "Top with ginger beer.", "build"),
    S("搅拌均匀，柠檬皮喷香装饰。", "Stir gently and garnish with an expressed lime peel.", "stir", "5s"),
  ],
  techniques: T("build", "stir", "express-peel"),
});

newRecipes.push({
  slug: "coconut-mule", nameZh: "椰子骡子", nameEn: "Coconut Mule",
  difficulty: 1, glassType: "copper-mug", iceType: "cubed",
  descriptionZh: "白朗姆、椰子奶油、菠萝汁、柠檬与姜汁啤酒的椰林飘香版 Moscow Mule。",
  descriptionEn: "White rum, coconut cream, pineapple juice, lime and ginger beer — the tiki mule.",
  storyNoteZh: "2010 年代 craft 酒吧椰林风 Moscow Mule 变体。",
  storyNoteEn: "A 2010s craft-bar tiki-flavour Moscow Mule variant.",
  balanceTags: ["refreshing", "spicy", "tropical", "modern"],
  ingredients: [
    I("white-rum", "45ml", true), I("coconut-cream", "30ml", true), I("pineapple-juice", "45ml", true, false, "现榨", "freshly squeezed"),
    I("lime-juice", "15ml", true, false, "现榨", "freshly squeezed"),
    I("ginger-beer", "90ml", true, false, "顶部加满", "to top"),
    I("mint-sprig", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("铜杯装满冰块。", "Fill a copper mug with cubed ice.", "build"),
    S("倒入白朗姆、椰子奶油、菠萝汁与柠檬汁，搅拌均匀。", "Pour white rum, coconut cream, pineapple juice and lime juice over the ice and stir to combine.", "build"),
    S("顶部加满姜汁啤酒。", "Top with ginger beer.", "build"),
    S("菠萝片装饰。", "Garnish with a pineapple slice.", null),
  ],
  techniques: T("build", "stir"),
});

newRecipes.push({
  slug: "grapefruit-mule", nameZh: "西柚骡子", nameEn: "Grapefruit Mule",
  difficulty: 1, glassType: "copper-mug", iceType: "cubed",
  descriptionZh: "龙舌兰、西柚汁、柠檬与姜汁啤酒的 Paloma 风格骡子。",
  descriptionEn: "Tequila, grapefruit juice, lime and ginger beer — the Paloma-style mule.",
  storyNoteZh: "2010 年代墨西哥与美国流行的 Paloma 风格 Moscow Mule 变体。",
  storyNoteEn: "A 2010s Mexican and American Paloma-flavour Moscow Mule variant.",
  balanceTags: ["refreshing", "spicy", "citrus", "modern"],
  ingredients: [
    I("tequila-blanco", "60ml", true), I("grapefruit-juice", "60ml", true, false, "现榨", "freshly squeezed"),
    I("lime-juice", "15ml", true, false, "现榨", "freshly squeezed"),
    I("ginger-beer", "90ml", true, false, "顶部加满", "to top"),
    I("lime-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("铜杯装满冰块。", "Fill a copper mug with cubed ice.", "build"),
    S("倒入龙舌兰、西柚汁与柠檬汁。", "Pour tequila, grapefruit juice and lime juice over the ice.", "build"),
    S("顶部加满姜汁啤酒。", "Top with ginger beer.", "build"),
    S("搅拌均匀，柠檬皮喷香装饰。", "Stir gently and garnish with an expressed lime peel.", "stir", "5s"),
  ],
  techniques: T("build", "stir", "express-peel"),
});

newRecipes.push({
  slug: "cherry-mule", nameZh: "樱桃骡子", nameEn: "Cherry Mule",
  difficulty: 1, glassType: "copper-mug", iceType: "cubed",
  descriptionZh: "波本、樱桃利口酒、柠檬与姜汁啤酒的樱桃风味 Moscow Mule 变体。",
  descriptionEn: "Bourbon, cherry liqueur, lime and ginger beer — the cherry mule.",
  storyNoteZh: "2010 年代 craft 酒吧樱桃风 Moscow Mule 变体。",
  storyNoteEn: "A 2010s craft-bar cherry-flavour Moscow Mule variant.",
  balanceTags: ["refreshing", "spicy", "fruity", "modern"],
  ingredients: [
    I("bourbon", "60ml", true), I("cherry-heering", "15ml", true), I("lime-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("ginger-beer", "120ml", true, false, "顶部加满", "to top"),
    I("amarena-cherry", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("铜杯装满冰块。", "Fill a copper mug with cubed ice.", "build"),
    S("倒入波本、樱桃利口酒与柠檬汁。", "Pour bourbon, cherry Heering and lime juice over the ice.", "build"),
    S("顶部加满姜汁啤酒。", "Top with ginger beer.", "build"),
    S("搅拌均匀，阿玛雷纳樱桃装饰。", "Stir gently and garnish with an Amarena cherry.", "stir", "5s"),
  ],
  techniques: T("build", "stir"),
});

console.log(`After mules: ${newRecipes.length} recipes defined`);

module.exports = { newRecipes };
