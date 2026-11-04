import * as THREE from 'three';

// Habitat colours stay the same in both interface themes. Every model faces −Z and casts no shadow.
export const sphere = new THREE.SphereGeometry(1, 20, 14);

export function kit(name, water, colours) {
  const group = new THREE.Group();
  group.name = name;
  const materials = Object.fromEntries(Object.entries(colours).map(([key, color]) => {
    const material = new THREE.MeshStandardMaterial({ color, roughness: key === 'eye' ? 0.3 : 0.6, side: THREE.DoubleSide });
    if (key !== 'eye') water?.addCaustics(material);
    return [key, material];
  }));
  const add = (geometry, material, position, scale = [1, 1, 1], rotation = [0, 0, 0], parent = group) => {
    const mesh = new THREE.Mesh(geometry, materials[material]);
    mesh.position.set(...position);
    mesh.scale.set(...scale);
    mesh.rotation.set(...rotation);
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  };
  const pivot = (position, parent = group) => {
    const node = new THREE.Group();
    node.position.set(...position);
    parent.add(node);
    return node;
  };
  return { group, add, pivot };
}

export const TAIL = (() => {
  const fan = new THREE.Shape();
  fan.moveTo(0, 0);
  fan.lineTo(0.32, 0.3);
  fan.quadraticCurveTo(0.25, 0, 0.32, -0.3);
  fan.lineTo(0, 0);
  return new THREE.ShapeGeometry(fan, 8);
})();

const CLOWN = { body: '#ff8a1f', band: '#fff6e8', fin: '#ff6a00', eye: '#1d2733' };

/** A loose group of three small clownfish, about 1.4 across, as one swimming target. */
export function createOceanClownfish(water) {
  const { group, add, pivot } = kit('ocean-clownfish', water, CLOWN);
  const tails = [];
  for (const [x, y, z, size] of [[0, 0, 0, 1], [0.75, 0.2, 0.7, 0.75], [-0.7, -0.15, 0.95, 0.7]]) {
    const fish = pivot([x, y, z]);
    fish.scale.setScalar(size);
    add(sphere, 'body', [0, 0, 0], [0.2, 0.26, 0.45], [0, 0, 0], fish);
    add(sphere, 'band', [0, 0, -0.17], [0.215, 0.27, 0.07], [0, 0, 0], fish);
    add(sphere, 'band', [0, 0, 0.2], [0.205, 0.26, 0.06], [0, 0, 0], fish);
    add(new THREE.CircleGeometry(0.32, 16, 0, Math.PI), 'fin', [0, 0.22, 0], [1, 0.5, 1], [0, Math.PI / 2, 0], fish);
    for (const side of [-1, 1]) add(sphere, 'eye', [side * 0.14, 0.08, -0.34], [0.045, 0.045, 0.04], [0, 0, 0], fish);
    const tail = pivot([0, 0, 0.42], fish);
    add(TAIL, 'fin', [0, 0, 0], [1, 1, 1], [0, -Math.PI / 2, 0], tail);
    tails.push(tail);
  }
  group.userData.tails = tails;
  return group;
}
export const animateClownfish = (model, seconds) => model.userData.tails.forEach((tail, i) => { tail.rotation.y = Math.sin(seconds * 9 + i * 1.7) * 0.45; });

const TURTLE = { shell: '#6f8f4e', pattern: '#4d6b3a', skin: '#b8c78a', belly: '#e9e2b8', eye: '#1d2733' };

/** A green sea turtle, about 2.6 long. Its front flippers flap. */
export function createOceanTurtle(water) {
  const { group, add, pivot } = kit('ocean-sea-turtle', water, TURTLE);
  add(sphere, 'shell', [0, 0.12, 0.1], [0.85, 0.4, 1.1]);
  add(sphere, 'pattern', [0, 0.3, 0.1], [0.55, 0.2, 0.75]);
  add(sphere, 'belly', [0, -0.12, 0.1], [0.72, 0.2, 0.98]);
  add(sphere, 'skin', [0, 0.05, -1.2], [0.28, 0.24, 0.34]);
  for (const side of [-1, 1]) add(sphere, 'eye', [side * 0.17, 0.12, -1.42], [0.05, 0.05, 0.04]);
  const flippers = [];
  for (const side of [-1, 1]) {
    const front = pivot([side * 0.7, -0.02, -0.5]);
    add(sphere, 'skin', [side * 0.55, 0, 0], [0.62, 0.06, 0.26], [0, side * -0.35, 0], front);
    flippers.push({ node: front, side });
    const back = pivot([side * 0.5, -0.02, 0.95]);
    add(sphere, 'skin', [side * 0.22, 0, 0.1], [0.28, 0.05, 0.16], [0, side * 0.5, 0], back);
  }
  add(sphere, 'skin', [0, 0.05, 1.18], [0.06, 0.05, 0.2]);
  group.userData.flippers = flippers;
  return group;
}
export const animateTurtle = (model, seconds) => model.userData.flippers.forEach(({ node, side }) => { node.rotation.z = side * Math.sin(seconds * 1.8) * 0.4; });

const RAY = { back: '#3c4a63', belly: '#e8eef2', spot: '#f4f6ee', eye: '#0f1621' };

/** A spotted eagle ray, about 3 across. Its wings ripple. */
export function createOceanRay(water) {
  const { group, add, pivot } = kit('ocean-eagle-ray', water, RAY);
  add(sphere, 'back', [0, 0, 0], [0.5, 0.15, 0.7]);
  add(sphere, 'belly', [0, -0.1, 0], [0.42, 0.09, 0.6]);
  add(sphere, 'back', [0, 0.04, -0.72], [0.28, 0.14, 0.32]);
  add(sphere, 'belly', [0, -0.12, -0.9], [0.18, 0.05, 0.16]);
  for (const side of [-1, 1]) add(sphere, 'eye', [side * 0.2, 0.08, -0.82], [0.045, 0.045, 0.04]);
  const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.012, 2, 6), group.children[0].material);
  tail.position.set(0, 0, 1.6);
  tail.rotation.x = Math.PI / 2;
  group.add(tail);
  const wings = [];
  for (const side of [-1, 1]) {
    const wing = pivot([side * 0.45, 0, 0.05]);
    add(sphere, 'back', [side * 0.55, 0, 0], [0.62, 0.05, 0.5], [0, side * -0.2, 0], wing);
    add(sphere, 'belly', [side * 0.55, -0.04, 0], [0.55, 0.03, 0.44], [0, side * -0.2, 0], wing);
    for (const [x, z] of [[0.35, -0.1], [0.7, 0.1], [0.55, 0.3]]) add(sphere, 'spot', [side * x, 0.05, z], [0.05, 0.015, 0.05], [0, 0, 0], wing);
    wings.push({ node: wing, side });
  }
  for (const [x, z] of [[0, -0.1], [-0.15, 0.2], [0.14, 0.3], [0.05, 0.5]]) add(sphere, 'spot', [x, 0.15, z], [0.05, 0.015, 0.05]);
  group.userData.wings = wings;
  return group;
}
export const animateRay = (model, seconds) => model.userData.wings.forEach(({ node, side }) => { node.rotation.z = side * Math.sin(seconds * 2.2) * 0.3; });

const SEAHORSE = { body: '#ff9f3c', dark: '#d9562b', fin: '#ffd28a', eye: '#1d2733' };

/** An upright seahorse, about 2 tall, with a long snout, a curled tail and a fluttering fin. */
export function createOceanSeahorse(water) {
  const { group, add, pivot } = kit('ocean-seahorse', water, SEAHORSE);
  group.scale.setScalar(1.6);
  add(sphere, 'body', [0, 0, 0], [0.17, 0.32, 0.16]);
  add(sphere, 'dark', [0, -0.1, -0.1], [0.14, 0.2, 0.1]);
  add(sphere, 'body', [0, 0.4, -0.1], [0.14, 0.14, 0.17], [0.4, 0, 0]);
  add(new THREE.CylinderGeometry(0.03, 0.05, 0.42, 8), 'dark', [0, 0.32, -0.4], [1, 1, 1], [Math.PI / 2 + 0.55, 0, 0]);
  for (const side of [-1, 1]) add(sphere, 'eye', [side * 0.1, 0.46, -0.16], [0.035, 0.035, 0.03]);
  for (const [y, size] of [[0.56, 0.06], [0.45, 0.07], [0.33, 0.07], [0.2, 0.07]]) add(sphere, 'dark', [0, y, 0.12], [0.035, size, 0.06]);
  // The tail curls up and forwards in a ring of shrinking beads.
  for (let i = 0; i < 7; i++) {
    const angle = i * 0.62, size = 0.12 - i * 0.012;
    add(sphere, i % 2 ? 'dark' : 'body', [0, -0.3 - Math.sin(angle) * 0.34, 0.1 + (1 - Math.cos(angle)) * 0.2], [size, size, size]);
  }
  const fin = pivot([0, 0.05, 0.16]);
  add(new THREE.CircleGeometry(0.2, 14, 0, Math.PI), 'fin', [0, 0, 0], [1, 1, 1], [0, Math.PI / 2, Math.PI / 2], fin);
  group.userData.fin = fin;
  return group;
}
export const animateSeahorse = (model, seconds) => { model.userData.fin.rotation.y = Math.sin(seconds * 14) * 0.35; };
