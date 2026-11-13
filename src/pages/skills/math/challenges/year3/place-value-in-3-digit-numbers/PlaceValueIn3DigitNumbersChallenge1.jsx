import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import PlaceValueBlocks from "../../../../../../components/challenge/PlaceValueBlocks";
import { buildPlaceDigitQuestions } from "../../../../../../data/challenges/placeValue3Digit";

/**
 * Challenge 1 — the gentlest slot: the number is drawn, and the question names
 * the place it is asking about.
 *
 * Nothing has to be inferred here. The learner counts one column of blocks and
 * reads the count. The highlighted column removes the "which pile do I look
 * at?" problem so the only skill being tested is recognising the place.
 */

function PlaceValueIn3DigitNumbersChallenge1({ onComplete }) {
  const questions = useMemo(() => buildPlaceDigitQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Count the blocks."
      render={({ question, submit, locked, index }) => (
        <CountPlace key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function CountPlace({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="challenge-prompt">
        How many <strong>{question.place}</strong> are there?
      </p>

      {/* Counts are hidden: printing "hundreds 4" above the blocks answers the
          question outright, and the task is to COUNT them. The highlight still
          says which column to look at. */}
      <PlaceValueBlocks
        blocks={question.picture}
        highlight={question.place}
        showCounts={false}
        label={`Blocks showing ${question.value}`}
      />

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

export default PlaceValueIn3DigitNumbersChallenge1;
