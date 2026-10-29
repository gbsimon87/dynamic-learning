import * as THREE from 'three';

// A slow circle to the left of the start, clear of the reef and the parked submarine.
export const FISH_LOOP = { x: -12, z: -3, radius: 5, height: 3.2, lapSeconds: 30 };
// The orbit pilot treats the fish as a ball this size.
export const FISH_RADIUS = 0.9;

/**
 * Where something swimming a circle is after `seconds`. It starts on the side nearest the submarine's start,
 * `phase` seconds along, and may go either way round (`direction` 1 or −1). `heading` points its nose (−Z) along the loop.
 */
export function loopPose(loop, seconds) {
  const direction = loop.direction ?? 1;
  const angle = Math.atan2(-loop.z, -loop.x) + direction * ((seconds + (loop.phase ?? 0)) / loop.lapSeconds) * Math.PI * 2;
  return {
    x: loop.x + Math.cos(angle) * loop.radius,
    y: loop.height,
    z: loop.z + Math.sin(angle) * loop.radius,
    heading: direction > 0 ? Math.PI - angle : -angle,
  };
}

/** Where the fish is after `seconds` of swimming. */
export const fishPose = (seconds) => loopPose(FISH_LOOP, seconds);

// Habitat colours stay the same in both interface themes.
const COLOURS = { body: '#2fc4a8', belly: '#8de0c8', fin: '#ff8fb1', beak: '#f2efe4', eye: '#1d2733', stripe: '#ffb347' };

/** Original stylised parrotfish, about 1.8 long, nose towards −Z; wag `ocean-fish-tail`. */
export function createOceanFish(water) {
  const group = new THREE.Group();
  group.name = 'ocean-fish';
  const materials = Object.fromEntries(Object.entries(COLOURS).map(([key, color]) => {
    const material = new THREE.MeshStandardMaterial({ color, roughness: key === 'eye' ? 0.3 : 0.6, side: THREE.DoubleSide });
    if (key !== 'eye') water?.addCaustics(material);
    return [key, material];
  }));
  const sphere = new THREE.SphereGeometry(1, 24, 16);
  const add = (geometry, material, position, scale = [1, 1, 1], rotation = [0, 0, 0], parent = group) => {
    const mesh = new THREE.Mesh(geometry, materials[material]);
    mesh.position.set(...position);
    mesh.scale.set(...scale);
    mesh.rotation.set(...rotation);
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  };

  add(sphere, 'body', [0, 0, 0], [0.32, 0.42, 0.75]);
  add(sphere, 'belly', [0, -0.14, -0.05], [0.27, 0.27, 0.6]);
  add(sphere, 'stripe', [0, 0.06, -0.38], [0.3, 0.33, 0.08]);
  add(sphere, 'beak', [0, -0.04, -0.74], [0.16, 0.14, 0.12]);
  for (const side of [-1, 1]) {
    add(sphere, 'beak', [side * 0.2, 0.1, -0.5], [0.09, 0.09, 0.06]);
    add(sphere, 'eye', [side * 0.25, 0.11, -0.52], [0.05, 0.05, 0.04]);
    add(new THREE.CircleGeometry(0.22, 16, 0, Math.PI), 'fin', [side * 0.3, -0.08, -0.1], [1, 0.8, 1], [0, side * 1.2, -Math.PI / 2]);
  }
  // Dorsal fin along the back.
  add(new THREE.CircleGeometry(0.55, 20, 0, Math.PI), 'fin', [0, 0.32, 0.05], [1, 0.45, 1], [0, Math.PI / 2, 0]);

  const tail = new THREE.Group();
  tail.name = 'ocean-fish-tail';
  tail.position.set(0, 0, 0.68);
  const fan = new THREE.Shape();
  fan.moveTo(0, 0);
  fan.lineTo(0.42, 0.4);
  fan.quadraticCurveTo(0.34, 0, 0.42, -0.4);
  fan.lineTo(0, 0);
  add(new THREE.ShapeGeometry(fan, 8), 'fin', [0, 0, 0], [1, 1, 1], [0, -Math.PI / 2, 0], tail);
  group.add(tail);
  return group;
}
