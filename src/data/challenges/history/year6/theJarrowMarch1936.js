import { lesson, detective, sort, order, year6Topic, LOCAL_TIMELINE } from "./authoring.js";
export const theJarrowMarch1936 = year6Topic(["https://www.nationalarchives.gov.uk/education/", "https://www.bbc.co.uk/bitesize/topics/zq2qhyc", "https://www.parliament.uk/about/living-heritage/"], [
  lesson("🚶", "Marching for work", [
    ["In October 1936, about 200 men set off from Jarrow.", "How many men set off from Jarrow?", "about 200", "about 20", "about 2,000"],
    ["They marched about 280 miles to London.", "Where did the men march to?", "London", "Glasgow", "Cardiff"],
    ["They were asking for work, because the shipyard had closed.", "What were the men asking for?", "work", "holidays", "free ships"],
    ["Ellen Wilkinson, Jarrow's MP, walked part of the way.", "Who was Jarrow's MP in 1936?", "Ellen Wilkinson", "Winston Churchill", "Florence Nightingale"],
    ["A petition, signed by thousands of local people, was presented to Parliament.", "What was presented to Parliament?", "a petition", "a model ship", "a new law"],
    ["It was a peaceful protest.", "What kind of protest was it?", "a peaceful protest", "a violent riot in the streets", "a secret plot against the king"]],
    sort("Person or place?", ["A person", "A place"], [["Ellen Wilkinson", 0], ["The marchers", 0], ["Jarrow", 1], ["London", 1]], ["Ellen Wilkinson", "men", "Jarrow", "London"])),
  lesson("📅", "Jarrow through time", [
    ["Jarrow's monastery was founded in AD 681.", "When was the monastery at Jarrow founded?", "AD 681", "AD 881", "AD 481"],
    ["Palmer's shipyard opened in 1851.", "When did Palmer's shipyard open?", "1851", "1751", "1951"],
    ["The shipyard closed in 1934, and many men lost their jobs.", "What happened when the yard closed?", "many men lost their jobs", "more ships were launched", "the monks moved in"],
    ["The Jarrow March began in October 1936.", "In which month of 1936 did the march begin?", "October", "January", "May"],
    ["The march to London came after the yard closed.", "What came after the yard closed?", "the march to London", "the founding of Jarrow", "the opening of the yard"],
    ["Work returned from about 1939, as Britain prepared for war.", "What brought work back from about 1939?", "Britain preparing for war", "a gift of money from a king", "a new railway to London"]],
    order("Order the events, oldest first.", ["Jarrow monastery founded · AD 681", "Palmer's shipyard opens · 1851", "Palmer's shipyard closes · 1934", "Jarrow March · 1936"], ["AD 681", "1851", "1934", "1936"]), LOCAL_TIMELINE),
  detective(["Photographs show the marchers walking in lines along country roads.", "The marchers carried banners and a petition.", "Newspapers reported the march, and some were more friendly than others.", "Ellen Wilkinson later wrote a book about Jarrow, which shows her view.", "Some marchers were interviewed years later, so their memories may have faded.", "The government did not offer immediate help.", "These sources show different views, so a historian compares them."],
    [
    ["What do the photographs show?", "marchers walking in lines", "marchers sailing a large ship", "soldiers firing their guns", "marchers walking in lines"],
    ["What did the marchers carry?", "banners and a petition", "swords and shields for battle", "ship models and flags", "banners and a petition"],
    ["How did newspapers treat the march?", "some were more friendly than others", "all of them praised it warmly", "none of them reported it at all", "some were more friendly than others"],
    ["Whose view does Ellen Wilkinson's book show?", "her own", "the King's", "the shipyard owner's", "which shows her view"],
    ["Why might the marchers' memories be less exact?", "they were interviewed years later", "they were written down at once", "they never took part in it", "interviewed years later"],
    ["How did the government answer at first?", "it did not offer immediate help", "it gave everyone work at once", "it gave the men free houses in London", "did not offer immediate help"],
    ["Why does a historian compare these sources?", "they show different views", "they are all exactly identical", "they are all just photographs", "show different views"]], { picture: "📰", pictureLabel: "Old news of a march" }),
  lesson("🕊️", "A peaceful protest", [
    ["The march was peaceful, and many people along the way offered help.", "What was the march like?", "peaceful", "violent and angry", "secret and quiet"],
    ["It showed how badly the Great Depression hurt some towns.", "What did the march show?", "how badly the Depression hurt some towns", "that every town was growing rich", "that shipyards were opening everywhere"],
    ["The government did not offer immediate help.", "How did the government respond to the petition?", "with no immediate help", "with a gift of new ships", "with a brand new shipyard"],
    ["Some people felt sympathy, but others thought the government could do little.", "Did everyone agree about the march?", "no, people had different views", "yes, everyone agreed with it", "yes, nobody cared about it"],
    ["Work returned later, as Britain prepared for war.", "What helped work to return later?", "Britain preparing for war", "the Depression getting worse", "the marchers building ships"],
    ["Today the march is remembered as a symbol of the Depression.", "What is the march remembered as?", "a symbol of the Depression", "a royal parade in London", "a football cup final"]],
    sort("What happened or what people thought?", ["What happened", "What people thought"], [["Men marched peacefully", 0], ["No immediate help", 0], ["Some felt sympathy", 1], ["Others thought little could be done", 1]], ["peaceful", "did not offer immediate help", "sympathy", "could do little"])),
]);
