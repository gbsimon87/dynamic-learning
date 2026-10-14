import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildTensQuestions } from "../../../../../../data/challenges/additionAndSubtraction";

/**
 * Challenge 2 - a two-digit number and 10s.
 *
 * Adding or taking ten changes only the tens digit, which is why the
 * distractors are the answer one ten out and the start with its ONES changed
 * instead (34 + 20 -> 36): a learner who adjusts the wrong column lands on
 * their own mistake rather than something obviously silly.
 */

function UsingTwoDigitNumbersChallenge2({ onComplete }) {
  const questions = useMemo(() => buildTensQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Only the tens change."
      render={({ question, submit, locked, index }) => (
        <AddTens key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function AddTens({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="sequence-strip">
        {question.start} {question.change < 0 ? "−" : "+"}{" "}
        {Math.abs(question.change)} = ?
      </p>

      <ChoiceGrid
        options={question.options}
        selected={selected}
        onSelect={setSelected}
        disabled={locked}
      />

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

export default UsingTwoDigitNumbersChallenge2;
