import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { store } from "../data/store";
import { loadCurriculum, yearAwardSubjectIds } from "../data/curriculumRegistry";
import { isChallengeImplemented } from "../data/challengeAvailability";
import { isProgressData } from "../../shared/progressData.js";

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
 * away. `refreshKey` identifies a new challenge or explicit retry, so a final
 * run cannot rely on a snapshot from the beginning of a long subject session.
 */
export function useOtherSubjectsProgress(year, subject, refreshKey = "") {
  const childId = useContext(AuthContext)?.child?._id ?? null;
  // Only subjects that count toward the year award (countsTowardYear).
  const others = yearAwardSubjectIds(year, subject);
  const othersKey = others.join(",");

  // Which `childId|year|subject` the loaded result belongs to, so a result for
  // the previous challenge's year or child is never reused.
  const requestKey = `${childId ?? "none"}|${year}|${subject}|${refreshKey}`;
  const [loaded, setLoaded] = useState({ key: null, value: null });

  useEffect(() => {
    if (!othersKey || !childId) return undefined;
    let cancelled = false;

    Promise.all(
      othersKey.split(",").map(async (otherSubject) => {
        let progress = null;
        try {
          const doc = await store.getProgress(childId, year, otherSubject);
          // Only an explicit missing document means the learner has not started.
          // Invalid responses stay unknown and can be retried, never guessed empty.
          if (doc === null) progress = {};
          else if (doc && isProgressData(doc.data)) progress = doc.data;
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
