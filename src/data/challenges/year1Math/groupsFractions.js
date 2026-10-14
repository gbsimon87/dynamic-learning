import { int, pick, shuffle } from "./shared.js";
import { pickNumber, plan, questionKey, uniqueRun } from "./arithmetic.js";

// Things to group, share and halve: [singular, plural], picture, and what holds a group.
const THINGS = [
  { noun: ["apple", "apples"], icon: "🍎", box: ["bag", "bags"] },
  { noun: ["cake", "cakes"], icon: "🧁", box: ["box", "boxes"] },
  { noun: ["egg", "eggs"], icon: "🥚", box: ["nest", "nests"] },
  { noun: ["strawberry", "strawberries"], icon: "🍓", box: ["bowl", "bowls"] },
];
const pile = (total, thing) => ({ type: "objects", groups: [{ count: total, label: cap(thing.noun[1]), icon: thing.icon, noun: thing.noun[total === 1 ? 0 : 1] }] });
const cap = word => word[0].toUpperCase() + word.slice(1);

export const groupBuilders = {
  // 1 count an array, rule given · 2 count pictured equal groups · 3 running totals row by row · 4 equal-groups stories
  "equal-groups-and-arrays": (level, rng) => uniqueRun((l, r) => {
    const rows = l === 3 ? int(r, 3, 5) : int(r, 2, l === 1 ? 3 : 5);
    const columns = int(r, 2, Math.min(5, Math.floor(20 / rows))), answer = rows * columns;
    const mistakes = [rows + columns, answer + columns, answer - columns, answer + 1, answer - 1];
    if (l === 1) return pickNumber(r, "How many counters altogether?", answer, mistakes, {
      visual: { type: "groups", rows, columns }, rule: `There are ${rows} rows. Each row has ${columns}.`,
      hint: "Count one row, then count on the same again." });
    if (l === 2) {
      const thing = pick(r, THINGS);
      return pickNumber(r, `How many ${thing.noun[1]} altogether?`, answer, mistakes, {
        visual: { type: "objects", groups: Array.from({ length: rows }, (_, k) => ({ count: columns, label: `${cap(thing.box[0])} ${k + 1}`, icon: thing.icon, noun: thing.noun[1] })) },
        hint: "Count in equal jumps, one group at a time." });
    }
    if (l === 3) {
      const terms = Array.from({ length: rows + 1 }, (_, k) => k * columns);
      const gaps = shuffle(r, Array.from({ length: rows }, (_, k) => k + 1)).slice(0, 2).sort((x, y) => x - y);
      return { kind: "sequence", prompt: `Count the rows in ${columns}s. Fill the gaps.`, terms, gaps,
        visual: { type: "groups", rows, columns }, hint: "Each row adds the same number." };
    }
    const thing = pick(r, THINGS);
    return { kind: "number", prompt: `There are ${rows} ${thing.box[1]}. Each has ${columns} ${thing.noun[1]}. How many ${thing.noun[1]} altogether?`,
      answer, maxDigits: 2, hint: "Count on the same number for each one." };
  }, level, rng),

  // 1 share a pile, rule given · 2 make groups from a pile · 3 count up in groups · 4 share or group? stories
  "sharing-and-grouping": (level, rng) => {
    const kinds = plan(rng, ["share", "group"]);
    return uniqueRun((l, r, i) => {
      const groups = l === 3 ? int(r, 3, 5) : int(r, 2, l === 1 ? 3 : 5);
      const each = int(r, 2, Math.min(5, Math.floor(20 / groups))), total = groups * each;
      const thing = pick(r, THINGS);
      if (l === 3) {
        const terms = Array.from({ length: groups + 1 }, (_, k) => k * each);
        const gaps = shuffle(r, Array.from({ length: groups }, (_, k) => k + 1)).slice(0, 2).sort((x, y) => x - y);
        return { kind: "sequence", prompt: `Put ${total} counters into groups of ${each}. Count up in ${each}s.`, terms, gaps,
          visual: { type: "groups", rows: groups, columns: each }, hint: "Count on by the size of each group." };
      }
      const share = l === 1 || (l === 4 && kinds[i] === "share");
      const prompt = share ? `Share ${total} ${thing.noun[1]} between ${groups} children. How many each?`
        : `Put ${total} ${thing.noun[1]} into ${thing.box[1]} of ${each}. How many ${thing.box[1]}?`;
      const answer = share ? each : groups;
      if (l === 4) return { kind: "number", prompt, answer, maxDigits: 2,
        hint: share ? "Give one each, again and again." : "Count out a group at a time." };
      return pickNumber(r, prompt, answer, [share ? groups : each, total, answer + groups, answer * 2, total - answer], {
        visual: pile(total, thing), ...(l === 1 ? { rule: "Give 1 to each child, again and again." } : {}),
        hint: share ? "Give one each. Keep going until none are left." : "Count out a group. Keep going until none are left." });
    }, level, rng);
  },

  // 1 double with two pictured rows · 2 double, or what was doubled? · 3 double and its adding fact · 4 doubling stories
  "doubling-small-quantities": (level, rng) => {
    const forms = plan(rng, ["double", "undo"]);
    return uniqueRun((l, r, i) => {
      const n = int(r, l === 1 ? 1 : 2, l === 1 ? 6 : 10), double = n * 2;
      if (l === 1) return pickNumber(r, `What is double ${n}?`, double, [n, n + 2, double + 1, double - 1], {
        visual: { type: "groups", rows: 2, columns: n }, rule: "Double means two equal groups.", hint: "Count both rows." });
      if (l === 2) return forms[i] === "double"
        ? pickNumber(r, `What is double ${n}?`, double, [n + 2, double + 1, double - 1, n], { hint: "Add the number to itself." })
        : pickNumber(r, `Bix doubles a number and gets ${double}. What was the number?`, n, [double, n + 1, n - 1, n + 2], { hint: "Which number added to itself makes it?" });
      if (l === 3) {
        const gaps = [pick(r, [0, 1]), pick(r, [2, 4])];
        return { kind: "sequence", prompt: "Fill the double and its adding fact.", terms: [n, double, n, n, double], gaps,
          captions: ["Start", "Double", "One group", "Same again", "Total"], visual: { type: "groups", rows: 2, columns: n } };
      }
      const thing = pick(r, THINGS);
      return { kind: "number", prompt: `Bix packs ${n} ${thing.noun[1]}. Maya packs the same. How many ${thing.noun[1]} altogether?`,
        answer: double, maxDigits: 2, hint: "The same again means double." };
    }, level, rng);
  },
};

// Strips for "which shows one half/quarter?": the shaded first part is the one being named.
const STRIPS = {
  2: { right: [1, 1], unequal: [[1, 2], [1, 3], [2, 3], [3, 1]], otherEqual: [[1, 1, 1], [1, 1, 1, 1]] },
  4: { right: [1, 1, 1, 1], unequal: [[1, 1, 1, 3], [1, 2, 2, 1], [2, 1, 1, 2], [1, 1, 2, 2]], otherEqual: [[1, 1], [1, 1, 1]] },
};
const READS = { "a half": [[2, 1], [4, 2]], "a quarter": [[4, 1]], "a whole": [[2, 2], [4, 4]] };
const SHADE_PARTS = { 2: [4, 6, 8], 4: [8, 12] };

function fractionBuilder(parts) {
  const name = parts === 2 ? "half" : "quarter", article = parts === 2 ? "a half" : "a quarter", of = parts === 2 ? "half" : "a quarter";
  return (level, rng) => {
    const reads = plan(rng, parts === 2 ? ["a half", "a half", "a quarter", "a whole"] : ["a quarter", "a quarter", "a half", "a whole"]);
    return uniqueRun((l, r, i) => {
      if (l === 1) {
        const { right, unequal, otherEqual } = STRIPS[parts];
        // Always one unfair cut; the other wrong strip is another unfair cut or the wrong number of equal parts.
        const unfair = pick(r, unequal);
        const strips = shuffle(r, [right, unfair, pick(r, [...unequal.filter(s => s !== unfair), ...otherEqual])]);
        const answer = String.fromCharCode(65 + strips.indexOf(right));
        return { kind: "choice", prompt: `Which strip shows one ${name}?`, answer, options: ["A", "B", "C"], variant: "wordy",
          visual: { type: "equalParts", strips, rotation: r() < 0.5 ? 90 : 0 },
          rule: `A ${name} is one of ${parts} equal parts.`, hint: `Look for ${parts} parts that are all the same size.` };
      }
      if (l === 2) {
        const [bar, shadedCount] = pick(r, READS[reads[i]]);
        const start = int(r, 0, bar - shadedCount);
        return { kind: "fraction", mode: "read", parts: bar, shaded: Array.from({ length: shadedCount }, (_, k) => start + k), answer: reads[i],
          options: shuffle(r, ["a half", "a quarter", "a whole"]), prompt: "How much is shaded?", hint: "Count the equal parts. How many are shaded?" };
      }
      if (l === 3) {
        const bar = pick(r, SHADE_PARTS[parts]);
        return { kind: "fraction", mode: "shade", parts: bar, answer: bar / parts,
          prompt: `Bix cuts a ${pick(r, ["ribbon", "cake", "paper strip", "chocolate bar"])} into ${bar} equal parts. Shade ${article}.`,
          hint: `Make ${parts} equal groups of parts. Shade one group.` };
      }
      const thing = pick(r, THINGS), each = int(r, parts === 2 ? 2 : 1, parts === 2 ? 10 : 5), total = parts * each;
      return { kind: "number", prompt: `Leo gets ${of} of these ${total} ${thing.noun[1]}. How many does he get?`, answer: each, maxDigits: 2,
        visual: pile(total, thing), hint: `Share them into ${parts} equal groups.` };
    }, level, rng, q => (q.mode === "shade" ? q.prompt : questionKey(q)));
  };
}
export const fractionBuilders = {
  "finding-a-half": fractionBuilder(2),
  "finding-a-quarter": fractionBuilder(4),
};
