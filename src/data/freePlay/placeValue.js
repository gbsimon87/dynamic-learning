import { fromParts, placeValueDistractors } from "../challenges/placeValue.js";
import { digitsOf, nearMissOptions } from "../challenges/placeValue3Digit.js";
import { assertLevel, pick, randInt, shuffle } from "./random.js";

/**
 * Place Value Blocks — endless questions on the kit's base-ten blocks.
 *
 *   read   what number do the blocks show? (counts hidden: count the pieces)
 *   build  make a number with the + / − buttons
 *   digit  what is the 4 worth in 47?
 *
 * Levels: 1 is Year 2 tens and ones to 50; 2 is tens and ones to 99; 3 is
 * Year 3 hundreds, tens and ones.
 */

const RANGES = { 1: [11, 50], 2: [10, 99], 3: [101, 999] };
const PLACE_NAMES = ["hundreds", "tens", "ones"];

/** A number with all-different, non-zero digits — so "the 4" is never ambiguous. */
export function distinctDigitNumber(rng, level) {
  const digits = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9], rng);
  if (level === 3) return digits[0] * 100 + digits[1] * 10 + digits[2];
  const tens = level === 1 ? pick(rng, [1, 2, 3, 4]) : digits[0];
  const ones = digits.find((d) => d !== tens);
  return fromParts(tens, ones);
}

/** "4 tens and 7 ones" — the picture in words, for a screen reader. */
export function describeBlocks(value) {
  const { hundreds, tens, ones } = digitsOf(value);
  const parts = [];
  if (hundreds) parts.push(`${hundreds} ${hundreds === 1 ? "hundred" : "hundreds"}`);
  parts.push(`${tens} ${tens === 1 ? "ten" : "tens"}`);
  parts.push(`${ones} ${ones === 1 ? "one" : "ones"}`);
  return `Base-ten blocks: ${parts.join(", ")}`;
}

/** Four numbers: the answer plus a digit swap and one-place slips. */
export function readOptions(value, level, rng) {
  if (level === 3) return nearMissOptions(value, rng);
  return shuffle([value, ...placeValueDistractors(value, 3)], rng);
}

/** What a digit is worth: the answer, the digit itself, and one place out. */
export function digitOptions(value, place, rng) {
  const digit = digitsOf(value)[place];
  const worth = { hundreds: 100, tens: 10, ones: 1 }[place];
  const candidates = [digit * worth, digit, digit * 10, digit * 100, value];
  const options = [];
  for (const candidate of candidates) {
    if (options.length === 4) break;
    if (value < 100 && candidate >= 100 && candidate !== value) continue;
    if (!options.includes(candidate)) options.push(candidate);
  }
  return shuffle(options, rng);
}

export function makePlaceValueQuestion(rng, level) {
  assertLevel(level);
  const kind = pick(rng, ["read", "build", "digit"]);

  if (kind === "digit") {
    const value = distinctDigitNumber(rng, level);
    const places = level === 3 ? PLACE_NAMES : PLACE_NAMES.slice(1);
    const place = pick(rng, places);
    const digit = digitsOf(value)[place];
    const worth = { hundreds: 100, tens: 10, ones: 1 }[place];
    return {
      kind,
      key: `digit:${value}:${place}`,
      value,
      place,
      answer: digit * worth,
      options: digitOptions(value, place, rng),
      prompt: `What is the ${digit} worth in ${value}?`,
      speech: `What is the ${digit} worth in the number ${value}?`,
    };
  }

  const [low, high] = RANGES[level];
  const value = randInt(rng, low, high);

  if (kind === "read") {
    return {
      kind,
      key: `read:${value}`,
      value,
      answer: value,
      options: readOptions(value, level, rng),
      label: describeBlocks(value),
      prompt: "What number do the blocks show?",
      speech: "What number do the blocks show? Count the tens and the ones.",
    };
  }

  return {
    kind: "build",
    key: `build:${value}`,
    value,
    answer: value,
    prompt: `Build ${value} with the blocks.`,
    speech: `Build the number ${value} with the blocks.`,
  };
}

/** The build controls can add a lot; keep every column countable. */
export const BUILD_LIMITS = { hundreds: 9, tens: 19, ones: 19 };
