/**
 * Bix's lessons for Year 4 Multiplication and Division, one per challenge slot.
 * Each one teaches what that challenge asks (see year4Math/questions.js).
 */
export const MUL_DIV_LESSONS = {
  "multiplication-and-division-facts-to-12": [
    {
      title: "Times tables to 12",
      lines: ["Know your tables up to 12 × 12.", "Use a fact you know to help.", "7 × 10 is 70, so 7 × 9 is 70 − 7."],
      example: { type: "equation", title: "A fact from a fact", parts: ["7", "×", "9", "=", "70", "−", "7"], note: "Both sides make 63." },
    },
    {
      title: "Divide with a times table",
      lines: ["Division is the inverse of multiplication.", "Ask: what times the number makes the total?", "Then check by multiplying back."],
      example: { type: "equation", title: "What is 56 ÷ 7?", parts: ["7", "×", "8", "=", "56"], note: "7 × 8 = 56, so 56 ÷ 7 = 8." },
    },
    {
      title: "Match facts to answers",
      lines: ["Work out each fact on its own.", "A times fact and a divide fact can share numbers.", "Match each fact to its answer."],
      example: { type: "table", title: "One family of facts", headers: ["Fact", "Answer"], rows: [["6 × 9", "54"], ["54 ÷ 9", "6"]], note: "Same 3 numbers, 2 different answers." },
    },
    {
      title: "Solve a tray problem",
      lines: ["Each tray holds the same number of cups.", "Equal groups means multiply.", "Number of trays × cups on each tray."],
      example: { type: "groups", title: "3 trays of 4 cups", groups: [["☕", "☕", "☕", "☕"], ["☕", "☕", "☕", "☕"], ["☕", "☕", "☕", "☕"]], label: "3 groups of 4", note: "3 × 4 = 12 cups altogether." },
    },
  ],
  "mental-multiplication-and-division": [
    {
      title: "Special facts with 0 and 1",
      lines: ["× 1 and ÷ 1 keep the number the same.", "× 0 always makes 0.", "Use your tables for the rest."],
      example: { type: "table", title: "Quick rules", headers: ["Fact", "Answer"], rows: [["60 × 1", "60"], ["60 ÷ 1", "60"], ["60 × 0", "0"]], note: "No working out needed!" },
    },
    {
      title: "Use tables with hundreds",
      lines: ["Hundreds work like ones.", "Use the table fact, then add the 2 zeros back.", "Remember the rules for 0 and 1."],
      example: { type: "equation", title: "Hundreds from a table fact", parts: ["2400", "÷", "6", "=", "400"], note: "24 ÷ 6 = 4, so 2400 ÷ 6 = 400." },
    },
    {
      title: "Group the easy pair",
      lines: ["You can multiply 3 numbers in any order.", "Brackets show which pair to do first.", "Pick the pair that is easiest."],
      example: { type: "equation", title: "Grouping factors", parts: ["4", "×", "3", "×", "5", "=", "4", "×", "15"], note: "Brackets go round 3 × 5: 4 × (3 × 5)." },
    },
    {
      title: "Boxes of packs",
      lines: ["Boxes hold packs, and packs hold stickers.", "Multiply all 3 numbers together.", "Group an easy pair first."],
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
      lines: ["Multiply each pair.", "If it makes the number, it is a factor pair.", "If not, it is not a factor pair."],
      example: { type: "table", title: "Pairs that make 24?", headers: ["Pair", "Makes", "Factor pair?"], rows: [["3 × 8", "24", "Yes"], ["8 × 3", "24", "Yes"], ["3 × 9", "27", "No"]] },
    },
    {
      title: "Chairs in rows",
      lines: ["Rows of chairs are equal groups.", "Divide the chairs by the number in each row.", "Check: rows × chairs in a row = total."],
      example: { type: "groups", title: "12 chairs in rows of 4", groups: [["🪑", "🪑", "🪑", "🪑"], ["🪑", "🪑", "🪑", "🪑"], ["🪑", "🪑", "🪑", "🪑"]], label: "3 rows of 4", note: "12 ÷ 4 = 3 rows." },
    },
  ],
  "written-multiplication": [
    {
      title: "Use the written layout",
      lines: ["Multiply the ones first.", "Exchange 10 ones for 1 ten if needed.", "Then multiply the tens and add the carried ten."],
      example: { type: "steps", title: "34 × 3", steps: ["4 × 3 = 12: write 2, carry 1.", "30 × 3 = 90, add the carried 10.", "34 × 3 = 102."] },
    },
    {
      title: "Practise the written layout",
      lines: ["Keep the digits lined up in columns.", "Write the carried digit small under the line.", "Estimate first: 63 × 9 is about 60 × 9."],
      example: { type: "equation", title: "Check with an estimate", parts: ["57", "×", "6", "=", "342"], note: "60 × 6 = 360, so 342 is sensible." },
    },
    {
      title: "Split the number to multiply",
      lines: ["Split the number into 2 parts.", "Multiply each part by the small number.", "Add the 2 answers together."],
      example: { type: "equation", title: "214 × 3, split into 210 and 4", parts: ["630", "+", "12", "=", "642"], note: "210 × 3 = 630 and 4 × 3 = 12." },
    },
    {
      title: "Multiply 3-digit numbers",
      lines: ["Teams each collecting the same amount means multiply.", "Multiply ones, then tens, then hundreds.", "Carry when a column makes 10 or more."],
      example: { type: "equation", title: "4 teams collect 123 tokens each", parts: ["123", "×", "4", "=", "492"], note: "3 × 4 = 12: write 2 and carry 1." },
    },
  ],
  "scaling-and-correspondence-problems": [
    {
      title: "Times as long and choices",
      lines: ["\"3 times as long\" means multiply the length by 3.", "For choices, every first choice goes with every second.", "Both need multiplying."],
      example: { type: "bar", title: "A ribbon 3 times as long", bars: [{ parts: 1, shaded: 1, label: "4 cm" }, { parts: 3, shaded: 3, label: "4 cm × 3" }], note: "4 × 3 = 12 cm." },
    },
    {
      title: "Scale up a ribbon",
      lines: ["Find the first length.", "Multiply it by how many times as long.", "Write your answer in cm."],
      example: { type: "equation", title: "6 cm, 4 times as long", parts: ["6", "×", "4", "=", "24"], note: "The second ribbon is 24 cm." },
    },
    {
      title: "Count the meal choices",
      lines: ["Choose 1 starter and 1 main dish.", "Each starter goes with every main dish.", "Starters × mains gives all the choices."],
      example: { type: "table", title: "2 starters and 3 mains", headers: ["Starter", "Main 1", "Main 2", "Main 3"], rows: [["Soup", "✓", "✓", "✓"], ["Salad", "✓", "✓", "✓"]], note: "2 × 3 = 6 meal choices." },
    },
    {
      title: "Packs with extras",
      lines: ["Multiply the packs by the beads in each pack.", "Then add any extra beads.", "Read the story twice to find every number."],
      example: { type: "equation", title: "3 packs of 24 beads, 5 extra", parts: ["3", "×", "24", "+", "5", "=", "77"], note: "72 beads in packs, plus 5 extra." },
    },
  ],
};
