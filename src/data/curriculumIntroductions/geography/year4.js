// Year 4 Geography purpose screens. Maps reuse the app's geography visuals; other ideas use pictures, tables and steps.
import { defineIntroductions } from "../../../../shared/curriculumJourneyAuthoring.js";
const geo = (visual, alt) => ({ renderer: "geography", data: { visual: { lines: [], ...visual, alt } }, alt });
const table = (caption, headings, rows, alt) => ({ renderer: "table", data: { caption, headings, rows }, alt });
const steps = (title, list, alt) => ({ renderer: "lesson", data: { type: "steps", title, steps: list }, alt });
const pics = (title, items, alt) => ({ renderer: "pictures", data: { title, items: items.map(([icon, label]) => ({ icon, label })) }, alt });
const I = (title, learn, use, ex, model) => ({ title, learn, use, ex, model });
const mk = (id, label, point) => ({ id, label, point });
const map = (view, title, markers, alt, extra = {}) => geo({ type: "map", view, title, markers, ...extra }, alt);
const grid = (title) => geo({ type: "grid", title, origin: [23, 41], size: 3, tenths: true, markers: [mk("T", "Tree marker", [24.3, 42.6])] },
  "A practice grid with numbered lines and thin lines that split each square into tenths. Eastings run along the bottom from 23 to 26 and northings up the side from 41 to 44. A tree marker is inside one square.");
const naMap = map("northAmerica", "North America", [mk("A", "Ottawa", [-75.7, 45.42]), mk("B", "Mexico City", [-99.13, 19.43]), mk("C", "Havana", [-82.38, 23.13])], "A map of North America with markers on Ottawa in Canada, Mexico City in Mexico and Havana in Cuba.");
const americas = map("world", "The Americas", [mk("A", "Ottawa", [-75.7, 45.42]), mk("B", "Lima", [-77.04, -12.05])], "A world map with markers on Ottawa in Canada, North America, and Lima in Peru, South America.");
const saMap = map("southAmerica", "South America", [mk("A", "Lima", [-77.04, -12.05]), mk("B", "Buenos Aires", [-58.38, -34.6])], "A map of South America with markers on Lima in Peru and Buenos Aires in Argentina.");
const waMap = map("washington", "Washington State", [mk("A", "Seattle", [-122.33, 47.61]), mk("B", "Spokane", [-117.43, 47.66])], "A map of Washington State with markers on Seattle and Spokane.");

export default defineIntroductions({ year: 4, subject: "geography",
  subjectIntro: I("Welcome to Year 4 Geography", ["Travel from rivers to rainforests.", "Connect places, climates and the resources people use."],
    "Geography helps you understand why places are different and how people live in them. These skills help when you read a map, plan a trip or follow news from far away.",
    "A farmer in one country grows food that is eaten in another.",
    pics("Year 4 geography", [["🌎", "The Americas"], ["🌦️", "Climate"], ["🏞️", "Rivers"], ["🏘️", "Settlements"], ["🗺️", "Maps"]], "Five pictures: the Americas, climate, rivers, settlements and maps.")),
  quests: {
    "north-and-south-america": {
      intro: I("North and South America", ["Find countries and cities in the Americas.", "Explore Washington State."],
        "Knowing where places are helps you follow journeys and news stories.", "Ottawa is the capital of Canada and Lima is the capital of Peru.", americas),
      topics: {
        "north-american-countries-and-cities": I("North American countries and cities", ["Find Canada, the USA, Mexico and Cuba.", "Match cities to their countries."],
          "Maps of North America help you say exactly where a place is.", "Ottawa is the capital of Canada. Havana is the capital of Cuba.", naMap),
        "south-american-countries-and-cities": I("South American countries and cities", ["Find Brazil, Peru, Chile and Argentina.", "Match cities to their countries."],
          "Maps of South America help you plan a journey and understand the news.", "Lima is a city in Peru. Buenos Aires is a city in Argentina.", saMap),
        "washington-state": I("Washington State", ["Find Washington State in the USA.", "Learn about its cities and mountains."],
          "A close look at one region shows how land and weather shape a place.", "Seattle is the largest city in Washington State.", waMap),
      },
    },
    "climate-and-the-globe": {
      intro: I("Climate and the globe", ["Learn about climate zones and biomes.", "Explore day, night and time zones."],
        "Climate helps explain what plants grow and how people live. Time zones help you know when to call a friend far away.",
        "When it is day in London, it can be night in Tokyo.",
        pics("Climate zones", [["🌴", "Tropical"], ["🏜️", "Dry"], ["🍂", "Temperate"], ["❄️", "Polar"]], "Four pictures: tropical, dry, temperate and polar climate zones.")),
      topics: {
        "climate-zones": I("Climate zones", ["Tell weather from climate.", "Learn the tropical, dry, temperate and polar zones."],
          "Climate zones help you guess the usual weather in a place you have not visited.", "Places near the Equator are usually warm all year. High mountains can be cooler.",
          pics("Climate zones", [["🌴", "Tropical: warm every month"], ["🏜️", "Dry: almost no rain"], ["🍂", "Temperate: mild"], ["❄️", "Polar: cold all year"]], "Four pictures: tropical is warm every month, dry has almost no rain, temperate is mild and polar is cold all year.")),
        "biomes-and-vegetation-belts": I("Biomes and vegetation belts", ["A biome is a community of plants and animals.", "Climate helps decide which plants grow."],
          "Biomes explain why a rainforest looks so different from a desert.", "Tundra has mosses and lichens but few trees.",
          pics("Biomes", [["🌴", "Rainforest"], ["🌵", "Desert"], ["🌾", "Grassland"], ["🌲", "Boreal forest"], ["🏔️", "Tundra"]], "Five pictures of biomes: rainforest, desert, grassland, boreal forest and tundra.")),
        "day-night-and-time-zones": I("Day, night and time zones", ["Earth turns, so we get day and night.", "Places in different time zones have different local times."],
          "Time zones help you plan a video call with someone far away.", "When it is noon in London it is evening in Tokyo.",
          table("Example times", ["City", "Hours from London"], [["London", "0"], ["Cairo", "+2"], ["Tokyo", "+9"]], "A table of example time differences from London: London 0, Cairo plus 2 and Tokyo plus 9.")),
      },
    },
    "rivers-and-changing-landscapes": {
      intro: I("Rivers and changing landscapes", ["Follow a river from source to mouth.", "See how people use rivers and how landscapes change."],
        "Rivers give us water, power and travel routes, and they shape the land.", "A river can begin in hills and end at the sea.",
        steps("A river's journey", ["The source begins in the hills.", "The river flows downhill.", "Tributaries join it.", "The mouth meets the sea."], "Four steps of a river's journey: the source in the hills, flowing downhill, tributaries joining, and the mouth at the sea.")),
      topics: {
        "river-journeys": I("River journeys", ["Learn source, tributary, channel and mouth.", "Learn how rivers wear away and drop material."],
          "These words let you describe any river on a map.", "A tributary is a smaller river that joins a bigger one.",
          steps("A river's journey", ["Source", "Tributary joins", "Channel widens", "Mouth"], "Four stages along a river: source, a tributary joins, the channel widens and the mouth.")),
        "rivers-and-people": I("Rivers and people", ["See how people use rivers.", "Learn about floodplains and dams."],
          "Knowing how rivers are used helps people share water and stay safe from floods.", "Farmers use river water to irrigate crops.",
          pics("Using rivers", [["🚰", "Drinking water"], ["🌾", "Irrigation"], ["🚢", "Transport"], ["⚡", "Hydroelectric power"]], "Four pictures of river uses: drinking water, irrigation, transport and hydroelectric power.")),
        "changing-uk-landscapes": I("Changing UK landscapes", ["Compare places at two dates.", "Tell human change from physical change."],
          "Comparing then and now helps people plan for homes, farms and the coast.", "Waves can wear a beach back over many years.",
          table("A place at two dates", ["Square", "Earlier", "Later"], [["Top left", "Farmland", "Homes"], ["Bottom right", "Beach", "Beach"]], "A table comparing two squares at two dates: top left changes from farmland to homes and bottom right stays beach.")),
      },
    },
    "settlements-and-resources": {
      intro: I("Settlements and resources", ["Learn why people settle where they do.", "Follow food, energy and water, and compare three regions."],
        "Where we live depends on land, water and the things we can use.", "A port town can send goods across the sea.",
        pics("Settlements and resources", [["🏘️", "Settlements"], ["🍎", "Food"], ["⚡", "Energy"], ["🚰", "Water"]], "Four pictures: settlements, food, energy and water.")),
      topics: {
        "settlements-and-land-use": I("Settlements and land use", ["Learn village, town and city.", "Find why people settled in a place."],
          "These ideas explain why some places grow into big cities.", "Seattle has a seaport where ships load and unload.", waMap),
        "food-and-trade-links": I("Food and trade links", ["Follow food from farm to shop.", "Learn how trade links places."],
          "Trade explains how food grown far away can reach your plate.", "Apples grown in Washington State can be shipped abroad.",
          steps("A food journey", ["Grown on a farm.", "Packed.", "Taken to a port.", "Shipped overseas."], "Four steps of a food journey: grown on a farm, packed, taken to a port and shipped overseas.")),
        "energy-minerals-and-water": I("Energy, minerals and water", ["Learn renewable and fossil fuel energy.", "Learn where water and minerals come from."],
          "People need energy, water and materials every day.", "Wind turbines make electricity from moving air.",
          pics("Resources", [["💨", "Wind"], ["⛏️", "Minerals"], ["🛢️", "Oil"], ["🚰", "Water"]], "Four pictures of resources: wind, minerals, oil and water.")),
        "comparing-three-regions": I("Comparing three regions", ["Compare Washington State, Campania and the Lake District.", "Say what is alike and different."],
          "Comparing helps you explain why places are not the same.", "Campania has a volcano. The Lake District has lakes.",
          table("Three regions", ["Region", "Country"], [["Washington State", "USA"], ["Campania", "Italy"], ["Lake District", "England"]], "A table of three regions and their countries: Washington State in the USA, Campania in Italy and the Lake District in England.")),
      },
    },
    "mapping-and-fieldwork-enquiries": {
      intro: I("Mapping and fieldwork", ["Use six-figure grid references.", "Use atlases, digital maps and fieldwork plans."],
        "These skills help you find places exactly and answer questions with evidence.", "A six-figure reference can pinpoint a tree on a map.", grid("A grid")),
      topics: {
        "six-figure-grid-references": I("Six-figure grid references", ["Split each square into tenths.", "Write eastings first, then northings."],
          "A six-figure reference is exact enough to find a footpath or a tree.", "Along first, then up: eastings before northings.", grid("A practice grid")),
        "maps-atlases-and-digital-mapping": I("Maps, atlases and digital maps", ["Use a map key, an atlas index and zoom.", "Choose the right map for a job."],
          "The right map helps you find a place or plan a route.", "Zooming in on a digital map shows more detail.",
          map("uk", "United Kingdom", [mk("A", "Lake District", [-3.1, 54.5])], "A map of the United Kingdom with a marker on the Lake District.")),
        "local-fieldwork-enquiry": I("Local fieldwork enquiry", ["Plan a question and collect evidence.", "Record and describe what you find."],
          "Fieldwork lets you answer questions about places with real evidence.", "A tally can count trees at two sites.",
          steps("A fieldwork enquiry", ["Ask a question.", "Collect evidence safely.", "Record it in a table.", "Describe what it shows."], "Four steps of a fieldwork enquiry: ask a question, collect evidence safely, record it in a table and describe what it shows.")),
      },
    },
  } });
