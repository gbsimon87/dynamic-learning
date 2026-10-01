import { sample, shuffle } from "./shared.js";

/**
 * Year 3 Word Families. Appendix 2, Year 3: "Word families based on common
 * words, showing how words are related in form and meaning [for example,
 * solve, solution, solver, dissolve, insoluble]". Terminology for pupils:
 * word family.
 *
 *   1 pick    the idea is shown; which word is in the "rain" family?
 *   2 sort    two families and a "not in either" box: look-alikes like
 *             "train" share letters but not meaning (inferred)
 *   3 build   build a family word from the root and prefix/suffix tiles
 *             to match a meaning
 *   4 fit     a sentence with a gap: which family word fits? (no gloss)
 *
 * A word is in a family when it shares the root's form AND its meaning.
 * Every look-alike shares letters but has nothing to do with the root's
 * meaning (sun / sung, ear / early, plan / planet). Look-alikes that are
 * related after all are kept out: Sunday (sun's day), lightning, movie,
 * plane (from the same "flat" root as plan), display. Irregular forms that
 * change the root (taught, built, swam) are left out, so the form always
 * shows.
 */
export const QUESTIONS_PER_CHALLENGE = 5;

export const FAMILIES = [
  { root: "help", emoji: "🤝", members: ["helpful", "helper", "helpless", "unhelpful"], lookAlikes: ["helmet", "hello"] },
  { root: "play", emoji: "🎲", members: ["player", "playful", "replay", "playground"], lookAlikes: ["plate", "clay"] },
  { root: "kind", emoji: "💝", members: ["kindness", "unkind", "kindly"], lookAlikes: ["mind", "find"] },
  { root: "rain", emoji: "🌧️", members: ["rainy", "rainbow", "raindrop", "raincoat"], lookAlikes: ["train", "brain", "drain"] },
  { root: "snow", emoji: "❄️", members: ["snowy", "snowman", "snowball", "snowflake"], lookAlikes: ["snout", "snore"] },
  { root: "sun", emoji: "☀️", members: ["sunny", "sunshine", "sunset", "sunflower"], lookAlikes: ["sung", "sunk"] },
  { root: "light", emoji: "💡", members: ["lighthouse", "moonlight", "daylight", "candlelight"], lookAlikes: ["night", "fight", "tight"] },
  { root: "farm", emoji: "🚜", members: ["farmer", "farmyard", "farmhouse", "farming"], lookAlikes: ["harm", "warm"] },
  { root: "hope", emoji: "🤞", members: ["hopeful", "hopeless", "hoping", "hoped"], lookAlikes: ["hop", "hopping"] },
  { root: "care", emoji: "🧸", members: ["careful", "careless", "carer", "caring"], lookAlikes: ["carrot", "carpet", "scare"] },
  { root: "paint", emoji: "🎨", members: ["painter", "painting", "paintbrush"], lookAlikes: ["pain", "faint", "saint"] },
  { root: "read", emoji: "📖", members: ["reader", "reading", "reread"], lookAlikes: ["ready", "bread"] },
  { root: "swim", emoji: "🏊", members: ["swimmer", "swimming", "swimsuit"], lookAlikes: ["swing", "swift"] },
  { root: "teach", emoji: "🧑‍🏫", members: ["teacher", "teaching", "teaches"], lookAlikes: ["tea", "beach", "peach"] },
  { root: "friend", emoji: "🧑‍🤝‍🧑", members: ["friendly", "friendship", "unfriendly"], lookAlikes: ["fridge", "fried"] },
  { root: "dark", emoji: "🌑", members: ["darkness", "darken", "darker"], lookAlikes: ["bark", "park", "dart"] },
  { root: "sleep", emoji: "😴", members: ["sleepy", "asleep", "sleepless", "sleeping"], lookAlikes: ["sheep", "steep", "sleeve"] },
  { root: "ice", emoji: "🧊", members: ["icy", "iceberg", "icicle"], lookAlikes: ["rice", "dice", "mice"] },
  { root: "fish", emoji: "🐟", members: ["fishing", "fisherman", "goldfish"], lookAlikes: ["dish", "wish", "fist"] },
  { root: "happy", emoji: "😊", members: ["happiness", "unhappy", "happily"], lookAlikes: ["nappy", "snappy"] },
  { root: "ear", emoji: "👂", members: ["earring", "earache", "earmuffs", "earphones"], lookAlikes: ["early", "earth", "bear", "heart"] },
  { root: "pin", emoji: "📌", members: ["pinned", "hairpin", "pincushion"], lookAlikes: ["pint", "pink", "pine"] },
  { root: "plan", emoji: "🗒️", members: ["planner", "planning", "planned"], lookAlikes: ["planet", "plant"] },
  { root: "solve", emoji: "🧩", members: ["solver", "solution", "dissolve", "insoluble"], lookAlikes: ["solid", "solo"] },
];

/**
 * Level 3: build a family word to match a meaning. `parts` in order; every
 * part is a tile. The spare tiles come from AFFIXES, never one that would
 * build a different word with the same meaning.
 */
export const AFFIXES = ["un", "re", "er", "ful", "less", "ness", "ly", "y"];

export const BUILD_ITEMS = [
  { word: "helpful", parts: ["help", "ful"], meaning: "full of help" },
  { word: "helper", parts: ["help", "er"], meaning: "someone who helps" },
  { word: "unhelpful", parts: ["un", "help", "ful"], meaning: "not helpful" },
  { word: "player", parts: ["play", "er"], meaning: "someone who plays" },
  { word: "playful", parts: ["play", "ful"], meaning: "full of fun and games" },
  { word: "replay", parts: ["re", "play"], meaning: "to play again" },
  { word: "kindness", parts: ["kind", "ness"], meaning: "being kind" },
  { word: "unkind", parts: ["un", "kind"], meaning: "not kind" },
  { word: "kindly", parts: ["kind", "ly"], meaning: "in a kind way" },
  { word: "rainy", parts: ["rain", "y"], meaning: "with lots of rain" },
  { word: "snowy", parts: ["snow", "y"], meaning: "covered in snow" },
  { word: "farmer", parts: ["farm", "er"], meaning: "someone who works on a farm" },
  { word: "hopeful", parts: ["hope", "ful"], meaning: "full of hope" },
  { word: "hopeless", parts: ["hope", "less"], meaning: "without any hope" },
  { word: "careful", parts: ["care", "ful"], meaning: "taking care" },
  { word: "careless", parts: ["care", "less"], meaning: "without care" },
  { word: "painter", parts: ["paint", "er"], meaning: "someone who paints" },
  { word: "reader", parts: ["read", "er"], meaning: "someone who reads" },
  { word: "reread", parts: ["re", "read"], meaning: "to read again" },
  { word: "teacher", parts: ["teach", "er"], meaning: "someone who teaches" },
  { word: "friendly", parts: ["friend", "ly"], meaning: "kind, like a good friend" },
  { word: "unfriendly", parts: ["un", "friend", "ly"], meaning: "not friendly" },
  { word: "darkness", parts: ["dark", "ness"], meaning: "being dark" },
  { word: "sleepy", parts: ["sleep", "y"], meaning: "ready to fall asleep" },
  { word: "sleepless", parts: ["sleep", "less"], meaning: "without any sleep" },
];

/**
 * Words a spare tile must not make, because they would answer the same
 * meaning (or be a fair argument): "unkindly" for "not kind" is close
 * enough that a child could defend it.
 */
const SPARE_BLOCKLIST = {
  unkind: ["ly", "ness"],
  kindness: ["un"],
  unhelpful: ["less"],
  helpful: ["un"],
  friendly: ["un"],
  unfriendly: ["ness"],
  careless: ["ly"],
  careful: ["ly"],
  hopeful: ["ly"],
  hopeless: ["ly"],
  playful: ["ly"],
  sleepy: ["less"],
  sleepless: ["y"],
};

/**
 * Level 4: the sentence takes one word class, so only one option fits.
 * Options are all from one family; the wrong ones are a different kind of
 * word (a person instead of a describing word, say).
 */
export const FIT_ITEMS = [
  { sentence: "The ___ kicked the ball into the net.", answer: "player", wrong: ["playful", "replay"] },
  { sentence: "Biscuit is a ___ puppy who loves games.", answer: "playful", wrong: ["player", "replay"] },
  { sentence: "Ellie’s ___ made her friend smile.", answer: "kindness", wrong: ["unkind", "kindly"] },
  { sentence: "Zayn ___ shared his crayons with me.", answer: "kindly", wrong: ["kindness", "unkind"] },
  { sentence: "Our ___ read us a story after lunch.", answer: "teacher", wrong: ["teaching", "teaches"] },
  { sentence: "Take your coat. It looks ___ outside.", answer: "rainy", wrong: ["rainbow", "raindrop"] },
  { sentence: "Amara felt ___ that her lost cat would come home.", answer: "hopeful", wrong: ["hoped", "hopes"] },
  { sentence: "Be ___ when you carry the hot soup.", answer: "careful", wrong: ["carer", "cares"] },
  { sentence: "The ___ painted the door bright red.", answer: "painter", wrong: ["painting", "paints"] },
  { sentence: "Zayn yawned. He was very ___ after the long walk.", answer: "sleepy", wrong: ["sleeps", "sleeper"] },
  { sentence: "Biscuit fell ___ in his basket.", answer: "asleep", wrong: ["sleepy", "sleeps"] },
  { sentence: "Priya is a fast ___ who loves books.", answer: "reader", wrong: ["reading", "reread"] },
  { sentence: "The ___ fed the cows and the sheep.", answer: "farmer", wrong: ["farming", "farmyard"] },
  { sentence: "Leo is a strong ___ who can swim a whole length.", answer: "swimmer", wrong: ["swimming", "swimsuit"] },
  { sentence: "In the ___, we could not see a thing.", answer: "darkness", wrong: ["darken", "darker"] },
  { sentence: "Ellie’s dog is very ___ and wags his tail at everyone.", answer: "friendly", wrong: ["friendship", "friend"] },
  { sentence: "Amara’s face was full of ___.", answer: "happiness", wrong: ["happily", "unhappy"] },
  { sentence: "Gran went ___ in the river and caught a trout.", answer: "fishing", wrong: ["fisherman", "goldfish"] },
  { sentence: "Leo was ___ when his team lost.", answer: "unhappy", wrong: ["happiness", "happily"] },
  { sentence: "Thank you for being so ___.", answer: "helpful", wrong: ["helper", "helps"] },
];

function familyOf(root) {
  return FAMILIES.find((family) => family.root === root);
}

/** Level 1: one family word and two look-alikes. */
function pickQuestion(family, rng) {
  const [member] = sample(family.members, 1, rng);
  const lookAlikes = sample(family.lookAlikes, 2, rng);
  return {
    kind: "pick",
    root: family.root,
    emoji: family.emoji,
    answer: member,
    lookAlikes,
    options: shuffle([member, ...lookAlikes], rng),
  };
}

/**
 * Level 2: two families, two members each, one look-alike for each, and a
 * box for "not in either family". Families are paired up so none repeats in
 * a run.
 */
function sortQuestions(rng) {
  const families = sample(FAMILIES, QUESTIONS_PER_CHALLENGE * 2, rng);
  return Array.from({ length: QUESTIONS_PER_CHALLENGE }, (_, q) => {
    const pair = families.slice(q * 2, q * 2 + 2);
    const cards = pair.flatMap((family) => [
      ...sample(family.members, 2, rng).map((word) => ({ id: word, label: word, bin: family.root })),
      ...sample(family.lookAlikes, 1, rng).map((word) => ({ id: word, label: word, bin: "neither" })),
    ]);
    return {
      kind: "sort",
      roots: pair.map((family) => family.root),
      bins: [
        ...pair.map((family) => ({ id: family.root, label: `${family.root} family` })),
        { id: "neither", label: "not in either family" },
      ],
      cards: shuffle(cards, rng),
    };
  });
}

function buildQuestion(item, rng) {
  const blocked = new Set([...(SPARE_BLOCKLIST[item.word] ?? []), ...item.parts]);
  const spares = sample(AFFIXES.filter((affix) => !blocked.has(affix)), 2, rng);
  const tiles = [...item.parts, ...spares].map((label, index) => ({ id: `t${index}`, label }));
  return {
    kind: "build",
    meaning: item.meaning,
    root: item.parts.find((part) => !AFFIXES.includes(part)),
    answer: item.word,
    partCount: item.parts.length,
    tiles: shuffle(tiles, rng),
  };
}

function fitQuestion(item, rng) {
  return {
    kind: "fit",
    sentence: item.sentence,
    answer: item.answer,
    options: shuffle([item.answer, ...item.wrong], rng),
  };
}

/** The family the level 1 rule card uses as its example; never asked there. */
export const RULE_EXAMPLE = "help";

export function buildWordFamilyQuestions(level, rng) {
  if (level === 1) return sample(FAMILIES.filter((family) => family.root !== RULE_EXAMPLE), QUESTIONS_PER_CHALLENGE, rng).map((family) => pickQuestion(family, rng));
  if (level === 2) return sortQuestions(rng);
  if (level === 3) return sample(BUILD_ITEMS, QUESTIONS_PER_CHALLENGE, rng).map((item) => buildQuestion(item, rng));
  if (level === 4) return sample(FIT_ITEMS, QUESTIONS_PER_CHALLENGE, rng).map((item) => fitQuestion(item, rng));
  throw new Error(`no word families level ${level}`);
}

export function isSortCorrect(question, placement) {
  return question.cards.every((card) => placement[card.id] === card.bin);
}

export function builtWord(question, placed) {
  return placed.map((id) => question.tiles.find((tile) => tile.id === id)?.label ?? "").join("");
}

export function isBuildCorrect(question, placed) {
  return builtWord(question, placed) === question.answer;
}

export { familyOf };
