/**
 * Checks one History topic file on its own, before it is registered.
 *
 *   node scripts/check-history-topic.mjs src/data/challenges/history/year1/homesThenAndNow.js
 *
 * Runs the History lint (story limits, answerability, images, bank sizes), the
 * shared question lint over 100 seeds per level, and checks every generated
 * question accepts its own correct answer and never repeats within a run.
 * The registered topics are covered by the year's test file; this script is
 * for authoring.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { buildHistoryTopic, HISTORY_AGE, HISTORY_TITLES, lintHistoryTopic } from "../src/data/challenges/history/engine.js";
import { isCorrect, isReady, lintBuild, seededRng } from "../src/data/challenges/questionKinds.js";

const file = process.argv[2];
if (!file) { console.error("usage: node scripts/check-history-topic.mjs <topic file>"); process.exit(2); }

const { images } = JSON.parse(readFileSync(new URL("../src/assets/history/manifest.json", import.meta.url), "utf8"));
const module = await import(pathToFileURL(path.resolve(file)).href);
const topic = Object.values(module).find((value) => value && typeof value === "object" && value.levels && value.banks);
if (!topic) { console.error(`${file}: no exported topic (an object with levels and banks)`); process.exit(2); }

const correct = (q) => {
  if (q.kind === "sort") return Object.fromEntries(q.cards.map((c) => [c.id, c.bin]));
  if (q.kind === "order") return q.answer.map((id) => q.items.find((item) => item.id === id));
  return q.answer;
};

const problems = [...lintHistoryTopic(topic, { images })];
if (problems.length === 0) {
  const build = buildHistoryTopic(topic);
  const rounds = HISTORY_AGE[topic.year].rounds;
  problems.push(...lintBuild((level, rng) => build(level, rng).questions, { year: topic.year, titles: HISTORY_TITLES[topic.year], seeds: 100, minQuestions: rounds }));
  for (let level = 1; level <= 4; level++) for (let seed = 1; seed <= 60; seed++) {
    const run = build(level, seededRng(seed)).questions;
    const keys = run.map((q) => JSON.stringify([q.prompt, q.answer, q.bins, q.visual]));
    if (new Set(keys).size !== keys.length) problems.push(`level ${level}, seed ${seed}: a question repeats within the run`);
    for (const q of run) if (!isReady(q, correct(q)) || !isCorrect(q, correct(q))) problems.push(`level ${level}: "${q.prompt}" rejects its own answer`);
  }
}

const unique = [...new Set(problems)];
if (unique.length) { console.error(`${file}: ${unique.length} problem(s)\n- ${unique.slice(0, 40).join("\n- ")}`); process.exit(1); }
console.log(`${file}: OK`);
