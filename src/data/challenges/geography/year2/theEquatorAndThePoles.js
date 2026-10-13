import { c, choices, lesson, record, sort, topic } from "./authoring.js";
import { globe, worldMap } from "./visuals.js";
const locations = worldMap([["UK", [-2, 54]], ["Brunei", [114.94, 4.88]], ["North polar area", [0, 80]]],
  ["The Equator crosses the middle of the world map.", "Brunei is close to the Equator, in Asia.", "The UK is farther north, in Europe.", "The north polar area lies far from the Equator."], "World map — Equator shown");
locations.equator = true;
const pattern = record(["Places near the Equator are usually warm.", "Areas near the poles are usually cold.", "Brunei is near the Equator; the UK is farther north.", "Warm places can have rain as well as sunshine.", "Asia is large and reaches far north and near the Equator.", "This broad pattern does not predict every day's weather."]);
const example = record(["Example day records, October 2026; invented teaching data.", "Brunei-area example: warm and rainy.", "UK-area example: cooler and cloudy.", "North polar example: cold and snowy.", "Asia includes near-Equator and far-north places.", "One example day cannot describe every day or a whole continent."]);
export const theEquatorAndThePoles = topic([
  lesson(["The Equator is an imaginary line around Earth's middle.", "The North Pole and South Pole are Earth's ends.", "Find them on the labelled globe."], globe, choices([
    ["Which line crosses Earth's middle?", "Equator", "North Pole", "South Pole"],
    ["Which named place is at the globe's top?", "North Pole", "Equator", "South Pole"],
    ["Which named place is at the globe's bottom?", "South Pole", "Equator", "North Pole"],
    ["Is the Equator a real painted line on Earth?", "No, it is imaginary", "Yes, a painted road", "Yes, a built wall"],
    ["Which pair names Earth's two poles?", "North Pole and South Pole", "UK and Brunei", "Asia and Europe"],
    ["Which label is between the poles?", "Equator", "North Pole", "South Pole"],
    ["Which place lies far north of the middle line?", "North Pole", "Equator", "Brunei"],
  ], globe, ["coordinates", "y2Weather"])),
  lesson(["Brunei is near the Equator, in Asia.", "The UK is farther north, in Europe.", "Use the globe markers and world map."], locations, [
    ...choices([
      ["Which country marker is nearer the Equator?", "Brunei", "UK", "Both equally near"],
      ["Which country marker is farther north?", "UK", "Brunei", "Both equally north"],
      ["Which continent contains Brunei?", "Asia", "Europe", "Antarctica"],
      ["Which continent contains the UK?", "Europe", "Asia", "Australia"],
      ["Which marker labels the north polar area?", "C", "A", "B"],
    ], locations, ["atlas"]),
    c("Which numbered globe marker shows the UK?", "1", "2", "Neither marker", globe, ["atlas"]),
    c("Which numbered globe marker shows Brunei?", "2", "1", "Neither marker", globe, ["atlas"]),
  ]),
  lesson(["Places near the Equator are usually warmer.", "Polar areas are usually colder.", "Warm places can also be wet."], pattern, [
    ...choices([
      ["Which broad pattern fits near-Equator places?", "Usually warm", "Always snowy", "Always dry"],
      ["Which broad pattern fits polar areas?", "Usually cold", "Always hot", "Always sunny"],
      ["Why is Brunei a useful near-Equator example?", "It is close to the Equator", "It is at the South Pole", "It is in northern Europe"],
      ["Can a warm place have rainy weather?", "Yes, warm and wet can happen together", "No, warm always means dry", "Only polar areas have rain"],
      ["Does the broad pattern predict every day's weather?", "No, daily weather can vary", "Yes, every day exactly", "Yes, only rain is possible"],
      ["Which area is farther from the Equator?", "North polar area", "Brunei", "The Equator itself"],
    ], pattern, ["y2Weather"]),
    sort("Sort the taught locations by their Equator distance.", ["Near the Equator", "Farther from the Equator"], [["Brunei", 0], ["UK", 1], ["North polar area", 1]], pattern, ["atlas"]),
  ]),
  lesson(["One record describes one example day.", "Asia contains places at different distances from the Equator.", "Avoid saying every place has the same weather."], example, choices([
    ["Which claim matches the Brunei-area example?", "Warm and rainy together", "Warm must mean dry", "Rain must mean freezing"],
    ["What does the UK-area example record?", "Cooler and cloudy", "Warm and rainy", "Cold and snowy"],
    ["What does the north polar example record?", "Cold and snowy", "Warm and rainy", "Only hot sunshine"],
    ["Why can Asia have different weather in different places?", "It reaches near the Equator and far north", "Every place is at the same latitude", "Every place is at the North Pole"],
    ["Which claim about Asia should we reject?", "All Asia has the same weather", "Asia includes near-Equator places", "Asia reaches far north"],
    ["What would help describe typical weather over time?", "Many dated records over many years", "Only one rainy day", "Only a photo of a boat"],
    ["Which limit applies to these records?", "They describe invented example days only", "They prove every day is the same", "They describe all Asian countries"],
  ], example, ["example", "y2Weather"])),
]);
