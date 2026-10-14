import test from 'node:test';
import assert from 'node:assert/strict';
import { buildYear4Math, titleFor } from './questions.js';
import { seededRng } from '../questionKinds.js';

const seeds = Array.from({ length: 60 }, (_, s) => s + 1);
const run = (topic, level, seed) => buildYear4Math(topic, level, seededRng(seed));
const key = q => JSON.stringify([q.prompt, q.chart?.rows, q.visual, q.items]);

test('statistics: no two levels are the same task and no repeated question in a run', () => {
  for (const topic of ['graphs', 'data']) for (const seed of seeds) {
    const shapes = new Set();
    for (let level = 1; level <= 4; level++) {
      const qs = run(topic, level, seed);
      assert.equal(new Set(qs.map(key)).size, qs.length, `${topic} L${level} seed ${seed}`);
      assert.equal(new Set(qs.map(q => q.prompt)).size, qs.length, `${topic} L${level} prompts repeat`);
      shapes.add(qs.map(q => `${q.kind}:${q.chart?.type ?? q.visual?.type}:${/rise|fall/.test(q.prompt)}`).sort().join());
    }
    assert.equal(shapes.size, 4, `${topic} seed ${seed}`);
  }
});

test('statistics: runs vary between attempts', () => {
  for (const topic of ['graphs', 'data']) for (let level = 1; level <= 4; level++)
    assert.notDeepEqual(run(topic, level, 1), run(topic, level, 2));
});

test('graphs L1/L2/L4 ask about different bars, times and intervals', () => {
  for (const seed of seeds) for (const level of [1, 2, 4]) {
    const prompts = run('graphs', level, seed).map(q => q.prompt.replace(/\d+ more/, ''));
    assert.equal(new Set(prompts).size, 5);
  }
});

test('graphs: the line graph both rises and falls, and fall questions say fall', () => {
  let rise = 0, fall = 0, lastRiseAlways = 0, total = 0;
  for (const seed of seeds) {
    for (const q of run('graphs', 4, seed)) {
      const v = q.visual.values, [, t1, t2] = /at (\d\d:\d\d) and again at (\d\d:\d\d)/.exec(q.prompt);
      const a = v[q.visual.labels.indexOf(t1)], b = v[q.visual.labels.indexOf(t2)];
      assert.notEqual(a, b);
      assert.equal(q.answer, Math.abs(b - a));
      if (b > a) { rise++; assert.match(q.prompt, /rise/); } else { fall++; assert.match(q.prompt, /fall/); }
    }
    for (const q of run('graphs', 2, seed)) { total++; if (q.visual.values[3] > q.visual.values[0]) lastRiseAlways++; }
  }
  assert.ok(rise > 30 && fall > 30, `rise ${rise} fall ${fall}`);
  assert.ok(lastRiseAlways < total, 'some graphs end lower than they start');
});

test('data L3: the table order is not the answer order and directions vary', () => {
  let tableSorted = 0, dirs = new Set(), n = 0;
  for (const seed of seeds) for (const q of run('data', 3, seed)) {
    n++;
    const vals = q.visual.rows.map(row => row.value);
    if (vals.every((v, k) => k === 0 || v > vals[k - 1])) tableSorted++;
    dirs.add(/most\*\* to/.test(q.prompt) ? 'down' : 'up');
    const answer = q.answer.map(id => q.items.find(it => it.id === id).label);
    const byValue = [...q.visual.rows].sort((a, b) => a.value - b.value).map(row => row.label);
    assert.deepEqual(answer, /most\*\* to/.test(q.prompt) ? byValue.reverse() : byValue);
  }
  assert.ok(tableSorted < n / 4);
  assert.equal(dirs.size, 2);
  const labels = new Set(seeds.flatMap(s => run('data', 3, s).flatMap(q => q.visual.rows.map(r => r.label))));
  assert.ok(labels.size > 10, 'labels vary beyond Oak, Pine and Birch');
});

test('data L1 and L4 are different tasks; L4 is two-step', () => {
  for (const seed of seeds) {
    assert.ok(run('data', 1, seed).every(q => q.kind === 'chart' && q.chart.type === 'bar' && q.rule));
    for (const q of run('data', 4, seed)) {
      assert.equal(q.kind, 'number');
      assert.equal(q.visual.type, 'table');
      assert.ok(q.answer > 0);
      const v = Object.fromEntries(q.visual.rows.map(r => [r.label, r.value]));
      const named = [...q.prompt.matchAll(/\*\*([^*]+)\*\*/g)].map(m => m[1]).filter(x => x in v);
      if (/combined/.test(q.prompt)) assert.equal(q.answer, v[named[0]] - v[named[1]] - v[named[2]]);
      else if (/\*\*not\*\*/.test(q.prompt)) assert.equal(q.answer, Object.values(v).reduce((s, x) => s + x, 0) - v[named.at(-1)]);
      else assert.match(q.prompt, /more are counted/);
    }
  }
});

test('statistics: every challenge has a short friendly title', () => {
  for (const topic of ['graphs', 'data']) for (let level = 1; level <= 4; level++) {
    const t = titleFor(topic, level);
    assert.match(t, /\.$/);
    assert.ok(t.split(' ').length <= 6, t);
  }
});
