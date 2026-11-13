import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { familyFridayEdition } from './familyFriday.js';
import { familyFridayEdition as legacyEdition } from './familyFriday/v1.js';
import pool from './familyFriday/curriculum-v2.js';
import { RECENT_FAMILY_WEEKS } from './familyFriday/v2.js';
import { adaptFamilyQuestion } from '../../scripts/familyFridayPool.js';

const friday = index => new Date(Date.UTC(2026, 10, 13 + index * 7, 12)).toISOString().slice(0, 10);
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');

test('retains the original publication algorithm for archived launch content', () => {
  let previous;
  for (let index = 0; index < 520; index += 1) {
    const week = new Date(Date.UTC(2026, 10, 13 + index * 7, 12)).toISOString().slice(0, 10);
    const quiz = legacyEdition(week);
    assert.deepEqual(quiz, legacyEdition(week));
    assert.equal(quiz.questions.length, 5);
    assert.equal(new Set(quiz.questions.map(question => question.category)).size, 5);
    assert.equal(quiz.number, index + 1);
    for (const question of quiz.questions) {
      assert.equal(question.options.length, 3);
      assert.equal(new Set(question.options).size, 3);
      assert.equal(question.options.filter(option => option === question.answer).length, 1);
      assert.ok(question.explanation.length > 15);
      assert.ok(!question.options.some(option => /^-\d/.test(option)));
      if (question.source) assert.match(question.source, /^https:\/\//);
    }
    // No same factual/word question in consecutive editions.
    if (previous) for (let i = 0; i < 3; i += 1) assert.notEqual(quiz.questions[i].id, previous.questions[i].id);
    const maths = quiz.questions[3];
    const amounts = maths.prompt.match(/\d+/g).map(Number);
    const expected = maths.id === 'sharing' ? amounts[0] / 2 : maths.id === 'picnic' ? amounts[0] + amounts[1] : amounts[0] - amounts[1];
    assert.equal(Number(maths.answer), expected);
    const picture = quiz.questions[4];
    const target = picture.prompt.match(/many (star|circle|triangle)s/)[1];
    assert.equal(picture.picture.items.filter(shape => shape === target).length, Number(picture.answer));
    previous = quiz;
  }
  assert.equal(familyFridayEdition('2026-11-14'), null);
  assert.equal(familyFridayEdition('2026-02-30'), null);
});

test('keeps the already-published launch edition byte-for-byte stable', () => {
  assert.equal(digest(familyFridayEdition('2026-11-13')), '837395859467392f2e9b22f879e9a4698b9bec85fe95d6e594bf11b972f87168');
});

test('pins the curriculum publication snapshot and its first edition for future archive stability', () => {
  assert.equal(digest(pool), 'cfd3eb6ed0269449c03227c7234b440c18c41f031d4c4e10c3bc6995f1d91054');
  assert.equal(digest(familyFridayEdition('2026-11-20')), '9b736005f87fe7c4307c2ab6d706163c42ba2c235b09508c741b0a3c3c9178fe');
});

test('frozen curriculum pool covers all six years and every available subject with answerable choices', () => {
  assert.ok(pool.length > 1500);
  assert.equal(new Set(pool.map(q => q.id)).size, pool.length);
  assert.deepEqual([...new Set(pool.map(q => q.curriculum.year))].sort(), [1, 2, 3, 4, 5, 6]);
  assert.deepEqual(new Set(pool.map(q => q.curriculum.subject)), new Set(['math', 'english', 'science', 'history', 'geography', 'art', 'computing', 'design', 'french', 'music', 'pe', 'wellbeing']));
  for (const q of pool) {
    assert.equal(q.options.length, 3, q.id);
    assert.equal(new Set(q.options.map(option => option.toLowerCase())).size, 3, q.id);
    assert.equal(q.options.filter(option => option === q.answer).length, 1, q.id);
    assert.ok(q.prompt && q.explanation.trim(), q.id);
    assert.ok(q.curriculum.sourceRefs.every(ref => ref.path.startsWith('docs/curriculum/')), q.id);
    assert.doesNotMatch(JSON.stringify(q), /\bundefined\b|\bNaN\b|\[object Object\]/, q.id);
  }
});

test('automatically assembles a mixed quiz every Friday for ten years without recent curriculum repeats', () => {
  const recent = [], seenYears = new Set(), seenSubjects = new Set();
  for (let index = 1; index <= 520; index += 1) {
    const week = friday(index), quiz = familyFridayEdition(week);
    assert.deepEqual(quiz, familyFridayEdition(week));
    assert.equal(quiz.number, index + 1);
    assert.equal(quiz.questions.length, 5);
    const curriculum = quiz.questions.filter(q => q.curriculum);
    assert.equal(curriculum.length, 4);
    assert.equal(quiz.questions.filter(q => q.category === 'Family discovery').length, 1);
    assert.equal(new Set(curriculum.map(q => q.curriculum.subject)).size, 4);
    for (const years of [[1, 2], [3, 4], [5, 6]]) assert.ok(curriculum.some(q => years.includes(q.curriculum.year)));
    const previous = new Set(recent.flat());
    for (const q of curriculum) {
      assert.ok(!previous.has(q.id), `${week} repeats ${q.id} within ${RECENT_FAMILY_WEEKS} weeks`);
      seenYears.add(q.curriculum.year); seenSubjects.add(q.curriculum.subject);
      assert.equal(q.options.length, 3);
      assert.equal(new Set(q.options).size, 3);
      assert.ok(q.options.includes(q.answer));
    }
    recent.push(curriculum.map(q => q.id));
    if (recent.length > RECENT_FAMILY_WEEKS) recent.shift();
  }
  assert.equal(seenYears.size, 6);
  assert.equal(seenSubjects.size, 12);
  // The pool never expires, even long after any finite launch schedule.
  assert.equal(familyFridayEdition(friday(5200)).questions.length, 5);
  // Out-of-order archive access cannot depend on the visitor's quiz history.
  assert.deepEqual(familyFridayEdition(friday(2)), familyFridayEdition('2026-11-27'));
});

test('replays cannot mutate frozen curriculum provenance or choices', () => {
  const expected = familyFridayEdition('2026-11-20');
  const mutated = familyFridayEdition('2026-11-20');
  const q = mutated.questions.find(item => item.curriculum);
  q.options.reverse(); q.curriculum.sourceRefs[0].path = 'changed';
  assert.deepEqual(familyFridayEdition('2026-11-20'), expected);
});

test('adapter includes only short independent choices and retains the scored answer', () => {
  const item = {
    id: 'sample.1', topicId: 'sample', practice: { challengeId: 2 }, sourceRefs: [],
    public: { prompt: 'Which number is even?', model: null, evidence: [], input: { kind: 'choice', options: [{ id: 'a', label: '3' }, { id: 'b', label: '4' }, { id: 'c', label: '5' }, { id: 'd', label: '7' }] } },
    scoring: { accepted: ['b'] }, review: { explanation: 'Four can be shared equally between two groups.' },
  };
  const adapted = adaptFamilyQuestion(item, 1, 'math');
  assert.equal(adapted.answer, '4');
  assert.equal(adapted.options.length, 3);
  assert.equal(adapted.curriculum.challengeId, 2);
  for (const change of [
    { model: { renderer: 'table' } }, { evidence: [{ text: 'A long passage' }] },
    { input: { kind: 'sort' } }, { prompt: 'Look at the diagram. Which part is labelled A?' },
    { prompt: 'word '.repeat(46) },
    { input: { kind: 'choice', options: [{ id: 'a', label: 'yes' }, { id: 'b', label: 'no' }] } },
  ]) assert.equal(adaptFamilyQuestion({ ...item, public: { ...item.public, ...change } }, 1, 'math'), null);
});

test('replaying an edition does not mutate its original choices or answers', () => {
  const first = familyFridayEdition('2026-11-13');
  const second = familyFridayEdition('2026-11-13');
  first.questions[0].options.reverse();
  assert.deepEqual(familyFridayEdition('2026-11-13'), second);
});
