import { Link } from "react-router";
import { profileColour } from "../../../data/avatars";
import { CHILD_NAME_MAX } from "../../../data/childFields";
import { CURRICULUM_SUBJECTS, getSubjectName } from "../../../data/curriculumRegistry";
import { EXPLORING, birthYearOptions, subjectsForYear } from "../../../data/signupFlow";
import { MIN_PASSWORD_LENGTH, passwordStrength } from "../../../data/passwordStrength";
import { ERROR_MESSAGES, formatWait } from "../../../data/signupCopy";
import PasswordField from "../PasswordField";
import ChoiceCards from "./parts/ChoiceCards";
import CodeInput from "./parts/CodeInput";
import YearWheel from "./parts/YearWheel";
import { AvatarPicker, ColourPicker } from "../ProfilePickers";
import "../ProfileBuilder.css";

const YEAR_OPTIONS = [
  { id: "1", title: "Year 1", blurb: "usually age 5–6" },
  { id: "2", title: "Year 2", blurb: "usually age 6–7" },
  { id: "3", title: "Year 3", blurb: "usually age 7–8" },
  { id: "4", title: "Year 4", blurb: "usually age 8–9" },
  { id: "none", title: "Not sure", blurb: "You can change it later" },
];

export function BirthYearBody({ value, currentYear, onPick, onEnter }) {
  return <YearWheel years={birthYearOptions(currentYear)} value={value} onChange={onPick} onEnter={onEnter} labelledBy="sf-heading" />;
}

export function GateBody({ onRestart }) {
  return (
    <>
      <p className="auth-intro">Ask a grown-up to sign up for you — they can add you to their account in a couple of minutes.</p>
      <button type="button" className="auth-btn auth-btn-quiet" onClick={onRestart}>Start again</button>
    </>
  );
}

export function WhoBody({ draft, onPick }) {
  return (
    <ChoiceCards
      label="Who's going to learn?"
      value={draft.learnFor}
      onChoose={onPick}
      options={[
        { id: "me", icon: "🙋", title: "Me", blurb: "I'm learning myself" },
        { id: "children", icon: "👨‍👩‍👧", title: "My children", blurb: "I'm setting this up for my family" },
      ]}
    />
  );
}

export function CountBody({ draft, onPick }) {
  const count = draft.learners.length;
  return (
    <ChoiceCards
      label="How many children?"
      value={count >= 4 ? "4" : count ? String(count) : null}
      onChoose={(id) => onPick(Number(id))}
      options={[
        { id: "1", icon: "🧒", title: "1" },
        { id: "2", icon: "👧👦", title: "2" },
        { id: "3", icon: "👧👦🧒", title: "3" },
        { id: "4", icon: "🎉", title: "4 or more", blurb: "Add more on the summary" },
      ]}
    />
  );
}

export function NameBody({ learner, error, onName, onSubmit }) {
  return (
    <form className="auth-form" onSubmit={(event) => { event.preventDefault(); onSubmit(); }} noValidate>
      <div className="auth-field">
        <label className="auth-label" htmlFor="sf-name">Nickname</label>
        <input
          id="sf-name"
          className={`auth-input ${error ? "invalid" : ""}`}
          value={learner.name}
          onChange={(event) => onName(event.target.value)}
          autoComplete="off"
          autoCapitalize="words"
          enterKeyHint="next"
          maxLength={CHILD_NAME_MAX * 2}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "sf-name-error" : "sf-name-hint"}
        />
        {error ? (
          <p className="auth-error" id="sf-name-error" role="alert">{error}</p>
        ) : (
          <p className="auth-hint" id="sf-name-hint">No surname needed.</p>
        )}
      </div>
    </form>
  );
}

export function YearBody({ learner, label, onPick }) {
  const value = learner.yearGroup === undefined ? null : learner.yearGroup === null ? "none" : String(learner.yearGroup);
  return <ChoiceCards label={label} value={value} options={YEAR_OPTIONS} onChoose={(id) => onPick(id === "none" ? null : Number(id))} />;
}

export function LookBody({ learner, onAvatar, onColour }) {
  return (
    <div className="pb-pickers">
      <p className="pb-label">Pick a picture</p>
      <AvatarPicker value={learner.avatar} onChange={onAvatar} />
      <p className="pb-label">Pick a colour</p>
      <ColourPicker value={learner.colour} onChange={onColour} />
    </div>
  );
}

export function SubjectsBody({ learner, label, onToggle }) {
  const options = [
    ...subjectsForYear(learner.yearGroup).map((id) => {
      const subject = CURRICULUM_SUBJECTS.find((s) => s.id === id);
      return { id, icon: subject?.icon, title: getSubjectName(id) };
    }),
    { id: EXPLORING, icon: "🧭", title: "Just exploring" },
  ];
  const value = Array.isArray(learner.subjects) ? (learner.subjects.length ? learner.subjects : [EXPLORING]) : [];
  return <ChoiceCards label={label} multiple value={value} options={options} onChoose={onToggle} />;
}

export function SummaryBody({ draft, onEdit, onAdd, canAdd }) {
  return (
    <>
      <ul className="sf-summary">
        {draft.learners.map((learner, index) => (
          <li key={index} className="sf-summary-card">
            <span className="sf-family-face" style={learner.colour ? { "--sf-face": profileColour(learner.colour) } : undefined} aria-hidden="true">
              {learner.avatar}
            </span>
            <span>
              <strong>{learner.name.trim()}</strong>
              <br />
              {learner.yearGroup ? `Year ${learner.yearGroup}` : "Year not set"}
              {" · "}
              {learner.subjects?.length ? learner.subjects.map(getSubjectName).join(", ") : "Just exploring"}
            </span>
            <button type="button" className="auth-btn auth-btn-quiet" onClick={() => onEdit(index)} aria-label={`Edit ${learner.name.trim()}`}>
              Edit
            </button>
          </li>
        ))}
      </ul>
      {canAdd && (
        <button type="button" className="auth-btn auth-btn-quiet sf-add" onClick={onAdd}>+ Add another child</button>
      )}
    </>
  );
}

export function AccountBody({ email, secret, errors, busy, onEmail, onSecret, onSubmit }) {
  const strength = passwordStrength(secret.password);
  const message = (field) => (errors[field] ? ERROR_MESSAGES[errors[field]] ?? errors[field] : null);
  return (
    <form className="auth-form" onSubmit={(event) => { event.preventDefault(); onSubmit(); }} noValidate>
      <div className="auth-field">
        <label className="auth-label" htmlFor="sf-email">Email address</label>
        <input
          id="sf-email"
          maxLength={254}
          className={`auth-input ${errors.email ? "invalid" : ""}`}
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(event) => onEmail(event.target.value)}
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "sf-email-error" : undefined}
        />
        {errors.email && (
          <p className="auth-error" id="sf-email-error" role="alert">
            {message("email")}
            {errors.email === "EMAIL_TAKEN" && <> <Link to="/login">Sign in instead</Link></>}
          </p>
        )}
      </div>
      <PasswordField
        id="sf-password"
        label="Password"
        autoComplete="new-password"
        value={secret.password}
        onChange={(password) => onSecret({ ...secret, password })}
        error={message("password")}
        describedBy={errors.password ? "sf-password-error" : "sf-password-hint"}
        hint={
          <p className={`auth-hint su-strength is-${strength?.level ?? "empty"}`} id="sf-password-hint">
            {strength?.label ?? `At least ${MIN_PASSWORD_LENGTH} characters.`}
          </p>
        }
      />
      <PasswordField
        id="sf-confirm"
        label="Type it again"
        autoComplete="new-password"
        value={secret.confirm}
        onChange={(confirm) => onSecret({ ...secret, confirm })}
        error={message("confirm")}
        describedBy={errors.confirm ? "sf-confirm-error" : undefined}
        hint={null}
      />
      {errors.form && <p className="auth-error" role="alert">{errors.form}</p>}
      <p className="auth-hint">
        {/* A new tab, so the half-finished form is still here afterwards. */}
        <Link to="/privacy" target="_blank" rel="noopener">How we look after your information</Link>
      </p>
      <div className="sf-continue">
        <button className="auth-btn" type="submit" disabled={busy}>{busy ? "Sending…" : "Send my code →"}</button>
      </div>
    </form>
  );
}

export function CodeBody({ code, onCode, onComplete, busy, error, invalid, shakeKey, resendIn, onResend, onChangeEmail, needsNewCode }) {
  const resendBlocked = busy || resendIn > 0;
  return (
    <>
      <CodeInput value={code} onChange={onCode} onComplete={onComplete} disabled={busy} invalid={invalid} shakeKey={shakeKey} />
      {error && <p className="sf-code-msg" role="alert">{error}</p>}
      <div className="auth-actions">
        {code.length === 6 && error && !invalid && !needsNewCode && (
          <button type="button" className="auth-btn" onClick={() => onComplete(code)} disabled={busy}>
            {busy ? "Checking…" : "Try again"}
          </button>
        )}
        {/* aria-disabled, not disabled: a disabled button drops keyboard focus to
            <body> the moment it is pressed. */}
        <button type="button" className={`auth-btn ${needsNewCode ? "" : "auth-btn-quiet"}`} onClick={() => !resendBlocked && onResend()} aria-disabled={resendBlocked}>
          {resendIn > 0 ? `Send a new code in ${formatWait(resendIn)}` : "Send a new code"}
        </button>
        <button type="button" className="auth-btn auth-btn-quiet" onClick={onChangeEmail} disabled={busy}>Change email</button>
      </div>
    </>
  );
}
