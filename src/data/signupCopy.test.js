import test from "node:test";
import assert from "node:assert/strict";
import { STEP, emptyDraft, withBirthYear } from "./signupFlow.js";
import { bixLine, errorMessage, stepTitle } from "./signupCopy.js";

const learner = { name: "Maya", avatar: "🦊", colour: "--profile-colour-sky", yearGroup: 3, subjects: ["science"] };
const draft = { ...withBirthYear(emptyDraft(), 1990, 2026), learnFor: "children", learners: [learner], email: "maya.parent@gmail.com" };

test("Bix has a line and every step has a title", () => {
  for (const step of Object.values(STEP)) {
    const cursor = ["name", "year", "look", "subjects"].includes(step) ? { step, index: 0 } : { step };
    assert.ok(bixLine(draft, cursor), step);
    assert.ok(stepTitle(draft, cursor), step);
  }
});

test("Bix uses the name and reacts to the latest subject", () => {
  assert.equal(bixLine(draft, { step: STEP.name, index: 0 }), "Hi Maya! 👋");
  assert.equal(bixLine(draft, { step: STEP.subjects, index: 0 }), "Ooh, I love magnets!");
  assert.equal(bixLine(draft, { step: STEP.code }), "I sent a code to m…@gmail.com");
  assert.equal(stepTitle(draft, { step: STEP.year, index: 0 }), "Which school year is Maya in?");
});

test("'Me' changes the wording", () => {
  const me = { ...withBirthYear(emptyDraft(), 2011, 2026), learners: [{ name: "", avatar: null, colour: null }] };
  assert.equal(stepTitle(me, { step: STEP.name, index: 0 }), "What should Bix call you?");
  assert.equal(stepTitle(me, { step: STEP.year, index: 0 }), "Which year's work would you like?");
});

test("error messages: details are used, unknown codes fall back", () => {
  assert.equal(errorMessage("CODE_INCORRECT", { attemptsLeft: 1 }), "Hmm, let's try that again — 1 try left.");
  assert.equal(errorMessage("CODE_INCORRECT", { attemptsLeft: 3 }), "Hmm, let's try that again — 3 tries left.");
  assert.equal(errorMessage("TOO_MANY_CODES", { retryAfterSeconds: 61 }), "Let's take a break — try again in 2 minutes.");
  assert.equal(errorMessage("WHAT_IS_THIS"), errorMessage("SIGNUP_FAILED"));
});
