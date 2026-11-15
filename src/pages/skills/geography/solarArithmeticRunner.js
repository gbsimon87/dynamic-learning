// The Arithmetic Area's lane runner: plain data, no Three.js. The rocket flies
// forward on its own; the child only moves between four lanes. The answer
// rings start far ahead and close in slowly; when they reach the rocket, the
// lane it is in is its answer. There is no way to miss all four rings.
export const RUNNER = { laneX: [-18, -6, 6, 18], startDistance: 110, approachSeconds: 12, laneSpeed: 6, passDistance: -30, turbo: 3 };
export const EQUATION_GRID = { laneX: [-12, 12, -12, 12], laneY: [7, 7, -7, -7], approachSeconds: 20 };

export function arithmeticLanePoint(lane, grid = false, config = RUNNER) {
  return { x: grid ? EQUATION_GRID.laneX[lane] : config.laneX[lane], y: grid ? EQUATION_GRID.laneY[lane] : 0 };
}

/** Four-way steering stops at a grid edge; it never wraps to another row. */
export function steerArithmeticLane(lane, direction, grid = false) {
  if (!grid) return Math.max(0, Math.min(3, lane + ({ left: -1, right: 1 }[direction] ?? 0)));
  const row = Math.floor(lane / 2), column = lane % 2;
  return ({ left: row * 2, right: row * 2 + 1, up: column, down: 2 + column })[direction] ?? lane;
}

export function createArithmeticRunner(config = RUNNER) {
  let grid = false, lane = 1, x = config.laneX[1], y = 0, distance = config.startDistance, trail = config.passDistance, armed = false;
  return {
    /**
     * A new round: rings far ahead again. The rocket keeps its lane, and the
     * rings it just flew through carry on behind it (`trailDistance`).
     */
    reset({ grid: nextGrid = false } = {}) { grid = nextGrid; trail = distance <= 0 ? distance : config.passDistance; distance = config.startDistance; armed = true; },
    setLane(next) { if (Number.isInteger(next)) lane = Math.max(0, Math.min(config.laneX.length - 1, next)); },
    /**
     * Advance; returns the answered lane once, the moment the rings reach the rocket.
     * `boost` speeds up only the approach (Turbo), never the lane glide.
     */
    step(dt, boost = 1) {
      if (!(dt > 0)) return null;
      const target = arithmeticLanePoint(lane, grid, config);
      const glide = 1 - Math.exp(-config.laneSpeed * dt);
      x += (target.x - x) * glide;
      y += (target.y - y) * glide;
      const speed = config.startDistance / (grid ? EQUATION_GRID.approachSeconds : config.approachSeconds);
      const travel = speed * Math.max(1, boost) * dt;
      distance = Math.max(config.passDistance, distance - travel);
      trail = Math.max(config.passDistance, trail - travel);
      if (armed && distance <= 0) {
        armed = false;
        let nearest = 0;
        const gap = i => { const p = arithmeticLanePoint(i, grid, config); return Math.hypot(p.x - x, p.y - y); };
        config.laneX.forEach((_, i) => { if (gap(i) < gap(nearest)) nearest = i; });
        return nearest;
      }
      return null;
    },
    get x() { return x; },
    get y() { return y; },
    get lane() { return lane; },
    get distance() { return distance; },
    get trailDistance() { return trail; },
  };
}
