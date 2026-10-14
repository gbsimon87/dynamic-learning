/**
 * Bix's lessons for Year 4 Geometry – position and direction, one per
 * challenge slot. Each teaches what that challenge asks (see year4Math/builders/position.js).
 */
export const POSITION_LESSONS = {
  "coordinates-in-the-first-quadrant": [
    {
      title: "Read the coordinates",
      lines: ["Coordinates tell you where a point is.", "Go across first for x, then up for y.", "Write them in brackets like (x, y)."],
      example: { type: "steps", title: "Point A at (3, 2)", steps: ["Start at 0.", "Count 3 across.", "Count 2 up.", "Write (3, 2)."] },
    },
    {
      title: "Find points on the grid",
      lines: ["Now there are 3 points: A, B and C.", "The order matters: (2, 4) is not (4, 2).", "Check across first, then up, for each point."],
      example: { type: "table", title: "Which point is where?", headers: ["Point", "Across", "Up", "Coordinates"], rows: [["A", "2", "4", "(2, 4)"], ["B", "4", "2", "(4, 2)"]] },
    },
    {
      title: "Plot a point",
      lines: ["Now you place the point yourself.", "Count across using the first number.", "Then count up using the second number."],
      example: { type: "steps", title: "Plot (1, 5)", steps: ["Count 1 across.", "Count 5 up.", "Tap that point."] },
    },
    {
      title: "Plot the hidden treasure",
      lines: ["The clue tells you where to go from A.", "Right or left changes x. Up or down changes y.", "Same row means same y. Same column means same x."],
      example: { type: "steps", title: "A is at (1, 2). Treasure is 3 squares right of A.", steps: ["Right changes x: 1 + 3 = 4.", "y stays 2.", "Plot (4, 2)."] },
    },
  ],
  "translations-on-a-grid": [
    {
      title: "Slide a point one way",
      lines: ["A translation slides a point without turning it.", "Right adds to x, left takes away from x.", "Up adds to y, down takes away from y."],
      example: { type: "steps", title: "Translate (2, 3) 2 squares right", steps: ["x: 2 + 2 = 4.", "y stays 3.", "A lands on (4, 3)."] },
    },
    {
      title: "Slide across and up",
      lines: ["Some translations have two moves.", "Do the left or right move to x.", "Do the up or down move to y."],
      example: { type: "steps", title: "Translate (3, 2) 1 square left and 2 squares up", steps: ["x: 3 − 1 = 2.", "y: 2 + 2 = 4.", "A lands on (2, 4)."] },
    },
    {
      title: "Describe the slide",
      lines: ["Now you say how A moved to B.", "Count squares across: is it left or right?", "Then count squares up or down."],
      example: { type: "steps", title: "A (1, 4) to B (4, 3)", steps: ["x went 1 to 4: 3 squares right.", "y went 4 to 3: 1 square down.", "3 squares right and 1 square down."] },
    },
    {
      title: "Slide a triangle",
      lines: ["When a shape slides, every corner moves the same way.", "Pick the corner you are asked about.", "Move it across, then up or down."],
      example: { type: "steps", title: "Slide C (2, 3) 2 squares right and 1 square down", steps: ["x: 2 + 2 = 4.", "y: 3 − 1 = 2.", "C lands on (4, 2)."] },
    },
  ],
  "plotting-points-and-completing-polygons": [
    {
      title: "Find the missing corner",
      lines: ["A rectangle has 4 corners: A, B, C and D.", "Opposite sides are equal and parallel.", "D has the same x as A and the same y as C."],
      example: { type: "steps", title: "A (1, 1), B (4, 1), C (4, 3)", steps: ["D has the same x as A: 1.", "D has the same y as C: 3.", "D is at (1, 3)."] },
    },
    {
      title: "Complete squares and rectangles",
      lines: ["Any corner can be missing, not just D.", "The missing corner lines up with its two neighbours.", "Take x from one neighbour and y from the other."],
      example: { type: "steps", title: "Square: A (1, 1), C (3, 3), D (1, 3). Find B.", steps: ["B is level with A, so y is 1.", "B is below C, so x is 3.", "B is at (3, 1)."] },
    },
    {
      title: "Plot the missing corner",
      lines: ["Work out the missing corner first.", "Count across, then up, and tap.", "Check the sides make a neat square or rectangle."],
      example: { type: "steps", title: "Plot the corner", steps: ["Find x from the corner above or below.", "Find y from the corner beside it.", "Count across, then up, and tap."] },
    },
    {
      title: "Finish the parallelogram flag",
      lines: ["A parallelogram has slanted sides.", "Opposite sides are equal and parallel.", "Copy the move along one side onto the opposite side."],
      example: { type: "steps", title: "A (0, 3), B (2, 3), C (3, 5). Find D.", steps: ["From B to C is 1 right and 2 up.", "Do the same from A: 1 right, 2 up.", "D is at (1, 5)."] },
    },
  ],
};
