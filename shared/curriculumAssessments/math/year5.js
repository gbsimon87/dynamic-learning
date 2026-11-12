// Year 5 Maths: authored candidates and skill-specific practice destinations.
import { defineAssessmentBank } from "../../curriculumJourneyAuthoring.js";

const table = (caption, headings, rows, alt) => ({ renderer: "table", alt, data: { caption, headings, rows } });
const diagram = (title, kind, fields, alt) => ({ renderer: "lesson", alt, data: { type: "diagram", title, kind, ...fields, label: alt } });
const bars = (parts, shaded, label, alt) => ({ renderer: "lesson", alt, data: { type: "bar", title: "Equal parts of one whole", bars: [{ parts, shaded, label }] } });
const graph = (values, labels, unit, step, alt) => diagram("Read the line graph", "graph", { values, labels, unit, step }, alt);
const buses = table("Bus timetable", ["Bus", "Park", "Library", "Station"], [["A", "09:10", "09:25", "09:45"], ["B", "09:40", "09:55", "10:10"], ["C", "10:05", "10:20", "10:45"]], "Bus A: Park 09:10, Library 09:25, Station 09:45. Bus B: Park 09:40, Library 09:55, Station 10:10. Bus C: Park 10:05, Library 10:20, Station 10:45.");

export default defineAssessmentBank({
  year: 5, subject: "math", version: 1, speech: "prompt",
  quests: {
    "number---number-and-place-value": {
      "place-value-to-a-million": { objective: "Read and partition numbers to a million and identify digit values.", items: [
        { q: "What is the value of the digit 7 in 572,406?", n: 70000, practice: 1, why: "The 7 is in the ten-thousands place, so its value is 70,000." },
        { q: "Write three hundred and four thousand and nineteen in digits.", n: 304019, practice: 2, why: "304 thousand and 19 makes 304,019. Zeros hold the empty places." },
        { q: "Which sum builds 608,052?", a: "600,000 + 8000 + 50 + 2", d: ["600,000 + 800 + 50 + 2", "600,000 + 80,000 + 50 + 2", "600,000 + 8000 + 500 + 2"], practice: 3, why: "The non-zero places are 6 hundred thousands, 8 thousands, 5 tens and 2 ones." },
      ] },
      "ordering-and-comparing-numbers-to-a-million": { objective: "Compare and order numbers up to a million.", items: [
        { q: "Which number is greater?", a: "480,125", d: ["408,215"], practice: 1, why: "The hundred thousands match, but 8 ten thousands is greater than 0 ten thousands." },
        { q: "Which sign makes this true: 369,120 ? 396,120?", a: "<", d: [">", "="], practice: 2, say: "Which sign makes this true? Three hundred and sixty-nine thousand one hundred and twenty, gap, three hundred and ninety-six thousand one hundred and twenty.", why: "The ten-thousands digits decide: 6 is less than 9." },
        { q: "Put the numbers in ascending order, smallest first.", order: ["299,999", "300,009", "300,090", "300,900"], practice: 3, why: "Compare from the largest place: 299,999 comes first, then compare the tens and hundreds of the others." },
      ] },
      "counting-in-steps-and-number-sequences": { objective: "Follow powers-of-ten steps and recognise fractional or decimal sequence rules.", items: [
        { q: "Count on in thousands: 198,500, 199,500, 200,500. What comes next?", n: 201500, practice: 1, why: "Each step adds 1000. 200,500 + 1000 = 201,500." },
        { q: "What is the rule for 2.5, 2.25, 2, 1.75?", a: "Subtract 0.25", d: ["Add 0.25", "Subtract 0.5", "Subtract 2.5"], practice: 2, say: "What is the rule for two point five, two point two five, two, one point seven five?", why: "Each number is one quarter, or 0.25, less than the previous number." },
        { q: "A reservoir contains 650,000 litres. It loses 10,000 litres each week. How many litres remain after 3 weeks?", n: 620000, unit: "litres", practice: 4, why: "Three losses of 10,000 total 30,000. 650,000 − 30,000 = 620,000." },
      ] },
      "negative-numbers-and-counting-through-zero": { objective: "Count through zero and interpret negative whole numbers.", items: [
        { q: "Count back 7 from 3. Where do you land?", n: -4, practice: 1, why: "Three steps reach zero. Four more steps reach −4." },
        { q: "How many one-unit steps are there from −6 to 4?", n: 10, practice: 2, say: "How many one-unit steps are there from minus six to four?", why: "There are 6 steps to zero and 4 more to 4: 10 steps altogether." },
        { q: "Order these temperatures, coldest first.", order: ["−9°C", "−2°C", "0°C", "5°C"], practice: 3, why: "Numbers further below zero represent colder temperatures." },
      ] },
      "rounding-large-numbers": { objective: "Round numbers to a million to a specified power of ten.", items: [
        { q: "Round 456,782 to the nearest hundred.", a: "456,800", d: ["456,700", "457,000", "460,000"], practice: 1, why: "The tens digit is 8, so 456,782 rounds up to 456,800." },
        { q: "Round 742,100 to the nearest hundred thousand.", n: 700000, practice: 2, why: "742,100 is below the halfway point of 750,000, so it rounds to 700,000." },
        { q: "A town's population rounds to 360,000 to the nearest ten thousand. What is the smallest whole-number population it could have?", n: 355000, practice: 4, why: "355,000 is halfway between 350,000 and 360,000 and rounds up. Any smaller whole number rounds down." },
      ] },
      "roman-numerals-to-1000": { objective: "Read Roman numerals to 1000 and recognise Roman dates.", items: [
        { q: "What number is CDXL?", n: 440, practice: 2, say: "Read the Roman numeral on screen. Write it using our digits.", why: "CD means 400 and XL means 40. Together they make 440." },
        { q: "Order these Roman numerals, smallest first.", order: ["XC", "C", "CD", "D"], practice: 3, say: "Order these Roman numerals, smallest first.", why: "XC is 90, C is 100, CD is 400 and D is 500." },
        { q: "A film poster shows the year MMXVI. Which year is that?", a: "2016", d: ["2006", "2026", "2061"], practice: 4, say: "A film poster shows a year in Roman numerals. Which year is it?", why: "MM is 2000, X is 10, V is 5 and I is 1: 2016." },
      ] },
      "large-number-problems": { objective: "Apply large-number place value, comparison and rounding in practical problems.", items: [
        { q: "A charity has £425,600. It receives £100,000 more. How many pounds does it have now?", n: 525600, unit: "pounds", practice: 1, why: "Adding 100,000 increases the hundred-thousands digit by one." },
        { q: "A counter shows 760,450. How many more counts are needed to reach one million?", n: 239550, practice: 2, why: "1,000,000 − 760,450 = 239,550. Adding that back reaches one million." },
        { q: "A report rounds attendance to the nearest ten thousand. Which figure should it print for 684,300 visitors?", a: "680,000", d: ["684,000", "690,000", "700,000"], practice: 4, why: "684,300 is below 685,000, so the nearest ten thousand is 680,000." },
      ] },
    },
    "number---addition-and-subtraction": {
      "column-addition-and-subtraction-with-large-numbers": { objective: "Add and subtract whole numbers with more than four digits using place-value columns.", items: [
        { q: "Calculate 48,321 + 26,457.", n: 74778, practice: 2, why: "Add matching columns. Exchange 14 thousands for one ten thousand and four thousands. The sum is 74,778." },
        { q: "Calculate 70,004 − 28,679.", n: 41325, practice: 3, why: "Exchange across the zero places to subtract. 41,325 + 28,679 = 70,004 checks the difference." },
        { q: "A museum had 36,845 visitors in spring and 19,607 in summer. Which is the total?", a: "56,452", d: ["55,452", "56,442", "17,238"], practice: 4, why: "36,845 + 19,607 = 56,452. Align the ones columns before adding." },
      ] },
      "mental-addition-and-subtraction-with-large-numbers": { objective: "Use partitioning and compensation for mental addition and subtraction.", items: [
        { q: "What is 68,000 + 20,000?", n: 88000, practice: 1, why: "Adding two ten thousands changes 68,000 to 88,000." },
        { q: "What is 54,600 + 1990?", n: 56590, practice: 2, why: "Add 2000 to get 56,600, then subtract 10 to compensate." },
        { q: "Which method correctly calculates 120,000 − 39,000?", a: "Subtract 40,000, then add 1000", d: ["Subtract 40,000, then subtract 1000", "Subtract 30,000, then add 9000", "Subtract 4000, then add 1000"], practice: 3, why: "Subtracting 40,000 removes 1000 too much. Adding 1000 back gives 81,000." },
      ] },
      "rounding-to-check-answers": { objective: "Estimate calculations and choose accuracy appropriate to a context.", items: [
        { q: "Round each number to the nearest thousand, then estimate 48,240 + 30,810.", n: 79000, practice: 2, why: "48,240 rounds to 48,000 and 30,810 to 31,000. Their sum is 79,000." },
        { q: "Round each number to the nearest ten thousand to check 82,300 − 29,100. Which estimate results?", a: "50,000", d: ["60,000", "110,000", "5000"], practice: 1, why: "80,000 − 30,000 = 50,000. The exact answer should be reasonably close." },
        { q: "Which task needs an exact count rather than a rounded estimate?", a: "Ordering one lunch for each child attending today", d: ["Giving a rough idea of a city's population", "Quickly checking the size of a large sum"], practice: 4, why: "An exact count makes sure every attending child receives a lunch." },
      ] },
      "multi-step-addition-and-subtraction-problems": { objective: "Choose and sequence addition and subtraction in multi-step contexts.", items: [
        { q: "A library has 24,650 books, receives 3280 and sends 1475 to another library. How many books remain?", n: 26455, practice: 2, why: "24,650 + 3280 = 27,930. Then 27,930 − 1475 = 26,455." },
        { q: "A charity's target is £60,000. It raises £24,750 and £18,500. How many pounds are still needed?", n: 16750, unit: "pounds", practice: 4, why: "The donations total £43,250. £60,000 − £43,250 = £16,750." },
        { q: "A shop starts with 18,000 cards, sells 4500, then receives 2750. Which calculation finds its final stock?", a: "18,000 − 4500 + 2750", d: ["18,000 + 4500 − 2750", "18,000 − 4500 − 2750", "18,000 + 4500 + 2750"], practice: 3, why: "Selling takes cards away; receiving adds cards. The calculation follows those two changes." },
      ] },
    },
    "number---multiplication-and-division": {
      "multiples-and-factors": { objective: "Find factors, factor pairs, multiples and common factors.", items: [
        { q: "Which pair is a factor pair of 48?", a: "6 and 8", d: ["5 and 9", "4 and 10", "7 and 7"], practice: 1, why: "6 × 8 = 48. A factor pair multiplies to the given number." },
        { q: "How many positive factors does 18 have?", n: 6, practice: 2, why: "The factors are 1, 2, 3, 6, 9 and 18: six factors." },
        { q: "Sort these numbers by whether they are common factors of both 12 and 20.", sort: { bins: ["Common factor", "Not a common factor"], cards: [["1", "Common factor"], ["4", "Common factor"], ["3", "Not a common factor"], ["10", "Not a common factor"]] }, practice: 3, why: "1 and 4 divide both numbers exactly. 3 does not divide 20, and 10 does not divide 12." },
      ] },
      "prime-and-composite-numbers": { objective: "Identify primes to 100 and distinguish prime, composite and neither.", items: [
        { q: "Which number is prime?", a: "17", d: ["1", "21", "27"], practice: 1, why: "17 has exactly two positive factors: 1 and 17. 21 and 27 have more; 1 has only one." },
        { q: "How many prime numbers are there between 10 and 20?", n: 4, practice: 2, why: "They are 11, 13, 17 and 19." },
        { q: "Sort these numbers.", sort: { bins: ["Prime", "Composite"], cards: [["2", "Prime"], ["19", "Prime"], ["49", "Composite"], ["51", "Composite"]] }, practice: 3, why: "2 and 19 each have two factors. 49 = 7 × 7, and 51 = 3 × 17, so both are composite." },
      ] },
      "written-multiplication": { objective: "Multiply up to four-digit numbers by one-digit numbers.", items: [
        { q: "Calculate 2312 × 3.", n: 6936, practice: 1, say: "Calculate two thousand three hundred and twelve multiplied by three.", why: "6000 + 900 + 30 + 6 = 6936. No column needs an exchange." },
        { q: "Calculate 407 × 6.", n: 2442, practice: 2, say: "Calculate four hundred and seven multiplied by six.", why: "400 × 6 = 2400 and 7 × 6 = 42. Together they make 2442." },
        { q: "A printer makes 8 batches of 1245 leaflets. How many leaflets does it make?", a: "9960", d: ["9660", "99,600", "1253"], practice: 4, why: "1245 × 8 = 9960. Multiplication combines eight equal batches." },
      ] },
      "long-multiplication": { objective: "Multiply up to four-digit numbers by two-digit numbers using partial products.", items: [
        { q: "Calculate 214 × 13.", n: 2782, practice: 1, say: "Calculate two hundred and fourteen multiplied by thirteen.", why: "214 × 10 = 2140 and 214 × 3 = 642. Add them to get 2782." },
        { q: "For 326 × 24, the ones product is 1304. What is the tens product, 326 × 20?", n: 6520, practice: 2, say: "For three hundred and twenty-six multiplied by twenty-four, the ones product is one thousand three hundred and four. What is three hundred and twenty-six multiplied by twenty?", why: "326 × 2 = 652, so 326 × 20 = 6520." },
        { q: "A theatre has 28 rows with 36 seats each. How many seats are there?", a: "1008", d: ["864", "108", "64"], practice: 4, why: "36 × 20 = 720 and 36 × 8 = 288. The total is 1008 seats." },
      ] },
      "mental-multiplication-and-division": { objective: "Use known facts and partitioning to multiply and divide mentally.", items: [
        { q: "If 7 × 8 = 56, what is 7 × 80?", n: 560, practice: 1, say: "If seven times eight is fifty-six, what is seven times eighty?", why: "80 is ten times 8, so the product is ten times 56: 560." },
        { q: "Calculate 960 ÷ 6 mentally.", n: 160, practice: 2, say: "Calculate nine hundred and sixty divided by six mentally.", why: "96 ÷ 6 = 16, so 960 ÷ 6 = 160." },
        { q: "Which split correctly helps to calculate 24 × 7?", a: "20 × 7 plus 4 × 7", d: ["20 × 7 plus 4", "24 × 5 plus 2", "20 plus 4 × 7"], practice: 3, say: "Which split correctly helps to calculate twenty-four multiplied by seven?", why: "Both parts of 24 must be multiplied by 7. 140 + 28 = 168." },
      ] },
      "short-division-and-remainders": { objective: "Divide by a one-digit number and interpret remainders in context.", items: [
        { q: "Calculate 848 ÷ 4.", n: 212, practice: 1, say: "Calculate eight hundred and forty-eight divided by four.", why: "Divide each digit by 4: 8 hundreds gives 2 hundreds, 4 tens gives 1 ten, and 8 ones gives 2 ones. The quotient is 212." },
        { q: "What is the remainder when 957 is divided by 7?", n: 5, practice: 2, why: "7 × 136 = 952. 957 − 952 = 5, which is less than the divisor 7." },
        { q: "Each minibus holds 8 children. How many minibuses are needed for 53 children?", a: "7", d: ["6", "5", "8"], practice: 4, why: "Six minibuses hold only 48 children. A seventh is needed for the remaining five children." },
      ] },
      "multiplying-and-dividing-by-10-100-and-1000": { objective: "Scale whole and decimal numbers by 10, 100 and 1000.", items: [
        { q: "Calculate 4.06 × 100.", n: 406, practice: 1, say: "Calculate four point zero six multiplied by one hundred.", why: "Each digit becomes worth 100 times as much. 4 ones become 4 hundreds and 6 hundredths become 6 ones." },
        { q: "Fill the gap: ? ÷ 1000 = 0.72.", n: 720, practice: 2, say: "What number divided by one thousand equals zero point seven two?", why: "Undo division by multiplying: 0.72 × 1000 = 720." },
        { q: "A mass of 35 grams is shared equally into 10 portions. Which is the mass of each portion?", a: "3.5 grams", d: ["0.35 grams", "350 grams", "35.1 grams"], practice: 4, why: "35 ÷ 10 = 3.5. Each portion has one tenth of the original mass." },
      ] },
      "square-and-cube-numbers": { objective: "Recognise square and cube numbers and evaluate squared and cubed notation.", items: [
        { q: "What is 7²?", n: 49, practice: 2, say: "What is seven squared?", why: "Seven squared means 7 × 7, which is 49." },
        { q: "Which calculation means 4³?", a: "4 × 4 × 4", d: ["4 × 3", "4 + 4 + 4", "3 × 3 × 3 × 3"], practice: 1, say: "Which calculation means four cubed?", why: "Cubing multiplies three copies of the same number." },
        { q: "Sort these numbers into the group they belong to.", sort: { bins: ["Square but not cube", "Cube but not square"], cards: [["25", "Square but not cube"], ["49", "Square but not cube"], ["8", "Cube but not square"], ["27", "Cube but not square"]] }, practice: 3, why: "25 = 5² and 49 = 7². 8 = 2³ and 27 = 3³. None of these belongs to both groups." },
      ] },
      "scaling-and-rate-problems": { objective: "Scale by simple fractions and solve simple rate problems.", items: [
        { q: "A 24 cm ribbon is scaled to one quarter of its length. How many centimetres long is the new ribbon?", n: 6, unit: "cm", practice: 1, why: "One quarter of 24 is 24 ÷ 4 = 6 cm." },
        { q: "A machine fills 18 bottles each minute at a steady rate. How many bottles does it fill in 5 minutes?", n: 90, unit: "bottles", practice: 2, why: "Five equal minutes give 18 × 5 = 90 bottles." },
        { q: "A recipe for 4 people needs 300 g of rice. How much rice is needed for 6 people?", a: "450 g", d: ["600 g", "200 g", "302 g"], practice: 4, why: "One person needs 75 g. Six people need 6 × 75 = 450 g." },
      ] },
      "four-operations-and-the-equals-sign": { objective: "Balance numerical statements and choose operations in multi-step problems.", items: [
        { q: "Which statement is true?", a: "6 × 8 = 50 − 2", d: ["6 × 8 = 50 + 2", "6 × 8 = 40 − 8", "6 × 8 = 6 + 8"], practice: 1, why: "6 × 8 and 50 − 2 both equal 48. The equals sign means the values match." },
        { q: "Find the missing number: 7 × ? = 100 − 16.", n: 12, practice: 2, say: "Seven multiplied by what number equals one hundred minus sixteen?", why: "100 − 16 = 84, and 84 ÷ 7 = 12." },
        { q: "A club buys 6 packs of 8 balls, then gives 12 balls away. It shares the rest equally between 4 teams. How many balls does each team get?", n: 9, unit: "balls", practice: 4, why: "6 × 8 = 48; 48 − 12 = 36; 36 ÷ 4 = 9." },
      ] },
    },
    "number---fractions-including-decimals-and-percentages": {
      "comparing-and-ordering-fractions": { objective: "Compare and order fractions with related denominators.", items: [
        { q: "Which is greater: 3/4 or 5/8?", a: "3/4", d: ["5/8", "They are equal"], practice: 1, say: "Which is greater: three quarters or five eighths?", why: "3/4 equals 6/8, which is greater than 5/8." },
        { q: "To compare 2/3 and 7/12, how many twelfths equal 2/3?", n: 8, practice: 2, say: "To compare two thirds and seven twelfths, how many twelfths equal two thirds?", why: "Multiply the numerator and denominator by 4: 2/3 = 8/12." },
        { q: "Order these fractions, smallest first.", order: ["1/4", "3/8", "1/2", "3/4"], practice: 3, why: "In eighths they are 2/8, 3/8, 4/8 and 6/8." },
      ] },
      "equivalent-fractions": { objective: "Recognise and complete equivalent fractions, including tenths and hundredths.", items: [
        { q: "The bar shows 3/5 of a whole. Which fraction is equivalent?", a: "6/10", d: ["3/10", "6/5", "9/10"], practice: 1, say: "The bar shows three fifths of a whole. Which fraction is equivalent?", model: bars(5, 3, "Given fraction", "One whole divided into five equal parts, with three parts shaded."), why: "Splitting every fifth into two makes ten parts. The three shaded fifths become six tenths." },
        { q: "Complete the equivalent fraction: 7/10 = ?/100. What is the missing numerator?", n: 70, practice: 2, say: "Seven tenths equals how many hundredths? Enter the missing numerator.", why: "Multiply both numbers by 10: seven tenths equals seventy hundredths." },
        { q: "Sort these fractions by the amount they equal.", sort: { bins: ["1/2", "3/4"], cards: [["4/8", "1/2"], ["50/100", "1/2"], ["6/8", "3/4"], ["75/100", "3/4"]] }, practice: 3, why: "4/8 and 50/100 simplify to 1/2. 6/8 and 75/100 simplify to 3/4." },
      ] },
      "mixed-numbers-and-improper-fractions": { objective: "Convert between mixed numbers and improper fractions.", items: [
        { q: "Which mixed number equals 11/4?", a: "2 3/4", d: ["1 3/4", "3 1/4", "2 1/4"], practice: 1, say: "Which mixed number equals eleven quarters?", why: "Eight quarters make two wholes, leaving three quarters." },
        { q: "Write 3 2/5 as an improper fraction. What is its numerator?", n: 17, practice: 2, say: "Write three and two fifths as an improper fraction with denominator five. What is its numerator?", why: "Three wholes contain 15 fifths. Add 2 fifths to make 17 fifths." },
        { q: "There are 13 equal slices, with 6 slices making one whole pizza. Which amount of pizza is this?", a: "2 1/6 pizzas", d: ["1 1/6 pizzas", "2 5/6 pizzas", "3 1/6 pizzas"], practice: 4, why: "Twelve sixths make two whole pizzas. One sixth remains." },
      ] },
      "adding-and-subtracting-fractions": { objective: "Add and subtract fractions with equal or related denominators.", items: [
        { q: "What is 3/10 + 4/10?", a: "7/10", d: ["7/20", "1/10", "12/10"], practice: 1, say: "What is three tenths plus four tenths?", why: "Add the counts of tenths. Three tenths plus four tenths is seven tenths." },
        { q: "Complete 5/6 − 1/3 = ?/6. What is the missing numerator?", n: 3, practice: 2, say: "Complete five sixths minus one third equals how many sixths? Enter the missing numerator.", why: "One third equals two sixths. Five sixths minus two sixths leaves three sixths, so the missing numerator is 3." },
        { q: "Bix walks 3/4 km, then another 5/8 km. How far is that altogether?", a: "1 3/8 km", d: ["1 km", "8/12 km", "1 1/8 km"], practice: 4, say: "Bix walks three quarters of a kilometre, then another five eighths of a kilometre. How far is that altogether?", why: "3/4 = 6/8, so the total is 11/8 km, or 1 3/8 km." },
      ] },
      "multiplying-fractions-by-whole-numbers": { objective: "Multiply proper fractions and mixed numbers by whole numbers.", items: [
        { q: "What is 2/5 × 3?", a: "6/5", d: ["6/15", "2/15", "5/5"], practice: 1, say: "What is two fifths multiplied by three?", model: bars(5, 2, "One repeated amount", "One whole divided into five equal parts, with two parts shaded. This is one of the three amounts."), why: "Three lots of two fifths make six fifths. The size of each part stays a fifth." },
        { q: "What is 1 1/4 × 4?", n: 5, practice: 2, say: "What is one and one quarter multiplied by four?", why: "Four lots of one whole make four, and four quarters make one more whole: five." },
        { q: "Each ribbon is 3/4 metre long. What is the total length of 6 ribbons?", a: "4 1/2 metres", d: ["3 metres", "4 3/4 metres", "6 3/4 metres"], practice: 4, say: "Each ribbon is three quarters of a metre long. What is the total length of six ribbons?", why: "6 × 3/4 = 18/4 metres. That is 4 2/4, or 4 1/2 metres." },
      ] },
      "decimals-as-fractions-and-thousandths": { objective: "Connect decimal place values with tenths, hundredths and thousandths.", items: [
        { q: "Which fraction equals 0.307?", a: "307/1000", d: ["307/100", "37/1000", "307/10"], practice: 1, say: "Which fraction equals zero point three zero seven?", why: "Three decimal places give thousandths: 0.307 is 307 thousandths." },
        { q: "How many thousandths equal 0.08?", n: 80, practice: 2, why: "0.08 = 0.080. Eight hundredths contain eighty thousandths." },
        { q: "A length is 0.4 m plus 0.02 m plus 0.006 m. How many thousandths of a metre is that altogether?", n: 426, unit: "thousandths of a metre", practice: 4, why: "Four tenths is 400 thousandths, two hundredths is 20 thousandths and six thousandths is 6 more. The total is 426 thousandths of a metre." },
      ] },
      "rounding-ordering-and-comparing-decimals": { objective: "Round two-place decimals and compare or order decimals to three places.", items: [
        { q: "Round 6.47 to one decimal place.", n: "6.5", practice: 1, why: "The hundredths digit is 7, so the tenths round up from 4 to 5." },
        { q: "Which sign belongs here: 0.305 ? 0.35?", a: "<", d: [">", "="], practice: 2, say: "Which sign belongs between zero point three zero five and zero point three five?", why: "Write 0.35 as 0.350. 305 thousandths is less than 350 thousandths." },
        { q: "Order these decimals, smallest first.", order: ["1.025", "1.052", "1.2", "1.205"], practice: 3, why: "Compare them as 1.025, 1.052, 1.200 and 1.205, starting at the tenths place." },
      ] },
      "adding-and-subtracting-decimals": { objective: "Calculate with decimals to three places and find complements of one.", items: [
        { q: "Calculate 3.4 + 1.28.", n: "4.68", practice: 2, say: "Calculate three point four plus one point two eight.", why: "Write 3.4 as 3.40 so the place values align. 3.40 + 1.28 = 4.68." },
        { q: "Calculate 5 − 2.375.", n: "2.625", practice: 2, say: "Calculate five minus two point three seven five.", why: "5.000 − 2.375 = 2.625. Adding 2.375 back checks the difference." },
        { q: "A jug holds 1 litre. It contains 0.635 litres. How much more liquid will fill it?", a: "0.365 litres", d: ["0.465 litres", "0.375 litres", "1.635 litres"], practice: 4, why: "0.635 + 0.365 = 1.000, so 0.365 litres are needed." },
      ] },
      "percentages-fractions-and-decimals": { objective: "Connect percentages, fractions and decimals and use familiar equivalents.", items: [
        { q: "What does 35% mean?", a: "35 out of every 100", d: ["35 out of every 10", "100 out of every 35", "35 whole ones"], practice: 1, say: "What does thirty-five per cent mean?", why: "Per cent means per hundred, so 35% means 35 parts out of 100 equal parts." },
        { q: "Write 2/5 as a decimal.", n: "0.4", practice: 2, say: "Write two fifths as a decimal.", why: "2/5 = 4/10, which is 0.4, also 40%." },
        { q: "A class has 30 children. 20% walk to school. How many children walk?", n: 6, unit: "children", practice: 4, why: "20% is one fifth. One fifth of 30 is 30 ÷ 5 = 6." },
      ] },
    },
    "measurement": {
      "converting-metric-units": { objective: "Convert metric lengths, masses and capacities.", items: [
        { q: "How many centimetres equal 2.35 metres?", n: 235, unit: "cm", practice: 1, why: "One metre is 100 cm, so multiply 2.35 by 100." },
        { q: "Convert 1750 grams to kilograms.", n: "1.75", unit: "kg", practice: 2, why: "1000 g is 1 kg. Divide 1750 by 1000 to get 1.75 kg." },
        { q: "Order these capacities, smallest first.", order: ["350 ml", "0.5 litres", "750 ml", "1.2 litres"], practice: 3, why: "In millilitres they are 350, 500, 750 and 1200." },
      ] },
      "metric-and-imperial-equivalents": { objective: "Use stated approximate metric and imperial equivalences.", items: [
        { q: "Use 1 inch ≈ 2.5 cm. About how many centimetres equal 8 inches?", n: 20, unit: "cm", practice: 1, say: "Use one inch is approximately two point five centimetres. About how many centimetres equal eight inches?", why: "8 × 2.5 = 20. The answer is approximate because the conversion is approximate." },
        { q: "Use 1 pound ≈ 450 g. About how many pounds equal 2250 g?", n: 5, unit: "pounds", practice: 2, say: "Use one pound is approximately four hundred and fifty grams. About how many pounds equal two thousand two hundred and fifty grams?", why: "2250 ÷ 450 = 5, so the approximate mass is 5 pounds." },
        { q: "Use 1 pint ≈ 0.57 litres. Which holds more: a 2-pint jug or a 1-litre jug?", a: "The 2-pint jug", d: ["The 1-litre jug", "They hold the same amount"], practice: 4, say: "Use one pint is approximately zero point five seven litres. Which holds more: a two-pint jug or a one-litre jug?", why: "2 pints is about 1.14 litres. That is more than 1 litre." },
      ] },
      "perimeter-of-composite-rectilinear-shapes": { objective: "Find perimeter and missing boundary lengths of rectilinear composite shapes.", items: [
        { q: "Starting at the top left, an L-shape's boundary goes 8 cm right, 3 cm down, 3 cm left, 4 cm down, 5 cm left and 7 cm up. What is its perimeter?", n: 30, unit: "cm", practice: 1, model: diagram("An L-shaped boundary", "polygon", { points: [[90, 35], [250, 35], [250, 95], [190, 95], [190, 175], [90, 175]], caption: "Boundary lengths are in the question" }, "An L-shaped outline. From the top left, its six sides run right, down, left, down, left and up."), why: "Add all six outside lengths: 8 + 3 + 3 + 4 + 5 + 7 = 30 cm." },
        { q: "An L-shape is 12 cm wide overall. One horizontal section is 5 cm long. How long is the other section, if together they span its full width?", n: 7, unit: "cm", practice: 2, why: "The two horizontal sections must add to 12 cm, so the missing length is 12 − 5 = 7 cm." },
        { q: "A rectangle is 10 m by 6 m. A 3 m by 2 m rectangle is removed from its top-right corner to make an L-shape. What is the new perimeter?", a: "32 m", d: ["22 m", "42 m", "54 m"], practice: 3, why: "The two removed outside lengths are replaced by equal inside lengths. The perimeter stays 10 + 6 + 10 + 6 = 32 m." },
      ] },
      "area-of-rectangles": { objective: "Calculate and compare rectangular areas in square units.", items: [
        { q: "What is the area of this rectangle, in square centimetres?", n: 42, unit: "cm²", practice: 2, model: diagram("A rectangle", "rectangle", { width: 7, height: 6, unit: "cm" }, "A rectangle 7 cm wide and 6 cm high."), why: "Area is length × width: 7 × 6 = 42 cm²." },
        { q: "Order these rectangles by area, smallest first.", order: ["5 cm × 4 cm", "8 cm × 3 cm", "6 cm × 5 cm", "7 cm × 6 cm"], practice: 3, say: "Order these rectangles by area, smallest first.", why: "Their areas are 20, 24, 30 and 42 square centimetres." },
        { q: "A rectangle has area 56 m² and length 8 m. What is its width in metres?", n: 7, unit: "m", practice: 4, say: "A rectangle has area fifty-six square metres and length eight metres. What is its width in metres?", why: "Divide area by length: 56 ÷ 8 = 7 m." },
      ] },
      "estimating-area-volume-and-capacity": { objective: "Estimate irregular area, count cube layers and select sensible units or capacities.", items: [
        { q: "A leaf covers 14 whole one-centimetre squares and about 8 half-squares. Estimate its area in square centimetres.", n: 18, unit: "cm²", practice: 1, why: "Eight half-squares make about four whole squares. 14 + 4 = 18 cm²." },
        { q: "A solid block has 4 complete layers of 6 one-centimetre cubes. How many cubes are in the block?", n: 24, unit: "cubes", practice: 2, why: "Count every complete layer, including hidden cubes: 4 × 6 = 24." },
        { q: "Which is a sensible estimate for the capacity of a drinking mug?", a: "300 millilitres", d: ["300 litres", "3 millilitres", "300 cubic metres"], practice: 3, why: "A mug holds a few hundred millilitres. Litres in the hundreds would need a very large container." },
      ] },
      "converting-units-of-time": { objective: "Convert and compare time units and solve duration problems.", items: [
        { q: "How many minutes are in 2 hours 35 minutes?", n: 155, unit: "minutes", practice: 2, why: "Two hours is 120 minutes. 120 + 35 = 155 minutes." },
        { q: "Order these durations, shortest first.", order: ["75 seconds", "2 minutes", "150 seconds", "3 minutes"], practice: 3, why: "In seconds they are 75, 120, 150 and 180." },
        { q: "A film lasts 1.5 hours. It starts at 14:20. When does it end?", a: "15:50", d: ["15:25", "15:20", "16:10"], practice: 4, why: "1.5 hours is 1 hour 30 minutes. Adding that to 14:20 gives 15:50." },
      ] },
      "measurement-problems": { objective: "Use operations, decimal notation and unit conversions in measurement problems.", items: [
        { q: "A ribbon is 1.25 m long. Another is 85 cm long. What is their total length in metres?", n: "2.1", unit: "m", practice: 1, why: "85 cm is 0.85 m. 1.25 + 0.85 = 2.10 m." },
        { q: "Three rolls cost £1.35 each. How many pence change is due from £5?", n: 95, unit: "pence", practice: 2, why: "Three rolls cost 3 × 135p = 405p. 500p − 405p = 95p." },
        { q: "A recipe for 4 people uses 0.6 litres of milk. How much is needed for 10 people?", a: "1.5 litres", d: ["6 litres", "0.24 litres", "1 litre"], practice: 4, why: "One person needs 0.15 litres. Ten people need 10 × 0.15 = 1.5 litres." },
      ] },
    },
    "geometry-properties-of-shapes": {
      "3-d-shapes-from-2-d-drawings": { objective: "Identify solids from representations and reason about their faces, edges and vertices.", items: [
        { q: "Which is the most precise name for the solid in the drawing?", a: "Cube", d: ["Triangular prism", "Square-based pyramid", "Cylinder"], practice: 1, model: diagram("A solid drawing", "cuboid", { length: 3, width: 3, height: 3 }, "A solid drawing with all three dimensions marked 3 cm and square faces."), why: "All six faces are equal squares. This special cuboid is a cube." },
        { q: "How many vertices does a cuboid have, including any hidden ones?", n: 8, unit: "vertices", practice: 2, model: diagram("A solid drawing", "cuboid", { length: 5, width: 2, height: 3 }, "A rectangular solid 5 cm long, 2 cm wide and 3 cm high."), why: "A cuboid has four vertices on its top face and four on its bottom face: eight." },
        { q: "A solid has two matching triangular ends and three rectangular faces. What is it?", a: "Triangular prism", d: ["Square-based pyramid", "Cube", "Cone"], practice: 4, why: "A triangular prism has two triangular faces joined by three rectangular faces." },
      ] },
      "estimating-measuring-and-drawing-angles": { objective: "Recognise angle types and apply angle and protractor knowledge (this quiz does not assess physical drawing or protractor handling).", items: [
        { q: "What type of angle is shown?", a: "Obtuse", d: ["Acute", "Right angle", "Reflex"], practice: 1, model: diagram("An angle", "angle", { degrees: 125 }, "An angle with its turn marked in degrees."), why: "125° is greater than 90° and less than 180°, so it is obtuse." },
        { q: "A protractor shows 40° on one scale and 140° on the other. The angle is acute. What is its size in degrees?", n: 40, unit: "degrees", practice: 2, say: "A protractor shows forty degrees on one scale and one hundred and forty degrees on the other. The angle is acute. What is its size in degrees?", why: "An acute angle is less than 90°, so the reading must be 40°." },
        { q: "A robot turns three quarter turns clockwise. Through how many degrees does it turn altogether?", n: 270, unit: "degrees", practice: 4, why: "Each quarter turn is 90°. Three quarter turns total 3 × 90 = 270°." },
      ] },
      "angles-at-a-point-and-on-a-straight-line": { objective: "Use angle totals on a straight line, around a point and in equal turns.", items: [
        { q: "Two adjacent angles form a straight line. One is 65°. How many degrees is the other?", n: 115, unit: "degrees", practice: 1, say: "Two adjacent angles form a straight line. One is sixty-five degrees. How many degrees is the other?", why: "A straight line totals 180°. 180 − 65 = 115°." },
        { q: "Three angles meet around a point. Two are 90° and 130°. How many degrees is the third?", n: 140, unit: "degrees", practice: 2, say: "Three angles meet around a point. Two are ninety degrees and one hundred and thirty degrees. How many degrees is the third?", why: "Angles around a point total 360°. 360 − 90 − 130 = 140°." },
        { q: "A pizza is divided into 8 equal slices. What is the angle at the centre of each slice?", a: "45°", d: ["40°", "90°", "22.5°"], practice: 4, why: "One full turn is 360°. Dividing by 8 gives 45° for each slice." },
      ] },
      "properties-of-rectangles": { objective: "Deduce missing lengths and angles using rectangle properties.", items: [
        { q: "A rectangle has consecutive sides of 9 cm and 4 cm. How long is the side opposite the 9 cm side?", n: 9, unit: "cm", practice: 1, why: "Opposite sides of a rectangle are equal, so the opposite side is also 9 cm." },
        { q: "A diagonal splits one corner of a rectangle into 35° and a missing angle. How many degrees is the missing angle?", n: 55, unit: "degrees", practice: 2, say: "A diagonal splits one corner of a rectangle into thirty-five degrees and a missing angle. How many degrees is the missing angle?", why: "Every rectangle corner is 90°. 90 − 35 = 55°." },
        { q: "A rectangle has perimeter 30 cm and length 9 cm. What is its width?", a: "6 cm", d: ["12 cm", "21 cm", "3 cm"], practice: 4, why: "The two long sides total 18 cm, leaving 12 cm for two equal widths. Each width is 6 cm." },
      ] },
      "regular-and-irregular-polygons": { objective: "Distinguish regular and irregular polygons using side and angle equality.", items: [
        { q: "A rectangle has side lengths 8 cm and 3 cm. Is it regular?", a: "No: its sides are not all equal", d: ["Yes: all its angles are right angles", "Yes: every four-sided shape is regular"], practice: 1, model: diagram("A rectangle", "rectangle", { width: 8, height: 3, unit: "cm" }, "A rectangle 8 cm wide and 3 cm high."), why: "A regular polygon needs both equal sides and equal angles. This rectangle has unequal side lengths." },
        { q: "A regular polygon has 6 equal sides and 6 equal angles. How many vertices does it have?", n: 6, unit: "vertices", practice: 2, why: "A polygon has one vertex where each pair of neighbouring sides meets, so six sides give six vertices." },
        { q: "Which fact is enough to show that a pentagon is regular?", a: "All five sides and all five angles are equal", d: ["It has five sides", "Only its sides are all equal", "Only its angles are all equal"], practice: 4, why: "Both conditions are needed: equal sides and equal angles. The number of sides alone is not enough." },
      ] },
    },
    "geometry-position-and-direction": {
      "reflecting-shapes": { objective: "Find reflected positions and recognise properties preserved by reflection.", items: [
        { q: "Point A is at (1, 2). It is reflected in the vertical line x = 3. Where is its image?", a: "(5, 2)", d: ["(1, 4)", "(4, 2)", "(5, 4)"], practice: 1, say: "Point A has x-coordinate one and y-coordinate two. It is reflected in the vertical line x equals three. Where is its image?", why: "A is 2 units left of the mirror, so its image is 2 units right. Its height stays 2." },
        { q: "A point at (2, 4) is reflected in the vertical line x = 3. What is the image's y-coordinate?", n: 4, practice: 2, say: "A point has x-coordinate two and y-coordinate four. It is reflected in the vertical line x equals three. What is the image's y-coordinate?", why: "Reflection in a vertical line changes the horizontal position, but keeps the y-coordinate unchanged." },
        { q: "Which statement about a reflected triangle is true?", a: "Its side lengths and angle sizes stay the same", d: ["Its sides become longer", "It gains one vertex", "Its angles all become right angles"], practice: 4, why: "Reflection makes a mirror image. It preserves lengths, angles and the number of vertices." },
      ] },
      "translating-shapes": { objective: "Find translated coordinates and describe slides without turning or resizing.", items: [
        { q: "Point B at (1, 1) moves 3 squares right and 2 squares up. Where does it go?", a: "(4, 3)", d: ["(3, 4)", "(4, 1)", "(2, 3)"], practice: 1, say: "Point B has x-coordinate one and y-coordinate one. It moves three squares right and two squares up. Where does it go?", why: "Add 3 to x and 2 to y: (1 + 3, 1 + 2) = (4, 3)." },
        { q: "A triangle's corner at (4, 3) moves 2 squares left and 1 square up. What is its new x-coordinate?", n: 2, practice: 2, say: "A triangle's corner has x-coordinate four and y-coordinate three. It moves two squares left and one square up. What is its new x-coordinate?", why: "Moving left subtracts 2 from x: 4 − 2 = 2. Moving up affects y only." },
        { q: "After a translation of 2 squares right and 1 square down, a corner is at (5, 2). What was its original y-coordinate?", n: 3, practice: 4, say: "After a translation of two squares right and one square down, a corner has x-coordinate five and y-coordinate two. What was its original y-coordinate?", why: "Undo the downward move by adding 1 to the final y-coordinate: 2 + 1 = 3." },
      ] },
    },
    "statistics": {
      "reading-line-graphs": { objective: "Read, compare and order values presented in line graphs.", items: [
        { q: "What was the water depth at 10:00, in centimetres?", n: 15, unit: "cm", practice: 1, model: graph([10, 15, 5], ["09:00", "10:00", "11:00"], "Depth (cm)", 5, "Water depth at three hourly readings. The vertical scale is in centimetres, in steps of five."), why: "Find 10:00 on the horizontal axis, then read across from its point to 15 cm." },
        { q: "How much did the temperature fall from 12:00 to 14:00, in degrees Celsius?", n: 15, unit: "°C", practice: 2, model: graph([25, 20, 10], ["12:00", "13:00", "14:00"], "Temperature (°C)", 5, "Temperature at noon, one and two o'clock. The vertical scale is in degrees Celsius, in steps of five."), why: "At noon it was 25°C and at 14:00 it was 10°C. The fall is 25 − 10 = 15°C." },
        { q: "Order these weeks by plant height, shortest first.", order: ["Week 1", "Week 3", "Week 2", "Week 4"], practice: 3, model: graph([10, 20, 15, 30], ["Week 1", "Week 2", "Week 3", "Week 4"], "Height (cm)", 5, "Four weekly plant-height readings. The vertical scale is in centimetres, in steps of five."), why: "The heights are 10, 15, 20 and 30 cm for Weeks 1, 3, 2 and 4 respectively." },
      ] },
      "tables-and-timetables": { objective: "Read timetables, calculate journey durations and plan arrival times.", items: [
        { q: "Which bus reaches the Library at 09:25?", a: "Bus A", d: ["Bus B", "Bus C"], practice: 1, model: buses, why: "Read down the Library column to 09:25. That entry is in the row for Bus A." },
        { q: "How many minutes does Bus A take from Park to Station?", n: 35, unit: "minutes", practice: 2, model: buses, why: "Bus A leaves Park at 09:10 and reaches Station at 09:45. The journey takes 35 minutes." },
        { q: "You must reach Station by 10:20. Which is the latest bus you can catch from Park?", a: "Bus B", d: ["Bus A", "Bus C"], practice: 4, model: buses, why: "Bus B arrives at 10:10, before the deadline. Bus C arrives at 10:45, which is too late." },
      ] },
    },
  },
});
