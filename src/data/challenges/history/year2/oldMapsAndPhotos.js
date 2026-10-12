import { lesson as l, sort as s, order as o, topic } from "./authoring.js";
export const oldMapsAndPhotos = topic([
 "https://www.nationalarchives.gov.uk/help-with-your-research/research-guides/maps-and-plans/",
 "https://historicengland.org.uk/images-books/archive/ — historic photographs and local places.",
], [
 l(["Old maps show where streets and buildings once stood.", "Old photos show what a place looked like.", "Compare them with the same place today.", "Some things change; others stay.", "These sources help us ask about history near us."], "🗺️", "a map", [
 ["What can an old map show?","where streets stood","how voices sounded","everyone's thoughts","where streets and buildings once stood"],
 ["What can an old photo show?","what a place looked like","every voice","tomorrow's streets","what a place looked like"],
 ["What should we compare with?","the same place today","only a different country","only guesses","same place today"],
 ["Do all things always change?","no, some stay","yes, everything disappears","nothing ever changes","others stay"],
 ["What do these sources help us ask about?","history near us","only space travel","only tomorrow","history near us"],
 ["Which is a useful source?","an old photo","a blank sheet","a guess without clues","Old photos"],
 ], s("Map or photo clue?", ["Map","Photo"], [["street positions",0],["where buildings stood",0],["a view of buildings",1],["what a place looked like",1]], ["maps show where", "photos show what"])),
 l(["First, an old photo records a street.", "Later, a new shop replaces a house there.", "Today, we compare old and new pictures.", "The church stays in both pictures.", "A change happens between the two views."], "🏘️", "a street", [
 ["What is recorded first?","the old street","the future shop first","tomorrow's weather","First, an old photo"],
 ["What replaces the house later?","a new shop","a mountain","a rocket","new shop replaces a house"],
 ["What do we compare today?","old and new pictures","only two blank pages","two unrelated countries","old and new pictures"],
 ["What stays in both pictures?","the church","the old house unchanged","every shop sign","church stays"],
 ["What changed?","a house became a shop","the church vanished","nothing changed","shop replaces a house"],
 ["When did that change happen?","between the two views","before any street existed","only tomorrow","between the two views"],
 ], o("Order this practice street's story.", ["the old photo shows a house", "a shop replaces the house", "we compare pictures today"], ["First", "Later", "Today"])),
 l(["Our practice maps show the same made-up street.", "The old map has a house and a church.", "The new map has a shop and the same church.", "The house changed into a shop; the church stayed.", "Maps cannot tell us people's voices."], "🗺️", "two practice maps", [
 ["Are these maps of a real street?","no, a made-up street","yes, your own street","yes, every UK street","made-up street"],
 ["What is on the old map?","a house and church","a shop only","a station only","old map has a house and a church"],
 ["What is on the new map?","a shop and church","only a house","only a river","new map has a shop"],
 ["What changed?","the house into a shop","the church into a river","everything disappeared","house changed into a shop"],
 ["What stayed?","the church","the house","only a train station","church stayed"],
 ["What cannot these maps tell us?","people's voices","shown buildings","what stayed","cannot tell us people's voices"],
 ["Which question suits these maps?","Which building stayed?","How did everyone sound?","What did everyone think?","church stayed"],
 ]),
 l(["Old maps and photos give different clues.", "Maps show where things stood; photos show their appearance.", "Compare the same place carefully.", "Ask what changed and what stayed.", "A local library or museum may help you find sources."], "🏛️", "a local museum", [
 ["Do maps and photos give identical clues?","no, different clues","yes, all identical","neither gives clues","different clues"],
 ["What do maps mainly show?","where things stood","all voices","all thoughts","where things stood"],
 ["What do photos show?","appearance","the future","every feeling","their appearance"],
 ["What should you compare carefully?","the same place","only unrelated places","only blank pages","same place carefully"],
 ["Which question helps study change?","What changed and what stayed?","What will happen tomorrow?","Can this photo speak?","what changed and what stayed"],
 ["Where might you find local sources?","a library or museum","only a toy box","only a blank envelope","local library or museum"],
 ], s("Useful comparison, or not?", ["Useful","Not useful"], [["the same street then and now",0],["checking what changed",0],["checking what stayed",0],["assuming every place is identical",1]], ["same place carefully", "what changed and what stayed"])),
]);


oldMapsAndPhotos.levels[3].story.scene = "maps";
for (const question of oldMapsAndPhotos.banks.facts3) question.visual = { type: "scene", scene: "maps" };
