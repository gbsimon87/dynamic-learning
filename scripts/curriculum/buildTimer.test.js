import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawnSync } from "node:child_process";
import { REPO_ROOT } from "./topics.js";
import { changeTimer, formatDuration, readTimer, timerReport } from "./buildTimer.js";

const start = Date.parse("2026-11-03T09:00:00.000Z");
function fixture(t) {
  const root = mkdtempSync(path.join(os.tmpdir(), "bix-course-time-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  return { root, file: path.join(root, "docs/authoring/timings/year6.json") };
}

test("work sessions persist across restarts and exclude recorded breaks", (t) => {
  const { root } = fixture(t);
  changeTimer(root, "year6", "start", start);
  changeTimer(root, "year6", "pause", start + 20 * 60000);
  // Reading from disk models a new process returning after a lunch break.
  assert.equal(readTimer(root, "year6").status, "paused");
  changeTimer(root, "year6", "resume", start + 80 * 60000);
  changeTimer(root, "year6", "stop", start + 110 * 60000);
  const report = timerReport(readTimer(root, "year6"), start + 300 * 60000);
  assert.equal(report.status, "finished");
  assert.equal(report.recordedWorkMs, 50 * 60000);
  assert.equal(report.pausedMs, 60 * 60000);
  assert.equal(report.elapsedMs, 110 * 60000);
  assert.equal(report.sessions, 2);
  assert.equal(formatDuration(report.recordedWorkMs), "0h 50m 0s");
});

test("a paused or running timer reports live elapsed time honestly", (t) => {
  const { root } = fixture(t);
  const running = changeTimer(root, "year6", "start", start);
  assert.equal(timerReport(running, start + 123000).recordedWorkMs, 123000);
  const paused = changeTimer(root, "year6", "pause", start + 120000);
  const report = timerReport(paused, start + 300000);
  assert.equal(report.recordedWorkMs, 120000);
  assert.equal(report.pausedMs, 180000);
  assert.match(report.scope, /unrecorded breaks count as work/);
  assert.match(report.scope, /Not CPU time or token usage/);
});

test("duplicate commands never restart or extend completed sessions", (t) => {
  const { root, file } = fixture(t);
  changeTimer(root, "year6", "start", start);
  assert.throws(() => changeTimer(root, "year6", "start", start + 1000), /never resets/);
  changeTimer(root, "year6", "resume", start + 2000);
  assert.equal(readTimer(root, "year6").sessions.length, 1);
  changeTimer(root, "year6", "pause", start + 3000);
  const paused = readFileSync(file, "utf8");
  changeTimer(root, "year6", "pause", start + 4000);
  assert.equal(readFileSync(file, "utf8"), paused);
  changeTimer(root, "year6", "stop", start + 5000);
  const stopped = readFileSync(file, "utf8");
  changeTimer(root, "year6", "stop", start + 6000);
  assert.equal(readFileSync(file, "utf8"), stopped);
  assert.throws(() => changeTimer(root, "year6", "resume", start + 7000), /finished/);
});

test("corrupt records, invalid IDs and clock reversals fail without replacing history", (t) => {
  const { root, file } = fixture(t);
  assert.throws(() => changeTimer(root, "../escape", "start", start), /timer id/);
  assert.throws(() => readTimer(root, "year6"), /No timer/);
  changeTimer(root, "year6", "start", start);
  const original = readFileSync(file, "utf8");
  assert.throws(() => changeTimer(root, "year6", "pause", start - 1), /backwards/);
  assert.equal(readFileSync(file, "utf8"), original);
  writeFileSync(file, '{"version":9}');
  assert.throws(() => changeTimer(root, "year6", "resume", start + 1000), /Invalid timer record/);
  assert.equal(readFileSync(file, "utf8"), '{"version":9}');
  assert.equal(existsSync(file + ".lock"), false);
  const malformed = JSON.parse(original);
  malformed.sessions[0].endedAt = new Date(start - 1).toISOString();
  writeFileSync(file, JSON.stringify(malformed));
  assert.throws(() => readTimer(root, "year6"), /Invalid session duration/);
});

test("concurrent updates are rejected without changing the timer", (t) => {
  const { root, file } = fixture(t);
  changeTimer(root, "year6", "start", start);
  const original = readFileSync(file, "utf8");
  mkdirSync(file + ".lock");
  assert.throws(() => changeTimer(root, "year6", "pause", start + 1000), /locked/);
  assert.equal(readFileSync(file, "utf8"), original);
});

test("CLI help and unknown-report exit codes work without creating a real course timer", () => {
  const script = path.join(REPO_ROOT, "scripts/courseTimer.js");
  const help = spawnSync(process.execPath, [script, "--help"], { encoding: "utf8" });
  assert.equal(help.status, 0);
  assert.match(help.stdout, /start\|pause\|resume\|stop\|report/);
  const unknown = spawnSync(process.execPath, [script, "report", "never-started-test-timer"], { encoding: "utf8" });
  assert.equal(unknown.status, 1);
  assert.match(unknown.stderr, /No timer/);
});
