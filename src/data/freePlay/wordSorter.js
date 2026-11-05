import { assertLevel, shuffle } from "./random.js";

/**
 * Word Sorter — endless rounds of sorting words by word class.
 *
 *   1  Easier  — nouns and verbs, three of each
 *   2  Medium  — nouns, verbs and adjectives, two of each
 *   3  Harder  — adds adverbs, with longer and trickier words (eight words)
 *
 * Every word belongs to exactly one class here: words that work as two classes
 * (play, drink, light, fast, kind) are left out so no answer is arguable.
 * Harder levels still deal the easier words too.
 *
 * Pure: `rng` is a parameter and nothing loops without a bound.
 */

export const LEVELS = [
  { id: 1, label: "🌱 Easier" },
  { id: 2, label: "🌿 Medium" },
  { id: 3, label: "🌳 Harder" },
];

export const CATEGORIES = {
  noun: { label: "Nouns", hint: "naming words" },
  verb: { label: "Verbs", hint: "doing words" },
  adjective: { label: "Adjectives", hint: "describing words" },
  adverb: { label: "Adverbs", hint: "how words" },
};

/** Which classes each level deals, and how many words of each. */
const SHAPE = {
  1: { types: ["noun", "verb"], perType: 3 },
  2: { types: ["noun", "verb", "adjective"], perType: 2 },
  3: { types: ["noun", "verb", "adjective", "adverb"], perType: 2 },
};

/** New words introduced at each level. */
const WORDS = {
  1: {
    noun: ["dog", "apple", "car", "chair", "house", "cat", "tree", "ball", "school", "flower", "bed", "fish"],
    verb: ["run", "jump", "sing", "eat", "sleep", "swim", "hop", "climb", "laugh", "throw", "sit", "clap"],
  },
  2: {
    noun: ["teacher", "garden", "rainbow", "window", "butterfly", "pillow", "castle", "rocket"],
    verb: ["write", "dance", "shout", "whisper", "cook", "paint", "build", "catch"],
    adjective: ["happy", "blue", "green", "tall", "small", "bright", "funny", "soft", "loud", "sweet"],
  },
  3: {
    noun: ["kindness", "library", "adventure", "mountain", "treasure", "pirate", "dragon", "bicycle"],
    verb: ["wander", "giggle", "scramble", "explore", "tiptoe", "gather", "wriggle", "stumble"],
    adjective: ["enormous", "tiny", "shiny", "delicious", "brave", "gentle", "scary", "clever", "fluffy", "ancient"],
    adverb: ["quickly", "slowly", "loudly", "quietly", "carefully", "gently", "happily", "bravely", "softly", "suddenly", "politely", "sadly"],
  },
};

/** Every word a level can deal for one class (its own plus easier levels'). */
export function wordsFor(level, type) {
  assertLevel(level);
  return Array.from({ length: level }, (_, i) => WORDS[i + 1][type] ?? []).flat();
}

export function categoriesForLevel(level) {
  assertLevel(level);
  return SHAPE[level].types;
}

export function makeWordSorterQuestion(rng, level) {
  assertLevel(level);
  const { types, perType } = SHAPE[level];
  const words = shuffle(
    types.flatMap((type) => shuffle(wordsFor(level, type), rng).slice(0, perType).map((word) => ({ word, type }))),
    rng,
  );
  const groups = types.map((type) => `${CATEGORIES[type].label} are ${CATEGORIES[type].hint}`);
  return {
    key: words.map((w) => w.word).sort().join(","),
    kind: "sort",
    level,
    types,
    words,
    prompt: "Tap a word, then tap the box it belongs in.",
    speech: `Tap a word, then tap the box it belongs in. ${groups.join(". ")}. The words are: ${words.map((w) => w.word).join(", ")}.`,
  };
}
