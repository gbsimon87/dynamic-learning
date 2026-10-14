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
      lines: ["Count all the equal parts. That number goes on the bottom.", "Count the coloured parts. That number goes on top.", "Check both numbers before you choose."],
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
      title: "How many parts to colour?",
      lines: ["The last word says how many equal parts.", "The first word says how many to colour.", "Half a bar is the same amount, however many parts."],
      example: { type: "table", title: "Fraction words", headers: ["Word", "Equal parts"], rows: [["half", "2"], ["third", "3"], ["quarter", "4"]], note: "The bar already shows the bottom number for you." },
    },
  ],
  "fractions-of-numbers": [
    {
      title: "Take 1 equal row",
      lines: ["The bottom number tells you how many equal rows.", "1/2 means 2 rows. 1/4 means 4 rows.", "Count the dots in 1 row."],
      example: { type: "groups", title: "1/2 of 8", groups: [many("🍓", 4), many("🍓", 4)], label: "8 strawberries in 2 equal rows of 4", note: "1 row has 4, so 1/2 of 8 is 4." },
    },
    {
      title: "Divide, then take the top",
      lines: ["Divide by the bottom number to find 1 part.", "The top number says how many parts to take.", "For 3/4, take 3 parts."],
      example: { type: "steps", title: "3/4 of 8", steps: ["8 ÷ 4 = 2, so 1/4 is 2.", "3 parts is 2 + 2 + 2.", "3/4 of 8 is 6."] },
    },
    {
      title: "Work out each card first",
      lines: ["Find the answer to every card.", "A small fraction can still give a big answer.", "Put the smallest answer first."],
      example: { type: "table", title: "Check each answer", headers: ["Card", "Answer"], rows: [["1/2 of 14", "7"], ["1/3 of 30", "10"]], note: "1/3 is smaller than 1/2, but 10 is bigger." },
    },
    {
      title: "Finish the statement",
      lines: ["Read the fraction and the number.", "Divide by the bottom, then take the top.", "Write the answer after the = sign."],
      example: { type: "steps", title: "1/2 of 30 = ?", steps: ["30 ÷ 2 = 15.", "So 1/2 of 30 = 15.", "2/4 of 30 is 15 too."] },
    },
  ],
  "finding-fractions-of-larger-groups": [
    {
      title: "Too many to count",
      lines: ["Big groups are too many to count 1 by 1.", "For 1/2, halve the number.", "For 1/4, halve it and halve again."],
      example: { type: "steps", title: "1/4 of 44", steps: ["Half of 44 is 22.", "Half of 22 is 11.", "So 1/4 of 44 is 11."] },
    },
    {
      title: "Find 1 part, then more",
      lines: ["First find 1/4 of the number.", "For 3/4, add 3 of those parts.", "2/4 is the same as 1/2."],
      example: { type: "steps", title: "3/4 of 28", steps: ["Half of 28 is 14. Half of 14 is 7.", "So 1/4 of 28 is 7.", "7 + 7 + 7 = 21, so 3/4 is 21."] },
    },
    {
      title: "Check both numbers",
      lines: ["Each card has a different fraction and number.", "Work out every card before you move it.", "Put the smallest answer first."],
      example: { type: "table", title: "Smallest answer first", headers: ["Card", "Answer"], rows: [["3/4 of 12", "9"], ["1/3 of 30", "10"], ["1/2 of 90", "45"]], note: "Look at the answers, not just the fractions." },
    },
    {
      title: "Taken or left over?",
      lines: ["Find the fraction of the amount first.", "Read the question again carefully.", "If it asks what is left, take it away."],
      example: { type: "steps", title: "20 slices, 1/4 eaten", steps: ["1/4 of 20 is 5, so 5 are eaten.", "20 − 5 = 15.", "15 slices are left."] },
    },
  ],
};
