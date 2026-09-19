/**
 * What the seed puts in the database — pure, so it can be tested without Mongo.
 *
 * Progress is built by walking the curriculum in DISPLAY ORDER and completing
 * the first N *built* challenges. That matters: completing challenges at random
 * would produce a learner the app itself shows as impossible — challenge 3 done
 * while 1 and 2 are locked. Walking in order is the only way the seeded state
 * obeys the same unlock rules the UI enforces (PROJECT_KNOWLEDGE §4.5).
 *
 * Badges are REPLAYED rather than invented: each completion goes through the
 * real `getCompletionMilestones` and `earnBadges`, so a seeded child's badges
 * can never claim something their progress does not support.
 */
import { getCompletionMilestones } from "../src/data/completionMilestones.js";
import { earnBadges, emptyRewards } from "../src/data/badges.js";
import { completeChallenge } from "../src/data/progressRules.js";

/** The test account. Deliberately obvious — this is never a real person. */
export const SEED_PARENT = {
  email: "testuser@gmail.com",
  password: "password",
};

/**
 * Two children with deliberately DIFFERENT shapes of progress, because a seed
 * where everyone looks the same tests nothing: the profile cards, the resume
 * card and the parent breakdown all pick "most recently played", and that is
 * only visible when the two children disagree.
 *
 * `counts` are challenges completed, in display order, per year.
 */
export const SEED_CHILDREN = [
  {
    name: "Demi",
    avatar: "🦊",
    colour: "--profile-colour-coral",
    yearGroup: 3,
    // Well into Year 2, just started Year 3. Year 3 is the recent one, so her
    // card and resume should both point there.
    progress: { 2: 26, 3: 6 },
    mostRecentYear: 3,
  },
  {
    name: "Liam",
    avatar: "🐼",
    colour: "--profile-colour-sky",
    yearGroup: 2,
    // The mirror image: mid-Year 2 and barely into Year 3, with Year 2 the more
    // recent — so the two children exercise opposite branches of `pickResume`.
    progress: { 2: 11, 3: 3 },
    mostRecentYear: 2,
  },
];

/**
 * Completes the first `count` built challenges in display order.
 *
 * @returns {{data: object, completed: number}} the progress `data` payload and
 *   how many were actually completed, which is lower than `count` when the
 *   curriculum runs out of built challenges.
 */
export function buildProgress(curriculum, isBuilt, count) {
  let data = {};
  let completed = 0;

  for (const category of curriculum) {
    for (const topic of category.topics) {
      for (const challenge of topic.challenges) {
        if (completed >= count) return { data, completed };
        if (!isBuilt(topic.id, challenge.id)) continue;

        data = completeChallenge(data, category.id, topic.id, challenge.id);
        completed += 1;
      }
    }
  }

  return { data, completed };
}

/**
 * Replays a progress payload through the real milestone and badge rules.
 *
 * Walks the same order `buildProgress` used, feeding each completion the state
 * as it was BEFORE that completion — which is exactly what ProblemView does at
 * runtime. Anything else would award badges the app would not have given.
 */
export function buildRewards(curricula, startRewards = emptyRewards()) {
  let rewards = startRewards;

  for (const { curriculum, isBuilt, count, year, subject } of curricula) {
    let progress = {};
    let done = 0;

    for (const category of curriculum) {
      for (const topic of category.topics) {
        for (const challenge of topic.challenges) {
          if (done >= count) break;
          if (!isBuilt(topic.id, challenge.id)) continue;

          const result = getCompletionMilestones({
            curriculum,
            progress,
            categoryId: category.id,
            topicId: topic.id,
            challengeId: challenge.id,
            isBuilt,
            // Maths is the only registered subject per year today, so a
            // finished subject is a finished year. `curriculumRegistry` is the
            // source of truth at runtime; this mirrors it.
            isOnlySubjectInYear: true,
          });

          progress = completeChallenge(progress, category.id, topic.id, challenge.id);
          done += 1;

          rewards = earnBadges(rewards, result.earned, {
            at: new Date().toISOString(),
            year,
            subject,
          }).rewards;
        }
      }
    }
  }

  return rewards;
}
