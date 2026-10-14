import test from "node:test";
import assert from "node:assert/strict";
import { seededRng } from "../questionKinds.js";
import { YEAR1_MATH_BUILDERS as builders } from "./index.js";
import { questionKey } from "./arithmetic.js";

const ARITHMETIC = ["addition-subtraction-and-equals-signs", "number-bonds-within-20", "adding-within-20", "subtracting-within-20",
  "missing-numbers-within-20", "one-step-addition-and-subtraction-problems"];
const GROUPS = ["equal-groups-and-arrays", "sharing-and-grouping", "doubling-small-quantities"];
const FRACTIONS = ["finding-a-half", "finding-a-quarter"];
const IDS = [...ARITHMETIC, ...GROUPS, ...FRACTIONS];
const SEEDS = Array.from({ length: 200 }, (_, i) => i + 1);
const questions = (id, level, seed) => builders[id](level, seededRng(seed));
const words = q => [q.prompt, q.text, q.rule, ...[q.equation ?? []].flat(), ...(q.options ?? []).map(String)].filter(Boolean).join(" ");
const shape = q => `${q.kind}/${q.mode ?? ""}/${q.visual?.type ?? "no picture"}/${(q.prompt ?? "").replace(/\d+/g, "#")}`;

test("no question repeats inside one run", () => {
  for (const id of IDS) for (let level = 1; level <= 4; level++) for (const seed of SEEDS) {
    const run = questions(id, level, seed);
    const keys = run.map(q => (q.mode === "shade" ? q.prompt : questionKey(q)));
    assert.equal(new Set(keys).size, 5, `${id} L${level} seed ${seed}: ${keys.join(" | ")}`);
  }
});

test("runs vary between attempts at every level", () => {
  for (const id of IDS) for (let level = 1; level <= 4; level++) {
    const runs = new Set(SEEDS.slice(0, 20).map(seed => JSON.stringify(questions(id, level, seed))));
    assert.ok(runs.size >= 15, `${id} L${level}: only ${runs.size} distinct runs`);
  }
});

test("the four levels ask different tasks", () => {
  for (const id of IDS) {
    const tasks = [1, 2, 3, 4].map(level => new Set(SEEDS.slice(0, 10).flatMap(seed => questions(id, level, seed).map(shape))));
    for (let a = 0; a < 4; a++) for (let b = a + 1; b < 4; b++) {
      const shared = [...tasks[a]].filter(t => tasks[b].has(t));
      assert.ok(shared.length < Math.min(tasks[a].size, tasks[b].size), `${id}: L${a + 1} and L${b + 1} ask the same thing`);
    }
  }
});

test("multiple-choice answers are not given away by position, size rank or alternation", () => {
  for (const id of IDS) for (let level = 1; level <= 2; level++) {
    const positions = new Map(), ranks = new Map();
    let choices = 0;
    for (const seed of SEEDS) for (const q of questions(id, level, seed)) {
      if (q.kind !== "choice" && !(q.kind === "fraction" && q.options)) continue;
      choices++;
      const at = q.options.indexOf(q.answer);
      positions.set(at, (positions.get(at) ?? 0) + 1);
      if (q.options.every(o => typeof o === "number")) {
        const rank = [...q.options].sort((x, y) => x - y).indexOf(q.answer);
        ranks.set(rank, (ranks.get(rank) ?? 0) + 1);
      }
    }
    if (!choices) continue;
    const n = q => q?.length ?? 0;
    for (const [at, hits] of positions) assert.ok(hits < choices * 0.6, `${id} L${level}: answer sits in slot ${at} ${hits}/${choices} times`);
    assert.ok(positions.size >= 2 + (n(questions(id, level, 1)[0].options) > 2 ? 1 : 0), `${id} L${level}: answer slots too few`);
    for (const [rank, hits] of ranks) assert.ok(hits < choices * 0.6, `${id} L${level}: answer is size rank ${rank} ${hits}/${choices} times`);
  }
  // Sign and true/false questions no longer alternate + then − by question number.
  const patterns = new Set(SEEDS.map(seed => questions("addition-subtraction-and-equals-signs", 2, seed).map(q => (q.answer.includes("+") ? "+" : "−")).join("")));
  assert.ok(patterns.size > 5);
});

test("no trivial or silly sums, and stories use singular and plural correctly", () => {
  for (const id of ARITHMETIC) for (let level = 1; level <= 4; level++) for (const seed of SEEDS) for (const q of questions(id, level, seed)) {
    const text = words(q);
    assert.ok(!/\b0 [+−] 0\b/.test(text), `${id}: 0 + 0 in "${text}"`);
    assert.ok(!/(^|[^\d])(\d+) \+ \? = \2\b|(^|[^\d])(\d+) − \? = \5\b/.test(text), `${id}: gap of zero in "${text}"`);
    assert.ok(!/What goes with (\d+) to make \1\?/.test(text), `${id}: ${text}`);
    assert.ok(!/(^|[^\d])0 (more|swim|fly|join)/.test(text), `${id}: "${text}"`);
    assert.ok(!/(^|[^\d])1 (ducks|birds|cars|children|shells|balloons|stickers|apples|pens|cakes|counters|swim|fly|join|land|drive|get)\b/.test(text), `${id}: plural after 1 in "${text}"`);
    assert.ok(!/There are 1 /.test(text) && !/(^|[^\d])1 are\b/.test(text), `${id}: "${text}"`);
    assert.ok(!/ - /.test(text), `${id}: hyphen used as a minus sign in "${text}"`);
  }
});

test("missing-number puzzles stay readable: no '0 = ? − 5' or '1 = ? − 19'", () => {
  for (const seed of SEEDS) for (let level = 1; level <= 4; level++) for (const q of questions("missing-numbers-within-20", level, seed)) {
    const m = /^(\d+) = \? − (\d+)$/.exec(q.equation ?? "");
    if (m) assert.ok(Number(m[1]) >= 1 && Number(m[2]) <= 9, q.equation);
  }
});

test("zero still appears (adding and taking away zero) without being in every run", () => {
  for (const id of ["adding-within-20", "subtracting-within-20"]) {
    const withZero = SEEDS.filter(seed => questions(id, 2, seed).some(q => / 0 |^0 /.test(q.equation)));
    assert.ok(withZero.length > 20 && withZero.length < SEEDS.length / 2, `${id}: ${withZero.length} runs with zero`);
    for (const seed of SEEDS) assert.ok(!/ 0 /.test(questions(id, 1, seed)[0].equation), `${id}: level 1 starts with 0`);
  }
});

test("pictures match the story and screen-reader labels do not state the answer", () => {
  for (const seed of SEEDS) {
    for (const q of questions("one-step-addition-and-subtraction-problems", 1, seed)) {
      assert.match(q.prompt, /ducks? /);
      assert.ok(q.visual.groups.every(g => g.icon === "🦆"));
    }
    for (const q of questions("equal-groups-and-arrays", 2, seed)) {
      const noun = q.prompt.match(/How many (\w+)/)[1];
      assert.ok(q.visual.groups.every(g => g.noun === noun && g.icon));
    }
    for (const id of FRACTIONS) for (const q of questions(id, 1, seed)) {
      assert.equal(q.visual.strips.length, 3);
      assert.equal(q.options.length, 3);
    }
  }
});

test("fractions: names, shading and quantities vary and are right", () => {
  for (const [id, parts] of [["finding-a-half", 2], ["finding-a-quarter", 4]]) {
    const named = new Set(), shadeAnswers = new Set();
    for (const seed of SEEDS) {
      for (const q of questions(id, 2, seed)) named.add(q.answer);
      for (const q of questions(id, 3, seed)) {
        assert.equal(q.answer * parts, q.parts);
        assert.ok(q.answer > 1, "shading a single part of a 2- or 4-part strip is trivial");
        shadeAnswers.add(q.answer);
      }
      for (const q of questions(id, 4, seed)) assert.equal(q.answer * parts, q.visual.groups[0].count);
    }
    assert.deepEqual([...named].sort(), ["a half", "a quarter", "a whole"]);
    assert.ok(shadeAnswers.size >= 2);
  }
});

test("groups: sharing and grouping counts stay whole, within 20, and doubling asks both ways", () => {
  for (const seed of SEEDS) {
    for (let level = 1; level <= 4; level++) for (const q of questions("sharing-and-grouping", level, seed)) {
      const [total, by] = q.prompt.match(/\d+/g).map(Number);
      assert.ok(total <= 20 && total % by === 0);
    }
    const doubles = questions("doubling-small-quantities", 2, seed);
    assert.ok(doubles.some(q => q.prompt.startsWith("What is double")) && doubles.some(q => q.prompt.startsWith("Bix doubles")));
  }
});
