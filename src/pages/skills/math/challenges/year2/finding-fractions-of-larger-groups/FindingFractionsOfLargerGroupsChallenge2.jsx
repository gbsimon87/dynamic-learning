import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildFractionOfMeasure } from "../../../../../../data/challenges/fractions";

/**
 * Challenge 2 - fractions of a quantity: lengths, liquids, weights and money.
 *
 * The statutory text says fractions "of a length, shape, set of objects or
 * quantity". All five Year 2 fractions appear, of amounts a Year 2 child can
 * halve, halve again or share into 3. Every option carries its unit, and the
 * wrong ones are other fractions of the same amount, so taking 1/4 instead of
 * 3/4 lands on an offered answer.
 */

function FindingFractionsOfLargerGroupsChallenge2({ onComplete }) {
  const questions = useMemo(() => buildFractionOfMeasure(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Find a fraction of an amount."
      render={({ question, submit, locked, index }) => (
        <FractionOfAmount key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function FractionOfAmount({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="challenge-prompt">{question.prompt}</p>

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

export default FindingFractionsOfLargerGroupsChallenge2;
