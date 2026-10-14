/**
 * Bix's lessons for Year 2 Fractions, one per challenge slot. Each one teaches
 * exactly what that challenge asks (see the challenge files in
 * src/pages/skills/math/challenges/year2/<topic>/ and fractions.js).
 * Only 1/2, 1/3, 1/4, 2/4 and 3/4 appear, as the Year 2 programme allows.
 */
const many = (emoji, n) => Array.from({ length: n }, () => emoji);

export const FRACTIONS_LESSONS = {
  "what-is-a-fraction": [
    {
      title: "Name the coloured part",
      lines: ["Count all the equal parts. That number goes on the bottom.", "Count the coloured parts. That number goes on top.", "Asked what is NOT coloured? Count the white parts."],
      example: { type: "bar", title: "Look at this bar", bars: [{ parts: 3, shaded: 1 }], note: "1 of 3 equal parts is coloured: 1/3." },
    },
    {
      title: "2/4 is the same as 1/2",
      lines: ["Line the 2 bars up.", "See where the colour stops on each one.", "Same stopping place means the same amount."],
      example: { type: "bar", title: "Halves and quarters", bars: [{ parts: 2, shaded: 1 }, { parts: 4, shaded: 2 }], note: "The colour stops in the same place." },
    },
    {
      title: "Bigger bottom, smaller pieces",
      lines: ["A bigger bottom number cuts more pieces.", "More pieces means each piece is smaller.", "So 1/4 is smaller than 1/2."],
      example: { type: "bar", title: "1 piece of each", bars: [{ parts: 2, shaded: 1 }, { parts: 3, shaded: 1 }, { parts: 4, shaded: 1 }], note: "1/4 is the smallest. 1/2 is the biggest." },
    },
    {
      title: "Write the missing number",
      lines: ["The bottom number is how many equal parts.", "The top number is how many parts are coloured.", "1/2 of 4 parts is 2 parts."],
      example: { type: "bar", title: "What fraction is coloured?", bars: [{ parts: 3, shaded: 1 }], note: "3 equal parts, 1 coloured, so 1/3." },
    },
  ],
  "fractions-of-numbers": [
    {
      title: "Take 1 equal row",
      lines: ["The bottom number tells you how many equal rows.", "1/2 means 2 rows. 1/4 means 4 rows.", "Count the dots in 1 row."],
      example: { type: "groups", title: "1/2 of 8", groups: [many("🍓", 4), many("🍓", 4)], label: "8 strawberries in 2 equal rows of 4", note: "1 row has 4, so 1/2 of 8 is 4." },
    },
    {
      title: "2/4 of a number is 1/2",
      lines: ["2/4 and 1/2 are the same amount.", "So 2/4 of a number is half of it.", "2 quarters is 1 quarter + 1 quarter."],
      example: { type: "steps", title: "1/4 of 4 is 1", steps: ["2/4 of 4 is 1 + 1 = 2.", "1/2 of 4 is 2 too.", "So 2/4 of 4 = 1/2 of 4."] },
    },
    {
      title: "Count in fractions",
      lines: ["You can count up in quarters or halves.", "4 quarters make 1 whole. 2 halves make 1 whole.", "1 2/4 is the same as 1 1/2."],
      example: { type: "jumps", title: "Counting in quarters", terms: ["1", "1 1/4", "1 2/4", "1 3/4", "2"], step: "+1/4", note: "After 3/4 comes the next whole number." },
    },
    {
      title: "Finish the statement",
      lines: ["Read the fraction and the number.", "Divide by the bottom, then take the top.", "Write the answer after the = sign."],
      example: { type: "steps", title: "1/2 of 30 = ?", steps: ["30 ÷ 2 = 15.", "So 1/2 of 30 = 15.", "2/4 of 30 is 15 too."] },
    },
  ],
  "finding-fractions-of-larger-groups": [
    {
      title: "Share the set out",
      lines: ["The bottom number says how many equal groups.", "Share the objects out 1 at a time.", "Count how many are in 1 group."],
      example: { type: "groups", title: "1/3 of 6 cherries", groups: [many("🍒", 2), many("🍒", 2), many("🍒", 2)], label: "6 cherries in 3 equal groups of 2", note: "1 group has 2, so 1/3 of 6 is 2." },
    },
    {
      title: "A fraction of an amount",
      lines: ["Find 1 part first: halve, halve again, or share in 3.", "For 3/4, add 3 of those parts.", "Keep the unit, like cm, ml or p."],
      example: { type: "steps", title: "3/4 of 12 cm", steps: ["Half of 12 is 6. Half of 6 is 3.", "So 1/4 of 12 cm is 3 cm.", "3 + 3 + 3 = 9, so 3/4 is 9 cm."] },
    },
    {
      title: "Check both numbers",
      lines: ["Each card has a different fraction and number.", "Work out every card before you move it.", "Put the smallest answer first."],
      example: { type: "table", title: "Smallest answer first", headers: ["Card", "Answer"], rows: [["3/4 of 8", "6"], ["1/3 of 27", "9"], ["1/2 of 22", "11"]], note: "Look at the answers, not just the fractions." },
    },
    {
      title: "Taken or left over?",
      lines: ["Find the fraction of the amount first.", "Read the question again carefully.", "If it asks what is left, take it away."],
      example: { type: "steps", title: "20 slices, 1/4 eaten", steps: ["1/4 of 20 is 5, so 5 are eaten.", "20 − 5 = 15.", "15 slices are left."] },
    },
  ],
};
