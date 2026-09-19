import { useContext, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/auth-context";
import {
  ACCOUNT_LEARNER,
  ACCOUNT_PARENT,
  AGE_CHOICES,
} from "../../../shared/accountTypes.js";
import AuthShell from "./AuthShell";
import ProfileBuilder from "./ProfileBuilder";
import "./SignUp.css";

const MIN_PASSWORD_LENGTH = 8;

/* ===== STEPS =====
   One route, a small state machine. The steps a given person sees depend on
   which branch they picked, so they are named rather than numbered — a numeric
   index would have to mean different things in the two branches. */
const STEP = {
  who: "who",
  age: "age",
  gate: "gate",
  details: "details",
  profile: "profile",
};

/** The dots along the top. The gate is a dead end, so it counts as no step. */
const PROGRESS_STEPS = {
  [ACCOUNT_PARENT]: [STEP.who, STEP.details, STEP.profile],
  [ACCOUNT_LEARNER]: [STEP.who, STEP.age, STEP.details, STEP.profile],
};

/* ===== PASSWORD STRENGTH =====
   Shown live as the password is typed, rather than as an error after the form
   is submitted. Deliberately simple and deliberately generous: this is a
   nudge towards a longer password, not a policy. Only `length` actually gates
   submission — see `validateDetails`. */
function passwordStrength(password) {
  if (!password) return null;
  if (password.length < MIN_PASSWORD_LENGTH) {
    return { level: "short", label: `A bit short — ${MIN_PASSWORD_LENGTH}+ characters` };
  }

  const variety =
    (/[a-z]/.test(password) ? 1 : 0) +
    (/[A-Z]/.test(password) ? 1 : 0) +
    (/[0-9]/.test(password) ? 1 : 0) +
    (/[^A-Za-z0-9]/.test(password) ? 1 : 0);

  if (password.length >= 12 && variety >= 3) {
    return { level: "strong", label: "Strong password 💪" };
  }
  if (variety >= 2) return { level: "good", label: "Good password 👍" };
  return { level: "okay", label: "That'll do — a number or symbol would help" };
}

/* ===== PASSWORD FIELD =====
   The show/hide toggle exists because the confirm field is the single most
   common place a signup stalls, and retyping a password you cannot see is how
   that happens. The input is still `type="password"` by default and the value
   is never logged. */
function PasswordField({ id, label, value, onChange, error, describedBy, hint, autoComplete }) {
  const [shown, setShown] = useState(false);

  return (
    <div className="auth-field">
      <label className="auth-label" htmlFor={id}>
        {label}
      </label>
      <div className="auth-input-wrap">
        <input
          id={id}
          className={`auth-input ${error ? "invalid" : ""}`}
          type={shown ? "text" : "password"}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={describedBy}
        />
        <button
          type="button"
          className="auth-peek"
          onClick={() => setShown((was) => !was)}
          aria-pressed={shown}
          aria-label={shown ? "Hide password" : "Show password"}
        >
          <span aria-hidden="true">{shown ? "🙈" : "👁️"}</span>
        </button>
      </div>
      {error ? (
        <p className="auth-error" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : (
        hint
      )}
    </div>
  );
}

/**
 * Account creation, as a short wizard rather than one dense form.
 *
 * Two people arrive here and they are not the same person: a grown-up setting
 * the app up for their children, and an older child setting it up for
 * themselves. The old single screen served only the first, and greeted the
 * second with "Create a parent account" and three password fields.
 *
 * Step 1 asks which they are, and the rest of the flow follows from the answer.
 *
 * WHERE THE ACCOUNT IS CREATED: at the END of the details step, not at the end
 * of the wizard, because the profile step calls `addChild`, which needs an
 * authenticated account. That means the profile step runs with a real account
 * already saved — so a failure there routes to /profiles (exactly the screen for
 * adding a profile) rather than stranding the user.
 *
 * Passwords are never rendered in plaintext by default and never logged.
 */
function SignUp() {
  const { signUp, addChild } = useContext(AuthContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(STEP.who);
  // "forward" / "back" only steers which way the step animation slides.
  const [direction, setDirection] = useState("forward");

  const [accountType, setAccountType] = useState(ACCOUNT_PARENT);
  const [ageBand, setAgeBand] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const isLearner = accountType === ACCOUNT_LEARNER;
  const strength = useMemo(() => passwordStrength(password), [password]);

  const go = (next, way = "forward") => {
    setDirection(way);
    setStep(next);
  };

  /* --- step 1: who --- */
  const pickWho = (type) => {
    setAccountType(type);
    setAgeBand(null);
    setErrors({});
    go(type === ACCOUNT_LEARNER ? STEP.age : STEP.details);
  };

  /* --- step 1b: age --- */
  const pickAge = (choice) => {
    // A gated answer creates NOTHING. No account, no stored age — the child is
    // simply pointed at a grown-up, and the grown-up branch is one tap away.
    if (choice.gated) {
      go(STEP.gate);
      return;
    }
    setAgeBand(choice.id);
    go(STEP.details);
  };

  /* --- step 2: details --- */
  const validateDetails = () => {
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

  const submitDetails = async (event) => {
    event.preventDefault();
    if (submitting) return;

    const found = validateDetails();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    try {
      await signUp({
        email: email.trim(),
        password,
        accountType,
        ageBand: isLearner ? ageBand : null,
      });
      setErrors({});
      go(STEP.profile);
    } catch (err) {
      if (err?.message === "EMAIL_TAKEN") {
        setErrors({
          email: "There is already an account using that email address.",
        });
      } else if (err?.message === "AGE_BAND_TOO_YOUNG") {
        // Should be unreachable — the age step gates it — but if it ever fires,
        // say the kind thing rather than showing a raw code.
        go(STEP.gate);
      } else {
        setErrors({
          form: "Sorry, we could not create the account. Please try again.",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  /* --- step 3: the first profile --- */
  const submitProfile = async (profile) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await addChild(profile);
      // A learner's single profile is auto-selected by the auth context, so they
      // go straight to the curriculum. A grown-up goes to the picker, where they
      // can add a second child or choose who plays first.
      navigate(isLearner ? "/curriculum" : "/profiles", { replace: true });
    } catch {
      // The ACCOUNT exists by now, so this is recoverable rather than fatal:
      // /profiles is the screen for adding a profile. Send them there instead of
      // leaving them on a step that cannot complete.
      navigate("/profiles", { replace: true });
    } finally {
      setSubmitting(false);
    }
  };

  /* --- progress dots --- */
  const trail = PROGRESS_STEPS[accountType];
  const position = trail.indexOf(step);

  return (
    <AuthShell width={step === STEP.who ? "wide" : "narrow"}>
      {position >= 0 && (
        <ol
          className="su-steps"
          aria-label={`Step ${position + 1} of ${trail.length}`}
        >
          {trail.map((name, index) => (
            <li
              key={name}
              className={`su-step ${index <= position ? "is-done" : ""} ${
                index === position ? "is-current" : ""
              }`}
              aria-current={index === position ? "step" : undefined}
            />
          ))}
        </ol>
      )}

      {/* Keyed on the step so React remounts the panel and the entrance
          animation replays; `data-direction` only chooses which way it slides. */}
      <div key={step} className="su-panel" data-direction={direction}>
        {step === STEP.who && (
          <>
            <h1 className="auth-title">Who&apos;s signing up? 🎈</h1>
            <p className="auth-intro">
              Pick the one that sounds like you. You can change your mind on the
              next screen.
            </p>

            <div className="su-choices">
              <button
                type="button"
                className="su-choice"
                onClick={() => pickWho(ACCOUNT_PARENT)}
                data-reveal
              >
                <span className="su-choice-icon" aria-hidden="true">
                  👨‍👩‍👧
                </span>
                <span className="su-choice-title">I&apos;m a grown-up</span>
                <span className="su-choice-blurb">
                  Set up profiles for my children and keep an eye on how they
                  are getting on.
                </span>
                <span className="su-choice-go" aria-hidden="true">
                  Let&apos;s go →
                </span>
              </button>

              <button
                type="button"
                className="su-choice"
                onClick={() => pickWho(ACCOUNT_LEARNER)}
                data-reveal
              >
                <span className="su-choice-icon" aria-hidden="true">
                  🚀
                </span>
                <span className="su-choice-title">I&apos;m learning myself</span>
                <span className="su-choice-blurb">
                  Make my own account, build my profile and start my
                  curriculum.
                </span>
                <span className="su-choice-go" aria-hidden="true">
                  Let&apos;s go →
                </span>
              </button>
            </div>
          </>
        )}

        {step === STEP.age && (
          <>
            <h1 className="auth-title">How old are you? 🎂</h1>
            <p className="auth-intro">
              We ask so we know whether to get a grown-up involved. Tap your
              answer.
            </p>

            <div className="su-ages">
              {AGE_CHOICES.map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  className="su-age"
                  onClick={() => pickAge(choice)}
                  data-reveal
                >
                  {choice.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="auth-btn auth-btn-quiet su-back"
              onClick={() => go(STEP.who, "back")}
            >
              ← Back
            </button>
          </>
        )}

        {step === STEP.gate && (
          <>
            <h1 className="auth-title">Let&apos;s get a grown-up! 👋</h1>
            <p className="auth-intro">
              If you&apos;re under 13, a grown-up needs to set the account up
              with you. Show them this screen — it only takes a minute, and then
              you can make your profile together.
            </p>

            <div className="auth-actions">
              <button
                type="button"
                className="auth-btn"
                onClick={() => pickWho(ACCOUNT_PARENT)}
              >
                A grown-up is here →
              </button>
              <button
                type="button"
                className="auth-btn auth-btn-quiet"
                onClick={() => go(STEP.age, "back")}
              >
                ← Back
              </button>
            </div>

            <p className="auth-switch">
              You can still play every <Link to="/skills">Skills activity</Link>{" "}
              without an account.
            </p>
          </>
        )}

        {step === STEP.details && (
          <>
            <h1 className="auth-title">
              {isLearner ? "Make your account 🔐" : "Create your account 🔐"}
            </h1>
            <p className="auth-intro">
              {isLearner
                ? "You'll use this to sign in and pick up where you left off."
                : "One account holds every child profile in your family."}
            </p>

            <form className="auth-form" onSubmit={submitDetails} noValidate>
              <div className="auth-field">
                <label className="auth-label" htmlFor="signup-email">
                  Email address
                </label>
                <input
                  id="signup-email"
                  className={`auth-input ${errors.email ? "invalid" : ""}`}
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={
                    errors.email ? "signup-email-error" : undefined
                  }
                />
                {errors.email && (
                  <p className="auth-error" id="signup-email-error" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <PasswordField
                id="signup-password"
                label="Password"
                autoComplete="new-password"
                value={password}
                onChange={setPassword}
                error={errors.password}
                describedBy={
                  errors.password ? "signup-password-error" : "signup-password-hint"
                }
                hint={
                  <p
                    className={`auth-hint su-strength is-${strength?.level ?? "empty"}`}
                    id="signup-password-hint"
                  >
                    {strength?.label ?? `At least ${MIN_PASSWORD_LENGTH} characters.`}
                  </p>
                }
              />

              <PasswordField
                id="signup-confirm"
                label="Confirm password"
                autoComplete="new-password"
                value={confirm}
                onChange={setConfirm}
                error={errors.confirm}
                describedBy={errors.confirm ? "signup-confirm-error" : undefined}
                hint={null}
              />

              {errors.form && (
                <p className="auth-error" role="alert">
                  {errors.form}
                </p>
              )}

              <div className="auth-actions">
                <button className="auth-btn" type="submit" disabled={submitting}>
                  {submitting ? "Creating account…" : "Next →"}
                </button>
                <button
                  type="button"
                  className="auth-btn auth-btn-quiet"
                  onClick={() => go(isLearner ? STEP.age : STEP.who, "back")}
                  disabled={submitting}
                >
                  ← Back
                </button>
              </div>
            </form>

            <p className="auth-switch">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </>
        )}

        {/* No way back from here: the account is already saved, so "back" would
            offer to edit credentials that exist. */}
        {step === STEP.profile && (
          <>
            <h1 className="auth-title">
              {isLearner ? "Make your profile ✨" : "Add your first child ✨"}
            </h1>
            <p className="auth-intro">
              {isLearner
                ? "This is the face you'll tap to start learning."
                : "You can add more children any time from the profiles screen."}
            </p>

            <ProfileBuilder
              title={isLearner ? "That's me!" : "Your child"}
              nameLabel={isLearner ? "What's your name?" : "What's their name?"}
              namePlaceholder={isLearner ? "Type your name" : "Type their name"}
              yearLabel={
                isLearner
                  ? "Which school year are you in?"
                  : "Which school year are they in?"
              }
              saveLabel="🎉 All done!"
              saving={submitting}
              onSave={submitProfile}
              bare
            />
          </>
        )}
      </div>
    </AuthShell>
  );
}

export default SignUp;
