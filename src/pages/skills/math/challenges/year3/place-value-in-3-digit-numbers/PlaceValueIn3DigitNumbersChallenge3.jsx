import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import PlaceValueBlocks from "../../../../../../components/challenge/PlaceValueBlocks";
import {
  buildNumberFromBlocks,
  shuffleValues,
} from "../../../../../../data/challenges/placeValue3Digit";

/**
 * Challenge 3 — whole-structure work: build the number, don't read one.
 *
 * Constructing 253 out of flats, rods and cubes is a different skill from
 * recognising it, and it is where a learner reveals whether "5 tens" means
 * fifty to them. Reading challenges alone never expose that.
 */

const NUMBERS = [132, 245, 306, 420, 514, 263];

function buildQuestions(rng) {
  return shuffleValues(NUMBERS, rng).map((value) => ({ value }));
}

function PlaceValueIn3DigitNumbersChallenge3({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

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
  const [blocks, setBlocks] = useState({ hundreds: 0, tens: 0, ones: 0 });

  // The component hands back a STEP, and it is applied functionally and clamped
  // here. Two quick taps land in one React batch, so applying a total computed
  // from the current render would silently drop the second tap.
  const step = (place, delta) =>
    setBlocks((prev) => ({
      ...prev,
      [place]: Math.max(0, Math.min(9, prev[place] + delta)),
    }));

  const built = buildNumberFromBlocks(blocks);

  return (
    <>
      <p className="challenge-prompt">
        Use the blocks to make <strong>{question.value}</strong>.
      </p>

      <PlaceValueBlocks
        blocks={blocks}
        onStep={locked ? undefined : step}
        label={`Blocks you have placed, worth ${built}`}
      />

      <p className="challenge-running" aria-live="polite">
        You have made <strong>{built}</strong>
      </p>

      <button
        type="button"
        className="submit-btn"
        disabled={locked || built === 0}
        onClick={() => submit(built === question.value)}
      >
        Check my answer
      </button>
    </>
  );
}

export default PlaceValueIn3DigitNumbersChallenge3;
