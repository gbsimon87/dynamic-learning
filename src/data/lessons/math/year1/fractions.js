/**
 * Bix's lessons for Year 1 Fractions, one per challenge slot. Each one teaches
 * exactly what that challenge asks (see the challenge files in
 * src/pages/skills/math/challenges/year1/<topic>/ and year1Math/groupsFractions.js).
 * Year 1 says "a half" and "a quarter" in words; bars carry word labels, not 1/2.
 */
const many = (emoji, n) => Array.from({ length: n }, () => emoji);

export const FRACTIONS_LESSONS = {
  "finding-a-half": [
    {
      title: "Halves are the same size",
      lines: ["A half is 1 of 2 equal parts.", "Both parts must be the same size.", "Look for the fair cut."],
      example: { type: "bar", title: "Cut into 2 equal parts", bars: [{ parts: 2, shaded: 1, label: "a half" }], note: "Same size parts, so 1 part is a half." },
    },
    {
      title: "Name the shaded part",
      lines: ["Count the equal parts in the strip.", "2 equal parts? 1 part is a half.", "4 equal parts? 1 part is a quarter."],
      example: { type: "bar", title: "Count the parts first", bars: [{ parts: 2, shaded: 1, label: "a half" }, { parts: 4, shaded: 1, label: "a quarter" }], note: "More parts means smaller parts." },
    },
    {
      title: "Shade one half",
      lines: ["The strip is cut into 2 equal parts.", "Tap just 1 part to shade it.", "1 of 2 equal parts is a half."],
      example: { type: "bar", title: "One half shaded", bars: [{ parts: 2, shaded: 1, label: "a half" }], note: "1 part shaded. The other part stays white." },
    },
    {
      title: "Half of a group",
      lines: ["Share the things into 2 equal groups.", "Give 1 to each, again and again.", "1 group is half."],
      example: { type: "groups", title: "Half of 6", groups: [many("🍪", 3), many("🍪", 3)], label: "6 cookies in 2 equal groups of 3", note: "Half of 6 is 3." },
    },
  ],
  "finding-a-quarter": [
    {
      title: "Quarters are the same size",
      lines: ["A quarter is 1 of 4 equal parts.", "All 4 parts must be the same size.", "Count the parts. Are they all equal?"],
      example: { type: "bar", title: "Cut into 4 equal parts", bars: [{ parts: 4, shaded: 1, label: "a quarter" }], note: "4 same size parts, so 1 is a quarter." },
    },
    {
      title: "Half or quarter?",
      lines: ["Count the equal parts in the strip.", "4 equal parts? 1 part is a quarter.", "2 equal parts? 1 part is a half."],
      example: { type: "bar", title: "Count the parts first", bars: [{ parts: 4, shaded: 1, label: "a quarter" }, { parts: 2, shaded: 1, label: "a half" }], note: "4 parts means quarters." },
    },
    {
      title: "Shade one quarter",
      lines: ["The strip is cut into 4 equal parts.", "Tap just 1 part to shade it.", "1 of 4 equal parts is a quarter."],
      example: { type: "bar", title: "One quarter shaded", bars: [{ parts: 4, shaded: 1, label: "a quarter" }], note: "1 part shaded. The other 3 stay white." },
    },
    {
      title: "A quarter of a group",
      lines: ["Share the things into 4 equal groups.", "Give 1 to each, again and again.", "1 group is a quarter."],
      example: { type: "groups", title: "A quarter of 8", groups: [many("🍪", 2), many("🍪", 2), many("🍪", 2), many("🍪", 2)], label: "8 cookies in 4 equal groups of 2", note: "A quarter of 8 is 2." },
    },
  ],
};
