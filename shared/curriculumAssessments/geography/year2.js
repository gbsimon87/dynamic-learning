// Year 2 Geography knowledge checks. Fieldwork is rehearsed from supplied evidence, not assessed outdoors.
import { defineAssessmentBank } from "../../curriculumJourneyAuthoring.js";
const table = (caption, headings, rows, alt) => ({ renderer: "table", data: { caption, headings, rows }, alt });
const compass = (title, alt) => ({ renderer: "geography", data: { visual: { type: "compass", title, lines: [], alt } }, alt });
const evidence = (title, text) => [{ title, text, credit: "Learn with Bix — authored example evidence" }];
const week = table("A week of weather", ["Weather", "Days"], [["Sunny", 3], ["Rainy", 2], ["Cloudy", 2]], "A table of one week of weather with columns for the kind of weather and the number of days.");
const key = table("Map key", ["Symbol", "Meaning"], [["Blue wavy line", "River"], ["Black dashes", "Path"], ["Green circle", "Tree"]], "A map key with three symbols and their meanings.");

export default defineAssessmentBank({ year: 2, subject: "geography", quests: {
  "world-and-uk-knowledge": {
    "continents-and-oceans-together": { objective: "Names continents and oceans and tells land from water.", items: [
      { q: "Which of these is an ocean?", a: "The Indian Ocean", d: ["Africa", "Europe"], practice: 1,
        why: "The Indian Ocean is water. Africa and Europe are continents." },
      { q: "Sort these into continents and oceans.", sort: { bins: ["Continent", "Ocean"], cards: [["Asia", "Continent"], ["Australia", "Continent"], ["Pacific", "Ocean"], ["Atlantic", "Ocean"]] }, practice: 3,
        why: "Asia and Australia are land. The Pacific and the Atlantic are oceans." },
      { q: "How many continents are there?", n: 7, practice: 1,
        why: "There are seven continents." },
    ] },
    "uk-places-and-landscapes": { objective: "Names UK countries, capital cities, seas and landscape features.", items: [
      { q: "Which is a capital city in the UK?", a: "Edinburgh", d: ["Paris", "Sydney"], practice: 1,
        why: "Edinburgh is the capital of Scotland. Paris and Sydney are not in the UK." },
      { q: "Sort these UK features.", sort: { bins: ["Physical", "Human"], cards: [["Mountain", "Physical"], ["River", "Physical"], ["Bridge", "Human"], ["Railway", "Human"]] }, practice: 3,
        why: "Mountains and rivers are natural. People build bridges and railways." },
      { q: "Which sea lies between Great Britain and Ireland?", a: "The Irish Sea", d: ["The North Sea", "The English Channel"], practice: 1,
        why: "The Irish Sea is between Great Britain and Ireland. The North Sea is to the east." },
    ] },
    "compass-directions-and-routes": { objective: "Uses the four compass points to follow a route.", items: [
      { q: "Which direction is opposite north?", a: "South", d: ["East", "West"], practice: 1,
        why: "North and south are opposites. East and west are opposites too." },
      { q: "Put the four compass points in clockwise order, starting with north.", order: ["North", "East", "South", "West"], practice: 1,
        why: "Going clockwise from north gives east, then south, then west." },
      { q: "You face north and make a quarter turn to the right. Which way do you face now?", a: "East", d: ["West", "South"], practice: 1,
        model: compass("A compass", "A compass showing the four points, with north at the top."),
        why: "A quarter turn to the right from north points you east." },
    ] },
  },
  "weather-and-world-patterns": {
    "weather-records": { objective: "Reads and compares a simple weather record.", items: [
      { q: "How many days were sunny?", n: 3, practice: 3, model: week,
        why: "The record shows 3 sunny days." },
      { q: "Which weather happened most often?", a: "Sunny", d: ["Rainy", "Cloudy"], practice: 3, model: week,
        why: "Sunny has the biggest number, 3, so it happened most often." },
      { q: "A record shows 4 rainy days and 1 sunny day. How many more rainy days than sunny days were there?", n: 3, practice: 3,
        why: "4 - 1 = 3, so there were 3 more rainy days." },
      { q: "Why should you look at the weather at the same time each day?", a: "So the days are easy to compare", d: ["So the weather stays the same", "So you need fewer symbols"], practice: 4,
        why: "Looking at the same time each day makes a fair record you can compare." },
    ] },
    "the-equator-and-the-poles": { objective: "Knows what the Equator and poles are and links them with climate.", items: [
      { q: "Where is the Equator?", a: "A line round the middle of the Earth", d: ["At the very top of the Earth", "At the very bottom of the Earth"], practice: 1,
        why: "The Equator is an imaginary line round the middle of the Earth." },
      { q: "Which place is usually coldest?", a: "The South Pole", d: ["A country on the Equator", "A hot desert"], practice: 3,
        why: "The poles are very cold. Places on the Equator are usually warm." },
      { q: "Sort these clues.", sort: { bins: ["Near the Equator", "Near a pole"], cards: [["Usually warm", "Near the Equator"], ["Warm rainforest", "Near the Equator"], ["Ice and snow all year", "Near a pole"], ["Penguins on the ice", "Near a pole"]] }, practice: 3,
        why: "Places near the Equator are usually warm. Places near the poles are icy." },
    ] },
  },
  "two-small-places": {
    "whitby-by-the-sea": { objective: "Describes Whitby as a seaside town in England using supplied evidence.", items: [
      { q: "Whitby is a small town on the coast of which country?", a: "England", d: ["Wales", "Brunei"], practice: 1,
        why: "Whitby is in North Yorkshire, in England." },
      { q: "Which sea is beside Whitby?", a: "The North Sea", d: ["The Irish Sea", "The English Channel"], practice: 2,
        why: "Whitby is on the east coast of England, beside the North Sea." },
      { q: "Whitby has a harbour. What is a harbour?", a: "A sheltered place for boats beside the sea", d: ["A tall mountain", "A kind of weather"], practice: 4,
        why: "A harbour gives boats shelter. Fishing boats use Whitby harbour." },
    ] },
    "kampong-ayer-by-the-river": { objective: "Describes Kampong Ayer in Brunei using supplied evidence.", items: [
      { q: "Kampong Ayer is a water village in which country?", a: "Brunei", d: ["England", "Scotland"], practice: 2,
        why: "Kampong Ayer is in Brunei, a country in Asia." },
      { q: "Where are many homes at Kampong Ayer built?", a: "On posts above the river", d: ["On top of a mountain", "In a sandy desert"], practice: 1,
        why: "Many homes stand on posts above the Brunei River." },
      { q: "How can people get around Kampong Ayer?", a: "By boat or on wooden walkways", d: ["By underground train", "By cable car only"], practice: 3,
        why: "Walkways join the homes, and boats cross the river." },
    ] },
    "homes-and-journeys-in-two-places": { objective: "Compares homes and journeys using a supplied table.", items: [
      { q: "Which place has homes on posts above water?", a: "Kampong Ayer", d: ["Whitby", "Both places"], practice: 1,
        why: "At Kampong Ayer many homes stand on posts above the river. Whitby's homes are on land." },
      { q: "Sort these journeys.", sort: { bins: ["Whitby", "Kampong Ayer"], cards: [["Walk along a street", "Whitby"], ["Drive along a road", "Whitby"], ["Walk on a wooden walkway over water", "Kampong Ayer"], ["Cross the river by boat", "Kampong Ayer"]] }, practice: 2,
        why: "Streets and roads fit Whitby. Walkways and river boats fit Kampong Ayer." },
      { q: "What is the same about the example journeys in both places?", a: "Each one starts at a home", d: ["Each one uses a boat", "Each one uses a bus"], practice: 2,
        why: "Both example journeys begin at a home and go to a nearby place." },
    ] },
    "comparing-two-small-places": { objective: "Says what is alike and different between Whitby and Kampong Ayer.", items: [
      { q: "What is the same about Whitby and Kampong Ayer?", a: "Both are beside water", d: ["Both have homes on posts", "Both are in Europe"], practice: 3,
        why: "Whitby is beside the sea and Kampong Ayer is beside a river." },
      { q: "Whitby is beside the sea. What is Kampong Ayer beside?", a: "A river", d: ["A desert", "A mountain top"], practice: 1,
        why: "Kampong Ayer is beside the Brunei River." },
      { q: "Sort these into alike or different.", sort: { bins: ["Alike", "Different"], cards: [["Both have boats", "Alike"], ["Both have homes beside water", "Alike"], ["Streets in Whitby, walkways in Kampong Ayer", "Different"], ["One is in England, one is in Brunei", "Different"]] }, practice: 3,
        why: "Boats and homes by water are shared. The routes and the countries are different." },
    ] },
  },
  "making-and-reading-maps": {
    "aerial-views-and-landmarks": { objective: "Understands aerial views and landmarks.", items: [
      { q: "What is a view from above called?", a: "An aerial view", d: ["A side view", "A ground view"], practice: 1,
        why: "An aerial view looks down on a place from above." },
      { q: "What is a landmark?", a: "Something easy to spot that helps you find your way", d: ["A kind of weather", "A map key"], practice: 2,
        why: "Landmarks, like a tall church, help you say where you are." },
      { q: "Which could be a landmark?", a: "A tall clock tower", d: ["A small pebble", "A single blade of grass"], practice: 2,
        why: "A tall clock tower is easy to see from far away." },
    ] },
    "symbols-and-map-keys": { objective: "Reads map symbols using a key.", items: [
      { q: "What does a map key do?", a: "It tells you what the symbols mean", d: ["It shows the weather", "It tells you the time"], practice: 1,
        why: "A key explains each symbol." },
      { q: "Look at the map key. What does the blue wavy line show?", a: "A river", d: ["A path", "A tree"], practice: 3, model: key,
        why: "The key says a blue wavy line is a river." },
      { q: "Bix adds a pond to this map. Which symbol from the key fits a pond best?", a: "Blue wavy lines", d: ["Black dashes", "A green circle"], practice: 4, model: key,
        why: "Blue wavy lines stand for water, and a pond is water. Black dashes mean a path and a green circle means a tree." },
    ] },
    "making-a-simple-map": { objective: "Plans a simple map with sensible symbols and a key.", items: [
      { q: "Put the steps for making a simple map in order.", order: ["Look at the place and choose landmarks", "Draw the landmarks as seen from above", "Add a key to explain the symbols"], practice: 1,
        why: "Choose what to show, draw it from above, then add a key so others can read it." },
      { q: "Why add a key to your map?", a: "So other people can read your symbols", d: ["To make it colourful", "To hide places"], practice: 3,
        why: "A key lets another person understand your map." },
      { q: "On most maps, which compass point is at the top?", a: "North", d: ["South", "West"], practice: 4,
        why: "North is usually at the top of a map." },
    ] },
  },
  "local-fieldwork": {
    "observing-our-school-grounds": { objective: "Rehearses observing and recording from supplied evidence (not an outdoor assessment).", items: [
      { q: "What should we do while we observe?", a: "Look carefully and record what we see", d: ["Guess without looking", "Leave the group"], practice: 1,
        why: "Careful looking and recording give good evidence." },
      { q: "Use the record. How many trees did the class count?", n: 6, practice: 2,
        evidence: evidence("School grounds record", "A class counted 6 trees, 2 benches and 1 pond in the school grounds."),
        why: "The record says 6 trees." },
      { q: "Sort these things in the school grounds.", sort: { bins: ["Natural", "Made by people"], cards: [["Tree", "Natural"], ["Soil", "Natural"], ["Bench", "Made by people"], ["Gate", "Made by people"]] }, practice: 1,
        why: "Trees and soil are natural. People make benches and gates." },
    ] },
    "exploring-our-local-area": { objective: "Rehearses a local walk from supplied pictures and records (not an outdoor assessment).", items: [
      { q: "What is the safe way to explore the local area?", a: "Stay with a grown-up", d: ["Walk off alone", "Cross roads without looking"], practice: 1,
        why: "A grown-up helps keep you safe." },
      { q: "A route goes from the gate to the tree, then on to the shop. Which landmark is in the middle?", a: "The tree", d: ["The gate", "The shop"], practice: 2,
        why: "The route starts at the gate, passes the tree and ends at the shop." },
      { q: "A walk record lists a shop, a park and a school. How many places are on the list?", n: 3, practice: 3,
        why: "There are 3 places: a shop, a park and a school." },
    ] },
  },
} });
