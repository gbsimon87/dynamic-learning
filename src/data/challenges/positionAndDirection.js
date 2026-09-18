/**
 * Pure logic for "Geometry - Position and Direction".
 *
 * Statutory scope (docs/curriculum/year-2-maths.md): order and arrange
 * objects in patterns and sequences; and describe position, direction and
 * movement, including movement in a straight line and distinguishing rotation
 * as a turn and in terms of RIGHT ANGLES for quarter, half and three-quarter
 * turns, clockwise and anti-clockwise.
 *
 * Turns are held as right angles rather than degrees. A Year 2 learner is
 * never shown "90°", so degrees exist here only where the UI has to rotate a
 * picture.
 */

/** Clockwise from up. The order matters: turning is an index shift. */
export const HEADINGS = ["up", "right", "down", "left"];

export const TURNS = [
  { id: "quarter", name: "quarter turn", rightAngles: 1, degrees: 90 },
  { id: "half", name: "half turn", rightAngles: 2, degrees: 180 },
  { id: "three-quarter", name: "three-quarter turn", rightAngles: 3, degrees: 270 },
];

function turnSteps(turnId) {
  return TURNS.find((t) => t.id === turnId).rightAngles;
}

/** Where you face after turning. Wraps, so four quarter turns come home. */
export function applyTurn(heading, turnId, direction) {
  const steps = turnSteps(turnId) * (direction === "anti-clockwise" ? -1 : 1);
  const index = (HEADINGS.indexOf(heading) + steps + 4 * 4) % 4;
  return HEADINGS[index];
}

/**
 * The turn that gets you from one heading to another, named the short way
 * round: three-quarters clockwise is reported as a quarter anti-clockwise,
 * because that is how a child would describe it.
 */
export function turnBetween(from, to) {
  const steps = (HEADINGS.indexOf(to) - HEADINGS.indexOf(from) + 4) % 4;
  if (steps === 0) return null;
  if (steps === 1) return { turn: "quarter", direction: "clockwise" };
  if (steps === 2) return { turn: "half", direction: "clockwise" };
  return { turn: "quarter", direction: "anti-clockwise" };
}

export function headingName(heading) {
  return heading;
}

/** How far a heading is rotated from "up", for a CSS transform. */
export function headingDegrees(heading) {
  return HEADINGS.indexOf(heading) * 90;
}

/** The item at `index` of an endlessly repeating pattern. */
export function patternAt(pattern, index) {
  return pattern[index % pattern.length];
}

const STEP = { up: [0, -1], right: [1, 0], down: [0, 1], left: [-1, 0] };

/**
 * Runs a robot program on a `size` x `size` grid.
 *
 * "forward" moves one square in the direction faced; "left" and "right" turn
 * a quarter turn without moving. A move that would leave the grid is ignored
 * rather than clamped oddly, so the drawing and the position never disagree.
 */
export function runProgram(start, instructions, size) {
  let state = { ...start };

  for (const instruction of instructions) {
    if (instruction === "right") {
      state = { ...state, heading: applyTurn(state.heading, "quarter", "clockwise") };
      continue;
    }
    if (instruction === "left") {
      state = { ...state, heading: applyTurn(state.heading, "quarter", "anti-clockwise") };
      continue;
    }

    const [dx, dy] = STEP[state.heading];
    const x = state.x + dx;
    const y = state.y + dy;
    // Walked into a wall: stay put.
    if (x < 0 || y < 0 || x >= size || y >= size) continue;
    state = { ...state, x, y };
  }

  return state;
}

/**
 * Where `subject` sits relative to `other`, in the words Year 2 uses.
 *
 * y grows downwards, matching how the grid is drawn, so a smaller y is
 * "above".
 */
export function describePosition(subject, other) {
  if (subject.x === other.x && subject.y < other.y) return "above";
  if (subject.x === other.x && subject.y > other.y) return "below";
  if (subject.y === other.y && subject.x < other.x) return "left of";
  if (subject.y === other.y && subject.x > other.x) return "right of";
  return null;
}
