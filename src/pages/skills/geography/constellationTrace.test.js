import test from 'node:test';
import assert from 'node:assert/strict';
import { traceSteps } from './constellationTrace.js';
import { constellations } from './constellations.js';

test('every figure can be traced, including branches and return visits, without inventing edges', () => {
  for (const figure of constellations) {
    const steps = traceSteps(figure.lines);
    const drawn = [];
    let completed = 0;
    steps.forEach((step, index) => {
      assert.ok(figure.stars.some(s => s.id === step.id));
      if (step.lines > completed) {
        drawn.push([steps[index - 1].id, step.id]);
        completed = step.lines;
      }
    });
    assert.deepEqual(drawn, figure.lines, figure.id);
  }
  assert.deepEqual(traceSteps([['a', 'b'], ['a', 'c']]), [
    { id: 'a', lines: 0 }, { id: 'b', lines: 1 }, { id: 'a', lines: 1 }, { id: 'c', lines: 2 },
  ]);
});
