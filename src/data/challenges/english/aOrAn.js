import { bareWord, sample, shuffle, tokenise } from "./shared.js";

/**
 * Year 3 A or An. Appendix 2, Year 3: "Use of the forms a or an according to
 * whether the next word begins with a consonant or a vowel [for example, a
 * rock, an open box]". Terminology for pupils: consonant, consonant letter,
 * vowel, vowel letter.
 *
 *   1 pick    the rule is shown and the first letter marked: a or an?
 *   2 sort    sort words and phrases into "a" and "an" (inferred)
 *   3 fix     a sentence has one wrong a/an: tap it
 *   4 story   a mini-story with three gaps: fill each with a or an (no gloss)
 *
 * The rule follows the NEXT word, so phrases like "an old tent" and "a huge
 * egg" are in every level after the first.
 *
 * Year 3 learns the rule by LETTER. Every word whose first letter's sound
 * misleads (an hour, a unicorn, a one-way street) is kept out, and the test
 * checks every word that follows an a or an against `MISLEADING`.
 */
export const QUESTIONS_PER_CHALLENGE = 5;

export const VOWELS = ["a", "e", "i", "o", "u"];

/** Words whose first sound does not match their first letter. Never used. */
export const MISLEADING = [
  "hour", "hours", "honest", "honestly", "honour", "heir", "herb", "unicorn",
  "uniform", "university", "unit", "union", "unique", "useful", "useless",
  "user", "usual", "usually", "utensil", "ukulele", "european", "euro",
  "eucalyptus", "ewe", "one", "once", "one-way", "u-turn", "x-ray",
];

/** a or an, by the next word's first LETTER (the Year 3 rule). */
export function articleFor(word) {
  return VOWELS.includes(word.trim()[0]?.toLowerCase()) ? "an" : "a";
}

/** Nouns with a picture, for level 1. */
export const NOUNS = [
  { word: "rock", emoji: "🪨" }, { word: "dog", emoji: "🐕" }, { word: "cat", emoji: "🐈" },
  { word: "ball", emoji: "⚽" }, { word: "kite", emoji: "🪁" }, { word: "tent", emoji: "⛺" },
  { word: "hat", emoji: "🎩" }, { word: "pencil", emoji: "✏️" }, { word: "banana", emoji: "🍌" },
  { word: "giraffe", emoji: "🦒" }, { word: "zebra", emoji: "🦓" }, { word: "castle", emoji: "🏰" },
  { word: "robot", emoji: "🤖" }, { word: "volcano", emoji: "🌋" }, { word: "sandwich", emoji: "🥪" },
  { word: "lemon", emoji: "🍋" }, { word: "map", emoji: "🗺️" }, { word: "queen", emoji: "👸" },
  { word: "window", emoji: "🪟" }, { word: "fox", emoji: "🦊" }, { word: "rabbit", emoji: "🐇" },
  { word: "cake", emoji: "🎂" }, { word: "drum", emoji: "🥁" }, { word: "horse", emoji: "🐎" },
  { word: "house", emoji: "🏠" }, { word: "yo-yo", emoji: "🪀" }, { word: "lion", emoji: "🦁" },
  { word: "monkey", emoji: "🐒" }, { word: "bus", emoji: "🚌" }, { word: "jellyfish", emoji: "🪼" },
  { word: "apple", emoji: "🍎" }, { word: "egg", emoji: "🥚" }, { word: "orange", emoji: "🍊" },
  { word: "umbrella", emoji: "☂️" }, { word: "elephant", emoji: "🐘" }, { word: "owl", emoji: "🦉" },
  { word: "ant", emoji: "🐜" }, { word: "octopus", emoji: "🐙" }, { word: "eagle", emoji: "🦅" },
  { word: "island", emoji: "🏝️" }, { word: "envelope", emoji: "✉️" }, { word: "astronaut", emoji: "🧑‍🚀" },
  { word: "acorn", emoji: "🌰" }, { word: "alien", emoji: "👽" }, { word: "ear", emoji: "👂" },
  { word: "elf", emoji: "🧝" }, { word: "onion", emoji: "🧅" }, { word: "avocado", emoji: "🥑" },
  { word: "ice cream", emoji: "🍦" }, { word: "aeroplane", emoji: "✈️" }, { word: "axe", emoji: "🪓" },
  { word: "anchor", emoji: "⚓" }, { word: "otter", emoji: "🦦" }, { word: "insect", emoji: "🐞" },
];

/** Adjective-first phrases: the adjective, not the noun, decides. */
export const PHRASES = [
  "old tent", "open box", "empty box", "angry cat", "enormous dog", "icy road",
  "orange kite", "amazing robot", "ugly toad", "excellent idea", "awful smell",
  "easy sum", "odd sock", "itchy jumper", "old castle",
  "huge egg", "tiny ant", "big apple", "red umbrella", "little owl",
  "happy elephant", "juicy orange", "funny octopus", "cold ice cream",
  "small island", "brown acorn", "green alien", "long arrow", "shiny envelope",
  "sleepy otter",
];

/**
 * Level 3: each sentence has exactly two a/an, both right as written. The
 * builder swaps one, so exactly one is wrong.
 */
export const FIX_SENTENCES = [
  "Leo found a shell and an old coin on the beach.",
  "Amara ate an apple and a banana at lunch.",
  "Biscuit chased a squirrel up an oak tree.",
  "Priya saw an owl sitting on a branch.",
  "Zayn drew a dragon with an enormous tail.",
  "Ellie wore an orange hat and a blue scarf.",
  "We camped in an old tent beside a river.",
  "At Easter, Gran gave me a huge egg and an envelope.",
  "There was an elephant and a giraffe at the zoo.",
  "Leo opened an empty box and found a note inside.",
  "Priya climbed a tall tree to rescue an angry cat.",
  "The magician pulled a rabbit and an umbrella out of his hat.",
  "Zayn bought an envelope and a stamp at the post office.",
  "Ellie spotted an octopus hiding under a rock.",
  "Biscuit dug a hole and buried an old bone.",
  "We saw an astronaut and a rocket at the museum.",
  "Amara wrote a story about an alien who loved cake.",
  "Leo’s uncle keeps an iguana and a parrot.",
  "Priya made a sandcastle with an amazing tower.",
  "The farmer has a horse and an excellent sheepdog.",
];

/** Level 4: mini-stories, three gaps each. The answers come from the next word. */
export const STORIES = [
  "Leo went to the park with ___ kite. He saw ___ owl in ___ tall tree.",
  "Amara packed ___ apple, ___ sandwich and ___ orange for her picnic.",
  "Biscuit found ___ old sock under the bed. He took it to ___ corner and chewed ___ hole in it.",
  "Priya climbed ___ enormous hill. At the top, she ate ___ ice cream and waved at ___ bird.",
  "Zayn built ___ robot out of ___ empty box. It had ___ arm that could wave.",
  "Ellie has ___ umbrella with spots on it. When it rains, she puts on ___ yellow coat and ___ pair of boots.",
  "In the garden, Leo found ___ ant, ___ beetle and ___ ugly old toad.",
  "The class visited ___ castle. They saw ___ old sword and ___ shiny helmet.",
  "Amara wrote ___ story about ___ alien. The alien lived in ___ igloo on the Moon.",
  "Zayn drew ___ octopus with ___ hat on each arm. It was ___ funny picture.",
  "Biscuit barked at ___ envelope on the mat. Then he saw ___ cat and chased it into ___ bush.",
  "Priya made ___ cake for Mum’s birthday. She added ___ egg and ___ handful of berries.",
  "Leo saw ___ astronaut on TV. Now he wants ___ rocket and ___ space suit.",
  "Ellie planted ___ acorn in ___ pot. Some day it will grow into ___ oak tree.",
  "We stayed in ___ tent by the sea. At night, we heard ___ owl and saw ___ huge moon.",
  "Zayn found ___ insect on ___ leaf. It was ___ ladybird with seven spots.",
];

/** The word straight after each gap, and so each gap's answer. */
export function storyGaps(story) {
  const parts = story.split("___");
  return parts.slice(1).map((after) => {
    const next = after.trim().split(/\s+/)[0];
    return { next: bareWord(next), answer: articleFor(next) };
  });
}

/** Indices of the a/an tokens in a tokenised sentence. */
export function articleIndices(tokens) {
  return tokens
    .map((token, index) => (["a", "an"].includes(bareWord(token)) && /^[a-z]/.test(token) ? index : -1))
    .filter((index) => index >= 0);
}

function pickQuestion(noun) {
  return {
    kind: "pick",
    word: noun.word,
    emoji: noun.emoji,
    answer: articleFor(noun.word),
    options: ["a", "an"],
  };
}

/** Level 2: three for "a", three for "an", nouns and phrases mixed, no repeats. */
function sortQuestions(rng) {
  const items = [...NOUNS.map((noun) => noun.word), ...PHRASES];
  const forA = shuffle(items.filter((item) => articleFor(item) === "a"), rng);
  const forAn = shuffle(items.filter((item) => articleFor(item) === "an"), rng);
  return Array.from({ length: QUESTIONS_PER_CHALLENGE }, () => ({
    kind: "sort",
    bins: [
      { id: "a", label: "a" },
      { id: "an", label: "an" },
    ],
    cards: shuffle(
      [...forA.splice(0, 3), ...forAn.splice(0, 3)].map((label) => ({ id: label, label, bin: articleFor(label) })),
      rng
    ),
  }));
}

function fixQuestion(sentence, rng) {
  const tokens = tokenise(sentence);
  const articles = articleIndices(tokens);
  const [wrongIndex] = sample(articles, 1, rng);
  tokens[wrongIndex] = tokens[wrongIndex] === "a" ? "an" : "a";
  // The hint underlines both a/an words and the word after each.
  const hinted = new Set(articles.flatMap((index) => [index, index + 1]));
  return { kind: "fix", tokens, wrongIndex, articles, hinted, correct: sentence };
}

function storyQuestion(story) {
  return { kind: "story", story, parts: story.split("___"), gaps: storyGaps(story) };
}

export function buildAOrAnQuestions(level, rng) {
  if (level === 1) {
    const forA = NOUNS.filter((noun) => articleFor(noun.word) === "a");
    const forAn = NOUNS.filter((noun) => articleFor(noun.word) === "an");
    const [extra] = sample([forA, forAn], 1, rng);
    const chosen = [...sample(forA, 2, rng), ...sample(forAn, 2, rng)];
    const rest = extra.filter((noun) => !chosen.includes(noun));
    return shuffle([...chosen, ...sample(rest, 1, rng)], rng).map(pickQuestion);
  }
  if (level === 2) return sortQuestions(rng);
  if (level === 3) return sample(FIX_SENTENCES, QUESTIONS_PER_CHALLENGE, rng).map((sentence) => fixQuestion(sentence, rng));
  if (level === 4) return sample(STORIES, QUESTIONS_PER_CHALLENGE, rng).map(storyQuestion);
  throw new Error(`no a or an level ${level}`);
}

export function isSortCorrect(question, placement) {
  return question.cards.every((card) => placement[card.id] === card.bin);
}

/** Level 4: `chosen` is an array of "a" / "an" / null, one per gap. */
export function isStoryCorrect(question, chosen) {
  return question.gaps.every((gap, index) => chosen[index] === gap.answer);
}
