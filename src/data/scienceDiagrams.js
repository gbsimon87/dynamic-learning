/**
 * Which drawing style the Science diagrams use.
 *
 * "illustrated" uses the third-party artwork listed in
 * src/assets/science/manifest.json (see docs/PROJECT_KNOWLEDGE.md,
 * "Year 3 Science"). "classic" uses the original hand-built SVG
 * `*Figure` components, which stay as the fallback: an illustration whose
 * image fails to load also falls back to its classic figure on its own.
 */
export const DIAGRAM_STYLE = "illustrated";

export const isIllustrated = () => DIAGRAM_STYLE === "illustrated";

/**
 * Lays label callouts down the right of a picture: each label sits level with
 * its anchor unless that would crowd the one above, in which case it moves
 * down by `gap`. Pure, so the spacing is tested.
 *
 * @param {Array<{ id: string, y: number }>} anchors in picture units
 * @returns {Record<string, number>} label y per id
 */
export function spreadLabels(anchors, gap = 30) {
  const placed = {};
  let last = -Infinity;
  for (const anchor of [...anchors].sort((a, b) => a.y - b.y)) {
    const y = Math.max(anchor.y, last + gap);
    placed[anchor.id] = y;
    last = y;
  }
  return placed;
}

/**
 * A muscle belly as a lens between two points: swelling mostly to one side
 * (`side` 1 bulges towards +x, the front of the arm; −1 towards −x, the back)
 * and only a little towards the bone it lies along. `bulge` is the half-width;
 * a contracted muscle gets a bigger one. Returns an SVG path.
 */
export function lensPath(start, end, bulge, side = 1) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.hypot(dx, dy) || 1;
  let nx = -dy / length;
  let ny = dx / length;
  if (Math.sign(nx || 1) !== Math.sign(side)) { nx = -nx; ny = -ny; }
  const mx = (start.x + end.x) / 2;
  const my = (start.y + end.y) / 2;
  const outer = { x: mx + nx * bulge * 2, y: my + ny * bulge * 2 };
  const inner = { x: mx - nx * bulge * 0.5, y: my - ny * bulge * 0.5 };
  const r = (v) => Math.round(v * 10) / 10;
  return `M${r(start.x)} ${r(start.y)} Q${r(outer.x)} ${r(outer.y)} ${r(end.x)} ${r(end.y)} Q${r(inner.x)} ${r(inner.y)} ${r(start.x)} ${r(start.y)}Z`;
}
