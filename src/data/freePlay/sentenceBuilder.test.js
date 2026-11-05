import test from "node:test";
import assert from "node:assert/strict";
import { LEVELS, makeSentenceBuilderQuestion, sentencesForLevel, tilesFor } from "./sentenceBuilder.js";
import { seeded } from "./random.js";

const count = (sentence) => sentence.split(" ").length;

test("each level keeps to its sentence length and no sentence repeats across levels", () => {
  const ranges = { 1: [3, 4], 2: [5, 6], 3: [7, 11] };
  const seen = new Set();
  for (const { id } of LEVELS) {
    const sentences = sentencesForLevel(id);
    assert.ok(sentences.length >= 12, `level ${id} has ${sentences.length}`);
    for (const s of sentences) {
      assert.ok(count(s) >= ranges[id][0] && count(s) <= ranges[id][1], s);
      assert.ok(!seen.has(s), `duplicate ${s}`);
      seen.add(s);
    }
  }
});

test("easier levels carry a capital and full stop; harder drops both clues", () => {
  assert.deepEqual(tilesFor("Birds can fly", 1), ["Birds", "can", "fly."]);
  assert.deepEqual(tilesFor("The cat is sleeping on the mat", 3), ["the", "cat", "is", "sleeping", "on", "the", "mat"]);
  assert.deepEqual(tilesFor("I can see a bird in the tree", 3)[0], "I");
});

test("a question scrambles the same words and never deals the answer order", () => {
  for (const { id } of LEVELS) {
    for (let seed = 1; seed <= 40; seed += 1) {
      const q = makeSentenceBuilderQuestion(seeded(seed), id);
      assert.deepEqual([...q.scrambled].sort(), [...q.words].sort());
      assert.notEqual(q.scrambled.join(" "), q.words.join(" "));
      assert.ok(q.prompt && q.speech && q.key);
    }
  }
});
