import { build, choiceN, column, fmt, int, number, others, pick, shuffle, sort, NAMES } from '../kit.js';

/**
 * A pair a, b of `len` digits built column by column with exactly `count` exchanges
 * (carries for +, borrows for −) among the columns below the top one. Built directly,
 * never by retrying, so any random source terminates. The top column never exchanges,
 * so a sum keeps `len` digits and a difference stays positive.
 */
function columnPair(r, len, subtract, count) {
  const exchangeAt = new Set(shuffle(Array.from({ length: len - 1 }, (_, p) => p), r).slice(0, count));
  let a = 0, b = 0, carry = 0;
  for (let p = 0; p < len - 1; p++) {
    const low = p === 0 ? 1 : 0, needs = exchangeAt.has(p);
    let x, y;
    if (subtract) {
      x = needs ? int(r, 0, 8) : int(r, carry + low, 9);
      y = needs ? int(r, Math.max(x - carry + 1, low), 9) : int(r, low, x - carry);
    } else {
      x = needs ? int(r, 2, 9) : int(r, 0, 8 - carry - low);
      y = needs ? int(r, 10 - x - carry, 9) : int(r, low, 9 - x - carry);
    }
    a += x * 10 ** p; b += y * 10 ** p; carry = needs ? 1 : 0;
  }
  const top = len - 1;
  if (subtract) {
    const x = int(r, 1 + carry, 9), y = int(r, 0, x - carry - 1);
    a += x * 10 ** top; b += y * 10 ** top;
  } else {
    const x = int(r, 1, 8 - carry), y = int(r, 0, 9 - x - carry);
    a += x * 10 ** top; b += y * 10 ** top;
  }
  return [a, b];
}
const roundTo = (n, unit) => Math.round(n / unit) * unit;
/** A number a little off halfway for rounding to `unit`, so rounding is never in doubt. */
const clear = (r, lo, hi, unit) => { const n = int(r, lo, hi); return n % unit === unit / 2 ? n + 1 : n; };
const nameTwo = r => { const [a, b] = shuffle(NAMES, r); return [a, b]; };

const COLUMN_STORIES = [
  [(a, b) => `A stadium holds ${fmt(a)} fans. ${fmt(b)} seats are empty. How many fans are there?`, true],
  [(a, b) => `A school raised £${fmt(a)} at a fair and £${fmt(b)} at a sponsored walk. How much money altogether?`, false],
  [(a, b) => `A factory made ${fmt(a)} toys. It sold ${fmt(b)} of them. How many toys are left?`, true],
  [(a, b) => `A train line carried ${fmt(a)} people in May and ${fmt(b)} people in June. How many people altogether?`, false],
  [(a, b) => `A plane flew ${fmt(a)} metres high. It descended ${fmt(b)} metres. How high is it now?`, true],
];

export const BUILDERS = {
  columns(l, r, i) {
    const subtract = i % 2 === 1, sign = subtract ? '−' : '+', len = [5, 5, 6, 6, 6][i];
    const make = count => { const [a, b] = columnPair(r, len, subtract, count); return [a, b, subtract ? a - b : a + b]; };
    if (l === 1) {
      const [a, b, answer] = make(0);
      return number(`Work out ${fmt(a)} ${sign} ${fmt(b)} using the columns.`, answer, { visual: column(a, b, sign),
        rule: 'Line up the columns. Start with the ones column, then move left.',
        hint: 'Every column works on its own here. No exchanging is needed.' });
    }
    if (l === 2) {
      const [a, b, answer] = make(1);
      return number(`Work out ${fmt(a)} ${sign} ${fmt(b)} using the columns.`, answer, { visual: column(a, b, sign),
        hint: subtract ? 'If a top digit is too small, exchange 1 from the next column on the left.' : 'If a column makes 10 or more, carry 1 into the next column on the left.' });
    }
    if (l === 3) {
      const [a, b, answer] = make(int(r, 2, 3)), spare = String((answer % 10 + 1) % 10);
      const tiles = shuffle([...String(answer), spare].map((label, k) => ({ id: String(k), label })), r);
      return { kind: 'build', prompt: `Work out ${fmt(a)} ${sign} ${fmt(b)}. Place the answer's digits from left to right.`, rule: 'One tile is spare.',
        tiles, answer: String(answer), letters: true, maths: { kind: 'digits', value: answer }, visual: column(a, b, sign),
        hint: 'Start at the ones column. There is more than one exchange.' };
    }
    const [story, sub] = COLUMN_STORIES[i], pairLen = 5 + (i % 2), [a, b] = columnPair(r, pairLen, sub, int(r, 2, 3));
    return number(story(a, b), sub ? a - b : a + b, { visual: column(a, b, sub ? '−' : '+'), hint: 'Decide whether to add or subtract, then use the columns.' });
  },
  mental(l, r, i) {
    const n = int(r, 20000, 89999);
    if (l === 1) {
      const unit = [100, 1000, 10000, 1000, 100][i], k = int(r, 2, 9), add = i % 2 === 0, m = k * unit;
      const answer = add ? n + m : n - m;
      return choiceN(`${fmt(n)} ${add ? '+' : '−'} ${fmt(m)} = ?`, answer, others(answer, [add ? n - m : n + m, answer + unit, answer - unit, answer + unit * 10], { min: 1 }), r,
        { rule: `Only the digits in the ${unit === 100 ? 'hundreds' : unit === 1000 ? 'thousands' : 'ten thousands'} place need to change.` });
    }
    if (l === 2) {
      return [
        () => { const m = int(r, 2, 9) * 1000 + int(r, 1, 9) * 100; return number(`${fmt(n)} + ${fmt(m)} = ?`, n + m); },
        () => { const m = int(r, 1, 4) * 10000 + int(r, 1, 9) * 1000; return number(`${fmt(n + 30000)} − ${fmt(m)} = ?`, n + 30000 - m); },
        () => number(`${fmt(n)} + 999 = ?`, n + 999, { hint: 'Add 1000, then take 1 off.' }),
        () => { const m = int(r, 21, 79) * 1000; return number(`How much must be added to ${fmt(m)} to make 100,000?`, 100000 - m, { hint: 'Count up to the next 10,000, then to 100,000.' }); },
        () => { const x = int(r, 40000, 89999), d = int(r, 11, 19) * 1000 + int(r, 1, 9) * 100; return number(`${fmt(x)} − ${fmt(x - d)} = ?`, d, { hint: 'Count on from the smaller number to the bigger one.' }); },
      ][i]();
    }
    if (l === 3) {
      const deltas = [99, 999, 9999, 1999, 4999], d = deltas[i], add = i % 2 === 0, up = d + 1;
      return build(`Build a quick way to work out ${fmt(n)} ${add ? '+' : '−'} ${fmt(d)}.`, [String(n), add ? '+' : '−', String(up), add ? '−' : '+', '1'], r,
        { maths: { kind: 'value', value: add ? n + d : n - d }, hint: `${fmt(d)} is 1 less than ${fmt(up)}.` });
    }
    const [name] = nameTwo(r);
    const a = int(r, 25000, 60000), b = int(r, 2, 9) * 1000, c = int(r, 11, 19) * 100;
    return [
      () => number(`A shop had ${fmt(a)} stickers. It sold ${fmt(b)} and then got ${fmt(c)} more. How many stickers now?`, a - b + c),
      () => number(`${name} has ${fmt(a)} points. ${name} wins 999 more. How many points now?`, a + 999, { hint: 'Add 1000, then take 1 off.' }),
      () => { const loan = int(r, 10, 19) * 1000 + c % 1000; return number(`A library had ${fmt(a)} books. ${fmt(loan)} are out on loan. How many books are on the shelves?`, a - loan); },
      () => number(`A road is ${fmt(a)} metres long. A new part of ${fmt(b)} metres is added, and then ${fmt(c)} metres are closed. How many metres are open?`, a + b - c),
      () => number(`A website had ${fmt(a)} visits. The next month it had ${fmt(b * 10)} more. How many visits altogether?`, a + b * 10),
    ][i]();
  },
  check(l, r, i) {
    const subtract = i % 2 === 1, sign = subtract ? '−' : '+';
    if (l === 1) {
      const unit = [1000, 10000, 1000, 10000, 1000][i], x = clear(r, 30000, 89999, unit), y = clear(r, 11000, subtract ? x - 8000 : 99999 - x, unit);
      const est = subtract ? roundTo(x, unit) - roundTo(y, unit) : roundTo(x, unit) + roundTo(y, unit), exact = subtract ? x - y : x + y;
      return choiceN(`Estimate ${fmt(x)} ${sign} ${fmt(y)}. Round each number to the nearest ${fmt(unit)} first.`, est, others(est, [exact, est + unit, est - unit, est + 10 * unit], { min: 1 }), r,
        { rule: 'Round each number first, then work out the easy calculation.' });
    }
    if (l === 2) {
      const unit = [1000, 1000, 10000, 1000, 100][i], x = clear(r, 30000, 89999, unit), y = clear(r, 11000, subtract ? x - 8000 : 99999 - x, unit);
      const est = subtract ? roundTo(x, unit) - roundTo(y, unit) : roundTo(x, unit) + roundTo(y, unit);
      return number(`Estimate ${fmt(x)} ${sign} ${fmt(y)} by rounding each number to the nearest ${fmt(unit)}.`, est);
    }
    if (l === 3) {
      const make = (good, k) => {
        // Each card starts from a different number (k × 1001 apart), so no two cards are alike.
        const x = clear(r, 30000, 70000, 1000) + k * 1001, y = clear(r, 11000, 99999 - x, 1000), exact = x + y;
        const shown = good ? exact : exact + pick(r, [-1, 1]) * pick(r, [10000, 20000]);
        return [`${fmt(x)} + ${fmt(y)} = ${fmt(shown)}`, good ? 'Sensible' : 'Not sensible'];
      };
      const cards = [make(true, 0), make(true, 1), make(false, 2), make(false, 3)];
      return sort('Use an estimate. Which answers are sensible?', ['Sensible', 'Not sensible'], shuffle(cards, r),
        { rule: 'Round each number, add the rounded numbers, and see if the answer is close.' });
    }
    return [
      () => { const x = clear(r, 30000, 60000, 10000), y = clear(r, 11000, 30000, 10000); return number(`A theatre sold ${fmt(x)} tickets in March and ${fmt(y)} in April. Estimate, to the nearest 10,000, how many tickets it sold altogether.`, roundTo(x, 10000) + roundTo(y, 10000)); },
      () => { const x = clear(r, 50000, 90000, 1000), y = clear(r, 11000, 30000, 1000); return number(`A depot had ${fmt(x)} parcels and sent out ${fmt(y)}. Estimate, to the nearest 1000, how many are left.`, roundTo(x, 1000) - roundTo(y, 1000)); },
      () => { const x = clear(r, 30000, 60000, 1000), y = clear(r, 11000, 30000, 1000); return number(`A park had ${fmt(x)} visitors in July and ${fmt(y)} in August. Estimate, to the nearest 1000, how many visitors it had altogether.`, roundTo(x, 1000) + roundTo(y, 1000)); },
      () => { const x = clear(r, 20000, 90000, 100), y = clear(r, 11000, 19000, 100); return number(`A charity had £${fmt(x)}. It spent £${fmt(y)}. Estimate, to the nearest £100, how much is left.`, roundTo(x, 100) - roundTo(y, 100)); },
      () => { const [name] = nameTwo(r), x = int(r, 30000, 60000), y = int(r, 11000, 30000); return number(`${name} says ${fmt(x)} + ${fmt(y)} = ${fmt(x + y)}. Check using the inverse. What is ${fmt(x + y)} − ${fmt(y)}?`, x, { hint: 'Subtraction undoes addition. You should get the first number back.' }); },
    ][i]();
  },
  addProblems(l, r, i) {
    const a = int(r, 30000, 79999), b = int(r, 2000, 14999), c = int(r, 1000, 9999), [name] = nameTwo(r);
    if (l === 1) {
      const set = [
        [`A farm has ${fmt(a)} chickens. ${fmt(b)} more are born, then ${fmt(c)} are sold. How many chickens now?`, a + b - c, 'Add the new chickens, then subtract the ones sold.'],
        [`A library has ${fmt(a)} books. It buys ${fmt(b)} more, then lends ${fmt(c)}. How many books are on the shelves?`, a + b - c, 'Add the books bought, then subtract the books lent.'],
        [`A café has ${fmt(a)} cups. ${fmt(c)} break, then ${fmt(b)} new cups arrive. How many cups now?`, a - c + b, 'Subtract the broken cups, then add the new cups.'],
        [`A garden centre has ${fmt(a)} plants. It sells ${fmt(c)}, then grows ${fmt(b)} more. How many plants now?`, a - c + b, 'Subtract the plants sold, then add the new plants.'],
        [`A toy shop has ${fmt(a)} marbles. ${fmt(b)} more arrive, then ${fmt(c)} are sold. How many marbles now?`, a + b - c, 'Add the marbles that arrive, then subtract the marbles sold.'],
      ][i];
      return choiceN(set[0], set[1], others(set[1], [a + b + c, a - b - c, set[1] + 1000, set[1] - 1000, set[1] + 10000], { min: 1 }), r, { rule: set[2] });
    }
    if (l === 2) {
      return number([
        `A zoo had ${fmt(a)} visitors on Saturday and ${fmt(b)} on Sunday. ${fmt(c)} of them were children. How many were adults?`,
        `A lorry carries ${fmt(a)} kg of sand. It drops ${fmt(c)} kg at one house and ${fmt(b)} kg at another. How much sand is left?`,
        `${name} scored ${fmt(a)} points in level one and ${fmt(b)} in level two. ${name} then lost ${fmt(c)}. What is the score?`,
        `A lake had ${fmt(a)} fish. ${fmt(c)} were moved away and ${fmt(b)} new fish were added. How many fish now?`,
        `A school printed ${fmt(a)} leaflets. Class 5 used ${fmt(b)} and Class 6 used ${fmt(c)}. How many leaflets are left?`,
      ][i], [a + b - c, a - c - b, a + b - c, a - c + b, a - b - c][i], { hint: 'Find the two steps. Decide which step adds and which subtracts.' });
    }
    if (l === 3) {
      const ops = [['+', '−'], ['−', '+'], ['+', '+'], ['−', '−'], ['+', '−']][i];
      const calc = (x, o, y) => (o === '+' ? x + y : x - y);
      const intro = ['A museum has', 'A depot has', 'A cinema sold', 'A beach has', 'A reserve counted'][i];
      const noun = ['visitors', 'litres of fuel', 'tickets', 'shells', 'birds'][i];
      const text = `${intro} ${fmt(a)} ${noun}. Then ${fmt(b)} ${ops[0] === '+' ? 'more come' : 'go away'}, and ${fmt(c)} ${ops[1] === '+' ? 'more come' : 'go away'}.`;
      return build('Build the calculation for the story. Start with the first number.', [String(a), ops[0], String(b), ops[1], String(c)], r,
        { text, maths: { kind: 'value', value: calc(calc(a, ops[0], b), ops[1], c) } });
    }
    return [
      () => { const x = int(r, 12000, 24999), y = int(r, 12000, 24999), t = int(r, 5000, 9999); return number(`Hill School has ${fmt(x)} books and Park School has ${fmt(y)} books. ${fmt(t)} books are given away. How many books are left?`, x + y - t); },
      () => { const x = int(r, 20000, 49999), d = int(r, 3000, 9999); return number(`A shop took £${fmt(x)} on Saturday. On Sunday it took £${fmt(d)} less. How much did it take altogether?`, x + (x - d)); },
      () => { const x = int(r, 60000, 90000), m = int(r, 10000, 19999), t = int(r, 10000, 19999); return number(`A tank holds ${fmt(x)} litres. ${fmt(m)} litres are used on Monday and ${fmt(t)} litres on Tuesday. How much water is left?`, x - m - t); },
      () => { const x = int(r, 15000, 39999), y = int(r, 15000, 39999), g = x + y + int(r, 5000, 19999); return number(`A charity wants to raise £${fmt(g)}. It has raised £${fmt(x)} and then £${fmt(y)}. How much more does it need?`, g - x - y); },
      () => { const x = int(r, 20000, 49999), e = int(r, 3000, 9999); return number(`A kite flew ${fmt(x)} metres. A buzzard flew ${fmt(e)} metres further than the kite. How far did they fly in total?`, x + x + e); },
    ][i]();
  },
};

export const TOPIC_TITLES = {
  columns: ['Add and subtract in columns.', 'Exchange in one column.', 'Build an answer with exchanges.', 'Solve a column problem.'],
  mental: ['Change one place.', 'Add and subtract in your head.', 'Build a quick way.', 'Solve a mental problem.'],
  check: ['Estimate by rounding first.', 'Type an estimate.', 'Judge if answers are sensible.', 'Estimate and check.'],
  addProblems: ['Follow two steps in a story.', 'Find the two steps.', 'Build the story calculation.', 'Solve a multi-step problem.'],
};
