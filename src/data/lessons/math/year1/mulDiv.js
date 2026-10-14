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
      title: "Count equal groups",
      lines: ["Every group has the same number.", "Count 1 group first.", "Count on that many for each group."],
      example: { type: "groups", title: "3 bags of 4 apples", groups: [many("🍎", 4), many("🍎", 4), many("🍎", 4)], label: "3 bags with 4 apples in each", note: "Count 4, 8, 12. There are 12." },
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
      title: "Make equal groups",
      lines: ["Count out 1 group.", "Keep going until none are left.", "Count how many groups you made."],
      example: { type: "steps", title: "Put 8 apples into bags of 2", steps: ["Count out 2. That is 1 bag.", "Keep going until none are left.", "There are 4 bags."] },
    },
    {
      title: "Count up in groups",
      lines: ["Every group is the same size.", "Start at 0. Add 1 group each jump.", "Fill the missing totals."],
      example: { type: "jumps", title: "Groups of 2", terms: ["0", "2", "4", "6", "8"], step: "+2", note: "4 groups of 2 make 8." },
    },
    {
      title: "Share or make groups?",
      lines: ["Share between children? Find how many each.", "Groups of a number? Find how many groups.", "Read the question carefully."],
      example: { type: "table", title: "What do I find?", headers: ["Question", "Find"], rows: [["Share 8 between 2", "how many each"], ["Put 8 into bags of 2", "how many bags"]] },
    },
  ],
  "doubling-small-quantities": [
    {
      title: "Double means 2 the same",
      lines: ["Double means 2 equal groups.", "Both groups have the same number.", "Count both groups together."],
      example: { type: "groups", title: "Double 3", groups: [many("🐟", 3), many("🐟", 3)], label: "2 groups of 3 fish", note: "Count them all: there are 6." },
    },
    {
      title: "Double, and back again",
      lines: ["To double, add the number to itself.", "Double 7 is 7 + 7 = 14.", "Doubled to make 14? It was 7."],
      example: { type: "table", title: "Both ways", headers: ["Question", "Think"], rows: [["Double 6", "6 + 6 = 12"], ["Doubled to make 12?", "6 + 6 = 12, so 6"]] },
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
