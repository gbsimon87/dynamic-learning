import MagnetFigure from "./MagnetFigure";
import { magnetArrangement, magnetObservation } from "../../data/challenges/science/magnetModel.js";
import "./science-kit.css";

/** Controlled orientations and explicit synchronous run/reset. No animation or timers. */
export default function MagnetExplorer({ pair, tested, onTurn, onRun, onReset, disabled, turnSide = null }) {
  if (!magnetArrangement(pair, tested)) return <p role="status">This magnet arrangement is unavailable. Restart the challenge to try again.</p>;
  const observation = magnetObservation(pair, "explorer", tested ? "Your test" : "Your magnets", tested);
  return <section className="science-sequence" aria-label="Bar-magnet arrangement explorer"><MagnetFigure observation={observation} />
    <div className="science-sequence-controls" role="group" aria-label="Turn and test magnets">{["left", "right"].map(side => <button key={side} type="button" disabled={disabled || (turnSide !== null && turnSide !== side)} onClick={() => { if (!disabled && (turnSide === null || turnSide === side)) onTurn(side); }}>Turn {side} magnet</button>)}
      <button type="button" disabled={disabled || tested} onClick={() => { if (!disabled && !tested) onRun(); }}>Run the test</button><button type="button" disabled={disabled} onClick={() => { if (!disabled) onReset(); }}>Start again</button>
    </div><p>If you turn a magnet, run the test again before you check.</p>
  </section>;
}
