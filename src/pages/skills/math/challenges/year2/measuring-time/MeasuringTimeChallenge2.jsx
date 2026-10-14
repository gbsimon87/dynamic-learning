import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import ClockFace from "../../../../../../components/challenge/ClockFace";
import { buildFiveMinuteReadQuestions } from "../../../../../../data/challenges/measurement";

/**
 * Challenge 2 - times to five minutes.
 *
 * Past the half hour a time is said "to" the NEXT hour, which is the part
 * that has to be taught. Three times are past and three are to, at fresh
 * hours each attempt, and the distractors include the same minutes read the
 * other way round and the hour one out.
 */

function MeasuringTimeChallenge2({ onComplete }) {
  const questions = useMemo(() => buildFiveMinuteReadQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="After half past, we say the time TO the next hour."
      render={({ question, submit, locked, index }) => (
        <ReadFiveMinutes key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function ReadFiveMinutes({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <ClockFace
        hour={question.hour}
        minute={question.minute}
        label={`A clock showing ${question.answer}`}
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

export default MeasuringTimeChallenge2;
