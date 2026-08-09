import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router";
import {
  getSubjectName,
  isCurriculumAvailable,
  loadCurriculum,
} from "../../data/curriculumRegistry";
import "./CurriculumPage.css";
import "./CurriculumSelectPage.css";

function CurriculumPage() {
  const params = useParams();
  const year = Number(params.year);
  const subject = params.subject;
  const location = useLocation();
  const storageKey = `${subject}Progress_year${year}`;

  const [hydrated, setHydrated] = useState(false);
  const [progress, setProgress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch {
      return {};
    }
  });

  // Load storage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
      setProgress(saved || {});
    } catch {
      setProgress({});
    }
    setHydrated(true);
  }, [storageKey, location.key]);

  // Save updates
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(progress));
    } catch {
      // Storage full or unavailable — progress stays in memory for this session
    }
  }, [progress, storageKey, hydrated]);

  // Unknown or not-yet-built year/subject → back to the picker
  if (!isCurriculumAvailable(year, subject)) {
    return <Navigate to="/curriculum" replace />;
  }

  const curriculum = loadCurriculum(year, subject);

  const isFirstTimeUser = hydrated && Object.keys(progress).length === 0;

  const isTopicComplete = (categoryId, topicId, topic) => {
    const topicProgress = progress[categoryId]?.topics?.[topicId];
    return (
      topicProgress &&
      topicProgress.completedChallenges?.length === topic.challenges.length
    );
  };

  const isCategoryComplete = (category) =>
    category.topics.every((topic) =>
      isTopicComplete(category.id, topic.id, topic)
    );

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
          const categoryLocked =
            (isFirstTimeUser && catIndex > 0) ||
            (catIndex > 0 &&
              !isCategoryComplete(curriculum[catIndex - 1]));

          return (
            <section
              key={category.id}
              className={`curriculum-card ${categoryLocked ? "locked" : ""}`}
            >
              <div className="curriculum-card-header">
                <h2 className="curriculum-card-title">
                  {category.title}
                </h2>
                {isCategoryComplete(category) && (
                  <span className="curriculum-badge">✅ Completed</span>
                )}
                {categoryLocked && (
                  <span className="curriculum-badge locked">🔒 Locked</span>
                )}
              </div>

              {/* Topic List */}
              <div className="topic-grid">
                {category.topics.map((topic, topicIndex) => {
                  const topicLocked =
                    categoryLocked ||
                    (topicIndex > 0 &&
                      !isTopicComplete(
                        category.id,
                        category.topics[topicIndex - 1].id,
                        category.topics[topicIndex - 1]
                      ));

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

                            let challengeLocked;

                            // FULL LOCK PROTECTION
                            if (categoryLocked || topicLocked) {
                              challengeLocked = true;
                            } else {
                              const numCompleted = completedChallenges.length;

                              // Unlock logic
                              if (numCompleted === 0) {
                                challengeLocked = challengeIndex !== 0;
                              } else {
                                if (completedChallenges.includes(challenge.id)) {
                                  challengeLocked = false;
                                } else if (challengeIndex === numCompleted) {
                                  challengeLocked = false;
                                } else {
                                  challengeLocked = true;
                                }
                              }
                            }

                            const isCompleted =
                              completedChallenges.includes(challenge.id);

                            return challengeLocked ? (
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
