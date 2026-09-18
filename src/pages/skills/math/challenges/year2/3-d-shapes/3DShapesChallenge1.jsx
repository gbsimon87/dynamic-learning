import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import SolidFigure from "../../../../../../components/challenge/SolidFigure";
import { SOLIDS } from "../../../../../../data/challenges/shapes";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * NOTE ON THE NAME: the file must be 3DShapesChallengeN.jsx for the dynamic
 * loader, but that is not a valid JavaScript identifier, so the component is
 * named differently and reached through the default export.
 *
 * Challenge 1 - name the solid.
 *
 * All seven solids appear, including the curved ones, because naming them is
 * not the part that depends on a counting convention.
 */

function buildQuestions(rng) {
  return shuffle(SOLIDS, rng)
    .slice(0, 6)
    .map((solid) => {
      const others = SOLIDS.filter((s) => s.id !== solid.id).map((s) => s.name);
      return {
        solid,
        answer: solid.name,
        options: shuffle([solid.name, ...shuffle(others, rng).slice(0, 2)], rng),
      };
    });
}

function SolidsChallenge1({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="What is this solid called?"
      render={({ question, submit, locked, index }) => (
        <NameSolid key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function NameSolid({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <SolidFigure solid={question.solid} label="a solid shape to name" />

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

export default SolidsChallenge1;
