import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildFractionOfSet } from "../../../../../../data/challenges/fractions";

/**
 * Challenge 1 - a fraction of a set of objects.
 *
 * The previous topic laid the dots out in rows already. Here the objects are
 * one loose pile, so the learner shares them into 2, 3 or 4 equal groups
 * themselves (with counters, or by halving and halving again). Sets stay at
 * 24 or fewer so sharing them out really is possible.
 */

function FindingFractionsOfLargerGroupsChallenge1({ onComplete }) {
  const questions = useMemo(() => buildFractionOfSet(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Share them into equal groups."
      render={({ question, submit, locked, index }) => (
        <FractionOfGroup key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function FractionOfGroup({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);
  const { numerator, denominator } = question.fraction;

  return (
    <>
      <p className="challenge-prompt">
        There are {question.total} {question.noun}. How many is{" "}
        <strong>
          {numerator}/{denominator}
        </strong>{" "}
        of them?
      </p>

      <p
        className="sequence-strip"
        role="img"
        aria-label={`${question.total} ${question.noun}`}
      >
        {Array.from({ length: question.total }, () => question.emoji).join(" ")}
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

export default FindingFractionsOfLargerGroupsChallenge1;
