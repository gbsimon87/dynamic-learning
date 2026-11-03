import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { year5HistoryCurriculum as curriculum } from "./year5HistoryCurriculum.js";
import { YEAR5_HISTORY_TOPIC_SKILLS } from "./year5HistoryCertificateSkills.js";
import { loadCurriculum } from "./curriculumRegistry.js";
import { TOPIC_SKILLS } from "./certificateSkills.js";
import { HISTORY_AGE, HISTORY_TITLES, lintHistoryTopic } from "./challenges/history/engine.js";
import { YEAR5_HISTORY_BUILDERS as builders, YEAR5_HISTORY_TOPICS as topicData } from "./challenges/history/year5/index.js";
import { initialResponse, isCorrect, isReady, lintBuild, seededRng } from "./challenges/questionKinds.js";

const topics = curriculum.flatMap((c) => c.topics);
const pascal = (id) => id.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join("");
const wrapper = (id, level) => new URL(`../pages/skills/history/challenges/year5/${id}/${pascal(id)}Challenge${level}.jsx`, import.meta.url);
const correct = (q) => {
  if (q.kind === "sort") return Object.fromEntries(q.cards.map((c) => [c.id, c.bin]));
  if (q.kind === "order") return q.answer.map((id) => q.items.find((item) => item.id === id));
  return q.answer;
};

// Titles are permanent URL and progress keys once shipped.
const LOCKED_IDS = [
  ["ancient-greece---land-and-cities", ["where-ancient-greece-was", "athens-and-sparta", "everyday-life-in-athens", "democracy-in-athens"]],
  ["ancient-greece---beliefs-and-games", ["greek-gods-and-myths", "the-parthenon-and-greek-temples", "the-olympic-games"]],
  ["ancient-greece---wars-ideas-and-legacy", ["greeks-and-persians", "alexander-the-great", "greek-thinkers-and-theatre", "greek-ideas-we-still-use"]],
  ["the-maya---land-and-cities", ["where-the-maya-lived", "maya-farming-and-food", "maya-cities-and-kings", "chichen-itza-and-maya-pyramids"]],
  ["the-maya---ideas-and-change", ["maya-writing-and-books", "maya-numbers-and-the-calendar", "maya-gods-and-the-ball-game", "the-classic-maya-collapse"]],
  ["connections-and-chronology", ["one-long-timeline", "sources-and-interpretations", "comparing-past-societies"]],
];

test("Year 5 History: six categories, 22 topics, four challenges each, certificate line per topic", () => {
  assert.deepEqual(curriculum.map((c) => [c.id, c.topics.map((t) => t.id)]), LOCKED_IDS);
  assert.equal(topics.length, 22);
  assert.equal(loadCurriculum("5", "history"), curriculum);
  assert.deepEqual(Object.keys(YEAR5_HISTORY_TOPIC_SKILLS), topics.map((t) => `5/history/${t.id}`));
  for (const topic of topics) {
    assert.ok(topic.icon);
    assert.match(topic.name, /^[A-Za-z0-9 ',-]+$/);
    assert.deepEqual(topic.challenges.map((q) => q.id), [1, 2, 3, 4]);
    const line = TOPIC_SKILLS[`5/history/${topic.id}`];
    assert.ok(line && line.startsWith("I can") && line.length <= 80, topic.id);
  }
});

test("Year 5 History: crosswalk row per topic and the Year 5 / Year 6 split are recorded", () => {
  const text = readFileSync(new URL("../../docs/curriculum/key-stage-2-history.md", import.meta.url), "utf8");
  assert.match(text, /## Year 5 topic crosswalk/);
  for (const topic of topics) assert.ok(text.includes(`| ${topic.name} | \`${topic.id}\` |`), topic.id);
  assert.match(text, /local history study/);
});

test("Year 5 History: all 88 wrappers exist and forward topic, level and completion", () => {
  assert.deepEqual(Object.keys(builders), topics.map((t) => t.id));
  for (const { id } of topics) for (const level of [1, 2, 3, 4]) {
    const file = wrapper(id, level);
    assert.ok(existsSync(file), file.pathname);
    const source = readFileSync(file, "utf8");
    assert.ok(source.includes(`level={${level}}`) && source.includes(`topicId="${id}"`) && source.includes("onComplete={onComplete}"), file.pathname);
  }
});

test("Year 5 History: every topic passes the History lint and every level builds fair questions", () => {
  const age = HISTORY_AGE[5];
  for (const [id, topic] of Object.entries(topicData)) {
    assert.equal(topic.year, 5);
    assert.deepEqual(lintHistoryTopic(topic), [], id);
    const build = builders[id];
    const questions = (level, rng) => build(level, rng).questions;
    assert.deepEqual(lintBuild(questions, { year: 5, titles: HISTORY_TITLES[5], seeds: 20, minQuestions: age.rounds }), [], id);
    for (let level = 1; level <= 4; level++) for (let seed = 1; seed <= 20; seed++) {
      const run = build(level, seededRng(seed)).questions;
      const keys = run.map((q) => JSON.stringify([q.prompt, q.answer, q.bins, q.visual]));
      assert.equal(new Set(keys).size, keys.length, `${id} level ${level} seed ${seed}: repeated question`);
      for (const q of run) {
        assert.ok(q.hint, `${id}: no hint`);
        if (q.kind === "choice") assert.equal(q.options.length, 3, id);
        assert.equal(isCorrect(q, initialResponse(q)), false, `${id}: starts at the answer`);
        assert.equal(isReady(q, correct(q)), true, id);
        assert.equal(isCorrect(q, correct(q)), true, id);
        if (q.kind === "choice") for (const wrong of q.options.filter((o) => o !== q.answer)) assert.equal(isCorrect(q, wrong), false, `${id}: accepted ${wrong}`);
      }
    }
  }
});
