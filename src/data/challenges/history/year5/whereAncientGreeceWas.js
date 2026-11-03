import { lesson, detective, sort, order, year5Topic, GREEK_TIMELINE } from "./authoring.js";
export const whereAncientGreeceWas = year5Topic(["https://www.britannica.com/place/ancient-Greece", "https://www.worldhistory.org/greece/", "https://www.britishmuseum.org/learn/schools"], [
  lesson("🗺️", "Ancient Greece on a map", [
    ["Ancient Greece was in south-east Europe, beside the Mediterranean Sea.", "Where was Ancient Greece?", "south-east Europe", "North America", "central Africa"],
    ["Mountains covered most of the land, so travelling by sea was often easier.", "Why was sea travel often easier?", "mountains covered the land", "there were no boats", "the land was flat"],
    ["Greece has many islands, including Crete.", "Which island is named here?", "Crete", "Lindisfarne", "Orkney"],
    ["The Greeks lived in city-states, which were towns with their own rulers and laws.", "What was a city-state?", "a town with its own rulers and laws", "one huge empire with one king", "a ship that carried goods"],
    ["Athens and Sparta were two of the most famous city-states.", "Which were famous city-states?", "Athens and Sparta", "Rome and York", "Jorvik and Mercia"],
    ["Greek people spoke one language and shared gods and festivals.", "What did Greek people share?", "a language, gods and festivals", "one king and one army", "one law and one tax"]],
    sort("Land or people?", ["The land", "The people"], [["mountains", 0], ["islands", 0], ["Mediterranean coast", 0], ["city-states", 1], ["one language", 1]], ["Mountains", "islands", "Mediterranean Sea", "city-states", "one language"])),
  lesson("📅", "Greek dates", [
    ["Greek city-states grew up about 800 BC.", "When did Greek city-states grow up?", "about 800 BC", "about AD 800", "in 146 BC"],
    ["The first Olympic Games were held in 776 BC.", "When were the first Olympic Games held?", "776 BC", "508 BC", "146 BC"],
    ["With BC dates, a bigger number means older.", "Which BC date is older?", "the bigger number", "the smaller number", "they are the same age"],
    ["Athens began its democracy about 508 BC.", "What began in Athens about 508 BC?", "democracy", "the Olympic Games", "Roman rule"],
    ["Persia attacked Greece in 490 BC.", "Who attacked Greece in 490 BC?", "Persia", "Egypt", "Britain"],
    ["Rome took control of Greece in 146 BC.", "Who took control of Greece in 146 BC?", "Rome", "Persia", "Sparta"]],
    order("Order the events, oldest first.", ["City-states · about 800 BC", "Olympics · 776 BC", "Democracy · about 508 BC", "Persian attack · 490 BC", "Rome rules · 146 BC"], ["800 BC", "776 BC", "508 BC", "490 BC", "146 BC"]), GREEK_TIMELINE),
  detective(["Our map shows Greece with Athens, Sparta and Olympia marked.", "The map is a drawing, so the positions are only approximate.", "Athens is on the east side of the mainland.", "Sparta is in the south, on the Peloponnese.", "Crete lies south of the mainland, in the sea.", "Olympia is in the west of the Peloponnese.", "A map shows where places are, but not how people lived there."],
    [
    ["Which city is on the east side of the mainland?", "Athens", "Sparta", "Olympia", "Athens is on the east side of the mainland."],
    ["Where is Sparta?", "in the south, on the Peloponnese", "on the island of Crete", "far north of Athens", "Sparta is in the south, on the Peloponnese."],
    ["Where is Crete?", "south of the mainland", "north of the mainland", "in the mountains", "Crete lies south of the mainland, in the sea."],
    ["Where is Olympia?", "west of the Peloponnese", "east of Athens", "on Crete", "Olympia is in the west of the Peloponnese."],
    ["Is our map a photograph?", "no, it is a drawing", "yes, a photograph", "yes, from long ago", "The map is a drawing"],
    ["How exact are the positions on the map?", "only approximate", "perfectly exact", "chosen by Athenian voters", "the positions are only approximate"],
    ["What can a map not tell us?", "how people lived there", "where places are", "which place is south", "not how people lived there"]], { scene: "y5-greece-map", picture: "🗺️", pictureLabel: "Map of Greece" }),
  lesson("🧭", "Why city-states stayed separate", [
    ["Mountains and sea kept Greek communities apart.", "What kept Greek communities apart?", "mountains and sea", "deserts and ice", "walls and moats"],
    ["So each city-state had its own laws and army.", "What did each city-state have?", "its own laws and army", "the same king", "no laws at all"],
    ["Greeks still felt linked by their language and gods.", "What linked the Greeks?", "language and gods", "one army", "one ruler"],
    ["They met at festivals, such as the Olympic Games.", "Where did Greeks from many cities meet?", "at festivals such as the Games", "at Roman forts", "at Egyptian pyramids"],
    ["Greeks sailed to start new towns around the Mediterranean.", "What did some Greeks do by sea?", "start new towns", "build Hadrian's Wall", "dig for flint"],
    ["Cities fought each other, but sometimes joined together against enemies.", "What did cities sometimes do against enemies?", "join together", "never meet", "pay Danegeld"]],
    sort("Kept apart or brought together?", ["Kept apart", "Brought together"], [["mountains", 0], ["own laws", 0], ["language", 1], ["festivals", 1], ["gods", 1]], ["Mountains", "own laws", "language", "festivals", "gods"])),
]);
