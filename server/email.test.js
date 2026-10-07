import test from "node:test";
import assert from "node:assert/strict";
import { createMailer, emailMode, signupCodeEmail } from "./email.js";

test("mode needs both settings to send, and is never 'log' in production", () => {
  assert.equal(emailMode({ RESEND_API_KEY: "k", EMAIL_FROM: "f" }), "send");
  assert.equal(emailMode({ RESEND_API_KEY: "k", EMAIL_FROM: "f", NODE_ENV: "production" }), "send");
  assert.equal(emailMode({}), "log");
  assert.equal(emailMode({ NODE_ENV: "production" }), "off");
  assert.equal(emailMode({ RESEND_API_KEY: "k" }), "off");
  assert.equal(emailMode({ EMAIL_FROM: "f" }), "off");
});

test("the email carries the code in the subject, text and html", () => {
  const { subject, text, html } = signupCodeEmail("482913");
  assert.equal(subject, "Your Dynamic Learning code: 482913");
  assert.match(text, /482913/);
  assert.match(text, /10 minutes/);
  assert.match(html, /482913/);
  assert.equal(/<img/i.test(html), false, "no images to host or block");
});

test("send mode posts to Resend", async () => {
  const calls = [];
  const mailer = createMailer({
    mode: "send", apiKey: "re_123", from: "Bix <hello@example.com>",
    fetch: async (url, init) => { calls.push({ url, init }); return { ok: true, status: 200 }; },
  });
  assert.equal(mailer.verification, "on");
  await mailer.sendSignupCode("a@b.co", "482913");
  assert.equal(calls[0].url, "https://api.resend.com/emails");
  assert.equal(calls[0].init.method, "POST");
  assert.equal(calls[0].init.headers.Authorization, "Bearer re_123");
  const body = JSON.parse(calls[0].init.body);
  assert.deepEqual(body.to, ["a@b.co"]);
  assert.equal(body.from, "Bix <hello@example.com>");
  assert.match(body.subject, /482913/);
});

test("a Resend error is thrown, not swallowed", async () => {
  const mailer = createMailer({ mode: "send", apiKey: "k", from: "f", fetch: async () => ({ ok: false, status: 403 }) });
  await assert.rejects(mailer.sendSignupCode("a@b.co", "482913"), /EMAIL_SEND_FAILED:403/);
});

test("log mode prints a masked address and the code", async () => {
  const lines = [];
  const mailer = createMailer({ mode: "log", log: (line) => lines.push(line) });
  assert.equal(mailer.verification, "on");
  await mailer.sendSignupCode("maya@gmail.com", "482913");
  assert.deepEqual(lines, ["[email] signup code for m…@gmail.com: 482913"]);
});

test("off mode turns verification off and never sends", async () => {
  const mailer = createMailer({ mode: "off" });
  assert.equal(mailer.verification, "off");
  await assert.rejects(mailer.sendSignupCode("a@b.co", "1"), /EMAIL_DISABLED/);
});
