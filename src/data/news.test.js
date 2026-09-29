import test from "node:test";
import assert from "node:assert/strict";
import { addNews, clearNews, hasNews, stickerKey } from "./news.js";
import { normaliseRewards } from "./rewardsShape.js";

test("new badges and a sticker become news, without duplicates", () => {
  const key = stickerKey(2, "math", "place-value");
  let r = addNews(normaliseRewards(null), { badges: [{ id: "topic-finisher" }], sticker: key });
  r = addNews(r, { badges: ["topic-finisher"], sticker: key });
  assert.deepEqual(r.news, { badges: ["topic-finisher"], stickers: ["2/math/place-value"] });
  assert.equal(hasNews(r), true);
});

test("recent stickers keep the newest 5, newest last", () => {
  let r = normaliseRewards(null);
  for (let i = 1; i <= 7; i++) r = addNews(r, { sticker: `2/math/t${i}` });
  assert.deepEqual(r.recentStickers, ["2/math/t3", "2/math/t4", "2/math/t5", "2/math/t6", "2/math/t7"]);
});

test("clearing news empties it, and is the same object when there was none", () => {
  const empty = normaliseRewards(null);
  assert.equal(clearNews(empty), empty);
  const cleared = clearNews(addNews(empty, { badges: ["first-steps"] }));
  assert.equal(hasNews(cleared), false);
});
