import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { buildCelebrationSteps } from "../../data/celebrationSteps";
import { wonSticker } from "../../data/stickers";
import { peekMessage, rememberMessage } from "../../data/celebrationMessages";
import { playCue } from "./sound/player";
import { playEffect } from "./fx/effects";
import HeadlineStep from "./steps/HeadlineStep";
import ProgressStep from "./steps/ProgressStep";
import StickerStep from "./steps/StickerStep";
import BadgeStep from "./steps/BadgeStep";
import UnlockStep from "./steps/UnlockStep";
import CertificateStep from "./steps/CertificateStep";
import LevelUpStep from "./steps/LevelUpStep";
import StreakStep from "./steps/StreakStep";
import "./CompletionCelebration.css";

const STEP_COMPONENTS = {
  headline: HeadlineStep,
  progress: ProgressStep,
  sticker: StickerStep,
  badge: BadgeStep,
  unlock: UnlockStep,
  certificate: CertificateStep,
  levelUp: LevelUpStep,
  streak: StreakStep,
};

function NextStep({ headingRef, focalRef }) {
  return (
    <>
      <div className="completion-celebration-medal" ref={focalRef} aria-hidden="true">
        <span>🚀</span>
      </div>
      <h2 ref={headingRef} tabIndex={-1}>Ready for more?</h2>
    </>
  );
}

/**
 * The completion celebration, played as a sequence of steps.
 *
 * `buildCelebrationSteps` decides what is shown; this plays it. Each step
 * fires its own effect and sound on arrival, takes focus on its heading, and
 * waits for "Continue" — so a badge is never tapped past unseen. "Skip" is on
 * every step for the child who just wants to keep playing. A plain challenge
 * is a single screen with the next actions on it.
 *
 * It only ANNOUNCES. Progress and badges were already written by ProblemView
 * before this mounts, so skipping or leaving mid-sequence loses nothing.
 */
export default function CompletionCelebration({
  result,
  badges = [],
  sticker = null,
  yearBefore = null,
  yearAfter = null,
  xp = null,
  levelUp = null,
  streak = null,
  year,
  subjectName,
  childName,
  nextHref,
  topicsHref,
}) {
  const steps = useMemo(
    () => buildCelebrationSteps({
      level: result.level,
      earned: result.earned,
      badges,
      sticker,
      yearBefore,
      yearAfter,
      xp,
      levelUp,
      streak,
    }),
    [result, badges, sticker, yearBefore, yearAfter, xp, levelUp, streak]
  );
  // Picked in render, recorded once shown: StrictMode runs the initialiser
  // twice, and recording inside it made the next headline repeat this one.
  const [headline] = useState(() =>
    peekMessage(result.level, { name: childName, subject: subjectName, year })
  );
  const [stepIndex, setStepIndex] = useState(0);
  const headingRef = useRef(null);
  const focalRef = useRef(null);
  const cuedStepRef = useRef(-1);
  const stopSoundRef = useRef(null);
  const pendingStopRef = useRef(null);

  const step = steps[stepIndex];
  const StepContent = STEP_COMPONENTS[step.type] ?? NextStep;
  const awardedSomething = badges.length > 0 || wonSticker(result.earned, sticker);

  useEffect(() => {
    rememberMessage(result.level, headline.id);
  }, [result.level, headline.id]);

  useEffect(() => {
    headingRef.current?.focus();
    // StrictMode runs effects twice in development; the particles are safe to
    // restart, a doubled fanfare is not. A new step fades out the last step's
    // sound, so a long fanfare never talks over the next reveal.
    if (cuedStepRef.current !== stepIndex) {
      cuedStepRef.current = stepIndex;
      stopSoundRef.current?.();
      stopSoundRef.current = step.cue ? playCue(step.cue) : null;
    }
    return playEffect(step.effect, { origin: focalRef.current });
  }, [stepIndex, step]);

  // Leaving the celebration (Next, Skip, Back) fades out whatever is playing.
  // Deferred a tick because StrictMode's dev-only remount runs this cleanup
  // straight after mount; the remount cancels it, a real unmount does not.
  useEffect(() => {
    window.clearTimeout(pendingStopRef.current);
    return () => {
      pendingStopRef.current = window.setTimeout(() => stopSoundRef.current?.(), 0);
    };
  }, []);

  const primaryHref = nextHref ?? topicsHref;

  return (
    <main className={`completion-celebration completion-celebration-${result.level}`}>
      <section
        key={stepIndex}
        className={`completion-celebration-card completion-celebration-step-${step.type}`}
        aria-label={steps.length > 1 ? `Step ${stepIndex + 1} of ${steps.length}` : undefined}
      >
        <StepContent
          step={step}
          result={result}
          headline={headline.text}
          year={year}
          subjectName={subjectName}
          childName={childName}
          headingRef={headingRef}
          focalRef={focalRef}
        />

        {step.final ? (
          <div className="completion-celebration-actions">
            <Link className="completion-celebration-primary" to={primaryHref}>
              {nextHref ? "Next challenge" : "Explore your topics"} <span aria-hidden="true">→</span>
            </Link>
            {nextHref && (
              <Link className="completion-celebration-secondary" to={topicsHref}>
                Back to topics
              </Link>
            )}
            {awardedSomething && (
              <Link className="completion-celebration-secondary" to="/trophies">
                See your trophies <span aria-hidden="true">🏆</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="completion-celebration-actions">
            <button
              type="button"
              className="completion-celebration-primary"
              onClick={() => setStepIndex((index) => Math.min(index + 1, steps.length - 1))}
            >
              Continue <span aria-hidden="true">→</span>
            </button>
            <Link className="completion-celebration-skip" to={primaryHref}>
              {nextHref ? "Skip to next challenge" : "Skip to topics"}
            </Link>
          </div>
        )}

        {steps.length > 1 && (
          <ol className="completion-celebration-dots" aria-hidden="true">
            {steps.map((item, index) => (
              <li key={index} className={index <= stepIndex ? "is-done" : ""} />
            ))}
          </ol>
        )}
      </section>
    </main>
  );
}
