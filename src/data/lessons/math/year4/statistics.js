/**
 * Bix's lessons for Year 4 Statistics, one per challenge slot. Each one teaches
 * exactly what that challenge asks (see Year4MathGame / year4Math/questions.js).
 */
export const STATISTICS_LESSONS = {
  "bar-charts-and-time-graphs": [
    {
      title: "Read a bar chart",
      lines: ["A bar chart shows how many with bars.", "Each step on the scale is worth 5.", "Go to the top of the bar, then across to the scale."],
      example: { type: "jumps", title: "A bar reaches the 6th step. Each step is 5.", terms: ["0", "5", "10", "15", "20", "25", "30"], step: "+5", note: "6 steps of 5 is 30 visitors." },
    },
    {
      title: "Read a line graph",
      lines: ["A line graph shows how something changes over time.", "Find the time on the bottom, then go up to the line.", "Go across to the scale to read the temperature."],
      example: { type: "steps", title: "Read the temperature at 10:00", steps: ["Find 10:00 on the bottom axis.", "Go straight up until you touch the line.", "Go across to the scale and read the number."], note: "The scale counts up in 5s." },
    },
    {
      title: "Build a bar chart",
      lines: ["Read each number in the table.", "The scale goes up in 5s.", "Make each bar reach its number, then check it."],
      example: { type: "jumps", title: "Make a bar for 20 visitors", terms: ["0", "5", "10", "15", "20"], step: "+5", note: "Stop the bar at 20 on the scale." },
    },
    {
      title: "Find a temperature rise",
      lines: ["Read the temperature at the first time.", "Read the temperature at the later time.", "Subtract the smaller from the bigger to find the rise."],
      example: { type: "equation", title: "15 °C at 09:00, 35 °C at 11:00", parts: ["35", "−", "15", "=", "20"], note: "The temperature rose by 20 degrees." },
    },
  ],
  "comparing-and-calculating-with-data": [
    {
      title: "Total or compare a bar chart",
      lines: ["Read each bar using the scale in 5s.", "Altogether means add all the bars.", "How many more means subtract the smaller from the bigger."],
      example: { type: "equation", title: "Bars show 10, 15 and 25 trees", parts: ["10", "+", "15", "+", "25", "=", "50"], note: "50 trees altogether." },
    },
    {
      title: "Use a pictogram key",
      lines: ["The key says 1 🌳 stands for 5 trees.", "Count the pictures, then multiply by 5.", "Then add or subtract to answer the question."],
      example: { type: "groups", title: "Key: 1 🌳 = 5 trees", groups: [["🌳", "🌳", "🌳", "🌳"]], label: "4 pictures", note: "4 × 5 = 20 trees." },
    },
    {
      title: "Order data from a table",
      lines: ["Read the number for each tree in the table.", "Find the smallest number first.", "Put them in order from fewest to most."],
      example: { type: "table", title: "Trees counted", headers: ["Tree", "Number"], rows: [["Ash", "30"], ["Elm", "15"], ["Yew", "20"]], note: "Fewest to most: Elm, Yew, Ash." },
    },
    {
      title: "Solve a data problem",
      lines: ["Decide if the question wants a total or a difference.", "Read every number you need from the chart.", "Add for altogether, subtract for how many more."],
      example: { type: "equation", title: "Most has 40, fewest has 15. How many more?", parts: ["40", "−", "15", "=", "25"], note: "Check: 15 + 25 = 40." },
    },
  ],
};
