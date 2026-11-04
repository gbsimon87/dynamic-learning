import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync, existsSync, symlinkSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";
import { REPO_ROOT, loadTopic, findMapping, parseTopicArgs, renderContext, repoPath, statutoryFile } from "./topics.js";
import { visualRecipe } from "./visualRecipes.js";
import { planScaffold, writeScaffold } from "./scaffold.js";
import { checkBank, checkTopic, checkWrappers } from "./check.js";
import { resolveBank } from "./banks.js";

function runNode(args) {
  const env = { ...process.env };
  delete env.NODE_TEST_CONTEXT;
  return spawnSync(process.execPath, args, { encoding: "utf8", env });
}

function fixture(t, { name = "2 D Shapes", mapping = true, subject = "math" } = {}) {
  const root = mkdtempSync(path.join(os.tmpdir(), "bix-authoring-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const put = (file, content) => {
    mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    writeFileSync(path.join(root, file), content);
  };
  const topicId = name.toLowerCase().replaceAll(" ", "-");
  put("package.json", '{"type":"module"}');
  put("src/data/curriculumRegistry.js", `export const loadCurriculum = (year, subject) => year === 6 && subject === ${JSON.stringify(subject)} ? [{ id: "number---and-shape", title: "Number - And Shape", topics: [{ id: ${JSON.stringify(topicId)}, name: ${JSON.stringify(name)}, challenges: [1,2,3,4].map(id => ({id})) }] }] : null;`);
  put(`docs/curriculum/${statutoryFile(6, subject)}`, `# Year 6\n**Source:** Original programme\n## Topic mapping\n| Topic | Id | Requirement |\n${mapping ? `| ${name} | \`${topicId}\` | The exact statutory requirement |` : ""}\n`);
  put("src/components/challenge/data/DataChallenge.jsx", "export default function DataChallenge() { return null; }");
  for (const name of ["Math", "English"]) put(`src/components/challenge/visual/${name}QuestionVisual.jsx`, "export default function Visual() { return null; }");
  put("src/data/challenges/topicBank.js", readFileSync(path.join(REPO_ROOT, "src/data/challenges/topicBank.js"), "utf8"));
  put("src/data/challenges/year1Math/shared.js", readFileSync(path.join(REPO_ROOT, "src/data/challenges/year1Math/shared.js"), "utf8"));
  put("src/data/challenges/questionKinds.js", `export { lintBuild } from ${JSON.stringify(pathToFileURL(path.join(REPO_ROOT, "src/data/challenges/questionKinds.js")).href)};`);
  return { root, topicId, put, args: { root, year: 6, subject, topicId } };
}

test("scaffold previews without writing; numeric IDs compile and empty teaching fails its generated test", async (t) => {
  const { root, args } = fixture(t);
  const info = await loadTopic(args);
  const files = await planScaffold(info);
  assert.equal(files.size, 7);
  assert.ok(info.wrappers[0].endsWith("2DShapesChallenge1.jsx"));
  for (const file of files.keys()) assert.equal(existsSync(path.join(root, file)), false);
  writeScaffold(root, files);
  assert.deepEqual(await checkWrappers(info), []);
  assert.match(files.get(info.wrappers[0]), /MathQuestionVisual\.jsx/);
  assert.match(files.get(info.wrappers[0]), /renderVisual=\{question => <QuestionVisual question=\{question\} \/>\} illustrate/);
  const generatedTest = path.join(root, "src/data/challenges/authored/year6/math/2-d-shapes.test.js");
  const unfinished = runNode(["--test", generatedTest]);
  assert.equal(unfinished.status, 1, unfinished.stderr);
  assert.match(unfinished.stdout, /needs 15 templates/);
  const bank = await resolveBank(args);
  assert.ok((await checkBank(bank, { year: 6, seeds: 2 })).some((problem) => /Bank generation failed/.test(problem)));
});

test("a completed generated bank passes its own tests and the focused check", async (t) => {
  const { root, args, put } = fixture(t, { name: "Rounding Practice" });
  const info = await loadTopic(args);
  writeScaffold(root, await planScaffold(info));
  put("src/data/challenges/authored/year6/math/rounding-practice.js", `import { buildTopic, ch } from "../../../topicBank.js";
export const topic = { levels: Object.fromEntries([1,2,3,4].map(level => [level, Array.from({ length: 15 }, (_, n) => ch(\`What is \${level} plus \${n}?\`, level+n, [level+n+1, level+n+2]))])) };
export const buildRoundingPractice = buildTopic(topic);`);
  const bank = await resolveBank(args);
  const result = await checkTopic(info, bank, { seeds: 4 });
  assert.equal(result.status, "pass", JSON.stringify(result.problems));
  const completed = runNode(["--test", path.join(root, "src/data/challenges/authored/year6/math/rounding-practice.test.js")]);
  assert.equal(completed.status, 0, completed.stdout + completed.stderr);
  for (const q of bank.build(1, () => 0.5)) {
    const [, left, right] = /What is (\d+) plus (\d+)\?/.exec(q.prompt);
    assert.equal(q.answer, Number(left) + Number(right));
  }
});

test("scaffolding refuses all overwrites and missing mappings before mutation", async (t) => {
  const { root, args, put } = fixture(t);
  const info = await loadTopic(args);
  const files = await planScaffold(info);
  put(info.wrappers[3], "existing learner challenge");
  await assert.rejects(planScaffold(info), /Refusing to overwrite/);
  assert.throws(() => writeScaffold(root, files), /Refusing to overwrite/);
  assert.equal(existsSync(path.join(root, info.wrappers[0])), false);
  assert.equal(readFileSync(path.join(root, info.wrappers[3]), "utf8"), "existing learner challenge");
  const missing = fixture(t, { mapping: false });
  await assert.rejects(planScaffold(await loadTopic(missing.args)), /Missing statutory mapping/);
});

test("existing games and pure builders preserve their chosen interface", async (t) => {
  const { args, put } = fixture(t);
  const info = await loadTopic(args);
  put("src/Game.jsx", "export default function Game() { return null; }");
  put("src/bank.js", "export const build = () => []; export default build;");
  const gameFiles = await planScaffold(info, { game: "src/Game.jsx", topicProp: "topic" });
  assert.equal(gameFiles.size, 5);
  assert.match(gameFiles.get(info.wrappers[0]), /topic=\{"2-d-shapes"\} level=\{1\} onComplete=\{onComplete\}/);
  const aliased = await planScaffold(info, { game: "src/Game.jsx", topicProp: "topic", topicKey: "shape" });
  assert.match(aliased.get(info.wrappers[0]), /topic=\{"shape"\}/);
  const builderFiles = await planScaffold(info, { builder: "src/bank.js", exportName: "build" });
  assert.equal(builderFiles.size, 5);
  assert.match(builderFiles.get(info.wrappers[0]), /build=\{build2DShapes\}/);
  const defaultFiles = await planScaffold(info, { builder: "src/bank.js", exportName: "default" });
  assert.match(defaultFiles.get(info.wrappers[0]), /import build2DShapes from/);
  writeScaffold(info.root, defaultFiles);
  assert.deepEqual(await checkWrappers(info), []);
  await assert.rejects(planScaffold(info, { builder: "src/bank.js", exportName: "missing" }), /does not export/);
  await assert.rejects(planScaffold(info, { builder: "src/bank.js", game: "src/Game.jsx" }), /Choose/);
});

test("English scaffolds include their shared visual renderer and subject frames cannot silently disappear", async (t) => {
  const english = fixture(t, { subject: "english", name: "Word Parts" });
  const info = await loadTopic(english.args);
  const files = await planScaffold(info);
  assert.match(files.get(info.wrappers[0]), /EnglishQuestionVisual\.jsx/);
  writeScaffold(english.root, files);
  assert.deepEqual(await checkWrappers(info), []);
  const science = fixture(t, { subject: "science", name: "Habitats" });
  const scienceInfo = await loadTopic(science.args);
  await assert.rejects(planScaffold(scienceInfo), /Use --game.*illustrated introductions/);
  science.put("src/ScienceGame.jsx", "export default function ScienceGame() { return null; }");
  const subjectFiles = await planScaffold(scienceInfo, { game: "src/ScienceGame.jsx" });
  assert.match(subjectFiles.get(scienceInfo.wrappers[0]), /TopicGame topicId=\{"habitats"\}/);
  assert.equal(subjectFiles.size, 5);
});

test("generic scaffolding rejects envelopes and custom controls before creating unusable wrappers", async (t) => {
  const { args, put } = fixture(t);
  const info = await loadTopic(args);
  put("src/envelope.js", "export const build = () => ({ questions: [] });");
  put("src/custom.js", "export const build = () => [{kind:'build', maths:{kind:'digits'}}];");
  await assert.rejects(planScaffold(info, { builder: "src/envelope.js", exportName: "build" }), /must return a question array/);
  await assert.rejects(planScaffold(info, { builder: "src/custom.js", exportName: "build" }), /subject-specific answer checking/);
  await assert.rejects(planScaffold(info, { topicKey: "shape" }), /requires --game/);
});

test("future-year context points to existing visual recipes without pretending to register their banks", async () => {
  const recipe = visualRecipe({ root: REPO_ROOT, year: 7, subject: "math" });
  assert.equal(recipe.referenceYear, 6);
  assert.ok(recipe.paths.includes("src/pages/skills/math/challenges/year6/Year6MathGame.jsx"));
  const science = visualRecipe({ root: REPO_ROOT, year: 7, subject: "science" });
  assert.equal(science.referenceYear, 6);
  assert.ok(science.paths.includes("src/pages/skills/science/challenges/year6/Year6ScienceGame.jsx"));
  assert.ok(science.paths.includes("tests/components/year6Science.test.jsx"));
  assert.ok(science.paths.includes("src/components/challenge/adventure/AdventureChallenge.jsx"));
  const math = visualRecipe({ root: REPO_ROOT, year: 5, subject: "math" });
  assert.equal(math.genericVisual, "src/components/challenge/visual/MathQuestionVisual.jsx");
  assert.ok(math.paths.includes(math.genericVisual));
});

test("a partial write rolls back only files created by this invocation", async (t) => {
  const { args, root, put } = fixture(t);
  const info = await loadTopic(args);
  const files = await planScaffold(info);
  put("keep.txt", "unrelated work");
  let writes = 0;
  assert.throws(() => writeScaffold(root, files, { write: (descriptor, content) => {
    writeFileSync(descriptor, content.slice(0, 5));
    if (++writes === 2) throw new Error("disk full during current file");
  } }), /disk full/);
  for (const file of files.keys()) assert.equal(existsSync(path.join(root, file)), false, file);
  assert.equal(readFileSync(path.join(root, "keep.txt"), "utf8"), "unrelated work");
});

test("checker fails broken imports, missing exports, syntax, bad banks and unsupported adapters", async (t) => {
  const { args, root, put } = fixture(t);
  const info = await loadTopic(args);
  writeScaffold(root, await planScaffold(info));
  put(info.wrappers[0], 'import Missing from "./missing.jsx"; export default Missing;');
  put(info.wrappers[1], "export const value = 3;");
  put(info.wrappers[2], "export default function Broken( {;");
  const result = await checkTopic(info, null);
  assert.equal(result.status, "fail");
  assert.ok(result.problems.some((p) => /missing relative import/.test(p)));
  assert.ok(result.problems.some((p) => /no default export/.test(p)));
  assert.ok(result.problems.some((p) => /No supported bank adapter/.test(p)));
  assert.ok(result.problems.length >= 4);
  const wrong = { minQuestions: 1, build: () => [{ kind: "choice", prompt: "Pick four.", answer: 4, options: [2, 3] }] };
  assert.ok((await checkBank(wrong, { year: 6, seeds: 1 })).some((p) => /answer missing/.test(p)));
  const unstable = { build: () => [{ kind: "number", prompt: "A question", answer: Math.random() }] };
  assert.ok((await checkBank(unstable, { year: 6, seeds: 1 })).some((p) => /deterministic rng/.test(p)));
  let calls = 0;
  const cached = [{ kind: "number", prompt: "Type a number.", answer: 1 }];
  const mutating = { minQuestions: 1, build: () => { cached[0].answer = ++calls; return cached; } };
  assert.ok((await checkBank(mutating, { year: 6, seeds: 1 })).some((p) => /deterministic rng/.test(p)));
});

test("structure-only remains explicit and seed inputs are bounded", async (t) => {
  const { args, root } = fixture(t);
  const info = await loadTopic(args);
  writeScaffold(root, await planScaffold(info));
  const result = await checkTopic(info, null, { structureOnly: true });
  assert.equal(result.status, "structure-only");
  assert.equal(result.seeds, 0);
  assert.match(result.limitations.join(" "), /bank.*skipped/);
  await assert.rejects(checkTopic(info, null, { seeds: 0 }), /--seeds/);
  await assert.rejects(checkTopic(info, null, { seeds: 1001 }), /--seeds/);
});

test("Year 5 statutory licence/license exception matches its subject suite without hiding other errors", async () => {
  const info = await loadTopic({ root: REPO_ROOT, year: 5, subject: "english", topicId: "homophones-and-confusing-words" });
  const bank = await resolveBank(info);
  assert.deepEqual(await checkBank(bank, { year: 5, seeds: 10 }), []);
  const invalid = { ...bank, build: (...args) => bank.build(...args).map((q) => ({ ...q, prompt: "Pick the color." })) };
  assert.ok((await checkBank(invalid, { year: 5, seeds: 2 })).some((problem) => problem.includes("US spelling: color")));
});

test("mapping extraction keeps embedded IDs and selected-year rows without loading history into the context", async (t) => {
  const { args, put } = fixture(t);
  const info = await loadTopic(args);
  put("docs/curriculum/year-6-maths.md", '# Maths\n**Source:** Programme\n## Year 5 topic crosswalk\n| Old | `2-d-shapes` | Wrong year |\n## Year 6 topic crosswalk\n| 2 D Shapes (`2-d-shapes`) | Exact words |\n');
  const mapping = findMapping(info);
  assert.equal(mapping.rows.length, 1);
  assert.match(mapping.rows[0].text, /Exact words/);
  assert.doesNotMatch(renderContext(info, mapping, null), /Wrong year/);
  assert.ok(renderContext(info, mapping, null).length < 6000);
  const english = await loadTopic({ root: REPO_ROOT, year: 3, subject: "english", topicId: "characters-feelings" });
  assert.equal(findMapping(english).rows.length, 1);
});

test("CLI input and filesystem paths reject accidental traversal and writes through symlinks", async (t) => {
  const { root, args } = fixture(t);
  assert.throws(() => parseTopicArgs(["--year", "5", "--subject", "../math", "--topic", "a"]), /subject/);
  assert.throws(() => parseTopicArgs(["--year", "5", "--subject", "math", "--topic", "../a"]), /topic/);
  assert.throws(() => parseTopicArgs(["--year", "5", "--subject", "math", "--topic", "a", "--export", "build"]), /requires/);
  assert.throws(() => repoPath(root, "../outside.js"), /leaves repository/);
  const other = fixture(t);
  symlinkSync(other.root, path.join(root, "linked"));
  assert.throws(() => repoPath(root, "linked/escape.js"), /Symlink leaves/);
  await assert.rejects(loadTopic({ ...args, topicId: "not-registered" }), /found 0/);
});

test("real CLI context and failure exit statuses work without browser or data writes", () => {
  const run = (script, args) => spawnSync(process.execPath, [path.join(REPO_ROOT, "scripts", script), ...args], { encoding: "utf8" });
  const result = run("topicContext.js", ["--year", "5", "--subject", "science", "--topic", "mammal-and-bird-life-cycles"]);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /describe the differences in the life cycles/);
  assert.ok(result.stdout.length < 6500);
  assert.match(result.stdout, /Built-year visual recipe/);
  assert.match(result.stdout, /Year5ScienceVisual\.jsx/);
  const overwritten = run("scaffoldTopic.js", ["--year", "5", "--subject", "science", "--topic", "mammal-and-bird-life-cycles", "--game", "src/pages/skills/science/challenges/year5/Year5ScienceGame.jsx", "--write"]);
  assert.equal(overwritten.status, 1);
  assert.match(overwritten.stderr, /Refusing to overwrite/);
  const course = run("checkTopic.js", ["--year", "5", "--subject", "science", "--all", "--seeds", "1", "--json"]);
  assert.equal(course.status, 0, course.stderr + course.stdout);
  const report = JSON.parse(course.stdout);
  assert.equal(report.status, "pass");
  assert.equal(report.failed, 0);
  assert.ok(report.results.length > 1);
  const bad = run("checkTopic.js", ["--year", "5", "--subject", "science", "--topic", "not-registered"]);
  assert.equal(bad.status, 1);
});
