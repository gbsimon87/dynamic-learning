import { topicLessons as lesson, equation as e, table as t, steps, jumps } from "../../topicLessons.js";

// Number teaching follows the topic mapping in docs/curriculum/year-5-maths.md.
export const NUMBER_LESSONS = {
  "place-value-to-a-million": lesson("Read each digit's place", ["A digit's position tells you its value.", "Use zero to hold any empty place."], [
    t("Read 608,241", ["Hundred thousands", "Ten thousands", "Thousands", "Hundreds", "Tens", "Ones"], [["6", "0", "8", "2", "4", "1"]], "The 6 is worth 600,000; the 8 is worth 8,000."),
    e("Split the place values", ["600000", "+", "8000", "+", "200", "+", "40", "+", "1", "=", "608241"], "Add the values to rebuild the original number."),
    t("Keep empty places", ["Hundred thousands", "Ten thousands", "Thousands", "Hundreds", "Tens", "Ones"], [["3", "0", "5", "0", "0", "8"]], "Three hundred and five thousand and eight is written 305,008."),
    steps("Change one place", ["Start with 608,241.", "Add one ten thousand: 10,000.", "The result is 618,241."], "Read the place before deciding how much a digit changes."),
  ]),
  "ordering-and-comparing-numbers-to-a-million": lesson("Compare from the largest place", ["Compare the largest place values first.", "When digits match, move one place to the right."], [
    e("Compare the hundred thousands", ["582140", ">", "482140"], "Five hundred thousands is greater than four hundred thousands."),
    t("Find the first difference", ["Number", "Hundred thousands", "Ten thousands", "Thousands"], [["362,810", "3", "6", "2"], ["369,120", "3", "6", "9"]], "The thousands decide: 369,120 is larger."),
    jumps("Smallest to greatest", ["209,800", "210,080", "210,800", "218,000"], null, "Ascending order starts with the smallest number."),
    e("Read the comparison", ["705090", "<", "750009"], "The point of the less-than sign faces the smaller value."),
  ]),
  "counting-in-steps-and-number-sequences": lesson("Follow the same step", ["A sequence follows a rule from one term to the next.", "Check whether the values increase or decrease."], [
    jumps("Add 10,000 each time", ["124000", "134000", "144000", "154000"], "+10000", "A step can change several digits when you cross a place-value boundary."),
    jumps("Subtract 1,000 each time", ["4500", "3500", "2500", "1500"], "−1000", "A decreasing sequence moves down by the same amount each time."),
    steps("Find a missing term", ["The sequence is 3.2, 3.4, blank, 3.8.", "Each step adds 0.2.", "3.4 + 0.2 = 3.6."], "Check the term after the gap as well as the term before it."),
    e("Count several steps", ["260000", "+", "3", "×", "10000", "=", "290000"], "Three equal steps can be calculated by multiplication."),
  ]),
  "negative-numbers-and-counting-through-zero": lesson("Count through zero", ["Negative numbers lie below zero.", "Count each step, including the step to or from zero."], [
    jumps("Count on from −3", ["−3", "−2", "−1", "0", "1"], "+1", "Counting on moves towards larger numbers."),
    jumps("Count back from 2", ["2", "1", "0", "−1", "−2"], "−1", "Counting back can continue below zero."),
    steps("Find a temperature rise", ["The temperature rises from −4°C to 3°C.", "From −4 to 0 is 4 degrees.", "From 0 to 3 is 3 degrees: 7 degrees altogether."], "Count the gaps between numbers rather than counting the starting number."),
    steps("Use a negative context", ["A lift starts on floor 2.", "It goes down 5 floors.", "It finishes on floor −3."], "Passing zero does not stop the count."),
  ]),
  "rounding-large-numbers": lesson("Find the nearest multiple", ["Find the two multiples on either side of the number.", "Choose the nearer one; halfway rounds up for these positive numbers."], [
    t("Round 364,200 to 10,000", ["Lower multiple", "Number", "Upper multiple"], [["360,000", "364,200", "370,000"]], "364,200 is closer to 360,000."),
    steps("Round to 100,000", ["The number is 670,000.", "It lies between 600,000 and 700,000.", "It is closer to 700,000."], "Check the digit immediately to the right of the rounding place."),
    t("One number, different accuracy", ["Number", "Nearest 100", "Nearest 1,000"], [["28,461", "28,500", "28,000"]], "The requested place determines the rounded answer."),
    steps("Round a halfway value", ["Round 245,000 to the nearest 10,000.", "It is halfway between 240,000 and 250,000.", "Round up to 250,000."], "A 5 in the next place tells us to round up."),
  ]),
  "roman-numerals-to-1000": lesson("Read Roman numerals", ["Roman numerals combine symbols rather than using place-value digits.", "A smaller symbol before a larger one can mean subtract."], [
    t("Learn the larger symbols", ["Symbol", "Value"], [["L", "50"], ["C", "100"], ["D", "500"], ["M", "1,000"]], "Roman numerals do not use zero as a placeholder."),
    t("Compare addition and subtraction", ["Numeral", "Value"], [["VI", "5 + 1 = 6"], ["IV", "5 − 1 = 4"], ["XC", "100 − 10 = 90"]], "The order of the symbols changes the value."),
    e("Build a larger numeral", ["D", "+", "CC", "+", "XL", "+", "VIII", "=", "DCCXLVIII"], "DCCXLVIII represents 500 + 200 + 40 + 8: 748."),
    t("Read a year", ["Part", "Value"], [["M", "1,000"], ["CM", "900"], ["XC", "90"], ["IV", "4"]], "MCMXCIV represents the year 1994."),
  ]),
  "large-number-problems": lesson("Use place value in problems", ["Read what the number represents before calculating.", "Choose the operation and keep track of each place value."], [
    e("Tickets across two days", ["240000", "+", "30000", "=", "270000"], "An extra 30,000 adds three ten thousands."),
    t("Compare two totals", ["Town", "Population"], [["Oakford", "318,400"], ["Willow Bay", "381,040"]], "The ten-thousands digits show that Willow Bay has the larger population."),
    steps("Find an unknown start", ["A total grows by 20,000 to reach 460,000.", "Undo the increase by subtracting.", "460,000 − 20,000 = 440,000."], "An inverse operation can find a missing starting value."),
    steps("Check an approximate report", ["A visitor total is 716,200.", "To the nearest 100,000 it is 700,000.", "The rounded value is useful for a rough report."], "An estimate should use the accuracy requested by the problem."),
  ]),
  "column-addition-and-subtraction-with-large-numbers": lesson("Line up the place values", ["Put digits with the same place value in the same column.", "Work from the ones column and exchange when needed."], [
    { type: "column", title: "Add in columns", top: 42618, bottom: 23547, op: "+", answer: 66165, note: "Exchange ten ones for one ten when 8 + 7 makes 15." },
    { type: "column", title: "Subtract in columns", top: 75032, bottom: 18416, op: "−", answer: 56616, note: "Exchange from a larger place when there are not enough digits in a column." },
    steps("Keep each place aligned", ["Write 123,450 above 26,708.", "Line up ones under ones.", "Add from the right: the sum is 150,158."], "Different-length numbers still line up at the ones column."),
    e("Check by the inverse", ["56616", "+", "18416", "=", "75032"], "Adding the subtracted amount back should recover the starting number."),
  ]),
  "mental-addition-and-subtraction-with-large-numbers": lesson("Use friendly number parts", ["Partition a number into parts that are easy to calculate.", "You can adjust a nearby round number, then compensate."], [
    e("Add in parts", ["48000", "+", "23000", "=", "71000"], "Think 48 thousands plus 23 thousands."),
    steps("Adjust a near multiple", ["Work out 64,000 + 9,900.", "Add 10,000 to get 74,000.", "Subtract the extra 100: 73,900."], "Compensation undoes the adjustment you made."),
    steps("Subtract in parts", ["Work out 92,000 − 24,000.", "Subtract 20,000 to get 72,000.", "Subtract 4,000 more to get 68,000."], "Keep track of all the parts you have subtracted."),
    e("Use a known difference", ["305000", "−", "99000", "=", "206000"], "Subtract 100,000, then add back 1,000."),
  ]),
  "rounding-to-check-answers": lesson("Estimate before checking", ["Round to nearby numbers that are easy to calculate.", "An estimate checks whether an exact answer is a sensible size."], [
    e("Estimate a sum", ["48000", "+", "31000", "=", "79000"], "48,240 + 30,810 should be close to 79,000."),
    t("Compare exact and estimated", ["Calculation", "Estimate", "Exact answer"], [["72,118 − 18,940", "72,000 − 19,000 = 53,000", "53,178"]], "An exact answer near the estimate is plausible, but still needs checking."),
    steps("Spot an impossible result", ["Estimate 39,700 + 20,200 as 40,000 + 20,000.", "The estimate is 60,000.", "An answer near 600,000 is much too large."], "A place-value error can make an answer ten times too large."),
    steps("Choose useful accuracy", ["A shop expects about 2,000 visitors each day.", "For three days, estimate 3 × 2,000.", "The rough total is 6,000 visitors."], "Use rounded numbers for a rough check, not when an exact count is required."),
  ]),
  "multi-step-addition-and-subtraction-problems": lesson("Plan each calculation", ["A multi-step problem needs more than one calculation.", "Write what each intermediate answer means."], [
    steps("Find a total, then subtract", ["A hall has 12,400 tickets and receives 3,600 more.", "12,400 + 3,600 = 16,000.", "It sells 5,750: 16,000 − 5,750 = 10,250 left."], "The first answer becomes the starting number for the next step."),
    t("Track a changing total", ["Stage", "Amount"], [["Start", "45,000"], ["Add 8,000", "53,000"], ["Subtract 12,000", "41,000"]], "A table helps keep the operations in the story's order."),
    steps("Find what is missing", ["A target is 80,000 points.", "Two teams have 32,500 and 28,750 points.", "80,000 − 61,250 = 18,750 more points are needed."], "Find the combined total before comparing it with the target."),
    e("Check the final total", ["10250", "+", "5750", "=", "12400", "+", "3600"], "Both sides describe the same number of tickets."),
  ]),
  "multiples-and-factors": lesson("Explore multiplication relationships", ["Factors multiply together to make a number.", "Multiples are the results of multiplying a number by whole numbers."], [
    t("Factor pairs of 24", ["Factor", "Partner"], [["1", "24"], ["2", "12"], ["3", "8"], ["4", "6"]], "Every pair multiplies to 24."),
    jumps("Multiples of 7", ["7", "14", "21", "28", "35"], "+7", "Adding 7 each time produces multiples of 7."),
    t("Find common factors", ["Number", "Factors"], [["12", "1, 2, 3, 4, 6, 12"], ["18", "1, 2, 3, 6, 9, 18"]], "The common factors of 12 and 18 are 1, 2, 3 and 6."),
    e("Use a factor relationship", ["6", "×", "8", "=", "48"], "Six and eight are factors of 48; 48 is a multiple of both."),
  ]),
  "prime-and-composite-numbers": lesson("Count a number's factors", ["A prime number has exactly two positive factors: one and itself.", "A composite number has more than two positive factors. One is neither."], [
    t("Compare factor lists", ["Number", "Factors", "Kind"], [["13", "1, 13", "prime"], ["15", "1, 3, 5, 15", "composite"], ["1", "1", "neither"]], "Check the number of different factors, not just whether a number is odd."),
    steps("Test a number", ["Test 21 for small factors.", "21 = 3 × 7.", "It has factors besides 1 and 21, so it is composite."], "Finding one extra factor proves a number is not prime."),
    e("Prime factors", ["2", "×", "3", "×", "3", "=", "18"], "Each factor in this product is prime."),
    t("An important exception", ["Number", "Observation"], [["2", "The only even prime."], ["9", "Odd, but composite: 3 × 3."]], "Being odd does not guarantee that a number is prime."),
  ]),
  "written-multiplication": lesson("Multiply one column at a time", ["Start with the ones and work towards the largest place.", "Exchange tens into the next column when needed."], [
    steps("Multiply 236 by 4", ["4 × 6 = 24: write 4 ones and exchange 20 ones for 2 tens.", "4 × 3 tens + 2 tens = 14 tens.", "4 × 2 hundreds + 1 hundred = 9 hundreds."], "The product is 944."),
    e("Partition to check", ["200", "×", "4", "+", "30", "×", "4", "+", "6", "×", "4", "=", "944"], "The partitioned products match the written multiplication."),
    steps("Keep a zero placeholder", ["Work out 2,304 × 3.", "Multiply each place, including the zero hundreds.", "The product is 6,912."], "A zero digit still has a place in the calculation."),
    e("Check with division", ["944", "÷", "4", "=", "236"], "Division can undo multiplication to check the result."),
  ]),
  "long-multiplication": lesson("Multiply by ones and tens", ["Split a two-digit multiplier into its ones and tens.", "Add the two partial products to find the total."], [
    t("Split 23 into 20 and 3", ["Part", "Product"], [["146 × 3", "438"], ["146 × 20", "2,920"], ["Total", "3,358"]], "Multiplying by 20 gives tens, so its partial product ends in zero."),
    e("Add both partial products", ["2920", "+", "438", "=", "3358"], "Both parts are needed because 23 means 20 plus 3."),
    steps("Multiply 208 by 14", ["208 × 4 = 832.", "208 × 10 = 2,080.", "832 + 2,080 = 2,912."], "Keep the tens row aligned with the correct place values."),
    e("Estimate the product", ["200", "×", "15", "=", "3000"], "208 × 14 being close to 3,000 is a sensible size check."),
  ]),
  "mental-multiplication-and-division": lesson("Use facts you already know", ["Known multiplication facts help with larger numbers.", "Partition, double or halve to make a calculation easier."], [
    e("Scale a known fact", ["8", "×", "7", "=", "56"], "Eight times seventy is ten times as much: 560."),
    steps("Multiply by 6 mentally", ["Work out 25 × 6.", "25 × 3 = 75.", "Double 75 to get 150."], "Doubling one factor doubles the product."),
    e("Use an inverse fact", ["560", "÷", "8", "=", "70"], "Division and multiplication describe the same number relationship."),
    steps("Split a division", ["Work out 96 ÷ 4.", "80 ÷ 4 = 20 and 16 ÷ 4 = 4.", "20 + 4 = 24."], "Both parts must be divided by the same divisor."),
  ]),
  "short-division-and-remainders": lesson("Divide and exchange", ["Work from the largest place value in short division.", "Exchange any remainder into the next smaller place."], [
    steps("Divide 648 by 3", ["6 hundreds ÷ 3 = 2 hundreds.", "4 tens ÷ 3 = 1 ten, with 1 ten left.", "18 ones ÷ 3 = 6 ones."], "The quotient is 216."),
    e("Check a remainder", ["7", "×", "13", "+", "4", "=", "95"], "95 ÷ 7 is 13 remainder 4; the remainder must be less than 7."),
    steps("Share items fairly", ["29 pencils are shared between 4 pots.", "Each pot gets 7 pencils.", "1 pencil remains."], "A remainder can mean items left over."),
    steps("Round up for a context", ["29 pupils need cars with 4 seats each.", "7 cars seat only 28 pupils.", "8 cars are needed."], "The context decides whether the remainder needs an extra group."),
  ]),
  "multiplying-and-dividing-by-10-100-and-1000": lesson("Scale each digit's value", ["Multiplying by ten makes each digit's value ten times as large.", "Dividing by ten makes each digit's value ten times as small."], [
    t("Track a digit", ["Calculation", "Result"], [["6.37 × 10", "63.7"], ["6.37 × 100", "637"], ["6.37 × 1,000", "6,370"]], "The digits change place value; the decimal point stays between ones and tenths."),
    e("Divide by 100", ["482", "÷", "100", "=", "4.82"], "Each digit becomes worth one hundredth as much."),
    t("Keep placeholders", ["Calculation", "Result"], [["7 ÷ 100", "0.07"], ["0.7 × 1,000", "700"]], "Zero holds a place when there is no digit with that value."),
    e("Undo a scale change", ["3.45", "×", "1000", "÷", "1000", "=", "3.45"], "Multiplying and dividing by the same non-zero number are inverse operations."),
  ]),
  "square-and-cube-numbers": lesson("Multiply equal factors", ["Squaring a number means multiplying it by itself.", "Cubing means multiplying three copies of that number."], [
    e("A square number", ["6", "×", "6", "=", "36"], "Six squared is written 6² and equals 36."),
    t("Compare square and cube", ["Expression", "Product", "Value"], [["3²", "3 × 3", "9"], ["3³", "3 × 3 × 3", "27"]], "The small raised number tells you how many copies are multiplied."),
    e("A cube number", ["4", "×", "4", "×", "4", "=", "64"], "Four cubed is not four times three."),
    jumps("Some square numbers", ["1", "4", "9", "16", "25", "36"], null, "Square numbers do not increase by the same step each time."),
  ]),
  "scaling-and-rate-problems": lesson("Keep the same relationship", ["A scale factor multiplies related amounts by the same factor.", "A rate compares an amount with a unit such as one hour."], [
    t("Scale a recipe", ["Ingredient", "For 2 people", "For 6 people"], [["Rice", "150 g", "450 g"], ["Peas", "80 g", "240 g"]], "Three times as many people need three times each ingredient."),
    e("Use a rate", ["12", "×", "4", "=", "48"], "At 12 pages each hour, four hours gives 48 pages."),
    steps("Scale down", ["A recipe for 8 people uses 600 g of rice.", "Four people is half as many.", "600 ÷ 2 = 300 g."], "A fractional scale factor makes each related amount smaller."),
    steps("Find the unit rate", ["Five identical notebooks cost £15.", "£15 ÷ 5 = £3 each.", "Eight notebooks cost 8 × £3 = £24."], "Finding one unit can help you calculate another quantity."),
  ]),
  "four-operations-and-the-equals-sign": lesson("Keep both sides equal", ["The equals sign means both sides have the same value.", "Choose operations that match the story and any grouping shown."], [
    e("Equal expressions", ["7", "×", "8", "=", "50", "+", "6"], "An equals sign can join two calculations, not just a calculation and an answer."),
    steps("Find a missing number", ["The equation is 9 × 6 = 30 + blank.", "9 × 6 = 54.", "54 − 30 = 24, so the blank is 24."], "Work out the known side, then find what balances the other side."),
    steps("Choose two operations", ["Four boxes hold 12 shells each.", "4 × 12 = 48 shells.", "After giving away 9, 39 shells remain."], "Use the meaning of each step to choose its operation."),
    e("Check by reversing", ["39", "+", "9", "=", "4", "×", "12"], "Reverse the last change to check the original total."),
  ]),
};
