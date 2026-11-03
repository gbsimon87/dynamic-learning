/** Four independently authored worked examples, one for each challenge slot.
 * The explanation beside each example becomes the third, slot-specific tip.
 * Examples are teaching material, never generated from the learner's questions.
 */
export function topicLessons(title, tips, examples) {
  return examples.map(({ note, ...example }) => ({ title, lines: [...tips, note], example }));
}

export const sentence = (title, text, note) => ({ type: "sentence", title, text, note });
export const fix = (title, wrong, right, note) => ({ type: "fix", title, wrong, right, note });
export const table = (title, headers, rows, note) => ({ type: "table", title, headers, rows, note });
export const equation = (title, parts, note) => ({ type: "equation", title, parts, note });
export const steps = (title, items, note) => ({ type: "steps", title, steps: items, note });
export const jumps = (title, terms, step, note) => ({ type: "jumps", title, terms, ...(step ? { step } : {}), note });
export const bar = (title, bars, note) => ({ type: "bar", title, bars, note });
export const diagram = (title, kind, label, data, note) => ({ type: "diagram", title, kind, label, ...data, note });
