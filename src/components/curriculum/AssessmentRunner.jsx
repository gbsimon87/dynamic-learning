import { useEffect, useRef, useState } from "react";
import AssessmentRound from "./AssessmentRound.jsx";
import { ASSESSMENT_SECTION_SIZE } from "../../data/curriculumJourney.js";

/**
 * Walks a saved session: first unanswered item, the read-only review of the
 * answer just saved, a short break every four questions, then Finish. All
 * position comes from the stored session, so refresh/resume lands correctly.
 */
export default function AssessmentRunner({ session, busy, actionError, conflict, onSubmit, onFinish, onReload, onLeave }) {
  const saved = session.responses.length;
  // After a resume, show the last saved answer's review once before moving on.
  const [reviewing, setReviewing] = useState(() => saved > 0 && saved < session.items.length ? saved - 1 : null);
  const [breakAt, setBreakAt] = useState(null);
  const [lastSaved, setLastSaved] = useState(saved);
  if (saved !== lastSaved) {
    setLastSaved(saved);
    if (saved > lastSaved) setReviewing(saved - 1);
  }
  const sections = Math.ceil(session.items.length / ASSESSMENT_SECTION_SIZE);
  const finishHeading = useRef(null);
  const breakHeading = useRef(null);
  const allSaved = saved === session.items.length;
  useEffect(() => { if (breakAt !== null) breakHeading.current?.focus(); }, [breakAt]);
  useEffect(() => { if (allSaved && reviewing === null) finishHeading.current?.focus(); }, [allSaved, reviewing]);

  if (reviewing !== null) {
    const item = session.items[reviewing];
    const next = () => {
      setReviewing(null);
      if (saved < session.items.length && saved % ASSESSMENT_SECTION_SIZE === 0) setBreakAt(saved);
    };
    return <AssessmentRound key={`${item.itemInstanceId}-review`} item={item} response={session.responses[reviewing]}
      number={reviewing + 1} total={session.items.length} onNext={next} nextLabel={allSaved ? "See how I did" : "Next question"} />;
  }

  if (breakAt !== null) {
    const done = breakAt / ASSESSMENT_SECTION_SIZE;
    return <section className="cj-break" aria-labelledby="cj-break-title">
      <h2 id="cj-break-title" ref={breakHeading} tabIndex={-1}>Part {done} of {sections} done!</h2>
      <p>Take a breath and stretch. Your answers are saved, so you can stop here and come back later.</p>
      <div className="cj-actions">
        <button type="button" className="cj-primary" onClick={() => setBreakAt(null)}>Keep going</button>
        <button type="button" onClick={onLeave}>Come back later</button>
      </div>
    </section>;
  }

  if (allSaved) {
    return <section className="cj-break" aria-labelledby="cj-finish-title">
      <h2 id="cj-finish-title" ref={finishHeading} tabIndex={-1}>You answered every question!</h2>
      <p>Finish the quiz to see your results.</p>
      {actionError && <div className="cj-error" role="alert">
        {conflict ? <><p>This quiz changed in another window.</p><button type="button" onClick={onReload}>Reload quiz</button></>
          : <p>We couldn’t finish the quiz just now. Your answers are saved. Please try again.</p>}
      </div>}
      <div className="cj-actions"><button type="button" className="cj-primary" disabled={busy} onClick={onFinish}>{busy ? "Saving…" : actionError ? "Try again" : "See my results"}</button></div>
    </section>;
  }

  const item = session.items[saved];
  return <>
    <p className="cj-section">Part {Math.floor(saved / ASSESSMENT_SECTION_SIZE) + 1} of {sections}</p>
    <AssessmentRound key={item.itemInstanceId} item={item} number={saved + 1} total={session.items.length}
      busy={busy} error={actionError} conflict={conflict} onReload={onReload}
      onSubmit={(response) => onSubmit(item.itemInstanceId, response)} />
  </>;
}
