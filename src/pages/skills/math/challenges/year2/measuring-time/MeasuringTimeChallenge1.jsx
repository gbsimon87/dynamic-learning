import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import ClockFace from "../../../../../../components/challenge/ClockFace";
import { buildClockReadQuestions } from "../../../../../../data/challenges/measurement";

/**
 * Challenge 1 - read the clock.
 *
 * O'clock, half past and the quarters, which are the landmark times — each
 * at least once, at a fresh hour each attempt. The wrong options are the
 * mistakes children really make with THIS clock: the hands read the wrong way
 * round, the hour one out, or past and to mixed up.
 */

function MeasuringTimeChallenge1({ onComplete }) {
  const questions = useMemo(() => buildClockReadQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="What time is it?"
      render={({ question, submit, locked, index }) => (
        <ReadClock key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function ReadClock({ question, submit, locked }) {
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

export default MeasuringTimeChallenge1;
