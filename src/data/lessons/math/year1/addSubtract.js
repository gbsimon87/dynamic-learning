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
      lines: ["+ means add. − means take away.", "= means both sides are the same.", "Look at the picture. More, or fewer?"],
      example: { type: "table", title: "3 signs to know", headers: ["Sign", "It means"], rows: [["+", "add"], ["−", "take away"], ["=", "the same as"]] },
    },
    {
      title: "Which one is true?",
      lines: ["Work out the side with + or −.", "Does it match the other side?", "The = can come first, too."],
      example: { type: "table", title: "True or not?", headers: ["Number sentence", "True?"], rows: [["7 + 2 = 9", "yes"], ["7 − 2 = 9", "no"], ["9 = 7 + 2", "yes"]] },
    },
    {
      title: "Story to number sentence",
      lines: ["Put the start number first.", "Then + or −, then the next number.", "Then =, then the answer."],
      example: { type: "equation", title: "Start with 6. Add 3. 9 altogether.", parts: ["6", "+", "3", "=", "9"], note: "Same order as the story." },
    },
    {
      title: "Make both sides equal",
      lines: ["= means both sides are the same.", "Work out the side you can.", "Make the other side match it."],
      example: { type: "steps", title: "7 + 2 = 2 + ?", steps: ["7 + 2 makes 9.", "2 + what makes 9? 7!", "Swap the numbers, same total."] },
    },
  ],
  "number-bonds-within-20": [
    {
      title: "Find the other part",
      lines: ["2 parts make a whole.", "The coloured counters are the part we know.", "Count the ones not coloured."],
      example: { type: "groups", title: "3 + ? = 8", groups: [many("🔴", 3), many("⚪", 5)], label: "3 coloured counters and 5 white counters", note: "5 are not coloured, so 3 + 5 = 8." },
    },
    {
      title: "Pairs that make 10 or 20",
      lines: ["Pairs to 10 help with pairs to 20.", "3 and 7 make 10.", "So 13 and 7 make 20."],
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
      lines: ["Start with the bigger number.", "Count on the smaller number.", "Adding 0 changes nothing."],
      example: { type: "jumps", title: "12 + 4", terms: ["12", "13", "14", "15", "16"], step: "+1", note: "4 jumps from 12 lands on 16." },
    },
    {
      title: "Swap them round",
      lines: ["You can add 2 numbers in any order.", "The total stays the same.", "Use one fact to fill the other."],
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
      lines: ["Start on the big number. Count back.", "Where you stop is how many are left.", "Taking away 0 changes nothing."],
      example: { type: "jumps", title: "15 − 4", terms: ["15", "14", "13", "12", "11"], step: "−1", note: "4 jumps back from 15 lands on 11." },
    },
    {
      title: "Check with adding",
      lines: ["Take away to find what is left.", "Then add back what you took.", "You get the start number again."],
      example: { type: "equation", title: "Take away, then check", parts: ["12", "−", "5", "=", "7"], note: "Check: 7 + 5 = 12." },
    },
    {
      title: "Take away in a story",
      lines: ["Fly away, eat and give away mean take away.", "Start with how many there were.", "Take away, then type what is left."],
      example: { type: "steps", title: "Sam has 13 cars. He gives away 5.", steps: ["Gives away means take away.", "13 − 5: count back 5 from 13.", "8 cars are left."] },
    },
  ],
  "missing-numbers-within-20": [
    {
      title: "What goes in the gap?",
      lines: ["The gap can be first or second.", "Count on from the number you know.", "Count your jumps. That goes in the gap."],
      example: { type: "jumps", title: "4 + ? = 7", terms: ["4", "5", "6", "7"], step: "+1", note: "3 jumps, so 4 + 3 = 7." },
    },
    {
      title: "Gaps in taking away",
      lines: ["The gap can be in a take-away fact.", "Use adding to help.", "Try your number in the gap. Is it true?"],
      example: { type: "table", title: "Say it in words", headers: ["Puzzle", "Think"], rows: [["9 − ? = 3", "3 + what makes 9? 6"], ["? − 5 = 4", "4 + 5 makes 9"]] },
    },
    {
      title: "Sort by the missing number",
      lines: ["Find the missing number on each card.", "Put the card with its number.", "Check: put it in. Is it true?"],
      example: { type: "table", title: "What is the gap?", headers: ["Card", "Gap"], rows: [["3 + ? = 7", "4"], ["9 − ? = 5", "4"], ["2 + ? = 8", "6"]] },
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
      title: "Add or take away?",
      lines: ["More come, land or get on? Add.", "Some fly away or get off? Take away.", "Then count on or count back."],
      example: { type: "steps", title: "8 birds. 3 fly away.", steps: ["Fly away means take away.", "Count back 3 from 8.", "5 birds are left."] },
    },
    {
      title: "Build the duck sentence",
      lines: ["Start with how many are there first.", "More come? Use +. Some go? Use −.", "Then = and the answer."],
      example: { type: "equation", title: "7 ducks. 2 swim away.", parts: ["7", "−", "2", "=", "5"], note: "Ducks there first, then −, then 2." },
    },
    {
      title: "Solve the story",
      lines: ["How many more? Match them up. Count extras.", "More than means add.", "Fewer than means take away."],
      example: { type: "groups", title: "Leo has 3. Maya has 5.", groups: [many("🐚", 3), many("🐚", 5)], label: "Leo has 3 shells. Maya has 5 shells.", note: "Match 3 each. Maya has 2 extra." },
    },
  ],
};
