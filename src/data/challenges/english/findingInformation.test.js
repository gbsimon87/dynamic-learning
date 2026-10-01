import test from "node:test";
import assert from "node:assert/strict";
import { findReadingPassage } from "../../english/passagesReading.js";
import { findUsSpellings } from "../../english/textChecks.js";
import { isOrderCorrect, questionProblems, questionText } from "./readingKit.js";
import {
  CONTENTS_BOOKS,
  FACT_FILES,
  INDEX_BOOKS,
  INDEX_WORDS,
  buildFindingInformationQuestions,
} from "./findingInformation.js";

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const questionCount = (books) => books.reduce((sum, book) => sum + book.questions.length, 0);

test("banks hold at least 15 items, and three fact files", () => {
  assert.ok(questionCount(CONTENTS_BOOKS) >= 15);
  assert.ok(questionCount(INDEX_BOOKS) >= 15);
  assert.ok(INDEX_WORDS.reduce((sum, book) => sum + book.words.length, 0) >= 15);
  assert.ok(FACT_FILES.length >= 3);
});

test("contents pages run in page order; indexes run A to Z", () => {
  for (const book of CONTENTS_BOOKS) {
    const pages = book.rows.map((row) => row.page);
    assert.deepEqual(pages, [...pages].sort((a, b) => a - b), book.title);
  }
  for (const book of INDEX_BOOKS) {
    const labels = book.rows.map((row) => row.label);
    assert.deepEqual(labels, [...labels].sort((a, b) => a.localeCompare(b, "en")), book.title);
  }
});

test("every question points at one row, and pages are unique in a book", () => {
  for (const book of [...CONTENTS_BOOKS, ...INDEX_BOOKS]) {
    const pages = book.rows.map((row) => row.page);
    assert.equal(new Set(pages).size, pages.length, book.title);
    assert.ok(book.rows.length >= 3, book.title);
    for (const item of book.questions) assert.ok(pages.includes(item.page), `${book.title}: ${item.about}`);
    // Each row is asked about at most once, so no two questions share an answer.
    assert.equal(new Set(book.questions.map((item) => item.page)).size, book.questions.length, book.title);
  }
});

test("index words are distinct, lower case, and at least five a book", () => {
  for (const book of INDEX_WORDS) {
    assert.ok(book.words.length >= 5, book.title);
    assert.equal(new Set(book.words).size, book.words.length, book.title);
    for (const word of book.words) assert.equal(word, word.toLowerCase());
  }
});

test("fact-file answers are in the paragraph the hint points at", () => {
  for (const set of FACT_FILES) {
    const passage = findReadingPassage(set.passage);
    for (const fact of set.facts) {
      assert.equal(passage.blocks[fact.para].type, "p", fact.field);
      const text = passage.blocks[fact.para].text.toLowerCase();
      const key = fact.answer.replace(/^(a|about|around|to) /, "").toLowerCase();
      assert.ok(text.includes(key), `${fact.field}: “${key}”`);
      for (const wrong of fact.wrong) assert.ok(!text.includes(wrong.toLowerCase()), wrong);
      assert.equal(new Set([fact.answer, ...fact.wrong]).size, 3);
    }
    assert.ok(passage.blocks.some((block) => block.type === "h"), `${set.passage} has headings`);
  }
});

test("all text uses British spelling", () => {
  const text = [
    ...[...CONTENTS_BOOKS, ...INDEX_BOOKS].flatMap((book) => [book.title, ...book.rows.map((row) => row.label), ...book.questions.map((item) => item.about)]),
    ...INDEX_WORDS.flatMap((book) => [book.title, ...book.words]),
    ...FACT_FILES.flatMap((set) => set.facts.flatMap((fact) => [fact.field, fact.answer, ...fact.wrong])),
  ].join(" ");
  assert.deepEqual(findUsSpellings(text), []);
});

test("every level builds sound questions across 30 seeds", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    for (const level of [1, 2, 3, 4]) {
      const questions = buildFindingInformationQuestions(level, seeded(seed));
      assert.equal(questions.length, level === 4 ? 4 : 5);
      for (const q of questions) {
        assert.deepEqual(questionProblems(q), [], `level ${level}`);
        assert.deepEqual(findUsSpellings(questionText(q)), []);
      }
      if (level === 3) {
        for (const q of questions) {
          const sorted = [...q.items].sort((a, b) => a.label.localeCompare(b.label, "en"));
          assert.ok(isOrderCorrect(q, sorted));
          assert.ok(!isOrderCorrect(q, q.items), "starts out of order");
        }
      }
    }
  }
});
