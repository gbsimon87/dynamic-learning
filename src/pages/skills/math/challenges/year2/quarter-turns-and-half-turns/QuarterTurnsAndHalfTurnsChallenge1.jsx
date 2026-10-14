import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import RotationDial from "../../../../../../components/challenge/RotationDial";
import { buildPredictTurn } from "../../../../../../data/challenges/positionQuestions";

/**
 * Challenge 1 - where will it point?
 *
 * The arrow starts somewhere and the turn is named; the learner says where it
 * ends up. The dial's right-angle guides stay on screen so a quarter turn can
 * be seen to be a quarter. Quarter, half and three-quarter turns, both ways,
 * from any start (see buildPredictTurn).
 *
 * Controls are hidden here — this is a prediction, not an experiment.
 */

function TurnsChallenge1({ onComplete }) {
  const questions = useMemo(() => buildPredictTurn(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Which way will it face?"
      render={({ question, submit, locked, index }) => (
        <PredictTurn key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function PredictTurn({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <RotationDial heading={question.from} showControls={false} />

      <p className="challenge-prompt">
        The arrow points <strong>{question.from}</strong>. It makes a{" "}
        <strong>{question.turnName} {question.direction}</strong>. Which way
        does it point now?
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

export default TurnsChallenge1;
