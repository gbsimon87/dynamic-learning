import { useState } from "react";
import "./CountingForwardsAndBackwardsChallenge1.css"; // reuse same styles

function CountingForwardsAndBackwardsChallenge1({ onComplete }) {
  const startNumber = 27;
  const countBacks = [6, 9, 10, 13, 16, 11];
  const correctAnswers = countBacks.map((n) => startNumber - n);

  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);

  const handleChange = (index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: value.replace(/\D/g, ""), // digits only
    }));
  };

  const handleSubmit = () => {
    const allCorrect = countBacks.every(
      (_, i) => answers[i] === correctAnswers[i].toString()
    );

    if (allCorrect && Object.keys(answers).length === countBacks.length) {
      setFeedback("✅ Correct! Great job counting back!");
      setTimeout(() => onComplete(), 1000);
    } else {
      setFeedback("❌ Not quite! Try again.");
    }
  };

  return (
    <div className="challenge-container">
      <h3>Counting Backwards Practice</h3>
      <p>
        Use the number line below to help you count. Start at{" "}
        <strong>{startNumber}</strong> and count back the numbers shown.
      </p>

      {/* --- Number line reference --- */}
      <div className="number-line">
        {Array.from({ length: 20 }, (_, i) => 11 + i).map((num) => (
          <div
            key={num}
            className={`number-box filled ${
              num === startNumber ? "highlighted" : ""
            }`}
          >
            {num}
          </div>
        ))}
      </div>

      {/* --- Question inputs --- */}
      <div className="counting-questions">
        {countBacks.map((n, i) => (
          <div key={i} className="count-question">
            <span>
              Start at <strong>{startNumber}</strong> and count back{" "}
              <strong>{n}</strong>:
            </span>
            <input
              type="text"
              value={answers[i] || ""}
              onChange={(e) => handleChange(i, e.target.value)}
              className="number-input"
              maxLength={3}
            />
          </div>
        ))}
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        Submit
      </button>

      {feedback && <p className="feedback">{feedback}</p>}
    </div>
  );
}

export default CountingForwardsAndBackwardsChallenge1;
