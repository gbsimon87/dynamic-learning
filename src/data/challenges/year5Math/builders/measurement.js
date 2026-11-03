import { build, buildDecimal, choice, choiceN, fmt, int, number, orderBy, others, pick, shuffle, sort, NAMES } from '../kit.js';

const show = t => String(t / 1000);
const money = pence => `£${(pence / 100).toFixed(2)}`;
const NAME = r => pick(r, NAMES);
const plural = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

// Metric units: [from, to, factor], factor = how many `to` make one `from`.
const METRIC = [['km', 'm', 1000], ['m', 'cm', 100], ['cm', 'mm', 10], ['kg', 'g', 1000], ['l', 'ml', 1000]];
const IMPERIAL_RULE = 'About: 1 inch = 2.5 cm · 1 pound = 450 g · 1 litre = 1 3/4 pints.';
const TIME_RULE = '7 days = 1 week · 24 hours = 1 day · 60 minutes = 1 hour · 60 seconds = 1 minute · 12 months = 1 year.';

/** Rectilinear shapes: points go clockwise from the top-left; edge k runs from point k to point k + 1. */
function shapeOf(r, kind) {
  if (kind === 'L') {
    const w = int(r, 6, 12), h = int(r, 5, 10), cw = int(r, 2, w - 3), ch = int(r, 2, h - 3);
    return { points: [[0, 0], [w - cw, 0], [w - cw, ch], [w, ch], [w, h], [0, h]], hide: [1, 4], bound: [w, h] };
  }
  if (kind === 'U') {
    const w = int(r, 8, 13), h = int(r, 5, 9), cw = int(r, 2, w - 5), ch = int(r, 2, h - 2), x0 = int(r, 1, w - cw - 2);
    return { points: [[0, 0], [x0, 0], [x0, ch], [x0 + cw, ch], [x0 + cw, 0], [w, 0], [w, h], [0, h]], hide: [4, 7], bound: [w, h] };
  }
  const sw = int(r, 1, 3) * 2, w = sw + 2 * int(r, 2, 4), t = int(r, 2, 3), h = t + int(r, 3, 6), sx = (w - sw) / 2;
  return { points: [[0, 0], [w, 0], [w, t], [sx + sw, t], [sx + sw, h], [sx, h], [sx, t], [0, t]], hide: [5, 6, 7], bound: [w, h] };
}
const edgeLengths = pts => pts.map((p, k) => { const q = pts[(k + 1) % pts.length]; return Math.abs(q[0] - p[0]) + Math.abs(q[1] - p[1]); });

/** `count` entries with different values, from make() => { label, value }. Bounded, so any random source ends. */
function distinctEntries(count, make) {
  const entries = [];
  for (let tries = 0; entries.length < count && tries < 300; tries++) {
    const e = make();
    if (!entries.some(x => x.value === e.value)) entries.push(e);
  }
  for (let k = 1; entries.length < count; k++) entries.push({ label: `${k * 7 + 1} extra`, value: 10 ** 6 + k });
  return entries;
}

export const BUILDERS = {
  metric(l, r, i) {
    const [from, to, factor] = METRIC[i];
    if (l === 1) {
      const n = int(r, 2, 9), amount = pick(r, [0, 0.5]) + n, answer = amount * factor;
      return choice(`${amount} ${from} = ? ${to}`, fmt(answer), [answer / 10, answer * 10, amount * (factor / 10), amount + factor].filter(x => x !== answer && Number.isInteger(x)).slice(0, 3).map(fmt), r,
        { rule: `1 ${from} = ${fmt(factor)} ${to}. Going to a smaller unit makes the number bigger.` });
    }
    if (l === 2) {
      const n = int(r, 2, 9), extra = int(r, 1, 9);
      return [
        () => number(`${fmt(n * 1000)} g = ? kg`, n, { maxDigits: 3 }),
        () => number(`${n} m ${extra * 10} cm = ? cm`, n * 100 + extra * 10),
        () => number(`${n * 10 + extra} cm = ? mm`, (n * 10 + extra) * 10),
        () => number(`${n} l ${extra * 100} ml = ? ml`, n * 1000 + extra * 100),
        () => number(`${n} km ${extra * 50} m = ? m`, n * 1000 + extra * 50),
      ][i]();
    }
    if (l === 3) {
      const kinds = [
        { noun: 'lengths', units: [['mm', 1], ['cm', 10], ['m', 1000]], base: 'mm' }, { noun: 'masses', units: [['g', 1], ['kg', 1000]], base: 'g' },
        { noun: 'capacities', units: [['ml', 1], ['l', 1000]], base: 'ml' }, { noun: 'lengths', units: [['cm', 10], ['m', 1000]], base: 'mm' },
        { noun: 'distances', units: [['m', 1], ['km', 1000]], base: 'm' },
      ][i];
      const entries = distinctEntries(4, () => {
        const [u, f] = pick(r, kinds.units), count = f === 1 ? int(r, 4, 60) * 50 : f === 10 ? int(r, 5, 99) : int(r, 1, 9) + pick(r, [0, 0.5]);
        return { label: `${count} ${u}`, value: count * f };
      });
      return orderBy(`Put these ${kinds.noun} in order, smallest first.`, entries, r, { hint: `Change them all to ${kinds.base} first.` });
    }
    const name = NAME(r), other = NAME(r) === name ? 'Sam' : NAME(r);
    return number([
      `A ribbon is 2.5 m long. ${name} cuts it into pieces of 50 cm. How many pieces?`,
      `A jug holds 1.5 litres. ${name} fills glasses of 250 ml. How many glasses can be filled?`,
      `${name} walks 1.2 km to school and 1.2 km back. How many metres is that altogether?`,
      `A recipe needs 750 g of flour. ${name} makes 4 batches. How many kilograms of flour is needed?`,
      `${name} ran 4.5 km. ${other === name ? 'Tom' : other} ran 3800 m. How many metres further did ${name} run?`,
    ][i], [5, 6, 2400, 3, 700][i]);
  },
  imperial(l, r, i) {
    const inches = pick(r, [2, 4, 6, 8, 10, 12]), pounds = int(r, 1, 6), litres = pick(r, [4, 8, 12]), lb = n => plural(n, 'pound');
    if (l === 1) {
      return [
        () => choiceN(`About how many centimetres is ${inches} inches?`, inches * 2.5, [inches * 2.5 + 5, inches * 2, inches * 25, inches], r, { rule: IMPERIAL_RULE }),
        () => choiceN(`About how many grams is ${lb(pounds)}?`, pounds * 450, [pounds * 45, pounds * 500, pounds * 4500, pounds * 250], r, { rule: IMPERIAL_RULE }),
        () => choiceN(`About how many pints is ${litres} litres?`, litres * 7 / 4, [litres, litres * 2, litres * 7 / 4 + 2, litres + 2], r, { rule: IMPERIAL_RULE }),
        () => choiceN(`About how many centimetres is ${inches + 2} inches?`, (inches + 2) * 2.5, [(inches + 2) * 2, (inches + 2) * 2.5 + 5, (inches + 2) * 25], r, { rule: IMPERIAL_RULE }),
        () => choiceN(`About how many grams is ${lb(pounds + 1)}?`, (pounds + 1) * 450, [(pounds + 1) * 500, (pounds + 1) * 45, (pounds + 1) * 250], r, { rule: IMPERIAL_RULE }),
      ][i]();
    }
    if (l === 2) {
      return [
        () => number(`About how many inches is ${inches * 5 / 2} cm?`, inches, { maxDigits: 3, hint: '1 inch is about 2.5 cm.' }),
        () => number(`About how many grams is ${lb(pounds)}?`, pounds * 450, { maxDigits: 4, hint: '1 pound is about 450 g.' }),
        () => number(`About how many pints is ${litres} litres?`, litres * 7 / 4, { maxDigits: 3, hint: '1 litre is about 1 3/4 pints.' }),
        () => number(`About how many pounds is ${fmt(pounds * 450)} g?`, pounds, { maxDigits: 3 }),
        () => number(`About how many litres is ${litres * 7 / 4} pints?`, litres, { maxDigits: 3 }),
      ][i]();
    }
    if (l === 3) {
      const set = [
        { bins: ['About 5 cm', 'About 10 cm', 'About 25 cm'], cards: [['2 inches', 0], ['50 mm', 0], ['4 inches', 1], ['100 mm', 1], ['10 inches', 2], ['250 mm', 2]] },
        { bins: ['About 450 g', 'About 900 g', 'About 1350 g'], cards: [['1 pound', 0], ['0.45 kg', 0], ['2 pounds', 1], ['0.9 kg', 1], ['3 pounds', 2], ['1.35 kg', 2]] },
        { bins: ['About 4 litres', 'About 8 litres', 'About 12 litres'], cards: [['7 pints', 0], ['4000 ml', 0], ['14 pints', 1], ['8000 ml', 1], ['21 pints', 2], ['12,000 ml', 2]] },
        { bins: ['About 10 cm', 'About 20 cm', 'About 30 cm'], cards: [['4 inches', 0], ['100 mm', 0], ['8 inches', 1], ['200 mm', 1], ['12 inches', 2], ['300 mm', 2]] },
        { bins: ['About 900 g', 'About 1800 g', 'About 2250 g'], cards: [['2 pounds', 0], ['0.9 kg', 0], ['4 pounds', 1], ['1.8 kg', 1], ['5 pounds', 2], ['2.25 kg', 2]] },
      ][i];
      return sort('Match each measure to the amount it is about equal to.', set.bins, shuffle(set.cards.map(([label, b]) => [label, set.bins[b]]), r), { rule: IMPERIAL_RULE });
    }
    return number([
      `A recipe needs ${lb(pounds)} of potatoes. About how many grams is that?`,
      `A snake is ${inches * 5 / 2} cm long. About how many inches long is it?`,
      `A jug holds ${litres} litres. About how many pints is that?`,
      `A parcel weighs about ${fmt(pounds * 450)} g. About how many pounds does it weigh?`,
      `A plank is ${inches} inches long. About how many centimetres long is it?`,
    ][i], [pounds * 450, inches, litres * 7 / 4, pounds, inches * 5 / 2][i], { rule: IMPERIAL_RULE, maxDigits: 4 });
  },
  perimeter(l, r, i) {
    const kind = ['L', 'T', 'U', 'L', 'T'][i], shape = shapeOf(r, kind), pts = shape.points, edges = edgeLengths(pts), P = edges.reduce((a, b) => a + b, 0);
    const visual = (hide = []) => ({ type: 'rectilinear', points: pts, labels: edges.map((e, k) => (hide.includes(k) ? '' : String(e))), unit: 'cm' });
    if (l === 1) {
      return choiceN('What is the perimeter of this shape in centimetres?', P, others(P, [P - Math.min(...edges), P + Math.min(...edges), P - 2, shape.bound[0] * shape.bound[1]], { min: 1 }), r,
        { visual: visual(), rule: 'Perimeter is the distance all the way round. Add up every side.' });
    }
    if (l === 2) return number('What is the perimeter of this shape in centimetres? Work out the sides that are not labelled.', P, { visual: visual(shape.hide), maxDigits: 3, hint: 'Parallel sides on opposite edges can help you find a missing length.' });
    if (l === 3) {
      if (kind === 'U') return number('The notch cuts into the rectangle. What is the perimeter in cm?', P, { visual: visual(shape.hide), maxDigits: 3 });
      const [w, h] = shape.bound;
      return build('Build a short calculation for the perimeter using the outside rectangle.', ['2', '×', '(', String(w), '+', String(h), ')', '=', String(2 * (w + h))], r,
        { visual: visual(shape.hide), hint: 'Imagine the missing corner filled in. The perimeter stays the same.' });
    }
    const a = int(r, 3, 9), b = int(r, 4, 12), name = NAME(r);
    return number([
      `A rectangle has a perimeter of ${2 * (a + b)} cm. One side is ${a} cm. How long is the other side, in cm?`,
      `${name} writes 4 + 2b = ${4 + 2 * b}. This is the perimeter of a rectangle that is 2 cm by b cm. What is b, in cm?`,
      `A square garden has a perimeter of ${4 * (a + b)} m. How long is each side, in metres?`,
      `A rectangular field is ${a + b} m long and ${a} m wide. ${name} walks all the way round it twice. How many metres does ${name} walk?`,
      `A rectangle has a perimeter of ${2 * (a + b + 3)} cm. Its length is ${b + 3} cm. How wide is it, in cm?`,
    ][i], [b, b, a + b, 4 * (2 * a + b), a][i], { maxDigits: 3 });
  },
  area(l, r, i) {
    const w = int(r, 3, 12), h = int(r, 3, 12), unit = pick(r, ['cm', 'm']), sq = int(r, 3, 12), name = NAME(r), rate = int(r, 2, 6);
    const visual = { type: 'rect', w, h, unit, labels: { w: String(w), h: String(h) } };
    if (l === 1) return choiceN(`What is the area of this rectangle in square ${unit === 'cm' ? 'centimetres' : 'metres'}?`, w * h, [2 * (w + h), w + h, w * h + w, w * h - h], r,
      { visual, rule: `Area is the space inside. Multiply the length by the width. The answer is in ${unit}².` });
    if (l === 2) {
      return [
        () => number(`A rectangle is ${w} ${unit} by ${h} ${unit}. What is its area in ${unit}²?`, w * h, { visual, maxDigits: 3 }),
        () => number(`A square has sides of ${sq} ${unit}. What is its area in ${unit}²?`, sq * sq, { maxDigits: 3 }),
        () => number(`A rectangle is ${w + 8} ${unit} long and ${h} ${unit} wide. What is its area in ${unit}²?`, (w + 8) * h, { maxDigits: 3 }),
        () => number(`What is the area of a square with sides of ${sq + 3} ${unit}, in ${unit}²?`, (sq + 3) ** 2, { maxDigits: 3 }),
        () => number(`A rectangle is ${w} ${unit} by ${h + 10} ${unit}. What is its area in ${unit}²?`, w * (h + 10), { maxDigits: 3 }),
      ][i]();
    }
    if (l === 3) {
      const entries = distinctEntries(4, () => { const a = int(r, 2, 12), b = int(r, 2, 12); return { label: `${a} ${unit} by ${b} ${unit}`, value: a * b }; });
      return orderBy('Put these rectangles in order of area, smallest first.', entries, r, { hint: 'Work out each area by multiplying length by width.' });
    }
    return number([
      `A rectangular room has an area of ${w * h} m². It is ${w} m wide. How long is it, in metres?`,
      `A square patio has an area of ${w * w} m². How long is each side, in metres?`,
      `A carpet is ${w} m by ${h} m. Carpet costs £${rate} for each square metre. How much does the carpet cost, in pounds?`,
      `${name} paints a wall that is ${w} m long and ${h} m high. How many square metres is the wall?`,
      `A rectangle has an area of ${w * h} cm² and a length of ${h} cm. What is its perimeter, in cm?`,
    ][i], [h, w, w * h * rate, w * h, 2 * (w + h)][i], { maxDigits: 4 });
  },
  estimate(l, r, i) {
    const L = int(r, 2, 5), Wd = int(r, 2, 4), Ht = int(r, 2, 4), c = int(r, 3, 6);
    if (l === 1) {
      const W = int(r, 5, 8), H = int(r, 4, 6), full = [], part = [];
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        const dx = (x + 0.5 - W / 2) / (W / 2), dy = (y + 0.5 - H / 2) / (H / 2), d = dx * dx + dy * dy;
        if (d < 0.35) full.push([x, y]); else if (d < 0.95) part.push([x, y]);
      }
      const parts = part.length % 2 ? part.slice(1) : part, estimate = full.length + parts.length / 2;
      return choiceN('Estimate the area of the shape in squares. Count whole squares and half-squares.', estimate, [full.length, full.length + parts.length, estimate + 2, estimate - 2], r,
        { visual: { type: 'cellsEst', width: W, height: H, full, part: parts }, rule: 'Count the whole squares. Then count the part squares and halve that number.' });
    }
    if (l === 2) {
      const dims = [[L, Wd, Ht], [L + 1, Wd, Ht], [L, Wd + 1, Ht], [L, Wd, Ht + 1], [c, c, c]][i];
      return number(i === 4 ? 'How many 1 cm cubes make this cube?' : 'How many 1 cm cubes make this cuboid?', dims[0] * dims[1] * dims[2], { visual: { type: 'cubes', l: dims[0], w: dims[1], h: dims[2] }, maxDigits: 3 });
    }
    if (l === 3) {
      const small = ['A teaspoon of medicine', 'A can of juice', 'A cup of tea', 'A small bottle of water', 'A spoonful of syrup', 'A mug of cocoa'];
      const large = ['A bath', 'A fish tank', 'A bucket', 'A paddling pool', 'A water butt', 'A washing-up bowl'], bins = ['Millilitres (ml)', 'Litres (l)'];
      return sort('Which unit would you use to measure how much each one holds?', bins,
        shuffle([...shuffle(small, r).slice(0, 3).map(x => [x, bins[0]]), ...shuffle(large, r).slice(0, 3).map(x => [x, bins[1]])], r));
    }
    const jugs = int(r, 1, 3);
    return number([
      `A layer of cubes has ${L * Wd} cubes. There are ${Ht + 1} layers. How many cubes are there altogether?`,
      `A box is ${L + 2} cm long, ${Wd + 1} cm wide and ${Ht} cm high. How many 1 cm cubes fit inside?`,
      `A cube-shaped box has edges of ${c} cm. How many 1 cm cubes fill it?`,
      `A jug holds ${jugs} litre${jugs === 1 ? '' : 's'}. How many cups of 250 ml can be filled from the jug?`,
      `A crate is ${L * 2} cm long, ${Wd * 2} cm wide and ${Ht * 2} cm high. Each box is a cube with edges of 2 cm. How many boxes fit in the crate?`,
    ][i], [L * Wd * (Ht + 1), (L + 2) * (Wd + 1) * Ht, c ** 3, 4 * jugs, L * Wd * Ht][i], { maxDigits: 3 });
  },
  time(l, r, i) {
    const n = int(r, 2, 9), extra = int(r, 5, 55), name = NAME(r);
    if (l === 1) {
      return [
        () => choiceN(`${n} weeks = ? days`, n * 7, [n * 5, n * 10, n * 24, n * 12], r, { rule: TIME_RULE }),
        () => choiceN(`${n} hours = ? minutes`, n * 60, [n * 100, n * 30, n * 24, n * 50], r, { rule: TIME_RULE }),
        () => choiceN(`${n} minutes = ? seconds`, n * 60, [n * 100, n * 30, n * 24], r, { rule: TIME_RULE }),
        () => choiceN(`${n} years = ? months`, n * 12, [n * 10, n * 52, n * 24], r, { rule: TIME_RULE }),
        () => choiceN(`${n} days = ? hours`, n * 24, [n * 12, n * 60, n * 7, n * 100], r, { rule: TIME_RULE }),
      ][i]();
    }
    if (l === 2) {
      return [
        () => number(`${n} hours ${extra} minutes = ? minutes`, n * 60 + extra),
        () => number(`${fmt(n * 60)} seconds = ? minutes`, n, { maxDigits: 3 }),
        () => number(`${n} weeks ${n - 1} days = ? days`, n * 7 + n - 1),
        () => number(`${n} years ${n + 1} months = ? months`, n * 12 + n + 1),
        () => number(`How many whole hours are in ${n * 60 + extra} minutes?`, n, { maxDigits: 3 }),
      ][i]();
    }
    if (l === 3) {
      const forms = [v => { const h = Math.floor(v / 60), m = v % 60; return h ? (m ? `${h} hr ${m} min` : `${h} hr`) : `${m} min`; }, v => `${v} min`, v => `${fmt(v * 60)} s`];
      const entries = distinctEntries(4, () => { const v = int(r, 5, 36) * 5; return { value: v, label: forms[int(r, 0, 2)](v) }; });
      return orderBy('Put these times in order, shortest first.', entries, r, { hint: 'Change them all to minutes first.' });
    }
    const hours = n % 3 + 1;
    return number([
      `A film lasts ${hours} hour${hours === 1 ? '' : 's'} ${extra} minutes. How many minutes is that?`,
      `${name} has been away for ${n * 8} days. How many whole weeks is that?`,
      `A bus journey takes ${fmt(n * 60 + extra)} minutes. After the whole hours, how many minutes are left over?`,
      `A baby is ${12 + n} months old. How many months older than 1 year is the baby?`,
      `A programme is ${n * 60 + extra} seconds long. After the whole minutes, how many seconds are left over?`,
    ][i], [hours * 60 + extra, Math.floor(n * 8 / 7), extra, n, extra][i], { maxDigits: 3 });
  },
  measureProblems(l, r, i) {
    const name = NAME(r), k = int(r, 2, 6), p1 = int(r, 101, 499), p2 = int(r, 101, 499);
    const x = int(r, 11, 99) * 10, y0 = int(r, 11, 99) * 10, y = y0 === x || x + y0 === 1000 ? y0 + 10 : y0, lo = Math.min(x, y), hi = Math.max(x, y);
    if (l === 1) {
      return [
        () => choice(`A pen costs ${money(p1)} and a ruler costs ${money(p2)}. How much do they cost together?`, money(p1 + p2), [money(p1 + p2 + 100), money(p1 + p2 - 10), money(p1 + p2 + 10)], r),
        () => choice(`${name} pays £10 for a book that costs ${money(p1 + 400)}. How much change does ${name} get?`, money(1000 - p1 - 400), [money(1000 - p1 - 300), money(1000 - p1 - 500), money(p1 + 400 - 10)], r),
        () => choice(`A ribbon is ${show(x)} m long. Another is ${show(y)} m long. How long are they together?`, `${show(x + y)} m`, [`${show(x + y + 100)} m`, `${show(x + y - 100)} m`, `${show(x + y + 10)} m`], r),
        () => choice(`${plural(k, 'bag')} of flour weigh ${show(x)} kg each. How much do they weigh altogether?`, `${show(x * k)} kg`, [`${show(x * k + 100)} kg`, `${show(x * k - 100)} kg`, `${show(x * k + 10)} kg`], r),
        () => choice(`A jug holds ${show(hi + 1000)} litres. ${name} pours out ${show(lo)} litres. How much is left?`, `${show(hi + 1000 - lo)} litres`, [`${show(hi + 1000 - lo + 100)} litres`, `${show(hi + 1000 + lo)} litres`, `${show(hi + 1000 - lo - 100)} litres`], r),
      ][i]();
    }
    if (l === 2) {
      return [
        () => number(`A pen costs ${money(p1)}. ${name} buys ${k} pens. How many pence is that altogether?`, p1 * k),
        () => number(`${name} pays £10 for a pen at ${money(p1)} and a ruler at ${money(p2)}. How many pence change does ${name} get?`, 1000 - p1 - p2),
        () => number(`A ribbon is ${show(x)} m long. Another is ${show(y)} m long. How many centimetres long are they together?`, (x + y) / 10),
        () => number(`${plural(k, 'bag')} of flour weigh ${show(x)} kg each. How many grams do they weigh altogether?`, x * k),
        () => number(`A jug holds ${show(hi + 1000)} litres. ${name} pours out ${show(lo)} litres. How many millilitres are left?`, hi + 1000 - lo),
      ][i]();
    }
    if (l === 3) {
      const pence = pick(r, [25, 35, 45, 65, 75, 95, 125, 145, 175]), kk = pick(r, [3, 5, 7, 9]), mass = int(r, 2, 9) * 100 + int(r, 1, 9) * 10 + 5;
      const sets = [
        () => [`${plural(kk, 'book')} cost ${money(pence)} each. How much do they cost altogether, in pounds? Build the answer.`, kk * pence * 10],
        () => [`${name} cuts ${show(lo)} m from a rope that is ${show(hi + 1000)} m long. How long is the rope now, in metres? Build the answer.`, hi + 1000 - lo],
        () => [`Two parcels weigh ${show(x)} kg and ${show(y)} kg. How heavy are they together, in kg? Build the answer.`, x + y],
        () => [`${plural(kk, 'tin')} each hold ${show(mass * 10)} litres. How many litres is that altogether? Build the answer.`, kk * mass * 10],
        () => [`A jug holds ${show(hi + 1000)} litres. ${name} pours out ${show(lo)} litres. How many litres are left? Build the answer.`, hi + 1000 - lo],
      ];
      const [prompt, answer] = sets[i]();
      return buildDecimal(prompt, show(answer), r, { hint: 'Line up the decimal points, or work in pence or millilitres.' });
    }
    const m1 = int(r, 11, 39) * 100, m2 = int(r, 2, 4), cost = int(r, 150, 350), items = int(r, 2, 4), box = int(r, 3, 9) * 50;
    return number([
      `A rope is ${show(m1)} m long. A second rope is ${m2} times as long. How many centimetres of rope are there altogether?`,
      `${name} buys ${plural(items, 'notebook')} at ${money(cost)} each and a pencil case for ${money(p2)}. ${name} pays with a £20 note. How many pence change?`,
      `A box weighs ${show(box * 10)} kg. ${plural(k + 2, 'box', 'boxes')} are stacked. How many grams do they weigh altogether?`,
      `A bottle holds ${show(1000 + box)} litres. ${plural(4, 'bottle')} are emptied into a tank that holds 8 litres. How many millilitres of space are left in the tank?`,
      `Tom runs ${show(m1 + 400)} km. Ria runs twice as far. How many metres do they run altogether?`,
    ][i], [(m1 + m1 * m2) / 10, 2000 - items * cost - p2, (box * 10) * (k + 2), 8000 - 4 * (1000 + box), (m1 + 400) * 3][i], { maxDigits: 6 });
  },
};

export const TOPIC_TITLES = {
  metric: ['Change to a smaller unit.', 'Change between units.', 'Order different units.', 'Solve a units problem.'],
  imperial: ['Estimate with old units.', 'Convert both ways.', 'Match equal measures.', 'Solve a conversion problem.'],
  perimeter: ['Add the sides.', 'Find the missing sides.', 'Use the outside rectangle.', 'Find a missing length.'],
  area: ['Area of a rectangle.', 'Work out the area.', 'Order by area.', 'Solve an area problem.'],
  estimate: ['Estimate an area.', 'Count the cubes.', 'Choose a unit.', 'Solve a volume problem.'],
  time: ['Change time units.', 'Convert times.', 'Order times.', 'Solve a time problem.'],
  measureProblems: ['Add and subtract measures.', 'Solve in pence and grams.', 'Build a measure answer.', 'Solve a scaling problem.'],
};
