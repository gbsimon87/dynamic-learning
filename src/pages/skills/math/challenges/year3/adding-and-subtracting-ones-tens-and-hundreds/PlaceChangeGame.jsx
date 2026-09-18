import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import PlaceValueBlocks from "../../../../../../components/challenge/PlaceValueBlocks";
import {
  blockValue,
  buildPlaceChangeQuestions,
  changeWords,
  stepBlocks,
} from "../../../../../../data/challenges/addingAndSubtractingPlaces";
import { isCorrectNumber } from "../../../../../../data/challenges/placeValue3Digit";

const TITLES = {
  1: "Change one place.",
  2: "Work it out in your head.",
  3: "Build the new number with blocks.",
  4: "Solve the number story.",
};

function PlaceChangeGame({ level, onComplete }) {
  const questions = useMemo(
    () => buildPlaceChangeQuestions(level, Math.random),
    [level]
  );

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title={TITLES[level]}
      render={({ question, submit, locked, index }) => (
        <PlaceChangeRound
          key={index}
          level={level}
          question={question}
          submit={submit}
          locked={locked}
        />
      )}
    />
  );
}

function PlaceChangeRound({ level, question, submit, locked }) {
  const [selected, setSelected] = useState(null);
  const [value, setValue] = useState("");
  const [blocks, setBlocks] = useState(question.picture);

  if (level === 1) {
    return (
      <>
        <p className="challenge-prompt">
          What is <strong>{changeWords(question.change)}</strong> than {question.start}?
        </p>
        <PlaceValueBlocks
          blocks={question.picture}
          highlight={question.place}
          showCounts={false}
          label={`Base-ten blocks showing ${question.start}. The ${question.place} column is highlighted.`}
        />
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

  if (level === 3) {
    return (
      <>
        <p className="challenge-prompt">
          Start at {question.start}. {question.changes.map((change) =>
            change > 0 ? `Add ${change}` : `Take away ${Math.abs(change)}`
          ).join(", then ")}. Build the answer.
        </p>
        <PlaceValueBlocks
          blocks={blocks}
          onStep={(place, delta) => setBlocks((previous) => stepBlocks(previous, place, delta))}
          label={`Base-ten blocks now showing ${blockValue(blocks)}`}
        />
        <button
          type="button"
          className="submit-btn"
          disabled={locked}
          onClick={() => submit(blockValue(blocks) === question.answer)}
        >
          Check my answer
        </button>
      </>
    );
  }

  return (
    <>
      {level === 2 ? (
        <p className="sequence-strip">
          {question.start} {question.change > 0 ? "+" : "−"} {Math.abs(question.change)} = ?
        </p>
      ) : (
        <p className="challenge-prompt">{question.prompt}</p>
      )}
      <NumberInput label="My answer is" value={value} onChange={setValue} disabled={locked} />
      <button
        type="button"
        className="submit-btn"
        disabled={locked || value === ""}
        onClick={() => submit(isCorrectNumber(value, question.answer))}
      >
        Check my answer
      </button>
    </>
  );
}

export default PlaceChangeGame;
