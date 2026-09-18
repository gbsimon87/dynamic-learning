import test from "node:test";
import assert from "node:assert/strict";
import {
  TURNS,
  HEADINGS,
  applyTurn,
  turnBetween,
  headingName,
  patternAt,
  runProgram,
  describePosition,
} from "./positionAndDirection.js";

test("turns are the three Year 2 fractions of a full turn", () => {
  assert.deepEqual(
    TURNS.map((t) => t.id),
    ["quarter", "half", "three-quarter"]
  );
  assert.deepEqual(TURNS.map((t) => t.rightAngles), [1, 2, 3]);
});

test("a quarter turn clockwise from up faces right", () => {
  assert.equal(applyTurn("up", "quarter", "clockwise"), "right");
});

test("a quarter turn anti-clockwise from up faces left", () => {
  assert.equal(applyTurn("up", "quarter", "anti-clockwise"), "left");
});

test("a half turn faces the opposite way whichever way you go", () => {
  assert.equal(applyTurn("up", "half", "clockwise"), "down");
  assert.equal(applyTurn("up", "half", "anti-clockwise"), "down");
  assert.equal(applyTurn("left", "half", "clockwise"), "right");
});

test("a three-quarter turn clockwise is the same as a quarter anti-clockwise", () => {
  for (const heading of HEADINGS) {
    assert.equal(
      applyTurn(heading, "three-quarter", "clockwise"),
      applyTurn(heading, "quarter", "anti-clockwise")
    );
  }
});

test("turning wraps all the way round", () => {
  assert.equal(applyTurn("left", "quarter", "clockwise"), "up");
  assert.equal(applyTurn("up", "quarter", "anti-clockwise"), "left");
});

test("works out the turn between two headings", () => {
  assert.deepEqual(turnBetween("up", "right"), { turn: "quarter", direction: "clockwise" });
  assert.deepEqual(turnBetween("up", "down"), { turn: "half", direction: "clockwise" });
  assert.deepEqual(turnBetween("up", "left"), { turn: "quarter", direction: "anti-clockwise" });
});

test("no turn between a heading and itself", () => {
  assert.equal(turnBetween("up", "up"), null);
});

test("headings have child-friendly names", () => {
  assert.equal(headingName("up"), "up");
  assert.equal(headingName("right"), "right");
});

test("a repeating pattern continues forever", () => {
  const pattern = ["circle", "square", "triangle"];
  assert.equal(patternAt(pattern, 0), "circle");
  assert.equal(patternAt(pattern, 3), "circle");
  assert.equal(patternAt(pattern, 7), "square");
});

test("the robot moves forward in the direction it faces", () => {
  const end = runProgram({ x: 0, y: 2, heading: "up" }, ["forward", "forward"], 4);
  assert.deepEqual(end, { x: 0, y: 0, heading: "up" });
});

test("the robot turns without moving", () => {
  const end = runProgram({ x: 1, y: 1, heading: "up" }, ["right"], 4);
  assert.deepEqual(end, { x: 1, y: 1, heading: "right" });
});

test("a full program of moves and turns lands where expected", () => {
  const end = runProgram({ x: 0, y: 3, heading: "up" }, ["forward", "right", "forward", "forward"], 4);
  assert.deepEqual(end, { x: 2, y: 2, heading: "right" });
});

test("the robot cannot walk off the grid", () => {
  // Bumping the wall must leave it where it was rather than go out of bounds,
  // or the drawing and the position disagree.
  const end = runProgram({ x: 0, y: 0, heading: "up" }, ["forward", "forward"], 4);
  assert.deepEqual(end, { x: 0, y: 0, heading: "up" });
});

test("describes where one thing is next to another", () => {
  assert.equal(describePosition({ x: 1, y: 0 }, { x: 1, y: 1 }), "above");
  assert.equal(describePosition({ x: 1, y: 2 }, { x: 1, y: 1 }), "below");
  assert.equal(describePosition({ x: 0, y: 1 }, { x: 1, y: 1 }), "left of");
  assert.equal(describePosition({ x: 2, y: 1 }, { x: 1, y: 1 }), "right of");
});
