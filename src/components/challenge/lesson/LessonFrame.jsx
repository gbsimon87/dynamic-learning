import { useEffect, useRef, useState } from "react";
import Mascot from "../../mascot/Mascot";
import SpeakButton from "../SpeakButton";
import LessonExample from "./LessonExample";
import { exampleSpeech } from "../../../data/lessons/lessonSpeech";
import "./lesson.css";

// Each slot has its own stamp and colour so the four challenges feel like a journey.
const SLOT_ICONS = ["🔍", "🧩", "🛠️", "💡"];

/** Bix "says" the tips in a speech bubble; the worked example sits underneath. */
export function LessonNotes({ lesson, showExample = true }) {
  const spoken = [...lesson.lines, showExample && lesson.example ? exampleSpeech(lesson.example) : ""].filter(Boolean).join(" ");
  return <section className="lesson-notes" aria-label="Bix's tips">
    <div className="lesson-talk">
      <Mascot className="lesson-bix" decorative />
      <div className="lesson-bubble">
        <div className="lesson-bubble-heading"><h4>Bix's tips</h4><SpeakButton text={spoken} label="Read Bix's tips" compact /></div>
        <ol className="lesson-lines">{lesson.lines.map((line, i) => <li key={i}>{line}</li>)}</ol>
      </div>
    </div>
    {showExample && lesson.example && <LessonExample example={lesson.example} />}
  </section>;
}

/** A small decorative scene for the start banner; the words around it carry the meaning. */
function HeroScene() {
  return <svg className="lesson-hero-scene" viewBox="0 0 320 120" aria-hidden="true" focusable="false">
    <circle className="lesson-hero-sun" cx="262" cy="34" r="18" />
    <path className="lesson-hero-hill-far" d="M0,92 Q70,40 150,84 Q220,48 320,80 L320,120 L0,120 Z" />
    <path className="lesson-hero-hill" d="M0,104 Q90,70 200,108 L200,120 L0,120 Z" />
    <path className="lesson-hero-trail" d="M40,112 Q90,92 120,100 T200,86" />
    <g className="lesson-hero-flag"><path d="M200,86 L200,60" /><path d="M200,60 L220,66 L200,72 Z" /></g>
  </svg>;
}

/**
 * The lesson screen before a challenge: banner, Bix's tips and a worked
 * example, then a big start button. During the questions a pill reopens the
 * tips. It never touches the challenge it wraps or its onComplete.
 */
export default function LessonFrame({ subjectName, level, lesson, children }) {
  const [started, setStarted] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const rounds = useRef(null);
  const notes = useRef(null);
  const toggle = useRef(null);
  useEffect(() => {
    const heading = started ? rounds.current?.querySelector(".challenge-title") : null;
    if (heading) { heading.tabIndex = -1; heading.focus(); }
  }, [started]);
  useEffect(() => { if (notesOpen) notes.current?.focus(); }, [notesOpen]);
  const slot = Math.min(Math.max(Number(level) || 1, 1), 4);

  if (!started) return <div className="challenge-container lesson-start" data-slot={slot}>
    <header className="lesson-hero">
      <span className="lesson-hero-stamp" aria-hidden="true">{SLOT_ICONS[slot - 1]}</span>
      <div className="lesson-hero-words">
        <p className="lesson-hero-kicker">{subjectName} · Challenge {slot} of 4</p>
        <h3 className="challenge-title">{lesson.title}</h3>
      </div>
      <HeroScene />
    </header>
    <LessonNotes lesson={lesson} />
    <button type="button" className="submit-btn lesson-go" onClick={() => setStarted(true)}>Let's go!<span className="lesson-go-icon" aria-hidden="true">🚀</span></button>
  </div>;

  const close = () => { setNotesOpen(false); toggle.current?.focus(); };
  return <div className="lesson-rounds" data-slot={slot} ref={rounds}>
    <button className="lesson-tips-toggle" type="button" ref={toggle} aria-expanded={notesOpen}
      onClick={() => (notesOpen ? close() : setNotesOpen(true))}>💡 Bix's tips</button>
    {notesOpen && <div ref={notes} tabIndex="-1" className="lesson-reopened">
      <LessonNotes lesson={lesson} />
      <button type="button" onClick={close}>Back to my question</button>
    </div>}
    {children}
  </div>;
}
