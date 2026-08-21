import { useEffect, useState } from "react";

/**
 * Shared curriculum-progress storage hook.
 *
 * Single source of truth for reading/writing the `${subject}Progress_year${year}`
 * localStorage key, replacing the logic previously duplicated across
 * CurriculumPage.jsx and ProblemView.jsx. See .claude/skills/curriculum-progress
 * for the full data contract and non-negotiables this preserves.
 *
 * Shape (unversioned, unchanged from before this hook existed):
 * {
 *   [categoryId]: {
 *     topics: {
 *       [topicId]: { completedChallenges: [1, 2] }
 *     }
 *   }
 * }
 */
export function useProgress(year, subject) {
  const storageKey = `${subject}Progress_year${year}`;

  const [hydrated, setHydrated] = useState(false);
  const [progress, setProgress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch {
      return {};
    }
  });

  // Re-read whenever the key changes (year/subject switch), and on mount.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
      setProgress(saved || {});
    } catch {
      setProgress({});
    }
    setHydrated(true);
  }, [storageKey]);

  // Save updates — guarded by `hydrated` so the initial empty state never
  // overwrites real saved progress before the read effect above has run.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(progress));
    } catch {
      // Storage full or unavailable — progress stays in memory for this session
    }
  }, [progress, storageKey, hydrated]);

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
