import test from "node:test";
import assert from "node:assert/strict";
import { MAX_SENDS, RESEND_MS, SEND_WINDOW_MS, codeMatches, generateCode, hashCode, sendDecision } from "./signupCodes.js";

test("codes are six digits, zero-padded", () => {
  assert.equal(generateCode(() => 42), "000042");
  assert.match(generateCode(), /^\d{6}$/);
});

test("hashes depend on the email, the code and the secret", () => {
  const h = hashCode("a@b.co", "123456", "s");
  assert.notEqual(h, hashCode("c@d.co", "123456", "s"));
  assert.notEqual(h, hashCode("a@b.co", "123457", "s"));
  assert.notEqual(h, hashCode("a@b.co", "123456", "t"));
  assert.equal(h.includes("123456"), false);
});

test("codeMatches is strict about shape and value", () => {
  const h = hashCode("a@b.co", "123456", "s");
  assert.equal(codeMatches(h, "a@b.co", "123456", "s"), true);
  assert.equal(codeMatches(h, "a@b.co", "654321", "s"), false);
  for (const junk of ["", "12345", "1234567", "12345a", null, undefined]) assert.equal(codeMatches(h, "a@b.co", junk, "s"), false);
  assert.equal(codeMatches(null, "a@b.co", "123456", "s"), false);
});

test("send decisions: first, too soon, capped, window over", () => {
  const t = 1_000_000;
  assert.deepEqual(sendDecision(null, t), { ok: true, sendCount: 1, sendWindowStart: t });
  const sent = { lastSentAt: t, sendWindowStart: t, sendCount: 1 };
  assert.deepEqual(sendDecision(sent, t + 5_000), { ok: false, error: "CODE_RECENTLY_SENT", retryAt: t + RESEND_MS });
  assert.deepEqual(sendDecision(sent, t + RESEND_MS), { ok: true, sendCount: 2, sendWindowStart: t });
  const capped = { lastSentAt: t + 200_000, sendWindowStart: t, sendCount: MAX_SENDS };
  assert.deepEqual(sendDecision(capped, t + 300_000), { ok: false, error: "TOO_MANY_CODES", retryAt: t + SEND_WINDOW_MS });
  assert.deepEqual(sendDecision(capped, t + SEND_WINDOW_MS), { ok: true, sendCount: 1, sendWindowStart: t + SEND_WINDOW_MS });
});
