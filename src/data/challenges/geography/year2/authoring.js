// Year 2 helpers: facts, distractors and evidence are authored in the banks.
export { visual, record, c, sort, ordered, lesson } from "../year3/authoring.js";
export const topic = (lessons, activity) => ({ year: 2, lessons, ...(activity ? { activity } : {}) });
export const choices = (rows, visual, sources, hint = "Look again at the labels and evidence.") =>
  rows.map(([prompt, answer, wrong1, wrong2]) => ({ prompt, answer, wrong: [wrong1, wrong2], visual, sources, hint, evidence: [visual.alt] }));
