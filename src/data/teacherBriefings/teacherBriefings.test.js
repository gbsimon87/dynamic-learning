import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { loadCurriculum } from "../curriculumRegistry.js";
import { YEAR3_MATH_BRIEFINGS } from "./year3Math.js";
import { briefingCourses, briefingNoteSets, getTopicBriefing, listBriefingTopics, programmeOfStudy } from "./index.js";

const filled = (value) => typeof value === "string" && value.trim().length > 0;
const normalise = (text) => text.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ");
const programme = (year, subject) => normalise(readFileSync(new URL(`../../../docs/curriculum/${programmeOfStudy(year, subject)}`, import.meta.url), "utf8"));

test("every registered course has complete teacher notes for exactly its topics", () => {
  for (const { year, subject, notes } of briefingNoteSets()) {
    const topics = loadCurriculum(year, subject).flatMap((category) => category.topics);
    assert.deepEqual(Object.keys(notes).sort(), topics.map((topic) => topic.id).sort(), `${year}:${subject}`);
    for (const [id, entry] of Object.entries(notes)) {
      const at = `${year}:${subject}:${id}`;
      assert.ok(filled(entry.inBrief) && filled(entry.before) && filled(entry.next), at);
      assert.ok(entry.keyFacts.length >= 3 && entry.keyFacts.every(filled), at);
      assert.ok(entry.misconceptions.length >= 2 && entry.misconceptions.every((m) => filled(m.mistake) && filled(m.why) && filled(m.response)), at);
      assert.ok(entry.vocabulary.length >= 4 && entry.vocabulary.every((v) => filled(v.term) && filled(v.meaning)), at);
    }
  }
});

test("statutory requirements are quoted verbatim from the programme of study", () => {
  for (const { year, subject, notes } of briefingNoteSets()) {
    const text = programme(year, subject);
    for (const [id, entry] of Object.entries(notes)) {
      assert.ok(entry.statutory.length >= 1, `${year}:${subject}:${id}`);
      for (const quote of entry.statutory) assert.ok(text.includes(normalise(quote)), `${year}:${subject}:${id}: "${quote}"`);
    }
  }
});

test("maths notes use current exchange language", () => {
  assert.doesNotMatch(JSON.stringify(YEAR3_MATH_BRIEFINGS), /\b(borrow|borrowing|carry the|carrying)\b/i);
});

test("briefings combine the topic, its notes, Bix introductions and challenge links", () => {
  const briefing = getTopicBriefing(3, "math", "column-addition");
  assert.equal(briefing.name, "Column Addition");
  assert.ok(briefing.notes);
  assert.equal(briefing.challenges.length, 4);
  assert.ok(briefing.challenges.every((challenge) => challenge.lesson && challenge.to.startsWith("/year/3/math/problem/")));
  assert.ok(briefing.previous && briefing.next);
  const other = getTopicBriefing(4, "math", listBriefingTopics(4, "math")[0].topics[0].id);
  assert.equal(other.notes, null);
  assert.equal(getTopicBriefing(3, "math", "not-a-topic"), null);
  assert.equal(getTopicBriefing(9, "math", "column-addition"), null);
});

test("only courses with something to brief are offered", () => {
  const courses = briefingCourses().map((course) => `${course.year}:${course.subject}`);
  assert.ok(courses.includes("3:math") && courses.includes("6:english"));
  assert.ok(!courses.includes("1:english"), "Year 1 English has no Bix introductions yet");
  for (const year of [1, 2, 3, 4, 5, 6]) for (const subject of ["science", "history", "geography"]) assert.ok(courses.includes(`${year}:${subject}`), `${year}:${subject}`);
});
