import { choice, choiceN, int, number, orderBy, pick, shuffle, NAMES } from '../kit.js';

const NAME = r => pick(r, NAMES);

// Line-graph contexts: x labels, vertical axis title, unit, scale gridline step, value unit (values are multiples of it).
const CONTEXTS = [
  { title: 'Temperature during the day', labels: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'], axis: 'Temperature (°C)', unit: '°C', step: 4, unitStep: 2, base: 4, noun: 'temperature', pair: ['Town A', 'Town B'] },
  { title: 'A cyclist riding away from home', labels: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00'], axis: 'Distance from home (km)', unit: 'km', step: 10, unitStep: 5, base: 10, noun: 'distance from home', pair: ['Amy', 'Ben'] },
  { title: 'A plant growing', labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'], axis: 'Height (cm)', unit: 'cm', step: 10, unitStep: 5, base: 5, noun: 'height', pair: ['Plant A', 'Plant B'] },
  { title: 'Water in a tank', labels: ['1 min', '2 min', '3 min', '4 min', '5 min', '6 min'], axis: 'Water (litres)', unit: 'litres', step: 20, unitStep: 10, base: 10, noun: 'amount of water', pair: ['Tank A', 'Tank B'] },
  { title: 'Visitors to a museum', labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], axis: 'Visitors (hundreds)', unit: 'hundred visitors', step: 4, unitStep: 2, base: 2, noun: 'number of visitors', pair: ['Museum A', 'Museum B'] },
];

/** Six different values (multiples of `unit`) arranged to rise then fall, or fall then rise. */
function hillValues(r, unit, base, count = 6, poolSize = 14) {
  const pool = shuffle(Array.from({ length: poolSize }, (_, k) => (base / unit + k + 1) * unit), r).slice(0, count).sort((a, b) => a - b);
  const hill = [pool[1], pool[3], pool[5], pool[4], pool[2], pool[0]];
  return pick(r, [true, false]) ? hill : hill.map(v => pool[0] + pool[5] - v);
}
const graphVisual = (ctx, series, extra = {}) => ({ type: 'lineGraph', title: ctx.title, labels: ctx.labels, axis: ctx.axis, step: ctx.step, series, ...extra });

// Timetables: a service leaves the first stop and reaches each later stop after its leg times.
const STOP_SETS = [['Ashby', 'Brookfield', 'Carlton', 'Dunmore'], ['Elmwood', 'Fairford', 'Grove Park', 'Hill End'], ['Marsh Lane', 'Newbridge', 'Oakley', 'Pine Road']];
const mins = (h, m) => h * 60 + m;
const clock = t => `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
function timetable(r) {
  const stops = pick(r, STOP_SETS).slice(0, int(r, 3, 4));
  const legsBase = stops.slice(1).map(() => int(r, 8, 22)), start = mins(int(r, 7, 9), pick(r, [0, 10, 20, 30, 40, 50]));
  const services = [];
  let dep = start;
  const seen = new Set();
  for (let s = 0; s < 4; s++) {
    let legs = legsBase.map(l => l + int(r, 0, 6));
    // Different total journey times, so "quickest" and ordering are never tied.
    while (seen.has(legs.reduce((a, b) => a + b, 0))) legs = [legs[0] + 1, ...legs.slice(1)];
    seen.add(legs.reduce((a, b) => a + b, 0));
    const times = [dep];
    legs.forEach(l => times.push(times[times.length - 1] + l));
    services.push({ times, legs });
    dep += pick(r, [20, 30, 40, 45]);
  }
  return { stops, services };
}
const ttVisual = tt => ({ type: 'table5', title: 'Bus timetable', headers: ['Service', ...tt.stops], rows: tt.services.map((s, k) => [`Bus ${k + 1}`, ...s.times.map(clock)]) });
const journey = (s, a, b) => s.times[b] - s.times[a];

export const BUILDERS = {
  lineGraphs(l, r, i) {
    const ctx = CONTEXTS[(i + int(r, 0, 4)) % 5], unit = l === 1 ? ctx.step : ctx.unitStep, values = hillValues(r, unit, l === 1 ? ctx.step : ctx.base, 6, l === 1 ? 7 : 14);
    const visual = graphVisual(ctx, [{ name: ctx.noun, values }]);
    const at = k => `${ctx.labels[k]}`;
    if (l === 1) {
      const k = i, v = values[k], wrong = [v + ctx.step, v - ctx.step, v + unit, v - unit].filter(x => x > 0 && x !== v);
      return choiceN(`What was the ${ctx.noun} at ${at(k)}? (${ctx.unit})`, v, wrong, r, { visual, rule: 'Find the time along the bottom. Go up to the line, then across to the scale on the left.' });
    }
    const hi = Math.max(...values), lo = Math.min(...values), a = int(r, 0, 2), b = int(r, 3, 5);
    if (l === 2) {
      return [
        () => number(`What was the ${ctx.noun} at ${at(a)}, in ${ctx.unit}?`, values[a], { visual, maxDigits: 3, hint: 'The scale goes up in equal steps. Some points are halfway between two numbers.' }),
        () => number(`How much ${values[b] >= values[a] ? 'higher' : 'lower'} was the ${ctx.noun} at ${at(b)} than at ${at(a)}, in ${ctx.unit}?`, Math.abs(values[b] - values[a]), { visual, maxDigits: 3 }),
        () => number(`What was the highest ${ctx.noun} shown on the graph, in ${ctx.unit}?`, hi, { visual, maxDigits: 3 }),
        () => number(`What is the difference between the highest and lowest ${ctx.noun}, in ${ctx.unit}?`, hi - lo, { visual, maxDigits: 3 }),
        () => number(`Add the ${ctx.noun} at ${at(a)} and at ${at(b)}. What is the total, in ${ctx.unit}?`, values[a] + values[b], { visual, maxDigits: 3 }),
      ][i]();
    }
    if (l === 3) {
      const entries = values.slice(0, 4).map((v, k) => ({ value: v, label: at(k) }));
      return orderBy(`Put these times in order of ${ctx.noun}, from the lowest to the highest.`, entries, r, { visual, hint: 'Read each point on the line. Which is lowest on the scale?' });
    }
    const other = values.map((v, k) => { const d = (1 + ((k + i) % 3)) * unit; return v - d >= ctx.base ? v - d : v + d; });
    const [nameA, nameB] = ctx.pair, two = graphVisual(ctx, [{ name: nameA, values }, { name: nameB, values: other }]);
    const k = int(r, 0, 5), j = (k + 2) % 6;
    return [
      () => number(`The graph shows ${nameA} and ${nameB}. At ${at(k)}, what is the difference between the two readings, in ${ctx.unit}?`, Math.abs(values[k] - other[k]), { visual: two, maxDigits: 3 }),
      () => number(`The graph shows ${nameA} and ${nameB}. At ${at(k)}, what is the sum of the two readings, in ${ctx.unit}?`, values[k] + other[k], { visual: two, maxDigits: 3 }),
      () => number(`The graph shows ${nameA} and ${nameB}. How much did ${nameA}'s reading change between ${at(k)} and ${at(j)}, in ${ctx.unit}?`, Math.abs(values[k] - values[j]), { visual: two, maxDigits: 3 }),
      () => number(`The graph shows ${nameA} and ${nameB}. What was ${nameB}'s highest reading, in ${ctx.unit}?`, Math.max(...other), { visual: two, maxDigits: 3 }),
      () => number(`The graph shows ${nameA} and ${nameB}. What is ${nameB}'s reading at ${at(k)} added to ${nameB}'s reading at ${at(j)}, in ${ctx.unit}?`, other[k] + other[j], { visual: two, maxDigits: 3 }),
    ][i]();
  },
  timetables(l, r, i) {
    const tt = timetable(r), last = tt.stops.length - 1, visual = ttVisual(tt), s = int(r, 0, 3), stopIdx = int(r, 1, last);
    if (l === 1) {
      const svc = tt.services[s], answer = svc.times[stopIdx];
      const pickFrom = [
        () => [`Bus ${s + 1} leaves ${tt.stops[0]} at ${clock(svc.times[0])}. What time does it reach ${tt.stops[stopIdx]}?`, answer, tt.services.map(x => x.times[stopIdx])],
        () => [`Which bus reaches ${tt.stops[stopIdx]} at ${clock(answer)}?`, s, null],
        () => [`What time does the first bus reach ${tt.stops[stopIdx]}?`, tt.services[0].times[stopIdx], tt.services.map(x => x.times[stopIdx])],
        () => [`What time does the last bus leave ${tt.stops[0]}?`, tt.services[3].times[0], tt.services.map(x => x.times[0])],
        () => [`What time does Bus ${s + 1} reach ${tt.stops[last]}?`, svc.times[last], tt.services.map(x => x.times[last])],
      ][i]();
      const [prompt, ans, pool] = pickFrom;
      if (pool === null) return choice(prompt, `Bus ${ans + 1}`, tt.services.map((_, k) => `Bus ${k + 1}`).filter((_, k) => k !== ans), r, { visual, rule: 'Read along the row for the bus. Times are in 24-hour style, like 09:15.' });
      const wrong = [...new Set([...pool.filter(t => t !== ans), ans + 10, ans - 10])].filter(t => t !== ans).slice(0, 3);
      return choice(prompt, clock(ans), wrong.map(clock), r, { visual, rule: 'Read along the row for the bus. Times are in 24-hour style, like 09:15.' });
    }
    if (l === 2) {
      const svc = tt.services[s], from = int(r, 0, last - 1), to = int(r, from + 1, last);
      return [
        () => number(`How many minutes does Bus ${s + 1} take to travel from ${tt.stops[from]} to ${tt.stops[to]}?`, journey(svc, from, to), { visual, maxDigits: 3 }),
        () => number(`How many minutes after Bus 1 does Bus 2 leave ${tt.stops[0]}?`, tt.services[1].times[0] - tt.services[0].times[0], { visual, maxDigits: 3 }),
        () => number(`How many minutes does Bus ${s + 1} take to travel from ${tt.stops[0]} to ${tt.stops[last]}?`, journey(svc, 0, last), { visual, maxDigits: 3 }),
        () => { const wait = int(r, 1, 9), arrive = tt.services[1].times[0] - wait; return number(`${NAME(r)} gets to ${tt.stops[0]} at ${clock(arrive)}. How many minutes must they wait for the next bus?`, wait, { visual, maxDigits: 3 }); },
        () => number(`How many minutes does Bus ${s + 1} take to travel from ${tt.stops[last - 1]} to ${tt.stops[last]}?`, journey(svc, last - 1, last), { visual, maxDigits: 3 }),
      ][i]();
    }
    if (l === 3) {
      const entries = tt.services.map((x, k) => ({ value: journey(x, 0, last), label: `Bus ${k + 1}` }));
      return orderBy(`Put the buses in order of journey time from ${tt.stops[0]} to ${tt.stops[last]}, quickest first.`, entries, r, { visual, hint: 'Work out each journey: the last time take away the first time.' });
    }
    const name = NAME(r);
    return [
      () => {
        // The latest bus that still arrives by the deadline.
        const k = int(r, 1, 2), deadline = tt.services[k].times[last] + int(r, 0, 4);
        return choice(`${name} must reach ${tt.stops[last]} by ${clock(deadline)}. Which is the latest bus ${name} can catch from ${tt.stops[0]}?`, `Bus ${k + 1}`, tt.services.map((_, x) => `Bus ${x + 1}`).filter((_, x) => x !== k), r, { visual, rule: 'The bus must arrive by the time, not just leave by it.' });
      },
      () => { const wait = int(r, 3, 12), arrive = tt.services[s].times[0] - wait; return number(`${name} arrives at ${tt.stops[0]} at ${clock(arrive)} and catches Bus ${s + 1}. How many minutes after arriving does ${name} reach ${tt.stops[last]}?`, wait + journey(tt.services[s], 0, last), { visual, maxDigits: 3 }); },
      () => {
        const [a, b, c] = [int(r, 8, 20), int(r, 8, 20), int(r, 8, 20)], d = int(r, 6, 15), e = int(r, 6, 15);
        const table = { type: 'table5', title: 'Pupils in Years 4, 5 and 6', headers: ['', 'Year 4', 'Year 5', 'Year 6'], rows: [['Boys', a, b, c], ['Girls', d, e, c + 2]].map(row => row.map(String)) };
        return number('How many children are in Year 5 altogether? Use the table.', b + e, { visual: table, maxDigits: 3 });
      },
      () => number(`How many minutes shorter is the quickest bus than the slowest bus, from ${tt.stops[0]} to ${tt.stops[last]}?`, Math.max(...tt.services.map(x => journey(x, 0, last))) - Math.min(...tt.services.map(x => journey(x, 0, last))), { visual, maxDigits: 3 }),
      () => {
        const items = [['Apples', int(r, 12, 40)], ['Pears', int(r, 12, 40)], ['Plums', int(r, 12, 40)]], days = ['Monday', 'Tuesday'];
        const rows = items.map(([n, v]) => [n, String(v), String(v + int(r, 3, 15))]);
        const table = { type: 'table5', title: 'Fruit sold at a stall', headers: ['Fruit', ...days], rows };
        const k = int(r, 0, 2);
        return number(`How many ${rows[k][0].toLowerCase()} were sold on Monday and Tuesday together? Use the table.`, Number(rows[k][1]) + Number(rows[k][2]), { visual: table, maxDigits: 3 });
      },
    ][i]();
  },
};

export const TOPIC_TITLES = {
  lineGraphs: ['Read a line graph.', 'Find the differences.', 'Order the readings.', 'Compare two line graphs.'],
  timetables: ['Read a timetable.', 'Work out journey times.', 'Order the journeys.', 'Plan with tables.'],
};
