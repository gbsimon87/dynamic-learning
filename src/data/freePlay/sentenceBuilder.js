import { assertLevel, pick, shuffle } from "./random.js";

/**
 * Sentence Builder — endless questions that put scrambled words in order.
 *
 * Levels follow sentence length and how much help the words give:
 *   1  Easier  — 3-4 words; the first word has its capital letter and the
 *                last word its full stop, so they show where to start and end
 *   2  Medium  — 5-6 words, same capital and full stop clues
 *   3  Harder  — 7-11 words, every word in lowercase with no full stop:
 *                the child works out the start and the end from the meaning
 *
 * Every sentence must read naturally in exactly one word order.
 *
 * Pure: `rng` is a parameter and nothing loops without a bound.
 */

export const LEVELS = [
  { id: 1, label: "🌱 Easier" },
  { id: 2, label: "🌿 Medium" },
  { id: 3, label: "🌳 Harder" },
];

const SENTENCES = {
  1: [
    "Birds can fly", "Dogs like bones", "I am happy", "Fish can swim", "Frogs can jump", "Cows eat grass",
    "Bees make honey", "Ducks can swim", "I love pizza",
    "The sun is hot", "My cat likes milk", "We play in class", "She sings very well", "The dog is big",
    "She has a ball", "The moon is bright", "He can run fast",
  ],
  2: [
    "I like to play football", "She is reading a book", "The dog is barking loudly", "We are going to school",
    "Birds fly in the sky", "My mom is cooking dinner", "The baby is fast asleep", "Rain falls from the clouds",
    "The farmer feeds the hens", "My dad makes tasty soup", "Frogs jump into the pond",
    "The sun rises in the east", "I brush my teeth every night", "The cat sleeps under my bed",
    "She writes with a blue pen", "We saw ducks on the lake",
  ],
  3: [
    "The cat is sleeping on the mat", "We are reading a book about animals", "My sister rides her bike to school",
    "I can see a bird in the tree", "The children are playing games in the garden", "I eat an apple and drink my milk",
    "We saw a big elephant at the zoo", "The tiny mouse hid under the big chair",
    "My brother kicks the ball over the wall",
    "My friend and I play in the park today", "I can hear the rain on my bedroom window",
    "My friend and I like to play in the park", "I put on my coat and walk to the shop",
    "I put on my coat and walk to the bus stop", "We are going to see my grandma at her new house",
  ],
};

export function sentencesForLevel(level) {
  assertLevel(level);
  return SENTENCES[level];
}

/** The words as shown on the tiles, in the right order. */
export function tilesFor(sentence, level) {
  const words = sentence.split(" ");
  if (level === 3) return words.map((word, i) => (i === 0 && word !== "I" ? word.toLowerCase() : word));
  return words.map((word, i) => (i === words.length - 1 ? `${word}.` : word));
}

export function makeSentenceBuilderQuestion(rng, level) {
  assertLevel(level);
  const sentence = pick(rng, sentencesForLevel(level));
  const words = tilesFor(sentence, level);

  // Re-shuffle if the scramble happens to match the answer (bounded).
  let scrambled = shuffle(words, rng);
  for (let i = 0; i < 10 && scrambled.join(" ") === words.join(" "); i += 1) scrambled = shuffle(words, rng);

  return {
    key: sentence,
    level,
    prompt: level === 3 ? "Which word starts the sentence? Put them all in order." : "Tap the words in order to make a sentence.",
    speech: `Make a sentence with these words. ${scrambled.join(", ").replace(/\./g, "")}`,
    words,
    scrambled,
  };
}
