// Year 6 place-value strand. Statutory boundary: docs/curriculum/year-6-maths.md.
import { int, choice, choiceN, fmt, number, orderBy, sort, shuffle, words } from '../year5Math/kit.js';

const n = (prompt, answer, extra = {}) => number(prompt, answer, { maxDigits: 8, ...extra });
const chart = value => ({ type: 'place6', digits: String(value).split('').map(Number) });
const table = (title, headers, rows) => ({ type: 'table5', title, headers, rows });
const places = ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands', 'millions', 'ten millions'];
const names = ['Alder', 'Birch', 'Cedar', 'Elm', 'Willow'];
const big = (r, i) => 1000000 + i * 1500000 + int(r, 0, 999999);
const round = (value, unit) => Math.floor((value + unit / 2) / unit) * unit;
export function words6(value) {
  const millions = Math.floor(value / 1000000), remainder = value % 1000000;
  if (!millions) return words(value);
  return `${words(millions)} million${remainder ? `${remainder < 100 ? ' and ' : ', '}${words(remainder)}` : ''}`;
}
const entries = values => values.map(value => ({ value, label: fmt(value) }));
const line = (min, max, marks = []) => ({ type: 'line5', min, max, marks: marks.map(value => ({ value })) });

export const PLACE_VALUE_BUILDERS = {
  'place-value-to-ten-million'(level, r, i) {
    const value = i === 4 ? 10000000 : big(r, i), visual = chart(value);
    if (level === 1) {
      const position = (i + int(r, 0, 6)) % String(value).length;
      const digit = Number(String(value).at(-1 - position));
      return n(`In ${fmt(value)}, what is the value of the digit in the ${places[position]} place?`, digit * 10 ** position,
        { visual, hint: 'Find the named column. Multiply its digit by the value of one in that column.' });
    }
    if (level === 2) {
      if (i % 2 === 0) return n(`Write in digits: ${words6(value)}.`, value,
        { hint: 'Separate the millions, thousands and remaining part. Use zeros for empty places.' });
      const other = value + 1000;
      return choiceN(`Which is greater: ${fmt(value)} or ${fmt(other)}?`, other, [value], r,
        { visual: table('Compare the numbers', ['Number'], [[fmt(value)], [fmt(other)]]), hint: 'Compare from the left until you find different digits.' });
    }
    if (level === 3) {
      const values = [value, value - 10000, value - 100, value - 1];
      return orderBy(`Order these numbers from smallest to largest (set ${i + 1}).`, entries(values), r,
        { visual: table('Numbers to compare', ['Number'], values.map(v => [fmt(v)])), hint: 'Compare millions first, then work towards the ones.' });
    }
    const thousands = int(r, 1, 8) * 100000 + i * 10000;
    const total = value === 10000000 ? 10000000 : value + thousands;
    const counts = String(total).split('').map((digit, k, digits) => [places[digits.length - k - 1], digit]);
    return n(`A fictional region records its population in place-value columns. What is the population of region ${names[i]}?`, total,
      { visual: table(`Region ${names[i]} population`, ['Place', 'Digit'], counts), hint: 'Write the digits from the largest place to the smallest, including zeros.' });
  },
  'rounding-whole-numbers'(level, r, i) {
    const unit = level === 1 ? [10, 100, 1000, 100, 1000][i] : [10000, 100000, 1000000, 100000, 10000][i];
    const lower = (int(r, 1, Math.floor(9000000 / unit) - 1)) * unit;
    // Deliberately include exact halfway cases, zeros and both sides of the midpoint.
    const offset = [0.2, 0.5, 0.8, 0, 0.49][i];
    const value = lower + Math.floor(unit * offset), answer = round(value, unit);
    const visual = table('Rounding boundaries', ['Lower multiple', 'Halfway', 'Upper multiple'], [[fmt(lower), fmt(lower + unit / 2), fmt(lower + unit)]]);
    const hint = 'Find the two neighbouring multiples and the halfway point. Halfway rounds to the higher multiple.';
    if (level === 3) {
      const values = [lower + unit / 10, lower + unit * 4 / 10, lower + unit / 2, lower + unit * 9 / 10];
      return sort(`Round each number to the nearest ${fmt(unit)} (set ${i + 1}).`, [fmt(lower), fmt(lower + unit)],
        shuffle(values.map(v => [fmt(v), fmt(round(v, unit))]), r), { visual: table('Rounding boundaries', ['Lower multiple', 'Halfway', 'Upper multiple'], [[fmt(lower), fmt(lower + unit / 2), fmt(lower + unit)]]), hint });
    }
    if (level === 4) return n(`A museum recorded ${fmt(value)} visitors. Round this number to the nearest ${fmt(unit)} for its report.`, answer,
      { visual: table('Visitor count', ['Exact count', 'Round to nearest'], [[fmt(value), fmt(unit)]]), hint });
    return n(`Round ${fmt(value)} to the nearest ${fmt(unit)}.`, answer, { visual: level === 1 ? undefined : visual, hint });
  },
  'negative-numbers-and-intervals'(level, r, i) {
    const below = i * 3 + int(r, 1, 3), above = i * 3 + int(r, 1, 3);
    const hint = 'Zero lies between negative and positive values. Count the distance on each side.';
    if (level === 1) {
      const change = below + above;
      return choice(`The temperature starts at ${fmt(-below)}°C and rises by ${change}°C. What is the new temperature?`, `${above}°C`,
        [`${fmt(-above)}°C`, `${change}°C`, `${fmt(-below - change)}°C`], r,
        { visual: line(-20, 20, [-below]), hint: 'A rise moves right on the number line. Count to zero, then continue.' });
    }
    if (level === 2) return n(`How many degrees warmer is ${above}°C than ${fmt(-below)}°C?`, above + below,
      { visual: line(-20, 20, [-below, above]), hint });
    if (level === 3) {
      const values = [-below, above, 0, -below - 3];
      return orderBy(`Order the temperatures from coldest to warmest (set ${i + 1}).`, values.map(value => ({ value, label: `${fmt(value)}°C` })), r,
        { visual: line(-25, 25), hint: 'Colder temperatures are farther left on the number line.' });
    }
    if (i % 2 === 0) return n(`A lift starts at floor ${fmt(-below)} and goes up to floor ${above}. Each floor is one level apart, including floor 0. How many levels does it travel?`, below + above,
      { visual: table('Lift journey', ['Start floor', 'End floor'], [[fmt(-below), fmt(above)]]), hint });
    return choice(`At noon it is ${above}°C. By night the temperature falls by ${above + below}°C. What is the night temperature?`, `${fmt(-below)}°C`,
      [`${below}°C`, `${above + below}°C`, `${fmt(-above - below)}°C`], r,
      { visual: table('Temperature record', ['Noon', 'Fall'], [[`${above}°C`, `${above + below}°C`]]), hint: 'A fall moves left. After reaching zero, continue into negative temperatures.' });
  },
  'place-value-problems'(level, r, i) {
    const value = big(r, i), extra = int(r, 1, 9) * 10000, hint = 'Keep digits in their place-value columns and check the size of the result.';
    if (level === 1) return n(`A seed bank stores ${fmt(value)} seeds and receives ${fmt(extra)} more. How many seeds does it now store?`, value + extra,
      { visual: table('Seed bank', ['Already stored', 'New seeds'], [[fmt(value), fmt(extra)]]), hint });
    if (level === 2) {
      const unit = [1000, 10000, 100000, 1000000, 100000][i];
      return n(`A website records ${fmt(value)} visits. What is this count rounded to the nearest ${fmt(unit)}?`, round(value, unit),
        { visual: table('Visits', ['Exact count', 'Round to nearest'], [[fmt(value), fmt(unit)]]), hint: 'Compare with the halfway point between neighbouring multiples.' });
    }
    if (level === 3) {
      const rows = [value, value + 10000, value - 1000, value + 1].map((v, k) => ({ value: v, label: `${names[k]}: ${fmt(v)}` }));
      return orderBy(`Order these fictional regions from smallest to largest population (set ${i + 1}).`, rows, r,
        { visual: table('Fictional populations', ['Region', 'People'], rows.map((e, k) => [names[k], fmt(e.value)])), hint: 'Use the first place where the population numbers differ.' });
    }
    const used = int(r, 1, 9) * 1000;
    return n(`A library website has ${fmt(value)} visits in April. May has ${fmt(extra)} more than April. June has ${fmt(used)} fewer than May. How many visits are there in June?`, value + extra - used,
      { visual: table('Monthly changes', ['Month', 'Visits or change'], [['April', fmt(value)], ['May', `${fmt(extra)} more than April`], ['June', `${fmt(used)} fewer than May`]]), hint: 'Find May first, then apply the June change. You need both changes.' });
  },
};
