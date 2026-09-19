/**
 * Gathers the per-curriculum documents that `pickResume` consumes, for ONE
 * child.
 *
 * Two callers need exactly this: the homepage (the active child) and the
 * profile picker (every child, before one is active). It lives here so they
 * cannot drift — if one of them read a different set of curricula, the same
 * child would be described as being in two different places.
 *
 * Strictly read-only (.claude/skills/curriculum-progress): it calls
 * `store.getProgress` and nothing else. No caller of this may ever write.
 *
 * `isChallengeImplemented` is injected rather than imported because it relies
 * on `import.meta.glob`, which does not exist outside Vite — keeping it a
 * parameter is what lets the consumers stay testable.
 */
import {
  CURRICULUM_SUBJECTS,
  CURRICULUM_YEARS,
  getSubjectName,
  isCurriculumAvailable,
  loadCurriculum,
} from "./curriculumRegistry";

/** Every year+subject pair that actually has a curriculum behind it. */
export function availablePairs() {
  return CURRICULUM_YEARS.flatMap((year) =>
    CURRICULUM_SUBJECTS.filter((subject) =>
      isCurriculumAvailable(year, subject.id)
    ).map((subject) => ({ year, subject: subject.id }))
  );
}

/**
 * @param {object} store  the data store (injected so tests need no Vite)
 * @param {string} childId
 * @param {Function} isImplemented  (subject, year, topicId, challengeId) => boolean
 * @returns {Promise<object[]>} one candidate per available curriculum
 */
export async function loadResumeCandidates(store, childId, isImplemented) {
  if (!childId) return [];

  return Promise.all(
    availablePairs().map(async ({ year, subject }) => {
      const doc = await store.getProgress(childId, year, subject);

      return {
        year,
        subject,
        subjectName: getSubjectName(subject),
        curriculum: loadCurriculum(year, subject) ?? [],
        // A missing document is a brand-new learner, not an error.
        progress: doc?.data ?? {},
        updatedAt: doc?.updatedAt ?? null,
        isBuilt: (topicId, challengeId) =>
          isImplemented(subject, year, topicId, challengeId),
      };
    })
  );
}
