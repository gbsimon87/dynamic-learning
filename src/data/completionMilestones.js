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

/**
 * The strict "topic finished" rule: every planned challenge built AND done.
 * Exported so topic stickers (stickers.js) award on exactly the rule the topic
 * milestone uses — a sticker must never disagree with the celebration.
 */
export function fullTopicComplete(progress, categoryId, topic, isBuilt) {
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
 * True when every subject given is fully finished: every planned challenge
 * built and done (`fullSubjectComplete`). An empty list is trivially true,
 * so a year with one registered subject behaves exactly as it always has.
 *
 * Each entry is `{ curriculum, progress, isBuilt }`. A `progress` of null or
 * undefined means "not read" (still loading, or the read failed). It counts as
 * NOT finished: a year award is never given on a guess.
 */
export function allSubjectsComplete(subjects) {
  return subjects.every(({ curriculum, progress, isBuilt }) =>
    Boolean(curriculum) && progress != null &&
    fullSubjectComplete(progress, curriculum, isBuilt)
  );
}

/**
 * Read-only milestone detection for the one challenge that was just answered.
 * The progress reducer is reused to inspect the "after" state; persistence is
 * still owned exclusively by useProgress / ProblemView.
 *
 * `otherSubjectsComplete` says whether every OTHER subject registered for this
 * year is already finished (see `allSubjectsComplete`). A year is finished only
 * when all of its subjects are, so finishing one subject earns the year award
 * only when the rest are done. The caller works that out from loaded progress;
 * when it cannot — still loading, or a failed read — it passes false. This
 * function never guesses that a subject it did not see is done.
 */
export function getCompletionMilestones({
  curriculum,
  progress,
  categoryId,
  topicId,
  challengeId,
  isBuilt,
  otherSubjectsComplete = false,
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
    if (otherSubjectsComplete) earned.push("year");
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
