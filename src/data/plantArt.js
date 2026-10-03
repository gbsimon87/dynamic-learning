/**
 * Geometry for the illustrated Plants diagrams (docs/science-curriculum/
 * PLANT_DIAGRAMS_PLAN.md). Pure, so the label anchors are tested: every label
 * must point at a drawn part.
 *
 * The scene is 360 × 340 SVG units, like the classic PlantFigure. The plant
 * stands at x = 150 on the soil line; labels go in a column on the right.
 */
export const SOIL_Y = 250;
export const BASE_X = 150;
export const LABEL_X = 280;

// Leaf outlines, base at (0, 0), pointing along +x. Width is the half-width.
const LEAVES = {
  broad: { length: 58, width: 24, count: 4 },
  narrow: { length: 64, width: 10, count: 4 },
  small: { length: 32, width: 12, count: 6 },
  rounded: { length: 42, width: 30, count: 4 },
};

/** An SVG path for one leaf of the given shape, in leaf-local units. */
export function leafPath(shape) {
  const { length: l, width: w } = LEAVES[shape] ?? LEAVES.broad;
  const round = shape === "rounded";
  return `M0 0 C${l * 0.2} ${-w * (round ? 1.1 : 0.9)} ${l * (round ? 0.9 : 0.75)} ${-w * (round ? 1.05 : 0.7)} ${l} 0 C${l * (round ? 0.9 : 0.75)} ${w * (round ? 1.05 : 0.7)} ${l * 0.2} ${w * (round ? 1.1 : 0.9)} 0 0Z`;
}

/** The side veins of a leaf (and its midrib), in leaf-local units. */
export function veinPath(shape) {
  const { length: l, width: w } = LEAVES[shape] ?? LEAVES.broad;
  const veins = [0.3, 0.5, 0.7].map((t) => `M${l * t} 0 L${l * (t + 0.14)} ${-w * 0.45} M${l * t} 0 L${l * (t + 0.14)} ${w * 0.45}`).join(" ");
  return `M${l * 0.04} 0 L${l * 0.9} 0 ${shape === "narrow" ? "" : veins}`;
}

const r1 = (v) => Math.round(v * 10) / 10;
const quad = (p0, c, p1) => (t) => ({
  x: (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * c.x + t ** 2 * p1.x,
  y: (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * c.y + t ** 2 * p1.y,
});
const curve = (p0, c, p1) => `M${r1(p0.x)} ${r1(p0.y)} Q${r1(c.x)} ${r1(c.y)} ${r1(p1.x)} ${r1(p1.y)}`;

/**
 * A herbaceous flowering plant: stem, side branches, leaves and blooms, with
 * label anchors. `form` is straight, bending or branching; the woody form is
 * the rendered tree instead (see treePlacement).
 */
export function plantShape(form, leafShape) {
  const base = { x: BASE_X, y: SOIL_Y };
  const top = form === "bending" ? { x: 192, y: 84 } : { x: BASE_X, y: 82 };
  const control = form === "bending" ? { x: 150, y: 150 } : { x: BASE_X, y: 166 };
  const at = quad(base, control, top);
  const stems = [curve(base, control, top)];
  const blooms = [{ x: top.x, y: top.y - 18, size: 64 }];
  if (form === "branching") {
    for (const [t, end, size] of [[0.48, { x: 96, y: 128 }, 44], [0.64, { x: 206, y: 116 }, 44]]) {
      const from = at(t);
      const bend = { x: (from.x + end.x) / 2, y: from.y - 6 };
      stems.push(curve(from, bend, end));
      blooms.push({ x: end.x, y: end.y - 14, size });
    }
  }
  const { count } = LEAVES[leafShape] ?? LEAVES.broad;
  // Leaves alternate sides, below any branches, angled upwards.
  const span = form === "branching" ? [0.14, 0.42] : [0.16, 0.62];
  const leaves = Array.from({ length: count }, (_, i) => {
    const t = span[0] + ((span[1] - span[0]) * i) / Math.max(1, count - 1);
    const p = at(t);
    const right = i % 2 === 0;
    return { x: r1(p.x), y: r1(p.y), angle: right ? -32 : -148, right };
  });
  const rightLeaves = leaves.filter((leaf) => leaf.right);
  const labelLeaf = rightLeaves[rightLeaves.length - 1];
  const { length } = LEAVES[leafShape] ?? LEAVES.broad;
  const rad = (labelLeaf.angle * Math.PI) / 180;
  const stemAt = at(0.08);
  const bloom = blooms[0];
  const leafCentre = (leaf) => {
    const a = (leaf.angle * Math.PI) / 180;
    return { x: r1(leaf.x + Math.cos(a) * length * 0.5), y: r1(leaf.y + Math.sin(a) * length * 0.5) };
  };
  return {
    stems,
    blooms,
    leaves,
    // Points inside the parts, for marks such as dye dots.
    stemPoints: [0.12, 0.3, 0.48, 0.66, 0.84].map((t) => { const p = at(t); return { x: r1(p.x), y: r1(p.y) }; }),
    leafCentres: leaves.map(leafCentre),
    anchors: {
      roots: ROOTS_ANCHOR(BASE_X, 120),
      stem: { x: r1(stemAt.x + 4), y: r1(stemAt.y) },
      leaves: { x: r1(labelLeaf.x + Math.cos(rad) * length * 0.62), y: r1(labelLeaf.y + Math.sin(rad) * length * 0.62) },
      flowers: { x: r1(bloom.x + bloom.size * 0.38), y: r1(bloom.y) },
    },
  };
}

/*
 * The Bioicons root system, cropped from its plant drawing to the roots only.
 * CROP is in the source's own units (viewBox 0 0 294 336.2); CROWN is where
 * the roots meet the stem; RIGHT_ROOT is a point on a right-hand side root.
 */
export const ROOTS = {
  file: { width: 294, height: 336.2 },
  crop: { x: 50, y: 80, width: 190, height: 254 },
  crown: { x: 151, y: 80 },
  rightRoot: { x: 200, y: 135 },
  depth: 84,
};

/** Where to draw the roots for a plant whose stem meets the soil at baseX. */
export function rootsPlacement(baseX, width) {
  const sx = width / ROOTS.crop.width;
  const sy = ROOTS.depth / ROOTS.crop.height;
  return { x: r1(baseX - (ROOTS.crown.x - ROOTS.crop.x) * sx), y: SOIL_Y, width, height: ROOTS.depth, sx, sy };
}

function ROOTS_ANCHOR(baseX, width) {
  const p = rootsPlacement(baseX, width);
  return { x: r1(p.x + (ROOTS.rightRoot.x - ROOTS.crop.x) * p.sx), y: r1(p.y + (ROOTS.rightRoot.y - ROOTS.crop.y) * p.sy) };
}

/**
 * The rendered flowering tree, standing on the soil line with its trunk base
 * at BASE_X. `tree` is ez-tree/tree.json. Returns the image box and anchors.
 */
export function treePlacement(tree, height = 226) {
  const width = (height * tree.width) / tree.height;
  const x = BASE_X - tree.anchors.base.x * width;
  const y = SOIL_Y - tree.anchors.base.y * height;
  const map = (a) => ({ x: r1(x + a.x * width), y: r1(y + a.y * height) });
  return {
    image: { x: r1(x), y: r1(y), width: r1(width), height },
    anchors: {
      roots: ROOTS_ANCHOR(BASE_X, 130),
      stem: map(tree.anchors.trunk),
      leaves: map(tree.anchors.leaves),
      flowers: map(tree.anchors.blossom),
    },
    // Dye dots run up the middle of the bare trunk, from the soil to the fork.
    trunkLine: [0.12, 0.32, 0.52, 0.72, 0.92].map((t) => map({
      x: tree.anchors.base.x + (tree.anchors.fork.x - tree.anchors.base.x) * t,
      y: tree.anchors.base.y + (tree.anchors.fork.y - tree.anchors.base.y) * t,
    })),
  };
}
