import { it, vi } from "vitest";
import { playThrough } from "./helpers/englishReplay";
import AddingPrefixesGame from "../../src/pages/skills/english/challenges/year3/AddingPrefixesGame";
import DoublingBeforeASuffixGame from "../../src/pages/skills/english/challenges/year3/DoublingBeforeASuffixGame";
import TheSuffixesAtionAndLyGame from "../../src/pages/skills/english/challenges/year3/TheSuffixesAtionAndLyGame";
import WordsOftenMisspeltGame from "../../src/pages/skills/english/challenges/year3/WordsOftenMisspeltGame";
import { buildAddingPrefixesQuestions } from "../../src/data/challenges/english/addingPrefixes";
import { buildDoublingQuestions } from "../../src/data/challenges/english/doublingBeforeASuffix";
import { buildSuffixQuestions } from "../../src/data/challenges/english/theSuffixesAtionAndLy";
import { buildWordsOftenMisspeltQuestions } from "../../src/data/challenges/english/wordsOftenMisspelt";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => true }));
vi.mock("../../src/components/celebration/sound/player", async (original) => ({ ...await original(), playCue: () => () => {} }));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => {} }));

// Year 3 games moved onto EnglishPracticeGame; each was replayed side by side
// with its old version (replayParity) before the old game was removed.
for (const [name, Game, bank] of [
  ["adding prefixes", AddingPrefixesGame, buildAddingPrefixesQuestions],
  ["doubling before a suffix", DoublingBeforeASuffixGame, buildDoublingQuestions],
  ["the suffixes ation and ly", TheSuffixesAtionAndLyGame, buildSuffixQuestions],
  ["words often misspelt", WordsOftenMisspeltGame, buildWordsOftenMisspeltQuestions],
]) {
  it(`${name}: retry, hint and completion on every level`, () => playThrough({ Game, bank }), 120000);
}
