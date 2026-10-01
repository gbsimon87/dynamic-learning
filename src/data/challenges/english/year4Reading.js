import { sample, shuffle } from "./shared.js";
import { choiceQuestion, hintedWith } from "./readingKit.js";

/** One passage per run. Authored questions and evidence stay with their text. */
export function readingQuestions(bank, rule, level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new Error(`no reading level ${level}`);
  const [set] = sample(bank, 1, rng);
  if (level === 1) return set.intro.map((entry) => choiceQuestion({
    passage: { title: set.title, blocks: [{ type: "p", text: set.short }] },
    prompt: `${rule} ${entry.prompt}`, answer: entry.answer, wrong: entry.wrong,
    hint: entry.hint ?? "Read the short extract again and find the words that support your answer.", rng }));
  if (level === 2) return Array.from({ length: 4 }, () => ({ kind: "sort",
    text: set.sortContext, prompt: set.sortPrompt,
    bins: set.groups.map((group, index) => ({ id: String(index), label: group.label })),
    cards: shuffle(set.groups.flatMap((group, index) => sample(group.cards, 2, rng)
      .map((label, i) => ({ id: `${index}-${i}`, label, bin: String(index) }))), rng),
    hint: set.sortHint ?? "Compare the detail in each card with both headings. Which heading does it support?" }));
  if (level === 3) return set.questions.map((entry) => ({ kind: "pick", variant: "sentences",
    prompt: entry.evidencePrompt, tokens: set.evidence,
    answer: set.evidence.indexOf(entry.evidence),
    hinted: hintedWith(set.evidence.indexOf(entry.evidence), set.evidence.map((_, i) => i), rng),
    hint: "Compare the two underlined sentences. Which gives the precise clue asked for?" }));
  return set.questions.map((entry) => choiceQuestion({
    passage: { title: set.title, blocks: set.blocks }, prompt: entry.prompt,
    answer: entry.answer, wrong: entry.wrong,
    hint: entry.hint ?? "Use details from the whole text. Choose the answer supported by the writing.", rng }));
}
