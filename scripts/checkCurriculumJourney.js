import { parseArgs } from "node:util";
import { CURRICULUM_JOURNEY_MANIFEST } from "../shared/curriculumJourneyManifest.js";
import { buildJourneyManifest, journeyManifestSource } from "./curriculum/journeyManifest.js";
import { checkJourneyCoverage } from "./curriculum/journeyCoverage.js";

try {
  const { values, positionals } = parseArgs({ options: { inventory: { type: "boolean" }, all: { type: "boolean" },
    year: { type: "string" }, subject: { type: "string" }, json: { type: "boolean" } } });
  if (positionals.length || values.all && (values.year || values.subject) || Boolean(values.year) !== Boolean(values.subject)
    || !values.all && !values.inventory && !values.year) throw new Error("Use --inventory, --all or --year N --subject ID");
  if (journeyManifestSource(buildJourneyManifest()) !== journeyManifestSource(CURRICULUM_JOURNEY_MANIFEST)) throw new Error("Journey manifest is stale");
  const manifest = CURRICULUM_JOURNEY_MANIFEST.filter((p) => !values.year || p.year === Number(values.year) && p.subject === values.subject);
  if (!manifest.length) throw new Error("Unknown or unbuilt pathway");
  const report = await checkJourneyCoverage(manifest);
  if (values.json) console.log(JSON.stringify(report, null, 2));
  else {
    console.log(`${values.inventory ? "INVENTORY" : "CHECK"}: ${report.status.toUpperCase()}`);
    console.log(`Expected: ${JSON.stringify(report.expected)}`);
    console.log(`Authored: ${JSON.stringify(report.authored)}`);
    console.log(`Structurally validated: ${JSON.stringify(report.validated)}`);
    for (const result of report.results) {
      console.log(`Year ${result.year} ${result.subject}: ${result.problems.length} gaps${!values.year && result.problems.length ? `; ${result.problems.slice(0, 2).join("; ")}` : ""}`);
      // A scoped check lists every gap so authors can work through them.
      if (values.year) for (const problem of result.problems) console.log(`  - ${problem}`);
    }
    for (const limitation of report.limitations) console.log(`Scope: ${limitation}`);
  }
  if (!values.inventory && report.status !== "pass") process.exitCode = 1;
} catch (error) { console.error(error.message); process.exitCode = 1; }
