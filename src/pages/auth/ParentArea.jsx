import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/auth-context";
import { ThemeContext } from "../../context/theme-context";
import { useSoundMuted } from "../../components/celebration/sound/useSoundMuted";
import { useChildrenProgress } from "../../hooks/useChildrenProgress";
import { CHILD_NAME_MAX, CHILD_YEAR_GROUPS, readYearGroup } from "../../data/childFields";
import { useChildrenRewards } from "../../hooks/useChildrenRewards";
import { AVATARS, profileColour } from "../../data/avatars";
import {
  BADGES,
  heldBadgeIds,
  unlockedAvatars,
} from "../../data/badges";
import { normaliseRewards } from "../../data/rewardsShape";
import { grownUpXp, levelFor } from "../../data/xp";
import { useTrophyData } from "../../hooks/useTrophyData";
import { streakStatus, localDay } from "../../data/streak";
import { isYearAvailable } from "../../data/curriculumRegistry";
import { BREAK_CHOICES } from "../../data/brainBreaks";
import { useBreakMinutes } from "../../components/brainBreak/breakSetting";
import "./ParentArea.css";
import BixLoader from "../../components/mascot/BixLoader";

/**
 * Account and device preferences, with profile management for signed-in families.
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
 * The curriculum half of a child's snapshot.
 *
 * A grown-up wants "what are they working on and how far through", not a list
 * of every planned topic at 0. So only topics the child has finished at least
 * one challenge in are listed; the rest are summed into one muted line.
 */
function ChildProgress({ name, summary, loading }) {
  if (loading) {
    return <p className="parent-area-progress-note">Loading progress…</p>;
  }

  if (!summary || summary.stats.total === 0) {
    return <p className="parent-area-progress-note">{name} has not started a curriculum yet.</p>;
  }

  const { stats, year, subjectName, categories } = summary;
  const topics = categories.flatMap((category) => category.topics.filter((topic) => topic.total > 0));
  const touched = topics.filter((topic) => topic.completed > 0);
  const finished = touched.filter((topic) => topic.completed === topic.total).length;
  const untouched = topics.length - touched.length;

  return (
    <div className="parent-area-progress">
      <div className="parent-area-progress-head">
        <p className="parent-area-progress-title">Year {year} {subjectName}</p>
        <p className="parent-area-progress-note">
          {stats.completed} of {stats.total} challenges · {finished} {finished === 1 ? "topic" : "topics"} finished
        </p>
      </div>
      <div className="parent-area-bar" role="progressbar" aria-valuenow={stats.percent} aria-valuemin={0} aria-valuemax={100} aria-label={`Year ${year} ${subjectName} progress`}>
        <div className="parent-area-bar-fill" style={{ width: `${stats.percent}%` }} />
      </div>

      {touched.length > 0 ? (
        <ul className="parent-area-topics">
          {touched.map((topic) => {
            const done = topic.completed === topic.total;
            return (
              <li key={topic.id} className={`parent-area-topic ${done ? "is-done" : ""}`}>
                <span className="parent-area-topic-mark" aria-hidden="true">{done ? "✓" : "…"}</span>
                <span className="parent-area-topic-name">{topic.name}</span>
                <span className="parent-area-topic-count">{done ? "Done" : `${topic.completed}/${topic.total}`}</span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="parent-area-progress-note">No topics finished yet.</p>
      )}
      {untouched > 0 && touched.length > 0 && (
        <p className="parent-area-progress-note">{untouched} more {untouched === 1 ? "topic" : "topics"} not started yet.</p>
      )}
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

function NameEditor({ child, onChange }) {
  const [name, setName] = useState(child.name);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setName(child.name);
  }, [child.name]);

  const save = async (event) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Enter a name before saving.");
      return;
    }
    if ([...trimmed].length > CHILD_NAME_MAX) {
      setError(`Use ${CHILD_NAME_MAX} characters or fewer.`);
      return;
    }
    if (saving || trimmed === child.name) return;

    setSaving(true);
    setError("");
    try {
      const updated = await onChange(child._id, { name: trimmed });
      setName(updated.name);
    } catch {
      setError("That didn't save — please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="parent-area-name" onSubmit={save}>
      <label htmlFor={`name-${child._id}`}>Name</label>
      <div className="parent-area-name-row">
        <input
          id={`name-${child._id}`}
          maxLength={CHILD_NAME_MAX * 2}
          type="text"
          value={name}
          disabled={saving}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `name-error-${child._id}` : undefined}
          onChange={(event) => {
            setName(event.target.value);
            setError("");
          }}
        />
        <button
          type="submit"
          className="parent-area-secondary-btn"
          disabled={saving || name.trim() === child.name}
        >
          {saving ? "Saving…" : "Save name"}
        </button>
      </div>
      {error && (
        <span id={`name-error-${child._id}`} className="parent-area-name-error" role="alert">
          {error}
        </span>
      )}
    </form>
  );
}

/**
 * A child's badges, and the pictures those badges have unlocked.
 *
 * The avatar row lives HERE rather than on /profiles because changing a
 * picture is an edit, and /profiles is a launchpad — a child heading for a game
 * should not be one mis-tap away from redecorating. It is also where every
 * profile's picture can be changed — the profile builder only ever creates; the
 * one other path is the celebration's "Make it my picture", for the child who
 * has just unlocked one.
 *
 * Read-only for badges: a grown-up can see what was earned, never grant it.
 */
function ChildRewards({ child, rewards, summary, loadingProgress, isLearner }) {
  const r = normaliseRewards(rewards);
  // Read-only back-fill for a child who has not played since XP began. Its
  // progress read is only waited on when there is a back-fill to show.
  const trophy = useTrophyData(child._id, { rewards: false });
  const shownXp = grownUpXp(r, trophy.candidates);
  const xpReady = r.xpBackfilled || !trophy.loading;
  const level = levelFor(shownXp);
  const streak = streakStatus(r.streak, localDay()).current;
  const held = heldBadgeIds(rewards);
  const earned = BADGES.filter((badge) => held.has(badge.id));

  return (
    <div className="parent-area-snapshot">
      <ul className="parent-area-tiles" aria-label={`${child.name}’s snapshot`}>
        <li className="parent-area-tile">
          <span className="parent-area-tile-icon" aria-hidden="true">⭐</span>
          <span className="parent-area-tile-value">{xpReady ? `Level ${level.level}` : "Level …"}</span>
          <span className="parent-area-tile-label">{xpReady ? `${level.needed - level.into} XP to next` : "\u00a0"}</span>
        </li>
        <li className="parent-area-tile">
          <span className="parent-area-tile-icon" aria-hidden="true">✨</span>
          <span className="parent-area-tile-value">{xpReady ? shownXp : "…"}</span>
          <span className="parent-area-tile-label">XP earned</span>
        </li>
        <li className="parent-area-tile">
          <span className="parent-area-tile-icon" aria-hidden="true">🔥</span>
          <span className="parent-area-tile-value">{streak} {streak === 1 ? "day" : "days"}</span>
          <span className="parent-area-tile-label">Streak · best {r.streak.best}</span>
        </li>
        <li className="parent-area-tile">
          <span className="parent-area-tile-icon" aria-hidden="true">🏅</span>
          <span className="parent-area-tile-value">{held.size} of {BADGES.length}</span>
          <span className="parent-area-tile-label">Badges</span>
        </li>
      </ul>

      <section className="parent-area-panel" aria-label="Curriculum">
        <h4 className="parent-area-rewards-title">Curriculum</h4>
        <ChildProgress name={child.name} summary={summary} loading={loadingProgress} />
      </section>

      <section className="parent-area-panel" aria-label="Badges earned">
        <h4 className="parent-area-rewards-title">Badges earned</h4>
        {earned.length > 0 ? (
          <ul className="parent-area-badges">
            {earned.map((badge) => (
              <li key={badge.id} className="parent-area-badge is-held" title={badge.blurb}>
                <span className="parent-area-badge-icon" aria-hidden="true">{badge.icon}</span>
                <span className="parent-area-badge-name">{badge.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="parent-area-progress-note">No badges yet — the first one comes quickly.</p>
        )}
        {earned.length > 0 && earned.length < BADGES.length && (
          <p className="parent-area-progress-note">{BADGES.length - earned.length} more to discover in the Trophy Room.</p>
        )}
      </section>

      <div className="parent-area-actions">
        <Link className="parent-area-action" to={`/parent/trophies/${child._id}`}>
          <span aria-hidden="true">🏆</span> {isLearner ? "My Trophy Room" : `${child.name}’s Trophy Room`}
        </Link>
      </div>

    </div>
  );
}

/**
 * The profile picture, chosen from the pictures this child has unlocked.
 * Lives under "Edit profile": it is a profile setting, not progress.
 */
function PicturePicker({ child, rewards, onChangeAvatar }) {
  const [saving, setSaving] = useState(false);
  const choices = unlockedAvatars(rewards, AVATARS);

  const pick = async (emoji) => {
    if (saving || emoji === child.avatar) return;
    setSaving(true);
    try {
      await onChangeAvatar(child._id, { avatar: emoji });
    } catch {
      // The row simply stays as it was; the next render shows the truth.
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="parent-area-picture">
      <span className="parent-area-year-label" id={`avatar-${child._id}`}>Picture</span>
      <div className="parent-area-avatars" role="group" aria-labelledby={`avatar-${child._id}`}>
        {choices.map((emoji) => (
          <button
            key={emoji}
            type="button"
            className={`parent-area-avatar ${child.avatar === emoji ? "selected" : ""}`}
            aria-pressed={child.avatar === emoji}
            aria-label={`Use the ${emoji} picture`}
            disabled={saving}
            onClick={() => pick(emoji)}
          >
            <span aria-hidden="true">{emoji}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Deletes the whole account. Two deliberate steps — open, then type the
 * password — because a child can be holding the device and nothing comes back.
 */
function DeleteAccount({ isLearner, onDelete }) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (!open) {
    return (
      <button type="button" className="parent-area-danger-btn" onClick={() => setOpen(true)}>
        Delete account
      </button>
    );
  }

  const submit = async (event) => {
    event.preventDefault();
    if (busy || !password) return;
    setBusy(true);
    setError("");
    try {
      await onDelete(password);
    } catch (err) {
      setError(
        err?.message === "WRONG_PASSWORD"
          ? "That password isn’t right. Nothing has been deleted."
          : err?.message === "TOO_MANY_ATTEMPTS"
            ? "Too many tries. Wait a few minutes, then try again."
            : "We couldn’t delete the account. Check your connection and try again."
      );
      setBusy(false);
    }
  };

  return (
    <form className="parent-area-delete" onSubmit={submit}>
      <p className="parent-area-confirm-text">
        {isLearner
          ? "This deletes your account, your profile and all your progress, badges and stickers."
          : "This deletes your account, every child profile on it, and all their progress, badges and stickers."}{" "}
        <strong>It cannot be undone.</strong>
      </p>
      <label className="parent-area-name">
        <span>Type your password to confirm</span>
        <input
          type="password"
          autoComplete="current-password"
          maxLength={1024}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      {error && <p className="parent-area-name-error" role="alert">{error}</p>}
      <span className="parent-area-confirm-actions">
        <button type="submit" className="parent-area-danger-btn" disabled={busy || !password}>
          {busy ? "Deleting…" : "Delete everything"}
        </button>
        <button
          type="button"
          className="parent-area-secondary-btn"
          disabled={busy}
          onClick={() => {
            setOpen(false);
            setPassword("");
            setError("");
          }}
        >
          Keep my account
        </button>
      </span>
    </form>
  );
}

/**
 * Brain breaks: how often Bix suggests a movement break, or off. A DEVICE
 * setting like the mute switch (brainBreak/breakSetting.js), so it applies to
 * whoever plays on this device and is never learner data.
 */
function BrainBreakSetting({ isLearner }) {
  const [minutes, setMinutes] = useBreakMinutes();
  const options = [...BREAK_CHOICES.map((value) => ({ value, label: `${value} min` })), { value: null, label: "Off" }];

  return (
    <div className="parent-area-setting-block">
      <h3 className="parent-area-setting-title" id="parent-area-breaks">Brain breaks</h3>
      <p className="parent-area-note">
        Bix suggests a one-minute movement break after this much active play.
        {isLearner ? " You" : " Children"} can always choose “Not now”.
      </p>
      <div className="parent-area-year-row" role="group" aria-labelledby="parent-area-breaks">
        {options.map((option) => (
          <button
            key={option.label}
            type="button"
            className={`parent-area-year-btn ${minutes === option.value ? "selected" : ""}`}
            aria-pressed={minutes === option.value}
            onClick={() => setMinutes(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function DeviceSettings({ isLearner }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [muted, toggleMuted] = useSoundMuted();

  return (
    <section className="parent-area-section parent-area-settings" aria-labelledby="parent-area-settings">
      <p className="parent-area-eyebrow">Make yourself at home</p>
      <h2 className="parent-area-section-title" id="parent-area-settings">Device settings</h2>
      <p className="parent-area-note">For everyone using this browser on this device.</p>
      <div className="parent-area-setting-block">
        <div className="parent-area-setting-row">
          <div>
            <h3 className="parent-area-setting-title" id="parent-area-theme">Dark mode</h3>
            <p className="parent-area-setting-status">{theme === "dark" ? "Dark appearance" : "Light appearance"}</p>
          </div>
          <button type="button" role="switch" aria-checked={theme === "dark"} aria-labelledby="parent-area-theme" className="parent-area-switch" onClick={toggleTheme}>
            <span className="parent-area-switch-thumb" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="parent-area-setting-block">
        <div className="parent-area-setting-row">
          <div>
            <h3 className="parent-area-setting-title" id="parent-area-sound">Learning sounds</h3>
            <p className="parent-area-setting-status">{muted ? "Off · quiet play" : "On · answers and rewards"}</p>
          </div>
          <button type="button" role="switch" aria-checked={!muted} aria-labelledby="parent-area-sound" className="parent-area-switch" onClick={toggleMuted}>
            <span className="parent-area-switch-thumb" aria-hidden="true" />
          </button>
        </div>
        <p className="parent-area-note parent-area-sound-note">Includes spoken prompts and read-aloud.</p>
        <details className="parent-area-sound-help">
          <summary>No sound on an iPhone or iPad?</summary>
          <p className="parent-area-note">The silent switch, or Silent Mode in Control Centre, mutes browser sounds too. Turn it off, then check your device’s volume.</p>
        </details>
      </div>
      <BrainBreakSetting isLearner={isLearner} />
    </section>
  );
}

function ParentHeader({ isLearner, signedIn }) {
  return (
    <header className="parent-area-header">
      <div>
        <p className="parent-area-eyebrow">Learn with Bix · {isLearner ? "Your space" : "For grown-ups"}</p>
        <h1 className="parent-area-title">{isLearner ? "My account" : "Parent area"}</h1>
        <p className="parent-area-intro">{isLearner ? "Your learning, your way. Manage your profile and get comfortable." : "Support their little steps. Manage profiles, follow progress and get comfortable."}</p>
      </div>
      <Link className="parent-area-back" to={signedIn ? "/curriculum" : "/skills"}>Back to learning <span aria-hidden="true">→</span></Link>
    </header>
  );
}

function ParentArea() {
  const { parent, children, status, isLearner, signOut, removeChild, updateChild, deleteAccount, selectChild } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [confirmingId, setConfirmingId] = useState(null);
  const [signingOut, setSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState("");

  // Keep one child's progress open at a time so a family can scan the list.
  const [openId, setOpenId] = useState(null);

  // Read-only; unavailable progress never blocks profile management.
  const { summaries, loading: loadingProgress } = useChildrenProgress(children);

  // Bumped after a profile edit so the badge/avatar row re-reads without a
  // reload. Progress cannot change from this screen, so it needs no bump.
  const [rewardsBump, setRewardsBump] = useState(0);
  const { rewards } = useChildrenRewards(children, rewardsBump);

  const replayIntro = async (childId) => {
    try {
      await selectChild(childId);
      navigate("/hello");
    } catch {
      // The profile could not be selected; stay here.
    }
  };

  const editChild = async (childId, patch) => {
    const out = await updateChild(childId, patch);
    setRewardsBump((n) => n + 1);
    return out;
  };

  if (status === "loading") {
    return (
      <BixLoader message="Opening the grown-ups’ area" />
    );
  }

  if (status === "signedOut") {
    return (
      <div className="parent-area-page">
        <div className="parent-area-card">
          <ParentHeader />
          <div className="parent-area-layout">
            <section className="parent-area-section parent-area-welcome" aria-labelledby="parent-area-welcome">
              <span className="parent-area-welcome-icon" aria-hidden="true">🌱</span>
              <h2 className="parent-area-section-title" id="parent-area-welcome">A space for your family</h2>
              <p className="parent-area-note">Sign in to manage child profiles, see their curriculum progress and celebrate what they’ve learned.</p>
              <Link className="parent-area-primary-btn" to="/login">Sign in</Link>
              <Link className="parent-area-text-link" to="/signup">Create an account</Link>
            </section>
            <DeviceSettings />
          </div>
        </div>
      </div>
    );
  }

  const list = children ?? [];

  // signOut is async (it ends the server session too), so await it before
  // navigating — otherwise we leave mid-sign-out and the redirect races it.
  const handleSignOut = async () => {
    if (signingOut) return;
    setSigningOut(true);
    setSignOutError("");
    try {
      await signOut();
      navigate("/login", { replace: true });
    } catch {
      setSignOutError("We couldn’t sign you out. Check your connection and try again before sharing this device.");
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <div className="parent-area-page">
      <div className="parent-area-card">
        <ParentHeader isLearner={isLearner} signedIn />
        <div className="parent-area-layout">
          <div className="parent-area-main-column">
            <section className="parent-area-section" aria-labelledby="parent-area-profiles">
              <div className="parent-area-section-heading">
                <div>
                  <p className="parent-area-eyebrow">{isLearner ? "Keep growing" : "Your little learners"}</p>
                  <h2 className="parent-area-section-title" id="parent-area-profiles">{isLearner ? "My profiles" : "Child profiles"}</h2>
                </div>
                <span className="parent-area-profile-count">{list.length} {list.length === 1 ? "profile" : "profiles"}</span>
              </div>
              <p className="parent-area-note">{isLearner ? "Check your progress or update your profile below." : "See how they’re getting on, or update a profile below."}</p>

              {list.length === 0 ? (
                <p className="parent-area-empty">
                  No profiles yet.{" "}
                  <Link to="/profiles">Add the first one</Link>.
                </p>
              ) : (
                <ul className="parent-area-list">
                  {list.map((kid) => (
                    <li key={kid._id} className="parent-area-row">
                      <div className="parent-area-profile-heading">
                        <div className="parent-area-profile-identity">
                          <span className="parent-area-chip" style={{ "--parent-chip-colour": profileColour(kid.colour) }} aria-hidden="true">{kid.avatar}</span>
                          <div>
                            <h3 className="parent-area-chip-name">{kid.name}</h3>
                            <p className="parent-area-setting-status">{readYearGroup(kid) ? `Year ${readYearGroup(kid)}` : "School year not set"}</p>
                          </div>
                        </div>
                        <button type="button" className="parent-area-secondary-btn" aria-expanded={openId === kid._id} aria-controls={`progress-${kid._id}`} onClick={() => setOpenId((was) => (was === kid._id ? null : kid._id))}>
                          {openId === kid._id ? "Hide progress" : "See progress"}
                        </button>
                      </div>
                      <details className="parent-area-profile-settings">
                        <summary>Edit profile</summary>
                        <NameEditor child={kid} onChange={editChild} />
                        <YearPicker child={kid} onChange={editChild} />
                        <PicturePicker child={kid} rewards={rewards[kid._id]} onChangeAvatar={editChild} />
                        {/* Bix's hello game, played together. Switches to this child, so it is
                            their badge and their intro flag. */}
                        <button type="button" className="parent-area-action parent-area-hello" onClick={() => replayIntro(kid._id)}>
                          <span aria-hidden="true">👋</span> {isLearner ? "Play Bix’s hello game" : `Play Bix’s hello game with ${kid.name}`}
                        </button>
                        <div className="parent-area-remove-zone">
                        {confirmingId === kid._id ? (
                          <div className="parent-area-confirm">
                            <p className="parent-area-confirm-text">Remove {kid.name} and delete their saved progress? This cannot be undone.</p>
                            <div className="parent-area-confirm-actions">
                              <button type="button" className="parent-area-danger-btn" onClick={() => { removeChild(kid._id); setConfirmingId(null); }}>Yes, remove</button>
                              <button type="button" className="parent-area-secondary-btn" onClick={() => setConfirmingId(null)}>Keep</button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="parent-area-remove-note">Removing {kid.name} deletes all their progress, badges and stickers.</p>
                            <button type="button" className="parent-area-remove-btn" onClick={() => setConfirmingId(kid._id)}>Remove profile</button>
                          </>
                        )}
                        </div>
                      </details>

                      <div id={`progress-${kid._id}`} className="parent-area-profile-detail" hidden={openId !== kid._id}>
                        {openId === kid._id && (
                          <>
                            <ChildRewards child={kid} rewards={rewards[kid._id]} summary={summaries[kid._id]} loadingProgress={loadingProgress} isLearner={isLearner} />
                          </>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <Link className="parent-area-primary-btn" to="/profiles">
                Add or switch profile
              </Link>
            </section>

            <section className="parent-area-section parent-area-account-section" aria-labelledby="parent-area-account">
              <h2 className="parent-area-section-title" id="parent-area-account">Account</h2>
              <p className="parent-area-account">Signed in as <strong>{parent?.email}</strong></p>
              {signOutError && <p className="parent-area-name-error" role="alert">{signOutError}</p>}
              <div className="parent-area-account-actions">
                <button
                  type="button"
                  className="parent-area-signout-btn"
                  disabled={signingOut}
                  onClick={handleSignOut}
                >
                  {signingOut ? "Signing out…" : "Sign out"}
                </button>
                <DeleteAccount
                  isLearner={isLearner}
                  onDelete={async (password) => {
                    await deleteAccount(password);
                    navigate("/", { replace: true });
                  }}
                />
              </div>
              <p className="parent-area-note">
                <Link to="/privacy">How we look after your information</Link>
              </p>
            </section>
          </div>
          <DeviceSettings isLearner={isLearner} />
        </div>
      </div>
    </div>
  );
}

export default ParentArea;
