/**
 * After how many wrong attempts on one question a challenge shows its hint.
 * Two, not one: a first miss is often a slip, and a hint that arrives
 * immediately teaches a child to guess once and wait for it.
 *
 * A hint narrows the question (highlights the tricky letters, replays the
 * word, strikes out a wrong option). It never shows the answer, and it
 * changes nothing that is earned. `ChallengeShell` passes `misses`.
 */
export const HINT_AFTER = 2;

/** True once a hint should show for this question. */
export function showHint(misses) {
  return misses >= HINT_AFTER;
}
