/**
 * The "3 in a row" combo inside a challenge.
 *
 * A streak counts questions answered right FIRST TIME, back to back. Any wrong
 * attempt resets it to zero, and a question that needed a second go does not
 * count even when it is then answered right — so the combo rewards careful
 * answers, never tapping until something works.
 *
 * The combo fires at every multiple of COMBO_EVERY (3, 6, 9…), so a long
 * challenge can earn it more than once without it firing on every answer.
 *
 * Pure, and per challenge attempt: nothing here is stored.
 */

export const COMBO_EVERY = 3;

/**
 * @param {number} streak        the streak before this answer
 * @param {boolean} correct      whether this attempt was right
 * @param {boolean} firstTry     whether it was the first attempt at this question
 * @returns {{streak: number, combo: boolean}}
 */
export function nextStreak(streak, correct, firstTry) {
  if (!correct) return { streak: 0, combo: false };
  if (!firstTry) return { streak: 0, combo: false };

  const next = streak + 1;
  return { streak: next, combo: next % COMBO_EVERY === 0 };
}
