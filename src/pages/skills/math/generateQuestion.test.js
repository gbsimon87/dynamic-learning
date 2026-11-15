import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateCalculation, generateReverseQuestion } from './generateQuestion.js';

test('evaluates the calculations the generator writes', () => {
  assert.equal(evaluateCalculation('3 + 4'), 7);
  assert.equal(evaluateCalculation('20 - 6 - 4'), 10);
  assert.equal(evaluateCalculation('2 × 3 × 4'), 24);
  assert.equal(evaluateCalculation('4 + (5 × 2)'), 14);
  assert.equal(evaluateCalculation('(6 + 6) ÷ 4'), 3);
  assert.ok(Number.isNaN(evaluateCalculation('3 +')));
  assert.ok(Number.isNaN(evaluateCalculation('alert(1)')));
});

const SETTINGS = [
  { types: ['addition'], operands: 2, min: 1, max: 10 },
  { types: ['subtraction'], operands: 3, min: 1, max: 20 },
  { types: ['multiplication'], operands: 2, min: 1, max: 10 },
  { types: ['division'], operands: 2, min: 1, max: 10 },
  { types: ['addition', 'multiplication', 'division'], mixOperations: true, operands: 4, min: 1, max: 50 },
  { types: ['addition'], operands: 2, min: 1, max: 1 },
];
test('find the sum: four different calculations, exactly one makes the target', () => {
  for (const settings of SETTINGS) for (let n = 0; n < 200; n++) {
    const q = generateReverseQuestion(settings);
    assert.equal(q.options.length, 4); assert.equal(new Set(q.options).size, 4);
    assert.ok(q.options.includes(q.correctAnswer));
    assert.equal(evaluateCalculation(q.correctAnswer), q.target);
    const making = q.options.filter(text => evaluateCalculation(text) === q.target);
    assert.deepEqual(making, [q.correctAnswer], JSON.stringify(q));
    for (const text of q.options) { const v = evaluateCalculation(text); assert.ok(Number.isInteger(v) && v >= 0, text); }
  }
});
