import { useEffect, useState } from "react";
import { levelFor } from "../../data/xp";
import "./LevelBar.css";

/**
 * "Lv 3 ▓▓▓░░ 40/200 XP". The one level display, shared by four screens.
 *
 * `from` (optional) is the XP before this run: the bar starts there (or empty,
 * if the run crossed a level) and fills to `xp` on the next frame.
 */
export default function LevelBar({ xp, from, className = "" }) {
  const { level, into, needed } = levelFor(xp);
  const target = (into / needed) * 100;

  let start = target;
  if (Number.isFinite(from) && from !== xp) {
    const before = levelFor(from);
    start = before.level === level ? (before.into / before.needed) * 100 : 0;
  }

  const [width, setWidth] = useState(start);
  useEffect(() => {
    if (width === target) return undefined;
    const frame = requestAnimationFrame(() => setWidth(target));
    return () => cancelAnimationFrame(frame);
  }, [width, target]);

  return (
    <div className={`level-bar ${className}`}>
      <span className="level-bar-level">Lv {level}</span>
      <span
        className="level-bar-track"
        role="progressbar"
        aria-label={`Level ${level}: ${into} of ${needed} XP to level ${level + 1}`}
        aria-valuemin={0}
        aria-valuemax={needed}
        aria-valuenow={into}
      >
        <span className="level-bar-fill" style={{ width: `${width}%` }} />
      </span>
      <span className="level-bar-count">{into}/{needed} XP</span>
    </div>
  );
}
