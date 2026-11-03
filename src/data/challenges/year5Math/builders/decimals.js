import { buildDecimal, choice, distinctFractions, int, number, orderBy, pick, shuffle, sort, NAMES } from '../kit.js';

// Decimals are held as whole counts of thousandths, so no arithmetic is ever done on floats.
const show = t => String(t / 1000);
const frac = (n, d) => `${n}/${d}`;
const NAME = r => pick(r, NAMES);
const dpOf = t => (t % 1000 === 0 ? 0 : t % 100 === 0 ? 1 : t % 10 === 0 ? 2 : 3);
/** The slip of lining digits up from the right and ignoring the decimal point. */
function slip(a, b, subtract) {
  const A = show(a).replace('.', ''), B = show(b).replace('.', ''), dp = Math.max(dpOf(a), dpOf(b));
  const raw = subtract ? Math.abs(Number(A) - Number(B)) : Number(A) + Number(B);
  return String(dp ? raw / 10 ** dp : raw);
}
/** Unique decimal strings from thousandths counts: whole counts above zero, never the answer. */
const wrongs = (answerT, ts) => [...new Set(ts.filter(t => Number.isInteger(t) && t > 0 && t !== answerT).map(show))];
/** H hundredths with a non-zero hundredths digit, so the number really has two decimal places. */
const twoDp = (r, lo, hi) => { const h = int(r, lo, hi); return h % 10 === 0 ? h + int(r, 1, 9) : h; };
const roundWhole = H => Math.floor(H / 100) + (H % 100 >= 50 ? 1 : 0);
const roundTenth = H => Math.floor(H / 10) + (H % 10 >= 5 ? 1 : 0);
const tenth = r => int(r, 1, 9) * 100;
const hundredth = r => int(r, 1, 9) * 100 + int(r, 1, 9) * 10;

/** The calculation behind decimalCalc levels 2 and 3: [thousandths a, thousandths b, subtract?]. */
function pairFor(r, i) {
  return [
    () => [int(r, 2, 9) * 1000 + tenth(r), int(r, 1, 5) * 1000 + hundredth(r), false],
    () => [int(r, 6, 9) * 1000 + tenth(r), int(r, 1, 4) * 1000 + hundredth(r), true],
    () => { const a = hundredth(r); return [a, 1000 - a, false, 'complement']; },
    () => [int(r, 7, 9) * 1000, int(r, 1, 5) * 1000 + hundredth(r), true],
    () => [1000 + hundredth(r), tenth(r), false],
  ][i]();
}

export const BUILDERS = {
  decimalFractions(l, r, i) {
    const dp = [1, 2, 2, 3, 3][i], D = 10 ** dp;
    let n = i === 2 ? int(r, 1, 9) : int(r, D / 10 + 1, D - 1);
    while (n % 10 === 0) n += 1;
    const text = String(n / D);
    if (l === 1) {
      const answer = frac(n, D), reversed = Number(String(n).split('').reverse().join(''));
      const wrong = distinctFractions(answer, [frac(n, D * 10), frac(n, D > 10 ? D / 10 : D * 100), frac(reversed, D), frac(n + 1, D), frac(n * 10, D)]).slice(0, 3);
      return choice(`Write ${text} as a fraction.`, answer, wrong, r,
        { visual: { type: 'decimalPlace', digits: [0, ...String(n).padStart(dp, '0').split('').map(Number)] },
          rule: 'The last digit is in the tenths, hundredths or thousandths place. That tells you the denominator.' });
    }
    if (l === 2) {
      return [
        () => { const t = int(r, 101, 999); return number(`How many thousandths are in ${show(t)}?`, t, { maxDigits: 3 }); },
        () => { const t = int(r, 101, 999); return number(`${show(t)} = ?/1000`, t, { maxDigits: 3 }); },
        () => { const h = int(r, 11, 99); return number(`${show(h * 10)} = ?/100`, h, { maxDigits: 3 }); },
        () => { const te = int(r, 1, 9); return number(`How many hundredths are in ${show(te * 100)}?`, te * 10, { maxDigits: 3 }); },
        () => { const h = int(r, 1, 9); return number(`${show(h * 10)} = ?/100`, h, { maxDigits: 3 }); },
      ][i]();
    }
    if (l === 3) {
      const pool = {
        Tenths: ['0.3', '0.9', '3/10', '0.7', '1/10', '0.2'],
        Hundredths: ['0.45', '0.07', '0.81', '23/100', '0.19', '0.64', '9/100'],
        Thousandths: ['0.123', '0.007', '0.605', '9/1000', '0.256', '0.041', '17/1000'],
      };
      const bins = Object.keys(pool);
      return sort('Sort the numbers. What is the smallest place each one needs?', bins,
        shuffle(bins.flatMap(bin => shuffle(pool[bin], r).slice(0, 2).map(label => [label, bin])), r),
        { rule: '0.45 needs hundredths because its last digit is in the hundredths place.' });
    }
    return [
      () => { const t = int(r, 101, 999); return number(`A pencil is ${show(t)} metres long. How many thousandths of a metre is that?`, t, { maxDigits: 3 }); },
      () => { const h = int(r, 101, 999); return number(`A ribbon is ${show(h * 10)} metres long. How many hundredths of a metre is that altogether?`, h, { maxDigits: 3 }); },
      () => { const te = int(r, 11, 99); return number(`A tank holds ${show(te * 100)} litres. How many tenths of a litre is that altogether?`, te, { maxDigits: 3 }); },
      () => { const a = int(r, 1, 9), b = int(r, 1, 9), c = int(r, 1, 9); return number(`Bix adds ${a} tenths, ${b} hundredths and ${c} thousandths. How many thousandths is that altogether?`, a * 100 + b * 10 + c, { maxDigits: 3 }); },
      () => { const h = int(r, 1001, 1999); return number(`A runner's time is ${show(h * 10)} seconds. How many hundredths of a second is that altogether?`, h, { maxDigits: 4 }); },
    ][i]();
  },
  decimalOrder(l, r, i) {
    if (l === 1) {
      const H = twoDp(r, 101, 989), text = String(H / 100), floorW = Math.floor(H / 100), up = H % 100 >= 50;
      if (i < 2) {
        const answer = String(roundWhole(H));
        const wrong = [String(up ? floorW : floorW + 1), String(roundTenth(H) / 10), String(Math.floor(H / 10) / 10)];
        return choice(`Round ${text} to the nearest whole number.`, answer, [...new Set(wrong)].filter(x => x !== answer).slice(0, 3), r,
          { rule: 'Look at the tenths digit. 5 or more rounds up. 4 or less rounds down.' });
      }
      const answer = String(roundTenth(H) / 10), upTenth = H % 10 >= 5;
      const wrong = [String((roundTenth(H) + (upTenth ? -1 : 1)) / 10), String(roundWhole(H)), String(Math.floor(H / 10) / 10), String((roundTenth(H) + 1) / 10)];
      return choice(`Round ${text} to 1 decimal place.`, answer, [...new Set(wrong)].filter(x => x !== answer).slice(0, 3), r,
        { rule: 'Look at the hundredths digit. 5 or more rounds up. 4 or less rounds down.' });
    }
    if (l === 2) {
      const a = int(r, 1, 9), b = int(r, 1, 9), w = int(r, 1, 6), c = int(r, 1, 9);
      const ab = a * 10 + b, cc = c === ab ? c % 9 + 1 : c, bb = b === a ? b % 9 + 1 : b;
      const [P, Q] = [
        () => [ab * 10, cc * 100],
        () => [a * 100 + b * 10, a * 100 + b],
        () => [w * 1000 + a * 100 + bb * 10, w * 1000 + bb * 100 + a * 10],
        () => [ab, ab * 10],
        () => [w * 1000 + a * 10, w * 1000 + a * 100],
      ][i]();
      const [x, y] = P === Q ? [P, Q + 100] : [P, Q];
      const [p, q] = pick(r, [true, false]) ? [x, y] : [y, x];
      return choice(`Which sign makes the statement true?  ${show(p)} ___ ${show(q)}`, p > q ? '>' : '<', [p > q ? '<' : '>'], r, { hint: 'Write both numbers with the same number of decimal places.' });
    }
    if (l === 3) {
      const digits = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9], r).slice(0, 3), w = int(r, 0, 4) * 1000;
      const [x, y, z] = digits, vals = [x * 100 + y * 10 + z, x * 100 + z * 10 + y, y * 100 + x * 10 + z, x * 100 + y * 10].map(t => w + t);
      return orderBy(`Put these decimals in order, ${i % 2 ? 'largest' : 'smallest'} first.`, vals.map(t => ({ value: t, label: show(t) })), r,
        { descending: i % 2 === 1, hint: 'Compare the tenths first, then the hundredths, then the thousandths.' });
    }
    const who = shuffle(NAMES, r).slice(0, 4);
    return [
      () => { const H = twoDp(r, 101, 989); return number(`A scarf costs £${show(H * 10)}. Round the price to the nearest pound.`, roundWhole(H)); },
      () => { const H = twoDp(r, 1011, 1989), t = roundTenth(H); return choice(`${NAME(r)} ran in ${show(H * 10)} seconds. What is this time to 1 decimal place?`, String(t / 10), [String((t + 1) / 10), String((t - 1) / 10), String(roundWhole(H))], r); },
      () => { const v = shuffle([4050, 4500, 4150, 4480, 4400, 4700], r).slice(0, 4), best = who[v.indexOf(Math.max(...v))]; return choice(`Four jumpers jumped ${v.map(show).join(' m, ')} m. Who jumped furthest?`, best, who.filter(x => x !== best), r, { hint: 'Compare the whole numbers, then the tenths, then the hundredths.' }); },
      () => { const v = shuffle([12050, 12500, 12150, 12480, 12400, 12700], r).slice(0, 4), best = who[v.indexOf(Math.min(...v))]; return choice(`Four runners took ${v.map(show).join(' s, ')} s. Who was fastest (the smallest time)?`, best, who.filter(x => x !== best), r); },
      () => { const v = shuffle([450, 600, 55, 510, 500, 495, 505, 49], r).slice(0, 5); return number(`How many of these numbers are greater than 0.5?  ${v.map(show).join(',  ')}`, v.filter(t => t > 500).length, { maxDigits: 1 }); },
    ][i]();
  },
  decimalCalc(l, r, i) {
    if (l === 1) {
      const a = tenth(r), b = int(r, 1, 9 - a / 100) * 100, h = hundredth(r), w = int(r, 2, 9);
      const [text, answer, ws] = [
        () => [`${show(a)} + ${show(b)} = ?`, a + b, [(a + b) / 10, (a + b) * 10, a + b + 100, a + b - 100]],
        () => [`1 − ${show(a)} = ?`, 1000 - a, [a, 1000 - a + 100, 1000 - a - 100, (1000 - a) / 10]],
        () => [`${show(h)} + ? = 1`, 1000 - h, [1000 - h + 100, 1000 - h + 10, 1000 - h - 10, 1000 - h - 100]],
        () => [`${w} + ${show(a)} = ?`, w * 1000 + a, [w * 1000 + a / 10, w * 1000 + a + 100, w * 1000 + a - 100, w * 1000 + a + 1000]],
        () => { const x = int(r, 1, 4) * 100, y = int(r, 1, 4) * 100 + 50; return [`${show(x)} + ${show(y)} = ?`, x + y, [Number(slip(x, y, false)) * 10, x + y + 100, x + y - 100, x + y + 10]]; },
      ][i]();
      return choice(text, show(answer), wrongs(answer, ws).slice(0, 3), r, { rule: 'Line up the decimal points. Add or subtract the digits in the same places.' });
    }
    const [x, y, sub, kind] = pairFor(r, i), complement = kind === 'complement', answer = complement ? y : sub ? x - y : x + y;
    if (l === 2) {
      const text = complement ? `${show(x)} + ? = 1` : `${show(x)} ${sub ? '−' : '+'} ${show(y)} = ?`;
      const near = wrongs(answer, [answer + 100, answer - 100, answer + 10, answer - 10]);
      const options = complement ? near : [...new Set([slip(x, y, sub), ...near])].filter(t => t !== show(answer));
      return choice(text, show(answer), options.slice(0, 3), r, { hint: 'Line up the decimal points before you add or subtract.' });
    }
    if (l === 3) {
      return buildDecimal(complement ? `What must be added to ${show(x)} to make 1? Build the answer.` : `Work out ${show(x)} ${sub ? '−' : '+'} ${show(y)}. Build the answer.`, show(answer), r,
        { hint: 'Line up the decimal points, then add or subtract.' });
    }
    const a = int(r, 1, 3) * 1000 + hundredth(r), b = tenth(r), c = int(r, 2, 4) * 1000 + int(r, 1, 9) * 100, d = hundredth(r) + 1000;
    return [
      () => number(`A jug holds ${show(a)} litres. ${show(b)} litres are poured out. How many millilitres are left?`, a - b),
      () => number(`A pen costs £${(a / 1000).toFixed(2)}. A book costs £${(c / 1000).toFixed(2)}. How many pence do they cost altogether?`, (a + c) / 10),
      () => number(`One rope is ${show(c)} m long. Another is ${show(d)} m long. How many centimetres long are they together?`, (c + d) / 10),
      () => number(`A runner ran ${show(c)} km, then ${show(d)} km. How many metres did she run altogether?`, c + d),
      () => number(`A parcel weighs ${show(d)} kg. Another weighs ${show(b)} kg. How many grams do they weigh altogether?`, d + b),
    ][i]();
  },
  percent(l, r, i) {
    const NEW = [[25, 50, 75], [10, 30, 70], [20, 40, 80], [50, 60, 90], [25, 10, 20]][i];
    if (l === 1) {
      const n = [() => int(r, 1, 9) * 10, () => pick(r, [25, 50, 75]), () => int(r, 11, 89), () => int(r, 11, 89), () => int(r, 11, 89)][i](), cut = [100 - n, n + 10 > 99 ? n - 10 : n + 10, n - 10 < 1 ? n + 20 : n - 10];
      const ws = [...new Set(cut)].filter(x => x !== n && x > 0 && x < 100).slice(0, 3).map(x => `${x}%`);
      return choice('What percentage of the grid is shaded?', `${n}%`, ws, r, { visual: { type: 'hundredGrid', n }, rule: 'Per cent means out of 100. This grid has 100 squares, so each square is 1%.' });
    }
    if (l === 2) {
      return [
        () => { const n = int(r, 11, 89); return number(`${n}% = ?/100`, n, { maxDigits: 3, hint: 'Per cent means out of 100.' }); },
        () => { const t = int(r, 1, 9); return number(`${t}/10 = ?%`, t * 10, { maxDigits: 3, hint: `${t}/10 = ${t * 10}/100.` }); },
        () => { const k = pick(r, [1, 3]); return number(`${k}/4 = ?%`, k * 25, { maxDigits: 3 }); },
        () => { const k = int(r, 1, 4); return number(`${k}/5 = ?%`, k * 20, { maxDigits: 3 }); },
        () => { const h = int(r, 11, 89); return number(`${show(h * 10)} = ?%`, h, { maxDigits: 3 }); },
      ][i]();
    }
    if (l === 3) {
      const FORMS = { 10: ['1/10', '0.1'], 20: ['1/5', '0.2'], 25: ['1/4', '0.25'], 30: ['3/10', '0.3'], 40: ['2/5', '0.4'], 50: ['1/2', '0.5'], 60: ['3/5', '0.6'], 70: ['7/10', '0.7'], 75: ['3/4', '0.75'], 80: ['4/5', '0.8'], 90: ['9/10', '0.9'] };
      const bins = NEW.map(p => `${p}%`);
      return sort('Match each fraction or decimal to its percentage.', bins, shuffle(NEW.flatMap(p => FORMS[p].map(label => [label, `${p}%`])), r));
    }
    const [pc, den] = [[50, 2], [25, 4], [10, 10], [20, 5], [75, 4]][i], amount = den * int(r, 6, 25), what = ['pupils in a class', 'sweets in a bag', 'stickers in a pack', 'books on a shelf', 'seats in a hall'][i];
    const share = ['walk to school', 'are red', 'are shiny', 'are about animals', 'are taken'][i];
    const hint = ['50% is the same as 1/2.', '25% is the same as 1/4.', '10% is the same as 1/10.', '20% is the same as 1/5.', '75% is the same as 3/4.'][i];
    return number(`There are ${amount} ${what}. ${pc}% of them ${share}. How many is that?`, amount * pc / 100, { hint });
  },
};

export const TOPIC_TITLES = {
  decimalFractions: ['Write a decimal as a fraction.', 'Count the tenths, hundredths and thousandths.', 'Sort by the smallest place.', 'Solve a measures problem.'],
  decimalOrder: ['Round a decimal.', 'Choose the right sign.', 'Put decimals in order.', 'Round and compare in stories.'],
  decimalCalc: ['Add and subtract decimals.', 'Line up the decimal points.', 'Build the answer.', 'Solve a measures problem.'],
  percent: ['Read a percentage.', 'Percentages, fractions and decimals.', 'Match equal amounts.', 'Find a percentage of an amount.'],
};
