import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import DataChallenge from "../data/DataChallenge";
import Mascot from "../../mascot/Mascot";
import SpeakButton from "../SpeakButton";
import SubjectScene from "./SubjectScene";
import { noteLines } from "./noteLines";
import "./adventure.css";

// Each slot keeps one stamp per subject, so the four challenges feel like a journey.
const STAMPS = {
  science: ["🔭", "🧪", "🧩", "💡"],
  art: ["🎨", "🖌️", "🧩", "🖼️"],
  music: ["🎵", "🥁", "🧩", "🎼"],
  design: ["📐", "⚙️", "🧩", "🛠️"],
  pe: ["🏃", "⚽", "🧩", "🏅"],
  wellbeing: ["🌱", "💬", "🧩", "🌟"],
  french: ["👋", "🥐", "🧩", "🗼"],
  computing: ["💻", "🤖", "🧩", "🚀"],
};

function BixNotes({ lines, figure }) {
  return <section className="adv-notes" aria-label="Bix's notes">
    <div className="adv-notes-talk">
      <Mascot className="adv-notes-bix" decorative />
      <div className="adv-notes-bubble">
        <div className="adv-notes-heading"><h4>Bix's notes</h4><SpeakButton text={lines.join(" ")} label="Read Bix's notes" compact /></div>
        <ol className="adv-notes-lines">{lines.map((line) => <li key={line}>{line}</li>)}</ol>
      </div>
    </div>
    {figure && <div className="adv-notes-figure">{figure}</div>}
  </section>;
}

/**
 * The Year 5 frame for subjects authored as data (Science, Art, Music, D&T, PE,
 * Relationships and health, French, Computing): a start banner with Bix's notes
 * and the topic picture, then every round as a wide picture card. Same rounds,
 * answers and single onComplete as DataChallenge; only the frame is new.
 *
 * `topic` is the bank's topic object (its `rule` and `visual`), `renderVisual`
 * the subject's picture renderer, called with a question or `{ visual }`.
 * `readAloud` is passed through to ChallengeShell (French leaves it off: an
 * English voice would mangle the French words).
 */
export default function AdventureChallenge({ subject, subjectLabel, topic, build, titles, level, renderVisual, checkAnswer, readAloud = true, onComplete }) {
  const [started, setStarted] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const rounds = useRef(null);
  const notes = useRef(null);
  const notesToggle = useRef(null);
  const lines = useMemo(() => noteLines(topic?.rule), [topic]);
  const title = Array.isArray(titles) ? titles[level - 1] : titles?.[level];
  const figure = topic?.visual && renderVisual ? renderVisual({ visual: topic.visual }) : null;
  const visual = useCallback((q) => renderVisual?.(q) ?? null, [renderVisual]);

  useEffect(() => {
    const heading = started ? rounds.current?.querySelector(".challenge-title") : null;
    if (heading) { heading.tabIndex = -1; heading.focus(); }
  }, [started]);
  useEffect(() => { if (notesOpen) notes.current?.focus(); }, [notesOpen]);

  const stamp = (STAMPS[subject] ?? STAMPS.science)[level - 1];
  if (!started) return <div className="challenge-container adv-start" data-subject={subject} data-slot={level}>
    <header className="adv-hero">
      <span className="adv-hero-stamp" aria-hidden="true">{stamp}</span>
      <div className="adv-hero-words"><p className="adv-hero-kicker">{subjectLabel} · Challenge {level} of 4</p><h3 className="challenge-title">{title}</h3></div>
      <SubjectScene subject={subject} />
    </header>
    {lines.length > 0 && <BixNotes lines={lines} figure={figure} />}
    <button type="button" className="submit-btn adv-go" onClick={() => setStarted(true)}>Let's go!<span className="adv-go-icon" aria-hidden="true">🚀</span></button>
  </div>;

  return <div className="adv-challenge" data-subject={subject} data-slot={level} ref={rounds}>
    {lines.length > 0 && <button className="adv-notes-toggle" type="button" ref={notesToggle} aria-expanded={notesOpen}
      onClick={() => { setNotesOpen((open) => !open); if (notesOpen) notesToggle.current?.focus(); }}>📖 Bix's notes</button>}
    {notesOpen && <div ref={notes} tabIndex="-1" className="adv-notes-reopened">
      <BixNotes lines={lines} />
      <button type="button" onClick={() => { setNotesOpen(false); notesToggle.current?.focus(); }}>Back to my question</button>
    </div>}
    <DataChallenge level={level} build={build} titles={titles} renderVisual={visual} checkAnswer={checkAnswer} readAloud={readAloud} layout="science" onComplete={onComplete} />
  </div>;
}
