/**
 * Bix's lessons for Year 4 Geometry – properties of shapes, one per challenge
 * slot. Each teaches what that challenge asks (see year4Math/questions.js).
 */
export const GEOMETRY_LESSONS = {
  "classifying-triangles-and-quadrilaterals": [
    {
      title: "Name the shape",
      lines: ["Look at the side lengths first.", "Then look for parallel sides and right angles.", "Pick the name that matches every clue."],
      example: { type: "table", title: "Triangle names", headers: ["Triangle", "Sides"], rows: [["equilateral", "3 equal sides"], ["isosceles", "exactly 2 equal sides"], ["scalene", "no equal sides"]], note: "Count the equal sides to name a triangle." },
    },
    {
      title: "Spot the quadrilateral",
      lines: ["A quadrilateral has 4 sides.", "Parallel sides never meet, like train tracks.", "Check right angles and equal sides too."],
      example: { type: "table", title: "Quadrilateral names", headers: ["Shape", "Clue"], rows: [["square", "4 equal sides, 4 right angles"], ["rectangle", "4 right angles"], ["rhombus", "4 equal sides, no right angles"], ["parallelogram", "2 pairs of parallel sides"], ["trapezium", "exactly 1 pair of parallel sides"]] },
    },
    {
      title: "Sort by number of sides",
      lines: ["Triangles have 3 sides.", "Quadrilaterals have 4 sides.", "Read each name and put it in the right group."],
      example: { type: "table", title: "Two groups", headers: ["Triangle", "Quadrilateral"], rows: [["scalene triangle", "rhombus"], ["isosceles triangle", "trapezium"]], note: "Every triangle name goes in one group." },
    },
    {
      title: "Type the special name",
      lines: ["Read the clue about the sides and angles.", "Think which shape has exactly those properties.", "Type one word, like rhombus or scalene."],
      example: { type: "steps", title: "Solve a clue", steps: ["A triangle has no equal sides.", "No equal sides means scalene.", "Type: scalene."] },
    },
  ],
  "acute-and-obtuse-angles": [
    {
      title: "Classify this angle",
      lines: ["A right angle is exactly 90°, like a square corner.", "Acute is smaller than a right angle.", "Obtuse is bigger than a right angle but less than 180°."],
      example: { type: "table", title: "Angle names", headers: ["Angle", "Size"], rows: [["acute", "less than 90°"], ["right", "exactly 90°"], ["obtuse", "between 90° and 180°"]] },
    },
    {
      title: "Compare with a right angle",
      lines: ["Picture a square corner on top of the angle.", "If the angle fits inside, it is acute.", "If it opens wider, it is obtuse."],
      example: { type: "steps", title: "Is it acute or obtuse?", steps: ["Look at the gap between the 2 lines.", "Compare it with a square corner.", "Wider than the corner means obtuse."] },
    },
    {
      title: "Order angles by size",
      lines: ["A bigger angle has a wider opening.", "The length of the lines does not matter.", "Find the smallest first, then the next."],
      example: { type: "equation", title: "Smallest to largest", parts: ["35°", "<", "70°", "<", "110°", "<", "160°"], note: "Acute angles come before obtuse ones." },
    },
    {
      title: "Sort the angles",
      lines: ["Read each angle in degrees.", "Under 90° is acute, and 90° is right.", "Over 90° is obtuse."],
      example: { type: "table", title: "Sorting angles", headers: ["Angle", "Group"], rows: [["45°", "acute"], ["90°", "right"], ["135°", "obtuse"]] },
    },
  ],
  "lines-of-symmetry": [
    {
      title: "Count lines of symmetry",
      lines: ["A line of symmetry is a fold where both halves match.", "Try folding across, down and corner to corner.", "Count every fold that works."],
      example: { type: "table", title: "Some shapes", headers: ["Shape", "Lines of symmetry"], rows: [["rectangle", "2"], ["isosceles triangle", "1"]], note: "A rectangle does not fold along its diagonals." },
    },
    {
      title: "Turned shapes still match",
      lines: ["Some shapes are shown tilted.", "Turning a shape does not change its lines of symmetry.", "Imagine it straight, then count the folds."],
      example: { type: "steps", title: "A tilted square", steps: ["Turn it back in your head.", "Fold across, down and both diagonals.", "A square has 4 lines of symmetry."] },
    },
    {
      title: "Sort by lines of symmetry",
      lines: ["Count the lines for each shape.", "Some shapes have 0 lines of symmetry.", "Put each shape in the group with its number."],
      example: { type: "table", title: "Count, then sort", headers: ["Shape", "Lines"], rows: [["square", "4"], ["equilateral triangle", "3"], ["parallelogram", "0"]], note: "A parallelogram's halves never match when folded." },
    },
    {
      title: "Find the matching halves",
      lines: ["Treat the badge like a shape to fold.", "Each fold must make 2 halves that reflect exactly.", "Count all the lines that work."],
      example: { type: "steps", title: "Check a fold", steps: ["Picture a line through the shape.", "Would one half land on the other?", "Yes means it is a line of symmetry."] },
    },
  ],
  "completing-symmetric-figures": [
    {
      title: "Reflect across the line",
      lines: ["The dashed line is a mirror.", "Count squares from each coloured square to the line.", "Colour the square the same distance on the other side."],
      example: { type: "steps", title: "Reflect one square", steps: ["A square is 2 squares left of the line.", "Count 2 squares right of the line.", "Colour that square."] },
    },
    {
      title: "Reflect across a flat line",
      lines: ["This time the mirror line goes across.", "Count squares up to the line.", "Count the same number down on the other side."],
      example: { type: "steps", title: "Above and below", steps: ["A square is 1 above the line.", "Count 1 below the line.", "Stay in the same column."] },
    },
    {
      title: "Reflect a whole pattern",
      lines: ["Reflect each coloured square one at a time.", "Squares next to the line stay next to it.", "Check that empty squares are left empty."],
      example: { type: "steps", title: "Square by square", steps: ["Pick one coloured square.", "Count to the line, then past it.", "Colour it, then do the next one."] },
    },
    {
      title: "Finish the tile pattern",
      lines: ["The pattern must look the same on both sides.", "Tap a square again to clear it.", "Compare both sides before you check."],
      example: { type: "steps", title: "Final check", steps: ["Fold the pattern in your head.", "Every coloured square should land on another.", "No extra squares should be coloured."] },
    },
  ],
};
