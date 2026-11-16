import * as THREE from 'three';
import { expect, test, vi } from 'vitest';
import { createSolarArithmeticFx, LASER, WARP_COLOURS } from '../../src/pages/skills/geography/solarArithmeticFx.js';

vi.mock('../../src/pages/skills/geography/solarLabel.js', () => ({
  createSolarLabel: text => {
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.Texture() }));
    sprite.userData.text = text;
    return sprite;
  },
}));

const run = (fx, seconds, dt = 1 / 30) => { for (let t = 0; t < seconds; t += dt) fx.update(dt); };
const named = (scene, name) => { const out = []; scene.traverse(o => { if (o.name === name) out.push(o); }); return out; };

test('bursts sparkle and clear themselves; warp eases with intensity; nothing shows outside the area', () => {
  const scene = new THREE.Scene();
  let visible = false;
  const fx = createSolarArithmeticFx({ scene, isVisible: () => visible });
  try {
    fx.pass({ x: 6, y: 180 }, { correct: true, dressing: 'star' });
    fx.update(1 / 30);
    expect(scene.getObjectByName('solar-arithmetic-fx').visible).toBe(false);
    visible = true;
    expect(named(scene, 'burst')).toHaveLength(1);
    fx.pass({ x: -6, y: 180 }, { correct: false });
    expect(named(scene, 'burst')).toHaveLength(2);
    run(fx, 1.5);
    expect(named(scene, 'burst')).toHaveLength(0);
    fx.setIntensity(1); fx.update(1 / 30);
    expect(fx.intensity).toBeGreaterThan(0); expect(fx.intensity).toBeLessThan(.5);
    run(fx, 3);
    expect(fx.intensity).toBeGreaterThan(.95);
  } finally { fx.dispose(); }
  expect(scene.children).toHaveLength(0);
});

test('a planet sweeps past with its name, then is cleared; unknown names do nothing', () => {
  const scene = new THREE.Scene();
  const fx = createSolarArithmeticFx({ scene, isVisible: () => true });
  try {
    fx.flyby('Pluto'); expect(scene.getObjectByName('planet-flyby')).toBeUndefined();
    fx.flyby('Saturn');
    const planet = scene.getObjectByName('planet-flyby');
    expect(planet.children.some(child => child.userData.text === 'Saturn')).toBe(true);
    run(fx, 8);
    expect(scene.getObjectByName('planet-flyby')).toBeUndefined();
    fx.flyby('Mars'); fx.reset();
    expect(scene.getObjectByName('planet-flyby')).toBeUndefined();
  } finally { fx.dispose(); }
});

test('Laser Blast: a beam flashes from the rocket to the target and fades; the others pop', () => {
  const scene = new THREE.Scene();
  const fx = createSolarArithmeticFx({ scene, isVisible: () => true });
  try {
    fx.laser({ x: -6, y: 180 }, { x: -5, y: 180, z: -300 }, true);
    const beam = named(scene, 'laser')[0];
    expect(beam).toBeTruthy();
    const mesh = beam.children[0];
    expect(mesh.scale.z).toBeGreaterThan(10);
    fx.pop([{ x: 1, y: 180, z: -300 }, { x: 8, y: 180, z: -300 }]);
    const bursts = named(scene, 'burst').length;
    expect(bursts).toBeGreaterThanOrEqual(3);
    run(fx, LASER.life + .1);
    expect(named(scene, 'laser')).toHaveLength(0);
    fx.laser({ x: 0, y: 0 }, { x: 0, y: 0, z: 0 }); fx.reset();
    expect(named(scene, 'laser')).toHaveLength(0);
  } finally { fx.dispose(); }
});

test('streak power-ups recolour the warp lines and set off fireworks only when powering up', () => {
  const scene = new THREE.Scene();
  const fx = createSolarArithmeticFx({ scene, isVisible: () => true });
  const warp = scene.getObjectByName('warp-lines');
  try {
    fx.setTier('blazing');
    expect(warp.material.color.getHex()).toBe(WARP_COLOURS.blazing);
    const after = named(scene, 'burst').length; expect(after).toBeGreaterThan(0);
    fx.setTier('blazing'); fx.setTier(null);
    expect(named(scene, 'burst')).toHaveLength(after);
    expect(warp.material.color.getHex()).toBe(WARP_COLOURS.none);
    fx.setTier('rainbow'); const before = warp.material.color.getHex();
    run(fx, .5); expect(warp.material.color.getHex()).not.toBe(before);
    fx.record(); expect(named(scene, 'burst').length).toBeGreaterThan(after);
    fx.reset(); expect(fx.tier).toBe('none'); expect(warp.material.color.getHex()).toBe(WARP_COLOURS.none);
  } finally { fx.dispose(); }
});
