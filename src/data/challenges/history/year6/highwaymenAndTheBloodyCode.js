import { lesson, detective, sort, order, year6Topic } from "./authoring.js";
export const highwaymenAndTheBloodyCode = year6Topic(["https://www.bbc.co.uk/bitesize/topics/zq2qhyc", "https://www.nationalarchives.gov.uk/education/", "https://www.oldbaileyonline.org/"], [
  lesson("🐎", "Roads and the Bloody Code", [
    ["Highwaymen robbed travellers on lonely roads in the 1700s.", "Who robbed travellers on the roads?", "highwaymen", "watchmen", "constables"],
    ["Dick Turpin was a real criminal in the 1730s, not a hero.", "What was Dick Turpin?", "a real criminal", "a police officer", "a brave judge"],
    ["There was no proper police force, so catching thieves was hard.", "Why was catching thieves hard?", "there was no proper police force", "travellers never carried money", "judges refused to try them"],
    ["By about 1800, the Bloody Code let courts punish over 200 crimes with death.", "How many crimes could the Bloody Code punish with death?", "over 200", "about ten", "just two"],
    ["Some of these crimes were small thefts, so the laws were very harsh.", "What kind of crimes were included?", "some small thefts", "only the crime of murder", "only treason"],
    ["Many people were pardoned or had their sentences reduced.", "What often happened to people sentenced to death?", "many were pardoned", "all were punished in full", "all were freed at once"]],
    sort("Crime or law?", ["Crimes", "Laws and punishments"], [["robbing travellers", 0], ["small thefts", 0], ["the Bloody Code", 1], ["pardons", 1]], ["robbed travellers", "small thefts", "Bloody Code", "pardoned"])),
  lesson("📅", "Highwaymen to the Met", [
    ["Dick Turpin was a highwayman in the 1730s.", "In which decade was Turpin a highwayman?", "the 1730s", "the 1530s", "the 1930s"],
    ["Henry Fielding, a London magistrate (a judge), started the Bow Street Runners in about 1749.", "Who started the Bow Street Runners?", "Henry Fielding", "Sir Robert Peel", "Elizabeth Fry"],
    ["The Runners were paid thief-takers who worked in London.", "What were the Runners?", "paid thief-takers", "unpaid neighbours", "royal judges"],
    ["By about 1800, over 200 crimes could be punished by death.", "When had the Bloody Code grown to over 200 crimes?", "about 1800", "about 1500", "about 1900"],
    ["In the 1820s and 1830s, many death penalties were removed.", "What happened in the 1820s and 1830s?", "many death penalties were removed", "the Bloody Code grew longer", "Parliament was closed for a decade"],
    ["Peel's Metropolitan Police began in London in 1829.", "What began in London in 1829?", "the Metropolitan Police", "the new Bow Street Runners", "the Domesday survey"]],
    order("Order the events, oldest first.", ["Turpin is a highwayman · 1730s", "Bow Street Runners begin · about 1749", "Over 200 death-penalty crimes · about 1800", "Metropolitan Police begins · 1829"], ["1730s", "about 1749", "about 1800", "1829"]), false),
  detective(["Newspapers in the 1700s printed stories about famous highwaymen.", "The story of Turpin as a gallant hero grew in a novel in the 1800s.", "Court records list what people were accused of and their sentence.", "Court records show that many death sentences were not carried out.", "Acts of Parliament list the crimes that carried the death penalty.", "Newspapers wanted to sell copies, so they could exaggerate exciting stories.", "Historians use records and stories together, and check each one."],
    [
    ["What did newspapers print about highwaymen?", "stories about famous ones", "maps of every road in England", "lists of new laws", "printed stories about famous highwaymen"],
    ["Where did the hero story of Turpin grow?", "in a novel", "in a law", "in a court record", "grew in a novel in the 1800s"],
    ["What do court records list?", "the accusation and the sentence", "the weather each day", "the name of every traveller on the roads", "what people were accused of and their sentence"],
    ["What do court records show about sentences?", "many were not carried out", "all of them were carried out at once", "none were written down", "many death sentences were not carried out"],
    ["What lists the crimes with the death penalty?", "Acts of Parliament", "highwaymen's diaries", "road signs", "Acts of Parliament list the crimes"],
    ["Why might newspapers exaggerate?", "to sell copies", "to save paper", "to help the police", "wanted to sell copies"],
    ["What do historians do with records and stories?", "use them together and check each", "trust only the funniest stories they find", "ignore the court records", "use records and stories together, and check each one"]], { picture: "📰", pictureLabel: "An old newspaper sheet" }),
  lesson("🤔", "Was it too harsh?", [
    ["The Bloody Code was meant to frighten people out of crime.", "What was the Bloody Code meant to do?", "frighten people out of crime", "help thieves leave the country", "train police officers"],
    ["This idea of frightening others is called deterrence.", "What is the idea of frightening others called?", "deterrence", "reform", "transportation"],
    ["Many people in the 1800s thought the Code was too harsh.", "What did many people think in the 1800s?", "that it was too harsh", "that it was too gentle", "that it was too cheap"],
    ["Some juries refused to convict, because the punishment seemed too harsh.", "Why did some juries refuse to convict?", "the punishment seemed too harsh", "the trial was too long", "the accused owned a horse and a cart"],
    ["The number of death-penalty crimes was cut step by step.", "How was the number of death-penalty crimes reduced?", "step by step", "in a single day", "by a king's order"],
    ["Today, people still disagree about the best way to punish crime.", "What do people still disagree about?", "the best way to punish crime", "the colour of the officers' uniforms", "the price of coaches"]],
    sort("Aim or pressure to change?", ["Aim of the Code", "Pressure to change it"], [["deterrence", 0], ["frightening people", 0], ["juries refusing to convict", 1], ["thinking it too harsh", 1]], ["deterrence", "frighten people", "refused to convict", "too harsh"])),
]);
