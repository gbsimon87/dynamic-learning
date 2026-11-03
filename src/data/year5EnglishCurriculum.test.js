import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { year5EnglishCurriculum } from "./year5EnglishCurriculum.js";
import { YEAR5_ENGLISH_TOPIC_SKILLS } from "./year5EnglishCertificateSkills.js";
import { lintBuild } from "./challenges/questionKinds.js";
import { findUsSpellings } from "./english/textChecks.js";
import { HOMOPHONE_GROUPS, PATTERNS, WORD_LIST, WORD_LIST_ENTRIES } from "./english/appendix1Years5And6.js";

// The loader's own name logic (src/pages/curriculum/Challenge.jsx, capitalizeTopicId).
const pascal = (id) => id.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");
const topics = year5EnglishCurriculum.flatMap((category) => category.topics);
const SKILLS_ROOT = new URL("../pages/skills/english/challenges/year5/", import.meta.url);
const SEEDS = 20;

test("Year 5 English: dataset shape", () => {
  assert.equal(year5EnglishCurriculum.length, 9);
  assert.equal(topics.length, 36);
  assert.equal(new Set(topics.map((t) => t.id)).size, topics.length, "topic ids are unique");
  assert.equal(new Set(year5EnglishCurriculum.map((c) => c.id)).size, year5EnglishCurriculum.length);
  for (const topic of topics) {
    assert.match(topic.id, /^[a-z0-9-]+$/, topic.name);
    assert.ok(topic.icon, topic.name);
    assert.deepEqual(topic.challenges.map((c) => c.id), [1, 2, 3, 4]);
  }
});

test("Year 5 English: every topic has a short British certificate line, and none is orphaned", () => {
  const keys = topics.map((t) => `5/english/${t.id}`);
  assert.deepEqual(keys.filter((key) => !(key in YEAR5_ENGLISH_TOPIC_SKILLS)), []);
  assert.deepEqual(Object.keys(YEAR5_ENGLISH_TOPIC_SKILLS).filter((key) => !keys.includes(key)), []);
  for (const [key, text] of Object.entries(YEAR5_ENGLISH_TOPIC_SKILLS)) {
    assert.ok(text.length <= 80, key);
    assert.match(text, /^I (can|know) .*\.$/, key);
    assert.deepEqual(findUsSpellings(text), [], key);
  }
});

test("Year 5 English: all four challenge files exist for every topic, with a default export", () => {
  for (const topic of topics) {
    const name = pascal(topic.id);
    assert.ok(existsSync(new URL(`${name}Game.jsx`, SKILLS_ROOT)), `${name}Game.jsx`);
    for (const n of [1, 2, 3, 4]) {
      const file = new URL(`${topic.id}/${name}Challenge${n}.jsx`, SKILLS_ROOT);
      assert.ok(existsSync(file), `${topic.id}/${name}Challenge${n}.jsx`);
      assert.match(readFileSync(file, "utf8"), /export default function/, `${name}Challenge${n}`);
    }
  }
});

const builders = new Map();
for (const topic of topics) {
  const module = await import(`./challenges/english/year5${pascal(topic.id)}.js`);
  const name = `build${pascal(topic.id)}Questions`;
  builders.set(topic.id, { module, build: module[name], name });
}

/** The statutory homophone pair licence/license is British, so it is the one flagged "US" form we allow. */
const dropAllowed = (problems, id) => (id === "homophones-and-confusing-words" ? problems.filter((p) => !p.endsWith("US spelling: license")) : problems);

test("Year 5 English: every builder exists and holds an authored bank at least 3x a run", () => {
  for (const [id, { module, build, name }] of builders) {
    assert.equal(typeof build, "function", `${id} exports ${name}`);
    assert.ok(Array.isArray(module.BANK), id);
    if (id !== "dictation") assert.ok(typeof module.RULE === "string" && module.RULE.length > 20, id);
    assert.ok(module.BANK.length >= 3 && (module.BANK.length >= 15 || module.BANK[0].blocks || module.BANK[0].sentences), `${id}: ${module.BANK.length} rows`);
    const us = findUsSpellings(JSON.stringify(module.BANK)).filter((f) => !(id === "homophones-and-confusing-words" && f === "license"));
    assert.deepEqual(us, [], id);
  }
});

test(`Year 5 English: every builder yields valid questions at every level over ${SEEDS} seeds`, () => {
  for (const [id, { build }] of builders) {
    if (id === "dictation") continue; // its question kinds are the dictation game's own; checked below
    const problems = dropAllowed(lintBuild(build, { seeds: SEEDS, titles: ["a", "b", "c", "d"], year: 5, minQuestions: 3 }), id);
    assert.deepEqual(problems, [], id);
    for (const level of [1, 2, 3, 4]) {
      for (let seed = 1; seed <= SEEDS; seed += 1) {
        let state = seed * 7919;
        const rng = () => { state = (state * 16807) % 2147483647; return (state - 1) / 2147483646; };
        const questions = build(level, rng);
        assert.ok(questions.length >= 3 && questions.length <= 5, `${id} level ${level}`);
        const us = findUsSpellings(JSON.stringify(questions)).filter((f) => !(id === "homophones-and-confusing-words" && f === "license"));
        assert.deepEqual(us, [], `${id} level ${level}`);
        for (const q of questions) {
          if (q.kind === "choice") assert.equal(q.options.filter((o) => o === q.answer).length, 1, `${id}: ${q.prompt}`);
        }
      }
    }
  }
});

test("Year 5 English: dictation questions are solvable and keep their punctuation", () => {
  const { build, module } = builders.get("dictation");
  for (const row of module.BANK) {
    assert.equal(row.text.split(row.key).length, 2, row.text);
    assert.equal(row.text.split(row.swap[0]).length, 2, row.text);
    assert.notEqual(row.swap[0], row.swap[1]);
  }
  assert.ok(module.BANK.some((row) => row.text.includes("(")) && module.BANK.some((row) => row.text.includes("—")));
  for (const rng of [() => 0, () => 0.5, () => 0.999]) {
    for (const level of [1, 2, 3, 4]) {
      const questions = build(level, rng);
      assert.equal(questions.length, 5);
      for (const q of questions) {
        assert.deepEqual(findUsSpellings(JSON.stringify(q)), []);
        if (q.kind === "choose") assert.equal(q.options.filter((o) => o === q.answer).length, 1);
        if (q.kind === "type") assert.equal(q.before + q.answer + q.after, q.text);
        if (q.kind === "build" || q.kind === "write") {
          assert.equal(q.answer.join(" ").replace(/\s+([,.?!;:)”])/g, "$1").replace(/([(“])\s+/g, "$1").length > 0, true);
          const pool = [...q.tiles];
          for (const label of q.answer) {
            const at = pool.findIndex((tile) => tile.label === label);
            assert.ok(at >= 0, `missing tile ${label}`);
            pool.splice(at, 1);
          }
        }
      }
    }
  }
});

const appendixSource = readFileSync(new URL("../../docs/curriculum/english-appendix-1-years-5-and-6.md", import.meta.url), "utf8").replace(/’/g, "'").replace(/\\\*/g, "");
const appears = (word) => new RegExp(`(^|[^a-z])${word.replace(/’/g, "'")}([^a-z]|$)`, "i").test(appendixSource);
const bankWords = (id) => new Set(builders.get(id).module.BANK.map((row) => row.word.toLowerCase()));

test("Year 5 English: the Appendix 1 data is the saved appendix's own, split with no overlap", () => {
  assert.equal(WORD_LIST_ENTRIES.length, 100);
  for (const entry of WORD_LIST_ENTRIES) assert.ok(appendixSource.includes(entry), entry);
  assert.deepEqual(WORD_LIST[5].filter((w) => WORD_LIST[6].includes(w)), []);
  for (const word of [...HOMOPHONE_GROUPS[5].flat(), ...HOMOPHONE_GROUPS[6].flat()]) assert.ok(appears(word), word);
  for (const pattern of Object.values(PATTERNS)) for (const word of pattern.words) assert.ok(appears(word), word);
});

test("Year 5 English: spelling banks cover the Year 5 word list, homophones and every pattern example", () => {
  const listed = [...bankWords("words-often-misspelt"), ...bankWords("more-words-often-misspelt")];
  assert.deepEqual(new Set(listed), new Set(WORD_LIST[5]));
  assert.equal(listed.length, WORD_LIST[5].length, "no word twice");
  const homophones = bankWords("homophones-and-confusing-words");
  assert.deepEqual(HOMOPHONE_GROUPS[5].flat().filter((w) => !homophones.has(w)), []);
  const patterns = {
    ciousTious: "the-endings-cious-and-tious", cialTial: "the-endings-cial-and-tial",
    antEnt: "the-endings-ant-ance-ent-and-ence", ableIble: "the-endings-able-and-ible",
    silent: "silent-letters", eiAfterC: "the-letters-ei-after-c",
  };
  for (const [pattern, id] of Object.entries(patterns)) {
    const have = bankWords(id);
    assert.deepEqual(PATTERNS[pattern].words.filter((w) => !have.has(w.toLowerCase())), [], pattern);
  }
  // Year 6 patterns are never taught here.
  const all = new Set(Object.values(patterns).flatMap((id) => [...bankWords(id)]));
  for (const pattern of ["fer", "hyphen", "ough"]) {
    assert.deepEqual(PATTERNS[pattern].words.filter((w) => all.has(w)), [], pattern);
  }
});
