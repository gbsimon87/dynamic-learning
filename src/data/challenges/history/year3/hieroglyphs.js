import { lesson, source, sort, order, year3Topic } from "./authoring.js";
export const hieroglyphs = year3Topic([
 "https://www.britishmuseum.org/blog/everything-you-ever-wanted-know-about-rosetta-stone",
 "https://www.britishmuseum.org/exhibitions/hieroglyphs-unlocking-ancient-egypt/egyptian-hieroglyphs-decipherment-timeline",
 "https://www.clevelandart.org/art/1921.1032",
], [
 lesson("📜", "a scroll representing writing", [
  ["Hieroglyphs were Egyptian writing signs for sounds and ideas.","What were hieroglyphs?","writing signs","only drawings without meaning","modern English letters"],
  ["Scribes were trained writers.","What was a scribe?","a trained writer","a Roman soldier","a pyramid"],
  ["People wrote on papyrus and carved signs into stone.","Which surfaces could carry writing?","papyrus and stone","only gold coins","only modern paper"],
  ["Papyrus sheets were made from a river plant.","What was papyrus made from?","a river plant","iron","animal bones"],
  ["The Rosetta Stone repeats a message in three scripts.","How many scripts appear on the Rosetta Stone?","three","one","two"],
  ["Reading its Greek helped scholars understand the Egyptian writing.","Which known script helped scholars?","Greek","modern English","Roman road signs"],
 ], sort("Writing material or trained person?", ["Material","Person"], [["papyrus",0],["stone",0],["scribe",1]], ["Scribes were trained writers", "papyrus", "stone"])),
 lesson("🕰️", "a clock for reading ancient writing", [
  ["Ancient Egyptians used hieroglyphs for thousands of years.","Were hieroglyphs used briefly?","no, for thousands of years","yes, for one day","yes, only in 1922"],
  ["Later, knowledge of reading them was lost.","What happened later?","knowledge of reading them was lost","all signs disappeared","papyrus turned into gold"],
  ["The Rosetta Stone was found in 1799.","Which label marks its discovery?","1799","AD 43","1922"],
  ["Scholars compared the scripts to decode Egyptian writing.","What helped scholars decode it?","comparing scripts","guessing from one picture","ignoring Greek"],
  ["Champollion announced a breakthrough in 1822.","Which label marks that breakthrough?","1822","1799","55 BC"],
  ["Today, translated texts help us study Egyptian life.","Why does decoding matter today?","we can study written texts","we can ask every scribe","we know everyone's thoughts"],
 ], order("Order the story of decoding hieroglyphs.", ["Ancient use","Reading knowledge lost","Stone found · 1799","Breakthrough · 1822","Today"], ["Ancient Egyptians", "Later", "found in 1799", "breakthrough in 1822", "Today"]), ["Ancient use","Knowledge lost","Discovery · 1799","Breakthrough · 1822","Today"]),
 source("cma-egypt-papyrus", ["This Egyptian papyrus has rows of writing and drawn figures.","It is a Book of the Dead, texts about the afterlife.","Signs carry sounds and ideas, not just decoration.","Translation helps us understand their message.","The picture alone cannot give an accurate translation of every sign."], [
  ["What surface carries these signs?","papyrus","a gold coin","a stone road","Egyptian papyrus"],
  ["What can you see beside writing?","drawn figures","modern photographs","printed maps","drawn figures"],
  ["What is this kind of text called?","Book of the Dead","a Roman army diary","a Nile weather chart","Book of the Dead"],
  ["What subject does it concern?","the afterlife","only grain prices","only Roman law","texts about the afterlife"],
  ["Were signs only decoration?","no, they carried meaning","yes, no meaning","yes, only colours","Signs carry sounds and ideas"],
  ["What helps us understand the message?","translation","guessing every sign","ignoring the writing","Translation helps"],
  ["Can looking alone accurately translate every sign?","no","yes, without learning","yes, all signs mean what they picture","cannot give an accurate translation of every sign"],
 ]),
 lesson("🧩", "a puzzle for assessing written evidence", [
  ["Writing preserves names, beliefs and decisions.","What can writing preserve?","names, beliefs and decisions","every person's thoughts","the sound of every voice"],
  ["Comparing scripts gave scholars clues to unfamiliar signs.","Why compare scripts?","to find clues to signs","to erase the message","to assume all scripts were identical"],
  ["A picture-like sign can represent a sound, not just an object.","Can a sign represent a sound?","yes","no, only an object","no, only a colour"],
  ["Many people could not read or write.","Was everyone a trained writer?","no","yes, everyone","yes, every child"],
  ["Surviving texts give some voices, not everyone's story.","What limitation do surviving texts have?","not everyone's story survives","every voice survives","no text has meaning"],
  ["We compare writing with buildings and objects.","How can we build a fuller account?","compare different sources","use only one guess","ignore objects"],
 ], sort("Writing can preserve or cannot provide on its own?", ["Can preserve","Cannot provide"], [["a written name",0],["a written decision",0],["everyone's story",1]], ["preserves names, beliefs and decisions", "not everyone's story"])),
]);
