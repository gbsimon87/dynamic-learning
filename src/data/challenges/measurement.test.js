import test from "node:test";
import assert from "node:assert/strict";
import {
  COINS,
  formatMoney,
  totalOf,
  isValidCoinCombination,
  tickValues,
  compareMeasures,
  timeToWords,
  minutesToNextHour,
  CONVERSIONS,
  convert,
  scaleOptions,
} from "./measurement.js";

test("the coins are the real UK set", () => {
  assert.deepEqual(COINS, [1, 2, 5, 10, 20, 50, 100, 200]);
});

test("writes pence under a pound with a p", () => {
  assert.equal(formatMoney(7), "7p");
  assert.equal(formatMoney(47), "47p");
  assert.equal(formatMoney(99), "99p");
});

test("writes whole pounds without pence", () => {
  assert.equal(formatMoney(100), "£1");
  assert.equal(formatMoney(200), "£2");
});

test("writes pounds and pence with two digits", () => {
  // £1.05, never £1.5 — the trailing zero matters when reading money.
  assert.equal(formatMoney(105), "£1.05");
  assert.equal(formatMoney(120), "£1.20");
  assert.equal(formatMoney(275), "£2.75");
});

test("zero is 0p", () => {
  assert.equal(formatMoney(0), "0p");
});

test("totals a handful of coins", () => {
  assert.equal(totalOf([20, 20, 5, 2]), 47);
  assert.equal(totalOf([]), 0);
});

test("a combination is valid when it reaches the target exactly", () => {
  assert.equal(isValidCoinCombination([20, 20, 5, 2], 47), true);
  assert.equal(isValidCoinCombination([50], 47), false);
  assert.equal(isValidCoinCombination([], 47), false);
});

test("any combination reaching the target counts, not just the fewest coins", () => {
  // Statutory: "find DIFFERENT combinations of coins that equal the same
  // amount", so 20+20+10 and 50 are both correct for 50p.
  assert.equal(isValidCoinCombination([20, 20, 10], 50), true);
  assert.equal(isValidCoinCombination([50], 50), true);
});

test("builds the labelled ticks of a scale", () => {
  assert.deepEqual(tickValues(0, 30, 10), [0, 10, 20, 30]);
  assert.deepEqual(tickValues(-10, 20, 10), [-10, 0, 10, 20]);
});

test("compares two measurements", () => {
  assert.equal(compareMeasures(30, 40), "<");
  assert.equal(compareMeasures(100, 40), ">");
  assert.equal(compareMeasures(25, 25), "=");
});

test("says the time the way it is read aloud", () => {
  assert.equal(timeToWords(3, 0), "3 o'clock");
  assert.equal(timeToWords(3, 15), "quarter past 3");
  assert.equal(timeToWords(3, 30), "half past 3");
  assert.equal(timeToWords(3, 45), "quarter to 4");
});

test("reads five-minute times past and to the hour", () => {
  assert.equal(timeToWords(3, 5), "5 past 3");
  assert.equal(timeToWords(3, 25), "25 past 3");
  assert.equal(timeToWords(3, 35), "25 to 4");
  assert.equal(timeToWords(3, 55), "5 to 4");
});

test("the hour rolls over from 12 to 1", () => {
  assert.equal(timeToWords(12, 45), "quarter to 1");
});

test("counts the minutes to the next hour", () => {
  assert.equal(minutesToNextHour(35), 25);
  assert.equal(minutesToNextHour(0), 60);
});

test("knows the statutory conversions", () => {
  assert.deepEqual(CONVERSIONS.find((c) => c.from === "cm").perUnit, 100);
  assert.equal(convert(200, "cm"), 2);
  assert.equal(convert(3000, "g"), 3);
  assert.equal(convert(120, "min"), 2);
});

test("scale options always give the full number of choices", () => {
  // At the very ends of a scale one neighbour falls off it. Dropping it left
  // only two options, turning the question into a coin flip.
  assert.equal(scaleOptions(-10, 10, -10, 50, 3).length, 3);
  assert.equal(scaleOptions(50, 10, -10, 50, 3).length, 3);
  assert.equal(scaleOptions(30, 5, 0, 30, 3).length, 3);
  assert.equal(scaleOptions(1000, 100, 0, 1000, 3).length, 3);
});

test("scale options always contain the answer, and stay on the scale", () => {
  for (const [value, step, min, max] of [[-10, 10, -10, 50], [0, 5, 0, 30], [1000, 100, 0, 1000], [20, 10, -10, 50]]) {
    const options = scaleOptions(value, step, min, max, 3);
    assert.ok(options.includes(value), `${value} missing from its own options`);
    assert.equal(new Set(options).size, options.length);
    for (const o of options) assert.ok(o >= min && o <= max, `${o} is off the scale`);
  }
});

test("scale options are a whole number of steps from the answer", () => {
  // Otherwise a distractor could not be read off the scale at all.
  for (const o of scaleOptions(20, 10, -10, 50, 3)) {
    // Math.abs, because (10 - 20) % 10 is -0 and strict equality rejects that.
    assert.equal(Math.abs((o - 20) % 10), 0);
  }
});
