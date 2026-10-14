import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ClockFace from "../../../../../../components/challenge/ClockFace";
import TimeSetter from "../../../../../../components/challenge/TimeSetter";
import { buildClockSetQuestions } from "../../../../../../data/challenges/measurement";

/**
 * Challenge 3 - set the clock.
 *
 * Statutory: "draw the hands on a clock face to show these times". Steppers
 * rather than draggable hands — minutes move in fives, so the control cannot
 * express a time finer than Year 2 is asked for.
 *
 * The long-hand buttons turn the clock like a real one (`carryHour`): the
 * short hand follows, so "quarter to 3" is set as 3 o'clock and then the long
 * hand back a quarter. No child has to know to put 2 in the hours for a time
 * that says 3. The landmark times come first, then one five-minute time past
 * the hour and one to it.
 */

function MeasuringTimeChallenge3({ onComplete }) {
  const questions = useMemo(() => buildClockSetQuestions(Math.random), []);

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

      <p className="challenge-prompt">
        Set the hour first. Then move the long hand. The short hand moves with it.
      </p>

      <ClockFace hour={time.hour} minute={time.minute} label="The clock you are setting" />

      <TimeSetter
        hour={time.hour}
        minute={time.minute}
        onChange={setTime}
        disabled={locked}
        carryHour
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
