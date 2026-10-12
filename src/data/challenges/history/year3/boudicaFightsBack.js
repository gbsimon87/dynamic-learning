import { lesson, source, sort, order, year3Topic } from "./authoring.js";
export const boudicaFightsBack = year3Topic([
 "https://www.britishmuseum.org/learn/schools/ages-7-11/ancient-rome/timeline-roman-britain",
 "https://www.britishmuseum.org/blog/who-was-nero",
 "https://www.clevelandart.org/art/1969.146",
], [
 lesson("🛡️", "a shield representing resistance", [
  ["Boudica was a queen of the Iceni people in Britain.","Whom did Boudica lead?","the Iceni","Roman legions","Egyptian farmers"],
  ["The Romans took land and treated her family cruelly.","Why was she angry with Roman rule?","land was taken and her family harmed","she wanted Roman baths","she wanted to rule Egypt"],
  ["She led a revolt, a fight against Roman rule.","What does revolt mean here?","fighting against Roman rule","welcoming Roman rule","building Roman roads"],
  ["Other British groups joined her.","Who joined the revolt?","other British groups","only Roman emperors","only Egyptian scribes"],
  ["Her army attacked Roman towns.","What did her army attack?","Roman towns","Stonehenge's builders","Egyptian pyramids"],
  ["The Romans defeated the revolt.","What happened in the end?","the Romans won","Roman rule ended then","Boudica conquered Rome"],
 ], sort("Resistance or Roman response?", ["Resistance","Roman response"], [["Boudica's revolt",0],["other British groups joining",0],["defeating the revolt",1]], ["led a revolt", "Other British groups joined", "Romans defeated"])),
 lesson("🕰️", "a clock for time", [
  ["Claudius's invasion began in AD 43.","What came before Boudica's revolt?","Claudius's invasion","Hadrian's Wall","Roman rule ending"],
  ["Boudica's revolt happened about AD 60–61.","Which date labels the revolt?","about AD 60–61","55 BC","1922"],
  ["Hadrian's Wall began later, in AD 122.","What began after the revolt?","Hadrian's Wall","Caesar's visits","Claudius's invasion"],
  ["Roman rule lasted until around AD 410.","Did Roman rule end with Boudica's revolt?","no, it lasted longer","yes, immediately","yes, before the revolt"],
  ["These events belong to the Roman period in Britain.","Which period includes the revolt?","Roman Britain","Stone Age","Bronze Age"],
  ["Today, historians compare accounts and archaeological finds.","How do historians investigate today?","compare accounts and finds","ask Boudica directly","watch a film made in AD 60"],
 ], order("Order the events in Roman Britain.", ["Invasion · AD 43","Revolt · about AD 60–61","Wall begins · AD 122","Rule ends · about AD 410"], ["invasion began", "revolt happened", "began later", "lasted until"]), ["Invasion · AD 43","Revolt · about AD 60–61","Wall begins · AD 122","Rule ends · about AD 410"]),
 source("cma-verica-coin", ["This British coin was made for Verica, not Boudica.","A horse and rider show its decoration.","Coins are clues to British leaders and metalworking.","This coin cannot tell us Boudica's appearance.","Roman writers described her revolt; their accounts present Roman views.","Archaeological finds offer other evidence."], [
  ["Whose coin is this?","Verica's","Boudica's","Claudius's","for Verica, not Boudica"],
  ["What decoration is visible?","a horse and rider","Boudica's portrait","a map of London","horse and rider"],
  ["Which craft can the coin help us investigate?","metalworking","weaving","papyrus making","metalworking"],
  ["Does this coin show Boudica's face?","no","yes, in profile","yes, on both sides","cannot tell us Boudica's appearance"],
  ["Who wrote surviving accounts of her revolt?","Roman writers","Boudica in this coin","modern camera operators","Roman writers described"],
  ["Why compare those accounts with other evidence?","they present Roman views","they include everyone's voice","they were photographs","present Roman views"],
  ["What offers other evidence?","archaeological finds","guessing her thoughts","pretending this is her portrait","Archaeological finds offer other evidence"],
 ]),
 lesson("🧩", "a puzzle for explaining resistance", [
  ["Roman cruelty helped cause Boudica's revolt.","Which factor helped cause the revolt?","Roman cruelty","a new pyramid","a harvest celebration"],
  ["The revolt shows that some Britons resisted Roman rule.","What does the revolt show?","some Britons resisted","everyone welcomed Rome","Britain was empty"],
  ["Different British groups worked together against Rome.","Why did joining together matter?","groups could resist together","it ended every disagreement","it made them Roman emperors"],
  ["Attacking towns harmed people who lived there.","Who could be harmed by attacks?","people living in towns","only empty buildings","nobody"],
  ["The Romans won, and their rule continued.","What followed the revolt's defeat?","Roman rule continued","Roman rule ended","Boudica ruled Rome"],
  ["We study both resistance and its consequences.","What should historians consider?","causes and consequences","only who won","only Roman buildings"],
 ], sort("Cause or consequence?", ["Cause","Consequence"], [["Roman cruelty",0],["harm from town attacks",1],["Roman rule continuing after defeat",1]], ["helped cause", "Attacking towns harmed", "rule continued"])),
]);
