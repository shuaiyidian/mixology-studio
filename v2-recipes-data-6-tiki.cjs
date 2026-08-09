// v2-recipes-data-6-tiki.cjs — Tiki & showpiece (10)
const { I, S, T } = require("./v2-recipes-data.cjs");

const newRecipes = [];

// ════════════════════════════════════════════════════════════════════════════
// 6. TIKI & SHOWPIECE (10)
// ════════════════════════════════════════════════════════════════════════════

newRecipes.push({
  slug: "aku-aku", nameZh: "阿库阿库", nameEn: "Aku Aku",
  difficulty: 4, glassType: "tiki", iceType: "crushed",
  descriptionZh: "白朗姆、青柠、杏仁糖浆、法勒浓与多香果的 Don the Beachcomber 经典。",
  descriptionEn: "White rum, lime, orgeat, falernum and allspice dram — Don the Beachcomber's tiki classic.",
  storyNoteZh: "20 世纪 30 年代 Donn Beach（Don the Beachcomber）好莱坞餐厅的招牌 tiki 鸡尾酒。",
  storyNoteEn: "A 1930s Donn Beach (Don the Beachcomber) Hollywood restaurant tiki classic.",
  balanceTags: ["tropical", "spice", "tiki", "classic"],
  ingredients: [
    I("white-rum", "45ml", true), I("lime-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("orgeat", "15ml", true), I("falernum", "15ml", true), I("allspice-drambuie", "1 tsp", true, false, "约 5ml", "~5ml"),
    I("angostura", "1 dash", false), I("mint-sprig", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加白朗姆、青柠汁、杏仁糖浆、法勒浓与多香果利口酒。", "Add white rum, lime juice, orgeat, falernum and allspice dram to a shaker.", "shake"),
    S("加冰摇和 12 秒。", "Fill with ice and shake for 12 seconds.", "shake", "12s"),
    S("双重过滤入装有碎冰的 tiki 杯。", "Double-strain into a tiki mug filled with crushed ice.", "double-strain"),
    S("滴 1 dash 安格斯特拉，薄荷枝装饰。", "Top with 1 dash of Angostura and garnish with a mint sprig.", "express-peel"),
  ],
  techniques: T("shake", "double-strain"),
});

newRecipes.push({
  slug: "mystery-word", nameZh: "神秘词", nameEn: "Mystery Word",
  difficulty: 4, glassType: "tiki", iceType: "crushed",
  descriptionZh: "白朗姆、西柚、法勒浓与多香果的 Don the Beachcomber 香料酸酒。",
  descriptionEn: "White rum, grapefruit, falernum and allspice — Don the Beachcomber's spice sour.",
  storyNoteZh: "20 世纪 30 年代 Donn Beach 创作的神秘名字 tiki 鸡尾酒。",
  storyNoteEn: "A 1930s Donn Beach tiki classic whose secret recipe name adds to the mystique.",
  balanceTags: ["tropical", "spice", "tiki", "classic"],
  ingredients: [
    I("white-rum", "45ml", true), I("grapefruit-juice", "30ml", true, false, "现榨", "freshly squeezed"),
    I("lime-juice", "15ml", true, false, "现榨", "freshly squeezed"),
    I("falernum", "15ml", true), I("allspice-drambuie", "1 tsp", true, false, "约 5ml", "~5ml"),
    I("cinnamon-syrup", "7.5ml", true, false, "Donn's Mix 元素", "Donn's Mix element"),
    I("angostura", "1 dash", false), I("mint-sprig", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加白朗姆、西柚汁、青柠汁、法勒浓、多香果与肉桂糖浆。", "Add white rum, grapefruit juice, lime juice, falernum, allspice dram and cinnamon syrup to a shaker.", "shake"),
    S("加冰摇和 12 秒。", "Fill with ice and shake for 12 seconds.", "shake", "12s"),
    S("双重过滤入装有碎冰的 tiki 杯。", "Double-strain into a tiki mug filled with crushed ice.", "double-strain"),
    S("滴 1 dash 安格斯特拉，薄荷枝装饰。", "Top with 1 dash of Angostura and garnish with a mint sprig.", "express-peel"),
  ],
  techniques: T("shake", "double-strain"),
});

newRecipes.push({
  slug: "cobras-fang", nameZh: "眼镜蛇牙", nameEn: "Cobra's Fang",
  difficulty: 4, glassType: "tiki", iceType: "crushed",
  descriptionZh: "白朗姆、青柠、法勒浓、苦艾与多香果的 Don the Beachcomber 危险 tiki。",
  descriptionEn: "White rum, lime, falernum, absinthe and allspice — Donn Beach's dangerous tiki sipper.",
  storyNoteZh: "20 世纪 30 年代 Donn Beach 创作的高酒精度 tiki 鸡尾酒，名字暗示其强劲酒力。",
  storyNoteEn: "A 1930s Donn Beach high-ABV tiki whose name warns of its strength.",
  balanceTags: ["tropical", "spice", "anise", "tiki", "classic"],
  ingredients: [
    I("white-rum", "45ml", true), I("aged-rum", "15ml", true), I("lime-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("falernum", "15ml", true), I("orgeat", "7.5ml", true),
    I("allspice-drambuie", "1 tsp", true, false, "约 5ml", "~5ml"),
    I("absinthe", "1 dash", true), I("angostura", "1 dash", false),
    I("mint-sprig", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加白朗姆、陈年朗姆、青柠汁、法勒浓、杏仁糖浆、多香果与苦艾。", "Add white rum, aged rum, lime juice, falernum, orgeat, allspice dram and absinthe to a shaker.", "shake"),
    S("加冰摇和 12 秒。", "Fill with ice and shake for 12 seconds.", "shake", "12s"),
    S("双重过滤入装有碎冰的 tiki 杯。", "Double-strain into a tiki mug filled with crushed ice.", "double-strain"),
    S("滴 1 dash 安格斯特拉，薄荷枝装饰。", "Top with 1 dash of Angostura and garnish with a mint sprig.", "express-peel"),
  ],
  techniques: T("shake", "double-strain"),
});

newRecipes.push({
  slug: "sidewinders-fang", nameZh: "响尾蛇牙", nameEn: "Sidewinder's Fang",
  difficulty: 4, glassType: "tiki", iceType: "crushed",
  descriptionZh: "白朗姆、西柚、青柠、法勒浓、苦艾与多香果的 Don the Beachcomber 蛇系列。",
  descriptionEn: "White rum, grapefruit, lime, falernum, absinthe and allspice — Donn Beach's serpentine tiki.",
  storyNoteZh: "20 世纪 30 年代 Donn Beach 创作的 Cobra's Fang 西柚版本。",
  storyNoteEn: "A 1930s Donn Beach grapefruit variant of the Cobra's Fang.",
  balanceTags: ["tropical", "spice", "anise", "tiki", "classic"],
  ingredients: [
    I("white-rum", "45ml", true), I("aged-rum", "15ml", true),
    I("grapefruit-juice", "30ml", true, false, "现榨", "freshly squeezed"),
    I("lime-juice", "15ml", true, false, "现榨", "freshly squeezed"),
    I("falernum", "15ml", true), I("orgeat", "7.5ml", true),
    I("allspice-drambuie", "1 tsp", true, false, "约 5ml", "~5ml"),
    I("absinthe", "1 dash", true), I("angostura", "1 dash", false),
    I("mint-sprig", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加白朗姆、陈年朗姆、西柚汁、青柠汁、法勒浓、杏仁糖浆、多香果与苦艾。", "Add white rum, aged rum, grapefruit juice, lime juice, falernum, orgeat, allspice dram and absinthe to a shaker.", "shake"),
    S("加冰摇和 12 秒。", "Fill with ice and shake for 12 seconds.", "shake", "12s"),
    S("双重过滤入装有碎冰的 tiki 杯。", "Double-strain into a tiki mug filled with crushed ice.", "double-strain"),
    S("滴 1 dash 安格斯特拉，薄荷枝装饰。", "Top with 1 dash of Angostura and garnish with a mint sprig.", "express-peel"),
  ],
  techniques: T("shake", "double-strain"),
});

newRecipes.push({
  slug: "nui-nui", nameZh: "努伊努伊", nameEn: "Nui Nui",
  difficulty: 3, glassType: "coupe", iceType: "none",
  descriptionZh: "白朗姆、干邑、青柠与苦精的 Don the Beachcomber 经典酸酒。",
  descriptionEn: "White rum, cognac, lime and bitters — Donn Beach's classic sour.",
  storyNoteZh: "20 世纪 30 年代 Donn Beach 创作的朗姆+干邑双基酒酸酒。",
  storyNoteEn: "A 1930s Donn Beach sour combining rum and cognac as a dual base.",
  balanceTags: ["sour", "spirit-forward", "tiki", "classic"],
  ingredients: [
    I("white-rum", "30ml", true), I("cognac", "30ml", true), I("lime-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "7.5ml", false), I("angostura", "2 dashes", true),
    I("lime-peel", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加白朗姆、干邑、青柠汁、单糖浆与安格斯特拉。", "Add white rum, cognac, lime juice, simple syrup and Angostura to a shaker.", "shake"),
    S("加冰摇和 12 秒。", "Fill with ice and shake for 12 seconds.", "shake", "12s"),
    S("双重过滤入预冷马天尼杯。", "Double-strain into a chilled coupe.", "double-strain"),
    S("柠檬皮喷香装饰。", "Express lime peel over the surface and place as garnish.", "express-peel"),
  ],
  techniques: T("shake", "double-strain", "express-peel"),
});

newRecipes.push({
  slug: "missionarys-downfall", nameZh: "传教士之祸", nameEn: "Missionary's Downfall",
  difficulty: 4, glassType: "tiki", iceType: "crushed",
  descriptionZh: "白朗姆、桃子、薄荷、青柠与菠萝的 Don the Beachcomber 水果 tiki。",
  descriptionEn: "White rum, peach, mint, lime and pineapple — Donn Beach's fruit-forward tiki.",
  storyNoteZh: "20 世纪 30 年代 Donn Beach 创作的桃子+薄荷 tiki 鸡尾酒。",
  storyNoteEn: "A 1930s Donn Beach peach-mint tiki cocktail, blended to frozen perfection.",
  balanceTags: ["tropical", "fruity", "tiki", "classic"],
  ingredients: [
    I("white-rum", "45ml", true), I("peach-puree", "45ml", true), I("lime-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("pineapple-juice", "30ml", true, false, "现榨", "freshly squeezed"),
    I("simple-syrup", "15ml", true), I("mint", "6 leaves", true),
    I("mint-sprig", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("搅拌机加白朗姆、桃子果泥、青柠汁、菠萝汁、单糖浆与薄荷叶。", "Add white rum, peach purée, lime juice, pineapple juice, simple syrup and mint to a blender.", "flash-blend"),
    S("加 1 杯碎冰短促搅拌 5-6 秒。", "Add 1 cup of crushed ice and pulse for 5-6 seconds until smooth.", "flash-blend", "6s"),
    S("倒入 tiki 杯，薄荷枝装饰。", "Pour into a tiki mug and garnish with a mint sprig.", null),
  ],
  techniques: T("flash-blend"),
});

newRecipes.push({
  slug: "qb-cooler", nameZh: "QB 冰饮", nameEn: "Q.B. Cooler",
  difficulty: 4, glassType: "tiki", iceType: "crushed",
  descriptionZh: "白朗姆、百香果、青柠与法勒浓的 Don the Beachcomber 热带冰饮。",
  descriptionEn: "White rum, passion fruit, lime and falernum — Donn Beach's tropical cooler.",
  storyNoteZh: "20 世纪 30 年代 Donn Beach 创作的百香果 tiki 鸡尾酒。",
  storyNoteEn: "A 1930s Donn Beach passion-fruit tiki cooler.",
  balanceTags: ["tropical", "fruity", "tiki", "classic"],
  ingredients: [
    I("white-rum", "45ml", true), I("passion-fruit-syrup", "30ml", true),
    I("lime-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("falernum", "15ml", true), I("angostura", "1 dash", false),
    I("mint-sprig", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加白朗姆、百香果糖浆、青柠汁与法勒浓。", "Add white rum, passion fruit syrup, lime juice and falernum to a shaker.", "shake"),
    S("加冰摇和 12 秒。", "Fill with ice and shake for 12 seconds.", "shake", "12s"),
    S("双重过滤入装有碎冰的 tiki 杯。", "Double-strain into a tiki mug filled with crushed ice.", "double-strain"),
    S("滴 1 dash 安格斯特拉，薄荷枝装饰。", "Top with 1 dash of Angostura and garnish with a mint sprig.", "express-peel"),
  ],
  techniques: T("shake", "double-strain"),
});

newRecipes.push({
  slug: "beachcombers-gold", nameZh: "沙滩客的金子", nameEn: "Beachcomber's Gold",
  difficulty: 4, glassType: "tiki", iceType: "crushed",
  descriptionZh: "白朗姆、青柠、马拉斯奇诺与法勒浓的 Don the Beachcomber 黄金 tiki。",
  descriptionEn: "White rum, lime, maraschino and falernum — Donn Beach's golden tiki.",
  storyNoteZh: "20 世纪 30 年代 Donn Beach 创作的金色 tiki 鸡尾酒。",
  storyNoteEn: "A 1930s Donn Beach golden-hued tiki classic.",
  balanceTags: ["tropical", "tiki", "classic"],
  ingredients: [
    I("white-rum", "60ml", true), I("lime-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("falernum", "15ml", true), I("maraschino", "7.5ml", true),
    I("orange-bitters", "2 dashes", true),
    I("maraschino-cherry", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加白朗姆、青柠汁、法勒浓、马拉斯奇诺与橙皮苦精。", "Add white rum, lime juice, falernum, maraschino and orange bitters to a shaker.", "shake"),
    S("加冰摇和 12 秒。", "Fill with ice and shake for 12 seconds.", "shake", "12s"),
    S("双重过滤入装有碎冰的 tiki 杯。", "Double-strain into a tiki mug filled with crushed ice.", "double-strain"),
    S("马拉斯奇诺樱桃装饰。", "Garnish with a maraschino cherry.", null),
  ],
  techniques: T("shake", "double-strain"),
});

newRecipes.push({
  slug: "pearl-diver", nameZh: "采珠人", nameEn: "Pearl Diver",
  difficulty: 4, glassType: "tiki", iceType: "crushed",
  descriptionZh: "陈年牙买加朗姆、青柠、法勒浓、多香果与苦艾的 Don the Beachcomber 经典。",
  descriptionEn: "Aged Jamaican rum, lime, falernum, pimento dram and absinthe — Donn Beach's signature tiki.",
  storyNoteZh: "20 世纪 30 年代 Donn Beach 创作的高酒精度 tiki 鸡尾酒，名字来自采珠人。",
  storyNoteEn: "A 1930s Donn Beach high-ABV tiki, named for the South-Sea pearl divers.",
  balanceTags: ["tropical", "anise", "tiki", "classic"],
  ingredients: [
    I("aged-rum", "60ml", true), I("lime-juice", "22.5ml", true, false, "现榨", "freshly squeezed"),
    I("falernum", "15ml", true), I("allspice-drambuie", "1 tsp", true, false, "约 5ml", "~5ml"),
    I("absinthe", "1 dash", true), I("angostura", "1 dash", false),
    I("mint-sprig", "1 piece", false, false, "装饰", "garnish"),
  ],
  steps: [
    S("摇酒壶加陈年朗姆、青柠汁、法勒浓、多香果与苦艾。", "Add aged rum, lime juice, falernum, allspice dram and absinthe to a shaker.", "shake"),
    S("加冰摇和 12 秒。", "Fill with ice and shake for 12 seconds.", "shake", "12s"),
    S("双重过滤入装有碎冰的 tiki 杯。", "Double-strain into a tiki mug filled with crushed ice.", "double-strain"),
    S("滴 1 dash 安格斯特拉，薄荷枝装饰。", "Top with 1 dash of Angostura and garnish with a mint sprig.", "express-peel"),
  ],
  techniques: T("shake", "double-strain"),
});

newRecipes.push({
  slug: "painkiller", nameZh: "止痛药", nameEn: "Painkiller",
  difficulty: 3, glassType: "tiki", iceType: "crushed",
  descriptionZh: "Pusser's 陈年朗姆、菠萝汁、橙汁、椰子奶油与肉豆蔻的英属维尔京群岛经典。",
  descriptionEn: "Pusser's aged rum, pineapple, orange, coconut cream and nutmeg — the BVI classic.",
  storyNoteZh: "1970 年代英属维尔京群岛 Soggy Dollar Bar 调酒师 Daphne Henderson 为 Pusser's Rum 创作，商标名「Painkiller」。",
  storyNoteEn: "Created in the 1970s at the Soggy Dollar Bar in the BVI by Daphne Henderson for Pusser's Rum; the name is trademarked.",
  balanceTags: ["tropical", "creamy", "tiki", "classic"],
  ingredients: [
    I("aged-rum", "60ml", true, false, "Pusser's 最佳", "Pusser's preferred"),
    I("pineapple-juice", "120ml", true, false, "现榨", "freshly squeezed"),
    I("orange-juice", "30ml", true, false, "现榨", "freshly squeezed"),
    I("coconut-cream", "30ml", true),
    I("nutmeg", "1 pinch", false, false, "顶部装饰", "top grate"),
  ],
  steps: [
    S("摇酒壶加陈年朗姆、菠萝汁、橙汁与椰子奶油。", "Add aged rum, pineapple juice, orange juice and coconut cream to a shaker.", "shake"),
    S("加冰摇和 12 秒充分混合。", "Fill with ice and shake for 12 seconds to fully combine.", "shake", "12s"),
    S("双重过滤入装有碎冰的 tiki 杯。", "Double-strain into a tiki mug filled with crushed ice.", "double-strain"),
    S("顶部磨少许肉豆蔻装饰。", "Grate a pinch of nutmeg over the top.", null),
  ],
  techniques: T("shake", "double-strain"),
});

console.log(`After tiki: ${newRecipes.length} recipes defined`);

module.exports = { newRecipes };
