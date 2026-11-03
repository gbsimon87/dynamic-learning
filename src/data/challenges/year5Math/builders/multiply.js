import { build, choice, choiceN, column, factorsOf, fmt, gcd, int, isPrime, number, others, pick, shuffle, sort, NAMES } from '../kit.js';

const COMPOSITES_N = [12, 16, 18, 20, 24, 28, 30, 32, 36, 40, 42, 45, 48, 54, 56, 60, 63, 72];
const TRICKY = [9, 15, 21, 25, 27, 33, 35, 39, 49, 51, 55, 57, 63, 65, 69, 77, 85, 87, 91, 93, 95];
const PRIMES_100 = Array.from({ length: 99 }, (_, k) => k + 2).filter(isPrime);
const SMALL_PRIMES = [2, 3, 5, 7, 11, 13, 17, 19];
const primesBetween = (lo, hi) => PRIMES_100.filter(p => p > lo && p < hi);
const smallestFactor = n => factorsOf(n)[1];
const NAME_PAIRS = NAMES;

/** Digits (most significant first) of a number with `len` digits, each digit in [lo, hi], first digit at least 1. */
const digitsBelow = (r, len, hi, firstHi = hi) => [int(r, 1, firstHi), ...Array.from({ length: len - 1 }, () => int(r, 0, hi))];
const toNumber = d => Number(d.join(''));

export const BUILDERS = {
  factors(l, r, i) {
    const n = pick(r, COMPOSITES_N), fs = factorsOf(n);
    if (l === 1) {
      const rule = 'A factor divides a number exactly. A multiple is in its times table.';
      if (i === 0) {
        const f = pick(r, fs.filter(x => x > 1 && x < n)), wrong = [f + 1, f - 1, f + 2, f - 2, f + 3, f + 4, f + 5, f + 6].filter(w => w > 1 && n % w !== 0);
        return choiceN(`Which of these is a factor of ${n}?`, f, wrong.slice(0, 3), r, { rule });
      }
      if (i === 1) {
        const m = int(r, 3, 9), k = int(r, 3, 9), wrong = [m * k + 1, m * k - 1, m * k + 2, m * k - 2, m * (k + 1) + 1].filter(w => w % m !== 0);
        return choiceN(`Which of these is a multiple of ${m}?`, m * k, wrong.slice(0, 3), r, { rule });
      }
      if (i === 2) {
        const f = fs.filter(x => x > 1 && x < n), notF = [fs[1] + 1, fs[1] + 2, fs[1] + 3, f[0] + 5, f[0] + 7].filter(w => w > 1 && n % w !== 0)[0];
        const three = shuffle(f, r).slice(0, 3);
        return choiceN(`Which of these is NOT a factor of ${n}?`, notF, three, r, { rule });
      }
      if (i === 3) {
        const a = pick(r, [12, 18, 24, 30, 36]), b = pick(r, [8, 10, 15, 16, 20, 27].filter(x => gcd(a, x) > 1));
        const common = factorsOf(gcd(a, b)).filter(x => x > 1), c = pick(r, common);
        const wrong = [...factorsOf(a), ...factorsOf(b)].filter(x => x > 1 && (a % x !== 0 || b % x !== 0));
        return choiceN(`Which of these is a common factor of ${a} and ${b}?`, c, shuffle([...new Set(wrong)], r).slice(0, 3), r, { rule: 'A common factor is a factor of both numbers.' });
      }
      const pairs = fs.filter(x => x * x <= n && x > 1 && x < n), f = pick(r, pairs.length ? pairs : [fs[1]]), g = n / f;
      const wrong = [`${f} and ${g + 1}`, `${f + 1} and ${g}`, `${f} and ${g - 1}`, `${f + 2} and ${g}`].filter(t => { const [x, y] = t.split(' and ').map(Number); return x * y !== n; });
      return choice(`Which pair of numbers multiplies to make ${n}?`, `${f} and ${g}`, wrong.slice(0, 3), r, { rule: 'A factor pair multiplies to make the number.' });
    }
    if (l === 2) {
      return [
        () => number(`How many factors does ${n} have?`, fs.length, { maxDigits: 2, hint: 'List the factor pairs, then count every number in them.' }),
        () => { const a = pick(r, [12, 18, 24, 30, 36, 48]), b = pick(r, [8, 9, 16, 20, 27, 40].filter(x => gcd(a, x) > 1)); return number(`How many factors do ${a} and ${b} have in common?`, factorsOf(gcd(a, b)).length, { maxDigits: 2, hint: `List the factors of ${a} and of ${b}. Which are in both lists?` }); },
        () => { const m = int(r, 6, 12), k = int(r, 6, 12); return number(`What is the ${k}th multiple of ${m}?`, m * k); },
        () => { const a = int(r, 3, 9), b = int(r, 6, 12); return number(`Complete the factor pair: ${a} × ? = ${a * b}`, b); },
        () => number(`What is the largest factor of ${n} that is smaller than ${n}?`, fs[fs.length - 2]),
      ][i]();
    }
    if (l === 3) {
      if (i % 2 === 0) {
        const f = shuffle(fs.filter(x => x > 1 && x < n), r).slice(0, 3), m = shuffle([2, 3, 4, 5, 6], r).slice(0, 3).map(k => n * k);
        return sort(`Sort these numbers: factors of ${n}, or multiples of ${n}?`, [`Factor of ${n}`, `Multiple of ${n}`],
          shuffle([...f.map(x => [String(x), `Factor of ${n}`]), ...m.map(x => [String(x), `Multiple of ${n}`])], r));
      }
      const [a, b] = [[12, 18], [8, 12], [18, 24], [20, 30], [16, 24]][(i - 1) / 2 + int(r, 0, 1) * 2], fa = factorsOf(a), fb = factorsOf(b);
      const both = fa.filter(x => fb.includes(x)), onlyA = fa.filter(x => !fb.includes(x)), onlyB = fb.filter(x => !fa.includes(x));
      const bins = [`Factor of ${a} only`, `Factor of ${b} only`, 'Factor of both'];
      return sort(`Sort these factors of ${a} and ${b}.`, bins, shuffle([
        ...shuffle(onlyA, r).slice(0, 2).map(x => [String(x), bins[0]]), ...shuffle(onlyB, r).slice(0, 2).map(x => [String(x), bins[1]]),
        ...shuffle(both, r).slice(0, 2).map(x => [String(x), bins[2]])], r));
    }
    const [big, m, mid] = shuffle([[36, 4, 12], [45, 5, 15], [28, 7, 14], [54, 6, 18], [63, 7, 21]], r)[0];
    return [
      () => { const c = pick(r, [24, 36, 48, 60]); return number(`Bix wants to put ${c} chairs in equal rows with none left over. How many different row lengths are possible? (A row of ${c} counts.)`, factorsOf(c).length, { maxDigits: 2 }); },
      () => { const c = pick(r, [24, 36, 48]); return number(`A baker packs ${c} buns into equal boxes with none left over. A box holds more than 1 bun and fewer than ${c}. How many different box sizes are possible?`, factorsOf(c).length - 2, { maxDigits: 2 }); },
      () => { const [a, b] = pick(r, [[18, 24], [12, 20], [30, 45], [16, 40], [24, 36]]); return number(`What is the biggest group size that shares both ${a} sweets and ${b} sweets equally with none left over?`, gcd(a, b)); },
      () => { const m7 = pick(r, [6, 7, 8, 9]), k = int(r, 6, 8); return number(`I am a multiple of ${m7} between ${m7 * (k - 1) + 1} and ${m7 * (k + 1) - 1}. What number am I?`, m7 * k); },
      () => number(`I am a factor of ${big} and a multiple of ${m}. I am bigger than ${m} and smaller than ${big}. What number am I?`, mid),
    ][i]();
  },
  primes(l, r, i) {
    const rule = 'A prime number has exactly 2 factors: 1 and itself. A composite number has more than 2.';
    if (l === 1) {
      if (i === 0) { const p = pick(r, SMALL_PRIMES.slice(1)); return choiceN('Which of these is a prime number?', p, shuffle([9, 15, 4, 8, 6, 10, 12, 14, 16, 18].filter(x => x !== p), r).slice(0, 3), r, { rule }); }
      if (i === 1) { const c = pick(r, [9, 15, 4, 6, 8, 10, 12, 14, 16]); return choiceN('Which of these is a composite number?', c, shuffle(SMALL_PRIMES.slice(1), r).slice(0, 3), r, { rule }); }
      if (i === 2) { const n = pick(r, [...SMALL_PRIMES.slice(1), 21, 25, 27, 33, 35]); return choice(`Is ${n} a prime number?`, isPrime(n) ? 'Yes' : 'No', [isPrime(n) ? 'No' : 'Yes'], r, { rule }); }
      if (i === 3) { const p = pick(r, [23, 29, 31, 37, 41, 43, 47]), pool = shuffle(TRICKY.filter(x => x > 20 && x < 52), r).slice(0, 3); return choiceN('Which of these is a prime number?', p, pool, r, { rule }); }
      const p = pick(r, SMALL_PRIMES.slice(0, 6)), next = SMALL_PRIMES[SMALL_PRIMES.indexOf(p) + 1];
      return choiceN(`What is the next prime number after ${p}?`, next, others(next, [p + 1, p + 2, p + 3, p + 4].filter(x => !isPrime(x) || x === next).concat([next + 2]).filter(x => x !== next && !isPrime(x))), r, { rule });
    }
    if (l === 2) {
      return [
        () => { const n = int(r, 20, 60), p = PRIMES_100.find(x => x > n); return number(`What is the smallest prime number greater than ${n}?`, p, { maxDigits: 3 }); },
        () => { const p = pick(r, [5, 7, 11, 13]), q = pick(r, [2, 3]), n = p * q * pick(r, [1, 2]); const pf = factorsOf(n).filter(isPrime); return number(`What is the largest prime factor of ${n}?`, Math.max(...pf), { maxDigits: 2 }); },
        () => { const lo = pick(r, [10, 20, 30, 40]), hi = lo + 20; return number(`How many prime numbers are there between ${lo} and ${hi}?`, primesBetween(lo, hi).length, { maxDigits: 2, hint: 'Check each number. Prime numbers have only 2 factors.' }); },
        () => { const p = pick(r, [3, 5, 7]), x = pick(r, [2, 4]), y = pick(r, [3, 5].filter(v => v !== p && gcd(v, x) === 1)); return number(`Which prime number is a factor of both ${p * x} and ${p * y}?`, p, { maxDigits: 2 }); },
        () => { const n = int(r, 61, 90), p = PRIMES_100.find(x => x > n); return number(`What is the smallest prime number greater than ${n}?`, p, { maxDigits: 3 }); },
      ][i]();
    }
    if (l === 3) {
      const primes = shuffle(PRIMES_100.filter(x => x > 20), r).slice(0, 3), comps = shuffle(TRICKY, r).slice(0, 3);
      return sort('Sort the numbers. Are they prime or composite?', ['Prime', 'Composite'],
        shuffle([...primes.map(p => [String(p), 'Prime']), ...comps.map(c => [String(c), 'Composite'])], r), { rule });
    }
    return [
      () => { const p = pick(r, PRIMES_100.filter(x => x > 25 && x < 95)), pi = PRIMES_100.indexOf(p), lo = PRIMES_100[pi - 1] + int(r, 0, 2), hi = PRIMES_100[pi + 1] - int(r, 0, 2); return number(`I am the only prime number between ${lo} and ${hi}. What number am I?`, p, { maxDigits: 3 }); },
      () => { const n = pick(r, [31, 41, 51, 61, 71, 81]), nxt = Array.from({ length: 40 }, (_, k) => n + k).find(x => x % 2 === 1 && !isPrime(x) && x > n + 1) ?? 9; return number(`What is the smallest odd composite number greater than ${n}?`, nxt, { maxDigits: 3 }); },
      () => { const [p, q] = pick(r, [[3, 7], [5, 7], [2, 11], [3, 11], [5, 11], [2, 13], [7, 13], [3, 13]]); return number(`Two different prime numbers multiply to make ${p * q}. What is their sum?`, p + q, { maxDigits: 3, hint: `Which prime numbers are factors of ${p * q}?` }); },
      () => { const lo = pick(r, [50, 60, 70, 80]), hi = lo + 20; return number(`How many prime numbers are there between ${lo} and ${hi}?`, primesBetween(lo, hi).length, { maxDigits: 2 }); },
      () => { const c = pick(r, TRICKY.filter(x => x > 20)), name = pick(r, NAME_PAIRS); return number(`${name} thinks ${c} is prime. What is the smallest number bigger than 1 that divides ${c} exactly?`, smallestFactor(c), { maxDigits: 2 }); },
    ][i]();
  },
  written(l, r, i) {
    if (l === 1) {
      const b = [2, 2, 3, 3, 4][i], d = digitsBelow(r, 4, Math.floor(9 / b)), a = toNumber(d);
      return number('Multiply using the written layout.', a * b, { visual: column(a, b, '×'), rule: 'Multiply the ones first, then the tens, then the hundreds, then the thousands. Write each answer in its column.' });
    }
    if (l === 2) {
      const b = int(r, 3, 9), d = [int(r, 1, Math.min(9, Math.floor(99999 / b / 1000))), int(r, 0, 9), int(r, 0, 9), int(r, Math.ceil(10 / b), 9)], a = toNumber(d);
      return number('Multiply. Exchange when a column makes 10 or more.', a * b, { visual: column(a, b, '×'), hint: 'Write the tens digit of each answer above the next column and add it on.' });
    }
    const b = int(r, 2, 9), d = digitsBelow(r, 4, 9, 9), a = toNumber(d);
    if (l === 3) {
      const parts = d.map((x, k) => x * 10 ** (3 - k) * b).filter(Boolean).map(String);
      return build('Split into thousands, hundreds, tens and ones. Multiply each part, then add.', [...parts.flatMap((v, k) => (k ? ['+', v] : [v])), '=', String(a * b)], r,
        { equation: `${fmt(a)} × ${b}` });
    }
    const [groups, things] = pick(r, [['school teams', 'tokens'], ['classes', 'stickers'], ['farms', 'eggs'], ['shops', 'pencils'], ['boats', 'litres of fuel']]);
    return number(`${b} ${groups} each have ${fmt(a)} ${things}. How many ${things} altogether?`, a * b, { visual: column(a, b, '×'), hint: 'Use the written layout: ones first, then tens, hundreds and thousands.' });
  },
  long(l, r, i) {
    if (l === 1) {
      const b = 10 + int(r, 1, 9), a = int(r, 12, 29);
      return number(`Work out ${a} × ${b} with long multiplication.`, a * b, { visual: column(a, b, '×'),
        rule: `Multiply by the ones, then by the tens, then add. ${a} × ${b % 10} and ${a} × 10.`, hint: `Do ${a} × ${b % 10}, then ${a} × 10, then add the two answers.` });
    }
    if (l === 2) {
      const a = int(r, 21, 99), b = int(r, 21, 99);
      return number(`Work out ${a} × ${b} with long multiplication.`, a * b, { visual: column(a, b, '×'), hint: `Multiply by the ones first, then by the tens. Add the two answers.` });
    }
    if (l === 3) {
      const a = int(r, 120, 499), b = int(r, 21, 49), t = Math.floor(b / 10) * 10, o = b % 10;
      return build(`Build the long multiplication of ${a} × ${b}: multiply by ${t}, multiply by ${o}, then add.`, [String(a * t), '+', String(a * o), '=', String(a * b)], r,
        { equation: `${a} × ${b} = (${a} × ${t}) + (${a} × ${o})` });
    }
    const a = int(r, 120, 480), b = int(r, 21, 48);
    return number([
      `A coach carries ${a} litres of juice each trip. It makes ${b} trips. How many litres altogether?`,
      `A farmer packs ${a} eggs in each crate. There are ${b} crates. How many eggs altogether?`,
      `A factory makes ${a} toys each day. How many toys does it make in ${b} days?`,
      `A stadium has ${b} blocks with ${a} seats in each. How many seats altogether?`,
      `A school buys ${b} boxes with ${a} pencils in each. How many pencils altogether?`,
    ][i], a * b, { visual: column(a, b, '×'), hint: 'Use long multiplication: ones, then tens, then add.' });
  },
  mentalMul(l, r, i) {
    const a = int(r, 3, 9), b = int(r, 3, 9);
    if (l === 1) {
      const fact = a * b, tenFold = pick(r, [10, 100]);
      return [
        () => choiceN(`${a} × ${b} = ${fact}. So ${a * 10} × ${b * 10} = ?`, fact * 100, [fact * 10, fact * 1000, fact + 100], r, { rule: 'Use the fact you know, then make the answer bigger by the same powers of 10.' }),
        () => choiceN(`${a} × ${b} = ${fact}. So ${fact * 10} ÷ ${a} = ?`, b * 10, [b, b * 100, b + 10], r, { rule: 'Use the fact you know, then make the answer bigger by the same powers of 10.' }),
        () => choiceN(`${a} × ${b} = ${fact}. So ${a} × ${b * 100} = ?`, fact * 100, [fact * 10, fact * 1000, fact + 100], r, { rule: 'Use the fact you know, then make the answer bigger by the same powers of 10.' }),
        () => choiceN(`${fact} ÷ ${a} = ${b}. So ${fact * tenFold} ÷ ${a} = ?`, b * tenFold, [b * tenFold * 10, b * tenFold / 10, b + tenFold], r, { rule: 'Use the fact you know, then make the answer bigger by the same powers of 10.' }),
        () => choiceN(`${a} × ${b} = ${fact}. So ${a * 10} × ${b} = ?`, fact * 10, [fact, fact * 100, fact + 10], r, { rule: 'Use the fact you know, then make the answer bigger by the same powers of 10.' }),
      ][i]();
    }
    if (l === 2) {
      return [
        () => number(`${a} × ${b * 100} = ?`, a * b * 100),
        () => number(`${a * b * 100} ÷ ${a} = ?`, b * 100),
        () => number(`${a * 10} × ${b * 10} = ?`, a * b * 100),
        () => { const x = pick(r, [15, 25, 35, 45]), y = pick(r, [2, 4, 6, 8]); return number(`${x} × ${y} = ?`, x * y, { hint: `Try halving one number and doubling the other.` }); },
        () => { const k = pick(r, [4, 6, 8, 12]); return number(`${a * b * k * 10} ÷ ${k} = ?`, a * b * 10, { hint: `${a * b * k} ÷ ${k} = ${a * b}, then ×10.` }); },
      ][i]();
    }
    if (l === 3) {
      const x = pick(r, [4, 6, 8, 9]), y = pick(r, [15, 25, 35, 45, 12, 14]), f = x === 4 ? [2, 2] : x === 6 ? [2, 3] : x === 8 ? [2, 4] : [3, 3];
      const labels = [String(x), '×', String(y), '=', String(f[0]), '×', String(f[1]), '×', String(y)];
      return build(`Build a true statement. Split ${x} into two factors.`, labels, r, { maths: { kind: 'equation' }, equation: `${x} × ${y} = ? × ? × ${y}`, hint: `${x} = ${f[0]} × ${f[1]}` });
    }
    return number([
      `Each box holds ${a * 10} pencils. How many pencils are in ${b} boxes?`,
      `A school has ${a * b * 10} sheets of paper to share equally between ${a} classes. How many sheets does each class get?`,
      `A pack has ${a * 10} stickers. How many stickers are in ${b * 10} packs?`,
      `A farmer has ${a * b * 100} eggs. She puts ${b} in each box. How many boxes does she need?`,
      `A ribbon is ${b * 100} cm long. How many cm of ribbon is there in ${a} ribbons?`,
    ][i], [a * 10 * b, b * 10, a * b * 100, a * 100, a * b * 100][i]);
  },
};

export const TOPIC_TITLES = {
  factors: ['Spot factors and multiples.', 'Count and complete factors.', 'Sort factors and multiples.', 'Solve a factor puzzle.'],
  primes: ['Spot prime numbers.', 'Find and count primes.', 'Sort prime and composite.', 'Solve a prime puzzle.'],
  written: ['Multiply without exchanging.', 'Multiply with exchanges.', 'Split into place values.', 'Solve a multiplying story.'],
  long: ['Multiply by 11 to 19.', 'Long multiplication.', 'Build long multiplication.', 'Solve a long multiplication story.'],
  mentalMul: ['Use a known fact.', 'Multiply and divide in your head.', 'Split a factor.', 'Solve a quick-fact story.'],
};
