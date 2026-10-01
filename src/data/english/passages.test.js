import test from "node:test";
import assert from "node:assert/strict";
import { CAST } from "./cast.js";
import { PASSAGES } from "./passages.js";
import { findUsSpellings, passageText, wordCount } from "./textChecks.js";

test("passage ids are unique", () => {
  assert.equal(new Set(PASSAGES.map((p) => p.id)).size, PASSAGES.length);
});

test("every passage is 200 words or fewer, so it fits a phone with little scrolling", () => {
  for (const passage of PASSAGES) {
    const words = wordCount(passage.blocks.map((block) => block.text).join(" "));
    assert.ok(words <= 200, `${passage.id}: ${words} words`);
  }
});

test("every passage uses British spelling", () => {
  for (const passage of PASSAGES) {
    assert.deepEqual(findUsSpellings(passageText(passage)), [], passage.id);
  }
});

test("blocks are a known type with text", () => {
  for (const passage of PASSAGES) {
    for (const block of passage.blocks) {
      assert.ok(["p", "h", "line", "item"].includes(block.type), passage.id);
      assert.ok(block.text.trim(), passage.id);
    }
  }
});

// Each cast member has one pronoun; a passage must not call Priya "he".
test("cast members keep their pronouns", () => {
  const wrong = { she: /\b(he|him|his)\b/i, he: /\b(she|her|hers)\b/i };
  for (const passage of PASSAGES) {
    for (const block of passage.blocks) {
      for (const sentence of block.text.split(/(?<=[.!?])\s+/)) {
        const named = Object.values(CAST).filter((member) => sentence.startsWith(member.name));
        // Only a sentence that names ONE character and no one else is checked.
        if (named.length !== 1) continue;
        const others = Object.values(CAST).filter((member) => member !== named[0] && sentence.includes(member.name));
        if (others.length > 0) continue;
        assert.doesNotMatch(sentence, wrong[named[0].pronoun], `${passage.id}: "${sentence}"`);
      }
    }
  }
});
