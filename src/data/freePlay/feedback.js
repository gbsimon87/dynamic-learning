import { nextStreak } from "../answerStreak.js";

/**
 * The game events of a Skills Mode free-play game, as a pure reducer.
 *
 * Curriculum challenges celebrate a fixed run (question N of 6, then a
 * completion sequence). Free play has no end, so it gets its own events:
 *
 *   correct    a right answer
 *   combo      3, 6, 9… right FIRST TIME in a row (answerStreak.js, shared
 *              with the curriculum so the rule never drifts)
 *   milestone  every MILESTONE_EVERY right answers this game, first try or
 *              not — "5 right! 🌟", the biggest moment free play has
 *   wrong      any miss; resets the combo streak, never the milestone count
 *
 * A milestone outranks a combo when both land on the same answer.
 *
 * Nothing here is stored: a level change or leaving the page starts again.
 * Free play deliberately earns no XP, streak days or badges (PROJECT_IDEAS
 * row 41: persistent rewards are a separate decision).
 */

export const MILESTONE_EVERY = 5;

export const INITIAL_ANSWER_STATE = Object.freeze({ streak: 0, correct: 0 });

/**
 * @param {{streak: number, correct: number}} state
 * @param {boolean} isCorrect
 * @param {boolean} firstTry   whether this was the first attempt at the question
 * @returns {{state: {streak: number, correct: number}, tone: string,
 *            combo: boolean, milestone: boolean}}
 */
export function nextAnswer(state, isCorrect, firstTry) {
  const { streak, combo } = nextStreak(state.streak, isCorrect, firstTry);
  if (!isCorrect) {
    return { state: { streak, correct: state.correct }, tone: "wrong", combo: false, milestone: false };
  }
  const correct = state.correct + 1;
  const milestone = correct % MILESTONE_EVERY === 0;
  const tone = milestone ? "milestone" : combo ? "combo" : "correct";
  return { state: { streak, correct }, tone, combo, milestone };
}

/** How far through the current set of five: 0…MILESTONE_EVERY - 1. */
export function towardsMilestone(correct) {
  return correct % MILESTONE_EVERY;
}

const MILESTONE_LINES = ["{count} right! 🌟", "Wow — {count} right! 🌟", "Superstar! {count} right! 🌟"];

/**
 * The milestone line. Rotates by milestone number rather than at random, so
 * two milestones in a row never read the same and tests stay deterministic.
 */
export function milestoneMessage(correct) {
  const index = (Math.max(1, Math.floor(correct / MILESTONE_EVERY)) - 1) % MILESTONE_LINES.length;
  return MILESTONE_LINES[index].replace("{count}", String(correct));
}
