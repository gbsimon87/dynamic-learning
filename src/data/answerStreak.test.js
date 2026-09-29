import test from "node:test";
import assert from "node:assert/strict";
import { nextStreak } from "./answerStreak.js";

/** Replays answers: each is [correct, firstTry]. Returns the combo flags. */
function replay(answers) {
  let streak = 0;
  return answers.map(([correct, firstTry]) => {
    const out = nextStreak(streak, correct, firstTry);
    streak = out.streak;
    return out.combo;
  });
}

const RIGHT = [true, true];
const WRONG = [false, true];
const RIGHT_AFTER_A_MISS = [true, false];

test("three right first time in a row is a combo", () => {
  assert.deepEqual(replay([RIGHT, RIGHT, RIGHT]), [false, false, true]);
});

test("the combo fires again at six, not on every answer after three", () => {
  assert.deepEqual(replay(Array(6).fill(RIGHT)), [false, false, true, false, false, true]);
});

test("a wrong attempt resets the streak", () => {
  assert.deepEqual(
    replay([RIGHT, RIGHT, WRONG, RIGHT_AFTER_A_MISS, RIGHT, RIGHT, RIGHT]),
    [false, false, false, false, false, false, true]
  );
});

test("a question that needed a second go never counts towards a combo", () => {
  assert.deepEqual(replay([RIGHT_AFTER_A_MISS, RIGHT_AFTER_A_MISS, RIGHT_AFTER_A_MISS]), [false, false, false]);
});
