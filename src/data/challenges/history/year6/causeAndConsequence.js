import { lesson, detective, sort, order, year6Topic, CRIME_TIMELINE } from "./authoring.js";
export const causeAndConsequence = year6Topic(["https://www.bbc.co.uk/bitesize/topics/zy3tyrd", "https://www.nationalarchives.gov.uk/education/", "https://www.parliament.uk/education/"], [
  lesson("🔗", "Causes and consequences", [
    ["A cause is why something happens.", "What is a cause?", "why something happens", "what happens afterwards", "a date on a map"],
    ["A consequence is what happens afterwards.", "What is a consequence?", "what happens afterwards", "why something happens", "a type of source"],
    ["The Great Depression meant fewer ships were ordered.", "What meant fewer ships were ordered?", "the Great Depression", "Magna Carta", "the Poor Law"],
    ["Palmer's shipyard closed in 1934.", "What closed in 1934?", "Palmer's shipyard", "Pentonville Prison", "Scotland Yard"],
    ["Many men in Jarrow lost their jobs.", "What happened to many men in Jarrow?", "they lost their jobs", "they all moved away", "they became kings"],
    ["In 1936, about 200 men marched to London.", "Where did about 200 men march in 1936?", "to London", "to Australia", "to Jarrow"]],
    sort("Cause or consequence?", ["Cause", "Consequence"], [["fewer ships were ordered", 0], ["Palmer's shipyard closed", 0], ["many men lost their jobs", 1], ["men marched to London", 1]], ["fewer ships were ordered", "Palmer's shipyard closed", "lost their jobs", "marched to London"])),
  lesson("📅", "A chain of events", [
    ["Bow Street Runners worked in London from about 1749.", "Who worked in London from about 1749?", "Bow Street Runners", "Peel's police", "fingerprint experts"],
    ["The First Fleet reached Australia in 1788.", "What reached Australia in 1788?", "the First Fleet", "Peel's police", "the Poor Law"],
    ["Peel started London's police in 1829.", "What did Peel start in 1829?", "London's police", "the First Fleet", "the Poor Law"],
    ["Police opened a fingerprint bureau in 1901.", "What opened in 1901?", "a fingerprint bureau", "Pentonville Prison", "the Poor Law"],
    ["The death penalty for murder ended in 1965.", "What ended in 1965 for murder?", "the death penalty", "fingerprints", "Magna Carta"],
    ["Police first used DNA to solve a crime in the late 1980s.", "What did police first use in the late 1980s?", "DNA to solve a crime", "fingerprints", "night watchmen"]],
    order("Order the events, oldest first.", ["Bow Street Runners · about 1749", "First Fleet reaches Australia · 1788", "Peel's police begin · 1829", "Fingerprint bureau · 1901"], ["about 1749", "1788", "1829", "1901"]), CRIME_TIMELINE),
  detective(["A newspaper reported the Jarrow March in 1936.", "Ellen Wilkinson, Jarrow's MP, supported the marchers.", "The marchers carried a petition to Parliament.", "A marcher later remembered sore feet and kind strangers.", "The government did not give help straight away.", "Work came back to Jarrow later, as Britain prepared for war.", "Each source gives a different part of the story."],
    [
    ["What did marchers carry to Parliament?", "a petition", "a flag only", "a statue", "The marchers carried a petition to Parliament."],
    ["Who was Jarrow's MP in 1936?", "Ellen Wilkinson", "Charles Palmer", "King John", "Ellen Wilkinson, Jarrow's MP"],
    ["What did a marcher remember?", "sore feet and kind strangers", "a ride on a train", "a feast in London", "sore feet and kind strangers"],
    ["What did the government do straight away?", "it did not give help", "it built a shipyard", "it ended the march", "did not give help straight away"],
    ["When did work come back to Jarrow?", "later", "that very day", "never", "Work came back to Jarrow later"],
    ["Which source reported the march in 1936?", "a newspaper", "a map", "a census page", "A newspaper reported the Jarrow March in 1936."],
    ["Why use several sources?", "each gives a different part of the story", "one source tells everything", "sources are all the same", "Each source gives a different part of the story."]], { picture: "🥾", pictureLabel: "Marchers on a long road" }),
  lesson("🤔", "Short and long causes", [
    ["A long-term cause builds up over many years.", "What is a long-term cause?", "one that builds up over many years", "one that happens in a minute", "one that is never found"],
    ["A trigger is the event that starts something off.", "What is a trigger?", "the event that starts something off", "a long wait", "a map symbol"],
    ["Growing towns and fear of crime made people want a police force.", "What made people want a police force?", "growing towns and fear of crime", "a long spell of sunny weather", "cheaper shoes in the shops"],
    ["Palmer's yard closing was a trigger for the Jarrow March.", "What was a trigger for the Jarrow March?", "the yard closing", "Magna Carta", "the Poor Law"],
    ["Consequences can be short-term or long-term.", "What can consequences be?", "short-term or long-term", "only short-term", "never found"],
    ["Historians ask which causes mattered most, and why.", "What do historians ask about causes?", "which mattered most, and why", "which came first alphabetically", "which was loudest"]],
    sort("Long-term cause or trigger?", ["Long-term cause", "Trigger"], [["growing towns", 0], ["fear of crime", 0], ["yard closing", 1]], ["growing towns", "fear of crime", "yard closing"])),
]);
