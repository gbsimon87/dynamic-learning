/**
 * Bix's lessons for Year 3 Number and Place Value, one per challenge slot. Each
 * one teaches exactly what that challenge asks (see the challenge files under
 * challenges/year3/<topic-id>/ and their builders in src/data/challenges/).
 */
export const PLACE_VALUE_LESSONS = {
  "counting-in-multiples-of-4-8-50-and-100": [
    {
      title: "Keep the count going",
      lines: ["Counting in 8s means adding 8 each time.", "Find the last number, then add the step to it.", "8 is double 4, so the 8s count is every other 4s number."],
      example: { type: "jumps", title: "Counting in 8s from 0", terms: ["0", "8", "16", "24", "32"], step: "+8", note: "32 + 8 = 40, so 40 comes next." },
    },
    {
      title: "Find the missing number",
      lines: ["First find the step.", "Take one number away from the number next to it.", "Then add the step to the number before the gap."],
      example: { type: "steps", title: "150, 200, ?, 300", steps: ["200 − 150 = 50, so the step is 50.", "200 + 50 = 250.", "Check: 250 + 50 = 300."], note: "The missing number is 250." },
    },
    {
      title: "Put the count in order",
      lines: ["All the numbers are in the same count.", "Find the smallest number and put it first.", "Each next card should be one step bigger."],
      example: { type: "jumps", title: "Jumbled: 300, 100, 500, 200, 400", terms: ["100", "200", "300", "400", "500"], step: "+100", note: "Each card is 100 more than the one before." },
    },
    {
      title: "Count it out",
      lines: ["Start at 0, but do not say 0.", "The 1st number you say is the step itself.", "To check, multiply: the 5th number in 4s is 5 × 4."],
      example: { type: "table", title: "Counting in 4s from 0", headers: ["Count", "1st", "2nd", "3rd", "4th", "5th"], rows: [["4s", "4", "8", "12", "16", "20"]], note: "5 × 4 = 20, so the 5th number is 20." },
    },
  ],
  "finding-10-or-100-more-or-less": [
    {
      title: "Fill the gap in the strip",
      lines: ["10 more or 10 less changes the tens digit by 1.", "100 more or 100 less changes the hundreds digit by 1.", "Read the label above the gap to choose the jump."],
      example: { type: "table", title: "The strip for 248", headers: ["Jump", "100 less", "10 less", "Start", "10 more", "100 more"], rows: [["Number", "148", "238", "248", "258", "348"]], note: "Only one digit moves, and the ones stay the same." },
    },
    {
      title: "What jump was made?",
      lines: ["Compare the two numbers digit by digit.", "Did the tens or the hundreds change? Did it go up or down?", "Watch out near a hundred: 395 and 10 more is 405."],
      example: { type: "steps", title: "From 482 to 382", steps: ["The tens and ones stay the same.", "The hundreds digit goes down by 1.", "So the jump is 100 less."] },
    },
    {
      title: "Fill in every neighbour",
      lines: ["Start with the number in the middle.", "Do 10 less and 10 more first, then 100 less and 100 more.", "Count on in 10s to check when you cross a hundred."],
      example: { type: "table", title: "Every neighbour of 296", headers: ["Jump", "100 less", "10 less", "Start", "10 more", "100 more"], rows: [["Number", "196", "286", "296", "306", "396"]], note: "296 and 10 more crosses into the next hundred: 306." },
    },
    {
      title: "Where does the count land?",
      lines: ["Start at the first number.", "Make one jump at a time and say each new number.", "Count your jumps so you stop at the right one."],
      example: { type: "jumps", title: "Count on in 10s three times from 386", terms: ["386", "396", "406", "416"], step: "+10", note: "3 jumps of 10 from 386 lands on 416." },
    },
  ],
  "place-value-in-3-digit-numbers": [
    {
      title: "Count the blocks",
      lines: ["A flat is 100, a rod is 10 and a small cube is 1.", "Look only at the blocks the question asks about.", "Count them: that number is the digit for that place."],
      example: { type: "table", title: "2 flats, 6 rods and 4 cubes", headers: ["Number", "Hundreds", "Tens", "Ones"], rows: [["264", "2", "6", "4"]], note: "6 rods means 6 tens, worth 60." },
    },
    {
      title: "What number do the blocks make?",
      lines: ["Count the flats, then the rods, then the cubes.", "Write the hundreds digit, then the tens, then the ones.", "No rods? Write 0 in the tens place."],
      example: { type: "steps", title: "3 flats, 5 rods and 9 cubes", steps: ["3 flats make 300.", "5 rods make 50.", "9 cubes make 9.", "300 + 50 + 9 = 359."] },
    },
    {
      title: "Build the number",
      lines: ["Read the number one digit at a time.", "Hundreds digit: that many flats. Tens: rods. Ones: cubes.", "A 0 digit means none of that block."],
      example: { type: "steps", title: "To make 408", steps: ["4 hundreds: put out 4 flats.", "0 tens: no rods at all.", "8 ones: put out 8 cubes."], note: "4 flats and 8 cubes make 408." },
    },
    {
      title: "Break the number apart",
      lines: ["Split a number into hundreds, tens and ones.", "You can also move one ten into the ones.", "To find a missing part, take the parts you know from the whole."],
      example: { type: "equation", title: "Two ways to split 263", parts: ["263", "=", "250", "+", "13"], note: "263 is also 200 + 60 + 3." },
    },
  ],
  "comparing-and-ordering-numbers-to-1000": [
    {
      title: "Which symbol makes this true?",
      lines: ["Start with the 100s. The bigger digit means the bigger number.", "If the 100s match, look at the 10s, then the 1s.", "> means the first is bigger. < means the first is smaller."],
      example: { type: "table", title: "Compare 472 and 438", headers: ["Number", "100s", "10s", "1s"], rows: [["472", "4", "7", "2"], ["438", "4", "3", "8"]], note: "The 100s match, and 7 tens beat 3 tens, so 472 > 438." },
    },
    {
      title: "Same hundreds, check the tens",
      lines: ["When the 100s are the same, the 10s decide.", "Do not be fooled by a big ones digit.", "If the 10s match too, the 1s decide."],
      example: { type: "equation", title: "381 and 318", parts: ["381", ">", "318"], note: "8 tens is more than 1 ten, so 381 is bigger." },
    },
    {
      title: "Put the numbers in order",
      lines: ["Read whether the smallest or the largest goes first.", "A 2-digit number has no 100s, so it is the smallest.", "Sort by the 100s, then the 10s, then the 1s."],
      example: { type: "jumps", title: "Smallest first", terms: ["93", "239", "293", "329", "392"], note: "Each number is bigger than the one before it." },
    },
    {
      title: "Read the problem carefully",
      lines: ["Find all the numbers in the story.", "Look for the key word: most, largest, smallest or fewer.", "Compare the numbers, then type the one it asks for."],
      example: { type: "steps", title: "Tom has 362 stickers. Ana has 326. Who has fewer?", steps: ["The key word is fewer, so find the smaller number.", "Both have 3 hundreds. 2 tens is less than 6 tens.", "326 < 362, so the answer is 326."] },
    },
  ],
  "representing-and-estimating-numbers": [
    {
      title: "What number is shown?",
      lines: ["Count the hundreds, then the tens, then the ones.", "An empty column still needs a 0 digit.", "Check that your number has 3 digits."],
      example: { type: "steps", title: "6 flats, no rods and 8 cubes", steps: ["6 flats: 6 hundreds.", "No rods: 0 tens.", "8 cubes: 8 ones.", "The number is 608, not 68."] },
    },
    {
      title: "Where is the arrow pointing?",
      lines: ["The line goes from 0 to 1000, marked every 100.", "Find the two labels the arrow sits between.", "Is it near the start, the middle or the end of that gap?"],
      example: { type: "steps", title: "An arrow between 300 and 400", steps: ["The arrow is after 300 and before 400.", "It sits about halfway along the gap.", "Halfway between 300 and 400 is 350."], note: "Pick the option closest to your estimate." },
    },
    {
      title: "Build the number",
      lines: ["Read the target number digit by digit.", "Add flats for hundreds, rods for tens and cubes for ones.", "A 0 digit means you add none of that piece."],
      example: { type: "table", title: "Pieces for 640", headers: ["Target", "Flats (100)", "Rods (10)", "Cubes (1)"], rows: [["640", "6", "4", "0"]], note: "640 needs no cubes at all." },
    },
    {
      title: "Work out the number",
      lines: ["Boxes or bags of 100 are hundreds. Packs of 10 are tens.", "Loose or single things are ones.", "Add the parts together. Do not just write the counts as digits."],
      example: { type: "steps", title: "2 hundreds, 14 tens and 5 ones", steps: ["2 hundreds is 200.", "14 tens is 140.", "5 ones is 5.", "200 + 140 + 5 = 345."], note: "14 tens is more than 9, so it changes the hundreds too." },
    },
  ],
  "reading-and-writing-numbers-to-1000": [
    {
      title: "Write the number in words",
      lines: ["Look at the parts the number is made from.", "Say the hundreds, then the word and, then the rest.", "Tens and ones join with a dash, like forty-six."],
      example: { type: "equation", title: "Using the parts of 508", parts: ["508", "=", "500", "+", "8"], note: "508 is five hundred and eight." },
    },
    {
      title: "Write the number in numerals",
      lines: ["Write the hundreds digit first.", "If there are no tens, write 0 in the tens place.", "Check that your number has 3 digits."],
      example: { type: "table", title: "Two numbers that sound alike", headers: ["Words", "Hundreds", "Tens", "Ones"], rows: [["six hundred and four", "6", "0", "4"], ["six hundred and forty", "6", "4", "0"]], note: "604 and 640 are different. Listen for the tens word." },
    },
    {
      title: "Put the word cards in order",
      lines: ["Read each card and turn it into digits in your head.", "All the hundreds match, so look at the tens next.", "Put the smallest number first."],
      example: { type: "steps", title: "Order three word cards", steps: ["eight hundred and ninety is 890.", "eight hundred and nine is 809.", "eight hundred and nineteen is 819.", "Smallest first: 809, 819, 890."] },
    },
    {
      title: "Read the problem, then answer",
      lines: ["First write the number from the words in digits.", "Then check if the story asks for 10 or 100 more or less.", "Type your answer in numerals, not words."],
      example: { type: "steps", title: "A farm has two hundred and thirty-five sheep. 10 more arrive.", steps: ["two hundred and thirty-five is 235.", "10 more changes the tens: 235 + 10 = 245.", "There are 245 sheep now."] },
    },
  ],
  "number-and-place-value-problems": [
    {
      title: "What number am I?",
      lines: ["Each clue tells you one digit.", "Put each digit in its own place.", "A 0 tens digit still goes in the middle."],
      example: { type: "table", title: "Hundreds 8, tens 0, ones 3", headers: ["Number", "Hundreds", "Tens", "Ones"], rows: [["803", "8", "0", "3"]], note: "The number is 803, not 83." },
    },
    {
      title: "Work out what number I am",
      lines: ["Read every clue before you choose.", "Use each clue to cross out options that do not fit.", "Check your answer matches all the clues."],
      example: { type: "steps", title: "Three clues", steps: ["I am greater than 300 and less than 400: hundreds digit 3.", "My tens digit is 5.", "My ones digit is double my hundreds digit: 6.", "So I am 356."] },
    },
    {
      title: "Make the number with digit cards",
      lines: ["For the largest number, put the biggest digit first.", "For the smallest number, put the smallest digit first.", "A 3-digit number cannot start with 0."],
      example: { type: "steps", title: "Cards 2, 0 and 6", steps: ["Largest: 6, then 2, then 0 makes 620.", "Smallest: 0 cannot go first, so start with 2.", "Then 0, then 6 makes 206."] },
    },
    {
      title: "Solve the problem",
      lines: ["Read the story and find the start number.", "Decide what it needs: more, less, counting in 50s, or the largest.", "Do one step at a time."],
      example: { type: "steps", title: "A shop has 236 cards. 100 more arrive, then 10 are sold.", steps: ["100 more: 236 + 100 = 336.", "10 sold: 336 − 10 = 326.", "The shop has 326 cards now."] },
    },
  ],
};
