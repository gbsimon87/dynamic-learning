import writtenNumber from "written-number";
import { pick, randInt, shuffle } from "./random.js";

/**
 * Reading Numbers — endless questions on saying and writing big numbers.
 *
 *   toWords   see 347, pick "three hundred and forty-seven"
 *   toDigits  read the words, pick 347
 *   hear      listen to the number, pick 347
 *   build     read the words, set the digit dials to 347
 *
 * `mode` "mixed" deals the first three; "build" deals only build questions.
 * Levels are ranges, not difficulty: 1 to 20, to 100, to 1,000, to 10,000 and
 * to 100,000 (the `written-number` package is only reliable to about 775,000).
 * Wrong options are the slips a child really makes: swapped digits, a missing
 * or extra zero, 13 against 30.
 */

export const LEVELS = [
  { id: 1, label: "🌱 To 20", range: [1, 20] },
  { id: 2, label: "🌿 To 100", range: [21, 100] },
  { id: 3, label: "🌳 To 1,000", range: [101, 1000] },
  { id: 4, label: "🚀 To 10,000", range: [1001, 10000] },
  { id: 5, label: "🌌 To 100,000", range: [10001, 100000] },
];

export const PLACE_NAMES = ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands"];

const MAX_VALUE = 100000;

export function numberWords(value) {
  return writtenNumber(value, { lang: "enGb" });
}

/** 4,567 — commas from a thousand up, as the curriculum writes them. */
export function formatNumber(value) {
  return value >= 1000 ? value.toLocaleString("en-GB") : String(value);
}

/** How many digit dials a level needs: the width of its biggest number. */
export function dialCount(level) {
  return String(rangeFor(level)[1]).length;
}

function rangeFor(level) {
  const found = LEVELS.find((option) => option.id === level);
  if (!found) throw new RangeError(`Unknown reading-numbers level: ${level}`);
  return found.range;
}

/**
 * A number's pieces, biggest first: 347 is 300, 40, 7. Teens stay whole
 * (the 13 in 413), because "thirteen" is not "ten" and "three".
 * `place` is the index into PLACE_NAMES of the piece's leading digit.
 */
export function placeParts(value) {
  const digits = String(value).split("").map(Number);
  const parts = [];
  let i = 0;
  while (i < digits.length) {
    const place = digits.length - 1 - i;
    const digit = digits[i];
    if (place === 1 && digit === 1) {
      parts.push({ value: 10 + digits[i + 1], place });
      i += 2;
      continue;
    }
    if (digit !== 0) parts.push({ value: digit * 10 ** place, place });
    i += 1;
  }
  return parts.map((part) => ({ ...part, words: numberWords(part.value) }));
}

/** Numbers a hurried reader mixes up with `value`; always three, never `value`. */
export function similarNumbers(value, rng) {
  const s = String(value);
  const found = new Set();
  const add = (n) => {
    if (Number.isInteger(n) && n >= 1 && n <= MAX_VALUE && n !== value) found.add(n);
  };

  for (let i = 0; i < s.length - 1; i += 1) {
    if (s[i] === s[i + 1]) continue;
    const swapped = s.split("");
    [swapped[i], swapped[i + 1]] = [swapped[i + 1], swapped[i]];
    if (swapped[0] !== "0") add(Number(swapped.join("")));
  }
  for (let i = 1; i <= s.length; i += 1) add(Number(`${s.slice(0, i)}0${s.slice(i)}`));
  for (let i = 0; i < s.length; i += 1) {
    if (s[i] === "0") add(Number(s.slice(0, i) + s.slice(i + 1)));
  }
  const last = Number(s[s.length - 1]);
  add(value - last + ((last + 1) % 10));
  add(value - last + ((last + 9) % 10));
  if (s.length >= 2 && s[s.length - 2] === "1") add(value - (value % 100) + last * 10 + 1);

  const options = shuffle([...found], rng).slice(0, 3);
  for (let step = 1; options.length < 3 && step < 50; step += 1) {
    const near = value + step * pick(rng, [-1, 1]);
    if (near >= 1 && near <= MAX_VALUE && near !== value && !options.includes(near)) options.push(near);
  }
  return options;
}

/** A number in the level's range; from 1,000 up a third have a zero inside. */
function pickValue(rng, level) {
  const [low, high] = rangeFor(level);
  const value = randInt(rng, low, high);
  if (level < 3 || rng() >= 0.35) return value;
  const s = String(value).split("");
  const inner = randInt(rng, 1, s.length - 1);
  s[inner] = "0";
  const zeroed = Number(s.join(""));
  return zeroed >= low && zeroed <= high ? zeroed : value;
}

function tileOptions(value, rng, show) {
  return shuffle([value, ...similarNumbers(value, rng)], rng).map(show);
}

/** `canHear` false (no speech voice on this device) never deals "hear". */
export function makeReadingQuestion(rng, level, mode = "mixed", { canHear = true } = {}) {
  const value = pickValue(rng, level);
  const words = numberWords(value);
  const digits = formatNumber(value);
  const kinds = canHear ? ["toWords", "toDigits", "hear"] : ["toWords", "toDigits"];
  const kind = mode === "build" ? "build" : pick(rng, kinds);
  const base = { kind, key: `${kind}:${value}`, value, words, digits };

  if (kind === "toWords") {
    return {
      ...base,
      answer: words,
      options: tileOptions(value, rng, numberWords),
      prompt: "Which words match this number?",
      speech: `Which words match the number ${value}?`,
    };
  }
  if (kind === "toDigits") {
    return {
      ...base,
      answer: digits,
      options: tileOptions(value, rng, formatNumber),
      prompt: "Which number do these words say?",
      speech: `Which number is ${words}?`,
    };
  }
  if (kind === "hear") {
    return {
      ...base,
      answer: digits,
      options: tileOptions(value, rng, formatNumber),
      prompt: "Listen. Which number did you hear?",
      speech: words,
    };
  }
  return {
    ...base,
    answer: value,
    dials: dialCount(level),
    prompt: "Build this number with the dials.",
    speech: `Build the number ${words}.`,
  };
}
