import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { year6HistoryCurriculum as curriculum } from "./year6HistoryCurriculum.js";
import { YEAR6_HISTORY_TOPIC_SKILLS } from "./year6HistoryCertificateSkills.js";
import { countsTowardYear, loadCurriculum, yearAwardSubjectIds } from "./curriculumRegistry.js";
import { TOPIC_SKILLS } from "./certificateSkills.js";
import { HISTORY_AGE, HISTORY_TITLES, lintHistoryTopic } from "./challenges/history/engine.js";
import { YEAR6_HISTORY_BUILDERS as builders, YEAR6_HISTORY_TOPICS as topicData } from "./challenges/history/year6/index.js";
import { initialResponse, isCorrect, isReady, lintBuild, seededRng } from "./challenges/questionKinds.js";

const topics = curriculum.flatMap((c) => c.topics);
const pascal = (id) => id.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join("");
const wrapper = (id, level) => new URL(`../pages/skills/history/challenges/year6/${id}/${pascal(id)}Challenge${level}.jsx`, import.meta.url);
const correct = (q) => {
  if (q.kind === "sort") return Object.fromEntries(q.cards.map((c) => [c.id, c.bin]));
  if (q.kind === "order") return q.answer.map((id) => q.items.find((item) => item.id === id));
  return q.answer;
};

// Titles are permanent URL and progress keys once shipped.
const LOCKED_IDS = [
  ["local-history---investigating-your-area", ["what-is-local-history", "maps-through-time", "buildings-and-streets-as-evidence", "census-photos-and-memories", "planning-a-local-study"]],
  ["local-history---jarrow-through-time", ["jarrow-and-the-venerable-bede", "palmers-shipyard-and-the-iron-ships", "the-jarrow-march-1936"]],
  ["crime-and-punishment---anglo-saxons-to-1700", ["law-and-order-before-1066", "norman-law-and-the-forest", "magna-carta-and-trial-by-jury", "vagabonds-plots-and-the-poor-law"]],
  ["crime-and-punishment---1700-to-today", ["highwaymen-and-the-bloody-code", "transportation-to-australia", "peels-police", "prisons-and-reformers", "crime-fighting-today"]],
  ["thinking-like-a-historian", ["change-and-continuity", "cause-and-consequence", "who-and-what-mattered"]],
];

test("Year 6 History: five categories, 20 topics, four challenges each, certificate line per topic", () => {
  assert.deepEqual(curriculum.map((c) => [c.id, c.topics.map((t) => t.id)]), LOCKED_IDS);
  assert.equal(topics.length, 20);
  assert.equal(loadCurriculum("6", "history"), curriculum);
  assert.deepEqual(Object.keys(YEAR6_HISTORY_TOPIC_SKILLS), topics.map((t) => `6/history/${t.id}`));
  for (const topic of topics) {
    assert.ok(topic.icon);
    assert.match(topic.name, /^[A-Za-z0-9 ',?-]+$/);
    assert.deepEqual(topic.challenges.map((q) => q.id), [1, 2, 3, 4]);
    const line = TOPIC_SKILLS[`6/history/${topic.id}`];
    assert.ok(line && line.startsWith("I can") && line.length <= 80, topic.id);
  }
});

test("Year 6 History: crosswalk row per topic and the Year 6 allocation are recorded", () => {
  const text = readFileSync(new URL("../../docs/curriculum/key-stage-2-history.md", import.meta.url), "utf8");
  for (const topic of topics) assert.ok(text.includes(`| ${topic.name} | \`${topic.id}\` |`), topic.id);
  assert.match(text, /## Year 6 topic crosswalk/);
  assert.match(text, /\| 6 \| Local history study/);
});

test("Year 6 History: all 80 wrappers exist and forward topic, level and completion", () => {
  assert.deepEqual(Object.keys(builders), topics.map((t) => t.id));
  for (const { id } of topics) for (const level of [1, 2, 3, 4]) {
    const file = wrapper(id, level);
    assert.ok(existsSync(file), file.pathname);
    const source = readFileSync(file, "utf8");
    assert.ok(source.includes(`level={${level}}`) && source.includes(`topicId="${id}"`) && source.includes("onComplete={onComplete}"), file.pathname);
  }
});

test("Year 6 History: every topic passes the History lint and every level builds fair questions", () => {
  const age = HISTORY_AGE[6];
  for (const [id, topic] of Object.entries(topicData)) {
    assert.equal(topic.year, 6);
    assert.deepEqual(lintHistoryTopic(topic), [], id);
    const build = builders[id];
    const questions = (level, rng) => build(level, rng).questions;
    assert.deepEqual(lintBuild(questions, { year: 6, titles: HISTORY_TITLES[6], seeds: 20, minQuestions: age.rounds }), [], id);
    for (let level = 1; level <= 4; level++) for (let seed = 1; seed <= 20; seed++) {
      const run = build(level, seededRng(seed)).questions;
      const keys = run.map((q) => JSON.stringify([q.prompt, q.answer, q.bins, q.visual]));
      assert.equal(new Set(keys).size, keys.length, `${id} level ${level} seed ${seed}: repeated question`);
      for (const q of run) {
        assert.ok(q.hint, `${id}: no hint`);
        if (q.kind === "choice") assert.equal(q.options.length, 3, id);
        assert.equal(isCorrect(q, initialResponse(q)), false, `${id}: starts at the answer`);
        assert.equal(isReady(q, correct(q)), true, id);
        assert.equal(isCorrect(q, correct(q)), true, id);
        if (q.kind === "choice") for (const wrong of q.options.filter((o) => o !== q.answer)) assert.equal(isCorrect(q, wrong), false, `${id}: accepted ${wrong}`);
      }
    }
  }
});

test("Year 6 History: registered, History stays outside the Year 6 award, and no US spellings or answer-length giveaways", () => {
  assert.equal(countsTowardYear(6, "history"), false);
  assert.deepEqual(yearAwardSubjectIds(6), ["math", "english", "science"]);
  let choices = 0, longest = 0;
  for (const [id, topic] of Object.entries(topicData)) {
    let topicChoices = 0, topicLongest = 0;
    for (const bank of Object.values(topic.banks)) for (const t of bank) {
      assert.doesNotMatch(JSON.stringify(t), /\b(color|honor|neighbor|favorite|center|defense|offense|gray)\b/i, id);
      if (t.type !== "choice") continue;
      const options = [t.answer, ...t.wrong];
      assert.equal(new Set(options).size, options.length, `${id}: duplicate option in "${t.prompt}"`);
      topicChoices++;
      if (t.answer.length > Math.max(...t.wrong.map((w) => w.length)) + 4) topicLongest++;
    }
    assert.ok(topicLongest / topicChoices <= 0.6, `${id}: answer is clearly the longest in ${topicLongest}/${topicChoices} choices`);
    choices += topicChoices; longest += topicLongest;
  }
  assert.ok(longest / choices <= 0.4, `answer clearly longest in ${longest}/${choices} choices`);
});
