/**
 * Bix's lessons for Year 2 Addition and Subtraction, one per challenge slot.
 * Each one teaches exactly what that challenge asks (see the challenge files in
 * src/pages/skills/math/challenges/year2/<topic>/ and additionAndSubtraction.js).
 */
export const ADD_SUBTRACT_LESSONS = {
  "doubling-and-halving-using-addition-and-subtraction": [
    {
      title: "Double means twice",
      lines: ["Double means the same amount 2 times.", "Count both groups to find the double.", "Or add the number to itself."],
      example: { type: "groups", title: "Double 7", groups: [["🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪"], ["🍪", "🍪", "🍪", "🍪", "🍪", "🍪", "🍪"]], label: "2 groups of 7 cookies", note: "7 + 7 = 14, so double 7 is 14." },
    },
    {
      title: "Half means 2 equal parts",
      lines: ["Half means split into 2 equal groups.", "Halving undoes doubling.", "Ask: what number doubles to make this?"],
      example: { type: "equation", title: "Half of 16", parts: ["8", "+", "8", "=", "16"], note: "Double 8 is 16, so half of 16 is 8." },
    },
    {
      title: "Keep doubling or halving",
      lines: ["Start with the first number.", "Double it, or halve it, to get the next one.", "Then do the same again, and keep going."],
      example: { type: "steps", title: "Start at 5 and keep doubling", steps: ["Start at 5.", "Double 5 is 10.", "Double 10 is 20.", "Double 20 is 40.", "Halving goes back: 40, 20, 10, 5."] },
    },
    {
      title: "Use a fact you know",
      lines: ["Small doubles help with big ones.", "Double 3 is 6, so double 30 is 60.", "Double 6 is 12, so 6 + 7 is 1 more: 13."],
      example: { type: "steps", title: "Double 8 is 16", steps: ["Half of 8 is 4, so half of 80 is 40.", "Double 8 is 16, so 8 + 9 is 17.", "Double 8 is 16, so 8 + 7 is 15."] },
    },
  ],
  "solving-number-problems": [
    {
      title: "Add or take away?",
      lines: ["Altogether or in total means add.", "Gives away or left means take away.", "Then work out the answer."],
      example: { type: "steps", title: "13 cats and 5 dogs", steps: ["How many altogether? That means add.", "13 + 5 = 18.", "There are 18 animals."] },
    },
    {
      title: "Swap the order",
      lines: ["Swap the 2 numbers in an add: same answer.", "Swap the 2 numbers in a take away: not the same.", "Look at the sign before you answer."],
      example: { type: "equation", title: "Adding in any order", parts: ["4", "+", "7", "=", "7", "+", "4"], note: "Both make 11. Swapping 7 − 4 does not work." },
    },
    {
      title: "Order the answers",
      lines: ["Work out each card first.", "Hold each answer in your head.", "Put the smallest answer first."],
      example: { type: "table", title: "Work out, then order", headers: ["Card", "Answer"], rows: [["9 + 3", "12"], ["15 − 7", "8"], ["4 + 2", "6"]], note: "Order: 4 + 2, then 15 − 7, then 9 + 3." },
    },
    {
      title: "Solve it in 2 steps",
      lines: ["Some stories need 2 sums.", "Do the first step, then use that answer.", "Check you answered the real question."],
      example: { type: "steps", title: "20 cakes. 6 eaten, then 4 more.", steps: ["Step 1: 20 − 6 = 14.", "Step 2: 14 − 4 = 10.", "So 10 cakes are left."] },
    },
  ],
  "using-two-digit-numbers": [
    {
      title: "Add ones on a line",
      lines: ["Start on the bigger number.", "Jump 1 for each one you add.", "Take care when you pass a ten."],
      example: { type: "jumps", title: "45 + 6", terms: ["45", "46", "47", "48", "49", "50", "51"], step: "+1", note: "6 jumps from 45 lands on 51." },
    },
    {
      title: "Add or take away tens",
      lines: ["Adding tens changes only the tens digit.", "Taking away tens does too.", "The ones digit stays the same."],
      example: { type: "jumps", title: "37 + 20", terms: ["37", "47", "57"], step: "+10", note: "3 tens and 2 tens make 5 tens: 57." },
    },
    {
      title: "Make 10 first",
      lines: ["Look for 2 numbers that make 10.", "Know your pairs to 10, like 5 and 5.", "Add those 2 first, then add the last one."],
      example: { type: "equation", title: "2 + 5 + 8", parts: ["2", "+", "8", "+", "5", "=", "10", "+", "5"], note: "2 and 8 make 10. Then 10 + 5 = 15." },
    },
    {
      title: "Add the tens, then ones",
      lines: ["Split the second number into tens and ones.", "Add or take away the tens first.", "Then add or take away the ones."],
      example: { type: "steps", title: "36 + 27", steps: ["Start at 36.", "Add 2 tens: 36 + 20 = 56.", "Add 7 ones: 56 + 7 = 63."] },
    },
  ],
  "solving-missing-number-problems": [
    {
      title: "What goes in the box?",
      lines: ["The box is a number we do not know.", "Count on from the first number to the total.", "Count your jumps. That is the box."],
      example: { type: "steps", title: "5 + ? = 12", steps: ["Count on from 5 to 12.", "That is 7 jumps.", "Check: 5 + 7 = 12."] },
    },
    {
      title: "Undo it to find it",
      lines: ["Adding and taking away undo each other.", "Missing part of an add? Take away.", "Missing start of a take away? Add back."],
      example: { type: "table", title: "Which sum finds it?", headers: ["Puzzle", "Do this"], rows: [["? + 7 = 19", "19 − 7"], ["? − 5 = 11", "11 + 5"], ["20 − ? = 8", "20 − 8"]] },
    },
    {
      title: "Make a true take away",
      lines: ["Start with the biggest number.", "Take away one of the smaller numbers.", "The answer is the other small number."],
      example: { type: "equation", title: "Using 18, 11 and 7", parts: ["18", "−", "11", "=", "7"], note: "18 − 7 = 11 is true too." },
    },
    {
      title: "Find bigger missing numbers",
      lines: ["See which number is missing.", "Undo the sum to find it.", "Put your answer back in to check."],
      example: { type: "steps", title: "42 + ? = 70", steps: ["Undo the add: 70 − 42 = 28.", "Check: 42 + 28 = 70.", "Yes! The box is 28."] },
    },
  ],
};
