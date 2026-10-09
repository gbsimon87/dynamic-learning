import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { store } from "../../data/store";
import { isEmailShaped } from "../../../shared/emailAddress.js";
import AuthShell from "./AuthShell";
import PasswordField from "./PasswordField";

const messages = {
  RECOVERY_NOT_SUPPORTED: "This browser-only account cannot receive recovery emails. Its learning stays saved on this device.",
  RECOVERY_UNAVAILABLE: "Password recovery is unavailable just now. Please try again later.",
  TOO_MANY_ATTEMPTS: "Too many requests. Please wait before trying again.",
  RESET_INVALID: "This link has expired or has already been used. Please request a new link.",
  PASSWORD_INVALID: "Choose a password with at least 8 characters.",
};

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const submitting = useRef(false);
  async function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    if (!isEmailShaped(email)) { setError("Enter a valid email address."); return; }
    submitting.current = true;
    setBusy(true);
    setError("");
    try { await store.requestPasswordReset(email); setAccepted(true); }
    catch (err) { setError(messages[err.message] ?? "We could not request a link. Check your connection and try again."); }
    finally { submitting.current = false; setBusy(false); }
  }
  return <AuthShell>
    <h1 className="auth-title">Forgot your password?</h1>
    <p className="auth-intro">Get back to your account. Your profiles and learning will stay saved.</p>
    {accepted ? <p role="status">If an account uses that email, a reset link will arrive shortly. Check your spam folder too. The link works once, for 30 minutes. It also works for accounts whose email was never verified.</p> :
      <form className="auth-form" onSubmit={submit} noValidate>
        <div className="auth-field"><label className="auth-label" htmlFor="recovery-email">Email address</label>
          <input className="auth-input" id="recovery-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} /></div>
        {error && <p className="auth-error" role="alert">{error}</p>}
        <button className="auth-btn" disabled={busy}>{busy ? "Requesting…" : "Send reset link"}</button>
      </form>}
    <p className="auth-switch"><Link to="/login">Back to sign in</Link></p>
  </AuthShell>;
}

export function ResetPassword() {
  const [token] = useState(() => {
    const value = new URLSearchParams(window.location.hash.slice(1)).get("token") ?? "";
    // Keep the secret in memory, outside history, navigation and analytics.
    return value;
  });
  useEffect(() => { window.history.replaceState(window.history.state, "", window.location.pathname); }, []);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const submitting = useRef(false);
  async function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    if (password.length < 8) { setError(messages.PASSWORD_INVALID); return; }
    if (password !== confirm) { setError("The passwords do not match."); return; }
    submitting.current = true;
    setBusy(true);
    setError("");
    try { await store.resetPassword({ token, password }); setPassword(""); setConfirm(""); setDone(true); }
    catch (err) { setError(messages[err.message] ?? "We could not reset your password. Check your connection and try again."); }
    finally { submitting.current = false; setBusy(false); }
  }
  return <AuthShell>
    <h1 className="auth-title">{done ? "Password saved" : "Choose a new password"}</h1>
    {done ? <><p role="status">Your profiles and learning are still saved. Sign in with your new password. Other devices will need to sign in again.</p><p className="auth-switch"><Link to="/login">Sign in</Link></p></> :
      !/^[a-f0-9]{64}$/.test(token) ? <p className="auth-error" role="alert">{messages.RESET_INVALID}</p> :
        <form className="auth-form" onSubmit={submit} noValidate>
          <p className="auth-intro">Use at least 8 characters.</p>
          <PasswordField id="reset-password" label="New password" value={password} onChange={setPassword} autoComplete="new-password" />
          <PasswordField id="reset-confirm" label="Repeat new password" value={confirm} onChange={setConfirm} autoComplete="new-password" />
          {error && <p className="auth-error" role="alert">{error}</p>}
          <button className="auth-btn" disabled={busy}>{busy ? "Saving…" : "Save new password"}</button>
        </form>}
    {!done && <p className="auth-switch"><Link to="/forgot-password">Request a new link</Link></p>}
  </AuthShell>;
}
