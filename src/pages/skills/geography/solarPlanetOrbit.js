import * as THREE from 'three';

const UP = new THREE.Vector3(0, 1, 0);
const TAU = Math.PI * 2;

// Deliberately illustrative: one slow lap per minute, independent of world-clock speed.
export const PLANET_ORBIT_RATE = TAU / 60;
const ORBITABLE = ['planet', 'moon'];
// Moons sit close to their planets, so they are offered only from nearby.
export const orbitEntryDistance = body => body.kind === 'moon'
  ? Math.max(body.radius * 6, body.radius + 1.2)
  : Math.max(body.radius * 4, body.radius + 3.5);

export function nearestOrbitBody(bodies, position) {
  let result = null, best = Infinity;
  const center = new THREE.Vector3();
  for (const body of bodies) {
    if (!ORBITABLE.includes(body.kind) || !body.object3d || !(body.radius > 0)) continue;
    body.object3d.getWorldPosition(center);
    const distance = position.distanceTo(center);
    if (distance <= orbitEntryDistance(body) && distance - body.radius < best) {
      result = body; best = distance - body.radius;
    }
  }
  return result;
}

/** Shared planet/moon orbit pilot for the existing manual/autopilot ships. No clock or renderer. */
export function createPlanetOrbit({ ship, camera, controls, getCameraView = () => 'behind', reducedMotion = () => false, obstacles = [] }) {
  const center = new THREE.Vector3(), previousCenter = new THREE.Vector3(), previousShip = new THREE.Vector3();
  const radial = new THREE.Vector3(), axis = new THREE.Vector3(), tangent = new THREE.Vector3();
  const wantedShip = new THREE.Vector3(), wantedCamera = new THREE.Vector3(), wantedLook = new THREE.Vector3();
  const scratch = new THREE.Vector3(), obstacleCenter = new THREE.Vector3();
  const turn = new THREE.Quaternion();
  let body = null, radius = 0, desiredRadius = 0, enabledBeforeOrbit = true;
  let rig = { back: 2.2, lift: .6, trail: .6 }; // chase-camera offsets, sized to the body
  function stop() {
    const previous = body;
    if (body) controls.enabled = enabledBeforeOrbit;
    body = null; return previous;
  }

  function keepOutside(point, padding) {
    for (const obstacle of obstacles) {
      if (!obstacle.object3d || ['belt', 'comet', 'satellite'].includes(obstacle.kind)) continue;
      obstacle.object3d.getWorldPosition(obstacleCenter);
      scratch.subVectors(point, obstacleCenter);
      const minimum = obstacle.radius + padding;
      if (scratch.lengthSq() >= minimum * minimum) continue;
      if (scratch.lengthSq() < 1e-10) scratch.copy(radial);
      point.copy(obstacleCenter).addScaledVector(scratch.normalize(), minimum);
    }
  }

  return {
    isActive: () => body !== null,
    target: () => body,
    start(nextBody) {
      if (body || !ORBITABLE.includes(nextBody?.kind) || !nextBody.object3d || !(nextBody.radius > 0)) return false;
      body = nextBody; enabledBeforeOrbit = controls.enabled; controls.enabled = false;
      body.object3d.getWorldPosition(center); previousCenter.copy(center); previousShip.copy(ship.position);
      radial.subVectors(ship.position, center);
      radius = radial.length();
      if (radius < 1e-6) radial.set(0, .3, 1);
      radial.normalize();
      // A plane through the planet's centre, including a safe polar fallback.
      axis.copy(UP).addScaledVector(radial, -UP.dot(radial));
      if (axis.lengthSq() < 1e-6) axis.set(0, 0, 1);
      axis.normalize();
      // A moon is tiny beside its planet: ride and film it from much closer.
      const moon = body.kind === 'moon';
      desiredRadius = moon
        ? Math.max(body.radius * 2.6, body.radius + .35)
        : Math.max(body.radius * (body.name === 'Saturn' ? 3.2 : 2.1), body.radius + .9);
      rig = moon
        ? { back: Math.max(body.radius * 3, .9), lift: .25, trail: .25 }
        : { back: Math.max(body.radius * 2.5, 2.2), lift: .6, trail: .6 };
      radius = Math.max(radius, body.radius + .35);
      return true;
    },
    stop,
    update(dt) {
      if (!body) return;
      dt = THREE.MathUtils.clamp(dt, 0, .05);
      const calm = reducedMotion(), cockpit = getCameraView() === 'cockpit';
      const alpha = calm ? 1 : 1 - Math.exp(-4 * dt);
      body.object3d.getWorldPosition(center);
      // Carry both ends of the camera rig with the live planet before easing.
      scratch.subVectors(center, previousCenter);
      if (!cockpit) camera.position.add(scratch);
      controls.target.add(scratch); previousCenter.copy(center);
      if (!calm) radial.applyAxisAngle(axis, PLANET_ORBIT_RATE * dt).normalize();
      radius = THREE.MathUtils.lerp(radius, desiredRadius, alpha);
      wantedShip.copy(center).addScaledVector(radial, radius);
      keepOutside(wantedShip, .35);
      ship.position.copy(wantedShip);
      if (cockpit) camera.position.add(scratch.subVectors(ship.position, previousShip));
      previousShip.copy(ship.position);
      tangent.crossVectors(axis, radial).normalize();
      turn.setFromUnitVectors(UP, tangent);
      ship.quaternion.slerp(turn, calm ? 1 : 1 - Math.exp(-5 * dt));
      if (cockpit) {
        wantedCamera.copy(ship.position);
        wantedLook.copy(center);
      } else {
        wantedCamera.copy(center).addScaledVector(radial, radius + rig.back)
          .addScaledVector(axis, Math.max(radius * .45, rig.lift)).addScaledVector(tangent, -Math.max(ship.scale.y * 4, rig.trail));
        wantedLook.copy(center).addScaledVector(radial, radius * .25);
      }
      camera.position.lerp(wantedCamera, calm ? 1 : 1 - Math.exp(-5 * dt));
      keepOutside(camera.position, .2);
      controls.target.lerp(wantedLook, calm ? 1 : 1 - Math.exp(-5 * dt));
      camera.lookAt(controls.target);
    },
    dispose: stop,
  };
}
