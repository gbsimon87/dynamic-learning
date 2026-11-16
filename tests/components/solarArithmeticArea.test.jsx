import * as THREE from 'three';
import { expect, test, vi } from 'vitest';
import { createSolarArithmeticArea, crawlSpread } from '../../src/pages/skills/geography/solarArithmeticArea.js';
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
        const wave = scene.getObjectByName('solar-arithmetic-area').children.find(w => w.visible && w.name !== 'solar-arithmetic-lanes');
        const rings = wave.children.filter(child => child.isGroup);
        rings.forEach((holder, lane) => {
          const ring = holder.children[0];
          const label = holder.children.find(child => child.userData.text !== undefined);
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

test('light lanes run along each ring path and the rocket lane glows', () => {
  const scene = new THREE.Scene();
  const area = createSolarArithmeticArea({ scene, isVisible: () => true });
  try {
    area.update();
    const lanes = scene.getObjectByName('solar-arithmetic-lanes');
    expect(lanes.children).toHaveLength(4);
    expect(lanes.visible).toBe(false);
    for (const reverse of [false, true]) {
      area.setQuestion({ options: reverse ? ['1 + 1', '2 + 1', '1 + 3', '2 + 2'] : [1, 2, 3, 4], reverse });
      expect(lanes.visible).toBe(true);
      for (const distance of [RUNNER.startDistance - 1, 50, 5]) {
        area.place(distance);
        scene.updateMatrixWorld(true);
        const wave = scene.getObjectByName('solar-arithmetic-area').children.find(w => w.visible && w.name !== 'solar-arithmetic-lanes');
        lanes.children.forEach((strip, lane) => {
          // The strip sits under its ring wherever the ring is on its way in.
          const ring = wave.children.filter(child => child.isGroup)[lane].getWorldPosition(new THREE.Vector3());
          const position = strip.geometry.getAttribute('position');
          const z = ring.z;
          const [near, far] = [0, 2].map(i => new THREE.Vector3().fromBufferAttribute(position, i).add(new THREE.Vector3().fromBufferAttribute(position, i + 1)).multiplyScalar(.5));
          const t = (z - near.z) / (far.z - near.z);
          const centre = near.clone().lerp(far, t);
          expect(centre.x).toBeCloseTo(ring.x, 4);
          expect(centre.y).toBeLessThan(ring.y);
          if (!reverse) expect(ring.y - centre.y).toBeCloseTo(4 * crawlSpread(distance), 4);
        });
      }
      area.highlight(2);
      const opacity = lanes.children.map(strip => strip.material.opacity);
      expect(opacity[2]).toBeGreaterThan(Math.max(opacity[0], opacity[1], opacity[3]));
      // Neon: the ring the rocket is heading for burns brighter with a stronger halo.
      const wave = scene.getObjectByName('solar-arithmetic-area').children.find(w => w.visible && w.name !== 'solar-arithmetic-lanes');
      const holders = wave.children.filter(child => child.isGroup);
      const glows = holders.map(holder => holder.getObjectByName('ring-glow').material.opacity);
      const cores = holders.map(holder => holder.children[0].material.color.getHex());
      expect(glows[2]).toBeGreaterThan(Math.max(glows[0], glows[1], glows[3]) * 2);
      expect(Math.min(glows[0], glows[1], glows[3])).toBeGreaterThan(0);
      expect(new Set([cores[0], cores[1], cores[3]]).size).toBe(1);
      expect(cores[2]).not.toBe(cores[0]);
      area.highlight(1);
      expect(holders[2].getObjectByName('ring-glow').material.opacity).toBe(glows[0]);
    }
  } finally { area.dispose(); }
  expect(scene.children).toHaveLength(0);
});

test('question sets dress the answers as rings or stars; calculation grids stay rings', () => {
  const scene = new THREE.Scene();
  const area = createSolarArithmeticArea({ scene, isVisible: () => true });
  const holders = () => scene.getObjectByName('solar-arithmetic-area').children.find(w => w.visible && w.name !== 'solar-arithmetic-lanes').children.filter(child => child.isGroup);
  try {
    area.setQuestion({ options: [1, 2, 3, 4], dressing: 'ring' }); area.place(50);
    const ring = holders()[0].children[0].geometry;
    area.setQuestion({ options: [1, 2, 3, 4], dressing: 'star' }); area.place(50);
    const star = holders()[0].children[0].geometry;
    expect(star).not.toBe(ring);
    const hit = area.markPassed(2, true);
    expect(hit.dressing).toBe('star');
    expect(holders()[2].children[0].visible).toBe(true);
    area.setQuestion({ options: ['1 + 1', '2 + 1', '1 + 3', '2 + 2'], reverse: true, dressing: 'star' }); area.place(50);
    expect(holders()[0].children[0].geometry).toBe(ring);
    // A retired dressing (old meteor) falls back to rings.
    area.setQuestion({ options: [1, 2, 3, 4], dressing: 'meteor' }); area.place(50);
    expect(holders()[0].children[0].geometry).toBe(ring);
  } finally { area.dispose(); }
});

test('stardust flies in ahead of the answers in one lane and is taken only by a rocket in that lane', () => {
  const scene = new THREE.Scene();
  const area = createSolarArithmeticArea({ scene, isVisible: () => true });
  const dust = () => scene.getObjectByName('solar-arithmetic-area').children
    .filter(w => w.name !== 'solar-arithmetic-lanes').flatMap(w => w.children.filter(child => child.name === 'stardust' && child.visible));
  try {
    const original = Math.random;
    Math.random = () => .6; // lane 2
    try { area.setQuestion({ options: [1, 2, 3, 4] }); } finally { Math.random = original; }
    area.place(RUNNER.startDistance - 20);
    expect(dust().length).toBe(3);
    expect(area.collectDust(2)).toBe(0); // not there yet
    area.place(41); expect(area.collectDust(2)).toBe(1);
    area.place(37); expect(area.collectDust(0)).toBe(0); // steered away: this one flies past
    area.place(30); expect(area.collectDust(2)).toBe(1);
    expect(area.collectDust(2)).toBe(0); // each orb counts once
    // The equation grid keeps every lane clear.
    area.setQuestion({ options: ['1 + 1', '2 + 1', '1 + 3', '2 + 2'], reverse: true });
    area.place(20); expect(area.collectDust(0) + area.collectDust(1) + area.collectDust(2) + area.collectDust(3)).toBe(0);
  } finally { area.dispose(); }
  expect(scene.children).toHaveLength(0);
});

test('Laser Blast: the answers not shot vanish and come back with the next question', () => {
  const scene = new THREE.Scene();
  const area = createSolarArithmeticArea({ scene, isVisible: () => true });
  const waves = () => scene.getObjectByName('solar-arithmetic-area').children.filter(w => w.name !== 'solar-arithmetic-lanes');
  try {
    area.setQuestion({ options: [1, 2, 3, 4] }); area.place(60);
    const wave = waves().find(w => w.visible), holders = wave.children.filter(child => child.isGroup);
    area.markPassed(1, true);
    const popped = area.clearOthers(1);
    expect(popped).toHaveLength(3);
    expect(popped.every(at => at.z < 0 || at.z > 0)).toBe(true);
    expect(holders.map(h => h.visible)).toEqual([false, true, false, false]);
    expect(area.clearOthers(1)).toEqual([]);
    area.setQuestion({ options: [5, 6, 7, 8] }); area.setQuestion({ options: [1, 2, 3, 4] });
    expect(holders.every(h => h.visible)).toBe(true);
  } finally { area.dispose(); }
});
