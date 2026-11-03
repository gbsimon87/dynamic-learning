import { shuffle, tiles, order } from "./year1Math/shared.js";

/**
 * Authoring helpers for a topic bank of data questions (see questionKinds.js).
 *
 * A topic is `{ rule?, hint?, levels: { 1: pool, 2: pool, 3: pool, 4: pool } }`.
 * A pool is an array of entries; an entry is a question template made with
 * `ch`, `bd`, `od`, `st`, `ty`, `nm` or `pk`, or a function `(rng) => template
 * | template[] | null` that makes one (so a number or a distractor can change
 * per run). `buildTopic` returns `(level, rng) => five questions`, drawn
 * without repeats, with options and tiles shuffled by `rng`, so a challenge
 * differs every time it is played while a test with a seeded rng does not.
 *
 * Pure: no React, no storage.
 */
export const ch = (prompt, answer, wrong, extra = {}) => ({ kind: "choice", prompt, answer, wrong, ...extra });
/** Build from tiles. `more` adds distractor tiles; `letters` builds a word from letters. */
export const bd = (prompt, answer, extra = {}) => ({ kind: "build", prompt, answer, ...extra });
export const od = (prompt, labels, extra = {}) => ({ kind: "order", prompt, labels, ...extra });
export const st = (prompt, bins, cards, extra = {}) => ({
  kind: "sort", prompt,
  bins: bins.map((label, i) => ({ id: `bin-${i}`, label })),
  cards: cards.map(([label, bin], i) => ({ id: `card-${i}`, label, bin: `bin-${bin}` })),
  ...extra,
});
export const ty = (prompt, answer, extra = {}) => ({ kind: "type", prompt, answer, maxLength: Math.max(answer.length + 2, 6), ...extra });
export const nm = (prompt, answer, extra = {}) => ({ kind: "number", prompt, answer, maxDigits: 3, ...extra });
export const pk = (prompt, tokens, answer, extra = {}) => ({ kind: "pick", prompt, tokens, answer, ...extra });

export const TITLES = ["Learn the idea", "Spot the pattern", "Put it together", "Use it"];

/** Up to `limit` of `items` at random, never one equal to `not`. */
export const some = (rng, items, limit, not = []) => shuffle(rng, items.filter((item) => !not.includes(item))).slice(0, limit);

function prepare(template, rng, maxCards) {
  const q = { ...template };
  if (q.kind === "choice") {
    q.options = shuffle(rng, [q.answer, ...q.wrong]);
    q.variant = q.variant ?? "wordy";
    delete q.wrong;
  } else if (q.kind === "build") {
    const labels = q.letters ? [...q.answer] : q.answer.split(" ");
    q.tiles = tiles(rng, [...labels, ...(q.more ?? [])], Boolean(q.letters));
    delete q.more;
  } else if (q.kind === "order") {
    Object.assign(q, order(rng, q.prompt, q.labels));
    q.direction = q.direction ?? "vertical";
    delete q.labels;
  } else if (q.kind === "sort") {
    // Sample cards, keeping at least one in every bin.
    const pool = shuffle(rng, q.cards);
    const chosen = q.bins.map((bin) => pool.find((card) => card.bin === bin.id));
    for (const card of pool) if (chosen.length < maxCards && !chosen.includes(card)) chosen.push(card);
    q.cards = shuffle(rng, chosen);
  }
  return q;
}

const keyOf = (q) => JSON.stringify([
  q.kind, q.prompt, q.sentence, q.text, q.equation, q.passage?.blocks?.map((b) => b.text),
  q.answer, q.tokens, q.cards?.map((c) => c.label).sort(), q.items?.map((i) => i.label), q.options?.slice().sort(),
]);

/** Five distinct questions from `pool`. */
export function draw(pool, count, rng, maxCards = 6) {
  const out = [];
  const seen = new Set();
  for (const entry of shuffle(rng, pool)) {
    if (out.length >= count) break;
    const made = typeof entry === "function" ? entry(rng) : entry;
    for (const template of [made].flat()) {
      if (!template || out.length >= count) continue;
      const q = prepare(template, rng, maxCards);
      const key = keyOf(q);
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(q);
    }
  }
  if (out.length < count) throw new Error(`pool gave ${out.length} questions, ${count} needed`);
  return out;
}

export function buildTopic(topic) {
  return (level, rng = Math.random) => {
    if (![1, 2, 3, 4].includes(level)) throw new RangeError("level must be 1–4");
    return draw(topic.levels[level], 5, rng).map((q) => ({
      ...q,
      ...(level === 1 && topic.rule ? { rule: topic.rule } : {}),
      ...(level === 1 && topic.visual && !q.visual ? { visual: topic.visual } : {}),
      hint: q.hint ?? topic.hint,
    }));
  };
}
