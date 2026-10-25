import * as THREE from 'three';
import { buildShip } from './autopilotShip.js';
import { steerInput } from './flightControls.js';
import { flightArrivalMargin, flightTargetGap } from './flightClues.js';
import { createFlightCamera } from './solarFlightCamera.js';

const UP = new THREE.Vector3(0, 1, 0);
const clamp = THREE.MathUtils.clamp;

// How much of Turbo's 3× applies: all of it until the last few units before a surface.
const boostShare = clearance => THREE.MathUtils.smoothstep(clearance, .5, 3);

export function flightSpeed(clearance, boost) {
  const base = clamp(clearance * 1.4, .6, 70);
  return base * (boost ? 1 + 2 * boostShare(clearance) : 1);
}

/** Manual flight in the existing scene; no renderer, world clock or storage of its own. */
export function createSolarFreeFlight({ scene, camera, controls, bodies, quality, reducedMotion = () => false, onChange = () => {}, getCameraView = () => 'behind' }) {
  const model = buildShip(quality);
  const ship = model.ship;
  ship.name = 'solar-free-flight'; ship.visible = false; ship.scale.setScalar(.3); scene.add(ship);
  const keys = new Set();
  const velocity = new THREE.Vector3(), forward = new THREE.Vector3(), scratch = new THREE.Vector3();
  const center = new THREE.Vector3();
  let active = false, saved = null, yaw = 0, pitch = 0, stickX = 0, stickY = 0, thrust = false, boost = false, boostStrength = 0;
  let nearest = null, lastName = '', age = 0;
  let goal = null, goalToken = null, arrival = null, insideSeconds = 0, goalArmed = false, travelled = 0, navigation = null;
  const previous = new THREE.Vector3(), destinationPoint = new THREE.Vector3();
  const obstacles = bodies.filter(b => b.object3d && !['comet', 'satellite', 'belt'].includes(b.kind));
  const colliders = obstacles.map(body => ({ body, position: new THREE.Vector3() }));
  const flightCamera = createFlightCamera({ camera, controls, getView: getCameraView, reducedMotion });
  function pointFor(body, out) {
    if (body.kind !== 'belt') return body.object3d.getWorldPosition(out);
    const region = body.getRegion();
    out.copy(ship.position).setY(0);
    if (out.lengthSq() < 1e-8) out.set(1, 0, 0);
    return out.setLength((region.innerRadius + region.outerRadius) / 2);
  }
  function gapTo(body) { pointFor(body, destinationPoint); return flightTargetGap(body, ship.position, destinationPoint); }
  function emit() {
    onChange({ nearest: nearest?.id, name: nearest?.name, speed: Math.round(velocity.length()), arrival, boosting: boostStrength > .1,
      navigationArrived: navigation && navigation.id !== goal?.id && !arrival && gapTo(navigation) <= flightArrivalMargin(navigation) ? navigation.name : null,
      navigation: navigation?.name ?? null, gap: navigation ? Math.round(gapTo(navigation)) : null });
  }
  const earth = bodies.find(b => b.id === 'Earth');
  const clearInput = () => { keys.clear(); stickX = stickY = 0; thrust = boost = false; boostStrength = 0; velocity.set(0, 0, 0); };
  function direction() { forward.set(-Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), -Math.cos(yaw) * Math.cos(pitch)); }
  function aim(body) {
    if (!active || !body) return;
    pointFor(body, center); scratch.subVectors(center, ship.position);
    yaw = Math.atan2(-scratch.x, -scratch.z); pitch = clamp(Math.asin(clamp(scratch.y / (scratch.length() || 1), -1, 1)), -.95, .95);
  }
  function face(body) {
    if (!active || !body) return;
    navigation = body; aim(body); velocity.set(0, 0, 0);
  }
  function home() {
    if (!earth) return;
    clearInput(); earth.object3d.getWorldPosition(center); ship.position.copy(center).add(new THREE.Vector3(0, 1.3, 3));
    aim(earth); navigation = null; nearest = earth; lastName = ''; travelled = 0; insideSeconds = 0; goalArmed = false; flightCamera.reset(ship); updateCamera(0, true);
  }
  function updateCamera(dt, snap = false) {
    direction();
    ship.quaternion.setFromUnitVectors(UP, forward);
    flightCamera.update(ship, forward, dt, obstacles, snap);
  }
  const editable = e => e.target?.closest?.('input, textarea, select, [contenteditable="true"]');
  const keydown = e => {
    if (!active) return;
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', ' ', 'Shift'].includes(key)) return;
    // Keep Space available for activating a focused HUD button; steering keys still work from the HUD.
    if (editable(e) || (key === ' ' && e.target?.closest?.('button, a[href]'))) return;
    // Held keys repeat; only a fresh press counts, so Stop holds until the key is pressed again.
    e.preventDefault(); if (!e.repeat) keys.add(key);
  };
  const keyup = e => keys.delete(e.key.length === 1 ? e.key.toLowerCase() : e.key);
  const visibility = () => { if (document.hidden) clearInput(); };
  window.addEventListener('keydown', keydown); window.addEventListener('keyup', keyup); window.addEventListener('blur', clearInput);
  document.addEventListener('visibilitychange', visibility);
  const api = {
    isActive: () => active,
    enter() {
      if (active) return;
      saved = { position: camera.position.clone(), quaternion: camera.quaternion.clone(), target: controls.target.clone(), enabled: controls.enabled };
      active = true; controls.enabled = false; ship.visible = getCameraView() === 'behind'; home();
    },
    exit() {
      if (!active) return;
      active = false; ship.visible = false; clearInput(); goal = null; arrival = null; navigation = null;
      camera.position.copy(saved.position); camera.quaternion.copy(saved.quaternion); controls.target.copy(saved.target); controls.enabled = saved.enabled;
      saved = null;
    },
    getTargets: () => bodies.map(({ id, name, kind, parentName }) => ({ id, name, kind, parentName })),
    setGoal(id, token = id) {
      goal = bodies.find(b => b.id === id) ?? null; goalToken = token; arrival = null; navigation = null;
      insideSeconds = travelled = 0; goalArmed = Boolean(goal && gapTo(goal) > flightArrivalMargin(goal));
      clearInput(); emit();
    },
    home,
    face: id => face(bodies.find(b => b.id === id)),
    setStick(x, y) { stickX = clamp(x, -1, 1); stickY = clamp(y, -1, 1); },
    setThrust(value) { thrust = Boolean(value); },
    setBoost(value) { boost = Boolean(value); },
    boostStrength: () => boostStrength,
    brake: clearInput,
    update(dt, { active: otherMode = false } = {}) {
      if (!active) return;
      if (otherMode) { clearInput(); return; }
      ship.visible = getCameraView() === 'behind';
      dt = clamp(dt, 0, .05);
      const input = steerInput(stickX, stickY, keys);
      if (input.x || input.y) navigation = null;
      if (navigation) aim(navigation);
      yaw -= input.x * 1.7 * dt;
      pitch = clamp(pitch + input.y * dt, -.95, .95);
      direction();
      let clearance = Infinity;
      for (const { body: b, position } of colliders) {
        b.object3d.getWorldPosition(position);
        const gap = ship.position.distanceTo(position) - b.radius;
        if (gap < clearance) { clearance = gap; nearest = b; }
      }
      // Slow near small worlds, cruise through the compressed interplanetary gaps.
      if (navigation) clearance = Math.min(clearance, gapTo(navigation));
      if (goal) clearance = Math.min(clearance, gapTo(goal));
      const boosting = boost || keys.has('Shift');
      const speed = flightSpeed(clearance, boosting);
      const burning = !arrival && (thrust || boosting || keys.has(' '));
      previous.copy(ship.position);
      velocity.lerp(scratch.copy(forward).multiplyScalar(burning ? speed : 0), 1 - Math.exp(-(burning ? 3 : 9) * dt));
      // Brake before entering the arrival zone, even after a high-speed boost.
      if (clearance < 20 && velocity.length() > speed) velocity.setLength(speed);
      boostStrength = burning && boosting ? boostShare(clearance) * Math.min(1, velocity.length() / speed) : 0;
      // Substeps and surface bumpers keep even tiny moons solid.
      const steps = Math.max(1, Math.ceil(velocity.length() * dt / .15));
      for (let i = 0; i < steps; i++) {
        ship.position.addScaledVector(velocity, dt / steps);
        for (const { body: b, position } of colliders) {
          scratch.subVectors(ship.position, position);
          const limit = b.radius + .35;
          if (scratch.lengthSq() < limit * limit) {
            if (scratch.lengthSq() < 1e-10) scratch.copy(forward).negate();
            scratch.normalize(); ship.position.copy(position).addScaledVector(scratch, limit);
            const inward = velocity.dot(scratch);
            if (inward < 0) velocity.addScaledVector(scratch, -inward);
          }
        }
      }
      if (ship.position.length() > 1350) { ship.position.setLength(1350); velocity.set(0, 0, 0); }
      travelled += ship.position.distanceTo(previous);
      if (goal && !arrival) {
        const inside = gapTo(goal) <= flightArrivalMargin(goal);
        if (!inside) goalArmed = true;
        insideSeconds = inside && goalArmed && travelled > .2 ? insideSeconds + dt : 0;
        if (insideSeconds >= .45) {
          arrival = { target: goal.id, token: goalToken };
          clearInput(); emit();
        }
      }
      model.flame.visible = burning && !arrival;
      model.flame.scale.y = burning ? 1.3 : .3; model.flameMaterial.opacity = .8;
      updateCamera(dt);
      age += dt;
      if (age >= .2 || nearest?.id !== lastName) {
        age = 0; lastName = nearest?.id;
        emit();
      }
    },
    dispose() {
      api.exit(); window.removeEventListener('keydown', keydown); window.removeEventListener('keyup', keyup); window.removeEventListener('blur', clearInput);
      document.removeEventListener('visibilitychange', visibility);
      ship.removeFromParent(); model.disposables.forEach(item => item.dispose());
    },
  };
  return api;
}
