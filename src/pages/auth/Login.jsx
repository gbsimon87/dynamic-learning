import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/auth-context";
import "./Login.css";

/**
 * Parent-facing sign in. Plain adult UI — no emoji, no games.
 * Passwords are never rendered in plaintext and never logged.
 */
function Login() {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // A guard that bounced the parent here can stash where they were headed.
  const redirectTo = location.state?.from ?? "/profiles";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  return (
    <div className="login-page">
      <main className="login-card">
        <h1 className="login-title">Sign in</h1>
        <p className="login-intro">
          Sign in to pick a child profile and keep their progress saved.
        </p>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="login-field">
            <label className="login-label" htmlFor="login-email">
              Email address
            </label>
            <input
              id="login-email"
              className={`login-input ${error ? "invalid" : ""}`}
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              className={`login-input ${error ? "invalid" : ""}`}
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          <button className="login-submit" type="submit" disabled={submitting}>
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="login-switch">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </main>
    </div>
  );
}

export default Login;
