import test from "node:test";
import assert from "node:assert/strict";
import {
  compareSymbol,
  SYMBOLS,
  isTrueStatement,
  betweenBounds,
} from "./comparingNumbers.js";

test("the three symbols are less than, greater than and equal to", () => {
  assert.deepEqual(SYMBOLS, ["<", ">", "="]);
});

test("picks the symbol that makes the statement true", () => {
  assert.equal(compareSymbol(3, 8), "<");
  assert.equal(compareSymbol(80, 8), ">");
  assert.equal(compareSymbol(42, 42), "=");
});

test("checks a statement the learner built", () => {
  assert.equal(isTrueStatement(12, "<", 20), true);
  assert.equal(isTrueStatement(12, ">", 20), false);
  assert.equal(isTrueStatement(20, "=", 20), true);
  assert.equal(isTrueStatement(20, "=", 21), false);
});

test("an unknown symbol is not a true statement", () => {
  assert.equal(isTrueStatement(1, "?", 2), false);
});

test("accepts any number strictly between the bounds", () => {
  assert.equal(betweenBounds(27, 25, 30), true);
  assert.equal(betweenBounds(26, 25, 30), true);
});

test("rejects the bounds themselves", () => {
  // "greater than 25" excludes 25.
  assert.equal(betweenBounds(25, 25, 30), false);
  assert.equal(betweenBounds(30, 25, 30), false);
});

test("rejects anything outside the bounds", () => {
  assert.equal(betweenBounds(24, 25, 30), false);
  assert.equal(betweenBounds(31, 25, 30), false);
});
