import test from "node:test";
import assert from "node:assert/strict";
import { homophonesForLevel, makeWordBuilderQuestion, misspellings, parseWord, wordsForLevel } from "./wordBuilder.js";
import { seeded } from "./random.js";

test("word lists parse, are lowercase letters, and no word repeats across levels", () => {
  const seen = new Set();
  for (const level of [1, 2, 3]) {
    const words = wordsForLevel(level);
    assert.ok(words.length >= 30, `level ${level} has ${words.length} words`);
    for (const { word, start, end } of words) {
      assert.match(word, /^[a-z]{3,}$/, word);
      assert.ok(start >= 0 && end > start && end <= word.length, word);
      assert.ok(!seen.has(word), `duplicate ${word}`);
      seen.add(word);
    }
  }
});

test("misspellings are three distinct wrong spellings", () => {
  for (const level of [1, 2, 3]) {
    for (const parsed of wordsForLevel(level)) {
      const wrong = misspellings(parsed, seeded(parsed.word.length * 31));
      assert.equal(wrong.length, 3, parsed.word);
      assert.equal(new Set(wrong).size, 3);
      assert.ok(wrong.every((w) => w !== parsed.word));
    }
  }
  assert.deepEqual(parseWord("emba[rr]ass"), { word: "embarrass", start: 4, end: 6 });
});

test("homophone sentences have one gap and own the answer", () => {
  for (const level of [1, 2, 3]) {
    for (const [answer, others, sentence] of homophonesForLevel(level)) {
      assert.equal(sentence.split("___").length, 2, sentence);
      assert.ok(others.length >= 1 && !others.includes(answer));
    }
  }
  assert.ok(homophonesForLevel(3).length > homophonesForLevel(1).length);
});

test("questions are well formed at every level", () => {
  for (const level of [1, 2, 3]) {
    const kinds = new Set();
    for (let seed = 1; seed <= 400; seed += 1) {
      const q = makeWordBuilderQuestion(seeded(seed), level);
      kinds.add(q.kind);
      assert.ok(q.options.includes(q.answer));
      assert.equal(new Set(q.options).size, q.options.length);
      assert.ok(q.prompt && q.speech && q.key);
      if (q.kind === "missing") {
        assert.equal(q.options.length, 4);
        assert.equal(q.shown.replace("_", q.answer), q.word);
        assert.equal(q.shown.split("_").length, 2);
      }
      if (q.kind === "spell") assert.equal(q.options.length, 4);
    }
    assert.deepEqual([...kinds].sort(), ["homophone", "missing", "spell"]);
  }
});
