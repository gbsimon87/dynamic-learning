import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { lintBuild, seededRng } from "../questionKinds.js";
import { HISTORY_AGE, HISTORY_TITLES, buildHistoryTopic, lintHistoryTopic } from "./engine.js";
import { HISTORY_TEST_TOPIC as topic } from "./testTopic.js";

const { images } = JSON.parse(readFileSync(new URL("../../../assets/history/manifest.json", import.meta.url), "utf8"));
const build = buildHistoryTopic(topic);
const questionsOnly = (level, rng) => build(level, rng).questions;
const clone = () => structuredClone(topic);

test("builds a story and the year's number of fair questions, from the rng only", () => {
  for (const level of [1, 2, 3, 4]) {
    const run = build(level, seededRng(3));
    assert.equal(run.story, topic.levels[level].story);
    assert.equal(run.questions.length, HISTORY_AGE[1].rounds);
    assert.deepEqual(run, build(level, seededRng(3)));
  }
  assert.deepEqual(lintBuild(questionsOnly, { year: 1, titles: HISTORY_TITLES[1], minQuestions: 4 }), []);
});

test("every choice offers the year's number of options", () => {
  for (let seed = 1; seed <= 20; seed++) for (const q of build(1, seededRng(seed)).questions) {
    if (q.kind === "choice") assert.equal(q.options.length, HISTORY_AGE[1].options);
  }
});

test("source rounds keep their picture", () => {
  const q = build(3, seededRng(1)).questions.find((x) => x.visual?.type === "source");
  assert.deepEqual(q.visual, { type: "source", image: "cma-child-with-drum" });
});

test("the test topic itself is sound", () => {
  assert.deepEqual(lintHistoryTopic(topic, { images }), []);
});

test("lint: story too long, sentence too long, missing picture", () => {
  const t = clone();
  t.levels[1].story = { lines: ["one two three four five six seven eight nine ten eleven.", ...Array(4).fill("a b c d e f g")] };
  const problems = lintHistoryTopic(t, { images });
  assert.ok(problems.some((p) => p.includes("level 1: story has 39 words (max 30)")), problems.join("\n"));
  assert.ok(problems.some((p) => p.includes("level 1: sentence too long")));
  assert.ok(problems.some((p) => p.includes("level 1: story needs an image or a picture with a label")));
});

test("lint: an answer the card does not give is caught", () => {
  const t = clone();
  t.banks.choices[0].answeredBy = "made of gold";
  assert.ok(lintHistoryTopic(t, { images }).some((p) => p.includes('"made of gold" is not on the story card or picture')));
});

test("lint: unknown images, thin banks, few round types, wrong round count", () => {
  const t = clone();
  t.levels[3].story.image = "nope";
  t.banks.photo[0].visual.image = "nope";
  t.levels[1].rounds = ["choices", "choices", "choices", "choices", "choices"];
  t.banks.choices = t.banks.choices.slice(0, 2);
  const problems = lintHistoryTopic(t, { images });
  assert.ok(problems.some((p) => p.includes('level 3: unknown image "nope"')));
  assert.ok(problems.some((p) => p.includes('bank "photo" #1: unknown image "nope"')));
  assert.ok(problems.some((p) => p.includes("level 1: needs 4 rounds")));
  assert.ok(problems.some((p) => p.includes('bank "choices" has 2 templates but is drawn 5 times')));
  assert.ok(problems.some((p) => p.includes("only 2 templates to draw from (min 6)")));
  const plain = clone();
  for (const level of [1, 2, 3, 4]) plain.levels[level].rounds = ["choices", "choices", "choices", "choices"];
  assert.ok(lintHistoryTopic(plain, { images }).some((p) => p.includes("only 1 round types across the topic (min 3)")));
});

test("lint: no references, unknown year", () => {
  assert.ok(lintHistoryTopic({ ...clone(), references: [] }, { images }).includes("no references"));
  assert.deepEqual(lintHistoryTopic({ ...clone(), year: 9 }, { images }), ["unknown year 9"]);
});
