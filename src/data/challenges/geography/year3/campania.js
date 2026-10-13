import { c, lesson, record, sort, topic, visual } from "./authoring.js";
import { CAMPANIA_MAP, map } from "./maps.js";
const region=map("italy",["Campania","Naples"],["Campania is an administrative region of Italy.","Its geography includes coast, uplands and settlements.","Naples is a city within Campania; Vesuvius is a volcano within it."]);
const photo=visual("photo","Naples harbour and homes — May 2006","Boats are on the harbour water. Buildings line the shore and hillside. The photograph shows a part of Naples, not the whole Campania region.",["Boats, water and buildings are visible in this Naples photograph.","A caption locates this view at Naples harbour in Campania.","We cannot identify every building's use from its appearance."],{image:"naples-port"});
const work=record(["Campania includes farms, tourist places, towns and port activity.","Naples harbour connects boats with the coast.","Farming uses land to grow crops or keep animals.","Visitors can support guides, accommodation and food services.","Homes and everyday services support local communities.","Not everyone in the region does the same job."]);
export const campania=topic([
 lesson(["Campania is a bounded administrative region in Italy.","It includes coast, uplands and settlements.","Naples and Vesuvius are places within the region."],region,[
 c("What kind of area is Campania?","Administrative region","One city only","A whole continent",region,["regions"]),
 c("Which country contains Campania?","Italy","UK","France",region,["regions"]),
 c("Which city lies within Campania?","Naples","London","Berlin",region,["naples"]),
 c("Which volcano lies within Campania?","Vesuvius","Scafell Pike","Every hill",region,["vesuvius"]),
 c("Which physical feature is included in the region?","Coast","Only inland desert","Only flat fields",region,["regions"]),
 c("Does Naples represent all Campania?","No, it is one city within it","Yes, they are identical areas","Yes, no other places exist",region,["regions"]),
 sort("Sort the named places by kind.",["Region","City or feature within it"],[["Campania",0],["Naples",1],["Vesuvius",1]],region,["regions","vesuvius"]),
 ]),
 lesson(["Use the Italy map and the closer region map.","Find Naples and Vesuvius inside Campania.","A closer map helps separate nearby locations."],CAMPANIA_MAP,[
 c("Which marker names Naples?","A","B","Neither",CAMPANIA_MAP,["naples"]),
 c("Which marker names Vesuvius?","B","A","Neither",CAMPANIA_MAP,["vesuvius"]),
 c("Which feature lies east of Naples?","Vesuvius","The UK","The Atlantic Ocean",CAMPANIA_MAP,["vesuvius"]),
 c("Which map shows Campania within its country?","Italy map","Lake District map","UK city map",region,["regions"]),
 c("Which larger area contains both close-map markers?","Campania","Greater London","Lake District",CAMPANIA_MAP,["regions"]),
 c("Which marker names a settlement rather than a volcano?","Naples","Vesuvius","Both are volcanoes",CAMPANIA_MAP,["naples","vesuvius"]),
 c("What does the outlined close-map area represent?","Campania region","All Europe","Only Naples harbour",CAMPANIA_MAP,["regions"]),
 ]),
 lesson(["Use the photograph and its place caption together.","Describe visible features carefully.","Building appearance cannot prove every building's use."],photo,[
 c("Which transport is visible on the water?","Boats","Only trains","Only tractors",photo,["naplesPhoto"]),
 c("What lies behind the waterfront buildings?","A built hillside","Only open desert","A polar ice sheet",photo,["naplesPhoto"]),
 c("Which city does the caption identify?","Naples","London","Keswick",photo,["naplesPhoto"]),
 c("Which statement describes visible physical evidence?","Water beside the shore","Every building is a hotel","All residents work at sea",photo,["naplesPhoto"]),
 c("Which statement describes visible human evidence?","Buildings beside the harbour","Only a mountain peak","Only clouds above water",photo,["naplesPhoto"]),
 c("Can this picture prove every building's current use?","No, more evidence is needed","Yes, roofs prove all uses","Yes, all are farm barns",photo,["naplesPhoto"]),
 c("How much of Campania does this picture show?","One part of Naples","The whole region","Every farm",photo,["naplesPhoto"]),
 ]),
 lesson(["Connect land, coast and people using the sources.","Farming, tourism and port activity are different kinds of work.","One place does not represent every regional livelihood."],work,[
 c("Which connection uses the coast and harbour?","Boats and port activity","Only mountain walking","Only sheep grazing",work,["naplesPhoto","naples"]),
 c("Which work grows crops or keeps animals?","Farming","Only tourism","Only boat transport",work,["farming"]),
 c("Which services can visitors support?","Guides and accommodation","Only volcano vents","Only country boundaries",work,["naples"]),
 c("Which statement recognises local life?","Homes and services support communities","Only visitors live here","Every building is a hotel",work,["naples"]),
 c("Which conclusion matches the evidence?","Campania has varied land uses","All work is at one port","There are no farms",work,["farming","naples"]),
 c("Which feature connects boat transport and work?","Harbour beside the coast","A line of latitude alone","Only a hilltop",work,["naplesPhoto"]),
 sort("Sort these work connections.",["Land-based farming","Visitor or port services"],[["Growing crops",0],["Keeping farm animals",0],["Visitor accommodation",1],["Port activity",1]],work,["farming","naples"]),
 ]),
]);
