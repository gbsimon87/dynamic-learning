import test from "node:test";
import assert from "node:assert/strict";
import { seeded } from "./random.js";
import {
  LEVELS,
  dialCount,
  formatNumber,
  makeReadingQuestion,
  numberWords,
  placeParts,
  similarNumbers,
} from "./readingNumbers.js";

test("questions are well formed at every level and mode", () => {
  for (const { id, range } of LEVELS) {
    for (const mode of ["mixed", "build"]) {
      for (let seed = 1; seed <= 300; seed += 1) {
        const q = makeReadingQuestion(seeded(seed * 31 + id), id, mode);
        assert.ok(q.key && q.prompt && q.speech, q.key);
        assert.ok(q.value >= 1 && q.value <= range[1], q.key);
        if (mode === "build") {
          assert.equal(q.kind, "build");
          assert.equal(q.answer, q.value);
          assert.ok(String(q.value).length <= q.dials);
        } else {
          assert.notEqual(q.kind, "build");
          assert.equal(q.options.length, 4, q.key);
          assert.equal(new Set(q.options).size, 4, q.key);
          assert.ok(q.options.includes(q.answer), q.key);
        }
      }
    }
  }
});

test("mixed rounds deal all three kinds", () => {
  const kinds = new Set();
  for (let seed = 1; seed <= 100; seed += 1) kinds.add(makeReadingQuestion(seeded(seed), 3).kind);
  assert.deepEqual([...kinds].sort(), ["hear", "toDigits", "toWords"]);
});

test("similar numbers are three different positive numbers, never the answer", () => {
  for (const value of [1, 7, 10, 13, 20, 99, 100, 347, 407, 1000, 4050, 54321, 100000]) {
    for (let seed = 1; seed <= 50; seed += 1) {
      const options = similarNumbers(value, seeded(seed));
      assert.equal(options.length, 3, String(value));
      assert.equal(new Set(options).size, 3, String(value));
      assert.ok(!options.includes(value));
      assert.ok(options.every((n) => Number.isInteger(n) && n >= 1 && n <= 100000));
    }
  }
});

test("words and digits are written the British way", () => {
  assert.equal(numberWords(347), "three hundred and forty-seven");
  assert.equal(numberWords(3047), "three thousand and forty-seven");
  assert.equal(numberWords(100000), "one hundred thousand");
  assert.equal(formatNumber(347), "347");
  assert.equal(formatNumber(4567), "4,567");
  assert.equal(formatNumber(54321), "54,321");
});

test("place parts split a number into what each digit is worth", () => {
  assert.deepEqual(
    placeParts(347).map((p) => [p.value, p.words]),
    [[300, "three hundred"], [40, "forty"], [7, "seven"]]
  );
  assert.deepEqual(placeParts(413).map((p) => p.value), [400, 13]);
  assert.deepEqual(placeParts(4005).map((p) => p.value), [4000, 5]);
  assert.deepEqual(placeParts(10).map((p) => p.value), [10]);
  assert.equal(placeParts(54321).reduce((sum, p) => sum + p.value, 0), 54321);
});

test("each level needs as many dials as its biggest number has digits", () => {
  assert.deepEqual(LEVELS.map((l) => dialCount(l.id)), [2, 3, 4, 5, 6]);
  assert.throws(() => dialCount(9), RangeError);
});
