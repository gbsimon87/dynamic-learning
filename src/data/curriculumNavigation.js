/**
 * "What comes next" over the curriculum tree.
 *
 * Walks forward from the challenge just finished — remaining challenges in the
 * topic, then later topics in the category, then later categories — and returns
 * the first one that is actually playable.
 *
 * It reads the lock state from `buildLockState` rather than re-deriving unlock
 * rules, so the destination can never disagree with what the curriculum screen
 * shows as open.
 */

/** Curriculum tree flattened into display order. */
function flatten(lockState) {
  const positions = [];
  for (const category of lockState) {
    for (const topic of category.topics) {
      for (const challenge of topic.challenges) {
        positions.push({
          categoryId: category.id,
          topicId: topic.id,
          challengeId: challenge.id,
          playable: !challenge.locked && !challenge.missing,
        });
      }
    }
  }
  return positions;
}

/**
 * @param {Array}  lockState  from `buildLockState`
 * @param {object} position   { categoryId, topicId, challengeId } just finished
 *                            (`challengeId` may be the string from the route)
 *
 * @returns {object|null} { categoryId, topicId, challengeId }, or null when
 *   nothing playable remains — end of the curriculum, or everything ahead is
 *   locked or unbuilt. Callers should fall back to the topic screen on null.
 */
export function findNextChallenge(lockState, position) {
  if (!Array.isArray(lockState) || !position) return null;

  const positions = flatten(lockState);

  const currentIndex = positions.findIndex(
    (candidate) =>
      candidate.categoryId === position.categoryId &&
      candidate.topicId === position.topicId &&
      Number(candidate.challengeId) === Number(position.challengeId)
  );

  // An unknown position means a hand-edited or stale URL — don't guess.
  if (currentIndex === -1) return null;

  const next = positions
    .slice(currentIndex + 1)
    .find((candidate) => candidate.playable);

  if (!next) return null;

  return {
    categoryId: next.categoryId,
    topicId: next.topicId,
    challengeId: next.challengeId,
  };
}
