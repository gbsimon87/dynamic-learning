import * as THREE from 'three';
import { kit, sphere } from './oceanCreatures.js';

// More original, stylised animals. Habitat colours stay the same in both themes; every model faces −Z and casts no shadow.

/** A crescent tail fin standing upright (fish and sharks), `size` tall, trailing towards +Z. */
function crescent(size) {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.quadraticCurveTo(size * 0.35, size * 0.25, size * 0.55, size * 0.6);
  shape.quadraticCurveTo(size * 0.3, size * 0.1, size * 0.45, -size * 0.45);
  shape.quadraticCurveTo(size * 0.25, -size * 0.15, 0, 0);
  return new THREE.ShapeGeometry(shape, 10);
}

/** A triangular fin, `width` along the body and `height` tall, its back edge curving. */
function fin(width, height) {
  const shape = new THREE.Shape();
  shape.moveTo(-width / 2, 0);
  shape.quadraticCurveTo(0, height * 0.9, width * 0.35, height);
  shape.quadraticCurveTo(width * 0.2, height * 0.4, width / 2, 0);
  shape.lineTo(-width / 2, 0);
  return new THREE.ShapeGeometry(shape, 8);
}

/** Flat flukes spreading sideways, for whales and dolphins, trailing towards +Z. */
function flukes(span) {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.quadraticCurveTo(span * 0.3, span * 0.05, span * 0.5, span * 0.35);
  shape.quadraticCurveTo(span * 0.2, span * 0.3, 0, span * 0.22);
  shape.quadraticCurveTo(-span * 0.2, span * 0.3, -span * 0.5, span * 0.35);
  shape.quadraticCurveTo(-span * 0.3, span * 0.05, 0, 0);
  const geometry = new THREE.ShapeGeometry(shape, 10);
  geometry.rotateX(Math.PI / 2);
  return geometry;
}

const SHARK = { back: '#7d8fa3', belly: '#eef1f4', fin: '#6a7c91', eye: '#11161d' };

/** A reef shark, about 3.4 long. Its tail sweeps from side to side. */
export function createOceanShark(water) {
  const { group, add, pivot } = kit('ocean-shark', water, SHARK);
  add(sphere, 'back', [0, 0, 0], [0.42, 0.42, 1.6]);
  add(sphere, 'belly', [0, -0.13, -0.15], [0.36, 0.3, 1.45]);
  add(sphere, 'back', [0, -0.02, -1.45], [0.3, 0.25, 0.4]);
  for (const side of [-1, 1]) {
    add(sphere, 'eye', [side * 0.24, 0.06, -1.4], [0.045, 0.045, 0.04]);
    add(fin(0.7, 0.75), 'fin', [side * 0.3, -0.2, -0.35], [1, 1, 1], [0, Math.PI / 2, side * 2.1]);
  }
  add(fin(0.8, 0.75), 'fin', [0, 0.36, -0.1], [1, 1, 1], [0, Math.PI / 2, 0]);
  const tail = pivot([0, 0, 1.5]);
  add(sphere, 'back', [0, 0, 0.15], [0.16, 0.18, 0.4], [0, 0, 0], tail);
  add(crescent(1.1), 'fin', [0, 0, 0.4], [1, 1, 1], [0, -Math.PI / 2, 0], tail);
  group.userData.tail = tail;
  return group;
}
export const animateShark = (model, seconds) => { model.userData.tail.rotation.y = Math.sin(seconds * 3) * 0.35; };

const WHALE = { back: '#36506b', belly: '#dfe7ec', flipper: '#e9eef1', eye: '#0f1621', bump: '#2c4157' };

/** A humpback whale, about 7.5 long, with long white flippers. Its flukes beat slowly up and down. */
export function createOceanWhale(water) {
  const { group, add, pivot } = kit('ocean-whale', water, WHALE);
  add(sphere, 'back', [0, 0, 0], [1.25, 1.1, 3.4]);
  add(sphere, 'belly', [0, -0.42, -0.6], [1.05, 0.7, 2.7]);
  for (const [x, z] of [[0, -2.9], [0.3, -2.5], [-0.3, -2.5], [0, -2.1]]) add(sphere, 'bump', [x, 0.58, z], [0.12, 0.08, 0.12]);
  add(fin(0.7, 0.35), 'back', [0, 0.98, 1.2], [1, 1, 1], [0, Math.PI / 2, 0]);
  const flippers = [];
  for (const side of [-1, 1]) {
    add(sphere, 'eye', [side * 0.95, -0.15, -2.1], [0.08, 0.08, 0.07]);
    const flipper = pivot([side * 1.05, -0.4, -1.1]);
    add(sphere, 'flipper', [side * 1.2, 0, 0.35], [1.3, 0.09, 0.3], [0, side * -0.35, 0], flipper);
    flippers.push({ node: flipper, side });
  }
  const tail = pivot([0, 0.05, 3.1]);
  add(sphere, 'back', [0, 0, 0.5], [0.35, 0.35, 0.9], [0, 0, 0], tail);
  add(flukes(2.6), 'back', [0, 0, 1.1], [1, 1, 1], [0, 0, 0], tail);
  group.userData.tail = tail;
  group.userData.flippers = flippers;
  return group;
}
export const animateWhale = (model, seconds) => {
  model.userData.tail.rotation.x = Math.sin(seconds * 1.1) * 0.25;
  model.userData.flippers.forEach(({ node, side }) => { node.rotation.z = side * Math.sin(seconds * 0.8) * 0.18; });
};

const SWORDFISH = { back: '#2f4f7a', belly: '#c9d4e3', fin: '#24406a', bill: '#3c5a86', eye: '#0f1621' };

/** A swordfish, about 3.4 long including its long, flat bill. Its tail sweeps quickly. */
export function createOceanSwordfish(water) {
  const { group, add, pivot } = kit('ocean-swordfish', water, SWORDFISH);
  add(sphere, 'back', [0, 0, 0], [0.32, 0.38, 1.25]);
  add(sphere, 'belly', [0, -0.12, -0.1], [0.27, 0.26, 1.1]);
  add(new THREE.CylinderGeometry(0.015, 0.09, 1.3, 8), 'bill', [0, 0.02, -1.75], [1.4, 1, 0.6], [-Math.PI / 2, 0, 0]);
  for (const side of [-1, 1]) {
    add(sphere, 'eye', [side * 0.22, 0.1, -0.95], [0.07, 0.07, 0.05]);
    add(fin(0.5, 0.5), 'fin', [side * 0.25, -0.2, -0.45], [1, 1, 1], [0, Math.PI / 2, side * 2.2]);
  }
  add(fin(0.6, 0.85), 'fin', [0, 0.3, -0.45], [1, 1, 1], [0, Math.PI / 2, 0]);
  const tail = pivot([0, 0, 1.15]);
  add(sphere, 'back', [0, 0, 0.12], [0.1, 0.12, 0.3], [0, 0, 0], tail);
  add(crescent(1.2), 'fin', [0, 0, 0.32], [1, 1, 1], [0, -Math.PI / 2, 0], tail);
  group.userData.tail = tail;
  return group;
}
export const animateSwordfish = (model, seconds) => { model.userData.tail.rotation.y = Math.sin(seconds * 5) * 0.3; };

const DOLPHIN = { back: '#7b8fa6', belly: '#e8edf1', fin: '#6c809a', eye: '#0f1621', smile: '#4b5c70' };

/** A bottlenose dolphin, about 2.6 long, with a short beak and a curved fin. Its flukes beat up and down. */
export function createOceanDolphin(water) {
  const { group, add, pivot } = kit('ocean-dolphin', water, DOLPHIN);
  add(sphere, 'back', [0, 0, 0], [0.4, 0.42, 1.15]);
  add(sphere, 'belly', [0, -0.14, -0.15], [0.33, 0.3, 1]);
  add(sphere, 'back', [0, 0.06, -1.0], [0.3, 0.3, 0.35]);
  add(sphere, 'belly', [0, -0.06, -1.35], [0.13, 0.1, 0.25]);
  add(sphere, 'smile', [0, -0.03, -1.35], [0.135, 0.02, 0.25]);
  for (const side of [-1, 1]) {
    add(sphere, 'eye', [side * 0.24, 0.1, -1.05], [0.045, 0.05, 0.04]);
    add(sphere, 'fin', [side * 0.42, -0.22, -0.45], [0.35, 0.04, 0.14], [0, side * -0.5, side * -0.4]);
  }
  add(fin(0.55, 0.5), 'fin', [0, 0.38, 0.05], [1, 1, 1], [0, Math.PI / 2, 0]);
  const tail = pivot([0, 0, 1.0]);
  add(sphere, 'back', [0, 0, 0.2], [0.14, 0.14, 0.4], [0, 0, 0], tail);
  add(flukes(0.95), 'fin', [0, 0, 0.5], [1, 1, 1], [0, 0, 0], tail);
  group.userData.tail = tail;
  return group;
}
export const animateDolphin = (model, seconds) => { model.userData.tail.rotation.x = Math.sin(seconds * 3.2) * 0.35; };

const OCTOPUS = { body: '#e4573d', spots: '#c2402b', suckers: '#ffd2b8', eye: '#1d2733', white: '#fff4ea' };

/** An octopus, about 2 across, with eight curling arms that wave as it swims. */
export function createOceanOctopus(water) {
  const { group, add, pivot } = kit('ocean-octopus', water, OCTOPUS);
  add(sphere, 'body', [0, 0.35, 0.25], [0.5, 0.6, 0.62], [-0.5, 0, 0]);
  for (const [x, y, z] of [[0.2, 0.7, 0.4], [-0.25, 0.55, 0.55], [0.1, 0.5, 0.75]]) add(sphere, 'spots', [x, y, z], [0.07, 0.07, 0.04]);
  for (const side of [-1, 1]) {
    add(sphere, 'white', [side * 0.22, 0.15, -0.28], [0.13, 0.13, 0.1]);
    add(sphere, 'eye', [side * 0.22, 0.15, -0.37], [0.06, 0.08, 0.04]);
  }
  const arms = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const arm = pivot([Math.cos(angle) * 0.3, -0.05, Math.sin(angle) * 0.3]);
    arm.rotation.y = -angle;
    for (let bead = 0; bead < 6; bead++) {
      const size = 0.13 - bead * 0.017;
      add(sphere, bead % 2 ? 'suckers' : 'body', [0.15 + bead * 0.17, -0.06 - bead * 0.05, 0], [size * 1.2, size, size], [0, 0, 0], arm);
    }
    arms.push({ node: arm, offset: i * 0.8 });
  }
  group.userData.arms = arms;
  return group;
}
export const animateOctopus = (model, seconds) => model.userData.arms.forEach(({ node, offset }) => { node.rotation.z = -0.25 + Math.sin(seconds * 2.2 + offset) * 0.3; });

const PUFFER = { body: '#f2c14e', belly: '#fff3cf', spots: '#7a5b2e', spine: '#a8741c', fin: '#ffd970', eye: '#1d2733', white: '#ffffff' };

/** A round, spiny pufferfish, about 1.2 long, with big eyes. It gently puffs as it swims. */
export function createOceanPufferfish(water) {
  const { group, add, pivot } = kit('ocean-pufferfish', water, PUFFER);
  const body = pivot([0, 0, 0]);
  add(sphere, 'body', [0, 0, 0], [0.5, 0.48, 0.55], [0, 0, 0], body);
  add(sphere, 'belly', [0, -0.18, -0.05], [0.42, 0.33, 0.45], [0, 0, 0], body);
  const spine = new THREE.ConeGeometry(0.05, 0.26, 5);
  for (let i = 0; i < 26; i++) {
    const y = 1 - (i + 0.5) / 13, ring = Math.sqrt(Math.max(0, 1 - y * y)), angle = i * 2.4;
    const direction = new THREE.Vector3(Math.cos(angle) * ring, y, Math.sin(angle) * ring);
    if (direction.z < -0.6) continue;
    const mesh = add(spine, 'spine', [direction.x * 0.56, direction.y * 0.54, direction.z * 0.6], [1, 1, 1], [0, 0, 0], body);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
  }
  for (const [x, y, z] of [[0.2, 0.3, 0.1], [-0.25, 0.25, 0.2], [0.05, 0.4, 0.25], [0.3, 0.1, 0.3]]) add(sphere, 'spots', [x, y, z], [0.05, 0.05, 0.05], [0, 0, 0], body);
  for (const side of [-1, 1]) {
    add(sphere, 'white', [side * 0.24, 0.15, -0.4], [0.13, 0.13, 0.08]);
    add(sphere, 'eye', [side * 0.25, 0.15, -0.47], [0.07, 0.07, 0.04]);
  }
  add(sphere, 'spots', [0, -0.05, -0.55], [0.07, 0.05, 0.04]);
  const tail = pivot([0, 0, 0.55]);
  add(new THREE.CircleGeometry(0.22, 12), 'fin', [0, 0, 0.15], [1, 1, 1], [0, Math.PI / 2, 0], tail);
  const fins = [];
  for (const side of [-1, 1]) {
    const finNode = pivot([side * 0.5, 0, -0.05]);
    add(new THREE.CircleGeometry(0.13, 10), 'fin', [side * 0.08, 0, 0], [1, 1, 1], [0, side * 0.5, 0], finNode);
    fins.push(finNode);
  }
  group.userData.body = body;
  group.userData.tail = tail;
  group.userData.fins = fins;
  return group;
}
export const animatePufferfish = (model, seconds) => {
  const { body, tail, fins } = model.userData;
  body.scale.setScalar(1 + Math.max(0, Math.sin(seconds * 0.5)) ** 8 * 0.25);
  tail.rotation.y = Math.sin(seconds * 6) * 0.4;
  fins.forEach((node, i) => { node.rotation.y = Math.sin(seconds * 12 + i * Math.PI) * 0.5; });
};

const JELLY = { bell: '#c9b6ff', rim: '#a58cf5', inner: '#ff9fd1', tentacle: '#e8dcff' };

/** A see-through moon-jelly-like jellyfish, about 1.6 wide. Its bell pulses and its tentacles trail and sway. */
export function createOceanJellyfish(water) {
  const { group, add, pivot } = kit('ocean-jellyfish', water, JELLY);
  const bell = pivot([0, 0.4, 0]);
  const dome = add(new THREE.SphereGeometry(0.8, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), 'bell', [0, 0, 0], [1, 0.75, 1], [0, 0, 0], bell);
  dome.material.transparent = true;
  dome.material.opacity = 0.65;
  dome.material.depthWrite = false;
  add(new THREE.TorusGeometry(0.78, 0.04, 6, 32), 'rim', [0, 0, 0], [1, 1, 1], [Math.PI / 2, 0, 0], bell);
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2;
    add(new THREE.TorusGeometry(0.12, 0.035, 6, 16), 'inner', [Math.cos(angle) * 0.25, 0.22, Math.sin(angle) * 0.25], [1, 1, 1], [Math.PI / 2, 0, 0], bell);
  }
  const tentacles = [];
  const strand = new THREE.CylinderGeometry(0.012, 0.02, 1.4, 5);
  strand.translate(0, -0.7, 0);
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const node = pivot([Math.cos(angle) * 0.7, 0.4, Math.sin(angle) * 0.7]);
    add(strand, 'tentacle', [0, 0, 0], [1, 0.8 + (i % 3) * 0.2, 1], [0, 0, 0], node);
    tentacles.push({ node, offset: i * 0.6 });
  }
  for (const side of [-1, 1]) add(new THREE.CylinderGeometry(0.06, 0.02, 0.9, 6), 'inner', [side * 0.12, -0.05, 0], [1, 1, 1], [0, 0, side * 0.15]);
  group.userData.bell = bell;
  group.userData.tentacles = tentacles;
  return group;
}
export const animateJellyfish = (model, seconds) => {
  const squeeze = Math.sin(seconds * 2.4);
  model.userData.bell.scale.set(1 - squeeze * 0.08, 1 + squeeze * 0.12, 1 - squeeze * 0.08);
  model.userData.tentacles.forEach(({ node, offset }) => {
    node.rotation.x = 0.25 + Math.sin(seconds * 1.6 + offset) * 0.15;
    node.rotation.z = Math.cos(seconds * 1.3 + offset) * 0.12;
  });
};
