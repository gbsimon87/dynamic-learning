import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import ClockFace from "../../../../../../components/challenge/ClockFace";
import { timeToWords } from "../../../../../../data/challenges/measurement";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 1 - read the clock.
 *
 * Starts with o'clock, half past and the quarters, which are the landmark
 * times. Every distractor is another real time from the same set, so the
 * hands have to be read rather than the answer guessed from its shape.
 */

const TIMES = [
  { hour: 3, minute: 0 },
  { hour: 7, minute: 30 },
  { hour: 9, minute: 15 },
  { hour: 5, minute: 45 },
  { hour: 12, minute: 30 },
  { hour: 1, minute: 15 },
];

function buildQuestions(rng) {
  return shuffle(TIMES, rng).map((time) => {
    const answer = timeToWords(time.hour, time.minute);
    const others = TIMES.filter(
      (t) => timeToWords(t.hour, t.minute) !== answer
    ).map((t) => timeToWords(t.hour, t.minute));
    return {
      ...time,
      answer,
      options: shuffle([answer, ...shuffle(others, rng).slice(0, 2)], rng),
    };
  });
}

function MeasuringTimeChallenge1({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

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
