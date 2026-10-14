/**
 * Bix's lessons for Year 2 Number and Place Value, one per challenge slot.
 * Each one teaches exactly what that challenge asks (see the challenge files in
 * src/pages/skills/math/challenges/year2/<topic>/ and their data helpers).
 */
export const PLACE_VALUE_LESSONS = {
  "numbers-and-counting": [
    {
      title: "Find the missing number",
      lines: ["On this line, each number is 1 more.", "Look at the number just before the gap.", "Count on 1 to fill the gap."],
      example: { type: "jumps", title: "Counting on in 1s", terms: ["37", "38", "39", "40", "41"], step: "+1", note: "After 39 comes 40. A new ten starts." },
    },
    {
      title: "Read a number in words",
      lines: ["The first word tells you the tens.", "The last word tells you the ones.", "Fifty-two is 5 tens and 2 ones."],
      example: { type: "table", title: "Words into digits", headers: ["Words", "Tens", "Ones", "Digits"], rows: [["fifty-two", "5", "2", "52"], ["thirty-eight", "3", "8", "38"]], note: "Careful: 52 and 25 are not the same." },
    },
    {
      title: "Find the closest ten",
      lines: ["The line goes from 0 to 100 in tens.", "Find the 2 tens your number sits between.", "Pick the ten it is nearer to."],
      example: { type: "steps", title: "Where is 34?", steps: ["34 is between 30 and 40.", "34 is 4 past 30.", "34 is 6 before 40.", "So 34 is closest to 30."] },
    },
    {
      title: "Write words as digits",
      lines: ["Find the tens word first, like forty.", "Write the tens digit, then the ones digit.", "No ones word? Then the ones digit is 0."],
      example: { type: "table", title: "Words into digits", headers: ["Words", "Digits"], rows: [["twenty-nine", "29"], ["sixty", "60"]], note: "Sixty has no ones, so it ends in 0." },
    },
  ],
  "counting-forwards-and-backwards": [
    {
      title: "Count on along the line",
      lines: ["Put your finger on the start number.", "Jump 1 for each number you count on.", "Take care when you pass a ten."],
      example: { type: "jumps", title: "Start at 37, count on 4", terms: ["37", "38", "39", "40", "41"], step: "+1", note: "4 jumps from 37 lands on 41." },
    },
    {
      title: "Count back in your head",
      lines: ["Counting back means taking away.", "Say each number as you go down.", "After 50 comes 49, not 40."],
      example: { type: "jumps", title: "Start at 53, count back 4", terms: ["53", "52", "51", "50", "49"], step: "−1", note: "53 − 4 = 49." },
    },
    {
      title: "Put the count in order",
      lines: ["Counting back starts with the biggest number.", "Each next card is 1 less.", "Say the count out loud to check."],
      example: { type: "steps", title: "Count back from 93 to 89", steps: ["Start with 93.", "Then 92, 91, 90.", "End with 89."] },
    },
    {
      title: "Count on or count back",
      lines: ["Read the story carefully.", "More or got on means count on.", "Left, sold or fell off means count back."],
      example: { type: "steps", title: "46 birds. 5 fly away.", steps: ["Fly away means count back.", "46, 45, 44, 43, 42, 41.", "So 41 birds are left."] },
    },
  ],
  "counting-in-steps-of-2-3-5-and-10": [
    {
      title: "Count in steps on a line",
      lines: ["Each jump adds the same amount.", "The step tells you how big each jump is.", "Add the step to find the next number."],
      example: { type: "jumps", title: "Counting in 10s from 14", terms: ["14", "24", "34", "44", "54"], step: "+10", note: "In 10s, only the tens digit changes." },
    },
    {
      title: "Spot the jump, then continue",
      lines: ["Look at 2 numbers side by side.", "How big is the jump? That is the step.", "If the numbers get smaller, count back."],
      example: { type: "jumps", title: "What is the step?", terms: ["30", "28", "26", "24"], step: "−2", note: "Each jump is 2 less, so keep taking 2." },
    },
    {
      title: "Put the steps in order",
      lines: ["Smallest first? Find the smallest card to start.", "Largest first? Start with the biggest card.", "Each card is one step from the last."],
      example: { type: "steps", title: "Count in 3s, smallest first", steps: ["Cards: 27, 21, 30, 24.", "Smallest is 21.", "21, then 24, then 27, then 30."] },
    },
    {
      title: "Spot the step in a story",
      lines: ["Pairs come in 2s.", "Count 1 step for each group.", "Stop when every group is counted."],
      example: { type: "jumps", title: "Fingers on 4 hands", terms: ["0", "5", "10", "15", "20"], step: "+5", note: "1 hand has 5 fingers. 4 hands have 20." },
    },
  ],
  "counting-more-and-less": [
    {
      title: "Find 1 more or 1 less",
      lines: ["1 more is the next number on the line.", "1 less is the number just before.", "Find your number, then look right or left."],
      example: { type: "table", title: "Around 42", headers: ["1 less", "Number", "1 more"], rows: [["41", "42", "43"]] },
    },
    {
      title: "Work out the rule",
      lines: ["Look at the first pair. What changed?", "Check the rule works for the next pair.", "Use the same rule on the last number."],
      example: { type: "table", title: "What is the rule?", headers: ["In", "Out"], rows: [["32", "42"], ["57", "67"], ["15", "25"]], note: "The rule is 10 more. Only the tens changed." },
    },
    {
      title: "Use the rule again",
      lines: ["Start with the number you are given.", "Use the rule to make the next number.", "Keep going until every card is used."],
      example: { type: "jumps", title: "Start at 35. Each is 10 more.", terms: ["35", "45", "55", "65", "75"], step: "+10" },
    },
    {
      title: "Find the jump in a story",
      lines: ["Look for more, fewer or less.", "More means add. Fewer or less means take away.", "38 is 10 more than Ben? Ben has 10 fewer."],
      example: { type: "steps", title: "Zara has 46 pens. She gets 10 more.", steps: ["10 more changes the tens digit.", "4 tens become 5 tens.", "46 + 10 = 56 pens."] },
    },
  ],
  "place-value": [
    {
      title: "Count the tens and ones",
      lines: ["A long rod is 1 ten.", "A small block is 1 one.", "Count rods for tens and blocks for ones."],
      example: { type: "groups", title: "Look at 36", groups: [["🟦", "🟦", "🟦"], ["🟡", "🟡", "🟡", "🟡", "🟡", "🟡"]], label: "3 ten rods and 6 one blocks", note: "3 tens and 6 ones make 36." },
    },
    {
      title: "Build a number from parts",
      lines: ["The tens digit comes first.", "The ones digit comes next.", "4 tens and 3 ones is 43, not 34."],
      example: { type: "table", title: "Tens and ones", headers: ["Tens", "Ones", "Number"], rows: [["4", "3", "43"], ["8", "0", "80"]], note: "0 ones still needs a 0 at the end." },
    },
    {
      title: "Order by the tens first",
      lines: ["Look at the tens digit first.", "Fewer tens means a smaller number.", "Same tens? Then look at the ones."],
      example: { type: "steps", title: "Order 39, 93, 33, 99", steps: ["33 and 39 have 3 tens.", "93 and 99 have 9 tens.", "So: 33, 39, 93, 99."] },
    },
    {
      title: "What is a digit worth?",
      lines: ["The ones digit is worth just ones.", "The tens digit is worth that many tens.", "In 52, the 5 is worth 50."],
      example: { type: "equation", title: "Splitting 52", parts: ["52", "=", "50", "+", "2"], note: "5 tens and 2 ones." },
    },
  ],
  "less-than-greater-than-and-equal-to": [
    {
      title: "Choose <, > or =",
      lines: ["< means less than. > means greater than.", "The open side faces the bigger number.", "= means both sides are the same."],
      example: { type: "equation", title: "Compare 42 and 52", parts: ["42", "<", "52"], note: "42 is less than 52." },
    },
    {
      title: "Find a number that fits",
      lines: ["Read the sign first.", "Try each number. Is it true now?", "A number is never bigger than itself."],
      example: { type: "equation", title: "27 > ?", parts: ["27", ">", "19"], note: "27 > 27 is false. 27 > 19 is true." },
    },
    {
      title: "Make every < true",
      lines: ["Find the smallest number. Put it first.", "Each next number must be bigger.", "Check the tens, then the ones."],
      example: { type: "equation", title: "A true chain", parts: ["14", "<", "19", "<", "41", "<", "49"] },
    },
    {
      title: "Find a number in between",
      lines: ["Greater than 30 means bigger than 30.", "Less than 35 means smaller than 35.", "The 2 edge numbers do not count."],
      example: { type: "jumps", title: "Greater than 30, less than 35", terms: ["30", "31", "32", "33", "34", "35"], step: "+1", note: "31, 32, 33 or 34 all work." },
    },
  ],
};
