import { topicLessons as lesson, equation as e, table as t, steps, diagram } from "../../topicLessons.js";

export const MEASUREMENT_LESSONS = {
  "converting-metric-units": lesson("Convert between metric units", ["A quantity stays the same when you express it in different units.", "Choose the correct conversion factor before multiplying or dividing."], [
    t("Useful metric relationships", ["Larger unit", "Equivalent"], [["1 kilometre", "1,000 metres"], ["1 metre", "100 centimetres"], ["1 kilogram", "1,000 grams"], ["1 litre", "1,000 millilitres"]], "Different unit pairs use different conversion factors."),
    e("Metres to centimetres", ["2.35", "×", "100", "=", "235"], "2.35 metres is 235 centimetres."),
    e("Grams to kilograms", ["1750", "÷", "1000", "=", "1.75"], "1,750 grams is 1.75 kilograms."),
    steps("Combine measurements", ["Add 1.2 litres and 350 millilitres.", "350 millilitres is 0.35 litres.", "1.2 + 0.35 = 1.55 litres."], "Convert to the same unit before calculating."),
  ]),
  "metric-and-imperial-equivalents": lesson("Use approximate unit equivalents", ["Metric and imperial units can describe the same measurement.", "An approximate equivalent gives a close estimate rather than an exact conversion."], [
    t("Common approximations", ["Imperial", "About this metric amount"], [["1 inch", "2.5 centimetres"], ["1 kilogram", "2.2 pounds"], ["1 pint", "0.57 litres"]], "Use the approximation stated in the question."),
    steps("Estimate a length", ["Use 1 inch ≈ 2.5 centimetres.", "A strip is 8 inches long.", "8 × 2.5 = about 20 centimetres."], "The answer remains approximate because the conversion is approximate."),
    steps("Estimate a mass", ["Use 1 kilogram ≈ 2.2 pounds.", "A bag has a mass of 5 kilograms.", "5 × 2.2 = about 11 pounds."], "Keep the measurement unit with your answer."),
    steps("Compare two capacities", ["Use 1 pint ≈ 0.57 litres.", "Two pints is about 1.14 litres.", "That is a little more than one litre."], "Convert both quantities to the same system before comparing."),
  ]),
  "perimeter-of-composite-rectilinear-shapes": lesson("Trace the outside boundary", ["Perimeter is the total distance around the outside of a shape.", "Find missing side lengths before adding all the boundary lengths."], [
    diagram("Start with a rectangle", "rectangle", "A rectangle measuring 8 centimetres by 3 centimetres. Its perimeter is 22 centimetres.", { width: 8, height: 3 }, "Eight plus three plus eight plus three equals 22 centimetres."),
    steps("Find a missing horizontal side", ["An L-shaped outline spans 9 cm across.", "Its two rightward horizontal sections are 4 cm and a missing length.", "The missing length is 9 − 4 = 5 cm."], "Opposite horizontal lengths must balance across the full shape."),
    e("Add an L-shape's boundary", ["9", "+", "2", "+", "5", "+", "4", "+", "4", "+", "6", "=", "30"], "These six outside edges give a perimeter of 30 centimetres."),
    steps("Check which lines to count", ["Trace the outline once.", "Include every outside edge, including an inward corner.", "Do not count a dividing line inside the shape."], "Perimeter measures the boundary, not the area inside."),
  ]),
  "area-of-rectangles": lesson("Count rows of square units", ["Area measures the surface inside a shape.", "For a rectangle, multiply length by width using matching units."], [
    diagram("Six columns and four rows", "rectangle", "A rectangle 6 centimetres wide and 4 centimetres high, divided into 24 one-centimetre squares.", { width: 6, height: 4, cells: true }, "Six times four gives an area of 24 square centimetres."),
    t("Compare area and perimeter", ["Measurement", "For a 6 cm by 4 cm rectangle"], [["Area", "6 × 4 = 24 cm²"], ["Perimeter", "6 + 4 + 6 + 4 = 20 cm"]], "Area uses square units; perimeter uses length units."),
    e("Find a missing width", ["42", "÷", "7", "=", "6"], "A rectangle of area 42 cm² and length 7 cm has width 6 cm."),
    steps("Convert before finding area", ["A rectangle is 2 metres long and 50 centimetres wide.", "50 centimetres is 0.5 metres.", "2 × 0.5 = 1 square metre."], "Both dimensions must use the same unit before multiplication."),
  ]),
  "estimating-area-volume-and-capacity": lesson("Choose useful measurement estimates", ["Area counts square units; volume counts cubic units.", "Capacity tells how much a container can hold."], [
    diagram("Count cubes in layers", "cuboid", "A cuboid measuring 4 by 2 by 3 centimetres. Each layer holds 8 unit cubes; three layers hold 24.", { length: 4, width: 2, height: 3 }, "Include hidden cubes when counting the complete layers."),
    steps("Estimate an irregular area", ["Count 12 whole squares.", "Combine 6 half-squares into about 3 whole squares.", "The estimated area is 15 square units."], "Combine partial squares to estimate the area they cover."),
    t("Choose a sensible unit", ["Quantity", "Useful unit"], [["Area of a page", "square centimetres"], ["Volume of a small block", "cubic centimetres"], ["Capacity of a mug", "millilitres"]], "The unit must match what you are measuring."),
    steps("Estimate a container's capacity", ["One cup holds about 250 millilitres.", "A jug holds about six such cups.", "6 × 250 = about 1,500 millilitres."], "An estimate should be sensible for the size of the container."),
  ]),
  "converting-units-of-time": lesson("Use time conversion facts", ["Time does not follow the metric pattern of tens and hundreds.", "Use 60 seconds per minute and 60 minutes per hour."], [
    t("Useful time relationships", ["Unit", "Equivalent"], [["1 minute", "60 seconds"], ["1 hour", "60 minutes"], ["1 day", "24 hours"], ["1 week", "7 days"]], "Choose the relationship that matches the two units."),
    steps("Convert a mixed time", ["Convert 2 hours 15 minutes to minutes.", "2 × 60 = 120 minutes.", "120 + 15 = 135 minutes."], "Convert the whole hours before adding the remaining minutes."),
    steps("Convert seconds to minutes", ["Divide 190 seconds by 60.", "There are 3 complete minutes, using 180 seconds.", "10 seconds remain."], "A remainder can be expressed in the smaller time unit."),
    t("Read parts of an hour", ["Hours", "Minutes"], [["0.5", "30"], ["0.25", "15"], ["1.5", "90"]], "Half an hour is thirty minutes, not fifty."),
  ]),
  "measurement-problems": lesson("Plan with amounts and units", ["Identify the quantity and its unit before choosing an operation.", "Convert mixed units when you need to compare or combine them."], [
    e("Add two lengths in metres", ["1.25", "+", "0.85", "=", "2.1"], "1.25 metres and 85 centimetres total 2.1 metres."),
    steps("Find change from a purchase", ["Three rolls cost £1.35 each.", "3 × £1.35 = £4.05.", "£5 − £4.05 = £0.95 change."], "Calculate the full cost before subtracting it from the payment."),
    steps("Share a measured amount", ["Share 2.4 litres equally between 6 bottles.", "2.4 ÷ 6 = 0.4 litres each.", "0.4 litres is 400 millilitres."], "Use a unit that makes the final amount clear."),
    t("Keep track of stages", ["Stage", "Mass"], [["Starting flour", "2 kg"], ["Used", "750 g"], ["Remaining", "1,250 g"]], "Convert 2 kilograms to 2,000 grams before subtracting."),
  ]),
};
