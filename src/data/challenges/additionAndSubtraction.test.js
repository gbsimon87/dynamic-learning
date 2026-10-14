import test from "node:test";
import assert from "node:assert/strict";
import {
  double,
  half,
  relatedFactTo100,
  sumDistractors,
  makesTenFirst,
  isTrueSubtraction,
  missingAddend,
  DOUBLES,
} from "./additionAndSubtraction.js";

test("doubles and halves", () => {
  assert.equal(double(7), 14);
  assert.equal(half(14), 7);
});

test("the taught doubles run to 10 + 10", () => {
  assert.deepEqual(DOUBLES, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test("derives the related fact up to 100", () => {
  // 3 + 7 = 10 gives 30 + 70 = 100, which is the statutory "derive and use
  // related facts up to 100".
  assert.deepEqual(relatedFactTo100(3, 7), { a: 30, b: 70, total: 100 });
});

test("sum distractors are the slips of miscounting, never the answer", () => {
  const wrong = sumDistractors(23, 3);
  assert.equal(wrong.length, 3);
  assert.ok(!wrong.includes(23));
  assert.equal(new Set(wrong).size, 3);
  for (const w of wrong) assert.ok(w >= 0);
});

test("sum distractors stay non-negative for small answers", () => {
  for (const answer of [0, 1, 2, 5]) {
    for (const w of sumDistractors(answer, 3)) assert.ok(w >= 0, `${answer}: ${w}`);
  }
});

test("accepts an order that puts the pair making ten first", () => {
  // 7 + 3 + 8: pairing 7 and 3 first makes the addition easy.
  assert.equal(makesTenFirst([7, 3, 8]), true);
  assert.equal(makesTenFirst([3, 7, 8]), true);
});

test("rejects an order that does not start with the pair making ten", () => {
  assert.equal(makesTenFirst([7, 8, 3]), false);
  assert.equal(makesTenFirst([8, 7, 3]), false);
});

test("a subtraction is true in either of its two valid orders", () => {
  // From 15, 6 and 9 both 15 - 6 = 9 and 15 - 9 = 6 are true.
  assert.equal(isTrueSubtraction([15, 6, 9]), true);
  assert.equal(isTrueSubtraction([15, 9, 6]), true);
});

test("a subtraction in the wrong order is false", () => {
  assert.equal(isTrueSubtraction([6, 15, 9]), false);
  assert.equal(isTrueSubtraction([9, 6, 15]), false);
});

test("finds the missing addend using the inverse", () => {
  assert.equal(missingAddend(34, 50), 16);
  assert.equal(missingAddend(0, 7), 7);
});

// ---------------------------------------------------------------------------
// Generated question banks
// ---------------------------------------------------------------------------

import {
  doublingDistractors,
  halvingDistractors,
  buildDoublingQuestions,
  buildHalvingQuestions,
  buildDoublingChainQuestions,
  DOUBLING_CHAINS,
  buildUseDoublesQuestions,
  buildOneStepQuestions,
  buildSwapQuestions,
  SWAP_OPTIONS,
  buildOrderByAnswerQuestions,
  evaluate,
  buildTwoStepQuestions,
  buildAddOnesQuestions,
  buildTensQuestions,
  tensDistractors,
  buildMakeTenQuestions,
  buildTwoDigitQuestions,
  buildMissingAddendQuestions,
  buildPickInverseQuestions,
  inverseOptions,
  buildFactFamilyQuestions,
  buildMissingNumberQuestions,
} from "./additionAndSubtraction.js";

/** Deterministic rng so a failing seed can be replayed. */
function seeded(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SEEDS = Array.from({ length: 60 }, (_, i) => i + 1);

/** Three consecutive numbers with the answer in the middle. */
function answerIsMiddleOfRun(options, answer) {
  const sorted = [...options].map(Number).sort((x, y) => x - y);
  return sorted.length === 3 && sorted[1] === Number(answer) && sorted[2] - sorted[0] === 2;
}

function checkChoice(q, label) {
  assert.equal(q.options.length, 3, label);
  assert.equal(new Set(q.options).size, 3, `${label}: duplicate options`);
  assert.ok(q.options.includes(q.answer), `${label}: answer missing`);
  for (const o of q.options) assert.ok(parseInt(o, 10) >= 0, `${label}: negative ${o}`);
  assert.ok(!answerIsMiddleOfRun(q.options.map((o) => parseInt(o, 10)), parseInt(q.answer, 10)), `${label}: ${q.options}`);
}

function checkSix(questions, keyOf, label) {
  assert.equal(questions.length, 6, label);
  assert.equal(new Set(questions.map(keyOf)).size, 6, `${label}: repeated question`);
}

/** Runs differ between attempts: two seeds give different question sets. */
function checkVaries(build, keyOf) {
  const a = build(seeded(1)).map(keyOf).join("|");
  const b = build(seeded(2)).map(keyOf).join("|");
  assert.notEqual(a, b);
}

test("sum distractors never leave the answer in the middle of three in a row", () => {
  for (const seed of SEEDS) {
    const rng = seeded(seed);
    for (let answer = 0; answer <= 100; answer++) {
      for (const tens of [true, false]) {
        const wrong = sumDistractors(answer, 2, rng, { tens });
        assert.equal(wrong.length, 2);
        assert.ok(!wrong.includes(answer));
        for (const w of wrong) assert.ok(w >= 0 && w <= 100, `${answer}: ${w} outside 0-100`);
        assert.ok(!answerIsMiddleOfRun([answer, ...wrong], answer), `${answer}: ${wrong}`);
      }
    }
  }
});

test("sum distractors mix a small slip with a ten-out slip", () => {
  const rng = seeded(7);
  for (let answer = 20; answer <= 80; answer++) {
    const [slip, tenOut] = sumDistractors(answer, 2, rng);
    assert.ok([1, 2].includes(Math.abs(slip - answer)));
    assert.equal(Math.abs(tenOut - answer), 10);
  }
});

test("doubling and halving distractors are near misses, never negative", () => {
  for (const seed of SEEDS) {
    const rng = seeded(seed);
    for (let n = 1; n <= 10; n++) {
      const wrong = doublingDistractors(n, rng);
      assert.equal(wrong.length, 2);
      assert.ok(!wrong.includes(n * 2));
      for (const w of wrong) assert.ok(w >= 0 && Math.abs(w - n * 2) <= Math.max(n, 3));
    }
    for (let n = 4; n <= 20; n += 2) {
      const wrong = halvingDistractors(n, rng);
      assert.equal(wrong.length, 2);
      assert.ok(!wrong.includes(n / 2));
    }
  }
});

test("doubling level 1 and halving level 2 are generated fairly", () => {
  for (const seed of SEEDS) {
    const doubles = buildDoublingQuestions(seeded(seed));
    checkSix(doubles, (q) => q.n, "double");
    for (const q of doubles) {
      assert.equal(q.answer, q.n * 2);
      checkChoice(q, `double ${q.n}`);
    }
    const halves = buildHalvingQuestions(seeded(seed));
    checkSix(halves, (q) => q.n, "half");
    for (const q of halves) {
      assert.equal(q.answer * 2, q.n);
      assert.ok(q.n <= 20 && q.n % 2 === 0);
      checkChoice(q, `half of ${q.n}`);
    }
  }
  checkVaries(buildDoublingQuestions, (q) => q.n);
});

test("doubling chains only double numbers to 20, and halve as often as they double", () => {
  for (const chain of DOUBLING_CHAINS) {
    for (let i = 1; i < chain.length; i++) assert.equal(chain[i], chain[i - 1] * 2);
    for (const n of chain.slice(0, -1)) assert.ok(n <= 20, `${chain}`);
  }
  for (const seed of SEEDS) {
    const questions = buildDoublingChainQuestions(seeded(seed));
    checkSix(questions, (q) => `${q.mode}${q.terms}`, "chains");
    assert.equal(questions.filter((q) => q.mode === "double").length, 3);
    for (const q of questions) {
      assert.equal(q.start, q.terms[0]);
      for (let i = 1; i < q.terms.length; i++) {
        assert.equal(q.mode === "double" ? q.terms[i - 1] * 2 : q.terms[i - 1] / 2, q.terms[i]);
      }
      assert.ok(!q.cards.every((c, i) => c.id === q.terms[i]), "starts solved");
    }
  }
});

test("level 4 uses a known double or half, not bonds to 10", () => {
  for (const seed of SEEDS) {
    const questions = buildUseDoublesQuestions(seeded(seed));
    checkSix(questions, (q) => q.prompt, "known facts");
    for (const q of questions) {
      assert.match(q.known, /^(double|half of) \d+ = \d+$/);
      const [, word, n] = q.prompt.match(/^So what is (double|half of|\d+ \+) ?(\d+)\?$/) ?? [];
      assert.ok(word, q.prompt);
      const expected =
        word === "double" ? Number(n) * 2 : word === "half of" ? Number(n) / 2 : Number(word.split(" ")[0]) + Number(n);
      assert.equal(q.answer, expected, q.prompt);
      assert.ok(q.answer <= 100);
    }
  }
  checkVaries(buildUseDoublesQuestions, (q) => q.prompt);
});

test("one-step stories: three of each operation, units on every measure option", () => {
  for (const seed of SEEDS) {
    const questions = buildOneStepQuestions(seeded(seed));
    checkSix(questions, (q) => q.prompt, "one step");
    assert.equal(questions.filter((q) => q.op === "+").length, 3);
    for (const q of questions) {
      const answer = q.op === "+" ? q.a + q.b : q.a - q.b;
      assert.equal(parseInt(q.answer, 10), answer, q.prompt);
      assert.ok(answer <= 20);
      checkChoice(q, q.prompt);
      // The other operation's answer is the tempting wrong option.
      const other = q.op === "+" ? q.a - q.b : q.a + q.b;
      assert.ok(q.options.map((o) => parseInt(o, 10)).includes(other), q.prompt);
      const unit = / (cm|ml) /.exec(q.prompt)?.[1];
      for (const o of q.options) assert.equal(String(o).endsWith(` ${unit}`), Boolean(unit), `${q.prompt}: ${o}`);
    }
  }
});

test("swap questions: yes for every addition, no for every take-away, real minus sign", () => {
  for (const seed of SEEDS) {
    const questions = buildSwapQuestions(seeded(seed));
    checkSix(questions, (q) => q.fact, "swap");
    assert.equal(questions.filter((q) => q.op === "+").length, 3);
    for (const q of questions) {
      assert.ok(!/ - /.test(q.fact + q.swapped), "ASCII minus");
      const [a, , b] = q.fact.split(" ");
      assert.equal(q.swapped.split(" ")[0], b);
      assert.equal(q.swapped.split(" ")[2], a);
      assert.equal(q.answer, q.op === "+" ? SWAP_OPTIONS[0] : SWAP_OPTIONS[1]);
      assert.equal(evaluate(q.fact.split(" = ")[0]), q.result);
    }
  }
});

test("order-by-answer sets have four different answers and use the real minus sign", () => {
  for (const seed of SEEDS) {
    const questions = buildOrderByAnswerQuestions(seeded(seed));
    checkSix(questions, (q) => q.ordered.join(), "order");
    for (const q of questions) {
      const values = q.ordered.map(evaluate);
      assert.equal(new Set(values).size, 4);
      for (let i = 1; i < 4; i++) assert.ok(values[i] > values[i - 1]);
      for (const e of q.ordered) assert.ok(!e.includes("-") && values.every((v) => v >= 0));
      assert.ok(!q.cards.every((c, i) => c.id === q.ordered[i]));
    }
  }
});

test("two-step stories stay whole, within 100, and differ between runs", () => {
  for (const seed of SEEDS) {
    const questions = buildTwoStepQuestions(seeded(seed));
    checkSix(questions, (q) => q.prompt.replace(/\d+/g, "#"), "two step");
    for (const q of questions) {
      assert.ok(Number.isInteger(q.answer) && q.answer > 0 && q.answer < 100, q.prompt);
      assert.ok(!/ 1 [a-z]+s\b/.test(q.prompt), `plural after 1: ${q.prompt}`);
    }
  }
  checkVaries(buildTwoStepQuestions, (q) => q.prompt);
});

test("adding ones always crosses the next ten", () => {
  for (const seed of SEEDS) {
    const questions = buildAddOnesQuestions(seeded(seed));
    checkSix(questions, (q) => q.start, "add ones");
    for (const q of questions) {
      assert.equal(q.answer, q.start + q.add);
      assert.ok(Math.floor(q.answer / 10) > Math.floor(q.start / 10));
      assert.ok(q.answer <= 99);
      assert.ok(q.terms.includes(q.answer) && q.terms[2] === q.start);
      checkChoice(q, `${q.start} + ${q.add}`);
    }
  }
});

test("tens distractors include the answer ten out and the ones-changed slip", () => {
  const rng = seeded(3);
  const wrong = tensDistractors(34, 20, rng);
  assert.ok(wrong.includes(36), `ones changed: ${wrong}`);
  assert.ok(wrong.includes(44) || wrong.includes(64), `ten out: ${wrong}`);
  for (const seed of SEEDS) {
    const questions = buildTensQuestions(seeded(seed));
    checkSix(questions, (q) => q.start, "tens");
    for (const q of questions) {
      assert.equal(q.answer, q.start + q.change);
      assert.ok(q.answer >= 10 && q.answer <= 99);
      checkChoice(q, `${q.start} ${q.change}`);
      assert.ok(q.options.some((o) => Math.abs(o - q.answer) === 10), `no ten-out option: ${q.options}`);
      for (const o of q.options) assert.ok(o <= 99);
    }
  }
});

test("make-ten triples have exactly one pair making 10", () => {
  for (const seed of SEEDS) {
    const questions = buildMakeTenQuestions(seeded(seed));
    checkSix(questions, (q) => [...q.triple].sort().join(), "make ten");
    for (const q of questions) {
      const [x, y, z] = q.triple;
      assert.equal(x + y, 10);
      assert.notEqual(x + z, 10);
      assert.notEqual(y + z, 10);
      assert.equal(makesTenFirst(q.cards.map((c) => c.value)), false);
    }
  }
  checkVaries(buildMakeTenQuestions, (q) => q.triple.join());
});

test("two two-digit numbers always carry or exchange, within 100", () => {
  for (const seed of SEEDS) {
    const questions = buildTwoDigitQuestions(seeded(seed));
    checkSix(questions, (q) => `${q.a}${q.operator}${q.b}`, "two digit");
    assert.equal(questions.filter((q) => q.operator === "+").length, 3);
    for (const q of questions) {
      assert.ok(q.a >= 10 && q.b >= 10);
      if (q.operator === "+") {
        assert.ok((q.a % 10) + (q.b % 10) >= 10 && q.answer <= 99);
      } else {
        assert.ok(q.a % 10 < q.b % 10 && q.answer > 0);
      }
    }
  }
});

test("missing addends within 20 with fair options", () => {
  for (const seed of SEEDS) {
    const questions = buildMissingAddendQuestions(seeded(seed));
    checkSix(questions, (q) => `${q.known}+${q.total}`, "missing addend");
    for (const q of questions) {
      assert.equal(q.known + q.answer, q.total);
      assert.ok(q.total <= 20);
      checkChoice(q, `${q.known} + ? = ${q.total}`);
    }
  }
});

test("pick-the-inverse: the wrong option is the wrong-inverse mistake for every shape", () => {
  // 25 − ? = 10 is found by 25 − 10, and the mistake is "add it back".
  assert.deepEqual(inverseOptions("a-?", 25, 10), { options: ["25 + 10", "25 − 10"], answer: "25 − 10" });
  assert.deepEqual(inverseOptions("?-b", 8, 12), { options: ["12 + 8", "12 − 8"], answer: "12 + 8" });
  assert.deepEqual(inverseOptions("a+?", 14, 20), { options: ["20 + 14", "20 − 14"], answer: "20 − 14" });

  for (const seed of SEEDS) {
    const questions = buildPickInverseQuestions(seeded(seed));
    checkSix(questions, (q) => q.statement, "inverse");
    assert.equal(new Set(questions.map((q) => q.shape)).size, 4, "every shape appears");
    for (const q of questions) {
      assert.equal(q.options.length, 2);
      assert.ok(q.options[0].includes("+") && q.options[1].includes("−"), "fixed order");
      assert.equal(evaluate(q.answer), q.missing, q.statement);
      const wrong = q.options.find((o) => o !== q.answer);
      assert.notEqual(evaluate(wrong), q.missing, q.statement);
      // Put the answer back in the box: the statement must be true.
      const filled = q.statement.replace("?", String(q.missing));
      const [left, right] = filled.split(" = ");
      assert.equal(evaluate(left), Number(right), filled);
    }
  }
});

test("fact families give two true subtractions and never start solved", () => {
  for (const seed of SEEDS) {
    const questions = buildFactFamilyQuestions(seeded(seed));
    checkSix(questions, (q) => q.family.join(), "families");
    for (const q of questions) {
      const [whole, p, r] = q.family;
      assert.equal(whole, p + r);
      assert.notEqual(p, r);
      assert.equal(new Set(q.cards.map((c) => c.id)).size, 3);
      assert.equal(isTrueSubtraction(q.cards.map((c) => c.value)), false);
    }
  }
});

test("typed missing numbers cover every shape with two-digit values", () => {
  for (const seed of SEEDS) {
    const questions = buildMissingNumberQuestions(seeded(seed));
    checkSix(questions, (q) => q.text, "typed missing");
    assert.equal(new Set(questions.map((q) => q.shape)).size, 4);
    for (const q of questions) {
      const filled = q.text.replace("?", String(q.answer));
      const [left, right] = filled.split(" = ");
      assert.equal(evaluate(left), Number(right), filled);
      for (const n of filled.match(/\d+/g).map(Number)) assert.ok(n >= 10 && n <= 99, filled);
    }
  }
});
