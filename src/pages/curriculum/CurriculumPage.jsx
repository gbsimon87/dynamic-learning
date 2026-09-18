import { Link, Navigate, useParams } from "react-router";
import {
  getSubjectName,
  isCurriculumAvailable,
  loadCurriculum,
} from "../../data/curriculumRegistry";
import { useProgress } from "../../hooks/useProgress";
import { isChallengeImplemented } from "../../data/challengeAvailability";
import { buildLockState } from "../../data/curriculumLocks";
import {
  getTopicStats,
  getYearStats,
} from "../../data/curriculumProgressStats";
import { shouldBypassLocks } from "../../data/devUnlock";
import "./CurriculumPage.css";
import "./CurriculumSelectPage.css";

function CurriculumPage() {
  const params = useParams();
  const year = Number(params.year);
  const subject = params.subject;

  const { progress, hydrated } = useProgress(year, subject);

  // Unknown or not-yet-built year/subject → back to the picker
  if (!isCurriculumAvailable(year, subject)) {
    return <Navigate to="/curriculum" replace />;
  }

  const curriculum = loadCurriculum(year, subject);

  // Only challenges with a component file count, so 100% stays reachable.
  const isBuilt = (topicId, challengeId) =>
    isChallengeImplemented(subject, year, topicId, challengeId);

  const yearStats = getYearStats(progress, curriculum, isBuilt);

  // Dev-only: VITE_UNLOCK_ALL opens every built challenge. See devUnlock.js.
  // `import.meta.env` is undefined outside Vite, hence the optional chain.
  const bypassLocks = shouldBypassLocks(import.meta.env);

  // Every lock decision on this screen comes from here. The same structure
  // drives the next-challenge resolver in ProblemView, so what a learner is
  // sent to after finishing can't disagree with what's shown as open.
  const lockState = buildLockState({
    curriculum,
    progress,
    isBuilt,
    bypassLocks,
  });

  return (
    <div className="curriculum-page page">
      {/* Hero Header */}
      <section className="curriculum-hero">
        <h1 className="curriculum-title">
          📘 Year {year} {getSubjectName(subject)}
        </h1>
        <p className="curriculum-subtitle">
          Follow the UK National Curriculum through fun challenges!
        </p>

        {/* Held back until hydration so it never flashes 0% at a learner who
            has real progress saved. */}
        {hydrated && yearStats.total > 0 && (
          <div className="year-progress">
            <div
              className="year-progress-bar"
              role="progressbar"
              aria-valuenow={yearStats.percent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Year ${year} ${getSubjectName(subject)} progress`}
            >
              <div
                className="year-progress-fill"
                style={{ width: `${yearStats.percent}%` }}
              />
            </div>
            <p className="year-progress-label">
              {yearStats.completed} of {yearStats.total} available ·{" "}
              {yearStats.percent}%
            </p>
            {/* Most of the curriculum isn't built yet, so a bare 100% would
                read as "Year finished". Name the full dataset alongside it. */}
            {yearStats.datasetTotal > yearStats.total && (
              <p className="year-progress-note">
                {yearStats.completed} of {yearStats.datasetTotal} in the full
                curriculum — more challenges coming soon!
              </p>
            )}
          </div>
        )}
        {/* Say so loudly: without this a real gating bug looks exactly like
            the flag working. */}
        {bypassLocks && (
          <p className="dev-unlock-banner">
            🔓 Dev mode — every built challenge is unlocked (VITE_UNLOCK_ALL)
          </p>
        )}

        <Link to="/curriculum" className="curriculum-change-link">
          ← Change year or subject
        </Link>
      </section>

      {/* Category Cards Grid */}
      <div className="curriculum-grid">
        {curriculum.map((category, catIndex) => {
          // Index-aligned: buildLockState maps the curriculum in order.
          const categoryLocks = lockState[catIndex];

          return (
            <section
              key={category.id}
              className={`curriculum-card ${
                categoryLocks.locked ? "locked" : ""
              }`}
            >
              <div className="curriculum-card-header">
                <h2 className="curriculum-card-title">{category.title}</h2>
                {categoryLocks.complete && (
                  <span className="curriculum-badge">✅ Completed</span>
                )}
                {categoryLocks.locked && (
                  <span className="curriculum-badge locked">🔒 Locked</span>
                )}
              </div>

              {/* Topic List */}
              <div className="topic-grid">
                {category.topics.map((topic, topicIndex) => {
                  const topicLocks = categoryLocks.topics[topicIndex];

                  const topicStats = getTopicStats(
                    progress,
                    category.id,
                    topic,
                    isBuilt
                  );

                  return (
                    <div
                      key={topic.id}
                      className={`topic-card ${
                        topicLocks.locked
                          ? "locked"
                          : topicLocks.complete
                            ? "completed"
                            : ""
                      }`}
                    >
                      <div className="topic-card-header">
                        <h3 className="topic-title">{topic.name}</h3>
                        {topicLocks.unbuilt && !topicLocks.locked && (
                          <span className="topic-badge soon">
                            🚧 Coming soon
                          </span>
                        )}

                        {hydrated && topicStats.total > 0 && (
                          <span className="topic-count">
                            {topicStats.completed}/{topicStats.total}
                          </span>
                        )}

                        {topicLocks.locked && (
                          <span className="topic-badge locked">🔒</span>
                        )}
                        {topicLocks.complete && (
                          <span className="topic-badge">✅</span>
                        )}
                      </div>

                      {/* Challenges. Rendered for locked topics too: hiding
                          them left a locked topic as a bare padlock, with no
                          sign of what it contains or how much of it there is.
                          Each one still renders locked and unclickable. */}
                      <div className="challenge-grid">
                        {topic.challenges.map((challenge, challengeIndex) => {
                          const challengeLocks =
                            topicLocks.challenges[challengeIndex];

                          return challengeLocks.missing &&
                            !challengeLocks.locked ? (
                            <button
                              key={challenge.id}
                              className="skill-btn soon-btn"
                              disabled
                              title="This challenge hasn't been built yet"
                            >
                              {challenge.title} 🚧
                            </button>
                          ) : challengeLocks.locked ? (
                            <button
                              key={challenge.id}
                              className="skill-btn locked-btn"
                              disabled
                            >
                              {challenge.title} 🔒
                            </button>
                          ) : (
                            <Link
                              key={challenge.id}
                              className={`skill-btn ${
                                challengeLocks.completed ? "completed-btn" : ""
                              }`}
                              to={`/year/${year}/${subject}/problem/${category.id}/${topic.id}/${challenge.id}`}
                            >
                              {challenge.title}{" "}
                              {challengeLocks.completed && "✅"}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default CurriculumPage;
