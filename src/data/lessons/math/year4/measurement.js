/**
 * Bix's lessons for Year 4 Measurement, one per challenge slot. Each one teaches
 * exactly what that challenge asks (see Year4MathGame / year4Math/questions.js).
 */
export const MEASUREMENT_LESSONS = {
  "converting-units-of-measure": [
    {
      title: "Convert big units to small",
      lines: ["Big units turn into lots of small units.", "Use the rule, then multiply by the rule number.", "1 km = 1000 m, 1 m = 100 cm, 1 cm = 10 mm."],
      example: { type: "table", title: "Unit rules", headers: ["Big unit", "Small units"], rows: [["1 km", "1000 m"], ["1 m", "100 cm"], ["1 cm", "10 mm"], ["1 kg", "1000 g"], ["1 litre", "1000 ml"], ["1 hour", "60 minutes"]] },
    },
    {
      title: "Convert small units to big",
      lines: ["Now go the other way, from small to big.", "Divide by the rule number.", "Check: the big unit needs a smaller number."],
      example: { type: "equation", title: "4000 g in kg", parts: ["4000", "÷", "1000", "=", "4"], note: "4000 g is 4 kg." },
    },
    {
      title: "Match equal measures",
      lines: ["One measure can be written in different ways.", "1.5 km, 1 km 500 m and 1500 m are all the same.", "Change each card to the small unit, then match it."],
      example: { type: "steps", title: "Is 2 m 50 cm the same as 250 cm?", steps: ["2 m is 200 cm.", "200 cm + 50 cm = 250 cm.", "Yes, so 2.5 m is 250 cm too."] },
    },
    {
      title: "Solve a units problem",
      lines: ["Read the story and find the two units.", "Change them into the same unit first.", "Then add, take away or share."],
      example: { type: "steps", title: "A 2 litre jug, pour out 750 ml", steps: ["2 litres = 2000 ml.", "2000 − 750 = 1250.", "So 1250 ml are left."] },
    },
  ],
  "perimeter-of-rectilinear-shapes": [
    {
      title: "Add the sides all round",
      lines: ["Perimeter is the total length around the outside.", "Add every side of the shape.", "A square has 4 sides the same length."],
      example: { type: "equation", title: "A 6 cm by 4 cm rectangle", parts: ["6", "+", "4", "+", "6", "+", "4", "=", "20"], note: "The perimeter is 20 cm." },
    },
    {
      title: "Find missing sides, then add",
      lines: ["Some sides have a ? instead of a length.", "The short edges on one side add up to the long edge opposite.", "Find each ? first, then add every edge."],
      example: { type: "steps", title: "A shape with a notch", steps: ["Top edges: 3 cm and 2 cm, so the bottom is 5 cm.", "Right edges: 1 cm and 3 cm, so the left is 4 cm.", "3 + 1 + 2 + 3 + 5 + 4 = 18 cm."] },
    },
    {
      title: "Build a perimeter sum",
      lines: ["Use each outside edge once.", "A notch in the middle adds 2 extra edges going in and out.", "Put a + between every length."],
      example: { type: "equation", title: "A shape with a notch in the top", parts: ["2", "+", "2", "+", "3", "+", "2", "+", "2", "+", "5", "+", "7", "+", "5", "=", "28"], note: "8 edges add up to 28 cm." },
    },
    {
      title: "Fence a garden in metres",
      lines: ["The fence goes along every outside edge.", "Find any missing lengths in metres.", "If there is a gate, take its width away."],
      example: { type: "steps", title: "A 9 m by 5 m garden with a 2 m gate", steps: ["9 + 5 + 9 + 5 = 28 m.", "28 − 2 = 26.", "So 26 m of fence is needed."] },
    },
  ],
  "area-by-counting-squares": [
    {
      title: "Count the squares inside",
      lines: ["Area is the space inside a shape.", "Each small square is 1 square unit.", "Count the coloured squares, row by row."],
      example: { type: "bar", title: "Two rows of squares", bars: [{ parts: 5, shaded: 3 }, { parts: 5, shaded: 5 }], note: "3 + 5 = 8 square units." },
    },
    {
      title: "Compare two areas",
      lines: ["Find the area of each shape first.", "Then take the smaller area from the bigger one.", "That tells you how many more squares."],
      example: { type: "equation", title: "Shapes of 11 and 7 squares", parts: ["11", "−", "7", "=", "4"], note: "The bigger shape covers 4 more squares." },
    },
    {
      title: "Sort rectangles by area",
      lines: ["A 4 × 3 rectangle has 3 rows of 4 squares.", "Multiply the 2 numbers to find the area.", "Different rectangles can have the same area."],
      example: { type: "groups", title: "A 4 × 3 rectangle", groups: [["🟦", "🟦", "🟦", "🟦"], ["🟦", "🟦", "🟦", "🟦"], ["🟦", "🟦", "🟦", "🟦"]], label: "3 rows of 4 squares", note: "4 × 3 = 12, and 2 × 6 = 12 too." },
    },
    {
      title: "Finish covering the floor",
      lines: ["Each square is 1 square metre.", "Count all the squares to find the area.", "Take away the ones already covered."],
      example: { type: "steps", title: "A floor of 14 squares", steps: ["The area is 14 square metres.", "5 tiles are already laid.", "14 − 5 = 9 more tiles."] },
    },
  ],
  "measures-and-money": [
    {
      title: "Find the biggest amount",
      lines: ["£1 = 100p, 1 m = 100 cm, 1 kg = 1000 g.", "Change every amount to the same unit.", "Then compare the numbers."],
      example: { type: "table", title: "Which is the most?", headers: ["Amount", "In pence"], rows: [["£2.89", "289p"], ["£3.00", "300p"], ["356p", "356p"]], note: "356p is the most money." },
    },
    {
      title: "Estimate to the nearest whole",
      lines: ["Round each amount to the nearest whole pound, metre or kilogram.", "50 or more rounds up.", "Add the rounded numbers."],
      example: { type: "steps", title: "Estimate £4.72 + £1.16", steps: ["£4.72 rounds to £5.", "£1.16 rounds to £1.", "£5 + £1 = about £6."] },
    },
    {
      title: "Order mixed measures",
      lines: ["Some amounts use big units and some use small.", "Change them all to the small unit.", "Then put them from smallest to largest."],
      example: { type: "table", title: "Ordering lengths", headers: ["Length", "In cm"], rows: [["95 cm", "95"], ["1.2 m", "120"], ["130 cm", "130"], ["1.5 m", "150"]], note: "95 cm is the shortest." },
    },
    {
      title: "Work out totals and change",
      lines: ["Change pounds into pence, or litres into ml.", "Add the amounts that are spent or used.", "Take that from what you started with."],
      example: { type: "steps", title: "Pay for £1.26 and £1.40 with £5", steps: ["126 + 140 = 266p.", "£5 is 500p.", "500 − 266 = 234p change."] },
    },
  ],
  "analogue-and-digital-time": [
    {
      title: "Read the clock in 24-hour time",
      lines: ["Morning times keep the same hour, like 09:30.", "From 1 pm, add 12 to the hour.", "Noon is 12:00."],
      example: { type: "equation", title: "3:20 in the afternoon", parts: ["3", "+", "12", "=", "15"], note: "3:20 in the afternoon is 15:20." },
    },
    {
      title: "Change 24-hour to 12-hour",
      lines: ["If the hour is 13 or more, take away 12 and write pm.", "Hours 01 to 11 are am. 12 is pm.", "00 is midnight, so 00:15 is 12:15 am."],
      example: { type: "equation", title: "22:36", parts: ["22", "−", "12", "=", "10"], note: "22:36 is 10:36 pm." },
    },
    {
      title: "Set the analogue clock",
      lines: ["If the hour is 13 or more, take away 12. 00 means 12, just after midnight.", "Move the short hand to that hour.", "Move the long hand to the minutes."],
      example: { type: "equation", title: "Setting 18:17", parts: ["18", "−", "12", "=", "6"], note: "18:17 is 17 minutes past 6 in the evening." },
    },
    {
      title: "Use a 24-hour timetable",
      lines: ["Timetables use the 24-hour clock.", "Change the 12-hour time into 24-hour time.", "Then find the next time on the timetable."],
      example: { type: "steps", title: "Buses at 15:55, 17:15, 18:35", steps: ["Ella arrives at 6:22 pm.", "6 + 12 = 18, so that is 18:22.", "The next bus is at 18:35."] },
    },
  ],
  "time-conversion-problems": [
    {
      title: "Use a time rule",
      lines: ["1 hour is 60 minutes and 1 minute is 60 seconds.", "1 year is 12 months and 1 week is 7 days.", "Multiply by the rule number."],
      example: { type: "table", title: "Time rules", headers: ["1 of these", "Is the same as"], rows: [["hour", "60 minutes"], ["minute", "60 seconds"], ["year", "12 months"], ["week", "7 days"]] },
    },
    {
      title: "Convert back to bigger units",
      lines: ["Now go from the small unit to the big one.", "Divide by the rule number.", "Check: there are fewer big units."],
      example: { type: "equation", title: "35 days in weeks", parts: ["35", "÷", "7", "=", "5"], note: "35 days is 5 weeks." },
    },
    {
      title: "Order mixed durations",
      lines: ["Some times use big units and some use small.", "Change them all to the small unit.", "Then put them from shortest to longest."],
      example: { type: "equation", title: "2 years in months", parts: ["2", "×", "12", "=", "24"], note: "2 years is 24 months, so it is shorter than 26 months." },
    },
    {
      title: "Solve a time problem",
      lines: ["Convert the big units first.", "Then add on the small units.", "Check your answer is in the unit asked for."],
      example: { type: "steps", title: "A film of 2 hours and 15 minutes", steps: ["2 × 60 = 120 minutes.", "120 + 15 = 135.", "So the film is 135 minutes long."] },
    },
  ],
};
