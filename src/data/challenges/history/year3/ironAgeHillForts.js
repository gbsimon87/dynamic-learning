import { lesson, source, sort, order, year3Topic } from "./authoring.js";
export const ironAgeHillForts = year3Topic([
 "https://www.english-heritage.org.uk/visit/places/maiden-castle/history-and-stories/history/",
 "https://www.english-heritage.org.uk/visit/places/lexden-earthworks-and-bluebottle-grove/History/iron-age-kings/",
 "https://www.eurekalert.org/multimedia/1074809",
], [
 lesson("🏰", "a fort representing a defended settlement", [
  ["Some Iron Age communities built hill forts.","Who built hill forts?","some Iron Age communities","only Roman emperors","Egyptian pharaohs"],
  ["Banks and ditches could help defend a settlement.","What could help defence?","banks and ditches","painted jars","papyrus scrolls"],
  ["Maiden Castle is a large hill fort in Dorset.","Where is Maiden Castle?","Dorset","Orkney","Egypt"],
  ["Most people farmed, growing crops and keeping animals.","What did most people do?","farming","only fighting","only building walls"],
  ["Skilled makers worked iron and made decorated objects.","Which metal gave this age its name?","iron","bronze","gold"],
  ["Different groups had their own leaders.","Was Britain ruled by one leader?","no, different groups had leaders","yes, one Roman emperor","yes, one pharaoh"],
 ], sort("Farming or defence?", ["Farming","Defence"], [["growing crops",0],["keeping animals",0],["banks and ditches",1]], ["growing crops and keeping animals", "help defend"])),
 lesson("🕰️", "a clock for time", [
  ["The Stone Age came before the Bronze Age.","Which age came first?","Stone Age","Bronze Age","Iron Age"],
  ["The Iron Age followed the Bronze Age.","What followed the Bronze Age?","Iron Age","Stone Age","Roman Britain"],
  ["Maiden Castle grew into a huge Iron Age hill fort.","Which age includes this large hill fort?","Iron Age","early Stone Age","today only"],
  ["Roman conquest began in AD 43, after the British Iron Age.","What began after the British Iron Age?","Roman conquest","early Stone Age hunting","the first stone tools"],
  ["Earth banks still survive today.","What can still survive?","earth banks","every wooden roof","every villager's diary"],
  ["A site may have been used in more than one age.","Can a site span several ages?","yes","no, just one day","no, just one year"],
 ], order("Order these periods, oldest first.", ["Stone Age","Bronze Age","Iron Age","Roman Britain","Today"], ["Stone Age came before", "Iron Age followed", "Roman conquest began", "survive today"]), ["Stone Age","Bronze Age","Iron Age","Roman Britain","Today"]),
 source("maiden-castle-banks", ["This aerial photo shows Maiden Castle in Dorset.","Curving earth banks and ditches surround a large enclosure.","These remains help archaeologists study planned defences.","Today's fields lie outside the fort.","The photo cannot show every house or event from Iron Age life."], [
  ["Which site is shown?","Maiden Castle","Stonehenge","Caerwent","Maiden Castle in Dorset"],
  ["What kind of view is this?","from above","from inside a house","from underground","aerial photo"],
  ["What surrounds the enclosure?","earth banks and ditches","only Roman stone walls","only river canals","earth banks and ditches"],
  ["What shape do the banks follow?","curving lines","one straight road","square writing signs","Curving earth banks"],
  ["What can the remains help investigate?","planned defences","every villager's thoughts","all battle dates","study planned defences"],
  ["Are the surrounding fields necessarily an Iron Age view?","no, they are today's fields","yes, unchanged in every detail","yes, the camera was ancient","Today's fields"],
  ["What cannot this photo show?","every Iron Age house and event","the surviving banks","the large enclosure","cannot show every house or event"],
 ]),
 lesson("🧩", "a puzzle for interpreting a hill fort", [
  ["Banks and ditches suggest people planned defence.","What do banks and ditches suggest?","planned defence","only farming","only trading"],
  ["Grain stores and animal bones can reveal farming.","Which finds help investigate food?","grain stores and animal bones","only gold coins","only ditch shapes"],
  ["Decorated objects reveal craft skills as well as practical needs.","What can decoration reveal?","craft skills","everyone's exact name","every battle's date"],
  ["Hill forts could be places to live, gather or store food.","What might a hill fort be used for?","living and storing food","only fighting every day","only Roman bathing"],
  ["Not everyone lived in a hill fort.","Did everyone live in a hill fort?","no","yes, every family","yes, every farmer"],
  ["One defensive site does not prove constant fighting.","Which claim needs more evidence?","people fought all the time","people built defences","a site had earth banks"],
 ], sort("Supported or needs more evidence?", ["Supported","Needs more evidence"], [["people planned defence",0],["people fought constantly",1],["craft skills mattered",0]], ["planned defence", "reveal craft skills", "does not prove constant fighting"])),
]);
