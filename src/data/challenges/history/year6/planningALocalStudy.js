import { lesson, detective, sort, order, year6Topic } from "./authoring.js";
export const planningALocalStudy = year6Topic(["https://www.bbc.co.uk/bitesize/topics/zq2qhyc", "https://www.nationalarchives.gov.uk/education/", "https://www.english-heritage.org.uk/learn/"], [
  lesson("🧭", "Planning an enquiry", [
    ["An enquiry starts with a good question.", "How does an enquiry start?", "with a good question", "with a long holiday", "with the final answer"],
    ["A good question is clear and can be answered with evidence.", "What makes a question good?", "it can be answered with evidence", "nobody can ever check the answer", "it is about every subject at once"],
    ["A vague question, such as 'Tell me about the past', is too big.", "Which question is too vague?", "Tell me about the past", "When did our school open?", "What did the old mill make?"],
    ["An archive, a library or a museum keeps old local records.", "Which place keeps old local records?", "an archive", "a bakery", "a bus stop"],
    ["Older people can share memories, but always go with a grown-up.", "Who should come with you to ask older people?", "a grown-up", "a stranger", "nobody at all"],
    ["Write down where each fact came from.", "What should you note about each fact?", "where it came from", "what it cost to buy", "what colour the paper is"]],
    sort("Good or vague question?", ["Good question", "Vague question"], [["When did our school open?", 0], ["What did the old mill make?", 0], ["Tell me about the past", 1], ["Tell me everything", 1]], ["clear and can be answered", "vague question"])),
  lesson("🪜", "Steps of an enquiry", [
    ["First, choose a clear question to answer.", "What do you do first?", "choose a clear question", "write your final conclusion", "compare all your evidence"],
    ["Next, list the sources that might help.", "What do you do after choosing a question?", "list the sources that might help", "write the final answer down", "throw away old evidence"],
    ["Then visit, ask or read, and collect your evidence.", "How do you collect evidence?", "visit, ask or read", "guess and then hope", "wait and see"],
    ["After that, compare what the sources say.", "What do you do after collecting evidence?", "compare what the sources say", "put the evidence in the bin", "forget about your question"],
    ["Finally, write a conclusion and say how sure you are.", "What comes last?", "write a conclusion", "choose your question", "list all the sources"],
    ["Keep a note of each source as you go.", "When do you note down each source?", "as you go", "only at the very end", "only if asked"]],
    order("Order the steps of an enquiry.", ["Choose a clear question", "List possible sources", "Collect evidence", "Compare the sources", "Write a conclusion"], ["choose a clear question", "list the sources", "collect your evidence", "compare what the sources say", "write a conclusion"]), false),
  detective(["Amira asks, 'When did our village shop open?'", "Her sources are the shop sign, a library newspaper and a neighbour.", "The sign says Est. 1932.", "The library newspaper says the shop opened in 1933.", "A neighbour, aged ninety, thinks it opened before the war.", "Amira writes down where each fact came from.", "She says it probably opened in 1932 or 1933, and that she is not certain."],
    [
    ["What is Amira's question?", "When did our village shop open?", "Who built the old school?", "Where is the town library?", "When did our village shop open?"],
    ["What does the shop sign say?", "Est. 1932", "Est. 1832", "Est. 1992", "Est. 1932"],
    ["Where does Amira find a newspaper?", "in the library", "at the bus station", "in the post office", "a library newspaper"],
    ["What date does the newspaper give?", "1933", "1932", "1923", "opened in 1933"],
    ["What does the neighbour think?", "it opened before the war", "it opened after the war ended", "it never opened any doors", "opened before the war"],
    ["What does Amira do with every fact?", "writes down where it came from", "hides it in a drawer for later", "tears it up and starts again", "writes down where each fact came from"],
    ["What does Amira admit about her conclusion?", "she is not certain", "it is certainly 1932", "it is certainly 1933", "she is not certain"]], { picture: "🏪", pictureLabel: "A made-up village shop" }),
  lesson("🧐", "Weighing evidence", [
    ["Different sources may give different answers, so we compare them.", "Why do we compare several sources?", "they may give different answers", "one source is always enough for us", "they are always exactly identical"],
    ["A source made at the time is usually closer to events.", "Which kind of source is usually closer to events?", "one made at the time", "one made much, much later", "one made only last week"],
    ["Even so, it can be one-sided or wrong.", "What can a source made at the time still be?", "one-sided or wrong", "perfectly complete", "free from any view"],
    ["Strong evidence comes from several sources that agree.", "What makes evidence strong?", "several sources that agree", "one very old source alone", "the very longest source"],
    ["If evidence is thin, say 'probably' or 'perhaps'.", "What can you say if evidence is thin?", "probably or perhaps", "definitely and always", "it is a proven fact"],
    ["A newly found source can change a conclusion.", "What can change a historian's conclusion?", "a newly found source", "a louder voice in a crowd", "a longer title for the study"]],
    sort("Good or poor habit?", ["Good enquiry habit", "Poor enquiry habit"], [["Compare several sources", 0], ["Say 'probably' if unsure", 0], ["Use one source only", 1], ["Pretend you are certain", 1]], ["we compare them", "probably", "several sources"])),
]);
