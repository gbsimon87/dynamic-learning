import { c, lesson, record, sort, ordered, topic } from "./authoring.js";
import { map } from "./maps.js";

const letter = (v, name) => v.markers.find((m) => m.label === name).id;
/** "Which letter marks X?" with the other two letters as near-misses. */
const which = (v, name, others, sources = ["atlas"]) => {
  const [a, b] = others.map((o) => `Marker ${letter(v, o)}`);
  return c(`Which letter marks ${name === "USA" ? "the USA" : name} on the map?`, `Marker ${letter(v, name)}`, a, b, v, sources, "Find the labelled list of markers in the evidence, then match the name.");
};

const countries = map("northAmerica", ["Canada", "USA", "Mexico", "Cuba"], [
  "North America includes Canada, the USA, Mexico, Central America and Caribbean islands.",
  "Canada is north of the USA. Mexico is south of it.",
  "Cuba is an island country in the Caribbean.",
  "Guatemala and Costa Rica are in Central America.",
]);
// Havana's shared coordinate falls just outside the simplified Cuba outline, so its marker sits slightly inland.
const HAVANA = [-82.3, 23];
const fixHavana = (v) => ({
  ...v,
  alt: v.alt.replace("23.13 degrees north, 82.37 degrees west", "23 degrees north, 82.3 degrees west"),
  markers: v.markers.map((m) => (m.label === "Havana" ? { ...m, point: HAVANA } : m)),
});
const cities = fixHavana(map("northAmerica", ["Ottawa", "Washington DC", "Mexico City", "Havana"], [
  "Ottawa is a city in Canada. Washington DC is a city in the USA.",
  "Mexico City is a city in Mexico. Havana is a city in Cuba.",
  "Washington DC is not in Washington State.",
]));
const regions = map("northAmerica", ["Rocky Mountains", "Great Plains", "Northern Canada"], [
  "The Rocky Mountains are high mountains in Canada and the USA.",
  "The Great Plains are mostly open grassland in the USA and Canada.",
  "Northern Canada has tundra: very cold land where trees cannot grow.",
  "Regions like these cross country borders.",
]);
const words = record([
  "A continent is a huge area of land. North America is one.",
  "A country is a nation inside a continent. Canada and Cuba are countries.",
  "A city is a large settlement inside a country. Ottawa and Havana are cities.",
  "The USA is one country in North America, not all of it.",
  "Central America and the Caribbean are parts of North America too.",
], "Continent, country and city");

export const northAmericanCountriesAndCities = topic([
  lesson(["North America is a continent with many countries.", "We study Canada, the USA, Mexico and Cuba.", "It also holds Central America and the Caribbean."], countries, [
    c("Which marked country is an island in the Caribbean?", "Cuba", "Mexico", "Canada", countries, ["g1_na", "g1_m49", "atlas"], "Look for the sentence that mentions an island."),
    c("Which marked country lies north of the USA?", "Canada", "Mexico", "Cuba", countries, ["atlas"], "Use north is up and compare the two positions."),
    c("Which marked country is south of the USA and not an island?", "Mexico", "Canada", "Cuba", countries, ["atlas", "g1_na", "g1_m49"], "Rule out the Caribbean island and the country to the north."),
    which(countries, "USA", ["Canada", "Mexico"]),
    which(countries, "Cuba", ["Mexico", "Canada"]),
    c("Guatemala and Costa Rica belong to which part of North America?", "Central America", "The Caribbean", "Northern Canada", countries, ["g1_na", "g1_m49"], "Read the sentence that names both countries."),
    c("Which description of North America is correct?", "It holds many countries, not only the USA", "It is another name for the USA", "It holds Canada and the USA but not Mexico", countries, ["g1_na", "g1_m49"], "Check the first evidence sentence for what it includes."),
    sort("Sort each name by what it is.", ["A country", "A continent"], [["Canada", 0], ["North America", 1], ["Mexico", 0], ["Cuba", 0]], countries, ["g1_na", "g1_m49"], "A continent holds many countries."),
  ]),
  lesson(["Read the city markers on the map.", "Each city sits inside one country.", "Washington DC is the USA's capital city, not a state."], cities, [
    c("Which marked city is in Mexico?", "Mexico City", "Havana", "Ottawa", cities, ["atlas"], "The evidence lists each city's country."),
    c("Which marked city is on an island?", "Havana", "Ottawa", "Washington DC", cities, ["atlas"], "Think about which country is a Caribbean island."),
    c("Washington DC is a city in which country?", "The USA", "Canada", "Mexico", cities, ["g1_dc"], "Read the first evidence sentence."),
    c("Which marked city lies furthest north?", "Ottawa", "Mexico City", "Havana", cities, ["atlas"], "Compare the degrees north in the marker list."),
    c("Which marked city lies furthest south?", "Mexico City", "Washington DC", "Ottawa", cities, ["atlas"], "The smallest degrees north is furthest south."),
    c("Which marked city lies furthest west?", "Mexico City", "Havana", "Ottawa", cities, ["atlas"], "Compare degrees west; the larger number is further west."),
    which(cities, "Havana", ["Ottawa", "Mexico City"]),
    sort("Sort each city by whether it is in the USA.", ["In the USA", "Not in the USA"], [["Washington DC", 0], ["Ottawa", 1], ["Mexico City", 1], ["Havana", 1]], cities, ["atlas", "g1_dc"], "Read which country each city is in."),
    ordered("Order the city markers from furthest north to furthest south.", ["Ottawa", "Washington DC", "Havana", "Mexico City"], cities, ["atlas"], "Start with the largest degrees north."),
  ]),
  lesson(["These regions are examples of North America's land.", "Mountains, plains and cold northern land all appear.", "Regions can cross country borders."], regions, [
    c("Which marked region is mostly open grassland?", "Great Plains", "Rocky Mountains", "Northern Canada", regions, ["g1_plains"], "Find the region described as grassland."),
    c("Which marked region is a high mountain range?", "Rocky Mountains", "Great Plains", "Northern Canada", regions, ["g1_rockies"], "Match the word mountains in the evidence."),
    c("Which marked region has tundra where trees cannot grow?", "Northern Canada", "Great Plains", "Rocky Mountains", regions, ["g1_tundra"], "Which one is described as very cold?"),
    c("Which countries do the Rocky Mountains cross?", "Canada and the USA", "Mexico and Cuba", "Canada and Cuba", regions, ["g1_rockies"], "Read the first evidence sentence."),
    c("Which marked region lies furthest north?", "Northern Canada", "Great Plains", "Rocky Mountains", regions, ["atlas"], "Compare degrees north."),
    c("Which marked region lies furthest west?", "Rocky Mountains", "Great Plains", "Northern Canada", regions, ["atlas"], "Compare degrees west; larger means further west."),
    c("What does the evidence say about regions like these?", "They cross country borders", "They stop at each border", "They exist only in Mexico", regions, ["g1_rockies", "g1_plains"], "Look at the last evidence sentence."),
    ordered("Order the region markers from furthest north to furthest south.", ["Northern Canada", "Rocky Mountains", "Great Plains"], regions, ["atlas"], "Compare the degrees north of each marker."),
  ]),
  lesson(["Continents, countries and cities are different sizes.", "A city sits in a country. A country sits in a continent.", "North America is more than the USA."], words, [
    c("Which describes a continent?", "A very large land area with many countries", "A large settlement inside one country", "A nation with its own capital city", words, ["g1_na", "g1_m49"], "A continent is the biggest of the three."),
    c("Which describes a country?", "A nation inside a continent", "A very large area holding many nations", "A large settlement with many homes", words, ["g1_na", "g1_m49"], "Canada and Cuba are examples."),
    c("Which describes a city?", "A large settlement inside a country", "A continent with many countries", "A nation with borders", words, ["g1_na", "g1_m49"], "Ottawa and Havana are examples."),
    c("What is the USA in relation to North America?", "One country inside it", "Another name for all of it", "A continent beside it", words, ["g1_na", "g1_m49"], "Read the evidence sentence naming the USA."),
    c("Why is it wrong to say North America is only the USA?", "Other countries lie in it too", "The USA is in a different continent", "Canada and Cuba are part of the USA", words, ["g1_na", "g1_m49"], "Check which other places the evidence names."),
    c("Mexico City is best described as which?", "A city in the country of Mexico", "A country in North America", "A continent", words, ["atlas"], "Mexico City sits inside Mexico."),
    c("Cuba is best described as which?", "A Caribbean country in North America", "A city in Mexico", "A continent", words, ["g1_na", "g1_m49"], "Cuba has its own cities, such as Havana."),
    sort("Sort each name into continent, country or city.", ["Continent", "Country", "City"], [["North America", 0], ["Mexico", 1], ["Ottawa", 2], ["Cuba", 1], ["Havana", 2]], words, ["g1_na", "g1_m49", "atlas"], "Largest first: continent, then country, then city."),
  ]),
]);
