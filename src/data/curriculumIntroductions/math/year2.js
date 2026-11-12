// Year 2 Maths introductions: subject, quest and topic purpose screens.
// Method teaching stays in each challenge's LessonFrame (src/data/lessons/math/year2/).
import { defineIntroductions } from "../../../../shared/curriculumJourneyAuthoring.js";

const eq = (title, parts, alt) => ({ renderer: "lesson", alt, data: { type: "equation", title, parts } });
const jumps = (title, terms, step, alt) => ({ renderer: "lesson", alt, data: { type: "jumps", title, terms, step } });
const steps = (title, list, alt) => ({ renderer: "lesson", alt, data: { type: "steps", title, steps: list } });
const tbl = (caption, headings, rows, alt) => ({ renderer: "table", alt, data: { caption, headings, rows } });
const pics = (title, items, alt) => ({ renderer: "pictures", alt, data: { title, items } });
const row = (icon, n) => Array(n).fill(icon);
const groups = (alt, ...rows) => ({ renderer: "groups", alt, data: { groups: rows, label: alt } });
const bars = (alt, list) => ({ renderer: "fraction-bars", alt, data: { bars: list } });

export default defineIntroductions({
  year: 2, subject: "math",
  subjectIntro: {
    title: "Welcome to Year 2 Maths",
    learn: ["Use tens and ones with numbers to 100.", "Add, take away, multiply and divide.", "Explore fractions, measures, shapes and charts."],
    use: "Maths helps you work out prices and change, share things fairly, tell the time and read charts.",
    ex: "46 is 4 tens and 6 ones.",
    model: eq("Building 46", ["40", "+", "6", "=", "46"], "40 plus 6 equals 46."),
  },
  quests: {
    "number---number-and-place-value": {
      intro: {
        title: "Numbers to 100",
        learn: ["Know what tens and ones are worth.", "Count in steps of 2, 3, 5 and 10.", "Compare numbers with <, > and =."],
        use: "Numbers help you read prices, ages and scores.",
        ex: "In 46, the 4 is worth 40 and the 6 is worth 6.",
        model: eq("Reading 46", ["40", "+", "6", "=", "46"], "40 plus 6 equals 46."),
      },
      topics: {
        "numbers-and-counting": {
          title: "Numbers in digits and words",
          learn: ["Read and write numbers to 100 in digits and in words.", "Find where a number sits on a line."],
          use: "Read a number word in a story book and write it as digits.",
          ex: "Fifty-two is 52.",
          model: tbl("Digits and words", ["Digits", "Words"], [["52", "fifty-two"], ["90", "ninety"]], "52 is fifty-two. 90 is ninety."),
        },
        "counting-forwards-and-backwards": {
          title: "Count on and count back",
          learn: ["Counting on: one more each time.", "Counting back: one less each time."],
          use: "Count down the days to a trip.",
          ex: "Counting back: 52, 51, 50, 49.",
          model: jumps("Counting back", ["52", "51", "50", "49"], "−1", "A count back from 52 to 49, one less each time."),
        },
        "counting-in-steps-of-2-3-5-and-10": {
          title: "Counting in steps",
          learn: ["Count in 2s, 3s and 5s from 0.", "Count in 10s from any number."],
          use: "Count socks in pairs, or count the fingers on lots of hands.",
          ex: "Counting in 3s: 0, 3, 6, 9, 12.",
          model: jumps("Counting in 3s", ["0", "3", "6", "9", "12"], "+3", "A count from 0 to 12 in jumps of 3."),
        },
        "counting-more-and-less": {
          title: "More and less",
          learn: ["Find 1 more or 1 less.", "Find 10 more or 10 less.", "Spot the rule in a pattern."],
          use: "Work out your score after you win 10 more points.",
          ex: "10 more than 27 is 37.",
          model: jumps("10 more each time", ["27", "37", "47"], "+10", "A count from 27 to 47 in jumps of 10."),
        },
        "place-value": {
          title: "Tens and ones",
          learn: ["The tens digit says how many tens.", "Split a number in different ways."],
          use: "Tell why 62 is more than 26.",
          ex: "52 is 50 + 2. It is also 40 + 12.",
          model: tbl("Splitting 52", ["Tens", "Ones"], [["50", "2"], ["40", "12"]], "52 is 50 and 2. It is also 40 and 12."),
        },
        "less-than-greater-than-and-equal-to": {
          title: "Bigger, smaller or equal",
          learn: ["< means less than.", "> means greater than.", "= means equal."],
          use: "Find the higher score or the lower price.",
          ex: "46 < 64. The open side of the sign faces the bigger number.",
          model: eq("Comparing 46 and 64", ["46", "<", "64"], "46 is less than 64."),
        },
      },
    },
    "number---addition-and-subtraction": {
      intro: {
        title: "Adding and taking away",
        learn: ["Double and halve.", "Add and take away two-digit numbers.", "Find missing numbers and solve problems."],
        use: "These skills help you add up prices and work out how many are left.",
        ex: "35 + 24 = 59.",
        model: eq("Adding 35 and 24", ["35", "+", "24", "=", "59"], "35 plus 24 equals 59."),
      },
      topics: {
        "doubling-and-halving-using-addition-and-subtraction": {
          title: "Doubles and halves",
          learn: ["Double means twice as many.", "Half undoes a double."],
          use: "Find double your age, or half of a pizza.",
          ex: "Double 8 is 16. Half of 16 is 8.",
          model: eq("Double 8", ["8", "+", "8", "=", "16"], "8 plus 8 equals 16."),
        },
        "solving-number-problems": {
          title: "Number problems",
          learn: ["Choose add or take away.", "Adding can be swapped. Taking away cannot."],
          use: "Work out how many are left after a party.",
          ex: "3 + 5 = 5 + 3. You can swap the numbers when you add.",
          model: eq("Swapping", ["3", "+", "5", "=", "5", "+", "3"], "3 plus 5 equals 5 plus 3."),
        },
        "using-two-digit-numbers": {
          title: "Two-digit sums",
          learn: ["Add or take away ones and tens.", "Add two two-digit numbers."],
          use: "Add up the prices in a shop.",
          ex: "35 + 24: 35 + 20 = 55, then 55 + 4 = 59.",
          model: steps("Add tens, then ones", ["Start with 35.", "Add the tens: 35 + 20 = 55.", "Add the ones: 55 + 4 = 59."], "Start with 35. Add 20 to make 55. Add 4 to make 59."),
        },
        "solving-missing-number-problems": {
          title: "Missing numbers",
          learn: ["Use the opposite sum to find the gap.", "Check by putting your answer in."],
          use: "Find how many more points you need to win.",
          ex: "? + 25 = 60. The missing number is 35.",
          model: eq("A missing number", ["35", "+", "25", "=", "60"], "35 plus 25 equals 60."),
        },
      },
    },
    "number---multiplication-and-division": {
      intro: {
        title: "Times tables and sharing",
        learn: ["Multiply with equal groups and arrays.", "Share and group with division.", "Know the 2, 5 and 10 times tables."],
        use: "These skills help you count equal groups and share things fairly.",
        ex: "5 groups of 2 make 10.",
        model: eq("5 groups of 2", ["5", "×", "2", "=", "10"], "5 times 2 equals 10."),
      },
      topics: {
        "what-is-multiplication": {
          title: "What is multiplication?",
          learn: ["Multiplying is adding equal groups.", "Write it with × and =."],
          use: "Count the wheels on a row of cars.",
          ex: "3 rows of 4 dots: 3 × 4 = 12.",
          model: groups("Three rows with 4 dots in each row.", row("●", 4), row("●", 4), row("●", 4)),
        },
        "what-is-division": {
          title: "What is division?",
          learn: ["Dividing is sharing equally.", "Write it with ÷ and =."],
          use: "Share sweets fairly between friends.",
          ex: "12 sweets shared between 3 children: 12 ÷ 3 = 4.",
          model: eq("Sharing 12", ["12", "÷", "3", "=", "4"], "12 divided by 3 equals 4."),
        },
        "2-5-and-10-multiplication-tables": {
          title: "The 2, 5 and 10 times tables",
          learn: ["Know the facts for 2, 5 and 10.", "Tell odd numbers from even numbers."],
          use: "Count money in 5p and 10p coins.",
          ex: "6 × 5 = 30.",
          model: eq("Six fives", ["6", "×", "5", "=", "30"], "6 times 5 equals 30."),
        },
        "division-problems": {
          title: "Division stories",
          learn: ["Share an amount equally.", "Keep the unit: cm, g, ml or p."],
          use: "Share 50p fairly between 5 children.",
          ex: "A 30 cm ribbon cut into 5 equal pieces: 30 ÷ 5 = 6 cm.",
          model: eq("Sharing 30", ["30", "÷", "5", "=", "6"], "30 divided by 5 equals 6."),
        },
        "connecting-multiplication-and-division": {
          title: "Times and divide are linked",
          learn: ["Every × fact gives a ÷ fact.", "You can swap × numbers, but not ÷ numbers."],
          use: "Check a division with a times fact.",
          ex: "3 × 5 = 15, so 15 ÷ 5 = 3.",
          model: steps("A fact family", ["3 × 5 = 15", "5 × 3 = 15", "15 ÷ 5 = 3", "15 ÷ 3 = 5"], "3 times 5 is 15. 5 times 3 is 15. 15 divided by 5 is 3. 15 divided by 3 is 5."),
        },
        "doubling-and-halving-using-multiplication-and-division": {
          title: "Doubling and halving",
          learn: ["Double means × 2.", "Half means ÷ 2."],
          use: "Find twice as many, or half as many.",
          ex: "Double 23 is 46. Half of 46 is 23.",
          model: eq("Double 23", ["23", "×", "2", "=", "46"], "23 times 2 equals 46."),
        },
        "solving-multiplication-and-division-problems": {
          title: "Times and share stories",
          learn: ["Choose × or ÷.", "Do two steps in order."],
          use: "Work out the cost of packs, or share a bag of sweets fairly.",
          ex: "3 packs of 10 stickers: 3 × 10 = 30 stickers.",
          model: eq("Three packs", ["3", "×", "10", "=", "30"], "3 times 10 equals 30."),
        },
      },
    },
    "number---fractions": {
      intro: {
        title: "Fractions",
        learn: ["Name halves, thirds and quarters.", "Find a fraction of a number or a group."],
        use: "Fractions help you share a pizza or a bar of chocolate fairly.",
        ex: "Two quarters make a half.",
        model: bars("A bar of 4 equal parts with 2 shaded, and a bar of 2 equal parts with 1 shaded. They are the same amount.",
          [{ parts: 4, shaded: [0, 1], label: "2 of 4 equal parts" }, { parts: 2, shaded: [0], label: "1 of 2 equal parts" }]),
      },
      topics: {
        "what-is-a-fraction": {
          title: "What is a fraction?",
          learn: ["The bottom number is how many equal parts.", "The top number is how many parts are coloured."],
          use: "Say how much of a pizza is left.",
          ex: "3 of 4 equal parts coloured is 3/4.",
          model: bars("A bar of 4 equal parts with 3 parts shaded.", [{ parts: 4, shaded: [0, 1, 2], label: "3 of 4 equal parts" }]),
        },
        "fractions-of-numbers": {
          title: "Fractions of numbers",
          learn: ["Find a half or a quarter of a number.", "2/4 is the same as 1/2."],
          use: "Share 12 sweets so each of 4 friends gets a quarter.",
          ex: "1/2 of 6 is 3.",
          model: steps("Half of 6", ["Share 6 into 2 equal groups.", "Each group has 3.", "So 1/2 of 6 is 3."], "Share 6 into 2 equal groups. Each group has 3, so 1/2 of 6 is 3."),
        },
        "finding-fractions-of-larger-groups": {
          title: "Fractions of groups",
          learn: ["Share into equal groups first.", "Take the number of groups you need."],
          use: "Find how many squares of chocolate are 3/4 of a bar.",
          ex: "1/4 of 20 is 5. So 3/4 of 20 is 15.",
          model: steps("3/4 of 20", ["Share 20 into 4 equal groups.", "Each group has 5.", "Take 3 groups: 5 + 5 + 5 = 15."], "Share 20 into 4 equal groups of 5. Take 3 groups to make 15."),
        },
      },
    },
    "measurement": {
      intro: {
        title: "Measuring things",
        learn: ["Measure length, mass, capacity and temperature.", "Know coins and give change.", "Tell the time to 5 minutes."],
        use: "Measuring helps you cook, shop and know when to leave for school.",
        ex: "The long hand on 3 means quarter past.",
        model: { renderer: "clock", alt: "An analogue clock showing quarter past 8.", data: { hour: 8, minute: 15 } },
      },
      topics: {
        "measuring-length-and-height": {
          title: "Length and height",
          learn: ["Use cm and m.", "Read a ruler."],
          use: "Measure a pencil, or see how tall you are.",
          ex: "100 cm make 1 m.",
          model: tbl("Length units", ["Unit", "Use it for"], [["cm", "a pencil"], ["m", "a classroom"]], "Use centimetres for a pencil and metres for a classroom."),
        },
        "measuring-weight-and-volume": {
          title: "Weight and volume",
          learn: ["Read scales in g and kg.", "Read jugs in ml and litres."],
          use: "Weigh flour for a cake, or pour a drink.",
          ex: "1000 g make 1 kg. 1000 ml make 1 litre.",
          model: tbl("Units", ["Small", "Big"], [["1000 g", "1 kg"], ["1000 ml", "1 litre"]], "1000 grams make 1 kilogram. 1000 millilitres make 1 litre."),
        },
        "comparing-measurements": {
          title: "Comparing measurements",
          learn: ["Use <, > and = with measures.", "Check the units first."],
          use: "Find the longer rope or the heavier bag.",
          ex: "1 m is more than 80 cm.",
          model: tbl("Same length", ["Metres", "Centimetres"], [["1", "100"]], "1 metre is the same length as 100 centimetres."),
        },
        "measuring-temperature": {
          title: "Temperature",
          learn: ["Read a thermometer in °C.", "Up is warmer. Down is colder."],
          use: "Know whether to wear a coat.",
          ex: "Ice and snow are about 0 °C.",
          model: pics("How hot or cold?", [{ icon: "❄️", label: "Snow: about 0 °C" }, { icon: "☀️", label: "A hot day: about 30 °C" }], "Snow is about 0 degrees. A hot day is about 30 degrees."),
        },
        "measuring-time": {
          title: "Telling the time",
          learn: ["Tell the time to 5 minutes.", "Know quarter past and quarter to.", "60 minutes make 1 hour."],
          use: "Know when it is time for lunch or for the bus.",
          ex: "Long hand on 3 is quarter past. Long hand on 9 is quarter to.",
          model: { renderer: "clock", alt: "An analogue clock showing quarter to 4.", data: { hour: 3, minute: 45 } },
        },
        "standard-units-of-money": {
          title: "Money",
          learn: ["Write p and £.", "Make amounts with coins."],
          use: "Count the coins to see what you can buy.",
          ex: "50p + 20p + 5p = 75p.",
          model: steps("Adding coins", ["Start with 50p.", "Add 20p to make 70p.", "Add 5p to make 75p."], "50p add 20p is 70p. Add 5p to make 75p."),
        },
        "money-problems": {
          title: "Money problems",
          learn: ["Add prices.", "Work out the change."],
          use: "Check you get the right change in a shop.",
          ex: "A toy costs 65p. You pay £1. Your change is 35p.",
          model: steps("Finding change", ["The toy costs 65p.", "You pay 100p.", "Count on from 65p to 100p: that is 35p."], "Count on from 65p to 100p to find the change of 35p."),
        },
      },
    },
    "geometry-properties-of-shapes": {
      intro: {
        title: "Shapes",
        learn: ["Name flat shapes and count their sides.", "Count faces, edges and vertices on solids.", "Find flat shapes on solid shapes."],
        use: "Shapes help you describe buildings, boxes and toys.",
        ex: "A cube has 6 square faces.",
        model: pics("Shapes", [{ icon: "⬡", label: "Hexagon" }, { icon: "🎲", label: "Cube" }, { icon: "⚽", label: "Sphere" }], "A hexagon, a cube and a sphere."),
      },
      topics: {
        "2-d-shapes": {
          title: "Flat shapes",
          learn: ["Count the sides of a shape.", "Find a line of symmetry."],
          use: "Spot hexagons in a honeycomb and octagons on a stop sign.",
          ex: "A hexagon has 6 sides. An octagon has 8.",
          model: tbl("Sides and shapes", ["Sides", "Shape"], [["3", "triangle"], ["5", "pentagon"], ["6", "hexagon"], ["8", "octagon"]], "3 sides is a triangle, 5 a pentagon, 6 a hexagon and 8 an octagon."),
        },
        "3-d-shapes": {
          title: "Solid shapes",
          learn: ["Count faces, edges and vertices.", "Name cubes, cuboids, cones and more."],
          use: "Know what shapes are in a box of toys.",
          ex: "A cube has 6 faces, 12 edges and 8 vertices.",
          model: tbl("A cube", ["Part", "How many"], [["Faces", "6"], ["Edges", "12"], ["Vertices", "8"]], "A cube has 6 faces, 12 edges and 8 vertices."),
        },
        "different-shapes": {
          title: "Flat shapes on solids",
          learn: ["Find flat shapes on solid shapes.", "Sort flat and solid shapes."],
          use: "Spot the circle on the end of a tin.",
          ex: "A cylinder has circle ends.",
          model: pics("Flat shapes on solids", [{ icon: "🥫", label: "Cylinder: circle ends" }, { icon: "🎲", label: "Cube: square faces" }], "A cylinder has circle ends. A cube has square faces."),
        },
      },
    },
    "geometry-position-and-direction": {
      intro: {
        title: "Patterns and turns",
        learn: ["Continue patterns and sequences.", "Make quarter, half and three-quarter turns."],
        use: "Patterns and turns help you follow dance steps and give directions.",
        ex: "Triangle, circle, triangle, circle. Next comes a triangle.",
        model: groups("A pattern: triangle, circle, triangle, circle, triangle.", ["🔺", "⭕", "🔺", "⭕", "🔺"]),
      },
      topics: {
        "patterns": {
          title: "Patterns",
          learn: ["Find the part that repeats.", "Say what comes next."],
          use: "Spot patterns on fabric, tiles and fences.",
          ex: "Triangle, square, triangle, square, triangle. Next is a square.",
          model: groups("A pattern: triangle, square, triangle, square, triangle.", ["🔺", "🟦", "🔺", "🟦", "🔺"]),
        },
        "sequences": {
          title: "Sequences",
          learn: ["Use first, second and third.", "Use left, right, above and below."],
          use: "Say who is first in a line.",
          ex: "In a line of 5, the third one is in the middle.",
          model: groups("A line of five fruits.", ["🍎", "🍌", "🍐", "🍇", "🍓"]),
        },
        "quarter-turns-and-half-turns": {
          title: "Quarter and half turns",
          learn: ["Know quarter, half and three-quarter turns.", "Turn clockwise and anti-clockwise."],
          use: "Turn a tap or a key.",
          ex: "A half turn is two quarter turns.",
          model: steps("Turns", ["A quarter turn is 1 step round.", "A half turn is 2 steps round.", "A three-quarter turn is 3 steps round."], "A quarter turn is 1 step round. A half turn is 2. A three-quarter turn is 3."),
        },
        "right-angle-turns": {
          title: "Right-angle turns",
          learn: ["A quarter turn is a right angle.", "Turn left and turn right."],
          use: "Follow robot or map directions.",
          ex: "Turn right is a quarter turn clockwise.",
          model: steps("Turning a robot", ["The robot faces up.", "Turn right: a quarter turn clockwise.", "The robot now faces right."], "A robot facing up turns right by a quarter turn clockwise, and now faces right."),
        },
      },
    },
    "statistics": {
      intro: {
        title: "Charts and data",
        learn: ["Read pictograms, tally charts, block diagrams and tables.", "Count, sort and compare."],
        use: "Charts help you see which snack or game is the most popular.",
        ex: "One picture can stand for 5.",
        model: tbl("Favourite fruit", ["Fruit", "Children"], [["Apple", "8"], ["Banana", "5"]], "8 children chose apple and 5 chose banana."),
      },
      topics: {
        "pictograms": {
          title: "Pictograms",
          learn: ["Check the key first.", "Count in the key's steps."],
          use: "See which snack is the most popular.",
          ex: "One 🍎 stands for 2. Three 🍎 mean 6.",
          model: tbl("Key: 🍎 stands for 2 apples", ["Day", "Apples"], [["Monday", "🍎🍎🍎"]], "Monday has 3 apple pictures. Each picture stands for 2 apples."),
        },
        "tally-charts": {
          title: "Tally charts",
          learn: ["Each line is 1.", "Count the gates of 5, then the extra lines."],
          use: "Count the votes in a class vote.",
          ex: "One gate of 5 and 2 more lines make 7.",
          model: tbl("A tally", ["Pet", "Tally"], [["Cat", "||||/ ||"]], "A gate of five lines and two more lines make 7."),
        },
        "block-diagrams": {
          title: "Block diagrams",
          learn: ["Find the column you need.", "Read the scale. It may go up in 2s."],
          use: "See how many children like each game.",
          ex: "A column that reaches 6 means 6 children.",
          model: { renderer: "bar-chart", alt: "A block diagram of favourite games. The scale goes up in 2s.",
            data: { title: "Favourite games", unit: "Children", step: 2, bars: [{ label: "Tag", value: 6 }, { label: "Hide", value: 4 }] } },
        },
        "tables": {
          title: "Tables",
          learn: ["Find the row and the column.", "Add across or down."],
          use: "Read a timetable or a score table.",
          ex: "Row Monday, column Apples: the number where they meet.",
          model: tbl("Fruit sold", ["Day", "Apples", "Pears"], [["Monday", "5", "8"], ["Tuesday", "6", "4"]], "A table of apples and pears sold on Monday and Tuesday."),
        },
        "gathering-information-and-using-data": {
          title: "Collecting data",
          learn: ["Count each kind.", "Add up and compare the totals."],
          use: "Find how many of each toy are in a pile.",
          ex: "3 cars and 2 dolls make 5 toys.",
          model: groups("Three cars and two dolls.", ["🚗", "🪆", "🚗", "🪆", "🚗"]),
        },
      },
    },
  },
});
