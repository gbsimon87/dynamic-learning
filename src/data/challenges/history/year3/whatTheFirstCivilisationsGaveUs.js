import { lesson, source, sort, order, year3Topic } from "./authoring.js";
export const whatTheFirstCivilisationsGaveUs = year3Topic([
 "https://www.britishmuseum.org/collection/galleries/mesopotamia",
 "https://www.britishmuseum.org/blog/how-write-cuneiform",
 "https://www.metmuseum.org/exhibitions/listings/2003/art-of-the-first-cities",
 "https://www.metmuseum.org/essays/shang-and-zhou-dynasties-the-bronze-age-of-china",
 "https://www.clevelandart.org/art/1920.2004",
], [
 lesson("💡", "a light bulb representing an idea", [
  ["Extra farm food supported growing cities and specialist workers.","What helped support specialist workers?","extra farm food","only gold","only armies"],
  ["Sumerians wrote cuneiform signs on clay.","What did Sumerian writers use?","clay","printed paper","only stone walls"],
  ["Egyptians used hieroglyphs, signs for sounds and ideas.","What was hieroglyphic writing?","signs for sounds and ideas","only decoration","modern English letters"],
  ["Wheels helped transport goods in early Mesopotamia.","What did wheels help transport?","goods","river floods","written sounds"],
  ["Some rulers recorded laws in writing.","What could rulers record?","laws","only weather forecasts","only songs"],
  ["Shang craftspeople made skilled bronze objects.","Which material did Shang craftspeople work?","bronze","modern plastic","printed paper"],
 ], sort("Writing or other technology?", ["Writing","Other technology"], [["cuneiform signs",0],["hieroglyphs",0],["transport wheels",1]], ["wrote cuneiform", "used hieroglyphs", "Wheels helped transport"])),
 lesson("🕰️", "a clock for developments over time", [
  ["Farming began before the first large cities.","What came before large cities?","farming","Roman Britain","modern printing"],
  ["Growing cities needed ways to organise food and trade.","What did growing cities need?","ways to organise food and trade","only royal portraits","modern computers"],
  ["Early writing helped record goods and decisions.","Why could writing help cities?","recording goods and decisions","growing crops directly","ending every disagreement"],
  ["Later generations developed many kinds of writing and tools.","Did development stop with early writing?","no, it continued","yes, forever","yes, no new tools appeared"],
  ["Today, we still record information and move goods.","Which activity continues today?","recording information","using only clay tablets","using only ancient wheels"],
  ["Different inventions developed at different times and places.","Did every invention begin together?","no","yes, in one city","yes, on one day"],
 ], order("Order this broad story of development.", ["Farming begins","Early cities and records","Later developments","Today"], ["Farming began before", "Growing cities", "Later generations", "Today"]), ["Farming begins","Early cities and records","Later developments","Today"]),
 source("cma-egypt-scribe", ["This Egyptian statue shows a seated scribe, a trained writer.","A writing surface rests across his lap.","The statue is carved from stone.","Scribes recorded information for people who could not write.","One statue cannot tell us how many Egyptians could read."], [
  ["What was a scribe?","a trained writer","a Roman soldier","a hunter","a trained writer"],
  ["How is the figure shown?","seated","standing on a boat","riding a horse","seated scribe"],
  ["Where is the writing surface?","across his lap","above his head","behind his feet","across his lap"],
  ["What material was carved?","stone","gold","papyrus","carved from stone"],
  ["What work did scribes do?","recorded information","only made wheels","only grew crops","recorded information"],
  ["Did everyone necessarily write for themselves?","no","yes, everyone was a scribe","yes, the statue proves it","people who could not write"],
  ["What cannot one statue tell us?","how many people could read","that a seated figure is shown","that stone was carved","cannot tell us how many Egyptians could read"],
 ]),
 lesson("🧩", "a puzzle for thinking about achievements", [
  ["Writing helped preserve information beyond someone's memory.","Why was writing useful?","preserving information","replacing all speech","growing food directly"],
  ["Extra food allowed some people to specialise in crafts.","What helped people specialise?","extra food","no farming","everyone hunting alone"],
  ["Wheels made some journeys with goods easier.","What could wheels improve?","moving goods","stopping all floods","reading every language"],
  ["Written laws tell us rulers' rules, not whether everyone obeyed.","What cannot written laws prove?","everyone obeyed them","rulers made rules","rules were written"],
  ["Different societies made different achievements.","Did one society create every useful idea?","no","yes, Sumer made everything","yes, Egypt made everything"],
  ["Today's tools changed, but organising food and information still matters.","What need continued?","organising food and information","only using clay tablets","only making bronze"],
 ], sort("Achievement or a continuing need?", ["Achievement","Continuing need"], [["writing information down",0],["wheels for goods",0],["organising food supplies",1]], ["Writing helped preserve", "Wheels made", "organising food and information still matters"])),
]);
