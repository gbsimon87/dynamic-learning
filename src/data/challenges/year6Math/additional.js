// Year 6 Maths banks beyond the place-value pilot. Each builder stays within the
// mapped statutory requirement in docs/curriculum/year-6-maths.md.
import { choice, choiceN, fmt, gcd, int, isPrime, lcm, number, orderBy } from '../year5Math/kit.js';

const table = (title, headers, rows) => ({ type: 'table5', title, headers, rows });
const n = (prompt, answer, extra = {}) => number(prompt, answer, { maxDigits: 8, ...extra });
const positive = (r, low, high) => int(r, low, high);
const operationsHint = 'Work one step at a time and check that the size of your answer makes sense.';

function longMultiplication(level, r, i) {
  const a = positive(r, 120 + i * 71, 890 + i * 93), b = positive(r, 12, 29), answer = a * b;
  const visual = table('Long multiplication layout', ['Number', 'Value'], [['Multiplicand', fmt(a)], ['Multiplier', fmt(b)]]);
  if (level === 1) return choiceN(`${fmt(a)} × ${b} = ?`, answer, [a * (b - 1), a * (b + 1), a * 10 + b], r, { visual, hint: 'Multiply by the ones, then by the tens. The tens row is worth tens.' });
  if (level === 2) return n(`Use long multiplication to calculate ${fmt(a)} × ${b}.`, answer, { visual, hint: 'Write a zero placeholder before the tens row.' });
  if (level === 3) {
    const values = [a * 12, a * 15, a * 18, a * 21];
    return orderBy(`Put these products in order from smallest to largest.`, values.map((value, k) => ({ value, label: `${fmt(a)} × ${[12, 15, 18, 21][k]} = ${fmt(value)}` })), r, { hint: 'The first factor is the same, so compare the second factors.' });
  }
  return n(`A theatre has ${fmt(a)} seats in each of ${b} equal sections. How many seats are there altogether?`, answer, { visual, hint: 'This is equal groups: multiply the seats in one section by the number of sections.' });
}

function division(level, r, i, short = false) {
  const divisor = short ? positive(r, 12, 19) : positive(r, 20, 39);
  const quotient = positive(r, 18 + i * 3, 58 + i * 4);
  const remainder = i % 3 === 0 ? 0 : positive(r, 1, divisor - 1);
  const dividend = divisor * quotient + remainder;
  const method = short ? 'short division' : 'long division';
  const visual = table(`${method[0].toUpperCase()}${method.slice(1)} record`, ['Dividend', 'Divisor'], [[fmt(dividend), divisor]]);
  if (level === 1) return choice(`${fmt(dividend)} ÷ ${divisor} gives which quotient and remainder?`, `${quotient} r ${remainder}`, [`${quotient - 1} r ${remainder}`, `${quotient} r ${divisor - remainder}`, `${quotient + 1} r 0`], r, { visual, hint: 'Multiply the quotient by the divisor, then add the remainder to check.' });
  if (level === 2) return n(`Use ${method} to calculate the whole-number quotient of ${fmt(dividend)} ÷ ${divisor}.`, quotient, { visual, hint: 'Carry any remainder to the next place value.' });
  if (level === 3) return choice(`A packer puts ${fmt(dividend)} stickers into packs of ${divisor}. Which statement is correct?`, remainder ? `${quotient} full packs and ${remainder} stickers left` : `${quotient} full packs with none left`, remainder ? [`${quotient + 1} full packs`, `${quotient} stickers left`, `${divisor} full packs`] : [`${quotient - 1} full packs`, `${divisor} left`, `${quotient + 1} full packs`], r, { visual, hint: 'The remainder is what is left after making equal full groups.' });
  const groups = remainder ? quotient + 1 : quotient;
  return n(`A coach needs one minibus for every ${divisor} pupils. ${fmt(dividend)} pupils are travelling. How many minibuses are needed?`, groups, { visual, hint: 'A leftover pupil still needs a seat, so round the number of groups up.' });
}

function mental(level, r, i) {
  const a = (20 + i * 5) * 1000, b = (3 + i) * 1000;
  const tasks = [
    () => choiceN(`Calculate mentally: ${fmt(a)} + ${fmt(b)}.`, a + b, [a - b, a + b * 10, a + b + 1000], r, { hint: 'Add the thousands first, then attach the three zeros.' }),
    () => n(`Calculate mentally: ${fmt(a + b)} − ${fmt(b)}.`, a, { hint: 'Use the inverse of addition: what number plus the subtracted number makes the total?' }),
    () => n(`Calculate mentally: ${fmt((i + 4) * 25)} × 4.`, (i + 4) * 100, { hint: 'Multiplying by 4 can be done by doubling twice.' }),
    () => choiceN(`Calculate mentally: ${fmt((i + 4) * 600)} ÷ 6.`, (i + 4) * 100, [(i + 4) * 10, (i + 4) * 60, (i + 5) * 100], r, { hint: 'Divide the non-zero digits, then keep the place value.' }),
    () => n(`A library lends ${fmt(a)} books in one month and ${fmt(b)} fewer in the next. How many books does it lend altogether?`, 2 * a - b, { hint: 'Find the second month first, then add both months.' }),
  ];
  return tasks[(level + i - 1) % tasks.length]();
}

function factorsPrimes(level, r, i) {
  const pairs = [[12, 18], [16, 24], [18, 30], [20, 28], [24, 36]];
  const [a, b] = pairs[i]; const common = gcd(a, b); const commonMultiple = lcm(a, b);
  if (level === 1) return choiceN(`Which number is a common factor of ${a} and ${b}?`, common, [common + 1, common + 2, commonMultiple], r, { hint: 'A common factor divides both numbers exactly.' });
  if (level === 2) return choiceN(`What is the lowest common multiple of ${a} and ${b}?`, commonMultiple, [a * b, commonMultiple + a, commonMultiple - b], r, { hint: 'List multiples of each number until the first match.' });
  if (level === 3) {
    const values = [11, 13, 15, 17, 21].map(value => value + i * 2);
    return choice(`Which number is prime?`, String(values.find(isPrime)), values.filter(value => !isPrime(value)).slice(0, 3).map(String), r, { visual: table('Numbers to inspect', ['Number'], values.map(value => [value])), hint: 'A prime has exactly two factors: 1 and itself.' });
  }
  return n(`Two lights flash every ${a} seconds and every ${b} seconds. After how many seconds will they next flash together?`, commonMultiple, { hint: 'Find the lowest common multiple of the two intervals.' });
}

function orderOfOperations(level, r, i) {
  const a = i + 3, b = i + 4, c = i + 2;
  const expressions = [
    { text: `${a} + ${b} × ${c}`, answer: a + b * c },
    { text: `(${a} + ${b}) × ${c}`, answer: (a + b) * c },
    { text: `${a * b} ÷ ${b} + ${c}`, answer: a + c },
    { text: `${a + b} × ${c} − ${b}`, answer: (a + b) * c - b },
  ];
  const task = expressions[(level + i - 1) % expressions.length];
  if (level === 1) return choiceN(`Calculate ${task.text}.`, task.answer, [task.answer + b, task.answer - c, (a + b) * c], r, { hint: 'Do brackets first, then multiplication or division, then addition or subtraction.' });
  if (level === 2) return n(`Calculate ${task.text}.`, task.answer, { hint: operationsHint });
  if (level === 3) return orderBy('Order these calculations from smallest answer to largest answer.', expressions.map(expression => ({ value: expression.answer, label: `${expression.text} = ${expression.answer}` })), r, { hint: 'Work out each expression before ordering the answers.' });
  return n(`A game awards ${a} bonus points plus ${b} groups of ${c} points. Write and calculate ${a} + ${b} × ${c}. How many points are awarded?`, a + b * c, { hint: 'The groups are multiplied before the extra points are added.' });
}

function additionSubtraction(level, r, i) {
  const start = 4200 + i * 375, received = 850 + i * 25, used = 630 + i * 30;
  const answer = start + received - used;
  const visual = table('Plan the changes', ['Stage', 'Amount'], [['Start', fmt(start)], ['Received', `+${fmt(received)}`], ['Used', `−${fmt(used)}`]]);
  if (level === 1) return choiceN(`Calculate ${fmt(start)} + ${fmt(received)} − ${fmt(used)}.`, answer, [start + received, start - used, answer + 100], r, { visual, hint: 'Do the addition first, then subtract from the updated total.' });
  if (level === 2) return n(`A store has ${fmt(start)} cards, receives ${fmt(received)}, then sells ${fmt(used)}. How many cards remain?`, answer, { visual, hint: 'Write an intermediate total after the delivery.' });
  if (level === 3) return choice(`Which equation models this? Start with ${fmt(start)}, add ${fmt(received)}, then subtract ${fmt(used)}.`, `${fmt(start)} + ${fmt(received)} − ${fmt(used)}`, [`${fmt(start)} − ${fmt(received)} + ${fmt(used)}`, `${fmt(start)} + ${fmt(received + used)}`, `${fmt(start)} − ${fmt(received)} − ${fmt(used)}`], r, { visual, hint: 'Match each word, in order, to an operation.' });
  return n(`A charity has ${fmt(start)} badges. It collects ${fmt(received)} more and gives away ${fmt(used)}. How many badges does it have?`, answer, { visual, hint: 'Check by adding the badges given away back to your final answer.' });
}

function fourOperations(level, r, i) {
  const packs = 12 + i * 2, perPack = 24 + i, shared = [6, 7, 8, 6, 8][i];
  const total = packs * perPack, answer = total / shared;
  const visual = table('Event supplies', ['Fact', 'Value'], [['Packs', packs], ['Items in each pack', perPack], ['Equal groups', shared]]);
  if (level === 1) return choiceN(`${packs} × ${perPack} = ?`, total, [packs + perPack, total - perPack, total + packs], r, { visual, hint: 'There are equal groups, so multiply.' });
  if (level === 2) return n(`${fmt(total)} items are shared equally between ${shared} tables. How many items are on each table?`, answer, { visual, hint: 'Divide the total by the number of equal groups.' });
  if (level === 3) return choice(`Which operation finds the number of items in ${packs} packs of ${perPack}?`, 'multiplication', ['addition', 'subtraction', 'division'], r, { visual, hint: 'Each pack has the same number of items.' });
  return n(`${packs} boxes contain ${perPack} pencils each. The pencils are shared equally between ${shared} classes. How many pencils does each class receive?`, answer, { visual, hint: 'Multiply to find the total, then divide to share it.' });
}

function estimateCheck(level, r, i) {
  const a = 348 + i * 101, b = 57 + i * 11, exact = a * b;
  const estimate = Math.round(a / 100) * 100 * Math.round(b / 10) * 10;
  if (level === 1) return choiceN(`Estimate ${a} × ${b} by rounding ${a} to the nearest 100 and ${b} to the nearest 10.`, estimate, [exact, estimate + 1000, Math.round(a / 10) * 10 * b], r, { hint: 'Round both numbers first, then multiply the friendly numbers.' });
  if (level === 2) return n(`A calculator says ${a} × ${b} = ${exact + 10000}. Is that sensible? Calculate the actual product.`, exact, { hint: 'Use an estimate first, then calculate carefully to check.' });
  if (level === 3) return choice(`Which answer is a sensible estimate for ${a} × ${b}?`, `about ${fmt(estimate)}`, [`about ${fmt(estimate / 10)}`, `about ${fmt(exact + 50000)}`, `about ${fmt(a + b)}`], r, { hint: 'A product of about 400 and about 60 is around 24,000.' });
  return n(`A hall has ${a} seats in each of ${b} rows. The exact calculation is ${fmt(exact)}. Round the answer to the nearest 1,000 for a quick report.`, Math.round(exact / 1000) * 1000, { hint: 'For a report, use the accuracy requested after finding the exact answer.' });
}

export const OPERATION_BUILDERS = {
  'long-multiplication': longMultiplication,
  'long-division-and-remainders': (level, r, i) => division(level, r, i),
  'short-division-and-remainders': (level, r, i) => division(level, r, i, true),
  'mental-calculation-strategies': mental,
  'factors-multiples-and-primes': factorsPrimes,
  'order-of-operations': orderOfOperations,
  'multi-step-addition-and-subtraction': additionSubtraction,
  'four-operation-problems': fourOperations,
  'estimating-and-checking-answers': estimateCheck,
};
