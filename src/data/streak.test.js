import test from "node:test";
import assert from "node:assert/strict";
import { addDays, daysBetween, recordDay, streakStatus, weekDots } from "./streak.js";
import { normaliseRewards } from "./rewardsShape.js";

const fresh = () => normaliseRewards(null).streak;
/** Plays on each given day in order; returns the final result. */
function play(days, start = fresh()) {
  let streak = start, last;
  for (const d of days) {
    last = recordDay(streak, d);
    streak = last.streak;
  }
  return last;
}

test("day maths ignores daylight saving", () => {
  assert.equal(daysBetween("2026-03-28", "2026-03-30"), 2); // UK clocks change 29 March
  assert.equal(addDays("2026-10-24", 2), "2026-10-26");
});

test("first ever day starts a streak", () => {
  const r = recordDay(fresh(), "2026-09-01");
  assert.equal(r.outcome, "started");
  assert.equal(r.streak.current, 1);
});

test("playing twice the same day changes nothing", () => {
  const once = play(["2026-09-01"]);
  const again = recordDay(once.streak, "2026-09-01");
  assert.equal(again.outcome, "none");
  assert.equal(again.streak, once.streak);
});

test("consecutive days extend", () => {
  const r = play(["2026-09-01", "2026-09-02", "2026-09-03"]);
  assert.equal(r.outcome, "extended");
  assert.equal(r.streak.current, 3);
});

test("a freeze is earned at 5 days, capped at 2", () => {
  const ten = Array.from({ length: 15 }, (_, i) => addDays("2026-09-01", i));
  assert.equal(play(ten.slice(0, 5)).streak.freezes, 1);
  assert.equal(play(ten.slice(0, 10)).streak.freezes, 2);
  assert.equal(play(ten).streak.freezes, 2);
});

test("a missed day is covered by a freeze; frozen days bridge but don't count", () => {
  const five = Array.from({ length: 5 }, (_, i) => addDays("2026-09-01", i)); // ends 09-05, 1 freeze
  const r = play([...five, "2026-09-07"]);
  assert.equal(r.outcome, "saved");
  assert.equal(r.usedFreezes, 1);
  assert.equal(r.streak.current, 6);
  assert.equal(r.streak.freezes, 0);
  assert.deepEqual(r.streak.frozen, ["2026-09-06"]);
});

test("a gap bigger than the freezes restarts the streak and keeps the freezes", () => {
  const five = Array.from({ length: 5 }, (_, i) => addDays("2026-09-01", i));
  const r = play([...five, "2026-09-09"]); // missed 3 days, holds 1
  assert.equal(r.outcome, "restarted");
  assert.equal(r.streak.current, 1);
  assert.equal(r.streak.freezes, 1);
  assert.equal(r.streak.best, 5);
});

test("a 100-day streak shows 100 (the day lists are capped at 14, the count is not)", () => {
  const days = Array.from({ length: 100 }, (_, i) => addDays("2026-01-01", i));
  const r = play(days);
  assert.equal(r.streak.current, 100);
  assert.equal(r.streak.recent.length, 14);
});

test("a clock that goes backwards changes nothing", () => {
  const r = play(["2026-09-05"]);
  assert.equal(recordDay(r.streak, "2026-09-04").outcome, "none");
});

test("display: alive today, at risk tomorrow, alive through a freeze, broken beyond", () => {
  const five = play(Array.from({ length: 5 }, (_, i) => addDays("2026-09-01", i))).streak; // last 09-05, 1 freeze
  assert.deepEqual(streakStatus(five, "2026-09-05"), { current: 5, alive: true, playedToday: true, atRisk: false });
  assert.deepEqual(streakStatus(five, "2026-09-06"), { current: 5, alive: true, playedToday: false, atRisk: true });
  assert.deepEqual(streakStatus(five, "2026-09-07"), { current: 5, alive: true, playedToday: false, atRisk: true });
  assert.deepEqual(streakStatus(five, "2026-09-08"), { current: 0, alive: false, playedToday: false, atRisk: false });
  assert.equal(streakStatus(fresh(), "2026-09-08").current, 0);
});

test("week dots run Monday to Sunday", () => {
  const s = play(["2026-09-28", "2026-09-29"]).streak; // Mon, Tue
  const dots = weekDots(s, "2026-09-30"); // Wednesday
  assert.equal(dots.length, 7);
  assert.equal(dots[0].day, "2026-09-28");
  assert.deepEqual(dots.slice(0, 3).map((d) => d.state), ["played", "played", "today"]);
  assert.equal(dots[6].state, "empty");
});

test("a last day in the future (clock set ahead once) is pulled back, not a months-long lockout", () => {
  const ahead = play(["2026-09-01", "2026-09-02", "2026-12-25"]); // clock jumped to Christmas
  const back = recordDay(ahead.streak, "2026-09-03"); // clock fixed
  assert.equal(back.outcome, "none");
  assert.equal(back.streak.lastDay, "2026-09-03");
  assert.ok(!back.streak.recent.includes("2026-12-25"));
  assert.ok(back.streak.recent.includes("2026-09-03"));
  // The very next day counts again.
  const next = recordDay(back.streak, "2026-09-04");
  assert.equal(next.outcome, "extended");
});

test("a last day just one ahead (another time zone) is the same day, not a clamp", () => {
  const ahead = play(["2026-09-30", "2026-10-01"]); // the other device is a day ahead
  const here = recordDay(ahead.streak, "2026-09-30");
  assert.equal(here.outcome, "none");
  assert.equal(here.streak, ahead.streak);
  assert.equal(recordDay(here.streak, "2026-10-02").outcome, "extended");
});
