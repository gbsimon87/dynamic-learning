import { choices, lesson, sort, topic, visual } from "./authoring.js";
import { placePair, photoPair } from "./visuals.js";
export const PAIRED_WEATHER = [["Whitby-area", "Cool", "Cloudy"], ["Peramu-area", "Warm", "Rainy"]];
const weather = visual("table", "Two example days — October 2026", "Invented example day records: Whitby-area cool and cloudy; Peramu-area warm and rainy. They are not real measurements or typical climate records.",
  ["Example data, October 2026. These are invented day records.", "They cannot tell us about every day or whole-country climate."],
  { caption: "Example day records — invented, October 2026", columns: ["Study area", "Temperature word", "Weather"], rows: PAIRED_WEATHER });
const combined = { ...placePair, maps: [...placePair.maps, weather], lines: [...placePair.lines, "Example day: Whitby-area cool/cloudy; Peramu-area warm/rainy.", "The example days do not describe a whole country's climate."] };
combined.alt += " " + weather.alt;
const reasons = { ...combined, lines: [...combined.lines, "Homes give people places to live. Routes connect nearby places.", "Buildings and water appear together in both photographed areas."] };
reasons.alt += " Homes give people places to live. Routes connect nearby places.";
export const comparingTwoSmallPlaces = topic([
  lesson(["We compare two small areas, not whole countries.", "Whitby is in England; Kampong Peramu is in Brunei.", "Both areas have human and physical features."], placePair, choices([
    ["Which small place is in England?", "Whitby harbour area", "Kampong Peramu", "All Asia"],
    ["Which small place is in Brunei?", "Kampong Peramu", "Whitby harbour area", "All Europe"],
    ["Which feature is shown in both areas?", "Homes", "Only mountains", "Only factories"],
    ["Which water reaches the sea at Whitby?", "River Esk", "Brunei River", "Pacific Ocean"],
    ["Which river is beside Kampong Peramu?", "Brunei River", "River Esk", "River Thames"],
    ["Which plan labels adjoining town-centre shops?", "Whitby", "Peramu", "Neither"],
    ["Which plan labels walkways and a jetty?", "Peramu", "Whitby", "Neither"],
  ], placePair, ["y2Whitby", "y2Peramu"])),
  lesson(["Compare matching features across maps and photographs.", "Read each row of the example weather records.", "One day is not a whole climate."], combined, [
    ...choices([
      ["Which example area records cloudy weather?", "Whitby-area", "Peramu-area", "Both areas"],
      ["Which example area records rainy weather?", "Peramu-area", "Whitby-area", "Neither area"],
      ["Which example temperature word belongs to Peramu-area?", "Warm", "Cool", "Freezing"],
      ["Which example temperature word belongs to Whitby-area?", "Cool", "Warm", "Freezing"],
      ["What date label belongs to these example days?", "October 2026", "Every year", "No date label"],
    ], weather, ["example"]),
    ...choices([
      ["What similarity can the two photographs support?", "Buildings beside water", "Every building is identical", "Nobody lives beside water"],
      ["What home difference can these photographs support?", "Harbour-edge buildings and a home above water", "All homes in Brunei are identical", "Every English home is above water"],
    ], photoPair, ["y2WhitbyPhoto", "y2HomesPhoto"]),
  ]),
  lesson(["A comparison needs visible evidence.", "Both places have homes and routes beside water.", "Their shown route types and example weather differ."], combined, [
    ...choices([
      ["Which similarity is supported by both plans?", "Homes and water are shown", "Both have airports", "Neither has routes"],
      ["Which second similarity is supported by both plans?", "Both show local routes", "Both show volcanoes", "Both show ice sheets"],
      ["Which route difference is supported?", "Streets in Whitby; walkways in Peramu", "Every journey uses cars", "Nobody travels in either place"],
      ["Which example weather difference is supported?", "Whitby cloudy; Peramu rainy", "Both sunny", "Both snowy"],
      ["Which claim does the weather evidence leave unsupported?", "Peramu is rainy every day", "This Peramu example is rainy", "The Whitby example is cloudy"],
      ["Which claim does the map evidence leave unsupported?", "Every resident travels by boat", "Peramu has a jetty", "Whitby has nearby shops"],
    ], combined, ["y2Whitby", "y2Peramu", "example"]),
    sort("Sort similarities and differences from the paired evidence.", ["Similarity shown", "Difference shown"], [["Both have homes", 0], ["Both have routes", 0], ["Street or walkway", 1], ["Example cloudy or rainy day", 1]], combined, ["y2Whitby", "y2Peramu", "example"]),
  ]),
  lesson(["Give a comparison and a reason from evidence.", "Say what the sources leave uncertain.", "Avoid claims about every home or every day."], reasons, choices([
    ["Which comparison includes a shared need and reason?", "Both have homes where people can live", "Both have homes because all climates match", "Neither needs places to live"],
    ["Which comparison connects routes to a need?", "Both have routes to reach nearby places", "Both have routes to remove rivers", "Neither area has local journeys"],
    ["Which explanation fits a walkway above river water?", "It connects nearby buildings without entering water", "It makes every journey a boat trip", "It describes every home in Asia"],
    ["Which comparison includes a weather limit?", "Example days differ; other days may differ too", "One rainy day proves a whole climate", "A cloudy day proves no sunshine ever"],
    ["Which statement includes a place limit?", "These two small areas have homes beside water", "Every English and Bruneian home is waterfront", "Every Asian building is a home"],
    ["What extra evidence could improve the weather comparison?", "More dated records from both places", "Only one boat photo", "Only an undated ocean map"],
    ["What extra evidence could show varied local journeys?", "Several captioned route observations", "Only one home wall", "Only an ocean name list"],
  ], reasons, ["y2Whitby", "y2Peramu", "example"])),
]);
