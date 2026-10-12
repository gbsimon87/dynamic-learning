import { lesson as l, sort as s, order as o, topic } from "./authoring.js";
export const gettingAboutThenAndNow = topic([
  "https://www.railwaymuseum.org.uk/objects-and-stories — steam and electric trains.",
  "https://www.ltmuseum.co.uk/collections — transport and living memory.",
], [
  l(["Grandparents used buses, bikes, cars and planes.", "Some remember riding steam trains.", "Today, many trains use electricity.", "Electric cars are more common now.", "Bikes and buses still carry people."], "🚂", "a steam train", [
    ["Which did grandparents use?", "buses and bikes", "only horses", "only electric cars", "used buses, bikes"],
    ["Which train might a grandparent remember?", "a steam train", "a toy rocket", "a sailing boat", "riding steam trains"],
    ["What powers many trains today?", "electricity", "wind-up keys", "pedals", "trains use electricity"],
    ["Which cars are more common now?", "electric cars", "cars pulled by horses", "steam-only cars", "Electric cars are more common"],
    ["Which older vehicle is still used?", "a bike", "no older vehicles", "only steam trains", "Bikes and buses still carry"],
    ["What do bikes and buses carry?", "people", "only letters", "only coal", "carry people"],
  ], s("Which can be used then and now?", ["Then and now", "Not a real journey"], [["bus", 0], ["bike", 0], ["plane", 0], ["a flying carpet", 1]], ["buses, bikes, cars and planes"])),
  l(["First came steam trains, long ago.", "Later, electric trains carried people too.", "Today, electric cars are becoming more common.", "Grandparents also had cars, bikes, buses and planes."], "🚆", "a train", [
    ["Which train came first?", "steam trains", "electric trains", "both at once", "First came steam trains"],
    ["Which train came later?", "electric trains", "the first steam trains", "a train with pedals", "Later, electric trains"],
    ["Which cars are becoming more common today?", "electric cars", "horse-drawn cars", "wooden toy cars", "electric cars are becoming more common"],
    ["Did planes exist when grandparents were young?", "yes, grandparents had planes", "no planes existed", "only toy planes existed", "Grandparents also had",],
    ["Which word means earlier?", "first", "later", "after", "First",],
    ["What did electric trains carry?", "people", "only toys", "only horses", "carried people"],
  ], o("Put these developments in Bix's order.", ["steam trains arrive", "electric trains arrive", "electric cars become more common today"], ["First", "Later", "Today"])),
  l(["An old photo can show a steam train.", "Smoke above it is a clue.", "A photo cannot tell us how it sounded.", "A grown-up might remember a train journey.", "Their memory is another source."], "📷", "a camera", [
    ["Which source might show a steam train?", "an old photo", "a blank sheet", "tomorrow's timetable", "old photo can show a steam train"],
    ["Which visible clue does Bix name?", "smoke", "a video screen", "a pair of pedals", "Smoke above it"],
    ["What cannot a silent photo tell us?", "how the train sounded", "what it shows", "that smoke is visible", "cannot tell us how it sounded"],
    ["Who might remember a train journey?", "a grown-up", "a station sign", "a blank ticket", "A grown-up might remember"],
    ["What is a grown-up's memory?", "another source", "a photo", "a steam engine", "memory is another source"],
    ["Which source could help with a train's sound?", "a sound recording", "a silent photo", "a drawn map", "cannot tell us how it sounded"],
    ["Which question asks about the past?", "What was your train journey like?", "What will tomorrow look like?", "Where is my pencil now?", "remember a train journey"],
  ]),
  l(["Steam trains burn fuel to heat water.", "Many modern trains use electricity.", "Both carry people along tracks.", "Bikes, buses and planes existed in grandparents' time too.", "Travel changes, but people still need journeys."], "🚲", "a bicycle", [
    ["What do steam trains heat?", "water", "ice cream", "sand only", "heat water"],
    ["What powers many modern trains?", "electricity", "pedals", "a wind-up key", "use electricity"],
    ["What do both kinds of train use?", "tracks", "only roads", "only sea lanes", "along tracks"],
    ["What is the same about both trains?", "they carry people", "they both use only electricity", "they have no tracks", "Both carry people"],
    ["Which existed in grandparents' time?", "planes", "no buses", "no bikes", "planes existed in grandparents' time"],
    ["Why does travel still matter?", "people need journeys", "nobody travels", "all travel has stopped", "people still need journeys"],
  ], s("Sort the train clues.", ["Steam", "Electric"], [["heats water", 0], ["burns fuel to heat water", 0], ["uses electricity", 1], ["electric power", 1]], ["Steam trains burn fuel to heat water", "modern trains use electricity"])),
]);
