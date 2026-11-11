import * as THREE from 'three';
import { STEERING } from './oceanSteering.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { marineMaterial, taperedTube } from './oceanModelDetail.js';

// Straight ahead of the start, so it shows through the haze from the first view.
export const REEF_SPOT = { x: 0, z: -11 };
// The model is built at 1:1 within 2.8 × 1.8, then scaled up so it reads beside the submarine.
const REEF_SCALE = 1.45;
export const REEF_RADIUS = 2.8 * REEF_SCALE;
export const REEF_HEIGHT = 1.8 * REEF_SCALE;

// Habitat colours stay the same in both interface themes.
const CORAL = { mound: '#9a8b72', pink: '#c97d83', orange: '#ba885c', purple: '#927c9b', teal: '#688d7c', yellow: '#bea16e' };

/**
 * Every reef: the original, then eight more spread across the ocean, 1 to 1.2 times its size.
 * Each new reef takes the best of several random spots: the one farthest from the others.
 */
export const REEFS = (() => {
  const reefs = [{ key: 'coral-reef', x: REEF_SPOT.x, z: REEF_SPOT.z, size: 1, radius: REEF_RADIUS }];
  let seed = 4099;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  while (reefs.length < 9) {
    let best = null, bestGap = -Infinity;
    for (let i = 0; i < 40; i++) {
      const angle = random() * Math.PI * 2, distance = 28 + Math.sqrt(random()) * (STEERING.areaRadius - 28 - 26);
      const x = Math.cos(angle) * distance, z = Math.sin(angle) * distance;
      const gap = Math.min(...reefs.map(reef => Math.hypot(x - reef.x, z - reef.z)));
      if (gap > bestGap) { best = { x, z }; bestGap = gap; }
    }
    const size = 1 + random() * 0.2;
    reefs.push({ key: `coral-reef-${reefs.length + 1}`, x: best.x, z: best.z, size, radius: REEF_RADIUS * size });
  }
  return reefs;
})();

/** Branching staghorn, open sea fans, grooved brain corals and hollow tube sponges. */
export function createOceanReef(water, size = 1) {
  const group = new THREE.Group();
  group.name = 'ocean-reef';
  group.scale.setScalar(REEF_SCALE * size);
  let seed = 23;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  const materials = Object.fromEntries(Object.entries(CORAL).map(([key, color]) =>
    [key, marineMaterial(water, color, { pattern: 'coral', roughness: 0.9 })]));
  // Bake the stationary coral into one draw per material, even with all the branches.
  const batches = new Map();
  const originals = new Set();
  const transform = new THREE.Object3D();
  const add = (geometry, material, position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0]) => {
    originals.add(geometry);
    transform.position.set(...position);
    transform.scale.set(...scale);
    transform.rotation.set(...rotation);
    transform.updateMatrix();
    if (!batches.has(material)) batches.set(material, []);
    batches.get(material).push(geometry.clone().applyMatrix4(transform.matrix));
  };
  const sphere = new THREE.SphereGeometry(1, 24, 16);
  // Several limestone lobes break up the old single smooth mound.
  for (let i = 0; i < 9; i++) {
    const angle = i * 2.4, radius = 0.4 + random() * 1.1;
    add(sphere, 'mound', [Math.cos(angle) * radius, -0.15 + random() * 0.14, Math.sin(angle) * radius], [0.7 + random() * 0.6, 0.35 + random() * 0.2, 0.6 + random() * 0.5]);
  }
  const branch = (x, z, color, height) => {
    for (let i = 0; i < 4; i++) {
      const angle = i * 2.4 + random() * 0.5;
      const length = height * (0.65 + random() * 0.3);
      const dx = Math.cos(angle) * 0.24, dz = Math.sin(angle) * 0.24;
      add(taperedTube([[x, 0.18, z], [x + dx * 0.3, length * 0.5, z + dz * 0.3], [x + dx, length, z + dz]], 0.085, 10, 0.35), color);
      for (const side of [-1, 1]) {
        const fork = [x + dx * 0.55, length * 0.65, z + dz * 0.55];
        add(taperedTube([fork, [fork[0] + side * 0.15, length * 0.9, fork[2] + 0.1], [fork[0] + side * 0.25, length * 1.08, fork[2] + 0.16]], 0.045, 8, 0.25), color);
      }
    }
  };
  branch(-1.2, 0.4, 'orange', 1.4);
  branch(0.9, -0.6, 'pink', 1.5);
  branch(0.2, 1.1, 'yellow', 1.1);
  branch(-0.4, -1.6, 'orange', 1.2);
  branch(1.9, 0.1, 'yellow', 0.9);

  const brain = (x, z, radius, color) => {
    add(sphere, color, [x, 0.25, z], [radius, radius * 0.75, radius]);
    for (let ring = 0; ring < 6; ring++) {
      const points = [];
      for (let step = 0; step <= 64; step++) {
        const angle = step / 64 * Math.PI * 2;
        const latitude = 0.2 + ring * 0.23 + Math.sin(angle * 7 + ring) * 0.06;
        points.push(new THREE.Vector3(x + Math.cos(angle) * Math.sin(latitude) * radius * 1.02,
          0.25 + Math.cos(latitude) * radius * 0.77,
          z + Math.sin(angle) * Math.sin(latitude) * radius * 1.02));
      }
      add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 64, radius * 0.027, 5, false), color);
    }
  };
  brain(1.5, 0.7, 0.55, 'purple');
  brain(-0.6, -1.1, 0.62, 'teal');
  brain(-1.9, -0.5, 0.4, 'pink');
  brain(0.6, 1.7, 0.45, 'orange');

  const fan = (x, z, color, rotation) => {
    const grow = (start, angle, length, depth) => {
      const end = [start[0] + Math.sin(angle) * length, start[1] + Math.cos(angle) * length, 0];
      const mid = [(start[0] + end[0]) * 0.5, (start[1] + end[1]) * 0.5, 0.02];
      add(taperedTube([start, mid, end], 0.01 + depth * 0.006, 6, 0.6), color, [x, 0.25, z], [1, 1, 1], [0, rotation, 0]);
      if (depth > 0) for (const side of [-1, 1]) grow(end, angle + side * 0.5, length * 0.67, depth - 1);
    };
    grow([0, 0, 0], 0, 0.58, 4);
  };
  fan(-0.2, -0.2, 'purple', 0.6);
  fan(1.7, -0.9, 'teal', -0.9);
  const sponge = new THREE.LatheGeometry([[0.14, 0], [0.19, 0.25], [0.22, 0.6], [0.18, 0.8], [0.12, 0.8], [0.13, 0.6], [0.08, 0.26], [0, 0.2]].map(([r, y]) => new THREE.Vector2(r, y)), 20);
  for (let i = 0; i < 4; i++) add(sponge, 'yellow', [-1.5 + i * 0.2, 0.1, 1.15 + (i % 2) * 0.25], [1, 0.7 + random() * 0.4, 1], [0.1, i, (i - 1.5) * 0.1]);

  for (const [key, geometries] of batches) {
    const mesh = new THREE.Mesh(mergeGeometries(geometries), materials[key]);
    mesh.name = `ocean-coral-${key}`;
    mesh.castShadow = mesh.receiveShadow = true;
    group.add(mesh);
    geometries.forEach((geometry) => geometry.dispose());
  }
  originals.forEach((geometry) => geometry.dispose());
  return group;
}
