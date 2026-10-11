import { buildTopic, c, sorter, spell, typed } from "./engine.js";

// Year 1 Everyday materials (docs/curriculum/year-1-science.md). Objects are
// picked so their usual material is not in doubt (no "spoon", which can be
// metal, wood or plastic), and property words are the statutory pairs.

/* ---------- Objects and Materials ---------- */

const OBJECT_RULE = "An object is a thing. A material is what the thing is made from.";
const which = (prompt, answer, wrong) => c(prompt, answer, wrong, { rule: OBJECT_RULE });

const objectLearn = [
  which("A window is made of glass. Which word is the material?", "glass", ["window"]),
  which("A chair is made of wood. Which word is the material?", "wood", ["chair"]),
  which("A key is made of metal. Which word is the object?", "key", ["metal"]),
  which("A bottle is made of plastic. Which word is the object?", "bottle", ["plastic"]),
  which("A sock is made of fabric. Which word is the material?", "fabric", ["sock"]),
  which("A book is made of paper. Which word is the object?", "book", ["paper"]),
];

const objectWhich = [
  which("Which of these is a material?", "plastic", ["bucket", "sock", "chair"]),
  which("Which of these is a material?", "glass", ["cup", "window", "bottle"]),
  which("Which of these is a material?", "metal", ["key", "spoon", "coin"]),
  which("Which of these is an object?", "teddy bear", ["fabric", "metal", "wood"]),
  which("Which of these is an object?", "book", ["paper", "plastic", "cotton"]),
  which("Which of these is an object?", "chair", ["wood", "wool", "clay"]),
];

const OBJECT_CARDS = [
  ["spoon", "object"], ["window", "object"], ["chair", "object"], ["sock", "object"], ["key", "object"], ["book", "object"], ["bottle", "object"],
  ["wood", "material"], ["metal", "material"], ["wool", "material"], ["plastic", "material"], ["paper", "material"], ["fabric", "material"], ["clay", "material"],
];
const objectSorts = [
  sorter("Sort the words: object or material?", [["object", "Object"], ["material", "Material"]], OBJECT_CARDS, { rule: OBJECT_RULE }),
  sorter("Is it a thing, or what a thing is made from?", [["object", "Object (a thing)"], ["material", "Material (what it is made from)"]], OBJECT_CARDS),
];

const objectSame = [
  c("Bix has a wooden spoon and a metal spoon. What is the same about them?", "They are both spoons.", ["They are both made of wood.", "They are both made of metal."]),
  c("Bix has a wooden chair and a wooden table. What is the same about them?", "They are both made of wood.", ["They are both chairs.", "They are both made of metal."]),
  c("Bix has a glass jar and a plastic jar. What is the same about them?", "They are both jars.", ["They are both made of glass.", "They are both made of plastic."]),
  c("Bix has a metal key and a metal spoon. What is the same about them?", "They are both made of metal.", ["They are both keys.", "They are both made of glass."]),
  c("Bix has a plastic bottle and a glass bottle. What is the same about them?", "They are both bottles.", ["They are both made of plastic.", "They are both made of glass."]),
  c("Bix has a paper bag and a paper plate. What is the same about them?", "They are both made of paper.", ["They are both bags.", "They are both made of metal."]),
];

const objectSpell = [
  spell("cup", "☕", "a cup", "Make the name of the object."),
  spell("key", "🔑", "a key", "Make the name of the object."),
  spell("sock", "🧦", "a sock", "Make the name of the object."),
  spell("book", "📕", "a closed book", "Make the name of the object."),
  spell("chair", "🪑", "a chair", "Make the name of the object."),
];

const objectApply = [
  c("Bix's coat is made of fabric. Which word is the material?", "fabric", ["coat"], { rule: OBJECT_RULE }),
  c("Bix drinks from a glass cup. What is the cup made of?", "glass", ["metal", "plastic", "wood"]),
  c("Bix's lunchbox is made of plastic. Which word is the object?", "lunchbox", ["plastic"], { rule: OBJECT_RULE }),
  c("A spoon can be made of metal, wood or ___.", "plastic", ["water", "cotton wool"]),
  c("Bix builds a tower from wooden blocks. What material are the blocks made of?", "wood", ["glass", "paper", "rubber"]),
];

const objectTyped = [
  typed("A chair is made of wood. Type the material.", "wood"),
  typed("A sock is made of fabric. Type the object.", "sock"),
  typed("A window is made of glass. Type the material.", "glass"),
];

/* ---------- Naming Everyday Materials ---------- */

const made = (picture, pictureLabel, prompt, answer, wrong) => c(prompt, answer, wrong, { picture, pictureLabel });

const nameLearn = [
  made("🔑", "a key", "What is this key made of?", "metal", ["wood", "glass", "paper"]),
  made("🪟", "a window", "What is the see-through part of a window made of?", "glass", ["wood", "rock", "fabric"]),
  made("✏️", "a pencil", "What is the outside of this pencil made of?", "wood", ["glass", "rock", "water"]),
  made("🪨", "a pebble", "What is this pebble made of?", "rock", ["plastic", "paper", "glass"]),
  made("🧦", "a sock", "What is this sock made of?", "fabric", ["metal", "glass", "rock"]),
  made("📰", "a newspaper", "What is this newspaper made of?", "paper", ["metal", "rock", "glass"]),
  made("🎈", "a party balloon", "A party balloon stretches when you blow it up. What is it made of?", "rubber", ["glass", "wood", "rock"]),
  made("🌧️", "rain falling from a cloud", "What is rain made of?", "water", ["glass", "wood", "metal"]),
  made("🪣", "a beach bucket", "What is this beach bucket made of?", "plastic", ["glass", "paper", "rock"]),
  made("🪙", "a coin", "What is this coin made of?", "metal", ["paper", "wood", "rock"]),
];

const nameFacts = [
  c("What is a T-shirt made of?", "fabric", ["glass", "rock", "metal"]),
  c("What are the pages of a book made of?", "paper", ["metal", "glass", "rock"]),
  c("What is the sea made of?", "water", ["wood", "paper", "glass"]),
  c("What is a mountain made of?", "rock", ["paper", "fabric", "plastic"]),
  c("What is a tree trunk made of?", "wood", ["glass", "metal", "plastic"]),
  c("What are wellies usually made of?", "rubber", ["paper", "glass", "wood"]),
  c("What is a paperclip made of?", "metal", ["paper", "wood", "water"]),
];

const nameSorts = [
  sorter("Sort the objects: metal or wood?", [["metal", "Metal"], ["wood", "Wood"]], [
    ["🔑 key", "metal"], ["🪙 coin", "metal"], ["nail", "metal"], ["paperclip", "metal"],
    ["🪵 log", "wood"], ["✏️ pencil", "wood"], ["twig", "wood"], ["lolly stick", "wood"],
  ]),
  sorter("Sort the objects: glass or rock?", [["glass", "Glass"], ["rock", "Rock"]], [
    ["window pane", "glass"], ["jam jar", "glass"], ["glass marble", "glass"], ["mirror", "glass"],
    ["🪨 pebble", "rock"], ["cliff", "rock"], ["boulder", "rock"], ["stone wall", "rock"],
  ]),
];

const nameSorts3 = [
  sorter("What is each object made of?", [["glass", "Glass"], ["metal", "Metal"], ["wood", "Wood"]], [
    ["window pane", "glass"], ["jam jar", "glass"], ["glass marble", "glass"],
    ["🔑 key", "metal"], ["🪙 coin", "metal"], ["paperclip", "metal"],
    ["🪵 log", "wood"], ["✏️ pencil", "wood"], ["lolly stick", "wood"],
  ]),
  sorter("What is each object made of?", [["paper", "Paper"], ["fabric", "Fabric"], ["rock", "Rock"]], [
    ["📰 newspaper", "paper"], ["envelope", "paper"], ["tissue", "paper"],
    ["🧦 sock", "fabric"], ["T-shirt", "fabric"], ["scarf", "fabric"],
    ["🪨 pebble", "rock"], ["cliff", "rock"], ["boulder", "rock"],
  ]),
];

const nameSpell = [
  spell("wood", "🪵", "a log", "What is a log made of? Make the word."),
  spell("rock", "🪨", "a pebble", "What is a pebble made of? Make the word."),
  spell("glass", "🪟", "a window", "What is a window made of? Make the word."),
  spell("metal", "🔑", "a key", "What is a key made of? Make the word."),
  spell("paper", "📰", "a newspaper", "What is a newspaper made of? Make the word."),
  spell("water", "🌧️", "rain falling from a cloud", "What is rain made of? Make the word."),
];

const nameApply = [
  c("Bix finds something hard, grey and heavy on the beach. It is a pebble. What is it made of?", "rock", ["paper", "fabric", "plastic"]),
  c("Bix's window has a crack. Which material has cracked?", "glass", ["paper", "fabric", "water"]),
  c("Bix wraps a present in something thin that tears easily. What material is it?", "paper", ["rock", "glass", "metal"]),
  c("Bix turns on the tap to fill the bath. Which material comes out?", "water", ["wood", "glass", "paper"]),
  c("Bix makes a fence from planks cut from trees. Which material is Bix using?", "wood", ["glass", "water", "paper"]),
  c("Bix uses a paperclip to hold some pages together. What is the paperclip made of?", "metal", ["paper", "wood", "water"]),
];

const nameTyped = [
  typed("What is a pebble made of? Type the material.", "rock", { picture: "🪨", pictureLabel: "a pebble" }),
  typed("What is a log made of? Type the material.", "wood", { picture: "🪵", pictureLabel: "a log" }),
  typed("What is rain made of? Type the material.", "water", { picture: "🌧️", pictureLabel: "rain falling from a cloud" }),
];

/* ---------- Properties of Materials ---------- */

const prop = (prompt, rule, answer, wrong) => c(prompt, answer, wrong, { rule });

const propLearn = [
  prop("Which word describes glass?", "Transparent means you can see through it.", "transparent", ["stretchy", "soft", "absorbent"]),
  prop("A sponge soaks up water. Which word describes it?", "Absorbent means it soaks up water.", "absorbent", ["transparent", "shiny", "waterproof"]),
  prop("An elastic band gets longer when you pull it. Which word describes it?", "Stretchy means it gets longer when you pull it.", "stretchy", ["transparent", "rough", "absorbent"]),
  prop("A rock does not squash when you press it. Which word describes it?", "Hard means it does not squash when you press it.", "hard", ["soft", "stretchy", "absorbent"]),
  prop("Cotton wool squashes easily when you press it. Which word describes it?", "Soft means it squashes easily.", "soft", ["hard", "shiny", "transparent"]),
  prop("Foil looks bright when light shines on it. Which word describes it?", "Shiny means it looks bright when light shines on it.", "shiny", ["dull", "absorbent", "stretchy"]),
  prop("Sandpaper feels bumpy and scratchy. Which word describes it?", "Rough means it feels bumpy.", "rough", ["smooth", "shiny", "transparent"]),
  prop("Wellies keep water out. Which word describes them?", "Waterproof means it keeps water out.", "waterproof", ["absorbent", "transparent"]),
  prop("An elastic band stretches, but a wooden block does not. Which word describes the wooden block?", "Stiff means it does not stretch or bend.", "stiff", ["stretchy", "soft", "absorbent"]),
  prop("You cannot see through cardboard. Which word describes it?", "Opaque means you cannot see through it.", "opaque", ["transparent", "shiny", "stretchy"]),
  prop("Paper bends easily. Which word describes it?", "Bendy means it bends easily.", "bendy", ["transparent", "hard", "waterproof"]),
  prop("A glass marble feels slippery and even. Which word describes it?", "Smooth means it has no bumps.", "smooth", ["rough", "soft", "absorbent"]),
];

const opposite = (word, answer, wrong) => c(`What is the opposite of **${word}**?`, answer, wrong);
const propOpposites = [
  opposite("hard", "soft", ["shiny", "rough", "transparent"]),
  opposite("stretchy", "stiff", ["shiny", "absorbent", "rough"]),
  opposite("shiny", "dull", ["soft", "stretchy", "waterproof"]),
  opposite("rough", "smooth", ["hard", "stretchy", "absorbent"]),
  opposite("transparent", "opaque", ["soft", "rough", "stretchy"]),
  opposite("waterproof", "not waterproof", ["shiny", "stiff", "smooth"]),
  opposite("absorbent", "not absorbent", ["soft", "dull", "rough"]),
];

const propSorts = [
  sorter("Can you see through it?", [["transparent", "Transparent"], ["opaque", "Opaque"]], [
    ["window glass", "transparent"], ["cling film", "transparent"], ["clear plastic bottle", "transparent"], ["drinking glass", "transparent"],
    ["wooden door", "opaque"], ["brick", "opaque"], ["cardboard", "opaque"], ["metal tin", "opaque"],
  ]),
  sorter("Does it keep water out?", [["yes", "Waterproof"], ["no", "Not waterproof"]], [
    ["plastic bag", "yes"], ["rubber wellies", "yes"], ["foil", "yes"], ["glass jar", "yes"],
    ["paper", "no"], ["cotton wool", "no"], ["cardboard", "no"], ["sponge", "no"],
  ]),
  sorter("Is it hard or soft?", [["hard", "Hard"], ["soft", "Soft"]], [
    ["rock", "hard"], ["metal spoon", "hard"], ["brick", "hard"], ["glass marble", "hard"],
    ["cotton wool", "soft"], ["wool jumper", "soft"], ["sponge", "soft"], ["feather", "soft"],
  ]),
  sorter("Does it soak up water?", [["yes", "Absorbent"], ["no", "Not absorbent"]], [
    ["sponge", "yes"], ["paper towel", "yes"], ["cotton wool", "yes"], ["bath towel", "yes"],
    ["plastic plate", "no"], ["glass", "no"], ["foil", "no"], ["metal spoon", "no"],
  ]),
  sorter("Is it shiny or dull?", [["shiny", "Shiny"], ["dull", "Dull"]], [
    ["kitchen foil", "shiny"], ["mirror", "shiny"], ["new coin", "shiny"],
    ["cardboard", "dull"], ["wooden block", "dull"], ["wool jumper", "dull"],
  ]),
  sorter("Is it rough or smooth?", [["rough", "Rough"], ["smooth", "Smooth"]], [
    ["sandpaper", "rough"], ["tree bark", "rough"], ["brick", "rough"],
    ["mirror", "smooth"], ["glass marble", "smooth"], ["plastic ruler", "smooth"],
  ]),
];

const propSpell = [
  spell("hard", "🪨", "a rock", "A rock does not squash. It is ___. Make the word."),
  spell("soft", "🧸", "a teddy bear", "A teddy bear squashes when you hug it. It is ___. Make the word."),
  spell("shiny", "🪙", "a new coin", "A new coin looks bright in the light. It is ___. Make the word."),
  spell("rough", undefined, undefined, "Sandpaper feels bumpy and scratchy. It is ___. Make the word."),
  spell("bendy", undefined, undefined, "Paper bends easily. It is ___. Make the word."),
];

const propApply = [
  c("Bix shone a torch at some materials. Light went through cling film, but not through cardboard or foil. Which material is transparent?", "cling film", ["cardboard", "foil"]),
  c("Bix pulled a spoon, a pencil and an elastic band. Only one got longer. Which one is stretchy?", "elastic band", ["spoon", "pencil"]),
  c("Bix poured water on paper towel, plastic and foil. Only one got soggy. Which material is absorbent?", "paper towel", ["plastic", "foil"]),
  c("Bix pressed cotton wool, a pebble and a wooden block. Only one squashed. Which one is soft?", "cotton wool", ["pebble", "wooden block"]),
  c("Bix rubbed a finger over sandpaper, glass and a plastic ruler. Which one felt rough?", "sandpaper", ["glass", "plastic ruler"]),
  c("Bix looked at foil, cardboard and a wool jumper under a lamp. Which one looked shiny?", "foil", ["cardboard", "wool jumper"]),
];

const propTyped = [
  typed("A rock is not soft. It is ___. Type the missing word.", "hard"),
  typed("Cotton wool is not hard. It is ___. Type the missing word.", "soft"),
  typed("Sandpaper is not smooth. It is ___. Type the missing word.", "rough"),
];

/* ---------- Grouping Materials ---------- */

const best = (prompt, answer, wrong, hint) => c(prompt, answer, wrong, { hint });

const groupBest = [
  best("Which is the best material for an umbrella? It must keep the rain out.", "plastic", ["paper", "cotton wool", "cardboard"], "It needs to be waterproof."),
  best("Which is the best material for a window? You need to see through it.", "glass", ["wood", "brick", "fabric"], "It needs to be transparent."),
  best("Which is the best material for lining a dog basket? It should be soft and warm.", "soft fabric", ["metal", "glass", "rock"], "It needs to be soft."),
  best("Which is the best material for curtains that keep the light out?", "thick fabric", ["glass", "cling film"], "It needs to be opaque."),
  best("Which is the best material for a bookshelf? It must be strong and stiff.", "wood", ["paper", "cotton wool", "rubber"], "It must not bend under heavy books."),
  best("Which is the best material for a gymnast's leotard? It must stretch when they move.", "stretchy fabric", ["metal", "wood", "cardboard"], "It needs to be stretchy."),
  best("Which is the best material for wiping up a spill?", "sponge", ["plastic", "foil", "glass"], "It needs to be absorbent."),
  best("Which is the best material for wellies? They must keep feet dry.", "rubber", ["paper", "cotton wool", "cardboard"], "It needs to be waterproof."),
  best("Which is the best material for a saucepan that goes on the cooker?", "metal", ["paper", "plastic", "wool"], "It must not burn or melt."),
];

const together = (items, answer, wrong) => c(`${items} are all ___. Which word fits?`, answer, wrong);
const groupTogether = [
  together("Glass, cling film and clear plastic", "transparent", ["absorbent", "soft", "stretchy"]),
  together("A sponge, paper towel and cotton wool", "absorbent", ["shiny", "transparent", "waterproof"]),
  together("Rock, metal and glass", "hard", ["soft", "stretchy", "absorbent"]),
  together("Wool, cotton wool and feathers", "soft", ["hard", "shiny", "transparent"]),
  together("Foil, a mirror and a new coin", "shiny", ["dull", "soft", "absorbent"]),
  together("Rubber, plastic and foil", "waterproof", ["absorbent", "soft", "rough"]),
  together("An elastic band, a balloon and leggings", "stretchy", ["stiff", "transparent", "rough"]),
];

const odd = (property, answer, wrong) => c(`These should all be ${property}. Which one is **not** ${property}?`, answer, wrong);
const groupOdd = [
  odd("waterproof", "paper", ["rubber", "plastic", "foil"]),
  odd("transparent", "cardboard", ["glass", "cling film", "clear plastic"]),
  odd("soft", "rock", ["wool", "cotton wool", "feathers"]),
  odd("hard", "sponge", ["metal", "rock", "glass"]),
  odd("absorbent", "foil", ["sponge", "paper towel", "cotton wool"]),
  odd("shiny", "cardboard", ["foil", "a mirror", "a new coin"]),
];

const groupSorts = [
  sorter("Which materials would make a good raincoat?", [["good", "Good for a raincoat"], ["bad", "Not good for a raincoat"]], [
    ["plastic", "good"], ["rubber", "good"], ["waterproof fabric", "good"],
    ["paper", "bad"], ["cotton wool", "bad"], ["cardboard", "bad"], ["tissue", "bad"],
  ], { hint: "A raincoat must be waterproof." }),
  sorter("Which materials would make a good window?", [["good", "Good for a window"], ["bad", "Not good for a window"]], [
    ["glass", "good"], ["clear plastic", "good"],
    ["wood", "bad"], ["brick", "bad"], ["cardboard", "bad"], ["metal", "bad"],
  ], { hint: "You need to see through a window." }),
  sorter("Which materials would make a comfy pillow?", [["good", "Good for a pillow"], ["bad", "Not good for a pillow"]], [
    ["feathers", "good"], ["cotton wool", "good"], ["soft fabric", "good"],
    ["rock", "bad"], ["metal", "bad"], ["glass", "bad"], ["wood", "bad"],
  ], { hint: "A pillow should be soft." }),
];

// Bix's own results, so the numbers are a made-up test, never a claim about
// every sample of a material. Values are distinct, so "most" has one answer.
const SOAK_SETS = [
  [["paper towel", 9], ["fabric", 6], ["cardboard", 2], ["foil", 0]],
  [["sponge", 8], ["cotton wool", 5], ["glass", 0], ["paper", 3]],
  [["bath towel", 7], ["tissue", 4], ["rubber", 0], ["cardboard", 2]],
];
const soakChart = (rng) => {
  const set = SOAK_SETS[Math.floor(rng() * SOAK_SETS.length)];
  const rows = set.map(([label, value]) => ({ label, value }));
  return {
    type: "chart",
    prompt: "Bix dripped water onto each material and counted the drops it soaked up. Which material was the most absorbent?",
    chart: { type: "bar", rows, unit: "drops" },
    ask: { op: "most" },
    answer: rows.reduce((top, row) => (row.value > top.value ? row : top)).label,
    options: rows.map((row) => row.label),
    hint: "Find the tallest bar.",
  };
};
const groupCharts = [soakChart, soakChart];

const groupApply = [
  c("Bix is making a raincoat for a teddy. Water soaked into paper and cotton but ran off plastic. Which should Bix use?", "plastic", ["paper", "cotton"]),
  c("Bix needs a window for a toy house. Which material should Bix choose?", "clear plastic", ["cardboard", "wood", "foil"]),
  c("Bix wants to wipe up spilt juice. Which material is best?", "paper towel", ["foil", "plastic", "glass"]),
  c("Bix is building a bridge for toy cars. It must be strong and stiff. Which material is best?", "wood", ["paper", "wool", "cling film"]),
  c("Bix needs a material for a hair band that stretches round a ponytail. Which is best?", "elastic", ["wood", "glass", "paper"]),
];

const groupTyped = [
  typed("Window panes in houses are usually made of ___. Type the material.", "glass"),
  typed("Planks cut from trees make a strong bookshelf. What material are the planks? Type it.", "wood"),
  typed("A pillow should squash when you lie on it. It should be ___. Type the missing word.", "soft"),
];

export const materialBuilders = {
  "objects-and-materials": buildTopic({
    banks: { learn: objectLearn, which: objectWhich, sorts: objectSorts, same: objectSame, spell: objectSpell, apply: objectApply, typed: objectTyped },
    levels: {
      1: ["learn", "learn", "learn", "learn", "learn"],
      2: ["sorts", "which", "which", "sorts", "which"],
      3: ["same", "spell", "same", "spell", "same"],
      4: ["apply", "typed", "apply", "apply", "typed"],
    },
  }),
  "naming-everyday-materials": buildTopic({
    banks: { learn: nameLearn, facts: nameFacts, sorts: nameSorts, sorts3: nameSorts3, spell: nameSpell, apply: nameApply, typed: nameTyped },
    levels: {
      1: ["learn", "learn", "learn", "learn", "learn"],
      2: ["sorts", "facts", "sorts", "facts", "facts"],
      3: ["sorts3", "spell", "sorts3", "spell", "spell"],
      4: ["apply", "typed", "apply", "apply", "typed"],
    },
  }),
  "properties-of-materials": buildTopic({
    banks: { learn: propLearn, opposites: propOpposites, sorts: propSorts, spell: propSpell, apply: propApply, typed: propTyped },
    levels: {
      1: ["learn", "learn", "learn", "learn", "learn"],
      2: ["opposites", "sorts", "opposites", "sorts", "opposites"],
      3: ["sorts", "spell", "sorts", "spell", "sorts"],
      4: ["apply", "typed", "apply", "apply", "typed"],
    },
  }),
  "grouping-materials": buildTopic({
    banks: { best: groupBest, together: groupTogether, odd: groupOdd, sorts: groupSorts, charts: groupCharts, apply: groupApply, typed: groupTyped },
    levels: {
      1: ["best", "best", "best", "best", "best"],
      2: ["together", "sorts", "together", "sorts", "together"],
      3: ["odd", "sorts", "odd", "charts", "odd"],
      4: ["apply", "typed", "charts", "apply", "typed"],
    },
  }),
};
