import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { MAX_CHILDREN_PER_SIGNUP } from "../../../data/childFields";
import {
  STEP, accountErrors, addLearner, destinationFor, dropBlankLearner, editLearner, emptyDraft, isDraftReady, nextCursor, prevCursor,
  stageOf, stepError, signupBody, toggleSubject, withBirthYear, withCount, withCursor, withLearnFor, withLearner,
} from "../../../data/signupFlow";
import { bixLine, errorMessage, stepTitle } from "../../../data/signupCopy";
import { AuthContext } from "../../../context/auth-context";
import { playEffect } from "../../../components/celebration/fx/effects";
import { playCue } from "../../../components/celebration/sound/player";
import { track } from "../../../utils/analytics";
import AuthShell from "../AuthShell";
import BixGuide from "./parts/BixGuide";
import FamilyRow from "./parts/FamilyRow";
import HandOver from "./HandOver";
import ProgressStars from "./parts/ProgressStars";
import {
  AccountBody, BirthYearBody, CodeBody, CountBody, GateBody, LookBody, NameBody, SubjectsBody, SummaryBody, WhoBody, YearBody,
} from "./steps";
import { useSignupDraft } from "./useSignupDraft";
import "./SignUpFlow.css";

const WIDE = new Set([STEP.who, STEP.count, STEP.year, STEP.subjects, STEP.summary, STEP.handover]);
const reducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

export default function SignUpFlow() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [draft, setDraft, finishDraft] = useSignupDraft();
  const [direction, setDirection] = useState("forward");
  const [cheer, setCheer] = useState(0);
  const [mood, setMood] = useState("idle");
  const [stepErr, setStepErr] = useState(null);
  // The wheel's pick is held here and only committed by Continue: an
  // intermediate pick (type-ahead "2…") must not wipe answers already given.
  const [pendingYear, setPendingYear] = useState(null);
  const [secret, setSecret] = useState({ password: "", confirm: "" }); // memory only, never saved
  const [fieldErrors, setFieldErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(null);
  const [needsNewCode, setNeedsNewCode] = useState(false);
  const [codeInvalid, setCodeInvalid] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [resendAt, setResendAt] = useState(0);
  const [clock, setClock] = useState(() => Date.now());
  const [created, setCreated] = useState(null);
  const submitting = useRef(false);

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

  // A one-second tick only while a resend countdown is running.
  useEffect(() => {
    if (resendAt <= clock) return undefined;
    const id = window.setTimeout(() => setClock(Date.now()), 1000);
    return () => window.clearTimeout(id);
  }, [resendAt, clock]);
  const resendIn = Math.max(0, Math.ceil((resendAt - clock) / 1000));

  const complete = async (typed) => {
    if (submitting.current) return; // Review Focus 5: the sixth digit and Enter together
    submitting.current = true;
    setBusy(true);
    try {
      const result = await auth.completeSignup(signupBody(draft, { password: secret.password, code: typed }));
      track("signup_completed", { learners: result.children.length, verification: typed ? "on" : "off" });
      playCue("success");
      playEffect("confetti");
      setCheer((n) => n + 1);
      setSecret({ password: "", confirm: "" });
      finishDraft();
      setCreated(result);
    } catch (err) {
      const reason = err?.message;
      if (reason === "EMAIL_TAKEN") {
        setFieldErrors({ email: "EMAIL_TAKEN" });
        moveTo(draft, { step: STEP.account }, "back");
      } else if (typed) {
        // Only a code the server rejected clears the boxes; a hiccup keeps what was typed.
        if (reason === "CODE_INCORRECT" || reason === "CODE_EXPIRED" || reason === "CODE_ATTEMPTS_EXCEEDED") {
          setMood("puzzled");
          setShakeKey((n) => n + 1);
          setCode("");
          setCodeInvalid(true);
          setNeedsNewCode(reason !== "CODE_INCORRECT");
        }
        setCodeError(errorMessage(reason, err?.details ?? {}));
      } else {
        setFieldErrors({ form: errorMessage(reason, err?.details ?? {}) });
      }
    } finally {
      submitting.current = false;
      setBusy(false);
    }
  };

  const sendCode = async () => {
    if (submitting.current) return;
    const errors = accountErrors({ email: draft.email, ...secret });
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    submitting.current = true;
    setBusy(true);
    let handedOver = false;
    try {
      const res = await auth.requestSignupCode(draft.email);
      if (res.verification === "off") {
        handedOver = true; // complete() takes the guard itself
        submitting.current = false;
        setBusy(false);
        await complete(null);
        return;
      }
      track("signup_code_sent");
      setClock(Date.now());
      setResendAt(Date.now() + (res.resendInSeconds ?? 30) * 1000);
      setCode("");
      setCodeError(null);
      setCodeInvalid(false);
      setNeedsNewCode(false);
      if (cursor.step !== STEP.code) moveTo(draft, { step: STEP.code }, "forward");
    } catch (err) {
      const reason = err?.message;
      const details = err?.details ?? {};
      const message = errorMessage(reason, details);
      if (reason === "EMAIL_TAKEN" || reason === "EMAIL_INVALID") {
        setFieldErrors({ email: reason });
        if (cursor.step !== STEP.account) moveTo(draft, { step: STEP.account }, "back");
      } else if (reason === "CODE_RECENTLY_SENT" || reason === "TOO_MANY_CODES") {
        if (details.retryAfterSeconds > 0) {
          setClock(Date.now());
          setResendAt(Date.now() + details.retryAfterSeconds * 1000);
        }
        if (cursor.step === STEP.code) {
          setCodeError(message);
        } else if (reason === "CODE_RECENTLY_SENT") {
          // A code is already on its way: carry on to the code step.
          setCode("");
          setCodeError(message);
          setCodeInvalid(false);
          setNeedsNewCode(false);
          moveTo(draft, { step: STEP.code }, "forward");
        } else {
          setFieldErrors({ form: message });
        }
      } else if (cursor.step === STEP.code) setCodeError(message);
      else setFieldErrors({ form: message });
    } finally {
      if (!handedOver) {
        submitting.current = false;
        setBusy(false);
      }
    }
  };

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape" && !created && !busy && !event.repeat && !event.isComposing) back();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (created) {
    return (
      <AuthShell width="wide">
        <div className="sf">
          <BixGuide line={created.children.length > 1 ? "Who's first? 🎉" : "Let's go!"} cheerOn={cheer} />
          <HandOver
            result={created}
            onStart={async (child) => {
              await auth.selectChild(child._id);
              playCue("levelUp");
              playEffect("confettiStars");
              navigate(destinationFor(child));
            }}
          />
        </div>
      </AuthShell>
    );
  }

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
    case STEP.account:
      body = (
        <AccountBody
          email={draft.email}
          secret={secret}
          errors={fieldErrors}
          busy={busy}
          onEmail={(email) => {
            setDraft({ ...draft, email });
            if (fieldErrors.email || fieldErrors.form) setFieldErrors((was) => ({ ...was, email: undefined, form: undefined }));
          }}
          onSecret={setSecret}
          onSubmit={sendCode}
        />
      );
      break;
    case STEP.code:
      body = (
        <CodeBody
          code={code}
          onCode={(value) => { setCode(value); setCodeError(null); setCodeInvalid(false); setMood("idle"); }}
          onComplete={complete}
          busy={busy}
          error={codeError}
          invalid={codeInvalid}
          shakeKey={shakeKey}
          resendIn={resendIn}
          needsNewCode={needsNewCode}
          onResend={sendCode}
          onChangeEmail={() => moveTo(draft, { step: STEP.account }, "back")}
        />
      );
      break;
    default:
      body = null; // the hand-over is rendered by the early return above
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
          <button type="button" className="auth-btn auth-btn-quiet" onClick={back} disabled={busy}>← Back</button>
        )}
        {cursor.step === STEP.birthYear && (
          <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
        )}
      </div>
    </AuthShell>
  );
}
