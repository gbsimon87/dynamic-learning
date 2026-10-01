import test from "node:test";
import assert from "node:assert/strict";
import { findReadingPassage } from "../../english/passagesReading.js";
import { findUsSpellings } from "../../english/textChecks.js";
import { questionProblems, questionText } from "./readingKit.js";
import {
  ANSWERABLE_TEXTS,
  CHUNKED_SENTENCES,
  INFO_ITEMS,
  PASSAGE_SETS,
  QUESTION_WORDS,
  buildAskingQuestionsQuestions,
} from "./askingQuestionsAboutAText.js";

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const QUESTIONS_PER_RUN = 5;

test("banks hold at least 15 items, and three passages", () => {
  assert.ok(INFO_ITEMS.length >= 15);
  assert.ok(ANSWERABLE_TEXTS.length >= 15);
  assert.ok(CHUNKED_SENTENCES.reduce((sum, item) => sum + item.asks.length, 0) >= 15);
  assert.ok(CHUNKED_SENTENCES.length >= QUESTIONS_PER_RUN);
  assert.ok(PASSAGE_SETS.length >= 3);
});

test("level 1: options are question words, three distinct, and every word is an answer somewhere", () => {
  for (const item of INFO_ITEMS) {
    for (const word of [item.answer, ...item.wrong]) assert.ok(QUESTION_WORDS.includes(word), word);
    assert.equal(new Set([item.answer, ...item.wrong]).size, 3, item.info);
  }
  for (const word of QUESTION_WORDS) assert.ok(INFO_ITEMS.some((item) => item.answer === word), word);
});

test("level 2: two answered and two unanswered questions per text, all distinct", () => {
  for (const item of ANSWERABLE_TEXTS) {
    assert.equal(item.yes.length, 2, item.text);
    assert.equal(item.no.length, 2, item.text);
    assert.equal(new Set([...item.yes, ...item.no]).size, 4, item.text);
    for (const q of [...item.yes, ...item.no]) assert.match(q, /\?$/, q);
  }
});

test("level 3: each asked chunk exists, and no two questions in a sentence share a chunk", () => {
  for (const item of CHUNKED_SENTENCES) {
    const chunks = item.asks.map(([, index]) => index);
    for (const index of chunks) assert.ok(index >= 0 && index < item.chunks.length, item.chunks.join(" "));
    assert.equal(new Set(chunks).size, chunks.length, item.chunks.join(" "));
    for (const [q] of item.asks) assert.ok(QUESTION_WORDS.includes(q.split(" ")[0]), q);
  }
});

test("level 4: options are distinct, paragraphs exist", () => {
  for (const set of PASSAGE_SETS) {
    const passage = findReadingPassage(set.passage);
    for (const item of set.questions) {
      assert.equal(new Set([item.answer, ...item.wrong]).size, 3, item.q);
      assert.ok(item.para >= 0 && item.para < passage.blocks.length);
    }
  }
});

test("all text uses British spelling", () => {
  const text = [
    ...INFO_ITEMS.map((item) => item.info),
    ...ANSWERABLE_TEXTS.flatMap((item) => [item.text, ...item.yes, ...item.no]),
    ...CHUNKED_SENTENCES.flatMap((item) => [...item.chunks, ...item.asks.map(([q]) => q)]),
    ...PASSAGE_SETS.flatMap((set) => set.questions.flatMap((item) => [item.q, item.answer, ...item.wrong])),
  ].join(" ");
  assert.deepEqual(findUsSpellings(text), []);
});

test("every level builds sound questions across 30 seeds", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    for (const level of [1, 2, 3, 4]) {
      const questions = buildAskingQuestionsQuestions(level, seeded(seed));
      assert.equal(questions.length, level === 4 ? 4 : 5);
      for (const q of questions) {
        assert.deepEqual(questionProblems(q), [], `level ${level}`);
        assert.deepEqual(findUsSpellings(questionText(q)), []);
      }
    }
  }
});
