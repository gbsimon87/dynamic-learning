/** Small data helpers; all facts and supporting reasoning remain authored in each bank. */
export const visual = (type, title, alt, lines = [], extra = {}) => ({ type, title, alt, lines, ...extra });
export const record = (lines, title = "Evidence to explore") => visual("record", title, lines.join(" "), lines);
export const c = (prompt, answer, wrong1, wrong2, v, sources, hint = "Look again at the labelled evidence.", evidence = [v.alt]) =>
  ({ prompt, answer, wrong: [wrong1, wrong2], visual: v, sources, hint, evidence });
export const sort = (prompt, bins, cards, v, sources, hint = "Read each card and the two headings.") =>
  ({ kind: "sort", prompt, bins, cards, visual: v, sources, hint, evidence: [v.alt] });
export const ordered = (prompt, labels, v, sources, hint = "Find the named starting point. Follow the arrows.") =>
  ({ kind: "order", prompt, labels, visual: v, sources, hint, evidence: [v.alt] });
export const lesson = (lines, v, bank) => ({ notes: { lines, visual: v }, bank });
export const topic = (lessons, activity) => ({ year: 3, lessons, ...(activity ? { activity } : {}) });
