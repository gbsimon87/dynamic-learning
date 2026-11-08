import { lesson, detective, sort, order, year6Topic } from "./authoring.js";
export const mapsThroughTime = year6Topic(["https://www.bbc.co.uk/bitesize/topics/zq2qhyc", "https://maps.nls.uk/", "https://www.nationalarchives.gov.uk/education/"], [
  lesson("🗺️", "Old and new maps", [
    ["A map is a drawing of a place seen from above.", "How does a map show a place?", "as a drawing seen from above", "as a photo taken from the side", "as a story about its kings"],
    ["A key explains what each symbol on a map means.", "What does a map key do?", "explains what each symbol means", "tells you who the mapmaker was", "shows which way is north"],
    ["A scale helps you work out real distances from the map.", "What does a map scale help you work out?", "real distances between places", "who drew the map for money", "how many people live there"],
    ["Older maps often use different symbols from modern maps.", "How do older maps often differ from modern ones?", "they use different symbols", "they always show more roads", "they never show any rivers"],
    ["Most maps have a date, which tells us when they were made.", "What does a date on a map tell us?", "when the map was made", "who lives in the place now", "how long a walk would take"],
    ["Comparing maps of one place shows what has changed.", "What does comparing maps of one place show?", "what has changed", "which map is the prettiest", "what the weather was like"]],
    sort("Key or scale?", ["Map key", "Map scale"], [["What a symbol means", 0], ["What the blue lines are", 0], ["How far apart places are", 1], ["Real distances on the ground", 1]], ["what each symbol", "real distances"])),
  lesson("📅", "Four maps of one village", [
    ["Imagine a made-up village called Millbrook, with four maps.", "How many maps of Millbrook are there?", "four", "two", "nine"],
    ["The map of 1800 shows fields, a mill and a church.", "What does the map of 1800 show?", "fields, a mill and a church", "a railway and a station", "streets of houses and shops"],
    ["The map of 1860 adds a railway line and a station.", "What does the map of 1860 add?", "a railway line and a station", "a castle with a moat", "a canal with a lock"],
    ["By 1920, the fields have turned into rows of houses.", "What had happened to the fields by 1920?", "they had turned into rows of houses", "they had turned into a large lake", "they had been left empty and wild"],
    ["The 2020 map has a bypass; the mill and station are gone, but the church remains.", "What remains on the 2020 map?", "the church", "the mill", "the station"],
    ["Putting maps in date order shows how the village changed.", "What does putting maps in date order show?", "how the village changed", "who drew each map", "where the maps were sold"]],
    order("Order the maps, oldest first.", ["Fields and a mill · 1800", "A railway arrives · 1860", "Rows of houses · 1920", "A bypass road · 2020"], ["1800", "1860", "1920", "2020"]), false),
  detective(["A made-up map of Millbrook is dated 1860.", "It shows a mill, a church, a railway and a pub.", "It does not show every house or every garden path.", "Its key uses a small cross for the church.", "The map was drawn for the railway company.", "Railways wanted to show where trains and stations would go.", "A map shows what the mapmaker chose to include."],
    [
    ["What date is on the map?", "1860", "1760", "1960", "dated 1860"],
    ["Which building is shown on the map?", "a mill", "a theatre", "a library", "shows a mill"],
    ["What does the map not show?", "every house and garden path", "the church and the mill", "the railway and the pub", "does not show every house"],
    ["What does the key use for the church?", "a small cross", "a blue circle", "a red square", "a small cross for the church"],
    ["Who was the map drawn for?", "the railway company", "the village school", "a family of farmers", "drawn for the railway company"],
    ["Why might the railway be shown so clearly?", "to show where trains and stations would go", "to hide the church from visitors", "to show how old the mill was", "show where trains and stations would go"],
    ["What does a map show?", "what the mapmaker chose to include", "every single detail of a place", "only things that are brand new", "what the mapmaker chose to include"]], { picture: "🧭", pictureLabel: "An old made-up map" }),
  lesson("🔍", "Reading change on a map", [
    ["A railway often made a village grow quickly.", "What did a railway often do to a village?", "help it grow quickly", "make it vanish at once", "turn it into a field"],
    ["Fields became streets because more people needed homes.", "Why did fields become streets?", "more people needed homes", "farmers wanted less land", "the rivers moved away"],
    ["Rivers and main roads usually stay in the same place.", "What usually stays in the same place?", "rivers and main roads", "shops and fields", "gardens and sheds"],
    ["A church often stays, even when everything around it changes.", "What often stays when everything around it changes?", "a church", "a car park", "a corner shop"],
    ["A map from one year cannot show what happened next.", "What can one old map not show?", "what happened after it was made", "where its streets ran", "what its symbols meant"],
    ["Two maps together show change, but not always why it happened.", "What do two maps not always show?", "why a change happened", "that a change happened", "where a change happened"]],
    sort("Changed or stayed?", ["Changed", "Stayed"], [["Fields became streets", 0], ["A railway made it grow", 0], ["The main road", 1], ["The church", 1]], ["Fields became streets", "railway", "main roads", "church"])),
]);
