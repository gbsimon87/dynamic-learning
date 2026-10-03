// Authored poses, not a simulation or a diagnostic model.
export const MOVEMENT_POSES = {
  straight: { label: "Straight arm", angle: 0, front: "longer", back: "shorter" },
  half: { label: "Partly bent arm", angle: 55, front: "between", back: "between" },
  bent: { label: "Bent arm", angle: 105, front: "shorter", back: "longer" },
};
export function movementGeometry(pose) {
  const model = MOVEMENT_POSES[pose];
  if (!model) throw new RangeError("Unknown movement pose");
  const radians = model.angle * Math.PI / 180;
  return { elbow: { x: 160, y: 170 }, hand: { x: 160 + 95 * Math.sin(radians), y: 170 + 95 * Math.cos(radians) },
    frontHeight: pose === "bent" ? 48 : pose === "half" ? 65 : 82,
    backHeight: pose === "straight" ? 48 : pose === "half" ? 65 : 82 };
}
