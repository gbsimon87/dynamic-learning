import { bareWord, sample, shuffle, tokenise } from "./shared.js";

/**
 * Year 3 Conjunctions: "extending the range of sentences with more than one
 * clause by using a wider range of conjunctions, including: when, if,
 * because, although".
 *
 *   1 spot    tap the conjunction in a sentence (rule shown, words listed)
 *   2 choose  pick the conjunction that makes sense (inferred from meaning)
 *   3 build   build the sentence from clause tiles and one conjunction
 *   4 finish  choose the ending that makes sense after the conjunction
 *             (applied, no gloss)
 *
 * The time-and-cause conjunctions (before, after, while, so) belong to the
 * next topic, Time and Cause Words, so they are never answers here.
 */
export const CONJUNCTIONS = ["when", "if", "because", "although"];

// Words a child could reasonably call "a joining word". A level 1 sentence
// must contain exactly one, or two answers would be right.
const JOINING_WORDS = new Set([
  ...CONJUNCTIONS, "and", "but", "or", "so", "while", "before", "after",
  "until", "unless", "since", "then", "though",
]);

/** Level 1: each has exactly one conjunction and no other joining word. */
export const SPOT_SENTENCES = [
  "Biscuit barks when the doorbell rings.",
  "We can play outside if it stops raining.",
  "Leo was tired because he ran all day.",
  "Priya smiled although she felt nervous.",
  "Amara reads in bed when the house is quiet.",
  "You will feel better if you drink some water.",
  "The plants grew tall because Ellie watered them.",
  "Zayn finished his model although it took hours.",
  "Everyone cheered when the team scored.",
  "Biscuit hides under the table if he hears thunder.",
  "The path was slippery because it had snowed.",
  "We went to the beach although it was cold.",
  "The owl wakes up when the sun goes down.",
  "Your ice lolly will melt if you leave it in the sun.",
  "Leo laughed because Biscuit stole his sock.",
  "Ellie kept going although her legs ached.",
];

/**
 * Levels 2 and 3. `options` are chosen by hand for each sentence: only
 * conjunctions that clearly do NOT make sense are offered beside the answer.
 * ("Biscuit wagged his tail because Ellie came home" is fine English, so
 * "because" is not a wrong option there.)
 */
export const CHOOSE_SENTENCES = [
  { sentence: "Leo wore his coat ___ it was freezing.", answer: "because", wrong: ["although"] },
  { sentence: "Leo wore shorts ___ it was freezing.", answer: "although", wrong: ["because"] },
  { sentence: "We will have a picnic ___ it is sunny tomorrow.", answer: "if", wrong: ["although"] },
  { sentence: "Biscuit wagged his tail ___ Ellie came home.", answer: "when", wrong: ["although"] },
  { sentence: "Priya climbed to the top ___ she was a little scared.", answer: "although", wrong: ["because"] },
  { sentence: "The ice cream melted ___ the sun was hot.", answer: "because", wrong: ["although"] },
  { sentence: "You can borrow my pen ___ you give it back.", answer: "if", wrong: ["although"] },
  { sentence: "Zayn kept drawing ___ his pencil was blunt.", answer: "although", wrong: ["because"] },
  { sentence: "Turn off the light ___ you leave the room.", answer: "when", wrong: ["although"] },
  { sentence: "Amara was happy ___ she won the race.", answer: "because", wrong: ["although"] },
  { sentence: "Amara was happy ___ she lost the race.", answer: "although", wrong: ["because"] },
  { sentence: "Plants die ___ nobody waters them.", answer: "if", wrong: ["although"] },
  { sentence: "The class went quiet ___ the head teacher walked in.", answer: "when", wrong: ["although"] },
  { sentence: "Leo got wet ___ he forgot his umbrella.", answer: "because", wrong: ["although"] },
  { sentence: "Ellie helped her friend ___ she was very busy.", answer: "although", wrong: ["because"] },
  { sentence: "I will call you ___ I get home.", answer: "when", wrong: ["although"] },
];

/**
 * Level 4. `right` fits the conjunction; `opposite` is what the OTHER kind of
 * conjunction would need (a reason instead of a surprise); `unrelated` has
 * nothing to do with the start. The hint strikes out `unrelated`.
 */
export const FINISH_SENTENCES = [
  { start: "Leo was hungry because", right: "he had missed his lunch.", opposite: "he had just eaten a huge lunch.", unrelated: "his kite was red." },
  { start: "Leo was hungry although", right: "he had just eaten a huge lunch.", opposite: "he had missed his lunch.", unrelated: "his kite was red." },
  { start: "Priya’s hands were cold because", right: "she had lost her gloves.", opposite: "she was wearing warm gloves.", unrelated: "the book had ten pages." },
  { start: "Priya’s hands were cold although", right: "she was wearing warm gloves.", opposite: "she had lost her gloves.", unrelated: "the book had ten pages." },
  { start: "We can go to the park if", right: "it stops raining.", opposite: "it never stops raining.", unrelated: "my cat is called Tom." },
  { start: "Your plant will grow if", right: "you give it water and sun.", opposite: "you forget to water it.", unrelated: "the clock struck one." },
  { start: "Biscuit barks when", right: "someone knocks at the door.", opposite: "he is fast asleep.", unrelated: "the river is long." },
  { start: "Amara puts on her sun hat when", right: "it is hot and sunny.", opposite: "it is dark at night.", unrelated: "her pencil breaks." },
  { start: "Zayn finished the race although", right: "he had hurt his foot.", opposite: "he was the fastest runner.", unrelated: "the soup was hot." },
  { start: "Zayn won the race because", right: "he was the fastest runner.", opposite: "he had hurt his foot.", unrelated: "the soup was hot." },
  { start: "The children cheered when", right: "the magician pulled out a rabbit.", opposite: "the show was boring.", unrelated: "the bread is in the cupboard." },
  { start: "You will get wet if", right: "you jump in that puddle.", opposite: "you stay inside all day.", unrelated: "the shop sells hats." },
  { start: "Ellie smiled although", right: "she had just dropped her ice cream.", opposite: "she had just won a prize.", unrelated: "the bus has four wheels." },
  { start: "Ellie smiled because", right: "she had just won a prize.", opposite: "she had just dropped her ice cream.", unrelated: "the bus has four wheels." },
  { start: "The owl hoots when", right: "night falls.", opposite: "it is fast asleep.", unrelated: "the cake is pink." },
  { start: "Biscuit will be sad if", right: "nobody takes him for a walk.", opposite: "he goes for a long walk.", unrelated: "the grass is green." },
];

/** What each conjunction does, for the hints. */
export const MEANINGS = {
  because: "gives a reason: it says WHY",
  although: "shows a surprise: the second part is not what you would expect",
  if: "shows something might happen: it depends on the second part",
  when: "says WHEN something happens",
};

export const QUESTIONS_PER_CHALLENGE = 5;

/** Token indices that are joining words (level 1 must have exactly one). */
export function joiningWordIndices(tokens) {
  return tokens
    .map((token, index) => (JOINING_WORDS.has(bareWord(token)) ? index : -1))
    .filter((index) => index >= 0);
}

function spotQuestion(sentence, rng) {
  const tokens = tokenise(sentence);
  const [answerIndex] = joiningWordIndices(tokens);
  const others = tokens.map((_, index) => index).filter((index) => index !== answerIndex);
  return {
    kind: "spot",
    tokens,
    answerIndex,
    conjunction: bareWord(tokens[answerIndex]),
    hinted: new Set([answerIndex, ...sample(others, 2, rng)]),
  };
}

function chooseQuestion(item, rng) {
  return {
    kind: "choose",
    sentence: item.sentence,
    answer: item.answer,
    options: shuffle([item.answer, ...item.wrong], rng),
  };
}

/** Splits "Leo wore his coat ___ it was freezing." into its two clauses. */
export function clausesOf(sentence) {
  const [main, sub] = sentence.split("___").map((part) => part.trim());
  return { main, sub };
}

function buildQuestion(item, rng) {
  const { main, sub } = clausesOf(item.sentence);
  const tiles = [
    { id: "main", label: main },
    { id: "sub", label: sub },
    { id: "conj", label: item.answer },
    { id: "wrong", label: item.wrong[0] },
  ];
  return {
    kind: "build",
    tiles: shuffle(tiles, rng),
    answerOrder: ["main", "conj", "sub"],
    answer: item.answer,
  };
}

function finishQuestion(item, rng) {
  return {
    kind: "finish",
    start: item.start,
    answer: item.right,
    unrelated: item.unrelated,
    options: shuffle([item.right, item.opposite, item.unrelated], rng),
  };
}

const LEVELS = {
  1: [SPOT_SENTENCES, spotQuestion],
  2: [CHOOSE_SENTENCES, chooseQuestion],
  3: [CHOOSE_SENTENCES, buildQuestion],
  4: [FINISH_SENTENCES, finishQuestion],
};

export function buildConjunctionQuestions(level, rng) {
  const entry = LEVELS[level];
  if (!entry) throw new Error(`no conjunctions level ${level}`);
  const [bank, build] = entry;
  return sample(bank, QUESTIONS_PER_CHALLENGE, rng).map((item) => build(item, rng));
}

/** Level 3: exactly main, the right conjunction, then the other clause. */
export function isBuildCorrect(question, placed) {
  return placed.length === question.answerOrder.length &&
    placed.every((id, index) => id === question.answerOrder[index]);
}
