import test from "node:test";
import assert from "node:assert/strict";
import {
  PICTOGRAM_RATIOS,
  tallyGroups,
  countFromGroups,
  symbolCount,
  valueFromSymbols,
  total,
  mostPopular,
  leastPopular,
  difference,
  sortByQuantity,
  hasUniqueValues,
  countByCategory,
  axisTicks,
  nearMissOptions,
  pictogramOptions,
  clamp,
} from "./statistics.js";

/* ---------- tally marks ---------- */

test("tally marks are grouped in gates of five", () => {
  assert.deepEqual(tallyGroups(12), [5, 5, 2]);
  assert.deepEqual(tallyGroups(5), [5]);
  assert.deepEqual(tallyGroups(3), [3]);
});

test("a count of zero has no tally groups", () => {
  assert.deepEqual(tallyGroups(0), []);
});

test("a gate of five is never left as a trailing group of zero", () => {
  assert.deepEqual(tallyGroups(10), [5, 5]);
  assert.deepEqual(tallyGroups(15), [5, 5, 5]);
});

test("reading tally groups back gives the original count", () => {
  for (let n = 0; n <= 30; n += 1) {
    assert.equal(countFromGroups(tallyGroups(n)), n);
  }
});

/* ---------- pictograms: many-to-one correspondence ---------- */

test("the ratios are the three the guidance names", () => {
  assert.deepEqual(PICTOGRAM_RATIOS, [2, 5, 10]);
});

test("one symbol stands for `ratio` things", () => {
  assert.equal(symbolCount(10, 2), 5);
  assert.equal(symbolCount(20, 5), 4);
  assert.equal(symbolCount(30, 10), 3);
});

test("a value that is not a whole number of symbols is refused", () => {
  // Half symbols are beyond Year 2 here, so a bad dataset must be loud
  // rather than silently drawing the wrong row.
  assert.throws(() => symbolCount(7, 2));
  assert.throws(() => symbolCount(12, 5));
});

test("counting the symbols gives the value back", () => {
  for (const ratio of PICTOGRAM_RATIOS) {
    for (let symbols = 0; symbols <= 6; symbols += 1) {
      assert.equal(valueFromSymbols(symbols, ratio), symbols * ratio);
      assert.equal(symbolCount(valueFromSymbols(symbols, ratio), ratio), symbols);
    }
  }
});

/* ---------- reading a chart ---------- */

const ROWS = [
  { label: "Cats", value: 6 },
  { label: "Dogs", value: 10 },
  { label: "Fish", value: 4 },
];

test("totals every category", () => {
  assert.equal(total(ROWS), 20);
  assert.equal(total([]), 0);
});

test("finds the most and least popular category", () => {
  assert.equal(mostPopular(ROWS), "Dogs");
  assert.equal(leastPopular(ROWS), "Fish");
});

test("a tie has no single most popular category, so it answers null", () => {
  // Two rows on 10 means two correct answers to "which is most popular"
  // while the validator only accepts one. Null makes that unaskable.
  const tied = [
    { label: "Cats", value: 10 },
    { label: "Dogs", value: 10 },
    { label: "Fish", value: 4 },
  ];
  assert.equal(mostPopular(tied), null);
  assert.equal(leastPopular([{ label: "A", value: 2 }, { label: "B", value: 2 }]), null);
});

test("compares two categories, whichever way round they are given", () => {
  assert.equal(difference(ROWS, "Dogs", "Fish"), 6);
  assert.equal(difference(ROWS, "Fish", "Dogs"), 6);
});

test("comparing an unknown category is an error, not a wrong number", () => {
  assert.throws(() => difference(ROWS, "Dogs", "Rabbits"));
});

test("sorts the categories by quantity, both directions", () => {
  assert.deepEqual(sortByQuantity(ROWS, "most-first"), ["Dogs", "Cats", "Fish"]);
  assert.deepEqual(sortByQuantity(ROWS, "fewest-first"), ["Fish", "Cats", "Dogs"]);
});

test("a tie has no single correct order", () => {
  const tied = [
    { label: "Cats", value: 6 },
    { label: "Dogs", value: 6 },
  ];
  assert.equal(sortByQuantity(tied, "most-first"), null);
});

test("hasUniqueValues is the guard a dataset must pass before it is asked about", () => {
  assert.equal(hasUniqueValues(ROWS), true);
  assert.equal(hasUniqueValues([{ label: "A", value: 3 }, { label: "B", value: 3 }]), false);
  assert.equal(hasUniqueValues([]), true);
});

/* ---------- raw data, before it is organised ---------- */

test("counts loose objects into the given categories, keeping their order", () => {
  const items = ["apple", "pear", "apple", "plum", "apple"];
  assert.deepEqual(countByCategory(items, ["pear", "apple", "plum"]), [
    { label: "pear", value: 1 },
    { label: "apple", value: 3 },
    { label: "plum", value: 1 },
  ]);
});

test("a category nothing was collected for still appears, on zero", () => {
  assert.deepEqual(countByCategory(["apple"], ["apple", "pear"]), [
    { label: "apple", value: 1 },
    { label: "pear", value: 0 },
  ]);
});

test("an object outside the given categories is an error", () => {
  // Silently dropping it would make the chart disagree with the pile.
  assert.throws(() => countByCategory(["apple", "fig"], ["apple"]));
});

/* ---------- block diagram axis ---------- */

test("axis ticks run from zero to the top in whole steps", () => {
  assert.deepEqual(axisTicks(10, 2), [0, 2, 4, 6, 8, 10]);
  assert.deepEqual(axisTicks(6, 1), [0, 1, 2, 3, 4, 5, 6]);
});

test("the axis always reaches at least the tallest bar", () => {
  // A bar drawn past the top of its own scale is unreadable.
  const ticks = axisTicks(9, 2);
  assert.ok(ticks[ticks.length - 1] >= 9);
});

/* ---------- distractors ---------- */

test("wrong answers are near misses, never random numbers", () => {
  const options = nearMissOptions(7, 4, () => 0.5);
  assert.equal(options.length, 4);
  assert.ok(options.includes(7));
  for (const option of options) {
    assert.ok(Math.abs(option - 7) <= 4, `${option} is not a near miss of 7`);
  }
});

test("options are never negative, however small the answer", () => {
  for (let answer = 0; answer <= 4; answer += 1) {
    for (const option of nearMissOptions(answer, 4, () => 0.5)) {
      assert.ok(option >= 0, `${option} is negative`);
    }
  }
});

test("options never repeat, so no two buttons look the same", () => {
  for (let answer = 0; answer <= 20; answer += 1) {
    const options = nearMissOptions(answer, 4, () => 0.5);
    assert.equal(new Set(options).size, options.length);
  }
});

test("pictogram options include the mistake of ignoring the key", () => {
  // Reading 3 symbols at 1:5 as "3" is THE pictogram error. If that number is
  // not on screen, the question can be answered without using the key at all.
  const options = pictogramOptions(15, 5, 4, () => 0.5);
  assert.ok(options.includes(15), "the answer is missing");
  assert.ok(options.includes(3), "the forgot-the-key answer is missing");
  assert.equal(options.length, 4);
});

test("pictogram distractors are a whole number of symbols out", () => {
  // An option of 14 at 1:5 is not reachable by miscounting symbols, so it is
  // eliminable without doing the maths.
  for (const ratio of PICTOGRAM_RATIOS) {
    for (const options of [pictogramOptions(ratio * 4, ratio, 4, () => 0.5)]) {
      const wrong = options.filter((o) => o !== ratio * 4 && o !== 4);
      for (const option of wrong) {
        assert.equal(option % ratio, 0, `${option} is not a multiple of ${ratio}`);
      }
    }
  }
});

test("pictogram options never repeat and are never negative", () => {
  for (const ratio of PICTOGRAM_RATIOS) {
    for (let symbols = 1; symbols <= 6; symbols += 1) {
      const options = pictogramOptions(symbols * ratio, ratio, 4, () => 0.5);
      assert.equal(new Set(options).size, options.length, `dupes at ${symbols}x${ratio}`);
      for (const option of options) assert.ok(option >= 0);
    }
  }
});

test("clamp keeps a stepped count inside its range", () => {
  // The +/- controls on a chart accumulate, so two fast taps at the top must
  // not push a row past its limit.
  assert.equal(clamp(5, 0, 8), 5);
  assert.equal(clamp(9, 0, 8), 8);
  assert.equal(clamp(-1, 0, 8), 0);
});

test("zero is never offered against a non-zero answer", () => {
  // A chart row with anything on it rules out "none" at a glance, so a zero
  // option turns a four-way question into a three-way one for free.
  for (let answer = 1; answer <= 20; answer += 1) {
    assert.ok(!nearMissOptions(answer, 4, () => 0.5).includes(0), `near miss at ${answer}`);
  }
  for (const ratio of PICTOGRAM_RATIOS) {
    for (let symbols = 1; symbols <= 6; symbols += 1) {
      const options = pictogramOptions(symbols * ratio, ratio, 4, () => 0.5);
      assert.ok(!options.includes(0), `pictogram at ${symbols}x${ratio}: ${options}`);
    }
  }
});

test("zero is still allowed when zero is the answer", () => {
  assert.ok(nearMissOptions(0, 4, () => 0.5).includes(0));
});
