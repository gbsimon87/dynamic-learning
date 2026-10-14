/**
 * Bix's lessons for Year 1 Multiplication and Division, one per challenge slot.
 * Each one teaches exactly what that challenge asks (see the challenge files in
 * src/pages/skills/math/challenges/year1/<topic>/ and year1Math/groupsFractions.js).
 * Year 1 works with objects, pictures and arrays, so no × or ÷ signs appear.
 */
const many = (emoji, n) => Array.from({ length: n }, () => emoji);

export const MUL_DIV_LESSONS = {
  "equal-groups-and-arrays": [
    {
      title: "Count the rows",
      lines: ["Every row has the same number.", "Count 1 row first.", "Count on the same again for each row."],
      example: { type: "groups", title: "2 rows of 4", groups: [many("🔵", 4), many("🔵", 4)], label: "2 rows of 4 dots", note: "Count 4, then 8. There are 8." },
    },
    {
      title: "Count on in equal jumps",
      lines: ["Find how many are in 1 row.", "Count on that many for every row.", "The last number is how many altogether."],
      example: { type: "groups", title: "3 rows of 5", groups: [many("⭐", 5), many("⭐", 5), many("⭐", 5)], label: "3 rows of 5 stars", note: "Count 5, 10, 15. There are 15." },
    },
    {
      title: "Fill the running totals",
      lines: ["Start at 0.", "Add 1 row for each jump.", "Every jump adds the same number."],
      example: { type: "jumps", title: "Rows of 3", terms: ["0", "3", "6", "9", "12"], step: "+3", note: "4 rows of 3 make 12." },
    },
    {
      title: "Each one has the same",
      lines: ["Each means every one has the same.", "Count how many children.", "Count on the same for each child."],
      example: { type: "steps", title: "3 bags. Each has 4 sweets.", steps: ["There are 3 bags.", "Count 4 for each bag: 4, 8, 12.", "There are 12 sweets altogether."] },
    },
  ],
  "sharing-and-grouping": [
    {
      title: "Share it out fairly",
      lines: ["Fair means everyone gets the same.", "Give 1 each, again and again.", "Count what 1 child has."],
      example: { type: "groups", title: "Share 6 between 2", groups: [many("🍓", 3), many("🍓", 3)], label: "2 equal groups of 3 strawberries", note: "Each child gets 3." },
    },
    {
      title: "Share or make groups?",
      lines: ["Share between children? Find how many each.", "Groups of a number? Find how many groups.", "Read the question carefully."],
      example: { type: "table", title: "What do I find?", headers: ["Question", "Find"], rows: [["Share 8 between 2", "how many each"], ["Put 8 in groups of 2", "how many groups"]] },
    },
    {
      title: "Count up in groups",
      lines: ["Every group is the same size.", "Start at 0. Add 1 group each jump.", "Fill the missing totals."],
      example: { type: "jumps", title: "Groups of 2", terms: ["0", "2", "4", "6", "8"], step: "+2", note: "4 groups of 2 make 8." },
    },
    {
      title: "Make equal groups",
      lines: ["Share: give 1 each until none are left.", "Groups of: count out groups until none are left.", "Then type how many."],
      example: { type: "steps", title: "Put 12 in groups of 3", steps: ["Count out 3. That is 1 group.", "Keep going until none are left.", "There are 4 groups."] },
    },
  ],
  "doubling-small-quantities": [
    {
      title: "Double means 2 the same",
      lines: ["Double means 2 equal groups.", "Both groups have the same number.", "Count both groups together."],
      example: { type: "groups", title: "Double 3", groups: [many("🐟", 3), many("🐟", 3)], label: "2 groups of 3 fish", note: "Count them all: there are 6." },
    },
    {
      title: "Add it to itself",
      lines: ["To double, add the number to itself.", "Double 6 is 6 + 6.", "Count on from the first one."],
      example: { type: "equation", title: "Double 7", parts: ["7", "+", "7", "=", "14"], note: "Count on 7 from 7." },
    },
    {
      title: "Double and its adding fact",
      lines: ["Double is a number added to itself.", "One group, then the same again.", "Both answers are the same number."],
      example: { type: "steps", title: "Start with 4", steps: ["Double 4 is 8.", "4 + 4 = 8.", "Same answer both times."] },
    },
    {
      title: "Same number means double",
      lines: ["The same number means double.", "Add the number to itself.", "Type the total."],
      example: { type: "steps", title: "Sam has 6 cars. Jo has the same.", steps: ["The same number means double.", "6 + 6 = 12.", "They have 12 cars altogether."] },
    },
  ],
};
