import test from "node:test";
import assert from "node:assert/strict";
import {
  FRACTIONS,
  fractionLabel,
  fractionOf,
  dividesExactly,
  isEquivalent,
  fractionValue,
  barParts,
  fractionOfDistractors,
} from "./fractions.js";

test("only the Year 2 fractions exist", () => {
  // Statutory scope is 1/3, 1/4, 2/4 and 3/4, plus 1/2 through the
  // equivalence. Fifths, eighths and tenths belong to later years.
  assert.deepEqual(
    FRACTIONS.map(fractionLabel),
    ["1/2", "1/3", "1/4", "2/4", "3/4"]
  );
});

test("names a fraction", () => {
  assert.equal(fractionLabel({ numerator: 3, denominator: 4 }), "3/4");
});

test("finds a fraction of a quantity", () => {
  // The statutory example: 1/2 of 6 = 3.
  assert.equal(fractionOf({ numerator: 1, denominator: 2 }, 6), 3);
  assert.equal(fractionOf({ numerator: 3, denominator: 4 }, 20), 15);
});

test("knows when a fraction divides a quantity exactly", () => {
  // Year 2 never meets a remainder, so a question that does not divide
  // exactly must never be generated.
  assert.equal(dividesExactly({ numerator: 1, denominator: 3 }, 9), true);
  assert.equal(dividesExactly({ numerator: 1, denominator: 3 }, 10), false);
  assert.equal(dividesExactly({ numerator: 3, denominator: 4 }, 20), true);
});

test("recognises the statutory equivalence of 2/4 and 1/2", () => {
  assert.equal(
    isEquivalent({ numerator: 2, denominator: 4 }, { numerator: 1, denominator: 2 }),
    true
  );
});

test("fractions that are not equal are not equivalent", () => {
  assert.equal(
    isEquivalent({ numerator: 1, denominator: 4 }, { numerator: 1, denominator: 2 }),
    false
  );
  assert.equal(
    isEquivalent({ numerator: 3, denominator: 4 }, { numerator: 1, denominator: 3 }),
    false
  );
});

test("orders fractions by value", () => {
  assert.ok(fractionValue({ numerator: 1, denominator: 4 }) < fractionValue({ numerator: 1, denominator: 3 }));
  assert.ok(fractionValue({ numerator: 1, denominator: 2 }) < fractionValue({ numerator: 3, denominator: 4 }));
});

test("splits a bar into parts, marking the shaded ones", () => {
  const parts = barParts({ numerator: 3, denominator: 4 });
  assert.equal(parts.length, 4);
  assert.equal(parts.filter(Boolean).length, 3);
  // The shaded parts come first, so the bar reads left to right.
  assert.deepEqual(parts, [true, true, true, false]);
});

test("distractors for a fraction-of question are other fractions of the same amount", () => {
  // 1/4 of 20 is 5. A child who used the wrong fraction gets 10 or 15, which
  // is far more useful than a random number.
  const wrong = fractionOfDistractors({ numerator: 1, denominator: 4 }, 20, 2);
  assert.equal(wrong.length, 2);
  assert.ok(!wrong.includes(5));
  for (const w of wrong) assert.ok(w > 0 && Number.isInteger(w));
});

test("distractors are distinct", () => {
  for (const total of [12, 20, 24, 40]) {
    const wrong = fractionOfDistractors({ numerator: 1, denominator: 2 }, total, 2);
    assert.equal(new Set(wrong).size, wrong.length);
  }
});
