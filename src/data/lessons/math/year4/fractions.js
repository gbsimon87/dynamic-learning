/**
 * Bix's lessons for Year 4 Fractions (including decimals), one per challenge
 * slot. Each one teaches exactly what that challenge asks (see the builders in
 * src/data/challenges/year4Math/questions.js).
 */
export const FRACTIONS_LESSONS = {
  "equivalent-fraction-families": [
    {
      title: "Find the equal fraction",
      lines: ["Equivalent fractions are the same amount with different numbers.", "Multiply the top and bottom by the same number.", "If you only change one number, the amount changes."],
      example: { type: "equation", title: "Making 2/3 bigger numbers", parts: ["2/3", "=", "4/6", "=", "6/9"], note: "Times 2 gives 4/6. Times 3 gives 6/9." },
    },
    {
      title: "Spot the fraction family",
      lines: ["A fraction family is all the fractions worth the same.", "Check the top and bottom were both multiplied.", "Wrong answers often change just one number."],
      example: { type: "bar", title: "One family, three bars", bars: [{ parts: 2, shaded: 1, label: "1/2" }, { parts: 4, shaded: 2, label: "2/4" }, { parts: 8, shaded: 4, label: "4/8" }], note: "The shading stops in the same place." },
    },
    {
      title: "Shade an equal fraction",
      lines: ["The bar has more parts than the fraction's bottom number.", "Find how many bar parts make one of the fraction's parts.", "Multiply the top number by that, then shade."],
      example: { type: "bar", title: "Shade 3/4 on 8 parts", bars: [{ parts: 4, shaded: 3, label: "3/4" }, { parts: 8, shaded: 6, label: "6/8" }], note: "8 parts is 4 × 2, so shade 3 × 2 = 6." },
    },
    {
      title: "Count the coloured sections",
      lines: ["The strip has many equal sections.", "Divide the sections by the bottom number to find one part.", "Multiply by the top number to find how many are coloured."],
      example: { type: "steps", title: "2/5 of a 15-section strip", steps: ["15 ÷ 5 = 3, so one fifth is 3 sections.", "2 fifths is 2 × 3 = 6 sections.", "So 2/5 = 6/15."] },
    },
  ],
  "counting-in-hundredths": [
    {
      title: "Count up in hundredths",
      lines: ["A hundredth is 1 of 100 equal parts.", "Counting up, the top number grows by 1 each time.", "The bottom number stays 100."],
      example: { type: "jumps", title: "Counting up", terms: ["36/100", "37/100", "38/100", "39/100", "40/100"], step: "+1/100", note: "10 hundredths make 1 tenth." },
    },
    {
      title: "Count down in hundredths",
      lines: ["Counting down, the top number gets 1 smaller each time.", "The bottom number still stays 100.", "Check each gap is the same."],
      example: { type: "jumps", title: "Counting down", terms: ["62/100", "61/100", "60/100", "59/100", "58/100"], step: "−1/100", note: "After 60/100 comes 59/100." },
    },
    {
      title: "Order hundredths",
      lines: ["All the bottom numbers are 100.", "So just compare the top numbers.", "The smallest top number goes first."],
      example: { type: "equation", title: "Comparing hundredths", parts: ["24/100", "<", "29/100", "<", "34/100"], note: "24 is less than 29, and 29 is less than 34." },
    },
    {
      title: "Add more hundredths",
      lines: ["A strip of 100 squares shows hundredths.", "Each coloured square is 1 hundredth.", "Add the extra squares to the ones already coloured."],
      example: { type: "equation", title: "More squares coloured", parts: ["52/100", "+", "4/100", "=", "56/100"], note: "52 squares and 4 more is 56 hundredths." },
    },
  ],
  "fractions-of-quantities": [
    {
      title: "Find a unit fraction",
      lines: ["A unit fraction has 1 on top, like 1/4.", "Divide the amount by the bottom number.", "That gives you one equal part."],
      example: { type: "equation", title: "1/5 of 30", parts: ["30", "÷", "5", "=", "6"], note: "One fifth of 30 is 6." },
    },
    {
      title: "Find a non-unit fraction",
      lines: ["First divide by the bottom number to find one part.", "Then multiply by the top number.", "Your answer should be less than the whole amount."],
      example: { type: "steps", title: "3/4 of 28", steps: ["28 ÷ 4 = 7, so one quarter is 7.", "3 quarters is 3 × 7 = 21."] },
    },
    {
      title: "Build the fraction calculation",
      lines: ["Put the whole amount and the bottom number in brackets first.", "Then multiply by the top number.", "Use every tile, including the brackets."],
      example: { type: "equation", title: "2/3 of 18", parts: ["18", "÷", "3", "×", "2", "=", "12"], note: "Divide first, then multiply: (18 ÷ 3) × 2." },
    },
    {
      title: "Solve a fraction story",
      lines: ["Find the whole amount in the story.", "Divide by the bottom number, then multiply by the top.", "Check your answer makes sense for the story."],
      example: { type: "groups", title: "3/5 of 10 flowers", groups: [["🌷", "🌷"], ["🌷", "🌷"], ["🌷", "🌷"], ["🌱", "🌱"], ["🌱", "🌱"]], label: "10 flowers in 5 groups of 2, 3 groups picked", note: "3 groups of 2 is 6 flowers." },
    },
  ],
  "adding-and-subtracting-fractions": [
    {
      title: "Add or subtract the tops",
      lines: ["When the bottom numbers match, keep the bottom number.", "Add or subtract only the top numbers.", "The answer can be more than 1 whole."],
      example: { type: "equation", title: "Same bottom number", parts: ["3/8", "+", "4/8", "=", "7/8"], note: "3 + 4 = 7, and the eighths stay eighths." },
    },
    {
      title: "Calculate with fractions",
      lines: ["Check the sign: + or −.", "Work out the top numbers only.", "Never add the bottom numbers together."],
      example: { type: "equation", title: "Taking away fifths", parts: ["7/5", "−", "3/5", "=", "4/5"], note: "7 − 3 = 4, so the answer is 4/5." },
    },
    {
      title: "Build a fraction sum",
      lines: ["Put the tiles in order: fraction, sign, fraction, equals, answer.", "Every fraction has the same bottom number.", "Check the tops add or subtract correctly."],
      example: { type: "bar", title: "2/6 + 3/6 on a bar", bars: [{ parts: 6, shaded: 2, label: "2/6" }, { parts: 6, shaded: 3, label: "3/6" }, { parts: 6, shaded: 5, label: "5/6" }], note: "2 sixths and 3 sixths make 5 sixths." },
    },
    {
      title: "Solve a ribbon problem",
      lines: ["Joined on means add. Cut off means subtract.", "Work out the new top number.", "Type only the top number; the bottom stays the same."],
      example: { type: "steps", title: "A 9/10 m ribbon, 4/10 m cut off", steps: ["Cut off means subtract.", "9 − 4 = 5.", "The ribbon is 5/10 m, so type 5."] },
    },
  ],
  "tenths-and-hundredths-as-decimals": [
    {
      title: "Write tenths as decimals",
      lines: ["Tenths go in the first place after the decimal point.", "So 4/10 is written 0.4, or 0.40.", "The grid shows each tenth as a row of 10."],
      example: { type: "equation", title: "Tenths as decimals", parts: ["6/10", "=", "0.60"], note: "6 tenths fill 6 rows of the grid." },
    },
    {
      title: "Write hundredths as decimals",
      lines: ["Hundredths go in the second place after the decimal point.", "Split the top number into tens and ones.", "Tens become tenths and ones become hundredths."],
      example: { type: "table", title: "47/100 as a decimal", headers: ["Ones", "Tenths", "Hundredths"], rows: [["0", "4", "7"]], note: "47/100 is 0.47." },
    },
    {
      title: "Order decimals",
      lines: ["Line up the decimal points.", "Compare the tenths first, then the hundredths.", "Put the smallest first."],
      example: { type: "equation", title: "Smallest to largest", parts: ["0.28", "<", "0.31", "<", "0.35"], note: "2 tenths is less than 3 tenths." },
    },
    {
      title: "Metres as hundredths",
      lines: ["1 metre has 100 hundredths.", "Read the decimal digits after the point as hundredths.", "0.62 m is 62 hundredths of a metre."],
      example: { type: "equation", title: "Decimals and hundredths", parts: ["0.35", "=", "35/100"], note: "So 0.35 m is 35 hundredths of a metre." },
    },
  ],
  "decimal-equivalents-of-quarters-and-halves": [
    {
      title: "Learn the three key decimals",
      lines: ["1/4 is 0.25, 1/2 is 0.50 and 3/4 is 0.75.", "Think of £1 as 100p.", "A quarter of £1 is 25p."],
      example: { type: "bar", title: "Quarters of a whole", bars: [{ parts: 4, shaded: 1, label: "1/4 = 0.25" }, { parts: 4, shaded: 2, label: "2/4 = 0.50" }, { parts: 4, shaded: 3, label: "3/4 = 0.75" }] },
    },
    {
      title: "Name the decimal",
      lines: ["Look at the fraction on the picture.", "Count how many quarters are shaded.", "Each quarter adds 0.25."],
      example: { type: "jumps", title: "Counting in quarters", terms: ["0", "0.25", "0.50", "0.75", "1"], step: "+0.25", note: "4 quarters make 1 whole." },
    },
    {
      title: "Match fraction families",
      lines: ["Some fractions are quarters in disguise.", "Simplify the fraction to find the quarter it matches.", "Then match it to 0.25, 0.50 or 0.75."],
      example: { type: "equation", title: "Hidden quarters", parts: ["3/12", "=", "1/4", "=", "0.25"], note: "3/12 is the same as 1/4." },
    },
    {
      title: "Quarters of a pound",
      lines: ["£1 is 100 pence.", "Divide 100 by 4 to find 1 quarter.", "Multiply by the top number for more quarters."],
      example: { type: "equation", title: "1/4 of £1", parts: ["100", "÷", "4", "=", "25"], note: "1/4 of £1 is 25p." },
    },
  ],
  "dividing-by-10-and-100": [
    {
      title: "Divide by 10 or 100",
      lines: ["÷ 10 moves each digit one place to the right.", "÷ 100 moves each digit two places to the right.", "The number gets smaller, so check your answer is smaller."],
      example: { type: "equation", title: "Digits move right", parts: ["36", "÷", "10", "=", "3.6"], note: "And 36 ÷ 100 = 0.36." },
    },
    {
      title: "Find the value of a digit",
      lines: ["After dividing, put each digit in its column.", "Ones, then tenths, then hundredths.", "Write the digit's value, like 0.4 for 4 tenths."],
      example: { type: "table", title: "58 ÷ 10 = 5.8", headers: ["Ones", "Tenths", "Hundredths"], rows: [["5", "8", "0"]], note: "The 8 is in the tenths, so it is worth 0.8." },
    },
    {
      title: "Order the answers",
      lines: ["Every number is divided by the same amount.", "So the order stays the same as before dividing.", "Smallest starting number gives the smallest answer."],
      example: { type: "equation", title: "Same order after ÷ 10", parts: ["4.2", "<", "4.5", "<", "4.7"], note: "42 < 45 < 47, so 4.2 < 4.5 < 4.7." },
    },
    {
      title: "Share metres equally",
      lines: ["Sharing into equal lengths means dividing.", "Turn the answer into hundredths of a metre.", "1 metre is 100 hundredths."],
      example: { type: "steps", title: "6 m shared into 10 lengths", steps: ["6 ÷ 10 = 0.6 m.", "0.6 m is 60 hundredths of a metre."] },
    },
  ],
  "rounding-decimals": [
    {
      title: "Round to the nearest whole",
      lines: ["Look at the tenths digit after the point.", "5 or more rounds up to the next whole number.", "4 or less keeps the same whole number."],
      example: { type: "jumps", title: "Where is 3.7?", terms: ["3", "3.5", "4"], step: "+0.5", note: "3.7 is past 3.5, so it rounds to 4." },
    },
    {
      title: "Round on your own",
      lines: ["Find the two whole numbers it sits between.", "Check the tenths digit.", "Pick the whole number it is closer to."],
      example: { type: "steps", title: "Round 6.3", steps: ["6.3 is between 6 and 7.", "The tenths digit is 3.", "3 is less than 5, so it rounds to 6."] },
    },
    {
      title: "Sort by rounding",
      lines: ["Round each card to the nearest whole number.", "Put it in the box for that number.", "A tenths digit of 5 rounds up."],
      example: { type: "table", title: "Rounding to 2 or 3", headers: ["Decimal", "Rounds to"], rows: [["2.1", "2"], ["2.4", "2"], ["2.5", "3"], ["2.9", "3"]] },
    },
    {
      title: "Round a length",
      lines: ["A length like 5.6 m is between 2 whole metres.", "Use the tenths digit to round.", "Give the whole number of metres."],
      example: { type: "steps", title: "A rope is 7.5 m", steps: ["7.5 is between 7 and 8.", "The tenths digit is 5, so round up.", "It is about 8 m."] },
    },
  ],
  "comparing-and-ordering-decimals": [
    {
      title: "Choose <, > or =",
      lines: ["Compare the ones first.", "If they match, compare the tenths, then the hundredths.", "The arrow points to the smaller number."],
      example: { type: "equation", title: "Compare the tenths", parts: ["0.64", ">", "0.58"], note: "6 tenths is more than 5 tenths." },
    },
    {
      title: "Compare on your own",
      lines: ["Line up the digits by place.", "Find the first place where the digits are different.", "If every digit matches, use =."],
      example: { type: "equation", title: "Compare the hundredths", parts: ["0.43", "<", "0.47"], note: "The tenths match, so look at the hundredths." },
    },
    {
      title: "Order decimals",
      lines: ["All the numbers have 2 decimal places.", "Compare them like whole numbers of hundredths.", "Put the smallest first."],
      example: { type: "equation", title: "Smallest to largest", parts: ["0.36", "<", "0.39", "<", "0.41", "<", "0.44"], note: "36, 39, 41, 44 hundredths." },
    },
    {
      title: "Find the difference",
      lines: ["Turn each length into hundredths of a metre.", "Subtract the smaller from the larger.", "The answer is in hundredths."],
      example: { type: "equation", title: "0.52 m and 0.57 m", parts: ["57", "−", "52", "=", "5"], note: "The second is 5 hundredths of a metre longer." },
    },
  ],
  "fraction-and-decimal-problems": [
    {
      title: "Work out change in pence",
      lines: ["£5 is 500p.", "Write the price in pence too: £2.35 is 235p.", "Subtract the price from 500 to find the change."],
      example: { type: "column", title: "A £1.80 toy, paid with £5", top: 500, op: "−", bottom: 180, answer: 320, note: "The change is 320p." },
    },
    {
      title: "Solve money and length stories",
      lines: ["For money, change pounds into pence first.", "For length, 1 m is 100 cm.", "Half of a length means divide by 2."],
      example: { type: "steps", title: "Half of a 2.00 m ribbon is used", steps: ["2.00 m is 200 cm.", "200 ÷ 2 = 100.", "100 cm are left."] },
    },
    {
      title: "Build the change calculation",
      lines: ["Start with 500, the pence you paid.", "Take away the price in pence.", "The answer is your change."],
      example: { type: "equation", title: "A £3.45 book, paid with £5", parts: ["500", "−", "345", "=", "155"], note: "The change is 155p." },
    },
    {
      title: "Solve the word problem",
      lines: ["Read the story and find the numbers.", "Change £ to pence or m to cm.", "Then subtract or halve to find the answer."],
      example: { type: "steps", title: "A £2.60 pen, paid with £5", steps: ["£2.60 is 260p and £5 is 500p.", "500 − 260 = 240.", "The change is 240p."] },
    },
  ],
};
