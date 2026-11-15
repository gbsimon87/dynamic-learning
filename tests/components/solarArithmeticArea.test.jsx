import * as THREE from 'three';
import { expect, test, vi } from 'vitest';
import { createSolarArithmeticArea } from '../../src/pages/skills/geography/solarArithmeticArea.js';
import { RUNNER } from '../../src/pages/skills/geography/solarArithmeticRunner.js';

vi.mock('../../src/pages/skills/geography/solarLabel.js', () => ({
  createSolarLabel: text => {
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.Texture() }));
    sprite.userData.text = text;
    sprite.scale.set(text.length, 1, 1);
    return sprite;
  },
}));

test('full equations fly in two rows and all ring labels stay within separate openings', () => {
  const scene = new THREE.Scene();
  const area = createSolarArithmeticArea({ scene, isVisible: () => true });
  try {
    area.update();
    for (const reverse of [false, true]) {
      const options = reverse ? ['100 + (99 × 100) + 98', '99 × 100 + 97', '100 + 99 + 98', '100 + (98 × 100) + 98'] : [100000000, 99999999, 99999998, 100000001];
      area.setQuestion({ options, reverse });
      for (const distance of [RUNNER.startDistance - .1, 95, 55, 20, 0]) {
        area.place(distance);
        scene.updateMatrixWorld(true);
        const wave = scene.getObjectByName('solar-arithmetic-area').children.find(w => w.visible);
        const rings = wave.children;
        rings.forEach((holder, lane) => {
          const [ring, label] = holder.children;
          expect(label.userData.text).toBe(String(options[lane]));
          const scale = holder.getWorldScale(new THREE.Vector3()).x;
          if (!ring.geometry.boundingBox) ring.geometry.computeBoundingBox();
          const bounds = ring.geometry.boundingBox;
          const halfWidth = bounds.max.x * scale * ring.scale.x;
          const halfHeight = bounds.max.y * scale * ring.scale.y;
          expect(label.getWorldScale(new THREE.Vector3()).x / 2).toBeLessThan(halfWidth);
          expect(label.getWorldScale(new THREE.Vector3()).y / 2).toBeLessThan(halfHeight);
          for (const other of rings.slice(lane + 1)) {
            const gapX = Math.abs(other.position.x - holder.position.x);
            const gapY = Math.abs(other.position.y - holder.position.y);
            expect(gapX > halfWidth * 2 || gapY > halfHeight * 2).toBe(true);
          }
        });
        if (reverse) {
          expect(rings[0].position.y).toBe(rings[1].position.y);
          expect(rings[2].position.y).toBe(rings[3].position.y);
          expect(rings[0].position.y).toBeGreaterThan(rings[2].position.y);
          expect(rings[0].position.x).toBe(rings[2].position.x);
          expect(rings[1].position.x).toBe(rings[3].position.x);
        }
      }
    }
  } finally { area.dispose(); }
  expect(scene.children).toHaveLength(0);
});
