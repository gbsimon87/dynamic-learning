import test from "node:test";
import assert from "node:assert/strict";
import {
  PLACE_COLUMNS,
  buildCompareQuestions,
  compareSymbol,
  decidingPlace,
  hasDistinctValues,
  isTrueStatement,
  orderNumbers,
  placeRows,
  problemAnswer,
} from "./comparingNumbers1000.js";

const seeded = (seed) => () => {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return seed / 2147483648;
};

test("the table reads hundreds first, the way the comparison is made", () => {
  assert.deepEqual(
    PLACE_COLUMNS.map((c) => c.key),
    ["hundreds", "tens", "ones"]
  );
});

test("the deciding column is the first one that differs", () => {
  assert.equal(decidingPlace(248, 613), "hundreds");
  assert.equal(decidingPlace(507, 570), "tens");
  assert.equal(decidingPlace(409, 401), "ones");
  assert.equal(decidingPlace(534, 534), null);
});

test("place rows are labelled, not numbered, so an equal pair still has two rows", () => {
  const rows = placeRows(534, 534);
  assert.deepEqual(
    rows.map((r) => r.label),
    ["First", "Second"]
  );
  assert.deepEqual(rows[0].cells, { hundreds: 5, tens: 3, ones: 4 });
});

test("ordering goes both ways and leaves the input alone", () => {
  const values = [412, 421, 124];
  assert.deepEqual(orderNumbers(values, "smallest"), [124, 412, 421]);
  assert.deepEqual(orderNumbers(values, "largest"), [421, 412, 124]);
  assert.deepEqual(values, [412, 421, 124]);
});

test("hasDistinctValues catches the tie that makes an ordering unanswerable", () => {
  assert.equal(hasDistinctValues([1, 2, 3]), true);
  assert.equal(hasDistinctValues([1, 2, 2]), false);
});

// Both halves of every comparison question have to agree, or a learner picking
// the symbol the numbers actually make is marked wrong.
test("level 1 and 2 answers are the symbol that makes the statement true", () => {
  const rng = seeded(21);
  for (const level of [1, 2]) {
    const questions = buildCompareQuestions(level, rng);
    assert.equal(questions.length, 6);
    for (const q of questions) {
      assert.equal(q.answer, compareSymbol(q.left, q.right));
      assert.ok(isTrueStatement(q.left, q.answer, q.right), `${q.left} ${q.answer} ${q.right}`);
      assert.equal(q.deciding, decidingPlace(q.left, q.right));
      assert.equal(q.rows.length, 2);
      assert.ok(q.left <= 1000 && q.right <= 1000, "left Year 3's range");
    }
    assert.ok(
      questions.some((q) => q.answer === "="),
      "no equal pair, so '=' is a button that is never right"
    );
  }
});

test("level 2 never lets the hundreds settle it", () => {
  const questions = buildCompareQuestions(2, seeded(4));
  for (const q of questions) {
    assert.notEqual(q.deciding, "hundreds", `${q.left} vs ${q.right}`);
  }
});

// A repeated value would make several arrangements correct while the challenge
// accepts exactly one.
test("every ordering set is tie-free and within 1000", () => {
  const questions = buildCompareQuestions(3, seeded(9));
  assert.equal(questions.length, 6);
  for (const q of questions) {
    assert.ok(hasDistinctValues(q.values), `${q.values} has a tie`);
    assert.deepEqual(q.answer, orderNumbers(q.values, q.direction));
    assert.equal(q.items.length, q.values.length);
    assert.deepEqual(
      [...q.items.map((i) => Number(i.id))].sort((a, b) => a - b),
      [...q.values].sort((a, b) => a - b),
      "the cards are not the same numbers as the answer"
    );
    for (const value of q.values) {
      assert.ok(value >= 0 && value <= 1000, `${value} is outside Year 3`);
    }
  }
  assert.ok(questions.some((q) => q.direction === "largest"));
  assert.ok(questions.some((q) => q.direction === "smallest"));
});

// Recomputed from the prompt's own numbers rather than trusted.
test("every word problem's answer is a number its prompt names", () => {
  const questions = buildCompareQuestions(4, seeded(12));
  assert.equal(questions.length, 6);
  for (const q of questions) {
    assert.equal(q.answer, problemAnswer(q));
    assert.ok(q.candidates.includes(q.answer));
    for (const candidate of q.candidates) {
      assert.ok(
        q.prompt.includes(String(candidate)),
        `${candidate} is not in "${q.prompt}"`
      );
    }
  }
});

test("an unknown level is refused rather than silently empty", () => {
  assert.throws(() => buildCompareQuestions(9, Math.random), RangeError);
});
