/**
 * Bix's lessons for Year 1 Measurement, one per challenge slot. Each one
 * teaches exactly what that challenge asks (see the challenge files in
 * src/pages/skills/math/challenges/year1/<topic>/ and year1Math/measurement.js).
 * Year 1 readers are 5–6: tiny words, short lines, pictures where we can.
 * Worked examples use numbers and stories that are not in the challenges.
 */
const many = (emoji, n) => Array.from({ length: n }, () => emoji);

export const MEASUREMENT_LESSONS = {
  "comparing-and-measuring-lengths-and-heights": [
    {
      title: "Longer or shorter",
      lines: ["Look at the blocks by each ribbon.", "More blocks means longer.", "Fewer blocks means shorter."],
      example: { type: "groups", title: "Which is longer?", groups: [many("🟦", 2), many("🟦", 9)], label: "A ribbon of 2 blocks and a ribbon of 9 blocks", note: "9 blocks is longer than 2 blocks." },
    },
    {
      title: "Count the blocks",
      lines: ["All the blocks are the same size.", "Touch each block as you count.", "Count each block just once."],
      example: { type: "groups", title: "How many blocks long?", groups: [many("🟦", 9)], label: "A ribbon 9 blocks long", note: "This ribbon is 9 blocks long." },
    },
    {
      title: "Shortest first",
      lines: ["Count the blocks for each ribbon.", "Fewest blocks is the shortest.", "Put it first. Longest goes last."],
      example: { type: "steps", title: "Ribbons of 9, 1 and 10 blocks", steps: ["1 block is the shortest. It goes first.", "9 blocks comes next.", "10 blocks is the longest. It goes last."] },
    },
    {
      title: "Read the ruler",
      lines: ["The ruler starts at 0.", "Find where the ribbon or tower ends.", "Read the number there. That is cm."],
      example: { type: "steps", title: "A pencil on the ruler", steps: ["One end is at 0.", "The other end is at 9.", "The pencil is 9 cm long."], note: "cm means centimetres." },
    },
  ],
  "comparing-and-measuring-mass": [
    {
      title: "Heavier or lighter",
      lines: ["Each bag is balanced with cubes.", "More cubes means heavier.", "Fewer cubes means lighter."],
      example: { type: "groups", title: "Which bag is heavier?", groups: [many("🟧", 9), many("🟧", 1)], label: "One bag balances 9 cubes, one bag balances 1 cube", note: "9 cubes is heavier than 1 cube." },
    },
    {
      title: "Count the cubes",
      lines: ["All the cubes are the same.", "Touch each cube as you count.", "Count each cube just once."],
      example: { type: "groups", title: "How many cubes?", groups: [many("🟧", 9)], label: "A bag balances 9 cubes", note: "The bag weighs 9 cubes." },
    },
    {
      title: "Lightest first",
      lines: ["Count the cubes for each bag.", "Fewest cubes is the lightest.", "Put it first. Heaviest goes last."],
      example: { type: "steps", title: "Bags of 10, 1 and 9 cubes", steps: ["1 cube is the lightest. It goes first.", "9 cubes comes next.", "10 cubes is the heaviest. It goes last."] },
    },
    {
      title: "Read the scale",
      lines: ["The scale starts at 0.", "Read the number the pointer is on.", "g means grams. No scale? Count the cubes."],
      example: { type: "jumps", title: "The scale counts up in 1s", terms: ["0", "1", "2", "3"], step: "+1", note: "Stop where the pointer stops." },
    },
  ],
  "comparing-and-measuring-capacity": [
    {
      title: "More or less water",
      lines: ["Each jug is filled with cups of water.", "More cups means it holds more.", "Fewer cups means it holds less."],
      example: { type: "groups", title: "Which jug holds more?", groups: [many("🥤", 1), many("🥤", 9)], label: "One jug holds 1 cup, one jug holds 9 cups", note: "9 cups is more than 1 cup." },
    },
    {
      title: "Full, half or empty",
      lines: ["No water at all is empty.", "Water to the top is full.", "Look how much of the jug is filled."],
      example: { type: "bar", title: "Jugs on their side", bars: [{ parts: 4, shaded: 2, label: "half full" }, { parts: 4, shaded: 1, label: "quarter full" }], note: "Half full is more than quarter full." },
    },
    {
      title: "Least water first",
      lines: ["Count the cups for each jug.", "Fewest cups is the least water.", "Put it first. Most water goes last."],
      example: { type: "steps", title: "Jugs of 9, 10 and 1 cups", steps: ["1 cup is the least. It goes first.", "9 cups comes next.", "10 cups is the most. It goes last."] },
    },
    {
      title: "Read the jug",
      lines: ["Read the jug from the bottom up.", "Find the top of the water.", "Read the number there in litres."],
      example: { type: "jumps", title: "The jug counts up in 1s", terms: ["0", "1", "2", "3"], step: "+1", note: "No numbers? Count the cups instead." },
    },
  ],
  "measuring-and-comparing-time": [
    {
      title: "Seconds, minutes or hours",
      lines: ["Very quick things take seconds.", "Longer things take minutes.", "Very long things take hours."],
      example: { type: "table", title: "How long does it take?", headers: ["Thing", "It takes"], rows: [["a clap", "seconds"], ["brushing teeth", "minutes"], ["a school day", "hours"]] },
    },
    {
      title: "Quicker or slower",
      lines: ["Quicker means less time.", "Slower means more time.", "Look at the numbers of minutes."],
      example: { type: "steps", title: "Sam takes 9 minutes. Ava takes 2.", steps: ["2 is less than 9.", "Ava takes less time.", "So Ava is quicker."] },
    },
    {
      title: "Quickest first",
      lines: ["The quickest takes the least time.", "Find the smallest number. Put it first.", "The biggest number goes last."],
      example: { type: "jumps", title: "Quickest first", terms: ["12 seconds", "15 seconds", "20 seconds"], note: "Smallest number first." },
    },
    {
      title: "Read the timer",
      lines: ["A timer counts the seconds.", "Look at the last 2 digits.", "That number is the seconds."],
      example: { type: "steps", title: "The timer shows 00:12", steps: ["Look at the last 2 digits.", "They say 12.", "That is 12 seconds."] },
    },
  ],
  "recognising-coins": [
    {
      title: "Read the coin",
      lines: ["Look for the number on the coin.", "p means pence.", "The number tells you its value."],
      example: { type: "steps", title: "A coin says 20p", steps: ["Find the number: 20.", "Find the p next to it.", "It is worth 20 pence."] },
    },
    {
      title: "Pence and pounds",
      lines: ["A p after the number means pence.", "A £ before the number means pounds.", "Look at the number and the sign."],
      example: { type: "table", title: "Two signs on coins", headers: ["Sign", "We say"], rows: [["p", "pence"], ["£", "pounds"]], note: "The £ sign goes before the number." },
    },
    {
      title: "Sort pence and pounds",
      lines: ["Look for a p or a £.", "A p goes in Pence.", "A £ goes in Pounds."],
      example: { type: "steps", title: "Where does 5p go?", steps: ["5p has a p after the 5.", "p means pence.", "So 5p goes in Pence."] },
    },
    {
      title: "Help Bix with his coin",
      lines: ["Look at the coin very closely.", "Find the number. Then p or £.", "Say it out loud, then tap it."],
      example: { type: "steps", title: "A coin says 10p", steps: ["The number is 10.", "It has a p, so pence.", "It is worth 10p."] },
    },
  ],
  "recognising-notes": [
    {
      title: "Read the note",
      lines: ["Notes are paper money.", "Find the £ sign and the number.", "The number tells you how many pounds."],
      example: { type: "steps", title: "A note says £10", steps: ["Find the £ sign.", "The number is 10.", "It is worth 10 pounds."] },
    },
    {
      title: "Know the notes",
      lines: ["There are £5, £10, £20 and £50 notes.", "Look at the number on the note.", "Bigger number, bigger value."],
      example: { type: "jumps", title: "Notes from small to big", terms: ["£5", "£10", "£20", "£50"], note: "£50 is worth the most." },
    },
    {
      title: "Less than £20?",
      lines: ["Read the number on each note.", "Smaller than 20? It is less than £20.", "20 or bigger? It is £20 or more."],
      example: { type: "equation", title: "15 is less than 20", parts: ["15", "<", "20"], note: "So £15 would be less than £20." },
    },
    {
      title: "Is it the right note?",
      lines: ["Read the note Maya needs.", "Read the number on the note.", "Same number? Yes. Different? No."],
      example: { type: "steps", title: "Sam needs a £5 note", steps: ["The note says £50.", "50 is not 5.", "So the answer is No."] },
    },
  ],
  "sequencing-events": [
    {
      title: "First, next, last",
      lines: ["Think what happens first.", "Then think what comes next.", "The day goes morning, afternoon, evening."],
      example: { type: "steps", title: "Bath time", steps: ["First, fill the bath.", "Next, get in and wash.", "Last, dry with a towel."] },
    },
    {
      title: "Yesterday, today, tomorrow",
      lines: ["Yesterday is the day before today.", "Tomorrow is the day after today.", "Earlier means it happens first."],
      example: { type: "jumps", title: "Three days in a row", terms: ["yesterday", "today", "tomorrow"], note: "Each one is one day later." },
    },
    {
      title: "Put events in order",
      lines: ["What must happen first?", "What can only happen after that?", "Put the last thing at the end."],
      example: { type: "steps", title: "Brushing teeth", steps: ["Put paste on the brush.", "Brush your teeth.", "Rinse your mouth."] },
    },
    {
      title: "Help Bix with the days",
      lines: ["Say the days of the week in order.", "Tomorrow? Step on one day.", "Yesterday? Step back one day."],
      example: { type: "steps", title: "Today is Saturday. What was yesterday?", steps: ["Find Saturday.", "Step back one day.", "Yesterday was Friday."] },
    },
  ],
  "days-months-and-years": [
    {
      title: "Days of the week",
      lines: ["Say the days like a song.", "Find the day in the question.", "The next one comes after it."],
      example: { type: "steps", title: "The days in order", steps: ["Monday, Tuesday, Wednesday,", "Thursday, Friday,", "Saturday, Sunday.", "Then start again at Monday."] },
    },
    {
      title: "Months of the year",
      lines: ["Say the months like a song.", "Find the month in the question.", "The next one comes after it."],
      example: { type: "steps", title: "The months in order", steps: ["January, February, March,", "April, May, June,", "July, August, September,", "October, November, December."], note: "After December, a new year starts." },
    },
    {
      title: "Put months in order",
      lines: ["Say the months from January.", "Which card do you say first?", "Put it first. Then the next one."],
      example: { type: "steps", title: "Order May, March and April", steps: ["Say: March, April, May.", "March comes first.", "Then April, then May."] },
    },
    {
      title: "Count days and months",
      lines: ["Count the days on your fingers.", "Count the months the same way.", "Two weeks? Count one week twice."],
      example: { type: "steps", title: "What number month is February?", steps: ["Start at January. Say 1.", "Next is February. Say 2.", "February is month 2."] },
    },
  ],
  "oclock-and-half-past": [
    {
      title: "O'clock times",
      lines: ["The long hand points to 12.", "Look at the short hand.", "It points to the hour."],
      example: { type: "steps", title: "Reading o'clock", steps: ["Long hand on 12: it is o'clock.", "Short hand on 2.", "It is 2 o'clock."] },
    },
    {
      title: "O'clock or half past",
      lines: ["Look at the long hand first.", "On 12? It is o'clock.", "On 6? It is half past."],
      example: { type: "table", title: "Where is the long hand?", headers: ["Long hand on", "We say"], rows: [["12", "o'clock"], ["6", "half past"]], note: "At half past, the short hand is past the hour." },
    },
    {
      title: "Set the clock",
      lines: ["O'clock? Put the long hand on 12.", "Half past? Put the long hand on 6.", "Then point the short hand to the hour."],
      example: { type: "steps", title: "To show half past 2", steps: ["Put the long hand on 6.", "Put the short hand just past 2.", "Now it shows half past 2."] },
    },
    {
      title: "Help Bix tell the time",
      lines: ["Look at the long hand: 12 or 6?", "Then look at the short hand.", "Pick the time that matches."],
      example: { type: "steps", title: "Reading half past", steps: ["Long hand on 6: half past.", "Short hand just past 2.", "It is half past 2."] },
    },
  ],
};
