import { formatMoney, totalOf } from "../challenges/measurement.js";
import { assertLevel, pick, randInt, shuffle } from "./random.js";

/**
 * Money Match — endless questions for the Skills Mode money game.
 *
 * Two kinds, both on the challenge kit's real UK coins:
 *   count  "How much money is here?" over a few coins, four options
 *   make   "Make 35p" by tapping coins into the CoinTray
 *
 * Levels follow the programmes of study:
 *   1  Year 2, gentle — pence only, up to 50p, coins up to 20p
 *   2  Year 2 — pence up to 99p, OR whole pounds; never both in one question
 *      ("money problems within one unit")
 *   3  Year 3 — pounds and pence together, written £1.35
 *
 * Pure: `rng` is a parameter and nothing loops without a bound.
 */

const PENCE_EASY = [1, 2, 5, 10, 20];
const PENCE_ALL = [1, 2, 5, 10, 20, 50];
const POUND_COINS = [100, 200];

/** "35 pence", "1 penny", "3 pounds", "1 pound 25" — for the read-aloud button. */
export function sayMoney(pence) {
  if (pence < 100) return pence === 1 ? "1 penny" : `${pence} pence`;
  const pounds = Math.floor(pence / 100);
  const rest = pence % 100;
  const poundWord = pounds === 1 ? "pound" : "pounds";
  return rest === 0 ? `${pounds} ${poundWord}` : `${pounds} ${poundWord} ${rest}`;
}

/** True when an amount stays inside one unit: under £1, or whole pounds. */
export function isSingleUnit(pence) {
  return pence < 100 || pence % 100 === 0;
}

/**
 * Picks `count` coins from `allowed` without the total passing `max`. Bounded
 * by `count`; stops early when nothing else fits.
 */
function coinsWithin(rng, allowed, count, max) {
  const coins = [];
  let budget = max;
  for (let i = 0; i < count; i += 1) {
    const fits = allowed.filter((coin) => coin <= budget);
    if (fits.length === 0) break;
    const coin = pick(rng, fits);
    coins.push(coin);
    budget -= coin;
  }
  return coins.sort((a, b) => b - a);
}

/**
 * The coins to count at each level. Level 2 picks pence or pounds, never a
 * mixture; level 3 always mixes, so it really is the Year 3 skill.
 */
export function countingCoins(level, rng) {
  assertLevel(level);
  if (level === 1) return coinsWithin(rng, PENCE_EASY, randInt(rng, 2, 4), 50);
  if (level === 2) {
    return rng() < 0.3
      ? coinsWithin(rng, POUND_COINS, randInt(rng, 2, 4), 800)
      : coinsWithin(rng, PENCE_ALL, randInt(rng, 3, 5), 99);
  }
  const pounds = coinsWithin(rng, POUND_COINS, randInt(rng, 1, 2), 400);
  const pence = coinsWithin(rng, [5, 10, 20, 50, 2, 1], randInt(rng, 1, 3), 99);
  return [...pounds, ...pence].sort((a, b) => b - a);
}

/**
 * Four amounts: the answer plus the totals a child gets by missing one coin
 * or counting one twice — the real counting slips, not random numbers.
 * Never zero or negative, never a tie, and at levels 1–2 never outside the
 * answer's unit.
 */
export function countOptions(coins, level, rng) {
  const answer = totalOf(coins);
  const keep = (value) =>
    value > 0 && value !== answer && (level === 3 || (answer < 100 ? value < 100 : value % 100 === 0));

  const slips = [...new Set(coins)].flatMap((coin) => [answer - coin, answer + coin]);
  const fallback = answer < 100 || level === 3 ? [1, 2, 5, 10, 20] : [100, 200, 300];
  const spare = fallback.flatMap((step) => [answer + step, answer - step]);

  const options = [answer];
  for (const value of [...shuffle(slips, rng), ...spare]) {
    if (options.length === 4) break;
    if (keep(value) && !options.includes(value)) options.push(value);
  }
  return shuffle(options, rng);
}

const MAKE_TARGETS = {
  1: () => [3, 4, 6, 7, 8, 9, 11, 12, 13, 15, 16, 17, 18, 21, 22, 25, 27, 30, 32, 35, 40, 45, 50],
  2: () => [
    23, 28, 36, 44, 47, 55, 58, 63, 66, 72, 75, 81, 85, 88, 92, 96, 99,
    100, 200, 300, 400, 500,
  ],
  3: () => [105, 120, 125, 135, 150, 160, 175, 210, 225, 240, 255, 270, 305, 320, 350],
};

/**
 * @param {1|2|3} level
 * @param {() => number} rng
 * @returns a question: { kind, key, prompt, speech, answer, ... }
 */
export function makeMoneyQuestion(rng, level) {
  assertLevel(level);

  if (rng() < 0.5) {
    const coins = countingCoins(level, rng);
    const answer = totalOf(coins);
    return {
      kind: "count",
      key: `count:${coins.join("+")}`,
      coins,
      answer,
      answerLabel: formatMoney(answer),
      options: countOptions(coins, level, rng).map(formatMoney),
      prompt: "How much money is here?",
      speech: "How much money is here? Add up the coins.",
    };
  }

  const target = pick(rng, MAKE_TARGETS[level]());
  return {
    kind: "make",
    key: `make:${target}`,
    target,
    answer: target,
    prompt: `Make ${formatMoney(target)} with the coins.`,
    speech: `Make ${sayMoney(target)} with the coins.`,
  };
}
