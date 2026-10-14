import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildMeasureSharing } from "../../../../../../data/challenges/multiplicationAndDivision";

/**
 * Challenge 2 - dividing lengths, liquids, weights and money.
 *
 * The guidance asks for sharing and grouping of "discrete AND continuous
 * quantities". The earlier topic shared sweets and pencils; here it is a
 * ribbon in cm, juice in ml, flour in g and money in p. Sharing answers carry
 * their unit on every option, and a pencils-for-pence or rope-into-pieces
 * story asks how many groups instead.
 */

function DivisionProblemsChallenge2({ onComplete }) {
  const questions = useMemo(() => buildMeasureSharing(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Divide lengths, amounts and money."
      render={({ question, submit, locked, index }) => (
        <SolveShare key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function SolveShare({ question, submit, locked }) {
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

export default DivisionProblemsChallenge2;
