import test from "node:test";
import assert from "node:assert/strict";
import { findUsSpellings } from "../../english/textChecks.js";
import {
  FIX_SENTENCES,
  MISLEADING,
  NOUNS,
  PHRASES,
  STORIES,
  articleFor,
  articleIndices,
  buildAOrAnQuestions,
  isSortCorrect,
  isStoryCorrect,
  storyGaps,
} from "./aOrAn.js";
import { bareWord, tokenise } from "./shared.js";

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const SEEDS = Array.from({ length: 30 }, (_, i) => i + 1);
const misleading = new Set(MISLEADING);

// Patterns that catch a misleading word even if it is not on the list.
const SOUND_TRAPS = /^(hour|hon|heir|herb|uni|use|usu|ute|uk|eu|ewe|one|once|x-)/i;

/** Every word that comes straight after "a" or "an" in some text. */
function wordsAfterArticles(text) {
  const tokens = tokenise(text);
  return tokens
    .map((token, index) => (["a", "an"].includes(bareWord(token)) ? bareWord(tokens[index + 1] ?? "") : null))
    .filter(Boolean);
}

test("bank sizes", () => {
  assert.ok(NOUNS.filter((noun) => articleFor(noun.word) === "a").length >= 15);
  assert.ok(NOUNS.filter((noun) => articleFor(noun.word) === "an").length >= 15);
  assert.ok(PHRASES.length >= 15);
  assert.ok(FIX_SENTENCES.length >= 15);
  assert.ok(STORIES.length >= 15);
});

test("the rule follows the first letter: a rock, an open box", () => {
  assert.equal(articleFor("rock"), "a");
  assert.equal(articleFor("open box"), "an");
  assert.equal(articleFor("huge egg"), "a");
  assert.equal(articleFor("old tent"), "an");
});

test("no word whose first sound misleads (hour, unicorn, one, ewe…) is ever used", () => {
  const firstWords = [
    ...NOUNS.map((noun) => noun.word.split(" ")[0]),
    ...PHRASES.map((phrase) => phrase.split(" ")[0]),
    ...FIX_SENTENCES.flatMap(wordsAfterArticles),
    ...STORIES.flatMap((story) => storyGaps(story).map((gap) => gap.next)),
  ];
  for (const word of firstWords) {
    assert.ok(!misleading.has(word.toLowerCase()), word);
    assert.ok(!SOUND_TRAPS.test(word), word);
  }
  // And nowhere in the text at all.
  const allText = [...NOUNS.map((noun) => noun.word), ...PHRASES, ...FIX_SENTENCES, ...STORIES].join(" ");
  for (const token of tokenise(allText).map(bareWord)) assert.ok(!misleading.has(token), token);
});

test("phrases start with an adjective that decides, and both answers are well covered", () => {
  assert.ok(PHRASES.filter((phrase) => articleFor(phrase) === "a").length >= 10);
  assert.ok(PHRASES.filter((phrase) => articleFor(phrase) === "an").length >= 10);
  // Some phrases flip the noun's own answer: "a huge egg", "an old tent".
  const flips = PHRASES.filter((phrase) => {
    const noun = phrase.split(" ").at(-1);
    return articleFor(noun) !== articleFor(phrase);
  });
  assert.ok(flips.length >= 10, flips.join(", "));
});

test("each level builds five answerable questions", () => {
  for (const level of [1, 2, 3, 4]) {
    for (const seed of SEEDS) assert.equal(buildAOrAnQuestions(level, seeded(seed)).length, 5);
  }
});

test("level 1 asks both a and an in every run", () => {
  for (const seed of SEEDS) {
    const questions = buildAOrAnQuestions(1, seeded(seed));
    assert.ok(questions.filter((q) => q.answer === "a").length >= 2);
    assert.ok(questions.filter((q) => q.answer === "an").length >= 2);
    for (const q of questions) {
      assert.deepEqual(q.options, ["a", "an"]);
      assert.ok(q.emoji, q.word);
    }
  }
});

test("level 2: three cards a bin, nothing twice in a run", () => {
  for (const seed of SEEDS) {
    const seen = new Set();
    for (const q of buildAOrAnQuestions(2, seeded(seed))) {
      assert.equal(q.cards.length, 6);
      assert.equal(q.cards.filter((card) => card.bin === "an").length, 3);
      for (const card of q.cards) {
        assert.ok(!seen.has(card.id), card.id);
        seen.add(card.id);
      }
      const right = Object.fromEntries(q.cards.map((card) => [card.id, card.bin]));
      assert.ok(isSortCorrect(q, right));
      assert.equal(isSortCorrect(q, { ...right, [q.cards[0].id]: q.cards[0].bin === "a" ? "an" : "a" }), false);
    }
  }
});

test("level 3 sentences: exactly two a/an, both right as written; the question has one wrong", () => {
  for (const sentence of FIX_SENTENCES) {
    const tokens = tokenise(sentence);
    const articles = articleIndices(tokens);
    assert.equal(articles.length, 2, sentence);
    // No capital "A" starting the sentence, which the builder would miss.
    assert.equal(tokens.filter((token) => ["a", "an"].includes(bareWord(token))).length, 2, sentence);
    for (const index of articles) assert.equal(tokens[index], articleFor(tokens[index + 1]), sentence);
  }
  for (const seed of SEEDS) {
    for (const q of buildAOrAnQuestions(3, seeded(seed))) {
      const wrong = q.articles.filter((index) => q.tokens[index] !== articleFor(q.tokens[index + 1]));
      assert.deepEqual(wrong, [q.wrongIndex]);
      assert.ok(q.hinted.has(q.wrongIndex));
      assert.ok(q.hinted.size === 4);
    }
  }
});

test("level 4 stories: three gaps, both answers in every story, and only the right set passes", () => {
  for (const story of STORIES) {
    const gaps = storyGaps(story);
    assert.equal(gaps.length, 3, story);
    const answers = gaps.map((gap) => gap.answer);
    assert.ok(answers.includes("a") && answers.includes("an"), story);
    // The gaps are the only a/an in the story.
    assert.deepEqual(articleIndices(tokenise(story)), [], story);
  }
  for (const seed of SEEDS) {
    for (const q of buildAOrAnQuestions(4, seeded(seed))) {
      const right = q.gaps.map((gap) => gap.answer);
      assert.ok(isStoryCorrect(q, right));
      assert.equal(isStoryCorrect(q, [right[0] === "a" ? "an" : "a", ...right.slice(1)]), false);
      assert.equal(isStoryCorrect(q, [null, null, null]), false);
    }
  }
});

test("all text uses British spelling", () => {
  const text = [...NOUNS.map((noun) => noun.word), ...PHRASES, ...FIX_SENTENCES, ...STORIES].join(" ");
  assert.deepEqual(findUsSpellings(text), []);
});
