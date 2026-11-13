// Year 1 Maths introductions: subject, quest and topic purpose screens.
// Method teaching stays in each challenge's LessonFrame (src/data/lessons/math/year1/).
import { defineIntroductions } from "../../../../shared/curriculumJourneyAuthoring.js";

const eq = (title, parts, alt) => ({ renderer: "lesson", alt, data: { type: "equation", title, parts } });
const jumps = (title, terms, step, alt) => ({ renderer: "lesson", alt, data: { type: "jumps", title, terms, step } });
const steps = (title, list, alt) => ({ renderer: "lesson", alt, data: { type: "steps", title, steps: list } });
const tbl = (caption, headings, rows, alt) => ({ renderer: "table", alt, data: { caption, headings, rows } });
const pics = (title, items, alt) => ({ renderer: "pictures", alt, data: { title, items } });
const row = (icon, n) => Array(n).fill(icon);
const groups = (alt, ...rows) => ({ renderer: "groups", alt, data: { groups: rows, label: alt } });
const part = (parts, shaded, label, alt) => ({ renderer: "fraction-bars", alt, data: { bars: [{ parts, shaded, label }] } });

export default defineIntroductions({
  year: 1, subject: "math",
  subjectIntro: {
    title: "Welcome to Year 1 Maths",
    learn: ["Count, read and write numbers to 100.", "Add and take away with small numbers.", "Explore shapes, time, money and measures."],
    use: "Maths helps you count your toys, share sweets fairly, tell the time and know what coins are worth.",
    ex: "3 apples and 2 more apples make 5 apples.",
    model: eq("Adding apples", ["3", "+", "2", "=", "5"], "3 plus 2 equals 5."),
  },
  quests: {
    "number---number-and-place-value": {
      intro: {
        title: "Numbers to 100",
        learn: ["Count forwards and backwards to 100.", "Count in 2s, 5s and 10s.", "Read, write and compare numbers."],
        use: "Numbers help you count things, read ages and house numbers, and see who has more.",
        ex: "After 39 comes 40.",
        model: jumps("Counting on", ["38", "39", "40", "41"], "+1", "A count from 38 to 41, one more each time."),
      },
      topics: {
        "counting-objects": {
          title: "Counting things",
          learn: ["Touch each thing once and say a number.", "The last number you say is how many."],
          use: "Count your toys, your cubes or the children in your class.",
          ex: "Touch 5 apples: 1, 2, 3, 4, 5. There are 5 apples.",
          model: groups("Five apples in a row.", row("🍎", 5)),
        },
        "counting-forwards-and-backwards-to-100": {
          title: "Count up and down",
          learn: ["Counting on: each number is one more.", "Counting back: each number is one less."],
          use: "Count down to your birthday, or count up the stairs.",
          ex: "Counting back: 43, 42, 41, 40.",
          model: jumps("Counting back", ["43", "42", "41", "40"], "−1", "A count back from 43 to 40, one less each time."),
        },
        "reading-and-writing-numerals-to-100": {
          title: "Tens and ones",
          learn: ["The first digit says how many tens.", "The last digit says how many ones."],
          use: "Read house numbers, ages and page numbers.",
          ex: "34 is 3 tens and 4 ones.",
          model: eq("Tens and ones", ["30", "+", "4", "=", "34"], "30 plus 4 equals 34."),
        },
        "counting-in-twos-fives-and-tens": {
          title: "Counting in 2s, 5s and 10s",
          learn: ["Jump the same amount each time.", "Count pairs, hands and tens."],
          use: "Count socks in pairs, or fingers on lots of hands.",
          ex: "Counting in 5s: 0, 5, 10, 15, 20.",
          model: jumps("Counting in 5s", ["0", "5", "10", "15", "20"], "+5", "A count from 0 to 20 in jumps of 5."),
        },
        "one-more-and-one-less": {
          title: "One more, one less",
          learn: ["One more is the next number.", "One less is the number before."],
          use: "Work out how many children are on the bus when one more gets on.",
          ex: "One more than 9 is 10. One less than 9 is 8.",
          model: jumps("Next door numbers", ["8", "9", "10"], "+1", "The numbers 8, 9 and 10 in a row."),
        },
        "comparing-and-ordering-quantities": {
          title: "More, fewer or the same",
          learn: ["Compare two groups.", "Say which has more, fewer or the same."],
          use: "Check who has more sweets, or who has the fewest stickers.",
          ex: "5 stars and 3 moons. There are more stars than moons.",
          model: groups("Five stars and three moons.", row("⭐", 5), row("🌙", 3)),
        },
        "number-words-to-20": {
          title: "Number words",
          learn: ["Read number words up to twenty.", "Write them too."],
          use: "Read a number word in a story book.",
          ex: "13 is thirteen.",
          model: tbl("Numbers and words", ["Number", "Word"], [["7", "seven"], ["13", "thirteen"]], "7 is seven. 13 is thirteen."),
        },
      },
    },
    "number---addition-and-subtraction": {
      intro: {
        title: "Adding and taking away",
        learn: ["Add and take away within 20.", "Learn pairs of numbers that make 10.", "Find missing numbers and solve stories."],
        use: "Adding and taking away help you find how many altogether and how many are left.",
        ex: "7 and 3 make 10.",
        model: eq("Making 10", ["7", "+", "3", "=", "10"], "7 plus 3 equals 10."),
      },
      topics: {
        "addition-subtraction-and-equals-signs": {
          title: "Plus, minus and equals",
          learn: ["+ means add.", "− means take away.", "= means the same as."],
          use: "Read the number sentences in your maths book.",
          ex: "3 + 2 = 5.",
          model: eq("A number sentence", ["3", "+", "2", "=", "5"], "3 plus 2 equals 5."),
        },
        "number-bonds-within-20": {
          title: "Number bonds",
          learn: ["Two parts make a whole.", "Know the pairs that make 10 and 20."],
          use: "Find how many more you need to reach 10.",
          ex: "6 and 4 make 10.",
          model: eq("A bond to 10", ["6", "+", "4", "=", "10"], "6 plus 4 equals 10."),
        },
        "adding-within-20": {
          title: "Adding to 20",
          learn: ["Put two groups together.", "Count on from the bigger number."],
          use: "Find how many toys you have altogether.",
          ex: "8 + 3: start at 8 and count on 9, 10, 11.",
          model: jumps("Counting on", ["8", "9", "10", "11"], "+1", "A count on from 8 to 11."),
        },
        "subtracting-within-20": {
          title: "Taking away",
          learn: ["Take some away and see what is left.", "Count back to find the answer."],
          use: "Find how many sweets are left after you eat some.",
          ex: "9 − 3: count back 8, 7, 6. The answer is 6.",
          model: jumps("Counting back", ["9", "8", "7", "6"], "−1", "A count back from 9 to 6."),
        },
        "missing-numbers-within-20": {
          title: "Find the missing number",
          learn: ["Work out which number is hidden.", "Use adding to check."],
          use: "Find how many more stickers you need to make 10.",
          ex: "? + 4 = 10. The missing number is 6.",
          model: eq("A missing number", ["6", "+", "4", "=", "10"], "6 plus 4 equals 10."),
        },
        "one-step-addition-and-subtraction-problems": {
          title: "Number stories",
          learn: ["Read the story.", "Decide to add or take away."],
          use: "Work out how many ducks are on the pond after some swim away.",
          ex: "5 ducks. 2 swim away. 5 − 2 = 3.",
          model: eq("A story sentence", ["5", "−", "2", "=", "3"], "5 take away 2 equals 3."),
        },
      },
    },
    "number---multiplication-and-division": {
      intro: {
        title: "Groups, sharing and doubles",
        learn: ["Count equal groups.", "Share things fairly.", "Double small numbers."],
        use: "Equal groups help you count eggs in a box, share sweets and find how many wheels on two bikes.",
        ex: "Share 8 counters between 2 groups. Each group gets 4.",
        model: groups("Two groups with the same number of counters.", row("●", 4), row("●", 4)),
      },
      topics: {
        "equal-groups-and-arrays": {
          title: "Equal groups and rows",
          learn: ["Every group has the same number.", "Count the rows to find the total."],
          use: "Count the eggs in a box or the buns on a tray.",
          ex: "3 rows of 4 make 12.",
          model: groups("Three rows with 4 dots in each row.", row("●", 4), row("●", 4), row("●", 4)),
        },
        "sharing-and-grouping": {
          title: "Sharing fairly",
          learn: ["Share things so each one gets the same.", "Put things into equal groups."],
          use: "Share sweets between friends so it is fair.",
          ex: "Share 8 sweets between 2 friends. Each gets 4.",
          model: groups("Eight sweets shared between two friends.", row("🍬", 4), row("🍬", 4)),
        },
        "doubling-small-quantities": {
          title: "Doubling",
          learn: ["Double means two equal groups.", "Add a number to itself."],
          use: "Find how many wheels there are on two bikes.",
          ex: "Double 4 is 4 + 4 = 8.",
          model: eq("Double 4", ["4", "+", "4", "=", "8"], "4 plus 4 equals 8."),
        },
      },
    },
    "number---fractions": {
      intro: {
        title: "Halves and quarters",
        learn: ["Split things into equal parts.", "Find a half and a quarter."],
        use: "Fractions help you share a pizza or a cake fairly.",
        ex: "A half is one of two equal parts. A quarter is one of four.",
        model: { renderer: "fraction-bars", alt: "One bar in 2 equal parts and one bar in 4 equal parts, with 1 part shaded in each.",
          data: { bars: [{ parts: 2, shaded: [0], label: "1 of 2 equal parts" }, { parts: 4, shaded: [0], label: "1 of 4 equal parts" }] } },
      },
      topics: {
        "finding-a-half": {
          title: "Halves",
          learn: ["A half is one of two equal parts.", "Both parts are the same size."],
          use: "Share a sandwich fairly between two friends.",
          ex: "Half of 8 is 4.",
          model: part(2, [0], "1 of 2 equal parts", "A bar in 2 equal parts with 1 part shaded."),
        },
        "finding-a-quarter": {
          title: "Quarters",
          learn: ["A quarter is one of four equal parts.", "All four parts are the same size."],
          use: "Cut a cake into four fair pieces.",
          ex: "A quarter of 8 is 2.",
          model: part(4, [0], "1 of 4 equal parts", "A bar in 4 equal parts with 1 part shaded."),
        },
      },
    },
    "measurement": {
      intro: {
        title: "Measuring things",
        learn: ["Compare lengths, mass and capacity.", "Know coins and notes.", "Put events in order and tell the time."],
        use: "Measuring helps you see which is longer, how much you can pay and when it is time for lunch.",
        ex: "The long hand on 12 and the short hand on 3 is 3 o'clock.",
        model: { renderer: "clock", alt: "An analogue clock showing 3 o'clock.", data: { hour: 3, minute: 0 } },
      },
      topics: {
        "comparing-and-measuring-lengths-and-heights": {
          title: "Longer and shorter",
          learn: ["Compare how long things are.", "Measure with blocks and a ruler."],
          use: "Find which pencil is the longest.",
          ex: "A ribbon of 6 blocks is longer than a ribbon of 4 blocks.",
          model: groups("A ribbon of 6 blocks and a ribbon of 4 blocks.", row("🟦", 6), row("🟦", 4)),
        },
        "comparing-and-measuring-mass": {
          title: "Heavier and lighter",
          learn: ["Compare how heavy things are.", "Read a scale in g or kg."],
          use: "Check which bag is heavier.",
          ex: "A bag that balances 5 cubes is heavier than a bag that balances 3 cubes.",
          model: groups("A bag balanced with 5 cubes and a bag balanced with 3 cubes.", row("🟫", 5), row("🟫", 3)),
        },
        "comparing-and-measuring-capacity": {
          title: "How much it holds",
          learn: ["Compare how much jugs hold.", "Say full, half full, quarter full or empty."],
          use: "Pour a drink and see if the jug is full or empty.",
          ex: "A jug that holds 6 cups holds more than a jug that holds 4 cups.",
          model: groups("A jug of 6 cups and a jug of 4 cups.", row("🥛", 6), row("🥛", 4)),
        },
        "measuring-and-comparing-time": {
          title: "How long does it take?",
          learn: ["Choose seconds, minutes or hours.", "Say which takes longer."],
          use: "Know that a clap takes seconds and a film takes hours.",
          ex: "A clap takes seconds. A swimming lesson takes minutes.",
          model: pics("Quick or slow", [{ icon: "👏", label: "Clap: seconds" }, { icon: "🏊", label: "Swimming lesson: minutes" }, { icon: "🌙", label: "Sleep: hours" }], "A clap takes seconds. A swimming lesson takes minutes. Sleep takes hours."),
        },
        "recognising-coins": {
          title: "Coins",
          learn: ["Read the number on a coin.", "Tell pence from pounds."],
          use: "Know what you can buy with your money.",
          ex: "A 50p coin is worth less than a £1 coin.",
          model: pics("Coins", [{ icon: "🪙", label: "5p" }, { icon: "🪙", label: "50p" }, { icon: "🪙", label: "£1" }], "A 5p coin, a 50p coin and a £1 coin."),
        },
        "recognising-notes": {
          title: "Notes",
          learn: ["Know the £5, £10, £20 and £50 notes.", "A bigger number is worth more."],
          use: "Know how much money you have in your pocket.",
          ex: "A £10 note is worth more than a £5 note.",
          model: pics("Notes", [{ icon: "💷", label: "£5" }, { icon: "💷", label: "£10" }, { icon: "💷", label: "£20" }, { icon: "💷", label: "£50" }], "A £5, a £10, a £20 and a £50 note."),
        },
        "sequencing-events": {
          title: "First, next, last",
          learn: ["Put things in order.", "Use words like before, after, yesterday and tomorrow."],
          use: "Say what you do in the morning, the afternoon and the evening.",
          ex: "First you wake up. Next you eat breakfast. Last you go to school.",
          model: steps("My morning", ["First: wake up.", "Next: eat breakfast.", "Last: go to school."], "Wake up, then eat breakfast, then go to school."),
        },
        "days-months-and-years": {
          title: "Days and months",
          learn: ["Know the days of the week.", "Know the months of the year."],
          use: "Say which day your party is on.",
          ex: "After Monday comes Tuesday.",
          model: { renderer: "number-line", alt: "Monday, Tuesday and Wednesday in order.", data: { terms: ["Monday", "Tuesday", "Wednesday"] } },
        },
        "oclock-and-half-past": {
          title: "Telling the time",
          learn: ["Read o'clock times.", "Read half past times."],
          use: "Know when it is time for lunch or for bed.",
          ex: "The long hand on 6 and the short hand halfway between 7 and 8 is half past 7.",
          model: { renderer: "clock", alt: "An analogue clock showing half past 7.", data: { hour: 7, minute: 30 } },
        },
      },
    },
    "geometry-properties-of-shapes": {
      intro: {
        title: "Shapes",
        learn: ["Name flat shapes.", "Name solid shapes."],
        use: "Shapes are everywhere. Spot them on windows, plates, boxes and balls.",
        ex: "A plate is a circle. A ball is a sphere.",
        model: pics("Shapes", [{ icon: "🔺", label: "Triangle" }, { icon: "⭕", label: "Circle" }, { icon: "🟦", label: "Square" }, { icon: "⚽", label: "Sphere" }], "A triangle, a circle, a square and a sphere."),
      },
      topics: {
        "recognising-2-d-shapes": {
          title: "Flat shapes",
          learn: ["Name circles, triangles, squares and rectangles.", "Count the sides."],
          use: "Spot shapes on windows, plates and signs.",
          ex: "A triangle has 3 sides. A rectangle has 4 sides.",
          model: pics("Flat shapes", [{ icon: "🔺", label: "Triangle: 3 sides" }, { icon: "🟦", label: "Square: 4 equal sides" }, { icon: "⭕", label: "Circle: round" }], "A triangle has 3 sides. A square has 4 equal sides. A circle is round."),
        },
        "recognising-3-d-shapes": {
          title: "Solid shapes",
          learn: ["Name cubes, cuboids, pyramids and spheres.", "Spot them around you."],
          use: "Know that a ball is a sphere and a box is a cuboid.",
          ex: "A ball is a sphere. A shoe box is a cuboid.",
          model: pics("Solid shapes", [{ icon: "🎲", label: "Cube" }, { icon: "📦", label: "Cuboid" }, { icon: "⚽", label: "Sphere" }], "A dice is a cube. A box is a cuboid. A ball is a sphere."),
        },
      },
    },
    "geometry-position-and-direction": {
      intro: {
        title: "Where and which way?",
        learn: ["Say where things are.", "Follow moves up, down, left and right.", "Make quarter, half and whole turns."],
        use: "Position words help you find things and give directions.",
        ex: "The ball is on top of the box.",
        model: pics("Position words", [{ icon: "⬆️", label: "Above" }, { icon: "⬇️", label: "Below" }, { icon: "⬅️", label: "Left" }, { icon: "➡️", label: "Right" }], "Above, below, left and right."),
      },
      topics: {
        "describing-position": {
          title: "Where is it?",
          learn: ["Use words like above, below, inside and next to.", "Say left and right."],
          use: "Say where your shoes are, or where to sit.",
          ex: "The ball is on top of the box.",
          model: pics("Position words", [{ icon: "⬆️", label: "Above" }, { icon: "⬇️", label: "Below" }, { icon: "⬅️", label: "Left" }, { icon: "➡️", label: "Right" }], "Above, below, left and right."),
        },
        "describing-movement": {
          title: "Moving along",
          learn: ["Say up, down, left or right.", "Count squares as you move."],
          use: "Follow a path to find the treasure.",
          ex: "Move 2 squares right, then 1 square up.",
          model: steps("A path", ["Start at the bear.", "Move 2 squares right.", "Move 1 square up.", "You find the star."], "Start at the bear. Move 2 squares right, then 1 square up to find the star."),
        },
        "whole-half-quarter-and-three-quarter-turns": {
          title: "Turns",
          learn: ["Know whole, half, quarter and three-quarter turns.", "Clockwise goes the way clock hands go."],
          use: "Turn a door handle or a steering wheel.",
          ex: "A half turn is two quarter turns.",
          model: steps("Turns", ["A quarter turn is 1 step round.", "A half turn is 2 steps round.", "A three-quarter turn is 3 steps round.", "A whole turn is 4 steps round."], "A quarter turn is 1 step round. A half turn is 2. A three-quarter turn is 3. A whole turn is 4."),
        },
      },
    },
  },
});
