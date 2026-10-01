import test from "node:test";
import assert from "node:assert/strict";
import { HOMOPHONES_Y3 } from "../../english/homophones.js";
import { HOMOPHONE_GROUPS } from "../../english/appendix1.js";
import { findUsSpellings } from "../../english/textChecks.js";
import {
  buildHomophoneQuestions,
  fillBlank,
  fixQuestion,
  isSortCorrect,
  letterHint,
} from "./homophones.js";
import { bareWord, isSameAnswer } from "./shared.js";

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const allWords = HOMOPHONES_Y3.flat();

test("the bank is exactly Appendix 1's Year 3 homophone groups", () => {
  assert.deepEqual(
    HOMOPHONES_Y3.map((group) => group.map((item) => item.word)),
    HOMOPHONE_GROUPS[3]
  );
});

test("every word has a picture, a meaning, two clues and two sentences", () => {
  for (const item of allWords) {
    assert.ok(item.emoji, item.word);
    assert.ok(item.meaning, item.word);
    assert.ok(item.clues.length >= 2, item.word);
    assert.ok(item.sentences.length >= 2, item.word);
  }
});

test("every sentence has exactly one blank and names no word from its own group", () => {
  for (const group of HOMOPHONES_Y3) {
    const words = new Set(group.map((item) => item.word));
    for (const item of group) {
      for (const sentence of item.sentences) {
        assert.equal(sentence.split("___").length, 2, sentence);
        const others = sentence.split(/\s+/).map(bareWord).filter((word) => words.has(word));
        assert.deepEqual(others, [], `"${sentence}" already contains ${others}`);
      }
    }
  }
});

test("a clue never contains the word it is a clue for", () => {
  for (const group of HOMOPHONES_Y3) {
    for (const item of group) {
      for (const clue of item.clues) {
        for (const other of group) {
          assert.ok(!clue.split(/\s+/).map(bareWord).includes(other.word), `${item.word}: "${clue}"`);
        }
      }
    }
  }
});

test("all text uses British spelling", () => {
  for (const item of allWords) {
    const text = [item.meaning, ...item.clues, ...item.sentences].join(" ");
    assert.deepEqual(findUsSpellings(text), [], item.word);
  }
});

test("each level builds five questions from five different groups", () => {
  for (const level of [1, 2, 3, 4]) {
    for (let seed = 1; seed <= 30; seed += 1) {
      const questions = buildHomophoneQuestions(level, seeded(seed));
      assert.equal(questions.length, 5);
    }
  }
});

test("level 1 options are the group, contain the answer once and are distinct", () => {
  for (let seed = 1; seed <= 40; seed += 1) {
    for (const q of buildHomophoneQuestions(1, seeded(seed))) {
      assert.equal(q.options.filter((option) => option === q.answer).length, 1);
      assert.equal(new Set(q.options).size, q.options.length);
      assert.ok(q.spoken.includes(q.answer));
    }
  }
});

test("level 2 has two cards per bin and accepts only the right sort", () => {
  for (let seed = 1; seed <= 20; seed += 1) {
    for (const q of buildHomophoneQuestions(2, seeded(seed))) {
      assert.equal(q.cards.length, q.bins.length * 2);
      const right = Object.fromEntries(q.cards.map((card) => [card.id, card.bin]));
      assert.ok(isSortCorrect(q, right));
      const swapped = { ...right, [q.cards[0].id]: q.bins.find((bin) => bin.id !== q.cards[0].bin).id };
      assert.equal(isSortCorrect(q, swapped), false);
      assert.equal(isSortCorrect(q, {}), false);
    }
  }
});

test("level 3 puts the wrong word in exactly once, and hints three words including it", () => {
  for (const group of HOMOPHONES_Y3) {
    for (let seed = 1; seed <= 30; seed += 1) {
      const q = fixQuestion(group, seeded(seed));
      assert.notEqual(q.wrong, q.correct);
      assert.equal(q.tokens.filter((token) => bareWord(token) === q.wrong).length, 1, q.tokens.join(" "));
      assert.equal(bareWord(q.tokens[q.wrongIndex]), q.wrong);
      assert.ok(q.hinted.has(q.wrongIndex));
      assert.ok(q.hinted.size >= 2 && q.hinted.size <= 3);
    }
  }
});

test("level 4 sentences keep their blank and the hint gives only the first letter", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    for (const q of buildHomophoneQuestions(4, seeded(seed))) {
      assert.ok(q.sentence.includes("___"));
      assert.equal(q.spoken, fillBlank(q.sentence, q.answer));
      assert.equal(q.hint.replace(/ /g, "").length, q.answer.length);
      assert.equal(q.hint[0], q.answer[0]);
    }
  }
  assert.equal(letterHint("mane"), "m _ _ _");
});

test("typed answers ignore case and apostrophe style", () => {
  assert.ok(isSameAnswer(" Piece ", "piece"));
  assert.ok(isSameAnswer("who’s", "who's"));
  assert.equal(isSameAnswer("peace", "piece"), false);
});
