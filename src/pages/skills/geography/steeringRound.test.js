import test from "node:test";
import assert from "node:assert/strict";
import {
    DEAD_ZONE, TARGET_COUNT, addAct, addBump, addTime, createRound, notesFor, recordReached,
    resultsSummary, steerInput, stickVector, targetIndex,
} from "./steeringRound.js";

test("a round visits each colour once, in some order", () => {
    const round = createRound();
    assert.deepEqual([...round.order].sort(), [0, 1, 2, 3, 4]);
    assert.equal(round.done, false);
    assert.equal(targetIndex(round), round.order[0]);
});

test("reaching targets moves on, and the fifth finishes the round", () => {
    const round = createRound();
    const seen = [];
    for (let i = 0; i < TARGET_COUNT; i++) {
        seen.push(targetIndex(round));
        assert.equal(recordReached(round), i === TARGET_COUNT - 1);
    }
    assert.deepEqual(seen, round.order);
    assert.equal(round.done, true);
    assert.equal(targetIndex(round), null);
    assert.equal(round.log.length, TARGET_COUNT);
});

test("time, bumps and actions count against the current target only while playing", () => {
    const round = createRound();
    addTime(round, 1.5); addBump(round); addAct(round); addAct(round);
    recordReached(round);
    assert.deepEqual(round.log[0], { name: round.log[0].name, t: 1.5, bumps: 1, acts: 2 });
    assert.deepEqual(round.cur, { t: 0, bumps: 0, acts: 0 });
    for (let i = 1; i < TARGET_COUNT; i++) recordReached(round);
    addTime(round, 9); addBump(round); addAct(round);
    assert.deepEqual(round.cur, { t: 0, bumps: 0, acts: 0 });
});

test("a shuffle can be made repeatable", () => {
    assert.deepEqual(createRound(() => 0.5).order, [0, 1, 2, 3, 4]);
});

test("the joystick ignores tiny wobbles but passes real steering", () => {
    assert.deepEqual(steerInput(DEAD_ZONE - 0.01, 0, new Set()), { x: 0, y: 0 });
    assert.deepEqual(steerInput(0.5, -0.5, new Set()), { x: 0.5, y: -0.5 });
});

test("arrow keys and WASD steer, and the total is clamped", () => {
    assert.deepEqual(steerInput(0, 0, new Set(["ArrowLeft"])), { x: -1, y: 0 });
    assert.deepEqual(steerInput(0, 0, new Set(["w", "d"])), { x: 1, y: 1 });
    assert.deepEqual(steerInput(0.8, 0, new Set(["ArrowRight", "d"])), { x: 1, y: 0 });
    assert.deepEqual(steerInput(0, 0, new Set(["a", "d"])), { x: 0, y: 0 });
});

test("the thumb is held inside the joystick, with up as positive y", () => {
    assert.deepEqual(stickVector(0, -20, 40), { x: 0, y: 0.5, thumbX: 0, thumbY: -20 });
    const far = stickVector(300, 400, 50);
    assert.ok(Math.abs(Math.hypot(far.x, far.y) - 1) < 1e-9);
    assert.ok(Math.abs(far.thumbX - 30) < 1e-9 && Math.abs(far.thumbY - 40) < 1e-9);
    assert.equal(far.y, -0.8);
});

test("notes show finished targets plus a live row for the current one", () => {
    const round = createRound(() => 0.5);
    assert.deepEqual(notesFor(round).rows, []);
    addTime(round, 2);
    assert.deepEqual(notesFor(round).rows.map((r) => [r.name, r.live]), [["RED (now)", true]]);
    recordReached(round);
    const notes = notesFor(round);
    assert.deepEqual(notes.rows.map((r) => [r.name, r.live]), [["RED", false], ["BLUE (now)", true]]);
    assert.equal(notes.doneCount, 1);
    assert.equal(notes.doneSeconds, 2);
});

test("results text lists both styles with their totals", () => {
    const rounds = { A: createRound(() => 0.5), B: createRound(() => 0.5) };
    addTime(rounds.A, 3.25); addBump(rounds.A); addAct(rounds.A);
    recordReached(rounds.A);
    assert.equal(resultsSummary(rounds), [
        "Steering playtest",
        "A: Joystick: 1/5 targets, total 3.3 s, bumps 1, let-go 1",
        "  RED: 3.3 s, 1 bumps, 1 let-go",
        "B: Tap to go: 0/5 targets, total 0.0 s, bumps 0, taps 0",
    ].join("\n"));
});
