import "./WeekDots.css";

const LETTERS = ["M", "T", "W", "T", "F", "S", "S"];
const WORDS = { played: "played", frozen: "saved by a freeze", today: "today", empty: "not played" };

/** Mon–Sun: 🔥 played, 🧊 frozen, a ring for today. From streak.weekDots. */
export default function WeekDots({ dots }) {
  return (
    <ol className="week-dots" aria-label="This week">
      {dots.map((dot, i) => (
        <li key={dot.day} className={`week-dot is-${dot.state}`}>
          <span className="week-dot-mark" aria-hidden="true">
            {dot.state === "played" ? "🔥" : dot.state === "frozen" ? "🧊" : ""}
          </span>
          <span className="week-dot-day" aria-hidden="true">{LETTERS[i]}</span>
          <span className="sr-only">{`${dot.day}: ${WORDS[dot.state]}`}</span>
        </li>
      ))}
    </ol>
  );
}
