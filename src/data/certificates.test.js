import test from "node:test";
import assert from "node:assert/strict";
import {
  certificateDate,
  curriculumCertificates,
  describeCertificate,
  listSubjects,
  registeredSubjectNames,
  yearCertificate,
} from "./certificates.js";

const curriculum = [
  {
    id: "number",
    title: "Number",
    topics: [
      { id: "counting", name: "Counting", icon: "🔢", challenges: [{ id: 1 }, { id: 2 }] },
      { id: "place-value", name: "Place Value", icon: "🧱", challenges: [{ id: 1 }] },
    ],
  },
  {
    id: "shapes",
    title: "Shapes",
    topics: [{ id: "2-d-shapes", name: "2-D Shapes", challenges: [{ id: 1 }] }],
  },
];
const built = () => true;
const done = (topics) => ({ completedChallenges: topics });
const candidate = (progress, extra = {}) => ({
  year: 2, subject: "math", subjectName: "Maths", curriculum, progress, isBuilt: built, ...extra,
});

test("a topic certificate carries its sticker, its statement and its context", () => {
  const cert = describeCertificate({
    kind: "topic", year: "2", subject: "math", subjectName: "Maths",
    topicId: "counting-in-steps-of-2-3-5-and-10", topicName: "Counting in Steps of 2, 3, 5 and 10", icon: "🪜",
  });
  assert.equal(cert.label, "Topic certificate");
  assert.equal(cert.achievement, "finished every challenge in the Counting in Steps of 2, 3, 5 and 10 topic");
  assert.equal(cert.context, "Year 2 Maths");
  assert.equal(cert.statement, "I can count in steps of 2, 3, 5 and 10.");
  assert.equal(cert.icon, "🪜");
  assert.equal(cert.key, "topic:2/math/counting-in-steps-of-2-3-5-and-10");
});

test("a category is a quest to the child", () => {
  const cert = describeCertificate({ kind: "category", year: 2, subject: "math", subjectName: "Maths", categoryId: "number", categoryTitle: "Number" });
  assert.equal(cert.label, "Quest certificate");
  assert.equal(cert.achievement, "finished every topic in the Number quest");
  assert.equal(cert.statement, "I kept going until every topic in the quest was done.");
});

test("a year names every subject it took", () => {
  assert.equal(
    describeCertificate({ kind: "year", year: 3, subjectNames: ["Maths", "English", "Science"] }).achievement,
    "finished every Year 3 challenge in Maths, English and Science"
  );
  assert.equal(
    describeCertificate({ kind: "year", year: 2, subjectNames: ["Maths"] }).achievement,
    "finished every Year 2 Maths challenge"
  );
  assert.equal(listSubjects(["Maths", "English"]), "Maths and English");
});

test("only finished topics and quests hold certificates", () => {
  const progress = { number: { topics: { counting: done([1, 2]), "place-value": done([1]) } } };
  const certs = curriculumCertificates(candidate(progress));
  assert.deepEqual([...certs.topics.keys()], ["counting", "place-value"]);
  assert.deepEqual([...certs.categories.keys()], ["number"]);
  assert.equal(certs.subject, null);
});

test("a half-done topic, a duplicate id or an unbuilt challenge never earns one", () => {
  const progress = { number: { topics: { counting: done([1, 1]) } } };
  assert.equal(curriculumCertificates(candidate(progress)).topics.size, 0);

  const allDone = { number: { topics: { counting: done([1, 2]), "place-value": done([1]) } } };
  const onlyFirst = (topicId, challengeId) => Number(challengeId) === 1;
  const certs = curriculumCertificates(candidate(allDone, { isBuilt: onlyFirst }));
  assert.ok(!certs.topics.has("counting"));
  assert.ok(!certs.categories.has("number"));
});

test("a finished subject holds a subject certificate", () => {
  const progress = {
    number: { topics: { counting: done([1, 2]), "place-value": done([1]) } },
    shapes: { topics: { "2-d-shapes": done([1]) } },
  };
  const certs = curriculumCertificates(candidate(progress));
  assert.equal(certs.subject?.label, "Year 2 Maths certificate");
});

test("a year certificate needs every registered subject of that year", () => {
  const finished = {
    number: { topics: { counting: done([1, 2]), "place-value": done([1]) } },
    shapes: { topics: { "2-d-shapes": done([1]) } },
  };
  const maths = candidate(finished, { year: 3 });
  const english = candidate({}, { year: 3, subject: "english", subjectName: "English" });
  assert.equal(yearCertificate([maths, english], 3), null);
  assert.equal(yearCertificate([maths, { ...english, progress: finished }], 3)?.label, "Year 3 certificate");
  assert.equal(yearCertificate([maths], 5), null, "a year with no curricula is never finished");
});

test("a year's subjects come from the registry", () => {
  assert.deepEqual(registeredSubjectNames(2), ["Maths", "English", "Science"]);
  assert.deepEqual(registeredSubjectNames("3"), ["Maths", "English", "Science"]);
});

test("the date reads the British way", () => {
  assert.equal(certificateDate(new Date(2026, 9, 10)), "10 October 2026");
});

test("the Year 1 certificate needs Year 1 History too", () => {
  const finished = {
    number: { topics: { counting: done([1, 2]), "place-value": done([1]) } },
    shapes: { topics: { "2-d-shapes": done([1]) } },
  };
  const maths = candidate(finished, { year: 1 });
  const history = candidate({}, { year: 1, subject: "history", subjectName: "History" });
  assert.equal(yearCertificate([maths, history], 1), null);
  assert.ok(yearCertificate([maths, { ...history, progress: finished }], 1).achievement.includes("History"));
  assert.ok(registeredSubjectNames(1).includes("History"));
});
