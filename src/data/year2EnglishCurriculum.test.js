import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { year2EnglishCurriculum as curriculum } from "./year2EnglishCurriculum.js";
import { loadCurriculum, isCurriculumAvailable } from "./curriculumRegistry.js";
import { buildLockState } from "./curriculumLocks.js";
import { completeChallenge } from "./progressRules.js";

// Permanent URL, directory and saved-progress identifiers. A rename requires migration.
const LOCKED_IDS = [
  [
    "spelling---sounds-and-endings",
    [
      "the-ge-and-dge-spellings",
      "soft-c-and-silent-letters",
      "the-le-el-al-and-il-endings",
      "the-y-and-ey-endings",
      "other-ways-to-spell-sounds"
    ]
  ],
  [
    "reading---words",
    [
      "reading-longer-words",
      "reading-words-with-suffixes",
      "common-exception-words"
    ]
  ],
  [
    "grammar---words",
    [
      "compound-words-and-nouns",
      "adjectives-and-adverbs"
    ]
  ],
  [
    "reading---stories",
    [
      "sequencing-events",
      "understanding-characters",
      "predicting-from-a-story",
      "fairy-stories-and-traditional-tales",
      "word-meanings-in-stories"
    ]
  ],
  [
    "spelling---suffixes",
    [
      "changing-y-to-ies",
      "suffixes-after-y",
      "dropping-e-before-a-suffix",
      "doubling-the-last-letter",
      "the-suffixes-ment-ness-ful-less-and-ly"
    ]
  ],
  [
    "grammar---sentences-and-punctuation",
    [
      "statements-questions-exclamations-and-commands",
      "expanded-noun-phrases",
      "joining-sentences",
      "present-and-past-tense",
      "actions-in-progress",
      "capital-letters-and-end-marks",
      "commas-in-lists"
    ]
  ],
  [
    "spelling---apostrophes-and-homophones",
    [
      "contractions",
      "apostrophes-for-ownership",
      "homophones-and-near-homophones"
    ]
  ],
  [
    "reading---information-and-poetry",
    [
      "finding-facts-in-non-fiction",
      "poems-and-repeated-phrases",
      "asking-questions-and-discussing-books"
    ]
  ],
  [
    "writing---planning-and-checking",
    [
      "planning-and-building-stories",
      "writing-about-real-events",
      "writing-for-different-purposes",
      "building-poems",
      "checking-and-improving-writing",
      "dictation"
    ]
  ]
];
const topics = curriculum.flatMap(c => c.topics);

test("Year 2 English: permanent identifiers, shape and registration", () => {
  assert.deepEqual(curriculum.map(c => [c.id, c.topics.map(t => t.id)]), LOCKED_IDS);
  assert.equal(curriculum.length, 9);
  assert.equal(topics.length, 39);
  assert.equal(new Set(topics.map(t => t.id)).size, 39);
  assert.equal(new Set(topics.map(t => t.challenges)).size, 39);
  assert.equal(isCurriculumAvailable(2, "english"), true);
  assert.equal(loadCurriculum("2", "english"), curriculum);
  for (const topic of topics) {
    assert.ok(topic.icon);
    assert.deepEqual(topic.challenges.map(c => c.id), [1, 2, 3, 4]);
  }
});

test("Year 2 English: all 156 computed loader paths exist and forward completion", () => {
  let count = 0;
  for (const topic of topics) for (const { id } of topic.challenges) {
    const name = topic.id.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join("");
    const file = new URL(`../pages/skills/english/challenges/year2/${topic.id}/${name}Challenge${id}.jsx`, import.meta.url);
    assert.ok(existsSync(file), file.pathname);
    const text = readFileSync(file, "utf8");
    assert.ok(text.includes("export default"));
    assert.ok(text.includes(`level={${id}}`));
    assert.ok(text.includes("onComplete={onComplete}"));
    count++;
  }
  assert.equal(count, 156);
});

test("Year 2 English: fresh locks, next challenge, replay and topic/category cascade", () => {
  const [category] = curriculum;
  const [topic] = category.topics;
  const locks = progress => buildLockState({ curriculum, progress, isBuilt: () => true });
  let progress = {};
  const fresh = locks(progress);
  assert.deepEqual(fresh.map(c => c.locked), [false, true, true, true, true, true, true, true, true]);
  assert.deepEqual(fresh[0].topics[0].challenges.map(c => c.locked), [false, true, true, true]);
  progress = completeChallenge(progress, category.id, topic.id, 1);
  assert.deepEqual(locks(progress)[0].topics[0].challenges.map(c => c.locked), [false, false, true, true]);
  const saved = JSON.stringify(progress);
  assert.deepEqual(completeChallenge(progress, category.id, topic.id, 1), progress);
  for (const t of category.topics) for (const c of t.challenges) {
    progress = completeChallenge(progress, category.id, t.id, c.id);
  }
  assert.equal(locks(progress)[0].complete, true);
  assert.equal(locks(progress)[1].locked, false);
  assert.equal(locks(progress)[0].topics[0].challenges[0].locked, false);
  assert.deepEqual(locks(JSON.parse(saved))[0].topics[0].challenges.map(c => c.locked), [false, false, true, true]);
});

test("Year 2 English: every topic is mapped without altering statutory text", () => {
  const mapping = readFileSync(new URL("../../docs/curriculum/year-2-english.md", import.meta.url), "utf8");
  for (const topic of topics) assert.ok(mapping.includes(`| ${topic.name} |`), topic.name);
});
