import {
  completeChallenge,
  isCategoryComplete,
  isChallengeComplete,
  isTopicComplete,
} from "./progressRules.js";

const LEVELS = ["challenge", "topic", "category", "subject", "year"];

function everyChallengeBuilt(curriculum, isBuilt) {
  return curriculum.every((category) =>
    category.topics.every((topic) =>
      topic.challenges.length > 0 &&
      topic.challenges.every((challenge) => isBuilt(topic.id, challenge.id))
    )
  );
}

function fullTopicComplete(progress, categoryId, topic, isBuilt) {
  return topic.challenges.length > 0 &&
    topic.challenges.every((challenge) => isBuilt(topic.id, challenge.id)) &&
    isTopicComplete(progress, categoryId, topic.id, topic);
}

function fullCategoryComplete(progress, category, isBuilt) {
  return category.topics.length > 0 &&
    category.topics.every((topic) =>
      fullTopicComplete(progress, category.id, topic, isBuilt)
    ) &&
    isCategoryComplete(progress, category);
}

export function fullSubjectComplete(progress, curriculum, isBuilt) {
  return curriculum.length > 0 &&
    everyChallengeBuilt(curriculum, isBuilt) &&
    curriculum.every((category) => fullCategoryComplete(progress, category, isBuilt));
}

/**
 * Read-only milestone detection for the one challenge that was just answered.
 * The progress reducer is reused to inspect the "after" state; persistence is
 * still owned exclusively by useProgress / ProblemView.
 *
 * `isOnlySubjectInYear` reflects the available curriculum registry. When more
 * subjects are added to a year, a year award must wait until their progress is
 * loaded too; this function never guesses that an unobserved subject is done.
 */
export function getCompletionMilestones({
  curriculum,
  progress,
  categoryId,
  topicId,
  challengeId,
  isBuilt,
  isOnlySubjectInYear = false,
}) {
  const category = curriculum?.find((item) => item.id === categoryId);
  const topic = category?.topics.find((item) => item.id === topicId);
  const challenge = topic?.challenges.find(
    (item) => Number(item.id) === Number(challengeId)
  );

  if (!category || !topic || !challenge || !isBuilt(topicId, challengeId)) {
    return { level: "challenge", earned: [], summary: null };
  }

  const alreadyDone = isChallengeComplete(progress, categoryId, topicId, challengeId);
  if (alreadyDone) {
    return { level: "practice", earned: [], summary: null };
  }

  const after = completeChallenge(progress, categoryId, topicId, challengeId);
  const earned = ["challenge"];

  if (!fullTopicComplete(progress, categoryId, topic, isBuilt) &&
      fullTopicComplete(after, categoryId, topic, isBuilt)) {
    earned.push("topic");
  }
  if (!fullCategoryComplete(progress, category, isBuilt) &&
      fullCategoryComplete(after, category, isBuilt)) {
    earned.push("category");
  }
  if (!fullSubjectComplete(progress, curriculum, isBuilt) &&
      fullSubjectComplete(after, curriculum, isBuilt)) {
    earned.push("subject");
    if (isOnlySubjectInYear) earned.push("year");
  }

  return {
    level: LEVELS.findLast((level) => earned.includes(level)),
    earned,
    summary: {
      challengeTitle: challenge.title,
      topicName: topic.name,
      categoryTitle: category.title,
      topicChallenges: topic.challenges.length,
      categoryTopics: category.topics.length,
      subjectCategories: curriculum.length,
      subjectTopics: curriculum.reduce((count, item) => count + item.topics.length, 0),
      subjectChallenges: curriculum.reduce(
        (count, item) => count + item.topics.reduce(
          (topicCount, entry) => topicCount + entry.challenges.length, 0
        ), 0
      ),
    },
  };
}
