/**
 * Bix's lessons for Year 4 Geometry – position and direction, one per
 * challenge slot. Each teaches what that challenge asks (see year4Math/questions.js).
 */
export const POSITION_LESSONS = {
  "coordinates-in-the-first-quadrant": [
    {
      title: "Read the coordinates",
      lines: ["Coordinates tell you where a point is.", "Go across first for x, then up for y.", "Write them in brackets like (x, y)."],
      example: { type: "steps", title: "Point at (3, 2)", steps: ["Start at 0.", "Count 3 across.", "Count 2 up.", "Write (3, 2)."] },
    },
    {
      title: "Across first, then up",
      lines: ["The order matters: (2, 4) is not (4, 2).", "Read the bottom axis first.", "Then read the side axis."],
      example: { type: "table", title: "Order matters", headers: ["Coordinates", "Across", "Up"], rows: [["(2, 4)", "2", "4"], ["(4, 2)", "4", "2"]] },
    },
    {
      title: "Plot a point",
      lines: ["Now you place the point yourself.", "Count across using the first number.", "Then count up using the second number."],
      example: { type: "steps", title: "Plot (1, 5)", steps: ["Count 1 across.", "Count 5 up.", "Tap that point."] },
    },
    {
      title: "Hide the treasure",
      lines: ["The treasure goes at the coordinates given.", "The first number is across, the second is up.", "A 0 means stay on that axis."],
      example: { type: "steps", title: "Treasure at (4, 0)", steps: ["Count 4 across.", "Count 0 up.", "The treasure sits on the bottom axis."] },
    },
  ],
  "translations-on-a-grid": [
    {
      title: "Move a point",
      lines: ["A translation slides a point without turning it.", "Right adds to x, left takes away from x.", "Up adds to y, down takes away from y."],
      example: { type: "steps", title: "Move (2, 3): 1 right, 2 up", steps: ["x: 2 + 1 = 3.", "y: 3 + 2 = 5.", "The new point is (3, 5)."] },
    },
    {
      title: "Left and down",
      lines: ["Moving left makes x smaller.", "Moving down makes y smaller.", "Do across first, then up or down."],
      example: { type: "steps", title: "Move (3, 2): 1 left, 1 down", steps: ["x: 3 − 1 = 2.", "y: 2 − 1 = 1.", "The new point is (2, 1)."] },
    },
    {
      title: "Plot the new position",
      lines: ["Start at point A.", "Count the squares across, then up or down.", "Tap where you land."],
      example: { type: "steps", title: "From A at (1, 1)", steps: ["Move 2 right to (3, 1).", "Move 1 up to (3, 2).", "Tap (3, 2)."] },
    },
    {
      title: "Check your translation",
      lines: ["Read both moves before you start.", "Count one square at a time with your finger.", "Check the new x and y with sums."],
      example: { type: "equation", title: "Checking x", parts: ["2", "+", "2", "=", "4"], note: "Start at x = 2 and move 2 right to x = 4." },
    },
  ],
  "plotting-points-and-completing-polygons": [
    {
      title: "Find the missing corner",
      lines: ["A rectangle has 4 corners: A, B, C and D.", "Opposite sides are equal and parallel.", "D is straight above A and level with C."],
      example: { type: "steps", title: "A (1, 1), B (4, 1), C (4, 3)", steps: ["D has the same x as A: 1.", "D has the same y as C: 3.", "D is at (1, 3)."] },
    },
    {
      title: "Use the matching sides",
      lines: ["Side AB matches side DC.", "Side BC matches side AD.", "Use x from A and y from C."],
      example: { type: "table", title: "Copy the numbers", headers: ["Corner", "x", "y"], rows: [["A", "2", "1"], ["C", "5", "4"], ["D", "2", "4"]] },
    },
    {
      title: "Plot the last corner",
      lines: ["Work out D's coordinates first.", "Count across, then up, and tap.", "The sides should make a neat rectangle."],
      example: { type: "steps", title: "Plot D", steps: ["Find x from A.", "Find y from C.", "Count across, then up, and tap."] },
    },
    {
      title: "Complete the rectangle",
      lines: ["Look at the 3 corners already joined.", "D closes the shape with 2 straight sides.", "Check AD is as long as BC."],
      example: { type: "steps", title: "Check your rectangle", steps: ["Is D straight above A?", "Is D level with C?", "Both yes means it is right."] },
    },
  ],
};
