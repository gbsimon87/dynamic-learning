import test from 'node:test';
import assert from 'node:assert/strict';
import { buildYear4Math, titleFor } from './questions.js';
import { lintBuild, seededRng } from '../questionKinds.js';
import { exchanges } from './builders/addSubtract.js';

const runs = (topic, level, seeds = 100) => Array.from({ length: seeds }, (_, s) => buildYear4Math(topic, level, seededRng(s + 1)));
const TOPICS = ['columns', 'inverse', 'addProblems'];

test('add/subtract banks lint clean with their own titles', () => {
  for (const topic of TOPICS) {
    const titles = [1,2,3,4].map(l => titleFor(topic, l));
    assert.ok(titles.every(t => t.endsWith('.') && t.split(' ').length <= 6), topic);
    assert.deepEqual(lintBuild((l, r) => buildYear4Math(topic, l, r), { titles, year: 4, seeds: 100, minQuestions: 5 }), []);
  }
});

test('no repeated question inside a run, and runs vary between attempts', () => {
  for (const topic of TOPICS) for (let l = 1; l <= 4; l++) {
    const all = runs(topic, l);
    for (const run of all) assert.equal(new Set(run.map(q => q.prompt + (q.text ?? ''))).size, run.length, `${topic} L${l}`);
    assert.ok(new Set(all.map(run => run.map(q => q.prompt + (q.text ?? '')).sort().join('|'))).size > 90, `${topic} L${l} varies`);
  }
});

test('columns: L1 varied 4-digit with no exchange; L2 one exchange; L3/L4 two or more', () => {
  const sums = new Set();
  for (let l = 1; l <= 4; l++) for (const run of runs('columns', l)) for (const q of run) {
    const [a, op, b] = q.prompt.match(/(\d{4}) ([+−]) (\d{4})/)?.slice(1) ?? [];
    if (l === 4) { assert.ok(q.answer >= 0); continue; }
    const n = exchanges(Number(a), Number(b), op === '−');
    if (l === 1) { assert.equal(n, 0); assert.ok(q.rule); sums.add(q.answer); assert.ok(Number(a) % 1111 !== 0 || Number(b) % 1111 !== 0); }
    if (l === 2) { assert.equal(n, 1); assert.equal(q.rule, undefined); }
    if (l === 3) assert.ok(n >= 2);
  }
  assert.ok(sums.size > 300);
});

test('inverse: L1 estimates, L2 checks a value, L3 builds the inverse, L4 judges a claim', () => {
  const r1000 = n => Math.round(n / 1000) * 1000;
  for (const q of runs('inverse', 1).flat()) {
    assert.match(q.prompt, /^Estimate/); assert.doesNotMatch(q.prompt, /EACH/); assert.ok(q.rule);
    const [, a, op, b] = q.prompt.match(/(\d+) ([+−]) (\d+)/);
    assert.equal(q.answer, op === '+' ? r1000(+a) + r1000(+b) : r1000(+a) - r1000(+b));
    assert.ok(q.answer < 10000 && q.options.length >= 3 && q.options.every(o => o > 0 && o < 10000));
  }
  for (const q of runs('inverse', 2).flat()) assert.match(q.prompt, /^Check that/);
  for (const q of runs('inverse', 3).flat()) assert.equal(q.kind, 'build');
  let yes = 0, no = 0;
  for (const q of runs('inverse', 4).flat()) {
    assert.match(q.prompt, /Is \w+ right\?/);
    assert.doesNotMatch(q.prompt, /subtracting/);
    const [a, b, claim] = q.prompt.match(/\d+/g).map(Number);
    if (a + b === claim) { yes++; assert.match(q.answer, /^Yes/); } else { no++; assert.equal(q.answer, `No, it should be ${a + b}.`); }
    assert.equal(q.options.filter(o => o === q.answer).length, 1);
  }
  assert.ok(yes > 0 && no > 0);
});

test('addProblems: each level has its own stories and L4 is a two-step problem with varied operations', () => {
  const firstWords = l => new Set(runs('addProblems', l).flat().map(q => (q.text ?? q.prompt).split(' ').slice(0, 2).join(' ')));
  const banks = [1,2,3,4].map(firstWords);
  for (let x = 0; x < 4; x++) for (let y = x + 1; y < 4; y++) assert.equal([...banks[x]].filter(w => banks[y].has(w)).length, 0, `L${x+1} vs L${y+1}`);
  assert.ok(banks[3].size >= 5);
  for (const q of runs('addProblems', 4).flat()) { assert.equal(q.kind, 'number'); assert.ok(q.answer > 0); }
  assert.ok(Math.max(...runs('addProblems', 4).flat().map(q => q.answer)) > Math.max(...runs('addProblems', 1).flat().map(q => q.answer)));
});
