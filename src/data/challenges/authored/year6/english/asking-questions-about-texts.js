import { buildReadingTopic } from "./readingQuest.js";

const items = [
  ["The story says, ‘Nico folded the map twice before putting it away.’", "Why did Nico fold the map twice before putting it away?", "What colour are Nico's shoes?", "Did Nico have a pet dragon?"],
  ["A report explains that owls hunt mainly at night because their hearing is excellent.", "How does excellent hearing help an owl hunt at night?", "Are all owls blue?", "Do owls live under the sea?"],
  ["The poem repeats the word ‘wait’ at the end of three lines.", "Why might the poet repeat the word ‘wait’?", "What is the poet's telephone number?", "Does the poem have a bicycle?"],
  ["A character hides a letter when her friend enters the room.", "What might the character be trying to keep secret?", "What is the friend's middle name?", "Will the room turn into a castle?"],
  ["An information text says rivers carry soil from hills to the sea.", "Where does the soil go after a river carries it from the hills?", "What flavour is the river?", "Can a river write a letter?"],
  ["A newspaper article gives two people's different opinions about a new park.", "Why do the two people disagree about the new park?", "Which person has the longest surname?", "Is the park on the moon?"],
  ["A chapter ends just as a torch goes out in a cave.", "What might happen next now that the torch has gone out?", "How many sandwiches did the author eat?", "Can the cave fly?"],
  ["A biography says an inventor failed many times before her design worked.", "What changes did the inventor make after each failure?", "What colour was every tool?", "Did the design sing a song?"],
  ["A play has a character say one thing aloud but think something different in an aside.", "Why does the character say something different in the aside?", "What is the actor's address?", "Is the stage made of ice cream?"],
  ["A guide explains that visitors must stay on paths to protect wildflowers.", "How does staying on paths protect the wildflowers?", "Which visitor is tallest?", "Do wildflowers need tickets?"],
  ["A story describes a storm becoming quieter after the family works together.", "How did working together change the family's situation?", "What game did the author play yesterday?", "Can storms read books?"],
  ["A poem compares city lights to stars.", "Why might the poet compare city lights to stars?", "How many stars fit in a pocket?", "Do roads wear hats?"],
  ["A history text says a new railway changed where people could work.", "How did the railway change people's choices about work?", "What was the writer's favourite snack?", "Can trains grow leaves?"],
  ["A character gives away her prize at the end of a competition.", "Why might the character choose to give away her prize?", "What size are the judges' shoes?", "Did the prize turn into a fish?"],
  ["A science article states that plastic takes a very long time to break down.", "What problems could long-lasting plastic cause?", "What music does plastic enjoy?", "Can plastic become a cloud instantly?"],
].map(([text, answer, ...wrong]) => ({ prompt: `${text} Which question would best improve your understanding?`, answer, wrong }));

export const { topic, build: buildAskingQuestionsAboutTexts } = buildReadingTopic({
  rule: "Helpful reading questions focus on evidence, meaning, reasons, effects or what may happen next.",
  hint: "Choose a question that can be explored using the text, rather than an unrelated detail or an impossible idea.", items,
});
