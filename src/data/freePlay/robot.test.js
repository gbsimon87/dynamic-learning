import test from "node:test";
import assert from "node:assert/strict";
import { describePosition, runProgram } from "../challenges/positionAndDirection.js";
import { describeProgram, makeBoard, makePath, makeRobotQuestion, programOptions, roomAhead } from "./robot.js";
import { seeded } from "./random.js";

function parseProgram(text) {
  return text.split(", ").flatMap((part) => {
    if (part === "Turn left") return ["left"];
    if (part === "Turn right") return ["right"];
    return Array(Number(part.replace("Forward ", ""))).fill("forward");
  });
}

test("paths never walk into a wall and always go somewhere", () => {
  for (const [size, turns] of [[4, 0], [4, 1], [5, 1], [5, 2]]) {
    for (let seed = 1; seed <= 300; seed += 1) {
      const { start, program, end } = makePath(seeded(seed), size, turns);
      let state = start;
      for (const step of program) {
        if (step === "forward") assert.ok(roomAhead(state, size) > 0, "bumped a wall");
        state = runProgram(state, [step], size);
      }
      assert.deepEqual(state, end);
      assert.ok(end.x !== start.x || end.y !== start.y);
      assert.equal(program.filter((s) => s !== "forward").length, turns);
    }
  }
});

test("exactly one program option reaches the star", () => {
  for (let seed = 1; seed <= 400; seed += 1) {
    const rng = seeded(seed);
    const size = seed % 2 ? 4 : 5;
    const path = makePath(rng, size, seed % 3);
    const { answer, options } = programOptions(path, size, rng);
    assert.ok(options.length >= 3, `only ${options.length} options`);
    assert.equal(new Set(options).size, options.length);
    const reaching = options.filter((text) => {
      const end = runProgram(path.start, parseProgram(text), size);
      return end.x === path.end.x && end.y === path.end.y;
    });
    assert.deepEqual(reaching, [answer]);
  }
});

test("program text groups forwards", () => {
  assert.equal(describeProgram(["forward", "forward", "right", "forward"]), "Forward 2, Turn right, Forward 1");
});

test("the board question has one right answer", () => {
  for (let seed = 1; seed <= 300; seed += 1) {
    const size = 3 + (seed % 3);
    const { objects, reference, subject, relation } = makeBoard(seeded(seed), size, size + 1);
    assert.equal(new Set(objects.map((o) => `${o.x},${o.y}`)).size, objects.length);
    assert.equal(new Set(objects.map((o) => o.emoji)).size, objects.length);
    assert.equal(describePosition(subject, reference), relation);
    assert.equal(Math.abs(subject.x - reference.x) + Math.abs(subject.y - reference.y), 1);
  }
});

test("questions are well formed at every level", () => {
  for (const level of [1, 2, 3]) {
    for (let seed = 1; seed <= 300; seed += 1) {
      const q = makeRobotQuestion(seeded(seed * 11 + level), level);
      assert.ok(q.key && q.prompt && q.speech);
      if (q.options) assert.ok(q.options.includes(q.answer), q.key);
      if (q.kind === "build") {
        const end = runProgram(q.robot, q.solution, q.size);
        assert.deepEqual({ x: end.x, y: end.y }, q.target);
      }
      if (level === 1 && q.kind === "facing") assert.match(q.prompt, /quarter turn/);
    }
  }
});
