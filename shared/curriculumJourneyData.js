
export function journeyError(code, status = 400) { return Object.assign(new Error(code), { code, status }); }
export const requireJourney = (condition, code = "INVALID_JOURNEY", status = 400) => { if (!condition) throw journeyError(code, status); };
export const isRecord = (value) => value !== null && typeof value === "object" && !Array.isArray(value)
  && [Object.prototype, null].includes(Object.getPrototypeOf(value));
export const isText = (value, max = 2000) => typeof value === "string" && value.trim().length > 0 && value.length <= max;
export const isPositiveInteger = (value) => Number.isSafeInteger(value) && value > 0;
export const isTimestamp = (value) => typeof value === "string" && /^\d{4}-\d\d-\d\dT/.test(value) && Number.isFinite(Date.parse(value));
export const isUuid = (value) => typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);

export function assertJsonData(value, maxBytes = 524288) {
  const visit = (item, depth = 0) => {
    requireJourney(depth <= 20, "INVALID_CONTENT");
    if (item === null || typeof item === "boolean" || typeof item === "string") return;
    if (typeof item === "number") { requireJourney(Number.isFinite(item), "INVALID_CONTENT"); return; }
    requireJourney(Array.isArray(item) || isRecord(item), "INVALID_CONTENT");
    for (const [key, child] of Object.entries(item)) {
      requireJourney(!["__proto__", "constructor", "prototype"].includes(key) && !key.startsWith("$"), "INVALID_CONTENT");
      visit(child, depth + 1);
    }
  };
  visit(value);
  requireJourney(JSON.stringify(value).length <= maxBytes / 3, "CONTENT_TOO_LARGE", 503);
  return value;
}

// Pure lookup; the generated manifest is supplied by curriculumJourneyPathway.js
// so eager modules (the store drivers) never bundle it.
export function findJourneyPathway(year, subject, manifest) {
  requireJourney(Array.isArray(manifest), "INVALID_SCOPE");
  requireJourney(Number.isSafeInteger(Number(year)) && String(Number(year)) === String(year), "INVALID_SCOPE");
  const pathway = manifest.find((p) => p.year === Number(year) && p.subject === subject);
  requireJourney(pathway, "INVALID_SCOPE");
  return pathway;
}

export function journeyScopeIds(pathway) {
  return ["subject", ...pathway.categories.flatMap((q) => [`quest:${q.id}`, ...q.topics.map((t) => `topic:${q.id}:${t.id}`)])];
}

export function validateAssessmentScope(pathway, kind, categoryId) {
  requireJourney(kind === "subject" && categoryId === null || kind === "quest" && pathway.categories.some((q) => q.id === categoryId), "INVALID_SCOPE");
}

export function introductionForScope(content, scopeId) {
  if (scopeId === "subject") return content?.subjectIntroduction ?? null;
  const [kind, categoryId, topicId] = String(scopeId).split(":");
  return kind === "quest" ? content?.quests?.[categoryId]?.introduction ?? null
    : kind === "topic" ? content?.quests?.[categoryId]?.topics?.[topicId] ?? null : null;
}

export function readJourneyDocument(doc) {
  if (doc === null) return null;
  requireJourney(isRecord(doc) && doc.schemaVersion === 1 && isRecord(doc.data) && Array.isArray(doc.data.acknowledged)
    && Number.isSafeInteger(doc.revision) && doc.revision >= 0 && isTimestamp(doc.createdAt) && isTimestamp(doc.updatedAt), "INVALID_JOURNEY");
  const ids = new Set();
  for (const ack of doc.data.acknowledged) {
    requireJourney(isRecord(ack) && isText(ack.scopeId) && isPositiveInteger(ack.contentVersion) && isTimestamp(ack.acknowledgedAt)
      && !ids.has(ack.scopeId), "INVALID_JOURNEY");
    ids.add(ack.scopeId);
  }
  return structuredClone({ ...doc, ...(doc._id !== undefined ? { _id: String(doc._id) } : {}),
    ...(doc.childId !== undefined ? { childId: String(doc.childId) } : {}) });
}

export function mergeIntroductionAcknowledgements(current, acknowledgements, pathway, content, at) {
  requireJourney(Array.isArray(acknowledgements) && acknowledgements.length >= 1 && acknowledgements.length <= 3, "INVALID_ACKNOWLEDGEMENTS");
  requireJourney(isTimestamp(at), "INVALID_ACKNOWLEDGEMENTS");
  const known = new Set(journeyScopeIds(pathway));
  for (const ack of acknowledgements) {
    requireJourney(isRecord(ack) && known.has(ack.scopeId) && isPositiveInteger(ack.contentVersion)
      && introductionForScope(content, ack.scopeId)?.version === ack.contentVersion, "INVALID_ACKNOWLEDGEMENTS");
  }
  const previous = current === null ? { acknowledged: [] } : readJourneyDocument(current).data;
  const seen = new Set(previous.acknowledged.map((a) => a.scopeId));
  const additions = acknowledgements.filter((a) => {
    if (seen.has(a.scopeId)) return false;
    seen.add(a.scopeId); return true;
  }).map((a) => ({ scopeId: a.scopeId, contentVersion: a.contentVersion, acknowledgedAt: at }));
  return additions.length ? { ...previous, acknowledged: [...previous.acknowledged, ...additions] } : previous;
}

export function publicJourneyDocument(doc) {
  if (doc === null) return null;
  const valid = readJourneyDocument(doc);
  return { _id: String(valid._id), childId: String(valid.childId), year: valid.year, subject: valid.subject,
    schemaVersion: 1, revision: valid.revision, data: valid.data, createdAt: valid.createdAt, updatedAt: valid.updatedAt };
}
