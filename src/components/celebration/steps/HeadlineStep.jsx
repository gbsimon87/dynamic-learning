import LevelBar from "../../rewards/LevelBar";

const MEDALS = {
  practice: "💪",
  challenge: "✨",
  topic: "⭐",
  category: "🌟",
  subject: "🏅",
  year: "🏆",
};

const LABELS = {
  topic: "Topic complete",
  category: "Quest complete",
  subject: "Subject complete",
  year: "Year complete",
};

function message(level, summary, subjectName, year) {
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
      return `You finished every ${subjectName} challenge in Year ${year}. What a journey!`;
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
          [summary.subjectCategories, "quests"],
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

/** The opening beat: the tier's medal, a rotating headline, what was done. */
export default function HeadlineStep({ step, result, headline, year, subjectName, headingRef, focalRef }) {
  const { level } = step;
  const { earned, summary } = result;

  return (
    <>
      <p className="completion-celebration-eyebrow">
        {level === "practice" ? "Practice makes progress" : `Your Year ${year} ${subjectName} journey`}
      </p>

      <div className="completion-celebration-medal" ref={focalRef} aria-hidden="true">
        <span>{MEDALS[level] ?? MEDALS.challenge}</span>
      </div>

      <h1 ref={headingRef} tabIndex={-1}>{headline}</h1>
      <p className="completion-celebration-message">
        {message(level, summary, subjectName, year)}
      </p>

      {step.xp && (
        step.xp.capped ? (
          <p className="celebration-chip">Practice XP done for today — great practice though!</p>
        ) : step.xp.gained > 0 && (
          <div className="celebration-xp">
            <p className="celebration-chip celebration-xp-gain">+{step.xp.gained} XP</p>
            <LevelBar xp={step.xp.total} from={step.xp.total - step.xp.gained} />
          </div>
        )
      )}

      {earned.length > 2 && (
        <div className="completion-celebration-earned" role="group" aria-label="Achievements earned">
          {earned.filter((milestone) => LABELS[milestone]).map((milestone) => (
            <span key={milestone}>
              ✓ {milestone === "subject" ? `${subjectName} complete` : LABELS[milestone]}
            </span>
          ))}
        </div>
      )}

      <AchievementStats level={level} summary={summary} />
    </>
  );
}
