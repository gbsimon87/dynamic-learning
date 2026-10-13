/**
 * Bix's lessons for Year 3 Statistics, one per challenge slot. Each one teaches
 * exactly what that challenge asks (see Year3StatisticsGame / year3Statistics.js).
 */
export const STATISTICS_LESSONS = {
  "bar-charts": [
    {
      title: "Read a scaled bar chart",
      lines: ["A bar chart uses bars to show how many.", "Each line on the scale can be worth 2, 5 or 10.", "Count up the scale in that step to the top of the bar."],
      example: { type: "jumps", title: "A bar reaches the 4th line. Each line is 2.", terms: ["0", "2", "4", "6", "8"], step: "+2", note: "4 lines up in 2s is 8." },
    },
    {
      title: "Compare bars using the scale",
      lines: ["First read how tall each bar is.", "Then take the smaller number from the bigger one.", "The difference tells you how many more."],
      example: { type: "equation", title: "One bar shows 50, another shows 20", parts: ["50", "−", "20", "=", "30"], note: "The taller bar shows 30 more." },
    },
    {
      title: "Build a bar chart",
      lines: ["Look at the table to see each number.", "Find what each line on the scale is worth.", "Grow each bar until it reaches its number."],
      example: { type: "steps", title: "Make a bar for 15. Each line is 5.", steps: ["Count up in 5s: 5, 10, 15.", "That is 3 lines.", "Make the bar 3 lines tall."], note: "Check the top of the bar matches the table." },
    },
    {
      title: "Solve a bar-chart problem",
      lines: ["Some questions need two steps.", "First add the two bars together.", "Then take away the third bar to find how many more."],
      example: { type: "steps", title: "Red 4, Blue 6, Green 8. How many more are Blue and Green than Red?", steps: ["Add: 6 + 8 = 14.", "Take away: 14 − 4 = 10."], note: "Blue and Green together have 10 more than Red." },
    },
  ],
  "scaled-pictograms": [
    {
      title: "Read a pictogram key",
      lines: ["A pictogram uses pictures to show how many.", "The key tells you what 1 picture is worth.", "Count the pictures in 2s, 5s or 10s."],
      example: { type: "groups", title: "Key: 1 ⭐ = 2 stickers", groups: [["⭐"], ["⭐"], ["⭐"], ["⭐"]], label: "4 stars, each worth 2 stickers", note: "2, 4, 6, 8, so the row shows 8 stickers." },
    },
    {
      title: "Compare scaled picture rows",
      lines: ["Use the key to find each row's number.", "Take the smaller number from the bigger one.", "Do not just count the pictures."],
      example: { type: "steps", title: "Key: 1 picture = 5. Row A has 2, Row B has 5.", steps: ["Row A: 2 × 5 = 10.", "Row B: 5 × 5 = 25.", "25 − 10 = 15."], note: "Row B shows 15 more than Row A." },
    },
    {
      title: "Build a scaled pictogram",
      lines: ["Read each number from the table.", "Divide by the key to find how many pictures.", "Draw that many pictures in the row."],
      example: { type: "equation", title: "Key: 1 picture = 10. Show 40.", parts: ["40", "÷", "10", "=", "4"], note: "Draw 4 pictures to show 40." },
    },
    {
      title: "Solve a problem with the key",
      lines: ["Add the two rows to find the total.", "Then divide the total by the key.", "That tells you how many pictures to draw."],
      example: { type: "steps", title: "Key: 1 picture = 2. Rows show 6 and 4.", steps: ["Add: 6 + 4 = 10.", "Divide: 10 ÷ 2 = 5."], note: "The total needs 5 pictures." },
    },
  ],
  tables: [
    {
      title: "Find a number in a table",
      lines: ["A table puts numbers in rows and columns.", "Find the right row, then the right column.", "The number is where they meet."],
      example: { type: "table", title: "Apples picked", headers: ["", "Monday", "Tuesday"], rows: [["Sam", "7", "9"], ["Mia", "11", "6"]], note: "Mia on Monday: go across to Monday. It says 11." },
    },
    {
      title: "Read a whole table row",
      lines: ["A row shows one thing across every column.", "Read each number in the row.", "Add them to find the total for that row."],
      example: { type: "equation", title: "Sam picked 7 on Monday and 9 on Tuesday", parts: ["7", "+", "9", "=", "16"], note: "Sam picked 16 apples across both days." },
    },
    {
      title: "Complete a table from a chart",
      lines: ["Find the bar you need on the chart.", "Use the scale to read its number.", "Write that number in the empty box."],
      example: { type: "jumps", title: "A bar reaches the 3rd line. Each line is 10.", terms: ["0", "10", "20", "30"], step: "+10", note: "The bar shows 30, so write 30 in the table." },
    },
    {
      title: "Solve a table problem",
      lines: ["Read the question to find which boxes you need.", "Add the boxes for the first row.", "Then take away the other number to find how many more."],
      example: { type: "steps", title: "Sam: 7 and 9. Mia: 11 on Monday.", steps: ["Sam both days: 7 + 9 = 16.", "16 − 11 = 5."], note: "Sam picked 5 more than Mia did on Monday." },
    },
  ],
  "one-step-and-two-step-questions": [
    {
      title: "Solve a one-step bar question",
      lines: ["Read both bars using the scale.", "How many more means find the difference.", "Take the smaller number from the bigger one."],
      example: { type: "equation", title: "Bars show 25 and 10", parts: ["25", "−", "10", "=", "15"], note: "One step: 15 more." },
    },
    {
      title: "Solve a pictogram question",
      lines: ["Use the key to find each row's number.", "Altogether means add.", "Add the two numbers to find the total."],
      example: { type: "steps", title: "Key: 1 picture = 5. Rows have 2 and 3 pictures.", steps: ["2 × 5 = 10.", "3 × 5 = 15.", "10 + 15 = 25."], note: "Altogether they show 25." },
    },
    {
      title: "Solve a two-step table question",
      lines: ["Two-step questions need two sums.", "Find every box the question talks about.", "Add the boxes first, then subtract if it asks how many more."],
      example: { type: "table", title: "Cakes baked", headers: ["", "Monday", "Tuesday"], rows: [["Small", "8", "5"], ["Large", "9", "4"], ["Iced", "3", "2"]], note: "Monday 20, Tuesday 11. 20 − 11 = 9 more on Monday." },
    },
    {
      title: "Solve a two-step data question",
      lines: ["The data might be a bar chart, pictogram or table.", "First add the two amounts together.", "Then take away the third to find how many more."],
      example: { type: "steps", title: "A shows 20, B shows 30, C shows 50.", steps: ["Add B and C: 30 + 50 = 80.", "Take away A: 80 − 20 = 60."], note: "B and C together show 60 more than A." },
    },
  ],
};
