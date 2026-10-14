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
      lines: ["A half is 1 of 2 equal parts.", "Count the parts. There must be 2.", "Both parts must be the same size."],
      example: { type: "bar", title: "Cut into 2 equal parts", bars: [{ parts: 2, shaded: 1, label: "a half" }], note: "Same size parts, so 1 part is a half." },
    },
    {
      title: "How much is shaded?",
      lines: ["1 of 2, or 2 of 4, is a half.", "1 of 4 equal parts is a quarter.", "All of it shaded is a whole."],
      example: { type: "bar", title: "Count the parts first", bars: [{ parts: 2, shaded: 1, label: "a half" }, { parts: 4, shaded: 2, label: "a half" }, { parts: 4, shaded: 1, label: "a quarter" }, { parts: 2, shaded: 2, label: "a whole" }], note: "Count all the parts, then the shaded ones." },
    },
    {
      title: "Shade a half",
      lines: ["Count all the equal parts.", "Half of them is a half.", "8 parts? Shade 4. 6 parts? Shade 3."],
      example: { type: "bar", title: "A half of 8 parts", bars: [{ parts: 8, shaded: 4, label: "a half" }], note: "4 shaded and 4 white. Same both sides." },
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
      lines: ["A quarter is 1 of 4 equal parts.", "Count the parts. There must be 4.", "All 4 parts must be the same size."],
      example: { type: "bar", title: "Cut into 4 equal parts", bars: [{ parts: 4, shaded: 1, label: "a quarter" }], note: "4 same size parts, so 1 is a quarter." },
    },
    {
      title: "Quarter, half or whole?",
      lines: ["1 of 4 equal parts is a quarter.", "1 of 2, or 2 of 4, is a half.", "All of it shaded is a whole."],
      example: { type: "bar", title: "Count the parts first", bars: [{ parts: 4, shaded: 1, label: "a quarter" }, { parts: 4, shaded: 2, label: "a half" }, { parts: 4, shaded: 4, label: "a whole" }], note: "Count all the parts, then the shaded ones." },
    },
    {
      title: "Shade a quarter",
      lines: ["Split the parts into 4 equal groups.", "Shade 1 group.", "8 parts? Shade 2. 12 parts? Shade 3."],
      example: { type: "bar", title: "A quarter of 8 parts", bars: [{ parts: 8, shaded: 2, label: "a quarter" }], note: "4 groups of 2. Shade 1 group." },
    },
    {
      title: "A quarter of a group",
      lines: ["Share the things into 4 equal groups.", "Give 1 to each, again and again.", "1 group is a quarter."],
      example: { type: "groups", title: "A quarter of 8", groups: [many("🍪", 2), many("🍪", 2), many("🍪", 2), many("🍪", 2)], label: "8 cookies in 4 equal groups of 2", note: "A quarter of 8 is 2." },
    },
  ],
};
