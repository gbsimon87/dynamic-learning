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
