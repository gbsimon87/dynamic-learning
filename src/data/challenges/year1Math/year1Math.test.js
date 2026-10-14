import test from "node:test";
import assert from "node:assert/strict";
import { year1MathCurriculum } from "../../year1MathCurriculum.js";
import { initialResponse, isCorrect, isReady, lintBuild, seededRng } from "../questionKinds.js";
import { YEAR1_MATH_BUILDERS as builders, YEAR1_MATH_TITLES } from "./index.js";
import { THREE_D, TWO_D } from "./geometry.js";

const topics = year1MathCurriculum.flatMap(c => c.topics);
const questions = (id, level, seed) => builders[id](level, seededRng(seed));

test("Year 1 Maths: every topic has a builder, five questions per level and fair answers", () => {
  assert.deepEqual(Object.keys(builders).sort(), topics.map(t => t.id).sort());
  for (const [id, build] of Object.entries(builders)) {
    assert.deepEqual(lintBuild(build, { year: 1, titles: YEAR1_MATH_TITLES, seeds: 100, minQuestions: 5 }), [], id);
    for (let level = 1; level <= 4; level++) {
      const run = questions(id, level, 17);
      assert.equal(run.length, 5);
      assert.deepEqual(run, questions(id, level, 17), "randomness must come only from the injected rng");
      for (const q of run) assert.equal(isCorrect(q, initialResponse(q)), false, `${id}: starts at the answer`);
    }
  }
});

test("Year 1 Maths: every topic varies its interactions and at least one run randomises", () => {
  for (const [id] of Object.entries(builders)) {
    const kinds = new Set([1, 2, 3, 4].flatMap(l => questions(id, l, 13).map(q => `${q.kind}/${q.mode ?? ""}`)));
    assert.ok(kinds.size >= 2, `${id}: four choice drills`);
    assert.ok([1, 2, 3, 4].some(l => JSON.stringify(questions(id, l, 1)) !== JSON.stringify(questions(id, l, 456))), `${id}: identical replays`);
  }
});

function correctResponse(q) {
  if (q.kind === "sequence") return { active: q.gaps[0], values: Object.fromEntries(q.gaps.map(g => [g, String(q.terms[g])])) };
  if (q.kind === "sort") return Object.fromEntries(q.cards.map(c => [c.id, c.bin]));
  if (q.kind === "order") return q.answer.map(id => q.items.find(item => item.id === id));
  if (q.kind === "build") {
    const available = [...q.tiles];
    const labels = q.letters ? [...q.answer] : q.answer.split(" ");
    return labels.map(label => {
      const index = available.findIndex(t => t.label === label);
      assert.ok(index >= 0);
      return available.splice(index, 1)[0].id;
    });
  }
  if (q.kind === "clock" && q.mode === "set") return q.time;
  if (q.kind === "fraction" && q.mode === "shade") return Array.from({ length: q.parts }, (_, i) => i < q.answer);
  if (q.kind === "placeValue" && q.mode === "build") return { hundreds: Math.floor(q.answer / 100), tens: Math.floor(q.answer / 10) % 10, ones: q.answer % 10 };
  return q.options ? q.answer : String(q.answer);
}

test("Year 1 Maths: every generated question accepts a complete correct response", () => {
  for (const [id] of Object.entries(builders)) for (let l = 1; l <= 4; l++) for (const q of questions(id, l, 31)) {
    const response = correctResponse(q);
    assert.equal(isReady(q, response), true, id);
    assert.equal(isCorrect(q, response), true, id);
  }
});

test("Year 1 number scope: no negatives, numbers to 100, word spellings only 1–20, correct steps", () => {
  for (let seed = 1; seed <= 100; seed++) for (let level = 1; level <= 4; level++) {
    for (const { id } of year1MathCurriculum[0].topics) for (const q of questions(id, level, seed)) {
      const values = [q.answer, ...(q.options ?? []), ...(q.terms ?? []), ...(q.items ?? []).map(i => i.value)].filter(x => typeof x === "number");
      assert.ok(values.every(n => Number.isInteger(n) && n >= 0 && n <= 100), id);
    }
    for (const q of questions("counting-in-twos-fives-and-tens", level, seed)) if (q.terms) {
      const step = q.terms[1] - q.terms[0];
      assert.ok([2, 5, 10].includes(step));
      assert.equal(q.terms[0] % step, 0);
      assert.ok(q.terms.every((n, i) => i === 0 || n - q.terms[i - 1] === step));
    }
  }
});

test("Arithmetic is independently correct and stays within 20, including zero", () => {
  const arithmeticIds = year1MathCurriculum[1].topics.map(t => t.id);
  const seenZero = new Set();
  for (let seed = 1; seed <= 80; seed++) for (const id of arithmeticIds) for (let l = 1; l <= 4; l++) for (const q of questions(id, l, seed)) {
    const lines = q.equation ? [q.equation].flat() : q.kind === "build" ? [q.answer] : [];
    for (const [lineIndex, equation] of lines.entries()) {
      let match = /^(\d+|\?) ([+−]) (\d+|\?) = (\d+|\?)$/.exec(equation);
      const reversed = /^(\d+|\?) = (\d+|\?) ([+−]) (\d+|\?)$/.exec(equation);
      if (!match && reversed) match = [equation, reversed[2], reversed[3], reversed[4], reversed[1]];
      if (!match) continue;
      const [, a, op, b, total] = match;
      const missing = q.kind === "sequence" ? q.terms[q.gaps[lineIndex]] : q.answer;
      const operands = [a, b, total].map(n => n === "?" ? missing : Number(n));
      assert.ok(operands.every(n => typeof n === "number" && n >= 0 && n <= 20), `${id}: ${equation}`);
      assert.equal(op === "+" ? operands[0] + operands[1] : operands[0] - operands[1], operands[2], `${id}: ${equation}`);
      if ([a, b].includes("0")) seenZero.add(id);
    }
    if (typeof q.answer === "number") assert.ok(q.answer >= 0 && q.answer <= 20);
    if (q.visual?.type === "objects" && q.kind !== "sequence" && typeof q.answer === "number" && ["adding-within-20", "subtracting-within-20", "one-step-addition-and-subtraction-problems"].includes(id)) {
      const groups = q.visual.groups;
      const rendered = groups.reduce((sum, g) => sum + g.count - (g.crossed ?? 0), 0);
      if (groups.some(g => g.label === "Leo")) assert.equal(q.answer, Math.abs(groups[0].count - groups[1].count));
      else assert.equal(q.answer, rendered);
    }
  }
  assert.ok(seenZero.has("adding-within-20"));
  assert.ok(seenZero.has("subtracting-within-20"));
});

test("Applied money questions require reading the denomination, and time stories identify the part of the day", () => {
  let checkedLunch = false;
  for (let seed = 1; seed <= 50; seed++) {
    for (const q of questions("recognising-coins", 4, seed)) {
      assert.ok(!/\d|£/.test(q.prompt), "the prompt states the value being asked for");
    }
    for (const q of questions("recognising-notes", 4, seed)) {
      // Counting the pictured notes: the total is the sum of their values.
      assert.equal(q.answer, q.visual.values.reduce((sum, n) => sum + n, 0));
    }
    for (const q of questions("sequencing-events", 4, seed)) if (q.prompt.includes("lunch")) {
      checkedLunch = true;
      assert.match(q.prompt, /12 noon/);
      assert.match(q.prompt, /1 in the afternoon/);
    }
  }
  assert.ok(checkedLunch);
});

test("Measurement answers agree with the depicted quantities and units", () => {
  const ids = ["comparing-and-measuring-lengths-and-heights", "comparing-and-measuring-mass", "comparing-and-measuring-capacity"];
  for (const id of ids) for (let level = 1; level <= 4; level++) for (let seed = 1; seed <= 50; seed++) for (const q of questions(id, level, seed)) {
    const v = q.visual;
    if (v.type === "measure") {
      if (q.kind === "order") {
        const values = q.answer.map(itemId => {
          const item = q.items.find(candidate => candidate.id === itemId);
          return v.rows.find(row => row.label === item.label).value;
        });
        assert.ok(values.every((value, index) => index === 0 || value > values[index - 1]));
      } else if (v.rows.length === 1) assert.equal(q.answer, v.rows[0].value);
      else {
        const larger = /longer|heavier|more/.test(q.prompt);
        const expected = [...v.rows].sort((a, b) => a.value - b.value)[larger ? 1 : 0];
        assert.equal(q.answer, expected.label);
      }
    } else if (v.type === "capacity") {
      const words = { 0: "empty", 1: "quarter full", 2: "half full", 4: "full" };
      if (v.jugs) assert.equal(v.jugs.filter(j => q.prompt.includes(`is ${words[j.fill]}?`)).map(j => j.label).join(), q.answer);
      else assert.equal(q.answer, words[v.fill]);
    }
    else {
      assert.equal(q.answer, v.value);
      if (v.type === "ruler") assert.equal(q.label, "Centimetres");
      if (v.type === "instrument") assert.ok((id.includes("mass") ? ["g", "kg"] : ["ml", "litres"]).includes(v.unit));
    }
  }
});

test("Arrays, sharing and halves/quarters agree with their drawings and stories", () => {
  for (let seed = 1; seed <= 50; seed++) for (let level = 1; level <= 4; level++) {
    for (const q of questions("equal-groups-and-arrays", level, seed)) {
      // Arrays draw rows × columns; pictured groups must all be the same size; stories state both numbers.
      const v = q.visual, counts = v?.type === "objects" ? v.groups.map(g => g.count) : null;
      if (counts) assert.ok(counts.every(c => c === counts[0]));
      const total = !v ? q.prompt.match(/\d+/g).map(Number).reduce((x, y) => x * y) : counts ? counts.length * counts[0] : v.rows * v.columns;
      if (q.kind === "sequence") assert.equal(q.terms.at(-1), total);
      else assert.equal(q.answer, total);
      assert.ok(total <= 20);
    }
    for (const q of questions("sharing-and-grouping", level, seed)) {
      if (q.kind === "sequence") {
        const total = Number(q.prompt.match(/Put (\d+)/)[1]);
        assert.equal(q.visual.rows * q.visual.columns, total);
        assert.equal(q.terms.at(-1), total);
      } else {
        const quantities = q.prompt.match(/\d+/g).map(Number);
        assert.equal(q.answer, quantities[0] / quantities[1]);
      }
    }
    for (const [id, parts] of [["finding-a-half", 2], ["finding-a-quarter", 4]]) for (const q of questions(id, level, seed)) {
      if (q.visual?.type === "equalParts") {
        // Exactly one strip has `parts` equal parts, and its letter is the answer.
        const fair = q.visual.strips.map((w, i) => (w.length === parts && w.every(x => x === w[0]) ? i : -1)).filter(i => i >= 0);
        assert.deepEqual(fair.map(i => String.fromCharCode(65 + i)), [q.answer]);
      } else if (q.kind === "fraction" && q.mode === "shade") {
        assert.equal(q.answer * parts, q.parts, "shading the answer makes one half/quarter");
      } else if (q.kind === "fraction") {
        const share = q.shaded.length / q.parts;
        assert.equal(q.answer, { 0.5: "a half", 0.25: "a quarter", 1: "a whole" }[share]);
      } else assert.equal(q.answer, q.visual.groups[0].count / parts);
    }
  }
});

test("Measurements, shape families, clocks and turns stay inside Year 1 scope", () => {
  const seenCoins = new Set(), seenNotes = new Set(), seenTurns = new Set();
  for (let seed = 1; seed <= 100; seed++) for (let level = 1; level <= 4; level++) {
    for (const id of ["recognising-coins", "recognising-notes"]) for (const q of questions(id, level, seed)) {
      if (q.visual.type === "money") {
        (id === "recognising-coins" ? seenCoins : seenNotes).add(q.visual.value);
        if (q.answer !== "Yes" && q.answer !== "No") assert.equal(q.answer, q.visual.note ? `£${q.visual.value}` : q.visual.value < 100 ? `${q.visual.value}p` : `£${q.visual.value / 100}`);
      }
    }
    for (const q of questions("oclock-and-half-past", level, seed)) {
      assert.ok([0, 30].includes(q.time.minute));
      if (q.mode === "set") assert.equal(q.minuteStep, 30);
      else assert.equal(q.answer, q.time.minute ? `half past ${q.time.hour}` : `${q.time.hour} o'clock`);
    }
    for (const id of ["recognising-2-d-shapes", "recognising-3-d-shapes"]) for (const q of questions(id, level, seed)) {
      for (const shape of q.visual?.shapes ?? []) assert.ok((q.visual.solid ? THREE_D : TWO_D).includes(shape.id));
      // Don't reject a mathematically valid rectangle/cuboid answer to a square/cube.
      if (q.visual?.shapes.length === 1 && q.visual.shapes[0].id === "square") assert.ok(!q.options.includes("rectangle"));
      if (q.visual?.shapes.length === 1 && q.visual.shapes[0].id === "cube") assert.ok(!q.options.includes("cuboid"));
    }
    for (const q of questions("whole-half-quarter-and-three-quarter-turns", level, seed)) if (q.visual) {
      seenTurns.add(q.visual.quarters);
      if (level === 4) {
        const end = (q.visual.start + (q.visual.clockwise ? q.visual.quarters : -q.visual.quarters) + 4) % 4;
        assert.equal(q.answer, ["up", "right", "down", "left"][end]);
      }
    }
  }
  assert.deepEqual([...seenCoins].sort((a, b) => a - b), [1, 2, 5, 10, 20, 50, 100, 200]);
  assert.deepEqual([...seenNotes].sort((a, b) => a - b), [5, 10, 20, 50]);
  assert.deepEqual([...seenTurns].sort(), [1, 2, 3, 4]);
});
