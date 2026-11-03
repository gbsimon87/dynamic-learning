import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { year5ScienceCurriculum as curriculum } from "./year5ScienceCurriculum.js";
import { YEAR5_SCIENCE_TOPIC_SKILLS } from "./year5ScienceCertificateSkills.js";
import { YEAR5_SCIENCE_BUILDERS, YEAR5_SCIENCE_TITLES, YEAR5_SCIENCE_TOPICS, YEAR5_SCIENCE_FIGURE_RULES } from "./challenges/year5Science/index.js";
import { VISUAL_TYPES } from "./challenges/year5Science/visualTypes.js";
import { checkFigures } from "./challenges/figures.js";
import { lintBuild, seededRng, isCorrect, isReady, initialResponse } from "./challenges/questionKinds.js";
import { isScienceAnswerCorrect } from "./challenges/year5Science/engine.js";
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

test("Year 5 Science has the registered shape, a certificate line and four files per topic", () => {
  assert.equal(isCurriculumAvailable(5, "science"), true);
  assert.equal(loadCurriculum("5", "science"), curriculum);
  assert.deepEqual(curriculum.map(c => c.id), ["living-things-and-their-habitats", "animals-including-humans", "properties-and-changes-of-materials", "earth-and-space", "forces"]);
  assert.equal(topics.length, 24);
  assert.equal(new Set(topics.map(t => t.id)).size, 24);
  assert.deepEqual(Object.keys(YEAR5_SCIENCE_BUILDERS).sort(), topics.map(t => t.id).sort());
  assert.deepEqual(Object.keys(YEAR5_SCIENCE_TOPIC_SKILLS).sort(), topics.map(t => `5/science/${t.id}`).sort());
  const source = fs.readFileSync(new URL("../../docs/curriculum/year-5-science.md", import.meta.url), "utf8");
  for (const topic of topics) {
    assert.deepEqual(topic.challenges.map(c => c.id), [1, 2, 3, 4]);
    assert.ok(source.includes(`\`${topic.id}\``), `${topic.id} lacks a source mapping`);
    const line = YEAR5_SCIENCE_TOPIC_SKILLS[`5/science/${topic.id}`];
    assert.ok(line.startsWith("I ") && line.length <= 80, `${topic.id} certificate line`);
    for (const slot of topic.challenges) {
      const text = fs.readFileSync(new URL(`../pages/skills/science/challenges/year5/${topic.id}/${pascal(topic.id)}Challenge${slot.id}.jsx`, import.meta.url), "utf8");
      assert.ok(text.includes("export default") && text.includes(`level={${slot.id}}`) && text.includes("onComplete={onComplete}"));
    }
  }
});

test("every Year 5 Science builder gives five fair, solvable questions at every level", () => {
  for (const [id, build] of Object.entries(YEAR5_SCIENCE_BUILDERS)) {
    assert.deepEqual(lintBuild(build, { year: 5, titles: YEAR5_SCIENCE_TITLES, minQuestions: 5 }), [], id);
    for (let level = 1; level <= 4; level++) for (let seed = 1; seed <= 20; seed++) {
      const run = build(level, seededRng(seed));
      assert.equal(run.length, 5, `${id}/${level}`);
      assert.equal(new Set(run.map(q => `${q.prompt}/${q.text ?? ""}`)).size, 5, `${id}/${level} repeats a task`);
      for (const q of run) {
        assert.equal(isCorrect(q, initialResponse(q)), false, `${id} starts correct`);
        assert.equal(isReady(q, solve(q)), true);
        assert.equal(isCorrect(q, solve(q)), true, `${id}: ${q.prompt}`);
        assert.equal(isScienceAnswerCorrect(q, solve(q)), true);
        if (q.kind === "choice") for (const o of q.options.filter(o => o !== q.answer)) assert.equal(isCorrect(q, o), false);
        if (q.kind === "number") assert.equal(isCorrect(q, String(q.answer + 1)), false);
      }
    }
    for (const level of [0, 5]) assert.throws(() => build(level), RangeError);
  }
});

test("every Year 5 Science topic has a picture of a known type, and every question picture and rule is sound", () => {
  const problems = checkFigures({ topics: YEAR5_SCIENCE_TOPICS, builders: YEAR5_SCIENCE_BUILDERS, rulesByTopic: YEAR5_SCIENCE_FIGURE_RULES, types: VISUAL_TYPES });
  assert.deepEqual(problems, []);
  for (const topic of Object.values(YEAR5_SCIENCE_TOPICS)) assert.ok((topic.visual.alt ?? "").length > 10, "alt text");
});
