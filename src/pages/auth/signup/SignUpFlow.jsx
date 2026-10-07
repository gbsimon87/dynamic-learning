import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { MAX_CHILDREN_PER_SIGNUP } from "../../../data/childFields";
import {
  STEP, addLearner, dropBlankLearner, editLearner, emptyDraft, isDraftReady, nextCursor, prevCursor,
  stageOf, stepError, toggleSubject, withBirthYear, withCount, withCursor, withLearnFor, withLearner,
} from "../../../data/signupFlow";
import { bixLine, errorMessage, stepTitle } from "../../../data/signupCopy";
import { playCue } from "../../../components/celebration/sound/player";
import { track } from "../../../utils/analytics";
import AuthShell from "../AuthShell";
import BixGuide from "./parts/BixGuide";
import FamilyRow from "./parts/FamilyRow";
import ProgressStars from "./parts/ProgressStars";
import {
  BirthYearBody, CountBody, GateBody, LookBody, NameBody, SubjectsBody, SummaryBody, WhoBody, YearBody,
} from "./steps";
import { useSignupDraft } from "./useSignupDraft";
import "./SignUpFlow.css";

const WIDE = new Set([STEP.who, STEP.count, STEP.year, STEP.subjects, STEP.summary, STEP.handover]);
const reducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

export default function SignUpFlow() {
  const [draft, setDraft] = useSignupDraft();
  const [direction, setDirection] = useState("forward");
  const [cheer, setCheer] = useState(0);
  const [mood, setMood] = useState("idle");
  const [stepErr, setStepErr] = useState(null);
  // The wheel's pick is held here and only committed by Continue: an
  // intermediate pick (type-ahead "2…") must not wipe answers already given.
  const [pendingYear, setPendingYear] = useState(null);
  const headingRef = useRef(null);
  const timer = useRef(0);
  const currentYear = new Date().getFullYear();

  const cursor = draft.cursor;
  const learner = cursor.index !== undefined ? draft.learners[cursor.index] : null;

  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => {
    track("signup_step_viewed", { step: cursor.step });
    if (cursor.step === STEP.gate) track("signup_gated");
    headingRef.current?.focus({ preventScroll: true });
  }, [cursor.step, cursor.index]);

  /** Moves to `next`; arriving at the summary ends any "edit and come back". */
  const moveTo = (base, next, way) => {
    if (!next) return;
    window.clearTimeout(timer.current);
    setDirection(way);
    setMood("idle");
    setStepErr(null);
    setPendingYear(null);
    setDraft(withCursor(base, next));
  };
  const advance = (updated = draft) => {
    const error = stepError(updated, updated.cursor);
    if (error) {
      setStepErr(errorMessage(error));
      return;
    }
    moveTo(updated, nextCursor(updated, updated.cursor), "forward");
  };
  const back = () => {
    // Backing out of "Add another child" before typing anything takes the blank child away.
    const base = cursor.step === STEP.name && draft.returnTo === STEP.summary ? dropBlankLearner(draft, cursor.index) : draft;
    moveTo(base, prevCursor(draft, cursor), "back");
  };
  const continueBirthYear = () =>
    advance(pendingYear === null ? draft : withBirthYear(draft, pendingYear, currentYear));

  /** A single-choice answer: show the tick, cheer, then move on by itself. */
  const choose = (updated) => {
    setDraft(updated);
    setStepErr(null);
    setCheer((n) => n + 1);
    playCue("chime");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => advance(updated), reducedMotion() ? 120 : 400);
  };

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape" && !event.repeat && !event.isComposing) back();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const updateLearner = (patch) => {
    setStepErr(null);
    setDraft(withLearner(draft, cursor.index, patch));
  };

  let body = null;
  let showContinue = false;
  switch (cursor.step) {
    case STEP.birthYear:
      body = (
        <BirthYearBody
          value={pendingYear ?? draft.birthYear}
          currentYear={currentYear}
          onPick={(year) => { setStepErr(null); setPendingYear(year); }}
          onEnter={continueBirthYear}
        />
      );
      showContinue = true;
      break;
    case STEP.gate:
      body = <GateBody onRestart={() => moveTo(emptyDraft(), { step: STEP.birthYear }, "back")} />;
      break;
    case STEP.who:
      body = <WhoBody draft={draft} onPick={(id) => choose(withLearnFor(draft, id))} />;
      break;
    case STEP.count:
      body = <CountBody draft={draft} onPick={(n) => choose(withCount(draft, n))} />;
      break;
    case STEP.name:
      body = <NameBody learner={learner} error={stepErr} onName={(name) => updateLearner({ name })} onSubmit={() => advance()} />;
      showContinue = true;
      break;
    case STEP.year:
      body = <YearBody learner={learner} label={stepTitle(draft, cursor)} onPick={(yearGroup) => choose(withLearner(draft, cursor.index, { yearGroup }))} />;
      break;
    case STEP.look:
      body = (
        <LookBody
          learner={learner}
          onAvatar={(avatar) => { updateLearner({ avatar }); setCheer((n) => n + 1); playCue("chime"); }}
          onColour={(colour) => updateLearner({ colour })}
        />
      );
      showContinue = true;
      break;
    case STEP.subjects:
      body = (
        <SubjectsBody
          learner={learner}
          label={stepTitle(draft, cursor)}
          onToggle={(id) => { updateLearner({ subjects: toggleSubject(learner.subjects, id) }); setCheer((n) => n + 1); playCue("chime"); }}
        />
      );
      showContinue = true;
      break;
    case STEP.summary:
      body = (
        <SummaryBody
          draft={draft}
          canAdd={draft.learnFor === "children" && draft.learners.length < MAX_CHILDREN_PER_SIGNUP}
          onEdit={(index) => moveTo(editLearner(draft, index), { step: STEP.name, index }, "back")}
          onAdd={() => { const added = addLearner(draft); moveTo(added, added.cursor, "forward"); }}
        />
      );
      showContinue = isDraftReady(draft);
      break;
    default:
      body = null; // account, code: Task 9. handover: Task 10.
  }

  const hasBack = prevCursor(draft, cursor) !== null;

  return (
    <AuthShell width={WIDE.has(cursor.step) ? "wide" : "narrow"}>
      <div className="sf">
        <BixGuide line={bixLine(draft, cursor)} mood={mood} cheerOn={cheer} />
        <ProgressStars stage={stageOf(cursor)} />
        {cursor.step !== STEP.summary && <FamilyRow learners={draft.learners} />}
        <div key={`${cursor.step}-${cursor.index ?? ""}`} className="sf-panel" data-direction={direction}>
          <h1 className="auth-title" id="sf-heading" tabIndex={-1} ref={headingRef}>
            {stepTitle(draft, cursor)}
          </h1>
          {body}
          {stepErr && cursor.step !== STEP.name && <p className="auth-error" role="alert">{stepErr}</p>}
        </div>
        {showContinue && (
          <div className="sf-continue">
            <button type="button" className="auth-btn" onClick={() => (cursor.step === STEP.birthYear ? continueBirthYear() : advance())}>Continue →</button>
          </div>
        )}
        {hasBack && (
          <button type="button" className="auth-btn auth-btn-quiet" onClick={back}>← Back</button>
        )}
        {cursor.step === STEP.birthYear && (
          <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
        )}
      </div>
    </AuthShell>
  );
}
