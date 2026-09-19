/**
 * Development seed: one test parent account with two children who have real,
 * DIFFERENT progress through Year 2 and Year 3 Maths.
 *
 *   npm run seed            create or refresh the test account
 *   npm run seed -- --purge wipe the app's collections first
 *   npm run seed -- --dry   print what would happen, write nothing
 *
 * IT SEEDS BOTH STORAGE MODES, because the app has two (PROJECT_KNOWLEDGE §4.7)
 * and which one is live is a build-time switch:
 *
 *   MongoDB          written whenever MONGODB_URI is set. Read by the app when
 *                    built with VITE_USE_API=true.
 *   dev-seed.json    always written at the repo root, gitignored, and served
 *                    only by the dev server — never copied into a build.
 *                    Load it from the browser console in the DEFAULT
 *                    localStorage mode, where the browser IS the database and
 *                    no Node script can reach it.
 *
 * ⚠️ DEVELOPMENT ONLY. `--purge` deletes EVERY parent, child, progress and
 * rewards document in the target database, not just the seeded ones. Three
 * things stand between that and a disaster, and none should be removed:
 *
 *   1. It refuses outright when NODE_ENV is "production".
 *   2. It refuses when the database name looks like production (see
 *      `looksLikeProduction`) unless --i-know-what-i-am-doing is passed.
 *   3. It prints the cluster host and database name and pauses before purging,
 *      so an operator pointed at the wrong URI can still stop it.
 *
 * This seeds MONGODB, which means it is only visible to the app when it is
 * built with VITE_USE_API=true. In the default localStorage mode the browser
 * is the database and a Node script cannot reach it — the script says so and
 * prints a snippet you can paste into the browser console instead.
 */
import path from "node:path";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { setTimeout as sleep } from "node:timers/promises";

import * as db from "../server/db.js";
import { hashPassword } from "../server/auth.js";
import { hashPassword as hashPasswordClient } from "../src/utils/passwordHash.js";
import { year2MathCurriculum } from "../src/data/year2MathCurriculum.js";
import { year3MathCurriculum } from "../src/data/year3MathCurriculum.js";
import { makeIsBuilt, readBuiltChallenges } from "./seedBuilt.js";
import {
  SEED_CHILDREN,
  SEED_PARENT,
  buildProgress,
  buildRewards,
} from "./seedData.js";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PURGE_GRACE_MS = 3000;

/* ===== FLAGS =====
   `npm run seed -- --purge` passes argv; `npm run seed --purge` does NOT — npm
   swallows it into npm_config_purge instead. Both spellings are natural to
   type, so both are accepted. */
function flag(name) {
  return (
    process.argv.slice(2).includes(`--${name}`) ||
    process.env[`npm_config_${name.replace(/-/g, "_")}`] === "true"
  );
}

const PURGE = flag("purge");
const DRY = flag("dry") || flag("dry-run");
const FORCE = flag("i-know-what-i-am-doing");

/** Names that almost certainly are not a scratch database. */
function looksLikeProduction(name) {
  return /prod|live|production/i.test(name);
}

/** Host only — a URI carries credentials and must never be logged whole. */
function safeHost(uri) {
  try {
    return new URL(uri.replace(/^mongodb\+srv:/, "https:")).host;
  } catch {
    return "(unparseable URI)";
  }
}

const CURRICULA = {
  2: year2MathCurriculum,
  3: year3MathCurriculum,
};

async function main() {
  if (process.env.NODE_ENV === "production") {
    fail("refusing to run with NODE_ENV=production — this script is for development only");
  }

  // Optional: the localStorage bundle and the dry run need no database at all.
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || "dynamic_learning";

  if (uri && looksLikeProduction(dbName) && !FORCE) {
    fail(
      `database name "${dbName}" looks like production.\n` +
        "  Pass --i-know-what-i-am-doing if that is genuinely what you want."
    );
  }

  console.log("\n  Dynamic Learning — development seed");
  console.log(
    uri ? `  mongodb   ${safeHost(uri)} / ${dbName}` : "  mongodb   (skipped — MONGODB_URI not set)"
  );
  console.log(`  mode      ${DRY ? "DRY RUN (nothing is written)" : PURGE ? "PURGE + SEED" : "SEED"}\n`);

  const built = readBuiltChallenges(REPO_ROOT);
  console.log(`  ${built.size} built challenge files found on disk`);

  // Everything is computed BEFORE the database is touched, so a bug in the
  // progress builder cannot leave a half-purged database behind.
  const plan = SEED_CHILDREN.map((child) => {
    const years = Object.entries(child.progress).map(([year, count]) => {
      const curriculum = CURRICULA[year];
      const isBuilt = makeIsBuilt(built, "math", Number(year));
      const { data, completed } = buildProgress(curriculum, isBuilt, count);
      return { year: Number(year), subject: "math", data, completed, curriculum, isBuilt, count };
    });

    // Ordered so the child's most recent curriculum is stamped last — that is
    // what `pickResume` reads, and it is the difference between the two
    // children the seed exists to create.
    years.sort((a, b) =>
      a.year === child.mostRecentYear ? 1 : b.year === child.mostRecentYear ? -1 : 0
    );

    const rewards = buildRewards(years);
    return { child, years, rewards };
  });

  for (const { child, years, rewards } of plan) {
    // Listed by year for readability; `years` itself stays in WRITE order,
    // which is what decides the most-recent stamp.
    const summary = [...years]
      .sort((a, b) => a.year - b.year)
      .map((y) => `Year ${y.year}: ${String(y.completed).padStart(2)}`)
      .join("  ");
    console.log(
      `  ${child.avatar} ${child.name.padEnd(6)} ${summary}` +
        `  · ${rewards.badges.length} badge${rewards.badges.length === 1 ? "" : "s"}` +
        `  · most recent: Year ${child.mostRecentYear}`
    );
  }

  if (DRY) {
    console.log("\n  Dry run — nothing written.\n");
    return;
  }

  await writeLocalBundle(plan);

  if (!uri) {
    console.log(
      "\n  MONGODB_URI is not set, so nothing was written to MongoDB.\n" +
        "  That is fine in the default localStorage mode — use the snippet above.\n"
    );
    return;
  }

  await db.connect(uri, dbName);

  if (PURGE) {
    console.log(
      `\n  ⚠️  PURGING every parent, child, progress and rewards document in "${dbName}".`
    );
    console.log(`  Ctrl-C within ${PURGE_GRACE_MS / 1000}s to stop.`);
    await sleep(PURGE_GRACE_MS);

    for (const [name, collection] of Object.entries(collections())) {
      const { deletedCount } = await collection.deleteMany({});
      console.log(`  purged ${String(deletedCount).padStart(5)} from ${name}`);
    }
  }

  // Upsert on email, so re-running without --purge refreshes the test account
  // rather than failing on the duplicate-email rule or creating a second one.
  const { hash, salt, iterations } = await hashPassword(SEED_PARENT.password);
  const now = new Date().toISOString();

  await db.parents().deleteMany({ email: SEED_PARENT.email });
  const { insertedId: parentId } = await db.parents().insertOne({
    email: SEED_PARENT.email,
    passwordHash: hash,
    passwordSalt: salt,
    iterations,
    accountType: "parent",
    ageBand: null,
    createdAt: now,
  });

  // Any children left from a previous seed of this same account, plus their
  // documents — otherwise re-running doubles the profiles.
  const stale = await db.children().find({ parentId }).project({ _id: 1 }).toArray();
  const staleIds = stale.map((doc) => doc._id);
  if (staleIds.length > 0) {
    await db.children().deleteMany({ _id: { $in: staleIds } });
    await db.progress().deleteMany({ childId: { $in: staleIds } });
    await db.rewards().deleteMany({ childId: { $in: staleIds } });
  }

  for (const { child, years, rewards } of plan) {
    const { insertedId: childId } = await db.children().insertOne({
      parentId,
      name: child.name,
      avatar: child.avatar,
      colour: child.colour,
      yearGroup: child.yearGroup,
      createdAt: now,
    });

    // Stamped a second apart in plan order, so "most recently played" is a real
    // ordering rather than a coin toss between identical timestamps.
    let stamp = Date.now();
    for (const year of years) {
      const at = new Date(stamp).toISOString();
      stamp += 1000;

      await db.progress().insertOne({
        childId,
        year: year.year,
        subject: year.subject,
        schemaVersion: 1,
        data: year.data,
        createdAt: at,
        updatedAt: at,
      });
    }

    await db.rewards().insertOne({
      childId,
      schemaVersion: 1,
      data: rewards,
      createdAt: now,
      updatedAt: now,
    });
  }

  console.log("\n  ✅ Seeded.");
  console.log(`     email     ${SEED_PARENT.email}`);
  console.log(`     password  ${SEED_PARENT.password}`);
  console.log("\n  The app reads this only when built with VITE_USE_API=true.\n");
}

/**
 * The same account as a localStorage bundle.
 *
 * Written to `public/` because that is the one directory the dev server serves
 * as-is, which makes the browser-console loader a two-line fetch rather than a
 * paste of several hundred KB of JSON. It is gitignored, so it exists only on
 * the machine that ran the seed and can never reach a build.
 *
 * Hashing uses the CLIENT hasher, not the server's: local mode verifies
 * passwords with `src/utils/passwordHash.js`, and a server-format hash would
 * simply never match.
 */
async function writeLocalBundle(plan) {
  const { hash, salt, iterations } = await hashPasswordClient(SEED_PARENT.password);
  const now = new Date().toISOString();
  const parentId = crypto.randomUUID();

  const bundle = {
    "dl.parents": [
      {
        _id: parentId,
        email: SEED_PARENT.email,
        passwordHash: hash,
        passwordSalt: salt,
        iterations,
        accountType: "parent",
        ageBand: null,
        createdAt: now,
      },
    ],
    "dl.children": [],
    "dl.progress": [],
    "dl.rewards": [],
  };

  for (const { child, years, rewards } of plan) {
    const childId = crypto.randomUUID();
    bundle["dl.children"].push({
      _id: childId,
      parentId,
      name: child.name,
      avatar: child.avatar,
      colour: child.colour,
      yearGroup: child.yearGroup,
      createdAt: now,
    });

    // A second apart in plan order, so "most recently played" is a real
    // ordering rather than a coin toss between identical timestamps.
    let stamp = Date.now();
    for (const year of years) {
      const at = new Date(stamp).toISOString();
      stamp += 1000;
      bundle["dl.progress"].push({
        _id: crypto.randomUUID(),
        childId,
        year: year.year,
        subject: year.subject,
        schemaVersion: 1,
        data: year.data,
        createdAt: at,
        updatedAt: at,
      });
    }

    bundle["dl.rewards"].push({
      _id: crypto.randomUUID(),
      childId,
      schemaVersion: 1,
      data: rewards,
      createdAt: now,
      updatedAt: now,
    });
  }

  // Repo ROOT, deliberately not `public/`: everything in public/ is copied
  // into dist/, so a local `npm run build` would package this test account's
  // password hash into the deployable bundle. A dev-only Vite middleware
  // serves it at /dev-seed.json instead — see vite.config.js.
  const out = path.join(REPO_ROOT, "dev-seed.json");
  writeFileSync(out, JSON.stringify(bundle, null, 2));

  console.log("\n  Wrote dev-seed.json (gitignored, dev-server only).");
  console.log("  For the DEFAULT localStorage mode, paste this in the browser console:\n");
  console.log(
    "    const s = await (await fetch('/dev-seed.json')).json();\n" +
      "    localStorage.removeItem('dl.session');\n" +
      "    for (const [k, v] of Object.entries(s)) localStorage.setItem(k, JSON.stringify(v));\n" +
      "    location.href = '/login';"
  );
}

function collections() {
  return {
    parents: db.parents(),
    children: db.children(),
    progress: db.progress(),
    rewards: db.rewards(),
  };
}

function fail(message) {
  console.error(`\n  ✖ ${message}\n`);
  process.exit(1);
}

try {
  await main();
} catch (err) {
  console.error("\n  ✖ Seed failed:", err.message, "\n");
  process.exitCode = 1;
} finally {
  await db.close().catch(() => {});
}
