import test from "node:test";
import assert from "node:assert/strict";
import { YEAR4_SCIENCE_TOPICS as topics, YEAR4_SCIENCE_BUILDERS as builders, YEAR4_SCIENCE_TITLES as titles } from "./index.js";
import { lintBuild, seededRng, initialResponse, isCorrect, isReady } from "../questionKinds.js";
import { isScienceAnswerCorrect } from "./engine.js";
import { normaliseAnswer } from "../english/shared.js";

function answer(q) {
  if (q.kind === "sort") return Object.fromEntries(q.cards.map(c => [c.id, c.bin]));
  if (q.kind === "order") return q.answer.map(id => q.items.find(item => item.id === id));
  if (q.kind === "build") {
    const available = [...q.tiles];
    return q.answer.split(" ").map(label => {
      const i = available.findIndex(tile => tile.label === label);
      return available.splice(i, 1)[0].id;
    });
  }
  return q.kind === "number" ? String(q.answer) : q.answer;
}

test("all Year 4 banks are fair over 50 seeds and preserve their source data", () => {
  const before = JSON.stringify(topics);
  for (const [id, build] of Object.entries(builders)) {
    assert.deepEqual(lintBuild(build, { year: 4, titles, minQuestions: 5 }), [], id);
    for (let level = 1; level <= 4; level++) {
      const runs = new Set();
      for (let seed = 1; seed <= 50; seed++) {
        const run = build(level, seededRng(seed));
        runs.add(JSON.stringify(run));
        assert.equal(run.length, 5, id);
        assert.deepEqual(run, build(level, seededRng(seed)));
        assert.equal(new Set(run.map(q => `${q.prompt}/${q.text ?? ""}`)).size, 5, `${id}/${level} repeats a task`);
        for (const q of run) {
          assert.equal(isReady(q, initialResponse(q)), q.kind === "order");
          assert.equal(isCorrect(q, initialResponse(q)), false, `${id} starts correct`);
          assert.equal(isReady(q, answer(q)), true);
          assert.equal(isCorrect(q, answer(q)), true);
          assert.equal(isScienceAnswerCorrect(q, answer(q)), true);
          if (q.kind === "choice") for (const option of q.options.filter(o => o !== q.answer)) assert.equal(isCorrect(q, option), false);
          if (q.kind === "sort") for (const card of q.cards) {
            const other = q.bins.find(b => b.id !== card.bin).id;
            assert.equal(isCorrect(q, { ...answer(q), [card.id]: other }), false);
          }
          if (q.kind === "order") assert.equal(isCorrect(q, [...answer(q)].reverse()), false);
          if (q.kind === "number") assert.equal(isCorrect(q, String(q.answer + 1)), false);
        }
        if (level === 1) assert.ok(run.every(q => q.rule));
        if (level === 3) assert.ok(run.every(q => ["sort", "build", "order"].includes(q.kind)));
        if (level === 4) assert.equal(run.filter(q => ["sort", "build", "order"].includes(q.kind)).length, 2);
      }
      assert.ok(runs.size > 10, `${id}/${level} lacks replay variation`);
    }
    for (const level of [0, 5, "1", null]) assert.throws(() => build(level), RangeError);
  }
  assert.equal(JSON.stringify(topics), before);
});

test("key routes, feeding relationships and supplied measurements agree with their evidence", () => {
  const key = topics["classification-keys"].enquiries;
  assert.deepEqual(key.slice(0, 4).map(q => q.answer), ["Robin", "Beetle", "Snail", "Earthworm"]);
  assert.equal(key[4].answer, 3);
  assert.equal(key[5].answer, 1);
  for (const q of topics["food-chains"].structures) {
    for (let i = 1; i < q.labels.length; i++) assert.ok(q.text.includes(`${q.labels[i]} eats ${q.labels[i - 1].toLowerCase()}.`));
  }
  for (const q of topics["heating-and-cooling"].enquiries.filter(q => q.kind === "number")) {
    const rows = Object.fromEntries(q.table.rows);
    assert.equal(q.answer, q.prompt.includes("higher") ? rows.C - rows.B : rows.B);
  }
  const water = topics["evaporation-and-condensation"].enquiries[0];
  assert.equal(water.answer, water.table.rows[0][1] - water.table.rows[0][2]);
  const birds = topics["changing-environments"].enquiries.find(q => q.kind === "number");
  assert.equal(birds.answer, 18 - 11);
});

test("circuit predictions follow depicted continuity and switch positions", () => {
  for (const id of ["complete-and-incomplete-circuits", "switches"]) {
    const topic = topics[id];
    for (const q of [...topic.facts, ...topic.enquiries].filter(q => q.visual?.type === "circuit")) {
      assert.equal(q.answer, q.visual.closed ? "The bulb lights" : "The bulb stays off");
      if (id === "switches") assert.equal(q.visual.switch, true);
    }
  }
  assert.ok(topics["solids-liquids-and-gases"].facts.some(q => q.prompt.includes("water vapour") && q.answer === "Gas"));
  assert.ok(topics["changing-pitch"].enquiries.some(q => q.answer.includes("volume and pitch are different")));
  assert.ok(topics["conductors-and-insulators"].enquiries.some(q => q.answer === "Do not test it with mains electricity"));
});

test("reviewed sentence alternatives use every tile once and reject incorrect science", () => {
  const seen = new Set();
  const bare = word => normaliseAnswer(word).replace(/[.,]/g, "");
  for (const build of Object.values(builders)) for (const level of [3, 4]) for (let seed = 1; seed <= 50; seed++) {
    for (const q of build(level, seededRng(seed)).filter(q => q.kind === "build")) {
      seen.add(q.prompt);
      const correct = answer(q);
      assert.equal(isScienceAnswerCorrect(q, correct), true);
      assert.equal(isScienceAnswerCorrect(q, correct.slice(1)), false);
      assert.equal(isScienceAnswerCorrect(q, [...correct, correct[0]]), false);
      assert.equal(isScienceAnswerCorrect(q, correct.map(() => correct[0])), false);
      assert.equal(isScienceAnswerCorrect(q, [...correct.slice(1), "unknown-tile"]), false);
      assert.equal(isScienceAnswerCorrect(q, [...correct].reverse()), false);
      for (const alternative of q.alternatives ?? []) {
        const available = [...q.tiles];
        const response = alternative.split(" ").map(word => {
          const i = available.findIndex(tile => bare(tile.label) === bare(word));
          assert.ok(i >= 0, `${q.prompt}: alternative cannot use ${word}`);
          return available.splice(i, 1)[0].id;
        });
        assert.equal(available.length, 0);
        assert.equal(isScienceAnswerCorrect(q, response), true, alternative);
      }
    }
  }
  const authored = Object.values(topics).flatMap(t => [...t.structures, ...t.enquiries]).filter(q => q.kind === "build");
  assert.deepEqual([...seen].sort(), [...new Set(authored.map(q => q.prompt))].sort());
});

test("circuit inspection assesses useful checks without imposing an arbitrary sequence", () => {
  const task = topics["complete-and-incomplete-circuits"].structures[0];
  assert.equal(task.kind, "sort");
  for (const label of ["Trace the wires for gaps", "Check both cell terminals and bulb connections", "Check the cell and bulb work"]) {
    assert.equal(task.cards.find(c => c.label === label).bin, task.bins[0].id);
  }
});

test("sentence flexibility still rejects reversed scientific relationships", () => {
  const melting = Object.values(builders).flatMap(build => build(3, () => 0)).find(q => q.answer === "Melting changes a solid into a liquid.");
  const correct = answer(melting);
  const solid = correct.findIndex(id => melting.tiles.find(t => t.id === id).label === "solid");
  const liquid = correct.findIndex(id => melting.tiles.find(t => t.id === id).label === "liquid.");
  const reversedStates = [...correct];
  [reversedStates[solid], reversedStates[liquid]] = [reversedStates[liquid], reversedStates[solid]];
  assert.equal(isScienceAnswerCorrect(melting, reversedStates), false);
});
