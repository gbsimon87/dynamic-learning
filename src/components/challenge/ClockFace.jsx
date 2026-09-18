import DualLabelClock from "../DualLabelClock";
import "./challenge-kit.css";

/**
 * An analogue clock showing a given hour and minute.
 *
 * Wraps the DualLabelClock the app already had rather than drawing another
 * clock — it is built on react-clock and already handles the hands and marks.
 *
 * Its built-in labels are DUAL (12 above 24), which is right for the Skills
 * clock game but wrong here: a Year 2 learner telling the time does not need a
 * 21 next to the 9. That component is left alone, since the other game depends
 * on it, and this one draws plain 1–12 labels over a label-less clock instead.
 *
 * Time comes in as hour and minute rather than a Date so no caller has to think
 * about today's date, and the second hand is always hidden — Year 2 tells the
 * time to five minutes, and a sweeping hand is only noise.
 */

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);

function ClockFace({ hour, minute, label }) {
  const value = new Date(2000, 0, 1, hour % 24, minute, 0);

  return (
    <div
      className="clock-face"
      role="img"
      aria-label={label ?? `${hour}:${String(minute).padStart(2, "0")}`}
    >
      <DualLabelClock
        value={value}
        showHourHand
        showMinuteHand
        showSecondHand={false}
        showLabels={false}
      />

      {HOURS.map((h) => {
        // Same placement maths as the dual labels: 30° per hour, starting at
        // the top rather than at 3 o'clock.
        const angle = (h * 30 - 90) * (Math.PI / 180);
        return (
          <span
            key={h}
            className="clock-hour-label"
            style={{
              left: `${50 + 40 * Math.cos(angle)}%`,
              top: `${50 + 40 * Math.sin(angle)}%`,
            }}
          >
            {h}
          </span>
        );
      })}
    </div>
  );
}

export default ClockFace;
