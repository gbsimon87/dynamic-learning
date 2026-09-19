import test from "node:test";
import assert from "node:assert/strict";
import {
  LINE_MAX,
  LINE_MAJOR_STEP,
  LINE_MIN,
  MAX_PER_COLUMN,
  MIN_OPTION_GAP,
  buildNumberFromBlocks,
  buildRepresentQuestions,
  emptyBlocks,
  estimateOptions,
  stepBlocks,
} from "./representingNumbers.js";

const seeded = (seed) => () => {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return seed / 2147483648;
};

test("the estimation line is 0 to 1000 with the hundreds labelled", () => {
  assert.equal(LINE_MIN, 0);
  assert.equal(LINE_MAX, 1000);
  assert.equal(LINE_MAJOR_STEP, 100);
});

// A step, not a total: the challenge applies it with setState(prev => ...), so
// two fast taps cannot overwrite each other.
test("a block column steps by one and clamps at both ends", () => {
  assert.deepEqual(stepBlocks(emptyBlocks(), "tens", 1), { hundreds: 0, tens: 1, ones: 0 });
  assert.deepEqual(stepBlocks(emptyBlocks(), "tens", -1), { hundreds: 0, tens: 0, ones: 0 });
  assert.equal(
    stepBlocks({ hundreds: 0, tens: MAX_PER_COLUMN, ones: 0 }, "tens", 1).tens,
    MAX_PER_COLUMN
  );
});

test("blocks are worth what their columns say", () => {
  assert.equal(buildNumberFromBlocks({ hundreds: 3, tens: 0, ones: 7 }), 307);
  assert.equal(buildNumberFromBlocks({ hundreds: 2, tens: 13, ones: 4 }), 334);
  assert.equal(buildNumberFromBlocks({ hundreds: 3, tens: 0, ones: 12 }), 312);
});

// The whole point of an estimating question: the pointer must be nearest to
// exactly one option, or a learner who judges correctly can still be wrong.
test("estimate options are never close enough to be a toss-up", () => {
  const rng = seeded(31);
  for (let value = 50; value <= 950; value += 25) {
    const options = estimateOptions(value, rng);
    assert.ok(options.includes(value), `${value} lost its own answer`);
    assert.equal(new Set(options).size, options.length, "a duplicate option");
    for (const option of options) {
      assert.ok(option >= LINE_MIN && option <= LINE_MAX, `${option} is off the line`);
      if (option === value) continue;
      assert.ok(
        Math.abs(option - value) >= MIN_OPTION_GAP,
        `${option} is only ${Math.abs(option - value)} from ${value}`
      );
    }
  }
});

test("level 1 draws the number it is asking about", () => {
  const questions = buildRepresentQuestions(1, seeded(2));
  assert.equal(questions.length, 6);
  for (const q of questions) {
    assert.equal(buildNumberFromBlocks(q.picture), q.value);
    assert.equal(q.answer, q.value);
    assert.ok(q.options.includes(q.answer), `${q.value} lost its answer`);
    for (const column of ["hundreds", "tens", "ones"]) {
      assert.ok(q.picture[column] <= MAX_PER_COLUMN, "a column needs an exchange");
    }
  }
});

test("level 2 never parks the pointer on a labelled tick", () => {
  const questions = buildRepresentQuestions(2, seeded(6));
  assert.equal(questions.length, 6);
  for (const q of questions) {
    assert.notEqual(q.value % LINE_MAJOR_STEP, 0, `${q.value} is printed on the line`);
    assert.ok(q.options.includes(q.answer));
    assert.equal(q.options.length, 4);
  }
});

test("level 3 targets are all buildable without an exchange", () => {
  const questions = buildRepresentQuestions(3, seeded(8));
  assert.equal(questions.length, 6);
  for (const q of questions) {
    assert.equal(buildNumberFromBlocks(q.picture), q.target);
    for (const column of ["hundreds", "tens", "ones"]) {
      assert.ok(
        q.picture[column] <= MAX_PER_COLUMN,
        `${q.target} needs ${q.picture[column]} in the ${column}`
      );
    }
  }
  // A zero column is the case a learner skips, so the set must contain one.
  assert.ok(
    questions.some((q) => Object.values(q.picture).includes(0)),
    "no target has an empty column"
  );
});

// Recomputed from the counts rather than trusting a number typed in the data,
// and the prompt is checked to name those same counts.
test("every word problem's answer is the counts its prompt gives", () => {
  const questions = buildRepresentQuestions(4, seeded(14));
  assert.equal(questions.length, 6);
  for (const q of questions) {
    assert.equal(q.answer, buildNumberFromBlocks(q.pieces));
    assert.ok(q.answer > 0 && q.answer <= 1000, `${q.answer} is outside Year 3`);
    for (const count of Object.values(q.pieces)) {
      if (count === 0) continue;
      assert.ok(
        q.prompt.includes(String(count)),
        `the prompt never says ${count}: "${q.prompt}"`
      );
    }
  }
  // Over-nine counts are the escalation; without one this is digit-reading.
  assert.ok(
    questions.some((q) => Object.values(q.pieces).some((count) => count > 9)),
    "no problem needs an exchange"
  );
});

test("an unknown level is refused rather than silently empty", () => {
  assert.throws(() => buildRepresentQuestions(7, Math.random), RangeError);
});
