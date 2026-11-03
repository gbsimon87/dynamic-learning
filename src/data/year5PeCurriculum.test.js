import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { year5PeCurriculum as curriculum } from "./year5PeCurriculum.js";
import { YEAR5_PE_TOPIC_SKILLS } from "./year5PeCertificateSkills.js";
import { YEAR5_PE_BUILDERS, YEAR5_PE_TITLES, YEAR5_PE_TOPICS } from "./challenges/year5Pe/index.js";
import { lintBuild, seededRng, isCorrect, isReady, initialResponse } from "./challenges/questionKinds.js";
import { isScienceAnswerCorrect } from "./challenges/year5Creative/shared.js";
import { loadCurriculum, isCurriculumAvailable } from "./curriculumRegistry.js";
import { YEAR5_PE_VISUAL_TYPES, YEAR5_PE_SPORTS } from "./challenges/year5Pe/visualTypes.js";
import { allVisuals } from "./challenges/year5Creative/visuals.js";

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

test("Year 5 PE has the registered shape, a certificate line, a doc mapping and four files per topic", () => {
  assert.equal(isCurriculumAvailable(5, "pe"), true);
  assert.equal(loadCurriculum("5", "pe"), curriculum);
  assert.ok(curriculum.length >= 3 && curriculum.length <= 4);
  assert.ok(topics.length >= 10 && topics.length <= 14);
  assert.equal(new Set(topics.map(t => t.id)).size, topics.length);
  assert.deepEqual(Object.keys(YEAR5_PE_BUILDERS).sort(), topics.map(t => t.id).sort());
  assert.deepEqual(Object.keys(YEAR5_PE_TOPIC_SKILLS).sort(), topics.map(t => `5/pe/${t.id}`).sort());
  const source = fs.readFileSync(new URL("../../docs/curriculum/key-stage-2-physical-education.md", import.meta.url), "utf8");
  for (const topic of topics) {
    assert.deepEqual(topic.challenges.map(c => c.id), [1, 2, 3, 4]);
    assert.ok(source.includes(`\`${topic.id}\``), `${topic.id} lacks a source mapping`);
    const line = YEAR5_PE_TOPIC_SKILLS[`5/pe/${topic.id}`];
    assert.ok(line.startsWith("I ") && line.length <= 80, `${topic.id} certificate line`);
    for (const slot of topic.challenges) {
      const text = fs.readFileSync(new URL(`../pages/skills/pe/challenges/year5/${topic.id}/${pascal(topic.id)}Challenge${slot.id}.jsx`, import.meta.url), "utf8");
      assert.ok(text.includes("export default") && text.includes(`level={${slot.id}}`) && text.includes("onComplete={onComplete}"));
    }
  }
});

test("every Year 5 PE bank is at least three runs deep", () => {
  for (const [id, t] of Object.entries(YEAR5_PE_TOPICS)) {
    assert.ok(t.facts.length >= 15 && t.sorts.length >= 6 && t.structures.length >= 9, `${id} banks`);
    const choiceOrNumber = t.enquiries.filter(q => q.kind === "choice" || q.kind === "number").length;
    assert.ok(choiceOrNumber >= 9 && t.enquiries.length - choiceOrNumber >= 6, `${id} enquiries`);
  }
});

test("every Year 5 PE builder gives five fair, solvable questions at every level", () => {
  for (const [id, build] of Object.entries(YEAR5_PE_BUILDERS)) {
    assert.deepEqual(lintBuild(build, { year: 5, titles: YEAR5_PE_TITLES, minQuestions: 5 }), [], id);
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

test("every Year 5 Pe topic has a figure and every figure is a type the component draws", () => {
  for (const [id, topic] of Object.entries(YEAR5_PE_TOPICS)) {
    for (const [where, v] of allVisuals(topic)) {
      assert.ok(v && YEAR5_PE_VISUAL_TYPES.includes(v.type), `${id} ${where}: unknown figure type ${v?.type}`);
      if (v.type === "pitch") assert.ok(YEAR5_PE_SPORTS.includes(v.sport), `${id} ${where}: unknown sport ${v.sport}`);
    }
    assert.ok(topic.visual, `${id} has no topic figure`);
    for (const q of YEAR5_PE_BUILDERS[id](1, seededRng(3))) assert.ok(q.visual, `${id} level 1 question has no figure: ${q.prompt}`);
  }
});
