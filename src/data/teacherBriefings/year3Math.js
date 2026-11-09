/**
 * Teacher subject-knowledge briefings for Year 3 Maths, one per topic id.
 *
 * These notes are authored for teachers and have NOT been content-reviewed yet.
 * Each `statutory` string is quoted verbatim from the programme of study in
 * docs/curriculum/year-3-maths.md (the PDF text). Never paraphrase or alter it:
 * a test checks every quote against that file.
 *
 * Shape of each entry:
 *   statutory: 1-2 verbatim quotes
 *   inBrief: the essential idea
 *   keyFacts: 3-5 subject-knowledge points
 *   misconceptions: [{ mistake, why, response }]
 *   vocabulary: [{ term, meaning }]
 *   before / next: Year 2 prior learning and the Year 4 destination
 */
export const YEAR3_MATH_BRIEFINGS = {
  // ---------------------------------------------------------------- Number and place value
  "counting-in-multiples-of-4-8-50-and-100": {
    statutory: ["count from 0 in multiples of 4, 8, 50 and 100"],
    inBrief: "Counting in equal steps is repeated addition. It builds fluency for the 4 and 8 times tables and shows how 50s and 100s fit the place-value system.",
    keyFacts: [
      "Count forwards and backwards from 0 using bead strings, number lines and hundred squares, saying each multiple aloud.",
      "Multiples of 4 are always even, and the ones digits cycle 4, 8, 2, 6, 0. Multiples of 8 are double the multiples of 4: 8, 16, 24, 32, 40.",
      "Counting in 50s alternates 50, 100, 150, 200, so the ones digit is always 0 and the tens digit is 0 or 5. Counting in 100s changes only the hundreds digit.",
      "Boundary: counting from 0 up to about 1000 and back in these steps. Starting from other numbers and the 6, 7 and 9 sequences are not Year 3 targets.",
    ],
    misconceptions: [
      { mistake: "Counts in 8s as 8, 16, 24, 30, 38.", why: "Relies on rote and loses the pattern when crossing a tens boundary, adding the wrong amount.", response: "Draw jumps of 8 on a number line (24 + 8 = 32). Link each multiple to double the matching multiple of 4." },
      { mistake: "Counts back in 50s from 200 as 150, 100, 0.", why: "Stops tracking the number of jumps and drops straight to zero.", response: "Mark each jump on a number line and count them. Ask how many 50s make 100, then check by counting forwards." },
    ],
    vocabulary: [
      { term: "multiple", meaning: "A number you reach when counting in equal steps from 0, such as 8, 16 or 24 in 8s." },
      { term: "count on", meaning: "Move forwards in steps, adding the same amount each time." },
      { term: "count back", meaning: "Move backwards in steps, taking away the same amount each time." },
      { term: "step", meaning: "The amount each jump changes the number by." },
      { term: "sequence", meaning: "A list of numbers that follows a rule." },
      { term: "double", meaning: "Twice as many, or multiplied by 2." },
    ],
    before: "In Year 2 pupils count in steps of 2, 3 and 5 from 0, and in tens from any number, and recall the 2, 5 and 10 times tables.",
    next: "Year 4 adds multiples of 6, 7, 9, 25 and 1000, and pupils are expected to know all tables up to 12 × 12 by the end of the year.",
  },

  "finding-10-or-100-more-or-less": {
    statutory: ["find 10 or 100 more or less than a given number"],
    inBrief: "Adding or subtracting 10 or 100 changes only the tens or hundreds digit, unless the change crosses a boundary, when ten of one place is exchanged for one of the next.",
    keyFacts: [
      "10 more or less changes the tens digit and 100 more or less changes the hundreds digit. The other digits stay the same.",
      "Crossing a boundary needs an exchange: 10 more than 396 is 406, because 10 tens make 1 hundred. 10 less than 305 is 295, because 1 hundred is exchanged for 10 tens.",
      "Model with base-ten equipment, place-value counters and a place-value chart, then move to number lines and jottings.",
      "Boundary: numbers within 0 to 1000, with no negative numbers. 100 less than 1000 is 900. Changes of 1000 are Year 4.",
    ],
    misconceptions: [
      { mistake: "Writes 10 more than 396 as 3106.", why: "Adds 1 to the 9 tens and writes the result digit by digit without exchanging.", response: "Build 396 with counters, add one ten, and ask pupils to exchange 10 tens for a hundred. Read the chart: 4 hundreds, 0 tens, 6 ones." },
      { mistake: "Writes 100 more than 245 as 255.", why: "Treats 10 and 100 as the same kind of step and changes the tens digit.", response: "Ask which digit shows hundreds. Use a hundreds flat to show that only that column changes: 345." },
      { mistake: "Writes 10 less than 400 as 399.", why: "Subtracts 1 from the last digit, the most familiar step.", response: "Use a chart showing 4 hundreds. Exchange a hundred for 10 tens, take one away and read 390." },
    ],
    vocabulary: [
      { term: "more than", meaning: "A greater amount; add the stated amount." },
      { term: "less than", meaning: "A smaller amount; subtract the stated amount." },
      { term: "digit", meaning: "One of the symbols 0 to 9 used to write a number." },
      { term: "hundreds, tens, ones", meaning: "The places in a three-digit number; each place is worth ten times the one to its right." },
      { term: "exchange", meaning: "Swap 10 of one place for 1 of the next place, or the reverse." },
    ],
    before: "In Year 2 pupils find 10 more or less than any two-digit number and recognise the place value of each digit in two-digit numbers.",
    next: "Year 4 extends this to 1000 more or less than a number, with four-digit numbers and the thousands place.",
  },

  "place-value-in-3-digit-numbers": {
    statutory: ["recognise the place value of each digit in a three-digit number (hundreds, tens, ones)"],
    inBrief: "The value of a digit depends on its position: in 748 the 4 is worth 40. A zero holds a place so the other digits keep their value.",
    keyFacts: [
      "Each place is worth ten times the place to its right. In 748 there are 7 hundreds, 4 tens and 8 ones, so 748 = 700 + 40 + 8.",
      "Zero is a placeholder: 307 has no tens, and writing 37 would change the number.",
      "Partition flexibly as well as in standard form: 346 = 300 + 40 + 6 = 200 + 140 + 6 = 300 + 46.",
      "Use base-ten equipment, place-value counters and a hundreds-tens-ones chart. Keep to numbers up to 999, with no decimals.",
    ],
    misconceptions: [
      { mistake: "Says the 7 in 275 is worth 7.", why: "Reads the face value of the digit and ignores its position.", response: "Build 275 with rods and cubes. Ask how many tens there are and what that is worth: 7 tens is 70." },
      { mistake: "Writes 4 hundreds, 0 tens and 7 ones as 47.", why: "Sees zero as nothing to record and drops it.", response: "Lay out counters on a chart with an empty tens column. Show that 47 would use only two columns and 407 needs the zero to hold the tens." },
    ],
    vocabulary: [
      { term: "digit", meaning: "One of the symbols 0 to 9 used to write numbers." },
      { term: "place value", meaning: "The value a digit has because of its position in the number." },
      { term: "hundreds, tens, ones", meaning: "The three places in a three-digit number." },
      { term: "partition", meaning: "Split a number into parts, such as 346 into 300, 40 and 6." },
      { term: "placeholder", meaning: "A zero that keeps a place filled so other digits keep their value." },
    ],
    before: "In Year 2 pupils recognise the place value of each digit in a two-digit number and partition numbers to 100 in more than one way.",
    next: "Year 4 extends place value to four-digit numbers and uses it to round numbers to the nearest 10, 100 and 1000.",
  },

  "comparing-and-ordering-numbers-to-1000": {
    statutory: ["compare and order numbers up to 1000"],
    inBrief: "To compare numbers, look at the highest place first and move right only if the digits match. Use <, > and = and order from smallest to largest or the reverse.",
    keyFacts: [
      "Compare the hundreds first, then the tens, then the ones. A number with more hundreds is bigger whatever the other digits are.",
      "Use a place-value chart or lined-up digits so that hundreds sit above hundreds.",
      "The symbols < and > point to the smaller number. Always read the statement aloud: 540 is greater than 450.",
      "Order sets of three or four numbers, ascending and descending. Boundary: numbers up to 1000, with no negatives, decimals or rounding.",
    ],
    misconceptions: [
      { mistake: "Writes 603 > 630 because 3 is more than 0.", why: "Compares the ones digits, or digits in the wrong order, instead of starting with the highest place that differs.", response: "Line the numbers up in a chart. Ask: do they have the same hundreds? Then compare tens. 0 tens is fewer than 3 tens." },
      { mistake: "Writes 540 < 450.", why: "Uses the symbol the wrong way round, or reads it as a sign for 'bigger number first'.", response: "Read the statement as a sentence. Show the open side facing the larger number and ask what the sentence says." },
    ],
    vocabulary: [
      { term: "greater than (>)", meaning: "Larger in value; the open side of the symbol faces the larger number." },
      { term: "less than (<)", meaning: "Smaller in value; the point of the symbol faces the smaller number." },
      { term: "equal to (=)", meaning: "Having the same value." },
      { term: "ascending", meaning: "Ordered from smallest to largest." },
      { term: "descending", meaning: "Ordered from largest to smallest." },
    ],
    before: "In Year 2 pupils compare and order numbers from 0 up to 100 and use the signs <, > and =.",
    next: "Year 4 orders numbers beyond 1000, rounds to the nearest 10, 100 and 1000 and meets negative numbers in context.",
  },

  "representing-and-estimating-numbers": {
    statutory: ["identify, represent and estimate numbers using different representations"],
    inBrief: "A number can be shown in many ways: base-ten blocks, counters, a number line, money or measures. Estimating means placing or judging a number sensibly without counting exactly.",
    keyFacts: [
      "Represent the same number several ways: 326 as 3 flats, 2 rods, 6 cubes; as counters on a chart; as a point on a number line; as 3 hundreds, 2 tens and 6 ones.",
      "Place numbers on a 0 to 1000 line by position, using the midpoint 500 and quarter points 250 and 750 as anchors. Spacing should reflect size.",
      "Estimate a quantity by comparing it to a known amount, such as 10 objects, then scaling up.",
      "Boundary: numbers up to 1000. Informal estimates only; rounding to the nearest 10, 100 or 1000 is Year 4.",
    ],
    misconceptions: [
      { mistake: "Places 100, 250 and 900 equally spaced on a 0 to 1000 line.", why: "Spaces the numbers in order rather than by size, ignoring the scale.", response: "Mark 0, 500 and 1000 first. Ask whether 250 is nearer 0 or 500 and halve the gap to find it." },
      { mistake: "Reads 2 flats, 13 rods and 4 cubes as 2134.", why: "Writes the counts side by side instead of working out the value.", response: "Exchange 10 rods for a flat to show 3 flats, 3 rods and 4 cubes. Check: 200 + 130 + 4 = 334." },
    ],
    vocabulary: [
      { term: "represent", meaning: "Show a number using objects, pictures, symbols or a line." },
      { term: "estimate", meaning: "Give a sensible approximate answer or position without counting exactly." },
      { term: "number line", meaning: "A line marked with numbers in order at equal intervals." },
      { term: "base-ten equipment", meaning: "Ones cubes, tens rods and hundreds flats that show place value." },
      { term: "midpoint", meaning: "The number exactly halfway between two numbers, such as 500 between 0 and 1000." },
    ],
    before: "In Year 2 pupils identify, represent and estimate numbers to 100 using objects, pictures and the number line.",
    next: "Year 4 uses the same representations for four-digit numbers and rounds to the nearest 10, 100 and 1000 to estimate.",
  },

  "reading-and-writing-numbers-to-1000": {
    statutory: ["read and write numbers up to 1000 in numerals and in words"],
    inBrief: "Pupils connect the spoken, numeral and word forms of numbers to 1000, including zeros and the -teen and -ty endings.",
    keyFacts: [
      "Say the hundreds, then 'and', then the tens and ones: 423 is 'four hundred and twenty-three'. Use a hyphen for 21 to 99.",
      "A zero in the number means a place is skipped when speaking: 305 is 'three hundred and five' and 450 is 'four hundred and fifty'.",
      "Spelling points to teach: forty (not fourty), fifty, eighty, thirteen and thirty, and 'hundred' staying singular.",
      "Boundary: numbers up to and including one thousand, written in numerals and in words. Larger numbers are Year 4.",
    ],
    misconceptions: [
      { mistake: "Writes three hundred and six as 3006.", why: "Writes what is heard in order, '300' then '6', without regard for place value.", response: "Build 3 hundreds and 6 ones on a chart. Ask what is in the tens place and write the zero there: 306." },
      { mistake: "Writes forty as fourty.", why: "Builds the word from four, the number it is related to.", response: "Contrast 4, 14 and 40 as four, fourteen and forty. Keep a word bank and ask pupils to check against it." },
      { mistake: "Writes one hundred and sixty as 116.", why: "Confuses the -ty and -teen endings, which sound alike.", response: "Stress the final sounds. Count in tens (sixty) and then in teens (sixteen) to hear the difference." },
    ],
    vocabulary: [
      { term: "numeral", meaning: "A number written with digits, such as 427." },
      { term: "digit", meaning: "One of the symbols 0 to 9." },
      { term: "hundred", meaning: "Ten tens; the name for the third place from the right." },
      { term: "hyphen", meaning: "The short line joining the tens and ones in words such as forty-two." },
      { term: "placeholder", meaning: "A zero that holds a place in a numeral and is not said aloud." },
    ],
    before: "In Year 2 pupils read and write numbers to at least 100 in numerals and in words.",
    next: "Year 4 reads and writes numbers beyond 1000 using thousands and meets Roman numerals to 100.",
  },

  "number-and-place-value-problems": {
    statutory: ["solve number problems and practical problems involving these ideas"],
    inBrief: "Pupils apply counting in multiples, finding 10 or 100 more or less, partitioning, comparing and representing numbers to solve short problems, including practical ones.",
    keyFacts: [
      "Start by asking what is known and what is asked, then choose the idea: partitioning, 10 or 100 more or less, ordering or counting in steps.",
      "Reasoning problems use digit cards. The smallest three-digit number from 4, 0 and 7 is 407 and the largest is 740, because a leading zero does not make a three-digit number.",
      "Flexible partitioning helps: 146 = 100 + 40 + 6 = 130 + 16. Practical contexts include measures, money and scales.",
      "Boundary: numbers up to 1000. Problems stay within place-value ideas, with no rounding or four-digit numbers.",
    ],
    misconceptions: [
      { mistake: "Makes the smallest number from 4, 0 and 7 as 047.", why: "Knows zero is the smallest digit but forgets a leading zero does not count as a hundreds digit.", response: "Make the number with digit cards on a hundreds-tens-ones chart. Ask: what is in the hundreds place? Can it be zero?" },
      { mistake: "Answers 'How many tens in 340?' with 4.", why: "Reads the tens digit instead of counting how many tens make the whole number.", response: "Build 340 with rods and count them: 34 tens. Distinguish the digit in the tens place from the number of tens." },
    ],
    vocabulary: [
      { term: "partition", meaning: "Split a number into parts, such as 146 into 100, 40 and 6." },
      { term: "digit", meaning: "One of the symbols 0 to 9." },
      { term: "smallest, largest", meaning: "The least and the greatest number that fits the rules." },
      { term: "more than, less than", meaning: "Describe a number that is greater or smaller by a given amount." },
      { term: "hundreds, tens, ones", meaning: "The places in a three-digit number." },
    ],
    before: "In Year 2 pupils solve problems using place value and number facts in two-digit numbers, with objects and pictures.",
    next: "Year 4 solves number and practical problems with four-digit numbers, rounding, negative numbers and Roman numerals.",
  },

  // ---------------------------------------------------------------- Addition and subtraction
  "adding-and-subtracting-ones-tens-and-hundreds": {
    statutory: ["add and subtract numbers mentally, including:", "a three-digit number and ones", "a three-digit number and tens", "a three-digit number and hundreds"],
    inBrief: "Pupils add and subtract ones, tens or hundreds to a three-digit number in their heads, using place value and bridging through a tens or hundreds number.",
    keyFacts: [
      "Adding ones changes the ones digit, tens changes the tens digit and hundreds changes the hundreds digit: 347 + 30 = 377 and 347 + 200 = 547.",
      "For ones that cross a boundary, bridge through the next ten or hundred: 396 + 7 = 396 + 4 + 3 = 400 + 3 = 403.",
      "Subtraction also bridges: 302 − 5 = 302 − 2 − 3 = 297. Use number lines to show each jump.",
      "Boundary: mental methods with a three-digit number and ones, tens or hundreds, within 1000. Formal columns are the next two topics.",
    ],
    misconceptions: [
      { mistake: "Writes 345 + 20 = 347.", why: "Sees 20 as 2 and adds it to the ones digit, ignoring its place.", response: "Ask which place the 2 in 20 is in. Use rods to add two tens and read the new number: 365." },
      { mistake: "Writes 398 + 5 = 3913.", why: "Adds the ones, 8 + 5 = 13, and writes both digits in the ones place.", response: "Exchange 10 ones for a ten, then 10 tens for a hundred. Use a number line: 398 + 2 = 400, then + 3 = 403." },
      { mistake: "Writes 302 − 5 = 303.", why: "Subtracts the smaller digit from the larger in the ones place, 5 − 2.", response: "Count back on a number line: back 2 to 300, back 3 more to 297. Ask whether the answer should be bigger or smaller." },
    ],
    vocabulary: [
      { term: "mentally", meaning: "Working in your head, perhaps with jottings." },
      { term: "bridge", meaning: "Move to the next ten or hundred first, then add or subtract the rest." },
      { term: "number line", meaning: "A line used to show jumps when adding or subtracting." },
      { term: "partition", meaning: "Split a number into hundreds, tens and ones to calculate." },
      { term: "exchange", meaning: "Swap 10 of one place for 1 of the next place." },
    ],
    before: "In Year 2 pupils add and subtract mentally a two-digit number and ones, a two-digit number and tens, and two two-digit numbers.",
    next: "Year 4 adds and subtracts numbers with up to four digits and uses efficient mental and written methods.",
  },

  "column-addition": {
    statutory: ["add and subtract numbers with up to three digits, using formal written methods of columnar addition and subtraction"],
    inBrief: "Pupils line digits up by place value and add from the ones column, exchanging ten ones for one ten, and ten tens for one hundred, when a column totals 10 or more.",
    keyFacts: [
      "Write the numbers with ones under ones, tens under tens and hundreds under hundreds, and add from the right.",
      "Exchange: in 347 + 125 the ones total 12, so write 2 and exchange 10 ones for 1 ten, written under the tens column. Then 4 + 2 + 1 = 7 tens and 3 + 1 = 4 hundreds, giving 472.",
      "Show exchanges first with base-ten equipment and place-value counters, then record the same steps in columns.",
      "Boundary: addends with up to three digits and totals kept within 1000. Four-digit methods are Year 4.",
    ],
    misconceptions: [
      { mistake: "Writes 148 + 275 as 31113.", why: "Writes each column total in full instead of exchanging, so 8 + 5 = 13 and 4 + 7 = 11 are written side by side.", response: "Build 148 and 275 with counters. Show that 13 ones is 1 ten and 3 ones. Record the exchanged ten under the tens column. The total is 423." },
      { mistake: "Sets out 245 + 37 with the 3 under the hundreds digit.", why: "Aligns digits from the left, not by place value.", response: "Draw a hundreds, tens and ones grid. Write 37 as 0 hundreds, 3 tens and 7 ones. The total is 282." },
      { mistake: "Writes 347 + 125 = 462.", why: "Exchanges the ten from 7 + 5 but forgets to add it in the tens column.", response: "Ask pupils to show the exchanged ten as a small digit and tick it off when added. Check by estimating: about 350 + 125 = 475." },
    ],
    vocabulary: [
      { term: "column", meaning: "A vertical line of digits in the same place, such as the tens column." },
      { term: "exchange", meaning: "Swap 10 of one place for 1 of the next place along." },
      { term: "total", meaning: "The result of adding numbers together." },
      { term: "sum", meaning: "Another word for the total in an addition." },
      { term: "place value", meaning: "The value of a digit because of its position." },
    ],
    before: "In Year 2 pupils add two two-digit numbers using concrete and pictorial models, partitioning and mental methods.",
    next: "Year 4 uses columnar addition for numbers with up to four digits, and Year 5 for numbers with more than four digits.",
  },

  "column-subtraction": {
    statutory: ["add and subtract numbers with up to three digits, using formal written methods of columnar addition and subtraction"],
    inBrief: "Pupils write the larger number above the smaller and subtract from the ones column, exchanging one ten for ten ones, or one hundred for ten tens, whenever a digit is too small.",
    keyFacts: [
      "Subtract from the right. If the top digit is smaller than the bottom digit, exchange from the next column: 352 − 128 needs 1 ten exchanged for 10 ones, so 12 − 8 = 4, 4 − 2 = 2, 3 − 1 = 2, giving 224.",
      "When the tens digit is zero, exchange from the hundreds first. In 403 − 175, exchange 1 hundred for 10 tens, then 1 ten for 10 ones: 13 − 5 = 8, 9 − 7 = 2, 3 − 1 = 2, giving 228.",
      "Model with base-ten equipment before recording. Check by addition: 224 + 128 = 352.",
      "Boundary: both numbers up to three digits, with the answer positive. Four-digit subtraction is Year 4.",
    ],
    misconceptions: [
      { mistake: "Writes 352 − 128 = 236.", why: "Subtracts the smaller digit from the larger in each column instead of exchanging.", response: "Build 352 and take away 128. Ask whether 2 ones can lose 8 ones. Show the exchange of a ten and read the answer 224." },
      { mistake: "Writes 352 − 128 = 234.", why: "Exchanges a ten to make 12 ones but forgets the tens column now has one fewer.", response: "Cross out the 5 and write 4 above it. Say '4 tens now'. Check by adding: 234 + 128 is 362, not 352." },
      { mistake: "Writes 403 − 175 = 338.", why: "Turns the 0 tens into 10 without exchanging from the hundreds, so the number gains value.", response: "Use counters: there are no tens to exchange. Break a hundred into 10 tens first, then a ten into 10 ones. The answer is 228." },
    ],
    vocabulary: [
      { term: "column", meaning: "A vertical line of digits in the same place." },
      { term: "exchange", meaning: "Swap 1 of one place for 10 of the next place down." },
      { term: "difference", meaning: "How much more one number is than another." },
      { term: "subtract", meaning: "Take one number away from another." },
      { term: "inverse", meaning: "The opposite operation; addition checks subtraction." },
    ],
    before: "In Year 2 pupils subtract two-digit numbers using objects, pictures, number lines and mental methods.",
    next: "Year 4 uses columnar subtraction for numbers with up to four digits, and Year 5 for numbers with more than four digits.",
  },

  "estimating-and-checking-answers": {
    statutory: ["estimate the answer to a calculation and use inverse operations to check answers"],
    inBrief: "Pupils estimate an answer before calculating, using nearby tens or hundreds, and check the exact answer with the inverse operation.",
    keyFacts: [
      "Make an estimate first, using friendly numbers: 298 + 204 is about 300 + 200 = 500. The exact answer 502 is close, so it is reasonable.",
      "Addition and subtraction are inverses. Check 502 − 204 = 298 to confirm 298 + 204 = 502.",
      "Use the symbol ≈ for 'is approximately equal to'. An estimate is a judgement, not a wrong answer.",
      "Boundary: informal estimating with nearby tens and hundreds for addition and subtraction within 1000. Formal rounding rules are Year 4.",
    ],
    misconceptions: [
      { mistake: "Works out 389 + 212 exactly and then 'rounds' it to estimate.", why: "Treats an estimate as a tidy-up step instead of a plan made before calculating.", response: "Ask pupils to write the estimate before any column work. Compare it afterwards: is the exact answer close?" },
      { mistake: "Checks 352 − 128 = 224 by subtracting 128 from 352 again.", why: "Thinks 'check' means repeat, rather than use the inverse operation.", response: "Ask which operation undoes subtraction. Add 224 + 128 and see whether it returns to 352." },
      { mistake: "Says an estimate of 500 was wrong because the exact answer was 502.", why: "Expects an estimate to equal the exact answer.", response: "Discuss what an estimate is for. If the two are close, the exact answer is sensible. A big gap suggests an error." },
    ],
    vocabulary: [
      { term: "estimate", meaning: "A sensible approximate answer found before calculating exactly." },
      { term: "approximately (≈)", meaning: "Close to but not exactly equal." },
      { term: "inverse operation", meaning: "The opposite operation that undoes the first, such as subtraction for addition." },
      { term: "check", meaning: "Test an answer by another method to see if it is correct." },
      { term: "reasonable", meaning: "Sensible and close to what you expected." },
    ],
    before: "In Year 2 pupils recognise the inverse relationship between addition and subtraction and use it to check calculations.",
    next: "Year 4 estimates and checks answers for four-digit calculations, using rounding to the nearest 10, 100 or 1000.",
  },

  "missing-number-problems": {
    statutory: ["solve problems, including missing number problems, using number facts, place value, and more complex addition and subtraction"],
    inBrief: "Pupils find the missing number in addition and subtraction statements, wherever it sits, by reasoning with inverses and bar models and then checking the answer by substitution.",
    keyFacts: [
      "The missing number can be in any position: ☐ + 47 = 120, 300 − ☐ = 165, ☐ − 58 = 120, or 120 = ☐ + 75.",
      "Use a part-whole bar model and the inverse. For ☐ + 47 = 120, find 120 − 47 = 73. For 300 − ☐ = 165, find 300 − 165 = 135. For ☐ − 58 = 120, find 120 + 58 = 178.",
      "The equals sign means 'is the same as', so statements may be written 120 = ☐ + 75.",
      "Boundary: addition and subtraction with up to three-digit numbers. Missing numbers in multiplication and division are a separate topic.",
    ],
    misconceptions: [
      { mistake: "Answers 300 − ☐ = 165 with 465.", why: "Adds the two numbers shown instead of reasoning about what is missing.", response: "Draw a bar model with 300 as the whole. Substitute 465 and ask whether 300 − 465 makes sense. Find 300 − 165 = 135." },
      { mistake: "Answers 120 = ☐ + 75 with 195.", why: "Reads the equals sign as 'the answer comes next' and adds the numbers shown.", response: "Show a balance or bar. Rewrite the statement as ☐ + 75 = 120 and find 120 − 75 = 45." },
      { mistake: "Answers ☐ − 58 = 120 with 62.", why: "Subtracts the smaller number from the larger without checking which is the whole.", response: "Mark ☐ as the whole bar, 58 as the part taken away and 120 as what is left. The whole is 120 + 58 = 178." },
    ],
    vocabulary: [
      { term: "missing number", meaning: "The unknown number in a statement, often shown as a box." },
      { term: "inverse", meaning: "The opposite operation, used to find the missing number." },
      { term: "bar model", meaning: "A picture of bars showing parts and wholes in a problem." },
      { term: "equals (=)", meaning: "Has the same value as the other side." },
      { term: "substitute", meaning: "Put your answer in the box and check that the statement is true." },
    ],
    before: "In Year 2 pupils solve missing number problems with addition and subtraction up to 100, using the inverse and concrete or pictorial models.",
    next: "Year 4 solves missing number and two-step addition and subtraction problems with four-digit numbers, choosing operations and methods.",
  },

  "addition-and-subtraction-problems": {
    statutory: ["solve problems, including missing number problems, using number facts, place value, and more complex addition and subtraction"],
    inBrief: "Pupils decide whether a word problem needs addition or subtraction, draw it as a bar model, and solve one-step and two-step problems with three-digit numbers.",
    keyFacts: [
      "Read for structure, not key words. Putting together parts to make a whole means add. Taking away and finding the difference between two amounts mean subtract.",
      "Draw a bar model. In 'Sam has 346 stickers and Mia has 128 fewer', Mia's bar is shorter, so 346 − 128 = 218.",
      "Two-step problems need an intermediate answer: 354 apples, 128 sold, then 75 delivered. 354 − 128 = 226, then 226 + 75 = 301.",
      "Boundary: three-digit numbers, with addition and subtraction only. Money is in pounds and pence separately.",
    ],
    misconceptions: [
      { mistake: "Answers 'Mia has 128 fewer than Sam's 346' with 474.", why: "Reacts to a number pair by adding, rather than picturing the relationship.", response: "Draw both bars with Mia's shorter. Ask whether the answer should be more or less than 346. 346 − 128 = 218." },
      { mistake: "Gives 900 for 'A has 520 and B has 380. How many more does A have?'", why: "Takes 'more' to mean add, rather than find the difference.", response: "Show the two bars and mark the gap between them. 520 − 380 = 140." },
      { mistake: "Stops after the first step of a two-step problem.", why: "Treats the first answer as the final one without rereading the question.", response: "Ask what the answer tells us and whether it answers the question. Write the question under the calculation." },
    ],
    vocabulary: [
      { term: "bar model", meaning: "A drawing of bars showing the parts and whole in a problem." },
      { term: "difference", meaning: "The gap between two numbers, found by subtracting." },
      { term: "total", meaning: "The whole amount when parts are combined." },
      { term: "how many more", meaning: "A question asking for the difference between two amounts." },
      { term: "two-step problem", meaning: "A problem needing two calculations to find the answer." },
    ],
    before: "In Year 2 pupils solve one-step and two-step addition and subtraction problems with numbers up to 100, using objects and pictures.",
    next: "Year 4 solves two-step addition and subtraction problems with four-digit numbers and decides which operations and methods to use.",
  },

  // ---------------------------------------------------------------- Multiplication and division
  "3-and-4-times-tables": {
    statutory: ["recall and use multiplication and division facts for the 3, 4 and 8 multiplication tables"],
    inBrief: "Pupils recall the 3 and 4 times tables and the related division facts, understanding multiplication as equal groups and arrays and division as its inverse.",
    keyFacts: [
      "Model multiplication as equal groups, arrays and repeated addition: 3 rows of 4 is 12, so 3 × 4 = 12 and 4 × 3 = 12.",
      "The 4 times table is the 2 times table doubled: 2 × 6 = 12, so 4 × 6 = 24. The 3 times table can be built as 2 times a number plus 1 more lot: 3 × 6 = 12 + 6 = 18.",
      "Each multiplication fact gives three related facts. 3 × 6 = 18 gives 6 × 3 = 18, 18 ÷ 3 = 6 and 18 ÷ 6 = 3. Fact triangles show this.",
      "Aim for quick recall, up to 12 × 3 = 36 and 12 × 4 = 48, with derived facts when memory slips. The 6, 7 and 9 times tables are not Year 3 targets.",
    ],
    misconceptions: [
      { mistake: "Says 7 × 4 = 24.", why: "Counts in 4s and loses one jump, because recall is not secure.", response: "Use an array or doubling: 7 × 2 = 14, doubled = 28. Count in 4s together, tapping each jump: 4, 8, 12, 16, 20, 24, 28." },
      { mistake: "Writes 12 ÷ 3 = 36.", why: "Multiplies the numbers shown because they appear in the same fact family.", response: "Ask: how many groups of 3 are in 12? Use a fact triangle to see that the largest number goes at the top and is divided." },
    ],
    vocabulary: [
      { term: "multiply", meaning: "Find the total of equal groups; repeated addition." },
      { term: "divide", meaning: "Share equally or find how many groups fit." },
      { term: "array", meaning: "Objects arranged in equal rows and columns." },
      { term: "multiple", meaning: "A number in a times table, such as 12 in the 3s." },
      { term: "fact family", meaning: "Related multiplication and division facts using the same three numbers." },
    ],
    before: "In Year 2 pupils recall and use multiplication and division facts for the 2, 5 and 10 times tables, using arrays and repeated addition.",
    next: "Year 4 recalls all multiplication facts up to 12 × 12 and uses them to multiply and divide mentally.",
  },

  "the-8-times-table": {
    statutory: ["recall and use multiplication and division facts for the 3, 4 and 8 multiplication tables"],
    inBrief: "Pupils learn the 8 times table by doubling the 4s, which are doubles of the 2s, and recall the related division facts.",
    keyFacts: [
      "Doubling links the tables: 2 × 6 = 12, 4 × 6 = 24 and 8 × 6 = 48. Each step is a doubling.",
      "Counting in 8s gives 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96. The ones digits run 8, 6, 4, 2, 0 and repeat, and every multiple is even.",
      "Derive facts from ones known: 8 × 7 = 8 × 5 + 8 × 2 = 40 + 16 = 56.",
      "Division facts use the same triangle: 56 ÷ 8 = 7. Boundary: up to 12 × 8 = 96.",
    ],
    misconceptions: [
      { mistake: "Counts in 8s as 8, 16, 24, 32, 40, 48, 54.", why: "Adds 6 instead of 8 across a tens boundary, then loses the pattern.", response: "Use a number line to show each jump of 8 and note the ones digit pattern. Derive 8 × 7 from 8 × 5 + 8 × 2 = 56." },
      { mistake: "Says 8 × 3 = 12 after doubling once from the 2s.", why: "Stops after one doubling, which gives the 4s, not the 8s.", response: "Show 2 × 3 = 6, double 12 is 4 × 3, double again 24 is 8 × 3. Count the doublings: three." },
    ],
    vocabulary: [
      { term: "double", meaning: "Multiply by 2." },
      { term: "multiple of 8", meaning: "A number reached by counting in 8s, such as 56." },
      { term: "multiply", meaning: "Find the total of equal groups." },
      { term: "divide", meaning: "Share equally or find how many groups of a size fit." },
      { term: "fact triangle", meaning: "A triangle showing the three numbers in a multiplication and division family." },
    ],
    before: "In Year 2 pupils know the 2, 5 and 10 times tables, and earlier this year the 3 and 4 times tables.",
    next: "Year 4 completes the tables up to 12 × 12 and uses them to multiply and divide mentally, including with larger numbers.",
  },

  "multiplying-and-dividing-two-digit-numbers": {
    statutory: ["including for two-digit numbers times one-digit numbers, using mental and progressing to formal written methods"],
    inBrief: "Pupils partition a two-digit number into tens and ones, multiply or divide each part using known facts, and recombine, moving towards formal short methods.",
    keyFacts: [
      "Multiply by partitioning: 23 × 4 = (20 × 4) + (3 × 4) = 80 + 12 = 92. A grid or area model records this clearly.",
      "Divide by partitioning into multiples of the divisor: 52 ÷ 4 = (40 ÷ 4) + (12 ÷ 4) = 10 + 3 = 13.",
      "Progress from expanded layouts to short multiplication and short division. Use only tables pupils know: 2, 3, 4, 5, 8 and 10.",
      "Mental strategies help, such as 4 × 12 × 5 = 4 × 5 × 12 = 20 × 12 = 240.",
    ],
    misconceptions: [
      { mistake: "Writes 23 × 4 = 812.", why: "Multiplies each digit separately (2 × 4 = 8, 3 × 4 = 12) and joins the results, ignoring that 2 is 20.", response: "Partition 23 into 20 and 3. Show 4 groups of 23 with base-ten equipment: 80 + 12 = 92." },
      { mistake: "Writes 52 ÷ 4 = 12.", why: "Divides 5 tens by 4 to get 1 and ignores the remaining ten, then records 2 untouched.", response: "Exchange the leftover ten for 10 ones to make 12 ones. 12 ÷ 4 = 3, so the answer is 13." },
      { mistake: "Writes 40 ÷ 4 = 1.", why: "Divides the digits 4 ÷ 4 and drops the zero.", response: "Say it as 4 tens divided by 4 equals 1 ten, which is 10. Use rods to show it." },
    ],
    vocabulary: [
      { term: "partition", meaning: "Split a number into tens and ones to calculate." },
      { term: "multiply", meaning: "Find the total of equal groups." },
      { term: "divide", meaning: "Share equally or find how many groups fit." },
      { term: "product", meaning: "The answer to a multiplication." },
      { term: "short multiplication", meaning: "A compact written method for multiplying by a one-digit number." },
    ],
    before: "In Year 2 pupils calculate using multiplication and division facts for the 2, 5 and 10 tables, with arrays and equal groups.",
    next: "Year 4 multiplies two-digit and three-digit numbers by one digit using formal layout, and multiplies three numbers together.",
  },

  "scaling-and-correspondence-problems": {
    statutory: ["solve problems, including missing number problems, involving multiplication and division, including positive integer scaling problems and correspondence problems in which n objects are connected to m objects"],
    inBrief: "Scaling problems say one amount is a number of times as big as another. Correspondence problems count the ways each of n objects can be paired with each of m objects.",
    keyFacts: [
      "Scaling up: a ribbon that is 8 times as long as a 4 cm ribbon is 4 × 8 = 32 cm. Draw one bar and repeat it.",
      "Scaling down: if a ribbon is 3 times as long as another and is 24 cm, the shorter one is 24 ÷ 3 = 8 cm.",
      "Correspondence: 3 hats and 4 coats make 3 × 4 = 12 outfits. Draw a table or list the pairs.",
      "Sharing problems are correspondence too: 12 sweets between 4 children is 3 each, and 4 cakes shared between 8 children is half a cake each. Boundary: whole-number scale factors only.",
    ],
    misconceptions: [
      { mistake: "Says 'three times as long as 8 cm' is 11 cm.", why: "Confuses 'times as long' with 'longer than' and adds.", response: "Draw three equal bars of 8 cm. 8 + 8 + 8 = 24, which is 3 × 8." },
      { mistake: "Says 3 hats and 4 coats give 7 outfits.", why: "Counts the items instead of the pairings.", response: "List the outfits for one hat with each coat, then repeat for each hat. Use a table. 3 × 4 = 12." },
      { mistake: "Says ribbon B is 96 cm when A is 24 cm and is 4 times as long as B.", why: "The word 'times' triggers multiplication, even when the larger amount is known.", response: "Draw A as four equal parts. Find one part: 24 ÷ 4 = 6 cm." },
    ],
    vocabulary: [
      { term: "times as many", meaning: "A multiplication comparison, such as 4 times as many as 5 is 20." },
      { term: "scale", meaning: "Make an amount a number of times bigger or smaller." },
      { term: "correspondence", meaning: "Pairing each object in one group with each in another." },
      { term: "combination", meaning: "One particular pairing, such as one hat with one coat." },
      { term: "share equally", meaning: "Divide so that each part is the same size." },
    ],
    before: "In Year 2 pupils solve one-step multiplication and division problems using arrays, repeated addition and the 2, 5 and 10 times tables.",
    next: "Year 4 solves harder correspondence problems and integer scaling problems, using the distributive law to multiply.",
  },

  "multiplication-and-division-problems": {
    statutory: ["solve problems, including missing number problems, involving multiplication and division, including positive integer scaling problems and correspondence problems in which n objects are connected to m objects"],
    inBrief: "Pupils decide whether a problem needs multiplication or division, solve it with tables they know and find missing numbers using the inverse.",
    keyFacts: [
      "Equal groups or arrays mean multiply. Sharing a total equally, or finding how many groups of a given size fit, mean divide.",
      "Division has two meanings: sharing 12 sweets among 4 children, or putting 12 sweets into bags of 4. Both give 12 ÷ 4 = 3.",
      "Missing numbers use the inverse: 8 × ☐ = 48 means 48 ÷ 8 = 6, and ☐ ÷ 4 = 9 means 9 × 4 = 36.",
      "Two-step problems combine operations: 6 packs of 8 stickers, with 5 used: 6 × 8 = 48, then 48 − 5 = 43. Keep to exact division, as remainders are not a Year 3 target.",
    ],
    misconceptions: [
      { mistake: "Answers 8 × ☐ = 48 with 40.", why: "Subtracts 8 from 48, as if the missing number were found by taking away.", response: "Ask how many groups of 8 make 48. Use an array or the fact triangle: 48 ÷ 8 = 6." },
      { mistake: "Writes 8 ÷ 24 = 3 for 'Share 24 sweets between 8 children'.", why: "Writes the numbers in the order they appear in the sentence.", response: "Ask what is being shared and who gets it. Estimate first: each child gets less than 24. Write 24 ÷ 8 = 3." },
    ],
    vocabulary: [
      { term: "multiply", meaning: "Find the total of equal groups." },
      { term: "divide", meaning: "Share equally or find how many groups fit." },
      { term: "inverse", meaning: "The opposite operation: division undoes multiplication." },
      { term: "equal groups", meaning: "Groups that each contain the same number." },
      { term: "missing number", meaning: "The unknown number in a statement, often shown as a box." },
    ],
    before: "In Year 2 pupils solve multiplication and division problems in contexts using the 2, 5 and 10 times tables and the inverse.",
    next: "Year 4 multiplies and divides with larger numbers, and solves problems with several steps and harder correspondence.",
  },

  // ---------------------------------------------------------------- Fractions
  "tenths": {
    statutory: ["count up and down in tenths; recognise that tenths arise from dividing an object into 10 equal parts and in dividing one-digit numbers or quantities by 10"],
    inBrief: "A tenth is one of 10 equal parts of a whole. Dividing a one-digit number or quantity by 10 gives tenths: 3 ÷ 10 = 3/10.",
    keyFacts: [
      "Count up and down in tenths: one tenth, two tenths, up to ten tenths, which is one whole, and on to eleven tenths.",
      "Show tenths on a metre stick, a strip cut into 10 equal parts and a number line from 0 to 1.",
      "3 ÷ 10 = 3/10. Sharing 3 objects between 10 gives each part 3/10 of one object.",
      "Link to place value, as the tenths place is one tenth of the ones place. Boundary: tenths only, with no hundredths. Writing as decimals, such as 0.3, is formal in Year 4.",
    ],
    misconceptions: [
      { mistake: "Splits a shape into 10 unequal parts and calls each one a tenth.", why: "Counts the parts without checking that they are equal in size.", response: "Fold or overlay the parts to test them. Only equal parts are tenths." },
      { mistake: "Writes 3 ÷ 10 as 10/3.", why: "Writes the numbers in the order spoken or puts the larger number on top.", response: "Ask: if 3 pizzas are shared among 10 people, does each person get more or less than a whole pizza? Less, so the numerator must be smaller: 3/10." },
    ],
    vocabulary: [
      { term: "tenth", meaning: "One of 10 equal parts of a whole." },
      { term: "fraction", meaning: "A number that shows equal parts of a whole." },
      { term: "numerator", meaning: "The top number: how many parts are being counted." },
      { term: "denominator", meaning: "The bottom number: how many equal parts the whole is split into." },
      { term: "equal parts", meaning: "Parts that are exactly the same size." },
    ],
    before: "In Year 2 pupils recognise, find and write 1/3, 1/4, 2/4 and 3/4 of a length, shape, set of objects or quantity.",
    next: "Year 4 counts in hundredths, writes tenths and hundredths as decimals, and divides by 10 and 100.",
  },

  "fractions-of-a-set-of-objects": {
    statutory: ["recognise, find and write fractions of a discrete set of objects: unit fractions and non-unit fractions with small denominators"],
    inBrief: "To find a fraction of a set, divide the set into as many equal groups as the denominator and take as many groups as the numerator says.",
    keyFacts: [
      "A unit fraction of a set means dividing by the denominator: 1/4 of 20 = 20 ÷ 4 = 5.",
      "A non-unit fraction means taking several groups: 3/4 of 20 = 3 × 5 = 15.",
      "Write the fraction of a set that has a property: 3 red counters out of 8 is 3/8 red.",
      "Use counters, bar models and sharing into equal groups. Boundary: small denominators such as 2, 3, 4, 5, 8 and 10, with sets that divide exactly.",
    ],
    misconceptions: [
      { mistake: "Finds 3/4 of 20 as 5.", why: "Finds one quarter and stops, ignoring the numerator.", response: "Draw 4 groups of 5 and shade the 3 groups the fraction asks for. 3 × 5 = 15." },
      { mistake: "Finds 1/4 of 12 as 4.", why: "Takes 4 counters because of the denominator, confusing the number of groups with the size of each group.", response: "Deal 12 counters into 4 equal groups. Each group has 3, so 1/4 of 12 is 3." },
      { mistake: "Writes 3 red and 5 blue counters as 3/5 red.", why: "Compares red to blue, not red to all counters.", response: "Count all the counters first. The denominator is the total number of equal parts: 8, so 3/8 are red." },
    ],
    vocabulary: [
      { term: "unit fraction", meaning: "A fraction with 1 on top, such as 1/4." },
      { term: "non-unit fraction", meaning: "A fraction with a numerator greater than 1, such as 3/4." },
      { term: "numerator", meaning: "The top number: how many parts are taken." },
      { term: "denominator", meaning: "The bottom number: how many equal parts there are in all." },
      { term: "equal groups", meaning: "Groups that each contain the same number of objects." },
    ],
    before: "In Year 2 pupils find 1/2, 1/3, 1/4, 2/4 and 3/4 of a quantity or set of objects.",
    next: "Year 4 solves harder problems calculating fractions of quantities, including non-unit fractions where the answer is a whole number.",
  },

  "fractions-as-numbers": {
    statutory: ["recognise and use fractions as numbers: unit fractions and non-unit fractions with small denominators"],
    inBrief: "Fractions are numbers with a place on the number line, not only parts of shapes. 3/4 is three steps of 1/4 from 0, and the line continues past 1.",
    keyFacts: [
      "On a 0 to 1 line split into equal parts, each step is a unit fraction and the steps count up: 1/4, 2/4, 3/4, 4/4 = 1.",
      "Fractions go beyond 1: 5/4 is one whole and a quarter. Measuring contexts, such as a jug marked in quarters, make this natural.",
      "A fraction also shows division: 3 ÷ 4 = 3/4.",
      "Use fraction strips and number lines. Boundary: small denominators such as 2, 3, 4, 5, 6, 8 and 10. Formal mixed numbers and improper fractions are later.",
    ],
    misconceptions: [
      { mistake: "Labels 0 as 1/4 on a line split into four parts and every mark one place out.", why: "Counts the marks instead of the gaps between them.", response: "Show that 1/4 is the first step from 0. Count the jumps, not the marks, and tap each jump." },
      { mistake: "Says 5/4 is impossible because the bottom number is 4.", why: "Sees fractions only as parts of one whole.", response: "Count in quarters on a line past 1: 3/4, 4/4, 5/4. Show 5 quarter-strips and exchange 4 for a whole." },
    ],
    vocabulary: [
      { term: "fraction", meaning: "A number made of equal parts of a whole." },
      { term: "unit fraction", meaning: "A fraction with 1 on top, such as 1/5." },
      { term: "non-unit fraction", meaning: "A fraction with a numerator greater than 1, such as 3/5." },
      { term: "number line", meaning: "A line showing numbers, including fractions, in order." },
      { term: "whole", meaning: "The complete amount, equal to 1." },
    ],
    before: "In Year 2 pupils write simple fractions such as 1/2 of 6 = 3, and recognise that 2/4 and 1/2 are equal.",
    next: "Year 4 counts in hundredths and writes decimal equivalents. Year 5 uses mixed numbers and improper fractions.",
  },

  "equivalent-fractions": {
    statutory: ["recognise and show, using diagrams, equivalent fractions with small denominators"],
    inBrief: "Equivalent fractions name the same amount in different ways, such as 1/2 = 2/4 = 4/8. Pupils show this with diagrams of identical wholes.",
    keyFacts: [
      "Line up fraction strips of equal length: 1/2 covers the same amount as 2/4, 4/8 and 5/10.",
      "On a number line, equivalent fractions share one point: 1/3 and 2/6 sit at the same place.",
      "Pupils notice that doubling both numerator and denominator keeps the value, but must see why: each part is split in two.",
      "Boundary: diagrams and small denominators such as 2, 3, 4, 5, 6, 8 and 10. Formal rules and simplifying are Year 4 and Year 5.",
    ],
    misconceptions: [
      { mistake: "Says 1/2 = 2/3 because 1 and 2 are added to the top and bottom.", why: "Adds the same amount to numerator and denominator instead of multiplying both.", response: "Shade strips: 2/3 is clearly more than 1/2. Show that 1/2 becomes 2/4 by splitting each half into two equal parts." },
      { mistake: "Says 1/2 of a small square is not equal to 2/4 of a large square.", why: "Compares amounts of different wholes.", response: "Use wholes of the same size. Equivalent fractions need the same whole." },
      { mistake: "Shades 2 of 4 unequal parts and says 2/4.", why: "Counts parts without checking they are equal.", response: "Check the parts by folding or overlaying. Only equal parts give fractions." },
    ],
    vocabulary: [
      { term: "equivalent", meaning: "Equal in value, though written differently." },
      { term: "fraction wall", meaning: "A diagram of rows of equal parts used to compare fractions." },
      { term: "numerator", meaning: "The top number of a fraction." },
      { term: "denominator", meaning: "The bottom number: how many equal parts the whole is split into." },
      { term: "whole", meaning: "The complete amount that is split into equal parts." },
    ],
    before: "In Year 2 pupils recognise that 2/4 and 1/2 are equal, using shapes and quantities.",
    next: "Year 4 shows families of common equivalent fractions using diagrams, with tenths and hundredths linked to decimals.",
  },

  "adding-and-subtracting-fractions": {
    statutory: ["add and subtract fractions with the same denominator within one whole"],
    inBrief: "When the denominators match, the parts are the same size, so pupils add or subtract the numerators and keep the denominator: 3/8 + 2/8 = 5/8.",
    keyFacts: [
      "Count the parts: 3 eighths + 2 eighths = 5 eighths. The denominator names the size of the part and does not change.",
      "Subtract in the same way: 7/10 − 4/10 = 3/10.",
      "Totals can reach one whole: 3/5 + 2/5 = 5/5 = 1. Taking from 1 uses its fraction form: 1 − 2/5 = 5/5 − 2/5 = 3/5.",
      "Use fraction strips, bar models and number lines. Boundary: same denominators only, with answers within one whole. Beyond one whole is Year 4.",
    ],
    misconceptions: [
      { mistake: "Writes 3/8 + 2/8 = 5/16.", why: "Adds the denominators as well as the numerators.", response: "Compare with 3 apples + 2 apples = 5 apples. Eighths are the name of the part, so 3 eighths + 2 eighths = 5 eighths." },
      { mistake: "Cannot work out 1 − 2/5, or subtracts from 1/5.", why: "Does not see that 1 whole can be written as 5/5.", response: "Show a strip of 5 fifths coloured as one whole. Remove 2 fifths and read 3 fifths." },
    ],
    vocabulary: [
      { term: "numerator", meaning: "The top number: how many parts are counted." },
      { term: "denominator", meaning: "The bottom number: the size of each part." },
      { term: "same denominator", meaning: "Fractions made of parts of the same size." },
      { term: "whole", meaning: "The complete amount, equal to 1." },
      { term: "add, subtract", meaning: "Combine or take away fractions, keeping the denominator when it is the same." },
    ],
    before: "Earlier this year pupils count in tenths and place fractions on number lines. In Year 2 they know halves, thirds, quarters and 2/4 = 1/2.",
    next: "Year 4 adds and subtracts fractions with the same denominator beyond one whole. Year 5 meets different denominators.",
  },

  "comparing-and-ordering-fractions": {
    statutory: ["compare and order unit fractions, and fractions with the same denominators"],
    inBrief: "With a common whole, a unit fraction gets smaller as the denominator gets larger. With the same denominator, the larger numerator is the larger fraction.",
    keyFacts: [
      "Unit fractions: the more equal parts the whole is split into, the smaller each part is. 1/8 < 1/5 < 1/2.",
      "Same denominator: compare the numerators. 3/8 < 5/8, because 5 eighths is more than 3 eighths.",
      "Use fraction walls, strips and number lines with equally long wholes, and the symbols <, > and =.",
      "Order three or four fractions of one kind. Boundary: unit fractions or the same denominator only. Different denominators such as 2/3 and 3/4 are later.",
    ],
    misconceptions: [
      { mistake: "Writes 1/8 > 1/5 because 8 is bigger than 5.", why: "Applies whole-number thinking to the denominator.", response: "Share two equal bars, one into 5 parts and one into 8. Compare one part from each: the fifth is bigger." },
      { mistake: "Compares 1/3 and 1/4 using two different-sized shapes.", why: "Forgets that the wholes must be the same size.", response: "Use identical strips or a fraction wall so the comparison is fair." },
    ],
    vocabulary: [
      { term: "greater than (>)", meaning: "Larger in value." },
      { term: "less than (<)", meaning: "Smaller in value." },
      { term: "order", meaning: "Arrange from smallest to largest, or the reverse." },
      { term: "unit fraction", meaning: "A fraction with 1 as the numerator." },
      { term: "fraction wall", meaning: "A set of equal-length bars split into different numbers of equal parts." },
    ],
    before: "In Year 2 pupils recognise unit fractions and that 2/4 is equal to 1/2, using shapes and quantities.",
    next: "Year 4 uses equivalence and decimals, and Year 5 compares and orders fractions with different denominators.",
  },

  "fraction-problems": {
    statutory: ["solve problems that involve all of the above"],
    inBrief: "Pupils combine the Year 3 fraction ideas, which are tenths, fractions of sets, fractions on number lines, equivalence, addition and subtraction, and comparing, to solve short problems.",
    keyFacts: [
      "Draw a bar model first. Zara eats 2/8 of a pizza and Ben eats 3/8. Together they eat 5/8, so 3/8 is left.",
      "Choose the right idea: a fraction of a quantity (find 1/3 of 24 = 8), part of a whole (add or subtract) or a comparison.",
      "State the whole: half of 12 and half of 30 are different amounts.",
      "Boundary: small denominators, same-denominator addition and subtraction within one whole, and tenths. No unlike denominators.",
    ],
    misconceptions: [
      { mistake: "Gives the fraction eaten when asked what fraction is left.", why: "Loses track of what the question asks.", response: "Label the bar with eaten and left. Write the question under the working and check it is answered." },
      { mistake: "Says half of a class of 24 and half of a class of 30 are the same number.", why: "Treats 'half' as a fixed amount, ignoring the whole.", response: "Calculate both: 12 and 15. Compare the sizes of the wholes." },
    ],
    vocabulary: [
      { term: "fraction of", meaning: "Divide the whole into equal parts and take the stated number of parts." },
      { term: "whole", meaning: "The complete amount a fraction is taken from." },
      { term: "bar model", meaning: "A diagram of parts and wholes used to solve problems." },
      { term: "numerator, denominator", meaning: "The top and bottom numbers of a fraction." },
      { term: "equivalent", meaning: "Equal in value though written differently." },
    ],
    before: "In Year 2 pupils find simple fractions of quantities and recognise that 2/4 equals 1/2.",
    next: "Year 4 solves harder fraction problems, including non-unit fractions of quantities and adding and subtracting beyond one whole.",
  },

  // ---------------------------------------------------------------- Measurement
  "measuring-length-in-mm-cm-and-m": {
    statutory: ["measure, compare, add and subtract: lengths (m/cm/mm); mass (kg/g); volume/capacity (l/ml)"],
    inBrief: "Pupils measure and compare lengths in millimetres, centimetres and metres, using a ruler or metre stick accurately and knowing how the units relate.",
    keyFacts: [
      "1 cm = 10 mm and 1 m = 100 cm. Read a ruler by counting the centimetre, then the extra millimetre marks: 5 cm and 3 small marks is 53 mm.",
      "Start measuring from the 0 mark, not the end of the ruler, and read the scale at the right place.",
      "To compare, convert to the same unit: 1 m 40 cm = 140 cm, which is greater than 135 cm.",
      "Record mixed units, such as 2 m 35 cm = 235 cm. Boundary: whole units, with no decimals. Kilometres and conversions are Year 4.",
    ],
    misconceptions: [
      { mistake: "Starts measuring from the end of the ruler instead of the 0 mark, or counts marks instead of gaps.", why: "Does not see that length is the distance travelled from 0.", response: "Line the object up with 0. Slide it along and compare readings. Count the gaps between marks." },
      { mistake: "Says 1 m 40 cm is less than 135 cm because 40 is less than 135.", why: "Compares the numbers without converting to the same unit.", response: "Convert both to centimetres: 140 cm and 135 cm. Then compare." },
      { mistake: "Says 1 m is 10 cm.", why: "Overgeneralises the 10 mm in 1 cm to all units.", response: "Lay a metre stick next to a ruler. Count the 100 centimetres in 1 m, and the 10 millimetres in 1 cm." },
    ],
    vocabulary: [
      { term: "millimetre (mm)", meaning: "A very small unit of length; 10 mm make 1 cm." },
      { term: "centimetre (cm)", meaning: "A unit of length; 100 cm make 1 m." },
      { term: "metre (m)", meaning: "A unit of length equal to 100 centimetres." },
      { term: "length", meaning: "How long something is from one end to the other." },
      { term: "scale", meaning: "The marks and numbers on a measuring tool." },
    ],
    before: "In Year 2 pupils choose and use standard units to estimate and measure length and height in metres and centimetres, and compare lengths.",
    next: "Year 4 converts between units such as kilometres and metres, and measures perimeter and area of rectilinear shapes.",
  },

  "measuring-mass": {
    statutory: ["measure, compare, add and subtract: lengths (m/cm/mm); mass (kg/g); volume/capacity (l/ml)"],
    inBrief: "Pupils read scales and weigh objects in grams and kilograms, knowing that 1 kg is 1000 g, and compare masses using the same unit.",
    keyFacts: [
      "1 kg = 1000 g. A scale marked in 100 g steps has a halfway mark that is 50 g more.",
      "Work out what each division on a scale is worth before reading: count the steps between two labelled numbers.",
      "To compare, convert to grams: 1 kg 300 g = 1300 g, which is greater than 1250 g.",
      "Use balances for comparing and kitchen scales for measuring. Boundary: whole numbers of kilograms and grams, with no decimal kilograms.",
    ],
    misconceptions: [
      { mistake: "Reads a scale with 100 g labels and unmarked steps as if each step were 1.", why: "Assumes every mark is worth one, without finding the interval.", response: "Pick two labelled numbers and count the steps between them. If there are 2 steps between 200 g and 300 g, each is 50 g." },
      { mistake: "Says 1 kg is 100 g.", why: "Carries over the 100 from metres and centimetres.", response: "Balance a 1 kg mass against ten 100 g masses. Count them." },
      { mistake: "Says the bigger object is always the heavier.", why: "Judges mass by size.", response: "Compare a large pillow with a small brick on a balance. Discuss why size and mass differ." },
    ],
    vocabulary: [
      { term: "mass", meaning: "How much matter is in an object, measured in grams and kilograms." },
      { term: "kilogram (kg)", meaning: "A unit of mass equal to 1000 grams." },
      { term: "gram (g)", meaning: "A small unit of mass." },
      { term: "balance", meaning: "Scales that compare two masses by tipping." },
      { term: "scale", meaning: "The marks and numbers on a measuring tool." },
    ],
    before: "In Year 2 pupils choose and use standard units to measure mass in kilograms and grams and compare and order masses.",
    next: "Year 4 converts kilograms to grams and works with mass in problems. Decimal kilograms come in Year 5.",
  },

  "measuring-volume-and-capacity": {
    statutory: ["measure, compare, add and subtract: lengths (m/cm/mm); mass (kg/g); volume/capacity (l/ml)"],
    inBrief: "Pupils read measuring jugs and cylinders in litres and millilitres, knowing that 1 l is 1000 ml, and compare amounts of liquid or the capacity of containers.",
    keyFacts: [
      "Capacity is how much a container can hold. Volume is how much liquid is actually in it.",
      "1 l = 1000 ml. Read the level of the liquid at eye level against the scale, working out what each division is worth.",
      "Convert to millilitres to compare: 1 l 400 ml = 1400 ml, which is less than 1500 ml.",
      "Use real containers for pouring and measuring. Boundary: litres and millilitres only. Cubic centimetres are later.",
    ],
    misconceptions: [
      { mistake: "Says a tall thin container holds more than a short wide one.", why: "Judges capacity by height, ignoring width.", response: "Pour from one container into the other and compare. Estimate first, then check." },
      { mistake: "Reads the next line the liquid has passed rather than the line it has reached.", why: "Counts marks passed instead of the level of the surface.", response: "Look at the liquid level, then read the nearest line below, then count on from it." },
      { mistake: "Says 1 l is 100 ml.", why: "Carries over the 100 from metres and centimetres.", response: "Fill a 1 l jug using a 100 ml cup. Count 10 cups." },
    ],
    vocabulary: [
      { term: "capacity", meaning: "The amount a container can hold." },
      { term: "volume", meaning: "The amount of liquid in a container." },
      { term: "litre (l)", meaning: "A unit of volume equal to 1000 millilitres." },
      { term: "millilitre (ml)", meaning: "A small unit of volume." },
      { term: "measuring jug", meaning: "A container with a scale used to measure liquid." },
    ],
    before: "In Year 2 pupils choose and use standard units to measure volume and capacity in litres and compare and order them.",
    next: "Year 4 converts between units of volume and uses them in problems. Volume in cubic units comes in Year 5.",
  },

  "adding-and-subtracting-measurements": {
    statutory: ["measure, compare, add and subtract: lengths (m/cm/mm); mass (kg/g); volume/capacity (l/ml)"],
    inBrief: "Pupils add and subtract lengths, masses and capacities, converting mixed units to the smaller unit first so that the calculation is with whole numbers.",
    keyFacts: [
      "With the same unit, calculate with the numbers and keep the unit: 450 ml + 300 ml = 750 ml.",
      "With mixed units, convert to the smaller unit: 2 kg − 300 g = 2000 g − 300 g = 1700 g, which is 1 kg 700 g.",
      "When subtracting, swap a big unit for small units: 2 m − 30 cm becomes 1 m 100 cm − 30 cm = 1 m 70 cm.",
      "Use columns for bigger numbers. Boundary: whole numbers of the units, within 1000 in each part. No decimal notation.",
    ],
    misconceptions: [
      { mistake: "Writes 1 m 20 cm + 1 m 90 cm = 2 m 110 cm.", why: "Does not exchange 100 cm for 1 m.", response: "Convert 110 cm to 1 m 10 cm. Add it to the 2 m to get 3 m 10 cm." },
      { mistake: "Writes 2 kg − 300 g = 298 g.", why: "Ignores the units and subtracts the smaller number from the larger.", response: "Ask pupils to check that both amounts use the same unit. Convert 2 kg to 2000 g." },
    ],
    vocabulary: [
      { term: "convert", meaning: "Change an amount from one unit to another." },
      { term: "unit", meaning: "A standard amount used to measure, such as cm or kg." },
      { term: "mixed units", meaning: "An amount using two units, such as 1 kg 200 g." },
      { term: "exchange", meaning: "Swap a larger unit for smaller ones, or the reverse." },
      { term: "total, difference", meaning: "The result of adding, and the result of subtracting." },
    ],
    before: "In Year 2 pupils compare and order measures and solve simple problems adding and subtracting in the same unit.",
    next: "Year 4 converts between units, such as kilometres to metres, and uses decimal notation for measures and money.",
  },

  "perimeter-of-2-d-shapes": {
    statutory: ["measure the perimeter of simple 2-D shapes"],
    inBrief: "Perimeter is the distance all the way round the edge of a shape. Pupils find it by measuring or adding every side.",
    keyFacts: [
      "Add the length of every side: a 5 cm by 3 cm rectangle has 5 + 3 + 5 + 3 = 16 cm. Mark a start and stop when back there.",
      "A square has four equal sides, so a square with sides of 9 m has a perimeter of 9 + 9 + 9 + 9 = 36 m.",
      "Find a missing side by subtraction: with a perimeter of 30 cm and known sides 9, 6 and 9 cm, 30 − 24 = 6 cm.",
      "Boundary: simple 2-D shapes such as rectangles, squares and polygons. Area, formulas and rectilinear problems are Year 4.",
    ],
    misconceptions: [
      { mistake: "Adds two sides of a 5 cm by 3 cm rectangle to get 8 cm.", why: "Thinks the opposite sides do not need to be added, or counts only labelled sides.", response: "Trace the boundary with a finger and count the sides. A rectangle has four." },
      { mistake: "Confuses perimeter with area and counts the squares inside the shape.", why: "Mixes up distance round the edge with the space covered.", response: "Walk the edge of a shape on the floor. Say 'around' for perimeter and 'inside' for area." },
    ],
    vocabulary: [
      { term: "perimeter", meaning: "The distance all the way round the outside of a shape." },
      { term: "side", meaning: "A straight edge of a 2-D shape." },
      { term: "length", meaning: "How long a side is." },
      { term: "rectangle", meaning: "A four-sided shape with four right angles and opposite sides equal." },
      { term: "square", meaning: "A rectangle with four equal sides." },
    ],
    before: "In Year 2 pupils measure lengths with rulers, identify 2-D shapes and count their sides.",
    next: "Year 4 measures and calculates perimeter of rectilinear figures in centimetres and metres and finds area by counting squares.",
  },

  "money-and-giving-change": {
    statutory: ["add and subtract amounts of money to give change, using both £ and p in practical contexts"],
    inBrief: "Pupils add and subtract amounts in pounds and pence, convert pounds to pence when needed and work out change by counting on from the price.",
    keyFacts: [
      "Treat £ and p separately: £1 = 100p, so £1.60 + £2.25 is £3 and 85p, which is £3.85. Convert pounds to pence to subtract.",
      "Give change by counting on from the price to the amount paid: for a £2.70 item paid for with £5, count 30p to £3, then £2 to £5, which makes £2.30 (230p).",
      "Two-step problems: 2 pens at 40p are 80p, so change from £2 (200p) is 120p.",
      "Boundary: manageable amounts, and a few coins. Bix may display £3.75 as notation, but calculations stay in pounds and pence. Formal decimal money is Year 4.",
    ],
    misconceptions: [
      { mistake: "Writes £2 and 50p as 52p.", why: "Ignores the units and adds the numbers.", response: "Convert both to pence: 200p + 50p = 250p, or add the pounds and pence separately." },
      { mistake: "Writes £5 − £2.70 = £3.70.", why: "Subtracts the pounds and copies the pence, without exchanging a pound for 100p.", response: "Count on instead: 30p to £3 then £2 to £5. The change is £2.30." },
    ],
    vocabulary: [
      { term: "pound (£)", meaning: "A unit of money equal to 100 pence." },
      { term: "pence (p)", meaning: "A small unit of money; 100p make £1." },
      { term: "change", meaning: "The money you get back when you pay more than the cost." },
      { term: "cost, price", meaning: "How much money something is sold for." },
      { term: "count on", meaning: "Add on from the price up to the amount paid to find the change." },
    ],
    before: "In Year 2 pupils recognise £ and p, combine amounts and solve simple money problems, including giving change, in the same unit.",
    next: "Year 4 writes money using decimal notation, converts pounds to pence and solves problems with amounts in pounds and pence.",
  },

  "telling-the-time-to-the-minute": {
    statutory: ["estimate and read time with increasing accuracy to the nearest minute"],
    inBrief: "Pupils read analogue clocks to the nearest minute, counting in fives round the numbers and then in ones, and say the time as minutes past or to the hour.",
    keyFacts: [
      "The hour hand is the short hand and the minute hand is the long hand. Count in 5s round the numbers, then count the small marks.",
      "Up to half past, say minutes past the hour. After half past, say minutes to the next hour: 3:48 is 12 minutes to 4, because 60 − 48 = 12.",
      "Read the hour from the hour hand carefully when it is nearly at the next hour: at 3:48 it is nearly at 4, but the hour is still 3.",
      "Find durations over an hour by counting on: 3:48 to 4:15 is 12 + 15 = 27 minutes. Boundary: to the nearest minute, on analogue and digital 12-hour clocks.",
    ],
    misconceptions: [
      { mistake: "Reads a minute hand pointing at 7 as 7 minutes.", why: "Reads the number rather than counting in fives.", response: "Count 5, 10, 15 ... round the dial. Link to the 5 times table. 7 means 35 minutes." },
      { mistake: "Reads 3:48 as 4:48.", why: "The hour hand is close to 4, so assumes the hour is 4.", response: "Check the minute hand first. If it has not passed 12, the next hour has not been reached. The hour is 3." },
      { mistake: "Says 3:48 is 12 past 3.", why: "Mixes up 'past' and 'to', using the number of minutes to the hour with the wrong word.", response: "Show 3:48 on a clock. The minute hand is in the second half, so count how far to 4: 12 minutes to 4." },
    ],
    vocabulary: [
      { term: "hour hand", meaning: "The short hand, which shows the hour." },
      { term: "minute hand", meaning: "The long hand, which shows the minutes." },
      { term: "past, to", meaning: "Say minutes past the hour up to half past, then minutes to the next hour." },
      { term: "o'clock", meaning: "Exactly on the hour." },
      { term: "analogue", meaning: "A clock with hands and a dial." },
      { term: "digital", meaning: "A clock showing the time as numbers." },
    ],
    before: "In Year 2 pupils tell and write the time to five minutes, including quarter past and quarter to, and draw hands on clock faces.",
    next: "Year 4 reads, writes and converts time between analogue and digital 12-hour and 24-hour clocks.",
  },

  "roman-numerals-and-24-hour-clocks": {
    statutory: ["tell and write the time from an analogue clock, including using Roman numerals from I to XII, and 12-hour and 24-hour clocks"],
    inBrief: "Pupils read clocks marked with Roman numerals I to XII and convert times between 12-hour (am and pm) and 24-hour notation.",
    keyFacts: [
      "I = 1, V = 5 and X = 10. A smaller numeral before a larger one subtracts (IV = 4, IX = 9). After it, it adds (VI = 6, XI = 11). XII = 12.",
      "For am times, keep the hour: 8:20 am is 08:20. For pm times, add 12 to the hour: 8:20 pm is 20:20.",
      "To read a 24-hour time, if the hour is above 12 subtract 12 and write pm: 17:25 is 5:25 pm. Noon is 12:00 and midnight is 00:00.",
      "Boundary: Roman numerals only from I to XII on the dial. The guidance says pupils become fluent with digital 24-hour clocks in Year 4.",
    ],
    misconceptions: [
      { mistake: "Reads IV as 6.", why: "Adds I and V regardless of order.", response: "Teach the rule: a smaller numeral before a larger one is taken away. IV is 5 − 1 = 4. Use the position on the clock to check." },
      { mistake: "Reads 17:25 as 7:25 pm.", why: "Subtracts 10 instead of 12.", response: "Use a clock face with 13 to 24 inside the dial. 17 − 12 = 5, so 17:25 is 5:25 pm." },
      { mistake: "Writes 12:30 pm as 24:30 or 00:30.", why: "Adds 12 to 12 for all pm times, or confuses noon with midnight.", response: "Show noon at 12:00 as the start of the afternoon. 00:30 is just after midnight." },
    ],
    vocabulary: [
      { term: "Roman numeral", meaning: "A letter symbol used for numbers, such as I, V and X." },
      { term: "12-hour clock", meaning: "A clock that counts hours 1 to 12, with am and pm." },
      { term: "24-hour clock", meaning: "A clock that counts hours from 00 to 23." },
      { term: "am, pm", meaning: "am is before noon; pm is after noon." },
      { term: "noon, midnight", meaning: "12 in the day and 12 at night." },
    ],
    before: "In Year 2 pupils tell and write time to five minutes and sequence events in time.",
    next: "Year 4 reads, writes and converts between 12-hour and 24-hour time, and reads Roman numerals up to 100 (I to C).",
  },

  "units-of-time-and-durations": {
    statutory: ["know the number of seconds in a minute and the number of days in each month, year and leap year", "compare durations of events"],
    inBrief: "Pupils learn the key facts about time, which are 60 seconds in a minute, days in each month and 365 or 366 days in a year, and use them to compare and calculate durations.",
    keyFacts: [
      "60 seconds make 1 minute, 60 minutes make 1 hour and 24 hours make 1 day. A year has 365 days, and a leap year has 366.",
      "30 days have September, April, June and November. All the others have 31, except February with 28 (29 in a leap year).",
      "Compare durations in the same unit: 1 hour 10 minutes is 70 minutes, which is more than 65 minutes.",
      "Find elapsed time by counting on through the next hour: 13:45 to 14:20 is 15 + 20 = 35 minutes. Boundary: durations of a few hours, with no time zones.",
    ],
    misconceptions: [
      { mistake: "Works out 13:45 to 14:20 as 25 minutes.", why: "Subtracts the smaller number from the larger, 45 − 20, treating minutes like decimal digits.", response: "Count on to 14:00 first (15 minutes), then to 14:20 (20 more). 15 + 20 = 35 minutes." },
      { mistake: "Says 1 hour 10 minutes is 110 minutes.", why: "Joins the hours and minutes as in base ten, instead of using 60 minutes in an hour.", response: "Show 60 + 10 = 70 on a number line. Use a clock face to see an hour is a full circle." },
      { mistake: "Says there are 100 seconds in a minute.", why: "Expects time units to follow base ten.", response: "Count 60 seconds on a clock. Discuss why time units use 60, 24 and 7." },
    ],
    vocabulary: [
      { term: "second, minute, hour", meaning: "Units of time: 60 seconds make a minute, 60 minutes make an hour." },
      { term: "day, month, year", meaning: "Longer units of time: a year has 12 months." },
      { term: "leap year", meaning: "A year with 366 days, with 29 days in February." },
      { term: "duration", meaning: "How long something lasts." },
      { term: "elapsed time", meaning: "The time that passes between a start and an end." },
    ],
    before: "In Year 2 pupils know the number of minutes in an hour and hours in a day, and compare and sequence intervals of time.",
    next: "Year 4 converts between units of time, such as hours to minutes, minutes to seconds, years to months and weeks to days.",
  },

  // ---------------------------------------------------------------- Geometry
  "drawing-2-d-shapes": {
    statutory: ["draw 2-D shapes"],
    inBrief: "Pupils draw squares, rectangles, triangles and polygons accurately with a ruler, using the number of sides, equal sides and right angles to guide them.",
    keyFacts: [
      "Draw with a ruler and pencil, and join every corner: a closed shape has no gaps. Practise first on squared and dotted paper.",
      "Name polygons by the number of sides: quadrilateral 4, pentagon 5, hexagon 6, octagon 8. Corners are called vertices.",
      "Use properties to draw: a rectangle has four right angles and equal opposite sides, and a square has four equal sides and four right angles.",
      "A shape stays the same shape when turned. Boundary: drawing to given properties. Classifying triangles and quadrilaterals formally is Year 4.",
    ],
    misconceptions: [
      { mistake: "Says a square turned on its corner is a diamond, not a square.", why: "Judges a shape by the way it is positioned rather than its properties.", response: "Turn the shape in front of them and check: still four equal sides and four right angles." },
      { mistake: "Draws a shape with a gap where two sides do not meet.", why: "Draws freehand without checking each corner is joined.", response: "Trace each side, then check that the line returns to where it started. Count the sides." },
    ],
    vocabulary: [
      { term: "polygon", meaning: "A closed 2-D shape with straight sides." },
      { term: "side", meaning: "A straight edge of a 2-D shape." },
      { term: "vertex (vertices)", meaning: "A corner where two sides meet." },
      { term: "quadrilateral", meaning: "A polygon with four sides." },
      { term: "pentagon, hexagon, octagon", meaning: "Polygons with 5, 6 and 8 sides." },
    ],
    before: "In Year 2 pupils identify and describe the properties of 2-D shapes, including the number of sides and line symmetry.",
    next: "Year 4 compares and classifies quadrilaterals and triangles by their properties, and completes simple symmetrical figures.",
  },

  "making-and-recognising-3-d-shapes": {
    statutory: ["make 3-D shapes using modelling materials; recognise 3-D shapes in different orientations and describe them"],
    inBrief: "Pupils build 3-D shapes with straws, clay and other materials, and recognise and describe them by their faces, edges and vertices in any orientation.",
    keyFacts: [
      "A cube and a cuboid each have 6 faces, 12 edges and 8 vertices. A triangular prism has 5 faces, 9 edges and 6 vertices.",
      "A square-based pyramid has 5 faces, 8 edges and 5 vertices. A cylinder has 2 flat faces and 1 curved face, and a sphere has 1 curved face.",
      "Build from straws and modelling clay to see edges and vertices, and handle solid shapes to count faces.",
      "Shapes are the same when turned. Boundary: describing shapes by faces, edges and vertices. Nets are later.",
    ],
    misconceptions: [
      { mistake: "Says a cube has 4 faces.", why: "Counts only the faces that are visible.", response: "Handle the cube and mark each face with a counter. Roll it to find the hidden ones. There are 6." },
      { mistake: "Says a cube has 12 corners.", why: "Confuses edges with vertices.", response: "Show an edge as a straight line where two faces meet and a vertex as a point. Count each separately." },
      { mistake: "Calls a cube a square.", why: "Uses the 2-D name for the face of the shape.", response: "Compare the flat square with the solid cube. A cube has 6 square faces." },
    ],
    vocabulary: [
      { term: "face", meaning: "A flat or curved surface of a 3-D shape." },
      { term: "edge", meaning: "Where two faces meet along a line." },
      { term: "vertex (vertices)", meaning: "A point where edges meet." },
      { term: "cube, cuboid", meaning: "Solid shapes with 6 rectangular faces; a cube's faces are all squares." },
      { term: "prism, pyramid", meaning: "A prism has two matching ends; a pyramid comes to a point." },
    ],
    before: "In Year 2 pupils identify and describe the properties of 3-D shapes, including edges, vertices and faces.",
    next: "Year 4 classifies shapes by properties. Year 5 identifies 3-D shapes from 2-D representations.",
  },

  "angles-as-turns": {
    statutory: ["recognise angles as a property of shape or a description of a turn"],
    inBrief: "An angle is the amount of turn between two lines at a point. It can be a corner of a shape or a description of a turn.",
    keyFacts: [
      "An angle measures turn, not length: a bigger turn is a bigger angle, however long the arms are drawn.",
      "Describe turns as quarter, half, three-quarter and full turns, clockwise or anticlockwise.",
      "Turn the body, a clock hand or a toy robot to feel angles, and relate them to corners in shapes.",
      "Boundary: no degrees, which come in Year 5. Comparing with a right angle comes next in Year 3.",
    ],
    misconceptions: [
      { mistake: "Says an angle with longer arms is bigger.", why: "Judges size by the length of the lines drawn.", response: "Draw the same angle with short and long arms, or use two strips fixed at a corner. The amount of turn is the same." },
      { mistake: "Turns anticlockwise for a clockwise quarter turn.", why: "Mixes up the directions, which are not yet fixed in memory.", response: "Model with a clock face. Clockwise goes the way the hands go. Practise with a pointer on the floor." },
    ],
    vocabulary: [
      { term: "angle", meaning: "The amount of turn between two lines that meet at a point." },
      { term: "turn", meaning: "A movement around a point." },
      { term: "quarter turn, half turn", meaning: "A quarter or a half of a full turn." },
      { term: "clockwise", meaning: "In the direction the hands of a clock move." },
      { term: "anticlockwise", meaning: "In the opposite direction to the hands of a clock." },
    ],
    before: "In Year 2 pupils describe movement and turns, using quarter, half and three-quarter turns, clockwise and anticlockwise.",
    next: "Year 4 identifies acute and obtuse angles and orders them. Year 5 measures angles in degrees with a protractor.",
  },

  "right-angles": {
    statutory: ["identify right angles, recognise that two right angles make a half-turn, three make three quarters of a turn and four a complete turn"],
    inBrief: "A right angle is a quarter turn, the corner of a square. Two right angles make a half turn, three make three-quarters and four make a full turn.",
    keyFacts: [
      "Check right angles with a right-angle tester, such as paper folded twice, and look for them in squares, rectangles and the corners of rooms.",
      "A right angle is a quarter turn: 2 make a half turn, 3 make three-quarters and 4 make a full turn.",
      "A right angle can be in any orientation, not only with one line horizontal and one vertical. The small square symbol marks it.",
      "Boundary: right angles and turns made of them. Naming 90 degrees and measuring are later.",
    ],
    misconceptions: [
      { mistake: "Says an angle is only a right angle if one arm is horizontal and one vertical.", why: "Has only seen right angles in the standard orientation.", response: "Turn the shape and test with a right-angle tester. Right angles can face any direction." },
      { mistake: "Says every corner in a triangle or hexagon is a right angle.", why: "Takes 'corner' to mean 'right angle'.", response: "Check each corner with a tester. Sort into right angles, smaller and larger." },
      { mistake: "Says four right angles make a half turn.", why: "Confuses the number of right angles with the fraction of a turn.", response: "Stand and turn a quarter at a time. Two quarters is a half turn. Four is back where you began." },
    ],
    vocabulary: [
      { term: "right angle", meaning: "A quarter turn; the angle in the corner of a square." },
      { term: "quarter turn", meaning: "One right angle of turn." },
      { term: "half turn", meaning: "Two right angles of turn." },
      { term: "three-quarter turn", meaning: "Three right angles of turn." },
      { term: "full turn", meaning: "Four right angles of turn, back to the start." },
    ],
    before: "In Year 2 pupils use right angles to describe quarter, half and three-quarter turns.",
    next: "Year 4 identifies acute and obtuse angles. Year 5 knows a right angle is 90 degrees and measures angles.",
  },

  "comparing-angles-to-a-right-angle": {
    statutory: ["identify whether angles are greater than or less than a right angle"],
    inBrief: "Pupils compare any angle with a right angle using a tester and say whether it is smaller (acute) or larger (obtuse) than a right angle.",
    keyFacts: [
      "Place the corner of a right-angle tester on the angle. If the angle fits inside the tester, it is less than a right angle.",
      "An angle greater than a right angle opens wider than the tester. Two right angles make a straight line.",
      "The names acute (less than a right angle) and obtuse (greater, but less than two right angles) can be introduced.",
      "Boundary: compare with a right angle only. No degrees and no reflex angles.",
    ],
    misconceptions: [
      { mistake: "Judges an angle by the length of its arms.", why: "Confuses the size of the drawing with the amount of turn.", response: "Compare two drawings with the tester. The arms may be long, but the opening is what counts." },
      { mistake: "Says acute is greater than a right angle.", why: "Mixes up the names acute and obtuse.", response: "Say acute is 'a cute little angle'. Sort real angles into groups and label them." },
      { mistake: "Says a tilted right angle looks less than a right angle.", why: "Relies on how the angle looks in a new position.", response: "Rotate the angle and use the tester. Orientation does not change the size." },
    ],
    vocabulary: [
      { term: "right angle", meaning: "A quarter turn, like the corner of a square." },
      { term: "greater than a right angle", meaning: "Opens wider than a quarter turn." },
      { term: "less than a right angle", meaning: "Opens less than a quarter turn." },
      { term: "acute", meaning: "An angle less than a right angle." },
      { term: "obtuse", meaning: "An angle greater than a right angle but less than two." },
    ],
    before: "In Year 2 pupils use right angles to describe quarter, half and three-quarter turns.",
    next: "Year 4 identifies acute and obtuse angles and orders them up to two right angles. Year 5 measures in degrees.",
  },

  "horizontal-vertical-parallel-and-perpendicular-lines": {
    statutory: ["identify horizontal and vertical lines and pairs of perpendicular and parallel lines"],
    inBrief: "Pupils identify lines that are horizontal or vertical, and pairs of lines that are parallel (always the same distance apart) or perpendicular (meeting at a right angle).",
    keyFacts: [
      "A horizontal line is level, like the horizon. A vertical line goes straight up and down, like a plumb line.",
      "Parallel lines stay the same distance apart and never meet, however far they go. They can be in any direction.",
      "Perpendicular lines meet at a right angle, which can be tested with a right-angle tester. They can be in any direction.",
      "A rectangle has two pairs of parallel sides, and every pair of neighbouring sides is perpendicular. Boundary: identifying pairs, not drawing them with instruments.",
    ],
    misconceptions: [
      { mistake: "Says parallel lines must be horizontal or vertical.", why: "Has mainly seen parallel lines in standard positions.", response: "Show tilted parallel lines, such as railway tracks. Check that they stay the same distance apart." },
      { mistake: "Says perpendicular lines must be one horizontal and one vertical.", why: "Links 'right angle' to the standard orientation.", response: "Turn the page and test with a right-angle tester. Perpendicular lines can be tilted." },
      { mistake: "Says two lines of different lengths cannot be parallel.", why: "Mixes up length with the distance between lines.", response: "Draw parallel lines of different lengths. Measure the gap at two places to show it is equal." },
    ],
    vocabulary: [
      { term: "horizontal", meaning: "Level, like the horizon." },
      { term: "vertical", meaning: "Straight up and down." },
      { term: "parallel", meaning: "Always the same distance apart and never meeting." },
      { term: "perpendicular", meaning: "Meeting at a right angle." },
      { term: "right angle", meaning: "A quarter turn, like the corner of a square." },
    ],
    before: "In Year 2 pupils describe position and direction and use right angles for turns.",
    next: "Year 4 uses parallel and perpendicular sides to classify shapes. Year 5 draws angles with a protractor.",
  },

  // ---------------------------------------------------------------- Statistics
  "bar-charts": {
    statutory: ["interpret and present data using bar charts, pictograms and tables"],
    inBrief: "Pupils read and draw bar charts with a scale, using the axis labels to find the value of each bar, including bars that end between labelled lines.",
    keyFacts: [
      "A bar chart has a title, labelled axes, a scale and bars of equal width. Categories go on one axis and the count on the other.",
      "Work out the scale before reading. If lines go up in 2s, a bar ending halfway between 4 and 6 shows 5.",
      "Draw bars from 0 to the correct height, with equal gaps and the scale marked clearly.",
      "Boundary: scales of 1, 2, 5 and 10, with whole-number categorical data. Line graphs and time graphs are Year 4 and later.",
    ],
    misconceptions: [
      { mistake: "Reads each gridline as 1 when the scale goes up in 2s.", why: "Assumes the scale counts in ones without checking the labels.", response: "Ask pupils to say the labels in order and find the step between them before reading any bars." },
      { mistake: "Reads a bar ending between 4 and 6 as 4 or 6.", why: "Gives the nearest label instead of working out the in-between value.", response: "Find the step and halve it: halfway between 4 and 6 is 5. Mark the middle line." },
      { mistake: "Gives the category when asked for the frequency.", why: "Reads the question too quickly and confuses 'which' with 'how many'.", response: "Underline the question words. Ask whether the answer is a name or a number." },
    ],
    vocabulary: [
      { term: "bar chart", meaning: "A chart using bars to show how many in each group." },
      { term: "axis", meaning: "One of the two lines on a chart, with labels or a scale." },
      { term: "scale", meaning: "The numbers on an axis, going up in equal steps." },
      { term: "frequency", meaning: "How many times something happens or how many there are." },
      { term: "data", meaning: "Facts or information that are collected, such as a count." },
      { term: "title", meaning: "The heading that tells you what a chart shows." },
    ],
    before: "In Year 2 pupils interpret and build simple pictograms, tally charts, block diagrams and tables, and answer questions about them.",
    next: "Year 4 interprets and presents discrete and continuous data, including bar charts and time graphs. Year 5 uses line graphs.",
  },

  "scaled-pictograms": {
    statutory: ["interpret and present data using bar charts, pictograms and tables"],
    inBrief: "In a scaled pictogram one symbol stands for more than one item. Pupils read the key first, then multiply, using half symbols for half the value.",
    keyFacts: [
      "Read the key before anything else: if each symbol is 5 pupils, then 7 symbols show 7 × 5 = 35.",
      "A half symbol is half the key value: with a key of 10, a half symbol is 5. With a key of 2, it is 1.",
      "When drawing, choose the scale, write the key and draw symbols of the same size evenly spaced.",
      "Boundary: scales of 2, 5 and 10 per symbol. Skip counting in those steps helps.",
    ],
    misconceptions: [
      { mistake: "Counts every symbol as 1 whatever the key says.", why: "Carries over the one-symbol-one-item rule from earlier pictograms.", response: "Write the key value beside each row and skip count. Ask pupils to say 'each picture is 5' before reading." },
      { mistake: "Treats a half symbol as 1 or ignores it.", why: "Does not link the half symbol to the key value.", response: "Show a symbol cut in half. Half of 10 is 5. Ask what half of the key is each time." },
      { mistake: "Draws symbols of different sizes or spacing, so one row looks bigger.", why: "Does not see that size and position carry meaning.", response: "Use a template symbol or squares so every symbol takes up equal space." },
    ],
    vocabulary: [
      { term: "pictogram", meaning: "A chart using pictures or symbols to show data." },
      { term: "symbol", meaning: "A small picture standing for a number of items." },
      { term: "key", meaning: "A note saying how many each symbol stands for." },
      { term: "scale", meaning: "The number each symbol is worth, such as 2, 5 or 10." },
      { term: "half symbol", meaning: "Half a picture, showing half the key value." },
    ],
    before: "In Year 2 pupils interpret and build simple pictograms, usually with one symbol standing for one item.",
    next: "Year 4 reads and draws charts with a wider range of scales. Year 5 uses line graphs and tables such as timetables.",
  },

  "tables": {
    statutory: ["interpret and present data using bar charts, pictograms and tables"],
    inBrief: "Pupils read information from tables and tally charts, find the cell where a row and column meet, and draw their own tables to present data.",
    keyFacts: [
      "Find a value by reading along the row and down the column to where they meet.",
      "A tally chart groups marks in fives, with four upright strokes crossed by a fifth. Count in fives, then ones.",
      "A frequency table gives the counts, and a total row or column adds them. Two-way tables sort by two things.",
      "Boundary: simple tables with whole-number data. Timetables are Year 5.",
    ],
    misconceptions: [
      { mistake: "Reads the neighbouring cell instead of the one asked for.", why: "Eyes drift between rows and columns without a guide.", response: "Use a finger or ruler for the row and another for the column. Say the row and column names aloud." },
      { mistake: "Reads three tally bundles and two single marks as 5.", why: "Counts each bundle as one instead of five.", response: "Skip count the bundles in fives: 5, 10, 15, then add 2 to make 17." },
      { mistake: "Chooses the 'Total' as the most popular category.", why: "Includes the total in the comparison.", response: "Cross out the total row or column before comparing the others." },
    ],
    vocabulary: [
      { term: "table", meaning: "Data organised in rows and columns." },
      { term: "row", meaning: "A line of cells going across." },
      { term: "column", meaning: "A line of cells going down." },
      { term: "tally", meaning: "Marks used to count, grouped in fives." },
      { term: "frequency", meaning: "How many times something occurs." },
      { term: "total", meaning: "All the numbers added together." },
    ],
    before: "In Year 2 pupils use simple tables and tally charts to organise data, and answer questions about them.",
    next: "Year 4 uses tables as part of interpreting discrete data. Year 5 reads and completes timetables.",
  },

  "one-step-and-two-step-questions": {
    statutory: ["solve one-step and two-step questions", "using information presented in scaled bar charts and pictograms and tables"],
    inBrief: "Pupils answer questions such as 'How many more?' and 'How many fewer?' from scaled charts and tables, using one calculation or two.",
    keyFacts: [
      "Read the title, key and scale first. Then find the values the question needs and write them down.",
      "One-step: the bars show 35 children chose red and 20 chose blue. How many more chose red? 35 − 20 = 15.",
      "Two-step: red 35, green 10 and blue 20. How many more chose red and green together than blue? 35 + 10 = 45, then 45 − 20 = 25.",
      "Use bar models to show differences. Boundary: whole numbers within 1000, with sums and differences only. No averages.",
    ],
    misconceptions: [
      { mistake: "Answers 'How many more chose red than blue?' with 55.", why: "Adds the two values instead of finding the gap between them.", response: "Draw the two bars side by side and mark the difference. 35 − 20 = 15." },
      { mistake: "Gives the answer to the first step of a two-step question.", why: "Treats the first result as the answer without reading the question again.", response: "Write the question under the working. Ask: does this number answer it?" },
      { mistake: "Reads a pictogram with a key of 5 and counts 4 symbols as 4.", why: "Ignores the scale in the key.", response: "Write the key value next to the row and skip count: 5, 10, 15, 20." },
    ],
    vocabulary: [
      { term: "how many more", meaning: "A question asking for the difference between two amounts." },
      { term: "how many fewer", meaning: "A question asking how much smaller one amount is than another." },
      { term: "total", meaning: "The amount when values are added together." },
      { term: "difference", meaning: "The gap between two numbers, found by subtracting." },
      { term: "scale, key", meaning: "What each step or symbol on a chart is worth." },
    ],
    before: "In Year 2 pupils ask and answer questions about totalling and comparing categorical data.",
    next: "Year 4 solves comparison, sum and difference problems using information in bar charts, pictograms, tables and other graphs.",
  },
};
