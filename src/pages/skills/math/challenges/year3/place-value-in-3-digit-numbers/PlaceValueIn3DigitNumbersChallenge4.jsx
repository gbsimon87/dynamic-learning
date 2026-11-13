import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import {
  isCorrectNumber,
} from "../../../../../../data/challenges/placeValue3Digit";
import { buildPartitionGapQuestions } from "../../../../../../data/challenges/placeValue3Digit";

/**
 * Challenge 4 — applied, and the part that is genuinely new in Year 3.
 *
 * The programme of study's own guidance gives both partitions of the same
 * number: 146 = 100 + 40 + 6, and 146 = 130 + 16. A learner who only ever meets
 * the first believes a number has one decomposition, which is exactly the
 * belief that makes column subtraction with exchange feel arbitrary later.
 *
 * Every question hides one term and asks for it back, so there is nothing to
 * eliminate — the answer has to be worked out.
 */

function PlaceValueIn3DigitNumbersChallenge4({ onComplete }) {
  const questions = useMemo(() => buildPartitionGapQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Break the number apart."
      render={({ question, submit, locked, index }) => (
        <FillPartition key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function FillPartition({ question, submit, locked }) {
  const [entered, setEntered] = useState("");

  return (
    <>
      <p className="challenge-prompt">
        {question.useRegrouped
          ? "There is more than one way to split a number. Fill in the missing part."
          : "Fill in the missing part."}
      </p>

      <p className="partition-sentence">
        <strong>{question.value}</strong>
        {" = "}
        {question.parts.map((part, i) => (
          <span key={i}>
            {i > 0 && " + "}
            {i === question.hiddenIndex ? (
              <span className="partition-gap">{entered === "" ? "?" : entered}</span>
            ) : (
              part
            )}
          </span>
        ))}
      </p>

      <NumberInput
        value={entered}
        onChange={setEntered}
        disabled={locked}
        label="The missing part"
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || entered === ""}
        onClick={() => submit(isCorrectNumber(entered, question.answer))}
      >
        Check my answer
      </button>
    </>
  );
}

export default PlaceValueIn3DigitNumbersChallenge4;
