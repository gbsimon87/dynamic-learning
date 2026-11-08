import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { year6GeographyCurriculum as curriculum } from "./year6GeographyCurriculum.js";
import { YEAR6_GEOGRAPHY_TOPIC_SKILLS } from "./year6GeographyCertificateSkills.js";
import { countsTowardYear, loadCurriculum, yearAwardSubjectIds } from "./curriculumRegistry.js";
import { TOPIC_SKILLS } from "./certificateSkills.js";
import { GEOGRAPHY_TITLES, lintGeographyTopic } from "./challenges/geography/engine.js";
import { YEAR6_GEOGRAPHY_BUILDERS as builders, YEAR6_GEOGRAPHY_SOURCES as sources, YEAR6_GEOGRAPHY_TOPICS as topicData } from "./challenges/geography/year6/index.js";
import { isCorrect, isReady, lintBuild, seededRng } from "./challenges/questionKinds.js";

const topics = curriculum.flatMap((category) => category.topics);
const pascal = (id) => id.split("-").map((word) => word[0].toUpperCase() + word.slice(1)).join("");

test("Year 6 Geography: four categories, 16 topics, four challenges and certificate lines", () => {
  assert.equal(topics.length, 16);
  assert.equal(loadCurriculum("6", "geography"), curriculum);
  assert.deepEqual(Object.keys(YEAR6_GEOGRAPHY_TOPIC_SKILLS).sort(), topics.map((topic) => `6/geography/${topic.id}`).sort());
  assert.deepEqual(Object.keys(topicData).sort(), topics.map((topic) => topic.id).sort());
  for (const topic of topics) {
    assert.deepEqual(topic.challenges.map((challenge) => challenge.id), [1, 2, 3, 4]);
    assert.ok(TOPIC_SKILLS[`6/geography/${topic.id}`]?.startsWith("I can"), topic.id);
    for (const level of [1, 2, 3, 4]) {
      const path = new URL(`../pages/skills/geography/challenges/year6/${topic.id}/${pascal(topic.id)}Challenge${level}.jsx`, import.meta.url);
      assert.ok(existsSync(path), path.pathname);
      const wrapper = readFileSync(path, "utf8");
      assert.ok(wrapper.includes(`topicId={"${topic.id}"}`) && wrapper.includes(`level={${level}}`) && wrapper.includes("onComplete={onComplete}"), path.pathname);
    }
  }
});

test("Year 6 Geography: each mapped topic has a sourced, answerable five-round bank", () => {
  const mapping = readFileSync(new URL("../../docs/curriculum/key-stage-2-geography.md", import.meta.url), "utf8");
  for (const [id, topic] of Object.entries(topicData)) {
    assert.equal(topic.year, 6, id);
    assert.deepEqual(lintGeographyTopic(topic, sources, {}), [], id);
    assert.deepEqual(lintBuild((level, rng) => builders[id](level, rng).questions, { titles: GEOGRAPHY_TITLES, year: 6, seeds: 20, minQuestions: 5 }), [], id);
    assert.ok(mapping.includes(`\`${id}\``), id);
    for (let level = 1; level <= 4; level++) for (let seed = 1; seed <= 20; seed++) {
      const run = builders[id](level, seededRng(seed)).questions;
      assert.equal(run.length, 5, `${id}/${level}`);
      assert.equal(new Set(run.map((question) => question.prompt)).size, 5, `${id}/${level}: duplicate prompt`);
      for (const question of run) {
        assert.ok(isReady(question, question.answer), `${id}: ready`);
        assert.ok(isCorrect(question, question.answer), `${id}: correct`);
        for (const wrong of question.options.filter((option) => option !== question.answer)) assert.equal(isCorrect(question, wrong), false, `${id}: wrong answer accepted`);
      }
    }
  }
});

test("Year 6 Geography stays outside the Year 6 overall award", () => {
  assert.equal(countsTowardYear(6, "geography"), false);
  assert.deepEqual(yearAwardSubjectIds(6), ["math", "english", "science"]);
});
