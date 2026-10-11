import { sample, shuffle } from "./shared.js";

/**
 * Year 1 The Alphabet: "name the letters of the alphabet: naming the letters
 * of the alphabet in order; using letter names to distinguish between
 * alternative spellings of the same sound" (docs/curriculum/year-1-english.md).
 *
 *   1 choose  which letter comes next (three in a row shown)
 *   2 choose  the missing letter, before or in the middle (nothing to follow on from)
 *   3 order   put five letters into alphabetical order
 *   4 type    spell the sound in a picture word by its letter names (r _ _ n → ai)
 *
 * Questions are authored as data and drawn by DataChallenge.
 */
export const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");

export const TITLES = [
  "Which letter comes next?",
  "Find the missing letter.",
  "Put the letters in alphabet order.",
  "Spell the sound with letter names.",
];

/**
 * Level 4: words whose middle sound has another common spelling. `letters`
 * is what fills the gap; `other` is the alternative spelling a child might
 * reach for (Appendix 1, Year 1). `before`/`after` frame the gap.
 */
export const SOUND_WORDS = [
  { word: "rain", picture: "🌧️", before: "r", letters: "ai", after: "n", other: "ay" },
  { word: "play", picture: "🛝", before: "pl", letters: "ay", after: "", other: "ai" },
  { word: "boat", picture: "⛵", before: "b", letters: "oa", after: "t", other: "ow" },
  { word: "snow", picture: "❄️", before: "sn", letters: "ow", after: "", other: "oa" },
  { word: "coin", picture: "🪙", before: "c", letters: "oi", after: "n", other: "oy" },
  { word: "boy", picture: "👦", before: "b", letters: "oy", after: "", other: "oi" },
  { word: "tree", picture: "🌳", before: "tr", letters: "ee", after: "", other: "ea" },
  { word: "sea", picture: "🌊", before: "s", letters: "ea", after: "", other: "ee" },
  { word: "night", picture: "🌃", before: "n", letters: "igh", after: "t", other: "ie" },
  { word: "pie", picture: "🥧", before: "p", letters: "ie", after: "", other: "igh" },
  { word: "moon", picture: "🌙", before: "m", letters: "oo", after: "n", other: "ew" },
  { word: "bird", picture: "🐦", before: "b", letters: "ir", after: "d", other: "ur" },
  { word: "church", picture: "⛪", before: "ch", letters: "ur", after: "ch", other: "ir" },
  { word: "car", picture: "🚗", before: "c", letters: "ar", after: "", other: "a" },
  { word: "kit", picture: "🎒", before: "", letters: "k", after: "it", other: "c" },
  { word: "cat", picture: "🐱", before: "", letters: "c", after: "at", other: "k" },
  { word: "chair", picture: "🪑", before: "ch", letters: "air", after: "", other: "are" },
  { word: "horse", picture: "🐴", before: "h", letters: "or", after: "se", other: "aw" },
];

const letterNames = (letters) => [...letters].join(", ");

/** Three letters in a row from `start`; the fourth is the answer. Options are near misses. */
function nextLetter(start, rng) {
  const shown = ALPHABET.slice(start, start + 3);
  const answer = ALPHABET[start + 3];
  // Repeating the last letter shown, or skipping one, are the usual slips.
  const wrong = [ALPHABET[start + 2], ALPHABET[start + 4] ?? ALPHABET[start + 1]];
  return {
    kind: "choice",
    rule: "The alphabet goes a, b, c, d … all the way to z.",
    prompt: "Which letter comes next?",
    sentence: `${shown.join(", ")}, ___`,
    options: shuffle([answer, ...wrong], rng),
    answer,
    hint: `Say the alphabet from ${shown[0]}.`,
    speak: `Which letter comes next? ${shown.join(", ")}, and then what?`,
  };
}

/** Four letters from `start` with a gap at the start or in the middle. */
function missingLetter(start, rng) {
  const run = ALPHABET.slice(start, start + 4);
  const gap = Math.floor(rng() * 3); // never the last: that is level 1's question
  const answer = run[gap];
  const shown = run.map((letter, i) => (i === gap ? "___" : letter)).join(", ");
  // Letters just outside the run: close enough to be tempting, never right.
  const wrong = [ALPHABET[start - 1], ALPHABET[start + 4], ALPHABET[start - 2], ALPHABET[start + 5]]
    .filter(Boolean)
    .slice(0, 2);
  return {
    kind: "choice",
    prompt: "Which letter is missing?",
    sentence: shown,
    options: shuffle([answer, ...wrong], rng),
    answer,
    hint: `Say the alphabet from ${ALPHABET[Math.max(0, start - 1)]}.`,
    speak: `Which letter is missing? ${run.map((letter, i) => (i === gap ? "blank" : letter)).join(", ")}.`,
  };
}

/** Five letters from an eight-letter stretch from `start`, dealt out of order. */
function orderLetters(start, rng) {
  const letters = sample(ALPHABET.slice(start, start + 8), 5, rng);
  const sorted = [...letters].sort();
  const items = letters.map((letter) => ({ id: letter, label: letter, value: ALPHABET.indexOf(letter) }));
  const dealt = letters.join("|") === sorted.join("|") ? [...items.slice(1), items[0]] : items;
  return {
    kind: "order",
    prompt: "Put these letters in alphabet order.",
    items: dealt,
    answer: sorted,
    hint: "Find the letter that comes first in the alphabet. Put it at the start.",
    speak: `Put these letters in alphabet order: ${dealt.map((item) => item.label).join(", ")}.`,
  };
}

/** Five different starting letters, so no question repeats in a challenge. */
const starts = (count, rng) => sample(Array.from({ length: count }, (_, i) => i), 5, rng);

/** Type the letters that spell the missing sound. */
function soundWord(row) {
  return {
    kind: "type",
    apostrophe: false,
    prompt: "Type the letters that are missing.",
    picture: row.picture,
    pictureLabel: row.word,
    sentence: `${row.before}___${row.after}`,
    answer: row.letters,
    maxLength: 4,
    hint: `The missing part has ${row.letters.length === 1 ? "one letter" : `${row.letters.length} letters`}. It is not spelt ${letterNames(row.other)}.`,
    speak: `${row.word}. Type the letters that are missing from ${row.word}.`,
  };
}

export function buildTheAlphabet(level, rng) {
  if (level === 1) return starts(ALPHABET.length - 3, rng).map((start) => nextLetter(start, rng));
  if (level === 2) return starts(ALPHABET.length - 3, rng).map((start) => missingLetter(start, rng));
  if (level === 3) return starts(ALPHABET.length - 7, rng).map((start) => orderLetters(start, rng));
  if (level === 4) return sample(SOUND_WORDS, 5, rng).map(soundWord);
  throw new Error(`no level ${level}`);
}
