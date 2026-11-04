import * as THREE from 'three';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { createOceanScene } from '../../src/pages/skills/geography/oceanScene.js';
import { oceanFloorHeight } from '../../src/pages/skills/geography/oceanEnvironment.js';
import { STEERING } from '../../src/pages/skills/geography/oceanSteering.js';
import { REEFS, REEF_RADIUS, REEF_SPOT } from '../../src/pages/skills/geography/oceanReef.js';
import { ORBIT_RATE } from '../../src/components/worlds/orbitPilot.js';
import { FISH_ORBIT, REEF_ORBIT } from '../../src/pages/skills/geography/oceanDiscoveries.js';
import { FISH_LOOP, fishPose, loopPose } from '../../src/pages/skills/geography/oceanFish.js';
import { ANIMALS } from '../../src/pages/skills/geography/oceanAnimals.js';
import { OCEAN_SURFACE_HEIGHT } from '../../src/pages/skills/geography/oceanWater.js';

const harness = vi.hoisted(() => ({ renderers: [], observers: [], frames: new Map(), motion: null, fail: null }));
vi.mock('three', async (original) => ({
  ...await original(),
  WebGLRenderer: class {
    constructor() {
      if (harness.fail === 'setup') throw new Error('No WebGL');
      this.render = vi.fn(() => { if (harness.fail === 'render') throw new Error('Render failed'); });
      this.setSize = vi.fn();
      this.setPixelRatio = vi.fn();
      this.dispose = vi.fn();
      this.shadowMap = {};
      harness.renderers.push(this);
    }
  },
}));

const OriginalResizeObserver = globalThis.ResizeObserver;
const OriginalMatchMedia = globalThis.matchMedia;
const OriginalRequestFrame = globalThis.requestAnimationFrame;
const OriginalCancelFrame = globalThis.cancelAnimationFrame;
let container, canvas, api;
beforeEach(() => {
  harness.renderers.length = 0;
  harness.observers.length = 0;
  harness.fail = null;
  harness.frames.clear();
  harness.motion = { matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() };
  vi.stubGlobal('matchMedia', () => harness.motion);
  let frameId = 0;
  vi.stubGlobal('requestAnimationFrame', (callback) => { harness.frames.set(++frameId, callback); return frameId; });
  vi.stubGlobal('cancelAnimationFrame', (id) => harness.frames.delete(id));
  vi.stubGlobal('ResizeObserver', class {
    constructor(callback) { this.callback = callback; this.observe = vi.fn(); this.disconnect = vi.fn(); harness.observers.push(this); }
  });
  container = document.createElement('div');
  canvas = document.createElement('canvas');
  container.append(canvas);
  document.body.append(container);
  Object.defineProperties(container, { clientWidth: { configurable: true, value: 800 }, clientHeight: { configurable: true, value: 500 } });
  for (const key of ['water', 'surface', 'caustic', 'sand', 'rock', 'grass', 'hull', 'trim', 'window', 'metal', 'light']) container.style.setProperty(`--ocean-${key}`, '#4080a0');
});
afterEach(() => {
  api?.dispose();
  api = null;
  container.remove();
  document.body.classList.remove('dark');
  vi.stubGlobal('ResizeObserver', OriginalResizeObserver);
  vi.stubGlobal('matchMedia', OriginalMatchMedia);
  vi.stubGlobal('requestAnimationFrame', OriginalRequestFrame);
  vi.stubGlobal('cancelAnimationFrame', OriginalCancelFrame);
});
const start = () => {
  const onReady = vi.fn(), onUnavailable = vi.fn();
  api = createOceanScene({ canvas, container, onReady, onUnavailable });
  return { renderer: harness.renderers[0], onReady, onUnavailable };
};

it('renders on demand, clamps real camera maths and restores the original view', () => {
  const { renderer, onReady } = start();
  expect(onReady).toHaveBeenCalledOnce();
  const [scene, camera] = renderer.render.mock.calls[0];
  const initial = camera.position.clone();
  const submarine = scene.getObjectByName('ocean-submarine');
  const originalPose = submarine.position.clone();
  const surface = scene.getObjectByName('ocean-water-surface');
  expect(surface.isWater).toBe(true);
  const renders = renderer.render.mock.calls.length;
  expect(api.handleViewKey({ key: 'Tab' })).toBe(false);
  // Plain arrows steer, so the view leaves them to the page.
  expect(api.handleViewKey({ key: 'ArrowLeft' })).toBe(false);
  expect(renderer.render).toHaveBeenCalledTimes(renders);
  for (let i = 0; i < 80; i++) api.handleViewKey({ key: 'ArrowDown', shiftKey: true });
  expect(camera.position.y).toBeGreaterThanOrEqual(submarine.position.y);
  for (let i = 0; i < 80; i++) api.handleViewKey({ key: '+' });
  const near = camera.position.clone();
  api.handleViewKey({ key: '+' });
  expect(camera.position.distanceTo(near)).toBeLessThan(0.00001);
  for (let i = 0; i < 80; i++) canvas.dispatchEvent(new WheelEvent('wheel', { deltaY: 1000, cancelable: true }));
  const far = camera.position.clone();
  api.handleViewKey({ key: '-' });
  expect(camera.position.distanceTo(far)).toBeLessThan(0.00001);
  expect(far.distanceTo(near)).toBeGreaterThan(1);
  for (let i = 0; i < 80; i++) api.handleViewKey({ key: 'ArrowUp', shiftKey: true });
  expect(camera.position.y).toBeLessThan(surface.position.y - 0.5);
  expect(submarine.position.equals(originalPose)).toBe(true);
  api.resetView();
  expect(camera.position.distanceTo(initial)).toBeLessThan(0.00001);
  expect(api.handleViewKey({ key: 'Home' })).toBe(true);
});

it('waits for nonzero size and stops rendering while hidden or after disposal', () => {
  Object.defineProperty(container, 'clientWidth', { configurable: true, value: 0 });
  const { renderer, onReady } = start();
  expect(renderer.render).not.toHaveBeenCalled();
  expect(onReady).not.toHaveBeenCalled();
  Object.defineProperty(container, 'clientWidth', { configurable: true, value: 390 });
  harness.observers[0].callback();
  expect(onReady).toHaveBeenCalledOnce();
  const visibility = vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
  renderer.render.mockClear();
  api.resetView();
  expect(renderer.render).not.toHaveBeenCalled();
  visibility.mockReturnValue(false);
  document.dispatchEvent(new Event('visibilitychange'));
  expect(renderer.render).toHaveBeenCalledOnce();
  const disposeGeometry = vi.spyOn(THREE.BufferGeometry.prototype, 'dispose');
  const disposeMaterial = vi.spyOn(THREE.Material.prototype, 'dispose');
  const disposeTexture = vi.spyOn(THREE.Texture.prototype, 'dispose');
  const disposeReflection = vi.spyOn(THREE.WebGLRenderTarget.prototype, 'dispose');
  const disposeInstances = vi.spyOn(THREE.InstancedMesh.prototype, 'dispose');
  api.dispose();
  const geometries = disposeGeometry.mock.calls.length, materials = disposeMaterial.mock.calls.length;
  expect(geometries).toBeGreaterThan(0);
  expect(materials).toBeGreaterThan(0);
  expect(disposeTexture.mock.calls.length).toBeGreaterThanOrEqual(2);
  expect(disposeReflection).toHaveBeenCalledOnce();
  expect(disposeInstances).toHaveBeenCalledTimes(2);
  renderer.render.mockClear();
  api.dispose();
  harness.observers[0].callback();
  document.dispatchEvent(new Event('visibilitychange'));
  canvas.dispatchEvent(new WheelEvent('wheel', { deltaY: 100 }));
  expect(renderer.render).not.toHaveBeenCalled();
  expect(disposeGeometry).toHaveBeenCalledTimes(geometries);
  expect(disposeMaterial).toHaveBeenCalledTimes(materials);
  expect(renderer.dispose).toHaveBeenCalledOnce();
  expect(disposeReflection).toHaveBeenCalledOnce();
  expect(disposeInstances).toHaveBeenCalledTimes(2);
  expect(harness.observers[0].disconnect).toHaveBeenCalledOnce();
});

it('animates water only when motion is allowed, visible and not paused', () => {
  harness.motion.matches = false;
  const { renderer } = start();
  const [scene] = renderer.render.mock.calls[0];
  const water = scene.getObjectByName('ocean-water-surface');
  const submarine = scene.getObjectByName('ocean-submarine');
  const particleTime = scene.getObjectByName('ocean-suspended-particles').material.uniforms.oceanTime;
  const pose = submarine.position.clone();
  const tick = (time) => {
    const [id, callback] = harness.frames.entries().next().value;
    harness.frames.delete(id);
    callback(time);
  };
  expect(harness.frames.size).toBe(1);
  tick(0); tick(40);
  expect(water.material.uniforms.time.value).toBeGreaterThan(0);
  expect(particleTime.value).toBeGreaterThan(0);
  const suspendedTime = particleTime.value;
  const time = water.material.uniforms.time.value;
  api.setWaterPaused(true);
  expect(harness.frames.size).toBe(0);
  expect(water.material.uniforms.time.value).toBe(time);
  expect(particleTime.value).toBe(suspendedTime);
  api.setWaterPaused(false);
  expect(harness.frames.size).toBe(1);
  const visibility = vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
  document.dispatchEvent(new Event('visibilitychange'));
  expect(harness.frames.size).toBe(0);
  visibility.mockReturnValue(false);
  document.dispatchEvent(new Event('visibilitychange'));
  tick(50000); tick(50040);
  expect(water.material.uniforms.time.value - time).toBeLessThan(0.1);
  harness.motion.matches = true;
  harness.motion.addEventListener.mock.calls[0][1]();
  expect(harness.frames.size).toBe(0);
  api.setWaterPaused(false);
  expect(harness.frames.size).toBe(0);
  expect(submarine.position.equals(pose)).toBe(true);
  api.dispose();
  expect(renderer.dispose).toHaveBeenCalledOnce();
});

it('provides raised terrain, rooted scenery and static shadows without changing the submarine framing', () => {
  const { renderer } = start();
  const [scene, camera] = renderer.render.mock.calls[0];
  const floor = scene.getObjectByName('ocean-seabed');
  const heights = Array.from(floor.geometry.attributes.position.array).filter((_, i) => i % 3 === 1);
  expect(Math.max(...heights) - Math.min(...heights)).toBeGreaterThan(0.5);
  expect(floor.receiveShadow).toBe(true);
  for (const name of ['ocean-rocks', 'ocean-seagrass']) {
    const decoration = scene.getObjectByName(name);
    expect(decoration.isInstancedMesh).toBe(true);
    const matrix = new THREE.Matrix4(), position = new THREE.Vector3();
    for (let i = 0; i < decoration.count; i++) {
      decoration.getMatrixAt(i, matrix);
      position.setFromMatrixPosition(matrix);
      // Decorations leave the submarine and its immediate viewing space clear.
      expect(Math.hypot(position.x, position.z)).toBeGreaterThan(5);
    }
  }
  expect(renderer.shadowMap.enabled).toBe(true);
  expect(renderer.shadowMap.autoUpdate).toBe(false);
  const initial = camera.position.clone();
  api.handleViewKey({ key: '-' });
  api.resetView();
  expect(camera.position.distanceTo(initial)).toBeLessThan(0.00001);
});

it('keeps every side porthole rim visible outside the curved hull', () => {
  const { renderer } = start();
  const [scene] = renderer.render.mock.calls[0];
  const submarine = scene.getObjectByName('ocean-submarine');
  submarine.updateMatrixWorld(true);
  const rims = submarine.children.filter((object) => object.name === 'ocean-porthole-rim');
  expect(rims).toHaveLength(4);
  const ray = new THREE.Raycaster();
  for (const rim of rims) {
    const center = rim.getWorldPosition(new THREE.Vector3());
    const side = Math.sign(center.x);
    // Sample the full ring, including the part previously hidden by the hull.
    for (let i = 0; i < 12; i++) {
      const angle = i * Math.PI / 6;
      ray.set(new THREE.Vector3(side * 4, center.y + Math.sin(angle) * 0.3, center.z + Math.cos(angle) * 0.3), new THREE.Vector3(-side, 0, 0));
      expect(ray.intersectObjects(submarine.children)[0]?.object).toBe(rim);
    }
  }
});

it('refreshes palette on a theme change without moving the camera', async () => {
  const { renderer } = start();
  const [scene, camera] = renderer.render.mock.calls[0];
  const position = camera.position.clone();
  container.style.setProperty('--ocean-water', '#102030');
  document.body.classList.add('dark');
  await new Promise((resolve) => queueMicrotask(resolve));
  expect(scene.background.getHexString()).toBe('102030');
  expect(camera.position.equals(position)).toBe(true);
});

it('keeps portrait views below the surface and resets after looking up at maximum zoom-out', () => {
  Object.defineProperty(container, 'clientWidth', { configurable: true, value: 280 });
  Object.defineProperty(container, 'clientHeight', { configurable: true, value: 600 });
  const { renderer } = start();
  const [scene, camera] = renderer.render.mock.calls[0];
  const initial = camera.position.clone();
  for (let i = 0; i < 80; i++) { api.handleViewKey({ key: '-' }); api.handleViewKey({ key: 'ArrowUp', shiftKey: true }); }
  expect(camera.position.y).toBeLessThan(scene.getObjectByName('ocean-water-surface').position.y - 0.5);
  api.resetView();
  expect(camera.position.distanceTo(initial)).toBeLessThan(0.00001);
});

it.each(['setup', 'render'])('releases a failed %s setup and reports unavailable without readiness', (failure) => {
  harness.fail = failure;
  const { onReady, onUnavailable, renderer } = start();
  expect(onReady).not.toHaveBeenCalled();
  expect(onUnavailable).toHaveBeenCalledOnce();
  expect(api.handleViewKey({ key: 'ArrowLeft' })).toBe(false);
  api.dispose();
  if (renderer) expect(renderer.dispose).toHaveBeenCalledOnce();
});

it('releases the scene and reports unavailable when the context is lost', () => {
  const { renderer, onUnavailable } = start();
  canvas.dispatchEvent(new Event('webglcontextlost', { cancelable: true }));
  expect(onUnavailable).toHaveBeenCalledOnce();
  expect(renderer.dispose).toHaveBeenCalledOnce();
  renderer.render.mockClear();
  api.resetView();
  expect(renderer.render).not.toHaveBeenCalled();
});

const tick = (time) => {
  const [id, callback] = harness.frames.entries().next().value;
  harness.frames.delete(id);
  callback(time);
};
const drive = (from, seconds, step = 50) => {
  for (let t = 0; t <= seconds * 1000; t += step) tick(from + t);
  return from + seconds * 1000 + step;
};
const yawFrame = (camera, submarine) => camera.position.clone().sub(submarine.position).applyAxisAngle(new THREE.Vector3(0, 1, 0), -submarine.rotation.y);

it('drives the submarine, spins the propeller and keeps the chosen view behind it', () => {
  const { renderer } = start();
  const [scene, camera] = renderer.render.mock.calls[0];
  const submarine = scene.getObjectByName('ocean-submarine');
  const propeller = scene.getObjectByName('ocean-propeller');
  api.handleViewKey({ key: 'ArrowLeft', shiftKey: true });
  const offset = yawFrame(camera, submarine);
  expect(harness.frames.size).toBe(0);
  api.setSteering({ turn: 0.5, throttle: 1, lift: 0 });
  expect(harness.frames.size).toBe(1);
  renderer.shadowMap.needsUpdate = false;
  drive(0, 2);
  expect(submarine.position.z).toBeLessThan(-1);
  expect(submarine.rotation.y).toBeLessThan(0);
  expect(propeller.rotation.z).toBeGreaterThan(0);
  expect(renderer.shadowMap.needsUpdate).toBe(true);
  expect(yawFrame(camera, submarine).distanceTo(offset)).toBeLessThan(0.001);
});

it('stops the loop once the craft is idle while the water is still', () => {
  const { renderer } = start();
  api.setSteering({ turn: 0, throttle: 1, lift: 0 });
  let time = drive(0, 1);
  api.setSteering({ turn: 0, throttle: 0, lift: 0 });
  for (let i = 0; i < 200 && harness.frames.size; i++) tick(time += 50);
  expect(harness.frames.size).toBe(0);
  const renders = renderer.render.mock.calls.length;
  expect(renders).toBeGreaterThan(1);
});

it('keeps the camera under the surface and above the sand at the height limits', () => {
  const { renderer } = start();
  const [scene, camera] = renderer.render.mock.calls[0];
  const surface = scene.getObjectByName('ocean-water-surface');
  const submarine = scene.getObjectByName('ocean-submarine');
  api.setSteering({ turn: 0, throttle: 0, lift: 1 });
  let time = drive(0, 6);
  expect(submarine.position.y).toBeCloseTo(STEERING.maxHeight, 5);
  for (let i = 0; i < 80; i++) { api.handleViewKey({ key: '-' }); api.handleViewKey({ key: 'ArrowUp', shiftKey: true }); }
  time = drive(time, 0.2);
  expect(camera.position.y).toBeLessThan(surface.position.y - 0.5);
  api.setSteering({ turn: 0, throttle: 0, lift: -1 });
  drive(time, 8);
  expect(submarine.position.y).toBeCloseTo(oceanFloorHeight(submarine.position.x, submarine.position.z) + STEERING.floorClearance, 5);
  for (let i = 0; i < 80; i++) api.handleViewKey({ key: 'ArrowDown', shiftKey: true });
  expect(camera.position.y).toBeGreaterThan(oceanFloorHeight(camera.position.x, camera.position.z) + 0.5);
});

it('does not jump forward after a hidden tab', () => {
  const { renderer } = start();
  const [scene] = renderer.render.mock.calls[0];
  const submarine = scene.getObjectByName('ocean-submarine');
  api.setSteering({ turn: 0, throttle: 1, lift: 0 });
  drive(0, 2);
  const visibility = vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
  document.dispatchEvent(new Event('visibilitychange'));
  expect(harness.frames.size).toBe(0);
  const before = submarine.position.clone();
  visibility.mockReturnValue(false);
  document.dispatchEvent(new Event('visibilitychange'));
  tick(50000); tick(50016);
  expect(submarine.position.distanceTo(before)).toBeLessThan(STEERING.maxSpeed * 0.2);
});

it('returns the submarine and the view to the start', () => {
  const { renderer } = start();
  const [scene, camera] = renderer.render.mock.calls[0];
  const submarine = scene.getObjectByName('ocean-submarine');
  const pose = submarine.position.clone(), view = camera.position.clone();
  api.setSteering({ turn: 1, throttle: 1, lift: 1 });
  drive(0, 2);
  api.setSteering({ turn: 0, throttle: 0, lift: 0 });
  api.returnToStart();
  expect(submarine.position.distanceTo(pose)).toBeLessThan(0.00001);
  expect(submarine.rotation.y).toBe(0);
  expect(camera.position.distanceTo(view)).toBeLessThan(0.00001);
  expect(harness.frames.size).toBe(0);
});

it('the reef sits ahead of the start, clear of rocks and seagrass', () => {
  const { renderer } = start();
  const [scene] = renderer.render.mock.calls[0];
  const reef = scene.getObjectByName('ocean-reef');
  expect(reef).toBeTruthy();
  expect(reef.position.x).toBeCloseTo(REEF_SPOT.x);
  expect(reef.position.z).toBeCloseTo(REEF_SPOT.z);
  for (const name of ['ocean-rocks', 'ocean-seagrass']) {
    const decoration = scene.getObjectByName(name);
    const matrix = new THREE.Matrix4(), position = new THREE.Vector3();
    for (let i = 0; i < decoration.count; i++) {
      decoration.getMatrixAt(i, matrix);
      position.setFromMatrixPosition(matrix);
      expect(Math.hypot(position.x - REEF_SPOT.x, position.z - REEF_SPOT.z)).toBeGreaterThan(REEF_RADIUS + 1.5);
    }
  }
});

const orbitStart = ({ calm = true } = {}) => {
  harness.motion.matches = calm;
  const onOrbitOffer = vi.fn(), onOrbitChange = vi.fn();
  api = createOceanScene({ canvas, container, onReady: vi.fn(), onUnavailable: vi.fn(), onOrbitOffer, onOrbitChange });
  const [scene, camera] = harness.renderers.at(-1).render.mock.calls[0];
  return { scene, camera, onOrbitOffer, onOrbitChange, submarine: scene.getObjectByName('ocean-submarine'), anchor: scene.getObjectByName('ocean-reef-anchor') };
};
const approachReef = () => {
  api.setSteering({ turn: 0, throttle: 1, lift: 0 });
  const time = drive(0, 3);
  api.setSteering({ turn: 0, throttle: 0, lift: 0 });
  return time;
};
const flat = (point, anchor) => new THREE.Vector3(point.x - anchor.position.x, 0, point.z - anchor.position.z);

it('offers the reef only when close', () => {
  const t = orbitStart();
  expect(t.onOrbitOffer).not.toHaveBeenCalled();
  approachReef();
  expect(t.onOrbitOffer).toHaveBeenLastCalledWith({ id: 'coral-reef', name: 'Coral reef' });
  api.setSteering({ turn: 1, throttle: 0, lift: 0 });
  let time = drive(10000, 3);
  api.setSteering({ turn: 0, throttle: 1, lift: 0 });
  drive(time, 6);
  // Another animal may now be close, but the reef no longer is.
  expect(t.onOrbitOffer.mock.lastCall[0]?.id).not.toBe('coral-reef');
});

it('enterOrbit circles the reef level and in view', () => {
  const t = orbitStart({ calm: false });
  let time = approachReef();
  expect(api.enterOrbit()).toBe(true);
  expect(t.onOrbitChange).toHaveBeenLastCalledWith({ id: 'coral-reef', name: 'Coral reef', steady: false });
  time = drive(time, 4);
  const before = flat(t.submarine.position, t.anchor);
  const ceiling = OCEAN_SURFACE_HEIGHT - 0.8;
  for (let i = 0; i < 300; i++) {
    tick(time += 50);
    expect(t.camera.position.y).toBeLessThanOrEqual(ceiling + 1e-6);
    const { x, y, z } = t.submarine.position;
    expect(y).toBeGreaterThan(oceanFloorHeight(x, z) + STEERING.floorClearance - 0.01);
  }
  expect(Math.abs(before.angleTo(flat(t.submarine.position, t.anchor)) - ORBIT_RATE * 15)).toBeLessThan(0.05);
  expect(Math.abs(t.submarine.position.y - t.anchor.position.y)).toBeLessThan(0.01);
});

it('reduced motion holds the orbit steady', () => {
  const t = orbitStart();
  approachReef();
  api.enterOrbit();
  expect(t.onOrbitChange).toHaveBeenLastCalledWith({ id: 'coral-reef', name: 'Coral reef', steady: true });
});

it('leave orbit hands back steering in place', () => {
  const t = orbitStart({ calm: false });
  let time = approachReef();
  api.enterOrbit();
  time = drive(time, 6);
  const position = t.submarine.position.clone();
  const nose = new THREE.Vector3(0, 0, -1).applyQuaternion(t.submarine.quaternion).setY(0).normalize();
  api.leaveOrbit();
  expect(t.onOrbitChange).toHaveBeenLastCalledWith(null);
  expect(t.submarine.position.distanceTo(position)).toBeLessThan(1e-6);
  const yaw = t.submarine.rotation.y;
  expect(new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw)).distanceTo(nose)).toBeLessThan(0.01);
  drive(time, 1);
  expect(t.submarine.position.distanceTo(position)).toBeLessThan(1e-6);
});

it('back to start ends the orbit', () => {
  const t = orbitStart();
  approachReef();
  api.enterOrbit();
  api.returnToStart();
  expect(t.onOrbitChange).toHaveBeenLastCalledWith(null);
  expect(t.submarine.position.toArray()).toEqual([0, 3, 0]);
});

it('steering bumps against the reef', () => {
  const t = orbitStart();
  api.setSteering({ turn: 0, throttle: 1, lift: -1 });
  drive(0, 8);
  const { x, z } = t.submarine.position;
  expect(Math.hypot(x - REEF_SPOT.x, z - REEF_SPOT.z)).toBeGreaterThan(REEF_RADIUS + STEERING.hullRadius - 0.01);
});

it('drive input during orbit is ignored', () => {
  const t = orbitStart();
  let time = approachReef();
  api.enterOrbit();
  api.setSteering({ turn: 1, throttle: 1, lift: 1 });
  drive(time, 3);
  expect(flat(t.submarine.position, t.anchor).length()).toBeCloseTo(REEF_ORBIT.radius, 2);
  expect(t.submarine.position.y).toBeCloseTo(t.anchor.position.y, 2);
});

it('a reduced-motion orbit holds still without a running loop', () => {
  const t = orbitStart();
  approachReef();
  const propeller = t.scene.getObjectByName('ocean-propeller').rotation.z;
  api.enterOrbit();
  expect(harness.frames.size).toBe(0);
  expect(flat(t.submarine.position, t.anchor).length()).toBeCloseTo(REEF_ORBIT.radius, 2);
  expect(t.scene.getObjectByName('ocean-propeller').rotation.z).toBe(propeller);
});

it('the view controls leave the orbit camera alone', () => {
  const t = orbitStart({ calm: false });
  approachReef();
  api.enterOrbit();
  const before = t.camera.position.clone();
  api.resetView();
  expect(api.handleViewKey({ key: 'Home' })).toBe(false);
  expect(api.handleViewKey({ key: '+' })).toBe(false);
  expect(t.camera.position.distanceTo(before)).toBe(0);
});

it('leaving orbit eases the camera view instead of snapping', () => {
  const t = orbitStart({ calm: false });
  let time = approachReef();
  api.enterOrbit();
  time = drive(time, 6);
  const aim = () => t.camera.getWorldDirection(new THREE.Vector3());
  const before = aim(), placed = t.camera.position.clone();
  api.leaveOrbit();
  expect(t.camera.position.distanceTo(placed)).toBeLessThan(1e-6);
  expect(aim().angleTo(before)).toBeLessThan(0.02);
  drive(time, 1.5);
  const toSubmarine = t.submarine.position.clone().sub(t.camera.position).normalize();
  expect(aim().angleTo(toSubmarine)).toBeLessThan(0.35);
});

const fishOf = t => t.scene.getObjectByName('ocean-fish');
// Turn to face −X, then creep towards the fish's loop and stop there.
const parkByLoop = (t) => {
  let time = 0;
  api.setSteering({ turn: -1, throttle: 0, lift: 0 });
  while (t.submarine.rotation.y < Math.PI / 2 - 0.05) tick(time += 50);
  api.setSteering({ turn: 0, throttle: 0, lift: 0 });
  time = drive(time, 2);
  api.setSteering({ turn: 0, throttle: 1, lift: 0 });
  while (t.submarine.position.x > -3) tick(time += 50);
  api.setSteering({ turn: 0, throttle: 0, lift: 0 });
  return drive(time, 3);
};
const waitForFishOffer = (t, time) => {
  for (let i = 0; i < 700 && t.onOrbitOffer.mock.lastCall?.[0]?.id !== 'parrotfish'; i++) tick(time += 50);
  expect(t.onOrbitOffer).toHaveBeenLastCalledWith({ id: 'parrotfish', name: 'Parrotfish' });
  return time;
};

it('the fish swims with the water and starts in view', () => {
  const t = orbitStart({ calm: false });
  const fish = fishOf(t);
  const start = fishPose(0);
  expect(fish.position.distanceTo(new THREE.Vector3(start.x, start.y, start.z))).toBeLessThan(1e-6);
  t.camera.updateMatrixWorld();
  const seen = fish.position.clone().project(t.camera);
  expect(Math.abs(seen.x)).toBeLessThan(1);
  expect(Math.abs(seen.y)).toBeLessThan(1);
  const before = fish.position.clone();
  drive(0, 2);
  expect(fish.position.distanceTo(before)).toBeGreaterThan(1);
  expect(t.submarine.position.toArray()).toEqual([0, 3, 0]);
});

it('a still ocean keeps the fish in place', () => {
  let t = orbitStart();
  const placed = fishOf(t).position.clone();
  expect(harness.frames.size).toBe(0);
  api.dispose();
  t = orbitStart({ calm: false });
  api.setWaterPaused(true);
  api.setSteering({ turn: 1, throttle: 0, lift: 0 });
  drive(0, 2);
  expect(fishOf(t).position.distanceTo(placed)).toBeLessThan(1e-6);
});

it('the fish is offered as it swims past a parked submarine', () => {
  const t = orbitStart({ calm: false });
  let time = parkByLoop(t);
  const parked = t.submarine.position.clone();
  t.onOrbitOffer.mockClear();
  for (let i = 0; i < FISH_LOOP.lapSeconds * 20; i++) tick(time += 50);
  const offers = t.onOrbitOffer.mock.calls.map(([offer]) => offer?.id ?? null);
  expect(offers).toContain('parrotfish');
  expect(offers).toContain(null);
  expect(t.submarine.position.distanceTo(parked)).toBeLessThan(1e-6);
});

it('orbiting the fish follows it and keeps it in view', () => {
  const t = orbitStart({ calm: false });
  let time = waitForFishOffer(t, parkByLoop(t));
  expect(api.enterOrbit()).toBe(true);
  expect(t.onOrbitChange).toHaveBeenLastCalledWith({ id: 'parrotfish', name: 'Parrotfish', steady: false });
  const fish = fishOf(t), segment = new THREE.Line3(), closest = new THREE.Vector3();
  for (let i = 0; i < 400; i++) {
    tick(time += 50);
    const { x, y, z } = t.submarine.position;
    expect(t.camera.position.y).toBeLessThanOrEqual(OCEAN_SURFACE_HEIGHT - 0.8 + 1e-6);
    expect(y).toBeGreaterThan(oceanFloorHeight(x, z) + STEERING.floorClearance - 0.01);
    expect(Math.hypot(x - REEF_SPOT.x, z - REEF_SPOT.z)).toBeGreaterThan(REEF_RADIUS);
    if (i < 100) continue;
    expect(Math.abs(Math.hypot(x - fish.position.x, z - fish.position.z) - FISH_ORBIT.radius)).toBeLessThan(0.3);
    segment.set(t.camera.position, fish.position).closestPointToPoint(t.submarine.position, true, closest);
    // The hull and conning tower reach about 1.8 from the centre.
    expect(closest.distanceTo(t.submarine.position)).toBeGreaterThan(2);
  }
});

it('leaving the fish orbit hands back steering in place', () => {
  const t = orbitStart({ calm: false });
  let time = waitForFishOffer(t, parkByLoop(t));
  api.enterOrbit();
  drive(time, 4);
  const position = t.submarine.position.clone();
  api.leaveOrbit();
  expect(t.onOrbitChange).toHaveBeenLastCalledWith(null);
  expect(t.submarine.position.distanceTo(position)).toBeLessThan(1e-6);
});

it('the submarine faces where it is going while it follows the fish', () => {
  const t = orbitStart({ calm: false });
  let time = waitForFishOffer(t, parkByLoop(t));
  api.enterOrbit();
  time = drive(time, 5);
  for (let i = 0; i < 300; i++) {
    const before = t.submarine.position.clone();
    tick(time += 50);
    const travel = t.submarine.position.clone().sub(before).setY(0);
    const nose = new THREE.Vector3(0, 0, -1).applyQuaternion(t.submarine.quaternion).setY(0);
    expect(nose.angleTo(travel)).toBeLessThan(Math.PI / 4);
  }
});

it('a still ocean orbits the fish steadily', () => {
  for (const still of [() => orbitStart(), () => { const t = orbitStart({ calm: false }); api.setWaterPaused(true); return t; }]) {
    api?.dispose();
    const t = still();
    let time = 0;
    // The fish waits by the loop's start, so creep towards it until it is offered.
    api.setSteering({ turn: -1, throttle: 0, lift: 0 });
    while (t.submarine.rotation.y < Math.PI / 2 - 0.05) tick(time += 50);
    api.setSteering({ turn: 0, throttle: 1, lift: 0 });
    while (t.onOrbitOffer.mock.lastCall?.[0]?.id !== 'parrotfish') tick(time += 50);
    api.setSteering({ turn: 0, throttle: 0, lift: 0 });
    // Coast to a stop; a still ocean then lets the loop sleep.
    while (harness.frames.size) tick(time += 50);
    expect(api.enterOrbit()).toBe(true);
    expect(t.onOrbitChange).toHaveBeenLastCalledWith({ id: 'parrotfish', name: 'Parrotfish', steady: harness.motion.matches });
    const fish = fishOf(t).position;
    if (harness.motion.matches) {
      expect(harness.frames.size).toBe(0);
      expect(Math.hypot(t.submarine.position.x - fish.x, t.submarine.position.z - fish.z)).toBeCloseTo(FISH_ORBIT.radius, 2);
    } else {
      const placed = fish.clone();
      for (let i = 0; i < 120 && harness.frames.size; i++) tick(time += 50);
      expect(fish.distanceTo(placed)).toBe(0);
      expect(Math.abs(Math.hypot(t.submarine.position.x - fish.x, t.submarine.position.z - fish.z) - FISH_ORBIT.radius)).toBeLessThan(0.3);
    }
  }
});

// Steer towards a point on the seabed plan, then stop and let the craft settle.
const driveTo = (t, x, z, time = 0) => {
  const wrap = angle => Math.atan2(Math.sin(angle), Math.cos(angle));
  for (let i = 0; i < 1500; i++) {
    const { x: px, z: pz } = t.submarine.position;
    if (Math.hypot(x - px, z - pz) < 1) break;
    const error = wrap(Math.atan2(-(x - px), -(z - pz)) - t.submarine.rotation.y);
    api.setSteering({ turn: Math.abs(error) < 0.05 ? 0 : -Math.sign(error), throttle: Math.abs(error) < 0.6 ? 1 : 0, lift: 0 });
    tick(time += 50);
  }
  api.setSteering({ turn: 0, throttle: 0, lift: 0 });
  for (let i = 0; i < 60 && harness.frames.size; i++) tick(time += 50);
  return time;
};

it('every animal is in the water and swims', () => {
  const t = orbitStart({ calm: false });
  const names = ['ocean-fish', 'ocean-clownfish', 'ocean-sea-turtle', 'ocean-eagle-ray', 'ocean-seahorse'];
  names.forEach((name, i) => {
    const model = t.scene.getObjectByName(name);
    expect(model, name).toBeTruthy();
    const start = loopPose(ANIMALS[i].loop, 0);
    expect(model.position.distanceTo(new THREE.Vector3(start.x, start.y, start.z)), name).toBeLessThan(1e-6);
  });
  const before = names.map(name => t.scene.getObjectByName(name).position.clone());
  drive(0, 3);
  names.forEach((name, i) => expect(t.scene.getObjectByName(name).position.distanceTo(before[i]), name).toBeGreaterThan(0.3));
});

// The first of each species near the start, or else the nearest of its kind the submarine can reach in a straight line.
const straightPath = ({ loop }) => REEFS.every((reef) => {
  const along = Math.max(0, Math.min(1, (reef.x * loop.x + reef.z * loop.z) / (loop.x ** 2 + loop.z ** 2)));
  return Math.hypot(reef.x - loop.x * along, reef.z - loop.z * along) > reef.radius + 5;
});
const reachable = (id) => ANIMALS.slice(0, 5).find((animal) => animal.id === id)
  ?? ANIMALS.filter((animal) => animal.id === id && straightPath(animal)).sort((a, b) => Math.hypot(a.loop.x, a.loop.z) - Math.hypot(b.loop.x, b.loop.z))[0];
const ORBIT_CASES = [...new Set(ANIMALS.map((animal) => animal.id))].filter((id) => id !== 'parrotfish').map(reachable);

for (const animal of ORBIT_CASES) {
  it(`the ${animal.id} can be offered, orbited, followed and left`, () => {
    const t = orbitStart({ calm: false });
    let time = driveTo(t, animal.loop.x, animal.loop.z);
    const model = placed(t.scene).get(animal.key);
    for (let i = 0; i < 600 && t.onOrbitOffer.mock.lastCall?.[0]?.id !== animal.id; i++) tick(time += 50);
    expect(t.onOrbitOffer).toHaveBeenLastCalledWith({ id: animal.id, name: animal.discovery.name });
    expect(api.enterOrbit()).toBe(true);
    expect(t.onOrbitChange).toHaveBeenLastCalledWith({ id: animal.id, name: animal.discovery.name, steady: false });
    const segment = new THREE.Line3(), closest = new THREE.Vector3();
    for (let i = 0; i < 400; i++) {
      tick(time += 50);
      const { x, y, z } = t.submarine.position;
      expect(t.camera.position.y).toBeLessThanOrEqual(OCEAN_SURFACE_HEIGHT - 0.8 + 1e-6);
      expect(y).toBeGreaterThan(oceanFloorHeight(x, z) + STEERING.floorClearance - 0.01);
      expect(Math.hypot(x - REEF_SPOT.x, z - REEF_SPOT.z)).toBeGreaterThan(REEF_RADIUS);
      if (i < 100) continue;
      expect(Math.abs(Math.hypot(x - model.position.x, z - model.position.z) - animal.orbit.radius)).toBeLessThan(0.35);
      segment.set(t.camera.position, model.position).closestPointToPoint(t.submarine.position, true, closest);
      expect(closest.distanceTo(t.submarine.position), `${animal.id} hidden at ${i}`).toBeGreaterThan(2);
    }
    const position = t.submarine.position.clone();
    api.leaveOrbit();
    expect(t.onOrbitChange).toHaveBeenLastCalledWith(null);
    expect(t.submarine.position.distanceTo(position)).toBeLessThan(1e-6);
  });
}

const spread = (decoration) => {
  const matrix = new THREE.Matrix4(), position = new THREE.Vector3();
  let far = 0;
  for (let i = 0; i < decoration.count; i++) {
    decoration.getMatrixAt(i, matrix);
    far = Math.max(far, Math.hypot(...position.setFromMatrixPosition(matrix).toArray().filter((_, j) => j !== 1)));
  }
  return far;
};

it('the seabed and scenery reach the edge of the larger ocean', () => {
  const { renderer } = start();
  const [scene] = renderer.render.mock.calls[0];
  const floor = scene.getObjectByName('ocean-seabed');
  floor.geometry.computeBoundingBox();
  // The sand runs well past the edge so the fog, not a cliff, ends the view.
  expect(floor.geometry.boundingBox.max.x).toBeGreaterThan(STEERING.areaRadius + 60);
  expect(floor.geometry.boundingBox.max.z).toBeGreaterThan(STEERING.areaRadius + 60);
  for (const name of ['ocean-rocks', 'ocean-seagrass']) {
    expect(spread(scene.getObjectByName(name)), name).toBeGreaterThan(STEERING.areaRadius * 0.85);
  }
  // About the same number of rocks per square metre as the first preview (38 in its ring).
  expect(scene.getObjectByName('ocean-rocks').count).toBeGreaterThan(250);
  const shafts = [];
  scene.traverse((object) => { if (object.name === 'ocean-sun-shaft') shafts.push(Math.hypot(object.position.x, object.position.z)); });
  expect(shafts.length).toBeGreaterThanOrEqual(20);
  expect(Math.max(...shafts)).toBeGreaterThan(STEERING.areaRadius * 0.6);
});

it('shadows follow the submarine across the ocean', () => {
  const t = orbitStart({ calm: false });
  const light = t.scene.children.find((object) => object.isDirectionalLight);
  let time = 0;
  api.setSteering({ turn: 1, throttle: 0, lift: 0 });
  while (Math.abs(t.submarine.rotation.y) < Math.PI - 0.1) tick(time += 50);
  api.setSteering({ turn: 0, throttle: 1, lift: 0 });
  for (let i = 0; i < 400; i++) tick(time += 50);
  const { x, z } = t.submarine.position;
  expect(Math.hypot(x, z)).toBeGreaterThan(40);
  const half = light.shadow.camera.right;
  expect(Math.abs(light.target.position.x - x)).toBeLessThan(half / 2);
  expect(Math.abs(light.target.position.z - z)).toBeLessThan(half / 2);
  expect(light.position.clone().sub(light.target.position).length()).toBeGreaterThan(5);
});

it('scenery carries on past the edge so the view never ends in bare sand', () => {
  const { renderer } = start();
  const [scene] = renderer.render.mock.calls[0];
  for (const name of ['ocean-rocks', 'ocean-seagrass']) expect(spread(scene.getObjectByName(name)), name).toBeGreaterThan(STEERING.areaRadius + 10);
});

it('no animal swims through the starting camera', () => {
  const t = orbitStart({ calm: false });
  const eye = t.camera.position.clone();
  for (const animal of ANIMALS) for (let s = 0; s < animal.loop.lapSeconds; s += 0.5) {
    const { x, y, z } = loopPose(animal.loop, s);
    expect(eye.distanceTo(new THREE.Vector3(x, y, z)), animal.id).toBeGreaterThan(5);
  }
});

const placed = (scene) => {
  const found = new Map();
  scene.traverse((object) => { if (object.userData.key) found.set(object.userData.key, object); });
  return found;
};

it('the ocean is busy: every reef and every animal is in the water', () => {
  const t = orbitStart({ calm: false });
  const found = placed(t.scene);
  for (const animal of ANIMALS) expect(found.get(animal.key), animal.key).toBeTruthy();
  for (const reef of REEFS) {
    const model = found.get(reef.key);
    expect(model, reef.key).toBeTruthy();
    expect(model.position.x).toBeCloseTo(reef.x);
    expect(model.position.z).toBeCloseTo(reef.z);
    expect(model.scale.x).toBeCloseTo(1.45 * reef.size);
  }
});

it('scenery stays clear of every reef', () => {
  const { renderer } = start();
  const [scene] = renderer.render.mock.calls[0];
  for (const name of ['ocean-rocks', 'ocean-seagrass']) {
    const decoration = scene.getObjectByName(name);
    const matrix = new THREE.Matrix4(), position = new THREE.Vector3();
    for (let i = 0; i < decoration.count; i++) {
      decoration.getMatrixAt(i, matrix);
      position.setFromMatrixPosition(matrix);
      for (const reef of REEFS) expect(Math.hypot(position.x - reef.x, position.z - reef.z), `${name} ${i} by ${reef.key}`).toBeGreaterThan(reef.radius + 1.5);
    }
  }
});

it('animals far from the submarine are hidden, and appear in place when it comes near', () => {
  const t = orbitStart({ calm: false });
  const found = placed(t.scene);
  const far = ANIMALS.filter(animal => Math.hypot(animal.loop.x, animal.loop.z) > 86);
  const near = ANIMALS.filter(animal => Math.hypot(animal.loop.x, animal.loop.z) < 40);
  expect(far.length).toBeGreaterThan(3);
  for (const animal of far) expect(found.get(animal.key).visible, animal.key).toBe(false);
  for (const animal of near) expect(found.get(animal.key).visible, animal.key).toBe(true);
  // Paused water: driving still reveals them, at the right place for the time they were left.
  api.setWaterPaused(true);
  const target = far[0];
  driveTo(t, target.loop.x * 0.5, target.loop.z * 0.5);
  const model = found.get(target.key);
  const pose = loopPose(target.loop, 0);
  expect(Math.hypot(t.submarine.position.x - target.loop.x, t.submarine.position.z - target.loop.z)).toBeLessThan(80);
  expect(model.visible).toBe(true);
  expect(model.position.distanceTo(new THREE.Vector3(pose.x, pose.y, pose.z))).toBeLessThan(1e-6);
});

it('offering and orbiting follow the animal that was offered, not another of its kind', () => {
  const t = orbitStart({ calm: false });
  const found = placed(t.scene);
  // A turtle the submarine can reach in a straight line, past no reef.
  const clearPath = ({ loop }) => REEFS.every((reef) => {
    const along = Math.max(0, Math.min(1, (reef.x * loop.x + reef.z * loop.z) / (loop.x ** 2 + loop.z ** 2)));
    return Math.hypot(reef.x - loop.x * along, reef.z - loop.z * along) > reef.radius + 5;
  });
  const second = ANIMALS.find(animal => animal.id === 'sea-turtle' && animal.key !== 'sea-turtle' && Math.hypot(animal.loop.x, animal.loop.z) > 30 && clearPath(animal));
  expect(second).toBeTruthy();
  let time = driveTo(t, second.loop.x, second.loop.z);
  for (let i = 0; i < 600 && t.onOrbitOffer.mock.lastCall?.[0]?.id !== 'sea-turtle'; i++) tick(time += 50);
  expect(t.onOrbitOffer).toHaveBeenLastCalledWith({ id: 'sea-turtle', name: 'Green sea turtle' });
  expect(api.enterOrbit()).toBe(true);
  expect(t.onOrbitChange).toHaveBeenLastCalledWith({ id: 'sea-turtle', name: 'Green sea turtle', steady: false });
  for (let i = 0; i < 200; i++) tick(time += 50);
  const chosen = found.get(second.key), home = found.get('sea-turtle');
  const flat = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
  expect(flat(t.submarine.position, chosen.position)).toBeLessThan(second.orbit.radius + 0.5);
  expect(flat(t.submarine.position, home.position)).toBeGreaterThan(20);
});

it('nothing is offered at the start while the ocean moves, and hidden animals sit where they swim', () => {
  const t = orbitStart({ calm: false });
  drive(0, 2);
  expect(t.onOrbitOffer).not.toHaveBeenCalled();
  const found = placed(t.scene);
  for (const animal of ANIMALS) {
    const pose = loopPose(animal.loop, 0);
    const model = found.get(animal.key);
    if (!model.visible) expect(model.position.distanceTo(new THREE.Vector3(pose.x, pose.y, pose.z)), animal.key).toBeLessThan(1e-6);
  }
});
