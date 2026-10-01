import test from "node:test";
import assert from "node:assert/strict";
import { findUsSpellings } from "../../english/textChecks.js";
import {
  APPENDIX_EXAMPLES,
  ENTRIES,
  EXCLUDED_ROOTS,
  ROOTS,
  TYPE_ITEMS,
  addSuffix,
  buildDoublingQuestions,
  fillBlank,
  isBuildCorrect,
  isSortCorrect,
  rootOf,
  wrongSpelling,
} from "./doublingBeforeASuffix.js";

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const SEEDS = Array.from({ length: 30 }, (_, i) => i + 1);
const words = new Set(ENTRIES.map((entry) => entry.word));

test("bank sizes", () => {
  assert.ok(ENTRIES.length >= 45);
  assert.ok(ROOTS.filter((item) => item.double).length >= 15);
  assert.ok(ROOTS.filter((item) => !item.double).length >= 15);
  assert.ok(TYPE_ITEMS.length >= 15);
});

test("every root has more than one syllable and ends in one vowel letter + one consonant letter", () => {
  for (const item of ROOTS) {
    assert.ok(item.syllables.length >= 2, item.root);
    assert.equal(item.syllables.join("").toLowerCase(), item.root);
    assert.match(item.root, /[^aeiou][aeiou][b-df-hj-np-tvz]$/, item.root);
    assert.ok(!/[wxy]$/.test(item.root), item.root);
  }
});

test("doubling follows the stress: exactly one stressed syllable, and it is the last one iff doubled", () => {
  for (const item of ROOTS) {
    const stressed = item.syllables.filter((syllable) => syllable === syllable.toUpperCase());
    assert.equal(stressed.length, 1, item.root);
    const lastStressed = item.syllables.at(-1) === item.syllables.at(-1).toUpperCase();
    assert.equal(lastStressed, item.double, item.root);
  }
});

test("Appendix 1's examples are all in the bank (forgetting … limitation)", () => {
  const roots = new Set(ROOTS.map((item) => item.root));
  for (const word of APPENDIX_EXAMPLES) assert.ok(words.has(word) || roots.has(word), word);
});

test("no -l root and no British exception (travel, cancel, worship…) appears", () => {
  for (const item of ROOTS) {
    assert.ok(!item.root.endsWith("l"), item.root);
    assert.ok(!EXCLUDED_ROOTS.includes(item.root), item.root);
  }
  const text = [...ENTRIES.map((entry) => entry.word), ...TYPE_ITEMS.map((item) => item.sentence)].join(" ");
  for (const root of EXCLUDED_ROOTS) assert.ok(!new RegExp(`\\b${root}`, "i").test(text), root);
});

test("every suffix begins with a vowel letter, and the wrong spelling is different", () => {
  for (const entry of ENTRIES) {
    assert.match(entry.suffix, /^[aeiou]/);
    assert.notEqual(wrongSpelling(entry.root, entry.suffix), entry.word);
    assert.equal(entry.word, addSuffix(entry.root, entry.suffix));
  }
  assert.equal(addSuffix("forget", "ing"), "forgetting");
  assert.equal(addSuffix("garden", "ing"), "gardening");
  assert.equal(addSuffix("prefer", "ed"), "preferred");
  assert.equal(addSuffix("limit", "ed"), "limited");
});

test("each level builds five answerable questions", () => {
  for (const level of [1, 2, 3, 4]) {
    for (const seed of SEEDS) assert.equal(buildDoublingQuestions(level, seeded(seed)).length, 5);
  }
});

test("level 1: two options, the answer once, and both kinds in every run", () => {
  for (const seed of SEEDS) {
    const questions = buildDoublingQuestions(1, seeded(seed));
    for (const q of questions) {
      assert.equal(q.options.length, 2);
      assert.equal(new Set(q.options).size, 2);
      assert.ok(q.options.includes(q.answer));
    }
    assert.ok(questions.filter((q) => q.double).length >= 2);
    assert.ok(questions.filter((q) => !q.double).length >= 2);
  }
});

test("level 2: two of each kind a question, no root twice in a run", () => {
  for (const seed of SEEDS) {
    const roots = new Set();
    for (const q of buildDoublingQuestions(2, seeded(seed))) {
      assert.equal(q.cards.length, 4);
      assert.equal(q.cards.filter((card) => card.bin === "double").length, 2);
      for (const card of q.cards) {
        assert.ok(!roots.has(card.root), card.root);
        roots.add(card.root);
        assert.equal(card.bin === "double", rootOf(card.root).double);
      }
      const right = Object.fromEntries(q.cards.map((card) => [card.id, card.bin]));
      assert.ok(isSortCorrect(q, right));
      assert.equal(isSortCorrect(q, { ...right, [q.cards[0].id]: q.cards[0].bin === "add" ? "double" : "add" }), false);
    }
  }
});

test("level 3: the tiles build the answer; the other way is wrong", () => {
  for (const seed of SEEDS) {
    for (const q of buildDoublingQuestions(3, seeded(seed))) {
      const id = (label) => q.tiles.find((tile) => tile.label === label).id;
      assert.equal(new Set(q.tiles.map((tile) => tile.label)).size, 4);
      const withExtra = [q.root, q.root.at(-1), q.suffix].map(id);
      const without = [q.root, q.suffix].map(id);
      assert.equal(isBuildCorrect(q, withExtra), q.double);
      assert.equal(isBuildCorrect(q, without), !q.double);
    }
  }
});

test("level 4: one blank, and the answer is the rule's word", () => {
  for (const item of TYPE_ITEMS) {
    assert.equal(item.sentence.split("___").length, 2, item.sentence);
    assert.equal(item.answer, addSuffix(item.root, item.suffix));
    assert.ok(words.has(item.answer), item.answer);
  }
  for (const seed of SEEDS) {
    for (const q of buildDoublingQuestions(4, seeded(seed))) {
      assert.equal(q.filled, fillBlank(q.sentence, q.answer));
      assert.equal(q.hint, undefined, "a letter count would give the doubling away");
    }
  }
  assert.ok(TYPE_ITEMS.filter((item) => rootOf(item.root).double).length >= 6);
  assert.ok(TYPE_ITEMS.filter((item) => !rootOf(item.root).double).length >= 6);
});

test("all text uses British spelling", () => {
  assert.deepEqual(findUsSpellings(TYPE_ITEMS.map((item) => item.sentence).join(" ")), []);
});
