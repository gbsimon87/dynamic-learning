import { c, lesson, ordered, record, sort, topic, visual } from "./authoring.js";

const FL = "y5_floods", EA = "y5_floodDefence", BAR = "y5_thamesBarrier";
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const LEVEL = [1, 1, 3, 5, 4, 2, 1];
const BANK = 4;
const ex = "Example data, not a real river: depth in metres at one measuring point.";

const meaning = record([
  "A flood happens when a river rises and spills over its banks onto the flat land beside it.",
  "That flat land is called the floodplain.",
  "Floods are natural, and floodplain soil is rich because rivers leave fine mud on it.",
  "Floods can damage homes, roads and farm fields.",
], "What is a flood?");
const causes = record([
  "Heavy or long rain puts a lot of water into a river quickly.",
  "When the ground is already soaked, extra rain cannot sink in, so it runs into the river.",
  "Roofs, roads and car parks cannot soak up water, so rain runs into drains and streams fast.",
  "Steep hillsides send water downhill faster than flat land.",
  "Melting snow can also add water to a river.",
], "Why rivers flood");
const table = visual("table", "River depth after heavy rain, example data", `${ex} Depth in metres: ${DAYS.map((d, i) => `${d} ${LEVEL[i]}`).join(", ")}. The river bank is full at 4 metres.`, [ex, "The river bank is full at 4 metres.", "Heavy rain fell on Wednesday."], {
  caption: "River depth (m) at one measuring point, Monday to Sunday", columns: ["Day", ...DAYS], rows: [["Depth (m)", ...LEVEL]],
});
const chart = (i, prompt, opts) => ({ kind: "chart", prompt, answer: LEVEL[i], options: opts, chart: { type: "bar", rows: DAYS.map((d, j) => ({ label: d, value: LEVEL[j] })), step: 1, max: BANK + 2, unit: "River depth (m)" }, visual: table, sources: [FL], evidence: [table.lines[0]], hint: `Find the bar labelled ${DAYS[i]} and read its value.` });
const defences = record([
  "Embankments and flood walls hold a rising river inside its channel.",
  "Flood storage areas, such as meadows or reservoirs, hold extra water until the river falls.",
  "Flood warnings let people move belongings and take care before water arrives.",
  "The Thames Barrier is a set of gates across the River Thames in London. It closes to keep high tides from flooding the city.",
  "Planting trees and keeping floodplains open can slow the water down.",
], "Ways to reduce flood damage");

export const riversInFlood = topic([
  lesson(["A flood is a river spilling over its banks.", "The flat land beside a river is its floodplain.", "Floods are natural."], meaning, [
    c("What is a flood?", "A river rising and spilling over its banks", "A river shrinking and drying up in a drought", "A river changing its course to a new route", meaning, [FL], "Read the first evidence sentence."),
    c("What is the flat land beside a river called?", "A floodplain", "A summit", "A headland", meaning, [FL], "Read the second evidence sentence."),
    c("Why is floodplain soil rich?", "Rivers leave fine mud on it", "Rivers take all the soil away", "Sunlight makes it rich", meaning, [FL], "Read the third evidence sentence."),
    c("Which of these can a flood damage?", "Homes, roads and farm fields", "Only mountains and high rocky ridges", "Nothing, because floods never reach any land", meaning, [FL], "Read the last evidence sentence."),
    c("Are floods always caused by people?", "No, floods are natural", "Yes, always", "Floods never happen", meaning, [FL], "Read the third evidence sentence."),
    c("Where does the water go in a flood?", "Onto the flat land beside the river", "Straight up into the air as vapour", "Down into the sea, leaving the land dry", meaning, [FL], "Read the first evidence sentence."),
    c("Which place is most likely to flood?", "Flat land beside a river", "The top of a hill far from a river", "A desert far from any river", meaning, [FL], "Think about the floodplain."),
    sort("Sort each item by whether a flood could cover it.", ["Beside the river", "High above the river"], [["Floodplain farm field", 0], ["Riverside path", 0], ["Hilltop radio mast", 1], ["Village on a high ridge", 1]], meaning, [FL], "Floods spread across low, flat land."),
  ]),
  lesson(["Several things can cause a river to flood.", "Rain, soaked ground and hard surfaces matter.", "Read each cause."], causes, [
    c("Why does heavy rain make rivers rise?", "A lot of water enters the river quickly", "Rain makes the river flow more slowly", "Rain removes all the water from the river", causes, [FL], "Read the first evidence sentence."),
    c("What happens when the ground is already soaked?", "Extra rain cannot sink in and runs into the river", "Extra rain sinks in more quickly than before", "Extra rain stops falling over the soaked ground", causes, [FL], "Read the second evidence sentence."),
    c("Why do roads and roofs make flooding more likely?", "They cannot soak up water", "They soak up all the rain", "They make the rain stop", causes, [FL], "Read the third evidence sentence."),
    c("Which hillside sends water to the river fastest?", "A steep hillside", "A flat field", "A sandy beach", causes, [FL], "Read the fourth evidence sentence."),
    c("Which can add water to a river besides rain?", "Melting snow", "Dry air", "A cold wind only", causes, [FL], "Read the last evidence sentence."),
    c("Which place has the faster runoff after rain?", "A town with many roofs and roads", "A wide, grassy field", "A woodland with deep soil", causes, [FL], "Think about which surfaces soak up water."),
    c("Which place is most at risk of flooding after weeks of rain?", "A town beside a river with soaked ground", "A town beside a river in a dry month", "A village far from any river", causes, [FL], "Combine ground, rain and river."),
    ordered("Order the steps in a flood after heavy rain.", ["Heavy rain falls", "Soaked ground cannot hold more", "Water runs into the river", "The river spills over its banks"], causes, [FL], "Start with the rain."),
    sort("Sort each cause by whether it adds water or stops it soaking away.", ["Adds water", "Stops water soaking away"], [["Heavy rain", 0], ["Melting snow", 0], ["Roads and car parks", 1], ["Soaked ground", 1]], causes, [FL], "Look at the effect in each line."),
  ]),
  lesson(["A river depth chart shows how a flood changes.", "The bank is full at 4 metres.", "Read the bars carefully."], table, [
    chart(3, "What was the river depth on Thursday?", [LEVEL[3], LEVEL[4], LEVEL[2]]),
    chart(2, "What was the river depth on Wednesday?", [LEVEL[2], LEVEL[3], LEVEL[5]]),
    chart(0, "What was the river depth on Monday?", [LEVEL[0], LEVEL[2], LEVEL[5]]),
    chart(4, "What was the river depth on Friday?", [LEVEL[4], LEVEL[3], LEVEL[2]]),
    c("On which day was the river deepest?", "Thursday", "Wednesday", "Sunday", table, [FL], "Find the tallest bar."),
    c("When did the river rise above the full bank level of 4 metres?", "Thursday", "Wednesday", "Saturday", table, [FL], "Look for a depth above 4."),
    c("What happened after the rain on Wednesday?", "The river kept rising for a day, then fell", "The river fell straight away and stayed low", "The river stayed the same depth all week", table, [FL], "Compare Wednesday, Thursday and Friday."),
    c("By how many metres did the river rise from Monday to Thursday?", "4", "3", "5", table, [FL], "Subtract Monday's depth from Thursday's."),
    c("Why does the peak come after the heaviest rain?", "Rain takes time to run off the land into the river", "The river is deepest before the rain starts", "The rain stops the river flowing for a day", table, [FL], "Think about how water travels downhill."),
  ]),
  lesson(["People reduce flood damage in different ways.", "Some defences hold water back; some store it.", "Pick the idea that fits."], defences, [
    c("What do embankments and flood walls do?", "Hold a rising river inside its channel", "Make the river rise faster than before", "Dry up the river so it cannot flood", defences, [EA], "Read the first evidence sentence."),
    c("What do flood storage areas do?", "Hold extra water until the river falls", "Remove all the rain from the sky above", "Make the river flood onto more homes", defences, [EA], "Read the second evidence sentence."),
    c("What does a flood warning let people do?", "Prepare before the water arrives", "Stop the rain from falling on the town", "Move the river to a different valley", defences, [EA], "Read the third evidence sentence."),
    c("Where is the Thames Barrier?", "Across the River Thames in London", "Across the River Severn in Wales", "Across the Amazon in Brazil", defences, [BAR], "Read the fourth evidence sentence."),
    c("What does the Thames Barrier keep out of London?", "High tides", "Heavy snow", "Wind", defences, [BAR], "Read the fourth evidence sentence."),
    c("How can planting trees and keeping floodplains open help?", "It can slow the water down", "It can make rivers faster", "It stops all rain", defences, [EA], "Read the last evidence sentence."),
    c("Which idea stores water rather than holding it back?", "A flood storage meadow", "A flood wall", "A warning siren", defences, [EA], "Read the second evidence sentence."),
    c("Which is the best reason people choose different defences?", "Places have different rivers, land and costs", "All rivers are the same, so one defence fits all", "Defences never work, so nobody builds them", defences, [EA], "Think about how places differ."),
    sort("Sort each idea by whether it holds water back or gives time to prepare.", ["Holds or stores water", "Gives time to prepare"], [["Flood wall", 0], ["Storage meadow", 0], ["Flood warning", 1], ["Moving belongings upstairs", 1]], defences, [EA], "Walls and meadows act on the water; warnings act on people."),
  ]),
]);
