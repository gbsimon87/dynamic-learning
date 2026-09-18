import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import ClockFace from "../../../../../../components/challenge/ClockFace";
import { timeToWords } from "../../../../../../data/challenges/measurement";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - times to five minutes.
 *
 * Past the half hour a time is said "to" the NEXT hour, which is the part
 * that has to be taught. Half these times are past and half are to, and the
 * distractors include the same minutes read the other way round.
 */

const TIMES = [
  { hour: 2, minute: 5 },
  { hour: 4, minute: 25 },
  { hour: 6, minute: 35 },
  { hour: 8, minute: 55 },
  { hour: 10, minute: 20 },
  { hour: 11, minute: 40 },
];

function buildQuestions(rng) {
  return shuffle(TIMES, rng).map((time) => {
    const answer = timeToWords(time.hour, time.minute);
    // The same minute hand read the other way round, which is the mistake.
    const mirrored = timeToWords(time.hour, 60 - time.minute === 60 ? 30 : 60 - time.minute);
    const others = TIMES.map((t) => timeToWords(t.hour, t.minute)).filter(
      (label) => label !== answer && label !== mirrored
    );
    const pool = [mirrored, ...shuffle(others, rng)].filter(
      (label, i, all) => label !== answer && all.indexOf(label) === i
    );
    return { ...time, answer, options: shuffle([answer, ...pool.slice(0, 2)], rng) };
  });
}

function MeasuringTimeChallenge2({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

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
