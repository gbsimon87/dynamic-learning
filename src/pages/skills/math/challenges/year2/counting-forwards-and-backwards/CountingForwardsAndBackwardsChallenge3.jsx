import { useState, useEffect } from "react";
import "./CountingForwardsAndBackwardsChallenge3.css";

function generateSequence(start, step, length) {
  const seq = Array.from({ length }, (_, i) => start + i * step);
  // Shuffle rather than reject-sample: the old loop only terminated because
  // every SEQUENCES row happens to be long enough.
  const indices = Array.from({ length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const missing = new Set(indices.slice(0, Math.min(3, length)));
  return seq.map((num, idx) => ({ value: num, missing: missing.has(idx) }));
}

const SEQUENCES = [
  { start: 1, step: 1, length: 10 },
  { start: 2, step: 2, length: 10 },
  { start: 3, step: 3, length: 8 },
  { start: 4, step: 4, length: 7 },
  { start: 5, step: 5, length: 6 },
  { start: 10, step: 10, length: 7 },
  { start: 7, step: 2, length: 9 },
  { start: 15, step: 3, length: 8 },
  { start: 20, step: 5, length: 7 },
  { start: 50, step: 10, length: 6 },
];

export default function CountingForwardsAndBackwardsChallenge3({ onComplete }) {
  const [current, setCurrent] = useState(0);
  const [sequence, setSequence] = useState(() => {
    const p = SEQUENCES[0];
    return generateSequence(p.start, p.step, p.length);
  });
  const [inputs, setInputs] = useState({});
  const [feedback, setFeedback] = useState("");
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const p = SEQUENCES[current];
    setSequence(generateSequence(p.start, p.step, p.length));
  }, [current]);

  const handleChange = (idx, val) => {
    setInputs({ ...inputs, [idx]: val });
  };

  const handleSubmit = () => {
    if (locked) return; // guard double-submit: onComplete must fire once

    let correct = true;
    sequence.forEach((item, idx) => {
      if (!item.missing) return;
      const raw = inputs[idx];
      // `Number('') === 0`, so a cleared box must not pass.
      if (raw === undefined || String(raw).trim() === '') {
        correct = false;
        return;
      }
      if (Number(raw) !== item.value) correct = false;
    });

    if (correct) {
      setLocked(true);
      setFeedback("Correct! Well done! 🎉");
      setTimeout(() => {
        if (current + 1 < SEQUENCES.length) {
          setCurrent(current + 1);
          setInputs({});
          setFeedback("");
        } else {
          onComplete();
        }
        setLocked(false);
      }, 1000);
    } else {
      setFeedback("❌ Some answers are incorrect. Try again!");
    }
  };

  return (
    <div className="challenge-container">
      <h3>Sequence Challenge {current + 1} / 10</h3>
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

      <button className="submit-button" onClick={handleSubmit} disabled={locked}>
        Submit
      </button>

      {feedback && <p className="feedback">{feedback}</p>}
    </div>
  );
}