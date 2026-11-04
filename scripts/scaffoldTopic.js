import { loadTopic, parseTopicArgs } from "./curriculum/topics.js";
import { planScaffold, writeScaffold } from "./curriculum/scaffold.js";

try {
  const args = parseTopicArgs(process.argv.slice(2), {
    write: { type: "boolean" }, game: { type: "string" }, "topic-prop": { type: "string" }, "topic-key": { type: "string" },
  });
  if (args.help) console.log("Usage: npm run scaffold:topic -- --year N --subject ID --topic TOPIC [--builder src/...js --export buildName | --game src/...jsx --topic-prop topicId --topic-key internalKey] [--write]\nGeneric Maths/English wrappers include shared question visuals. Other subjects require --game to preserve their illustrated subject frame.");
  else {
    const info = await loadTopic(args);
    const files = await planScaffold(info, { ...args, topicProp: args["topic-prop"], topicKey: args["topic-key"] });
    console.log([...files.keys()].map((file) => `${args.write ? "Create" : "Would create"}: ${file}`).join("\n"));
    if (args.write) {
      writeScaffold(info.root, files);
      console.log("Scaffold created. Write and verify the teaching content before shipping; see the generated brief.");
    } else console.log("Preview only. Add --write to create these files. Existing files are never overwritten.");
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
