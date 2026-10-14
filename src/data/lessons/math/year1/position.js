/**
 * Bix's lessons for Year 1 Geometry - position and direction, one per
 * challenge slot. Each one teaches exactly what that challenge asks (see the
 * builders in src/data/challenges/year1Math/geometry.js). Worked examples use
 * animals, numbers and turns that are not in the challenge lists.
 */
export const POSITION_LESSONS = {
  "describing-position": [
    {
      title: "Where is the star?",
      lines: ["Find the bear first.", "Is the star higher or lower?", "Or is it on the left or right?"],
      example: { type: "table", title: "Position words", headers: ["Where it is", "Word"], rows: [["higher up", "above"], ["lower down", "below"], ["on the left side", "to the left of"], ["on the right side", "to the right of"]], note: "Your left hand makes an L shape." },
    },
    {
      title: "Inside or outside",
      lines: ["Inside means in the box.", "Outside means not in the box.", "Look at the edges of the box."],
      example: { type: "steps", title: "A toy and a cup", steps: ["Put the toy in the cup. It is inside.", "Take the toy out. Now it is outside."] },
    },
    {
      title: "Left or right of the bear",
      lines: ["Find the bear in the middle.", "Up or down does not matter here.", "Is it on the left or the right?"],
      example: { type: "groups", title: "A cat, a dog, a mouse", groups: [["🐱"], ["🐶"], ["🐭"]], label: "a cat, then a dog, then a mouse in a row", note: "Cat: left of the dog. Mouse: right of the dog." },
    },
    {
      title: "Position words in stories",
      lines: ["Between means in the middle.", "First in a line is in front.", "On top of means above it."],
      example: { type: "groups", title: "Animals in a line", groups: [["🐸", "🐰", "🦊"]], label: "a frog, a rabbit and a fox in a line", note: "The rabbit is between the frog and the fox." },
    },
  ],
  "describing-movement": [
    {
      title: "Which way did it move?",
      lines: ["Start at the bear.", "Follow the arrow to the star.", "Up, down, left or right?"],
      example: { type: "table", title: "Direction words", headers: ["The arrow goes", "Word"], rows: [["to the top", "up"], ["to the bottom", "down"], ["to your left hand", "left"], ["to your right hand", "right"]] },
    },
    {
      title: "Follow the arrow tip",
      lines: ["The line starts at the bear.", "The pointy tip shows where it goes.", "Say the way the tip points."],
      example: { type: "steps", title: "Trace the move", steps: ["Put your finger on the bear.", "Slide it along the line.", "Stop at the tip. Which way did you go?"] },
    },
    {
      title: "Step forwards and backwards",
      lines: ["Forwards is one more each step.", "Backwards is one less each step.", "Fill each empty space."],
      example: { type: "jumps", title: "Step backwards", terms: ["15", "14", "13", "12"], step: "−1", note: "Each step back goes to one less." },
    },
    {
      title: "Closer or further away",
      lines: ["Towards means going to someone.", "Towards makes the gap smaller.", "Away makes the gap bigger."],
      example: { type: "steps", title: "A dog and its bone", steps: ["The dog is far from its bone.", "It steps towards the bone.", "The gap is smaller. It is closer."] },
    },
  ],
  "whole-half-quarter-and-three-quarter-turns": [
    {
      title: "Count the quarter turns",
      lines: ["Follow the curved arrow.", "Count each quarter turn it makes.", "Then pick the size of the turn."],
      example: { type: "table", title: "Turn sizes", headers: ["Quarter turns", "Turn"], rows: [["1", "a quarter turn"], ["2", "a half turn"], ["3", "a three-quarter turn"], ["4", "a whole turn"]] },
    },
    {
      title: "Any start, any way round",
      lines: ["The arrow can start any way.", "It can go either way round.", "Still count the quarter turns."],
      example: { type: "steps", title: "Start facing left", steps: ["Turn to face up. That is 1 quarter.", "Turn to face right. That is 2 quarters.", "2 quarters make a half turn."] },
    },
    {
      title: "Smallest turn to biggest",
      lines: ["More quarter turns means a bigger turn.", "A quarter turn is the smallest.", "A whole turn goes all the way round."],
      example: { type: "jumps", title: "Counting quarter turns", terms: ["1", "2", "3", "4"], step: "+1", note: "Each step adds one more quarter turn." },
    },
    {
      title: "Which way will you face?",
      lines: ["Clockwise goes the way clock hands go.", "Anti-clockwise goes the other way.", "Turn one quarter at a time."],
      example: { type: "jumps", title: "Quarter turns clockwise", terms: ["up", "right", "down", "left"], step: "↻", note: "Anti-clockwise goes back the other way." },
    },
  ],
};
