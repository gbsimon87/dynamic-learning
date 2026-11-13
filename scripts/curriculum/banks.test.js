import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm, symlink } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolveBank } from "./banks.js";

const root = fileURLToPath(new URL("../../", import.meta.url));
const seeded = (seed = 7) => () => ((seed = Math.imul(seed, 1664525) + 1013904223 | 0) >>> 0) / 4294967296;
const fixture = async (t, files) => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "curriculum-banks-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  for (const [relative, content] of Object.entries({ "package.json": '{"type":"module"}', ...files })) {
    await mkdir(path.dirname(path.join(directory, relative)), { recursive: true });
    await writeFile(path.join(directory, relative), content);
  }
  return directory;
};

test("real map banks and contextual builders expose deterministic question arrays", async () => {
  for (const [year, subject, topicId] of [
    [1, "history", "homes-then-and-now"],
    [1, "history", "toys-then-and-now"],
    [2, "geography", "continents-and-oceans-together"],
    [5, "science", "mammal-and-bird-life-cycles"],
    [1, "english", "blending-sounds"],
    [4, "math", "counting-in-multiples-of-6-7-9-25-and-1000"],
  ]) {
    const bank = await resolveBank({ root, year, subject, topicId });
    assert.ok(bank, `${year}/${subject}/${topicId}`);
    assert.ok(bank.paths.every(file => !path.isAbsolute(file)));
    assert.ok(bank.limitations.length);
    for (let level = 1; level <= 4; level++) {
      const run = bank.build(level, seeded());
      assert.ok(Array.isArray(run) && run.length > 0);
      assert.deepEqual(run, bank.build(level, seeded()));
    }
    if (bank.validate) assert.deepEqual(await bank.validate(), [], topicId);
  }
});

test("Year 5 creative figures use subject registries", async () => {
  const module = await import("../../src/data/challenges/year5Art/index.js");
  const topicId = Object.keys(module.YEAR5_ART_TOPICS)[0];
  const bank = await resolveBank({ root, year: 5, subject: "art", topicId });
  assert.equal(typeof bank.validate, "function");
  assert.deepEqual(await bank.validate(), []);
  assert.ok(bank.paths.includes("src/data/challenges/year5Art/visualTypes.js"));
});

test("unsupported and unregistered banks return null", async () => {
  assert.equal(await resolveBank({ root, year: 2, subject: "math", topicId: "unregistered" }), null);
  assert.equal(await resolveBank({ root, year: 5, subject: "science", topicId: "unregistered" }), null);
  assert.equal(await resolveBank({ root, year: 5, subject: "../science", topicId: "x" }), null);
});

test("explicit module accepts arrays or envelopes and requires its selected export", async (t) => {
  const directory = await fixture(t, {
    "bank.mjs": 'export const TITLES = ["One"]; export const build = (level, rng) => [{ kind: "number", answer: level + rng() }]; export const envelope = (...args) => ({ questions: build(...args) }); export const wrong = 4;',
  });
  const options = { root: directory, builder: "bank.mjs", exportName: "build" };
  const bank = await resolveBank(options);
  const envelope = await resolveBank({ ...options, exportName: "envelope" });
  assert.deepEqual(bank.build(2, seeded()), envelope.build(2, seeded()));
  assert.deepEqual(bank.titles, ["One"]);
  assert.match(bank.limitations.join(" "), /subject-specific.*not run/);
  await assert.rejects(resolveBank({ ...options, exportName: undefined }), /requires --export/);
  await assert.rejects(resolveBank({ ...options, exportName: "absent" }), /missing or is not a function/);
  await assert.rejects(resolveBank({ ...options, exportName: "wrong" }), /missing or is not a function/);
  await assert.rejects(resolveBank({ ...options, builder: "../outside.js" }), /inside the repository/);
  await assert.rejects(resolveBank({ ...options, builder: path.join(directory, "bank.mjs") }), /repository-relative/);
});

test("exceptions, syntax errors and malformed builder results cannot become a skipped bank", async (t) => {
  const directory = await fixture(t, {
    "bank.mjs": 'export const fail = () => { throw new Error("deliberate failure"); }; export const wrong = () => ({});',
    "broken.mjs": "export const broken = ;",
    "src/data/challenges/year1Science/index.js": 'throw new Error("bad registry import");',
  });
  const options = { root: directory, builder: "bank.mjs" };
  const fail = await resolveBank({ ...options, exportName: "fail" });
  assert.throws(() => fail.build(1, seeded()), /deliberate failure/);
  const wrong = await resolveBank({ ...options, exportName: "wrong" });
  assert.throws(() => wrong.build(1, seeded()), /question array/);
  await assert.rejects(resolveBank({ ...options, builder: "broken.mjs", exportName: "broken" }), SyntaxError);
  await assert.rejects(resolveBank({ root: directory, year: 1, subject: "science", topicId: "plants" }), /bad registry import/);
});

test("ambiguous English exports are skipped and explicit symlinks cannot leave the repository", async (t) => {
  const outside = await fixture(t, { "external.mjs": "export const build = () => [];" });
  const directory = await fixture(t, {
    "src/data/challenges/english/year1TestTopic.js": "export const buildOne = () => []; export const buildTwo = () => [];",
  });
  assert.equal(await resolveBank({ root: directory, year: 1, subject: "english", topicId: "test-topic" }), null);
  await symlink(path.join(outside, "external.mjs"), path.join(directory, "escape.mjs"));
  await assert.rejects(resolveBank({ root: directory, builder: "escape.mjs", exportName: "build" }), /inside the repository/);
});

test("history validator errors and missing image files are retained", async (t) => {
  const directory = await fixture(t, {
    "src/data/challenges/history/year1/index.js": 'export const YEAR1_HISTORY_BUILDERS = { topic: () => ({ questions: [] }) }; export const YEAR1_HISTORY_TOPICS = { topic: { levels: { 1: { story: { image: "picture" } } } } };',
    "src/data/challenges/history/engine.js": 'export const HISTORY_AGE = { 1: { rounds: 4 } }; export const HISTORY_TITLES = { 1: ["Start"] }; export const lintHistoryTopic = (topic, { images }) => images.picture ? ["story needs lines"] : ["image registry missing"];',
    "src/assets/history/manifest.json": '{"images":{"picture":{"file":"missing.webp"}}}',
  });
  const bank = await resolveBank({ root: directory, year: 1, subject: "history", topicId: "topic" });
  const problems = await bank.validate();
  assert.ok(problems.includes("story needs lines"));
  assert.ok(problems.some(problem => /missing.*missing.webp/.test(problem)));
  assert.equal(bank.minQuestions, 4);
  await mkdir(path.join(directory, "src/assets/history/images"), { recursive: true });
  await writeFile(path.join(directory, "src/assets/history/images/missing.webp"), "test asset");
  assert.deepEqual(await bank.validate(), ["story needs lines"]);
});

test("an unused authored file cannot mask the registered subject bank or its validators", async (t) => {
  const directory = await fixture(t, {
    "src/data/challenges/authored/year1/history/topic.js": "export const buildTopic = () => [{ kind: 'number', answer: 99 }];",
    "src/pages/skills/history/challenges/year1/topic/TopicChallenge1.jsx": 'import Game from "../Game.jsx"; export default Game;',
    "src/data/challenges/history/year1/index.js": "export const YEAR1_HISTORY_BUILDERS = { topic: () => ({ questions: [{ kind: 'number', answer: 1 }] }) }; export const YEAR1_HISTORY_TOPICS = { topic: {} };",
    "src/data/challenges/history/engine.js": 'export const HISTORY_AGE = { 1: { rounds: 4 } }; export const HISTORY_TITLES = { 1: ["Start"] }; export const lintHistoryTopic = () => ["real subject validation"];',
    "src/assets/history/manifest.json": '{"images":{}}',
  });
  const bank = await resolveBank({ root: directory, year: 1, subject: "history", topicId: "topic" });
  assert.equal(bank.build(1)[0].answer, 1);
  assert.deepEqual(await bank.validate(), ["real subject validation"]);
  assert.ok(!bank.paths.some((file) => file.includes("authored")));
});
