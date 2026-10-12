import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { initialResponse, isCorrect, isReady, lintBuild, seededRng } from "../../questionKinds.js";
import { HISTORY_AGE, HISTORY_TITLES, lintHistoryTopic } from "../engine.js";
import { year2HistoryCurriculum } from "../../../year2HistoryCurriculum.js";
import { YEAR2_HISTORY_BUILDERS as builders, YEAR2_HISTORY_TOPICS as topicData } from "./index.js";

const { images } = JSON.parse(readFileSync(new URL("../../../../assets/history/manifest.json", import.meta.url), "utf8"));
const knownIds = new Set(year2HistoryCurriculum.flatMap((c) => c.topics.map((t) => t.id)));
const age = HISTORY_AGE[2];

function correctResponse(q) {
  if (q.kind === "sort") return Object.fromEntries(q.cards.map((c) => [c.id, c.bin]));
  if (q.kind === "order") return q.answer.map((id) => q.items.find((item) => item.id === id));
  return q.answer;
}

test("Year 2 History: every built topic is a real dataset topic and passes the History lint", () => {
  assert.ok(Object.keys(builders).length >= 1);
  for (const [id, topic] of Object.entries(topicData)) {
    assert.ok(knownIds.has(id), id);
    assert.equal(topic.year, 2);
    assert.deepEqual(lintHistoryTopic(topic, { images }), [], id);
  }
});

test("Year 2 History: fair questions, from the rng only, and runs vary", () => {
  for (const [id, build] of Object.entries(builders)) {
    const questions = (level, rng) => build(level, rng).questions;
    assert.deepEqual(lintBuild(questions, { year: 2, titles: HISTORY_TITLES[2], seeds: 100, minQuestions: age.rounds }), [], id);
    for (let level = 1; level <= 4; level++) {
      assert.deepEqual(build(level, seededRng(17)), build(level, seededRng(17)), `${id} ${level}: randomness only from rng`);
      assert.notDeepEqual(JSON.stringify(build(level, seededRng(1))), JSON.stringify(build(level, seededRng(456))), `${id} ${level}: identical replays`);
      for (const q of build(level, seededRng(17)).questions) assert.equal(isCorrect(q, initialResponse(q)), false, `${id}: starts at the answer`);
    }
  }
});

test("Year 2 History: no question repeats within a run, and every one accepts its answer", () => {
  for (const [id, build] of Object.entries(builders)) for (let level = 1; level <= 4; level++) for (let seed = 1; seed <= 40; seed++) {
    const run = build(level, seededRng(seed)).questions;
    const keys = run.map((q) => JSON.stringify([q.prompt, q.answer, q.bins, q.visual]));
    assert.equal(new Set(keys).size, keys.length, `${id} level ${level} seed ${seed}: repeated question`);
    for (const q of run) {
      assert.equal(isReady(q, correctResponse(q)), true, id);
      assert.equal(isCorrect(q, correctResponse(q)), true, id);
    }
  }
});

test("Year 2 History: every built topic has four wrappers that forward completion", () => {
  for (const id of Object.keys(builders)) for (const level of [1, 2, 3, 4]) {
    const name = id.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join("");
    const file = new URL(`../../../../pages/skills/history/challenges/year2/${id}/${name}Challenge${level}.jsx`, import.meta.url);
    assert.ok(existsSync(file), file.pathname);
    const source = readFileSync(file, "utf8");
    assert.ok(source.includes(`level={${level}}`) && source.includes(`topicId="${id}"`) && source.includes("onComplete={onComplete}"), file.pathname);
  }
});

test("Year 2 History: every dataset topic is built, in dataset order", () => {
  assert.deepEqual(Object.keys(builders), [...knownIds]);
});

test("Year 2 History: every choice has three options, every run has a hint, and long orders stack", () => {
  for (const [id, build] of Object.entries(builders)) for (const level of [1, 2, 3, 4]) {
    for (const q of build(level, seededRng(23)).questions) {
      assert.ok(q.hint, `${id}/${level}: no retry support`);
      if (q.kind === "choice") assert.equal(q.options.length, 3, id);
      if (q.kind === "order") assert.equal(q.direction, "vertical", id);
    }
  }
});

test("Year 2 History: source details match the inspected portraits and practice sources are labelled", () => {
  assert.match(images["edith-cavell-portrait"].alt, /white blouse.*lace collar/);
  assert.doesNotMatch(images["edith-cavell-portrait"].alt, /nurse cap/);
  assert.match(images["mary-seacole-photo"].alt, /hat.*medals/);
  for (const id of ["old-maps-and-photos", "memorials-and-blue-plaques"]) {
    const story = topicData[id].levels[3].story;
    assert.ok(story.scene);
    assert.match(story.lines.join(" "), /made-up|our drawing/);
  }
});
