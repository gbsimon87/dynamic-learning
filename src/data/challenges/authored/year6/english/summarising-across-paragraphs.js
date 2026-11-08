import { buildReadingTopic } from "./readingQuest.js";

const items = [
  ["Paragraph 1: Beavers build dams from branches. Paragraph 2: Their dams slow water and make deep ponds.", "Beavers change streams by building dams.", "Beavers only collect branches.", "Ponds are always dangerous."],
  ["Paragraph 1: Bees visit flowers for nectar. Paragraph 2: Pollen sticks to their bodies and moves between flowers.", "Bees help flowers reproduce while gathering food.", "Bees eat every kind of leaf.", "Flowers move from place to place."],
  ["Paragraph 1: A volcano can release lava. Paragraph 2: Ash can travel far in the air after an eruption.", "Volcanoes can affect land and air when they erupt.", "Lava is colder than ice.", "Ash only stays inside a volcano."],
  ["Paragraph 1: Romans built straight roads. Paragraph 2: Soldiers and traders used them to travel quickly.", "Roman roads helped people and goods travel.", "Romans never travelled by foot.", "All roads were built today."],
  ["Paragraph 1: Mangroves grow at tropical coasts. Paragraph 2: Their roots shelter young fish from waves.", "Mangroves protect coastal habitats.", "Mangroves grow on mountains.", "Fish cannot live near roots."],
  ["Paragraph 1: The moon reflects sunlight. Paragraph 2: Its changing position makes it look as if its shape changes.", "Moon phases are different views of the lit moon.", "The moon makes its own sunlight.", "The moon changes into a new object."],
  ["Paragraph 1: Recycling aluminium uses less energy than making new metal. Paragraph 2: Cans can be recycled many times.", "Recycling aluminium saves energy and materials.", "Aluminium can only be used once.", "All rubbish is aluminium."],
  ["Paragraph 1: Coral is made by tiny animals. Paragraph 2: Reefs provide homes for many sea creatures.", "Coral reefs are living habitats for ocean animals.", "Coral is a kind of rock with no life.", "Every fish lives in a reef."],
  ["Paragraph 1: Wind turbines use moving air. Paragraph 2: Their blades turn a generator to make electricity.", "Wind turbines turn wind energy into electricity.", "Turbines create wind from electricity.", "Blades only work underwater."],
  ["Paragraph 1: The first photographs needed long exposures. Paragraph 2: Later cameras made taking pictures quicker.", "Cameras have changed to make photography faster.", "Photographs were never difficult to take.", "Modern cameras cannot take pictures."],
  ["Paragraph 1: Hedgerows give birds places to nest. Paragraph 2: They link habitats for small animals.", "Hedgerows support wildlife in several ways.", "Hedgerows are only for decoration.", "Birds cannot nest in plants."],
  ["Paragraph 1: Paper maps use symbols. Paragraph 2: A key explains what each symbol means.", "Map keys help readers understand map symbols.", "Maps never use pictures.", "A key locks a map."],
  ["Paragraph 1: Some deserts are hot in daytime. Paragraph 2: They can become very cold at night.", "Desert temperatures can change greatly.", "Deserts are always hot.", "Deserts have no weather."],
  ["Paragraph 1: A seed needs water to begin growing. Paragraph 2: Leaves later make food using sunlight.", "Plants need different resources as they grow.", "Seeds grow without water or light.", "Leaves only collect rain."],
  ["Paragraph 1: Castles had thick walls. Paragraph 2: Many also had moats and drawbridges for defence.", "Castles used several features to keep people safe.", "Castles had no entrances.", "Moats were built for swimming races."],
].map(([text, answer, ...wrong]) => ({ prompt: `${text} Which sentence summarises both paragraphs?`, answer, wrong }));

export const { topic, build: buildSummarisingAcrossParagraphs } = buildReadingTopic({
  rule: "A summary gives the big idea from more than one paragraph, without copying every small detail.",
  hint: "Find one important idea in each paragraph, then choose the sentence that joins them.", items,
});
