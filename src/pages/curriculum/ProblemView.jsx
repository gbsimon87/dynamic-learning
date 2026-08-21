import { useNavigate, useParams } from "react-router";
import { useState, useRef, useEffect } from "react";
import Challenge from "./Challenge";
import { useProgress } from "../../hooks/useProgress";
import "./ProblemView.css";

function ProblemView() {
  const { year, subject, categoryId, topicId, challengeId } = useParams();
  const navigate = useNavigate();
  const { isChallengeComplete, completeChallenge } = useProgress(year, subject);

  const [justCompleted, setJustCompleted] = useState(false);

  const completed =
    justCompleted || isChallengeComplete(categoryId, topicId, challengeId);

  // Tracked so Back doesn't get overridden by a pending navigation.
  const navigateTimerRef = useRef(null);

  useEffect(
    () => () => {
      if (navigateTimerRef.current) clearTimeout(navigateTimerRef.current);
    },
    []
  );

  const handleComplete = () => {
    // Idempotent: a double-submit must not navigate twice.
    if (navigateTimerRef.current) return;

    completeChallenge(categoryId, topicId, challengeId);
    setJustCompleted(true);

    navigateTimerRef.current = setTimeout(() => {
      navigateTimerRef.current = null;
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
