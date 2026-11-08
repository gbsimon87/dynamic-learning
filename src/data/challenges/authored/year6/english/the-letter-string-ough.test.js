import test from "node:test";
import assert from "node:assert/strict";
import { buildTheLetterStringOugh, topic, WORDS } from "./the-letter-string-ough.js";
import { lintBuild } from "../../../questionKinds.js";
import { PATTERNS } from "../../../../english/appendix1Years5And6.js";

test("The Letter String ough: four complete banks of statutory words", () => {
  for (const level of [1, 2, 3, 4]) assert.ok(topic.levels[level].length >= 15, `slot ${level} needs 15 templates`);
  assert.deepEqual(lintBuild(buildTheLetterStringOugh, { year: 6, minQuestions: 5 }), []);
  const appendix = new Set(PATTERNS.ough.words);
  for (const { w, wrong, build, use, other } of WORDS) {
    assert.ok(appendix.has(w), `${w} is an Appendix 1 ough word`);
    assert.ok(w.includes("ough"));
    assert.ok(wrong.every((spelling) => spelling !== w && !appendix.has(spelling)), `${w} wrong spellings`);
    assert.ok(build.includes("___") && use.includes("___"), `${w} sentences have one gap`);
    assert.ok(!other.includes(w) && other.every((word) => appendix.has(word)), `${w} other options`);
  }
});
