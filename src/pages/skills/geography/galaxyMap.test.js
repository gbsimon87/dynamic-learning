import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { LEVEL_CENTRES, SUN_ON_IMAGE, createGalaxyMap } from './galaxyMap.js';
import { mapCatalogue } from './galaxyMapData.js';
import { SYSTEM_REGISTRY } from './systems/registry.js';
import { availableDestinations } from './beyondDestinations.js';

// No WebGL in node: a renderer that draws nothing, controls that only aim, and a loader that hands back a texture.
function make(options = {}) {
  const renders = [], loads = [], textures = [];
  const map = createGalaxyMap({
    renderer: { render: (scene, camera) => renders.push([scene, camera]), domElement: null },
    quality: 'standard', reducedMotion: () => true,
    catalogue: mapCatalogue(SYSTEM_REGISTRY, availableDestinations()),
    currentSystemId: 'solar-system',
    createControls: (camera) => ({
      target: new THREE.Vector3(), enabled: true, disposed: false, minDistance: 0, maxDistance: Infinity,
      update() { camera.lookAt(this.target); }, dispose() { this.disposed = true; },
    }),
    loader: { load: (url) => { loads.push(url); const texture = new THREE.Texture(); texture.disposed = false; texture.addEventListener('dispose', () => { texture.disposed = true; }); textures.push(texture); return texture; } },
    ...options,
  });
  map.resize({ width: 800, height: 600 });
  return Object.assign(map, { renders, loads, textures });
}

test('opening builds the scene and closing frees the texture', () => {
  const map = make();
  assert.equal(map.isActive(), false);
  assert.equal(map.scene, null);
  map.open();
  assert.equal(map.isActive(), true);
  assert.ok(map.scene);
  assert.deepEqual(map.loads, ['/static/milky-way-4096.jpg']);
  map.update(.016); map.render();
  assert.equal(map.renders.length, 1);
  map.close();
  assert.equal(map.isActive(), false);
  assert.equal(map.scene, null);
  assert.ok(map.textures.every((t) => t.disposed), 'texture freed');
  const low = make({ quality: 'low' });
  low.open();
  assert.deepEqual(low.loads, ['/static/milky-way-2048.jpg']);
  map.dispose(); low.dispose();
});

test('setLevel moves the camera target to each level\'s centre', () => {
  const map = make();
  map.open();
  assert.equal(map.level(), 'galaxies');
  for (const level of ['milky-way', 'neighbourhood', 'galaxies']) {
    map.setLevel(level); map.update(.016);
    assert.equal(map.level(), level);
    assert.ok(map.controls.target.distanceTo(LEVEL_CENTRES[level]) < 1e-6, level);
  }
  assert.throws(() => map.setLevel('nowhere'));
  map.dispose();
});

test('projectMarkers returns one entry per marker on the current level', () => {
  const map = make();
  map.open(); map.update(.016);
  const galaxies = map.projectMarkers();
  assert.deepEqual(galaxies.map((m) => m.id).sort(), ['andromeda', 'large-magellanic-cloud', 'milky-way', 'small-magellanic-cloud', 'space-ripples', 'triangulum']);
  for (const m of galaxies) assert.ok(Number.isFinite(m.x) && Number.isFinite(m.y) && typeof m.visible === 'boolean');
  assert.ok(galaxies.find((m) => m.id === 'milky-way').visible, 'the centre is on screen');
  map.setLevel('milky-way'); map.update(.016);
  assert.deepEqual(map.projectMarkers().map((m) => m.id), ['you-are-here']);
  map.setLevel('neighbourhood'); map.update(.016);
  assert.deepEqual(map.projectMarkers().map((m) => m.id), SYSTEM_REGISTRY.map((e) => e.id));
  map.dispose();
});

test('You are here follows currentSystemId', () => {
  const home = make();
  home.open(); home.setLevel('neighbourhood'); home.update(.016);
  assert.deepEqual(home.projectMarkers().filter((m) => m.here).map((m) => m.id), ['solar-system']);
  const away = make({ currentSystemId: 'trappist-1' });
  away.open(); away.setLevel('neighbourhood'); away.update(.016);
  assert.deepEqual(away.projectMarkers().filter((m) => m.here).map((m) => m.id), ['trappist-1']);
  const t1 = away.markerPosition('trappist-1');
  assert.ok(away.youAreHere.getWorldPosition(new THREE.Vector3()).distanceTo(t1) < 1e-6);
  assert.ok(SUN_ON_IMAGE.v > .5, 'the Sun is below the centre of the picture');
  home.dispose(); away.dispose();
});

test('focus glides to a marker and the camera stays in the level\'s bounds', () => {
  const map = make();
  map.open(); map.setLevel('neighbourhood'); map.focus('trappist-1'); map.update(.016);
  assert.ok(map.controls.target.distanceTo(map.markerPosition('trappist-1')) < 1e-6);
  const galaxies = make(); galaxies.open(); galaxies.focus('andromeda'); galaxies.update(.016);
  assert.ok(galaxies.controls.target.distanceTo(LEVEL_CENTRES.galaxies) < 1e-6, 'the galaxies level never pans away from the Milky Way');
  galaxies.dispose();
  map.controls.target.set(1e6, 0, 0); map.update(.016);
  assert.ok(map.controls.target.distanceTo(LEVEL_CENTRES.neighbourhood) < 200, 'panning is held within the level');
  map.dispose();
});

test('focusing a system beyond the pan limit glides to the edge and stays put', () => {
  const far = { ...SYSTEM_REGISTRY[1], id: 'far-system', name: 'Far System', position: { raHours: 6, decDeg: 10, distanceLy: 200 } };
  const map = make({ catalogue: mapCatalogue([...SYSTEM_REGISTRY, far], availableDestinations()), reducedMotion: () => false });
  map.open(); map.setLevel('neighbourhood');
  for (let i = 0; i < 600; i += 1) map.update(.016);
  map.focus('far-system');
  for (let i = 0; i < 600; i += 1) map.update(.016);
  // The child pans back home; the finished glide must not keep pulling them away.
  map.controls.target.copy(LEVEL_CENTRES.neighbourhood);
  for (let i = 0; i < 60; i += 1) map.update(.016);
  assert.ok(map.controls.target.distanceTo(LEVEL_CENTRES.neighbourhood) < 1e-6, 'no tug-of-war between the glide and the pan limit');
  assert.ok(map.controls.target.distanceTo(LEVEL_CENTRES.neighbourhood) <= 80 + 1e-6);
  map.dispose();
});

test('focusing a far system keeps the camera at its usual distance from the target', () => {
  const far = { ...SYSTEM_REGISTRY[1], id: 'far-system', name: 'Far System', position: { raHours: 6, decDeg: 10, distanceLy: 200 } };
  const map = make({ catalogue: mapCatalogue([...SYSTEM_REGISTRY, far], availableDestinations()) });
  map.open(); map.setLevel('neighbourhood'); map.update(.016);
  const before = map.camera.position.distanceTo(map.controls.target);
  map.focus('far-system'); map.update(.016);
  assert.ok(Math.abs(map.camera.position.distanceTo(map.controls.target) - before) < 1e-6);
  map.dispose();
});
