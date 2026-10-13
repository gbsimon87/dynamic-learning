/**
 * Bix's lessons for Year 4 Addition and Subtraction, one per challenge slot.
 * Each one teaches what that challenge asks (see year4Math/questions.js).
 */
export const ADD_SUBTRACT_LESSONS = {
  "column-addition-and-subtraction": [
    {
      title: "Add and subtract in columns",
      lines: ["Line up thousands, hundreds, tens and ones.", "Start with the ones column, then move left.", "Work out each column on its own."],
      example: { type: "column", title: "Column by column", top: "3333", op: "+", bottom: "1111", answer: "4444", note: "3 + 1 = 4 in every column." },
    },
    {
      title: "Exchange when you need to",
      lines: ["If a column adds to 10 or more, exchange 10 for 1 in the next column.", "If the top digit is too small, borrow 1 from the next column.", "Check the sign before you start."],
      example: { type: "column", title: "Exchanging tens", top: "4528", op: "+", bottom: "2365", answer: "6893", note: "8 + 5 = 13: write 3 and carry 1 ten." },
    },
    {
      title: "Place the digits in order",
      lines: ["Work out the full answer in the columns first.", "Then place its digits from left to right.", "One tile is spare, so do not use it."],
      example: { type: "column", title: "Work it out, then build it", top: "6214", op: "−", bottom: "3152", answer: "3062", note: "Place 3, then 0, then 6, then 2." },
    },
    {
      title: "Solve a stadium seat problem",
      lines: ["More seats added means add.", "Empty seats taken away from all seats means subtract.", "Then use the columns as before."],
      example: { type: "column", title: "5240 seats, 1830 are empty", top: "5240", op: "−", bottom: "1830", answer: "3410", note: "3410 seats are occupied." },
    },
  ],
  "estimating-and-checking-calculations": [
    {
      title: "Estimate by rounding first",
      lines: ["Round each number to the nearest 1000 first.", "500 or more in the hundreds rounds up.", "Then add the rounded numbers."],
      example: { type: "table", title: "Estimate 3612 + 1288", headers: ["Number", "Nearest 1000"], rows: [["3612", "4000"], ["1288", "1000"]], note: "4000 + 1000 = 5000, so the answer is about 5000." },
    },
    {
      title: "Check with subtraction",
      lines: ["Subtraction undoes addition.", "Take one number away from the total.", "You should get the other number back."],
      example: { type: "equation", title: "Check 2400 + 1300 = 3700", parts: ["3700", "−", "2400", "=", "1300"], note: "We got 1300 back, so the sum is right." },
    },
    {
      title: "Build an inverse check",
      lines: ["Start with the total.", "Subtract the second number.", "The answer should be the first number."],
      example: { type: "equation", title: "For 4100 + 1500 = 5600", parts: ["5600", "−", "1500", "=", "4100"], note: "Total, take away, equals the first number." },
    },
    {
      title: "Was the sum right?",
      lines: ["Subtract the second number from the given total.", "Compare your answer with the first number.", "If they do not match, the sum was wrong."],
      example: { type: "steps", title: "Tom says 2300 + 1200 = 3600", steps: ["3600 − 1200 = 2400.", "2400 is not 2300.", "So Tom was wrong."] },
    },
  ],
  "two-step-addition-and-subtraction-problems": [
    {
      title: "Two steps in a story",
      lines: ["Some stories need 2 steps.", "Books received means add.", "Books lent means subtract."],
      example: { type: "steps", title: "3000 books, get 400, lend 200", steps: ["3000 + 400 = 3400.", "3400 − 200 = 3200.", "3200 books remain."] },
    },
    {
      title: "Add first, then subtract",
      lines: ["Do the steps in the order of the story.", "Use columns if the numbers are big.", "Check: the answer should be close to the start."],
      example: { type: "equation", title: "Books left", parts: ["4250", "+", "320", "−", "150", "=", "4420"], note: "Add 320, then take away 150." },
    },
    {
      title: "Build the calculation",
      lines: ["Start with the number of books.", "Put + before the books received.", "Put − before the books lent."],
      example: { type: "equation", title: "5100 books, get 300, lend 250", parts: ["5100", "+", "300", "−", "250", "=", "5150"], note: "Start, add, then subtract." },
    },
    {
      title: "Solve it on your own",
      lines: ["Read the story and find all 3 numbers.", "Add the books received, then subtract the books lent.", "Estimate first to check your answer."],
      example: { type: "steps", title: "2800 books, get 600, lend 300", steps: ["2800 + 600 = 3400.", "3400 − 300 = 3100.", "Estimate: 3000 + 600 − 300 is about 3300."] },
    },
  ],
};
