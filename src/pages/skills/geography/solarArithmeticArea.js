import * as THREE from 'three';
import { createSolarLabel } from './solarLabel.js';
import { RUNNER, arithmeticLanePoint } from './solarArithmeticRunner.js';

// A fictional practice area in the existing scene, high above the planets'
// orbits. The rocket stays at `spawn` (facing -z) and slides between lanes;
// the four answer rings close in from ahead. The sum lives in the card only.
export const ARITHMETIC_AREA = {
  spawn: { x: RUNNER.laneX[1], y: 180, z: 0 }, heading: { x: 0, y: 0, z: -1 },
};
/**
 * Which way to fly out to reach the area, like the trips to other systems:
 * climbing about 35 degrees above the planets' plane, on the opposite side to
 * the first real-system signpost so the two never share a direction.
 */
export function arithmeticDirection(signposts = []) {
  const d = signposts[0]?.direction;
  const h = d && Math.hypot(d.x, d.z) > 1e-6 ? { x: -d.x / Math.hypot(d.x, d.z), z: -d.z / Math.hypot(d.x, d.z) } : { x: 1, z: 0 };
  const climb = .6;
  return { x: h.x * Math.cos(climb), y: Math.sin(climb), z: h.z * Math.cos(climb) };
}
const RING_RADIUS = 4;
const LABEL_WIDTH = RING_RADIUS * 1.7;
const FADE_OUT = 12, FADE_IN = 15;
// The answers come in like an opening text crawl, in shape: far ahead the four
// rings sit close together near the middle, and they fan out along straight
// lines from one vanishing point to their lanes — the outer two balanced left
// and right, the inner two evenly between — reaching them as they reach the
// rocket. Passed rings carry on spreading. Lane order and spacing never change.
export const CRAWL = { farSpread: .25 };
/** How far apart the rings are `distance` ahead: 1 at the rocket, `farSpread` at the start. */
export function crawlSpread(distance) {
  return 1 - (1 - CRAWL.farSpread) * distance / RUNNER.startDistance;
}

// Light lanes: one glowing strip per answer, under the exact path its ring
// flies in along, from just ahead of the rocket out to where the rings appear.
// The lane the rocket is heading for glows brightest.
export const LIGHT_LANES = { width: .7, near: 6, faint: .07, bright: .5 };
function laneStripPositions(lane, grid) {
  const point = arithmeticLanePoint(lane, grid);
  const halfHeight = RING_RADIUS * (grid ? 1.4 : 1);
  const z = ARITHMETIC_AREA.spawn.z, y = ARITHMETIC_AREA.spawn.y;
  // Straight lines: the crawl spreads linearly with distance, so two ends suffice.
  const end = distance => {
    const spread = grid ? 1 : crawlSpread(distance);
    const cx = point.x * spread, cy = y + (point.y - halfHeight) * spread, w = LIGHT_LANES.width * spread / 2;
    return [cx - w, cy, z - distance, cx + w, cy, z - distance];
  };
  return [...end(LIGHT_LANES.near), ...end(RUNNER.startDistance)];
}

// Neon rings: a cyan tube with a soft halo behind it. Idle rings glow softly;
// the one the rocket is heading for burns near-white with a stronger, gently
// pulsing halo, so the child can see the choice without reading the lanes.
export const NEON = { idle: 0x67dfff, active: 0xe8fdff, idleGlow: .32, activeGlow: .95, pulse: .12, pulseHz: 1.4, haloSize: 1.5 };
/** A white ring of light peaking at the ring's radius, for additive halo sprites (no canvas needed). */
function createHaloTexture(size = 128) {
  const data = new Uint8Array(size * size * 4), peak = 1 / NEON.haloSize;
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const r = Math.hypot(x + .5 - size / 2, y + .5 - size / 2) / (size / 2);
    const fall = r < peak ? (r - peak) / (peak * .32) : (r - peak) / (1 - peak) * 2.4;
    const glow = r >= 1 ? 0 : Math.exp(-fall * fall);
    const i = (y * size + x) * 4;
    data[i] = data[i + 1] = data[i + 2] = 255; data[i + 3] = Math.round(255 * glow);
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.magFilter = texture.minFilter = THREE.LinearFilter; texture.needsUpdate = true;
  return texture;
}

// What the answers ride on (a question set's `dressing`): neon rings or gold
// stars. Every shape lies in the ring's
// plane and fits inside its radius, so labels, lanes and halos stay the same.
export const DRESSINGS = {
  ring: { idle: NEON.idle, active: NEON.active, halo: NEON.idle },
  star: { idle: 0xffd35a, active: 0xfff6cf, halo: 0xffd35a },
};
const white = geometry => {
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(new Array(geometry.getAttribute('position').count * 3).fill(1), 3));
  return geometry;
};
function createStarGeometry() {
  const shape = new THREE.Shape(), outer = RING_RADIUS * 1.05, inner = RING_RADIUS * .5;
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? inner : outer, a = Math.PI / 2 + i * Math.PI / 5;
    if (i) shape.lineTo(Math.cos(a) * r, Math.sin(a) * r); else shape.moveTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  return white(new THREE.ShapeGeometry(shape));
}
/** A soft round glow for stardust. */
function createDotTexture(size = 64) {
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const r = Math.hypot(x + .5 - size / 2, y + .5 - size / 2) / (size / 2), i = (y * size + x) * 4;
    data[i] = data[i + 1] = data[i + 2] = 255; data[i + 3] = Math.round(255 * Math.max(0, 1 - r) ** 2);
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.magFilter = texture.minFilter = THREE.LinearFilter; texture.needsUpdate = true;
  return texture;
}
// Stardust: a short trail of glowing orbs in one lane, flying in ahead of the
// answers. Steering through collects them (session-only fun, nothing stored).
export const STARDUST = { offsets: [42, 38, 34], size: 2.4 };

export function createSolarArithmeticArea({ scene, isVisible }) {
  const group = new THREE.Group(); group.name = 'solar-arithmetic-area'; group.visible = false;
  const geometry = white(new THREE.TorusGeometry(RING_RADIUS, .18, 8, 64));
  const shapes = { ring: geometry, star: createStarGeometry() };
  const halo = createHaloTexture(), dot = createDotTexture();
  let active = null;
  const lanes = new THREE.Group(); lanes.name = 'solar-arithmetic-lanes'; lanes.visible = false;
  const strips = RUNNER.laneX.map(() => {
    const strip = new THREE.BufferGeometry();
    strip.setAttribute('position', new THREE.Float32BufferAttribute(new Array(12).fill(0), 3));
    // Brightest by the rocket, softer towards the rings (additive: darker is fainter).
    strip.setAttribute('color', new THREE.Float32BufferAttribute([1, 1, 1, 1, 1, 1, .35, .35, .35, .35, .35, .35], 3));
    strip.setIndex([0, 2, 1, 1, 2, 3]);
    const material = new THREE.MeshBasicMaterial({ color: 0x67dfff, vertexColors: true, transparent: true, opacity: LIGHT_LANES.faint,
      blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(strip, material); mesh.frustumCulled = false; mesh.renderOrder = -1;
    lanes.add(mesh);
    return mesh;
  });
  let laneGrid = null;
  const layLanes = grid => {
    if (laneGrid === grid) return;
    laneGrid = grid;
    strips.forEach((mesh, lane) => { mesh.geometry.getAttribute('position').array.set(laneStripPositions(lane, grid)); mesh.geometry.getAttribute('position').needsUpdate = true; mesh.geometry.computeBoundingSphere(); });
  };
  // Two sets of rings take turns: while the next sum's rings fade in far ahead,
  // the ones just flown through carry on past the rocket, so the flight never jumps.
  const makeWave = () => {
    const wave = new THREE.Group(); wave.position.set(0, ARITHMETIC_AREA.spawn.y, ARITHMETIC_AREA.spawn.z - RUNNER.startDistance); wave.visible = false;
    const rings = RUNNER.laneX.map(x => {
      const holder = new THREE.Group(); holder.position.x = x;
      const core = new THREE.MeshBasicMaterial({ color: NEON.idle, vertexColors: true, transparent: true, opacity: 1, side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(geometry, core);
      const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: halo, color: NEON.idle, transparent: true, opacity: 0,
        blending: THREE.AdditiveBlending, depthWrite: false }));
      glow.name = 'ring-glow'; glow.renderOrder = -1;
      holder.add(mesh, glow); wave.add(holder);
      return { holder, mesh, core, glow, label: null, passed: null };
    });
    const dust = STARDUST.offsets.map(offset => {
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: dot, color: 0xffe08a, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
      sprite.name = 'stardust'; sprite.visible = false; wave.add(sprite);
      return { sprite, offset, state: 'none' };
    });
    group.add(wave);
    return { wave, rings, dust, dustLane: 0, grid: false, opacity: 0, distance: RUNNER.startDistance, dressing: 'ring' };
  };
  let current = makeWave(), trailing = makeWave();
  group.add(lanes);
  scene.add(group);
  let disposed = false;
  const clearLabel = label => { label?.removeFromParent(); label?.material.map?.dispose(); label?.material.dispose(); };
  const unmark = ring => {
    if (!ring.passed) return;
    ring.mesh.material = ring.passed.base; ring.passed.material.dispose(); ring.passed = null; ring.holder.scale.setScalar(1);
  };
  /** Idle or active neon for one ring of the wave; `time` drives the active pulse. */
  const shine = (w, lane, isActive, time = 0) => {
    const ring = w.rings[lane];
    if (ring.passed) return;
    const pulse = isActive ? 1 + NEON.pulse * Math.sin(time * Math.PI * 2 * NEON.pulseHz) : 1;
    const look = DRESSINGS[w.dressing];
    ring.core.color.setHex(isActive ? look.active : look.idle);
    ring.glow.material.color.setHex(look.halo);
    ring.glow.material.opacity = w.opacity * (isActive ? NEON.activeGlow * (1 - NEON.pulse + NEON.pulse * pulse) : NEON.idleGlow);
    const size = RING_RADIUS * 2 * NEON.haloSize * (isActive ? pulse : 1);
    ring.glow.scale.set(size * (w.grid ? 2.6 : 1), size * (w.grid ? 1.4 : 1), 1);
  };
  const put = (w, distance) => {
    const { wave, rings, grid } = w;
    w.distance = distance;
    wave.position.z = ARITHMETIC_AREA.spawn.z - distance;
    // Perspective already brings the equation grid together in the distance.
    // Keep its full spacing so there is room to read all four calculations.
    const spread = grid ? 1 : crawlSpread(distance);
    rings.forEach((ring, lane) => {
      const point = arithmeticLanePoint(lane, grid);
      ring.holder.position.set(point.x * spread, point.y * spread, 0);
      ring.mesh.scale.x = grid ? 2.6 : 1;
      ring.mesh.scale.y = grid ? 1.4 : 1;
      // Keep the ring and its label inside their lane even near the vanishing
      // point. Spreading only the centres made the distant rings intersect.
      ring.holder.scale.setScalar(spread);
      // Meteors tumble and stars turn slowly as they come in.
      ring.mesh.rotation.set(0, 0, w.dressing === 'star' ? distance * .01 + lane * .4 : 0);
      if (ring.passed) {
        // A right ring swells as it flies past; its glow fades with the others.
        ring.holder.scale.multiplyScalar(ring.passed.correct ? 1 + Math.min(.6, Math.max(0, -distance) * .04) : 1);
        ring.passed.material.opacity = THREE.MathUtils.clamp(1 + distance / FADE_OUT, 0, 1);
        // Right: the halo turns gold and flares; wrong: it goes out.
        ring.glow.material.opacity = ring.passed.correct ? ring.passed.material.opacity * NEON.activeGlow : 0;
      }
    });
    // Fade in far ahead, fade out once passed.
    const opacity = THREE.MathUtils.clamp(Math.min(1 + distance / FADE_OUT, (RUNNER.startDistance - distance) / FADE_IN), 0, 1);
    w.opacity = opacity;
    rings.forEach((ring, lane) => {
      ring.core.opacity = opacity;
      if (ring.label) ring.label.material.opacity = opacity;
      shine(w, lane, w === current && lane === active);
    });
    w.dust.forEach(item => {
      if (item.state === 'none' || item.state === 'taken') { item.sprite.visible = false; return; }
      const ahead = distance - item.offset, spread = crawlSpread(ahead);
      item.sprite.position.set(arithmeticLanePoint(w.dustLane).x * spread, 0, item.offset);
      item.sprite.scale.setScalar(STARDUST.size * Math.max(.4, spread));
      item.sprite.material.opacity = THREE.MathUtils.clamp(Math.min(1 + ahead / 8, (RUNNER.startDistance - ahead) / FADE_IN), 0, 1);
      item.sprite.visible = item.sprite.material.opacity > 0;
    });
    wave.visible = opacity > 0 || w.dust.some(item => item.sprite.visible);
  };
  return {
    /** Show answers in reading order (two rows for equations). The last rings fly on behind. */
    setQuestion({ options, reverse, dressing = 'ring', flightActions }) {
      [current, trailing] = [trailing, current];
      current.grid = Boolean(reverse);
      current.dressing = DRESSINGS[dressing] && !reverse ? dressing : 'ring';
      current.rings.forEach((ring, lane) => { ring.mesh.geometry = shapes[flightActions && flightActions[lane].type !== 'collect' ? 'ring' : current.dressing]; });
      // Stardust only between number answers: the equation grid needs every lane clear.
      current.dustLane = Math.floor(Math.random() * RUNNER.laneX.length);
      current.dust.forEach(item => { item.state = current.grid || flightActions ? 'none' : 'waiting'; });
      layLanes(current.grid); lanes.visible = true;
      current.rings.forEach((ring, lane) => {
        unmark(ring); ring.holder.visible = true;
        clearLabel(ring.label); ring.label = createSolarLabel(String(options[lane]), 96, '#ffffff', reverse ? 'arithmetic' : 'planet');
        const fit = reverse
          ? Math.min(2.5, 20 / ring.label.scale.x, 10.4 / ring.label.scale.y)
          : Math.min(1.9, LABEL_WIDTH / ring.label.scale.x);
        ring.label.scale.multiplyScalar(fit); ring.holder.add(ring.label);
      });
    },
    /**
     * The rocket just flew through `lane`: gold if it was right, softly dimmed
     * if not.
     * Returns where it was, for the burst.
     */
    markPassed(lane, correct) {
      const ring = current.rings[lane];
      if (!ring || ring.passed) return null;
      const base = ring.mesh.material;
      const material = new THREE.MeshBasicMaterial({ color: correct ? 0xffd166 : 0x7d8aa3, vertexColors: true, transparent: true, opacity: base.opacity, side: THREE.DoubleSide });
      ring.mesh.material = material; ring.passed = { correct, base, material };
      ring.glow.material.color.setHex(correct ? 0xffd166 : NEON.idle);
      return { ...ring.holder.getWorldPosition(new THREE.Vector3()), dressing: current.dressing };
    },
    /**
     * Laser Blast: the answers not shot vanish (the scene pops them).
     * Returns where each one was.
     */
    clearOthers(lane) {
      return current.rings.filter((ring, i) => i !== lane && ring.holder.visible).map(ring => {
        const at = ring.holder.getWorldPosition(new THREE.Vector3());
        ring.holder.visible = false;
        return { x: at.x, y: at.y, z: at.z };
      });
    },
    /**
     * Stardust that has reached the rocket: taken if the rocket is in its lane,
     * otherwise it flies on past. Returns how many orbs were taken just now.
     */
    collectDust(lane) {
      let taken = 0;
      current.dust.forEach(item => {
        if (item.state !== 'waiting' || current.distance > item.offset) return;
        item.state = lane === current.dustLane ? 'taken' : 'missed';
        if (item.state === 'taken') taken++;
      });
      return taken;
    },
    /** Light up the lane and ring the rocket is heading for; `time` (seconds) pulses the ring. */
    highlight(lane, time = performance.now() / 1000) {
      active = lane;
      strips.forEach((mesh, i) => { mesh.material.opacity = i === lane ? LIGHT_LANES.bright : LIGHT_LANES.faint; });
      current.rings.forEach((_, i) => shine(current, i, i === lane, time));
    },
    /** `distance` ahead of the rocket and the passed rings' `trailDistance`, from the runner. */
    place(distance, trailDistance = RUNNER.passDistance) {
      put(current, distance); put(trailing, trailDistance);
    },
    update() { group.visible = isVisible(); },
    dispose() {
      if (disposed) return; disposed = true;
      group.removeFromParent(); [current, trailing].forEach(w => { w.rings.forEach(ring => { unmark(ring); clearLabel(ring.label); ring.core.dispose(); ring.glow.material.dispose(); }); w.dust.forEach(item => item.sprite.material.dispose()); });
      halo.dispose(); dot.dispose(); shapes.star.dispose();
      strips.forEach(mesh => { mesh.geometry.dispose(); mesh.material.dispose(); });
      geometry.dispose();
    },
  };
}
