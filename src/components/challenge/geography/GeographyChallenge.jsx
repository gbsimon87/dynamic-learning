import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import DataChallenge from "../data/DataChallenge";
import { GEOGRAPHY_TITLES } from "../../../data/challenges/geography/engine";
import { geographyQuestionSpeech } from "../../../data/challenges/geography/speech";
import FieldNotesCard from "./FieldNotesCard";
import GeographyVisual from "./GeographyVisual";
import "./geography.css";

// Each slot gets its own colour and stamp so the four challenges feel like a journey.
const SLOT_ICONS = ["🔍", "🗺️", "🕵️", "💡"];

/** A small decorative landscape for the start banner; the words around it carry the meaning. */
function HeroScene() {
  return <svg className="geo-hero-scene" viewBox="0 0 320 120" aria-hidden="true" focusable="false">
    <circle className="geo-hero-sun" cx="262" cy="34" r="18" />
    <path className="geo-hero-hill-far" d="M0,92 Q70,40 150,84 Q220,48 320,80 L320,120 L0,120 Z" />
    <path className="geo-hero-sea" d="M190,100 Q250,88 320,96 L320,120 L180,120 Z" />
    <path className="geo-hero-hill" d="M0,104 Q90,70 200,108 L200,120 L0,120 Z" />
    <path className="geo-hero-trail" d="M40,112 Q90,92 120,100 T200,86" />
    <g className="geo-hero-flag"><path d="M200,86 L200,60" /><path d="M200,60 L220,66 L200,72 Z" /></g>
  </svg>;
}

export default function GeographyChallenge({ build, level, onComplete, speak = geographyQuestionSpeech }) {
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
  const act = run.activity;
  const activity = act && <details className="geo-activity"><summary><span className="geo-activity-icon" aria-hidden="true">🌳</span>{act.summary ?? "With a grown-up: try a land-use survey"}</summary>
    <p>Digital practice prepares you for fieldwork. This outdoor activity is optional.</p>
    <p>{act.question}</p><p><b>You need:</b> {act.materials ?? "paper, pencil and a grown-up."}</p>
    <ol>{act.steps.map((s) => <li key={s}>{s}</li>)}</ol>
    <p><b>On paper:</b> {act.paper ?? "Site A / Site B; homes / farming / shops / leisure / uncertain."}</p>
    <p>{act.present ?? "Draw tally marks, a sketch map with a key, and a graph. Describe what you noticed."}</p>
    <p><b>Alternative:</b> {act.alternative ?? "observe through a window with a grown-up, or use the example plan."}</p>
    <p>Keep your notes on paper. You do not need to share a location or photograph.</p>
  </details>;
  if (!started) return <div className="challenge-container geo-start" data-slot={level}>
    <header className="geo-hero">
      <span className="geo-hero-stamp" aria-hidden="true">{SLOT_ICONS[level - 1]}</span>
      <div className="geo-hero-words"><p className="geo-hero-kicker">Geography · Challenge {level} of 4</p><h3 className="challenge-title">{GEOGRAPHY_TITLES[level - 1]}</h3></div>
      <HeroScene />
    </header>
    <FieldNotesCard notes={run.notes} />
    <button type="button" className="submit-btn geo-go" onClick={() => setStarted(true)}>Let's explore!<span className="geo-go-icon" aria-hidden="true">🚀</span></button>{activity}
  </div>;
  return <div className="geo-challenge" data-slot={level} ref={rounds}>
    <button className="geo-notes-toggle" type="button" ref={notesToggle} aria-expanded={notesOpen} onClick={() => { setNotesOpen((open) => !open); if (notesOpen) notesToggle.current?.focus(); }}>📖 Bix's field notes</button>
    {notesOpen && <div ref={notes} tabIndex="-1" className="geo-notes-reopened"><FieldNotesCard notes={run.notes} showVisual={false} /><button type="button" onClick={() => { setNotesOpen(false); notesToggle.current?.focus(); }}>Back to my question</button></div>}
    <DataChallenge level={level} build={questions} titles={GEOGRAPHY_TITLES} renderVisual={renderVisual} readAloud speak={speak} onComplete={onComplete} />{activity}
  </div>;
}
