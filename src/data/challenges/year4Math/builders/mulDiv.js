import { build, choice, column, int, number, pick, shuffle, sort } from '../kit.js';

// One run = the five calls (index 0..4) that build one challenge. Remember what this
// run has asked so no question repeats; regenerate from the same rng on a clash.
// Index 0 starts a new run, so a shared rng (Math.random in the game) never carries
// one run's questions into the next.
const runs = new WeakMap();
const questionKey = q => JSON.stringify([q.prompt, q.equation, q.text, q.answer, q.cards?.map(c => c.label)]);
function fresh(rng, index, make) {
  if (index === 0 || !runs.has(rng)) runs.set(rng, new Set());
  const seen = runs.get(rng);
  let q = make();
  for (let tries = 0; tries < 40 && seen.has(questionKey(q)); tries++) q = make();
  seen.add(questionKey(q));
  return q;
}

/** Plausible times-table slips: a neighbouring fact, or adding instead of multiplying. */
export function tableDistractors(a, b, rng) {
  const answer = a * b;
  const candidates = [a * (b + 1), a * (b - 1), (a + 1) * b, (a - 1) * b, a + b];
  const wrong = [...new Set(candidates)].filter(n => n > 0 && n !== answer);
  return shuffle(wrong, rng).slice(0, 3);
}

const TRAYS = [['trays', 'cups'], ['boxes', 'eggs'], ['bags', 'apples'], ['tables', 'children'], ['shelves', 'books']];
const STICKERS = [['boxes', 'packs', 'stickers'], ['crates', 'bags', 'marbles'], ['shelves', 'tubs', 'crayons']];
// Pairs that make 10 or 20: the "easy pair" to multiply first.
const FRIENDLY = [[2, 5], [5, 2], [4, 5], [5, 4]];
const isFriendly = (x, y) => x * y === 10 || x * y === 20;
const PAIR_TOTALS = [12, 18, 20, 24, 30, 36, 40, 48, 60, 72];
const factorPairs = n => Array.from({ length: 11 }, (_, i) => i + 2).filter(x => n % x === 0 && n / x >= x && n / x <= 12).map(x => [x, n / x]);
const CHOOSING = [['shirts', 'pairs of shorts', 'outfits'], ['sandwich fillings', 'types of bread', 'sandwiches'], ['starters', 'main dishes', 'meals'], ['ice-cream flavours', 'toppings', 'ice creams']];
// (first amount, times) => [first sentence, second sentence, question]
const SCALING = [
  (a, b) => [`A red ribbon is ${a} cm long.`, `A blue ribbon is ${b} times as long.`, 'How long is the blue ribbon in cm?'],
  (a, b) => [`A small tower is ${a} cubes tall.`, `A big tower is ${b} times as tall.`, 'How many cubes tall is the big tower?'],
  (a, b) => [`A puppy weighs ${a} kg.`, `Its mum is ${b} times as heavy.`, 'How many kg does its mum weigh?'],
  (a, b) => [`Sam has ${a} stickers.`, `His sister has ${b} times as many.`, 'How many stickers does his sister have?'],
];

/** Year 4 Maths builders: (level, rng, index) => one question. */
export const BUILDERS = {
  tables(l, r, i) {
    return fresh(r, i, () => {
      if (l === 1) {
        // b is never 10, so no option is just "the answer + 10".
        const a = [6, 7, 9, 11, 12][i], b = pick(r, [3, 4, 5, 6, 7, 8, 9, 11, 12]), product = a * b;
        return choice(`${a} × ${b} = ?`, product, tableDistractors(a, b, r), r,
          { rule: `Use a fact you know: ${a} × ${b - 1} = ${a * (b - 1)}, then add one more ${a}.` });
      }
      const a = int(r, 3, 12), b = pick(r, [3, 4, 5, 6, 7, 8, 9, 11, 12].filter(n => n !== a)), product = a * b;
      if (l === 2) return number(`${product} ÷ ${a} = ?`, b, { hint: `Think: ${a} × what = ${product}?` });
      if (l === 3) return sort('Sort each fact by its answer.', [String(product), String(a), String(b)],
        shuffle([[`${a} × ${b}`, String(product)], [`${b} × ${a}`, String(product)], [`${product} ÷ ${b}`, String(a)], [`${product} ÷ ${a}`, String(b)]], r));
      const [groups, things] = pick(r, TRAYS);
      return number(`${b} ${groups} each hold ${a} ${things}. How many ${things} altogether?`, product);
    });
  },
  mental(l, r, i) {
    return fresh(r, i, () => {
      const a = int(r, 2, 9), b = pick(r, [2, 3, 4, 5, 6, 7, 8, 9].filter(n => n !== a));
      if (l === 1) {
        const rule = 'Use a times-table fact. × 10 makes it 10 times bigger. × 1 and ÷ 1 keep the number the same. × 0 makes 0.';
        if (i === 0) return number(`${a} × ${b * 10} = ?`, a * b * 10, { rule, hint: `${a} × ${b} = ${a * b}, then make it 10 times bigger.` });
        if (i === 1) return number(`${a * b * 10} ÷ ${a} = ?`, b * 10, { rule, hint: `${a * b} ÷ ${a} = ${b}, then make it 10 times bigger.` });
        if (i === 2) return choice(`Which calculation has the same answer as ${a} × ${b}?`, `${a} × ${b} × 1`,
          [`${a} × ${b} × 0`, `${a} × ${b} + 1`, `${a} × ${b + 1}`], r, { rule });
        if (i === 3) { const [x, y] = pick(r, FRIENDLY); return number(`${a} × ${x} × ${y} = ?`, a * x * y, { rule, hint: `${x} × ${y} = ${x * y} first.` }); }
        return number(`${a} × ${b} ÷ 1 = ?`, a * b, { rule });
      }
      if (l === 2) {
        if (i === 0) return number(`${a * 100} × ${b} = ?`, a * b * 100);
        if (i === 1) return number(`${a * b * 100} ÷ ${b} = ?`, a * 100);
        if (i === 2) return number(`? × ${b} = ${a * b * 100}`, a * 100);
        if (i === 3) {
          // Three numbers with no pair making 10 or 20: the child chooses which pair to do first.
          let x, y, z;
          do { [x, y, z] = [int(r, 2, 6), int(r, 2, 6), int(r, 2, 6)]; } while (isFriendly(x, y) || isFriendly(y, z) || isFriendly(x, z));
          return number(`${x} × ${y} × ${z} = ?`, x * y * z, { hint: 'Multiply two of the numbers first, then multiply by the third.' });
        }
        return choice(`Which calculation does not equal ${a * b}?`, `${a} × 0 × ${b}`,
          [`${a} × ${b} × 1`, `${a} × 1 × ${b}`, `${a * b} ÷ 1`], r);
      }
      if (l === 3) {
        const [x, y] = pick(r, [...FRIENDLY, [5, 6], [6, 5]]), first = r() < 0.5;
        const labels = first ? [String(a), '×', '(', String(x), '×', String(y), ')'] : ['(', String(x), '×', String(y), ')', '×', String(a)];
        return build('Put brackets round the easy pair, so you multiply it first.', labels, r,
          { equation: first ? `${a} × ${x} × ${y}` : `${x} × ${y} × ${a}`, maths: { kind: 'value', value: a * x * y },
            hint: `${x} × ${y} = ${x * y}, an easy number to multiply by.` });
      }
      const x = int(r, 3, 9), y = int(r, 3, 6), c = int(r, 2, 5), [big, mid, small] = pick(r, STICKERS);
      return number(`${x} ${big} each hold ${y} ${mid} of ${c} ${small}. How many ${small} altogether?`, x * y * c);
    });
  },
  factors(l, r, i) {
    return fresh(r, i, () => {
      if (l === 3) {
        const total = pick(r, PAIR_TOTALS), pairs = shuffle(factorPairs(total), r);
        const [[a, b], [c, d] = [b, a]] = pairs;
        const yes = [...new Set([`${a} × ${b}`, `${b} × ${a}`, `${c} × ${d}`])];
        const near = new Set();
        // Near-misses: one or two away on either factor, a swapped-in neighbour, or a + b style slips.
        for (const [x, y] of shuffle([[a, b + 1], [a, b - 1], [a + 1, b], [a - 1, b], [a, b + 2], [c - 2, d], [c, d + 2], [c + 1, d], [b, a + 2], [d, c - 1], [a + 1, b - 1], [c - 1, d + 1]], r)) {
          if (x >= 2 && y >= 2 && x * y !== total) near.add(`${x} × ${y}`);
        }
        const no = [...near].slice(0, 3);
        return sort(`Sort the pairs. Which ones multiply to make ${total}?`, ['Factor pair', 'Not a factor pair'],
          shuffle([...yes.map(t => [t, 'Factor pair']), ...no.map(t => [t, 'Not a factor pair'])], r));
      }
      const a = int(r, 3, 9), b = pick(r, [3, 4, 6, 7, 8, 9, 12].filter(n => n !== a)), product = a * b;
      if (l === 1) return choice(`${a} × ${b} = ${product}. What is ${b} × ${a}?`, product, tableDistractors(b, a, r), r,
        { rule: 'Swapping the factors keeps the product the same.' });
      if (l === 2) return number(r() < 0.5 ? `Complete the factor pair: ${a} × ? = ${product}.` : `Complete the factor pair: ? × ${a} = ${product}.`, b);
      return number(`${product} chairs go into rows of ${a}. How many rows?`, b);
    });
  },
  written(l, r, i) {
    return fresh(r, i, () => {
      if (l === 1) {
        const b = int(r, 2, 4), t = int(r, 1, Math.floor(9 / b)), o = int(r, 1, Math.floor(9 / b)), a = t * 10 + o;
        return number('Multiply using the written layout.', a * b, { visual: column(a, b, '×'), rule: 'Multiply the ones first, then the tens. Write each answer in its column.' });
      }
      if (l === 2) {
        const b = int(r, 3, 9), o = int(r, Math.ceil(10 / b), 9), t = int(r, 1, 9), a = t * 10 + o;
        return number('Multiply. Exchange when the ones make 10 or more.', a * b, { visual: column(a, b, '×'), hint: 'Exchange 10 ones for 1 ten and add it to the tens.' });
      }
      const b = int(r, 2, 9), h = int(r, 1, 7), t = int(r, 1, 9), o = int(r, 1, 9), a = h * 100 + t * 10 + o;
      if (l === 3) return build('Split into hundreds, tens and ones. Multiply each part, then add.', [String(h * 100 * b), '+', String(t * 10 * b), '+', String(o * b), '=', String(a * b)], r,
        { equation: `${a} × ${b} = (${h * 100} × ${b}) + (${t * 10} × ${b}) + (${o} × ${b})` });
      const [groups, things] = pick(r, [['school teams', 'tokens'], ['classes', 'stickers'], ['farms', 'eggs'], ['shops', 'pencils']]);
      return number(`${b} ${groups} each collect ${a} ${things}. How many ${things} altogether?`, a * b, { visual: column(a,b,'×'), hint: 'Use the written layout: ones, then tens, then hundreds.' });
    });
  },
  mulProblems(l, r, i) {
    return fresh(r, i, () => {
      const a = int(r, 3, 9), b = int(r, 2, 8), c = int(r, 2, 9);
      const [first, second, made] = pick(r, CHOOSING);
      if (l === 1) return choice(`Choosing problem: there are ${a} ${first} and ${b} ${second}. Choose one of each. How many different ${made}?`, a * b,
        [...new Set([a + b, a * (b + 1), (a - 1) * b, (a + 1) * b])].filter(n => n !== a * b).slice(0, 3), r,
        { rule: 'Every first choice goes with every second choice, so multiply.' });
      if (l === 2) {
        return number(`Times-as problem. ${pick(r, SCALING)(a, b).join(' ')}`, a * b, { hint: `Multiply the first amount by ${b}.` });
      }
      if (l === 3) {
        if (i % 2) return build('Build the calculation for the times-as story.', [String(a), '×', String(b), '=', String(a * b)], r,
          { text: `A small tower is ${a} cubes tall. A big tower is ${b} times as tall. How many cubes tall is the big tower?` });
        return build('Build the calculation for the choosing story.', [String(a), '×', String(b), '=', String(a * b)], r,
          { text: `There are ${a} ${first} and ${b} ${second}. Choose one of each. How many different ${made}?` });
      }
      const kind = i % 3, n = a * 10 + c;
      if (kind === 0) return number(`Two-step problem: ${b} packs each hold ${n} beads. There are ${c} extra beads. How many beads in all?`, b * n + c);
      if (kind === 1) return number(`Two-step problem: Tom's tower is ${a} cubes tall. Mia's tower is ${b} times as tall. How many cubes are in both towers together?`, a + a * b);
      return number(`Two-step problem: there are ${a} ${first} and ${b} ${second}. Then ${c} more ${second} are added. Choose one of each. How many different ${made} now?`, a * (b + c));
    });
  },
};

/** Per-topic challenge titles: { builderKey: [four titles] }. */
export const TOPIC_TITLES = {
  tables: ['Pick the times table answer.', 'Divide with a times table.', 'Sort a family of facts.', 'Solve an equal groups story.'],
  mental: ['Use tens, 0 and 1.', 'Use hundreds and three numbers.', 'Group the easy pair.', 'Boxes of packs.'],
  factors: ['Swap the factors.', 'Complete the factor pair.', 'Sort the factor pairs.', 'Chairs in rows.'],
  written: ['Multiply without exchanging.', 'Multiply with an exchange.', 'Split into hundreds, tens and ones.', 'Solve a multiplying story.'],
  mulProblems: ['Count the different choices.', 'Solve a times-as problem.', 'Build the story calculation.', 'Solve a two-step problem.'],
};
