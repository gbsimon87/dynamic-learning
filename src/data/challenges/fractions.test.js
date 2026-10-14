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

/* --- Generators ---------------------------------------------------------- */

import { seededRng } from "./questionKinds.js";
import * as fr from "./fractions.js";

const SEEDS = Array.from({ length: 60 }, (_, i) => i + 1);
const Y2 = new Set(["1/2", "1/3", "1/4", "2/4", "3/4"]);
const parse = (label) => {
  const [numerator, denominator] = label.split("/").map(Number);
  return { numerator, denominator };
};

function eachRun(build, check) {
  for (const seed of SEEDS) check(build(seededRng(seed)), seed);
}

function checkRun(build, keyOf, label) {
  eachRun(build, (questions, seed) => {
    assert.equal(questions.length, 6, `${label} seed ${seed}`);
    assert.equal(new Set(questions.map(keyOf)).size, 6, `${label} seed ${seed}: repeated question`);
  });
  assert.notEqual(
    build(seededRng(1)).map(keyOf).join("|"),
    build(seededRng(2)).map(keyOf).join("|"),
    `${label}: runs do not vary`
  );
}

function checkNumberOptions(q, label) {
  assert.equal(q.options.length, 3, label);
  assert.equal(new Set(q.options).size, 3, `${label}: duplicate ${q.options}`);
  assert.ok(q.options.includes(q.answer), `${label}: answer missing`);
  const numbers = q.options.map((o) => parseInt(o, 10));
  for (const n of numbers) assert.ok(n >= 1, `${label}: ${n}`);
  assert.ok(!fr.isCentredRun(numbers, parseInt(q.answer, 10)), `${label}: centred ${q.options}`);
}

test("what is a fraction 1: every fraction once, no equal-value options", () => {
  checkRun(fr.buildNameFraction, (q) => `${q.ask}:${q.answer}`, "name fraction");
  eachRun(fr.buildNameFraction, (qs) => {
    assert.deepEqual(new Set(qs.filter((q) => q.ask === "coloured").map((q) => q.answer)), Y2);
    for (const q of qs) {
      assert.equal(new Set(q.options).size, 3);
      assert.ok(q.options.includes(q.answer));
      for (const o of q.options) assert.ok(Y2.has(o), o);
      // 2/4 and 1/2 never sit side by side: both would be "right".
      const values = q.options.map((o) => fr.fractionValue(parse(o)));
      assert.equal(new Set(values).size, 3, `${q.answer}: ${q.options}`);
      const shaded = q.parts.filter(Boolean).length;
      const counted = q.ask === "coloured" ? shaded : q.parts.length - shaded;
      assert.equal(`${counted}/${q.parts.length}`, q.answer);
    }
  });
});

test("what is a fraction 2: varied, one equal pair, no swapped duplicate", () => {
  const keyOf = (q) =>
    q.kind === "same"
      ? [fr.fractionLabel(q.a), fr.fractionLabel(q.b)].sort().join("=")
      : `${q.kind}:${q.text ?? q.answer}`;
  checkRun(fr.buildEquivalence, keyOf, "equivalence");
  eachRun(fr.buildEquivalence, (qs) => {
    const same = qs.filter((q) => q.kind === "same");
    assert.equal(same.length, 4);
    assert.equal(same.filter((q) => q.answer === "yes").length, 1);
    for (const q of same) assert.equal(q.answer === "yes", fr.isEquivalent(q.a, q.b));
    const match = qs.find((q) => q.kind === "match");
    const shown = { numerator: match.parts.filter(Boolean).length, denominator: match.parts.length };
    assert.ok(fr.isEquivalent(shown, parse(match.answer)));
    assert.equal(match.options.filter((o) => fr.isEquivalent(parse(o), shown)).length, 1);
  });
});

test("what is a fraction 4: typed, read from the picture, never named in words", () => {
  checkRun(fr.buildWriteFraction, (q) => `${q.kind}:${q.parts.length}:${q.answer}`, "write fraction");
  eachRun(fr.buildWriteFraction, (qs) =>
    qs.forEach((q) => {
      assert.ok(!/\b(one|two|three|half|quarter|third)\b/i.test(q.text), q.text);
      const shaded = q.parts.filter(Boolean).length;
      if (q.kind === "top") assert.equal(q.answer, shaded);
      if (q.kind === "bottom") assert.equal(q.answer, q.parts.length);
      if (q.kind === "white") assert.equal(q.answer, q.parts.length - shaded);
      if (q.kind === "half") assert.equal(q.answer, 2);
      const written = q.kind === "top" || q.kind === "white" ? `${q.answer}/${q.parts.length}` : `1/${q.answer}`;
      if (q.kind !== "half") assert.ok(Y2.has(written), written);
    })
  );
});

test("fractions of numbers 1: unit fractions of 20 or fewer, drawn in rows", () => {
  checkRun(fr.buildFractionOfRows, (q) => `${fr.fractionLabel(q.fraction)}:${q.total}`, "rows");
  eachRun(fr.buildFractionOfRows, (qs) =>
    qs.forEach((q) => {
      assert.ok(q.total <= 20);
      assert.equal(q.grid.length, q.fraction.denominator);
      assert.equal(q.grid.flat().length, q.total);
      checkNumberOptions(q, `${q.total}`);
    })
  );
});

test("fractions of numbers 2: uses 2/4 = 1/2 on numbers", () => {
  checkRun(fr.buildHalfIsTwoQuarters, (q) => q.fact, "half is two quarters");
  eachRun(fr.buildHalfIsTwoQuarters, (qs) =>
    qs.forEach((q) => {
      assert.equal(new Set(q.options).size, 3);
      assert.ok(q.options.includes(q.answer));
      if (q.kind === "same") assert.equal(fr.evaluateFractionOf(q.answer), fr.evaluateFractionOf(q.fact));
      else assert.equal(Number(q.answer), fr.evaluateFractionOf(q.ask.replace(" = ?", "")));
    })
  );
});

test("fractions of numbers 3: counting in quarters and halves, in order, up to 10", () => {
  checkRun(fr.buildFractionCounting, (q) => q.ordered.join(","), "fraction counting");
  assert.equal(fr.quarterLabel(5), "1 1/4");
  assert.equal(fr.quarterLabel(6, "2/4"), "1 2/4");
  assert.equal(fr.quarterLabel(8), "2");
  eachRun(fr.buildFractionCounting, (qs) =>
    qs.forEach((q) => {
      assert.equal(q.ordered.length, 4);
      const step = q.step === "quarters" ? 1 : 2;
      for (let i = 1; i < 4; i++) assert.equal(q.values[i] - q.values[i - 1], step);
      assert.ok(q.values[3] <= 40 && q.values[0] >= 1);
      assert.ok(!q.cards.every((c, i) => c.id === q.ordered[i]));
    })
  );
});

test("fractions of numbers 4: every Year 2 fraction, exact answers", () => {
  checkRun(fr.buildFractionStatements, (q) => q.text, "statements");
  eachRun(fr.buildFractionStatements, (qs) => {
    assert.deepEqual(new Set(qs.map((q) => fr.fractionLabel(q.fraction))), Y2);
    for (const q of qs) assert.ok(Number.isInteger(q.answer) && q.total <= 40);
  });
});

/** Within Year 2: halve (≤ 100), halve again (≤ 40), share in 3 (≤ 30). */
function inBoundary(fraction, total) {
  if (fraction.denominator === 2) return total <= 100 && total % 2 === 0;
  if (fraction.denominator === 3) return total <= 30 && total % 3 === 0;
  return total <= 40 && total % 4 === 0;
}

test("larger groups 1: a set of objects to share, 24 or fewer", () => {
  checkRun(fr.buildFractionOfSet, (q) => `${fr.fractionLabel(q.fraction)}:${q.total}`, "set");
  eachRun(fr.buildFractionOfSet, (qs) => {
    assert.equal(new Set(qs.map((q) => q.noun)).size, 6);
    qs.forEach((q) => {
      assert.ok(q.total <= 24 && q.fraction.numerator === 1);
      checkNumberOptions(q, q.noun);
    });
  });
});

test("larger groups 2: fractions of measures, units on every option, in boundary", () => {
  checkRun(fr.buildFractionOfMeasure, (q) => q.prompt, "measure");
  eachRun(fr.buildFractionOfMeasure, (qs) => {
    assert.deepEqual(new Set(qs.map((q) => fr.fractionLabel(q.fraction))), Y2);
    qs.forEach((q) => {
      assert.ok(inBoundary(q.fraction, q.total), q.prompt);
      checkNumberOptions(q, q.prompt);
      const unit = q.answer.replace(/^\d+\s?/, "");
      assert.ok(unit.length > 0);
      for (const o of q.options) assert.equal(o.replace(/^\d+\s?/, ""), unit);
    });
  });
});

test("larger groups 3: no ties, in boundary, totals matter", () => {
  checkRun(fr.buildFractionOfOrdering, (q) => [...q.ordered].sort().join(","), "ordering");
  eachRun(fr.buildFractionOfOrdering, (qs) =>
    qs.forEach((q) => {
      const values = q.ordered.map(fr.evaluateFractionOf);
      for (let i = 1; i < 4; i++) assert.ok(values[i] > values[i - 1], q.ordered.join(", "));
      for (const label of q.ordered) {
        const [f, , t] = label.split(" ");
        assert.ok(inBoundary(parse(f), Number(t)), label);
      }
      for (const off of ["1/3 of 45", "1/3 of 90", "1/4 of 60", "3/4 of 100"]) {
        assert.ok(!q.ordered.includes(off));
      }
    })
  );
});

test("larger groups 4: stories in boundary, two ask what is left", () => {
  checkRun(fr.buildFractionStories, (q) => q.prompt, "stories");
  eachRun(fr.buildFractionStories, (qs) => {
    assert.equal(qs.filter((q) => q.left).length, 2);
    qs.forEach((q) => {
      assert.ok(inBoundary(q.fraction, q.total), q.prompt);
      const part = fr.fractionOf(q.fraction, q.total);
      assert.equal(q.answer, q.left ? q.total - part : part);
    });
  });
});
