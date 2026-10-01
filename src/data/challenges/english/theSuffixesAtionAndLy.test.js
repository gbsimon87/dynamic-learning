import test from "node:test";
import assert from "node:assert/strict";
import { PATTERNS } from "../../english/appendix1.js";
import { findUsSpellings } from "../../english/textChecks.js";
import {
  APPENDIX_EXAMPLES,
  ATION_ROOTS,
  ENTRIES,
  LY_ROOTS,
  LY_Y_ROOTS,
  TYPE_ITEMS,
  addAtion,
  addLy,
  buildSuffixQuestions,
  fillBlank,
  isBuildCorrect,
  isSortCorrect,
  nearMisses,
} from "./theSuffixesAtionAndLy.js";

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const SEEDS = Array.from({ length: 30 }, (_, i) => i + 1);
const words = new Set(ENTRIES.map((entry) => entry.word));

// Rough syllable count by vowel groups, enough for these short roots.
const syllables = (word) => (word.replace(/e$/, "").match(/[aeiouy]+/g) ?? []).length;

test("bank sizes", () => {
  assert.ok(ATION_ROOTS.length >= 15);
  assert.ok(LY_ROOTS.length >= 15);
  assert.ok(LY_Y_ROOTS.length >= 6 * 2, "two y sorts a run use six, so the bank is at least double");
  assert.ok(TYPE_ITEMS.length >= 15);
});

test("the rules make the words: drop e before ation, y to i after a consonant", () => {
  assert.equal(addAtion("admire"), "admiration");
  assert.equal(addAtion("inform"), "information");
  assert.equal(addLy("usual"), "usually");
  assert.equal(addLy("complete"), "completely");
  assert.equal(addLy("happy"), "happily");
});

test("Appendix 1's -ation and -ly examples are all made by the bank", () => {
  for (const word of APPENDIX_EXAMPLES) assert.ok(words.has(word), word);
});

test("no Year 4 -ly exception (le, ic, true, due, whole) and no one-syllable y root", () => {
  const year4 = new Set(PATTERNS.lyExceptions.words);
  for (const root of [...LY_ROOTS, ...LY_Y_ROOTS]) {
    assert.ok(!/(le|ic)$/.test(root), root);
    assert.ok(!["true", "due", "whole", "full", "public"].includes(root), root);
  }
  for (const entry of ENTRIES) assert.ok(!year4.has(entry.word), entry.word);
  for (const item of TYPE_ITEMS) assert.ok(!year4.has(item.answer), item.answer);
  for (const root of LY_Y_ROOTS) {
    assert.ok(/[^aeiou]y$/.test(root), root);
    assert.ok(syllables(root) >= 2, root);
  }
  for (const root of LY_ROOTS) assert.ok(!root.endsWith("y"), root);
});

test("no root takes both suffixes, so the suffix sort has one answer", () => {
  assert.equal(ATION_ROOTS.filter((root) => LY_ROOTS.includes(root) || LY_Y_ROOTS.includes(root)).length, 0);
  // "present" (presently, presentation) is the trap this guards against.
  assert.ok(!ATION_ROOTS.includes("present"));
});

test("near-misses are distinct, wrong and never a real word in the bank", () => {
  for (const entry of ENTRIES) {
    const misses = nearMisses(entry);
    assert.equal(new Set([entry.word, ...misses]).size, 3, entry.root);
    for (const miss of misses) assert.ok(!words.has(miss), miss);
  }
});

test("each level builds five answerable questions", () => {
  for (const level of [1, 2, 3, 4]) {
    for (const seed of SEEDS) assert.equal(buildSuffixQuestions(level, seeded(seed)).length, 5);
  }
});

test("level 1 options contain the answer once, and every run covers each rule", () => {
  for (const seed of SEEDS) {
    const questions = buildSuffixQuestions(1, seeded(seed));
    for (const q of questions) {
      assert.equal(q.options.length, 3);
      assert.equal(new Set(q.options).size, 3);
      assert.equal(q.options.filter((option) => option === q.answer).length, 1);
    }
    const rules = new Set(questions.map((q) => `${q.suffix}:${q.rule}`));
    assert.deepEqual([...rules].sort(), ["ation:add", "ation:drop-e", "ly:add", "ly:y-to-i"]);
  }
});

test("level 2 sorts six roots, three a bin, never repeating a root in a run", () => {
  for (const seed of SEEDS) {
    const seen = new Set();
    for (const q of buildSuffixQuestions(2, seeded(seed))) {
      assert.equal(q.cards.length, 6);
      for (const bin of q.bins) assert.equal(q.cards.filter((card) => card.bin === bin.id).length, 3);
      for (const card of q.cards) {
        assert.ok(!seen.has(card.id), card.id);
        seen.add(card.id);
        const entry = ENTRIES.find((item) => item.root === card.id);
        if (q.sortKind === "suffix") assert.equal(entry.suffix, card.bin);
        else assert.equal(entry.rule === "y-to-i" ? "y-to-i" : "add", card.bin);
      }
      const right = Object.fromEntries(q.cards.map((card) => [card.id, card.bin]));
      assert.ok(isSortCorrect(q, right));
      const other = q.bins.find((bin) => bin.id !== q.cards[0].bin).id;
      assert.equal(isSortCorrect(q, { ...right, [q.cards[0].id]: other }), false);
    }
  }
});

test("level 3 tiles can always build the answer, and the tempting wrong build fails", () => {
  for (const seed of SEEDS) {
    for (const q of buildSuffixQuestions(3, seeded(seed))) {
      const id = (label) => q.tiles.find((tile) => tile.label === label).id;
      const labels = q.tiles.map((tile) => tile.label);
      assert.equal(new Set(labels).size, labels.length);
      const stem = q.root.slice(0, -1);
      let path;
      if (q.rule === "drop-e") path = [stem, q.suffix];
      else if (q.rule === "y-to-i") path = [stem, "i", q.suffix];
      else path = [q.root, q.suffix];
      assert.ok(isBuildCorrect(q, path.map(id)), `${q.answer} from ${path}`);
      assert.equal(isBuildCorrect(q, [q.root, q.suffix].map(id)), q.rule === "add");
    }
  }
});

test("level 4: one blank, the answer is root + suffix by the rules, the voice never says it", () => {
  for (const item of TYPE_ITEMS) {
    assert.equal(item.sentence.split("___").length, 2, item.sentence);
    assert.ok([addAtion(item.root), addLy(item.root)].includes(item.answer), item.answer);
    assert.ok(words.has(item.answer), item.answer);
  }
  for (const seed of SEEDS) {
    for (const q of buildSuffixQuestions(4, seeded(seed))) {
      assert.equal(q.filled, fillBlank(q.sentence, q.answer));
      assert.ok(!q.spoken.includes(q.answer));
      assert.equal(q.hint.replace(/ /g, "").length, q.answer.length);
    }
  }
});

test("all text uses British spelling", () => {
  const text = [...TYPE_ITEMS.map((item) => item.sentence), ...ENTRIES.map((entry) => entry.word)].join(" ");
  assert.deepEqual(findUsSpellings(text), []);
});
