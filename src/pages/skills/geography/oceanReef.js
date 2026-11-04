import * as THREE from 'three';
import { STEERING } from './oceanSteering.js';

// Straight ahead of the start, so it shows through the haze from the first view.
export const REEF_SPOT = { x: 0, z: -11 };
// The model is built at 1:1 within 2.8 × 1.8, then scaled up so it reads beside the submarine.
const REEF_SCALE = 1.45;
export const REEF_RADIUS = 2.8 * REEF_SCALE;
export const REEF_HEIGHT = 1.8 * REEF_SCALE;

// Habitat colours stay the same in both interface themes.
const CORAL = { mound: '#c9a38f', pink: '#ff6f91', orange: '#ff9f43', purple: '#9b7bea', teal: '#3ccfb4', yellow: '#ffd166' };

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

/** Original stylised coral: a low mound with branching, brain and fan corals, all within REEF_RADIUS of its origin. */
export function createOceanReef(water, size = 1) {
  const group = new THREE.Group();
  group.name = 'ocean-reef';
  group.scale.setScalar(REEF_SCALE * size);
  let seed = 23;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  const materials = Object.fromEntries(Object.entries(CORAL).map(([key, color]) => {
    const material = new THREE.MeshStandardMaterial({ color, roughness: 0.82, side: THREE.DoubleSide });
    water?.addCaustics(material);
    return [key, material];
  }));
  const add = (geometry, material, position, scale = [1, 1, 1], rotation = [0, 0, 0]) => {
    const mesh = new THREE.Mesh(geometry, materials[material]);
    mesh.position.set(...position);
    mesh.scale.set(...scale);
    mesh.rotation.set(...rotation);
    mesh.castShadow = mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  };

  const sphere = new THREE.SphereGeometry(1, 20, 14);
  add(sphere, 'mound', [0, -0.15, 0], [2.4, 0.55, 2]);

  // Branching coral: tapered stems that fork once, with rounded tips.
  const stem = new THREE.CylinderGeometry(0.07, 0.12, 1, 8);
  stem.translate(0, 0.5, 0);
  const tip = new THREE.SphereGeometry(0.1, 10, 8);
  const branch = (x, z, color, height) => {
    const base = new THREE.Vector3(x, 0.25, z);
    for (let i = 0; i < 4; i++) {
      const lean = new THREE.Euler((random() - 0.5) * 0.9, random() * Math.PI * 2, (random() - 0.5) * 0.9, 'YXZ');
      const length = height * (0.55 + random() * 0.45);
      const mesh = add(stem, color, base.toArray(), [1, length, 1]);
      mesh.rotation.copy(lean);
      const end = new THREE.Vector3(0, length, 0).applyEuler(lean).add(base);
      add(tip, color, end.toArray());
    }
  };
  branch(-1.2, 0.4, 'orange', 1.4);
  branch(0.9, -0.6, 'pink', 1.5);
  branch(0.2, 1.1, 'yellow', 1.1);
  branch(-0.4, -1.6, 'orange', 1.2);
  branch(1.9, 0.1, 'yellow', 0.9);

  // Brain corals: half-buried domes.
  add(sphere, 'purple', [1.5, 0.2, 0.7], [0.55, 0.42, 0.55]);
  add(sphere, 'teal', [-0.6, 0.25, -1.1], [0.62, 0.48, 0.62]);
  add(sphere, 'pink', [-1.9, 0.1, -0.5], [0.4, 0.3, 0.4]);
  add(sphere, 'orange', [0.6, 0.15, 1.7], [0.45, 0.35, 0.45]);
  add(sphere, 'teal', [-1.6, 0.1, 1.3], [0.38, 0.3, 0.38]);

  // Sea fans: thin upright half-discs.
  const fan = new THREE.CircleGeometry(0.75, 20, 0, Math.PI);
  add(fan, 'purple', [-0.2, 0.3, -0.2], [1, 1.35, 1], [0, 0.6, 0]);
  add(fan, 'teal', [1.7, 0.2, -0.9], [0.8, 1.05, 1], [0, -0.9, 0]);
  return group;
}
