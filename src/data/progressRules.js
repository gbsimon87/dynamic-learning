/**
 * Pure progress rules — no React, no storage, no Vite globals.
 *
 * These were extracted from `useProgress` so the same predicates can drive both
 * the curriculum screen's lock state and the "what comes next" resolver. A
 * second copy of these rules is the one thing most likely to silently re-lock a
 * learner's finished work, so this module is the single source of truth and
 * `useProgress` is a thin binding layer over it.
 *
 * The stored shape is unchanged and still unversioned:
 * {
 *   [categoryId]: {
 *     topics: {
 *       [topicId]: { completedChallenges: [1, 2] }
 *     }
 *   }
 * }
 *
 * See .claude/skills/curriculum-progress for the full data contract.
 */

/** Completed ids for one topic, as a numeric Set. */
function completedIds(progress, categoryId, topicId) {
  const completed =
    progress?.[categoryId]?.topics?.[topicId]?.completedChallenges;
  if (!Array.isArray(completed)) return new Set();
  // Ids are written as numbers, but a string that slipped in must still read as
  // complete rather than silently re-locking the challenge.
  return new Set(completed.map(Number));
}

/** True for a learner with no saved progress at all. */
export function isFirstTimeUser(progress) {
  return Object.keys(progress || {}).length === 0;
}

/**
 * Membership check, not a length check: [9,9,9,9] must not complete a topic.
 *
 * `skipChallenge` excludes challenges with no component file. Without it a
 * topic holding one unbuilt challenge could never complete, so it gated the
 * topic after it forever — while the screen showed the learner "2/2 done",
 * because the progress count already ignored unbuilt challenges.
 */
export function isTopicComplete(
  progress,
  categoryId,
  topicId,
  topic,
  skipChallenge
) {
  const completable = topic.challenges.filter(
    (challenge) => !(skipChallenge && skipChallenge(challenge))
  );
  // Nothing built in this topic: there is nothing to have completed.
  if (completable.length === 0) return false;

  const done = completedIds(progress, categoryId, topicId);
  if (done.size === 0) return false;
  return completable.every((challenge) => done.has(Number(challenge.id)));
}

/**
 * Unlocks when everything before it is done. Gap-tolerant by design: a
 * count-based rule bricked the curriculum permanently on any gap.
 *
 * `skipChallenge` excludes challenges with no component file — an unbuilt
 * challenge can never be completed, so it must not block the ones after it.
 */
export function isChallengeUnlocked(
  progress,
  categoryId,
  topicId,
  topic,
  challengeIndex,
  skipChallenge
) {
  const done = completedIds(progress, categoryId, topicId);
  return topic.challenges
    .slice(0, challengeIndex)
    .filter((challenge) => !(skipChallenge && skipChallenge(challenge)))
    .every((challenge) => done.has(Number(challenge.id)));
}

/**
 * `skipTopic` excludes topics with no built challenges. `skipChallengeFor` is a
 * FACTORY — given a topic it returns that topic's own `skipChallenge`, since
 * whether a challenge is built depends on which topic it belongs to.
 */
export function isCategoryComplete(
  progress,
  category,
  skipTopic,
  skipChallengeFor
) {
  const completable = category.topics.filter(
    (topic) => !(skipTopic && skipTopic(topic))
  );
  // A category with nothing built in it is not "complete" — it is empty.
  // Returning true here would badge every unbuilt category as finished.
  if (completable.length === 0) return false;
  return completable.every((topic) =>
    isTopicComplete(
      progress,
      category.id,
      topic.id,
      topic,
      skipChallengeFor && skipChallengeFor(topic)
    )
  );
}

/**
 * Gating only. Deliberately disagrees with `isCategoryComplete` on an empty
 * category: it must not block the chain, but must not be badged finished.
 */
export function isCategoryPassable(
  progress,
  category,
  skipTopic,
  skipChallengeFor
) {
  const completable = category.topics.filter(
    (topic) => !(skipTopic && skipTopic(topic))
  );
  if (completable.length === 0) return true; // nothing to do — don't block
  return completable.every((topic) =>
    isTopicComplete(
      progress,
      category.id,
      topic.id,
      topic,
      skipChallengeFor && skipChallengeFor(topic)
    )
  );
}

/** True if the given challenge is already recorded as complete. */
export function isChallengeComplete(progress, categoryId, topicId, challengeId) {
  return completedIds(progress, categoryId, topicId).has(Number(challengeId));
}

/**
 * Returns progress with the challenge recorded complete.
 *
 * Returns the SAME object when it was already complete, so callers can treat an
 * unchanged reference as "nothing to save" — and so a double-submit can never
 * duplicate an entry. Duplicates would inflate any length-based check.
 *
 * Merges at every level: dropping one spread wipes sibling progress for a whole
 * category.
 */
export function completeChallenge(progress, categoryId, topicId, challengeId) {
  const numericId = Number(challengeId);
  const previousTopic = progress?.[categoryId]?.topics?.[topicId] || {};
  const previousCompleted = previousTopic.completedChallenges || [];

  if (previousCompleted.map(Number).includes(numericId)) return progress;

  return {
    ...progress,
    [categoryId]: {
      ...progress?.[categoryId],
      topics: {
        ...progress?.[categoryId]?.topics,
        [topicId]: {
          ...previousTopic,
          completedChallenges: [...previousCompleted, numericId],
        },
      },
    },
  };
}
