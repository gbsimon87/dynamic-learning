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
  assert.ok(PASSAGE_SETS.length >= 6);
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

test("poetry forms: rhyme answers are line-end words, sorts never repeat a snippet, each level asks something new", async () => {
  const { FORM_NAMES, formOf, SNIPPETS } = await import("./poetryForms.js");
  for (const form of Object.keys(FORM_NAMES)) assert.ok(POEMS.filter((poem) => formOf(poem) === form).length >= 3, form);
  assert.ok(SNIPPETS.rhyme.length >= 10 && SNIPPETS.free.length >= 10);
  for (let seed = 1; seed <= 20; seed++) {
    for (const q of buildPoetryFormsQuestions(1, seeded(seed))) {
      const [l, w] = q.answer.split(":").map(Number);
      assert.equal(w, q.lines[l].length - 1);
    }
    const labels = buildPoetryFormsQuestions(2, seeded(seed)).flatMap((q) => q.cards.map((card) => card.label));
    assert.equal(new Set(labels).size, labels.length);
    const l3 = buildPoetryFormsQuestions(3, seeded(seed));
    assert.equal(new Set(l3.map((q) => q.answer)).size, l3.length);
    for (const q of l3) assert.ok(POEMS.find((poem) => poem.title === q.answer).story);
    for (const q of buildPoetryFormsQuestions(4, seeded(seed))) assert.equal(q.options.length, 4);
  }
});

test("spark words: sort cards are unique across a run, tap answers are marked, images give three choices", async () => {
  const { TAP_SENTENCES, IMAGES, PHRASES } = await import("./wordsThatSparkTheImagination.js");
  assert.ok(TAP_SENTENCES.length >= 10 && IMAGES.length >= 10);
  for (const sense of Object.keys(PHRASES)) assert.ok(PHRASES[sense].length >= 10, sense);
  for (const item of ITEMS) assert.equal(new Set([item.answer, ...item.wrong]).size, 3, item.sentence);
  for (let seed = 1; seed <= 20; seed++) {
    const labels = buildSparkWordsQuestions(2, seeded(seed)).flatMap((q) => q.cards.map((card) => card.label));
    assert.equal(new Set(labels).size, labels.length);
    for (const q of buildSparkWordsQuestions(3, seeded(seed))) assert.ok(q.answer >= 0);
    for (const q of buildSparkWordsQuestions(4, seeded(seed))) assert.equal(q.options.length, 3);
  }
});
