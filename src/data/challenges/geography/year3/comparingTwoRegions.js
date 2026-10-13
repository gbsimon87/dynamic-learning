import { c, lesson, record, sort, topic, visual } from "./authoring.js";
import { LAKE_MAP, CAMPANIA_MAP } from "./maps.js";
import { CLIMATE } from "./climate.js";
const regions=record(["We compare the Lake District National Park and Campania administrative region.","The Lake District has lakes, mountains, settlements, farming and tourism.","Campania has coast, uplands, settlements, farming, tourism and port activity.","These are regions, not whole-country averages."]);
regions.maps = [LAKE_MAP, CAMPANIA_MAP];
const climate=visual("climate","Two location records — 1991–2020","January: Ambleside-area grid cell 4°C, 123 mm rain; Naples-area grid cell 7°C, 76 mm rain. July: Ambleside-area cell 15°C, 104 mm; Naples-area cell 25°C, 23 mm. Both cover 1991–2020. These model grid cells are examples within each region, not regional averages.",[
 "NASA POWER model summaries: monthly means for 1991–2020, rounded.",
 `January: Ambleside-area ${CLIMATE.lake[1].temperatureC}°C and ${CLIMATE.lake[1].rainfallMm} mm; Naples-area ${CLIMATE.naples[1].temperatureC}°C and ${CLIMATE.naples[1].rainfallMm} mm.`,
 `July: Ambleside-area ${CLIMATE.lake[7].temperatureC}°C and ${CLIMATE.lake[7].rainfallMm} mm; Naples-area ${CLIMATE.naples[7].temperatureC}°C and ${CLIMATE.naples[7].rainfallMm} mm.`,
 "The cells represent locations within the regions, not every part of either region.",
 "A long-term record differs from one day's weather.",
],{rows:[{month:"January",lake:CLIMATE.lake[1],naples:CLIMATE.naples[1]},{month:"July",lake:CLIMATE.lake[7],naples:CLIMATE.naples[7]}]});
const evidence=record(["Both regions include high land, settlements, farming and tourism.","The Lake District study includes named lakes and sheep farming.","The Campania study includes Vesuvius, Naples harbour and port activity.","The supplied July grid-cell record is warmer and drier near Naples than near Ambleside.","That record cannot describe every mountain, town or day in either region."]);
const connect=record(["In both regions, landscapes attract visitors and support local services.","Lake District grazing supports farming; Campania also has farming land.","Naples harbour connects coastal location and boat transport.","Local homes and work matter in both regions.","Compare equivalent features and time periods; avoid whole-country claims."]);
export const comparingTwoRegions=topic([
 lesson(["Compare two bounded regions using the same categories.","Look at land, water, settlements and work.","Similarities and differences both matter."],regions,[
 c("Which UK region are we studying?","Lake District National Park","All England","Only one farmhouse",regions,["parkBoundary"]),
 c("Which Italian region are we studying?","Campania","All Italy","Only one boat",regions,["regions"]),
 c("Which feature occurs in both descriptions?","High land","Only volcanic craters","Only one harbour",regions,["park","regions"]),
 c("Which work is described in both regions?","Farming and tourism","Only cargo shipping","Only volcano monitoring",regions,["parkWork","farming"]),
 c("Which study includes named lakes?","Lake District","Only Campania","Neither region",regions,["park"]),
 c("Which study includes port activity?","Campania","Only Lake District","Neither region",regions,["naplesPhoto"]),
 sort("Sort the named features by studied region.",["Lake District","Campania"],[["Scafell Pike",0],["Derwentwater",0],["Vesuvius",1],["Naples harbour",1]],record(["Lake District: Scafell Pike and Derwentwater.","Campania: Vesuvius and Naples harbour."]),["park","vesuvius","naplesPhoto"]),
 ]),
 lesson(["The two climate records cover the same thirty years.","They are model grid cells at locations within each region.","Compare the same month and measure."],climate,[
 c("Which cell has the higher January mean temperature?","Naples-area","Ambleside-area","They are equal",climate,["climate"]),
 c("Which cell has more January rainfall in the summary?","Ambleside-area","Naples-area","They are equal",climate,["climate"]),
 c("Which cell has the higher July mean temperature?","Naples-area","Ambleside-area","They are equal",climate,["climate"]),
 c("Which cell has less July rainfall in the summary?","Naples-area","Ambleside-area","They are equal",climate,["climate"]),
 c("Which time period do both records cover?","1991–2020","Only yesterday","Different centuries",climate,["climate"]),
 c("What do these model cells represent?","Two locations within regions","Every place in Italy and England","Tomorrow's exact weather",climate,["climate"]),
 c("Which comparison keeps month and measure the same?","July rainfall in both cells","July temperature versus January rainfall","One day's weather versus thirty years",climate,["climate"]),
 ]),
 lesson(["Support each comparison with visible evidence.","Use both similarities and differences.","A local record does not describe a whole country."],evidence,[
 c("Which similarity is supported?","Both have settlements","Both have Vesuvius","Both have Naples harbour",evidence,["parkWork","regions"]),
 c("Which other similarity is supported?","Both have farming and tourism","Both contain only lakes","Neither includes high land",evidence,["parkWork","farming"]),
 c("Which difference uses named regional features?","Lake District lakes; Campania's Vesuvius","England's flag; Italy's flag","Every English city; every Italian city",evidence,["park","vesuvius"]),
 c("Which comparison uses July records carefully?","Naples-area cell is warmer and drier","Every Campania day is dry","All Lake District places have identical weather",evidence,["climate"]),
 c("Which claim needs more evidence?","Every Campania mountain is warmer than every UK mountain","Both regions include high land","Naples has harbour activity",evidence,["climate"]),
 c("Which work is specifically visible in the Lake District source?","Sheep farming","Only cargo shipping","Only volcano monitoring",evidence,["lakePhoto"]),
 c("Which Campania feature supports a boat-transport comparison?","Naples harbour","Only the Equator","Only Scafell Pike",evidence,["naplesPhoto"]),
 ]),
 lesson(["Connect physical features with human activity.","Use comparable regional evidence.","A careful explanation includes what the evidence cannot tell us."],connect,[
 c("Which link is shared by both regions?","Landscapes and visitor services","Every resident works at sea","All work depends on volcanoes",connect,["parkWork","naples"]),
 c("Which link is supported for Naples?","Coast, harbour and boat transport","Lake District sheep and Naples roads","Every mountain is a port",connect,["naplesPhoto"]),
 c("Which comparison includes local people?","Both regions have homes and work","Only visitors matter","Nobody lives in these regions",connect,["parkWork","naples"]),
 c("Which farming comparison is supported?","Both regions use some land for farming","Every field grows the same crop","All work is farming",connect,["parkWork","farming"]),
 c("Why compare the same climate periods?","It makes the comparison fairer","It guarantees identical weather","It predicts tomorrow exactly",connect,["climate"]),
 c("Which source would improve a land-use comparison?","Equivalent regional land-use maps","Only national flags","Only one country's total population",connect,["example"]),
 c("Which explanation stays at the studied scale?","These two regions support varied livelihoods","Every UK and Italian place is identical","One harbour represents all Europe",connect,["parkWork","farming","naples"]),
 ]),
]);
