/**
 * Pure shape data for "Geometry - Properties of Shapes".
 *
 * Statutory scope (docs/curriculum/year-2-maths.md): describe 2-D shapes
 * including the number of sides and LINE SYMMETRY IN A VERTICAL LINE; describe
 * 3-D shapes including edges, vertices and faces; identify 2-D shapes on the
 * surface of 3-D shapes; and compare and sort common shapes.
 *
 * Vertices are held as unit coordinates (0..1, y growing downwards to match
 * SVG) rather than as a picture. One list then draws the shape, marks its
 * corners and places the symmetry line, and a test can check that a shape
 * claiming five sides really has five corners.
 *
 * TWO DELIBERATE OMISSIONS, both because the answer is a convention rather
 * than a fact and a child should not be marked wrong for the other one:
 *   - the circle never appears in a "how many sides" question
 *   - the sphere, cylinder and cone never appear in a faces/edges/vertices
 *     count
 * They are still used for naming and for "which 2-D shape is on its surface".
 */

/** Regular polygon vertices, first point at the top, inside the unit box. */
function regular(sideCount) {
  return Array.from({ length: sideCount }, (_, i) => {
    const angle = (i / sideCount) * 2 * Math.PI - Math.PI / 2;
    return [
      Number((0.5 + 0.5 * Math.cos(angle)).toFixed(4)),
      Number((0.5 + 0.5 * Math.sin(angle)).toFixed(4)),
    ];
  });
}

export const SHAPES_2D = [
  { id: "circle", name: "circle", sides: 0, curved: true, verticalSymmetry: true },
  { id: "triangle", name: "triangle", sides: 3, vertices: [[0.5, 0], [1, 1], [0, 1]], verticalSymmetry: true },
  { id: "square", name: "square", sides: 4, vertices: [[0, 0], [1, 0], [1, 1], [0, 1]], verticalSymmetry: true },
  { id: "rectangle", name: "rectangle", sides: 4, vertices: [[0, 0.2], [1, 0.2], [1, 0.8], [0, 0.8]], verticalSymmetry: true },
  { id: "pentagon", name: "pentagon", sides: 5, vertices: regular(5), verticalSymmetry: true },
  { id: "hexagon", name: "hexagon", sides: 6, vertices: regular(6), verticalSymmetry: true },
  { id: "octagon", name: "octagon", sides: 8, vertices: regular(8), verticalSymmetry: true },
  { id: "rhombus", name: "rhombus", sides: 4, vertices: [[0.5, 0], [1, 0.5], [0.5, 1], [0, 0.5]], verticalSymmetry: true },
  { id: "trapezium", name: "trapezium", sides: 4, vertices: [[0.25, 0.2], [0.75, 0.2], [1, 0.8], [0, 0.8]], verticalSymmetry: true },
  // The "no symmetry" cases. Without these the symmetry challenge would have
  // the same answer every time.
  { id: "right-triangle", name: "right-angled triangle", sides: 3, vertices: [[0, 0], [0, 1], [1, 1]], verticalSymmetry: false },
  { id: "scalene-triangle", name: "triangle", sides: 3, vertices: [[0.2, 0], [1, 0.7], [0, 1]], verticalSymmetry: false },
  { id: "parallelogram", name: "parallelogram", sides: 4, vertices: [[0.25, 0.2], [1, 0.2], [0.75, 0.8], [0, 0.8]], verticalSymmetry: false },
];

export const SOLIDS = [
  { id: "cube", name: "cube", faces: 6, edges: 12, vertices: 8, faceShapes: ["square"] },
  { id: "cuboid", name: "cuboid", faces: 6, edges: 12, vertices: 8, faceShapes: ["rectangle"] },
  { id: "square-pyramid", name: "square-based pyramid", faces: 5, edges: 8, vertices: 5, faceShapes: ["square", "triangle"] },
  { id: "triangular-prism", name: "triangular prism", faces: 5, edges: 9, vertices: 6, faceShapes: ["triangle", "rectangle"] },
  // Curved: named and sorted, never counted. See the note above.
  { id: "sphere", name: "sphere", curved: true, faceShapes: ["circle"] },
  { id: "cylinder", name: "cylinder", curved: true, faceShapes: ["circle"] },
  { id: "cone", name: "cone", curved: true, faceShapes: ["circle"] },
];

export function findShape(id) {
  return SHAPES_2D.find((s) => s.id === id);
}

export function findSolid(id) {
  return SOLIDS.find((s) => s.id === id);
}

/** Shapes whose sides can be counted without arguing about curves. */
export function sideCountableShapes() {
  return SHAPES_2D.filter((s) => !s.curved);
}

/** Solids whose faces, edges and vertices have one agreed answer. */
export function countableSolids() {
  return SOLIDS.filter((s) => !s.curved);
}

/** Unit vertices scaled to `size`, as an SVG `points` attribute. */
export function polygonPoints(shape, size) {
  return shape.vertices
    .map(([x, y]) => `${x * size},${y * size}`)
    .join(" ");
}
