/**
 * Bix's lessons for Year 4 Number and Place Value, one per challenge slot.
 * Each one teaches exactly what that challenge asks (see Year4MathGame /
 * year4Math/questions.js).
 */
export const PLACE_VALUE_LESSONS = {
  "counting-in-multiples-of-6-7-9-25-and-1000": [
    {
      title: "Count on in multiples",
      lines: ["Counting in multiples means adding the same number each time.", "The rule tells you the step. The count may not start at 0.", "Add the step to the number before each gap."],
      example: { type: "jumps", title: "Counting in 9s from 45", terms: ["45", "54", "63", "72", "81"], step: "+9", note: "Each jump adds 9." },
    },
    {
      title: "Find the counting rule",
      lines: ["Find two numbers that sit next to each other.", "The difference between them is the step.", "If the numbers get smaller, take the step away instead."],
      example: { type: "steps", title: "175, ?, 125, 100, ?", steps: ["125 − 100 = 25, and the numbers go down.", "So the rule is take away 25.", "175 − 25 = 150 and 100 − 25 = 75."] },
    },
    {
      title: "Put multiples in order",
      lines: ["Increasing order means smallest first.", "Look at the biggest place value first.", "Some multiples may be missing, so look at size, not gaps."],
      example: { type: "jumps", title: "Multiples of 9 in order", terms: ["54", "63", "81", "99"], note: "Smallest on the left, largest on the right." },
    },
    {
      title: "Solve a jumping problem",
      lines: ["Find the start and the size of each jump.", "Count on one jump at a time.", "Or multiply the jump by the number of jumps, then add."],
      example: { type: "equation", title: "Start at 50, jump 6 three times", parts: ["50", "+", "3", "×", "6", "=", "68"], note: "3 jumps of 6 is 18, and 50 + 18 = 68." },
    },
  ],
  "finding-1000-more-or-less": [
    {
      title: "Change the thousands digit",
      lines: ["1000 more makes the thousands digit 1 bigger.", "1000 less makes it 1 smaller.", "Do not change the hundreds digit. Hundreds, tens and ones stay the same."],
      example: { type: "equation", title: "1000 more", parts: ["3462", "+", "1000", "=", "4462"], note: "Only the thousands digit changed, from 3 to 4." },
    },
    {
      title: "Type 1000 more or less",
      lines: ["Read the word more or less first.", "Change only the thousands digit by 1.", "Copy the other 3 digits exactly."],
      example: { type: "equation", title: "1000 less", parts: ["7059", "−", "1000", "=", "6059"], note: "The 0 in the hundreds place stays as 0." },
    },
    {
      title: "Order numbers 1000 apart",
      lines: ["These numbers have the same last 3 digits.", "Only the thousands digit is different.", "Put the smallest thousands digit first."],
      example: { type: "jumps", title: "Going up in 1000s", terms: ["2815", "3815", "4815", "5815"], step: "+1000", note: "Each number is 1000 more than the one before." },
    },
    {
      title: "Solve a 1000 more story",
      lines: ["Receives or gains means 1000 more.", "Lends or loses means 1000 less.", "Change the thousands digit, then read your number."],
      example: { type: "steps", title: "A shop has 5230 pens and sells 1000", steps: ["Sells means fewer, so find 1000 less.", "The thousands digit goes from 5 to 4.", "5230 − 1000 = 4230 pens."] },
    },
  ],
  "counting-backwards-through-zero": [
    {
      title: "Count past zero",
      lines: ["Numbers carry on below 0: −1, −2, −3 and so on.", "Counting back goes left. Counting on goes right.", "Count every jump, including the jump to or from 0."],
      example: { type: "jumps", title: "Count on 4 from −2", terms: ["−2", "−1", "0", "1", "2"], step: "+1", note: "4 jumps on from −2 lands on 2." },
    },
    {
      title: "Find a gap or a start",
      lines: ["To find a gap, count from the first number to 0, then on.", "To find a start, count on from where Bix landed.", "Counting on undoes counting back."],
      example: { type: "steps", title: "How many steps from −3 to 4?", steps: ["−3 to 0 is 3 steps.", "0 to 4 is 4 steps.", "3 + 4 = 7 steps."] },
    },
    {
      title: "Order temperatures",
      lines: ["Temperatures below 0 are colder than 0°C.", "−5°C is colder than −1°C.", "Coldest goes first, warmest goes last."],
      example: { type: "jumps", title: "Coldest to warmest", terms: ["−8°C", "−3°C", "0°C", "4°C"], note: "The bigger the number after −, the colder it is." },
    },
    {
      title: "Solve a temperature problem",
      lines: ["Colder means count back. Warmer means count on.", "Count to 0 first.", "Then count the rest of the degrees past 0."],
      example: { type: "steps", title: "It is 2°C and gets 5 degrees colder", steps: ["2°C down to 0°C is 2 degrees.", "3 more degrees: −1, −2, −3.", "The new temperature is −3°C."] },
    },
  ],
  "place-value-in-4-digit-numbers": [
    {
      title: "Find a digit's value",
      lines: ["A 4-digit number has thousands, hundreds, tens and ones.", "The place tells you what the digit is worth.", "The same digit can be worth 2, 20, 200 or 2000."],
      example: { type: "table", title: "The number 5283", headers: ["Thousands", "Hundreds", "Tens", "Ones"], rows: [["5", "2", "8", "3"], ["5000", "200", "80", "3"]], note: "The 2 is in the hundreds place, so it is worth 200." },
    },
    {
      title: "Type a digit's value",
      lines: ["Find the digit in the place you are asked about.", "Write the digit, then add zeros for its place.", "Hundreds get 2 zeros, tens get 1 zero."],
      example: { type: "steps", title: "The tens digit in 6417", steps: ["The tens digit is 1.", "Tens get 1 zero.", "The value is 10."] },
    },
    {
      title: "Split a number into its parts",
      lines: ["Expanded form splits a number into its place values.", "Start with the thousands and go right.", "Join the parts with + signs."],
      example: { type: "equation", title: "Expanding 3726", parts: ["3000", "+", "700", "+", "20", "+", "6", "=", "3726"], note: "Add the parts back together to check." },
    },
    {
      title: "Make a number from its parts",
      lines: ["Write the thousands digit first.", "Then the hundreds, tens and ones digits in order.", "If a place has 0, still write the 0."],
      example: { type: "table", title: "4 thousands, 0 hundreds, 5 tens, 9 ones", headers: ["Thousands", "Hundreds", "Tens", "Ones"], rows: [["4", "0", "5", "9"]], note: "The number is 4059." },
    },
  ],
  "ordering-and-comparing-numbers-beyond-1000": [
    {
      title: "Find the greater number",
      lines: ["Compare the thousands digits first.", "If they match, compare the hundreds, then tens, then ones.", "The first place with a bigger digit wins."],
      example: { type: "table", title: "4312 or 4412?", headers: ["Number", "Thousands", "Hundreds"], rows: [["4312", "4", "3"], ["4412", "4", "4"]], note: "Thousands match, but 4 hundreds beats 3 hundreds." },
    },
    {
      title: "Choose the right sign",
      lines: ["< means less than and > means greater than.", "The open mouth faces the bigger number.", "Use = when both numbers are the same."],
      example: { type: "equation", title: "Comparing two numbers", parts: ["2650", "<", "2660"], note: "The tens digit decides: 5 tens is less than 6 tens." },
    },
    {
      title: "Put big numbers in order",
      lines: ["Find the smallest number first.", "Compare one place at a time, from the left.", "Keep going until every number has a spot."],
      example: { type: "jumps", title: "Smallest to largest", terms: ["1587", "1597", "1687", "2587"], note: "Each number is bigger than the one before it." },
    },
    {
      title: "Compare town populations",
      lines: ["Read the question: most, fewest or how many more?", "Compare thousands first, then hundreds, tens and ones.", "For how many more, take the smallest away from the largest."],
      example: { type: "table", title: "People in 3 towns", headers: ["Town", "People"], rows: [["Oakley", "1240"], ["Ashby", "2140"], ["Elmore", "1420"]], note: "Ashby has the most and Oakley the fewest. 2140 − 1240 = 900 more." },
    },
  ],
  "representing-and-estimating-numbers": [
    {
      title: "Find the halfway mark",
      lines: ["The spaces on a number line are equal.", "Halfway is the same distance from both ends.", "Halve the gap between the ends, then add it to the start."],
      example: { type: "jumps", title: "From 2300 to 2500", terms: ["2300", "2400", "2500"], step: "+100", note: "2400 is halfway between 2300 and 2500." },
    },
    {
      title: "Estimate on a number line",
      lines: ["An estimate is a good guess, not an exact answer.", "Use the middle mark: on a 0 to 10000 line it is 5000.", "Judge where the dot sits, then pick the nearest thousand."],
      example: { type: "steps", title: "A dot between 0 and 5000", steps: ["The dot is a bit past halfway to 5000.", "Halfway to 5000 is 2500.", "A bit past 2500 is about 3000."] },
    },
    {
      title: "Order numbers on a line",
      lines: ["Numbers grow as you move right on a number line.", "Compare the hundreds digits.", "Put the smallest position first."],
      example: { type: "jumps", title: "Marks in order", terms: ["3800", "3900", "4000", "4100"], step: "+100", note: "Going up 100 from one mark to the next." },
    },
    {
      title: "Find the halfway point",
      lines: ["A ruler or a road is like a number line.", "Halfway between two marks is the middle.", "Halve the gap, then add it to the smaller mark."],
      example: { type: "equation", title: "Halfway from 1500 mm to 1700 mm", parts: ["1500", "+", "100", "=", "1600"], note: "The gap is 200 mm, and half of 200 is 100." },
    },
  ],
  "rounding-to-10-100-and-1000": [
    {
      title: "Choose the rounded number",
      lines: ["Rounding finds the nearest 10, 100 or 1000.", "Look at the digit just right of that place.", "5 or more rounds up; 4 or less rounds down."],
      example: { type: "table", title: "Rounding 4673", headers: ["To the nearest", "Answer"], rows: [["10", "4670"], ["100", "4700"], ["1000", "5000"]], note: "Each time, check the next digit to the right." },
    },
    {
      title: "Type the rounded number",
      lines: ["Find the place you are rounding to.", "Check the digit to its right.", "Change the digits after it to zeros."],
      example: { type: "steps", title: "Round 2348 to the nearest 100", steps: ["The hundreds digit is 3.", "The next digit is 4, so round down.", "2348 rounds to 2300."] },
    },
    {
      title: "Sort by the nearest one",
      lines: ["Each number goes in the box it rounds to.", "Halfway or above rounds up.", "Below halfway rounds down."],
      example: { type: "table", title: "Nearest 10: 5320 or 5330?", headers: ["Number", "Goes to"], rows: [["5324", "5320"], ["5326", "5330"]], note: "4 ones rounds down, 6 ones rounds up." },
    },
    {
      title: "Round for a report",
      lines: ["Rounded numbers are easy to read and say.", "Find the place you need to round to.", "Use the next digit to round up or down."],
      example: { type: "steps", title: "6812 visitors to the nearest 1000", steps: ["The thousands digit is 6.", "The hundreds digit is 8, so round up.", "6812 is about 7000 visitors."] },
    },
  ],
  "place-value-problems": [
    {
      title: "Add hundreds to a number",
      lines: ["Adding hundreds only changes the hundreds digit.", "If the hundreds go past 9, exchange 10 hundreds for 1 thousand.", "The tens and ones stay the same."],
      example: { type: "column", title: "Adding 300", top: "2541", bottom: "300", op: "+", answer: "2841", note: "5 hundreds + 3 hundreds = 8 hundreds." },
    },
    {
      title: "Exchange extra hundreds",
      lines: ["A place can only hold up to 9.", "10 hundreds make 1 thousand, so exchange them.", "14 hundreds is 1 thousand and 4 hundreds."],
      example: { type: "equation", title: "3 thousands, 14 hundreds, 2 tens, 5 ones", parts: ["3000", "+", "1400", "+", "20", "+", "5", "=", "4425"], note: "The 14 hundreds give 1 more thousand, so 4425." },
    },
    {
      title: "Build a number from place values",
      lines: ["Split the number into thousands, hundreds, tens and ones.", "Each part gets zeros for its place.", "Put them in order with + signs."],
      example: { type: "equation", title: "Building 5208", parts: ["5000", "+", "200", "+", "0", "+", "8", "=", "5208"], note: "0 tens is worth 0." },
    },
    {
      title: "Solve a shop stock problem",
      lines: ["First make the number: boxes of 1000, packs of 100, then loose ones.", "Then take away what the shop sells.", "Selling thousands only changes the thousands digit."],
      example: { type: "steps", title: "5 boxes of 1000, 3 packs of 100, 6 loose; 2000 sold", steps: ["5000 + 300 + 6 = 5306 stickers.", "5306 − 2000 = 3306.", "There are 3306 stickers left."] },
    },
  ],
  "roman-numerals-to-100": [
    {
      title: "Learn the Roman letters",
      lines: ["I is 1, V is 5, X is 10, L is 50, C is 100.", "A small letter before a big one means take away.", "Romans had no numeral for 0."],
      example: { type: "table", title: "Roman numerals", headers: ["Roman", "Value"], rows: [["I", "1"], ["V", "5"], ["X", "10"], ["L", "50"], ["C", "100"]] },
    },
    {
      title: "Read a Roman numeral",
      lines: ["Read the letters from left to right.", "Add them when big comes before small.", "Take away when small comes before big."],
      example: { type: "steps", title: "Reading XXIV", steps: ["XX is 10 + 10 = 20.", "IV is 5 − 1 = 4.", "20 + 4 = 24."] },
    },
    {
      title: "Order Roman numerals",
      lines: ["Change each Roman numeral into our digits.", "Then order the numbers smallest first.", "Write them back as Roman numerals."],
      example: { type: "table", title: "Smallest to largest", headers: ["Roman", "Value"], rows: [["XII", "12"], ["XIX", "19"], ["XXI", "21"], ["XXX", "30"]], note: "XIX looks long, but it is only 19." },
    },
    {
      title: "Read clocks and old stones",
      lines: ["Clocks and old buildings often use Roman numerals.", "Split the numeral into tens and ones.", "Write the value with our digits."],
      example: { type: "steps", title: "A stone shows LXVII", steps: ["L is 50 and X is 10: 60.", "VII is 5 + 1 + 1 = 7.", "60 + 7 = 67."] },
    },
  ],
};
