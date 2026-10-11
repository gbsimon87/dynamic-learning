import { shuffle, tiles, order } from "../year1Math/shared.js";
import { isCorrect } from "../questionKinds.js";
import { normaliseAnswer } from "../english/shared.js";

// Authored scientific content, randomised only by an injected RNG. No storage.
export const fact = (prompt, answer, ...wrong) => ({ kind: "choice", prompt, answer, wrong });
export const sequence = (prompt, labels, extra = {}) => ({ kind: "order", prompt, labels, ...extra });
export const sentence = (prompt, answer, extra = {}) => ({ kind: "build", prompt, answer, ...extra });
export const groups = (prompt, bins, cards, extra = {}) => ({ kind: "sort", prompt,
  bins: bins.map((label, i) => ({ id: `bin-${i}`, label })),
  cards: cards.map(([label, bin], i) => ({ id: `card-${i}`, label, bin: `bin-${bin}` })), ...extra });
export const measurement = (prompt, answer, extra = {}) => ({ kind: "number", prompt, answer, maxDigits: 3, ...extra });

// These tasks assess science, rather than punctuation or a preferred prose order.
// Alternatives are reviewed in the authored bank; never accept arbitrary shuffles.
const scienceText = text => normaliseAnswer(text).replace(/[.,]/g, "");
export function isScienceAnswerCorrect(q, response) {
  if (q.kind !== "build") return isCorrect(q, response);
  if (!Array.isArray(response) || response.length !== q.tiles.length || new Set(response).size !== response.length) return false;
  const labels = response.map(id => q.tiles.find(tile => tile.id === id)?.label);
  if (labels.some(label => label === undefined)) return false;
  const text = scienceText(labels.join(" "));
  return [q.answer, ...(q.alternatives ?? [])].some(answer => scienceText(answer) === text);
}

function prepare(template, rng) {
  const q = { ...template };
  if (q.kind === "choice") {
    q.options = shuffle(rng, [q.answer, ...q.wrong]);
    q.variant = "wordy";
    delete q.wrong;
  } else if (q.kind === "sort") {
    // Keep at least one card in every bin, then sample up to six without replacement.
    const pool = shuffle(rng, q.cards);
    const chosen = q.bins.map(b => pool.find(c => c.bin === b.id));
    for (const card of pool) if (chosen.length < 6 && !chosen.includes(card)) chosen.push(card);
    q.cards = shuffle(rng, chosen);
  } else if (q.kind === "order") {
    Object.assign(q, order(rng, q.prompt, q.labels));
    q.direction = "vertical";
    delete q.labels;
  } else if (q.kind === "build") {
    q.tiles = tiles(rng, q.answer.split(" "));
  }
  return q;
}

export const TITLES = ["Explore the idea", "Compare and classify", "Build the science", "Use the evidence"];
export function buildTopic(topic) {
  return (level, rng = Math.random) => {
    if (![1, 2, 3, 4].includes(level)) throw new RangeError("Science level must be 1–4");
    const draw = (bank, count) => shuffle(rng, bank).slice(0, count).map(t => prepare(t, rng));
    const questions = level === 1 ? draw(topic.facts, 5)
      : level === 2 ? [...draw(topic.facts, 3), ...draw(topic.sorts, 2)]
      : level === 3 ? [...draw(topic.sorts, 2), ...draw(topic.structures, 3)]
      : [...draw(topic.enquiries.filter(q => q.kind === "choice" || q.kind === "number"), 3),
        ...draw(topic.enquiries.filter(q => q.kind !== "choice" && q.kind !== "number"), 2)];
    return questions.map(q => ({ ...q,
      ...(level === 1 ? { rule: topic.rule } : {}),
      ...(level === 1 && topic.visual && !q.visual ? { visual: topic.visual } : {}),
      hint: q.hint ?? topic.hint,
      speak: q.prompt,
    }));
  };
}
