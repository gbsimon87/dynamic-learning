import test from "node:test";
import assert from "node:assert/strict";
import {
  buildTenthsQuestions, buildSetQuestions, buildNumbersQuestions,
  buildEquivalentQuestions, buildArithmeticQuestions, buildComparingQuestions,
  buildFractionProblemQuestions, fractionValue, shadedParts,
} from "./year3Fractions.js";

const builders = [
  buildTenthsQuestions, buildSetQuestions, buildNumbersQuestions,
  buildEquivalentQuestions, buildArithmeticQuestions, buildComparingQuestions,
  buildFractionProblemQuestions,
];

test("every Year 3 fraction challenge has six usable rounds", () => {
  for (const build of builders) {
    for (let level = 1; level <= 4; level++) {
      const rounds = build(level, () => 0.31);
      assert.equal(rounds.length, 6, `${build.name} level ${level}`);
      assert.ok(rounds.every((round) => round.type));
    }
  }
});

test("tenths stay in ten equal parts and can be counted from the picture", () => {
  for (let level = 1; level <= 4; level++) {
    for (const round of buildTenthsQuestions(level, () => 0.19)) {
      assert.equal(round.denominator, 10);
      assert.ok(round.numerator >= 1 && round.numerator <= 9);
      assert.equal(shadedParts(round.numerator, 10).filter(Boolean).length, round.numerator);
      if (round.options) assert.equal(round.options.filter((option) => option === `${round.numerator}/10`).length, 1);
    }
  }
});

test("set questions divide exactly and their answer counts the selected objects", () => {
  for (let level = 1; level <= 4; level++) {
    for (const round of buildSetQuestions(level, () => 0.46)) {
      assert.equal(round.total % round.denominator, 0);
      assert.equal(round.answer, round.total * round.numerator / round.denominator);
      assert.ok(round.answer > 0 && round.answer <= round.total);
    }
  }
});

test("fractions as numbers introduce values beyond one only in later challenges", () => {
  for (let level = 1; level <= 4; level++) {
    for (const round of buildNumbersQuestions(level, () => 0.41)) {
      assert.equal(round.numerator > round.denominator, level >= 3);
      assert.ok(round.numerator <= 2 * round.denominator);
      if (round.options) assert.equal(round.options.filter((option) => option === `${round.numerator}/${round.denominator}`).length, 1);
    }
  }
});

test("each equivalent fraction match has exactly one equal diagram", () => {
  for (let level = 1; level <= 4; level++) {
    for (const round of buildEquivalentQuestions(level, () => 0.59)) {
      assert.equal(round.target.numerator * round.answerDenominator, round.answer * round.target.denominator);
      assert.equal(round.options.filter((option) => fractionValue(option) === fractionValue(round.target)).length, 1);
      assert.ok(round.answerDenominator <= 8);
    }
  }
});

test("arithmetic uses one denominator and stays within one whole", () => {
  for (let level = 1; level <= 4; level++) {
    for (const round of buildArithmeticQuestions(level, () => 0.67)) {
      assert.equal(round.answer, round.operation === "add" ? round.first + round.second : round.first - round.second);
      assert.ok(round.answer >= 0 && round.answer <= round.denominator);
      if (round.options) assert.equal(round.options.filter((option) => option === `${round.answer}/${round.denominator}`).length, 1);
    }
  }
});

test("comparison questions have one larger answer and untied ordering cards", () => {
  for (let level = 1; level <= 4; level++) {
    for (const round of buildComparingQuestions(level, () => 0.23)) {
      if (round.type === "order-fractions") {
        assert.equal(new Set(round.items.map((item) => item.numerator)).size, round.items.length);
        assert.notDeepEqual(round.items.map((item) => item.id), round.ordered);
        assert.deepEqual(round.ordered, [...round.ordered].sort((a, b) => Number(a.split("/")[0]) - Number(b.split("/")[0])));
      } else {
        assert.notEqual(fractionValue(round.left), fractionValue(round.right));
        assert.equal(round.answer, fractionValue(round.left) > fractionValue(round.right) ? "left" : "right");
      }
    }
  }
});

test("mixed stories recompute to positive, in-scope answers", () => {
  for (let level = 1; level <= 4; level++) {
    for (const round of buildFractionProblemQuestions(level, () => 0.81)) {
      if (level === 1) assert.equal(round.answer, round.total * round.numerator / round.denominator);
      if (level === 2) assert.equal(round.answer, round.first + round.second);
      if (level === 3) assert.equal(round.target.numerator * round.answerDenominator, round.answer * round.target.denominator);
      if (level === 4) assert.equal(round.answer, round.start - round.usedFirst - round.usedSecond);
      assert.ok(round.answer > 0);
      if (level === 2 || level === 4) assert.ok(round.answer <= round.denominator);
    }
  }
});
