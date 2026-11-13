import test from 'node:test';
import assert from 'node:assert/strict';
import { familyFridayEdition } from './familyFriday.js';

test('publishes stable five-question editions beyond the initial launch weeks', () => {
  let previous;
  for (let index = 0; index < 520; index += 1) {
    const week = new Date(Date.UTC(2026, 10, 13 + index * 7, 12)).toISOString().slice(0, 10);
    const quiz = familyFridayEdition(week);
    assert.deepEqual(quiz, familyFridayEdition(week));
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

test('replaying an edition does not mutate its original choices or answers', () => {
  const first = familyFridayEdition('2026-11-13');
  const second = familyFridayEdition('2026-11-13');
  first.questions[0].options.reverse();
  assert.deepEqual(familyFridayEdition('2026-11-13'), second);
});
