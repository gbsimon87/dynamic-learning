import test from "node:test";
import assert from "node:assert/strict";
import { year1ScienceCurriculum } from "../../year1ScienceCurriculum.js";
import { initialResponse, isCorrect, isReady, lintBuild, seededRng } from "../questionKinds.js";
import { YEAR1_SCIENCE_BUILDERS as builders, YEAR1_SCIENCE_TITLES } from "./index.js";

const topics = year1ScienceCurriculum.flatMap((c) => c.topics);
const questions = (id, level, seed) => builders[id](level, seededRng(seed));
const VISUALS = new Set(["plant", "tree", "treePair", "body", "days"]);
const PLANT_POINTS = new Set(["flower", "petal", "leaf", "stem", "roots", "bulb"]);
const TREE_POINTS = new Set(["trunk", "branch", "leaves", "roots", "fruit", "blossom"]);
const BODY_POINTS = new Set(["hair", "head", "eye", "ear", "nose", "mouth", "neck", "shoulder", "arm", "elbow", "hand", "leg", "knee", "foot"]);

function correctResponse(q) {
  if (q.kind === "sort") return Object.fromEntries(q.cards.map((c) => [c.id, c.bin]));
  if (q.kind === "order") return q.answer.map((id) => q.items.find((item) => item.id === id));
  if (q.kind === "build") {
    const available = [...q.tiles];
    const labels = q.letters ? [...q.answer] : q.answer.split(" ");
    return labels.map((label) => available.splice(available.findIndex((t) => t.label === label), 1)[0].id);
  }
  return q.options ? q.answer : String(q.answer);
}

test("Year 1 Science: every topic has a builder, five fair questions per level", () => {
  assert.deepEqual(Object.keys(builders).sort(), topics.map((t) => t.id).sort());
  for (const [id, build] of Object.entries(builders)) {
    assert.deepEqual(lintBuild(build, { year: 1, titles: YEAR1_SCIENCE_TITLES, seeds: 100, minQuestions: 5 }), [], id);
    for (let level = 1; level <= 4; level++) {
      const run = questions(id, level, 17);
      assert.equal(run.length, 5, `${id} level ${level}`);
      assert.deepEqual(run, questions(id, level, 17), "randomness must come only from the injected rng");
      for (const q of run) assert.equal(isCorrect(q, initialResponse(q)), false, `${id}: starts at the answer`);
    }
  }
});

test("Year 1 Science: no question repeats within a run, and runs vary", () => {
  for (const id of Object.keys(builders)) for (let level = 1; level <= 4; level++) for (let seed = 1; seed <= 40; seed++) {
    // Charts and drawn pairs are generated, so two can coincide; authored templates never repeat.
    const authored = questions(id, level, seed)
      .filter((q) => !q.chart && !q.visual?.rows && q.visual?.type !== "treePair")
      .map((q) => JSON.stringify([q.prompt, q.answer, q.picture, q.visual, q.bins]));
    assert.equal(new Set(authored).size, authored.length, `${id} level ${level} seed ${seed}: repeated question`);
  }
  for (const id of Object.keys(builders)) {
    const kinds = new Set([1, 2, 3, 4].flatMap((l) => questions(id, l, 13).map((q) => q.kind)));
    assert.ok(kinds.size >= 3, `${id}: too few kinds of interaction`);
    assert.ok([1, 2, 3, 4].every((l) => JSON.stringify(questions(id, l, 1)) !== JSON.stringify(questions(id, l, 456))), `${id}: identical replays`);
  }
});

test("Year 1 Science: every generated question accepts a complete correct response", () => {
  for (const id of Object.keys(builders)) for (let l = 1; l <= 4; l++) for (let seed = 1; seed <= 30; seed++) for (const q of questions(id, l, seed)) {
    const response = correctResponse(q);
    assert.equal(isReady(q, response), true, id);
    assert.equal(isCorrect(q, response), true, id);
  }
});

test("Year 1 Science: diagrams name parts that the drawings can show", () => {
  for (const id of Object.keys(builders)) for (let l = 1; l <= 4; l++) for (let seed = 1; seed <= 30; seed++) for (const q of questions(id, l, seed)) {
    const v = q.visual;
    if (!v) continue;
    assert.ok(VISUALS.has(v.type), `${id}: unknown visual ${v.type}`);
    if (v.type === "plant" && v.point) assert.ok(PLANT_POINTS.has(v.point) && (v.point !== "bulb" || v.bulb), id);
    if (v.type === "tree" && v.point) {
      assert.ok(TREE_POINTS.has(v.point), id);
      if (v.point === "fruit") assert.equal(v.fruit, true);
      if (v.point === "blossom") assert.equal(v.season, "spring");
    }
    if (v.type === "body") assert.ok(BODY_POINTS.has(v.point), id);
    if (v.type === "days") for (const row of v.rows) assert.ok(Number.isInteger(row.light) && row.light % 2 === 0 && row.light > 0 && row.light < 24);
    if (q.kind === "number" && v.type === "days") assert.equal(q.answer, v.rows[0].light, "the count matches the drawn sun boxes");
    if (q.kind === "choice" && v.type === "days") {
      const [a, b] = v.rows;
      const longer = a.light > b.light ? a.label : b.label;
      const shorter = a.light > b.light ? b.label : a.label;
      const wantsShort = /fewer|winter/.test(q.prompt);
      assert.equal(q.answer, wantsShort ? shorter : longer, q.prompt);
    }
  }
});

test("Year 1 Science: day lengths and charts stay honest", () => {
  for (let seed = 1; seed <= 60; seed++) for (let l = 1; l <= 4; l++) {
    for (const q of questions("weather-and-the-seasons", l, seed)) if (q.chart) {
      assert.equal(q.chart.rows.reduce((sum, r) => sum + r.value, 0), 14, "two weeks of records");
    }
    for (const q of questions("day-length-through-the-year", l, seed)) if (q.kind === "order" && q.visual) {
      const lights = q.visual.rows.map((r) => r.light);
      assert.deepEqual([...lights].sort((a, b) => a - b), [8, 12, 16]);
      assert.notDeepEqual(lights, [8, 12, 16], "the picture must not already show the answer order");
    }
  }
});

test("Year 1 Science: the Sun safety warning is taught", () => {
  const seen = new Set();
  for (let seed = 1; seed <= 200; seed++) for (const q of questions("weather-and-the-seasons", 4, seed)) seen.add(q.answer);
  assert.ok(seen.has("No. Never look at the Sun, even with sunglasses."));
});
