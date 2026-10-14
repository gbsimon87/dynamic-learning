/**
 * Bix's lessons for Year 4 Fractions (including decimals), one per challenge
 * slot. Each one teaches exactly what that challenge asks (see the builders in
 * src/data/challenges/year4Math/builders/fractions.js); titles match its
 * TOPIC_TITLES without the full stop.
 */
export const FRACTIONS_LESSONS = {
  "equivalent-fraction-families": [
    {
      title: "Find the equal fraction",
      lines: ["Equivalent fractions are the same amount with different numbers.", "Multiply the top and bottom by the same number.", "If you only change one number, the amount changes."],
      example: { type: "equation", title: "Making 2/3 bigger numbers", parts: ["2/3", "=", "4/6", "=", "6/9"], note: "Times 2 gives 4/6. Times 3 gives 6/9." },
    },
    {
      title: "Fill the missing number",
      lines: ["Look at the pair of numbers you can see.", "Work out what they were multiplied by.", "Do the same to the other number to fill the gap."],
      example: { type: "steps", title: "3/4 = ?/12", steps: ["The bottom went from 4 to 12.", "4 × 3 = 12, so it was multiplied by 3.", "Do the same to the top: 3 × 3 = 9.", "So 3/4 = 9/12."] },
    },
    {
      title: "Shade an equal fraction",
      lines: ["The bar has more parts than the fraction's bottom number.", "Find how many bar parts make one of the fraction's parts.", "Multiply the top number by that, then shade."],
      example: { type: "bar", title: "Shade 3/4 on 8 parts", bars: [{ parts: 4, shaded: 3, label: "3/4" }, { parts: 8, shaded: 6, label: "6/8" }], note: "8 parts is 4 × 2, so shade 3 × 2 = 6." },
    },
    {
      title: "Match a friend's fraction",
      lines: ["Two things the same size can be split into different numbers of parts.", "To match, find an equal fraction with the new bottom number.", "The new top number is how many parts to do."],
      example: { type: "steps", title: "Tom paints 2/5 of his wall", steps: ["Leo's wall has 15 tiles.", "15 ÷ 5 = 3, so each fifth is 3 tiles.", "2 fifths is 2 × 3 = 6 tiles.", "So 2/5 = 6/15. Leo paints 6 tiles."] },
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
      lines: ["Put the whole amount ÷ the bottom number inside the brackets.", "Then multiply by the top number.", "Use every tile, including both brackets."],
      example: { type: "equation", title: "2/3 of 18", parts: ["18", "÷", "3", "×", "2", "=", "12"], note: "Divide first, then multiply: (18 ÷ 3) × 2." },
    },
    {
      title: "Solve a fraction story",
      lines: ["Find the whole amount in the story.", "Divide by the bottom number, then multiply by the top.", "Check your answer makes sense for the story."],
      example: { type: "groups", title: "3/5 of 10 marbles are blue", groups: [["🔵", "🔵"], ["🔵", "🔵"], ["🔵", "🔵"], ["⚪", "⚪"], ["⚪", "⚪"]], label: "10 marbles in 5 groups of 2, 3 groups blue", note: "3 groups of 2 is 6 blue marbles." },
    },
  ],
  "adding-and-subtracting-fractions": [
    {
      title: "Add or subtract the tops",
      lines: ["When the bottom numbers match, keep the bottom number.", "Add or subtract only the top numbers.", "The answer can be more than 1 whole."],
      example: { type: "equation", title: "Same bottom number", parts: ["3/8", "+", "4/8", "=", "7/8"], note: "3 + 4 = 7, and the eighths stay eighths." },
    },
    {
      title: "Find the missing fraction",
      lines: ["Compare the first fraction with the answer.", "For +, find how much was added. For −, find how much was taken.", "The missing fraction keeps the same bottom number."],
      example: { type: "steps", title: "5/6 − ? = 2/6", steps: ["5 sixths went down to 2 sixths.", "5 − 2 = 3, so 3 sixths were taken.", "The missing fraction is 3/6."] },
    },
    {
      title: "Build a fraction sum",
      lines: ["Put the tiles in order: fraction, sign, fraction, equals, answer.", "Every fraction has the same bottom number.", "Check the tops add or subtract correctly."],
      example: { type: "bar", title: "2/6 + 3/6 on a bar", bars: [{ parts: 6, shaded: 2, label: "2/6" }, { parts: 6, shaded: 3, label: "3/6" }, { parts: 6, shaded: 5, label: "5/6" }], note: "2 sixths and 3 sixths make 5 sixths." },
    },
    {
      title: "Solve a ribbon or jug problem",
      lines: ["Joined on or poured in means add.", "Cut off or poured out means subtract.", "Choose the whole fraction; the bottom number stays the same."],
      example: { type: "steps", title: "A 9/10 m ribbon, 4/10 m cut off", steps: ["Cut off means subtract.", "9 − 4 = 5, and tenths stay tenths.", "The ribbon is now 5/10 m long."] },
    },
  ],
  "tenths-and-hundredths-as-decimals": [
    {
      title: "Write tenths as decimals",
      lines: ["Tenths go in the first place after the decimal point.", "So 4/10 is written 0.4.", "The grid shows each tenth as a row of 10."],
      example: { type: "equation", title: "Tenths as decimals", parts: ["6/10", "=", "0.6"], note: "6 tenths fill 6 rows of the grid." },
    },
    {
      title: "Write hundredths as decimals",
      lines: ["Hundredths go in the second place after the decimal point.", "Split the top number into tens and ones.", "Tens become tenths and ones become hundredths."],
      example: { type: "table", title: "47/100 as a decimal", headers: ["Ones", "Tenths", "Hundredths"], rows: [["0", "4", "7"]], note: "4 tenths and 7 hundredths is 0.47." },
    },
    {
      title: "Order fractions and decimals",
      lines: ["Some cards are decimals and some are hundredths.", "Change each decimal into hundredths: 0.35 is 35/100.", "Then put the top numbers in order."],
      example: { type: "equation", title: "Smallest to largest", parts: ["28/100", "<", "0.31", "<", "35/100", "<", "0.37"], note: "28, 31, 35 and 37 hundredths." },
    },
    {
      title: "Metres as hundredths",
      lines: ["1 metre has 100 hundredths.", "Read the digits after the point as hundredths.", "0.62 m is 62 hundredths of a metre."],
      example: { type: "equation", title: "Decimals and hundredths", parts: ["0.35", "=", "35/100"], note: "So 0.35 m is 35 hundredths of a metre." },
    },
  ],
  "decimal-equivalents-of-quarters-and-halves": [
    {
      title: "Learn the key decimals",
      lines: ["1/4 is 0.25, 1/2 is 0.5 and 3/4 is 0.75.", "2/4 is the same as 1/2, so it is 0.5 too.", "On a 100 grid, 1/4 is 25 squares."],
      example: { type: "bar", title: "Quarters of a whole", bars: [{ parts: 4, shaded: 1, label: "1/4 = 0.25" }, { parts: 4, shaded: 2, label: "2/4 = 0.5" }, { parts: 4, shaded: 3, label: "3/4 = 0.75" }] },
    },
    {
      title: "Spot quarters and halves",
      lines: ["A whole number and a quarter: 2 1/4 is 2.25.", "Money works the same way: 3/4 of £1 is £0.75.", "Lengths and weights too: 1/2 kg is 0.5 kg."],
      example: { type: "jumps", title: "Counting in quarters", terms: ["2", "2.25", "2.5", "2.75", "3"], step: "+0.25", note: "2 1/2 is 2.5 and 2 3/4 is 2.75." },
    },
    {
      title: "Match fraction families",
      lines: ["Some fractions are quarters or halves in disguise.", "Simplify the fraction to find the one it matches.", "Then match it to 0.25, 0.5 or 0.75."],
      example: { type: "equation", title: "Hidden quarters", parts: ["3/12", "=", "1/4", "=", "0.25"], note: "3/12 is the same as 1/4." },
    },
    {
      title: "Change units with quarters",
      lines: ["£1 is 100p, 1 m is 100 cm, 1 kg is 1000 g.", "A quarter of 100 is 25. A quarter of 1000 is 250.", "Multiply by the top number for more quarters."],
      example: { type: "steps", title: "2 3/4 m in centimetres", steps: ["2 m is 200 cm.", "1/4 m is 25 cm, so 3/4 m is 75 cm.", "200 + 75 = 275 cm."] },
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
      example: { type: "table", title: "58 ÷ 100 = 0.58", headers: ["Ones", "Tenths", "Hundredths"], rows: [["0", "5", "8"]], note: "The 5 is worth 0.5 and the 8 is worth 0.08." },
    },
    {
      title: "Order the mixed answers",
      lines: ["Some cards divide by 10 and some by 100.", "Work out every answer before you order them.", "A bigger starting number can give a smaller answer."],
      example: { type: "equation", title: "Work them out first", parts: ["45", "÷", "100", "<", "6", "÷", "10"], note: "0.45 is less than 0.6." },
    },
    {
      title: "Share money and rope",
      lines: ["Sharing equally means dividing.", "£1 is 100p, so £3 ÷ 10 is 30p.", "1 m is 100 cm, so 7 m ÷ 100 is 7 cm."],
      example: { type: "steps", title: "£6 shared between 10 friends", steps: ["£6 is 600p.", "600 ÷ 10 = 60.", "Each friend gets 60p."] },
    },
  ],
  "rounding-decimals": [
    {
      title: "Round to the nearest whole",
      lines: ["Look at the tenths digit after the point.", "5 or more rounds up to the next whole number.", "4 or less keeps the same whole number."],
      example: { type: "jumps", title: "Where is 3.7?", terms: ["3", "3.5", "4"], step: "+0.5", note: "3.7 is past 3.5, so it rounds to 4." },
    },
    {
      title: "Find a number that rounds",
      lines: ["Work backwards from the whole number.", "Numbers that round to 6 go from 5.5 up to 6.4.", "Check each choice with the tenths digit."],
      example: { type: "table", title: "Which round to 6?", headers: ["Decimal", "Rounds to"], rows: [["5.4", "5"], ["5.8", "6"], ["6.3", "6"], ["6.7", "7"]], note: "5.8 and 6.3 both round to 6." },
    },
    {
      title: "Sort by rounding",
      lines: ["Round each card to the nearest whole number.", "Put it in the box for that number.", "A tenths digit of 5 rounds up."],
      example: { type: "table", title: "Rounding to 2 or 3", headers: ["Decimal", "Rounds to"], rows: [["1.8", "2"], ["2.4", "2"], ["2.5", "3"], ["3.1", "3"]] },
    },
    {
      title: "Round a measurement",
      lines: ["A length like 5.6 m is between 2 whole metres.", "Use the tenths digit to round.", "Give the whole number of metres, kilograms or litres."],
      example: { type: "steps", title: "A puppy weighs 7.5 kg", steps: ["7.5 is between 7 and 8.", "The tenths digit is 5, so round up.", "It is about 8 kg."] },
    },
  ],
  "comparing-and-ordering-decimals": [
    {
      title: "Compare tenths with a sign",
      lines: ["Compare the ones first.", "If they match, compare the tenths.", "The open side of the sign faces the bigger number."],
      example: { type: "equation", title: "Compare the tenths", parts: ["4.6", ">", "4.4"], note: "6 tenths is more than 4 tenths." },
    },
    {
      title: "Compare decimals and hundredths",
      lines: ["One number is a decimal, one is a fraction.", "Change the decimal into hundredths: 0.43 is 43/100.", "Now compare the top numbers. Use = if they match."],
      example: { type: "equation", title: "Make them look the same", parts: ["0.43", "<", "47/100"], note: "43 hundredths is less than 47 hundredths." },
    },
    {
      title: "Order decimals",
      lines: ["All the numbers have 2 decimal places.", "Compare the tenths first, then the hundredths.", "Put the smallest first."],
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
      title: "Use part of a ribbon",
      lines: ["Change metres to centimetres: 2.36 m is 236 cm.", "Half means divide by 2.", "A quarter means divide by 4."],
      example: { type: "steps", title: "A quarter of a 1.32 m ribbon", steps: ["1.32 m is 132 cm.", "132 ÷ 4 = 33.", "33 cm are used."] },
    },
    {
      title: "Build the total cost",
      lines: ["Change both prices into pence.", "Add the two prices together.", "Build it: price, plus, price, equals, total."],
      example: { type: "equation", title: "A £1.25 drink and a £2.40 sandwich", parts: ["125", "+", "240", "=", "365"], note: "The total is 365p, which is £3.65." },
    },
    {
      title: "Solve a two-step problem",
      lines: ["Change pounds into pence, or metres into centimetres.", "Do the first step, then use that answer.", "Read the question again to check what it asks."],
      example: { type: "steps", title: "A 3.46 m ribbon, 1.24 m cut off", steps: ["346 − 124 = 222 cm are left.", "The rest is shared between 2 friends.", "222 ÷ 2 = 111 cm each."] },
    },
  ],
};
