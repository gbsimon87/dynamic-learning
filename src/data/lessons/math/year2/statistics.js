/**
 * Bix's lessons for Year 2 Statistics, one per challenge slot. Each one
 * teaches exactly what that challenge asks (see the challenge files in
 * src/pages/skills/math/challenges/year2/<topic>/ and
 * src/data/challenges/statistics.js). Worked examples use numbers and data
 * that are not in the challenge lists, so no lesson gives away an answer.
 */
export const STATISTICS_LESSONS = {
  pictograms: [
    {
      title: "Use the key",
      lines: ["Look at the key first.", "Here, each picture stands for 2.", "Count the pictures in 2s, not in 1s."],
      example: { type: "jumps", title: "3 pictures, counting in 2s", terms: ["0", "2", "4", "6"], step: "+2", note: "3 pictures stand for 6 things." },
    },
    {
      title: "Keys of 5 and 10",
      lines: ["Check the key. It might be 5 or 10.", "Most or fewest? Look for the longest or shortest row.", "How many more? Use the key for both rows."],
      example: { type: "jumps", title: "When 1 picture stands for 5", terms: ["0", "5", "10", "15", "20", "25"], step: "+5", note: "5 pictures stand for 25." },
    },
    {
      title: "Build a pictogram",
      lines: ["Read each number in the table.", "Check the key: 1 picture stands for 2, 5 or 10.", "Count up in that step. Tap + for each jump."],
      example: { type: "steps", title: "To show 35 when 1 picture is 5", steps: ["Count in 5s: 5, 10, 15, 20, 25, 30, 35.", "That is 7 jumps.", "Tap + 7 times on that row."] },
    },
    {
      title: "Solve pictogram problems",
      lines: ["Find each row the question asks about.", "Use the key to work out each number.", "Altogether means add. How many more means take away."],
      example: { type: "equation", title: "15 stars and 20 stars together", parts: ["15", "+", "20", "=", "35"], note: "Work out both numbers first, then add." },
    },
  ],
  "tally-charts": [
    {
      title: "Count in gates of 5",
      lines: ["Each line is 1.", "4 lines with 1 across make a gate. A gate is 5.", "Count the gates in 5s, then count on in 1s."],
      example: { type: "jumps", title: "1 gate and 4 more lines", terms: ["5", "6", "7", "8", "9"], step: "+1", note: "Say 5 for the gate, then count each line." },
    },
    {
      title: "Read the whole chart",
      lines: ["Most means the biggest number.", "Fewest means the smallest number.", "Altogether means add up every row."],
      example: { type: "equation", title: "3 rows altogether", parts: ["5", "+", "3", "+", "2", "=", "10"], note: "Count each row, then add them all." },
    },
    {
      title: "Make a tally chart",
      lines: ["Tap a picture to tick it off.", "Tap + to add 1 mark to that row.", "Every 5th mark goes across to make a gate."],
      example: { type: "steps", title: "Tallying a pile", steps: ["Pick one kind of picture.", "Tap each one and add a mark.", "Do the next kind until every picture is ticked."] },
    },
    {
      title: "Solve tally problems",
      lines: ["Count the tally for each row you need.", "Altogether means add. How many more means take away.", "To have as many as, count on to the bigger number."],
      example: { type: "equation", title: "4 needs how many to make 9?", parts: ["4", "+", "5", "=", "9"], note: "4 needs 5 more to have as many as 9." },
    },
  ],
  "block-diagrams": [
    {
      title: "Count the blocks",
      lines: ["Each block stands for 1.", "Find the column the question asks about.", "Count the blocks from the bottom up."],
      example: { type: "jumps", title: "Counting up a column", terms: ["1", "2", "3"], step: "+1", note: "3 blocks stand for 3." },
    },
    {
      title: "Scales that go up in 2s",
      lines: ["Only every second line has a number.", "The top of a column can stop between 2 numbers.", "Then it is the number halfway between them."],
      example: { type: "jumps", title: "A scale in 2s", terms: ["10", "12", "14", "16"], step: "+2", note: "A column stopping between 14 and 16 shows 15." },
    },
    {
      title: "Build a block diagram",
      lines: ["Read each number in the table.", "Tap the block at that height in its column.", "Check every column against the table."],
      example: { type: "steps", title: "To show 6", steps: ["The table says 6.", "Find 6 on the scale.", "Tap the block at 6 in that column."] },
    },
    {
      title: "Solve block diagram problems",
      lines: ["The scale goes up in 2s. Read it carefully.", "Find each column the question needs.", "Altogether means add. How many more means take away."],
      example: { type: "equation", title: "7 cakes and 5 cakes together", parts: ["7", "+", "5", "=", "12"], note: "Fewest two? Find the 2 shortest columns first." },
    },
  ],
  tables: [
    {
      title: "Read along the row",
      lines: ["Find the name in the first column.", "Put your finger on it.", "Slide across to read the number."],
      example: { type: "table", title: "Toys in the box", headers: ["Toy", "How many"], rows: [["Teddies", "5"], ["Cars", "8"], ["Balls", "3"]], note: "Find Balls, then slide across to 3." },
    },
    {
      title: "Where row and column meet",
      lines: ["Find the row the question names.", "Find the column the question names.", "Follow both until they meet. That is the number."],
      example: { type: "table", title: "Shells found", headers: ["Child", "Monday", "Tuesday"], rows: [["Sam", "3", "5"], ["Mia", "4", "2"]], note: "Mia on Tuesday: row Mia, column Tuesday, so 2." },
    },
    {
      title: "Fill the gap",
      lines: ["Find the gap in the table.", "Find the same row on the tally chart.", "Count the tally in 5s and 1s, then type it."],
      example: { type: "steps", title: "The gap says Crisps", steps: ["Find Crisps on the tally chart.", "It has 1 gate and 2 lines.", "Count 5, 6, 7. Type 7 in the gap."] },
    },
    {
      title: "Add across or down",
      lines: ["A whole row: add the numbers across.", "A whole column: add the numbers down.", "How many more: take the smaller from the bigger."],
      example: { type: "table", title: "Shells found", headers: ["Child", "Monday", "Tuesday"], rows: [["Sam", "3", "5"], ["Mia", "4", "2"]], note: "Sam altogether: 3 + 5 = 8 shells." },
    },
  ],
  "gathering-information-and-using-data": [
    {
      title: "Count a mixed-up pile",
      lines: ["The pile is all mixed up.", "Only count the kind the question asks for.", "Tap each one you count so you do not lose your place."],
      example: { type: "groups", title: "How many strawberries?", groups: [["🍓", "🥕", "🍓", "🥕", "🥕", "🍓", "🍓"]], label: "strawberries and carrots all mixed up", note: "Count only strawberries: 1, 2, 3, 4." },
    },
    {
      title: "Put them in order",
      lines: ["Count every kind in the pile first.", "Remember each number.", "Read the question: most first, or fewest first?"],
      example: { type: "groups", title: "Frogs, ducks and bees", groups: [["🐸", "🐸", "🐸", "🐸", "🐸"], ["🦆", "🦆"], ["🐝", "🐝", "🐝"]], label: "5 frogs, 2 ducks and 3 bees", note: "Most first: frogs, then bees, then ducks." },
    },
    {
      title: "Turn a pile into blocks",
      lines: ["Count one kind at a time.", "Tap the block at that number in its column.", "Do every column, then check them all."],
      example: { type: "steps", title: "From pile to block diagram", steps: ["Count the frogs: 5.", "Tap the block at 5 in the frog column.", "Now count the next kind."] },
    },
    {
      title: "Add and compare",
      lines: ["Altogether or together means add.", "How many more means take away.", "Most means the kind with the biggest count."],
      example: { type: "equation", title: "7 frogs and 3 ducks", parts: ["7", "−", "3", "=", "4"], note: "There are 4 more frogs than ducks." },
    },
  ],
};
