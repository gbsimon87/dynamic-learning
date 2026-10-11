import { sample, shuffle } from "./shared.js";
import { tilesFor } from "./year2Practice.js";

const checkLevel = (level) => {
  if (![1, 2, 3, 4].includes(level)) throw new Error(`Unknown Year 1 level ${level}`);
};
const base = (row) => ({ prompt: row.prompt, sentence: row.sentence, text: row.context,
  picture: row.picture, pictureLabel: row.picture ? row.pictureLabel ?? row.answer : undefined,
  answer: row.answer, caseSensitive: row.caseSensitive,
  hint: row.hint ?? "Check each letter. Say the word in parts.", speak: row.speak ?? row.prompt });

/** Five distinct authored items, including with a constant random source. */
export function spellingQuestions(bank, rule, level, rng) {
  checkLevel(level);
  return sample(bank, 5, rng).map((row) => {
    const q = base(row);
    if (level === 4) q.prompt = q.prompt.replace("plural (more than one)", "plural");
    if (level <= 2) return { ...q, kind: "choice", rule: level === 1 ? row.tip ?? rule : undefined,
      options: shuffle([row.answer, ...row.wrong], rng) };
    if (level === 3 || row.caseSensitive) return { ...q, kind: "build", letters: true, tiles: tilesFor(row.answer, true, rng) };
    const start = row.answer.slice(0, row.answer.length > 3 ? 2 : 1);
    return { ...q, kind: "type", apostrophe: false, maxLength: Math.max(8, row.answer.length),
      text: [row.context, `Starts with ${start}. Has ${row.answer.length} letters.`].filter(Boolean).join(" "),
      hint: `Check the ending. The last letter is ${row.answer.at(-1)}.` };
  });
}

/** Composition builds a specified sentence rather than grading free writing. */
export function sentenceQuestions(bank, rule, level, rng) {
  checkLevel(level);
  return sample(bank, 5, rng).map((row) => {
    const q = { ...base(row), variant: "wordy" };
    if (level <= 2) return { ...q, kind: "choice", rule: level === 1 ? rule : undefined,
      options: shuffle([row.answer, ...row.wrong], rng) };
    const letters = !row.answer.includes(" ");
    return { ...q, kind: "build", letters, tiles: tilesFor(row.answer, letters, rng),
      rule: level === 3 ? "Use all the tiles. Check the spaces and end mark." : undefined };
  });
}

/** Read the printed word; speech deliberately reads only the instruction. */
export function wordReadingQuestions(bank, rule, level, rng) {
  checkLevel(level);
  if (level === 3 && bank.every((row) => row.soundGroup)) {
    // Different descriptions of the same phoneme are not different bins.
    const groups = shuffle([...new Set(bank.map((row) => row.soundGroup))], rng);
    return Array.from({ length: 5 }, (_, round) => {
      const selected = Array.from({ length: 3 }, (_, i) => groups[(round + i) % groups.length]);
      const rows = selected.map((group) => sample(bank.filter((row) => row.soundGroup === group), 1, rng)[0]);
      return { kind: "sort", prompt: "Match each word to its vowel sound.",
        speak: "Match each word to its vowel sound.",
        bins: rows.map((row) => ({ id: row.soundGroup, label: row.soundLabel })),
        cards: shuffle(rows.map((row, i) => ({ id: String(i), label: row.word, bin: row.soundGroup })), rng),
        hint: "Say each word. Listen to its vowel sound." };
    });
  }
  if (level === 3) {
    // Distinct meanings make every match unique, including the sound-comparison bank.
    const meanings = [...new Map(bank.map((row) => [row.meaning, row])).values()];
    const dealt = sample(meanings, Math.min(15, meanings.length), rng);
    return Array.from({ length: 5 }, (_, round) => {
      const group = dealt.slice(round * 3, round * 3 + 3);
      return { kind: "sort", prompt: "Match the words to their meanings or sounds.",
        speak: "Match the words to their meanings or sounds.",
        bins: group.map((row, i) => ({ id: String(i), label: row.meaning })),
        cards: shuffle(group.map((row, i) => ({ id: String(i), label: row.word, bin: String(i) })), rng),
        hint: "Read each word. Check the meaning or sound before placing it." };
    });
  }
  const rows = sample(bank, 5, rng);
  return rows.map((row) => {
    const prompt = row.sound ? "Read the word. Which sound matches?" : "Read the word. What does it mean?";
    const text = level === 1 && row.parts && !row.word.includes("'") && !row.sound
      ? row.parts.join(" · ") : row.word;
    const q = { prompt, text, readTextAloud: false,
      speak: prompt, hint: row.hint,
      picture: row.picture, pictureLabel: row.pictureLabel, variant: "wordy" };
    if (level <= 2) return { ...q, kind: "choice", answer: row.meaning,
      rule: level === 1 ? rule : undefined, options: shuffle([row.meaning, ...row.wrong], rng) };
    const instruction = row.sound ? "Build the sound clue for this word." : "Build the meaning of this word.";
    return { ...q, kind: "build", prompt: instruction,
      speak: instruction, answer: row.meaning,
      tiles: tilesFor(row.meaning, false, rng) };
  });
}

/** Stay with one of three short original texts. Never narrate a reading answer. */
export function readingQuestions(bank, rule, level, rng) {
  checkLevel(level);
  const [set] = sample(bank, 1, rng);
  const passage = { title: set.title, blocks: set.lines.map((text) => ({ type: set.poem ? "line" : "p", text })) };
  const choice = (entry) => ({ kind: "choice", passage, readTextAloud: false, variant: "wordy",
    prompt: entry.prompt, speak: entry.prompt, answer: entry.answer,
    options: shuffle([entry.answer, ...entry.wrong], rng),
    rule: level === 1 ? rule : undefined,
    hint: entry.hint ?? "Read the text again. Look for a clue." });
  if (level <= 2) return set.questions.map(choice);
  if (level === 3) return set.questions.map((entry) => ({ kind: "pick", passage, readTextAloud: false,
    prompt: entry.evidencePrompt ?? "Tap the line that gives the clue.",
    speak: entry.evidencePrompt ?? "Tap the line that gives the clue.",
    tokens: set.lines, variant: "sentences", answer: entry.line,
    hinted: [entry.line, (entry.line + 1) % set.lines.length],
    hint: "Read each line. Which one helps answer the question?" }));
  const items = set.order.map((label, i) => ({ id: String(i), label }));
  let dealt = shuffle(items, rng);
  if (dealt.every((item, i) => item.id === String(i))) dealt = [...items.slice(1), items[0]];
  return [{ kind: "order", passage, readTextAloud: false, items: dealt, answer: items.map((item) => item.id),
    prompt: set.orderPrompt ?? "Put the events in story order.",
    speak: set.orderPrompt ?? "Put the events in story order.", direction: "vertical",
    hint: "Find the start. Then find what comes next." }, ...set.questions.slice(1).map(choice)];
}
