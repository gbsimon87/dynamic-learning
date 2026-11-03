import { c, lesson, ordered, record, sort, topic, visual } from "./authoring.js";

const CO = "y5_coasts", JC = "y5_jurassic", HOLD = "y5_holderness", DEF = "y5_seaDefences";

const profileNamed = visual("coast", "A cliff from the side", "A cross-section of a coast. Land is on the left and sea on the right. A steep cliff drops to the sea. At the base of the cliff is a notch cut by waves, and a flat rock shelf stretches out under the water.", [
  "A cliff is a steep rock face beside the sea.", "Waves cut a notch at the base of a cliff.", "A flat rock shelf, the wave-cut platform, is left as the cliff wears back.", "Waves wear away rock by hitting it and by scraping it with stones.",
], { variant: "profile", letters: false });
const profileLetters = visual("coast", "A cliff with letters", "A cross-section of a coast with land on the left and sea on the right. A is the steep rock face. B is the notch at its base. C is the flat rock shelf under the water. D is on the sea surface, where waves move.", [
  "A cliff is a steep rock face beside the sea.", "Waves cut a notch at the base of a cliff.", "A flat rock shelf, the wave-cut platform, is left as the cliff wears back.", "Waves wear away rock by hitting it and by scraping it with stones.",
], { variant: "profile", letters: true });
const plan = visual("coast", "A headland and a bay from above", "A map-style view from above. The sea is at the top. Land at the bottom has a part sticking out into the sea at the left, and a curved inward gap in the middle. A is on the part sticking out. B is in the curved gap.", [
  "A headland is hard rock that sticks out into the sea.", "A bay is a curved inlet where softer rock has worn away faster.", "Waves reach a headland from several sides, so it wears away too, but more slowly.",
], { variant: "plan", letters: true });
const planNamed = { ...plan, title: "Headlands and bays", alt: "A view from above with the sea at the top. Land at the bottom has two parts sticking out into the sea and a curved gap between them, with sea reaching into the gap.", letters: false };
const steps = visual("flow", "Landforms made by erosion", "Four steps from a crack in a headland. 1: a crack widens into a cave. 2: the cave breaks through to make an arch. 3: the top of the arch falls to leave a stack. 4: the stack wears down to a stump.", ["Crack, cave, arch, stack, stump.", "Durdle Door in Dorset is an arch. Old Harry Rocks in Dorset are stacks."], { steps: ["A crack in a headland widens into a cave.", "The cave is worn right through to make an arch.", "The top of the arch falls and leaves a stack.", "The stack wears down to a stump."] });
const manage = record([
  "A sea wall is a strong wall that reflects waves.",
  "Groynes are low walls built out into the sea to hold sand on a beach.",
  "Rock armour is large rocks piled at the foot of a cliff to absorb waves.",
  "Soft clay cliffs on the Holderness coast wear back fast, while hard chalk cliffs wear back slowly.",
  "Defences cost a lot to build and repair, so people must choose which places to protect.",
], "Looking after the coast");

export const coastsAndCoastalLandforms = topic([
  lesson(["Waves can wear away the coast.", "A cliff is a steep rock face beside the sea.", "Learn the parts of a cliff."], profileNamed, [
    c("What is a cliff?", "A steep rock face beside the sea", "A flat sandy area at the edge of the sea", "A curved inlet where the land bends inwards", profileNamed, [CO], "Read the first evidence sentence."),
    c("What do waves cut at the base of a cliff?", "A notch", "A mountain", "A river", profileNamed, [CO], "Read the second evidence sentence."),
    c("What is left as a cliff wears back?", "A flat rock shelf called a wave-cut platform", "A tall rock tower called a stack", "A curved inlet called a bay", profileNamed, [CO], "Read the third evidence sentence."),
    c("How do waves wear away rock?", "By hitting it and scraping it with stones", "By warming it with sunlight until it melts", "By freezing it with ice until it cracks", profileNamed, [CO], "Read the last evidence sentence."),
    c("Which part of the coast is at the base of the cliff?", "The notch", "The cliff top", "The open sea", profileNamed, [CO], "Look at the drawing near the water line."),
    c("Which letter marks the wave-cut platform?", "Marker C", "Marker A", "Marker B", profileLetters, [CO], "Find the flat rock shelf under the water."),
    c("Which letter marks the steep cliff face?", "Marker A", "Marker C", "Marker D", profileLetters, [CO], "Find the steep rock face."),
    c("Which letter marks the notch cut by waves?", "Marker B", "Marker A", "Marker C", profileLetters, [CO], "It is at the base of the cliff."),
    sort("Sort each word by whether it names a coastal landform or something else.", ["Coastal landform", "Not a coastal landform"], [["Cliff", 0], ["Wave-cut platform", 0], ["Bay", 0], ["Tributary", 1]], profileNamed, [CO], "A tributary belongs to a river."),
  ]),
  lesson(["Look at the coast from above.", "A headland sticks out into the sea.", "A bay curves inwards."], plan, [
    c("What is a headland?", "Hard rock that sticks out into the sea", "Soft rock that curves inwards from the sea", "A flat beach of sand beside the sea", plan, [CO], "Read the first evidence sentence."),
    c("What is a bay?", "A curved inlet where softer rock has worn away", "A tall tower of rock standing in the sea", "A strong wall built to stop the waves", plan, [CO], "Read the second evidence sentence."),
    c("Which letter marks the headland?", "Marker A", "Marker B", "Neither letter", plan, [CO], "Find the part sticking out into the sea."),
    c("Which letter marks the bay?", "Marker B", "Marker A", "Neither letter", plan, [CO], "Find the curved gap."),
    c("Which kind of rock forms headlands?", "Harder rock", "Softer rock", "Rock never makes headlands", plan, [CO], "Read the first evidence sentence."),
    c("Why do bays form?", "Softer rock wears away faster than harder rock", "Harder rock wears away faster than softer rock", "The sea only touches the land at the top of the cliff", plan, [CO], "Compare how fast the two rocks wear away."),
    c("Do waves reach a headland from only one side?", "No, they reach it from several sides", "Yes, they reach it only from the west", "Yes, they reach it only from the north", plan, [CO], "Read the last evidence sentence."),
    c("Which landform curves inwards towards the land?", "A bay", "A headland", "A cliff top", planNamed, [CO], "Look at the shape of the coastline."),
    sort("Sort each description by headland or bay.", ["Headland", "Bay"], [["Sticks out into the sea", 0], ["Made of harder rock", 0], ["Curves inwards", 1], ["Softer rock worn away", 1]], plan, [CO], "Use the first two evidence sentences."),
  ]),
  lesson(["Waves keep working on a headland.", "A crack can become a cave, an arch, a stack and a stump.", "Put the steps in order."], steps, [
    c("What does a crack in a headland widen into first?", "A cave", "A stack", "An arch", steps, [CO, JC], "Read the first step."),
    c("What forms when a cave is worn right through?", "An arch", "A stack", "A stump", steps, [CO, JC], "Read the second step."),
    c("What is left when the top of an arch falls?", "A stack", "A cave", "A bay", steps, [CO, JC], "Read the third step."),
    c("What does a stack wear down to?", "A stump", "An arch", "A cave", steps, [CO, JC], "Read the fourth step."),
    c("Which landform is Durdle Door in Dorset?", "An arch", "A stack", "A bay", steps, [JC], "Read the last evidence line."),
    c("What are Old Harry Rocks in Dorset?", "Stacks", "Caves", "A river", steps, [JC], "Read the last evidence line."),
    ordered("Order the landforms from the first to the last.", ["Cave", "Arch", "Stack", "Stump"], steps, [CO, JC], "Start with the crack that widens."),
    ordered("Put the stages in order, starting with the headland.", ["Crack in headland", "Cave", "Arch", "Stack"], steps, [CO, JC], "Each stage comes from the stage before."),
    sort("Sort each landform by what made it.", ["Made by erosion", "Made by deposition"], [["Arch", 0], ["Stack", 0], ["Beach", 1], ["Sand bar", 1]], steps, [CO], "Erosion wears away; deposition drops material."),
  ]),
  lesson(["People protect some coasts from erosion.", "Defences cost money.", "Choose the best idea for the evidence."], manage, [
    c("What do groynes help to do on a beach?", "Hold sand in place", "Make waves bigger", "Dig the cliff away", manage, [DEF], "Read the second evidence sentence."),
    c("What is rock armour?", "Large rocks piled at the foot of a cliff to absorb waves", "A tall wall of concrete that reflects waves back", "Low walls built out into the sea to trap sand", manage, [DEF], "Read the third evidence sentence."),
    c("Why do soft clay cliffs on the Holderness coast wear back fast?", "Waves wear soft rock away quickly", "Clay is harder than chalk", "Clay is never touched by waves", manage, [HOLD], "Read the fourth evidence sentence."),
    c("Which cliffs wear back more slowly?", "Hard chalk cliffs", "Soft clay cliffs", "Sandcastles", manage, [HOLD], "Read the fourth evidence sentence."),
    c("What do defences cost?", "A lot to build and repair", "Nothing at all", "Less than a pencil", manage, [DEF], "Read the last evidence sentence."),
    c("Why can people not protect every part of the coast?", "Defences cost a lot, so choices must be made", "Waves are too small to damage anything at the coast", "Cliffs never change, so nobody needs any defences", manage, [DEF], "Link cost to choices."),
    c("Which defence is a strong wall that reflects waves?", "A sea wall", "Groynes", "Rock armour", manage, [DEF], "Read the first evidence sentence."),
    c("Which place would most need strong defences?", "A town built on a fast-eroding clay cliff", "An empty cliff of hard chalk with no buildings", "A high mountain far away from the sea", manage, [HOLD, DEF], "Think about where erosion matters most."),
    sort("Sort each coastal defence by its job.", ["Absorbs or reflects waves", "Holds sand on a beach"], [["Sea wall", 0], ["Rock armour", 0], ["Groynes", 1], ["Low walls built out into the sea", 1]], manage, [DEF], "Groynes hold sand."),
  ]),
]);
