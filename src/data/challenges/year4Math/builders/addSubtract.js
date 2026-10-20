import { build, choice, column, int, number, pick, shuffle } from '../kit.js';

/** Digits of a 4-digit number, ones first. */
const digitsOf = n => [0,1,2,3].map(p => Math.floor(n / 10 ** p) % 10);
/** How many columns need an exchange in a + b or a − b. */
export function exchanges(a, b, subtract) {
  const x = digitsOf(a), y = digitsOf(b);
  let count = 0, carry = 0;
  for (let p = 0; p < 4; p++) {
    const top = x[p] - (subtract ? carry : 0), bottom = y[p];
    const needs = subtract ? top < bottom : x[p] + bottom + carry > 9;
    if (needs) count++;
    carry = needs ? 1 : 0;
  }
  return count;
}

/**
 * A 4-digit pair built column by column with exactly `count` exchanges among the
 * ones, tens and hundreds (never the thousands, so the answer keeps 4 digits).
 * Built directly rather than by rejection, so any random source terminates.
 * The thousands digit of `a` comes from the question index so a run never repeats.
 */
function columnPair(r, thousands, subtract, count) {
  const exchangeAt = new Set(shuffle([0,1,2], r).slice(0, count));
  let a = thousands * 1000, b = 0, carry = 0;
  for (let p = 0; p < 3; p++) {
    const low = p === 0 ? 1 : 0, needs = exchangeAt.has(p);
    let x, y;
    if (subtract) {
      x = needs ? int(r, 0, 8) : int(r, carry + low, 9);
      y = needs ? int(r, Math.max(x - carry + 1, low), 9) : int(r, low, x - carry);
    } else {
      x = needs ? int(r, 2, 9) : int(r, 0, 8 - carry - low);
      y = needs ? int(r, 10 - x - carry, 9) : int(r, low, 9 - x - carry);
    }
    a += x * 10 ** p; b += y * 10 ** p; carry = needs ? 1 : 0;
  }
  b += 1000 * (subtract ? int(r, 1, thousands - carry - 1) : int(r, 1, 9 - thousands - carry));
  return [a, b];
}

const COLUMN_STORIES = [
  [(a,b) => `A stadium has ${a} seats. ${b} seats are empty. How many seats are taken?`, true],
  [(a,b) => `A school raised £${a} at a fair and £${b} at a sponsored walk. How much money altogether?`, false],
  [(a,b) => `A bakery made ${a} rolls. It sold ${b} of them. How many rolls are left?`, true],
  [(a,b) => `A train carried ${a} people in the morning and ${b} people in the afternoon. How many people altogether?`, false],
  [(a,b) => `A plane is flying ${a} metres high. It drops ${b} metres. How high is it now?`, true],
];

const NAMES = ['Sam', 'Priya', 'Leo', 'Amara', 'Finn', 'Zara'];
const round1000 = n => Math.round(n / 1000) * 1000;
const round100 = n => Math.round(n / 100) * 100;

/** A number whose hundreds digit is never 5, so rounding to 1000 is clear. */
const clearThousands = (r, thousands) => thousands * 1000 + pick(r, [0,1,2,3,4,6,7,8,9]) * 100 + int(r, 0, 99);

/** Remove the answer and duplicates from distractors. */
const others = (answer, values) => [...new Set(values)].filter(v => v !== answer && v > 0 && v < 10000);

const STORIES_1 = [
  (a,b,c) => [`A farm has ${a} sheep. ${b} lambs are born, then ${c} sheep are sold. How many sheep now?`, a+b-c, 'Add the lambs born, then subtract the sheep sold.'],
  (a,b,c) => [`A library has ${a} books. It buys ${b} more, then lends ${c}. How many books are on the shelves?`, a+b-c, 'Add the books bought, then subtract the books lent.'],
  (a,b,c) => [`A café has ${a} cups. ${c} break, then ${b} new cups arrive. How many cups now?`, a-c+b, 'Subtract the broken cups, then add the new cups.'],
  (a,b,c) => [`A garden centre has ${a} plants. It sells ${c}, then grows ${b} more. How many plants now?`, a-c+b, 'Subtract the plants sold, then add the new plants.'],
  (a,b,c) => [`A toy shop has ${a} marbles. ${b} more arrive, then ${c} are sold. How many marbles now?`, a+b-c, 'Add the marbles that arrive, then subtract the marbles sold.'],
];
const STORIES_2 = [
  (a,b,c) => [`A zoo had ${a} visitors on Saturday and ${b} on Sunday. ${c} of them were children. How many were adults?`, a+b-c],
  (a,b,c) => [`A lorry carries ${a} kg of sand. It drops ${b} kg at one house and ${c} kg at another. How much sand is left?`, a-b-c],
  (a,b,c) => [`Mia scored ${a} points in level one and ${b} points in level two. She then lost ${c} points. What is her score?`, a+b-c],
  (a,b,c) => [`A pond had ${a} tadpoles. ${b} turned into frogs and ${c} new tadpoles hatched. How many tadpoles now?`, a-b+c],
  (a,b,c) => [`A school printed ${a} leaflets. Class 4 used ${b} and Class 5 used ${c}. How many leaflets are left?`, a-b-c],
];
const STORIES_3 = [
  ['A museum has', 'visitors, then', 'more arrive and', 'leave.', '+', '−'],
  ['A bus depot has', 'litres of fuel. It gets', 'more litres and uses', 'litres.', '+', '−'],
  ['A cinema sold', 'tickets. Then', 'were refunded and', 'more were sold.', '−', '+'],
  ['A beach has', 'shells. The tide washes away', 'and brings', 'new shells.', '−', '+'],
  ['A bird reserve counted', 'birds. Then', 'flew away and', 'more flew away.', '−', '−'],
];

export const BUILDERS = {
  columns(l,r,i) {
    const subtract = i % 2 === 1;
    const sign = subtract ? '−' : '+';
    if (l === 1) {
      const [a,b] = columnPair(r, subtract ? i + 4 : i + 1, subtract, 0);
      return number(`Work out ${a} ${sign} ${b} using the columns.`, subtract ? a-b : a+b, { visual: column(a,b,sign),
        rule: 'Line up thousands, hundreds, tens and ones. Start with the ones column, then move left.',
        hint: 'Every column works on its own here. No exchanging is needed.' });
    }
    if (l === 2) {
      const [a,b] = columnPair(r, subtract ? i + 4 : i + 2, subtract, 1);
      return number(`Work out ${a} ${sign} ${b} using the columns.`, subtract ? a-b : a+b, { visual: column(a,b,sign),
        hint: subtract ? 'If a top digit is too small, exchange 1 from the next column on the left.' : 'If a column makes 10 or more, exchange 10 for 1 in the next column on the left.' });
    }
    if (l === 3) {
      const [a,b] = columnPair(r, subtract ? i + 4 : i + 2, subtract, int(r, 2, 3));
      const answer = subtract ? a-b : a+b;
      const spare = String((answer % 10 + 1) % 10);
      const tiles = shuffle([...String(answer), spare].map((label,k) => ({ id: String(k), label })), r);
      return { kind: 'build', prompt: `Work out ${a} ${sign} ${b}. Place the answer's digits from left to right.`, rule: 'One tile is spare.',
        tiles, answer: String(answer), letters: true, maths: { kind: 'digits', value: answer }, visual: column(a,b,sign),
        hint: 'Start at the ones column. There is more than one exchange.' };
    }
    const [story, sub] = COLUMN_STORIES[i];
    const [a,b] = columnPair(r, sub ? i + 5 : i + 1, sub, int(r, 2, 3));
    return number(story(a,b), sub ? a-b : a+b, { visual: column(a,b,sub ? '−' : '+'), hint: 'Decide whether to add or subtract, then use the columns.' });
  },
  inverse(l,r,i) {
    const name = NAMES[(i + int(r,0,5)) % NAMES.length];
    if (l === 1) {
      const subtract = i % 2 === 1;
      // Adding: the first number starts at 2xxx–6xxx and the estimate stays within 4 digits.
      const a = clearThousands(r, subtract ? i + 4 : i + 2);
      let b = clearThousands(r, int(r,1,2));
      if (!subtract && round1000(a) + round1000(b) > 9000) b = clearThousands(r, 1);
      const answer = subtract ? round1000(a) - round1000(b) : round1000(a) + round1000(b);
      const exact = subtract ? a - b : a + b;
      const wrong = others(answer, [round100(exact), answer + 1000, answer - 1000, answer + 2000, answer - 2000]).slice(0, 3);
      return choice(`Estimate ${a} ${subtract ? '−' : '+'} ${b}. Round each number to the nearest 1000 first.`, answer, wrong, r,
        { rule: 'Round each number to the nearest 1000, then work out the easy calculation.' });
    }
    const a = int(r, 1000 + i * 1000, 1999 + i * 1000), b = int(r, 1100, 2999);
    if (l === 2) {
      if (i % 2 === 0) return number(`Check that ${a} + ${b} = ${a+b}. What is ${a+b} − ${b}?`, a, { hint: 'Subtraction undoes addition. You should get the first number back.' });
      return number(`Check that ${a+b} − ${b} = ${a}. What is ${a} + ${b}?`, a+b, { hint: 'Addition undoes subtraction. You should get the starting number back.' });
    }
    if (l === 3) {
      if (i % 2 === 0) return build(`Build a subtraction that checks ${a} + ${b} = ${a+b}.`, [String(a+b),'−',String(b),'=',String(a)], r);
      return build(`Build an addition that checks ${a+b} − ${b} = ${a}.`, [String(a),'+',String(b),'=',String(a+b)], r);
    }
    const sum = a + b, right = i % 2 === 0, claim = right ? sum : sum + pick(r, [10, 100, -10, -100]);
    const correctText = right ? `Yes, ${name} is right.` : `No, it should be ${sum}.`;
    const wrong = right ? [`No, it should be ${sum + 10}.`, `No, it should be ${sum - 100}.`]
      : [`Yes, ${name} is right.`, `No, it should be ${claim + (claim - sum)}.`];
    return choice(`${name} says ${a} + ${b} = ${claim}. Check with the inverse. Is ${name} right?`, correctText, wrong, r,
      { hint: `Work out ${claim} − ${b}. Do you get ${a}?` });
  },
  addProblems(l,r,i) {
    if (l === 1) {
      const a = int(r,1000,3999), b = int(r,100,499), c = int(r,100,499);
      const [prompt, answer, rule] = STORIES_1[i](a,b,c);
      const wrong = others(answer, [a+b+c, a-b-c, answer + 100, answer - 100]).slice(0,3);
      return choice(prompt, answer, wrong, r, { rule });
    }
    if (l === 2) {
      const a = int(r,3000,6999), b = int(r,500,1499), c = int(r,200,999);
      const [prompt, answer] = STORIES_2[i](a,b,c);
      return number(prompt, answer, { hint: 'Find the two steps. Decide which step adds and which subtracts.' });
    }
    if (l === 3) {
      const [start, mid1, mid2, end, op1, op2] = STORIES_3[i];
      const a = int(r,3000,6999), b = int(r,200,999), c = int(r,200,999);
      const value = (op1 === '+' ? a+b : a-b) + (op2 === '+' ? c : -c);
      return build('Build the calculation for the story. Start with the first number.', [String(a),op1,String(b),op2,String(c)], r,
        { text: `${start} ${a} ${mid1} ${b} ${mid2} ${c} ${end}`, maths: { kind: 'value', value } });
    }
    // Level 4: genuine two-step problems with varied operations and contexts.
    const kinds = [
      () => { const x = int(r,1200,2499), y = int(r,1200,2499), t = int(r,500,1999);
        return [`Hill School has ${x} pupils and Park School has ${y} pupils. ${t} pupils go on a trip. How many pupils stay behind?`, x+y-t]; },
      () => { const x = int(r,2000,4999), d = int(r,300,999);
        return [`A shop took £${x} on Saturday. On Sunday it took £${d} less. How much did it take altogether?`, x + (x-d)]; },
      () => { const x = int(r,4000,9000), m = int(r,1000,1999), t = int(r,1000,1999);
        return [`A water tank holds ${x} litres. ${m} litres are used on Monday and ${t} litres on Tuesday. How much water is left?`, x-m-t]; },
      () => { const x = int(r,1500,3999), y = int(r,1500,3999), g = int(r,5000,9000);
        return [`A charity wants to raise £${g + 1000}. It has raised £${x} and £${Math.min(y, g - x)}. How much more does it need?`, g + 1000 - x - Math.min(y, g - x)]; },
      () => { const x = int(r,2000,4999), e = int(r,300,999);
        return [`A red kite flew ${x} metres. A buzzard flew ${e} metres further. How far did they fly in total?`, x + x + e]; },
    ];
    const [prompt, answer] = kinds[i]();
    return number(prompt, answer, { hint: 'Do one step at a time. Write down the answer to the first step.' });
  },
};

/** Per-topic challenge titles. */
export const TOPIC_TITLES = {
  columns: ['Add and subtract in columns.', 'Exchange in one column.', 'Build an answer with exchanges.', 'Solve a column problem.'],
  inverse: ['Estimate by rounding first.', 'Check with the inverse.', 'Build an inverse check.', 'Judge if a sum is right.'],
  addProblems: ['Follow two steps in a story.', 'Find the two steps.', 'Build the story calculation.', 'Solve a two-step problem.'],
};
