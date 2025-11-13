import { useParams, useNavigate } from "react-router";
import { useEffect, useState, Suspense } from "react";
import "./Challenge.css";

/**
 * Dynamically loads a challenge component based on route parameters:
 * - subject
 * - year
 * - topicId
 * - challengeId
 *
 * Example expected path:
 * src/pages/skills/math/challenges/year2/numbers-and-counting/NumbersAndCountingChallenge1.jsx
 */
function Challenge({ onComplete }) {
  const { subject, year, topicId, challengeId } = useParams();
  const navigate = useNavigate();

  const [ChallengeComponent, setChallengeComponent] = useState(null);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(3); // 3-second countdown

  useEffect(() => {
    let isMounted = true;

    async function loadChallenge() {
      try {
        // Construct dynamic import path
        const path = `../skills/${subject}/challenges/year${year}/${topicId}/${capitalizeTopicId(
          topicId
        )}Challenge${challengeId}.jsx`;

        // Dynamic import
        const module = await import(/* @vite-ignore */ path);
        if (isMounted) setChallengeComponent(() => module.default);
      } catch (err) {
        console.error("Failed to load challenge:", err);
        if (isMounted) setError(err);
      }
    }

    loadChallenge();
    return () => {
      isMounted = false;
    };
  }, [subject, year, topicId, challengeId]);

  // Helper: turn "numbers-and-counting" → "NumbersAndCounting"
  function capitalizeTopicId(id) {
    return id
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  }

  // ⏱ Countdown + redirect logic
  useEffect(() => {
    if (!error) return;
    if (countdown <= 0) {
      navigate("/curriculum");
      return;
    }
    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, error, navigate]);

  if (error) {
    return (
      <div className="challenge-error">
        <h3>Challenge {challengeId}</h3>
        <p>⚠️ This challenge is not yet available.</p>
        <p>Redirecting you back to the Curriculum in {countdown}...</p>
      </div>
    );
  }

  if (!ChallengeComponent) {
    return (
      <div className="challenge-loading">
        <p>Loading challenge...</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<p>Loading challenge...</p>}>
      <ChallengeComponent onComplete={onComplete} />
    </Suspense>
  );
}

export default Challenge;
