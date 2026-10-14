import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { buildUseDoublesQuestions } from "../../../../../../data/challenges/additionAndSubtraction";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";

/**
 * Challenge 4 - use a doubling or halving fact to work out a new one.
 *
 * Each question shows a double or half the learner knows and asks for one
 * they can reach from it: double 30 from double 3, half of 80 from half of 8,
 * and the near doubles 6 + 7 and 8 + 7 from double 6 and double 8. Typed, so
 * there is nothing to eliminate.
 */

function DoublingAndHalvingUsingAdditionAndSubtractionChallenge4({ onComplete }) {
  const questions = useMemo(() => buildUseDoublesQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Use the fact you already know."
      render={({ question, submit, locked, index }) => (
        <RelatedFact key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function RelatedFact({ question, submit, locked }) {
  const [value, setValue] = useState("");

  return (
    <>
      <p className="sequence-strip">{question.known}</p>
      <p className="challenge-prompt">{question.prompt}</p>

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

export default DoublingAndHalvingUsingAdditionAndSubtractionChallenge4;
