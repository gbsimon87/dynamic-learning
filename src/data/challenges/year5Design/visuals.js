// Figures for the Year 5 Design and Technology bank. A figure draws what a
// question describes; it never prints the answer, and it never invents numbers:
// every number drawn comes from the question or the topic's own rule.
const pic = (kind, extra = {}) => ({ type: "picture", kind, ...extra });
const blocks = (count, each, unit, item, plural) => ({ type: "blocks", count, each, unit, item, ...(plural ? { plural } : {}) });
const picto = (unit, ...rows) => ({ type: "pictogram", unit, rows: rows.map(([label, count]) => ({ label, count })) });
const circuit = (extra) => ({ type: "circuit", ...extra });
const gears = (a, b) => ({ type: "gears", teeth: [a, b] });
const gallery = (alt, ...items) => ({ type: "gallery", alt, items: items.map(([kind, ...lines]) => ({ kind, lines })) });

export const YEAR5_DESIGN_TOPIC_VISUALS = {
  "design-criteria-and-research": { type: "clipboard", title: "Design criteria", items: ["Who is it for?", "What does it do?", "How big is it?", "How much does it cost?", "Is it safe?"], caption: "Designers research users and existing products first." },
  "sketches-and-models": { ...gallery("Four ways designers show ideas.", ["annotated", "Annotated", "sketch"], ["section", "Cross-", "section"], ["exploded", "Exploded", "diagram"], ["net", "Net or", "pattern", "pieces"]), caption: "A prototype is a first working model." },
  "evaluating-products": { type: "flow", steps: [["Test it", "against", "your", "criteria"], ["Ask other", "people"], ["Say what", "to improve"]], caption: "Then improve the design and test again." },
  "inventors-and-designers": gallery("Four people who shaped the world.", ["ship", "Brunel", "railways,", "bridges", "and ships"], ["vacuum", "Dyson", "bagless", "vacuum", "cleaner"], ["codeCard", "Lovelace", "first", "computer", "programme"], ["browser", "Berners-", "Lee", "World Wide", "Web"]),
  "tools-and-safety": gallery("Four safe habits when making.", ["clamp", "Hold the", "wood", "steady"], ["cutAway", "Cut away", "from your", "body"], ["goggles", "Wear safety", "goggles"], ["adult", "Ask an", "adult before", "hot or", "sharp tools"]),
  "materials-and-joining": gallery("Ways to join materials.", ["glueTape", "Glue", "or tape"], ["stitching", "Stitching"], ["nutBolt", "Nuts", "and bolts"], ["nailScrew", "Nails", "and screws"]),
  "strong-structures": gallery("Ways to make a structure strong.", ["braceFrame", "Triangles", "and braces"], ["foldCard", "Fold or", "layer card"], ["forces", "Squeeze =", "compression", "Pull =", "tension"], ["base", "A wide", "base is", "more stable"]),
  "levers-and-linkages": { type: "lever", kind: "first" },
  "gears-pulleys-and-cams": gallery("Three mechanisms.", ["gearsMeshed", "Gears", "teeth mesh"], ["pulleyBelt", "Pulley", "belt or rope"], ["camFollower", "Cam", "pushes a", "follower"]),
  "electrical-systems": circuit({ parts: ["bulb"], switch: "closed", labels: true, arrows: true, caption: "One loop: electricity can only go one way round." }),
  "computing-to-monitor-and-control": { type: "control", kind: "system", examples: true, caption: "Sensors collect readings, and the program controls the output." },
  "a-healthy-and-varied-diet": { type: "eatwell" },
  "seasonality-and-food-sources": { type: "seasons" },
  "cooking-skills-and-kitchen-hygiene": gallery("Four kitchen safety rules.", ["handWash", "Wash hands", "for 20", "seconds"], ["rawApart", "Keep raw", "meat apart"], ["fridge", "Fridge at", "5 degrees", "or colder"], ["hotPan", "Cook meat", "until", "piping hot"]),
};

export const YEAR5_DESIGN_QUESTION_VISUALS = {
  "design-criteria-and-research": [
    ["Jo wants a bag to carry a laptop. Which is a sensible criterion?", pic("laptopBag")],
    ["Asha designs a toy for toddlers. Which criterion matters most for safety?", pic("toddlerToy")],
    ["Ravi asks 4 groups of 5 children. How many children is that?", blocks(4, 5, "children", "group")],
    ["Jo's criteria list has 5 items and he adds 3 more. How many criteria are there?", picto("criterion", ["first list", 5], ["added", 3])],
  ],
  "sketches-and-models": [
    ["Ben writes 'handle 12 cm' next to a sketch. What is this?", pic("annotated", { text: "handle 12 cm" })],
    ["Zara cuts out fabric using paper shapes. What are the shapes called?", pic("fabricPattern")],
    ["Sam builds a quick card model of a chair. What is it?", pic("cardChair")],
    ["Mia's model needs 4 pieces of card and 3 straws. How many pieces is that?", picto("piece", ["card", 4], ["straws", 3])],
    ["Jo makes 3 prototypes, and improves each one twice. How many improvements is that?", blocks(3, 2, "improvements", "prototype")],
  ],
  "evaluating-products": [
    ["Mia's lunch box held a sandwich but leaked a drink. What should she write?", pic("lunchbox")],
    ["Ravi asks five classmates to try his game. What is he collecting?", picto("classmate", ["classmates", 5])],
    ["Jo scored his product 4, 5 and 3 out of 5 on three criteria. What is the total score?", picto("point", ["criterion 1", 4], ["criterion 2", 5], ["criterion 3", 3])],
  ],
  "inventors-and-designers": [
    ["Mia sees a steamship that crossed the ocean, designed by an engineer. Who designed the SS Great Britain?", pic("ship")],
    ["Jo uses a vacuum cleaner with no bag. Who invented it?", pic("vacuum")],
    ["Ben visits a website. Who invented the World Wide Web?", pic("browser")],
    ["Zara watches television. Who gave the first public demonstration of it?", pic("tv")],
    ["Sam sees road signs designed to be clear and simple. Who helped design them?", pic("roadSigns")],
    ["Mia reads about 3 inventors a day for 4 days. How many inventors is that?", blocks(4, 3, "inventors", "day")],
  ],
  "tools-and-safety": [
    ["What is a coping saw used for?", pic("copingSaw")],
    ["What is a bench hook used for?", pic("benchHook")],
    ["What is a try square used for?", pic("trySquare")],
    ["What is sandpaper used for?", pic("sandpaper")],
    ["Mia cuts 4 pieces of wood, each 15 cm long. How many centimetres of wood is that?", blocks(4, 15, "cm", "piece")],
  ],
  "materials-and-joining": [
    ["Mia uses 2 screws in each of 5 joints. How many screws is that?", blocks(5, 2, "screws", "joint")],
    ["A strip of felt is 50 cm long. Jo cuts 3 pieces of 12 cm. How many centimetres are left?", blocks(3, 12, "cm", "piece")],
    ["A box needs 4 sides and 2 ends of card. How many card pieces is that?", picto("piece", ["sides", 4], ["ends", 2])],
  ],
  "strong-structures": [
    ["Ravi's tall tower falls over. What should he change?", pic("towerTall")],
    ["Ben pushes the corner of a square frame and it folds. What should he do?", pic("frameFolds")],
    ["A tower has 3 levels, each with 4 triangle braces. How many braces is that?", blocks(3, 4, "braces", "level")],
  ],
  "levers-and-linkages": [
    ["Mia wants to lift a heavy rock with a plank and a log. Where should the log pivot be?", pic("plank")],
    ["Jo pushes down on a spade handle to lift soil. Which part is the load?", pic("spade")],
    ["Ben's wheelbarrow has the load between the wheel and the handles. Which class is it?", pic("wheelbarrow")],
    ["A seesaw is 4 m long with the pivot in the middle. How long is each side?", { type: "lever", kind: "seesaw", length: "4 m" }],
    ["A linkage has 3 levers, each with 2 pivots. How many pivots is that?", blocks(3, 2, "pivots", "lever")],
  ],
  "gears-pulleys-and-cams": [
    ["Mia's 12-tooth gear drives a 24-tooth gear. Which gear turns faster?", gears(12, 24)],
    ["If a 10-tooth gear drives a 20-tooth gear, which turns faster?", gears(10, 20)],
    ["A gear with 12 teeth meshes with a gear of 24 teeth. How many times does the small gear turn for one full turn of the large gear?", gears(12, 24)],
    ["A 10-tooth gear drives a 40-tooth gear. How many times does the small gear turn for one turn of the big gear?", gears(10, 40)],
    ["Zara's belt drive links a small and large pulley. Which turns faster?", pic("pulleyBelt")],
    ["Ben lifts a bucket using a rope over a wheel. Which mechanism is it?", pic("pulleyBucket")],
    ["Leo's cam toy has an egg-shaped cam. What shape of movement does the follower make?", pic("camFollower")],
  ],
  "electrical-systems": [
    ["Mia's bulb does not light. The wire has a gap. What should she do?", circuit({ parts: ["bulb"], gap: true })],
    ["Jo wants to turn his buzzer on and off. What should he add?", circuit({ parts: ["buzzer"] })],
    ["Ravi's two bulbs are dim. How can he make them brighter?", circuit({ parts: ["bulb", "bulb"] })],
    ["Asha's three bulbs are in series and one goes out. What happens to the other two?", circuit({ parts: ["bulb", "bulb", "bulb"] })],
    ["Leo's circuit has a battery and a closed switch with a bulb, but the bulb is off. What might be wrong?", circuit({ parts: ["bulb"], switch: "closed" })],
    ["A battery pack has 4 cells, each 1.5 volts. How many volts is that in total?", blocks(4, 1.5, "volts", "cell")],
  ],
  "computing-to-monitor-and-control": [
    ["Ravi's program says 'if the button is pressed, play a sound'. What is the input?", { type: "control", kind: "if", cond: ["button", "pressed?"], yes: ["play a", "sound"] }],
    ["Zara's program repeats a flash 4 times. What kind of instruction is that?", { type: "control", kind: "loop", action: "flash", times: 4 }],
    ["A program flashes an LED 3 times and repeats this 4 times. How many flashes is that?", blocks(4, 3, "flashes", "repeat")],
    ["Which is the process step in input, process, output?", { type: "control", kind: "system" }],
  ],
  "a-healthy-and-varied-diet": [
    ["Mia eats 2 portions of fruit and 3 portions of vegetables. How many portions of fruit and vegetables is that?", picto("portion", ["fruit", 2], ["vegetables", 3])],
    ["Jo needs at least 5 portions a day and has had 2. How many more does he need?", picto("portion", ["had so far", 2])],
    ["Leo has had 3 portions of fruit and vegetables. How many more should he aim for at least?", picto("portion", ["had so far", 3])],
  ],
  "seasonality-and-food-sources": [
    ["A farmer has 6 hens and each lays 1 egg a day. How many eggs are laid in 5 days?", blocks(5, 6, "eggs", "day")],
    ["Mia picks 12 apples and each of 4 friends gets 3. How many apples have been given out?", blocks(4, 3, "apples", "friend")],
  ],
  "cooking-skills-and-kitchen-hygiene": [
    ["How long should you wash your hands with soap before cooking?", pic("handWash")],
    ["What temperature should a fridge be?", pic("fridge")],
    ["A pasta sauce needs 3 tomatoes for each person. How many tomatoes for 4 people?", blocks(4, 3, "tomatoes", "person", "people")],
    ["A recipe for 4 people uses 200 g of pasta. How many grams are needed for 8 people?", picto("person", ["in the recipe", 4], ["to feed", 8])],
  ],
};
