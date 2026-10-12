import { lesson, source, sort, order, year3Topic } from "./authoring.js";
export const romanTownsRoadsAndBaths = year3Topic([
 "https://cadw.gov.wales/visit/places-to-visit/caer-went-roman-town",
 "https://www.english-heritage.org.uk/learn/story-of-england/romans/roads/",
 "https://www.english-heritage.org.uk/learn/story-of-england/romans/bathing/",
 "https://www.clevelandart.org/art/1918.403",
], [
 lesson("🛁", "a bath representing public bathing", [
  ["Roman roads linked towns and forts.","What did roads link?","towns and forts","only temples","only farms"],
  ["They helped soldiers, traders and supplies travel.","Who used roads?","soldiers and traders","only emperors","only bath workers"],
  ["Caerwent was a Roman town in what is now Wales.","Where is Caerwent today?","Wales","Italy","Egypt"],
  ["Its streets formed a planned grid.","How were its streets arranged?","in a planned grid","all in circles","without any planning"],
  ["Public baths were places to wash and meet.","Why visit public baths?","washing and meeting","growing crops","crossing the sea"],
  ["Some buildings had heated floors and mosaic decoration.","Which feature appeared in some buildings?","heated floors","electric showers","glass lifts"],
 ], sort("Travel or bathing?", ["Travel","Bathing"], [["roads linking towns",0],["moving supplies",0],["washing and meeting",1]], ["roads linked", "supplies travel", "wash and meet"])),
 lesson("🕰️", "a clock for time", [
  ["Britain had settlements before Roman rule.","Did settlements exist before Rome?","yes","no, Britain was empty","only after AD 410"],
  ["Roman invasion began in AD 43.","Which event came next?","Roman invasion","Roman rule ending","today"],
  ["Caerwent developed as a Roman town after the invasion.","When did Roman Caerwent develop?","after the invasion","in the early Stone Age","after today"],
  ["Roman rule ended around AD 410.","Which event followed the Roman town's development?","Roman rule ended","the first invasion","the earliest settlements"],
  ["Some Roman walls and road routes survive today.","What survives today?","some walls and road routes","every Roman building","all original bath roofs"],
  ["Surviving routes may have modern roads above them.","Can a Roman route be used by a modern road?","yes","no, never","only by Roman soldiers"],
 ], order("Order the town's wider story.", ["Pre-Roman settlements","Invasion · AD 43","Roman Caerwent develops","Rule ends · about AD 410","Today"], ["before Roman rule", "invasion began", "after the invasion", "rule ended", "survive today"]), ["Pre-Roman settlements","Invasion · AD 43","Roman Caerwent","Rule ends · about AD 410","Today"]),
 source("cma-roman-mosaic", ["This Roman floor mosaic is from Italy, not Caerwent.","Small stone pieces form repeating patterns.","Light and dark pieces make borders and shapes.","The craft took planning and skill.","A decorated floor cannot show that every Roman home was rich."], [
  ["Where is this mosaic from?","Italy","Caerwent","Orkney","from Italy, not Caerwent"],
  ["What makes its patterns?","small stone pieces","one painted cloth","iron sheets","Small stone pieces"],
  ["What can you see repeating?","patterns","written dates","human names","repeating patterns"],
  ["How are borders made visible?","light and dark pieces","electric lights","only a written label","Light and dark pieces make borders"],
  ["Which skills did it need?","planning and craft","only hunting","only sailing","planning and skill"],
  ["Does this prove every home was rich?","no","yes, all homes had mosaics","yes, nobody was poor","cannot show that every Roman home was rich"],
  ["Which part of a building did it decorate?","a floor","a roof","a road outside","floor mosaic"],
 ]),
 lesson("🧩", "a puzzle for assessing Roman towns", [
  ["Roads made moving people and goods easier.","What did roads improve?","moving people and goods","growing every crop","stopping all travel"],
  ["Baths offered washing and places to meet.","What shared purpose did baths have?","washing and meeting","only private sleeping","only storing grain"],
  ["Heating below floors warmed some buildings.","How were some buildings warmed?","heating below floors","electric radiators","sunlight alone everywhere"],
  ["Wealth affected the homes and comforts people had.","Why did homes differ?","people had different wealth","everyone had equal wealth","all homes were identical"],
  ["Many people still worked farms outside towns.","What continued outside towns?","farming","only mosaic making","only bathing"],
  ["Roman technology changed some lives, but not everyone's equally.","Was change the same for everyone?","no","yes, every life was identical","yes, every farm became a bath"],
 ], sort("New Roman feature or continuing activity?", ["New feature","Continued"], [["Roman road networks",0],["heated floors",0],["farming outside towns",1]], ["Roads made", "Heating below floors", "still worked farms"])),
]);
