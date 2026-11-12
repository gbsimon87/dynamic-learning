// Year 1 Geography knowledge checks. Pictures are original practice drawings.
import { defineAssessmentBank } from "../../curriculumJourneyAuthoring.js";
const uk = (title, markers, alt) => ({ renderer: "geography", data: { visual: { type: "y1", art: "uk", title, names: false, markers, lines: [], alt } }, alt });
const pictures = (title, items, alt) => ({ renderer: "pictures", data: { title, items: items.map(([icon, label]) => ({ icon, label })) }, alt });

export default defineAssessmentBank({ year: 1, subject: "geography", quests: {
  "our-place": {
    "around-our-school": { objective: "Names common school-ground features and describes position and safe observation.", items: [
      { q: "Which words tell us where something is?", a: "Next to, behind, in front of", d: ["Loud, soft, quiet", "Red, blue, green"], practice: 2,
        why: "Position words say where things are. Next to, behind and in front of all do this." },
      { q: "Put these steps for exploring our school grounds in order.", order: ["Go outside with a grown-up", "Look carefully", "Draw what you saw"], practice: 4,
        why: "First we go out safely with a grown-up, then we look, then we draw what we saw." },
      { q: "We explore the school grounds. What is the safest way?", a: "Stay with a grown-up and look carefully", d: ["Run off on our own", "Close our eyes and walk"], practice: 4,
        why: "Staying with a grown-up keeps us safe, and looking carefully helps us notice things." },
    ] },
    "human-and-physical-features": { objective: "Sorts simple human and physical features.", items: [
      { q: "Sort these features.", sort: { bins: ["Made by people", "Made by nature"], cards: [["House", "Made by people"], ["Road", "Made by people"], ["Hill", "Made by nature"], ["River", "Made by nature"]] }, practice: 3,
        why: "People build houses and roads. Hills and rivers are made by nature." },
      { q: "Which is a human feature?", a: "A bridge", d: ["A mountain", "A beach"], practice: 3,
        why: "People build bridges. Mountains and beaches are physical features." },
      { q: "A hill is a ... feature. Which word fits: physical or human?", t: "physical", practice: 3,
        why: "A hill is made by nature, so it is a physical feature." },
    ] },
    "maps-from-above": { objective: "Understands that a map shows a place from above using symbols.", items: [
      { q: "A map shows a place from where?", a: "From above", d: ["From the side", "From underneath"], practice: 3,
        why: "A map is like looking down on a place from high up." },
      { q: "Why do maps use small pictures called symbols?", a: "They stand for real things", d: ["They make the map bigger", "They hide the places"], practice: 4,
        why: "A symbol is a small picture that stands for something real, such as a tree." },
      { q: "Which view shows the tops of buildings?", a: "A view from above", d: ["A view from the ground", "A view from inside a shop"], practice: 2,
        why: "From above, you can see the roofs and tops of things." },
    ] },
  },
  "the-united-kingdom": {
    "four-countries-of-the-uk": { objective: "Names the four UK countries and finds them on a simple map.", items: [
      { q: "How many countries are in the United Kingdom?", n: 4, practice: 1,
        why: "The four countries are England, Scotland, Wales and Northern Ireland." },
      { q: "Which country is marked with the letter A?", a: "Scotland", d: ["Wales", "England"], practice: 2,
        model: uk("UK map without names", [{ id: "A", label: "A", point: [-4.6, 56.55] }], "A map of the United Kingdom with no country names. The letter A marks one of the countries."),
        why: "The marker is in the north of Great Britain. That country is Scotland." },
      { q: "Which of these is NOT a country in the UK?", a: "France", d: ["Wales", "England"], practice: 1,
        why: "France is a different country. Wales and England are in the UK." },
    ] },
    "uk-capital-cities": { objective: "Matches UK countries with their capital cities.", items: [
      { q: "Which city is the capital of Wales?", a: "Cardiff", d: ["Edinburgh", "Belfast"], practice: 1,
        why: "Cardiff is the capital city of Wales." },
      { q: "Belfast is the capital of which country?", a: "Northern Ireland", d: ["Scotland", "England"], practice: 3,
        why: "Belfast is the capital city of Northern Ireland." },
      { q: "What is the capital city of Scotland?", t: "Edinburgh", practice: 1,
        why: "Edinburgh is the capital of Scotland." },
    ] },
    "seas-around-the-uk": { objective: "Names seas around the UK and tells land from water.", items: [
      { q: "Which water is on the east side of the UK?", a: "North Sea", d: ["Irish Sea", "Atlantic Ocean"], practice: 3,
        why: "The North Sea is on the east side of Great Britain." },
      { q: "Which water is between England and France?", a: "English Channel", d: ["North Sea", "Irish Sea"], practice: 3,
        why: "The English Channel lies between southern England and France." },
      { q: "Where does land meet the sea?", a: "The coast", d: ["A forest", "A mountain top"], practice: 1,
        why: "The place where land meets sea is called the coast." },
    ] },
  },
  "the-wider-world": {
    "seven-continents": { objective: "Knows there are seven continents and names some.", items: [
      { q: "How many continents are there in the world?", n: 7, practice: 1,
        why: "There are seven continents: Africa, Antarctica, Asia, Australia, Europe, North America and South America." },
      { q: "Which of these is a continent?", a: "Africa", d: ["Atlantic", "Paris"], practice: 2,
        why: "Africa is a continent. The Atlantic is an ocean and Paris is a city." },
      { q: "Penguins live in the icy continent at the very south of the world. What is it called?", t: "Antarctica", practice: 1,
        why: "Antarctica is the icy continent around the South Pole." },
    ] },
    "five-oceans": { objective: "Knows there are five oceans and names some.", items: [
      { q: "How many oceans are there?", n: 5, practice: 1,
        why: "The five oceans are the Pacific, Atlantic, Indian, Southern and Arctic." },
      { q: "Which is an ocean?", a: "The Pacific", d: ["Asia", "Cardiff"], practice: 2,
        why: "The Pacific is an ocean. Asia is a continent and Cardiff is a city." },
      { q: "Sort these into land or water.", sort: { bins: ["Land", "Water"], cards: [["Europe", "Land"], ["Africa", "Land"], ["Atlantic Ocean", "Water"], ["Indian Ocean", "Water"]] }, practice: 3,
        why: "Europe and Africa are continents, which are land. The Atlantic and Indian are oceans, which are water." },
    ] },
    "hot-and-cold-places": { objective: "Links the Equator with warm places and the poles with cold places.", items: [
      { q: "Places near the Equator are usually...", a: "Warm", d: ["Very icy", "Always snowy"], practice: 2,
        why: "The Equator is around the middle of the Earth, where it is usually warm." },
      { q: "Which place is usually very cold?", a: "The North Pole", d: ["A hot desert", "A rainforest by the Equator"], practice: 4,
        why: "The poles are at the top and bottom of the Earth, where it is very cold." },
      { q: "Sort these places.", sort: { bins: ["Usually warm", "Usually cold"], cards: [["Near the Equator", "Usually warm"], ["Hot desert", "Usually warm"], ["North Pole", "Usually cold"], ["South Pole", "Usually cold"]] }, practice: 3,
        why: "Places near the Equator are warm. The poles are cold." },
    ] },
  },
  "weather-and-exploring": {
    "daily-weather": { objective: "Names common kinds of weather and connects them to clothes.", items: [
      { q: "What would you most likely wear on a rainy day?", a: "A coat and boots", d: ["A sun hat and sunglasses", "A swimming costume"], practice: 4,
        why: "A coat and boots keep you dry in the rain." },
      { q: "Which weather has lots of water falling from clouds?", a: "Rain", d: ["Sun", "Wind"], practice: 1,
        why: "Rain is water falling from clouds." },
      { q: "Sort these weather words.", sort: { bins: ["Wet weather", "Dry weather"], cards: [["Rain", "Wet weather"], ["Snow", "Wet weather"], ["Sunshine", "Dry weather"], ["Clear blue sky", "Dry weather"]] }, practice: 3,
        why: "Rain and snow bring water. Sunshine and a clear blue sky mean dry weather." },
    ] },
    "seasons-in-the-uk": { objective: "Names the four seasons in order and notes UK weather patterns.", items: [
      { q: "Put the seasons in order, starting with spring.", order: ["Spring", "Summer", "Autumn", "Winter"], practice: 2,
        why: "The seasons go spring, summer, autumn, winter, then spring again." },
      { q: "In which season do many trees lose their leaves?", a: "Autumn", d: ["Spring", "Summer"], practice: 1,
        why: "Leaves change colour and fall from many trees in autumn." },
      { q: "In the UK, which season is usually the warmest?", a: "Summer", d: ["Winter", "Autumn"], practice: 3,
        why: "Summer is usually the warmest season in the UK." },
    ] },
    "routes-and-simple-maps": { objective: "Follows and describes a route using left, right and forwards.", items: [
      { q: "Which direction word is the opposite of left?", a: "Right", d: ["Forwards", "Under"], practice: 1,
        why: "Left and right are opposite turns." },
      { q: "Put the route in order. Start at the school gate.", order: ["Leave the school gate", "Walk forwards to the corner", "Turn left at the corner", "Arrive at the park"], practice: 2,
        why: "A route is a list of steps in the right order." },
      { q: "Which word tells you to keep going straight ahead?", a: "Forwards", d: ["Left", "Right"], practice: 2,
        model: pictures("Route words", [["⬅️", "Left"], ["➡️", "Right"], ["⬆️", "Forwards"]], "Three arrows labelled left, right and forwards."),
        why: "Forwards means keep going straight ahead." },
    ] },
  },
} });
