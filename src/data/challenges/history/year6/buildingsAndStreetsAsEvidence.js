import { lesson, detective, sort, order, year6Topic } from "./authoring.js";
export const buildingsAndStreetsAsEvidence = year6Topic(["https://www.bbc.co.uk/bitesize/topics/zq2qhyc", "https://historicengland.org.uk/images-books/publications/", "https://www.english-heritage.org.uk/visit/blue-plaques/"], [
  lesson("🏠", "Old buildings and streets", [
    ["A building's materials and style can show roughly how old it is.", "What can a building's style show?", "roughly how old it is", "who is inside it today", "what the weather will be"],
    ["Tudor houses often have timber frames, made of wooden beams, with plaster between.", "What do Tudor houses often have?", "timber frames", "flat concrete roofs", "tall glass towers"],
    ["Victorian terraces are rows of brick houses built in the 1800s.", "What are Victorian terraces?", "rows of brick houses", "single thatched cottages", "castles with moats"],
    ["Thatch is a roof made of straw or reeds.", "What is a thatched roof made of?", "straw or reeds", "slate or tin", "clay or glass"],
    ["Street names can show old trades, such as Mill Lane or Tanner's Row.", "What can street names show?", "old trades", "today's weather", "the next bus"],
    ["Blue plaques tell us who lived or worked in a building.", "What does a blue plaque tell us?", "who lived or worked there", "how tall the building is", "what it cost to build"]],
    sort("Street name or building style?", ["Street name", "Building style"], [["Mill Lane", 0], ["Tanner's Row", 0], ["Timber frame", 1], ["Thatched roof", 1]], ["Mill Lane", "Tanner's Row", "timber frames", "Thatch"])),
  lesson("📅", "Dating houses", [
    ["Tudor houses were built between 1485 and 1603.", "When were Tudor houses built?", "between 1485 and 1603", "between 1837 and 1901", "between 1930 and 1939"],
    ["Georgian houses came later, mostly in the 1700s.", "Which houses were mostly built in the 1700s?", "Georgian houses", "Victorian houses", "Roman villas"],
    ["Victorian terraces were built between 1837 and 1901.", "Which years do Victorian terraces come from?", "1837 to 1901", "1485 to 1603", "1930 to 1939"],
    ["Many semi-detached houses were built in the 1930s.", "In which decade were many semi-detached houses built?", "the 1930s", "the 1630s", "the 1480s"],
    ["A house's date is sometimes carved above its door.", "Where can you sometimes find a house's date?", "carved above the door", "under the front lawn", "on the postbox lid"],
    ["Owners add new windows and rooms, so one building can have parts from different dates.", "Why can one building be hard to date?", "it can have parts from different dates", "it is always painted the same colour", "it never has any windows"]],
    order("Order the houses, oldest first.", ["Tudor timber house · 1485–1603", "Georgian house · 1700s", "Victorian terrace · 1837–1901", "Semi-detached house · 1930s"], ["Tudor houses", "Georgian houses", "Victorian terraces", "1930s"]), false),
  detective(["A made-up street is called Tanner's Row.", "The houses are brick terraces with slate roofs.", "A stone above one door says 1887.", "The old tannery on the corner is now flats.", "A blue plaque on one house says a local doctor lived there.", "The plaque does not say what the doctor was like.", "Street names and buildings give clues, but not the whole story."],
    [
    ["What is the street called?", "Tanner's Row", "Mill Lane", "Station Road", "called Tanner's Row"],
    ["What are the roofs made of?", "slate", "thatch", "copper", "slate roofs"],
    ["Which date is on the stone above the door?", "1887", "1687", "1987", "says 1887"],
    ["What is the old tannery now?", "flats", "a castle", "a church", "now flats"],
    ["What does the blue plaque say?", "a local doctor lived there", "a king once visited", "the house was a school", "a local doctor lived there"],
    ["What does the plaque not tell us?", "what the doctor was like", "that the house is old", "that the doctor lived there", "does not say what the doctor was like"],
    ["What do street names and buildings give us?", "clues, but not the whole story", "the whole story, with every detail", "no clues of any kind", "give clues, but not the whole story"]], { picture: "🏘️", pictureLabel: "A made-up old street" }),
  lesson("🧱", "Reading a street", [
    ["A name like Mill Lane suggests a mill once stood nearby.", "What does a name like Mill Lane suggest?", "a mill once stood nearby", "a king once lived there", "a mill is open today"],
    ["But the mill may be long gone, so we must check other evidence.", "Why check other evidence?", "the mill may be long gone", "street names are never real", "the road is always brand new"],
    ["Old mills were often reused as flats or shops when they stopped working.", "What happened to many old mills that stopped working?", "they were reused as flats or shops", "they were sent to other towns", "they were buried in the ground"],
    ["Reuse shows that people keep what is useful.", "What does reuse show about people?", "they keep what is useful", "they throw away every old thing", "they never change a building"],
    ["A building cannot tell us what the people inside thought.", "What can a building not tell us?", "what the people inside thought", "which materials were used", "roughly how old it is"],
    ["Different historians may read the same building in different ways.", "Why might historians disagree about a building?", "they may read it in different ways", "buildings change every night", "they use different calendars"]],
    sort("Clue or not?", ["Clues suggest", "Clues cannot tell"], [["A mill once stood nearby", 0], ["A mill became flats", 0], ["What people inside thought", 1], ["Why the mill closed", 1]], ["mill once stood nearby", "reused as flats", "what the people inside thought"])),
]);
