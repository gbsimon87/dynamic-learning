import test from "node:test";
import assert from "node:assert/strict";
import { isCorrect, lintBuild, seededRng } from "../questionKinds.js";
import { numberBuilders as builders } from "./numbers.js";
import { numericOptions, WORDS } from "./shared.js";
import { YEAR1_MATH_TITLES } from "./index.js";

const ids = Object.keys(builders);
const run = (id, level, seed) => builders[id](level, seededRng(seed));
const SEEDS = Array.from({ length: 200 }, (_, i) => i + 1);
const signature = q => JSON.stringify({ ...q, options: undefined, items: q.items?.map(i => i.value).sort(), tiles: undefined });

test("numbers: every level lints clean over many seeds", () => {
  for (const id of ids) assert.deepEqual(lintBuild(builders[id], { year: 1, titles: YEAR1_MATH_TITLES, seeds: 200, minQuestions: 5 }), [], id);
});

test("numbers: no question repeats inside a run, and runs differ between attempts", () => {
  for (const id of ids) for (let level = 1; level <= 4; level++) {
    for (const seed of SEEDS.slice(0, 60)) {
      const qs = run(id, level, seed).map(signature);
      assert.equal(qs.length, 5, `${id} ${level}`);
      assert.equal(new Set(qs).size, 5, `${id} ${level} seed ${seed}: repeated question`);
    }
    const runs = new Set(SEEDS.slice(0, 20).map(seed => JSON.stringify(run(id, level, seed))));
    assert.ok(runs.size >= 15, `${id} ${level}: runs barely vary`);
  }
});

test("numbers: the four levels never ask the same kind of task", () => {
  for (const id of ids) {
    const shapes = [1, 2, 3, 4].map(l => {
      const q = run(id, l, 9)[0];
      return `${q.kind}/${q.mode ?? ""}/${q.visual?.type ?? ""}/${q.prompt.replace(/\d+|\*\*[^*]+\*\*/g, "#").slice(0, 12)}`;
    });
    assert.equal(new Set(shapes).size, 4, `${id}: ${shapes.join(" | ")}`);
  }
});

test("numericOptions: the answer lands in every sorted position, so position gives nothing away", () => {
  const rng = seededRng(5);
  const positions = new Set();
  for (let i = 0; i < 200; i++) {
    const answer = 5 + (i % 40);
    const options = numericOptions(rng, answer, 100);
    assert.equal(options.length, 4);
    assert.ok(options.includes(answer));
    positions.add([...options].sort((a, b) => a - b).indexOf(answer));
  }
  assert.deepEqual([...positions].sort(), [0, 1, 2, 3]);
});

test("numbers: multiple-choice answers are not at a fixed rank in any choice level", () => {
  for (const id of ids) for (let level = 1; level <= 4; level++) {
    const ranks = new Set();
    for (const seed of SEEDS) for (const q of run(id, level, seed)) {
      if (q.kind !== "choice" || !q.options.every(o => typeof o === "number")) continue;
      ranks.add([...q.options].sort((a, b) => a - b).indexOf(q.answer));
    }
    if (ranks.size) assert.ok(ranks.size >= 3, `${id} ${level}: answer is always rank ${[...ranks]}`);
  }
});

test("reading numerals: distractors include the swapped tens/ones number; blocks build and order vary", () => {
  for (const seed of SEEDS) {
    for (const q of run("reading-and-writing-numerals-to-100", 1, seed)) {
      const swapped = (q.answer % 10) * 10 + Math.floor(q.answer / 10);
      assert.ok(q.options.includes(swapped), `${q.answer} missing ${swapped}`);
    }
    for (const q of run("reading-and-writing-numerals-to-100", 2, seed)) {
      assert.equal(q.kind, "placeValue");
      const right = { hundreds: 0, tens: Math.floor(q.answer / 10), ones: q.answer % 10 };
      assert.equal(isCorrect(q, right), true);
      assert.equal(isCorrect(q, { hundreds: 0, tens: right.ones, ones: right.tens }), right.ones === right.tens);
    }
  }
  const gaps = new Set(SEEDS.flatMap(seed => run("reading-and-writing-numerals-to-100", 3, seed)
    .map(q => q.answer.map(id => q.items.find(i => i.id === id).value)).map(v => v.slice(1).map((n, i) => n - v[i]).join())));
  assert.ok(gaps.size > 50, "ordering cards always use the same gaps");
});

test("reading numerals 4: the pictured packs of ten and loose items add up to the answer", () => {
  for (const seed of SEEDS) for (const q of run("reading-and-writing-numerals-to-100", 4, seed)) {
    const [packs, loose] = q.visual.groups;
    assert.equal(packs.count * 10 + (loose?.count ?? 0), q.answer);
  }
});

test("counting forwards and backwards: both directions, gaps move, 99 to 100 can appear, track never shows the answer", () => {
  let crossed100 = false;
  for (const seed of SEEDS) {
    const l1 = run("counting-forwards-and-backwards-to-100", 1, seed);
    const dirs = new Set(l1.map(q => Math.sign(q.terms[1] - q.terms[0])));
    assert.deepEqual([...dirs].sort(), [-1, 1]);
    assert.ok(new Set(l1.map(q => q.gaps[0])).size >= 3);
    for (const q of run("counting-forwards-and-backwards-to-100", 2, seed)) {
      assert.ok(q.terms.some(n => n % 10 === 0));
      if (q.terms.includes(100) && q.terms.includes(99)) crossed100 = true;
    }
    for (const q of run("counting-forwards-and-backwards-to-100", 4, seed)) {
      const hops = Number(q.prompt.match(/jumps (\d)/)[1]);
      assert.deepEqual(q.visual.terms, [Number(q.prompt.match(/on (\d+)/)[1])]);
      assert.equal(q.visual.blanks, hops - 1);
      assert.ok(!q.visual.terms.includes(q.answer));
    }
  }
  assert.ok(crossed100);
});

test("counting in 2s, 5s and 10s 1: start, gap and step order all vary", () => {
  const firstAnswers = new Set(), starts = new Set(), gaps = new Set();
  for (const seed of SEEDS) {
    const qs = run("counting-in-twos-fives-and-tens", 1, seed);
    assert.deepEqual([...new Set(qs.map(q => q.terms[1] - q.terms[0]))].sort((a, b) => a - b), [2, 5, 10]);
    firstAnswers.add(qs.map(q => q.terms[q.gaps[0]]).join());
    qs.forEach(q => { starts.add(q.terms[0]); gaps.add(q.gaps[0]); });
  }
  assert.ok(firstAnswers.size > 100);
  assert.ok(starts.size > 5);
  assert.deepEqual([...gaps].sort(), [1, 2, 3, 4]);
});

test("comparing: outcomes are not a fixed cycle; L4 reads naturally; levels use different language", () => {
  const orders = new Set();
  for (const seed of SEEDS) {
    const l1 = run("comparing-and-ordering-quantities", 1, seed);
    orders.add(l1.map(q => q.answer).join());
    for (const q of l1) {
      const [red, blue] = q.visual.groups.map(g => g.count);
      assert.equal(q.answer, red === blue ? "equal to" : red > blue ? "more than" : "fewer than");
    }
    for (const q of run("comparing-and-ordering-quantities", 2, seed)) {
      const target = Number(q.prompt.match(/\d+/)[0]);
      for (const card of q.cards) assert.equal(card.bin, Number(card.label) < target ? "less" : "more");
    }
    for (const q of run("comparing-and-ordering-quantities", 3, seed)) {
      const counts = q.visual.groups.map(g => g.count);
      const want = /most/.test(q.prompt) ? Math.max(...counts) : Math.min(...counts);
      assert.equal(q.visual.groups.find(g => g.label === q.answer).count, want);
    }
    for (const q of run("comparing-and-ordering-quantities", 4, seed)) {
      assert.doesNotMatch(q.prompt, /…|equal to/);
      const [a, b] = q.prompt.match(/\d+/g).map(Number);
      const [p, other] = q.options;
      const more = /more/.test(q.prompt);
      assert.equal(q.answer, a === b ? "The same" : (more === a > b) ? p : other);
    }
  }
  assert.ok(orders.size > 30);
});

test("counting objects: pictures match the story, groups are labelled for screen readers without totals", () => {
  for (const seed of SEEDS) for (let level = 1; level <= 4; level++) for (const q of run("counting-objects", level, seed)) {
    assert.equal(q.visual.countable, true);
    for (const g of q.visual.groups) assert.ok(g.icon && g.noun && !String(g.label).match(/\d/));
    if (level === 4) assert.ok(q.prompt.includes(q.visual.groups[0].label.toLowerCase()));
    if (level === 3) for (const item of q.items) assert.match(item.label, /^[ABC]$/);
  }
});

test("one more and one less: correct grammar, balanced directions, tens-slip distractor", () => {
  for (const seed of SEEDS) {
    for (let level = 1; level <= 4; level++) {
      const qs = run("one-more-and-one-less", level, seed);
      for (const q of qs) assert.doesNotMatch(q.prompt, /\b1 (children|sweets|books)\b/);
      if (level !== 3) {
        const more = qs.filter(q => /more|gets on|adds/.test(q.prompt)).length;
        assert.ok(more >= 1 && more <= 4, `level ${level}: one direction only`);
      }
    }
    for (const q of run("one-more-and-one-less", 2, seed)) {
      const n = Number(q.prompt.match(/than (\d+)/)[1]);
      if (/more/.test(q.prompt) && n % 10 === 9) assert.ok(q.options.includes(n - 9));
      if (/less/.test(q.prompt) && n % 10 === 0) assert.ok(q.options.includes(n + 9));
    }
  }
});

test("number words: look-alike distractors and plenty of teens", () => {
  for (const seed of SEEDS) {
    for (const q of run("number-words-to-20", 1, seed)) assert.equal(q.options.length, 4);
    for (let level = 2; level <= 4; level++) {
      const teens = run("number-words-to-20", level, seed).filter(q => (typeof q.answer === "number" ? q.answer : WORDS.indexOf(q.answer)) > 10);
      assert.ok(teens.length >= 3);
    }
  }
});
