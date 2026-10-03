// Fixed, reviewed drawing geometry. All callouts point to rendered features;
// leaf width varies by structure rather than colour. No remote SVG content.
export function plantGeometry(diagram) {
  const topX = diagram.form === "bending" ? 180 : 160;
  const leafWidth = { broad: 44, narrow: 18, small: 25, rounded: 36 }[diagram.leafShape] ?? 44;
  return {
    topX, leafWidth, woody: diagram.form === "woody", branching: diagram.form === "branching",
    stemPath: `M160 258 Q${topX} 170 ${topX} 70`,
    upperJoin: { x: .3025 * 160 + .6975 * topX, y: 176.37 },
    anchors: { roots: { x: 182, y: 310 }, stem: { x: .49 * 160 + .51 * topX, y: 204.12 }, leaves: { x: 200, y: 150 }, flowers: { x: topX, y: 60 } },
  };
}
export const PLANT_FEATURES = {
  roots: "branching shapes below the soil",
  stem: "upright stalk between the soil and the bloom",
  leaves: "flat shapes attached beside the stalk",
  flowers: "bloom with petals above the stalk",
};
