import { sentenceQuestions } from "./year5Practice.js";
/** Challenging Views Courteously: docs/curriculum/year-5-and-6-english.md, Year 5 mapping (reading: challenging views courteously; spoken language: consider and evaluate different viewpoints). */
export const RULE = "To challenge a view courteously (politely), listen first, agree with what you can and give your own reason. Use phrases such as “I see your point, but ...” and never attack the person.";
const P = "Choose the most courteous reply.";
const row = (context, sentence, answer, wrong, spare, buildAnswer) => ({
  context, sentence, answer, wrong, prompt: P,
  build: { sentence, answer: buildAnswer, spare, prompt: "Build the polite opening. Leave the spare tiles." },
});
export const BANK = [
  row("Leo says, “Football is the only sport worth playing.”", "Amara says, “___ I think swimming is fun too.”", "I see your point, but", ["Don’t be silly,", "That is rubbish,"], ["Don’t", "silly,", "rubbish,"], "I see your point, but"),
  row("Priya says, “We should have a longer lunch break.”", "Zayn replies, “___ a longer break would shorten lessons.”", "I understand why you think that, but", ["That’s a stupid idea because", "Nobody agrees with you because"], ["stupid", "Nobody"], "I understand why you think that, but"),
  row("The class is discussing homework. Ellie has just spoken.", "Leo says, “___ add something to Ellie’s idea?”", "May I", ["Shut up and let me", "I’m going to"], ["Shut", "going"], "May I"),
  row("Amara thinks the story’s ending was perfect. Leo disagrees.", "Leo says, “I respectfully ___ because the ending felt rushed.”", "disagree", ["laugh", "shout"], ["laugh", "shout"], "disagree"),
  row("Zayn has made a suggestion for the school garden.", "Priya says, “___ idea, Zayn. Could we also think about watering?”", "That’s a thoughtful", ["That’s a pointless", "That’s a useless"], ["pointless", "useless"], "That’s a thoughtful"),
  row("Ellie has not finished her point, but Leo wants to speak.", "Leo says, “___ you finish before I answer?”", "Would", ["Hurry up and", "Can’t"], ["Hurry", "Can’t"], "Would"),
  row("Priya says, “Dogs are better pets than cats.”", "Amara says, “___ cats can be loving and quiet.”", "I agree that dogs are great, but", ["You are completely wrong,", "Only a fool thinks that,"], ["completely", "fool"], "I agree that dogs are great, but"),
  row("Leo has just given his view about the poem.", "Zayn says, “I hadn’t thought of it that way, ___ I see it differently.”", "but", ["or", "if"], ["or", "if"], "but"),
  row("A group is deciding on a class pet.", "Ellie says, “Thank you for explaining, Priya. ___ the rabbit would need a lot of care.”", "I wonder whether", ["You never think about", "Obviously you forgot that"], ["never", "Obviously"], "I wonder whether"),
  row("Amara has read her argument aloud.", "Leo says, “That was clear. ___ a reason for your second point?”", "Could you give me", ["Give me", "Why would you even say"], ["Give", "even"], "Could you give me"),
  row("Priya thinks the museum trip should be on Monday.", "Zayn says, “That could work, ___ Monday is a busy day for the school.”", "although", ["and you are silly because", "so you are wrong,"], ["silly", "wrong,"], "although"),
  row("The class is debating whether to have a school uniform.", "Ellie says, “I can see why you like it, ___ I would prefer to choose my own clothes.”", "but", ["or", "if"], ["or", "if"], "but"),
  row("Leo says, “Pizza is the best food ever.”", "Amara says, “I like pizza too, ___ I prefer pasta because I enjoy the sauces.”", "but", ["so", "and I’m telling you that"], ["so", "telling"], "but"),
  row("Zayn is giving a talk and Priya has a question.", "Priya says, “___ ask a question, please?”", "May I", ["Stop talking and", "I’ll just"], ["Stop", "just"], "May I"),
  row("Ellie says the film was boring. Amara enjoyed it.", "Amara says, “___ I thought the music was exciting.”", "Interesting, but", ["How could you say that?", "You have no idea,"], ["How", "idea,"], "Interesting, but"),
  row("The group is choosing a name for the school magazine.", "Leo says, “I like your name, Zayn. ___ ‘Bix Bulletin’ might fit better.”", "Perhaps", ["Obviously", "Your name is terrible, and"], ["Obviously", "terrible,"], "Perhaps"),
  row("Priya has asked for ideas for the school fair.", "Amara says, “Building on Priya’s idea, ___ have a cake stall?”", "we could also", ["you must", "I demand we"], ["must", "demand"], "we could also"),
  row("Leo has disagreed with Zayn in front of the class.", "Zayn says, “Thank you for telling me, Leo. ___ my reasons again?”", "Shall I explain", ["I won’t listen to", "You didn’t hear"], ["won’t", "hear"], "Shall I explain"),
];
export function buildChallengingViewsCourteouslyQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng, "Choose the reply that listens first and gives a reason without insulting anyone.");
}
