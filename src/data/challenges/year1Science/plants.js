import { buildTopic, c, sorter, spell, typed } from "./engine.js";

// Year 1 Plants (docs/curriculum/year-1-science.md). Names and structures
// come from the statutory list and its guidance: leaves, flowers (blossom),
// petals, fruit, roots, bulb, seed, trunk, branches, stem. Every wrong option
// is chosen so it does NOT also fit the clue.

/* ---------- Wild and Garden Plants ---------- */

const WILD_RULE = "Wild plants grow by themselves. Nobody plants them. Garden plants are usually planted by people.";

// One clue per plant. Each clue fits only its own plant among those named here.
const CLUES = {
  daisy: "small white petals around a yellow middle",
  dandelion: "a yellow flower that turns into a fluffy ball of seeds",
  buttercup: "shiny yellow petals shaped like a little cup",
  "stinging nettle": "leaves with tiny hairs that sting",
  clover: "small leaves that grow in groups of three",
  bluebell: "blue flowers shaped like little bells",
  sunflower: "a very tall stem with one huge yellow flower",
  poppy: "bright red petals and a dark middle",
  lavender: "tiny purple flowers on tall spikes that smell sweet",
};
const PLANTS = Object.keys(CLUES);
const others = (name) => PLANTS.filter((p) => p !== name);
// Plants that share a feature with a clue are kept out of its wrong options.
const CLASH = { daisy: ["dandelion", "buttercup"], dandelion: ["buttercup", "sunflower"], buttercup: ["dandelion", "sunflower"], sunflower: ["dandelion", "buttercup"] };
const fair = (name) => others(name).filter((p) => !(CLASH[name] ?? []).includes(p));

const wildNames = [
  c("This plant has small white petals around a yellow middle. It grows in grassy places. What is it?", "daisy", ["bluebell", "tulip", "stinging nettle"], { hint: "You often see lots of them on a lawn." }),
  c("This plant has a yellow flower. Later, the flower turns into a white, fluffy ball of seeds. What is it?", "dandelion", ["daisy", "rose", "bluebell"], { hint: "You can blow its fluffy seeds away." }),
  c("This wild plant has shiny yellow petals shaped like a little cup. What is it?", "buttercup", ["daisy", "bluebell", "stinging nettle"], { hint: "Its name has the word **cup** in it." }),
  c("Its leaves are covered in tiny hairs that sting if you touch them. What is it?", "stinging nettle", ["clover", "daisy", "sunflower"], { hint: "Its name tells you what it does." }),
  c("This small wild plant has leaves that grow in groups of three. What is it?", "clover", ["sunflower", "tulip", "bluebell"], { picture: "☘️", pictureLabel: "a leaf made of three round parts", hint: "Count the parts of the leaf: three." }),
  c("This plant has blue flowers shaped like little bells. It grows in woods in spring. What is it?", "bluebell", ["sunflower", "rose", "daisy"], { hint: "Its name has a colour and a shape in it." }),
  c("This garden plant grows very tall. It has one huge yellow flower full of seeds. What is it?", "sunflower", ["daisy", "clover", "bluebell"], { picture: "🌻", pictureLabel: "a tall plant with one huge yellow flower", hint: "Its name has the word **sun** in it." }),
  c("This garden plant grows from a bulb. Each stem has one cup-shaped flower in spring. What is it?", "tulip", ["sunflower", "stinging nettle", "clover"], { picture: "🌷", pictureLabel: "a cup-shaped flower on a stem", hint: "It is not a wild plant." }),
  c("This garden plant has sweet-smelling flowers and sharp thorns on its stems. What is it?", "rose", ["tulip", "daisy", "clover"], { picture: "🌹", pictureLabel: "a red flower with many soft petals", hint: "Be careful of its thorns!" }),
  c("This plant grows from a bulb. It has a yellow flower shaped like a trumpet. What is it?", "daffodil", ["rose", "stinging nettle", "bluebell"], { hint: "It flowers in spring and starts with **d**." }),
  c("This garden plant has tiny purple flowers on tall spikes. Bees love it. What is it?", "lavender", ["sunflower", "daisy", "buttercup"], { hint: "Its flowers are purple." }),
  c("This plant has bright red petals and a dark middle. It grows wild at the edge of fields. What is it?", "poppy", ["bluebell", "lavender", "daisy"], { hint: "Its flowers are red." }),
];

const wildSorts = [
  sorter("Sort the plants: wild or garden?", [["wild", "Wild plant"], ["garden", "Garden plant"]], [
    ["dandelion", "wild"], ["daisy", "wild"], ["stinging nettle", "wild"], ["clover", "wild"], ["buttercup", "wild"], ["bluebell", "wild"],
    ["sunflower", "garden"], ["tulip", "garden"], ["lavender", "garden"], ["rose", "garden"], ["daffodil", "garden"],
  ], { rule: WILD_RULE }),
  sorter("Sort the plants by the colour of their flowers.", [["yellow", "Yellow flowers"], ["other", "Not yellow"]], [
    ["dandelion", "yellow"], ["buttercup", "yellow"], ["sunflower", "yellow"], ["daffodil", "yellow"],
    ["bluebell", "other"], ["poppy", "other"], ["lavender", "other"],
  ]),
];

// Plants whose names give their clue away ("blue bell", "butter cup", "stinging") are left out.
const NAMED_BY_CLUE = ["bluebell", "buttercup", "stinging nettle"];
const wildMatch = PLANTS.filter((name) => !NAMED_BY_CLUE.includes(name)).map((name) => c(`Which one describes a ${name}?`, CLUES[name], fair(name).map((p) => CLUES[p]), {
  hint: `Think about what a ${name} looks like.`,
}));

const wildSpell = [
  spell("daisy", "🌼", "a flower with petals around a middle", "This wild flower has white petals and a yellow middle. Make its name."),
  spell("rose", "🌹", "a red flower with soft petals", "This garden flower has thorns on its stem. Make its name."),
  spell("tulip", "🌷", "a cup-shaped flower on a stem", "This garden flower grows from a bulb. Make its name."),
  spell("poppy", undefined, undefined, "This wild flower has bright red petals. Make its name."),
  spell("clover", "☘️", "a leaf made of three round parts", "This wild plant has leaves in groups of three. Make its name."),
];

const wildApply = [
  c("Bix walks through a wood where nobody has planted anything. Which plant might Bix find growing wild?", "bluebell", ["tulip", "sunflower", "lavender"]),
  c("Bix wants to grow a very tall plant with a huge yellow flower. Which seeds should Bix plant?", "sunflower seeds", ["daisy seeds", "clover seeds", "poppy seeds"]),
  c("Bix brushed past a plant and got an itchy, stinging rash. Which plant was it?", "stinging nettle", ["daisy", "clover", "tulip"]),
  c("Bix blew on a fluffy white seed head and the seeds floated away. Which plant was it?", "dandelion", ["rose", "tulip", "bluebell"]),
  c("Bix's gran planted bulbs in autumn. In spring, yellow trumpet-shaped flowers came up. What were they?", "daffodils", ["sunflowers", "nettles", "poppies"]),
  c("Bix sees bees on tall spikes of tiny purple flowers that smell sweet. Which plant is it?", "lavender", ["dandelion", "poppy", "clover"]),
];

const wildTyped = [
  typed("This wild flower has small white petals and a yellow middle. Type its name.", "daisy"),
  typed("This garden flower smells sweet and has thorns. Type its name.", "rose"),
  typed("This wild flower has bright red petals and a dark middle. Type its name.", "poppy"),
];

/* ---------- Deciduous and Evergreen Trees ---------- */

const TREE_RULE = "Deciduous trees lose all their leaves in autumn. Evergreen trees keep their leaves all year.";
const kind = (prompt, answer) => c(prompt, answer, [answer === "deciduous" ? "evergreen" : "deciduous"], { rule: TREE_RULE });
const pairInWinter = (rng) => {
  const evergreenFirst = rng() < 0.5;
  return c("It is winter. Which tree is evergreen?", evergreenFirst ? "Tree A" : "Tree B", [evergreenFirst ? "Tree B" : "Tree A"], {
    rule: TREE_RULE, visual: { type: "treePair", evergreenFirst }, hint: "An evergreen tree still has its leaves in winter.",
  });
};

const treeKinds = [
  kind("An oak tree loses all its leaves in autumn. What kind of tree is it?", "deciduous"),
  kind("A holly tree keeps its prickly leaves all year. What kind of tree is it?", "evergreen"),
  kind("A pine tree has needles all year round. What kind of tree is it?", "evergreen"),
  kind("A horse chestnut tree loses its leaves in autumn. What kind of tree is it?", "deciduous"),
  kind("A sycamore tree has bare branches in winter. What kind of tree is it?", "deciduous"),
  kind("A fir tree stays green all winter. What kind of tree is it?", "evergreen"),
  pairInWinter,
  pairInWinter,
];

const treeNames = [
  c("This tree grows acorns. What is it?", "oak", ["holly", "pine", "apple tree"], { hint: "It is a big deciduous tree." }),
  c("Conkers grow on this tree. What is it?", "horse chestnut", ["oak", "holly", "fir"], { hint: "Conkers are its seeds." }),
  c("This tree has seeds with wings that spin like helicopters. What is it?", "sycamore", ["holly", "oak", "apple tree"], { hint: "It starts with **s**." }),
  c("This evergreen tree has prickly, shiny leaves and red berries. What is it?", "holly", ["oak", "sycamore", "silver birch"], { hint: "It is the only evergreen tree here." }),
  c("This evergreen tree has thin leaves like needles. It grows cones. What is it?", "pine", ["oak", "horse chestnut", "holly"], { hint: "The cones are named after it." }),
  c("This tree has white bark that peels like paper. What is it?", "silver birch", ["holly", "pine", "horse chestnut"], { hint: "Its name has a colour in it." }),
  c("People often bring this evergreen tree indoors at Christmas. What is it?", "fir tree", ["oak", "apple tree", "sycamore"], { hint: "It keeps its needles all year." }),
  c("This tree grows crunchy fruit that can be red or green. What is it?", "apple tree", ["holly", "pine", "silver birch"], { hint: "You might find its fruit in a lunchbox." }),
];

const treeSorts = [
  sorter("Sort the trees: deciduous or evergreen?", [["deciduous", "Deciduous"], ["evergreen", "Evergreen"]], [
    ["oak", "deciduous"], ["horse chestnut", "deciduous"], ["sycamore", "deciduous"], ["apple tree", "deciduous"], ["silver birch", "deciduous"],
    ["holly", "evergreen"], ["pine", "evergreen"], ["fir", "evergreen"],
  ], { rule: TREE_RULE }),
  sorter("Which trees look green in winter, and which have bare branches?", [["green", "Green in winter"], ["bare", "Bare in winter"]], [
    ["holly", "green"], ["pine", "green"], ["fir", "green"],
    ["oak", "bare"], ["horse chestnut", "bare"], ["sycamore", "bare"], ["apple tree", "bare"],
  ], { rule: TREE_RULE }),
];

const treeYear = [
  { type: "order", prompt: "Put the oak tree's year in order. Start with spring.", labels: ["new leaves open", "full of green leaves", "leaves turn brown and fall", "bare branches"], hint: "Spring, summer, autumn, then winter." },
  { type: "order", prompt: "Put the oak tree's year in order. Start with autumn.", labels: ["leaves turn brown and fall", "bare branches", "new leaves open", "full of green leaves"], hint: "Autumn, winter, spring, then summer." },
];

const treeSpell = [
  spell("pine", "🌲", "an evergreen tree with needles", "This evergreen tree has needles and cones. Make its name."),
  spell("oak", undefined, undefined, "Acorns grow on this tree. Make its name."),
  spell("holly", undefined, undefined, "This evergreen tree has prickly leaves and red berries. Make its name."),
  spell("fir", "🎄", "a pointed evergreen tree", "This evergreen tree is often used at Christmas. Make its name."),
];

const treeApply = [
  c("In January, Bix sees a tree that is still green. Which tree could it be?", "holly", ["oak", "horse chestnut", "sycamore"]),
  c("Bix collects conkers in autumn. Will the conker tree have leaves in winter?", "No, it is deciduous", ["Yes, it is evergreen"]),
  c("Bix wants a tree that stays green all year. Which kind of tree should Bix plant?", "evergreen", ["deciduous"]),
  c("Bix took photos of the same tree in summer and in winter. In winter it was bare. What kind of tree is it?", "deciduous", ["evergreen"]),
  c("Bix found cones under a tree with needles. Which tree is it?", "pine", ["oak", "apple tree", "sycamore"]),
];

const treeTyped = [
  typed("Trees that keep their leaves all year are called ___ trees. Type the missing word.", "evergreen"),
  typed("Acorns grow on this tree. Type its name.", "oak"),
  typed("This evergreen tree has prickly leaves and red berries. Type its name.", "holly"),
];

/* ---------- Parts of a Flowering Plant ---------- */

const point = (part, answer, wrong, hint, extra = {}) =>
  c("Which part is the arrow pointing to?", answer, wrong, { visual: { type: "plant", point: part, ...extra }, hint });

const plantPoint = [
  point("roots", "roots", ["stem", "petal", "leaf"], "This part grows under the soil."),
  point("stem", "stem", ["roots", "petal", "seed"], "This part holds the flower up."),
  point("leaf", "leaf", ["roots", "bulb", "seed"], "This part is green and flat."),
  point("flower", "flower", ["roots", "leaf", "bulb"], "This is the colourful top part."),
  point("petal", "petal", ["roots", "stem", "leaf"], "This is one coloured part of the flower."),
  point("bulb", "bulb", ["seed", "leaf", "petal"], "Tulips and daffodils grow from this.", { bulb: true }),
];

const plantFacts = [
  c("Which part of a plant grows down into the soil?", "roots", ["petals", "leaves", "flower"]),
  c("Which part of a flower is often brightly coloured?", "petals", ["roots", "stem", "bulb"]),
  c("A tulip grows from this. It looks a bit like an onion. What is it?", "bulb", ["seed", "petal", "leaf"]),
  c("What can a seed grow into?", "a new plant", ["a stone", "an egg", "a shell"]),
  c("Which part of the plant joins the flower to the roots?", "stem", ["petal", "seed", "bulb"]),
  c("Where are the seeds in an apple?", "in the middle", ["on the skin", "on the leaves"]),
  c("Bix cut open a tomato and found seeds inside. What is a tomato?", "a fruit", ["a root", "a leaf", "a stem"]),
];

const plantSorts = [
  sorter("Sort the plant parts: above the ground or under the ground?", [["above", "Above the ground"], ["under", "Under the ground"]], [
    ["flower", "above"], ["petals", "above"], ["leaves", "above"], ["stem", "above"], ["roots", "under"], ["bulb", "under"],
  ]),
  sorter("Sort the words: part of a plant or not?", [["plant", "Part of a plant"], ["not", "Not part of a plant"]], [
    ["roots", "plant"], ["stem", "plant"], ["leaf", "plant"], ["petal", "plant"], ["seed", "plant"], ["bulb", "plant"],
    ["fur", "not"], ["beak", "not"], ["fin", "not"], ["feather", "not"], ["paw", "not"],
  ]),
];

const spellPart = (answer, part, extra = {}) => ({
  ...spell(answer, undefined, undefined, "Make the name of the part the arrow points to."),
  visual: { type: "plant", point: part, ...extra },
});
const plantSpell = [
  spellPart("stem", "stem"),
  spellPart("leaf", "leaf"),
  spellPart("roots", "roots"),
  spellPart("petal", "petal"),
  spellPart("bulb", "bulb", { bulb: true }),
];

const plantOrder = [
  { type: "order", prompt: "Put the parts in order from the top of the plant to the bottom.", labels: ["flower", "stem", "roots"], visual: { type: "plant" } },
  { type: "order", prompt: "This plant grew from a bulb. Put its parts in order from the top to the bottom.", labels: ["flower", "stem", "bulb", "roots"], visual: { type: "plant", bulb: true } },
];

const plantApply = [
  c("Bix pulled up a weed. Long, thin threads hung down from the bottom. What were they?", "roots", ["petals", "seeds", "leaves"]),
  c("Bix planted a tulip in autumn. What did Bix put into the soil?", "a bulb", ["a petal", "a leaf", "a flower"]),
  c("A bee lands on the colourful part at the top of a plant. Where is the bee?", "on the flower", ["on the roots", "on the bulb", "under the soil"]),
  c("Bix's sunflower is very tall. Which part holds the big flower up high?", "stem", ["roots", "petals", "seeds"]),
  c("Bix found a small hard thing inside an apple. It could grow into a new tree. What is it?", "a seed", ["a petal", "a root", "a leaf"]),
];

const plantTyped = [
  typed("The flat green parts on a stem are called ___. Type the missing word.", "leaves"),
  typed("The coloured parts of a flower are called ___. Type the missing word.", "petals"),
  typed("A new plant can grow from a ___. Type the missing word.", "seed"),
];

/* ---------- Parts of a Tree ---------- */

const treePoint = (part, answer, wrong, hint, extra = {}) =>
  c("Which part of the tree is the arrow pointing to?", answer, wrong, { visual: { type: "tree", point: part, ...extra }, hint });

const treeParts = [
  treePoint("trunk", "trunk", ["leaves", "roots", "fruit"], "This is the thick, woody part."),
  treePoint("branch", "branch", ["roots", "trunk", "blossom"], "This grows out from the trunk."),
  treePoint("leaves", "leaves", ["roots", "trunk", "bark"], "These are green and grow on the branches."),
  treePoint("roots", "roots", ["branch", "leaves", "fruit"], "These grow under the ground."),
  treePoint("fruit", "fruit", ["roots", "trunk", "bark"], "Apples grow here.", { fruit: true }),
  treePoint("blossom", "blossom", ["roots", "trunk", "bark"], "These are the tree's flowers in spring.", { season: "spring" }),
];

const treeFacts = [
  c("What is the hard, rough outside of a tree trunk called?", "bark", ["petal", "fur", "leaf"]),
  c("Which part of a tree is thick and woody and holds the tree up?", "trunk", ["leaf", "blossom", "fruit"]),
  c("What grows out from the trunk and holds the leaves?", "branches", ["roots", "seeds", "bulbs"]),
  c("In spring, some trees are covered in pretty flowers. What are these flowers called?", "blossom", ["bark", "roots", "conkers"]),
  c("An apple tree grows apples. Apples are the tree's ___.", "fruit", ["roots", "bark", "trunk"]),
  c("Which part of a tree spreads out under the ground?", "roots", ["branches", "blossom", "leaves"]),
  c("A tree has roots, a trunk and leaves. Is a tree a plant?", "Yes", ["No"]),
];

const treePartSorts = [
  sorter("Sort the tree parts: above the ground or under the ground?", [["above", "Above the ground"], ["under", "Under the ground"]], [
    ["trunk", "above"], ["branches", "above"], ["leaves", "above"], ["blossom", "above"], ["fruit", "above"], ["roots", "under"],
  ]),
  sorter("Sort the words: part of a tree or not?", [["tree", "Part of a tree"], ["not", "Not part of a tree"]], [
    ["trunk", "tree"], ["branch", "tree"], ["bark", "tree"], ["roots", "tree"], ["leaf", "tree"],
    ["feather", "not"], ["fin", "not"], ["beak", "not"], ["paw", "not"],
  ]),
];

const spellTree = (answer, part, extra = {}) => ({
  ...spell(answer, undefined, undefined, "Make the name of the tree part the arrow points to."),
  visual: { type: "tree", point: part, ...extra },
});
const treePartSpell = [
  spellTree("trunk", "trunk"),
  spellTree("roots", "roots"),
  spellTree("fruit", "fruit", { fruit: true }),
  spellTree("leaves", "leaves"),
  spell("bark", "🪵", "the rough brown outside of a log", "The rough outside of a tree trunk is called ___. Make the word."),
];

const treePartOrder = [
  { type: "order", prompt: "Put the tree parts in order from the bottom to the top.", labels: ["roots", "trunk", "branches"], visual: { type: "tree" } },
  { type: "order", prompt: "Put the tree parts in order from the top to the bottom.", labels: ["branches", "trunk", "roots"], visual: { type: "tree" } },
];

const treePartApply = [
  c("Bix sees an oak tree in winter. Its branches are bare. Which part is missing?", "leaves", ["trunk", "roots", "branches"]),
  c("Bix picked a red apple from a branch. Which part of the tree did Bix pick?", "the fruit", ["the bark", "the roots", "the trunk"]),
  c("A strong wind blew, but the tree did not fall over. Which part holds it in the ground?", "roots", ["blossom", "leaves", "fruit"]),
  c("Bix touched the outside of the trunk. It felt rough and hard. What was Bix touching?", "bark", ["blossom", "leaves", "petals"]),
  c("In spring, a cherry tree is covered in pink flowers. What are these flowers called?", "blossom", ["bark", "roots", "trunk"]),
];

const treePartTyped = [
  typed("The thick, woody part of a tree is the ___. Type the missing word.", "trunk"),
  typed("The rough outside of a trunk is called ___. Type the missing word.", "bark"),
  typed("The parts of a tree under the ground are the ___. Type the missing word.", "roots"),
];

export const plantBuilders = {
  "wild-and-garden-plants": buildTopic({
    banks: { names: wildNames, sorts: wildSorts, match: wildMatch, spell: wildSpell, apply: wildApply, typed: wildTyped },
    levels: {
      1: ["names", "names", "names", "names", "names"],
      2: ["sorts", "names", "names", "sorts", "names"],
      3: ["match", "spell", "match", "spell", "match"],
      4: ["apply", "typed", "apply", "apply", "typed"],
    },
  }),
  "deciduous-and-evergreen-trees": buildTopic({
    banks: { kinds: treeKinds, names: treeNames, sorts: treeSorts, year: treeYear, spell: treeSpell, apply: treeApply, typed: treeTyped },
    levels: {
      1: ["kinds", "kinds", "kinds", "kinds", "kinds"],
      2: ["sorts", "names", "names", "sorts", "names"],
      3: ["year", "spell", "names", "year", "spell"],
      4: ["apply", "typed", "apply", "apply", "typed"],
    },
  }),
  "parts-of-a-flowering-plant": buildTopic({
    banks: { point: plantPoint, facts: plantFacts, sorts: plantSorts, spell: plantSpell, order: plantOrder, apply: plantApply, typed: plantTyped },
    levels: {
      1: ["point", "point", "point", "point", "point"],
      2: ["sorts", "facts", "facts", "sorts", "facts"],
      3: ["spell", "order", "spell", "order", "spell"],
      4: ["apply", "typed", "apply", "apply", "typed"],
    },
  }),
  "parts-of-a-tree": buildTopic({
    banks: { point: treeParts, facts: treeFacts, sorts: treePartSorts, spell: treePartSpell, order: treePartOrder, apply: treePartApply, typed: treePartTyped },
    levels: {
      1: ["point", "point", "point", "point", "point"],
      2: ["sorts", "facts", "facts", "sorts", "facts"],
      3: ["spell", "order", "spell", "order", "spell"],
      4: ["apply", "typed", "apply", "apply", "typed"],
    },
  }),
};
