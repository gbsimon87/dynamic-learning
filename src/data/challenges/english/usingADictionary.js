import { sample, shuffle } from "./shared.js";

/**
 * Year 3 Using a Dictionary: "using dictionaries to check the meaning of
 * words that they have read" · "use the first 2 or 3 letters of a word to
 * check its spelling in a dictionary".
 *
 *   1 first   which word comes first in a dictionary? (first letters differ;
 *             the alphabet is shown)
 *   2 page    which word is on the page with these guide words? (needs the
 *             2nd or 3rd letter: inferred)
 *   3 order   put four words in dictionary order (whole set; 2nd or 3rd
 *             letter decides)
 *   4 meaning read a sentence and a dictionary entry; choose the meaning
 *             that fits (applied)
 *
 * Dictionary order is plain a–z on lower-case letters; no word in an
 * ordering task is the start of another (car / card), so a seven-year-old
 * never meets the "shorter word first" rule as a trap.
 */
export const QUESTIONS_PER_CHALLENGE = 5;

export const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");

/** Level 1 pool: one word per first letter (no two share one). */
export const FIRST_WORDS = [
  "apple", "ball", "cat", "dog", "egg", "fish", "goat", "hat", "igloo",
  "jam", "kite", "lemon", "moon", "nest", "orange", "pig", "queen",
  "rabbit", "sun", "tiger", "umbrella", "van", "web", "zebra",
];

/** How many level 1 questions a run can draw on (sets of three letters). */
export const FIRST_OPTIONS = 3;

/**
 * Level 2. `guides` are the first and last words on a page; `answer` falls
 * between them; `before` comes before the first and `after` after the last.
 * Tests check all three against plain a–z order.
 */
export const PAGE_ITEMS = [
  { guides: ["plum", "pot"], answer: "pond", before: "pig", after: "pup" },
  { guides: ["ball", "bed"], answer: "bat", before: "bag", after: "bell" },
  { guides: ["cake", "cart"], answer: "camel", before: "cab", after: "cat" },
  { guides: ["dog", "duck"], answer: "drum", before: "dish", after: "dust" },
  { guides: ["farm", "fern"], answer: "feather", before: "fan", after: "fig" },
  { guides: ["garden", "goat"], answer: "giant", before: "game", after: "goose" },
  { guides: ["hat", "hill"], answer: "hen", before: "hand", after: "hole" },
  { guides: ["jam", "jelly"], answer: "jar", before: "jacket", after: "jet" },
  { guides: ["kettle", "king"], answer: "kick", before: "kangaroo", after: "kiwi" },
  { guides: ["lamp", "leaf"], answer: "lazy", before: "ladder", after: "lemon" },
  { guides: ["map", "milk"], answer: "melon", before: "magic", after: "mole" },
  { guides: ["nest", "nose"], answer: "night", before: "neat", after: "nut" },
  { guides: ["orange", "oven"], answer: "otter", before: "octopus", after: "owl" },
  { guides: ["river", "robot"], answer: "road", before: "rice", after: "rocket" },
  { guides: ["sand", "seal"], answer: "scarf", before: "sack", after: "seven" },
  { guides: ["tiger", "toast"], answer: "time", before: "tick", after: "tooth" },
  { guides: ["wall", "web"], answer: "wasp", before: "wagon", after: "well" },
  { guides: ["bird", "boat"], answer: "blue", before: "bike", after: "box" },
  { guides: ["sun", "swan"], answer: "super", before: "summer", after: "sweet" },
];

/**
 * Level 3. Four words that share their first letter (sets 1–12) or their
 * first two letters (13–18), given here in dictionary order.
 */
export const ORDER_SETS = [
  ["sand", "seal", "ship", "sock"],
  ["bag", "bed", "bird", "bus"],
  ["cat", "cloud", "cow", "cup"],
  ["dance", "desk", "dig", "duck"],
  ["farm", "fence", "fish", "frog"],
  ["gate", "ghost", "glue", "grape"],
  ["hand", "hen", "hill", "hut"],
  ["map", "meal", "milk", "mud"],
  ["pan", "pen", "pig", "pot"],
  ["rain", "red", "ring", "rope"],
  ["tap", "ten", "tin", "top"],
  ["wall", "web", "wind", "wolf"],
  ["cab", "cake", "camel", "cap"],
  ["shark", "shed", "ship", "shop"],
  ["stamp", "step", "stick", "stone"],
  ["bread", "brick", "broom", "brush"],
  ["trap", "tree", "trip", "truck"],
  ["plan", "plum", "pond", "post"],
];

/**
 * Level 4. A sentence, then a dictionary entry for the marked word. Only one
 * meaning fits the sentence. (The multiple-meaning words of Words in Context
 * are left to that topic.)
 */
export const MEANING_ITEMS = [
  { sentence: "Amara paid her pocket money into the bank.", word: "bank", meanings: ["the land along the side of a river", "a place that keeps money safe"], answer: 1 },
  { sentence: "Leo sat on the bank and watched the ducks swim by.", word: "bank", meanings: ["the land along the side of a river", "a place that keeps money safe"], answer: 0 },
  { sentence: "At the zoo, a seal clapped its flippers.", word: "seal", meanings: ["a sea animal with flippers that eats fish", "to close something tightly"], answer: 0 },
  { sentence: "There are thirty pupils in Ellie’s class.", word: "pupils", meanings: ["children who are learning at a school", "the black circles in the middle of your eyes"], answer: 0 },
  { sentence: "In the bright sunshine, the pupils of Zayn’s eyes grew smaller.", word: "pupils", meanings: ["children who are learning at a school", "the black circles in the middle of your eyes"], answer: 1 },
  { sentence: "Dad hit the nail with a hammer.", word: "nail", meanings: ["the hard part at the end of a finger or toe", "a thin piece of metal you hammer into wood"], answer: 1 },
  { sentence: "Priya painted her nails bright pink.", word: "nails", meanings: ["the hard parts at the ends of your fingers or toes", "thin pieces of metal you hammer into wood"], answer: 0 },
  { sentence: "Ellie spread strawberry jam on her toast.", word: "jam", meanings: ["a sweet food made from fruit and sugar", "lots of cars stuck on a road"], answer: 0 },
  { sentence: "We were late because of a traffic jam.", word: "jam", meanings: ["a sweet food made from fruit and sugar", "lots of cars stuck on a road"], answer: 1 },
  { sentence: "The fish was covered in shiny scales.", word: "scales", meanings: ["small, flat pieces of skin on a fish or a snake", "a machine for weighing things"], answer: 0 },
  { sentence: "Zayn held the ladybird in the palm of his hand.", word: "palm", meanings: ["the inside of your hand", "a tall tree with big leaves at the top"], answer: 0 },
  { sentence: "The elephant sprayed water with its trunk.", word: "trunk", meanings: ["the thick main stem of a tree", "the long nose of an elephant", "a big box for storing things"], answer: 1 },
  { sentence: "Biscuit hid behind the trunk of the old oak tree.", word: "trunk", meanings: ["the thick main stem of a tree", "the long nose of an elephant", "a big box for storing things"], answer: 0 },
  { sentence: "Priya found gold coins inside the old wooden chest.", word: "chest", meanings: ["the front of your body, between your neck and your tummy", "a big, strong box with a lid"], answer: 1 },
  { sentence: "The duck dipped its bill into the pond.", word: "bill", meanings: ["a piece of paper that tells you how much to pay", "the beak of a bird"], answer: 1 },
  { sentence: "Leo goes to chess club every Tuesday.", word: "club", meanings: ["a group of people who meet to do something together", "a heavy stick"], answer: 0 },
  { sentence: "A fly buzzed around the jam jar.", word: "fly", meanings: ["a small insect with wings", "to move through the air"], answer: 0 },
  { sentence: "Mum wrote the date at the top of the letter.", word: "date", meanings: ["the day, month and year", "a sweet brown fruit"], answer: 0 },
  { sentence: "A mole dug tunnels under the garden.", word: "mole", meanings: ["a small dark spot on your skin", "a small furry animal that digs under the ground"], answer: 1 },
  { sentence: "Grandad wore a smart blue tie to the wedding.", word: "tie", meanings: ["a long strip of cloth worn round the neck", "to fasten something with a knot"], answer: 0 },
];

/** Plain a–z comparison, on lower case. */
export function compareWords(a, b) {
  const x = a.toLowerCase();
  const y = b.toLowerCase();
  if (x === y) return 0;
  return x < y ? -1 : 1;
}

/** The first position where two words differ (0-based), or -1. */
export function firstDifference(a, b) {
  for (let i = 0; i < Math.min(a.length, b.length); i += 1) {
    if (a[i] !== b[i]) return i;
  }
  return -1;
}

/** Level 1: three words with different first letters; the answer is the earliest. */
function firstQuestion(words) {
  const sorted = [...words].sort(compareWords);
  return { kind: "first", options: words, answer: sorted[0] };
}

function pageQuestion(item, rng) {
  return {
    kind: "page",
    guides: item.guides,
    answer: item.answer,
    options: shuffle([item.answer, item.before, item.after], rng),
  };
}

function orderQuestion(set, rng) {
  // Never hand out the list already in order.
  let items = shuffle(set, rng);
  if (items.every((word, index) => word === set[index])) items = [...set.slice(1), set[0]];
  // The letter (1-based) a child must look at: where neighbours first differ.
  const decider = Math.max(...set.slice(1).map((word, index) => firstDifference(set[index], word))) + 1;
  return {
    kind: "order",
    items: items.map((word) => ({ id: word, label: word })),
    answer: [...set],
    decider,
  };
}

function meaningQuestion(item, rng) {
  const answer = item.meanings[item.answer];
  return {
    kind: "meaning",
    sentence: item.sentence,
    word: item.word,
    meanings: item.meanings,
    answer,
    options: shuffle(item.meanings, rng),
  };
}

export function buildUsingADictionaryQuestions(level, rng) {
  if (level === 1) {
    const words = sample(FIRST_WORDS, QUESTIONS_PER_CHALLENGE * FIRST_OPTIONS, rng);
    return Array.from({ length: QUESTIONS_PER_CHALLENGE }, (_, index) =>
      firstQuestion(words.slice(index * FIRST_OPTIONS, (index + 1) * FIRST_OPTIONS))
    );
  }
  if (level === 2) return sample(PAGE_ITEMS, QUESTIONS_PER_CHALLENGE, rng).map((item) => pageQuestion(item, rng));
  if (level === 3) return sample(ORDER_SETS, QUESTIONS_PER_CHALLENGE, rng).map((set) => orderQuestion(set, rng));
  if (level === 4) return sample(MEANING_ITEMS, QUESTIONS_PER_CHALLENGE, rng).map((item) => meaningQuestion(item, rng));
  throw new Error(`no using a dictionary level ${level}`);
}

/** Level 3: the arrangement matches dictionary order exactly. */
export function isOrderCorrect(question, items) {
  return items.length === question.answer.length && items.every((item, index) => item.id === question.answer[index]);
}
