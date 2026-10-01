import test from "node:test";
import assert from "node:assert/strict";
import { findUsSpellings, wordCount } from "../../english/textChecks.js";
import { INTRUDERS, TEXTS, buildHeadingQuestions, intrudersFor, isMatchCorrect } from "./headingsAndSubHeadings.js";

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

test("ten texts, each with a title and four sections with different sub-headings", () => {
  assert.ok(TEXTS.length >= 10);
  for (const text of TEXTS) {
    assert.equal(text.sections.length, 4, text.title);
    assert.equal(new Set(text.sections.map((section) => section.heading)).size, 4, text.title);
    for (const section of text.sections) assert.match(section.text, /^[A-Z].*[.!?]$/, section.text);
  }
});

test("no sub-heading is used in two texts, and none repeats a title", () => {
  const headings = TEXTS.flatMap((text) => text.sections.map((section) => section.heading));
  assert.equal(new Set(headings).size, headings.length);
  for (const text of TEXTS) assert.ok(!headings.includes(text.title), text.title);
});

test("intruders are real sub-headings of the text they come from, and every text has some", () => {
  for (const item of INTRUDERS) {
    const text = TEXTS.find((candidate) => candidate.title === item.from);
    assert.ok(text?.sections.some((section) => section.heading === item.heading), item.heading);
  }
  for (const text of TEXTS) assert.ok(intrudersFor(text.title).length >= 5, text.title);
});

test("a whole text stays short (60–200 words with its headings is the passage limit)", () => {
  for (const text of TEXTS) {
    const words = wordCount([text.title, ...text.sections.flatMap((section) => [section.heading, section.text])].join(" "));
    assert.ok(words <= 200, `${text.title}: ${words}`);
  }
});

test("all text uses British spelling", () => {
  const text = TEXTS.flatMap((item) => [item.title, ...item.sections.flatMap((section) => [section.heading, section.text])]).join(" ");
  assert.deepEqual(findUsSpellings(text), []);
});

test("every level builds answerable questions", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    const rng = seeded(seed);
    for (const q of buildHeadingQuestions(1, rng)) {
      assert.equal(new Set(q.options).size, 3);
      assert.equal(q.options.filter((option) => option === q.answer).length, 1);
      assert.notEqual(q.struck, q.answer);
    }
    for (const q of buildHeadingQuestions(2, rng)) {
      assert.equal(q.cards.length, 3);
      assert.equal(q.bins.length, 3);
      assert.equal(q.passage.blocks.length, 3);
      const right = Object.fromEntries(q.cards.map((card) => [card.id, card.bin]));
      assert.ok(isMatchCorrect(q, right));
      assert.equal(isMatchCorrect(q, {}), false);
    }
    for (const q of buildHeadingQuestions(3, rng)) {
      const text = TEXTS.find((item) => item.title === q.title);
      const own = text.sections.map((section) => section.heading);
      // Exactly one heading is foreign to this text.
      const foreign = q.sections.map((section, index) => (own.includes(section.heading) ? -1 : index)).filter((index) => index >= 0);
      assert.deepEqual(foreign, [q.answer]);
    }
    const restore = buildHeadingQuestions(4, rng);
    assert.equal(restore.length, 4);
    for (const q of restore) {
      assert.equal(q.options.length, 4);
      assert.equal(q.options.filter((option) => option === q.answer).length, 1);
      assert.equal(q.sections[q.step].heading, q.answer);
    }
  }
});
