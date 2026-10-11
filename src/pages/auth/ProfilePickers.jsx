import { AVATARS, PROFILE_COLOURS } from "../../data/avatars";
import { AVATARS_UNLOCKABLE, badgeForAvatar } from "../../data/badges";
import { shouldBypassLocks } from "../../data/devUnlock";

/**
 * The picture grid, shared by ProfileBuilder and sign-up. Classes stay pb-* so
 * ProfileBuilder.css styles both: wrap the pickers in `.pb-pickers` when used
 * outside ProfileBuilder (ProfileBuilder's own `.profile-builder` already scopes them).
 */
export function AvatarPicker({ value, onChange, unlocked = [] }) {
  const available = shouldBypassLocks(import.meta.env) ? AVATARS_UNLOCKABLE : unlocked;
  const option = (emoji) => (
    <button
      key={emoji}
      type="button"
      className={`pb-avatar-option ${value === emoji ? "selected" : ""}`}
      onClick={() => onChange(emoji)}
      aria-pressed={value === emoji}
      aria-label={`Choose the ${emoji} picture`}
    >
      <span aria-hidden="true">{emoji}</span>
    </button>
  );
  return (
    <div className="pb-avatar-grid">
      {AVATARS.map(option)}
      {/* Locked pictures are SHOWN, not hidden: "there is more here" motivates. */}
      {AVATARS_UNLOCKABLE.filter((emoji) => !available.includes(emoji)).map((emoji) => {
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
      })}
      {AVATARS_UNLOCKABLE.filter((emoji) => available.includes(emoji)).map(option)}
    </div>
  );
}

export function ColourPicker({ value, onChange }) {
  return (
    <div className="pb-colour-row">
      {PROFILE_COLOURS.map((token) => (
        <button
          key={token}
          type="button"
          className={`pb-colour-option ${value === token ? "selected" : ""}`}
          style={{ "--pb-swatch": `var(${token})` }}
          onClick={() => onChange(token)}
          aria-pressed={value === token}
          aria-label={`Choose the ${token.replace("--profile-colour-", "").replace(/-/g, " ")} colour`}
        />
      ))}
    </div>
  );
}
