import { assertJsonData, isRecord, isText, isPositiveInteger, isTimestamp, isUuid, requireJourney } from "./curriculumJourneyData.js";
import { validateJourneyModel } from "./curriculumJourneyModels.js";

const only = (value, keys) => Object.keys(value).every((key) => keys.includes(key));
const uniqueIds = (items) => Array.isArray(items) && items.length > 0 && items.length <= 30
  && items.every((item) => isRecord(item) && only(item, ["id", "label"]) && isText(item.id, 120) && isText(item.label, 1000)) && new Set(items.map((i) => i.id)).size === items.length;
export function validateAssessmentInput(input) {
  requireJourney(isRecord(input), "INVALID_INPUT");
  const common = ["kind", "label"];
  const allowed = { choice: ["options"], number: ["maxDigits", "signed", "decimalPlaces"], text: ["maxLength", "characters"],
    order: ["cards"], sort: ["cards", "bins"], fractionShade: ["parts"], numberTrack: ["denominator", "wholes"] };
  requireJourney(Object.hasOwn(allowed, input.kind) && only(input, [...common, ...allowed[input.kind]]), "INVALID_INPUT");
  requireJourney(input.label === undefined || isText(input.label, 200), "INVALID_INPUT");
  let valid = false;
  switch (input.kind) {
    case "choice": valid = uniqueIds(input.options) && input.options.length >= 2; break;
    case "number": valid = isPositiveInteger(input.maxDigits) && input.maxDigits <= 15
      && (input.decimalPlaces === undefined || Number.isInteger(input.decimalPlaces) && input.decimalPlaces >= 0 && input.decimalPlaces <= 6)
      && (input.signed === undefined || typeof input.signed === "boolean"); break;
    case "text": valid = isPositiveInteger(input.maxLength) && input.maxLength <= 120
      && (input.characters === undefined || Array.isArray(input.characters) && input.characters.length <= 80 && input.characters.every((c) => isText(c, 2))); break;
    case "order": valid = uniqueIds(input.cards) && input.cards.length >= 2; break;
    case "sort": valid = uniqueIds(input.cards) && uniqueIds(input.bins) && input.bins.length <= 5; break;
    case "fractionShade": valid = isPositiveInteger(input.parts) && input.parts <= 24; break;
    case "numberTrack": valid = isPositiveInteger(input.denominator) && input.denominator <= 20 && isPositiveInteger(input.wholes) && input.wholes <= 5; break;
  }
  requireJourney(valid, "INVALID_INPUT");
  return input;
}

export function validatePublicAssessmentItem(item) {
  requireJourney(isRecord(item) && isText(item.prompt, 2000) && Array.isArray(item.evidence) && item.evidence.length <= 10
    && item.evidence.every((e) => isRecord(e) && only(e, ["title", "text", "credit"]) && isText(e.text, 12000) && (e.credit === undefined || isText(e.credit))), "INVALID_ASSESSMENT_ITEM");
  validateAssessmentInput(item.input);
  if (item.model !== null) validateJourneyModel(item.model);
  requireJourney(isRecord(item.speech) && only(item.speech, item.speech.mode === "none" ? ["mode"] : ["mode", "text", "lang"]) && ["none", "prompt"].includes(item.speech.mode)
    && (item.speech.mode === "none" || isText(item.speech.text, 12000) && ["en-GB", "fr-FR"].includes(item.speech.lang)), "INVALID_SPEECH");
  requireJourney(!Object.keys(item).some((k) => !["prompt", "evidence", "model", "input", "speech"].includes(k)), "INVALID_ASSESSMENT_ITEM");
  assertJsonData(item, 60000);
  return item;
}

export function normaliseAssessmentResponse(item, response) {
  requireJourney(isRecord(response) && ["answer", "skip"].includes(response.kind)
    && only(response, response.kind === "skip" ? ["kind"] : ["kind", "value"]), "INVALID_RESPONSE");
  if (response.kind === "skip") return { kind: "skip" };
  const input = item.input;
  let value = response.value;
  let valid = false;
  switch (input.kind) {
    case "choice": valid = input.options.some((o) => o.id === value); break;
    case "number": {
      if (typeof value === "string") value = value.trim();
      valid = typeof value === "string" && /^-?\d+(?:\.\d+)?$/.test(value) && Number.isFinite(Number(value))
        && (input.signed || !value.startsWith("-")) && value.replace(/\D/g, "").length <= input.maxDigits
        && (value.split(".")[1]?.length ?? 0) <= (input.decimalPlaces ?? 0);
      break;
    }
    case "text": valid = typeof value === "string" && value.trim().length > 0 && value.length <= input.maxLength;
      if (valid) value = value.normalize("NFC"); break;
    case "order": valid = Array.isArray(value) && value.length === input.cards.length && new Set(value).size === value.length
      && value.every((id) => input.cards.some((card) => card.id === id)); break;
    case "sort": valid = Array.isArray(value) && value.length === input.cards.length && new Set(value.map((v) => v?.cardId)).size === value.length
      && value.every((v) => isRecord(v) && only(v, ["cardId", "binId"]) && input.cards.some((c) => c.id === v.cardId) && input.bins.some((b) => b.id === v.binId));
      if (valid) value = [...value].sort((a, b) => a.cardId.localeCompare(b.cardId)); break;
    case "fractionShade": valid = Array.isArray(value) && value.length <= input.parts && new Set(value).size === value.length
      && value.every((v) => Number.isInteger(v) && v >= 0 && v < input.parts);
      if (valid) value = [...value].sort((a, b) => a - b); break;
    case "numberTrack": valid = Number.isInteger(value) && value >= 0 && value <= input.denominator * input.wholes; break;
  }
  requireJourney(valid, "INVALID_RESPONSE");
  return { kind: "answer", value: structuredClone(value) };
}

export function validateAssessmentScoring(item) {
  const { scoring, public: visible } = item;
  const expected = { choice: ["exact"], number: ["number"], text: ["text"], order: ["order"], sort: ["sort"], fractionShade: ["count", "set"], numberTrack: ["exact"] };
  requireJourney(isRecord(scoring) && expected[visible.input.kind].includes(scoring.kind) && Array.isArray(scoring.accepted)
    && scoring.accepted.length > 0 && scoring.accepted.length <= 20 && only(scoring, ["kind", "accepted", "caseSensitive", "normaliseApostrophes"]), "INVALID_SCORING");
  for (const value of scoring.accepted) {
    if (scoring.kind === "count") requireJourney(Number.isInteger(value) && value >= 0 && value <= visible.input.parts, "INVALID_SCORING");
    else normaliseAssessmentResponse(visible, { kind: "answer", value: scoring.kind === "number" ? String(value) : value });
  }
  return item;
}

export function validateAssessmentCandidate(item) {
  requireJourney(isRecord(item) && isText(item.id, 200) && isPositiveInteger(item.version) && isText(item.categoryId, 200)
    && isText(item.topicId, 200) && isText(item.objective, 600) && Array.isArray(item.sourceRefs) && item.sourceRefs.length > 0
    && item.sourceRefs.every((r) => isText(r.path, 300) && r.path.startsWith("docs/curriculum/") && isText(r.heading, 300))
    && isRecord(item.review) && isText(item.review.answerText) && isText(item.review.explanation, 4000)
    && item.practice?.topicId === item.topicId && isPositiveInteger(item.practice.challengeId), "INVALID_ASSESSMENT_ITEM");
  validatePublicAssessmentItem(item.public);
  validateAssessmentScoring(item);
  assertJsonData(item, 90000);
  return item;
}

export function readAssessmentDocument(doc) {
  requireJourney(isRecord(doc) && doc.schemaVersion === 1 && isUuid(doc.sessionId) && isPositiveInteger(doc.definitionVersion)
    && ["active", "completed"].includes(doc.status) && Number.isSafeInteger(doc.revision) && doc.revision >= 0
    && Array.isArray(doc.items) && doc.items.length > 0 && doc.items.length <= 256 && Array.isArray(doc.responses)
    && doc.responses.length <= doc.items.length && isTimestamp(doc.createdAt) && isTimestamp(doc.updatedAt), "INVALID_ASSESSMENT");
  const ids = new Set();
  for (const item of doc.items) {
    requireJourney(isUuid(item.itemInstanceId) && !ids.has(item.itemInstanceId), "INVALID_ASSESSMENT"); ids.add(item.itemInstanceId);
    validateAssessmentCandidate({ ...item, id: item.candidateId, version: item.candidateVersion });
  }
  const submissions = new Set();
  doc.responses.forEach((r, index) => {
    requireJourney(isRecord(r) && r.itemInstanceId === doc.items[index].itemInstanceId && isUuid(r.submissionId) && !submissions.has(r.submissionId)
      && ["correct", "incorrect", "skipped"].includes(r.outcome) && isTimestamp(r.submittedAt), "INVALID_ASSESSMENT");
    submissions.add(r.submissionId);
    const response = normaliseAssessmentResponse(doc.items[index].public, r.response);
    requireJourney((response.kind === "skip") === (r.outcome === "skipped"), "INVALID_ASSESSMENT");
  });
  requireJourney(doc.status !== "completed" || doc.responses.length === doc.items.length && isTimestamp(doc.completedAt) && isRecord(doc.summary), "INVALID_ASSESSMENT");
  return structuredClone({ ...doc, ...(doc._id !== undefined ? { _id: String(doc._id) } : {}), childId: String(doc.childId) });
}

export function publicAssessmentDocument(doc, { summaryOnly = false } = {}) {
  const valid = readAssessmentDocument(doc);
  const result = { _id: String(valid._id), sessionId: valid.sessionId, childId: String(valid.childId), year: valid.year, subject: valid.subject,
    kind: valid.kind, categoryId: valid.categoryId, schemaVersion: 1, definitionVersion: valid.definitionVersion,
    revision: valid.revision, status: valid.status, createdAt: valid.createdAt, updatedAt: valid.updatedAt,
    completedAt: valid.completedAt, summary: valid.summary, total: valid.items.length, savedResponses: valid.responses.length };
  if (!summaryOnly) {
    const answered = new Set(valid.responses.map((r) => r.itemInstanceId));
    result.items = valid.items.map((item) => ({ itemInstanceId: item.itemInstanceId, candidateId: item.candidateId,
      candidateVersion: item.candidateVersion, categoryId: item.categoryId, topicId: item.topicId, objective: item.objective,
      public: item.public, practice: { topicId: item.practice.topicId, challengeId: item.practice.challengeId },
      ...(answered.has(item.itemInstanceId) ? { review: { answerText: item.review.answerText, explanation: item.review.explanation } } : {}) }));
    result.responses = valid.responses.map(({ itemInstanceId, submissionId, response, outcome, submittedAt }) =>
      ({ itemInstanceId, submissionId, response, outcome, submittedAt }));
  }
  return result;
}

export function readPublicAssessmentDocument(doc, { summaryOnly = false } = {}) {
  requireJourney(isRecord(doc) && isText(doc._id, 200) && isText(doc.childId, 200) && isUuid(doc.sessionId)
    && Number.isSafeInteger(doc.year) && isText(doc.subject, 100) && ["quest", "subject"].includes(doc.kind)
    && (doc.kind === "quest" ? isText(doc.categoryId, 200) : doc.categoryId === null)
    && doc.schemaVersion === 1 && isPositiveInteger(doc.definitionVersion) && Number.isSafeInteger(doc.revision) && doc.revision >= 0
    && ["active", "completed"].includes(doc.status) && isPositiveInteger(doc.total) && doc.total <= 256
    && Number.isInteger(doc.savedResponses) && doc.savedResponses >= 0 && doc.savedResponses <= doc.total
    && isTimestamp(doc.createdAt) && isTimestamp(doc.updatedAt), "INVALID_RESPONSE");
  const keys = ["_id", "sessionId", "childId", "year", "subject", "kind", "categoryId", "schemaVersion", "definitionVersion", "revision", "status",
    "createdAt", "updatedAt", "completedAt", "summary", "total", "savedResponses", ...(summaryOnly ? [] : ["items", "responses"])];
  requireJourney(only(doc, keys), "INVALID_RESPONSE");
  if (doc.status === "completed") {
    const s = doc.summary;
    requireJourney(isTimestamp(doc.completedAt) && doc.savedResponses === doc.total && isRecord(s)
      && ["total", "answered", "correct", "incorrect", "skipped", "remaining"].every((k) => Number.isInteger(s[k]) && s[k] >= 0)
      && s.total === doc.total && s.answered === s.correct + s.incorrect && s.total === s.answered + s.skipped && s.remaining === 0
      && Array.isArray(s.byTopic), "INVALID_RESPONSE");
  } else requireJourney(doc.summary === null && doc.completedAt === null, "INVALID_RESPONSE");
  if (!summaryOnly) {
    requireJourney(Array.isArray(doc.items) && doc.items.length === doc.total && Array.isArray(doc.responses)
      && doc.responses.length === doc.savedResponses, "INVALID_RESPONSE");
    const answered = new Set(doc.responses.map((r) => r.itemInstanceId));
    for (const item of doc.items) {
      requireJourney(isRecord(item) && only(item, ["itemInstanceId", "candidateId", "candidateVersion", "categoryId", "topicId", "objective", "public", "practice", "review"])
        && isUuid(item.itemInstanceId) && isText(item.topicId, 200) && isText(item.categoryId, 200) && isText(item.candidateId, 200)
        && isPositiveInteger(item.candidateVersion) && isText(item.objective, 600) && isRecord(item.practice)
        && item.practice.topicId === item.topicId && isPositiveInteger(item.practice.challengeId), "INVALID_RESPONSE");
      validatePublicAssessmentItem(item.public);
      requireJourney(answered.has(item.itemInstanceId) ? isRecord(item.review) && isText(item.review.answerText)
        && isText(item.review.explanation, 4000) && only(item.review, ["answerText", "explanation"]) : item.review === undefined, "INVALID_RESPONSE");
    }
    const ids = new Set();
    doc.responses.forEach((r, i) => {
      requireJourney(isRecord(r) && only(r, ["itemInstanceId", "submissionId", "response", "outcome", "submittedAt"])
        && r.itemInstanceId === doc.items[i].itemInstanceId && isUuid(r.submissionId) && !ids.has(r.submissionId)
        && isTimestamp(r.submittedAt) && ["correct", "incorrect", "skipped"].includes(r.outcome), "INVALID_RESPONSE");
      ids.add(r.submissionId); normaliseAssessmentResponse(doc.items[i].public, r.response);
      requireJourney((r.response.kind === "skip") === (r.outcome === "skipped"), "INVALID_RESPONSE");
    });
  }
  return structuredClone(doc);
}
