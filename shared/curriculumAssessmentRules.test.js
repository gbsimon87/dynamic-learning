import test from "node:test";
import assert from "node:assert/strict";
import { createAssessmentSession, selectAssessmentItems, submitAssessmentResponse, finishAssessmentSession, scoreAssessmentResponse, assessmentSummary } from "./curriculumAssessmentRules.js";
import { normaliseAssessmentResponse, publicAssessmentDocument, validateAssessmentCandidate } from "./curriculumAssessmentData.js";
import { mergeIntroductionAcknowledgements, readJourneyDocument } from "./curriculumJourneyData.js";
import { validateIntroduction, validateJourneyModel } from "./curriculumJourneyModels.js";
import { journeyFixtureBank, journeyFixturePathway as pathway, journeyFixtureIntroductions as intros, journeyFixtureIntro as intro } from "./testing/curriculumJourneyFixtures.js";

const at = "2026-11-11T12:00:00.000Z";
const fresh = (kind = "quest", categoryId = "number---fractions") => createAssessmentSession({
  childId: "child-a", year: 3, subject: "math", sessionId: crypto.randomUUID(), kind, categoryId,
}, pathway, journeyFixtureBank(), { rng: () => 0.25, now: () => at });
const action = (s, value, skip = false) => ({ expectedRevision: s.revision,
  itemInstanceId: s.items[s.responses.length].itemInstanceId, submissionId: crypto.randomUUID(),
  response: skip ? { kind: "skip" } : { kind: "answer", value } });

test("quest selection covers every topic; final covers distinct topics in every quest", () => {
  const quest = fresh();
  assert.deepEqual(new Set(quest.items.map((i) => i.topicId)), new Set(["equal-parts", "tenths"]));
  const final = fresh("subject", null);
  assert.equal(final.items.length, 4);
  for (const q of pathway.categories) assert.equal(new Set(final.items.filter((i) => i.categoryId === q.id).map((i) => i.topicId)).size, 2);
  assert.deepEqual(selectAssessmentItems(pathway, journeyFixtureBank(), { kind: "subject", categoryId: null, rng: () => 0.25 }),
    selectAssessmentItems(pathway, journeyFixtureBank(), { kind: "subject", categoryId: null, rng: () => 0.25 }));
});

test("a new attempt prefers unused candidates and insufficient pools fail without loops", () => {
  const previous = fresh();
  const items = selectAssessmentItems(pathway, journeyFixtureBank(), { kind: "quest", categoryId: previous.categoryId, previous, rng: () => 0.25 });
  assert.ok(items.every((i) => !previous.items.some((p) => p.candidateId === i.id)));
  const bank = journeyFixtureBank(); bank.items = bank.items.filter((i) => i.topicId !== "tenths");
  assert.throws(() => selectAssessmentItems(pathway, bank, { kind: "quest", categoryId: previous.categoryId }), /INSUFFICIENT_ITEMS/);
});

test("one-topic final chooses two distinct items, never a padded duplicate", () => {
  const tiny = { ...pathway, categories: [{ ...pathway.categories[0], topics: [pathway.categories[0].topics[0]] }] };
  const bank = journeyFixtureBank(); bank.items = bank.items.filter((i) => i.topicId === "equal-parts"); bank.quests = [tiny.categories[0].id];
  const items = selectAssessmentItems(tiny, bank, { kind: "subject", categoryId: null });
  assert.equal(new Set(items.map((i) => i.id)).size, 2);
  bank.items = bank.items.slice(0, 1);
  assert.throws(() => selectAssessmentItems(tiny, bank, { kind: "subject", categoryId: null }), /INSUFFICIENT_ITEMS/);
});

test("first responses are immutable, skips remain separate, and duplicate retries are no-ops", () => {
  const initial = fresh();
  const wrong = action(initial, "999");
  const answered = submitAssessmentResponse(initial, wrong, at);
  assert.equal(answered.responses[0].outcome, "incorrect");
  assert.equal(initial.responses.length, 0);
  assert.equal(submitAssessmentResponse(answered, wrong, at), answered);
  assert.throws(() => submitAssessmentResponse(answered, { ...wrong, response: { kind: "answer", value: "2" } }, at), /SUBMISSION_ID_REUSED/);
  assert.throws(() => submitAssessmentResponse(answered, { ...wrong, submissionId: crypto.randomUUID() }, at), /ITEM_ALREADY_ANSWERED/);
  const skipped = submitAssessmentResponse(answered, action(answered, null, true), at);
  const complete = finishAssessmentSession(skipped, { expectedRevision: skipped.revision }, at);
  assert.deepEqual({ correct: complete.summary.correct, incorrect: complete.summary.incorrect, skipped: complete.summary.skipped,
    answered: complete.summary.answered, total: complete.summary.total, remaining: complete.summary.remaining },
  { correct: 0, incorrect: 1, skipped: 1, answered: 1, total: 2, remaining: 0 });
  assert.equal(finishAssessmentSession(complete, { expectedRevision: 0 }, at), complete);
});

test("stale/out-of-order writes and early completion cannot replace a saved response", () => {
  const session = fresh();
  assert.throws(() => finishAssessmentSession(session, { expectedRevision: 0 }, at), /INCOMPLETE_ASSESSMENT/);
  assert.throws(() => submitAssessmentResponse(session, { ...action(session, "2"), expectedRevision: 10 }, at), /REVISION_CONFLICT/);
  assert.throws(() => submitAssessmentResponse(session, { ...action(session, "2"), itemInstanceId: session.items[1].itemInstanceId }, at), /ITEM_OUT_OF_ORDER/);
});

test("public snapshots omit nested scoring and unsubmitted review, including history", () => {
  const session = fresh(); session.privateSecret = "never project";
  const visible = publicAssessmentDocument(session);
  assert.equal(visible.items[0].scoring, undefined);
  assert.equal(visible.items[0].review, undefined);
  assert.equal(visible.privateSecret, undefined);
  const answered = submitAssessmentResponse(session, action(session, "0"), at);
  const publicAnswered = publicAssessmentDocument(answered);
  assert.ok(publicAnswered.items[0].review.explanation);
  assert.equal(publicAnswered.items[1].review, undefined);
  assert.equal(publicAssessmentDocument(answered, { summaryOnly: true }).items, undefined);
  assert.equal(assessmentSummary(session).remaining, 2);
});

test("signed/decimal scoring is exact and malformed or over-precise input is rejected", () => {
  const item = journeyFixtureBank().items[0];
  item.public.input = { kind: "number", maxDigits: 8, signed: true, decimalPlaces: 2 };
  item.scoring = { kind: "number", accepted: [-1.01, 0] };
  validateAssessmentCandidate(item);
  for (const value of ["-1.01", "0", "00.00"]) assert.equal(scoreAssessmentResponse(item, { kind: "answer", value }), "correct");
  assert.equal(scoreAssessmentResponse(item, { kind: "answer", value: "1.01" }), "incorrect");
  for (const value of ["", " ", "0x10", "NaN", "Infinity", "1e2", "-1.010", "999999999"]) {
    assert.throws(() => normaliseAssessmentResponse(item.public, { kind: "answer", value }), /INVALID_RESPONSE/);
  }
});

test("text punctuation/case policy is explicit and French accents survive", () => {
  const item = journeyFixtureBank().items[0]; item.public.input = { kind: "text", maxLength: 120 };
  item.scoring = { kind: "text", accepted: ["l'école"], caseSensitive: false, normaliseApostrophes: true };
  assert.equal(scoreAssessmentResponse(item, { kind: "answer", value: "L’ÉCOLE" }), "correct");
  assert.equal(scoreAssessmentResponse(item, { kind: "answer", value: "lecole" }), "incorrect");
});

test("sort/shade responses validate identities and scoring never depends on array order", () => {
  const item = journeyFixtureBank().items[0];
  item.public.input = { kind: "sort", cards: [{ id: "a", label: "A" }, { id: "b", label: "B" }], bins: [{ id: "x", label: "X" }, { id: "y", label: "Y" }] };
  item.scoring = { kind: "sort", accepted: [[{ cardId: "a", binId: "x" }, { cardId: "b", binId: "y" }]] };
  assert.equal(scoreAssessmentResponse(item, { kind: "answer", value: [...item.scoring.accepted[0]].reverse() }), "correct");
  assert.throws(() => scoreAssessmentResponse(item, { kind: "answer", value: [{ cardId: "a", binId: "x" }, { cardId: "a", binId: "y" }] }), /INVALID_RESPONSE/);
  item.public.input = { kind: "fractionShade", parts: 4 }; item.scoring = { kind: "count", accepted: [2] };
  assert.equal(scoreAssessmentResponse(item, { kind: "answer", value: [3, 0] }), "correct");
  assert.throws(() => scoreAssessmentResponse(item, { kind: "answer", value: [1, 1] }), /INVALID_RESPONSE/);
});

test("public schemas reject nested answers, unknown renderer prototypes and invalid intros", () => {
  const item = journeyFixtureBank().items[0]; item.public.input.answer = "3";
  assert.throws(() => validateAssessmentCandidate(item), /INVALID_INPUT/);
  assert.throws(() => validateJourneyModel({ renderer: "constructor", data: {}, alt: "bad" }), /INVALID_MODEL/);
  assert.throws(() => validateJourneyModel({ renderer: "groups", data: { groups: [["●"]], answer: 1 }, alt: "one" }), /INVALID_MODEL/);
  assert.equal(validateIntroduction(intro), intro);
  assert.throws(() => validateIntroduction({ ...intro, usefulness: "" }), /INVALID_INTRODUCTION/);
});

test("introduction acknowledgements union by shipped scope, retain metadata and do not infer understanding", () => {
  const first = mergeIntroductionAcknowledgements(null, [{ scopeId: "subject", contentVersion: 1 }], pathway, intros, at);
  const doc = { schemaVersion: 1, revision: 1, createdAt: at, updatedAt: at, data: { ...first, custom: "keep" } };
  const merged = mergeIntroductionAcknowledgements(doc, [{ scopeId: "quest:number---fractions", contentVersion: 1 }], pathway, intros, at);
  assert.equal(merged.acknowledged.length, 2); assert.equal(merged.custom, "keep");
  assert.deepEqual(mergeIntroductionAcknowledgements(doc, [{ scopeId: "subject", contentVersion: 1 }], pathway, intros, at), doc.data);
  assert.throws(() => mergeIntroductionAcknowledgements(doc, [{ scopeId: "quest:made-up", contentVersion: 1 }], pathway, intros, at), /INVALID_ACKNOWLEDGEMENTS/);
  assert.throws(() => readJourneyDocument({ ...doc, schemaVersion: 2 }), /INVALID_JOURNEY/);
});
