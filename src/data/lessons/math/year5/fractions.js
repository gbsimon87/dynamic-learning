import { topicLessons as lesson, equation as e, table as t, steps, bar, diagram } from "../../topicLessons.js";

export const FRACTION_LESSONS = {
  "comparing-and-ordering-fractions": lesson("Compare equal-sized parts", ["Fractions are easier to compare when their denominators match.", "Use equivalent fractions without changing their value."], [
    bar("Compare one half and three quarters", [{ parts: 4, shaded: 2, label: "1/2 = 2/4" }, { parts: 4, shaded: 3, label: "3/4" }], "Three quarters is larger because it has more of the same-sized parts."),
    t("Use a common denominator", ["Fraction", "In twelfths"], [["2/3", "8/12"], ["3/4", "9/12"]], "Nine twelfths is larger than eight twelfths."),
    e("Compare the numerators", ["3/10", "<", "4/10"], "When denominators match, the larger numerator gives the larger fraction."),
    steps("Order three fractions", ["Compare 1/2, 1/4 and 3/8.", "Write them as 4/8, 2/8 and 3/8.", "Ascending order is 1/4, 3/8, 1/2."], "Keep track of the original fractions after finding common denominators."),
  ]),
  "equivalent-fractions": lesson("Show the same amount", ["Equivalent fractions describe the same amount of a whole.", "Multiply or divide numerator and denominator by the same non-zero number."], [
    bar("Two ways to show one half", [{ parts: 2, shaded: 1, label: "1/2" }, { parts: 8, shaded: 4, label: "4/8" }], "The bars have equal length and show the same shaded amount."),
    t("Scale both numbers", ["Start", "Change", "Equivalent"], [["2/5", "× 2 on top and bottom", "4/10"], ["3/4", "× 3 on top and bottom", "9/12"]], "Changing just the numerator would change the value."),
    e("Simplify a fraction", ["6/10", "=", "3/5"], "Divide both numerator and denominator by two."),
    t("Link tenths and hundredths", ["Tenths", "Hundredths"], [["1/10", "10/100"], ["7/10", "70/100"]], "Each tenth contains ten hundredths."),
  ]),
  "mixed-numbers-and-improper-fractions": lesson("Count beyond one whole", ["An improper fraction has a numerator at least as large as its denominator.", "A mixed number combines whole numbers and a proper fraction."], [
    bar("Count seven quarters", [{ parts: 4, shaded: 4, label: "4/4 = 1" }, { parts: 4, shaded: 3, label: "3/4" }], "Seven quarters make one whole and three quarters."),
    t("Group the parts", ["Improper fraction", "Whole groups", "Mixed number"], [["11/4", "2 groups of 4, 3 left", "2 3/4"]], "The denominator tells us how many parts make each whole."),
    steps("Convert a mixed number", ["Start with 3 2/5.", "Three wholes contain 15 fifths.", "15 fifths + 2 fifths = 17 fifths."], "Multiply the whole number by the denominator, then add the numerator."),
    e("Cross a whole-number boundary", ["5/4", "+", "3/4", "=", "2"], "Eight quarters make two complete wholes."),
  ]),
  "adding-and-subtracting-fractions": lesson("Calculate with matching parts", ["Make denominators match before adding or subtracting fractions.", "Add or subtract the numerators; the size of the parts stays the same."], [
    bar("Add one quarter and two quarters", [{ parts: 4, shaded: 1, label: "1/4" }, { parts: 4, shaded: 2, label: "2/4" }, { parts: 4, shaded: 3, label: "3/4" }], "One quarter plus two quarters makes three quarters."),
    e("Change halves to sixths", ["1/2", "+", "1/6", "=", "4/6"], "One half is three sixths, so add three sixths and one sixth."),
    e("Subtract equal parts", ["5/6", "−", "1/3", "=", "3/6"], "One third is two sixths; five sixths minus two sixths leaves three sixths."),
    steps("Add past one whole", ["Work out 3/4 + 5/8.", "3/4 = 6/8, so the sum is 11/8.", "11/8 = 1 3/8."], "An answer greater than one can be written as a mixed number."),
  ]),
  "multiplying-fractions-by-whole-numbers": lesson("Repeat a fractional amount", ["Multiplying a fraction by a whole number repeats that fraction.", "The denominator stays the same because the size of each part stays the same."], [
    bar("Three lots of one fifth", [{ parts: 5, shaded: 1, label: "1/5" }, { parts: 5, shaded: 3, label: "3 × 1/5 = 3/5" }], "Three single fifths make three fifths."),
    e("Repeat two thirds", ["2/3", "×", "4", "=", "8/3"], "Multiply the numerator by four, keeping thirds as the parts."),
    steps("Multiply a mixed number", ["Work out 1 1/4 × 3.", "1 1/4 = 5/4, so 5/4 × 3 = 15/4.", "15/4 = 3 3/4."], "Convert the mixed number first, then group the result into wholes."),
    e("Use a measured amount", ["3/4", "×", "4", "=", "3"], "Four lengths of three quarters of a metre total three metres."),
  ]),
  "decimals-as-fractions-and-thousandths": lesson("Link decimal places and fractions", ["Tenths, hundredths and thousandths are equal parts of one whole.", "A digit's place tells you which kind of part it represents."], [
    t("Read 0.246", ["Tenths", "Hundredths", "Thousandths"], [["2", "4", "6"], ["0.2", "0.04", "0.006"]], "The last digit represents six thousandths."),
    e("Write a decimal as a fraction", ["0.375", "=", "375/1000"], "Three decimal places can be expressed in thousandths."),
    t("Compare equal values", ["Decimal", "Fraction"], [["0.4", "4/10"], ["0.04", "4/100"], ["0.004", "4/1000"]], "Each step to the right makes the value ten times smaller."),
    e("Combine place values", ["0.3", "+", "0.02", "+", "0.007", "=", "0.327"], "Thirty-two hundredths and seven thousandths make 327 thousandths."),
  ]),
  "rounding-ordering-and-comparing-decimals": lesson("Compare decimal place values", ["Compare ones, then tenths, hundredths and thousandths.", "Extra zeros at the end of a decimal do not change its value."], [
    t("Line up decimal places", ["Number", "Ones", "Tenths", "Hundredths", "Thousandths"], [["2.7", "2", "7", "0", "0"], ["2.65", "2", "6", "5", "0"]], "2.7 is greater because its tenths digit is larger."),
    e("Use equal-sized parts", ["0.305", "<", "0.35"], "Write 0.35 as 0.350 to compare thousandths."),
    steps("Round to one decimal place", ["Round 6.47 to the nearest tenth.", "It lies between 6.4 and 6.5.", "The hundredths digit is 7, so round to 6.5."], "Check the place immediately to the right of the rounding place."),
    t("Use the requested accuracy", ["Number", "Nearest whole", "Nearest tenth"], [["3.76", "4", "3.8"]], "Rounding to different places gives different approximations."),
  ]),
  "adding-and-subtracting-decimals": lesson("Keep decimal places aligned", ["Line up the decimal points so equal place values stay together.", "Use trailing zeros as placeholders when they help."], [
    t("Align the places", ["Ones", "Point", "Tenths", "Hundredths"], [["3", ".", "4", "0"], ["1", ".", "2", "8"]], "3.4 and 3.40 have the same value."),
    e("Add matching places", ["3.4", "+", "1.28", "=", "4.68"], "Add hundredths to hundredths and tenths to tenths."),
    e("Subtract with placeholders", ["5", "−", "2.375", "=", "2.625"], "Write five as 5.000 when working in columns."),
    e("Complete one whole", ["0.635", "+", "0.365", "=", "1"], "Complements add together to make the target value."),
  ]),
  "percentages-fractions-and-decimals": lesson("Think in hundredths", ["Per cent means out of one hundred.", "Fractions, decimals and percentages can describe the same amount."], [
    diagram("Twenty-five per cent", "grid", "A hundred-square grid with 25 squares shaded: 25%, 25/100, or one quarter.", { columns: 10, rows: 10, shaded: 25 }, "Twenty-five out of one hundred is one quarter."),
    t("Compare equivalent forms", ["Fraction", "Decimal", "Percentage"], [["1/2", "0.5", "50%"], ["1/5", "0.2", "20%"], ["3/4", "0.75", "75%"]], "Convert to hundredths when finding a percentage."),
    e("Convert two fifths", ["2/5", "=", "40/100", "=", "0.4"], "Forty hundredths is forty per cent."),
    steps("Find a percentage of an amount", ["Find 25% of 80.", "25% is one quarter.", "80 ÷ 4 = 20."], "A known equivalent fraction can make a percentage calculation easier."),
  ]),
};
