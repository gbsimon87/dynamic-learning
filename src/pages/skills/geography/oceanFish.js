import * as THREE from 'three';
import { kit, sphere, TAIL } from './oceanCreatures.js';
import { marineBody, taperedTube } from './oceanModelDetail.js';
import { marineSpine } from './oceanAnimalMotion.js';

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
const COLOURS = { body: '#279b8c', belly: '#87bfaa', fin: '#b76683', beak: '#d6d0b7', eye: '#152b2a', stripe: '#c9a364' };

/** A tapered, scale-patterned parrotfish, nose towards −Z; wag `ocean-fish-tail`. */
export function createOceanFish(water) {
  const { group, add, pivot } = kit('ocean-fish', water, COLOURS);

  const body = add(marineBody([[-0.76, 0.18], [-0.56, 0.76], [-0.2, 1], [0.25, 0.85], [0.55, 0.4], [0.72, 0.1]], 0.32, 0.42), 'body', [0, 0, 0]);
  add(sphere, 'beak', [0, -0.04, -0.74], [0.16, 0.14, 0.12]);
  const fins = [];
  for (const side of [-1, 1]) {
    add(sphere, 'stripe', [side * 0.245, 0.11, -0.5], [0.06, 0.06, 0.04]);
    add(sphere, 'eye', [side * 0.274, 0.11, -0.52], [0.032, 0.032, 0.03]);
    add(taperedTube([[side * 0.23, 0.19, -0.36], [side * 0.3, 0, -0.3], [side * 0.23, -0.2, -0.35]], 0.008, 12, 0.5), 'stripe', [0, 0, 0]);
    const fin = pivot([side * 0.3, -0.08, -0.1]);
    add(new THREE.CircleGeometry(0.22, 12, 0, Math.PI), 'fin', [0, 0, 0], [1, 0.8, 1], [0, side * 1.2, -Math.PI / 2], fin);
    fins.push({ node: fin, side });
  }
  // Dorsal fin along the back.
  add(new THREE.CircleGeometry(0.55, 20, 0, Math.PI), 'fin', [0, 0.32, 0.05], [1, 0.45, 1], [0, Math.PI / 2, 0]);

  const tail = new THREE.Group();
  tail.name = 'ocean-fish-tail';
  tail.position.set(0, 0, 0.68);
  add(TAIL, 'fin', [0, 0, 0], [1.3, 1.3, 1], [0, -Math.PI / 2, 0], tail);
  group.add(tail);
  group.userData.spine = marineSpine(body, tail, { start: -0.18, end: 0.8, amplitude: 0.085, rate: 6.4 });
  group.userData.fins = fins;
  return group;
}

export function animateFish(model, seconds) {
  model.userData.spine(seconds);
  model.userData.fins.forEach(({ node, side }) => { node.rotation.y = side * Math.sin(seconds * 7 - 0.7) * 0.18; });
}
