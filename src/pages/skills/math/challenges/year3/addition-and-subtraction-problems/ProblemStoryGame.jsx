import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { buildAdditionSubtractionProblems } from "../../../../../../data/challenges/additionSubtractionProblems3Digit";
import { isCorrectNumber } from "../../../../../../data/challenges/placeValue3Digit";

const TITLES = {
  1: "Choose the answer to the story.",
  2: "Solve the story in two steps.",
  3: "Choose the number sentence, then solve it.",
  4: "Solve the whole story yourself.",
};

function ProblemStoryGame({ level, onComplete }) {
  const questions = useMemo(
    () => buildAdditionSubtractionProblems(level, Math.random),
    [level]
  );
  return (
    <ChallengeShell
      title={TITLES[level]}
      questions={questions}
      onComplete={onComplete}
      render={({ question, submit, locked, index }) => (
        <StoryRound key={index} level={level} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function StoryRound({ level, question, submit, locked }) {
  const [selected, setSelected] = useState(null);
  const [value, setValue] = useState("");
  const firstSign = question.first < 0 ? "−" : "+";

  return (
    <>
      <p className="challenge-prompt">{question.prompt}</p>

      {level === 2 && (
        <p className="sequence-strip">
          First: {question.start} {firstSign} {Math.abs(question.first)} = {question.afterFirst}
        </p>
      )}

      {(level === 1 || level === 3) && (
        <ChoiceGrid
          options={level === 1 ? question.options : question.expressions}
          selected={selected}
          onSelect={setSelected}
          disabled={locked}
        />
      )}

      {level > 1 && (
        <NumberInput
          label="Final answer"
          value={value}
          onChange={setValue}
          disabled={locked}
        />
      )}

      <button
        type="button"
        className="submit-btn"
        disabled={locked || (level === 1 ? selected === null : value === "" || (level === 3 && selected === null))}
        onClick={() => submit(level === 1
          ? selected === question.answer
          : isCorrectNumber(value, question.answer) &&
            (level !== 3 || selected === question.expression))}
      >
        Check my answer
      </button>
    </>
  );
}

export default ProblemStoryGame;
