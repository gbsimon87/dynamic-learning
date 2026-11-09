import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { year6FrenchCurriculum as curriculum } from "./year6FrenchCurriculum.js";
import { YEAR6_FRENCH_TOPIC_SKILLS } from "./year6FrenchCertificateSkills.js";
import { YEAR6_FRENCH_BUILDERS, YEAR6_FRENCH_TITLES, YEAR6_FRENCH_TOPICS, YEAR6_FRENCH_FIGURE_RULES } from "./challenges/year6French/index.js";
import { VISUAL_TYPES } from "./challenges/year5French/visualTypes.js";
import { checkFigures } from "./challenges/figures.js";
import { lintBuild } from "./challenges/questionKinds.js";
import { loadCurriculum, isCurriculumAvailable, findCurriculum } from "./curriculumRegistry.js";

const topics = curriculum.flatMap((category) => category.topics);
const pascal = (id) => id.split("-").map((word) => word[0].toUpperCase() + word.slice(1)).join("");
const doc = fs.readFileSync(new URL("../../docs/curriculum/key-stage-2-languages.md", import.meta.url), "utf8");
const mapping = doc.slice(doc.indexOf("## Year 6 topics mapped to statutory requirements"));

test("Year 6 French is registered outside the Year 6 award", () => {
  assert.equal(isCurriculumAvailable(6, "french"), true);
  assert.equal(loadCurriculum("6", "french"), curriculum);
  assert.equal(findCurriculum(6, "french").countsTowardYear, false);
});

test("Year 6 French has a certificate line, four files and a mapping row per topic", () => {
  assert.equal(topics.length, 17);
  assert.equal(new Set(topics.map((t) => t.id)).size, topics.length);
  assert.deepEqual(Object.keys(YEAR6_FRENCH_TOPIC_SKILLS).sort(), topics.map((t) => `6/french/${t.id}`).sort());
  for (const topic of topics) {
    assert.deepEqual(topic.challenges.map((c) => c.id), [1, 2, 3, 4]);
    const line = YEAR6_FRENCH_TOPIC_SKILLS[`6/french/${topic.id}`];
    assert.ok(line.startsWith("I can") && line.length <= 80, `${topic.id} certificate line`);
    assert.ok(mapping.includes(`\`${topic.id}\``), `${topic.id} is missing from the statutory mapping table`);
    for (const slot of topic.challenges) {
      const text = fs.readFileSync(new URL(`../pages/skills/french/challenges/year6/${topic.id}/${pascal(topic.id)}Challenge${slot.id}.jsx`, import.meta.url), "utf8");
      assert.ok(text.includes("export default") && text.includes(`level={${slot.id}}`) && text.includes("onComplete={onComplete}"));
    }
  }
});

test("every Year 6 French topic has a bank", () => {
  assert.deepEqual(Object.keys(YEAR6_FRENCH_BUILDERS).sort(), topics.map((t) => t.id).sort());
});

test("every Year 6 French bank gives five fair questions at every level", () => {
  for (const [id, build] of Object.entries(YEAR6_FRENCH_BUILDERS)) {
    assert.deepEqual(lintBuild(build, { year: 6, titles: YEAR6_FRENCH_TITLES, minQuestions: 5 }), [], id);
    for (const level of [0, 5]) assert.throws(() => build(level), RangeError);
  }
});

test("every Year 6 French topic has a picture of a known type, and every question picture and rule is sound", () => {
  const problems = checkFigures({ topics: YEAR6_FRENCH_TOPICS, builders: YEAR6_FRENCH_BUILDERS, rulesByTopic: YEAR6_FRENCH_FIGURE_RULES, types: VISUAL_TYPES });
  assert.deepEqual(problems, []);
  for (const topic of Object.values(YEAR6_FRENCH_TOPICS)) assert.ok((topic.visual?.alt ?? "").length > 10, "alt text");
});
