import { Link, useParams, useNavigate } from "react-router";
import { useCallback, useEffect, useState, Suspense } from "react";
import "./Challenge.css";

/**
 * Every challenge module, resolved at build time.
 *
 * This must be a static glob: Vite can only bundle dynamic imports it can
 * analyse. A fully-variable `import(path)` compiles to a bare runtime import
 * of a source path that does not exist in a production build, so challenges
 * would 404 once built.
 *
 * Keys look like:
 * ../skills/math/challenges/year2/numbers-and-counting/NumbersAndCountingChallenge1.jsx
 */
const challengeModules = import.meta.glob(
  "../skills/*/challenges/year*/*/*Challenge*.jsx"
);

/** Turn "numbers-and-counting" → "NumbersAndCounting". */
function capitalizeTopicId(id) {
  return id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

/**
 * Dynamically loads a challenge component from the route parameters.
 *
 * Two failures are possible here and they are NOT the same thing:
 *
 *   "missing"  no module is registered for this topic/challenge — the challenge
 *              genuinely isn't built. Permanent, so saying so and returning the
 *              learner to the curriculum is right.
 *   "failed"   the module exists but couldn't be fetched or evaluated, e.g. the
 *              dev server went away or the network dropped mid-session, since
 *              challenges are lazy-loaded on demand. Temporary — telling a child
 *              the challenge "is not yet available" and ejecting them from a
 *              challenge they can actually play is simply wrong, so this offers
 *              a retry and stays put.
 */
function Challenge({ onComplete }) {
  const { subject, year, topicId, challengeId } = useParams();
  const navigate = useNavigate();

  const [ChallengeComponent, setChallengeComponent] = useState(null);
  const [failure, setFailure] = useState(null); // null | "missing" | "failed"
  const [countdown, setCountdown] = useState(3);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let isMounted = true;

    // Reset per attempt: without this a single failure stuck to the component
    // and every later challenge inherited the error screen.
    setChallengeComponent(null);
    setFailure(null);
    setCountdown(3);

    const path = `../skills/${subject}/challenges/year${year}/${topicId}/${capitalizeTopicId(
      topicId
    )}Challenge${challengeId}.jsx`;

    const loader = challengeModules[path];
    if (!loader) {
      console.error(`No challenge module registered at ${path}`);
      if (isMounted) setFailure("missing");
      return () => {
        isMounted = false;
      };
    }

    loader()
      .then((module) => {
        if (isMounted) setChallengeComponent(() => module.default);
      })
      .catch((err) => {
        // The module IS registered, so this is a fetch/evaluate problem.
        console.error("Failed to load challenge:", err);
        if (isMounted) setFailure("failed");
      });

    return () => {
      isMounted = false;
    };
  }, [subject, year, topicId, challengeId, attempt]);

  // Countdown back to the curriculum — only for a challenge that does not exist.
  useEffect(() => {
    if (failure !== "missing") return;
    if (countdown <= 0) {
      navigate(`/curriculum/year/${year}/${subject}`);
      return;
    }
    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, failure, navigate, year, subject]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  if (failure === "missing") {
    return (
      <div className="challenge-error">
        <h3>Challenge {challengeId}</h3>
        <p>⚠️ This challenge is not yet available.</p>
        <p>Redirecting you back to the Curriculum in {countdown}...</p>
      </div>
    );
  }

  if (failure === "failed") {
    return (
      <div className="challenge-error">
        <h3>Challenge {challengeId}</h3>
        <p>😕 We couldn&rsquo;t load this challenge just now.</p>
        <p className="challenge-error-hint">
          Check your connection and try again — your progress is safe.
        </p>
        <div className="challenge-error-actions">
          <button type="button" className="challenge-retry-btn" onClick={retry}>
            Try again
          </button>
          <Link
            className="challenge-error-link"
            to={`/curriculum/year/${year}/${subject}`}
          >
            Back to topics
          </Link>
        </div>
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
