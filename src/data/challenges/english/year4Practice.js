import { sample, shuffle } from "./shared.js";

/** Word banks carry explicit meanings and near-miss spellings, never guessed distractors. */
function wordTiles(word, rng) {
  const tiles = [...word].map((label, i) => ({ id: String(i), label }));
  const dealt = shuffle(tiles, rng);
  return dealt.map((tile) => tile.label).join("") === word ? [...tiles.slice(1), tiles[0]] : dealt;
}

export function wordQuestions(bank, rule, level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new Error(`no level ${level}`);
  if (level === 2) return Array.from({ length: 5 }, () => ({ kind: "sort",
    prompt: "Sort the sentences. Does the spelling fit the meaning?",
    bins: [{ id: "right", label: "Fits the meaning" }, { id: "wrong", label: "Needs fixing" }],
    cards: shuffle(sample(bank, 6, rng).map((row, i) => ({ id: String(i),
      label: `${row.sentence.replace("___", i < 3 ? row.word : sample(row.wrong, 1, rng)[0])} Meaning: ${row.meaning}.`,
      bin: i < 3 ? "right" : "wrong" })), rng),
    hint: "Three spellings fit their meanings. Check the letters and what each word means." }));
  return sample(bank, 5, rng).map((row) => {
    const base = { sentence: row.sentence, answer: row.word, spoken: row.sentence.replace("___", row.word),
      prompt: `The word means ${row.meaning}.`,
      hint: `It begins with ${row.word[0]} and has ${row.word.length} letters. Check the ending too.` };
    if (level === 1) return { ...base, kind: "choice", rule: row.tip ?? rule,
      options: shuffle([row.word, ...row.wrong], rng) };
    if (level === 3) return { ...base, kind: "build", letters: true,
      tiles: wordTiles(row.word, rng) };
    return { ...base, kind: "type" };
  });
}

/** Grammar/composition banks specify a sentence, its one valid completion, and authored errors. */
export function sentenceQuestions(bank, rule, level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new Error(`no level ${level}`);
  if (level === 2) return Array.from({ length: 5 }, () => ({ kind: "sort",
    prompt: "Sort the sentences: correct or needs fixing?",
    bins: [{ id: "right", label: "Correct" }, { id: "wrong", label: "Needs fixing" }],
    cards: shuffle(sample(bank, 4, rng).map((row, i) => ({ id: String(i),
      label: [row.context, row.sentence.replace("___", i < 2 ? row.answer : sample(row.wrong, 1, rng)[0])].filter(Boolean).join(" "),
      bin: i < 2 ? "right" : "wrong" })), rng),
    hint: "Two sentences need fixing. Read each one aloud and check its grammar and punctuation." }));
  return sample(bank, 5, rng).map((row) => {
    const base = { sentence: row.sentence, answer: row.answer, text: row.context,
      prompt: row.prompt ?? "Complete the sentence correctly.",
      hint: row.hint ?? "Read the whole sentence with each possibility. Check the meaning and the punctuation." };
    if (level === 3) return { ...base, kind: "build", letters: false,
      prompt: row.buildPrompt ?? "Build the correct missing part. Leave the spare tiles.",
      tiles: shuffle([...row.answer.split(" "), ...row.wrong].map((label, i) => ({ id: String(i), label })), rng) };
    return { ...base, kind: "choice", rule: level === 1 ? rule : undefined,
      options: shuffle([row.answer, ...row.wrong], rng) };
  });
}
