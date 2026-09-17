import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/auth-context";
import { AVATARS, PROFILE_COLOURS } from "../../data/avatars";
import "./Profiles.css";

const PICK_DELAY_MS = 700;

/**
 * The child-facing screen: pick who is playing.
 *
 * Deliberately playful (PROJECT_KNOWLEDGE §8) — big rounded cards, emoji, and
 * tap targets well over 64px, because the people using this are about six.
 *
 * Profile colours are CSS custom-property NAMES, passed through an inline
 * `--profile-card-colour` variable rather than a literal, so a profile picked in
 * light mode still reads in dark mode (§9).
 */
function Profiles() {
  const { children, status, addChild, selectChild } = useContext(AuthContext);
  const navigate = useNavigate();

  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [colour, setColour] = useState(PROFILE_COLOURS[0]);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [chosenId, setChosenId] = useState(null);

  // Every timer needs a ref and a cleanup (§9) — this one can otherwise fire
  // after the component has unmounted, or stack up on repeated taps.
  const pickTimerRef = useRef(null);
  useEffect(
    () => () => {
      if (pickTimerRef.current) clearTimeout(pickTimerRef.current);
    },
    []
  );

  const handlePick = (childId) => {
    if (chosenId) return;
    setChosenId(childId);
    selectChild(childId);
    if (pickTimerRef.current) clearTimeout(pickTimerRef.current);
    pickTimerRef.current = setTimeout(() => {
      navigate("/curriculum");
    }, PICK_DELAY_MS);
  };

  const resetForm = () => {
    setName("");
    setAvatar(AVATARS[0]);
    setColour(PROFILE_COLOURS[0]);
    setFormError("");
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    if (saving) return;

    const trimmed = name.trim();
    if (!trimmed) {
      setFormError("Please type a name first! ✏️");
      return;
    }

    setFormError("");
    setSaving(true);
    try {
      await addChild({ name: trimmed, avatar, colour });
      resetForm();
      setAdding(false);
    } catch {
      setFormError("Oops — that did not save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="profiles-page">
        <p className="profiles-loading">Loading your profiles… ⏳</p>
      </div>
    );
  }

  if (status === "signedOut") {
    return (
      <div className="profiles-page">
        <div className="profiles-signedout">
          <h1 className="profiles-title">Hello! 👋</h1>
          <p className="profiles-subtitle">
            Ask a grown-up to sign in so you can pick your profile.
          </p>
          <Link className="profiles-signin-link" to="/login">
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  const list = children ?? [];

  return (
    <div className="profiles-page">
      <header className="profiles-header">
        <h1 className="profiles-title">Who&apos;s playing today? 🎈</h1>
        <p className="profiles-subtitle">
          {list.length > 0
            ? "Tap your picture to start learning!"
            : "Let's make your very first profile!"}
        </p>
      </header>

      <ul className="profiles-grid">
        {list.map((kid) => (
          <li key={kid._id} className="profiles-grid-item">
            <button
              type="button"
              className={`profiles-card ${chosenId === kid._id ? "chosen" : ""}`}
              style={{ "--profile-card-colour": `var(${kid.colour})` }}
              onClick={() => handlePick(kid._id)}
              disabled={Boolean(chosenId)}
            >
              <span className="profiles-avatar" aria-hidden="true">
                {kid.avatar}
              </span>
              <span className="profiles-name">{kid.name}</span>
              <span className="profiles-go">
                {chosenId === kid._id ? "✅ Let's go!" : "Play ▶"}
              </span>
            </button>
          </li>
        ))}

        {!adding && (
          <li className="profiles-grid-item">
            <button
              type="button"
              className="profiles-card profiles-add-card"
              onClick={() => {
                resetForm();
                setAdding(true);
              }}
              disabled={Boolean(chosenId)}
            >
              <span className="profiles-avatar" aria-hidden="true">
                ➕
              </span>
              <span className="profiles-name">Add someone new</span>
              <span className="profiles-go">Make a profile</span>
            </button>
          </li>
        )}
      </ul>

      {adding && (
        <form className="profiles-form" onSubmit={handleAdd}>
          <h2 className="profiles-form-title">✨ Make a new profile</h2>

          <label className="profiles-form-label" htmlFor="profiles-name">
            What&apos;s your name?
          </label>
          <input
            id="profiles-name"
            className="profiles-name-input"
            type="text"
            maxLength={20}
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type your name"
          />

          <p className="profiles-form-label">Pick a picture</p>
          <div className="profiles-avatar-grid">
            {AVATARS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                className={`profiles-avatar-option ${
                  avatar === emoji ? "selected" : ""
                }`}
                onClick={() => setAvatar(emoji)}
                aria-pressed={avatar === emoji}
                aria-label={`Choose the ${emoji} picture`}
              >
                <span aria-hidden="true">{emoji}</span>
              </button>
            ))}
          </div>

          <p className="profiles-form-label">Pick a colour</p>
          <div className="profiles-colour-row">
            {PROFILE_COLOURS.map((token) => (
              <button
                key={token}
                type="button"
                className={`profiles-colour-option ${
                  colour === token ? "selected" : ""
                }`}
                style={{ "--profile-swatch-colour": `var(${token})` }}
                onClick={() => setColour(token)}
                aria-pressed={colour === token}
                aria-label={`Choose the ${token
                  .replace("--profile-colour-", "")
                  .replace(/-/g, " ")} colour`}
              />
            ))}
          </div>

          <div className="profiles-preview">
            <span className="profiles-preview-label">Your profile:</span>
            <span
              className="profiles-preview-chip"
              style={{ "--profile-card-colour": `var(${colour})` }}
            >
              <span aria-hidden="true">{avatar}</span>
              {name.trim() || "…"}
            </span>
          </div>

          {formError && (
            <p className="profiles-form-error" role="alert">
              {formError}
            </p>
          )}

          <div className="profiles-form-actions">
            <button
              type="submit"
              className="profiles-save-btn"
              disabled={saving}
            >
              {saving ? "Saving…" : "🎉 All done!"}
            </button>
            <button
              type="button"
              className="profiles-cancel-btn"
              onClick={() => {
                resetForm();
                setAdding(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <p className="profiles-footer">
        <Link to="/parent">Grown-ups: manage profiles</Link>
      </p>
    </div>
  );
}

export default Profiles;
