import { geographyQuestionSpeech } from "../speech.js";

/** Tally options must be distinguishable when speech skips punctuation. */
export function year2GeographyQuestionSpeech(q, context) {
  if (!q.options) return geographyQuestionSpeech(q, context);
  return geographyQuestionSpeech({
    ...q,
    options: q.options.map(option => {
      const value = String(option).trim();
      if (!/^\|(?:\s*\|)*$/.test(value)) return option;
      const count = (value.match(/\|/g) ?? []).length;
      return `${count} tally ${count === 1 ? "mark" : "marks"}`;
    }),
  }, context);
}
