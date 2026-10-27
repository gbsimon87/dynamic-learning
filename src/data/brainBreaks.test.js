import test from "node:test";
import assert from "node:assert/strict";
import { ACTIVITIES, DEFAULT_BREAK_MINUTES, breakDue, countsTowardsBreak, nextActivity, parseBreakSetting } from "./brainBreaks.js";
import { findUsSpellings } from "./english/textChecks.js";

test("the setting parses minutes, 'off', and falls back to the default", () => {
  assert.equal(parseBreakSetting("20"), 20);
  assert.equal(parseBreakSetting("off"), null);
  assert.equal(parseBreakSetting(null), DEFAULT_BREAK_MINUTES);
  assert.equal(parseBreakSetting("7"), DEFAULT_BREAK_MINUTES);
});

test("a break is due only after the interval, and never when off", () => {
  assert.equal(breakDue(14 * 60_000, 15), false);
  assert.equal(breakDue(15 * 60_000, 15), true);
  assert.equal(breakDue(99 * 60_000, null), false);
});

test("the next activity is never the one just done", () => {
  for (const activity of ACTIVITIES) {
    for (let i = 0; i < 20; i += 1) assert.notEqual(nextActivity(activity.id).id, activity.id);
  }
});

test("activities are unique, short and British English", () => {
  assert.equal(new Set(ACTIVITIES.map((a) => a.id)).size, ACTIVITIES.length);
  for (const activity of ACTIVITIES) {
    assert.ok(activity.text.length <= 70, activity.text);
    assert.deepEqual(findUsSpellings(activity.text), []);
  }
});

test("every activity uses a move BrainBreak.css animates", () => {
  for (const activity of ACTIVITIES) {
    assert.ok(["jump", "stretch", "spin", "sway"].includes(activity.move), activity.id);
  }
});

test("only play pages count towards a break", () => {
  for (const path of ["/", "/skills", "/daily-puzzle", "/curriculum/year/3/math", "/trophies", "/skills/solar-system"]) {
    assert.equal(countsTowardsBreak(path), true, path);
  }
  for (const path of ["/parent", "/parent/trophies/abc", "/login", "/signup", "/profiles", "/hello", "/privacy"]) {
    assert.equal(countsTowardsBreak(path), false, path);
  }
  assert.equal(countsTowardsBreak("/parenting-tips"), true, "a prefix of a word is not a match");
});
