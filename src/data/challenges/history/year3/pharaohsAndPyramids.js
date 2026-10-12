import { lesson, source, sort, order, year3Topic } from "./authoring.js";
export const pharaohsAndPyramids = year3Topic([
 "https://www.britishmuseum.org/collection/galleries/early-egypt",
 "https://www.metmuseum.org/-/media/files/learn/for-educators/publications-for-educators/the-art-of-ancient-egypt.pdf",
 "https://giza.fas.harvard.edu/",
 "https://www.clevelandart.org/art/1914.663",
], [
 lesson("🔺", "a triangle representing a pyramid", [
  ["A pharaoh was a ruler of ancient Egypt.","What was a pharaoh?","an Egyptian ruler","a Roman general","a stone tool"],
  ["Some pharaohs had pyramids built as royal tombs.","Why were royal pyramids built?","as tombs","as public baths","as markets"],
  ["Giza's great pyramids stand near the Nile.","Where are Giza's great pyramids?","near the Nile","near the Thames","in Orkney"],
  ["Teams of workers moved and fitted stone blocks.","Who built pyramids?","teams of workers","one ruler alone","Roman legions"],
  ["Builders needed planning, food and skilled craftwork.","What did building require?","planning and skilled work","only a crown","no food supplies"],
  ["Royal tombs were linked with beliefs about an afterlife.","Which belief helped explain royal tombs?","an afterlife","only river travel","only trade"],
 ], sort("Ruler or building work?", ["Ruler","Building work"], [["pharaoh",0],["moving stone blocks",1],["planning and craftwork",1]], ["pharaoh was a ruler", "workers moved", "planning"])),
 lesson("🕰️", "a clock for Egyptian history", [
  ["Egypt united under one ruler about 3100 BC.","What came before Giza's pyramids?","Egypt uniting","Tutankhamun's tomb discovery","Roman Britain"],
  ["Giza's great pyramids were built about 4,500 years ago.","When were the great pyramids built?","about 4,500 years ago","in AD 43","in 1922"],
  ["Tutankhamun lived much later than those pyramid builders.","Did Tutankhamun live before Giza's pyramid builders?","no, much later","yes, earlier","at exactly the same time"],
  ["His tomb was found in 1922.","Which year marks his tomb's discovery?","1922","AD 43","55 BC"],
  ["Today, archaeologists study buildings, tools and records.","What helps study pyramid building today?","buildings, tools and records","only royal names","a film made by the builders"],
  ["Ancient Egyptian history lasted for thousands of years.","Did all Egyptian rulers live together?","no, across thousands of years","yes, on one day","yes, in one family only"],
 ], order("Order these stages of Egyptian history.", ["Egypt unites","Giza pyramids built","Tutankhamun lives","Tomb found · 1922","Today"], ["united", "pyramids were built", "much later", "found in 1922", "Today"]), ["Egypt unites","Giza pyramids","Tutankhamun","Discovery · 1922","Today"]),
 source("cma-egypt-king", ["This stone sculpture shows an Egyptian king wearing a striped headcloth.","A snake shape sits at the forehead.","Royal symbols identified a ruler in art.","The museum cannot name this particular king with certainty.","A royal image cannot tell us how every pyramid worker lived."], [
  ["What kind of source is this?","a sculpture","a photograph of a living king","a diary","stone sculpture"],
  ["Which clothing detail is visible?","a striped headcloth","a Roman helmet","a modern cap","striped headcloth"],
  ["What shape sits at the forehead?","a snake","a boat","a wheel","snake shape"],
  ["What did royal symbols identify?","a ruler","every worker","every farmer","identified a ruler"],
  ["Can we name this king with certainty?","no","yes, definitely Tutankhamun","yes, definitely Khufu","cannot name this particular king with certainty"],
  ["What cannot this royal image tell us?","every worker's life","that a headcloth was shown","that stone was carved","cannot tell us how every pyramid worker lived"],
  ["Which material is shown?","stone","papyrus","gold","stone sculpture"],
 ]),
 lesson("🧩", "a puzzle for thinking about royal power", [
  ["Large pyramids show rulers could organise huge projects.","What do large pyramids suggest?","power to organise huge projects","one person did all the work","no planning was needed"],
  ["Workers' settlements and tools reveal skilled teamwork.","Which evidence helps study the builders?","settlements and tools","only royal portraits","only modern guesses"],
  ["Food supplies supported people working on the buildings.","Why did food supplies matter?","they supported workers","they replaced stone blocks","they stopped all farming"],
  ["Not every Egyptian had a grand royal tomb.","Did everyone have a grand royal tomb?","no","yes, every person","yes, every farmer"],
  ["Tombs help us study beliefs as well as building skills.","What else can tombs help us study?","beliefs","everyone's exact voice","the next year's weather"],
  ["One monument cannot explain every person's experience.","Why study more than one monument?","people had different experiences","all lives were identical","one tomb contains every answer"],
 ], sort("Evidence supports or needs more evidence?", ["Supports","Needs more evidence"], [["large projects needed organisation",0],["every person had a grand tomb",1],["builders worked together",0]], ["organise huge projects", "Not every Egyptian", "skilled teamwork"])),
]);
