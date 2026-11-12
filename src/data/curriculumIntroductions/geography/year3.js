// Year 3 Geography purpose screens. Maps and diagrams reuse the app's geography visuals; photos are the bundled credited images.
import { defineIntroductions } from "../../../../shared/curriculumJourneyAuthoring.js";
const geo = (visual, alt) => ({ renderer: "geography", data: { visual: { lines: [], ...visual, alt } }, alt });
const table = (caption, headings, rows, alt) => ({ renderer: "table", data: { caption, headings, rows }, alt });
const steps = (title, list, alt) => ({ renderer: "lesson", data: { type: "steps", title, steps: list }, alt });
const chart = (title, unit, bars, alt) => ({ renderer: "bar-chart", data: { title, unit, step: 1, bars: bars.map(([label, value]) => ({ label, value })) }, alt });
const I = (title, learn, use, ex, model) => ({ title, learn, use, ex, model });
const mk = (id, label, point) => ({ id, label, point });
const map = (view, title, markers, alt, extra = {}) => geo({ type: "map", view, title, markers, ...extra }, alt);
const globeLines = geo({ type: "globe", title: "Lines on a globe", referenceLines: [
  { label: "Arctic Circle", lat: 66.5 }, { label: "Tropic of Cancer", lat: 23.5 }, { label: "Equator", lat: 0 }, { label: "Tropic of Capricorn", lat: -23.5 }, { label: "Antarctic Circle", lat: -66.5 }] },
"A globe with five lines of latitude, from north to south: the Arctic Circle, the Tropic of Cancer, the Equator, the Tropic of Capricorn and the Antarctic Circle.");
const grid = (title) => geo({ type: "grid", title, origin: [23, 41], size: 3, markers: [mk("T", "Tree marker", [24.5, 42.5])] },
  "A practice grid with numbered lines. Eastings run along the bottom from 23 to 26 and northings up the side from 41 to 44. A tree marker is inside one square.");

export default defineIntroductions({ year: 3, subject: "geography",
  subjectIntro: I("Welcome to Year 3 Geography", ["Explore the UK and Europe, lines around the globe and the forces that shape land.", "Use maps, grid references and evidence."],
    "Geography helps you read maps, understand why places are different and explain things like volcanoes, mountains and rain. These skills help when you travel, read the news or plan a journey.",
    "Latitude and longitude lines help describe where any place is on Earth.",
    globeLines),
  quests: {
    "the-uk-and-europe": {
      intro: I("The UK and Europe", ["Learn about counties, cities, regions and landscapes.", "Locate chosen places in Europe and Russia."],
        "Knowing the places around us helps us follow journeys and news stories.",
        "Paris is the capital of France and Rome is the capital of Italy.",
        map("europe", "Europe", [mk("A", "Paris", [2.35, 48.86]), mk("B", "Rome", [12.5, 41.9])], "A map of Europe with markers on Paris and Rome.")),
      topics: {
        "counties-cities-and-regions": I("Counties, cities and regions", ["Use the words county, city and region.", "Find places on a UK map."],
          "These words help you say exactly where a place is.", "Manchester is a city in north-west England.",
          map("uk", "UK cities", [mk("A", "London", [-0.12, 51.51]), mk("B", "Manchester", [-2.24, 53.48]), mk("C", "Edinburgh", [-3.19, 55.95])], "A UK map with markers on London, Manchester and Edinburgh.")),
        "uk-landscapes-and-land-use": I("Landscapes and land use", ["Name UK hills, mountains and rivers.", "See how land is used."],
          "Land is used for farms, homes, forests and more. Knowing this explains why a place looks the way it does.", "The Pennines are hills where many sheep graze.",
          table("Land use", ["Land use", "Example"], [["Farming", "Sheep in a field"], ["Housing", "A street of homes"], ["Leisure", "A park"]], "A table of three land uses with examples: farming such as sheep in a field, housing such as a street of homes, and leisure such as a park.")),
        "europe-and-russia": I("Europe and Russia", ["Locate some European countries.", "Learn that Russia is in Europe and Asia."],
          "Maps of Europe help you plan a trip and understand news about neighbours.", "Moscow, the capital of Russia, is in the European part of the country.",
          map("europe", "European countries", [mk("A", "France", [2.2, 46.6]), mk("B", "Germany", [10.4, 51]), mk("C", "Italy", [12.5, 43])], "A map of Europe with markers on France, Germany and Italy.")),
      },
    },
    "lines-on-the-globe": {
      intro: I("Imaginary lines on Earth", ["Learn the Equator and hemispheres.", "Use latitude and longitude."],
        "These lines help pilots, sailors and map apps say exactly where a place is.",
        "The Equator is at 0° latitude.",
        globeLines),
      topics: {
        "the-equator-and-hemispheres": I("The Equator and hemispheres", ["The Equator splits Earth into north and south.", "The Prime Meridian splits it into east and west."],
          "Hemispheres help you say which half of the world a place is in.", "The Equator crosses Ecuador and Brazil.",
          map("world", "The Equator", [mk("A", "Ecuador", [-78.5, 0]), mk("B", "Brazil", [-52, -10])], "A world map with the Equator line and markers on Ecuador and Brazil.", { equator: true })),
        "tropics-and-polar-circles": I("Tropics and polar circles", ["Learn the Tropics of Cancer and Capricorn.", "Learn the Arctic and Antarctic Circles."],
          "These lines are used to describe the world's climate zones.", "The tropics lie about 23.5° north and south of the Equator.",
          globeLines),
        "latitude-and-longitude": I("Latitude and longitude", ["Latitude shows north or south.", "Longitude shows east or west."],
          "Together they can describe any place on Earth.", "A point can be 20° north and 40° east.",
          geo({ type: "coordinates", title: "A coordinates grid", point: [20, 20] }, "A practice globe grid with labelled latitude and longitude lines and a point marked P.")),
      },
    },
    "physical-processes": {
      intro: I("Forces that shape the land", ["Learn about mountains, valleys and volcanoes.", "Learn about earthquakes and the water cycle."],
        "Understanding these helps people stay safe and explains why land and weather change.",
        "Rain can fill a river that carves a valley.",
        geo({ type: "mountain", title: "Mountain, valley and hill" }, "A diagram of a tall mountain, a valley and a lower hill.")),
      topics: {
        "mountains-and-valleys": I("Mountains and valleys", ["Tell mountains, hills and valleys apart.", "See how steep and gentle land is used."],
          "Knowing the shape of the land helps you read maps and plan walks.", "A river often flows along the bottom of a valley.",
          geo({ type: "mountain", title: "Mountain, valley and hill" }, "A diagram of a tall mountain with steep slopes, a valley and a lower hill with gentler slopes.")),
        "volcanoes": I("Volcanoes", ["Learn how a volcano erupts.", "Know where some famous volcanoes are."],
          "Knowing about volcanoes helps people living near them stay safe.", "Mount Vesuvius is a volcano near Naples in Italy.",
          geo({ type: "volcano", title: "A volcano" }, "A cutaway diagram of a volcano showing magma below ground, the vent, the crater and lava flowing out.")),
        "earthquakes": I("Earthquakes", ["The Earth's crust is made of plates.", "Plates moving can cause shaking."],
          "Understanding earthquakes helps people design safer buildings.", "Earthquakes often happen along a fault.",
          geo({ type: "fault", title: "A fault" }, "A diagram of two blocks of crust meeting at a fault, with arrows showing the blocks moving in opposite directions.")),
        "the-water-cycle": I("The water cycle", ["Water moves between sea, air and land.", "Learn evaporation, condensation and precipitation."],
          "The water cycle gives us the rain that fills rivers and reservoirs.", "The Sun warms sea water and some of it rises as vapour.",
          steps("The water cycle", ["Water evaporates.", "Water vapour condenses into clouds.", "Rain falls.", "Water collects in rivers and seas."], "Four steps of the water cycle: evaporation, condensation into clouds, rain falling, then collection in rivers and seas.")),
      },
    },
    "two-european-regions": {
      intro: I("Two European regions", ["Visit the Lake District in England.", "Visit Campania in Italy."],
        "Comparing two regions shows how landscape, weather and work can differ across Europe.",
        "The Lake District has mountains and lakes. Campania has a volcano and a warm coast.",
        geo({ type: "photo", title: "Sheep in the Lake District", image: "lake-sheep" }, "A photograph of sheep in a grassy Lake District field, with stone farm buildings below a steep mountain slope.")),
      topics: {
        "the-lake-district": I("The Lake District", ["It is a hilly area in Cumbria, England.", "It has lakes, mountains and farms."],
          "It shows how landscape affects farming and tourism.", "Scafell Pike is the highest mountain in England.",
          map("lake", "Lake District", [mk("A", "Keswick", [-3.13, 54.6]), mk("B", "Windermere", [-2.95, 54.35]), mk("C", "Scafell Pike", [-3.21, 54.45])], "A map of the Lake District National Park with markers on Keswick, Windermere and Scafell Pike.")),
        "campania": I("Campania", ["It is a region in southern Italy.", "It has a bay, a big city and a famous volcano."],
          "It shows how a warm coast and a volcano shape life.", "Naples is a big city in Campania.",
          map("campania", "Campania", [mk("A", "Naples", [14.27, 40.85]), mk("B", "Vesuvius", [14.43, 40.82])], "A map of Campania in southern Italy with markers on Naples and Vesuvius.")),
        "comparing-two-regions": I("Alike and different", ["Compare landscapes and land use.", "Say what is alike and what is different."],
          "Comparing helps you explain why places are not the same.", "Both regions welcome visitors, but one has a volcano nearby.",
          table("Two regions", ["Feature", "Lake District", "Campania"], [["Country", "England", "Italy"], ["Landscape", "Hills and lakes", "Coast and volcano"]], "A table comparing two regions. Country: England and Italy. Landscape: hills and lakes, and coast and volcano.")),
      },
    },
    "maps-and-local-surveys": {
      intro: I("Maps and local surveys", ["Use eight compass points.", "Use four-figure grid references and survey land use."],
        "These skills help you give clear directions and describe your local area.",
        "A grid reference gives eastings first, then northings.",
        grid("A grid")),
      topics: {
        "eight-compass-points": I("Eight compass points", ["Learn north-east, south-east, south-west and north-west.", "Give more exact directions."],
          "Eight points give clearer directions than four.", "North-east is halfway between north and east.",
          geo({ type: "compass", title: "Eight compass points" }, "A compass with eight points: north, north-east, east, south-east, south, south-west, west and north-west.")),
        "four-figure-grid-references": I("Four-figure grid references", ["Read eastings first, then northings.", "Name a grid square."],
          "Grid references help you find a place on an Ordnance Survey map.", "Along the corridor, then up the stairs: along first, then up.",
          grid("A practice grid")),
        "surveying-local-land-use": I("Surveying local land use", ["Record how land is used with a tally.", "Show the counts in a chart."],
          "A survey shows what an area is used for, such as homes, shops or parks.", "One street survey counted 7 houses, 3 shops and 1 park.",
          chart("Land use along one street", "places counted", [["Houses", 7], ["Shops", 3], ["Park", 1]], "A bar chart of land use counted along one street: houses 7, shops 3 and park 1.")),
      },
    },
  } });
