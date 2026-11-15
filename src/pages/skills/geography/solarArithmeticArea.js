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

export function createSolarArithmeticArea({ scene, isVisible }) {
  const group = new THREE.Group(); group.name = 'solar-arithmetic-area'; group.visible = false;
  const geometry = new THREE.TorusGeometry(RING_RADIUS, .18, 8, 64);
  // Two sets of rings take turns: while the next sum's rings fade in far ahead,
  // the ones just flown through carry on past the rocket, so the flight never jumps.
  const makeWave = () => {
    const wave = new THREE.Group(); wave.position.set(0, ARITHMETIC_AREA.spawn.y, ARITHMETIC_AREA.spawn.z - RUNNER.startDistance); wave.visible = false;
    const material = new THREE.MeshBasicMaterial({ color: 0x67dfff, transparent: true, opacity: 1 });
    const rings = RUNNER.laneX.map(x => {
      const holder = new THREE.Group(); holder.position.x = x;
      const mesh = new THREE.Mesh(geometry, material);
      holder.add(mesh); wave.add(holder);
      return { holder, mesh, label: null, passed: null };
    });
    group.add(wave);
    return { wave, material, rings, grid: false };
  };
  let current = makeWave(), trailing = makeWave();
  scene.add(group);
  let disposed = false;
  const clearLabel = label => { label?.removeFromParent(); label?.material.map?.dispose(); label?.material.dispose(); };
  const unmark = ring => {
    if (!ring.passed) return;
    ring.mesh.material = ring.passed.base; ring.passed.material.dispose(); ring.passed = null; ring.holder.scale.setScalar(1);
  };
  const put = ({ wave, material, rings, grid }, distance) => {
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
      if (ring.passed) {
        // A right ring swells as it flies past; its glow fades with the others.
        ring.holder.scale.multiplyScalar(ring.passed.correct ? 1 + Math.min(.6, Math.max(0, -distance) * .04) : 1);
        ring.passed.material.opacity = THREE.MathUtils.clamp(1 + distance / FADE_OUT, 0, 1);
      }
    });
    // Fade in far ahead, fade out once passed.
    const opacity = THREE.MathUtils.clamp(Math.min(1 + distance / FADE_OUT, (RUNNER.startDistance - distance) / FADE_IN), 0, 1);
    material.opacity = opacity;
    rings.forEach(ring => { if (ring.label) ring.label.material.opacity = opacity; });
    wave.visible = opacity > 0;
  };
  return {
    /** Show answers in reading order (two rows for equations). The last rings fly on behind. */
    setQuestion({ options, reverse }) {
      [current, trailing] = [trailing, current];
      current.grid = Boolean(reverse);
      current.rings.forEach((ring, lane) => {
        unmark(ring);
        clearLabel(ring.label); ring.label = createSolarLabel(String(options[lane]), 96, '#ffffff', reverse ? 'arithmetic' : 'planet');
        const fit = reverse
          ? Math.min(2.5, 20 / ring.label.scale.x, 10.4 / ring.label.scale.y)
          : Math.min(1.9, LABEL_WIDTH / ring.label.scale.x);
        ring.label.scale.multiplyScalar(fit); ring.holder.add(ring.label);
      });
    },
    /** The rocket just flew through `lane`: gold if it was right, softly dimmed if not. */
    markPassed(lane, correct) {
      const ring = current.rings[lane];
      if (!ring || ring.passed) return;
      const base = ring.mesh.material;
      const material = new THREE.MeshBasicMaterial({ color: correct ? 0xffd166 : 0x7d8aa3, transparent: true, opacity: base.opacity });
      ring.mesh.material = material; ring.passed = { correct, base, material };
    },
    /** `distance` ahead of the rocket and the passed rings' `trailDistance`, from the runner. */
    place(distance, trailDistance = RUNNER.passDistance) {
      put(current, distance); put(trailing, trailDistance);
    },
    update() { group.visible = isVisible(); },
    dispose() {
      if (disposed) return; disposed = true;
      group.removeFromParent(); [current, trailing].forEach(w => { w.rings.forEach(ring => { unmark(ring); clearLabel(ring.label); }); w.material.dispose(); });
      geometry.dispose();
    },
  };
}
