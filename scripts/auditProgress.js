import { MongoClient } from "mongodb";
import { migrateProgressDocument } from "../shared/progressDocument.js";

// Read-only; prints counts per failure reason, never child IDs or progress.
// Each failing document would stop that child's progress loading.
if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI_REQUIRED");
const client = new MongoClient(process.env.MONGODB_URI);
try {
  await client.connect();
  const dbName = process.env.MONGODB_DB || "dynamic_learning";
  let checked = 0;
  const failures = {};
  for await (const doc of client.db(dbName).collection("progress").find({}, { projection: { data: 1, schemaVersion: 1 } })) {
    checked += 1;
    try {
      migrateProgressDocument(doc);
    } catch (err) {
      failures[err.message] = (failures[err.message] ?? 0) + 1;
    }
  }
  console.log(JSON.stringify({ database: dbName, checked, failures }, null, 2));
  if (Object.keys(failures).length > 0) process.exitCode = 1;
} finally {
  await client.close();
}
