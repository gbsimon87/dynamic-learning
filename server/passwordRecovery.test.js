import test from "node:test";
import assert from "node:assert/strict";
import { hashResetToken, isResetToken, recoveryUrl, resetToken } from "./passwordRecovery.js";

test("recovery tokens are random, hashed and never put in query strings", () => {
  const token = resetToken();
  assert.equal(isResetToken(token), true);
  assert.notEqual(token, resetToken());
  assert.notEqual(hashResetToken(token), token);
  const url = new URL(recoveryUrl(token, { NODE_ENV: "production", PUBLIC_APP_URL: "https://learn.example.com/old?ignored=yes" }));
  assert.equal(url.pathname, "/reset-password");
  assert.equal(url.search, "");
  assert.equal(url.hash, `#token=${token}`);
  assert.equal(isResetToken("wrong"), false);
});
test("production requires a configured HTTPS origin", () => {
  for (const PUBLIC_APP_URL of [undefined, "http://example.com", "https://user:password@example.com", "javascript:bad"]) {
    assert.throws(() => recoveryUrl(resetToken(), { NODE_ENV: "production", PUBLIC_APP_URL }));
  }
});
