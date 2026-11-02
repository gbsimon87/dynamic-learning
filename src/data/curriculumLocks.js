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
  isChallengeComplete,
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
}) {

  // Unbuilt topics must not count against their category, and unbuilt
  // challenges must not count against their topic.
  const skipTopic = (topic) => topicIsUnbuilt(topic, isBuilt);
  const skipIn = (topic) => (challenge) => !isBuilt(topic.id, challenge.id);

  return curriculum.map((category) => {
    // Access is independent of progress; completion still uses the saved tree.
    const categoryLocked = false;
    const topics = category.topics.map((topic) => {
      const topicLocked = false;

      const skipChallenge = skipIn(topic);

      const challenges = topic.challenges.map((challenge) => {
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
          locked: false,
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
