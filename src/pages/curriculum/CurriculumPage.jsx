import { useCallback, useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router";
import {
  getSubjectName,
  isCurriculumAvailable,
  loadCurriculum,
} from "../../data/curriculumRegistry";
import { useProgress } from "../../hooks/useProgress";
import { isChallengeImplemented } from "../../data/challengeAvailability";
import { buildLockState } from "../../data/curriculumLocks";
import {
  getTopicStats,
  getYearStats,
} from "../../data/curriculumProgressStats";
import { shouldBypassLocks } from "../../data/devUnlock";
import { useReveal } from "../home/useReveal";
import ProgressRing from "../../components/ProgressRing";
import "./CurriculumPage.css";

/* ===== DECORATION =====
   The drifting layer behind the hero, same idea as the homepage sky. Fixed
   positions rather than random so the scene is the same on every visit, and
   `aria-hidden` on the container because "+ ÷ ★ 7" read aloud is nonsense. */
const GLYPHS = [
  { char: "＋", left: 5, top: 22, size: 2.2, duration: 15, delay: 0 },
  { char: "✦", left: 17, top: 70, size: 1.5, duration: 18, delay: 3 },
  { char: "÷", left: 29, top: 14, size: 2, duration: 14, delay: 6 },
  { char: "△", left: 41, top: 80, size: 1.7, duration: 20, delay: 1 },
  { char: "×", left: 53, top: 18, size: 2.1, duration: 16, delay: 4 },
  { char: "●", left: 64, top: 74, size: 1.4, duration: 19, delay: 8 },
  { char: "½", left: 75, top: 26, size: 2, duration: 13, delay: 2 },
  { char: "★", left: 87, top: 64, size: 1.8, duration: 17, delay: 5 },
  { char: "＝", left: 94, top: 20, size: 1.9, duration: 21, delay: 7 },
];

/* ===== CATEGORY LOOKS =====
   An icon and a colour per category so a child can tell the sections apart at
   a glance rather than reading eight near-identical headings. Matched on the
   title, not the id, because ids are derived from titles and change shape
   between year groups (en dash vs hyphen). `hue` edges the card, `deep` fills
   anything carrying white ink — both are token names so the theme repaints
   them (PROJECT_KNOWLEDGE §9). */
const CATEGORY_ICONS = [
  { match: /place value/i, icon: "🔢" },
  { match: /addition|subtraction/i, icon: "➕" },
  { match: /multiplication|division/i, icon: "✖️" },
  { match: /fraction/i, icon: "🍕" },
  { match: /measurement|measure/i, icon: "📏" },
  { match: /shape/i, icon: "🔷" },
  { match: /position|direction/i, icon: "🧭" },
  { match: /statistic/i, icon: "📊" },
];

const PALETTE_SIZE = 8;

function categoryLook(title, index) {
  const found = CATEGORY_ICONS.find((entry) => entry.match.test(title));
  const slot = index % PALETTE_SIZE;

  return {
    icon: found?.icon ?? "⭐",
    hue: `var(--cp-hue-${slot})`,
    deep: `var(--cp-deep-${slot})`,
  };
}

/** "Number - Fractions" → { kind: "Number", name: "Fractions" }. */
function splitTitle(title) {
  const parts = title.split(/\s+[-–—]\s+/);
  if (parts.length < 2) return { kind: null, name: title };
  return { kind: parts[0], name: parts.slice(1).join(" – ") };
}

/* ===== NEXT CHALLENGE =====
   The hero's one focal action. Reads the same lock structure the cards below
   render from, so "Keep going" can never point somewhere the page shows as
   locked. First playable, not-yet-finished challenge in display order. */
function findNextUp(lockState) {
  for (const category of lockState) {
    for (const topic of category.topics) {
      for (const challenge of topic.challenges) {
        if (challenge.locked || challenge.missing || challenge.completed) {
          continue;
        }
        return { category, topic, challenge };
      }
    }
  }
  return null;
}

/* ===== LOCKED CHALLENGE =====
   A `disabled` button fires no events, so a child tapping a padlock got
   nothing at all. This stays enabled and aria-disabled: it navigates nowhere,
   but it shakes, which reads as "not yet" rather than "broken". */
function DeadButton({ className, label, hint, icon }) {
  const [nudged, setNudged] = useState(false);

  return (
    <button
      type="button"
      className={`cp-challenge ${className} ${nudged ? "is-nudged" : ""}`}
      aria-disabled="true"
      title={hint}
      onAnimationEnd={() => setNudged(false)}
      onClick={() => setNudged(true)}
    >
      <span className="cp-challenge-label">{label}</span>
      <span className="cp-challenge-state" aria-hidden="true">
        {icon}
      </span>
    </button>
  );
}

/* ===== QUEST RAIL =====
   The eight categories used to stack, which made the page thousands of pixels
   tall — a child looking for Fractions scrolled past every challenge in
   Place Value to reach it. They now sit side by side in one snap-scrolling
   row: swipe on touch, arrows or the dot row on a pointer. Each card caps its
   own height and scrolls its topics internally, so the page itself stays
   roughly one screen tall.

   `children` is the card list; `stops` describes them for the dots. They are
   index-aligned, exactly as the curriculum and lock state are. */
function QuestRail({ stops, children }) {
  const railRef = useRef(null);
  const [active, setActive] = useState(0);

  // The nearest card to the left edge is the one the dots highlight. Read in
  // a rAF because scroll fires far more often than the row can change.
  const syncActive = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    const cards = Array.from(rail.children);
    if (cards.length === 0) return;

    let nearest = 0;
    let best = Infinity;

    cards.forEach((card, index) => {
      const distance = Math.abs(card.offsetLeft - rail.scrollLeft);
      if (distance < best) {
        best = distance;
        nearest = index;
      }
    });

    setActive(nearest);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return undefined;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncActive);
    };

    rail.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      rail.removeEventListener("scroll", onScroll);
    };
  }, [syncActive]);

  // `scrollTo`, not `scrollIntoView`: the latter also drags the page
  // vertically, which yanks the hero off screen on a short viewport.
  const goTo = (index) => {
    const rail = railRef.current;
    const card = rail?.children[index];
    if (!card) return;

    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    rail.scrollTo({
      left: card.offsetLeft,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  const step = (direction) =>
    goTo(Math.min(stops.length - 1, Math.max(0, active + direction)));

  return (
    <div className="cp-rail-wrap">
      <div className="cp-rail-head">
        {/* One tap per quest — faster than swiping through seven of them.
            The icons are the label: no "Quest 3 of 8" line to read. */}
        <div className="cp-dots">
          {stops.map((stop, index) => (
            <button
              key={stop.id}
              type="button"
              className={`cp-dot ${index === active ? "is-active" : ""} ${
                stop.locked ? "is-locked" : ""
              }`}
              style={{ "--cat-hue": stop.hue }}
              aria-label={`Go to quest ${index + 1}: ${stop.name}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => goTo(index)}
            >
              <span aria-hidden="true">{stop.icon}</span>
            </button>
          ))}
        </div>

        <div className="cp-rail-arrows">
          <button
            type="button"
            className="cp-arrow"
            aria-label="Previous quest"
            disabled={active === 0}
            onClick={() => step(-1)}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className="cp-arrow"
            aria-label="Next quest"
            disabled={active === stops.length - 1}
            onClick={() => step(1)}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div className="cp-rail" ref={railRef}>
        {children}
      </div>
    </div>
  );
}

function CurriculumPage() {
  const params = useParams();
  const year = Number(params.year);
  const subject = params.subject;

  const { progress, hydrated } = useProgress(year, subject);
  const revealRef = useReveal();

  // Unknown or not-yet-built year/subject → back to the picker
  if (!isCurriculumAvailable(year, subject)) {
    return <Navigate to="/curriculum" replace />;
  }

  const curriculum = loadCurriculum(year, subject);
  const subjectName = getSubjectName(subject);

  // Only challenges with a component file count, so 100% stays reachable.
  const isBuilt = (topicId, challengeId) =>
    isChallengeImplemented(subject, year, topicId, challengeId);

  const yearStats = getYearStats(progress, curriculum, isBuilt);

  // Dev-only: VITE_UNLOCK_ALL opens every built challenge. See devUnlock.js.
  // `import.meta.env` is undefined outside Vite, hence the optional chain.
  const bypassLocks = shouldBypassLocks(import.meta.env);

  // Every lock decision on this screen comes from here. The same structure
  // drives the next-challenge resolver in ProblemView, so what a learner is
  // sent to after finishing can't disagree with what's shown as open.
  const lockState = buildLockState({
    curriculum,
    progress,
    isBuilt,
    bypassLocks,
  });

  const nextUp = findNextUp(lockState);

  // Index-aligned with the cards below, so dot 3 always scrolls to card 3.
  const stops = curriculum.map((category, index) => {
    const look = categoryLook(category.title, index);
    return {
      id: category.id,
      icon: look.icon,
      hue: look.hue,
      name: splitTitle(category.title).name,
      locked: lockState[index].locked,
    };
  });

  return (
    <div className="curriculum-page" ref={revealRef}>
      {/* ===== HERO ===== */}
      <section className="cp-hero">
        <div className="cp-sky" aria-hidden="true">
          {GLYPHS.map((glyph, index) => (
            <span
              key={index}
              className="cp-glyph"
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

        {/* One bar, one line each: who you are, how far you are, and the one
            button worth pressing. Everything a child would skim past — the
            welcome heading, the "follow the curriculum" blurb, the stat
            pills — is gone, so the challenge cards start near the top of the
            screen instead of below a screenful of copy. */}
        <div className="cp-bar">
          <Link
            to="/curriculum"
            className="cp-back"
            aria-label="Change year or subject"
            title="Change year or subject"
          >
            <span aria-hidden="true">←</span>
          </Link>

          {/* Held back until hydration so it never flashes 0% at a learner
              who has real progress saved. */}
          {hydrated && yearStats.total > 0 && (
            <ProgressRing
              prefix="cp-ring"
              percent={yearStats.percent}
              label={`${yearStats.percent}% of Year ${year} ${subjectName} complete`}
            />
          )}

          <div className="cp-bar-id">
            <h1 className="cp-title">
              Year {year} {subjectName}
            </h1>
            {hydrated && yearStats.total > 0 && (
              <p className="cp-bar-meta">
                <span aria-hidden="true">⭐</span> {yearStats.completed} of{" "}
                {yearStats.total} done
                {/* Most of the curriculum isn't built yet, so a bare 100%
                    would read as "Year finished". Three words, not a
                    paragraph. */}
                {yearStats.datasetTotal > yearStats.total && (
                  <span className="cp-bar-soon"> · more coming soon</span>
                )}
              </p>
            )}
          </div>

          {hydrated && nextUp && (
            <Link
              className="cp-cta"
              to={`/year/${year}/${subject}/problem/${nextUp.category.id}/${nextUp.topic.id}/${nextUp.challenge.id}`}
            >
              <span className="cp-cta-main">
                Keep going <span aria-hidden="true">→</span>
              </span>
              <span className="cp-cta-sub">{nextUp.challenge.title}</span>
            </Link>
          )}
        </div>

        {/* Say so loudly: without this a real gating bug looks exactly like
            the flag working. */}
        {bypassLocks && (
          <p className="dev-unlock-banner">
            🔓 Dev mode — every built challenge is unlocked (VITE_UNLOCK_ALL)
          </p>
        )}
      </section>

      {/* ===== QUEST MAP ===== */}
      <QuestRail stops={stops}>
        {curriculum.map((category, catIndex) => {
          // Index-aligned: buildLockState maps the curriculum in order.
          const categoryLocks = lockState[catIndex];
          const look = categoryLook(category.title, catIndex);
          const { kind, name } = splitTitle(category.title);

          const catStats = category.topics.reduce(
            (sum, topic) => {
              const stats = getTopicStats(
                progress,
                category.id,
                topic,
                isBuilt
              );
              return {
                completed: sum.completed + stats.completed,
                total: sum.total + stats.total,
              };
            },
            { completed: 0, total: 0 }
          );

          const catPercent =
            catStats.total === 0
              ? 0
              : Math.round((catStats.completed / catStats.total) * 100);

          return (
            <section
              key={category.id}
              className={`cp-cat ${categoryLocks.locked ? "is-locked" : ""} ${
                categoryLocks.complete ? "is-complete" : ""
              }`}
              style={{ "--cat-hue": look.hue, "--cat-deep": look.deep }}
              data-reveal
            >
              <header className="cp-cat-head">
                <span className="cp-cat-icon" aria-hidden="true">
                  {look.icon}
                </span>

                <div className="cp-cat-heading">
                  <p className="cp-cat-eyebrow">
                    Quest {catIndex + 1}
                    {kind ? ` · ${kind}` : ""}
                  </p>
                  <h2 className="cp-cat-title">{name}</h2>
                </div>

                {categoryLocks.complete && (
                  <span className="cp-cat-badge">✅ Complete</span>
                )}
                {categoryLocks.locked && (
                  <span className="cp-cat-badge is-locked">🔒 Locked</span>
                )}
              </header>

              {hydrated && catStats.total > 0 && (
                <div className="cp-cat-progress">
                  <div
                    className="cp-cat-bar"
                    role="progressbar"
                    aria-valuenow={catPercent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${name} progress`}
                  >
                    <div
                      className="cp-cat-bar-fill"
                      style={{ width: `${catPercent}%` }}
                    />
                  </div>
                  <p className="cp-cat-count">
                    {catStats.completed}/{catStats.total}
                  </p>
                </div>
              )}

              <div className="cp-topics">
                {category.topics.map((topic, topicIndex) => {
                  const topicLocks = categoryLocks.topics[topicIndex];

                  const topicStats = getTopicStats(
                    progress,
                    category.id,
                    topic,
                    isBuilt
                  );

                  return (
                    <article
                      key={topic.id}
                      className={`cp-topic ${
                        topicLocks.locked
                          ? "is-locked"
                          : topicLocks.complete
                            ? "is-complete"
                            : ""
                      }`}
                    >
                      <div className="cp-topic-head">
                        <span className="cp-topic-pin" aria-hidden="true">
                          {topicLocks.locked
                            ? "🔒"
                            : topicLocks.complete
                              ? "🏆"
                              : topicIndex + 1}
                        </span>

                        <h3 className="cp-topic-title">{topic.name}</h3>

                        {topicLocks.unbuilt && !topicLocks.locked && (
                          <span className="cp-chip is-soon">🚧 Coming soon</span>
                        )}

                        {hydrated && topicStats.total > 0 && (
                          <span className="cp-chip is-count">
                            {topicStats.completed}/{topicStats.total}
                          </span>
                        )}
                      </div>

                      {/* Challenges. Rendered for locked topics too: hiding
                          them left a locked topic as a bare padlock, with no
                          sign of what it contains or how much of it there is.
                          Each one still renders locked and unclickable. */}
                      <div className="cp-challenges">
                        {topic.challenges.map((challenge, challengeIndex) => {
                          const challengeLocks =
                            topicLocks.challenges[challengeIndex];

                          if (
                            challengeLocks.missing &&
                            !challengeLocks.locked
                          ) {
                            return (
                              <DeadButton
                                key={challenge.id}
                                className="is-soon"
                                label={challenge.title}
                                icon="🚧"
                                hint="This challenge hasn't been built yet"
                              />
                            );
                          }

                          if (challengeLocks.locked) {
                            return (
                              <DeadButton
                                key={challenge.id}
                                className="is-locked"
                                label={challenge.title}
                                icon="🔒"
                                hint="Finish the challenge before this one to unlock it"
                              />
                            );
                          }

                          return (
                            <Link
                              key={challenge.id}
                              className={`cp-challenge ${
                                challengeLocks.completed
                                  ? "is-complete"
                                  : "is-open"
                              }`}
                              to={`/year/${year}/${subject}/problem/${category.id}/${topic.id}/${challenge.id}`}
                            >
                              <span className="cp-challenge-label">
                                {challenge.title}
                              </span>
                              <span
                                className="cp-challenge-state"
                                aria-hidden="true"
                              >
                                {challengeLocks.completed ? "⭐" : "▶"}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </QuestRail>
    </div>
  );
}

export default CurriculumPage;
