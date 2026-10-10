import test from "node:test";
import assert from "node:assert/strict";
import { INITIAL_ANSWER_STATE, MILESTONE_EVERY, milestoneMessage, nextAnswer, towardsMilestone } from "./feedback.js";

/** Replays [correct, firstTry] answers and returns each tone. */
function tones(answers) {
  let state = INITIAL_ANSWER_STATE;
  return answers.map(([correct, firstTry]) => {
    const out = nextAnswer(state, correct, firstTry);
    state = out.state;
    return out.tone;
  });
}

const RIGHT = [true, true];
const WRONG = [false, true];
const RIGHT_LATE = [true, false];

test("every fifth right answer is a milestone", () => {
  assert.equal(MILESTONE_EVERY, 5);
  const out = tones(Array(10).fill(RIGHT_LATE));
  assert.deepEqual(
    out.map((tone) => tone === "milestone"),
    [false, false, false, false, true, false, false, false, false, true]
  );
});

test("a combo still fires at three right first time", () => {
  assert.deepEqual(tones([RIGHT, RIGHT, RIGHT]), ["correct", "correct", "combo"]);
});

test("a milestone outranks a combo on the same answer", () => {
  // Answer 15 is both a combo (15 in a row) and the third milestone.
  const out = tones(Array(15).fill(RIGHT));
  assert.equal(out[14], "milestone");
  assert.equal(out[5], "combo");
});

test("a wrong answer resets the combo but never the milestone count", () => {
  // Right answers 1, 2, (miss), 3, 4, 5 — the fifth is a milestone even
  // though the streak was broken twice; the misses never "uncount" anything.
  const out = tones([RIGHT, RIGHT, WRONG, RIGHT_LATE, WRONG, RIGHT_LATE, RIGHT]);
  assert.deepEqual(out, ["correct", "correct", "wrong", "correct", "wrong", "correct", "milestone"]);
});

test("progress towards the next milestone wraps at five", () => {
  assert.deepEqual([0, 1, 4, 5, 6, 10].map(towardsMilestone), [0, 1, 4, 0, 1, 0]);
});

test("milestone lines carry the count and rotate", () => {
  assert.match(milestoneMessage(5), /5 right!/);
  assert.match(milestoneMessage(10), /10 right!/);
  assert.notEqual(milestoneMessage(5).replace("5", "N"), milestoneMessage(10).replace("10", "N"));
});
