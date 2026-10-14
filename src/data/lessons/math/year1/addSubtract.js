/**
 * Bix's lessons for Year 1 Addition and Subtraction, one per challenge slot.
 * Each one teaches exactly what that challenge asks (see the challenge files in
 * src/pages/skills/math/challenges/year1/<topic>/ and year1Math/arithmetic.js).
 * Year 1 readers are 5–6: tiny words, short lines, pictures where we can.
 */
const many = (emoji, n) => Array.from({ length: n }, () => emoji);

export const ADD_SUBTRACT_LESSONS = {
  "addition-subtraction-and-equals-signs": [
    {
      title: "Know your signs",
      lines: ["+ means add, or put together.", "− means take away.", "= means both sides are the same."],
      example: { type: "table", title: "3 signs to know", headers: ["Sign", "It means"], rows: [["+", "add"], ["−", "take away"], ["=", "the same as"]] },
    },
    {
      title: "Find the missing sign",
      lines: ["Is the answer bigger? The sign is +.", "Is the answer smaller? The sign is −.", "= means both sides are the same."],
      example: { type: "equation", title: "Which sign?", parts: ["6", "−", "2", "=", "4"], note: "4 is smaller than 6, so it is −." },
    },
    {
      title: "Story to number sentence",
      lines: ["Put the start number first.", "Then + or −, then the next number.", "Then =, then the answer."],
      example: { type: "equation", title: "Start with 6. Add 3. 9 altogether.", parts: ["6", "+", "3", "=", "9"], note: "Same order as the story." },
    },
    {
      title: "Make both sides equal",
      lines: ["Look at the sign first.", "For +, count all the counters.", "For −, count the ones not crossed out."],
      example: { type: "groups", title: "4 + 3 = ?", groups: [many("🍎", 4), many("🍎", 3)], label: "4 apples and 3 more apples", note: "Count them all: 4 + 3 = 7." },
    },
  ],
  "number-bonds-within-20": [
    {
      title: "Pairs that make 10",
      lines: ["2 parts make a whole.", "Start at the part you know.", "Count on to 10. Count your jumps."],
      example: { type: "jumps", title: "6 + ? = 10", terms: ["6", "7", "8", "9", "10"], step: "+1", note: "4 jumps, so 6 + 4 = 10." },
    },
    {
      title: "Pairs that make 20",
      lines: ["Use a pair to 10 to help.", "3 and 7 make 10.", "So 13 and 7 make 20."],
      example: { type: "steps", title: "Use 10 to help", steps: ["3 + 7 = 10.", "Put 10 more on the 3.", "13 + 7 = 20."] },
    },
    {
      title: "One bond, two facts",
      lines: ["The same 3 numbers make both facts.", "Part + other part = whole.", "Whole take away a part leaves the other part."],
      example: { type: "steps", title: "Parts 5 and 9, whole 14", steps: ["5 + 9 = 14.", "14 − 5 = 9.", "Same 3 numbers both times!"] },
    },
    {
      title: "Bonds in a story",
      lines: ["Find the whole and the part you know.", "Count on from the part to the whole.", "Type the other part."],
      example: { type: "steps", title: "15 beads. 9 are red.", steps: ["The whole is 15. The red part is 9.", "Count on from 9 to 15. That is 6.", "So 6 beads are blue."] },
    },
  ],
  "adding-within-20": [
    {
      title: "Count them all",
      lines: ["Look at the 2 groups.", "Say the first number.", "Count on for the second group."],
      example: { type: "groups", title: "3 + 4", groups: [many("🐞", 3), many("🐞", 4)], label: "3 ladybirds and 4 ladybirds", note: "Say 3, then count on 4, 5, 6, 7." },
    },
    {
      title: "Count on from the big one",
      lines: ["Start with the bigger number.", "Count on the smaller number.", "Use your fingers for the jumps."],
      example: { type: "jumps", title: "12 + 4", terms: ["12", "13", "14", "15", "16"], step: "+1", note: "4 jumps from 12 lands on 16." },
    },
    {
      title: "Swap them round",
      lines: ["You can add 2 numbers in any order.", "The total stays the same.", "Find one total. The other is the same."],
      example: { type: "equation", title: "Same total", parts: ["5", "+", "8", "=", "8", "+", "5"], note: "Both make 13." },
    },
    {
      title: "Add in a story",
      lines: ["More and altogether mean add.", "Find the 2 numbers in the story.", "Count on, then type the total."],
      example: { type: "steps", title: "Leo has 9 cars. He gets 6 more.", steps: ["More and altogether mean add.", "9 + 6: count on 6 from 9.", "Leo has 15 cars."] },
    },
  ],
  "subtracting-within-20": [
    {
      title: "Cross out and count",
      lines: ["− means take away.", "The crossed-out ones are gone.", "Count the ones that are left."],
      example: { type: "groups", title: "7 − 3", groups: [many("🍪", 4), many("❌", 3)], label: "4 cookies left and 3 crossed out", note: "3 are gone. 4 are left." },
    },
    {
      title: "Count back to take away",
      lines: ["Start on the big number.", "Count back 1 for each one taken.", "Where you stop is how many are left."],
      example: { type: "jumps", title: "15 − 4", terms: ["15", "14", "13", "12", "11"], step: "−1", note: "4 jumps back from 15 lands on 11." },
    },
    {
      title: "Check with adding",
      lines: ["Take away to find what is left.", "Then add back what you took.", "You get the start number again."],
      example: { type: "equation", title: "Take away, then check", parts: ["12", "−", "5", "=", "7"], note: "Check: 7 + 5 = 12." },
    },
    {
      title: "Take away in a story",
      lines: ["Fly away and left mean take away.", "Start with how many there were.", "Take away, then type what is left."],
      example: { type: "steps", title: "Sam has 13 cars. He gives away 5.", steps: ["Gives away means take away.", "13 − 5: count back 5 from 13.", "8 cars are left."] },
    },
  ],
  "missing-numbers-within-20": [
    {
      title: "What goes in the gap?",
      lines: ["The gap is a number we do not know.", "Count on from the first number to the total.", "Count your jumps. That goes in the gap."],
      example: { type: "jumps", title: "4 + ? = 7", terms: ["4", "5", "6", "7"], step: "+1", note: "3 jumps, so 4 + 3 = 7." },
    },
    {
      title: "The gap can move",
      lines: ["The gap can be in any place.", "The = can be at the start, too.", "Try a number in the gap. Is it true?"],
      example: { type: "table", title: "Say it in words", headers: ["Puzzle", "Think"], rows: [["? + 3 = 9", "what and 3 make 9?"], ["9 − ? = 3", "9 take away what leaves 3?"], ["4 = ? − 5", "what take away 5 leaves 4?"]] },
    },
    {
      title: "One fact helps the other",
      lines: ["The same 3 numbers make both facts.", "Find the gap in the adding fact.", "The take-away gap is the same number."],
      example: { type: "steps", title: "Two linked facts", steps: ["8 + 5 = 13.", "13 − 5 = 8.", "The gap is 5 both times."] },
    },
    {
      title: "Find the hidden number",
      lines: ["Read the whole number sentence.", "Use adding to check taking away.", "Put your number in. Is it true?"],
      example: { type: "steps", title: "6 = ? − 9", steps: ["What take away 9 leaves 6?", "Add back: 6 + 9 = 15.", "Check: 15 − 9 = 6. Yes!"] },
    },
  ],
  "one-step-addition-and-subtraction-problems": [
    {
      title: "Join or swim away?",
      lines: ["Join means more come. Add.", "Swim away means some go. Take away.", "Count the ducks in the picture."],
      example: { type: "groups", title: "4 ducks. 2 more join.", groups: [many("🦆", 4), many("🦆", 2)], label: "4 ducks and 2 more ducks joining", note: "Join means add: 4 + 2 = 6." },
    },
    {
      title: "Altogether or left?",
      lines: ["Altogether means add.", "Left means take away.", "Then count on or count back."],
      example: { type: "steps", title: "8 ducks. 3 swim away.", steps: ["Swim away and left mean take away.", "Count back 3 from 8.", "5 ducks are left."] },
    },
    {
      title: "Build the duck sentence",
      lines: ["Start with the ducks already there.", "Join? Use +. Swim away? Use −.", "Then = and the answer."],
      example: { type: "equation", title: "7 ducks. 2 swim away.", parts: ["7", "−", "2", "=", "5"], note: "Ducks there first, then −, then 2." },
    },
    {
      title: "Solve the story",
      lines: ["Read the story slowly.", "Add for join. Take away for left.", "How many more? Match them up. Count extras."],
      example: { type: "groups", title: "Leo has 3. Maya has 5.", groups: [many("🐚", 3), many("🐚", 5)], label: "Leo has 3 shells. Maya has 5 shells.", note: "Match 3 each. Maya has 2 extra." },
    },
  ],
};
