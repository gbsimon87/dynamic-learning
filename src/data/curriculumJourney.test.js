import test from "node:test";
import assert from "node:assert/strict";
import { assessmentPracticeSuggestions, assessmentReadAloud, introductionReadAloud, curriculumEntryScopes, describeAssessmentResponse, getCurriculumReviewActions,
  pendingCurriculumIntroductions } from "./curriculumJourney.js";
import { acceptsNumberDraft, isCompleteNumber, isSubmittable } from "./assessmentInputRules.js";
import { journeyFixturePathway } from "../../shared/testing/curriculumJourneyFixtures.js";

const curriculum = [
  { id: "q1", title: "Quest 1", topics: [
    { id: "a", name: "A", challenges: [{ id: 1 }, { id: 2 }] },
    { id: "b", name: "B", challenges: [{ id: 1 }] },
    { id: "unbuilt", name: "Unbuilt", challenges: [{ id: 1 }] },
  ] },
  { id: "q2", title: "Quest 2", topics: [{ id: "c", name: "C", challenges: [{ id: 1 }, { id: 2 }] }] },
  { id: "q3", title: "Planned only", topics: [{ id: "d", name: "D", challenges: [{ id: 1 }] }] },
];
// Partially built: q3 and topic "unbuilt" have no built challenges; c/2 is planned.
const isBuilt = (topicId, challengeId) => !["unbuilt", "d"].includes(topicId) && !(topicId === "c" && Number(challengeId) === 2);
const done = (entries) => Object.fromEntries(Object.entries(entries).map(([quest, topics]) => [quest,
  { topics: Object.fromEntries(Object.entries(topics).map(([topic, ids]) => [topic, { completedChallenges: ids }])) }]));
const actions = (before, after, categoryId) => getCurriculumReviewActions({ curriculum, before: done(before), after: done(after),
  categoryId, isBuilt, year: 3, subject: "math" });

test("the last outstanding built challenge offers Quest Mastery wherever it sits, ignoring unbuilt slots", () => {
  assert.deepEqual(actions({ q1: { a: [2], b: [1] } }, { q1: { a: [2, 1], b: [1] } }, "q1"),
    [{ label: "Try Quest Mastery", href: "/curriculum/year/3/math/quest/q1/mastery" }]);
  assert.deepEqual(actions({}, { q1: { a: [1] } }, "q1"), []);
});

test("finishing the subject's last built quest offers quest first and the final test alongside", () => {
  const result = actions({ q1: { a: [1, 2], b: [1] } }, { q1: { a: [1, 2], b: [1] }, q2: { c: [1] } }, "q2");
  assert.deepEqual(result.map((a) => a.href), ["/curriculum/year/3/math/quest/q2/mastery", "/curriculum/year/3/math/final-test"]);
});

test("replaying an already complete challenge offers nothing new", () => {
  const all = { q1: { a: [1, 2], b: [1] }, q2: { c: [1] } };
  assert.deepEqual(actions(all, all, "q1"), []);
});

test("entry scopes follow subject → quest → topic, and replay is exactly one validated scope", () => {
  const pathway = journeyFixturePathway;
  assert.deepEqual(curriculumEntryScopes(pathway, { target: "map" }), ["subject"]);
  assert.deepEqual(curriculumEntryScopes(pathway, { target: "challenge", categoryId: "measurement", topicId: "mass" }),
    ["subject", "quest:measurement", "topic:measurement:mass"]);
  assert.deepEqual(curriculumEntryScopes(pathway, { target: "quest", categoryId: "measurement" }), ["subject", "quest:measurement"]);
  assert.deepEqual(curriculumEntryScopes(pathway, { target: "map", replay: "topic", categoryId: "measurement", topicId: "mass" }), ["topic:measurement:mass"]);
  assert.throws(() => curriculumEntryScopes(pathway, { target: "map", replay: "topic", categoryId: "measurement", topicId: "length2" }), /INVALID_REPLAY/);
  assert.throws(() => curriculumEntryScopes(pathway, { target: "challenge", categoryId: "nope", topicId: "mass" }), /INVALID_SCOPE/);
});

test("pending intros skip acknowledged and in-memory suppressed scopes, except on replay", () => {
  const doc = { data: { acknowledged: [{ scopeId: "subject" }] } };
  assert.deepEqual(pendingCurriculumIntroductions(["subject", "quest:x"], doc), ["quest:x"]);
  assert.deepEqual(pendingCurriculumIntroductions(["subject", "quest:x"], doc, new Set(["quest:x"])), []);
  assert.deepEqual(pendingCurriculumIntroductions(["subject"], doc, new Set(), true), ["subject"]);
  assert.deepEqual(pendingCurriculumIntroductions(["subject"], null), ["subject"]);
});

test("practice suggestions: most missed first, current availability, no dead links", () => {
  const item = (categoryId, topicId, challengeId) => ({ categoryId, topicId, practice: { topicId, challengeId } });
  const session = { items: [item("q1", "b", 1), item("q2", "c", 2), item("q2", "c", 1), item("q1", "a", 1), item("q1", "unbuilt", 1)],
    responses: [{ outcome: "incorrect" }, { outcome: "skipped" }, { outcome: "incorrect" }, { outcome: "correct" }, { outcome: "skipped" }] };
  assert.deepEqual(assessmentPracticeSuggestions(session, curriculum, isBuilt), [
    { categoryId: "q2", topicId: "c", topicName: "C", missed: 2, challengeId: 1 },
    { categoryId: "q1", topicId: "b", topicName: "B", missed: 1, challengeId: 1 },
    { categoryId: "q1", topicId: "unbuilt", topicName: "Unbuilt", missed: 1, challengeId: null },
  ]);
  assert.deepEqual(assessmentPracticeSuggestions({ items: [item("q1", "a", 1)], responses: [{ outcome: "correct" }] }, curriculum, isBuilt), []);
});

test("number drafts accept only what the item declares and never rewrite a value", () => {
  const whole = { kind: "number", maxDigits: 4 };
  const signedDecimal = { kind: "number", maxDigits: 6, signed: true, decimalPlaces: 2 };
  assert.equal(acceptsNumberDraft(whole, "1234"), true);
  assert.equal(acceptsNumberDraft(whole, "12345"), false);
  assert.equal(acceptsNumberDraft(whole, "-1"), false);
  assert.equal(acceptsNumberDraft(whole, "1.5"), false);
  assert.equal(acceptsNumberDraft(signedDecimal, "-12.75"), true);
  assert.equal(acceptsNumberDraft(signedDecimal, "-12.755"), false);
  assert.equal(acceptsNumberDraft(signedDecimal, "1e3"), false);
  assert.equal(isCompleteNumber("-"), false);
  assert.equal(isCompleteNumber("3."), false);
  assert.equal(isCompleteNumber("0"), true);
  assert.equal(isSubmittable({ kind: "text" }, "  "), false);
  assert.equal(isSubmittable({ kind: "order", cards: [{}, {}] }, ["c1", "c2"]), true);
});

test("saved answers are described from public data only", () => {
  const input = { kind: "sort", cards: [{ id: "k1", label: "Cat" }], bins: [{ id: "b1", label: "Living" }] };
  assert.equal(describeAssessmentResponse(input, [{ cardId: "k1", binId: "b1" }]), "Cat: Living");
  assert.equal(describeAssessmentResponse({ kind: "choice", options: [{ id: "a", label: "7/10" }] }, "a"), "7/10");
  assert.equal(describeAssessmentResponse({ kind: "text" }, "élève"), "élève");
});

test("quiz read-aloud: maths reads symbols and options as words; other subjects and authored words are unchanged", () => {
  const quiz = (prompt, speech, input = { kind: "number" }) => ({ public: { prompt, speech, input } });
  const choice = { kind: "choice", options: [{ id: "a", label: "1/4" }, { id: "b", label: "3/4" }] };
  assert.equal(assessmentReadAloud(quiz("What is 2/3 of 15?", { mode: "prompt", text: "What is 2/3 of 15?" }), "math"), "What is two thirds of 15?");
  assert.equal(assessmentReadAloud(quiz("What fraction is shaded?", { mode: "prompt", text: "What fraction is shaded?" }, choice), "math"),
    "What fraction is shaded? Is it one quarter or three quarters?");
  assert.equal(assessmentReadAloud(quiz("Is 2/7 < 3/7?", { mode: "prompt", text: "Is two sevenths less than three sevenths?" }, choice), "math"),
    "Is two sevenths less than three sevenths?");
  assert.equal(assessmentReadAloud(quiz("In 4/4 time, which country is the USA?", { mode: "prompt", text: "In 4/4 time, which country is the USA?" }), "music"),
    "In 4/4 time, which country is the USA?");
  assert.equal(assessmentReadAloud(quiz("Which part is **Send the invitations**?", { mode: "prompt", text: "Which part is **Send the invitations**?" }), "computing"),
    "Which part is Send the invitations?");
  assert.equal(assessmentReadAloud(quiz("Type **rabbit**.", { mode: "none" }), "french"), null);
});

test("introduction read-aloud reads Maths symbols as words and pauses between lines in every subject", () => {
  const intro = { title: "Fractions", learning: ["Find 1/4 of a set"], usefulness: "Share £12 fairly", example: { text: "1/4 of 8 = 2", model: { alt: "Eight counters in four groups." } } };
  assert.equal(introductionReadAloud(intro, "math"),
    "Fractions. Find one quarter of a set. Share 12 pounds fairly. one quarter of 8 equals 2. Eight counters in four groups.");
  assert.equal(introductionReadAloud(intro, "science"), "Fractions. Find 1/4 of a set. Share £12 fairly. 1/4 of 8 = 2. Eight counters in four groups.");
});
