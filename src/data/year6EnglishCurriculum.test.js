import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { year6EnglishCurriculum } from "./year6EnglishCurriculum.js";
import { YEAR6_ENGLISH_TOPIC_SKILLS } from "./year6EnglishCertificateSkills.js";
import { buildFormalAndInformalVocabulary } from "./challenges/authored/year6/english/formal-and-informal-vocabulary.js";
import { lintBuild, seededRng } from "./challenges/questionKinds.js";
import { findUsSpellings } from "./english/textChecks.js";
import { getLesson } from "./lessons/index.js";
import { countsTowardYear, loadCurriculum } from "./curriculumRegistry.js";

const topics = year6EnglishCurriculum.flatMap(category => category.topics);
const pilot = topics.find(topic => topic.id === "formal-and-informal-vocabulary");
const pascal = id => id.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join("");

test("Year 6 English registers the approved staged tree and preserves award membership", () => {
  assert.equal(loadCurriculum(6, "english"), year6EnglishCurriculum);
  assert.equal(year6EnglishCurriculum.length, 5);
  assert.equal(topics.length, 31);
  assert.equal(new Set(topics.map(topic => topic.id)).size, 31);
  assert.equal(countsTowardYear(6, "english"), false);
  assert.deepEqual(Object.keys(YEAR6_ENGLISH_TOPIC_SKILLS).sort(), topics.map(topic => `6/english/${topic.id}`).sort());
  const source = readFileSync(new URL("../../docs/curriculum/year-5-and-6-english.md", import.meta.url), "utf8");
  for (const topic of topics) {
    assert.deepEqual(topic.challenges.map(challenge => challenge.id), [1, 2, 3, 4]);
    assert.ok(source.includes(`\`${topic.id}\``), `${topic.id} lacks a statutory mapping`);
  }
});

test("Year 6 English pilot has four loaders, four lessons and fair British-English questions", () => {
  assert.ok(pilot);
  for (const level of [1, 2, 3, 4]) {
    const file = new URL(`../pages/skills/english/challenges/year6/${pilot.id}/${pascal(pilot.id)}Challenge${level}.jsx`, import.meta.url);
    assert.ok(existsSync(file), file.pathname);
    assert.match(readFileSync(file, "utf8"), /onComplete/);
    assert.ok(getLesson("english", 6, pilot.id, level)?.example, `lesson ${level}`);
  }
  assert.deepEqual(lintBuild(buildFormalAndInformalVocabulary, { year: 6, titles: ["a", "b", "c", "d"], seeds: 30, minQuestions: 5 }), []);
  for (const level of [1, 2, 3, 4]) for (let seed = 1; seed <= 30; seed += 1) {
    const questions = buildFormalAndInformalVocabulary(level, seededRng(seed));
    assert.equal(questions.length, 5);
    assert.equal(new Set(questions.map(question => question.prompt)).size, 5);
    assert.deepEqual(findUsSpellings(JSON.stringify(questions)), []);
  }
});
