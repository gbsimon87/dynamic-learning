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
      lines: ["Look at the shape.", "Count its sides and corners.", "Then pick its name."],
      example: { type: "table", title: "Flat shapes to know", headers: ["Shape", "Clue"], rows: [["circle", "round, no corners"], ["triangle", "3 sides"], ["square", "4 sides, all the same"], ["rectangle", "2 long sides, 2 short sides"]] },
    },
    {
      title: "Small or turned, same name",
      lines: ["Some shapes are small.", "Some shapes are turned.", "The name does not change."],
      example: { type: "steps", title: "Turn a triangle over", steps: ["It points up.", "Turn it so it points down.", "It still has 3 sides. Still a triangle!"] },
    },
    {
      title: "Sort into shape families",
      lines: ["Look at shape A, then B, and so on.", "Count the sides of each one.", "Put it with its family."],
      example: { type: "table", title: "Which family?", headers: ["Clue", "Family"], rows: [["round, no corners", "circle"], ["3 sides", "triangle"], ["4 sides, square corners", "rectangle"]], note: "A square is a special rectangle." },
    },
    {
      title: "Shapes all around us",
      lines: ["Read what Bix finds.", "Is it round? 3 sides? 4 sides?", "Pick the flat shape it looks like."],
      example: { type: "table", title: "Shapes at home", headers: ["Thing", "Shape"], rows: [["a coin", "circle"], ["a door", "rectangle"], ["a sandwich cut corner to corner", "triangle"]] },
    },
  ],
  "recognising-3-d-shapes": [
    {
      title: "Name the solid shape",
      lines: ["A solid shape is not flat.", "You can hold it in your hand.", "Look at its faces and corners."],
      example: { type: "table", title: "Solid shapes to know", headers: ["Solid", "Clue"], rows: [["cube", "6 square faces, all the same"], ["cuboid", "like a box, some faces long"], ["pyramid", "comes to a point"], ["sphere", "round all over, it rolls"]] },
    },
    {
      title: "Small or tipped, same name",
      lines: ["Some solids are small.", "Some solids are tipped.", "Look at the whole solid."],
      example: { type: "steps", title: "Tip a pyramid over", steps: ["It stands with its point at the top.", "Tip it onto its side.", "It still has a point. Still a pyramid!"] },
    },
    {
      title: "Sort into solid families",
      lines: ["Look at shape A, then B, and so on.", "Is it round, pointy or like a box?", "Put it with its family."],
      example: { type: "table", title: "Which family?", headers: ["Clue", "Family"], rows: [["flat faces, like a box", "cuboid"], ["comes to a point", "pyramid"], ["round all over", "sphere"]], note: "A cube is a special cuboid." },
    },
    {
      title: "Solids all around us",
      lines: ["Read what Bix finds.", "Is it round, pointy or like a box?", "Pick the solid it looks like."],
      example: { type: "table", title: "Solids at home", headers: ["Thing", "Solid"], rows: [["a dice", "cube"], ["a brick", "cuboid"], ["an orange", "sphere"]] },
    },
  ],
};
