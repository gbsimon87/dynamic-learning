import { lesson, detective, sort, order, year6Topic } from "./authoring.js";
export const peelsPolice = year6Topic(["https://www.bbc.co.uk/bitesize/topics/zq2qhyc", "https://www.nationalarchives.gov.uk/education/", "https://www.met.police.uk/"], [
  lesson("👮", "Peel's new police", [
    ["Robert Peel, the minister in charge of law and order, set up the Metropolitan Police in 1829.", "Who set up the Metropolitan Police?", "Robert Peel", "Henry Fielding", "Elizabeth Fry"],
    ["The first officers began patrolling London's streets in September 1829.", "When did the first officers begin patrolling?", "September 1829", "September 1792", "January 1901"],
    ["People nicknamed them bobbies or peelers, after Peel.", "What were the new officers nicknamed?", "bobbies", "redcoats", "highwaymen"],
    ["They wore blue coats and top hats, not soldiers' red.", "What colour were the officers' coats?", "blue", "red", "green"],
    ["They carried no guns, only a wooden truncheon and a rattle.", "What did officers carry to call for help?", "a rattle", "a drum", "a bugle horn"],
    ["Their headquarters was Scotland Yard, in Whitehall.", "Where was the headquarters?", "Scotland Yard", "Bow Street", "Newgate Prison"]],
    sort("Peel's police or not?", ["Peel's police", "Not Peel's police"], [["blue coats and top hats", 0], ["a truncheon", 0], ["soldiers' red coats", 1], ["guns", 1]], ["blue coats and top hats", "truncheon", "soldiers' red", "no guns"])),
  lesson("📅", "Police through the years", [
    ["In about 1749, the Bow Street Runners began in London.", "When did the Bow Street Runners begin?", "about 1749", "about 1649", "about 1849"],
    ["The Metropolitan Police Act became law in 1829.", "In which year did the Metropolitan Police Act become law?", "1829", "1749", "1901"],
    ["A detective branch was formed in 1842.", "What was formed in 1842?", "a detective branch", "a fingerprint office", "a border force"],
    ["In 1856, the law said every county and borough must have a police force.", "What did the 1856 law require?", "every county and borough to have police", "every house to have its own night watchman", "every road to have a gate"],
    ["At first, some people distrusted the police.", "What did some people feel about the police at first?", "distrust", "great delight", "pride"],
    ["Metropolitan Police officers began to patrol in September 1829.", "What did officers begin to do in September 1829?", "patrol the streets", "guard royal castles", "collect rents"]],
    order("Order the events, oldest first.", ["Bow Street Runners · about 1749", "Metropolitan Police · 1829", "Detective branch · 1842", "Police in every county and borough · 1856"], ["about 1749", "1829", "1842", "1856"]), false),
  detective(["Newspapers in 1829 printed reports about the new police.", "Some writers welcomed the police, while others distrusted them.", "Uniforms and truncheons in museums show what officers wore and carried.", "Police records show that many early officers were dismissed.", "A museum uniform cannot tell us how safe people felt.", "Crime figures only count crimes that were reported.", "Historians use many sources, including objects, to build a picture."],
    [
    ["What did newspapers print in 1829?", "reports about the new police", "recipes for a large family supper", "plans for castles", "printed reports about the new police"],
    ["How did people respond to the new police?", "some welcomed them and some distrusted them", "every single writer welcomed them with joy", "nobody noticed them", "Some writers welcomed the police, while others distrusted them."],
    ["What do museum uniforms and truncheons show?", "what officers wore and carried", "how many crimes there were in London", "where every officer lived", "show what officers wore and carried"],
    ["What do police records show about early officers?", "many were dismissed", "none of them ever left the job", "all were promoted", "many early officers were dismissed"],
    ["What can a museum uniform not tell us?", "how safe people felt", "what colour it was", "what the cloth was made of", "cannot tell us how safe people felt"],
    ["What do crime figures count?", "only reported crimes", "every crime ever committed", "only crimes in museums", "only count crimes that were reported"],
    ["What do historians use to build a picture?", "many sources, including objects", "only one old letter written by Peel", "only their own guesses", "many sources, including objects"]], { picture: "🏛️", pictureLabel: "A museum case of old police gear" }),
  lesson("🤔", "A new idea for keeping order", [
    ["Peel wanted police to prevent crime by patrolling, not only catch criminals.", "What did Peel want police to do?", "prevent crime by patrolling", "collect taxes from every house", "guard prisons"],
    ["Officers wore blue so they would not look like soldiers.", "Why were the uniforms blue?", "so officers did not look like soldiers", "so officers could hide in forests", "because blue was the king's own colour"],
    ["Many people feared police would act like an army, so officers carried no guns.", "Why did officers carry no guns?", "people feared an army-like force", "guns had not yet been invented anywhere", "guns were too cheap"],
    ["After 1856, police spread to every county and borough in England and Wales.", "What changed after 1856?", "police spread across the country", "police were abolished across the country", "police gained castles"],
    ["Before this, parish constables, watchmen and Runners kept order in different places.", "Who kept order before Peel's police?", "constables, watchmen and Runners", "judges and jurors in the king's courts", "monks and barons"],
    ["Today, police still patrol streets, as Peel's officers did.", "What do police still do that Peel's officers did?", "patrol the streets", "wear red soldiers' coats", "use a rattle"]],
    sort("Before Peel or Peel's idea?", ["Before Peel", "Peel's idea"], [["watchmen", 0], ["Bow Street Runners", 0], ["patrolling to prevent crime", 1], ["blue uniforms", 1]], ["watchmen", "Runners", "prevent crime by patrolling", "blue"])),
]);
