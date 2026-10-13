/**
 * Bix's lessons for Year 4 Measurement, one per challenge slot. Each one teaches
 * exactly what that challenge asks (see Year4MathGame / year4Math/questions.js).
 */
export const MEASUREMENT_LESSONS = {
  "converting-units-of-measure": [
    {
      title: "Explore the unit rules",
      lines: ["Big units turn into lots of small units.", "1 km = 1000 m, 1 m = 100 cm, 1 kg = 1000 g.", "To convert, multiply by the rule number."],
      example: { type: "table", title: "Unit rules", headers: ["Big unit", "Small units"], rows: [["1 km", "1000 m"], ["1 m", "100 cm"], ["1 kg", "1000 g"], ["1 litre", "1000 ml"], ["1 hour", "60 minutes"]] },
    },
    {
      title: "Find the conversion pattern",
      lines: ["Find the rule for the two units first.", "Multiply the big number by that rule.", "Check: the small unit needs a bigger number."],
      example: { type: "equation", title: "4 kg to g", parts: ["4", "×", "1000", "=", "4000"], note: "4 kg is 4000 g." },
    },
    {
      title: "Match the equal measures",
      lines: ["Each card has a partner that is the same amount.", "Convert the big unit into the small unit.", "Put the card with its matching measure."],
      example: { type: "jumps", title: "Counting metres in cm", terms: ["100", "200", "300", "400"], step: "+100", note: "Each metre adds 100 cm, so 4 m is 400 cm." },
    },
    {
      title: "Solve a units problem",
      lines: ["Each thing in the story is 1 big unit.", "Count how many there are.", "Multiply by the rule to get the small unit."],
      example: { type: "steps", title: "5 bottles of 1 litre", steps: ["1 litre = 1000 ml.", "5 × 1000 = 5000.", "So the total is 5000 ml."] },
    },
  ],
  "perimeter-of-rectilinear-shapes": [
    {
      title: "Explore the perimeter",
      lines: ["Perimeter is the total length around the outside.", "A rectangle has 2 long sides and 2 short sides.", "Add all 4 sides together."],
      example: { type: "equation", title: "A 6 cm by 4 cm rectangle", parts: ["6", "+", "4", "+", "6", "+", "4", "=", "20"], note: "The perimeter is 20 cm." },
    },
    {
      title: "Go round the notch",
      lines: ["Some shapes have a corner cut out.", "Walk round the outside and add every edge.", "Do not forget the 2 small edges of the notch."],
      example: { type: "steps", title: "Walking round the edge", steps: ["Start at one corner.", "Add each edge as you pass it.", "Stop when you are back at the start."], note: "The total is still the same as the full rectangle." },
    },
    {
      title: "Build the perimeter sum",
      lines: ["Use each outside length once.", "Put a + between the lengths.", "Use all the tiles to make the sum."],
      example: { type: "equation", title: "Edges of a shape with a notch", parts: ["6", "+", "3", "+", "2", "+", "1", "+", "4", "+", "4", "=", "20"], note: "6 edges add up to 20." },
    },
    {
      title: "Fence the garden",
      lines: ["The fence goes along every outside edge.", "Add up all the edge lengths in metres.", "Check you went all the way round."],
      example: { type: "column", title: "Adding two halves of a fence", top: "11", op: "+", bottom: "11", answer: "22", note: "Long plus short is 11 m, twice round gives 22 m." },
    },
  ],
  "area-by-counting-squares": [
    {
      title: "Explore the area",
      lines: ["Area is the space inside a shape.", "Each small square is 1 square unit.", "Count the filled squares, row by row."],
      example: { type: "bar", title: "One row of squares", bars: [{ parts: 6, shaded: 6 }], note: "1 row of 6 filled squares is 6 square units." },
    },
    {
      title: "Count the gaps carefully",
      lines: ["Some squares in the shape are empty.", "Count only the filled squares.", "Count each row, then add the rows."],
      example: { type: "bar", title: "Two rows with a gap", bars: [{ parts: 5, shaded: 3 }, { parts: 5, shaded: 5 }], note: "3 + 5 = 8 square units." },
    },
    {
      title: "Sort rectangles by area",
      lines: ["A 4 × 3 rectangle has 3 rows of 4 squares.", "Multiply the 2 numbers to find the area.", "Put each card under its area."],
      example: { type: "groups", title: "A 4 × 3 rectangle", groups: [["🟦", "🟦", "🟦", "🟦"], ["🟦", "🟦", "🟦", "🟦"], ["🟦", "🟦", "🟦", "🟦"]], label: "3 rows of 4 squares", note: "4 × 3 = 12 square units." },
    },
    {
      title: "Measure the floor",
      lines: ["Now each square is 1 square metre.", "Count the filled squares just the same.", "Your answer is in square metres."],
      example: { type: "equation", title: "Adding the rows", parts: ["5", "+", "5", "+", "3", "=", "13"], note: "Rows of 5, 5 and 3 squares make 13 square metres." },
    },
  ],
  "measures-and-money": [
    {
      title: "Explore adding measures",
      lines: ["Use the same unit before you add.", "£1 is 100p, so £1.25 is 125p.", "Then add the 2 amounts together."],
      example: { type: "column", title: "£1.32 + £2.15 in pence", top: "132", op: "+", bottom: "215", answer: "347", note: "The total is 347p." },
    },
    {
      title: "Estimate to the nearest pound",
      lines: ["Round each price to the nearest pound first.", "50p or more rounds up.", "Add the rounded pounds, then write it in pence."],
      example: { type: "steps", title: "Estimate £2.30 + £1.70", steps: ["£2.30 rounds to £2.", "£1.70 rounds to £2.", "£2 + £2 = £4, which is 400p."] },
    },
    {
      title: "Order the prices",
      lines: ["Look at the pounds first.", "If the pounds match, look at the pence.", "Put the cheapest first."],
      example: { type: "table", title: "Comparing prices", headers: ["Price", "Pounds", "Pence"], rows: [["£1.95", "1", "95"], ["£2.05", "2", "5"], ["£2.40", "2", "40"]], note: "£1.95 is cheapest. £2.40 is the most expensive." },
    },
    {
      title: "Solve a measures problem",
      lines: ["Read the story and find the 2 amounts.", "Change pounds into pence if you need to.", "Add, then check the unit asked for."],
      example: { type: "column", title: "A jug of 214 ml, add 153 ml", top: "214", op: "+", bottom: "153", answer: "367", note: "The jug now holds 367 ml." },
    },
  ],
  "analogue-and-digital-time": [
    {
      title: "Explore 24-hour time",
      lines: ["Morning times keep the same hour, like 09:30.", "After noon, add 12 to the hour.", "Midnight is 00:00 and noon is 12:00."],
      example: { type: "equation", title: "3 o'clock in the afternoon", parts: ["3", "+", "12", "=", "15"], note: "3:20 in the afternoon is 15:20." },
    },
    {
      title: "Read any minute",
      lines: ["The short hand shows the hour.", "Count the small marks for the minutes.", "Morning or afternoon tells you whether to add 12."],
      example: { type: "jumps", title: "Counting minutes in 5s", terms: ["0", "5", "10", "15", "20"], step: "+5", note: "Count in 5s, then add the extra small marks." },
    },
    {
      title: "Set the analogue clock",
      lines: ["If the hour is 13 or more, take away 12.", "Move the short hand to that hour.", "Move the long hand to the minutes."],
      example: { type: "equation", title: "Setting 19:40", parts: ["19", "−", "12", "=", "7"], note: "19:40 is 7:40 on an analogue clock." },
    },
    {
      title: "Count minutes after midnight",
      lines: ["Each hour after midnight is 60 minutes.", "Multiply the hours by 60.", "Then add the extra minutes."],
      example: { type: "steps", title: "03:10 in minutes", steps: ["3 hours × 60 = 180 minutes.", "180 + 10 = 190.", "03:10 is 190 minutes after midnight."] },
    },
  ],
  "time-conversion-problems": [
    {
      title: "Explore the time rules",
      lines: ["Time units have their own rule numbers.", "1 hour is 60 minutes and 1 minute is 60 seconds.", "1 year is 12 months and 1 week is 7 days."],
      example: { type: "table", title: "Time rules", headers: ["1 of these", "Is the same as"], rows: [["hour", "60 minutes"], ["minute", "60 seconds"], ["year", "12 months"], ["week", "7 days"]] },
    },
    {
      title: "Find the time pattern",
      lines: ["Find the rule for the 2 units.", "Multiply the number by the rule.", "Check: the smaller unit needs a bigger number."],
      example: { type: "jumps", title: "Counting weeks in days", terms: ["7", "14", "21", "28"], step: "+7", note: "4 weeks is 28 days." },
    },
    {
      title: "Order the durations",
      lines: ["Some times are in hours and some in minutes.", "Change hours into minutes so they match.", "Then put them from shortest to longest."],
      example: { type: "equation", title: "Changing hours to minutes", parts: ["3", "×", "60", "=", "180"], note: "3 hours is 180 minutes, so it is longer than 150 minutes." },
    },
    {
      title: "Solve a time problem",
      lines: ["Convert the big unit first.", "Then add the extra small units.", "Check your answer is in the unit asked for."],
      example: { type: "steps", title: "2 hours and 15 minutes", steps: ["2 × 60 = 120 minutes.", "120 + 15 = 135.", "So it is 135 minutes altogether."] },
    },
  ],
};
