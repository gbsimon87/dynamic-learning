import test from 'node:test';
import assert from 'node:assert/strict';
import { RUNNER, EQUATION_GRID, arithmeticLanePoint, steerArithmeticLane, createArithmeticRunner } from './solarArithmeticRunner.js';

const run = (r, seconds, dt = 1 / 30) => { const hits = []; for (let t = 0; t < seconds; t += dt) { const lane = r.step(dt); if (lane !== null) hits.push(lane); } return hits; };

test('rings close in slowly and answer once with the current lane', () => {
  const r = createArithmeticRunner(); r.reset();
  assert.deepEqual(run(r, RUNNER.approachSeconds * .8), [], 'still approaching');
  assert.ok(r.distance > 0 && r.distance < RUNNER.startDistance);
  r.setLane(3);
  assert.deepEqual(run(r, RUNNER.approachSeconds), [3]);
  assert.deepEqual(run(r, 5), [], 'no repeat answer until the next round');
});
test('lane changes are clamped and glide; reset re-arms', () => {
  const r = createArithmeticRunner(); r.setLane(-4); assert.equal(r.lane, 0); r.setLane(9); assert.equal(r.lane, 3); r.setLane(1.5); assert.equal(r.lane, 3);
  r.step(1 / 60); assert.ok(r.x < RUNNER.laneX[3], 'glides, never jumps');
  assert.deepEqual(run(r, RUNNER.approachSeconds + 1), [], 'not armed before the first round');
  r.reset(); r.setLane(0); assert.deepEqual(run(r, RUNNER.approachSeconds + 1), [0]);
});
test('paused frames do not move anything', () => {
  const r = createArithmeticRunner(); r.reset(); const before = r.distance;
  assert.equal(r.step(0), null); assert.equal(r.step(NaN), null); assert.equal(r.distance, before);
});
test('Turbo closes the rings in faster but never speeds the lane glide', () => {
  const plain = createArithmeticRunner(), boosted = createArithmeticRunner(); plain.reset(); boosted.reset();
  plain.setLane(3); boosted.setLane(3);
  plain.step(.5); boosted.step(.5, RUNNER.turbo);
  assert.ok(Math.abs((RUNNER.startDistance - boosted.distance) - RUNNER.turbo * (RUNNER.startDistance - plain.distance)) < 1e-9);
  assert.equal(boosted.x, plain.x);
  const r = createArithmeticRunner(); r.reset(); const hits = [];
  for (let t = 0; t < RUNNER.approachSeconds / RUNNER.turbo + .1; t += 1 / 30) { const lane = r.step(1 / 30, RUNNER.turbo); if (lane !== null) hits.push(lane); }
  assert.deepEqual(hits, [1], 'still answers exactly once');
});
test('the rings just passed carry on behind while the next set starts far ahead', () => {
  const r = createArithmeticRunner(); r.reset();
  assert.equal(r.trailDistance, RUNNER.passDistance, 'nothing behind at the start');
  run(r, RUNNER.approachSeconds + 1 / 30); assert.ok(r.distance <= 0);
  const passed = r.distance; r.reset();
  assert.equal(r.trailDistance, passed); assert.equal(r.distance, RUNNER.startDistance);
  r.step(.5); assert.ok(r.trailDistance < passed && r.trailDistance >= RUNNER.passDistance);
});
test('the rings fan out like a text crawl: straight lines from the middle to balanced, even lanes', async () => {
  const { crawlSpread, CRAWL } = await import('./solarArithmeticArea.js');
  assert.equal(crawlSpread(RUNNER.startDistance), CRAWL.farSpread);
  assert.equal(crawlSpread(0), 1, 'on their lanes when they reach the rocket');
  const mid = crawlSpread(RUNNER.startDistance / 2);
  assert.ok(Math.abs(mid - (1 + CRAWL.farSpread) / 2) < 1e-12, 'straight lines, not curves');
  assert.ok(crawlSpread(-10) > 1, 'passed rings keep spreading');
  const gaps = RUNNER.laneX.slice(1).map((x, i) => x - RUNNER.laneX[i]);
  assert.ok(gaps.every(g => g === gaps[0]), 'evenly spaced'); assert.equal(RUNNER.laneX[0], -RUNNER.laneX[3], 'balanced');
});

test('equation steering changes one row or column and stops at each edge', () => {
  const expected = { left: [0, 0, 2, 2], right: [1, 1, 3, 3], up: [0, 1, 0, 1], down: [2, 3, 2, 3] };
  for (const [direction, lanes] of Object.entries(expected)) {
    lanes.forEach((next, lane) => assert.equal(steerArithmeticLane(lane, direction, true), next));
  }
  assert.equal(steerArithmeticLane(1, 'right'), 2, 'number answers retain a single row');
  assert.equal(steerArithmeticLane(1, 'down'), 1);
});

test('every equation ring is reached by gliding in two dimensions, with a longer reading approach', () => {
  for (let lane = 0; lane < 4; lane++) {
    const r = createArithmeticRunner(); r.reset({ grid: true }); r.setLane(lane);
    r.step(.1);
    const target = arithmeticLanePoint(lane, true);
    assert.ok(Math.abs(r.y) > 0 && Math.abs(r.y) < Math.abs(target.y), 'vertical movement glides');
    const before = [r.x, r.y, r.distance]; r.step(0); assert.deepEqual([r.x, r.y, r.distance], before);
    assert.deepEqual(run(r, RUNNER.approachSeconds), [], 'still time to read after a number round would finish');
    assert.deepEqual(run(r, EQUATION_GRID.approachSeconds), [lane], 'both coordinates decide the physical crossing');
    assert.deepEqual(run(r, 3), [], 'one crossing only');
    r.reset({ grid: true }); assert.equal(r.lane, lane, 'keep row and column into the next round');
  }
});
