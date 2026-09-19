import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/auth-context";
import { clearLastAccount, readLastAccount } from "../../data/lastAccount";
import AuthShell from "./AuthShell";
import "./Login.css";

/**
 * Sign in.
 *
 * WHY THERE ARE TWO FACES TO THIS SCREEN
 * The session cookie lasts 30 days, so a returning family is usually still
 * signed in and never arrives here at all. When they do, the session is
 * genuinely gone and a password is genuinely required — tapping a child's face
 * cannot and must not skip that.
 *
 * What it CAN do is stop asking for things this browser already knows. If
 * `dl.lastAccount` is present (display data only — see lastAccount.js; never
 * credentials) the screen greets them by their profiles, pre-fills the email and
 * asks for the password alone: one field instead of two, with the faces the
 * child recognises still on screen. A fresh browser gets the plain two-field
 * form. "Not you?" drops back to it and forgets the hint.
 *
 * Passwords are never rendered in plaintext by default and never logged.
 */
function Login() {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // A guard that bounced the user here can stash where they were headed.
  const redirectTo = location.state?.from ?? "/profiles";

  // Read once on mount: storage is not reactive, and re-reading on every render
  // would fight the "Not you?" reset below.
  const [remembered, setRemembered] = useState(() => readLastAccount());

  const [email, setEmail] = useState(remembered?.email ?? "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Straight to the password: the email is already filled in, and asking a
  // grown-up to tab past it is the small friction this screen exists to remove.
  useEffect(() => {
    if (!remembered) return;
    document.getElementById("login-password")?.focus();
  }, [remembered]);

  const forgetAccount = () => {
    clearLastAccount();
    setRemembered(null);
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    if (!email.trim() || !password) {
      setError("Please enter your email address and password.");
      return;
    }

    setError("");
    setSubmitting(true);
    try {
      await signIn({ email: email.trim(), password });
      navigate(redirectTo, { replace: true });
    } catch {
      // Deliberately does not say which half was wrong, and never echoes input.
      setError("We could not sign you in. Check your email and password.");
      setSubmitting(false);
    }
  };

  const greeting = "Welcome back!";

  return (
    <AuthShell>
      {remembered ? (
        <>
          {/* Letter by letter, the same treatment the homepage gives its
              greeting — it is the one moment on this screen aimed at the child
              rather than the grown-up typing. */}
          <h1 className="auth-title lg-greeting">
            {Array.from(greeting).map((letter, index) => (
              <span key={index} style={{ "--letter-index": index }}>
                {letter === " " ? " " : letter}
              </span>
            ))}
          </h1>
          <p className="auth-intro">
            {remembered.profiles.length > 0
              ? "Pop the password in and carry on where you left off."
              : "Enter your password to carry on."}
          </p>

          {remembered.profiles.length > 0 && (
            <ul className="lg-faces" aria-label="Profiles on this account">
              {remembered.profiles.map((profile, index) => (
                <li
                  key={profile.id}
                  className="lg-face"
                  style={{
                    // A token NAME, never a literal, so it repaints in dark
                    // mode (§9). `--face-index` only staggers the entrance.
                    "--face-colour": `var(${profile.colour})`,
                    "--face-index": index,
                  }}
                >
                  <span className="lg-face-avatar" aria-hidden="true">
                    {profile.avatar}
                  </span>
                  <span className="lg-face-name">{profile.name}</span>
                </li>
              ))}
            </ul>
          )}

          <p className="lg-as">
            Signing in as <strong>{remembered.email}</strong>
          </p>
        </>
      ) : (
        <>
          <h1 className="auth-title">Sign in</h1>
          <p className="auth-intro">
            Sign in to pick a profile and keep your progress saved.
          </p>
        </>
      )}

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {/* Hidden rather than removed when remembered: password managers and
            autofill need the email field in the form, and a wrong remembered
            address would otherwise be uneditable without "Not you?". */}
        <div className={`auth-field ${remembered ? "lg-hidden-field" : ""}`}>
          <label className="auth-label" htmlFor="login-email">
            Email address
          </label>
          <input
            id="login-email"
            className={`auth-input ${error ? "invalid" : ""}`}
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            tabIndex={remembered ? -1 : undefined}
          />
        </div>

        <div className="auth-field">
          <label className="auth-label" htmlFor="login-password">
            Password
          </label>
          <div className="auth-input-wrap">
            <input
              id="login-password"
              className={`auth-input ${error ? "invalid" : ""}`}
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="auth-peek"
              onClick={() => setShowPassword((was) => !was)}
              aria-pressed={showPassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <span aria-hidden="true">{showPassword ? "🙈" : "👁️"}</span>
            </button>
          </div>
        </div>

        {error && (
          <p className="auth-error" role="alert">
            {error}
          </p>
        )}

        <button className="auth-btn" type="submit" disabled={submitting}>
          {submitting ? "Signing in…" : "Sign in →"}
        </button>
      </form>

      {remembered && (
        <button type="button" className="lg-not-you" onClick={forgetAccount}>
          Not you? Use a different account
        </button>
      )}

      <p className="auth-switch">
        New here? <Link to="/signup">Create an account</Link>
      </p>
    </AuthShell>
  );
}

export default Login;
