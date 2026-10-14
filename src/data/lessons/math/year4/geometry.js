/**
 * Bix's lessons for Year 4 Geometry – properties of shapes, one per challenge
 * slot. Each teaches what that challenge asks (see year4Math/questions.js).
 */
export const GEOMETRY_LESSONS = {
  "classifying-triangles-and-quadrilaterals": [
    {
      title: "Name the shape from a clue",
      lines: ["Read the clue under the shape.", "Count equal sides, right angles and parallel sides.", "Pick the special name that fits every part of the clue."],
      example: { type: "table", title: "Shape names", headers: ["Shape", "Clue"], rows: [["equilateral triangle", "3 equal sides"], ["isosceles triangle", "exactly 2 equal sides"], ["scalene triangle", "no equal sides"], ["rhombus", "4 equal sides, no right angles"], ["trapezium", "exactly 1 pair of parallel sides"]], note: "A square and a rhombus both have 4 equal sides. Only a square has right angles." },
    },
    {
      title: "Spot the true fact",
      lines: ["Look closely at the shape. It may be turned.", "Check its sides: are any equal or parallel?", "Check its angles. A regular polygon has all sides and all angles equal."],
      example: { type: "steps", title: "Test each fact", steps: ["Read one fact.", "Check it on the shape.", "Only one fact is true for every part."] },
    },
    {
      title: "Sort shapes by property",
      lines: ["Read the sorting question first.", "Check that one property on each shape.", "A rhombus has equal sides but is not regular, because its angles are not equal."],
      example: { type: "table", title: "Regular or irregular?", headers: ["Regular", "Irregular"], rows: [["square", "rectangle"], ["equilateral triangle", "rhombus"]], note: "Regular means all sides equal and all angles equal." },
    },
    {
      title: "Solve the shape riddle",
      lines: ["Read what the child makes.", "Pick out the clues about sides and angles.", "Type the special name. Capitals do not matter."],
      example: { type: "steps", title: "Solve a riddle", steps: ["Leo draws a quadrilateral with 4 equal sides but no right angles.", "4 equal sides with no right angles is a rhombus.", "Type: rhombus."] },
    },
  ],
  "acute-and-obtuse-angles": [
    {
      title: "Classify an angle",
      lines: ["A right angle is exactly 90°, like a square corner.", "Acute is smaller than a right angle.", "Obtuse is bigger than a right angle but less than 180°."],
      example: { type: "table", title: "Angle names", headers: ["Angle", "Size"], rows: [["acute", "less than 90°"], ["right", "exactly 90°"], ["obtuse", "between 90° and 180°"]] },
    },
    {
      title: "Find the odd angle",
      lines: ["Read whether you need the acute or the obtuse angle.", "Compare each angle with 90°.", "Only one angle is different from the others."],
      example: { type: "steps", title: "Which is obtuse?", steps: ["The angles are 30°, 45°, 125° and 60°.", "Only 125° is bigger than 90°.", "125° is the obtuse one."] },
    },
    {
      title: "Order angles by size",
      lines: ["A bigger angle has a wider opening.", "The length of the lines does not matter.", "Find the smallest first, then the next."],
      example: { type: "equation", title: "Smallest to largest", parts: ["35°", "<", "70°", "<", "110°", "<", "160°"], note: "Acute angles come before obtuse ones." },
    },
    {
      title: "Solve an angle puzzle",
      lines: ["A right angle is 90°. Two right angles make 180°.", "Find how far the door or lid is open now.", "Subtract it from 90° or 180° to find how much more it must open."],
      example: { type: "equation", title: "Open to a right angle", parts: ["90°", "−", "35°", "=", "55°"], note: "A door open at 35° must open 55° more." },
    },
  ],
  "lines-of-symmetry": [
    {
      title: "Count lines of symmetry",
      lines: ["A line of symmetry is a fold where both halves match.", "Try folding up, across and corner to corner.", "Count every fold that works. Some shapes have 0."],
      example: { type: "table", title: "Some shapes", headers: ["Shape", "Lines of symmetry"], rows: [["rectangle", "2"], ["isosceles triangle", "1"], ["parallelogram", "0"]], note: "A rectangle does not fold along its diagonals." },
    },
    {
      title: "Count lines on a turned shape",
      lines: ["Some shapes are shown tilted.", "Turning a shape does not change its lines of symmetry.", "Imagine it straight, then count the folds."],
      example: { type: "steps", title: "A tilted regular pentagon", steps: ["Turn it back in your head.", "Fold from each corner to the middle of the opposite side.", "A regular pentagon has 5 lines of symmetry."] },
    },
    {
      title: "Sort by lines of symmetry",
      lines: ["Count the lines for each shape.", "Put shapes with no lines, 1 line or more than 1 line in their groups.", "A regular polygon has as many lines as it has sides."],
      example: { type: "table", title: "Count, then sort", headers: ["Shape", "Group"], rows: [["parallelogram", "no lines"], ["kite", "1 line"], ["regular hexagon", "more than 1 line"]] },
    },
    {
      title: "Check a real-life shape",
      lines: ["Signs, tiles and badges can be symmetric too.", "Each fold must make 2 halves that match exactly.", "A letter Z shape has no lines of symmetry."],
      example: { type: "steps", title: "An arrow sign", steps: ["Fold it along the middle, tip to tail.", "Both halves match.", "Any other fold does not, so it has 1 line."] },
    },
  ],
  "completing-symmetric-figures": [
    {
      title: "Reflect in a vertical mirror",
      lines: ["The dashed line is a mirror. It goes up and down.", "Count squares from each coloured square to the line.", "Colour the square the same distance on the other side."],
      example: { type: "steps", title: "Reflect one square", steps: ["A square is 2 squares left of the line.", "Count 2 squares right of the line.", "Colour that square."] },
    },
    {
      title: "Reflect in a horizontal mirror",
      lines: ["This time the mirror line goes across, like the horizon.", "Count squares up to the line.", "Count the same number down on the other side."],
      example: { type: "steps", title: "Above and below", steps: ["A square is 1 above the line.", "Count 1 below the line.", "Stay in the same column."] },
    },
    {
      title: "Reflect a bigger pattern",
      lines: ["The grid is taller and has more squares.", "Reflect one row at a time, from top to bottom.", "Check that empty squares are left empty."],
      example: { type: "steps", title: "Row by row", steps: ["Look at the top row only.", "Reflect each coloured square in it.", "Move down to the next row."] },
    },
    {
      title: "Finish the tile pattern",
      lines: ["The mirror line goes across a wide pattern.", "Each column reflects straight down.", "Tap a square again to clear it."],
      example: { type: "steps", title: "Final check", steps: ["Fold the pattern in your head.", "Every coloured square should land on another.", "No extra squares should be coloured."] },
    },
  ],
};
