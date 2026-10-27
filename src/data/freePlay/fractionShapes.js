/**
 * Geometry for Fraction Fun: every shape is cut into equal parts and drawn as
 * one SVG path per part. Pure, so the equal-area claim is unit-tested.
 *
 * Bars and grids are rectangles. A circle is cut into sectors. A regular
 * polygon is cut into wedges from its centre, each side shared equally, so the
 * part count must be a multiple of the polygon's sides; each shape lists the
 * counts it supports.
 */

const SIZE = 300;
const CENTER = SIZE / 2;
const RADIUS = 140;
const CELL = 60;

/** [cols, rows] for each part count a grid can show. */
export const GRID_LAYOUT = { 4: [2, 2], 6: [3, 2], 8: [4, 2], 9: [3, 3], 10: [5, 2], 12: [4, 3] };

const POLYGON_SIDES = { triangle: 3, square: 4, hexagon: 6 };

/** Part counts each shape supports at each level (1 = ages 6-7, 3 = ages 11+). */
export const SHAPES = {
  bar: { label: "chocolate bar", counts: { 1: [2, 3, 4], 2: [2, 3, 4, 5, 6, 8, 10], 3: [4, 6, 8, 9, 10, 12] } },
  circle: { label: "pizza", counts: { 1: [2, 3, 4], 2: [2, 3, 4, 5, 6, 8, 10], 3: [4, 6, 8, 9, 10, 12] } },
  grid: { label: "tray", counts: { 1: [4], 2: [4, 6, 8, 9, 10], 3: [4, 6, 8, 9, 10, 12] } },
  triangle: { label: "triangle", counts: { 1: [3], 2: [3, 6, 9], 3: [6, 9, 12] } },
  square: { label: "square", counts: { 1: [4], 2: [4, 8], 3: [4, 8, 12] } },
  hexagon: { label: "hexagon", counts: { 1: [], 2: [6], 3: [6, 12] } },
};

const fmt = (n) => Number(n.toFixed(2));

function rectPath(x, y, w, h) {
  return `M${fmt(x)} ${fmt(y)}H${fmt(x + w)}V${fmt(y + h)}H${fmt(x)}Z`;
}

const point = (angle, r) => [CENTER + r * Math.cos(angle), CENTER + r * Math.sin(angle)];

function sectorPath(from, to) {
  const [x1, y1] = point(from, RADIUS);
  const [x2, y2] = point(to, RADIUS);
  const large = to - from > Math.PI ? 1 : 0;
  return `M${CENTER} ${CENTER}L${fmt(x1)} ${fmt(y1)}A${RADIUS} ${RADIUS} 0 ${large} 1 ${fmt(x2)} ${fmt(y2)}Z`;
}

/**
 * Wedge `m` of `k` on edge `edge` of a regular polygon. Every wedge has the
 * same height (the apothem) and an equal share of one edge as its base, so all
 * are equal in area. Equal angles would not be: the edge is nearer the centre
 * at its middle than at its corners.
 */
function wedgePath(sides, edge, m, k) {
  const step = (2 * Math.PI) / sides;
  const [ax, ay] = point(-Math.PI / 2 + edge * step, RADIUS);
  const [bx, by] = point(-Math.PI / 2 + (edge + 1) * step, RADIUS);
  const at = (t) => `${fmt(ax + (bx - ax) * t)} ${fmt(ay + (by - ay) * t)}`;
  return `M${CENTER} ${CENTER}L${at(m / k)}L${at((m + 1) / k)}Z`;
}

/** Whether `type` can be drawn with `parts` equal parts. */
export function supportsParts(type, parts) {
  if (type === "bar" || type === "circle") return parts >= 2;
  if (type === "grid") return Boolean(GRID_LAYOUT[parts]);
  return parts % POLYGON_SIDES[type] === 0;
}

/**
 * The drawing of `parts` equal parts: `{ width, height, paths }`, one path per
 * part in a fixed order. Throws for a count the shape cannot cut equally.
 */
export function shapeParts(type, parts) {
  if (!SHAPES[type] || !supportsParts(type, parts)) {
    throw new RangeError(`${type} cannot be cut into ${parts} equal parts`);
  }
  if (type === "bar") {
    const w = SIZE / parts;
    return { width: SIZE, height: 90, paths: Array.from({ length: parts }, (_, i) => rectPath(i * w, 0, w, 90)) };
  }
  if (type === "grid") {
    const [cols, rows] = GRID_LAYOUT[parts];
    return {
      width: cols * CELL,
      height: rows * CELL,
      paths: Array.from({ length: parts }, (_, i) => rectPath((i % cols) * CELL, Math.floor(i / cols) * CELL, CELL, CELL)),
    };
  }
  if (type === "circle") {
    const step = (2 * Math.PI) / parts;
    const start = -Math.PI / 2;
    return {
      width: SIZE,
      height: SIZE,
      paths: Array.from({ length: parts }, (_, i) => sectorPath(start + i * step, start + (i + 1) * step)),
    };
  }
  const sides = POLYGON_SIDES[type];
  const k = parts / sides;
  return {
    width: SIZE,
    height: SIZE,
    paths: Array.from({ length: parts }, (_, i) => wedgePath(sides, Math.floor(i / k), i % k, k)),
  };
}
