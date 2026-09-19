import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import PlaceValueBlocks from "../../../../../../components/challenge/PlaceValueBlocks";
import { buildRepresentQuestions } from "../../../../../../data/challenges/representingNumbers";

/**
 * Challenge 1 — identify: read a number off a picture of it.
 *
 * The gentlest slot, because the whole number is there to be counted and
 * nothing has to be remembered. Every number has an empty or awkward column —
 * 405, 370, 902 — since the mistake worth catching is skipping a column with
 * nothing in it and reading 405 as 45.
 */

function RepresentingAndEstimatingNumbersChallenge1({ onComplete }) {
  const questions = useMemo(() => buildRepresentQuestions(1, Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="What number is shown?"
      render={({ question, submit, locked, index }) => (
        <ReadBlocks key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function ReadBlocks({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="challenge-prompt">
        Count the hundreds, then the tens, then the ones.
      </p>

      {/* Counts are hidden: printing "hundreds 4" over the blocks would spell
          the number out digit by digit, which is the question. */}
      <PlaceValueBlocks
        blocks={question.picture}
        showCounts={false}
        label="Base ten blocks to count"
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

export default RepresentingAndEstimatingNumbersChallenge1;
