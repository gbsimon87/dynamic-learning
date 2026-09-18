import { headingDegrees } from "../../data/challenges/positionAndDirection";
import "./challenge-kit.css";

/**
 * A robot on a grid, with a target square.
 *
 * The guidance's own example: "programming robots using instructions given in
 * right angles". The robot's nose points where it faces, so a learner can see
 * that a turn changes nothing but the direction.
 *
 * Display only — the program is built by the challenge and run through the
 * tested runProgram, so what is drawn and what is checked cannot drift.
 */
function RobotGrid({ size, robot, target, label }) {
  const cells = [];
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) cells.push({ x, y });
  }

  return (
    <div
      className="robot-grid"
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      role="img"
      aria-label={
        label ??
        `a robot at column ${robot.x + 1}, row ${robot.y + 1}, facing ${robot.heading}`
      }
    >
      {cells.map(({ x, y }) => {
        const isRobot = robot.x === x && robot.y === y;
        const isTarget = target.x === x && target.y === y;
        return (
          <div key={`${x}-${y}`} className={`robot-cell ${isTarget ? "target" : ""}`}>
            {isTarget && !isRobot && <span className="robot-flag">★</span>}
            {isRobot && (
              <span
                className="robot"
                style={{ transform: `rotate(${headingDegrees(robot.heading)}deg)` }}
              >
                ▲
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default RobotGrid;
