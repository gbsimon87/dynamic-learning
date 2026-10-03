/**
 * Which drawing style the Science diagrams use.
 *
 * "illustrated" uses the third-party artwork listed in
 * src/assets/science/manifest.json (see docs/science-curriculum/
 * DIAGRAM_ASSETS_PLAN.md). "classic" uses the original hand-built SVG
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
