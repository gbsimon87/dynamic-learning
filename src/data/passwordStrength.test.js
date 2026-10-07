import test from "node:test";
import assert from "node:assert/strict";
import { MIN_PASSWORD_LENGTH, passwordStrength } from "./passwordStrength.js";

test("password strength levels", () => {
  assert.equal(passwordStrength(""), null);
  assert.equal(passwordStrength("short").level, "short");
  assert.equal(MIN_PASSWORD_LENGTH, 8);
  assert.equal(passwordStrength("abcdefgh").level, "okay");
  assert.equal(passwordStrength("abcdefg1").level, "good");
  assert.equal(passwordStrength("Abcdefghij1!").level, "strong");
});
