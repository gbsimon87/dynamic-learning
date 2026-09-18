import test from "node:test";
import assert from "node:assert/strict";
import { year3MathCurriculum } from "./year3MathCurriculum.js";
import { year2MathCurriculum } from "./year2MathCurriculum.js";
import { toKebabCase } from "../utils/toKebabCase.js";

const topics = year3MathCurriculum.flatMap((category) => category.topics);

test("covers the seven Year 3 programme-of-study categories", () => {
  assert.deepEqual(
    year3MathCurriculum.map((category) => category.title),
    [
      "Number - Number and Place Value",
      "Number - Addition and Subtraction",
      "Number - Multiplication and Division",
      "Number - Fractions",
      "Measurement",
      "Geometry – Properties of Shapes",
      "Statistics",
    ]
  );
});

// Year 2 has a Position and Direction category; the Year 3 programme of study
// does not. Seven categories is correct, not an omission.
test("has no Position and Direction category", () => {
  assert.equal(
    year3MathCurriculum.some((c) => /position and direction/i.test(c.title)),
    false
  );
});

test("every category has at least one topic", () => {
  for (const category of year3MathCurriculum) {
    assert.ok(
      category.topics.length > 0,
      `${category.title} has no topics — it would badge as empty, never complete`
    );
  }
});

// Topic ids become directory names under challenges/year3/, so a collision is
// silent breakage: two topics would share one set of challenge files.
test("topic ids are unique across the whole year", () => {
  const ids = topics.map((topic) => topic.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("category ids are unique", () => {
  const ids = year3MathCurriculum.map((category) => category.id);
  assert.equal(new Set(ids).size, ids.length);
});

// Punctuation is stripped when kebab-casing, so a title of only symbols would
// collapse to "" and produce an unroutable id.
test("no id is empty", () => {
  for (const category of year3MathCurriculum) {
    assert.notEqual(category.id, "", `empty id for ${category.title}`);
    for (const topic of category.topics) {
      assert.notEqual(topic.id, "", `empty id for ${topic.name}`);
    }
  }
});

test("ids are derived from titles, not hand-written", () => {
  for (const category of year3MathCurriculum) {
    assert.equal(category.id, toKebabCase(category.title));
    for (const topic of category.topics) {
      assert.equal(topic.id, toKebabCase(topic.name));
    }
  }
});

// The challenge loader builds a filename per id, and topic completion counts
// these — a topic with a different number would break both.
test("every topic has exactly four challenges numbered 1 to 4", () => {
  for (const topic of topics) {
    assert.deepEqual(
      topic.challenges.map((challenge) => challenge.id),
      [1, 2, 3, 4],
      `${topic.name} has the wrong challenge ids`
    );
    for (const challenge of topic.challenges) {
      assert.equal(challenge.title, `Challenge ${challenge.id}`);
    }
  }
});

test("challenge arrays are not shared between topics", () => {
  const seen = new Set();
  for (const topic of topics) {
    assert.equal(seen.has(topic.challenges), false, `${topic.name} shares its array`);
    seen.add(topic.challenges);
  }
});

// A shared object between years would let a Year 3 edit reach into Year 2.
test("shares no object with the Year 2 curriculum", () => {
  const year2Topics = new Set(
    year2MathCurriculum.flatMap((category) => category.topics)
  );
  const year2Categories = new Set(year2MathCurriculum);

  for (const category of year3MathCurriculum) {
    assert.equal(year2Categories.has(category), false);
    for (const topic of category.topics) {
      assert.equal(year2Topics.has(topic), false);
    }
  }
});

test("matches the size the layout was designed to", () => {
  assert.equal(year3MathCurriculum.length, 7);
  assert.equal(topics.length, 44);
  assert.equal(topics.length * 4, 176);
});
