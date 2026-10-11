import test from "node:test";
import assert from "node:assert/strict";
import { year1EnglishCurriculum } from "./year1EnglishCurriculum.js";
import { toKebabCase } from "../utils/toKebabCase.js";

const topics = year1EnglishCurriculum.flatMap((category) => category.topics);

test("has the eight approved categories, alternating strands", () => {
  assert.deepEqual(
    year1EnglishCurriculum.map((category) => category.title),
    [
      "Spelling - Letters and Sounds",
      "Reading - Phonics",
      "Grammar - Words",
      "Reading - Stories",
      "Spelling - Vowel Sounds",
      "Grammar - Sentences",
      "Reading - Poems and Facts",
      "Writing - Composition",
    ]
  );
});

// Topic ids become directory names under english/challenges/year1/, so a
// collision would make two topics share one set of challenge files.
test("topic and category ids are unique", () => {
  const topicIds = topics.map((topic) => topic.id);
  assert.equal(new Set(topicIds).size, topicIds.length);
  const categoryIds = year1EnglishCurriculum.map((category) => category.id);
  assert.equal(new Set(categoryIds).size, categoryIds.length);
});

test("ids are derived from titles and read cleanly", () => {
  for (const category of year1EnglishCurriculum) {
    assert.equal(category.id, toKebabCase(category.title));
    for (const topic of category.topics) {
      assert.equal(topic.id, toKebabCase(topic.name));
      assert.match(topic.id, /^[a-z0-9]+(-[a-z0-9]+)*$/, topic.name);
    }
  }
});

test("every topic has exactly four challenges numbered 1 to 4", () => {
  for (const topic of topics) {
    assert.deepEqual(topic.challenges.map((challenge) => challenge.id), [1, 2, 3, 4]);
  }
  assert.equal(new Set(topics.map((topic) => topic.challenges)).size, topics.length);
});

test("matches the approved size", () => {
  assert.equal(year1EnglishCurriculum.length, 8);
  assert.equal(topics.length, 38);
});

test("Year 1 English is registered and opens its existing progression path", async () => {
  const { loadCurriculum, isCurriculumAvailable } = await import("./curriculumRegistry.js");
  const { buildLockState } = await import("./curriculumLocks.js");
  const { completeChallenge } = await import("./progressRules.js");
  assert.equal(loadCurriculum("1", "english"), year1EnglishCurriculum);
  assert.equal(isCurriculumAvailable(1, "english"), true);
  const locks = (progress) => buildLockState({ curriculum: year1EnglishCurriculum, progress, isBuilt: () => true });
  const fresh = locks({});
  assert.deepEqual(fresh.map((c) => c.locked), [false, true, true, true, true, true, true, true]);
  assert.deepEqual(fresh[0].topics[0].challenges.map((c) => c.locked), [false, true, true, true]);
  let progress = {};
  const [category] = year1EnglishCurriculum;
  for (const topic of category.topics) for (const challenge of topic.challenges) {
    progress = completeChallenge(progress, category.id, topic.id, challenge.id);
  }
  const restored = JSON.parse(JSON.stringify(progress));
  assert.equal(locks(restored)[0].complete, true);
  assert.equal(locks(restored)[1].locked, false);
  assert.equal(locks(restored)[0].topics[0].challenges[0].locked, false);
  assert.deepEqual(completeChallenge(restored, category.id, category.topics[0].id, 1), restored);
});
