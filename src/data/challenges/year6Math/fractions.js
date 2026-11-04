// Fractions, decimals and percentages for Year 6. The live questions use
// visible values and tables; worked models appear in the matching Bix lessons.
import { buildDecimal, distinctFractions, choice, gcd, int, number, orderBy } from '../year5Math/kit.js';

const table = (title, headers, rows) => ({ type: 'table5', title, headers, rows });
const n = (prompt, answer, extra = {}) => Number.isInteger(answer) ? number(prompt, answer, { maxDigits: 8, ...extra }) : buildDecimal(prompt, String(answer), () => 0.375, extra);
const frac = (a, b) => `${a}/${b}`;
const simplify = (a, b) => { const d = gcd(a, b); return frac(a / d, b / d); };
const fractionChoice = (prompt, a, b, wrong, r, extra = {}) => choice(prompt, simplify(a, b), wrong.map(([x, y]) => simplify(x, y)), r, extra);
const decimal = value => String(Math.round(value * 1000) / 1000);

function simplifying(level, r, i) {
  const base = [[2, 3], [3, 4], [3, 5], [5, 6], [4, 7]][i]; const factor = int(r, 2, 8);
  const [a, b] = base.map(value => value * factor);
  if (level === 1) return fractionChoice(`Simplify ${frac(a, b)}.`, a, b, [[a / factor, b], [a, b / factor], [a + 1, b]], r, { hint: 'Divide the numerator and denominator by the same common factor.' });
  if (level === 2) return choice(`Which fraction is equivalent to ${frac(base[0], base[1])}?`, frac(a, b), distinctFractions(frac(a, b), [frac(a + factor, b), frac(a, b + factor), frac(base[0] + 1, base[1])]), r, { hint: 'Equivalent fractions multiply both parts by the same number.' });
  if (level === 3) {
    const pairs = [[1, 2], [2, 3], [3, 4], [4, 5]].map(([x, y], k) => ({ value: x / y, label: frac(x * (k + 2), y * (k + 2)) }));
    return orderBy('Order these fractions from smallest to largest.', pairs, r, { hint: 'You can simplify each fraction first, then compare their values.' });
  }
  return choice(`A recipe uses ${frac(a, b)} of a bag of flour. Which simplest fraction should be written on the recipe card?`, simplify(a, b), [frac(a / factor, b), frac(a, b / factor), frac(base[0], base[1] + 1)], r, { hint: 'The amount does not change when both parts are divided by the same factor.' });
}

function comparingFractions(level, r, i) {
  const denominator = [4, 5, 6, 8, 10][i]; const a = int(r, 1, denominator - 2); const b = a + 1;
  if (level === 1) return choice(`Which is greater: ${frac(a, denominator)} or ${frac(b, denominator)}?`, frac(b, denominator), [frac(a, denominator), frac(b - 2, denominator), frac(a + 1, denominator + 1)], r, { hint: 'When denominators match, the larger numerator makes the larger fraction.' });
  if (level === 2) {
    const left = [1, 2, 3, 5, 7][i], right = [2, 3, 4, 10, 14][i];
    return choice(`Which is greater: ${frac(left, right)} or ${frac(left * 2 + 1, right * 2)}?`, frac(left * 2 + 1, right * 2), [frac(left, right), frac(left * 2 - 1, right * 2), frac(left + 1, right * 2 + 1)], r, { hint: 'Use a common denominator before comparing.' });
  }
  if (level === 3) {
    const values = [{ a: 3, b: 4 }, { a: 7, b: 8 }, { a: 5, b: 4 }, { a: 3, b: 2 }];
    return orderBy('Order these fractions from smallest to largest.', values.map(({ a, b }) => ({ value: a / b, label: frac(a, b) })), r, { hint: 'Fractions greater than one have a numerator larger than their denominator.' });
  }
  return choice(`A trail is ${frac(5, 4)} km and another is ${frac(9, 8)} km. Which trail is longer?`, frac(5, 4), [frac(9, 8), frac(1, 4), frac(1, 8)], r, { hint: 'Express both fractions in eighths: five quarters is ten eighths.' });
}

function addSubtractFractions(level, r, i) {
  const pairs = [[1, 2, 1, 3], [2, 3, 1, 4], [3, 4, 1, 6], [1, 3, 1, 8], [2, 5, 1, 2]];
  const [a, b, c, d] = pairs[i]; const top = a * d + c * b; const bottom = b * d;
  if (level === 1) return fractionChoice(`Calculate ${frac(a, b)} + ${frac(c, d)}.`, top, bottom, [[a + c, b + d], [a * d - c * b, bottom], [top + 1, bottom]], r, { hint: 'Find a common denominator before adding the numerators.' });
  if (level === 2) return fractionChoice(`Calculate ${frac(a + 1, b)} − ${frac(c, d)}.`, (a + 1) * d - c * b, bottom, [[a + 1 - c, b + d], [a * d + c * b, bottom], [(a + 1) * d - c * b, bottom + 1]], r, { hint: 'Rename both fractions with a common denominator, then subtract.' });
  if (level === 3) return choice(`Which expression has the answer ${frac(top, bottom)} before simplifying?`, `${frac(a, b)} + ${frac(c, d)}`, [`${frac(a, b)} − ${frac(c, d)}`, `${frac(a + 1, b)} + ${frac(c, d)}`, `${frac(a + c, b)} + ${frac(c, d)}`], r, { hint: 'Multiply each numerator by the other denominator to make equal parts.' });
  return fractionChoice(`Calculate 1 ${frac(a, b)} + ${frac(c, d)}.`, b * d + top, bottom, [[a + c, b + d], [b * d + a * d - c * b, bottom], [b * d + top + 1, bottom]], r, { hint: 'Change the whole number to an equivalent fraction, then use a common denominator.' });
}

function multiplyFractions(level, r, i) {
  const pairs = [[1, 2, 2, 3], [2, 3, 3, 4], [3, 5, 1, 2], [3, 4, 2, 5], [4, 5, 1, 3]];
  const [a, b, c, d] = pairs[i];
  if (level === 1) return fractionChoice(`Calculate ${frac(a, b)} × ${frac(c, d)}.`, a * c, b * d, [[a + c, b + d], [a * d, b * c], [a * c + 1, b * d]], r, { hint: 'Multiply numerators together and denominators together, then simplify.' });
  if (level === 2) return choice(`Which multiplication gives ${simplify(a * c, b * d)}?`, `${frac(a, b)} × ${frac(c, d)}`, [`${frac(a, b)} + ${frac(c, d)}`, `${frac(a + 1, b)} × ${frac(c, d)}`, `${frac(a + c, b)} × ${frac(c, d)}`], r, { hint: 'A fraction of a fraction means multiply.' });
  if (level === 3) return orderBy('Order these products from smallest to largest.', [[1, 2], [2, 3], [3, 4], [4, 5]].map(([x, y]) => ({ value: x / y / 2, label: `${frac(x, y)} × ${frac(1, 2)}` })), r, { hint: 'Each product is half of the first fraction.' });
  return fractionChoice(`A recipe needs ${frac(a, b)} of a cup for one batch. Bix makes ${frac(c, d)} of a batch. What fraction of a cup is needed?`, a * c, b * d, [[a + c, b + d], [a * d, b * c], [a * c + 1, b * d]], r, { hint: 'Take the stated fraction of the amount by multiplying.' });
}

function divideFractions(level, r, i) {
  const pairs = [[1, 2, 2], [2, 3, 2], [3, 4, 3], [3, 5, 2], [4, 5, 4]];
  const [a, b, whole] = pairs[i];
  if (level === 1) return fractionChoice(`Calculate ${frac(a, b)} ÷ ${whole}.`, a, b * whole, [[a * whole, b], [a, b + whole], [a + 1, b * whole]], r, { hint: 'Dividing by a whole number shares the fraction into that many equal parts.' });
  if (level === 2) return choice(`Which multiplication checks ${frac(a, b)} ÷ ${whole} = ${simplify(a, b * whole)}?`, `${simplify(a, b * whole)} × ${whole} = ${frac(a, b)}`, [`${simplify(a, b * whole)} + ${whole} = ${frac(a, b)}`, `${frac(a, b)} × ${whole} = ${simplify(a, b * whole)}`, `${frac(a, b)} − ${whole} = ${simplify(a, b * whole)}`], r, { hint: 'Use the inverse operation: multiply the answer by the whole number.' });
  if (level === 3) return orderBy('Order these shares from smallest to largest.', [2, 3, 4, 5].map(value => ({ value: 1 / (2 * value), label: `${frac(1, 2)} ÷ ${value}` })), r, { hint: 'Sharing into more equal parts makes each part smaller.' });
  return fractionChoice(`${frac(a, b)} of a litre of juice is shared equally between ${whole} children. What fraction of a litre does each child receive?`, a, b * whole, [[a * whole, b], [a, b + whole], [a + 1, b * whole]], r, { hint: 'Share the amount into equal parts; multiply the denominator by the number of shares.' });
}

function fractionDecimal(level, r, i) {
  const pairs = [[1, 2], [1, 4], [3, 4], [1, 8], [3, 8]]; const [a, b] = pairs[i]; const value = a / b;
  if (level === 1) return choice(`Which decimal is equal to ${frac(a, b)}?`, decimal(value), [decimal(value + 0.1), decimal(value / 10), decimal(1 - value)], r, { hint: 'A fraction is division: numerator ÷ denominator.' });
  if (level === 2) return choice(`${a} ÷ ${b} = ?`, decimal(value), [decimal(a * b), decimal(b / a), decimal(value + 0.01)], r, { hint: 'Use a decimal division or known fraction equivalent.' });
  if (level === 3) return orderBy('Order these values from smallest to largest.', pairs.map(([top, bottom]) => ({ value: top / bottom, label: `${frac(top, bottom)} = ${decimal(top / bottom)}` })), r, { hint: 'Use the decimal equivalents to compare the fractions.' });
  return choice(`A measuring jug is filled to ${frac(a, b)} litre. Which decimal label matches the level?`, `${decimal(value)} L`, [`${decimal(value + 0.1)} L`, `${decimal(value / 10)} L`, `${decimal(1 - value)} L`], r, { hint: 'Write the fraction as numerator ÷ denominator.' });
}

function decimalPlace(level, r, i) {
  const value = [3.405, 5.06, 1.275, 8.009, 2.54][i]; const factor = [10, 100, 1000, 10, 100][i];
  const digitInfo = [
    ['tenths', '4', '0.4'], ['hundredths', '6', '0.06'], ['thousandths', '5', '0.005'], ['thousandths', '9', '0.009'], ['hundredths', '4', '0.04'],
  ][i];
  if (level === 1) return choice(`In ${value}, what is the value of the ${digitInfo[1]} in the ${digitInfo[0]} place?`, digitInfo[2], ['4', '0.04', '0.004'].filter(option => option !== digitInfo[2]), r, { visual: table('Decimal place value', ['Number'], [[value]]), hint: 'Read places to the right of the decimal point as tenths, hundredths, then thousandths.' });
  if (level === 2) return n(`${value} × ${factor} = ?`, Number((value * factor).toFixed(6)), { hint: 'Multiplying by 10, 100 or 1,000 moves each digit left by that many places.' });
  if (level === 3) return n(`${value} ÷ ${factor} = ?`, Number((value / factor).toFixed(6)), { hint: 'Dividing by 10, 100 or 1,000 moves each digit right by that many places.' });
  return n(`A sensor records ${value} km. It records the same distance in metres. How many metres is this?`, Number((value * 1000).toFixed(6)), { hint: 'There are 1,000 metres in one kilometre, so multiply by 1,000.' });
}

function multiplyDecimals(level, r, i) {
  const a = [1.2, 2.5, 3.04, 4.6, 0.75][i]; const b = [3, 4, 2, 5, 8][i]; const answer = Number((a * b).toFixed(3));
  if (level === 1) return choice(`${a} × ${b} = ?`, decimal(answer), [decimal(a + b), decimal(answer * 10), decimal(answer / 10)], r, { hint: 'Multiply as whole numbers, then place the decimal using the estimate.' });
  if (level === 2) return n(`Calculate ${a} × ${b}.`, answer, { hint: 'Estimate first: the answer should be close to a whole-number multiplication.' });
  if (level === 3) return orderBy('Order these products from smallest to largest.', [2, 3, 4, 5].map(multiplier => ({ value: a * multiplier, label: `${a} × ${multiplier} = ${decimal(a * multiplier)}` })), r, { hint: 'The decimal factor stays the same, so larger whole multipliers make larger products.' });
  return n(`${b} metres of ribbon cost £${a} per metre. What is the cost in pounds?`, answer, { hint: 'Multiply the price for one metre by the number of metres.' });
}

function decimalDivision(level, r, i) {
  const divisor = [4, 5, 8, 20, 25][i]; const answer = [2.5, 3.6, 1.25, 0.75, 1.44][i]; const dividend = divisor * answer;
  if (level === 1) return choice(`${dividend} ÷ ${divisor} = ?`, decimal(answer), [decimal(answer + 0.1), decimal(answer * 10), decimal(divisor / dividend)], r, { hint: 'Use written division and continue into decimal places when needed.' });
  if (level === 2) return n(`Calculate ${dividend} ÷ ${divisor}.`, answer, { hint: 'Place the decimal point in the quotient directly above the dividend’s decimal point.' });
  if (level === 3) return choice(`Which check is correct for ${dividend} ÷ ${divisor} = ${answer}?`, `${answer} × ${divisor} = ${dividend}`, [`${answer} + ${divisor} = ${dividend}`, `${dividend} × ${divisor} = ${answer}`, `${dividend} − ${divisor} = ${answer}`], r, { hint: 'Multiplication is the inverse of division.' });
  return n(`${dividend} litres of paint are poured equally into ${divisor} jars. How many litres are in each jar?`, answer, { hint: 'Divide the total amount by the number of equal jars.' });
}

function roundingDecimals(level, r, i) {
  const value = [3.146, 8.755, 12.049, 0.995, 6.375][i]; const places = [1, 2, 1, 2, 2][i]; const factor = 10 ** places; const answer = Math.round(value * factor) / factor;
  const named = places === 1 ? 'one decimal place' : 'two decimal places';
  if (level === 1) return choice(`Round ${value} to ${named}.`, decimal(answer), [decimal(Math.floor(value * factor) / factor), decimal(answer + 1 / factor), decimal(value)], r, { hint: 'Look at the next digit. Five or more rounds the last kept digit up.' });
  if (level === 2) return n(`Round ${value} to ${named}.`, answer, { hint: 'Keep the requested places, then inspect the next digit.' });
  if (level === 3) return choice(`A length is ${value} m. Which is the correct measurement to ${named}?`, `${decimal(answer)} m`, [`${decimal(Math.floor(value * factor) / factor)} m`, `${value} m`, `${decimal(answer + 1 / factor)} m`], r, { hint: 'Measurements are rounded only to the accuracy requested.' });
  return n(`A runner takes ${value} seconds. Record the time to ${named}.`, answer, { hint: 'Do not round until you know how many decimal places the record needs.' });
}

function fractionDecimalPercent(level, r, i) {
  const entries = [[1, 2, 0.5, 50], [1, 4, 0.25, 25], [3, 4, 0.75, 75], [1, 5, 0.2, 20], [3, 5, 0.6, 60]];
  const [a, b, dec, percent] = entries[i];
  if (level === 1) return choice(`Which percentage is equal to ${frac(a, b)}?`, `${percent}%`, [`${percent / 10}%`, `${100 - percent}%`, `${percent + 10}%`], r, { hint: 'Change the fraction to a decimal, then multiply by 100 for a percentage.' });
  if (level === 2) return choice(`Which decimal is equal to ${percent}%?`, decimal(dec), [decimal(dec / 10), decimal(1 - dec), decimal(dec + 0.1)], r, { hint: 'Percent means out of 100, so divide by 100.' });
  if (level === 3) return orderBy('Order these percentages from smallest to largest.', entries.map(([top, bottom, value, pct]) => ({ value, label: `${pct}% = ${frac(top, bottom)}` })), r, { hint: 'Use decimals or fractions with a common denominator to compare.' });
  return choice(`A chart shows ${percent}% of a class chose cycling. Which fraction label matches?`, frac(a, b), [frac(a + 1, b), frac(a, b + 1), frac(b - a, b)], r, { hint: 'Match the percentage to its familiar fraction and decimal equivalent.' });
}

export const FRACTION_BUILDERS = {
  'simplifying-fractions-and-common-denominators': simplifying,
  'comparing-and-ordering-fractions': comparingFractions,
  'adding-and-subtracting-fractions-and-mixed-numbers': addSubtractFractions,
  'multiplying-proper-fractions': multiplyFractions,
  'dividing-fractions-by-whole-numbers': divideFractions,
  'fractions-as-division-and-decimals': fractionDecimal,
  'decimal-place-value-and-powers-of-ten': decimalPlace,
  'multiplying-decimals': multiplyDecimals,
  'written-division-with-decimal-answers': decimalDivision,
  'rounding-decimal-answers': roundingDecimals,
  'fraction-decimal-and-percentage-equivalences': fractionDecimalPercent,
};
