/**
 * Flat-faced solids for Shape Explorer, held as VERTICES ONLY.
 *
 * The faces of a convex solid are fixed by its corners, so `hullFaces` finds
 * them (every set of coplanar corners with the rest all on one side). One short
 * list per solid then draws it from any angle, and a test can check the face
 * counts and Euler's formula rather than trusting hand-typed face lists.
 *
 * Curved solids (sphere, cylinder, cone, hemisphere, torus) have no corners and
 * are drawn by hand in ShapeArt.jsx.
 *
 * Model space: x right, y up, z towards the viewer.
 */

const PHI = (1 + Math.sqrt(5)) / 2;
const EPS = 1e-6;

const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const length = (a) => Math.sqrt(dot(a, a));
const scale = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
const unit = (a) => scale(a, 1 / length(a));

/** n corners round the y axis at height y. */
function ring(n, radius, y, offset = 0) {
  return Array.from({ length: n }, (_, i) => {
    const angle = offset + (i / n) * 2 * Math.PI;
    return [radius * Math.cos(angle), y, radius * Math.sin(angle)];
  });
}

function box(hx, hy, hz) {
  return [-1, 1].flatMap((x) => [-1, 1].flatMap((y) => [-1, 1].map((z) => [x * hx, y * hy, z * hz])));
}

/** Every even permutation of (0, ±a, ±b): the icosahedron/dodecahedron pattern. */
function cyclic(a, b) {
  const out = [];
  for (const s of [-1, 1]) {
    for (const t of [-1, 1]) {
      out.push([0, s * a, t * b], [s * a, t * b, 0], [t * b, 0, s * a]);
    }
  }
  return out;
}

export const SOLID_VERTICES = {
  cube: box(1, 1, 1),
  cuboid: box(1.45, 0.8, 0.85),
  "square-pyramid": [...[-1, 1].flatMap((x) => [-1, 1].map((z) => [x, -0.9, z])), [0, 1.1, 0]],
  "triangular-prism": [
    ...[-1.35, 1.35].flatMap((z) => [[-1.05, -0.85, z], [1.05, -0.85, z], [0, 0.95, z]]),
  ],
  "triangular-pyramid": [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]],
  tetrahedron: [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]],
  "hexagonal-prism": [...ring(6, 1, -0.95), ...ring(6, 1, 0.95)],
  frustum: [
    ...[-1.2, 1.2].flatMap((x) => [-1.2, 1.2].map((z) => [x, -0.9, z])),
    ...[-0.55, 0.55].flatMap((x) => [-0.55, 0.55].map((z) => [x, 0.9, z])),
  ],
  octahedron: [[1.3, 0, 0], [-1.3, 0, 0], [0, 1.3, 0], [0, -1.3, 0], [0, 0, 1.3], [0, 0, -1.3]],
  // A hexagonal bipyramid: two six-sided pyramids base to base. (The square
  // one is the octahedron, so drawing that here would make two names for one
  // picture.)
  bipyramid: [...ring(6, 1, 0), [0, 1.35, 0], [0, -1.35, 0]],
  icosahedron: cyclic(1, PHI),
  dodecahedron: [...box(1, 1, 1), ...cyclic(1 / PHI, PHI)],
};

/**
 * The faces of the convex hull of `vertices`: [{ ids, normal }] with `ids`
 * ordered round the face and `normal` pointing out of the solid.
 */
export function hullFaces(vertices) {
  const centre = scale(
    vertices.reduce((sum, v) => [sum[0] + v[0], sum[1] + v[1], sum[2] + v[2]], [0, 0, 0]),
    1 / vertices.length,
  );
  const found = new Map();

  for (let i = 0; i < vertices.length; i += 1) {
    for (let j = i + 1; j < vertices.length; j += 1) {
      for (let k = j + 1; k < vertices.length; k += 1) {
        const raw = cross(sub(vertices[j], vertices[i]), sub(vertices[k], vertices[i]));
        if (length(raw) < EPS) continue;
        const normal = unit(raw);
        const offset = dot(normal, vertices[i]);

        let above = false;
        let below = false;
        const ids = [];
        for (let m = 0; m < vertices.length; m += 1) {
          const side = dot(normal, vertices[m]) - offset;
          if (side > EPS) above = true;
          else if (side < -EPS) below = true;
          else ids.push(m);
        }
        if (above && below) continue; // not a face of the hull

        const key = ids.join(",");
        if (found.has(key)) continue;
        // The hull lies on one side; the outward direction is the other.
        const outward = above ? scale(normal, -1) : normal;
        found.set(key, { ids, normal: outward });
      }
    }
  }

  return [...found.values()].map(({ ids, normal }) => {
    const middle = scale(
      ids.reduce((sum, id) => [sum[0] + vertices[id][0], sum[1] + vertices[id][1], sum[2] + vertices[id][2]], [0, 0, 0]),
      1 / ids.length,
    );
    const u = unit(sub(vertices[ids[0]], middle));
    const w = cross(normal, u);
    const angle = (id) => {
      const d = sub(vertices[id], middle);
      return Math.atan2(dot(d, w), dot(d, u));
    };
    return { ids: [...ids].sort((a, b) => angle(a) - angle(b)), normal };
  }).filter((face) => dot(face.normal, sub(vertices[face.ids[0]], centre)) > -EPS);
}

/** Corners, edges and faces of a solid, for tests and for Euler's formula. */
export function solidCounts(id) {
  const vertices = SOLID_VERTICES[id];
  const faces = hullFaces(vertices);
  const edges = new Set();
  for (const { ids } of faces) {
    ids.forEach((a, i) => {
      const b = ids[(i + 1) % ids.length];
      edges.add(a < b ? `${a}-${b}` : `${b}-${a}`);
    });
  }
  return { vertices: vertices.length, edges: edges.size, faces: faces.length };
}

const YAW = (-35 * Math.PI) / 180;
const PITCH = (24 * Math.PI) / 180;
const LIGHT = unit([-0.5, 0.8, 0.7]);
const FIT = 104;
const BOX = 120;

const cache = new Map();

/**
 * The faces a viewer sees, as SVG polygon points in a 120 x 120 box, each with
 * a `tone` (-1 dark .. 1 lit) for shading. Faces turned away are dropped; a
 * convex solid's visible faces never overlap, so no depth sort is needed.
 */
export function drawSolid(id) {
  if (cache.has(id)) return cache.get(id);
  const vertices = SOLID_VERTICES[id];
  if (!vertices) throw new RangeError(`Unknown solid: ${id}`);

  const cy = Math.cos(YAW);
  const sy = Math.sin(YAW);
  const cp = Math.cos(PITCH);
  const sp = Math.sin(PITCH);
  const view = ([x, y, z]) => {
    const x1 = x * cy + z * sy;
    const z1 = -x * sy + z * cy;
    return [x1, y * cp - z1 * sp, y * sp + z1 * cp];
  };

  const screen = vertices.map((v) => {
    const [x, y] = view(v);
    return [x, -y];
  });
  const xs = screen.map((p) => p[0]);
  const ys = screen.map((p) => p[1]);
  const [minX, maxX, minY, maxY] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const k = Math.min(FIT / (maxX - minX), FIT / (maxY - minY));
  const place = ([x, y]) => [
    BOX / 2 + (x - (minX + maxX) / 2) * k,
    BOX / 2 + (y - (minY + maxY) / 2) * k,
  ];

  const faces = hullFaces(vertices)
    .map((face) => ({ ...face, view: view(face.normal) }))
    .filter((face) => face.view[2] > 0.02)
    .map((face) => ({
      points: face.ids.map((i) => place(screen[i]).map((n) => n.toFixed(1)).join(",")).join(" "),
      tone: dot(face.view, LIGHT),
    }));

  cache.set(id, faces);
  return faces;
}
