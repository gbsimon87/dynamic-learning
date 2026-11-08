import test from "node:test";
import assert from "node:assert/strict";
import { year6MathCurriculum as curriculum } from "./year6MathCurriculum.js";
import { year6EnglishCurriculum } from "./year6EnglishCurriculum.js";
import { YEAR6_MATH_TOPIC_SKILLS } from "./year6MathCertificateSkills.js";
import { countsTowardYear, isCurriculumAvailable, loadCurriculum, yearAwardSubjectIds } from "./curriculumRegistry.js";
import { toKebabCase } from "../utils/toKebabCase.js";

const topics = curriculum.flatMap((category) => category.topics);

test("Year 6 Maths registers the approved 49-topic tree with four slots per topic", () => {
  assert.equal(isCurriculumAvailable(6, "math"), true);
  assert.equal(loadCurriculum("6", "math"), curriculum);
  assert.deepEqual(curriculum.map((category) => category.topics.length), [4, 9, 11, 4, 5, 7, 5, 2, 2]);
  assert.equal(topics.length, 49);
  assert.equal(new Set(topics.map((topic) => topic.id)).size, 49);
  for (const category of curriculum) assert.equal(category.id, toKebabCase(category.title));
  for (const topic of topics) {
    assert.equal(topic.id, toKebabCase(topic.name));
    assert.equal(topic.builder, topic.id);
    assert.deepEqual(topic.challenges, [1, 2, 3, 4].map((id) => ({ id, title: `Challenge ${id}` })));
  }
});

test("every Year 6 Maths topic has a dedicated certificate line", () => {
  assert.deepEqual(Object.keys(YEAR6_MATH_TOPIC_SKILLS).sort(), topics.map((topic) => `6/math/${topic.id}`).sort());
  for (const statement of Object.values(YEAR6_MATH_TOPIC_SKILLS)) {
    assert.match(statement, /^I /);
    assert.ok(statement.length <= 80, statement);
  }
});

test("Year 6 core award is enabled while additional subjects stay outside it", () => {
  assert.equal(countsTowardYear(6, "math"), true);
  assert.deepEqual(yearAwardSubjectIds(6), ["math", "english", "science"]);
  assert.deepEqual(yearAwardSubjectIds(5), ["math", "english", "science"]);
  assert.equal(loadCurriculum(6, "english"), year6EnglishCurriculum);
  assert.equal(loadCurriculum(7, "math"), null);
});
