import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import ColumnBuilder from "../../../../../components/challenge/ColumnBuilder";
import NumberInput from "../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../data/challenges/placeValue3Digit";
import { buildColumnAdditionQuestions } from "../../../../../data/challenges/columnAddition3Digit";
import { buildColumnSubtractionQuestions } from "../../../../../data/challenges/columnSubtraction3Digit";

const TITLES = {
  add: [
    "Add each column.",
    "Exchange ten ones for one ten.",
    "Fill in the whole answer.",
    "Use column addition to solve the story.",
  ],
  subtract: [
    "Subtract each column.",
    "Exchange one ten for ten ones.",
    "Fill in the whole answer.",
    "Use column subtraction to solve the story.",
  ],
};

function ColumnMethodGame({ operation, level, onComplete }) {
  const questions = useMemo(() => (
    operation === "add"
      ? buildColumnAdditionQuestions(level, Math.random)
      : buildColumnSubtractionQuestions(level, Math.random)
  ), [operation, level]);

  return (
    <ChallengeShell
      title={TITLES[operation][level - 1]}
      questions={questions}
      onComplete={onComplete}
      render={({ question, submit, locked, index }) => (
        <ColumnRound
          key={index}
          question={question}
          operation={operation}
          level={level}
          submit={submit}
          locked={locked}
        />
      )}
    />
  );
}

function ColumnRound({ question, operation, level, submit, locked }) {
  const [selected, setSelected] = useState(null);
  const [value, setValue] = useState("");
  const [digits, setDigits] = useState({ hundreds: "", tens: "", ones: "" });
  const [activeColumn, setActiveColumn] = useState("ones");
  const sign = operation === "add" ? "+" : "−";

  const setActiveDigit = (updater) => {
    setDigits((previous) => ({
      ...previous,
      [activeColumn]: typeof updater === "function"
        ? updater(previous[activeColumn])
        : updater,
    }));
  };

  const marks = level === 2
    ? operation === "add"
      ? { carries: question.carries }
      : { exchanges: question.exchanges }
    : {};

  return (
    <>
      {level === 4 ? (
        <p className="challenge-prompt">{question.prompt}</p>
      ) : (
        <p className="challenge-prompt">
          {question.a} {sign} {question.b} = ?
        </p>
      )}

      <ColumnBuilder
        top={question.a}
        bottom={question.b}
        operation={operation}
        answer={level === 3 ? digits : {}}
        activeColumn={level === 3 ? activeColumn : undefined}
        onColumnFocus={level === 3 && !locked ? setActiveColumn : undefined}
        label={`${question.a} ${operation === "add" ? "plus" : "minus"} ${question.b}. ${level === 3 ? `Select a column and enter its digit.` : "Find the answer."}`}
        {...marks}
      />

      {level <= 2 && (
        <ChoiceGrid options={question.options} selected={selected} onSelect={setSelected} disabled={locked} />
      )}

      {level === 3 && (
        <>
          <p className="challenge-prompt" aria-live="polite">Enter the {activeColumn} digit.</p>
          <NumberInput
            hideField
            maxDigits={1}
            value={digits[activeColumn]}
            onChange={setActiveDigit}
            disabled={locked}
          />
        </>
      )}

      {level === 4 && (
        <NumberInput label="My answer is" value={value} onChange={setValue} disabled={locked} />
      )}

      <button
        type="button"
        className="submit-btn"
        disabled={locked ||
          (level <= 2 && selected === null) ||
          (level === 3 && Object.values(digits).some((digit) => digit === "")) ||
          (level === 4 && value === "")}
        onClick={() => {
          const correct = level <= 2
            ? selected === question.answer
            : level === 3
              ? isCorrectNumber(`${digits.hundreds}${digits.tens}${digits.ones}`, question.answer)
              : isCorrectNumber(value, question.answer);
          submit(correct);
        }}
      >
        Check my answer
      </button>
    </>
  );
}

export default ColumnMethodGame;
