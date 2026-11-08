import { lesson, detective, sort, order, year6Topic } from "./authoring.js";
export const prisonsAndReformers = year6Topic(["https://www.bbc.co.uk/bitesize/topics/zq2qhyc", "https://www.nationalarchives.gov.uk/education/", "https://www.parliament.uk/about/living-heritage/"], [
  lesson("🔑", "Prisons and reform", [
    ["Before the 1800s, prisons mostly held people waiting for trial or in debt.", "Who did prisons mostly hold?", "people waiting for trial or in debt", "only soldiers who had broken army rules", "only Viking raiders"],
    ["Prisons were often crowded and dirty.", "What were prisons often like?", "crowded and dirty", "empty and clean", "quiet and spacious"],
    ["In 1777, John Howard wrote a book about the bad prisons he had visited.", "Who wrote about bad prisons in 1777?", "John Howard", "Robert Peel", "Henry Fielding"],
    ["Elizabeth Fry, a Quaker, visited Newgate Prison in 1813.", "Which prison did Elizabeth Fry visit in 1813?", "Newgate Prison", "Pentonville Prison", "Scotland Yard"],
    ["She worked to improve conditions for women and children there.", "Whom did Fry work to help?", "women and children", "soldiers and sailors", "judges and jurors"],
    ["Pentonville Prison opened in 1842, with prisoners kept apart.", "When did Pentonville Prison open?", "1842", "1784", "1901"]],
    sort("Reformer or prison?", ["Reformer", "Prison"], [["John Howard", 0], ["Elizabeth Fry", 0], ["Newgate", 1], ["Pentonville", 1]], ["John Howard", "Elizabeth Fry", "Newgate", "Pentonville"])),
  lesson("📅", "Prison reform in order", [
    ["John Howard wrote about bad prisons in 1777.", "When did John Howard write about bad prisons?", "1777", "1717", "1877"],
    ["Elizabeth Fry visited Newgate Prison in 1813.", "Who visited Newgate Prison in 1813?", "Elizabeth Fry", "John Howard", "Sir Robert Peel"],
    ["Pentonville Prison opened in 1842.", "Which prison opened in 1842?", "Pentonville Prison", "Newgate Prison", "Scotland Yard headquarters"],
    ["The first Borstal, a special prison for young offenders, began in 1902.", "What began in 1902?", "the first Borstal", "Newgate Prison", "the Metropolitan Police"],
    ["The Children Act of 1908 set up juvenile courts, special courts for children.", "What did the Children Act of 1908 set up?", "juvenile courts", "a new national prison", "a police force"],
    ["Today, prisons offer education and work training.", "What do prisons offer today?", "education and work training", "iron chains and locks", "hard labour in complete silence"]],
    order("Order the events, oldest first.", ["Howard writes about prisons · 1777", "Fry visits Newgate · 1813", "Pentonville opens · 1842", "First Borstal · 1902", "Juvenile courts set up · 1908"], ["1777", "1813", "1842", "1902", "1908"]), false),
  detective(["John Howard visited many prisons and wrote a book about what he saw.", "He described crowded cells and dirty conditions.", "Howard wanted change, so he wrote to persuade readers.", "Plans and rules for Victorian prisons survive.", "Plans show how a prison was built, not how prisoners felt.", "Prisoners' own words are harder to find than officials' records.", "Historians compare reformers' writing, plans and records to build a picture."],
    [
    ["Who visited many prisons and wrote a book?", "John Howard", "Robert Peel", "Dick Turpin", "John Howard visited many prisons"],
    ["What did Howard describe?", "crowded cells and dirty conditions", "rich feasts and fine beds", "tidy gardens, games and rich feasts", "He described crowded cells and dirty conditions."],
    ["Why did Howard write his book?", "to persuade readers to change prisons", "to sell maps of London", "to teach people how to farm and to trade", "he wrote to persuade readers"],
    ["What do prison plans show?", "how a prison was built", "how prisoners felt", "what the judges thought about it", "Plans show how a prison was built"],
    ["What can plans not show?", "how prisoners felt", "where the walls were", "how many cells there were", "not how prisoners felt"],
    ["Whose words are harder to find?", "prisoners'", "officials'", "judges'", "Prisoners' own words are harder to find"],
    ["How do historians build a picture?", "by comparing writing, plans and records", "by using one plan only", "by guessing from the title of a single book", "compare reformers' writing, plans and records"]], { picture: "📚", pictureLabel: "An old book about prisons" }),
  lesson("🤔", "What should prisons be for?", [
    ["Victorian prisons stressed hard labour and silence.", "What did Victorian prisons stress?", "hard labour and silence", "music, games and long holidays", "long days of rest"],
    ["Pentonville kept prisoners apart, to stop them mixing.", "Why did Pentonville keep prisoners apart?", "to stop them mixing", "to save money on food", "to make room for visitors"],
    ["The aims of prison have changed between punishing, deterring and reforming.", "What have the aims of prison changed between?", "punishing, deterring and reforming", "buying, selling and trading", "painting, singing and dancing in groups"],
    ["Borstals and juvenile courts treated young offenders differently from adults.", "Who did Borstals treat differently from adults?", "young offenders", "police officers", "prison guards"],
    ["Today, prisons offer education and work training.", "What do prisons offer today to help people change?", "education and work training", "hard labour in complete silence", "holiday camps by the sea"],
    ["Community sentences are also used today, and people disagree about the best way.", "What is also used today?", "community sentences", "trial by ordeal", "transportation to Australia"]],
    sort("Victorian prisons or today?", ["Victorian prisons", "Prisons today"], [["hard labour", 0], ["silence", 0], ["education", 1], ["work training", 1]], ["hard labour", "silence", "education", "work training"])),
]);
