import test from "node:test";
import assert from "node:assert/strict";
import { buildKindsOfWritingQuestions, EXTRACTS, FEATURE_TEXTS, PASSAGE_SETS } from "./kindsOfWriting.js";
import { buildPoetryFormsQuestions, POEMS, RHYMES } from "./poetryForms.js";
import { buildSparkWordsQuestions, ITEMS } from "./wordsThatSparkTheImagination.js";
import { questionProblems, questionText } from "./readingKit.js";
import { findUsSpellings, passageText, wordCount } from "../../english/textChecks.js";

const seeded = (initial) => { let seed = initial; return () => { seed = seed * 16807 % 2147483647; return (seed - 1) / 2147483646; }; };
test("completed Year 3 reading banks have enough original material", () => {
  assert.ok(EXTRACTS.length >= 15);
  assert.ok(FEATURE_TEXTS.reduce((n, row) => n + Object.keys(row.asks).length, 0) >= 15);
  assert.ok(PASSAGE_SETS.length >= 3);
  assert.ok(POEMS.length >= 15);
  assert.ok(RHYMES.length >= 15);
  assert.ok(ITEMS.length >= 15);
});
test("all completed reading levels stay answerable across seeded and constant randomness", () => {
  for (const build of [buildKindsOfWritingQuestions, buildPoetryFormsQuestions, buildSparkWordsQuestions]) {
    for (let seed = 1; seed <= 30; seed++) for (const level of [1, 2, 3, 4]) {
      for (const rng of [seeded(seed), () => 0, () => 0.999]) {
        const questions = build(level, rng);
        assert.ok(questions.length >= 3 && questions.length <= 5);
        for (const q of questions) {
          assert.deepEqual(questionProblems(q), []);
          assert.deepEqual(findUsSpellings(questionText(q)), []);
          if (q.passage) {
            assert.ok(wordCount(passageText(q.passage)) <= 200);
            assert.deepEqual(findUsSpellings(passageText(q.passage)), []);
          }
        }
      }
    }
  }
});
