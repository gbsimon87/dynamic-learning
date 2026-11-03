import { choice, story, topic } from "../year2/authoring.js";
export { sort, order } from "../year2/authoring.js";

// Timelines are read-only labels. Children order them and place events, but never calculate with dates.
export const GREEK_TIMELINE = {
  earlierBands: ["Stone Age to Iron Age Britain", "Ancient Egypt"],
  bands: ["Greek city-states · about 800 BC", "Olympic Games · 776 BC", "Athens democracy · about 508 BC", "Persian Wars · 490–479 BC", "Parthenon · 447–432 BC", "Alexander · 336–323 BC", "Romans rule Greece · 146 BC"],
};
export const MAYA_TIMELINE = {
  earlierBands: ["Roman Britain"],
  bands: ["Maya villages · from about 2000 BC", "Classic Maya cities · AD 250–900", "Southern cities decline · AD 800–900", "Chichen Itza thrives · about AD 900–1100", "Spanish arrive · 1500s"],
};
export const LONG_TIMELINE = {
  bands: ["Skara Brae · about 3100 BC", "Egyptian pyramids · about 2600 BC", "Olympic Games · 776 BC", "Athens democracy · about 508 BC", "Alexander · 336–323 BC", "Romans invade Britain · AD 43", "Maya cities rise · AD 250", "Romans leave · about AD 410", "Lindisfarne raid · AD 793", "Chichen Itza thrives · about AD 900", "Norman Conquest · 1066"],
};

// A lesson is one story card, six facts that each cite their own sentence, and one structure round.
// rows: [sentence, question, answer, wrong1, wrong2]. `extra` may carry { scene } or a timeline.
export function lesson(picture, pictureLabel, rows, structure, timeline = false, scene) {
  const card = story(rows.map(([line]) => line), picture, pictureLabel);
  if (scene) card.scene = scene;
  if (timeline) card.timeline = timeline;
  const visual = timeline ? { type: "timeline", timeline } : scene ? { type: "scene", scene } : undefined;
  return [card, rows.map(([line, prompt, answer, w1, w2]) =>
    choice(prompt, answer, [w1, w2], line, visual ? { visual } : {})), [structure]];
}
// Source summaries are never presented as original quotations.
export function detective(lines, rows, visual = {}) {
  const { scene, picture, pictureLabel } = visual;
  const card = { lines, scene, picture: picture ?? "🔎", pictureLabel: pictureLabel ?? "Examining historical evidence" };
  const roundVisual = scene ? { type: "scene", scene } : undefined;
  return [card, rows.map(([prompt, answer, w1, w2, evidence]) =>
    choice(prompt, answer, [w1, w2], evidence, roundVisual ? { visual: roundVisual } : {}))];
}
export function year5Topic(references, levels) {
  return { ...topic(references, levels), year: 5 };
}
