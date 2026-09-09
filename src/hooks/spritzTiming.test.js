import test from "node:test";
import assert from "node:assert/strict";
import {
  chunkDelay,
  MAX_WORDS,
  nextSpeed,
  pivotIndex,
  pivotIndexInText,
  tokenize,
  WPM_MAX,
  WPM_MIN,
} from "./spritzTiming.js";

test("tokenize splits whitespace, drops empties and handles blank input", () => {
  assert.deepEqual(
    tokenize("  the   quick\nfox ").map(({ text }) => text),
    ["the", "quick", "fox"],
  );
  assert.deepEqual(tokenize(""), []);
  assert.deepEqual(tokenize("   \n  "), []);
});

test("tokenize groups words and retains the short final chunk", () => {
  const chunks = tokenize("one two three four five", 2);
  assert.deepEqual(
    chunks.map(({ text }) => text),
    ["one two", "three four", "five"],
  );
  assert.deepEqual(chunks.at(-1).words, ["five"]);
  assert.equal(
    chunks.reduce((total, chunk) => total + chunk.words.length, 0),
    5,
  );
});

test("tokenize normalises invalid chunk sizes to the supported range", () => {
  assert.equal(tokenize("one two three four", 0).length, 4);
  assert.equal(tokenize("one two three four", Number.NaN).length, 4);
  assert.deepEqual(
    tokenize("one two three four", 99).map(({ text }) => text),
    ["one two three", "four"],
  );
  assert.deepEqual(
    tokenize("one two three four", 2.9).map(({ text }) => text),
    ["one two", "three four"],
  );
});

test("tokenize flags clause and sentence endings, including trailing quotes", () => {
  const [clause, sentence, quoted, curlyQuoted, plain] = tokenize(
    'wait, stop! "go?" “yes!” now',
  );
  assert.equal(clause.endsClause, true);
  assert.equal(clause.endsSentence, false);
  assert.equal(sentence.endsSentence, true);
  assert.equal(sentence.endsClause, false);
  assert.equal(quoted.endsSentence, true);
  assert.equal(curlyQuoted.endsSentence, true);
  assert.equal(plain.endsClause, false);
  assert.equal(plain.endsSentence, false);
});

test("longestWordChars ignores punctuation and uses the longest word", () => {
  const [chunk] = tokenize("a magnificent, cat", 3);
  assert.equal(chunk.longestWordChars, 11);
});

test("tokenize caps very long input at MAX_WORDS", () => {
  const chunks = tokenize(new Array(MAX_WORDS + 50).fill("word").join(" "), 3);
  const total = chunks.reduce((sum, chunk) => sum + chunk.words.length, 0);
  assert.equal(total, MAX_WORDS);
});

test("chunkDelay applies word length and punctuation pacing", () => {
  assert.equal(chunkDelay(tokenize("cat")[0], 120), 500);
  assert.equal(chunkDelay(tokenize("elephants")[0], 120), 560);
  assert.equal(chunkDelay(tokenize("a".repeat(40))[0], 120), 800);
  assert.equal(chunkDelay(tokenize("wait,")[0], 120), 750);
  assert.equal(chunkDelay(tokenize("stop.")[0], 120), 1000);
});

test("chunkDelay uses the actual number of displayed words", () => {
  const chunks = tokenize("the elephants cat", 2);
  assert.equal(chunkDelay(chunks[0], 120), 1120);
  assert.equal(chunkDelay(chunks[1], 120), 500);
  // A stale requested size must not make the one-word final chunk twice as long.
  assert.equal(chunkDelay(chunks[1], 120, 2), 500);
});

test("chunkDelay clamps invalid speeds", () => {
  const [chunk] = tokenize("cat");
  assert.equal(chunkDelay(chunk, 0), 60000 / WPM_MIN);
  assert.equal(chunkDelay(chunk, Number.NaN), 60000 / WPM_MIN);
  assert.equal(chunkDelay(chunk, Number.POSITIVE_INFINITY), 60000 / WPM_MAX);
});

test("pivotIndex follows the Spritz length table", () => {
  assert.equal(pivotIndex("a"), 0);
  assert.equal(pivotIndex("cat"), 1);
  assert.equal(pivotIndex("dragon"), 2);
  assert.equal(pivotIndex("elephants"), 2);
  assert.equal(pivotIndex("magnificent"), 3);
  assert.equal(pivotIndex("extraordinarily"), 4);
});

test("pivotIndex maps letter positions into quoted words and contractions", () => {
  assert.equal(pivotIndex('"cat"'), 2);
  assert.equal('"cat"'[pivotIndex('"cat"')], "a");
  assert.equal(pivotIndex("'tis"), 2);
  assert.equal("'tis"[pivotIndex("'tis")], "i");
  assert.equal(pivotIndex("'n'"), 1);
  assert.equal(pivotIndex("rock'n'roll"), 2);
  assert.match("rock'n'roll"[pivotIndex("rock'n'roll")], /[\p{L}\p{N}]/u);
  assert.equal(pivotIndex("..."), -1);
});

test("pivotIndexInText uses the central word and never whitespace or punctuation", () => {
  const cases = [
    ["one two", "n"],
    ["one two three", "w"],
    ['one "two" three', "w"],
    ["can't stop", "a"],
  ];

  for (const [text, expected] of cases) {
    const index = pivotIndexInText(text);
    assert.equal(text[index], expected, text);
    assert.match(text[index], /[\p{L}\p{N}]/u, text);
  }
  assert.equal(pivotIndexInText(" ... "), -1);
});

test("nextSpeed climbs through presets, then steps to the clamped maximum", () => {
  assert.equal(nextSpeed(60), 100);
  assert.equal(nextSpeed(100), 150);
  assert.equal(nextSpeed(120), 150);
  assert.equal(nextSpeed(150), 200);
  assert.equal(nextSpeed(200), 225);
  assert.equal(nextSpeed(290), WPM_MAX);
  assert.equal(nextSpeed(WPM_MAX), WPM_MAX);
  assert.equal(nextSpeed(0), 100);
  assert.equal(nextSpeed(Number.POSITIVE_INFINITY), WPM_MAX);
});
