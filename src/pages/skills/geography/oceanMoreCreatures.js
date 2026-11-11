import * as THREE from 'three';
import { kit, sphere } from './oceanCreatures.js';
import { marineBody, taperedTube, sculptedFin } from './oceanModelDetail.js';
import { marineSpine, marineWave } from './oceanAnimalMotion.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// Original anatomical models. Habitat colours stay the same in both themes; every model faces −Z.

/** A crescent tail fin standing upright (fish and sharks), `size` tall, trailing towards +Z. */
function crescent(size) {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.quadraticCurveTo(size * 0.35, size * 0.25, size * 0.55, size * 0.6);
  shape.quadraticCurveTo(size * 0.3, size * 0.1, size * 0.45, -size * 0.45);
  shape.quadraticCurveTo(size * 0.25, -size * 0.15, 0, 0);
  return sculptedFin(shape);
}

/** A triangular fin, `width` along the body and `height` tall, its back edge curving. */
function fin(width, height) {
  const shape = new THREE.Shape();
  shape.moveTo(-width / 2, 0);
  shape.quadraticCurveTo(-width * 0.45, height * 0.4, -width * 0.3, height);
  shape.quadraticCurveTo(0, height * 0.35, width / 2, 0);
  shape.lineTo(-width / 2, 0);
  return sculptedFin(shape);
}

/** Flat flukes spreading sideways, for whales and dolphins, trailing towards +Z. */
function flukes(span) {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.quadraticCurveTo(span * 0.3, span * 0.05, span * 0.5, span * 0.35);
  shape.quadraticCurveTo(span * 0.2, span * 0.3, 0, span * 0.22);
  shape.quadraticCurveTo(-span * 0.2, span * 0.3, -span * 0.5, span * 0.35);
  shape.quadraticCurveTo(-span * 0.3, span * 0.05, 0, 0);
  const geometry = sculptedFin(shape);
  geometry.rotateX(Math.PI / 2);
  return geometry;
}

const SHARK = { back: '#6a7f88', belly: '#cad5d0', fin: '#566d79', gill: '#344d55', eye: '#11161d' };

/** A reef shark, about 3.4 long. Its tail sweeps from side to side. */
export function createOceanShark(water) {
  const { group, add, pivot } = kit('ocean-shark', water, SHARK);
  const body = add(marineBody([[-1.86, 0.02], [-1.65, 0.38], [-1.15, 0.85], [-0.45, 1], [0.4, 0.78], [1.15, 0.35], [1.7, 0.08]], 0.42, 0.42), 'back', [0, 0, 0]);
  for (const side of [-1, 1]) {
    add(sphere, 'eye', [side * 0.255, 0.06, -1.4], [0.032, 0.032, 0.035]);
    for (let slit = 0; slit < 5; slit++) {
      add(taperedTube([[side * 0.35, 0.15, -0.85 + slit * 0.085], [side * 0.4, 0, -0.88 + slit * 0.085], [side * 0.35, -0.17, -0.82 + slit * 0.085]], 0.009, 8, 0.6), 'gill', [0, 0, 0]);
    }
    add(fin(0.7, 0.75), 'fin', [side * 0.3, -0.2, -0.35], [1, 1, 1], [0, Math.PI / 2, side * 2.1]);
    add(taperedTube([[0, -0.12, -1.8], [side * 0.19, -0.19, -1.57], [side * 0.25, -0.17, -1.35]], 0.006, 10, 0.5), 'gill', [0, 0, 0]);
  }
  add(fin(0.8, 0.75), 'fin', [0, 0.36, -0.1], [1, 1, 1], [0, Math.PI / 2, 0]);
  add(fin(0.35, 0.24), 'fin', [0, 0.21, 0.95], [1, 1, 1], [0, Math.PI / 2, 0]);
  const tail = pivot([0, 0, 1.5]);
  add(sphere, 'back', [0, 0, 0.15], [0.16, 0.18, 0.4], [0, 0, 0], tail);
  add(crescent(1.1), 'fin', [0, 0, 0.4], [1, 1, 1], [0, -Math.PI / 2, 0], tail);
  group.userData.tail = tail;
  group.userData.spine = marineSpine(body, tail, { start: -0.65, end: 1.75, amplitude: 0.22, rate: 3, wavelength: 2.5 });
  return group;
}
export const animateShark = (model, seconds) => model.userData.spine(seconds);

const WHALE = { back: '#304651', belly: '#c1cbc8', flipper: '#cfd5cf', eye: '#0f1621', bump: '#253942' };

/** A humpback whale, about 7.5 long, with long white flippers. Its flukes beat slowly up and down. */
export function createOceanWhale(water) {
  const { group, add, pivot } = kit('ocean-whale', water, WHALE);
  const body = add(marineBody([[-3.4, 0.05], [-3.1, 0.52], [-2.3, 0.9], [-1.25, 1], [0.2, 0.86], [1.65, 0.48], [3.2, 0.08]], 1.25, 1.1), 'back', [0, 0, 0]);
  // Long ventral grooves and a low mouth line, rather than a separate white ellipsoid.
  for (let i = -4; i <= 4; i++) {
    const x = i * 0.14;
    const curve = Math.sqrt(1 - (x / 1.2) ** 2);
    add(taperedTube([[x * 0.35, -0.7, -2.9], [x, -1.075 * curve, -1.9], [x, -1.1 * curve, -0.9], [x * 0.7, -0.95 * curve, 0.2]], 0.012, 18, 0.4), 'bump', [0, 0, 0]);
  }
  for (const side of [-1, 1]) add(taperedTube([[0, -0.03, -3.38], [side * 0.75, -0.38, -2.7], [side * 1.18, -0.3, -1.7]], 0.015, 18, 0.5), 'bump', [0, 0, 0]);
  // A humpback has paired blowholes; the dark recesses remain gently modelled.
  for (const side of [-1, 1]) add(sphere, 'bump', [side * 0.065, 1.095, -1.4], [0.042, 0.018, 0.13], [0, side * 0.2, 0]);
  for (const [x, y, z] of [[0, 0.67, -2.9], [0.3, 0.87, -2.5], [-0.3, 0.87, -2.5], [0, 1, -2.1]]) add(sphere, 'bump', [x, y, z], [0.1, 0.05, 0.1]);
  add(fin(0.7, 0.35), 'back', [0, 0.98, 1.2], [1, 1, 1], [0, Math.PI / 2, 0]).userData.followSpine = true;
  const flippers = [];
  const flipperShape = new THREE.Shape();
  flipperShape.moveTo(0, 0);
  flipperShape.bezierCurveTo(0.6, -0.28, 1.9, -0.15, 2.55, 0.65);
  flipperShape.quadraticCurveTo(2.3, 0.85, 1.65, 0.55);
  flipperShape.quadraticCurveTo(0.75, 0.45, 0, 0.15);
  flipperShape.closePath();
  const flipperGeometry = sculptedFin(flipperShape);
  flipperGeometry.rotateX(Math.PI / 2);
  for (const side of [-1, 1]) {
    add(sphere, 'eye', [side * 1.15, -0.15, -2.1], [0.055, 0.055, 0.05]);
    const flipper = pivot([side * 1.05, -0.4, -1.1]);
    const blade = add(flipperGeometry, 'flipper', [0, 0, 0], [side, 1, 1], [0, 0, 0], flipper);
    const flex = marineWave(blade, { along: 'x', axis: 'y', start: 0, end: 2.55, amplitude: 0.08, rate: 0.8, phase: -0.9 });
    flippers.push({ node: flipper, side, flex });
  }
  const tail = pivot([0, 0.05, 3.1]);
  add(sphere, 'back', [0, 0, 0.5], [0.35, 0.35, 0.9], [0, 0, 0], tail);
  add(flukes(2.6), 'back', [0, 0, 1.1], [1, 1, 1], [0, 0, 0], tail);
  group.userData.tail = tail;
  group.userData.spine = marineSpine(body, tail, { axis: 'y', start: -0.4, end: 3.3, amplitude: 0.3, rate: 1.1, wavelength: 1.8 });
  group.userData.flippers = flippers;
  return group;
}
export const animateWhale = (model, seconds) => {
  model.userData.spine(seconds);
  model.userData.flippers.forEach(({ node, side, flex }) => {
    node.rotation.z = side * Math.sin(seconds * 0.8) * 0.13;
    flex.update(seconds);
  });
};

const SWORDFISH = { back: '#2f4f7a', belly: '#c9d4e3', fin: '#24406a', bill: '#3c5a86', eye: '#0f1621' };

/** A swordfish, about 3.4 long including its long, flat bill. Its tail sweeps quickly. */
export function createOceanSwordfish(water) {
  const { group, add, pivot } = kit('ocean-swordfish', water, SWORDFISH);
  const body = add(marineBody([[-1.25, 0.1], [-0.92, 0.7], [-0.4, 1], [0.35, 0.75], [0.9, 0.3], [1.25, 0.06]], 0.32, 0.38), 'back', [0, 0, 0]);
  add(new THREE.CylinderGeometry(0.015, 0.09, 1.3, 8), 'bill', [0, 0.02, -1.75], [1.4, 1, 0.6], [-Math.PI / 2, 0, 0]);
  for (const side of [-1, 1]) {
    add(sphere, 'eye', [side * 0.22, 0.1, -0.95], [0.07, 0.07, 0.05]);
    add(taperedTube([[side * 0.22, 0.2, -0.67], [side * 0.28, 0, -0.65], [side * 0.2, -0.19, -0.61]], 0.008, 12, 0.6), 'bill', [0, 0, 0]);
    add(fin(0.5, 0.5), 'fin', [side * 0.25, -0.2, -0.45], [1, 1, 1], [0, Math.PI / 2, side * 2.2]);
  }
  add(fin(0.6, 0.85), 'fin', [0, 0.3, -0.45], [1, 1, 1], [0, Math.PI / 2, 0]);
  const tail = pivot([0, 0, 1.15]);
  add(sphere, 'back', [0, 0, 0.12], [0.1, 0.12, 0.3], [0, 0, 0], tail);
  add(crescent(1.2), 'fin', [0, 0, 0.32], [1, 1, 1], [0, -Math.PI / 2, 0], tail);
  group.userData.tail = tail;
  group.userData.spine = marineSpine(body, tail, { start: -0.35, end: 1.3, amplitude: 0.13, rate: 5, wavelength: 2.4 });
  return group;
}
export const animateSwordfish = (model, seconds) => model.userData.spine(seconds);

const DOLPHIN = { back: '#778d94', belly: '#cdd8d6', fin: '#647e88', eye: '#0f1621', smile: '#3e5961' };

/** A bottlenose dolphin, about 2.6 long, with a short beak and a curved fin. Its flukes beat up and down. */
export function createOceanDolphin(water) {
  const { group, add, pivot } = kit('ocean-dolphin', water, DOLPHIN);
  const body = add(marineBody([[-1.25, 0.08], [-1.08, 0.63], [-0.65, 0.98], [-0.1, 1], [0.5, 0.66], [1, 0.2], [1.35, 0.05]], 0.4, 0.42), 'back', [0, 0, 0]);
  add(sphere, 'back', [0, 0.08, -1.06], [0.23, 0.24, 0.25]);
  add(sphere, 'belly', [0, -0.06, -1.35], [0.13, 0.1, 0.25]);
  add(sphere, 'smile', [0, -0.03, -1.35], [0.135, 0.02, 0.25]);
  add(sphere, 'smile', [0, 0.38, -0.66], [0.065, 0.014, 0.09]);
  for (const side of [-1, 1]) {
    add(sphere, 'eye', [side * 0.24, 0.1, -1.05], [0.045, 0.05, 0.04]);
    add(sphere, 'fin', [side * 0.42, -0.22, -0.45], [0.35, 0.04, 0.14], [0, side * -0.5, side * -0.4]);
  }
  add(fin(0.55, 0.5), 'fin', [0, 0.38, 0.05], [1, 1, 1], [0, Math.PI / 2, 0]);
  const tail = pivot([0, 0, 1.0]);
  add(sphere, 'back', [0, 0, 0.2], [0.14, 0.14, 0.4], [0, 0, 0], tail);
  add(flukes(0.95), 'fin', [0, 0, 0.5], [1, 1, 1], [0, 0, 0], tail);
  group.userData.tail = tail;
  group.userData.spine = marineSpine(body, tail, { axis: 'y', start: -0.3, end: 1.4, amplitude: 0.15, rate: 3.2, wavelength: 2.2 });
  return group;
}
export const animateDolphin = (model, seconds) => model.userData.spine(seconds);

const OCTOPUS_ARM_GEOMETRY = taperedTube([[0, 0, 0], [0.32, -0.13, 0], [0.68, -0.26, 0.04], [0.95, -0.16, 0.12], [1.04, 0.05, 0.17], [0.94, 0.16, 0.18]], 0.14, 24);
const OCTOPUS_SUCKER_GEOMETRY = (() => {
  const suckerGeometry = new THREE.TorusGeometry(0.032, 0.009, 5, 10);
  const suckerTransform = new THREE.Object3D();
  const cups = [];
  for (let sucker = 0; sucker < 5; sucker++) {
    for (const side of [-1, 1]) {
      const x = 0.13 + sucker * 0.14, y = -0.12 - sucker * 0.045;
      suckerTransform.position.set(x, y, side * 0.045);
      suckerTransform.rotation.set(Math.PI / 2, 0, 0);
      suckerTransform.scale.setScalar(1 - sucker * 0.09);
      suckerTransform.updateMatrix();
      cups.push(suckerGeometry.clone().applyMatrix4(suckerTransform.matrix));
    }
  }
  const merged = mergeGeometries(cups);
  cups.forEach((geometry) => geometry.dispose());
  return merged;
})();

const OCTOPUS = { body: '#ad674c', spots: '#754935', suckers: '#d7b296', eye: '#192521', white: '#ae9c76' };

/** An octopus, about 2 across, with eight curling arms that wave as it swims. */
export function createOceanOctopus(water) {
  const { group, add, pivot, materials } = kit('ocean-octopus', water, OCTOPUS);
  add(sphere, 'body', [0, 0.35, 0.25], [0.5, 0.6, 0.62], [-0.5, 0, 0]);
  for (const [x, y, z] of [[0.2, 0.7, 0.4], [-0.25, 0.55, 0.55], [0.1, 0.5, 0.75]]) add(sphere, 'spots', [x, y, z], [0.07, 0.07, 0.04]);
  for (const side of [-1, 1]) {
    add(sphere, 'white', [side * 0.3, 0.15, -0.28], [0.1, 0.1, 0.08]);
    add(sphere, 'eye', [side * 0.32, 0.15, -0.345], [0.065, 0.025, 0.035]);
  }
  const arms = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const arm = pivot([Math.cos(angle) * 0.3, -0.05, Math.sin(angle) * 0.3]);
    arm.rotation.y = -angle;
    const limb = add(OCTOPUS_ARM_GEOMETRY, 'body', [0, 0, 0], [1, 1, 1], [0, 0, 0], arm);
    // Cups share the arm's deformation and immutable geometry.
    const suckers = new THREE.Mesh(OCTOPUS_SUCKER_GEOMETRY, materials.suckers);
    suckers.userData.marineDetail = true;
    arm.add(suckers);
    const flex = [limb, suckers].map((mesh) => marineWave(mesh, { along: 'x', axis: 'y', start: 0, end: 1.05, amplitude: 0.14, rate: 1.8, phase: i * 0.8, wavelength: 3.2 }));
    arms.push({ node: arm, offset: i * 0.8, flex });
  }
  group.userData.arms = arms;
  return group;
}
export const animateOctopus = (model, seconds) => model.userData.arms.forEach(({ node, offset, flex }) => {
  node.rotation.z = -0.12 + Math.sin(seconds * 1.8 + offset) * 0.16;
  flex.forEach((wave) => wave.update(seconds));
});

const PUFFER = { body: '#b39a62', belly: '#e0d8b8', spots: '#5f563e', spine: '#8c7952', fin: '#c8b77d', eye: '#1d2733', white: '#aeac83' };

/** A resting porcupinefish: tiny body motion, not repeated defensive inflation. */
export function createOceanPufferfish(water) {
  const { group, add, pivot } = kit('ocean-pufferfish', water, PUFFER);
  const body = pivot([0, 0, 0]);
  add(sphere, 'body', [0, 0, 0], [0.5, 0.48, 0.55], [0, 0, 0], body);
  add(sphere, 'belly', [0, -0.18, -0.05], [0.42, 0.33, 0.45], [0, 0, 0], body);
  const spine = new THREE.ConeGeometry(0.028, 0.16, 5);
  for (let i = 0; i < 26; i++) {
    const y = 1 - (i + 0.5) / 13, ring = Math.sqrt(Math.max(0, 1 - y * y)), angle = i * 2.4;
    const direction = new THREE.Vector3(Math.cos(angle) * ring, y, Math.sin(angle) * ring);
    if (direction.z < -0.6) continue;
    const mesh = add(spine, 'spine', [direction.x * 0.56, direction.y * 0.54, direction.z * 0.6], [1, 1, 1], [0, 0, 0], body);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
  }
  for (const [x, y, z] of [[0.2, 0.3, 0.1], [-0.25, 0.25, 0.2], [0.05, 0.4, 0.25], [0.3, 0.1, 0.3]]) add(sphere, 'spots', [x, y, z], [0.05, 0.05, 0.05], [0, 0, 0], body);
  for (const side of [-1, 1]) {
    add(sphere, 'white', [side * 0.24, 0.15, -0.4], [0.09, 0.09, 0.065]);
    add(sphere, 'eye', [side * 0.25, 0.15, -0.455], [0.05, 0.05, 0.03]);
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
  body.scale.setScalar(1 + Math.sin(seconds * 1.2) * 0.012);
  tail.rotation.y = Math.sin(seconds * 6) * 0.4;
  fins.forEach((node, i) => { node.rotation.y = Math.sin(seconds * 12 + i * Math.PI) * 0.5; });
};

const JELLY_STRAND_GEOMETRY = taperedTube([[0, 0, 0], [0.06, -0.3, 0.06], [-0.04, -0.7, 0.13], [0.1, -1.1, 0.2], [0.03, -1.4, 0.26]], 0.016, 20, 0.2);
const JELLY_ORAL_GEOMETRY = taperedTube([[0, 0, 0], [0.1, -0.3, 0.06], [0.02, -0.6, 0.16], [0.16, -0.9, 0.22]], 0.065, 16, 0.12);

const JELLY = { bell: '#c3d8dc', rim: '#a8c7cf', inner: '#c9abb9', tentacle: '#bcd1d5' };

/** A see-through moon-jelly-like jellyfish, about 1.6 wide. Its bell pulses and its tentacles trail and sway. */
export function createOceanJellyfish(water) {
  const { group, add, pivot, materials } = kit('ocean-jellyfish', water, JELLY);
  const bell = pivot([0, 0.4, 0]);
  const dome = add(new THREE.SphereGeometry(0.8, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), 'bell', [0, 0, 0], [1, 0.75, 1], [0, 0, 0], bell);
  dome.material.transparent = true;
  dome.material.opacity = 0.32;
  dome.material.roughness = 0.15;
  dome.material.depthWrite = false;
  add(new THREE.TorusGeometry(0.78, 0.04, 6, 32), 'rim', [0, 0, 0], [1, 1, 1], [Math.PI / 2, 0, 0], bell);
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2;
    add(new THREE.TorusGeometry(0.12, 0.035, 6, 16), 'inner', [Math.cos(angle) * 0.25, 0.22, Math.sin(angle) * 0.25], [1, 1, 1], [Math.PI / 2, 0, 0], bell);
  }
  const tentacles = [];
  const oralArms = [];
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const node = pivot([Math.cos(angle) * 0.7, 0.4, Math.sin(angle) * 0.7]);
    const strandMesh = add(JELLY_STRAND_GEOMETRY, 'tentacle', [0, 0, 0], [1, 0.8 + (i % 3) * 0.2, 1], [0, 0, 0], node);
    const flex = marineWave(strandMesh, { along: 'y', axis: 'x', start: 0, end: -1.4, amplitude: 0.14, rate: 2.4, phase: i * 0.3 - 1.1, wavelength: 2.7 });
    tentacles.push({ node, offset: i * 0.6, angle, flex });
  }
  for (let i = 0; i < 4; i++) {
    const angle = i * Math.PI / 2;
    const arm = add(JELLY_ORAL_GEOMETRY, 'inner', [Math.cos(angle) * 0.13, 0.3, Math.sin(angle) * 0.13], [1, 1, 1], [0, angle, 0]);
    oralArms.push(marineWave(arm, { along: 'y', axis: 'x', start: 0, end: -0.9, amplitude: 0.1, rate: 2.4, phase: -0.9 + i * 0.4 }));
  }
  for (const key of ['rim', 'inner', 'tentacle']) {
    materials[key].transparent = true;
    materials[key].opacity = key === 'inner' ? 0.55 : 0.38;
    materials[key].depthWrite = false;
  }
  group.userData.bell = bell;
  group.userData.tentacles = tentacles;
  group.userData.oralArms = oralArms;
  return group;
}
export const animateJellyfish = (model, seconds) => {
  // A fast contraction and gentler release; tentacles lag the bell's pulse.
  const squeeze = Math.sin(seconds * 2.4) * 0.72 + Math.sin(seconds * 4.8) * 0.18;
  model.userData.bell.scale.set(1 - squeeze * 0.08, 1 + squeeze * 0.12, 1 - squeeze * 0.08);
  model.userData.tentacles.forEach(({ node, offset, angle, flex }) => {
    const radius = 0.7 * (1 - squeeze * 0.08);
    node.position.set(Math.cos(angle) * radius, 0.4, Math.sin(angle) * radius);
    node.rotation.x = 0.12 + Math.sin(seconds * 1.6 + offset) * 0.08;
    node.rotation.z = Math.cos(seconds * 1.3 + offset) * 0.07;
    flex.update(seconds);
  });
  model.userData.oralArms.forEach((wave) => wave.update(seconds));
};
