import * as THREE from 'three';

/** Original model. Its forward direction is -Z; move the whole group and spin `ocean-propeller`. */
export function createOceanSubmarine() {
  const group = new THREE.Group();
  group.name = 'ocean-submarine';
  // Yaw first, then a gentle nose-up/down pitch in the craft's own frame.
  group.rotation.order = 'YXZ';
  const materials = Object.fromEntries(['hull', 'trim', 'window', 'metal'].map((key) => {
    const material = new THREE.MeshStandardMaterial({ roughness: key === 'window' ? 0.18 : 0.38, metalness: key === 'metal' ? 0.5 : 0.12 });
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

  // Two portholes on each side give the craft a readable silhouette from behind.
  const rim = new THREE.CylinderGeometry(0.34, 0.34, 0.18, 32);
  const glass = new THREE.CylinderGeometry(0.25, 0.25, 0.04, 32);
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
    }
    add(new THREE.BoxGeometry(0.85, 0.13, 0.85), 'metal', [side * 1.25, -0.4, 1.05]).rotation.y = side * 0.18;
  }

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
