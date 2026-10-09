/**
 * Outgoing signup codes and password-reset links share the same transport.
 *
 * Modes (PROJECT_KNOWLEDGE §6 item 17):
 *   send — RESEND_API_KEY and EMAIL_FROM both set: Resend's HTTP API.
 *   log  — neither set, not production: the code is printed to the terminal.
 *   off  — anything else: verification is skipped and accounts are stored
 *          with emailVerified: false.
 */
import { maskEmail } from "../shared/emailAddress.js";

const RESEND_URL = "https://api.resend.com/emails";

export function emailMode(env) {
  const hasKey = Boolean(env.RESEND_API_KEY);
  const hasFrom = Boolean(env.EMAIL_FROM);
  if (hasKey && hasFrom) return "send";
  if (!hasKey && !hasFrom && env.NODE_ENV !== "production") return "log";
  return "off";
}

export function signupCodeEmail(code) {
  const subject = `Your Dynamic Learning code: ${code}`;
  const text = [
    "Bix says hi! 👋",
    "",
    `Here's your code: ${code}`,
    "",
    "It works for 10 minutes.",
    "If you didn't ask for this, you can ignore this email.",
  ].join("\n");
  const html = `<!doctype html><html><body style="margin:0;padding:24px;font-family:system-ui,sans-serif;background:#F6E8EA;color:#22181C">
<div style="max-width:420px;margin:0 auto;background:#ffffff;border-radius:16px;padding:28px;text-align:center">
<p style="font-size:18px;margin:0 0 8px">Bix says hi! 👋</p>
<p style="margin:0 0 16px">Here's your code</p>
<p style="font-size:36px;font-weight:700;letter-spacing:8px;margin:0 0 16px">${code}</p>
<p style="margin:0 0 8px">It works for 10 minutes.</p>
<p style="font-size:13px;color:#5c5157;margin:0">If you didn't ask for this, you can ignore this email.</p>
</div></body></html>`;
  return { subject, text, html };
}

export function passwordResetEmail(url) {
  const safeUrl = url.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  return {
    subject: "Reset your Dynamic Learning password",
    text: `Reset your password: ${url}\n\nThis link works once, for 30 minutes. Your profiles and learning will stay saved. If you did not ask for this, ignore this email.`,
    html: `<p><a href="${safeUrl}">Reset your password</a></p><p>This link works once, for 30 minutes. Your profiles and learning will stay saved.</p><p>If you did not ask for this, ignore this email.</p>`,
  };
}

export function createMailer({ mode, apiKey, from, fetch = globalThis.fetch, log = console.log, timeoutMs = 10_000 }) {
  async function send(email, message) {
    if (mode !== "send") throw new Error("EMAIL_DISABLED");
    const response = await fetch(RESEND_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [email], ...message }),
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!response.ok) throw new Error(`EMAIL_SEND_FAILED:${response.status}`);
  }
  return {
    verification: mode === "off" ? "off" : "on",
    async sendPasswordReset(email, url) {
      if (mode === "log") { log(`[email] password reset for ${maskEmail(email)}: ${url}`); return; }
      await send(email, passwordResetEmail(url));
    },
    async sendSignupCode(email, code) {
      if (mode === "log") {
        log(`[email] signup code for ${maskEmail(email)}: ${code}`);
        return;
      }
      await send(email, signupCodeEmail(code));
    },
  };
}

export function createMailerFromEnv(env = process.env) {
  const mode = emailMode(env);
  if (mode === "off") {
    console.warn("[email] email verification is OFF; set both RESEND_API_KEY and EMAIL_FROM to enable it.");
  }
  return createMailer({ mode, apiKey: env.RESEND_API_KEY, from: env.EMAIL_FROM });
}
