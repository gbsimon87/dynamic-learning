// Year 2 Geography purpose screens. Photos are the bundled credited images; maps are simplified teaching maps.
import { defineIntroductions } from "../../../../shared/curriculumJourneyAuthoring.js";
const geo = (visual, alt) => ({ renderer: "geography", data: { visual: { lines: [], ...visual, alt } }, alt });
const pictures = (title, items, alt) => ({ renderer: "pictures", data: { title, items: items.map(([icon, label]) => ({ icon, label })) }, alt });
const table = (caption, headings, rows, alt) => ({ renderer: "table", data: { caption, headings, rows }, alt });
const I = (title, learn, use, ex, model) => ({ title, learn, use, ex, model });
const world = (title, markers, alt, extra = {}) => geo({ type: "map", view: "world", title, markers, ...extra }, alt);
const plan = (title, alt) => geo({ type: "ks1", variant: "plan", north: "up", title, features: [
  { code: "A", label: "House", symbol: "house", x: 0, y: 0 }, { code: "B", label: "Shop", symbol: "shop", x: 2, y: 1 }, { code: "C", label: "Tree", symbol: "tree", x: 3, y: 3 }] }, alt);

export default defineIntroductions({ year: 2, subject: "geography",
  subjectIntro: I("Welcome to Year 2 Geography", ["Use compass directions and map keys.", "Compare two small places, one in the UK and one far away."],
    "Geography helps you read a map, follow directions and understand how people live in different places. You can use it on a journey or when you look at a new place.",
    "A compass shows north, east, south and west.",
    geo({ type: "compass", title: "A compass" }, "A compass with the four points: north, east, south and west.")),
  quests: {
    "world-and-uk-knowledge": {
      intro: I("Know the world and the UK", ["Name the continents and oceans.", "Use north, east, south and west."],
        "Knowing where places are helps you talk about holidays, news and journeys.",
        "The Pacific Ocean is a very big ocean. Asia is a very big continent.",
        world("Land and water", [{ id: "A", label: "Asia", point: [90, 45] }, { id: "B", label: "Pacific Ocean", point: [-150, 0] }], "A world map with a marker on the continent of Asia and a marker on the Pacific Ocean.")),
      topics: {
        "continents-and-oceans-together": I("Land and water together", ["Name the seven continents and five oceans.", "Say which oceans are beside which continents."],
          "A map of the world helps you say where a place is.", "Australia has the Indian Ocean on one side and the Pacific Ocean on another.",
          world("Continents and oceans", [{ id: "A", label: "Australia", point: [134, -25] }, { id: "B", label: "Indian Ocean", point: [80, -20] }, { id: "C", label: "Pacific Ocean", point: [-150, 0] }], "A world map with markers on Australia, the Indian Ocean and the Pacific Ocean.")),
        "uk-places-and-landscapes": I("Places and landscapes in the UK", ["Find UK places on a map.", "Name hills, rivers and coasts."],
          "You can describe where you visit, from a city to a beach.", "Snowdon is a mountain in Wales. The Thames is a river in England.",
          geo({ type: "y1", art: "uk", title: "The UK", names: true }, "A UK map with the four countries named: England, Scotland, Wales and Northern Ireland.")),
        "compass-directions-and-routes": I("Use the four compass points", ["Learn north, east, south and west.", "Describe a route with compass directions."],
          "Compass directions help you give clear directions, like 'walk north to the park'.", "North is often at the top of a map.",
          geo({ type: "compass", title: "Compass points" }, "A compass with the four points: north, east, south and west.")),
      },
    },
    "weather-and-world-patterns": {
      intro: I("Weather records and world patterns", ["Read simple weather records.", "Learn about the Equator and the poles."],
        "Weather records help you plan your day. The Equator and the poles help explain why some places are hot and others are cold.",
        "Places near the Equator are usually warm. Places near the poles are cold.",
        world("The Equator", [{ id: "A", label: "Ecuador", point: [-78.5, 0] }], "A world map with the Equator line and a marker on Ecuador, a country the Equator crosses.", { equator: true })),
      topics: {
        "weather-records": I("Read a weather record", ["Read a simple chart of daily weather.", "Count and compare days."],
          "A weather record shows how many days were sunny, rainy or cloudy.", "In this week there were 3 sunny days and 2 rainy days.",
          table("A week of weather", ["Weather", "Days"], [["Sunny", 3], ["Rainy", 2], ["Cloudy", 2]], "A table of one week of weather: sunny 3 days, rainy 2 days, cloudy 2 days.")),
        "the-equator-and-the-poles": I("The Equator and the poles", ["The Equator is an imaginary line round the middle of the Earth.", "The North and South Poles are at the top and bottom."],
          "They help explain why some parts of the world are hot and others are cold.", "The Equator runs through Brazil and Ecuador.",
          world("The Equator", [{ id: "A", label: "Brazil", point: [-52, -10] }, { id: "B", label: "Ecuador", point: [-78.5, 0] }], "A world map with the Equator line and markers on Brazil and Ecuador.", { equator: true })),
      },
    },
    "two-small-places": {
      intro: I("Two small places", ["Look at Whitby in England and Kampong Ayer in Brunei.", "Compare homes, journeys and what is around them."],
        "Comparing places shows how people live beside water in different parts of the world.",
        "Whitby has a harbour for fishing boats. In Kampong Ayer people cross the river by boat.",
        geo({ type: "photo", title: "Whitby harbour", image: "whitby-harbour" }, "A photograph of Whitby harbour at low tide. Buildings line the harbour edge and St Mary's Church stands on the hill behind.")),
      topics: {
        "whitby-by-the-sea": I("Whitby on the coast", ["Whitby is a seaside town in England.", "It has a harbour, boats and cliffs."],
          "Knowing a place well helps you compare it with another.", "Fishing boats come into Whitby harbour.",
          geo({ type: "photo", title: "Whitby harbour", image: "whitby-harbour" }, "A photograph of Whitby harbour at low tide, with a row of buildings along the harbour edge and a church on the hill behind.")),
        "kampong-ayer-by-the-river": I("Kampong Ayer on the river", ["Kampong Ayer is a water village in Brunei.", "Many homes stand on posts above the river."],
          "It shows one way people build homes on water.", "People walk along wooden walkways and cross the river by boat.",
          geo({ type: "photo", title: "A home above the water", image: "peramu-homes" }, "A photograph of a decorated home at Kampong Ayer, with a railed walkway above the water and supports underneath.")),
        "homes-and-journeys-in-two-places": I("Homes and journeys", ["Compare homes in two places.", "Compare how people travel."],
          "The way people live and travel depends on their place.", "In Whitby people walk or drive along streets. In Kampong Ayer people use walkways and boats.",
          table("Homes and journeys", ["Place", "Homes", "Journeys"], [["Whitby", "On land", "Streets and roads"], ["Kampong Ayer", "On posts above the river", "Walkways and boats"]], "A table: Whitby has homes on land and journeys along streets and roads. Kampong Ayer has homes on posts above the river and journeys by walkway and boat.")),
        "comparing-two-small-places": I("Alike and different", ["Say what is the same.", "Say what is different."],
          "Comparing helps you notice more about both places.", "Both Whitby and Kampong Ayer are beside water, but their homes are different.",
          table("Alike and different", ["Alike", "Different"], [["Both are beside water", "Whitby is by the sea; Kampong Ayer is by a river"], ["Both have homes and boats", "Whitby homes are on land; Kampong Ayer homes stand on posts"]], "A table of alike and different. Alike: both are beside water, and both have homes and boats. Different: Whitby is by the sea and Kampong Ayer by a river; Whitby homes are on land and Kampong Ayer homes stand on posts.")),
      },
    },
    "making-and-reading-maps": {
      intro: I("Read and make maps", ["Use views from above and landmarks.", "Use symbols and a key."],
        "A good map helps someone else find their way.",
        "A key says what each symbol on a map means.",
        plan("A simple map", "A simple map with symbols for a house, a shop and a tree.")),
      topics: {
        "aerial-views-and-landmarks": I("From above and landmarks", ["An aerial view is from above.", "A landmark is easy to spot."],
          "Landmarks help you say where you are.", "St Mary's Church in Whitby is a landmark.",
          geo({ type: "photo", title: "A view from above", image: "whitby-aerial" }, "An angled aerial photograph of Whitby showing the sea, St Mary's Church, the abbey ruins and nearby buildings.")),
        "symbols-and-map-keys": I("Symbols and keys", ["A symbol stands for a real thing.", "A key explains the symbols."],
          "A key helps you read a map.", "A small house picture can stand for a real house.",
          plan("Symbols on a map", "A simple map with symbols for a house, a shop and a tree.")),
        "making-a-simple-map": I("Make a simple map", ["Choose symbols and make a key.", "Put things in the right places."],
          "Your own map can show the way to your classroom.", "Draw a house symbol, then add it to the key.",
          pictures("Making a map", [["✏️", "Draw"], ["🔑", "Key"], ["🧭", "North"], ["🏠", "Symbol"]], "Four pictures about making a map: a pencil, a key, a compass and a house symbol.")),
      },
    },
    "local-fieldwork": {
      intro: I("Look closely outside", ["Plan what to look for.", "Record what you see."],
        "Fieldwork means finding out outdoors with a grown-up. Careful looking gives better evidence.",
        "On a school walk you might count trees, look at buildings and take photos.",
        pictures("Fieldwork tools", [["👀", "Look"], ["📝", "Record"], ["📷", "Photo"], ["🧑‍🏫", "Grown-up"]], "Four fieldwork pictures: eyes, a notepad, a camera and a grown-up helper.")),
      topics: {
        "observing-our-school-grounds": I("Observe the school grounds", ["Look at the features of the grounds.", "Record what you find."],
          "Observing helps you notice what is natural and what is made by people.", "You might count trees and tick them on a record sheet.",
          pictures("Observing", [["🌳", "Trees"], ["🏫", "Building"], ["🛝", "Playground"], ["📝", "Record"]], "Four pictures: trees, a school building, a playground and a record sheet.")),
        "exploring-our-local-area": I("Explore our local area", ["Look at the shops, homes and paths nearby.", "Use pictures and a simple map."],
          "Exploring with a grown-up helps you get to know your neighbourhood.", "A local walk can show a shop, a park and a path.",
          plan("A local area plan", "A simple map of a local area with symbols for a house, a shop and a tree.")),
      },
    },
  } });
