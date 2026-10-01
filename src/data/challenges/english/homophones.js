import { HOMOPHONES_Y3 } from "../../english/homophones.js";
import { bareWord, sample, shuffle, tokenise } from "./shared.js";

/**
 * Year 3 Homophones: four challenges, five questions each.
 *
 *   1 pick   picture + meaning → choose the spelling (rule shown)
 *   2 sort   sort meaning cards into the words of one group (inferred)
 *   3 fix    tap the wrong homophone in a sentence (whole sentence)
 *   4 type   hear or read a sentence, type the missing word (applied)
 *
 * Every question comes from a different group, so one run never asks about
 * "meat" twice.
 */
export const QUESTIONS_PER_CHALLENGE = 5;

/** The sentence with the blank filled, for the speak button. */
export function fillBlank(sentence, word) {
  return sentence.replace("___", word);
}

/** "m _ _ _": the first letter and how many letters, as the level 4 hint. */
export function letterHint(word) {
  return [word[0], ...Array.from(word.slice(1), () => "_")].join(" ");
}

function pickQuestion(group, rng) {
  const [entry] = sample(group, 1, rng);
  return {
    kind: "pick",
    emoji: entry.emoji,
    meaning: entry.meaning,
    options: shuffle(group.map((item) => item.word), rng),
    answer: entry.word,
    spoken: fillBlank(entry.sentences[0], entry.word),
  };
}

function sortQuestion(group, rng) {
  const cards = group.flatMap((item) =>
    item.clues.slice(0, 2).map((clue, index) => ({
      id: `${item.word}-${index}`,
      label: clue,
      bin: item.word,
    }))
  );
  return {
    kind: "sort",
    bins: group.map((item) => ({ id: item.word, label: item.word })),
    cards: shuffle(cards, rng),
  };
}

/**
 * A sentence with the WRONG homophone in the blank. `hinted` holds three
 * token indices (the wrong one and two others) for the after-two-misses hint:
 * it narrows the search without giving the answer away.
 */
export function fixQuestion(group, rng) {
  const [entry] = sample(group, 1, rng);
  const [sentence] = sample(entry.sentences, 1, rng);
  const [wrong] = sample(group.filter((item) => item !== entry), 1, rng);
  const tokens = tokenise(fillBlank(sentence, wrong.word));
  const wrongIndex = tokens.findIndex((token) => bareWord(token) === wrong.word);
  const others = tokens
    .map((token, index) => index)
    .filter((index) => index !== wrongIndex && bareWord(tokens[index]).length > 2);
  const hinted = new Set([wrongIndex, ...sample(others, Math.min(2, others.length), rng)]);
  return { kind: "fix", tokens, wrongIndex, wrong: wrong.word, correct: entry.word, hinted };
}

function typeQuestion(group, rng) {
  const [entry] = sample(group, 1, rng);
  const [sentence] = sample(entry.sentences, 1, rng);
  return {
    kind: "type",
    emoji: entry.emoji,
    sentence,
    answer: entry.word,
    spoken: fillBlank(sentence, entry.word),
    hint: letterHint(entry.word),
  };
}

const BUILDERS = { 1: pickQuestion, 2: sortQuestion, 3: fixQuestion, 4: typeQuestion };

export function buildHomophoneQuestions(level, rng, bank = HOMOPHONES_Y3) {
  const build = BUILDERS[level];
  if (!build) throw new Error(`no homophones level ${level}`);
  return sample(bank, QUESTIONS_PER_CHALLENGE, rng).map((group) => build(group, rng));
}

/** Level 2: every card is in the bin its word owns. */
export function isSortCorrect(question, placement) {
  return question.cards.every((card) => placement[card.id] === card.bin);
}
