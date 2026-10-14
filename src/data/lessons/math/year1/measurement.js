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
      lines: ["The ruler starts at 0.", "Find where the thing ends.", "Read the number there. That is cm."],
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
      lines: ["Read the number the pointer is on.", "kg means kilograms. Heavy things use kg.", "g means grams. Light things use g."],
      example: { type: "jumps", title: "A gram scale counts in 100s", terms: ["0", "100", "200", "300"], step: "+100", note: "Stop where the pointer stops." },
    },
  ],
  "comparing-and-measuring-capacity": [
    {
      title: "More or less water",
      lines: ["Each jug is filled with cups of water.", "More cups means it holds more.", "Fewer cups means it holds less."],
      example: { type: "groups", title: "Which jug holds more?", groups: [many("🥤", 1), many("🥤", 9)], label: "One jug holds 1 cup, one jug holds 9 cups", note: "9 cups is more than 1 cup." },
    },
    {
      title: "Full, half, quarter or empty",
      lines: ["No water at all is empty.", "Up to the middle is half full.", "Water to the top is full."],
      example: { type: "bar", title: "Jugs on their side", bars: [{ parts: 4, shaded: 2, label: "half full" }, { parts: 4, shaded: 1, label: "quarter full" }], note: "Half full is more than quarter full." },
    },
    {
      title: "Least water first",
      lines: ["Count the cups for each jug.", "Fewest cups is the least water.", "Put it first. Most water goes last."],
      example: { type: "steps", title: "Jugs of 9, 10 and 1 cups", steps: ["1 cup is the least. It goes first.", "9 cups comes next.", "10 cups is the most. It goes last."] },
    },
    {
      title: "Read the jug",
      lines: ["Find the top of the water.", "Read the number on the scale there.", "Big things use litres. Jugs use ml."],
      example: { type: "jumps", title: "A jug counts in 100s", terms: ["0", "100", "200", "300"], step: "+100", note: "ml means millilitres." },
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
      lines: ["Quicker means less time.", "Slower means more time.", "Compare the two numbers."],
      example: { type: "steps", title: "Sam takes 9 minutes. Ava takes 2.", steps: ["2 is less than 9.", "Ava takes less time.", "So Ava is quicker."] },
    },
    {
      title: "Quickest or slowest first",
      lines: ["The quickest takes the least time.", "The slowest takes the most time.", "Read which one goes first. Then order."],
      example: { type: "jumps", title: "Quickest first", terms: ["12 seconds", "15 seconds", "20 seconds"], note: "Smallest number first." },
    },
    {
      title: "How long did it take?",
      lines: ["How many hours? Count on from the start.", "How much quicker? Count on to the bigger number.", "Two times in a row? Add them."],
      example: { type: "steps", title: "Ava runs in 16 seconds. Sam in 19.", steps: ["Count on from 16 to 19.", "17, 18, 19. That is 3 jumps.", "Ava is 3 seconds quicker."] },
    },
  ],
  "recognising-coins": [
    {
      title: "Find the coin",
      lines: ["Read the number on each coin.", "p means pence.", "Tap the letter by the right coin."],
      example: { type: "steps", title: "Which coin is 20p?", steps: ["A says 2p.", "B says 20p.", "So the answer is B."] },
    },
    {
      title: "Pence and pounds",
      lines: ["A p after the number means pence.", "A £ before the number means pounds.", "Look at the number and the sign."],
      example: { type: "table", title: "Two signs on coins", headers: ["Sign", "We say"], rows: [["p", "pence"], ["£", "pounds"]], note: "2p and £2 are not the same!" },
    },
    {
      title: "Sort pence and pounds",
      lines: ["Look for a p or a £.", "A p goes in Pence.", "A £ goes in Pounds."],
      example: { type: "steps", title: "Where does 5p go?", steps: ["5p has a p after the 5.", "p means pence.", "So 5p goes in Pence."] },
    },
    {
      title: "Which is worth the most?",
      lines: ["Look for p or £ on each coin.", "A £ coin is worth more than any p coin.", "£1 is worth more than 50p."],
      example: { type: "steps", title: "5p, 20p or £1?", steps: ["5p and 20p are pence.", "£1 is a pound. It is 100p.", "So £1 is worth the most."] },
    },
  ],
  "recognising-notes": [
    {
      title: "Read the note",
      lines: ["Notes are paper money.", "Find the £ sign and the number.", "Read it, or find the note that matches."],
      example: { type: "steps", title: "A note says £10", steps: ["Find the £ sign.", "The number is 10.", "It is worth 10 pounds."] },
    },
    {
      title: "Know the notes",
      lines: ["There are £5, £10, £20 and £50 notes.", "Bigger number, bigger value.", "Most is the biggest. Least is the smallest."],
      example: { type: "jumps", title: "Notes from small to big", terms: ["£5", "£10", "£20", "£50"], note: "£50 is worth the most." },
    },
    {
      title: "Coins and notes in order",
      lines: ["Coins are worth less than notes.", "£1 is worth more than 50p.", "Put the smallest value first."],
      example: { type: "steps", title: "A £10 note, 20p and a £2 coin", steps: ["20p is pence. It is the smallest.", "The £2 coin comes next.", "The £10 note is worth the most."] },
    },
    {
      title: "Count the notes",
      lines: ["All the notes are the same.", "£5 notes? Count in fives.", "£10 notes? Count in tens."],
      example: { type: "jumps", title: "Six £10 notes", terms: ["10", "20", "30", "40", "50", "60"], step: "+10", note: "Six £10 notes make £60." },
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
      lines: ["Yesterday is the day before today.", "Tomorrow is the day after today.", "Breakfast is morning. Bedtime is evening."],
      example: { type: "jumps", title: "Three days in a row", terms: ["yesterday", "today", "tomorrow"], note: "Each one is one day later." },
    },
    {
      title: "Put events in order",
      lines: ["What must happen first?", "What can only happen after that?", "Put the last thing at the end."],
      example: { type: "steps", title: "Brushing teeth", steps: ["Put paste on the brush.", "Brush your teeth.", "Rinse your mouth."] },
    },
    {
      title: "Earlier or later?",
      lines: ["Morning comes first, then afternoon.", "Evening comes last.", "Same part of the day? Smaller number is earlier."],
      example: { type: "steps", title: "Who has breakfast earlier?", steps: ["Sam eats at 8 in the morning.", "Ava eats at 9 in the morning.", "8 comes before 9. Sam is earlier."] },
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
      lines: ["Say the months like a song.", "After means the next one.", "Before means the one just in front."],
      example: { type: "steps", title: "The months in order", steps: ["January, February, March,", "April, May, June,", "July, August, September,", "October, November, December."], note: "After December, a new year starts." },
    },
    {
      title: "Put days or months in order",
      lines: ["Say the days or months from the start.", "Which card do you say first?", "Put it first. Then the next one."],
      example: { type: "steps", title: "Order May, March and April", steps: ["Say: March, April, May.", "March comes first.", "Then April, then May."] },
    },
    {
      title: "Count days and months",
      lines: ["Count the days on your fingers.", "Count the months the same way.", "How many until? Count the jumps."],
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
      title: "Later on the clock",
      lines: ["The clock shows the start time.", "1 hour later? The short hand moves on one.", "Half an hour? The long hand goes half way."],
      example: { type: "steps", title: "Start at 2 o'clock. Play for 1 hour.", steps: ["Short hand on 2. Long hand on 12.", "Move the short hand on to 3.", "Now it is 3 o'clock."] },
    },
  ],
};
