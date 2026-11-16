import * as THREE from 'three';
import { ARITHMETIC_AREA } from './solarArithmeticArea.js';
import { createSolarLabel } from './solarLabel.js';

// The Arithmetic Area's show: warp lines that stream past faster on Turbo and
// hot streaks, bursts when an answer is flown through or shot, fireworks,
// and planets that sweep past on the tour.
// Looks only: nothing here decides an answer or changes the flight speed.

const AREA = ARITHMETIC_AREA.spawn;
export const WARP = { count: 160, near: 8, far: -220, spreadX: 80, spreadY: 50, clearX: 12, clearY: 8 };
// Planet colours for the fly-bys (pretend views, not to scale).
export const PLANET_LOOKS = {
  Mercury: { colour: 0xb7aca2, radius: 7 }, Venus: { colour: 0xf1d6a0, radius: 11 }, Earth: { colour: 0x4f8fe0, radius: 11 },
  Mars: { colour: 0xd4683f, radius: 8 }, Jupiter: { colour: 0xd9b08a, radius: 22 }, Saturn: { colour: 0xe8d29a, radius: 18, rings: true },
  Uranus: { colour: 0x9fe3e8, radius: 14 }, Neptune: { colour: 0x4f6fe8, radius: 14 },
};
const FIREWORK = [0xffd166, 0xff6b9a, 0x67dfff, 0xb4ff9a, 0xffffff, 0xc6a8ff];
// Laser Blast's beam, and the warp colour for each streak power-up (rainbow cycles).
export const LASER = { life: .35, core: .14, glow: .32, colour: 0x67dfff };
export const WARP_COLOURS = { none: 0xcfe9ff, blazing: 0xffb36b, lightning: 0xc6a8ff, rainbow: null };
const TIER_ORDER = ['none', 'blazing', 'lightning', 'rainbow'];

/** A sphere coloured with fake sunlight (no scene lights needed). */
function shadedSphere(radius, colour) {
  const geometry = new THREE.SphereGeometry(radius, 32, 16);
  const normal = geometry.getAttribute('normal'), light = new THREE.Vector3(-.5, .55, .65).normalize();
  const base = new THREE.Color(colour), colors = [], n = new THREE.Vector3();
  for (let i = 0; i < normal.count; i++) {
    n.fromBufferAttribute(normal, i);
    const shade = .28 + .72 * Math.max(0, n.dot(light));
    colors.push(base.r * shade, base.g * shade, base.b * shade);
  }
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  return new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 1 }));
}

export function createSolarArithmeticFx({ scene, isVisible }) {
  const group = new THREE.Group(); group.name = 'solar-arithmetic-fx'; group.visible = false;
  scene.add(group);
  let disposed = false, intensity = 0, target = 0;

  // Warp lines: thin streaks around the flight path, recycled far ahead.
  const warpPositions = new Float32Array(WARP.count * 6);
  const warpSeeds = Array.from({ length: WARP.count }, () => {
    let x, y;
    do { x = (Math.random() - .5) * WARP.spreadX * 2; y = (Math.random() - .5) * WARP.spreadY * 2; } while (Math.abs(x) < WARP.clearX && Math.abs(y) < WARP.clearY);
    return { x, y, z: WARP.far + Math.random() * (WARP.near - WARP.far) };
  });
  const warpGeometry = new THREE.BufferGeometry();
  warpGeometry.setAttribute('position', new THREE.BufferAttribute(warpPositions, 3));
  const warpMaterial = new THREE.LineBasicMaterial({ color: 0xcfe9ff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
  const warp = new THREE.LineSegments(warpGeometry, warpMaterial);
  warp.name = 'warp-lines'; warp.frustumCulled = false; group.add(warp);
  const layWarp = () => {
    const length = 2 + 16 * intensity;
    warpSeeds.forEach((seed, i) => {
      warpPositions.set([seed.x, AREA.y + seed.y, AREA.z + seed.z, seed.x, AREA.y + seed.y, AREA.z + seed.z - length], i * 6);
    });
    warpGeometry.getAttribute('position').needsUpdate = true;
  };
  layWarp();

  // A soft round glow for burst sparks.
  const glowTexture = (() => {
    const size = 64, data = new Uint8Array(size * size * 4);
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
      const r = Math.hypot(x + .5 - size / 2, y + .5 - size / 2) / (size / 2), i = (y * size + x) * 4;
      data[i] = data[i + 1] = data[i + 2] = 255; data[i + 3] = Math.round(255 * Math.max(0, 1 - r) ** 1.6);
    }
    const t = new THREE.DataTexture(data, size, size, THREE.RGBAFormat); t.magFilter = t.minFilter = THREE.LinearFilter; t.needsUpdate = true; return t;
  })();

  // Bursts: short-lived round sparks flying out and fading. Sizes are in world
  // units and bursts happen a few units from the camera, so sparks stay small.
  const bursts = [];
  function burst(at, { colours = [0xffd166], count = 70, speed = 18, size = .35, life = 1.1, drift = 6 } = {}) {
    const positions = new Float32Array(count * 3), velocities = new Float32Array(count * 3), colors = new Float32Array(count * 3);
    const colour = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const dir = new THREE.Vector3().randomDirection().multiplyScalar(speed * (.45 + Math.random() * .55));
      positions.set([at.x, at.y, at.z], i * 3);
      velocities.set([dir.x, dir.y, dir.z + drift], i * 3);
      colour.setHex(colours[i % colours.length]); colors.set([colour.r, colour.g, colour.b], i * 3);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const points = new THREE.Points(geometry, new THREE.PointsMaterial({ size, map: glowTexture, vertexColors: true, transparent: true, opacity: 1, blending: THREE.AdditiveBlending, depthWrite: false }));
    points.name = 'burst'; points.frustumCulled = false; group.add(points);
    bursts.push({ points, velocities, age: 0, life });
  }
  const dropBurst = b => { b.points.removeFromParent(); b.points.geometry.dispose(); b.points.material.dispose(); };

  // Laser beams: a bright core and a soft glow, from the rocket to the target, fading fast.
  const beamGeometry = new THREE.CylinderGeometry(1, 1, 1, 8, 1, true).translate(0, .5, 0).rotateX(Math.PI / 2);
  const beams = [];
  const dropBeam = b => { b.group.removeFromParent(); b.materials.forEach(m => m.dispose()); };
  // Fireworks a little ahead of the rocket: power-ups and new best streaks.
  function fireworks(colours = FIREWORK, count = 3) {
    for (let k = 0; k < count; k++) {
      const side = (k - (count - 1) / 2) * 14;
      burst({ x: side, y: AREA.y + 8 + (k % 2) * 5, z: AREA.z - 45 - k * 4 }, { colours, count: 90, speed: 16, size: 1.1, life: 1.6, drift: 0 });
    }
  }
  let tier = 'none', rainbow = 0;

  // Planet fly-bys: one at a time, sweeping past on the right.
  let flyby = null;
  const dropFlyby = () => {
    if (!flyby) return;
    flyby.group.removeFromParent();
    flyby.group.traverse(o => { o.geometry?.dispose(); if (o.material) { o.material.map?.dispose(); o.material.dispose(); } });
    flyby = null;
  };

  const api = {
    /** 0 calm … 1 full warp; eased so changes never jump. */
    setIntensity(value) { target = THREE.MathUtils.clamp(value, 0, 1); },
    get intensity() { return intensity; },
    /**
     * Sparkles where an answer was flown through or, with `shot`, where the
     * laser hit it further ahead (bigger there, so it still reads from afar).
     */
    pass(at, { correct, dressing = 'ring', shot = false }) {
      const point = { x: at.x, y: at.y, z: shot ? at.z : AREA.z - 6 };
      const k = shot ? Math.max(1, (AREA.z - at.z) / 15) : 1;
      if (!correct) { burst(point, { colours: [0x7d8aa3, 0x5a6478], count: 24, speed: 7 * k, size: .25 * k, life: .8 }); return; }
      burst(point, { colours: dressing === 'star' ? [0xffd35a, 0xffffff] : [0xffd166, 0x67dfff, 0xffffff], count: shot ? 110 : 70, speed: 18 * k, size: .35 * k });
    },
    /** Laser Blast: a beam from the rocket (`from`: x, y) to the target it hit (`to`: x, y, z). */
    laser(from, to, correct = true) {
      const start = new THREE.Vector3(from.x, from.y - 1.2, AREA.z - 4), end = new THREE.Vector3(to.x, to.y, to.z);
      const length = start.distanceTo(end);
      if (!(length > 0)) return;
      const beam = new THREE.Group(); beam.name = 'laser'; beam.position.copy(start); beam.lookAt(end);
      const colour = correct ? LASER.colour : 0x9aa6bd;
      const materials = [
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1, blending: THREE.AdditiveBlending, depthWrite: false }),
        new THREE.MeshBasicMaterial({ color: colour, transparent: true, opacity: .45, blending: THREE.AdditiveBlending, depthWrite: false }),
      ];
      [LASER.core, LASER.glow].forEach((radius, i) => {
        const mesh = new THREE.Mesh(beamGeometry, materials[i]); mesh.scale.set(radius, radius, length); mesh.frustumCulled = false; beam.add(mesh);
      });
      group.add(beam);
      beams.push({ group: beam, materials, age: 0 });
      burst({ x: start.x, y: start.y, z: start.z - 1 }, { colours: [colour, 0xffffff], count: 16, speed: 4, size: .16, life: .4, drift: 0 });
    },
    /** The answers not shot pop softly as the wave clears. */
    pop(points) {
      points.forEach(at => {
        const k = Math.max(1, (AREA.z - at.z) / 15);
        burst(at, { colours: [0x67dfff, 0xcfe9ff], count: 20, speed: 5 * k, size: .2 * k, life: .7, drift: 0 });
      });
    },
    /**
     * Streak power-ups recolour the warp lines (`null`: back to plain).
     * Powering up to a higher tier sets off fireworks in its colour.
     */
    setTier(id) {
      const next = WARP_COLOURS[id] === undefined ? 'none' : id;
      if (TIER_ORDER.indexOf(next) > TIER_ORDER.indexOf(tier)) fireworks(next === 'rainbow' ? FIREWORK : [WARP_COLOURS[next], 0xffffff]);
      tier = next;
      if (WARP_COLOURS[tier] !== null) warpMaterial.color.setHex(WARP_COLOURS[tier]);
    },
    get tier() { return tier; },
    /** A new best streak, a landing or a finished station activity: fireworks all round. */
    record() { fireworks(FIREWORK, 4); },
    /** A little twinkle at the rocket for each stardust orb taken. */
    sparkle(at) { burst({ x: at.x, y: at.y, z: AREA.z - 4 }, { colours: [0xffe08a, 0xffffff], count: 18, speed: 5, size: .16, life: .6, drift: 2 }); },
    /** A planet sweeps past on the right, with its name. */
    flyby(name) {
      const look = PLANET_LOOKS[name];
      if (!look) return;
      dropFlyby();
      const planet = new THREE.Group(); planet.name = 'planet-flyby';
      const ball = shadedSphere(look.radius, look.colour); planet.add(ball);
      if (look.rings) {
        const ring = new THREE.Mesh(new THREE.RingGeometry(look.radius * 1.35, look.radius * 2.1, 64), new THREE.MeshBasicMaterial({ color: 0xd9c48d, transparent: true, opacity: .75, side: THREE.DoubleSide }));
        ring.rotation.x = Math.PI / 2.6; planet.add(ring);
      }
      const label = createSolarLabel(name, 72, '#ffffff', 'planet');
      label.scale.multiplyScalar(2.2); label.position.y = look.radius + 4; planet.add(label);
      planet.position.set(48 + look.radius, AREA.y + 6, AREA.z - 260);
      group.add(planet);
      flyby = { group: planet, ball };
    },
    reset() {
      bursts.splice(0).forEach(dropBurst); beams.splice(0).forEach(dropBeam); dropFlyby(); target = intensity = 0;
      tier = 'none'; warpMaterial.color.setHex(WARP_COLOURS.none);
    },
    update(dt = 0) {
      group.visible = isVisible();
      if (!group.visible || !(dt > 0)) return;
      intensity += (target - intensity) * (1 - Math.exp(-3 * dt));
      warpMaterial.opacity = .06 + .6 * intensity;
      const speed = 30 + 170 * intensity;
      warpSeeds.forEach(seed => { seed.z += speed * dt; if (seed.z > WARP.near) seed.z = WARP.far + Math.random() * 20; });
      layWarp();
      if (tier === 'rainbow') { rainbow = (rainbow + dt * .25) % 1; warpMaterial.color.setHSL(rainbow, .85, .7); }
      for (let i = beams.length - 1; i >= 0; i--) {
        const b = beams[i]; b.age += dt;
        const fade = Math.max(0, 1 - b.age / LASER.life);
        b.materials[0].opacity = fade; b.materials[1].opacity = .45 * fade;
        if (b.age >= LASER.life) { dropBeam(b); beams.splice(i, 1); }
      }
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i]; b.age += dt;
        const position = b.points.geometry.getAttribute('position');
        for (let j = 0; j < position.count; j++) {
          position.array[j * 3] += b.velocities[j * 3] * dt;
          position.array[j * 3 + 1] += b.velocities[j * 3 + 1] * dt;
          position.array[j * 3 + 2] += b.velocities[j * 3 + 2] * dt;
          b.velocities[j * 3] *= .97; b.velocities[j * 3 + 1] *= .97;
        }
        position.needsUpdate = true;
        b.points.material.opacity = Math.max(0, 1 - b.age / b.life);
        if (b.age >= b.life) { dropBurst(b); bursts.splice(i, 1); }
      }
      if (flyby) {
        flyby.group.position.z += 55 * dt;
        flyby.ball.rotation.y += dt * .3;
        if (flyby.group.position.z > AREA.z + 60) dropFlyby();
      }
    },
    dispose() {
      if (disposed) return; disposed = true;
      api.reset(); group.removeFromParent();
      warpGeometry.dispose(); warpMaterial.dispose();
      glowTexture.dispose(); beamGeometry.dispose();
    },
  };
  return api;
}
