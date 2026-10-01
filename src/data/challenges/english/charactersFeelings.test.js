import test from "node:test";
import assert from "node:assert/strict";
import { CAST_NAMES } from "../../english/cast.js";
import { findPassage } from "../../english/passages.js";
import { findUsSpellings, passageText } from "../../english/textChecks.js";
import {
  ACTION_ITEMS,
  EVIDENCE_ITEMS,
  FEELINGS,
  FEELING_TEXTS,
  PASSAGE_SETS,
  buildFeelingsQuestions,
} from "./charactersFeelings.js";

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

test("banks hold at least 15 items (three times a run), and three passages", () => {
  assert.ok(FEELING_TEXTS.length >= 15);
  assert.ok(ACTION_ITEMS.length >= 15);
  assert.ok(EVIDENCE_ITEMS.length >= 15);
  assert.ok(PASSAGE_SETS.length >= 3);
});

test("every feeling used has an emoji, and right and wrong never coincide", () => {
  for (const item of FEELING_TEXTS) {
    for (const feeling of [item.answer, ...item.wrong]) assert.ok(FEELINGS[feeling], feeling);
    assert.equal(new Set([item.answer, ...item.wrong]).size, 3, item.text);
  }
  for (const item of ACTION_ITEMS) {
    assert.ok(FEELINGS[item.feeling], item.feeling);
    assert.equal(new Set([item.right, ...item.wrong]).size, 3);
  }
});

test("texts are about the cast, two or three sentences long", () => {
  for (const item of FEELING_TEXTS) {
    assert.ok(CAST_NAMES.some((name) => item.text.includes(name)), item.text);
    const sentences = item.text.match(/[.!?]["”]?(\s|$)/g)?.length ?? 0;
    assert.ok(sentences >= 2 && sentences <= 3, `${sentences}: ${item.text}`);
  }
});

test("level 3 evidence is a real sentence, about the character, and not always in the same place", () => {
  for (const item of EVIDENCE_ITEMS) {
    assert.ok(item.answer >= 0 && item.answer < item.sentences.length);
    assert.ok(CAST_NAMES.includes(item.who));
  }
  const positions = new Set(EVIDENCE_ITEMS.map((item) => item.answer));
  assert.ok(positions.size >= 3, [...positions].join());
});

test("passage questions quoting the text quote it exactly, and point at the right paragraph", () => {
  for (const set of PASSAGE_SETS) {
    const passage = findPassage(set.passage);
    for (const item of set.questions) {
      assert.ok(item.para >= 0 && item.para < passage.blocks.length);
      assert.equal(new Set([item.answer, ...item.wrong]).size, 3, item.q);
      if (/^Which words/.test(item.q)) {
        const all = passageText(passage).toLowerCase().replace(/’/g, "'");
        for (const option of [item.answer, ...item.wrong]) {
          assert.ok(all.includes(option.toLowerCase().replace(/’/g, "'")), `"${option}" is not in ${set.passage}`);
        }
        const para = passage.blocks[item.para].text.toLowerCase().replace(/’/g, "'");
        assert.ok(para.includes(item.answer.toLowerCase().replace(/’/g, "'")), `${item.answer} not in paragraph ${item.para}`);
      }
    }
  }
});

test("all text uses British spelling", () => {
  const text = [
    ...FEELING_TEXTS.map((item) => item.text),
    ...ACTION_ITEMS.flatMap((item) => [item.right, ...item.wrong]),
    ...EVIDENCE_ITEMS.flatMap((item) => item.sentences),
    ...PASSAGE_SETS.flatMap((set) => set.questions.flatMap((item) => [item.q, item.answer, ...item.wrong])),
  ].join(" ");
  assert.deepEqual(findUsSpellings(text), []);
});

test("every level builds answerable questions", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    for (const level of [1, 2]) {
      const questions = buildFeelingsQuestions(level, seeded(seed));
      assert.equal(questions.length, 5);
      for (const q of questions) assert.equal(q.options.filter((option) => option === q.answer).length, 1);
    }
    assert.equal(buildFeelingsQuestions(3, seeded(seed)).length, 5);
    const passageRun = buildFeelingsQuestions(4, seeded(seed));
    assert.equal(passageRun.length, 4);
    assert.equal(new Set(passageRun.map((q) => q.passage.id)).size, 1, "one passage per run");
    for (const q of passageRun) assert.equal(q.options.filter((option) => option === q.answer).length, 1);
  }
});
