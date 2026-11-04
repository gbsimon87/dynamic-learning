// Measurement, geometry, position and statistics banks for Year 6.
import { buildDecimal, choice, choiceN, number, orderBy } from '../year5Math/kit.js';

const table = (title, headers, rows) => ({ type: 'table5', title, headers, rows });
const n = (prompt, answer, extra = {}) => Number.isInteger(answer) ? number(prompt, answer, { maxDigits: 8, ...extra }) : buildDecimal(prompt, String(answer), () => 0.375, extra);

function measurementProblems(level, r, i) {
  const metres = 1.25 + i * 0.5, centimetres = metres * 100, seconds = 90 + i * 30;
  if (level === 1) return choice(`${metres} m = how many cm?`, String(centimetres), [String(metres * 10), String(metres * 1000), String(metres)], r, { hint: 'There are 100 centimetres in one metre.' });
  if (level === 2) return n(`A film lasts ${seconds} minutes. How many hours and minutes is that? Enter the total number of minutes left after full hours.`, seconds % 60, { hint: 'One hour is 60 minutes. Take out each full group of 60.' });
  if (level === 3) return choice(`Which is the most sensible unit for the capacity of a bath?`, 'litres', ['millimetres', 'kilograms', 'square centimetres'], r, { hint: 'Capacity measures how much liquid a container holds.' });
  return n(`A walk is ${metres} km each way. What total distance in metres does Bix walk there and back?`, metres * 2000, { hint: 'Double the distance for the return trip, then convert kilometres to metres.' });
}

function standardUnits(level, r, i) {
  const cases = [[2.5, 2500, 'kg', 'g'], [1.75, 1750, 'L', 'ml'], [3.2, 3200, 'm', 'mm'], [0.45, 450, 'kg', 'g'], [4.08, 4080, 'L', 'ml']]; const [large, small, unit, smallUnit] = cases[i];
  if (level === 1) return choice(`${large} ${unit} = how many ${smallUnit}?`, String(small), [String(small / 10), String(small * 10), String(large)], r, { hint: 'Use the conversion fact and move the decimal in the correct direction.' });
  if (level === 2) return n(`${small} ${smallUnit} = how many ${unit}?`, large, { hint: 'Convert to a larger unit by dividing by the number of smaller units in one whole.' });
  if (level === 3) return orderBy(`Order these masses from lightest to heaviest.`, [large / 2, large, large * 1.5, large * 2].map(value => ({ value, label: `${value} ${unit}` })), r, { hint: 'Make sure every measurement uses the same unit before comparing.' });
  return n(`A water tank holds ${large} L. It is filled ${2} times. How many millilitres of water is that?`, small * 2, { hint: 'Find the total litres first, then convert to millilitres.' });
}

function milesKm(level, r, i) {
  const miles = [5, 10, 15, 20, 25][i]; const km = miles * 1.6;
  if (level === 1) return choice(`${miles} miles is about how many kilometres? Use 1 mile ≈ 1.6 km.`, String(km), [String(miles * 0.6), String(miles * 16), String(miles + 1.6)], r, { hint: 'Multiply the number of miles by 1.6.' });
  if (level === 2) return n(`A route is ${miles} miles. Use 1 mile ≈ 1.6 km. About how many km is it?`, km, { hint: 'The kilometre value should be larger because one mile is more than one kilometre.' });
  if (level === 3) return orderBy('Order these distances from shortest to longest.', [5, 10, 15, 20].map(value => ({ value: value * 1.6, label: `${value} miles ≈ ${value * 1.6} km` })), r, { hint: 'The same conversion factor keeps the order of positive distances.' });
  return n(`A charity walk is ${miles} miles on Saturday and ${miles + 5} miles on Sunday. About how many kilometres are walked altogether?`, (miles + miles + 5) * 1.6, { hint: 'Add the miles first, then convert the total.' });
}

function areaPerimeter(level, r, i) {
  const length = 4 + i, width = 3 + (i % 3), area = length * width, perimeter = 2 * (length + width);
  const visual = table('Rectangle dimensions', ['Length', 'Width'], [[`${length} cm`, `${width} cm`]]);
  if (level === 1) return choiceN(`A ${length} cm by ${width} cm rectangle has what area?`, area, [perimeter, length + width, area + length], r, { visual, hint: 'Area counts square units inside: multiply length by width.' });
  if (level === 2) return n(`A ${length} cm by ${width} cm rectangle has what perimeter?`, perimeter, { visual, hint: 'Perimeter is the distance all the way around: add all four sides.' });
  if (level === 3) return choice(`Which rectangle has area ${area} cm² but a different perimeter from ${length} cm by ${width} cm?`, `${area} cm by 1 cm`, [`${length} cm by ${width} cm`, `${length} cm by ${width} cm`, `${width} cm by ${length} cm`], r, { hint: 'Different side pairs can multiply to the same area but add to different perimeters.' });
  return n(`A garden is ${length} m by ${width} m. Fencing goes all the way around it. How many metres of fencing are needed?`, perimeter, { visual, hint: 'Fencing is perimeter, not area.' });
}

function areaVolumeFormulae(level, r, i) {
  const length = 5 + i, width = 3 + (i % 2), height = 2 + i;
  if (level === 1) return choice(`Which formula finds the area of a rectangle?`, 'length × width', ['length + width', 'length × width × height', '2 × length'], r, { hint: 'Area covers a flat surface using two dimensions.' });
  if (level === 2) return choice(`Which formula finds the volume of a cuboid?`, 'length × width × height', ['length + width', '2 × (length + width)', 'base + height'], r, { hint: 'Volume fills a 3-D space, so use all three dimensions.' });
  if (level === 3) return n(`A cuboid is ${length} cm by ${width} cm by ${height} cm. Use V = l × w × h. What is its volume?`, length * width * height, { hint: 'Substitute all three dimensions into the volume formula.' });
  return n(`A notice board is ${length} m by ${width} m. Use A = l × w. What is its area in m²?`, length * width, { hint: 'Choose the area formula because this is a flat rectangle.' });
}

function trianglesParallelograms(level, r, i) {
  const base = 6 + i * 2, height = 3 + i, area = base * height / 2;
  if (level === 1) return choiceN(`A triangle has base ${base} cm and perpendicular height ${height} cm. What is its area?`, area, [base * height, base + height, area + base], r, { hint: 'A triangle is half of a matching parallelogram: base × height ÷ 2.' });
  if (level === 2) return n(`A parallelogram has base ${base} cm and perpendicular height ${height} cm. What is its area?`, base * height, { hint: 'Use base × perpendicular height, not a sloping side.' });
  if (level === 3) return choice(`Which measurement must be perpendicular to the base when finding a triangle’s area?`, 'height', ['sloping side', 'perimeter', 'diagonal'], r, { hint: 'The height makes a right angle with the chosen base.' });
  return n(`A triangular flag has base ${base} m and perpendicular height ${height} m. What is its area in m²?`, area, { hint: 'Multiply base by perpendicular height, then halve the result.' });
}

function cuboids(level, r, i) {
  const length = 3 + i, width = 2 + (i % 3), height = 2 + i; const volume = length * width * height;
  if (level === 1) return choiceN(`A cuboid is ${length} cm by ${width} cm by ${height} cm. What is its volume?`, volume, [length + width + height, length * width, volume + length], r, { hint: 'Count layers: length × width × height.' });
  if (level === 2) return n(`Calculate the volume of a ${length} cm by ${width} cm by ${height} cm cuboid.`, volume, { hint: 'Volume is measured in cubic units, written cm³.' });
  if (level === 3) return orderBy('Order these cuboids from smallest volume to largest volume.', [1, 2, 3, 4].map(multiplier => ({ value: length * width * multiplier, label: `${length} cm × ${width} cm × ${multiplier} cm` })), r, { hint: 'Calculate all three dimensions for each cuboid.' });
  return n(`A storage box is ${length} cm by ${width} cm by ${height} cm. How many 1 cm³ cubes fit exactly inside?`, volume, { hint: 'Each cubic centimetre is one unit cube, so its count equals the volume.' });
}

function drawingShapes(level, r, i) {
  const length = 4 + i, width = 3 + i, angle = 60 + i * 10;
  if (level === 1) return choice(`To draw a ${angle}° angle accurately, which tool should you use?`, 'protractor', ['ruler only', 'thermometer', 'weighing scale'], r, { hint: 'A protractor measures angles; a ruler measures lengths.' });
  if (level === 2) return choice(`A rectangle is ${length} cm by ${width} cm. What are its four interior angles?`, '90° each', ['60° each', '180° each', 'one 90° angle only'], r, { hint: 'A rectangle has four right angles.' });
  if (level === 3) return n(`A regular polygon has ${i + 3} equal sides of ${length} cm. What is its perimeter?`, (i + 3) * length, { hint: 'A regular shape has equal side lengths, so multiply one side by the number of sides.' });
  return choice(`Bix needs to draw a triangle with sides ${length} cm, ${width} cm and ${length} cm. Which instruction helps most?`, 'Measure each side with a ruler and each given angle with a protractor.', ['Draw any triangle freehand.', 'Use a thermometer for the angles.', 'Only measure one side.'], r, { hint: 'Use the tool that matches each given measurement.' });
}

function solidsNets(level, r, i) {
  const faces = [6, 5, 4, 6, 5][i];
  if (level === 1) return choice(`Which solid has ${faces} faces in this question?`, faces === 6 ? 'cube' : faces === 5 ? 'triangular prism' : 'triangular pyramid', ['sphere', 'circle', 'line segment'], r, { hint: 'Faces are flat surfaces. A sphere has no flat faces.' });
  if (level === 2) return choice('What is a net of a 3-D shape?', 'A flat pattern that can be folded into the solid.', ['A drawing of its shadow only.', 'A measurement of its volume.', 'A list of its angles.'], r, { hint: 'A net shows every face before it is folded.' });
  if (level === 3) return choice('Which net could make a cube?', 'Six connected squares arranged so they can fold around one square.', ['Four connected triangles only.', 'One circle and one rectangle.', 'Six separate squares.'], r, { hint: 'A cube has six square faces that must stay connected in a foldable pattern.' });
  return n(`A cuboid has 6 faces. If each face is labelled once for a model, how many labels are needed?`, 6, { hint: 'Count each flat face once, including faces you cannot see at first.' });
}

function classifyAngles(level, r, i) {
  const sides = [3, 4, 5, 6, 8][i]; const interior = 180 * (sides - 2) / sides;
  if (level === 1) return choice(`A regular ${sides}-sided polygon has what size interior angle?`, `${interior}°`, [`${180 / sides}°`, `${360 / sides}°`, `${interior + 10}°`], r, { hint: 'The interior angles total (sides − 2) × 180°.' });
  if (level === 2) return choice('Which property describes a square?', 'Four equal sides and four right angles.', ['Three equal sides only.', 'One pair of parallel sides only.', 'No equal angles.'], r, { hint: 'Use both side and angle properties to classify a shape.' });
  if (level === 3) return n(`The angles in a triangle are ${60 + i * 5}° and ${50 + i * 5}°. What is the third angle?`, 180 - (60 + i * 5) - (50 + i * 5), { hint: 'Angles in every triangle total 180°.' });
  return choice(`A regular polygon has interior angles of ${interior}°. Which polygon is it?`, `${sides}-sided regular polygon`, [`${sides - 1}-sided regular polygon`, `${sides + 1}-sided regular polygon`, 'circle'], r, { hint: 'Match the angle calculation to the number of equal sides.' });
}

function circleParts(level, r, i) {
  const radius = i + 3, diameter = radius * 2;
  if (level === 1) return choice(`A circle has radius ${radius} cm. What is its diameter?`, `${diameter} cm`, [`${radius} cm`, `${radius + 2} cm`, `${diameter + 2} cm`], r, { hint: 'The diameter goes across the circle through its centre: it is two radii.' });
  if (level === 2) return n(`A circle has diameter ${diameter} cm. What is its radius?`, radius, { hint: 'The radius is half of the diameter.' });
  if (level === 3) return choice('Which line joins two points on a circle and passes through the centre?', 'diameter', ['radius', 'circumference', 'arc'], r, { hint: 'A radius goes from the centre to the edge; a diameter goes all the way across.' });
  return choice(`A circular badge has radius ${radius} mm. Which statement is true?`, `Its diameter is ${diameter} mm.`, [`Its circumference is ${diameter} mm.`, `Its radius is ${diameter} mm.`, `Its diameter is ${radius} mm.`], r, { hint: 'Only use the radius–diameter relationship here; circumference is the distance around.' });
}

function missingAngles(level, r, i) {
  const angle = 30 + i * 10;
  if (level === 1) return choiceN(`Angles on a straight line total 180°. One angle is ${angle}°. What is the other?`, 180 - angle, [360 - angle, angle, 180 + angle], r, { hint: 'Subtract the known angle from 180°.' });
  if (level === 2) return n(`Angles around a point total 360°. Three angles are ${angle}°, ${angle + 20}° and ${angle + 30}°. What is the fourth angle?`, 360 - angle - (angle + 20) - (angle + 30), { hint: 'Add the known angles, then subtract their total from 360°.' });
  if (level === 3) return choice(`Two vertically opposite angles are formed by crossing lines. If one is ${angle}°, what is the opposite angle?`, `${angle}°`, [`${180 - angle}°`, '90°', `${360 - angle}°`], r, { hint: 'Vertically opposite angles are equal.' });
  return n(`A triangle has angles ${angle}° and ${angle + 20}°. Find its third angle.`, 180 - angle - (angle + 20), { hint: 'The three interior angles of a triangle total 180°.' });
}

function coordinates(level, r, i) {
  const x = [-2, -1, 1, 2, 3][i], y = [3, 2, 1, -1, -2][i];
  if (level === 1) return choice(`Point P is at (${x}, ${y}). Which coordinate is the horizontal position?`, String(x), [String(y), String(-x), String(-y)], r, { hint: 'The first coordinate is x, the horizontal distance from the origin.' });
  if (level === 2) return choice(`Which point is in quadrant ${x < 0 && y > 0 ? 'II' : x >= 0 && y >= 0 ? 'I' : x < 0 ? 'III' : 'IV'}?`, `(${x}, ${y})`, [`(${-x}, ${y})`, `(${x}, ${-y})`, `(${-x}, ${-y})`], r, { hint: 'Read the signs: right is positive x, up is positive y.' });
  if (level === 3) return orderBy('Order these points by x-coordinate from smallest to largest.', [-3, -1, 1, 3].map(value => ({ value, label: `(${value}, ${y})` })), r, { hint: 'Compare the first coordinate only.' });
  return choice(`A treasure is ${Math.abs(x)} squares left and ${Math.abs(y)} squares up from the origin. Which coordinate is it?`, `(${-Math.abs(x)}, ${Math.abs(y)})`, [`(${Math.abs(x)}, ${Math.abs(y)})`, `(${-Math.abs(x)}, ${-Math.abs(y)})`, `(${Math.abs(x)}, ${-Math.abs(y)})`], r, { hint: 'Left gives a negative x-coordinate; up gives a positive y-coordinate.' });
}

function transformations(level, r, i) {
  const x = i + 1, y = i - 2;
  if (level === 1) return choice(`Point (${x}, ${y}) is translated ${2} right and ${3} up. What is the new coordinate?`, `(${x + 2}, ${y + 3})`, [`(${x - 2}, ${y + 3})`, `(${x + 2}, ${y - 3})`, `(${y + 3}, ${x + 2})`], r, { hint: 'Add horizontal movement to x and vertical movement to y.' });
  if (level === 2) return choice(`Reflect (${x}, ${y}) in the y-axis. What is the image?`, `(${-x}, ${y})`, [`(${x}, ${-y})`, `(${-x}, ${-y})`, `(${y}, ${x})`], r, { hint: 'A reflection in the y-axis changes the x-coordinate’s sign only.' });
  if (level === 3) return choice(`Reflect (${x}, ${y}) in the x-axis. What is the image?`, `(${x}, ${-y})`, [`(${-x}, ${y})`, `(${-x}, ${-y})`, `(${y}, ${x})`], r, { hint: 'A reflection in the x-axis changes the y-coordinate’s sign only.' });
  return choice(`A shape is translated by the vector (${2}, ${-1}). What does this mean?`, 'Move every point 2 right and 1 down.', ['Move every point 2 left and 1 up.', 'Reflect in both axes.', 'Swap every x- and y-coordinate.'], r, { hint: 'The first vector number is horizontal; the second is vertical.' });
}

function graphs(level, r, i) {
  const values = [20, 30, 40, 50, 60]; const target = values[i];
  if (level === 1) return choiceN(`A line graph shows ${target} visitors on Friday and ${target + 10} on Saturday. How many more visitors were there on Saturday?`, 10, [target, target + 10, 20], r, { visual: table('Visitors', ['Day', 'Visitors'], [['Friday', target], ['Saturday', target + 10]]), hint: 'Subtract the Friday value from the Saturday value.' });
  if (level === 2) return choice(`A pie chart has 4 equal sectors. What fraction of the whole is one sector?`, '1/4', ['1/2', '1/3', '4/1'], r, { hint: 'Four equal sectors split the whole into four equal parts.' });
  if (level === 3) return choice(`A line graph must plot visitor totals of ${target}, ${target + 10}, ${target + 20} and ${target + 30} over four days. Which list of points is correct?`, `(1, ${target}), (2, ${target + 10}), (3, ${target + 20}), (4, ${target + 30})`, [`(1, ${target}), (2, ${target + 20}), (3, ${target + 10}), (4, ${target + 30})`, `(1, ${target + 10}), (2, ${target + 20}), (3, ${target + 30}), (4, ${target})`, `(1, ${target}), (2, ${target + 10}), (3, ${target + 30}), (4, ${target + 20})`], r, { hint: 'Match each day in order with the value read from the data table.' });
  return choice(`A pie chart shows 50% of votes for A and 25% each for B and C. Which category has the most votes?`, 'A', ['B', 'C', 'B and C each have more than A'], r, { hint: 'Compare the portions of the whole; 50% is half.' });
}

function mean(level, r, i) {
  const values = [4 + i, 6 + i, 8 + i, 10 + i]; const total = values.reduce((sum, value) => sum + value, 0); const average = total / values.length;
  if (level === 1) return choiceN(`Find the mean of ${values.join(', ')}.`, average, [total, average + 1, values.length], r, { hint: 'Add all values, then divide by how many values there are.' });
  if (level === 2) return n(`Calculate the mean of ${values.join(', ')}.`, average, { hint: 'The mean shares the total equally across every value.' });
  if (level === 3) return choice(`Four scores have total ${total}. If their mean is ${average}, how many scores were used?`, '4', ['2', String(total), String(average)], r, { hint: 'Mean = total ÷ number of values, so number of values = total ÷ mean.' });
  return n(`A team scores ${values.join(', ')} points in four games. What is its mean score?`, average, { hint: 'Use all four games: total their scores and share equally.' });
}

export const MEASUREMENT_GEOMETRY_BUILDERS = {
  'measurement-problems': measurementProblems,
  'converting-standard-units': standardUnits,
  'miles-and-kilometres': milesKm,
  'area-and-perimeter-relationships': areaPerimeter,
  'area-and-volume-formulae': areaVolumeFormulae,
  'areas-of-triangles-and-parallelograms': trianglesParallelograms,
  'volumes-of-cubes-and-cuboids': cuboids,
  'drawing-shapes-from-dimensions-and-angles': drawingShapes,
  '3-d-shapes-and-nets': solidsNets,
  'classifying-shapes-and-finding-angles': classifyAngles,
  'parts-of-circles': circleParts,
  'missing-angles': missingAngles,
  'coordinates-in-four-quadrants': coordinates,
  'drawing-translating-and-reflecting-shapes': transformations,
  'pie-charts-and-line-graphs': graphs,
  'the-mean': mean,
};
