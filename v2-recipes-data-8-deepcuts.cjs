// v2-recipes-data-8-deepcuts.cjs — Classic variants & "deep cuts" (10)
const { I, S, T } = require("./v2-recipes-data.cjs");

const newRecipes = [];

// ════════════════════════════════════════════════════════════════════════════
// 8. CLASSIC VARIANTS & "DEEP CUTS" (10)
// ════════════════════════════════════════════════════════════════════════════

newRecipes.push({
  slug: "bronx-cocktail", nameZh: "布朗克斯", nameEn: "Bronx Cocktail",
  difficulty: 3, glassType: "coupe", iceType: "none",
  descriptionZh: "金酒、干味美思、甜味美思与橙汁的 1900 年代纽约经典。",
  descriptionEn: "Gin, dry vermouth, sweet vermouth and orange juice — the 1900s NYC classic.",
  storyNoteZh: "20 世纪初纽约 Waldorf-Astoria 起源的「完美的马天尼」变体，名字取自布朗克斯区。",
  storyNoteEn: "A 1900s New York Waldorf-Astoria classic named after the Bronx borough, once called the 'perfect martini'.",
  balanceTags: ["spirit-forward", "fruity", "elegant", "classic"],
  ingredients: [
    I("gin", "30ml", true), I("dry-vermouth", "15ml", true), I("sweet-vermouth", "15ml", true),
    I("orange-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("orange-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加金酒、干味美思、甜味美思与橙汁。", "Add gin, dry vermouth, sweet vermouth and orange juice to a shaker.", "shake"),
    S("加冰摇和 12 秒。", "Fill with ice and shake for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("橙皮喷香装饰。", "Express orange peel over the surface and place as garnish.", "express-peel"),
  ],
  techniques: T("shake", "double-strain", "express-peel"),
});

newRecipes.push({
  slug: "holland-house-cocktail", nameZh: "荷兰屋", nameEn: "Holland House Cocktail",
  difficulty: 3, glassType: "coupe", iceType: "none",
  descriptionZh: "金酒、柠檬、马拉斯奇诺与橙皮苦精的 1880 年代伦敦经典。",
  descriptionEn: "Gin, lemon, maraschino and orange bitters — the 1880s London classic.",
  storyNoteZh: "1880 年代纽约 Holland House Hotel 起源的鸡尾酒，1882 年 Harry Johnson 调酒书收录。",
  storyNoteEn: "Created in the 1880s at New York's Holland House Hotel and recorded in Harry Johnson's 1882 bartending manual.",
  balanceTags: ["sour", "classic"],
  ingredients: [
    I("gin", "45ml", true), I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("maraschino", "15ml", true), I("orange-bitters", "2 dashes", true),
    I("simple-syrup", "7.5ml", false), I("lemon-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加金酒、柠檬汁、马拉斯奇诺、单糖浆与橙皮苦精。", "Add gin, lemon juice, maraschino, simple syrup and orange bitters to a shaker.", "shake"),
    S("加冰摇和 12 秒。", "Fill with ice and shake for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("柠檬皮喷香装饰。", "Express lemon peel over the surface and place as garnish.", "express-peel"),
  ],
  techniques: T("shake", "double-strain", "express-peel"),
});

newRecipes.push({
  slug: "widow-kiss", nameZh: "寡妇之吻", nameEn: "Widow's Kiss",
  difficulty: 3, glassType: "coupe", iceType: "none",
  descriptionZh: "苹果白兰地、黄查特绿与本笃利口酒的三重草药鸡尾酒。",
  descriptionEn: "Apple brandy, yellow Chartreuse and Bénédictine — the herbalist's pre-Prohibition classic.",
  storyNoteZh: "1895 年纽约 W.F.淘气调酒师 George J. Kappeler 创作的寡妇诱惑鸡尾酒。",
  storyNoteEn: "Created in 1895 by George J. Kappeler at NYC's Holland House, a high-octane herbal concoction.",
  balanceTags: ["sour", "herbal", "spirit-forward", "classic"],
  ingredients: [
    I("calvados", "60ml", true), I("yellow-chartreuse", "22.5ml", true), I("benedictine", "22.5ml", true),
    I("angostura", "2 dashes", true), I("mint-sprig", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("将卡尔瓦多斯、黄查特绿、本笃利口酒与安格斯特拉加入预冷搅拌杯。", "Add Calvados, yellow Chartreuse, Bénédictine and Angostura to a chilled mixing glass.", "stir"),
    S("加冰搅和 30 秒。", "Add ice and stir for 30 seconds.", "stir", "30s"),
    S("滤入预冷马天尼杯。", "Strain into a chilled coupe.", "stir"),
    S("薄荷枝装饰。", "Garnish with a mint sprig.", null),
  ],
  techniques: T("stir"),
});

newRecipes.push({
  slug: "monkey-gland", nameZh: "猴腺", nameEn: "Monkey Gland",
  difficulty: 3, glassType: "coupe", iceType: "none",
  descriptionZh: "金酒、苦艾、石榴糖浆与橙汁的 1920 年代巴黎荷尔蒙疗法鸡尾酒。",
  descriptionEn: "Gin, absinthe, grenadine and orange juice — the 1920s Paris hormone-therapy cocktail.",
  storyNoteZh: "1920 年代巴黎 Harry's New York Bar 调酒师 Harry MacElhone 创作的鸡尾酒，名字源于当时的「猴腺移植回春疗法」。",
  storyNoteEn: "Created in the 1920s by Harry MacElhone at Harry's New York Bar in Paris; the name references the dubious monkey-gland rejuvenation therapy of the era.",
  balanceTags: ["sour", "anise", "fruity", "classic"],
  ingredients: [
    I("gin", "45ml", true), I("absinthe", "1 tsp", true, false, "约 5ml", "~5ml"),
    I("grenadine", "15ml", true), I("orange-juice", "45ml", true, false, "现榨", "freshly squeezed"),
    I("orange-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加金酒、苦艾、石榴糖浆与橙汁。", "Add gin, absinthe, grenadine and orange juice to a shaker.", "shake"),
    S("加冰摇和 12 秒。", "Fill with ice and shake for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("橙皮喷香装饰。", "Express orange peel over the surface and place as garnish.", "express-peel"),
  ],
  techniques: T("shake", "double-strain", "express-peel"),
});

newRecipes.push({
  slug: "champs-elysees", nameZh: "香榭丽舍", nameEn: "Champs-Élysées",
  difficulty: 3, glassType: "coupe", iceType: "none",
  descriptionZh: "干邑、黄查特绿、柠檬与苦精的 1930 年代巴黎酸酒。",
  descriptionEn: "Cognac, yellow Chartreuse, lemon and bitters — the 1930s Paris sour.",
  storyNoteZh: "1930 年 Harry Craddock《Savoy Cocktail Book》收录的巴黎香榭丽舍大道命名酸酒。",
  storyNoteEn: "A Paris-named sour recorded in Harry Craddock's 1930 Savoy Cocktail Book.",
  balanceTags: ["sour", "herbal", "elegant", "classic"],
  ingredients: [
    I("cognac", "30ml", true), I("yellow-chartreuse", "15ml", true),
    I("lemon-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "7.5ml", false), I("angostura", "2 dashes", true),
    I("lemon-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加干邑、黄查特绿、柠檬汁、单糖浆与安格斯特拉。", "Add cognac, yellow Chartreuse, lemon juice, simple syrup and Angostura to a shaker.", "shake"),
    S("加冰摇和 12 秒。", "Fill with ice and shake for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("柠檬皮喷香装饰。", "Express lemon peel over the surface and place as garnish.", "express-peel"),
  ],
  techniques: T("shake", "double-strain", "express-peel"),
});

newRecipes.push({
  slug: "brandy-alexander", nameZh: "白兰地亚历山大", nameEn: "Brandy Alexander",
  difficulty: 2, glassType: "coupe", iceType: "none",
  descriptionZh: "白兰地、白可可与奶油的可可奶昔型饭后甜酒。",
  descriptionEn: "Brandy, white crème de cacao and cream — the cocoa milkshake dessert cocktail.",
  storyNoteZh: "1920 年代纽约起源的白兰地版 Alexander，原本用杜松子酒，1922 年改用白兰地后流行。",
  storyNoteEn: "A 1920s New York brandy version of the gin Alexander, popularised in 1922 with the brandy base.",
  balanceTags: ["creamy", "chocolate", "dessert", "classic"],
  ingredients: [
    I("cognac", "30ml", true), I("creme-de-cacao", "30ml", true, false, "白色", "white"),
    I("heavy-cream", "30ml", true), I("nutmeg", "1 pinch", false, false, "顶部装饰", "top grate"),
  ],
  steps: [
    S("摇酒壶加白兰地、白可可与奶油。", "Add cognac, white crème de cacao and cream to a shaker.", "shake"),
    S("加冰摇和 12 秒。", "Fill with ice and shake for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("顶部磨少许肉豆蔻装饰。", "Grate a pinch of nutmeg over the top.", null),
  ],
  techniques: T("shake", "double-strain"),
});

newRecipes.push({
  slug: "grasshopper", nameZh: "蚱蜢", nameEn: "Grasshopper",
  difficulty: 2, glassType: "coupe", iceType: "none",
  descriptionZh: "白薄荷利口酒、白可可与奶油的薄荷奶昔型甜酒。",
  descriptionEn: "White crème de menthe, white crème de cacao and cream — the mint-milkshake dessert sipper.",
  storyNoteZh: "1918 年新奥尔良 Tujague's 调酒师 Philip Guichet 创作的薄荷奶昔型饭后甜酒。",
  storyNoteEn: "Created in 1918 by Philip Guichet at Tujague's in New Orleans; a popular post-dinner sweet sip.",
  balanceTags: ["creamy", "mint", "dessert", "classic"],
  ingredients: [
    I("creme-de-menthe-white", "30ml", true), I("creme-de-cacao", "30ml", true, false, "白色", "white"),
    I("heavy-cream", "30ml", true), I("mint-sprig", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加白薄荷、白可可与奶油。", "Add white crème de menthe, white crème de cacao and cream to a shaker.", "shake"),
    S("加冰摇和 12 秒。", "Fill with ice and shake for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("薄荷枝装饰。", "Garnish with a mint sprig.", null),
  ],
  techniques: T("shake", "double-strain"),
});

newRecipes.push({
  slug: "pink-lady", nameZh: "粉红女士", nameEn: "Pink Lady",
  difficulty: 3, glassType: "coupe", iceType: "none",
  descriptionZh: "金酒、石榴糖浆、奶油与蛋清的粉红女士鸡尾酒。",
  descriptionEn: "Gin, grenadine, cream and egg white — the 1930s pink-girls' cocktail.",
  storyNoteZh: "1930 年代流行的粉红女士鸡尾酒，最早版本用苹果白兰地基酒。",
  storyNoteEn: "A 1930s pink-ladies' cocktail; the original used applejack but gin became the standard base.",
  balanceTags: ["sour", "creamy", "fruity", "classic"],
  ingredients: [
    I("gin", "45ml", true), I("grenadine", "15ml", true), I("lemon-juice", "15ml", true, false, "现榨", "freshly squeezed"),
    I("egg-white", "1 piece", true), I("heavy-cream", "15ml", true),
    I("maraschino-cherry", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加金酒、石榴糖浆、柠檬汁、奶油与蛋清。", "Add gin, grenadine, lemon juice, cream and egg white to a shaker.", "dry-shake"),
    S("不加冰干摇 15 秒充分乳化。", "Dry-shake without ice for 15 seconds to emulsify.", "dry-shake", "15s"),
    S("加冰再摇 12 秒。", "Add ice and shake again for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("马拉斯奇诺樱桃装饰。", "Garnish with a maraschino cherry.", null),
  ],
  techniques: T("dry-shake", "shake", "double-strain"),
});

newRecipes.push({
  slug: "alaska", nameZh: "阿拉斯加", nameEn: "Alaska",
  difficulty: 2, glassType: "coupe", iceType: "none",
  descriptionZh: "金酒与黄查特绿的极简 1900 年代草药马天尼变体。",
  descriptionEn: "Gin and yellow Chartreuse — the minimalist 1900s herbal Martini sibling.",
  storyNoteZh: "1900 年代起源的金酒+黄查特绿极简草药鸡尾酒，1930 年《Savoy Cocktail Book》收录。",
  storyNoteEn: "A 1900s gin-and-yellow-Chartreuse minimalist herbal cocktail, recorded in the 1930 Savoy Cocktail Book.",
  balanceTags: ["spirit-forward", "herbal", "elegant", "classic"],
  ingredients: [
    I("gin", "60ml", true), I("yellow-chartreuse", "15ml", true),
    I("orange-bitters", "2 dashes", true), I("lemon-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("将金酒、黄查特绿与橙皮苦精加入预冷搅拌杯。", "Add gin, yellow Chartreuse and orange bitters to a chilled mixing glass.", "stir"),
    S("加冰搅和 30 秒。", "Add ice and stir for 30 seconds.", "stir", "30s"),
    S("滤入预冷马天尼杯。", "Strain into a chilled coupe.", "stir"),
    S("柠檬皮喷香装饰。", "Express lemon peel over the surface and place as garnish.", "express-peel"),
  ],
  techniques: T("stir", "express-peel"),
});

newRecipes.push({
  slug: "japan-cocktail", nameZh: "日本鸡尾酒", nameEn: "Japan Cocktail",
  difficulty: 3, glassType: "coupe", iceType: "none",
  descriptionZh: "干邑、杏仁糖浆与苦精的 1884 年 Harry Johnson 古老配方。",
  descriptionEn: "Cognac, orgeat and bitters — the 1884 Harry Johnson original.",
  storyNoteZh: "1884 年 Harry Johnson《新与改良调酒师手册》收录的最古老版本之一，名字取自日本明治维新时期的「东方主义」。",
  storyNoteEn: "Recorded in Harry Johnson's 1884 New and Improved Bartender's Manual, one of the earliest printed cocktail recipes; the name references 1880s Japonisme.",
  balanceTags: ["sour", "spirit-forward", "almond", "classic"],
  ingredients: [
    I("cognac", "60ml", true), I("orgeat", "15ml", true), I("angostura", "2 dashes", true),
    I("lemon-juice", "15ml", true, false, "现榨（19 世纪版本）", "freshly squeezed (19th-c. version)"),
    I("lemon-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加干邑、杏仁糖浆、柠檬汁与安格斯特拉。", "Add cognac, orgeat, lemon juice and Angostura to a shaker.", "shake"),
    S("加冰摇和 12 秒。", "Fill with ice and shake for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("柠檬皮喷香装饰。", "Express lemon peel over the surface and place as garnish.", "express-peel"),
  ],
  techniques: T("shake", "double-strain", "express-peel"),
});

console.log(`After deep cuts: ${newRecipes.length} recipes defined`);
console.log(`Total: ${newRecipes.length} new recipes`);

module.exports = { newRecipes };
