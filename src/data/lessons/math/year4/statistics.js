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
      title: "Read a time graph",
      lines: ["A line graph shows how something changes over time.", "Find the time on the bottom, then go up to the line.", "Go across to the scale to read the temperature."],
      example: { type: "steps", title: "Read the temperature at 10:00", steps: ["Find 10:00 on the bottom axis.", "Go straight up until you touch the line.", "Go across to the scale and read the number."], note: "The scale counts up in 5s." },
    },
    {
      title: "Build a bar chart",
      lines: ["Read each number in the table.", "The scale goes up in 5s.", "Make each bar reach its number, then check it."],
      example: { type: "jumps", title: "Make a bar for 20 visitors", terms: ["0", "5", "10", "15", "20"], step: "+5", note: "Stop the bar at 20 on the scale." },
    },
    {
      title: "Find a rise or fall",
      lines: ["Read the temperature at the first time, then at the later time.", "If it went up, it rose. If it went down, it fell.", "Subtract the smaller from the bigger to find how much."],
      example: { type: "equation", title: "30 °C at 10:00, 15 °C at 13:00", parts: ["30", "−", "15", "=", "15"], note: "The temperature fell by 15 degrees." },
    },
  ],
  "comparing-and-calculating-with-data": [
    {
      title: "Add and compare bars",
      lines: ["Read each bar using the scale in 5s.", "Together means add those bars. Altogether means add every bar.", "How many more or fewer means subtract the smaller from the bigger."],
      example: { type: "equation", title: "Bars show 10, 15 and 25 trees", parts: ["10", "+", "15", "+", "25", "=", "50"], note: "50 trees altogether." },
    },
    {
      title: "Use a pictogram key",
      lines: ["The key tells you what one picture stands for: 2, 4 or 10.", "Count the pictures in a row, then multiply by the key.", "Then add for together, or subtract for more or fewer."],
      example: { type: "groups", title: "Key: 1 🌳 = 4 trees", groups: [["🌳", "🌳", "🌳", "🌳", "🌳"]], label: "5 pictures", note: "5 × 4 = 20 trees." },
    },
    {
      title: "Order data from a table",
      lines: ["The table is not in order, so read every number.", "Check the question: fewest to most, or most to fewest?", "Fewest to most starts with the smallest. Most to fewest starts with the biggest."],
      example: { type: "table", title: "Birds spotted", headers: ["Bird", "Number"], rows: [["Robins", "30"], ["Wrens", "15"], ["Magpies", "45"], ["Sparrows", "20"]], note: "Most to fewest: Magpies, Robins, Sparrows, Wrens." },
    },
    {
      title: "Solve a two-step data problem",
      lines: ["Two-step problems need two sums. Plan the first step.", "Combined means add those two first, then compare.", "Not Oak means add them all, then take Oak away."],
      example: { type: "steps", title: "Oak 50, Ash 15, Elm 20. How many more Oak than Ash and Elm combined?", steps: ["Step 1: add Ash and Elm. 15 + 20 = 35.", "Step 2: subtract from Oak. 50 − 35 = 15."], note: "15 more Oak trees." },
    },
  ],
};
