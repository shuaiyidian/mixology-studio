// v2-recipes-data-5-modern.cjs — Modern craft (post-2010) (15)
const { I, S, T } = require("./v2-recipes-data.cjs");

const newRecipes = [];

// ════════════════════════════════════════════════════════════════════════════
// 5. MODERN CRAFT (post-2010) (15)
// ════════════════════════════════════════════════════════════════════════════

newRecipes.push({
  slug: "oaxaca-old-fashioned", nameZh: "瓦哈卡古典", nameEn: "Oaxaca Old Fashioned",
  difficulty: 2, glassType: "rocks", iceType: "large",
  descriptionZh: "Reposado 龙舌兰、梅斯卡尔、龙舌兰糖浆与可可苦精的现代古典。",
  descriptionEn: "Reposado tequila, mezcal, agave and chocolate bitters — the smoky modern Old Fashioned.",
  storyNoteZh: "2006-2007 年纽约 Death & Co 调酒师 Phil Ward 创作的龙舌兰古典变体，瓦哈卡是墨西哥梅斯卡尔产地。",
  storyNoteEn: "Created in 2006-07 by Phil Ward at Death & Co NYC, named for the Mexican mezcal-producing region of Oaxaca.",
  balanceTags: ["spirit-forward", "smoky", "modern"],
  ingredients: [
    I("tequila-reposado", "45ml", true), I("mezcal", "15ml", true),
    I("agave-syrup", "1 tsp", true, false, "2:1 龙舌兰糖浆", "2:1 agave-water"),
    I("chocolate-bitters", "2 dashes", true),
    I("orange-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("将 Reposado 龙舌兰、梅斯卡尔、龙舌兰糖浆与可可苦精加入预冷搅拌杯。", "Add reposado tequila, mezcal, agave syrup and chocolate bitters to a chilled mixing glass.", "stir"),
    S("加冰搅和 25 秒。", "Add ice and stir for 25 seconds.", "stir", "25s"),
    S("滤入装有冰球的 rocks 杯。", "Strain into a rocks glass over a large ice cube.", "stir"),
    S("橙皮喷香装饰。", "Express orange peel over the surface and place as garnish.", "express-peel"),
  ],
  techniques: T("stir", "express-peel"),
});

newRecipes.push({
  slug: "dead-rabbit-irish-coffee", nameZh: "死兔爱尔兰咖啡", nameEn: "Dead Rabbit Irish Coffee",
  difficulty: 3, glassType: "irish-coffee", iceType: "none",
  descriptionZh: "爱尔兰威士忌、德麦拉拉糖浆、现萃浓缩咖啡与冷奶油的死兔酒吧版本。",
  descriptionEn: "Irish whiskey, demerara sugar, fresh espresso and cold cream — the Dead Rabbit's signature version.",
  storyNoteZh: "2010 年代纽约 Dead Rabbit 酒吧改良的爱尔兰咖啡版本，奶油层用冷奶油缓慢倒入形成清晰分层。",
  storyNoteEn: "A 2010s refinement of the classic Irish coffee by the Dead Rabbit bar in NYC, with a hand-poured cold-cream cap.",
  balanceTags: ["warm", "coffee", "creamy", "modern"],
  ingredients: [
    I("irish-whiskey", "60ml", true), I("demerara-syrup", "15ml", true, false, "1:1", "1:1 demerara-water"),
    I("espresso", "90ml", true, false, "新鲜现萃", "freshly pulled"),
    I("heavy-cream", "30ml", true, false, "轻打至浓稠酸奶状", "lightly whipped"),
    I("nutmeg", "1 pinch", false, false, "顶部装饰", "top grate"),
  ],
  steps: [
    S("预热爱尔兰咖啡杯。", "Warm an Irish coffee glass with hot water.", "build"),
    S("倒掉热水，加入爱尔兰威士忌与德麦拉拉糖浆，搅拌溶解。", "Discard the water; add Irish whiskey and demerara syrup and stir to dissolve.", "stir"),
    S("加入现萃浓缩咖啡。", "Add the freshly pulled espresso.", "build"),
    S("用吧匙背面将轻打奶油缓慢倒在咖啡表面形成分层。", "Slowly pour the lightly whipped cream over the back of a bar spoon to float on top.", "build"),
    S("顶部磨少许肉豆蔻装饰。", "Grate a pinch of nutmeg over the top.", null),
  ],
  techniques: T("stir", "build"),
});

newRecipes.push({
  slug: "los-angeles-negroni", nameZh: "洛杉矶尼格罗尼", nameEn: "Los Angeles Negroni",
  difficulty: 2, glassType: "rocks", iceType: "large",
  descriptionZh: "金酒、Lillet Blanc 与甜味美思的洛杉矶无 Campari Negroni 变体。",
  descriptionEn: "Gin, Lillet Blanc and sweet vermouth — the LA Campari-free Negroni.",
  storyNoteZh: "2010 年代洛杉矶 craft 酒吧流行的无 Campari 苍白版 Negroni 变体。",
  storyNoteEn: "A 2010s Los Angeles craft-bar Campari-free pale Negroni variant.",
  balanceTags: ["bitter", "elegant", "classic-variant"],
  ingredients: [
    I("gin", "30ml", true), I("lillet-blanc", "30ml", true), I("sweet-vermouth", "30ml", true),
    I("orange-bitters", "2 dashes", true), I("orange-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("将金酒、Lillet Blanc、甜味美思与橙皮苦精加入预冷搅拌杯。", "Add gin, Lillet Blanc, sweet vermouth and orange bitters to a chilled mixing glass.", "stir"),
    S("加冰搅和 30 秒。", "Add ice and stir for 30 seconds.", "stir", "30s"),
    S("滤入装有冰球的 rocks 杯。", "Strain into a rocks glass over a large ice cube.", "stir"),
    S("橙皮喷香装饰。", "Express orange peel over the surface and place as garnish.", "express-peel"),
  ],
  techniques: T("stir", "express-peel"),
});

newRecipes.push({
  slug: "conference", nameZh: "会议", nameEn: "Conference",
  difficulty: 2, glassType: "coupe", iceType: "none",
  descriptionZh: "Applejack、Becherovka、柠檬与单糖浆的 Death & Co 捷克香料酸酒。",
  descriptionEn: "Applejack, Becherovka, lemon and simple — Death & Co's Czech-spice sour.",
  storyNoteZh: "2007 年纽约 Death & Co 调酒书收录的苹果白兰地+捷克草药利口酒酸酒。",
  storyNoteEn: "A 2007 Death & Co NYC cocktail pairing American applejack with Czech herbal Becherovka.",
  balanceTags: ["sour", "herbal", "modern"],
  ingredients: [
    I("applejack", "60ml", true), I("becherovka", "15ml", true),
    I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "15ml", true), I("lemon-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加 Applejack、Becherovka、柠檬汁与单糖浆。", "Add Applejack, Becherovka, lemon juice and simple syrup to a shaker.", "shake"),
    S("加冰摇和 12 秒。", "Fill with ice and shake for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("柠檬皮喷香装饰。", "Express lemon peel over the surface and place as garnish.", "express-peel"),
  ],
  techniques: T("shake", "double-strain", "express-peel"),
});

newRecipes.push({
  slug: "amor-y-amargo", nameZh: "爱与苦", nameEn: "Amor y Amargo",
  difficulty: 3, glassType: "coupe", iceType: "none",
  descriptionZh: "波本、Cynar、Aperol、柠檬与蛋清的 Death & Co 三苦酒酸酒。",
  descriptionEn: "Bourbon, Cynar, Aperol, lemon and egg white — Death & Co's three-bitters sour.",
  storyNoteZh: "2008 年纽约 Death & Co 调酒师 Joaquín Simó 创作的三重苦酒（Campari、Cynar、Aperol）酸酒。",
  storyNoteEn: "Created in 2008 by Joaquín Simó at Death & Co NYC, layering Cynar, Aperol and Bourbon's bitter profile.",
  balanceTags: ["sour", "bitter", "rich", "modern"],
  ingredients: [
    I("bourbon", "45ml", true), I("cynar", "15ml", true), I("aperol", "15ml", true),
    I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "7.5ml", false), I("egg-white", "1 piece", false, false, "可选", "optional"),
    I("orange-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加波本、Cynar、Aperol、柠檬汁与单糖浆（可选加蛋清）。", "Add bourbon, Cynar, Aperol, lemon juice and simple syrup (and egg white if using) to a shaker.", "dry-shake"),
    S("不加冰干摇 15 秒。", "Dry-shake without ice for 15 seconds.", "dry-shake", "15s"),
    S("加冰再摇 12 秒。", "Add ice and shake again for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("橙皮喷香装饰。", "Express orange peel over the surface and place as garnish.", "express-peel"),
  ],
  techniques: T("dry-shake", "shake", "double-strain", "express-peel"),
});

newRecipes.push({
  slug: "thunderbolt", nameZh: "霹雳", nameEn: "Thunderbolt",
  difficulty: 3, glassType: "coupe", iceType: "none",
  descriptionZh: "干邑、Averna、樱桃利口酒、柠檬与蛋清的 Death & Co 干邑酸酒。",
  descriptionEn: "Cognac, Averna, cherry Heering, lemon and egg white — Death & Co's cognac sour.",
  storyNoteZh: "2010 年纽约 Death & Co 调酒书收录的干邑+意大利苦酒+樱桃利口酒三层风味酸酒。",
  storyNoteEn: "A 2010 Death & Co NYC cognac-Italian-amaro-cherry sour from their cocktail book.",
  balanceTags: ["sour", "rich", "spirited", "modern"],
  ingredients: [
    I("cognac", "45ml", true), I("averna", "15ml", true), I("cherry-heering", "15ml", true),
    I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "7.5ml", false), I("egg-white", "1 piece", false, false, "可选", "optional"),
    I("orange-bitters", "2 dashes", false, false, "顶部装饰", "top dash"),
    I("lemon-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加干邑、Averna、樱桃利口酒、柠檬汁与单糖浆（可选加蛋清）。", "Add cognac, Averna, cherry Heering, lemon juice and simple syrup (and egg white if using) to a shaker.", "dry-shake"),
    S("不加冰干摇 15 秒。", "Dry-shake without ice for 15 seconds.", "dry-shake", "15s"),
    S("加冰再摇 12 秒。", "Add ice and shake again for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("顶部滴 2 dashes 橙皮苦精，柠檬皮喷香装饰。", "Top with 2 dashes of orange bitters; express lemon peel.", "express-peel"),
  ],
  techniques: T("dry-shake", "shake", "double-strain", "express-peel"),
});

newRecipes.push({
  slug: "obituary", nameZh: "讣告", nameEn: "Obituary",
  difficulty: 3, glassType: "coupe", iceType: "none",
  descriptionZh: "波本、Cynar、甜味美思、柠檬与蛋清的 Death & Co 苦味酸酒。",
  descriptionEn: "Bourbon, Cynar, sweet vermouth, lemon and egg white — Death & Co's bitter-bourbon sour.",
  storyNoteZh: "2009 年纽约 Death & Co 调酒书收录的苦味波本酸酒。",
  storyNoteEn: "A 2009 Death & Co NYC bitter-bourbon sour from their cocktail book.",
  balanceTags: ["sour", "bitter", "rich", "modern"],
  ingredients: [
    I("bourbon", "60ml", true), I("cynar", "15ml", true), I("sweet-vermouth", "15ml", true),
    I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "7.5ml", false), I("egg-white", "1 piece", false, false, "可选", "optional"),
    I("orange-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加波本、Cynar、甜味美思、柠檬汁与单糖浆（可选加蛋清）。", "Add bourbon, Cynar, sweet vermouth, lemon juice and simple syrup (and egg white if using) to a shaker.", "dry-shake"),
    S("不加冰干摇 15 秒。", "Dry-shake without ice for 15 seconds.", "dry-shake", "15s"),
    S("加冰再摇 12 秒。", "Add ice and shake again for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("橙皮喷香装饰。", "Express orange peel over the surface and place as garnish.", "express-peel"),
  ],
  techniques: T("dry-shake", "shake", "double-strain", "express-peel"),
});

newRecipes.push({
  slug: "east-india", nameZh: "东印度", nameEn: "East India",
  difficulty: 2, glassType: "coupe", iceType: "none",
  descriptionZh: "白兰地、橙皮酒、菠萝与苦精的 19 世纪东印度公司经典。",
  descriptionEn: "Brandy, curaçao, pineapple and bitters — the 19th-century East India Company classic.",
  storyNoteZh: "1870 年代纽约 East India Hotel 起源的 19 世纪经典鸡尾酒，2010 年代 craft 酒吧复兴。",
  storyNoteEn: "A 1870s New York East India Hotel classic, revived by 2010s craft bars.",
  balanceTags: ["sour", "tropical", "spirit-forward", "classic"],
  ingredients: [
    I("cognac", "45ml", true), I("triple-sec", "15ml", true, false, "或 Curaçao", "or curaçao"),
    I("pineapple-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("angostura", "2 dashes", true),
    I("maraschino", "1 tsp", false), I("lemon-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加白兰地、Curaçao、菠萝汁、安格斯特拉与马拉斯奇诺。", "Add cognac, curaçao, pineapple juice, Angostura and maraschino to a shaker.", "shake"),
    S("加冰摇和 12 秒。", "Fill with ice and shake for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("柠檬皮喷香装饰。", "Express lemon peel over the surface and place as garnish.", "express-peel"),
  ],
  techniques: T("shake", "double-strain", "express-peel"),
});

newRecipes.push({
  slug: "wandering-poet", nameZh: "流浪诗人", nameEn: "Wandering Poet",
  difficulty: 3, glassType: "coupe", iceType: "none",
  descriptionZh: "波本、Averna、马拉斯奇诺、柠檬与蛋清的 Death & Co 苦味酸酒。",
  descriptionEn: "Bourbon, Averna, maraschino, lemon and egg white — Death & Co's bitter-poet sour.",
  storyNoteZh: "2011 年纽约 Death & Co 调酒书收录的波本+意大利苦酒+马拉斯奇诺酸酒。",
  storyNoteEn: "A 2011 Death & Co NYC bourbon-Averna-maraschino sour from their cocktail book.",
  balanceTags: ["sour", "bitter", "rich", "modern"],
  ingredients: [
    I("bourbon", "60ml", true), I("averna", "15ml", true), I("maraschino", "7.5ml", true),
    I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "7.5ml", false), I("egg-white", "1 piece", false, false, "可选", "optional"),
    I("lemon-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加波本、Averna、马拉斯奇诺、柠檬汁与单糖浆（可选加蛋清）。", "Add bourbon, Averna, maraschino, lemon juice and simple syrup (and egg white if using) to a shaker.", "dry-shake"),
    S("不加冰干摇 15 秒。", "Dry-shake without ice for 15 seconds.", "dry-shake", "15s"),
    S("加冰再摇 12 秒。", "Add ice and shake again for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("柠檬皮喷香装饰。", "Express lemon peel over the surface and place as garnish.", "express-peel"),
  ],
  techniques: T("dry-shake", "shake", "double-strain", "express-peel"),
});

newRecipes.push({
  slug: "la-rosa", nameZh: "玫瑰", nameEn: "La Rosa",
  difficulty: 3, glassType: "coupe", iceType: "none",
  descriptionZh: "金酒、Aperol、柠檬、Peychaud's 与蛋清的 PDT 玫瑰酸酒。",
  descriptionEn: "Gin, Aperol, lemon, Peychaud's and egg white — PDT's rose-pink sour.",
  storyNoteZh: "2010 年代纽约 PDT 调酒师 Jim Meehan 创作的金酒+Aperol+Peychaud's 粉红酸酒。",
  storyNoteEn: "Created in the 2010s by Jim Meehan at PDT NYC, the Aperol-Peychaud's rose-pink gin sour.",
  balanceTags: ["sour", "bitter", "floral", "modern"],
  ingredients: [
    I("gin", "45ml", true), I("aperol", "22.5ml", true), I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("peychauds", "3 dashes", true), I("simple-syrup", "7.5ml", false), I("egg-white", "1 piece", false, false, "可选", "optional"),
    I("lemon-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加金酒、Aperol、柠檬汁、Peychaud's 与单糖浆（可选加蛋清）。", "Add gin, Aperol, lemon juice, Peychaud's and simple syrup (and egg white if using) to a shaker.", "dry-shake"),
    S("不加冰干摇 15 秒。", "Dry-shake without ice for 15 seconds.", "dry-shake", "15s"),
    S("加冰再摇 12 秒。", "Add ice and shake again for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("柠檬皮喷香装饰。", "Express lemon peel over the surface and place as garnish.", "express-peel"),
  ],
  techniques: T("dry-shake", "shake", "double-strain", "express-peel"),
});

newRecipes.push({
  slug: "fair-and-square", nameZh: "规规矩矩", nameEn: "Fair and Square",
  difficulty: 3, glassType: "coupe", iceType: "none",
  descriptionZh: "波本、樱桃利口酒、柠檬与蛋清的 Death & Co 樱桃波本酸酒。",
  descriptionEn: "Bourbon, cherry Heering, lemon and egg white — Death & Co's cherry-bourbon sour.",
  storyNoteZh: "2012 年纽约 Death & Co 调酒书收录的波本+樱桃酸酒。",
  storyNoteEn: "A 2012 Death & Co NYC bourbon-cherry sour from their cocktail book.",
  balanceTags: ["sour", "fruity", "rich", "modern"],
  ingredients: [
    I("bourbon", "60ml", true), I("cherry-heering", "15ml", true),
    I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "7.5ml", false), I("egg-white", "1 piece", false, false, "可选", "optional"),
    I("amarena-cherry", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加波本、樱桃利口酒、柠檬汁与单糖浆（可选加蛋清）。", "Add bourbon, cherry Heering, lemon juice and simple syrup (and egg white if using) to a shaker.", "dry-shake"),
    S("不加冰干摇 15 秒。", "Dry-shake without ice for 15 seconds.", "dry-shake", "15s"),
    S("加冰再摇 12 秒。", "Add ice and shake again for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("阿玛雷纳樱桃装饰。", "Garnish with an Amarena cherry.", null),
  ],
  techniques: T("dry-shake", "shake", "double-strain"),
});

newRecipes.push({
  slug: "peninsula", nameZh: "半岛", nameEn: "Peninsula",
  difficulty: 2, glassType: "coupe", iceType: "none",
  descriptionZh: "黑麦、Cynar、柠檬与橙皮苦精的 Death & Co 苦味黑麦酸酒。",
  descriptionEn: "Rye, Cynar, lemon and orange bitters — Death & Co's bitter-rye sour.",
  storyNoteZh: "2008 年纽约 Death & Co 调酒书收录的黑麦+洋蓟苦酒酸酒。",
  storyNoteEn: "A 2008 Death & Co NYC rye-and-Cynar sour from their cocktail book.",
  balanceTags: ["sour", "bitter", "modern"],
  ingredients: [
    I("rye", "60ml", true), I("cynar", "15ml", true), I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "7.5ml", false), I("orange-bitters", "2 dashes", true),
    I("orange-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加黑麦、Cynar、柠檬汁、单糖浆与橙皮苦精。", "Add rye, Cynar, lemon juice, simple syrup and orange bitters to a shaker.", "shake"),
    S("加冰摇和 12 秒。", "Fill with ice and shake for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("橙皮喷香装饰。", "Express orange peel over the surface and place as garnish.", "express-peel"),
  ],
  techniques: T("shake", "double-strain", "express-peel"),
});

newRecipes.push({
  slug: "five-spice", nameZh: "五香", nameEn: "Five Spice",
  difficulty: 3, glassType: "coupe", iceType: "none",
  descriptionZh: "波本、多香果利口酒、柠檬、单糖浆与蛋清的 Death & Co 香料酸酒。",
  descriptionEn: "Bourbon, allspice dram, lemon, simple and egg white — Death & Co's spice sour.",
  storyNoteZh: "2009 年纽约 Death & Co 调酒书收录的波本+多香果利口酒香料酸酒。",
  storyNoteEn: "A 2009 Death & Co NYC bourbon-allspice-dram spice sour from their cocktail book.",
  balanceTags: ["sour", "spice", "rich", "modern"],
  ingredients: [
    I("bourbon", "60ml", true), I("allspice-drambuie", "7.5ml", true),
    I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "7.5ml", false), I("egg-white", "1 piece", false, false, "可选", "optional"),
    I("peychauds", "1 dash", false, false, "顶部装饰", "top dash"),
    I("nutmeg", "1 pinch", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加波本、多香果利口酒、柠檬汁与单糖浆（可选加蛋清）。", "Add bourbon, allspice dram, lemon juice and simple syrup (and egg white if using) to a shaker.", "dry-shake"),
    S("不加冰干摇 15 秒。", "Dry-shake without ice for 15 seconds.", "dry-shake", "15s"),
    S("加冰再摇 12 秒。", "Add ice and shake again for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("顶部滴 1 dash Peychaud's，磨少许肉豆蔻装饰。", "Top with 1 dash of Peychaud's and grate nutmeg.", null),
  ],
  techniques: T("dry-shake", "shake", "double-strain"),
});

newRecipes.push({
  slug: "surrender", nameZh: "投降", nameEn: "Surrender",
  difficulty: 3, glassType: "coupe", iceType: "none",
  descriptionZh: "波本、樱桃利口酒、柠檬、Peychaud's 与蛋清的 Death & Co 樱桃酸酒。",
  descriptionEn: "Bourbon, cherry Heering, lemon, Peychaud's and egg white — Death & Co's cherry sour.",
  storyNoteZh: "2008 年纽约 Death & Co 调酒书收录的波本+樱桃+Peychaud's 酸酒。",
  storyNoteEn: "A 2008 Death & Co NYC bourbon-cherry-Peychaud's sour from their cocktail book.",
  balanceTags: ["sour", "fruity", "rich", "modern"],
  ingredients: [
    I("bourbon", "60ml", true), I("cherry-heering", "15ml", true),
    I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "7.5ml", false), I("egg-white", "1 piece", false, false, "可选", "optional"),
    I("peychauds", "2 dashes", true),
    I("amarena-cherry", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加波本、樱桃利口酒、柠檬汁、单糖浆与 Peychaud's（可选加蛋清）。", "Add bourbon, cherry Heering, lemon juice, simple syrup and Peychaud's (and egg white if using) to a shaker.", "dry-shake"),
    S("不加冰干摇 15 秒。", "Dry-shake without ice for 15 seconds.", "dry-shake", "15s"),
    S("加冰再摇 12 秒。", "Add ice and shake again for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("阿玛雷纳樱桃装饰。", "Garnish with an Amarena cherry.", null),
  ],
  techniques: T("dry-shake", "shake", "double-strain"),
});

newRecipes.push({
  slug: "ready-fire-aim", nameZh: "准备开火瞄准", nameEn: "Ready Fire Aim",
  difficulty: 2, glassType: "coupe", iceType: "none",
  descriptionZh: "黑麦、甜味美思、Cynar、苦艾与橙皮苦精的 Death & Co 草本搅拌酒。",
  descriptionEn: "Rye, sweet vermouth, Cynar, absinthe and orange bitters — Death & Co's herbal stirred drink.",
  storyNoteZh: "2008 年纽约 Death & Co 调酒书收录的黑麦+洋蓟苦酒+苦艾草本搅拌酒。",
  storyNoteEn: "A 2008 Death & Co NYC rye-Cynar-absinthe herbal stirred drink from their cocktail book.",
  balanceTags: ["spirit-forward", "herbal", "modern"],
  ingredients: [
    I("rye", "45ml", true), I("sweet-vermouth", "30ml", true), I("cynar", "15ml", true),
    I("absinthe", "1 tsp", true, false, "约 5ml", "~5ml"),
    I("orange-bitters", "2 dashes", true),
    I("orange-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("将黑麦、甜味美思、Cynar、苦艾与橙皮苦精加入预冷搅拌杯。", "Add rye, sweet vermouth, Cynar, absinthe and orange bitters to a chilled mixing glass.", "stir"),
    S("加冰搅和 30 秒。", "Add ice and stir for 30 seconds.", "stir", "30s"),
    S("滤入预冷马天尼杯。", "Strain into a chilled coupe.", "stir"),
    S("橙皮喷香装饰。", "Express orange peel over the surface and place as garnish.", "express-peel"),
  ],
  techniques: T("stir", "express-peel"),
});

console.log(`After modern: ${newRecipes.length} recipes defined`);

module.exports = { newRecipes };
