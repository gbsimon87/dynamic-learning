import test from "node:test";
import assert from "node:assert/strict";
import {
  YEAR3_TABLES,
  buildTablesQuestions,
  buildEightQuestions,
  buildTwoDigitQuestions,
  buildScalingQuestions,
  buildMulDivProblemQuestions,
  multiplyPartition,
  dividePartition,
  arrayRows,
} from "./year3MulDiv.js";

const builders = [
  buildTablesQuestions,
  buildEightQuestions,
  buildTwoDigitQuestions,
  buildScalingQuestions,
  buildMulDivProblemQuestions,
];

/**
 * A handful of seeds rather than one: a single fixed rng only ever walks one
 * path through a generator, and every bug worth catching here lives on a path
 * the default seed misses.
 */
const SEEDS = [0.03, 0.19, 0.31, 0.5, 0.77, 0.94];

/** A deterministic sequence that still moves, so shuffles actually shuffle. */
function seeded(seed) {
  let state = seed;
  return () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
}

function everyRound(visit) {
  for (const build of builders) {
    for (let level = 1; level <= 4; level++) {
      for (const seed of SEEDS) {
        for (const round of build(level, seeded(seed))) {
          visit(round, { build, level, seed });
        }
      }
    }
  }
}

test("every challenge offers six usable rounds at all four levels", () => {
  for (const build of builders) {
    for (let level = 1; level <= 4; level++) {
      for (const seed of SEEDS) {
        const rounds = build(level, seeded(seed));
        assert.equal(rounds.length, 6, `${build.name} level ${level}`);
        assert.ok(rounds.every((round) => round.type), `${build.name} level ${level} type`);
        assert.ok(
          rounds.every((round) => Number.isInteger(round.answer)),
          `${build.name} level ${level} answer`
        );
      }
    }
  }
});

test("a level outside 1-4 is refused rather than silently building nothing", () => {
  for (const build of builders) {
    for (const level of [0, 5, 1.5, "2"]) {
      assert.throws(() => build(level, seeded(0.5)), RangeError, `${build.name} ${level}`);
    }
  }
});

test("no answer is negative and nothing reaches beyond 1000", () => {
  everyRound((round, where) => {
    const context = `${where.build.name} L${where.level} seed ${where.seed}`;
    assert.ok(round.answer >= 0, `${context}: negative answer ${round.answer}`);
    assert.ok(round.answer <= 1000, `${context}: ${round.answer} is past 1000`);
    for (const number of String(round.prompt ?? "").match(/\d+/g) ?? []) {
      assert.ok(Number(number) <= 1000, `${context}: ${number} in "${round.prompt}"`);
    }
  });
});

test("every option list contains its own answer exactly once", () => {
  everyRound((round, where) => {
    if (!round.options) return;
    const context = `${where.build.name} L${where.level} seed ${where.seed}`;
    // A pick-the-operation round answers with a calculation, not a number.
    const expected = round.type === "pick-operation" ? round.answerOption : round.answer;
    const hits = round.options.filter((option) => option === expected);
    assert.equal(hits.length, 1, `${context}: ${JSON.stringify(round.options)} vs ${expected}`);
    assert.equal(new Set(round.options).size, round.options.length, `${context}: duplicate option`);
    for (const option of round.options) {
      if (typeof option === "number") assert.ok(option >= 0, `${context}: negative option`);
    }
  });
});

test("times tables stay inside the 3 and 4 tables and the array matches the product", () => {
  for (let level = 1; level <= 3; level++) {
    for (const seed of SEEDS) {
      for (const round of buildTablesQuestions(level, seeded(seed))) {
        const table = round.rows ?? round.a ?? round.left;
        assert.ok([3, 4].includes(table), `table ${table} is not taught in this topic`);
        if (round.type === "array-product") {
          const dots = round.grid.flat().length;
          assert.equal(dots, round.answer, "the drawing must show the answer it claims");
          assert.equal(round.grid.length, round.rows);
          assert.ok(round.grid.every((row) => row.length === round.columns));
        }
        if (round.type === "fact-triangle") {
          assert.equal(round.left * round.right, round.product);
          assert.equal(round.answer, round.hidden === "product" ? round.product : round.right);
        }
      }
    }
  }
});

test("the eight times table topic really is the eight times table", () => {
  for (const seed of SEEDS) {
    for (const round of buildEightQuestions(1, seeded(seed))) {
      // The chain IS the teaching: each rung must be double the one above it.
      assert.equal(round.twice, 2 * round.other);
      assert.equal(round.fourTimes, 2 * round.twice);
      assert.equal(round.answer, 2 * round.fourTimes);
      assert.equal(round.answer, 8 * round.other);
    }
    for (const round of buildEightQuestions(2, seeded(seed))) {
      assert.equal(round.a, 8);
      assert.equal(round.answer, 8 * round.b);
    }
    for (const round of buildEightQuestions(3, seeded(seed))) {
      assert.equal(round.groups, 8);
      assert.equal(round.total, round.groups * round.each);
      assert.equal(round.answer, round.each);
      // Dealt a round at a time, so this is the number of taps a child makes.
      assert.ok(round.each <= 6, "more than six rounds of dealing is a chore");
    }
  }
});

test("a partition adds back up to the calculation it claims to split", () => {
  for (const level of [1, 2]) {
    for (const seed of SEEDS) {
      for (const round of buildTwoDigitQuestions(level, seeded(seed))) {
        const parts = round.cells.map((cell) => cell.value);
        assert.equal(parts.reduce((sum, part) => sum + part, 0), round.answer, round.heading);
        assert.ok(parts.every((part) => Number.isInteger(part) && part > 0), round.heading);
        assert.ok(YEAR3_TABLES.includes(round.b), `${round.b} is not a Year 3 table`);
        if (round.operation === "multiply") {
          assert.equal(round.a * round.b, round.answer);
          assert.ok(round.a % 10 !== 0, "a round ten has nothing to partition");
        } else {
          assert.equal(round.a / round.b, round.answer);
          assert.equal(round.a % round.b, 0, "division must be exact");
        }
        assert.ok(round.a >= 10 && round.a <= 99, `${round.a} is not two digits`);
      }
    }
  }
});

test("short multiplication always has three answer digits to fill", () => {
  for (const seed of SEEDS) {
    for (const round of buildTwoDigitQuestions(3, seeded(seed))) {
      assert.equal(round.a * round.b, round.answer);
      assert.ok(round.answer >= 100 && round.answer <= 999, `${round.answer} needs a leading zero`);
    }
  }
});

test("scaling shows a real multiple and correspondence counts every pairing", () => {
  for (const seed of SEEDS) {
    for (const level of [1, 2]) {
      for (const round of buildScalingQuestions(level, seeded(seed))) {
        assert.equal(round.big, round.base * round.factor);
        assert.ok(round.factor >= 2, "a scale factor of one is not a scaling problem");
        assert.equal(round.answer, level === 1 ? round.big : round.factor);
      }
    }
    for (const round of buildScalingQuestions(3, seeded(seed))) {
      assert.equal(round.answer, round.tops.length * round.bottoms.length);
      assert.ok(round.tops.length >= 2 && round.bottoms.length >= 2);
      // Every link is one tap to reveal, so the sets have to stay small.
      assert.ok(round.answer <= 12, `${round.answer} links is too many to count`);
    }
  }
});

test("pick-the-operation has exactly one option that answers the question", () => {
  const evaluate = (expression) => {
    const [left, operator, right] = expression.split(" ");
    const a = Number(left);
    const b = Number(right);
    if (operator === "×") return a * b;
    if (operator === "÷") return a / b;
    if (operator === "+") return a + b;
    return a - b;
  };

  for (const seed of SEEDS) {
    for (const round of buildMulDivProblemQuestions(1, seeded(seed))) {
      const matching = round.options.filter((option) => evaluate(option) === round.answer);
      assert.equal(matching.length, 1, `${round.prompt} → ${JSON.stringify(round.options)}`);
      assert.equal(evaluate(round.answerOption), round.answer);
      assert.ok(round.options.every((option) => evaluate(option) >= 0), round.prompt);
    }
  }
});

test("a missing number problem is true once the answer is written in", () => {
  const evaluate = (a, operator, b) => (operator === "×" ? a * b : a / b);

  for (const seed of SEEDS) {
    for (const round of buildMulDivProblemQuestions(2, seeded(seed))) {
      const [left, operator, right, , result] = round.parts.map((part) =>
        part === "?" ? String(round.answer) : part
      );
      assert.equal(evaluate(Number(left), operator, Number(right)), Number(result), round.parts.join(" "));
      assert.equal(round.parts.filter((part) => part === "?").length, 1, "one blank only");
    }
    for (const round of buildMulDivProblemQuestions(3, seeded(seed))) {
      assert.equal(round.left * round.right, round.product);
      const [statement] = round.derived.split(" = ");
      const [a, operator, b] = statement.split(" ");
      assert.equal(evaluate(Number(a), operator, Number(b)), round.answer, round.derived);
    }
  }
});

test("the partition helpers agree with the arithmetic they illustrate", () => {
  for (const b of YEAR3_TABLES) {
    for (let a = 11; a <= 49; a++) {
      if (a % 10 === 0) continue;
      const split = multiplyPartition(a, b);
      assert.equal(split.cells[0].value + split.cells[1].value, a * b, `${a} × ${b}`);
    }
    for (let quotient = 11; quotient <= Math.floor(99 / b); quotient++) {
      const split = dividePartition(b, quotient);
      assert.equal(split.cells[0].value + split.cells[1].value, quotient, `${b * quotient} ÷ ${b}`);
      assert.equal(split.a, b * quotient);
    }
  }
});

test("arrayRows draws the rectangle it is asked for", () => {
  const grid = arrayRows(4, 7);
  assert.equal(grid.length, 4);
  assert.ok(grid.every((row) => row.length === 7));
  assert.equal(new Set(grid.flat()).size, 28, "cell keys must be unique");
});
