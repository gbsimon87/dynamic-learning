import { lesson, source, sort, order, year3Topic } from "./authoring.js";
export const howTheRomansChangedBritain = year3Topic([
 "https://www.britishmuseum.org/collection/galleries/roman-britain",
 "https://www.english-heritage.org.uk/visit/inspire-me/why-did-the-romans-leave-britain/",
 "https://www.english-heritage.org.uk/learn/story-of-england/romans/roads/",
 "https://www.clevelandart.org/art/1918.403",
], [
 lesson("🛣️", "a road representing Roman connections", [
  ["Roman rule brought new roads and growing towns.","Which change followed Roman rule?","new roads and growing towns","all farms disappearing","everyone moving to Rome"],
  ["Latin was used in official writing.","Which language was used officially?","Latin","modern English","hieroglyphs"],
  ["Coins helped people buy and sell goods.","What could coins help people do?","buy and sell goods","grow crops directly","heat a bath directly"],
  ["Baths and heated floors changed some people's lives.","Which comfort appeared in some buildings?","heated floors","electric ovens","modern showers"],
  ["Many people continued farming.","What continued?","farming","only hunting for every meal","everyone living in towns"],
  ["Roman rule ended around AD 410.","When did Roman rule end?","around AD 410","AD 43","55 BC"],
 ], sort("Roman feature or continuing work?", ["Roman feature","Continuing work"], [["official Latin writing",0],["heated floors",0],["farming",1]], ["Latin was used", "heated floors", "continued farming"])),
 lesson("🕰️", "a clock for time", [
  ["Iron Age Britain came before Roman rule.","Which period came before Roman Britain?","Iron Age","Roman Britain","Today"],
  ["The Roman invasion began in AD 43.","Which date marks the invasion?","AD 43","about AD 410","1922"],
  ["Towns and road networks developed during Roman rule.","When did Roman road networks develop?","during Roman rule","only after today","only in the early Stone Age"],
  ["Roman rule ended around AD 410.","What followed centuries of Roman rule?","its end around AD 410","Caesar's first visit","the first Stone Age tools"],
  ["People continued living in Britain after Roman rule.","Did Britain become empty afterwards?","no","yes, all people left","yes, all farms vanished"],
  ["Some Roman remains and road routes survive today.","What survives today?","some remains and routes","every Roman building","all original bath roofs"],
 ], order("Order the changes in Britain.", ["Iron Age Britain","Invasion · AD 43","Roman towns and roads","Rule ends · about AD 410","Today"], ["before Roman rule", "invasion began", "developed during", "rule ended", "survive today"]), ["Iron Age Britain","Invasion · AD 43","Roman towns and roads","Rule ends · about AD 410","Today"]),
 source("cma-roman-mosaic", ["This Roman mosaic from Italy shows many small stone pieces.","Repeating patterns reveal careful craftwork.","Similar techniques decorated wealthy homes in Roman Britain.","This Italian floor is not proof about every British home.","Archaeologists compare local finds with objects across the Roman world."], [
  ["Where does this mosaic come from?","Italy","Britain","Egypt","from Italy"],
  ["What makes up the mosaic?","small stone pieces","one sheet of gold","painted paper","small stone pieces"],
  ["What visible detail suggests planning?","repeating patterns","the photo background","a modern frame","Repeating patterns"],
  ["Where were similar techniques used?","wealthy Roman British homes","every Stone Age tent","only modern houses","wealthy homes in Roman Britain"],
  ["Does this floor prove every British home had a mosaic?","no","yes, every one","yes, even Stone Age homes","not proof about every British home"],
  ["What should archaeologists compare with it?","local finds","only modern guesses","only its photo background","compare local finds"],
  ["What does its pattern reveal?","careful craftwork","everyone's wealth","the emperor's thoughts","careful craftwork"],
 ]),
 lesson("🧩", "a puzzle for assessing lasting changes", [
  ["New roads were a change; farming was a continuity.","Which example is continuity?","farming carrying on","new Roman roads","new heated floors"],
  ["Some road routes are still used today.","Which change left a lasting trace?","some road routes","every bath staying open","every emperor staying in power"],
  ["Roman rule affected people differently.","Did everyone have the same experience?","no","yes, everyone was wealthy","yes, everyone was a soldier"],
  ["New comforts existed alongside taxes, conquest and slavery.","What should we consider alongside comforts?","taxes, conquest and slavery","only beautiful buildings","only the emperor's success"],
  ["A ruined building cannot show everyone's daily life.","What needs other evidence?","everyone's daily life","that a building existed","that some walls remain"],
  ["We judge impact by comparing what changed and what lasted.","How can we assess Roman impact?","compare change and continuity","count only victories","ignore earlier life"],
 ], sort("Change or continuity?", ["Change","Continuity"], [["new Roman roads",0],["farming carrying on",1],["some road routes still used",1]], ["New roads were a change", "farming was a continuity", "still used today"])),
]);
