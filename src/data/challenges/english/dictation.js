import { bareWord, sample, shuffle, tokenise } from "./shared.js";

/**
 * Year 3 Dictation: "write from memory simple sentences, dictated by the
 * teacher, that include words and punctuation taught so far".
 *
 * The sentence is heard (🔊, never autoplayed). On a device with no speech
 * the game falls back to look, cover, write: the sentence shows for a few
 * seconds, then hides while the child answers, with "Show again".
 *
 *   1 choose  choose the sentence written correctly (the checks are listed)
 *   2 type    type the missing word on the letter keyboard
 *   3 build   build the sentence from word tiles (one wrong spelling among
 *             them) and choose its end mark
 *   4 write   build the whole sentence: first word in two cases, the wrong
 *             spelling, and the end marks (no gloss)
 *
 * Words come from Appendix 1's Year 3 half (WORD_LIST[3]) or its Year 3
 * homophones. Punctuation is only what has been taught: capital letters, full
 * stops, question and exclamation marks, commas in lists, apostrophes for
 * contractions and singular possession.
 */

/**
 * `key` is the word typed in level 2 (it appears once). `swap` is [right
 * word, wrong spelling]: the wrong option in level 1 and the distractor tile
 * in levels 3 and 4. A wrong spelling may be a real word (a homophone).
 */
export const DICTATION_ITEMS = [
  { text: "Leo caught the ball with both hands.", key: "caught", swap: ["caught", "court"] },
  { text: "I can hear the birds singing.", key: "hear", swap: ["hear", "here"] },
  { text: "We had an early breakfast on Monday.", key: "early", swap: ["early", "erly"] },
  { text: "My favourite fruit is a peach.", key: "favourite", swap: ["fruit", "froot"] },
  { text: "Can you answer my riddle?", key: "answer", swap: ["answer", "anser"] },
  { text: "Biscuit will bury his bone in the garden.", key: "bury", swap: ["bury", "berry"] },
  { text: "Priya’s bicycle is red and blue.", key: "bicycle", swap: ["bicycle", "bicicle"] },
  { text: "We bought fruit, bread and milk.", key: "fruit", swap: ["fruit", "frute"] },
  { text: "It was a great day at the beach!", key: "great", swap: ["great", "grate"] },
  { text: "Zayn can’t decide what to draw.", key: "decide", swap: ["decide", "deside"] },
  { text: "Ellie heard a noise in the night.", key: "heard", swap: ["heard", "herd"] },
  { text: "Please do not break the window.", key: "break", swap: ["break", "brake"] },
  { text: "Amara wants to be a famous singer.", key: "famous", swap: ["famous", "famus"] },
  { text: "Did you meet Leo at the park?", key: "meet", swap: ["meet", "meat"] },
  { text: "It is difficult to build a den.", key: "build", swap: ["difficult", "dificult"] },
  { text: "We will arrive at eight o’clock.", key: "arrive", swap: ["eight", "ate"] },
  { text: "Leo’s heart was beating fast.", key: "heart", swap: ["heart", "hart"] },
  { text: "Look at the plane in the sky!", key: "plane", swap: ["plane", "plain"] },
  { text: "Ellie made a circle with the stones.", key: "circle", swap: ["circle", "sircle"] },
  { text: "Is your address on the letter?", key: "address", swap: ["address", "adress"] },
];

export const END_MARKS = [".", "?", "!"];
export const QUESTIONS_PER_CHALLENGE = 5;

/** The sentence's words (the last without its end mark) and its end mark. */
export function partsOf(text) {
  const words = tokenise(text);
  const mark = words[words.length - 1].slice(-1);
  words[words.length - 1] = words[words.length - 1].slice(0, -1);
  return { words, mark };
}

/** The same sentence with one word changed (the swap), keeping its punctuation. */
export function withSwap(text, [right, wrong]) {
  return tokenise(text)
    .map((token) => (bareWord(token) === right.toLowerCase() ? token.replace(right, wrong) : token))
    .join(" ");
}

const toggleCase = (word) =>
  word[0] === word[0].toUpperCase() ? word[0].toLowerCase() + word.slice(1) : word[0].toUpperCase() + word.slice(1);

/**
 * Level 1's punctuation mistake: a lower-case first letter for even items, a
 * wrong end mark for odd ones (a statement becomes a question, a question or
 * an exclamation a statement or a question).
 */
export function punctuationSlip(text, index) {
  if (index % 2 === 0) return toggleCase(text);
  const { mark } = partsOf(text);
  const swapped = mark === "." ? "?" : mark === "?" ? "." : "?";
  return text.slice(0, -1) + swapped;
}

function chooseQuestion(item, rng) {
  const index = DICTATION_ITEMS.indexOf(item);
  const spelling = withSwap(item.text, item.swap);
  const slip = punctuationSlip(item.text, index);
  return { kind: "choose", text: item.text, answer: item.text, struck: slip, options: shuffle([item.text, spelling, slip], rng) };
}

/** Level 2: the sentence with its key word blanked; the punctuation round it stays. */
function typeQuestion(item) {
  const tokens = tokenise(item.text);
  const at = tokens.findIndex((token) => bareWord(token) === item.key);
  const token = tokens[at];
  const start = token.toLowerCase().indexOf(item.key);
  const head = tokens.slice(0, at).join(" ");
  const tail = tokens.slice(at + 1).join(" ");
  return {
    kind: "type",
    text: item.text,
    before: `${head}${head ? " " : ""}${token.slice(0, start)}`,
    after: `${token.slice(start + item.key.length)}${tail ? " " : ""}${tail}`,
    answer: item.key,
    hint: `${item.key[0]}${" _".repeat(item.key.length - 1)}`,
  };
}

function tilesFor(words, extra) {
  return [...words, ...extra].map((label, index) => ({ id: `t${index}`, label }));
}

function buildQuestion(item, rng) {
  const { words, mark } = partsOf(item.text);
  const wrongWord = words[words.findIndex((word) => bareWord(word) === item.swap[0].toLowerCase())].replace(item.swap[0], item.swap[1]);
  const tiles = shuffle(tilesFor(words, [wrongWord, ...END_MARKS]), rng);
  return { kind: "build", text: item.text, tiles, answer: [...words, mark], swap: item.swap };
}

function writeQuestion(item, rng) {
  const { words, mark } = partsOf(item.text);
  const wrongWord = words[words.findIndex((word) => bareWord(word) === item.swap[0].toLowerCase())].replace(item.swap[0], item.swap[1]);
  const firstVariant = toggleCase(words[0]);
  const tiles = shuffle(tilesFor(words, [wrongWord, firstVariant, ...END_MARKS]), rng);
  return { kind: "write", text: item.text, tiles, answer: [...words, mark], wordCount: words.length };
}

export function buildDictationQuestions(level, rng) {
  const items = sample(DICTATION_ITEMS, QUESTIONS_PER_CHALLENGE, rng);
  if (level === 1) return items.map((item) => chooseQuestion(item, rng));
  if (level === 2) return items.map(typeQuestion);
  if (level === 3) return items.map((item) => buildQuestion(item, rng));
  if (level === 4) return items.map((item) => writeQuestion(item, rng));
  throw new Error(`no dictation level ${level}`);
}

/** Tiles are compared by what they say, so two "the" tiles are interchangeable. */
export function isBuiltCorrectly(question, placed) {
  const labels = placed.map((id) => question.tiles.find((tile) => tile.id === id)?.label);
  return labels.length === question.answer.length && labels.every((label, index) => label === question.answer[index]);
}

/** How a built sentence reads: words spaced, the end mark hugging the last word. */
export function readBuilt(labels) {
  return labels.join(" ").replace(/\s+([,.?!])/g, "$1").replace(/“\s+/g, "“").replace(/\s+”/g, "”");
}
