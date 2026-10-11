import test from "node:test";
import assert from "node:assert/strict";
import { year2ScienceCurriculum } from "../../year2ScienceCurriculum.js";
import { initialResponse, isCorrect, isReady, lintBuild, seededRng } from "../questionKinds.js";
import { YEAR2_SCIENCE_BUILDERS as builders, YEAR2_SCIENCE_TITLES } from "./index.js";

const topics = year2ScienceCurriculum.flatMap((c) => c.topics);
const questions = (id, level, seed) => builders[id](level, seededRng(seed));
const VISUALS = new Set(["chain", "growth", "pots"]);
const POT_STATES = new Set(["healthy", "pale", "droopy"]);
const all = function* () {
  for (const id of Object.keys(builders)) for (let l = 1; l <= 4; l++) for (let seed = 1; seed <= 30; seed++) for (const q of questions(id, l, seed)) yield [id, q];
};

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

test("Year 2 Science: every topic has a builder, five fair questions per level", () => {
  assert.deepEqual(Object.keys(builders).sort(), topics.map((t) => t.id).sort());
  for (const [id, build] of Object.entries(builders)) {
    assert.deepEqual(lintBuild(build, { year: 2, titles: YEAR2_SCIENCE_TITLES, seeds: 100, minQuestions: 5 }), [], id);
    for (let level = 1; level <= 4; level++) {
      const random = Math.random;
      Math.random = () => { throw new Error("use the injected rng"); };
      let run;
      try { run = questions(id, level, 17); } finally { Math.random = random; }
      assert.equal(run.length, 5, `${id} level ${level}`);
      assert.deepEqual(run, questions(id, level, 17), "randomness must come only from the injected rng");
      for (const q of run) assert.equal(isCorrect(q, initialResponse(q)), false, `${id}: starts at the answer`);
    }
  }
});

test("Year 2 Science: no question repeats within a run, and runs vary", () => {
  for (const id of Object.keys(builders)) for (let level = 1; level <= 4; level++) for (let seed = 1; seed <= 40; seed++) {
    // Charts and pot pairs are generated, so two can coincide; authored templates never repeat.
    const authored = questions(id, level, seed)
      .filter((q) => !q.chart && q.visual?.type !== "pots")
      .map((q) => JSON.stringify([q.prompt, q.answer, q.picture, q.visual, q.bins, (q.items ?? q.cards ?? []).map((i) => i.label).sort()]));
    assert.equal(new Set(authored).size, authored.length, `${id} level ${level} seed ${seed}: repeated question`);
    const prompts = questions(id, level, seed).map((q) => JSON.stringify([q.prompt, q.answer, q.ask, (q.items ?? q.cards ?? []).map((i) => i.label).sort()]));
    assert.equal(new Set(prompts).size, prompts.length, `${id} level ${level} seed ${seed}: the same screen twice`);
  }
  for (const id of Object.keys(builders)) {
    const kinds = new Set([1, 2, 3, 4].flatMap((l) => questions(id, l, 13).map((q) => q.kind)));
    assert.ok(kinds.size >= 3, `${id}: too few kinds of interaction`);
    assert.ok([1, 2, 3, 4].every((l) => JSON.stringify(questions(id, l, 1)) !== JSON.stringify(questions(id, l, 456))), `${id}: identical replays`);
  }
});

test("Year 2 Science: every generated question accepts a complete correct response", () => {
  for (const [id, q] of all()) {
    const response = correctResponse(q);
    assert.equal(isReady(q, response), true, id);
    assert.equal(isCorrect(q, response), true, id);
  }
});

test("Year 2 Science: drawings agree with their answers", () => {
  for (const [id, q] of all()) {
    const v = q.visual;
    if (!v) continue;
    assert.ok(VISUALS.has(v.type), `${id}: unknown visual ${v.type}`);
    if (v.type === "growth") {
      assert.ok([0, 1, 2, 3].includes(v.stage), id);
      if (q.kind === "choice") assert.equal(q.answer, ["a seed", "a sprouting seed", "a seedling", "a mature plant"][v.stage], q.prompt);
    }
    if (v.type === "chain") {
      assert.equal(new Set(v.links).size, v.links.length, "repeated link");
      // Wrong options may repeat a link on show: that tests which way the arrows point.
      if (v.gap !== undefined) assert.equal(q.answer, v.links[v.gap], "the gap holds the answer");
    }
    if (v.type === "pots") {
      assert.equal(v.plants.length, 2);
      assert.ok(v.plants.every((s) => POT_STATES.has(s)), id);
      assert.equal(v.plants.filter((s) => s === "healthy").length, 1, "exactly one healthy plant");
      const healthy = v.plants[0] === "healthy" ? "Plant A" : "Plant B";
      // potPair gives the "find the healthy plant" questions their own hint.
      const wantsHealthy = q.hint.startsWith("A healthy plant");
      assert.equal(q.answer === healthy, wantsHealthy, q.prompt);
    }
  }
});

test("Year 2 Science: every food chain starts with a plant and the chain orders match", () => {
  const PLANTS = new Set(["grass", "lettuce", "leaves", "seeds"]);
  for (const [id, q] of all()) {
    if (q.visual?.type === "chain") assert.ok(PLANTS.has(q.visual.links[0]), q.visual.links.join(" → "));
    if (id === "simple-food-chains" && q.kind === "order") {
      const first = q.items.find((item) => item.id === q.answer[0]);
      assert.ok(PLANTS.has(first.label), first.label);
    }
  }
});

test("Year 2 Science: no rule or hint gives the answer away", () => {
  const problems = [];
  for (const [id, q] of all()) {
    if (typeof q.answer !== "string" || q.answer.length < 4 || /^Plant [AB]$/.test(q.answer)) continue;
    // A rule that defines every option ("living", "dead", "never alive") is fair;
    // one that names only the answer hands it over.
    const names = (field, word) => (q[field] ?? "").toLowerCase().includes(word.toLowerCase());
    for (const field of ["rule", "hint"]) {
      const leaks = names(field, q.answer) && !(q.options ?? []).filter((o) => o !== q.answer).every((o) => names(field, o));
      if (leaks) problems.push(`${id}: the ${field} names "${q.answer}" — ${q.prompt}`);
    }
  }
  assert.deepEqual([...new Set(problems)], []);
});

test("Year 2 Science: bar charts stay within ten gridlines", () => {
  for (const [id, q] of all()) if (q.chart) {
    const step = q.chart.step ?? 1;
    const top = Math.max(...q.chart.rows.map((r) => r.value), step);
    assert.ok(Math.ceil(top / step) <= 10, `${id}: ${Math.ceil(top / step)} gridlines overflow the plot — ${q.prompt}`);
  }
});

test("Year 2 Science: a run never shows the same food chain twice", () => {
  for (let level = 1; level <= 4; level++) for (let seed = 1; seed <= 60; seed++) {
    const chains = questions("simple-food-chains", level, seed).filter((q) => q.visual?.type === "chain").map((q) => q.visual.links.join(">"));
    assert.equal(new Set(chains).size, chains.length, `level ${level} seed ${seed}`);
  }
});
