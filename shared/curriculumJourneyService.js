import { isUuid, requireJourney, validateAssessmentScope, mergeIntroductionAcknowledgements, publicJourneyDocument } from "./curriculumJourneyData.js";
import { getJourneyPathway } from "./curriculumJourneyPathway.js";
import { createAssessmentSession, submitAssessmentResponse, finishAssessmentSession } from "./curriculumAssessmentRules.js";
import { publicAssessmentDocument } from "./curriculumAssessmentData.js";
import { assessmentHistoryPage, assessmentOverview, compareAssessmentHistory, sameAssessmentScope } from "./curriculumAssessmentHistory.js";
import { loadCurriculumIntroductions } from "../src/data/curriculumIntroductions/index.js";
import { loadCurriculumAssessmentBank } from "./curriculumAssessments/index.js";

// Repository mutations must be atomic. Drivers supply collection locks or Mongo
// compare-and-swap; this layer owns one shared protocol and public projection.
export function createCurriculumJourneyService(repository, { manifest,
  loadIntroductions = loadCurriculumIntroductions, loadBank = loadCurriculumAssessmentBank,
  now = () => new Date().toISOString(), uuid = () => globalThis.crypto.randomUUID(), rng = Math.random } = {}) {
  const scope = (childId, year, subject) => {
    requireJourney(childId, "CHILD_REQUIRED");
    const pathway = getJourneyPathway(year, subject, manifest);
    return { key: { childId, year: Number(year), subject }, pathway };
  };
  const session = async (key, sessionId) => {
    requireJourney(isUuid(sessionId), "INVALID_SESSION_ID");
    const doc = await repository.getSession(key.childId, sessionId);
    requireJourney(doc && doc.year === key.year && doc.subject === key.subject, "SESSION_NOT_FOUND", 404);
    return doc;
  };
  return {
    async getCurriculumJourney(childId, year, subject) {
      const { key } = scope(childId, year, subject);
      return publicJourneyDocument(await repository.getJourney(key));
    },
    async acknowledgeCurriculumIntroductions(childId, year, subject, { acknowledgements }) {
      const { key, pathway } = scope(childId, year, subject);
      const content = await loadIntroductions(key.year, subject);
      requireJourney(content, "CONTENT_UNAVAILABLE", 503);
      return publicJourneyDocument(await repository.mergeJourney(key,
        (current) => mergeIntroductionAcknowledgements(current, acknowledgements, pathway, content, now())));
    },
    async getCurriculumAssessmentOverview(childId, year, subject) {
      const { key, pathway } = scope(childId, year, subject);
      return assessmentOverview(pathway, await repository.listSessions(key));
    },
    async listCurriculumAssessments(childId, year, subject, options) {
      const { key, pathway } = scope(childId, year, subject);
      return assessmentHistoryPage(pathway, key, await repository.listSessions(key), options);
    },
    async startCurriculumAssessment(childId, year, subject, request) {
      const { key, pathway } = scope(childId, year, subject);
      requireJourney(request && isUuid(request.sessionId), "INVALID_SESSION_ID");
      validateAssessmentScope(pathway, request.kind, request.categoryId);
      const existing = await repository.getSession(childId, request.sessionId);
      if (existing) {
        requireJourney(sameAssessmentScope(existing, key, request), "SESSION_ID_REUSED", 409);
        return publicAssessmentDocument(existing);
      }
      const bank = await loadBank(key.year, subject);
      const previous = (await repository.listSessions(key)).filter((s) => sameAssessmentScope(s, key, request)).sort(compareAssessmentHistory)[0] ?? null;
      const created = createAssessmentSession({ ...key, sessionId: request.sessionId, kind: request.kind,
        categoryId: request.categoryId }, pathway, bank, { previous, now, uuid, rng });
      // Request identity fields are allowlisted above; client-supplied snapshots,
      // scores, child/year/subject or revision never enter the record.
      const doc = await repository.insertSession(created);
      requireJourney(sameAssessmentScope(doc, key, request), "SESSION_ID_REUSED", 409);
      return publicAssessmentDocument(doc);
    },
    async getCurriculumAssessment(childId, year, subject, sessionId) {
      const { key } = scope(childId, year, subject);
      return publicAssessmentDocument(await session(key, sessionId));
    },
    async submitCurriculumAssessmentResponse(childId, year, subject, sessionId, action) {
      const { key } = scope(childId, year, subject);
      await session(key, sessionId);
      return publicAssessmentDocument(await repository.transitionSession(key, sessionId,
        (current) => submitAssessmentResponse(current, action, now())));
    },
    async finishCurriculumAssessment(childId, year, subject, sessionId, action) {
      const { key } = scope(childId, year, subject);
      await session(key, sessionId);
      return publicAssessmentDocument(await repository.transitionSession(key, sessionId,
        (current) => finishAssessmentSession(current, action, now())));
    },
  };
}
