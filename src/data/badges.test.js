import test from "node:test";
import assert from "node:assert/strict";

import {
  AVATARS_UNLOCKABLE,
  BADGES,
  badgeForAvatar,
  countAtLevel,
  earnBadges,
  emptyRewards,
  getBadge,
  heldBadgeIds,
  unlockedAvatars,
} from "./badges.js";

const AT = { at: "2026-09-19T10:00:00.000Z", year: 3, subject: "math" };

/** Replays a run of completions, so counting badges can be exercised honestly. */
function replay(levelRuns) {
  let rewards = emptyRewards();
  const all = [];
  for (const earned of levelRuns) {
    const out = earnBadges(rewards, earned, AT);
    rewards = out.rewards;
    all.push(out.awarded.map((badge) => badge.id));
  }
  return { rewards, all };
}

test("every badge id is unique", () => {
  const ids = BADGES.map((badge) => badge.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("no two badges unlock the same avatar", () => {
  assert.equal(new Set(AVATARS_UNLOCKABLE).size, AVATARS_UNLOCKABLE.length);
});

test("every unlockable avatar is reachable from exactly one badge", () => {
  for (const emoji of AVATARS_UNLOCKABLE) {
    assert.ok(badgeForAvatar(emoji), `${emoji} must have a badge`);
  }
});

test("finishing the first challenge earns First steps", () => {
  const { awarded, rewards } = earnBadges(emptyRewards(), ["challenge"], AT);
  assert.deepEqual(awarded.map((badge) => badge.id), ["first-steps"]);
  assert.equal(rewards.badges[0].earnedAt, AT.at);
  assert.equal(rewards.badges[0].year, 3);
});

test("no milestones earns nothing and returns the SAME object", () => {
  const before = emptyRewards();
  const out = earnBadges(before, [], AT);
  assert.deepEqual(out.awarded, []);
  // Identity, not just equality: the caller skips the write on this.
  assert.equal(out.rewards, before);
});

test("replaying the SAME completion changes nothing at all", () => {
  // A challenge already complete yields `earned: []` from
  // getCompletionMilestones — that is what a double submit or a refresh looks
  // like here, and it must not touch the tally or trigger a write.
  const first = earnBadges(emptyRewards(), ["challenge"], AT);
  const replayed = earnBadges(first.rewards, [], AT);

  assert.deepEqual(replayed.awarded, []);
  assert.equal(replayed.rewards, first.rewards, "identity — no write");
});

test("a second, different challenge tallies but awards no second badge", () => {
  const first = earnBadges(emptyRewards(), ["challenge"], AT);
  const second = earnBadges(first.rewards, ["challenge"], AT);

  assert.deepEqual(second.awarded, [], "First steps is earned once only");
  assert.equal(second.rewards.badges.length, 1);
  // The tally DID move, and it has to: threshold badges count milestones, not
  // badges, so this document is legitimately new.
  assert.equal(second.rewards.counts.challenge, 2);
});

test("finishing a topic earns both the challenge and topic badges at once", () => {
  const { awarded } = earnBadges(emptyRewards(), ["challenge", "topic"], AT);
  assert.deepEqual(awarded.map((badge) => badge.id), [
    "first-steps",
    "topic-finisher",
  ]);
});

test("Topic master needs five topics, and arrives on the fifth", () => {
  const { all } = replay([
    ["challenge", "topic"],
    ["challenge", "topic"],
    ["challenge", "topic"],
    ["challenge", "topic"],
    ["challenge", "topic"],
  ]);

  assert.deepEqual(all[0], ["first-steps", "topic-finisher"]);
  assert.deepEqual(all[1], []);
  assert.deepEqual(all[2], []);
  assert.deepEqual(all[3], []);
  assert.deepEqual(all[4], ["topic-master"], "fifth topic earns it");
});

test("a topic count is never double-awarded after the threshold", () => {
  const { all } = replay([
    ["topic"], ["topic"], ["topic"], ["topic"], ["topic"], ["topic"], ["topic"],
  ]);
  const masters = all.flat().filter((id) => id === "topic-master");
  assert.equal(masters.length, 1);
});

test("finishing a whole quest and year earns their badges", () => {
  const { awarded } = earnBadges(
    emptyRewards(),
    ["challenge", "topic", "category", "subject"],
    AT
  );
  assert.deepEqual(awarded.map((badge) => badge.id), [
    "first-steps",
    "topic-finisher",
    "quest-champion",
    "year-hero",
  ]);
});

test("held ids are readable back out", () => {
  const { rewards } = earnBadges(emptyRewards(), ["challenge"], AT);
  assert.deepEqual([...heldBadgeIds(rewards)], ["first-steps"]);
  assert.deepEqual([...heldBadgeIds(null)], []);
});

test("a missing rewards document behaves as an empty one", () => {
  const { awarded } = earnBadges(null, ["challenge"], AT);
  assert.deepEqual(awarded.map((badge) => badge.id), ["first-steps"]);
});

test("avatars start as the starters and grow with badges", () => {
  const starters = ["🦊", "🐼"];
  assert.deepEqual(unlockedAvatars(emptyRewards(), starters), starters);

  const { rewards } = earnBadges(emptyRewards(), ["challenge", "topic"], AT);
  const after = unlockedAvatars(rewards, starters);
  assert.ok(after.includes(getBadge("topic-finisher").unlocksAvatar));
  assert.equal(after.length, starters.length + 1);
});

test("an unlockable avatar is not offered before its badge is earned", () => {
  const starters = ["🦊"];
  const locked = getBadge("year-hero").unlocksAvatar;
  assert.equal(unlockedAvatars(emptyRewards(), starters).includes(locked), false);
});


test("the tally counts milestones reached, not badges held", () => {
  const { rewards } = replay([
    ["challenge", "topic"],
    ["challenge"],
    ["challenge", "topic"],
  ]);

  assert.equal(countAtLevel(rewards, "challenge"), 3);
  assert.equal(countAtLevel(rewards, "topic"), 2);
  // Two topics reached, but only ever one topic badge.
  assert.equal(rewards.badges.filter((b) => b.id === "topic-finisher").length, 1);
});

test("an unseen level counts as zero", () => {
  assert.equal(countAtLevel(emptyRewards(), "category"), 0);
  assert.equal(countAtLevel(null, "topic"), 0);
});

test("no unlockable avatar is already a starter", async () => {
  // Otherwise a picture is offered from the start AND claims to be a reward.
  const { AVATARS } = await import("./avatars.js");
  for (const emoji of AVATARS_UNLOCKABLE) {
    assert.equal(
      AVATARS.includes(emoji),
      false,
      `${emoji} is a starter and cannot also be a reward`
    );
  }
});
