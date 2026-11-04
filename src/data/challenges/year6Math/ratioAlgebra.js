// Ratio, proportion and algebra banks for Year 6.
import { choice, choiceN, int, number, orderBy } from '../year5Math/kit.js';

const table = (title, headers, rows) => ({ type: 'table5', title, headers, rows });
const n = (prompt, answer, extra = {}) => number(prompt, answer, { maxDigits: 7, ...extra });

function ratioMissing(level, r, i) {
  const red = i + 2, blue = i + 3, multiplier = int(r, 2, 6); const totalRed = red * multiplier, totalBlue = blue * multiplier;
  const visual = table('Ratio bar', ['Red parts', 'Blue parts', 'Scale factor'], [[red, blue, multiplier]]);
  if (level === 1) return choiceN(`The ratio of red to blue beads is ${red}:${blue}. If there are ${totalRed} red beads, how many blue beads are there?`, totalBlue, [blue + multiplier, red * blue, totalRed + blue], r, { visual, hint: 'Find the scale factor from the red parts, then multiply the blue parts by it.' });
  if (level === 2) return n(`${red} cups of paint make ${red + blue} cups of mix. How many cups of mix do ${red * multiplier} cups of paint make when the ratio stays the same?`, (red + blue) * multiplier, { visual, hint: 'Scale every part of a ratio by the same multiplier.' });
  if (level === 3) return orderBy('Order these equivalent ratios by their number of red parts.', [1, 2, 3, 4].map(scale => ({ value: red * scale, label: `${red * scale}:${blue * scale}` })), r, { hint: 'Equivalent ratios multiply both parts by the same number.' });
  return n(`A map key uses ${red} cm for ${blue} km. At the same scale, how many kilometres does ${red * multiplier} cm represent?`, totalBlue, { visual, hint: 'Use the integer scale factor from the matching first part.' });
}

function percentage(level, r, i) {
  const amounts = [80, 120, 240, 360, 500]; const amount = amounts[i]; const pct = [10, 15, 25, 15, 20][i]; const answer = amount * pct / 100;
  if (level === 1) return choiceN(`What is ${pct}% of ${amount}?`, answer, [amount / 10, amount * (pct + 5) / 100, amount - answer], r, { hint: 'Find 10%, 5%, 25% or 1% and combine parts when helpful.' });
  if (level === 2) return n(`Calculate ${pct}% of ${amount}.`, answer, { hint: 'Percent means per hundred. Divide by 100, then multiply by the percentage.' });
  if (level === 3) return choice(`A price changes from £${amount} to £${amount + answer}. What percentage increase is this?`, `${pct}%`, [`${pct + 5}%`, `${100 - pct}%`, `${answer}%`], r, { hint: 'Compare the increase with the original amount, not the new total.' });
  return n(`A sports centre has ${amount} members. ${pct}% join a swimming club. How many members join?`, answer, { hint: 'Use the membership total as 100%.' });
}

function scaleFactors(level, r, i) {
  const factor = i + 2, side = 3 + i, enlarged = side * factor;
  const visual = table('Matching sides', ['Original shape', 'Similar shape'], [[`${side} cm`, `${enlarged} cm`]]);
  if (level === 1) return choiceN(`A side of ${side} cm becomes ${enlarged} cm. What is the scale factor?`, factor, [factor - 1, factor + 1, enlarged + side], r, { visual, hint: 'Divide the corresponding new length by the original length.' });
  if (level === 2) return n(`A similar shape has scale factor ${factor}. An original side is ${side + 2} cm. What is the corresponding new side length?`, (side + 2) * factor, { visual, hint: 'Multiply every corresponding length by the scale factor.' });
  if (level === 3) return orderBy('Order these enlarged side lengths from shortest to longest.', [2, 3, 4, 5].map(length => ({ value: length * factor, label: `${length} cm × ${factor} = ${length * factor} cm` })), r, { hint: 'All the side lengths use the same positive scale factor.' });
  return n(`A model triangle has a base of ${side} cm. The real sign is made with scale factor ${factor}. What is its base length in cm?`, enlarged, { visual, hint: 'Similar shapes keep the same scale factor for corresponding sides.' });
}

function unequalSharing(level, r, i) {
  const parts = [2, 3, 4, 5, 6][i]; const other = parts + 1; const unit = int(r, 3, 9); const total = (parts + other) * unit;
  if (level === 1) return choiceN(`${total} stickers are shared in the ratio ${parts}:${other}. How many stickers does the first child get?`, parts * unit, [other * unit, total / 2, parts + other], r, { hint: 'Count the total ratio parts, then find the value of one part.' });
  if (level === 2) return n(`${total} counters are split in the ratio ${parts}:${other}. How many counters does the second group get?`, other * unit, { hint: 'Divide the total by all ratio parts, then multiply by the group’s parts.' });
  if (level === 3) return choice(`Which ratio shares ${total} items as ${parts * unit} and ${other * unit}?`, `${parts}:${other}`, [`${other}:${parts}`, `${parts + other}:${unit}`, `${parts * unit}:${other}`], r, { hint: 'Simplify both shares by dividing by the same unit size.' });
  return n(`A prize of £${total} is shared in the ratio ${parts}:${other}. How many pounds does the larger share receive?`, other * unit, { hint: 'The larger ratio part receives more equal units.' });
}

function formulae(level, r, i) {
  const length = i + 4, width = i + 2, height = i + 3; const area = length * width;
  const visual = table('Formula values', ['l', 'w', 'h'], [[length, width, height]]);
  if (level === 1) return choiceN(`Use A = l × w. If l = ${length} and w = ${width}, what is A?`, area, [length + width, length * height, area + width], r, { visual, hint: 'Substitute each given value into the formula, then calculate.' });
  if (level === 2) return n(`Use V = l × w × h. If l = ${length}, w = ${width} and h = ${height}, what is V?`, area * height, { visual, hint: 'Replace every letter with its given value before multiplying.' });
  if (level === 3) return choice(`If P = 2l + 2w, which values are needed to calculate P?`, 'l and w', ['l only', 'w and h', 'h only'], r, { visual, hint: 'Look at the letters that actually appear in the formula.' });
  return n(`A rectangle has l = ${length} cm and w = ${width} cm. Use A = l × w to find its area.`, area, { visual, hint: 'The formula tells you which values to multiply.' });
}

function sequences(level, r, i) {
  const start = 2 + i, step = i + 3; const terms = Array.from({ length: 5 }, (_, k) => start + step * k);
  if (level === 1) return choiceN(`The sequence is ${terms.slice(0, 4).join(', ')}, __. What is the next term?`, terms[4], [terms[3] + 1, terms[3] * step, terms[3] - step], r, { hint: 'Find the constant difference between neighbouring terms.' });
  if (level === 2) return n(`A sequence starts at ${start} and increases by ${step}. What is its 5th term?`, terms[4], { hint: 'Add the same difference four times after the first term.' });
  if (level === 3) return choice(`Which rule describes ${terms.slice(0, 4).join(', ')}?`, `add ${step} each time`, [`add ${step - 1} each time`, `multiply by ${step}`, `subtract ${step} each time`], r, { hint: 'Check whether the difference stays the same.' });
  return n(`Seat numbers start at ${start} and increase by ${step} along a row. What is the 5th seat number?`, terms[4], { hint: 'This is a linear sequence because it adds a constant amount each time.' });
}

function missingExpressions(level, r, i) {
  const x = i + 3, add = i + 5, multiply = i + 2;
  if (level === 1) return choiceN(`□ + ${add} = ${x + add}. What is □?`, x, [add, x + add, x - 1], r, { hint: 'Use the inverse operation to undo the addition.' });
  if (level === 2) return n(`${multiply} × n = ${multiply * x}. What is n?`, x, { hint: 'Divide both sides by the number multiplying n.' });
  if (level === 3) return choice(`Which expression means “a number m increased by ${add}”?`, `m + ${add}`, [`${add} − m`, `${add}m`, `m ÷ ${add}`], r, { hint: '“Increased by” means add; keep the unknown as a letter.' });
  return n(`Bix writes p − ${add} = ${x}. What is p?`, x + add, { hint: 'Add the subtracted number to both sides to find the missing value.' });
}

function twoUnknowns(level, r, i) {
  const total = 8 + i * 2; const x = i + 1, y = total - x;
  if (level === 1) return choice(`Which pair satisfies a + b = ${total}?`, `(${x}, ${y})`, [`(${x}, ${y + 1})`, `(${x + 1}, ${y + 1})`, `(${x - 1}, ${y - 1})`], r, { hint: 'Substitute both numbers and check their sum.' });
  if (level === 2) return n(`For x + y = ${total}, if x = ${x}, what is y?`, y, { hint: 'Subtract the known x value from the total.' });
  if (level === 3) return orderBy(`Order these values of y from smallest to largest when x + y = ${total}.`, [1, 2, 3, 4].map(value => ({ value: total - value, label: `x = ${value}, y = ${total - value}` })), r, { descending: false, hint: 'Find y by subtracting each x value from the total.' });
  return choice(`A café sells x sandwiches and y wraps. Together x + y = ${total}. If it sells ${x} sandwiches, how many wraps does it sell?`, String(y), [String(x), String(total), String(y + 1)], r, { hint: 'The two amounts must add to the total sold.' });
}

function combinations(level, r, i) {
  const shirts = ['red', 'blue', 'green'].slice(0, 2 + (i % 2)); const hats = ['cap', 'beanie'].slice(0, 2); const count = shirts.length * hats.length;
  if (level === 1) return choiceN(`There are ${shirts.length} shirt colours and ${hats.length} hat styles. How many different shirt-and-hat outfits are possible?`, count, [shirts.length + hats.length, count + 1, hats.length], r, { hint: 'Pair every shirt colour with every hat style.' });
  if (level === 2) return n(`A menu has ${shirts.length} mains and ${hats.length + 1} drinks. How many meal-and-drink combinations are possible?`, shirts.length * (hats.length + 1), { hint: 'Each main can be paired with every drink.' });
  if (level === 3) return choice(`Which list shows all combinations of ${shirts.slice(0, 2).join(' and ')} shirts with ${hats.join(' and ')} hats?`, `${shirts[0]} cap, ${shirts[0]} beanie, ${shirts[1]} cap, ${shirts[1]} beanie`, [`${shirts[0]} cap, ${shirts[1]} beanie`, `${shirts[0]} cap, ${shirts[0]} beanie, ${shirts[1]} cap`, `${shirts[0]} cap, ${shirts[1]} cap, ${shirts[1]} beanie, ${shirts[1]} cap`], r, { hint: 'Make a table so no pairing is missed or repeated.' });
  return n(`A code uses one of ${shirts.length} letters followed by one of ${hats.length + 2} digits. How many codes are possible?`, shirts.length * (hats.length + 2), { hint: 'For each first choice, count all possible second choices.' });
}

export const RATIO_ALGEBRA_BUILDERS = {
  'ratio-and-missing-quantities': ratioMissing,
  'percentages-of-amounts-and-comparisons': percentage,
  'similar-shapes-and-scale-factors': scaleFactors,
  'unequal-sharing-and-grouping': unequalSharing,
  'using-formulae': formulae,
  'linear-number-sequences': sequences,
  'missing-numbers-and-expressions': missingExpressions,
  'equations-with-two-unknowns': twoUnknowns,
  'finding-all-combinations': combinations,
};
