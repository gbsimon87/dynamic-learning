import test from "node:test";
import assert from "node:assert/strict";
import {
  DRAFT_KEY, EXPLORING, GATED, STEP, accountErrors, addLearner, ageBandForBirthYear,
  birthYearOptions, destinationFor, dropBlankLearner, editLearner, emptyDraft, isDraftReady, nextCursor,
  parseCode, parseDraft, prevCursor, serialiseDraft, signupBody, stageOf, stepError,
  stepsFor, subjectsForYear, toggleSubject, withBirthYear, withCount, withCursor, withLearnFor, withLearner,
} from "./signupFlow.js";

const NOW = 2026;
const maya = { name: "Maya", avatar: "🦊", colour: "--profile-colour-sky", yearGroup: 2, subjects: ["math"] };
const leo = { name: "Leo", avatar: "🐼", colour: "--profile-colour-mint", yearGroup: 3, subjects: [] };
const parentDraft = () => ({ ...withCount(withLearnFor(withBirthYear(emptyDraft(), 1990, NOW), "children"), 2), learners: [maya, leo] });

test("age is counted at the youngest it could be", () => {
  assert.equal(ageBandForBirthYear(2014, NOW), GATED); // 11 or 12
  assert.equal(ageBandForBirthYear(2013, NOW), GATED); // 12 or 13 → 12
  assert.equal(ageBandForBirthYear(2012, NOW), "13-15"); // 13 or 14
  assert.equal(ageBandForBirthYear(2010, NOW), "13-15"); // 15 or 16 → 15
  assert.equal(ageBandForBirthYear(2009, NOW), "16-17");
  assert.equal(ageBandForBirthYear(2008, NOW), "16-17"); // 17 or 18 → 17
  assert.equal(ageBandForBirthYear(2007, NOW), "18+");
});

test("birth years run newest first and are not pre-selected", () => {
  const years = birthYearOptions(NOW);
  assert.equal(years[0], NOW - 3);
  assert.equal(years.at(-1), NOW - 100);
  assert.equal(emptyDraft().birthYear, null);
});

test("subjects come from the registry for the year", () => {
  assert.deepEqual(subjectsForYear(null), []);
  assert.deepEqual([...subjectsForYear(1)].sort(), ["english", "math", "science"]);
  assert.deepEqual([...subjectsForYear(2)].sort(), ["english", "math", "science"]);
  assert.deepEqual(subjectsForYear(5), []);
  assert.deepEqual([...subjectsForYear(3)].sort(), ["english", "math", "science"]);
  assert.deepEqual(subjectsForYear(4), ["math", "english", "science"]);
});

test("under 18 is always 'me' with one learner; under 13 goes to the gate", () => {
  const teen = withBirthYear(emptyDraft(), 2011, NOW);
  assert.equal(teen.learnFor, "me");
  assert.equal(teen.learners.length, 1);
  assert.equal(stepsFor(teen).some((c) => c.step === STEP.who), false);
  const child = withBirthYear(emptyDraft(), 2016, NOW);
  assert.equal(child.ageBand, GATED);
  assert.deepEqual(nextCursor(child, { step: STEP.birthYear }), { step: STEP.gate });
  assert.deepEqual(prevCursor(child, { step: STEP.gate }), { step: STEP.birthYear });
});

test("a grown-up path: who → count → each learner → summary → account → code", () => {
  const draft = parentDraft();
  assert.deepEqual(stepsFor(draft).map((c) => (c.index === undefined ? c.step : `${c.step}${c.index}`)), [
    "birthYear", "who", "count",
    "name0", "year0", "look0", "subjects0",
    "name1", "year1", "look1", "subjects1",
    "summary", "account", "code",
  ]);
});

test("subjects are skipped for a year with no curriculum or 'Not sure'", () => {
  const draft = { ...parentDraft(), learners: [{ ...maya, yearGroup: 5 }, { ...leo, yearGroup: null }] };
  assert.equal(stepsFor(draft).some((c) => c.step === STEP.subjects), false);
});

test("stepping forward and back follows the sequence", () => {
  const draft = parentDraft();
  assert.deepEqual(nextCursor(draft, { step: STEP.count }), { step: STEP.name, index: 0 });
  assert.deepEqual(nextCursor(draft, { step: STEP.subjects, index: 0 }), { step: STEP.name, index: 1 });
  assert.deepEqual(prevCursor(draft, { step: STEP.name, index: 1 }), { step: STEP.subjects, index: 0 });
  assert.equal(prevCursor(draft, { step: STEP.birthYear }), null);
});

test("editing from the summary returns to the summary", () => {
  const draft = editLearner(parentDraft(), 0);
  assert.deepEqual(draft.cursor, { step: STEP.name, index: 0 });
  assert.deepEqual(nextCursor(draft, { step: STEP.subjects, index: 0 }), { step: STEP.summary });
  assert.deepEqual(prevCursor(draft, { step: STEP.name, index: 0 }), { step: STEP.summary });
});

test("finishing an edit clears the shortcut back to the summary", () => {
  const back = withCursor(editLearner(parentDraft(), 0), { step: STEP.summary });
  assert.equal(back.returnTo, null);
  assert.deepEqual(prevCursor(back, { step: STEP.summary }), { step: STEP.subjects, index: 1 });
  assert.deepEqual(nextCursor(back, { step: STEP.subjects, index: 0 }), { step: STEP.name, index: 1 });
  assert.equal(withCursor(editLearner(parentDraft(), 0), { step: STEP.year, index: 0 }).returnTo, STEP.summary);
});

test("backing out of an added child drops it; a child with answers is kept", () => {
  const before = parentDraft();
  const added = addLearner(before);
  assert.equal(added.learners.length, 3);
  assert.deepEqual(dropBlankLearner(added, 2).learners, before.learners);
  const named = withLearner(added, 2, { name: "Zoe" });
  assert.equal(dropBlankLearner(named, 2), named);
  const spaces = withLearner(added, 2, { name: "   " });
  assert.equal(dropBlankLearner(spaces, 2).learners.length, 2);
  assert.equal(dropBlankLearner(before, 0), before, "a finished learner is kept");
  assert.equal(dropBlankLearner(before, 9), before, "no such learner");
});

test("adding a learner from the summary is capped at six", () => {
  let draft = parentDraft();
  for (let i = 0; i < 10; i++) draft = addLearner(draft);
  assert.equal(draft.learners.length, 6);
  assert.equal(draft.returnTo, STEP.summary);
  assert.equal(addLearner({ ...withBirthYear(emptyDraft(), 2011, NOW) }).learners.length, 1, "a learner cannot add children");
});

test("count keeps learners already filled in", () => {
  const draft = withCount(parentDraft(), 3);
  assert.equal(draft.learners[0].name, "Maya");
  assert.equal(draft.learners.length, 3);
  assert.equal(withCount(draft, 1).learners.length, 1);
  assert.equal(withCount(draft, 99).learners.length, 6);
});

test("changing a year drops subjects that year doesn't have (Review Focus 1)", () => {
  const draft = { ...parentDraft(), learners: [{ ...leo, subjects: ["science", "math"] }] };
  assert.deepEqual(withLearner(draft, 0, { yearGroup: 2 }).learners[0].subjects, ["science", "math"]);
  assert.deepEqual(withLearner(draft, 0, { yearGroup: 4 }).learners[0].subjects, ["science", "math"]);
  assert.deepEqual(withLearner(draft, 0, { yearGroup: 1 }).learners[0].subjects, ["science", "math"]);
  assert.deepEqual(withLearner(draft, 0, { yearGroup: 5 }).learners[0].subjects, []);
});

test("a year change that empties the picks asks the subjects again", () => {
  const draft = { ...parentDraft(), learners: [{ ...leo, subjects: ["science"] }] };
  assert.deepEqual(withLearner(draft, 0, { yearGroup: 2 }).learners[0].subjects, ["science"]);
  assert.deepEqual(withLearner(draft, 0, { yearGroup: 4 }).learners[0].subjects, ["science"]);
  assert.deepEqual(withLearner(draft, 0, { yearGroup: 5 }).learners[0].subjects, [], "no subjects offered: keep []");
  const exploring = { ...parentDraft(), learners: [{ ...leo, subjects: [] }] };
  assert.deepEqual(withLearner(exploring, 0, { yearGroup: 2 }).learners[0].subjects, [], "Just exploring is kept");
});

test("toggling subjects: Just exploring is exclusive; clearing the last one un-answers", () => {
  assert.deepEqual(toggleSubject(undefined, "math"), ["math"]);
  assert.deepEqual(toggleSubject(["math"], "science"), ["math", "science"]);
  assert.equal(toggleSubject(["math"], "math"), undefined);
  assert.deepEqual(toggleSubject(["math"], EXPLORING), []);
  assert.deepEqual(toggleSubject([], "math"), ["math"]);
});

test("each step says what is missing", () => {
  const draft = { ...parentDraft(), learners: [{ name: " ", avatar: null, colour: null }] };
  assert.equal(stepError(draft, { step: STEP.name, index: 0 }), "NAME_REQUIRED");
  assert.equal(stepError({ ...draft, learners: [{ name: "x".repeat(21) }] }, { step: STEP.name, index: 0 }), "NAME_TOO_LONG");
  assert.equal(stepError(draft, { step: STEP.year, index: 0 }), "CHOOSE_ONE");
  assert.equal(stepError(draft, { step: STEP.look, index: 0 }), "CHOOSE_LOOK");
  assert.equal(stepError(parentDraft(), { step: STEP.year, index: 0 }), null);
  assert.equal(isDraftReady(parentDraft()), true);
  assert.equal(isDraftReady(draft), false);
});

test("account fields", () => {
  assert.deepEqual(accountErrors({ email: "a@b.co", password: "password1", confirm: "password1" }), {});
  assert.deepEqual(accountErrors({ email: "a@b", password: "short", confirm: "" }), { email: "EMAIL_INVALID", password: "PASSWORD_TOO_SHORT" });
  assert.deepEqual(accountErrors({ email: "a@b.co", password: "password1", confirm: "password2" }), { confirm: "PASSWORD_MISMATCH" });
});

test("the request body", () => {
  const draft = { ...parentDraft(), email: " Family@Example.com " };
  assert.deepEqual(signupBody(draft, { password: "pw-123456", code: "482913" }), {
    email: "family@example.com", password: "pw-123456", code: "482913", accountType: "parent", ageBand: null,
    children: [
      { name: "Maya", avatar: "🦊", colour: "--profile-colour-sky", yearGroup: 2, subjects: ["math"] },
      { name: "Leo", avatar: "🐼", colour: "--profile-colour-mint", yearGroup: 3, subjects: [] },
    ],
  });
  const teen = { ...withBirthYear(emptyDraft(), 2011, NOW), learners: [{ ...maya, yearGroup: null, subjects: undefined }], email: "t@x.co" };
  const body = signupBody(teen, { password: "pw-123456" });
  assert.equal(body.accountType, "learner");
  assert.equal(body.ageBand, "13-15");
  assert.equal("code" in body, false);
  assert.deepEqual(body.children[0].subjects, []);
  assert.equal("birthYear" in body, false, "the birth year never leaves the browser");
});

test("where a learner goes after the hand-over", () => {
  assert.equal(destinationFor({ yearGroup: 3, subjects: ["science", "math"] }), "/curriculum/year/3/science");
  assert.equal(destinationFor({ yearGroup: 3, subjects: [] }), "/");
  assert.equal(destinationFor({ yearGroup: null, subjects: [] }), "/");
  assert.equal(destinationFor({}), "/");
});

test("codes are pulled out of whatever was pasted (Review Focus 3)", () => {
  assert.equal(parseCode("482913"), "482913");
  assert.equal(parseCode(" 482 913 "), "482913");
  assert.equal(parseCode("482-913"), "482913");
  assert.equal(parseCode("Your code is 482913."), "482913");
  assert.equal(parseCode("1234567"), "123456");
  assert.equal(parseCode(null), "");
});

test("a draft round-trips and never holds a password", () => {
  const draft = { ...parentDraft(), email: "a@b.co", cursor: { step: STEP.summary } };
  const raw = serialiseDraft(draft);
  assert.equal(raw.includes("password"), false);
  assert.equal(raw.includes("birthYear"), false, "the birth year is never saved");
  assert.deepEqual(parseDraft(raw), { ...draft, birthYear: null });
  assert.equal(DRAFT_KEY, "dl.signupDraft");
});

test("a gated draft is never saved or restored", () => {
  const gated = withBirthYear(emptyDraft(), 2016, NOW);
  assert.equal(serialiseDraft(gated), null);
  assert.equal(parseDraft(JSON.stringify({ ...gated, birthYear: undefined })), null);
});

test("a stale or tampered draft is discarded or made safe (Review Focus 4)", () => {
  for (const raw of ["", "not json", "null", "[]", '{"v":0}', JSON.stringify({ ...emptyDraft(), v: 2 })]) {
    assert.equal(parseDraft(raw), null, raw);
  }
  const nine = { ...parentDraft(), learners: Array.from({ length: 9 }, () => maya) };
  assert.equal(parseDraft(JSON.stringify(nine)), null);
  assert.equal(parseDraft(JSON.stringify({ ...parentDraft(), learners: [{ name: 5 }] })), null);
  assert.equal(parseDraft(JSON.stringify({ ...parentDraft(), ageBand: "9-10" })), null);
  assert.equal(parseDraft(JSON.stringify({ ...parentDraft(), cursor: { step: "nowhere" } })), null);
  // The code step needs the password, which is never saved: resume at the account step.
  assert.deepEqual(parseDraft(JSON.stringify({ ...parentDraft(), cursor: { step: STEP.code } })).cursor, { step: STEP.account });
  // A cursor the draft cannot reach restarts at the first unanswered step.
  const early = { ...withBirthYear(emptyDraft(), 1990, NOW), cursor: { step: STEP.summary } };
  assert.deepEqual(parseDraft(JSON.stringify(early)).cursor, { step: STEP.who });
  // A fully answered draft with an unreachable cursor resumes at the summary.
  const lost = { ...parentDraft(), cursor: { step: STEP.name, index: 5 } };
  assert.deepEqual(parseDraft(JSON.stringify(lost)).cursor, { step: STEP.summary });
});

test("progress stages", () => {
  assert.equal(stageOf({ step: STEP.who }), 0);
  assert.equal(stageOf({ step: STEP.look, index: 1 }), 1);
  assert.equal(stageOf({ step: STEP.summary }), 2);
  assert.equal(stageOf({ step: STEP.code }), 3);
});
