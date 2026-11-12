import { assertJsonData, isPositiveInteger, isUuid, requireJourney, validateAssessmentScope } from "./curriculumJourneyData.js";
import { normaliseAssessmentResponse, readAssessmentDocument, validateAssessmentCandidate } from "./curriculumAssessmentData.js";

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const shuffle = (pool, rng) => {
  const result = [...pool];
  for (let i = result.length - 1; i > 0; i--) {
    const value = rng(); requireJourney(Number.isFinite(value) && value >= 0 && value < 1, "INVALID_RANDOM");
    const j = Math.floor(value * (i + 1)); [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};
const fingerprint = (item) => JSON.stringify(item.public);

export function selectAssessmentItems(pathway, bank, { kind, categoryId, previous = null, rng = Math.random }) {
  validateAssessmentScope(pathway, kind, categoryId);
  requireJourney(bank && isPositiveInteger(bank.version) && Array.isArray(bank.items) && Array.isArray(bank.quests)
    && (kind === "subject" ? bank.final === true : bank.quests.includes(categoryId)), "CONTENT_UNAVAILABLE", 503);
  const ids = new Set();
  for (const item of bank.items) {
    validateAssessmentCandidate(item);
    const topic = pathway.categories.find((q) => q.id === item.categoryId)?.topics.find((t) => t.id === item.topicId);
    requireJourney(topic && topic.challengeIds.includes(item.practice.challengeId) && !ids.has(item.id), "INVALID_CONTENT"); ids.add(item.id);
  }
  const used = new Set(previous?.items.map((i) => i.candidateId) ?? []);
  const chosen = [];
  const seen = new Set();
  const pick = (pool, count) => {
    const candidates = shuffle(pool, rng).sort((a, b) => Number(used.has(a.id)) - Number(used.has(b.id)));
    for (const item of candidates) {
      if (count === 0) break;
      const key = fingerprint(item);
      if (seen.has(key)) continue;
      chosen.push(item); seen.add(key); count--;
    }
    requireJourney(count === 0, "INSUFFICIENT_ITEMS", 503);
  };
  for (const quest of pathway.categories.filter((q) => kind === "subject" || q.id === categoryId)) {
    if (kind === "quest") for (const topic of quest.topics) pick(bank.items.filter((i) => i.categoryId === quest.id && i.topicId === topic.id), 1);
    else {
      const topics = shuffle(quest.topics, rng);
      if (topics.length === 1) pick(bank.items.filter((i) => i.categoryId === quest.id), 2);
      else for (const topic of topics.slice(0, 2)) pick(bank.items.filter((i) => i.categoryId === quest.id && i.topicId === topic.id), 1);
    }
  }
  requireJourney(chosen.length > 0 && chosen.length <= 256, "INSUFFICIENT_ITEMS", 503);
  return structuredClone(shuffle(chosen, rng));
}

function scaledDecimal(value, places) {
  const text = String(value);
  const negative = text.startsWith("-");
  const [whole, fraction = ""] = text.replace(/^-/, "").split(".");
  return BigInt(`${whole}${fraction.padEnd(places, "0")}`) * (negative ? -1n : 1n);
}

export function scoreAssessmentResponse(item, rawResponse) {
  const response = normaliseAssessmentResponse(item.public, rawResponse);
  if (response.kind === "skip") return "skipped";
  const { value } = response;
  const { scoring } = item;
  const correct = scoring.accepted.some((expected) => {
    switch (scoring.kind) {
      case "exact": return value === expected;
      case "number": return scaledDecimal(value, item.public.input.decimalPlaces ?? 0) === scaledDecimal(expected, item.public.input.decimalPlaces ?? 0);
      case "text": {
        const normalise = (s) => {
          let text = s.normalize("NFC").trim().replace(/\s+/g, " ");
          if (scoring.normaliseApostrophes) text = text.replace(/[’‘]/g, "'");
          return scoring.caseSensitive === false ? text.toLocaleLowerCase("en-GB") : text;
        };
        return normalise(value) === normalise(expected);
      }
      case "count": return value.length === expected;
      case "set": return same(value, [...expected].sort((a, b) => a - b));
      case "sort": return same(value, [...expected].sort((a, b) => a.cardId.localeCompare(b.cardId)));
      case "order": return same(value, expected);
      default: return false;
    }
  });
  return correct ? "correct" : "incorrect";
}

export function assessmentSummary(session) {
  const blank = () => ({ total: 0, answered: 0, correct: 0, incorrect: 0, skipped: 0, remaining: 0 });
  const byTopic = [];
  const totals = blank();
  session.items.forEach((item, index) => {
    let topic = byTopic.find((t) => t.categoryId === item.categoryId && t.topicId === item.topicId);
    if (!topic) { topic = { categoryId: item.categoryId, topicId: item.topicId, ...blank() }; byTopic.push(topic); }
    const response = session.responses[index];
    for (const target of [totals, topic]) {
      target.total++;
      if (!response) target.remaining++;
      else { target[response.outcome]++; if (response.outcome !== "skipped") target.answered++; }
    }
  });
  return { ...totals, byTopic };
}

export function createAssessmentSession({ childId, year, subject, sessionId, kind, categoryId }, pathway, bank,
  { previous = null, rng = Math.random, uuid = () => globalThis.crypto.randomUUID(), now = () => new Date().toISOString() } = {}) {
  requireJourney(isUuid(sessionId), "INVALID_SESSION_ID");
  const selected = selectAssessmentItems(pathway, bank, { kind, categoryId, previous, rng });
  const at = now();
  const session = { sessionId, childId, year: Number(year), subject, kind, categoryId, schemaVersion: 1, definitionVersion: bank.version,
    revision: 0, status: "active", items: selected.map(({ id, version, ...item }) => ({ ...item,
      itemInstanceId: uuid(), candidateId: id, candidateVersion: version })), responses: [], summary: null,
    createdAt: at, updatedAt: at, completedAt: null };
  // Excludes Mongo's ObjectId, which is assigned by the store after JSON validation.
  assertJsonData({ ...session, childId: String(childId) });
  readAssessmentDocument(session);
  return session;
}

export function submitAssessmentResponse(doc, action, at = new Date().toISOString()) {
  readAssessmentDocument(doc);
  requireJourney(isUuid(action?.submissionId) && isUuid(action.itemInstanceId), "INVALID_RESPONSE");
  const item = doc.items.find((i) => i.itemInstanceId === action.itemInstanceId);
  requireJourney(item, "INVALID_RESPONSE");
  const response = normaliseAssessmentResponse(item.public, action.response);
  const replay = doc.responses.find((r) => r.submissionId === action.submissionId);
  if (replay) {
    requireJourney(replay.itemInstanceId === action.itemInstanceId && same(replay.response, response), "SUBMISSION_ID_REUSED", 409);
    return doc;
  }
  requireJourney(!doc.responses.some((r) => r.itemInstanceId === action.itemInstanceId), "ITEM_ALREADY_ANSWERED", 409);
  requireJourney(doc.status === "active", "SESSION_COMPLETE", 409);
  requireJourney(action.expectedRevision === doc.revision, "REVISION_CONFLICT", 409);
  requireJourney(doc.items[doc.responses.length]?.itemInstanceId === item.itemInstanceId, "ITEM_OUT_OF_ORDER", 409);
  return { ...doc, revision: doc.revision + 1, updatedAt: at, responses: [...doc.responses,
    { itemInstanceId: item.itemInstanceId, submissionId: action.submissionId, response,
      outcome: scoreAssessmentResponse(item, response), submittedAt: at }] };
}

export function finishAssessmentSession(doc, { expectedRevision }, at = new Date().toISOString()) {
  readAssessmentDocument(doc);
  if (doc.status === "completed") return doc;
  requireJourney(expectedRevision === doc.revision, "REVISION_CONFLICT", 409);
  requireJourney(doc.responses.length === doc.items.length, "INCOMPLETE_ASSESSMENT", 409);
  return { ...doc, status: "completed", revision: doc.revision + 1, updatedAt: at, completedAt: at, summary: assessmentSummary(doc) };
}
