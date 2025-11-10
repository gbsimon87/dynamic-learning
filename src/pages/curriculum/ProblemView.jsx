import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import Challenge from "./Challenge";
import "./ProblemView.css";

function ProblemView() {
  const { year, subject, categoryId, topicId, challengeId } = useParams();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

  // Load current challenge completion state
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(`${subject}Progress_year${year}`) || "{}");
    const completedChallenges =
      saved[categoryId]?.topics?.[topicId]?.completedChallenges || [];
    setCompleted(completedChallenges.includes(Number(challengeId)));
  }, [categoryId, topicId, challengeId, year, subject]);

  const handleComplete = () => {
    const saved = JSON.parse(localStorage.getItem(`${subject}Progress_year${year}`) || "{}");
    const existingTopic = saved[categoryId]?.topics?.[topicId] || {};
    const updated = {
      ...saved,
      [categoryId]: {
        ...saved[categoryId],
        topics: {
          ...saved[categoryId]?.topics,
          [topicId]: {
            ...existingTopic,
            completedChallenges: [
              ...(existingTopic.completedChallenges || []),
              Number(challengeId),
            ],
          },
        },
      },
    };
    localStorage.setItem(`${subject}Progress_year${year}`, JSON.stringify(updated));
    setCompleted(true);
    setTimeout(() => navigate("/", { state: { view: "Curriculum" } }), 1000);
  };

  return (
    <div className="problem-page">
      <h2>🧩 Challenge {challengeId}</h2>
      <p>This page dynamically loads each challenge.</p>

      {completed ? (
        <p>✅ You’ve already completed this challenge!</p>
      ) : (
        <Challenge
          challengeId={challengeId}
          onComplete={handleComplete}
        />
      )}
    </div>
  );
}

export default ProblemView;
