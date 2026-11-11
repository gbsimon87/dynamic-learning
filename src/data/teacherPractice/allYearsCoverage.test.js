import test from "node:test";
import assert from "node:assert/strict";
import { loadCurriculum } from "../curriculumRegistry.js";
import { ALL_PRACTICE_TOPICS, practiceTopics, practiceSubjects, practiceKey, practiceTopic, questionsForTopic, createPracticeQuestions, replacePracticeQuestion, searchPracticeTopics, paginatePractice, practiceVocabulary, practiceExample } from "./index.js";
import { adaptCurriculumQuestion } from "./curriculumPaper.js";
const YEARS = [1, 2, 4, 5, 6];
const SUBJECTS = ["math", "english", "science", "history"];

test("all requested years include every existing core topic, with unique year-scoped keys", () => {
  assert.equal(ALL_PRACTICE_TOPICS.length, 714);
  assert.equal(new Set(ALL_PRACTICE_TOPICS.map((t) => t.id)).size, 714);
  for (const year of YEARS) {
    assert.deepEqual(new Set(practiceSubjects(year).map((s) => s.id)), new Set(SUBJECTS));
    for (const subject of SUBJECTS) {
      const expected = loadCurriculum(year, subject).flatMap((c) => c.topics);
      assert.deepEqual(practiceTopics(year, subject).map((t) => t.topicId), expected.map((t) => t.id));
      for (const topic of expected) assert.equal(practiceTopic(topic.id, subject, year).year, year);
    }
  }
  assert.equal(practiceTopics(3).length, 135);
  assert.equal(practiceKey("math", "column-addition"), "column-addition");
  assert.equal(practiceTopic("dictation", "english", 1).year, 1);
  assert.equal(practiceTopic("dictation", "english", 2).year, 2);
  assert.equal(practiceTopics(5, "french").length, 0);
});

test("every topic and question mix is printable, finite, deduplicated and free of broken fields", () => {
  const modelTypes = new Set(["bar", "sequence", "column", "counters", "blocks", "clock", "number-line", "ruler", "dial-scale", "jug", "drawing-grid", "solid", "polygon", "angle", "angles", "turn", "array", "perimeter", "data-table", "pictogram", "bar-chart", "fraction-bars", "reading", "geography-source", "history-source", "curriculum-source"]);
  for (const topic of ALL_PRACTICE_TOPICS) {
    assert.equal(typeof practiceVocabulary(topic.id), "string");
    const example = practiceExample(topic.id);
    if (example) assert.ok(example.type);
    for (const mix of ["practice", "application", "mixed"]) {
      const pool = questionsForTopic(topic.id, mix);
      assert.ok(pool.length, `${topic.id}: empty ${mix}`);
      assert.equal(new Set(pool.map((q) => q.id)).size, pool.length);
      for (const q of pool) {
        assert.equal(q.year, topic.year); assert.equal(q.subject, topic.subject); assert.equal(q.curriculumTopicId, topic.topicId);
        assert.ok(q.prompt.trim() && q.answer.trim(), q.id);
        assert.doesNotMatch(JSON.stringify(q), /\b(?:NaN|undefined)\b|\[object Object\]/, q.id);
        if (q.model) assert.ok(modelTypes.has(q.model.type), q.model.type);
        if (q.teacherScript) { assert.equal(q.model, null); assert.match(q.reason, /Teacher script:/); }
      }
      const sheet = createPracticeQuestions({ topicIds: [topic.id], count: 16, mix, rng: () => .41 });
      assert.equal(sheet.length, Math.min(16, pool.length));
      assert.equal(new Set(sheet.map((q) => q.id)).size, sheet.length);
      assert.deepEqual(paginatePractice({ questions: sheet }).flat().filter((item) => item.type === "question").map((item) => item.question.id), sheet.map((q) => q.id));
    }
  }
});

test("search, mixing and replacements keep questions within the selected year", () => {
  for (const year of YEARS) {
    for (const subject of SUBJECTS) {
      const found = searchPracticeTopics("", subject, year);
      assert.equal(found.length, practiceTopics(year, subject).length);
      assert.ok(found.every((t) => t.year === year && t.subject === subject));
    }
    const topics = SUBJECTS.slice(0, 3).map((subject) => practiceTopics(year, subject)[0].id);
    const sheet = createPracticeQuestions({ topicIds: topics, count: 12 });
    assert.equal(sheet.length, 12);
    assert.ok(sheet.every((q) => q.year === year));
    assert.equal(new Set(sheet.map((q) => q.subject)).size, 3);
    const replaced = replacePracticeQuestion(sheet, sheet[0].id, "mixed", () => .2);
    assert.ok(replaced && replaced[0].year === year && replaced[0].topicId === sheet[0].topicId);
    assert.deepEqual(replaced.slice(1), sheet.slice(1));
  }
  assert.throws(() => createPracticeQuestions({ topicIds: [practiceTopics(1)[0].id, practiceTopics(2)[0].id] }), /same year/);
});

test("paper transformations hide answers while preserving the evidence and marking contract", () => {
  const topic = { year: 4, subject: "math", id: "4:math:example", topicId: "example" };
  const sequence = adaptCurriculumQuestion(topic, 1, { kind: "sequence", prompt: "Fill the gap.", terms: [210, 220, 230, 240], gaps: [2] });
  assert.match(sequence.answer, /230/); assert.doesNotMatch(JSON.stringify(sequence.model), /230/);
  const order = adaptCurriculumQuestion(topic, 3, { kind: "order", prompt: "Smallest first.", items: [{ id: "big", label: "900" }, { id: "small", label: "90" }], answer: ["small", "big"] });
  assert.equal(order.answer, "90 → 900");
  const sorted = adaptCurriculumQuestion(topic, 2, { kind: "sort", prompt: "Sort.", bins: [{ id: "odd", label: "Odd" }, { id: "even", label: "Even" }], cards: [{ id: "a", label: "17", bin: "odd" }, { id: "b", label: "22", bin: "even" }] });
  assert.equal(sorted.answer, "17: Odd; 22: Even"); assert.doesNotMatch(JSON.stringify(sorted.model), /17: Odd|22: Even/);
  const clock = adaptCurriculumQuestion(topic, 3, { kind: "clock", mode: "set", prompt: "Draw 7:20.", time: { hour: 7, minute: 20 } });
  assert.deepEqual(clock.model, { type: "clock", blank: true, essential: true }); assert.match(clock.answer, /7:20/);
  const picked = adaptCurriculumQuestion({ ...topic, subject: "english" }, 3, { kind: "pick", prompt: "Underline the verb.", tokens: ["Run", "home"], answer: 0 });
  assert.equal(picked.answer, "Run");
});

test("Year 2 tables have correct products within the requested tables and written applications", () => {
  const pool = questionsForTopic("2:math:2-5-and-10-multiplication-tables");
  for (const q of pool) {
    const numbers = q.prompt.match(/\d+/g).map(Number);
    assert.ok([2, 5, 10].includes(numbers[1]));
    assert.equal(Number(q.answer), numbers[0] * numbers[1]);
    assert.ok(numbers[0] >= 1 && numbers[0] <= 12);
  }
});

test("Year 3 source regressions retain observations, physical tests, word meanings and fossil letters", () => {
  const seeds = questionsForTopic("science:seed-dispersal", "application").filter((q) => /Example A/.test(JSON.stringify(q.model)));
  assert.ok(seeds.length);
  for (const q of seeds) { assert.match(JSON.stringify(q.model), /Example A: look closely/); assert.match(JSON.stringify(q.model), /Example B: feature and movement/); }
  const rocks = questionsForTopic("science:comparing-and-grouping-rocks").filter((q) => /criterion|columns/.test(q.prompt));
  assert.ok(rocks.length);
  for (const q of rocks) assert.match(q.model.lines.join(" "), /scratch|water/i);
  for (const id of ["root-words", "adding-prefixes", "word-families"]) {
    const builds = questionsForTopic(`english:${id}`).filter((q) => q.data?.sourceKind === "build");
    assert.ok(builds.length); for (const q of builds) assert.match(q.prompt, /meaning|Build the word “/);
  }
  const fossils = questionsForTopic("science:how-fossils-form").filter((q) => /stages in order/.test(q.prompt));
  assert.ok(fossils.length);
  for (const q of fossils) for (const letter of q.answer.split(" → ")) assert.ok(q.model.lines.some((line) => line.startsWith(`${letter}:`)));
});

test("Year 2 route examples reach the printed target without stepping off the board", () => {
  const routes = questionsForTopic("2:math:right-angle-turns", "application");
  assert.ok(routes.length);
  const headings = ["up", "right", "down", "left"];
  for (const q of routes) {
    const [startRow, startCol, endRow, endCol] = q.prompt.match(/\d+/g).map(Number);
    let x = startCol - 1, y = startRow - 1;
    let heading = headings.indexOf(q.prompt.match(/facing (up|right|down|left)/)[1]);
    const program = q.answer.slice("For example: ".length).split(". Accept")[0].split("; ");
    for (const step of program) {
      if (step === "turn right") heading = (heading + 1) % 4;
      else {
        assert.equal(step, "forward one square");
        x += [0, 1, 0, -1][heading]; y += [-1, 0, 1, 0][heading];
        assert.ok(x >= 0 && x < 4 && y >= 0 && y < 4, q.id);
      }
    }
    assert.deepEqual([y + 1, x + 1], [endRow, endCol], q.id);
  }
});

test("spelling picture clues do not print their answer labels as source text", () => {
  const q = adaptCurriculumQuestion({ year: 1, subject: "english", id: "1:english:the-alphabet", topicId: "the-alphabet" }, 4,
    { kind: "type", prompt: "Write the missing letters.", sentence: "m___n", answer: "oo", picture: "🌙", pictureLabel: "moon" });
  assert.ok(q.model.picture);
  assert.doesNotMatch(q.model.lines.join(" "), /moon/);
  assert.equal(q.answer, "oo");
});

test("all Year 2 Maths adapters survive production bundling and function-name minification", async () => {
  const { build } = await import("esbuild");
  const { mkdtemp, writeFile, rm } = await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const { join } = await import("node:path");
  const { fileURLToPath, pathToFileURL } = await import("node:url");
  const directory = await mkdtemp(join(tmpdir(), "bix-paper-minification-"));
  try {
    const result = await build({ entryPoints: [fileURLToPath(new URL("./year2Math.js", import.meta.url))], bundle: true, minify: true, platform: "node", format: "cjs", write: false });
    const path = join(directory, "paper.cjs");
    await writeFile(path, result.outputFiles[0].text);
    const { year2MathPaperPool } = await import(pathToFileURL(path).href);
    for (const topic of practiceTopics(2, "math")) {
      const pool = year2MathPaperPool(topic);
      assert.ok(pool.some((q) => q.mode === "practice"), topic.id);
      assert.ok(pool.some((q) => q.mode === "application"), topic.id);
      for (const q of pool) assert.ok(q.prompt && q.answer, q.id);
    }
  } finally { await rm(directory, { recursive: true, force: true }); }
});

test("short written sources share paper while long extracts keep their space", () => {
  const short = Array.from({ length: 8 }, (_, n) => ({ id: `short-${n}`, topicId: "1:english:the-alphabet", prompt: "Write the missing letter.", model: { type: "curriculum-source", year: 1, subject: "english", lines: ["a, b, ____, d"], essential: true } }));
  const long = short.map((q) => ({ ...q, model: { ...q.model, lines: ["Use the evidence in this paragraph. ".repeat(90)] } }));
  assert.ok(paginatePractice({ questions: short }).length < 8);
  assert.ok(paginatePractice({ questions: long }).length > paginatePractice({ questions: short }).length);
  assert.deepEqual(paginatePractice({ questions: short }).flat().map((item) => item.model), short.map((q) => q.model));
});
