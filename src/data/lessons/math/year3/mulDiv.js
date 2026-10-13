/**
 * Bix's lessons for Year 3 Multiplication and Division, one per challenge slot.
 * Each one teaches exactly what that challenge asks (see Year3MulDivGame /
 * src/data/challenges/year3MulDiv.js).
 */
export const MUL_DIV_LESSONS = {
  "3-and-4-times-tables": [
    {
      title: "Count rows in an array",
      lines: ["An array is dots set out in equal rows.", "Count the rows, then count the dots in one row.", "Multiply them: rows × dots in a row."],
      example: { type: "groups", title: "3 rows of 4", groups: [["🔵", "🔵", "🔵", "🔵"], ["🔵", "🔵", "🔵", "🔵"], ["🔵", "🔵", "🔵", "🔵"]], label: "3 rows with 4 dots in each row", note: "3 rows of 4 is 12, so 3 × 4 = 12." },
    },
    {
      title: "Recall the 3s and 4s",
      lines: ["The 3 times table counts up in 3s.", "The 4 times table counts up in 4s.", "Stuck? Count on from a fact you already know."],
      example: { type: "jumps", title: "Counting in 4s", terms: ["0", "4", "8", "12", "16", "20", "24"], step: "+4", note: "6 jumps of 4 lands on 24, so 6 × 4 = 24." },
    },
    {
      title: "Use a fact family",
      lines: ["A fact triangle holds 3 numbers that belong together.", "Multiply the 2 bottom numbers to find the top number.", "Divide the top number by one bottom number to find the other."],
      example: { type: "steps", title: "The family of 3, 6 and 18", steps: ["3 × 6 = 18", "6 × 3 = 18", "18 ÷ 3 = 6", "18 ÷ 6 = 3"], note: "One triangle gives 2 times facts and 2 divide facts." },
    },
    {
      title: "Solve a times table story",
      lines: ["Find the numbers in the story.", "Equal groups put together? Multiply to find the total.", "Sharing a total, or making rows from it? Divide."],
      example: { type: "steps", title: "28 pens are put in rows of 4", steps: ["Rows of 4 from 28 means divide.", "28 ÷ 4 = 7", "There are 7 rows."], note: "Check it: 7 × 4 = 28." },
    },
  ],
  "the-8-times-table": [
    {
      title: "Double the 4s to make 8s",
      lines: ["Double the 2 times table to get the 4 times table.", "Double the 4 times table to get the 8 times table.", "So 8 × a number is that number doubled 3 times."],
      example: { type: "table", title: "Keep doubling with 6", headers: ["Fact", "Answer"], rows: [["2 × 6", "12"], ["4 × 6", "24"], ["8 × 6", "48"]], note: "Double 12 is 24. Double 24 is 48." },
    },
    {
      title: "Recall the 8 times table",
      lines: ["The 8 times table counts up in 8s.", "Every answer is an even number.", "Forget one? Double the 4 times fact."],
      example: { type: "jumps", title: "Counting in 8s", terms: ["0", "8", "16", "24", "32", "40"], step: "+8", note: "5 jumps of 8 lands on 40, so 5 × 8 = 40." },
    },
    {
      title: "Share between 8 groups",
      lines: ["Sharing equally means every group gets the same.", "Deal 1 counter to every group, again and again.", "Stop when none are left, then count 1 group."],
      example: { type: "groups", title: "Share 24 counters into 8 groups", groups: [["●", "●", "●"], ["●", "●", "●"], ["●", "●", "●"], ["●", "●", "●"], ["●", "●", "●"], ["●", "●", "●"], ["●", "●", "●"], ["●", "●", "●"]], label: "24 counters in 8 equal groups of 3", note: "Each group has 3, so 24 ÷ 8 = 3." },
    },
    {
      title: "Solve an 8 times table story",
      lines: ["Look for the 8 in the story.", "Groups of 8 put together? Multiply by 8.", "A total put into 8s or shared by 8? Divide by 8."],
      example: { type: "equation", title: "A spider has 8 legs. How many legs on 3 spiders?", parts: ["3", "×", "8", "=", "24"], note: "3 spiders have 24 legs." },
    },
  ],
  "multiplying-and-dividing-two-digit-numbers": [
    {
      title: "Read a partitioned multiplication",
      lines: ["Split the 2-digit number into tens and ones.", "Multiply each part by the 1-digit number.", "Add the 2 answers to get the total."],
      example: { type: "steps", title: "23 × 4", steps: ["Split 23 into 20 and 3.", "20 × 4 = 80", "3 × 4 = 12", "80 + 12 = 92"], note: "So 23 × 4 = 92." },
    },
    {
      title: "Build a friendly partition",
      lines: ["To multiply, split into tens and ones, then multiply each part.", "To divide, take 10 groups first, like 10 × 4 = 40.", "Divide what is left, then add the 2 answers."],
      example: { type: "steps", title: "52 ÷ 4", steps: ["Split 52 into 40 and 12.", "40 ÷ 4 = 10", "12 ÷ 4 = 3", "10 + 3 = 13"], note: "So 52 ÷ 4 = 13." },
    },
    {
      title: "Use short multiplication",
      lines: ["Write the 2-digit number on top, the 1-digit number below.", "Start with the ones. Write the ones digit and carry the tens.", "Multiply the tens, then add the number you carried."],
      example: { type: "steps", title: "27 × 4", steps: ["Ones: 7 × 4 = 28. Write 8, carry 2.", "Tens: 2 × 4 = 8. Add the carried 2 to make 10.", "Write 10 in front of the 8."], note: "So 27 × 4 = 108." },
    },
    {
      title: "Solve a two-digit story",
      lines: ["Find the 2 numbers in the story.", "Equal groups put together? Multiply. Packing a total into groups? Divide.", "Split the 2-digit number to make it easier."],
      example: { type: "steps", title: "A crate holds 23 apples. How many in 3 crates?", steps: ["3 crates of 23 means 23 × 3.", "20 × 3 = 60 and 3 × 3 = 9.", "60 + 9 = 69 apples."], note: "Check: 23 is about 20, and 20 × 3 = 60, so 69 is close." },
    },
  ],
  "scaling-and-correspondence-problems": [
    {
      title: "Find a scaled amount",
      lines: ["'4 times as long' means 4 lots of the short one.", "Multiply the short length by the number of times.", "The scaled amount is always the bigger one."],
      example: { type: "jumps", title: "A 3 cm ribbon, and one 4 times as long", terms: ["0", "3", "6", "9", "12"], step: "+3", note: "4 jumps of 3 cm make 12 cm." },
    },
    {
      title: "Find the scale factor",
      lines: ["The scale factor says how many times bigger something is.", "Ask: the small amount times what makes the big amount?", "Divide the big amount by the small amount."],
      example: { type: "equation", title: "A 5 cm tower and a 20 cm tower", parts: ["20", "÷", "5", "=", "4"], note: "The big tower is 4 times as high." },
    },
    {
      title: "Connect every possible pair",
      lines: ["Each item on top can go with each item below.", "Join the first top item to every bottom item, then move on.", "Check: number on top × number below = number of pairs."],
      example: { type: "table", title: "2 hats and 2 scarves", headers: ["", "Red scarf", "Blue scarf"], rows: [["Big hat", "Big hat + red", "Big hat + blue"], ["Small hat", "Small hat + red", "Small hat + blue"]], note: "2 × 2 = 4 different outfits." },
    },
    {
      title: "Solve a scaling or matching story",
      lines: ["'Times as' means multiply the small amount.", "'How many times as' means divide the big amount by the small.", "Pairs of things? Multiply the 2 group sizes."],
      example: { type: "steps", title: "A puppy weighs 3 kg. Its mum is 5 times as heavy.", steps: ["5 times as heavy means multiply.", "3 × 5 = 15", "The mum weighs 15 kg."], note: "Check: the answer should be bigger than 3 kg." },
    },
  ],
  "multiplication-and-division-problems": [
    {
      title: "Choose the right operation",
      lines: ["Picture what happens in the story.", "Equal groups put together means ×.", "Sharing equally, or putting into piles, means ÷."],
      example: { type: "table", title: "Clue words", headers: ["The story says", "Use"], rows: [["5 boxes with 6 in each", "6 × 5"], ["30 shared between 5", "30 ÷ 5"], ["30 put into piles of 6", "30 ÷ 6"]], note: "Adding or taking away will not give equal groups." },
    },
    {
      title: "Find the missing number",
      lines: ["The gap hides 1 number in a fact.", "Use the fact family to find it.", "Put your number in the gap and check it is true."],
      example: { type: "steps", title: "? × 4 = 20", steps: ["Ask: what times 4 makes 20?", "Use the divide fact: 20 ÷ 4 = 5.", "Check: 5 × 4 = 20. The gap is 5."] },
    },
    {
      title: "Use a known fact",
      lines: ["Start with a times table fact you know.", "Make 1 number 10 times bigger, and the answer is 10 times bigger.", "This works for dividing too."],
      example: { type: "equation", title: "Known fact: 3 × 4 = 12", parts: ["30", "×", "4", "=", "120"], note: "So 120 ÷ 4 = 30 too." },
    },
    {
      title: "Solve a two-step problem",
      lines: ["A two-step problem needs 2 calculations.", "Do the first step and write its answer down.", "Use that answer to do the second step."],
      example: { type: "steps", title: "A box holds 6 eggs. Sam buys 4 boxes, then uses 5 eggs.", steps: ["Step 1: 6 × 4 = 24 eggs.", "Step 2: 24 − 5 = 19 eggs.", "Sam has 19 eggs left."] },
    },
  ],
};
