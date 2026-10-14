import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildEverydaySolids } from "../../../../../../data/challenges/shapeQuestions";

/**
 * Challenge 3 - everyday objects.
 *
 * Statutory: "compare and sort common 2-D and 3-D shapes AND EVERYDAY
 * OBJECTS". A solid shape is worth nothing as a name if a child cannot see a
 * cylinder in a tin, so the question runs that way round. Six objects are
 * drawn from fifteen, and no solid is the answer more than twice.
 */

function SolidsChallenge3({ onComplete }) {
  const questions = useMemo(() => buildEverydaySolids(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Shapes in real things."
      render={({ question, submit, locked, index }) => (
        <MatchObject key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function MatchObject({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="sequence-strip">{question.object}</p>

      <p className="challenge-prompt">Which solid shape is it like?</p>

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
        onClick={() => submit(selected === question.answerName)}
      >
        Check my answer
      </button>
    </>
  );
}

export default SolidsChallenge3;
