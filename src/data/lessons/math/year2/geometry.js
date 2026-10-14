/**
 * Bix's lessons for Year 2 Geometry - properties of shapes, one per challenge
 * slot. Each one teaches exactly what that challenge asks (see the challenge
 * files in src/pages/skills/math/challenges/year2/<topic>/ and
 * src/data/challenges/shapes.js). Worked examples use shapes and objects that
 * are not in the challenge lists, so no lesson gives away a question's answer.
 */
export const GEOMETRY_LESSONS = {
  "2-d-shapes": [
    {
      title: "Name the flat shape",
      lines: ["A circle is round with no corners.", "A square has 4 equal sides.", "A rectangle has 2 long sides and 2 short sides."],
      example: { type: "table", title: "Count the sides to help you", headers: ["Sides", "Shape"], rows: [["3", "triangle"], ["5", "pentagon"], ["6", "hexagon"], ["8", "octagon"]], note: "A rhombus has 4 equal sides, like a tipped-over square." },
    },
    {
      title: "Count the sides",
      lines: ["A side is a straight line on the edge.", "Each corner has a dot on it.", "A shape has the same number of sides as corners."],
      example: { type: "steps", title: "A shape with 7 corners", steps: ["Put your finger on one corner.", "Count each corner as you go round.", "Stop when you get back to the start."], note: "7 corners means 7 sides." },
    },
    {
      title: "Fold along the line",
      lines: ["Look at the dotted line down the middle.", "Imagine folding the shape along that line.", "Do both halves match exactly? Then say yes."],
      example: { type: "steps", title: "Folding a heart", steps: ["Fold a heart down the middle.", "The left half lands right on the right half.", "Both halves match, so the answer is yes."], note: "If one half sticks out, the answer is no." },
    },
    {
      title: "Fewest sides goes first",
      lines: ["Count the sides on every shape first.", "Fewest means the smallest number.", "Put the numbers in order, smallest to biggest."],
      example: { type: "equation", title: "Sides in order", parts: ["3", "<", "5", "<", "8"], note: "The shape with 3 sides goes at the front." },
    },
  ],
  "3-d-shapes": [
    {
      title: "Name the solid",
      lines: ["A solid shape is not flat. You can hold it.", "A cube has 6 square faces, all the same size.", "A sphere is round all over, with no corners."],
      example: { type: "table", title: "More solids to know", headers: ["Solid", "Clue"], rows: [["cuboid", "like a cube, but with rectangle faces"], ["cylinder", "flat round ends, like a candle"], ["cone", "1 round end and a point"], ["triangular prism", "triangle ends, like a tent"]] },
    },
    {
      title: "Faces, edges and vertices",
      lines: ["A face is a flat surface.", "An edge is where 2 faces meet.", "A vertex is a corner. 2 or more are vertices."],
      example: { type: "steps", title: "Counting faces", steps: ["Touch one face and count it.", "Turn the shape and count the next one.", "Do not forget the faces at the back."], note: "Faces you cannot see still count." },
    },
    {
      title: "Spot solids in real life",
      lines: ["Think about the shape, not what the thing is.", "Is it round, pointy, or like a box?", "Pick the solid it looks most like."],
      example: { type: "table", title: "Solids at home", headers: ["Thing", "Solid"], rows: [["an orange", "sphere"], ["a brick", "cuboid"], ["a candle", "cylinder"], ["a traffic cone", "cone"]] },
    },
    {
      title: "Sort the solids",
      lines: ["Read the word in bold first.", "Count only that part on each solid.", "Put the one with the fewest first."],
      example: { type: "table", title: "What to count", headers: ["Word", "Count these"], rows: [["faces", "the flat surfaces"], ["edges", "the lines where faces meet"], ["corners", "the points where edges meet"]], note: "Count the hidden parts at the back too." },
    },
  ],
  "different-shapes": [
    {
      title: "Find flat shapes on solids",
      lines: ["Solid shapes have flat shapes on them.", "Look at one flat face of the solid.", "Name that flat shape."],
      example: { type: "steps", title: "The end of a pencil", steps: ["Stand a pencil on its end.", "Draw round the end on paper.", "You get a shape with 6 sides: a hexagon."] },
    },
    {
      title: "Flat or solid",
      lines: ["A flat shape has no thickness. You can draw it.", "A solid takes up space. You can hold it.", "Solids are drawn so they look deep."],
      example: { type: "table", title: "Flat or solid?", headers: ["Thing", "Flat or solid"], rows: [["a sticker", "flat"], ["a drawing of a star", "flat"], ["a brick", "solid"], ["an apple", "solid"]] },
    },
    {
      title: "Find the odd one out",
      lines: ["Read the clue at the top first.", "Find the 3 shapes that match the clue.", "Drag the one left over to the front."],
      example: { type: "groups", title: "Which one does not belong?", groups: [["🍎", "🍌", "🍐"], ["🥕"]], label: "an apple, a banana, a pear and a carrot", note: "3 are fruit, so the carrot is the odd one out." },
    },
    {
      title: "Guess from the clues",
      lines: ["Read every clue, not just the first one.", "Picture the shape in your head.", "Check that every clue fits your shape."],
      example: { type: "steps", title: "I have 5 sides and 5 corners", steps: ["Which shapes have 5 sides?", "A pentagon has 5 sides.", "It has 5 corners too, so it fits."] },
    },
  ],
};
