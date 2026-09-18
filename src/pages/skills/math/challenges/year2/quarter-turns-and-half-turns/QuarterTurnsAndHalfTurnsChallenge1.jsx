import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import RotationDial from "../../../../../../components/challenge/RotationDial";
import { HEADINGS, TURNS, applyTurn } from "../../../../../../data/challenges/positionAndDirection";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 1 - where will it point?
 *
 * The arrow starts somewhere and the turn is named; the learner says where it
 * ends up. The dial's right-angle guides stay on screen so a quarter turn can
 * be seen to be a quarter.
 *
 * Controls are hidden here — this is a prediction, not an experiment.
 */

const PLANS = [
  { from: "up", turn: "quarter", direction: "clockwise" },
  { from: "up", turn: "half", direction: "clockwise" },
  { from: "right", turn: "quarter", direction: "anti-clockwise" },
  { from: "down", turn: "quarter", direction: "clockwise" },
  { from: "left", turn: "half", direction: "anti-clockwise" },
  { from: "up", turn: "three-quarter", direction: "clockwise" },
];

function buildQuestions(rng) {
  return shuffle(PLANS, rng).map((plan) => ({
    ...plan,
    turnName: TURNS.find((t) => t.id === plan.turn).name,
    answer: applyTurn(plan.from, plan.turn, plan.direction),
    options: HEADINGS,
  }));
}

function TurnsChallenge1({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

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
