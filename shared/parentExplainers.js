// Parent explainers: plain-English pages a teacher can send to parents or print.
// Written for parents, not teachers. NOT content-reviewed yet: a teacher should
// read these before they go home. Worked examples use the LessonExample shapes
// (column, equation, steps, jumps, bar, groups, table, sentence, fix).
// Year groups follow the National Curriculum for England (see docs/curriculum/).

export const PARENT_EXPLAINERS = [
  {
    slug: "number-bonds",
    title: "Number bonds",
    subject: "math",
    years: [1, 2],
    summary: "Pairs of numbers that add up to a target, like 7 and 3 making 10.",
    whatItIs: [
      "A number bond is a pair of numbers that add up to another number. 7 and 3 make 10, so 7 + 3 is a number bond for 10.",
      "Children learn the bonds for 10 and then 20 until they know them without counting. This makes adding, taking away and later times tables much easier.",
    ],
    howWeTeach: {
      intro: "We start with real objects and pictures, then move to numbers.",
      steps: [
        "Share 10 counters or objects into two groups in every possible way.",
        "Notice the pattern: when one group gets bigger, the other gets smaller.",
        "Write each pair as a number sentence, such as 6 + 4 = 10.",
        "Use a known bond to work out a new one. If 7 + 3 = 10, then 17 + 3 = 20.",
      ],
      examples: [
        {
          type: "groups",
          title: "Splitting 10 apples",
          groups: [["🍎", "🍎", "🍎", "🍎", "🍎", "🍎", "🍎"], ["🍏", "🍏", "🍏"]],
          label: "7 red apples and 3 green apples make 10",
          note: "Every split of 10 is a number bond.",
        },
        {
          type: "equation",
          title: "Bonds to 20",
          parts: ["13", "+", "7", "=", "20"],
          note: "We use 3 + 7 = 10 to find this one.",
        },
      ],
    },
    words: [
      { term: "number bond", meaning: "Two numbers that add up to a target number, like 6 and 4 for 10." },
      { term: "make 10", meaning: "Find the number that adds to a given number to reach 10." },
      { term: "total", meaning: "The number you get when you add numbers together." },
      { term: "partner", meaning: "The other number in a bond. The partner of 3 in a bond for 10 is 7." },
    ],
    atHome: [
      {
        title: "Fingers to 10",
        how: "Hold up some fingers and ask, \"How many more to make 10?\" Your child looks at the folded fingers. Take turns being the one who asks.",
      },
      {
        title: "Hide and find",
        how: "Put 10 coins, buttons or pasta shapes on the table. Hide some under a cup. Show the rest and ask how many are hidden.",
      },
      {
        title: "Door numbers",
        how: "When you pass a house number or a number on a bus, ask, \"What goes with that to make 10 (or 20)?\" Keep it quick and light.",
      },
    ],
    mixUps: [
      {
        mistake: "Counting on fingers every time.",
        help: "That is a good start. Say, \"Can you picture the 10 fingers instead?\" Practise a few bonds a day until they feel automatic.",
      },
      {
        mistake: "Knowing 6 + 4 = 10 but not 4 + 6.",
        help: "Say, \"Adding in either order gives the same answer.\" Show both with objects so your child can see it.",
      },
    ],
    practise: [
      { label: "Make Number Bonds", to: "/skills/number-bonds" },
      { label: "Complete Number Patterns", to: "/skills/missing-number" },
    ],
    schoolsVary: false,
  },

  {
    slug: "place-value",
    title: "Place value",
    subject: "math",
    years: [1, 2, 3, 4],
    summary: "Why the same digit is worth different amounts in different places.",
    whatItIs: [
      "Place value means a digit is worth different amounts depending on where it sits. In 353, the first 3 is worth 300 but the last 3 is worth just 3.",
      "Children use place value to read, write, compare and round numbers. It is also the idea behind column addition and subtraction.",
    ],
    howWeTeach: {
      intro: "We build numbers with objects first, then move to a place value chart.",
      steps: [
        "Count in groups of ten and make tens with sticks or blocks.",
        "Put digits in a chart with columns for hundreds, tens and ones.",
        "Say each number in parts: 347 is 3 hundreds, 4 tens and 7 ones.",
        "Use the same idea to compare numbers and to find 10 or 100 more or less.",
      ],
      examples: [
        {
          type: "table",
          title: "347 in a place value chart",
          headers: ["Hundreds", "Tens", "Ones"],
          rows: [["3", "4", "7"]],
          note: "Each digit has a value.",
        },
        {
          type: "equation",
          title: "Splitting 347 into parts",
          parts: ["300", "+", "40", "+", "7", "=", "347"],
          note: "This is called partitioning.",
        },
      ],
    },
    words: [
      { term: "digit", meaning: "One of the symbols 0 to 9 used to write numbers." },
      { term: "ones, tens, hundreds", meaning: "The names of the places in a number, starting from the right." },
      { term: "partition", meaning: "Split a number into parts by place value, like 347 into 300, 40 and 7." },
      { term: "place holder", meaning: "A zero that keeps other digits in the right place, like the 0 in 305." },
    ],
    atHome: [
      {
        title: "Number of the day",
        how: "Pick a number from a car number plate or a receipt. Ask, \"How many tens in it? What is 10 more? What is 10 less?\"",
      },
      {
        title: "Coin tens",
        how: "Count out 10p coins into piles. Swap ten 1p coins for one 10p coin. Ask your child why that swap is fair.",
      },
      {
        title: "Make the biggest",
        how: "Write three digits on scraps of paper. Ask your child to make the biggest and smallest number they can, then say each one aloud.",
      },
    ],
    mixUps: [
      {
        mistake: "Writing 4 tens and 5 ones as 405 or 45 tens.",
        help: "Say, \"Let us put it in the chart.\" Putting 4 under tens and 5 under ones shows it is 45.",
      },
      {
        mistake: "Ignoring zero, such as reading 306 as \"thirty-six\".",
        help: "Explain that zero holds the tens place. Say, \"There are no tens here, but the place is still there.\"",
      },
    ],
    practise: [
      { label: "Build Numbers with Place Value", to: "/skills/place-value" },
      { label: "Read Big Numbers", to: "/skills/reading-numbers" },
    ],
    schoolsVary: false,
  },

  {
    slug: "column-addition",
    title: "Column addition",
    subject: "math",
    years: [3, 4],
    summary: "A written way to add bigger numbers by lining up ones, tens and hundreds.",
    whatItIs: [
      "Column addition is a written method for adding larger numbers. The numbers are lined up one under the other, so ones sit under ones and tens under tens.",
      "You add one column at a time, starting from the right. When a column adds to 10 or more, you exchange: 10 ones become 1 ten and move to the next column.",
    ],
    howWeTeach: {
      intro: "Children first add with blocks and place value charts so they know why the method works.",
      steps: [
        "Write the numbers one under the other, lining up the ones, tens and hundreds.",
        "Add the ones first. If the answer is 10 or more, write the ones digit and exchange 10 ones for 1 ten.",
        "Add the tens, including any exchanged ten. Exchange again if the total is 10 or more.",
        "Add the hundreds, then read the whole answer and check it makes sense.",
      ],
      examples: [
        {
          type: "column",
          title: "Adding with an exchange",
          top: 358,
          bottom: 247,
          op: "+",
          answer: 605,
          note: "8 + 7 = 15, so write 5 and exchange 1 ten.",
        },
        {
          type: "column",
          title: "Adding without an exchange",
          top: 214,
          bottom: 125,
          op: "+",
          answer: 339,
          note: "Each column adds to less than 10.",
        },
      ],
    },
    words: [
      { term: "column", meaning: "A vertical line of digits, such as the ones column or the tens column." },
      { term: "exchange", meaning: "Swap 10 ones for 1 ten, or 10 tens for 1 hundred, so a column does not go over 9." },
      { term: "digit", meaning: "One of the symbols 0 to 9." },
      { term: "estimate", meaning: "A quick, rough answer used to check the real answer is sensible." },
    ],
    atHome: [
      {
        title: "Shop total",
        how: "Pick two prices from a shopping receipt or leaflet. Ask your child to round them and estimate the total, then work out the exact total on paper.",
      },
      {
        title: "Lining up",
        how: "Write two numbers on squared paper, one digit per square. Squares help keep the ones, tens and hundreds in straight lines.",
      },
      {
        title: "Spot the exchange",
        how: "Say two numbers, such as 47 and 36. Ask, \"Will the ones need an exchange?\" Then check by adding. Do three quick ones.",
      },
    ],
    mixUps: [
      {
        mistake: "Numbers not lined up, so the answer is wrong.",
        help: "Say, \"Ones go under ones.\" Squared paper or lined paper turned sideways makes straight columns.",
      },
      {
        mistake: "Forgetting to add the exchanged ten.",
        help: "Ask your child to write a small 1 under the next column straight away, so it cannot be forgotten.",
      },
    ],
    practise: [
      { label: "Practise Calculations", to: "/skills/arithmetic-practice" },
      { label: "Build Numbers with Place Value", to: "/skills/place-value" },
    ],
    schoolsVary: true,
  },

  {
    slug: "column-subtraction",
    title: "Column subtraction",
    subject: "math",
    years: [3, 4],
    summary: "A written way to take away bigger numbers, with exchanging when needed.",
    whatItIs: [
      "Column subtraction is a written method for taking one number away from another. The numbers are lined up with the larger number on top.",
      "You subtract one column at a time, from the right. If the top digit is too small, you exchange: take 1 ten and swap it for 10 ones.",
    ],
    howWeTeach: {
      intro: "We use base ten blocks first, so children can see a ten being swapped for ten ones.",
      steps: [
        "Write the larger number on top and the smaller one underneath, lining up the columns.",
        "Start with the ones. If the top digit is smaller, exchange 1 ten for 10 ones.",
        "Subtract the tens, then the hundreds, exchanging again if the top digit is too small.",
        "Check by adding the answer to the bottom number. You should get the top number.",
      ],
      examples: [
        {
          type: "column",
          title: "Subtracting with exchanges",
          top: 452,
          bottom: 187,
          op: "−",
          answer: 265,
          note: "2 is too small for 7, so exchange 1 ten for 10 ones.",
        },
        {
          type: "equation",
          title: "Check by adding",
          parts: ["265", "+", "187", "=", "452"],
          note: "Adding back shows the answer is right.",
        },
      ],
    },
    words: [
      { term: "exchange", meaning: "Swap 1 ten for 10 ones, or 1 hundred for 10 tens, so you can subtract." },
      { term: "subtract", meaning: "Take one number away from another." },
      { term: "difference", meaning: "How much bigger one number is than another. Also the answer to a subtraction." },
      { term: "inverse", meaning: "The opposite operation. Adding is the inverse of subtracting, so we use it to check." },
    ],
    atHome: [
      {
        title: "Change from a note",
        how: "Pretend your child pays with a £5 note for something that costs £2.35. Ask them to work out the change on paper, in pence.",
      },
      {
        title: "How far to go",
        how: "Look at a road sign or a map. Ask, \"How much further is it from here to there?\" and work out the difference together.",
      },
      {
        title: "Check by adding",
        how: "After any subtraction, ask your child to add the answer to the smaller number. If they reach the first number, it is right.",
      },
    ],
    mixUps: [
      {
        mistake: "Taking the smaller digit from the larger one, such as 2 − 7 becoming 7 − 2.",
        help: "Say, \"The top number must stay on top. Can you exchange a ten to make the ones bigger?\"",
      },
      {
        mistake: "Exchanging but forgetting to cross out and reduce the tens.",
        help: "Remind your child that 1 ten has gone. Ask them to write the new tens digit neatly above the old one.",
      },
    ],
    practise: [
      { label: "Practise Calculations", to: "/skills/arithmetic-practice" },
      { label: "Build Numbers with Place Value", to: "/skills/place-value" },
    ],
    schoolsVary: true,
  },

  {
    slug: "times-tables",
    title: "Times tables",
    subject: "math",
    years: [2, 3, 4],
    summary: "Learning the times tables, and what the Year 4 Multiplication Tables Check involves.",
    whatItIs: [
      "Times tables are the multiplication facts, such as 4 × 3 = 12. Knowing them by heart helps with almost every maths topic later on, from division to fractions.",
      "The National Curriculum sets out which tables to know by the end of each year. Year 2: the 2, 5 and 10 times tables. Year 3: the 3, 4 and 8 times tables. Year 4: all tables up to 12 × 12.",
      "In June of Year 4, children take the Multiplication Tables Check on a screen. It has 25 questions, with 6 seconds to answer each one. It is not a pass or fail test; it helps schools see who needs more practice.",
    ],
    howWeTeach: {
      intro: "We build understanding first, then practise until recall is quick.",
      steps: [
        "Show a times table as equal groups or jumps along a number line.",
        "Spot patterns, such as the 5s ending in 0 or 5.",
        "Link multiplication to division: if 4 × 3 = 12, then 12 ÷ 3 = 4.",
        "Practise little and often, so the answers come without counting.",
      ],
      examples: [
        {
          type: "jumps",
          title: "Jumps of 4",
          terms: ["0", "4", "8", "12", "16", "20"],
          step: "+4",
          note: "3 jumps of 4 land on 12.",
        },
        {
          type: "equation",
          title: "Repeated addition",
          parts: ["3", "×", "4", "=", "4", "+", "4", "+", "4"],
          note: "Multiplying is quick adding.",
        },
      ],
    },
    words: [
      { term: "multiply", meaning: "Find the total of equal groups, like 3 groups of 4." },
      { term: "product", meaning: "The answer to a multiplication." },
      { term: "multiple", meaning: "A number in a times table. 12 is a multiple of 3 and of 4." },
      { term: "factor", meaning: "A number that multiplies with another to make a product. 3 and 4 are factors of 12." },
    ],
    atHome: [
      {
        title: "Chant in the car",
        how: "Count in 3s, 4s or 8s while walking or travelling. Try it forwards, then backwards. Add a clap on each answer for fun.",
      },
      {
        title: "Quick-fire five",
        how: "Ask five questions in a row, such as 6 × 4. Keep it friendly. Praise effort and go back to any your child missed.",
      },
      {
        title: "Find the groups",
        how: "Look for equal groups around the house: eggs in a box, wheels on cars, fingers on hands. Ask, \"How many altogether?\"",
      },
    ],
    mixUps: [
      {
        mistake: "Mixing up facts that sound alike, such as 6 × 8 and 7 × 8.",
        help: "Do not worry. Focus on the tricky facts only. Say them in a pattern, then write them and cover them to test.",
      },
      {
        mistake: "Counting up from 1 for each fact.",
        help: "Ask for the fact one before or after one they know. If 5 × 8 = 40, then 6 × 8 is 8 more.",
      },
    ],
    practise: [
      { label: "Practise Times Tables", to: "/skills/times-tables" },
      { label: "Explore Times Tables", to: "/skills/multiplication-table" },
    ],
    schoolsVary: false,
  },

  {
    slug: "short-multiplication",
    title: "Short multiplication",
    subject: "math",
    years: [4, 5],
    summary: "A written way to multiply a bigger number by a single digit.",
    whatItIs: [
      "Short multiplication is a written method for multiplying a number with two or more digits by a single digit, such as 23 × 4.",
      "You multiply the ones first, then the tens, and so on. If a column gives 10 or more, you exchange: write the ones digit and move the tens into the next column.",
    ],
    howWeTeach: {
      intro: "Children first multiply in parts, so they know the written method is only a shorter way of doing the same thing.",
      steps: [
        "Split the number into tens and ones, then multiply each part.",
        "Write the number with the single digit underneath, lining up the ones.",
        "Multiply the ones. Write the ones digit and exchange the tens into the next column.",
        "Multiply the tens, add the exchanged tens, and write the answer.",
      ],
      examples: [
        {
          type: "steps",
          title: "23 × 4 in short multiplication",
          steps: [
            "Write 23 with 4 underneath.",
            "Ones: 3 × 4 = 12. Write 2 and exchange 1 ten.",
            "Tens: 2 × 4 = 8 tens, plus the 1 ten is 9 tens.",
            "The answer is 92.",
          ],
          note: "The 1 ten moves into the tens column.",
        },
        {
          type: "equation",
          title: "The same sum in parts",
          parts: ["20", "×", "4", "+", "3", "×", "4", "=", "92"],
          note: "80 + 12 = 92.",
        },
      ],
    },
    words: [
      { term: "multiply", meaning: "Find the total of equal groups." },
      { term: "partition", meaning: "Split a number into tens and ones to make it easier to work with." },
      { term: "exchange", meaning: "Move tens into the next column when a column makes 10 or more." },
      { term: "product", meaning: "The answer to a multiplication." },
    ],
    atHome: [
      {
        title: "Multiply in parts",
        how: "Choose a number like 34. Ask your child to multiply the tens, then the ones, then add: 30 × 3 and 4 × 3 gives 102.",
      },
      {
        title: "Packs of things",
        how: "If a pack has 12 stickers and you buy 4 packs, ask how many stickers there are altogether. Let your child choose their own method.",
      },
      {
        title: "Estimate first",
        how: "Before working out 38 × 5, ask for a rough answer. 40 × 5 is 200, so the answer should be near that. Then check.",
      },
    ],
    mixUps: [
      {
        mistake: "Forgetting to add the exchanged tens.",
        help: "Ask, \"Where did the extra ten go?\" Writing the exchanged digit small, above the next column, helps.",
      },
      {
        mistake: "Writing both digits of 12 in the ones column.",
        help: "Say, \"Only one digit goes in each column. Which part belongs here, and which part moves along?\"",
      },
    ],
    practise: [
      { label: "Practise Times Tables", to: "/skills/times-tables" },
      { label: "Practise Calculations", to: "/skills/arithmetic-practice" },
    ],
    schoolsVary: true,
  },

  {
    slug: "short-division",
    title: "Short division",
    subject: "math",
    years: [4, 5],
    summary: "A written way to divide a bigger number by a single digit.",
    whatItIs: [
      "Short division is a written method for dividing a number with two or more digits by a single digit, such as 96 ÷ 4. It is sometimes called the bus stop method.",
      "You divide one place at a time, from the left. If there is a leftover, you exchange it for ten times as many in the next place and keep going.",
    ],
    howWeTeach: {
      intro: "Children learn by sharing objects into equal groups, then move to the written method.",
      steps: [
        "Share a number into equal groups with counters or blocks.",
        "Link division to the times tables, because 24 × 4 = 96 means 96 ÷ 4 = 24.",
        "Write the number under the division bracket with the divisor outside.",
        "Divide each digit in turn, moving any leftover into the next place.",
      ],
      examples: [
        {
          type: "steps",
          title: "96 ÷ 4 in short division",
          steps: [
            "Write 96 under the bracket, with 4 outside.",
            "Tens: 9 ÷ 4 = 2, with 1 ten left over.",
            "Exchange the 1 ten for 10 ones. Now there are 16 ones.",
            "Ones: 16 ÷ 4 = 4. The answer is 24.",
          ],
          note: "The leftover ten moves to the ones.",
        },
        {
          type: "equation",
          title: "Check by multiplying",
          parts: ["24", "×", "4", "=", "96"],
          note: "Multiplying back shows it is right.",
        },
      ],
    },
    words: [
      { term: "divide", meaning: "Share a number into equal groups, or find how many times one number fits into another." },
      { term: "divisor", meaning: "The number you divide by. In 96 ÷ 4 it is 4." },
      { term: "remainder", meaning: "What is left over when a number does not divide exactly." },
      { term: "inverse", meaning: "The opposite operation. Multiplying is the inverse of dividing, so we use it to check." },
    ],
    atHome: [
      {
        title: "Fair shares",
        how: "Share 24 raisins or pasta shapes between 4 people. Ask how many each. Then try 25 and ask what is left over.",
      },
      {
        title: "Tables backwards",
        how: "Turn a times table fact around. If 6 × 7 = 42, ask, \"What is 42 ÷ 7?\" Do three facts a day.",
      },
      {
        title: "Check with times",
        how: "After any division, ask your child to multiply the answer by the divisor. If they reach the starting number, it is correct.",
      },
    ],
    mixUps: [
      {
        mistake: "Dividing the smaller number by the larger, such as 4 ÷ 9.",
        help: "Say, \"The number being shared goes inside the bracket.\" Remind your child that 9 ÷ 4 is the first step.",
      },
      {
        mistake: "Forgetting to move the leftover into the next place.",
        help: "Ask, \"Is there anything left over?\" Writing the leftover as a small digit before the next one helps.",
      },
    ],
    practise: [
      { label: "Practise Times Tables", to: "/skills/times-tables" },
      { label: "Practise Calculations", to: "/skills/arithmetic-practice" },
    ],
    schoolsVary: true,
  },

  {
    slug: "fractions",
    title: "Fractions",
    subject: "math",
    years: [1, 2, 3, 4],
    summary: "Parts of a whole: halves, quarters, thirds and beyond.",
    whatItIs: [
      "A fraction is part of a whole. If a pizza is cut into 4 equal slices, each slice is one quarter, written 1/4.",
      "The bottom number says how many equal parts there are. The top number says how many of those parts we mean.",
    ],
    howWeTeach: {
      intro: "We start with sharing real things and pictures, then move to writing fractions.",
      steps: [
        "Fold, cut and share objects into equal parts. The parts must be equal.",
        "Colour parts of a bar or shape to show a fraction.",
        "Name the fraction: the bottom number counts the parts, the top number counts the shaded ones.",
        "Find a fraction of a number by sharing it, such as half of 8.",
      ],
      examples: [
        {
          type: "bar",
          title: "A quarter and three quarters",
          bars: [
            { parts: 4, shaded: 1, label: "1/4" },
            { parts: 4, shaded: 3, label: "3/4" },
          ],
          note: "Each bar has 4 equal parts.",
        },
        {
          type: "groups",
          title: "Half of 8 apples",
          groups: [["🍎", "🍎", "🍎", "🍎"], ["🍎", "🍎", "🍎", "🍎"]],
          label: "8 apples shared into 2 equal groups of 4",
          note: "Half of 8 is 4.",
        },
      ],
    },
    words: [
      { term: "numerator", meaning: "The top number of a fraction. It tells you how many parts you have." },
      { term: "denominator", meaning: "The bottom number. It tells you how many equal parts make the whole." },
      { term: "equal parts", meaning: "Parts that are exactly the same size." },
      { term: "unit fraction", meaning: "A fraction with 1 on top, like 1/2 or 1/5." },
    ],
    atHome: [
      {
        title: "Cut and share",
        how: "Cut a sandwich, apple or pizza into halves, then quarters. Ask, \"How many quarters make a half?\" Then enjoy eating them.",
      },
      {
        title: "Fraction of a handful",
        how: "Take 12 raisins or buttons. Ask your child to find a half, a quarter and a third by sharing them into equal groups.",
      },
      {
        title: "Fractions in the kitchen",
        how: "Look at a measuring jug or a packet of eggs. Ask, \"Where is half? Where is a quarter?\" Point to them on the scale or box.",
      },
    ],
    mixUps: [
      {
        mistake: "Thinking 1/8 is bigger than 1/4 because 8 is bigger than 4.",
        help: "Say, \"More slices means each slice is smaller.\" Draw two pizzas, one cut into 4 and one into 8.",
      },
      {
        mistake: "Calling unequal parts halves or quarters.",
        help: "Remind your child that the parts must be equal. Ask, \"Are these pieces exactly the same size?\"",
      },
    ],
    practise: [
      { label: "Learn About Fractions", to: "/skills/fraction-fun" },
    ],
    schoolsVary: false,
  },

  {
    slug: "telling-the-time",
    title: "Telling the time",
    subject: "math",
    years: [1, 2, 3],
    summary: "Reading analogue clocks, from o'clock to the nearest minute.",
    whatItIs: [
      "Telling the time means reading a clock face. The short hand shows the hour. The long hand shows the minutes.",
      "Children learn in stages: o'clock and half past in Year 1, quarter past and quarter to and five-minute steps in Year 2, then the nearest minute in Year 3.",
    ],
    howWeTeach: {
      intro: "We practise with a big clock face with moving hands, and talk about the time during the school day.",
      steps: [
        "Look at the short hand first. Which hour has it just passed?",
        "Look at the long hand. Count in fives around the clock face.",
        "Say the minutes with \"past\" for the first half hour and \"to\" for the second.",
        "Later, write the time as a digital time, such as 3:45.",
      ],
      examples: [
        {
          type: "table",
          title: "Where the long hand points",
          headers: ["Long hand points to", "We say"],
          rows: [
            ["12", "o'clock"],
            ["3", "quarter past"],
            ["6", "half past"],
            ["9", "quarter to"],
          ],
          note: "Each number is 5 minutes more.",
        },
        {
          type: "jumps",
          title: "Counting minutes in fives",
          terms: ["0", "5", "10", "15", "20", "25", "30"],
          step: "+5",
          note: "Each number on the clock is 5 minutes.",
        },
      ],
    },
    words: [
      { term: "o'clock", meaning: "On the hour, when the long hand points to 12." },
      { term: "quarter past", meaning: "15 minutes after the hour. The long hand points to 3." },
      { term: "half past", meaning: "30 minutes after the hour. The long hand points to 6." },
      { term: "quarter to", meaning: "15 minutes before the next hour. The long hand points to 9." },
      { term: "analogue", meaning: "A clock with hands and a face, not just numbers." },
    ],
    atHome: [
      {
        title: "Clock check",
        how: "A few times a day, ask your child to read the clock before you say the time. Use a wall clock, not just a phone.",
      },
      {
        title: "Set the hands",
        how: "Say a time, such as quarter past four, and ask your child to show it on a clock or draw it on paper.",
      },
      {
        title: "Time talk",
        how: "Link routines to times. Say, \"We leave at half past eight.\" Ask your child to tell you when the clock shows that time.",
      },
    ],
    mixUps: [
      {
        mistake: "Mixing up the hour and minute hands.",
        help: "Say, \"The short hand is the hour, the long hand is the minutes.\" The short word, hour, goes with the short hand.",
      },
      {
        mistake: "Reading half past 4 as half past 5.",
        help: "The short hand is half way between 4 and 5 but has not reached 5. Ask, \"Which number has it just passed?\"",
      },
    ],
    practise: [
      { label: "Learn to Read Time", to: "/skills/clock-generator" },
    ],
    schoolsVary: false,
  },

  {
    slug: "phonics",
    title: "Phonics",
    subject: "english",
    years: [1, 2],
    summary: "How children learn to read by matching sounds to letters, and what the Year 1 check involves.",
    whatItIs: [
      "Phonics teaches children that letters stand for sounds. A child sounds out a word, such as c-a-t, then blends the sounds together to read it.",
      "Letters sometimes work in groups. For example, the letters sh make one sound, as in ship. These groups are called digraphs.",
      "In June of Year 1, children take the Phonics Screening Check. It is a short, one-to-one check of 40 words, including made-up words known as pseudo words or alien words. Children who do not meet the standard retake it in Year 2.",
    ],
    howWeTeach: {
      intro: "Schools follow a set order, so sounds are taught step by step.",
      steps: [
        "Learn the sounds that single letters make, such as s, a, t and p.",
        "Blend the sounds to read simple words, like s-a-t becoming sat.",
        "Learn groups of letters that make one sound, such as sh, ch, ai and igh.",
        "Read words and sentences, and spell by listening for each sound.",
      ],
      examples: [
        {
          type: "table",
          title: "Letter groups and their sounds",
          headers: ["Letters", "Example word"],
          rows: [
            ["sh", "ship"],
            ["ch", "chop"],
            ["ai", "rain"],
            ["igh", "night"],
          ],
          note: "Two or three letters can make one sound.",
        },
        {
          type: "fix",
          title: "Say the sound, not the name",
          wrong: "Say the letter names: \"see, ay, tee\".",
          right: "Say the sounds: \"k, a, t\".",
          note: "Sounds blend into words. Names do not.",
        },
      ],
    },
    words: [
      { term: "phoneme", meaning: "A single sound in a word. The word cat has three phonemes: c, a and t." },
      { term: "grapheme", meaning: "The letter or letters that show a sound. The letters sh show one sound." },
      { term: "blend", meaning: "Push the sounds together to say a whole word." },
      { term: "digraph", meaning: "Two letters that make one sound, such as ch or ai." },
      { term: "pseudo word", meaning: "A made-up word, such as \"vap\", used to check children can really sound words out." },
    ],
    atHome: [
      {
        title: "Robot talk",
        how: "Say a word in separate sounds, like a robot: \"d-o-g\". Ask your child to blend it into a word. Then swap places.",
      },
      {
        title: "Sound hunt",
        how: "Pick a sound, such as sh. Look around the house for things with that sound in their name, like shoe, dish or shelf.",
      },
      {
        title: "Alien words",
        how: "Make up silly words that follow the rules, such as \"zim\" or \"floop\". Ask your child to read them. This is good practice for the check.",
      },
    ],
    mixUps: [
      {
        mistake: "Guessing a word from the first letter or the picture.",
        help: "Say, \"Let us sound it out together.\" Point under each sound, then blend. Praise the sounding out, not just the answer.",
      },
      {
        mistake: "Adding an extra sound, such as saying \"muh\" or \"suh\" with a long vowel.",
        help: "Keep letter sounds short and crisp. Say \"mmm\", not \"muh\". Ask your child's teacher to model the sounds if unsure.",
      },
    ],
    practise: [
      { label: "Practise Spelling", to: "/skills/word-builder" },
      { label: "Read Common Words", to: "/skills/sight-word-pop" },
    ],
    schoolsVary: false,
  },

  {
    slug: "reading-at-home",
    title: "Reading at home",
    subject: "english",
    years: [1, 2, 3, 4, 5, 6],
    summary: "Simple ways to help your child enjoy reading and understand what they read.",
    whatItIs: [
      "Reading at home helps children read more fluently, learn new words and enjoy stories. Ten minutes a day makes a real difference.",
      "It does not need to be a school book. Comics, recipes, signs, information books and stories read aloud all count.",
    ],
    howWeTeach: {
      intro: "In school, children read aloud, read quietly, and talk about books in groups.",
      steps: [
        "Read aloud in short bursts, with a grown-up helping when a word is tricky.",
        "Re-read favourite pages to build smooth, confident reading.",
        "Talk about the book before, during and after reading.",
        "Link new words and ideas to things the child already knows.",
      ],
      examples: [
        {
          type: "steps",
          title: "A good ten minutes",
          steps: [
            "Look at the cover and guess what the book is about.",
            "Read a few pages. Help if your child is stuck.",
            "Stop and ask, \"What do you think happens next?\"",
            "Talk about a favourite part when you finish.",
          ],
          note: "Little and often works best.",
        },
      ],
    },
    words: [
      { term: "fluency", meaning: "Reading smoothly and at a good pace, without stopping at every word." },
      { term: "comprehension", meaning: "Understanding what you have read." },
      { term: "vocabulary", meaning: "All the words a person knows and can use." },
      { term: "predict", meaning: "Guess what will happen next, using clues from the text." },
    ],
    atHome: [
      {
        title: "Read it together",
        how: "Take turns reading a page each, or read a sentence each. Older readers can read a chapter aloud while you listen.",
      },
      {
        title: "Ask three questions",
        how: "After reading, ask: Who was in it? What happened? How did it end? Short answers are fine. You are building the habit.",
      },
      {
        title: "Word of the day",
        how: "Pick one new or tricky word from the book. Say what it means. See if you can both use it before bedtime.",
      },
      {
        title: "Read everywhere",
        how: "Ask your child to read signs, menus, packets and instructions. It is real reading and shows why it matters.",
      },
    ],
    mixUps: [
      {
        mistake: "Your child skips words or guesses from the picture.",
        help: "Say, \"Let us look at the word again.\" Sound it out together and read the sentence once more to check it makes sense.",
      },
      {
        mistake: "Your child reads smoothly but cannot say what happened.",
        help: "Slow down and stop after each page. Ask, \"What was that part about?\" Re-read together if needed.",
      },
    ],
    practise: [
      { label: "Read Stories", to: "/skills/speed-reader" },
      { label: "Read Common Words", to: "/skills/sight-word-pop" },
    ],
    schoolsVary: false,
  },

  {
    slug: "grammar-words",
    title: "Grammar words",
    subject: "english",
    years: [3, 4, 5, 6],
    summary: "The grammar terms your child brings home, each explained with a tiny example.",
    whatItIs: [
      "From Year 2 onwards, children learn the names of grammar parts, so they can talk about how sentences work and make their writing better.",
      "These names can look strange to parents. This page explains the most common ones with a tiny example each. Children do not need to know every term at once.",
    ],
    howWeTeach: {
      intro: "We spot the grammar in real sentences, then try it in our own writing.",
      steps: [
        "Read a sentence and find the part we are learning about.",
        "Say what job that part does in the sentence.",
        "Change the part and see how the meaning changes.",
        "Use it in our own writing.",
      ],
      examples: [
        {
          type: "sentence",
          title: "Fronted adverbial",
          text: "**Before lunch**, we read a story.",
          note: "It starts the sentence and tells us when.",
        },
        {
          type: "sentence",
          title: "Subordinate clause",
          text: "We stayed inside **because it was raining**.",
          note: "It cannot stand alone as a sentence.",
        },
      ],
    },
    words: [
      { term: "fronted adverbial", meaning: "Words at the start of a sentence saying when, where or how. \"Later that day, we left.\"" },
      { term: "determiner", meaning: "A small word before a noun showing which one. \"The dog\", \"my coat\", \"those boots\"." },
      { term: "subordinate clause", meaning: "Extra information that needs a main clause. \"We left because it was late.\"" },
      { term: "expanded noun phrase", meaning: "A noun with added describing words. \"The tall, friendly dog\" instead of \"the dog\"." },
      { term: "modal verb", meaning: "A helper verb showing how likely something is. \"It might rain.\" \"You must go.\"" },
      { term: "preposition", meaning: "A word showing where or when something is. \"On the table\", \"after school\"." },
    ],
    atHome: [
      {
        title: "Build a noun phrase",
        how: "Pick a plain word, such as \"cat\". Take turns adding describing words: \"the fluffy cat\", \"the fluffy, sleepy ginger cat\". See how long you can go.",
      },
      {
        title: "Start differently",
        how: "Say a plain sentence like \"We went home\". Ask your child to start with when, where or how: \"After school, we went home.\"",
      },
      {
        title: "Might or must?",
        how: "Talk about things that might, could or must happen today. Ask your child to say each one with a different modal verb.",
      },
    ],
    mixUps: [
      {
        mistake: "Mixing up a clause and a phrase.",
        help: "A clause has a verb (\"it rained\"). A phrase does not (\"after the game\"). Ask, \"Is there a doing word in it?\"",
      },
      {
        mistake: "Not knowing which word is the determiner.",
        help: "Say, \"Look for the small word just before the noun.\" Try it with the, a, my, this or some.",
      },
    ],
    practise: [
      { label: "Sort Word Types", to: "/skills/word-sorter" },
      { label: "Build Sentences", to: "/skills/sentence-builder" },
    ],
    schoolsVary: false,
  },
];

// Which curriculum-guide areas each explainer belongs to, matched against the
// area's category id within the explainer's years. Category ids differ between
// years, so a pattern keeps one rule per explainer.
const GUIDE_STRANDS = {
  "number-bonds": /addition/,
  "place-value": /place-value/,
  "column-addition": /addition/,
  "column-subtraction": /addition/,
  "times-tables": /multiplication/,
  "short-multiplication": /multiplication/,
  "short-division": /division/,
  "fractions": /fractions/,
  "telling-the-time": /measurement/,
  "phonics": /phonics|sounds/,
  "reading-at-home": /^reading/,
  "grammar-words": /^grammar/,
};

// Slugs a teacher has content-reviewed. Only these are public, indexed pages;
// the rest stay reachable by link but `noindex` (owner decision 2026-11-09).
const REVIEWED = new Set([]);

export const PARENT_GUIDES_PATH = "/parent-guides";
export const parentGuidePath = (slug) => `${PARENT_GUIDES_PATH}/${slug}`;
export const findParentExplainer = (slug) => PARENT_EXPLAINERS.find((explainer) => explainer.slug === slug) ?? null;
export const isExplainerPublic = (explainer) => REVIEWED.has(explainer.slug);

/** Explainers to link from one area of a curriculum guide. */
export function explainersForGuideArea(year, subject, categoryId) {
  return PARENT_EXPLAINERS.filter((explainer) => explainer.subject === subject
    && explainer.years.includes(Number(year)) && GUIDE_STRANDS[explainer.slug]?.test(categoryId));
}
