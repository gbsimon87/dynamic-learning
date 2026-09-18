import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import "./CompletionCelebration.css";

const CONFETTI = Array.from({ length: 24 }, (_, index) => index);

const LABELS = {
  challenge: "Challenge done",
  topic: "Topic complete",
  category: "Section complete",
  subject: "Subject complete",
  year: "Year complete",
};

function headline(level, year, subjectName) {
  switch (level) {
    case "practice": return "Great practice!";
    case "topic": return "Topic complete!";
    case "category": return "Section complete!";
    case "subject": return `${subjectName} complete!`;
    case "year": return `Year ${year} complete!`;
    default: return "You did it!";
  }
}

function message(level, summary, subjectName) {
  if (level === "practice") return "You gave this challenge another go. Keep that curiosity going!";
  if (!summary) return "You completed a challenge. Well done!";

  switch (level) {
    case "topic":
      return `You finished every challenge in ${summary.topicName}.`;
    case "category":
      return `You finished every topic in ${summary.categoryTitle}.`;
    case "subject":
      return `You finished the whole ${subjectName} journey!`;
    case "year":
      return `You finished every ${subjectName} challenge in Year ${summary.year}. What a journey!`;
    default:
      return `${summary.challengeTitle} in ${summary.topicName} is complete.`;
  }
}

function AchievementStats({ level, summary }) {
  if (!summary || level === "challenge" || level === "practice") return null;

  const items = level === "topic"
    ? [[summary.topicChallenges, "challenges"]]
    : level === "category"
      ? [[summary.categoryTopics, "topics"]]
      : [
          [summary.subjectCategories, "sections"],
          [summary.subjectTopics, "topics"],
          [summary.subjectChallenges, "challenges"],
        ];

  return (
    <div className="completion-celebration-stats" role="group" aria-label="What you completed">
      {items.map(([value, label]) => (
        <div className="completion-celebration-stat" key={label}>
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function CompletionCelebration({
  result,
  year,
  subjectName,
  nextHref,
  topicsHref,
}) {
  const [showConfetti, setShowConfetti] = useState(true);
  const confettiTimer = useRef(null);
  const headingRef = useRef(null);
  const { level, earned, summary } = result;
  const isBig = level === "subject" || level === "year";
  const decoratedSummary = summary ? { ...summary, year } : null;

  useEffect(() => {
    if (!showConfetti || level === "practice") return undefined;
    confettiTimer.current = window.setTimeout(() => setShowConfetti(false), 3900);
    return () => window.clearTimeout(confettiTimer.current);
  }, [level, showConfetti]);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <main className={`completion-celebration completion-celebration-${level}`}>
      {showConfetti && level !== "practice" && (
        <div className="completion-celebration-confetti" aria-hidden="true">
          {CONFETTI.map((piece) => <i key={piece} style={{ "--piece-index": piece }} />)}
        </div>
      )}

      <section className="completion-celebration-card" aria-labelledby="completion-title">
        <p className="completion-celebration-eyebrow">
          {level === "practice" ? "Practice makes progress" : `Your Year ${year} ${subjectName} journey`}
        </p>

        <div className="completion-celebration-medal" aria-hidden="true">
          <span>{level === "year" ? "🏆" : isBig ? "🏅" : level === "category" ? "🌟" : level === "topic" ? "⭐" : level === "practice" ? "💪" : "✨"}</span>
        </div>

        <h1 id="completion-title" ref={headingRef} tabIndex={-1}>
          {headline(level, year, subjectName)}
        </h1>
        <p className="completion-celebration-message">
          {message(level, decoratedSummary, subjectName)}
        </p>

        {earned.length > 1 && (
          <div className="completion-celebration-earned" role="group" aria-label="Achievements earned">
            {earned.slice(1).map((milestone) => (
              <span key={milestone}>✓ {milestone === "subject" ? `${subjectName} complete` : LABELS[milestone]}</span>
            ))}
          </div>
        )}

        <AchievementStats level={level} summary={summary} />

        <div className="completion-celebration-actions">
          {nextHref ? (
            <Link className="completion-celebration-primary" to={nextHref}>
              Next challenge <span aria-hidden="true">→</span>
            </Link>
          ) : (
            <Link className="completion-celebration-primary" to={topicsHref}>
              Explore your topics <span aria-hidden="true">→</span>
            </Link>
          )}
          {nextHref && (
            <Link className="completion-celebration-secondary" to={topicsHref}>
              Back to topics
            </Link>
          )}
        </div>

        {showConfetti && level !== "practice" && (
          <button
            className="completion-celebration-skip"
            type="button"
            onClick={() => setShowConfetti(false)}
          >
            Stop confetti
          </button>
        )}
      </section>
    </main>
  );
}
