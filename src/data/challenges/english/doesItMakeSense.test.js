import test from "node:test";
import assert from "node:assert/strict";
import { findReadingPassage } from "../../english/passagesReading.js";
import { findUsSpellings, passageText } from "../../english/textChecks.js";
import { questionProblems, questionText } from "./readingKit.js";
import {
  GAP_ITEMS,
  PASSAGE_SETS,
  WRONG_WORD_SENTENCES,
  buildDoesItMakeSenseQuestions,
} from "./doesItMakeSense.js";

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const words = (text) => text.toLowerCase().replace(/’/g, "'").match(/[a-z']+/g) ?? [];

test("banks hold at least 15 items, and three passages", () => {
  assert.ok(GAP_ITEMS.length >= 15);
  assert.ok(WRONG_WORD_SENTENCES.length >= 15);
  assert.ok(PASSAGE_SETS.length >= 3);
});

test("level 1: one gap per sentence, three distinct options", () => {
  for (const item of GAP_ITEMS) {
    assert.equal(item.sentence.split("___").length, 2, item.sentence);
    assert.equal(new Set([item.answer, ...item.wrong]).size, 3, item.sentence);
  }
});

test("level 3: exactly one bracketed word in each sentence", () => {
  for (const sentence of WRONG_WORD_SENTENCES) {
    assert.equal(sentence.match(/\[[^\]]+\]/g)?.length, 1, sentence);
  }
});

test("level 4: the wrong word appears once, in its paragraph; quoted sentences are in the text", () => {
  for (const set of PASSAGE_SETS) {
    const passage = findReadingPassage(set.passage);
    const all = words(passageText(passage));
    assert.equal(all.filter((w) => w === set.word.wrong).length, 1, `${set.word.wrong} in ${set.passage}`);
    const para = words(passage.blocks[set.word.para].text);
    for (const option of [set.word.wrong, ...set.word.others]) assert.ok(para.includes(option), `${option} in paragraph ${set.word.para}`);
    for (const fix of [set.word.fix, ...set.word.fixWrong]) assert.ok(!para.includes(fix) || fix === set.word.fix, fix);
    assert.ok(passage.blocks[set.odd.para].text.includes(set.odd.sentence), set.odd.sentence);
    for (const sentence of set.odd.others) assert.ok(passageText(passage).includes(sentence), sentence);
    assert.equal(new Set([set.odd.sentence, ...set.odd.others]).size, 3);
  }
});

test("all text uses British spelling", () => {
  const text = [
    ...GAP_ITEMS.flatMap((item) => [item.sentence, item.answer, ...item.wrong]),
    ...WRONG_WORD_SENTENCES,
    ...PASSAGE_SETS.flatMap((set) => [set.understand.q, set.understand.answer, ...set.understand.wrong, set.word.fix, ...set.word.fixWrong]),
  ].join(" ");
  assert.deepEqual(findUsSpellings(text), []);
});

test("every level builds sound questions across 30 seeds", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    for (const level of [1, 2, 3, 4]) {
      const questions = buildDoesItMakeSenseQuestions(level, seeded(seed));
      assert.equal(questions.length, level === 4 ? 4 : 5);
      for (const q of questions) {
        assert.deepEqual(questionProblems(q), [], `level ${level}`);
        assert.deepEqual(findUsSpellings(questionText(q)), []);
      }
      if (level === 2) {
        for (const q of questions) {
          assert.equal(q.cards.filter((card) => card.bin === "sense").length, 2);
          assert.equal(q.cards.filter((card) => card.bin === "nonsense").length, 2);
        }
      }
      if (level === 4) assert.equal(new Set(questions.map((q) => q.passage.id)).size, 1, "one passage per run");
    }
  }
});
