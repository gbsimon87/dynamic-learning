/**
 * Lock state for a whole curriculum, computed in one pass.
 *
 * These rules used to live as consts inside `CurriculumPage`'s render, which
 * meant the only way to ask "is this challenge playable?" was to re-render the
 * screen. The next-challenge resolver needs the same answer, and a second copy
 * of gating rules is how a learner silently gets sent to a locked challenge —
 * so both callers read this one structure.
 *
 * Pure: no React, no storage, and no `import.meta.glob`, so it runs under
 * `node --test`. Availability arrives as the `isBuilt` callback rather than an
 * import of `challengeAvailability`, which is Vite-only.
 */
import {
  isCategoryComplete,
  isCategoryPassable,
  isChallengeComplete,
  isChallengeUnlocked,
  isFirstTimeUser,
  isTopicComplete,
} from "./progressRules.js";

/** True when none of a topic's challenges have a component file. */
function topicIsUnbuilt(topic, isBuilt) {
  return !topic.challenges.some((challenge) =>
    isBuilt(topic.id, challenge.id)
  );
}

/**
 * @param {object}   args
 * @param {Array}    args.curriculum  category list, in display order
 * @param {object}   args.progress    stored progress document
 * @param {Function} args.isBuilt     (topicId, challengeId) => boolean
 * @param {boolean}  [args.bypassLocks] dev flag: open every built challenge
 *
 * @returns {Array} categories in curriculum order, each:
 *   { id, title, locked, complete, topics: [
 *     { id, name, locked, complete, unbuilt, challenges: [
 *       { id, title, locked, missing, completed } ] } ] }
 */
export function buildLockState({
  curriculum,
  progress,
  isBuilt,
  bypassLocks = false,
}) {
  const firstTimeUser = isFirstTimeUser(progress);

  // Unbuilt topics must not count against their category, and unbuilt
  // challenges must not count against their topic.
  const skipTopic = (topic) => topicIsUnbuilt(topic, isBuilt);
  const skipIn = (topic) => (challenge) => !isBuilt(topic.id, challenge.id);

  return curriculum.map((category, categoryIndex) => {
    // Every EARLIER category must be passable, not just the previous one: an
    // empty category reports passable, which would otherwise reopen the chain.
    const categoryLocked =
      !bypassLocks &&
      ((firstTimeUser && categoryIndex > 0) ||
        curriculum
          .slice(0, categoryIndex)
          .some(
            (earlier) =>
              !isCategoryPassable(progress, earlier, skipTopic, skipIn)
          ));

    const topics = category.topics.map((topic, topicIndex) => {
      const previousTopic =
        topicIndex > 0 ? category.topics[topicIndex - 1] : null;

      // An unbuilt topic can't be completed, so it must not gate the next one.
      const previousBlocks =
        previousTopic &&
        !topicIsUnbuilt(previousTopic, isBuilt) &&
        !isTopicComplete(
          progress,
          category.id,
          previousTopic.id,
          previousTopic,
          skipIn(previousTopic)
        );

      const topicLocked =
        !bypassLocks && (categoryLocked || Boolean(previousBlocks));

      const skipChallenge = skipIn(topic);

      const challenges = topic.challenges.map((challenge, challengeIndex) => {
        const completed = isChallengeComplete(
          progress,
          category.id,
          topic.id,
          challenge.id
        );

        return {
          id: challenge.id,
          title: challenge.title,
          completed,
          missing: !isBuilt(topic.id, challenge.id),
          // Open once everything before it is done, or if already done itself.
          locked:
            !bypassLocks &&
            (categoryLocked ||
              topicLocked ||
              !(
                completed ||
                isChallengeUnlocked(
                  progress,
                  category.id,
                  topic.id,
                  topic,
                  challengeIndex,
                  skipChallenge
                )
              )),
        };
      });

      return {
        id: topic.id,
        name: topic.name,
        locked: topicLocked,
        complete: isTopicComplete(
          progress,
          category.id,
          topic.id,
          topic,
          skipChallenge
        ),
        unbuilt: topicIsUnbuilt(topic, isBuilt),
        challenges,
      };
    });

    return {
      id: category.id,
      title: category.title,
      locked: categoryLocked,
      complete: isCategoryComplete(progress, category, skipTopic, skipIn),
      topics,
    };
  });
}
