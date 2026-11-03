// Shared helpers for the Year 5 Maths builders. Every builder receives its random source.
// Year 4's question constructors are reused unchanged; only what Year 5 needs is added.
import { shuffle, TITLES, int, pick, choice, order as order4, build, sort, sequence, column } from '../year4Math/kit.js';
import { fractionValue } from '../questionKinds.js';
export { shuffle, TITLES, int, pick, choice, build, sort, sequence, column };

/** Numbers of 5 digits or more carry commas (12,345); 4-digit numbers do not, as in Year 4. */
export const fmt = n => {
  const digits = String(Math.abs(n));
  return (n < 0 ? '−' : '') + (digits.length >= 5 ? digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : digits);
};
/** A decimal as a child writes it, from a count of thousandths: 2500 → 2.5, 305 → 0.305. */
export const thousandths = t => String(t / 1000);
export const hundredths = h => String(h / 100);
export const tenths = t => String(t / 10);
export const money = pence => `£${(pence / 100).toFixed(2)}`;

export const number = (prompt, answer, extra = {}) => ({ kind: 'number', prompt, answer, maxDigits: 7, ...extra });
/** A multiple-choice question whose options are numbers shown with fmt(). */
export const choiceN = (prompt, answer, wrong, rng, extra = {}) =>
  choice(prompt, fmt(answer), [...new Set(wrong)].filter(w => w !== answer).slice(0, 3).map(fmt), rng, extra);
/** Whole-number distractors: unique, never the answer, never negative unless allowed. */
export const others = (answer, values, { min = 0, count = 3 } = {}) =>
  [...new Set(values)].filter(v => Number.isFinite(v) && v !== answer && v >= min).slice(0, count);

/** The i-th of five equal bands of [low, high], so the five questions of a run never share a number. */
export const band = (r, i, low, high) => {
  const size = Math.max(1, Math.floor((high - low + 1) / 5));
  return int(r, low + i * size, low + (i + 1) * size - 1);
};

/**
 * Put entries in order. entries: [{ label, value }] (distinct values). Ascending by default.
 * A start order that already matches is rotated.
 */
export function orderBy(prompt, entries, rng, { descending = false, ...extra } = {}) {
  const sorted = [...entries].sort((a, b) => (descending ? b.value - a.value : a.value - b.value))
    .map((e, i) => ({ id: String(i), label: e.label, value: e.value }));
  let items = shuffle(sorted, rng);
  if (items.every((item, i) => item.id === sorted[i].id)) items = [...items.slice(1), items[0]];
  return { kind: 'order', prompt, items, answer: sorted.map(item => item.id), ...extra };
}
/** Ascending order of plain values. */
export const order = (prompt, values, rng, format = fmt, extra = {}) =>
  order4(prompt, values, rng, format, extra);

/** Build a decimal (or any digits-and-point answer) from character tiles, plus one spare digit. */
export function buildDecimal(prompt, text, rng, extra = {}) {
  const chars = [...text];
  const spare = String((Number(chars.find(c => c !== '.')) + 3) % 10);
  const tiles = shuffle([...chars, spare].map((label, k) => ({ id: String(k), label })), rng);
  // Never hand over tiles already in the answer's order.
  const joined = tiles.map(t => t.label).join('');
  const arranged = joined === text ? [...tiles.slice(1), tiles[0]] : tiles;
  return { kind: 'build', prompt, rule: 'One tile is spare.', tiles: arranged, answer: text, letters: true,
    maths: { kind: 'decimal', value: Number(text) }, ...extra };
}

export const NAMES = ['Sam', 'Priya', 'Leo', 'Amara', 'Finn', 'Zara', 'Mia', 'Omar'];
export const plural = (n, one, many = `${one}s`) => `${fmt(n)} ${n === 1 ? one : many}`;
export const gcd = (a, b) => (b ? gcd(b, a % b) : a);
export const lcm = (a, b) => (a / gcd(a, b)) * b;
export const isPrime = n => n > 1 && Array.from({ length: Math.floor(Math.sqrt(n)) - 1 }, (_, k) => k + 2).every(d => n % d);
export const factorsOf = n => Array.from({ length: n }, (_, k) => k + 1).filter(d => n % d === 0);
export const digitsOf = n => String(n).split('').map(Number);

/** Roman numerals for 1–3999. */
export function romanFull(n) {
  let result = '';
  for (const [value, symbol] of [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']]) {
    while (n >= value) { result += symbol; n -= value; }
  }
  return result;
}

const ONES = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
const TENS = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
/** British number words for 0–1,000,000 ("three hundred and forty-five thousand, six hundred and twenty-one"). */
export function words(n) {
  if (n === 1000000) return 'one million';
  const below100 = k => (k < 20 ? ONES[k] : TENS[Math.floor(k / 10)] + (k % 10 ? `-${ONES[k % 10]}` : ''));
  const below1000 = k => {
    const h = Math.floor(k / 100), rest = k % 100;
    return [h ? `${ONES[h]} hundred` : '', rest ? `${h ? 'and ' : ''}${below100(rest)}` : ''].filter(Boolean).join(' ');
  };
  if (n < 1000) return n === 0 ? 'zero' : below1000(n);
  const thousands = Math.floor(n / 1000), rest = n % 1000;
  const tail = rest === 0 ? '' : rest < 100 ? ` and ${below100(rest)}` : `, ${below1000(rest)}`;
  return `${below1000(thousands)} thousand${tail}`;
}

/** Fraction distractors with distinct values, none equal to the answer (the linter fails equal-value options). */
export function distinctFractions(answer, wrongs) {
  const seen = new Set([fractionValue(answer)]);
  return [...new Set(wrongs)].filter(w => { const v = fractionValue(w); if (v === null) return true; if (seen.has(v)) return false; seen.add(v); return true; });
}
