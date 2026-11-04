import { existsSync, mkdirSync, readFileSync, renameSync, rmdirSync, unlinkSync, writeFileSync } from "node:fs";
import { repoPath } from "./topics.js";

const timestamp = (value) => typeof value === "string" && Number.isFinite(Date.parse(value));

function timerPath(root, id) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id ?? "")) throw new Error("Use a timer id such as year6 or year6-math");
  return repoPath(root, `docs/authoring/timings/${id}.json`);
}

export function readTimer(root, id) {
  const file = timerPath(root, id);
  if (!existsSync(file)) throw new Error(`No timer ${id}. Start it before beginning the build.`);
  const timer = JSON.parse(readFileSync(file, "utf8"));
  if (timer.version !== 1 || timer.id !== id || !["running", "paused", "finished"].includes(timer.status) || !timestamp(timer.startedAt) || !timestamp(timer.updatedAt) || !Array.isArray(timer.sessions) || !timer.sessions.length) throw new Error(`Invalid timer record: ${id}; existing data was not changed`);
  let previous = Date.parse(timer.startedAt);
  for (const [index, session] of timer.sessions.entries()) {
    if (!timestamp(session.startedAt) || Date.parse(session.startedAt) < previous) throw new Error(`Invalid session order in ${id}`);
    if (session.endedAt === null) {
      if (timer.status !== "running" || index !== timer.sessions.length - 1) throw new Error(`Invalid open session in ${id}`);
      previous = Date.parse(session.startedAt);
    } else {
      if (!timestamp(session.endedAt) || Date.parse(session.endedAt) < Date.parse(session.startedAt)) throw new Error(`Invalid session duration in ${id}`);
      previous = Date.parse(session.endedAt);
    }
  }
  if ((timer.status === "running") !== (timer.sessions.at(-1).endedAt === null) || Date.parse(timer.updatedAt) < previous) throw new Error(`Invalid timer status in ${id}`);
  if (timer.status === "finished" ? !timestamp(timer.finishedAt) || Date.parse(timer.finishedAt) < previous : timer.finishedAt !== null) throw new Error(`Invalid finish time in ${id}`);
  return timer;
}

export function changeTimer(root, id, action, now = Date.now()) {
  if (!["start", "pause", "resume", "stop"].includes(action)) throw new Error(`Unknown timer action: ${action}`);
  if (!Number.isFinite(now)) throw new Error("Invalid clock value");
  const at = new Date(now).toISOString();
  const file = timerPath(root, id);
  const directory = repoPath(root, "docs/authoring/timings");
  mkdirSync(directory, { recursive: true });
  const lock = `${file}.lock`;
  try { mkdirSync(lock); }
  catch (error) { if (error.code === "EEXIST") throw new Error(`Timer ${id} is locked by another update; existing data was not changed`); throw error; }
  const temporary = `${file}.${process.pid}.tmp`;
  try {
    let timer;
    if (action === "start") {
      if (existsSync(file)) throw new Error(`Timer ${id} already exists. Use resume or report; start never resets a record.`);
      timer = { version: 1, id, status: "running", startedAt: at, updatedAt: at, finishedAt: null, sessions: [{ startedAt: at, endedAt: null }] };
    } else {
      timer = readTimer(root, id);
      if (now < Date.parse(timer.updatedAt)) throw new Error("Clock moved backwards; timer record was not changed");
      if ((action === "pause" && timer.status === "paused") || (action === "resume" && timer.status === "running") || (action === "stop" && timer.status === "finished")) return timer;
      if (timer.status === "finished") throw new Error(`Timer ${id} is finished. Use a new id for a new measurement.`);
      if (action === "pause" || action === "stop") {
        if (timer.status === "running") timer.sessions.at(-1).endedAt = at;
        timer.status = action === "stop" ? "finished" : "paused";
        if (action === "stop") timer.finishedAt = at;
      } else {
        timer.sessions.push({ startedAt: at, endedAt: null });
        timer.status = "running";
      }
      timer.updatedAt = at;
    }
    writeFileSync(temporary, JSON.stringify(timer, null, 2) + "\n", { flag: "wx" });
    renameSync(temporary, file);
    return timer;
  } finally {
    if (existsSync(temporary)) unlinkSync(temporary);
    rmdirSync(lock);
  }
}

export function timerReport(timer, now = Date.now()) {
  if (!Number.isFinite(now) || now < Date.parse(timer.updatedAt)) throw new Error("Clock is earlier than the latest timer event");
  const end = timer.finishedAt ? Date.parse(timer.finishedAt) : now;
  const elapsedMs = end - Date.parse(timer.startedAt);
  const recordedWorkMs = timer.sessions.reduce((sum, session) => sum + (session.endedAt ? Date.parse(session.endedAt) : now) - Date.parse(session.startedAt), 0);
  return {
    id: timer.id, status: timer.status, startedAt: timer.startedAt, finishedAt: timer.finishedAt,
    recordedWorkMs, pausedMs: elapsedMs - recordedWorkMs, elapsedMs, sessions: timer.sessions.length,
    scope: "Recorded unpaused wall time, including AI/tool/test waits; unrecorded breaks count as work. Not CPU time or token usage.",
  };
}

export function formatDuration(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  return `${Math.floor(seconds / 3600)}h ${Math.floor(seconds % 3600 / 60)}m ${seconds % 60}s`;
}
