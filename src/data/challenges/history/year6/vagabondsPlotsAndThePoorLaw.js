import { lesson, detective, sort, order, year6Topic } from "./authoring.js";
export const vagabondsPlotsAndThePoorLaw = year6Topic(["https://www.bbc.co.uk/bitesize/topics/zq2qhyc", "https://www.nationalarchives.gov.uk/education/", "https://www.parliament.uk/about/living-heritage/"], [
  lesson("🏚️", "Poverty in Tudor England", [
    ["In Tudor England, many people feared vagabonds, who wandered without work.", "What were vagabonds?", "people who wandered without work", "tax collectors for the king", "royal judges travelling the land"],
    ["Harsh punishments, such as whipping, were used on vagabonds.", "How were vagabonds often treated?", "with harsh punishments", "with free meals each day", "with gifts of land"],
    ["Some poor people, such as the sick and old, were called deserving.", "Who was seen as deserving of help?", "the sick and old", "able-bodied beggars", "rich merchants"],
    ["The Poor Law of 1601 made each parish, a local church area, help its poor.", "What did the 1601 Poor Law make each parish do?", "help its poor", "build a prison", "train soldiers"],
    ["The money came from a local tax called the poor rate.", "What was the poor rate?", "a local tax", "a royal gift", "a wage for constables"],
    ["Overseers collected the money and decided who needed help.", "Who collected the money?", "overseers", "the barons", "village jurors"]],
    sort("Helped or punished?", ["Helped by a parish", "Punished harshly"], [["the sick and old", 0], ["the deserving poor", 0], ["vagabonds", 1], ["whipping", 1]], ["sick and old", "deserving", "vagabonds", "whipping"])),
  lesson("📅", "From Poor Law to Bow Street", [
    ["Magna Carta was agreed in 1215, long before the Tudor age.", "When was Magna Carta agreed?", "1215", "1601", "1605"],
    ["Elizabeth I was queen when the Poor Law came in 1601.", "Who was queen in 1601?", "Elizabeth I", "Queen Victoria", "Queen Anne"],
    ["Elizabeth I died in 1603, and James I became king.", "Who became king in 1603?", "James I", "Henry II", "Charles II"],
    ["In 1605, the Gunpowder Plot tried to blow up Parliament.", "What did the plotters try to do in 1605?", "blow up Parliament", "rob the Bank of England", "burn down a castle"],
    ["Guy Fawkes was found in a cellar under Parliament on 4–5 November.", "Where was Guy Fawkes found?", "a cellar under Parliament", "a ship in the river", "a tall church tower in London"],
    ["The Bow Street Runners began working in London in about 1749.", "Who began working in London in about 1749?", "the Bow Street Runners", "the Metropolitan Police", "the Domesday clerks"]],
    order("Order the events, oldest first.", ["Magna Carta · 1215", "Poor Law · 1601", "James I becomes king · 1603", "Gunpowder Plot · 1605", "Bow Street Runners · about 1749"], ["1215", "1601", "1603", "1605", "1749"]), false),
  detective(["The king's government published an official account of the plot.", "The account said Guy Fawkes was found in the cellar.", "The government wanted people to see the plotters as dangerous traitors.", "A letter warning a lord to stay away from Parliament helped reveal the plot.", "Bonfire Night each 5 November shows the plot is still remembered.", "Many surviving accounts were written by the government, not the plotters.", "Historians compare accounts to see whose side each one takes."],
    [
    ["Who published the official account?", "the king's government", "the plotters themselves", "a village priest", "The king's government published"],
    ["Where did the account say Fawkes was found?", "in the cellar", "in a rowing boat", "on a road", "found in the cellar"],
    ["How did the government want people to see the plotters?", "as dangerous traitors", "as brave heroes", "as harmless country visitors", "see the plotters as dangerous traitors"],
    ["What helped reveal the plot?", "a letter warning a lord", "a map of the whole of London", "a church bell", "A letter warning a lord"],
    ["What does Bonfire Night show?", "the plot is still remembered", "the plot never happened", "the king was never in danger", "shows the plot is still remembered"],
    ["Why might the surviving accounts be one-sided?", "many were written by the government", "the plotters themselves wrote them all", "no one wrote anything down", "Many surviving accounts were written by the government"],
    ["What do historians compare?", "accounts, to see whose side each takes", "the weight of every page and its ink colour", "the colour of the ink", "Historians compare accounts to see whose side each one takes."]], { picture: "🔥", pictureLabel: "A bonfire on 5 November" }),
  lesson("🤔", "Why the plot happened", [
    ["Catholics could be fined for not attending Church of England services.", "What could Catholics be fined for?", "not attending Church of England services", "missing a market day in their own town", "not paying the poor rate to the overseers"],
    ["Angry at these laws, some Catholics plotted against the king.", "What did some angry Catholics do?", "plotted against the king", "paid the poor rate every year", "joined the king's army"],
    ["The plot failed, and the plotters were punished as traitors.", "What happened to the plotters?", "they were punished as traitors", "they were made lords of the realm", "they were never caught"],
    ["Religion and law were closely linked in the 1600s.", "What were closely linked in the 1600s?", "religion and law", "food and fashion", "music and sport"],
    ["In the Middle Ages, help for the poor mostly came from charity, such as monasteries.", "Where did help for the poor mostly come from in the Middle Ages?", "charity", "police patrols", "prison wages"],
    ["Parish constables and watchmen kept order, and stocks shamed minor offenders in public.", "Who kept order in a parish?", "constables and watchmen", "judges and jurors", "sheriffs and castle lords"]],
    sort("Cause or result?", ["Cause", "Result"], [["fines for Catholics", 0], ["anger at the laws", 0], ["the plot failing", 1], ["punishment as traitors", 1]], ["could be fined", "Angry at these laws", "plot failed", "punished as traitors"])),
]);
