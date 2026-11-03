import { band, build, choice, choiceN, fmt, int, number, orderBy, others, pick, romanFull, shuffle, sort, sequence, words, NAMES } from '../kit.js';

const PLACE_NAMES = ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands'];
const TOWNS = ['Ashby', 'Brookfield', 'Carlton', 'Dunmore', 'Elmwood', 'Fairford'];
const minus = fmt;

/** `len` different digits, most significant first, never starting with 0 (so every digit names one place). */
function distinctDigits(r, len) {
  const d = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], r).slice(0, len);
  if (d[0] === 0) [d[0], d[1]] = [d[1], d[0]];
  return d;
}
const fromDigits = d => Number(d.join(''));
/** The first index at or after k (wrapping) whose digit is not 0, so "the value of the digit" is never 0. */
const nonzeroAt = (d, k) => { let at = k % d.length; while (d[at] === 0) at = (at + 1) % d.length; return at; };
/** A 6-digit number, any digits (zeros allowed). */
const anySix = r => fromDigits([int(r, 1, 9), ...Array.from({ length: 5 }, () => int(r, 0, 9))]);
/** `count` different numbers from make(). Bounded, so any random source terminates. */
function distinctNumbers(r, count, make) {
  const out = new Set();
  for (let tries = 0; out.size < count && tries < 200; tries++) out.add(make());
  for (let k = 1; out.size < count; k++) out.add([...out][0] + k * 7);
  return [...out];
}
const roundTo = (n, unit) => Math.round(n / unit) * unit;
/** Nudge a number off an exact halfway point, so rounding is never in doubt. */
const clear = (n, unit) => (n % unit === unit / 2 ? n + 1 : n);

const SEQ_STEPS = [10, 100, 1000, 10000, 100000];
const DECIMAL_SEQS = [[0.1, 'Add 0.1'], [0.2, 'Add 0.2'], [0.5, 'Add 0.5'], [0.25, 'Add 0.25']];
const mixed = (whole, num, den) => {
  const g = (a, b) => (b ? g(b, a % b) : a), d = g(num, den) || 1, n = num / d, dd = den / d;
  if (n === 0) return String(whole);
  return whole ? `${whole} ${n}/${dd}` : `${n}/${dd}`;
};

/** Year 5 Maths builders: (level, rng, index) => one question. */
export const BUILDERS = {
  place(l, r, i) {
    const d = distinctDigits(r, 6), n = fromDigits(d), visual = { type: 'place', digits: d };
    let k = (i * 2 + int(r, 0, 1)) % 6;
    while (d[k] === 0) k = (k + 1) % 6;
    const p = 5 - k, value = d[k] * 10 ** p;
    if (l === 1) {
      const wrong = [0, 1, 2, 3, 4, 5].filter(q => q !== p).map(q => d[k] * 10 ** q);
      return choiceN(`What is the value of the **${d[k]}** in ${fmt(n)}?`, value, shuffle(wrong, r).slice(0, 3), r,
        { visual, rule: 'Each place is worth 10 times the place to its right.' });
    }
    if (l === 2) {
      if (i < 3) return number(`Which digit is in the ${PLACE_NAMES[p]} place of ${fmt(n)}?`, d[k], { visual, maxDigits: 1 });
      const m = anySix(r);
      return number(`Write this number in digits: ${words(m)}.`, m, { hint: 'Write each part, and use 0 for a place with nothing in it.' });
    }
    if (l === 3) {
      const raw = anySix(r), m = String(raw).replace(/0/g, '').length < 2 ? raw + 1 : raw, parts = String(m).split('').map((c, q) => Number(c) * 10 ** (5 - q)).filter(Boolean);
      return build(`Build ${fmt(m)} as a sum of its place values.`, parts.flatMap((v, q) => (q ? ['+', String(v)] : [String(v)])), r,
        { maths: { kind: 'value', value: m }, hint: 'Leave out any place that has a 0.' });
    }
    const counts = [int(r, 1, 9), int(r, 0, 9), int(r, 0, 9), int(r, 0, 9), int(r, 0, 9), int(r, 0, 9)];
    counts[1 + ((i + int(r, 0, 1)) % 4)] = 0;
    const total = fromDigits(counts);
    const names = ['hundred thousand', 'ten thousand', 'thousand', 'hundred', 'ten', 'one'];
    const list = counts.map((c, q) => `${c} ${names[q]}${c === 1 ? '' : 's'}`);
    const sentence = `${list.slice(0, 5).join(', ')} and ${list[5]}`;
    const [intro, ask] = [
      ['A football club sold tickets in these amounts:', 'How many tickets did it sell?'],
      ['A charity counted its money in these amounts:', 'How many pounds did it count?'],
      ['A runner measured a long journey in these amounts:', 'How many metres is the journey?'],
      ['A website counted visits in these amounts:', 'How many visits is that?'],
      ['A farm counted its seeds in these amounts:', 'How many seeds is that?'],
    ][i];
    return number(`${intro} ${sentence}. ${ask}`, total, { hint: 'Write each count in its own place. A place with 0 still needs a 0.' });
  },
  compare(l, r, i) {
    const base = anySix(r), digits = String(base).split('').map(Number);
    if (l === 1 || l === 2) {
      const p = l === 1 ? i + 1 : int(r, 1, 4);
      const other = digits.slice();
      if (l === 1) {
        other[p] = (digits[p] + int(r, 1, 8)) % 10;
        for (let q = p + 1; q < 6; q++) other[q] = int(r, 0, 9);
      } else {
        // The same digits in a different order: a classic slip.
        [other[p], other[p + 1]] = [digits[p + 1], digits[p]];
        if (other[p] === digits[p]) other[p + 1] = (digits[p + 1] + 1) % 10;
      }
      const a = base, b = fromDigits(other) === base ? base + 1 : fromDigits(other);
      const [x, y] = pick(r, [true, false]) ? [a, b] : [b, a];
      if (l === 1) return choiceN(`Which number is greater: ${fmt(x)} or ${fmt(y)}?`, Math.max(a, b), [Math.min(a, b)], r,
        { rule: 'Compare the digits from the left. The first digit that is different decides.' });
      return choice(`Which sign makes the statement true?  ${fmt(x)} ___ ${fmt(y)}`, x > y ? '>' : '<', [x > y ? '<' : '>'], r,
        { hint: 'Find the first place where the digits are different.' });
    }
    const prefix = int(r, 10, 89) * 10000;
    const values = distinctNumbers(r, l === 3 ? 4 : 5, () => prefix + int(r, 0, 9999));
    if (l === 3) {
      const descending = i % 2 === 1;
      return orderBy(`Put these numbers in order, ${descending ? 'largest' : 'smallest'} first.`, values.map(v => ({ label: fmt(v), value: v })), r, { descending });
    }
    const vals = distinctNumbers(r, 4, () => int(r, 100000, 999999)), towns = shuffle(TOWNS, r).slice(0, 4);
    const list = towns.map((t, k) => `${t} ${fmt(vals[k])}`).join(', ');
    const sorted = [...vals].sort((a, b) => b - a), at = v => towns[vals.indexOf(v)];
    const base4 = `Four towns have these populations: ${list}.`;
    const asks = [
      () => choice(`${base4} Which town has the most people?`, at(sorted[0]), towns.filter(t => t !== at(sorted[0])), r),
      () => choice(`${base4} Which town has the fewest people?`, at(sorted[3]), towns.filter(t => t !== at(sorted[3])), r),
      () => choice(`${base4} Which town has the second largest population?`, at(sorted[1]), towns.filter(t => t !== at(sorted[1])), r),
      () => choice(`${base4} Which town has the second smallest population?`, at(sorted[2]), towns.filter(t => t !== at(sorted[2])), r),
      () => number(`${base4} How many more people live in the largest town than in the smallest?`, sorted[0] - sorted[3]),
    ];
    return asks[i]();
  },
  steps(l, r, i) {
    const step = SEQ_STEPS[i], down = i % 2 === 1;
    if (l === 1) {
      const start = int(r, 1000, 1000000 - 4 * step);
      return sequence(start, step, 'Fill in the missing numbers.', { rule: `Add ${fmt(step)} each time. Look at which digit changes.`, maxDigits: 7 });
    }
    if (l === 2) {
      if (i === 3 || i === 4) {
        const decimals = i === 3, down2 = pick(r, [false, true]);
        let terms, answer, wrong;
        if (decimals) {
          const [s] = pick(r, DECIMAL_SEQS), top = int(r, 8, 30), start = down2 ? top * s : int(r, 1, 6) * s;
          terms = Array.from({ length: 5 }, (_, k) => +(start + (down2 ? -k : k) * s).toFixed(2));
          answer = `${down2 ? 'Subtract' : 'Add'} ${s}`;
          wrong = [`${down2 ? 'Add' : 'Subtract'} ${s}`, `${down2 ? 'Subtract' : 'Add'} ${s * 10}`, `${down2 ? 'Subtract' : 'Add'} ${+(s / 10).toFixed(3)}`];
          terms = terms.map(String);
        } else {
          const den = pick(r, [2, 4]), unit = den === 2 ? 1 : pick(r, [1, 2]), start = int(r, 2, 6) * den + int(r, 0, den - 1), stepN = unit;
          const sign = down2 ? -1 : 1, base = down2 ? start + 8 * den : start;
          terms = Array.from({ length: 5 }, (_, k) => {
            const tot = base + sign * k * stepN;
            return mixed(Math.floor(tot / den), tot % den, den);
          });
          const stepText = mixed(0, stepN, den);
          answer = `${down2 ? 'Subtract' : 'Add'} ${stepText}`;
          wrong = [`${down2 ? 'Add' : 'Subtract'} ${stepText}`, `${down2 ? 'Subtract' : 'Add'} 1`, `${down2 ? 'Subtract' : 'Add'} ${mixed(0, 1, den * 2)}`];
        }
        return choice(`What is the rule for this sequence?  ${terms.join(',  ')}, ...`, answer, wrong, r, { hint: 'Find how much the numbers change from one term to the next.' });
      }
      const start = down ? int(r, 4 * step + 1000, 1000000) : int(r, 1000, 1000000 - 4 * step);
      const q = sequence(start, down ? -step : step, 'Find the rule, then fill the gaps.', { gaps: pick(r, [[1, 3], [2, 4], [1, 4], [0, 3]]), maxDigits: 7 });
      return q;
    }
    if (l === 3) {
      const mk = (start, sign) => Array.from({ length: 4 }, (_, k) => fmt(start + sign * k * step)).join(', ');
      const ups = distinctNumbers(r, 2, () => int(r, 1000, 1000000 - 4 * step)), downs = distinctNumbers(r, 2, () => int(r, 4 * step + 1000, 1000000));
      return sort('Sort the sequences by their rule.', [`Add ${fmt(step)}`, `Subtract ${fmt(step)}`],
        shuffle([...ups.map(s => [mk(s, 1), `Add ${fmt(step)}`]), ...downs.map(s => [mk(s, -1), `Subtract ${fmt(step)}`])], r));
    }
    const jumps = int(r, 3, 6), name = pick(r, NAMES);
    const stories = [
      s => [`${name}'s step counter shows ${fmt(s)}. It goes up by ${fmt(step)} each day. What does it show after ${jumps} days?`, s + jumps * step, false],
      s => [`A tank holds ${fmt(s)} litres. ${fmt(step)} litres are used each day. How many litres are left after ${jumps} days?`, s - jumps * step, true],
      s => [`A game starts with ${fmt(s)} points. ${name} wins ${fmt(step)} points each round. How many points after ${jumps} rounds?`, s + jumps * step, false],
      s => [`A reservoir holds ${fmt(s)} litres. It loses ${fmt(step)} litres each week. How many litres are left after ${jumps} weeks?`, s - jumps * step, true],
      s => [`A village has ${fmt(s)} trees. It plants ${fmt(step)} more each year. How many trees after ${jumps} years?`, s + jumps * step, false],
    ];
    const start = int(r, 1000 + jumps * step, 1000000 - jumps * step);
    const [prompt, answer] = stories[i](start);
    return number(prompt, answer, { hint: 'Count on or back in the same step each time.' });
  },
  negative(l, r, i) {
    const line = { type: 'line5', min: -10, max: 10 };
    if (l === 1) {
      const step = i + 2, back = pick(r, [true, false]);
      const lo = back ? Math.max(-10 + step, -9) : -9, hi = back ? 9 : Math.min(10 - step, 9);
      const start = int(r, back ? Math.max(lo, 1 - 0) : lo, hi);
      const answer = back ? start - step : start + step, wrongWay = back ? start + step : start - step;
      const wrong = others(answer, [answer + 1, answer - 1, wrongWay, -answer].filter(v => Math.abs(v) <= 10), { min: -10 });
      return choiceN(`Count ${back ? 'back' : 'on'} ${step} from ${minus(start)}. Where do you land?`, answer, wrong, r,
        { visual: { ...line, marks: [{ value: start }] }, rule: 'Counting back goes left, past 0 to −1, −2 and so on. Counting on goes right.' });
    }
    if (l === 2) {
      if (i % 2 === 0) {
        const low = -int(r, 2 + i, 9), high = int(r, 1 + i, 9);
        return number(`On a number line, how many steps is it from ${minus(low)} to ${high}?`, high - low, { visual: { ...line, marks: [{ value: low }, { value: high }] } });
      }
      const step = int(r, 4 + (i > 2 ? 2 : 0), 9), land = -int(r, 1, Math.min(step - 1, 9));
      return number(`Bix counted back ${step} and landed on ${minus(land)}. Which number did Bix start on?`, land + step, { visual: { ...line, marks: [{ value: land }] } });
    }
    if (l === 3) {
      const vals = distinctNumbers(r, 5, () => int(r, -12, 12)), descending = i % 2 === 1;
      return orderBy(`Order the temperatures from ${descending ? 'warmest to coldest' : 'coldest to warmest'}.`, vals.map(v => ({ label: `${minus(v)}°C`, value: v })), r, { descending });
    }
    const t = int(r, 1, 8), drop = t + int(r, 3, 9), rise = int(r, 4, 9), depth = int(r, 15, 40), more = int(r, 6, 12);
    return [
      () => choice(`It is ${t}°C at 6 pm. By midnight the temperature has fallen ${drop} degrees. What is it now?`, `${minus(t - drop)}°C`, [`${drop - t}°C`, `${minus(t - drop + 1)}°C`, `${t + drop}°C`], r),
      () => number(`The temperature rose from ${minus(-rise)}°C to ${t + 2}°C. By how many degrees did it rise?`, rise + t + 2),
      () => choice(`A lift starts on floor ${t} and goes down ${t + 4} floors. Floors below ground are negative. Which floor does it stop at?`, `Floor ${minus(-4)}`, [`Floor ${minus(-3)}`, 'Floor 4', `Floor ${minus(-5)}`], r),
      () => number(`A diver is ${depth} metres below sea level. A bird is ${more} metres above sea level. How many metres apart are they?`, depth + more),
      () => choice(`Sam has £${t} in his account. He spends £${t + 5}. What is his balance?`, `−£5`, ['£5', '−£4', `−£${t + 5}`], r),
    ][i]();
  },
  round(l, r, i) {
    const pickUnit = [[10, 100, 1000, 100, 1000], [10000, 100000, 1000, 10000, 100000], [10, 100, 1000, 10000, 100000], [1000, 10000, 100, 10000, 100000]];
    if (l === 1) {
      const unit = pickUnit[0][i], n = clear(int(r, 10000, 999999), unit), answer = roundTo(n, unit);
      const down = Math.floor(n / unit) * unit, up = down + unit, other = down === answer ? up : down;
      return choiceN(`Round ${fmt(n)} to the nearest ${fmt(unit)}.`, answer, [other, roundTo(n, unit / 10), roundTo(n, unit * 10)], r,
        { rule: 'Look at the digit one place to the right. 5 or more rounds up. 4 or less rounds down.' });
    }
    if (l === 2) {
      const unit = pickUnit[1][i], n = clear(int(r, 100000, 999999), unit);
      return number(`Round ${fmt(n)} to the nearest ${fmt(unit)}.`, roundTo(n, unit), { hint: 'Look at the digit one place to the right of the rounding place.' });
    }
    if (l === 3) {
      const unit = pickUnit[2][i], lower = int(r, 10, Math.floor(900000 / unit)) * unit, half = unit / 2;
      const down = distinctNumbers(r, 2, () => lower + int(r, 1, half - 1)), up = distinctNumbers(r, 2, () => lower + int(r, half + 1, unit - 1));
      return sort(`Sort each number by what it rounds to, to the nearest ${fmt(unit)}.`, [fmt(lower), fmt(lower + unit)],
        shuffle([...down.map(v => [fmt(v), fmt(lower)]), ...up.map(v => [fmt(v), fmt(lower + unit)])], r));
    }
    const k = i;
    if (k === 3) { const x = int(r, 10, 90) * 10000; return number(`A number rounds to ${fmt(x)} to the nearest 10,000. What is the smallest whole number it could be?`, x - 5000); }
    if (k === 4) { const x = int(r, 100, 900) * 1000; return number(`A number rounds to ${fmt(x)} to the nearest 1000. What is the largest whole number it could be?`, x + 499); }
    const unit = [1000, 10000, 100][k], n = clear(int(r, 100000, 999999), unit);
    const story = [`A football club had ${fmt(n)} fans through the gates this season. A poster rounds this to the nearest 1000. What does the poster say?`,
      `A website had ${fmt(n)} visitors. A report rounds this to the nearest 10,000. What number is in the report?`,
      `A charity raised £${fmt(n)}. A news story rounds this to the nearest £100. What does it say?`][k];
    return number(story, roundTo(n, unit));
  },
  roman(l, r, i) {
    const rule = 'I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000. A small letter before a big one is taken away: IV = 4, CM = 900.';
    const ranges = [[3, 49], [50, 99], [100, 399], [400, 899], [900, 1000]];
    if (l === 1) {
      const [lo, hi] = ranges[i], n = int(r, lo, hi);
      return choiceN(`What number is ${romanFull(n)}?`, n, [n + 1, n - 1, n + 10, n - 10, n + 100].filter(v => v >= 1), r, { rule });
    }
    if (l === 2) { const n = band(r, i, 1, 1000); return number(`Write ${romanFull(n)} using our digits.`, n, { hint: 'Add up the letters, taking away any small letter that comes before a bigger one.' }); }
    if (l === 3) {
      const low = band(r, i, 1, 960), values = distinctNumbers(r, 4, () => low + int(r, 0, 39));
      return orderBy('Order these Roman numerals from smallest to largest.', values.map(v => ({ label: romanFull(v), value: v })), r);
    }
    const year = int(r, 1100, 2099), ctx = pick(r, ['A castle date stone', 'An old clock', 'A film poster', 'A church bell']);
    if (i < 3) return number(`${ctx} shows the year ${romanFull(year)}. Which year is that?`, year);
    if (i === 3) return choice(`Which is the year ${year} in Roman numerals?`, romanFull(year), [year + 1, year - 1, year + 10, year + 100].map(romanFull), r, { rule });
    const other = year + pick(r, [-1, 1]) * int(r, 3, 40), later = Math.max(year, other);
    return choice(`${pick(r, ['Two plaques', 'Two statues'])} show ${romanFull(year)} and ${romanFull(other)}. Which shows the later year?`, romanFull(later), [romanFull(Math.min(year, other))], r);
  },
  bigProblems(l, r, i) {
    const n = int(r, 110000, 889999), name = pick(r, NAMES);
    if (l === 1) {
      const answerSet = [
        () => { const a = clear(n, 10000); return choiceN(`A concert sold ${fmt(a)} tickets. A newspaper rounds this to the nearest 10,000. What does it print?`, roundTo(a, 10000), [roundTo(a, 1000), roundTo(a, 100000), roundTo(a, 10000) + 10000], r, { rule: 'Look at the thousands digit. 5 or more rounds up.' }); },
        () => choiceN(`A charity has raised £${fmt(n)}. A donor gives £100,000 more. How much has it raised now?`, n + 100000, [n + 10000, n + 1000, n + 1000000, n - 100000], r, { rule: 'Adding 100,000 changes the hundred thousands digit.' }),
        () => { const v = distinctNumbers(r, 3, () => int(r, 100000, 999999)), t = shuffle(TOWNS, r).slice(0, 3), top = t[v.indexOf(Math.max(...v))];
          return choice(`Three towns have ${t.map((x, k) => `${x} ${fmt(v[k])}`).join(', ')} people. Which town has the most people?`, top, t.filter(x => x !== top), r, { rule: 'Compare the digits from the left.' }); },
        () => { const d = distinctDigits(r, 6), m = fromDigits(d), k = nonzeroAt(d, 1 + (i % 4)), value = d[k] * 10 ** (5 - k);
          return choiceN(`A game score is ${fmt(m)}. What is the value of the **${d[k]}**?`, value, [d[k] * 10 ** (5 - k) * 10, d[k] * 10 ** (5 - k) / 10, d[k]].filter(v => v !== value), r, { rule: 'Each place is worth 10 times the place to its right.' }); },
        () => { const t = int(r, 1, 7), f = t + int(r, 3, 6); return choice(`The temperature is ${t}°C. It falls ${f} degrees. What is it now?`, `${minus(t - f)}°C`, [`${f - t}°C`, `${minus(t - f - 1)}°C`, `${minus(t - f + 1)}°C`], r, { rule: 'Counting back past 0 gives negative numbers.' }); },
      ];
      return answerSet[i]();
    }
    if (l === 2) {
      return [
        () => number(`How many more are needed to make 1,000,000 from ${fmt(n)}?`, 1000000 - n, { hint: 'Count up to the next 100,000 first.' }),
        () => { const d = distinctDigits(r, 6), m = fromDigits(d), k = nonzeroAt(d, 1 + (i % 4)); return number(`A bank balance is £${fmt(m)}. What is the value of the **${d[k]}**, in pounds?`, d[k] * 10 ** (5 - k)); },
        () => { const steps = int(r, 3, 7); return number(`A tank holds ${fmt(n)} litres. It loses 10,000 litres a day. How many litres are left after ${steps} days?`, n - steps * 10000 > 0 ? n - steps * 10000 : n - 10000); },
        () => { const a = clear(n, 1000); return number(`${name} rounds ${fmt(a)} to the nearest 1000. What does ${name} get?`, roundTo(a, 1000)); },
        () => { const a = int(r, 1, 6), b = int(r, 1, 9); return number(`A number has ${a} hundred thousands and ${b} thousands, and nothing else. What is the number?`, a * 100000 + b * 1000); },
      ][i]();
    }
    if (l === 3) {
      const vals = distinctNumbers(r, 4, () => int(r, 3, 9) * 100000 + int(r, 1, 9) * 10000 + int(r, 0, 9) * 1000);
      const entries = vals.map((v, k) => ({ value: v, label: k % 2 === 0 ? fmt(v) : words(v) }));
      return orderBy('Put these amounts of money in order, smallest first. Some are in words.', entries.map(e => ({ ...e, label: `£${e.label}` })), r, { descending: i % 2 === 1 });
    }
    return [
      () => { const years = int(r, 3, 8), a = int(r, 20, 60) * 10000; return number(`A city has ${fmt(a)} people. It grows by 10,000 each year for ${years} years. How many people will live there?`, a + years * 10000); },
      () => { const a = int(r, 3, 9) * 100000 + int(r, 1, 99) * 1000; return number(`A school fund has £${fmt(a)}. It needs £1,000,000 to build a new hall. How much more does it need?`, 1000000 - a); },
      () => { const a = clear(int(r, 100000, 999999), 100000); return number(`A lake holds ${fmt(a)} litres. A sign rounds this to the nearest 100,000 litres. How many litres does the sign show?`, roundTo(a, 100000)); },
      () => { const d = distinctDigits(r, 6), m = fromDigits(d), k = nonzeroAt(d, 2 + (i % 3)); return number(`${name}'s prize is £${fmt(m)}. How many pounds is the digit **${d[k]}** worth?`, d[k] * 10 ** (5 - k)); },
      () => { const d0 = int(r, 20, 40), dive = int(r, 8, 14); return number(`A submarine is at ${minus(-d0)} metres. It dives ${dive} metres, then ${dive} metres again. How many metres below sea level is it now?`, d0 + 2 * dive); },
    ][i]();
  },
};

/** Per-topic challenge titles: { builderKey: [four titles] }. */
export const TOPIC_TITLES = {
  place: ["Find a digit's value.", 'Read and write big numbers.', 'Split a number into parts.', 'Make a number from its parts.'],
  compare: ['Find the greater number.', 'Choose the right sign.', 'Put big numbers in order.', 'Compare town populations.'],
  steps: ['Count on in powers of 10.', 'Find the counting rule.', 'Sort the sequences.', 'Solve a counting problem.'],
  negative: ['Count past zero.', 'Find a gap or a start.', 'Order temperatures.', 'Solve a below-zero problem.'],
  round: ['Choose the rounded number.', 'Type the rounded number.', 'Sort by the rounded number.', 'Round for a purpose.'],
  roman: ['Read Roman numerals.', 'Write the number.', 'Order Roman numerals.', 'Read Roman years.'],
  bigProblems: ['Use a big number.', 'Work out the number.', 'Order different forms.', 'Solve a big number story.'],
};
