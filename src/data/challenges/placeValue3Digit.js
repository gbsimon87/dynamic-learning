/**
 * Place value in 3-digit numbers — Year 3.
 *
 * Statutory requirement: "recognise the place value of each digit in a 3-digit
 * number (100s, 10s, 1s)". The non-statutory guidance supplies the example this
 * module is built around: 146 = 100 + 40 + 6, and 146 = 130 + 16. Partitioning
 * the second way is the part Year 3 adds to Year 2, so it gets first-class
 * support here rather than being an afterthought.
 *
 * Pure: no React, and `rng` is a parameter so challenges randomise per mount
 * while tests stay deterministic.
 */

// One implementation of "is this typed answer right?", shared with Year 2 —
// a second copy is how "043" ends up accepted in one topic and rejected in
// another.
export { isCorrectNumber } from "./numbersAndCounting.js";

const PLACE_VALUES = { hundreds: 100, tens: 10, ones: 1 };

/** The three digits of a number, by place. */
export function digitsOf(value) {
  return {
    hundreds: Math.floor(value / 100),
    tens: Math.floor((value % 100) / 10),
    ones: value % 10,
  };
}

/**
 * How many of each base-ten piece draw this number: flats, rods and cubes.
 * `total` travels with it so a renderer can assert the picture against the
 * number rather than trusting the caller.
 */
export function blockPicture3(value) {
  const { hundreds, tens, ones } = digitsOf(value);
  return { hundreds, tens, ones, total: value };
}

/** The name of a place — what the learner is being asked to read. */
export function columnLabel(place) {
  return place;
}

/** The value one piece of that place is worth. */
export function placeWorth(place) {
  return PLACE_VALUES[place];
}

/**
 * 146 -> [100, 40, 6].
 *
 * Empty places are dropped: "700 + 0 + 5" is not how anyone partitions 705,
 * and showing a zero term invites the answer "three parts".
 */
export function partitionStandard(value) {
  const { hundreds, tens, ones } = digitsOf(value);
  return [hundreds * 100, tens * 10, ones].filter((part) => part > 0);
}

/**
 * 146 -> [130, 16]: one ten moved out of the tens and into the ones.
 *
 * Returns null when there is no ten to move, rather than inventing a partition.
 * A caller that renders null as a question would be asking something false.
 */
export function partitionRegrouped(value) {
  const { tens } = digitsOf(value);
  if (tens === 0) return null;
  const head = value - (value % 10) - 10;
  const tail = value - head;
  return [head, tail];
}

/**
 * Carry out every exchange available: ten ones become a ten, ten tens become a
 * hundred, and the ones cascade into the tens before the tens are counted.
 *
 * The VALUE never changes — that is the whole point of an exchange, and the
 * tests pin it.
 */
export function exchangeSteps({ hundreds = 0, tens = 0, ones = 0 }) {
  const carriedTens = Math.floor(ones / 10);
  const remainingOnes = ones % 10;

  const totalTens = tens + carriedTens;
  const carriedHundreds = Math.floor(totalTens / 10);
  const remainingTens = totalTens % 10;

  return {
    hundreds: hundreds + carriedHundreds,
    tens: remainingTens,
    ones: remainingOnes,
  };
}

/** What a pile of blocks is worth. */
export function buildNumberFromBlocks({ hundreds = 0, tens = 0, ones = 0 }) {
  return hundreds * 100 + tens * 10 + ones;
}

/**
 * Four options: the answer plus three plausible near misses.
 *
 * The misreadings worth offering are digit swaps (146/164) and slips of one
 * place (146/136, 146/246) — a random number is eliminated without doing any
 * maths. Everything is clamped into Year 3's range of 1000 and kept positive.
 */
export function nearMissOptions(value, rng) {
  const { hundreds, tens, ones } = digitsOf(value);

  const candidates = [
    hundreds * 100 + ones * 10 + tens, // tens and ones swapped
    value + 10,
    value - 10,
    value + 100,
    value - 100,
    value + 1,
    value - 1,
  ].filter(
    (candidate) =>
      candidate !== value && candidate > 0 && candidate <= 1000
  );

  const options = [value];
  for (const candidate of shuffleValues(candidates, rng)) {
    if (options.length === 4) break;
    if (!options.includes(candidate)) options.push(candidate);
  }

  return shuffleValues(options, rng);
}

/** Fisher–Yates against the supplied rng, so tests can seed it. */
export function shuffleValues(values, rng) {
  const copy = [...values];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
