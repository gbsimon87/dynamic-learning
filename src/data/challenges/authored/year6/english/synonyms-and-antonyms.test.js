import test from "node:test";
import assert from "node:assert/strict";
import { buildSynonymsAndAntonyms, topic, SYNONYM_ROWS } from "./synonyms-and-antonyms.js";
import { lintBuild, seededRng } from "../../../questionKinds.js";
import { findUsSpellings } from "../../../../english/textChecks.js";

test("Synonyms and Antonyms: four complete question banks", () => {
  for (const level of [1, 2, 3, 4]) assert.ok(topic.levels[level].length >= 15, `slot ${level} needs 15 templates`);
  assert.deepEqual(lintBuild(buildSynonymsAndAntonyms, { year: 6, minQuestions: 5 }), []);
});

test("Synonyms and Antonyms: word relationships are unambiguous and fair", () => {
  for (const { w, syn, ant, a, b } of SYNONYM_ROWS) {
    assert.equal(a[0].split(/\W+/).filter((word) => word === w).length, 1, `${w} once in frame a`);
    assert.equal(b[0].split(/\W+/).filter((word) => word === w).length, 1, `${w} once in frame b`);
    assert.ok(syn.length >= 3 && ant.length >= 2);
    assert.equal(new Set([w, ...syn, ...ant, a[1], b[1]]).size, 1 + syn.length + ant.length + 2, `${w} words are distinct`);
  }
  for (const level of [1, 2, 3, 4]) for (let seed = 1; seed <= 40; seed += 1) {
    const questions = buildSynonymsAndAntonyms(level, seededRng(seed));
    assert.equal(questions.length, 5);
    assert.equal(new Set(questions.map((question) => question.prompt)).size, 5);
    assert.deepEqual(findUsSpellings(JSON.stringify(questions)), []);
    assert.doesNotMatch(JSON.stringify(questions), /\b[Aa] [aeiou]|\b[Aa]n [^aeiou"]/, "a/an agrees with the next word");
    for (const q of questions.filter((item) => item.kind === "choice")) assert.equal(new Set(q.options).size, q.options.length);
  }
});
