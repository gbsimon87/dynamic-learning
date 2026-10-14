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
      title: "Inside, on top, under, next to",
      lines: ["Inside means in the box.", "On top of means up on the box.", "Under is below it. Next to is at its side."],
      example: { type: "steps", title: "A frog and a bucket", steps: ["The frog sits in the bucket. It is inside.", "It hops up onto the bucket. It is on top.", "It hops down beside it. It is next to it."] },
    },
    {
      title: "Sort by where things are",
      lines: ["Find the bear in the middle.", "Read the groups: left and right, or above and below.", "Put each thing in its group."],
      example: { type: "groups", title: "A cat, a dog, a mouse", groups: [["🐱"], ["🐶"], ["🐭"]], label: "a cat, then a dog, then a mouse in a row", note: "Cat: left of the dog. Mouse: right of the dog." },
    },
    {
      title: "Position words in stories",
      lines: ["Read the story slowly.", "Behind means further back in the line.", "On top of means higher in the pile."],
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
      title: "Count the squares",
      lines: ["Put your finger on the bear.", "Move one square at a time.", "Stop when you have moved them all."],
      example: { type: "steps", title: "2 squares down", steps: ["Start on the dog.", "1 square down. That is 1.", "1 more square down. That is 2. What is there?"] },
    },
    {
      title: "Follow the route",
      lines: ["Do one move at a time.", "Say what you land on.", "Put them in order, first to last."],
      example: { type: "steps", title: "Right, then up", steps: ["Start on the dog.", "Go right. You land on a hat. That is first.", "Go up. You land on a sock. That is second."] },
    },
    {
      title: "Steps and hops",
      lines: ["Towards makes the gap smaller. Count back.", "Away makes the gap bigger. Count on.", "Forwards: count on. Backwards: count back."],
      example: { type: "jumps", title: "A dog 6 steps from its bone", terms: ["6", "5", "4"], step: "−1", note: "2 steps towards it. Now 4 steps away." },
    },
  ],
  "whole-half-quarter-and-three-quarter-turns": [
    {
      title: "Count the quarter turns",
      lines: ["Follow the curved arrow.", "It can go either way round.", "Count each quarter turn it makes."],
      example: { type: "table", title: "Turn sizes", headers: ["Quarter turns", "Turn"], rows: [["1", "a quarter turn"], ["2", "a half turn"], ["3", "a three-quarter turn"], ["4", "a whole turn"]] },
    },
    {
      title: "From one arrow to the other",
      lines: ["Start at the dotted arrow.", "Turn the way the words say.", "Count quarter turns to the solid arrow."],
      example: { type: "steps", title: "Start facing left", steps: ["Turn to face up. That is 1 quarter.", "Turn to face right. That is 2 quarters.", "2 quarters make a half turn."] },
    },
    {
      title: "Smallest turn to biggest",
      lines: ["More quarter turns means a bigger turn.", "2 quarter turns make a half turn.", "Read it: smallest first, or biggest first?"],
      example: { type: "jumps", title: "Counting quarter turns", terms: ["1", "2", "3", "4"], step: "+1", note: "Each step adds one more quarter turn." },
    },
    {
      title: "Which way will you face?",
      lines: ["Clockwise goes the way clock hands go.", "Anti-clockwise goes the other way.", "Turn one quarter at a time."],
      example: { type: "jumps", title: "Quarter turns clockwise", terms: ["up", "right", "down", "left"], step: "↻", note: "Anti-clockwise goes back the other way." },
    },
  ],
};
