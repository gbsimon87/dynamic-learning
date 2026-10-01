import test from "node:test";
import assert from "node:assert/strict";
import { CAST } from "./cast.js";
import { PASSAGES } from "./passages.js";
import { READING_PASSAGES, findReadingPassage } from "./passagesReading.js";
import { findUsSpellings, passageText, wordCount } from "./textChecks.js";

const words = (passage) => wordCount(passage.blocks.map((block) => block.text).join(" "));

test("reading passage ids are unique, and never clash with passages.js", () => {
  const ids = [...READING_PASSAGES, ...PASSAGES].map((p) => p.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(findReadingPassage("hedgehogs").title, "Hedgehogs");
});

test("every passage is 200 words or fewer; prose is at least 60", () => {
  for (const passage of READING_PASSAGES) {
    const count = words(passage);
    assert.ok(count <= 200, `${passage.id}: ${count} words`);
    // Poems are short by nature; the 60-word floor is for prose.
    if (passage.kind !== "poem") assert.ok(count >= 60, `${passage.id}: ${count} words`);
  }
});

test("every passage uses British spelling", () => {
  for (const passage of READING_PASSAGES) {
    assert.deepEqual(findUsSpellings(passageText(passage)), [], passage.id);
  }
});

test("blocks are a known type with text, and poems are made of lines", () => {
  for (const passage of READING_PASSAGES) {
    for (const block of passage.blocks) {
      assert.ok(["p", "h", "line", "item"].includes(block.type), passage.id);
      assert.ok(block.text.trim(), passage.id);
    }
    if (passage.kind === "poem") assert.ok(passage.blocks.every((block) => block.type === "line"), passage.id);
  }
});

test("cast members keep their pronouns", () => {
  const wrong = { she: /\b(he|him|his)\b/i, he: /\b(she|her|hers)\b/i };
  for (const passage of READING_PASSAGES) {
    for (const block of passage.blocks) {
      for (const sentence of block.text.split(/(?<=[.!?])\s+/)) {
        const named = Object.values(CAST).filter((member) => sentence.startsWith(member.name));
        if (named.length !== 1) continue;
        const others = Object.values(CAST).filter((member) => member !== named[0] && sentence.includes(member.name));
        if (others.length > 0) continue;
        assert.doesNotMatch(sentence, wrong[named[0].pronoun], `${passage.id}: "${sentence}"`);
      }
    }
  }
});
