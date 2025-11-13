import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { year2MathCurriculum } from "../../data/year2MathCurriculum";
import "./Curriculum.css";

function Curriculum({ year = 2, subject = "math" }) {
  const location = useLocation();
  const storageKey = `${subject}Progress_year${year}`;

  // Track whether we've loaded from storage to avoid overwriting with {}
  const [hydrated, setHydrated] = useState(false);

  // Initialize with whatever is currently in storage (prevents a flash),
  // but we'll still fully re-hydrate below when storageKey or navigation changes.
  const [progress, setProgress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch {
      return {};
    }
  });

  // ✅ Re-hydrate on first mount AND whenever the storageKey or location changes
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
      setProgress(saved || {});
    } catch {
      setProgress({});
    }
    setHydrated(true);
  }, [storageKey, location.key]);

  // ✅ Only save AFTER we’ve hydrated (prevents writing `{}` over real data)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(progress));
    } catch {
      // no-op (storage might be unavailable)
    }
  }, [progress, storageKey, hydrated]);

  const isFirstTimeUser = hydrated && Object.keys(progress).length === 0;

  const isTopicComplete = (categoryId, topicId, topic) => {
    const topicProgress = progress[categoryId]?.topics?.[topicId];
    return (
      topicProgress &&
      topicProgress.completedChallenges?.length === topic.challenges.length
    );
  };

  const isCategoryComplete = (category) => {
    return category.topics.every((topic) =>
      isTopicComplete(category.id, topic.id, topic)
    );
  };

  return (
    <div className="curriculum-page">
      <h2>
        📘 Year {year} {subject.charAt(0).toUpperCase() + subject.slice(1)} Curriculum
      </h2>

      {year2MathCurriculum.map((category, catIndex) => {
        const categoryLocked =
          (isFirstTimeUser && catIndex > 0) ||
          (catIndex > 0 && !isCategoryComplete(year2MathCurriculum[catIndex - 1]));

        return (
          <div
            key={category.id}
            className={`curriculum-category ${categoryLocked ? "locked" : ""}`}
          >
            <h3>
              {category.title} {isCategoryComplete(category) && "✅"}
            </h3>
            <ul>
              {category.topics.map((topic, topicIndex) => {
                const topicLocked =
                  (isFirstTimeUser && (catIndex > 0 || topicIndex > 0)) ||
                  (topicIndex > 0 &&
                    !isTopicComplete(
                      category.id,
                      category.topics[topicIndex - 1].id,
                      category.topics[topicIndex - 1]
                    ));

                const topicComplete = isTopicComplete(category.id, topic.id, topic);

                return (
                  <li key={topic.id} className="topic-block">
                    <div
                      className={`topic-header ${
                        topicLocked ? "locked" : topicComplete ? "completed" : ""
                      }`}
                    >
                      {topic.name} {topicLocked ? "🔒" : topicComplete ? "✅" : ""}
                    </div>

                    {!topicLocked && (
                      <ul className="challenge-list">
                        {topic.challenges.map((challenge, challengeIndex) => {
                          const completedChallenges =
                            progress[category.id]?.topics?.[topic.id]?.completedChallenges || [];

                          const challengeLocked =
                            (isFirstTimeUser &&
                              (catIndex > 0 || topicIndex > 0 || challengeIndex > 0)) ||
                            (challengeIndex > 0 &&
                              !completedChallenges.includes(
                                topic.challenges[challengeIndex - 1].id
                              ));

                          const isCompleted = completedChallenges.includes(challenge.id);

                          return (
                            <li
                              key={challenge.id}
                              className={`challenge-item ${
                                challengeLocked ? "locked" : isCompleted ? "completed" : ""
                              }`}
                            >
                              {challengeLocked ? (
                                <span>{challenge.title} 🔒</span>
                              ) : (
                                <Link
                                  to={`/year/${year}/${subject}/problem/${category.id}/${topic.id}/${challenge.id}`}
                                  state={{
                                    categoryId: category.id,
                                    topicId: topic.id,
                                    challengeId: challenge.id,
                                    year,
                                    subject,
                                  }}
                                >
                                  {challenge.title} {isCompleted && "✅"}
                                </Link>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default Curriculum;
