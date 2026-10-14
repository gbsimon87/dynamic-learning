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

/* --- Generators ---------------------------------------------------------- */

import { seededRng } from "./questionKinds.js";
import * as md from "./multiplicationAndDivision.js";

const SEEDS = Array.from({ length: 60 }, (_, i) => i + 1);

function eachRun(build, check) {
  for (const seed of SEEDS) check(build(seededRng(seed)), seed);
}

function checkRun(build, keyOf, label) {
  eachRun(build, (questions, seed) => {
    assert.equal(questions.length, 6, `${label} seed ${seed}`);
    assert.equal(new Set(questions.map(keyOf)).size, 6, `${label} seed ${seed}: repeated question`);
  });
  const a = build(seededRng(1)).map(keyOf).join("|");
  const b = build(seededRng(2)).map(keyOf).join("|");
  assert.notEqual(a, b, `${label}: runs do not vary`);
}

function checkOptions(q, label) {
  assert.equal(q.options.length, 3, label);
  assert.equal(new Set(q.options).size, 3, `${label}: duplicate options ${q.options}`);
  assert.ok(q.options.includes(q.answer), `${label}: answer missing`);
  const numbers = q.options.map((o) => parseInt(o, 10));
  if (q.options.every((o) => /^\d+(\s?[a-z]+)?$/.test(String(o)))) {
    for (const n of numbers) assert.ok(n >= 1, `${label}: ${n}`);
    assert.ok(!md.isCentredRun(numbers, parseInt(q.answer, 10)), `${label}: answer centred in ${q.options}`);
  }
}

/** The answer sits in every position across runs, so layout is no clue. */
function checkAnswerPositions(build) {
  const positions = new Set();
  eachRun(build, (qs) => qs.forEach((q) => positions.add(q.options.indexOf(q.answer))));
  assert.deepEqual([...positions].sort(), [0, 1, 2]);
}

test("near-miss distractors never centre the answer and never go below 1", () => {
  for (const seed of SEEDS) {
    for (const [answer, step] of [[5, 1], [20, 5], [2, 2], [3, 1], [40, 10]]) {
      const wrong = md.nearMissDistractors(answer, step, 2, seededRng(seed));
      assert.equal(wrong.length, 2);
      assert.ok(!wrong.includes(answer));
      for (const w of wrong) assert.ok(w >= 1);
      assert.ok(!md.isCentredRun([answer, ...wrong], answer), `${answer}: ${wrong}`);
    }
  }
});

test("what is multiplication 1: arrays stay countable (30 dots or fewer)", () => {
  checkRun(md.buildMultiplicationArrays, (q) => `${q.rows}x${q.columns}`, "arrays");
  eachRun(md.buildMultiplicationArrays, (qs) =>
    qs.forEach((q) => {
      assert.ok(q.answer <= 30, `${q.rows} rows of ${q.columns}`);
      assert.equal(q.grid.flat().length, q.answer);
      checkOptions(q, "arrays");
    })
  );
  checkAnswerPositions(md.buildMultiplicationArrays);
});

test("what is multiplication 2: wrong options are plausible groupings, never the total", () => {
  checkRun(md.buildRepeatedAddition, (q) => q.addition, "repeated addition");
  eachRun(md.buildRepeatedAddition, (qs) =>
    qs.forEach((q) => {
      checkOptions(q, q.addition);
      assert.equal(md.evaluateExpression(q.answer), q.total);
      const sameTable = q.options.filter((o) => o.endsWith(` × ${q.value}`)).map((o) => Number(o.split(" ")[0]));
      assert.ok(!md.isCentredRun(sameTable, q.times), `${q.addition}: answer centred in ${q.options}`);
      for (const option of q.options.filter((o) => o !== q.answer)) {
        assert.ok(!option.split(" ").includes(String(q.total)), `${q.addition}: ${option} shows the total`);
        assert.notEqual(md.evaluateExpression(option), q.total, `${q.addition}: ${option} is also right`);
      }
    })
  );
});

test("what is multiplication 3 and 4: generated and correct", () => {
  checkRun(md.buildArrayStatements, (q) => `${q.rows}x${q.columns}`, "array statements");
  eachRun(md.buildArrayStatements, (qs) =>
    qs.forEach((q) => assert.equal(md.isTrueMultiplication(q.cards.map((c) => c.value)), false))
  );
  checkRun(md.buildEqualGroupStories, (q) => q.prompt, "equal groups");
});

test("what is division 1 and 2: generated, countable, fair options", () => {
  checkRun(md.buildSharingPictures, (q) => `${q.total}/${q.groups}`, "sharing");
  eachRun(md.buildSharingPictures, (qs) => qs.forEach((q) => assert.ok(q.total <= 30)));
  checkRun(md.buildGroupingQuestions, (q) => `${q.total}/${q.size}`, "grouping");
  eachRun(md.buildGroupingQuestions, (qs) => qs.forEach((q) => checkOptions(q, `${q.total} ÷ ${q.size}`)));
  checkAnswerPositions(md.buildGroupingQuestions);
});

test("what is division 3: families vary, never start true, and give no rule away", () => {
  checkRun(md.buildDivisionFamilies, (q) => q.family.join(","), "division families");
  eachRun(md.buildDivisionFamilies, (qs) =>
    qs.forEach((q) => {
      assert.equal(md.isTrueDivision(q.cards.map((c) => c.value)), false);
      const [total, a, b] = q.family;
      assert.ok(md.isTrueDivision([total, a, b]) && md.isTrueDivision([total, b, a]));
    })
  );
});

test("what is division 4: three sharing and three grouping stories", () => {
  checkRun(md.buildSharingOrGrouping, (q) => q.prompt, "sharing or grouping");
  eachRun(md.buildSharingOrGrouping, (qs) => {
    assert.equal(qs.filter((q) => q.kind === "share").length, 3);
    for (const q of qs) assert.ok(/^\d+ /.test(q.prompt) && Number.isInteger(q.answer), q.prompt);
  });
});

test("division problems 1: options use the same pair of numbers", () => {
  checkRun(md.buildDivisionStatementChoice, (q) => q.prompt, "statement choice");
  eachRun(md.buildDivisionStatementChoice, (qs) =>
    qs.forEach((q) => {
      assert.equal(new Set(q.options).size, 3);
      for (const o of q.options) {
        assert.deepEqual(o.split(/ [×÷] /).map(Number).sort((x, y) => x - y), [q.parts, q.total].sort((x, y) => x - y));
      }
      assert.equal(md.evaluateExpression(q.answer), q.total / q.parts);
    })
  );
});

test("division problems 2: measures and money, units on every option", () => {
  checkRun(md.buildMeasureSharing, (q) => q.prompt, "measure sharing");
  eachRun(md.buildMeasureSharing, (qs) =>
    qs.forEach((q) => {
      checkOptions(q, q.prompt);
      const unit = q.answer.replace(/^\d+\s?/, "");
      for (const o of q.options) assert.equal(o.replace(/^\d+\s?/, ""), unit, `${q.prompt}: ${o}`);
      if (/How (long|much)/.test(q.prompt)) assert.ok(unit.length > 0, q.prompt);
    })
  );
});

test("division problems 3: no ties, and the biggest total is not the biggest answer", () => {
  checkRun(md.buildDivisionOrdering, (q) => [...q.ordered].sort().join(","), "division ordering");
  eachRun(md.buildDivisionOrdering, (qs) =>
    qs.forEach((q) => {
      const values = q.ordered.map(md.evaluateExpression);
      assert.equal(new Set(values).size, 4);
      for (let i = 1; i < 4; i++) assert.ok(values[i] > values[i - 1]);
      const totals = q.ordered.map((l) => Number(l.split(" ")[0]));
      assert.notEqual(totals.indexOf(Math.max(...totals)), 3);
      assert.ok(!q.cards.every((c, i) => c.id === q.ordered[i]));
    })
  );
});

test("division problems 4: two amounts of the same thing, then an exact division", () => {
  checkRun(md.buildCombineAndShare, (q) => q.prompt, "combine and share");
  eachRun(md.buildCombineAndShare, (qs) =>
    qs.forEach((q) => {
      assert.equal(q.parts[0] + q.parts[1], q.total);
      assert.ok(!q.prompt.includes(`${q.total} `), `${q.prompt}: total given away`);
      assert.ok(!/pears/.test(q.prompt));
      assert.ok(Number.isInteger(q.answer) && q.answer >= 2);
    })
  );
});

test("connecting 1: the right division is true, the others false", () => {
  checkRun(md.buildRelatedDivisionChoice, (q) => q.product, "related division");
  eachRun(md.buildRelatedDivisionChoice, (qs) =>
    qs.forEach((q) => {
      assert.equal(q.options.filter(md.isTrueStatement).length, 1);
      assert.ok(md.isTrueStatement(q.answer));
    })
  );
});

test("connecting 2: the answer is never the fact already shown", () => {
  checkRun(md.buildUseTheFact, (q) => q.fact, "use the fact");
  eachRun(md.buildUseTheFact, (qs) =>
    qs.forEach((q) => {
      checkOptions(q, q.fact);
      assert.notEqual(q.ask.replace(" = ?", ""), q.fact.split(" = ")[0], `${q.fact}: asks the same thing`);
      assert.ok(md.isTrueStatement(q.fact));
      assert.ok(md.isTrueStatement(q.ask.replace("?", q.answer)), `${q.ask} ${q.answer}`);
    })
  );
});

test("connecting 3: two true facts, two near-miss false ones", () => {
  checkRun(md.buildFactFamilySort, (q) => q.numbers.join(","), "fact family");
  eachRun(md.buildFactFamilySort, (qs) =>
    qs.forEach((q) => {
      for (const t of q.truthy) assert.ok(md.isTrueStatement(t), t);
      for (const f of q.falsy) {
        assert.ok(!md.isTrueStatement(f), f);
        // Never an obviously absurd "20 × 5 = 4": a false × still gives a
        // result bigger than both factors.
        if (f.includes("×")) {
          const [left, right] = f.split(" = ");
          const [x, , y] = left.split(" ").map(Number);
          assert.ok(Number(right) > Math.max(x, y), f);
        }
      }
      assert.equal(q.cards.length, 4);
    })
  );
});

test("connecting 4: missing numbers are generated and correct", () => {
  checkRun(md.buildInverseMissingNumbers, (q) => q.text, "missing numbers");
  eachRun(md.buildInverseMissingNumbers, (qs) =>
    qs.forEach((q) => assert.ok(md.isTrueStatement(q.text.replace("?", q.answer)), q.text))
  );
});

test("doubling and halving: chains stay friendly for Year 2", () => {
  assert.deepEqual(md.halvingChain(24), [24, 12, 6, 3]);
  assert.deepEqual(md.halvingChain(100), [100, 50, 25]);
  checkRun(md.buildHalvingChains, (q) => q.start, "halving chains");
  eachRun(md.buildHalvingChains, (qs) =>
    qs.forEach((q) => {
      assert.ok(q.terms.length >= 3);
      assert.ok(![48, 96, 64].includes(q.start));
      for (let i = 1; i < q.terms.length; i++) assert.equal(q.terms[i] * 2, q.terms[i - 1]);
      assert.ok(!q.cards.every((c, i) => c.id === q.terms[i]));
    })
  );
  for (const build of [md.buildDoubling, md.buildHalving]) {
    checkRun(build, (q) => q.n, "doubling/halving");
    eachRun(build, (qs) => qs.forEach((q) => checkOptions(q, String(q.n))));
  }
});

test("solving 1: every option uses only the two numbers in the story", () => {
  checkRun(md.buildOperationChoice, (q) => q.prompt, "operation choice");
  eachRun(md.buildOperationChoice, (qs) =>
    qs.forEach((q) => {
      assert.equal(new Set(q.options).size, 3);
      const pair = [...q.pair].sort((x, y) => x - y).join(",");
      for (const o of q.options) {
        const numbers = o.split(/ [×÷+−] /).map(Number).sort((x, y) => x - y).join(",");
        assert.equal(numbers, pair, `${q.prompt}: ${o}`);
      }
      assert.ok(Number.isInteger(md.evaluateExpression(q.answer)));
    })
  );
});

test("solving 2: array stories read naturally and mix × with ÷", () => {
  checkRun(md.buildArrayStories, (q) => q.prompt, "array stories");
  eachRun(md.buildArrayStories, (qs) => {
    assert.equal(qs.filter((q) => q.op === "×").length, 3);
    qs.forEach((q) => {
      checkOptions(q, q.prompt);
      assert.ok(!/drawn on/.test(q.prompt));
      assert.ok(/row/.test(q.prompt), q.prompt);
    });
  });
});
