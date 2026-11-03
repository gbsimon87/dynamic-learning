import { c, lesson, ordered, record, sort, topic, visual } from "./authoring.js";
import { letterOf, map } from "./maps.js";

const RING = "y5_ringOfFire", HAZ = "y5_hazards", ATLAS = "atlas", IS = "y5_iceland", STH = "y5_stHelens", VES = "vesuvius", JP = "y5_japan2011";
const which = (v, name, others) => c(`Which letter marks ${name} on the map?`, `Marker ${letterOf(v, name)}`, `Marker ${letterOf(v, others[0])}`, `Marker ${letterOf(v, others[1])}`, v, [ATLAS, RING], "Find the marker list in the evidence, then match the name.");

const ring = map("world", ["Japan", "Chile", "California", "Iceland"], [
  "Earth's crust is split into huge plates that move very slowly.",
  "Many volcanoes and earthquakes happen where plates meet.",
  "Japan, Chile and California lie around the Pacific Ring of Fire.",
  "Iceland lies on the Mid-Atlantic Ridge, where two plates move apart.",
]);
const cases = visual("table", "Four hazards that made the news", "Vesuvius, Italy, in AD 79: a volcano whose ash and hot gas buried the town of Pompeii. Mount St Helens, USA, in 1980: a volcano whose huge eruption flattened forests. Eyjafjallajokull, Iceland, in 2010: a volcano whose ash cloud disrupted flights across Europe. Japan in 2011: an earthquake whose tsunami flooded coastal towns.", [
  "A volcano is a hazard. It becomes a disaster when it harms people.", "Mount St Helens is in Washington State, USA.", "A tsunami is a series of huge sea waves, often caused by an earthquake under the sea.",
], { caption: "Four natural hazards", columns: ["Place", "Hazard", "Year", "What happened"], rows: [["Vesuvius, Italy", "Volcano", "AD 79", "Ash and hot gas buried the town of Pompeii"], ["Mount St Helens, USA", "Volcano", "1980", "A huge eruption flattened forests"], ["Eyjafjallajokull, Iceland", "Volcano", "2010", "An ash cloud disrupted flights across Europe"], ["Japan", "Earthquake", "2011", "A tsunami flooded coastal towns"]] });
const prepare = record([
  "In Japan, many buildings are built to sway without falling in an earthquake.",
  "Japanese schools and families practise earthquake drills, and phones send warning alerts.",
  "Scientists watch volcanoes with instruments that measure small tremors and gases.",
  "Coastal tsunami warnings tell people to move to higher ground.",
  "Planning where to build, and where people can safely go, reduces harm.",
], "Getting ready");
const live = visual("table", "Why people live near hazards", "Japan: earthquakes, with strong buildings, drills and alerts, and a country with cities, farming and industry. Iceland: volcanoes, with monitoring, and hot underground water used for heating and electricity. Italy near Vesuvius: a volcano, with monitoring and evacuation plans, and fertile soil for farms.", [
  "Hazards are one part of living somewhere.", "Hot rock deep underground can heat water, a source of geothermal energy.", "Volcanic ash can make soil rich for farming.",
], { caption: "Hazards, preparation and benefits", columns: ["Place", "Hazard", "Preparation", "Benefit of living there"], rows: [["Japan", "Earthquakes", "Strong buildings, drills, alerts", "Cities, farming and industry"], ["Iceland", "Volcanoes", "Monitoring and plans", "Hot water for heating and power"], ["Italy near Vesuvius", "Volcano", "Monitoring and evacuation plans", "Fertile soil for farms"]] });

export const livingWithNaturalHazards = topic([
  lesson(["Earth's crust is made of moving plates.", "Volcanoes and earthquakes are common where plates meet.", "The Pacific Ring of Fire circles the Pacific Ocean."], ring, [
    c("What is Earth's crust split into?", "Huge plates", "Equal squares", "Round bubbles", ring, [RING, HAZ], "Read the first evidence sentence."),
    c("Where are volcanoes and earthquakes common?", "Where plates meet", "In the middle of every plate", "Only at the poles", ring, [RING, HAZ], "Read the second evidence sentence."),
    c("Which marked place is in the Pacific Ring of Fire?", "Japan", "Iceland", "None of them", ring, [RING], "Read the third evidence sentence."),
    c("Which marked place lies on the Mid-Atlantic Ridge?", "Iceland", "Japan", "Chile", ring, [IS], "Read the last evidence sentence."),
    c("What happens at the Mid-Atlantic Ridge?", "Two plates move apart", "Two plates stay still", "The sea dries up", ring, [IS], "Read the last evidence sentence."),
    which(ring, "Chile", ["Japan", "California"]),
    which(ring, "Iceland", ["Japan", "Chile"]),
    c("Which marked place lies furthest east?", "Japan", "California", "Iceland", ring, [ATLAS], "Compare degrees east and west; Japan has the largest east number."),
    sort("Sort each place by whether it lies around the Pacific Ring of Fire.", ["Around the Ring of Fire", "Not around the Ring of Fire"], [["Japan", 0], ["Chile", 0], ["California", 0], ["Iceland", 1]], ring, [RING, IS], "Iceland is on the Mid-Atlantic Ridge."),
  ]),
  lesson(["Read the table of natural hazards.", "A hazard is a danger from nature.", "It becomes a disaster when it harms people."], cases, [
    c("What was buried by ash and hot gas at Vesuvius in AD 79?", "The town of Pompeii", "The city of Paris", "The town of Whitby", cases, [VES], "Read the Vesuvius row."),
    c("Which volcano is in Washington State, USA?", "Mount St Helens", "Vesuvius", "Eyjafjallajokull", cases, [STH], "Read the second evidence line."),
    c("What did the 1980 eruption of Mount St Helens flatten?", "Forests", "Pompeii", "Coastal towns", cases, [STH], "Read the Mount St Helens row."),
    c("What did the 2010 Icelandic ash cloud disrupt?", "Flights across Europe", "Schools in Japan", "Boats in Italy", cases, [IS], "Read the Eyjafjallajokull row."),
    c("What flooded coastal towns in Japan in 2011?", "A tsunami", "A glacier", "A lava river", cases, [JP], "Read the Japan row."),
    c("What is a tsunami?", "A series of huge sea waves, often caused by an undersea earthquake", "A very strong wind that blows across the land", "A kind of volcano that erupts under the sea", cases, [JP], "Read the last evidence line."),
    c("When does a hazard become a disaster?", "When it harms people", "When it happens at night", "Whenever the sun shines", cases, [HAZ], "Read the first evidence line."),
    ordered("Order the events from the earliest to the latest.", ["Vesuvius erupts (AD 79)", "Mount St Helens erupts (1980)", "Icelandic ash cloud (2010)", "Japan tsunami (2011)"], cases, [VES, STH, IS, JP], "Compare the years in the table."),
    sort("Sort each hazard by whether it is a volcano or an earthquake.", ["Volcano", "Earthquake"], [["Vesuvius", 0], ["Mount St Helens", 0], ["Eyjafjallajokull", 0], ["Japan, 2011", 1]], cases, [VES, STH, IS, JP], "Use the Hazard column."),
  ]),
  lesson(["People can prepare for hazards.", "Preparation reduces harm.", "It cannot stop the hazard happening."], prepare, [
    c("How are many buildings in Japan built?", "To sway without falling in an earthquake", "To stay stiff and rigid, so they crack easily", "To float on water, like boats in the harbour", prepare, [JP, HAZ], "Read the first evidence sentence."),
    c("What do Japanese schools and families practise?", "Earthquake drills", "Volcano climbing", "Flood boating", prepare, [JP], "Read the second evidence sentence."),
    c("What do scientists measure to watch a volcano?", "Small tremors and gases", "The colour of the sky", "The number of visitors", prepare, [HAZ], "Read the third evidence sentence."),
    c("What do tsunami warnings tell people to do?", "Move to higher ground", "Go down to the beach", "Sit very still", prepare, [HAZ], "Read the fourth evidence sentence."),
    c("What can planning where to build do?", "Reduce harm", "Stop earthquakes happening", "Make volcanoes erupt", prepare, [HAZ], "Read the last evidence sentence."),
    c("Can preparation stop a volcano from erupting?", "No, it reduces harm", "Yes, completely", "Yes, with strong walls", prepare, [HAZ], "Preparation changes the harm, not the hazard."),
    c("Which action prepares for an earthquake?", "Practising a drill", "Climbing a volcano", "Swimming at sea", prepare, [JP], "Read the second evidence sentence."),
    c("Which action helps people near a coast after an undersea earthquake?", "Moving to higher ground", "Walking to the shore", "Staying on the beach", prepare, [HAZ], "Read the fourth evidence sentence."),
    sort("Sort each action by what it prepares for.", ["Earthquake", "Tsunami"], [["Buildings that sway", 0], ["Earthquake drills", 0], ["Warnings to move to higher ground", 1], ["Coastal evacuation routes", 1]], prepare, [JP, HAZ], "Read the evidence for each action."),
  ]),
  lesson(["People live near hazards for good reasons.", "Preparation and benefits both matter.", "Use the table to explain."], live, [
    c("Why is soil near some volcanoes good for farming?", "Volcanic ash can make soil rich", "Lava keeps the soil dry", "Ash never reaches the soil", live, [VES, HAZ], "Read the last evidence line."),
    c("How does Iceland use hot underground water?", "For heating and power", "To grow bananas outdoors", "To stop all earthquakes", live, [IS], "Read the Iceland row."),
    c("What is geothermal energy?", "Energy from hot rock deep underground", "Energy from the Moon pulling on the oceans", "Energy from the wind turning large blades", live, [IS], "Read the second evidence line."),
    c("Which hazard does Japan prepare for in the table?", "Earthquakes", "Volcanic ash on farms", "Floods in Iceland", live, [JP], "Read the Japan row."),
    c("What is one benefit of living near Vesuvius?", "Fertile soil for farms", "No hazards at all", "Hot water for power", live, [VES], "Read the Italy row."),
    c("Why do many people choose to live near hazards?", "They can offer jobs, farmland or energy", "Hazards stop happening once people arrive", "People cannot move anywhere else in the world", live, [HAZ], "Link benefits to choices."),
    c("Which statement is supported by the table?", "Each place has a hazard, preparation and a benefit", "Only Japan has any benefit from living there", "Preparation completely ends every natural hazard", live, [HAZ], "Check each column."),
    c("Which is the best conclusion?", "Living near a hazard involves benefits as well as risks", "Nobody should ever live near any natural hazard", "Hazards cannot be prepared for in any way", live, [HAZ], "Avoid extreme statements."),
    sort("Sort each point by whether it is a hazard, a preparation or a benefit.", ["Hazard", "Preparation", "Benefit"], [["Earthquake", 0], ["Evacuation plan", 1], ["Hot water for heating", 2], ["Volcanic eruption", 0]], live, [HAZ], "Volcanic ash falling is itself a hazard."),
  ]),
]);
