import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { year6ScienceCurriculum as curriculum } from "./year6ScienceCurriculum.js";
import { YEAR6_SCIENCE_TOPIC_SKILLS } from "./year6ScienceCertificateSkills.js";
import { YEAR6_SCIENCE_BUILDERS, YEAR6_SCIENCE_TITLES, YEAR6_SCIENCE_TOPICS, YEAR6_SCIENCE_FIGURE_RULES } from "./challenges/year6Science/index.js";
import { VISUAL_TYPES } from "./challenges/year6Science/visualTypes.js";
import { checkFigures } from "./challenges/figures.js";
import { lintBuild, seededRng, isCorrect, isReady, initialResponse } from "./challenges/questionKinds.js";
import { isScienceAnswerCorrect } from "./challenges/year6Science/engine.js";
import { loadCurriculum, isCurriculumAvailable, countsTowardYear } from "./curriculumRegistry.js";
import { CIRCUIT_PARTS } from "./challenges/year6Science/visualTypes.js";

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

test("Year 6 Science has the registered shape, a certificate line and four files per topic", () => {
  assert.equal(isCurriculumAvailable(6, "science"), true);
  assert.equal(loadCurriculum("6", "science"), curriculum);
  assert.deepEqual(curriculum.map(c => c.id), ["living-things-and-their-habitats", "animals-including-humans", "evolution-and-inheritance", "light", "electricity"]);
  assert.equal(topics.length, 24);
  assert.equal(new Set(topics.map(t => t.id)).size, 24);
  assert.deepEqual(Object.keys(YEAR6_SCIENCE_BUILDERS).sort(), topics.map(t => t.id).sort());
  assert.deepEqual(Object.keys(YEAR6_SCIENCE_TOPIC_SKILLS).sort(), topics.map(t => `6/science/${t.id}`).sort());
  const source = fs.readFileSync(new URL("../../docs/curriculum/year-6-science.md", import.meta.url), "utf8");
  for (const topic of topics) {
    assert.deepEqual(topic.challenges.map(c => c.id), [1, 2, 3, 4]);
    assert.ok(source.includes(`\`${topic.id}\``), `${topic.id} lacks a source mapping`);
    const line = YEAR6_SCIENCE_TOPIC_SKILLS[`6/science/${topic.id}`];
    assert.ok(line.startsWith("I ") && line.length <= 80, `${topic.id} certificate line`);
    for (const slot of topic.challenges) {
      const text = fs.readFileSync(new URL(`../pages/skills/science/challenges/year6/${topic.id}/${pascal(topic.id)}Challenge${slot.id}.jsx`, import.meta.url), "utf8");
      assert.ok(text.includes("export default") && text.includes(`level={${slot.id}}`) && text.includes("onComplete={onComplete}"));
    }
  }
});

test("every Year 6 Science builder gives five fair, solvable questions at every level", () => {
  for (const [id, build] of Object.entries(YEAR6_SCIENCE_BUILDERS)) {
    assert.deepEqual(lintBuild(build, { year: 6, titles: YEAR6_SCIENCE_TITLES, minQuestions: 5 }), [], id);
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

test("every Year 6 Science topic has a picture of a known type, and every question picture and rule is sound", () => {
  const problems = checkFigures({ topics: YEAR6_SCIENCE_TOPICS, builders: YEAR6_SCIENCE_BUILDERS, rulesByTopic: YEAR6_SCIENCE_FIGURE_RULES, types: VISUAL_TYPES });
  assert.deepEqual(problems, []);
  for (const topic of Object.values(YEAR6_SCIENCE_TOPICS)) assert.ok((topic.visual.alt ?? "").length > 10, "alt text");
});

test("Year 6 Science circuit diagrams use only known symbols, and its bank is series-only", () => {
  for (const [id, build] of Object.entries(YEAR6_SCIENCE_BUILDERS)) for (let level = 1; level <= 4; level++) for (let seed = 1; seed <= 30; seed++) {
    for (const q of build(level, seededRng(seed))) {
      if (q.visual?.type === "circuitDiagram") {
        assert.ok(q.visual.parts.length >= 2 && q.visual.parts.every(p => CIRCUIT_PARTS.includes(p)), `${id}: ${q.prompt}`);
        assert.ok((q.visual.alt ?? "").length > 10, `${id}: circuit alt text`);
      }
      assert.doesNotMatch(`${q.prompt} ${q.options?.join(" ") ?? ""}`, /parallel/i, `${id}: Year 6 teaches series circuits only`);
    }
  }
});

test("Year 6 Science stays outside the Year 6 award until Maths and English join it", () => {
  assert.equal(countsTowardYear(6, "science"), false);
  assert.equal(countsTowardYear(5, "history"), false);
  for (const subject of ["math", "english", "science"]) assert.equal(countsTowardYear(5, subject), true, subject);
});
