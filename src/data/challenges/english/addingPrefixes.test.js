import test from "node:test";
import assert from "node:assert/strict";
import { PATTERNS } from "../../english/appendix1.js";
import { findUsSpellings } from "../../english/textChecks.js";
import {
  APPENDIX_EXAMPLES,
  BUILD_ITEMS,
  MEANINGS,
  PICK_ITEMS,
  PREFIXED_WORDS,
  PREFIXES,
  PREFIX_MEANING,
  TYPE_ITEMS,
  buildAddingPrefixesQuestions,
  fillBlank,
  isBuildCorrect,
  isSortCorrect,
  letterHint,
} from "./addingPrefixes.js";
import { isSameAnswer } from "./shared.js";

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const SEEDS = Array.from({ length: 30 }, (_, i) => i + 1);

test("banks are at least three times one run", () => {
  assert.ok(PICK_ITEMS.length >= 15);
  assert.ok(BUILD_ITEMS.length >= 15);
  assert.ok(TYPE_ITEMS.length >= 15);
  assert.ok(PREFIXED_WORDS.length >= 30);
});

test("every prefixed word is prefix + root, unchanged", () => {
  for (const item of PREFIXED_WORDS) {
    assert.ok(PREFIXES.includes(item.prefix), item.word);
    assert.equal(item.prefix + item.root, item.word);
  }
  for (const item of BUILD_ITEMS) {
    assert.equal(item.prefix + item.root, item.word);
    assert.notEqual(item.prefix + item.trap, item.word, item.word);
  }
  for (const item of PICK_ITEMS) {
    assert.ok(PREFIXED_WORDS.some((entry) => entry.word === item.answer + item.root), item.root);
  }
});

test("Appendix 1's example words for dis-, mis-, in-, re-, sub- and inter- are all in the bank", () => {
  const words = new Set(PREFIXED_WORDS.map((item) => item.word));
  for (const word of APPENDIX_EXAMPLES) assert.ok(words.has(word), word);
});

test("no Year 4 prefix (il-, im-, ir-) and no super-/anti-/auto- word appears", () => {
  const year4 = Object.values(PATTERNS.inAssimilated.words).flat();
  const all = [
    ...PREFIXED_WORDS.map((item) => item.word),
    ...TYPE_ITEMS.map((item) => item.answer),
    ...BUILD_ITEMS.map((item) => item.word),
  ];
  for (const word of all) {
    assert.ok(!year4.includes(word), word);
    assert.ok(!/^(il|im|ir|super|anti|auto)/.test(word), word);
  }
});

test("level 1 wrong options never put the other 'not' prefix beside a 'not' word", () => {
  for (const item of PICK_ITEMS) {
    const options = [item.answer, ...item.wrong];
    assert.equal(new Set(options).size, options.length, item.root);
    const notPrefixes = options.filter((prefix) => PREFIX_MEANING[prefix] === "not");
    assert.ok(notPrefixes.length <= 1, item.root);
  }
});

test("each level builds five answerable questions", () => {
  for (const level of [1, 2, 3, 4]) {
    for (const seed of SEEDS) {
      const questions = buildAddingPrefixesQuestions(level, seeded(seed));
      assert.equal(questions.length, 5);
    }
  }
});

test("level 1 options contain the answer once and are distinct", () => {
  for (const seed of SEEDS) {
    for (const q of buildAddingPrefixesQuestions(1, seeded(seed))) {
      assert.equal(q.options.filter((option) => option === q.answer).length, 1);
      assert.equal(new Set(q.options).size, q.options.length);
      assert.equal(q.options.length, 4);
    }
  }
});

test("level 2 sorts six different words into three meaning bins, never repeating a word in a run", () => {
  for (const seed of SEEDS) {
    const questions = buildAddingPrefixesQuestions(2, seeded(seed));
    const seen = new Set();
    for (const q of questions) {
      assert.equal(q.bins.length, 3);
      assert.equal(q.cards.length, 6);
      for (const bin of q.bins) {
        assert.equal(bin.label, MEANINGS[bin.id]);
        assert.equal(q.cards.filter((card) => card.bin === bin.id).length, 2);
      }
      for (const card of q.cards) {
        assert.ok(!seen.has(card.id), card.id);
        seen.add(card.id);
      }
      const right = Object.fromEntries(q.cards.map((card) => [card.id, card.bin]));
      assert.ok(isSortCorrect(q, right));
      const other = q.bins.find((bin) => bin.id !== q.cards[0].bin).id;
      assert.equal(isSortCorrect(q, { ...right, [q.cards[0].id]: other }), false);
    }
  }
});

test("level 3 tiles can build the word, and the trap does not", () => {
  for (const seed of SEEDS) {
    for (const q of buildAddingPrefixesQuestions(3, seeded(seed))) {
      const labels = q.tiles.map((tile) => tile.label);
      assert.equal(new Set(labels).size, labels.length, labels.join(","));
      const prefix = q.tiles.find((tile) => tile.label === q.prefix).id;
      const root = q.tiles.find((tile) => tile.label === q.root).id;
      assert.ok(isBuildCorrect(q, [prefix, root]));
      assert.equal(isBuildCorrect(q, [root, prefix]), false);
      assert.equal(isBuildCorrect(q, [prefix]), false);
    }
  }
});

test("level 4 sentences have one blank, and the hint keeps the answer hidden", () => {
  for (const item of TYPE_ITEMS) {
    assert.equal(item.sentence.split("___").length, 2, item.sentence);
    assert.ok(PREFIXES.some((prefix) => item.answer === prefix + item.root), item.answer);
    assert.ok(/^[a-z]+$/.test(item.answer), "LetterInput has no hyphen or capital");
  }
  for (const seed of SEEDS) {
    for (const q of buildAddingPrefixesQuestions(4, seeded(seed))) {
      assert.equal(q.filled, fillBlank(q.sentence, q.answer));
      assert.ok(!q.spoken.includes(q.answer), q.spoken);
      assert.equal(q.hint.replace(/ /g, "").length, q.answer.length);
      assert.ok(isSameAnswer(q.answer.toUpperCase(), q.answer));
    }
  }
  assert.equal(letterHint("redo"), "r _ _ _");
});

test("all text uses British spelling", () => {
  const text = [
    ...PICK_ITEMS.map((item) => item.meaning),
    ...BUILD_ITEMS.map((item) => item.meaning),
    ...TYPE_ITEMS.map((item) => item.sentence),
  ].join(" ");
  assert.deepEqual(findUsSpellings(text), []);
});
