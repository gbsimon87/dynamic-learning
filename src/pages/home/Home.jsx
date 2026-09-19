import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../context/auth-context";
import Mascot from "./Mascot";
import HomeFooter from "./HomeFooter";
import { useHomeResume } from "./useHomeResume";
import { useReveal } from "./useReveal";
import { CURRICULUM_ICON } from "../../data/curriculumRegistry";
import "./Home.css";

/* ===== DECORATION =====
   The drifting layer behind the hero. Fixed rather than random so the scene
   looks the same on every visit, and `aria-hidden` because a screen reader
   announcing "7 b triangle 3" would be nonsense. */
const GLYPHS = [
  { char: "7", left: 6, top: 18, size: 2.4, duration: 13, delay: 0 },
  { char: "✦", left: 16, top: 66, size: 1.6, duration: 17, delay: 2 },
  { char: "b", left: 27, top: 10, size: 2, duration: 15, delay: 4 },
  { char: "▲", left: 38, top: 78, size: 1.8, duration: 19, delay: 1 },
  { char: "5", left: 49, top: 8, size: 2.2, duration: 14, delay: 6 },
  { char: "●", left: 61, top: 72, size: 1.5, duration: 16, delay: 3 },
  { char: "a", left: 72, top: 22, size: 2.1, duration: 18, delay: 5 },
  { char: "✦", left: 83, top: 60, size: 1.7, duration: 12, delay: 2 },
  { char: "9", left: 92, top: 30, size: 2.3, duration: 20, delay: 7 },
  { char: "■", left: 11, top: 42, size: 1.4, duration: 21, delay: 8 },
  { char: "3", left: 55, top: 44, size: 1.6, duration: 15, delay: 9 },
  { char: "★", left: 78, top: 88, size: 1.9, duration: 17, delay: 4 },
];

/* ===== SUBJECT LAUNCHPAD =====
   `hue` and `deep` are token names, never literals, so both repaint with the
   theme (PROJECT_KNOWLEDGE §9). The vivid hue edges the card; the deep one
   fills its button, where white ink needs 4.5:1. */
const SUBJECTS = [
  {
    id: "math",
    icon: "🧮",
    title: "Maths",
    blurb: "Counting, times tables, shapes and number bonds.",
    hue: "--home-hue-math",
    deep: "--home-deep-math",
    quick: [
      { to: "/multiplication-table", label: "Times tables" },
      { to: "/number-bonds", label: "Number bonds" },
    ],
  },
  {
    id: "english",
    icon: "📚",
    title: "English",
    blurb: "Build words, match opposites and spot sight words.",
    hue: "--home-hue-english",
    deep: "--home-deep-english",
    quick: [
      { to: "/word-builder", label: "Word builder" },
      { to: "/sight-word-pop", label: "Sight word pop" },
    ],
  },
  {
    id: "geography",
    icon: "🌍",
    title: "Geography",
    blurb: "Spot cities, flags, countries and planets.",
    hue: "--home-hue-geography",
    deep: "--home-deep-geography",
    quick: [
      { to: "/flag-finder", label: "Flag finder" },
      { to: "/world-map", label: "World map" },
    ],
  },
  {
    id: "science",
    icon: "🔬",
    title: "Science",
    blurb: "Weather, forces and habitats are on their way!",
    hue: "--home-hue-science",
    deep: "--home-deep-science",
    comingSoon: true,
  },
];

/* ===== PROGRESS RING ===== */
const RING_RADIUS = 46;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

function ProgressRing({ percent, label }) {
  // Starts empty and fills on mount, so the number is seen arriving rather
  // than just being there. The transition below carries it.
  const [drawn, setDrawn] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setDrawn(percent));
    return () => cancelAnimationFrame(frame);
  }, [percent]);

  return (
    <svg className="home-ring" viewBox="0 0 110 110" role="img" aria-label={label}>
      <circle className="home-ring-track" cx="55" cy="55" r={RING_RADIUS} />
      <circle
        className="home-ring-fill"
        cx="55"
        cy="55"
        r={RING_RADIUS}
        strokeDasharray={RING_LENGTH}
        strokeDashoffset={RING_LENGTH - (RING_LENGTH * drawn) / 100}
      />
      <text className="home-ring-text" x="55" y="55">{percent}%</text>
    </svg>
  );
}

/* ===== HERO CALL TO ACTION =====
   One focal action, chosen by where the learner actually is. A child mid-way
   through the curriculum is sent back to their next challenge; anyone else is
   sent to the curriculum. `Practise a skill` sits beside it as the quiet
   alternative, and nothing else above the fold is clickable. */
function heroState({ child, resume }) {
  if (resume?.next) {
    return {
      title: "Pick up where you left off",
      subtitle: `Next up: ${resume.next.challengeTitle} in ${resume.next.topicName}.`,
      cta: { label: "Keep going", href: resume.next.href },
    };
  }

  if (resume) {
    return {
      title: "You're all caught up!",
      subtitle: "You've finished every challenge that's ready to play. More are on the way.",
      cta: { label: "See your topics", href: resume.topicsHref },
    };
  }

  if (child) {
    return {
      title: "Ready to play and learn?",
      subtitle: "Your journey starts with one challenge. Finish it to unlock the next.",
      cta: { label: "Start learning", href: "/curriculum" },
    };
  }

  return {
    title: "Dynamic Learning",
    subtitle: "Skills, challenges and a whole curriculum to explore, one step at a time.",
    cta: { label: "Start learning", href: "/curriculum" },
  };
}

/* ===== SUBJECT CARD ===== */
function SubjectCard({ subject }) {
  const [nudged, setNudged] = useState(false);

  if (subject.comingSoon) {
    return (
      <div
        className={`home-subject is-locked ${nudged ? "is-nudged" : ""}`}
        style={{
          "--subject-hue": `var(${subject.hue})`,
          "--subject-deep": `var(${subject.deep})`,
        }}
        data-reveal
        role="button"
        tabIndex={0}
        aria-disabled="true"
        onAnimationEnd={() => setNudged(false)}
        onClick={() => setNudged(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setNudged(true);
          }
        }}
      >
        <span className="home-subject-badge">Coming soon</span>
        <span className="home-subject-icon" aria-hidden="true">{subject.icon}</span>
        <h3>{subject.title}</h3>
        <p>{subject.blurb}</p>
        <span className="home-subject-locked">🔒 Almost ready</span>
      </div>
    );
  }

  return (
    <div
      className="home-subject"
      style={{
        "--subject-hue": `var(${subject.hue})`,
        "--subject-deep": `var(${subject.deep})`,
      }}
      data-reveal
    >
      <span className="home-subject-icon" aria-hidden="true">{subject.icon}</span>
      <h3>{subject.title}</h3>
      <p>{subject.blurb}</p>

      <div className="home-subject-quick">
        {subject.quick.map((game) => (
          <Link key={game.to} className="home-chip" to={game.to}>
            {game.label}
          </Link>
        ))}
      </div>

      <Link className="home-subject-go" to="/skills">
        Practise {subject.title} <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

/* ===== PAGE ===== */
function Home() {
  const revealRef = useReveal();
  const { child } = useContext(AuthContext);
  const { resume } = useHomeResume();

  const greeting = child ? `Hi ${child.name}!` : "Welcome!";
  const hero = heroState({ child, resume });
  const topic = resume?.topic;

  return (
    <div className="home-page" ref={revealRef}>
      {/* === HERO === */}
      <section className="home-hero">
        <div className="home-sky" aria-hidden="true">
          {GLYPHS.map((glyph, index) => (
            <span
              key={index}
              className="home-glyph"
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

        {/* `is-signed-in` lets the phone layout put the greeting and Bix on
            one line: the copy block becomes `display: contents` so both are
            direct grid items. Signed out there is no greeting to pair him
            with, so that layout stays as it was. */}
        <div className={`home-hero-inner ${child ? "is-signed-in" : ""}`}>
          <div className="home-hero-copy">
            {/* The page's h1 when signed in, since the hero title below is
                dropped for a child who already knows where they are. */}
            {child && (
              <h1 className="home-hello">
                <span
                  className="home-hello-avatar"
                  style={{ background: `var(${child.colour})` }}
                  aria-hidden="true"
                >
                  {child.avatar}
                </span>
                <span className="home-hello-name">
                  {Array.from(greeting).map((letter, index) => (
                    <span key={index} style={{ "--letter-index": index }}>
                      {letter === " " ? " " : letter}
                    </span>
                  ))}
                </span>
              </h1>
            )}

            {/* Signed out, these introduce the app. Signed in, they are two
                lines of copy between a child and the button they came for —
                the greeting above and the CTA below already say who this is
                and what happens next. */}
            {!child && (
              <>
                <h1 className="home-title">{hero.title}</h1>
                <p className="home-subtitle">{hero.subtitle}</p>
              </>
            )}

            {/* Progress through the CURRENT TOPIC, not the year: a year figure
                reads as 1% after two challenges. Text, never a link, so the
                two buttons below stay the only actions above the fold. */}
            {topic && (
              <div className="home-progress">
                <ProgressRing
                  percent={topic.percent}
                  label={`${topic.percent}% of ${topic.name} complete`}
                />
                <div>
                  <p className="home-eyebrow">Year {resume.year} {resume.subjectName}</p>
                  <p className="home-progress-topic">{topic.name}</p>
                  <p className="home-progress-count">
                    {topic.completed} of {topic.total} challenges done
                  </p>
                </div>
              </div>
            )}

            <div className="home-hero-actions">
              <Link className="home-btn home-btn-primary home-btn-big" to={hero.cta.href}>
                {hero.cta.label} <span aria-hidden="true">→</span>
              </Link>
              {/* Short labels: on a phone these two sit side by side under
                  the primary button, and "Practise a skill" wrapped to two
                  lines there. */}
              <Link className="home-btn home-btn-quiet" to="/skills">
                🎯 Skills
              </Link>

              {/* Signed in, the primary button is one challenge deep in the
                  curriculum — this is the way back out to the whole map.
                  Omitted when the primary already points there, so the hero
                  never shows the same destination twice. */}
              {child && hero.cta.href !== "/curriculum" && (
                <Link className="home-btn home-btn-quiet" to="/curriculum">
                  {CURRICULUM_ICON} View curriculum
                </Link>
              )}
            </div>
          </div>

          <div className="home-hero-mascot">
            <Mascot />
          </div>
        </div>
      </section>

      {/* === SUBJECT LAUNCHPAD === */}
      <section className="home-section" aria-labelledby="home-subjects-title">
        <h2 className="home-section-title" id="home-subjects-title" data-reveal>
          Pick a playground
        </h2>

        <div className="home-subjects">
          {SUBJECTS.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      </section>

      {/* === TWO MODES === */}
      <section className="home-section" aria-labelledby="home-modes-title">
        <h2 className="home-section-title" id="home-modes-title" data-reveal>
          Two ways to learn
        </h2>

        <div className="home-modes">
          <Link className="home-mode home-mode-curriculum" to="/curriculum" data-reveal>
            <span className="home-mode-art" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((step) => (
                <i key={step} style={{ "--step-index": step }} />
              ))}
            </span>
            <h3>
              <span className="home-mode-badge" aria-hidden="true">
                {CURRICULUM_ICON}
              </span>
              Curriculum
            </h3>
            <p>
              A path through your year group. Each challenge you finish unlocks the
              next, and your progress is saved.
            </p>
            <span className="home-mode-go">Follow the path →</span>
          </Link>

          <Link className="home-mode home-mode-skills" to="/skills" data-reveal>
            <span className="home-mode-art" aria-hidden="true">
              {["🧮", "📚", "🌍", "🔺", "⏰", "🚀"].map((pip, index) => (
                <i key={pip} style={{ "--pip-index": index }}>{pip}</i>
              ))}
            </span>
            <h3>
              <span className="home-mode-badge" aria-hidden="true">
                🎯
              </span>
              Skills
            </h3>
            <p>
              Jump into any activity, any time. Nothing is locked and nothing
              is scored, so you can practise whatever you like.
            </p>
            <span className="home-mode-go">Pick an activity →</span>
          </Link>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
}

export default Home;
