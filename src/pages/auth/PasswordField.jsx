import { useState } from "react";

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
          maxLength={1024}
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

export default PasswordField;
