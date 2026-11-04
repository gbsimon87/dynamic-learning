import * as THREE from 'three';

const UP = new THREE.Vector3(0, 1, 0);
const TAU = Math.PI * 2;

// Deliberately illustrative: one slow lap per minute in every world.
export const ORBIT_RATE = TAU / 60;

/**
 * A world describes how each thing is orbited; `null` means it cannot be.
 * `faceTravel` turns the craft towards where it is actually going, for targets that move faster than the orbit.
 * @typedef {{ entryDistance: number, radius: number, rig: { back: number, lift: number, trail: number }, level?: boolean, faceTravel?: boolean }} OrbitProfile
 */

const orbitable = target => Boolean(target?.object3d) && target.radius > 0;

/** The closest orbitable target within its profile's entry distance, using live world positions. */
export function nearestOrbitTarget(targets, position, profile) {
  let result = null, best = Infinity;
  const center = new THREE.Vector3();
  for (const target of targets) {
    const settings = orbitable(target) ? profile(target) : null;
    if (!settings) continue;
    target.object3d.getWorldPosition(center);
    const distance = position.distanceTo(center);
    if (distance <= settings.entryDistance && distance - target.radius < best) {
      result = target; best = distance - target.radius;
    }
  }
  return result;
}

/**
 * Circles a craft around a target and films it with a chase camera. No clock or renderer.
 * `forward` is the model's nose axis; `level` orbits stay horizontal at the target's height.
 */
export function createOrbitPilot({ ship, camera, controls, profile, getCameraView = () => 'behind', reducedMotion = () => false, obstacles = [], isSolid = () => true, forward = UP }) {
  const center = new THREE.Vector3(), previousCenter = new THREE.Vector3(), previousShip = new THREE.Vector3();
  const radial = new THREE.Vector3(), axis = new THREE.Vector3(), tangent = new THREE.Vector3(), heading = new THREE.Vector3();
  const wantedShip = new THREE.Vector3(), wantedCamera = new THREE.Vector3(), wantedLook = new THREE.Vector3();
  const scratch = new THREE.Vector3(), obstacleCenter = new THREE.Vector3();
  const nose = forward.clone().normalize();
  const turn = new THREE.Quaternion();
  let target = null, radius = 0, desiredRadius = 0, height = 0, enabledBeforeOrbit = true, faceTravel = false;
  let rig = { back: 2.2, lift: .6, trail: .6 }; // chase-camera offsets, sized to the target
  function stop() {
    const previous = target;
    if (target) controls.enabled = enabledBeforeOrbit;
    target = null; return previous;
  }

  function keepOutside(point, padding) {
    for (const obstacle of obstacles) {
      if (!obstacle.object3d || !isSolid(obstacle)) continue;
      obstacle.object3d.getWorldPosition(obstacleCenter);
      scratch.subVectors(point, obstacleCenter);
      const minimum = obstacle.radius + padding;
      if (scratch.lengthSq() >= minimum * minimum) continue;
      if (scratch.lengthSq() < 1e-10) scratch.copy(radial);
      point.copy(obstacleCenter).addScaledVector(scratch.normalize(), minimum);
    }
  }

  return {
    isActive: () => target !== null,
    target: () => target,
    start(next) {
      const settings = !target && orbitable(next) ? profile(next) : null;
      if (!settings) return false;
      target = next; enabledBeforeOrbit = controls.enabled; controls.enabled = false;
      target.object3d.getWorldPosition(center); previousCenter.copy(center); previousShip.copy(ship.position);
      radial.subVectors(ship.position, center);
      height = 0;
      if (settings.level) { height = radial.y; radial.y = 0; }
      radius = radial.length();
      if (radius < 1e-6) radial.set(0, settings.level ? 0 : .3, 1);
      radial.normalize();
      if (settings.level) axis.copy(UP);
      else {
        // A plane through the target's centre, including a safe polar fallback.
        axis.copy(UP).addScaledVector(radial, -UP.dot(radial));
        if (axis.lengthSq() < 1e-6) axis.set(0, 0, 1);
        axis.normalize();
      }
      desiredRadius = settings.radius;
      faceTravel = Boolean(settings.faceTravel);
      rig = settings.rig;
      // A level orbit eases out from wherever the craft is, even straight above the target.
      if (!settings.level) radius = Math.max(radius, target.radius + .35);
      return true;
    },
    stop,
    update(dt) {
      if (!target) return;
      dt = THREE.MathUtils.clamp(dt, 0, .05);
      const calm = reducedMotion(), cockpit = getCameraView() === 'cockpit';
      const alpha = calm ? 1 : 1 - Math.exp(-4 * dt);
      target.object3d.getWorldPosition(center);
      // Carry both ends of the camera rig with the live target before easing.
      scratch.subVectors(center, previousCenter);
      if (!cockpit) camera.position.add(scratch);
      controls.target.add(scratch); previousCenter.copy(center);
      if (!calm) radial.applyAxisAngle(axis, ORBIT_RATE * dt).normalize();
      radius = THREE.MathUtils.lerp(radius, desiredRadius, alpha);
      height = THREE.MathUtils.lerp(height, 0, alpha);
      wantedShip.copy(center).addScaledVector(radial, radius).addScaledVector(UP, height);
      keepOutside(wantedShip, .35);
      ship.position.copy(wantedShip);
      heading.subVectors(ship.position, previousShip);
      if (cockpit) camera.position.add(heading);
      previousShip.copy(ship.position);
      tangent.crossVectors(axis, radial).normalize();
      if (faceTravel) heading.addScaledVector(axis, -heading.dot(axis));
      turn.setFromUnitVectors(nose, faceTravel && heading.lengthSq() > 1e-10 ? heading.normalize() : tangent);
      ship.quaternion.slerp(turn, calm ? 1 : 1 - Math.exp(-5 * dt));
      if (cockpit) {
        wantedCamera.copy(ship.position);
        wantedLook.copy(center);
      } else {
        wantedCamera.copy(center).addScaledVector(radial, radius + rig.back)
          .addScaledVector(axis, Math.max(radius * .45, rig.lift)).addScaledVector(tangent, -Math.max(ship.scale.y * 4, rig.trail))
          .addScaledVector(UP, height);
        wantedLook.copy(center).addScaledVector(radial, radius * .25).addScaledVector(UP, height);
      }
      camera.position.lerp(wantedCamera, calm ? 1 : 1 - Math.exp(-5 * dt));
      keepOutside(camera.position, .2);
      controls.target.lerp(wantedLook, calm ? 1 : 1 - Math.exp(-5 * dt));
      camera.lookAt(controls.target);
    },
    dispose: stop,
  };
}
