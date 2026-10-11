import { choice, int, numberQuestion, objects, pick, run } from "./shared.js";

export const groupBuilders = {
  "equal-groups-and-arrays": (level, rng) => run((l, r) => {
    const rows = int(r, 2, l === 1 ? 3 : 4), columns = int(r, 2, 5), answer = rows * columns;
    if (l === 3) return { kind: "sequence", prompt: `Count each row in ${columns}s. Fill the running totals.`,
      terms: [0, columns, columns * 2, columns * 3, columns * 4], gaps: [2, 4], visual: { type: "groups", rows: 4, columns },
      hint: "Each row adds the same number." };
    return numberQuestion(r, l, l === 4 ? `${rows} children each have ${columns} buttons. How many buttons altogether?` : "How many counters altogether?", answer, {
      visual: { type: "groups", rows, columns }, rule: l === 1 ? `There are ${rows} equal rows. Each row has ${columns}.` : undefined,
      hint: "Count one row, then count on the same amount for every row." }, 20);
  }, level, rng),

  "sharing-and-grouping": (level, rng) => run((l, r, i) => {
    const groups = int(r, 2, 4), each = int(r, 1, 5), total = groups * each;
    if (l === 3) return { kind: "sequence", prompt: `Put ${each * 4} counters into groups of ${each}. Fill the running totals.`,
      terms: [0, each, each * 2, each * 3, each * 4], gaps: [2, 3],
      visual: { type: "groups", rows: 4, columns: each }, hint: "Count on by the size of each group.",
      // The drawing and totals use four groups, so the prompt must too.
      text: `This picture shows ${each * 4} counters in four equal groups.` };
    const grouping = l >= 2 && i % 2 === 1;
    return numberQuestion(r, l, grouping ? `Put ${total} counters into groups of ${each}. How many groups?` : `Share ${total} counters equally between ${groups} children. How many each?`, grouping ? groups : each, {
      visual: l === 1 ? { type: "groups", rows: groups, columns: each } : objects(total),
      hint: grouping ? "Make groups all the same size." : "Give one counter to each child. Keep sharing fairly." }, 20);
  }, level, rng),

  "doubling-small-quantities": (level, rng) => run((l, r) => {
    const n = int(r, 1, l === 1 ? 5 : 10);
    if (l === 3) return { kind: "sequence", prompt: "Fill the double and its adding fact.", terms: [n, n * 2, n, n, n * 2], gaps: [1, 4],
      captions: ["Start", "Double", "One group", "Same again", "Total"], visual: { type: "groups", rows: 2, columns: n } };
    return numberQuestion(r, l, l === 4 ? `Bix packs ${n} apples. Maya packs the same number. How many altogether?` : `What is double ${n}?`, n * 2, {
      visual: { type: "groups", rows: 2, columns: n }, rule: l === 1 ? "Double means two equal groups." : undefined,
      hint: "Add the number to itself." }, 20);
  }, level, rng),
};

function fractionBuilder(parts) {
  const name = parts === 2 ? "half" : "quarter";
  return (level, rng) => run((l, r, i) => {
    const correctFirst = r() < 0.5;
    if (l === 1) return choice(r, `Which strip shows one ${name}?`, correctFirst ? "A" : "B", ["A", "B"], {
      visual: { type: "equalParts", parts, rotation: i % 2 ? 90 : 0, correctFirst },
      rule: `A ${name} is one of ${parts} equal parts.`, hint: "The parts must all be the same size." });
    if (l === 2) return { kind: "fraction", mode: "read", parts, shaded: [i % parts], answer: parts === 2 ? "a half" : "a quarter", options: ["a half", "a quarter", "a whole"],
      prompt: "Name the shaded part.", hint: "Count the equal parts of the whole strip." };
    if (l === 3) return { kind: "fraction", mode: "shade", parts, answer: 1, prompt: `Bix cuts a ${pick(r, ["ribbon", "sandwich", "cake", "paper strip"])} into ${parts} equal parts. Shade one ${name}.`, hint: "Shade just one of the equal parts." };
    const each = int(r, 1, parts === 2 ? 10 : 5), total = parts * each;
    return { kind: "number", prompt: `Share ${total} strawberries equally between ${parts} children. How many is one ${name}?`, answer: each,
      visual: objects(total, "Strawberries"), hint: `Share fairly into ${parts} equal groups.` };
  }, level, rng);
}
export const fractionBuilders = {
  "finding-a-half": fractionBuilder(2),
  "finding-a-quarter": fractionBuilder(4),
};
