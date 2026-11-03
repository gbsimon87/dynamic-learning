import { build, choice, distinctFractions, gcd, int, number, orderBy, pick, shuffle, sort, NAMES } from '../kit.js';

const frac = (n, d) => `${n}/${d}`;
/** Any fraction as a mixed number in simplest form: 11/8 → "1 3/8", 8/4 → "2", 3/6 → "1/2". */
export const toMixed = (n, d) => {
  const w = Math.floor(n / d), rest = n % d;
  if (rest === 0) return String(w);
  const g = gcd(rest, d), part = frac(rest / g, d / g);
  return w ? `${w} ${part}` : part;
};
const NAME = r => pick(r, NAMES);
const FAMILIES = [[2, 4, 8], [3, 6, 12], [5, 10], [2, 4], [3, 6], [4, 8], [5, 10, 20], [2, 6]];

/** A proper fraction over d that is never 1/d or (d−1)/d only when asked. */
const properOver = (r, d) => int(r, 1, d - 1);

export const BUILDERS = {
  fcompare(l, r, i) {
    const [small, big] = (() => { const fam = pick(r, FAMILIES.filter(f => f.length >= 2)); return [fam[0], fam[1 + int(r, 0, fam.length - 2)]]; })();
    const pair = () => {
      for (let tries = 0; tries < 40; tries++) {
        const n1 = properOver(r, small), n2 = properOver(r, big);
        if (n1 / small !== n2 / big) return [[n1, small], [n2, big]];
      }
      return [[1, small], [big - 1, big]];
    };
    const [a, b] = pair(), va = a[0] / a[1], vb = b[0] / b[1];
    const [x, y] = pick(r, [true, false]) ? [a, b] : [b, a];
    const winner = va > vb ? a : b;
    if (l === 1) return choice(`Which fraction is greater: ${frac(...x)} or ${frac(...y)}?`, frac(...winner), [frac(...(winner === a ? b : a))], r,
      { visual: { type: 'bars', rows: [{ d: x[1], n: x[0] }, { d: y[1], n: y[0] }] }, rule: 'Bars of the same length, split in different ways, let you compare. Or change both to the same denominator.' });
    if (l === 2) return number(`To compare ${frac(...a)} and ${frac(...b)}, write ${frac(...a)} in ${big}ths. ${frac(...a)} = ?/${big}`, a[0] * big / small, { maxDigits: 2, hint: `${small} × ${big / small} = ${big}. Do the same to the numerator.` });
    if (l === 3) {
      const fam = pick(r, FAMILIES.filter(f => f.length >= 3)), vals = new Map();
      const every = shuffle(fam.flatMap(d => Array.from({ length: d - 1 }, (_, k) => [k + 1, d])), r);
      for (const [n, d] of every) if (vals.size < 4 && ![...vals.keys()].includes(n / d)) vals.set(n / d, frac(n, d));
      const entries = [...vals].map(([value, label]) => ({ value, label }));
      return orderBy(`Put these fractions in order, ${i % 2 ? 'largest' : 'smallest'} first.`, entries, r, { descending: i % 2 === 1, hint: 'Change them all to the same denominator first.' });
    }
    const [n1, n2] = [a, b], who = shuffle(NAMES, r).slice(0, 2), item = pick(r, ['pizza', 'pie', 'cake', 'bar of chocolate']);
    const more = va > vb ? 0 : 1, bigD = big;
    if (i % 2 === 0) return choice(`${who[0]} ate ${frac(...n1)} of a ${item}. ${who[1]} ate ${frac(...n2)} of an identical ${item}. Who ate more?`, who[more], [who[1 - more]], r);
    return number(`${who[0]} ate ${frac(...n1)} of a ${item}. ${who[1]} ate ${frac(...n2)} of an identical ${item}. How many ${bigD}ths more did the one who ate more have?`, Math.abs(n1[0] * bigD / n1[1] - n2[0] * bigD / n2[1]), { maxDigits: 2 });
  },
  equivalent(l, r, i) {
    const BASES = [[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 10], [3, 10], [7, 10], [9, 10], [2, 3], [1, 3]];
    const [n, d] = pick(r, BASES), ks = d === 10 ? [10, 5, 2] : [2, 3, 4, 5, 10, 5].filter(k => d * k <= 100), k = pick(r, ks);
    if (l === 1) {
      const kk = pick(r, ks.filter(x => x > 1)), D = d * kk, wrong = [frac(n * kk + 1, D), frac(n * kk, D + kk), frac(n + kk, d + kk), frac(n * kk, d * kk + 1)];
      return choice(`Which fraction is equivalent to ${frac(n, d)}?`, frac(n * kk, D), distinctFractions(frac(n * kk, D), wrong).slice(0, 3), r,
        { visual: { type: 'bars', rows: [{ d, n }] }, rule: 'Multiply the numerator and the denominator by the same number.' });
    }
    if (l === 2) {
      if (i % 2) return number(`Find the missing denominator: ${n}/${d} = ${n * k}/?`, d * k, { maxDigits: 3, hint: `The numerator was multiplied by ${k}. Do the same to the denominator.` });
      return number(`Find the missing numerator: ${n}/${d} = ?/${d * k}`, n * k, { maxDigits: 3, hint: `The denominator was multiplied by ${k}. Do the same to the numerator.` });
    }
    if (l === 3) {
      const [bn, bd] = pick(r, [[2, 5], [1, 2], [3, 4], [1, 5], [3, 10]]), same = shuffle([2, 3, 4, 5, 10], r).slice(0, 2).map(m => [bn * m, bd * m]);
      const diff = shuffle([[bn + 1, bd * 2], [bn * 2, bd * 3], [bn, bd + 2], [bn * 3, bd * 4 + 1]].filter(([a, b]) => a * bd !== bn * b), r).slice(0, 2);
      const bins = [`Equal to ${frac(bn, bd)}`, `Not equal to ${frac(bn, bd)}`];
      return sort(`Sort the fractions. Which are equal to ${frac(bn, bd)}?`, bins, shuffle([...same.map(f => [frac(...f), bins[0]]), ...diff.map(f => [frac(...f), bins[1]])], r));
    }
    const [thing, parts, who, verb] = [['strip of card', 'sections', 'Mia', 'colours'], ['garden', 'beds', 'Sam', 'plants'], ['window', 'panes', 'Ava', 'paints'], ['wall', 'tiles', 'Leo', 'paints'], ['cake', 'slices', 'Zara', 'ices']][i];
    return number(`Tom ${verb} ${n}/${d} of his ${thing}. ${who}'s ${thing} is the same size but has ${d * k} equal ${parts}. How many ${parts} must ${who} ${verb.replace(/s$/, '')} to match Tom?`, n * k, { maxDigits: 3, hint: `Find a fraction equal to ${n}/${d} with ${d * k} at the bottom.` });
  },
  mixed(l, r, i) {
    const d = [3, 4, 5, 6, 8][i], w = int(r, 1, 4), rn = int(r, 1, d - 1), top = w * d + rn;
    if (l === 1) {
      const answer = `${w} ${frac(rn, d)}`;
      const slips = [[w + 1, rn], [w, d - rn], [rn, w], [w, rn + 1], [w - 1, rn]].filter(([a, b]) => a >= 1 && b >= 1 && b < d && !(a === w && b === rn)).map(([a, b]) => `${a} ${frac(b, d)}`);
      return choice(`Write ${frac(top, d)} as a mixed number.`, answer, slips.slice(0, 3), r,
        { visual: { type: 'bars', rows: [{ d, n: top, bars: w + 1 }] }, rule: `${d} parts make 1 whole. Count the whole bars, then the parts left over.` });
    }
    if (l === 2) {
      return [
        () => number(`How many whole ones are in ${frac(top, d)}?`, w, { maxDigits: 2 }),
        () => number(`How many ${d}ths are in ${w} ${frac(rn, d)}?`, top, { maxDigits: 3, hint: `Each whole is ${d} ${d}ths. Multiply, then add the extra.` }),
        () => number(`${w} ${frac(rn, d)} = ?/${d}`, top, { maxDigits: 3 }),
        () => number(`${frac(top, d)} = ${w} and ?/${d}`, rn, { maxDigits: 2 }),
        () => number(`How many ${d}ths are there in ${w} whole${w === 1 ? '' : 's'}?`, w * d, { maxDigits: 3 }),
      ][i]();
    }
    if (l === 3) {
      const mk = (w2, d2) => { const n2 = w2 * d2 + int(r, 1, d2 - 1); return [n2, d2, n2 / d2]; };
      const used = new Set(), cards = [];
      for (let b = 1; b <= 3; b++) {
        for (let k = 0; k < 2; k++) {
          for (let tries = 0; tries < 30; tries++) {
            const d2 = pick(r, [2, 3, 4, 5, 6, 8]), [n2, , v] = mk(b, d2);
            if (used.has(v)) continue;
            used.add(v);
            cards.push([k === 0 ? frac(n2, d2) : toMixed(n2, d2), `Between ${b} and ${b + 1}`]);
            break;
          }
        }
      }
      const bins = [1, 2, 3].map(b => `Between ${b} and ${b + 1}`);
      return sort('Sort the numbers by where they are on a number line.', bins, shuffle(cards, r));
    }
    const dd = [4, 3, 5, 6, 8][i], extra = int(r, 1, dd - 1), whole = int(r, 2, 4), slices = whole * dd + extra;
    return number([
      `Each pizza is cut into ${dd} equal slices. The family eats ${slices} slices. How many whole pizzas does that make?`,
      `Each pizza is cut into ${dd} equal slices. The family eats ${slices} slices. How many slices are left over from the last pizza?`,
      `A tank is filled with cups of ${frac(1, dd)} litre. It takes ${slices} cups. How many whole litres is that?`,
      `How many whole ones can be made from ${frac(whole * dd + extra, dd)}?`,
      `Sam has ${whole} whole oranges and ${frac(extra, dd)} more. How many ${dd}ths is that altogether?`,
    ][i], [whole, extra, whole, whole, slices][i], { maxDigits: 3 });
  },
  fractionCalc(l, r, i) {
    const subtract = i % 2 === 1, d = [4, 5, 6, 8, 10][i], d2 = pick(r, [d * 2, d * 2, d * 3].filter(x => x <= 24));
    if (l === 1) {
      const a = subtract ? int(r, 2, d - 1) : int(r, 1, d - 2), b = int(r, 1, subtract ? a - 1 : d - a - 1), ans = subtract ? a - b : a + b;
      return choice(`${frac(a, d)} ${subtract ? '−' : '+'} ${frac(b, d)} = ?`, frac(ans, d), distinctFractions(frac(ans, d), [frac(subtract ? a + b : Math.abs(a - b) || 1, d), frac(ans, d + d), frac(ans + 1, d), frac(ans + 2, d)]).slice(0, 3), r,
        { rule: 'When the denominators are the same, add or subtract the numerators. The denominator stays the same.' });
    }
    if (l === 2) {
      if (i % 2 === 0) { const a = int(r, 2, d - 1), b = int(r, d - a + 1, d - 1); return number(`${frac(a, d)} + ${frac(b, d)} = ?/${d}`, a + b, { maxDigits: 2, hint: 'Add the numerators. The answer is more than 1 whole.' }); }
      const m = d2 / d, a = int(r, 1, d - 1), addIt = i === 3, b = int(r, 1, addIt ? d2 - 1 : a * m - 1), total = addIt ? a * m + b : a * m - b;
      return number(`${frac(a, d)} ${addIt ? '+' : '−'} ${frac(b, d2)} = ?/${d2}`, total, { maxDigits: 2, hint: `Write ${frac(a, d)} as ${d2}ths first: ${frac(a, d)} = ${frac(a * m, d2)}.` });
    }
    if (l === 3) {
      const m = d2 / d, a = int(r, 1, d - 1), add = i % 2 === 0, b = int(r, 1, add ? d2 - 1 : a * m - 1), tn = add ? a * m + b : a * m - b;
      return build('Build a true statement using all the tiles.', [frac(a, d), add ? '+' : '−', frac(b, d2), '=', frac(tn, d2)], r, { hint: `Change ${frac(a, d)} to ${d2}ths.` });
    }
    const who = NAME(r), top = int(r, d + 1, 2 * d - 1), a = int(r, 2, d - 1), b = int(r, d - a + 1, d - 1);
    return [
      () => choice(`${who} ran ${frac(a, d)} km, then ${frac(b, d)} km. How far did ${who} run altogether?`, `${toMixed(a + b, d)} km`, [`${frac(a + b, d * 2)} km`, `${toMixed(a + b + 1, d)} km`, `${toMixed(Math.abs(a - b), d)} km`].filter(x => x !== `${toMixed(a + b, d)} km`), r),
      () => number(`A jug holds ${frac(top, d)} litre of juice. ${who} pours out ${frac(top - a, d)} litre. How many ${d}ths of a litre are left?`, a, { maxDigits: 2 }),
      () => { const m = d2 / d, p = int(r, 1, d - 1), q = int(r, 1, d2 - 1), tot = p * m + q; return choice(`A rope is ${frac(p, d)} m long. Another rope is ${frac(q, d2)} m long. How long are they together?`, `${toMixed(tot, d2)} m`, [`${frac(p + q, d + d2)} m`, `${toMixed(tot + 1, d2)} m`, `${toMixed(Math.abs(p * m - q) || 1, d2)} m`].filter(x => x !== `${toMixed(tot, d2)} m`), r); },
      () => { const m = d2 / d, p = int(r, 2, d - 1), q = int(r, 1, p * m - 1); return number(`A tank is ${frac(p, d)} full. ${frac(q, d2)} of the tank is then used. How many ${d2}ths of the tank are left?`, p * m - q, { maxDigits: 2 }); },
      () => { const w = int(r, 1, 3); return number(`${who} walks ${frac(a, d)} km to school and ${frac(b, d)} km home again, ${w} time${w === 1 ? '' : 's'} in a day. How many ${d}ths of a km is that in total?`, (a + b) * w, { maxDigits: 3 }); },
    ][i]();
  },
  fractionMul(l, r, i) {
    const d = [3, 4, 5, 8, 10][i], n = int(r, 1, d - 1), k = int(r, 2, 7);
    if (l === 1) {
      const ans = frac(n * k, d), wrong = distinctFractions(ans, [frac(n * k, d * k), frac(n + k, d), frac(n, d * k), frac(n * k, d + k)]);
      return choice(`${k} × ${frac(n, d)} = ?`, ans, wrong.slice(0, 3), r, { visual: { type: 'bars', rows: [{ d, n: n * k, bars: Math.ceil(n * k / d) }] }, rule: 'Multiply the numerator by the whole number. The denominator stays the same.' });
    }
    if (l === 2) {
      return [
        () => number(`${k} × ${frac(n, d)} = ?/${d}`, n * k, { maxDigits: 3 }),
        () => { const w = int(r, 1, 3); return number(`${k} × ${w} ${frac(n, d)} = ?/${d}`, k * (w * d + n), { maxDigits: 3, hint: `First write ${w} ${frac(n, d)} as an improper fraction: ${frac(w * d + n, d)}.` }); },
        () => number(`${frac(n, d)} + ${frac(n, d)} + ${frac(n, d)} = 3 × ?/${d}`, n, { maxDigits: 2 }),
        () => number(`${k} × ${frac(n, d)} = ?/${d}`, n * k, { maxDigits: 3 }),
        () => { const w = int(r, 1, 2); return number(`${k} × ${w} ${frac(n, d)} = ?/${d}`, k * (w * d + n), { maxDigits: 3 }); },
      ][i]();
    }
    if (l === 3) return build('Build a true statement using all the tiles.', [String(k), '×', frac(n, d), '=', frac(n * k, d)], r, { hint: 'Multiply the numerator by the whole number.' });
    const who = NAME(r);
    return [
      () => choice(`Each glass holds ${frac(n, d)} litre. ${who} fills ${k} glasses. How many litres is that?`, `${toMixed(n * k, d)} litres`.replace(/^1 litres/, '1 litre'), [`${frac(n * k, d * k)} litres`, `${toMixed(n + k, d)} litres`, `${toMixed(n * k + 1, d)} litres`], r),
      () => number(`A recipe uses ${frac(n, d)} kg of flour for one loaf. ${who} bakes ${k} loaves. How many ${d}ths of a kg is that?`, n * k, { maxDigits: 3 }),
      () => choice(`A ribbon is ${frac(n, d)} m long. ${who} needs ${k} ribbons. How many metres of ribbon is that altogether?`, `${toMixed(n * k, d)} m`, [`${frac(n * k, d * k)} m`, `${toMixed(n * k + 1, d)} m`, `${toMixed(n + k, d)} m`], r),
      () => number(`A runner runs ${frac(n, d)} km each day for ${k} days. How many ${d}ths of a km does she run altogether?`, n * k, { maxDigits: 3 }),
      () => { const w = int(r, 1, 2); return number(`Each bottle holds ${w} ${frac(n, d)} litres. ${who} has ${k} bottles. How many ${d}ths of a litre is that altogether?`, k * (w * d + n), { maxDigits: 3 }); },
    ][i]();
  },
};

export const TOPIC_TITLES = {
  fcompare: ['Compare two fractions.', 'Change to the same denominator.', 'Put fractions in order.', 'Solve a sharing problem.'],
  equivalent: ['Find an equal fraction.', 'Find the missing number.', 'Sort equal fractions.', 'Match the same fraction.'],
  mixed: ['Turn an improper fraction into a mixed number.', 'Count wholes and parts.', 'Sort by whole numbers.', 'Solve a slices problem.'],
  fractionCalc: ['Add and subtract with the same denominator.', 'Change then add or subtract.', 'Build a fraction sum.', 'Solve a fractions story.'],
  fractionMul: ['Multiply a fraction by a whole number.', 'Multiply mixed numbers.', 'Build a fraction product.', 'Solve a repeated amounts story.'],
};
