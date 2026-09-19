import { useState } from "react";
import { AVATARS, PROFILE_COLOURS } from "../../data/avatars";
import "./ProfileBuilder.css";

/**
 * "Make a profile" — name, avatar and colour, with a live preview.
 *
 * Lifted out of Profiles.jsx so the signup wizard and the profile picker share
 * ONE implementation. They ask the same three questions; before this they asked
 * them with two copies of the same markup, which is exactly how a colour picker
 * ends up fixed on one screen and not the other.
 *
 * Only the words differ between callers, so the words are props. The behaviour —
 * validation, the preview, the emoji grid — is identical and lives here.
 *
 * Profile colours are CSS custom-property NAMES, passed through an inline
 * `--pb-swatch` / `--pb-chip-colour` variable rather than a literal, so a
 * profile picked in light mode still reads in dark mode (§9).
 *
 * @param {string}   title       heading above the form
 * @param {string}   nameLabel   the "what's your name?" question
 * @param {string}   saveLabel   text on the confirm button
 * @param {string}   [namePlaceholder]
 * @param {boolean}  saving      disables the button and swaps its label
 * @param {string}   [error]     an error from the CALLER's save attempt
 * @param {Function} onSave      ({name, avatar, colour}) => void
 * @param {Function} [onCancel]  omitted renders no cancel button
 * @param {boolean}  [bare]      true inside a card that is already a panel
 */
function ProfileBuilder({
  title,
  nameLabel,
  saveLabel,
  namePlaceholder = "Type your name",
  saving = false,
  error = "",
  onSave,
  onCancel,
  bare = false,
}) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [colour, setColour] = useState(PROFILE_COLOURS[0]);
  // Kept apart from the caller's `error` so a failed save does not erase a
  // "type a name first" message, or the other way round.
  const [localError, setLocalError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (saving) return;

    const trimmed = name.trim();
    if (!trimmed) {
      setLocalError("Please type a name first! ✏️");
      return;
    }

    setLocalError("");
    onSave({ name: trimmed, avatar, colour });
  };

  const shownError = localError || error;

  return (
    <form
      className={`profile-builder ${bare ? "is-bare" : ""}`}
      onSubmit={handleSubmit}
    >
      <h2 className="pb-title">{title}</h2>

      <label className="pb-label" htmlFor="pb-name">
        {nameLabel}
      </label>
      <input
        id="pb-name"
        className={`pb-name-input ${localError ? "invalid" : ""}`}
        type="text"
        maxLength={20}
        autoComplete="off"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (localError) setLocalError("");
        }}
        placeholder={namePlaceholder}
      />

      <p className="pb-label">Pick a picture</p>
      <div className="pb-avatar-grid">
        {AVATARS.map((emoji) => (
          <button
            key={emoji}
            type="button"
            className={`pb-avatar-option ${avatar === emoji ? "selected" : ""}`}
            onClick={() => setAvatar(emoji)}
            aria-pressed={avatar === emoji}
            aria-label={`Choose the ${emoji} picture`}
          >
            <span aria-hidden="true">{emoji}</span>
          </button>
        ))}
      </div>

      <p className="pb-label">Pick a colour</p>
      <div className="pb-colour-row">
        {PROFILE_COLOURS.map((token) => (
          <button
            key={token}
            type="button"
            className={`pb-colour-option ${colour === token ? "selected" : ""}`}
            style={{ "--pb-swatch": `var(${token})` }}
            onClick={() => setColour(token)}
            aria-pressed={colour === token}
            aria-label={`Choose the ${token
              .replace("--profile-colour-", "")
              .replace(/-/g, " ")} colour`}
          />
        ))}
      </div>

      <div className="pb-preview">
        <span className="pb-preview-label">Your profile:</span>
        <span
          className="pb-preview-chip"
          style={{ "--pb-chip-colour": `var(${colour})` }}
        >
          <span aria-hidden="true">{avatar}</span>
          {name.trim() || "…"}
        </span>
      </div>

      {shownError && (
        <p className="pb-error" role="alert">
          {shownError}
        </p>
      )}

      <div className="pb-actions">
        <button type="submit" className="pb-save-btn" disabled={saving}>
          {saving ? "Saving…" : saveLabel}
        </button>
        {onCancel && (
          <button type="button" className="pb-cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ProfileBuilder;
