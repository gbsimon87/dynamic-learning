import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/auth-context";
import ProfileBuilder from "./ProfileBuilder";
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
 *
 * A LEARNER account (an older child who signed up for themselves) reaches this
 * screen only when they have more than one profile — with exactly one, the auth
 * context selects it and they go straight to the curriculum. When they do get
 * here, the copy is first-person: they are choosing among their own profiles,
 * not being asked which of their children is playing.
 */
function Profiles() {
  const { children, status, isLearner, addChild, selectChild } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [adding, setAdding] = useState(false);
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

  const handleAdd = async (profile) => {
    if (saving) return;
    setFormError("");
    setSaving(true);
    try {
      await addChild(profile);
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
        <h1 className="profiles-title">
          {isLearner ? "Your profiles 🎈" : "Who's playing today? 🎈"}
        </h1>
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
                setFormError("");
                setAdding(true);
              }}
              disabled={Boolean(chosenId)}
            >
              <span className="profiles-avatar" aria-hidden="true">
                ➕
              </span>
              <span className="profiles-name">
                {isLearner ? "Add another profile" : "Add someone new"}
              </span>
              <span className="profiles-go">Make a profile</span>
            </button>
          </li>
        )}
      </ul>

      {/* Keyed so re-opening the form starts blank rather than showing whatever
          was typed into the previous, abandoned attempt. */}
      {adding && (
        <ProfileBuilder
          key={list.length}
          title="✨ Make a new profile"
          nameLabel="What's your name?"
          saveLabel="🎉 All done!"
          saving={saving}
          error={formError}
          onSave={handleAdd}
          onCancel={() => {
            setFormError("");
            setAdding(false);
          }}
        />
      )}

      <p className="profiles-footer">
        <Link to="/parent">
          {isLearner ? "My account" : "Grown-ups: manage profiles"}
        </Link>
      </p>
    </div>
  );
}

export default Profiles;
