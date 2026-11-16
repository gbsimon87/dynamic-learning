import test from 'node:test';
import assert from 'node:assert/strict';
import { COMEBACK, scheduleComeback, takeComeback } from './spaceArithmeticFlight.js';

const sum = key => ({ key, prompt: `${key} = ?`, answer: 5, options: [4, 5, 6, 7] });

test('a missed sum comes back after a few other questions, once, with the same answers reshuffled', () => {
  let queue = scheduleComeback([], sum('2 + 3'));
  const asked = [];
  for (let i = 0; i < COMEBACK.after + 2; i++) {
    const next = takeComeback(queue); queue = next.queue; asked.push(next.question?.key ?? null);
  }
  assert.deepEqual(asked, [null, null, '2 + 3', null, null]);
  const again = takeComeback(scheduleComeback([], sum('2 + 3')));
  assert.equal(again.question, null);
});

test('the comeback keeps its answer and options and is marked', () => {
  let queue = scheduleComeback([], sum('9 − 4'));
  let next;
  do { next = takeComeback(queue); queue = next.queue; } while (!next.question);
  assert.equal(next.question.comeback, true);
  assert.equal(next.question.answer, 5);
  assert.deepEqual([...next.question.options].sort(), [4, 5, 6, 7]);
});

test('one entry per sum, and only a few wait at once', () => {
  let queue = scheduleComeback(scheduleComeback([], sum('a')), sum('a'));
  assert.equal(queue.length, 1);
  for (const key of ['b', 'c', 'd', 'e', 'f', 'g']) queue = scheduleComeback(queue, sum(key));
  assert.equal(queue.length, COMEBACK.max);
  assert.equal(queue[0].question.key, 'c');
  assert.equal(scheduleComeback(queue, null), queue);
});
