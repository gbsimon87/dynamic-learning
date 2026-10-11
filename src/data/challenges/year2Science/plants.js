import { buildTopic, c, sorter, spell, typed } from "../year1Science/engine.js";
import { extremeChart, valueChart } from "./charts.js";

// Year 2 Plants (docs/curriculum/year-2-science.md). The guidance note is
// followed exactly: seeds and bulbs need water to grow but most do not need
// light, because they have a store of food inside them. Plants growing in
// the dark turn pale; plants without water droop. Test results are Bix's own.

/* ---------- Seeds and Bulbs ---------- */

const SEED_RULE = "Seeds and bulbs can grow into new plants. They have a store of food inside them.";

const seedNames = [
  c("An acorn is the seed of which tree?", "oak", ["holly", "pine", "apple tree"], { rule: SEED_RULE }),
  c("A conker is the seed of which tree?", "horse chestnut", ["oak", "holly", "fir"], { rule: SEED_RULE }),
  c("Which plant grows from a bulb?", "tulip", ["sunflower", "oak tree", "bean plant"], { rule: SEED_RULE }),
  c("Which of these do we plant as a seed, not a bulb?", "sunflower", ["tulip", "daffodil", "snowdrop"], { rule: SEED_RULE, hint: "Tulips, daffodils and snowdrops are planted as bulbs." }),
  c("Bix cuts an apple in half. What are the small dark seeds called?", "pips", ["bulbs", "petals", "roots"]),
  c("What is inside a seed that helps the new plant start to grow?", "a store of food", ["a tiny animal", "a drop of paint", "a stone"]),
  c("An onion is a bulb. What can it grow into if you plant it?", "a new onion plant", ["a tree", "a carrot", "a seed packet"], { rule: SEED_RULE }),
  c("Daffodils grow from these. They look a bit like onions. What are they?", "bulbs", ["seeds", "pips", "conkers"]),
];

const seedSorts = [
  sorter("Sort them: seed or bulb?", [["seed", "Seed"], ["bulb", "Bulb"]], [
    ["acorn", "seed"], ["conker", "seed"], ["bean", "seed"], ["pea", "seed"], ["apple pip", "seed"],
    ["onion", "bulb"], ["garlic", "bulb"], ["shallot", "bulb"], ["tulip bulb", "bulb"],
  ], { rule: SEED_RULE }),
  sorter("Sort them: can it grow into a new plant?", [["yes", "Can grow"], ["no", "Cannot grow"]], [
    ["bean", "yes"], ["acorn", "yes"], ["tulip bulb", "yes"], ["sunflower seed", "yes"],
    ["pebble", "no"], ["button", "no"], ["marble", "no"], ["coin", "no"],
  ]),
  sorter("Sort the plants: grows from a seed, or from a bulb?", [["seed", "Grows from a seed"], ["bulb", "Grows from a bulb"]], [
    ["bean plant", "seed"], ["oak tree", "seed"], ["sunflower", "seed"],
    ["tulip", "bulb"], ["daffodil", "bulb"], ["snowdrop", "bulb"],
  ], { rule: SEED_RULE }),
];

const seedNeeds = [
  c("What does a seed need to start growing?", "water", ["sugar", "paint", "salt"]),
  c("Bix keeps a bean in a dry, sealed packet for a year. Why does it not grow?", "It has no water.", ["It has too much water.", "It is not a seed."]),
  c("Bix plants seeds in a dark cupboard and waters them. They still start to grow. Why?", "Seeds have a store of food inside them.", ["Seeds can see in the dark.", "Cupboards are full of light."]),
  c("Do most seeds need light to start growing?", "No, but they need water.", ["Yes, they need bright light.", "No, they do not need anything."]),
  c("Which place would help a seed start to grow?", "warm, damp soil", ["a freezer", "a dry, empty jar", "a dry pile of sand"]),
  c("What does 'germinate' mean?", "start to grow", ["melt", "freeze", "fall asleep"]),
  c("Bix plants bean seeds in a freezer and waters them. Why do they not grow?", "It is too cold.", ["It is too light.", "They have too much food."]),
];

const seedSpell = [
  spell("seed", "🫘", "beans", "A bean is a ___. Make the word."),
  spell("bulb", "🧅", "an onion", "An onion is a ___. Make the word."),
  spell("acorn", undefined, undefined, "The seed of an oak tree is called an ___. Make the word."),
];

const seedApply = [
  c("Bix wants tulips in the spring garden. What should Bix plant in the autumn?", "tulip bulbs", ["tulip petals", "tulip leaves", "pebbles"]),
  c("Bix finds an acorn under a tree. If Bix plants it, what could it grow into?", "an oak tree", ["a pine tree", "a tulip", "a sunflower"]),
  c("Bix forgot to water the seeds in a pot. After two weeks nothing has grown. What is the best thing to do?", "Water them and wait.", ["Put them in the freezer.", "Paint the pot."]),
  c("Bix cuts open a bean seed and finds a tiny plant and a store of food. What is the food for?", "to help the tiny plant start growing", ["to feed birds in winter", "to make the seed heavy"]),
  c("An onion left in a dark kitchen cupboard starts to grow a shoot. Why can it grow there?", "It has a store of food inside.", ["The cupboard gives it food.", "It is not really growing."]),
];

const seedTyped = [
  typed("An onion is not a seed. It is a ___. Type the missing word.", "bulb"),
  typed("An acorn is the seed of an ___ tree. Type the missing word.", "oak"),
  typed("Seeds need ___ to start growing. Type the missing word. It starts with w.", "water"),
];

/* ---------- From Seed to Plant ---------- */

const GROW_RULE = "First a seed. Then a sprouting seed, with a root and a shoot. Then a seedling, a young plant. Then a mature plant, grown up with flowers.";
const STAGES = ["a seed", "a sprouting seed", "a seedling", "a mature plant"];
const stage = (n, hint) => c("Look at the picture. What stage is this plant at?", STAGES[n], STAGES.filter((_, i) => i !== n), { rule: GROW_RULE, visual: { type: "growth", stage: n }, hint });

const growStages = [
  stage(0, "Nothing has come out of it yet."),
  stage(1, "A tiny root and shoot are just coming out."),
  stage(2, "It is a young plant with its first leaves."),
  stage(3, "It is grown up and has a flower."),
];

const growFacts = [
  c("When a bean seed starts to grow, which part comes out first?", "the root", ["the shoot", "the flower", "the leaves"]),
  c("Which way does a root grow?", "down into the soil", ["up towards the sky", "sideways out of the pot"]),
  c("Which way does a shoot grow?", "up towards the light", ["down into the soil", "round in circles"]),
  c("What is a very young plant called?", "a seedling", ["a bulb", "a pip", "a petal"]),
  c("What do the flowers of a mature plant make?", "new seeds", ["new soil", "stones", "rain"]),
  c("A tulip bulb grows roots. What grows up out of the bulb next?", "a shoot", ["a seed", "a pip", "a conker"]),
];

const growOrders = [
  { type: "order", prompt: "Put the bean's life in order.", labels: ["seed", "sprouting seed", "seedling", "mature plant"] },
  { type: "order", prompt: "Put what happens to a bean seed in order.", labels: ["the root grows down", "the shoot grows up", "the first leaves open", "a flower opens"] },
  { type: "order", prompt: "Put what happens to a tulip bulb in order.", labels: ["the bulb is planted", "roots grow down", "a shoot pushes up", "a flower opens"] },
  { type: "order", prompt: "Put the sunflower's year in order.", labels: ["plant the seed", "a seedling grows", "a tall plant with a flower", "the flower makes new seeds"] },
];

const growSpell = [
  { ...spell("root", undefined, undefined, "This part grows down from the seed into the soil. Make the word."), rule: GROW_RULE },
  { ...spell("shoot", undefined, undefined, "This part grows up from the seed towards the light. Make the word."), rule: GROW_RULE },
  spell("flower", "🌻", "a sunflower", "The colourful part of a mature plant that makes new seeds is the ___. Make the word."),
];

// Bix's bean, measured each week. Values grow, are distinct and stay within 10.
const BEAN_SETS = [[1, 3, 6, 10], [2, 4, 7, 9], [1, 4, 6, 8]].map((set) => set.map((value, i) => [`Week ${i + 1}`, value]));
const beanChart = valueChart({ sets: BEAN_SETS, unit: "cm", prompt: (label) => `Bix measured a bean plant every week. How tall was it in ${label}?` });
const growthNumber = (start, end) => ({
  type: "number", prompt: `Bix's sunflower was ${start} cm tall. A week later it was ${end} cm tall. How many centimetres did it grow?`,
  answer: end - start, hint: `Count on from ${start} to ${end}.`,
});

const growApply = [
  c("Bix's bean has a root and a shoot but no leaves yet. What should Bix call it?", "a sprouting seed", ["a mature plant", "a bulb"], { rule: GROW_RULE }),
  c("Bix's sunflower is very tall and has a big yellow flower. What stage is it at?", "a mature plant", ["a seed", "a seedling"]),
  c("Bix wants more sunflowers next year. What can Bix collect from this year's flower?", "its seeds", ["its stem", "its roots"]),
  c("Bix planted a sunflower seed. What will Bix see first above the soil?", "a green shoot", ["a big yellow flower", "new seeds"], { rule: GROW_RULE }),
  beanChart,
];

const growTyped = [
  typed("A very young plant is called a ___. Type the missing word.", "seedling"),
  growthNumber(12, 19),
  growthNumber(25, 34),
];

/* ---------- What Plants Need to Grow ---------- */

const NEED_RULE = "Plants need water, light and the right temperature (not too hot and not too cold) to grow and stay healthy.";
const STATE_WORDS = { pale: "pale and yellow", droopy: "droopy and dry" };

/** Two plants after a test. `sick` is how the plant that missed out looks. */
const potPair = (prompt, sick, askHealthy = false) => (rng) => {
  const sickFirst = rng() < 0.5;
  const sickName = sickFirst ? "Plant A" : "Plant B";
  const healthyName = sickFirst ? "Plant B" : "Plant A";
  return c(prompt, askHealthy ? healthyName : sickName, [askHealthy ? sickName : healthyName], {
    rule: NEED_RULE, visual: { type: "pots", plants: sickFirst ? [sick, "healthy"] : ["healthy", sick] },
    hint: askHealthy ? "A healthy plant is green and stands up straight." : `Look for the plant that is ${STATE_WORDS[sick]}.`,
  });
};

const needFacts = [
  c("What do plants need to grow and stay healthy?", "water, light and warmth", ["sweets, toys and music", "salt, ice and darkness"]),
  c("A plant gets no water for two weeks. What happens to it?", "It droops and dries out.", ["It grows faster.", "It turns into a seed."]),
  c("A plant is kept in a dark cupboard for two weeks. What happens to its leaves?", "They turn pale and yellow.", ["They turn bright green.", "They grow flowers."]),
  c("A plant is left outside on a frosty night. What could happen?", "The cold could damage it.", ["It will grow faster.", "It will turn into a tree."]),
  c("Bix leaves a pot plant in a hot car all day. What could happen?", "It could dry out and droop.", ["It will grow a flower.", "It will turn into a seed."]),
  c("Why do people put pot plants near a window?", "So they get plenty of light.", ["So they stay in the dark.", "So they get colder."]),
  c("Which of these does a plant NOT need to grow?", "music", ["water", "light", "warmth"], { rule: NEED_RULE }),
  c("Bix gives a plant far too much water every day. The soil is always soggy. Is that good for it?", "No, too much water can harm it.", ["Yes, more water is always better."]),
];

const needSorts = [
  sorter("Sort them: good or bad for a plant?", [["good", "Good for a plant"], ["bad", "Bad for a plant"]], [
    ["watering it when the soil is dry", "good"], ["a sunny windowsill", "good"], ["a warm room", "good"], ["light from a window", "good"],
    ["a dark cupboard for weeks", "bad"], ["never watering it", "bad"], ["leaving it in a freezer", "bad"], ["leaving a pot plant out in the frost", "bad"],
  ], { rule: NEED_RULE }),
];

const needPots = [
  potPair("Bix grew two bean plants for two weeks. Both were watered and kept warm. One was in a dark cupboard. Which plant was in the dark?", "pale"),
  potPair("Bix grew two bean plants for two weeks. Both had light and warmth. One was not watered. Which plant had no water?", "droopy"),
  potPair("Bix grew two plants. One had water, light and warmth. The other was kept in the dark. Which plant had everything it needed?", "pale", true),
  potPair("Bix grew two plants. One was watered and one was not. Which plant was watered?", "droopy", true),
];

const needSpell = [
  { ...spell("water", "💧", "a drop of water", "Plants need ___ to stay healthy. Make the word."), rule: NEED_RULE },
  { ...spell("light", "☀️", "the Sun", "Plants need ___ from the Sun. Make the word."), rule: NEED_RULE },
  { ...spell("warm", undefined, undefined, "Most plants grow best when it is ___, not too hot and not too cold. Make the word."), rule: NEED_RULE },
  spell("soil", undefined, undefined, "Roots grow down into the ___. Make the word."),
  spell("pale", undefined, undefined, "A plant kept in the dark has ___, yellow leaves. Make the word."),
];

const needApply = [
  c("Bix is going on holiday for two weeks. What should Bix ask a neighbour to do for the plants?", "water them", ["put them in the dark", "put them in the freezer"]),
  c("Bix's plant has pale, yellow leaves. It is in a dark corner. What should Bix do?", "Move it near a window.", ["Put it in a cupboard.", "Stop watering it."]),
  c("Bix's plant is droopy and the soil is dry. What does it need?", "water", ["less light", "a colder room"]),
  c("A frost is coming tonight. What could Bix do to protect a small pot plant?", "bring it indoors", ["pour cold water on it", "put it in the freezer"]),
  c("Bix's cactus sits on a sunny windowsill and is watered sometimes. It grows well. What does this show?", "It is getting what it needs.", ["Cactuses need no light.", "Cactuses grow best in the dark."]),
];

const needTyped = [
  typed("Plants need water, warmth and ___ to stay healthy. Type the missing word. It starts with l.", "light"),
  typed("A plant with no ___ droops and dries out. Type the missing word. It starts with w.", "water"),
];

/* ---------- Plant Experiments ---------- */

const TEST_RULE = "To test one thing, Bix changes only that one thing. Everything else stays the same.";

const testDesign = [
  c("Bix wants to find out if plants need light. What should be different between the two plants?", "One is in the light and one is in the dark.", ["One gets water and one does not.", "One is a bean and one is a sunflower."], { rule: TEST_RULE }),
  c("Bix wants to find out if plants need water. What should be different?", "One plant is watered and one is not.", ["One is in the light and one is in the dark.", "One is big and one is small."], { rule: TEST_RULE }),
  c("Bix is testing whether plants need light. Both plants should get the same amount of ___.", "water", ["darkness", "light"], { rule: TEST_RULE }),
  c("Bix is testing whether plants need water. Where should both plants be kept?", "in the same warm, sunny place", ["one in the light and one in the dark", "one in the freezer and one by the window"], { rule: TEST_RULE }),
  c("Bix wants to find out if seeds need warmth to start growing. What should be different?", "One pot is in a warm, dark cupboard and one is in the fridge.", ["One pot gets water and one does not.", "One pot has beans and one has peas."], { rule: TEST_RULE }),
  c("Why does Bix test two bean plants, not a bean and a sunflower?", "So the two plants start the same.", ["Because beans taste nicer.", "So Bix can eat one."], { rule: TEST_RULE }),
];

const testPots = [
  potPair("Bix tested whether plants need light. After two weeks, which plant had been in the dark?", "pale"),
  potPair("Bix tested whether plants need water. After two weeks, which plant had not been watered?", "droopy"),
  potPair("Bix tested whether plants need light. Which plant had been on the sunny windowsill?", "pale", true),
  potPair("Bix tested whether plants need water. Which plant got water?", "droopy", true),
];

const testOrder = [
  { type: "order", prompt: "Put the steps of Bix's plant test in order.", labels: ["ask a question", "set up the two plants", "wait and watch", "say what you found"] },
  { type: "order", prompt: "Put the steps of Bix's light test in order.", labels: ["take two bean plants the same size", "put one in the light and one in the dark", "water them both the same", "look at them after two weeks"] },
  { type: "order", prompt: "Put the steps of Bix's seed test in order.", labels: ["plant seeds in two pots", "put one pot in a warm cupboard and one in the fridge", "check them every day", "count the seeds that sprouted"] },
];

// Bix's own results. Values are distinct, so "most" and "fewest" have one answer.
const LEAF_SETS = [
  [["light and water", 9], ["dark", 2], ["no water", 4]],
  [["light and water", 7], ["dark", 1], ["no water", 4]],
  [["light and water", 10], ["dark", 3], ["no water", 1]],
];
const LEAF_PROMPT = "Bix counted the healthy green leaves on each bean plant after two weeks.";
const leafChart = (op) => extremeChart({ sets: LEAF_SETS, unit: "leaves", op, prompt: (word) => `${LEAF_PROMPT} Which plant had the ${word}?` });
const leafValue = valueChart({ sets: LEAF_SETS, unit: "leaves", label: "dark", prompt: () => `${LEAF_PROMPT} How many did the plant in the dark have?` });
const SPROUT_SETS = [[["warm cupboard", 9], ["fridge", 1]], [["warm cupboard", 8], ["fridge", 2]], [["warm cupboard", 10], ["fridge", 0]]];
const sproutChart = valueChart({ sets: SPROUT_SETS, unit: "seeds", label: "warm cupboard",
  prompt: () => "Bix planted 10 seeds in a warm, dark cupboard and 10 in a fridge. How many seeds sprouted in the cupboard?" });

const testApply = [
  c("Bix's results: the plant in the light stayed green. The plant in the dark turned pale. What did Bix find out?", "Plants need light to stay healthy.", ["Plants grow best in the dark.", "Plants do not need water."]),
  c("Bix's results: seeds in the warm cupboard sprouted. Seeds in the fridge did not. What did Bix find out?", "Seeds need warmth to start growing.", ["Seeds grow best in the cold.", "Seeds need light to start growing."]),
  c("Bix gave one plant water and one plant juice. Then Bix put them in different rooms. Why is this not a fair test?", "Bix changed two things.", ["Bix used two plants.", "Bix watched them every day."]),
  c("How could Bix keep a record of how tall a plant grows?", "Measure it each week and write it down.", ["Guess once at the end.", "Look at it once and forget."]),
];

const testTyped = [
  typed("To test one thing, Bix changes only ___ thing. Type the missing word.", "one"),
  typed("One plant is in the light and one is in the ___. Type the missing word.", "dark"),
  typed("To test if plants need water, one plant gets water and one gets ___. Type the missing word.", "none"),
];

export const plantBuilders = {
  "seeds-and-bulbs": buildTopic({
    banks: { names: seedNames, sorts: seedSorts, needs: seedNeeds, spell: seedSpell, apply: seedApply, typed: seedTyped },
    levels: {
      1: ["names", "names", "names", "names", "names"],
      2: ["sorts", "needs", "names", "sorts", "needs"],
      3: ["needs", "spell", "needs", "spell", "needs"],
      4: ["apply", "typed", "apply", "apply", "typed"],
    },
  }),
  "from-seed-to-plant": buildTopic({
    banks: { stages: growStages, facts: growFacts, orders: growOrders, spell: growSpell, apply: growApply, typed: growTyped },
    levels: {
      1: ["stages", "facts", "stages", "facts", "stages"],
      2: ["facts", "stages", "facts", "stages", "facts"],
      3: ["orders", "spell", "orders", "spell", "orders"],
      4: ["apply", "typed", "apply", "apply", "typed"],
    },
  }),
  "what-plants-need-to-grow": buildTopic({
    banks: { facts: needFacts, sorts: needSorts, pots: needPots, spell: needSpell, apply: needApply, typed: needTyped },
    levels: {
      1: ["facts", "pots", "facts", "pots", "facts"],
      2: ["sorts", "facts", "pots", "facts", "pots"],
      3: ["spell", "pots", "spell", "facts", "spell"],
      4: ["apply", "typed", "apply", "apply", "typed"],
    },
  }),
  "plant-experiments": buildTopic({
    banks: { design: testDesign, pots: testPots, order: testOrder, charts: [leafChart("most"), leafChart("least"), leafValue, sproutChart], apply: testApply, typed: testTyped },
    levels: {
      1: ["pots", "design", "pots", "design", "pots"],
      2: ["design", "charts", "design", "charts", "design"],
      3: ["order", "charts", "design", "order", "design"],
      4: ["apply", "typed", "charts", "apply", "typed"],
    },
  }),
};
