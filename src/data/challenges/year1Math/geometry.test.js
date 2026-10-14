import test from "node:test";
import assert from "node:assert/strict";
import { lintBuild, seededRng } from "../questionKinds.js";
import { geometryBuilders as builders, shapeName } from "./geometry.js";
import { YEAR1_MATH_TITLES } from "./index.js";

const ids = Object.keys(builders);
const run = (id, level, seed) => builders[id](level, seededRng(seed));
const signature = q => JSON.stringify({ ...q, options: q.options && [...q.options].sort(), cards: q.cards && [...q.cards].map(c => c.id).sort(), items: q.items && q.items.map(i => i.label).sort() });
const STEP = { up: [0, -1], right: [1, 0], down: [0, 1], left: [-1, 0] };

test("geometry builders pass the question linter over 200 seeds", () => {
  for (const id of ids) assert.deepEqual(lintBuild(builders[id], { year: 1, titles: YEAR1_MATH_TITLES, seeds: 200, minQuestions: 5 }), [], id);
});

test("no question repeats inside a run, and runs vary between attempts", () => {
  for (const id of ids) for (let level = 1; level <= 4; level++) {
    const runs = new Set();
    for (let seed = 1; seed <= 60; seed++) {
      const questions = run(id, level, seed);
      assert.equal(questions.length, 5);
      assert.equal(new Set(questions.map(signature)).size, 5, `${id} ${level} seed ${seed}: repeated question`);
      runs.add(JSON.stringify(questions));
    }
    assert.ok(runs.size > 40, `${id} ${level}: runs barely vary (${runs.size})`);
  }
});

test("the four levels ask different tasks", () => {
  for (const id of ids) {
    const tasks = [1, 2, 3, 4].map(level => {
      const q = run(id, level, 5)[0];
      return `${q.kind}|${q.visual?.type ?? "story"}|${q.visual?.arcs ?? ""}|${q.prompt.replace(/[0-9]+/g, "#").split(" ").slice(0, 3).join(" ")}`;
    });
    assert.equal(new Set(tasks).size, 4, `${id}: ${tasks.join(" / ")}`);
  }
});

test("choice answers are spread over every option position and are not alternating", () => {
  for (const id of ids) for (let level = 1; level <= 4; level++) {
    const positions = new Map(), answers = new Map();
    for (let seed = 1; seed <= 200; seed++) for (const q of run(id, level, seed)) if (q.kind === "choice") {
      const at = q.options.indexOf(q.answer);
      positions.set(at, (positions.get(at) ?? 0) + 1);
      answers.set(String(q.answer), (answers.get(String(q.answer)) ?? 0) + 1);
    }
    if (!positions.size) continue;
    const counts = [...positions.values()], total = counts.reduce((a, b) => a + b, 0);
    assert.ok(Math.min(...counts) > total / positions.size / 2, `${id} ${level}: answer position skewed ${[...positions]}`);
    assert.ok(answers.size >= 3, `${id} ${level}: answers barely vary`);
  }
});

test("shape naming always offers four options and never marks a wider true name wrong", () => {
  for (const id of ["recognising-2-d-shapes", "recognising-3-d-shapes"]) for (let seed = 1; seed <= 200; seed++) for (const level of [1, 4]) {
    for (const q of run(id, level, seed)) {
      assert.equal(q.options.length, 4);
      if (q.answer === "square") assert.ok(!q.options.includes("rectangle"));
      if (q.answer === "cube") assert.ok(!q.options.includes("cuboid"));
      if (level === 4) assert.ok(!q.visual && q.picture && !q.prompt.includes(q.answer), "slot 4 must not draw or name the shape");
      if (level === 1) assert.equal(q.visual.shapes[0].id && shapeName(q.visual.shapes[0].id), q.answer);
    }
  }
});

test("shape counting counts the drawn shapes, leaving out the wider family", () => {
  for (const id of ["recognising-2-d-shapes", "recognising-3-d-shapes"]) for (let seed = 1; seed <= 200; seed++) for (const q of run(id, 2, seed)) {
    const target = q.prompt.match(/many (\w+)s /)[1];
    const names = q.visual.shapes.map(s => shapeName(s.id));
    assert.equal(names.filter(n => n === target).length, q.answer);
    if (target === "rectangle") assert.ok(!names.includes("square"));
    if (target === "cuboid") assert.ok(!names.includes("cube"));
    assert.ok(q.visual.shapes.every(s => !s.label), "no names on the drawings");
  }
});

test("shape sorting uses fresh sets with each card in its true group", () => {
  const sets = new Set();
  for (const id of ["recognising-2-d-shapes", "recognising-3-d-shapes"]) for (let seed = 1; seed <= 100; seed++) for (const q of run(id, 3, seed)) {
    sets.add(q.visual.shapes.map(s => s.id).join());
    for (const card of q.cards) {
      const shape = q.visual.shapes.find(s => s.label === card.label);
      const name = shapeName(shape.id);
      assert.equal(card.bin, name === "square" ? "rectangle" : name === "cube" ? "cuboid" : name);
    }
    assert.ok(!/family|labelled/.test(q.prompt));
  }
  assert.ok(sets.size > 100);
});

test("position slot 1 answers match the board; slot 2 uses four place words", () => {
  const words = { "0,-1": "above", "0,1": "below", "-1,0": "to the left of", "1,0": "to the right of" };
  const places = new Set();
  for (let seed = 1; seed <= 200; seed++) {
    for (const q of run("describing-position", 1, seed)) {
      const [bear, star] = q.visual.objects;
      assert.equal(q.answer, words[`${star.x - bear.x},${star.y - bear.y}`]);
    }
    for (const q of run("describing-position", 2, seed)) {
      assert.equal(q.options.length, 4);
      assert.equal(q.answer, q.visual.place);
      places.add(q.answer);
    }
    for (const q of run("describing-position", 3, seed)) for (const card of q.cards) {
      const object = q.visual.objects.find(o => o.emoji === card.label.split(" ")[0]);
      const bin = { left: object.x < 1, right: object.x > 1, above: object.y < 1, below: object.y > 1 };
      assert.ok(bin[card.bin], `${card.label} is not ${card.bin}`);
    }
  }
  assert.deepEqual([...places].sort(), ["inside", "next to", "on top of", "under"]);
});

test("position slot 4 stories are answerable from the text and use three options", () => {
  for (let seed = 1; seed <= 200; seed++) for (const q of run("describing-position", 4, seed)) {
    assert.equal(q.options.length, 3);
    assert.ok(!q.visual);
    assert.ok(q.speak);
  }
});

test("movement: arrows, landings and routes match the board", () => {
  for (let seed = 1; seed <= 200; seed++) {
    for (const q of run("describing-movement", 1, seed)) {
      const [dx, dy] = STEP[q.answer];
      assert.deepEqual([q.visual.to.x - q.visual.from.x, q.visual.to.y - q.visual.from.y], [dx, dy]);
    }
    for (const q of run("describing-movement", 2, seed)) {
      const [, steps, dir] = q.prompt.match(/moves (\d) squares? (\w+)/);
      const [bear, target] = q.visual.objects;
      assert.deepEqual([target.x, target.y], [bear.x + STEP[dir][0] * steps, bear.y + STEP[dir][1] * steps]);
      assert.equal(q.options.length, 4);
    }
    for (const q of run("describing-movement", 3, seed)) {
      const dirs = q.prompt.match(/goes (\w+), then (\w+), then (\w+)/).slice(1);
      let [{ x, y }] = q.visual.objects;
      const met = dirs.map(d => { x += STEP[d][0]; y += STEP[d][1]; return q.visual.objects.find(o => o.x === x && o.y === y).emoji; });
      assert.deepEqual(q.answer.map(id => q.items.find(item => item.id === id).label.split(" ")[0]), met);
    }
    for (const q of run("describing-movement", 4, seed)) {
      assert.equal(q.kind, "number");
      assert.ok(q.answer >= 1 && q.answer <= 20);
      assert.ok(!/\b1 (steps|stones)\b/.test(q.prompt), q.prompt);
    }
  }
});

test("turns: every size appears, both directions, and ordering varies", () => {
  for (const level of [1, 2, 4]) {
    const sizes = new Set(), ways = new Set();
    for (let seed = 1; seed <= 100; seed++) for (const q of run("whole-half-quarter-and-three-quarter-turns", level, seed)) {
      sizes.add(q.visual.quarters); ways.add(q.visual.clockwise);
    }
    assert.deepEqual([...sizes].sort(), [1, 2, 3, 4]);
    assert.equal(ways.size, 2);
  }
  const seen = new Set();
  for (let seed = 1; seed <= 100; seed++) for (const q of run("whole-half-quarter-and-three-quarter-turns", 3, seed)) seen.add(q.items.map(i => i.label).join());
  assert.ok(seen.size > 30, "turn ordering never varies");
  // Slot 1 no longer runs quarter, half, three-quarter, whole, quarter every time.
  const firsts = new Set(Array.from({ length: 30 }, (_, s) => run("whole-half-quarter-and-three-quarter-turns", 1, s + 1).map(q => q.answer).join()));
  assert.ok(firsts.size > 10);
});
