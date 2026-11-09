import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { year6ComputingCurriculum as curriculum } from "./year6ComputingCurriculum.js";
import { YEAR6_COMPUTING_TOPIC_SKILLS } from "./year6ComputingCertificateSkills.js";
import { YEAR6_COMPUTING_BUILDERS, YEAR6_COMPUTING_TITLES, YEAR6_COMPUTING_TOPICS, YEAR6_COMPUTING_FIGURE_RULES } from "./challenges/year6Computing/index.js";
import { VISUAL_TYPES } from "./challenges/year5Computing/visualTypes.js";
import { checkFigures } from "./challenges/figures.js";
import { lintBuild } from "./challenges/questionKinds.js";
import { loadCurriculum, isCurriculumAvailable } from "./curriculumRegistry.js";

const topics = curriculum.flatMap((category) => category.topics);
const pascal = (id) => id.split("-").map((word) => word[0].toUpperCase() + word.slice(1)).join("");
const doc = fs.readFileSync(new URL("../../docs/curriculum/key-stage-2-computing.md", import.meta.url), "utf8");
const mapping = doc.slice(doc.indexOf("## Year 6 topics mapped to statutory requirements"));
const BUILT = curriculum.flatMap((c) => c.topics.map((t) => t.id));

test("Year 6 Computing has the registered shape, a certificate line and mapping row per topic, and four files per built topic", () => {
  assert.equal(isCurriculumAvailable(6, "computing"), true);
  assert.equal(loadCurriculum("6", "computing"), curriculum);
  assert.ok(topics.length >= 14 && topics.length <= 18, "14 to 18 topics");
  assert.equal(new Set(topics.map((t) => t.id)).size, topics.length);
  assert.deepEqual(Object.keys(YEAR6_COMPUTING_BUILDERS).sort(), [...BUILT].sort());
  assert.deepEqual(Object.keys(YEAR6_COMPUTING_TOPIC_SKILLS).sort(), topics.map((t) => `6/computing/${t.id}`).sort());
  for (const topic of topics) {
    assert.deepEqual(topic.challenges.map((c) => c.id), [1, 2, 3, 4]);
    const line = YEAR6_COMPUTING_TOPIC_SKILLS[`6/computing/${topic.id}`];
    assert.ok(line.startsWith("I can") && line.length <= 80, `${topic.id} certificate line`);
    assert.ok(mapping.includes(`\`${topic.id}\``), `${topic.id} is missing from the statutory mapping table`);
    const built = BUILT.includes(topic.id);
    assert.equal(fs.existsSync(new URL(`../pages/skills/computing/challenges/year6/${topic.id}`, import.meta.url)), built, `${topic.id} wrappers`);
    if (!built) continue;
    for (const slot of topic.challenges) {
      const text = fs.readFileSync(new URL(`../pages/skills/computing/challenges/year6/${topic.id}/${pascal(topic.id)}Challenge${slot.id}.jsx`, import.meta.url), "utf8");
      assert.ok(text.includes("export default") && text.includes(`level={${slot.id}}`) && text.includes("onComplete={onComplete}"));
    }
  }
});

test("every Year 6 Computing bank gives five fair questions at every level", () => {
  for (const [id, build] of Object.entries(YEAR6_COMPUTING_BUILDERS)) {
    assert.deepEqual(lintBuild(build, { year: 5, titles: YEAR6_COMPUTING_TITLES, minQuestions: 5 }), [], id);
    for (const level of [0, 5]) assert.throws(() => build(level), RangeError);
  }
});

test("every Year 6 Computing topic has a picture of a known type, and every question picture and rule is sound", () => {
  const problems = checkFigures({ topics: YEAR6_COMPUTING_TOPICS, builders: YEAR6_COMPUTING_BUILDERS, rulesByTopic: YEAR6_COMPUTING_FIGURE_RULES, types: VISUAL_TYPES });
  assert.deepEqual(problems, []);
  for (const topic of Object.values(YEAR6_COMPUTING_TOPICS)) assert.ok((topic.visual.alt ?? "").length > 10, "alt text");
});
