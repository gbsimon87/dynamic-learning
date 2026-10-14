/**
 * Bix's lessons for Year 2 Multiplication and Division, one per challenge slot.
 * Each one teaches exactly what that challenge asks (see the challenge files in
 * src/pages/skills/math/challenges/year2/<topic>/ and multiplicationAndDivision.js).
 * Worked examples use numbers the challenges do not ask, so no answer is given away.
 */
const dots = (n) => Array.from({ length: n }, () => "🔵");
const many = (emoji, n) => Array.from({ length: n }, () => emoji);

export const MUL_DIV_LESSONS = {
  "what-is-multiplication": [
    {
      title: "Count the dots in rows",
      lines: ["An array is dots in equal rows.", "Count how many dots are in 1 row.", "Count on by that many for each row."],
      example: { type: "groups", title: "3 rows of 2", groups: [dots(2), dots(2), dots(2)], label: "3 rows of 2 dots", note: "Count 2, 4, 6. There are 6 dots." },
    },
    {
      title: "Adding the same number",
      lines: ["Look at the number being added.", "Count how many times you see it.", "That many times the number is the multiplication."],
      example: { type: "equation", title: "2 added 3 times", parts: ["2 + 2 + 2", "=", "3 × 2"], note: "3 lots of 2 is the same as 3 × 2." },
    },
    {
      title: "Write what the array shows",
      lines: ["Count the rows. Count the dots in a row.", "Put those 2 numbers either side of ×.", "The total goes after the = sign."],
      example: { type: "groups", title: "2 rows of 5", groups: [dots(5), dots(5)], label: "2 rows of 5 dots", note: "2 × 5 = 10, and 5 × 2 = 10 too." },
    },
    {
      title: "Spot the equal groups",
      lines: ["The word each tells you the groups are equal.", "Find how many groups there are.", "Find how many are in each group, then multiply."],
      example: { type: "steps", title: "3 bikes, 2 wheels each", steps: ["There are 3 bikes.", "Each bike has 2 wheels.", "3 × 2 = 6 wheels."] },
    },
  ],
  "what-is-division": [
    {
      title: "Share into equal groups",
      lines: ["Sharing means giving out fairly.", "Every group gets the same number.", "Count how many are in 1 group."],
      example: { type: "groups", title: "10 strawberries shared by 2", groups: [many("🍓", 5), many("🍓", 5)], label: "2 equal groups of 5 strawberries", note: "Each group has 5." },
    },
    {
      title: "How many groups?",
      lines: ["Sometimes you know the size of each group.", "Count up in that number until you reach the total.", "Count your jumps. That is how many groups."],
      example: { type: "jumps", title: "Groups of 5 in 15", terms: ["0", "5", "10", "15"], step: "+5", note: "3 jumps, so 15 ÷ 5 = 3." },
    },
    {
      title: "Biggest number goes first",
      lines: ["In a division, the total comes first.", "Then ÷ and the number you share by.", "Swapping the first 2 numbers makes it wrong."],
      example: { type: "equation", title: "Using 10, 2 and 5", parts: ["10", "÷", "2", "=", "5"], note: "2 ÷ 10 = 5 is not true." },
    },
    {
      title: "Sharing or grouping?",
      lines: ["Shared between means: how many does each get?", "Groups of or bags of means: how many groups?", "Both are division."],
      example: { type: "steps", title: "15 grapes", steps: ["Shared between 5 children: 3 each.", "Put into bags of 5: 3 bags.", "Both are 15 ÷ 5 = 3."] },
    },
  ],
  "2-5-and-10-multiplication-tables": [
    {
      title: "Count in 2s, 5s and 10s",
      lines: ["A times table is counting in equal jumps.", "The first number says how many jumps.", "Use your fingers to count the jumps."],
      example: { type: "jumps", title: "Counting in 10s", terms: ["0", "10", "20", "30"], step: "+10", note: "3 jumps of 10 lands on 30." },
    },
    {
      title: "Odd or even?",
      lines: ["Look at the last digit only.", "Even numbers end in 0, 2, 4, 6 or 8.", "Odd numbers end in 1, 3, 5, 7 or 9."],
      example: { type: "table", title: "Check the last digit", headers: ["Number", "Last digit", "Odd or even"], rows: [["52", "2", "even"], ["39", "9", "odd"]], note: "Even numbers share into 2 equal groups." },
    },
    {
      title: "Work out, then order",
      lines: ["Work out the answer to each card first.", "Find the smallest answer and put it first.", "Then the next smallest, and so on."],
      example: { type: "table", title: "Smallest answer first", headers: ["Card", "Answer"], rows: [["2 × 5", "10"], ["3 × 10", "30"], ["5 × 10", "50"]], note: "Order the answers, not the first numbers." },
    },
    {
      title: "Use tables to divide",
      lines: ["Division undoes multiplication.", "For 30 ÷ 10, ask: what × 10 makes 30?", "Count in 10s to find out."],
      example: { type: "steps", title: "30 ÷ 10", steps: ["Count in 10s: 10, 20, 30.", "That is 3 jumps.", "3 × 10 = 30, so 30 ÷ 10 = 3."] },
    },
  ],
  "division-problems": [
    {
      title: "Turn the story into ÷",
      lines: ["Find the number being shared. It goes first.", "Find how many it is shared between.", "Write them with ÷ in the middle."],
      example: { type: "steps", title: "15 sweets shared between 5 bags", steps: ["15 is being shared.", "It is shared between 5 bags.", "So the division is 15 ÷ 5."] },
    },
    {
      title: "Share it out",
      lines: ["Find the total and the number of groups.", "Share the total out fairly.", "Count how many land in 1 group."],
      example: { type: "groups", title: "10 biscuits shared between 2 plates", groups: [many("🍪", 5), many("🍪", 5)], label: "2 plates with 5 biscuits each", note: "10 ÷ 2 = 5 on each plate." },
    },
    {
      title: "Bigger total, smaller answer?",
      lines: ["A big number to share is not always a big answer.", "Work out every card first.", "Then put the smallest answer first."],
      example: { type: "table", title: "Check each answer", headers: ["Card", "Answer"], rows: [["30 ÷ 10", "3"], ["10 ÷ 2", "5"]], note: "30 is bigger, but its answer is smaller." },
    },
    {
      title: "Find the total first",
      lines: ["Some stories do not tell you the total.", "Work out the total first.", "Then divide it."],
      example: { type: "steps", title: "3 bags of 10 sweets, shared by 5", steps: ["3 bags of 10 is 3 × 10 = 30.", "Share 30 between 5 children.", "30 ÷ 5 = 6 sweets each."] },
    },
  ],
  "connecting-multiplication-and-division": [
    {
      title: "Every × has a ÷",
      lines: ["Start with the answer of the multiplication.", "Divide it by one of the other numbers.", "You get the last number back."],
      example: { type: "steps", title: "From 2 × 5 = 10", steps: ["The total is 10.", "10 ÷ 5 = 2.", "10 ÷ 2 = 5 is true too."] },
    },
    {
      title: "Swap for ×, not for ÷",
      lines: ["You can swap the numbers in a multiplication.", "The answer stays the same.", "You cannot swap the numbers in a division."],
      example: { type: "equation", title: "Swapping a multiplication", parts: ["2 × 10", "=", "10 × 2"], note: "But 10 ÷ 2 is not the same as 2 ÷ 10." },
    },
    {
      title: "Find the true facts",
      lines: ["Check each one with your tables.", "In a ÷, the biggest number comes first.", "In a ×, the answer is the biggest number."],
      example: { type: "table", title: "Using 2, 5 and 10", headers: ["Fact", "True?"], rows: [["2 × 5 = 10", "yes"], ["10 ÷ 5 = 2", "yes"], ["5 ÷ 10 = 2", "no"], ["10 × 5 = 2", "no"]], note: "Drag the true ones to the front." },
    },
    {
      title: "Find the missing number",
      lines: ["Use the fact you know to find the gap.", "If × is missing a number, try dividing.", "If ÷ is missing the total, try multiplying."],
      example: { type: "steps", title: "? × 5 = 15", steps: ["What lots of 5 make 15?", "Count in 5s: 5, 10, 15.", "3 jumps, so the missing number is 3."] },
    },
  ],
  "doubling-and-halving-using-multiplication-and-division": [
    {
      title: "Double means × 2",
      lines: ["To double a number, multiply it by 2.", "Double the tens, then double the ones.", "Add the 2 parts together."],
      example: { type: "steps", title: "23 × 2", steps: ["Double 20 is 40.", "Double 3 is 6.", "40 + 6 = 46."] },
    },
    {
      title: "Half means ÷ 2",
      lines: ["To halve a number, divide it by 2.", "Halve the tens, then halve the ones.", "Your answer is half of the number."],
      example: { type: "steps", title: "46 ÷ 2", steps: ["Half of 40 is 20.", "Half of 6 is 3.", "20 + 3 = 23, so half of 46 is 23."] },
    },
    {
      title: "Halve and halve again",
      lines: ["Start with the biggest number.", "Halve it to find the next number.", "Keep halving until all the cards are used."],
      example: { type: "steps", title: "Start at 100", steps: ["Start at 100.", "Half of 100 is 50.", "Half of 50 is 25."] },
    },
    {
      title: "Double it or halve it?",
      lines: ["Double or twice means × 2.", "Half, cut in half or 2 equal teams means ÷ 2.", "Read the story, then choose."],
      example: { type: "table", title: "Story words", headers: ["Words", "Do this"], rows: [["double", "× 2"], ["half of", "÷ 2"], ["2 equal teams", "÷ 2"]], note: "Mia has 20. Ben has double: 20 × 2 = 40." },
    },
  ],
  "solving-multiplication-and-division-problems": [
    {
      title: "Multiply or divide?",
      lines: ["Equal groups joined together? Use ×.", "Shared out or put into groups? Use ÷.", "The story tells you which one."],
      example: { type: "table", title: "Look for the clue", headers: ["Story says", "Use"], rows: [["5 bags with 2 each", "×"], ["shared between", "÷"], ["put into pairs", "÷"]], note: "How many altogether usually means ×." },
    },
    {
      title: "Choose it, then do it",
      lines: ["First decide: × or ÷?", "Then use your 2, 5 or 10 facts.", "Check your answer makes sense."],
      example: { type: "steps", title: "3 vases hold 5 flowers each", steps: ["Equal groups joined, so use ×.", "3 × 5 = 15.", "There are 15 flowers."] },
    },
    {
      title: "Check the sign first",
      lines: ["Some cards use ×, some use ÷.", "Read the sign before you work it out.", "Then order the answers, smallest first."],
      example: { type: "table", title: "Read the sign", headers: ["Card", "Answer"], rows: [["3 × 2", "6"], ["20 ÷ 2", "10"]], note: "20 is big, but ÷ makes it smaller." },
    },
    {
      title: "Two steps to the answer",
      lines: ["Do the first step and write it down.", "Use that answer for the second step.", "The first answer is not the end."],
      example: { type: "steps", title: "2 bags of 10 apples, 5 eaten", steps: ["Step 1: 2 × 10 = 20 apples.", "Step 2: 20 − 5 = 15.", "There are 15 apples left."] },
    },
  ],
};
