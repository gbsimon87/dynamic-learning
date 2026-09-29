import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { CUES } from "./cues.js";
import { TIERS, buildCelebrationSteps } from "../../../data/celebrationSteps.js";
import { getBadge } from "../../../data/badges.js";

const PUBLIC = fileURLToPath(new URL("../../../../public", import.meta.url));

// A missing file would never show up as an error: the player quietly falls
// back to the synthesised tone. So the files are checked here instead.
test("every cue's sound file exists in public/", () => {
  for (const [name, cue] of Object.entries(CUES)) {
    if (!cue.src) continue;
    assert.ok(existsSync(PUBLIC + cue.src), `${name}: ${cue.src} is missing`);
  }
});

test("every cue has a synth fallback", () => {
  for (const [name, cue] of Object.entries(CUES)) {
    assert.equal(typeof cue.synth, "function", `${name} has no fallback`);
  }
});

test("every cue the celebration and the challenge shell ask for exists", () => {
  const steps = buildCelebrationSteps({
    level: "year",
    earned: ["challenge", "topic", "category", "subject", "year"],
    badges: [getBadge("topic-finisher")],
    sticker: { earned: true },
    yearBefore: { percent: 0 },
    yearAfter: { percent: 100 },
    levelUp: 6,
    streak: { outcome: "extended", current: 2, usedFreezes: 0, dots: [] },
  });
  const asked = [
    ...Object.values(TIERS).map((tier) => tier.cue),
    ...steps.map((step) => step.cue).filter(Boolean),
    // Played directly by ChallengeShell and ProgressStep.
    "correct", "correctLast", "combo", "wrong", "progress",
  ];
  for (const name of asked) assert.ok(CUES[name], `no cue named "${name}"`);
});
