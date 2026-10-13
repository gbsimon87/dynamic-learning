/**
 * Bix's lessons for Year 3 Measurement, one per challenge slot. Each one teaches
 * exactly what that challenge asks (see Year3MeasurementGame / year3Measurement.js).
 */
export const MEASUREMENT_LESSONS = {
  "measuring-length-in-mm-cm-and-m": [
    {
      title: "Read millimetres on a ruler",
      lines: ["Each tiny mark on the ruler is 1 mm.", "Find the last big number before the end of the object.", "Count on the small marks after it, 1 at a time."],
      example: { type: "jumps", title: "The end is 3 marks past 50", terms: ["50", "51", "52", "53"], step: "+1", note: "3 small marks after 50 is 53 mm." },
    },
    {
      title: "Compare lengths in different units",
      lines: ["Change both lengths into the same unit first.", "1 m is 100 cm, and 1 cm is 10 mm.", "Then compare the numbers and pick <, = or >."],
      example: { type: "table", title: "1 m 40 cm or 135 cm?", headers: ["Length", "In cm"], rows: [["1 m 40 cm", "140 cm"], ["135 cm", "135 cm"]], note: "140 cm > 135 cm, so 1 m 40 cm > 135 cm." },
    },
    {
      title: "Build metres and centimetres",
      lines: ["Metres are the big unit. Centimetres are the small unit.", "Set the metres first, then the centimetres.", "If there are no whole metres, leave metres on 0."],
      example: { type: "steps", title: "To build 2 m 35 cm", steps: ["Tap metres up to 2.", "Tap centimetres up to 35.", "Check: it reads 2 m 35 cm."], note: "2 m 35 cm is the same as 235 cm." },
    },
    {
      title: "Solve a length story",
      lines: ["Find the lengths in the story.", "Change them all into the unit the question asks for.", "Then add or take away."],
      example: { type: "steps", title: "A plank is 3 m long. 70 cm is cut off.", steps: ["The answer is in cm.", "3 m is 300 cm.", "300 − 70 = 230.", "230 cm is left."] },
    },
  ],
  "measuring-mass": [
    {
      title: "Read grams on a scale",
      lines: ["The big numbers on the scale go up in 100s.", "A small mark halfway between them is 50 more.", "Find the mark the pointer is on."],
      example: { type: "jumps", title: "Counting in 50s on a scale", terms: ["0", "50", "100", "150", "200", "250"], step: "+50", note: "Halfway between 200 g and 300 g is 250 g." },
    },
    {
      title: "Compare kilograms and grams",
      lines: ["1 kg is the same as 1000 g.", "Change the kilograms into grams.", "Now compare the grams and pick <, = or >."],
      example: { type: "equation", title: "1 kg 300 g or 1250 g?", parts: ["1300 g", ">", "1250 g"], note: "1 kg 300 g is 1300 g, so it is heavier." },
    },
    {
      title: "Build kilograms and grams",
      lines: ["Kilograms are the big unit. Grams are the small unit.", "Set the kilograms first, then the grams.", "Under 1000 g? Leave kilograms on 0."],
      example: { type: "table", title: "Building 1 kg 700 g", headers: ["Part", "Set it to"], rows: [["Kilograms", "1 kg"], ["Grams", "700 g"]], note: "1 kg 700 g is the same as 1700 g." },
    },
    {
      title: "Solve a mass story",
      lines: ["The answer must be in grams.", "Change any kilograms into grams: 1 kg is 1000 g.", "Then add or take away."],
      example: { type: "column", title: "A box is 1 kg 300 g. Add 400 g.", top: "1300", op: "+", bottom: "400", answer: "1700", note: "1 kg 300 g is 1300 g, so the box is now 1700 g." },
    },
  ],
  "measuring-volume-and-capacity": [
    {
      title: "Read millilitres on a jug",
      lines: ["Look at the top of the liquid in the jug.", "The numbers go up in 100s. A small line between is 50 more.", "Look straight across to read the line."],
      example: { type: "jumps", title: "Reading up a jug", terms: ["600", "650", "700", "750", "800"], step: "+50", note: "Each small line on this jug is 50 ml more." },
    },
    {
      title: "Compare litres and millilitres",
      lines: ["1 l is the same as 1000 ml.", "Change the litres into millilitres.", "Now compare the millilitres and pick <, = or >."],
      example: { type: "steps", title: "1 l 400 ml or 1500 ml?", steps: ["1 l is 1000 ml.", "1 l 400 ml is 1400 ml.", "1400 ml < 1500 ml."], note: "So 1 l 400 ml < 1500 ml." },
    },
    {
      title: "Build litres and millilitres",
      lines: ["Litres are the big unit. Millilitres are the small unit.", "Set the litres first, then the millilitres.", "Under 1000 ml? Leave litres on 0."],
      example: { type: "table", title: "Building 2 l 300 ml", headers: ["Part", "Set it to"], rows: [["Litres", "2 l"], ["Millilitres", "300 ml"]], note: "2 l 300 ml is the same as 2300 ml." },
    },
    {
      title: "Solve a capacity story",
      lines: ["The answer must be in millilitres.", "Change any litres into millilitres: 1 l is 1000 ml.", "Then add, take away, or find how much more."],
      example: { type: "steps", title: "A jug holds 1 l. It has 400 ml in it.", steps: ["How much more will fill it?", "1 l is 1000 ml.", "1000 − 400 = 600.", "600 ml more will fill it."] },
    },
  ],
  "adding-and-subtracting-measurements": [
    {
      title: "Calculate with one unit",
      lines: ["When both amounts use the same unit, just use the numbers.", "Add or take away as normal.", "Keep the same unit in your answer."],
      example: { type: "equation", title: "450 ml + 300 ml", parts: ["450", "+", "300", "=", "750"], note: "450 ml + 300 ml = 750 ml." },
    },
    {
      title: "Calculate across mixed units",
      lines: ["Change everything into the small unit first.", "1 kg is 1000 g, 1 l is 1000 ml, 1 m is 100 cm.", "Then work it out and write the small unit."],
      example: { type: "steps", title: "2 kg − 300 g", steps: ["2 kg is 2000 g.", "2000 − 300 = 1700.", "The answer is 1700 g."] },
    },
    {
      title: "Build the mixed-unit answer",
      lines: ["Work out the answer first.", "When taking away, swap 1 big unit for small units.", "Then build the big units and the small units."],
      example: { type: "steps", title: "2 m − 30 cm", steps: ["Swap 1 m for 100 cm.", "Now you have 1 m and 100 cm.", "100 − 30 = 70.", "Build 1 m 70 cm."] },
    },
    {
      title: "Solve a measurement story",
      lines: ["Find the amounts in the story.", "Change them into the small unit the question asks for.", "Then add or take away. Columns help with big numbers."],
      example: { type: "column", title: "A jug has 1 l 250 ml. 400 ml is poured out.", top: "1250", op: "−", bottom: "400", answer: "850", note: "1 l 250 ml is 1250 ml, so 850 ml is left." },
    },
  ],
  "perimeter-of-2-d-shapes": [
    {
      title: "Add every side",
      lines: ["Perimeter is the distance all the way around a shape.", "Add the length of every side.", "Count the sides to check you used them all."],
      example: { type: "equation", title: "A 5 cm by 3 cm rectangle", parts: ["5", "+", "3", "+", "5", "+", "3", "=", "16"], note: "4 sides added: the perimeter is 16 cm." },
    },
    {
      title: "Find the missing side",
      lines: ["Add up the sides you know.", "Take that total away from the perimeter.", "What is left is the missing side."],
      example: { type: "steps", title: "Perimeter 30 cm. Sides 9 cm, 6 cm, 9 cm and ?", steps: ["9 + 6 + 9 = 24.", "30 − 24 = 6.", "The missing side is 6 cm."] },
    },
    {
      title: "Trace the whole perimeter",
      lines: ["Start at one corner.", "Trace 1 side at a time and add it on.", "Stop when you are back where you started."],
      example: { type: "jumps", title: "Tracing an 8 cm by 3 cm rectangle", terms: ["0", "8", "11", "19", "22"], note: "After the last side, the total is the perimeter: 22 cm." },
    },
    {
      title: "Solve a perimeter story",
      lines: ["Picture the shape and label its sides.", "A rectangle has 2 long sides and 2 short sides.", "A square has 4 sides that are all the same."],
      example: { type: "steps", title: "A square pond has sides of 9 m.", steps: ["It has 4 equal sides.", "9 + 9 + 9 + 9 = 36.", "The perimeter is 36 m."] },
    },
  ],
  "money-and-giving-change": [
    {
      title: "Add pounds and pence",
      lines: ["£3.75 means 3 pounds and 75 pence.", "Add the pounds, then add the pence.", "If the pence reach 100p, swap them for £1."],
      example: { type: "steps", title: "£1.60 + £2.25", steps: ["Pounds: £1 + £2 = £3.", "Pence: 60p + 25p = 85p.", "Total: £3.85."] },
    },
    {
      title: "Work out the change",
      lines: ["Change is the money you get back.", "Count on from the price to the money you paid.", "Write it in pence: £1 is 100p."],
      example: { type: "jumps", title: "Something costs £2.70. You pay £5.", terms: ["£2.70", "£3", "£5"], note: "30p and then £2 makes 230p change." },
    },
    {
      title: "Choose coins for the change",
      lines: ["First work out how much change to give.", "Pick the biggest coin that fits.", "Keep adding coins until they make the change."],
      example: { type: "steps", title: "Cost £3.40. Paid £5.", steps: ["Count on: 60p to £4, then £1.", "The change is 160p.", "Give £1, 50p and 10p."], note: "£1 + 50p + 10p = 160p." },
    },
    {
      title: "Solve a two-step money problem",
      lines: ["Step 1: find the total cost.", "Step 2: take it away from the money paid.", "Change pounds to pence: £5 is 500p."],
      example: { type: "steps", title: "2 pens cost 40p each. You pay £2.", steps: ["40p + 40p = 80p.", "£2 is 200p.", "200 − 80 = 120.", "Your change is 120p."] },
    },
  ],
  "telling-the-time-to-the-minute": [
    {
      title: "Read the clock to the minute",
      lines: ["The short hand shows the hour.", "For the long hand, count in 5s round the numbers.", "Then count on the small marks, 1 minute each."],
      example: { type: "steps", title: "Reading a clock", steps: ["The short hand is just past 4.", "The long hand is past the 5: count 5, 10, 15, 20, 25.", "2 more small marks makes 27.", "The time is 4:27."] },
    },
    {
      title: "Say the time to the minute",
      lines: ["Up to half past, say minutes past the hour.", "After half past, say minutes to the next hour.", "60 take away the minutes gives the minutes to."],
      example: { type: "table", title: "Past and to", headers: ["Clock", "Say it"], rows: [["3:12", "12 past 3"], ["3:48", "12 to 4"]], note: "60 − 48 = 12, so 3:48 is 12 to 4." },
    },
    {
      title: "Set the clock to the minute",
      lines: ["Set the hour first.", "Move the long hand round, counting in 5s.", "Then move 1 minute at a time to be exact."],
      example: { type: "steps", title: "To show 8:43", steps: ["Set the hour to 8.", "Count 5s to 40: the long hand points at 8.", "Move 3 more small marks to 43."] },
    },
    {
      title: "Solve a time problem",
      lines: ["Find the start time and the end time.", "Count on to the next o'clock, then on to the end.", "Add the jumps together."],
      example: { type: "steps", title: "From 3:48 to 4:15", steps: ["3:48 to 4:00 is 12 minutes.", "4:00 to 4:15 is 15 minutes.", "12 + 15 = 27 minutes."] },
    },
  ],
  "roman-numerals-and-24-hour-clocks": [
    {
      title: "Read a Roman-numeral clock",
      lines: ["Some clocks use Roman numerals instead of numbers.", "I is 1, V is 5 and X is 10.", "Read the hands just like a normal clock."],
      example: { type: "steps", title: "Roman numerals on a clock", steps: ["I before V or X takes 1 away: IV is 4, IX is 9.", "I after adds 1: VI is 6, XI is 11.", "XII sits at the top, where 12 goes."] },
    },
    {
      title: "Change am or pm to 24-hour",
      lines: ["am is morning, pm is afternoon and evening.", "For am, keep the hour and put a 0 in front if needed.", "For pm, add 12 to the hour."],
      example: { type: "table", title: "Morning and evening", headers: ["12-hour", "24-hour"], rows: [["8:20 am", "08:20"], ["8:20 pm", "20:20"]], note: "8 + 12 = 20, so 8:20 pm is 20:20." },
    },
    {
      title: "Read 24-hour as am or pm",
      lines: ["Hours 00 to 11 are am.", "Hours 12 to 23 are pm.", "If the hour is more than 12, take away 12."],
      example: { type: "steps", title: "What is 17:25?", steps: ["17 is more than 12, so it is pm.", "17 − 12 = 5.", "17:25 is 5:25 pm."], note: "12:30 stays 12:30 pm, just after noon." },
    },
    {
      title: "Set a Roman clock from 24-hour",
      lines: ["Change the 24-hour time into am or pm first.", "Set the hour, then move the long hand to the minute.", "Last, choose am or pm."],
      example: { type: "steps", title: "Show 14:37", steps: ["14 − 12 = 2, so it is 2:37 pm.", "Set the short hand to II.", "Move the long hand to 37 minutes.", "Choose pm."] },
    },
  ],
  "units-of-time-and-durations": [
    {
      title: "Recall time facts",
      lines: ["60 seconds make 1 minute.", "A year has 365 days. A leap year has 366.", "30 days has September, April, June and November."],
      example: { type: "table", title: "Facts to remember", headers: ["Time", "How long"], rows: [["1 minute", "60 seconds"], ["1 year", "365 days"], ["Leap year", "366 days"], ["September, April, June, November", "30 days"], ["February", "28 days, or 29 in a leap year"], ["All the other months", "31 days"]] },
    },
    {
      title: "Compare durations",
      lines: ["Change both times into the same unit.", "1 hour is 60 minutes. 1 minute is 60 seconds.", "Then compare the numbers and pick <, = or >."],
      example: { type: "equation", title: "1 hour 10 minutes or 65 minutes?", parts: ["70 minutes", ">", "65 minutes"], note: "1 hour 10 minutes is 70 minutes, so it is longer." },
    },
    {
      title: "Order durations",
      lines: ["Change every time into the same unit.", "Find the shortest one and put it first.", "Keep going until the longest is last."],
      example: { type: "table", title: "2 minutes, 100 seconds, 1 minute", headers: ["Time", "In seconds"], rows: [["1 minute", "60"], ["100 seconds", "100"], ["2 minutes", "120"]], note: "Shortest to longest: 1 minute, 100 seconds, 2 minutes." },
    },
    {
      title: "Calculate an elapsed time",
      lines: ["Find the start and the end on the timeline.", "Count on to the next o'clock first.", "Then count on to the end and add the jumps."],
      example: { type: "jumps", title: "From 13:45 to 14:20", terms: ["13:45", "14:00", "14:20"], note: "15 minutes + 20 minutes = 35 minutes." },
    },
  ],
};
