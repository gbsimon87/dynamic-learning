import test from "node:test";
import assert from "node:assert/strict";
import {
  STEPS,
  isMultipleOf,
  multiplePicker,
  multipleSequence,
  nextNumberOptions,
  sequenceWithin1000,
  stepOf,
} from "./countingInMultiples.js";

const seeded = (seed) => () => {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return seed / 2147483648;
};

test("the taught steps are 4, 8, 50 and 100", () => {
  assert.deepEqual(STEPS, [4, 8, 50, 100]);
});

test("a sequence counts on in its step", () => {
  assert.deepEqual(multipleSequence(0, 4, 5), [0, 4, 8, 12, 16]);
  assert.deepEqual(multipleSequence(200, 50, 4), [200, 250, 300, 350]);
});

// "Count FROM 0 in multiples of 4" — counting in 4s from 5 is a different skill
// and not what this topic teaches.
test("a sequence must start on a multiple of its own step", () => {
  assert.equal(multipleSequence(5, 4, 4), null);
  assert.equal(multipleSequence(13, 50, 3), null);
});

test("generated sequences never leave Year 3's range", () => {
  const rng = seeded(11);
  for (const step of STEPS) {
    for (let i = 0; i < 200; i++) {
      const sequence = sequenceWithin1000(step, 6, rng);
      assert.ok(sequence[0] >= 0, `negative start ${sequence[0]}`);
      assert.ok(
        sequence[sequence.length - 1] <= 1000,
        `${sequence[sequence.length - 1]} is beyond 1000`
      );
      assert.equal(sequence[0] % step, 0, "start is not a multiple");
      assert.equal(stepOf(sequence), step);
    }
  }
});

test("a backwards sequence counts down by the same step", () => {
  const rng = seeded(5);
  const sequence = sequenceWithin1000(50, 5, rng, { backwards: true });
  assert.equal(stepOf(sequence), -50);
  assert.ok(sequence[sequence.length - 1] >= 0, "counted below zero");
});

test("stepOf reads a constant count and refuses a broken one", () => {
  assert.equal(stepOf([8, 16, 24, 32]), 8);
  assert.equal(stepOf([100, 200, 300]), 100);
  assert.equal(stepOf([4, 8, 15, 16]), null);
  assert.equal(stepOf([7]), null);
});

test("multiples are recognised", () => {
  assert.equal(isMultipleOf(32, 8), true);
  assert.equal(isMultipleOf(33, 8), false);
  assert.equal(isMultipleOf(950, 50), true);
});

test("next-number options always contain the answer and stay in range", () => {
  const rng = seeded(23);
  for (const step of STEPS) {
    for (let i = 0; i < 60; i++) {
      // reserve: 1 leaves room for the term the question asks for.
      const sequence = sequenceWithin1000(step, 4, rng, { reserve: 1 });
      const answer = sequence[sequence.length - 1] + step;
      const options = nextNumberOptions(sequence, step, rng);
      assert.notEqual(options, null, `no options for ${sequence}`);
      assert.ok(options.includes(answer), `answer ${answer} missing`);
      assert.equal(new Set(options).size, options.length, "duplicate option");
      for (const option of options) {
        assert.ok(option > 0 && option <= 1000, `${option} out of range`);
      }
    }
  }
});

test("a sequence with no room for its next term is refused, not clamped", () => {
  assert.equal(nextNumberOptions([970, 980, 990, 1000], 10, seeded(1)), null);
});

// A picker whose "correct" set is empty has no right answer at all, and one
// where every option is correct teaches nothing.
test("the multiple picker always has some right and some wrong answers", () => {
  const rng = seeded(41);
  for (const step of STEPS) {
    for (let i = 0; i < 60; i++) {
      const { options, correct } = multiplePicker(step, rng);
      assert.ok(correct.length > 0, "no correct option");
      assert.ok(correct.length < options.length, "every option is correct");
      for (const value of correct) {
        assert.ok(options.includes(value), "correct value not offered");
        assert.equal(isMultipleOf(value, step), true);
      }
      for (const value of options.filter((o) => !correct.includes(o))) {
        assert.equal(isMultipleOf(value, step), false, `${value} is a multiple`);
      }
    }
  }
});
