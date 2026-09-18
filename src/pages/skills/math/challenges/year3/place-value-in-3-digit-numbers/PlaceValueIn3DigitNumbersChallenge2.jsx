import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import PlaceValueBlocks from "../../../../../../components/challenge/PlaceValueBlocks";
import {
  blockPicture3,
  isCorrectNumber,
  shuffleValues,
} from "../../../../../../data/challenges/placeValue3Digit";

/**
 * Challenge 2 — the rule must be inferred.
 *
 * Nothing is highlighted and no place is named: the learner has to work out
 * that the flats are worth a hundred each and combine all three columns. That
 * is the step up from Challenge 1, where the question did the deciding.
 *
 * A typed answer rather than options, so there is nothing to eliminate.
 */

const NUMBERS = [146, 208, 315, 427, 530, 692];

function buildQuestions(rng) {
  return shuffleValues(NUMBERS, rng).map((value) => ({
    value,
    picture: blockPicture3(value),
  }));
}

function PlaceValueIn3DigitNumbersChallenge2({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="What number do the blocks make?"
      render={({ question, submit, locked, index }) => (
        <ReadBlocks key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function ReadBlocks({ question, submit, locked }) {
  const [entered, setEntered] = useState("");

  return (
    <>
      <p className="challenge-prompt">Write the number the blocks show.</p>

      <PlaceValueBlocks
        blocks={question.picture}
        showCounts={false}
        label="Blocks to read as a number"
      />

      <NumberInput
        value={entered}
        onChange={setEntered}
        disabled={locked}
        label="The number"
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || entered === ""}
        onClick={() => submit(isCorrectNumber(entered, question.value))}
      >
        Check my answer
      </button>
    </>
  );
}

export default PlaceValueIn3DigitNumbersChallenge2;
