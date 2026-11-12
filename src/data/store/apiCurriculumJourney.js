import { publicJourneyDocument, requireJourney, isRecord } from "../../../shared/curriculumJourneyData.js";
import { readPublicAssessmentDocument } from "../../../shared/curriculumAssessmentData.js";

export function createApiCurriculumJourneyStore(request) {
  const base = (childId, year, subject) => `/curriculum-journey/${encodeURIComponent(childId)}/${encodeURIComponent(year)}/${encodeURIComponent(subject)}`;
  const match = (doc, childId, year, subject) => requireJourney(doc.childId === String(childId) && doc.year === Number(year) && doc.subject === subject, "INVALID_RESPONSE");
  const call = async (path, options, validate) => {
    const { data } = await request(path, options);
    try { return validate(data); }
    catch { requireJourney(false, "INVALID_RESPONSE"); }
  };
  const session = (data, child, year, subject, summaryOnly = false) => {
    requireJourney(isRecord(data) && Object.hasOwn(data, "session"), "INVALID_RESPONSE");
    const doc = readPublicAssessmentDocument(data.session, { summaryOnly }); match(doc, child, year, subject); return doc;
  };
  const journey = (data, child, year, subject, nullable) => {
    requireJourney(isRecord(data) && Object.hasOwn(data, "journey") && (nullable || data.journey !== null), "INVALID_RESPONSE");
    const doc = publicJourneyDocument(data.journey); if (doc) match(doc, child, year, subject); return doc;
  };
  return {
    getCurriculumJourney: (child, year, subject) => call(base(child, year, subject), {}, (d) => journey(d, child, year, subject, true)),
    acknowledgeCurriculumIntroductions: (child, year, subject, body) => call(`${base(child, year, subject)}/acknowledgements`, { method: "POST", body }, (d) => journey(d, child, year, subject, false)),
    // The manifest loads only when an overview is requested, keeping it out of the eager store bundle.
    getCurriculumAssessmentOverview: async (child, year, subject) => { const { getJourneyPathway } = await import("../../../shared/curriculumJourneyPathway.js");
      return call(`${base(child, year, subject)}/assessments/overview`, {}, (d) => {
      const pathway = getJourneyPathway(year, subject);
      requireJourney(isRecord(d) && Array.isArray(d.scopes) && d.scopes.length === pathway.categories.length + 1, "INVALID_RESPONSE");
      const seen = new Set();
      for (const scope of d.scopes) {
        const key = scope.kind === "subject" && scope.categoryId === null ? "subject" : scope.kind === "quest"
          && pathway.categories.some((q) => q.id === scope.categoryId) ? `quest:${scope.categoryId}` : null;
        requireJourney(key && !seen.has(key), "INVALID_RESPONSE"); seen.add(key);
        for (const field of ["latestActive", "latestCompleted"]) {
          requireJourney(Object.hasOwn(scope, field), "INVALID_RESPONSE");
          if (scope[field] !== null) {
            const doc = readPublicAssessmentDocument(scope[field], { summaryOnly: true }); match(doc, child, year, subject);
            requireJourney(doc.kind === scope.kind && doc.categoryId === scope.categoryId && doc.status === (field === "latestActive" ? "active" : "completed"), "INVALID_RESPONSE");
          }
        }
      }
      return structuredClone(d);
    }); },
    listCurriculumAssessments: (child, year, subject, { kind, categoryId, cursor = null, limit = 20 }) => {
      const query = new URLSearchParams({ kind, limit: String(limit), ...(categoryId === null ? {} : { categoryId }), ...(cursor ? { cursor } : {}) });
      return call(`${base(child, year, subject)}/assessments?${query}`, {}, (d) => {
        requireJourney(isRecord(d) && Array.isArray(d.sessions) && (d.nextCursor === null || typeof d.nextCursor === "string"), "INVALID_RESPONSE");
        for (const doc of d.sessions) {
          readPublicAssessmentDocument(doc, { summaryOnly: true }); match(doc, child, year, subject);
          requireJourney(doc.kind === kind && doc.categoryId === categoryId, "INVALID_RESPONSE");
        }
        return structuredClone(d);
      });
    },
    startCurriculumAssessment: (child, year, subject, body) => call(`${base(child, year, subject)}/assessments`, { method: "POST", body, expect: [200, 201] }, (d) => {
      const doc = session(d, child, year, subject);
      requireJourney(doc.sessionId === body.sessionId && doc.kind === body.kind && doc.categoryId === body.categoryId, "INVALID_RESPONSE"); return doc;
    }),
    getCurriculumAssessment: (child, year, subject, id) => call(`${base(child, year, subject)}/assessments/${encodeURIComponent(id)}`, {}, (d) => {
      const doc = session(d, child, year, subject); requireJourney(doc.sessionId === id, "INVALID_RESPONSE"); return doc;
    }),
    submitCurriculumAssessmentResponse: (child, year, subject, id, body) => call(`${base(child, year, subject)}/assessments/${encodeURIComponent(id)}/responses`, { method: "POST", body }, (d) => {
      const doc = session(d, child, year, subject); requireJourney(doc.sessionId === id, "INVALID_RESPONSE"); return doc;
    }),
    finishCurriculumAssessment: (child, year, subject, id, body) => call(`${base(child, year, subject)}/assessments/${encodeURIComponent(id)}/finish`, { method: "POST", body }, (d) => {
      const doc = session(d, child, year, subject); requireJourney(doc.sessionId === id && doc.status === "completed", "INVALID_RESPONSE"); return doc;
    }),
  };
}
