import { buildTopic, c, sorter, spell, typed } from "../year1Science/engine.js";
import { extremeChart, valueChart } from "./charts.js";

// Year 2 Living things and their habitats (docs/curriculum/year-2-science.md).
// Every wrong option is chosen so it does NOT also fit the clue. Charts are
// Bix's own counts, never claims about every log or every walk.

/* ---------- Living Dead and Never Alive ---------- */

const ALIVE_RULE = "Living things grow, need water and air, and have young or make seeds. Dead things were once alive, or were once part of something alive. Never alive things were never part of anything alive.";
const ALIVE_BINS = [["living", "Living"], ["dead", "Dead"], ["never", "Never alive"]];
const ANSWER = { living: "living", dead: "dead", never: "never alive" };
const which = (thing, bin, extra = {}) => c(`Is ${thing} living, dead or never alive?`, ANSWER[bin], Object.values(ANSWER).filter((a) => a !== ANSWER[bin]), { rule: ALIVE_RULE, ...extra });

const aliveKinds = [
  which("a cat asleep on a chair", "living", { picture: "🐈", pictureLabel: "a cat" }),
  which("a rock", "never", { picture: "🪨", pictureLabel: "a grey rock" }),
  which("a dry brown leaf that fell off a tree", "dead", { picture: "🍂", pictureLabel: "dry brown leaves" }),
  which("a plastic bottle", "never"),
  which("an earthworm wriggling in the soil", "living", { picture: "🪱", pictureLabel: "a worm" }),
  which("an old bone", "dead", { picture: "🦴", pictureLabel: "a bone", hint: "A bone was once part of an animal." }),
  which("a metal key", "never", { picture: "🔑", pictureLabel: "a key" }),
  which("a daisy growing on the grass", "living", { picture: "🌼", pictureLabel: "a flower" }),
  which("a feather that fell off a bird", "dead", { picture: "🪶", pictureLabel: "a feather", hint: "A feather was once part of a living bird." }),
  which("a glass marble", "never"),
  which("a log that fell off a tree long ago", "dead", { picture: "🪵", pictureLabel: "a log" }),
];

const aliveSorts = [
  sorter("Sort them: living, dead or never alive?", ALIVE_BINS, [
    ["a rabbit", "living"], ["an oak tree", "living"], ["a snail", "living"], ["a bee", "living"],
    ["a dead leaf", "dead"], ["a bone", "dead"], ["a fallen log", "dead"], ["a wooden spoon", "dead"],
    ["a rock", "never"], ["a metal spoon", "never"], ["a plastic cup", "never"], ["a glass jar", "never"],
  ], { rule: ALIVE_RULE }),
  sorter("Sort the things from the park: living or never alive?", [["living", "Living"], ["never", "Never alive"]], [
    ["a duck", "living"], ["grass", "living"], ["a squirrel", "living"], ["a spider", "living"],
    ["a metal bench", "never"], ["a stone", "never"], ["a plastic slide", "never"], ["a puddle", "never"],
  ], { rule: ALIVE_RULE }),
  sorter("Sort them: dead or never alive?", [["dead", "Dead"], ["never", "Never alive"]], [
    ["a dry leaf", "dead"], ["a bone", "dead"], ["a feather from the ground", "dead"], ["a wooden table", "dead"], ["a paper bag", "dead"],
    ["a brick", "never"], ["a glass window", "never"], ["a metal coin", "never"], ["a plastic toy", "never"],
  ], { rule: ALIVE_RULE, hint: "Wood and paper come from trees, so they were once part of something alive." }),
];

const aliveFacts = [
  c("Which of these is living?", "a frog", ["a stone", "a bone", "a plastic duck"], { rule: ALIVE_RULE }),
  c("Which of these has never been alive?", "a metal spoon", ["a wooden spoon", "a dead leaf", "a feather"], { rule: ALIVE_RULE }),
  c("Which of these is dead?", "a fallen log", ["a growing tree", "a rock", "a glass bottle"], { rule: ALIVE_RULE }),
  c("A wooden table was made from a tree. What is the wood now?", "dead", ["living", "never alive"], { rule: ALIVE_RULE }),
  c("What do all living things do?", "grow", ["shine", "melt", "rust"]),
  c("A dead leaf and a rock are both not living. What is different about the leaf?", "It was once alive.", ["It has never been alive.", "It is still growing."]),
  c("Which of these needs water to stay alive?", "a sunflower", ["a toy car", "a brick", "a spoon"]),
];

const aliveTricky = [
  c("A flame flickers and gets bigger. Is a flame alive?", "No, a flame has never been alive.", ["Yes, a flame is living.", "A flame is dead."], { hint: "A flame does not eat or drink, and it cannot have young." }),
  c("An oak tree has no leaves in winter. Is it dead?", "No, it is still living.", ["Yes, it is dead.", "It has never been alive."], { hint: "Its new leaves will grow again in spring." }),
  c("A toy robot can move. Is it alive?", "No, it has never been alive.", ["Yes, it is living.", "It is dead."], { hint: "Moving is not enough. Does it grow, or need food and water?" }),
  c("A cloud moves and gets bigger. Is it alive?", "No, it has never been alive.", ["Yes, it is living.", "It is dead."], { hint: "A cloud is made of tiny drops of water. It cannot have young." }),
  c("A seed looks dry and still. If Bix plants it and waters it, it grows. Is the seed alive?", "Yes, it is living.", ["No, it is dead.", "It has never been alive."]),
  c("A paper bag is made from wood. Wood comes from trees. Which group does the paper bag go in?", "dead", ["living", "never alive"], { rule: ALIVE_RULE }),
];

const aliveSpell = [
  spell("alive", undefined, undefined, "Things that grow and have young are ___. Make the word."),
  spell("dead", undefined, undefined, "A leaf that fell off a tree long ago is ___. Make the word."),
  spell("never", undefined, undefined, "A rock has ___ been alive. Make the missing word."),
];

// Values are distinct, so "most" and "fewest" have one answer.
const WALK_SETS = [
  [["Living", 7], ["Dead", 5], ["Never alive", 3]], [["Living", 4], ["Dead", 9], ["Never alive", 6]],
  [["Living", 8], ["Dead", 2], ["Never alive", 5]], [["Living", 3], ["Dead", 6], ["Never alive", 10]],
];
const walkChart = (op) => extremeChart({ sets: WALK_SETS, unit: "things", op,
  prompt: (word) => `Bix sorted the things found on a nature walk. Which group had the ${word} things?` });

const aliveApply = [
  c("Bix finds a shell on the beach. A sea snail once lived inside it. Which group does the shell go in?", "dead", ["living", "never alive"], { rule: ALIVE_RULE }),
  c("Bix's goldfish swims, eats and grows. Which group is it in?", "living", ["dead", "never alive"]),
  c("Bix says, 'This pebble is dead.' Is Bix right?", "No, a pebble has never been alive.", ["Yes, the pebble is dead.", "No, the pebble is living."]),
  c("Bix finds a wooden fence. Was the wood ever alive?", "Yes, it came from a tree.", ["No, wood has never been alive.", "No, the fence is still growing."]),
  c("Bix's teddy bear is soft, but it does not eat, drink or grow. Is it living?", "No", ["Yes", "Only at night"]),
];

const aliveTyped = [
  typed("Things like rocks and glass go in the group called '___ alive'. Type the missing word.", "never"),
  typed("A dry leaf was once alive, but now it is ___. Type the missing word.", "dead"),
  typed("A frog, a tree and you are all ___. Type the missing word.", "living"),
];

/* ---------- Habitats ---------- */

const HABITAT_RULE = "A habitat is the place where a plant or animal lives. It gives them the food, water and shelter they need.";
const home = (prompt, answer, wrong, extra = {}) => c(prompt, answer, wrong, { rule: HABITAT_RULE, ...extra });

const habitatNames = [
  home("Which animal lives in the ocean?", "a whale", ["a squirrel", "a camel", "a badger"]),
  home("Which animal lives in a woodland?", "a badger", ["a shark", "a camel", "a crab"]),
  home("Which animal lives on the seashore?", "a crab", ["a squirrel", "a camel", "a toucan"]),
  home("Which animal lives in the rainforest?", "a toucan", ["a polar bear", "a camel", "a crab"], { hint: "A rainforest is hot and wet, with lots of tall trees." }),
  home("Which animal lives in a hot, dry desert?", "a camel", ["a whale", "a frog", "a polar bear"]),
  home("Which animal lives in the icy Arctic?", "a polar bear", ["a camel", "a toucan", "a frog"]),
  home("Which animal lives in a pond?", "a frog", ["a camel", "a polar bear", "a shark"]),
  home("Where does a red squirrel live?", "in a woodland", ["in the ocean", "in the desert", "on the seashore"]),
  home("Which plant grows in a pond?", "a water lily", ["a cactus", "a palm tree", "seaweed"]),
  home("Where does a shark live?", "in the ocean", ["in a woodland", "in a pond", "in the desert"]),
  home("Where does a sloth live?", "in the rainforest", ["in the Arctic", "in the ocean", "in a pond"], { hint: "A sloth hangs in tall trees where it is hot and wet." }),
];

const habitatSorts = [
  sorter("Where do they live: ocean or woodland?", [["ocean", "Ocean"], ["wood", "Woodland"]], [
    ["whale", "ocean"], ["shark", "ocean"], ["octopus", "ocean"], ["jellyfish", "ocean"],
    ["squirrel", "wood"], ["badger", "wood"], ["owl", "wood"], ["woodpecker", "wood"],
  ], { rule: HABITAT_RULE }),
  sorter("Where do they live: desert or the icy Arctic?", [["desert", "Desert"], ["arctic", "Arctic"]], [
    ["camel", "desert"], ["cactus", "desert"], ["scorpion", "desert"],
    ["polar bear", "arctic"], ["snowy owl", "arctic"], ["walrus", "arctic"],
  ], { rule: HABITAT_RULE }),
  sorter("Where do they live: seashore, pond or rainforest?", [["shore", "Seashore"], ["pond", "Pond"], ["rain", "Rainforest"]], [
    ["crab", "shore"], ["limpet", "shore"], ["moorhen", "pond"], ["water lily", "pond"], ["newt", "pond"], ["toucan", "rain"], ["sloth", "rain"],
  ], { rule: HABITAT_RULE }),
];

const habitatSuited = [
  c("A polar bear has thick fur and a layer of fat. How does this suit the Arctic?", "It keeps the bear warm in the cold.", ["It keeps the bear cool in the sun.", "It helps the bear climb trees."]),
  c("A camel can go for days without a drink. Which habitat is it suited to?", "the desert", ["the ocean", "a pond", "the Arctic"]),
  c("A fish has fins and gills. Which habitat is it suited to?", "water", ["a desert", "a tree", "a field"]),
  c("A cactus stores water in its thick stem. Which habitat is it suited to?", "a hot, dry desert", ["a pond", "the icy Arctic", "the ocean"]),
  c("A woodpecker has a strong beak for pecking holes in trees. Where does it live?", "in a woodland", ["in the ocean", "in the desert", "on the seashore"]),
  c("A frog can swim in water and hop on land. Which habitat suits it?", "a pond", ["a desert", "the icy Arctic", "the deep ocean"]),
  c("A crab has a hard shell. It hides under rocks and seaweed when the sea goes out. Where does it live?", "on the seashore", ["in a woodland", "in the desert", "in the Arctic"]),
];

const habitatNeeds = [
  c("How does a woodland give a squirrel what it needs?", "Trees give it nuts to eat and a place for its nest.", ["It is hot and dry, with no trees.", "It is full of salty sea water."]),
  c("How do trees help birds?", "Birds can build nests in them.", ["Trees give birds fur.", "Trees teach birds to sing."]),
  c("A pond gives a duck what it needs. Which of these does a pond give a duck?", "water to swim in and food to eat", ["sand and cactus plants", "ice and snow all year"]),
  c("Bees visit flowers for food. How do bees help the flowers?", "They carry a yellow dust from flower to flower, which helps the flowers make seeds.", ["They water the flowers.", "They keep the flowers warm at night."]),
  c("A water lily lives in a pond. What does the pond give it?", "water all around it", ["hot sand", "ice and snow"]),
  c("Rabbits eat grass in a field. What does the field give the rabbits?", "food", ["fur", "feathers", "shells"]),
  c("Plants and animals in a habitat depend on each other. What does that mean?", "They need each other to live.", ["They never meet.", "They all eat the same food."]),
];

const habitatSpell = [
  spell("habitat", undefined, undefined, "The place where a plant or animal lives is its ___. Make the word."),
  spell("pond", "🐸", "a frog by some water", "Frogs and newts live in this small area of fresh water. Make the word."),
  spell("ocean", "🐋", "a whale in the sea", "Whales and sharks live in this huge area of salty water. Make the word."),
];

const habitatApply = [
  c("Bix wants to see crabs and limpets. Where should Bix go?", "the seashore", ["a woodland", "a desert", "a field"]),
  c("Why can a fish not live on dry land?", "It needs water. Water is its habitat.", ["Fish like to sunbathe.", "Fish live in trees."]),
  c("Bix wants to watch owls and badgers at night. Which habitat should Bix visit?", "a woodland", ["the ocean", "a desert", "the seashore"]),
  c("A woodland is cut down. Why is this bad for the squirrels?", "They lose their food and their homes.", ["They get more nuts.", "Nothing changes for them."]),
  c("Bix saw a polar bear on a hot sandy beach in a cartoon. Why is this wrong?", "Polar bears live in the icy Arctic.", ["Polar bears live in the desert.", "Polar bears live in ponds."]),
];

const habitatTyped = [
  typed("What is the science word for the place where a plant or animal lives? It begins with h-a-b. Type the whole word.", "habitat"),
  typed("Camels and cactuses live in the hot, dry ___. Type the missing word.", "desert"),
  typed("Polar bears live in the icy ___. Type the missing word.", "arctic"),
];

/* ---------- Micro-habitats ---------- */

const MICRO_RULE = "A micro-habitat is a very small habitat where minibeasts can hide.";

const microNames = [
  c("Which is a micro-habitat?", "under a log", ["a whole forest", "the ocean", "a desert"], { rule: MICRO_RULE }),
  c("Which is a micro-habitat?", "under a stone", ["the Arctic", "a rainforest", "the seashore"], { rule: MICRO_RULE }),
  c("Bix lifts a log. What is it like underneath?", "dark and damp", ["hot and dry", "bright and sunny"], { hint: "The log keeps the sun and wind off the ground." }),
  c("This minibeast has a shell on its back and leaves a shiny trail. What is it?", "a snail", ["a spider", "an ant", "a ladybird"], { picture: "🐌", pictureLabel: "a minibeast with a shell" }),
  c("This minibeast spins a web between the branches of a bush. What is it?", "a spider", ["a worm", "a snail", "a slug"], { picture: "🕸️", pictureLabel: "a web" }),
  c("This minibeast is red with black spots. It lives on leaves. What is it?", "a ladybird", ["a worm", "a woodlouse", "a slug"], { picture: "🐞", pictureLabel: "a red beetle with spots" }),
  c("This small, soft green plant grows on old logs and walls in damp places. What is it?", "moss", ["a cactus", "a sunflower", "an oak tree"], { rule: MICRO_RULE }),
  c("This minibeast has no legs. It lives in the soil. What is it?", "a worm", ["a spider", "a ladybird", "an ant"], { picture: "🪱", pictureLabel: "a long, thin minibeast" }),
  c("This grey minibeast has lots of legs and a hard back. It curls into a ball. What is it?", "a woodlouse", ["a worm", "a snail", "a ladybird"]),
];

const microConditions = [
  c("Why do woodlice hide under logs?", "They need dark, damp places.", ["They like hot, dry places.", "They want to sunbathe."]),
  c("A stony path is dry and sunny. Bix finds very few minibeasts there. Why?", "Most minibeasts need damp, shady places.", ["Minibeasts cannot walk on stones.", "Minibeasts only live in the sea."]),
  c("Why might a snail hide under leaves on a hot day?", "To stay cool and damp.", ["To get warm in the sun.", "To find some sand."]),
  c("What does a log give the minibeasts that live under it?", "shelter and food", ["sunshine and sand", "ice and snow"], { hint: "Some minibeasts eat the rotting wood." }),
  c("Moss grows on an old log. What kind of place does moss like?", "damp and shady", ["hot and dry", "salty and windy"]),
];

const microSorts = [
  sorter("Sort the places: damp and shady, or dry and sunny?", [["damp", "Damp and shady"], ["dry", "Dry and sunny"]], [
    ["under a log", "damp"], ["under a stone", "damp"], ["in a pile of leaves", "damp"], ["under a plant pot", "damp"],
    ["on a stony path", "dry"], ["on a sunny wall", "dry"], ["on a sunny playground", "dry"],
  ], { rule: MICRO_RULE }),
  sorter("Sort them: minibeast or plant?", [["animal", "Minibeast"], ["plant", "Plant"]], [
    ["woodlouse", "animal"], ["centipede", "animal"], ["snail", "animal"], ["ant", "animal"],
    ["moss", "plant"], ["grass", "plant"], ["ivy", "plant"], ["nettle", "plant"],
  ]),
  sorter("Where would you look? Under a log, or in a bush?", [["log", "Under a log"], ["bush", "In a bush"]], [
    ["woodlouse", "log"], ["centipede", "log"], ["slug", "log"],
    ["spider's web", "bush"], ["bird's nest", "bush"], ["blackberries", "bush"],
  ], { rule: MICRO_RULE }),
];

const microSpell = [
  spell("log", "🪵", "a log", "Woodlice hide under this. Make the word."),
  spell("damp", undefined, undefined, "A little bit wet is ___. Make the word."),
  spell("snail", "🐌", "a minibeast with a shell", "Make the name of this minibeast."),
];

// Bix's own counts on one afternoon. Values are distinct and no more than 10.
const MINI_SETS = [
  [["under a log", 10], ["in long grass", 6], ["under a bush", 8], ["on a stony path", 1]],
  [["under a stone", 9], ["in a pile of leaves", 7], ["on a sunny wall", 2], ["in long grass", 5]],
  [["under a log", 10], ["on a sunny playground", 0], ["under a bush", 7], ["in a pile of leaves", 4]],
];
const miniChart = (op) => op === "value"
  ? valueChart({ sets: MINI_SETS, unit: "minibeasts", prompt: (label) => `Bix counted the minibeasts in each place. How many did Bix find ${label}?` })
  : extremeChart({ sets: MINI_SETS, unit: "minibeasts", op, prompt: (word) => `Bix counted the minibeasts in each place. Where did Bix find the ${word}?` });

const microApply = [
  c("Bix wants to find woodlice. Where should Bix look?", "under a log", ["on a sunny path", "on a window", "on a slide"]),
  c("Bix finds a centipede under a stone. What should Bix do after looking?", "Put the stone back gently.", ["Take the centipede home.", "Leave the stone off so the ground dries out."], { hint: "The dark, damp place under the stone is the centipede's home." }),
  c("Bix wants to find a spider. Where is a good place to look?", "in a bush with webs", ["at the bottom of a pond", "in a sandpit", "in the fridge"]),
  c("Bix made a log pile in the school garden. Why?", "To give minibeasts a damp, shady home.", ["To make the garden hotter.", "To keep the birds dry."]),
];

const microTyped = [
  typed("Bix spots a shiny trail on the path. It leads to a minibeast with a shell. Type its name.", "snail"),
  typed("Bix sees a web in a bush. Which eight-legged minibeast made it? Type its name.", "spider"),
  typed("This grey minibeast has lots of legs and curls into a ball. Type its name.", "woodlouse"),
];

/* ---------- Simple Food Chains ---------- */

const CHAIN_RULE = "In a food chain, the arrow means 'is eaten by'. Every food chain starts with a plant.";
// Every link needs a picture in Year2ScienceVisual's ICONS (the component test checks).
const CHAINS = [
  ["grass", "rabbit", "fox"],
  ["grass", "cow", "human"],
  ["lettuce", "snail", "thrush"],
  ["leaves", "caterpillar", "blue tit"],
  ["seeds", "mouse", "owl"],
  ["grass", "grasshopper", "frog"],
];
// One gap per chain, so a run never shows the answer to one gap in another.
// Wrong options are hand-picked per gap: none of them could sit in that place.
const gapQuestion = (links, gap, wrong) => c("What is missing from this food chain?", links[gap], wrong, {
  rule: CHAIN_RULE, visual: { type: "chain", links, gap },
  hint: gap === 0 ? "A food chain always starts with a plant." : `What eats the ${links[gap - 1]}?`,
});
const chainGaps = [
  gapQuestion(CHAINS[0], 1, ["owl", "oak tree", "rock"]),
  { ...gapQuestion(CHAINS[1], 2, ["grass", "leaves", "seeds"]), hint: "People get food, like milk, from cows." },
  gapQuestion(CHAINS[2], 0, ["thrush", "fox", "stone"]),
  gapQuestion(CHAINS[3], 2, ["leaves", "grass", "slug"]),
  gapQuestion(CHAINS[4], 1, ["owl", "fox", "stone"]),
  gapQuestion(CHAINS[5], 2, ["grass", "lettuce", "seeds"]),
];

const chainRead = [
  c("Look at the food chain. What does the rabbit eat?", "grass", ["fox", "nothing"], { rule: CHAIN_RULE, visual: { type: "chain", links: CHAINS[0] } }),
  c("Look at the food chain. What eats the snail?", "thrush", ["lettuce", "nothing"], { rule: CHAIN_RULE, visual: { type: "chain", links: CHAINS[2] } }),
  c("Look at the food chain. What eats the caterpillar?", "blue tit", ["leaves", "nothing"], { rule: CHAIN_RULE, visual: { type: "chain", links: CHAINS[3] } }),
  c("Look at the food chain. What does the mouse eat?", "seeds", ["owl", "nothing"], { rule: CHAIN_RULE, visual: { type: "chain", links: CHAINS[4] } }),
  c("Look at the food chain. What does the frog eat?", "grasshopper", ["grass", "nothing"], { rule: CHAIN_RULE, visual: { type: "chain", links: CHAINS[5] } }),
  c("In a food chain, what does the arrow mean?", "is eaten by", ["is bigger than", "lives next to", "is the baby of"]),
  c("What is at the start of every food chain?", "a plant", ["a fox", "a rock", "an owl"]),
];

const chainSorts = [
  sorter("Sort them: plant or animal?", [["plant", "Plant"], ["animal", "Animal"]], [
    ["grass", "plant"], ["lettuce", "plant"], ["oak leaves", "plant"], ["seeds", "plant"],
    ["rabbit", "animal"], ["fox", "animal"], ["snail", "animal"], ["owl", "animal"],
  ], { hint: "Every food chain starts with something from a plant." }),
  sorter("Sort them: does it eat plants, or other animals?", [["plants", "Eats plants"], ["animals", "Eats other animals"]], [
    ["rabbit", "plants"], ["caterpillar", "plants"], ["cow", "plants"], ["snail", "plants"],
    ["fox", "animals"], ["owl", "animals"], ["heron", "animals"],
  ], { rule: CHAIN_RULE }),
];

const order = (labels, extra = {}) => ({ type: "order", prompt: "Put the food chain in order. Start with the plant.", labels, rule: CHAIN_RULE, ...extra });
const chainOrders = [
  order(["grass", "rabbit", "fox"]),
  order(["lettuce", "snail", "thrush"]),
  order(["seeds", "mouse", "owl"]),
  order(["leaves", "caterpillar", "blue tit", "sparrowhawk"], { hint: "A sparrowhawk is a bird that eats smaller birds." }),
  order(["grass", "grasshopper", "frog", "heron"], { hint: "A heron is a tall bird that catches frogs." }),
  order(["leaves", "slug", "hedgehog"]),
];

const chainApply = [
  c("A cow eats grass. People get food from cows, like milk. Which food chain shows this?", "grass → cow → human", ["human → cow → grass", "cow → grass → human"]),
  c("In the chain grass → rabbit → fox, all the grass dies. What happens to the rabbits?", "They have less food.", ["They have more food.", "Nothing happens to them."]),
  c("Bix writes: fox → rabbit → grass. What is wrong?", "It should start with the plant.", ["Foxes do not eat.", "It needs more animals."], { rule: CHAIN_RULE }),
  c("A thrush eats snails. Snails eat lettuce. Which is the plant in this food chain?", "lettuce", ["thrush", "snail"]),
  c("In leaves → caterpillar → blue tit, which animal eats the caterpillar?", "blue tit", ["leaves", "snail", "fox"]),
];

const chainTyped = [
  typed("Every food chain starts with a ___, like grass or lettuce. Type the missing word.", "plant"),
  typed("A rabbit eats grass. A fox eats the rabbit. Which animal is at the end of the chain? Type it.", "fox"),
  typed("In a food chain, the arrow means 'is ___ by'. Type the missing word.", "eaten"),
];

/* ---------- Where Food Comes From ---------- */

const FOOD_RULE = "Some food comes from plants, like fruit, vegetables and wheat. Some food comes from animals, like milk, eggs, honey and meat.";

const foodSources = [
  c("Where does the milk we drink usually come from?", "cows", ["hens", "bees", "pigs"], { picture: "🥛", pictureLabel: "a glass of milk" }),
  c("Where do the eggs we eat usually come from?", "hens", ["cows", "pigs", "bees"], { picture: "🥚", pictureLabel: "an egg" }),
  c("Which animal makes honey?", "bees", ["cows", "hens", "sheep"], { picture: "🍯", pictureLabel: "a pot of honey" }),
  c("Cheese is made from ___.", "milk", ["eggs", "honey", "potatoes"], { picture: "🧀", pictureLabel: "cheese" }),
  c("Chips are made from ___.", "potatoes", ["apples", "milk", "carrots"], { picture: "🍟", pictureLabel: "chips" }),
  c("Bread is made from flour. Flour comes from ___.", "wheat", ["milk", "eggs", "honey"], { picture: "🍞", pictureLabel: "a loaf of bread" }),
  c("Fish fingers are made from ___.", "fish", ["hens", "wheat", "apples"], { picture: "🐟", pictureLabel: "a fish" }),
  c("Jam is made from ___.", "fruit", ["milk", "eggs", "potatoes"]),
  c("Butter is made from ___.", "milk", ["eggs", "wheat", "honey"], { picture: "🧈", pictureLabel: "butter" }),
  c("Popcorn comes from a plant called ___.", "maize", ["wheat", "potato", "apple"], { picture: "🍿", pictureLabel: "popcorn", hint: "It is also called corn." }),
];

const foodSorts = [
  sorter("Sort the foods: from a plant or from an animal?", [["plant", "From a plant"], ["animal", "From an animal"]], [
    ["apple", "plant"], ["carrot", "plant"], ["rice", "plant"], ["peas", "plant"], ["potato", "plant"],
    ["milk", "animal"], ["egg", "animal"], ["honey", "animal"], ["cheese", "animal"], ["yoghurt", "animal"],
  ], { rule: FOOD_RULE }),
  sorter("Where does each food come from: a cow, a chicken or a plant?", [["cow", "Cow"], ["chicken", "Chicken"], ["plant", "Plant"]], [
    ["milk", "cow"], ["butter", "cow"], ["cream", "cow"], ["egg", "chicken"], ["roast chicken", "chicken"],
    ["bread", "plant"], ["banana", "plant"], ["carrot", "plant"],
  ]),
  sorter("Where does it grow: on a tree, or under the ground?", [["tree", "On a tree"], ["ground", "Under the ground"]], [
    ["apple", "tree"], ["pear", "tree"], ["orange", "tree"], ["cherry", "tree"],
    ["potato", "ground"], ["carrot", "ground"], ["parsnip", "ground"],
  ], { rule: FOOD_RULE }),
];

const foodOrders = [
  { type: "order", prompt: "How does bread get to your plate? Put it in order.", labels: ["wheat grows in a field", "the wheat is made into flour", "the flour is baked into bread"] },
  { type: "order", prompt: "How is cheese made? Put it in order.", labels: ["a cow eats grass", "the cow makes milk", "the milk is made into cheese"] },
  { type: "order", prompt: "How do chips get to your plate? Put it in order.", labels: ["potatoes grow in the ground", "the potatoes are dug up", "the potatoes are cut and cooked"] },
  { type: "order", prompt: "How does honey get to your toast? Put it in order.", labels: ["bees visit flowers", "bees make honey in the hive", "the honey goes in a jar"] },
  { type: "order", prompt: "How does milk get to your fridge? Put it in order.", labels: ["a cow eats grass", "the cow is milked", "the milk goes into bottles"] },
  { type: "order", prompt: "How is apple juice made? Put it in order.", labels: ["apples grow on a tree", "the apples are picked", "the apples are squeezed into juice"] },
];

const foodSpell = [
  spell("milk", "🥛", "a glass of milk", "Cows make this. We drink it. Make the word."),
  spell("egg", "🥚", "an egg", "A hen lays this. Make the word."),
  spell("wheat", undefined, undefined, "Flour for bread is made from this plant. Make the word."),
];

const foodApply = [
  c("Bix's lunch is a cheese sandwich. Which part came from an animal?", "the cheese", ["the bread", "neither part"], { rule: FOOD_RULE }),
  c("Bix has a bowl of rice and peas. Where did it come from?", "plants", ["animals", "rocks"]),
  c("Bix eats a boiled egg for breakfast. Which animal laid it?", "a hen", ["a cow", "a pig", "a bee"]),
  c("Which breakfast comes only from plants?", "toast with jam", ["a boiled egg", "a glass of milk"], { rule: FOOD_RULE }),
  c("Bix wants to visit the place where milk comes from. Where should Bix go?", "a dairy farm with cows", ["a beehive", "a wheat field"]),
];

const foodTyped = [
  typed("Honey is made by busy insects called ___. Type the missing word.", "bees"),
  typed("Cheese and yoghurt are both made from ___. Type the missing word.", "milk"),
  typed("Flour is made from a plant called ___. Type the missing word.", "wheat"),
];

export const livingBuilders = {
  "living-dead-and-never-alive": buildTopic({
    banks: { kinds: aliveKinds, sorts: aliveSorts, facts: aliveFacts, tricky: aliveTricky, spell: aliveSpell, charts: [walkChart("most"), walkChart("least")], apply: aliveApply, typed: aliveTyped },
    levels: {
      1: ["kinds", "kinds", "kinds", "kinds", "kinds"],
      2: ["sorts", "facts", "facts", "sorts", "facts"],
      3: ["tricky", "spell", "tricky", "sorts", "tricky"],
      4: ["apply", "typed", "charts", "apply", "apply"],
    },
  }),
  habitats: buildTopic({
    banks: { names: habitatNames, sorts: habitatSorts, suited: habitatSuited, needs: habitatNeeds, spell: habitatSpell, apply: habitatApply, typed: habitatTyped },
    levels: {
      1: ["names", "names", "names", "names", "names"],
      2: ["sorts", "suited", "suited", "sorts", "suited"],
      3: ["needs", "spell", "needs", "sorts", "needs"],
      4: ["apply", "typed", "apply", "apply", "typed"],
    },
  }),
  "micro-habitats": buildTopic({
    banks: { names: microNames, why: microConditions, sorts: microSorts, spell: microSpell, charts: [miniChart("most"), miniChart("least"), miniChart("value")], apply: microApply, typed: microTyped },
    levels: {
      1: ["names", "names", "names", "names", "names"],
      2: ["sorts", "why", "why", "sorts", "why"],
      3: ["why", "spell", "charts", "names", "why"],
      4: ["apply", "typed", "charts", "apply", "typed"],
    },
  }),
  "simple-food-chains": buildTopic({
    banks: { read: chainRead, gaps: chainGaps, sorts: chainSorts, orders: chainOrders, apply: chainApply, typed: chainTyped },
    levels: {
      1: ["read", "read", "read", "read", "read"],
      2: ["sorts", "gaps", "gaps", "gaps", "gaps"],
      3: ["orders", "sorts", "orders", "orders", "sorts"],
      4: ["apply", "typed", "apply", "apply", "typed"],
    },
  }),
  "where-food-comes-from": buildTopic({
    banks: { sources: foodSources, sorts: foodSorts, orders: foodOrders, spell: foodSpell, apply: foodApply, typed: foodTyped },
    levels: {
      1: ["sources", "sources", "sources", "sources", "sources"],
      2: ["sorts", "sources", "sources", "sorts", "sources"],
      3: ["orders", "spell", "orders", "spell", "orders"],
      4: ["apply", "typed", "apply", "apply", "typed"],
    },
  }),
};
