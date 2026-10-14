import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { buildTemperatureOrderQuestions } from "../../../../../../data/challenges/measurement";

/**
 * Challenge 3 - order temperatures.
 *
 * Four temperatures from 0 °C to 50 °C, made fresh each attempt. The first
 * three ask for the coldest first and the last three for the hottest first,
 * so the instruction has to be read, not assumed.
 */

function MeasuringTemperatureChallenge3({ onComplete }) {
  const questions = useMemo(() => buildTemperatureOrderQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Put the temperatures in order."
      render={({ question, submit, locked, index }) => (
        <OrderTemperatures key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function OrderTemperatures({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);

  return (
    <>
      <p className="challenge-prompt">
        Drag them so the <strong>{question.first}</strong> is first.
      </p>

      <DragToOrder items={items} onReorder={setItems} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() => submit(items.every((item, i) => item.id === question.ordered[i]))}
      >
        Check my answer
      </button>
    </>
  );
}

export default MeasuringTemperatureChallenge3;
