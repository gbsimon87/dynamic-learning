import { useEffect, useRef } from "react";
import Mascot from "../mascot/Mascot.jsx";
import SpeakButton from "../challenge/SpeakButton.jsx";
import JourneyModel from "./JourneyModel.jsx";
import "./curriculumJourney.css";

export default function CurriculumIntroduction({ introduction, onContinue, onSkip, onSkipAll, saving, saveError, onRetry, onContinueForNow, remaining = 1 }) {
  const heading = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    heading.current?.focus();
    return () => { if (previous?.isConnected) previous.focus(); };
  }, [introduction]);
  const text = [introduction.title, ...introduction.learning, introduction.usefulness, introduction.example.text, introduction.example.model.alt].join(" ");
  return <section className="cj-screen" aria-labelledby="cj-introduction-title">
    <div className="cj-heading"><Mascot decorative /><div><p className="cj-eyebrow">Your learning adventure</p>
      <h1 id="cj-introduction-title" ref={heading} tabIndex={-1}>{introduction.title}</h1></div></div>
    <SpeakButton text={text} label="Read this introduction" />
    <h2>What you will learn</h2><ul>{introduction.learning.map((line) => <li key={line}>{line}</li>)}</ul>
    <h2>How you can use it</h2><p>{introduction.usefulness}</p>
    <h2>For example</h2><p className="cj-example">{introduction.example.text}</p><JourneyModel model={introduction.example.model} />
    {saveError && <div className="cj-error" role="alert"><p>We couldn’t save that just now. You can retry or continue for now; this introduction may return after refresh.</p>
      <button type="button" onClick={onRetry}>Retry saving</button><button type="button" onClick={onContinueForNow}>Continue for now</button></div>}
    <div className="cj-actions"><button type="button" className="cj-primary" disabled={saving} onClick={onContinue}>{saving ? "Saving…" : "Continue"}</button>
      <button type="button" disabled={saving} onClick={onSkip}>Skip this introduction</button>
      {remaining > 1 && <button type="button" disabled={saving} onClick={onSkipAll}>Go straight to the activity</button>}</div>
  </section>;
}
