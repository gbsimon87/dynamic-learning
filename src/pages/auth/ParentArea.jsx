import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/auth-context";
import "./ParentArea.css";

/**
 * The signed-in account: plain adult UI, no games.
 *
 * A LEARNER account (an older child who signed up for themselves) sees the same
 * screen with first-person headings — it is their account, not a grown-up's, so
 * "Parent area" would be addressing someone who is not there.
 *
 * Removing a profile deletes that child's progress, which has no backup, so the
 * destructive action is two-step: the row swaps to an explicit confirm strip
 * naming the child before anything is removed.
 */
function ParentArea() {
  const { parent, children, status, isLearner, signOut, removeChild } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [confirmingId, setConfirmingId] = useState(null);

  if (status === "loading") {
    return (
      <div className="parent-area-page">
        <p className="parent-area-loading">Loading…</p>
      </div>
    );
  }

  if (status === "signedOut") {
    return (
      <div className="parent-area-page">
        <main className="parent-area-card">
          <h1 className="parent-area-title">Parent area</h1>
          <p className="parent-area-intro">
            You need to be signed in to manage child profiles.
          </p>
          <Link className="parent-area-primary-btn" to="/login">
            Sign in
          </Link>
        </main>
      </div>
    );
  }

  const list = children ?? [];

  // signOut is async (it ends the server session too), so await it before
  // navigating — otherwise we leave mid-sign-out and the redirect races it.
  const handleSignOut = async () => {
    await signOut();
    navigate("/login", { replace: true });
  };

  return (
    <div className="parent-area-page">
      <main className="parent-area-card">
        <h1 className="parent-area-title">
          {isLearner ? "My account" : "Parent area"}
        </h1>

        <p className="parent-area-account">
          Signed in as <strong>{parent?.email}</strong>
        </p>

        <section className="parent-area-section">
          <h2 className="parent-area-section-title">
            {isLearner ? "My profiles" : "Child profiles"}
          </h2>

          {list.length === 0 ? (
            <p className="parent-area-empty">
              No profiles yet.{" "}
              <Link to="/profiles">Add the first one</Link>.
            </p>
          ) : (
            <ul className="parent-area-list">
              {list.map((kid) => (
                <li key={kid._id} className="parent-area-row">
                  <span
                    className="parent-area-chip"
                    style={{ "--parent-chip-colour": `var(${kid.colour})` }}
                  >
                    <span aria-hidden="true">{kid.avatar}</span>
                    <span className="parent-area-chip-name">{kid.name}</span>
                  </span>

                  {confirmingId === kid._id ? (
                    <span className="parent-area-confirm">
                      <span className="parent-area-confirm-text">
                        Remove {kid.name} and delete their saved progress? This
                        cannot be undone.
                      </span>
                      <span className="parent-area-confirm-actions">
                        <button
                          type="button"
                          className="parent-area-danger-btn"
                          onClick={() => {
                            removeChild(kid._id);
                            setConfirmingId(null);
                          }}
                        >
                          Yes, remove
                        </button>
                        <button
                          type="button"
                          className="parent-area-secondary-btn"
                          onClick={() => setConfirmingId(null)}
                        >
                          Keep
                        </button>
                      </span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="parent-area-secondary-btn"
                      onClick={() => setConfirmingId(kid._id)}
                    >
                      Remove
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}

          <Link className="parent-area-primary-btn" to="/profiles">
            Add or switch profile
          </Link>
        </section>

        <section className="parent-area-section">
          <h2 className="parent-area-section-title">Account</h2>
          <button
            type="button"
            className="parent-area-signout-btn"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </section>
      </main>
    </div>
  );
}

export default ParentArea;
