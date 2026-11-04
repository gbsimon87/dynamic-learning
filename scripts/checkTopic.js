import { courseTopicIds, loadTopic, parseTopicArgs } from "./curriculum/topics.js";
import { resolveBank } from "./curriculum/banks.js";
import { checkTopic } from "./curriculum/check.js";

try {
  const args = parseTopicArgs(process.argv.slice(2), { all: { type: "boolean" }, "structure-only": { type: "boolean" }, seeds: { type: "string" }, json: { type: "boolean" } });
  if (args.help) console.log("Usage: npm run check:topic -- --year N --subject ID (--topic TOPIC | --all) [--builder src/...js --export buildName] [--seeds 50] [--structure-only] [--json]\nCourse shortcut: npm run check:course -- --year N --subject ID");
  else {
    if (args.all && args.builder) throw new Error("--builder checks one topic; use --topic with its selected export");
    const ids = args.all ? await courseTopicIds(args) : [args.topicId];
    const results = [];
    for (const topicId of ids) {
      let result;
      try {
        const info = await loadTopic({ ...args, topicId });
        const bank = args["structure-only"] ? null : await resolveBank({ ...info, ...args, topicId });
        result = await checkTopic(info, bank, { structureOnly: args["structure-only"], seeds: args.seeds === undefined ? 50 : Number(args.seeds) });
      } catch (error) {
        result = { status: "fail", year: args.year, subject: args.subject, topicId, seeds: 0, problems: [error.message], limitations: ["Validation did not finish for this topic."] };
      }
      results.push(result);
      if (!args.json) {
        console.log(`${result.status.toUpperCase()}: Year ${args.year} ${args.subject} / ${topicId}`);
        if (!args.all && result.seeds) console.log(`Bank validation attempted: four slots × ${result.seeds} seeds, deterministic replay and available subject validators.`);
        for (const problem of result.problems.slice(0, 40)) console.log(`ERROR: ${problem}`);
        if (result.problems.length > 40) console.log(`${result.problems.length - 40} more problems; use --json for full output.`);
      }
    }
    const failed = results.filter((result) => result.status === "fail").length;
    const status = failed ? "fail" : args["structure-only"] ? "structure-only" : "pass";
    if (args.json) console.log(JSON.stringify(args.all ? { status, topics: results.length, failed, results } : results[0], null, 2));
    else {
      if (args.all) console.log(`Course: ${results.length} topics; ${failed} failed; scope ${args["structure-only"] ? "structure only" : "automatic bank adapters"}.`);
      for (const limitation of new Set(results.flatMap((result) => result.limitations))) console.log(`Scope: ${limitation}`);
    }
    process.exitCode = failed ? 1 : 0;
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
