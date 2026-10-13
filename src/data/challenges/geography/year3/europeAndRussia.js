import { c, lesson, sort, topic, visual } from "./authoring.js";
import { map, EUROPE_MAP, EUROPE_COUNTRIES } from "./maps.js";
const world = visual("map", "Europe in the world", "North is up. Europe is north of Africa and west of most of Asia. The UK, France and Italy are in Europe.", ["Europe is a continent; France and Italy are countries within it.", "Europe lies north of Africa and west of most of Asia."], { view: "world", markers: [{id:"A",label:"Europe",point:[15,50]},{id:"B",label:"Africa",point:[20,0]},{id:"C",label:"Asia",point:[85,40]}] });
const environment = map("europe", ["Norway", "Italy", "Spain"], ["This northern Norway example shows rocky coast and high land.", "This Italian Alps example shows mountains in northern Italy.", "This Spanish Mediterranean coast example shows sea beside land.", "These examples do not describe every part of each country."]);
environment.markers=[{id:"A",label:"Northern Norway coast",point:[18.96,69.65]},{id:"B",label:"Italian Alps",point:[11.5,46.5]},{id:"C",label:"Spanish Mediterranean coast",point:[-.48,38.35]}];
environment.alt="North is up. A marks the northern Norway coast near Tromsø. B marks the Italian Alps in northern Italy. C marks Spain's Mediterranean coast near Alicante. These examples do not describe every part of each country.";
const russia = visual("map", "Russia across Europe and Asia", "North is up. Western Russia near Moscow is in Europe. Eastern Russia near the Pacific is in Asia. Both markers lie within Russia.", ["Russia has land in Europe and Asia.", "Moscow lies in the European part of Russia.", "Russia stretches far eastwards across Asia.", "One country can have land in two continents."], {view:"world",markers:[{id:"A",label:"Western Russia (Europe)",point:[37.6,55.75]},{id:"B",label:"Eastern Russia (Asia)",point:[130,55]}]});
export const europeAndRussia = topic([
  lesson(["Europe is a continent made up of many countries.", "The UK is in Europe.", "Russia stretches across Europe and Asia.", "Countries and continents are different kinds of areas."], world, [
    c("Which continent is north of Africa and west of most of Asia?", "Europe", "Africa", "Asia", world, ["atlas"]),
    c("Which continent does marker A label?", "Europe", "Africa", "Asia", world, ["atlas"]),
    c("Which is a country within Europe?", "France", "Asia", "Africa", world, ["atlas"]),
    c("Which is a continent?", "Europe", "Italy", "France", world, ["atlas"]),
    c("Which continent contains Italy?", "Europe", "Africa", "Asia", world, ["atlas"]),
    c("Which country is north of France on the atlas map?", "UK", "Spain", "Italy", EUROPE_MAP, ["atlas"]),
    sort("Sort country names and continent names.", ["Country", "Continent"], [["France",0],["Italy",0],["Europe",1],["Asia",1]], world, ["atlas"]),
  ]),
  lesson(["Read country names in the key.", "Cities are marked within countries.", "London, Paris, Rome, Berlin and Moscow are major cities."], EUROPE_MAP, [
    ...EUROPE_COUNTRIES.slice(1,5).map((name) => c(`Which country is marker ${String.fromCharCode(65 + EUROPE_COUNTRIES.indexOf(name))}?`, name, ...EUROPE_COUNTRIES.filter((n) => n !== name).slice(0,2), EUROPE_MAP, ["atlas"])),
    ...[["Paris","France"],["Rome","Italy"],["Berlin","Germany"],["Moscow","Russia"],["London","UK"]].map(([city,country]) => c(`Which country contains the marked city ${city}?`, country, ...EUROPE_COUNTRIES.filter((n)=>n!==country).slice(0,2), map("europe", [country,city], [`${city} is a major city in ${country}.`]), ["atlas"])),
    c("Which country lies west of Poland?", "Germany", "Russia", "Greece", EUROPE_MAP, ["atlas"]),
    c("Which marked country is furthest north?", "Norway", "Greece", "Spain", EUROPE_MAP, ["atlas"]),
  ]),
  lesson(["Look at the labelled environmental examples.", "A country can include many landscapes.", "One example cannot stand for the whole country."], environment, [
    c("Which example is in northern Europe?", "Northern Norway coast", "Spanish Mediterranean coast", "Italian Alps", environment, ["atlas","norwayCoast","italianAlps","spanishCoast"]),
    c("Which example is a mountain landscape?", "Italian Alps", "Only open sea", "Every Spanish street", environment, ["atlas","mountains","norwayCoast","italianAlps","spanishCoast"]),
    c("Which example is beside the Mediterranean?", "Spanish coast", "Northern Norway coast", "Every Italian mountain", environment, ["atlas","norwayCoast","italianAlps","spanishCoast"]),
    c("Which country contains the Alpine example?", "Italy", "Norway", "Spain", environment, ["atlas","norwayCoast","italianAlps","spanishCoast"]),
    c("Which country contains the rocky northern coast example?", "Norway", "Spain", "Italy", environment, ["atlas","norwayCoast","italianAlps","spanishCoast"]),
    c("Why should we avoid describing all Italy from this example?", "It shows only one landscape", "Italy has no mountains", "Maps cannot show countries", environment, ["atlas","norwayCoast","italianAlps","spanishCoast"]),
    c("Which statement is supported?", "These countries include different landscapes", "All Norway is one coast", "Every place in Spain is coastal", environment, ["atlas","norwayCoast","italianAlps","spanishCoast"]),
  ]),
  lesson(["Russia's western and eastern parts belong to different continents.", "Its national boundary covers land in both.", "Moscow is in the European part."], russia, [
    c("Why does Russia span two continents?", "Its land extends across Europe and Asia", "It is two separate countries", "All its land is in Africa", russia, ["atlas"]),
    c("Which continent contains Moscow?", "Europe", "Asia", "Africa", russia, ["atlas"]),
    c("Which continent contains the eastern Russia marker?", "Asia", "Europe", "Africa", russia, ["atlas"]),
    c("Which pair of continents contains Russian land?", "Europe and Asia", "Europe and Africa", "Asia and Australia", russia, ["atlas"]),
    c("Which description fits both markers?", "Different continents within one country", "Two countries within one city", "Two islands outside Russia", russia, ["atlas"]),
    c("Which direction connects western Russia towards eastern Russia?", "Eastwards", "Westwards", "Only southwards", russia, ["atlas"]),
    c("Why is a Europe-only map incomplete for Russia?", "Much of Russia extends into Asia", "Moscow is outside Russia", "Russia is only a city", russia, ["atlas"]),
  ]),
]);
