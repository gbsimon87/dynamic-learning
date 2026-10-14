/**
 * Bix's lessons for Year 4 Addition and Subtraction, one per challenge slot.
 * Each one teaches what that challenge asks (see year4Math/builders/addSubtract.js).
 */
export const ADD_SUBTRACT_LESSONS = {
  "column-addition-and-subtraction": [
    {
      title: "Add and subtract in columns",
      lines: ["Line up thousands, hundreds, tens and ones.", "Start with the ones column, then move left.", "Work out each column on its own."],
      example: { type: "column", title: "Column by column", top: "3524", op: "+", bottom: "2153", answer: "5677", note: "No column reaches 10, so there is no exchange." },
    },
    {
      title: "Exchange in one column",
      lines: ["If a column adds to 10 or more, exchange 10 for 1 in the next column.", "If a top digit is too small, exchange 1 from the next column on the left.", "Check the sign before you start."],
      example: { type: "column", title: "Exchanging in the ones", top: "4528", op: "+", bottom: "2364", answer: "6892", note: "8 + 4 = 12: write 2 and exchange 1 ten." },
    },
    {
      title: "Build an answer with exchanges",
      lines: ["Some sums need more than one exchange.", "Work out the full answer in the columns first.", "Then place its digits from left to right. One tile is spare."],
      example: { type: "column", title: "Two exchanges", top: "6214", op: "−", bottom: "3158", answer: "3056", note: "Exchange in the ones and the tens. Place 3, 0, 5, 6." },
    },
    {
      title: "Solve a column problem",
      lines: ["Read the story. Is something added on, or taken away?", "Sold, empty or left means subtract. Altogether means add.", "Then use the columns as before."],
      example: { type: "column", title: "5240 rolls, 1835 are sold", top: "5240", op: "−", bottom: "1835", answer: "3405", note: "3405 rolls are left." },
    },
  ],
  "estimating-and-checking-calculations": [
    {
      title: "Estimate by rounding first",
      lines: ["Round each number to the nearest 1000 first.", "500 or more in the hundreds rounds up.", "Then add or subtract the rounded numbers."],
      example: { type: "table", title: "Estimate 3612 + 1288", headers: ["Number", "Nearest 1000"], rows: [["3612", "4000"], ["1288", "1000"]], note: "4000 + 1000 = 5000, so the answer is about 5000." },
    },
    {
      title: "Check with the inverse",
      lines: ["Subtraction undoes addition.", "Addition undoes subtraction.", "Do the inverse and you should get the number you started with."],
      example: { type: "equation", title: "Check 2400 + 1300 = 3700", parts: ["3700", "−", "1300", "=", "2400"], note: "We got 2400 back, so the sum is right." },
    },
    {
      title: "Build an inverse check",
      lines: ["To check an addition, build a subtraction.", "To check a subtraction, build an addition.", "Use every number from the fact."],
      example: { type: "equation", title: "For 5600 − 1500 = 4100", parts: ["4100", "+", "1500", "=", "5600"], note: "Adding back gives the starting number." },
    },
    {
      title: "Judge if a sum is right",
      lines: ["Use the inverse to check someone's answer.", "If you get the first number back, they are right.", "If not, work out the correct answer."],
      example: { type: "steps", title: "Tom says 2300 + 1200 = 3600", steps: ["3600 − 1200 = 2400.", "2400 is not 2300, so Tom is wrong.", "2300 + 1200 = 3500."] },
    },
  ],
  "two-step-addition-and-subtraction-problems": [
    {
      title: "Follow two steps in a story",
      lines: ["Some stories need 2 steps.", "The tip tells you which step comes first.", "Do the first step, then use that answer in the second."],
      example: { type: "steps", title: "3000 sheep, 400 lambs born, 200 sold", steps: ["3000 + 400 = 3400.", "3400 − 200 = 3200.", "There are 3200 sheep."] },
    },
    {
      title: "Find the two steps",
      lines: ["Now you decide which steps to do.", "More, born or hatched means add.", "Used, lost or taken away means subtract."],
      example: { type: "equation", title: "4250 kg of sand, drop 320 kg and 150 kg", parts: ["4250", "−", "320", "−", "150", "=", "3780"], note: "Two take-aways in a row." },
    },
    {
      title: "Build the story calculation",
      lines: ["Start with the first number in the story.", "Put + before what is added.", "Put − before what is taken away."],
      example: { type: "equation", title: "5100 tickets, 300 refunded, 250 more sold", parts: ["5100", "−", "300", "+", "250", "=", "5050"], note: "Start, take away, then add." },
    },
    {
      title: "Solve a two-step problem",
      lines: ["Some numbers are hidden in the words, like less or further.", "Work out the hidden number first.", "Then do the second step. Is it altogether, or what is left?"],
      example: { type: "steps", title: "A shop took £2500 on Saturday and £400 less on Sunday.", steps: ["Sunday: 2500 − 400 = 2100.", "Together: 2500 + 2100 = 4600.", "The shop took £4600 altogether."] },
    },
  ],
};
