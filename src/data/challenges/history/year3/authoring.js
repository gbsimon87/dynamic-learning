import { choice, story, photoStory, topic } from "../year2/authoring.js";
export { sort, order } from "../year2/authoring.js";

// Each row is an authored sentence, question, answer and two near-misses.
// Keeping the sentence beside the question makes the child's evidence explicit.
export function lesson(picture, label, rows, structure, bands) {
  const card = story(rows.map(([line]) => line), picture, label);
  if (bands) card.timeline = { bands };
  const visual = bands ? { type: "timeline", timeline: { bands } } : undefined;
  return [card, rows.map(([line, prompt, answer, ...wrong]) =>
    choice(prompt, answer, wrong, line, visual ? { visual } : {})), [structure]];
}
export function source(image, lines, rows) {
  return [photoStory(lines, image), rows.map(([prompt, answer, w1, w2, evidence]) =>
    choice(prompt, answer, [w1, w2], evidence, { visual: { type: "source", image } }))];
}
export function year3Topic(references, levels) {
  return { ...topic(references, levels), year: 3 };
}
