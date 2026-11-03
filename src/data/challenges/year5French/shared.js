import { ch, bd, ty, some } from "../topicBank.js";

/** Adds a 🔊 button that says `text` in a French voice. The French is always on screen too. */
export const fr = (text) => ({ speak: text, speakLang: "fr-FR", speakLabel: "Hear the French" });

const bare = (text) => text.replace(/^(le |la |les |l')/, "");
const asciiWord = (text) => /^[a-z]+$/.test(text);

/**
 * Pools of vocabulary questions from rows `[french, english, emoji?]`. Every
 * English meaning in a list must be different, and none may be another's
 * synonym, so each wrong option is plainly wrong.
 *
 *   see      "What does X mean?"            French -> English
 *   say      "How do you say X in French?"  English -> French
 *   picture  "Which word matches the picture?" (rows with an emoji)
 *   type     "Type the French word"          (one unaccented word; le/la/les/l' left off)
 */
export function vocab(rows) {
  const wrongOf = (rng, row, at) => some(rng, rows.map((r) => r[at]), 3, [row[at]]);
  return {
    see: rows.map((row) => (rng) => ch(`What does **${row[0]}** mean?`, row[1], wrongOf(rng, row, 1), fr(row[0]))),
    say: rows.map((row) => (rng) => ch(`How do you say **${row[1]}** in French?`, row[0], wrongOf(rng, row, 0))),
    picture: rows.filter((row) => row[2]).map((row) => (rng) => ch("Which French word matches the picture?", row[0], wrongOf(rng, row, 0), {
      picture: row[2], pictureLabel: row[1], ...fr(row[0]),
    })),
    type: rows.filter((row) => asciiWord(bare(row[0]))).map((row) => ty(
      `Type the French word for **${row[1]}**${bare(row[0]) === row[0] ? "" : " (just the word: leave off le, la, les or l')"}.`, bare(row[0]),
      row[2] ? { picture: row[2], pictureLabel: row[1] } : {})),
  };
}

/**
 * The shape every vocabulary topic shares.
 *   groups   arrays of vocab rows (wrong options come from the same group)
 *   builds   [french sentence, english] pairs, built from tiles
 *   sorts    st(...) templates      orders   od(...) templates
 *   applied  extra choice or typed questions for level 4
 */
export function wordTopic({ rule, hint, groups, builds, sorts = [], orders = [], applied = [] }) {
  const vs = groups.map(vocab);
  const tokens = builds.flatMap(([f]) => f.split(" "));
  return {
    rule, hint,
    levels: {
      1: vs.flatMap((v) => [...v.see, ...v.picture]),
      2: [...vs.flatMap((v) => v.say), ...sorts],
      3: [
        ...builds.map(([f, e]) => bd(`Put the French sentence in order: **${e}**`, f, fr(f))),
        ...sorts, ...orders,
      ],
      4: [
        ...vs.flatMap((v) => v.type),
        ...applied,
        ...builds.map(([f, e]) => (rng) => bd(`Build the French for: **${e}**`, f, { more: some(rng, [...new Set(tokens)], 2, f.split(" ")) })),
      ],
    },
  };
}
