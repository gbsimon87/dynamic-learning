import test from "node:test";
import assert from "node:assert/strict";
import {
  arrangeDigits,
  buildProblemQuestions,
  clueOptions,
  clueText,
  evaluateWorking,
  readSkippingZeros,
  satisfiesAll,
  solveConstraints,
  valueOfDigits,
} from "./numberAndPlaceValueProblems.js";

const seeded = (seed) => () => {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return seed / 2147483648;
};

test("a clue set is solved by brute force, not by trust", () => {
  assert.equal(
    solveConstraints([
      { kind: "digit", place: "hundreds", value: 4 },
      { kind: "digit", place: "tens", value: 0 },
      { kind: "digit", place: "ones", value: 7 },
    ]),
    407
  );
});

// Both failures mark a correct child wrong, so both must come back as null.
test("a puzzle with no answer and a puzzle with two both refuse", () => {
  assert.equal(
    solveConstraints([
      { kind: "digit", place: "hundreds", value: 4 },
      { kind: "digit", place: "hundreds", value: 5 },
    ]),
    null,
    "a contradiction should have no answer"
  );
  assert.equal(
    solveConstraints([{ kind: "digit", place: "hundreds", value: 4 }]),
    null,
    "one clue leaves a hundred answers, not one"
  );
});

test("every clue kind reads as a sentence and judges a number", () => {
  const cases = [
    [{ kind: "digit", place: "tens", value: 7 }, 474, 484],
    [{ kind: "between", low: 400, high: 500 }, 474, 500],
    [{ kind: "multipleOf", value: 100 }, 700, 750],
    [{ kind: "digitSum", value: 6 }, 501, 502],
    [{ kind: "sameDigit", place: "ones", other: "hundreds" }, 474, 475],
    [{ kind: "doubleDigit", place: "tens", other: "ones" }, 684, 674],
    [{ kind: "moreThanDigit", place: "hundreds", other: "tens", by: 3 }, 520, 420],
  ];
  for (const [clue, yes, no] of cases) {
    assert.ok(clueText(clue).endsWith("."), clueText(clue));
    assert.ok(satisfiesAll(yes, [clue]), `${yes} should satisfy ${clueText(clue)}`);
    assert.ok(!satisfiesAll(no, [clue]), `${no} should not satisfy ${clueText(clue)}`);
  }
  assert.throws(() => clueText({ kind: "nonsense" }), RangeError);
});

// The misreading this whole topic exists to catch.
test("readSkippingZeros is the 407-read-as-47 mistake, and nothing else", () => {
  assert.equal(readSkippingZeros(407), 47);
  assert.equal(readSkippingZeros(720), 72);
  assert.equal(readSkippingZeros(900), 9);
  assert.equal(readSkippingZeros(346), null, "no zero to skip");
});

test("digit cards arrange into one number, and never lead with zero", () => {
  assert.deepEqual(arrangeDigits([4, 0, 7], "largest"), [7, 4, 0]);
  assert.deepEqual(arrangeDigits([4, 0, 7], "smallest"), [4, 0, 7]);
  assert.deepEqual(arrangeDigits([5, 0, 3], "smallest"), [3, 0, 5]);
  assert.equal(valueOfDigits([4, 0, 7]), 407);
});

test("working is recomputed, with multiplication before addition", () => {
  assert.equal(evaluateWorking("348 + 100 - 10"), 438);
  assert.equal(evaluateWorking("4 * 100 + 7 - 10"), 397);
  assert.equal(evaluateWorking("6 * 100 + 3"), 603);
  assert.equal(evaluateWorking("250"), 250);
});

test("every clue puzzle has exactly one answer and offers it", () => {
  const rng = seeded(41);
  for (const level of [1, 2]) {
    const questions = buildProblemQuestions(level, rng);
    assert.equal(questions.length, 6);
    for (const q of questions) {
      assert.notEqual(q.answer, null, `${q.lines.join(" ")} has no single answer`);
      assert.equal(q.answer, solveConstraints(q.clues));
      assert.ok(satisfiesAll(q.answer, q.clues));
      assert.equal(q.lines.length, q.clues.length);
      assert.ok(q.options.includes(q.answer), `${q.answer} is not among its options`);
      assert.equal(q.options.length, 4);
      assert.equal(new Set(q.options).size, 4, "a duplicate option");
      // Exactly one option may satisfy the clues, or the question has two
      // right answers and accepts one.
      const satisfying = q.options.filter((option) => satisfiesAll(option, q.clues));
      assert.deepEqual(satisfying, [q.answer], `${q.options} satisfies more than the answer`);
    }
  }
});

test("the zero-skipping misread is actually offered where it exists", () => {
  const rng = seeded(2);
  for (const value of [407, 720, 305, 904]) {
    const options = clueOptions(value, rng);
    assert.ok(
      options.includes(readSkippingZeros(value)),
      `${value} did not offer ${readSkippingZeros(value)}`
    );
  }
});

test("every digit-card question has one arrangement and distinct cards", () => {
  const questions = buildProblemQuestions(3, seeded(13));
  assert.equal(questions.length, 6);
  for (const q of questions) {
    assert.equal(new Set(q.digits).size, q.digits.length, `${q.digits} repeats a digit`);
    assert.deepEqual(q.order, arrangeDigits(q.digits, q.want));
    assert.equal(q.answer, valueOfDigits(q.order));
    assert.ok(q.answer >= 100 && q.answer <= 999, `${q.answer} is not 3 digits`);
    assert.deepEqual(
      q.items.map((i) => Number(i.id)).sort(),
      [...q.digits].sort(),
      "the cards are not the digits"
    );
  }
  assert.ok(questions.some((q) => q.digits.includes(0)), "no set contains a zero");
  assert.ok(questions.some((q) => q.want === "largest"));
  assert.ok(questions.some((q) => q.want === "smallest"));
});

test("every word problem's answer comes from working its prompt states", () => {
  const questions = buildProblemQuestions(4, seeded(19));
  assert.equal(questions.length, 6);
  for (const q of questions) {
    assert.equal(q.answer, evaluateWorking(q.working));
    assert.ok(q.answer > 0 && q.answer <= 1000, `${q.answer} is outside Year 3`);
    for (const number of q.working.match(/\d+/g)) {
      assert.ok(
        q.prompt.includes(number),
        `the working uses ${number} but "${q.prompt}" never mentions it`
      );
    }
  }
});

test("an unknown level is refused rather than silently empty", () => {
  assert.throws(() => buildProblemQuestions(6, Math.random), RangeError);
});
