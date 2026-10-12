import { lesson, source, sort, order, year3Topic } from "./authoring.js";
export const whereTheFirstCivilisationsBegan = year3Topic([
 "https://www.britishmuseum.org/collection/galleries/mesopotamia",
 "https://www.britishmuseum.org/collection/term/x46239",
 "https://www.britishmuseum.org/collection/galleries/early-egypt",
 "https://www.metmuseum.org/essays/shang-and-zhou-dynasties-the-bronze-age-of-china",
 "https://www.metmuseum.org/exhibitions/listings/2003/art-of-the-first-cities",
 "https://www.clevelandart.org/art/1914.639",
], [
 lesson("🗺️", "a map representing different regions", [
  ["Early civilisations had cities, organised communities and specialist jobs.","Which feature describes early civilisations?","cities and specialist jobs","only one family","no organised communities"],
  ["Sumer was in Mesopotamia, between the Tigris and Euphrates.","Which rivers bordered Sumer's region?","Tigris and Euphrates","Nile and Thames","Indus and Yellow River"],
  ["Egypt grew along the Nile in Africa.","Which river supported Egypt?","Nile","Indus","Tigris"],
  ["Indus cities grew in what is now Pakistan and India.","Where were Indus cities?","Pakistan and India","Italy and Britain","Egypt and Orkney"],
  ["Shang China developed around the Yellow River.","Which river region supported Shang China?","Yellow River","Nile","Euphrates"],
  ["Rivers supported farming and travel.","Why were rivers useful?","farming and travel","making every place identical","removing every flood"],
 ], sort("Egypt or Shang China?", ["Egypt","Shang China"], [["Nile",0],["Africa",0],["Yellow River",1]], ["Egypt grew along the Nile in Africa", "Shang China developed around the Yellow River"])),
 lesson("🕰️", "a clock for early beginnings", [
  ["Sumer's cities developed about 3500 BC.","Which label marks Sumer's early cities?","about 3500 BC","about 1600 BC","AD 43"],
  ["Egypt united under one ruler about 3100 BC.","Which event followed these early Sumerian cities?","Egypt united","Shang rule began","Roman Britain began"],
  ["Large Indus cities flourished from about 2600 BC.","Which label marks large Indus cities?","about 2600 BC","AD 122","1922"],
  ["Shang rule began about 1600 BC.","Which beginning came last here?","Shang rule","Sumer's early cities","Egypt uniting"],
  ["These beginnings overlapped with later developments elsewhere.","Did each civilisation end when another began?","no","yes, always","yes, all ended together"],
  ["BC dates describe times before year 1.","Are these beginnings before year 1?","yes","no, all after","only the Roman one"],
 ], order("Order these beginnings, not whole civilisations.", ["Sumer's cities","Egypt unites","Large Indus cities","Shang rule begins"], ["3500 BC", "3100 BC", "2600 BC", "1600 BC"]), ["Sumer's cities","Egypt unites","Large Indus cities","Shang rule begins"]),
 source("cma-egypt-boat-jar", ["This ancient Egyptian jar has painted boats.","Boats were important for travel on the Nile.","Pottery reveals craft skills in an early farming society.","This Egyptian object is not evidence from Sumer, the Indus or Shang China.","Different regions need their own evidence."], [
  ["Which region made this jar?","Egypt","Sumer","Shang China","Egyptian jar"],
  ["What shapes decorate it?","boats","Roman helmets","written laws","painted boats"],
  ["Which river is linked with this object's region?","Nile","Indus","Yellow River","travel on the Nile"],
  ["Which skill does the jar reveal?","pottery making","Roman road building","printing books","Pottery reveals craft skills"],
  ["Does this jar alone explain Shang China?","no","yes, all regions were identical","yes, all boats were Chinese","not evidence from Sumer, the Indus or Shang China"],
  ["What should we use to study another region?","its own evidence","only this Egyptian jar","only a modern guess","their own evidence"],
  ["What activity did boats support?","travel","making bronze directly","carving pyramids directly","important for travel"],
 ]),
 lesson("🧩", "a puzzle for comparing early societies", [
  ["Rivers gave different communities water for farming.","What did these communities share?","river water for farming","one identical language","one ruler"],
  ["Their buildings, writing and beliefs differed.","Were all early civilisations alike?","no, they differed","yes, entirely alike","yes, the same beliefs"],
  ["Trade connected some communities across long distances.","What could connect distant communities?","trade","identical rulers everywhere","everyone staying apart"],
  ["Floods could help crops but also damage settlements.","Could rivers bring difficulties?","yes, floods could damage settlements","no, never","only in modern times"],
  ["These four examples are not all the world's early societies.","Does this list include every early society?","no","yes, every one","yes, no others existed"],
  ["People without cities also had skills and complex lives.","Did people without cities lack skills?","no","yes, all of them","yes, only cities had skilled people"],
 ], sort("Shared feature or difference?", ["Shared","Difference"], [["river water for farming",0],["different writing",1],["different beliefs",1]], ["Rivers gave different communities water", "writing and beliefs differed"])),
]);
