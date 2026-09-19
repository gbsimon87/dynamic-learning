import { useParams } from "react-router";
import { useState } from "react";
import Challenge from "./Challenge";
import CompletionCelebration from "../../components/celebration/CompletionCelebration";
import { useProgress } from "../../hooks/useProgress";
import {
  CURRICULUM_SUBJECTS,
  getSubjectName,
  isCurriculumAvailable,
  loadCurriculum,
} from "../../data/curriculumRegistry";
import { isChallengeImplemented } from "../../data/challengeAvailability";
import { buildLockState } from "../../data/curriculumLocks";
import { findNextChallenge } from "../../data/curriculumNavigation";
import { getCompletionMilestones } from "../../data/completionMilestones";
import { useRewards } from "../../hooks/useRewards";
import { shouldBypassLocks } from "../../data/devUnlock";
import "./ProblemView.css";

function ProblemView() {
  const { year, subject, categoryId, topicId, challengeId } = useParams();
  const { award } = useRewards();
  const { progress, hydrated, isChallengeComplete, completeChallenge } =
    useProgress(year, subject);

  // Which challenge the completion panel belongs to. "Next challenge" keeps
  // this component mounted and only changes the route params, so a plain
  // boolean would leave the panel showing over the challenge just opened.
  const positionKey = `${year}/${subject}/${categoryId}/${topicId}/${challengeId}`;
  const [completion, setCompletion] = useState(null);
  const justCompleted = completion?.positionKey === positionKey;

  const alreadyCompleted = isChallengeComplete(categoryId, topicId, challengeId);

  const topicsHref = `/curriculum/year/${year}/${subject}`;
  const curriculum = loadCurriculum(year, subject);
  const isBuilt = (topic, challenge) =>
    isChallengeImplemented(subject, year, topic, challenge);

  const handleComplete = () => {
    if (!hydrated) return;
    const result = getCompletionMilestones({
      curriculum,
      progress,
      categoryId,
      topicId,
      challengeId,
      isBuilt,
      isOnlySubjectInYear: CURRICULUM_SUBJECTS.filter((item) =>
        isCurriculumAvailable(year, item.id)
      ).length === 1,
    });
    // Idempotent: the reducer ignores a repeat, so a double-submit can't
    // duplicate the entry.
    completeChallenge(categoryId, topicId, challengeId);

    // Badges ride on the SAME milestones the celebration already reports, so a
    // badge can never be awarded for something the panel does not announce.
    // `result.earned` is empty for an already-complete challenge, which is what
    // makes replaying one award nothing.
    const badges = award(result.earned, { year, subject });

    setCompletion({ positionKey, result, badges });
  };

  // Where to go next. Computed from the SAME lock state the curriculum screen
  // renders, and read after `completeChallenge` has updated `progress` — so the
  // challenge just finished counts towards unlocking the one being offered.
  // Un-hydrated progress would read as "nothing completed" and resolve to no
  // next challenge, so don't offer a destination until the real document is in.
  const next = hydrated && curriculum
    ? findNextChallenge(
        buildLockState({
          curriculum,
          progress,
          isBuilt,
          bypassLocks: shouldBypassLocks(import.meta.env),
        }),
        { categoryId, topicId, challengeId }
      )
    : null;

  if (justCompleted) {
    return (
      <CompletionCelebration
        result={completion.result}
        badges={completion.badges}
        year={year}
        subjectName={getSubjectName(subject)}
        nextHref={next && `/year/${year}/${subject}/problem/${next.categoryId}/${next.topicId}/${next.challengeId}`}
        topicsHref={topicsHref}
      />
    );
  }

  if (!hydrated) {
    return <div className="problem-page" role="status">Loading your progress…</div>;
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
