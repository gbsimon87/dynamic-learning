import test from 'node:test';
import assert from 'node:assert/strict';
import { buildYear4Math, titleFor } from './questions.js';
import { seededRng } from '../questionKinds.js';
import { isYear4MathCorrect } from './answers.js';
import { TOPIC_TITLES } from './builders/mulDiv.js';

const SEEDS = 100;
const runs = (topic, level) => Array.from({ length: SEEDS }, (_, s) => buildYear4Math(topic, level, seededRng(s + 1)));
const all = (topic, level) => runs(topic, level).flat();
const idsFor = (q, labels) => { const pool = [...q.tiles]; return labels.map(l => pool.splice(pool.findIndex(t => t.label === l), 1)[0].id); };
const key = q => JSON.stringify([q.prompt, q.equation, q.text, q.answer, q.cards?.map(c => c.label)]);

test('every mulDiv topic has four short titles ending in a full stop', () => {
  for (const [topic, titles] of Object.entries(TOPIC_TITLES)) {
    assert.equal(titles.length, 4, topic);
    for (const [i, t] of titles.entries()) {
      assert.match(t, /\.$/); assert.ok(t.split(' ').length <= 6, t);
      assert.equal(titleFor(topic, i + 1), t);
    }
  }
});

test('no run repeats a question, and runs vary between attempts', () => {
  for (const topic of Object.keys(TOPIC_TITLES)) for (let level = 1; level <= 4; level++) {
    const all = runs(topic, level);
    for (const run of all) assert.equal(new Set(run.map(key)).size, run.length, `${topic} L${level}: ${run.map(q => q.prompt).join(' / ')}`);
    assert.ok(new Set(all.map(run => run.map(key).sort().join())).size > SEEDS / 2, `${topic} L${level} runs too alike`);
  }
});

test('the four levels of each topic are different tasks', () => {
  for (const topic of Object.keys(TOPIC_TITLES)) {
    const shapes = [1, 2, 3, 4].map(l => all(topic, l).map(q => q.kind + (q.rule ? 'R' : '') + q.prompt.replace(/\d+/g, '#')).sort().join('|'));
    assert.equal(new Set(shapes).size, 4, topic);
    assert.ok(all(topic, 1).every(q => q.rule), `${topic} L1 states a rule`);
  }
});

test('choice questions have one correct option and plausible distractors', () => {
  for (const [topic, level] of [['tables', 1], ['factors', 1], ['mulProblems', 1], ['mental', 1], ['mental', 2]]) {
    for (const q of all(topic, level).filter(q => q.kind === 'choice')) {
      assert.equal(q.options.filter(o => o === q.answer).length, 1);
      assert.ok(q.options.length >= 3, q.prompt);
      if (typeof q.answer === 'number') for (const o of q.options) if (o !== q.answer) assert.ok(o !== q.answer + 10, `${q.prompt} has +10 distractor`);
    }
  }
});

test('tables L1 distractors are neighbouring facts or a + b, not just ±1', () => {
  for (const q of all('tables', 1)) {
    const [a, b] = q.prompt.match(/\d+/g).map(Number);
    const allowed = new Set([a * (b + 1), a * (b - 1), (a + 1) * b, (a - 1) * b, a + b]);
    for (const o of q.options) if (o !== q.answer) assert.ok(allowed.has(o), `${q.prompt}: ${o}`);
  }
});

test('mental: no bare × 0 / × 1 sums, three-number case changes between L1 and L2, brackets are own tiles', () => {
  for (const level of [1, 2]) for (const q of all('mental', level).filter(q => q.kind === 'number')) {
    assert.doesNotMatch(q.prompt, /^\d+ [×÷] [01] = \?$/, q.prompt);
  }
  const three = l => all('mental', l).filter(q => /^\d+ × \d+ × \d+/.test(q.prompt));
  assert.ok(three(1).every(q => /× (2 × 5|5 × 2|4 × 5|5 × 4) =/.test(q.prompt)));
  assert.ok(three(2).every(q => !/× (2 × 5|5 × 2|4 × 5|5 × 4) =/.test(q.prompt)));
  for (const q of all('mental', 3)) {
    assert.ok(q.tiles.some(t => t.label === '(') && q.tiles.some(t => t.label === ')'));
    assert.ok(q.tiles.every(t => /^(\d+|[×()])$/.test(t.label)), q.tiles.map(t => t.label).join());
    assert.ok(isYear4MathCorrect(q, idsFor(q, q.answer.split(' '))));
  }
});

test('factors: L2 never uses a ×10 or ×11 giveaway, L3 near-misses vary', () => {
  for (const q of all('factors', 2)) assert.ok(![1, 10, 11].includes(q.answer) && !/\b(10|11) ×|× (10|11)\b/.test(q.prompt), q.prompt);
  const gaps = new Set();
  for (const q of all('factors', 3)) {
    const total = Number(q.prompt.match(/\d+/)[0]);
    for (const c of q.cards) {
      const [x, y] = c.label.split(' × ').map(Number);
      assert.equal(c.bin === 'Factor pair', x * y === total, c.label);
      if (c.bin !== 'Factor pair') gaps.add(Math.abs(x * y - total));
    }
  }
  assert.ok(gaps.size >= 5, `near-miss gaps: ${[...gaps]}`);
});

test('written escalates: no exchange, exchange, H/T/O partition, story', () => {
  for (const q of all('written', 1)) { const { a, b } = q.visual; assert.ok(a < 100 && (a % 10) * b < 10 && Math.floor(a / 10) * b < 10); }
  for (const q of all('written', 2)) { const { a, b } = q.visual; assert.ok(a < 100 && (a % 10) * b >= 10); }
  for (const q of all('written', 3)) {
    assert.equal(q.visual, undefined);
    const [a, b] = q.equation.match(/\d+/g).map(Number);
    assert.ok(a >= 100);
    assert.equal(q.answer, `${Math.floor(a / 100) * 100 * b} + ${Math.floor(a / 10) % 10 * 10 * b} + ${a % 10 * b} = ${a * b}`);
  }
  for (const q of all('written', 4)) assert.match(q.prompt, /each collect/);
});

test('mulProblems: each level names its type and only L1 has the rule', () => {
  assert.ok(all('mulProblems', 1).every(q => q.rule && q.prompt.startsWith('Choosing problem')));
  assert.ok(all('mulProblems', 2).every(q => !q.rule && q.prompt.startsWith('Times-as problem')));
  assert.ok(all('mulProblems', 3).every(q => q.kind === 'build'));
  assert.ok(all('mulProblems', 4).every(q => q.prompt.startsWith('Two-step problem')));
});

test('tables L3 sorts a whole fact family into three different answers', () => {
  for (const q of all('tables', 3)) {
    assert.equal(new Set(q.bins.map(b => b.id)).size, 3, q.bins.map(b => b.id).join());
    assert.equal(q.cards.length, 4);
    for (const c of q.cards) {
      const [x, op, y] = c.label.split(' ');
      assert.equal(String(op === '×' ? x * y : x / y), c.bin, c.label);
    }
  }
});

test('mental L1 tests × 0 and × 1 alongside a table fact, with one right option', () => {
  const same = all('mental', 1).filter(q => q.kind === 'choice');
  assert.ok(same.length > 0);
  for (const q of same) {
    const [a, b] = q.prompt.match(/\d+/g).map(Number);
    const value = o => o.split(' ').reduce((acc, t, i, arr) => i === 0 ? Number(t) : arr[i - 1] === '×' ? acc * Number(t) : arr[i - 1] === '+' ? acc + Number(t) : acc, 0);
    assert.deepEqual(q.options.filter(o => value(o) === a * b), [q.answer]);
  }
});

test('mulProblems L2 wording reads correctly for every story', () => {
  for (const q of all('mulProblems', 2)) assert.doesNotMatch(q.prompt, /is \d+ times as many/, q.prompt);
});

test('a shared rng (Math.random in the game) still gives each run five distinct questions', () => {
  let s = 7; const rng = () => (s = (s * 16807) % 2147483647) / 2147483647;
  for (let k = 0; k < 50; k++) {
    const run = buildYear4Math('tables', 1, rng);
    assert.equal(new Set(run.map(key)).size, 5);
  }
});
