import { useState, useMemo } from "react";
import "./NumbersAndCountingChallenge3.css"; // Reuse the same base styles

function NumbersAndCountingChallenge3({ onComplete }) {
  // 1️⃣ Generate random sequence
  const startNum = useMemo(() => Math.floor(Math.random() * 100), []);
  const sequence = useMemo(() => Array.from({ length: 10 }, (_, i) => startNum + i), [startNum]);

  // 2️⃣ Randomly choose 3–5 missing indices
  const missingIndices = useMemo(() => {
    const indices = Array.from({ length: 10 }, (_, i) => i);
    const shuffled = indices.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 3) + 3).sort((a, b) => a - b);
  }, []);

  // 3️⃣ State for user inputs and feedback
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);

  const handleChange = (index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: value.replace(/\D/g, ""), // numbers only
    }));
  };

  const handleSubmit = () => {
    const isAllCorrect = missingIndices.every((i) => {
      const expected = sequence[i].toString();
      return answers[i] === expected;
    });

    if (isAllCorrect && Object.keys(answers).length === missingIndices.length) {
      setFeedback("✅ Correct! Well done!");
      setTimeout(() => onComplete(), 1000);
    } else {
      setFeedback("❌ Not quite! Try again.");
    }
  };

  return (
    <div className="challenge-container">
      <h3>Fill in the missing numbers in the sequence</h3>

      <div className="number-sequence">
        {sequence.map((num, index) =>
          missingIndices.includes(index) ? (
            <input
              key={index}
              type="text"
              value={answers[index] || ""}
              onChange={(e) => handleChange(index, e.target.value)}
              className="number-input"
              maxLength={3}
            />
          ) : (
            <div key={index} className="number-box filled">
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

export default NumbersAndCountingChallenge3;
