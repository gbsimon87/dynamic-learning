/**
 * Compact authoring helpers for curriculum-journey content.
 *
 * Authors write short, reviewable item/introduction objects; these helpers
 * expand them into the full JSON contract (technical contract §3–§4) with
 * statutory source references from the generated mapping index. Pure and
 * deterministic: no randomness at import time, no React, no DOM.
 *
 * Item shorthand (one of a / n / t / order / sort):
 *   { q, a: "right", d: ["wrong", ...], why }      choice (options shuffled by item ID)
 *   { q, n: 12 | "3.5" | -4, why, unit?, dp?, signed?, digits? }   number
 *   { q, t: "word" | ["word", "alt"], why, caseSensitive?, chars?, max? }   short text
 *   { q, order: ["first", "second", ...], why }   put cards in this order
 *   { q, sort: { bins: ["A", "B"], cards: [["card", "A"], ...] }, why }
 * Optional on every item: model, evidence, say (false | "text"), lang, obj, practice, v.
 */
import { CURRICULUM_JOURNEY_SOURCES } from "./curriculumJourneySources.js";

const LETTERS = "abcdefghijklmnopqrstuvwxyz";
export const FRENCH_CHARACTERS = ["é", "è", "ê", "à", "â", "ç", "ô", "î", "ù", "û", "ë", "ï", "œ"];

function hash(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

/** Seeded shuffle so authored order never decides the correct option's position. */
export function stableShuffle(list, seed) {
  let state = hash(seed) || 1;
  const next = () => { state ^= state << 13; state >>>= 0; state ^= state >>> 17; state ^= state << 5; state >>>= 0; return state / 4294967296; };
  const result = [...list];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const fail = (where, message) => { throw new Error(`${where}: ${message}`); };

export function topicSource(year, subject, topicId) {
  const ref = CURRICULUM_JOURNEY_SOURCES[`${year}/${subject}/${topicId}`];
  if (!ref) fail(`${year}/${subject}/${topicId}`, "no generated statutory source (run npm run journey:manifest -- --write)");
  return { ...ref };
}

function uniqueRefs(refs) {
  const seen = new Set();
  return refs.filter((ref) => { const key = `${ref.path}#${ref.heading}`; if (seen.has(key)) return false; seen.add(key); return true; });
}

function speechFor(item, defaults, where) {
  if (item.say === false) return { mode: "none" };
  const lang = item.lang ?? defaults.lang ?? "en-GB";
  if (typeof item.say === "string") return { mode: "prompt", lang, text: item.say };
  if (item.say !== undefined) fail(where, "say must be false or a string");
  return defaults.speech === "prompt" ? { mode: "prompt", lang, text: item.q } : { mode: "none" };
}

function expandInput(item, topic, where) {
  const kinds = ["a", "n", "t", "order", "sort"].filter((key) => item[key] !== undefined);
  if (kinds.length !== 1) fail(where, "use exactly one of a / n / t / order / sort");
  switch (kinds[0]) {
    case "a": {
      if (!Array.isArray(item.d) || item.d.length < 1 || item.d.length > 5) fail(where, "choice needs 1–5 distractors in d");
      const labels = [String(item.a), ...item.d.map(String)];
      if (new Set(labels.map((l) => l.trim().toLowerCase())).size !== labels.length) fail(where, "choice labels must be distinct");
      const shuffled = stableShuffle(labels, `${where}:options`);
      const options = shuffled.map((label, i) => ({ id: LETTERS[i], label }));
      const correct = options.find((o) => o.label === String(item.a)).id;
      return { input: { kind: "choice", options }, scoring: { kind: "exact", accepted: [correct] }, answerText: String(item.a) };
    }
    case "n": {
      const value = String(item.n);
      if (!/^-?\d+(?:\.\d+)?$/.test(value)) fail(where, `number answer ${value} is not plain decimal notation`);
      const places = (value.split(".")[1] ?? "").length;
      const dp = item.dp ?? topic.dp ?? places;
      if (places > dp) fail(where, "answer has more decimal places than the input allows");
      const digits = value.replace(/\D/g, "").length;
      const maxDigits = item.digits ?? topic.digits ?? Math.max(4, digits + 1);
      if (maxDigits < digits) fail(where, "digits too small for the answer");
      const signed = item.signed ?? topic.signed ?? value.startsWith("-");
      const input = { kind: "number", maxDigits, ...(signed ? { signed: true } : {}), ...(dp ? { decimalPlaces: dp } : {}),
        ...(item.label ?? topic.label ? { label: item.label ?? topic.label } : {}) };
      const unit = item.unit ? ` ${item.unit}` : "";
      return { input, scoring: { kind: "number", accepted: [value] }, answerText: `${value}${unit}` };
    }
    case "t": {
      const accepted = (Array.isArray(item.t) ? item.t : [item.t]).map(String);
      if (!accepted.length || accepted.some((s) => !s.trim())) fail(where, "text answer is empty");
      const characters = item.chars ?? topic.chars;
      const maxLength = item.max ?? Math.min(120, Math.max(20, ...accepted.map((s) => s.length + 10)));
      return { input: { kind: "text", maxLength, ...(characters ? { characters } : {}), ...(item.label ? { label: item.label } : {}) },
        scoring: { kind: "text", accepted, caseSensitive: item.caseSensitive ?? false, normaliseApostrophes: true }, answerText: accepted[0] };
    }
    case "order": {
      const labels = item.order.map(String);
      if (labels.length < 2 || labels.length > 8 || new Set(labels).size !== labels.length) fail(where, "order needs 2–8 distinct cards");
      const ids = labels.map((_, i) => `c${i + 1}`);
      let shown = stableShuffle(ids, `${where}:cards`);
      if (shown.every((id, i) => id === ids[i])) shown = [...shown.slice(1), shown[0]];
      return { input: { kind: "order", cards: shown.map((id) => ({ id, label: labels[ids.indexOf(id)] })) },
        scoring: { kind: "order", accepted: [ids] }, answerText: labels.join(" → ") };
    }
    case "sort": {
      const { bins, cards } = item.sort;
      if (!Array.isArray(bins) || bins.length < 2 || bins.length > 5 || !Array.isArray(cards) || cards.length < 2 || cards.length > 10) fail(where, "sort needs 2–5 bins and 2–10 cards");
      const binIds = bins.map((_, i) => `b${i + 1}`);
      const cardIds = cards.map((_, i) => `k${i + 1}`);
      const shown = stableShuffle(cardIds, `${where}:cards`);
      const assignments = cards.map(([label, bin], i) => {
        const index = bins.indexOf(bin);
        if (index < 0) fail(where, `card ${label} names unknown bin ${bin}`);
        return { cardId: cardIds[i], binId: binIds[index] };
      });
      return { input: { kind: "sort", bins: bins.map((label, i) => ({ id: binIds[i], label })),
        cards: shown.map((id) => ({ id, label: cards[cardIds.indexOf(id)][0] })) },
      scoring: { kind: "sort", accepted: [assignments] }, answerText: cards.map(([label, bin]) => `${label}: ${bin}`).join("; ") };
    }
  }
  return null;
}

/**
 * @param {{year:number, subject:string, version?:number, speech?:"prompt"|"none", lang?:string,
 *   quests: Record<string, Record<string, {objective:string, practice?:number, items:object[]}>>}} spec
 */
export function defineAssessmentBank({ year, subject, version = 1, speech = ["english", "french"].includes(subject) ? "none" : "prompt", lang = "en-GB", quests }) {
  const items = [];
  for (const [categoryId, topics] of Object.entries(quests)) {
    for (const [topicId, topic] of Object.entries(topics)) {
      const where = `${year}/${subject}/${topicId}`;
      if (!topic || typeof topic.objective !== "string" || !Array.isArray(topic.items)) fail(where, "topic needs objective and items");
      const source = topicSource(year, subject, topicId);
      topic.items.forEach((item, index) => {
        const id = `${topicId}.${item.id ?? index + 1}`;
        const at = `${where}#${index + 1}`;
        if (typeof item.q !== "string" || typeof item.why !== "string") fail(at, "item needs q and why");
        const { input, scoring, answerText } = expandInput(item, topic, id);
        items.push({
          id, version: item.v ?? 1, categoryId, topicId,
          objective: item.obj ?? topic.objective,
          sourceRefs: [source],
          public: { prompt: item.q, evidence: item.evidence ?? [], model: item.model ?? null, input,
            speech: speechFor(item, { speech, lang }, at) },
          scoring,
          review: { answerText, explanation: item.why },
          practice: { topicId, challengeId: item.practice ?? topic.practice ?? 1 },
        });
      });
    }
  }
  return { version, year, subject, quests: Object.keys(quests), final: true, items };
}

function expandIntroduction(intro, sources, where) {
  if (!intro || typeof intro.title !== "string" || !Array.isArray(intro.learn) || typeof intro.use !== "string"
    || typeof intro.ex !== "string" || !intro.model) fail(where, "introduction needs title, learn, use, ex and model");
  return { version: intro.v ?? 1, title: intro.title, learning: intro.learn, usefulness: intro.use,
    example: { text: intro.ex, model: intro.model }, sources };
}

/**
 * @param {{year:number, subject:string, subjectIntro:object,
 *   quests: Record<string, {intro:object, topics: Record<string, object>}>}} spec
 */
export function defineIntroductions({ year, subject, subjectIntro, quests }) {
  const questEntries = Object.entries(quests);
  const topicRefs = (topics) => Object.keys(topics).map((topicId) => topicSource(year, subject, topicId));
  const subjectSources = uniqueRefs(questEntries.flatMap(([, quest]) => topicRefs(quest.topics))).slice(0, 3);
  return {
    year, subject,
    subjectIntroduction: expandIntroduction(subjectIntro, subjectSources, `${year}/${subject}/subject`),
    quests: Object.fromEntries(questEntries.map(([categoryId, quest]) => [categoryId, {
      introduction: expandIntroduction(quest.intro, uniqueRefs(topicRefs(quest.topics)).slice(0, 3), `${year}/${subject}/quest:${categoryId}`),
      topics: Object.fromEntries(Object.entries(quest.topics).map(([topicId, intro]) => [topicId,
        expandIntroduction(intro, [topicSource(year, subject, topicId)], `${year}/${subject}/topic:${topicId}`)])),
    }])),
  };
}
