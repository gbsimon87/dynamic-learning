import test from 'node:test';
import assert from 'node:assert/strict';
import { PLANET_ORBITS, solveKepler, orbitPointAt, orbitPosition, orbitPathPoints } from './planetOrbits.js';
import { getBodyPose } from './solarSimulation.js';

const NEPTUNE = { distance: 770.77, speed: 0.0006, orbit: PLANET_ORBITS.Neptune };
const PLUTO = { distance: 1000, speed: 0.0004, orbit: PLANET_ORBITS.Pluto };
const length = (p) => Math.hypot(p.x, p.y, p.z);
const flat = (p) => Math.hypot(p.x, p.z);

test('Kepler solve satisfies M = E - e sin E, even for stretched orbits', () => {
  for (const e of [0, 0.0167, 0.2488, 0.72]) {
    for (const mean of [0, 0.3, 2, Math.PI, 5.9, -1, 40]) {
      const anomaly = solveKepler(mean, e);
      const wrapped = ((mean % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      assert.ok(Math.abs(anomaly - e * Math.sin(anomaly) - wrapped) < 1e-10, `e=${e} M=${mean}`);
    }
  }
});

test('the Sun sits at a focus: distance runs from a(1-e) to a(1+e)', () => {
  for (const [name, orbit] of Object.entries(PLANET_ORBITS)) {
    const radii = orbitPathPoints(100, orbit, 720).map(length);
    assert.ok(Math.abs(Math.min(...radii) - 100 * (1 - orbit.eccentricity)) < 1e-6, name);
    assert.ok(Math.abs(Math.max(...radii) - 100 * (1 + orbit.eccentricity)) < 1e-3, name);
  }
});

test("Pluto's path dips inside Neptune's, passing well above it", () => {
  const neptuneInner = Math.min(...orbitPathPoints(NEPTUNE.distance, NEPTUNE.orbit, 720).map(length));
  const pluto = orbitPathPoints(PLUTO.distance, PLUTO.orbit, 720);
  const inside = pluto.filter((p) => length(p) < neptuneInner);
  assert.ok(inside.length > 0);
  // Inside Neptune's path, Pluto is many Earth-Sun distances (25.64) off the plane.
  for (const p of inside) assert.ok(Math.abs(p.y) > 4 * 25.64);
  // Seen from above, the two lines cross.
  assert.ok(Math.min(...pluto.map(flat)) < neptuneInner);
});

test('orbits tilt by their inclination; Earth stays in the plane', () => {
  for (const [name, orbit] of Object.entries(PLANET_ORBITS)) {
    const points = orbitPathPoints(100, orbit, 720);
    const maxLatitude = Math.max(...points.map((p) => Math.asin(Math.abs(p.y) / length(p))));
    assert.ok(Math.abs(maxLatitude - orbit.inclination * Math.PI / 180) < 0.01, name);
  }
  assert.ok(orbitPathPoints(25.64, PLANET_ORBITS.Earth).every((p) => p.y === 0));
});

test('planets go anticlockwise from above, faster near the Sun, and close the loop each year', () => {
  const mercury = { distance: 10, speed: 0.01, orbit: PLANET_ORBITS.Mercury };
  const period = 2 * Math.PI / mercury.speed;
  const start = orbitPosition(mercury, 0);
  const end = orbitPosition(mercury, period);
  assert.ok(length({ x: end.x - start.x, y: end.y - start.y, z: end.z - start.z }) < 1e-9);
  // Same scene direction as the old circles: +z towards +x.
  const a = orbitPosition(mercury, 0), b = orbitPosition(mercury, 1);
  assert.ok(a.z * b.x - a.x * b.z > 0);
  // Equal times sweep equal areas, so the step is longest at perihelion.
  const step = (E) => {
    const p = orbitPointAt(10, mercury.orbit, E), q = orbitPointAt(10, mercury.orbit, E + 1e-4);
    return length({ x: q.x - p.x, y: q.y - p.y, z: q.z - p.z }) / (1e-4 * (1 - mercury.orbit.eccentricity * Math.cos(E)));
  };
  assert.ok(step(0) > step(Math.PI) * 1.4);
});

test('getBodyPose uses the ellipse for planets and keeps circles for moons', () => {
  const time = { orbitTime: 123, spinTime: 4 };
  assert.deepEqual(getBodyPose(PLUTO, time).position, orbitPosition(PLUTO, 123));
  const moon = getBodyPose({ speed: 0.015, distance: 3 }, time).position;
  assert.ok(Math.abs(length(moon) - 3) < 1e-12 && moon.y === 0);
});
