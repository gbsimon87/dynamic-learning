import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import PlaceValueBlocks from "../../../../../../components/challenge/PlaceValueBlocks";
import {
  buildNumberFromBlocks,
  buildRepresentQuestions,
  emptyBlocks,
  stepBlocks,
} from "../../../../../../data/challenges/representingNumbers";

/**
 * Challenge 3 — represent: build the number instead of reading one.
 *
 * Whole-structure work. Reading blocks can be done a column at a time; building
 * cannot be finished until all three columns are right at once, and the
 * learner has to decide how many of each piece before touching anything.
 *
 * Four of the six targets have an empty column — 307, 450, 520, 609 — because
 * the instinct being corrected is putting something in every pile.
 */

function RepresentingAndEstimatingNumbersChallenge3({ onComplete }) {
  const questions = useMemo(() => buildRepresentQuestions(3, Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Build the number."
      render={({ question, submit, locked, index }) => (
        <BuildNumber key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function BuildNumber({ question, submit, locked }) {
  const [blocks, setBlocks] = useState(emptyBlocks);

  // PlaceValueBlocks emits a STEP, never a total. Applying it functionally is
  // what keeps two fast taps from landing in one React batch with the second
  // overwriting the first — a tap would be silently lost.
  const step = (place, delta) =>
    setBlocks((previous) => stepBlocks(previous, place, delta));

  return (
    <>
      <p className="challenge-prompt">
        Use the buttons to make <strong>{question.target}</strong>.
      </p>

      {/* Column counts stay visible — they say how many pieces are in each pile,
          which the learner put there. The TOTAL is not shown: that would turn
          the task into nudging a number until it matched. */}
      <PlaceValueBlocks
        blocks={blocks}
        onStep={step}
        label="The blocks you have built so far"
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() => submit(buildNumberFromBlocks(blocks) === question.answer)}
      >
        Check my answer
      </button>
    </>
  );
}

export default RepresentingAndEstimatingNumbersChallenge3;
