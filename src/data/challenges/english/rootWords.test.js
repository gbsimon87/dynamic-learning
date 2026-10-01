import test from "node:test";
import assert from "node:assert/strict";
import { findUsSpellings } from "../../english/textChecks.js";
import {
  AFFIX_MEANINGS,
  BUILD_ITEMS,
  FIND_ITEMS,
  MEANING_ITEMS,
  ODD_SETS,
  YEAR3_PREFIXES,
  YEAR3_SUFFIXES,
  buildRootWordsQuestions,
  builtWord,
  wordOf,
} from "./rootWords.js";
import { bareWord, tokenise } from "./shared.js";

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const PREFIXES = YEAR3_PREFIXES;
const SUFFIXES = YEAR3_SUFFIXES;

test("every bank holds at least 15 items (3x a run)", () => {
  for (const bank of [FIND_ITEMS, ODD_SETS, BUILD_ITEMS, MEANING_ITEMS]) {
    assert.ok(bank.length >= 15, `${bank.length}`);
  }
});

test("level 1 parts use only Year 3 prefixes and suffixes, and a root changed in the word says so", () => {
  for (const item of FIND_ITEMS) {
    const roots = item.parts.filter(([, role]) => role === "root");
    assert.equal(roots.length, 1, wordOf(item));
    for (const [text, role] of item.parts) {
      if (role === "prefix") assert.ok(PREFIXES.includes(text), text);
      if (role === "suffix") assert.ok(SUFFIXES.includes(text), text);
    }
    const shown = roots[0][0];
    if (shown !== item.root) assert.ok(item.note, `${wordOf(item)} changes ${item.root} but has no note`);
    else assert.equal(item.note, undefined, wordOf(item));
  }
});

test("level 1 options hold the root once, are distinct and are never the whole word", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    for (const q of buildRootWordsQuestions(1, seeded(seed))) {
      assert.equal(q.options.filter((option) => option === q.answer).length, 1);
      assert.equal(new Set(q.options).size, q.options.length);
      assert.ok(!q.options.includes(q.word), q.word);
      assert.equal(q.options.length, 3);
    }
  }
});

test("level 2: the family contains the root, the odd one does not", () => {
  for (const set of ODD_SETS) {
    const stem = set.root === "happy" ? "happ" : set.root;
    for (const word of set.family) assert.ok(word.includes(stem), `${word} / ${set.root}`);
    assert.ok(!set.odd.includes(set.root), set.odd);
    assert.equal(new Set([...set.family, set.odd]).size, 4);
  }
});

test("level 3: the answer parts use one root and Year 3 affixes; extras never rebuild the answer", () => {
  const affixes = new Set([...PREFIXES, ...SUFFIXES]);
  for (const item of BUILD_ITEMS) {
    const roots = item.answer.filter((part) => !affixes.has(part));
    assert.equal(roots.length, 1, item.meaning);
    for (const extra of item.extra) assert.ok(affixes.has(extra), extra);
    assert.ok(!item.extra.some((extra) => item.answer.includes(extra)), item.meaning);
  }
});

test("level 3 accepts the joined answer and rejects a wrong tile", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    for (const q of buildRootWordsQuestions(3, seeded(seed))) {
      const right = q.parts.map((part) => q.tiles.find((tile) => tile.label === part).id);
      assert.equal(builtWord(q, right), q.answer);
      const extra = q.tiles.find((tile) => !q.parts.includes(tile.label));
      assert.notEqual(builtWord(q, [...right, extra.id]), q.answer);
      assert.equal(new Set(q.tiles.map((tile) => tile.label)).size, q.tiles.length);
      assert.equal(q.affixAt, YEAR3_PREFIXES.includes(q.parts[0]) ? "front" : "end");
      assert.ok(q.affixAt === "front" ? YEAR3_PREFIXES.includes(q.parts[0]) : YEAR3_SUFFIXES.includes(q.parts[1]));
    }
  }
});

test("level 4: the word appears once in its sentence and its parts spell it", () => {
  for (const item of MEANING_ITEMS) {
    const hits = tokenise(item.sentence).filter((token) => bareWord(token) === item.word);
    assert.equal(hits.length, 1, item.sentence);
    assert.equal(item.parts.join(""), item.word);
    assert.ok(!item.wrong.includes(item.answer));
  }
});

test("every level builds 5 answerable questions across 30 seeds", () => {
  for (const level of [1, 2, 3, 4]) {
    for (let seed = 1; seed <= 30; seed += 1) {
      const questions = buildRootWordsQuestions(level, seeded(seed));
      assert.equal(questions.length, 5);
      for (const q of questions) {
        if (q.options) {
          assert.equal(q.options.filter((option) => option === q.answer).length, 1);
          assert.equal(new Set(q.options).size, q.options.length);
        }
      }
    }
  }
});

test("every affix used has a meaning for the hints", () => {
  for (const affix of [...PREFIXES, ...SUFFIXES]) assert.ok(AFFIX_MEANINGS[affix], affix);
});

test("all text uses British spelling", () => {
  const text = [
    ...FIND_ITEMS.flatMap((item) => [item.root, ...item.wrong, item.note ?? ""]),
    ...ODD_SETS.flatMap((set) => [...set.family, set.odd]),
    ...BUILD_ITEMS.map((item) => item.meaning),
    ...MEANING_ITEMS.flatMap((item) => [item.sentence, item.answer, ...item.wrong, item.note ?? ""]),
  ].join(" ");
  assert.deepEqual(findUsSpellings(text), []);
});
