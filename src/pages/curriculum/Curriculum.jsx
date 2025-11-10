import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { year2MathCurriculum } from "../../data/year2MathCurriculum";
import './Curriculum.css';

function Curriculum({ year = 2, subject = "math" }) {
  const [progress, setProgress] = useState({});

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem(`${subject}Progress_year${year}`);
    if (saved) setProgress(JSON.parse(saved));
  }, [year, subject]);

  // Save progress
  useEffect(() => {
    localStorage.setItem(`${subject}Progress_year${year}`, JSON.stringify(progress));
  }, [progress, year, subject]);

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
      <h2>📘 Year {year} {subject.charAt(0).toUpperCase() + subject.slice(1)} Curriculum</h2>

      {year2MathCurriculum.map((category, catIndex) => {
        const categoryLocked =
          catIndex > 0 &&
          !isCategoryComplete(year2MathCurriculum[catIndex - 1]);

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
                    topicIndex > 0 &&
                    !isTopicComplete(
                      category.id,
                      category.topics[topicIndex - 1].id,
                      category.topics[topicIndex - 1]
                    );

                  const topicComplete = isTopicComplete(category.id, topic.id, topic);

                  return (
                    <li key={topic.id} className="topic-block">
                      <div
                        className={`topic-header ${
                          topicLocked ? "locked" : topicComplete ? "completed" : ""
                        }`}
                      >
                        {topic.name}{" "}
                        {topicLocked
                          ? "🔒"
                          : topicComplete
                          ? "✅"
                          : ""}
                      </div>

                      {!topicLocked && (
                        <ul className="challenge-list">
                          {topic.challenges.map((challenge, challengeIndex) => {
                            const challengeKey = `${category.id}-${topic.id}-${challenge.id}`;
                            const completedChallenges =
                              progress[category.id]?.topics?.[topic.id]?.completedChallenges ||
                              [];

                            const challengeLocked =
                              challengeIndex > 0 &&
                              !completedChallenges.includes(
                                topic.challenges[challengeIndex - 1].id
                              );

                            const isCompleted = completedChallenges.includes(challenge.id);

                            return (
                              <li
                                key={challenge.id}
                                className={`challenge-item ${
                                  challengeLocked
                                    ? "locked"
                                    : isCompleted
                                    ? "completed"
                                    : ""
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
                                    {challenge.title}{" "}
                                    {isCompleted && "✅"}
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