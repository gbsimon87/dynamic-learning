import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { initialResponse, isCorrect, isReady, lintBuild, seededRng } from "../../questionKinds.js";
import { HISTORY_AGE, HISTORY_TITLES, lintHistoryTopic } from "../engine.js";
import { year4HistoryCurriculum } from "../../../year4HistoryCurriculum.js";
import { YEAR4_HISTORY_BUILDERS as builders, YEAR4_HISTORY_TOPICS as topicData } from "./index.js";
import { makeQuestion } from "../../year1Science/engine.js";
import { validateQuestion } from "../../questionKinds.js";

const { images } = JSON.parse(readFileSync(new URL("../../../../assets/history/manifest.json", import.meta.url), "utf8"));
const knownIds = new Set(year4HistoryCurriculum.flatMap((c) => c.topics.map((t) => t.id)));
const age = HISTORY_AGE[4];

function correctResponse(q) {
  if (q.kind === "sort") return Object.fromEntries(q.cards.map((c) => [c.id, c.bin]));
  if (q.kind === "order") return q.answer.map((id) => q.items.find((item) => item.id === id));
  return q.answer;
}

test("Year 4 History: every built topic is a real dataset topic and passes the History lint", () => {
  assert.ok(Object.keys(builders).length === 18);
  for (const [id, topic] of Object.entries(topicData)) {
    assert.ok(knownIds.has(id), id);
    assert.equal(topic.year, 4);
    assert.deepEqual(lintHistoryTopic(topic, { images }), [], id);
  }
});

test("Year 4 History: fair questions, from the rng only, and runs vary", () => {
  for (const [id, build] of Object.entries(builders)) {
    const questions = (level, rng) => build(level, rng).questions;
    assert.deepEqual(lintBuild(questions, { year: 4, titles: HISTORY_TITLES[4], seeds: 100, minQuestions: age.rounds }), [], id);
    for (let level = 1; level <= 4; level++) {
      assert.deepEqual(build(level, seededRng(17)), build(level, seededRng(17)), `${id} ${level}: randomness only from rng`);
      assert.notDeepEqual(JSON.stringify(build(level, seededRng(1))), JSON.stringify(build(level, seededRng(456))), `${id} ${level}: identical replays`);
      for (const q of build(level, seededRng(17)).questions) assert.equal(isCorrect(q, initialResponse(q)), false, `${id}: starts at the answer`);
    }
  }
});

test("Year 4 History: no question repeats within a run, and every one accepts its answer", () => {
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

test("Year 4 History: every built topic has four wrappers that forward completion", () => {
  for (const id of Object.keys(builders)) for (const level of [1, 2, 3, 4]) {
    const name = id.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join("");
    const file = new URL(`../../../../pages/skills/history/challenges/year4/${id}/${name}Challenge${level}.jsx`, import.meta.url);
    assert.ok(existsSync(file), file.pathname);
    const source = readFileSync(file, "utf8");
    assert.ok(source.includes(`level={${level}}`) && source.includes(`topicId="${id}"`) && source.includes("onComplete={onComplete}"), file.pathname);
  }
});

test("Year 4 History: all 18 topics are built in permanent dataset order", () => {
  assert.deepEqual(Object.keys(builders), [...knownIds]);
});

test("Year 4 History: every choice has three options, every run has a hint, and long orders stack", () => {
  for (const [id, build] of Object.entries(builders)) for (const level of [1, 2, 3, 4]) {
    for (const q of build(level, seededRng(23)).questions) {
      assert.ok(q.hint, `${id}/${level}: no retry support`);
      if (q.kind === "choice") assert.equal(q.options.length, 3, id);
      if (q.kind === "order") assert.equal(q.direction, "vertical", id);
    }
  }
});

test("Year 4 History: every authored template rejects wrong responses without changing its data", () => {
  for (const [id, topic] of Object.entries(topicData)) {
    const before = structuredClone(topic);
    for (const [level, plan] of Object.entries(topic.levels)) {
      for (const name of new Set(plan.rounds)) for (const template of topic.banks[name]) {
        const q = makeQuestion({ count: 3, ...template }, seededRng(41), Number(level));
        assert.deepEqual(validateQuestion(q, { year: 4 }), [], `${id}/${level}: ${q.prompt}`);
        assert.equal(isCorrect(q, correctResponse(q)), true, `${id}/${level}: ${q.prompt}`);
        if (q.kind === "choice") {
          for (const wrong of q.options.filter((option) => option !== q.answer)) {
            assert.equal(isCorrect(q, wrong), false, `${id}: accepted ${wrong}`);
          }
        } else if (q.kind === "sort") {
          const response = correctResponse(q);
          const card = q.cards[0];
          response[card.id] = q.bins.find((bin) => bin.id !== card.bin).id;
          assert.equal(isCorrect(q, response), false, `${id}: accepted misplaced card`);
          assert.equal(isReady(q, {}), false, `${id}: empty sorting was ready`);
        } else if (q.kind === "order") {
          assert.equal(isCorrect(q, correctResponse(q).reverse()), false, `${id}: accepted reversed chronology`);
        }
      }
      // Constant RNGs exercise shuffle endpoints without relying on chance.
      for (const rng of [() => 0, () => 1 - Number.EPSILON]) {
        assert.equal(builders[id](Number(level), rng).questions.length, 5);
      }
    }
    assert.deepEqual(topic, before, `${id}: building or marking mutated shared topic data`);
  }
});
