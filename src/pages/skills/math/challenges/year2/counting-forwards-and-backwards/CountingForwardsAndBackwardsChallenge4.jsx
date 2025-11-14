import { useState, useEffect } from "react";
import "./CountingForwardsAndBackwardsChallenge4.css";

function generateSequence(start, step, length) {
  const seq = Array.from({ length }, (_, i) => start - i * step);
  const missing = new Set();
  while (missing.size < 3) {
    const rand = Math.floor(Math.random() * length);
    missing.add(rand);
  }
  return seq.map((num, idx) => ({ value: num, missing: missing.has(idx) }));
}

const SEQUENCES = [
  { start: 20, step: 1, length: 10 },
  { start: 30, step: 2, length: 10 },
  { start: 25, step: 3, length: 8 },
  { start: 40, step: 4, length: 7 },
  { start: 50, step: 5, length: 6 },
  { start: 70, step: 10, length: 7 },
  { start: 15, step: 2, length: 9 },
  { start: 45, step: 3, length: 8 },
  { start: 60, step: 5, length: 7 },
  { start: 100, step: 10, length: 6 },
];

export default function CountingForwardsAndBackwardsChallenge4({ onComplete }) {
  const [current, setCurrent] = useState(0);
  const [sequence, setSequence] = useState(() => {
    const p = SEQUENCES[0];
    return generateSequence(p.start, p.step, p.length);
  });
  const [inputs, setInputs] = useState({});
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const p = SEQUENCES[current];
    setSequence(generateSequence(p.start, p.step, p.length));
  }, [current]);

  const handleChange = (idx, val) => {
    setInputs({ ...inputs, [idx]: val });
  };

  const handleSubmit = () => {
    let correct = true;
    sequence.forEach((item, idx) => {
      if (item.missing && Number(inputs[idx]) !== item.value) correct = false;
    });

    if (correct) {
      setFeedback("Correct! Great counting backwards! 🎉");
      setTimeout(() => {
        if (current + 1 < SEQUENCES.length) {
          setCurrent(current + 1);
          setInputs({});
          setFeedback("");
        } else {
          onComplete();
        }
      }, 1000);
    } else {
      setFeedback("❌ Some answers are incorrect. Try again!");
    }
  };

  return (
    <div className="challenge-container">
      <h3>Backward Counting Challenge {current + 1} / 10</h3>
      <p>Fill in the missing numbers:</p>

      <div className="sequence-grid">
        {sequence.map((item, idx) => (
          <div key={idx} className="sequence-box">
            {item.missing ? (
              <input
                type="number"
                className="sequence-input"
                value={inputs[idx] || ""}
                onChange={e => handleChange(idx, e.target.value)}
              />
            ) : (
              <span className="sequence-value">{item.value}</span>
            )}
          </div>
        ))}
      </div>

      <button className="submit-button" onClick={handleSubmit}>Submit</button>

      {feedback && <p className="feedback">{feedback}</p>}
    </div>
  );
}
