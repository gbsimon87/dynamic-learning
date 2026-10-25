import * as THREE from 'three';

const UP = new THREE.Vector3(0, 1, 0);
const clamp = THREE.MathUtils.clamp;

/** Write the camera pose for a ship-scale-independent flight view. */
export function flightCameraPose({ position, forward, view = 'behind', shipScale = .3, behindDistance, height, lookAhead }, cameraPosition, cameraTarget) {
  const distance = behindDistance ?? Math.max(.7, shipScale * 5.4);
  const lift = height ?? Math.max(.12, shipScale * 1.05);
  const ahead = lookAhead ?? Math.max(1.25, shipScale * 4.5);
  if (view === 'cockpit') {
    cameraPosition.copy(position).addScaledVector(forward, Math.min(.02, shipScale * .1));
    cameraTarget.copy(position).addScaledVector(forward, Math.max(5, shipScale * 24));
  } else {
    cameraPosition.copy(position).addScaledVector(forward, -distance).addScaledVector(UP, lift);
    cameraTarget.copy(position).addScaledVector(forward, ahead);
  }
  return { cameraPosition, cameraTarget };
}

/** Carry the entire chase rig with the ship before easing its relative pose. */
export function createFlightCamera({ camera, controls, getView, reducedMotion = () => false }) {
  const previousShip = new THREE.Vector3();
  const displacement = new THREE.Vector3();
  const desiredPosition = new THREE.Vector3();
  const desiredTarget = new THREE.Vector3();
  const worldPosition = new THREE.Vector3();
  const scratch = new THREE.Vector3();
  let hasPrevious = false;
  let lastView = getView();

  function reset(ship) {
    previousShip.copy(ship.position);
    hasPrevious = true;
    lastView = getView();
  }

  function update(ship, forward, dt, obstacles, snap = false) {
    const view = getView();
    const changingView = view !== lastView;
    if (changingView) lastView = view;
    if (hasPrevious && view === 'behind' && !changingView) {
      displacement.subVectors(ship.position, previousShip);
      camera.position.add(displacement);
      // Easing a world-space target alone makes it trail behind the camera at
      // cruise/Turbo speed, reversing the view even though the rig stays close.
      controls.target.add(displacement);
    }
    previousShip.copy(ship.position);
    hasPrevious = true;

    flightCameraPose({ position: ship.position, forward, view }, desiredPosition, desiredTarget);
    const alpha = snap || reducedMotion() || view === 'cockpit' ? 1 : 1 - Math.exp(-12 * clamp(dt, 0, .05));
    camera.position.lerp(desiredPosition, alpha);

    for (const body of obstacles) {
      body.object3d.getWorldPosition(worldPosition);
      scratch.subVectors(camera.position, worldPosition);
      const minimum = body.radius + .2;
      if (scratch.lengthSq() < minimum * minimum) {
        if (scratch.lengthSq() < 1e-10) scratch.set(0, 1, 0);
        camera.position.copy(worldPosition).addScaledVector(scratch.normalize(), minimum);
      }
    }
    if (snap || reducedMotion() || view === 'cockpit') controls.target.copy(desiredTarget);
    else controls.target.lerp(desiredTarget, alpha);
    camera.lookAt(controls.target);
  }

  return { reset, update };
}
