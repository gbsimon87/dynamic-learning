import { useEffect, useRef, useState } from "react";
import SpeakButton from "../../../components/challenge/SpeakButton";
import AnswerFeedbackLine from "../../../components/skills/AnswerFeedbackLine";
import { useAnswerFeedback } from "../../../components/skills/useAnswerFeedback";

function StoryQuestions({ questions, onDone }) {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const headingRef = useRef(null);
  const attemptedRef = useRef(false);
  const answeredRef = useRef(false);
  const fb = useAnswerFeedback();

  const question = questions[step];
  const isCorrect = picked === question.answer;

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  const choose = (index) => {
    if (answeredRef.current || isCorrect) return;
    const firstTry = !attemptedRef.current;
    if (index === question.answer) answeredRef.current = true;
    attemptedRef.current = true;
    setPicked(index);
    fb.answer(index === question.answer, { firstTry });
    if (index === question.answer && firstTry) {
      setCorrectCount((count) => count + 1);
    }
  };

  const advance = () => {
    if (step === questions.length - 1) {
      onDone(correctCount);
      return;
    }
    setStep((value) => value + 1);
    setPicked(null);
    attemptedRef.current = false;
    answeredRef.current = false;
    fb.clear();
  };

  return (
    <section className="sr-quiz" aria-labelledby="sr-question">
      <p className="sr-count">Question {step + 1} of {questions.length}</p>
      <h2 className="sr-question" id="sr-question" ref={headingRef} tabIndex={-1}>
        {question.q}
        {' '}<SpeakButton text={`${question.q} Options: ${question.options.join(', ')}`} label="Hear the question and options" compact />
      </h2>

      <div className="sr-options" ref={fb.answerRef}>
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

      <AnswerFeedbackLine feedback={fb.feedback} ref={fb.feedbackRef} />

      {isCorrect && (
        <button type="button" className="sr-start" onClick={advance}>
          {step === questions.length - 1 ? "See how I did ➡️" : "Next question ➡️"}
        </button>
      )}
    </section>
  );
}

export default StoryQuestions;
