import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createSolarFreeFlight, flightSpeed } from './solarFreeFlight.js';

// Home's flight settings, from its system definition.
const FLIGHT_EDGE_RADIUS = 1350;

function setup({ reduced = true, onCameraViewChange = () => {}, getCameraView = () => 'behind', edgeRadius = FLIGHT_EDGE_RADIUS, startBodyId = 'Earth', bodyList = [['Earth', .45, 0], ['Mars', .23, -35], ['Sun', 5, -70]], ...more } = {}) {
  const oldWindow = globalThis.window, oldDocument = globalThis.document;
  globalThis.window = new EventTarget(); globalThis.document = new EventTarget();
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(50, 1, .1, 5000);
  camera.position.set(0, 72, 128); camera.lookAt(0, 0, 0);
  const controls = { target: new THREE.Vector3(), enabled: true };
  const bodies = bodyList.map(([id, radius, z]) => {
    const object3d = new THREE.Object3D(); object3d.position.z = z; scene.add(object3d);
    return { id, name: id, radius, object3d, kind: id === 'Sun' ? 'star' : 'planet' };
  });
  const changes = [];
  const flight = createSolarFreeFlight({ scene, camera, controls, bodies, edgeRadius, startBodyId, quality: 'low', reducedMotion: () => reduced, onChange: state => changes.push(state), onCameraViewChange, getCameraView, ...more });
  const ship = scene.getObjectByName('solar-free-flight');
  const tick = (n = 1) => { for (let i = 0; i < n; i++) flight.update(.05); };
  const key = (type, value) => { const event = new Event(type, { cancelable: true }); event.key = value; window.dispatchEvent(event); return event; };
  const clean = () => { flight.dispose(); globalThis.window = oldWindow; globalThis.document = oldDocument; };
  return { flight, ship, camera, controls, bodies, changes, scene, tick, key, clean };
}

test('manual flight steers in the shared world, stops after release and restores the camera on exit', () => {
  const t = setup();
  try {
    const position = t.camera.position.clone(), rotation = t.camera.quaternion.clone();
    t.flight.enter(); assert.equal(t.controls.enabled, false); assert.equal(t.ship.visible, true);
    t.flight.face('Mars'); const start = t.ship.position.clone();
    t.flight.setThrust(true); t.tick(70);
    assert.ok(t.ship.position.distanceTo(start) > 3);
    t.flight.setThrust(false); t.tick(30);
    const stopped = t.ship.position.clone(); t.tick(30);
    assert.ok(t.ship.position.distanceTo(stopped) < .001);
    assert.ok(t.changes.some(c => c.speed > 0));
    t.flight.setStick(1, .5); const heading = t.ship.quaternion.clone(); t.tick(10);
    assert.ok(t.ship.quaternion.angleTo(heading) > .1);
    t.flight.exit(); assert.ok(t.camera.position.equals(position)); assert.ok(t.camera.quaternion.angleTo(rotation) < 1e-7);
    assert.equal(t.controls.enabled, true); assert.equal(t.ship.visible, false);
    t.flight.enter(); t.tick(); assert.equal(t.changes.at(-1).speed, 0, 're-entry has no stale thrust');
  } finally { t.clean(); }
});

test('keyboard input stops on blur and ignores inactive flight; bumpers keep ship and camera outside worlds', () => {
  const t = setup();
  try {
    assert.equal(t.key('keydown', ' ').defaultPrevented, false);
    t.flight.enter(); t.flight.face('Mars');
    assert.equal(t.key('keydown', ' ').defaultPrevented, true); t.tick(20);
    window.dispatchEvent(new Event('blur')); const afterBlur = t.ship.position.clone(); t.tick(10);
    assert.ok(t.ship.position.equals(afterBlur));
    t.flight.home(); t.flight.setThrust(true); t.tick(300);
    for (const b of t.bodies) {
      const center = b.object3d.getWorldPosition(new THREE.Vector3());
      assert.ok(t.ship.position.distanceTo(center) >= b.radius + .34999);
      assert.ok(t.camera.position.distanceTo(center) >= b.radius + .19999);
    }
    // Moving worlds may pass over a stopped ship: the bumper still applies.
    t.flight.brake(); t.bodies[1].object3d.position.copy(t.ship.position); t.tick();
    assert.ok(t.ship.position.distanceTo(t.bodies[1].object3d.position) >= .57999);
    t.flight.dispose(); assert.equal(t.scene.getObjectByName('solar-free-flight'), undefined);
    assert.equal(t.key('keydown', ' ').defaultPrevented, false);
  } finally { t.clean(); }
});

test('flying to the clue target validates arrival, brakes once and ignores the wrong world', () => {
  const t = setup();
  try {
    t.flight.enter(); t.flight.setGoal('Mars', 'red-planet');
    t.flight.face('Earth'); t.flight.setThrust(true); t.tick(100);
    assert.equal(t.changes.at(-1).arrival, null, 'Earth cannot satisfy the Mars clue');
    t.flight.home(); t.flight.face('Mars'); t.flight.setThrust(true); t.tick(500);
    assert.deepEqual(t.changes.at(-1).arrival, { target: 'Mars', token: 'red-planet' });
    assert.equal(t.changes.at(-1).speed, 0);
    const parked = t.ship.position.clone();
    t.key('keydown', ' '); t.tick(20);
    assert.ok(t.ship.position.equals(parked), 'holding Space cannot fly through the celebration');
    t.flight.setGoal('Mars', 'another-clue'); t.flight.setThrust(true); t.tick(30);
    assert.equal(t.changes.at(-1).arrival, null, 'a new clue at the same body requires leaving and returning');
    t.flight.setGoal('Earth', 'home'); t.flight.home(); t.tick(40);
    assert.equal(t.changes.at(-1).arrival, null, 'Back to Earth is not a discovery flight');
  } finally { t.clean(); }
});

test('belt guidance flies into its annulus and validates a region arrival', () => {
  const t = setup();
  try {
    // The module shares this live target list, just like the scene's catalogue.
    t.bodies.push({ id: 'asteroid-belt', name: 'Asteroid belt', radius: 0, kind: 'belt', getRegion: () => ({ innerRadius: 47, outerRadius: 118, halfHeight: 7 }) });
    t.flight.enter(); t.flight.setGoal('asteroid-belt', 'rocks'); t.flight.face('asteroid-belt'); t.flight.setThrust(true); t.tick(500);
    assert.deepEqual(t.changes.at(-1).arrival, { target: 'asteroid-belt', token: 'rocks' });
    const radius = Math.hypot(t.ship.position.x, t.ship.position.z);
    assert.ok(radius >= 46.85 && radius <= 118.15);
  } finally { t.clean(); }
});

test('moving satellite, moon and comet targets are reachable and manual steering releases heading assistance', () => {
  for (const [id, kind] of [['ISS', 'satellite'], ['Earth/Moon', 'moon'], ['halleys-comet', 'comet']]) {
    const t = setup();
    try {
      const object3d = new THREE.Object3D(); object3d.position.set(8, 1, -12); t.scene.add(object3d);
      t.bodies.push({ id, kind, name: id, radius: .12, object3d });
      t.flight.enter(); t.flight.setGoal(id, kind); t.flight.face(id); t.flight.setThrust(true);
      for (let i = 0; i < 400 && !t.changes.at(-1)?.arrival; i++) { object3d.position.x += .002; t.tick(); }
      assert.deepEqual(t.changes.at(-1).arrival, { target: id, token: kind });
      t.flight.setGoal('Mars', 'red'); t.flight.face('Mars'); t.flight.setStick(1, 0); t.tick(5);
      assert.equal(t.changes.at(-1).navigation, null, 'manual steering overrides the chosen heading');
    } finally { t.clean(); }
  }
});

test('Turbo and Shift boost open-space flight, release on blur, and slow safely for an arrival', () => {
  const t = setup();
  try {
    t.flight.enter(); t.flight.setStick(-1, 0); t.tick(18); t.flight.setStick(0, 0);
    t.key('keydown', 'Shift'); t.tick(120);
    assert.ok(t.changes.some(frame => frame.speed > 70), 'boost exceeds the normal cruise speed');
    assert.ok(t.flight.boostStrength() > 0, 'the pooled streaks receive a boost signal');
    t.key('keyup', 'Shift'); t.tick(5); assert.equal(t.flight.boostStrength(), 0);
    t.flight.setBoost(true); t.tick(5); window.dispatchEvent(new Event('blur')); t.tick(5);
    assert.equal(t.flight.boostStrength(), 0); assert.equal(t.changes.at(-1).speed, 0);
    t.flight.home(); t.flight.setGoal('Mars', 'red'); t.flight.face('Mars'); t.flight.setBoost(true); t.tick(500);
    assert.deepEqual(t.changes.at(-1).arrival, { target: 'Mars', token: 'red' });
    assert.equal(t.flight.boostStrength(), 0);
    assert.ok(t.ship.position.distanceTo(t.bodies[1].object3d.position) >= .57999);
  } finally { t.clean(); }
});

test('Turbo is a clear boost close to a world too, tapering only on the final approach', () => {
  assert.ok(flightSpeed(3, true) > 2.5 * flightSpeed(3, false), 'near a planet');
  assert.ok(flightSpeed(.4, true) < 1.1 * flightSpeed(.4, false), 'almost touching');
  const t = setup();
  try {
    const run = (boost) => {
      t.flight.home(); t.flight.setStick(-1, 0); t.tick(18); t.flight.setStick(0, 0);
      if (boost) t.flight.setBoost(true); else t.flight.setThrust(true);
      const start = t.ship.position.clone(); t.tick(10);
      const strength = t.flight.boostStrength();
      t.flight.brake();
      return { distance: t.ship.position.distanceTo(start), strength };
    };
    t.flight.enter();
    const go = run(false), turbo = run(true);
    assert.ok(turbo.distance > 2 * go.distance, `${turbo.distance} vs ${go.distance}`);
    assert.ok(turbo.strength > .1, 'the Turbo button and streaks light up');
  } finally { t.clean(); }
});

test('Stop holds even while Space or Shift is still held down', () => {
  const t = setup();
  try {
    const press = (key, repeat = false) => { const event = new Event('keydown', { cancelable: true }); event.key = key; event.repeat = repeat; window.dispatchEvent(event); };
    t.flight.enter(); t.flight.setStick(-1, 0); t.tick(18); t.flight.setStick(0, 0);
    press(' '); press('Shift'); t.tick(10);
    assert.ok(t.changes.at(-1).speed > 0);
    t.flight.brake();
    for (let i = 0; i < 10; i++) { press(' ', true); press('Shift', true); t.tick(); }
    assert.equal(t.changes.at(-1).speed, 0);
    t.key('keyup', ' '); press(' '); t.tick(10);
    assert.ok(t.changes.at(-1).speed > 0, 'a fresh press flies again');
  } finally { t.clean(); }
});

test('the chase camera carries rocket movement at ordinary and Turbo speed instead of falling behind', () => {
  for (const [step, ticks] of [[1 / 30, 100], [1 / 60, 180], [1 / 120, 360]]) {
    for (const turbo of [false, true]) {
      const t = setup({ reduced: false });
      try {
        t.flight.enter(); t.flight.setStick(-1, 0); t.tick(20); t.flight.setStick(0, 0);
        if (turbo) t.flight.setBoost(true); else t.flight.setThrust(true);
        let largestGap = 0, totalTravel = 0, previous = t.ship.position.clone();
        for (let i = 0; i < ticks; i++) {
          t.flight.update(step);
          largestGap = Math.max(largestGap, t.camera.position.distanceTo(t.ship.position));
          totalTravel += t.ship.position.distanceTo(previous); previous.copy(t.ship.position);
        }
        assert.ok(totalTravel > 20, `flight moved at ${1 / step} Hz`);
        assert.ok(largestGap < 3.2, `${turbo ? 'Turbo' : 'thrust'} at ${1 / step} Hz: ${largestGap}`);
      } finally { t.clean(); }
    }
  }
});

test('the chase camera keeps looking ahead through the flight boundary and the rocket can turn back', () => {
  for (const step of [1 / 30, 1 / 60, 1 / 120]) for (const turbo of [false, true]) {
    const t = setup({ reduced: false });
    try {
      t.flight.enter(); t.flight.setStick(-1, 0); t.tick(20); t.flight.setStick(0, 0);
      if (turbo) t.flight.setBoost(true); else t.flight.setThrust(true);
      const nose = new THREE.Vector3(), cameraDirection = new THREE.Vector3();
      const checkView = () => {
        nose.set(0, 1, 0).applyQuaternion(t.ship.quaternion);
        t.camera.getWorldDirection(cameraDirection);
        assert.ok(cameraDirection.dot(nose) > .8, `camera looks along the rocket heading at ${1 / step} Hz, turbo=${turbo}, radius=${t.ship.position.length()}`);
        const projected = t.ship.position.clone().project(t.camera);
        assert.ok(Math.abs(projected.x) < 1 && Math.abs(projected.y) < 1 && projected.z < 1, 'rocket stays in the camera view');
      };
      // Cruise outwards, then keep thrust held against the boundary.
      for (let i = 0; i < 5000 && t.ship.position.length() < 1349.99; i++) {
        t.flight.update(step); checkView();
      }
      assert.ok(t.ship.position.length() >= 1349.99, 'flight reached the outer boundary');
      for (let i = 0; i < Math.ceil(1 / step); i++) { t.flight.update(step); checkView(); }
      assert.ok(t.ship.position.length() <= 1350.000001, 'the existing flight boundary still holds');
      // Turn with the steering controls while thrust is still held, then fly back in.
      t.flight.setStick(1, 0);
      for (let i = 0; i < Math.ceil(Math.PI / 1.7 / step); i++) { t.flight.update(step); checkView(); }
      t.flight.setStick(0, 0);
      for (let i = 0; i < Math.ceil(4 / step); i++) { t.flight.update(step); checkView(); }
      assert.ok(t.ship.position.length() < 1250, 'manual steering lets the rocket return towards the Solar System');
    } finally { t.clean(); }
  }
});

test('cockpit view hides the rocket shell and switching back restores the close chase', () => {
  let cameraView = 'behind';
  const t = setup({ reduced: false, getCameraView: () => cameraView });
  try {
    t.flight.enter(); t.flight.setStick(-1, 0); t.tick(20); t.flight.setStick(0, 0); t.flight.setThrust(true); t.tick(30);
    cameraView = 'cockpit'; t.tick();
    assert.equal(t.ship.visible, false);
    assert.ok(t.camera.position.distanceTo(t.ship.position) < .1, 'cockpit camera is inside the rocket');
    assert.ok(t.controls.target.distanceTo(t.ship.position) > 4, 'cockpit looks ahead');
    const position = t.ship.position.clone();
    cameraView = 'behind'; t.tick(20);
    assert.equal(t.ship.visible, true);
    assert.ok(t.ship.position.distanceTo(position) > .1, 'view changes preserve active thrust');
    assert.ok(t.camera.position.distanceTo(t.ship.position) < 3.2);
    assert.equal(cameraView, 'behind');
  } finally { t.clean(); }
});

test('nearby manual orbit tracks a moving world without awarding clues and yields to steering or thrust', () => {
  const t = setup({ reduced: false });
  try {
    t.flight.enter(); t.flight.setGoal('Earth', 'home-clue'); t.tick();
    assert.equal(t.changes.at(-1).orbitPlanet.name, 'Earth');
    assert.equal(t.flight.enterOrbit(), true); assert.equal(t.changes.at(-1).orbiting, true);
    const start = t.ship.position.clone();
    for (let i = 0; i < 200; i++) { t.bodies[0].object3d.position.x += .01; t.tick(); }
    assert.ok(t.ship.position.distanceTo(start) > 1);
    assert.equal(t.changes.at(-1).arrival, null, 'orbit cannot complete a clue');
    t.key('keydown', 'd'); t.tick(); assert.equal(t.flight.isOrbiting(), false);
    t.key('keyup', 'd'); t.flight.home(); t.flight.setGoal(null); t.flight.enterOrbit();
    t.key('keydown', 'Shift'); t.tick(); assert.equal(t.flight.isOrbiting(), false);
    t.key('keyup', 'Shift'); t.flight.home(); t.flight.enterOrbit(); t.tick(10);
    t.flight.leaveOrbit(); assert.equal(t.changes.at(-1).orbiting, false);
    assert.equal(t.changes.at(-1).speed, 0);
    t.flight.enterOrbit(); t.flight.home(); assert.equal(t.flight.isOrbiting(), false);
    t.ship.position.set(1000, 1000, 1000); assert.equal(t.flight.enterOrbit(), false, 'distant planets cannot be orbited');
  } finally { t.clean(); }
});

test('without another system to fly to, the edge past Pluto holds the rocket and flying back in works', () => {
  const t = setup({ reduced: false });
  try {
    t.flight.enter(); t.flight.setStick(-1, 0); t.tick(20); t.flight.setStick(0, 0);
    t.flight.setBoost(true);
    for (let i = 0; i < 5000 && t.ship.position.length() < FLIGHT_EDGE_RADIUS - .01; i++) t.flight.update(1 / 60);
    for (let i = 0; i < 30; i++) t.flight.update(1 / 60);
    assert.ok(t.ship.position.length() <= FLIGHT_EDGE_RADIUS + 1e-6);
    assert.equal(t.changes.at(-1).trip, null);
    t.flight.setStick(1, 0);
    for (let i = 0; i < Math.ceil(Math.PI / 1.7 * 60); i++) t.flight.update(1 / 60);
    t.flight.setStick(0, 0);
    for (let i = 0; i < 240; i++) t.flight.update(1 / 60);
    assert.ok(t.ship.position.length() < FLIGHT_EDGE_RADIUS - 5);
  } finally { t.clean(); }
});

test('keys pressed inside a dialog over flight, such as the Beyond picker, do not steer the rocket', () => {
  const t = setup();
  try {
    const inDialog = { closest: selector => (selector.includes('[role="dialog"]') ? {} : null) };
    const press = (type, key) => {
      const event = new Event(type, { cancelable: true }); event.key = key;
      Object.defineProperty(event, 'target', { value: inDialog }); window.dispatchEvent(event); return event;
    };
    t.flight.enter(); t.tick();
    const start = t.ship.position.clone();
    assert.equal(press('keydown', ' ').defaultPrevented, false);
    assert.equal(press('keydown', 'ArrowLeft').defaultPrevented, false);
    t.tick(20);
    assert.ok(t.ship.position.distanceTo(start) < 1e-6, 'the rocket stays put while the child reads the picker');
  } finally { t.clean(); }
});

test('flight starts beside the definition\'s start body and stops at its edge', () => {
  const t = setup({ reduced: false, edgeRadius: 60, startBodyId: 'test-b', bodyList: [['test-b', .45, -20], ['test-star', 2, 0]] });
  try {
    t.flight.enter();
    const start = t.bodies.find(b => b.id === 'test-b').object3d.position;
    assert.ok(t.ship.position.distanceTo(start) < 5, 'starts beside test-b');
    // Turn away from the start world, then fly out to the edge.
    t.flight.setStick(-1, 0); t.tick(20); t.flight.setStick(0, 0);
    t.flight.setBoost(true);
    for (let i = 0; i < 3000 && t.ship.position.length() < 60 - .01; i++) t.flight.update(1 / 60);
    for (let i = 0; i < 30; i++) t.flight.update(1 / 60);
    assert.ok(t.ship.position.length() <= 60 + 1e-6, `clamped at 60: ${t.ship.position.length()}`);
    assert.ok(t.ship.position.length() > 59, 'reached the edge');
  } finally { t.clean(); }
});

// Trips between star systems (#108/#109). A tiny system: star at the centre,
// a beacon far outside the edge to aim the rocket outwards with face().
const TRIP_EDGE = 100;
const TRIP_TO = { id: 'trappist-1', phrase: 'TRAPPIST-1', spokenName: 'TRAPPIST one', direction: { x: 0, y: 0, z: -1 }, distanceLy: 40.66, toHome: false };
function tripSetup(options = {}) {
  const handoffs = [], done = [];
  const t = setup({ reduced: false, edgeRadius: TRIP_EDGE, startBodyId: 'Earth', bodyList: [['Earth', .45, 30], ['Sun', 5, 0], ['Beacon', 1, -500]],
    tripTo: TRIP_TO, systemPhrase: 'the Solar System', onHandoff: request => handoffs.push(request), onTripDone: info => done.push(info), ...options });
  const trip = () => t.changes.at(-1)?.trip ?? null;
  const flyOut = () => {
    // Entering flight is a Back to start, which disarms the warning until the rocket is well inside.
    t.flight.enter(); t.ship.position.set(0, 0, -20); t.flight.update(1 / 60);
    t.ship.position.set(0, 0, -(TRIP_EDGE - 10)); t.flight.face('Beacon'); t.flight.setThrust(true);
    for (let i = 0; i < 200 && trip()?.phase !== 'warning'; i++) t.flight.update(1 / 60);
  };
  const run = seconds => { for (let i = 0; i < Math.round(seconds * 60); i++) t.flight.update(1 / 60); };
  const forward = () => new THREE.Vector3(0, 1, 0).applyQuaternion(t.ship.quaternion);
  return { ...t, handoffs, done, trip, flyOut, run, forward };
}
const warningStarts = changes => changes.filter((c, i) => c.trip?.phase === 'warning' && changes[i - 1]?.trip?.phase !== 'warning').length;

test('crossing the edge outward starts a 3 s warning', () => {
  const t = tripSetup();
  try {
    t.flyOut();
    assert.equal(t.trip()?.phase, 'warning');
    assert.ok(t.trip().secondsLeft <= 3 && t.trip().secondsLeft > 2.5, `secondsLeft ${t.trip().secondsLeft}`);
    assert.equal(t.trip().toPhrase, 'TRAPPIST-1'); assert.equal(t.trip().fromPhrase, 'the Solar System');
    assert.equal(t.trip().toSpoken, 'TRAPPIST one');
    assert.equal(t.trip().distanceLy, 40.66);
    t.run(1.5);
    assert.equal(t.trip().phase, 'warning');
    assert.ok(t.ship.position.length() <= TRIP_EDGE + 1e-6, 'held at the edge during the warning');
    assert.ok(Math.abs(t.trip().secondsLeft - 1.5) < .25);
    assert.equal(t.handoffs.length, 0);
  } finally { t.clean(); }
});

test('recrossing the edge restarts the warning once and never starts two trips', () => {
  const t = tripSetup();
  try {
    t.flyOut();
    for (let wobble = 0; wobble < 3; wobble++) {
      t.flight.face('Sun'); t.run(.5);
      assert.equal(t.trip(), null, 'facing the star cancels');
      t.flight.face('Beacon'); t.run(.5);
      assert.equal(t.trip()?.phase, 'warning');
      assert.ok(t.trip().secondsLeft > 2, 'a fresh countdown');
    }
    assert.equal(warningStarts(t.changes), 4, 'one countdown per crossing');
    t.run(9);
    assert.equal(t.handoffs.length, 1);
    t.run(5);
    assert.equal(t.handoffs.length, 1, 'never a second trip');
  } finally { t.clean(); }
});

test('steering back during the warning cancels it', () => {
  const t = tripSetup();
  try {
    t.flyOut();
    assert.equal(t.trip()?.phase, 'warning');
    t.flight.setStick(1, 0); t.run(2);
    assert.equal(t.trip(), null);
    t.run(5);
    assert.equal(t.handoffs.length, 0);
  } finally { t.clean(); }
});

test('after the warning the ship leaves along the trip direction and onHandoff fires once', () => {
  const t = tripSetup();
  try {
    t.flyOut(); t.flight.setThrust(false);
    t.run(3.2);
    assert.equal(t.trip()?.phase, 'departing');
    const leaving = t.ship.position.clone(); t.run(.5);
    assert.ok(t.ship.position.length() > TRIP_EDGE, 'the clamp lifts');
    assert.ok(t.ship.position.clone().sub(leaving).normalize().z < -.99, 'carried outwards');
    t.flight.setStick(1, 0); const heading = t.forward(); t.run(.2); t.flight.setStick(0, 0);
    assert.ok(t.forward().angleTo(heading) > .1, 'steering still turns the rocket');
    t.run(3);
    assert.equal(t.handoffs.length, 1);
    assert.deepEqual(t.handoffs[0], { to: 'trappist-1', mode: 'flown', direction: TRIP_TO.direction, turnedBack: false });
    assert.equal(t.trip()?.waiting, true, 'the view says the next system is loading');
    t.run(3);
    assert.equal(t.handoffs.length, 1);
  } finally { t.clean(); }
});

test('turnBack during departing returns the ship inside the edge facing the star', () => {
  const t = tripSetup();
  try {
    t.flyOut(); t.flight.setThrust(false); t.run(4);
    assert.equal(t.trip()?.phase, 'departing');
    t.flight.turnBack(); t.run(1.5);
    assert.equal(t.trip(), null);
    assert.deepEqual(t.done, [{ mode: 'flown', turnedBack: true }], 'the scene hears the trip is over');
    assert.ok(t.ship.position.length() < TRIP_EDGE - 5, `inside: ${t.ship.position.length()}`);
    assert.ok(t.forward().dot(t.ship.position.clone().negate().normalize()) > .9, 'facing the star');
    t.run(8);
    assert.equal(t.handoffs.length, 0);
    assert.equal(t.trip(), null, 'no fresh warning while facing in');
    assert.ok(t.flight.isActive());
  } finally { t.clean(); }
});

test('holding a turn-around mid-trip turns back; a wobble does not', () => {
  const t = tripSetup();
  try {
    t.flyOut(); t.flight.setThrust(false); t.run(3.1);
    t.flight.setStick(1, 0); t.run(.15); t.flight.setStick(-1, 0); t.run(.15); t.flight.setStick(0, 0);
    assert.equal(t.trip()?.phase, 'departing', 'a wobble keeps going');
    t.flight.setStick(1, 0); t.run(2.4); t.flight.setStick(0, 0); t.run(1.2);
    assert.equal(t.trip(), null);
    assert.equal(t.handoffs.length, 0);
    assert.ok(t.ship.position.length() < TRIP_EDGE);
  } finally { t.clean(); }
});

test('beginArrival places the ship at the arrival pose and ends with onTripDone, still in free flight', () => {
  const t = tripSetup({ systemPhrase: 'TRAPPIST-1', tripTo: { id: 'solar-system', phrase: 'the Solar System', direction: { x: 0, y: 0, z: 1 }, distanceLy: 40.66, toHome: true } });
  try {
    t.flight.beginArrival({ from: 'solar-system', fromDirection: { x: 0, y: 0, z: 1 }, mode: 'flown' });
    assert.ok(t.flight.isActive());
    t.run(.1);
    assert.equal(t.trip()?.phase, 'arriving');
    assert.equal(t.trip().toPhrase, 'TRAPPIST-1');
    assert.ok(t.ship.position.z > TRIP_EDGE, 'comes in from outside, on the side it came from');
    t.run(4);
    assert.equal(t.trip(), null);
    assert.deepEqual(t.done, [{ mode: 'flown' }]);
    assert.ok(t.ship.position.distanceTo(new THREE.Vector3(0, 0, TRIP_EDGE - 20)) < 1, `at the pose: ${t.ship.position.toArray()}`);
    assert.ok(t.forward().z < -.9, 'facing the star');
    assert.ok(t.flight.isActive());
    t.flight.setThrust(true); const before = t.ship.position.clone(); t.run(.5);
    assert.ok(t.ship.position.distanceTo(before) > 1, 'normal flight afterwards');
    assert.equal(t.handoffs.length, 0);
  } finally { t.clean(); }
});

test('turnBack during arriving fires onHandoff back to the origin', () => {
  const t = tripSetup({ systemPhrase: 'TRAPPIST-1', tripTo: { id: 'solar-system', phrase: 'the Solar System', direction: { x: 0, y: 0, z: 1 }, distanceLy: 40.66, toHome: true } });
  try {
    t.flight.beginArrival({ from: 'solar-system', fromDirection: { x: 0, y: 0, z: 1 }, mode: 'flown' });
    t.run(1);
    t.flight.turnBack(); t.run(.1);
    assert.deepEqual(t.handoffs, [{ to: 'solar-system', mode: 'flown', direction: { x: 0, y: 0, z: 1 }, turnedBack: true }]);
    assert.equal(t.trip()?.waiting, true);
    t.run(5);
    assert.equal(t.handoffs.length, 1);
    assert.equal(t.done.length, 0);
  } finally { t.clean(); }
});

test('an autopilot trip skips the warning, ignores the stick and hands over', () => {
  const t = tripSetup();
  try {
    assert.equal(t.flight.startAutopilotTrip(), true);
    assert.ok(t.flight.isActive());
    t.run(.1);
    assert.equal(t.trip()?.phase, 'departing');
    const heading = t.forward(); t.flight.setStick(1, 0); t.run(.5); t.flight.setStick(0, 0);
    assert.ok(t.forward().angleTo(heading) < 1e-6, 'autopilot holds the heading');
    assert.equal(t.flight.startAutopilotTrip(), false, 'one trip at a time');
    t.run(3.5);
    assert.deepEqual(t.handoffs, [{ to: 'trappist-1', mode: 'autopilot', direction: TRIP_TO.direction, turnedBack: false }]);
  } finally { t.clean(); }
});

test('no trip without a destination; orbiting never warns', () => {
  const t = tripSetup({ tripTo: null });
  try {
    t.flyOut(); t.run(5);
    assert.equal(t.trip(), null);
    assert.equal(t.flight.startAutopilotTrip(), false);
  } finally { t.clean(); }
});

test('a signpost is a place to find, not something to bump into', () => {
  const t = setup({ reduced: false, edgeRadius: 100, bodyList: [['Earth', .45, 30], ['Sun', 5, 80]] });
  try {
    const sign = new THREE.Object3D(); sign.position.set(0, 0, -130); t.scene.add(sign);
    t.flight.dispose();
    const flight = createSolarFreeFlight({ scene: t.scene, camera: t.camera, controls: t.controls, edgeRadius: 100, startBodyId: 'Earth', quality: 'low',
      bodies: [...t.bodies, { id: 'sign:home', name: 'Home', radius: 40, object3d: sign, kind: 'sign' }] });
    flight.enter(); flight.face('sign:home'); flight.setThrust(true);
    // Pointing at a world slows the rocket as it closes in (0.6 a second at the end).
    for (let i = 0; i < 1500; i++) flight.update(1 / 60);
    const ship = t.scene.getObjectByName('solar-free-flight');
    assert.ok(ship.position.distanceTo(sign.position) < 39, `flies inside the sign's reach: ${ship.position.distanceTo(sign.position)}`);
    flight.dispose();
  } finally { globalThis.window = undefined; }
});

test('letting go at the edge and steering back to the star cancels once, with no flicker', () => {
  const t = tripSetup();
  try {
    t.flyOut();
    assert.equal(t.trip()?.phase, 'warning');
    t.flight.setThrust(false); t.flight.setStick(1, 0); t.run(2); t.flight.setStick(0, 0);
    const before = warningStarts(t.changes);
    t.run(10);
    assert.equal(warningStarts(t.changes), before, 'no new countdowns while the rocket coasts facing the star');
    assert.equal(t.trip(), null);
    assert.equal(t.handoffs.length, 0);
  } finally { t.clean(); }
});

test('every leaving trip tells the page where it is going, so the next system can start loading', () => {
  const starts = [];
  const t = tripSetup({ onTripStart: to => starts.push(to.id) });
  try {
    t.flyOut();
    assert.equal(t.trip()?.phase, 'warning');
    assert.deepEqual(starts, ['trappist-1'], 'at the start of the warning');
    t.flight.turnBack(); t.run(4);
    assert.equal(t.flight.startAutopilotTrip(), true);
    assert.deepEqual(starts, ['trappist-1', 'trappist-1'], 'and for an autopilot trip');
  } finally { t.clean(); }
});

test('tearing the scene down mid-arrival does not report an arrival', () => {
  const t = tripSetup({ systemPhrase: 'TRAPPIST-1', tripTo: { id: 'solar-system', phrase: 'the Solar System', direction: { x: 0, y: 0, z: 1 }, distanceLy: 40.66, toHome: true } });
  t.flight.beginArrival({ from: 'solar-system', fromDirection: { x: 0, y: 0, z: 1 }, mode: 'flown' });
  t.run(.5);
  t.clean();
  assert.deepEqual(t.done, []);
});
