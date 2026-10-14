/**
 * Bix's lessons for Year 2 Geometry - position and direction, one per
 * challenge slot. Each one teaches exactly what that challenge asks (see the
 * challenge files in src/pages/skills/math/challenges/year2/<topic>/ and
 * src/data/challenges/positionAndDirection.js). Worked examples use patterns,
 * turns and programs that are not in the challenge lists.
 */
export const POSITION_LESSONS = {
  patterns: [
    {
      title: "Fill the gap",
      lines: ["A pattern repeats the same shapes again and again.", "Look at the shapes before and after the gap.", "Say the pattern out loud to find the missing one."],
      example: { type: "groups", title: "What goes in the gap?", groups: [["🍎", "🍌"], ["🍎", "🍌"], ["❓", "🍌"]], label: "apple, banana, apple, banana, gap, banana", note: "The repeat is apple, banana, so the gap is an apple." },
    },
    {
      title: "What comes next",
      lines: ["Find the part that repeats.", "Point to each shape and say its name.", "Keep saying the pattern past the end."],
      example: { type: "groups", title: "What comes next?", groups: [["⭐", "⭐", "🌙"], ["⭐", "⭐", "❓"]], label: "star, star, moon, star, star, then a gap", note: "Star, star, moon again, so a moon comes next." },
    },
    {
      title: "Turned shapes keep their name",
      lines: ["Turning a shape does not change what it is.", "Upside down means the top is now at the bottom.", "Clockwise turns the same way as clock hands."],
      example: { type: "steps", title: "Turning an arrow", steps: ["The arrow points up. That is the right way up.", "A quarter turn clockwise: now it points right.", "A quarter turn anti-clockwise: now it points left.", "A half turn: it points down. It is upside down."] },
    },
    {
      title: "Build the whole pattern",
      lines: ["The shapes in bold are the part that repeats.", "Put them in that order first.", "Then do the same again until all the cards are used."],
      example: { type: "groups", title: "Circle, triangle, over and over", groups: [["🔵", "🔺"], ["🔵", "🔺"], ["🔵", "🔺"]], label: "circle, triangle, circle, triangle, circle, triangle", note: "Start with the first shape in bold." },
    },
  ],
  sequences: [
    {
      title: "Say where it is",
      lines: ["Start by looking at the middle thing.", "Above means higher up. Below means lower down.", "Left of and right of tell you which side."],
      example: { type: "table", title: "Position words", headers: ["Where it is", "Word"], rows: [["higher up", "above"], ["lower down", "below"], ["on the left side", "left of"], ["on the right side", "right of"]], note: "Your left hand makes an L shape." },
    },
    {
      title: "Find the part that repeats",
      lines: ["The repeat is the smallest part that comes again.", "Try 2 shapes, then 3, then 4.", "Check that it matches all the way along."],
      example: { type: "groups", title: "How long is the repeat?", groups: [["🍓", "🍋", "🍋"], ["🍓", "🍋", "🍋"], ["🍓", "🍋", "🍋"]], label: "strawberry, lemon, lemon, three times over", note: "Strawberry, lemon, lemon repeats. That is 3 things." },
    },
    {
      title: "First, second, third",
      lines: ["Start counting from the left.", "First is 1, second is 2, third is 3.", "Fourth is 4 and fifth is 5."],
      example: { type: "groups", title: "A train in a line", groups: [["🚂", "🚃", "🚃", "🚃", "🚃"]], label: "an engine and 4 carriages in a line", note: "The engine is first. The last carriage is fifth." },
    },
    {
      title: "Follow every clue",
      lines: ["Read all the clues before you move anything.", "Put first and last in place first.", "Between or in the middle goes in the gap."],
      example: { type: "groups", title: "Strawberry first, grapes last", groups: [["🍓", "🍋", "🍇"]], label: "strawberry, lemon, grapes", note: "The lemon is between them. Check every clue at the end." },
    },
  ],
  "quarter-turns-and-half-turns": [
    {
      title: "Where will it point",
      lines: ["Clockwise goes the same way as clock hands.", "A quarter turn is 1 step round. A half turn is 2.", "A three-quarter turn is 3 steps round."],
      example: { type: "jumps", title: "Going round clockwise", terms: ["up", "right", "down", "left", "up"], step: "↻", note: "Anti-clockwise goes round the other way." },
    },
    {
      title: "Turn the arrow yourself",
      lines: ["Each tap turns the arrow a quarter turn.", "Pick clockwise or anti-clockwise.", "Watch the arrow and stop when it points the right way."],
      example: { type: "steps", title: "Make it point up", steps: ["The arrow points left.", "Tap clockwise once.", "Now it points up. Check your answer."] },
    },
    {
      title: "Name the turn",
      lines: ["Look where the arrow started and where it ends.", "Facing the opposite way is a half turn.", "1 step round is a quarter turn. Which way?"],
      example: { type: "steps", title: "From right to up", steps: ["It started pointing right.", "Now it points up.", "That is 1 step against the clock hands.", "So it is a quarter turn anti-clockwise."] },
    },
    {
      title: "Turns in right angles",
      lines: ["A right angle is a square corner, like a book.", "Every quarter turn is 1 right angle.", "Count the quarter turns to count the right angles."],
      example: { type: "jumps", title: "Counting quarter turns", terms: ["0", "1", "2", "3", "4"], step: "+1", note: "Each quarter turn adds 1 more right angle." },
    },
  ],
  "right-angle-turns": [
    {
      title: "Turning on the spot",
      lines: ["Turn right is a quarter turn clockwise.", "Turn left is a quarter turn anti-clockwise.", "The robot stays on its square. Only its face turns."],
      example: { type: "steps", title: "A robot facing down", steps: ["The robot faces down.", "It turns right: a quarter turn clockwise.", "Now it faces left. It has not moved."] },
    },
    {
      title: "Program the robot",
      lines: ["Forward moves the robot 1 square the way it faces.", "Turn left and turn right spin it on the spot.", "Press start again if it goes the wrong way."],
      example: { type: "steps", title: "Getting to the star", steps: ["Check which way the robot faces.", "Count the squares to the star.", "Press forward that many times."] },
    },
    {
      title: "Count only the turns",
      lines: ["Left and right are both right-angle turns.", "Forward is a move, not a turn.", "Skip the forwards and count the turns."],
      example: { type: "steps", title: "Right, forward, right, forward, forward", steps: ["Find the turns: right and right.", "Skip all the forwards.", "That is 2 right-angle turns."] },
    },
    {
      title: "Turn a corner",
      lines: ["The star is not in a straight line.", "Go forward, turn, then go forward again.", "Count the squares for each part of the trip."],
      example: { type: "steps", title: "A route with one turn", steps: ["Go forward 2 squares.", "Turn right.", "Go forward 1 square to reach the star."] },
    },
  ],
};
