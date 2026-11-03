import { sample, shuffle } from "./shared.js";
import { choiceQuestion, hintedWith } from "./readingKit.js";

/**
 * Pure question assembly shared by the Year 5 English builders.
 *
 *   wordQuestions      spelling banks   { word, meaning, sentence: "…___…", wrong: [near-miss spellings], tip? }
 *   sentenceQuestions  grammar, punctuation and composition banks
 *                      { sentence: "…___…", answer, wrong: [clearly wrong], context?, prompt?, hint?, build? }
 *   readingQuestions   one passage per run (see the shape below)
 *
 * Every builder takes (level 1–4, rng) and returns 5 questions (3–4 for a
 * single-passage level). The rule (a gloss of the grammar term or the spelling
 * pattern) shows in slots 1–3 and is dropped in slot 4.
 */

const LEVELS = [1, 2, 3, 4];

function wordTiles(word, rng) {
  const tiles = [...word].map((label, i) => ({ id: String(i), label }));
  const dealt = shuffle(tiles, rng);
  return dealt.map((tile) => tile.label).join("") === word ? [...tiles.slice(1), tiles[0]] : dealt;
}

export function wordQuestions(bank, rule, level, rng) {
  if (!LEVELS.includes(level)) throw new Error(`no level ${level}`);
  if (level === 2) {
    return Array.from({ length: 5 }, () => ({
      kind: "sort", rule,
      prompt: "Sort the sentences. Does the spelling fit the meaning?",
      bins: [{ id: "right", label: "Spelt correctly" }, { id: "wrong", label: "Needs fixing" }],
      cards: shuffle(sample(bank, 6, rng).map((row, i) => ({
        id: String(i),
        label: `${row.sentence.replace("___", i < 3 ? row.word : sample(row.wrong, 1, rng)[0])} Meaning: ${row.meaning}.`,
        bin: i < 3 ? "right" : "wrong",
      })), rng),
      hint: "Three spellings are correct. Check each word letter by letter against what it means.",
    }));
  }
  return sample(bank, 5, rng).map((row) => {
    const base = {
      sentence: row.sentence, answer: row.word, spoken: row.sentence.replace("___", row.word),
      prompt: `The word means ${row.meaning}.`,
      hint: row.hint ?? `It begins with ${row.word[0]} and has ${row.word.length} letters. Check the ending too.`,
    };
    if (level === 1) return { ...base, kind: "choice", rule: row.tip ?? rule, options: shuffle([row.word, ...row.wrong], rng) };
    if (level === 3) return { ...base, kind: "build", letters: true, rule: row.tip ?? rule, tiles: wordTiles(row.word, rng) };
    return { ...base, kind: "type" };
  });
}

export function sentenceQuestions(bank, rule, level, rng, defaultHint) {
  if (!LEVELS.includes(level)) throw new Error(`no level ${level}`);
  const fallback = defaultHint ?? "Read the whole sentence with each possibility. Check the meaning and the punctuation.";
  if (level === 2) {
    return Array.from({ length: 5 }, () => ({
      kind: "sort", rule,
      prompt: "Sort the sentences: correct or needs fixing?",
      bins: [{ id: "right", label: "Correct" }, { id: "wrong", label: "Needs fixing" }],
      cards: shuffle(sample(bank, 4, rng).map((row, i) => ({
        id: String(i),
        label: [row.context, row.sentence.replace("___", i < 2 ? row.answer : sample(row.wrong, 1, rng)[0])].filter(Boolean).join(" "),
        bin: i < 2 ? "right" : "wrong",
      })), rng),
      hint: "Two sentences need fixing. Read each one aloud and check its grammar and punctuation.",
    }));
  }
  return sample(bank, 5, rng).map((row) => {
    const base = {
      sentence: row.sentence, answer: row.answer, text: row.context,
      prompt: row.prompt ?? "Complete the sentence correctly.",
      hint: row.hint ?? fallback,
    };
    if (level === 3) {
      const built = row.build ?? { sentence: row.sentence, answer: row.answer, spare: row.wrong };
      return {
        ...base, kind: "build", letters: false, rule,
        sentence: built.sentence, answer: built.answer,
        prompt: built.prompt ?? row.buildPrompt ?? "Build the correct missing part. Leave the spare tiles.",
        tiles: shuffle([...built.answer.split(" "), ...built.spare].map((label, i) => ({ id: String(i), label })), rng),
      };
    }
    return { ...base, kind: "choice", rule: level === 1 ? rule : undefined, options: shuffle([row.answer, ...row.wrong], rng) };
  });
}

/**
 * One passage per run. Authored questions and evidence stay with their text.
 *
 *   set = { title, short, intro: [{ prompt, answer, wrong, hint? } × 3+],
 *           evidence: [every sentence of the passage, exactly as written],
 *           blocks: [{ type: "p" | "h" | "line" | "item", text, label? }],
 *           groups: [{ label, cards: [≥ 3 sentences] } × 2–3], sortPrompt, sortContext?, sortHint?,
 *           questions: [{ prompt, answer, wrong, evidencePrompt, evidence, hint? } × 3–4] }
 */
export function readingQuestions(bank, rule, level, rng) {
  if (!LEVELS.includes(level)) throw new Error(`no reading level ${level}`);
  const [set] = sample(bank, 1, rng);
  if (level === 1) {
    return set.intro.map((entry) => choiceQuestion({
      passage: { blocks: [{ type: "p", text: set.short }] }, // the short extract is its own text, so it carries no title
      prompt: `${rule} ${entry.prompt}`, answer: entry.answer, wrong: entry.wrong,
      hint: entry.hint ?? "Read the short extract again and find the words that support your answer.", rng,
    }));
  }
  if (level === 2) {
    return Array.from({ length: 4 }, () => ({
      kind: "sort", text: set.sortContext, prompt: `${rule} ${set.sortPrompt}`,
      bins: set.groups.map((group, index) => ({ id: String(index), label: group.label })),
      cards: shuffle(set.groups.flatMap((group, index) => sample(group.cards, 2, rng)
        .map((label, i) => ({ id: `${index}-${i}`, label, bin: String(index) }))), rng),
      hint: set.sortHint ?? "Compare the detail in each card with the headings. Which heading does it support?",
    }));
  }
  if (level === 3) {
    return set.questions.map((entry) => ({
      kind: "pick", variant: "sentences",
      prompt: `${rule} ${entry.evidencePrompt}`, tokens: set.evidence,
      answer: set.evidence.indexOf(entry.evidence),
      hinted: hintedWith(set.evidence.indexOf(entry.evidence), set.evidence.map((_, i) => i), rng),
      hint: "Compare the two underlined sentences. Which gives the precise clue asked for?",
    }));
  }
  return set.questions.map((entry) => choiceQuestion({
    passage: { title: set.title, blocks: set.blocks }, prompt: entry.prompt,
    answer: entry.answer, wrong: entry.wrong,
    hint: entry.hint ?? "Use details from the whole text. Choose the answer supported by the writing.", rng,
  }));
}
