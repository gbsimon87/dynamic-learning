import { c, lesson, ordered, record, sort, topic } from "./authoring.js";
import { place } from "./records.js";
import { FULL, letterOf, tbl, worldMap } from "./climateZones.js";

const BIOMES = "g2_nasaBiomes", POWER = "g2_nasaPower";
/** Source id for each example place's biome. */
const EX = { Manaus: "g2_nasaRainforest", Aswan: "g2_nasaEgypt", Regina: "g2_saskGrassland", Utqiagvik: "g2_neonTundra", Yellowknife: "g2_pewBoreal" };
const NASA = ["g2_nasaRainforest", "g2_nasaDesert", "g2_nasaGrassland", "g2_nasaTemperate", "g2_nasaConiferous", "g2_nasaTundra"];

// Slot 1: names and captions
const six = record(["Tropical rainforest: hot and wet, with vines, palms, orchids and ferns.", "Desert: the driest biome, with small bushes, short grasses and water-saving plants.", "Grassland: open, fairly flat land covered mostly by grasses.", "Temperate forest: broadleaf trees such as oaks, maples and beeches.", "Boreal forest: spruces, pines and firs, with long, cold winters.", "Tundra: the coldest biome, with mosses, sedges and lichens, and few trees."], "Six broad biomes");
const named = (prompt, answer, w1, w2) => c(prompt, answer, w1, w2, six, NASA, "Match the plants in the question to one caption.");

// Slot 2: locate examples
const tag = (n, what) => `${n} is an example place for ${what}.`;
const V1 = worldMap(["Manaus", "Aswan", "Regina", "Utqiagvik"], [tag("Manaus", "tropical rainforest"), tag("Aswan", "desert"), tag("Regina", "grassland"), tag("Utqiagvik", "tundra"), "Each place is one example; biomes cover broad areas without exact lines."]);
const V2 = worldMap(["Yellowknife", "Regina", "Manaus", "Aswan"], [tag("Yellowknife", "boreal forest"), tag("Regina", "grassland"), tag("Manaus", "tropical rainforest"), tag("Aswan", "desert"), "Each place is one example, not the whole biome."]);
const V3 = worldMap(["Utqiagvik", "Yellowknife", "Regina", "Aswan", "Manaus"], [tag("Utqiagvik", "tundra"), tag("Yellowknife", "boreal forest"), tag("Regina", "grassland"), tag("Aswan", "desert"), tag("Manaus", "tropical rainforest"), "Latitude is one clue; it does not draw exact biome boundaries."]);
const find = (v, place, others, prompt) => c(prompt, letterOf(v, place), ...others.map((o) => letterOf(v, o)), v, [BIOMES, EX[place]], "Read which place is the example, then find its letter.");

// Slot 3: climate records and vegetation
const veg = (v, lines) => ({ ...v, lines: [...v.lines, ...lines], alt: `${v.alt} ${lines.join(" ")}` });
const TV1 = veg(tbl(["manaus", "aswan"], undefined, "Manaus and Aswan, typical months"), ["Manaus is in tropical rainforest: vines, palms, orchids and ferns grow.", "Aswan is in a desert region; typical desert plants include small bushes and short grasses."]);
const TV2 = veg(tbl(["regina", "manaus"], undefined, "Regina and Manaus, typical months"), ["Regina is in a grassland region; native grasses include speargrasses and wheatgrasses.", "Manaus is in tropical rainforest."]);
const TV3 = veg(tbl(["utqiagvik", "yellowknife"], undefined, "Utqiagvik and Yellowknife, typical months"), ["Utqiagvik is in Arctic tundra, where grasses and sedges grow far from any tree.", "Black spruce and jack pine forest grows near Yellowknife."]);
const r = (id, i) => place(id).months[i].r, t = (id, i) => place(id).months[i].t;
const cell = (id, i, bin) => [`${place(id).name} ${FULL[i]}: ${r(id, i)} mm rain`, bin];
const biomeSort = sort("Sort the evidence by biome.", ["Rainforest", "Desert"], [cell("manaus", 0, 0), cell("manaus", 6, 0), cell("aswan", 0, 1), cell("aswan", 3, 1)], TV1, [POWER, "g2_nasaRainforest", "g2_nasaDesert"], "Compare the rainfall numbers in the table.");
if (!(r("manaus", 0) > 100 && r("manaus", 6) > 50 && r("aswan", 0) === 0 && r("aswan", 3) === 0)) throw new Error("biome sort data changed");
if (!(t("regina", 6) - t("regina", 0) === 34 && t("utqiagvik", 6) < t("yellowknife", 6) && r("manaus", 0) > r("regina", 0))) throw new Error("slot 3 data changed");

// Slot 4: relationships and land use
const R = record(["Climate helps explain which plants grow in a place.", "Regina lies in a grassland region, where agriculture is now the main land use.", "Much native grassland that remains is on land not suited to crops.", "People have also cleared forests for farmland and pasture in other places.", "Different biome maps draw boundaries in different places."], "Climate, plants and land use");
const TR = tbl(["manaus", "aswan"], undefined, "Manaus and Aswan, typical months");
const R4 = [BIOMES, "g2_saskGrassland", "g2_nasaLandChange"];

export const biomesAndVegetationBelts = topic([
  lesson(["A biome is a community of plants and animals in one kind of climate.", "These six biomes are broad examples.", "Biome names describe typical plants."], six, [
    named("Which biome has small bushes, short grasses and water-saving plants?", "Desert", "Grassland", "Tundra"),
    named("Which biome has mosses, sedges and lichens?", "Tundra", "Grassland", "Boreal forest"),
    named("Which biome has spruces, pines and firs?", "Boreal forest", "Temperate forest", "Tundra"),
    named("Which biome has oaks, maples and beeches?", "Temperate forest", "Boreal forest", "Tropical rainforest"),
    named("Which biome has vines, palms, orchids and ferns?", "Tropical rainforest", "Temperate forest", "Grassland"),
    named("Which biome is open land covered mostly by grasses?", "Grassland", "Boreal forest", "Tropical rainforest"),
    named("Which biome do the captions call the driest?", "Desert", "Tundra", "Grassland"),
    named("Which biome do the captions call the coldest?", "Tundra", "Boreal forest", "Desert"),
    sort("Sort the biomes by how many trees they usually have.", ["Many trees", "Few or no trees"], [["Tropical rainforest", 0], ["Boreal forest", 0], ["Temperate forest", 0], ["Tundra", 1], ["Desert", 1]], six, NASA),
    sort("Sort these plants into two biomes.", ["Tropical rainforest", "Tundra"], [["Palms", 0], ["Orchids", 0], ["Lichens", 1], ["Sedges", 1]], six, NASA),
    sort("Which are forest biomes?", ["Forest biome", "Not a forest biome"], [["Boreal forest", 0], ["Temperate forest", 0], ["Desert", 1], ["Grassland", 1], ["Tundra", 1]], six, NASA),
  ]),
  lesson(["Each marker is one example place for a biome.", "Biomes are broad areas, not exact lines.", "Latitude is a clue, not a rule."], V1, [
    find(V1, "Utqiagvik", ["Manaus", "Aswan"], "Which marker is the tundra example?"),
    find(V1, "Regina", ["Aswan", "Utqiagvik"], "Which marker is the grassland example?"),
    find(V1, "Aswan", ["Manaus", "Regina"], "Which marker is the desert example?"),
    find(V1, "Manaus", ["Regina", "Utqiagvik"], "Which marker is the tropical rainforest example?"),
    find(V2, "Yellowknife", ["Manaus", "Aswan"], "Which marker is the boreal forest example?"),
    find(V2, "Regina", ["Yellowknife", "Aswan"], "On this second map, which marker is the grassland example?"),
    c("Which biome example lies furthest north?", "Tundra", "Desert", "Grassland", V1, [BIOMES, EX.Utqiagvik], "Compare the degrees north in the description."),
    c("Which biome example lies south of the Equator?", "Tropical rainforest", "Desert", "Grassland", V1, [BIOMES, EX.Manaus], "Look for degrees south."),
    c("Which example lies nearest the Equator?", "Tropical rainforest", "Desert", "Boreal forest", V2, [BIOMES, EX.Manaus], "The Equator is at zero degrees."),
    ordered("Order these biome examples from furthest north to furthest south.", ["Tundra (Utqiagvik)", "Boreal forest (Yellowknife)", "Grassland (Regina)", "Desert (Aswan)", "Tropical rainforest (Manaus)"], V3, [BIOMES, ...Object.values(EX).slice(0, 5)], "Compare the degrees north or south."),
  ]),
  lesson(["Compare the climate records with the vegetation evidence.", "Lots of rain fits forest; very little rain fits desert plants.", "Records come from model grid cells, not whole biomes."], TV1, [
    c("Which place's record fits tropical rainforest?", "Manaus, warm with rain in every month shown", "Aswan, warm but with no rain shown", "Neither record", TV1, [POWER, "g2_nasaRainforest"], "Look for rain in every month shown."),
    c("Which place's record fits desert plants such as small bushes?", "Aswan", "Manaus", "Both places equally", TV1, [POWER, "g2_nasaDesert", "g2_nasaEgypt"], "Look for the record with almost no rain."),
    biomeSort,
    c("Very little rain in every month fits which plants?", "Small bushes and short grasses", "Vines, palms and orchids", "Tall spruce forest", TV1, [POWER, "g2_nasaDesert"], "Compare the rainfall rows with the plant lines."),
    c("Heavy rain in most months fits which biome?", "Tropical rainforest", "Desert", "Tundra", TV1, [POWER, "g2_nasaRainforest"], "Check the rainfall row in each column."),
    c("Which place has the bigger temperature change from January to July?", "Regina", "Manaus", "They change equally", TV2, [POWER], "Subtract January from July for each place."),
    c("Which gets more rain in January: Regina or Manaus?", "Manaus", "Regina", "Both are the same", TV2, [POWER], "Compare the January rain figures."),
    c("Utqiagvik is colder in July than Yellowknife. Which vegetation fits?", "Tundra plants with no trees close by", "Spruce and pine forest", "Palms and ferns", TV3, [POWER, "g2_neonTundra", "g2_pewBoreal"], "Compare July, then read the vegetation lines."),
    c("Which statement uses both the record and the vegetation?", "Yellowknife has a warmer July than Utqiagvik, and spruce and pine grow nearby", "Yellowknife has a colder July than Utqiagvik, so only moss grows", "Both places have the same July and the same plants", TV3, [POWER, "g2_neonTundra", "g2_pewBoreal"], "Check the July row, then the vegetation lines."),
    c("Which describes Regina's temperatures?", "Cold in January and warm in July", "Warm in every month", "Below freezing in every month", TV2, [POWER], "Read Regina's January and July figures."),
  ]),
  lesson(["Climate helps explain which plants grow in a place.", "People can change vegetation by farming or clearing land.", "Biome boundaries are not exact lines."], R, [
    c("Regina is in a grassland region. Why is farmland now common?", "People have used much of the land for crops", "Grasses cannot grow in the climate there", "Crops are the natural plants of the region", R, R4, "Read the line about land use."),
    c("What does the evidence say about native grassland near Regina?", "Much that remains is on land not suited to crops", "Most of it grows in the middle of fields", "Most of it has been replaced by new forest", R, R4, "Look at where native grassland remains."),
    c("Which is a human change to vegetation?", "Clearing forest for farmland", "Rain helping a forest to grow", "Winter slowing growth in plants", R, R4, "Look for something people do."),
    c("Which statement is too simple?", "Biome boundaries are exact fixed lines", "Climate helps to explain plants", "People can change local vegetation", R, R4, "Check the line about biome maps."),
    c("Why might two biome maps place a boundary differently?", "Biomes change gradually and maps classify them differently", "Plants move to new places each year", "Climate changes at each country border", R, R4, "Read the line about different maps."),
    sort("Sort the evidence into climate and human land use.", ["Climate evidence", "Human land use"], [["Cold winters", 0], ["Heavy rain most months", 0], ["Farmland replaces grassland", 1], ["Forest cleared for pasture", 1]], R, R4),
    c("Which relationship fits the Manaus and Aswan records?", "More rain goes with forest, less rain with desert plants", "More rain goes with desert plants, less with forest", "Heat decides which plants grow in each place", TR, [POWER, "g2_nasaRainforest", "g2_nasaDesert"], "Compare the rainfall rows."),
    c("Why is a biome name only a broad label?", "Places inside it can still differ", "It names a single plant species", "Biomes were named after countries", R, R4, "Think about the boundary lines."),
    c("Which explanation does the Regina evidence support?", "People changed the land use from the natural vegetation", "Rain stopped the grass growing in this region", "Farming has no effect on natural vegetation", R, R4, "Read what the evidence says about land use."),
  ]),
]);
