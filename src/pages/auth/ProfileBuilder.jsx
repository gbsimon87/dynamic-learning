import { useState } from "react";
import { AVATARS, PROFILE_COLOURS } from "../../data/avatars";
import { CHILD_YEAR_GROUPS } from "../../data/childFields";
import { AVATARS_UNLOCKABLE, badgeForAvatar } from "../../data/badges";
import { isYearAvailable } from "../../data/curriculumRegistry";
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
 * @param {string}   [yearLabel] the school-year question
 * @param {object}   [initial]   existing values, when editing rather than creating
 * @param {string[]} [unlocked]  badge-earned avatars this learner may also pick
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
  yearLabel = "Which school year?",
  initial = null,
  unlocked = [],
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [avatar, setAvatar] = useState(initial?.avatar ?? AVATARS[0]);
  const [colour, setColour] = useState(initial?.colour ?? PROFILE_COLOURS[0]);
  // null is a real answer — "not sure yet" — and the one a grown-up should be
  // able to give without guessing. It simply means the curriculum picker keeps
  // asking, which is the current behaviour for everyone.
  const [yearGroup, setYearGroup] = useState(initial?.yearGroup ?? null);
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
    onSave({ name: trimmed, avatar, colour, yearGroup });
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

        {/* Locked pictures are SHOWN, not hidden. A reward nobody knows exists
            motivates nobody, and a padlocked tile says "there is more here"
            without pretending it is available. `unlocked` is empty when
            creating a profile, because a new learner has earned nothing yet. */}
        {AVATARS_UNLOCKABLE.filter((emoji) => !unlocked.includes(emoji)).map(
          (emoji) => {
            const badge = badgeForAvatar(emoji);
            return (
              <span
                key={emoji}
                className="pb-avatar-option is-locked"
                title={`Earn the ${badge.name} badge to unlock this`}
                aria-label={`Locked picture — earn the ${badge.name} badge to unlock it`}
                role="img"
              >
                <span aria-hidden="true">🔒</span>
              </span>
            );
          }
        )}

        {/* Earned ones join the grid as ordinary choices. */}
        {AVATARS_UNLOCKABLE.filter((emoji) => unlocked.includes(emoji)).map(
          (emoji) => (
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
          )
        )}
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

      <p className="pb-label" id="pb-year-label">
        {yearLabel}
      </p>
      <div className="pb-year-row" role="group" aria-labelledby="pb-year-label">
        {CHILD_YEAR_GROUPS.map((year) => {
          // Years with no curriculum yet are still offered — a child IS in Year
          // 1 whether or not we have content for them — but say so plainly
          // rather than promising a path that isn't there.
          const ready = isYearAvailable(year);
          return (
            <button
              key={year}
              type="button"
              className={`pb-year ${yearGroup === year ? "selected" : ""} ${
                ready ? "" : "is-soon"
              }`}
              onClick={() => setYearGroup(year)}
              aria-pressed={yearGroup === year}
            >
              <span className="pb-year-name">Year {year}</span>
              {!ready && <span className="pb-year-note">coming soon</span>}
            </button>
          );
        })}
        <button
          type="button"
          className={`pb-year ${yearGroup === null ? "selected" : ""}`}
          onClick={() => setYearGroup(null)}
          aria-pressed={yearGroup === null}
        >
          <span className="pb-year-name">Not sure</span>
        </button>
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
