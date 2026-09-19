/**
 * Which challenges have a component file, read from DISK.
 *
 * `src/data/challengeAvailability.js` answers the same question in the app, but
 * it uses `import.meta.glob`, which only exists under Vite. A Node script has
 * to walk the filesystem instead. The PATTERN is the thing that must not drift:
 * it is the same convention `Challenge.jsx` resolves against
 * (PROJECT_KNOWLEDGE §4.3), and if the two disagree the seed marks challenges
 * complete that a learner cannot open.
 */
import { readdirSync, existsSync } from "node:fs";
import path from "node:path";

/**
 * @returns {Set<string>} keys shaped "subject/yearN/topicId/challengeId"
 */
export function readBuiltChallenges(repoRoot) {
  const built = new Set();
  const skillsDir = path.join(repoRoot, "src", "pages", "skills");
  if (!existsSync(skillsDir)) return built;

  for (const subject of dirs(skillsDir)) {
    const challengesDir = path.join(skillsDir, subject, "challenges");
    if (!existsSync(challengesDir)) continue;

    for (const year of dirs(challengesDir)) {
      if (!/^year\d+$/.test(year)) continue;

      for (const topicId of dirs(path.join(challengesDir, year))) {
        const topicDir = path.join(challengesDir, year, topicId);
        for (const file of readdirSync(topicDir)) {
          const match = file.match(/Challenge(\d+)\.jsx$/);
          if (match) built.add(`${subject}/${year}/${topicId}/${match[1]}`);
        }
      }
    }
  }

  return built;
}

function dirs(at) {
  return readdirSync(at, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

/** Mirrors `isChallengeImplemented` exactly. */
export function makeIsBuilt(built, subject, year) {
  return (topicId, challengeId) =>
    built.has(`${subject}/year${year}/${topicId}/${challengeId}`);
}
