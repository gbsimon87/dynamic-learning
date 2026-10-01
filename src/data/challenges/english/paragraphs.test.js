import test from "node:test";
import assert from "node:assert/strict";
import { findUsSpellings, wordCount } from "../../english/textChecks.js";
import { PARAGRAPH_SETS, buildParagraphQuestions, isSortCorrect, splitQuestion } from "./paragraphs.js";

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

test("at least ten sets, each with two themes of four distinct sentences", () => {
  assert.ok(PARAGRAPH_SETS.length >= 10);
  for (const set of PARAGRAPH_SETS) {
    assert.equal(set.themes.length, 2, set.title);
    assert.notEqual(set.themes[0].label, set.themes[1].label);
    const all = set.themes.flatMap((theme) => theme.sentences);
    assert.equal(all.length, 8, set.title);
    assert.equal(new Set(all).size, 8, set.title);
    for (const sentence of all) assert.match(sentence, /^[A-Z].*[.!?]$/, sentence);
  }
});

test("a level 4 text (three sentences a theme, plus the title) stays short", () => {
  for (const set of PARAGRAPH_SETS) {
    const words = wordCount(set.themes.flatMap((theme) => theme.sentences.slice(0, 3)).join(" "));
    assert.ok(words <= 200, `${set.title}: ${words}`);
  }
});

test("all text uses British spelling", () => {
  const text = PARAGRAPH_SETS.flatMap((set) => [set.title, ...set.themes.flatMap((theme) => [theme.label, ...theme.sentences])]).join(" ");
  assert.deepEqual(findUsSpellings(text), []);
});

test("level 3 always splits between the two themes, and the split moves", () => {
  const answers = new Set();
  for (const set of PARAGRAPH_SETS) {
    for (let seed = 1; seed <= 20; seed += 1) {
      const q = splitQuestion(set, seeded(seed));
      assert.ok(q.answer >= 2 && q.answer <= 3);
      assert.ok(q.sentences.length - q.answer >= 2);
      const [first] = set.themes.filter((theme) => theme.label === q.themes[0]);
      assert.deepEqual(q.sentences.slice(0, q.answer), first.sentences.slice(0, q.answer));
      answers.add(q.answer);
    }
  }
  assert.deepEqual([...answers].sort(), [2, 3]);
});

test("every level builds five answerable questions", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    for (const q of buildParagraphQuestions(1, seeded(seed))) {
      assert.equal(q.options.filter((option) => option === q.answer).length, 1);
    }
    for (const q of buildParagraphQuestions(2, seeded(seed))) {
      assert.equal(q.cards.length, 4);
      const right = Object.fromEntries(q.cards.map((card) => [card.id, card.bin]));
      assert.ok(isSortCorrect(q, right));
      assert.equal(isSortCorrect(q, {}), false);
    }
    for (const q of buildParagraphQuestions(4, seeded(seed))) {
      assert.ok(q.options.includes(q.answer));
      assert.equal(q.passage.blocks.length, 2);
      // The sentence to place is never already in the text.
      assert.ok(!q.passage.blocks.some((block) => block.text.includes(q.sentence)));
    }
  }
});
