import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  CURRICULUM_YEARS,
  CURRICULUM_SUBJECTS,
  isCurriculumAvailable,
  isYearAvailable,
} from "../../data/curriculumRegistry";
import { useReveal } from "../home/useReveal";
import "./CurriculumSelectPage.css";

/* ===== DECORATION =====
   The same drifting sky as the homepage and the curriculum screen, so the
   three pages read as one place. `aria-hidden` on the container: "7 ✦ ÷"
   announced aloud is nonsense. */
const GLYPHS = [
  { char: "✦", left: 7, top: 24, size: 1.7, duration: 16, delay: 0 },
  { char: "7", left: 21, top: 68, size: 2.1, duration: 19, delay: 4 },
  { char: "●", left: 37, top: 16, size: 1.4, duration: 14, delay: 2 },
  { char: "▲", left: 55, top: 74, size: 1.7, duration: 20, delay: 6 },
  { char: "a", left: 71, top: 22, size: 2, duration: 15, delay: 1 },
  { char: "★", left: 88, top: 62, size: 1.8, duration: 18, delay: 5 },
];

/* ===== SUBJECT LOOKS =====
   Token names, never literals, so both themes repaint them
   (PROJECT_KNOWLEDGE §9). The vivid hue edges the card; the deep one fills
   anything carrying white ink, where 4.5:1 has to hold. */
const SUBJECT_LOOKS = {
  math: { hue: "--cs-hue-math", deep: "--cs-deep-math" },
  english: { hue: "--cs-hue-english", deep: "--cs-deep-english" },
  geography: { hue: "--cs-hue-geography", deep: "--cs-deep-geography" },
  science: { hue: "--cs-hue-science", deep: "--cs-deep-science" },
};

const FALLBACK_LOOK = { hue: "--cs-hue-math", deep: "--cs-deep-math" };

/* ===== YEAR BUTTON ===== */
function YearButton({ year, available, selected, onPick }) {
  const [nudged, setNudged] = useState(false);

  // `disabled` fires no events, so a locked year used to do nothing at all
  // when tapped. This shakes instead, which reads as "not yet" rather than
  // "broken" — same pattern as the locked challenges.
  const handleClick = () => {
    if (!available) {
      setNudged(true);
      return;
    }
    onPick(year);
  };

  return (
    <button
      type="button"
      className={`cs-year ${selected ? "is-selected" : ""} ${
        available ? "" : "is-locked"
      } ${nudged ? "is-nudged" : ""}`}
      aria-pressed={available ? selected : undefined}
      aria-disabled={available ? undefined : "true"}
      title={available ? undefined : "This year group isn't ready yet"}
      onAnimationEnd={() => setNudged(false)}
      onClick={handleClick}
    >
      <span className="cs-year-icon" aria-hidden="true">
        {available ? "🎒" : "🔒"}
      </span>
      <span className="cs-year-label">Year {year}</span>
      <span className="cs-year-state">
        {available ? (selected ? "✅ Picked" : "Tap to pick") : "Coming soon"}
      </span>
    </button>
  );
}

/* ===== SUBJECT CARD =====
   Three states, and none of them is an inert grey box: before a year is
   picked the card says so and points back at step 1, a subject with no
   curriculum shakes, and a ready one is the big coloured button. */
function SubjectCard({ subject, year, onNeedYear }) {
  const [nudged, setNudged] = useState(false);
  const navigate = useNavigate();

  const look = SUBJECT_LOOKS[subject.id] ?? FALLBACK_LOOK;
  const waiting = year === null;
  const available = !waiting && isCurriculumAvailable(year, subject.id);

  const handleClick = () => {
    if (waiting) {
      onNeedYear();
      setNudged(true);
      return;
    }
    if (!available) {
      setNudged(true);
      return;
    }
    navigate(`/curriculum/year/${year}/${subject.id}`);
  };

  const state = waiting
    ? "Pick a year first"
    : available
      ? "Start →"
      : "Coming soon";

  return (
    <button
      type="button"
      className={`cs-subject ${waiting ? "is-waiting" : ""} ${
        available ? "is-ready" : "is-locked"
      } ${nudged ? "is-nudged" : ""}`}
      style={{
        "--subject-hue": `var(${look.hue})`,
        "--subject-deep": `var(${look.deep})`,
      }}
      aria-disabled={available ? undefined : "true"}
      data-reveal
      onAnimationEnd={() => setNudged(false)}
      onClick={handleClick}
    >
      {available && <span className="cs-subject-flag">Ready</span>}

      <span className="cs-subject-icon" aria-hidden="true">
        {subject.icon}
      </span>
      <span className="cs-subject-name">{subject.name}</span>
      <span className="cs-subject-state">{state}</span>
    </button>
  );
}

function CurriculumSelectPage() {
  const revealRef = useReveal();
  const [selectedYear, setSelectedYear] = useState(null);
  const [nudgeYears, setNudgeYears] = useState(false);
  const yearsRef = useRef(null);

  // Tapping a subject too early bounces the year row rather than silently
  // refusing — the child can see where the missing step is.
  const askForYear = () => {
    setNudgeYears(true);
    yearsRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  };

  return (
    <div className="cs-page" ref={revealRef}>
      {/* ===== BAND ===== */}
      <section className="cs-hero">
        <div className="cs-sky" aria-hidden="true">
          {GLYPHS.map((glyph, index) => (
            <span
              key={index}
              className="cs-glyph"
              style={{
                left: `${glyph.left}%`,
                top: `${glyph.top}%`,
                fontSize: `${glyph.size}rem`,
                animationDuration: `${glyph.duration}s`,
                animationDelay: `-${glyph.delay}s`,
              }}
            >
              {glyph.char}
            </span>
          ))}
        </div>

        <div className="cs-bar">
          <Link to="/" className="cs-back" aria-label="Back home" title="Back home">
            <span aria-hidden="true">←</span>
          </Link>

          <h1 className="cs-title">Pick your adventure</h1>

          {/* Two steps, shown as two dots rather than explained in a
              sentence. The second lights up the moment a year is chosen. */}
          <ol className="cs-track" aria-hidden="true">
            <li className="cs-track-step is-done">1</li>
            <li className="cs-track-line" />
            <li
              className={`cs-track-step ${
                selectedYear === null ? "" : "is-done"
              }`}
            >
              2
            </li>
          </ol>
        </div>
      </section>

      {/* ===== STEP 1: YEAR ===== */}
      <section className="cs-step" aria-labelledby="cs-year-title">
        <h2 className="cs-step-title" id="cs-year-title">
          <span className="cs-step-num" aria-hidden="true">
            1
          </span>
          Your year
        </h2>

        <div
          className={`cs-years ${nudgeYears ? "is-nudged" : ""}`}
          ref={yearsRef}
          onAnimationEnd={() => setNudgeYears(false)}
        >
          {CURRICULUM_YEARS.map((year) => (
            <YearButton
              key={year}
              year={year}
              available={isYearAvailable(year)}
              selected={selectedYear === year}
              onPick={setSelectedYear}
            />
          ))}
        </div>
      </section>

      {/* ===== STEP 2: SUBJECT =====
          Always rendered. Hiding it behind the year choice left half the
          screen empty and gave no clue what was coming next. */}
      <section className="cs-step" aria-labelledby="cs-subject-title">
        <h2 className="cs-step-title" id="cs-subject-title">
          <span
            className={`cs-step-num ${
              selectedYear === null ? "is-waiting" : ""
            }`}
            aria-hidden="true"
          >
            2
          </span>
          Your subject
          {selectedYear !== null && (
            <span className="cs-step-year">Year {selectedYear}</span>
          )}
        </h2>

        <div className="cs-subjects">
          {CURRICULUM_SUBJECTS.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              year={selectedYear}
              onNeedYear={askForYear}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default CurriculumSelectPage;
