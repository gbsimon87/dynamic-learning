import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { HOMOPHONE_GROUPS, PATTERNS, WORD_LIST, WORD_LIST_ENTRIES, expandEntry } from "./appendix1.js";

// The statutory source, saved verbatim. Every word in appendix1.js must be
// found in it, so a typo in the data cannot teach a misspelling.
const source = readFileSync(
  new URL("../../../docs/curriculum/english-appendix-1-years-3-and-4.md", import.meta.url),
  "utf8"
).replace(/’/g, "'");

const appears = (word) => new RegExp(`(^|[^a-z])${word.replace(/’/g, "'")}([^a-z]|$)`, "i").test(source);

test("the word list has the appendix's 100 entries, each in the saved appendix", () => {
  assert.equal(WORD_LIST_ENTRIES.length, 100);
  for (const entry of WORD_LIST_ENTRIES) assert.ok(source.includes(entry), entry);
});

test("entries expand their notation", () => {
  assert.deepEqual(expandEntry("accident(ally)"), ["accident", "accidentally"]);
  assert.deepEqual(expandEntry("busy/business"), ["busy", "business"]);
  assert.deepEqual(expandEntry("answer"), ["answer"]);
});

test("Year 3 takes the first 50 entries and Year 4 the rest, with no overlap", () => {
  assert.ok(WORD_LIST[3].includes("accident") && WORD_LIST[3].includes("important"));
  assert.ok(WORD_LIST[4].includes("interest") && WORD_LIST[4].includes("women"));
  const overlap = WORD_LIST[3].filter((word) => WORD_LIST[4].includes(word));
  assert.deepEqual(overlap, []);
});

test("every homophone is in the saved appendix, and the two years share none", () => {
  const year3 = HOMOPHONE_GROUPS[3].flat();
  const year4 = HOMOPHONE_GROUPS[4].flat();
  for (const word of [...year3, ...year4]) assert.ok(appears(word), word);
  assert.deepEqual(year3.filter((word) => year4.includes(word)), []);
  // All 22 groups in the appendix, split between the years.
  assert.equal(HOMOPHONE_GROUPS[3].length + HOMOPHONE_GROUPS[4].length, 22);
});

test("every pattern example is the appendix's own", () => {
  const words = Object.values(PATTERNS).flatMap((pattern) => [
    ...(Array.isArray(pattern.words) ? pattern.words : Object.values(pattern.words).flat()),
    ...(pattern.notDoubled ?? []),
  ]);
  for (const word of words) assert.ok(appears(word), word);
});
