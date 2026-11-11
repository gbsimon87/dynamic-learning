import * as THREE from 'three';
import { marineMaterial } from './oceanModelDetail.js';

/** Original model. Its forward direction is -Z; move the whole group and spin `ocean-propeller`. */
export function createOceanSubmarine(water) {
  const group = new THREE.Group();
  group.name = 'ocean-submarine';
  // Yaw first, then a gentle nose-up/down pitch in the craft's own frame.
  group.rotation.order = 'YXZ';
  const materials = Object.fromEntries(['hull', 'trim', 'window', 'metal'].map((key) => {
    const material = key === 'window'
      ? new THREE.MeshPhysicalMaterial({ roughness: 0.09, metalness: 0.12, clearcoat: 1, clearcoatRoughness: 0.06, envMapIntensity: 1.6 })
      : marineMaterial(water, '#ffffff', { roughness: key === 'hull' ? 0.32 : 0.4, metalness: key === 'metal' ? 0.72 : key === 'trim' ? 0.6 : 0.16 });
    material.userData.oceanColor = key;
    return [key, material];
  }));
  const sphere = new THREE.SphereGeometry(1, 32, 20);
  const add = (geometry, material, position, scale = [1, 1, 1], parent = group) => {
    const mesh = new THREE.Mesh(geometry, materials[material]);
    mesh.position.set(...position);
    mesh.scale.set(...scale);
    parent.add(mesh);
    return mesh;
  };

  add(sphere, 'hull', [0, 0, 0], [1.22, 1.08, 2.12]);
  add(sphere, 'trim', [0, -0.12, -1.8], [0.81, 0.79, 0.36]);
  add(sphere, 'window', [0, -0.12, -2.04], [0.64, 0.63, 0.18]);

  // Pressure-hull seams and lower ballast tanks give the craft a working-vessel silhouette.
  const seam = new THREE.TorusGeometry(1, 0.015, 6, 48);
  for (const z of [-0.8, 0.8]) add(seam, 'metal', [0, 0, z], [1.135, 1.005, 1]);
  for (const side of [-1, 1]) {
    add(sphere, 'trim', [side * 0.94, -0.85, 0.15], [0.25, 0.25, 1.5]);
    const skid = add(new THREE.CylinderGeometry(0.055, 0.055, 2.6, 10), 'metal', [side * 0.8, -1.24, 0]);
    skid.rotation.x = Math.PI / 2;
    for (const z of [-0.75, 0.75]) add(new THREE.CylinderGeometry(0.04, 0.04, 0.35, 8), 'metal', [side * 0.8, -1.08, z]);
  }

  // Two portholes on each side give the craft a readable silhouette from behind.
  const rim = new THREE.CylinderGeometry(0.34, 0.34, 0.18, 32);
  const glass = new THREE.CylinderGeometry(0.25, 0.25, 0.04, 32);
  const bolts = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.023, 0.023, 0.025, 6), materials.metal, 32);
  const bolt = new THREE.Object3D();
  let boltIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [-0.65, 0.65]) {
      // Keep the complete outer face beyond the hull's widest point (1.22).
      // The inner part remains embedded, so the housing joins the curved hull.
      const housing = add(rim, 'trim', [side * 1.24, 0.12, z]);
      housing.rotation.z = Math.PI / 2;
      housing.name = 'ocean-porthole-rim';
      const window = add(glass, 'window', [side * 1.335, 0.12, z]);
      window.rotation.z = Math.PI / 2;
      window.name = 'ocean-porthole-glass';
      for (let i = 0; i < 8; i++) {
        const angle = i * Math.PI / 4;
        bolt.position.set(side * 1.34, 0.12 + Math.cos(angle) * 0.3, z + Math.sin(angle) * 0.3);
        bolt.rotation.z = Math.PI / 2;
        bolt.updateMatrix();
        bolts.setMatrixAt(boltIndex++, bolt.matrix);
      }
    }
    add(new THREE.BoxGeometry(0.85, 0.13, 0.85), 'metal', [side * 1.25, -0.4, 1.05]).rotation.y = side * 0.18;
  }
  group.add(bolts);

  const lampMaterial = new THREE.MeshStandardMaterial({ color: '#e9f1dc', emissive: '#d6ebc7', emissiveIntensity: 1.2, roughness: 0.18 });
  lampMaterial.userData.oceanColor = 'light';
  for (const side of [-1, 1]) {
    add(sphere, 'metal', [side * 0.64, -0.55, -1.8], [0.17, 0.17, 0.22]);
    const lens = new THREE.Mesh(sphere, lampMaterial);
    lens.position.set(side * 0.64, -0.55, -1.98);
    lens.scale.set(0.12, 0.12, 0.06);
    group.add(lens);
  }
  const headlight = new THREE.SpotLight('#d6ebc7', 22, 18, 0.48, 0.65, 2);
  headlight.position.set(0, -0.55, -1.8);
  headlight.target.position.set(0, -1.8, -10);
  group.add(headlight, headlight.target);

  add(new THREE.CylinderGeometry(0.43, 0.55, 0.65, 24), 'hull', [0, 1.17, -0.15]);
  add(sphere, 'window', [0, 1.5, -0.15], [0.44, 0.24, 0.44]);
  add(new THREE.CylinderGeometry(0.09, 0.09, 0.65, 12), 'metal', [0, 1.8, 0.35]);
  add(new THREE.CylinderGeometry(0.1, 0.1, 0.38, 12), 'metal', [0, 2.1, 0.22]).rotation.x = Math.PI / 2;
  add(new THREE.BoxGeometry(0.13, 0.85, 0.8), 'metal', [0, 0.65, 1.6]);

  add(new THREE.CylinderGeometry(0.16, 0.16, 0.65, 16), 'metal', [0, 0, 2.08]).rotation.x = Math.PI / 2;
  add(new THREE.TorusGeometry(0.67, 0.08, 8, 32), 'trim', [0, 0, 2.38]);
  const propeller = new THREE.Group();
  propeller.name = 'ocean-propeller';
  propeller.position.z = 2.4;
  group.add(propeller);
  const blade = new THREE.BoxGeometry(0.17, 0.6, 0.1);
  for (let i = 0; i < 3; i++) {
    const angle = i * Math.PI * 2 / 3;
    add(blade, 'metal', [-Math.sin(angle) * 0.28, Math.cos(angle) * 0.28, 0], undefined, propeller).rotation.z = angle;
  }
  add(sphere, 'hull', [0, 0, 0.04], [0.2, 0.2, 0.16], propeller);
  return group;
}
