import test from 'node:test';
import assert from 'node:assert/strict';
import { buildYear4Math, titleFor } from './questions.js';
import { seededRng, lintBuild } from '../questionKinds.js';

const runs = (topic, level, seeds = 100) => Array.from({ length: seeds }, (_, s) => buildYear4Math(topic, level, seededRng(s + 1)));
const all = (topic, level) => runs(topic, level).flat();

test('no position question repeats inside one run, and runs vary', () => {
  for (const topic of ['coordinates', 'translation', 'polygon']) for (let level = 1; level <= 4; level++) {
    const keys = runs(topic, level).map(run => run.map(q => `${q.prompt}|${q.answer}|${JSON.stringify(q.visual?.points)}`));
    for (const run of keys) assert.equal(new Set(run).size, run.length, `${topic} L${level}`);
    assert.ok(new Set(keys.map(k => k.join())).size > 50, `${topic} L${level} varies`);
  }
});

test('coordinates escalate: read with rule, read several points, plot, plot from a description', () => {
  assert.ok(all('coordinates', 1).every(q => q.kind === 'choice' && q.rule && q.visual.points.length === 1));
  const l2 = all('coordinates', 2);
  assert.ok(l2.every(q => !q.rule && q.visual.points.length === 3));
  assert.ok(l2.some(q => /^Which point is at/.test(q.prompt)) && l2.some(q => /coordinates of [ABC]/.test(q.prompt)));
  for (const q of l2.filter(q => /^Which point/.test(q.prompt))) {
    const p = q.visual.points.find(p => p.label === q.answer);
    assert.ok(q.prompt.includes(`(${p.x}, ${p.y})`));
  }
  assert.ok(all('coordinates', 3).every(q => q.interaction === 'plot' && q.visual.points.length === 0));
  for (const q of all('coordinates', 4)) {
    assert.equal(q.interaction, 'plot');
    assert.equal(q.visual.points[0].label, 'A');
    assert.notEqual(q.answer, `(${q.visual.points[0].x}, ${q.visual.points[0].y})`);
  }
});

test('translation escalates: one move with rule, two moves, describe, slide a triangle', () => {
  assert.ok(all('translation', 1).every(q => q.rule && !/ and /.test(q.prompt)));
  assert.ok(all('translation', 2).every(q => !q.rule && / and /.test(q.prompt) && q.kind === 'choice'));
  for (const q of all('translation', 3)) {
    const [a, b] = q.visual.points, [, n1, h, n2, v] = /^(\d) squares? (right|left) and (\d) squares? (up|down)$/.exec(q.answer);
    assert.equal(b.x - a.x, (h === 'right' ? 1 : -1) * n1);
    assert.equal(b.y - a.y, (v === 'up' ? 1 : -1) * n2);
    assert.equal(new Set(q.options).size, q.options.length);
  }
  for (const q of all('translation', 4)) {
    assert.equal(q.visual.points.length, 3);
    assert.equal(q.interaction, 'plot');
  }
});

test('polygon escalates: rectangle D with rule, square/rectangle any corner, plot, parallelogram story', () => {
  assert.ok(all('polygon', 1).every(q => q.rule && /rectangle/.test(q.prompt) && q.visual.missing === 'D'));
  const l2 = all('polygon', 2);
  assert.deepEqual(new Set(l2.map(q => q.visual.missing)), new Set(['A', 'B', 'C', 'D']));
  assert.ok(l2.some(q => /square/.test(q.prompt)) && l2.some(q => /rectangle/.test(q.prompt)));
  assert.ok(all('polygon', 3).every(q => q.interaction === 'plot'));
  assert.ok(all('polygon', 4).every(q => /parallelogram/.test(q.prompt) && q.interaction === 'plot'));
  for (let level = 1; level <= 4; level++) for (const q of all('polygon', level)) {
    assert.ok(!q.visual.points.some(p => `(${p.x}, ${p.y})` === q.answer));
    if (q.kind === 'choice' && !q.interaction) assert.equal(q.options.filter(o => o === q.answer).length, 1);
  }
});

test('polygon choices never offer a corner that is already drawn, and always give four options', () => {
  for (const level of [1, 2]) for (const q of all('polygon', level)) {
    assert.equal(q.options.length, 4);
    const drawn = q.visual.points.map(p => `(${p.x}, ${p.y})`);
    assert.ok(!q.options.some(o => drawn.includes(o)), `${q.prompt} ${q.options}`);
  }
});

test('position builders finish and stay fair even with a stuck rng (no rejection loops)', () => {
  for (const topic of ['coordinates', 'translation', 'polygon']) for (const rng of [() => 0, () => 0.999999]) {
    assert.deepEqual(lintBuild(l => buildYear4Math(topic, l, rng), { seeds: 1, year: 4, minQuestions: 5 }), [], topic);
  }
});

test('position topics have four distinct friendly titles', () => {
  for (const topic of ['coordinates', 'translation', 'polygon']) {
    const titles = [1, 2, 3, 4].map(l => titleFor(topic, l));
    assert.equal(new Set(titles).size, 4);
    assert.ok(titles.every(t => t.endsWith('.') && t.split(' ').length <= 6));
  }
});
