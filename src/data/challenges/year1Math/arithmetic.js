import { choice, int, numberQuestion, objects, run, tiles } from "./shared.js";

export const arithmeticBuilders = {
  "addition-subtraction-and-equals-signs": (level, rng) => run((l, r, i) => {
    const a = int(r, 2, 8), b = int(r, 1, a);
    const subtract = i % 2 === 1, total = subtract ? a - b : a + b;
    const symbol = subtract ? "−" : "+";
    if (l === 3) return { kind: "build", prompt: "Build the number sentence in the same order as the story.",
      text: subtract ? `Start with ${a}. Take away ${b}. There are ${total} left.` : `Start with ${a}. Add ${b}. There are ${total} altogether.`,
      answer: `${a} ${symbol} ${b} = ${total}`, tiles: tiles(r, [a, symbol, b, "=", total]) };
    if (l === 4) return { kind: "number", prompt: "Make the two sides equal. Write the missing number.", equation: `${a} ${symbol} ${b} = ?`, answer: total,
      visual: subtract ? objects(a, "Start", b) : { type: "objects", groups: [{ count: a, label: "Start" }, { count: b, label: "Add" }] } };
    const equals = l === 2 && i === 4;
    return choice(r, equals ? "Which sign means both sides have the same value?" : `Which sign means ${subtract ? "take away" : "put together"}?`, equals ? "=" : symbol, ["+", "−", "="], {
      rule: l === 1 ? "+ means add. − means take away. = means the same value." : undefined,
      ...(equals ? {} : { equation: `${a} ? ${b} = ${total}` }), hint: "Think about what happens to the group." });
  }, level, rng),

  "number-bonds-within-20": (level, rng) => run((l, r, i) => {
    const total = l === 1 ? 10 : l === 2 ? 20 : int(r, 2, 20);
    const a = int(r, 0, total), b = total - a;
    if (l === 3) return { kind: "sequence", prompt: "Fill both number-bond facts.", terms: [a, b, total, total, a, b], gaps: [1, 5],
      captions: ["First part", "Other part", "Whole", "Whole", "Take away", "Left"],
      equation: [`${a} + ? = ${total}`, `${total} − ${a} = ?`], hint: "Adding and taking away use the same three numbers." };
    const related = l === 4 && i % 2 === 1;
    return numberQuestion(r, l, related ? `Bix has ${total} beads. ${a} are red. How many are blue?` : `What goes with ${a} to make ${total}?`, b,
      { equation: related ? `${total} − ${a} = ?` : `${a} + ? = ${total}`,
        ...(l === 1 ? { visual: objects(total, "Whole group") } : {}), hint: "Count on from the first part to the whole." }, 20);
  }, level, rng),

  "adding-within-20": (level, rng) => run((l, r, i) => {
    const a = int(r, 0, l === 1 ? 5 : 19), b = i === 0 ? 0 : int(r, 0, (l === 1 ? 10 : 20) - a);
    const answer = a + b;
    if (l === 3) return { kind: "sequence", prompt: "Fill the missing total in each addition.",
      terms: [a, b, answer, b, a, answer], gaps: [2, 5], captions: ["Start", "Add", "Total", "Start", "Add", "Total"],
      equation: [`${a} + ${b} = ?`, `${b} + ${a} = ?`] };
    return numberQuestion(r, l, l === 4 ? `Maya has ${a} shells. She finds ${b} more. How many altogether?` : "How many altogether?", answer, {
      equation: `${a} + ${b} = ?`, visual: { type: "objects", groups: [{ count: a, label: "Start" }, { count: b, label: "Add" }] },
      hint: "Start at the first number and count on." }, 20);
  }, level, rng),

  "subtracting-within-20": (level, rng) => run((l, r, i) => {
    const a = int(r, 1, l === 1 ? 10 : 20), b = i === 0 ? 0 : int(r, 0, a);
    if (l === 3) return { kind: "sequence", prompt: "Fill the taking-away fact and its adding check.", terms: [a, b, a - b, a - b, b, a], gaps: [2, 5],
      captions: ["Start", "Take away", "Left", "Left", "Put back", "Total"], equation: [`${a} − ${b} = ?`, `${a - b} + ${b} = ?`] };
    return numberQuestion(r, l, l === 4 ? `Leo has ${a} balloons. ${b} fly away. How many are left?` : "How many are left?", a - b, {
      equation: `${a} − ${b} = ?`, visual: objects(a, "Start", b), hint: "Count the counters without a cross." }, 20);
  }, level, rng),

  "missing-numbers-within-20": (level, rng) => run((l, r, i) => {
    const total = int(r, 2, l === 1 ? 10 : 20), part = int(r, 0, total), missing = total - part;
    const equations = [`${part} + ? = ${total}`, `? + ${part} = ${total}`, `${total} − ? = ${part}`, `${part} = ? − ${missing}`];
    const index = l === 1 ? 0 : i % 4, answer = index === 3 ? total : missing;
    if (l === 3) return { kind: "sequence", prompt: "Complete both linked facts.", terms: [part, missing, total, total, missing, part], gaps: [1, 4],
      captions: ["Part", "Other part", "Whole", "Whole", "Take away", "Left"], equation: [`${part} + ? = ${total}`, `${total} − ? = ${part}`] };
    return numberQuestion(r, l, l === 4 ? "Bix has hidden a number. What is it?" : "What number goes in the gap?", answer, {
      equation: equations[index], hint: "Use adding to check a taking-away fact.",
      ...(l === 1 ? { visual: objects(total, "Whole") } : {}) }, 20);
  }, level, rng),

  "one-step-addition-and-subtraction-problems": (level, rng) => run((l, r, i) => {
    const a = int(r, 1, l === 1 ? 5 : 10), b = int(r, 0, a), add = i % 2 === 0;
    const answer = add ? a + b : a - b;
    const story = add ? `There are ${a} ducks. ${b} more join them. How many ducks altogether?` : `There are ${a} ducks. ${b} swim away. How many ducks are left?`;
    if (l === 3) return { kind: "build", prompt: "Build a number sentence for the story. Start with the ducks already there.", text: story,
      answer: `${a} ${add ? "+" : "−"} ${b} = ${answer}`, tiles: tiles(r, [a, add ? "+" : "−", b, "=", answer]) };
    if (l === 4 && i === 4) return { kind: "number", prompt: `Leo has ${a} shells. Maya has ${a + b}. How many more does Maya have?`, answer: b,
      visual: { type: "objects", groups: [{ count: a, label: "Leo" }, { count: a + b, label: "Maya" }] }, hint: "Match the shells. Count the extras." };
    return numberQuestion(r, l, story, answer, { visual: add ? { type: "objects", groups: [{ count: a, label: "Start" }, { count: b, label: "Join" }] } : objects(a, "Start", b),
      hint: "Are things joining the group or leaving it?" }, 20);
  }, level, rng),
};
