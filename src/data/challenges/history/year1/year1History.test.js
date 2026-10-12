import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { initialResponse, isCorrect, isReady, lintBuild, seededRng } from "../../questionKinds.js";
import { HISTORY_AGE, HISTORY_TITLES, lintHistoryTopic } from "../engine.js";
import { year1HistoryCurriculum } from "../../../year1HistoryCurriculum.js";
import { YEAR1_HISTORY_BUILDERS as builders, YEAR1_HISTORY_TOPICS as topicData } from "./index.js";

const { images } = JSON.parse(readFileSync(new URL("../../../../assets/history/manifest.json", import.meta.url), "utf8"));
const knownIds = new Set(year1HistoryCurriculum.flatMap((c) => c.topics.map((t) => t.id)));
const age = HISTORY_AGE[1];

function correctResponse(q) {
  if (q.kind === "sort") return Object.fromEntries(q.cards.map((c) => [c.id, c.bin]));
  if (q.kind === "order") return q.answer.map((id) => q.items.find((item) => item.id === id));
  return q.answer;
}

test("Year 1 History: every built topic is a real dataset topic and passes the History lint", () => {
  assert.ok(Object.keys(builders).length >= 1);
  for (const [id, topic] of Object.entries(topicData)) {
    assert.ok(knownIds.has(id), id);
    assert.equal(topic.year, 1);
    assert.deepEqual(lintHistoryTopic(topic, { images }), [], id);
  }
});

test("Year 1 History: fair questions, from the rng only, and runs vary", () => {
  for (const [id, build] of Object.entries(builders)) {
    const questions = (level, rng) => build(level, rng).questions;
    assert.deepEqual(lintBuild(questions, { year: 1, titles: HISTORY_TITLES[1], seeds: 100, minQuestions: age.rounds }), [], id);
    for (let level = 1; level <= 4; level++) {
      assert.deepEqual(build(level, seededRng(17)), build(level, seededRng(17)), `${id} ${level}: randomness only from rng`);
      assert.notDeepEqual(JSON.stringify(build(level, seededRng(1))), JSON.stringify(build(level, seededRng(456))), `${id} ${level}: identical replays`);
      for (const q of build(level, seededRng(17)).questions) assert.equal(isCorrect(q, initialResponse(q)), false, `${id}: starts at the answer`);
    }
  }
});

test("Year 1 History: no question repeats within a run, and every one accepts its answer", () => {
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

test("Year 1 History: every built topic has four wrappers that forward completion", () => {
  for (const id of Object.keys(builders)) for (const level of [1, 2, 3, 4]) {
    const name = id.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join("");
    const file = new URL(`../../../../pages/skills/history/challenges/year1/${id}/${name}Challenge${level}.jsx`, import.meta.url);
    assert.ok(existsSync(file), file.pathname);
    const source = readFileSync(file, "utf8");
    assert.ok(source.includes(`level={${level}}`) && source.includes(`topicId="${id}"`) && source.includes("onComplete={onComplete}"), file.pathname);
  }
});

// Review finding (2026-10-12): today's grandparents (born about 1955–1975) had
// plastic toys, battery toys and early video games, so the grandparents' levels
// must never mark those as "today only" or offer them as wrong answers.
test("Toys Then and Now: nothing grandparents also had is marked 'today only'", async () => {
  const { toysThenAndNow: topic } = await import("./toysThenAndNow.js");
  const hadIt = /plastic|batter|video game|games console/i;
  for (const level of [1, 2, 3, 4]) {
    const { story, rounds } = topic.levels[level];
    const aboutGrandparents = /grandparent/i.test(story.lines.join(" "));
    if (aboutGrandparents) assert.ok(!/plastic/i.test(story.lines.join(" ")), `level ${level} story contrasts plastic with grandparents' toys`);
    for (const name of new Set(rounds)) for (const t of topic.banks[name]) {
      if (t.type === "sort" && aboutGrandparents) for (const [label, bin] of t.cards) assert.ok(!(bin === "now" && hadIt.test(label)), `${name}: "${label}" sorted as today only`);
      if (t.type === "choice" && /grandparent/i.test(t.prompt)) for (const wrong of t.wrong) assert.ok(!hadIt.test(wrong), `${name}: "${wrong}" offered as wrong in "${t.prompt}"`);
    }
  }
});

test("Year 1 History: every dataset topic is built, in dataset order", () => {
  assert.deepEqual(Object.keys(builders), [...knownIds]);
});
