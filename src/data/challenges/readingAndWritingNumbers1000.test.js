import test from "node:test";
import assert from "node:assert/strict";
import {
  buildWordQuestions,
  hasEmptyColumn,
  numberInWords,
  partitionStandard,
  wordOptions,
} from "./readingAndWritingNumbers1000.js";

const seeded = (seed) => () => {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return seed / 2147483648;
};

test("the hard cases are the empty columns", () => {
  assert.equal(hasEmptyColumn(306), true);
  assert.equal(hasEmptyColumn(420), true);
  assert.equal(hasEmptyColumn(346), false);
});

test("the words are the ones a teacher would write", () => {
  assert.equal(numberInWords(346), "three hundred and forty-six");
  assert.equal(numberInWords(306), "three hundred and six");
  assert.equal(numberInWords(420), "four hundred and twenty");
  assert.equal(numberInWords(1000), "one thousand");
});

// An empty column must not appear as a term: "700 + 0 + 5" is not how anyone
// partitions 705 and would invite the answer "three parts".
test("the partition bridge drops empty columns", () => {
  assert.deepEqual(partitionStandard(346), [300, 40, 6]);
  assert.deepEqual(partitionStandard(306), [300, 6]);
  assert.deepEqual(partitionStandard(420), [400, 20]);
});

test("every option is the name of a real number, and one of them is right", () => {
  const rng = seeded(17);
  for (let value = 101; value <= 999; value += 13) {
    const options = wordOptions(value, rng);
    assert.equal(options.length, 4, `${value} gave ${options.length} options`);
    assert.equal(new Set(options).size, 4, `${value} repeated an option`);
    assert.ok(options.includes(numberInWords(value)), `${value} lost its answer`);
  }
});

test("level 1 shows a partition that adds up to the number it names", () => {
  const questions = buildWordQuestions(1, seeded(2));
  assert.equal(questions.length, 6);
  for (const q of questions) {
    assert.equal(q.answer, numberInWords(q.value));
    assert.equal(
      q.parts.reduce((sum, part) => sum + part, 0),
      q.value,
      `${q.parts} is not ${q.value}`
    );
    assert.ok(q.options.includes(q.answer));
  }
  assert.ok(questions.some((q) => hasEmptyColumn(q.value)), "no empty-column case");
});

test("level 2 asks for a numeral and stocks the traps", () => {
  const questions = buildWordQuestions(2, seeded(5));
  assert.equal(questions.length, 6);
  for (const q of questions) {
    assert.equal(q.words, numberInWords(q.answer));
    assert.ok(q.answer >= 100 && q.answer <= 1000, `${q.answer} is outside Year 3`);
  }
  assert.equal(
    questions.filter((q) => hasEmptyColumn(q.answer)).length,
    4,
    "the empty-column cases have drifted out of the set"
  );
});

// A repeated value would make several arrangements correct while the challenge
// accepts exactly one.
test("every ordering set is tie-free and reads only in words", () => {
  const questions = buildWordQuestions(3, seeded(9));
  assert.equal(questions.length, 6);
  for (const q of questions) {
    assert.equal(new Set(q.values).size, q.values.length, `${q.values} has a tie`);
    assert.deepEqual(q.answer, [...q.values].sort((a, b) => a - b));
    for (const item of q.items) {
      assert.equal(item.label, numberInWords(Number(item.id)));
      assert.ok(!/\d/.test(item.label), `${item.label} shows a digit`);
    }
    // Sharing a hundreds digit is what stops the cards being sorted on their
    // first word alone.
    const hundreds = new Set(q.values.map((v) => Math.floor(v / 100)));
    assert.equal(hundreds.size, 1, `${q.values} do not share a hundreds digit`);
  }
});

// Recomputed from the problem's own start and jump rather than trusted, and
// the prompt is checked to contain the words it claims to.
test("every word problem reads its number in words and lands where it says", () => {
  const questions = buildWordQuestions(4, seeded(23));
  assert.equal(questions.length, 6);
  for (const q of questions) {
    assert.equal(q.words, numberInWords(q.start));
    assert.equal(q.answer, q.start + q.change);
    assert.ok(q.answer >= 100 && q.answer <= 1000, `${q.answer} is outside Year 3`);
    assert.ok(q.prompt.includes(q.words), `"${q.prompt}" never says ${q.words}`);
    assert.ok(!/\d/.test(q.prompt), `"${q.prompt}" gives a digit away`);
  }
  assert.ok(questions.some((q) => q.change !== 0), "nothing to do but copy it out");
});

test("an unknown level is refused rather than silently empty", () => {
  assert.throws(() => buildWordQuestions(0, Math.random), RangeError);
});
