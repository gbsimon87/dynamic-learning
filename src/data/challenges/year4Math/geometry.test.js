import test from 'node:test';
import assert from 'node:assert/strict';
import { buildYear4Math } from './questions.js';
import { seededRng, isCorrect } from '../questionKinds.js';
import { TOPIC_TITLES, SHAPES, SYMMETRY } from './builders/geometry.js';

const runs = (topic, level, seeds = 60) => Array.from({ length: seeds }, (_, s) => buildYear4Math(topic, level, seededRng(s + 1)));
const sig = q => JSON.stringify({ kind: q.kind, prompt: q.prompt, rule: q.rule ?? null, visual: q.visual?.type ?? null, interaction: q.interaction ?? null });
const keyOf = q => JSON.stringify([q.prompt, q.answer, q.visual, q.cards?.map(c => c.label).sort()]);

for (const topic of ['shapes', 'angles', 'symmetry', 'reflect']) {
  test(`${topic}: four distinct tasks, runs vary, no repeats within a run`, () => {
    const firsts = [1, 2, 3, 4].map(l => buildYear4Math(topic, l, seededRng(3))[0]);
    assert.equal(new Set(firsts.map(sig)).size, 4);
    for (let l = 1; l <= 4; l++) {
      const all = runs(topic, l);
      assert.ok(new Set(all.map(run => run.map(keyOf).sort().join())).size > 15, `level ${l} varies`);
      for (const run of all) assert.equal(new Set(run.map(keyOf)).size, run.length, `level ${l} repeat`);
    }
    assert.equal(TOPIC_TITLES[topic].length, 4);
    for (const title of TOPIC_TITLES[topic]) assert.ok(/\.$/.test(title) && title.split(' ').length <= 6, title);
  });
}

test('shapes: near-miss distractors, property sort, forgiving typed answer, regular polygons', () => {
  for (const run of runs('shapes', 1)) for (const q of run) {
    const key = q.visual.shape;
    assert.deepEqual(new Set(q.options), new Set([SHAPES[key].name, ...SHAPES[key].near]));
    assert.ok(q.rule);
  }
  const bins = new Set();
  for (const run of runs('shapes', 3)) for (const q of run) {
    q.bins.forEach(b => bins.add(b.id));
    assert.ok(!q.bins.some(b => b.id === 'Triangle'));
    for (const b of q.bins) assert.ok(q.cards.some(c => c.bin === b.id));
  }
  for (const b of ['Has a right angle', 'Has parallel sides', 'All sides equal', 'Regular', 'Irregular']) assert.ok(bins.has(b), b);
  for (const run of runs('shapes', 4)) for (const q of run) {
    assert.equal(q.kind, 'type');
    assert.ok(isCorrect(q, `  ${q.answer.toUpperCase()} `));
    assert.ok(isCorrect(q, q.answer[0].toUpperCase() + q.answer.slice(1)));
  }
  assert.ok(runs('shapes', 2).flat().some(q => q.options.some(o => o.includes('regular'))));
});

test('angles: random sizes, never 180° or more, level 2 has one odd angle', () => {
  const sizes = new Set();
  for (const run of runs('angles', 1)) for (const q of run) sizes.add(q.visual.degrees);
  assert.ok(sizes.size > 15);
  for (let l = 2; l <= 3; l++) for (const run of runs('angles', l)) for (const q of run) {
    assert.ok(q.visual.values.every(v => v > 0 && v < 180));
  }
  for (const run of runs('angles', 2)) for (const q of run) {
    const obtuse = q.prompt.includes('obtuse');
    assert.equal(q.options.filter(o => obtuse ? parseInt(o) > 90 : parseInt(o) < 90).length, 1);
    assert.ok(obtuse ? parseInt(q.answer) > 90 : parseInt(q.answer) < 90);
  }
  for (const run of runs('angles', 4)) for (const q of run) {
    const [open, target] = q.prompt.match(/\d+/g).map(Number);
    assert.equal(q.answer, (q.prompt.includes('180') ? 180 : 90) - open);
    assert.ok(target === undefined || target === 180);
  }
});

test('symmetry: varied figures beyond basic polygons with correct counts', () => {
  const shapes = new Set();
  for (const l of [1, 2, 4]) for (const run of runs('symmetry', l)) for (const q of run) {
    shapes.add(q.visual.shape);
    const n = SYMMETRY[q.visual.shape];
    assert.equal(q.answer, l === 2 ? `${n} line${n === 1 ? '' : 's'}` : n);
  }
  for (const s of ['arrow', 'plus', 'house', 'hexagon', 'zshape']) assert.ok(shapes.has(s), s);
  assert.ok(runs('symmetry', 2).flat().every(q => q.visual.rotate !== 0));
});

test('reflect: levels 3 and 4 use bigger patterns and grids than 1 and 2', () => {
  for (let l = 1; l <= 4; l++) for (const run of runs('reflect', l)) for (const q of run) {
    const v = q.visual, horizontal = l === 2 || l === 4;
    assert.equal(v.horizontal, horizontal);
    assert.equal(q.cards.length, l >= 3 ? 15 : 9);
    assert.ok(l >= 3 ? v.cells.length >= 5 : v.cells.length <= 4);
    const expected = new Set(v.cells.map(([x, y]) => horizontal ? `${x},${5 - y}` : `${5 - x},${y}`));
    assert.deepEqual(new Set(q.cards.filter(c => c.bin === 'Coloured').map(c => c.label)), expected);
  }
});

test('shapes level 2: exactly one listed fact is true of the drawn shape', () => {
  // Properties of each drawn shape: [sides, equal sides, right angles, parallel pairs, regular].
  const P = {
    equilateral: [3, 3, 0, 0, true], isosceles: [3, 2, 0, 0, false], scalene: [3, 0, 0, 0, false],
    rhombus: [4, 4, 0, 2, false], trapezium: [4, 2, 0, 1, false], parallelogram: [4, 0, 0, 2, false],
    rectangle: [4, 0, 4, 2, false], square: [4, 4, 4, 2, true],
  };
  const holds = (fact, [sides, equal, right, parallel, regular]) => ({
    'It is a regular triangle: all sides and angles are equal.': sides === 3 && regular,
    'It has exactly 2 equal sides.': sides === 3 && equal === 2,
    'All 3 sides are different lengths.': sides === 3 && equal === 0,
    'It has 4 equal sides but no right angles.': equal === 4 && right === 0,
    'It has exactly 1 pair of parallel sides.': parallel === 1,
    'It has 2 pairs of parallel sides but no right angles.': parallel === 2 && right === 0,
    'It has 4 right angles but not all sides are equal.': right === 4 && equal !== 4,
    'It is a regular quadrilateral: 4 equal sides and 4 right angles.': sides === 4 && regular,
  })[fact];
  for (const run of runs('shapes', 2)) for (const q of run) {
    const truths = q.options.filter(o => holds(o, P[q.visual.shape]));
    assert.deepEqual(truths, [q.answer], `${q.visual.shape}: ${q.options.join(' | ')}`);
  }
});
