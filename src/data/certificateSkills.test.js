import test from "node:test";
import assert from "node:assert/strict";
import { CURRICULUM_SUBJECTS, CURRICULUM_YEARS, loadCurriculum } from "./curriculumRegistry.js";
import {
  SKILL_STATEMENT_MAX,
  TOPIC_SKILLS,
  categorySkill,
  skillKey,
  subjectSkill,
  topicSkill,
  yearSkill,
} from "./certificateSkills.js";
import { findUsSpellings } from "./english/textChecks.js";

/** Every `year/subject/topicId` in every registered curriculum. */
function registeredTopicKeys() {
  const keys = [];
  for (const year of CURRICULUM_YEARS) {
    for (const { id: subject } of CURRICULUM_SUBJECTS) {
      const curriculum = loadCurriculum(year, subject);
      if (!curriculum) continue;
      for (const category of curriculum) {
        for (const topic of category.topics) keys.push(skillKey(year, subject, topic.id));
      }
    }
  }
  return keys;
}

test("every topic in every registered curriculum has its own statement", () => {
  const keys = registeredTopicKeys();
  assert.ok(keys.length > 150, `expected the five registered curricula, got ${keys.length} topics`);
  const missing = keys.filter((key) => !(key in TOPIC_SKILLS));
  assert.deepEqual(missing, []);
});

test("no statement belongs to a topic that does not exist", () => {
  const known = new Set(registeredTopicKeys());
  const orphans = Object.keys(TOPIC_SKILLS).filter((key) => !known.has(key));
  assert.deepEqual(orphans, []);
});

test("statements are short, first person and end like a sentence", () => {
  for (const [key, text] of Object.entries(TOPIC_SKILLS)) {
    assert.ok(text.length <= SKILL_STATEMENT_MAX, `${key} is ${text.length} characters`);
    assert.match(text, /^I (can|know) /, key);
    assert.match(text, /\.$/, key);
  }
});

test("statements use British spelling", () => {
  for (const [key, text] of Object.entries(TOPIC_SKILLS)) {
    assert.deepEqual(findUsSpellings(text), [], key);
  }
});

test("a topic without a statement still gets a line from its name", () => {
  assert.equal(
    topicSkill({ year: 9, subject: "math", topicId: "new-topic", topicName: "Algebra" }),
    "I finished every challenge in Algebra."
  );
  assert.equal(
    topicSkill({ year: "2", subject: "math", topicId: "counting-in-steps-of-2-3-5-and-10" }),
    "I can count in steps of 2, 3, 5 and 10."
  );
});

test("quest, subject and year lines are templated from names", () => {
  // The achievement line already names the quest, subject or year; the
  // statement must not repeat it.
  assert.equal(categorySkill({ categoryTitle: "Number - Fractions" }), "I kept going until every topic in the quest was done.");
  assert.equal(subjectSkill({ year: 2, subjectName: "Maths" }), "I worked through a whole year of Maths.");
  assert.equal(yearSkill({ year: "3" }), "I worked through every subject in a whole school year.");
});
