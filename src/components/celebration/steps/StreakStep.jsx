import WeekDots from "../../rewards/WeekDots";

function words({ outcome, current }) {
  switch (outcome) {
    case "saved":
      return ["A freeze saved your streak!", `🧊 Your ${current}-day streak is safe. Welcome back!`];
    case "restarted":
      return ["New streak started!", "Every day you play makes it grow."];
    case "started":
      return ["Streak started!", "Come back tomorrow to make it 2 days."];
    default:
      return [`${current}-day streak!`, "You played again today. Brilliant!"];
  }
}

/** The day's first finished challenge: the streak, and this week's dots. */
export default function StreakStep({ step, headingRef, focalRef }) {
  const [title, line] = words(step);
  return (
    <>
      <p className="completion-celebration-eyebrow">Your streak</p>
      <h2 ref={headingRef} tabIndex={-1}>{title}</h2>
      <div className="celebration-streak" ref={focalRef} aria-hidden="true">
        <span className="celebration-streak-flame">🔥</span>
        <span className="celebration-streak-count">{step.current}</span>
      </div>
      <p className="completion-celebration-message">{line}</p>
      {step.dots?.length > 0 && <WeekDots dots={step.dots} />}
    </>
  );
}
