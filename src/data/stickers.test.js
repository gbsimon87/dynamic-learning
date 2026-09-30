import test from "node:test";
import assert from "node:assert/strict";
import { countStickers, topicSticker, topicStickers, wonSticker } from "./stickers.js";

const curriculum = [
  {
    id: "number",
    title: "Number",
    topics: [
      { id: "counting", name: "Counting", icon: "🔢", challenges: [{ id: 1 }, { id: 2 }] },
      { id: "place-value", name: "Place Value", icon: "🧱", challenges: [{ id: 1 }, { id: 2 }] },
    ],
  },
];
const built = () => true;
const counting = curriculum[0].topics[0];

test("a sticker is earned once every challenge in the topic is done", () => {
  const progress = { number: { topics: { counting: { completedChallenges: [1, 2] } } } };
  const sticker = topicSticker(progress, "number", counting, built);
  assert.equal(sticker.earned, true);
  assert.equal(sticker.remaining, 0);
  assert.equal(sticker.icon, "🔢");
});

test("a half-done topic has a sticker to go for, with the count left", () => {
  const progress = { number: { topics: { counting: { completedChallenges: [1] } } } };
  const sticker = topicSticker(progress, "number", counting, built);
  assert.equal(sticker.earned, false);
  assert.equal(sticker.available, true);
  assert.equal(sticker.remaining, 1);
});

test("a partly built topic is never earned, even with every built challenge done", () => {
  // The unlock rules call this topic complete; the milestone (and so the
  // sticker) deliberately does not.
  const onlyFirst = (topicId, challengeId) => Number(challengeId) === 1;
  const progress = { number: { topics: { counting: { completedChallenges: [1] } } } };
  const sticker = topicSticker(progress, "number", counting, onlyFirst);
  assert.equal(sticker.earned, false);
  assert.equal(sticker.available, false);
});

test("a duplicate id in storage cannot earn a sticker early", () => {
  const progress = { number: { topics: { counting: { completedChallenges: [1, 1] } } } };
  assert.equal(topicSticker(progress, "number", counting, built).earned, false);
});

test("stickers are grouped by quest and counted", () => {
  const progress = { number: { topics: { counting: { completedChallenges: [1, 2] } } } };
  const groups = topicStickers(curriculum, progress, built);
  assert.deepEqual(groups.map((group) => group.title), ["Number"]);
  assert.deepEqual(groups[0].stickers.map((s) => s.topicId), ["counting", "place-value"]);
  assert.deepEqual(countStickers(groups), { earned: 1, total: 2 });
});

test("empty progress earns nothing and does not throw", () => {
  assert.deepEqual(countStickers(topicStickers(curriculum, {}, built)), { earned: 0, total: 2 });
  assert.deepEqual(topicStickers(undefined, {}, built), []);
});

test("wonSticker needs the topic milestone and an earned sticker", () => {
  assert.equal(wonSticker(["challenge", "topic"], { earned: true }), true);
  assert.equal(wonSticker(["challenge"], { earned: true }), false);
  assert.equal(wonSticker(["challenge", "topic"], { earned: false }), false);
  assert.equal(wonSticker(["challenge", "topic"], null), false);
});
