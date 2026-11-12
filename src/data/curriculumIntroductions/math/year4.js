// Year 4 Maths introductions: subject, quest and topic purpose screens.
// Method teaching stays in each challenge's LessonFrame (src/data/lessons/math/year4/).
import { defineIntroductions } from "../../../../shared/curriculumJourneyAuthoring.js";

const eq = (title, parts, alt) => ({ renderer: "lesson", alt, data: { type: "equation", title, parts } });
const jumps = (title, terms, step, alt) => ({ renderer: "lesson", alt, data: { type: "jumps", title, terms, step } });
const tbl = (title, headers, rows, alt) => ({ renderer: "lesson", alt, data: { type: "table", title, headers, rows } });
const steps = (title, list, alt) => ({ renderer: "lesson", alt, data: { type: "steps", title, steps: list } });
const dia = (title, kind, fields, label) => ({ renderer: "lesson", alt: label, data: { type: "diagram", kind, title, ...fields, label } });

export default defineIntroductions({
  year: 4, subject: "math",
  subjectIntro: {
    title: "Welcome to Year 4 Maths",
    learn: ["Work with numbers beyond 1000, negative numbers and Roman numerals.", "Know all your times tables up to 12 × 12.", "Explore decimals, area, coordinates and graphs."],
    use: "Maths helps you handle money, read temperatures, measure things and make sense of information.",
    ex: "In 3462, the 3 is worth 3000, the 4 is worth 400, the 6 is worth 60 and the 2 is worth 2.",
    model: eq("Building 3462", ["3000", "+", "400", "+", "60", "+", "2", "=", "3462"], "3000 plus 400 plus 60 plus 2 equals 3462."),
  },
  quests: {
    "number---number-and-place-value": {
      intro: {
        title: "Bigger numbers",
        learn: ["Count in steps of 6, 7, 9, 25 and 1000, and count below zero.", "Know what each digit in a 4-digit number is worth.", "Compare, order, round and read Roman numerals."],
        use: "Big numbers are in populations, prices, distances and temperatures.",
        ex: "A town has 3462 people. To the nearest 100, that is about 3500.",
        model: tbl("Rounding 3462", ["Number", "Nearest 100"], [["3462", "3500"]], "3462 rounded to the nearest 100 is 3500."),
      },
      topics: {
        "counting-in-multiples-of-6-7-9-25-and-1000": {
          title: "Counting in steps",
          learn: ["Count in steps of 6, 7, 9, 25 and 1000.", "Find the rule from the numbers you can see."],
          use: "Count in 25s to add up coins, or in 7s to count the days in a number of weeks.",
          ex: "Counting in 25s: 25, 50, 75, 100, 125.",
          model: jumps("Counting in 25s", ["25", "50", "75", "100", "125"], "+25", "A count from 25 to 125 in jumps of 25."),
        },
        "finding-1000-more-or-less": {
          title: "1000 more or less",
          learn: ["Find the number that is 1000 more or 1000 less.", "Change only the thousands digit."],
          use: "Work out how a town's population changes when 1000 people move in.",
          ex: "1000 more than 4730 is 5730.",
          model: jumps("1000 more each time", ["3730", "4730", "5730"], "+1000", "A count from 3730 to 5730 in jumps of 1000."),
        },
        "counting-backwards-through-zero": {
          title: "Counting below zero",
          learn: ["Count back past 0 to negative numbers.", "Use temperatures to see how negative numbers work."],
          use: "Read a freezing temperature such as −3°C on a winter day.",
          ex: "Counting back in 2s: 4, 2, 0, −2, −4.",
          model: jumps("Counting back past zero", ["4", "2", "0", "−2", "−4"], "−2", "A count back from 4 to negative 4 in jumps of 2."),
        },
        "place-value-in-4-digit-numbers": {
          title: "Thousands, hundreds, tens and ones",
          learn: ["Know what each digit in a 4-digit number is worth.", "Split a number into its parts."],
          use: "Read the miles on a car or the number of people at a match.",
          ex: "In 5208, the 5 is worth 5000 and the 2 is worth 200.",
          model: eq("Splitting 5208", ["5000", "+", "200", "+", "0", "+", "8", "=", "5208"], "5000 plus 200 plus 0 plus 8 equals 5208."),
        },
        "ordering-and-comparing-numbers-beyond-1000": {
          title: "Comparing big numbers",
          learn: ["Compare the thousands first, then the hundreds, tens and ones.", "Order numbers and use < and >."],
          use: "Find which town is biggest, or which car has done the most miles.",
          ex: "Compare 4820 and 4280. The thousands match, so the hundreds decide: 8 hundreds is more than 2.",
          model: eq("Comparing 4820 and 4280", ["4820", ">", "4280"], "4820 is greater than 4280."),
        },
        "representing-and-estimating-numbers": {
          title: "Number lines and estimates",
          learn: ["Find the halfway number on a number line.", "Estimate where a number sits."],
          use: "Guess a distance on a road, or a position on a ruler.",
          ex: "Halfway between 2000 and 3000 is 2500.",
          model: jumps("Halfway", ["2000", "2500", "3000"], "+500", "A number line from 2000 to 3000 with 2500 halfway."),
        },
        "rounding-to-10-100-and-1000": {
          title: "Rounding",
          learn: ["Round to the nearest 10, 100 or 1000.", "Look at the digit to the right. 5 or more rounds up."],
          use: "Say that a crowd was about 3000 instead of an exact, hard-to-say number.",
          ex: "3462 rounds to 3460, 3500 and 3000.",
          model: tbl("Rounding 3462", ["Round to the nearest", "Answer"], [["10", "3460"], ["100", "3500"], ["1000", "3000"]], "3462 rounds to 3460 to the nearest 10, 3500 to the nearest 100 and 3000 to the nearest 1000."),
        },
        "place-value-problems": {
          title: "Place value puzzles",
          learn: ["Solve problems about thousands, hundreds, tens and ones.", "Exchange 10 of one place for 1 of the next place."],
          use: "Work out the stock in a shop that sells boxes, packs and single things.",
          ex: "2 boxes of 1000 and 3 packs of 100 make 2300.",
          model: eq("Boxes and packs", ["2000", "+", "300", "=", "2300"], "2000 plus 300 equals 2300."),
        },
        "roman-numerals-to-100": {
          title: "Roman numerals",
          learn: ["Read Roman numerals from I to C.", "Know that the Romans had no zero and no place value."],
          use: "Read the date on an old building, or the hours on a clock face.",
          ex: "XLVII is 40 + 5 + 2 = 47, because XL is 40.",
          model: tbl("Roman letters", ["Letter", "Value"], [["I", "1"], ["V", "5"], ["X", "10"], ["L", "50"], ["C", "100"]], "I is 1, V is 5, X is 10, L is 50 and C is 100."),
        },
      },
    },
    "number---addition-and-subtraction": {
      intro: {
        title: "Adding and subtracting big numbers",
        learn: ["Add and subtract numbers with up to 4 digits in columns.", "Estimate and check with the inverse.", "Solve two-step problems."],
        use: "Find totals, differences and change with big amounts, like ticket sales or distances.",
        ex: "3456 + 2175 = 5631.",
        model: eq("Adding 3456 and 2175", ["3456", "+", "2175", "=", "5631"], "3456 plus 2175 equals 5631."),
      },
      topics: {
        "column-addition-and-subtraction": {
          title: "Columns with 4 digits",
          learn: ["Line up thousands, hundreds, tens and ones.", "Exchange when a column is too big or too small."],
          use: "Add the crowds at two matches, or find how many tickets are left.",
          ex: "5231 − 1478 = 3753.",
          model: { renderer: "lesson", alt: "5231 take away 1478 in columns equals 3753.", data: { type: "column", title: "Subtracting in columns", top: 5231, bottom: 1478, op: "−", answer: 3753 } },
        },
        "estimating-and-checking-calculations": {
          title: "Estimate and check",
          learn: ["Round first to estimate the answer.", "Use the inverse to check."],
          use: "Spot a mistake before you give the wrong answer.",
          ex: "4980 + 3020 is about 5000 + 3000 = 8000. Check: 8000 − 3020 = 4980.",
          model: steps("Estimate, then check", ["Round: 4980 is about 5000 and 3020 is about 3000.", "Estimate: 5000 + 3000 = 8000.", "Exact: 4980 + 3020 = 8000.", "Check: 8000 − 3020 = 4980."], "Round to estimate 8000, work out 8000, then check with 8000 take away 3020 to get 4980."),
        },
        "two-step-addition-and-subtraction-problems": {
          title: "Two-step stories",
          learn: ["Work out which operations to use and why.", "Do one step, then use the answer in the next step."],
          use: "Work out how many people are at a match after some arrive and some leave.",
          ex: "A shop has 450 pens. It sells 120, then gets 300 more.",
          model: steps("Two steps", ["450 − 120 = 330.", "330 + 300 = 630."], "450 take away 120 is 330. Then 330 plus 300 is 630."),
        },
      },
    },
    "number---multiplication-and-division": {
      intro: {
        title: "Times tables and written methods",
        learn: ["Know all the times tables up to 12 × 12.", "Use factors and place value to multiply in your head.", "Multiply 2-digit and 3-digit numbers on paper."],
        use: "Times tables help with money, measures, packing and planning.",
        ex: "6 × 8 = 48, so 60 × 8 = 480.",
        model: steps("Using a known fact", ["6 × 8 = 48.", "60 is 10 times 6.", "So 60 × 8 is 10 times 48, which is 480."], "6 times 8 is 48. 60 is 10 times 6, so 60 times 8 is 480."),
      },
      topics: {
        "multiplication-and-division-facts-to-12": {
          title: "Tables to 12 × 12",
          learn: ["Know the multiplication facts up to 12 × 12.", "Use them to divide too."],
          use: "Work out how many eggs are in 9 boxes of 12.",
          ex: "9 × 12 = 108.",
          model: eq("9 boxes of 12", ["9", "×", "12", "=", "108"], "9 times 12 equals 108."),
        },
        "mental-multiplication-and-division": {
          title: "Quick multiplying in your head",
          learn: ["Use a known fact and place value, like 3 × 4 to find 30 × 4.", "Multiply by 0 and 1, and multiply three numbers."],
          use: "Work out prices and totals without a pencil.",
          ex: "3 × 4 = 12, so 30 × 4 = 120.",
          model: steps("Using a known fact", ["3 × 4 = 12.", "30 is 10 times 3.", "So 30 × 4 = 120."], "3 times 4 is 12, so 30 times 4 is 120."),
        },
        "factor-pairs-and-commutativity": {
          title: "Factor pairs",
          learn: ["A factor pair multiplies to make a number.", "Swap the numbers in a multiplication: the answer stays the same."],
          use: "Set out chairs in equal rows.",
          ex: "12 chairs can go in 1 row of 12, 2 rows of 6 or 3 rows of 4.",
          model: tbl("Factor pairs of 12", ["Rows", "Chairs in each row"], [["1", "12"], ["2", "6"], ["3", "4"]], "1 times 12, 2 times 6 and 3 times 4 all make 12."),
        },
        "written-multiplication": {
          title: "Multiplying on paper",
          learn: ["Multiply a 2-digit or 3-digit number by 1 digit.", "Multiply the ones first and exchange when you need to."],
          use: "Find the cost of 6 tickets, or the total in 4 boxes.",
          ex: "34 × 6 = 204.",
          model: steps("Splitting 34 × 6", ["30 × 6 = 180.", "4 × 6 = 24.", "180 + 24 = 204."], "30 times 6 is 180, 4 times 6 is 24, and 180 plus 24 is 204."),
        },
        "scaling-and-correspondence-problems": {
          title: "Choices and times as many",
          learn: ["Count choices: each one goes with every other one.", "Solve times-as problems and two-step problems."],
          use: "Work out how many outfits or meals you can make.",
          ex: "4 shirts and 6 pairs of shorts make 4 × 6 = 24 outfits.",
          model: eq("Counting choices", ["4", "×", "6", "=", "24"], "4 times 6 equals 24."),
        },
      },
    },
    "number---fractions-including-decimals": {
      intro: {
        title: "Fractions and decimals",
        learn: ["Find equal fractions and count in hundredths.", "Write fractions as decimals.", "Compare, round and solve fraction and decimal problems."],
        use: "Fractions and decimals show up in money, measures and sharing.",
        ex: "One quarter is 0.25, which is the same as 25 hundredths.",
        model: eq("One quarter", ["1/4", "=", "0.25", "=", "25/100"], "One quarter equals 0.25 and equals 25 hundredths."),
      },
      topics: {
        "equivalent-fraction-families": {
          title: "Equal fractions",
          learn: ["Different fractions can show the same amount.", "Multiply the top and bottom by the same number."],
          use: "Know that 3 out of 6 equal parts is the same as one half.",
          ex: "1/3 = 2/6 = 3/9.",
          model: eq("A family of fractions", ["1/3", "=", "2/6", "=", "3/9"], "One third equals two sixths and equals three ninths."),
        },
        "counting-in-hundredths": {
          title: "Hundredths",
          learn: ["A hundredth is 1 of 100 equal parts.", "Count up and down in hundredths."],
          use: "Read tiny parts of a metre or a pound.",
          ex: "Counting in hundredths: 1/100, 2/100, 3/100.",
          model: jumps("Counting in hundredths", ["1/100", "2/100", "3/100", "4/100"], "+1/100", "A count in hundredths: 1, 2, 3 and 4 hundredths."),
        },
        "fractions-of-quantities": {
          title: "Fractions of amounts",
          learn: ["Divide the amount by the bottom number to find one part.", "Multiply by the top number to find more parts."],
          use: "Find 3/4 of a bag of 20 sweets.",
          ex: "3/4 of 20: 20 ÷ 4 = 5, then 5 × 3 = 15.",
          model: steps("3/4 of 20", ["Divide by the bottom number: 20 ÷ 4 = 5.", "Multiply by the top number: 5 × 3 = 15."], "20 divided by 4 is 5. Then 5 times 3 is 15."),
        },
        "adding-and-subtracting-fractions": {
          title: "Add and subtract fractions",
          learn: ["Add or take away the top numbers.", "Keep the bottom number the same."],
          use: "Work out how much juice is left in a jug.",
          ex: "5/8 + 7/8 = 12/8, which is more than 1 whole.",
          model: eq("Adding eighths", ["5/8", "+", "7/8", "=", "12/8"], "5 eighths plus 7 eighths equals 12 eighths."),
        },
        "tenths-and-hundredths-as-decimals": {
          title: "Fractions as decimals",
          learn: ["Write tenths and hundredths as decimals.", "The first place after the point is tenths. The second is hundredths."],
          use: "Read prices and measures such as £0.35 or 0.7 m.",
          ex: "4/10 = 0.4 and 35/100 = 0.35.",
          model: tbl("Fractions and decimals", ["Fraction", "Decimal"], [["4/10", "0.4"], ["35/100", "0.35"]], "4 tenths is 0.4. 35 hundredths is 0.35."),
        },
        "decimal-equivalents-of-quarters-and-halves": {
          title: "Halves and quarters as decimals",
          learn: ["Know that 1/2 = 0.5, 1/4 = 0.25 and 3/4 = 0.75.", "Use them with money and measures."],
          use: "Half of £1 is 50p, which is £0.50.",
          ex: "3/4 of £1 is 75p, or £0.75.",
          model: tbl("Key decimals", ["Fraction", "Decimal"], [["1/2", "0.5"], ["1/4", "0.25"], ["3/4", "0.75"]], "One half is 0.5, one quarter is 0.25 and three quarters is 0.75."),
        },
        "dividing-by-10-and-100": {
          title: "Dividing by 10 and 100",
          learn: ["Dividing by 10 moves each digit one place to the right.", "Dividing by 100 moves each digit two places."],
          use: "Share £3 between 10 friends, or cut a length of rope into 100 equal parts.",
          ex: "6 ÷ 10 = 0.6 and 6 ÷ 100 = 0.06.",
          model: steps("Dividing 6", ["6 ÷ 10 = 0.6, which is 6 tenths.", "6 ÷ 100 = 0.06, which is 6 hundredths."], "6 divided by 10 is 0.6, or 6 tenths. 6 divided by 100 is 0.06, or 6 hundredths."),
        },
        "rounding-decimals": {
          title: "Rounding decimals",
          learn: ["Round a number with 1 decimal place to the nearest whole number.", "5 tenths or more rounds up."],
          use: "Say that a length of 5.6 m is about 6 m.",
          ex: "5.6 rounds up to 6. 5.4 rounds down to 5.",
          model: tbl("Rounding to a whole number", ["Number", "Rounded"], [["5.6", "6"], ["5.4", "5"]], "5.6 rounds to 6. 5.4 rounds to 5."),
        },
        "comparing-and-ordering-decimals": {
          title: "Comparing decimals",
          learn: ["Compare the ones, then the tenths, then the hundredths.", "Order decimals with the same number of decimal places."],
          use: "Find the longest jump or the cheapest price.",
          ex: "0.43 and 0.38: 4 tenths is more than 3 tenths, so 0.43 is bigger.",
          model: eq("Comparing decimals", ["0.43", ">", "0.38"], "0.43 is greater than 0.38."),
        },
        "fraction-and-decimal-problems": {
          title: "Money and measures",
          learn: ["Solve problems with money and measures.", "Change pounds to pence, or metres to centimetres, first."],
          use: "Work out your change from £5, or how much ribbon you need.",
          ex: "£5 − £2.35: 500p − 235p = 265p, which is £2.65.",
          model: steps("Finding change", ["£5 is 500p and £2.35 is 235p.", "500 − 235 = 265.", "The change is 265p, or £2.65."], "500 pence take away 235 pence is 265 pence, which is 2 pounds 65."),
        },
      },
    },
    measurement: {
      intro: {
        title: "Measures, area and time",
        learn: ["Change between units of measure.", "Find perimeter and area.", "Work with money and with 12-hour and 24-hour time."],
        use: "Measuring helps with cooking, building, shopping and planning your day.",
        ex: "2 km is 2000 m.",
        model: tbl("Units that match", ["Big unit", "Same as"], [["1 km", "1000 m"], ["1 m", "100 cm"], ["1 hour", "60 minutes"]], "1 kilometre is 1000 metres. 1 metre is 100 centimetres. 1 hour is 60 minutes."),
      },
      topics: {
        "converting-units-of-measure": {
          title: "Changing units",
          learn: ["Big units to small units: multiply.", "Small units to big units: divide."],
          use: "Know that a 3 km walk is 3000 m.",
          ex: "3 km = 3 × 1000 = 3000 m.",
          model: eq("Kilometres to metres", ["3", "×", "1000", "=", "3000"], "3 times 1000 equals 3000."),
        },
        "perimeter-of-rectilinear-shapes": {
          title: "Perimeter of shapes",
          learn: ["Add all the outside edges.", "Find any missing sides first."],
          use: "Work out the fence round a garden.",
          ex: "A 6 m by 4 m rectangle has a perimeter of 6 + 4 + 6 + 4 = 20 m.",
          model: dia("A 6 m by 4 m rectangle", "rectangle", { width: 6, height: 4, unit: "m" }, "A rectangle 6 metres wide and 4 metres high."),
        },
        "area-by-counting-squares": {
          title: "Area",
          learn: ["Area is the space inside a shape.", "Count the squares, or multiply the rows by the columns."],
          use: "Work out how many tiles cover a floor.",
          ex: "A rectangle 4 squares wide and 3 squares high covers 12 squares.",
          model: dia("A 4 by 3 rectangle", "rectangle", { width: 4, height: 3, unit: "squares", cells: true }, "A rectangle 4 squares wide and 3 squares high, split into unit squares."),
        },
        "measures-and-money": {
          title: "Measures and money",
          learn: ["Compare and estimate measures and money.", "Change to the same unit first."],
          use: "Check you have enough money, or whether a parcel is light enough.",
          ex: "£1.50 is 150p, and 2 m is 200 cm.",
          model: tbl("Same amounts", ["Amount", "Same as"], [["£1.50", "150p"], ["2 m", "200 cm"]], "£1.50 is 150 pence. 2 metres is 200 centimetres."),
        },
        "analogue-and-digital-time": {
          title: "Analogue and digital time",
          learn: ["Read and write the time on 12-hour and 24-hour clocks.", "Change between them."],
          use: "Read a train timetable.",
          ex: "4:15 pm is 16:15 in 24-hour time.",
          model: tbl("Two ways to write the time", ["12-hour", "24-hour"], [["4:15 pm", "16:15"], ["12:15 am", "00:15"]], "4:15 pm is 16:15. 12:15 am is 00:15."),
        },
        "time-conversion-problems": {
          title: "Changing units of time",
          learn: ["Know 60 seconds in a minute and 60 minutes in an hour.", "Know 7 days in a week and 12 months in a year."],
          use: "Work out how long a film lasts in minutes.",
          ex: "2 hours is 2 × 60 = 120 minutes.",
          model: eq("Hours to minutes", ["2", "×", "60", "=", "120"], "2 times 60 equals 120."),
        },
      },
    },
    "geometry-properties-of-shapes": {
      intro: {
        title: "Shapes, angles and symmetry",
        learn: ["Name and sort triangles and four-sided shapes.", "Compare angles.", "Find and complete lines of symmetry."],
        use: "Shapes and symmetry are in logos, tiles, buildings and nature.",
        ex: "A square has 4 equal sides and 4 right angles.",
        model: dia("A square", "polygon", { points: [[110, 40], [250, 40], [250, 180], [110, 180]], caption: "4 equal sides, 4 right angles" }, "A square with 4 equal sides and 4 right angles."),
      },
      topics: {
        "classifying-triangles-and-quadrilaterals": {
          title: "Naming shapes",
          learn: ["Sort triangles and four-sided shapes by their sides and angles.", "Use names such as rectangle, rhombus and parallelogram."],
          use: "Describe a shape clearly so a friend can draw it.",
          ex: "A rhombus has 4 equal sides. A square has 4 equal sides and 4 right angles.",
          model: tbl("Four-sided shapes", ["Shape", "Key fact"], [["Square", "4 equal sides and 4 right angles"], ["Rectangle", "Opposite sides equal, 4 right angles"], ["Rhombus", "4 equal sides"]], "A square has 4 equal sides and 4 right angles. A rectangle has equal opposite sides and 4 right angles. A rhombus has 4 equal sides."),
        },
        "acute-and-obtuse-angles": {
          title: "Acute and obtuse angles",
          learn: ["Acute is smaller than a right angle. Obtuse is bigger.", "Order angles up to two right angles."],
          use: "Open a laptop lid or a door to different angles.",
          ex: "A right angle is 90°. An angle of 120° is obtuse.",
          model: dia("An obtuse angle", "angle", { degrees: 120 }, "An angle of 120 degrees, which is obtuse."),
        },
        "lines-of-symmetry": {
          title: "Lines of symmetry",
          learn: ["A line of symmetry is a fold where both halves match.", "Count the lines, even when the shape is turned."],
          use: "Spot symmetry in butterflies, signs and badges.",
          ex: "A rectangle has 2 lines of symmetry. A square has 4.",
          model: tbl("Lines of symmetry", ["Shape", "Lines"], [["Rectangle", "2"], ["Square", "4"], ["Equilateral triangle", "3"]], "A rectangle has 2 lines of symmetry, a square has 4 and an equilateral triangle has 3."),
        },
        "completing-symmetric-figures": {
          title: "Finishing a symmetric shape",
          learn: ["Reflect each square in the mirror line.", "Count the same distance on the other side."],
          use: "Make a pattern for a tile or a flag.",
          ex: "A square 2 steps left of the mirror line goes 2 steps right of it.",
          model: dia("A shape and its reflection", "coordinates", { before: [[1, 1], [2, 1], [2, 3], [1, 3]], after: [[5, 1], [4, 1], [4, 3], [5, 3]], mirror: 3 }, "A rectangle on the left of a vertical mirror line at 3 and its reflection on the right."),
        },
      },
    },
    "geometry-position-and-direction": {
      intro: {
        title: "Position and direction",
        learn: ["Read and plot coordinates in the first quadrant.", "Slide shapes by moving left, right, up or down.", "Complete polygons from their corners."],
        use: "Coordinates help you read maps and play grid games.",
        ex: "The point (2, 3) is 2 across and 3 up.",
        model: steps("Reading (2, 3)", ["Start at (0, 0).", "Go 2 across.", "Go 3 up."], "Start at 0, 0. Go 2 across and 3 up to reach 2, 3."),
      },
      topics: {
        "coordinates-in-the-first-quadrant": {
          title: "Coordinates",
          learn: ["Write a position as (across, up).", "The order matters: (2, 4) is not (4, 2)."],
          use: "Find a square on a map or in a board game.",
          ex: "Go 2 across and 4 up: the point is (2, 4).",
          model: steps("Reading (2, 4)", ["Start at (0, 0).", "Go 2 across.", "Go 4 up."], "Start at 0, 0. Go 2 across and 4 up to reach 2, 4."),
        },
        "translations-on-a-grid": {
          title: "Sliding shapes",
          learn: ["A translation slides a shape without turning it.", "Left and right change the first number. Up and down change the second."],
          use: "Move a piece in a game.",
          ex: "Slide (2, 3) four squares right and one up to reach (6, 4).",
          model: steps("Sliding a point", ["Start at (2, 3).", "4 right: 2 + 4 = 6.", "1 up: 3 + 1 = 4.", "The point lands on (6, 4)."], "Start at 2, 3. Slide 4 right to 6, 3 and 1 up to 6, 4."),
        },
        "plotting-points-and-completing-polygons": {
          title: "Completing shapes",
          learn: ["Plot points and join them to make a polygon.", "Use equal and parallel sides to find a missing corner."],
          use: "Design a flag or draw a shape from its corners.",
          ex: "A rectangle has corners (1, 1), (4, 1) and (4, 3). The missing corner is (1, 3).",
          model: steps("Finding a missing corner", ["The missing corner is above (1, 1).", "It is level with (4, 3).", "So it is (1, 3)."], "The missing corner has the same across number as 1, 1 and the same up number as 4, 3. It is 1, 3."),
        },
      },
    },
    statistics: {
      intro: {
        title: "Graphs and data",
        learn: ["Read bar charts and time graphs.", "Add and subtract numbers from data.", "Use charts, pictograms and tables."],
        use: "Graphs show how a temperature changes or which pet is most popular.",
        ex: "A time graph can show the temperature at different times of day.",
        model: dia("Temperature through the day", "graph", { values: [6, 9, 12, 10], labels: ["9 am", "12 pm", "3 pm", "6 pm"], step: 3, unit: "Temperature (°C)" }, "A line graph of temperature at 9 am, 12 pm, 3 pm and 6 pm."),
      },
      topics: {
        "bar-charts-and-time-graphs": {
          title: "Bar charts and time graphs",
          learn: ["Read a bar chart and a time graph using the scale.", "Find how much a value rises or falls."],
          use: "Read the temperature at different times of day.",
          ex: "A line that goes up between two times shows a rise.",
          model: dia("Temperature", "graph", { values: [4, 8, 12, 10], labels: ["9 am", "11 am", "1 pm", "3 pm"], step: 4, unit: "Temperature (°C)" }, "A line graph of temperature at 9 am, 11 am, 1 pm and 3 pm."),
        },
        "comparing-and-calculating-with-data": {
          title: "Comparing data",
          learn: ["Add and subtract numbers from charts, pictograms and tables.", "Answer how many more, how many fewer and altogether."],
          use: "Find who scored the most, and by how many.",
          ex: "Two bars are 15 and 20. Together they are 35. The difference is 5.",
          model: steps("Using two bars", ["Together: 15 + 20 = 35.", "How many more: 20 − 15 = 5."], "15 plus 20 is 35. 20 take away 15 is 5."),
        },
      },
    },
  },
});
