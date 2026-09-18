import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { buildEstimatingQuestions } from "../../../../../../data/challenges/estimatingAndChecking";
import { isCorrectNumber } from "../../../../../../data/challenges/placeValue3Digit";

const TITLES = {
  1: "Find a quick estimate.",
  2: "Round to the nearest hundred.",
  3: "Check the answer with the inverse.",
  4: "Show how you checked it.",
};

function EstimatingGame({ level, onComplete }) {
  const questions = useMemo(() => buildEstimatingQuestions(level, Math.random), [level]);
  return (
    <ChallengeShell
      title={TITLES[level]}
      questions={questions}
      onComplete={onComplete}
      render={({ question, submit, locked, index }) => (
        <EstimatingRound key={index} level={level} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function EstimatingRound({ level, question, submit, locked }) {
  const [selected, setSelected] = useState(null);
  const [value, setValue] = useState("");
  const sign = question.operation === "add" ? "+" : "−";

  if (level <= 2) {
    return (
      <>
        <p className="challenge-prompt">
          About how much is {question.a} {sign} {question.b}?
        </p>
        {level === 1 && (
          <p className="sequence-strip">
            {question.roundedA} + {question.roundedB} ≈ ?
          </p>
        )}
        <ChoiceGrid options={question.options} selected={selected} onSelect={setSelected} disabled={locked} />
        <button
          type="button"
          className="submit-btn"
          disabled={locked || selected === null}
          onClick={() => submit(selected === question.answer)}
        >
          Check my answer
        </button>
      </>
    );
  }

  const inverseSign = question.operation === "add" ? "−" : "+";
  return (
    <>
      <p className="challenge-prompt">
        Someone says {question.a} {sign} {question.b} = {question.reported}. Are they right?
      </p>
      <p className="sequence-strip">
        Check: {question.reported} {inverseSign} {question.b} = ?
      </p>
      {level === 4 && (
        <NumberInput label="My check gives" value={value} onChange={setValue} disabled={locked} />
      )}
      <ChoiceGrid options={["Yes", "No"]} selected={selected} onSelect={setSelected} disabled={locked} />
      <button
        type="button"
        className="submit-btn"
        disabled={locked || selected === null || (level === 4 && value === "")}
        onClick={() => submit(
          selected === (question.isCorrect ? "Yes" : "No") &&
          (level !== 4 || isCorrectNumber(value, question.inverse))
        )}
      >
        Check my answer
      </button>
    </>
  );
}

export default EstimatingGame;
