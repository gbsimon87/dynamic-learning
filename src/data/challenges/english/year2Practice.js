import { sample, shuffle } from "./shared.js";

const gloss = (text, level) => level === 4 ? text : text
  .replace(/\badjective\b/g, "adjective (describing word)")
  .replace(/\badverb\b/g, "adverb (word telling how)")
  .replace(/\bnoun\b/g, "noun (naming word)")
  .replace(/\bpast tense\b/g, "past tense (already happened)")
  .replace(/\bpresent tense\b/g, "present tense (now or regularly)");

export function tilesFor(answer, letters, rng) {
  const tiles = (letters ? [...answer] : answer.split(" ")).map((label, i) => ({ id: String(i), label }));
  const dealt = shuffle(tiles, rng);
  return dealt.map((tile) => tile.label).join(letters ? "" : " ") === answer
    ? [...tiles.slice(1), tiles[0]] : dealt;
}

/** Five short rounds, with four cards at most in a Year 2 sort. */
export function wordQuestions(bank, rule, level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new Error(`Unknown Year 2 level ${level}`);
  if (level === 2) return Array.from({ length: 5 }, () => ({
    kind: "sort", prompt: "Sort the words. Do they fit their clues?",
    bins: [{ id: "right", label: "Fits the clue" }, { id: "wrong", label: "Needs fixing" }],
    cards: shuffle(sample(bank, 4, rng).map((row, i) => ({
      id: String(i), label: `${gloss(row.clue, level)} ${i < 2 ? row.answer : row.wrong[0]}`,
      bin: i < 2 ? "right" : "wrong",
    })), rng), hint: "Two cards need fixing. Check each word against its clue.",
  }));
  return sample(bank, 5, rng).map((row) => {
    const base = { prompt: gloss(row.clue, level), sentence: row.sentence, answer: row.answer,
      hint: row.hint ?? `It begins with ${row.answer[0]} and has ${row.answer.length} letters.`,
      speak: row.clue };
    if (level === 1) return { ...base, kind: "choice", rule: row.tip ?? rule,
      options: shuffle([row.answer, ...row.wrong], rng) };
    if (level === 3) return { ...base, kind: "build", letters: true, tiles: tilesFor(row.answer, true, rng) };
    const start = row.answer.slice(0, row.answer.length > 3 ? 2 : 1);
    return { ...base, kind: "type", apostrophe: /[’']/.test(row.answer),
      text: `Starts with ${start}. Has ${row.answer.replace(/[’']/g, "").length} letters.` };
  });
}

/** Context makes each completion unique; no free writing is marked wrong. */
export function sentenceQuestions(bank, rule, level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new Error(`Unknown Year 2 level ${level}`);
  if (level === 2) return Array.from({ length: 5 }, () => ({
    kind: "sort", prompt: "Sort the answers. Do they follow the instruction?",
    bins: [{ id: "right", label: "Fits the instruction" }, { id: "wrong", label: "Needs fixing" }],
    cards: shuffle(sample(bank, 4, rng).map((row, i) => ({ id: String(i),
      label: `${gloss(row.prompt, level)} ${row.sentence.replace("___", i < 2 ? row.answer : row.wrong[0])}`,
      bin: i < 2 ? "right" : "wrong" })), rng),
    hint: "Read the instruction before each answer. Two answers need fixing.",
  }));
  return sample(bank, 5, rng).map((row) => {
    const base = { prompt: gloss(row.prompt, level), sentence: row.sentence, text: row.context,
      caseSensitive: row.caseSensitive, variant: "wordy",
      answer: row.answer, hint: row.hint ?? "Read the instruction again. Check every word and the punctuation.",
      speak: row.prompt };
    if (level === 3) {
      const letters = !row.answer.includes(" ");
      return { ...base, kind: "build", letters, tiles: tilesFor(row.answer, letters, rng),
        rule: "Use all the tiles to build the missing part." };
    }
    return { ...base, kind: "choice", rule: level === 1 ? rule : undefined,
      options: shuffle([row.answer, ...row.wrong], rng) };
  });
}

/** Three original passages per bank. Each run stays with one text. */
export function readingQuestions(bank, rule, level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new Error(`Unknown Year 2 level ${level}`);
  const [set] = sample(bank, 1, rng);
  const passage = { title: set.title, blocks: set.blocks };
  const choice = (entry) => ({ kind: "choice", passage, variant: "wordy",
    prompt: entry.prompt, answer: entry.answer, options: shuffle([entry.answer, ...entry.wrong], rng),
    rule: level === 1 ? rule : undefined, hint: entry.hint ?? "Read the text again. Find the clue for your answer.",
    speak: `${set.blocks.map((b) => b.text).join(" ")} ${entry.prompt}` });
  if (level === 1) return set.questions.slice(0, 3).map(choice);
  if (level === 2) return set.questions.map(choice);
  if (level === 3) return set.questions.slice(0, 3).map((entry) => ({
    kind: "pick", passage, variant: "sentences", tokens: set.evidence,
    prompt: entry.evidencePrompt, answer: set.evidence.indexOf(entry.evidence),
    hint: "Which line gives the clue? Read the lines carefully.",
    speak: entry.evidencePrompt,
  }));
  const items = set.order.map((label, i) => ({ id: String(i), label }));
  const dealt = shuffle(items, rng);
  const order = { kind: "order", passage, prompt: set.orderPrompt,
    speak: `${set.blocks.map((b) => b.text).join(" ")} ${set.orderPrompt}`,
    direction: "vertical", answer: items.map((item) => item.id),
    items: dealt.every((item, i) => item.id === String(i)) ? [...items.slice(1), items[0]] : dealt,
    hint: set.orderHint ?? "Use the order in the text. Find what comes first, next and last." };
  return [order, ...set.questions.slice(1).map(choice)];
}
