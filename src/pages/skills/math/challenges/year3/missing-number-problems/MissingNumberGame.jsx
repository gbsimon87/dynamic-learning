import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { buildMissingNumberQuestions } from "../../../../../../data/challenges/missingNumber3Digit";
import { isCorrectNumber } from "../../../../../../data/challenges/placeValue3Digit";

const TITLES = {
  1: "Find the missing part.",
  2: "Use addition to help you subtract.",
  3: "One number fits both blanks.",
  4: "Find the missing number in the story.",
};

function MissingNumberGame({ level, onComplete }) {
  const questions = useMemo(() => buildMissingNumberQuestions(level, Math.random), [level]);
  return (
    <ChallengeShell
      title={TITLES[level]}
      questions={questions}
      onComplete={onComplete}
      render={({ question, submit, locked, index }) => (
        <MissingNumberRound key={index} level={level} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function MissingNumberRound({ level, question, submit, locked }) {
  const [selected, setSelected] = useState(null);
  const [value, setValue] = useState("");

  return (
    <>
      {level === 4 ? (
        <p className="challenge-prompt">{question.prompt}</p>
      ) : level === 3 ? (
        <p className="sequence-strip">
          ? + {question.known} = {question.whole}<br />
          {question.whole} − {question.known} = ?
        </p>
      ) : level === 2 ? (
        <p className="sequence-strip">{question.whole} − ? = {question.remainder}</p>
      ) : (
        <p className="sequence-strip">{question.known} + ? = {question.whole}</p>
      )}

      {level === 1 ? (
        <ChoiceGrid options={question.options} selected={selected} onSelect={setSelected} disabled={locked} />
      ) : (
        <NumberInput
          label={level === 3 ? "Number in both blanks" : "My answer is"}
          value={value}
          onChange={setValue}
          disabled={locked}
        />
      )}

      <button
        type="button"
        className="submit-btn"
        disabled={locked || (level === 1 ? selected === null : value === "")}
        onClick={() => submit(level === 1
          ? selected === question.answer
          : isCorrectNumber(value, question.answer))}
      >
        Check my answer
      </button>
    </>
  );
}

export default MissingNumberGame;
