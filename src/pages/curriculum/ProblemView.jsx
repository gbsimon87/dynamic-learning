import { Link, useParams } from "react-router";
import { useState } from "react";
import Challenge from "./Challenge";
import { useProgress } from "../../hooks/useProgress";
import { loadCurriculum } from "../../data/curriculumRegistry";
import { isChallengeImplemented } from "../../data/challengeAvailability";
import { buildLockState } from "../../data/curriculumLocks";
import { findNextChallenge } from "../../data/curriculumNavigation";
import { shouldBypassLocks } from "../../data/devUnlock";
import "./ProblemView.css";

function ProblemView() {
  const { year, subject, categoryId, topicId, challengeId } = useParams();
  const { progress, hydrated, isChallengeComplete, completeChallenge } =
    useProgress(year, subject);

  // Which challenge the completion panel belongs to. "Next challenge" keeps
  // this component mounted and only changes the route params, so a plain
  // boolean would leave the panel showing over the challenge just opened.
  const positionKey = `${categoryId}/${topicId}/${challengeId}`;
  const [completedPosition, setCompletedPosition] = useState(null);
  const justCompleted = completedPosition === positionKey;

  const alreadyCompleted = isChallengeComplete(categoryId, topicId, challengeId);

  const topicsHref = `/curriculum/year/${year}/${subject}`;

  const handleComplete = () => {
    // Idempotent: the reducer ignores a repeat, so a double-submit can't
    // duplicate the entry.
    completeChallenge(categoryId, topicId, challengeId);
    setCompletedPosition(positionKey);
  };

  // Where to go next. Computed from the SAME lock state the curriculum screen
  // renders, and read after `completeChallenge` has updated `progress` — so the
  // challenge just finished counts towards unlocking the one being offered.
  // Un-hydrated progress would read as "nothing completed" and resolve to no
  // next challenge, so don't offer a destination until the real document is in.
  const curriculum = loadCurriculum(year, subject);
  const next = hydrated && curriculum
    ? findNextChallenge(
        buildLockState({
          curriculum,
          progress,
          isBuilt: (topic, challenge) =>
            isChallengeImplemented(subject, year, topic, challenge),
          bypassLocks: shouldBypassLocks(import.meta.env),
        }),
        { categoryId, topicId, challengeId }
      )
    : null;

  if (justCompleted) {
    return (
      <div className="problem-page">
        <div className="challenge-complete" role="status" aria-live="polite">
          <p className="challenge-complete-title">🎉 Challenge complete!</p>

          {next ? (
            <>
              <Link
                className="challenge-next-btn"
                to={`/year/${year}/${subject}/problem/${next.categoryId}/${next.topicId}/${next.challengeId}`}
              >
                Next challenge →
              </Link>
              <Link className="challenge-back-link" to={topicsHref}>
                Back to topics
              </Link>
            </>
          ) : (
            <>
              {/* Nothing playable ahead: the end of the curriculum, or the
                  next step isn't built yet. Don't offer a dead link. */}
              {hydrated && (
                <p className="challenge-complete-note">
                  That&rsquo;s everything available for now — brilliant work!
                </p>
              )}
              <Link className="challenge-next-btn" to={topicsHref}>
                Back to topics
              </Link>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="problem-page">
      <h2>🧩 Challenge {challengeId}</h2>

      {alreadyCompleted && (
        <p className="replay-info">
          ✅ You’ve already completed this challenge — but you can try again for
          practice!
        </p>
      )}

      <Challenge
        challengeId={challengeId}
        onComplete={handleComplete}
        alreadyCompleted={alreadyCompleted}
      />
    </div>
  );
}

export default ProblemView;
