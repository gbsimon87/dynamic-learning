import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../context/auth-context";
import { profileColour } from "../../data/avatars";
import Mascot from "../../components/mascot/Mascot";
import HomeAchievements from "./HomeAchievements";
import HomeCurriculumOverview from "./HomeCurriculumOverview";
import { useHomeResume } from "./useHomeResume";
import { useReveal } from "./useReveal";
import { CURRICULUM_ICON } from "../../data/curriculumRegistry";
import ProgressRing from "../../components/ProgressRing";
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

/* Featured practice stays secondary to the curriculum journey. */
const FEATURED_SKILLS = [
  {
    id: "space",
    subject: "Geography",
    icon: "🪐",
    title: "Solar System",
    blurb: "Blast off and meet the planets!",
    to: "/solar-system",
    action: "Explore space",
  },
  {
    id: "reading",
    subject: "English",
    icon: "⚡",
    title: "Speed Reader",
    blurb: "Read a story, one flash at a time.",
    to: "/speed-reader",
    action: "Read a story",
  },
  {
    id: "arithmetic",
    subject: "Maths",
    icon: "🧮",
    title: "Arithmetic Practice",
    blurb: "Try adding, taking away, times and dividing.",
    to: "/arithmetic-practice",
    action: "Try some sums",
  },
  {
    id: "bonds",
    subject: "Maths",
    icon: "🔗",
    title: "Number Bonds",
    blurb: "Find the numbers that belong together.",
    to: "/number-bonds",
    action: "Make a match",
  },
];

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
      cta: { label: "Start my adventure", href: "/curriculum" },
    };
  }

  return {
    title: "Learn with Bix",
    subtitle: "Come on a learning adventure! Explore Maths, English, Science and History, one little challenge at a time.",
    cta: { label: "Start my adventure", href: "/curriculum" },
  };
}

function FeaturedSkill({ skill }) {
  return (
    <Link className={`home-skill home-skill-${skill.id}`} to={skill.to} data-reveal>
      <div className="home-skill-copy">
        <div className="home-skill-heading">
          <span className="home-skill-icon" aria-hidden="true">{skill.icon}</span>
          <div className="home-skill-title">
            <span className="home-skill-subject">{skill.subject}</span>
            <h3>{skill.title}</h3>
          </div>
        </div>
        <p>{skill.blurb}</p>
      </div>
      <span className="home-skill-go">{skill.action} <span aria-hidden="true">→</span></span>
    </Link>
  );
}

function CurriculumAdventure({ curriculumHref }) {
  return (
    <section className="home-section home-curriculum" aria-labelledby="home-curriculum-title">
      <div className="home-section-heading" data-reveal>
        <p className="home-section-label"><span aria-hidden="true">{CURRICULUM_ICON}</span> Curriculum adventure</p>
        <h2 className="home-section-title" id="home-curriculum-title">Little steps. Big discoveries!</h2>
        <p className="home-section-intro">Follow a path for your year. Finish curriculum challenges to save your progress and unlock the next step.</p>
      </div>

      <HomeCurriculumOverview />

      <ol className="home-journey">
        <li data-reveal>
          <span className="home-journey-number" aria-hidden="true">1</span>
          <span className="home-journey-icon" aria-hidden="true">🧭</span>
          <h3>Pick your adventure</h3>
          <p>Choose your year and a subject you want to explore.</p>
        </li>
        <li data-reveal>
          <span className="home-journey-number" aria-hidden="true">2</span>
          <span className="home-journey-icon" aria-hidden="true">🔓</span>
          <h3>Learn and unlock</h3>
          <p>Finish a challenge to open the next step on your path.</p>
        </li>
        <li data-reveal>
          <span className="home-journey-number" aria-hidden="true">3</span>
          <span className="home-journey-icon" aria-hidden="true">🏆</span>
          <h3>Watch yourself grow</h3>
          <p>Collect stickers and badges. Your profile saves your progress!</p>
        </li>
      </ol>

      <div className="home-curriculum-actions">
        <Link className="home-btn home-btn-primary" to={curriculumHref}>
          Explore the curriculum <span aria-hidden="true">→</span>
        </Link>
        <p>Built around the UK National Curriculum.</p>
      </div>
    </section>
  );
}

/* ===== PAGE ===== */
function Home() {
  const revealRef = useReveal();
  const { child, status } = useContext(AuthContext);
  const { resume, candidates } = useHomeResume();

  const greeting = child ? `Hi ${child.name}!` : "Welcome!";
  const hero = heroState({ child, resume });
  const curriculumHref = status === "signedOut" ? "/signup" : "/curriculum";
  const heroHref = status === "signedOut" ? curriculumHref : hero.cta.href;
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
                  style={{ background: profileColour(child.colour) }}
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

            {/* Introduce the curriculum to visitors and children starting out. */}
            {!child && (
              <>
                <h1 className="home-title">{hero.title}</h1>
                <p className="home-subtitle">{hero.subtitle}</p>
              </>
            )}

            {child && !topic && <p className="home-subtitle">{hero.subtitle}</p>}

            {/* Progress through the CURRENT TOPIC, not the year: a year figure
                reads as 1% after two challenges. Text, never a link, so the
                two buttons below stay the only actions above the fold. */}
            {topic && (
              <div className="home-progress">
                <ProgressRing
                  prefix="home-ring"
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
              <Link className="home-btn home-btn-primary home-btn-big" to={heroHref}>
                {hero.cta.label} <span aria-hidden="true">→</span>
              </Link>
              {/* Short labels: on a phone these two sit side by side under
                  the primary button, and "Practise a skill" wrapped to two
                  lines there. */}
              <Link className="home-btn home-btn-quiet" to="/skills">
                <span aria-hidden="true">🎯</span> Skills
              </Link>

              {/* Signed in, the primary button is one challenge deep in the
                  curriculum — this is the way back out to the whole map.
                  Omitted when the primary already points there, so the hero
                  never shows the same destination twice. */}
              {child && hero.cta.href !== "/curriculum" && (
                <Link className="home-btn home-btn-quiet" to="/curriculum">
                  <span aria-hidden="true">{CURRICULUM_ICON}</span> View curriculum
                </Link>
              )}
            </div>
          </div>

          {/* `jokes`: a "Tell me a joke" button beside him, and a long press
              on Bix himself, tell a joke in a speech bubble. */}
          <div className="home-hero-mascot">
            <Mascot jokes />
          </div>
        </div>
      </section>

      <CurriculumAdventure curriculumHref={curriculumHref} />

      <HomeAchievements candidates={candidates} />

      <section className="home-section home-practice" aria-labelledby="home-skills-title">
        <div className="home-section-heading" data-reveal>
          <p className="home-section-label"><span aria-hidden="true">🎯</span> Skills practice</p>
          <h2 className="home-section-title" id="home-skills-title">Fancy a quick play?</h2>
          <p className="home-section-intro">Try a favourite, any time. Pick a game and jump right in!</p>
        </div>

        <p className="home-practice-note">
          <span aria-hidden="true">🎯</span>
          <span>
            <strong>Play for practice</strong>
            Skill games don’t count towards your curriculum progress.
          </span>
        </p>

        <div className="home-skills">
          {FEATURED_SKILLS.map((skill) => <FeaturedSkill key={skill.id} skill={skill} />)}
        </div>

        <div className="home-practice-actions">
          <Link className="home-btn home-btn-quiet" to="/skills">
            See all skill games <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

    </div>
  );
}

export default Home;
