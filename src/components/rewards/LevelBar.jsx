import { levelFor } from "../../data/xp";
import "./LevelBar.css";

/** "Lv 3 ▓▓▓░░ 40/200 XP". The one level display, shared by four screens. */
export default function LevelBar({ xp, className = "" }) {
  const { level, into, needed } = levelFor(xp);
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
        <span className="level-bar-fill" style={{ width: `${(into / needed) * 100}%` }} />
      </span>
      <span className="level-bar-count">{into}/{needed} XP</span>
    </div>
  );
}
