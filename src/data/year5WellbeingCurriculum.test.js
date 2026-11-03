import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { year5WellbeingCurriculum as curriculum } from "./year5WellbeingCurriculum.js";
import { YEAR5_WELLBEING_TOPIC_SKILLS } from "./year5WellbeingCertificateSkills.js";
import { YEAR5_WELLBEING_BUILDERS, YEAR5_WELLBEING_TITLES, YEAR5_WELLBEING_TOPICS, YEAR5_WELLBEING_FIGURE_RULES } from "./challenges/year5Wellbeing/index.js";
import { VISUAL_TYPES } from "./challenges/year5Wellbeing/visualTypes.js";
import { checkFigures } from "./challenges/figures.js";
import { lintBuild, seededRng, isCorrect, isReady, initialResponse } from "./challenges/questionKinds.js";
import { isScienceAnswerCorrect } from "./challenges/year5Creative/shared.js";
import { loadCurriculum, isCurriculumAvailable } from "./curriculumRegistry.js";

const topics = curriculum.flatMap(c => c.topics);
const pascal = id => id.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join("");

function solve(q) {
  if (q.kind === "sort") return Object.fromEntries(q.cards.map(c => [c.id, c.bin]));
  if (q.kind === "order") return q.answer.map(id => q.items.find(item => item.id === id));
  if (q.kind === "build") {
    const free = [...q.tiles];
    return q.answer.split(" ").map(label => free.splice(free.findIndex(t => t.label === label), 1)[0].id);
  }
  return q.kind === "number" ? String(q.answer) : q.answer;
}

test("Year 5 Relationships and health has the registered shape, a certificate line, a doc mapping and four files per topic", () => {
  assert.equal(isCurriculumAvailable(5, "wellbeing"), true);
  assert.equal(loadCurriculum("5", "wellbeing"), curriculum);
  assert.ok(curriculum.length >= 3 && curriculum.length <= 4);
  assert.ok(topics.length >= 10 && topics.length <= 14);
  assert.equal(new Set(topics.map(t => t.id)).size, topics.length);
  assert.deepEqual(Object.keys(YEAR5_WELLBEING_BUILDERS).sort(), topics.map(t => t.id).sort());
  assert.deepEqual(Object.keys(YEAR5_WELLBEING_TOPIC_SKILLS).sort(), topics.map(t => `5/wellbeing/${t.id}`).sort());
  const source = fs.readFileSync(new URL("../../docs/curriculum/primary-relationships-and-health-education.md", import.meta.url), "utf8");
  for (const topic of topics) {
    assert.deepEqual(topic.challenges.map(c => c.id), [1, 2, 3, 4]);
    assert.ok(source.includes(`\`${topic.id}\``), `${topic.id} lacks a source mapping`);
    const line = YEAR5_WELLBEING_TOPIC_SKILLS[`5/wellbeing/${topic.id}`];
    assert.ok(line.startsWith("I ") && line.length <= 80, `${topic.id} certificate line`);
    for (const slot of topic.challenges) {
      const text = fs.readFileSync(new URL(`../pages/skills/wellbeing/challenges/year5/${topic.id}/${pascal(topic.id)}Challenge${slot.id}.jsx`, import.meta.url), "utf8");
      assert.ok(text.includes("export default") && text.includes(`level={${slot.id}}`) && text.includes("onComplete={onComplete}"));
    }
  }
});

test("every Year 5 Relationships and health bank is at least three runs deep", () => {
  for (const [id, t] of Object.entries(YEAR5_WELLBEING_TOPICS)) {
    assert.ok(t.facts.length >= 15 && t.sorts.length >= 6 && t.structures.length >= 9, `${id} banks`);
    const choiceOrNumber = t.enquiries.filter(q => q.kind === "choice" || q.kind === "number").length;
    assert.ok(choiceOrNumber >= 9 && t.enquiries.length - choiceOrNumber >= 6, `${id} enquiries`);
  }
});

test("every Year 5 Relationships and health builder gives five fair, solvable questions at every level", () => {
  for (const [id, build] of Object.entries(YEAR5_WELLBEING_BUILDERS)) {
    assert.deepEqual(lintBuild(build, { year: 5, titles: YEAR5_WELLBEING_TITLES, minQuestions: 5 }), [], id);
    for (let level = 1; level <= 4; level++) for (let seed = 1; seed <= 20; seed++) {
      const run = build(level, seededRng(seed));
      assert.equal(run.length, 5, `${id}/${level}`);
      for (const q of run) {
        assert.equal(isCorrect(q, initialResponse(q)), false, `${id} starts correct`);
        assert.equal(isReady(q, solve(q)), true);
        assert.equal(isScienceAnswerCorrect(q, solve(q)), true, `${id}: ${q.prompt}`);
      }
    }
  }
});

test("Year 5 Relationships and health stays inside the safe topics", () => {
  const banned = /\b(abuse|abused|abusive|puberty|period|periods|menstrual|menstruation|sex|sexual|penis|vagina|vulva|testicles|nipples|drug|drugs|alcohol|alcoholic|tobacco|smoking|vaping|vape|nicotine|self-harm|suicide|naked|porn|pornography|gambling|obesity|overweight|fat|diet plan|weight loss)\b/i;
  const strings = (value) => typeof value === "string" ? [value] : Array.isArray(value) ? value.flatMap(strings) : value && typeof value === "object" ? Object.values(value).flatMap(strings) : [];
  for (const [id, topic] of Object.entries(YEAR5_WELLBEING_TOPICS)) {
    for (const text of strings(topic)) assert.ok(!banned.test(text), `${id}: ${text}`);
  }
});

test("every Year 5 Relationships and health topic has a picture of a known type, and every question picture and rule is sound", () => {
  const problems = checkFigures({ topics: YEAR5_WELLBEING_TOPICS, builders: YEAR5_WELLBEING_BUILDERS, rulesByTopic: YEAR5_WELLBEING_FIGURE_RULES, types: VISUAL_TYPES });
  assert.deepEqual(problems, []);
  for (const topic of Object.values(YEAR5_WELLBEING_TOPICS)) assert.ok((topic.visual.alt ?? "").length > 10, "alt text");
});
