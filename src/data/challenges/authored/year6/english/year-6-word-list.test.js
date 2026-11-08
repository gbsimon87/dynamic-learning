import test from "node:test";
import assert from "node:assert/strict";
import { buildYear6WordListPart1, topic as part1 } from "./year-6-word-list-part-1.js";
import { buildYear6WordListPart2, topic as part2 } from "./year-6-word-list-part-2.js";
import { PART1_WORDS, PART2_WORDS } from "./word-list-shared.js";
import { lintBuild } from "../../../questionKinds.js";
import { WORD_LIST_ENTRIES, expandEntry } from "../../../../english/appendix1Years5And6.js";
import { findUsSpellings } from "../../../../english/textChecks.js";

const statutory = WORD_LIST_ENTRIES.slice(50);
const expected = [statutory.slice(0, 25).flatMap(expandEntry), statutory.slice(25).flatMap(expandEntry)];

test("Year 6 word list halves are exactly the statutory words, in order", () => {
  assert.deepEqual(PART1_WORDS.map((item) => item.word), expected[0]);
  assert.deepEqual(PART2_WORDS.map((item) => item.word), expected[1]);
  assert.equal(statutory[0], "identity");
  assert.equal(statutory[24], "pronunciation");
  assert.equal(statutory[25], "queue");
});

test("Year 6 word list entries are clean", () => {
  const all = new Set([...PART1_WORDS, ...PART2_WORDS].map((item) => item.word));
  for (const item of [...PART1_WORDS, ...PART2_WORDS]) {
    assert.equal(item.chunks.join(""), item.word, `${item.word} chunks`);
    assert.ok(item.chunks.length >= 2 && item.chunks.length <= 4, `${item.word} chunk count`);
    assert.ok(item.chunks.every((chunk) => /^[a-z]+$/.test(chunk)));
    assert.equal(item.sentence.split("___").length, 2, `${item.word} sentence gap`);
    assert.ok(!item.sentence.toLowerCase().includes(item.word));
    assert.ok(!item.meaning.toLowerCase().includes(item.word));
    assert.equal(item.wrong.length, 2);
    for (const wrong of item.wrong) assert.ok(wrong !== item.word && !all.has(wrong), `${item.word}: ${wrong}`);
    assert.deepEqual(findUsSpellings(JSON.stringify(item)), [], item.word);
  }
});

test("Year 6 word list: four complete banks each", () => {
  for (const [topic, build] of [[part1, buildYear6WordListPart1], [part2, buildYear6WordListPart2]]) {
    for (const level of [1, 2, 3, 4]) assert.ok(topic.levels[level].length >= 15, `slot ${level} needs 15 templates`);
    assert.deepEqual(lintBuild(build, { year: 6, minQuestions: 5 }), []);
  }
});
