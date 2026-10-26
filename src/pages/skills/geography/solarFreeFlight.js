import * as THREE from 'three';
import { buildShip } from './autopilotShip.js';
import { steerInput } from './flightControls.js';
import { flightArrivalMargin, flightTargetGap } from './flightClues.js';
import { createFlightCamera } from './solarFlightCamera.js';
import { createPlanetOrbit, nearestOrbitBody } from './solarPlanetOrbit.js';
import { ARRIVE_INSET, EDGE_OFFER_MARGIN, WARNING_SECONDS, arrivalPose, createTurnBackIntent, dashSecondsFor, shouldWarn, tripFrame, warningCancelled } from './systems/tripTimeline.js';

const UP = new THREE.Vector3(0, 1, 0);
const clamp = THREE.MathUtils.clamp;
// `edgeRadius` (from the system definition) is the edge of travel: at home
// just past Pluto's furthest point (about 1,250). With a `tripTo`, flying out
// past it warns, then starts the trip to that system (#108/#109).
// How far past the edge the trip carries the rocket before the hand-over, in edge radii.
const TRIP_REACH = 1.2;
// Turning back from the edge glides the rocket inside in this long.
const RETURN_SECONDS = 1;

// How much of Turbo's 3× applies: all of it until the last few units before a surface.
const boostShare = clearance => THREE.MathUtils.smoothstep(clearance, .5, 3);

export function flightSpeed(clearance, boost) {
  const base = clamp(clearance * 1.4, .6, 70);
  return base * (boost ? 1 + 2 * boostShare(clearance) : 1);
}

/** Manual flight in the existing scene; no renderer, world clock or storage of its own. */
export function createSolarFreeFlight({ scene, camera, controls, bodies, edgeRadius, startBodyId, quality, reducedMotion = () => false, onChange = () => {}, getCameraView = () => 'behind',
  tripTo = null, systemPhrase = '', systemSpokenName = systemPhrase, onTripStart = () => {}, onHandoff = () => {}, onTripDone = () => {} }) {
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
  // The trip between systems: null, or its clock and path. Leaving, it runs the
  // warning then half the dash and hands over; arriving, the other half.
  let trip = null, returning = null, armed = true, tripAge = 0;
  const turnIntent = createTurnBackIntent();
  const reach = edgeRadius * TRIP_REACH;
  const obstacles = bodies.filter(b => b.object3d && !['comet', 'satellite', 'belt', 'sign'].includes(b.kind));
  const colliders = obstacles.map(body => ({ body, position: new THREE.Vector3() }));
  const orbit = createPlanetOrbit({ ship, camera, controls, getCameraView, reducedMotion, obstacles });
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
    const orbitPlanet = orbit.target() ?? nearestOrbitBody(bodies, ship.position);
    onChange({ nearest: nearest?.id, name: nearest?.name, speed: Math.round(velocity.length()), arrival, boosting: boostStrength > .1,
      navigationArrived: navigation && navigation.id !== goal?.id && !arrival && gapTo(navigation) <= flightArrivalMargin(navigation) ? navigation.name : null,
      orbitPlanet: orbitPlanet ? { id: orbitPlanet.id, name: orbitPlanet.name } : null, orbiting: orbit.isActive(), orbitSteady: reducedMotion(),
      navigation: navigation?.name ?? null, gap: navigation ? Math.round(gapTo(navigation)) : null, trip: tripView() });
  }
  const tripEnd = () => WARNING_SECONDS + trip.dashSeconds;
  const tripHalf = () => WARNING_SECONDS + trip.dashSeconds / 2;
  function tripView() {
    if (!trip) return null;
    const frame = tripFrame({ elapsed: trip.waiting ? tripHalf() - 1e-6 : trip.elapsed, dashSeconds: trip.dashSeconds, calm: reducedMotion() });
    const warning = frame.phase === 'warning';
    return { phase: frame.phase, mode: trip.mode, progress: frame.progress, calm: reducedMotion(), distanceLy: trip.distanceLy,
      secondsLeft: Math.max(0, (warning ? WARNING_SECONDS : tripEnd()) - trip.elapsed),
      toPhrase: trip.toPhrase, fromPhrase: trip.fromPhrase, toSpoken: trip.toSpoken, fromSpoken: trip.fromSpoken, toHome: trip.toHome, waiting: trip.waiting };
  }
  const vector = ({ x, y, z }) => new THREE.Vector3(x, y, z);
  function aimAlong(direction) {
    yaw = Math.atan2(-direction.x, -direction.z);
    pitch = clamp(Math.asin(clamp(direction.y / (direction.length() || 1), -1, 1)), -.95, .95);
  }
  // Leaving speeds up away from the edge; arriving slows to a stop just inside it.
  function placeOnTrip() {
    const u = clamp((trip.elapsed - (trip.side === 'leaving' ? WARNING_SECONDS : tripHalf())) / (trip.dashSeconds / 2), 0, 1);
    const eased = trip.side === 'leaving' ? u * u : 1 - (1 - u) * (1 - u);
    ship.position.copy(trip.anchor).addScaledVector(trip.carry, reach * eased);
  }
  function startDash() {
    trip.carry = trip.mode === 'autopilot' ? vector(trip.to.direction).normalize() : ship.position.clone().normalize();
    trip.anchor = ship.position.clone();
    trip.back = trip.mode === 'autopilot' ? ship.position.clone() : ship.position.clone().setLength(edgeRadius - ARRIVE_INSET);
    navigation = null; velocity.set(0, 0, 0); thrust = boost = false; boostStrength = 0; turnIntent.reset();
    if (trip.mode === 'autopilot') aimAlong(trip.carry);
  }
  function startTrip(mode, to) {
    trip = { side: 'leaving', mode, to, elapsed: mode === 'autopilot' ? WARNING_SECONDS : 0, waiting: false,
      dashSeconds: dashSecondsFor(to.distanceLy), distanceLy: to.distanceLy,
      toPhrase: to.phrase, fromPhrase: systemPhrase, toSpoken: to.spokenName ?? to.phrase, fromSpoken: systemSpokenName, toHome: Boolean(to.toHome) };
    if (mode === 'autopilot') startDash();
    tripAge = 0; emit();
    onTripStart(to);
  }
  function finishArrival() {
    const { mode } = trip;
    ship.position.copy(trip.anchor).addScaledVector(trip.carry, reach);
    trip = null; velocity.set(0, 0, 0); emit();
    onTripDone({ mode });
  }
  // Back inside the edge, facing the star: never stranded between systems.
  function glideBack(point) {
    returning = { from: ship.position.clone(), to: point, t: 0, seconds: reducedMotion() ? 0 : RETURN_SECONDS, mode: trip.mode };
    trip = null; clearInput(); navigation = null;
    aimAlong(scratch.copy(point).negate());
    emit();
  }
  function stepReturn(dt) {
    returning.t += dt;
    const k = returning.seconds ? THREE.MathUtils.smootherstep(returning.t / returning.seconds, 0, 1) : 1;
    ship.position.lerpVectors(returning.from, returning.to, k);
    if (k >= 1) { const { mode } = returning; returning = null; emit(); onTripDone({ mode, turnedBack: true }); }
    model.flame.visible = false;
    updateCamera(dt);
  }
  function stepTrip(dt, rawDt) {
    if (trip.mode === 'flown') {
      const input = steerInput(stickX, stickY, keys);
      yaw -= input.x * 1.7 * dt;
      pitch = clamp(pitch + input.y * dt, -.95, .95);
    }
    direction();
    if (!trip.waiting) {
      const last = trip.elapsed;
      trip.elapsed += rawDt;
      const frame = tripFrame({ elapsed: trip.elapsed, previous: last, dashSeconds: trip.dashSeconds, calm: reducedMotion() });
      if (trip.side === 'arriving' && frame.phase === 'done') { finishArrival(); updateCamera(dt); return; }
      if (frame.handoff && trip.side === 'leaving') {
        // Hold at full speed while the other system loads; it plays the second half.
        trip.elapsed = tripHalf(); trip.waiting = true; placeOnTrip();
        onHandoff({ to: trip.to.id, mode: trip.mode, direction: trip.to.direction, turnedBack: false });
      } else placeOnTrip();
      if (trip && !trip.waiting && trip.mode === 'flown' && turnIntent.update(rawDt, forward.dot(trip.carry))) api.turnBack();
    }
    model.flame.visible = Boolean(trip); model.flame.scale.y = 1.3; model.flameMaterial.opacity = .8;
    updateCamera(dt);
    tripAge += rawDt;
    if (tripAge >= .1) { tripAge = 0; emit(); }
  }
  // Back to start: beside the definition's start body (Earth at home).
  const start = bodies.find(b => b.id === startBodyId);
  const clearInput = () => { keys.clear(); stickX = stickY = 0; thrust = boost = false; boostStrength = 0; velocity.set(0, 0, 0); };
  function direction() { forward.set(-Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), -Math.cos(yaw) * Math.cos(pitch)); }
  function aim(body) {
    if (!active || !body) return;
    pointFor(body, center); scratch.subVectors(center, ship.position);
    yaw = Math.atan2(-scratch.x, -scratch.z); pitch = clamp(Math.asin(clamp(scratch.y / (scratch.length() || 1), -1, 1)), -.95, .95);
  }
  function face(body) {
    if (!active || !body) return;
    endOrbit(); navigation = body; aim(body); velocity.set(0, 0, 0);
  }
  function home() {
    if (!start) return;
    // Back to start cancels a trip out, or ends an arrival early.
    if (trip?.side === 'arriving' && !trip.waiting) { const { mode } = trip; trip = null; onTripDone({ mode }); }
    else if (trip && !trip.waiting) trip = null;
    returning = null; armed = false;
    orbit.stop(); clearInput(); start.object3d.getWorldPosition(center); ship.position.copy(center).add(new THREE.Vector3(0, 1.3, 3));
    aim(start); navigation = null; nearest = start; lastName = ''; travelled = 0; insideSeconds = 0; goalArmed = false; flightCamera.reset(ship); updateCamera(0, true);
  }
  function updateCamera(dt, snap = false) {
    direction();
    ship.quaternion.setFromUnitVectors(UP, forward);
    flightCamera.update(ship, forward, dt, obstacles, snap);
  }
  function endOrbit(clear = true) {
    if (!orbit.isActive()) return;
    orbit.stop();
    if (clear) clearInput();
    forward.set(0, 1, 0).applyQuaternion(ship.quaternion);
    yaw = Math.atan2(-forward.x, -forward.z);
    pitch = clamp(Math.asin(clamp(forward.y, -1, 1)), -.95, .95);
    travelled = insideSeconds = 0; goalArmed = Boolean(goal && gapTo(goal) > flightArrivalMargin(goal));
    flightCamera.reset(ship);
  }
  const editable = e => e.target?.closest?.('input, textarea, select, [contenteditable="true"]');
  const keydown = e => {
    if (!active) return;
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', ' ', 'Shift'].includes(key)) return;
    // Keep Space available for activating a focused HUD button; steering keys still work from the HUD.
    if (editable(e) || (key === ' ' && e.target?.closest?.('button, a[href]'))) return;
    // A dialog over flight (the Beyond picker) keeps its keys; the rocket waits.
    if (e.target?.closest?.('[role="dialog"]')) return;
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
      if (trip?.side === 'arriving' && !trip.waiting) { const { mode } = trip; trip = null; onTripDone({ mode }); }
      else if (trip && !trip.waiting) trip = null;
      returning = null;
      orbit.stop(); active = false; ship.visible = false; clearInput(); goal = null; arrival = null; navigation = null;
      camera.position.copy(saved.position); camera.quaternion.copy(saved.quaternion); controls.target.copy(saved.target); controls.enabled = saved.enabled;
      saved = null;
    },
    getTargets: () => bodies.map(({ id, name, kind, parentName }) => ({ id, name, kind, parentName })),
    setGoal(id, token = id) {
      endOrbit();
      goal = bodies.find(b => b.id === id) ?? null; goalToken = token; arrival = null; navigation = null;
      insideSeconds = travelled = 0; goalArmed = Boolean(goal && gapTo(goal) > flightArrivalMargin(goal));
      clearInput(); emit();
    },
    home,
    enterOrbit() {
      if (!active || orbit.isActive() || trip || returning) return false;
      const body = nearestOrbitBody(bodies, ship.position);
      if (!body) return false;
      clearInput(); navigation = null; insideSeconds = travelled = 0; goalArmed = false;
      orbit.start(body); emit(); return true;
    },
    leaveOrbit() { endOrbit(); emit(); },
    isOrbiting: () => orbit.isActive(),
    face: id => { if (!api.isDashing() && !returning) face(bodies.find(b => b.id === id)); },
    isDashing: () => Boolean(trip && trip.elapsed >= WARNING_SECONDS),
    /** Turn back: from the warning or the first half, glide back inside; from the second half, hand back. */
    turnBack() {
      if (!trip || trip.waiting) return;
      if (trip.side === 'arriving') {
        trip.waiting = true; emit();
        onHandoff({ to: trip.from, mode: trip.mode, direction: trip.fromDirection, turnedBack: true });
        return;
      }
      glideBack(trip.elapsed < WARNING_SECONDS ? ship.position.clone().setLength(edgeRadius - ARRIVE_INSET) : trip.back);
    },
    /** The same trip without the warning or the stick: Home and Jump there. `to` defaults to `tripTo`. */
    startAutopilotTrip(to = tripTo) {
      if (!to || trip) return false;
      if (!active) api.enter();
      orbit.stop(); returning = null; clearInput();
      startTrip('autopilot', to); updateCamera(0, true);
      return true;
    },
    /** Called by the arriving system on mount: the second half of the dash, ending just inside its edge. */
    beginArrival({ from, fromDirection, mode = 'flown', fromPhrase = tripTo?.phrase ?? '', fromSpoken = tripTo?.spokenName ?? fromPhrase, distanceLy = tripTo?.distanceLy ?? 1 }) {
      if (trip || !fromDirection) return false;
      if (!active) api.enter();
      orbit.stop(); returning = null; clearInput(); navigation = null;
      const towardsOrigin = vector(fromDirection).normalize();
      const end = vector(Object.fromEntries(['x', 'y', 'z'].map((k, i) => [k, arrivalPose(edgeRadius, towardsOrigin).position[i]])));
      const dashSeconds = dashSecondsFor(distanceLy);
      trip = { side: 'arriving', mode, from, fromDirection, fromPhrase, fromSpoken, toPhrase: systemPhrase, toSpoken: systemSpokenName, toHome: false, distanceLy, dashSeconds,
        elapsed: WARNING_SECONDS + dashSeconds / 2, waiting: false,
        carry: towardsOrigin.clone().negate(), anchor: end.clone().addScaledVector(towardsOrigin, reach) };
      ship.position.copy(trip.anchor); aimAlong(trip.carry); turnIntent.reset(); tripAge = 0;
      flightCamera.reset(ship); updateCamera(0, true); emit();
      return true;
    },
    /** Streaks and fade for the scene to draw, or null outside a trip. */
    tripEffects() {
      if (!trip || trip.elapsed < WARNING_SECONDS) return null;
      return tripFrame({ elapsed: trip.waiting ? tripHalf() : trip.elapsed, dashSeconds: trip.dashSeconds, calm: reducedMotion() });
    },
    isTravelling: () => Boolean(trip || returning),
    setStick(x, y) { stickX = clamp(x, -1, 1); stickY = clamp(y, -1, 1); },
    setThrust(value) { thrust = Boolean(value); },
    setBoost(value) { boost = Boolean(value); },
    boostStrength: () => boostStrength,
    brake: clearInput,
    update(dt, { active: otherMode = false } = {}) {
      if (!active) return;
      if (otherMode) { clearInput(); return; }
      ship.visible = getCameraView() === 'behind';
      const rawDt = clamp(dt, 0, .25);
      dt = clamp(dt, 0, .05);
      if (returning) { stepReturn(rawDt); return; }
      if (trip && trip.elapsed >= WARNING_SECONDS) { stepTrip(dt, rawDt); return; }
      const input = steerInput(stickX, stickY, keys);
      if (orbit.isActive()) {
        const takingControl = !arrival && (input.x || input.y || thrust || boost || keys.has(' ') || keys.has('Shift'));
        if (takingControl) endOrbit(false);
        else {
          orbit.update(dt); model.flame.visible = false;
          age += dt;
          if (age >= .2) { age = 0; emit(); }
          return;
        }
      }
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
      const distance = ship.position.length();
      if (!armed && distance < edgeRadius - 50) armed = true;
      if (tripTo) {
        const outward = scratch.copy(ship.position).normalize();
        if (trip) {
          // The warning: steering back towards the star, or dropping back inside, cancels it.
          if (warningCancelled(forward.dot(outward)) || distance < edgeRadius - 2 * EDGE_OFFER_MARGIN) { trip = null; emit(); }
          else {
            const last = trip.elapsed; trip.elapsed += rawDt;
            if (last < WARNING_SECONDS && trip.elapsed >= WARNING_SECONDS) startDash();
            tripAge += rawDt; if (tripAge >= .1) { tripAge = 0; emit(); }
          }
        } else if (shouldWarn({ distance, edgeRadius, radialSpeed: velocity.dot(outward), alignmentWithOutward: forward.dot(outward), orbiting: orbit.isActive(), autopilot: Boolean(arrival), armed })) startTrip('flown', tripTo);
      }
      if (distance > edgeRadius) { ship.position.setLength(edgeRadius); velocity.set(0, 0, 0); }
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
      orbit.dispose(); ship.removeFromParent(); model.disposables.forEach(item => item.dispose());
    },
  };
  return api;
}
