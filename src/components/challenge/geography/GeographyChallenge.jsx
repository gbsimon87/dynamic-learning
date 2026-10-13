import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import DataChallenge from "../data/DataChallenge";
import { GEOGRAPHY_TITLES } from "../../../data/challenges/geography/engine";
import { geographyQuestionSpeech } from "../../../data/challenges/geography/speech";
import FieldNotesCard from "./FieldNotesCard";
import GeographyVisual from "./GeographyVisual";
import "./geography.css";

export default function GeographyChallenge({ build, level, onComplete }) {
  const run = useMemo(() => build(level, Math.random), [build, level]);
  const questions = useCallback(() => run.questions, [run]);
  const [started, setStarted] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const rounds = useRef(null);
  const notes = useRef(null);
  const notesToggle = useRef(null);
  useEffect(() => {
    const heading = started ? rounds.current?.querySelector(".challenge-title") : null;
    if (heading) { heading.tabIndex = -1; heading.focus(); }
  }, [started]);
  useEffect(() => { if (notesOpen) notes.current?.focus(); }, [notesOpen]);
  const renderVisual = useCallback((q) => <GeographyVisual visual={q.visual} sources={q.sources} />, []);
  const activity = run.activity && <details className="geo-activity"><summary>With a grown-up: try a land-use survey</summary>
    <p>Digital practice prepares you for fieldwork. This outdoor activity is optional.</p>
    <p>{run.activity.question}</p><p><b>You need:</b> paper, pencil and a grown-up.</p>
    <ol>{run.activity.steps.map((s) => <li key={s}>{s}</li>)}</ol>
    <p><b>On paper:</b> Site A / Site B; homes / farming / shops / leisure / uncertain.</p>
    <p>Draw tally marks, a sketch map with a key, and a graph. Describe what you noticed.</p>
    <p><b>Alternative:</b> observe through a window with a grown-up, or use the example plan.</p>
    <p>Keep your notes on paper. You do not need to share a location or photograph.</p>
  </details>;
  if (!started) return <div className="challenge-container geo-start">
    <h3 className="challenge-title">{GEOGRAPHY_TITLES[level - 1]}</h3><FieldNotesCard notes={run.notes} />
    <button type="button" className="submit-btn" onClick={() => setStarted(true)}>Let's explore!</button>{activity}
  </div>;
  return <div className="geo-challenge" ref={rounds}>
    <button className="geo-notes-toggle" type="button" ref={notesToggle} aria-expanded={notesOpen} onClick={() => { setNotesOpen((open) => !open); if (notesOpen) notesToggle.current?.focus(); }}>📖 Bix's field notes</button>
    {notesOpen && <div ref={notes} tabIndex="-1" className="geo-notes-reopened"><FieldNotesCard notes={run.notes} showVisual={false} /><button type="button" onClick={() => { setNotesOpen(false); notesToggle.current?.focus(); }}>Back to my question</button></div>}
    <DataChallenge level={level} build={questions} titles={GEOGRAPHY_TITLES} renderVisual={renderVisual} readAloud speak={geographyQuestionSpeech} onComplete={onComplete} />{activity}
  </div>;
}
