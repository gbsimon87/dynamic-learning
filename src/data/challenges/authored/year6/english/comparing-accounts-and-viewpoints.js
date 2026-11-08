import { buildReadingTopic } from "./readingQuest.js";

const items = [
  ["Account A: ‘The parade was thrilling; the drums made everyone smile.’ Account B: ‘The parade was far too loud for my baby brother.’", "The writers have different views about the parade's noise.", "Both writers think the parade was boring.", "Neither writer went to the parade."],
  ["Account A: ‘Our new playground has brilliant climbing frames.’ Account B: ‘I miss the quiet grassy space we used to have.’", "One writer welcomes the change while the other misses the old space.", "Both writers want more climbing frames.", "The playground has not changed."],
  ["Account A: ‘The rain saved our thirsty garden.’ Account B: ‘The rain cancelled our football match.’", "The same rain was helpful to one writer and disappointing to the other.", "Both writers were pleased their match was cancelled.", "The writers describe different weather."],
  ["Account A: ‘The museum guide gave us fascinating facts.’ Account B: ‘There was so much information that I could not remember it all.’", "Both heard the guide, but they reacted differently to the amount of information.", "Neither writer listened to the guide.", "Both writers found the facts easy to remember."],
  ["Account A: ‘Cycling to school is quick and cheerful.’ Account B: ‘Cycling to school is scary when cars pass close by.’", "The writers have different feelings about cycling to school.", "Both writers travel by car.", "Neither writer has been near traffic."],
  ["Account A: ‘The new book was full of exciting surprises.’ Account B: ‘I wanted clearer explanations before each surprise.’", "Both read the book, but one enjoyed its surprises more.", "Both writers have not read the book.", "The book has no surprises."],
  ["Account A: ‘Our class trip to the farm was muddy but wonderful.’ Account B: ‘The mud spoiled my favourite shoes.’", "The writers agree it was muddy but judge that differently.", "The writers disagree about whether there was mud.", "Neither writer visited a farm."],
  ["Account A: ‘The school meal was spicy and delicious.’ Account B: ‘The school meal was too spicy for me to eat.’", "The writers have opposite opinions about the spice.", "Both writers say the meal was sweet.", "The writers ate different meals on different days."],
  ["Account A: ‘The film's slow beginning built suspense.’ Account B: ‘The film's slow beginning made me restless.’", "The writers interpret the slow opening in different ways.", "Both writers say the film began quickly.", "Neither writer watched the film."],
  ["Account A: ‘The town fair raised money for the library.’ Account B: ‘The fair made the high street too crowded.’", "One writer values the fair's result while the other notices a problem it caused.", "Both writers think the library closed.", "Neither writer saw the fair."],
  ["Account A: ‘The coach pushed us to improve.’ Account B: ‘The coach expected too much too soon.’", "The writers have different views of the coach's demands.", "Both writers think the coach never spoke.", "The team did not practise."],
  ["Account A: ‘The storm was exciting to watch from indoors.’ Account B: ‘The storm worried me because our roof leaked.’", "The same storm felt exciting to one writer and worrying to the other.", "Both writers were outside in the storm.", "The storm did no damage anywhere."],
  ["Account A: ‘The school garden gives us fresh vegetables.’ Account B: ‘Looking after the garden takes too much lunchtime.’", "One writer focuses on a benefit and the other on the effort needed.", "Both writers say no one uses the garden.", "The garden has no plants."],
  ["Account A: ‘The science show made difficult ideas clear.’ Account B: ‘The science show moved too quickly for me.’", "The writers differ in how easy they found the show to follow.", "Both writers missed the show.", "The show had no science ideas."],
  ["Account A: ‘The long walk gave us amazing views.’ Account B: ‘The long walk was exhausting.’", "The writers agree the walk was long but value it differently.", "The writers disagree about going on a walk.", "Neither writer saw any views."],
].map(([accounts, answer, ...wrong]) => ({ prompt: `${accounts} What is a fair comparison?`, answer, wrong }));

export const { topic, build: buildComparingAccountsAndViewpoints } = buildReadingTopic({
  rule: "Compare the same event or subject fairly: use evidence from both accounts and notice what each writer values.",
  hint: "Find one detail from Account A and one from Account B before choosing a comparison.", items,
});
