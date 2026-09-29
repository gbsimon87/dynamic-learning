import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { buildCelebrationSteps } from "../../data/celebrationSteps";
import { peekMessage, rememberMessage } from "../../data/celebrationMessages";
import { playCue } from "./sound/player";
import { playEffect } from "./fx/effects";
import HeadlineStep from "./steps/HeadlineStep";
import ProgressStep from "./steps/ProgressStep";
import StickerStep from "./steps/StickerStep";
import BadgeStep from "./steps/BadgeStep";
import UnlockStep from "./steps/UnlockStep";
import CertificateStep from "./steps/CertificateStep";
import "./CompletionCelebration.css";

const STEP_COMPONENTS = {
  headline: HeadlineStep,
  progress: ProgressStep,
  sticker: StickerStep,
  badge: BadgeStep,
  unlock: UnlockStep,
  certificate: CertificateStep,
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
    }),
    [result, badges, sticker, yearBefore, yearAfter]
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

  const step = steps[stepIndex];
  const StepContent = STEP_COMPONENTS[step.type] ?? NextStep;
  const awardedSomething = badges.length > 0 || Boolean(sticker?.earned && result.earned.includes("topic"));

  useEffect(() => {
    rememberMessage(result.level, headline.id);
  }, [result.level, headline.id]);

  useEffect(() => {
    headingRef.current?.focus();
    // StrictMode runs effects twice in development; the particles are safe to
    // restart, a doubled fanfare is not.
    if (cuedStepRef.current !== stepIndex) {
      cuedStepRef.current = stepIndex;
      if (step.cue) playCue(step.cue);
    }
    return playEffect(step.effect, { origin: focalRef.current });
  }, [stepIndex, step]);

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
