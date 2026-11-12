import { useEffect, useId, useRef, useState } from "react";
import SpeakButton from "../challenge/SpeakButton.jsx";
import JourneyModel from "./JourneyModel.jsx";
import { AssessmentChoice, AssessmentFractionShade, AssessmentNumberInput, AssessmentNumberTrack, AssessmentOrder,
  AssessmentSort, AssessmentTextInput } from "./AssessmentInputs.jsx";
import { isSubmittable } from "../../data/assessmentInputRules.js";
import { describeAssessmentResponse } from "../../data/curriculumJourney.js";

const CONTROLS = { number: AssessmentNumberInput, text: AssessmentTextInput, choice: AssessmentChoice, order: AssessmentOrder,
  sort: AssessmentSort, fractionShade: AssessmentFractionShade, numberTrack: AssessmentNumberTrack };

const initialValue = (input) => input.kind === "number" || input.kind === "text" ? ""
  : input.kind === "order" ? input.cards.map((c) => c.id) : input.kind === "fractionShade" ? [] : null;

const OUTCOME = {
  correct: { icon: "🌟", heading: "That’s right!" },
  incorrect: { icon: "🧭", heading: "Not quite this time" },
  skipped: { icon: "🤔", heading: "You chose “I’m not sure”" },
};

/**
 * One quiz question. Before an acknowledged save it is a controlled form whose
 * draft resets by item (the parent keys it by itemInstanceId). After the save
 * it is read-only: the outcome comes from the stored response, never from the
 * client, and the explanation follows.
 */
export default function AssessmentRound({ item, response, number, total, busy, error, conflict, onSubmit, onNext, onReload, nextLabel = "Next question" }) {
  const id = useId();
  const [value, setValue] = useState(() => initialValue(item.public.input));
  const heading = useRef(null);
  const reviewHeading = useRef(null);
  useEffect(() => { (response ? reviewHeading : heading).current?.focus(); }, [response]);
  const Control = CONTROLS[item.public.input.kind];
  const { prompt, evidence, model, input, speech } = item.public;

  const question = <>
    <p className="cj-question-count">Question {number} of {total}</p>
    <h2 id={`${id}-prompt`} className="cj-prompt" ref={heading} tabIndex={-1}>{prompt}</h2>
    {speech.mode === "prompt" && !response && <SpeakButton text={speech.text} lang={speech.lang === "en-GB" ? undefined : speech.lang} label="Read it to me" />}
    {evidence.map((card, i) => <section className="cj-evidence" key={i} aria-label={card.title ?? "Source"}>
      {card.title && <h3>{card.title}</h3>}
      {card.text.split("\n").map((line, n) => <p key={n}>{line}</p>)}
      {card.credit && <p className="cj-credit">{card.credit}</p>}
    </section>)}
    <JourneyModel model={model} />
  </>;

  if (response) {
    const outcome = OUTCOME[response.outcome];
    return <article className={`cj-round is-${response.outcome}`}>
      {question}
      <div className="cj-review" role="status">
        <h3 ref={reviewHeading} tabIndex={-1}><span aria-hidden="true">{outcome.icon}</span> {outcome.heading}</h3>
        {response.response.kind === "answer" && <p>Your answer: <strong>{describeAssessmentResponse(input, response.response.value)}</strong></p>}
        {response.outcome !== "correct" && <p>The answer: <strong>{item.review.answerText}</strong></p>}
        <p>{item.review.explanation}</p>
      </div>
      <div className="cj-actions"><button type="button" className="cj-primary" onClick={onNext}>{nextLabel}</button></div>
    </article>;
  }

  const ready = isSubmittable(input, value);
  const submit = (kind) => { if (!busy) onSubmit(kind === "skip" ? { kind: "skip" } : { kind: "answer", value }); };
  return <article className="cj-round">
    {question}
    <form onSubmit={(event) => { event.preventDefault(); if (ready) submit("answer"); }}>
      {Control ? <Control id={`${id}-answer`} input={input} value={value} onChange={setValue} disabled={busy} labelledBy={`${id}-prompt`} />
        : <p className="cj-error" role="alert">This question type cannot be shown. You can choose “I’m not sure” to move on.</p>}
      {error && <div className="cj-error" role="alert">
        {conflict ? <><p>This quiz changed in another window. Reload it to see what was saved.</p><button type="button" onClick={onReload}>Reload quiz</button></>
          : <p>We couldn’t save your answer. Your answer is still here, so you can try again.</p>}
      </div>}
      <div className="cj-actions">
        <button type="submit" className="cj-primary" disabled={!ready || busy}>{busy ? "Saving…" : error && !conflict ? "Try saving again" : "Check my answer"}</button>
        <button type="button" disabled={busy} onClick={() => submit("skip")}>I’m not sure</button>
      </div>
    </form>
  </article>;
}
