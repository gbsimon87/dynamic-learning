import { shuffle } from "./shared.js";

/**
 * The question shapes the Year 3 reading topics share, built by the topic
 * modules and drawn by `ReadingTopicGame.jsx`. Pure; no React.
 *
 *   choice  { prompt, text?, focus?, emoji?, passage?, list?, options, answer, hint, para? }
 *           `text` is a short text shown in a reading box, `focus` one line
 *           shown large, `list` a contents page or index ({ title, kind,
 *           rows: [{ label, page }] }), `para` the passage blocks the hint
 *           outlines. The hint also strikes out one wrong option when three
 *           or more remain.
 *   pick    { prompt, tokens, variant?, answer, hinted, hint }
 *           tap one token of a sentence (variant "" ) or one sentence of a
 *           short text (variant "sentences"). `answer` is a token index.
 *   lines   { prompt, title?, lines: string[][], answer: "line:word", hinted, hint }
 *           tap one word of a poem, laid out line by line.
 *   sort    { prompt, text?, bins, cards: [{ id, label, bin }], hint }
 *   order   { prompt, items: [{ id, label }], answer: ids in order, hint }
 *
 * Every question carries its own `hint`: the words a child sees after two
 * misses. A hint narrows; it never names the answer.
 */

export function choiceQuestion({ answer, wrong, rng, ...rest }) {
  return { kind: "choice", ...rest, answer, options: shuffle([answer, ...wrong], rng) };
}

export function isSortCorrect(question, placement) {
  return question.cards.every((card) => placement[card.id] === card.bin);
}

export function isOrderCorrect(question, items) {
  return items.map((item) => item.id).join("|") === question.answer.join("|");
}

/** A shuffled copy that is never already in the right order. */
export function shuffledOrder(items, rng) {
  const out = shuffle(items, rng);
  if (items.length > 1 && out.every((item, index) => item === items[index])) {
    return [...items.slice(1), items[0]];
  }
  return out;
}

/**
 * Indices to underline as a hint: the answer plus `extra` other candidates,
 * so the hint narrows the search without pointing at one token.
 */
export function hintedWith(answer, candidates, rng, extra = 1) {
  const others = shuffle(candidates.filter((candidate) => candidate !== answer), rng).slice(0, extra);
  return shuffle([answer, ...others], rng);
}

/** "Bracketed" sentence → tokens and the index of the [bracketed] token. */
export function markedTokens(sentence) {
  const tokens = sentence.trim().split(/\s+/);
  const answer = tokens.findIndex((token) => /\[.+\]/.test(token));
  return { tokens: tokens.map((token) => token.replace(/[[\]]/g, "")), answer };
}

/**
 * What would make a built question unanswerable or unfair, as a list of
 * strings (empty when it is sound). The topic tests run every built
 * question through this.
 */
export function questionProblems(question) {
  const problems = [];
  const need = (ok, message) => {
    if (!ok) problems.push(message);
  };
  need(typeof question.prompt === "string" && question.prompt.trim(), "no prompt");
  need(typeof question.hint === "string" && question.hint.trim(), "no hint");

  if (question.kind === "choice") {
    need(question.options.length >= 2, "fewer than 2 options");
    need(new Set(question.options).size === question.options.length, "repeated option");
    need(question.options.filter((option) => option === question.answer).length === 1, "answer not offered exactly once");
  } else if (question.kind === "pick") {
    need(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < question.tokens.length, "answer is not a token");
    need(question.hinted.includes(question.answer) && question.hinted.length >= 2, "hint must underline the answer and another");
  } else if (question.kind === "lines") {
    const keys = question.lines.flatMap((line, l) => line.map((_, w) => `${l}:${w}`));
    need(keys.includes(question.answer), "answer is not a word of the poem");
    need(question.hinted.includes(question.answer) && question.hinted.length >= 2, "hint must underline the answer and another");
  } else if (question.kind === "sort") {
    const binIds = question.bins.map((bin) => bin.id);
    need(question.cards.every((card) => binIds.includes(card.bin)), "card for a missing bin");
    need(new Set(question.cards.map((card) => card.id)).size === question.cards.length, "repeated card id");
    need(new Set(question.cards.map((card) => card.label)).size === question.cards.length, "repeated card label");
    need(binIds.every((id) => question.cards.some((card) => card.bin === id)), "empty bin");
  } else if (question.kind === "order") {
    const ids = question.items.map((item) => item.id);
    need([...ids].sort().join("|") === [...question.answer].sort().join("|"), "answer ids differ from items");
    need(ids.join("|") !== question.answer.join("|"), "already in order");
    need(new Set(question.items.map((item) => item.label)).size === ids.length, "repeated label");
  } else {
    problems.push(`unknown kind ${question.kind}`);
  }
  return problems;
}

/** Every piece of text a question shows, for the British-spelling checks. */
export function questionText(question) {
  return [
    question.prompt,
    question.hint,
    question.text,
    question.focus,
    question.title,
    ...(question.options ?? []),
    ...(question.tokens ?? []),
    ...(question.lines ?? []).flat(),
    ...(question.cards ?? []).map((card) => card.label),
    ...(question.bins ?? []).map((bin) => bin.label),
    ...(question.items ?? []).map((item) => item.label),
    ...(question.list?.rows ?? []).map((row) => row.label),
    question.list?.title,
  ]
    .filter(Boolean)
    .join(" ");
}
