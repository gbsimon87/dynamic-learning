import { ch, bd, ty, some } from "../topicBank.js";

export const int = (rng, lo, hi) => lo + Math.floor(rng() * (hi - lo + 1));
export const pick = (rng, items) => items[int(rng, 0, items.length - 1)];
/** `count` times, give back a new copy of `templates` (each a function, so each copy draws fresh numbers). */
export const times = (count, make) => Array.from({ length: count }, (_, i) => make(i));

/** A program shown as monospace lines. Lines may start with spaces to show what is inside a loop or an if. */
export const program = (title, lines) => ({ title, kind: "code", blocks: lines.map((text) => ({ type: "line", text })) });
/** Extra fields that show `lines` as a program and stop the voice reading symbols. */
export const showing = (title, lines, extra = {}) => ({ passage: program(title, lines), readTextAloud: false, ...extra });

/** Wrong numbers near `answer` (never below `min`, never the answer), as strings. */
export function nearNumbers(rng, answer, count = 3, min = 0) {
  const candidates = [answer + 1, answer - 1, answer + 2, answer - 2, answer + 3, answer * 2, answer + 5, answer - 3, answer + 10];
  return some(rng, [...new Set(candidates)].filter((n) => n >= min && n !== answer), count).map(String);
}
/** A choice about a program whose answer is a number. */
export const numberChoice = (rng, prompt, answer, title, lines, min = 0) => ch(prompt, String(answer), nearNumbers(rng, answer, 3, min), showing(title, lines));

/**
 * The shape of a topic that teaches ideas and words.
 *   terms    [word, plain meaning] pairs; every meaning must be different
 *   apart    pairs of words that must never be offered together (one meaning could fit both)
 *   facts    extra choice questions for level 1      scenes   choice questions for level 4
 *   builds   true sentences to build from tiles       sorts, orders, gens   other templates
 */
export function termTopic({ rule, hint, subject, terms, apart = [], facts = [], sorts = [], orders = [], builds = [], scenes = [], gens = {} }) {
  const clash = (a, b) => apart.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
  const others = (term) => terms.filter(([t]) => t !== term && !clash(t, term));
  return {
    rule, hint,
    levels: {
      1: [
        ...terms.map(([t, d]) => (rng) => ch(`What does **${t}** mean?`, d, some(rng, others(t).map((r) => r[1]), 3))),
        ...facts, ...(gens[1] ?? []),
      ],
      2: [
        ...terms.map(([t, d]) => (rng) => ch(`Which word matches this meaning? ${d}`, t, some(rng, others(t).map((r) => r[0]), 3))),
        ...sorts, ...(gens[2] ?? []),
      ],
      3: [
        ...builds.map((sentence) => bd(`Put the tiles in order to make a true sentence about ${subject}.`, sentence)),
        ...sorts, ...orders, ...(gens[3] ?? []),
      ],
      4: [
        ...scenes,
        ...terms.filter(([t]) => /^[a-z]+$/i.test(t)).map(([t, d]) => ty(`Type the word that matches this meaning: ${d}`, t)),
        ...(gens[4] ?? []),
      ],
    },
  };
}
