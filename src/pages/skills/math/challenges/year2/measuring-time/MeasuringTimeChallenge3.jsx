import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ClockFace from "../../../../../../components/challenge/ClockFace";
import TimeSetter from "../../../../../../components/challenge/TimeSetter";
import { timeToWords } from "../../../../../../data/challenges/measurement";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - set the clock.
 *
 * Statutory: "draw the hands on a clock face to show these times". Steppers
 * rather than draggable hands — minutes move in fives, so the control cannot
 * express a time finer than Year 2 is asked for, and the clock updates as the
 * learner goes so the hands are seen moving into place.
 */

const TARGETS = [
  { hour: 4, minute: 0 },
  { hour: 6, minute: 30 },
  { hour: 9, minute: 15 },
  { hour: 2, minute: 45 },
  { hour: 7, minute: 20 },
  { hour: 11, minute: 50 },
];

function MeasuringTimeChallenge3({ onComplete }) {
  const questions = useMemo(
    () =>
      shuffle(TARGETS, Math.random).map((target) => ({
        target,
        words: timeToWords(target.hour, target.minute),
      })),
    []
  );

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Set the clock to the right time."
      render={({ question, submit, locked, index }) => (
        <SetClock key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function SetClock({ question, submit, locked }) {
  const [time, setTime] = useState({ hour: 12, minute: 0 });

  return (
    <>
      <p className="challenge-prompt">
        Show <strong>{question.words}</strong>.
      </p>

      <ClockFace hour={time.hour} minute={time.minute} label="The clock you are setting" />

      <TimeSetter
        hour={time.hour}
        minute={time.minute}
        onChange={setTime}
        disabled={locked}
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() =>
          submit(
            time.hour === question.target.hour &&
              time.minute === question.target.minute
          )
        }
      >
        Check my answer
      </button>
    </>
  );
}

export default MeasuringTimeChallenge3;
