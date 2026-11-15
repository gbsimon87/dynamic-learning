import test from 'node:test';
import assert from 'node:assert/strict';
import { runInNewContext } from 'node:vm';
import { makeSpaceQuestion } from './spaceArithmeticQuestions.js';
import { DEFAULT_PRACTICE_SETTINGS, OPERATIONS } from '../../pages/skills/math/practiceSettings.js';

function assertValid(q) {
  assert.doesNotMatch(q.prompt, /NaN|undefined|Infinity/);
  assert.ok(Number.isInteger(q.answer) && q.answer >= 0);
  assert.equal(q.options.length, 4);
  assert.equal(new Set(q.options).size, 4);
  assert.equal(q.options.filter(n => n === q.answer).length, 1);
  assert.ok(q.options.every(n => Number.isInteger(n) && n >= 0));
}
for (const operation of OPERATIONS) test(`${operation}: valid questions across ranges and term counts`, () => {
  for (const max of [1, 10, 20, 50]) for (const operands of [2, 3, 4]) {
    let previous;
    for (let i = 0; i < 20; i++) {
      const q = makeSpaceQuestion({ ...DEFAULT_PRACTICE_SETTINGS, types: [operation], max, operands }, previous);
      assertValid(q);
      const expression = q.key.replaceAll('×', '*').replaceAll('÷', '/');
      assert.equal(q.answer, runInNewContext(expression));
      previous = q.key;
    }
  }
});
test('old or incomplete settings never produce NaN questions or rings', () => {
  for (const settings of [undefined, {}, { operationId: 'addition', levelId: 'easier' },
    { min: NaN, max: Infinity }, { min: undefined, max: undefined }]) {
    const q = makeSpaceQuestion(settings);
    assertValid(q);
    assert.equal(q.answer, q.parts.a + q.parts.b);
  }
});
test('mixed operations stay valid across successive questions', () => {
  let previous;
  for (let i = 0; i < 100; i++) {
    const q = makeSpaceQuestion({ ...DEFAULT_PRACTICE_SETTINGS, types: OPERATIONS, mixOperations: true, operands: 4 }, previous);
    assertValid(q);
    assert.equal(q.answer, runInNewContext(q.key.replaceAll('×', '*').replaceAll('÷', '/')));
    previous = q.key;
  }
});
