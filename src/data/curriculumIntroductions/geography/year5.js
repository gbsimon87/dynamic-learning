// Year 5 Geography purpose screens. Maps reuse the app's geography visuals; other ideas use tables, pictures and steps.
import { defineIntroductions } from "../../../../shared/curriculumJourneyAuthoring.js";
const geo = (visual, alt) => ({ renderer: "geography", data: { visual: { lines: [], ...visual, alt } }, alt });
const table = (caption, headings, rows, alt) => ({ renderer: "table", data: { caption, headings, rows }, alt });
const pics = (title, items, alt) => ({ renderer: "pictures", data: { title, items }, alt });
const steps = (title, list, alt) => ({ renderer: "lesson", data: { type: "steps", title, steps: list }, alt });
const I = (title, learn, use, ex, model) => ({ title, learn, use, ex, model });
const mk = (id, label, point) => ({ id, label, point });
const map = (view, title, markers, alt, extra = {}) => geo({ type: "map", view, title, markers, ...extra }, alt);
const globe = geo({ type: "globe", title: "Lines on a globe", referenceLines: [{ label: "Equator", lat: 0 }, { label: "Tropic of Cancer", lat: 23.5 }, { label: "Tropic of Capricorn", lat: -23.5 }] },
  "A globe with three lines of latitude: the Tropic of Cancer, the Equator and the Tropic of Capricorn.");

export default defineIntroductions({ year: 5, subject: "geography",
  subjectIntro: I("Welcome to Year 5 Geography", ["Compare regions from Scotland to the Amazon.", "Study coasts, rivers, climate, trade and maps."],
    "Geography helps you understand the news, plan a journey and see why people live and work as they do. It also helps you make fair choices about the places we all share.",
    "A cocoa bean can grow in Ghana, cross the sea by ship and end up in a chocolate bar in a UK shop.",
    map("world", "Places in Year 5", [mk("A", "Scotland", [-4.2, 57]), mk("B", "Andalusia", [-4.5, 37.5]), mk("C", "Amazon region", [-62, -4])], "A world map with markers on Scotland, Andalusia in Spain and the Amazon region of Brazil.")),
  quests: {
    "regions-in-depth": {
      intro: I("Regions in depth", ["Study Scotland and the Highlands, Andalusia and the Amazon region.", "Compare places by their land, climate and work."],
        "Looking closely at a region helps you see why people live there and how they earn a living. Comparing regions shows what is alike and what is different.",
        "The Highlands are cool and wet with mountains. Andalusia is hot and dry in summer.",
        table("Two regions", ["Feature", "Highlands", "Andalusia"], [["Country", "Scotland", "Spain"], ["Summer", "Cool and often wet", "Hot and dry"]], "A table comparing the Highlands in Scotland with Andalusia in Spain. In summer the Highlands are cool and often wet, and Andalusia is hot and dry.")),
      topics: {
        "scotland-and-the-highlands": I("Scotland and the Highlands", ["Name Scottish cities, mountains and lochs.", "Link the land to farming, power and tourism."],
          "Knowing a region helps you read a map of the UK and understand why few people live in the mountains.", "Ben Nevis is the highest mountain in the UK.",
          map("uk", "Scotland", [mk("A", "Edinburgh", [-3.19, 55.95]), mk("B", "Glasgow", [-4.25, 55.86]), mk("C", "Inverness", [-4.22, 57.48])], "A map of the UK with markers on Edinburgh, Glasgow and Inverness in Scotland.")),
        "andalusia-in-spain": I("Andalusia in Spain", ["Find the main cities, mountains and river.", "Learn how heat and dry summers shape life."],
          "Andalusia is a favourite place for holidays, and its farms send olives and vegetables to other countries.", "Seville is the capital of Andalusia.",
          map("europe", "Southern Spain", [mk("A", "Seville", [-5.98, 37.39]), mk("B", "Granada", [-3.6, 37.18]), mk("C", "Malaga", [-4.42, 36.72])], "A map of Europe with markers on Seville, Granada and Malaga in southern Spain.")),
        "the-amazon-region-of-brazil": I("The Amazon region of Brazil", ["Follow the Amazon River across the rainforest.", "Weigh up the benefits and costs of clearing forest."],
          "The Amazon rainforest is home to huge numbers of living things and affects the air and rain far away.", "Manaus is a big city deep in the rainforest.",
          map("southAmerica", "Brazil", [mk("A", "Manaus", [-60.02, -3.12]), mk("B", "Belem", [-48.5, -1.46]), mk("C", "Brasilia", [-47.93, -15.78])], "A map of South America with markers on Manaus, Belem and Brasilia in Brazil.")),
      },
    },
    "coasts-rivers-and-hazards": {
      intro: I("Coasts, rivers and hazards", ["Learn how waves shape coasts.", "Learn why rivers flood and how people live with hazards."],
        "Many people live beside the sea or a river. Knowing how they change helps people build safely and stay safe.",
        "Waves can wear away a cliff over many years.",
        pics("Natural features", [{ icon: "🌊", label: "Waves" }, { icon: "🏞️", label: "River" }, { icon: "🌋", label: "Volcano" }], "Three pictures: waves, a river and a volcano.")),
      topics: {
        "coasts-and-coastal-landforms": I("Coasts and coastal landforms", ["Name cliffs, headlands and bays.", "Learn how people defend the coast."],
          "Coasts change all the time. Knowing how helps people decide which homes and roads to protect.", "Soft clay cliffs wear back faster than hard chalk cliffs.",
          pics("Coast words", [{ icon: "🪨", label: "Cliff" }, { icon: "🏖️", label: "Bay" }, { icon: "🌊", label: "Waves" }], "Three pictures with labels: a cliff, a bay and waves.")),
        "rivers-in-flood": I("Rivers in flood", ["Find out why rivers rise and spill.", "Read a river depth chart."],
          "Flood warnings help people move belongings and stay safe. Floods can also leave rich soil for farming.", "The Thames Barrier closes to stop high tides flooding London.",
          steps("How a flood happens", ["Heavy rain falls.", "Soaked ground cannot hold more.", "Water runs into the river.", "The river spills over its banks."], "Four steps of a flood: heavy rain falls, soaked ground cannot hold more, water runs into the river and the river spills over its banks.")),
        "living-with-natural-hazards": I("Living with natural hazards", ["Learn where volcanoes and earthquakes happen.", "See how people prepare and stay safe."],
          "Millions of people live near hazards. Warnings, strong buildings and good plans can save lives.", "In Japan many buildings are built to sway in an earthquake.",
          map("world", "Hazard places", [mk("A", "Japan", [138, 36]), mk("B", "Iceland", [-19, 65]), mk("C", "Chile", [-71, -33])], "A world map with markers on Japan, Iceland and Chile, three places where earthquakes or volcanoes happen.")),
      },
    },
    "climate-and-environments": {
      intro: I("Climate and environments", ["Read climate tables and graphs.", "Learn about biomes and sustainable choices."],
        "Climate tells you what to pack for a trip and where crops can grow. Sustainable choices help us look after places for the future.",
        "Rainforests are hot and wet. Deserts are very dry.",
        pics("Biomes", [{ icon: "🌴", label: "Rainforest" }, { icon: "🏜️", label: "Desert" }, { icon: "❄️", label: "Tundra" }], "Three pictures with labels: rainforest, desert and tundra.")),
      topics: {
        "climate-graphs-and-patterns": I("Climate graphs and patterns", ["Tell weather from climate.", "Read temperature and rainfall month by month."],
          "A climate table helps you choose the best time to visit a place.", "Climate is the typical weather of a place over many years.",
          table("Example climate data", ["Month", "Rainfall (mm)"], [["January", "80"], ["April", "20"]], "An example table of rainfall in millimetres: January 80 and April 20.")),
        "biomes-and-sustainability": I("Biomes and sustainability", ["See what puts pressure on biomes.", "Weigh up sustainable choices."],
          "Trees, soil and clean air matter to everyone. Sustainable choices meet today's needs without harming the future.", "Wind and solar power do not release carbon dioxide.",
          table("Two choices", ["Choice", "Benefit"], [["Wind power", "No carbon dioxide released"], ["Protect a forest", "Keeps wildlife homes"]], "A table with two choices and a benefit for each: wind power releases no carbon dioxide, and protecting a forest keeps wildlife homes.")),
      },
    },
    "resources-trade-and-settlement": {
      intro: I("Resources, trade and settlement", ["Find where resources come from.", "See how trade, towns and jobs link people."],
        "Almost everything you use came from somewhere. Learning how places are linked helps you make good choices as a shopper and a citizen.",
        "Copper from Chile may end up in electric wires.",
        pics("Linked places", [{ icon: "⛏️", label: "Mine" }, { icon: "🚢", label: "Ship" }, { icon: "🏘️", label: "Town" }], "Three pictures: a mine, a ship and a town.")),
      topics: {
        "natural-resources-around-the-world": I("Natural resources around the world", ["Tell finite from renewable resources.", "Link resources to places."],
          "Resources are not spread evenly, so countries trade and try to use them wisely.", "Norway makes most of its electricity from water power.",
          table("Resources and places", ["Resource", "Place"], [["Oil", "Saudi Arabia"], ["Copper", "Chile"], ["Hydropower", "Norway"]], "A table matching oil with Saudi Arabia, copper with Chile and hydropower with Norway.")),
        "trade-links-and-global-connections": I("Trade links and global connections", ["Learn imports, exports and ports.", "Follow a product on its journey."],
          "Trade links explain how food, clothes and toys reach UK shops from all over the world.", "Cocoa grown in Ghana is shipped to UK ports.",
          map("world", "A cocoa journey", [mk("A", "Ghana", [-1, 8]), mk("B", "UK", [-2, 54])], "A world map with markers on Ghana in West Africa and the UK.")),
        "settlement-growth-and-change": I("Settlement growth and change", ["See why people settled where they did.", "Learn how places grow and change."],
          "Understanding why towns grow helps people plan new homes, roads and green spaces.", "A river crossing was a good place for a market.",
          steps("Settlement sizes", ["Hamlet", "Village", "Town", "City"], "Four settlement sizes from smallest to largest: hamlet, village, town and city.")),
        "economic-activity-and-jobs": I("Economic activity and jobs", ["Sort jobs into primary, secondary and tertiary.", "See why jobs change over time."],
          "Jobs shape how towns look and how people live. Knowing why jobs change helps people plan for the future.", "Teaching and nursing are tertiary jobs.",
          table("Types of job", ["Type", "Example"], [["Primary", "Farming"], ["Secondary", "Making cars"], ["Tertiary", "Teaching"]], "A table of job types with an example for each: primary farming, secondary making cars and tertiary teaching.")),
      },
    },
    "coordinates-time-and-maps": {
      intro: I("Coordinates, time and maps", ["Use latitude, longitude and time zones.", "Read contours, scale and plan a fieldwork enquiry."],
        "Maps and coordinates help you find places and plan journeys. Fieldwork helps you answer your own questions about a place.",
        "Greenwich in London is at 0 degrees longitude.",
        globe),
      topics: {
        "latitude-and-longitude-in-practice": I("Latitude and longitude in practice", ["Give a place as latitude then longitude.", "Know the Prime Meridian."],
          "Map apps and ships use latitude and longitude to name an exact spot.", "London is about 51°N, 0°.",
          geo({ type: "coordinates", title: "A coordinates grid", point: [20, 20] }, "A practice globe grid with labelled latitude and longitude lines and a point marked P.")),
        "time-zones-and-journeys": I("Time zones and journeys", ["Learn why places have different times.", "Work out local arrival times."],
          "Time zones help you plan a call to a friend abroad or work out when a flight lands.", "When it is 10:00 in London it is 05:00 in New York in January.",
          table("Example times", ["City", "UTC offset"], [["London", "UTC+0"], ["Cairo", "UTC+2"], ["Tokyo", "UTC+9"]], "A table of example offsets from UTC: London plus 0, Cairo plus 2 and Tokyo plus 9.")),
        "contours-scale-and-os-maps": I("Contours, scale and OS maps", ["Read contour lines and scale.", "Use Ordnance Survey maps."],
          "Walkers use contour lines to see how steep a hill is, and scale to work out how far to go.", "On a 1:25 000 map, 4 cm is 1 km on the ground.",
          geo({ type: "grid", title: "A map grid", origin: [23, 41], size: 3, markers: [mk("T", "Tree marker", [24.5, 42.5])] }, "A map grid with numbered lines and a tree marker inside one square.")),
        "designing-a-fieldwork-enquiry": I("Designing a fieldwork enquiry", ["Ask a question and make a prediction.", "Plan how to collect and show data."],
          "Fieldwork lets you find answers yourself, such as whether a river gets wider downstream.", "A hypothesis could be: the river is wider at Site 3 than at Site 1.",
          steps("An enquiry", ["Ask a question.", "Make a prediction.", "Collect data safely.", "Show and explain results."], "Four steps of an enquiry: ask a question, make a prediction, collect data safely, then show and explain results.")),
      },
    },
  } });
