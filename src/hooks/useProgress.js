import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { store } from "../data/store";

/**
 * Shared curriculum-progress hook — now account-aware.
 *
 * Progress belongs to the ACTIVE CHILD PROFILE, not to the browser. The
 * signature, the return shape and every unlock rule below are unchanged from
 * the localStorage-only version (CurriculumPage.jsx / ProblemView.jsx need no
 * edits); only the read/write path moved:
 *
 *   read   localStorage[`${subject}Progress_year${year}`]
 *          -> await store.getProgress(childId, year, subject) -> doc.data
 *   write  localStorage.setItem(...)
 *          -> await store.saveProgress(childId, year, subject, data)
 *
 * The stored `data` payload keeps the exact same (unversioned) shape:
 * {
 *   [categoryId]: {
 *     topics: {
 *       [topicId]: { completedChallenges: [1, 2] }
 *     }
 *   }
 * }
 *
 * See .claude/skills/curriculum-progress for the full data contract and the
 * non-negotiables this preserves.
 */
export function useProgress(year, subject) {
  const auth = useContext(AuthContext);
  const childId = auth?.child?._id ?? null;

  // Identifies which document the in-memory `progress` was loaded from.
  // Without it, a child switch would write the OUTGOING child's progress into
  // the INCOMING child's document: the load effect resets state, but the save
  // effect below still runs once with the previous render's `progress`.
  const documentKey = `${childId ?? "none"}|${year}|${subject}`;
  const loadedKeyRef = useRef(null);
  const lastSavedRef = useRef(null);

  const [hydrated, setHydrated] = useState(false);
  const [progress, setProgress] = useState({});

  // Load the active child's document. Re-runs on child / year / subject change.
  useEffect(() => {
    let cancelled = false;

    // Anything currently in memory belongs to the PREVIOUS document.
    loadedKeyRef.current = null;
    lastSavedRef.current = null;
    setHydrated(false);
    setProgress({});

    if (!childId) {
      // No active child: be completely inert — empty progress, never a write.
      loadedKeyRef.current = null;
      setHydrated(true);
      return () => {
        cancelled = true;
      };
    }

    (async () => {
      let data = {};
      try {
        const doc = await store.getProgress(childId, year, subject);
        // A missing document is a brand-new learner, not an error.
        if (doc && doc.data && typeof doc.data === "object") data = doc.data;
      } catch {
        // Unreadable store degrades to an empty object, never a white screen.
        data = {};
      }
      if (cancelled) return;

      lastSavedRef.current = JSON.stringify(data);
      loadedKeyRef.current = documentKey;
      setProgress(data);
      setHydrated(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [childId, year, subject, documentKey]);

  // Persist updates — guarded by `hydrated` AND by `loadedKeyRef` so neither
  // the initial empty state nor another child's state can ever overwrite real
  // saved progress before the async load has resolved.
  useEffect(() => {
    if (!hydrated || !childId) return;
    if (loadedKeyRef.current !== documentKey) return;

    const serialised = JSON.stringify(progress);
    // Skip the no-op write that would otherwise fire right after hydration.
    if (serialised === lastSavedRef.current) return;
    lastSavedRef.current = serialised;

    store.saveProgress(childId, year, subject, progress).catch(() => {
      // Write failed — progress stays in memory for this session.
    });
  }, [progress, hydrated, childId, year, subject, documentKey]);

  // Membership check, not a length check: [9,9,9,9] must not complete a topic.
  const isTopicComplete = (categoryId, topicId, topic) => {
    const completed = progress[categoryId]?.topics?.[topicId]?.completedChallenges;
    if (!Array.isArray(completed) || completed.length === 0) return false;
    const done = new Set(completed.map(Number));
    return topic.challenges.every((challenge) => done.has(Number(challenge.id)));
  };

  // Unlocks when everything before it is done. Gap-tolerant by design: a
  // count-based rule bricked the curriculum permanently on any gap.
  const isChallengeUnlocked = (
    categoryId,
    topicId,
    topic,
    challengeIndex,
    skipChallenge
  ) => {
    const completed = progress[categoryId]?.topics?.[topicId]?.completedChallenges || [];
    const done = new Set(completed.map(Number));
    return topic.challenges
      .slice(0, challengeIndex)
      // An unbuilt challenge can never be completed, so it must not block the
      // ones after it.
      .filter((challenge) => !(skipChallenge && skipChallenge(challenge)))
      .every((challenge) => done.has(Number(challenge.id)));
  };

  // `skipTopic` excludes topics with no built challenges.
  const isCategoryComplete = (category, skipTopic) => {
    const completable = category.topics.filter(
      (topic) => !(skipTopic && skipTopic(topic))
    );
    // A category with nothing built in it is not "complete" - it is empty.
    // Returning true there would badge every unbuilt category as finished.
    if (completable.length === 0) return false;
    return completable.every((topic) =>
      isTopicComplete(category.id, topic.id, topic)
    );
  };

  // Gating only. Distinct from complete: an empty category must not block, but
  // must not be badged finished either.
  const isCategoryPassable = (category, skipTopic) => {
    const completable = category.topics.filter(
      (topic) => !(skipTopic && skipTopic(topic))
    );
    if (completable.length === 0) return true; // nothing to do - don't block
    return completable.every((topic) =>
      isTopicComplete(category.id, topic.id, topic)
    );
  };

  /**
   * True if the given challenge is already recorded as complete.
   */
  const isChallengeComplete = (categoryId, topicId, challengeId) => {
    const numericId = Number(challengeId);
    const completedChallenges =
      progress[categoryId]?.topics?.[topicId]?.completedChallenges || [];
    return completedChallenges.includes(numericId);
  };

  /**
   * Marks a challenge complete. No-op if it was already completed — never
   * duplicates an entry (duplicates would inflate the topic-completion
   * length check and mark a topic complete early).
   */
  const completeChallenge = (categoryId, topicId, challengeId) => {
    const numericId = Number(challengeId);

    setProgress((prev) => {
      const prevTopic = prev[categoryId]?.topics?.[topicId] || {};
      const prevCompleted = prevTopic.completedChallenges || [];

      if (prevCompleted.includes(numericId)) {
        return prev;
      }

      return {
        ...prev,
        [categoryId]: {
          ...prev[categoryId],
          topics: {
            ...prev[categoryId]?.topics,
            [topicId]: {
              ...prevTopic,
              completedChallenges: [...prevCompleted, numericId],
            },
          },
        },
      };
    });
  };

  return {
    progress,
    hydrated,
    isTopicComplete,
    isChallengeUnlocked,
    isCategoryComplete,
    isCategoryPassable,
    isChallengeComplete,
    completeChallenge,
  };
}
