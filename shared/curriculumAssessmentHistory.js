import { publicAssessmentDocument } from "./curriculumAssessmentData.js";
import { requireJourney, validateAssessmentScope } from "./curriculumJourneyData.js";

export const compareAssessmentHistory = (a, b) => b.createdAt.localeCompare(a.createdAt) || b.sessionId.localeCompare(a.sessionId);
export const sameAssessmentScope = (doc, key, scope) => String(doc.childId) === String(key.childId) && doc.year === key.year
  && doc.subject === key.subject && doc.kind === scope.kind && doc.categoryId === scope.categoryId;

export function assessmentOverview(pathway, sessions) {
  const sorted = [...sessions].sort(compareAssessmentHistory);
  return { scopes: [...pathway.categories.map((q) => ({ kind: "quest", categoryId: q.id })), { kind: "subject", categoryId: null }]
    .map((scope) => {
      const matching = sorted.filter((s) => s.kind === scope.kind && s.categoryId === scope.categoryId);
      const project = (status) => {
        const session = matching.find((s) => s.status === status);
        return session ? publicAssessmentDocument(session, { summaryOnly: true }) : null;
      };
      return { ...scope, latestActive: project("active"), latestCompleted: project("completed") };
    }) };
}

export function assessmentHistoryPage(pathway, key, sessions, { kind, categoryId, cursor = null, limit = 20 }) {
  validateAssessmentScope(pathway, kind, categoryId);
  requireJourney(Number.isInteger(limit) && limit >= 1 && limit <= 50, "INVALID_HISTORY_QUERY");
  const scope = [String(key.childId), key.year, key.subject, kind, categoryId];
  let after = null;
  if (cursor !== null) {
    try {
      requireJourney(typeof cursor === "string" && cursor.length <= 1500, "INVALID_CURSOR");
      const parsed = JSON.parse(atob(cursor));
      requireJourney(JSON.stringify(parsed.scope) === JSON.stringify(scope) && typeof parsed.createdAt === "string"
        && typeof parsed.sessionId === "string", "INVALID_CURSOR"); after = parsed;
    } catch { requireJourney(false, "INVALID_CURSOR"); }
  }
  const eligible = sessions.filter((s) => sameAssessmentScope(s, key, { kind, categoryId }))
    .sort(compareAssessmentHistory).filter((s) => !after || compareAssessmentHistory(s, after) > 0);
  const page = eligible.slice(0, limit);
  const last = page.at(-1);
  return { sessions: page.map((s) => publicAssessmentDocument(s, { summaryOnly: true })),
    nextCursor: eligible.length > limit ? btoa(JSON.stringify({ scope, createdAt: last.createdAt, sessionId: last.sessionId })) : null };
}
