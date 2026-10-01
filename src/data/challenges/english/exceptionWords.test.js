import test from "node:test";
import assert from "node:assert/strict";
import { WORD_LIST } from "../../english/appendix1.js";
import { findUsSpellings } from "../../english/textChecks.js";
import {
  READ_ITEMS,
  SOUNDS,
  WHICH_ITEMS,
  WORDS,
  buildExceptionWordsQuestions,
  trickyLetters,
} from "./exceptionWords.js";

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const year3 = new Set(WORD_LIST[3]);

test("banks hold at least 15 items", () => {
  assert.ok(WORDS.length >= 15);
  assert.ok(WHICH_ITEMS.length >= 15);
  assert.ok(READ_ITEMS.length >= 15);
});

test("every target word is on the Year 3 statutory word list", () => {
  for (const entry of WORDS) assert.ok(year3.has(entry.word), entry.word);
  for (const item of WHICH_ITEMS) assert.ok(year3.has(item.answer), item.answer);
  for (const item of READ_ITEMS) {
    assert.ok(year3.has(item.answer), item.answer);
    for (const word of item.wrong) assert.ok(year3.has(word), word);
  }
});

test("chunks spell the word, the tricky chunk is unique where it matters, and sounds exist", () => {
  for (const entry of WORDS) {
    assert.equal(entry.chunks.join(""), entry.word);
    assert.ok(entry.at >= 0 && entry.at < entry.chunks.length, entry.word);
    assert.ok(SOUNDS[entry.says], entry.says);
    for (const key of entry.wrong) assert.ok(SOUNDS[key], key);
    assert.ok(!entry.wrong.includes(entry.says), entry.word);
    assert.equal(new Set(entry.wrong).size, entry.wrong.length);
  }
});

test("a repeated chunk only appears where the question names the sound of one of them", () => {
  // circle and bicycle repeat "c": the first says "s", the second "k", so
  // tapping the letters that say "s" still has one answer.
  for (const entry of WORDS) {
    const same = entry.chunks.filter((chunk) => chunk === trickyLetters(entry)).length;
    if (same > 1) assert.equal(entry.says, "s", entry.word);
  }
});

test("level 2: the answer contains the letters; options are distinct", () => {
  for (const item of WHICH_ITEMS) {
    assert.ok(item.answer.includes(item.letters), item.answer);
    assert.ok(SOUNDS[item.sound], item.sound);
    assert.equal(new Set([item.answer, ...item.wrong]).size, 3);
  }
});

test("level 4: each sentence has one blank and options are distinct", () => {
  for (const item of READ_ITEMS) {
    assert.equal(item.sentence.split("___").length, 2, item.sentence);
    assert.equal(new Set([item.answer, ...item.wrong]).size, 3);
  }
});

test("every level builds 5 answerable questions across 30 seeds", () => {
  for (const level of [1, 2, 3, 4]) {
    for (let seed = 1; seed <= 30; seed += 1) {
      const questions = buildExceptionWordsQuestions(level, seeded(seed));
      assert.equal(questions.length, 5);
      for (const q of questions) {
        if (q.options) {
          assert.equal(q.options.filter((option) => option === q.answer).length, 1);
          assert.equal(new Set(q.options).size, q.options.length);
        } else {
          assert.equal(q.chunks[q.at], q.letters);
          if (q.chunks.length <= 2) assert.equal(q.hinted, null, q.word);
          else {
            assert.ok(q.hinted.has(q.at));
            assert.ok(q.hinted.size >= 2 && q.hinted.size < q.chunks.length, `${q.word}: the hint must narrow, not answer`);
          }
        }
      }
    }
  }
});

test("all text uses British spelling", () => {
  const text = [
    ...Object.values(SOUNDS),
    ...WHICH_ITEMS.flatMap((item) => [item.answer, ...item.wrong]),
    ...READ_ITEMS.map((item) => item.sentence),
  ].join(" ");
  assert.deepEqual(findUsSpellings(text), []);
});
