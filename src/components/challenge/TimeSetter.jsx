import "./challenge-kit.css";

/**
 * Steppers for setting a time, shown beside a ClockFace.
 *
 * Minutes move in fives because Year 2 tells the time to five minutes, so the
 * control cannot express an answer finer than the curriculum asks for. Hours
 * wrap 12 to 1 and minutes wrap 55 to 0, so a learner can always reach any
 * time by holding one button rather than getting stuck at an end.
 *
 * Deliberately not draggable hands: dragging a hand to a five-minute position
 * is fussy for small hands and impossible to check without a browser.
 */
function TimeSetter({ hour, minute, onChange, disabled }) {
  const setHour = (delta) => {
    const next = ((hour - 1 + delta + 12) % 12) + 1;
    onChange({ hour: next, minute });
  };

  const setMinute = (delta) => {
    const next = (minute + delta * 5 + 60) % 60;
    onChange({ hour, minute: next });
  };

  return (
    <div className="time-setter">
      <div className="time-setter-group">
        <button type="button" className="scale-step-btn" disabled={disabled} onClick={() => setHour(-1)} aria-label="Hour back">
          −
        </button>
        <span className="time-setter-value">{hour}</span>
        <button type="button" className="scale-step-btn" disabled={disabled} onClick={() => setHour(1)} aria-label="Hour forward">
          +
        </button>
        <span className="time-setter-label">hours</span>
      </div>

      <div className="time-setter-group">
        <button type="button" className="scale-step-btn" disabled={disabled} onClick={() => setMinute(-1)} aria-label="Five minutes back">
          −
        </button>
        <span className="time-setter-value">{String(minute).padStart(2, "0")}</span>
        <button type="button" className="scale-step-btn" disabled={disabled} onClick={() => setMinute(1)} aria-label="Five minutes forward">
          +
        </button>
        <span className="time-setter-label">minutes</span>
      </div>
    </div>
  );
}

export default TimeSetter;
