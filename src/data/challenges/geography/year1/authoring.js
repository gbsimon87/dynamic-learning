// Year 1 helpers: facts, distractors and evidence are authored in the banks.
// Pictures use the "y1" visual type (components/challenge/geography/Year1Drawing.jsx).
import { visual, sort as sortQ, ordered, lesson } from "../year3/authoring.js";

export { lesson, ordered };
export const topic = (lessons, activity) => ({ year: 1, lessons, ...(activity ? { activity } : {}) });

/** A Year 1 picture. `alt` is the full text equivalent; `lines` are the evidence read beside it. */
export const pic = (art, title, alt, lines, extra = {}) => visual("y1", title, alt, lines, { art, ...extra });

/** Picture cards: `[sprite, label?, code?]`. A hidden label keeps a "which picture?" question honest. */
export const cards = (title, items, alt, lines = [], extra = {}) =>
  pic("cards", title, alt, lines, { items: items.map(([s, label, code]) => ({ s, ...(label ? { label } : {}), ...(code ? { code } : {}) })), ...extra });

/** Three-option choice rows: [prompt, answer, wrong, wrong, hint?]. */
export const ask = (rows, v, sources, hint = "Look closely at the picture.") =>
  rows.map(([prompt, answer, wrong1, wrong2, h]) => ({ prompt, answer, wrong: [wrong1, wrong2], visual: v, sources, hint: h ?? hint, evidence: [v.alt] }));

export const sort = (prompt, bins, items, v, sources, hint = "Read each card. Then read the two headings.") => sortQ(prompt, bins, items, v, sources, hint);
