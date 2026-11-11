import * as THREE from 'three';
import { marineMaterial, marineBody, taperedTube, sculptedFin } from './oceanModelDetail.js';
import { marineSpine, marineWave } from './oceanAnimalMotion.js';

// Habitat colours stay the same in both interface themes. Every model faces −Z and casts no shadow.
export const sphere = new THREE.SphereGeometry(1, 20, 14);
const detailSphere = new THREE.SphereGeometry(1, 10, 8);

export function kit(name, water, colours) {
  const group = new THREE.Group();
  group.name = name;
  const skin = name === 'ocean-fish' ? 'scales' : name === 'ocean-clownfish' ? 'clownfish'
    : name === 'ocean-shark' ? 'denticles' : name === 'ocean-eagle-ray' ? 'ray'
      : name === 'ocean-seahorse' || name === 'ocean-sea-turtle' ? 'armor'
        : name === 'ocean-octopus' ? 'cephalopod' : 'skin';
  const materials = Object.fromEntries(Object.entries(colours).map(([key, color]) => {
    const thin = ['fin', 'tentacle', 'bell', 'rim', 'inner'].includes(key);
    const material = key === 'eye'
      ? new THREE.MeshPhysicalMaterial({ color, roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.08 })
      : marineMaterial(water, color, {
        pattern: ['shell', 'pattern'].includes(key) ? 'shell' : key === 'fin' ? 'fin' : ['body', 'back', 'skin'].includes(key) ? skin : 'skin',
        belly: ['body', 'back'].includes(key) ? colours.belly : undefined,
        roughness: name === 'ocean-shark' ? 0.62 : name === 'ocean-dolphin' ? 0.32 : 0.46,
        tissue: thin ? 0.65 : name === 'ocean-octopus' ? 0.12 : 0,
        animal: true,
      });
    return [key, material];
  }));
  const add = (geometry, material, position, scale = [1, 1, 1], rotation = [0, 0, 0], parent = group) => {
    const detail = ['eye', 'gill', 'bump', 'stripe', 'spots', 'spine', 'white'].includes(material);
    const mesh = new THREE.Mesh(detail && geometry === sphere ? detailSphere : geometry, materials[material]);
    mesh.position.set(...position);
    mesh.scale.set(...scale);
    mesh.rotation.set(...rotation);
    mesh.receiveShadow = true;
    mesh.userData.marineDetail = detail;
    mesh.userData.followSpine = ['fin', 'flipper'].includes(material);
    parent.add(mesh);
    return mesh;
  };
  const pivot = (position, parent = group) => {
    const node = new THREE.Group();
    node.position.set(...position);
    parent.add(node);
    return node;
  };
  return { group, add, pivot, materials };
}

export const TAIL = (() => {
  const fan = new THREE.Shape();
  fan.moveTo(0, 0);
  fan.lineTo(0.32, 0.3);
  fan.quadraticCurveTo(0.25, 0, 0.32, -0.3);
  fan.lineTo(0, 0);
  return sculptedFin(fan);
})();

const CLOWN = { body: '#d87822', band: '#e7e1cd', fin: '#c6621d', eye: '#1d2733' };

/** A loose group of three small clownfish, about 1.4 across, as one swimming target. */
export function createOceanClownfish(water) {
  const { group, add, pivot } = kit('ocean-clownfish', water, CLOWN);
  const tails = [];
  const spines = [], fins = [];
  for (const [x, y, z, size] of [[0, 0, 0, 1], [0.75, 0.2, 0.7, 0.75], [-0.7, -0.15, 0.95, 0.7]]) {
    const fish = pivot([x, y, z]);
    fish.scale.setScalar(size);
    const body = add(marineBody([[-0.46, 0.1], [-0.3, 0.72], [-0.05, 1], [0.2, 0.72], [0.43, 0.12]], 0.2, 0.26), 'body', [0, 0, 0], [1, 1, 1], [0, 0, 0], fish);
    add(new THREE.CircleGeometry(0.32, 16, 0, Math.PI), 'fin', [0, 0.22, 0], [1, 0.5, 1], [0, Math.PI / 2, 0], fish);
    for (const side of [-1, 1]) add(sphere, 'eye', [side * 0.14, 0.08, -0.34], [0.045, 0.045, 0.04], [0, 0, 0], fish);
    const tail = pivot([0, 0, 0.42], fish);
    add(TAIL, 'fin', [0, 0, 0], [1, 1, 1], [0, -Math.PI / 2, 0], tail);
    tails.push(tail);
    spines.push(marineSpine(body, tail, { start: -0.16, end: 0.5, amplitude: 0.055, rate: 8, phase: tails.length * 1.7 }));
    for (const side of [-1, 1]) {
      const pectoral = pivot([side * 0.17, -0.05, -0.15], fish);
      add(sphere, 'fin', [side * 0.08, 0, 0.025], [0.11, 0.018, 0.09], [0, 0, 0], pectoral);
      fins.push({ node: pectoral, side, phase: tails.length * 1.7 });
    }
  }
  group.userData.tails = tails;
  group.userData.spines = spines;
  group.userData.fins = fins;
  return group;
}
export const animateClownfish = (model, seconds) => {
  model.userData.spines.forEach((swim) => swim(seconds));
  model.userData.fins.forEach(({ node, side, phase }) => { node.rotation.y = side * (0.25 + Math.sin(seconds * 10 + phase) * 0.25); });
};

const TURTLE = { shell: '#68744d', pattern: '#4a583a', skin: '#9ba679', belly: '#cfc7a1', eye: '#1d2733' };

/** A green sea turtle, about 2.6 long. Its front flippers flap. */
export function createOceanTurtle(water) {
  const { group, add, pivot } = kit('ocean-sea-turtle', water, TURTLE);
  add(sphere, 'shell', [0, 0.12, 0.1], [0.85, 0.4, 1.1]);
  // Separate scutes follow the curved carapace, leaving narrow natural seams.
  const scute = new THREE.SphereGeometry(1, 6, 8);
  for (let row = -1; row <= 1; row++) {
    for (let column = -1; column <= 1; column++) {
      const x = column * 0.4, z = 0.1 + row * 0.5;
      const y = 0.12 + 0.4 * Math.sqrt(Math.max(0, 1 - (x / 0.85) ** 2 - ((z - 0.1) / 1.1) ** 2));
      add(scute, (row + column) % 2 ? 'shell' : 'pattern', [x, y - 0.015, z], [0.255, 0.055, 0.32], [row * 0.25, 0, -column * 0.25]);
    }
  }
  add(sphere, 'belly', [0, -0.12, 0.1], [0.72, 0.2, 0.98]);
  add(sphere, 'skin', [0, 0.05, -1.2], [0.28, 0.24, 0.34]);
  for (const side of [-1, 1]) add(sphere, 'eye', [side * 0.2, 0.12, -1.4], [0.035, 0.035, 0.03]);
  const flippers = [];
  const rearFlippers = [];
  const flipperShape = new THREE.Shape();
  flipperShape.moveTo(0, 0);
  flipperShape.quadraticCurveTo(0.55, -0.3, 1.18, 0.25);
  flipperShape.quadraticCurveTo(0.68, 0.2, 0.08, 0.2);
  flipperShape.closePath();
  const flipperGeometry = sculptedFin(flipperShape);
  flipperGeometry.rotateX(Math.PI / 2);
  for (const side of [-1, 1]) {
    const front = pivot([side * 0.7, -0.02, -0.5]);
    const blade = add(flipperGeometry, 'skin', [0, 0, 0], [side, 1, 1], [0, 0, 0], front);
    const flex = marineWave(blade, { along: 'x', axis: 'y', start: 0, end: 1.18, amplitude: 0.08, rate: 1.8, phase: -0.8 });
    flippers.push({ node: front, side, flex });
    const back = pivot([side * 0.5, -0.02, 0.95]);
    add(sphere, 'skin', [side * 0.22, 0, 0.1], [0.28, 0.05, 0.16], [0, side * 0.5, 0], back);
    rearFlippers.push({ node: back, side });
  }
  add(sphere, 'skin', [0, 0.05, 1.18], [0.06, 0.05, 0.2]);
  group.userData.flippers = flippers;
  group.userData.rearFlippers = rearFlippers;
  return group;
}
export const animateTurtle = (model, seconds) => {
  model.userData.flippers.forEach(({ node, side, flex }) => {
    node.rotation.z = side * (Math.sin(seconds * 1.8) * 0.34 - 0.08);
    node.rotation.y = side * Math.cos(seconds * 1.8) * 0.1;
    flex.update(seconds);
  });
  model.userData.rearFlippers.forEach(({ node, side }) => { node.rotation.z = side * Math.sin(seconds * 1.8 - 1.1) * 0.08; });
};

const RAY_WING_GEOMETRY = (() => {
  const geometry = new THREE.PlaneGeometry(1, 1, 12, 12);
  const wingPositions = geometry.attributes.position;
  for (let i = 0; i < wingPositions.count; i++) {
    const u = wingPositions.getX(i) + 0.5, v = wingPositions.getY(i) + 0.5;
    const chord = (1 - u) ** 0.8;
    wingPositions.setXYZ(i, u * 1.25, Math.sin(v * Math.PI) * Math.sin(u * Math.PI) * 0.065, 0.22 * u + (v - 0.5) * 1.25 * chord);
  }
  geometry.computeVertexNormals();
  return geometry;
})();

const RAY = { back: '#3c4a63', belly: '#e8eef2', spot: '#f4f6ee', eye: '#0f1621' };

/** A spotted eagle ray, about 3 across. Its wings ripple. */
export function createOceanRay(water) {
  const { group, add, pivot } = kit('ocean-eagle-ray', water, RAY);
  add(sphere, 'back', [0, 0, 0], [0.5, 0.15, 0.7]);
  add(sphere, 'belly', [0, -0.1, 0], [0.42, 0.09, 0.6]);
  add(sphere, 'back', [0, 0.04, -0.72], [0.28, 0.14, 0.32]);
  add(sphere, 'belly', [0, -0.12, -0.9], [0.18, 0.05, 0.16]);
  for (const side of [-1, 1]) add(sphere, 'eye', [side * 0.2, 0.08, -0.82], [0.045, 0.045, 0.04]);
  add(taperedTube([[0, 0, 0.55], [0, -0.01, 1.2], [0.04, -0.06, 1.9], [0.12, -0.1, 2.65]], 0.04, 28, 0.1), 'back', [0, 0, 0]);
  const wings = [];
  // A swept, pointed disc rather than two oval paddles.
  for (const side of [-1, 1]) {
    const wing = pivot([side * 0.45, 0, 0.05]);
    const top = add(RAY_WING_GEOMETRY, 'back', [0, 0, 0], [side, 1, 1], [0, 0, 0], wing);
    const bottom = add(RAY_WING_GEOMETRY, 'belly', [0, -0.018, 0], [side, 1, 1], [0, 0, 0], wing);
    const flex = [top, bottom].map((mesh) => marineWave(mesh, { along: 'x', axis: 'y', start: 0, end: 1.25, amplitude: 0.32, rate: 2.2, wavelength: 1.7 }));
    wings.push({ node: wing, side, flex });
  }
  group.userData.wings = wings;
  return group;
}
export const animateRay = (model, seconds) => model.userData.wings.forEach(({ node, side, flex }) => {
  node.rotation.z = side * Math.sin(seconds * 2.2) * 0.06;
  flex.forEach((wave) => wave.update(seconds));
});

const SEAHORSE = { body: '#b28c4e', dark: '#79643c', fin: '#c8b47d', eye: '#1d2733' };

/** An upright seahorse, about 2 tall, with a long snout, a curled tail and a fluttering fin. */
export function createOceanSeahorse(water) {
  const { group, add, pivot } = kit('ocean-seahorse', water, SEAHORSE);
  group.scale.setScalar(1.6);
  add(sphere, 'body', [0, 0, 0], [0.17, 0.32, 0.16]);
  add(sphere, 'dark', [0, -0.1, -0.1], [0.14, 0.2, 0.1]);
  add(taperedTube([[0, 0.1, 0.05], [0, 0.23, 0.02], [0, 0.34, -0.04], [0, 0.4, -0.1]], 0.12, 24, 0.8), 'body', [0, 0, 0]);
  add(sphere, 'body', [0, 0.4, -0.1], [0.14, 0.14, 0.17], [0.4, 0, 0]);
  add(new THREE.CylinderGeometry(0.03, 0.05, 0.42, 8), 'dark', [0, 0.32, -0.4], [1, 1, 1], [Math.PI / 2 + 0.55, 0, 0]);
  for (const side of [-1, 1]) add(sphere, 'eye', [side * 0.1, 0.46, -0.16], [0.035, 0.035, 0.03]);
  for (const [y, size] of [[0.56, 0.06], [0.45, 0.07], [0.33, 0.07], [0.2, 0.07]]) add(sphere, 'dark', [0, y, 0.12], [0.035, size, 0.06]);
  const curl = Array.from({ length: 17 }, (_, i) => {
    const angle = i / 16 * Math.PI * 1.8, radius = 0.28 * (1 - i / 22);
    return [0, -0.35 - Math.sin(angle) * radius, 0.25 - Math.cos(angle) * radius];
  });
  const tail = add(taperedTube(curl, 0.1, 32), 'body', [0, 0, 0]);
  group.userData.tailFlex = marineWave(tail, { along: 'y', axis: 'x', start: -0.25, end: -0.65, amplitude: 0.035, rate: 1.3 });
  const fin = pivot([0, 0.05, 0.16]);
  add(new THREE.CircleGeometry(0.2, 14, 0, Math.PI), 'fin', [0, 0, 0], [1, 1, 1], [0, Math.PI / 2, Math.PI / 2], fin);
  group.userData.fin = fin;
  return group;
}
export const animateSeahorse = (model, seconds) => {
  model.userData.fin.rotation.y = Math.sin(seconds * 22) * 0.22;
  model.userData.tailFlex.update(seconds);
};
