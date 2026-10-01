import test from "node:test";
import assert from "node:assert/strict";
import { PATTERNS, WORD_LIST, HOMOPHONE_GROUPS } from "../../english/appendix1.js";
import { BANK as prefixes } from "./year4ThePrefixesIlImAndIr.js";
import { BANK as ous } from "./year4TheSuffixOus.js";
import { BANK as ly } from "./year4MoreLyAdverbs.js";
import { BANK as shun } from "./year4TheShunEndings.js";
import { BANK as zhun } from "./year4TheZhunEnding.js";
import { BANK as gueQue } from "./year4TheEndingsGueAndQue.js";
import { BANK as chSounds } from "./year4GreekAndFrenchCh.js";
import { BANK as sc } from "./year4TheLettersSc.js";
import { BANK as longA } from "./year4TheSoundsEiEighAndEy.js";
import { BANK as words } from "./year4MoreWordsOftenMisspelt.js";
import { BANK as homophones } from "./year4MoreHomophones.js";
import { BANK as dictation, buildDictationQuestions } from "./year4Dictation.js";
import { readBuilt, isBuiltCorrectly } from "./dictation.js";

const lower = (text) => text.toLowerCase();
test("Year 4 spelling banks cover every Appendix 1 example for their assigned patterns", () => {
  for (const [pattern, bank] of Object.entries({ inAssimilated: prefixes, ous, lyExceptions: ly, shun, zhun, gueQue, chSounds, sc, longA })) {
    const expected = PATTERNS[pattern].words;
    const offered = new Set(bank.map((row) => lower(row.word)));
    for (const word of Array.isArray(expected) ? expected : Object.values(expected).flat()) assert.ok(offered.has(lower(word)), word);
  }
});
test("the full Year 4 statutory word list and homophone half are taught", () => {
  assert.deepEqual(new Set(words.map((row) => row.word)), new Set(WORD_LIST[4]));
  assert.deepEqual(new Set(homophones.map((row) => row.word)), new Set(HOMOPHONE_GROUPS[4].flat()));
});
test("Year 4 dictation practises its spelling, grammar and punctuation without losing speech marks", () => {
  assert.ok(dictation.some((row) => row.text.includes('“')));
  assert.ok(dictation.some((row) => row.text.includes('children’s')));
  for (const rng of [() => 0, () => 0.5, () => 0.999]) {
    for (const q of buildDictationQuestions(2, rng)) assert.equal(q.before + q.answer + q.after, q.text);
    for (const level of [3, 4]) for (const q of buildDictationQuestions(level, rng)) {
      assert.equal(readBuilt(q.answer), q.text);
      const pool = [...q.tiles];
      const ids = q.answer.map((label) => { const index = pool.findIndex((tile) => tile.label === label); return pool.splice(index, 1)[0].id; });
      assert.ok(isBuiltCorrectly(q, ids));
      assert.equal(isBuiltCorrectly(q, ids.slice(0, -1)), false);
    }
  }
});
