/**
 * Bix's lessons for Year 3 Addition and Subtraction, one per challenge slot.
 * Each one teaches exactly what that challenge asks (see PlaceChangeGame,
 * ColumnMethodGame, EstimatingGame, MissingNumberGame and ProblemStoryGame).
 */
export const ADD_SUBTRACT_LESSONS = {
  "adding-and-subtracting-ones-tens-and-hundreds": [
    {
      title: "Change one place",
      lines: ["Adding 1, 10 or 100 changes just one digit.", "Find the place: ones, tens or hundreds.", "Make that digit 1 more or 1 less."],
      example: { type: "table", title: "What is 10 more than 352?", headers: ["", "H", "T", "O"], rows: [["Start", "3", "5", "2"], ["10 more", "3", "6", "2"]], note: "Only the tens digit changes, so the answer is 362." },
    },
    {
      title: "Work it out in your head",
      lines: ["Think about which place is changing.", "Sometimes a place goes past 9.", "Then 10 of them swap for 1 in the next place."],
      example: { type: "equation", title: "Going past 9 tens", parts: ["396", "+", "10", "=", "406"], note: "9 tens and 1 more ten make 1 hundred." },
    },
    {
      title: "Build the new number",
      lines: ["Start with the blocks for the first number.", "Do one change at a time.", "Count the blocks to check your number."],
      example: { type: "steps", title: "Start at 245. Add 100, then take away 10", steps: ["Start with 245.", "Add 1 hundred block: 345.", "Take away 1 ten block: 335."], note: "Two changes, one after the other." },
    },
    {
      title: "Solve the number story",
      lines: ["Find the start number in the story.", "More or less? Is it 1, 10 or 100?", "Change that one place."],
      example: { type: "equation", title: "A jar has 538 beads. 100 more go in", parts: ["538", "+", "100", "=", "638"], note: "The jar now has 638 beads." },
    },
  ],
  "column-addition": [
    {
      title: "Add each column",
      lines: ["Line up ones under ones, tens under tens.", "Start with the ones column.", "Then add the tens, then the hundreds."],
      example: { type: "column", title: "132 + 245", top: "132", op: "+", bottom: "245", answer: "377", note: "2 + 5 = 7, 3 + 4 = 7, 1 + 2 = 3." },
    },
    {
      title: "Exchange ten ones for one ten",
      lines: ["Sometimes the ones add up to 10 or more.", "Swap 10 ones for 1 ten.", "Carry that ten into the tens column."],
      example: { type: "steps", title: "347 + 125", steps: ["Ones: 7 + 5 = 12. Write 2, carry 1 ten.", "Tens: 4 + 2 + 1 = 7.", "Hundreds: 3 + 1 = 4.", "So 347 + 125 = 472."] },
    },
    {
      title: "Fill in the whole answer",
      lines: ["Work from the ones to the hundreds.", "Carry a ten or a hundred when a column makes 10 or more.", "Add the carried digit into the next column."],
      example: { type: "column", title: "276 + 158", top: "276", op: "+", bottom: "158", answer: "434", note: "Ones make 14 and tens make 13, so carry twice." },
    },
    {
      title: "Solve an adding story",
      lines: ["Words like altogether and in all mean add.", "Write the two numbers in columns.", "Add from the ones, carrying when you need to."],
      example: { type: "steps", title: "There are 264 red cars and 318 blue cars", steps: ["How many cars in all?", "Ones: 4 + 8 = 12. Write 2, carry 1.", "Tens: 6 + 1 + 1 = 8. Hundreds: 2 + 3 = 5.", "There are 582 cars in all."] },
    },
  ],
  "column-subtraction": [
    {
      title: "Subtract each column",
      lines: ["Put the bigger number on top.", "Start with the ones column.", "Take the bottom digit away from the top digit."],
      example: { type: "column", title: "768 − 325", top: "768", op: "−", bottom: "325", answer: "443", note: "8 − 5 = 3, 6 − 2 = 4, 7 − 3 = 4." },
    },
    {
      title: "Exchange one ten for ten ones",
      lines: ["Sometimes the top ones digit is too small.", "Take 1 ten from the tens column.", "Swap it for 10 ones, then subtract."],
      example: { type: "steps", title: "752 − 318", steps: ["Ones: 2 − 8 is too small.", "Exchange 1 ten: 12 − 8 = 4.", "Tens: 4 − 1 = 3.", "Hundreds: 7 − 3 = 4. So 752 − 318 = 434."] },
    },
    {
      title: "Fill in the whole answer",
      lines: ["Check each column from the ones.", "If the tens are 0, exchange a hundred first.", "Then you can exchange a ten for ten ones."],
      example: { type: "steps", title: "503 − 267", steps: ["0 tens, so exchange 1 hundred for 10 tens.", "Exchange 1 ten: now 13 ones and 9 tens.", "13 − 7 = 6, 9 − 6 = 3, 4 − 2 = 2.", "So 503 − 267 = 236."] },
    },
    {
      title: "Solve a taking away story",
      lines: ["Words like left, remain and sold mean subtract.", "Put the starting number on top.", "Subtract in columns, exchanging when you need to."],
      example: { type: "column", title: "A farm had 645 eggs. It sold 278", top: "645", op: "−", bottom: "278", answer: "367", note: "The farm has 367 eggs left." },
    },
  ],
  "estimating-and-checking-answers": [
    {
      title: "Find a quick estimate",
      lines: ["An estimate is a close guess, not the exact answer.", "Round each number to the nearest 10.", "Then add the rounded numbers."],
      example: { type: "steps", title: "About how much is 263 + 128?", steps: ["263 rounds to 260.", "128 rounds to 130.", "260 + 130 = 390."], note: "263 + 128 is about 390." },
    },
    {
      title: "Round to the nearest hundred",
      lines: ["Look at the tens digit.", "If it is 5 or more, round up.", "If it is 4 or less, round down."],
      example: { type: "table", title: "About how much is 784 − 315?", headers: ["Number", "Nearest 100"], rows: [["784", "800"], ["315", "300"]], note: "800 − 300 = 500, so the answer is about 500." },
    },
    {
      title: "Check with the inverse",
      lines: ["Adding and subtracting undo each other.", "Take the answer and do the opposite sum.", "If you get back to the start, it is right."],
      example: { type: "equation", title: "Is 352 + 216 = 568 right?", parts: ["568", "−", "216", "=", "352"], note: "We got back to 352, so yes, it is right." },
    },
    {
      title: "Estimate, then check",
      lines: ["Round both numbers to the nearest 100 for an estimate.", "An answer far from the estimate is not sensible.", "Then do the inverse to be sure."],
      example: { type: "steps", title: "Someone says 412 + 279 = 891", steps: ["Estimate: 400 + 300 = 700.", "891 is far from 700, so it is not sensible.", "Check: 891 − 279 = 612.", "612 is not 412, so 891 is wrong."], note: "The right answer is 691, close to 700." },
    },
  ],
  "missing-number-problems": [
    {
      title: "Find the missing part",
      lines: ["The missing part fills the gap to the total.", "Count on from the part you know.", "Add up your jumps to find the gap."],
      example: { type: "jumps", title: "214 + ? = 389", terms: ["214", "314", "384", "389"], note: "Jumps of 100, 70 and 5 make 175." },
    },
    {
      title: "Use addition to help subtract",
      lines: ["The whole take away a part leaves the other part.", "So the missing part plus what is left makes the whole.", "Count on from what is left."],
      example: { type: "steps", title: "652 − ? = 418", steps: ["Think: 418 + ? = 652.", "418 + 200 = 618.", "618 + 34 = 652.", "200 + 34 = 234, so 652 − 234 = 418."] },
    },
    {
      title: "One number fits both blanks",
      lines: ["A part plus a part makes the whole.", "Whole take away one part gives the other part.", "Both blanks hide the same number."],
      example: { type: "equation", title: "? + 235 = 560", parts: ["560", "−", "235", "=", "325"], note: "325 + 235 = 560 too, so 325 fits both." },
    },
    {
      title: "Find the missing story number",
      lines: ["Find what you know: a part or the whole.", "Find the whole, then the part you know.", "Take the part away from the whole."],
      example: { type: "steps", title: "Mia had some stickers", steps: ["She got 145 more and now has 420.", "420 is the whole. 145 is one part.", "420 − 145 = 275.", "Mia had 275 stickers before."] },
    },
  ],
  "addition-and-subtraction-problems": [
    {
      title: "Choose the answer to the story",
      lines: ["Read the story and find the two numbers.", "Altogether means add. Left means subtract.", "Work it out, then pick your answer."],
      example: { type: "equation", title: "Sam has 356 stamps. Jo has 218. How many altogether?", parts: ["356", "+", "218", "=", "574"], note: "Altogether means add, so there are 574 stamps." },
    },
    {
      title: "Solve the story in two steps",
      lines: ["Some stories have two changes.", "Do the first change and write the answer.", "Use that answer for the second change."],
      example: { type: "steps", title: "A farm has 450 eggs. 120 are sold, then 75 are laid", steps: ["First: 450 − 120 = 330.", "Then: 330 + 75 = 405.", "The farm has 405 eggs now."] },
    },
    {
      title: "Choose the number sentence",
      lines: ["Each change in the story gets a + or a −.", "Getting more means +. Losing some means −.", "Pick the sentence, then work it out."],
      example: { type: "table", title: "Which sign?", headers: ["Story words", "Sign"], rows: [["buys, gets, returned, more", "+"], ["sells, uses, borrowed, gives away", "−"]], note: "Put the signs in the same order as the story." },
    },
    {
      title: "Solve the whole story",
      lines: ["Find the start number.", "Do each change in order, one at a time.", "Check your answer makes sense."],
      example: { type: "steps", title: "A shop has 524 pens", steps: ["It buys 236 more, then sells 180.", "524 + 236 = 760.", "760 − 180 = 580.", "The shop has 580 pens."] },
    },
  ],
};
