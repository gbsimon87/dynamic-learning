import { int, pick, number, order, sort, shuffle } from '../kit.js';

/** `n` different multiples of `step` between low*step and high*step, in random order. */
const distinct = (r, n, low, high, step = 5) => shuffle(Array.from({ length: high - low + 1 }, (_, k) => (low + k) * step), r).slice(0, n);

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const TIMES = ['09:00', '10:00', '11:00', '12:00', '13:00'];
const BAR_CONTEXTS = [
  { noun: 'visitors', verb: 'came to the museum' },
  { noun: 'books', verb: 'were borrowed from the library' },
  { noun: 'cups of juice', verb: 'were sold at the café' },
  { noun: 'children', verb: 'used the swimming pool' },
];
const DATA_CONTEXTS = [
  { noun: 'trees', title: 'trees in the park', symbol: '🌳', labels: ['Oak', 'Pine', 'Birch', 'Ash', 'Elm', 'Willow'] },
  { noun: 'birds', title: 'birds spotted', symbol: '🐦', labels: ['Robins', 'Sparrows', 'Blackbirds', 'Magpies', 'Pigeons', 'Wrens'] },
  { noun: 'votes', title: 'votes for a class pet', symbol: '✋', labels: ['Rabbit', 'Hamster', 'Fish', 'Guinea pig', 'Tortoise', 'Budgie'] },
  { noun: 'pieces of fruit', title: 'fruit sold', symbol: '🍎', labels: ['Apples', 'Bananas', 'Pears', 'Plums', 'Oranges', 'Grapes'] },
];

/** Five hourly temperatures (multiples of 5, 5–35 °C) that rise to a peak then fall, or fall then rise. No two neighbours equal. */
function temperatures(r) {
  const turn = int(r, 1, 3), peak = r() < 0.6, start = int(r, peak ? 1 : 3, peak ? 3 : 5) * 5;
  const values = [start];
  for (let k = 1; k < 5; k++) {
    const up = peak ? k <= turn : k > turn, move = int(r, 1, 2) * 5;
    values.push(up ? values[k - 1] + (values[k - 1] >= 25 ? 5 : move) : Math.max(5, values[k - 1] - move));
    if (values[k] === values[k - 1]) values[k] = values[k - 1] + 5;
  }
  return values;
}

/** Ten distinct (earlier, later) pairs of time indices; each question takes one of two, so a run never repeats an interval. */
const PAIRS = [[0, 2], [1, 3], [2, 4], [0, 3], [1, 4], [0, 1], [3, 4], [2, 3], [1, 2], [0, 4]];

/** Year 4 Maths builders: (level, rng, index) => one question. */
export const BUILDERS = {
  graphs(l, r, i) {
    if (l === 1) {
      const ctx = pick(r, BAR_CONTEXTS), values = distinct(r, 5, 1, 9);
      const rows = DAYS.map((label, k) => ({ label, value: values[k] })), day = DAYS[i % 5];
      return { kind: 'chart', prompt: `How many ${ctx.noun} ${ctx.verb} on **${day}**?`,
        chart: { type: 'bar', step: 5, unit: ctx.noun, rows }, ask: { op: 'value', label: day }, answer: values[i % 5], maxDigits: 6,
        rule: 'Read the top of the bar against the scale. Each scale step is 5.' };
    }
    if (l === 3) {
      const skip = PAIRS[(i * 2 + int(r, 0, 1)) % 10], days = DAYS.filter((_, k) => !skip.includes(k)), values = distinct(r, 3, 1, 8);
      const rows = days.map((label, k) => ({ label, value: values[k] }));
      return sort(`Build a bar chart to show the visitors on ${days[0]}, ${days[1]} and ${days[2]}.`, rows.map(row => String(row.value)), rows.map(row => [row.label, String(row.value)]),
        { interaction: 'chartBuild', chart: { rows, step: 5 }, visual: { type: 'table', rows } });
    }
    let values = temperatures(r), p = (i * 2 + int(r, 0, 1)) % 10;
    for (let tries = 0; tries < 20 && values[PAIRS[p][0]] === values[PAIRS[p][1]]; tries++) values = temperatures(r);
    // A fixed random source can keep giving the same graph: move to the next interval rather than loop forever.
    while (values[PAIRS[p][0]] === values[PAIRS[p][1]]) p = (p + 1) % 10;
    const [a, b] = PAIRS[p];
    const visual = { type: 'line', values, labels: TIMES, unit: 'Temperature (°C)' };
    if (l === 2) {
      const k = i % 5;
      return number(`What was the temperature at **${TIMES[k]}**, in °C?`, values[k], { visual,
        hint: 'Find the time on the bottom, go up to the line, then across to the scale.' });
    }
    const rise = values[b] > values[a];
    return number(`Bix checked the thermometer at ${TIMES[a]} and again at ${TIMES[b]}. By how many degrees did the temperature **${rise ? 'rise' : 'fall'}**?`,
      Math.abs(values[b] - values[a]), { visual, hint: 'Read both temperatures, then subtract the smaller from the bigger.' });
  },
  data(l, r, i) {
    // Prompts lean on the context, so neighbouring questions in a run use different ones.
    const ctx = DATA_CONTEXTS[i % DATA_CONTEXTS.length], labels = shuffle(ctx.labels, r).slice(0, 4);
    if (l === 3) {
      const values = distinct(r, 4, 1, 12), rows = labels.map((label, k) => ({ label, value: values[k] }));
      const most = (i % 2 === 1) !== (i === 4), name = n => rows.find(row => row.value === Math.abs(n)).label;
      return order(`Order the ${ctx.title} from ${most ? '**most** to **fewest**' : '**fewest** to **most**'}.`,
        most ? values.map(v => -v) : values, r, name, { visual: { type: 'table', rows } });
    }
    if (l === 2) {
      const ratio = pick(r, [2, 4, 10]), values = distinct(r, 4, 1, 8, ratio), rows = labels.map((label, k) => ({ label, value: values[k] }));
      const chart = { type: 'pictogram', rows, ratio, symbol: ctx.symbol, unit: ctx.noun };
      const [x, y] = shuffle(rows, r), [big, small] = x.value > y.value ? [x, y] : [y, x];
      const key = `Each ${ctx.symbol} stands for ${ratio} ${ctx.noun}.`;
      if (i === 0) return { kind: 'chart', chart, ask: { op: 'value', label: x.label }, answer: x.value, maxDigits: 6,
        prompt: `${key} How many ${ctx.noun} for **${x.label}**?` };
      if (i === 1) return { kind: 'chart', chart, ask: { op: 'total' }, answer: values.reduce((s, v) => s + v, 0), maxDigits: 6,
        prompt: `${key} How many ${ctx.noun} altogether?` };
      if (i === 2) return { kind: 'chart', chart, answer: x.value + y.value, maxDigits: 6,
        prompt: `${key} How many ${ctx.noun} for **${x.label}** and **${y.label}** together?` };
      return { kind: 'chart', chart, ask: { op: 'difference', labels: [big.label, small.label] }, answer: big.value - small.value, maxDigits: 6,
        prompt: i === 3 ? `${key} How many more for **${big.label}** than **${small.label}**?` : `${key} How many fewer for **${small.label}** than **${big.label}**?` };
    }
    if (l === 1) {
      const values = distinct(r, 4, 1, 10), rows = labels.map((label, k) => ({ label, value: values[k] }));
      const chart = { type: 'bar', rows, step: 5, unit: ctx.noun };
      if (i % 4 === 2) {
        const [x, y] = shuffle(rows, r);
        return { kind: 'chart', chart, answer: x.value + y.value, maxDigits: 6,
          prompt: `How many ${ctx.noun} for **${x.label}** and **${y.label}** together?`, rule: '**Together** means add those two bars.' };
      }
      if (i === 0) return { kind: 'chart', chart, ask: { op: 'total' }, answer: values.reduce((s, v) => s + v, 0), maxDigits: 6,
        prompt: `How many ${ctx.noun} altogether?`, rule: '**Altogether** means add every bar.' };
      const [x, y] = shuffle(rows, r), [big, small] = x.value > y.value ? [x, y] : [y, x];
      return { kind: 'chart', chart, ask: { op: 'difference', labels: [big.label, small.label] }, answer: big.value - small.value, maxDigits: 6,
        ...(i === 4
          ? { prompt: `How many fewer for **${small.label}** than **${big.label}**?`, rule: '**How many fewer** means subtract the smaller from the bigger.' }
          : { prompt: `How many more for **${big.label}** than **${small.label}**?`, rule: '**How many more** means subtract the smaller from the bigger.' }) };
    }
    // Level 4: a two-step word problem read from a table.
    let values = distinct(r, 4, 1, 10);
    const kind = i % 3;
    if (kind === 0) { // biggest compared with two others combined
      values = values.sort((a, b) => b - a);
      if (values[0] <= values[2] + values[3]) values[0] = values[2] + values[3] + 5 * int(r, 1, 3);
    }
    const rows = labels.map((label, k) => ({ label, value: values[k] })), visual = { type: 'table', rows };
    const shown = shuffle(rows, r);
    if (kind === 0) {
      const [big, , c, d] = rows;
      return number(`The table shows ${ctx.title}. How many more for **${big.label}** than for **${c.label}** and **${d.label}** combined?`,
        big.value - c.value - d.value, { visual: { type: 'table', rows: shown }, hint: `First add ${c.label} and ${d.label}, then subtract from ${big.label}.` });
    }
    if (kind === 1) {
      const [x] = shown;
      return number(`The table shows ${ctx.title}. How many ${ctx.noun} were **not** ${ctx.noun === 'votes' ? 'for ' : ''}**${x.label}**?`,
        values.reduce((s, v) => s + v, 0) - x.value, { visual, hint: `Add all the counts, then take away ${x.label}.` });
    }
    const [x, y] = shown, extra = 5 * int(r, 1, 4), [big, small] = x.value > y.value ? [x, y] : [y, x];
    return number(`The table shows ${ctx.title}. Then ${extra} more are counted for **${small.label}**. How many ${ctx.noun} for ${big.label} and ${small.label} altogether now?`,
      big.value + small.value + extra, { visual, hint: `Add ${extra} to ${small.label} first, then add ${big.label}.` });
  },
};

/** Per-topic challenge titles: { builderKey: [four titles] }. */
export const TOPIC_TITLES = {
  graphs: ['Read a bar chart.', 'Read a time graph.', 'Build a bar chart.', 'Find a rise or fall.'],
  data: ['Add and compare bars.', 'Use a pictogram key.', 'Order data from a table.', 'Solve a two-step data problem.'],
};
