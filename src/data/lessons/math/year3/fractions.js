/**
 * Bix's lessons for Year 3 Fractions, one per challenge slot. Each one teaches
 * exactly what that challenge asks (see Year3FractionGame / year3Fractions.js).
 */
export const FRACTIONS_LESSONS = {
  tenths: [
    {
      title: "Read tenths on a bar",
      lines: ["A tenth is 1 of 10 equal parts.", "Count the shaded parts.", "That number goes on top, and 10 goes underneath."],
      example: { type: "bar", title: "Look at this bar", bars: [{ parts: 10, shaded: 3 }], note: "3 parts are shaded out of 10, so it is 3/10." },
    },
    {
      title: "Find tenths on a line",
      lines: ["From 0 to 1, the line is split into 10 equal jumps.", "Each jump is one tenth.", "Count the jumps from 0 to find the spot."],
      example: { type: "jumps", title: "Counting in tenths", terms: ["0", "1/10", "2/10", "3/10", "4/10"], step: "+1/10", note: "4 jumps from 0 lands on 4/10." },
    },
    {
      title: "Shade tenths yourself",
      lines: ["The bottom number says 10 equal parts.", "The top number says how many to shade.", "Shade that many parts, then count to check."],
      example: { type: "bar", title: "To show 7/10", bars: [{ parts: 10, shaded: 7 }], note: "Shade 7 parts and leave 3 empty." },
    },
    {
      title: "Share into ten equal parts",
      lines: ["Sharing by 10 makes tenths.", "Each part is one tenth of the whole.", "Share 8 cakes between 10 children: each gets 8/10."],
      example: { type: "equation", title: "Sharing by 10", parts: ["8", "÷", "10", "=", "8/10"], note: "Each child gets 8/10 of a cake." },
    },
  ],
  "fractions-of-a-set-of-objects": [
    {
      title: "Find one equal share",
      lines: ["A fraction of a set means sharing into equal groups.", "The bottom number tells you how many groups.", "One group is one share."],
      example: { type: "groups", title: "1/4 of 12 apples", groups: [["🍎", "🍎", "🍎"], ["🍎", "🍎", "🍎"], ["🍎", "🍎", "🍎"], ["🍎", "🍎", "🍎"]], label: "12 apples in 4 equal groups of 3", note: "1/4 of 12 is 3." },
    },
    {
      title: "Find more than one share",
      lines: ["First find one share by dividing.", "The top number tells you how many shares to take.", "Add those shares together."],
      example: { type: "steps", title: "2/3 of 15", steps: ["Share 15 into 3 groups: 5 in each.", "Take 2 groups.", "5 + 5 = 10, so 2/3 of 15 is 10."] },
    },
    {
      title: "Read a fraction of a set",
      lines: ["Count how many groups the set is split into.", "Count how many groups are picked.", "Then count the objects in those groups."],
      example: { type: "groups", title: "3/4 of 16 stars", groups: [["⭐", "⭐", "⭐", "⭐"], ["⭐", "⭐", "⭐", "⭐"], ["⭐", "⭐", "⭐", "⭐"], ["☆", "☆", "☆", "☆"]], label: "16 stars in 4 groups of 4, 3 groups filled in", note: "3 groups of 4 is 12, so 3/4 of 16 is 12." },
    },
    {
      title: "Solve a fraction story",
      lines: ["Find the whole amount in the story.", "Divide it by the bottom number.", "Multiply by the top number if it is more than 1."],
      example: { type: "equation", title: "1/3 of 12 sweets", parts: ["12", "÷", "3", "=", "4"], note: "1/3 of 12 sweets is 4 sweets." },
    },
  ],
  "fractions-as-numbers": [
    {
      title: "Read the shaded fraction",
      lines: ["Count all the equal parts: that is the bottom number.", "Count the shaded parts: that is the top number.", "Fractions are numbers, just like 1 and 2."],
      example: { type: "bar", title: "Look at this bar", bars: [{ parts: 5, shaded: 2 }], note: "2 of 5 equal parts are shaded: 2/5." },
    },
    {
      title: "Place a fraction on the line",
      lines: ["Fractions live on the number line between whole numbers.", "Split each whole into equal jumps.", "Count the jumps from 0."],
      example: { type: "jumps", title: "Counting in fifths", terms: ["0", "1/5", "2/5", "3/5", "4/5", "1"], step: "+1/5", note: "5 fifths make 1 whole." },
    },
    {
      title: "Go past one whole",
      lines: ["Keep counting after you reach 1.", "3 thirds make 1, so the next jump is 4 thirds.", "4/3 is one whole and one more third."],
      example: { type: "jumps", title: "Counting in thirds", terms: ["0", "1/3", "2/3", "3/3", "4/3", "5/3"], step: "+1/3", note: "3/3 is the same as 1." },
    },
    {
      title: "Write a fraction past one whole",
      lines: ["Count the equal parts in each whole.", "Count every shaded part across all the wholes.", "Write that total on top of the bottom number."],
      example: { type: "bar", title: "Two wholes cut into quarters", bars: [{ parts: 4, shaded: 4, label: "4/4" }, { parts: 4, shaded: 2, label: "2/4" }], note: "4 + 2 = 6 quarters, so it is 6/4." },
    },
  ],
  "equivalent-fractions": [
    {
      title: "Find the matching bar",
      lines: ["Equivalent fractions are the same amount.", "They have different numbers but cover the same space.", "Line the bars up and compare the shading."],
      example: { type: "bar", title: "Same amount, different pieces", bars: [{ parts: 3, shaded: 2 }, { parts: 6, shaded: 4 }], note: "2/3 covers the same as 4/6." },
    },
    {
      title: "Look for the same amount",
      lines: ["Smaller pieces can make the same amount.", "Two quarters fill the same space as one half.", "Check where the shading stops."],
      example: { type: "bar", title: "Halves and quarters", bars: [{ parts: 2, shaded: 1 }, { parts: 4, shaded: 2 }], note: "1/2 and 2/4 are equivalent." },
    },
    {
      title: "Build an equal fraction",
      lines: ["Cut every piece into two.", "Now there are double the pieces and double the shading.", "Shade until it matches the first bar."],
      example: { type: "bar", title: "Make 3/4 with eighths", bars: [{ parts: 4, shaded: 3 }, { parts: 8, shaded: 6 }], note: "3/4 is the same as 6/8." },
    },
    {
      title: "Write the missing top number",
      lines: ["Look at how the bottom number changed.", "Do the same to the top number.", "If the bottom doubles, the top doubles too."],
      example: { type: "steps", title: "1/3 = ?/6", steps: ["3 doubles to make 6.", "So double the 1 to make 2.", "1/3 = 2/6."] },
    },
  ],
  "adding-and-subtracting-fractions": [
    {
      title: "Add fractions with matching bottoms",
      lines: ["When the bottom numbers match, the pieces are the same size.", "Add the top numbers.", "The bottom number stays the same."],
      example: { type: "equation", title: "Adding fifths", parts: ["2/5", "+", "2/5", "=", "4/5"], note: "2 fifths and 2 more fifths make 4 fifths." },
    },
    {
      title: "Build the sum",
      lines: ["Count the pieces in the first fraction.", "Count on the pieces in the second.", "Keep the bottom number the same."],
      example: { type: "bar", title: "2/6 + 3/6", bars: [{ parts: 6, shaded: 2, label: "2/6" }, { parts: 6, shaded: 5, label: "5/6" }], note: "Shade 2, then 3 more: 5/6." },
    },
    {
      title: "Build the difference",
      lines: ["Start with the first fraction.", "Take away the top number of the second.", "The bottom number does not change."],
      example: { type: "equation", title: "Taking away sixths", parts: ["5/6", "−", "3/6", "=", "2/6"], note: "5 sixths take away 3 sixths leaves 2 sixths." },
    },
    {
      title: "Solve a fraction story",
      lines: ["Find the two fractions in the story.", "Decide: is it adding or taking away?", "Work with the top numbers and keep the bottom."],
      example: { type: "steps", title: "Pizza in eighths", steps: ["Sam eats 3/8 of a pizza.", "Ali eats 4/8 more.", "3/8 + 4/8 = 7/8 of the pizza."] },
    },
  ],
  "comparing-and-ordering-fractions": [
    {
      title: "Which unit fraction is larger?",
      lines: ["A unit fraction has 1 on top.", "A bigger bottom number means more, smaller pieces.", "So 1/2 is larger than 1/3."],
      example: { type: "bar", title: "One piece of each", bars: [{ parts: 2, shaded: 1 }, { parts: 3, shaded: 1 }], note: "Halves are bigger pieces than thirds." },
    },
    {
      title: "Compare fractions with the same bottom",
      lines: ["When the bottom numbers match, the pieces match.", "Then the bigger top number is the bigger fraction.", "3/5 is more than 1/5."],
      example: { type: "equation", title: "Same-sized pieces", parts: ["3/5", ">", "1/5"], note: "3 fifths is more than 1 fifth." },
    },
    {
      title: "Order the fractions",
      lines: ["Check that the bottom numbers are the same.", "Find the smallest top number first.", "Line them up from smallest to largest."],
      example: { type: "jumps", title: "Smallest to largest", terms: ["2/6", "3/6", "5/6"], note: "2 sixths, then 3 sixths, then 5 sixths." },
    },
    {
      title: "Compare fractions in a story",
      lines: ["Find the two fractions in the story.", "Check whether the bottom numbers match.", "Then compare the top numbers to find who has more."],
      example: { type: "steps", title: "Who ran further?", steps: ["Mia ran 2/7 of the track.", "Leo ran 6/7 of the track.", "6/7 is more, so Leo ran further."] },
    },
  ],
  "fraction-problems": [
    {
      title: "Find a fraction of a group",
      lines: ["Divide the group by the bottom number.", "That gives one share.", "Multiply by the top number."],
      example: { type: "steps", title: "3/4 of 16", steps: ["16 ÷ 4 = 4, so one quarter is 4.", "3 quarters is 4 + 4 + 4.", "3/4 of 16 is 12."] },
    },
    {
      title: "Add parts of one whole",
      lines: ["The pieces are all from the same whole.", "Add the top numbers.", "Keep the bottom number the same."],
      example: { type: "equation", title: "Adding fifths of a cake", parts: ["3/5", "+", "1/5", "=", "4/5"], note: "Together they ate 4/5 of the cake." },
    },
    {
      title: "Find an equivalent fraction",
      lines: ["Look at how the bottom number changed.", "Change the top number in the same way.", "The amount stays exactly the same."],
      example: { type: "bar", title: "1/3 = 2/6", bars: [{ parts: 3, shaded: 1 }, { parts: 6, shaded: 2 }], note: "Thirds cut in half make sixths." },
    },
    {
      title: "Solve a two-step fraction story",
      lines: ["Read the whole story first.", "Do the first step, then the second.", "Check your answer makes sense."],
      example: { type: "steps", title: "A ribbon in sevenths", steps: ["Start with 5/7 of a ribbon.", "Use 1/7, leaving 4/7.", "Use 2/7 more, leaving 2/7."] },
    },
  ],
};
