import { shuffle, tiles, order } from "../year1Math/shared.js";

/**
 * Year 1 Science is authored as banks of question templates. A topic is
 *
 *   { banks: { name: [template, ...] }, levels: { 1: [bank × 5], ... } }
 *
 * and `buildTopic` turns it into `build(level, rng)` for DataChallenge. Each
 * run draws templates WITHOUT replacement, so a bank used n times in a level
 * needs at least n templates (the tests check), and randomness comes only
 * from the injected rng. A template is plain data, or `(rng) => template`
 * when it is generated (charts, day lengths).
 *
 * Template types (`type`), all taking `prompt`, `hint`, `picture` +
 * `pictureLabel`, `visual` and `rule`:
 *   choice  answer, wrong: [...]          tap one of 3 (level 1) or 4 options
 *   sort    bins: [{id,label}], cards: [[label, binId]], take?
 *   build   answer; letters: true spells it from letter tiles, otherwise
 *           word tiles build a sentence. extra?: distractor tiles
 *   type    answer (one short word)        spelled on the letter keyboard
 *   order   labels in the right order
 *   number  answer (whole number)
 *   chart   a ready-made chart question
 */

const COMMON = ["prompt", "hint", "picture", "pictureLabel", "visual", "rule"];
const common = (t) => Object.fromEntries(COMMON.filter((k) => t[k] !== undefined).map((k) => [k, t[k]]));

/** Picks `take` cards so that every bin gets at least one. */
function sortCards(rng, template, take) {
  const pool = shuffle(rng, template.cards);
  // A bin with no cards is left empty here, and lintBuild reports it as "empty bin".
  const chosen = template.bins.map((bin) => pool.find(([, id]) => id === bin.id)).filter(Boolean);
  for (const card of pool) if (chosen.length < take && !chosen.includes(card)) chosen.push(card);
  return shuffle(rng, chosen).map(([label, bin], i) => ({ id: `card-${i}`, label, bin }));
}

export function makeQuestion(template, rng, level) {
  const t = typeof template === "function" ? template(rng) : template;
  switch (t.type) {
    case "choice": {
      const count = Math.min(t.count ?? (level === 1 ? 3 : 4), t.wrong.length + 1);
      const options = shuffle(rng, [t.answer, ...shuffle(rng, t.wrong).slice(0, count - 1)]);
      return { kind: "choice", ...common(t), options, answer: t.answer, variant: "wordy" };
    }
    case "sort": {
      const take = Math.min(t.take ?? (level <= 2 ? 4 : 6), t.cards.length);
      return { kind: "sort", ...common(t), bins: t.bins, cards: sortCards(rng, t, take) };
    }
    case "build": {
      // Letter tiles spell a science word; word tiles build a short sentence.
      const parts = t.letters ? [...t.answer] : t.answer.split(" ");
      const placed = tiles(rng, [...parts, ...(t.extra ?? [])], Boolean(t.letters));
      return { kind: "build", ...common(t), tiles: placed, answer: t.answer, ...(t.letters ? { letters: true } : {}) };
    }
    case "type":
      return { kind: "type", ...common(t), answer: t.answer, maxLength: 12, apostrophe: false };
    case "order":
      return { ...order(rng, t.prompt, t.labels), ...common(t) };
    case "number":
      return { kind: "number", ...common(t), answer: t.answer, maxDigits: 2 };
    case "chart":
      return { kind: "chart", ...common(t), chart: t.chart, answer: t.answer, ask: t.ask, ...(t.options ? { options: t.options } : {}) };
    default:
      throw new Error(`unknown template type "${t.type}"`);
  }
}

export function buildTopic({ banks, levels }) {
  return (level, rng) => {
    const decks = {};
    const draw = (name) => {
      if (!banks[name]) throw new Error(`unknown bank "${name}"`);
      decks[name] ??= shuffle(rng, banks[name]);
      const next = decks[name].shift();
      if (!next) throw new Error(`bank "${name}" ran out`);
      return next;
    };
    return levels[level].map((name) => makeQuestion(draw(name), rng, level));
  };
}

/** Shorthand for choice templates: c(prompt, answer, wrong, extra). */
export const c = (prompt, answer, wrong, extra = {}) => ({ type: "choice", prompt, answer, wrong, ...extra });

/** Spell a word from letter tiles, with a picture to name. */
export const spell = (answer, picture, pictureLabel, prompt = "Make the word with the letter tiles.") =>
  ({ type: "build", letters: true, answer, picture, pictureLabel, prompt, hint: `It starts with **${answer[0]}** and has ${answer.length} letters.` });

/** Type a word on the letter keyboard. */
export const typed = (prompt, answer, extra = {}) =>
  ({ type: "type", prompt, answer, hint: `It starts with **${answer[0]}** and has ${answer.length} letters.`, ...extra });

/** A sort template. cards: [[label, binId]]. */
export const sorter = (prompt, bins, cards, extra = {}) =>
  ({ type: "sort", prompt, bins: bins.map(([id, label]) => ({ id, label })), cards, ...extra });
