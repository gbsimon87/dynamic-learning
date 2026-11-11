import { practiceTopic, practiceVocabulary, practiceExample } from "./catalogue.js";
export { ALL_PRACTICE_TOPICS, PRACTICE_YEARS, practiceTopics, practiceSubjects, PRACTICE_TOPICS, PRACTICE_SUBJECTS, practiceKey, practiceTopic, practiceVocabulary, practiceExample, searchPracticeTopics } from "./catalogue.js";
import { curriculumPaperPool } from "./curriculumPaper.js";
import { englishPaperPool } from "./english.js";
import { sciencePaperPool } from "./science.js";
import { humanitiesPaperPool } from "./humanities.js";
import { shuffleValues } from "../challenges/placeValue3Digit.js";
import { pilotPracticePool, PILOT_IDS } from "./mathPilot.js";
import { numberPaperPool } from "./mathNumber.js";
import { fractionPaperPool } from "./mathFractions.js";
import { measurementPaperPool } from "./mathMeasurement.js";
import { geometryStatisticsPaperPool } from "./mathGeometryStatistics.js";
export function practicePool(id) {
  const topic = practiceTopic(id);
  if (!topic) return [];
  const raw = topic.topicId;
  let pool;
  if (topic.year !== 3) pool = ["geography", "history"].includes(topic.subject) ? humanitiesPaperPool(topic.subject, raw, topic.year) : curriculumPaperPool(topic);
  else if (topic.subject === "math") pool = PILOT_IDS.includes(raw) ? pilotPracticePool(raw) : [...numberPaperPool(raw), ...fractionPaperPool(raw), ...measurementPaperPool(raw), ...geometryStatisticsPaperPool(raw)];
  else if (topic.subject === "english") pool = englishPaperPool(raw);
  else if (topic.subject === "science") pool = sciencePaperPool(raw);
  else pool = humanitiesPaperPool(topic.subject, raw);
  const unique = new Map();
  for (const item of pool) {
    const q = item.model?.type === "fraction-bars" && item.model.bars.some((bar) => bar.shaded > bar.parts) ? { ...item, model: null } : item;
    const previous = unique.get(q.id);
    unique.set(q.id, { ...q, year: topic.year, subject: topic.subject, topicId: id, curriculumTopicId: raw, modes: [...new Set([...(previous?.modes ?? []), q.mode])] });
  }
  return [...unique.values()];
}

const POOLS = new Map();
export function questionsForTopic(topicId, mix = "mixed") {
  if (!POOLS.has(topicId)) POOLS.set(topicId, practicePool(topicId));
  return POOLS.get(topicId).filter((q) => mix === "mixed" || q.mode === mix || q.modes?.includes(mix));
}
export function createPracticeQuestions({ topicIds, count = 8, mix = "mixed", rng = Math.random }) {
  if (!topicIds.length || topicIds.length > 3 || new Set(topicIds).size !== topicIds.length || topicIds.some((id) => !practiceTopic(id))) throw new RangeError("Choose between one and three supported topics.");
  if (new Set(topicIds.map((id) => practiceTopic(id).year)).size > 1) throw new RangeError("Choose topics from the same year.");
  if (![4, 8, 12, 16].includes(count) || !["mixed", "practice", "application"].includes(mix)) throw new RangeError("Choose a supported question count and mix.");
  const banks = topicIds.map((id) => {
    if (mix !== "mixed") return shuffleValues(questionsForTopic(id, mix), rng);
    const practice = shuffleValues(questionsForTopic(id, "practice"), rng);
    const application = shuffleValues(questionsForTopic(id, "application"), rng);
    return Array.from({ length: Math.max(practice.length, application.length) }, (_, n) => [practice[n], application[n]].filter(Boolean)).flat();
  });
  const result = [];
  const used = new Set();
  const rounds = Math.max(...banks.map((bank) => bank.length));
  for (let round = 0; round < rounds && result.length < count; round++) for (const bank of banks) {
    if (result.length === count) break;
    if (bank[round] && !used.has(bank[round].id)) { result.push(bank[round]); used.add(bank[round].id); }
  }
  // A finite bank can run out. Return the actual count; never repeat a question.
  return result;
}
export function replacePracticeQuestion(questions, id, mix, rng = Math.random) {
  const original = questions.find((q) => q.id === id);
  if (!original) return null;
  const used = new Set(questions.map((q) => q.id));
  const candidates = questionsForTopic(original.topicId, mix).filter((q) => !used.has(q.id));
  const replacement = candidates[Math.floor(rng() * candidates.length)];
  return replacement ? questions.map((q) => q.id === id ? replacement : q) : null;
}

function paperModelUnits(model) {
  if (!model) return 0;
  if (model.type === "curriculum-source") {
    // Short word/number tasks can share a page; long extracts and diagrams need more room.
    const text = model.lines.join(" ");
    const reading = text ? 2 + Math.ceil(text.length / 180) : 0;
    const visual = model.visual ? ["paper-shapes", "objects", "blocks", "groups"].includes(model.visual.type) ? 5 : 8 : model.picture ? 3 : 0;
    const table = model.table ? 3 + model.table.rows.length * 2 : 0;
    const chart = model.chart ? 4 + model.chart.rows.length * 2 : 0;
    return Math.max(3, reading + visual + table + chart);
  }
  return ["geography-source", "history-source", "reading"].includes(model.type) ? 26 : ["bar-chart", "data-table", "pictogram"].includes(model.type) ? 14 : ["blocks", "clock", "solid", "angles", "jug", "dial-scale"].includes(model.type) ? 10 : 6;
}

export function paginatePractice({ questions, showModels = false, extraSpace = false, examples = false, vocabulary = false }) {
  const topicIds = [...new Set(questions.map((q) => q.topicId))];
  const items = [];
  if (vocabulary && topicIds.length) items.push({ type: "vocabulary", words: [...new Set(topicIds.flatMap((id) => practiceVocabulary(id).split(" · ")))].join(" · "), units: 5 });
  if (examples) for (const topicId of topicIds) { const example = practiceExample(topicId); if (example) items.push({ type: "example", topicId, example, units: example.reminder ? 22 : 16 }); }
  questions.forEach((q, index) => {
    const model = q.model && (q.model.essential || showModels) ? q.model : null;
    const units = Math.min(34, 8 + (extraSpace || q.largeWorking ? 8 : 0) + paperModelUnits(model));
    items.push({ type: "question", question: q, number: index + 1, model, units });
  });
  const pages = [];
  let current = [], used = 0;
  for (const item of items) {
    if (used + item.units > 34 && current.length) { pages.push(current); current = []; used = 0; }
    current.push(item); used += item.units;
  }
  if (current.length) pages.push(current);
  return pages;
}

export function paginatePracticeAnswers(questions) {
  const pages = [];
  let current = [], used = 0;
  questions.forEach((question, index) => {
    const units = 3 + Math.ceil(question.prompt.length / 90) + Math.ceil(question.answer.length / 90) + Math.ceil(question.reason.length / 90);
    if (current.length && (used + units > 36 || current.length >= 6)) { pages.push(current); current = []; used = 0; }
    current.push({ question, number: index + 1 }); used += units;
  });
  if (current.length) pages.push(current);
  return pages;
}
