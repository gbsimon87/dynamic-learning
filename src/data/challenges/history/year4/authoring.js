import { choice, story, topic } from "../year2/authoring.js";
export { sort, order } from "../year2/authoring.js";

export const YEAR4_TIMELINE = {
  earlierBands: ["Stone Age", "Bronze Age", "Iron Age", "Roman Britain"],
  bands: ["Romans leave · about AD 410", "Anglo-Saxon kingdoms", "Lindisfarne raid · AD 793", "Great army · AD 865", "Alfred · AD 871–899", "Athelstan · AD 927", "Cnut · AD 1016", "Edward · AD 1042–1066"],
};
export function lesson(picture, pictureLabel, rows, structure, timeline = false) {
  const card = story(rows.map(([line]) => line), picture, pictureLabel);
  if (timeline) card.timeline = YEAR4_TIMELINE;
  const visual = timeline ? { type: "timeline", timeline: YEAR4_TIMELINE } : undefined;
  return [card, rows.map(([line, prompt, answer, w1, w2]) =>
    choice(prompt, answer, [w1, w2], line, visual ? { visual } : {})), [structure]];
}
// Source summaries are never presented as original quotations.
export function detective(lines, rows, visual) {
  const { image, scene, picture, pictureLabel } = visual;
  const card = { lines, image, scene, picture: picture ?? "🔎", pictureLabel: pictureLabel ?? "Examining historical evidence" };
  const roundVisual = image ? { type: "source", image } : scene ? { type: "scene", scene } : undefined;
  return [card, rows.map(([prompt, answer, w1, w2, evidence]) =>
    choice(prompt, answer, [w1, w2], evidence, roundVisual ? { visual: roundVisual } : {}))];
}
export function year4Topic(references, levels) {
  return { ...topic(references, levels), year: 4 };
}
