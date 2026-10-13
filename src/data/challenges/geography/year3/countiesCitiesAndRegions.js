import { c, lesson, record, sort, topic } from "./authoring.js";
import { map, UK_CITY_MAP } from "./maps.js";

const types = record(["England is a country within the UK.", "The North West is a region of England.", "Cumbria is an English ceremonial county.", "Manchester is a city in the North West.", "UK nations use different systems for local areas."]);
const countyMap = map("uk", ["Cumbria", "North Yorkshire", "Greater London"], ["Markers show selected English ceremonial counties, not county boundaries."]);
const cities = UK_CITY_MAP;
const nested = record(["Manchester is a city in the North West region of England, within the UK.", "Newcastle upon Tyne is a city in North East England, within the UK.", "London is a city within Greater London, in England and the UK.", "Edinburgh is Scotland's capital; Cardiff is Wales's capital.", "Belfast is Northern Ireland's capital; London is England's capital."]);
export const countiesCitiesAndRegions = topic([
  lesson(["A country contains smaller places.", "Regions cover areas; cities are settlements.", "This map uses English ceremonial county names.", "UK nations use different local systems."], types, [
    c("Which label names a country?", "England", "Manchester", "Cumbria", types, ["atlas", "regions","counties","ukAreas"]),
    c("Which label names a region?", "North West", "Manchester", "England", types, ["regions","counties","ukAreas"]),
    c("Which label names a city?", "Manchester", "North West", "Cumbria", types, ["atlas"]),
    c("Which label names a ceremonial county?", "Cumbria", "Manchester", "UK", types, ["regions","counties","ukAreas"]),
    c("Which larger place contains England?", "UK", "Manchester", "Cumbria", types, ["atlas"]),
    c("What county convention does this lesson use?", "English ceremonial counties", "cities only", "UK countries", types, ["regions","counties","ukAreas"]),
    sort("Sort the country and city labels.", ["Country", "City"], [["England",0],["Manchester",1],["UK",0]], types, ["atlas"]),
  ]),
  lesson(["Use the key to find each marker.", "North is towards the arrow.", "County markers show locations, not county boundaries."], countyMap, [
    c("Which county is furthest north on this map?", "Cumbria", "North Yorkshire", "Greater London", countyMap, ["regions","counties","ukAreas"]),
    c("Which county marker is furthest south?", "Greater London", "Cumbria", "North Yorkshire", countyMap, ["regions","counties","ukAreas"]),
    c("Which county is east of Cumbria and north of Greater London?", "North Yorkshire", "Greater London", "Cumbria", countyMap, ["regions","counties","ukAreas"]),
    c("Which city marker is in Scotland?", "Edinburgh", "Cardiff", "Belfast", map("uk", ["Edinburgh","Cardiff","Belfast"], ["Edinburgh is in Scotland; Cardiff is in Wales; Belfast is in Northern Ireland."]), ["atlas"]),
    c("Which mapped capital is in Wales?", "Cardiff", "London", "Edinburgh", cities, ["atlas"]),
    c("Which mapped city is north of Birmingham?", "Manchester", "London", "Cardiff", cities, ["atlas"]),
    c("Which mapped capital is west of Great Britain?", "Belfast", "Edinburgh", "London", cities, ["atlas"]),
  ]),
  lesson(["Compare two positions using the north arrow.", "North and south describe relative locations.", "A map helps us check a claim."], cities, [
    c("Which is further north: Manchester or Newcastle upon Tyne?", "Newcastle upon Tyne", "Manchester", "They are level", cities, ["atlas"]),
    c("Which is further south: Birmingham or Edinburgh?", "Birmingham", "Edinburgh", "They are level", cities, ["atlas"]),
    c("Which is further west: Belfast or London?", "Belfast", "London", "They are level", cities, ["atlas"]),
    c("Which city lies between Manchester and London from north to south?", "Birmingham", "Edinburgh", "Newcastle upon Tyne", cities, ["atlas"]),
    c("Which capital is furthest north among the four shown?", "Edinburgh", "London", "Belfast", cities, ["atlas"]),
    c("Which claim matches the map?", "Cardiff is west of London", "London is west of Cardiff", "Cardiff is north of Edinburgh", cities, ["atlas"]),
    c("Which city lies south of Newcastle upon Tyne?", "Manchester", "Edinburgh", "Both are north", cities, ["atlas"]),
  ]),
  lesson(["Describe places from smaller to larger areas.", "A city can sit within a region and country.", "Check every part of a place description."], nested, [
    c("Which description puts Manchester in the right larger areas?", "Manchester, North West, England, UK", "Manchester, Scotland, UK", "Manchester, Cumbria, Wales", nested, ["atlas","regions"]),
    c("Which description correctly locates Newcastle upon Tyne?", "City in North East England", "Country within Scotland", "County within Wales", nested, ["atlas"]),
    c("Which description correctly locates London?", "City within Greater London and England", "County within Northern Ireland", "Country within Manchester", nested, ["atlas","regions"]),
    c("Which capital belongs in a description of Scotland?", "Edinburgh", "Cardiff", "Belfast", nested, ["atlas"]),
    c("Which capital belongs in a description of Northern Ireland?", "Belfast", "London", "Cardiff", nested, ["atlas"]),
    c("Which description correctly links Cardiff to a country?", "Cardiff is Wales's capital", "Cardiff is England's capital", "Cardiff is Scotland's capital", nested, ["atlas"]),
    c("Which statement correctly links a city and region?", "Manchester is in the North West", "Manchester contains England", "North West is a city", nested, ["atlas","regions"]),
  ]),
]);
