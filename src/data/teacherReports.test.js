import test from "node:test";
import assert from "node:assert/strict";
import { BEHAVIOURS, TARGETS, buildReport, countReport, fill, subjectPhrase, topicPhrase } from "./teacherReports.js";

const maths = { name: "Maths", band: "expected", strengths: ["Column Addition", "The 8 Times Table"], nextStep: "Column Subtraction" };

test("topic titles read naturally mid-sentence and keep proper nouns", () => {
  assert.equal(topicPhrase("Column Addition"), "column addition");
  assert.equal(topicPhrase("The 8 Times Table"), "the 8 times table");
  assert.equal(topicPhrase("Claudius Conquers Britain"), "Claudius conquers Britain");
  assert.equal(topicPhrase("Stonehenge and the Bronze Age"), "Stonehenge and the Bronze Age");
  assert.equal(topicPhrase("Roman Numerals and 24-Hour Clocks"), "Roman numerals and 24-hour clocks");
  assert.equal(topicPhrase("Anglo-Saxon Village Life"), "Anglo-Saxon village life");
  assert.equal(topicPhrase("Remembrance Day"), "Remembrance Day");
  assert.equal(topicPhrase("Contours, Scale and OS Maps"), "contours, scale and OS maps");
  assert.equal(subjectPhrase("Art & Design"), "Art and Design");
});

test("pronouns agree in every template, for every pronoun", () => {
  const all = [...BEHAVIOURS, ...TARGETS].flatMap((item) => item.lines);
  for (const pronoun of ["they", "she", "he"]) for (const line of all) {
    const text = fill(line, { name: "Sam", pronoun });
    assert.doesNotMatch(text, /\{\w+\}/, line);
    assert.doesNotMatch(text, /\b(they is|she are|he are|they has|she have|he have)\b/i, text);
  }
  assert.equal(fill("{They} {are} ready and {have} {their} book.", { name: "", pronoun: "she" }), "She is ready and has her book.");
});

test("builds an opening, one paragraph per reported subject and a closing", () => {
  const text = buildReport({ name: "Sam", pronoun: "he", year: 3, subjects: [maths, { name: "Science", band: "none" }, { name: "English", band: "greater", strengths: [] }], behaviours: ["effort", "kindness"], target: "reading" });
  const paragraphs = text.split("\n\n");
  assert.equal(paragraphs.length, 4);
  assert.match(paragraphs[0], /Year 3/);
  assert.match(paragraphs[1], /expected standard in Maths|In Maths, Sam is working at the expected standard/);
  assert.match(paragraphs[1], /column addition and the 8 times table/);
  assert.match(paragraphs[1], /column subtraction/);
  assert.match(paragraphs[2], /greater depth/);
  assert.doesNotMatch(text, /Science/);
  assert.match(paragraphs[3], /[Rr]eading at home/);
  assert.doesNotMatch(text, /\{|\}|undefined|null/);
});

test("a missing name stays as an obvious placeholder", () => {
  const text = buildReport({ year: 2, subjects: [maths] });
  assert.match(text, /\[Name\]/);
  assert.doesNotMatch(text, /\bundefined\b/);
});

test("rewording changes the wording but keeps the judgements", () => {
  const base = { name: "Ava", pronoun: "she", year: 4, subjects: [maths], behaviours: ["curiosity"], target: "spelling" };
  const first = buildReport({ ...base, variant: 0 });
  const second = buildReport({ ...base, variant: 1 });
  assert.notEqual(first, second);
  for (const text of [first, second]) assert.match(text, /expected standard/);
  assert.equal(buildReport({ ...base, variant: 0 }), first, "deterministic");
});

test("counts characters and words for school length limits", () => {
  assert.deepEqual(countReport("Sam works hard.\n\nWell done!"), { characters: 27, words: 5 });
  assert.deepEqual(countReport("   "), { characters: 3, words: 0 });
});
