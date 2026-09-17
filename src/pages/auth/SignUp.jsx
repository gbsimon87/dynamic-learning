import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/auth-context";
import "./SignUp.css";

const MIN_PASSWORD_LENGTH = 8;

/**
 * Parent-facing account creation. Deliberately plain and adult — the playful
 * emoji register (PROJECT_KNOWLEDGE §8) belongs on the child-facing screens,
 * not on the screen where a grown-up types a password.
 *
 * Passwords are never rendered in plaintext and never logged.
 */
function SignUp() {
  const { signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      next.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      next.email = "That does not look like an email address.";
    }

    if (!password) {
      next.password = "Please choose a password.";
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      next.password = `Passwords need at least ${MIN_PASSWORD_LENGTH} characters.`;
    }

    if (!confirm) {
      next.confirm = "Please re-type your password.";
    } else if (password && confirm !== password) {
      next.confirm = "The two passwords do not match.";
    }

    return next;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    try {
      await signUp({ email: email.trim(), password });
      navigate("/profiles", { replace: true });
    } catch (err) {
      if (err?.message === "EMAIL_TAKEN") {
        setErrors({
          email: "There is already an account using that email address.",
        });
      } else {
        setErrors({
          form: "Sorry, we could not create the account. Please try again.",
        });
      }
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-page">
      <main className="signup-card">
        <h1 className="signup-title">Create a parent account</h1>
        <p className="signup-intro">
          One account holds every child profile in your family. You will add the
          children themselves on the next screen.
        </p>

        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          <div className="signup-field">
            <label className="signup-label" htmlFor="signup-email">
              Email address
            </label>
            <input
              id="signup-email"
              className={`signup-input ${errors.email ? "invalid" : ""}`}
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "signup-email-error" : undefined}
            />
            {errors.email && (
              <p className="signup-error" id="signup-email-error" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div className="signup-field">
            <label className="signup-label" htmlFor="signup-password">
              Password
            </label>
            <input
              id="signup-password"
              className={`signup-input ${errors.password ? "invalid" : ""}`}
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby={
                errors.password ? "signup-password-error" : "signup-password-hint"
              }
            />
            {errors.password ? (
              <p className="signup-error" id="signup-password-error" role="alert">
                {errors.password}
              </p>
            ) : (
              <p className="signup-hint" id="signup-password-hint">
                At least {MIN_PASSWORD_LENGTH} characters.
              </p>
            )}
          </div>

          <div className="signup-field">
            <label className="signup-label" htmlFor="signup-confirm">
              Confirm password
            </label>
            <input
              id="signup-confirm"
              className={`signup-input ${errors.confirm ? "invalid" : ""}`}
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              aria-invalid={errors.confirm ? "true" : "false"}
              aria-describedby={
                errors.confirm ? "signup-confirm-error" : undefined
              }
            />
            {errors.confirm && (
              <p className="signup-error" id="signup-confirm-error" role="alert">
                {errors.confirm}
              </p>
            )}
          </div>

          {errors.form && (
            <p className="signup-error signup-form-error" role="alert">
              {errors.form}
            </p>
          )}

          <button className="signup-submit" type="submit" disabled={submitting}>
            {submitting ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="signup-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </main>
    </div>
  );
}

export default SignUp;
