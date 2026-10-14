import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import RotationDial from "../../../../../../components/challenge/RotationDial";
import { buildNameTurn } from "../../../../../../data/challenges/positionQuestions";

/**
 * Challenge 3 - name the turn.
 *
 * The reverse of challenge 1: both headings are shown and the learner names
 * the turn that connects them. Each of the three answers comes up exactly
 * twice (see buildNameTurn).
 *
 * A three-quarter turn clockwise is reported as a quarter anti-clockwise,
 * because that is how it would be described out loud.
 */

function TurnsChallenge3({ onComplete }) {
  const questions = useMemo(() => buildNameTurn(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="What turn was that?"
      render={({ question, submit, locked, index }) => (
        <NameTurn key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function NameTurn({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="challenge-prompt">
        The arrow was pointing <strong>{question.from}</strong>. Now it points{" "}
        <strong>{question.to}</strong>.
      </p>

      <RotationDial heading={question.to} showControls={false} />

      <p className="challenge-prompt">What turn did it make?</p>

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

export default TurnsChallenge3;
