import { useParams } from "react-router";
import { useContext, useEffect, useRef, useState } from "react";
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
import { AuthContext } from "../../context/auth-context";
import { completeChallenge as withChallengeComplete } from "../../data/progressRules";
import { getYearStats } from "../../data/curriculumProgressStats";
import { topicSticker } from "../../data/stickers";
import { preloadSounds } from "../../components/celebration/sound/player";
import { localDay, weekDots } from "../../data/streak";
import { stickerKey } from "../../data/news";
import { shouldBypassLocks } from "../../data/devUnlock";
import "./ProblemView.css";

function ProblemView() {
  const { year, subject, categoryId, topicId, challengeId } = useParams();
  const { award } = useRewards();
  const childName = useContext(AuthContext)?.child?.name;

  // Sounds only ever play in a challenge, so this is where they download.
  useEffect(() => preloadSounds(), []);
  const { progress, hydrated, isChallengeComplete, completeChallenge } =
    useProgress(year, subject);

  // Which challenge the completion panel belongs to. "Next challenge" keeps
  // this component mounted and only changes the route params, so a plain
  // boolean would leave the panel showing over the challenge just opened.
  const positionKey = `${year}/${subject}/${categoryId}/${topicId}/${challengeId}`;
  const [completion, setCompletion] = useState(null);
  const justCompleted = completion?.positionKey === positionKey;

  // One award per run: XP is additive, so a second call must never count.
  // A ref, not state: two calls in the same tick would both see stale state.
  // It resets whenever the challenge changes, so Next → Back → play again is
  // a genuine new run and is awarded.
  const awardedKeyRef = useRef(null);
  useEffect(() => {
    awardedKeyRef.current = null;
  }, [positionKey]);

  const alreadyCompleted = isChallengeComplete(categoryId, topicId, challengeId);

  const topicsHref = `/curriculum/year/${year}/${subject}`;
  const curriculum = loadCurriculum(year, subject);
  const isBuilt = (topic, challenge) =>
    isChallengeImplemented(subject, year, topic, challenge);

  const handleComplete = (run = {}) => {
    if (!hydrated) return;
    if (awardedKeyRef.current === positionKey) return;
    awardedKeyRef.current = positionKey;
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

    // What the celebration shows about the year and the topic's sticker. Pure
    // reads: `withChallengeComplete` is the reducer run on a copy to see the
    // "after" state — the hook call above is still the only write.
    let extras = {};
    if (result.earned.length > 0) {
      const after = withChallengeComplete(progress, categoryId, topicId, challengeId);
      const topic = curriculum
        ?.find((category) => category.id === categoryId)
        ?.topics.find((item) => item.id === topicId);
      extras = {
        yearBefore: getYearStats(progress, curriculum, isBuilt),
        yearAfter: getYearStats(after, curriculum, isBuilt),
        sticker: topic ? topicSticker(after, categoryId, topic, isBuilt) : null,
      };
    }

    const stickerWon =
      result.earned.includes("topic") && extras.sticker?.earned
        ? stickerKey(year, subject, topicId)
        : null;

    // Badges ride on the SAME milestones the celebration already reports, so a
    // badge can never be awarded for something the panel does not announce.
    const today = localDay();
    const gained = award({
      earned: result.earned,
      firstTime: result.earned.length > 0,
      combos: run?.combos ?? 0,
      sticker: stickerWon,
      today,
      at: new Date().toISOString(),
      year,
      subject,
    });

    setCompletion({
      positionKey,
      result,
      badges: gained?.awarded ?? [],
      ...extras,
      xp: gained && {
        gained: gained.xpGained,
        total: gained.xpTotal,
        capped: gained.practiceCapped,
      },
      levelUp: gained && gained.levelAfter > gained.levelBefore ? gained.levelAfter : null,
      streak:
        gained && gained.streakOutcome !== "none"
          ? {
              outcome: gained.streakOutcome,
              current: gained.streak.current,
              usedFreezes: gained.usedFreezes,
              dots: weekDots(gained.streak, today),
            }
          : null,
    });
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
        sticker={completion.sticker}
        yearBefore={completion.yearBefore}
        yearAfter={completion.yearAfter}
        xp={completion.xp}
        levelUp={completion.levelUp}
        streak={completion.streak}
        childName={childName}
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
