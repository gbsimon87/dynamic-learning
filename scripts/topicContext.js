import { loadTopic, lessonContext, findMapping, parseTopicArgs, renderContext } from "./curriculum/topics.js";
import { resolveBank } from "./curriculum/banks.js";
import { visualRecipe } from "./curriculum/visualRecipes.js";

try {
  const args = parseTopicArgs(process.argv.slice(2));
  if (args.help) console.log("Usage: npm run topic:context -- --year N --subject ID --topic TOPIC [--builder src/...js --export buildName]");
  else {
    const info = await loadTopic(args);
    const bank = await resolveBank({ ...info, ...args });
    const mapping = findMapping(info);
    console.log(renderContext(info, mapping, bank, await lessonContext(info), visualRecipe(info)));
    if (!mapping.rows.length) process.exitCode = 1;
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
