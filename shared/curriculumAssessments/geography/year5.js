// Year 5 Geography knowledge checks. Fieldwork is rehearsed from supplied example data, not assessed outdoors.
import { defineAssessmentBank } from "../../curriculumJourneyAuthoring.js";
const geo = (visual, alt) => ({ renderer: "geography", data: { visual: { lines: [], ...visual, alt } }, alt });
const table = (caption, headings, rows, alt) => ({ renderer: "table", data: { caption, headings, rows }, alt });
const evidence = (title, text) => [{ title, text, credit: "Learn with Bix — authored example evidence" }];
const southAmerica = geo({ type: "map", view: "southAmerica", title: "Map of South America", markers: [{ id: "A", label: "Marker A", point: [-52, -10] }] }, "A map of South America with one marker, A, on one country.");
const coords = (point) => geo({ type: "coordinates", title: "Read point P on a globe grid", point }, "A practice globe grid with latitude labels up the side, longitude labels along the bottom and a point P marked.");
const rain = table("Example rainfall, not a real place", ["Month", "Rainfall (mm)"], [["January", "80"], ["February", "60"], ["March", "40"], ["April", "20"], ["May", "10"], ["June", "5"]], "A table of example rainfall in millimetres for six months, January to June.");
const jobs = table("Example data: a made-up town", ["Type of job", "Jobs per 100 workers"], [["Primary", "6"], ["Secondary", "24"], ["Tertiary", "70"]], "A table of jobs per 100 workers in a made-up town, split into primary, secondary and tertiary.");

export default defineAssessmentBank({ year: 5, subject: "geography", quests: {
  "regions-in-depth": {
    "scotland-and-the-highlands": { objective: "Names Scottish places and links the Highlands to land use.", items: [
      { q: "Which is the largest city in Scotland?", a: "Glasgow", d: ["Edinburgh", "Aberdeen"], practice: 1,
        why: "Glasgow is the largest city. Edinburgh is the capital and Aberdeen is a North Sea port." },
      { q: "Which of these is a long, deep freshwater loch?", a: "Loch Ness", d: ["The Cairngorms", "The Isle of Skye"], practice: 2,
        why: "Loch Ness is a loch. The Cairngorms are mountains and Skye is an island." },
      { q: "Sort these by where they are most typical.", sort: { bins: ["Highlands", "Central Belt"], cards: [["Sheep grazing on hills", "Highlands"], ["Walkers and skiers on mountains", "Highlands"], ["Glasgow and Edinburgh", "Central Belt"], ["Where most Scots live", "Central Belt"]] }, practice: 4,
        why: "The Highlands have hills, mountains and few people. Most Scots live in the lowland Central Belt." },
    ] },
    "andalusia-in-spain": { objective: "Describes Andalusia's places, climate and land use.", items: [
      { q: "What is the capital of Andalusia?", a: "Seville", d: ["Granada", "Malaga"], practice: 1,
        why: "Seville is the capital. Granada is inland and Malaga is a port." },
      { q: "Which narrow sea route lies between Spain and Africa?", a: "The Strait of Gibraltar", d: ["The Suez Canal", "The Panama Canal"], practice: 2,
        why: "The Strait of Gibraltar separates southern Spain from Africa." },
      { q: "Andalusia grows more of which crop than any other region of Spain?", a: "Olives", d: ["Cocoa", "Tea"], practice: 3,
        why: "Andalusia is famous for its olives. Cocoa and tea need different climates." },
    ] },
    "the-amazon-region-of-brazil": { objective: "Locates and describes the Amazon region and the effects of clearing forest.", items: [
      { q: "Which country is marker A on?", a: "Brazil", d: ["Peru", "Colombia"], practice: 1, model: southAmerica,
        why: "Brazil is the largest country in South America and most of the Amazon rainforest lies in it." },
      { q: "Which port is near the mouth of the Amazon River?", a: "Belem", d: ["Manaus", "Sao Paulo"], practice: 2,
        why: "Belem is near the river mouth. Manaus is far inland and Sao Paulo is in the south-east." },
      { q: "Why do boats carry people and goods along rivers in the Amazon region?", a: "Few roads cross the forest", d: ["Rivers flow uphill to the towns", "The forest is easy to drive through"], practice: 4,
        why: "With so few roads, rivers are the main routes between villages." },
    ] },
  },
  "coasts-rivers-and-hazards": {
    "coasts-and-coastal-landforms": { objective: "Names coastal landforms and defences and why cliffs erode at different speeds.", items: [
      { q: "What is a flat rock shelf left at the foot of a wearing-back cliff called?", a: "A wave-cut platform", d: ["A headland", "A groyne"], practice: 1,
        why: "As waves wear the cliff back, a flat rock shelf, the wave-cut platform, is left." },
      { q: "Which defence is a line of low walls built across a beach to hold sand in place?", a: "Groynes", d: ["A sea wall", "Rock armour"], practice: 4,
        why: "Groynes are low walls that trap sand. A sea wall reflects waves and rock armour absorbs them." },
      { q: "Which cliffs wear back faster?", a: "Soft clay cliffs", d: ["Hard chalk cliffs", "They wear back at the same speed"], practice: 4,
        why: "Soft clay wears away quickly on the Holderness coast. Hard chalk wears back slowly." },
    ] },
    "rivers-in-flood": { objective: "Explains what floods are, why they happen and how damage is reduced.", items: [
      { q: "What is the flat land beside a river called?", t: ["floodplain", "a floodplain", "flood plain"], practice: 1,
        why: "The flat land beside a river that can be covered in a flood is its floodplain." },
      { q: "Why does rain run quickly into rivers in a town?", a: "Roofs and roads cannot soak up water", d: ["Towns have deep soil that soaks up rain", "Rain stops falling on towns"], practice: 2,
        why: "Water cannot sink into roofs and roads, so it runs into drains and streams fast." },
      { q: "What does the Thames Barrier help to stop?", a: "High tides flooding London", d: ["Droughts in summer", "Snow melting on hills"], practice: 4,
        why: "Its gates close to keep high tides out of London." },
    ] },
    "living-with-natural-hazards": { objective: "Describes where hazards happen and how people prepare.", items: [
      { q: "Which country lies around the Pacific Ring of Fire?", a: "Japan", d: ["Egypt", "Norway"], practice: 1,
        why: "Japan, Chile and California lie around the Ring of Fire, where many volcanoes and earthquakes happen." },
      { q: "What is a tsunami?", a: "A series of huge sea waves, often caused by an earthquake under the sea", d: ["A strong wind blowing across a desert", "A very heavy rain shower"], practice: 2,
        why: "Tsunamis are huge sea waves, so coastal warnings tell people to move to higher ground." },
      { q: "How are many buildings in Japan made safer in earthquakes?", a: "They are built to sway without falling", d: ["They are built only on river banks", "They are built with no strong walls"], practice: 3,
        why: "Swaying buildings, drills and alerts help to reduce harm." },
    ] },
  },
  "climate-and-environments": {
    "climate-graphs-and-patterns": { objective: "Tells weather from climate and reads a climate table.", items: [
      { q: "Which month in the table is the driest?", a: "June", d: ["January", "April"], practice: 1, model: rain,
        why: "June has the smallest rainfall figure, 5 mm." },
      { q: "How many more millimetres of rain fell in January than in April?", n: 60, unit: "mm", practice: 1, model: rain,
        why: "80 - 20 = 60 millimetres more." },
      { q: "When it is summer in the Northern Hemisphere, what season is it in the Southern Hemisphere?", a: "Winter", d: ["Summer", "Spring"], practice: 2,
        why: "The seasons are opposite because of Earth's tilt." },
      { q: "Climate is...", a: "The typical weather of a place over many years", d: ["The weather outside today", "Tomorrow's weather forecast"], practice: 1,
        why: "Weather changes day to day. Climate is the long-term pattern." },
    ] },
    "biomes-and-sustainability": { objective: "Explains pressures on biomes and compares sustainable choices.", items: [
      { q: "Sort each by whether it releases carbon dioxide.", sort: { bins: ["Releases carbon dioxide", "Does not release carbon dioxide"], cards: [["Burning coal", "Releases carbon dioxide"], ["Burning gas", "Releases carbon dioxide"], ["Wind turbines", "Does not release carbon dioxide"], ["Solar panels", "Does not release carbon dioxide"]] }, practice: 3,
        why: "Burning fossil fuels releases carbon dioxide. Wind and solar power do not when making electricity." },
      { q: "Why do tree roots help when heavy rain falls?", a: "They hold soil in place", d: ["They make the rain fall faster", "They pump water to the sea"], practice: 2,
        why: "Roots hold soil, so less is washed away." },
      { q: "What does sustainable mean?", a: "Meeting needs today without harming the future", d: ["Using as much as possible now", "Never using anything at all"], practice: 4,
        why: "A sustainable choice looks after the future as well as today." },
    ] },
  },
  "resources-trade-and-settlement": {
    "natural-resources-around-the-world": { objective: "Tells finite from renewable resources and links resources to places.", items: [
      { q: "Sort these resources.", sort: { bins: ["Finite", "Renewable"], cards: [["Coal", "Finite"], ["Oil", "Finite"], ["Wind", "Renewable"], ["Sunshine", "Renewable"]] }, practice: 1,
        why: "Coal and oil take millions of years to form. Wind and sunshine are not used up." },
      { q: "Which country makes most of its electricity from hydropower?", a: "Norway", d: ["Saudi Arabia", "Chile"], practice: 2,
        why: "Norway has steep mountains and heavy rain. Saudi Arabia has oil and Chile has copper." },
      { q: "Which country uses hot rock near the surface for geothermal energy?", t: "Iceland", practice: 2,
        why: "Iceland sits on hot rock, so it uses geothermal energy for heating and electricity." },
    ] },
    "trade-links-and-global-connections": { objective: "Uses trade vocabulary and describes trade routes and transport.", items: [
      { q: "What is an export?", a: "Something a country sells to another country", d: ["Something a country buys from another country", "A ship that carries goods"], practice: 1,
        why: "Exports go out of a country. Imports come in." },
      { q: "Which canal joins the Mediterranean Sea and the Red Sea?", a: "The Suez Canal", d: ["The Panama Canal", "The English Channel"], practice: 2,
        why: "The Suez Canal shortens sea trips between Europe and Asia." },
      { q: "Sort each person.", sort: { bins: ["Producer", "Consumer"], cards: [["Cocoa farmer", "Producer"], ["Fisher catching fish", "Producer"], ["Child eating a chocolate bar", "Consumer"], ["Family buying bread", "Consumer"]] }, practice: 1,
        why: "Producers make or grow goods. Consumers buy and use them." },
    ] },
    "settlement-growth-and-change": { objective: "Explains why settlements began, their sizes and how they change.", items: [
      { q: "Which was a good reason to settle in a place?", a: "Fresh water nearby", d: ["Far from any water", "Only steep bare rock"], practice: 1,
        why: "Early settlers wanted water, flat land and materials for building." },
      { q: "Put these in order from smallest to largest.", order: ["Hamlet", "Village", "Town", "City"], practice: 1,
        why: "A hamlet has a few homes. Each step up is larger." },
      { q: "What is brownfield land?", a: "Land that was used before, for example by an old factory", d: ["Land that has never been built on", "A ring of land round a city"], practice: 3,
        why: "Greenfield land has never been built on. A green belt is the ring of land round a city." },
    ] },
    "economic-activity-and-jobs": { objective: "Sorts jobs into primary, secondary and tertiary and reads jobs data.", items: [
      { q: "Sort these jobs.", sort: { bins: ["Primary", "Secondary", "Tertiary"], cards: [["Farmer", "Primary"], ["Miner", "Primary"], ["Car factory worker", "Secondary"], ["Baker", "Secondary"], ["Nurse", "Tertiary"], ["Bank worker", "Tertiary"]] }, practice: 1,
        why: "Primary jobs take things from the land. Secondary jobs make things. Tertiary jobs give services." },
      { q: "Per 100 workers, how many more have tertiary jobs than primary jobs?", n: 64, practice: 2, model: jobs,
        why: "70 - 6 = 64 more tertiary jobs per 100 workers." },
      { q: "The last deep coal mine in the UK closed in which year?", n: 2015, practice: 3,
        why: "The last deep coal mine closed in 2015. Most people now work in services." },
    ] },
  },
  "coordinates-time-and-maps": {
    "latitude-and-longitude-in-practice": { objective: "Reads latitude and longitude and uses the Prime Meridian.", items: [
      { q: "What is point P's latitude?", a: "20° north", d: ["20° south", "40° north"], practice: 2, model: coords([-40, 20]),
        why: "Latitude is read up the side. P is 20° north of the Equator." },
      { q: "What is point P's longitude?", a: "20° east", d: ["20° west", "40° east"], practice: 2, model: coords([20, -40]),
        why: "Longitude is read along the bottom. P is 20° east of the Prime Meridian." },
      { q: "In a position such as 51°N, 0°, which number is written first?", say: "In a position such as 51 degrees north, 0 degrees, which number is written first?", a: "Latitude", d: ["Longitude", "The height above the sea"], practice: 1,
        why: "Latitude comes first, then longitude." },
    ] },
    "time-zones-and-journeys": { objective: "Explains time zones and works out local arrival times from supplied offsets.", items: [
      { q: "How many degrees of longitude does Earth turn each hour?", n: 15, practice: 1,
        why: "Earth turns 360 degrees in 24 hours. 360 ÷ 24 = 15." },
      { q: "When you travel east, local time is...", a: "Later", d: ["Earlier", "The same"], practice: 1,
        why: "Going east, the Sun rises sooner, so local time is later." },
      { q: "A flight leaves London at 10:00 London time and lasts 8 hours. What is the local time in New York when it lands?", a: "13:00", d: ["18:00", "23:00"], practice: 3,
        evidence: evidence("Example offsets", "London is UTC+0. New York is UTC−5. The flight leaves London at 10:00 and takes 8 hours."),
        why: "It lands at 18:00 UTC. New York is 5 hours behind, so the local time is 13:00." },
      { q: "You cross the International Date Line going west. What happens to the date?", a: "It moves forward one day", d: ["It goes back one day", "It stays the same"], practice: 4,
        why: "Going west across the line, the calendar date moves forward one day." },
    ] },
    "contours-scale-and-os-maps": { objective: "Reads contour lines and map scale.", items: [
      { q: "What colour are contour lines on Ordnance Survey maps?", a: "Brown", d: ["Blue", "Black"], practice: 1,
        why: "Brown lines join places at the same height. Blue shows water." },
      { q: "What do contour lines very close together show?", a: "A steep slope", d: ["A flat area", "A river"], practice: 2,
        why: "Height changes quickly over a short distance on a steep slope." },
      { q: "On a 1:50 000 map, 1 cm is 500 metres. How many kilometres is 6 cm?", say: "On a one to fifty thousand map, 1 centimetre is 500 metres. How many kilometres is 6 centimetres?", n: 3, unit: "km", practice: 4,
        why: "6 × 500 m = 3000 m, which is 3 km." },
    ] },
    "designing-a-fieldwork-enquiry": { objective: "Rehearses planning an enquiry from supplied examples (not outdoor fieldwork).", items: [
      { q: "What is a hypothesis?", a: "A prediction you can test", d: ["A result you have already collected", "The key on a map"], practice: 1,
        why: "A hypothesis is a prediction, such as the river will be wider at Site 3." },
      { q: "Sort these data.", sort: { bins: ["Primary data", "Secondary data"], cards: [["Cars you counted yourself", "Primary data"], ["River widths you measured", "Primary data"], ["Rainfall figures from a website", "Secondary data"], ["A map from a book", "Secondary data"]] }, practice: 1,
        why: "Primary data is collected by you. Secondary data comes from books, maps or websites." },
      { q: "Which graph best shows how a river's depth changed day by day over one week?", a: "A line graph", d: ["A sketch map", "A tally chart"], practice: 3,
        why: "A line graph shows how something changes over time." },
    ] },
  },
} });
