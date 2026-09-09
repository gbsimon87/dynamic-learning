import { useEffect, useRef, useState } from "react";

function StoryQuestions({ questions, onDone }) {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [attempted, setAttempted] = useState(false);
  const headingRef = useRef(null);

  const question = questions[step];
  const isCorrect = picked === question.answer;

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  const choose = (index) => {
    if (isCorrect) return;
    setPicked(index);
    if (index === question.answer && !attempted) {
      setCorrectCount((count) => count + 1);
    }
    setAttempted(true);
  };

  const advance = () => {
    if (step === questions.length - 1) {
      onDone(correctCount);
      return;
    }
    setStep((value) => value + 1);
    setPicked(null);
    setAttempted(false);
  };

  return (
    <section className="sr-quiz" aria-labelledby="sr-question">
      <p className="sr-count">Question {step + 1} of {questions.length}</p>
      <h2 className="sr-question" id="sr-question" ref={headingRef} tabIndex={-1}>
        {question.q}
      </h2>

      <div className="sr-options">
        {question.options.map((option, index) => {
          const pickedClass = picked === index
            ? (isCorrect ? "is-right" : "is-wrong")
            : "";
          return (
            <button
              key={option}
              type="button"
              className={`sr-option ${pickedClass}`}
              onClick={() => choose(index)}
              disabled={isCorrect}
            >
              {option}
            </button>
          );
        })}
      </div>

      <p className="sr-feedback" role="status" aria-live="polite">
        {picked === null ? "" : (isCorrect ? "✅ That's right!" : "❌ Not quite — try again!")}
      </p>

      {isCorrect && (
        <button type="button" className="sr-start" onClick={advance}>
          {step === questions.length - 1 ? "See how I did ➡️" : "Next question ➡️"}
        </button>
      )}
    </section>
  );
}

export default StoryQuestions;
