import { useState } from "react";
import FreePlayShell from "../../../components/skills/FreePlayShell";
import { LEVELS, makeWordBuilderQuestion } from "../../../data/freePlay/wordBuilder";
import "./WordBuilder.css";

/**
 * Word Builder — free play on tricky words: fill the missing letter, pick the
 * right spelling, or choose the homophone that fits the sentence. A wrong
 * choice is crossed out and the child tries again.
 */
function WordBuilder() {
  return (
    <FreePlayShell
      title="Word Builder"
      icon="🔤"
      intro="Tricky words: fill the gap, pick the right spelling, or choose the word that fits."
      makeQuestion={makeWordBuilderQuestion}
      levels={LEVELS}
      render={(props) => <Question {...props} />}
    />
  );
}

function Question({ question, submit, locked }) {
  const [tried, setTried] = useState([]);
  const [right, setRight] = useState(null);

  const choose = (option) => {
    if (locked || tried.includes(option)) return;
    const correct = option === question.answer;
    if (correct) setRight(option);
    else setTried((prev) => [...prev, option]);
    submit(correct);
  };

  return (
    <>
      <div className="wb-display" aria-live="polite">
        {question.kind === "missing" && (
          <span className="wb-word" aria-label={`The word with a letter missing: ${question.shown.replace("_", "blank")}`}>
            {question.shown.split("").map((ch, i) => (
              <span key={i} className={`wb-letter ${ch === "_" ? (right ? "is-filled" : "is-gap") : ""}`}>
                {ch === "_" ? (right ?? "") : ch}
              </span>
            ))}
          </span>
        )}
        {question.kind === "homophone" && <p className="wb-sentence">{question.sentence}</p>}
      </div>

      <div className={`wb-options ${question.kind === "missing" ? "is-letters" : ""}`} role="group">
        {question.options.map((option) => {
          const wrong = tried.includes(option);
          const isRight = right === option;
          return (
            <button
              key={option}
              type="button"
              className={`wb-option ${wrong ? "is-wrong" : ""} ${isRight ? "is-right" : ""}`}
              disabled={locked || wrong}
              onClick={() => choose(option)}
            >
              {option}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default WordBuilder;
