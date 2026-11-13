import { build, choice, choiceN, factorsOf, fmt, int, number, others, pick, shuffle, sort, NAMES } from '../kit.js';

/** A count of thousandths as a decimal a child writes: 34500 → 34.5. */
const show = t => String(t / 1000);
const mixedText = (whole, num, den) => {
  const g = (a, b) => (b ? g(b, a % b) : a), d = g(num, den), n = num / d, dd = den / d;
  return n === 0 ? String(whole) : whole ? `${whole} ${n}/${dd}` : `${n}/${dd}`;
};
const digitsNumber = (r, len, hi) => Number([int(r, 1, hi), ...Array.from({ length: len - 1 }, () => int(r, 1, hi))].join(''));
const NAME = r => pick(r, NAMES);

export const BUILDERS = {
  division(l, r, i) {
    const d = l === 1 ? [2, 3, 4, 2, 3][i] : int(r, 3, 9);
    if (l === 1) {
      const q = digitsNumber(r, i < 3 ? 3 : 4, Math.floor(9 / d));
      return number(`Work out ${fmt(q * d)} ÷ ${d}.`, q, { visual: { type: 'busStop', divisor: d, dividend: q * d },
        rule: 'Divide each digit in turn, starting on the left.', hint: 'Each digit divides exactly, so there is nothing to exchange.' });
    }
    const q = int(r, 100, Math.floor(9999 / d)), rem = int(r, 1, d - 1);
    if (l === 2) {
      if (i < 3) return number(`Work out ${fmt(q * d)} ÷ ${d}.`, q, { visual: { type: 'busStop', divisor: d, dividend: q * d }, hint: 'If a digit is too small to divide, exchange it into the next place as extra hundreds, tens or ones.' });
      return number(`${fmt(q * d + rem)} ÷ ${d}. What is the remainder?`, rem, { visual: { type: 'busStop', divisor: d, dividend: q * d + rem }, maxDigits: 1, hint: 'The remainder is what is left at the end of the last digit.' });
    }
    if (l === 3) {
      const n = q * d + rem;
      return build(`Show that ${fmt(n)} ÷ ${d} = ${fmt(q)} remainder ${rem}.`, [String(d), '×', String(q), '+', String(rem), '=', String(n)], r,
        { rule: 'Divisor × quotient + remainder = the number you started with.' });
    }
    return [
      () => { const cap = int(r, 6, 40), n = cap * int(r, 4, 20) + int(r, 1, cap - 1); return number(`A minibus holds ${cap} people. ${n} people want to go on a trip. How many minibuses are needed?`, Math.floor(n / cap) + 1, { hint: 'Everyone needs a seat, so a part-full minibus still counts.' }); },
      () => { const per = int(r, 6, 12), n = per * int(r, 15, 80) + int(r, 1, per - 1); return number(`Eggs are packed in boxes of ${per}. A farm has ${n} eggs. How many full boxes can it pack?`, Math.floor(n / per), { hint: 'Only full boxes count. Ignore the remainder.' }); },
      () => { const per = int(r, 5, 9), n = per * int(r, 20, 100) + int(r, 1, per - 1); return number(`${n} stickers are shared equally between ${per} children. How many stickers are left over?`, n % per, { maxDigits: 2 }); },
      () => { const n = pick(r, [98, 126, 154, 182, 210, 238]) + pick(r, [-1, 0, 1]), who = NAME(r), q4 = Math.floor(n / 4), rem = n % 4;
        return choice(`${who} shares £${n} equally between 4 friends. How much does each friend get?`, `£${(n / 4).toFixed(2)}`, [`£${q4}.${rem}`, `£${q4}`, `£${(q4 + 1).toFixed(2)}`], r, { hint: `A remainder of £${rem} is ${rem * 25}p each when shared between 4.` }); },
      () => { const per = pick(r, [2, 4, 5]), n = int(r, 20, 400) * per + int(r, 1, per - 1), q = Math.floor(n / per), rem = n % per, ans = `${mixedText(q, rem, per)} cm`;
        const wrong = [`${q}.${rem} cm`, `${q} cm`, `${q + 1} cm`].filter(t => t !== ans && t !== `${n / per} cm`);
        return choice(`A rope is ${n} cm long. It is cut into ${per} equal pieces. How long is each piece?`, ans, wrong, r); },
    ][i]();
  },
  scale10(l, r, i) {
    const op = (t, k, up) => (up ? t * 10 ** k : t / 10 ** k);
    const wrongs = (t, k, up) => [1, 2, 3].filter(x => x !== k).map(x => op(t, x, up)).concat([op(t, k, !up)]).filter(v => Number.isInteger(v));
    if (l === 1) {
      const specs = [[10, 1, true, 2], [100, 2, true, 2], [1000, 3, true, 1], [10, 1, false, 0], [100, 2, false, 0]], [mult, k, up, dp] = specs[i];
      const base = dp === 2 ? int(r, 1, 9) * 1000 + int(r, 1, 9) * 100 + int(r, 1, 9) * 10 : dp === 1 ? int(r, 1, 9) * 1000 + int(r, 1, 9) * 100 : int(r, 12, 99) * 100000 + (k === 1 ? int(r, 1, 9) * 100000 / 10 : 0);
      const start = show(base), result = op(base, k, up);
      return choice(`${start} ${up ? '×' : '÷'} ${mult} = ?`, show(result), [...new Set(wrongs(base, k, up).map(show))].filter(t => t !== show(result)).slice(0, 3), r,
        { rule: up ? 'Multiplying makes the number bigger. Each digit moves to the left: 1 place for × 10, 2 for × 100, 3 for × 1000.' : 'Dividing makes the number smaller. Each digit moves to the right: 1 place for ÷ 10, 2 for ÷ 100, 3 for ÷ 1000.' });
    }
    if (l === 2) {
      return [
        () => { const a = int(r, 2, 99) * 100; return number(`${fmt(a)} ÷ 100 = ?`, a / 100); },
        () => { const a = int(r, 12, 99); return number(`${a} × 1000 = ?`, a * 1000); },
        () => { const a = int(r, 11, 99); return number(`${show(a * 10)} × 100 = ?`, a); },
        () => { const a = int(r, 12, 99); return number(`? × 100 = ${fmt(a * 100)}`, a); },
        () => { const k = pick(r, [10, 100, 1000]), t = int(r, 11, 99) * 100; return number(`${show(t)} × ? = ${fmt(t * k / 1000)}`, k, { maxDigits: 4 }); },
      ][i]();
    }
    if (l === 3) {
      const d = int(r, 1, 9), e = int(r, 1, 9), D = d * 10 + e, A = D / 100, B = D / 10, C = D;
      const bins = [String(A), String(B), String(C)];
      return sort('Match each calculation to its answer.', bins, shuffle([
        [`${B} ÷ 10`, bins[0]], [`${C} ÷ 100`, bins[0]], [`${A} × 10`, bins[1]], [`${C} ÷ 10`, bins[1]], [`${A} × 100`, bins[2]], [`${B} × 10`, bins[2]]], r));
    }
    return [
      () => { const v = int(r, 2, 9), h = pick(r, [0, 5]); return number(`A bottle holds ${v}${h ? '.5' : ''} litres. How many millilitres is that?`, h ? v * 1000 + 500 : v * 1000); },
      () => { const v = int(r, 2, 9), t = int(r, 1, 9); return number(`A ribbon is ${v}.${t} metres long. How many centimetres is that?`, v * 100 + t * 10); },
      () => { const v = int(r, 11, 99); return number(`A pencil is ${v * 10} mm long. How many centimetres is that?`, v); },
      () => { const v = int(r, 2, 9); return number(`A path is ${fmt(v * 1000)} metres long. How many kilometres is that?`, v); },
      () => { const v = int(r, 11, 59); return number(`A card costs £0.${String(v).padStart(2, '0')}. A shop buys 100 cards. How many pence do they cost altogether?`, v * 100); },
    ][i]();
  },
  powers(l, r, i) {
    const n = int(r, 3, 9);
    if (l === 1) {
      return [
        () => choiceN(`What is ${n}²?`, n * n, [n * 2, n * n * n, n * n + n], r, { rule: 'A number squared is the number times itself: 5² = 5 × 5 = 25.' }),
        () => { const m = int(r, 2, 6); return choiceN(`What is ${m}³?`, m ** 3, [m * 3, m * m, m ** 3 + m, m * m * 3], r, { rule: 'A number cubed is the number times itself, three times: 2³ = 2 × 2 × 2 = 8.' }); },
        () => choiceN(`Which number is the same as ${n} × ${n}?`, n * n, [n * 2, n ** 3, n + n], r, { rule: 'A number squared is the number times itself: 5² = 5 × 5 = 25.' }),
        () => { const m = int(r, 2, 5); return choice(`Which is the same as ${m} × ${m} × ${m}?`, `${m}³`, [`${m}²`, `${m} × 3`, `3${m}`], r, { rule: 'The little 3 means three of the number multiplied together.' }); },
        () => choice(`How do you write ${n} × ${n} using a small 2?`, `${n}²`, [`${n}³`, `${n * 2}`, `2${n}`], r, { rule: 'The little 2 means multiply the number by itself.' }),
      ][i]();
    }
    if (l === 2) {
      return [
        () => { const m = int(r, 6, 12); return number(`${m}² = ?`, m * m); },
        () => { const m = int(r, 3, 6); return number(`${m}³ = ?`, m ** 3); },
        () => { const m = int(r, 4, 12); return number(`What is the square of ${m}?`, m * m); },
        () => { const m = int(r, 4, 12); return number(`? × ? = ${m * m}. What number is multiplied by itself?`, m); },
        () => { const m = pick(r, [3, 4, 5, 10]); return number(`What is the cube of ${m}?`, m ** 3); },
      ][i]();
    }
    if (l === 3) {
      const squares = shuffle([4, 9, 16, 25, 36, 49, 81, 100, 121, 144], r).slice(0, 2), cubes = shuffle([8, 27, 125, 216, 343, 512, 1000], r).slice(0, 2);
      const neither = shuffle([12, 18, 20, 30, 45, 50, 60, 75, 90, 150], r).slice(0, 2);
      return sort('Sort the numbers: square, cube, or neither?', ['Square number', 'Cube number', 'Neither'],
        shuffle([...squares.map(v => [String(v), 'Square number']), ...cubes.map(v => [String(v), 'Cube number']), ...neither.map(v => [String(v), 'Neither'])], r));
    }
    return [
      () => number(`A square patio has sides of ${n + 2} m. How many square metres is its area?`, (n + 2) ** 2),
      () => { const m = int(r, 3, 6); return number(`A cube-shaped box has edges of ${m} cm. How many 1 cm cubes fill it?`, m ** 3); },
      () => { const m = int(r, 4, 9); return number(`A game board is ${m} squares by ${m} squares. How many squares does it have?`, m * m); },
      () => { const m = int(r, 3, 6); return number(`How many more is ${m}³ than ${m}²?`, m ** 3 - m * m); },
      () => { const a = int(r, 3, 9), b = int(r, 2, 4); return number(`${a}² + ${b}³ = ?`, a * a + b ** 3); },
    ][i]();
  },
  rates(l, r, i) {
    const name = NAME(r);
    if (l === 1) {
      const d = [2, 4, 3, 10, 5][i], q = int(r, 3, 12), n = q * d, f = ['1/2', '1/4', '1/3', '1/10', '1/5'][i];
      return choiceN(`A rope is ${n} m long. A shorter rope is ${f} as long. How long is the shorter rope in metres?`, q, others(q, [n * d, n - d, q * 2, q + d]).slice(0, 3), r,
        { rule: `To find ${f} of an amount, divide it by ${d}.` });
    }
    if (l === 2) {
      const a = int(r, 3, 9), k = int(r, 4, 9), t = int(r, 3, 6);
      return [
        () => number(`A cyclist rides ${a * 3} km each hour. How many km does she ride in ${k} hours?`, a * 3 * k),
        () => number(`${t} pens cost £${t * a}. How much do ${t + k} pens cost, in pounds?`, a * (t + k), { hint: 'Find the cost of 1 pen first.' }),
        () => number(`${t} cakes use ${t * a} eggs. How many eggs do ${k} cakes use?`, a * k, { hint: 'Find the number of eggs for 1 cake first.' }),
        () => number(`A tap fills ${a + 10} litres every minute. How many litres is that in ${k} minutes?`, (a + 10) * k),
        () => number(`${name} reads ${a + 5} pages every day. How many days does it take to read ${(a + 5) * k} pages?`, k),
      ][i]();
    }
    if (l === 3) {
      const t = int(r, 3, 6), a = int(r, 3, 9), k = int(r, 7, 9);
      return build(`Build the calculation: ${t} packs cost £${t * a}. How much do ${k} packs cost?`, [String(t * a), '÷', String(t), '×', String(k), '=', String(a * k)], r,
        { hint: 'Find the cost of 1 pack, then multiply.' });
    }
    return [
      () => { const b = int(r, 5, 12) * 20; return number(`A recipe uses ${b} g of flour for 4 people. For 6 people it needs 1 1/2 times as much. How many grams of flour is that?`, b * 3 / 2); },
      () => { const v = int(r, 20, 80) * 10; return number(`A model car is 1/10 the length of a real car. The real car is ${v} cm long. How long is the model in cm?`, v / 10); },
      () => { const a = int(r, 12, 25), k = int(r, 6, 9); return number(`A machine fills ${a} bottles every minute. How many bottles does it fill in ${k} minutes?`, a * k); },
      () => { const a = int(r, 3, 9), k = int(r, 6, 9); return number(`5 tickets cost £${5 * a * 2}. How much do ${k} tickets cost, in pounds?`, a * 2 * k); },
      () => { const s = int(r, 5, 9) * 12, h = int(r, 4, 6); return number(`A bus travels ${s} miles in 2 hours. At the same speed, how many miles does it travel in ${h} hours?`, s / 2 * h); },
    ][i]();
  },
  operations(l, r, i) {
    const a = int(r, 11, 40), b = int(r, 11, 40), c = int(r, 5, a + b - 5), name = NAME(r);
    if (l === 1 || l === 2) {
      const make = [
        () => [`${a} + ${b} = ${c} + ?`, a + b - c],
        () => { const d = int(r, 5, a - 2); return [`${a} − ${d} = ${a + 3} − ?`, 3 + d]; },
        () => { const x = int(r, 2, 9), y = pick(r, [12, 15, 20, 24, 30, 36]), z = pick(r, factorsOf(x * y).filter(f => f > 1 && f < x * y && f !== x && f !== y)); return [`${x} × ${y} = ${z} × ?`, x * y / z]; },
        () => { const x = int(r, 4, 9), y = int(r, 3, 9); return [`${x * y} = ${x} × ?`, y]; },
        () => { const x = int(r, 20, 60), y = int(r, 11, 30); return [`? = ${x} + ${y}`, x + y]; },
      ][i];
      const [text, answer] = make();
      if (l === 2) return number(`What number goes in the place of the ? to make the statement true?  ${text}`, answer, { hint: 'Both sides of the equals sign must have the same value.' });
      return choiceN(`Which number makes this true?  ${text}`, answer, others(answer, [answer + 1, answer - 1, answer + 10, answer - 10, a + b], { min: 1 }), r, { rule: 'The equals sign means both sides have the same value.' });
    }
    if (l === 3) {
      return [
        () => { const x = int(r, 11, 30), y = int(r, 11, 30), z = int(r, 5, 10); return build('Build a true statement. Use all the tiles.', [String(x), '+', String(y), '=', String(x + y + z), '−', String(z)], r, { maths: { kind: 'equation' } }); },
        () => { const k = pick(r, [[4, 35, 5, 28], [6, 15, 9, 10], [8, 15, 6, 20], [5, 24, 8, 15], [4, 45, 9, 20]]); return build('Build a true statement. Use all the tiles.', [String(k[0]), '×', String(k[1]), '=', String(k[2]), '×', String(k[3])], r, { maths: { kind: 'equation' } }); },
        () => { const x = int(r, 11, 30), y = int(r, 11, 30), d = pick(r, [-1, 1]); return build('Build a true statement. Use all the tiles.', [String(x), '+', String(y), '=', String(x + d), '+', String(y - d)], r, { maths: { kind: 'equation' } }); },
        () => { const x = int(r, 4, 9), y = int(r, 4, 9), z = int(r, 5, x * y - 5); return build('Build a true statement. Use all the tiles.', [String(x), '×', String(y), '=', String(z), '+', String(x * y - z)], r, { maths: { kind: 'equation' } }); },
        () => { const x = int(r, 40, 90), y = int(r, 11, 30), d = pick(r, [-3, 3, 5]); return build('Build a true statement. Use all the tiles.', [String(x), '−', String(y), '=', String(x + d), '−', String(y + d)], r, { maths: { kind: 'equation' } }); },
      ][i]();
    }
    return [
      () => { const n = int(r, 3, 6), p = int(r, 2, 5), q = int(r, 2, 4), cost = n * p + q, pay = Math.ceil((cost + 1) / 10) * 10; return number(`${name} buys ${n} notebooks at £${p} each and a pen at £${q}. ${name} pays with £${pay}. How much change is that, in pounds?`, pay - cost); },
      () => { const x = int(r, 5, 8), y = int(r, 6, 9), br = int(r, 2, 9); return number(`A tray has ${x} rows of ${y} eggs. ${br} eggs break. How many whole eggs are left?`, x * y - br); },
      () => { const p = int(r, 3, 5), st = int(r, 12, 24), f = pick(r, [3, 4, 5, 6]), give = (p * st) % f + f * int(r, 1, 3); return number(`${name} has ${p} packs of ${st} stickers. ${name} gives away ${give} and shares the rest equally between ${f} friends. How many stickers does each friend get?`, (p * st - give) / f); },
      () => { const x = int(r, 8, 15), y = int(r, 5, 9), n = int(r, 2, 4), m = int(r, 2, 5); return number(`Tickets cost £${x} for an adult and £${y} for a child. How much do ${n} adults and ${m} children pay altogether, in pounds?`, n * x + m * y); },
      () => { const x = int(r, 11, 30), y = int(r, 11, 30), t = x + y + int(r, 5, 20); return number(`What number goes in the place of the ? to make this true?  ${x} + ${y} = ${t} − ?`, t - x - y); },
    ][i]();
  },
};

export const TOPIC_TITLES = {
  division: ['Divide with no carrying.', 'Carry and find remainders.', 'Check a division fact.', 'Use the remainder.'],
  scale10: ['Move the digits.', 'Fill the missing number.', 'Match the answers.', 'Convert and scale.'],
  powers: ['Squares and cubes.', 'Work out squares and cubes.', 'Sort squares and cubes.', 'Solve a squares story.'],
  rates: ['Find a fraction of a length.', 'Solve a rate problem.', 'Build a rate calculation.', 'Scale up and down.'],
  operations: ['Same value on both sides.', 'Find the missing number.', 'Build a true statement.', 'Solve a four-operations story.'],
};
