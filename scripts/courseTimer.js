import { parseArgs } from "node:util";
import { REPO_ROOT } from "./curriculum/topics.js";
import { changeTimer, formatDuration, readTimer, timerReport } from "./curriculum/buildTimer.js";

try {
  const { values, positionals } = parseArgs({ allowPositionals: true, options: { json: { type: "boolean" }, help: { type: "boolean", short: "h" } } });
  if (values.help) console.log("Usage: npm run course:timer -- start|pause|resume|stop|report year6 [--json]\nRecords work sessions in docs/authoring/timings/year6.json; pause between sessions. No token usage is inferred.");
  else {
    const [action, id] = positionals;
    if (positionals.length !== 2 || !["start", "pause", "resume", "stop", "report"].includes(action)) throw new Error("Usage: npm run course:timer -- start|pause|resume|stop|report year6 [--json]");
    const timer = action === "report" ? readTimer(REPO_ROOT, id) : changeTimer(REPO_ROOT, id, action);
    const report = timerReport(timer);
    if (values.json) console.log(JSON.stringify(report, null, 2));
    else console.log([
      `${id}: ${report.status}`,
      `Recorded work: ${formatDuration(report.recordedWorkMs)}`,
      `Paused time: ${formatDuration(report.pausedMs)}`,
      `Total elapsed: ${formatDuration(report.elapsedMs)}`,
      `Work sessions: ${report.sessions}`,
      `Record: docs/authoring/timings/${id}.json`,
      report.scope,
    ].join("\n"));
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
