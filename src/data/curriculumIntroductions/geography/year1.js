// Year 1 Geography purpose screens. Pictures and maps are original practice drawings.
import { defineIntroductions } from "../../../../shared/curriculumJourneyAuthoring.js";
const geo = (visual, alt) => ({ renderer: "geography", data: { visual: { lines: [], ...visual, alt } }, alt });
const pictures = (title, items, alt) => ({ renderer: "pictures", data: { title, items: items.map(([icon, label]) => ({ icon, label })) }, alt });
const table = (caption, headings, rows, alt) => ({ renderer: "table", data: { caption, headings, rows }, alt });
const I = (title, learn, use, ex, model) => ({ title, learn, use, ex, model });
const ukMap = (title, extra, alt) => geo({ type: "y1", art: "uk", title, ...extra }, alt);

export default defineIntroductions({ year: 1, subject: "geography",
  subjectIntro: I("Welcome to Year 1 Geography", ["Look at places near you and far away.", "Use maps, pictures and weather words."],
    "Geography helps you find your way, talk about places and understand the weather. You can use it on a walk, on a trip or when you look at a map.",
    "A map shows the four countries of the United Kingdom.",
    ukMap("The United Kingdom", { names: true }, "A map of the United Kingdom with its four countries named: England, Scotland, Wales and Northern Ireland.")),
  quests: {
    "our-place": {
      intro: I("Look closely at a place", ["Notice what is in a place.", "Look at it from the ground and from above."],
        "When you know what is around you, you can talk about your school and find your way.",
        "A school has a building, a playground and trees.",
        pictures("Around a school", [["🏫", "School"], ["🛝", "Playground"], ["🌳", "Tree"], ["🚧", "Gate"]], "Four pictures of things around a school: a school building, a playground, a tree and a gate.")),
      topics: {
        "around-our-school": I("What is around our school?", ["Name things in the school grounds.", "Say where things are."],
          "You can describe your school to a visitor so they can find the way.", "The playground is next to the school building.",
          pictures("Around our school", [["🏫", "Building"], ["🛝", "Playground"], ["🌳", "Tree"], ["🚪", "Gate"]], "Four school things: a building, a playground, a tree and a gate.")),
        "human-and-physical-features": I("Made by people or by nature?", ["Some features are made by people.", "Some features are made by nature."],
          "Sorting features helps us talk about any place we visit.", "A house is made by people. A hill is made by nature.",
          table("Two kinds of feature", ["Made by people", "Made by nature"], [["House", "Hill"], ["Road", "River"]], "A table of two kinds of feature. Made by people: house and road. Made by nature: hill and river.")),
        "maps-from-above": I("A place seen from above", ["A map shows a place from above.", "Symbols stand for real things."],
          "A map from above helps you see where things are, like the way to the park.", "On a map, a small tree picture can stand for a real tree.",
          pictures("From the ground and from above", [["👀", "Ground view"], ["🗺️", "Map from above"], ["🌳", "Tree symbol"], ["🏠", "House symbol"]], "Pictures of a ground view, a map from above, a tree symbol and a house symbol.")),
      },
    },
    "the-united-kingdom": {
      intro: I("Our home country group", ["Find the four countries of the UK.", "Meet their capital cities and nearby seas."],
        "You can say which country you live in and find it on a map.",
        "The United Kingdom has four countries and four capital cities.",
        ukMap("The four countries", { names: true, capitals: "names" }, "A UK map with the four countries named and a star on each capital city: London, Edinburgh, Cardiff and Belfast.")),
      topics: {
        "four-countries-of-the-uk": I("Four countries together", ["Name England, Scotland, Wales and Northern Ireland.", "Find each on a map."],
          "Knowing the four countries helps you follow the news and plan a visit.", "Scotland is in the north of Great Britain.",
          ukMap("The four UK countries", { names: true }, "A UK map with the four countries named: England, Scotland, Wales and Northern Ireland.")),
        "uk-capital-cities": I("A capital for each country", ["Each country has a capital city.", "Match each capital to its country."],
          "Capital cities are where leaders meet and many visitors go.", "Cardiff is the capital city of Wales.",
          ukMap("Capital cities", { names: true, capitals: "names" }, "A UK map with country names and a star on each capital city: London, Edinburgh, Cardiff and Belfast.")),
        "seas-around-the-uk": I("Water around our islands", ["The UK has sea around its coasts.", "Name the seas near it."],
          "Seas matter for ferries, fishing and beach days.", "The North Sea is on the east side of Great Britain.",
          ukMap("Seas around the UK", { names: true, seas: true }, "A UK map with the four countries named and the surrounding waters labelled: the North Sea, the Irish Sea, the English Channel and the Atlantic Ocean.")),
      },
    },
    "the-wider-world": {
      intro: I("A big wide world", ["Meet the seven continents and five oceans.", "Find hot and cold parts of the world."],
        "The world is a very big place. A globe or map helps you see where far away places are.",
        "Land is split into continents. Water is split into oceans.",
        geo({ type: "map", view: "world", title: "The world", markers: [{ id: "A", label: "Africa", point: [20, 5] }, { id: "B", label: "Pacific Ocean", point: [-150, 0] }] }, "A world map with a marker on the continent of Africa and a marker on the Pacific Ocean.")),
      topics: {
        "seven-continents": I("Seven big areas of land", ["Name the seven continents.", "Find them on a map."],
          "Knowing the continents helps you say where animals, foods and people come from.", "Africa and Asia are continents.",
          pictures("Some continents", [["🦁", "Africa"], ["🐼", "Asia"], ["🐧", "Antarctica"], ["🐨", "Australia"]], "Four pictures with continent names: a lion for Africa, a panda for Asia, a penguin for Antarctica and a koala for Australia.")),
        "five-oceans": I("Five big areas of water", ["Name the five oceans.", "Know that oceans are salty water."],
          "Oceans carry ships and are home to whales and fish.", "The Pacific Ocean is the biggest ocean.",
          pictures("Water and land", [["🌊", "Ocean"], ["🐋", "Whale"], ["🚢", "Ship"], ["🏝️", "Island"]], "Four pictures: an ocean wave, a whale, a ship and an island.")),
        "hot-and-cold-places": I("Warm and cold parts of Earth", ["Places near the Equator are warm.", "Places near the poles are cold."],
          "Knowing this helps you pack the right clothes.", "A desert near the Equator can be hot. The North Pole is icy.",
          table("Hot and cold", ["Place", "Usually"], [["Near the Equator", "Warm"], ["Near the poles", "Cold"]], "A table: places near the Equator are usually warm and places near the poles are usually cold.")),
      },
    },
    "weather-and-exploring": {
      intro: I("Weather and finding the way", ["Notice weather and the seasons.", "Follow a route on a simple map."],
        "Weather tells you what to wear. A simple map tells you where to go.",
        "On a rainy day you might wear a coat and boots.",
        pictures("Weather", [["☀️", "Sunny"], ["🌧️", "Rainy"], ["💨", "Windy"], ["❄️", "Snowy"]], "Four weather pictures: sunny, rainy, windy and snowy.")),
      topics: {
        "daily-weather": I("What is the weather today?", ["Name kinds of weather.", "Record the weather each day."],
          "You can choose clothes and games by looking at the weather.", "A cloud with raindrops means rain.",
          pictures("Weather words", [["☀️", "Sunny"], ["☁️", "Cloudy"], ["🌧️", "Rainy"], ["💨", "Windy"]], "Four weather pictures: sunny, cloudy, rainy and windy.")),
        "seasons-in-the-uk": I("Four seasons in a year", ["Name spring, summer, autumn and winter.", "See how the weather changes."],
          "Seasons help you know what happens in nature and what to wear.", "Leaves fall from many trees in autumn.",
          pictures("The four seasons", [["🌱", "Spring"], ["🌞", "Summer"], ["🍂", "Autumn"], ["⛄", "Winter"]], "Four season pictures: spring seedling, summer sun, autumn leaves and winter snowman.")),
        "routes-and-simple-maps": I("Follow a route", ["Use words like left, right and forwards.", "Follow a path on a simple map."],
          "A route helps you walk from school to the park safely with a grown-up.", "Go forwards, then turn left.",
          pictures("Route words", [["⬆️", "Forwards"], ["⬅️", "Left"], ["➡️", "Right"], ["🗺️", "Map"]], "Four route pictures: a forwards arrow, a left arrow, a right arrow and a map.")),
      },
    },
  } });
