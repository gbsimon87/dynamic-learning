/**
 * Counting in multiples of 4, 8, 50 and 100 — Year 3.
 *
 * Statutory requirement: "count from 0 in multiples of 4, 8, 50 and 100".
 * From 0 — not from any number. Year 2 counts in 10s from any start, but the
 * Year 3 bullet for these four steps says "from 0", so every sequence here
 * begins at a multiple of its own step and the numbers stay inside 1,000.
 *
 * The non-statutory guidance connects the 2, 4 and 8 tables by doubling, so 4
 * and 8 are deliberately kept together in the step list.
 *
 * Pure: `rng` is a parameter so challenges randomise per mount while tests stay
 * deterministic.
 */

export { isCorrectNumber } from "./numbersAndCounting.js";

export const STEPS = [4, 8, 50, 100];

/** Fisher–Yates against the supplied rng. */
export function shuffle(values, rng) {
  const copy = [...values];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * A run of `length` terms counting in `step`, starting at `start`.
 *
 * `start` must be a multiple of `step` — counting in 4s from 5 is a different
 * (and not-yet-taught) skill, so it is rejected rather than quietly allowed.
 */
export function multipleSequence(start, step, length) {
  if (start % step !== 0) return null;
  return Array.from({ length }, (_, i) => start + i * step);
}

/**
 * A sequence that fits inside Year 3's range however far it runs.
 *
 * Picking a start at random and hoping is how a sequence ends up at 1,240: the
 * last term is computed first and the start is chosen to keep it under 1,000.
 *
 * `reserve` keeps room for terms the question will ask for but not show. A
 * "what comes next?" sequence ending at exactly 1000 has the answer 1050, which
 * is outside Year 3 — so the room is reserved here rather than clamped later,
 * because a clamped answer would no longer be the right one.
 */
export function sequenceWithin1000(
  step,
  length,
  rng,
  { backwards = false, reserve = 0 } = {}
) {
  const span = (length - 1 + reserve) * step;
  const maxStart = 1000 - span;
  const starts = [];
  for (let value = 0; value <= maxStart; value += step) starts.push(value);
  const start = starts[Math.floor(rng() * starts.length)];
  const forward = multipleSequence(start, step, length);
  return backwards ? [...forward].reverse() : forward;
}

/** True when `value` is a multiple of `step` — and counting started at 0. */
export function isMultipleOf(value, step) {
  return value % step === 0;
}

/**
 * The step between consecutive terms, or null when the run is not a constant
 * count. A caller that rendered null as "the step is null" would be asking an
 * unanswerable question, so the null is deliberate.
 */
export function stepOf(terms) {
  if (!Array.isArray(terms) || terms.length < 2) return null;
  const step = terms[1] - terms[0];
  for (let i = 2; i < terms.length; i++) {
    if (terms[i] - terms[i - 1] !== step) return null;
  }
  return step;
}

/**
 * Options for "what is the next number?" — the answer plus near misses built
 * from the step itself. One step short, one step long and a single-unit slip
 * are the mistakes actually made; a random number is discarded without
 * counting.
 */
export function nextNumberOptions(sequence, step, rng) {
  const answer = sequence[sequence.length - 1] + step;
  // Built with `reserve`, so this cannot happen — but a silent out-of-range
  // answer is worse than a loud null.
  if (answer > 1000) return null;
  const candidates = [
    answer + step,
    answer - step,
    answer + 1,
    answer - 1,
    answer + 10,
  ].filter((n) => n !== answer && n > 0 && n <= 1000);

  const options = [answer];
  for (const candidate of shuffle(candidates, rng)) {
    if (options.length === 4) break;
    if (!options.includes(candidate)) options.push(candidate);
  }
  return shuffle(options, rng);
}

/**
 * Multiples and non-multiples of `step`, for "which of these are in the count?".
 * Non-multiples sit near real ones so the answer cannot be eyeballed by size.
 */
export function multiplePicker(step, rng, { count = 6 } = {}) {
  const multiples = [];
  for (let value = step; value <= 1000; value += step) multiples.push(value);

  const chosen = shuffle(multiples, rng).slice(0, Math.ceil(count / 2));
  const decoys = chosen
    .map((value) => value + (rng() < 0.5 ? 1 : -1) * (step > 10 ? 10 : 1))
    .filter((value) => value > 0 && value <= 1000 && !isMultipleOf(value, step));

  const unique = [...new Set([...chosen, ...decoys])].slice(0, count);
  return {
    options: shuffle(unique, rng),
    correct: unique.filter((value) => isMultipleOf(value, step)),
  };
}
