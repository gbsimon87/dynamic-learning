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
  4: "Estimate, then check with the inverse.",
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
  const [estimate, setEstimate] = useState(null);
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

  if (level === 4) {
    return (
      <>
        <p className="challenge-prompt">
          Someone says {question.a} {sign} {question.b} = {question.reported}.
        </p>
        <p className="sequence-strip">
          1. Round to the nearest 100. About how much is it?
        </p>
        <ChoiceGrid options={question.estimateOptions} selected={estimate} onSelect={setEstimate} disabled={locked} />
        <p className="sequence-strip">
          2. Check: {question.reported} {inverseSign} {question.b} = ?
        </p>
        <NumberInput label="My check gives" value={value} onChange={setValue} disabled={locked} />
        <p className="sequence-strip">3. Is {question.reported} right?</p>
        <ChoiceGrid options={["Yes", "No"]} selected={selected} onSelect={setSelected} disabled={locked} />
        <button
          type="button"
          className="submit-btn"
          disabled={locked || estimate === null || value === "" || selected === null}
          onClick={() => submit(
            estimate === question.estimate &&
            isCorrectNumber(value, question.inverse) &&
            selected === (question.isCorrect ? "Yes" : "No")
          )}
        >
          Check my answer
        </button>
      </>
    );
  }

  return (
    <>
      <p className="challenge-prompt">
        Someone says {question.a} {sign} {question.b} = {question.reported}. Are they right?
      </p>
      <p className="sequence-strip">
        Check: {question.reported} {inverseSign} {question.b} = ?
      </p>
      <ChoiceGrid options={["Yes", "No"]} selected={selected} onSelect={setSelected} disabled={locked} />
      <button
        type="button"
        className="submit-btn"
        disabled={locked || selected === null}
        onClick={() => submit(selected === (question.isCorrect ? "Yes" : "No"))}
      >
        Check my answer
      </button>
    </>
  );
}

export default EstimatingGame;
