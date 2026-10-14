/**
 * Bix's lessons for Year 1 Geometry - properties of shapes, one per challenge
 * slot. Each one teaches exactly what that challenge asks (see the builders in
 * src/data/challenges/year1Math/geometry.js). Real-life examples use things
 * that are not in the challenge lists, so no lesson gives away an answer.
 */
export const GEOMETRY_LESSONS = {
  "recognising-2-d-shapes": [
    {
      title: "Name the flat shape",
      lines: ["Look at the shape.", "Is it round? Count its sides.", "Then pick its name."],
      example: { type: "table", title: "Flat shapes to know", headers: ["Shape", "Clue"], rows: [["circle", "round, no corners"], ["triangle", "3 sides"], ["square", "4 sides, all the same"], ["rectangle", "2 long sides, 2 short sides"]] },
    },
    {
      title: "Find them all, turned or small",
      lines: ["Some shapes are turned.", "Some shapes are small.", "Count every one with that name."],
      example: { type: "steps", title: "Count the triangles", steps: ["One points up. That is 1.", "One is on its side. That is 2.", "One is tiny. It has 3 sides. That is 3!"] },
    },
    {
      title: "Sort the shapes into groups",
      lines: ["Look at shape A, then B, and so on.", "Is it round? Count its sides.", "Put it in its group."],
      example: { type: "table", title: "Which group?", headers: ["Clue", "Group"], rows: [["round, no corners", "circle"], ["3 sides", "triangle"], ["4 sides, square corners", "rectangle"]], note: "A square is a rectangle too." },
    },
    {
      title: "Shapes all around us",
      lines: ["Read what Bix sees.", "Think of its outline.", "Round? 3 sides? 4 sides?"],
      example: { type: "table", title: "Shapes at home", headers: ["Thing", "Shape"], rows: [["a coin", "circle"], ["a TV screen", "rectangle"], ["a coat hanger", "triangle"]] },
    },
  ],
  "recognising-3-d-shapes": [
    {
      title: "Name the solid shape",
      lines: ["A solid shape is not flat.", "You can hold it in your hand.", "Look at its faces and corners."],
      example: { type: "table", title: "Solid shapes to know", headers: ["Solid", "Clue"], rows: [["cube", "6 square faces, all the same"], ["cuboid", "like a box, some faces long"], ["pyramid", "comes to a point"], ["sphere", "round all over, it rolls"]] },
    },
    {
      title: "Find them all, tipped or small",
      lines: ["Some solids are tipped.", "Some solids are small.", "Count every one with that name."],
      example: { type: "steps", title: "Count the pyramids", steps: ["One stands on its base. That is 1.", "One is tipped. It has a point. That is 2.", "One is tiny. That is 3!"] },
    },
    {
      title: "Sort the solids into groups",
      lines: ["Look at shape A, then B, and so on.", "Is it round, pointy or like a box?", "Put it in its group."],
      example: { type: "table", title: "Which group?", headers: ["Clue", "Group"], rows: [["flat faces, like a box", "cuboid"], ["comes to a point", "pyramid"], ["round all over", "sphere"]], note: "A cube is a cuboid too." },
    },
    {
      title: "Solids all around us",
      lines: ["Read what Bix sees.", "Does it roll? Is it like a box?", "Pick the solid it looks like."],
      example: { type: "table", title: "Solids at home", headers: ["Thing", "Solid"], rows: [["a sugar lump", "cube"], ["a cereal box", "cuboid"], ["a marble", "sphere"]] },
    },
  ],
};
