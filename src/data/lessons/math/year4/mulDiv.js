/**
 * Bix's lessons for Year 4 Multiplication and Division, one per challenge slot.
 * Each one teaches what that challenge asks (see year4Math/questions.js).
 */
export const MUL_DIV_LESSONS = {
  "multiplication-and-division-facts-to-12": [
    {
      title: "Pick the times table answer",
      lines: ["Know your tables up to 12 × 12.", "Stuck? Use the fact just before.", "Then add one more group."],
      example: { type: "steps", title: "What is 7 × 8?", steps: ["7 × 7 = 49.", "Add one more 7: 49 + 7 = 56.", "So 7 × 8 = 56."] },
    },
    {
      title: "Divide with a times table",
      lines: ["Division is the inverse of multiplication.", "Ask: what times the number makes the total?", "Then check by multiplying back."],
      example: { type: "equation", title: "What is 56 ÷ 7?", parts: ["7", "×", "8", "=", "56"], note: "7 × 8 = 56, so 56 ÷ 7 = 8." },
    },
    {
      title: "Sort a family of facts",
      lines: ["3 numbers make a family of 4 facts.", "2 times facts and 2 divide facts.", "Work out each fact, then sort it by its answer."],
      example: { type: "table", title: "The family of 6, 9 and 54", headers: ["Fact", "Answer"], rows: [["6 × 9", "54"], ["9 × 6", "54"], ["54 ÷ 9", "6"], ["54 ÷ 6", "9"]], note: "Both times facts make 54." },
    },
    {
      title: "Solve an equal groups story",
      lines: ["Each group holds the same number.", "Equal groups means multiply.", "Number of groups × number in each group."],
      example: { type: "groups", title: "3 trays of 4 cups", groups: [["☕", "☕", "☕", "☕"], ["☕", "☕", "☕", "☕"], ["☕", "☕", "☕", "☕"]], label: "3 groups of 4", note: "3 × 4 = 12 cups altogether." },
    },
  ],
  "mental-multiplication-and-division": [
    {
      title: "Use tens, 0 and 1",
      lines: ["Use a table fact, then make it 10 times bigger.", "× 1 and ÷ 1 keep the number the same. × 0 makes 0.", "With 3 numbers, do 2 × 5 or 4 × 5 first."],
      example: { type: "table", title: "Start from 6 × 4 = 24", headers: ["Fact", "Answer"], rows: [["6 × 40", "240"], ["240 ÷ 6", "40"], ["6 × 4 × 1", "24"], ["6 × 4 × 0", "0"]], note: "× 1 keeps 24. × 0 makes 0." },
    },
    {
      title: "Use hundreds and three numbers",
      lines: ["Use the table fact, then make it 100 times bigger.", "With 3 numbers, multiply any 2 first.", "A × 0 anywhere makes the whole answer 0."],
      example: { type: "steps", title: "Hundreds and three numbers", steps: ["24 ÷ 6 = 4, so 2400 ÷ 6 = 400.", "3 × 4 × 6: do 3 × 4 = 12 first.", "12 × 6 = 72."] },
    },
    {
      title: "Group the easy pair",
      lines: ["You can multiply 3 numbers in any order.", "Brackets show which pair to do first.", "Put the brackets round the pair that makes 10, 20 or 30."],
      example: { type: "equation", title: "7 × 2 × 5", parts: ["7", "×", "(", "2", "×", "5", ")", "=", "70"], note: "2 × 5 = 10, and 7 × 10 = 70." },
    },
    {
      title: "Boxes of packs",
      lines: ["Boxes hold packs, and packs hold stickers.", "Multiply all 3 numbers together.", "Pick an easy pair to do first."],
      example: { type: "steps", title: "2 boxes, 5 packs, 3 stickers", steps: ["Each box: 5 × 3 = 15 stickers.", "2 boxes: 2 × 15 = 30 stickers."] },
    },
  ],
  "factor-pairs-and-commutativity": [
    {
      title: "Swap the factors",
      lines: ["Factors are numbers you multiply.", "Swapping them keeps the answer the same.", "This works for every multiplication."],
      example: { type: "equation", title: "Same answer both ways", parts: ["4", "×", "7", "=", "7", "×", "4"], note: "Both make 28." },
    },
    {
      title: "Complete the factor pair",
      lines: ["A factor pair multiplies to make the number.", "Ask: this number times what makes the total?", "Use division to find the missing factor."],
      example: { type: "equation", title: "6 × ? = 48", parts: ["48", "÷", "6", "=", "8"], note: "6 and 8 are a factor pair of 48." },
    },
    {
      title: "Sort the factor pairs",
      lines: ["Multiply each pair.", "If it makes the number exactly, it is a factor pair.", "Close is not enough!"],
      example: { type: "table", title: "Pairs that make 24?", headers: ["Pair", "Makes", "Factor pair?"], rows: [["3 × 8", "24", "Yes"], ["8 × 3", "24", "Yes"], ["5 × 5", "25", "No"], ["3 × 9", "27", "No"]] },
    },
    {
      title: "Chairs in rows",
      lines: ["Rows of chairs are equal groups.", "Divide the chairs by the number in each row.", "Check: rows × chairs in a row = total."],
      example: { type: "groups", title: "12 chairs in rows of 4", groups: [["🪑", "🪑", "🪑", "🪑"], ["🪑", "🪑", "🪑", "🪑"], ["🪑", "🪑", "🪑", "🪑"]], label: "3 rows of 4", note: "12 ÷ 4 = 3 rows." },
    },
  ],
  "written-multiplication": [
    {
      title: "Multiply without exchanging",
      lines: ["Multiply the ones first.", "Then multiply the tens.", "Write each answer in its own column."],
      example: { type: "steps", title: "32 × 3", steps: ["Ones: 2 × 3 = 6.", "Tens: 3 tens × 3 = 9 tens.", "32 × 3 = 96."] },
    },
    {
      title: "Multiply with an exchange",
      lines: ["Multiply the ones first.", "If they make 10 or more, exchange 10 ones for 1 ten.", "Multiply the tens, then add the exchanged ten."],
      example: { type: "steps", title: "34 × 3", steps: ["Ones: 4 × 3 = 12. Write 2, exchange 1 ten.", "Tens: 3 tens × 3 = 9 tens, plus 1 ten = 10 tens.", "34 × 3 = 102."] },
    },
    {
      title: "Split into hundreds, tens and ones",
      lines: ["Split the number into hundreds, tens and ones.", "Multiply each part by the small number.", "Add the 3 answers together."],
      example: { type: "equation", title: "214 × 3 = (200 × 3) + (10 × 3) + (4 × 3)", parts: ["600", "+", "30", "+", "12", "=", "642"], note: "214 is 200 + 10 + 4." },
    },
    {
      title: "Solve a multiplying story",
      lines: ["Groups each collecting the same amount means multiply.", "Multiply ones, then tens, then hundreds.", "Exchange when a column makes 10 or more."],
      example: { type: "equation", title: "4 teams each collect 123 tokens", parts: ["123", "×", "4", "=", "492"], note: "3 × 4 = 12: write 2 and exchange 1 ten." },
    },
  ],
  "scaling-and-correspondence-problems": [
    {
      title: "Count the different choices",
      lines: ["Choose one from each group.", "Every first choice goes with every second choice.", "So multiply the two numbers."],
      example: { type: "table", title: "2 shirts and 3 pairs of shorts", headers: ["Shirt", "Shorts 1", "Shorts 2", "Shorts 3"], rows: [["Red", "✓", "✓", "✓"], ["Blue", "✓", "✓", "✓"]], note: "2 × 3 = 6 different outfits." },
    },
    {
      title: "Solve a times-as problem",
      lines: ["\"3 times as long\" means 3 lots of the first length.", "Multiply the first amount by the times number.", "Times as tall, heavy or many works the same way."],
      example: { type: "bar", title: "A ribbon 3 times as long", bars: [{ parts: 1, shaded: 1, label: "4 cm" }, { parts: 3, shaded: 3, label: "4 cm × 3" }], note: "4 × 3 = 12 cm." },
    },
    {
      title: "Build the story calculation",
      lines: ["Read the story first.", "Is it a choosing story or a times-as story?", "Both need a × calculation: build it with the answer."],
      example: { type: "equation", title: "3 starters and 4 main dishes", parts: ["3", "×", "4", "=", "12"], note: "12 different meals." },
    },
    {
      title: "Solve a two-step problem",
      lines: ["Find the 2 steps in the story.", "Do the multiplying step first.", "Then add, or multiply by the new total."],
      example: { type: "steps", title: "Tom's tower is 6 cubes. Mia's is 3 times as tall.", steps: ["Mia's tower: 6 × 3 = 18 cubes.", "Both towers: 6 + 18 = 24 cubes."] },
    },
  ],
};
