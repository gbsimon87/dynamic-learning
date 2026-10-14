import test from "node:test";
import assert from "node:assert/strict";
import { seededRng } from "../questionKinds.js";
import { COINS, measurementBuilders as builders, moneyName, NOTES } from "./measurement.js";

const IDS = Object.keys(builders);
const SEEDS = Array.from({ length: 120 }, (_, i) => i + 1);
const run = (id, level, seed) => builders[id](level, seededRng(seed));
const fingerprint = q => JSON.stringify([q.prompt, q.visual, q.time, q.start, [...(q.options ?? [])].sort(), (q.items ?? []).map(i => i.label).sort(), (q.cards ?? []).map(c => c.label).sort()]);
/** The prompt with its numbers and names blanked: what the level is asking, not its details. */
const task = q => `${q.kind}/${q.mode ?? ""}/${q.prompt.replace(/\d+|£|p\b/g, "#").replace(/\b(Red|Blue|Green|Yellow|Bix|Maya|Leo|red|blue|green|yellow)\b/g, "_")}`;

test("no question repeats within a run, and runs differ between attempts", () => {
  for (const id of IDS) for (let level = 1; level <= 4; level++) {
    const runs = new Set();
    for (const seed of SEEDS) {
      const qs = run(id, level, seed);
      assert.equal(qs.length, 5, `${id} ${level}`);
      assert.equal(new Set(qs.map(fingerprint)).size, 5, `${id} level ${level} seed ${seed} repeats a question`);
      runs.add(qs.map(fingerprint).join("|"));
    }
    assert.ok(runs.size > SEEDS.length / 2, `${id} level ${level} hardly varies`);
  }
});

test("no two levels of a topic ask the same task", () => {
  for (const id of IDS) {
    const tasks = [1, 2, 3, 4].map(level => new Set(SEEDS.slice(0, 30).flatMap(seed => run(id, level, seed).map(task))));
    for (let a = 0; a < 4; a++) for (let b = a + 1; b < 4; b++) {
      const shared = [...tasks[a]].filter(t => tasks[b].has(t));
      assert.deepEqual(shared, [], `${id}: levels ${a + 1} and ${b + 1} share a task`);
    }
  }
});

test("answers are not given away by position, colour, name or alternation", () => {
  for (const id of IDS) for (let level = 1; level <= 4; level++) {
    const answers = new Set(), positions = new Set();
    let alternating = 0, checked = 0;
    for (const seed of SEEDS) {
      const qs = run(id, level, seed).filter(q => q.kind === "choice");
      for (const q of qs) {
        answers.add(String(q.answer).replace(/ (ribbon|bag|jug)$/, ""));
        positions.add(q.options.indexOf(q.answer));
      }
      if (qs.length === 5 && new Set(qs.map(q => q.answer)).size === 2) {
        checked++;
        if (qs.every((q, i) => i === 0 || q.answer !== qs[i - 1].answer)) alternating++;
      }
    }
    if (!answers.size) continue;
    assert.ok(answers.size >= 2, `${id} ${level}: always the same answer`);
    assert.ok(positions.size >= 2, `${id} ${level}: answer always in one place`);
    if (checked) assert.ok(alternating < checked / 2, `${id} ${level}: answers alternate`);
  }
  // Slot 1 comparisons ask for the bigger and the smaller one, whichever colour that is.
  for (const id of IDS.slice(0, 3)) {
    const seen = new Set();
    for (const seed of SEEDS) for (const q of run(id, 1, seed)) seen.add(`${/longer|heavier|more/.test(q.prompt)}:${q.answer}`);
    assert.ok(seen.size >= 8, id);
  }
});

test("mass and capacity are recorded on realistic standard scales, not counted cubes or cups", () => {
  for (const seed of SEEDS) {
    for (const q of run("comparing-and-measuring-mass", 4, seed)) {
      assert.equal(q.visual.type, "instrument");
      if (q.visual.unit === "kg") assert.ok(q.visual.max === 10 && q.answer >= 1 && q.answer <= 9);
      else assert.ok(q.visual.unit === "g" && q.visual.max === 1000 && q.answer % 100 === 0 && q.answer >= 200 && q.answer <= 900);
    }
    for (const q of run("comparing-and-measuring-capacity", 4, seed)) {
      assert.equal(q.visual.type, "instrument");
      if (q.visual.unit === "litres") assert.ok(q.visual.max === 10 && !/jug/.test(q.prompt));
      else assert.ok(q.visual.unit === "ml" && q.answer % 100 === 0 && q.answer <= 900 && /jug/.test(q.prompt));
    }
    for (const q of run("comparing-and-measuring-lengths-and-heights", 4, seed)) {
      assert.equal(q.visual.max, 15);
      assert.ok(q.answer >= 2 && q.answer <= 14);
      assert.equal(/tall/.test(q.prompt), q.visual.vertical);
    }
  }
});

test("capacity slot 2 shows each fill word once and asks to find one jug", () => {
  for (const seed of SEEDS) {
    const qs = run("comparing-and-measuring-capacity", 2, seed);
    const single = qs.filter(q => !q.visual.jugs).map(q => q.visual.fill).sort();
    assert.deepEqual(single, [0, 1, 2, 4]);
    const find = qs.find(q => q.visual.jugs);
    assert.equal(new Set(find.visual.jugs.map(j => j.fill)).size, 3);
  }
});

test("time: plural unit words, worked answers and both directions", () => {
  for (const seed of SEEDS) {
    for (const q of run("measuring-and-comparing-time", 1, seed)) assert.deepEqual([...q.options].sort(), ["hours", "minutes", "seconds"]);
    for (const q of run("measuring-and-comparing-time", 4, seed)) {
      const n = q.prompt.match(/\d+/g).map(Number);
      const expected = /hours/.test(q.prompt) || /quicker/.test(q.prompt) ? n[1] - n[0] : n[0] + n[1];
      assert.equal(q.answer, expected, q.prompt);
      assert.ok(q.answer >= 1 && q.answer <= 20);
    }
  }
});

test("coins: pence first, pound traps next, and the applied level compares values", () => {
  const letters = new Set();
  for (const seed of SEEDS) {
    for (const q of run("recognising-coins", 1, seed)) {
      assert.ok(q.visual.values.every(v => v < 100));
      assert.equal(moneyName(q.visual.values["ABC".indexOf(q.answer)]), q.prompt.match(/is (\d+p)\?/)[1]);
      letters.add(q.answer);
    }
    const second = run("recognising-coins", 2, seed);
    assert.ok(second.some(q => q.visual.value >= 100));
    for (const q of second) {
      assert.equal(q.options.length, 4);
      if (q.visual.value >= 100) assert.ok(q.options.includes(`${q.visual.value / 100}p`), "a pound coin offers the same digit in pence");
    }
    for (const q of run("recognising-coins", 4, seed)) {
      const values = q.visual.values, most = /most/.test(q.prompt);
      assert.equal(q.answer, moneyName(most ? Math.max(...values) : Math.min(...values)));
      assert.ok(values.every(v => COINS.includes(v)));
    }
  }
  assert.deepEqual([...letters].sort(), ["A", "B", "C"]);
});

test("notes: find, compare, order with coins, then count in fives and tens", () => {
  for (const seed of SEEDS) {
    for (const q of run("recognising-notes", 1, seed)) if (q.visual.labels) assert.equal(`£${q.visual.values["ABC".indexOf(q.answer)]}`, q.prompt.match(/£\d+/)[0]);
    for (const q of run("recognising-notes", 2, seed)) {
      const values = q.visual.values;
      assert.equal(q.answer, `£${/most/.test(q.prompt) ? Math.max(...values) : Math.min(...values)}`);
    }
    for (const q of run("recognising-notes", 3, seed)) {
      assert.ok(q.items.some(i => /coin/.test(i.label)) && q.items.some(i => /note/.test(i.label)));
      q.visual.items.forEach((item, i) => assert.equal(q.items[i].label, `${item.note ? `£${item.value}` : moneyName(item.value)} ${item.note ? "note" : "coin"}`));
    }
    for (const q of run("recognising-notes", 4, seed)) {
      const [first] = q.visual.values;
      assert.ok([5, 10].includes(first) && q.visual.values.every(v => v === first) && NOTES.includes(first));
      assert.ok(q.answer <= 50);
    }
  }
});

test("dates and events stay short: at most four options, no full list of seven days", () => {
  for (const id of ["sequencing-events", "days-months-and-years"]) for (let level = 1; level <= 4; level++) for (const seed of SEEDS) {
    for (const q of run(id, level, seed)) if (q.options) assert.ok(q.options.length <= 4, `${id} ${level}`);
  }
});

test("clocks: o'clock first, both kinds next, then set and work out a later time", () => {
  for (const seed of SEEDS) {
    for (let level = 1; level <= 4; level++) {
      const qs = run("oclock-and-half-past", level, seed);
      const shown = qs.map(q => (level === 4 ? q.start.hour : q.time.hour));
      assert.equal(new Set(shown).size, 5, "hours repeat in a run");
      if (level === 1) assert.ok(qs.every(q => q.time.minute === 0 && q.options.every(o => /o'clock/.test(o))));
      if (level === 2) assert.ok(qs.some(q => q.time.minute === 30) && qs.some(q => q.time.minute === 0));
    }
    for (const q of run("oclock-and-half-past", 4, seed)) {
      const add = /1 hour/.test(q.prompt) ? 60 : 30;
      const minutes = t => (t.hour % 12) * 60 + t.minute;
      assert.equal((minutes(q.start) + add) % 720, minutes(q.time), q.prompt);
    }
  }
});
