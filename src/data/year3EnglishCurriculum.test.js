import test from "node:test";
import assert from "node:assert/strict";
import { year3EnglishCurriculum } from "./year3EnglishCurriculum.js";
import { year3MathCurriculum } from "./year3MathCurriculum.js";
import { toKebabCase } from "../utils/toKebabCase.js";

const topics = year3EnglishCurriculum.flatMap((category) => category.topics);

test("has the eight approved categories, alternating strands", () => {
  assert.deepEqual(
    year3EnglishCurriculum.map((category) => category.title),
    [
      "Spelling - Prefixes and Suffixes",
      "Reading - Words and Meanings",
      "Grammar - Words",
      "Reading - Stories",
      "Spelling - Sounds and Homophones",
      "Grammar - Sentences",
      "Reading - Non-Fiction and Poetry",
      "Writing - Composition",
    ]
  );
});

test("every category has at least one topic", () => {
  for (const category of year3EnglishCurriculum) {
    assert.ok(category.topics.length > 0, `${category.title} has no topics`);
  }
});

// Topic ids become directory names under english/challenges/year3/, so a
// collision would make two topics share one set of challenge files.
test("topic and category ids are unique", () => {
  const topicIds = topics.map((topic) => topic.id);
  assert.equal(new Set(topicIds).size, topicIds.length);
  const categoryIds = year3EnglishCurriculum.map((category) => category.id);
  assert.equal(new Set(categoryIds).size, categoryIds.length);
});

test("ids are derived from titles and read cleanly", () => {
  for (const category of year3EnglishCurriculum) {
    assert.equal(category.id, toKebabCase(category.title));
    for (const topic of category.topics) {
      assert.equal(topic.id, toKebabCase(topic.name));
      // A hyphen or apostrophe in a title leaves a doubled or trailing dash
      // in a permanent id. Category ids keep their " - " by convention.
      assert.match(topic.id, /^[a-z0-9]+(-[a-z0-9]+)*$/, topic.name);
    }
  }
});

test("every topic has exactly four challenges numbered 1 to 4", () => {
  for (const topic of topics) {
    assert.deepEqual(topic.challenges.map((challenge) => challenge.id), [1, 2, 3, 4]);
    for (const challenge of topic.challenges) {
      assert.equal(challenge.title, `Challenge ${challenge.id}`);
    }
  }
});

test("challenge arrays are not shared between topics", () => {
  assert.equal(new Set(topics.map((topic) => topic.challenges)).size, topics.length);
});

test("shares no topic id with Year 3 Maths", () => {
  const maths = new Set(year3MathCurriculum.flatMap((c) => c.topics.map((t) => t.id)));
  for (const topic of topics) assert.equal(maths.has(topic.id), false, topic.id);
});

test("matches the approved size", () => {
  assert.equal(year3EnglishCurriculum.length, 8);
  assert.equal(topics.length, 32);
});
