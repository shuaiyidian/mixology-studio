// v2-recipes-data-2-sours.cjs — Sour family variants (15)
// Exports: { newRecipes: [...], I, S, T }
const { I, S, T } = require("./v2-recipes-data.cjs");

const newRecipes = [];

// ════════════════════════════════════════════════════════════════════════════
// 2. SOUR FAMILY VARIANTS (15)
// ════════════════════════════════════════════════════════════════════════════

newRecipes.push({
  slug: "peach-sour", nameZh: "桃子酸", nameEn: "Peach Sour",
  difficulty: 3, glassType: "coupe", iceType: "none",
  descriptionZh: "波本、桃子果泥与柠檬的 1930 年代果味酸酒。",
  descriptionEn: "Bourbon, peach purée and lemon — the 1930s Southern fruit sour.",
  storyNoteZh: "20 世纪初美国南方流行的波本+桃子酸酒，1930 年代被多本调酒书收录。",
  storyNoteEn: "A bourbon-peach sour popular in 1930s American bars and recorded in several vintage cocktail manuals.",
  balanceTags: ["sour", "fruity", "balanced", "classic-variant"],
  ingredients: [
    I("bourbon", "60ml", true), I("peach-puree", "30ml", true), I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "7.5ml", false), I("egg-white", "1 piece", false, false, "可选", "optional"),
    I("mint-sprig", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加波本、桃子果泥、柠檬汁与单糖浆（可选加蛋清）。", "Add bourbon, peach purée, lemon juice and simple syrup (and egg white if using) to a shaker.", "dry-shake"),
    S("不加冰干摇 15 秒充分乳化。", "Dry-shake without ice for 15 seconds to emulsify.", "dry-shake", "15s"),
    S("加冰再摇 12 秒。", "Add ice and shake again for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("桃片装饰。", "Garnish with a peach slice.", null),
  ],
  techniques: T("dry-shake", "shake", "double-strain"),
});

newRecipes.push({
  slug: "apricot-sour", nameZh: "杏子酸", nameEn: "Apricot Sour",
  difficulty: 3, glassType: "coupe", iceType: "none",
  descriptionZh: "金酒、杏子白兰地与柠檬的果味酸酒，Angel Face 的酸酒版本。",
  descriptionEn: "Gin, apricot brandy and lemon — the Angel Face sour sibling.",
  storyNoteZh: "1930 年 Harry Craddock《Savoy Cocktail Book》收录的果味酸酒变体。",
  storyNoteEn: "A fruit-sour variant recorded in Harry Craddock's 1930 Savoy Cocktail Book.",
  balanceTags: ["sour", "fruity", "balanced", "classic"],
  ingredients: [
    I("gin", "45ml", true), I("apricot-brandy", "22.5ml", true), I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "7.5ml", false), I("lemon-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加金酒、杏子白兰地、柠檬汁与单糖浆。", "Add gin, apricot brandy, lemon juice and simple syrup to a shaker.", "shake"),
    S("加冰摇和 12 秒。", "Fill with ice and shake for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("柠檬皮喷香装饰。", "Express lemon peel over the surface and place as garnish.", "express-peel"),
  ],
  techniques: T("shake", "double-strain", "express-peel"),
});

newRecipes.push({
  slug: "blackberry-sour", nameZh: "黑莓酸", nameEn: "Blackberry Sour",
  difficulty: 3, glassType: "coupe", iceType: "none",
  descriptionZh: "金酒、黑莓利口酒与柠檬的深紫红色酸酒。",
  descriptionEn: "Gin, crème de mûre and lemon — a deep-purple berry sour.",
  storyNoteZh: "2010 年代 craft 酒吧流行的 Bramble 类黑莓酸酒变体。",
  storyNoteEn: "A 2010s craft-bar Bramble-style blackberry sour variant.",
  balanceTags: ["sour", "berry", "fruity", "classic-variant"],
  ingredients: [
    I("gin", "45ml", true), I("creme-de-mure", "22.5ml", true), I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "7.5ml", false), I("lemon-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加金酒、黑莓利口酒、柠檬汁与单糖浆。", "Add gin, crème de mûre, lemon juice and simple syrup to a shaker.", "shake"),
    S("加冰摇和 12 秒。", "Fill with ice and shake for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("柠檬皮喷香装饰。", "Express lemon peel over the surface and place as garnish.", "express-peel"),
  ],
  techniques: T("shake", "double-strain"),
});

newRecipes.push({
  slug: "cherry-sour", nameZh: "樱桃酸", nameEn: "Cherry Sour",
  difficulty: 3, glassType: "coupe", iceType: "none",
  descriptionZh: "黑麦、樱桃利口酒与柠檬的深色酸酒。",
  descriptionEn: "Rye, cherry liqueur and lemon — a deep-red rye sour.",
  storyNoteZh: "2010 年代 craft 酒吧流行的樱桃酸酒变体，可追溯到 19 世纪黑麦酸酒。",
  storyNoteEn: "A 2010s craft-bar revival of a 19th-century rye sour with cherry liqueur.",
  balanceTags: ["sour", "fruity", "rich", "classic-variant"],
  ingredients: [
    I("rye", "45ml", true), I("cherry-heering", "22.5ml", true), I("cherry-syrup", "7.5ml", true),
    I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("amarena-cherry", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加黑麦、樱桃利口酒、樱桃糖浆与柠檬汁。", "Add rye, cherry Heering, cherry syrup and lemon juice to a shaker.", "shake"),
    S("加冰摇和 12 秒。", "Fill with ice and shake for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("阿玛雷纳樱桃装饰。", "Garnish with an Amarena cherry.", null),
  ],
  techniques: T("shake", "double-strain"),
});

newRecipes.push({
  slug: "elderflower-sour", nameZh: "接骨木花酸", nameEn: "Elderflower Sour",
  difficulty: 3, glassType: "coupe", iceType: "none",
  descriptionZh: "金酒、St-Germain 接骨木花与柠檬的轻盈花香酸酒。",
  descriptionEn: "Gin, St-Germain elderflower liqueur and lemon — a floral spring sour.",
  storyNoteZh: "2007 年 St-Germain 上市后风靡 craft 酒吧的花香酸酒变体。",
  storyNoteEn: "A floral sour that surged in 2007+ craft bars after St-Germain's launch.",
  balanceTags: ["sour", "floral", "elegant", "modern"],
  ingredients: [
    I("gin", "45ml", true), I("st-germain", "22.5ml", true), I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "7.5ml", false), I("egg-white", "1 piece", false, false, "可选", "optional"),
    I("lemon-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加金酒、St-Germain、柠檬汁与单糖浆（可选加蛋清）。", "Add gin, St-Germain, lemon juice and simple syrup (and egg white if using) to a shaker.", "dry-shake"),
    S("不加冰干摇 15 秒。", "Dry-shake without ice for 15 seconds.", "dry-shake", "15s"),
    S("加冰再摇 12 秒。", "Add ice and shake again for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("柠檬皮喷香装饰。", "Express lemon peel over the surface and place as garnish.", "express-peel"),
  ],
  techniques: T("dry-shake", "shake", "double-strain", "express-peel"),
});

newRecipes.push({
  slug: "pomegranate-sour", nameZh: "石榴酸", nameEn: "Pomegranate Sour",
  difficulty: 3, glassType: "coupe", iceType: "none",
  descriptionZh: "金酒、石榴汁与柠檬的红宝石色酸酒。",
  descriptionEn: "Gin, pomegranate juice and lemon — a ruby-red winter sour.",
  storyNoteZh: "2010 年代 craft 酒吧冬季流行的石榴酸酒变体。",
  storyNoteEn: "A 2010s craft-bar winter pomegranate sour.",
  balanceTags: ["sour", "fruity", "tart", "modern"],
  ingredients: [
    I("gin", "45ml", true), I("pomegranate-juice", "30ml", true, false, "现榨", "freshly squeezed"),
    I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("grenadine-pomegranate", "7.5ml", true, false, "增加甜度与红色", "for sweetness and red"),
    I("lime-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加金酒、石榴汁、柠檬汁与石榴糖浆。", "Add gin, pomegranate juice, lemon juice and pomegranate grenadine to a shaker.", "shake"),
    S("加冰摇和 12 秒。", "Fill with ice and shake for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("顶部撒一勺石榴籽装饰。", "Top with a teaspoon of pomegranate seeds.", null),
  ],
  techniques: T("shake", "double-strain"),
});

newRecipes.push({
  slug: "pineapple-sour", nameZh: "菠萝酸", nameEn: "Pineapple Sour",
  difficulty: 3, glassType: "coupe", iceType: "none",
  descriptionZh: "白朗姆、菠萝汁与柠檬的热带酸酒。",
  descriptionEn: "White rum, pineapple juice and lemon — a tropical tiki-edge sour.",
  storyNoteZh: "1930 年代夏威夷与加勒比海地区流行的热带酸酒变体。",
  storyNoteEn: "A 1930s tropical sour from Hawaiian and Caribbean cocktail programs.",
  balanceTags: ["sour", "tropical", "fruity", "classic"],
  ingredients: [
    I("white-rum", "45ml", true), I("pineapple-juice", "45ml", true, false, "现榨", "freshly squeezed"),
    I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "7.5ml", false), I("mint-sprig", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加白朗姆、菠萝汁、柠檬汁与单糖浆。", "Add white rum, pineapple juice, lemon juice and simple syrup to a shaker.", "shake"),
    S("加冰摇和 12 秒。", "Fill with ice and shake for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("菠萝片装饰。", "Garnish with a pineapple slice.", null),
  ],
  techniques: T("shake", "double-strain"),
});

newRecipes.push({
  slug: "mezcal-sour", nameZh: "梅斯卡尔酸", nameEn: "Mezcal Sour",
  difficulty: 3, glassType: "coupe", iceType: "none",
  descriptionZh: "梅斯卡尔、柠檬与龙舌兰糖浆的烟熏酸酒。",
  descriptionEn: "Mezcal, lemon and agave — the smoky Mexican sour.",
  storyNoteZh: "2010 年代墨西哥与纽约 craft 酒吧流行的梅斯卡尔酸酒变体。",
  storyNoteEn: "A 2010s Mexican and New York craft-bar mezcal sour variant.",
  balanceTags: ["sour", "smoky", "agave", "modern"],
  ingredients: [
    I("mezcal", "45ml", true), I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("agave-syrup", "15ml", true), I("egg-white", "1 piece", false, false, "可选", "optional"),
    I("angostura", "2 dashes", false, false, "顶部装饰", "top dash"),
  ],
  steps: [
    S("摇酒壶加梅斯卡尔、柠檬汁、龙舌兰糖浆（可选加蛋清）。", "Add mezcal, lemon juice, agave syrup (and egg white if using) to a shaker.", "dry-shake"),
    S("不加冰干摇 15 秒。", "Dry-shake without ice for 15 seconds.", "dry-shake", "15s"),
    S("加冰再摇 12 秒。", "Add ice and shake again for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("顶部滴 2 dashes 安格斯特拉装饰。", "Top with 2 dashes of Angostura.", null),
  ],
  techniques: T("dry-shake", "shake", "double-strain"),
});

newRecipes.push({
  slug: "demerara-sour", nameZh: "德麦拉拉酸", nameEn: "Demerara Sour",
  difficulty: 3, glassType: "coupe", iceType: "none",
  descriptionZh: "陈年牙买加朗姆、德麦拉拉糖浆与柠檬的浓郁酸酒。",
  descriptionEn: "Aged Jamaican rum, demerara syrup and lemon — a deep-cane tiki sour.",
  storyNoteZh: "2010 年代 craft 酒吧使用德麦拉拉糖浆的牙买加酸酒变体。",
  storyNoteEn: "A 2010s craft-bar aged-Jamaican sour using demerara syrup for deeper cane notes.",
  balanceTags: ["sour", "rich", "tiki-edge", "modern"],
  ingredients: [
    I("aged-rum", "60ml", true), I("demerara-syrup", "15ml", true), I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("egg-white", "1 piece", false, false, "可选", "optional"),
    I("angostura", "2 dashes", false, false, "顶部装饰", "top dash"),
  ],
  steps: [
    S("摇酒壶加陈年朗姆、德麦拉拉糖浆、柠檬汁（可选加蛋清）。", "Add aged rum, demerara syrup, lemon juice (and egg white if using) to a shaker.", "dry-shake"),
    S("不加冰干摇 15 秒。", "Dry-shake without ice for 15 seconds.", "dry-shake", "15s"),
    S("加冰再摇 12 秒。", "Add ice and shake again for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("顶部滴 2 dashes 安格斯特拉。", "Top with 2 dashes of Angostura.", null),
  ],
  techniques: T("dry-shake", "shake", "double-strain"),
});

newRecipes.push({
  slug: "calvados-sour", nameZh: "卡尔瓦多斯酸", nameEn: "Calvados Sour",
  difficulty: 3, glassType: "coupe", iceType: "none",
  descriptionZh: "诺曼底苹果白兰地、柠檬与单糖浆的法式酸酒。",
  descriptionEn: "Normandy apple brandy, lemon and simple — the French apple sour.",
  storyNoteZh: "1930 年 Harry Craddock《Savoy Cocktail Book》收录的法式苹果酸酒。",
  storyNoteEn: "The French apple sour recorded in Harry Craddock's 1930 Savoy Cocktail Book.",
  balanceTags: ["sour", "fruity", "elegant", "classic"],
  ingredients: [
    I("calvados", "60ml", true), I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "15ml", true), I("egg-white", "1 piece", false, false, "可选", "optional"),
    I("lemon-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加卡尔瓦多斯、柠檬汁与单糖浆（可选加蛋清）。", "Add Calvados, lemon juice and simple syrup (and egg white if using) to a shaker.", "dry-shake"),
    S("不加冰干摇 15 秒。", "Dry-shake without ice for 15 seconds.", "dry-shake", "15s"),
    S("加冰再摇 12 秒。", "Add ice and shake again for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("柠檬皮喷香装饰。", "Express lemon peel over the surface and place as garnish.", "express-peel"),
  ],
  techniques: T("dry-shake", "shake", "double-strain", "express-peel"),
});

newRecipes.push({
  slug: "japanese-sour", nameZh: "日本酸", nameEn: "Japanese Sour (Shochu Sour)",
  difficulty: 3, glassType: "coupe", iceType: "none",
  descriptionZh: "日本烧酎、柠檬与单糖浆的轻盈亚洲酸酒。",
  descriptionEn: "Shochu, lemon and simple — a clean Japanese sour.",
  storyNoteZh: "2010 年代东京 craft 酒吧流行的烧酎酸酒变体。",
  storyNoteEn: "A 2010s Tokyo craft-bar shochu sour variant.",
  balanceTags: ["sour", "clean", "asian", "modern"],
  ingredients: [
    I("shochu", "60ml", true), I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "15ml", true), I("egg-white", "1 piece", false, false, "可选", "optional"),
    I("lemon-peel", "1 piece", false, false, "装饰（yuzu peel 替代）", "garnish (sub for yuzu peel)"),
  ],
  steps: [
    S("摇酒壶加烧酎、柠檬汁与单糖浆（可选加蛋清）。", "Add shochu, lemon juice and simple syrup (and egg white if using) to a shaker.", "dry-shake"),
    S("不加冰干摇 15 秒。", "Dry-shake without ice for 15 seconds.", "dry-shake", "15s"),
    S("加冰再摇 12 秒。", "Add ice and shake again for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("柚子皮喷香装饰。", "Express yuzu peel over the surface and place as garnish.", "express-peel"),
  ],
  techniques: T("dry-shake", "shake", "double-strain", "express-peel"),
});

newRecipes.push({
  slug: "trinidad-sour", nameZh: "特立尼达酸", nameEn: "Trinidad Sour",
  difficulty: 3, glassType: "coupe", iceType: "none",
  descriptionZh: "高比例安格斯特拉苦精与杏仁糖浆的另类酸酒，Death & Co 标志。",
  descriptionEn: "High-proof Angostura-led sour — Death & Co's bitter-forward cult classic.",
  storyNoteZh: "2007 年纽约 Death & Co 调酒师 Brian Miller 创作，让安格斯特拉成为主角而非装饰。",
  storyNoteEn: "Created in 2007 by Brian Miller at Death & Co NYC, putting Angostura front and centre.",
  balanceTags: ["sour", "bitter", "rich", "modern"],
  ingredients: [
    I("angostura", "30ml", true, false, "不寻常的高比例", "unusually high proportion"),
    I("orgeat", "22.5ml", true), I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("egg-white", "1 piece", true),
    I("mint-sprig", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加安格斯特拉、杏仁糖浆、柠檬汁与蛋清。", "Add Angostura, orgeat, lemon juice and egg white to a shaker.", "dry-shake"),
    S("不加冰干摇 15 秒充分乳化。", "Dry-shake without ice for 15 seconds to emulsify the egg white.", "dry-shake", "15s"),
    S("加冰再摇 12 秒。", "Add ice and shake again for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("薄荷枝装饰。", "Garnish with a mint sprig.", "express-peel"),
  ],
  techniques: T("dry-shake", "shake", "double-strain", "express-peel"),
});

newRecipes.push({
  slug: "basil-sour", nameZh: "罗勒酸", nameEn: "Basil Sour",
  difficulty: 3, glassType: "rocks", iceType: "cubed",
  descriptionZh: "金酒、新鲜罗勒与柠檬的草本酸酒，Basil Smash 的酸酒变体。",
  descriptionEn: "Gin, fresh basil and lemon — the herbal sour cousin of the Basil Smash.",
  storyNoteZh: "2010 年代 craft 酒吧流行的罗勒酸酒变体，Basil Smash 衍生。",
  storyNoteEn: "A 2010s craft-bar basil sour variant derived from the Basil Smash.",
  balanceTags: ["sour", "herbal", "fresh", "modern"],
  ingredients: [
    I("gin", "45ml", true), I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "15ml", true), I("basil", "6 leaves", true),
    I("mint-sprig", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加金酒、柠檬汁、单糖浆与 6 片罗勒叶。", "Add gin, lemon juice, simple syrup and 6 basil leaves to a shaker.", "muddle"),
    S("用捣棒轻压罗勒叶释放香气。", "Gently muddle the basil leaves to release the oils.", "muddle", "5s"),
    S("加冰摇和 12 秒。", "Fill with ice and shake for 12 seconds.", "shake", "12s"),
    S("双重过滤入装有冰块的 rocks 杯。", "Double-strain into a rocks glass with cubed ice.", "double-strain"),
    S("罗勒枝装饰。", "Garnish with a basil sprig.", null),
  ],
  techniques: T("muddle", "shake", "double-strain"),
});

newRecipes.push({
  slug: "cucumber-sour", nameZh: "黄瓜酸", nameEn: "Cucumber Sour",
  difficulty: 3, glassType: "coupe", iceType: "none",
  descriptionZh: "金酒、黄瓜、St-Germain 与柠檬的清新夏季酸酒。",
  descriptionEn: "Gin, cucumber, St-Germain and lemon — a fresh summer sour.",
  storyNoteZh: "2010 年代 craft 酒吧夏季流行的黄瓜酸酒变体。",
  storyNoteEn: "A 2010s craft-bar summer cucumber sour variant.",
  balanceTags: ["sour", "fresh", "floral", "modern"],
  ingredients: [
    I("gin", "45ml", true), I("cucumber", "3 slices", true), I("st-germain", "15ml", true),
    I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "7.5ml", false), I("mint-sprig", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加金酒、3 片黄瓜、St-Germain、柠檬汁与单糖浆。", "Add gin, 3 cucumber slices, St-Germain, lemon juice and simple syrup to a shaker.", "muddle"),
    S("轻压黄瓜释放汁水。", "Gently muddle the cucumber to release the juice.", "muddle", "5s"),
    S("加冰摇和 12 秒。", "Fill with ice and shake for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("黄瓜片装饰。", "Garnish with a cucumber slice.", null),
  ],
  techniques: T("muddle", "shake", "double-strain"),
});

newRecipes.push({
  slug: "campari-sour", nameZh: "金巴利酸", nameEn: "Campari Sour",
  difficulty: 3, glassType: "coupe", iceType: "none",
  descriptionZh: "Campari、柠檬与单糖浆的意大利苦型酸酒。",
  descriptionEn: "Campari, lemon and simple — Italy's bitter sour.",
  storyNoteZh: "2010 年代 IBA 与意大利调酒界广泛接受的 Campari 酸酒变体。",
  storyNoteEn: "A 2010s IBA-adjacent Campari sour widely accepted in Italian bartending.",
  balanceTags: ["sour", "bitter", "balanced", "modern"],
  ingredients: [
    I("campari", "60ml", true), I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "15ml", true), I("egg-white", "1 piece", false, false, "可选", "optional"),
    I("orange-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加 Campari、柠檬汁与单糖浆（可选加蛋清）。", "Add Campari, lemon juice and simple syrup (and egg white if using) to a shaker.", "dry-shake"),
    S("不加冰干摇 15 秒。", "Dry-shake without ice for 15 seconds.", "dry-shake", "15s"),
    S("加冰再摇 12 秒。", "Add ice and shake again for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("橙皮喷香装饰。", "Express orange peel over the surface and place as garnish.", "express-peel"),
  ],
  techniques: T("dry-shake", "shake", "double-strain", "express-peel"),
});

console.log(`After sours: ${newRecipes.length} recipes defined`);

module.exports = { newRecipes };
