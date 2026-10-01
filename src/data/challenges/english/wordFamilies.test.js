import test from "node:test";
import assert from "node:assert/strict";
import { findUsSpellings } from "../../english/textChecks.js";
import {
  AFFIXES,
  BUILD_ITEMS,
  FAMILIES,
  FIT_ITEMS,
  RULE_EXAMPLE,
  buildWordFamilyQuestions,
  isBuildCorrect,
  isSortCorrect,
} from "./wordFamilies.js";

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const SEEDS = Array.from({ length: 30 }, (_, i) => i + 1);
const familyOfWord = new Map(FAMILIES.flatMap((family) => [family.root, ...family.members].map((word) => [word, family.root])));
const lookAlikes = new Set(FAMILIES.flatMap((family) => family.lookAlikes));

/** Longest run of letters two words share. */
function sharedRun(a, b) {
  let best = 0;
  for (let i = 0; i < a.length; i += 1) {
    for (let j = i + 1; j <= a.length; j += 1) {
      if (b.includes(a.slice(i, j))) best = Math.max(best, j - i);
    }
  }
  return best;
}

test("bank sizes", () => {
  assert.ok(FAMILIES.length >= 15);
  assert.ok(BUILD_ITEMS.length >= 15);
  assert.ok(FIT_ITEMS.length >= 15);
  for (const family of FAMILIES) {
    assert.ok(family.members.length >= 3, family.root);
    assert.ok(family.lookAlikes.length >= 2, family.root);
  }
});

test("the appendix's own family (solve, solution, solver, dissolve, insoluble) is in", () => {
  const solve = FAMILIES.find((family) => family.root === "solve");
  assert.deepEqual([...solve.members].sort(), ["dissolve", "insoluble", "solution", "solver"]);
});

test("no word is in two families, and no look-alike is a family word", () => {
  const all = FAMILIES.flatMap((family) => [family.root, ...family.members, ...family.lookAlikes]);
  assert.equal(new Set(all).size, all.length);
  for (const word of lookAlikes) assert.ok(!familyOfWord.has(word), word);
});

test("members keep the root's form; look-alikes share letters but are not members", () => {
  // The appendix family changes form (solve → solution); every other member
  // contains the root, give or take a final e or y.
  const formChanges = new Set(["solution", "insoluble"]);
  for (const family of FAMILIES) {
    const stem = family.root.replace(/[ey]$/, "");
    for (const member of family.members) {
      if (formChanges.has(member)) continue;
      assert.ok(member.includes(stem), `${member} / ${family.root}`);
    }
    for (const word of family.lookAlikes) {
      assert.ok(sharedRun(word, family.root) >= Math.min(3, family.root.length), `${word} / ${family.root}`);
    }
  }
});

test("look-alikes that are secretly related are kept out", () => {
  for (const word of ["sunday", "lightning", "movie", "plane", "display", "taught", "built", "swam"]) {
    assert.ok(!lookAlikes.has(word) && !familyOfWord.has(word), word);
  }
});

test("each level builds five answerable questions", () => {
  for (const level of [1, 2, 3, 4]) {
    for (const seed of SEEDS) assert.equal(buildWordFamilyQuestions(level, seeded(seed)).length, 5);
  }
});

test("level 1: one family word and two look-alikes, all distinct", () => {
  for (const seed of SEEDS) {
    for (const q of buildWordFamilyQuestions(1, seeded(seed))) {
      assert.equal(q.options.length, 3);
      assert.equal(new Set(q.options).size, 3);
      assert.equal(q.options.filter((option) => familyOfWord.get(option) === q.root).length, 1);
      assert.equal(familyOfWord.get(q.answer), q.root);
      assert.notEqual(q.root, RULE_EXAMPLE, "the rule card would give it away");
    }
  }
});

test("level 2: two families and a neither box, no family twice in a run", () => {
  for (const seed of SEEDS) {
    const seen = new Set();
    for (const q of buildWordFamilyQuestions(2, seeded(seed))) {
      assert.equal(q.bins.length, 3);
      assert.equal(q.cards.length, 6);
      for (const root of q.roots) {
        assert.ok(!seen.has(root), root);
        seen.add(root);
        assert.equal(q.cards.filter((card) => card.bin === root).length, 2);
      }
      for (const card of q.cards) {
        if (card.bin === "neither") assert.ok(lookAlikes.has(card.id));
        else assert.equal(familyOfWord.get(card.id), card.bin);
      }
      const right = Object.fromEntries(q.cards.map((card) => [card.id, card.bin]));
      assert.ok(isSortCorrect(q, right));
      assert.equal(isSortCorrect(q, { ...right, [q.cards[0].id]: q.bins.find((bin) => bin.id !== q.cards[0].bin).id }), false);
    }
  }
});

test("level 3: the parts build the word, tiles are distinct, spares are affixes", () => {
  for (const item of BUILD_ITEMS) {
    assert.equal(item.parts.join(""), item.word);
    assert.ok(familyOfWord.has(item.word), item.word);
    assert.ok(!item.meaning.includes(item.word), item.word);
  }
  for (const seed of SEEDS) {
    for (const q of buildWordFamilyQuestions(3, seeded(seed))) {
      const labels = q.tiles.map((tile) => tile.label);
      assert.equal(new Set(labels).size, labels.length);
      assert.equal(labels.length, q.partCount + 2);
      const item = BUILD_ITEMS.find((entry) => entry.word === q.answer);
      const ids = item.parts.map((part) => q.tiles.find((tile) => tile.label === part).id);
      assert.ok(isBuildCorrect(q, ids));
      assert.equal(isBuildCorrect(q, [...ids].reverse()), false);
      for (const label of labels.filter((label) => !item.parts.includes(label))) assert.ok(AFFIXES.includes(label));
    }
  }
});

test("level 4: options are from one family, the answer once", () => {
  for (const item of FIT_ITEMS) {
    assert.equal(item.sentence.split("___").length, 2, item.sentence);
    assert.ok(familyOfWord.has(item.answer), item.answer);
    const options = [item.answer, ...item.wrong];
    assert.equal(new Set(options).size, 3);
    // Wrong options are family words or plain forms of the root (hopes, cares).
    for (const word of item.wrong) assert.ok(word.includes(familyOfWord.get(item.answer).replace(/[ey]$/, "")), word);
  }
  for (const seed of SEEDS) {
    for (const q of buildWordFamilyQuestions(4, seeded(seed))) {
      assert.equal(q.options.filter((option) => option === q.answer).length, 1);
    }
  }
});

test("all text uses British spelling", () => {
  const text = [
    ...FAMILIES.flatMap((family) => [...family.members, ...family.lookAlikes]),
    ...BUILD_ITEMS.map((item) => item.meaning),
    ...FIT_ITEMS.map((item) => item.sentence),
  ].join(" ");
  assert.deepEqual(findUsSpellings(text), []);
});
