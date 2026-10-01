import { sample, shuffle, tokenise } from "./shared.js";

/**
 * Year 3 Inverted Commas: Appendix 2, "Introduction to inverted commas to
 * punctuate direct speech". Terms: direct speech, inverted commas (or
 * "speech marks").
 *
 *   1 said     the marks are shown: which words did the character say?
 *   2 sort     which sentences need inverted commas? (inferred)
 *   3 gaps     tap the gap for the opening mark, then for the closing one
 *   4 choose   pick the sentence punctuated correctly (no gloss)
 *
 * The comma after the reporting clause and the end punctuation INSIDE the
 * marks are Year 4. The sentences are written correctly, so they carry those
 * marks, but no question turns on them: every option in level 4 has the same
 * commas and full stops and differs only in where “ and ” go, and in level 3
 * the closing gap is after the spoken words' last token, punctuation and all.
 */
export const OPEN = "“";
export const CLOSE = "”";

/** One speaker, one stretch of speech, a reporting clause before or after it. */
export const SPEECH_ITEMS = [
  { who: "Leo", before: "Leo said,", speech: "I love playing football." },
  { who: "Priya", speech: "Can we go to the park?", after: "asked Priya." },
  { who: "Ellie", before: "Ellie shouted,", speech: "Biscuit, come back!" },
  { who: "Zayn", speech: "It is my turn,", after: "said Zayn." },
  { who: "Amara", before: "Amara asked,", speech: "How do rockets fly?" },
  { who: "Leo", speech: "Look at that rainbow!", after: "cried Leo." },
  { who: "Priya", before: "Priya whispered,", speech: "I can see an owl." },
  { who: "Ellie", speech: "Where is my other sock?", after: "asked Ellie." },
  { who: "Zayn", speech: "I have finished my drawing,", after: "said Zayn." },
  { who: "Leo", before: "Leo asked,", speech: "Do you want to hear a joke?" },
  { who: "Priya", speech: "Watch me climb!", after: "shouted Priya." },
  { who: "Amara", before: "Amara said,", speech: "The Moon goes around the Earth." },
  { who: "Leo", speech: "Please may I have a biscuit?", after: "asked Leo." },
  { who: "Ellie", before: "Ellie laughed and said,", speech: "Biscuit has my shoe again!" },
  { who: "Amara", speech: "That was the best day ever,", after: "said Amara." },
  { who: "Zayn", before: "Zayn asked,", speech: "Can I borrow your red pencil?" },
  { who: "Ellie", speech: "Hurry up, everyone!", after: "called Ellie." },
  { who: "Priya", before: "Priya said,", speech: "My favourite colour is purple." },
  { who: "Leo", speech: "I can hear thunder,", after: "said Leo." },
  { who: "Amara", before: "Amara shouted,", speech: "We won the match!" },
  { who: "Zayn", speech: "Who wants to play tag?", after: "asked Zayn." },
  { who: "Ellie", before: "Ellie asked,", speech: "Have you seen Biscuit?" },
];

/**
 * Level 2: sentences about speaking that do NOT give the exact words, so they
 * need no inverted commas.
 */
export const NO_SPEECH_SENTENCES = [
  "Leo told a funny joke.",
  "Priya said that she was hungry.",
  "Ellie called Biscuit, but he did not come.",
  "Zayn asked if he could borrow a pencil.",
  "Amara talked about rockets all day.",
  "Leo shouted for his dad.",
  "Priya whispered to Amara during the film.",
  "Zayn asked his teacher for help.",
  "Amara said that the Moon goes around the Earth.",
  "Leo told Ellie that Biscuit had his shoe.",
  "Priya sang a song about the sea.",
  "Ellie asked whether they could go to the park.",
  "Biscuit barked at the postman.",
];

export const QUESTIONS_PER_CHALLENGE = 5;

/** Tokens of the whole sentence, and where the spoken words start and end. */
export function layout(item) {
  const before = item.before ? tokenise(item.before) : [];
  const speech = tokenise(item.speech);
  const after = item.after ? tokenise(item.after) : [];
  const tokens = [...before, ...speech, ...after];
  return { tokens, start: before.length, end: before.length + speech.length - 1 };
}

/** The sentence with “ before token `open` and ” after token `close`. */
export function punctuate(tokens, open, close) {
  return tokens
    .map((token, index) => `${index === open ? OPEN : ""}${token}${index === close ? CLOSE : ""}`)
    .join(" ");
}

export function correctSentence(item) {
  const { tokens, start, end } = layout(item);
  return punctuate(tokens, start, end);
}

export const plainSentence = (item) => layout(item).tokens.join(" ");

const reportingWords = (item) => (item.before ?? item.after).replace(/[,.]$/, "");
const spokenWords = (item) => item.speech.replace(/,$/, "");

function saidQuestion(item, rng) {
  const options = [spokenWords(item), reportingWords(item), plainSentence(item)];
  return {
    kind: "said",
    who: item.who,
    sentence: correctSentence(item),
    answer: options[0],
    struck: options[1],
    options: shuffle(options, rng),
  };
}

export const SORT_BINS = [
  { id: "needs", label: "💬 needs inverted commas" },
  { id: "none", label: "✋ does not need them" },
];

function buildSortQuestions(rng) {
  const speech = sample(SPEECH_ITEMS, QUESTIONS_PER_CHALLENGE * 2, rng);
  const none = sample(NO_SPEECH_SENTENCES, QUESTIONS_PER_CHALLENGE * 2, rng);
  return Array.from({ length: QUESTIONS_PER_CHALLENGE }, (_, index) => {
    const cards = [
      ...speech.slice(index * 2, index * 2 + 2).map((item, n) => ({ id: `n${n}`, label: plainSentence(item), bin: "needs" })),
      ...none.slice(index * 2, index * 2 + 2).map((label, n) => ({ id: `x${n}`, label, bin: "none" })),
    ];
    return { kind: "sort", bins: SORT_BINS, cards: shuffle(cards, rng) };
  });
}

/** Level 3: the opening mark goes in gap `start`, the closing one in gap `end + 1`. */
function gapsQuestion(item) {
  const { tokens, start, end } = layout(item);
  return { kind: "gaps", who: item.who, tokens, openGap: start, closeGap: end + 1 };
}

/**
 * Level 4 options. Every one has the same words, commas and full stops; only
 * the marks move: around the right words; around the reporting clause;
 * around everything; or closed one word too early.
 */
export function placements(item) {
  const { tokens, start, end } = layout(item);
  const last = tokens.length - 1;
  const reporting = item.before ? [0, start - 1] : [end + 1, last];
  return {
    answer: punctuate(tokens, start, end),
    wrong: [punctuate(tokens, ...reporting), punctuate(tokens, 0, last), punctuate(tokens, start, end - 1)],
  };
}

function chooseQuestion(item, rng) {
  const { answer, wrong } = placements(item);
  return { kind: "choose", who: item.who, answer, struck: wrong[1], options: shuffle([answer, ...wrong], rng) };
}

export function buildInvertedCommasQuestions(level, rng) {
  if (level === 1) return sample(SPEECH_ITEMS, QUESTIONS_PER_CHALLENGE, rng).map((item) => saidQuestion(item, rng));
  if (level === 2) return buildSortQuestions(rng);
  if (level === 3) return sample(SPEECH_ITEMS, QUESTIONS_PER_CHALLENGE, rng).map(gapsQuestion);
  if (level === 4) return sample(SPEECH_ITEMS, QUESTIONS_PER_CHALLENGE, rng).map((item) => chooseQuestion(item, rng));
  throw new Error(`no inverted commas level ${level}`);
}

export function isSortCorrect(question, placement) {
  return question.cards.every((card) => placement[card.id] === card.bin);
}
