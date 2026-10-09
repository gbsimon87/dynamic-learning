import { MongoClient } from "mongodb";
import { auditAccountIndexes } from "../server/accountIndexes.js";

// Read-only; prints counts/index definitions, never email addresses or child IDs.
if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI_REQUIRED");
const client = new MongoClient(process.env.MONGODB_URI);
try {
  await client.connect();
  console.log(JSON.stringify(await auditAccountIndexes(client.db(process.env.MONGODB_DB || "dynamic_learning")), null, 2));
} finally {
  await client.close();
}
