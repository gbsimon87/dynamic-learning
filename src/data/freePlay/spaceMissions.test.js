import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MISSIONS, missionById, makeMissionQuestion, makeBondQuestion, makeSkipQuestion,
  BOND_TARGETS, SKIP_STEPS, STREAK_TIERS, streakTier,
} from './spaceMissions.js';

const fourUnique = (q, label) => {
  assert.equal(q.options.length, 4, label);
  assert.equal(new Set(q.options).size, 4, `${label}: unique options ${q.options}`);
  assert.equal(q.options.filter(o => o === q.answer).length, 1, `${label}: exactly one right option`);
};

test('Laser Blast has three question sets with a title, picture and short word; old or unknown ids fall back to Sums', () => {
  assert.deepEqual(MISSIONS.map(m => m.id), ['blaster', 'bonds', 'skip']);
  for (const m of MISSIONS) {
    assert.ok(m.title && m.emoji && m.short && m.title.toLowerCase().includes(m.short.toLowerCase()), m.id);
    assert.ok(['practice', 'bonds', 'skip'].includes(m.questions), m.id);
    assert.ok(['ring', 'star'].includes(m.dressing), m.id);
  }
  for (const old of ['nope', undefined, 'free', 'comet']) assert.equal(missionById(old).id, 'blaster');
});

test('Make 10: a + ? = target with whole-number answers, near-miss options and the given number as a tempting wrong one', () => {
  for (const target of BOND_TARGETS) {
    for (let i = 0; i < 300; i++) {
      const q = makeBondQuestion(target);
      const label = `${target}: ${q.prompt} ${q.options}`;
      const m = /^(\d+) \+ \? = (\d+)$/.exec(q.prompt);
      assert.ok(m, label);
      const a = Number(m[1]);
      assert.equal(Number(m[2]), target, label);
      assert.equal(a + q.answer, target, label);
      fourUnique(q, label);
      assert.ok(q.options.every(o => Number.isInteger(o) && o >= 0 && o <= target), label);
      if (target === 100) assert.ok(a % 10 === 0 && q.options.every(o => o % 10 === 0), `tens for 100: ${label}`);
      assert.equal(q.bond.a, a); assert.equal(q.bond.target, target);
      assert.equal(q.kind, 'bonds'); assert.equal(q.parts, null);
    }
  }
});

test('Skip-count: four terms in steps, one missing, options include the neighbours a child might pick', () => {
  for (const step of SKIP_STEPS) {
    for (let i = 0; i < 300; i++) {
      const q = makeSkipQuestion(step);
      const label = `${step}: ${q.prompt} ${q.options}`;
      const terms = q.prompt.split(', ');
      assert.equal(terms.length, 4, label);
      const gap = terms.indexOf('?');
      assert.ok(gap >= 1, `never the first term: ${label}`);
      const values = terms.map(t => (t === '?' ? q.answer : Number(t)));
      values.slice(1).forEach((v, i) => assert.equal(v - values[i], step, label));
      assert.equal(values[0] % step, 0, `starts on a multiple: ${label}`);
      fourUnique(q, label);
      assert.ok(q.options.every(o => Number.isInteger(o) && o >= 0), label);
      assert.ok(q.options.includes(q.answer + step), `next term is a tempting wrong answer: ${label}`);
      assert.equal(q.skip.step, step);
      assert.equal(q.kind, 'skip');
      assert.match(q.speech, /blank/);
    }
  }
});

test('mission questions: practice missions use the Arithmetic Practice settings; new kinds avoid repeating; every question names its dressing', () => {
  const practice = makeMissionQuestion({ mission: 'blaster', types: ['addition'], operands: 2, min: 1, max: 10 });
  assert.match(practice.prompt, /^\d+ \+ \d+ = \?$/);
  assert.equal(practice.dressing, 'ring');
  const sums = makeMissionQuestion({ mission: 'blaster', types: ['addition'], operands: 2, min: 1, max: 10, find: 'sum' });
  assert.equal(sums.reverse, true);
  assert.equal(sums.dressing, 'ring', 'calculation grids always fly in rings');
  const bond = makeMissionQuestion({ mission: 'bonds', bondTarget: 20 });
  assert.match(bond.prompt, /= 20$/); assert.equal(bond.dressing, 'star');
  const skip = makeMissionQuestion({ mission: 'skip', skipStep: 5 });
  assert.equal(skip.skip.step, 5); assert.equal(skip.dressing, 'ring');
  let repeats = 0;
  for (let i = 0; i < 200; i++) { const next = makeMissionQuestion({ mission: 'skip', skipStep: 10 }, skip.key); if (next.key === skip.key) repeats++; }
  assert.ok(repeats < 10, `rarely repeats the previous question (${repeats})`);
  assert.equal(makeMissionQuestion({ mission: 'bonds', bondTarget: 7 }).bond.target, 10, 'unknown target falls back to 10');
  assert.equal(makeMissionQuestion({ mission: 'skip', skipStep: 0 }).skip.step, 2, 'unknown step falls back to 2');
});

test('streak power-ups: none below 3, then Blazing, Lightning and Rainbow', () => {
  assert.equal(streakTier(0), null); assert.equal(streakTier(2), null);
  assert.deepEqual([3, 5, 6, 9, 10, 25].map(n => streakTier(n).id), ['blazing', 'blazing', 'lightning', 'lightning', 'rainbow', 'rainbow']);
  assert.ok(STREAK_TIERS.every(t => t.emoji && t.name));
});
