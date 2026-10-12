import { lesson as l, sort as s, order as o, topic } from "./authoring.js";
export const bonfireNight = topic([
 "https://www.parliament.uk/gunpowderplot/",
 "https://www.parliament.uk/about/living-heritage/building/palace/gunpowder-plot/",
], [
 l(["In 1605, men planned to blow up Parliament and the King.", "Guy Fawkes was caught guarding the gunpowder.", "The plot failed.", "Bonfire Night on 5 November remembers this event.", "Some people watch bonfires and fireworks."], "🎆", "fireworks", [
 ["What did the plotters plan to blow up?","Parliament and the King","a toy shop","a steam train","Parliament and the King"],
 ["Who was caught guarding gunpowder?","Guy Fawkes","Samuel Pepys","Tim Berners-Lee","Guy Fawkes"],
 ["What was Fawkes guarding?","gunpowder","a printing press","a lamp","guarding the gunpowder"],
 ["What happened to the plot?","it failed","it blew up Parliament","it invented fireworks","The plot failed"],
 ["When is Bonfire Night?","5 November","11 November","25 December","5 November"],
 ["What do some people watch?","bonfires and fireworks","only trains","only planes","bonfires and fireworks"],
 ], s("In the plot story, or today's commemoration?", ["Plot story","Remembering today"], [["gunpowder guarded",0],["Fawkes caught",0],["Bonfire Night",1],["watching fireworks",1]], ["caught guarding the gunpowder", "Bonfire Night", "fireworks"])),
 l(["First, men planned the Gunpowder Plot.", "Next, Guy Fawkes was caught guarding gunpowder.", "The plan failed.", "Later, people remembered it with bonfires.", "Today, Bonfire Night is on 5 November."], "🔥", "a bonfire", [
 ["What came first?","planning the plot","today's fireworks","Fawkes being caught first","First"],
 ["Who was caught next?","Guy Fawkes","William Caxton","Rosa Parks","Next, Guy Fawkes"],
 ["Did the plot work?","no, it failed","yes, Parliament was blown up","yes, the King was blown up","The plan failed"],
 ["What did people use to remember later?","bonfires","video calls only","nursing lamps","with bonfires"],
 ["What day is remembered today?","5 November","1 January","11 November","5 November"],
 ["Which came after the plot?","bonfires to remember it","the planning itself","guarding the gunpowder","Later, people remembered"],
 ], o("Order the story, first to last.", ["the men plan the plot", "Fawkes is caught and the plot fails", "people remember with bonfires"], ["First", "Next", "Later"])),
 l(["A report from the time describes the failed plot.", "Old pictures show how artists represented it.", "A picture may be made after the event.", "It cannot show every person's thoughts.", "Check when a source was made."], "📰", "a written report", [
 ["What does the report describe?","the failed plot","mobile phones","steam trains","describes the failed plot"],
 ["Whose view can an old picture show?","an artist's","everyone's thoughts","a sound recording's","artists represented it"],
 ["When might a picture have been made?","after the event","only during the event","never after an event","after the event"],
 ["What cannot a picture show?","every person's thoughts","its drawn people","an artist's view","cannot show every person's thoughts"],
 ["What should we check about a source?","when it was made","only whether we like it","nothing","when a source was made"],
 ["Which is a written source?","a report","a bonfire","a firework","A report"],
 ["Does an old picture always prove the artist was there?","no, it may be made later","yes, always","yes, every artist was there","may be made after the event"],
 ]),
 l(["The plot happened long, long ago.", "Bonfire Night remembers its failure.", "Today, some people watch firework displays with grown-ups.", "Fireworks are not toys.", "Remembering an event is different from being there."], "🎇", "a firework display", [
 ["When did the plot happen?","long, long ago","yesterday","tomorrow","long, long ago"],
 ["What does Bonfire Night remember?","the plot's failure","a successful explosion of Parliament","the first flight","remembers its failure"],
 ["Who should children watch displays with?","grown-ups","nobody","only a toy","with grown-ups"],
 ["Are fireworks toys?","no, they are not toys","yes, playthings","yes, safe to hold","Fireworks are not toys"],
 ["Is remembering the same as being at the plot?","no, they are different","yes, identical","yes, it happens again each year","different from being there"],
 ["What do some people watch today?","firework displays","the plot happening again","Fawkes guarding gunpowder today","Today",],
 ], s("Original event or remembering today?", ["Long ago","Today"], [["the Gunpowder Plot",0],["the plot fails",0],["watching a display",1],["Bonfire Night with a grown-up",1]], ["plot happened long, long ago", "Today"])),
]);

bonfireNight.levels[2].story.lines.push("It happened long, long ago.");
bonfireNight.banks.facts2[5] = {
  type: "choice", prompt: "Which time band holds this event?",
  answer: "Long, long ago", wrong: ["About 100 years ago", "Today"],
  answeredBy: "long, long ago", hint: "Find the event on the time bands in Bix's story.",
};
