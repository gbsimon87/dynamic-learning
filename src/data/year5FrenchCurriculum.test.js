import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { year5FrenchCurriculum as curriculum } from "./year5FrenchCurriculum.js";
import { YEAR5_FRENCH_TOPIC_SKILLS } from "./year5FrenchCertificateSkills.js";
import { YEAR5_FRENCH_BUILDERS, YEAR5_FRENCH_TITLES, YEAR5_FRENCH_TOPICS, YEAR5_FRENCH_FIGURE_RULES } from "./challenges/year5French/index.js";
import { VISUAL_TYPES } from "./challenges/year5French/visualTypes.js";
import { checkFigures } from "./challenges/figures.js";
import { lintBuild } from "./challenges/questionKinds.js";
import { loadCurriculum, isCurriculumAvailable } from "./curriculumRegistry.js";

const topics = curriculum.flatMap((category) => category.topics);
const pascal = (id) => id.split("-").map((word) => word[0].toUpperCase() + word.slice(1)).join("");
const doc = fs.readFileSync(new URL("../../docs/curriculum/key-stage-2-languages.md", import.meta.url), "utf8");
const mapping = doc.slice(doc.indexOf("## Year 5 topics mapped to statutory requirements"));

test("Year 5 French has the registered shape, a certificate line, four files and a mapping row per topic", () => {
  assert.equal(isCurriculumAvailable(5, "french"), true);
  assert.equal(loadCurriculum("5", "french"), curriculum);
  assert.ok(topics.length >= 14 && topics.length <= 18, "14 to 18 topics");
  assert.equal(new Set(topics.map((t) => t.id)).size, topics.length);
  assert.deepEqual(Object.keys(YEAR5_FRENCH_BUILDERS).sort(), topics.map((t) => t.id).sort());
  assert.deepEqual(Object.keys(YEAR5_FRENCH_TOPIC_SKILLS).sort(), topics.map((t) => `5/french/${t.id}`).sort());
  for (const topic of topics) {
    assert.deepEqual(topic.challenges.map((c) => c.id), [1, 2, 3, 4]);
    const line = YEAR5_FRENCH_TOPIC_SKILLS[`5/french/${topic.id}`];
    assert.ok(line.startsWith("I can") && line.length <= 80, `${topic.id} certificate line`);
    assert.ok(mapping.includes(`\`${topic.id}\``), `${topic.id} is missing from the statutory mapping table`);
    for (const slot of topic.challenges) {
      const text = fs.readFileSync(new URL(`../pages/skills/french/challenges/year5/${topic.id}/${pascal(topic.id)}Challenge${slot.id}.jsx`, import.meta.url), "utf8");
      assert.ok(text.includes("export default") && text.includes(`level={${slot.id}}`) && text.includes("onComplete={onComplete}"));
    }
  }
});

test("every Year 5 French bank gives five fair questions at every level", () => {
  for (const [id, build] of Object.entries(YEAR5_FRENCH_BUILDERS)) {
    assert.deepEqual(lintBuild(build, { year: 5, titles: YEAR5_FRENCH_TITLES, minQuestions: 5 }), [], id);
    for (const level of [0, 5]) assert.throws(() => build(level), RangeError);
  }
});

test("every Year 5 French topic has a picture of a known type, and every question picture and rule is sound", () => {
  const problems = checkFigures({ topics: YEAR5_FRENCH_TOPICS, builders: YEAR5_FRENCH_BUILDERS, rulesByTopic: YEAR5_FRENCH_FIGURE_RULES, types: VISUAL_TYPES });
  assert.deepEqual(problems, []);
  for (const topic of Object.values(YEAR5_FRENCH_TOPICS)) assert.ok((topic.visual.alt ?? "").length > 10, "alt text");
});
