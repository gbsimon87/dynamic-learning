import test from "node:test";
import assert from "node:assert/strict";
import { PILOT_IDS } from "./mathPilot.js";
import { PRACTICE_TOPICS, practicePool, searchPracticeTopics, createPracticeQuestions, replacePracticeQuestion, paginatePractice } from "./index.js";

function seeded(seed) { return () => { seed = (1664525 * seed + 1013904223) >>> 0; return seed / 2 ** 32; }; }

test("paper search reuses planner spelling, prefix, alias and lesson matching within supported topics", () => {
  for (const text of ["colum addition", "colu"]) assert.ok(searchPracticeTopics(text).some((t) => t.id === "column-addition"));
  assert.ok(searchPracticeTopics("taking away").some((t) => t.id === "column-subtraction"));
  assert.ok(searchPracticeTopics("fractions of amounts").some((t) => t.id === "fractions-of-a-set-of-objects"));
  assert.equal(searchPracticeTopics("").length, 44);
  assert.ok(searchPracticeTopics("perimeter").some((topic) => topic.id === "perimeter-of-2-d-shapes"));
  assert.deepEqual(searchPracticeTopics("photosynthesis"), []);
});

test("every question has an independently verified answer, consistent picture and Year 3 parameters", () => {
  for (const topic of PRACTICE_TOPICS.filter((topic) => PILOT_IDS.includes(topic.id))) {
    const pool = practicePool(topic.id);
    assert.equal(new Set(pool.map((q) => q.id)).size, pool.length);
    assert.equal(new Set(pool.map((q) => JSON.stringify([q.prompt, q.model]))).size, pool.length);
    for (const q of pool) {
      const d = q.data;
      assert.ok(q.answer.length && q.reason.length && q.prompt.length < 240, q.id);
      if (q.kind === "sequence") {
        assert.ok([4, 8, 50, 100].includes(d.step));
        d.terms.forEach((n, i) => { assert.equal(n % d.step, 0); if (i) assert.equal(n - d.terms[i - 1], d.step); });
        assert.equal(Number(q.answer), d.terms.at(-1) + d.step);
        assert.ok(Number(q.answer) <= 1000);
        assert.equal(q.model.terms.at(-1), "?");
      } else if (q.kind === "count-story") {
        assert.equal(Number(q.answer), d.step * d.ordinal); assert.ok(Number(q.answer) <= 1000);
      } else if (q.kind === "partition") {
        assert.equal(q.answer.split(" + ").reduce((n, term) => n + Number(term), 0), d.value);
      } else if (q.kind === "blocks-story") {
        assert.equal(q.answer, `${d.value}; the tens digit is worth ${Math.floor(d.value / 10) % 10 * 10}`);
      } else if (q.kind.startsWith("place-")) {
        assert.equal(Number(q.answer), d.start + d.change);
        assert.ok(Number(q.answer) >= 0 && Number(q.answer) <= 1000);
        if (topic.id === "finding-10-or-100-more-or-less") assert.ok([10, 100].includes(Math.abs(d.change)));
      } else if (q.kind.startsWith("column")) {
        assert.equal(Number(q.answer), d.operation === "+" ? d.a + d.b : d.a - d.b);
        assert.ok(d.a <= 999 && d.b <= 999 && Number(q.answer) >= 0 && Number(q.answer) <= 1000);
        if (q.kind === "column-story") {
          assert.ok(q.prompt.includes(String(d.a)) && q.prompt.includes(String(d.b)));
        }
      } else if (q.kind === "read-tenths" || q.kind === "share-tenths") {
        assert.equal(q.answer, `${d.numerator}/10`);
        assert.ok(d.numerator > 0 && d.numerator < 10);
      } else if (q.kind === "shade-tenths") {
        assert.equal(q.answer, `${d.numerator} of 10 parts shaded`);
        assert.equal(q.model.shaded, 0);
      } else if (q.kind === "tenths-story") {
        assert.equal(q.answer, `${d.numerator}/10 used; ${10 - d.numerator}/10 left`);
      } else if (q.kind.startsWith("fraction-")) {
        assert.equal(Number(q.answer), d.total * d.numerator / d.denominator);
        assert.equal(d.total % d.denominator, 0);
        assert.ok(d.total >= 8 && d.total <= 20 && d.denominator <= 5 && d.numerator < d.denominator);
      } else assert.fail(`Unverified format: ${q.kind}`);
      if (q.model?.type === "blocks") assert.equal(q.model.hundreds * 100 + q.model.tens * 10 + q.model.ones, q.model.total);
    }
  }
});

test("the eight pilot topics can supply a complete duplicate-free 16-question sheet in each mix", () => {
  for (const topic of PRACTICE_TOPICS.filter((topic) => PILOT_IDS.includes(topic.id))) for (const mix of ["practice", "application", "mixed"]) for (let seed = 0; seed < 12; seed++) {
    const questions = createPracticeQuestions({ topicIds: [topic.id], count: 16, mix, rng: seeded(seed) });
    assert.equal(questions.length, 16, `${topic.id} ${mix}`);
    assert.equal(new Set(questions.map((q) => q.id)).size, 16);
    assert.ok(questions.every((q) => q.topicId === topic.id && (mix === "mixed" || q.mode === mix)));
    if (mix === "mixed") assert.deepEqual(new Set(questions.map((q) => q.mode)), new Set(["practice", "application"]));
  }
  const topics = PRACTICE_TOPICS.slice(0, 3).map((t) => t.id);
  const mixed = createPracticeQuestions({ topicIds: topics, count: 12, rng: seeded(7) });
  topics.forEach((id) => assert.equal(mixed.filter((q) => q.topicId === id).length, 4));
});

test("replacement changes only the chosen question, keeps the topic and avoids questions already on the sheet", () => {
  const questions = createPracticeQuestions({ topicIds: ["column-addition"], count: 8, mix: "practice", rng: seeded(2) });
  const before = JSON.stringify(questions);
  const next = replacePracticeQuestion(questions, questions[2].id, "practice", seeded(5));
  assert.notEqual(next[2].id, questions[2].id);
  assert.equal(next[2].topicId, questions[2].topicId);
  questions.forEach((q, n) => { if (n !== 2) assert.equal(next[n], q); });
  assert.equal(new Set(next.map((q) => q.id)).size, 8);
  assert.equal(JSON.stringify(questions), before);
  const exhausted = createPracticeQuestions({ topicIds: ["place-value-in-3-digit-numbers"], count: 16, mix: "practice" });
  assert.equal(replacePracticeQuestion(exhausted, exhausted[0].id, "practice"), null);
  assert.equal(replacePracticeQuestion(questions, "unknown", "mixed"), null);
});

test("pagination keeps questions and required pictures together, numbers in order and support once per topic", () => {
  const questions = createPracticeQuestions({ topicIds: ["tenths", "column-addition", "place-value-in-3-digit-numbers"], count: 16, rng: seeded(3) });
  for (const showModels of [false, true]) for (const extraSpace of [false, true]) for (const examples of [false, true]) {
    const pages = paginatePractice({ questions, showModels, extraSpace, examples, vocabulary: true });
    assert.ok(pages.every((page) => page.reduce((sum, item) => sum + item.units, 0) <= 34));
    const items = pages.flat();
    const pupils = items.filter((item) => item.type === "question");
    assert.deepEqual(pupils.map((item) => item.question.id), questions.map((q) => q.id));
    assert.deepEqual(pupils.map((item) => item.number), Array.from({ length: 16 }, (_, n) => n + 1));
    pupils.forEach((item) => assert.equal(Boolean(item.model), Boolean(item.question.model && (item.question.model.essential || showModels))));
    assert.equal(items.filter((item) => item.type === "example").length, examples ? 3 : 0);
    assert.equal(items.filter((item) => item.type === "vocabulary").length, 1);
    assert.ok(items.filter((item) => item.type === "example").every((item) => item.example?.title));
  }
  assert.deepEqual(paginatePractice({ questions: [] }), []);
});

test("invalid selections fail explicitly without silently substituting another curriculum", () => {
  for (const topicIds of [[], ["not-built"], ["tenths", "tenths"], PRACTICE_TOPICS.slice(0, 4).map((t) => t.id)]) assert.throws(() => createPracticeQuestions({ topicIds }), RangeError);
  assert.throws(() => createPracticeQuestions({ topicIds: ["tenths"], count: 100 }), RangeError);
  assert.throws(() => createPracticeQuestions({ topicIds: ["tenths"], mix: "hard" }), RangeError);
});
