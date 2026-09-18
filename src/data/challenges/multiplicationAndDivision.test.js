import test from "node:test";
import assert from "node:assert/strict";
import {
  TABLES,
  multiply,
  divide,
  isEven,
  repeatedAddition,
  arrayRows,
  productDistractors,
  isTrueMultiplication,
  isTrueDivision,
  missingFactor,
} from "./multiplicationAndDivision.js";

test("the statutory tables are 2, 5 and 10", () => {
  assert.deepEqual(TABLES, [2, 5, 10]);
});

test("multiplies and divides", () => {
  assert.equal(multiply(4, 5), 20);
  assert.equal(divide(20, 5), 4);
});

test("recognises odd and even", () => {
  assert.equal(isEven(10), true);
  assert.equal(isEven(7), false);
  assert.equal(isEven(0), true);
});

test("writes a multiplication as repeated addition", () => {
  // 3 x 4 is four added three times, which is how the concept is introduced.
  assert.equal(repeatedAddition(4, 3), "4 + 4 + 4");
});

test("repeated addition of one term has no plus sign", () => {
  assert.equal(repeatedAddition(5, 1), "5");
});

test("describes an array as rows of equal length", () => {
  const rows = arrayRows(3, 4);
  assert.equal(rows.length, 3);
  for (const row of rows) assert.equal(row.length, 4);
});

test("product distractors are a row out, not random", () => {
  // 4 x 5 = 20. Counting a row too many or too few gives 25 and 15, which is
  // the mistake worth showing.
  const wrong = productDistractors(20, 5, 2);
  assert.ok(wrong.includes(25) || wrong.includes(15));
  assert.ok(!wrong.includes(20));
});

test("product distractors are distinct and never negative", () => {
  for (const [answer, factor] of [[2, 2], [5, 5], [10, 10], [100, 10]]) {
    const wrong = productDistractors(answer, factor, 3);
    assert.equal(new Set(wrong).size, wrong.length);
    for (const w of wrong) assert.ok(w >= 0, `${answer}/${factor}: ${w}`);
  }
});

test("a multiplication is true in either order", () => {
  // Commutative: 4 x 5 = 20 and 5 x 4 = 20 are both true.
  assert.equal(isTrueMultiplication([4, 5, 20]), true);
  assert.equal(isTrueMultiplication([5, 4, 20]), true);
});

test("a wrong multiplication is false", () => {
  assert.equal(isTrueMultiplication([4, 5, 21]), false);
  assert.equal(isTrueMultiplication([20, 5, 4]), false);
});

test("a division is true in only one order", () => {
  // Not commutative: 20 / 5 = 4 holds, 5 / 20 = 4 does not.
  assert.equal(isTrueDivision([20, 5, 4]), true);
  assert.equal(isTrueDivision([20, 4, 5]), true);
  assert.equal(isTrueDivision([5, 20, 4]), false);
});

test("division by zero is never a true statement", () => {
  assert.equal(isTrueDivision([0, 0, 0]), false);
});

test("finds a missing factor with the inverse", () => {
  assert.equal(missingFactor(20, 5), 4);
});
