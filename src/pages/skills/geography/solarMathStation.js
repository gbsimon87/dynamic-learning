import * as THREE from 'three';
import { ARITHMETIC_AREA } from './solarArithmeticArea.js';
import { createSolarLabel } from './solarLabel.js';
import { arithmeticLanePoint } from './solarArithmeticRunner.js';
import { collectedTotal } from '../../../data/freePlay/spaceMathActivities.js';

// Physical teaching models in the explorer's existing scene and animation loop.
export function createSolarMathStation({ scene, isVisible }) {
  const root = new THREE.Group();
  root.name = 'space-maths-station'; root.visible = false;
  root.position.set(0, ARITHMETIC_AREA.spawn.y + 16, -75); scene.add(root);
  let question = null, disposed = false;
  const clear = () => {
    root.traverse(object => {
      if (object.isMesh) object.geometry.dispose();
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.filter(Boolean).forEach(material => { material.map?.dispose(); material.dispose(); });
    });
    root.clear();
  };
  const mesh = (parent, geometry, colour, x, y, z = 0) => {
    const object = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: colour }));
    object.position.set(x, y, z); parent.add(object); return object;
  };
  const label = (parent, text, x, y, width = 28) => {
    const object = createSolarLabel(text, 96, '#ffffff', 'arithmetic');
    object.scale.multiplyScalar(Math.min(1.4, width / object.scale.x));
    object.position.set(x, y, 1); parent.add(object);
  };
  const crystals = (parent, count, x, y, columns = 5) => {
    for (let i = 0; i < count; i++) mesh(parent, new THREE.OctahedronGeometry(.55), 0x67dfff,
      x + ((i % columns) - (Math.min(count, columns) - 1) / 2) * 1.35, y + Math.floor(i / columns) * 1.3, .5);
  };
  return {
    setQuestion(wave) {
      clear(); question = wave?.station ?? null;
      if (!question) return;
      const q = question;
      if (q.kind === 'balance') {
        label(root, 'Balance the station', 0, 14);
        mesh(root, new THREE.ConeGeometry(3, 7, 3), 0xc6a8ff, 0, -4);
        const beam = new THREE.Group(); root.add(beam);
        beam.rotation.z = THREE.MathUtils.degToRad(Math.max(-12, Math.min(12, (q.a + q.b - q.base - q.cargo.length) * 3)));
        mesh(beam, new THREE.BoxGeometry(34, .6, 1), 0xc6a8ff, 0, 0);
        for (const x of [-13, 13]) {
          mesh(beam, new THREE.BoxGeometry(.25, 6, .25), 0xffffff, x, -3);
          mesh(beam, new THREE.BoxGeometry(11, .6, 6), 0xc6a8ff, x, -6);
        }
        crystals(beam, q.a + q.b, -13, -5);
        crystals(beam, q.base + q.cargo.length, 13, -5);
        label(beam, `${q.a} + ${q.b}`, -13, 7, 13);
        label(beam, `${q.base} + ${q.cargo.length}`, 13, 7, 13);
      } else if (q.kind === 'share') {
        const remaining = q.total - collectedTotal(q.loads);
        label(root, remaining ? `Ship cargo: ${remaining} crystals` : 'Pick up a crystal to move it', 0, 13);
        crystals(root, remaining, 0, 8, 10);
        q.loads.forEach((count, i) => {
          const x = arithmeticLanePoint(i).x;
          mesh(root, new THREE.SphereGeometry(2.3, 12, 8), 0xb4ff9a, x, 1);
          for (const offset of [-.8, .8]) mesh(root, new THREE.SphereGeometry(.5, 8, 6), 0x12243b, x + offset, 1.3, 2);
          mesh(root, new THREE.BoxGeometry(9, .5, 5), 0xc6a8ff, x, -5);
          crystals(root, count, x, -4, 4);
          label(root, `Alien ${i + 1}: ${count}`, x, -8, 10);
        });
      } else {
        label(root, `Target ${q.target} · Cargo ${collectedTotal(q.cargo)}`, 0, 10);
        const dock = mesh(root, new THREE.TorusGeometry(8, .5, 8, 40), 0xffd166, 0, 0);
        dock.name = 'collector-dock';
        crystals(root, collectedTotal(q.cargo), 0, -3, 5);
      }
    },
    follow(x) { root.position.x = x; },
    update() { root.visible = Boolean(question) && isVisible(); },
    dispose() { if (disposed) return; disposed = true; clear(); root.removeFromParent(); },
  };
}
