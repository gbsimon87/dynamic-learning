import { choice, int, numberQuestion, numericOptions, objects, order, run, shuffle, tiles, WORDS } from "./shared.js";

export const numberBuilders = {
  "counting-objects": (level, rng) => run((l, r) => {
    const n = int(r, 1, l === 1 ? 5 : l === 2 ? 10 : 20);
    if (l === 3) {
      const counts = shuffle(r, [2, 4, 6, 8, 10]).slice(0, 3).sort((a, b) => a - b);
      return order(r, "Put the groups in order: fewest first.", counts.map(x => "● ".repeat(x).trim()), counts);
    }
    return numberQuestion(r, l, l === 4 ? "Bix packs these apples. How many apples?" : "How many counters?", n,
      { visual: objects(n, l === 4 ? "Apples" : "Counters"), hint: "Touch each picture once as you count." }, 20);
  }, level, rng),

  "counting-forwards-and-backwards-to-100": (level, rng) => run((l, r, i) => {
    const step = l === 1 ? 1 : i % 2 ? -1 : 1;
    // Later runs deliberately cross a tens boundary, including 99 → 100.
    const start = l === 1 ? int(r, 0, 15) : i === 4 ? (step > 0 ? 96 : 100) : int(r, step > 0 ? 0 : 4, step > 0 ? 96 : 100);
    const terms = Array.from({ length: 5 }, (_, j) => start + step * j);
    if (l === 3) return order(r, step > 0 ? "Count forwards. Put the numbers in order." : "Count backwards. Put the numbers in order.", terms, terms);
    if (l === 4) return { kind: "number", prompt: `Bix is on ${start}. Count ${step > 0 ? "forwards" : "backwards"} ${4} steps. Where does Bix land?`, answer: terms[4],
      visual: { type: "numberTrack", terms: terms.slice(0, 4) }, hint: "Start at Bix's number. Move one number at a time." };
    return { kind: "sequence", prompt: `Count ${step > 0 ? "forwards" : "backwards"}. Fill the gap.`, terms, gaps: [l === 1 ? 4 : 2],
      rule: l === 1 ? "Forwards means one more each time." : undefined, hint: "Say the numbers in order." };
  }, level, rng),

  "reading-and-writing-numerals-to-100": (level, rng) => run((l, r) => {
    const n = int(r, 1, l === 1 ? 20 : 100);
    if (l === 3) {
      const base = int(r, 0, 90);
      const values = [base, base + 2, base + 5, base + 10];
      return order(r, "Put the numerals in order: smallest first.", values, values);
    }
    return numberQuestion(r, l, l === 4 ? "Write the number shown by the blocks." : "Which numeral matches the blocks?", n, {
      visual: { type: "blocks", number: n }, hint: "Each long rod has ten little squares. Each small cube is one." });
  }, level, rng),

  "counting-in-twos-fives-and-tens": (level, rng) => run((l, r, i) => {
    const step = [2, 5, 10][i % 3];
    const start = l === 1 ? 0 : int(r, 0, Math.floor(100 / step) - 4) * step;
    const terms = Array.from({ length: 5 }, (_, j) => start + j * step);
    if (l === 4) {
      const groups = int(r, 2, 5);
      return { kind: "number", prompt: `${groups} bags each hold ${step} beads. Count in ${step}s. How many beads?`,
        answer: groups * step, visual: { type: "groups", rows: groups, columns: step }, hint: `Count one row at a time in ${step}s.` };
    }
    if (l === 3) return order(r, `Put the numbers in order. Count in ${step}s.`, terms, terms);
    return { kind: "sequence", prompt: `Count in ${step}s. Fill the gap.`, terms, gaps: [l === 1 ? 4 : 2],
      hint: `Add ${step} each time.` };
  }, level, rng),

  "one-more-and-one-less": (level, rng) => run((l, r, i) => {
    const n = int(r, 1, l === 1 ? 9 : l === 3 ? 98 : 99);
    const more = i % 2 === 0;
    if (l === 3) return { kind: "sequence", prompt: "Find one less and one more than the Start number.", terms: [n - 1, n, n + 1, n + 2], gaps: [0, 2],
      captions: ["One less", "Start", "One more", "Next"], hint: "One less comes just before. One more comes just after." };
    return numberQuestion(r, l, l === 4 ? `There are ${n} children on a bus. One ${more ? "gets on" : "gets off"}. How many now?` : `What is one ${more ? "more" : "less"} than ${n}?`, n + (more ? 1 : -1), {
      ...(l === 1 ? { visual: objects(n) } : {}), hint: `Count one step ${more ? "forwards" : "backwards"}.` });
  }, level, rng),

  "comparing-and-ordering-quantities": (level, rng) => run((l, r, i) => {
    const a = int(r, 3, 10), b = i % 3 === 0 ? a : a + (i % 3 === 1 ? 1 : -1) * int(r, 1, 2);
    if (l === 3) {
      const counts = [a, a + 2, a + 4];
      return order(r, "Put the groups in order: least to most.", counts.map(x => "● ".repeat(x).trim()), counts);
    }
    const answer = a === b ? "equal to" : a < b ? "fewer than" : "more than";
    return choice(r, l === 4 ? "Leo has the red counters. Maya has the blue counters. Leo has…" : "The red group has… the blue group.", answer, ["more than", "fewer than", "equal to"], {
      visual: { type: "objects", groups: [{ count: a, label: "Red" }, { count: b, label: "Blue" }] },
      hint: "Match one red counter to one blue counter. Are any left over?" });
  }, level, rng),

  "number-words-to-20": (level, rng) => run((l, r) => {
    const n = int(r, 1, l === 1 ? 10 : 20), word = WORDS[n];
    if (l === 3) return { kind: "build", letters: true, prompt: `Build the number word for ${n}.`, answer: word,
      tiles: tiles(r, [...word], true), hint: "Say the number word, then put its letters in order." };
    if (l === 4) return { kind: "type", prompt: `Write ${n} in words.`, answer: word, maxLength: 9, apostrophe: false, hint: "Say the word slowly. Which letters do you hear?" };
    if (l === 2) return { kind: "number", prompt: `Write this word as a numeral: **${word}**.`, answer: n, maxDigits: 2 };
    const values = numericOptions(r, n, 20).filter(x => x > 0);
    return choice(r, `Which word means ${n}?`, word, values.map(x => WORDS[x]), { visual: objects(n) });
  }, level, rng),
};
