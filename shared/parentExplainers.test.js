import test from "node:test";
import assert from "node:assert/strict";
import { PARENT_EXPLAINERS, explainersForGuideArea, isExplainerPublic } from "./parentExplainers.js";
import { SKILL_GROUPS } from "./skillsCatalog.js";
import { CURRICULUM_GUIDES } from "./curriculumGuides.js";
import { checkEquation, lintLessons } from "../src/data/lessons/lintLessons.js";

const routes = new Set(SKILL_GROUPS.flatMap((group) => group.games.map((game) => game.to)));
const filled = (value) => typeof value === "string" && value.trim().length > 0;

test("every explainer is complete and has a unique, URL-safe slug", () => {
  assert.equal(PARENT_EXPLAINERS.length, 12);
  assert.equal(new Set(PARENT_EXPLAINERS.map((e) => e.slug)).size, 12);
  for (const e of PARENT_EXPLAINERS) {
    assert.match(e.slug, /^[a-z0-9-]+$/);
    assert.ok(["math", "english"].includes(e.subject), e.slug);
    assert.ok(e.years.length && e.years.every((y) => Number.isInteger(y) && y >= 1 && y <= 6), e.slug);
    for (const text of [e.title, e.summary, e.howWeTeach.intro, ...e.whatItIs, ...e.howWeTeach.steps]) assert.ok(filled(text), e.slug);
    assert.ok(e.howWeTeach.examples.length >= 1 && e.howWeTeach.examples.length <= 2, e.slug);
    assert.ok(e.words.length >= 3 && e.words.every((w) => filled(w.term) && filled(w.meaning)), e.slug);
    assert.ok(e.atHome.length >= 3 && e.atHome.every((a) => filled(a.title) && filled(a.how)), e.slug);
    assert.ok(e.mixUps.length >= 1 && e.mixUps.every((m) => filled(m.mistake) && filled(m.help)), e.slug);
    assert.equal(typeof e.schoolsVary, "boolean");
  }
});

test("worked examples use the lesson renderer's shapes and their maths is right", () => {
  for (const e of PARENT_EXPLAINERS) for (const example of e.howWeTeach.examples) {
    if (example.type === "equation") assert.notEqual(checkEquation(example.parts), false, `${e.slug}: ${example.title}`);
    if (example.type === "column") {
      const value = example.op === "+" ? example.top + example.bottom : example.top - example.bottom;
      assert.equal(value, Number(example.answer), `${e.slug}: ${example.title}`);
    }
  }
  // Reuse the lesson linter for shape checks; reading-age limits are for children, so ignore those.
  const lessons = Object.fromEntries(PARENT_EXPLAINERS.map((e) => [e.slug, e.howWeTeach.examples.map((example) => ({ title: e.title, lines: ["Look.", "Think.", "Try."], example }))]));
  const problems = lintLessons(lessons, { year: 6, topicIds: Object.keys(lessons) }).filter((problem) => !/words|slot|lessons|US spelling/i.test(problem));
  assert.deepEqual(problems, []);
});

test("practice links point at real public Skills games", () => {
  for (const e of PARENT_EXPLAINERS) {
    assert.ok(e.practise.length >= 1, e.slug);
    for (const link of e.practise) assert.ok(routes.has(link.to), `${e.slug}: ${link.to}`);
  }
});

test("written-method explainers tell parents that school methods vary", () => {
  for (const slug of ["column-addition", "column-subtraction", "short-multiplication", "short-division"]) {
    assert.equal(PARENT_EXPLAINERS.find((e) => e.slug === slug).schoolsVary, true, slug);
  }
  assert.doesNotMatch(JSON.stringify(PARENT_EXPLAINERS), /\bborrow/i);
});

test("every explainer is linked from a curriculum-guide area in each of its years", () => {
  for (const e of PARENT_EXPLAINERS) for (const year of e.years) {
    const guide = CURRICULUM_GUIDES.find((g) => g.year === year && g.subject === e.subject);
    assert.ok(guide, `${e.slug}: no Year ${year} guide`);
    assert.ok(guide.areas.some((area) => explainersForGuideArea(year, e.subject, area.categoryId).includes(e)), `${e.slug}: not linked from Year ${year}`);
  }
  assert.deepEqual(explainersForGuideArea(3, "math", "number---addition-and-subtraction").map((e) => e.slug), ["column-addition", "column-subtraction"]);
  assert.deepEqual(explainersForGuideArea(3, "science", "plants"), []);
});

test("explainers stay unpublished until a teacher has reviewed them", () => {
  assert.deepEqual(PARENT_EXPLAINERS.filter(isExplainerPublic), []);
});
