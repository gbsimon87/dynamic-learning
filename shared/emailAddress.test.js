import test from "node:test";
import assert from "node:assert/strict";
import { isEmailShaped, maskEmail, normaliseEmail } from "./emailAddress.js";

test("normaliseEmail trims and lowercases, and survives junk", () => {
  assert.equal(normaliseEmail("  Maya.Parent@Example.COM "), "maya.parent@example.com");
  assert.equal(normaliseEmail(null), "");
  assert.equal(normaliseEmail(undefined), "");
});

test("isEmailShaped is a shape check, not a deliverability check", () => {
  for (const ok of ["a@b.co", " A@B.CO ", "first.last+tag@sub.example.org"]) assert.ok(isEmailShaped(ok), ok);
  for (const bad of ["", "a@b", "a b@c.de", "@b.co", "a@", null]) assert.equal(isEmailShaped(bad), false, String(bad));
});

test("maskEmail keeps the first letter and the domain", () => {
  assert.equal(maskEmail("Maya.Smith@Gmail.com"), "m…@gmail.com");
  assert.equal(maskEmail("x"), "x");
});

test("email rejects coerced objects, arrays, markup and control characters", () => {
  for (const value of [{ $ne: null }, ["a@b.co"], { toString: () => "a@b.co" }, 123]) {
    assert.equal(normaliseEmail(value), "");
    assert.equal(isEmailShaped(value), false);
  }
  for (const value of ['<script>@example.com', 'a@<img>.com', 'a"b@example.com', 'a\u0000@example.com']) {
    assert.equal(isEmailShaped(value), false);
  }
  assert.equal(isEmailShaped("o'brien+family@example.com"), true);
});

test("email validation bounds hostile input and rejects empty domain labels", () => {
  const hostile = "a@" + ".".repeat(50_000) + "@";
  const start = performance.now();
  assert.equal(isEmailShaped(hostile), false);
  assert.ok(performance.now() - start < 50, "oversized input must return promptly");
  assert.equal(isEmailShaped("a".repeat(249) + "@b.co"), true);
  assert.equal(isEmailShaped("a".repeat(250) + "@b.co"), false);
  for (const bad of ["a@.b.co", "a@b..co", "a@b.co.", "a@" + ".".repeat(240) + "@"]) {
    assert.equal(isEmailShaped(bad), false);
  }
});
