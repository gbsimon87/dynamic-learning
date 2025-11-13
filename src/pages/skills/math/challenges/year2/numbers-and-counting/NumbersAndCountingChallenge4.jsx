import { useState, useMemo } from "react";
import "./NumbersAndCountingChallenge3.css"; // reuse same styling

function NumbersAndCountingChallenge4({ onComplete }) {
  // Random start 1–50 and step from [2,5,10]
  const startNum = useMemo(() => Math.floor(Math.random() * 50) + 1, []);
  const step = useMemo(() => [2, 5, 10][Math.floor(Math.random() * 3)], []);
  const sequence = useMemo(
    () => Array.from({ length: 10 }, (_, i) => startNum + i * step),
    [startNum, step]
  );

  // Choose 3–5 blanks
  const missingIndices = useMemo(() => {
    const indices = Array.from({ length: 10 }, (_, i) => i);
    const shuffled = indices.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 3) + 3).sort((a, b) => a - b);
  }, []);

  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);

  const handleChange = (index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: value.replace(/\D/g, ""),
    }));
  };

  const handleSubmit = () => {
    const allCorrect = missingIndices.every((i) => {
      const expected = sequence[i].toString();
      return answers[i] === expected;
    });

    if (allCorrect && Object.keys(answers).length === missingIndices.length) {
      setFeedback(`✅ Correct! Step size was +${step}. Great job!`);
      setTimeout(onComplete, 1000);
    } else {
      setFeedback("❌ Not quite! Try again.");
    }
  };

  return (
    <div className="challenge-container">
      <h3>
        Fill in the missing numbers.
      </h3>

      <div className="number-sequence">
        {sequence.map((num, i) =>
          missingIndices.includes(i) ? (
            <input
              key={i}
              type="text"
              value={answers[i] || ""}
              onChange={(e) => handleChange(i, e.target.value)}
              className="number-input"
              maxLength={3}
            />
          ) : (
            <div key={i} className="number-box filled">
              {num}
            </div>
          )
        )}
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        Submit
      </button>

      {feedback && <p className="feedback">{feedback}</p>}
    </div>
  );
}

export default NumbersAndCountingChallenge4;
