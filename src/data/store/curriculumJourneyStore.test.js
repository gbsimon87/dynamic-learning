import test from "node:test";
import assert from "node:assert/strict";
import { createLocalCurriculumJourneyStore } from "./localCurriculumJourney.js";
import { createApiCurriculumJourneyStore } from "./apiCurriculumJourney.js";
import { journeyFixtureBank, journeyFixturePathway, journeyFixtureIntroductions } from "../../../shared/testing/curriculumJourneyFixtures.js";

function fixture() {
  const memory = new Map();
  const bank = journeyFixtureBank();
  let tick = 0;
  const local = createLocalCurriculumJourneyStore({
    readCollection: (key) => memory.has(key) ? JSON.parse(memory.get(key)) : [],
    writeCollection: (key, docs) => { memory.set(key, JSON.stringify(docs)); return true; },
    withCollectionLock: (_key, fn) => fn(), manifest: [journeyFixturePathway],
    loadIntroductions: async () => journeyFixtureIntroductions, loadBank: async () => bank,
    now: () => new Date(Date.UTC(2026, 10, 11, 12, 0, tick++)).toISOString(), rng: () => 0.25,
  });
  const api = createApiCurriculumJourneyStore(async (path, { body } = {}) => {
    const url = new URL(path, "https://example.test");
    const [, , child, year, subject, collection, id, action] = url.pathname.split("/").map(decodeURIComponent);
    let result, key;
    if (!collection) { result = await local.getCurriculumJourney(child, year, subject); key = "journey"; }
    else if (collection === "acknowledgements") { result = await local.acknowledgeCurriculumIntroductions(child, year, subject, body); key = "journey"; }
    else if (id === "overview") result = await local.getCurriculumAssessmentOverview(child, year, subject);
    else if (action === "responses") { result = await local.submitCurriculumAssessmentResponse(child, year, subject, id, body); key = "session"; }
    else if (action === "finish") { result = await local.finishCurriculumAssessment(child, year, subject, id, body); key = "session"; }
    else if (id) { result = await local.getCurriculumAssessment(child, year, subject, id); key = "session"; }
    else if (body) { result = await local.startCurriculumAssessment(child, year, subject, body); key = "session"; }
    else result = await local.listCurriculumAssessments(child, year, subject, { kind: url.searchParams.get("kind"), categoryId: url.searchParams.get("kind") === "subject" ? null : url.searchParams.get("categoryId"),
      cursor: url.searchParams.get("cursor"), limit: Number(url.searchParams.get("limit")) });
    return { data: key ? { [key]: result } : result };
  });
  return { memory, bank, local, api };
}
const scope = { kind: "quest", categoryId: "number---fractions" };
const start = (store, child = "child-a", extra = {}) => store.startCurriculumAssessment(child, 3, "math", { ...scope, sessionId: crypto.randomUUID(), ...extra });
const submit = (store, s, response) => store.submitCurriculumAssessmentResponse(s.childId, 3, "math", s.sessionId, {
  expectedRevision: s.revision, itemInstanceId: s.items[s.responses.length].itemInstanceId, submissionId: crypto.randomUUID(), response,
});

for (const driver of ["local", "api"]) test(`${driver}: acknowledge, retry, resume, score and finish preserve independent records`, async () => {
  const f = fixture(), store = f[driver];
  assert.equal(await store.getCurriculumJourney("child-a", 3, "math"), null);
  const first = await store.acknowledgeCurriculumIntroductions("child-a", 3, "math", { acknowledgements: [{ scopeId: "subject", contentVersion: 1 }] });
  assert.deepEqual(await store.acknowledgeCurriculumIntroductions("child-a", 3, "math", { acknowledgements: [{ scopeId: "subject", contentVersion: 1 }] }), first);
  let session = await start(store);
  const initial = structuredClone(session);
  assert.deepEqual(await start(store, "child-a", { sessionId: session.sessionId }), initial);
  session = await submit(store, session, { kind: "answer", value: f.bank.items.find((i) => i.id === session.items[0].candidateId).review.answerText });
  session = await submit(store, session, { kind: "skip" });
  const complete = await store.finishCurriculumAssessment("child-a", 3, "math", session.sessionId, { expectedRevision: session.revision });
  assert.equal(complete.summary.correct, 1); assert.equal(complete.summary.skipped, 1); assert.equal(complete.summary.total, 2);
  assert.deepEqual(await store.finishCurriculumAssessment("child-a", 3, "math", session.sessionId, { expectedRevision: 0 }), complete);
  f.bank.items.length = 0; // Resume/final results are pinned to the stored snapshot.
  assert.deepEqual(await store.getCurriculumAssessment("child-a", 3, "math", session.sessionId), complete);
  assert.deepEqual(await store.startCurriculumAssessment("child-a", 3, "math", { ...scope, sessionId: session.sessionId }), complete);
  assert.equal(await store.getCurriculumJourney("child-b", 3, "math"), null);
  await assert.rejects(store.getCurriculumAssessment("child-b", 3, "math", session.sessionId), /SESSION_NOT_FOUND/);
  assert.equal(f.memory.has("dl.progress"), false); assert.equal(f.memory.has("dl.rewards"), false);
});

test("request-supplied identity/score fields cannot replace the trusted child or snapshots", async () => {
  const { local } = fixture();
  const session = await start(local, "child-a", { childId: "child-b", year: 99, subject: "bad", revision: 100, summary: { correct: 99 } });
  assert.equal(session.childId, "child-a"); assert.equal(session.year, 3); assert.equal(session.subject, "math"); assert.equal(session.revision, 0);
  await assert.rejects(start(local, "child-a", { ...scope, sessionId: session.sessionId, categoryId: "measurement" }), /SESSION_ID_REUSED/);
});

test("concurrent identical submissions converge while a distinct stale answer conflicts", async () => {
  const { local } = fixture(); const initial = await start(local);
  const action = { expectedRevision: 0, itemInstanceId: initial.items[0].itemInstanceId, submissionId: crypto.randomUUID(), response: { kind: "answer", value: "0" } };
  const results = await Promise.all([local.submitCurriculumAssessmentResponse("child-a", 3, "math", initial.sessionId, action),
    local.submitCurriculumAssessmentResponse("child-a", 3, "math", initial.sessionId, action)]);
  assert.deepEqual(results[0], results[1]); assert.equal(results[0].savedResponses, 1);
  await assert.rejects(local.submitCurriculumAssessmentResponse("child-a", 3, "math", initial.sessionId,
    { ...action, submissionId: crypto.randomUUID(), response: { kind: "answer", value: "1" } }), /ITEM_ALREADY_ANSWERED/);
});

test("overview finds attempts beyond the history page and cursors cannot change ownership", async () => {
  const { local } = fixture();
  let first = await start(local);
  while (first.savedResponses < first.total) first = await submit(local, first, { kind: "skip" });
  await local.finishCurriculumAssessment("child-a", 3, "math", first.sessionId, { expectedRevision: first.revision });
  let latest;
  for (let i = 0; i < 22; i++) latest = await start(local);
  const overview = await local.getCurriculumAssessmentOverview("child-a", 3, "math");
  const q = overview.scopes.find((s) => s.categoryId === scope.categoryId);
  assert.equal(q.latestCompleted.sessionId, first.sessionId); assert.equal(q.latestActive.sessionId, latest.sessionId);
  const page = await local.listCurriculumAssessments("child-a", 3, "math", { ...scope, limit: 20 });
  assert.equal(page.sessions.length, 20); assert.ok(page.nextCursor);
  const tail = await local.listCurriculumAssessments("child-a", 3, "math", { ...scope, limit: 20, cursor: page.nextCursor });
  assert.equal(tail.sessions.length, 3); assert.equal(tail.nextCursor, null);
  assert.equal(new Set([...page.sessions, ...tail.sessions].map((s) => s.sessionId)).size, 23);
  await assert.rejects(local.listCurriculumAssessments("child-b", 3, "math", { ...scope, cursor: page.nextCursor }), /INVALID_CURSOR/);
});

test("corrupt collections fail without overwriting them; returned snapshots are defensive copies", async () => {
  const { memory, local } = fixture(); memory.set("dl.curriculumJourney", "broken");
  await assert.rejects(local.acknowledgeCurriculumIntroductions("child-a", 3, "math", { acknowledgements: [{ scopeId: "subject", contentVersion: 1 }] }));
  assert.equal(memory.get("dl.curriculumJourney"), "broken");
  const session = await start(local); session.items[0].public.prompt = "mutated";
  assert.notEqual((await local.getCurriculumAssessment("child-a", 3, "math", session.sessionId)).items[0].public.prompt, "mutated");
});

test("API adapter rejects malformed success bodies and prematurely exposed answer keys", async () => {
  const f = fixture(), saved = await start(f.local);
  for (const data of [null, {}, { session: null }, { session: { ...saved, childId: "another-child" } },
    { session: { ...saved, items: saved.items.map((i) => ({ ...i, scoring: { accepted: [3] } })) } },
    { session: { ...saved, items: saved.items.map((i) => ({ ...i, review: { answerText: "3", explanation: "answer" } })) } }]) {
    const api = createApiCurriculumJourneyStore(async () => ({ data }));
    await assert.rejects(api.getCurriculumAssessment("child-a", 3, "math", saved.sessionId), /INVALID_RESPONSE/);
  }
});
