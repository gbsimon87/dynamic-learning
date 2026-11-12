import { readJourneyDocument, requireJourney } from "../../../shared/curriculumJourneyData.js";
import { readAssessmentDocument } from "../../../shared/curriculumAssessmentData.js";

export const JOURNEY_STORAGE_KEYS = { journey: "dl.curriculumJourney", assessments: "dl.curriculumAssessments" };

export function createLocalCurriculumJourneyStore({ readCollection, writeCollection, withCollectionLock,
  uuid = () => globalThis.crypto.randomUUID(), now = () => new Date().toISOString(), ...dependencies }) {
  const read = (key) => readCollection(key, true);
  const write = (key, docs) => requireJourney(writeCollection(key, docs), "JOURNEY_SAVE_FAILED", 503);
  const matches = (doc, key) => doc.childId === key.childId && doc.year === key.year && doc.subject === key.subject;
  const repository = {
    async getJourney(key) {
      return readJourneyDocument(read(JOURNEY_STORAGE_KEYS.journey).find((d) => matches(d, key)) ?? null);
    },
    async mergeJourney(key, merge) {
      return withCollectionLock(JOURNEY_STORAGE_KEYS.journey, () => {
        const docs = read(JOURNEY_STORAGE_KEYS.journey);
        const current = docs.find((d) => matches(d, key)) ?? null;
        const data = merge(current);
        if (current && JSON.stringify(current.data) === JSON.stringify(data)) return current;
        const at = now();
        const doc = { ...current, ...key, _id: current?._id ?? uuid(), schemaVersion: 1,
          revision: (current?.revision ?? 0) + 1, data, createdAt: current?.createdAt ?? at, updatedAt: at };
        write(JOURNEY_STORAGE_KEYS.journey, current ? docs.map((d) => d === current ? doc : d) : [...docs, doc]);
        return structuredClone(doc);
      });
    },
    async getSession(childId, sessionId) {
      const doc = read(JOURNEY_STORAGE_KEYS.assessments).find((d) => d.childId === childId && d.sessionId === sessionId);
      return doc ? readAssessmentDocument(doc) : null;
    },
    async listSessions(key) { return read(JOURNEY_STORAGE_KEYS.assessments).filter((d) => matches(d, key)).map(readAssessmentDocument); },
    async insertSession(session) {
      return withCollectionLock(JOURNEY_STORAGE_KEYS.assessments, () => {
        const docs = read(JOURNEY_STORAGE_KEYS.assessments);
        const previous = docs.find((d) => d.childId === session.childId && d.sessionId === session.sessionId);
        if (previous) return readAssessmentDocument(previous);
        const doc = { ...session, _id: uuid() };
        write(JOURNEY_STORAGE_KEYS.assessments, [...docs, doc]);
        return structuredClone(doc);
      });
    },
    async transitionSession(key, sessionId, transition) {
      return withCollectionLock(JOURNEY_STORAGE_KEYS.assessments, () => {
        const docs = read(JOURNEY_STORAGE_KEYS.assessments);
        const current = docs.find((d) => matches(d, key) && d.sessionId === sessionId);
        requireJourney(current, "SESSION_NOT_FOUND", 404);
        const next = transition(current);
        if (next !== current) write(JOURNEY_STORAGE_KEYS.assessments, docs.map((d) => d === current ? next : d));
        return structuredClone(next);
      });
    },
  };
  // The service (and the manifest/content loaders it needs) loads on first use,
  // so the eager store bundle stays small while the feature is off.
  let service = null;
  const load = async () => {
    if (!service) {
      const { createCurriculumJourneyService } = await import("../../../shared/curriculumJourneyService.js");
      service = createCurriculumJourneyService(repository, { ...dependencies, uuid, now });
    }
    return service;
  };
  return Object.fromEntries(LOCAL_JOURNEY_METHODS.map((name) => [name, async (...args) => (await load())[name](...args)]));
}

const LOCAL_JOURNEY_METHODS = ["getCurriculumJourney", "acknowledgeCurriculumIntroductions", "getCurriculumAssessmentOverview",
  "listCurriculumAssessments", "startCurriculumAssessment", "getCurriculumAssessment", "submitCurriculumAssessmentResponse",
  "finishCurriculumAssessment"];
