import { Link, Navigate, useParams } from "react-router";
import {
  getSubjectName,
  isCurriculumAvailable,
  loadCurriculum,
} from "../../data/curriculumRegistry";
import { useProgress } from "../../hooks/useProgress";
import {
  isChallengeImplemented,
  isTopicUnbuilt,
} from "../../data/challengeAvailability";
import "./CurriculumPage.css";
import "./CurriculumSelectPage.css";

function CurriculumPage() {
  const params = useParams();
  const year = Number(params.year);
  const subject = params.subject;

  const {
    progress,
    hydrated,
    isTopicComplete,
    isChallengeUnlocked,
    isCategoryComplete,
    isCategoryPassable,
  } = useProgress(year, subject);

  // Unknown or not-yet-built year/subject → back to the picker
  if (!isCurriculumAvailable(year, subject)) {
    return <Navigate to="/curriculum" replace />;
  }

  const curriculum = loadCurriculum(year, subject);

  const isFirstTimeUser = hydrated && Object.keys(progress).length === 0;

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
        <Link to="/curriculum" className="curriculum-change-link">
          ← Change year or subject
        </Link>
      </section>

      {/* Category Cards Grid */}
      <div className="curriculum-grid">
        {curriculum.map((category, catIndex) => {
          // Unbuilt topics must not count against their category.
          const skipUnbuilt = (topic) =>
            isTopicUnbuilt(subject, year, topic.id, topic.challenges);

          // Every earlier category must be passable, not just the previous one:
          // an empty category reports passable, which would reopen the chain.
          const categoryLocked =
            (isFirstTimeUser && catIndex > 0) ||
            curriculum
              .slice(0, catIndex)
              .some((earlier) => !isCategoryPassable(earlier, skipUnbuilt));

          return (
            <section
              key={category.id}
              className={`curriculum-card ${categoryLocked ? "locked" : ""}`}
            >
              <div className="curriculum-card-header">
                <h2 className="curriculum-card-title">
                  {category.title}
                </h2>
                {isCategoryComplete(category, skipUnbuilt) && (
                  <span className="curriculum-badge">✅ Completed</span>
                )}
                {categoryLocked && (
                  <span className="curriculum-badge locked">🔒 Locked</span>
                )}
              </div>

              {/* Topic List */}
              <div className="topic-grid">
                {category.topics.map((topic, topicIndex) => {
                  // An unbuilt topic can't be completed, so it must not gate
                  // the next one.
                  const previousTopic =
                    topicIndex > 0 ? category.topics[topicIndex - 1] : null;
                  const previousBlocks =
                    previousTopic &&
                    !isTopicUnbuilt(
                      subject,
                      year,
                      previousTopic.id,
                      previousTopic.challenges
                    ) &&
                    !isTopicComplete(
                      category.id,
                      previousTopic.id,
                      previousTopic
                    );

                  const topicUnbuilt = isTopicUnbuilt(
                    subject,
                    year,
                    topic.id,
                    topic.challenges
                  );

                  const topicLocked = categoryLocked || Boolean(previousBlocks);

                  const topicComplete = isTopicComplete(
                    category.id,
                    topic.id,
                    topic
                  );

                  return (
                    <div
                      key={topic.id}
                      className={`topic-card ${
                        topicLocked ? "locked" : topicComplete ? "completed" : ""
                      }`}
                    >
                      <div className="topic-card-header">
                        <h3 className="topic-title">{topic.name}</h3>
                        {topicUnbuilt && !topicLocked && (
                          <span className="topic-badge soon">🚧 Coming soon</span>
                        )}

                        {topicLocked && <span className="topic-badge locked">🔒</span>}
                        {topicComplete && <span className="topic-badge">✅</span>}
                      </div>

                      {/* Challenges */}
                      {!topicLocked && (
                        <div className="challenge-grid">
                          {topic.challenges.map((challenge, challengeIndex) => {
                            const completedChallenges =
                              progress[category.id]?.topics?.[topic.id]
                                ?.completedChallenges || [];

                            // Open once everything before it is done, or if
                            // already done itself.
                            const challengeLocked =
                              categoryLocked ||
                              topicLocked ||
                              !(
                                completedChallenges.includes(challenge.id) ||
                                isChallengeUnlocked(
                                  category.id,
                                  topic.id,
                                  topic,
                                  challengeIndex,
                                  (c) =>
                                    !isChallengeImplemented(
                                      subject,
                                      year,
                                      topic.id,
                                      c.id
                                    )
                                )
                              );

                            // Not built yet: don't link to a dead page.
                            const challengeMissing = !isChallengeImplemented(
                              subject,
                              year,
                              topic.id,
                              challenge.id
                            );

                            const isCompleted =
                              completedChallenges.includes(challenge.id);

                            return challengeMissing && !challengeLocked ? (
                              <button
                                key={challenge.id}
                                className="skill-btn soon-btn"
                                disabled
                                title="This challenge hasn't been built yet"
                              >
                                {challenge.title} 🚧
                              </button>
                            ) : challengeLocked ? (
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
                                className={`skill-btn ${isCompleted ? "completed-btn" : ""}`}
                                to={`/year/${year}/${subject}/problem/${category.id}/${topic.id}/${challenge.id}`}
                              >
                                {challenge.title} {isCompleted && "✅"}
                              </Link>
                            );
                          })}
                        </div>
                      )}
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
