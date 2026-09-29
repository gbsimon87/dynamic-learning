import { useEffect, useState } from "react";
import ProgressRing from "../../ProgressRing";
import { playCue } from "../sound/player";

/**
 * How far this completion moved the whole year: the ring starts where the
 * child was and fills to where they are now, so the step reads as progress,
 * not just a number.
 */
export default function ProgressStep({ step, year, subjectName, headingRef, focalRef }) {
  const [shown, setShown] = useState(step.from);

  useEffect(() => {
    // The shimmer plays as the ring starts to move, not when the step opens.
    const timer = window.setTimeout(() => {
      setShown(step.to);
      playCue("progress");
    }, 650);
    return () => window.clearTimeout(timer);
  }, [step.to]);

  const gained = step.to - step.from;

  return (
    <>
      <p className="completion-celebration-eyebrow">Your progress</p>
      <h2 ref={headingRef} tabIndex={-1}>Look how far you’ve come!</h2>

      <div className="celebration-progress" ref={focalRef}>
        <ProgressRing
          percent={shown}
          prefix="cs-ring"
          label={`${step.to}% of Year ${year} ${subjectName} complete`}
        />
      </div>

      <p className="completion-celebration-message">
        {step.completed} of {step.total} Year {year} {subjectName} challenges done.
      </p>
      {gained > 0 && (
        <p className="celebration-chip">+{gained}% today</p>
      )}
    </>
  );
}
