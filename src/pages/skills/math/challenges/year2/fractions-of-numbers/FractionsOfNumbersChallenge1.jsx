import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import ArrayGrid from "../../../../../../components/challenge/ArrayGrid";
import { buildFractionOfRows } from "../../../../../../data/challenges/fractions";

/**
 * Challenge 1 - a fraction of a small amount, with the objects drawn.
 *
 * The guidance connects unit fractions to equal sharing, so the dots are laid
 * out in as many rows as the denominator: taking one row IS taking the
 * fraction. The statutory example, 1/2 of 6 = 3, is one of these.
 */

function FractionsOfNumbersChallenge1({ onComplete }) {
  const questions = useMemo(() => buildFractionOfRows(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Share them into equal rows, then take the fraction."
      render={({ question, submit, locked, index }) => (
        <FractionOfSet key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function FractionOfSet({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);
  const { numerator, denominator } = question.fraction;

  return (
    <>
      <p className="sequence-strip">
        {numerator}/{denominator} of {question.total}
      </p>

      <ArrayGrid
        rows={question.grid}
        label={`${question.total} dots in ${denominator} equal rows`}
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

export default FractionsOfNumbersChallenge1;
