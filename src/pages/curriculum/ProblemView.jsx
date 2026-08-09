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
    const completedChallenges = existingTopic.completedChallenges || [];

    // ✅ Only add if not already completed
    if (!completedChallenges.includes(Number(challengeId))) {
      const updatedCompleted = [...completedChallenges, Number(challengeId)];

      const updated = {
        ...saved,
        [categoryId]: {
          ...saved[categoryId],
          topics: {
            ...saved[categoryId]?.topics,
            [topicId]: {
              ...existingTopic,
              completedChallenges: updatedCompleted,
            },
          },
        },
      };

      localStorage.setItem(`${subject}Progress_year${year}`, JSON.stringify(updated));
      setCompleted(true);
    }

    // ✅ Navigate back after a short delay
    setTimeout(() => {
      navigate(`/curriculum/year/${year}/${subject}`);
    }, 1000);
  };

  return (
    <div className="problem-page">
      <h2>🧩 Challenge {challengeId}</h2>

      {completed && (
        <p className="replay-info">
          ✅ You’ve already completed this challenge — but you can try again for practice!
        </p>
      )}

      <Challenge
        challengeId={challengeId}
        onComplete={handleComplete}
        alreadyCompleted={completed}
      />
    </div>
  );
}

export default ProblemView;
