/**
 * Outgoing email. One job today: the sign-up code. Password reset (#3) will
 * add a second message here.
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

export function createMailer({ mode, apiKey, from, fetch = globalThis.fetch, log = console.log }) {
  return {
    verification: mode === "off" ? "off" : "on",
    async sendSignupCode(email, code) {
      if (mode === "log") {
        log(`[email] signup code for ${maskEmail(email)}: ${code}`);
        return;
      }
      if (mode !== "send") throw new Error("EMAIL_DISABLED");
      const message = signupCodeEmail(code);
      const response = await fetch(RESEND_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from, to: [email], ...message }),
      });
      if (!response.ok) throw new Error(`EMAIL_SEND_FAILED:${response.status}`);
    },
  };
}

export function createMailerFromEnv(env = process.env) {
  const mode = emailMode(env);
  if (mode === "off" && (env.RESEND_API_KEY || env.EMAIL_FROM)) {
    console.warn("[email] RESEND_API_KEY and EMAIL_FROM must both be set — email verification is OFF.");
  }
  return createMailer({ mode, apiKey: env.RESEND_API_KEY, from: env.EMAIL_FROM });
}
