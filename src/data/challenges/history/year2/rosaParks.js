import { lesson as l, sort as s, order as o, topic } from "./authoring.js";
export const rosaParks = topic([
 "https://www.loc.gov/exhibitions/rosa-parks-in-her-own-words/about-this-exhibition/the-bus-boycott/",
 "https://www.loc.gov/item/today-in-history/december-01/",
], [
 l(["In some places in America, unfair laws kept people apart.", "Black people and white people faced different bus rules.", "Rosa Parks refused to give up her seat in Montgomery.", "She helped challenge unfair treatment."], "🚌", "a bus", [
 ["Where does this story take place?","America","the Moon","Scutari","in America"],
 ["What were the laws like?","unfair","fair to everyone","only about toys","unfair laws"],
 ["Which people faced different bus rules?","Black and white people","only printers","only nurses","Black people and white people"],
 ["What did Rosa refuse to give up?","her seat","a printing press","a lamp","give up her seat"],
 ["Which city does Bix name?","Montgomery","London","Paris","in Montgomery"],
 ["What did Rosa help challenge?","unfair treatment","kind care","fair rules","unfair treatment"],
 ], s("Fair treatment, or unfair treatment?", ["Fair","Unfair"], [["the same rules for everyone",0],["equal treatment",0],["different rules because of skin colour",1],["keeping Black and white people apart",1]], ["unfair laws kept people apart", "different bus rules"])),
 l(["First, Rosa refused to give up her bus seat.", "Next, many people stopped using the buses in protest.", "This was called a boycott.", "Later, the unfair bus rules changed.", "Many people worked together for fairness."], "👣", "footsteps", [
 ["What did Rosa do first?","refused to give up her seat","invented the bus","built a cathedral","First"],
 ["What did many people do next?","stopped using buses","rode more buses in protest","stopped all talking","stopped using the buses"],
 ["What was this protest called?","a boycott","a bakery","a diary","a boycott"],
 ["Why did people stop using buses?","to protest","to celebrate unfairness","because all buses vanished","in protest"],
 ["What changed later?","unfair bus rules","the shape of the Moon","all trains into boats","bus rules changed"],
 ["How did people work for fairness?","together","without anyone helping","only by guessing","worked together"],
 ], o("Put the protest story in order.", ["Rosa refuses to give up her seat", "people boycott the buses", "unfair bus rules change"], ["First", "Next", "Later"])),
 l(["Rosa wrote about her life and the bus boycott.", "Her words tell us her own view.", "Newspapers also reported the protest.", "One account cannot tell everyone's thoughts.", "Compare accounts to learn more."], "📰", "a newspaper", [
 ["What did Rosa write about?","her life and the boycott","only London houses","only nursing","life and the bus boycott"],
 ["Whose view do her words give?","her own","every person's","nobody's","her own view"],
 ["What other source reported the protest?","newspapers","blank envelopes","toy buses","Newspapers"],
 ["What cannot one account tell us?","everyone's thoughts","its own words","one person's view","cannot tell everyone's thoughts"],
 ["How can we learn more?","compare accounts","ignore newspapers","guess without reading","Compare accounts"],
 ["Which question suits Rosa's own writing?","What did Rosa say about the boycott?","What did every person think?","What will happen tomorrow?","Rosa wrote"],
 ["Which is another written source?","a newspaper report","a silent toy bus","a blank sheet","Newspapers also reported"],
 ]),
 l(["Rosa and many others challenged unfair bus rules.", "Their boycott helped bring change.", "Fair rules treat people equally.", "Today, people remember Rosa's courage.", "Working together can help make life fairer."], "🤝", "hands joined together", [
 ["What did Rosa and others challenge?","unfair bus rules","equal treatment","kindness","unfair bus rules"],
 ["What helped bring change?","the boycott","accepting every unfair rule","never protesting","boycott helped bring change"],
 ["How do fair rules treat people?","equally","by skin colour","always differently","treat people equally"],
 ["Why is Rosa remembered?","her courage","her printing press","her nursing school","Rosa's courage"],
 ["What can working together help make?","a fairer life","a less fair life always","no changes ever","life fairer"],
 ["Who helped Rosa bring change?","many others","nobody else","only one bus driver","Rosa and many others"],
 ], s("Fair or unfair?", ["Fair","Unfair"], [["equal bus rules",0],["equal treatment",0],["rules based on skin colour",1],["keeping groups apart",1]], ["Fair rules treat people equally", "unfair bus rules"])),
]);
