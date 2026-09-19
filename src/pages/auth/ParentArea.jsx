import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/auth-context";
import { useChildrenProgress } from "../../hooks/useChildrenProgress";
import { CHILD_YEAR_GROUPS, readYearGroup } from "../../data/childFields";
import { isYearAvailable } from "../../data/curriculumRegistry";
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
/**
 * One child's progress, unfolded under their row.
 *
 * Deliberately plain: bars and counts, no emoji and no rings. This is the
 * grown-up's screen, and the question it answers is "where is this child
 * stuck?", which wants the SHAPE of the progress — which categories have moved
 * and which have not — more than it wants a single headline figure.
 *
 * Categories with nothing built yet are dropped rather than listed at 0 of 0:
 * most of Year 3 is unbuilt, and a wall of empty rows would bury the real ones.
 */
function ChildProgress({ id, name, summary, loading }) {
  if (loading) {
    return (
      <div className="parent-area-progress" id={id}>
        <p className="parent-area-progress-note">Loading progress…</p>
      </div>
    );
  }

  if (!summary || summary.stats.total === 0) {
    return (
      <div className="parent-area-progress" id={id}>
        <p className="parent-area-progress-note">
          {name} has not started a curriculum yet.
        </p>
      </div>
    );
  }

  const { stats, year, subjectName, categories } = summary;
  const started = categories.filter((category) => category.total > 0);

  return (
    <div className="parent-area-progress" id={id}>
      <p className="parent-area-progress-head">
        Year {year} {subjectName} — {stats.completed} of {stats.total} built
        challenges done ({stats.percent}%)
        {/* Most of the curriculum is not built yet, so a bare 100% would read
            as "year finished". */}
        {stats.datasetTotal > stats.total && (
          <span className="parent-area-progress-note">
            {" "}
            · {stats.datasetTotal} planned in total
          </span>
        )}
      </p>

      <ul className="parent-area-cats">
        {started.map((category) => (
          <li key={category.id} className="parent-area-cat">
            <p className="parent-area-cat-head">
              <span className="parent-area-cat-name">{category.title}</span>
              <span className="parent-area-cat-count">
                {category.completed}/{category.total}
              </span>
            </p>

            <div
              className="parent-area-bar"
              role="progressbar"
              aria-valuenow={category.percent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${category.title} progress`}
            >
              <div
                className="parent-area-bar-fill"
                style={{ width: `${category.percent}%` }}
              />
            </div>

            <ul className="parent-area-topics">
              {category.topics
                .filter((topic) => topic.total > 0)
                .map((topic) => (
                  <li
                    key={topic.id}
                    className={`parent-area-topic ${
                      topic.completed === topic.total ? "is-done" : ""
                    }`}
                  >
                    <span>{topic.name}</span>
                    <span className="parent-area-topic-count">
                      {topic.completed}/{topic.total}
                    </span>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The school year on a profile, changeable in place.
 *
 * It lives here rather than on /profiles because it is a grown-up's fact about
 * a child, not a choice a six-year-old should be making on the way into a game.
 * Setting it is what lets the curriculum picker skip itself.
 *
 * Saves immediately on tap: there is one field, so a Save button would only add
 * a step and a half-saved state to get wrong.
 */
function YearPicker({ child, onChange }) {
  const [saving, setSaving] = useState(false);
  const [failed, setFailed] = useState(false);
  const current = readYearGroup(child);

  const pick = async (year) => {
    if (saving || year === current) return;
    setSaving(true);
    setFailed(false);
    try {
      await onChange(child._id, { yearGroup: year });
    } catch {
      // Say so rather than silently reverting — a grown-up who taps Year 3 and
      // sees nothing happen will reasonably assume it worked.
      setFailed(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="parent-area-year">
      <span className="parent-area-year-label" id={`year-${child._id}`}>
        School year
      </span>
      <div
        className="parent-area-year-row"
        role="group"
        aria-labelledby={`year-${child._id}`}
      >
        {CHILD_YEAR_GROUPS.map((year) => (
          <button
            key={year}
            type="button"
            className={`parent-area-year-btn ${current === year ? "selected" : ""}`}
            aria-pressed={current === year}
            disabled={saving}
            onClick={() => pick(year)}
            title={isYearAvailable(year) ? undefined : "No curriculum yet"}
          >
            {year}
          </button>
        ))}
        <button
          type="button"
          className={`parent-area-year-btn ${current === null ? "selected" : ""}`}
          aria-pressed={current === null}
          disabled={saving}
          onClick={() => pick(null)}
        >
          Not set
        </button>
      </div>
      {failed && (
        <span className="parent-area-year-error" role="alert">
          That didn't save — please try again.
        </span>
      )}
    </div>
  );
}

function ParentArea() {
  const { parent, children, status, isLearner, signOut, removeChild, updateChild } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [confirmingId, setConfirmingId] = useState(null);

  // Which child's progress is unfolded. One at a time: a grown-up with three

  // children comparing them needs a short list, not three long ones at once.

  const [openId, setOpenId] = useState(null);


  // Read-only. A failed read yields null for that child, which renders as

  // "nothing started yet" rather than blocking profile management.

  const { summaries, loading: loadingProgress } = useChildrenProgress(children);

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
                    <span className="parent-area-row-actions">
                      <button
                        type="button"
                        className="parent-area-secondary-btn"
                        aria-expanded={openId === kid._id}
                        aria-controls={`progress-${kid._id}`}
                        onClick={() =>
                          setOpenId((was) => (was === kid._id ? null : kid._id))
                        }
                      >
                        {openId === kid._id ? "Hide progress" : "See progress"}
                      </button>
                      <button
                        type="button"
                        className="parent-area-secondary-btn"
                        onClick={() => setConfirmingId(kid._id)}
                      >
                        Remove
                      </button>
                    </span>
                  )}

                  <YearPicker child={kid} onChange={updateChild} />

                  {openId === kid._id && (
                    <ChildProgress
                      id={`progress-${kid._id}`}
                      name={kid.name}
                      summary={summaries[kid._id]}
                      loading={loadingProgress}
                    />
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
