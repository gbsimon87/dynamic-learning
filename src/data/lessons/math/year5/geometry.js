import { topicLessons as lesson, equation as e, table as t, steps, diagram } from "../../topicLessons.js";

const triangle = [[1, 1], [2, 1], [1, 2]];
const reflected = [[5, 1], [4, 1], [5, 2]];
const translated = [[3, 2], [4, 2], [3, 3]];

export const GEOMETRY_LESSONS = {
  "3-d-shapes-from-2-d-drawings": lesson("Picture a solid shape", ["A flat drawing can represent a solid with faces, edges and vertices.", "Some parts are hidden behind the surfaces you can see."], [
    diagram("Look at a cuboid", "cuboid", "A cuboid measuring 4 centimetres long, 2 centimetres wide and 3 centimetres high. Three of its six faces are visible.", { length: 4, width: 2, height: 3 }, "A cuboid has six rectangular faces, including the faces hidden from view."),
    t("Compare solid properties", ["Solid", "Faces", "Edges", "Vertices"], [["Cube", "6 squares", "12", "8"], ["Triangular prism", "2 triangles and 3 rectangles", "9", "6"]], "Count hidden parts as well as visible ones."),
    steps("Recognise a solid from a net", ["Look at the faces in the flat net.", "Imagine folding them along the edges.", "Check that the faces meet without gaps or overlaps."], "A drawing with the right number of faces is not always a valid net."),
    t("Use more than one clue", ["Observation", "What it tells us"], [["Two matching triangular ends", "It may be a triangular prism."], ["Six equal square faces", "It is a cube."]], "Match all the properties, not just the shape of one face."),
  ]),
  "estimating-measuring-and-drawing-angles": lesson("Measure the size of a turn", ["Angles are measured in degrees.", "A right angle is 90°; a straight angle is 180°."], [
    diagram("An acute angle", "angle", "An angle of 55 degrees, smaller than a right angle.", { degrees: 55 }, "An acute angle is greater than zero and less than ninety degrees."),
    diagram("An obtuse angle", "angle", "An angle of 125 degrees, larger than a right angle but smaller than a straight angle.", { degrees: 125 }, "An obtuse angle lies between ninety and one hundred and eighty degrees."),
    steps("Use a protractor", ["Put its centre on the vertex.", "Line up its zero line with one arm.", "Read the scale starting at that zero."], "Check whether the result should be acute or obtuse before choosing the scale."),
    diagram("A reflex angle", "angle", "A reflex angle of 235 degrees, measured around the larger turn between the arms.", { degrees: 235 }, "A reflex angle is greater than 180° and less than 360°."),
  ]),
  "angles-at-a-point-and-on-a-straight-line": lesson("Use a known angle total", ["Angles along a straight line total 180°.", "Angles around a point total one full turn: 360°."], [
    e("Find the other angle on a line", ["180", "−", "65", "=", "115"], "A 65° angle leaves 115° on the same straight line."),
    e("Find a missing angle at a point", ["360", "−", "90", "−", "130", "=", "140"], "Subtract all the known angles from the full turn."),
    diagram("Half a turn", "angle", "A straight angle of 180 degrees: the two arms point in opposite directions.", { degrees: 180 }, "Two right angles make a straight angle."),
    steps("Use equal angles", ["Three equal angles meet at a point.", "Together they total 360°.", "360 ÷ 3 = 120° each."], "Divide the total by the number of equal angles."),
  ]),
  "properties-of-rectangles": lesson("Use rectangle properties", ["A rectangle has four right angles and equal opposite sides.", "A square is a rectangle with all four sides equal."], [
    diagram("Opposite sides match", "rectangle", "A rectangle with length 7 centimetres and width 4 centimetres. Its opposite sides have matching lengths.", { width: 7, height: 4 }, "The other long side is 7 cm and the other short side is 4 cm."),
    t("Use right-angle facts", ["Corner", "Angle"], [["First", "90°"], ["Second", "90°"], ["Third", "90°"], ["Fourth", "90°"]], "The four corners total 360°."),
    e("Find a width from a perimeter", ["30", "−", "9", "−", "9", "=", "12"], "A perimeter of 30 cm with two 9 cm sides leaves two 6 cm sides."),
    diagram("A square is a special rectangle", "rectangle", "A square with four sides of 5 centimetres and four right angles.", { width: 5, height: 5 }, "Having all sides equal makes this rectangle a square."),
  ]),
  "regular-and-irregular-polygons": lesson("Check sides and angles", ["A polygon is a closed, flat shape with straight sides.", "A regular polygon has all sides equal and all angles equal."], [
    diagram("A regular quadrilateral", "polygon", "A square: all four sides are equal and all four angles are right angles.", { points: [[110, 35], [250, 35], [250, 175], [110, 175]], caption: "Equal sides and equal angles" }, "A square is regular because both conditions are true."),
    diagram("An irregular quadrilateral", "rectangle", "A rectangle measuring 8 by 3 centimetres: its angles are equal but its side lengths are not all equal.", { width: 8, height: 3 }, "Equal angles alone do not make a polygon regular."),
    t("Count and classify", ["Sides", "Polygon name"], [["3", "Triangle"], ["5", "Pentagon"], ["6", "Hexagon"]], "A polygon's name does not by itself tell you whether it is regular."),
    steps("Test for regularity", ["Check that every side has equal length.", "Check that every angle has equal size.", "Call it regular only when both are true."], "The number of sides alone cannot prove regularity."),
  ]),
  "reflecting-shapes": lesson("Make a mirror image", ["Reflection flips a shape across a mirror line.", "Matching points are the same perpendicular distance from the mirror line."], [
    diagram("Reflect in x = 3", "coordinates", "A solid triangle with vertices (1,1), (2,1), (1,2), reflected to a dashed triangle at (5,1), (4,1), (5,2), across x = 3.", { before: triangle, after: reflected, mirror: 3 }, "The original and image have equal size; their orientation is reversed."),
    t("Compare matching points", ["Original", "Mirror line", "Image"], [["(1, 1)", "x = 3", "(5, 1)"], ["(2, 1)", "x = 3", "(4, 1)"]], "For a vertical mirror line, the y-coordinate stays the same."),
    steps("Reflect a point", ["Count its horizontal distance to the vertical mirror line.", "Move that same distance beyond the line.", "Keep its height unchanged."], "Measure from the mirror line, not from the grid's edge."),
    steps("Check a whole reflection", ["Match each original vertex to its image.", "Check equal distances from the mirror.", "Join the reflected vertices in the matching order."], "Reflection preserves side lengths and angle sizes."),
  ]),
  "translating-shapes": lesson("Slide every point equally", ["Translation slides a shape without turning or flipping it.", "Every point moves the same distance in the same direction."], [
    diagram("Two right, one up", "coordinates", "A solid triangle at (1,1), (2,1), (1,2), translated two right and one up to a dashed triangle at (3,2), (4,2), (3,3).", { before: triangle, after: translated }, "The original and image have the same size and orientation."),
    t("Track the coordinates", ["Original", "Move", "Image"], [["(1, 1)", "2 right, 1 up", "(3, 2)"], ["(2, 1)", "2 right, 1 up", "(4, 2)"]], "Moving right increases x; moving up increases y."),
    steps("Translate a triangle", ["Choose one vertex and apply the movement.", "Apply exactly the same movement to every other vertex.", "Join the new points in the same order."], "Changing just one vertex would distort the shape."),
    t("Undo a translation", ["Forward movement", "Reverse movement"], [["3 right, 2 down", "3 left, 2 up"]], "Reverse each direction to recover the original position."),
  ]),
  "reading-line-graphs": lesson("Read values and changes", ["Use the labels and scale before reading a graph.", "A line graph can show how a quantity changes over time."], [
    diagram("A changing water level", "graph", "Water depth in centimetres: at 09:00 it is 10, at 10:00 it is 15, at 11:00 it is 5. The vertical scale increases in fives.", { labels: ["09:00", "10:00", "11:00"], values: [10, 15, 5], unit: "Depth in cm", step: 5 }, "Read across from a point to the numbered vertical scale."),
    t("Compare two readings", ["Time", "Depth"], [["09:00", "10 cm"], ["10:00", "15 cm"]], "The increase is 15 − 10 = 5 centimetres."),
    diagram("Find the largest decrease", "graph", "Temperatures at noon, one and two: 20, 15 and 5 degrees Celsius. The vertical scale increases in fives.", { labels: ["12:00", "13:00", "14:00"], values: [20, 15, 5], unit: "Temperature in °C", step: 5 }, "The decrease from 13:00 to 14:00 is ten degrees, larger than the earlier five-degree decrease."),
    steps("Solve a comparison problem", ["Find the two relevant points.", "Read both values using the scale.", "Subtract to find the difference and include the unit."], "The steepest segment shows the fastest change when time intervals are equal."),
  ]),
  "tables-and-timetables": lesson("Match the row and column", ["A table organises information under labelled headings.", "A timetable connects an event or place with a time."], [
    t("Read a bus timetable", ["Stop", "Bus A", "Bus B"], [["Park", "09:10", "09:40"], ["Library", "09:25", "09:55"], ["Station", "09:45", "10:15"]], "To read Bus B at the library, follow that row and column to 09:55."),
    steps("Find a journey time", ["The bus leaves the park at 09:10.", "It reaches the station at 09:45.", "The journey takes 35 minutes."], "Times on a timetable must be compared in hours and minutes."),
    t("Use two-way information", ["Club", "Year 4", "Year 5"], [["Art", "18", "23"], ["Music", "21", "16"]], "Year 5 has 23 + 16 = 39 club members in this example."),
    steps("Check a connection", ["A train arrives at 14:35.", "A bus leaves at 14:50.", "There are 15 minutes between them."], "A possible connection also depends on any required walking or waiting time."),
  ]),
};
