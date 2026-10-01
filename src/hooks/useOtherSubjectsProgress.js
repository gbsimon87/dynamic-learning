import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { store } from "../data/store";
import {
  CURRICULUM_SUBJECTS,
  isCurriculumAvailable,
  loadCurriculum,
} from "../data/curriculumRegistry";
import { isChallengeImplemented } from "../data/challengeAvailability";

/**
 * The active child's progress in every OTHER subject registered for `year`,
 * shaped for `allSubjectsComplete` (completionMilestones.js). ProblemView uses
 * it to decide whether finishing this subject also finishes the year.
 *
 * Strictly read-only (.claude/skills/curriculum-progress): it calls
 * `store.getProgress` and nothing else. Writing stays with `useProgress`.
 *
 * Returns null until every read has settled. A read that fails leaves that
 * subject's `progress` null, which `allSubjectsComplete` treats as not
 * finished, so a year award is never given on a guess. A missing document is a
 * learner who has not started, not an error, and reads as `{}`.
 *
 * A year with only one subject has nothing to read and returns [] straight
 * away. Year 2's year award therefore behaves exactly as it did before.
 */
export function useOtherSubjectsProgress(year, subject) {
  const childId = useContext(AuthContext)?.child?._id ?? null;
  const others = CURRICULUM_SUBJECTS.filter(
    (item) => item.id !== subject && isCurriculumAvailable(year, item.id)
  ).map((item) => item.id);
  const othersKey = others.join(",");

  // Which `childId|year|subject` the loaded result belongs to, so a result for
  // the previous challenge's year or child is never reused.
  const requestKey = `${childId ?? "none"}|${year}|${subject}`;
  const [loaded, setLoaded] = useState({ key: null, value: null });

  useEffect(() => {
    if (!othersKey || !childId) return undefined;
    let cancelled = false;

    Promise.all(
      othersKey.split(",").map(async (otherSubject) => {
        let progress = null;
        try {
          const doc = await store.getProgress(childId, year, otherSubject);
          progress = doc?.data && typeof doc.data === "object" ? doc.data : {};
        } catch {
          progress = null;
        }
        return {
          subject: otherSubject,
          curriculum: loadCurriculum(year, otherSubject),
          progress,
          isBuilt: (topicId, challengeId) =>
            isChallengeImplemented(otherSubject, year, topicId, challengeId),
        };
      })
    ).then((value) => {
      if (!cancelled) setLoaded({ key: requestKey, value });
    });

    return () => {
      cancelled = true;
    };
  }, [childId, year, othersKey, requestKey]);

  if (others.length === 0) return [];
  // No child: nothing can be read, so nothing counts as finished.
  if (!childId) return null;
  return loaded.key === requestKey ? loaded.value : null;
}
