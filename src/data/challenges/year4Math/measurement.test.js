import test from 'node:test';
import assert from 'node:assert/strict';
import { buildYear4Math, titleFor } from './questions.js';
import { lintBuild, seededRng, isCorrect } from '../questionKinds.js';
import { isYear4MathCorrect } from './answers.js';

const TOPICS = ['units', 'perimeter', 'area', 'money', 'time', 'timeProblems'];
const run = (topic, level, seed) => buildYear4Math(topic, level, seededRng(seed));
const all = (topic, level, seeds = 100) => Array.from({ length: seeds }, (_, s) => run(topic, level, s + 1)).flat();
const keyOf = q => JSON.stringify([q.kind, q.prompt, q.visual, q.time, q.cards?.map(c => c.label).sort(), q.items?.map(c => c.label).sort(), q.options && [...q.options].sort()]);
const perimeterOf = points => points.reduce((s, [x, y], k) => { const [a, b] = points[(k + 1) % points.length]; return s + Math.abs(x - a) + Math.abs(y - b); }, 0);

test('measurement banks lint clean and have four short titles ending in a full stop', () => {
  for (const topic of TOPICS) {
    assert.deepEqual(lintBuild((l, r) => buildYear4Math(topic, l, r), { year: 4, seeds: 200, minQuestions: 5 }), [], topic);
    for (let l = 1; l <= 4; l++) {
      const title = titleFor(topic, l);
      assert.match(title, /\.$/, title);
      assert.ok(title.split(' ').length <= 6, title);
    }
  }
});

test('no repeated question within a run, runs differ, and the four levels ask different things', () => {
  for (const topic of TOPICS) {
    const shapes = [];
    for (let l = 1; l <= 4; l++) {
      for (let s = 1; s <= 100; s++) {
        const keys = run(topic, l, s).map(keyOf);
        assert.equal(new Set(keys).size, keys.length, `${topic} L${l} seed ${s}`);
      }
      assert.notDeepEqual(run(topic, l, 1).map(keyOf), run(topic, l, 2).map(keyOf));
      const first = run(topic, l, 3)[0];
      shapes.push(`${first.kind}|${first.prompt.replace(/[\d.£:]+/g, '#').slice(0, 30)}|${first.rule ? 'rule' : ''}`);
    }
    for (let l = 2; l <= 4; l++) {
      const prompts = new Set(all(topic, l, 20).map(q => q.prompt.replace(/[\d.£:]+/g, '#')));
      const prev = new Set(all(topic, l - 1, 20).map(q => q.prompt.replace(/[\d.£:]+/g, '#')));
      assert.ok([...prompts].every(p => !prev.has(p)), `${topic} L${l} repeats a L${l - 1} task`);
    }
    assert.ok(all(topic, 1, 5).every(q => q.rule), `${topic} L1 states its rule`);
    assert.ok(all(topic, 2, 5).every(q => !q.rule), `${topic} L2 leaves the rule to infer`);
  }
});

test('every generated answer is accepted by the Year 4 checker', () => {
  for (const topic of TOPICS) for (let l = 1; l <= 4; l++) for (const q of all(topic, l, 30)) {
    let response;
    if (q.kind === 'choice') response = q.answer;
    else if (q.kind === 'number') response = String(q.answer);
    else if (q.kind === 'sort') response = Object.fromEntries(q.cards.map(c => [c.id, c.bin]));
    else if (q.kind === 'order') response = q.answer.map(id => q.items.find(x => x.id === id));
    else if (q.kind === 'clock') response = q.time;
    else if (q.kind === 'build') { const pool = [...q.tiles]; response = q.answer.split(' ').map(t => pool.splice(pool.findIndex(x => x.label === t), 1)[0].id); }
    assert.ok(q.kind === 'build' ? isYear4MathCorrect(q, response) : isCorrect(q, response), `${topic} L${l}: ${q.prompt}`);
  }
});

test('money: compare, estimate, order mixed units and calculate, across money and measures', () => {
  assert.ok(all('money', 1).every(q => q.kind === 'choice' && /most|longest|heaviest/.test(q.prompt)));
  const l1 = all('money', 1);
  assert.ok(l1.some(q => q.options.some(o => /p$/.test(o)) && q.options.some(o => /^£/.test(o))), 'pounds compared with pence');
  assert.ok(['cm', 'kg', ' g', 'ml', 'litres'].every(u => l1.some(q => q.options.some(o => o.includes(u)))), 'measures compared too');
  const l2 = all('money', 2);
  assert.ok(l2.every(q => q.kind === 'choice' && /Estimate/.test(q.prompt) && /^about /.test(q.answer)));
  assert.ok(l2.some(q => q.prompt.includes('kg')) && l2.some(q => q.prompt.includes('£')));
  for (const q of l2) { // the answer really is the sum of each amount rounded to the nearest whole
    const nums = [...q.prompt.matchAll(/(\d+\.\d+)/g)].map(m => Math.round(Number(m[1])));
    assert.equal(q.answer.match(/\d+/)[0], String(nums[0] + nums[1]), q.prompt);
  }
  const l3 = all('money', 3);
  assert.ok(l3.every(q => q.kind === 'order' && q.items.length === 4));
  assert.ok(l3.some(q => /amounts of money/.test(q.prompt)) && l3.some(q => /masses|lengths|capacities/.test(q.prompt)), 'orders measures, not only prices');
  const l4 = all('money', 4);
  assert.ok(l4.some(q => /change/.test(q.prompt)) && l4.some(q => /left/.test(q.prompt)), 'subtraction and change appear');
  assert.ok(l4.every(q => q.kind === 'number' && q.answer > 0));
});

test('time: clock reading to 5 minutes, reverse 24h to 12h, clear setting prompts and a timetable problem', () => {
  for (const q of all('time', 1)) {
    assert.equal(q.visual.minute % 5, 0);
    assert.doesNotMatch(q.answer, /^00:/, 'no confusing midnight times at level 1');
    assert.ok(q.options.length >= 3, 'more than the ±12 h distractor');
  }
  for (const q of all('time', 2)) {
    assert.ok(!q.visual && /^Which 12-hour time is the same as \d\d:\d\d\?$/.test(q.prompt));
    const [h, m] = q.prompt.match(/(\d\d):(\d\d)/).slice(1).map(Number);
    assert.equal(q.answer, `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'am' : 'pm'}`);
  }
  for (const q of all('time', 3)) {
    assert.match(q.prompt, /in the (morning|afternoon|evening)|just after midnight/);
    const [h, m] = q.prompt.match(/(\d\d):(\d\d)/).slice(1).map(Number);
    assert.deepEqual(q.time, { hour: h % 12 || 12, minute: m });
  }
  for (const q of all('time', 4)) {
    assert.doesNotMatch(q.prompt, /after midnight/);
    assert.match(q.prompt, /(am|pm)/);
    assert.ok(q.answer >= 1300 && q.answer < 2400 && q.answer % 100 < 60, q.prompt);
  }
});

test('timeProblems: correct plurals, sensible stories, and level 3 mixes all four unit pairs', () => {
  const l4 = all('timeProblems', 4);
  for (const q of l4) {
    assert.doesNotMatch(q.prompt, /extra|club meets|\b1 (hours|minutes|seconds|years|months|weeks|days)\b/, q.prompt);
    const [n, extra] = q.prompt.match(/\d+/g).map(Number);
    const factor = /\bhours?\b|\bseconds?\b/.test(q.prompt) ? 60 : /\byears?\b/.test(q.prompt) ? 12 : 7;
    assert.equal(q.answer, n * factor + extra, q.prompt);
  }
  const labels = all('timeProblems', 3).flatMap(q => q.items.map(x => x.label)).join(' ');
  for (const unit of ['seconds', 'minutes', 'days', 'week', 'months', 'year']) assert.ok(labels.includes(unit), unit);
  assert.doesNotMatch(labels, /\b1 (weeks|years|hours|minutes)\b/);
  assert.ok(all('timeProblems', 2).every(q => /^How many (hours|minutes|years|weeks) are the same as \d+ /.test(q.prompt)));
});

test('perimeter: varied rectilinear shapes whose answers agree with the drawn edges, and not always the bounding rectangle', () => {
  for (let l = 1; l <= 4; l++) for (const q of all('perimeter', l)) {
    if (!q.visual) continue;
    assert.equal(q.visual.type, 'rectilinear');
    const answer = q.kind === 'build' ? q.maths.value : q.answer;
    assert.equal(answer, perimeterOf(q.visual.points));
  }
  const l2 = all('perimeter', 2);
  assert.ok(l2.every(q => q.visual.labels.includes('?') && q.visual.points.length > 4));
  const box = q => { const xs = q.visual.points.map(p => p[0]), ys = q.visual.points.map(p => p[1]); return 2 * (Math.max(...xs) + Math.max(...ys)); };
  assert.ok(l2.some(q => q.answer > box(q)), 'some shapes (U notches) are longer than their bounding rectangle');
  assert.ok(new Set(l2.map(q => JSON.stringify(q.visual.points))).size > 50, 'notches vary');
  assert.ok(all('perimeter', 1).some(q => q.visual.points[1][0] === q.visual.points[2][1]), 'squares appear');
  const l4 = all('perimeter', 4);
  assert.ok(l4.every(q => q.unit === 'm' || /\bm\b/.test(q.prompt)));
  assert.ok(l4.some(q => /gate/.test(q.prompt)) && l4.some(q => /square field/.test(q.prompt)) && l4.some(q => q.visual));
  for (const q of l4.filter(q => /gate/.test(q.prompt))) { const [a, b, g] = q.prompt.match(/\d+/g).map(Number); assert.equal(q.answer, 2 * (a + b) - g); }
});

test('area: count, compare, sort at least four rectangles, applied problem', () => {
  for (const q of all('area', 1)) assert.equal(q.answer, q.visual.cells.length);
  for (const q of all('area', 2)) assert.equal(q.kind, 'choice');
  for (const q of all('area', 3)) {
    assert.ok(q.cards.length >= 4);
    for (const c of q.cards) { const [a, b] = c.label.match(/\d+/g).map(Number); assert.equal(c.bin, `${a * b} squares`); }
  }
  for (const q of all('area', 4)) assert.equal(q.answer + q.laid, q.visual.cells.length);
});

test('units: reverse conversions at level 2, mixed-unit matching at 3, varied stories at 4', () => {
  assert.ok(all('units', 1).some(q => /Convert 1[0-5] /.test(q.prompt)), 'sizes beyond 9');
  for (const q of all('units', 2)) { const [big] = q.prompt.match(/\d+/g).map(Number); assert.ok(big > q.answer); }
  for (const q of all('units', 3)) assert.ok(q.cards.length >= 4);
  const l4 = all('units', 4).map(q => q.prompt.replace(/\d+/g, '#'));
  assert.ok(new Set(l4).size >= 6, 'story forms vary');
});

test('money: singular "1 litre", and every estimate offers three wrong near-miss answers', () => {
  const labels = [1, 3].flatMap(l => all('money', l)).flatMap(q => q.options ?? q.items.map(x => x.label));
  assert.ok(!labels.some(o => /^1 litres$/.test(o)), 'no "1 litres"');
  for (const q of all('money', 2)) assert.equal(q.options.length, 4, q.prompt);
});

test('timeProblems level 4: story sizes fit their context', () => {
  for (const q of all('timeProblems', 4)) {
    const big = Number(q.prompt.match(/\d+/)[0]);
    if (/film/.test(q.prompt)) assert.ok(big <= 3, q.prompt);
    if (/summer holiday/.test(q.prompt)) assert.ok(big <= 6, q.prompt);
    if (/egg timer|song/.test(q.prompt)) assert.ok(big <= 6, q.prompt);
    assert.doesNotMatch(q.prompt, /puppy/);
  }
  assert.ok(new Set(all('timeProblems', 4).map(q => q.prompt.replace(/\d+/g, '#').replace(/\b(hour|minute|second|year|month|week|day)s\b/g, '$1'))).size >= 10, 'contexts vary');
});

test('time level 4: the clock is named for the right place', () => {
  for (const q of all('time', 4)) if (/clock at the/.test(q.prompt)) {
    const what = q.prompt.match(/(bus|train|ferry) leaves/)[1];
    assert.match(q.prompt, { bus: /bus station/, train: /railway station/, ferry: /ferry port/ }[what]);
  }
});
