import { int, pick, shuffle, tiles } from "./shared.js";

/* ---------- helpers shared by the arithmetic and groups/fractions builders ---------- */

/** "1 duck" / "3 ducks". `noun` is [singular, plural]. */
export const count = (n, [one, many]) => `${n} ${n === 1 ? one : many}`;

/**
 * Four numeric options: the answer, up to two likely mistakes from
 * `mistakes`, topped up with random near misses. Shuffled, so neither the
 * answer's place in the row nor its rank in size gives it away.
 */
export function nearOptions(rng, answer, mistakes = [], max = 20) {
  const ok = n => Number.isInteger(n) && n >= 0 && n <= max && n !== answer;
  const wrong = shuffle(rng, [...new Set(mistakes)].filter(ok)).slice(0, 2);
  // Random near misses never add a 0 that no mistake would give.
  for (const offset of shuffle(rng, [-3, -2, -1, 1, 2, 3, 4, -4])) {
    if (wrong.length >= 3) break;
    if (ok(answer + offset) && answer + offset > 0 && !wrong.includes(answer + offset)) wrong.push(answer + offset);
  }
  return shuffle(rng, [answer, ...wrong]);
}

export const pickNumber = (rng, prompt, answer, mistakes, extra = {}) =>
  ({ kind: "choice", prompt, answer, options: nearOptions(rng, answer, mistakes), ...extra });

/** Two questions are "the same" when they ask about the same numbers, whatever the story's nouns. */
export const questionKey = q => JSON.stringify([q.kind, (q.prompt ?? "").match(/\d+/g), q.equation, q.text, q.terms, q.answer,
  q.parts, q.shaded, q.visual?.strips, q.cards?.map(c => c.label)]);

/** Five questions, re-rolling any that repeat an earlier one in the same run. */
export function uniqueRun(make, level, rng, keyOf = questionKey) {
  const seen = new Set();
  return Array.from({ length: 5 }, (_, i) => {
    let q = make(level, rng, i);
    for (let tries = 0; tries < 60 && seen.has(keyOf(q)); tries++) q = make(level, rng, i);
    seen.add(keyOf(q));
    return q;
  });
}

/** A per-run plan: each value at least once (when there is room), then random fill, shuffled. */
export const plan = (rng, values, length = 5) =>
  shuffle(rng, [...values, ...Array.from({ length: length - values.length }, () => pick(rng, values))]);

// `noun` is [singular, plural] so a screen reader hears "1 duck", not "1 counters".
const named = (n, noun) => (noun ? { noun: n === 1 ? noun[0] : noun[1] } : {});
const joinGroups = (a, b, start = "Start", add = "Add", icon, noun) =>
  ({ type: "objects", groups: [{ count: a, label: start, icon, ...named(a, noun) }, { count: b, label: add, icon, ...named(b, noun) }] });
const crossedGroup = (a, b, label = "Start", icon, noun) =>
  ({ type: "objects", groups: [{ count: a, label, crossed: b, icon, ...named(a, noun) }] });
/** `fact(withGap([3, "+", 4, "=", 7], 2))` → "3 + ? = 7". */
const fact = parts => parts.join(" ");
const withGap = (terms, gap) => terms.map((t, i) => (i === gap ? "?" : t));

/* ---------- story contexts (one-step problems) ---------- */

const STORIES = [
  { noun: ["duck", "ducks"], where: "on the pond", join: ["more joins", "more join"], leave: ["swims away", "swim away"] },
  { noun: ["bird", "birds"], where: "in a tree", join: ["more lands", "more land"], leave: ["flies away", "fly away"] },
  { noun: ["car", "cars"], where: "in the car park", join: ["more drives in", "more drive in"], leave: ["drives away", "drive away"] },
  { noun: ["child", "children"], where: "on the bus", join: ["more gets on", "more get on"], leave: ["gets off", "get off"] },
];
const verb = (n, [one, many]) => (n === 1 ? one : many);
function storyText(s, a, b, add) {
  const start = `${count(a, s.noun)} ${a === 1 ? "is" : "are"} ${s.where}.`;
  return add ? `${start} ${b} ${verb(b, s.join)}. How many now?` : `${start} ${b} ${verb(b, s.leave)}. How many are left?`;
}

export const arithmeticBuilders = {
  // 1 sign meanings with pictures · 2 which statement is true · 3 build a statement · 4 balance both sides of =
  "addition-subtraction-and-equals-signs": (level, rng) => {
    const signs = plan(rng, level === 1 ? ["+", "−", "="] : ["+", "−"]);
    const forms = plan(rng, ["start", "part", "swap"]);
    return uniqueRun((l, r, i) => {
      const op = l === 4 && forms[i] === "swap" ? "+" : signs[i] === "=" ? pick(r, ["+", "−"]) : signs[i];
      const a = l === 1 ? int(r, 3, 8) : int(r, 4, 12);
      let b = op === "+" ? int(r, 1, Math.min(l === 1 ? 5 : 8, 20 - a)) : int(r, 1, a - 1);
      if (l === 4 && forms[i] === "swap" && b === a) b -= 1; // "8 + 8 = 8 + ?" needs no swapping
      const total = op === "+" ? a + b : a - b;
      if (l === 1) {
        const equation = signs[i] === "=" ? `${a} ${op} ${b} ? ${total}` : `${a} ? ${b} = ${total}`;
        return { kind: "choice", prompt: "Which sign goes in the gap?", equation, answer: signs[i], options: shuffle(r, ["+", "−", "="]), variant: "wordy",
          rule: "+ means add. − means take away. = means the same value.",
          visual: op === "+" ? joinGroups(a, b) : crossedGroup(a, b), hint: "Did the group get bigger or smaller?" };
      }
      if (l === 2) {
        const other = op === "+" ? "−" : "+";
        const near = total + pick(r, total > 0 ? [-1, 1] : [1]);
        const flip = r() < 0.5;
        const say = (x, s, y, z) => (flip ? `${z} = ${x} ${s} ${y}` : `${x} ${s} ${y} = ${z}`);
        return { kind: "choice", prompt: "Which one is true?", answer: say(a, op, b, total), variant: "wordy",
          options: shuffle(r, [say(a, op, b, total), say(a, other, b, total), say(a, op, b, near)]),
          hint: "Work out one side. Does it match the other side?" };
      }
      if (l === 3) {
        const left = total === 1 ? "There is 1 left." : `There are ${total} left.`;
        return { kind: "build", prompt: "Build the number sentence for the story.",
          text: op === "+" ? `Start with ${a}. Add ${b}. There are ${total} altogether.` : `Start with ${a}. Take away ${b}. ${left}`,
          answer: `${a} ${op} ${b} = ${total}`, tiles: tiles(r, [a, op, b, "=", total]), hint: "Put the numbers in the same order as the story." };
      }
      const form = forms[i];
      const [equation, answer] = form === "swap" ? [`${a} + ${b} = ${b} + ?`, a]
        : form === "start" ? [`? = ${a} ${op} ${b}`, total] : [`${total} = ${a} ${op} ?`, b];
      return { kind: "number", prompt: "Make both sides equal. What is the missing number?", equation, answer, maxDigits: 2,
        hint: "= means both sides have the same value." };
    }, level, rng);
  },

  // 1 pictured bonds to 5–10 · 2 bonds to 10 and 20 · 3 a bond's two linked facts · 4 bond stories
  "number-bonds-within-20": (level, rng) => uniqueRun((l, r) => {
    const whole = l === 1 ? int(r, 5, 10) : l === 2 ? pick(r, [10, 20]) : int(r, 6, 20);
    const a = int(r, 1, whole - 1), b = whole - a;
    if (l === 1) return pickNumber(r, `What goes with ${a} to make ${whole}?`, b, [a, whole, b + 1, b - 1], {
      equation: `${a} + ? = ${whole}`, rule: "The coloured counters are the part we know.",
      visual: { type: "objects", groups: [{ count: whole, label: "Whole", marked: a }] }, hint: "Count the counters that are not coloured." });
    if (l === 2) return pickNumber(r, `Find the missing part.`, b, [a, b + 10, b - 10, 10 - (a % 10), b + 1, b - 1], {
      equation: r() < 0.5 ? `${a} + ? = ${whole}` : `? + ${a} = ${whole}`, hint: whole === 20 ? "Use a pair that makes 10 to help." : "Count on from the part you know." });
    if (l === 3) {
      const terms = [a, b, whole, whole, a, b];
      const gaps = pick(r, [[1, 5], [0, 4], [2, 3]]);
      return { kind: "sequence", prompt: "Fill both facts. They use the same 3 numbers.", terms, gaps,
        captions: ["Part", "Part", "Whole", "Whole", "Part", "Part"],
        equation: [fact(withGap([a, "+", b, "=", whole], [0, 2, 4][gaps[0]])), fact(withGap([whole, "−", a, "=", b], [0, 2, 4][gaps[1] - 3]))],
        hint: "Adding and taking away use the same three numbers." };
    }
    const story = pick(r, [
      [`Bix has ${whole} beads. ${a} ${a === 1 ? "is" : "are"} red. The rest are blue.`, "How many are blue?"],
      [`There are ${whole} fish. ${a} ${a === 1 ? "is" : "are"} in the big tank.`, "How many are in the small tank?"],
      [`${whole} children play. ${a} ${a === 1 ? "is" : "are"} on the swings.`, "How many are on the slide?"],
    ]);
    return { kind: "number", prompt: `${story[0]} ${story[1]}`, answer: b, maxDigits: 2, hint: "Count on from the part to the whole." };
  }, level, rng),

  // 1 pictured totals to 10 · 2 bigger sums and adding zero, no picture · 3 swap the numbers, same total · 4 stories
  "adding-within-20": (level, rng) => {
    // About 2 runs in 5 add or take away zero once, at a random question.
    const zeroAt = level === 2 ? shuffle(rng, [0, 1, 2, 3, 4, -1, -1, -1, -1, -1, -1, -1])[0] : -1;
    return uniqueRun((l, r, i) => {
      let a, b;
      if (l === 1) { a = int(r, 1, 7); b = int(r, 1, 10 - a); }
      else if (l === 2 && i === zeroAt) [a, b] = shuffle(r, [int(r, 3, 19), 0]);
      else if (l === 2) {
        const form = pick(r, ["teen", "small-first", "bridge"]);
        if (form === "bridge") { a = int(r, 5, 9); b = int(r, 11 - a, 9); }
        else { const big = int(r, 11, 18), small = int(r, 1, 20 - big); [a, b] = form === "teen" ? [big, small] : [small, big]; }
      } else { a = int(r, 2, 15); b = int(r, 1, Math.min(9, 20 - a)); }
      const answer = a + b;
      if (l === 1) return pickNumber(r, "How many altogether?", answer, [answer + 1, answer - 1, Math.abs(a - b), Math.max(a, b)], {
        equation: `${a} + ${b} = ?`, visual: joinGroups(a, b), hint: "Say the first number, then count on." });
      if (l === 2) return pickNumber(r, "What is the total?", answer, [answer + 1, answer - 1, answer + 10, answer - 10, Math.abs(a - b)], {
        equation: `${a} + ${b} = ?`, hint: b === 0 || a === 0 ? "Adding 0 changes nothing." : "Start with the bigger number and count on." });
      if (l === 3) {
        if (a === b) b = b > 1 ? b - 1 : b + 1; // a swap of equal numbers shows nothing
        const terms = [a, b, a + b, b, a, a + b];
        const gaps = pick(r, [[2, 5], [1, 3], [0, 4]]);
        return { kind: "sequence", prompt: "Swap the numbers. Fill the gaps.", terms, gaps,
          captions: ["Number", "Number", "Total", "Number", "Number", "Total"],
          equation: [fact(withGap([a, "+", b, "=", a + b], [0, 2, 4][gaps[0]])), fact(withGap([b, "+", a, "=", a + b], [0, 2, 4][gaps[1] - 3]))],
          hint: "Adding in any order gives the same total." };
      }
      const story = pick(r, [
        [`Maya has ${count(a, ["shell", "shells"])}. She finds ${b} more.`, "How many shells now?"],
        [`Leo has ${count(a, ["sticker", "stickers"])}. He gets ${b} more.`, "How many stickers altogether?"],
        [`There ${a === 1 ? "is" : "are"} ${count(a, ["apple", "apples"])} in a bowl. Bix adds ${b} more.`, "How many apples in total?"],
      ]);
      return { kind: "number", prompt: `${story[0]} ${story[1]}`, answer, maxDigits: 2, hint: "Start with the bigger number and count on." };
    }, level, rng);
  },

  // 1 crossed-out pictures to 10 · 2 count back from teens, taking zero · 3 take away and check by adding · 4 stories
  "subtracting-within-20": (level, rng) => {
    // About 2 runs in 5 add or take away zero once, at a random question.
    const zeroAt = level === 2 ? shuffle(rng, [0, 1, 2, 3, 4, -1, -1, -1, -1, -1, -1, -1])[0] : -1;
    return uniqueRun((l, r, i) => {
      let a, b;
      if (l === 1) { a = int(r, 3, 10); b = int(r, 1, a - 1); }
      else if (l === 2 && i === zeroAt) { a = int(r, 3, 19); b = 0; }
      else if (l === 2) {
        a = int(r, 11, 20);
        const ones = a % 10, bridge = ones === 0 || (ones < 9 && r() < 0.5);
        b = bridge ? int(r, ones + 1, 9) : int(r, 1, ones);
      } else { a = int(r, 4, 20); b = int(r, 1, Math.min(9, a - 1)); }
      const left = a - b;
      if (l === 1) return pickNumber(r, "How many are left?", left, [left + 1, left - 1, b, a + b], {
        equation: `${a} − ${b} = ?`, visual: crossedGroup(a, b), hint: "Count the counters without a cross." });
      if (l === 2) return pickNumber(r, "What is left?", left, [left + 1, left - 1, left + 10, left - 10, a + b], {
        equation: `${a} − ${b} = ?`, hint: b === 0 ? "Taking away 0 changes nothing." : "Start at the big number. Count back." });
      if (l === 3) {
        const terms = [a, b, left, left, b, a];
        const gaps = pick(r, [[2, 3], [1, 4], [0, 5]]);
        return { kind: "sequence", prompt: "Take away, then check by adding.", terms, gaps,
          captions: ["Start", "Take away", "Left", "Left", "Add back", "Total"],
          equation: [fact(withGap([a, "−", b, "=", left], [0, 2, 4][gaps[0]])), fact(withGap([left, "+", b, "=", a], [0, 2, 4][gaps[1] - 3]))],
          hint: "Adding back what you took gives the start number." };
      }
      const story = pick(r, [
        [`Leo has ${count(a, ["balloon", "balloons"])}. ${b} ${b === 1 ? "flies" : "fly"} away.`, "How many are left?"],
        [`There are ${a} cakes. Bix eats ${b}.`, "How many cakes are left?"],
        [`Maya has ${a} pens. She gives ${b} away.`, "How many pens does she have now?"],
      ]);
      return { kind: "number", prompt: `${story[0]} ${story[1]}`, answer: left, maxDigits: 2, hint: "Start at the big number and count back." };
    }, level, rng);
  },

  // 1 adding gaps to 10 with the rule · 2 taking-away gaps to 20 · 3 sort facts by their missing number · 4 any gap, = first too
  "missing-numbers-within-20": (level, rng) => {
    const forms = plan(rng, level === 2 ? ["takeAway", "start"] : ["reverseStart", "reversePart", "reverseWhole", "plain", "start"]);
    return uniqueRun((l, r, i) => {
      if (l === 3) {
        const [x, y] = shuffle(r, [2, 3, 4, 5, 6, 7, 8, 9]);
        const card = (gap, k) => {
          const part = int(r, 1, 20 - gap), whole = part + gap;
          const shapes = [`${part} + ? = ${whole}`, `? + ${part} = ${whole}`, `${whole} − ? = ${part}`, `${part} = ${whole} − ?`];
          return { id: `card-${k}`, label: shapes[(k + int(r, 0, 3)) % 4], bin: `gap-${gap}` };
        };
        let cards = [];
        for (let tries = 0; tries < 30 && new Set(cards.map(c => c.label)).size < 4; tries++) cards = [card(x, 0), card(x, 1), card(y, 2), card(y, 3)];
        cards = shuffle(r, cards);
        return { kind: "sort", prompt: "Sort the cards by the missing number.", bins: shuffle(r, [{ id: `gap-${x}`, label: `? is ${x}` }, { id: `gap-${y}`, label: `? is ${y}` }]),
          cards, hint: "Count on from the part to the whole." };
      }
      // Above level 1 the hidden gap stays 1–9, so no "1 = ? − 19".
      const whole = int(r, l === 1 ? 3 : 6, l === 1 ? 10 : 20), part = int(r, Math.max(1, whole - 9), whole - 1), gap = whole - part;
      if (l === 1) {
        const first = r() < 0.5;
        return pickNumber(r, "What number goes in the gap?", gap, [whole, part, gap + 1, gap - 1], {
          equation: first ? `? + ${part} = ${whole}` : `${part} + ? = ${whole}`, rule: "Count on from the part to the whole.",
          hint: "Count on from the number you know." });
      }
      const form = forms[i];
      const shapes = {
        takeAway: [`${whole} − ? = ${part}`, gap, [part, whole, gap + 1, gap - 1]],
        start: [`? − ${gap} = ${part}`, whole, [part, gap, whole + 1, whole - 1, Math.abs(part - gap)]],
        reverseStart: [`${part} = ? − ${gap}`, whole],
        reversePart: [`${part} = ${whole} − ?`, gap],
        reverseWhole: [`${whole} = ${part} + ?`, gap],
        plain: [`${part} + ? = ${whole}`, gap],
      };
      const [equation, answer, mistakes] = shapes[form];
      if (l === 2) return pickNumber(r, "Find the missing number.", answer, mistakes, { equation, hint: "Use adding to check a taking-away fact." });
      return { kind: "number", prompt: "Bix has hidden a number. What is it?", equation, answer, maxDigits: 2, hint: "Put your number in. Is it true?" };
    }, level, rng);
  },

  // 1 pictured duck stories to 10 · 2 add or take away? stories to 20 · 3 build the sentence · 4 more than, fewer than, difference
  "one-step-addition-and-subtraction-problems": (level, rng) => {
    const ops = plan(rng, ["+", "−"]);
    const comparisons = plan(rng, ["more", "fewer", "moreThan", "fewerThan"]);
    return uniqueRun((l, r, i) => {
      const add = ops[i] === "+";
      if (l === 4) {
        const small = int(r, 2, 12), diff = int(r, 1, Math.min(8, 20 - small)), big = small + diff;
        const form = comparisons[i];
        const shells = (n, label) => ({ count: n, label, icon: "🐚", ...named(n, ["shell", "shells"]) });
        if (form === "more" || form === "fewer") return { kind: "number", answer: diff, maxDigits: 2,
          prompt: form === "more" ? `Leo has ${small} shells. Maya has ${big}. How many more does Maya have?` : `Leo has ${small} shells. Maya has ${big}. How many fewer does Leo have?`,
          visual: { type: "objects", groups: [shells(small, "Leo"), shells(big, "Maya")] }, hint: "Match the shells. Count the extras." };
        return { kind: "number", maxDigits: 2, answer: form === "moreThan" ? big : small,
          prompt: form === "moreThan" ? `Leo has ${small} cars. Maya has ${diff} more than Leo. How many does Maya have?`
            : `Maya has ${big} cars. Leo has ${diff} fewer than Maya. How many does Leo have?`,
          hint: "More than means add. Fewer than means take away." };
      }
      const s = l === 1 ? STORIES[0] : pick(r, STORIES.slice(1)); // ducks with pictures first, then new stories
      const a = l === 1 ? int(r, 2, 6) : int(r, 4, 15);
      const b = add ? int(r, 1, Math.min(l === 1 ? 4 : 9, 20 - a)) : int(r, 1, Math.min(l === 1 ? 4 : 9, a - 1));
      const answer = add ? a + b : a - b;
      const text = storyText(s, a, b, add);
      if (l === 3) return { kind: "build", prompt: "Build a number sentence for the story.", text,
        answer: `${a} ${add ? "+" : "−"} ${b} = ${answer}`, tiles: tiles(r, [a, add ? "+" : "−", b, "=", answer]),
        hint: "Start with how many were there first." };
      return pickNumber(r, text, answer, [add ? a - b : a + b, answer + 1, answer - 1, b], {
        ...(l === 1 ? { visual: add ? joinGroups(a, b, "On the pond", "Join", "🦆", s.noun) : crossedGroup(a, b, "On the pond", "🦆", s.noun) } : {}),
        hint: "Are more coming, or are some going away?" });
    }, level, rng);
  },
};
