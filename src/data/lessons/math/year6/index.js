import { table, steps, jumps } from "../../topicLessons.js";

// Independently authored examples for the four Number and place value pilots.
// Statutory scope: docs/curriculum/year-6-maths.md, Number – number and place value.
const lesson = (title, lines, { note, ...example }) => ({
  title,
  lines: [...lines, note],
  example,
});

export const YEAR6_MATH_LESSONS = {
  "place-value-to-ten-million": [
    lesson("Read each digit's value", [
      "Read the chart from the largest place to the ones.",
      "Zero holds an empty place; it does not remove that column.",
    ], table("Seven digits, then eight", ["Number", "Ten millions", "Millions", "Hundred thousands", "Ten thousands", "Thousands", "Hundreds", "Tens", "Ones"], [
      ["6,204,035", "0", "6", "2", "0", "4", "0", "3", "5"],
      ["10,000,000", "1", "0", "0", "0", "0", "0", "0", "0"],
    ], "In 6,204,035, the 2 is worth 200,000. Ten million needs the next column.")),
    lesson("Compare the first different digits", [
      "When reading words, write millions, thousands and the remaining part in their places.",
      "Start at the largest place and move right until the digits differ.",
    ], table("Which number is greater?", ["Number", "Millions", "Hundred thousands", "Ten thousands", "Thousands"], [
      ["4,735,200", "4", "7", "3", "5"],
      ["4,753,020", "4", "7", "5", "3"],
    ], "Four million, seven hundred and fifty-three thousand and twenty is 4,753,020: greater than 4,735,200.")),
    lesson("Order the whole set", [
      "Ascending order goes from smallest to greatest.",
      "Compare matching places carefully, then check every neighbouring pair.",
    ], jumps("Smallest to greatest", ["2,045,600", "2,054,600", "2,405,600", "2,450,600"], null,
      "All have 2 million; the hundred-thousands and ten-thousands places decide their order.")),
    lesson("Reconstruct a population count", [
      "Read the digit belonging to each place in the region's population.",
      "Write every digit in order, including zeros for empty places.",
    ], table("An imaginary region's population", ["Place", "Digit"], [
      ["Millions", "8"], ["Hundred thousands", "0"], ["Ten thousands", "4"],
      ["Thousands", "6"], ["Hundreds", "2"], ["Tens", "5"], ["Ones", "0"],
    ], "These place-value digits give 8,046,250 people. The zeros hold the hundred-thousands and ones places.")),
  ],
  "rounding-whole-numbers": [
    lesson("Find the nearest multiple", [
      "Locate the number between two neighbouring multiples on the number line.",
      "Choose the nearer end; halfway between positive multiples rounds up.",
    ], table("Bounds and halfway points", ["Round to", "Lower end", "Midpoint", "Upper end", "Worked answer"], [
      ["10", "6,240", "6,245", "6,250", "6,247 → 6,250"],
      ["100", "6,200", "6,250", "6,300", "6,247 → 6,200"],
      ["1,000", "6,000", "6,500", "7,000", "6,247 → 6,000"],
    ], "The same number rounds differently when the required place changes.")),
    lesson("Round at larger places", [
      "Name the required place before deciding which digits matter.",
      "Check the next digit, then replace all smaller places with zeros.",
    ], table("Round 3,684,251", ["Required accuracy", "Next digit", "Rounded number"], [
      ["Nearest 10,000", "4", "3,680,000"],
      ["Nearest 100,000", "8", "3,700,000"],
      ["Nearest 1,000,000", "6", "4,000,000"],
    ], "A next digit of 5 or more rounds up, even when this changes a larger place.")),
    lesson("Group by rounded outcome", [
      "Round every number to the same required accuracy before grouping it.",
      "Check the halfway boundary carefully; nearby numbers can round to different outcomes.",
    ], table("Sort to the nearest 100,000", ["Rounded outcome", "Numbers in this group"], [
      ["2,300,000", "2,270,000; 2,349,999"],
      ["2,400,000", "2,350,000; 2,419,000"],
    ], "2,350,000 is exactly halfway between 2,300,000 and 2,400,000, so it belongs in the higher group.")),
    lesson("Choose a useful report", [
      "Read the accuracy requested by the report.",
      "Keep the exact count for calculations that require every item.",
    ], steps("Report a museum's visitors", [
      "A museum records 1,748,620 visits in a year.",
      "The report asks for the nearest 100,000: compare 1,700,000 and 1,800,000.",
      "The midpoint is 1,750,000; the count is below it.",
      "Report about 1,700,000 visits.",
    ], "A rounded report gives an approximate count, so include the word ‘about’.")),
  ],
  "negative-numbers-and-intervals": [
    lesson("Track a temperature change", [
      "A rise moves towards greater temperatures; a fall moves towards smaller temperatures.",
      "When crossing zero, keep counting the gaps in the same direction.",
    ], jumps("A rise of 5°C", ["−3°C", "−2°C", "−1°C", "0°C", "1°C", "2°C"], "+1°C",
      "Starting at −3°C and rising by 5°C gives 2°C: there are five gaps, not six.")),
    lesson("Measure the interval across zero", [
      "An interval measures the distance between two values.",
      "Across zero, add the distance to zero and the distance from zero.",
    ], steps("From −7°C to 5°C", [
      "From −7°C to 0°C is 7 degrees.",
      "From 0°C to 5°C is 5 degrees.",
      "The interval is 7 + 5 = 12 degrees.",
    ], "The interval is positive whichever endpoint you start from; 5 − 7 would not measure this distance.")),
    lesson("Order signed temperatures", [
      "Order from coldest to warmest by moving from smaller to greater values.",
      "Below zero, a value farther from zero is colder.",
    ], jumps("Coldest to warmest", ["−12°C", "−5°C", "−1°C", "0°C", "4°C"], null,
      "−12°C is colder than −5°C, although 12 is greater than 5.")),
    lesson("Use negative floors in context", [
      "Floor 0 is the ground floor; negative floor numbers are below it.",
      "Separate the direction of travel from the number of floors travelled.",
    ], steps("A lift goes up", [
      "A lift starts on floor −4 and finishes on floor 3.",
      "From floor −4 to floor 0 is 4 floors up.",
      "From floor 0 to floor 3 is 3 more floors up.",
      "The lift travels 7 floors up and finishes on floor 3.",
    ], "The finishing floor is 3; the distance travelled is 7 floors. They answer different questions.")),
  ],
  "place-value-problems": [
    lesson("Track changes to large counts", [
      "Read whether the count increases or decreases before choosing an operation.",
      "Keep equal place values aligned, including the zeros.",
    ], table("A warehouse's stock count", ["Stage", "Change", "Count"], [
      ["Start", "—", "4,250,000"],
      ["Delivery arrives", "+300,000", "4,550,000"],
      ["Items sent out", "−70,000", "4,480,000"],
    ], "Adding 300,000 changes the hundred-thousands count; subtracting 70,000 removes seven ten thousands.")),
    lesson("Round a contextual count", [
      "Find the accuracy requested before rounding a large count.",
      "Use the halfway point between the two neighbouring multiples.",
    ], steps("Report a website's visits", [
      "A website records 2,372,410 visits. Round to the nearest 100,000.",
      "The neighbouring multiples are 2,300,000 and 2,400,000.",
      "The midpoint is 2,350,000; the count is above it.",
      "The rounded count is about 2,400,000 visits.",
    ], "Name the required place first. A rounded count is approximate, so label it ‘about’.")),
    lesson("Rank populations accurately", [
      "Keep each population attached to its region while ordering.",
      "For smallest first, compare from the largest place and put the smallest count at the top.",
    ], table("Imaginary regions, smallest first", ["Rank", "Region", "Population"], [
      ["1", "Northland", "5,240,600"],
      ["2", "Eastland", "5,402,600"],
      ["3", "Westland", "5,420,060"],
    ], "Westland and Eastland both have 5.4 million, so compare their ten-thousands digits to separate them.")),
    lesson("Plan a multi-step count", [
      "Write what each intermediate count represents.",
      "Check the final count against the original total and every change.",
    ], steps("Find the remaining leaflets", [
      "A campaign prints 6,250,000 leaflets, then prints another 750,000.",
      "The available total is 6,250,000 + 750,000 = 7,000,000.",
      "It distributes 2,480,000: 7,000,000 − 2,480,000 = 4,520,000 remain.",
      "Check: 4,520,000 + 2,480,000 = 7,000,000.",
    ], "Use the updated total in the second step, then reverse the subtraction to check.")),
  ],
};
