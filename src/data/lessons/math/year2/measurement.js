/**
 * Bix's lessons for Year 2 Measurement, one per challenge slot. Each one
 * teaches exactly what that challenge asks (see the challenge files in
 * src/pages/skills/math/challenges/year2/<topic>/ and measurement.js).
 * Worked examples use numbers that are not in the challenge lists, so no
 * lesson gives away a question's answer.
 */
export const MEASUREMENT_LESSONS = {
  "measuring-length-and-height": [
    {
      title: "Read the ruler",
      lines: ["Start at 0 on the ruler.", "The numbered marks go up in 5s.", "Each small mark is 1 cm. Count on from a number."],
      example: { type: "jumps", title: "Counting the ruler marks", terms: ["0", "5", "10", "15"], step: "+5", note: "cm means centimetres. It tells us how long." },
    },
    {
      title: "Move the marker yourself",
      lines: ["Find the numbered mark just before your length.", "Then step on 1 cm at a time.", "Check the number shown before you press Check."],
      example: { type: "steps", title: "To show 14 cm", steps: ["Go to the 10 mark.", "Step on 4 more: 11, 12, 13, 14.", "The marker is on 14 cm."] },
    },
    {
      title: "Pick cm or m",
      lines: ["Small things are measured in centimetres, cm.", "Big things are measured in metres, m.", "1 m is about 1 big step."],
      example: { type: "table", title: "Which unit?", headers: ["Thing", "Unit"], rows: [["a crayon", "cm"], ["a hand", "cm"], ["a classroom", "m"], ["a tree", "m"]], note: "Can you hold it in your hand? Use cm." },
    },
    {
      title: "Solve length stories",
      lines: ["Together, taller or wider means add on.", "Cut off or how much longer means take away.", "100 cm make 1 m. Count metres in 100s."],
      example: { type: "column", title: "32 cm and 21 cm together", top: 32, op: "+", bottom: 21, answer: 53, note: "Together they are 53 cm long." },
    },
  ],
  "measuring-weight-and-volume": [
    {
      title: "Read the kitchen scale",
      lines: ["The scale starts at 0 g.", "Each numbered mark goes up 100 g.", "Read the number the pointer is on."],
      example: { type: "jumps", title: "Counting the scale in 100s", terms: ["0", "100", "200", "300"], step: "+100", note: "g means grams. It tells us how heavy." },
    },
    {
      title: "Read the measuring jug",
      lines: ["Read a jug from the bottom up.", "Each line goes up 100 ml.", "Look at the top of the water."],
      example: { type: "jumps", title: "Counting up the jug", terms: ["0", "100", "200", "300"], step: "+100", note: "ml means millilitres. It tells us how much." },
    },
    {
      title: "Fill the jug yourself",
      lines: ["The numbered lines go up in 100s.", "The small line halfway between is 50 ml more.", "Stop when the number shows your amount."],
      example: { type: "steps", title: "To fill to 550 ml", steps: ["Go up to the 500 line.", "Go up 1 more step to the small line.", "Now it shows 550 ml."] },
    },
    {
      title: "Solve weight and capacity stories",
      lines: ["1000 g make 1 kg. 1000 ml make 1 litre.", "More or altogether means add.", "Drink, pour out or left means take away."],
      example: { type: "column", title: "200 g and 350 g more", top: 200, op: "+", bottom: 350, answer: 550, note: "Now it weighs 550 g." },
    },
  ],
  "comparing-measurements": [
    {
      title: "Use < > or =",
      lines: ["Rulers, scales and jugs all work the same way.", "The open side faces the bigger amount.", "The same amount? Use =."],
      example: { type: "equation", title: "Which jug holds more?", parts: ["300 ml", "<", "500 ml"], note: "300 ml is less, so it opens to 500 ml." },
    },
    {
      title: "Check the units first",
      lines: ["Look at the units before the numbers.", "1 m is 100 cm. 1 kg is 1000 g.", "1 litre is 1000 ml. Then compare."],
      example: { type: "steps", title: "Compare 3 m and 250 cm", steps: ["3 m is 300 cm.", "300 is bigger than 250.", "So 3 m > 250 cm."] },
    },
    {
      title: "Put them in order",
      lines: ["Change them all to the same unit.", "Find the smallest. Put it first.", "Keep going until the biggest is last."],
      example: { type: "table", title: "Make the units match", headers: ["Measure", "In cm"], rows: [["4 m", "400 cm"], ["60 cm", "60 cm"], ["1 m", "100 cm"]], note: "Smallest first: 60 cm, 1 m, 4 m." },
    },
    {
      title: "How much more?",
      lines: ["How much longer or heavier? Take away.", "Twice as much means double it.", "Half as much means halve it."],
      example: { type: "equation", title: "How much longer is 70 cm than 25 cm?", parts: ["70", "−", "25", "=", "45"], note: "Take the smaller from the bigger." },
    },
  ],
  "measuring-temperature": [
    {
      title: "Read the thermometer",
      lines: ["°C tells us how hot or cold it is.", "The numbered marks go up in 10s.", "A small mark between them is 5 more."],
      example: { type: "jumps", title: "Counting up the thermometer", terms: ["0", "10", "20", "30"], step: "+10", note: "Read the number where the line stops." },
    },
    {
      title: "Set the thermometer",
      lines: ["Each small step is 5 degrees.", "Up is warmer. Down is colder.", "Count on in 5s from the number below."],
      example: { type: "steps", title: "To show 45 °C", steps: ["Go up to the 40 mark.", "Go up 1 more step of 5.", "Now it shows 45 °C."] },
    },
    {
      title: "Coldest or hottest first",
      lines: ["Read it: coldest first, or hottest first?", "The smallest number is the coldest.", "The biggest number is the hottest."],
      example: { type: "jumps", title: "Coldest first", terms: ["5 °C", "10 °C", "15 °C", "20 °C"], step: "+5", note: "Each one is 5 degrees warmer." },
    },
    {
      title: "Which temperature fits?",
      lines: ["Think: is it hot, warm or cold?", "Ice and snow are about 0 °C.", "Hot things have bigger numbers."],
      example: { type: "table", title: "Some temperatures", headers: ["Place", "About"], rows: [["a fridge", "5 °C"], ["a spring day", "15 °C"], ["your body", "37 °C"]], note: "Pick the number that feels right." },
    },
  ],
  "measuring-time": [
    {
      title: "Read the clock",
      lines: ["The short hand shows the hour.", "The long hand shows the minutes.", "Look where the long hand points."],
      example: { type: "table", title: "Where is the long hand?", headers: ["Long hand on", "We say"], rows: [["12", "o'clock"], ["3", "quarter past"], ["6", "half past"], ["9", "quarter to"]] },
    },
    {
      title: "Tell the time to 5 minutes",
      lines: ["Each number on the clock is 5 minutes.", "Before half past, say minutes past the hour.", "After half past, say minutes to the next hour."],
      example: { type: "jumps", title: "Count the numbers in 5s", terms: ["0", "5", "10", "15"], step: "+5", note: "Long hand on 2 means 10 minutes." },
    },
    {
      title: "Set the clock",
      lines: ["First set the hour you hear, at o'clock.", "Past times: move the long hand forward.", "To times: move the long hand back."],
      example: { type: "steps", title: "To show 20 to 4", steps: ["Set the clock to 4 o'clock.", "Move the long hand back 4 jumps of 5.", "The short hand moves back a little too."] },
    },
    {
      title: "How long does it last?",
      lines: ["60 minutes make 1 hour. 24 hours make 1 day.", "Count on from the start time to the end.", "Which lasted longer? Take the smaller away."],
      example: { type: "steps", title: "From 10 past 1 to half past 1", steps: ["Start at 10 past 1.", "Count on in 5s: 15, 20, 25, 30.", "4 jumps of 5 is 20 minutes."] },
    },
  ],
  "standard-units-of-money": [
    {
      title: "Write p and £",
      lines: ["Pence: the p goes after the number.", "Pounds: the £ goes in front of the number.", "100 pence make 1 pound."],
      example: { type: "table", title: "Money symbols", headers: ["Money", "Symbol", "Where it goes"], rows: [["pence", "p", "after"], ["pounds", "£", "in front"]], note: "So 7 pence is written 7p." },
    },
    {
      title: "Make the amount",
      lines: ["Start with the biggest coin that fits.", "Add smaller coins to fill the gap.", "Watch the total until it matches."],
      example: { type: "steps", title: "Make 37p", steps: ["Take 20p. The total is 20p.", "Add 10p. The total is 30p.", "Add 5p and 2p. The total is 37p."] },
    },
    {
      title: "Find a different way",
      lines: ["Any coins are fine if they add up.", "Swap 1 coin for smaller coins.", "20p is the same as 10p and 10p."],
      example: { type: "table", title: "2 ways to make 45p", headers: ["Way", "Coins"], rows: [["Way 1", "20p + 20p + 5p"], ["Way 2", "20p + 10p + 10p + 5p"]], note: "Same total, different coins." },
    },
    {
      title: "Add up the coins",
      lines: ["Add the biggest coins first.", "Then count on with the small ones.", "Write the total in pence."],
      example: { type: "equation", title: "50p + 10p + 5p + 1p", parts: ["50", "+", "10", "+", "5", "+", "1", "=", "66"], note: "Count on: 50, 60, 65, 66. That is 66p." },
    },
  ],
  "money-problems": [
    {
      title: "Add 2 prices",
      lines: ["Both or altogether means add.", "Add the tens, then the ones.", "The answer is money, so it ends in p."],
      example: { type: "column", title: "24p and 32p together", top: 24, op: "+", bottom: 32, answer: 56, note: "Both together cost 56p." },
    },
    {
      title: "Work out the change",
      lines: ["Change is the money you get back.", "Count on from the cost to what you paid.", "Pence stay in p. Pounds stay in £."],
      example: { type: "jumps", title: "Pay with £1 for a 40p toy", terms: ["40", "50", "60", "70", "80", "90", "100"], step: "+10", note: "£1 is 100p. 6 jumps of 10p. The change is 60p." },
    },
    {
      title: "Hand over the change",
      lines: ["First work out the change.", "Then tap coins that make that amount.", "Check the total matches the change."],
      example: { type: "steps", title: "Pay 50p for a 35p drink", steps: ["50p − 35p = 15p change.", "Tap 10p, then 5p.", "10p + 5p makes 15p."] },
    },
    {
      title: "Solve 2-step money stories",
      lines: ["Step 1: add up what you buy.", "Step 2: take that from the money you have.", "What is left is your change."],
      example: { type: "steps", title: "Buy 25p and 12p. Pay 50p.", steps: ["Add: 25p + 12p = 37p.", "Take away: 50p − 37p = 13p.", "The change is 13p."] },
    },
  ],
};
