import { build, choice, decimal, grid, int, number, order, pick, shuffle, sort } from '../kit.js';

// Questions in one run must not repeat. Builders are called with index 0..4 on the
// same rng, so remember what this run has produced and redraw on a clash.
const seen = new WeakMap();
function fresh(rng, i, tag, make) {
  if (!seen.has(rng)) seen.set(rng, new Map());
  const runs = seen.get(rng);
  if (i === 0 || !runs.has(tag)) runs.set(tag, new Set());
  const used = runs.get(tag);
  let q;
  for (let tries = 0; tries < 40; tries++) {
    q = make();
    const key = JSON.stringify([q.prompt, q.visual, q.items?.map(x => x.label).sort(), q.cards?.map(x => x.label).sort(), q.time, q.options && [...q.options].sort()]);
    if (!used.has(key)) { used.add(key); break; }
  }
  return q;
}

const plural = (n, word) => `${n} ${n === 1 ? word.replace(/s$/, '') : word}`;
const pad = n => String(n).padStart(2, '0');
const pounds = p => p < 100 ? `${p}p` : `£${decimal(p)}`;

/* ---------- units ---------- */
const UNIT_PLANS = [
  { big: 'km', small: 'm', factor: 1000, bigOne: 'km' },
  { big: 'm', small: 'cm', factor: 100, bigOne: 'm' },
  { big: 'cm', small: 'mm', factor: 10, bigOne: 'cm' },
  { big: 'kg', small: 'g', factor: 1000, bigOne: 'kg' },
  { big: 'litres', small: 'ml', factor: 1000, bigOne: 'litre' },
  { big: 'hours', small: 'minutes', factor: 60, bigOne: 'hour' },
];
const unitStories = [
  r => { const total = int(r, 2, 5), ran = int(r, 1, total * 4 - 1) * 250;
    return [`A fun run is ${total} km long. Ava has run ${ran} m so far. How many more metres must she run?`, total * 1000 - ran]; },
  r => { const litres = int(r, 1, 3), poured = int(r, 1, litres * 4 - 1) * 250;
    return [`A jug holds ${plural(litres, 'litres')} of juice. Sam pours out ${poured} ml. How many ml are left in the jug?`, litres * 1000 - poured]; },
  r => { const metres = int(r, 2, 6), piece = pick(r, [20, 25, 50]);
    return [`A plank is ${metres} m long. It is cut into pieces that are each ${piece} cm long. How many pieces are there?`, metres * 100 / piece]; },
  r => { const kg = int(r, 1, 4), extra = int(r, 1, 9) * 100;
    return [`A parcel weighs ${kg} kg ${extra} g. What is its mass in grams?`, kg * 1000 + extra]; },
  r => { const cm = int(r, 3, 19) * 100;
    return [`A ribbon is ${cm} cm long. How many metres long is it?`, cm / 100]; },
  r => { const mins = int(r, 2, 6) * 60;
    return [`A long car journey takes ${mins} minutes. How many hours is that?`, mins / 60]; },
  r => { const mm = int(r, 4, 30) * 10;
    return [`A pencil is ${mm} mm long. How long is it in centimetres?`, mm / 10]; },
];

/* ---------- perimeter shapes ---------- */
// Points go clockwise on screen (y grows downwards); edge k joins point k to k+1.
function shapeOf(kind, r) {
  if (kind === 'square') { const s = int(r, 3, 9); return [[0,0],[s,0],[s,s],[0,s]]; }
  if (kind === 'rect') { let w = int(r, 4, 10), h = int(r, 2, 7); if (w === h) w += 1; return [[0,0],[w,0],[w,h],[0,h]]; }
  if (kind === 'L') { const w = int(r, 5, 10), h = int(r, 4, 8), a = int(r, 1, w - 2), b = int(r, 1, h - 2);
    return [[0,0],[w-a,0],[w-a,b],[w,b],[w,h],[0,h]]; }
  const w = int(r, 6, 10), h = int(r, 4, 7), a = int(r, 2, w - 4), p = int(r, 1, w - a - 1), d = int(r, 1, h - 2);
  return [[0,0],[p,0],[p,d],[p+a,d],[p+a,0],[w,0],[w,h],[0,h]];
}
const edges = points => points.map(([x,y],k) => { const [a,b] = points[(k+1)%points.length]; return Math.abs(x-a)+Math.abs(y-b); });
const sum = list => list.reduce((s,n) => s+n, 0);
// Edges to hide: each can be worked out from the edges that stay labelled.
const hideFor = (points, r) => points.length === 4 ? [2,3] : points.length === 6 ? pick(r, [[4,5],[0,3]]) : [6,7];
const shapeVisual = (points, unit, hidden = []) => ({ type: 'rectilinear', points, unit,
  labels: edges(points).map((len,k) => hidden.includes(k) ? '?' : String(len)) });

/* ---------- area shapes ---------- */
function areaCells(r, maxW = 6, maxH = 5) {
  const w = int(r, 3, maxW), h = int(r, 2, maxH);
  let cells = Array.from({length:w*h},(_,k) => [k%w, Math.floor(k/w)]);
  if (r() < .7) { // bite a rectangle out of one corner so the shape is rectilinear, not a rectangle
    const bw = int(r, 1, w-1), bh = int(r, 1, h-1), right = r() < .5, top = r() < .5;
    cells = cells.filter(([x,y]) => !((right ? x >= w-bw : x < bw) && (top ? y < bh : y >= h-bh)));
  }
  return { w, h, cells };
}

/* ---------- money and measures ---------- */
const MEASURE_KINDS = [
  { name: 'money', fmt: n => pounds(n), alt: n => n >= 100 && n % 100 ? `${n}p` : pounds(n), compare: 'Which amount of money is the most?' },
  { name: 'length', fmt: n => n >= 100 ? `${n/100 % 1 ? (n/100).toFixed(2).replace(/0$/,'') : n/100} m` : `${n} cm`, alt: n => `${n} cm`, compare: 'Which length is the longest?' },
  { name: 'mass', fmt: n => n >= 1000 ? `${(n/1000).toString()} kg` : `${n} g`, alt: n => `${n} g`, compare: 'Which mass is the heaviest?' },
  { name: 'capacity', fmt: n => n >= 1000 ? `${n/1000} ${n === 1000 ? 'litre' : 'litres'}` : `${n} ml`, alt: n => `${n} ml`, compare: 'Which amount of water is the most?' },
];
function measureSet(kind, r) {
  // Four close values in the small unit, written in mixed units.
  if (kind.name === 'money') { const base = int(r, 90, 380); const vals = [base, base + int(r,3,9), base + int(r,10,40), base + int(r,45,90)]; return vals; }
  if (kind.name === 'length') { const base = int(r, 8, 20) * 10; return [base, base + 5, base + int(r,2,4)*10, base + int(r,5,9)*10]; }
  const base = int(r, 6, 18) * 100; return [base, base + 50, base + int(r,2,4)*100, base + int(r,5,9)*100];
}
const showMeasure = (kind, n, r) => r() < .5 ? kind.fmt(n) : kind.alt(n);
// Rounding down both, rounding up both, then one either side: always three wrong estimates.
const nearMisses = (est, down, up) => [...new Set([down, up, est + 1, est - 1, est + 2])].filter(n => n !== est && n > 0).slice(0, 3);

/* ---------- time ---------- */
const partOfDay = h24 => h24 === 0 ? 'just after midnight' : h24 < 12 ? 'in the morning' : h24 < 18 ? 'in the afternoon' : 'in the evening';
const twelve = (h24, m) => `${h24 % 12 || 12}:${pad(m)} ${h24 < 12 ? 'am' : 'pm'}`;
const DURATIONS = [
  { big: 'hours', small: 'minutes', factor: 60 },
  { big: 'minutes', small: 'seconds', factor: 60 },
  { big: 'years', small: 'months', factor: 12 },
  { big: 'weeks', small: 'days', factor: 7 },
];

// [story, smallest and largest count of the big unit] for each pair of units.
const TIME_STORIES = {
  hours: [
    [(a, b) => `A film lasts ${a} and ${b}. How many minutes long is it?`, 1, 3],
    [(a, b) => `A train journey to Scotland takes ${a} and ${b}. How many minutes is that?`, 2, 6],
    [(a, b) => `Bix sleeps for ${a} and ${b}. How many minutes does he sleep?`, 8, 11],
  ],
  minutes: [
    [(a, b) => `Sam's egg timer runs for ${a} and ${b}. How many seconds is that?`, 2, 6],
    [(a, b) => `A song lasts ${a} and ${b}. How many seconds long is it?`, 2, 5],
    [(a, b) => `Mia runs once round the park in ${a} and ${b}. How many seconds does it take her?`, 3, 9],
  ],
  years: [
    [(a, b) => `Bix's cat is ${a} and ${b} old. How old is it in months?`, 2, 12],
    [(a, b) => `Leo is ${a} and ${b} old. How old is he in months?`, 7, 9],
    [(a, b) => `A tree was planted ${a} and ${b} ago. How many months ago was that?`, 2, 10],
  ],
  weeks: [
    [(a, b) => `The summer holiday lasts ${a} and ${b}. How many days is that?`, 5, 6],
    [(a, b) => `A sunflower seed takes ${a} and ${b} to grow its first leaves. How many days is that?`, 1, 3],
    [(a, b) => `Ava's broken arm is in a cast for ${a} and ${b}. How many days is that?`, 4, 8],
  ],
};

/** Year 4 Maths builders: (level, rng, index) => one question. */
export const BUILDERS = {
  units(l,r,i) {
    return fresh(r, i, `units${l}`, () => {
      if (l === 4) { const [prompt, answer] = unitStories[(i + int(r, 0, 6)) % unitStories.length](r); return number(prompt, answer); }
      const plan = UNIT_PLANS[(i + int(r, 0, 5)) % UNIT_PLANS.length], n = int(r, 2, 15);
      if (l === 1) return number(`Convert ${n} ${plan.big} to ${plan.small}.`, n * plan.factor, { rule: `1 ${plan.bigOne} = ${plan.factor} ${plan.small}. Multiply by ${plan.factor}.` });
      if (l === 2) return number(`${n * plan.factor} ${plan.small} is how many ${plan.big}?`, n);
      // Level 3: match mixed-unit cards to their equal measure in the small unit.
      const halfable = plan.factor % 2 === 0, base = int(r, 1, 4), half = plan.factor / 2;
      const values = halfable ? [base * plan.factor, base * plan.factor + half, (base + 1) * plan.factor] : [base * plan.factor, (base + 1) * plan.factor, (base + 2) * plan.factor];
      const bins = values.map(v => `${v} ${plan.small}`);
      const big = v => v / plan.factor, one = v => plural(big(v), plan.big);
      const cards = [];
      for (const v of values) {
        const whole = Math.floor(big(v)), rest = v - whole * plan.factor;
        if (rest === 0) cards.push([one(v), `${v} ${plan.small}`]);
        else {
          if (plan.small !== 'minutes') cards.push([`${big(v)} ${plan.big}`, `${v} ${plan.small}`]);
          cards.push([`${plural(whole, plan.big)} ${rest} ${plan.small}`, `${v} ${plan.small}`]);
        }
      }
      if (plan.small === 'minutes') cards.push([`${base} and a half hours`, `${values[1]} minutes`]);
      return sort('Match each measure to its equal measure.', bins, shuffle(cards, r));
    });
  },

  perimeter(l,r,i) {
    return fresh(r, i, `perimeter${l}`, () => {
      if (l === 1) {
        const points = shapeOf(i % 3 === 2 ? 'square' : 'rect', r);
        return number('Find the perimeter of this shape in cm.', sum(edges(points)), { visual: shapeVisual(points, 'cm'), unit: 'cm', rule: 'Perimeter is the total length around the outside. Add every side.' });
      }
      if (l === 2) {
        const points = shapeOf(i % 2 ? 'U' : 'L', r), hidden = hideFor(points, r);
        return number('Some sides have no length. Work them out, then find the perimeter in cm.', sum(edges(points)), { visual: shapeVisual(points, 'cm', hidden), unit: 'cm',
          hint: 'Opposite sides together must match. The short edges along the top add up to the whole bottom.' });
      }
      if (l === 3) {
        const points = shapeOf(i % 2 ? 'L' : 'U', r), lens = edges(points);
        return build('Build the perimeter: add every outside edge once.', lens.flatMap((len,k) => k ? ['+', String(len)] : [String(len)]), r,
          { visual: shapeVisual(points, 'cm'), unit: 'cm', maths: { kind: 'value', value: sum(lens) } });
      }
      const story = (i + int(r, 0, 3)) % 4;
      if (story === 0) { const s = int(r, 4, 25); return number(`A square field has sides of ${s} m. A fence goes all the way round it. How many metres of fence are needed?`, 4 * s); }
      if (story === 1) { let a = int(r, 6, 20), b = int(r, 3, 12), gate = int(r, 1, 3); if (a === b) a += 1;
        return number(`A rectangular garden is ${a} m long and ${b} m wide. A fence goes all the way round, except for a ${gate} m gate. How many metres of fence are needed?`, 2 * (a + b) - gate); }
      const points = shapeOf(story === 2 ? 'U' : 'L', r), hidden = hideFor(points, r);
      return number('This playground has a fence along every outside edge. Some lengths are missing. How many metres of fence are needed?', sum(edges(points)), { visual: shapeVisual(points, 'm', hidden), unit: 'm' });
    });
  },

  area(l,r,i) {
    return fresh(r, i, `area${l}`, () => {
      if (l === 1) { const { w, h, cells } = areaCells(r); return number('Each small square is 1 square unit. What is the area of the coloured shape?', cells.length, { visual: grid(w, h, cells), rule: 'Area is the space inside. Count the coloured squares. Each one is 1 square unit.' }); }
      if (l === 2) {
        const a = areaCells(r, 4, 5); let b = areaCells(r, 4, 5);
        for (let tries = 0; tries < 20 && b.cells.length === a.cells.length; tries++) b = areaCells(r, 4, 5);
        if (b.cells.length === a.cells.length) b = { ...b, cells: b.cells.slice(0, -1) }; // never a tie
        const h = Math.max(a.h, b.h), cells = [...a.cells, ...b.cells.map(([x,y]) => [x + a.w + 1, y])];
        const diff = Math.abs(a.cells.length - b.cells.length), big = Math.max(a.cells.length, b.cells.length);
        return choice('There are two shapes on the grid. How many more squares does the bigger shape cover?', diff,
          [diff + 1, diff - 1, big, diff + 2].filter(n => n > 0 && n !== diff).slice(0, 3), r, { visual: grid(a.w + b.w + 1, h, cells) });
      }
      if (l === 3) {
        const pairs = { 8: [[2,4]], 10: [[2,5]], 12: [[2,6],[3,4]], 15: [[3,5]], 16: [[2,8],[4,4]], 18: [[2,9],[3,6]], 20: [[2,10],[4,5]], 24: [[3,8],[4,6]] };
        const doubles = shuffle(Object.keys(pairs).filter(k => pairs[k].length === 2), r).slice(0, 2).map(Number);
        const single = pick(r, Object.keys(pairs).map(Number).filter(k => !doubles.includes(k)));
        const areas = [...doubles, single].sort((x,y) => x - y);
        const cards = areas.flatMap(area => pairs[area].map(([x,y]) => r() < .5 ? [x,y] : [y,x])).map(([x,y]) => [`${x} × ${y} rectangle`, `${x*y} squares`]);
        return sort('Sort the rectangles by their area. Think of rows of squares.', areas.map(a => `${a} squares`), shuffle(cards, r), { hint: 'A 3 × 4 rectangle is 3 rows of 4 squares.' });
      }
      const { w, h, cells } = areaCells(r, 7, 5), laid = int(r, 2, cells.length - 2);
      const thing = pick(r, [['patio', 'slabs'], ['floor', 'carpet tiles'], ['wall', 'tiles']]);
      return number(`Bix is covering this ${thing[0]} with ${thing[1]}. Each square is 1 square metre. He has already laid ${laid} ${thing[1]}. How many more does he need?`, cells.length - laid, { visual: grid(w, h, cells), laid });
    });
  },

  money(l,r,i) {
    return fresh(r, i, `money${l}`, () => {
      const kind = MEASURE_KINDS[(i + int(r, 0, 3)) % MEASURE_KINDS.length];
      if (l === 1) { // compare
        const vals = shuffle(measureSet(kind, r), r).slice(0, 3), top = Math.max(...vals);
        const labels = vals.map(v => showMeasure(kind, v, r));
        return choice(kind.compare, labels[vals.indexOf(top)], labels.filter((_,k) => vals[k] !== top), r,
          { rule: '£1 = 100p, 1 m = 100 cm, 1 kg = 1000 g, 1 litre = 1000 ml. Change to the same unit, then compare.' });
      }
      if (l === 2) { // estimate
        const near = () => pick(r, [int(r, 10, 35), int(r, 65, 90)]);
        if (kind.name === 'money' || kind.name === 'length') {
          const a = int(r, 1, 6) * 100 + near(), b = int(r, 1, 6) * 100 + near(), est = Math.round(a/100) + Math.round(b/100);
          const fmt = kind.name === 'money' ? n => `£${decimal(n)}` : n => `${decimal(n)} m`;
          const whole = kind.name === 'money' ? n => `about £${n}` : n => `about ${n} m`;
          const wrong = nearMisses(est, Math.floor(a/100) + Math.floor(b/100), Math.ceil(a/100) + Math.ceil(b/100));
          const prompt = kind.name === 'money' ? `A comic costs ${fmt(a)} and a toy costs ${fmt(b)}. Estimate the total.` : `One rope is ${fmt(a)} long and another is ${fmt(b)} long. Estimate their total length.`;
          return choice(prompt, whole(est), wrong.map(whole), r, { hint: 'Round each amount to the nearest whole one first.' });
        }
        const a = int(r, 1, 6) * 1000 + near() * 10, b = int(r, 1, 6) * 1000 + near() * 10, est = Math.round(a/1000) + Math.round(b/1000);
        const unit = kind.name === 'mass' ? 'kg' : 'litres';
        const prompt = kind.name === 'mass' ? `A bag of potatoes weighs ${a/1000} kg and a bag of apples weighs ${b/1000} kg. Estimate their total mass.` : `A bucket holds ${a/1000} litres and a jug holds ${b/1000} litres. Estimate how much they hold altogether.`;
        return choice(prompt, `about ${est} ${unit}`, nearMisses(est, Math.floor(a/1000) + Math.floor(b/1000), Math.ceil(a/1000) + Math.ceil(b/1000)).map(n => `about ${n} ${unit}`), r, { hint: 'Round each amount to the nearest whole one first.' });
      }
      if (l === 3) { // order mixed units
        const vals = measureSet(kind, r), labels = new Map(vals.map(v => [v, showMeasure(kind, v, r)]));
        return order(`Order these ${kind.name === 'money' ? 'amounts of money' : `${kind.name}s`} from smallest to largest.`.replace('capacitys', 'capacities').replace('masss', 'masses'), vals, r, v => labels.get(v), { hint: 'Change them all to the same unit first.' });
      }
      // Level 4: calculate — change from a note, or what is left of a measure.
      const story = (i + int(r, 0, 3)) % 4;
      if (story === 0) { const note = pick(r, [5, 10, 20]), a = int(r, 101, note * 50 - 1), b = int(r, 101, note * 50 - 1);
        return number(`You buy a book for £${decimal(a)} and a pen for £${decimal(b)}. You pay with a £${note} note. How much change do you get, in pence?`, note * 100 - a - b, { calc: { op: 'change', note, spend: [a, b] } }); }
      if (story === 1) { const a = int(r, 2, 9) * 25, b = int(r, 2, 9) * 25, litres = 1 + int(r, 0, 1);
        return number(`A bottle holds ${plural(litres, 'litres')} of water. Mia drinks ${a} ml and Leo drinks ${b} ml. How many ml are left?`, litres * 1000 - a - b, { calc: { op: 'left', whole: litres * 1000, spend: [a, b] } }); }
      if (story === 2) { const kg = int(r, 1, 3), g = int(r, 1, 9) * 50, more = int(r, 2, 9) * 100;
        return number(`A parcel weighs ${kg} kg ${g} g. A book weighing ${more} g is added. What is the total mass in grams?`, kg * 1000 + g + more, { calc: { op: 'add', parts: [kg * 1000 + g, more] } }); }
      const cost = int(r, 105, 395), count = int(r, 2, 4);
      return number(`One sandwich costs £${decimal(cost)}. How much do ${count} sandwiches cost, in pence?`, cost * count, { calc: { op: 'times', parts: [cost, count] } });
    });
  },

  time(l,r,i) {
    return fresh(r, i, `time${l}`, () => {
      if (l === 1) { // read the analogue clock, write 24-hour time; minutes in fives
        const hour = int(r, 1, 12), minute = int(r, 0, 11) * 5, pm = hour === 12 || r() > .5, h24 = hour % 12 + (pm ? 12 : 0);
        const answer = `${pad(h24)}:${pad(minute)}`;
        const wrong = [`${pad((h24 + 12) % 24)}:${pad(minute)}`, `${pad((h24 + 1) % 24)}:${pad(minute)}`, `${pad(h24)}:${pad(minute / 5)}`].filter(x => x !== answer);
        return choice(`This clock shows a time ${partOfDay(h24)}. Which 24-hour time matches it?`, answer, wrong, r,
          { visual: { type: 'clock', hour, minute }, rule: 'From 1 pm, add 12 to the hour: 3 pm is 15:00. Noon is 12:00.' });
      }
      if (l === 2) { // 24-hour to 12-hour, any minute
        const h24 = int(r, 0, 23), minute = int(r, 1, 59), answer = twelve(h24, minute);
        const swapped = twelve((h24 + 12) % 24, minute), minus = twelve((h24 + 23) % 24, minute);
        const dropped = h24 >= 13 && h24 - 10 <= 12 ? `${h24 - 10}:${pad(minute)} pm` : twelve((h24 + 1) % 24, minute); // 17:45 misread as 7:45
        return choice(`Which 12-hour time is the same as ${pad(h24)}:${pad(minute)}?`, answer, [swapped, dropped, minus], r, { hint: 'From 13:00 onwards, take away 12 and write pm.' });
      }
      if (l === 3) { // set the analogue clock from a 24-hour time with its part of the day
        const h24 = int(r, 0, 23), minute = int(r, 0, 59), hour = h24 % 12 || 12;
        return { kind: 'clock', mode: 'set', time: { hour, minute }, start: { hour: hour === 12 ? 1 : 12, minute: 0 }, minuteStep: 1,
          prompt: `A digital clock shows ${pad(h24)}:${pad(minute)} ${partOfDay(h24)}. Set the analogue clock to the same time.` };
      }
      // Level 4: use a 24-hour timetable with a 12-hour watch.
      const [what, place] = pick(r, [['bus', 'bus station'], ['train', 'railway station'], ['ferry', 'ferry port']]), first = int(r, 13, 19), gap = int(r, 4, 9) * 5, start = first * 60 + int(r, 0, 11) * 5;
      const times = [0, 1, 2].map(k => start + k * gap * 2), target = int(r, 1, 2), arrive = times[target] - int(r, 1, gap * 2 - 1);
      const fmt = t => `${pad(Math.floor(t / 60))}:${pad(t % 60)}`;
      if (r() < .5) {
        return number(`The ${what} timetable shows ${times.map(fmt).join(', ')}. Ella's watch shows ${twelve(Math.floor(arrive / 60), arrive % 60)} when she arrives. When does her next ${what} leave? Type the 24-hour time without the colon.`, Number(fmt(times[target]).replace(':', '')));
      }
      const t = times[target];
      return number(`Ella's ${what} leaves at ${twelve(Math.floor(t / 60), t % 60)}. The clock at the ${place} uses the 24-hour clock. What will it show? Type it without the colon.`, Number(fmt(t).replace(':', '')));
    });
  },

  timeProblems(l,r,i) {
    return fresh(r, i, `timeProblems${l}`, () => {
      const d = DURATIONS[(i + int(r, 0, 3)) % 4], n = int(r, 2, 9);
      if (l === 1) return number(`How many ${d.small} are in ${n} ${d.big}?`, n * d.factor, { rule: `1 ${d.big.slice(0, -1)} = ${d.factor} ${d.small}. Multiply by ${d.factor}.` });
      if (l === 2) return number(`How many ${d.big} are the same as ${n * d.factor} ${d.small}?`, n);
      if (l === 3) {
        const a = int(r, 1, 2) * d.factor, picks = new Set([a, a + d.factor]);
        const between = Array.from({ length: 3 * d.factor }, (_, k) => k + 1).filter(v => v >= d.factor / 2 && v % d.factor);
        for (const v of shuffle(between, r)) { if (picks.size === 4) break; picks.add(v); }
        const label = v => v % d.factor === 0 && r() < .8 ? plural(v / d.factor, d.big) : plural(v, d.small);
        return order('Order these durations from shortest to longest.', [...picks], r, label, { hint: `Change them all to ${d.small}.` });
      }
      // Level 4: a story in a sensible context; sizes suit the context, words agree with the number.
      const [story, low, high] = pick(r, TIME_STORIES[d.big]);
      const big = int(r, low, high), small = int(r, 1, d.factor - 1);
      return number(story(plural(big, d.big), plural(small, d.small)), big * d.factor + small);
    });
  },
};

/** Per-topic challenge titles: { builderKey: [four titles] }. */
export const TOPIC_TITLES = {
  units: ['Convert big units to small.', 'Convert small units to big.', 'Match equal measures.', 'Solve a units problem.'],
  perimeter: ['Add the sides all round.', 'Find missing sides, then add.', 'Build a perimeter sum.', 'Fence a garden in metres.'],
  area: ['Count the squares inside.', 'Compare two areas.', 'Sort rectangles by area.', 'Finish covering the floor.'],
  money: ['Find the biggest amount.', 'Estimate to the nearest whole.', 'Order mixed measures.', 'Work out totals and change.'],
  time: ['Read the clock in 24-hour time.', 'Change 24-hour to 12-hour.', 'Set the analogue clock.', 'Use a 24-hour timetable.'],
  timeProblems: ['Use a time rule.', 'Convert back to bigger units.', 'Order mixed durations.', 'Solve a time problem.'],
};
