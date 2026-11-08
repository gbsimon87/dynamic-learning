import test from "node:test";
import assert from "node:assert/strict";
import { buildConfusingWordPairs, topic, PAIRS } from "./confusing-word-pairs.js";
import { lintBuild } from "../../../questionKinds.js";
import { HOMOPHONE_GROUPS } from "../../../../english/appendix1Years5And6.js";

test("Confusing Word Pairs: four complete banks", () => {
  for (const level of [1, 2, 3, 4]) assert.ok(topic.levels[level].length >= 15, `slot ${level} needs 15 templates`);
  assert.deepEqual(lintBuild(buildConfusingWordPairs, { year: 6, minQuestions: 5 }), []);
});

test("Confusing Word Pairs: exactly the Year 6 Appendix 1 pairs, with gapped sentences and clean clues", () => {
  assert.deepEqual(PAIRS.map(({ a, b }) => [a, b]), HOMOPHONE_GROUPS[6]);
  for (const { a, b, sA, sB, cA, cB } of PAIRS) {
    assert.equal(sA.split("___").length, 2, `${a} sentence`);
    assert.equal(sB.split("___").length, 2, `${b} sentence`);
    assert.ok(!sA.includes(a) && !sA.includes(b) && !sB.includes(a) && !sB.includes(b));
    for (const clue of [...cA, ...cB]) assert.ok(!clue.toLowerCase().includes(a) && !clue.toLowerCase().includes(b), `${clue} names its answer`);
  }
});
