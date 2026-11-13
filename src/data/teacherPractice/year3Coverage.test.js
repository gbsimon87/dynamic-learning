// Coverage guard: every Year 3 course topic has a paper practice topic.
import test from "node:test";
import assert from "node:assert/strict";
import { loadCurriculum } from "../curriculumRegistry.js";
import { PRACTICE_TOPICS, PRACTICE_SUBJECTS, practiceKey, practiceTopic, questionsForTopic, createPracticeQuestions, searchPracticeTopics, paginatePractice, paginatePracticeAnswers } from "./index.js";
const EXPECTED = { math: 44, english: 32, science: 21, history: 22, geography: 16 };
const MODEL_TYPES = new Set(["bar", "sequence", "column", "counters", "blocks", "clock", "number-line", "ruler", "dial-scale", "jug", "drawing-grid", "solid", "polygon", "angle", "angles", "turn", "array", "perimeter", "data-table", "pictogram", "bar-chart", "fraction-bars", "reading", "geography-source", "history-source"]);

test("all five existing Year 3 courses have every curriculum topic registered for paper", () => {
  assert.deepEqual(new Set(PRACTICE_SUBJECTS.map((s) => s.id)), new Set(Object.keys(EXPECTED)));
  assert.equal(PRACTICE_TOPICS.length, 135);
  for (const [subject, total] of Object.entries(EXPECTED)) {
    const curriculum = loadCurriculum(3, subject).flatMap((category) => category.topics);
    const topics = PRACTICE_TOPICS.filter((topic) => topic.subject === subject);
    assert.equal(topics.length, total);
    assert.deepEqual(topics.map((t) => t.topicId), curriculum.map((t) => t.id));
    for (const topic of topics) {
      assert.equal(practiceTopic(topic.topicId, subject).id, practiceKey(subject, topic.topicId));
      assert.equal(practiceTopic(topic.id).name, topic.name);
    }
  }
  assert.equal(practiceTopic("tenths", "english"), undefined);
});

test("every topic supplies real, deduplicated questions in each supported mix, with valid models and no broken data", () => {
  for (const topic of PRACTICE_TOPICS) for (const mix of ["practice", "application", "mixed"]) {
    const pool = questionsForTopic(topic.id, mix);
    assert.ok(pool.length > 0, `${topic.id}: no ${mix} questions`);
    assert.equal(new Set(pool.map((q) => q.id)).size, pool.length, topic.id);
    for (const q of pool) {
      assert.equal(q.subject, topic.subject); assert.equal(q.curriculumTopicId, topic.topicId);
      assert.ok(q.prompt.trim().length > 0 && q.answer.trim().length > 0);
      assert.doesNotMatch(`${q.prompt} ${q.answer} ${q.reason}`, /\b(?:undefined|NaN)\b|\[object Object\]/, q.id);
      if (q.model) assert.ok(MODEL_TYPES.has(q.model.type), `${q.id}: unknown model ${q.model.type}`);
      if (mix !== "mixed") assert.ok(q.mode === mix || q.modes.includes(mix));
    }
    const sheet = createPracticeQuestions({ topicIds: [topic.id], count: 16, mix, rng: () => .37 });
    assert.equal(sheet.length, Math.min(16, pool.length));
    assert.equal(new Set(sheet.map((q) => q.id)).size, sheet.length);
    assert.ok(sheet.every((q) => q.topicId === topic.id));
  }
});

test("cross-subject sheets retain each subject, curriculum topic and question numbering", () => {
  const ids = ["column-addition", "science:what-plants-need-to-grow", "history:how-we-know-about-prehistory"];
  const sheet = createPracticeQuestions({ topicIds: ids, count: 12, rng: () => .43 });
  ids.forEach((id) => assert.equal(sheet.filter((q) => q.topicId === id).length, 4));
  const pages = paginatePractice({ questions: sheet, showModels: true, examples: true, vocabulary: true, extraSpace: true });
  assert.ok(pages.every((page) => page.reduce((n, item) => n + item.units, 0) <= 34));
  assert.deepEqual(pages.flat().filter((item) => item.type === "question").map((item) => item.question.id), sheet.map((q) => q.id));
  assert.deepEqual(paginatePracticeAnswers(sheet).flat().map(({ number }) => number), Array.from({ length: 12 }, (_, n) => n + 1));
});

test("search stays within the selected subject and reuses aliases and typo matching", () => {
  for (const subject of Object.keys(EXPECTED)) assert.ok(searchPracticeTopics("", subject).every((t) => t.subject === subject));
  assert.ok(searchPracticeTopics("perimter", "math").some((t) => t.topicId === "perimeter-of-2-d-shapes"));
  assert.ok(searchPracticeTopics("volcanoes", "geography").length);
  assert.ok(searchPracticeTopics("roots", "science").length);
  assert.deepEqual(searchPracticeTopics("", "not-a-course"), []);
});

test("essential maths diagrams keep unknowns hidden and quantities aligned", () => {
  for (const topic of PRACTICE_TOPICS.filter((t) => t.subject === "math")) for (const q of questionsForTopic(topic.id)) {
    const m = q.model;
    if (!m) continue;
    if (m.type === "clock" && !m.blank) assert.ok(Number.isInteger(m.hour) && m.hour >= 1 && m.hour <= 12 && Number.isInteger(m.minute) && m.minute >= 0 && m.minute < 60);
    if (m.type === "number-line") assert.ok(m.max > m.min && m.step > 0 && (m.value === undefined || (m.value >= m.min && m.value <= m.max)));
    if (m.type === "bar-chart") assert.ok(m.rows.every((r) => r.value >= 0 && r.value <= m.max));
    if (m.type === "pictogram") assert.ok(m.rows.every((r) => Number.isInteger(r.value / m.ratio)));
    if (m.type === "fraction-bars") assert.ok(m.bars.every((b) => b.parts > 0 && b.shaded >= 0 && b.shaded <= b.parts));
    if (m.type === "jug" || m.type === "dial-scale" || m.type === "ruler") assert.ok(m.value >= m.min && m.value <= m.max && m.essential);
  }
});

test("dictation keeps spoken scripts on the teacher side of the question contract", () => {
  const pool = questionsForTopic("english:dictation"); assert.ok(pool.length);
  for (const q of pool) {
    assert.ok(q.teacherScript && q.answer === q.teacherScript);
    assert.equal(q.model, null);
    assert.ok(!q.prompt.includes(q.teacherScript));
    assert.match(q.reason, /Teacher script:/);
  }
});

test("answer pagination allows fewer entries when marking guidance grows", () => {
  const short = Array.from({ length: 12 }, (_, n) => ({ prompt: `Question ${n}`, answer: "3", reason: "Check by counting." }));
  const long = short.map((q) => ({ ...q, answer: "A supported explanation with evidence. ".repeat(20) }));
  assert.ok(paginatePracticeAnswers(long).length > paginatePracticeAnswers(short).length);
  assert.deepEqual(paginatePracticeAnswers(long).flat().map((item) => item.number), Array.from({ length: 12 }, (_, n) => n + 1));
});
