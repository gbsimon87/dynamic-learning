import { assertLevel, shuffle } from "./random.js";

/**
 * Shape Explorer — endless "what shape is this?" with four name choices, for
 * flat (2D) shapes and solid (3D) shapes. Each level has its OWN shapes, so
 * moving up shows something new rather than the same shapes plus a few more.
 *
 *   2D  1 Easier — everyday shapes: circle, square, triangle, rectangle, star, heart
 *       2 Medium — oval, diamond, polygons up to 8 sides, half and moon shapes, trapezium
 *       3 Harder — the kinds of triangle and quadrilateral, 7-12 sided polygons,
 *                  ellipse, sector, lens
 *   3D  1 Easier — cube, cuboid, sphere, cylinder, cone, square pyramid
 *       2 Medium — prism, pyramid, hemisphere and torus
 *       3 Harder — the regular solids, frustum, bipyramid
 *
 * TWO SHAPES THAT BOTH FIT ONE DRAWING WOULD MARK A CORRECT CHILD WRONG. A
 * rhombus is also a parallelogram; every triangle drawn is "a triangle".
 * `alsoCounts` lists the other names a drawing legitimately has, and `group`
 * puts names that cannot be told apart by sight (the triangle kinds) in one
 * bucket. A shape is never offered next to a name that also fits it.
 *
 * One convention is kept on purpose: square and rectangle, circle and oval
 * count as different shapes, as in the Year 1-2 programme of study, where a
 * rectangle is drawn longer than it is tall and an oval is not a circle.
 *
 * Left out on purpose: megagon, icosagon and hendecagon (not countable by eye),
 * prismatoid and antiprism (no picture a child could name), and the Möbius
 * strip and Klein bottle (surfaces, not solids).
 *
 * Pure: `rng` is a parameter and nothing loops without a bound.
 */

export const LEVELS = [
  { id: 1, label: "🌱 Easier" },
  { id: 2, label: "🌿 Medium" },
  { id: 3, label: "🌳 Harder" },
];

export const KINDS = [
  { id: "2d", label: "2D shapes" },
  { id: "3d", label: "3D shapes" },
];

const triangle = (id, name) => ({ id, name, group: "triangle" });

/** `id` is also the key ShapeArt draws. */
const BANK = {
  "2d": {
    1: [
      { id: "circle", name: "Circle" },
      { id: "square", name: "Square" },
      { id: "triangle", name: "Triangle", group: "triangle" },
      { id: "rectangle", name: "Rectangle" },
      { id: "star", name: "Star" },
      { id: "heart", name: "Heart" },
    ],
    2: [
      { id: "oval", name: "Oval" },
      // A diamond is a rhombus, and a trapezium on the "at least one pair" rule.
      { id: "diamond", name: "Diamond", alsoCounts: ["trapezium"] },
      { id: "pentagon", name: "Pentagon" },
      { id: "hexagon", name: "Hexagon" },
      { id: "octagon", name: "Octagon" },
      { id: "semicircle", name: "Semicircle" },
      { id: "crescent", name: "Crescent" },
      { id: "trapezium", name: "Trapezium" },
    ],
    3: [
      triangle("equilateral-triangle", "Equilateral triangle"),
      triangle("isosceles-triangle", "Isosceles triangle"),
      triangle("scalene-triangle", "Scalene triangle"),
      triangle("right-angled-triangle", "Right-angled triangle"),
      triangle("acute-triangle", "Acute triangle"),
      triangle("obtuse-triangle", "Obtuse triangle"),
      { id: "parallelogram", name: "Parallelogram", alsoCounts: ["rhombus"] },
      { id: "rhombus", name: "Rhombus", alsoCounts: ["parallelogram", "kite"] },
      { id: "kite", name: "Kite" },
      { id: "heptagon", name: "Heptagon" },
      { id: "nonagon", name: "Nonagon" },
      { id: "decagon", name: "Decagon" },
      { id: "dodecagon", name: "Dodecagon" },
      { id: "ellipse", name: "Ellipse" },
      { id: "sector", name: "Sector" },
      { id: "lens", name: "Lens" },
    ],
  },
  "3d": {
    1: [
      { id: "cube", name: "Cube" },
      { id: "cuboid", name: "Cuboid" },
      { id: "sphere", name: "Sphere" },
      { id: "cylinder", name: "Cylinder" },
      { id: "cone", name: "Cone" },
      { id: "square-pyramid", name: "Square pyramid" },
    ],
    2: [
      { id: "triangular-prism", name: "Triangular prism" },
      { id: "triangular-pyramid", name: "Triangular pyramid" },
      { id: "hexagonal-prism", name: "Hexagonal prism" },
      { id: "hemisphere", name: "Hemisphere" },
      { id: "torus", name: "Torus" },
    ],
    3: [
      { id: "tetrahedron", name: "Tetrahedron" },
      // An octahedron is a square bipyramid.
      { id: "octahedron", name: "Octahedron", alsoCounts: ["bipyramid"] },
      { id: "dodecahedron", name: "Dodecahedron" },
      { id: "icosahedron", name: "Icosahedron" },
      { id: "frustum", name: "Frustum" },
      { id: "bipyramid", name: "Bipyramid", alsoCounts: ["octahedron"] },
    ],
  },
};

export const CHOICE_COUNT = 4;

function assertKind(kind) {
  if (!BANK[kind]) throw new RangeError(`Unknown shape kind: ${kind}`);
}

/** The shapes dealt at one level of one kind. */
export function shapesForLevel(level, kind = "2d") {
  assertLevel(level);
  assertKind(kind);
  return BANK[kind][level];
}

/** True when `a` and `b` could both be right for the same drawing. */
export function sameDrawing(a, b) {
  return (
    a.id === b.id ||
    Boolean(a.alsoCounts?.includes(b.id)) ||
    Boolean(b.alsoCounts?.includes(a.id)) ||
    Boolean(a.group && a.group === b.group)
  );
}

export function makeShapeQuestion(rng, level, kind = "2d") {
  const bank = shapesForLevel(level, kind);
  const shape = bank[Math.min(bank.length - 1, Math.floor(rng() * bank.length))];
  const wrong = shuffle(bank.filter((s) => !sameDrawing(s, shape)), rng).slice(0, CHOICE_COUNT - 1);
  const options = shuffle([shape, ...wrong], rng);
  const noun = kind === "3d" ? "3D shape" : "shape";
  return {
    key: `${kind}:${shape.id}`,
    kind,
    level,
    shape,
    options,
    prompt: `What ${noun} is this?`,
    speech: `What ${noun} is this? Is it a ${options.map((o) => o.name.toLowerCase()).join(", a ")}?`,
  };
}
