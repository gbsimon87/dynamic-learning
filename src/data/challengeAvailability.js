/**
 * Which curriculum challenges actually have an implementation.
 *
 * The dataset gives all 37 topics 4 challenges each, but only a few are built.
 * Linking to the rest made the first unbuilt one an absolute wall, since
 * `onComplete` never fires there.
 *
 * Derived from the glob key set so it can't drift. Keep the pattern in sync with
 * the one in ../pages/curriculum/Challenge.jsx.
 */
const challengeModules = import.meta.glob(
  "../pages/skills/*/challenges/year*/*/*Challenge*.jsx"
);

// Normalise the glob keys into a fast lookup set of
// "subject/yearN/topicId/challengeId".
const availableKeys = new Set(
  Object.keys(challengeModules)
    .map((path) => {
      const match = path.match(
        /skills\/([^/]+)\/challenges\/(year\d+)\/([^/]+)\/.*Challenge(\d+)\.jsx$/
      );
      if (!match) return null;
      const [, subject, year, topicId, challengeId] = match;
      return `${subject}/${year}/${topicId}/${challengeId}`;
    })
    .filter(Boolean)
);

/** True when this specific challenge has a component file. */
export function isChallengeImplemented(subject, year, topicId, challengeId) {
  return availableKeys.has(`${subject}/year${year}/${topicId}/${challengeId}`);
}

/** True when none of a topic's challenges are built yet. */
export function isTopicUnbuilt(subject, year, topicId, challenges) {
  return !challenges.some((challenge) =>
    isChallengeImplemented(subject, year, topicId, challenge.id)
  );
}
