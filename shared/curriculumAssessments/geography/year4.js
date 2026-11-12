// Year 4 Geography knowledge checks. Fieldwork is rehearsed from supplied evidence, not assessed outdoors.
import { defineAssessmentBank } from "../../curriculumJourneyAuthoring.js";
const geo = (visual, alt) => ({ renderer: "geography", data: { visual: { lines: [], ...visual, alt } }, alt });
const table = (caption, headings, rows, alt) => ({ renderer: "table", data: { caption, headings, rows }, alt });
const evidence = (title, text) => [{ title, text, credit: "Learn with Bix — authored example evidence" }];
const map = (view, title, markers, alt) => geo({ type: "map", view, title, markers }, alt);
const naMap = map("northAmerica", "North America", [{ id: "A", label: "Marker A", point: [-106, 56] }, { id: "B", label: "Marker B", point: [-98, 39] }, { id: "C", label: "Marker C", point: [-102, 23.5] }], "A map of North America with three markers, A, B and C, each on a different country.");
const saMap = map("southAmerica", "South America", [{ id: "A", label: "Marker A", point: [-52, -10] }, { id: "B", label: "Marker B", point: [-75, -10] }, { id: "C", label: "Marker C", point: [-71, -33] }], "A map of South America with three markers, A, B and C, each on a different country.");
const waMap = map("washington", "Washington State", [{ id: "A", label: "Marker A", point: [-122.33, 47.61] }, { id: "B", label: "Marker B", point: [-117.43, 47.66] }, { id: "C", label: "Marker C", point: [-122.9, 47.04] }], "A map of Washington State with three markers, A, B and C, each on a different city.");
const waPort = map("washington", "Washington State", [{ id: "A", label: "Marker A", point: [-122.33, 47.61] }, { id: "B", label: "Marker B", point: [-117.43, 47.66] }, { id: "C", label: "Marker C", point: [-120.5, 46.6] }], "A map of Washington State with three markers, A, B and C, each on a different city.");
const ukMap = map("uk", "United Kingdom", [{ id: "A", label: "Marker A", point: [-3.1, 54.5] }], "A map of the United Kingdom with one marker, A.");
const grid = (point) => geo({ type: "grid", title: "Practice grid", origin: [23, 41], size: 3, tenths: true, markers: [{ id: "T", label: "Marker T", point }] },
  "A practice grid with numbered lines and thin lines that split each square into tenths. Eastings run along the bottom from 23 to 26 and northings up the side from 41 to 44. Marker T is inside one square. North is up.");
const zones = table("Example times, 14 January", ["City", "Hours ahead of London"], [["London", "0"], ["Cairo", "+2"], ["Tokyo", "+9"], ["New York", "-5"]],
  "A table of example time differences from London: London 0, Cairo plus 2, Tokyo plus 9 and New York minus 5.");
const regions = table("Three regions", ["Region", "Country"], [["Washington State", "USA"], ["Campania", "Italy"], ["Lake District", "England"]],
  "A table of three regions and their countries.");

export default defineAssessmentBank({ year: 4, subject: "geography", quests: {
  "north-and-south-america": {
    "north-american-countries-and-cities": { objective: "Locates North American countries and cities.", items: [
      { q: "Which marker is on the country that lies north of the USA?", a: "Marker A", d: ["Marker B", "Marker C"], practice: 1, model: naMap,
        why: "Canada is north of the USA. Marker B is the USA and Marker C is Mexico." },
      { q: "Which country is an island in the Caribbean?", a: "Cuba", d: ["Mexico", "Canada"], practice: 1,
        why: "Cuba is an island country. Mexico and Canada are on the mainland." },
      { q: "Sort these names.", sort: { bins: ["A country", "A continent"], cards: [["Canada", "A country"], ["Mexico", "A country"], ["North America", "A continent"], ["South America", "A continent"]] }, practice: 4,
        why: "Canada and Mexico are countries. North America and South America are continents." },
      { q: "Ottawa is the capital city of which country?", a: "Canada", d: ["The USA", "Mexico"], practice: 2,
        why: "Ottawa is in Canada. Washington DC is in the USA." },
    ] },
    "south-american-countries-and-cities": { objective: "Locates South American countries and cities.", items: [
      { q: "Which marker is on the long, narrow country along the Pacific coast?", a: "Marker C", d: ["Marker A", "Marker B"], practice: 1, model: saMap,
        why: "Chile is long and narrow and touches the Pacific Ocean." },
      { q: "Buenos Aires is the capital city of which country?", a: "Argentina", d: ["Peru", "Chile"], practice: 2,
        why: "Buenos Aires is in Argentina." },
      { q: "Brasilia is the capital city of which country?", a: "Brazil", d: ["Peru", "Chile"], practice: 2,
        why: "Brasilia is the capital of Brazil, the largest country in South America." },
      { q: "Which long mountain range runs down the west of South America?", a: "The Andes", d: ["The Pampas", "The Rocky Mountains"], practice: 2,
        why: "The Andes are in South America. The Pampas are grassland and the Rockies are in North America." },
    ] },
    "washington-state": { objective: "Describes Washington State's location, cities and land.", items: [
      { q: "Which marker is on the east side of the Cascade Range?", a: "Marker B", d: ["Marker A", "Marker C"], practice: 2, model: waMap,
        why: "Spokane is east of the Cascade Range. Seattle and Olympia are on the west side." },
      { q: "What is the capital of Washington State?", a: "Olympia", d: ["Seattle", "Washington DC"], practice: 1,
        why: "Olympia is the state capital. Seattle is the largest city and Washington DC is far away on the east coast." },
      { q: "Which ocean lies along the west of Washington State?", a: "The Pacific Ocean", d: ["The Atlantic Ocean", "The Indian Ocean"], practice: 1,
        why: "Washington State is in the north-west USA beside the Pacific Ocean." },
      { q: "Which part of Washington State is much drier?", a: "East of the Cascade Range", d: ["West of the Cascade Range", "Along the Pacific coast"], practice: 4,
        why: "The mountains block much of the rain, so the land to the east is drier." },
    ] },
  },
  "climate-and-the-globe": {
    "climate-zones": { objective: "Tells weather from climate and names the tropical, dry, temperate and polar zones.", items: [
      { q: "Which describes climate rather than weather?", a: "The usual weather of a place over many years", d: ["Rain falling this morning", "Tomorrow's forecast"], practice: 1,
        why: "Weather is the air at one time. Climate is the usual weather, averaged over many years." },
      { q: "Which climate zone is warm in every month and found near the Equator?", a: "Tropical", d: ["Polar", "Temperate"], practice: 2,
        why: "Tropical places are warm all year. Polar places are cold all year." },
      { q: "Sort these descriptions by climate zone.", sort: { bins: ["Tropical", "Dry", "Polar"], cards: [["Warm every month", "Tropical"], ["Near the Equator", "Tropical"], ["Almost no rain", "Dry"], ["Cold all year", "Polar"], ["Near the poles", "Polar"]] }, practice: 2,
        why: "Tropical places are near the Equator and warm. Dry places get almost no rain. Polar places are near the poles and cold." },
      { q: "Which zone has a mild climate, not very hot and not very cold?", a: "Temperate", d: ["Tropical", "Polar"], practice: 2,
        why: "Temperate places, such as the UK, have mild weather for much of the year." },
      { q: "Quito and Manaus are both near the Equator, but Quito is much cooler. Why?", a: "Quito is much higher above sea level", d: ["Quito is in the polar zone", "Quito gets much less sunshine than anywhere else"], practice: 4,
        why: "Air gets cooler with height, so a mountain city near the Equator can be cool." },
    ] },
    "biomes-and-vegetation-belts": { objective: "Matches biomes to their plants and climate.", items: [
      { q: "Which biome has vines, palms and orchids?", a: "Tropical rainforest", d: ["Tundra", "Desert"], practice: 1,
        why: "Hot, wet rainforests grow vines, palms and orchids." },
      { q: "Sort these biomes by trees.", sort: { bins: ["Many trees", "Few or no trees"], cards: [["Tropical rainforest", "Many trees"], ["Boreal forest", "Many trees"], ["Tundra", "Few or no trees"], ["Desert", "Few or no trees"]] }, practice: 1,
        why: "Forests have many trees. Tundra and desert have few or none." },
      { q: "A place has very little rain in every month. Which biome fits best?", a: "Desert", d: ["Tropical rainforest", "Boreal forest"], practice: 3,
        why: "Very little rain fits desert plants such as small bushes. Forests need much more rain." },
      { q: "Which biome in the far north has mosses, sedges and lichens but few trees?", t: ["tundra", "the tundra"], practice: 1,
        why: "Tundra is very cold, so trees cannot grow well there." },
    ] },
    "day-night-and-time-zones": { objective: "Explains day and night and reads simple time-zone differences.", items: [
      { q: "Why do we have day and night?", a: "Earth turns, so each place faces the Sun and then away", d: ["The Sun travels round Earth each day", "Earth moves closer to the Sun and then further away each day"], practice: 1,
        why: "Earth spins once a day. The side facing the Sun has day and the other side has night." },
      { q: "It is 12:00 noon in London. What time is it in Tokyo?", a: "21:00", d: ["03:00", "09:00"], practice: 3, model: zones,
        why: "Tokyo is 9 hours ahead of London, so 12:00 plus 9 hours is 21:00." },
      { q: "It is 12:00 noon in London. What time is it in New York?", a: "07:00", d: ["17:00", "12:00"], practice: 3, model: zones,
        why: "New York is 5 hours behind London, so 12:00 minus 5 hours is 07:00." },
      { q: "In which direction does the Sun appear to rise?", a: "East", d: ["West", "South"], practice: 1,
        why: "The Sun appears to rise in the east and set in the west because Earth turns." },
    ] },
  },
  "rivers-and-changing-landscapes": {
    "river-journeys": { objective: "Uses river words and describes erosion and deposition.", items: [
      { q: "Where does a river begin?", a: "At its source", d: ["At its mouth", "At a tributary"], practice: 1,
        why: "The source is where a river begins. The mouth is where it ends." },
      { q: "Put a river's journey in order.", order: ["Source in the hills", "Flows downhill", "Joined by a tributary", "Mouth at the sea"], practice: 2,
        why: "A river starts in the hills, flows downhill, collects tributaries and ends at its mouth." },
      { q: "What is a tributary?", a: "A smaller river that joins a bigger one", d: ["The place where a river meets the sea", "Mud and sand dropped by a river"], practice: 1,
        why: "A tributary flows into a bigger river." },
      { q: "When slow water drops mud and sand, what is this called?", t: ["deposition"], practice: 3,
        why: "Dropping sediment is deposition. Wearing rock away is erosion." },
    ] },
    "rivers-and-people": { objective: "Describes how people use rivers and flood land.", items: [
      { q: "What does irrigation mean?", a: "Watering crops", d: ["Making electricity", "Carrying boats"], practice: 1,
        why: "Irrigation brings river water to crops." },
      { q: "Dams on rivers can make which kind of power?", a: "Hydroelectric power", d: ["Wind power", "Coal power"], practice: 1,
        why: "Water held by a dam turns machines that make hydroelectric power." },
      { q: "What is flat land beside a river, which can flood after heavy rain, called?", a: "A floodplain", d: ["A source", "A mouth"], practice: 1,
        why: "A floodplain is flat land beside a river." },
      { q: "Upstream means nearer to the river's...", a: "Source", d: ["Mouth", "Sea"], practice: 2,
        why: "Upstream is towards the source. Downstream is towards the mouth." },
    ] },
    "changing-uk-landscapes": { objective: "Compares dated evidence and tells human from physical change.", items: [
      { q: "Sort these changes.", sort: { bins: ["Human change", "Physical change"], cards: [["Farmland became homes", "Human change"], ["A factory was built on a meadow", "Human change"], ["Waves wore a beach back", "Physical change"], ["A river moved its channel", "Physical change"]] }, practice: 4,
        why: "People cause building changes. Waves and rivers are natural forces." },
      { q: "Which is an observation you can see by comparing two dated grids?", a: "One square changed from farmland to homes", d: ["The council wanted more homes", "Families needed somewhere to live"], practice: 3,
        why: "An observation is what you can see. The other two are possible reasons." },
      { q: "Which can change a coast over many years?", a: "Waves wearing the land away", d: ["Planting a garden", "Painting a beach hut"], practice: 3,
        why: "Waves erode the coast." },
    ] },
  },
  "settlements-and-resources": {
    "settlements-and-land-use": { objective: "Describes settlement types, patterns and reasons for settling.", items: [
      { q: "Put these settlements in order from smallest to largest.", order: ["Village", "Town", "City"], practice: 1,
        why: "A village is small, a town is larger and a city is larger again." },
      { q: "Homes gathered tightly round one point form which pattern?", a: "Nucleated", d: ["Linear", "Dispersed"], practice: 1,
        why: "Nucleated homes cluster together. Linear homes follow a road and dispersed homes are spread out." },
      { q: "Which marker is a seaport on Puget Sound?", a: "Marker A", d: ["Marker B", "Marker C"], practice: 3, model: waPort,
        why: "Seattle is a seaport. Spokane and Yakima are inland." },
      { q: "Why did people often settle near water?", a: "For drinking water and routes for boats", d: ["To be as far from farms as possible", "To avoid any route"], practice: 4,
        why: "Water is needed to drink and to farm, and boats can carry goods." },
    ] },
    "food-and-trade-links": { objective: "Follows food journeys and explains trade.", items: [
      { q: "What is trade?", a: "Buying and selling goods between places", d: ["Growing food at home", "Measuring rainfall"], practice: 1,
        why: "Trade moves goods from where they are made to where they are wanted." },
      { q: "Put a food journey in order.", order: ["Grown on a farm", "Packed", "Taken to a port", "Shipped overseas"], practice: 2,
        why: "Food is grown, packed, taken to a port and then shipped." },
      { q: "Apples grown in Yakima are shipped abroad. Which place is a seaport?", a: "Seattle", d: ["Yakima", "Spokane"], practice: 2,
        why: "Seattle is a seaport. Yakima has orchards and Spokane is inland." },
    ] },
    "energy-minerals-and-water": { objective: "Names energy sources, minerals and water supplies.", items: [
      { q: "Sort these energy sources.", sort: { bins: ["Renewable", "Fossil fuel"], cards: [["Wind", "Renewable"], ["Sunshine", "Renewable"], ["Coal", "Fossil fuel"], ["Oil", "Fossil fuel"]] }, practice: 1,
        why: "Wind and sunshine will not run out. Coal and oil are fossil fuels." },
      { q: "Which of these is a mineral dug from the ground?", a: "Iron ore", d: ["Wind", "Rain"], practice: 1,
        why: "Iron ore is a mineral. Wind and rain are not." },
      { q: "Where does much of a town's drinking water come from before it is cleaned?", a: "Rivers and reservoirs", d: ["Coal mines", "Wind turbines"], practice: 2,
        why: "Water is collected from rivers and reservoirs and then cleaned." },
    ] },
    "comparing-three-regions": { objective: "Compares Washington State, Campania and the Lake District.", items: [
      { q: "Sort these places.", sort: { bins: ["Washington State", "Campania", "Lake District"], cards: [["Cascade Range", "Washington State"], ["Vesuvius", "Campania"], ["Scafell Pike", "Lake District"], ["Seattle seaport", "Washington State"]] }, practice: 2,
        why: "Seattle and the Cascade Range are in Washington State. Vesuvius is in Campania and Scafell Pike is in the Lake District." },
      { q: "Use the table. Which region is in the USA?", a: "Washington State", d: ["Campania", "Lake District"], practice: 1, model: regions,
        why: "Washington State is in the north-west USA." },
      { q: "Seattle and Spokane are both in Washington State, but their weather records are very different. What does this show?", a: "Weather can vary a lot inside one region", d: ["Spokane is in a different country", "Every region has the same weather everywhere"], practice: 3,
        why: "A large region can have wetter and drier, warmer and colder places, so one record cannot describe it all." },
    ] },
  },
  "mapping-and-fieldwork-enquiries": {
    "six-figure-grid-references": { objective: "Reads six-figure grid references, eastings first.", items: [
      { q: "Which six-figure reference matches marker T?", a: "233416", d: ["236413", "416233"], practice: 3, model: grid([23.3, 41.6]),
        why: "Eastings first: 23 and 3 tenths is 233. Then northings: 41 and 6 tenths is 416. The reference is 233416." },
      { q: "Which six-figure reference matches marker T?", a: "247422", d: ["242427", "2442"], practice: 3, model: grid([24.7, 42.2]),
        why: "Eastings first: 24 and 7 tenths is 247. Then northings: 42 and 2 tenths is 422. The reference is 247422." },
      { q: "In the reference 233416, which digits are the tenths?", a: "The 3rd and 6th digits", d: ["The 1st and 4th digits", "The first two digits"], practice: 2,
        why: "Each half has a square number and then a tenths digit: 23|3 and 41|6." },
    ] },
    "maps-atlases-and-digital-mapping": { objective: "Uses directions on a plan, atlas indexes and digital zoom.", items: [
      { q: "On a plan with north at the top, the bridge is directly to the right of the windmill. Which direction is the bridge from the windmill?", a: "East", d: ["West", "North"], practice: 2,
        why: "With north at the top, east is to the right." },
      { q: "Which part of an atlas lists places with where to find them?", a: "The index", d: ["The title page", "The glossary"], practice: 1,
        why: "The index lists place names and where they are." },
      { q: "You want to see more detail around marker A on a digital map. What should you do?", a: "Zoom in", d: ["Zoom out", "Turn off the key"], practice: 3, model: ukMap,
        why: "Zooming in shows a smaller area in more detail." },
    ] },
    "local-fieldwork-enquiry": { objective: "Rehearses planning and reading fieldwork from supplied evidence (not an outdoor enquiry).", items: [
      { q: "Put these fieldwork steps in order.", order: ["Ask a question", "Collect evidence", "Record it in a table", "Describe what it shows"], practice: 1,
        why: "Start with a question, then gather and record evidence before describing it." },
      { q: "Which is a good fieldwork question?", a: "How wide are the paths at two sites?", d: ["What is the best colour?", "Do you like walking?"], practice: 1,
        why: "A good question can be answered by measuring or counting." },
      { q: "How many more trees were counted at site A than at site B?", n: 5, practice: 3,
        evidence: evidence("Tree tally", "A class counted 9 trees at site A and 4 trees at site B."),
        why: "9 - 4 = 5 more trees at site A." },
      { q: "Where should fieldwork be done?", a: "With a grown-up in a suitable place", d: ["Alone beside a busy road", "Anywhere, without telling anyone"], practice: 1,
        why: "Stay safe by going with a grown-up in a suitable place." },
    ] },
  },
} });
