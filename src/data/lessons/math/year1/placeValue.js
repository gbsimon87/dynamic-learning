/**
 * Bix's lessons for Year 1 Number and Place Value, one per challenge slot.
 * Each one teaches exactly what that challenge asks (see the builders in
 * src/data/challenges/year1Math/numbers.js). Year 1 readers are 5–6, so
 * lines stay tiny and most examples are pictures.
 */
const row = (emoji, count) => Array(count).fill(emoji);

export const PLACE_VALUE_LESSONS = {
  "counting-objects": [
    {
      title: "Touch and count",
      lines: ["Touch each counter once.", "Say one number for each touch.", "The last number you say is how many."],
      example: { type: "groups", title: "Count the stars", groups: [row("⭐", 3)], label: "3 stars", note: "1, 2, 3. There are 3 stars." },
    },
    {
      title: "Count up to 10",
      lines: ["Count in a line, left to right.", "Do not skip one. Do not count twice.", "Then pick the number that matches."],
      example: { type: "groups", title: "Count the strawberries", groups: [row("🍓", 5), row("🍓", 2)], label: "7 strawberries", note: "Count 5, then keep going: 6, 7." },
    },
    {
      title: "Fewest first",
      lines: ["Count the dots in each group.", "Fewest means the smallest number.", "Put the fewest first. The most goes last."],
      example: { type: "groups", title: "Fewest to most", groups: [row("🔵", 3), row("🔵", 5), row("🔵", 9)], label: "3 dots, then 5 dots, then 9 dots", note: "Each group has more than the one before." },
    },
    {
      title: "Count bigger groups",
      lines: ["Each dot is one apple.", "Count to 10, then keep going.", "Type the last number you say."],
      example: { type: "groups", title: "Count the apples", groups: [row("🍎", 10), row("🍎", 3)], label: "13 apples", note: "10, then 11, 12, 13." },
    },
  ],
  "counting-forwards-and-backwards-to-100": [
    {
      title: "What comes next?",
      lines: ["Forwards means one more each time.", "Say the numbers out loud.", "The next number goes in the gap."],
      example: { type: "jumps", title: "Count forwards", terms: ["17", "18", "19", "20", "21"], step: "+1", note: "After 19 comes 20." },
    },
    {
      title: "Forwards or backwards?",
      lines: ["Do the numbers go up or down?", "Up is one more. Down is one less.", "Look before and after the gap."],
      example: { type: "jumps", title: "Count backwards", terms: ["43", "42", "41", "40", "39"], step: "−1", note: "After 40 comes 39, not 30." },
    },
    {
      title: "Put the count in order",
      lines: ["Forwards: start with the smallest.", "Backwards: start with the biggest.", "Each number is one away from the last."],
      example: { type: "steps", title: "Count backwards from 62", steps: ["Cards: 60, 62, 58, 59, 61.", "Biggest is 62. Start there.", "62, 61, 60, 59, 58."] },
    },
    {
      title: "Jump along with Bix",
      lines: ["Start on Bix's number.", "Forwards goes up. Backwards goes down.", "Count 4 jumps. Where does Bix land?"],
      example: { type: "jumps", title: "Bix is on 57. Forwards 4 steps.", terms: ["57", "58", "59", "60", "61"], step: "+1", note: "4 jumps. Bix lands on 61." },
    },
  ],
  "reading-and-writing-numerals-to-100": [
    {
      title: "Read the blocks",
      lines: ["A long rod is ten.", "A small cube is one.", "Count the rod, then the cubes."],
      example: { type: "table", title: "1 rod and 2 cubes", headers: ["Rods", "Cubes", "Number"], rows: [["1", "2", "12"]], note: "10, then 11, 12. That makes 12." },
    },
    {
      title: "Count tens, then ones",
      lines: ["Count the rods in tens: 10, 20, 30.", "Then count on the cubes in ones.", "Pick the number that matches."],
      example: { type: "steps", title: "4 rods and 6 cubes", steps: ["Rods: 10, 20, 30, 40.", "Cubes: 41, 42, 43, 44, 45, 46.", "The number is 46."], note: "Not 64! The rods come first." },
    },
    {
      title: "Smallest number first",
      lines: ["Look at the tens digit first.", "A smaller tens digit means a smaller number.", "Same tens? Then look at the ones."],
      example: { type: "steps", title: "Order 52, 47, 56, 49", steps: ["47 and 49 have 4 tens.", "47 is smaller than 49.", "52 is smaller than 56.", "47, 49, 52, 56."] },
    },
    {
      title: "Write the number",
      lines: ["Count the rods. That is the tens.", "Count the cubes. That is the ones.", "Type the tens digit, then the ones."],
      example: { type: "table", title: "Blocks into numbers", headers: ["Rods", "Cubes", "Number"], rows: [["7", "2", "72"], ["2", "7", "27"], ["5", "0", "50"]], note: "No cubes? The ones digit is 0." },
    },
  ],
  "counting-in-twos-fives-and-tens": [
    {
      title: "Count in 2s, 5s and 10s",
      lines: ["Each jump adds the same number.", "Read it: 2s, 5s or 10s?", "Add one more jump to fill the gap."],
      example: { type: "jumps", title: "Count in 2s from 20", terms: ["20", "22", "24", "26", "28"], step: "+2", note: "Add 2 each time." },
    },
    {
      title: "Fill the gap in the middle",
      lines: ["Look at the number before the gap.", "Add the step to it.", "Add the step again. Do you reach the next?"],
      example: { type: "jumps", title: "Count in 5s", terms: ["35", "40", "45", "50", "55"], step: "+5", note: "In 5s, numbers end in 5 or 0." },
    },
    {
      title: "Put the jumps in order",
      lines: ["Find the smallest number. Put it first.", "Add the step to find the next card.", "Keep going until all the cards are used."],
      example: { type: "steps", title: "Count in 10s: 50, 30, 60, 40", steps: ["Smallest is 30.", "30 and 10 more is 40.", "30, 40, 50, 60."] },
    },
    {
      title: "Count the beads in bags",
      lines: ["Each row is one bag.", "Count one jump for each row.", "The last number you say is the total."],
      example: { type: "groups", title: "6 bags of 2 beads", groups: [row("🔵", 2), row("🔵", 2), row("🔵", 2), row("🔵", 2), row("🔵", 2), row("🔵", 2)], label: "6 rows of 2 beads", note: "Count 2, 4, 6, 8, 10, 12." },
    },
  ],
  "one-more-and-one-less": [
    {
      title: "One more, one less",
      lines: ["One more: add one counter.", "One less: take one counter away.", "Count again to check."],
      example: { type: "groups", title: "One more than 5", groups: [row("⭐", 5), ["⭐"]], label: "5 stars and 1 more star", note: "5 and 1 more makes 6." },
    },
    {
      title: "Next door numbers",
      lines: ["One more is the next number.", "One less is the number just before.", "Take care when you cross a ten."],
      example: { type: "table", title: "Around 40", headers: ["One less", "Number", "One more"], rows: [["39", "40", "41"]], note: "One less than 40 is 39, not 30." },
    },
    {
      title: "Fill both sides",
      lines: ["One less goes on the left.", "One more goes on the right.", "Say them in order to check."],
      example: { type: "jumps", title: "Start on 59", terms: ["58", "59", "60", "61"], step: "+1", note: "58 is one less. 60 is one more." },
    },
    {
      title: "Gets on or gets off?",
      lines: ["Gets on means one more.", "Gets off means one less.", "Then type how many now."],
      example: { type: "steps", title: "30 on the bus. One gets off.", steps: ["Gets off means one less.", "One less than 30 is 29.", "Now there are 29."] },
    },
  ],
  "comparing-and-ordering-quantities": [
    {
      title: "More, fewer or equal",
      lines: ["Match one red to one blue.", "Red left over? Red has more.", "None left over? They are equal."],
      example: { type: "groups", title: "Red and blue", groups: [row("🔴", 4), row("🔵", 3)], label: "4 red and 3 blue", note: "1 red is left over. Red has more." },
    },
    {
      title: "Spot fewer than",
      lines: ["Count the red. Count the blue.", "The smaller number has fewer.", "The same number means equal to."],
      example: { type: "groups", title: "Red and blue", groups: [row("🔴", 2), row("🔵", 5)], label: "2 red and 5 blue", note: "2 is less than 5. Red has fewer." },
    },
    {
      title: "Least to most",
      lines: ["Count the dots in each group.", "Least is the smallest number. It goes first.", "Most is the biggest number. It goes last."],
      example: { type: "groups", title: "Least to most", groups: [row("🟡", 3), row("🟡", 6), row("🟡", 8)], label: "3 dots, then 6 dots, then 8 dots", note: "Least first. Most last." },
    },
    {
      title: "Compare Leo and Maya",
      lines: ["Leo has red. Maya has blue.", "Match them one to one.", "Then say: more, fewer or equal to."],
      example: { type: "groups", title: "Leo and Maya", groups: [row("🔴", 4), row("🔵", 4)], label: "Leo has 4 red. Maya has 4 blue.", note: "Nothing left over, so they are equal." },
    },
  ],
  "number-words-to-20": [
    {
      title: "Match the word",
      lines: ["Count the counters.", "Read each word slowly.", "Find the word that says your number."],
      example: { type: "table", title: "Words that look alike", headers: ["Number", "Word"], rows: [["2", "two"], ["3", "three"]], note: "Both start with t. Look at the end." },
    },
    {
      title: "Words into numbers",
      lines: ["Read the word slowly.", "A teen word is 10 and some more.", "Teen numbers start with a 1."],
      example: { type: "table", title: "Spot the teen", headers: ["Word", "Number"], rows: [["four", "4"], ["fourteen", "14"]], note: "Teen means 10 more. Write 1 first." },
    },
    {
      title: "Build the word",
      lines: ["Say the number word slowly.", "Listen for each sound.", "Put the first letter first, then the rest."],
      example: { type: "steps", title: "Build the word for 12", steps: ["Say twelve slowly.", "Hear t, w, e, l, v.", "Add a quiet e at the end: twelve."] },
    },
    {
      title: "Spell the number word",
      lines: ["Say the number word out loud.", "Write the sounds you hear.", "Teen words end in t, e, e, n."],
      example: { type: "table", title: "Tricky teens", headers: ["Number", "Word"], rows: [["13", "thirteen"], ["15", "fifteen"]], note: "Not threeteen or fiveteen!" },
    },
  ],
};
