import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createOceanSubmarine } from './oceanSubmarine.js';
import { createOceanWater, OCEAN_SURFACE_HEIGHT } from './oceanWater.js';
import { createOceanEnvironment, oceanFloorHeight } from './oceanEnvironment.js';
import { createOceanLighting } from './oceanLighting.js';
import { createOceanCockpit } from './oceanCockpit.js';
import { STEERING, createSteeringState, isSteeringIdle, stepSteering } from './oceanSteering.js';
import { createOrbitPilot, nearestOrbitTarget } from '../../../components/worlds/orbitPilot.js';

const VIEW_DIRECTION = new THREE.Vector3(9, 3.2, 12).normalize();
const UP = new THREE.Vector3(0, 1, 0);
const START = { x: 0, y: 3, z: 0 };
const STILL = { turn: 0, throttle: 0, lift: 0 };
// Tour trips cruise at a steady pace, within a sensible range of times.
const TOUR_TRAVEL = { speed: 9, shortest: 1.6, longest: 9, riseOver: 20 };
const ANGLE_STEP = 0.12;
const ZOOM_FACTOR = 1.12;
const MIN_POLAR_ANGLE = 0.18;
const MAX_POLAR_ANGLE = Math.PI / 2;
const NOSE = new THREE.Vector3(0, 0, -1);
// The sun keeps this offset from the submarine so its shadow box travels with it.
const SUN_OFFSET = new THREE.Vector3(-8, 14, -6);
const orbitProfile = (target) => target.orbit ?? null;
const PALETTE_KEYS = ['water', 'surface', 'caustic', 'sand', 'rock', 'grass', 'hull', 'trim', 'window', 'metal', 'light', 'cabin', 'bezel', 'steel', 'glow', 'amber', 'signal', 'screen', 'ink'];

/**
 * The child steers the craft; the camera keeps their chosen angle in the craft's
 * frame. Optional water motion runs at a capped 30 frames/second.
 */
export function createOceanScene({ canvas, container, onReady, onUnavailable, onWaterMotionChange = () => {}, onOrbitOffer = () => {}, onOrbitChange = () => {}, onCameraViewChange = () => {} }) {
  const scene = new THREE.Scene();
  let renderer, controls, resizeObserver, themeObserver;
  let lighting;
  let camera, target, radius, homeDistance, submarine, propeller, centre, world;
  let cockpitCamera, cameraView = 'behind';
  let cabin, palette;
  const cockpitPosition = new THREE.Vector3(), cockpitAim = new THREE.Vector3();
  let steering = createSteeringState(START), input = STILL;
  // The child's chosen camera offset, in the submarine's yaw frame.
  const viewOffset = new THREE.Vector3();
  let disposed = false, ready = false, hasSize = false, positioned = false;
  let water, environment, pilot, sun, offer = null, frame = null, lastTime = null, tourTravel = null, tourPaused = false;
  // After leaving orbit the camera's aim and the camera glide from the orbit view back behind the submarine.
  const aimFrom = new THREE.Vector3(), aimPoint = new THREE.Vector3(), cameraFrom = new THREE.Vector3(), cameraTo = new THREE.Vector3();
  let aimBlend = 0;
  const motionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  let reduced = motionQuery?.matches ?? false;
  let paused = reduced;

  const orbiting = () => pilot?.isActive() ?? false;
  // A reduced-motion orbit holds still, so it needs no frames of its own.
  const driving = () => ((orbiting() || tourTravel) && !reduced && !tourPaused) || aimBlend > 0 || !isSteeringIdle(steering, input);
  const canAnimate = () => !disposed && hasSize && !document.hidden && (!paused || driving());

  function updateAnimation() {
    if (!canAnimate()) {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      lastTime = null;
    } else if (frame === null) frame = requestAnimationFrame(animate);
  }

  function animate(now) {
    frame = null;
    if (!canAnimate()) { lastTime = null; return; }
    if (lastTime === null) lastTime = now;
    // Steering runs at the display rate; water-only frames keep the 30 fps cap.
    const steer = driving();
    if (now > lastTime && (steer || now - lastTime >= 1000 / 30)) {
      const seconds = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      if (!paused) {
        water.advance(seconds);
        environment.advance(seconds);
        // Swimming animals can come within reach of a parked submarine.
        if (!orbiting() && !steer) updateOffer();
      }
      if (tourTravel && !tourPaused) travelTour(seconds);
      else if (orbiting() && !tourPaused) circle(seconds);
      else if (steer) drive(seconds);
      easeAim(seconds);
      draw();
    }
    updateAnimation();
  }

  function setWaterPaused(value) {
    if (disposed) return;
    paused = reduced || value;
    onWaterMotionChange({ paused, reduced });
    updateAnimation();
  }

  function preferenceChanged() {
    if (disposed) return;
    reduced = motionQuery.matches;
    setWaterPaused(paused);
  }

  function visibilityChanged() {
    lastTime = null;
    updateAnimation();
    draw();
  }

  function constrainView() {
    if (disposed) return;
    const spherical = new THREE.Spherical().setFromVector3(camera.position.clone().sub(target));
    spherical.radius = THREE.MathUtils.clamp(spherical.radius, controls.minDistance, controls.maxDistance);
    const ceiling = OCEAN_SURFACE_HEIGHT - 0.8;
    const minAngle = Math.acos(THREE.MathUtils.clamp((ceiling - target.y) / spherical.radius, -1, 1));
    controls.minPolarAngle = Math.max(MIN_POLAR_ANGLE, minAngle);
    spherical.phi = THREE.MathUtils.clamp(spherical.phi, controls.minPolarAngle, MAX_POLAR_ANGLE);
    camera.position.setFromSpherical(spherical).add(target);
    camera.lookAt(target);
  }

  function placeSubmarine() {
    const { position, yaw, climb } = steering;
    submarine.position.set(position.x, position.y, position.z);
    submarine.rotation.set(climb / STEERING.liftSpeed * 0.12, yaw, 0);
    submarine.updateMatrixWorld();
    submarine.localToWorld(target.copy(centre));
    environment.focus(submarine.position);
    followSun();
  }

  function followSun() {
    sun.position.copy(target).add(SUN_OFFSET);
    sun.target.position.copy(target);
    sun.target.updateMatrixWorld();
    renderer.shadowMap.needsUpdate = true;
  }

  function saveView() {
    viewOffset.subVectors(camera.position, target).applyAxisAngle(UP, -steering.yaw);
  }

  function followSubmarine() {
    camera.position.copy(viewOffset).applyAxisAngle(UP, steering.yaw).add(target);
    controls.target.copy(target);
    constrainView();
  }

  function drive(seconds) {
    steering = stepSteering(steering, input, seconds, world);
    propeller.rotation.z += steering.speed * seconds * 3;
    placeSubmarine();
    followSubmarine();
    updateOffer();
  }

  // Orbit is offered near a discovery, as Solar System offers it near a planet.
  function updateOffer() {
    const near = nearestOrbitTarget(environment.discoveries.filter((item) => item.object3d.visible), submarine.position, orbitProfile);
    if ((near ? near.key ?? near.id : null) === (offer?.key ?? null)) return;
    offer = near ? { key: near.key ?? near.id, id: near.id, name: near.name } : null;
    onOrbitOffer(offer && { id: offer.id, name: offer.name });
  }

  function circle(seconds) {
    pilot.update(seconds);
    if (!reduced) propeller.rotation.z += seconds * 4;
    submarine.updateMatrixWorld();
    submarine.localToWorld(target.copy(centre));
    camera.position.y = Math.min(camera.position.y, OCEAN_SURFACE_HEIGHT - 0.8);
    camera.lookAt(controls.target);
    followSun();
  }

  function easeAim(seconds) {
    if (aimBlend <= 0) return;
    aimBlend = Math.max(0, aimBlend - seconds / 0.8);
    const eased = aimBlend * aimBlend * (3 - 2 * aimBlend);
    camera.position.lerpVectors(cameraTo.copy(camera.position), cameraFrom, eased);
    camera.lookAt(aimPoint.lerpVectors(target, aimFrom, eased));
  }

  function enterOrbit() {
    const next = environment?.discoveries.find((discovery) => (discovery.key ?? discovery.id) === offer?.key);
    if (disposed || !next || orbiting() || !pilot.start(next)) return false;
    // The pilot takes over, so leftover coasting must not keep the loop awake.
    steering = createSteeringState(steering.position, steering.yaw);
    onOrbitChange({ id: next.id, name: next.name, steady: reduced });
    if (reduced) { circle(0); draw(); }
    updateAnimation();
    return true;
  }

  // Tours travel to an existing discovery, then use the ordinary orbit view.
  // Longer trips take longer and rise over the reefs on the way; the journey
  // can be paused or abandoned at any point.
  function travelTour(seconds) {
    const journey = tourTravel;
    if (!journey) return;
    journey.next.object3d.getWorldPosition(journey.center);
    journey.destination.copy(journey.center).add(journey.offset);
    journey.elapsed = Math.min(journey.duration, journey.elapsed + seconds);
    const progress = journey.duration === 0 ? 1 : journey.elapsed / journey.duration;
    const eased = progress * progress * (3 - 2 * progress);
    const position = journey.position.lerpVectors(journey.from, journey.destination, eased);
    position.y += Math.max(0, STEERING.maxHeight - position.y) * journey.rise * Math.sin(Math.PI * progress);
    const direction = journey.direction.subVectors(journey.destination, journey.from).setY(0);
    const yaw = direction.lengthSq() > 1e-8 ? Math.atan2(-direction.x, -direction.z) : steering.yaw;
    steering = createSteeringState(position, yaw);
    placeSubmarine();
    followSubmarine();
    if (progress >= 1) arriveAtTourStop();
  }

  function arriveAtTourStop() {
    const journey = tourTravel;
    if (!journey) return;
    tourTravel = null;
    tourPaused = false;
    controls.enabled = true;
    offer = { key: journey.next.key ?? journey.next.id, id: journey.next.id, name: journey.next.name };
    onOrbitOffer({ id: offer.id, name: offer.name });
    enterOrbit();
  }

  // A key names one animal; a species id picks the nearest of that kind.
  function tourTo(id) {
    if (disposed || !environment) return false;
    const center = new THREE.Vector3();
    let next = null, nearest = Infinity;
    for (const discovery of environment.discoveries) {
      if (discovery.id !== id) continue;
      const distance = discovery.object3d.getWorldPosition(center).distanceToSquared(submarine.position);
      if (distance < nearest) { next = discovery; nearest = distance; }
    }
    next ??= environment.discoveries.find((discovery) => discovery.key === id);
    if (!next) return false;
    if (orbiting()) pilot.stop();
    input = STILL;
    controls.enabled = false;
    next.object3d.getWorldPosition(center);
    const offset = submarine.position.clone().sub(center).setY(0);
    if (offset.lengthSq() < 1e-8) offset.set(0, 0, 1);
    offset.setLength(Math.max(next.orbit?.radius * 1.8, 3.5));
    const distance = Math.hypot(center.x + offset.x - submarine.position.x, center.z + offset.z - submarine.position.z);
    tourTravel = {
      next,
      from: submarine.position.clone(),
      center,
      offset,
      destination: new THREE.Vector3(),
      position: new THREE.Vector3(),
      direction: new THREE.Vector3(),
      elapsed: 0,
      duration: reduced ? 0 : Math.min(TOUR_TRAVEL.longest, Math.max(TOUR_TRAVEL.shortest, distance / TOUR_TRAVEL.speed)),
      rise: Math.min(1, distance / TOUR_TRAVEL.riseOver),
    };
    tourPaused = false;
    if (reduced) {
      travelTour(0);
      draw();
    } else updateAnimation();
    return true;
  }

  function setTourPaused(value) {
    if (disposed) return;
    tourPaused = Boolean(value);
    input = STILL;
    updateAnimation();
  }

  // Steering resumes where the orbit left the craft, facing the way it was going.
  function leaveOrbit() {
    if (disposed) return;
    if (tourTravel) {
      tourTravel = null;
      tourPaused = false;
      controls.enabled = true;
      updateOffer();
      updateAnimation();
      draw();
      return;
    }
    if (!orbiting()) return;
    pilot.stop();
    aimFrom.copy(controls.target);
    cameraFrom.copy(camera.position);
    const nose = NOSE.clone().applyQuaternion(submarine.quaternion);
    const { x, y, z } = submarine.position;
    steering = createSteeringState({ x, y, z }, Math.atan2(-nose.x, -nose.z));
    placeSubmarine();
    controls.target.copy(target);
    constrainView();
    saveView();
    aimBlend = reduced ? 0 : 1;
    easeAim(0);
    onOrbitChange(null);
    updateOffer();
    updateAnimation();
    draw();
  }

  function setSteering({ turn, throttle, lift }) {
    if (disposed) return;
    input = { turn, throttle, lift };
    updateAnimation();
  }

  function returnToStart() {
    if (disposed) return;
    leaveOrbit();
    tourPaused = false;
    steering = createSteeringState(START);
    placeSubmarine();
    resetView();
    updateOffer();
    updateAnimation();
  }

  function viewChanged() {
    constrainView();
    saveView();
    draw();
  }

  function toggleCameraView() {
    if (disposed || !ready || !hasSize) return;
    if (!cabin) {
      cabin = createOceanCockpit(palette);
      cabin.resize(cockpitCamera.aspect);
      scene.add(cabin.group);
    }
    cameraView = cameraView === 'behind' ? 'cockpit' : 'behind';
    renderer.shadowMap.needsUpdate = true;
    onCameraViewChange(cameraView);
    draw();
  }

  function dispose() {
    if (disposed) return;
    pilot?.stop();
    disposed = true;
    updateAnimation();
    motionQuery?.removeEventListener('change', preferenceChanged);
    resizeObserver?.disconnect();
    themeObserver?.disconnect();
    controls?.removeEventListener('change', viewChanged);
    controls?.dispose();
    document.removeEventListener('visibilitychange', visibilityChanged);
    canvas.removeEventListener('webglcontextlost', contextLost);
    water?.dispose();
    lighting?.dispose();
    cabin?.disposeTextures();
    const geometries = new Set(), materials = new Set();
    scene.traverse((object) => {
      if (object.isInstancedMesh) object.dispose();
      object.shadow?.dispose();
      if (object.geometry) geometries.add(object.geometry);
      if (object.material) {
        for (const material of [object.material].flat()) materials.add(material);
      }
    });
    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());
    renderer?.dispose();
  }

  function unavailable() {
    if (disposed) return;
    dispose();
    onUnavailable();
  }

  function contextLost(event) {
    event.preventDefault();
    unavailable();
  }

  function draw() {
    if (disposed || !hasSize || document.hidden) return;
    const cockpit = cameraView === 'cockpit';
    // Keep the outside camera intact so switching back restores the child's view.
    controls.enabled = !cockpit && !orbiting() && !tourTravel;
    if (cockpit) {
      submarine.updateMatrixWorld(true);
      submarine.localToWorld(cockpitPosition.set(0, 0, -1.9));
      submarine.localToWorld(cockpitAim.set(0, 0, -12));
      cockpitCamera.position.copy(cockpitPosition);
      cockpitCamera.lookAt(cockpitAim);
      cabin.group.position.copy(cockpitCamera.position);
      cabin.group.quaternion.copy(cockpitCamera.quaternion);
      cabin.group.visible = true;
      const automatic = orbiting() || tourTravel;
      cabin.update({
        position: submarine.position,
        yaw: Math.atan2(cockpitPosition.x - cockpitAim.x, cockpitPosition.z - cockpitAim.z),
        depth: Math.max(0, OCEAN_SURFACE_HEIGHT - submarine.position.y),
        turn: automatic ? 0 : input.turn,
        lift: automatic ? 0 : input.lift,
        throttle: automatic ? 0 : input.throttle,
        mode: tourTravel ? 'TOUR' : orbiting() ? 'ORBIT' : 'MANUAL',
        discoveries: environment.discoveries,
      });
    }
    const wasVisible = submarine.visible;
    try {
      // The hull would obscure the forward window when viewed from inside it.
      if (cockpit) submarine.visible = false;
      renderer.render(scene, cockpit ? cockpitCamera : camera);
      if (!ready) { ready = true; onReady(); }
    } catch {
      unavailable();
    } finally {
      submarine.visible = wasVisible;
      if (cabin) cabin.group.visible = false;
    }
  }

  function refreshPalette() {
    if (disposed) return;
    const style = getComputedStyle(container);
    palette = Object.fromEntries(PALETTE_KEYS.map((key) => {
      const value = style.getPropertyValue(`--ocean-${key}`).trim();
      return [key, value ? new THREE.Color(value) : new THREE.Color()];
    }));
    scene.background = palette.water;
    scene.fog = new THREE.FogExp2(palette.water, 0.026);
    scene.traverse((object) => {
      if (object.isLight && !object.userData.cabinLight) object.color.copy(palette.light);
      if (object.isHemisphereLight) object.groundColor.copy(palette.water).multiplyScalar(0.6);
      const material = object.material;
      if (material?.userData.oceanColor) material.color.copy(palette[material.userData.oceanColor]);
    });
    water?.setPalette(palette);
    environment?.setPalette(palette);
    cabin?.setPalette(palette);
    draw();
  }

  function resetView() {
    if (disposed || !hasSize || orbiting()) return;
    camera.position.copy(VIEW_DIRECTION).applyAxisAngle(UP, steering.yaw).multiplyScalar(homeDistance).add(target);
    controls.target.copy(target);
    constrainView();
    controls.update();
    saveView();
    draw();
  }

  function resize() {
    if (disposed) return;
    const width = container.clientWidth, height = container.clientHeight;
    hasSize = width > 0 && height > 0;
    if (!hasSize) { updateAnimation(); return; }
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    cockpitCamera.aspect = camera.aspect;
    cockpitCamera.updateProjectionMatrix();
    cabin?.resize(camera.aspect);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height, false);
    // Fit the full model even in portrait, allowing a little space for its edges.
    const vertical = THREE.MathUtils.degToRad(camera.fov) / 2;
    const horizontal = Math.atan(Math.tan(vertical) * camera.aspect);
    controls.minDistance = radius / Math.sin(Math.min(vertical, horizontal)) * 1.08;
    controls.maxDistance = controls.minDistance * 2.4;
    homeDistance = controls.minDistance * 1.45;
    if (!positioned) { positioned = true; resetView(); }
    else { constrainView(); controls.update(); draw(); }
    updateAnimation();
  }

  function handleViewKey(event) {
    if (disposed || !hasSize || orbiting() || event.altKey || event.ctrlKey || event.metaKey) return false;
    if (event.key === 'Home') { resetView(); return true; }
    if (cameraView === 'cockpit') return false;
    // Plain arrows steer the submarine; Shift+arrows look around.
    if (event.key.startsWith('Arrow') && !event.shiftKey) return false;
    const spherical = new THREE.Spherical().setFromVector3(camera.position.clone().sub(target));
    switch (event.key) {
      case 'ArrowLeft': spherical.theta -= ANGLE_STEP; break;
      case 'ArrowRight': spherical.theta += ANGLE_STEP; break;
      case 'ArrowUp': spherical.phi -= ANGLE_STEP; break;
      case 'ArrowDown': spherical.phi += ANGLE_STEP; break;
      case '+': case '=': spherical.radius /= ZOOM_FACTOR; break;
      case '-': case '−': spherical.radius *= ZOOM_FACTOR; break;
      default: return false;
    }
    spherical.phi = THREE.MathUtils.clamp(spherical.phi, controls.minPolarAngle, MAX_POLAR_ANGLE);
    spherical.radius = THREE.MathUtils.clamp(spherical.radius, controls.minDistance, controls.maxDistance);
    camera.position.setFromSpherical(spherical).add(target);
    constrainView();
    controls.update();
    draw();
    return true;
  }

  const api = { resetView, toggleCameraView, setWaterPaused, handleViewKey, setSteering, returnToStart, enterOrbit, leaveOrbit, tourTo, setTourPaused, dispose };
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.autoUpdate = false;
    renderer.shadowMap.needsUpdate = true;
    lighting = createOceanLighting(renderer);
    scene.environment = lighting.texture;
    scene.environmentIntensity = 0.45;
    camera = new THREE.PerspectiveCamera(42, 1, 0.1, 180);
    cockpitCamera = new THREE.PerspectiveCamera(65, 1, 0.1, 180);
    cockpitCamera.layers.enable(1);
    const sand = new THREE.MeshStandardMaterial({ roughness: 1 });
    water = createOceanWater(sand);
    submarine = createOceanSubmarine(water);
    propeller = submarine.getObjectByName('ocean-propeller');
    submarine.position.set(START.x, START.y, START.z);
    submarine.traverse((object) => { if (object.isMesh) { object.castShadow = true; object.receiveShadow = true; } });
    scene.add(submarine);
    const bounds = new THREE.Box3().setFromObject(submarine).getBoundingSphere(new THREE.Sphere());
    target = bounds.center;
    radius = bounds.radius;
    centre = submarine.worldToLocal(target.clone());
    environment = createOceanEnvironment(water, sand);
    world = { floorHeight: oceanFloorHeight, obstacles: environment.obstacles };
    environment.focus(submarine.position);
    // The water helper owns the sand texture/shader; terrain owns its geometry.
    sand.userData.oceanColor = 'sand';
    scene.add(environment.group, water.surface, new THREE.HemisphereLight(undefined, undefined, 0.85));
    const light = sun = new THREE.DirectionalLight(undefined, 2.9);
    light.position.copy(SUN_OFFSET);
    light.castShadow = true;
    light.shadow.mapSize.set(1024, 1024);
    Object.assign(light.shadow.camera, { left: -24, right: 24, top: 24, bottom: -24, near: 0.5, far: 70 });
    light.shadow.normalBias = 0.06;
    light.shadow.bias = -0.00015;
    scene.add(light, light.target);
    controls = new OrbitControls(camera, canvas);
    controls.target.copy(target);
    controls.enablePan = false;
    controls.enableDamping = false;
    controls.autoRotate = false;
    controls.minPolarAngle = MIN_POLAR_ANGLE;
    controls.maxPolarAngle = MAX_POLAR_ANGLE;
    controls.rotateSpeed = 0.6;
    controls.zoomSpeed = 0.7;
    controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;
    controls.addEventListener('change', viewChanged);
    pilot = createOrbitPilot({ ship: submarine, camera, controls, profile: orbitProfile, forward: NOSE, reducedMotion: () => reduced });
    canvas.addEventListener('webglcontextlost', contextLost);
    document.addEventListener('visibilitychange', visibilityChanged);
    motionQuery?.addEventListener('change', preferenceChanged);
    onWaterMotionChange({ paused, reduced });
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    themeObserver = new MutationObserver(refreshPalette);
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    refreshPalette();
    resize();
  } catch {
    unavailable();
  }
  return api;
}
