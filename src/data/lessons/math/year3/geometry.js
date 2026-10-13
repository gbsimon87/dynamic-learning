/**
 * Bix's lessons for Year 3 Geometry (properties of shapes), one per challenge
 * slot. Each one teaches exactly what that challenge asks (see Year3ShapesGame /
 * year3Shapes.js). Year 3 does not use degrees, so angles are compared by eye.
 */
export const GEOMETRY_LESSONS = {
  "drawing-2-d-shapes": [
    {
      title: "Trace a 2-D shape",
      lines: ["A 2-D shape is flat with straight sides.", "Draw one side at a time, from corner to corner.", "Stop when the last side meets the first corner."],
      example: { type: "steps", title: "Tracing a triangle", steps: ["Start at the top corner.", "Draw side 1 down to the next corner.", "Draw side 2 along the bottom.", "Draw side 3 back to the start."], note: "A triangle has 3 sides, so it needs 3 lines." },
    },
    {
      title: "Finish a 2-D shape",
      lines: ["Some sides are already drawn for you.", "Count how many sides the shape needs.", "Draw the missing sides until the shape is closed."],
      example: { type: "equation", title: "Finishing a pentagon", parts: ["5", "−", "2", "=", "3"], note: "A pentagon needs 5 sides. 2 are drawn, so draw 3 more." },
    },
    {
      title: "Order shapes by their sides",
      lines: ["Count the sides on each shape.", "Put the shape with the fewest sides first.", "Check each shape has more sides than the one before."],
      example: { type: "steps", title: "Order a hexagon, triangle and octagon", steps: ["Hexagon: 6 sides.", "Triangle: 3 sides.", "Octagon: 8 sides.", "Order: triangle, hexagon, octagon."], note: "Fewest sides first, most sides last." },
    },
    {
      title: "Draw a shape from clues",
      lines: ["Read the clue and find the number of sides.", "Match that number to a shape name.", "Look for right angles too: squares and rectangles have 4."],
      example: { type: "table", title: "Shape names and sides", headers: ["Shape", "Sides"], rows: [["triangle", "3"], ["square", "4"], ["pentagon", "5"], ["hexagon", "6"], ["octagon", "8"]], note: "A rectangle also has 4 sides, but 2 are longer." },
    },
  ],
  "making-and-recognising-3-d-shapes": [
    {
      title: "Recognise a solid shape",
      lines: ["A 3-D shape is solid, like a box or a ball.", "Look at the faces: flat, curved, square or triangle?", "A shape keeps its name even when it is turned over."],
      example: { type: "table", title: "Spot the solid", headers: ["Solid", "Looks like"], rows: [["cube", "a dice"], ["cylinder", "a tin of beans"], ["cone", "an ice cream cone"], ["sphere", "a ball"]], note: "Turn a cone upside down and it is still a cone." },
    },
    {
      title: "Describe a solid shape",
      lines: ["Faces are the flat surfaces.", "Edges are where 2 faces meet.", "Corners are the points where edges meet."],
      example: { type: "steps", title: "Counting the faces on a cube", steps: ["Top and bottom: 2 faces.", "Front and back: 2 faces.", "Left and right: 2 faces.", "2 + 2 + 2 = 6 faces."], note: "Count in pairs so you do not miss a face." },
    },
    {
      title: "Choose the parts for a model",
      lines: ["To make a solid, you need the right faces.", "Check the face shapes first: squares, rectangles or triangles.", "Then check the number of edges and corners."],
      example: { type: "steps", title: "Parts for a cube", steps: ["Every face is a square.", "It has 6 faces.", "It has 12 edges and 8 corners."], note: "A cuboid looks similar, but its faces are rectangles." },
    },
    {
      title: "Recognise solids from clues",
      lines: ["Read each clue slowly.", "Think: flat or curved? How many ends? Any points?", "Pick the solid that fits every clue."],
      example: { type: "steps", title: "Which solid am I?", steps: ["Clue: I have flat faces only.", "Clue: one face is a square base.", "Clue: my other faces meet at one point.", "I am a square-based pyramid."], note: "Check every clue before you choose." },
    },
  ],
  "angles-as-turns": [
    {
      title: "Angles show an amount of turn",
      lines: ["An angle shows how far something has turned.", "A quarter turn makes a square corner.", "A half turn makes a straight line."],
      example: { type: "table", title: "Turns and what they look like", headers: ["Turn", "Looks like"], rows: [["quarter turn", "a square corner"], ["half turn", "a straight line"], ["three-quarter turn", "3 square corners"]], note: "Bigger turns make bigger angles." },
    },
    {
      title: "Compare the start and finish",
      lines: ["Look at where the arrow starts.", "Turn clockwise, the way clock hands move.", "Count the quarter turns until it reaches the finish."],
      example: { type: "steps", title: "From left to up", steps: ["The arrow starts facing left.", "Turn clockwise one quarter.", "Now it faces up."], note: "Left to up clockwise is a quarter turn." },
    },
    {
      title: "Order turns from smallest to largest",
      lines: ["Each turn is made of quarter turns.", "Count how many quarters each turn has.", "Fewest quarters goes first."],
      example: { type: "jumps", title: "Building up in quarters", terms: ["quarter turn", "half turn", "three-quarter turn", "full turn"], step: "+1 quarter", note: "4 quarter turns make a full turn." },
    },
    {
      title: "Use turns in a story",
      lines: ["Find the turn in the story.", "1 right angle is the same as a quarter turn.", "Count the right angles to name the turn."],
      example: { type: "steps", title: "A key turns all the way round", steps: ["The key turns through 4 right angles.", "4 quarter turns make a full turn.", "So the key makes a full turn."], note: "Right angles and quarter turns are the same size." },
    },
  ],
  "right-angles": [
    {
      title: "Spot a right angle",
      lines: ["A right angle is a square corner.", "It is a quarter turn.", "Check it with the corner of a book or paper."],
      example: { type: "table", title: "Right angle or not?", headers: ["Corner", "Right angle?"], rows: [["corner of a book", "yes"], ["tip of a pizza slice", "no"], ["corner of a door", "yes"]], note: "If it fits the corner of paper exactly, it is a right angle." },
    },
    {
      title: "Count right angles in shapes",
      lines: ["Look at each corner of the shape.", "Check each one: is it a square corner?", "Count only the square corners."],
      example: { type: "steps", title: "A shape with 4 corners", steps: ["Corner 1: square corner.", "Corner 2: square corner.", "Corner 3: too pointy.", "Corner 4: too wide.", "This shape has 2 right angles."], note: "Some shapes have no right angles at all." },
    },
    {
      title: "Join right angles into turns",
      lines: ["1 right angle is a quarter turn.", "Add another right angle for each extra quarter.", "4 right angles take you all the way round."],
      example: { type: "table", title: "Right angles and turns", headers: ["Right angles", "Turn"], rows: [["1", "quarter turn"], ["2", "half turn"]], note: "Keep going: each right angle adds a quarter turn." },
    },
    {
      title: "Follow several right-angle turns",
      lines: ["Start with the way the arrow faces.", "Clockwise goes up, right, down, left, then up again.", "Move one step for each right angle."],
      example: { type: "steps", title: "Facing left, turn 2 right angles", steps: ["Start facing left.", "1 right angle: now facing up.", "2 right angles: now facing right."], note: "2 right angles make a half turn, so it faces the opposite way." },
    },
  ],
  "comparing-angles-to-a-right-angle": [
    {
      title: "Compare with a right angle",
      lines: ["Hold a right angle up to the angle.", "If the angle is inside it, it is less.", "If the angle opens wider, it is greater."],
      example: { type: "table", title: "Checking with a paper corner", headers: ["Angle", "Compared with a right angle"], rows: [["scissors opened a little", "less than"], ["corner of a window", "equal to"], ["a laptop opened wide", "greater than"]], note: "The paper corner is your right-angle checker." },
    },
    {
      title: "Name acute, right and obtuse",
      lines: ["An acute angle is less than a right angle.", "An obtuse angle is greater than a right angle.", "A right angle is exactly a square corner."],
      example: { type: "table", title: "Three kinds of angle", headers: ["Name", "Size"], rows: [["acute", "less than a right angle"], ["right angle", "a square corner"], ["obtuse", "greater than a right angle"]], note: "Acute angles are small and pointy." },
    },
    {
      title: "Order angles by size",
      lines: ["Look at how wide each angle opens.", "Compare each one with a right angle first.", "Acute angles come first, then right, then obtuse."],
      example: { type: "steps", title: "Ordering three angles", steps: ["Find the acute angle: it goes first.", "Find the right angle: it goes next.", "Find the obtuse angle: it goes last."], note: "Size means how wide the angle opens, not how long its lines are." },
    },
    {
      title: "Compare two angles",
      lines: ["Look at the gap between the two lines.", "The angle that opens wider is larger.", "If they open the same amount, they are the same size."],
      example: { type: "steps", title: "Angle A or Angle B?", steps: ["Angle A is acute.", "Angle B is obtuse.", "Obtuse is greater than acute.", "So Angle B is larger."], note: "Long lines do not make an angle bigger." },
    },
  ],
  "horizontal-vertical-parallel-and-perpendicular-lines": [
    {
      title: "Find horizontal and vertical lines",
      lines: ["A horizontal line goes straight across, like the horizon.", "A vertical line goes straight up and down.", "Think: lying down or standing up?"],
      example: { type: "table", title: "Lines in a room", headers: ["Line", "Direction"], rows: [["top of a table", "horizontal"], ["side of a door", "vertical"], ["a shelf", "horizontal"]], note: "Horizontal lies flat. Vertical stands tall." },
    },
    {
      title: "Find parallel and perpendicular lines",
      lines: ["Parallel lines stay the same distance apart and never meet.", "Perpendicular lines meet at a right angle.", "Check the corner where they meet."],
      example: { type: "table", title: "Pairs of lines", headers: ["Example", "Lines are"], rows: [["railway tracks", "parallel"], ["the corner of a page", "perpendicular"]], note: "Perpendicular lines make a square corner." },
    },
    {
      title: "Compare pairs of lines",
      lines: ["Do the lines stay the same distance apart? Parallel.", "Do they meet at a square corner? Perpendicular.", "If neither is true, the answer is neither."],
      example: { type: "steps", title: "Two sides of a triangle", steps: ["Do they stay apart? No, they meet.", "Do they meet at a square corner? No.", "So the lines are neither."], note: "Lines can meet without being perpendicular." },
    },
    {
      title: "Use line properties in a design",
      lines: ["Designers use lines on windows, signs and tiles.", "Look at the 2 marked lines on the design.", "Ask the parallel and perpendicular questions to decide."],
      example: { type: "steps", title: "Lines on a window frame", steps: ["The top and bottom of the frame never meet.", "They stay the same distance apart.", "So they are parallel."], note: "Ask: do they meet, and is it a square corner?" },
    },
  ],
};
